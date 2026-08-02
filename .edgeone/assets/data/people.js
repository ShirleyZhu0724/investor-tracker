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
  updatedAt: "2026-08-01",
  note: "数据来自公开网络检索（2026-08-01），仅作个人跟踪用途，非投资建议。"
};

window.PEOPLE = [
  {
    id: "jinjiancheng",
    name: "金渐成",
    platforms: ["公众号"],
    tagline: "全球资产配置者（玑哥）：美股宽基+科技龙头为锚，铜作周期增强",
    style: "全球配置 / 美股宽基+科技+商品",
    riskAppetite: "中（多账户分层：防守/稳健/进取）",
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
          { name: "伦铜+沪铜", ticker: "CU", weight: "伦铜2/3、沪铜1/3", w: null, note: "大宗商品主仓；明确不碰黄金白银。来源：jinjiancheng.com/notes/commodities-copper-framework", source: "公众号", date: "2026-05-24" },
          { name: "美债/消费蓝筹/分红资产", ticker: "—", weight: "防守型", w: null, skip: true, note: "防守型账户（粗口径，7月已拆细，不参与跨期对比）。", source: "公众号", date: "2026-05-15" }
        ]
      },
      {
        date: "2026-07-29",
        label: "2026-07-29 · 最新账户分层持仓（IMA笔记）",
        source: "公众号",
        note: "进取约39% / 稳健约24.5% / 防守约36.5%",
        holdings: [
          { name: "英伟达（进取账户）", ticker: "NVDA", weight: "进取账户第1重仓", w: null, account: "进取", skip: true, note: "进取型账户个股占比第一（7月拆细口径，不与5月粗口径对比）。来源：IMA笔记《金渐成的持仓》。", source: "公众号", date: "2026-07-29" },
          { name: "谷歌/微软/苹果/台积电/亚马逊（进取账户）", ticker: "GOOGL/MSFT/AAPL/TSM/AMZN", weight: "进取账户内", w: null, account: "进取", skip: true, note: "按占比排序紧随英伟达之后，均为科技龙头（7月拆细口径）。", source: "公众号", date: "2026-07-29" },
          { name: "Meta/博通/AMD/特斯拉/甲骨文（进取账户）", ticker: "META/AVGO/AMD/TSLA/ORCL", weight: "均<1.2%", w: null, account: "进取", skip: true, note: "进取账户尾部小仓（甲骨文0.26%，7月拆细口径）。", source: "公众号", date: "2026-07-29" },
          { name: "纳指100+标普500 ETF", ticker: "QQQ/VOO", weight: "稳健账户>60%", w: 62, account: "稳健", note: "稳健型账户核心宽基（>60%，约62%估算）。", source: "公众号", date: "2026-07-29" },
          { name: "医药保健（联合健康/强生/礼来）（稳健账户）", ticker: "UNH/JNJ/LLY", weight: "稳健账户约27%", w: 27, account: "稳健", skip: true, note: "稳健账户医药保健板块（7月拆细口径）。", source: "公众号", date: "2026-07-29" },
          { name: "消费（沃尔玛/Costco/麦当劳）（稳健账户）", ticker: "WMT/COST/MCD", weight: "稳健账户约13%", w: 13, account: "稳健", skip: true, note: "稳健账户消费板块（7月拆细口径）。", source: "公众号", date: "2026-07-29" },
          { name: "美债及相关ETF（防守账户）", ticker: "—", weight: "防守账户约58%", w: 58, account: "防守", skip: true, note: "防守型账户稳定生息底仓（7月拆细口径）。", source: "公众号", date: "2026-07-29" },
          { name: "伯克希尔（BRK）", ticker: "BRK", weight: "防守账户含BRK（无单独占比）", w: null, account: "防守", note: "防守账户约42%含BRK，无单独占比；方向不可比。", source: "公众号", date: "2026-07-29" },
          { name: "可口可乐/强生/SCHD/VISA（防守账户）", ticker: "KO/JNJ/SCHD/V", weight: "防守账户含", w: null, account: "防守", skip: true, note: "防守账户分红/优质资产（7月拆细口径）。", source: "公众号", date: "2026-07-29" },
          { name: "伦铜+沪铜", ticker: "CU", weight: "7月未提及", w: null, account: "商品", note: "7-29月报未提及铜仓位（此前为大宗商品主仓）；方向不可比。", source: "公众号", date: "2026-07-29" }
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
      summary: "全球资产配置者：以美股宽基（纳指100/标普500）与科技龙头为锚，铜作为周期增强；强调安全边际与低成本/负成本思维。认为投资是认知的变现，最终服务于生活与家人陪伴。",
      points: [
        "只买全球最顶级的十几家公司，不碰垃圾股、题材股",
        "金字塔加仓、倒金字塔卖出，严格交易纪律",
        "不把全部资金放进一个市场/品种；盈利后提取利润构筑防守垫",
        "商品（铜）是组合的增强项，不是底层资产",
        "账户分三层管理：进取（科技龙头）/稳健（宽基+医药消费）/防守（美债+分红），按风险分层"
      ],
      quotes: [
        "投资三要素：资金、耐心、勇气",
        "所有的盈利都是认知的变现，所有的亏损都是认知的缺陷",
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
    lastUpdate: "2026-08-02",
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
      }
    ],
    viewpoints: [
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
    lastUpdate: "2026-03-31",
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
        label: "2026年Q1 · 13F（最新）",
        source: "dataroma",
        portfolioValue: "$20.0B",
        stockCount: 19,
        note: "投资组合价值约200亿美元；清仓阿里巴巴，新建仓特斯拉、联合健康、Circle、Palantir、CrowdStrike、Snowflake、Innodata；大幅加仓英伟达、拼多多、谷歌、伯克希尔、迪士尼、CRDO。",
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
      }
    ],
    philosophy: {
      summary: "价值投资实践者（大道/段永平）：以“不懂不做”“买股票就是买公司”为核心，长期重仓苹果、伯克希尔等看得懂的优质企业。其 H&H International Investment 美股13F持仓高度集中（苹果一度占70%+），近年逐步分散至科技、能源、中概等领域，但始终围绕“好生意、好管理、好价格”三原则。",
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
];
