/*
 * 大V投资跟踪站 —— 数据文件（真实公开内容版）
 * ----------------------------------------------------------------------------
 * 数据来源：2026-08-01 通过公开网络检索整理，仅作【个人私密】跟踪用途。
 *  - 金渐成(玑哥)：其自建公开站 jinjiancheng.com + IMA笔记《金渐成的持仓》
 *  - 鹿鼎公 / 榆林子洲：雪球公开帖 + 榆林子洲公众号/IMA笔记
 * 说明：
 *  - 内容为「摘要 + 短引述 + 来源链接」，未整篇搬运原文；如要公开分享请注意版权。
 *  - “持仓”按约定定义为大V在文章/发言中【公开提及或披露】的仓位，非实时行情；
 *    部分标注“历史/非实时”，请以大V最新披露为准。
 *  - 无法核实的内容不收录，绝不编造。
 *
 * 数据模型（2026-08-01 升级为 portfolios 多期结构）：
 *   每位大V含 portfolios: [{ date, label, source, note?, holdings:[...] }]，按时间正序。
 *   每条 holding: { name, ticker, weight(展示用字符串), w(百分比数值,不可比则 null),
 *                   note, source, date, account?(金渐成账户分层用) }
 *   - w 用于自动计算「本期 vs 上一期」变化方向（新建/加仓/减仓/清仓/持平/不可比）。
 *   - 跨期匹配以 name 为准；两期 name 保持一致才能正确对比。
 *
 * 继续更新：把大V新原文发给我，我整理后追加一个 portfolio 快照即可自动对比。
 */

window.META = {
  sample: false,
  updatedAt: "2026-08-17",
  note: "数据来自公开网络检索（2026-08-01）；2026-08-11 补充金渐成国际账户/精确占比/理念金句/人物画像 + 鹿鼎公 2026-08-10 股数快照（含长江电力做T）；2026-08-17 新增段永平 2026 Q2 13F（dataroma，18只/$19.1B，组合日2026-06-30）；同日新增伯克希尔·哈撒韦（dataroma 29只/$299B）与李录喜马拉雅资本（insiderset/SEC 13F 8只/$3.70B）两家，均含 2026 Q2 13F；仅供个人跟踪用途，非投资建议。"
};

