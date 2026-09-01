/* 自动生成，勿手动修改 —— 源：scripts/holdings/holdings.mjs（node scripts/holdings/build-browser.mjs） */
(function () {
"use strict";

// holdings.mjs — 大V持仓变动记录与计算模块（纯函数）
// -----------------------------------------------------------------------------
// 用途：为 investor-tracker 站点追踪大V（如鹿鼎公）公开披露的"股数变动"明细。
// 设计目标：纯计算 + 可扩展，便于后续接入真实数据源或前端展示。
//
// 数据模型（一条变动 = Change）：
// {
//   id: string                  // 唯一 ID（UUID 或确定性派生）
//   ticker: string              // 股票代码，如 "600900.SH" / "00700.HK"
//   date: string                // 变动日期 ISO YYYY-MM-DD
//   type: ChangeType            // 见下方枚举
//   shares: number              // 变动股数（正=增持，负=减仓，0=不允许）
//   price?: number              // 成交价格（每股，本位币）；送转股/拆合股可空
//   note?: string               // 备注
// }
//
// 计算字段（由 computeFromChanges 推导，不持久化）：
//   sharesAfter: number         // 本次变动后持仓股数
//   costAfter:   number         // 本次变动后加权平均成本（每股）
//   costBasisAfter: number      // 本次变动后持仓总成本（= sharesAfter × costAfter）
//
// 边界与约定：
//   - 成本计算采用「加权移动平均法」：仅买入/配股改变平均成本，卖出/送转股/拆合股
//     按比例调整股数与成本，总成本不变。
//   - "建仓日"定义为该 ticker 第一条变动记录的 date；不允许更早的变动。
//   - 不允许同一 ticker 同日出现多条同方向变动（业务上一日多次同向操作应合并）。
// -----------------------------------------------------------------------------

const ChangeType = Object.freeze({
  BUY: 'BUY',                     // 现金买入（增量）
  SELL: 'SELL',                   // 现金卖出（减量）
  DIVIDEND_SHARE: 'DIVIDEND_SHARE', // 送股（每 X 股送 Y 股，shares=Y）
  TRANSFER_SHARE: 'TRANSFER_SHARE', // 转增股（资本公积转增股本，shares=Y）
  RIGHTS_ISSUE: 'RIGHTS_ISSUE',     // 配股（有现金支出，shares=Y @ price）
  STOCK_SPLIT: 'STOCK_SPLIT',       // 拆股（1 股拆 N 股，shares=0 表示按比例，ratio=N）
  REVERSE_SPLIT: 'REVERSE_SPLIT',   // 合股（N 股合 1 股，ratio=N）
  ADJUSTMENT: 'ADJUSTMENT',         // 手动调整（账户转入/转出、市场切换等股数变化场景）
});

// 需要现金的变动类型
const CASH_TYPES = new Set([ChangeType.BUY, ChangeType.RIGHTS_ISSUE]);
// 不改变总成本的变动（按比例调整股数与单价）
const NON_COST_BASIS_CHANGING_TYPES = new Set([
  ChangeType.SELL,
  ChangeType.DIVIDEND_SHARE,
  ChangeType.TRANSFER_SHARE,
  ChangeType.STOCK_SPLIT,
  ChangeType.REVERSE_SPLIT,
]);

/**
 * 校验一条 Change 是否合法。
 * @param {Change} change
 * @param {object} ctx  { existingShares?: number, firstDate?: string }
 * @returns {{ ok: true } | { ok: false, error: string }}
 */
function validateChange(change, ctx = {}) {
  if (!change || typeof change !== 'object') return { ok: false, error: '变动记录必须为对象' };
  if (!change.ticker || typeof change.ticker !== 'string')
    return { ok: false, error: '缺少股票代码 ticker' };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(change.date || ''))
    return { ok: false, error: '变动日期格式必须为 YYYY-MM-DD' };

  if (!Object.values(ChangeType).includes(change.type))
    return { ok: false, error: `未知的变动类型: ${change.type}` };

  // shares 不能为 0/负数/非整数（仅 STOCK_SPLIT/REVERSE_SPLIT 可传 ratio 走专用字段）
  const shares = Number(change.shares);
  if (!Number.isFinite(shares))
    return { ok: false, error: 'shares 必须为有限数字' };
  if (change.type === ChangeType.STOCK_SPLIT || change.type === ChangeType.REVERSE_SPLIT) {
    if (shares <= 0)
      return { ok: false, error: '拆股/合股的 ratio 必须 > 0' };
  } else {
    if (!Number.isInteger(shares))
      return { ok: false, error: 'shares 必须为整数股数' };
    if (shares === 0)
      return { ok: false, error: 'shares 不允许为 0（请删除该变动或选择 ADJUSTMENT）' };
    if (shares < 0)
      return { ok: false, error: 'shares 不允许为负数；卖出请使用 SELL 类型 + shares>0' };
  }

  // 价格校验：
  //   - CASH_TYPES（BUY/RIGHTS_ISSUE）：理想情况有 price；缺失时按"未知价"降级为按均价加仓，
  //     不视为硬错误，但需用 inferred 标记让上游知晓。
  //   - 其他类型：price 可空；若提供则必须 > 0。
  if (change.price == null) {
    if (CASH_TYPES.has(change.type)) {
      change._inferredCost = true; // 标注：未提供价格，按当前均价模拟
    }
  } else {
    if (!Number.isFinite(Number(change.price)) || Number(change.price) <= 0)
      return { ok: false, error: 'price 若提供必须为正数' };
  }

  // 卖出数量不得超过可用持仓
  if (change.type === ChangeType.SELL) {
    const avail = ctx.existingShares ?? 0;
    if (shares > avail)
      return { ok: false, error: `卖出 ${shares} 超过可用持仓 ${avail}` };
  }

  // 变动日期不得早于建仓日
  if (ctx.firstDate && change.date < ctx.firstDate)
    return { ok: false, error: `变动日期 ${change.date} 早于建仓日 ${ctx.firstDate}` };

  return { ok: true };
}

/**
 * 计算单次变动对持仓的影响。
 * @returns {{ sharesDelta: number, costDelta: number, newCost?: number }} newCost 仅 BUY/RIGHTS_ISSUE 有
 */
function applyChange(state, change) {
  const { shares, avgCost, costBasis } = state;
  switch (change.type) {
    case ChangeType.BUY: {
      const newShares = shares + change.shares;
      // 价格未知时按当前均价模拟加仓（成本按比例上升，avg 保持不变）
      const buyPrice = change.price != null ? change.price : avgCost;
      const newCostBasis = costBasis + change.shares * buyPrice;
      const newAvg = newCostBasis / newShares;
      return { sharesDelta: change.shares, costDelta: newCostBasis - costBasis, newCost: newAvg };
    }
    case ChangeType.SELL: {
      // 卖出不动均价，总成本按比例下降
      const newShares = shares - change.shares;
      const newCostBasis = newShares > 0 ? costBasis * (newShares / shares) : 0;
      return { sharesDelta: -change.shares, costDelta: newCostBasis - costBasis };
    }
    case ChangeType.DIVIDEND_SHARE:
    case ChangeType.TRANSFER_SHARE: {
      // 每 shares 股送 change.shares 股：新股数 = shares + change.shares，成本按比例下调
      const newShares = shares + change.shares;
      const newAvg = costBasis / newShares;
      return { sharesDelta: change.shares, costDelta: 0, newCost: newAvg };
    }
    case ChangeType.RIGHTS_ISSUE: {
      // 配股：shares 增加，付出 price × shares 现金（price 缺失则按当前均价）
      const newShares = shares + change.shares;
      const issuePrice = change.price != null ? change.price : avgCost;
      const newCostBasis = costBasis + change.shares * issuePrice;
      const newAvg = newCostBasis / newShares;
      return { sharesDelta: change.shares, costDelta: newCostBasis - costBasis, newCost: newAvg };
    }
    case ChangeType.STOCK_SPLIT: {
      // shares 字段在 STOCK_SPLIT 中是 ratio（>1，如 2 表示 1 拆 2）
      const ratio = change.shares;
      const newShares = shares * ratio;
      const newAvg = avgCost / ratio;
      return { sharesDelta: newShares - shares, costDelta: 0, newCost: newAvg };
    }
    case ChangeType.REVERSE_SPLIT: {
      const ratio = change.shares; // N 股合 1 股
      const newShares = shares / ratio;
      const newAvg = avgCost * ratio;
      return { sharesDelta: newShares - shares, costDelta: 0, newCost: newAvg };
    }
    case ChangeType.ADJUSTMENT: {
      // 手动调整：直接覆盖股数；成本信息若提供则更新均价
      const newShares = shares + change.shares;
      const newAvg = change.price != null ? Number(change.price) : avgCost;
      const newCostBasis = newShares * newAvg;
      return { sharesDelta: change.shares, costDelta: newCostBasis - costBasis, newCost: newAvg };
    }
    default:
      throw new Error(`applyChange 不支持类型: ${change.type}`);
  }
}

/**
 * 从按时间排序的变动列表推导最终持仓状态。
 * @param {Change[]} changes - 必须按 date 升序
 * @returns {{ shares: number, avgCost: number, costBasis: number, log: Array<{change, sharesAfter, avgCostAfter, costBasisAfter}> }}
 */
function computeFromChanges(changes) {
  // 1) 按 ticker+date 排序，date 同时加 index 防同日并列
  const sorted = [...changes].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? -1 : 1;
    return (a.seq ?? 0) - (b.seq ?? 0);
  });

  const states = new Map(); // ticker -> { shares, avgCost, costBasis, firstDate }
  const log = [];

  for (const ch of sorted) {
    const s = states.get(ch.ticker) ?? { shares: 0, avgCost: 0, costBasis: 0, firstDate: ch.date };
    const check = validateChange(ch, { existingShares: s.shares, firstDate: s.firstDate });
    if (!check.ok) throw new Error(`[${ch.ticker} ${ch.date}] ${check.error}`);

    const eff = applyChange(s, ch);
    const newShares = s.shares + eff.sharesDelta;
    const newAvg = eff.newCost ?? s.avgCost;
    const newCostBasis = newShares * newAvg;

    states.set(ch.ticker, {
      shares: newShares,
      avgCost: newAvg,
      costBasis: newCostBasis,
      firstDate: s.firstDate,
    });

    log.push({
      change: { ...ch },
      sharesAfter: newShares,
      avgCostAfter: newAvg,
      costBasisAfter: newCostBasis,
    });
  }

  // 2) 汇总当前所有 ticker 的最新状态
  const holdings = [...states.entries()].map(([ticker, st]) => ({
    ticker,
    shares: st.shares,
    avgCost: st.avgCost,
    costBasis: st.costBasis,
    firstDate: st.firstDate,
  }));

  return { holdings, log };
}

/**
 * 查询变动明细（带可选过滤）。
 * @param {Change[]} changes
 * @param {{ ticker?: string, from?: string, to?: string }} q
 */
function queryChanges(changes, q = {}) {
  return [...changes]
    .filter(c => !q.ticker || c.ticker === q.ticker)
    .filter(c => !q.from || c.date >= q.from)
    .filter(c => !q.to || c.date <= q.to)
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}

/**
 * 求指定 ticker 在指定日期的累计状态（基于该日及之前的变动）。
 */
function getHoldingAt(changes, ticker, date) {
  const hist = changes
    .filter(c => c.ticker === ticker && c.date <= date)
    .sort((a, b) => (a.date < b.date ? -1 : 1));
  const { holdings } = computeFromChanges(hist);
  return holdings.find(h => h.ticker === ticker) ?? { ticker, shares: 0, avgCost: 0, costBasis: 0 };
}

window.Holdings = { ChangeType, CASH_TYPES, NON_COST_BASIS_CHANGING_TYPES, validateChange, applyChange, computeFromChanges, queryChanges, getHoldingAt };
})();
