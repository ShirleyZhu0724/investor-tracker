/* 大V投资跟踪站 —— 渲染逻辑（零依赖，file:// 直接打开即可） */
(function () {
  "use strict";

  var people = window.PEOPLE || [];
  var meta = window.META || {};
  var main = document.getElementById("main");
  var nav = document.getElementById("peopleNav");

  var current = (people[0] && people[0].id) || "";  // 默认显示第一位大V
  var query = "";
  var tabState = "holdings"; // holdings | views | philo | timeline
  var hIdx = -1;            // 当前查看的 portfolio 序号；-1 表示最新一期

  /* ---------- 工具 ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  /* ---------- 两期持仓对比：自动算变化方向 ---------- */
  var DIR = {
    new:  { cls: "new",  arrow: "＋", txt: "新建仓" },
    add:  { cls: "add",  arrow: "▲", txt: "加仓" },
    cut:  { cls: "cut",  arrow: "▼", txt: "减仓" },
    out:  { cls: "out",  arrow: "✕", txt: "清仓" },
      flat: { cls: "na",   arrow: "—", txt: "持平" },
      na:   { cls: "na",   arrow: "—", txt: "不可比" },
      skip: { cls: "na",   arrow: "—", txt: "" }
    };

  // cur/prev: 持仓数组；匹配以 name 为准；w 为百分比数值（null=不可比）
  function comparePortfolios(cur, prev) {
    var prevMap = {}, curMap = {};
    cur.forEach(function (h) { curMap[h.name] = h; });
    if (prev) prev.forEach(function (h) { prevMap[h.name] = h; });
    var out = [];
    cur.forEach(function (h) {
      if (h.skip) { out.push({ h: h, status: "skip", prevW: null, delta: null }); return; }
      if (prevMap[h.name] === undefined) {
        out.push({ h: h, status: "new", prevW: null, delta: null });
      } else {
        var pw = prevMap[h.name].w, cw = h.w;
        if (pw == null || cw == null) {
          out.push({ h: h, status: "na", prevW: pw, delta: null });
        } else {
          var d = +(cw - pw).toFixed(2);
          out.push({ h: h, status: d > 0.01 ? "add" : (d < -0.01 ? "cut" : "flat"), prevW: pw, delta: d });
        }
      }
    });
    if (prev) {
      prev.forEach(function (h) {
        if (h.skip) return;
        if (curMap[h.name] === undefined) {
          out.push({
            h: { name: h.name, ticker: h.ticker, weight: h.weight, note: h.note, source: h.source, date: h.date, account: h.account },
            status: "out", prevW: h.w, delta: null
          });
        }
      });
    }
    out.sort(function (a, b) {
      if (a.status === "out" && b.status !== "out") return 1;
      if (b.status === "out" && a.status !== "out") return -1;
      var wa = a.h.w == null ? 0 : a.h.w, wb = b.h.w == null ? 0 : b.h.w;
      return wb - wa;
    });
    return out;
  }

  function sortPortfolios(pf) {
    return (pf || []).slice().sort(function (a, b) { return (a.date || "").localeCompare(b.date || ""); });
  }

  /* ---------- 主题 ---------- */
  var savedTheme = localStorage.getItem("dav-theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  var themeBtn = document.getElementById("themeToggle");
  themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
  themeBtn.addEventListener("click", function () {
    var t = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("dav-theme", t);
    themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
  });

  /* ---------- 搜索 ---------- */
  document.getElementById("search").addEventListener("input", function (e) {
    query = e.target.value.trim().toLowerCase();
    render();
  });

  /* ---------- 导航 ---------- */
  function renderNav() {
    var html = "";
    people.forEach(function (p) {
      html +=
        '<button class="navitem ' + (current === p.id ? "active" : "") + '" data-id="' + esc(p.id) + '">' +
        '<span class="navname">' + esc(p.name) + "</span>" +
        "</button>";
    });
    nav.innerHTML = html;
    nav.querySelectorAll(".navitem").forEach(function (b) {
      b.addEventListener("click", function () {
        current = b.dataset.id;
        query = "";
        hIdx = -1;            // 切换大V时持仓期数重置为最新
        document.getElementById("search").value = "";
        render();
      });
    });
  }

  /* ---------- 个人视图 ---------- */
  function personCard(p) {
    var lastPf = sortPortfolios(p.portfolios).slice(-1)[0] || {};
    var extra = "";
    if (lastPf.portfolioValue || lastPf.stockCount) {
      extra =
        '<div class="profile-extra">' +
        (lastPf.portfolioValue ? '<span><b>组合价值</b>' + esc(lastPf.portfolioValue) + "</span>" : "") +
        (lastPf.stockCount ? '<span><b>持股数</b>' + esc(lastPf.stockCount) + "</span>" : "") +
        (lastPf.date ? '<span><b>组合日期</b>' + esc(lastPf.date) + "</span>" : "") +
        "</div>";
    }
    return (
      '<section class="card profile">' +
      '<div class="profile-head"><div>' +
      "<h2>" + esc(p.name) + "</h2>" +
      '<p class="tagline">' + esc(p.tagline || "") + "</p>" +
      "</div><div class=\"updated\">最近更新：" + esc(p.lastUpdate || "—") + "</div></div>" +
      '<div class="profile-meta">' +
      "<span><b>风格</b>" + esc(p.style || "—") + "</span>" +
      "<span><b>风险偏好</b>" + esc(p.riskAppetite || "—") + "</span>" +
      "</div>" + extra + "</section>"
    );
  }

  function renderHoldingsHTML(p) {
    var pf = sortPortfolios(p.portfolios);
    if (!pf.length) return '<section class="card"><h3>最新持仓</h3><p class="muted">暂无数据（把大V原文发给我来整理）。</p></section>';
    var idx = hIdx < 0 ? pf.length - 1 : Math.min(hIdx, pf.length - 1);
    var cur = pf[idx], prev = idx > 0 ? pf[idx - 1] : null;
    var rows = comparePortfolios(cur.holdings, prev ? prev.holdings : null);

    // 判断当前期是否包含 dataroma 风格的明细数据
    var hasDataroma = cur.holdings.some(function (h) {
      return h.shares || h.reportedPrice || h.value || h.currentPrice || h.weekLow || h.activity;
    });

    // 表头
    var headers = ["标的", "仓位", "变化方向", "上一期占比"];
    if (hasDataroma) {
      headers = headers.concat(["股数", "已报告价", "价值", "当前价", "+/-已报告价", "52周低", "52周高", "近期活动", "描述"]);
    } else {
      headers = headers.concat(["描述", "时间"]);
    }

    var rowsHtml = rows.map(function (r) {
      var h = r.h, d = DIR[r.status];
      var dirTxt = d.arrow + (d.txt ? " " + d.txt : "");
      if ((r.status === "add" || r.status === "cut") && r.delta != null) {
        dirTxt += " " + (r.delta > 0 ? "+" : "") + r.delta + "%";
      }
      var prevCell = (r.prevW == null) ? "—" : r.prevW + "%";
      var wCell = r.status === "out" ? "0%" : (h.weight || "—");

      var cells =
        "<td><b>" + esc(h.name) + "</b>" +
          (h.ticker ? ' <span class="ticker">' + esc(h.ticker) + "</span>" : "") +
          (h.account ? ' <span class="acct">' + esc(h.account) + "</span>" : "") + "</td>" +
        "<td>" + esc(wCell) + "</td>" +
        '<td><span class="dir ' + d.cls + '">' + dirTxt + "</span></td>" +
        '<td class="muted">' + prevCell + "</td>";

      if (hasDataroma) {
        var priceUp = false, priceDown = false;
        if (h.change) {
          priceUp = h.change.indexOf("+") === 0;
          priceDown = h.change.indexOf("-") === 0;
        }
        cells +=
          '<td class="num">' + (h.shares || "—") + "</td>" +
          '<td class="num">' + (h.reportedPrice || "—") + "</td>" +
          '<td class="num">' + (h.value || "—") + "</td>" +
          '<td class="num">' + (h.currentPrice || "—") + "</td>" +
          '<td class="num ' + (priceUp ? "up" : (priceDown ? "down" : "")) + '">' + (h.change || "—") + "</td>" +
          '<td class="num muted">' + (h.weekLow || "—") + "</td>" +
          '<td class="num muted">' + (h.weekHigh || "—") + "</td>" +
          '<td>' + (h.activity ? '<span class="act">' + esc(h.activity) + "</span>" : "—") + "</td>" +
          "<td>" + esc(h.note || "") + "</td>";
      } else {
        cells += "<td>" + esc(h.note || "") + "</td>" + '<td class="muted">' + esc(h.date || "") + "</td>";
      }
      return "<tr>" + cells + "</tr>";
    }).join("");

    var pfBtns = "";
    for (var bi = pf.length - 1; bi >= 0; bi--) {
      var pp = pf[bi];
      var lbl = (pp.label || pp.date || "").split(" · ")[0];
      pfBtns += '<button class="periodBtn ' + (bi === idx ? "active" : "") + '" data-i="' + bi + '">' + esc(lbl) + "</button>";
    }

    var cmpNote = prev
      ? "当前显示：<b>" + esc((cur.label || cur.date).split(" · ")[0]) + "</b> 对比 <b>" + esc((prev.label || prev.date).split(" · ")[0]) + "</b>（" + esc(prev.date) + "）"
      : "当前为最早一期（" + esc((cur.label || cur.date).split(" · ")[0]) + "），无上一期可对比";

    var histRows = pf.map(function (pp, i) {
      var c = { new: 0, add: 0, cut: 0, out: 0, na: 0 };
      if (i > 0) {
        comparePortfolios(pp.holdings, pf[i - 1].holdings).forEach(function (r) { if (c[r.status] !== undefined) c[r.status]++; });
      }
      var desc = i === 0
        ? "最早一期快照"
        : ("对比 " + esc((pf[i - 1].label || pf[i - 1].date).split(" · ")[0]) + "：新建 " + c.new + " / 加仓 " + c.add + " / 减仓 " + c.cut + " / 清仓 " + c.out + (c.na ? (" / 不可比 " + c.na) : ""));
      return '<div class="hrow"><span class="hdate">' + esc(pp.date) + '</span>' +
        '<span class="htag">' + esc(pp.label || pp.date) + '</span>' +
        '<span class="hdesc">' + desc + '</span>' +
        '<span class="hgo" data-i="' + i + '">查看 →</span></div>';
    }).join("");

    return (
      '<section class="card"><h3>最新持仓</h3>' +
      '<div class="periods">' + pfBtns + "</div>" +
      '<p class="cmpnote">' + cmpNote + "</p>" +
      '<div class="tablewrap"><table class="data ' + (hasDataroma ? "dataroma" : "") + '"><thead><tr>' +
      headers.map(function (hh) { return "<th>" + esc(hh) + "</th>"; }).join("") +
      "</tr></thead><tbody>" + rowsHtml + "</tbody></table></div>" +
      '<div class="histlist"><div class="histhead">历史持仓记录（点击任意一期查看该期完整持仓）</div>' + histRows + "</div>" +
      "</section>"
    );
  }

  function bindHoldingSwitcher(p) {
    var wrap = document.getElementById("holdingsWrap");
    if (!wrap) return;
    wrap.querySelectorAll(".periodBtn, .hgo").forEach(function (b) {
      b.addEventListener("click", function () {
        hIdx = parseInt(b.getAttribute("data-i"), 10);
        wrap.innerHTML = renderHoldingsHTML(p);
        bindHoldingSwitcher(p);
        if (b.classList.contains("hgo")) {
          var sec = wrap.querySelector(".card");
          if (sec && sec.scrollIntoView) sec.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  function renderViews(p) {
    var vs = (p.viewpoints || []).slice().sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
    if (!vs.length) return '<section class="card"><h3>重要观点</h3><p class="muted">暂无数据。</p></section>';
    var items = vs.map(function (v) {
      var tags = (v.tags || []).length
        ? '<div class="tags">' + v.tags.map(function (t) { return '<span class="tag">#' + esc(t) + "</span>"; }).join("") + "</div>"
        : "";
      return (
        '<li class="tl-item"><div class="tl-date">' + esc(v.date || "") + "</div>" +
        '<div class="tl-body">' + esc(v.content) + "</div>" + tags + "</li>"
      );
    }).join("");
    return '<section class="card"><h3>重要观点</h3><ul class="timeline">' + items + "</ul></section>";
  }

  function renderPhilo(p) {
    var ph = p.philosophy || {};
    var html = '<section class="card"><h3>投资理念</h3>';
    if (ph.summary) html += '<p class="philo-sum">' + esc(ph.summary) + "</p>";
    if (ph.points && ph.points.length) {
      html += '<div class="points">' + ph.points.map(function (x) { return '<div class="point">• ' + esc(x) + "</div>"; }).join("") + "</div>";
    }
    if (ph.quotes && ph.quotes.length) {
      html += '<div class="quotes">' + ph.quotes.map(function (q) { return "<blockquote>" + esc(q) + "</blockquote>"; }).join("") + "</div>";
    }
    if (!ph.summary && !(ph.points && ph.points.length) && !(ph.quotes && ph.quotes.length)) {
      html += '<p class="muted">暂无数据。</p>';
    }
    return html + "</section>";
  }

  function renderTimeline(p) {
    var events = [];
    sortPortfolios(p.portfolios).forEach(function (pf) {
      (pf.holdings || []).forEach(function (h) {
        var suffix = (pf.date && pf.date !== h.date) ? "（" + pf.date + "披露）" : "";
        events.push({ date: h.date, type: "持仓", text: h.name + " " + (h.weight || "") + " — " + (h.note || "") + suffix, src: h.source });
      });
    });
    (p.viewpoints || []).forEach(function (v) {
      events.push({ date: v.date, type: "观点", text: v.content, src: v.source });
    });
    events = events.filter(function (e) { return e.date; }).sort(function (a, b) { return b.date.localeCompare(a.date); });
    if (!events.length) return '<section class="card"><h3>跟踪时间线</h3><p class="muted">暂无数据。</p></section>';
    var items = events.map(function (e) {
      var et = e.type === "持仓" ? "h" : "v";
      return (
        '<li class="tl-item"><div class="tl-date">' + esc(e.date) +
        ' <span class="etype etype-' + et + '">' + e.type + "</span></div>" +
        '<div class="tl-body">' + esc(e.text) + "</div></li>"
      );
    }).join("");
    return '<section class="card"><h3>跟踪时间线</h3><ul class="timeline">' + items + "</ul></section>";
  }

  function renderPerson(p) {
    var tabs = [
      ["holdings", "最新持仓"],
      ["views", "重要观点"],
      ["philo", "投资理念"],
      ["timeline", "跟踪时间线"]
    ];
    var tabHtml = '<div class="tabs">' + tabs.map(function (t) {
      return '<button class="tab ' + (tabState === t[0] ? "active" : "") + '" data-t="' + t[0] + '">' + t[1] + "</button>";
    }).join("") + "</div>";

    var content;
    if (tabState === "holdings") content = '<div id="holdingsWrap">' + renderHoldingsHTML(p) + "</div>";
    else if (tabState === "views") content = renderViews(p);
    else if (tabState === "philo") content = renderPhilo(p);
    else content = renderTimeline(p);

    return personCard(p) + tabHtml + content;
  }

  function bindTabs() {
    document.querySelectorAll(".tab").forEach(function (b) {
      b.addEventListener("click", function () {
        tabState = b.dataset.t;
        render();
      });
    });
  }

  /* ---------- 搜索 ---------- */
  function searchAll(q) {
    var html = '<section class="card"><h2>搜索：“' + esc(q) + '”</h2>';
    var found = false;
    people.forEach(function (p) {
      var h = [];
      sortPortfolios(p.portfolios).forEach(function (pf) {
        (pf.holdings || []).forEach(function (x) {
          if ((x.name + " " + (x.note || "") + " " + (x.ticker || "")).toLowerCase().indexOf(q) >= 0) h.push(x);
        });
      });
      var v = (p.viewpoints || []).filter(function (x) {
        return (x.content + " " + (x.tags || []).join(" ")).toLowerCase().indexOf(q) >= 0;
      });
      var ph = p.philosophy || {};
      var phText = [ph.summary, (ph.points || []).join(" "), (ph.quotes || []).join(" ")].join(" ").toLowerCase();
      var phHit = phText.indexOf(q) >= 0;
      if (h.length || v.length || phHit) {
        found = true;
        html += "<h3 class=\"res-person\">" + esc(p.name) + "</h3>";
        if (h.length) html += '<div class="res-group">持仓：' + h.map(function (x) { return '<span class="chip">' + esc(x.name) + "</span>"; }).join("") + "</div>";
        if (v.length) html += '<div class="res-group">观点：' + v.map(function (x) { return esc(x.content); }).join("；") + "</div>";
        if (phHit) html += '<div class="res-group">投资理念 命中</div>';
      }
    });
    if (!found) html += '<p class="muted">没有匹配结果。</p>';
    return html + "</section>";
  }

  /* ---------- 总渲染 ---------- */
  function render() {
    renderNav();
    var top = "";
    if (meta.sample) {
      top =
        '<div class="banner">⚠️ 当前为<b>演示数据</b>。把大V的原文（雪球/公众号发言、文章）发给我，我会整理成真实数据写入 ' +
        "<code>data/people.js</code>；你也可以按文件内格式自己改。拿到真实内容后，把文件顶部 <code>window.META.sample</code> 改为 <code>false</code>。</div>";
    }
    if (query) {
      main.innerHTML = top + searchAll(query);
      return;
    }
    var p = people.filter(function (x) { return x.id === current; })[0];
    if (!p) p = people[0];
    if (!p) { main.innerHTML = top + '<p class="muted">暂无数据。</p>'; return; }
    main.innerHTML = top + renderPerson(p);
    bindTabs();
    if (tabState === "holdings") bindHoldingSwitcher(p);
  }

  render();
})();