window.PEOPLE = [
  {
    id: "jinjiancheng",
    name: "金渐成",
    platforms: ["公众号"],
    tagline: "全球资产配置者（玑哥）：美股宽基+科技龙头为锚，铜作周期增强",
    style: "全球配置 / 美股宽基+科技+商品",
    riskAppetite: "中（四账户分层：进取/稳健/防守/国际）",
    lastUpdate: "2026-07-29",
    portfolios: [
      {
        date: "2026-05-15",
        label: "2026年5月 · 自建站 jinjiancheng.com 披露",
        source: "公众号",
        note: "账户结构快照（来自 jinjiancheng.com/portfolio）",
        holdings: [
          { name: "纳指100+标普500 ETF", ticker: "VOO/QQQ", weight: "稳健账户约70%", w: 70, note: "稳健型账户以宽基为锚。来源：jinjiancheng.com/portfolio", source: "公众号", date: "2026-05-15" },
          { name: "伯克希尔（BRK）", ticker: "BRK", weight: "约8%", w: 8, note: "防守/压仓仓位。", source: "公众号", date: "2026-05-15" },
          { name: "科技七巨头/AI主线", ticker: "NVDA/TSM/AVGO", weight: "进取账户", w: null, skip: true, note: "进取型账户科技龙头（粗口径，7月已拆细，不参与跨期对比）；2026-03-23减仓英伟达30%等。", source: "公众号", date: "2026-03-23" },
          { name: "伦铜+沪铜", ticker: "CU", weight: "伦铜2/3、沪铜1/3", w: null, note: "大宗商品主仓；明确不碰黄金白银。来源：jinjiancheng.com/notes/commodities-copper-framework。⚠️ 口径提示：IMA《金渐成（玑哥）持仓研究》（2026-07-01）称伦铜期货已于约5/7清仓（获利约4.4倍、最高$14,500）；本站5/15仍记为商品主仓，二者存在口径冲突，5月后是否仍持有铜待核实。", source: "公众号", date: "2026-05-15" },
          { name: "美债/消费蓝筹/分红资产", ticker: "—", weight: "防守型", w: null, skip: true, note: "防守型账户（粗口径，7月已拆细，不参与跨期对比）。", source: "公众号", date: "2026-05-15" }
        ]
      },
      {
        date: "2026-07-29",
        label: "2026-07-29 · 最新账户分层持仓（IMA笔记）",
        source: "公众号",
        note: "进取约39% / 稳健约24.5% / 防守约36.5%（三层合计≈100%；国际账户见下方独立记录，按文章口径单列、不计入此三层）",
        holdings: [
          { name: "英伟达（进取账户）", ticker: "NVDA", weight: "进取账户第1重仓", w: null, account: "进取", skip: true, note: "进取型账户个股占比第一（7月拆细口径，不与5月粗口径对比）。来源：IMA笔记《金渐成的持仓》。", source: "公众号", date: "2026-07-29" },
          { name: "谷歌/微软/苹果/台积电/亚马逊（进取账户）", ticker: "GOOGL/MSFT/AAPL/TSM/AMZN", weight: "进取账户内", w: null, account: "进取", skip: true, note: "按占比排序紧随英伟达之后，均为科技龙头（7月拆细口径）。", source: "公众号", date: "2026-07-29" },
          { name: "Meta/博通/AMD/特斯拉/甲骨文（进取账户）", ticker: "META/AVGO/AMD/TSLA/ORCL", weight: "均<1.2%", w: null, account: "进取", skip: true, note: "进取账户尾部小仓（甲骨文0.26%，7月拆细口径）。", source: "公众号", date: "2026-07-29" },
          { name: "纳指100+标普500 ETF", ticker: "QQQ/VOO", weight: "稳健账户>60%", w: 62, account: "稳健", note: "稳健型账户核心宽基（>60%，约62%估算）。", source: "公众号", date: "2026-07-29" },
          { name: "医药保健（联合健康/强生/礼来）（稳健账户）", ticker: "UNH/JNJ/LLY", weight: "稳健账户约27%", w: 27, account: "稳健", skip: true, note: "稳健账户医药保健板块（7月拆细口径，约27%）。文章4/10口径为19.3%（含诺和诺德）；本站7/29已不含诺和诺德，方向与文章「计划清仓诺和诺德」一致。", source: "公众号", date: "2026-07-29" },
          { name: "消费（沃尔玛/Costco/麦当劳）（稳健账户）", ticker: "WMT/COST/MCD", weight: "稳健账户约13%", w: 13, account: "稳健", skip: true, note: "稳健账户消费板块（7月拆细口径，约13%）。文章4/10口径14.19%含宝洁；本站7/29不含宝洁，方向与文章「计划清仓宝洁」一致。", source: "公众号", date: "2026-07-29" },
          { name: "美债及相关ETF（防守账户）", ticker: "—", weight: "防守账户约58%", w: 58, account: "防守", skip: true, note: "防守型账户稳定生息底仓（7月拆细口径，约58%）。文章4/10口径为65%。", source: "公众号", date: "2026-07-29" },
          { name: "伯克希尔（BRK）", ticker: "BRK", weight: "防守账户含BRK（无单独占比）", w: null, account: "防守", note: "防守账户约42%含BRK，无单独占比。文章4/10记录BRK.B单独占比13.5%（分红个股21.3%含可口可乐/强生/SCHD/VISA）。", source: "公众号", date: "2026-07-29" },
          { name: "可口可乐/强生/SCHD/VISA（防守账户）", ticker: "KO/JNJ/SCHD/V", weight: "防守账户含", w: null, account: "防守", skip: true, note: "防守账户分红/优质资产（7月拆细口径）。", source: "公众号", date: "2026-07-29" },
          { name: "伦铜+沪铜", ticker: "CU", weight: "7月未提及", w: null, account: "商品", note: "7-29月报未提及铜仓位（此前为大宗商品主仓）；方向不可比。", source: "公众号", date: "2026-07-29" },
          { name: "腾讯控股（国际账户）", ticker: "0700.HK", weight: "约460港元（200买入·负成本·仅剩3成·等15倍PE补仓）", w: null, account: "国际", note: "国际账户核心头寸。文章口径：200港元建仓、现价约460、已负成本，仅保留3成仓位，计划等15倍PE再补。来源：IMA《金渐成（玑哥）持仓研究》（东汉文舒，2026-07-01）。", source: "公众号", date: "2026-05-07" },
          { name: "日本/英国/印度/韩国（国际分散）", ticker: "—", weight: "日本最强(单日+6%)/英国富时100/印度浮亏1.3%/韩国未参与", w: null, account: "国际", note: "国际账户区域分散：日本表现最强（单日+6%）、英国（富时100）、印度（浮亏约1.3%）、韩国未参与。来源：同上文。", source: "公众号", date: "2026-05-07" },
          { name: "伦铜期货（国际账户·已清仓）", ticker: "CU-F", weight: "最高$14,500·获利约4.4倍·已清仓", w: null, account: "国际", note: "文章口径：伦铜期货已于约5/7清仓，最高触及$14,500、获利约4.4倍。与本站5/15「伦铜+沪铜仍为商品主仓」存在口径冲突（见5/15快照note），5月后是否仍持有铜待核实。来源：同上文。", source: "公众号", date: "2026-05-07" }
        ]
      }
    ],
    viewpoints: [
      {
        date: "2026-07-29",
        content: "披露最新账户分层持仓：进取型约39%（英伟达为首的科技龙头）、稳健型约24.5%（纳指100+标普500 ETF>60%、医药保健27%、消费13%）、防守型约36.5%（美债及相关ETF约58%、伯克希尔/可口可乐/强生/SCHD/VISA约42%）。来源：IMA笔记《金渐成的持仓》。",
        source: "公众号",
        tags: ["持仓", "账户分层"]
      },
      {
        date: "2026-07-01",
        content: "【文章口径参考·2026-07-01】IMA《金渐成（玑哥）持仓研究》（作者东汉文舒）披露截至~5/7的精确分层：进取账户内 NVDA 46.11% / GOOGL 17.54% / MSFT 15.6% / AMZN·AAPL·TSM·META 各4.2-5.5% / AMD ~1.45% / AVGO 负成本 / TSLA·ORCL·NFLX ~3.45%（负成本旅程：AMD $75→$421、AVGO <$140→$425）；稳健账户 宽基66.47% / 消费14.19%（含宝洁）/ 医药19.30%（含诺和诺德）；防守账户 美债65% / BRK.B 13.5% / 分红个股21.3%。国际账户含腾讯(0700.HK，200→460港元·负成本)、日本、英国、印度、韩国，伦铜期货已清仓(获利4.4倍)。注意此为文章研究口径，与本站7/29快照（进取39%/稳健24.5%/防守36.5%）因时间不同而有差异。",
        source: "IMA《金渐成（玑哥）持仓研究》",
        tags: ["持仓", "文章口径", "参考"]
      },
      {
        date: "2026-06",
        content: "【信息断档背景·2026-06】金渐成明确表示「后续更新会大幅度减少」；6/1–6/21 出现信息断档，6月发布的7篇文章均无持仓数据更新（5/7后因合规下架部分历史文章）。本站7/29仍有账户分层更新，比文章更新，但此前未记录此断档背景。",
        source: "IMA《金渐成（玑哥）持仓研究》",
        tags: ["背景", "更新频率"]
      },
      {
        date: "2026-06-21",
        content: "新文章《新的选择》（美股/房地产），延续对美股与房地产的观察记录。",
        source: "公众号",
        tags: ["美股", "房地产"]
      },
      {
        date: "2026-05-15",
        content: "投资三要素：资金、耐心、勇气。资金是前提（决定能否留在牌桌）；勇气来自极低成本和充足仓位（敢在暴跌捡带血筹码）；耐心花时间最多。强调“所有的盈利都是认知的变现，所有的亏损都是认知的缺陷”；并明确“不做A股、不荐股、没有任何群、不做知识付费”。",
        source: "公众号",
        tags: ["理念", "认知"]
      },
      {
        date: "2026-05-24",
        content: "大宗商品框架：铜是大宗商品之王、全球经济的晴雨表；短期看降息、中长期看复苏和需求；提前分批埋伏、涨太快不追、倒金字塔减仓先把成本掏出；商品是组合的增强项、不是底层资产。明确不碰黄金白银，只专注铜。",
        source: "公众号",
        tags: ["商品", "铜"]
      },
      {
        date: "2026-03-23",
        content: "近半年高位减仓：英伟达约30%、微软/ Meta/ 台积电/ 特斯拉分批兑现；同时继续加仓 VOO/QQQ 梯度抄底，体现“高位兑现、低位埋伏”的节奏。",
        source: "公众号",
        tags: ["操作", "仓位"]
      }
    ],
    philosophy: {
      summary: "全球资产配置者：以美股宽基（纳指100/标普500）与科技龙头为锚，铜作为周期增强；四账户分层（进取/稳健/防守/国际），信奉「万物皆周期」「永远留在牌桌上」，仓位常设7-7.5成、极端8.5成永不满仓；强调安全边际与低成本/负成本思维。认为投资是认知的变现，最终服务于生活与家人陪伴。",
      points: [
        "只买全球最顶级的十几家公司，不碰垃圾股、题材股",
        "万物皆周期：一切资产都有周期，周期是核心认知框架",
        "永远留在牌桌上：风控第一，永不满仓（7-7.5成常设、极端8.5成）",
        "金字塔加仓（倍数1-1-1.5-1.5-2-3）、倒金字塔卖出（PEG≥2 触发），严格交易纪律",
        "不把全部资金放进一个市场/品种；盈利后提取利润构筑防守垫",
        "商品（铜）是组合的增强项，不是底层资产",
        "账户分四层管理：进取（科技龙头）/稳健（宽基+医药消费）/防守（美债+分红）/国际（腾讯港股+日英印韩），按风险分层"
      ],
      quotes: [
        "投资三要素：资金、耐心、勇气",
        "所有的盈利都是认知的变现，所有的亏损都是认知的缺陷",
        "万物皆周期",
        "永远留在牌桌上",
        "要么第一，要么唯一",
        "不做A股、不荐股、没有任何群、不做知识付费",
        "铜是大宗商品之王，也是全球经济的晴雨表"
      ]
    }
  },

  {
    id: "ludinggong",
    name: "鹿鼎公",
    platforms: ["雪球"],
    tagline: "民间价值投资者（超级鹿鼎公）：16字心法，追求持仓现金流不断扩大",
    style: "价值+高股息 / 16字心法",
    riskAppetite: "中（估值定仓，低估值敢重仓）",
    lastUpdate: "2026-08-10",
    portfolios: [
      {
        date: "2025-05",
        label: "2025年5月 · 腾讯文档完整持仓截图",
        source: "腾讯文档",
        stockCount: 15,
        note: "来自腾讯文档《鹿公五月持仓及变动》截图；总持仓占比约86.41%，其余为现金/不足列示品种。",
        holdings: [
          { name: "中国神华", ticker: "01088.HK", weight: "23.51%", w: 23.51, note: "H股；余额约358.86万股，成本13.41，仓位占比23.51%（第一大重仓）。", source: "腾讯文档", date: "2025-05" },
          { name: "中煤能源", ticker: "01898.HK", weight: "21.14%", w: 21.14, note: "H股；余额约322.19万股，成本4.62，盈亏比例约75.35%，仓位占比21.14%。", source: "腾讯文档", date: "2025-05" },
          { name: "内蒙华电", ticker: "600863.SH", weight: "10.62%", w: 10.62, note: "A股；余额约161.81万股，成本4.45，盈亏比例约17.17%，仓位占比10.62%。", source: "腾讯文档", date: "2025-05" },
          { name: "华能国际", ticker: "00902.HK", weight: "7.41%", w: 7.41, note: "H股；余额约132.76万股，成本16.21，盈亏比例约1.85%，仓位占比7.41%。", source: "腾讯文档", date: "2025-05" },
          { name: "淮北矿业", ticker: "600985.SH", weight: "3.27%", w: 3.27, note: "A股；余额约71.79万股，成本-36.10（已实现负成本），盈亏比例0.00%，仓位占比3.27%。", source: "腾讯文档", date: "2025-05" },
          { name: "新城发展", ticker: "01030.HK", weight: "4.68%", w: 4.68, note: "H股；余额约71.18万股，成本0.39，盈亏比例约3656.50%，仓位占比4.68%。", source: "腾讯文档", date: "2025-05" },
          { name: "兖矿能源", ticker: "01171.HK", weight: "3.40%", w: 3.40, note: "H股；余额约51.77万股，成本1.18，盈亏比例约0.71%，仓位占比3.40%。", source: "腾讯文档", date: "2025-05" },
          { name: "中国海洋石油", ticker: "00883.HK", weight: "3.39%", w: 3.39, note: "H股；余额约51.42万股，成本17.40，盈亏比例约3.61%，仓位占比3.39%。", source: "腾讯文档", date: "2025-05" },
          { name: "陕西煤业", ticker: "601225.SH", weight: "2.19%", w: 2.19, note: "A股；余额约33.39万股，成本17.92，盈亏比例约16.46%，仓位占比2.19%。", source: "腾讯文档", date: "2025-05" },
          { name: "盐湖股份", ticker: "000792.SZ", weight: "1.56%", w: 1.56, note: "A股；余额约23.76万股，成本16.76，盈亏比例约-5.47%，仓位占比1.56%。", source: "腾讯文档", date: "2025-05" },
          { name: "中国宏桥", ticker: "01378.HK", weight: "1.38%", w: 1.38, note: "H股；余额约21.02万股，成本13.14，盈亏比例约6.83%，仓位占比1.38%。", source: "腾讯文档", date: "2025-05" },
          { name: "中国石油化工股份", ticker: "00386.HK", weight: "1.28%", w: 1.28, note: "H股；余额约19.45万股，成本3.97，盈亏比例约6.28%，仓位占比1.28%。", source: "腾讯文档", date: "2025-05" },
          { name: "国电电力", ticker: "600795.SH", weight: "1.20%", w: 1.20, note: "A股；余额约18.28万股，成本4.99，盈亏比例约-8.46%，仓位占比1.20%。", source: "腾讯文档", date: "2025-05" },
          { name: "腾讯控股", ticker: "00700.HK", weight: "0.90%", w: 0.90, note: "H股；余额约13.71万股，成本351.59，盈亏比例约5.59%，仓位占比0.90%。", source: "腾讯文档", date: "2025-05" },
          { name: "云铝股份", ticker: "000807.SZ", weight: "0.48%", w: 0.48, note: "A股；余额约7.30万股，成本14.99，盈亏比例约0.06%，仓位占比0.48%。", source: "腾讯文档", date: "2025-05" }
        ]
      },
      {
        date: "2026-07",
        label: "2026年7月 · 游戏仓金字塔架构（雪球）",
        source: "雪球",
        note: "游戏仓约1696万→月末1941.3万；仅一期披露，无上一期对比",
        holdings: [
          { name: "长江电力", ticker: "600900.SH", weight: "32.77%", w: 32.77, note: "【防御底盘】成本26.656元；永续稳定分红。7月9日卖出约17%挪向电解铝。", source: "雪球", date: "2026-07" },
          { name: "华能国际", ticker: "600011.SH", weight: "7.77%", w: 7.77, note: "【防御底盘】成本4.183港币；火电弱周期修复。", source: "雪球", date: "2026-07" },
          { name: "中煤能源", ticker: "601898.SH", weight: "11.23%", w: 11.23, note: "【周期·煤炭】成本约-1.19港币（已实现负成本持仓）。", source: "雪球", date: "2026-07" },
          { name: "陕西能源", ticker: "001286.SZ", weight: "5.98%", w: 5.98, note: "【周期·煤炭】成本9.22元。", source: "雪球", date: "2026-07" },
          { name: "陕西煤业", ticker: "601225.SH", weight: "3.34%", w: 3.34, note: "【周期·煤炭】成本21.712元；资源禀赋第一的动力煤龙头。", source: "雪球", date: "2026-07" },
          { name: "中国神华", ticker: "601088.SH", weight: "1.15%", w: 1.15, note: "【周期·煤炭】成本41.924元；供给刚性、高分红。", source: "雪球", date: "2026-07" },
          { name: "云铝股份", ticker: "000807.SZ", weight: "13.05%", w: 13.05, note: "【周期·有色/电解铝】成本20.22元；7月9日电解铝仓位升至28.5%。", source: "雪球", date: "2026-07" },
          { name: "神火股份", ticker: "000933.SZ", weight: "11.81%", w: 11.81, note: "【周期·有色/电解铝】成本27.875元；7月末已超云铝为电解铝第一重仓个股。", source: "雪球", date: "2026-07" },
          { name: "中孚实业", ticker: "600595.SH", weight: "1.33%", w: 1.33, note: "【周期·有色/电解铝】成本6.815元。", source: "雪球", date: "2026-07" },
          { name: "中国海洋石油", ticker: "600938.SH / 00883.HK", weight: "3.12%", w: 3.12, note: "【周期·油气】成本25.651港币；原油底部磨底，高现金流持续分红。", source: "雪球", date: "2026-07" },
          { name: "宝丰能源", ticker: "600989.SH", weight: "1.80%", w: 1.80, note: "【周期·化工】成本22.592元；行业萧条末期，全产业链成本优势。", source: "雪球", date: "2026-07" },
          { name: "中远海控", ticker: "601919.SH", weight: "0.78%", w: 0.78, note: "【周期·航运】成本13.781元；长周期萧条底部。", source: "雪球", date: "2026-07" },
          { name: "新城发展", ticker: "01030.HK", weight: "3.68%", w: 3.68, note: "【逆向弹性】成本0.771港币；地产困境反转初期小仓博弈。", source: "雪球", date: "2026-07" },
          { name: "腾讯控股", ticker: "00700.HK", weight: "0.66%", w: 0.66, note: "【逆向弹性】成本362.876港币；净现金、弱复苏。", source: "雪球", date: "2026-07" },
          { name: "备用现金", ticker: "—", weight: "2.84%", w: 2.84, note: "【备用现金】等待周期行业萧条末期加仓。", source: "雪球", date: "2026-07" }
        ]
      },
      {
        date: "2026-08-10",
        label: "2026-08-10 · 股数快照 + 现价估算占比（用户提供）",
        source: "用户提供",
        note: "用户提供的最新持股数（2026-08-10）。占比按 2026-08-11 收盘价估算：市值=股数×现价，港股（新城发展/腾讯）按汇率 0.913 折算人民币，分母=12只合计约 ¥18,982,880，不含现金；该占比仅反映当前价格下的组合结构，不参与与历史占比的跨期对比。与 2026-07 游戏仓相比，中国神华H、兖矿能源、中国宏桥、中国石油化工、国电电力、中远海控、备用现金未在本次清单出现，系统按「清仓/退出」标记，实际是否仍持有请以鹿鼎公最新披露为准。",
        holdings: [
          { name: "长江电力", ticker: "600900.SH", weight: "147,000 股 · 占比≈21.9%", w: null, note: "2026-08 做T：29.32 卖出、27.67 接回，波动降本（成本进一步下降）。", source: "用户提供", date: "2026-08-10" },
          { name: "云铝股份", ticker: "000807.SZ", weight: "85,000 股 · 占比≈12.2%", w: null, note: "电解铝。", source: "用户提供", date: "2026-08-10" },
          { name: "神火股份", ticker: "000933.SZ", weight: "117,500 股 · 占比≈16.7%", w: null, note: "电解铝。", source: "用户提供", date: "2026-08-10" },
          { name: "中煤能源", ticker: "601898.SH", weight: "195,000 股 · 占比≈14.7%", w: null, note: "煤炭。", source: "用户提供", date: "2026-08-10" },
          { name: "华能国际", ticker: "600011.SH", weight: "280,000 股 · 占比≈10.3%", w: null, note: "火电（华能国际电力股份）。", source: "用户提供", date: "2026-08-10" },
          { name: "陕西能源", ticker: "001286.SZ", weight: "120,000 股 · 占比≈6.8%", w: null, note: "煤炭。", source: "用户提供", date: "2026-08-10" },
          { name: "新城发展", ticker: "01030.HK", weight: "550,000 股 · 占比≈3.7%", w: null, note: "地产困境反转。", source: "用户提供", date: "2026-08-10" },
          { name: "陕西煤业", ticker: "601225.SH", weight: "8,800 股 · 占比≈1.2%", w: null, note: "煤炭。", source: "用户提供", date: "2026-08-10" },
          { name: "中国海洋石油", ticker: "600938.SH", weight: "30,000 股 · 占比≈5.3%", w: null, note: "油气（A股 600938 / H股 00883）。", source: "用户提供", date: "2026-08-10" },
          { name: "宝丰能源", ticker: "600989.SH", weight: "19,000 股 · 占比≈2.4%", w: null, note: "煤化工。", source: "用户提供", date: "2026-08-10" },
          { name: "中孚实业", ticker: "600595.SH", weight: "120,000 股 · 占比≈4.2%", w: null, note: "电解铝。", source: "用户提供", date: "2026-08-10" },
          { name: "腾讯控股", ticker: "00700.HK", weight: "300 股 · 占比≈0.7%", w: null, note: "逆向弹性。", source: "用户提供", date: "2026-08-10" }
        ]
      }
    ],
    viewpoints: [
      {
        date: "2026-08-10",
        content: "【用户补充·2026-08-10 股数快照】当前持股数：长江电力147,000 / 云铝股份85,000 / 神火股份117,500 / 中煤能源195,000 / 华能国际280,000 / 陕西能源120,000 / 新城发展550,000 / 陕西煤业8,800 / 中国海洋石油30,000 / 宝丰能源19,000 / 中孚实业120,000 / 腾讯控股300。另：长江电力做T——29.32 卖出、27.67 接回，波动降本。该快照仅含股数、无占比，与 2026-07 游戏仓口径不可直接对比。",
        source: "用户提供",
        tags: ["持仓", "股数", "做T"]
      },
      {
        date: "2025-05",
        content: "【2025年5月持仓快照 · 腾讯文档】前5大重仓：中国神华H 23.51%、中煤能源H 21.14%、内蒙华电 10.62%、华能国际H 7.41%、淮北矿业 3.27%。神华H未动（成本变化约2%为汇率影响），陕煤成本低了且持续做T（波动降本）。",
        source: "腾讯文档",
        tags: ["持仓快照", "变动"]
      },
      {
        date: "2026-07-31",
        content: "7月收官：游戏仓收盘1941.3万，较月初1696万本月盈利245.3万（+14.46%）、跑赢上证20.86%；较年初1762.5万本年盈利178.8万（+10.14%）、跑赢13.58%。此前6月曾大幅回撤，本月反弹收复。来源：xueqiu.com/8790885129/403129063",
        source: "雪球",
        tags: ["收益", "月报"]
      },
      {
        date: "2026-07-23",
        content: "电解铝现货库存跌破100万吨（从149.6万吨，耗时3个月，淡季完成去库，全靠出口狂飙）；继续看多电解铝供给收缩逻辑。来源：xueqiu.com/3939519647/401753908",
        source: "雪球",
        tags: ["电解铝", "供需"]
      },
      {
        date: "2026-07-14",
        content: "“主仓今年春节以来也回本了。”7月一波连涨，主要标的刚反弹即回本，靠的是仓位管理与低位补仓。来源：xueqiu.com/8790885129/400007390",
        source: "雪球",
        tags: ["回本", "仓位管理"]
      },
      {
        date: "2026-07-10",
        content: "伦铝站上3200美元、伦铝库存已枯竭；判断“煤是电的上游，电是铝的上游，谁的日子不好过，谁的下游就会日子好过一点”。来源：guba.sina.cn/user_3962719063",
        source: "雪球",
        tags: ["电解铝", "逻辑"]
      },
      {
        date: "2026-07-09",
        content: "电解铝仓位升至28.5%（主因云铝、神火加仓）；此前限定铝仓位不超过25%，本次突破上限加仓，并卖出约17%长江电力挪资。月初铝价下跌时做了保护性换股（神火/云铝间切换）。来源：xueqiu.com/8790885129/399213271",
        source: "雪球",
        tags: ["加仓", "电解铝", "调仓"]
      },
      {
        date: "2026-07-29",
        content: "投资理念：追求持仓现金流的不断扩大，靠分红复投；以低估价格买入后，股价的波动其实是朋友；持仓股业绩不能下降、上升更好。来源：xueqiu.com/7589968905/402692572",
        source: "雪球",
        tags: ["理念", "分红复投"]
      },
      {
        date: "2026-07-27",
        content: "谈房地产：可能是“最后的逃命浪”——地是政府独家卖的，开发商利润暴露在阳光下，想多赚只能从管理要效益。",
        source: "雪球",
        tags: ["房地产", "观点"]
      },
      {
        date: "2026-05-15",
        content: "常识与逻辑：好企业+好价格才是王道；市场走出反常识的图形时，默默拿着自己的股票，一遍遍算竞争优势和盈利。",
        source: "雪球",
        tags: ["理念", "常识"]
      },
      {
        date: "2026-07",
        content: "投资16字心法：价值选股、趋势选时、估值定仓、波动降本（底仓不动、小仓做T降成本，全年可贡献10%-20%收益）。",
        source: "雪球",
        tags: ["方法", "心法"]
      }
    ],
    philosophy: {
      summary: "民间价值投资者（超级鹿鼎公），以“价值选股、趋势选时、估值定仓、波动降本”16字心法为核心；追求持仓现金流不断扩大、分红复投。其“游戏仓”采用金字塔仓位架构（2026年7月总规模约1696万→月末1941.3万）：防御底盘约40%（长江电力+华能国际，永续分红锁账户底线）、周期进攻约52%（煤炭/电解铝/油气/化工/航运五大错峰周期赚超额）、逆向弹性小仓约4%（新城发展、腾讯博弈反转）、常年留2%-5%备用现金等逆向加仓机会。以供需+供给政策+美元汇率判断周期位置，再筛“低成本+低负债+稳现金流”龙头，依托波段与分红复投降成本。估值定仓、不与股票谈恋爱，以低估值+高股息作护城河。（注：网传“10年约24倍、零年度亏损”为他人对其业绩的转述，非本人披露，仅供参考。）",
      points: [
        "价值选股：只看行业垄断、低估值、业绩确定性高且看得懂的公司（偏爱现金奶牛）",
        "趋势选时：极度低估且出现右侧信号时介入（地量、无人卖票、公司回购）",
        "估值定仓：仓位与估值成反比，低估值大仓/满仓，高估值减仓",
        "波动降本：底仓不动，≤总仓2%小仓做T，积少成多降成本",
        "金字塔仓位架构：防御底盘(≈40%永续分红)+周期进攻(≈52%五大错峰周期)+逆向弹性(≈4%)+2%-5%现金，层层控成本与风险"
      ],
      quotes: [
        "追求持仓现金流的不断扩大，靠分红复投",
        "好企业+好价格才是王道",
        "不当英雄，只求生存"
      ]
    }
  },

  {
    id: "yulinzizhou",
    name: "榆林子洲",
    platforms: ["公众号", "雪球"],
    tagline: "业余投资者（挚爱子洲）：A股红利价值，分散集中、控回撤",
    style: "A股红利价值 / 分散集中",
    riskAppetite: "中（均衡多行业，控回撤）",
    lastUpdate: "2026-07-31",
    portfolios: [
      {
        date: "2026-03-11",
        label: "2026-03-11 · 雪球公开仓位",
        source: "雪球",
        note: "来自雪球公开帖（xueqiu.com/7123126150/379022838）",
        holdings: [
          { name: "腾讯控股", ticker: "00700.HK", weight: "37.1%", w: 37.1, note: "彼时第一重仓；7月末月报已不在主要仓位（清仓或降至“不足为道”）。", source: "雪球", date: "2026-03-11" },
          { name: "中国海洋石油 H", ticker: "00883.HK", weight: "15.6%", w: 15.6, note: "3月时15.6%，7月末加仓至35%。", source: "雪球", date: "2026-03-11" },
          { name: "中国平安 A", ticker: "601318.SH", weight: "11%", w: 11, note: "营收恢复、非标下降、银保渠道利润率有保障。", source: "雪球", date: "2026-03-11" },
          { name: "招商银行 A", ticker: "600036.SH", weight: "8.3%", w: 8.3, note: "股息率较高+低估值。", source: "雪球", date: "2026-03-11" },
          { name: "陕西煤业 A", ticker: "601225.SH", weight: "8.4%", w: 8.4, note: "最好动力煤企业、资源禀赋第一。", source: "雪球", date: "2026-03-11" },
          { name: "国电南瑞 A", ticker: "600406.SH", weight: "2.5%", w: 2.5, note: "电力设备护城河，受益十五五电网投资；7月末已不在主要仓位。", source: "雪球", date: "2026-03-11" },
          { name: "美的集团 A", ticker: "000333.SZ", weight: "1.9%", w: 1.9, note: "中国最好家电企业，向智能化转型。", source: "雪球", date: "2026-03-11" }
        ]
      },
      {
        date: "2026-07-31",
        label: "2026-07-31 · 公众号7月投资月报",
        source: "公众号",
        note: "当年收益5.7%，组合股息率约5.5%，目标年底10%",
        holdings: [
          { name: "中国海洋石油 H", ticker: "00883.HK", weight: "35%", w: 35, note: "第一大重仓，较3月(15.6%)大幅加仓。一季度业绩400亿、二季度毛估450亿；补库刚需下油价难大跌，全年看1550亿，港股/港股通股息约1.53/1.23港币，仍不贵。", source: "公众号", date: "2026-07-31" },
          { name: "青岛港 H", ticker: "06198.HK", weight: "11%", w: 11, note: "上半年净利润同比持平，集装箱业务增速高、液体散货下滑；随补库需求液体散货有望持稳。", source: "公众号", date: "2026-07-31" },
          { name: "第一太平", ticker: "00142.HK", weight: "6%", w: 6, note: "因汇率因素上半年业绩承压，好在估值较低。", source: "公众号", date: "2026-07-31" },
          { name: "陕西煤业 A", ticker: "601225.SH", weight: "11%", w: 11, note: "二季度利润在四大煤企中应较好，全年200亿净利有希望；后续半年北港动力煤750-850浮动，股价大体合理。", source: "公众号", date: "2026-07-31" },
          { name: "中国平安 A", ticker: "601318.SH", weight: "12%", w: 12, note: "沿用此前逻辑：营收恢复、非标下降、银保渠道利润率有保障。", source: "公众号", date: "2026-07-31" },
          { name: "招商银行 A", ticker: "600036.SH", weight: "10%", w: 10, note: "沿用此前逻辑：股息率较高+低估值，有配置价值。", source: "公众号", date: "2026-07-31" },
          { name: "天山铝业 A", ticker: "002532.SZ", weight: "7%", w: 7, note: "全产业链铝业，对比水铝成本更稳定；现金充沛，行业低谷期净利润率高。", source: "公众号", date: "2026-07-31" },
          { name: "美的集团 A", ticker: "000333.SZ", weight: "3%", w: 3, note: "沿用此前逻辑：中国最好家电企业，向智能化转型。", source: "公众号", date: "2026-07-31" },
          { name: "鄂资B", ticker: "900936.SH", weight: "3%", w: 3, note: "派息好、估值低、副产品多、成本可控，入股牛矿马泰壕；组合中股息率最高。", source: "公众号", date: "2026-07-31" }
        ]
      }
    ],
    viewpoints: [
      {
        date: "2026-07-31",
        content: "2026年7月投资月报：截至7月末当年收益5.7%，组合股息率约5.5%（合理偏低估一丢丢）；有信心年底实现10%年化收益。今年前7个月难度不在回撤多少，而在半导体概念股涨跌对心理的冲击——尽量不为能力圈以外的股票牵动情绪。当前市场整体浮躁、做趋势盛行、价值投资理念受挤压。",
        source: "公众号",
        tags: ["月报", "收益", "心态"]
      },
      {
        date: "2026-07-31",
        content: "海油：一季度业绩400亿、二季度毛估450亿；补库刚需下油价难大跌，全年看1550亿，港股/港股通账号股息分别约1.53/1.23港币，仍不贵；去年67.5美元实现油价仍有39.4%净利率，利润韧性足。",
        source: "公众号",
        tags: ["海油H", "个股"]
      },
      {
        date: "2026-07-31",
        content: "陕煤：二季度利润在四大煤企中应较好，全年200亿净利有希望；后续半年北港动力煤750-850浮动，股价大体合理。天山铝业：全产业链、对比水铝成本更稳定，现金充沛、低谷期净利率高。鄂资B：派息好、估值低、股息率全组合最高。",
        source: "公众号",
        tags: ["陕煤", "天山铝业", "鄂资B"]
      },
      {
        date: "2026-04-28",
        content: "“哪有必胜的股票，都是心魔罢了。”提高胜率就好，一切都是概率；向内求，了解自己投资的公司、拆解自己的心态；不盲从大V。来源：xueqiu.com/7123126150/386401445",
        source: "雪球",
        tags: ["心态", "概率"]
      },
      {
        date: "2026-03-11",
        content: "截至3月11日收盘公开仓位（腾讯37.1%/海油H15.6%/平安11%/招行8.3%/陕煤8.4%/南瑞2.5%等），今年收益7.8%；称以后操作频率降低，如无大操作不再披露。来源：xueqiu.com/7123126150/379022838",
        source: "雪球",
        tags: ["仓位披露", "操作"]
      },
      {
        date: "2026-01-31",
        content: "2026年1月投资总结：均衡布局互联网/油气/电信/保险/银行/煤炭/电气设备，内心踏实；估值适中时注意防守、开展波段操作控制回撤。来源：xueqiu.com/7123126150/374059653",
        source: "雪球",
        tags: ["总结", "配置"]
      },
      {
        date: "2026-04",
        content: "近期感悟：年龄增长看得更长更远，不再为油价、煤价等短期数据受累身心；抓住大逻辑——如南瑞的电力需求+竞争优势、陕煤的优质资源禀赋。",
        source: "雪球",
        tags: ["感悟", "逻辑"]
      }
    ],
    philosophy: {
      summary: "业余投资者，入市约15年。赚三份钱（股息、企业增长、市场波动）；主张“分散但集中”——主要仓位控制在3-4支深入研究的好公司，长期持有1-3年；控制回撤、用下跌调整组合；不熟不碰。2026年7月月报再强调：尽量不为能力圈以外的股票（如半导体概念）牵动情绪，市场浮躁时仍坚持价值投资。",
      points: [
        "股票是公司所有权，赚股息+企业增长+市场波动三份钱",
        "分散不是摊大饼：主仓3-4支深入研究、优中选优",
        "长期持有1-3年，低估买入，优秀公司2-5年爆发",
        "控制回撤：每轮下跌是调整组合、夯实资产的好机会",
        "不为能力圈以外的股票牵动情绪（如半导体概念涨跌）"
      ],
      quotes: [
        "哪有必胜的股票，都是心魔罢了",
        "提高胜率就好，一切都是概率",
        "向内求，了解自己投资的公司，拆解自己的心态",
        "市场整体浮躁、做趋势盛行、价值投资理念受挤压"
      ]
    }
  },

  {
    id: "duanyongping",
    name: "段永平",
    platforms: ["dataroma"],
    tagline: "价值投资实践者（大道）：重仓苹果、伯克希尔，美股13F公开持仓",
    style: "价值投资 / 长期持有 / 集中重仓",
    riskAppetite: "中高（高度集中，不懂不做）",
    lastUpdate: "2026-08-17",
    portfolios: [
      {
        date: "2025-03-31",
        label: "2025年Q1 · 13F",
        source: "dataroma",
        portfolioValue: "$12.0B",
        stockCount: 11,
        note: "投资组合价值约120亿美元；苹果占63%高度集中。",
        holdings: [
          { name: "Apple Inc.", ticker: "AAPL", weight: "63.33%", w: 63.33, note: "第一重仓，占比超六成。", date: "2025-03-31" },
          { name: "Berkshire Hathaway CL B", ticker: "BRK.B", weight: "15.00%", w: 15.00, note: "巴菲特公司，压舱石。", date: "2025-03-31" },
          { name: "Pinduoduo Inc.", ticker: "PDD", weight: "7.64%", w: 7.64, note: "中概消费。", date: "2025-03-31" },
          { name: "Occidental Petroleum", ticker: "OXY", weight: "5.69%", w: 5.69, note: "能源。", date: "2025-03-31" },
          { name: "Alibaba Group Holdings", ticker: "BABA", weight: "4.39%", w: 4.39, note: "中概互联网。", date: "2025-03-31" },
          { name: "Alphabet Inc. CL C", ticker: "GOOG", weight: "1.45%", w: 1.45, note: "谷歌。", date: "2025-03-31" },
          { name: "Microsoft Corp.", ticker: "MSFT", weight: "0.94%", w: 0.94, note: "微软。", date: "2025-03-31" },
          { name: "Walt Disney Co.", ticker: "DIS", weight: "0.59%", w: 0.59, note: "迪士尼。", date: "2025-03-31" },
          { name: "NVIDIA Corp.", ticker: "NVDA", weight: "0.58%", w: 0.58, note: "英伟达小仓。", date: "2025-03-31" },
          { name: "Taiwan Semiconductor S.A.", ticker: "TSM", weight: "0.38%", w: 0.38, note: "台积电小仓。", date: "2025-03-31" }
        ]
      },
      {
        date: "2025-06-30",
        label: "2025年Q2 · 13F",
        source: "dataroma",
        portfolioValue: "$11.5B",
        stockCount: 10,
        note: "投资组合价值约115亿美元；苹果占比略升至62.47%。",
        holdings: [
          { name: "Apple Inc.", ticker: "AAPL", weight: "62.47%", w: 62.47, note: "第一重仓。", date: "2025-06-30" },
          { name: "Berkshire Hathaway CL B", ticker: "BRK.B", weight: "14.24%", w: 14.24, note: "压舱石。", date: "2025-06-30" },
          { name: "Pinduoduo Inc.", ticker: "PDD", weight: "7.86%", w: 7.86, note: "中概消费。", date: "2025-06-30" },
          { name: "Occidental Petroleum", ticker: "OXY", weight: "4.94%", w: 4.94, note: "能源。", date: "2025-06-30" },
          { name: "Alibaba Group Holdings", ticker: "BABA", weight: "3.68%", w: 3.68, note: "中概互联网。", date: "2025-06-30" },
          { name: "Alphabet Inc. CL C", ticker: "GOOG", weight: "2.99%", w: 2.99, note: "谷歌。", date: "2025-06-30" },
          { name: "NVIDIA Corp.", ticker: "NVDA", weight: "1.32%", w: 1.32, note: "英伟达加仓。", date: "2025-06-30" },
          { name: "Microsoft Corp.", ticker: "MSFT", weight: "1.20%", w: 1.20, note: "微软。", date: "2025-06-30" },
          { name: "Walt Disney Co.", ticker: "DIS", weight: "0.78%", w: 0.78, note: "迪士尼。", date: "2025-06-30" },
          { name: "Taiwan Semiconductor S.A.", ticker: "TSM", weight: "0.51%", w: 0.51, note: "台积电。", date: "2025-06-30" }
        ]
      },
      {
        date: "2025-09-30",
        label: "2025年Q3 · 13F",
        source: "dataroma",
        portfolioValue: "$14.7B",
        stockCount: 11,
        note: "投资组合价值约147亿美元；伯克希尔加仓、苹果减仓。",
        holdings: [
          { name: "Apple Inc.", ticker: "AAPL", weight: "60.42%", w: 60.42, note: "第一重仓，开始减仓。", date: "2025-09-30" },
          { name: "Berkshire Hathaway CL B", ticker: "BRK.B", weight: "17.78%", w: 17.78, note: "压舱石加仓。", date: "2025-09-30" },
          { name: "Pinduoduo Inc.", ticker: "PDD", weight: "7.72%", w: 7.72, note: "中概消费。", date: "2025-09-30" },
          { name: "Occidental Petroleum", ticker: "OXY", weight: "4.36%", w: 4.36, note: "能源。", date: "2025-09-30" },
          { name: "Alibaba Group Holdings", ticker: "BABA", weight: "3.38%", w: 3.38, note: "中概互联网。", date: "2025-09-30" },
          { name: "Alphabet Inc. CL C", ticker: "GOOG", weight: "3.00%", w: 3.00, note: "谷歌。", date: "2025-09-30" },
          { name: "Microsoft Corp.", ticker: "MSFT", weight: "0.99%", w: 0.99, note: "微软。", date: "2025-09-30" },
          { name: "NVIDIA Corp.", ticker: "NVDA", weight: "0.76%", w: 0.76, note: "英伟达。", date: "2025-09-30" },
          { name: "Walt Disney Co.", ticker: "DIS", weight: "0.56%", w: 0.56, note: "迪士尼。", date: "2025-09-30" },
          { name: "ASML Holding NV", ticker: "ASML", weight: "0.53%", w: 0.53, note: "光刻机。", date: "2025-09-30" },
          { name: "Taiwan Semiconductor S.A.", ticker: "TSM", weight: "0.49%", w: 0.49, note: "台积电。", date: "2025-09-30" }
        ]
      },
      {
        date: "2025-12-31",
        label: "2025年Q4 · 13F",
        source: "dataroma",
        portfolioValue: "$17.5B",
        stockCount: 14,
        note: "投资组合价值约175亿美元；大幅加仓英伟达、台积电、微软、伯克希尔、拼多多。",
        holdings: [
          { name: "Apple Inc.", ticker: "AAPL", weight: "50.30%", w: 50.30, note: "第一重仓，继续减仓。", date: "2025-12-31" },
          { name: "Berkshire Hathaway CL B", ticker: "BRK.B", weight: "20.63%", w: 20.63, note: "压舱石继续加仓。", date: "2025-12-31" },
          { name: "NVIDIA Corp.", ticker: "NVDA", weight: "7.72%", w: 7.72, note: "英伟达大幅加仓。", date: "2025-12-31" },
          { name: "Pinduoduo Inc.", ticker: "PDD", weight: "7.48%", w: 7.48, note: "拼多多加仓。", date: "2025-12-31" },
          { name: "Alphabet Inc. CL C", ticker: "GOOG", weight: "3.33%", w: 3.33, note: "谷歌。", date: "2025-12-31" },
          { name: "Occidental Petroleum", ticker: "OXY", weight: "3.10%", w: 3.10, note: "能源。", date: "2025-12-31" },
          { name: "Microsoft Corp.", ticker: "MSFT", weight: "2.38%", w: 2.38, note: "微软加仓。", date: "2025-12-31" },
          { name: "Alibaba Group Holdings", ticker: "BABA", weight: "2.15%", w: 2.15, note: "阿里巴巴减仓。", date: "2025-12-31" },
          { name: "Taiwan Semiconductor S.A.", ticker: "TSM", weight: "2.13%", w: 2.13, note: "台积电大幅加仓。", date: "2025-12-31" },
          { name: "Walt Disney Co.", ticker: "DIS", weight: "0.46%", w: 0.46, note: "迪士尼。", date: "2025-12-31" },
          { name: "Coreweave Inc Cl A", ticker: "CRWV", weight: "0.12%", w: 0.12, note: "新建仓。", date: "2025-12-31" },
          { name: "Credo Technology Group", ticker: "CRDO", weight: "0.12%", w: 0.12, note: "新建仓。", date: "2025-12-31" },
          { name: "ASML Holding NV", ticker: "ASML", weight: "0.06%", w: 0.06, note: "ASML减仓。", date: "2025-12-31" },
          { name: "Tempus Ai Inc", ticker: "TEM", weight: "0.04%", w: 0.04, note: "新建仓。", date: "2025-12-31" }
        ]
      },
      {
        date: "2026-03-31",
        label: "2026年Q1 · 13F（已核实）",
        source: "dataroma",
        portfolioValue: "$20.0B",
        stockCount: 19,
        note: "投资组合价值约200亿美元（精确 $200.04 亿，提交日 2026-05-19，Accession 0001759760-26-000005，持股 19 只）；清仓阿里巴巴(BABA)、ASML、Coreweave(CRWV)，新建仓特斯拉、联合健康、Circle、Palantir、CrowdStrike、Snowflake、Innodata、Synopsys；大幅加仓英伟达、拼多多、谷歌、伯克希尔、迪士尼、CRDO。注意：13F 仅披露美股多头，不含 A股茅台、港股腾讯/泡泡玛特及期权仓位；段常用 sell call 被动减仓，股数变动≠主动买卖；港交所 7/30 泡泡玛特权益变动(7.65%→5.55%)为期权履约，与 13F 无关。2026 Q2(截至 6/30) 法定截止日 2026-08-14，截至 8/9 尚未在公开平台披露。",
        holdings: [
          { name: "Apple Inc.", ticker: "AAPL", weight: "36.72%", w: 36.72, shares: "28,945,607", reportedPrice: "$253.79", value: "$7,346,106,000", currentPrice: "$308.91", change: "+21.72%", weekLow: "$200.70", weekHigh: "$344.57", activity: "Reduce 10.55%", note: "第一重仓但占比明显下降；相对Q4减仓约10.55%（减持341万股）。", date: "2026-03-31" },
          { name: "Berkshire Hathaway CL B", ticker: "BRK.B", weight: "21.91%", w: 21.91, shares: "9,147,796", reportedPrice: "$479.20", value: "$4,383,624,000", currentPrice: "$511.54", change: "+6.75%", weekLow: "$455.19", weekHigh: "$516.85", activity: "Add 27.47%", note: "继续加仓伯克希尔约197万股。", date: "2026-03-31" },
          { name: "NVIDIA Corp.", ticker: "NVDA", weight: "12.07%", w: 12.07, shares: "13,843,775", reportedPrice: "$174.40", value: "$2,414,354,000", currentPrice: "$200.75", change: "+15.11%", weekLow: "$163.85", weekHigh: "$236.26", activity: "Add 91.29%", note: "英伟达近乎翻倍加仓，从Q4的7.72%升至12.07%。", date: "2026-03-31" },
          { name: "Pinduoduo Inc.", ticker: "PDD", weight: "10.09%", w: 10.09, shares: "19,748,294", reportedPrice: "$102.18", value: "$2,017,881,000", currentPrice: "$88.56", change: "-13.33%", weekLow: "$71.94", weekHigh: "$139.41", activity: "Add 71.18%", note: "拼多多大幅加仓至10%，成为第四大重仓。", date: "2026-03-31" },
          { name: "Tesla Inc.", ticker: "TSLA", weight: "6.34%", w: 6.34, shares: "3,408,900", reportedPrice: "$371.75", value: "$1,267,259,000", currentPrice: "$311.21", change: "-16.29%", weekLow: "$297.38", weekHigh: "$498.83", activity: "Buy", note: "新建仓特斯拉，直接买成第五大重仓。", date: "2026-03-31" },
          { name: "Alphabet Inc. CL C", ticker: "GOOG", weight: "5.31%", w: 5.31, shares: "3,706,000", reportedPrice: "$286.86", value: "$1,063,103,000", currentPrice: "$356.65", change: "+24.33%", weekLow: "$188.16", weekHigh: "$404.23", activity: "Add 99.74%", note: "谷歌仓位几乎翻倍，从3.33%升至5.31%。", date: "2026-03-31" },
          { name: "Occidental Petroleum", ticker: "OXY", weight: "3.33%", w: 3.33, shares: "10,261,500", reportedPrice: "$65.00", value: "$666,998,000", currentPrice: "$57.07", change: "-12.20%", weekLow: "$38.44", weekHigh: "$67.14", activity: "Reduce 22.10%", note: "西方石油减仓约291万股。", date: "2026-03-31" },
          { name: "Microsoft Corp.", ticker: "MSFT", weight: "1.88%", w: 1.88, shares: "1,016,000", reportedPrice: "$370.17", value: "$376,093,000", currentPrice: "$464.72", change: "+25.54%", weekLow: "$349.20", weekHigh: "$550.24", activity: "Add 18.28%", note: "微软继续加仓。", date: "2026-03-31" },
          { name: "United Health Group Inc.", ticker: "UNH", weight: "0.81%", w: 0.81, shares: "601,400", reportedPrice: "$270.59", value: "$162,733,000", currentPrice: "$414.40", change: "+53.15%", weekLow: "$228.48", weekHigh: "$461.62", activity: "Buy", note: "新建仓联合健康。", date: "2026-03-31" },
          { name: "Walt Disney Co.", ticker: "DIS", weight: "0.73%", w: 0.73, shares: "1,511,800", reportedPrice: "$96.38", value: "$145,707,000", currentPrice: "$96.19", change: "-0.20%", weekLow: "$91.48", weekHigh: "$118.07", activity: "Add 112.33%", note: "迪士尼翻倍加仓。", date: "2026-03-31" },
          { name: "Credo Technology Group", ticker: "CRDO", weight: "0.35%", w: 0.35, shares: "751,200", reportedPrice: "$93.87", value: "$70,515,000", currentPrice: "$206.99", change: "+120.51%", weekLow: "$86.49", weekHigh: "$308.67", activity: "Add 431.63%", note: "CRDO大幅加仓逾4倍。", date: "2026-03-31" },
          { name: "Taiwan Semiconductor S.A.", ticker: "TSM", weight: "0.26%", w: 0.26, shares: "151,200", reportedPrice: "$337.95", value: "$51,098,000", currentPrice: "$404.25", change: "+19.62%", weekLow: "$221.29", weekHigh: "$479.00", activity: "Reduce 87.65%", note: "台积电大幅减仓约107万股（从2.13%降至0.26%）。", date: "2026-03-31" },
          { name: "Circle Internet Group Inc", ticker: "CRCL", weight: "0.10%", w: 0.10, shares: "200,000", reportedPrice: "$95.41", value: "$19,082,000", currentPrice: "$62.61", change: "-34.38%", weekLow: "$49.90", weekHigh: "$189.92", activity: "Buy", note: "新建仓Circle。", date: "2026-03-31" },
          { name: "Palantir Technologies Inc.", ticker: "PLTR", weight: "0.04%", w: 0.04, shares: "60,000", reportedPrice: "$146.28", value: "$8,777,000", currentPrice: "$123.06", change: "-15.87%", weekLow: "$106.37", weekHigh: "$207.52", activity: "Buy", note: "新建仓Palantir。", date: "2026-03-31" },
          { name: "CrowdStrike Holdings Inc.", ticker: "CRWD", weight: "0.02%", w: 0.02, shares: "40,000", reportedPrice: "$97.60", value: "$3,904,000", currentPrice: "$190.86", change: "+95.55%", weekLow: "$85.68", weekHigh: "$217.50", activity: "Buy", note: "新建仓CrowdStrike。", date: "2026-03-31" },
          { name: "Synopsys Inc.", ticker: "SNPS", weight: "0.02%", w: 0.02, shares: "10,000", reportedPrice: "$396.50", value: "$3,965,000", currentPrice: "$388.76", change: "-1.95%", weekLow: "$366.00", weekHigh: "$636.61", activity: "Buy", note: "新建仓Synopsys。", date: "2026-03-31" },
          { name: "Snowflake Inc.", ticker: "SNOW", weight: "0.01%", w: 0.01, shares: "10,000", reportedPrice: "$150.80", value: "$1,508,000", currentPrice: "$293.28", change: "+94.48%", weekLow: "$118.30", weekHigh: "$304.17", activity: "Buy", note: "新建仓Snowflake。", date: "2026-03-31" },
          { name: "Innodata Inc.", ticker: "INOD", weight: "0.00%", w: 0.00, shares: "10,000", reportedPrice: "$38.60", value: "$386,000", currentPrice: "$62.83", change: "+62.77%", weekLow: "$34.23", weekHigh: "$125.14", activity: "Buy", note: "新建仓Innodata。", date: "2026-03-31" },
          { name: "Tempus Ai Inc", ticker: "TEM", weight: "0.00%", w: 0.00, shares: "20,000", reportedPrice: "$45.20", value: "$904,000", currentPrice: "$43.87", change: "-2.94%", weekLow: "$40.77", weekHigh: "$104.32", activity: "Reduce 81.82%", note: "Tempus AI大幅减仓约9万股。", date: "2026-03-31" }
        ]
      },
      {
        date: "2026-06-30",
        label: "2026年Q2 · 13F（最新·已核实）",
        source: "dataroma",
        portfolioValue: "$19.1B",
        stockCount: 18,
        note: "投资组合价值约191亿美元（$19,100,583,000，组合日2026-06-30，dataroma披露）；相对Q1：清仓台积电(TSM)、CrowdStrike(CRWD)，重新建仓阿里巴巴(BABA，Q1曾清仓)；大幅减仓英伟达(-54.6%，约764万股，从12.07%降至6.58%)、谷歌(-46.9%)、微软(-25.8%)、联合健康(-33.6%)；苹果再减6.4%但占比被动升至41.05%重回第一，伯克希尔微加至24.18%稳居第二。注意：13F仅披露美股多头，不含A股/港股/期权；港交所7/30泡泡玛特权益变动(7.65%→5.55%)为期权履约，与13F无关。",
        holdings: [
          { name: "Apple Inc.", ticker: "AAPL", weight: "41.05%", w: 41.05, shares: "27,098,707", reportedPrice: "$289.36", value: "$7,841,282,000", currentPrice: "$305.93", change: "+5.73%", weekLow: "$222.96", weekHigh: "$344.27", activity: "Reduce 6.38%", note: "第一重仓，Q2股数再减约6.4%（约185万股），但因英伟达/谷歌大幅减仓，占比被动升至41.05%重回首位。", shareChange: "-1,846,900", date: "2026-06-30" },
          { name: "Berkshire Hathaway CL B", ticker: "BRK.B", weight: "24.18%", w: 24.18, shares: "9,229,696", reportedPrice: "$500.39", value: "$4,618,448,000", currentPrice: "$504.03", change: "+0.73%", weekLow: "$464.01", weekHigh: "$537.74", activity: "Add 0.90%", note: "压舱石，微幅加仓约0.9%（+8万余股），稳居第二。", shareChange: "+81,900", date: "2026-06-30" },
          { name: "Pinduoduo Inc.", ticker: "PDD", weight: "9.99%", w: 9.99, shares: "25,022,094", reportedPrice: "$76.28", value: "$1,908,685,000", currentPrice: "$84.79", change: "+11.16%", weekLow: "$71.94", weekHigh: "$139.41", activity: "Add 26.71%", note: "拼多多加仓约26.7%（+527万股），维持第四大重仓。", shareChange: "+5,273,800", date: "2026-06-30" },
          { name: "Tesla Inc.", ticker: "TSLA", weight: "7.44%", w: 7.44, shares: "3,380,400", reportedPrice: "$420.60", value: "$1,421,796,000", currentPrice: "$342.27", change: "-18.62%", weekLow: "$297.38", weekHigh: "$498.83", activity: "Reduce 0.84%", note: "特斯拉微减0.8%（约2.8万股），占比升至7.44%。", shareChange: "-28,500", date: "2026-06-30" },
          { name: "NVIDIA Corp.", ticker: "NVDA", weight: "6.58%", w: 6.58, shares: "6,280,675", reportedPrice: "$200.09", value: "$1,256,700,000", currentPrice: "$225.16", change: "+12.53%", weekLow: "$163.85", weekHigh: "$236.26", activity: "Reduce 54.63%", note: "英伟达大幅减仓逾54%（约764万股），从12.07%降至6.58%，明显获利了结。", shareChange: "-7,563,100", date: "2026-06-30" },
          { name: "Alphabet Inc. CL C", ticker: "GOOG", weight: "3.64%", w: 3.64, shares: "1,968,600", reportedPrice: "$353.33", value: "$695,565,000", currentPrice: "$343.54", change: "-2.77%", weekLow: "$196.90", weekHigh: "$404.23", activity: "Reduce 46.88%", note: "谷歌减仓近47%（约174万股），占比降至3.64%。", shareChange: "-1,737,400", date: "2026-06-30" },
          { name: "Occidental Petroleum", ticker: "OXY", weight: "2.61%", w: 2.61, shares: "10,261,500", reportedPrice: "$48.57", value: "$498,401,000", currentPrice: "$58.36", change: "+20.16%", weekLow: "$38.44", weekHigh: "$67.14", activity: "Hold", note: "西方石油持股不变，占比随组合变化降至2.61%。", shareChange: "0（持平）", date: "2026-06-30" },
          { name: "Microsoft Corp.", ticker: "MSFT", weight: "1.47%", w: 1.47, shares: "754,100", reportedPrice: "$373.02", value: "$281,294,000", currentPrice: "$495.40", change: "+32.81%", weekLow: "$349.20", weekHigh: "$550.24", activity: "Reduce 25.78%", note: "微软减仓约25.8%（约26万股），占比降至1.47%。", shareChange: "-261,900", date: "2026-06-30" },
          { name: "Credo Technology Group", ticker: "CRDO", weight: "1.00%", w: 1.00, shares: "701,200", reportedPrice: "$271.95", value: "$190,691,000", currentPrice: "$259.90", change: "-4.43%", weekLow: "$86.49", weekHigh: "$308.67", activity: "Reduce 6.66%", note: "CRDO减仓约6.7%（股价期间大涨，占比反升至1.00%）。", shareChange: "-50,000", date: "2026-06-30" },
          { name: "United Health Group Inc.", ticker: "UNH", weight: "0.87%", w: 0.87, shares: "399,600", reportedPrice: "$415.63", value: "$166,086,000", currentPrice: "$401.73", change: "-3.34%", weekLow: "$254.51", weekHigh: "$461.62", activity: "Reduce 33.56%", note: "联合健康减仓约33.6%（约20万股）。", shareChange: "-201,800", date: "2026-06-30" },
          { name: "Walt Disney Co.", ticker: "DIS", weight: "0.86%", w: 0.86, shares: "1,706,600", reportedPrice: "$96.25", value: "$164,260,000", currentPrice: "$106.85", change: "+11.01%", weekLow: "$91.48", weekHigh: "$118.07", activity: "Add 12.89%", note: "迪士尼加仓约12.9%（+19.5万股）。", shareChange: "+194,800", date: "2026-06-30" },
          { name: "Alibaba Group Holdings", ticker: "BABA", weight: "0.15%", w: 0.15, shares: "301,400", reportedPrice: "$95.98", value: "$28,928,000", currentPrice: "$123.81", change: "+29.00%", weekLow: "$91.99", weekHigh: "$190.92", activity: "Buy", note: "重新建仓阿里巴巴（Q1曾清仓，Q2买回约30万股）。", shareChange: "新建 +301,400", date: "2026-06-30" },
          { name: "Circle Internet Group Inc", ticker: "CRCL", weight: "0.07%", w: 0.07, shares: "200,000", reportedPrice: "$62.63", value: "$12,526,000", currentPrice: "$71.60", change: "+14.32%", weekLow: "$49.90", weekHigh: "$159.47", activity: "Hold", note: "Circle持股不变。", shareChange: "0（持平）", date: "2026-06-30" },
          { name: "Palantir Technologies Inc.", ticker: "PLTR", weight: "0.04%", w: 0.04, shares: "60,000", reportedPrice: "$116.67", value: "$7,000,000", currentPrice: "$174.04", change: "+49.17%", weekLow: "$106.37", weekHigh: "$207.52", activity: "Hold", note: "Palantir持股不变。", shareChange: "0（持平）", date: "2026-06-30" },
          { name: "Synopsys Inc.", ticker: "SNPS", weight: "0.02%", w: 0.02, shares: "10,000", reportedPrice: "$446.10", value: "$4,461,000", currentPrice: "$421.50", change: "-5.51%", weekLow: "$366.00", weekHigh: "$626.24", activity: "Hold", note: "Synopsys持股不变。", shareChange: "0（持平）", date: "2026-06-30" },
          { name: "Snowflake Inc.", ticker: "SNOW", weight: "0.01%", w: 0.01, shares: "10,000", reportedPrice: "$254.50", value: "$2,545,000", currentPrice: "$328.92", change: "+29.24%", weekLow: "$118.30", weekHigh: "$341.95", activity: "Hold", note: "Snowflake持股不变。", shareChange: "0（持平）", date: "2026-06-30" },
          { name: "Tempus Ai Inc", ticker: "TEM", weight: "0.01%", w: 0.01, shares: "20,000", reportedPrice: "$57.95", value: "$1,159,000", currentPrice: "$52.10", change: "-10.09%", weekLow: "$40.77", weekHigh: "$104.32", activity: "Hold", note: "Tempus AI持股不变。", shareChange: "0（持平）", date: "2026-06-30" },
          { name: "Innodata Inc.", ticker: "INOD", weight: "0.00%", w: 0.00, shares: "10,000", reportedPrice: "$75.60", value: "$756,000", currentPrice: "$63.85", change: "-15.54%", weekLow: "$34.23", weekHigh: "$125.14", activity: "Hold", note: "Innodata持股不变。", shareChange: "0（持平）", date: "2026-06-30" }
        ]
      }
    ],
    viewpoints: [
      {
        date: "2026-03-31",
        content: "2026年Q1 13F披露：组合价值首次突破200亿美元（$20,003,997,000），持股19只。最大动作：清仓阿里巴巴（BABA），新建仓特斯拉（TSLA）、联合健康（UNH）、Circle（CRCL）、Palantir（PLTR）、CrowdStrike（CRWD）、Snowflake（SNOW）、Innodata（INOD）、Synopsys（SNPS）；同时大幅加仓英伟达（+91%）、拼多多（+71%）、谷歌（+99%）、伯克希尔（+27%）、迪士尼（+112%）、CRDO（+431%）。苹果占比从50.30%降至36.72%，台积电从2.13%降至0.26%。",
        source: "dataroma",
        tags: ["13F", "调仓", "美股"]
      },
      {
        date: "2026-06-30",
        content: "2026年Q2 13F披露（组合日2026-06-30，dataroma于2026-08-17更新）：组合价值约191亿美元（$19,100,583,000），持股18只。最大动作：清仓台积电(TSM)、CrowdStrike(CRWD)，重新建仓阿里巴巴(BABA)；大幅减仓英伟达(-54.6%，从12.07%降至6.58%)、谷歌(-46.9%)、微软(-25.8%)、联合健康(-33.6%)；苹果再减6.4%但占比被动升至41.05%重回第一，伯克希尔微加至24.18%稳居第二，拼多多加仓26.7%维持第四。组合从Q1的$200亿降至$191亿（-4.5%）。",
        source: "dataroma",
        tags: ["13F", "调仓", "美股"]
      },
      {
        date: "2026-08-09",
        content: "【数据状态核实·2026-08-09】H&H International Investment（CIK 0001759760，Palo Alto 家族办公室）最新已确认完整季度持仓为 2026 Q1（截至 2026-03-31），提交日 2026-05-19，Accession 0001759760-26-000005，组合市值 $200.04 亿美元（约1380亿人民币），持股 19 只。2026 Q2（截至 06-30）法定披露截止日 2026-08-14，截至 2026-08-09 尚未在 13radar/frenzycap/gurufocus/arkolith/hedgetrace 等公开平台挂出，预计 8/14 前后披露。网上少量“截至二季度末 H&H 持仓”文章经核查为旧数据错配（如 2024 Q2 的 9 只/166 亿美元），并非 2026 Q2；此前将其他机构同期 13F 误读为 H&H Q2 备案的说法已纠正。",
        source: "SEC EDGAR + 13F聚合平台交叉验证",
        tags: ["13F", "数据状态", "核实"]
      },
      {
        date: "2025-12-31",
        content: "2025年Q4 13F：组合价值约175亿美元。大幅加仓英伟达、台积电、微软、伯克希尔、拼多多；新建仓Coreweave（CRWV）、Credo（CRDO）、Tempus AI（TEM）；减仓苹果、阿里巴巴、ASML。",
        source: "dataroma",
        tags: ["13F", "调仓"]
      },
      {
        date: "2025-03-31",
        content: "2025年Q1 13F：大幅减仓苹果（-664万股，占组合比例从约75%降至63.33%）、阿里巴巴、谷歌；建仓台积电、英伟达、微软。",
        source: "dataroma",
        tags: ["13F", "调仓"]
      },
      {
        date: "",
        content: "投资理念：坚持“不懂不做”，重仓看得懂的好公司；认为“买股票就是买公司”，长期持有优秀企业的股权；以“本分”为内核，不追逐热点，不预测市场。",
        source: "公开访谈",
        tags: ["理念"]
      },
      {
        date: "2026-08-09",
        content: "【规模与年化·据估算】总资管规模据估算已超500亿美元（其中美股约200亿美元，对应13F披露的组合价值 $200.04 亿）；近5年（约2021–2025）年化收益率据估算约13%–17%。注意：总规模含 A股茅台、港股腾讯/泡泡玛特等非 13F 口径资产，与美股 13F 持仓不可直接相加比较。以上为AI汇总估算，非本人精确披露，仅供参考。",
        source: "其他",
        tags: ["规模", "年化", "估算"]
      },
      {
        date: "2026-08-09",
        content: "【经典案例·据估算】历史经典投资案例（倍数与年化均为估算，非精确披露）：网易约100倍、苹果约16倍、贵州茅台几十倍；经典案例组合年化收益率据估算约28%。",
        source: "其他",
        tags: ["经典案例", "收益", "估算"]
      }
    ],
    caseStudies: [
      {
        id: "popmart",
        title: "泡泡玛特 · 从“不懂不投”到重仓",
        company: "泡泡玛特（09992.HK）",
        summary: "段永平对泡泡玛特的态度经历了完整的三阶段转变：2025年“看不懂10年后”坚持不投；2026年3月用梦幻西游理解情绪价值、收回不投资说法；2026年4月起实地调研、开“保险公司”、清仓神华全部切换至泡泡玛特，成为第二大股东。",
        items: [
          {
            date: "2025-08-23",
            stage: "第一阶段：看不懂，但不否认",
            title: "最早公开评价：欣赏但看不懂",
            content: "段永平对“懂”的定义是“知道10年后是什么样子”。他最早公开评价泡泡玛特：“产品确实很有意思，founder也是个很有意思的人，能做到今天这样很了不起，但我看不懂10年后公司会怎样。”他承认泡泡玛特的成功不是运气、王宁“真的是花了功夫的”，但仍因看不懂10年后而不投。这体现了他的纪律——不懂不投，再欣赏也不投。",
            source: "与王石/田朴珺对话及后续公开评价（公众号·沃德糕整理）",
            tags: ["不懂不投", "纪律"]
          },
          {
            date: "2025-12-14",
            stage: "第一阶段：看不懂，但不否认",
            title: "再次强调“看不懂”",
            content: "回复@温州泡泡玛特未来星：“我没看过！我只是觉得王宁绝不是靠运气走到今天的，但不意味着我能看懂人们为什么喜欢泡泡玛特。我也许已经过了能够理解这个产品的年纪了吧。人生很忙，看不懂的东西我是可以skip的。”再次强调看不懂的东西可以跳过。",
            source: "公众号·沃德糕整理",
            tags: ["看不懂", "能力圈"]
          },
          {
            date: "2026-01-12",
            stage: "第一阶段：看不懂，但不否认",
            title: "承认厉害，但仍无法理解",
            content: "“我大致看过泡泡玛特，觉得他们确实蛮厉害的。不过，我依然无法理解人们为什么会需要这个东西，万一过两年大家都不要了呢？如果你能认为人们会一直需要，他们的业务会一直成长，那对你来说这当然是个还不错的投资。”同时提到盲盒模式不是什么产品都能用，“谁能来个盲盒iPhone？来瓶盲盒茅台？别的IP用盲盒也未必就能行得通？”并坦言自己不理解情绪消费逻辑，但诚实把自己放在能力圈外。",
            source: "公众号·沃德糕整理",
            tags: ["能力圈", "情绪消费"]
          },
          {
            date: "2026-03-31",
            stage: "第二阶段：认知转折，从看懂到下注",
            title: "2026年3月：认知的转折点",
            content: "3月25日泡泡玛特发布2025年财报：营收371.2亿元（同比+184.7%），经调整净利润130.8亿元（同比+284.5%），海外收入162.7亿元（同比+291.9%）。但财报后股价连续大跌两天跌超30%，较2025年8月高点腰斩，市场担忧王宁将2026年增速指引降到“不低于20%”。\n3月29日，段永平用梦幻西游类比理解情绪价值：“梦幻里面那些不加任何属性的衣服可以卖得那么贵还那么抢手，情绪价值这个东西真的有点意思。”\n3月30日，他收回不投资泡泡玛特的说法：“经济学的‘速度’实际上是物理里面的‘加速度’。投资买的是未来的总量，是物理里面的‘速度×时间’得到的‘总长度’……这两天花时间再看了看泡泡玛特，决定收回对方丈说的我不投资泡泡玛特的说法。”\n3月31日，他对管理层提出建议：永远不要给预测，因为没有任何意义但早晚会有代价；并举巴菲特的BRK、网易、拼多多都不给业绩指引。",
            source: "公众号·沃德糕整理",
            tags: ["情绪价值", "速度×时间", "业绩指引"]
          },
          {
            date: "2026-04-09",
            stage: "第二阶段：认知转折，从看懂到下注",
            title: "2026年4月：实地调研 + “保险公司开张”",
            content: "4月2日：艺术与情绪价值——“艺术难道不是提供情绪价值么？我怎么觉得所有艺术都是在提供情绪价值呢？”并用自己玩了7-8年梦幻西游的经历类比：人们喜欢就是喜欢，不需要不喜欢的人理解。\n4月4日：实地探店 Westfield 门店。读完了《因为独特》（王宁深度访谈录），上午和下午分别看了 Westfield 的泡泡玛特门店。门店只有大概60平米，生意确实很好，绝大部分是大人，老中比例很小，大概10%。他认为泡泡玛特才是中国产品国际化的先驱，下了“right business, right people, right price”的判断。\n4月6日：评价王宁“对商业的理解是顶级的”，是“勤于且善于思考并注重细节的企业家”，“比我强”。\n4月7日：澄清“打算买够不等于已经买了，但也不意味着没开始买”，并声明后面不再回复泡泡玛特的事。\n4月9日：“我的泡泡玛特保险公司正式开张”。他总结了泡泡玛特的壁垒：用户关注度（品牌）、艺术家签约壁垒、全球门店、强大的王宁和team。认为只要潮玩有持续性，泡泡玛特就是非常好的生意，但持续性争议会持续很久，所以“大家可能还需要一直看五年十年”。",
            source: "公众号·沃德糕整理",
            tags: ["实地调研", "保险公司", "壁垒", "right business"]
          },
          {
            date: "2026-04-12",
            stage: "第二阶段：认知转折，从看懂到下注",
            title: "2026年4月中：世界的泡泡玛特",
            content: "网友问“今天的泡泡玛特像不像曾经某一刻的Netflix？”段永平回复：“不像，因为这是世界的泡泡玛特。”\n护城河细节：网友分享泡泡玛特的产品是最精致、最有“神韵”的，段永平回复“我要慢慢体会这点”。\n关于持续性：作为做游戏出身的人，他的直觉是这个需求可以持续，但很难说清楚。\n关于加仓计划：慢慢调集资金，不然就先收点保费。\n情感共鸣：被问到看到王宁和泡泡玛特是否想起当年自己奋斗的岁月，他回复“是的，而且很感动也很理解”。\n国际化：网友表示“如果国际化指的是拼命到别的国家去做生意的话，对中国绝大多数公司而言还是蛮危险的”，段永平回复“我觉得泡泡玛特已经过了这一关了”。\n关于短期影响：网友担心他的公开关注会短期推高股价影响他买够，他反问“你觉得我在乎吗？”。",
            source: "公众号·沃德糕整理",
            tags: ["全球化", "护城河", "长期主义"]
          },
          {
            date: "2026-05-28",
            stage: "第三阶段：重仓 + 成为第二大股东",
            title: "2026年5月：清仓神华，全部切换到泡泡玛特",
            content: "5月7日：清仓中国神华，全部切到泡泡玛特。“我理解王宁不是因为我的投资，而是因为我曾经是个企业家，我能看懂他有多厉害。他还那么年轻，他还能至少好好干25年以上吧。这个复利是吓人的。”\n5月：自称成为王宁的粉丝，社交头像换成泡泡玛特IP形象，并评价“王宁对产品的理解与乔布斯处于同一级别”。\n5月25日：与H&H International Investment同步增持，各增持982.32万股，一致行动人持股比例达5.69%，成为第二大股东。\n5月28日：再度增持，持股比例从5.69%升至6.04%，增持价格每股162.5港元。\n同月：公开建议泡泡玛特取消业绩指引，认为业绩指引无法增厚企业利润，一旦不及预期反而容易引发股价暴跌、带来法务风险。后续泡泡玛特股东大会采纳该建议，不再发布业绩指引。",
            source: "公众号·沃德糕整理",
            tags: ["重仓", "第二大股东", "取消业绩指引"]
          },
          {
            date: "2026-08-05",
            stage: "第四阶段：长期持有 + 期权策略",
            title: "2026年7-8月：长期看好，减持系期权履约",
            content: "7月6日：港交所披露H&H对泡泡玛特的多头持仓比例从6.85%增至7.65%，增持价格为每股150港元。\n7月16日：泡泡玛特放量大涨超6%。\n7月23日：网友问是否会减点泡泡玛特仓位去买SpaceX，段永平回复：“泡泡玛特我才刚开始买啊！我猜10年内大概率是不会卖的……”\n7月24日：关于空头——“空头是朋友啊！如果你想买，你当然希望能买的便宜一点？怕空头的人最好别碰股市。”\n7月27日：关于甜品店——甜品车是乐园的衍生品，不会是个大生意，但对建立泡泡玛特的生态圈有帮助。\n7月28日：生意模式——“泡泡玛特的生意模式（没有茅台那么稳定，但）未来增长空间（可能）大（一些，是个非常有意思的企业。）”括号里的意思是去掉。\n7月29日：关于“celebrate life”（庆祝生活）——王宁在《因为独特》中多次谈到 celebrate life，段永平认为“这个提法很有意思的”。\n8月5日：针对7月30日持仓由7.65%降至5.55%引发的“减持”热议，他在雪球公开澄清：持仓下滑是期权到期被动交割，并非主动看空。原文“就是put expired（看跌期权到期），部分被call（看涨期权）走了。”“其实主要是put到期影响比较大……从一开始我就说过了，泡泡玛特保险公司开张了。很多人看不懂这句话！”",
            source: "公众号·沃德糕整理",
            tags: ["长期持有", "期权策略", "澄清"]
          }
        ]
      }
    ],
    philosophy: {
      summary: "价值投资实践者（大道/段永平）：以“不懂不做”“买股票就是买公司”为核心，长期重仓苹果、伯克希尔等看得懂的优质企业。2025-2026年对泡泡玛特完成了从“看不懂10年后不投”到重仓持有的转变。其 H&H International Investment 美股13F持仓高度集中（苹果一度占70%+），近年逐步分散至科技、能源、中概等领域，但始终围绕“好生意、好管理、好价格”三原则。",
      points: [
        "不懂不做：只投自己能看懂商业模式的公司",
        "买股票就是买公司：关注企业长期价值，而非股价波动",
        "好生意、好管理、好价格：选股的三条标准",
        "长期持有：优秀企业值得陪伴十年以上",
        "本分：不追逐热点，不赌市场，按自己的节奏投资"
      ],
      quotes: [
        "不懂不做",
        "买股票就是买公司",
        "本分",
        "做对的事情，把事情做对"
      ]
    }
  }
,
    {
      id: "berkshire",
      name: "伯克希尔·哈撒韦",
      platforms: ["dataroma"],
      tagline: "巴菲特执掌的多元化投资旗舰：保险浮存金 + 权益集中持有",
      style: "价值投资 / 长期持有 / 集中重仓",
      riskAppetite: "低（超大盘蓝筹，极少杠杆）",
      lastUpdate: "2026-08-17",
      hasDav: false,
      portfolios: [
        {
          date: "2026-06-30",
          label: "2026年Q2 · 13F",
          source: "dataroma",
          portfolioValue: "$299B（13F权益多头估算）",
          stockCount: 29,
          note: "伯克希尔2026 Q2 13F（截至6/30）：权益多头29只，以消费/金融/能源为主；苹果仍为第一重仓。13F仅披露美股多头，全资子公司与现金未计入。",
          holdings: [
          { name: "Apple Inc.", ticker: "AAPL", weight: "22.04%", w: 22.04, shares: "227,917,808", reportedPrice: "$289.36", value: "$65,950,296,000", currentPrice: "$305.93", change: "5.73%", weekLow: "$222.96", weekHigh: "$344.27", note: "Apple Inc.", date: "2026-06-30" },
          { name: "American Express", ticker: "AXP", weight: "17.14%", w: 17.14, shares: "151,610,700", reportedPrice: "$338.25", value: "$51,282,319,000", currentPrice: "$342.48", change: "1.25%", weekLow: "$289.26", weekHigh: "$384.36", note: "American Express", date: "2026-06-30" },
          { name: "Coca Cola Co.", ticker: "KO", weight: "10.86%", w: 10.86, shares: "400,000,000", reportedPrice: "$81.27", value: "$32,507,999,000", currentPrice: "$87.71", change: "7.92%", weekLow: "$64.04", weekHigh: "$90.92", note: "Coca Cola Co.", date: "2026-06-30" },
          { name: "Alphabet Inc.", ticker: "GOOGL", weight: "9.41%", w: 9.41, shares: "78,791,167", reportedPrice: "$357.37", value: "$28,157,600,000", currentPrice: "$345.90", change: "-3.21%", weekLow: "$196.04", weekHigh: "$408.37", note: "Alphabet Inc.", date: "2026-06-30" },
          { name: "Bank of America Corp.", ticker: "BAC", weight: "9.20%", w: 9.2, shares: "483,394,015", reportedPrice: "$56.98", value: "$27,543,792,000", currentPrice: "$64.49", change: "13.18%", weekLow: "$45.79", weekHigh: "$65.20", note: "Bank of America Corp.", date: "2026-06-30" },
          { name: "Chevron Corp.", ticker: "CVX", weight: "4.67%", w: 4.67, shares: "84,375,856", reportedPrice: "$165.76", value: "$13,986,142,000", currentPrice: "$200.00", change: "20.66%", weekLow: "$143.75", weekHigh: "$212.76", note: "Chevron Corp.", date: "2026-06-30" },
          { name: "Occidental Petroleum", ticker: "OXY", weight: "4.30%", w: 4.3, shares: "264,941,431", reportedPrice: "$48.57", value: "$12,868,205,000", currentPrice: "$58.36", change: "20.16%", weekLow: "$38.44", weekHigh: "$67.14", note: "Occidental Petroleum", date: "2026-06-30" },
          { name: "Chubb Limited", ticker: "CB", weight: "3.90%", w: 3.9, shares: "34,249,183", reportedPrice: "$340.74", value: "$11,670,067,000", currentPrice: "$343.64", change: "0.85%", weekLow: "$262.86", weekHigh: "$365.91", note: "Chubb Limited", date: "2026-06-30" },
          { name: "Moody's Corp.", ticker: "MCO", weight: "3.73%", w: 3.73, shares: "24,669,778", reportedPrice: "$452.92", value: "$11,173,436,000", currentPrice: "$484.96", change: "7.07%", weekLow: "$399.61", weekHigh: "$543.25", note: "Moody's Corp.", date: "2026-06-30" },
          { name: "Alphabet Inc. CL C", ticker: "GOOG", weight: "3.21%", w: 3.21, shares: "27,188,433", reportedPrice: "$353.33", value: "$9,606,489,000", currentPrice: "$343.54", change: "-2.77%", weekLow: "$196.90", weekHigh: "$404.23", note: "Alphabet Inc. CL C", date: "2026-06-30" },
          { name: "Kraft Heinz Co.", ticker: "KHC", weight: "2.57%", w: 2.57, shares: "325,634,818", reportedPrice: "$23.62", value: "$7,691,494,000", currentPrice: "$25.51", change: "8.00%", weekLow: "$20.66", weekHigh: "$28.09", note: "Kraft Heinz Co.", date: "2026-06-30" },
          { name: "DaVita HealthCare Partners", ticker: "DVA", weight: "2.15%", w: 2.15, shares: "28,880,209", reportedPrice: "$222.48", value: "$6,425,269,000", currentPrice: "$180.06", change: "-19.07%", weekLow: "$101.00", weekHigh: "$247.49", note: "DaVita HealthCare Partners", date: "2026-06-30" },
          { name: "Delta Air Lines Inc.", ticker: "DAL", weight: "1.79%", w: 1.79, shares: "57,320,000", reportedPrice: "$93.66", value: "$5,368,591,000", currentPrice: "$89.35", change: "-4.60%", weekLow: "$54.60", weekHigh: "$95.44", note: "Delta Air Lines Inc.", date: "2026-06-30" },
          { name: "SiriusXM Holdings Inc", ticker: "SIRI", weight: "1.23%", w: 1.23, shares: "124,807,117", reportedPrice: "$29.54", value: "$3,686,803,000", currentPrice: "$28.46", change: "-3.66%", weekLow: "$19.15", weekHigh: "$32.37", note: "SiriusXM Holdings Inc", date: "2026-06-30" },
          { name: "Verisign Inc.", ticker: "VRSN", weight: "0.76%", w: 0.76, shares: "8,989,880", reportedPrice: "$251.56", value: "$2,261,495,000", currentPrice: "$284.24", change: "12.99%", weekLow: "$207.53", weekHigh: "$312.48", note: "Verisign Inc.", date: "2026-06-30" },
          { name: "Kroger Co.", ticker: "KR", weight: "0.72%", w: 0.72, shares: "39,000,000", reportedPrice: "$55.53", value: "$2,165,671,000", currentPrice: "$56.69", change: "2.09%", weekLow: "$53.78", weekHigh: "$75.66", note: "Kroger Co.", date: "2026-06-30" },
          { name: "Ally Financial Inc.", ticker: "ALLY", weight: "0.41%", w: 0.41, shares: "27,000,000", reportedPrice: "$45.95", value: "$1,240,650,000", currentPrice: "$44.91", change: "-2.26%", weekLow: "$35.43", weekHigh: "$46.96", note: "Ally Financial Inc.", date: "2026-06-30" },
          { name: "Lennar Corp.", ticker: "LEN", weight: "0.40%", w: 0.4, shares: "13,111,741", reportedPrice: "$90.49", value: "$1,186,482,000", currentPrice: "$86.83", change: "-4.04%", weekLow: "$79.83", weekHigh: "$141.39", note: "Lennar Corp.", date: "2026-06-30" },
          { name: "Liberty Media Corp. Series C Live", ticker: "LLYVK", weight: "0.37%", w: 0.37, shares: "10,587,143", reportedPrice: "$105.64", value: "$1,118,425,000", currentPrice: "$108.86", change: "3.05%", weekLow: "$78.68", weekHigh: "$109.75", note: "Liberty Media Corp. Series C Live", date: "2026-06-30" },
          { name: "New York Times CL A", ticker: "NYT", weight: "0.37%", w: 0.37, shares: "15,700,000", reportedPrice: "$69.98", value: "$1,098,686,000", currentPrice: "$64.79", change: "-7.42%", weekLow: "$53.65", weekHigh: "$86.83", note: "New York Times CL A", date: "2026-06-30" },
          { name: "Capital One Financial", ticker: "COF", weight: "0.20%", w: 0.2, shares: "3,000,000", reportedPrice: "$200.62", value: "$601,860,000", currentPrice: "$227.34", change: "13.32%", weekLow: "$174.23", weekHigh: "$257.54", note: "Capital One Financial", date: "2026-06-30" },
          { name: "Liberty Media Corp. Series A Live", ticker: "LLYVA", weight: "0.17%", w: 0.17, shares: "4,986,588", reportedPrice: "$101.26", value: "$504,942,000", currentPrice: "$104.99", change: "3.68%", weekLow: "$77.12", weekHigh: "$106.06", note: "Liberty Media Corp. Series A Live", date: "2026-06-30" },
          { name: "Louisiana-Pacific Corp.", ticker: "LPX", weight: "0.15%", w: 0.15, shares: "5,664,793", reportedPrice: "$78.66", value: "$445,593,000", currentPrice: "$73.89", change: "-6.06%", weekLow: "$65.85", weekHigh: "$99.71", note: "Louisiana-Pacific Corp.", date: "2026-06-30" },
          { name: "Nucor Corp.", ticker: "NUE", weight: "0.14%", w: 0.14, shares: "1,857,752", reportedPrice: "$222.75", value: "$413,814,000", currentPrice: "$268.91", change: "20.72%", weekLow: "$130.11", weekHigh: "$280.11", note: "Nucor Corp.", date: "2026-06-30" },
          { name: "Macy's Inc.", ticker: "M", weight: "0.06%", w: 0.06, shares: "7,347,426", reportedPrice: "$23.55", value: "$173,031,000", currentPrice: "$23.41", change: "-0.59%", weekLow: "$12.19", weekHigh: "$26.59", note: "Macy's Inc.", date: "2026-06-30" },
          { name: "NVR Inc.", ticker: "NVR", weight: "0.03%", w: 0.03, shares: "11,112", reportedPrice: "$6813.44", value: "$75,711,000", currentPrice: "$6307.93", change: "-7.42%", weekLow: "$5501.01", weekHigh: "$8618.28", note: "NVR Inc.", date: "2026-06-30" },
          { name: "Jefferies Financial Group Inc.", ticker: "JEF", weight: "0.01%", w: 0.01, shares: "433,558", reportedPrice: "$49.98", value: "$21,669,000", currentPrice: "$55.14", change: "10.32%", weekLow: "$35.26", weekHigh: "$69.47", note: "Jefferies Financial Group Inc.", date: "2026-06-30" },
          { name: "Lennar Corp. CL B", ticker: "LEN.B", weight: "0.01%", w: 0.01, shares: "298,117", reportedPrice: "$88.71", value: "$26,446,000", currentPrice: "$85.36", change: "-3.78%", weekLow: "$78.02", weekHigh: "$134.56", note: "Lennar Corp. CL B", date: "2026-06-30" },
          { name: "D.R. Horton", ticker: "DHI", weight: "0.00%", w: 0.0, shares: "3,564", reportedPrice: "$163.02", value: "$581,000", currentPrice: "$148.81", change: "-8.72%", weekLow: "$130.96", weekHigh: "$182.36", note: "D.R. Horton", date: "2026-06-30" }
          ]
        }
      ],
      philosophy: {
        summary: "巴菲特执掌的伯克希尔·哈撒韦：以保险浮存金为低成本杠杆，长期集中持有优质企业股权，强调护城河、管理层能力与长期复利。13F 仅披露其美股多头，全资子公司与现金未计入。",
        points: [
          "护城河：偏好具有持久竞争优势的生意",
          "长期持有：与优秀企业共成长，极少交易",
          "安全边际：价格远低于内在价值时才出手",
          "能力圈：只投自己看得懂的生意",
          "保险浮存金：以低成本负债放大长期收益"
        ],
        quotes: [
          "规则一：永远别亏钱；规则二：永远别忘记规则一",
          "以合理的价格买入优秀的公司，胜过以便宜的价格买入平庸的公司",
          "时间是优秀企业的朋友，平庸企业的敌人"
        ]
      },
      viewpoints: [
        {
          date: "2026-08-17",
          content: "2026 Q2 13F（截至6/30）披露：权益组合29只，苹果仍为第一重仓（22.04%），美国运通17.14%、可口可乐10.86%次之；组合以消费、金融、能源为主。",
          source: "dataroma",
          tags: ["13F", "美股"]
        }
      ]
    }    ,
    {
      id: "himalaya",
      name: "李录（喜马拉雅资本）",
      platforms: ["insiderset / SEC 13F"],
      tagline: "芒格弟子、喜马拉雅资本创始人：极致集中、低换手的价值投资",
      style: "价值投资 / 极度集中 / 极少交易",
      riskAppetite: "中（高度集中少数标的）",
      lastUpdate: "2026-08-17",
      hasDav: false,
      portfolios: [
        {
          date: "2026-06-30",
          label: "2026年Q2 · 13F",
          source: "insiderset (SEC 13F)",
          portfolioValue: "$3.70B",
          stockCount: 8,
          note: "李录喜马拉雅资本2026 Q2 13F（截至6/30，8/14披露）：组合$3.70B、8只，极度集中；谷歌双类(A+B)合计约48%、拼多多22.17%、伯克希尔B 14.98%为前三大。本季大幅减仓/清仓美银、H&R Block、西方石油等，进一步集中。",
          holdings: [
          { name: "ALPHABET INC", ticker: "GOOGL", weight: "24.55%", w: 24.55, note: "谷歌 A 类（李录第一重仓）（占比24.55%）。", date: "2026-06-30" },
          { name: "ALPHABET INC", ticker: "GOOG", weight: "23.39%", w: 23.39, note: "谷歌 C 类（占比23.39%）。", date: "2026-06-30" },
          { name: "PDD HOLDINGS INC", ticker: "PDD", weight: "22.17%", w: 22.17, note: "中概电商（第二大重仓）（占比22.17%）。", date: "2026-06-30" },
          { name: "BERKSHIRE HATHAWAY INC DEL", ticker: "BRK.B", weight: "14.98%", w: 14.98, note: "伯克希尔 B 类（压舱石）（占比14.98%）。", date: "2026-06-30" },
          { name: "EAST WEST BANCORP INC", ticker: "EWBC", weight: "9.68%", w: 9.68, note: "华美银行（占比9.68%）。", date: "2026-06-30" },
          { name: "CROCS INC", ticker: "CROX", weight: "2.89%", w: 2.89, note: "卡骆驰（占比2.89%）。", date: "2026-06-30" },
          { name: "TENCENT MUSIC ENTERTAINMENT", ticker: "TME", weight: "1.49%", w: 1.49, note: "腾讯音乐（占比1.49%）。", date: "2026-06-30" },
          { name: "APPLE INC", ticker: "AAPL", weight: "0.86%", w: 0.86, note: "苹果（占比0.86%）。", date: "2026-06-30" }
          ]
        }
      ],
      philosophy: {
        summary: "李录，喜马拉雅资本创始人，查理·芒格亲自提携的华人价值投资者。组合极度集中、换手率极低，重仓少数高确定性标的（谷歌、拼多多、伯克希尔等）。著有《文明、现代化、价值投资与中国》。",
        points: [
          "现代化三阶段：农业文明→科技文明→现代化文明",
          "价值投资：买股票就是买公司的一部分",
          "极度集中：少而精，宁可空仓也不将就",
          "长期主义：以十年为单位持有",
          "能力圈：坚守自己能深度理解的机会"
        ],
        quotes: [
          "价值投资的核心，是以实业的眼光买股票",
          "宏观我们是无知的，但微观我们可以努力",
          "投资本质上是赌国运，赌一个国家的文明进程"
        ]
      },
      viewpoints: [
        {
          date: "2026-08-17",
          content: "2026 Q2 13F（截至6/30，8/14披露）组合$3.70B、8只：谷歌双类合计约48%、拼多多22.17%、伯克希尔B 14.98%为前三大；本季大幅减仓/清仓美银、H&R Block、西方石油等，进一步集中。",
          source: "insiderset / SEC 13F",
          tags: ["13F", "集中"]
        }
      ]
    }];
