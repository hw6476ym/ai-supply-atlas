/* Views: home, teardowns, people, money, atoms, world, about. */
(function (AI) {
  const C = AI.core; const esc = C.esc;
  const V = (AI.views = {});

  /* ================================================================ HOME */
  V.home = function (main) {
    const scales = ["idea", "app", "~1 km", "~2 m", "~1 cm", "~1 km", "~1 µm", "~1 km", "~0.2 nm"];
    const examples = {
      1: ["openai", "anthropic", "google", "nvidia"], 2: ["p_chatgpt", "p_claude", "p_gemini", "p_rayban"], 3: ["s_abilene", "s_rainier", "s_colossus1", "s_hyperion"],
      4: ["c_gb200", "c_vr", "c_tpu8", "c_trn2"], 5: ["m_hbm4", "m_cowos", "m_optics", "m_transformer"], 6: ["f_tsmc18", "f_asml", "f_hynix_m15x", "f_zeiss"],
      7: ["r_polysi", "r_hafnium", "r_helium", "r_gallium"], 8: ["x_spruce", "x_china_ga", "x_kolwezi", "e_crane"]
    };
    const strata = Object.entries(AI.tiers).map(([t, v]) => `
      <a class="stratum" href="#/map?tier=${t}" style="--c:${C.tierVar(t)}">
        <span class="s-scale">${scales[t - 1]}</span>
        <span class="s-name">${esc(v.name)}<span class="s-hint">${esc(v.hint)}</span></span>
        <span class="s-ex">${examples[t].map((id) => `<b>${esc(AI.idx[id].label)}</b>`).join(", ")}…</span>
        <span class="s-n num">${AI.N.filter((d) => d.tier == t).length}</span>
      </a>`).join("");
    const used = Object.keys(AI.elementUse).length;
    main.innerHTML = `
    <div class="wrap">
      <section class="hero">
        <h1>From atoms to intelligence</h1>
        <p class="lede">Every answer an AI gives you starts as sand in North Carolina, gas in Qatar and copper in Chile. This atlas traces the whole chain for the world's AI companies: what each product is made of, how it is made, how it works, who leads each layer, and where the money flows.</p>
        <div class="hero-cta">
          <a class="btn primary" href="#/map">Open the supply map</a>
          <a class="btn" href="#/teardown/gb200">Take apart an AI rack</a>
          <a class="btn" href="#/atoms">See the atoms</a>
        </div>
      </section>
      <div class="descent" aria-label="The layers of the AI stack, from intelligence down to atoms">
        <div>${strata}
          <a class="stratum atoms" href="#/atoms">
            <span class="s-scale">${scales[8]}</span>
            <span class="s-name">Atoms<span class="s-hint">The elements it's all made of</span></span>
            <span class="s-ex"><b>Silicon</b>, <b>hafnium</b>, <b>copper</b>, <b>gallium</b>, <b>neodymium</b>…</span>
            <span class="s-n num">${used}</span>
          </a>
        </div>
      </div>
      <p class="asof">Status as of October 2026. Numbers are rounded public figures; follow the source links to check them.</p>

      <section class="section">
        <div class="section-head"><h2>Start with a question</h2></div>
        <div class="tours">
          <a class="tour" href="#/map?n=p_chatgpt"><h3>What does it take to answer one ChatGPT message?</h3><span class="path">ChatGPT → Stargate Abilene → GB200 → HBM → TSMC → Spruce Pine quartz</span></a>
          <a class="tour" href="#/teardown/gb200"><h3>What's inside the machine that trains AI?</h3><span class="path">A 1.4-tonne rack, zoomed in 10× at a time to a silicon atom</span></a>
          <a class="tour" href="#/map?choke=1"><h3>Where could it all break?</h3><span class="path">Single-source chokepoints: ASML, Zeiss, CoWoS, HBM, gallium, quartz</span></a>
          <a class="tour" href="#/teardown/llm"><h3>How is a model actually made?</h3><span class="path">Data → pre-training → post-training → serving, one token at a time</span></a>
          <a class="tour" href="#/money"><h3>Who is paying for all this?</h3><span class="path">$700B+ of 2026 capex, $100B+ rounds, and money that loops between chipmakers and labs</span></a>
          <a class="tour" href="#/teardown/euv"><h3>How do you make light from tin?</h3><span class="path">The only machine that can print a leading-edge AI chip</span></a>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2>The numbers that matter right now</h2><a href="#/money">All money flows</a></div>
        <div class="figures">${AI.money.headline.map(([k, v]) => `<div><b class="num">${esc(v)}</b><span>${esc(k)}</span></div>`).join("")}</div>
      </section>

      <section class="section">
        <div class="section-head"><h2>Take something apart</h2><a href="#/teardowns">All ${AI.teardowns.length} teardowns</a></div>
        <div class="td-grid">${AI.teardowns.slice(0, 6).map(tdCard).join("")}</div>
      </section>
      ${V.footer()}
    </div>`;
  };

  V.tdCard = tdCard;
  function tdCard(t) {
    const tiersHit = [...new Set(t.ladder.map((r) => (r.node ? AI.idx[r.node].tier : null)).filter(Boolean))].sort();
    return `<a class="td-card" href="#/teardown/${t.id}"><span class="kind">${esc(t.kind)} · ${esc(t.maker)}</span><h3>${esc(t.name)}</h3><span class="muted">${esc(t.tagline)}</span>
      <span class="depth" aria-label="${t.ladder.length} zoom levels">${t.ladder.map((r, i) => `<i style="background:${C.tierVar(r.node ? AI.idx[r.node].tier : 9)};opacity:${1 - i * 0.06}"></i>`).join("")}</span></a>`;
  }

  /* ================================================================ TEARDOWNS */
  V.teardowns = function (main) {
    main.innerHTML = `<div class="wrap"><section class="hero"><h1>Teardowns</h1>
      <p class="lede">Pick a product and zoom in ten times at a time until you reach the atoms. Each teardown also explains how the thing works, how it is made step by step, which companies make each part, and who leads them.</p></section>
      <div class="td-grid">${AI.teardowns.map(tdCard).join("")}</div>${V.footer()}</div>`;
  };

  V.teardown = function (main, id) {
    const t = C.teardown(id);
    if (!t) { main.innerHTML = `<div class="wrap"><div class="empty" style="margin-top:40px">No teardown called “${esc(id)}”. <a href="#/teardowns">See all teardowns</a>.</div></div>`; return; }
    const ladder = t.ladder.map((r, i) => {
      const s = C.fmtScale(r.scale, r.unit);
      const next = t.ladder[i + 1];
      const factor = next && r.unit === "m" && next.unit === "m" ? Math.round(Math.log10(r.scale / next.scale)) : null;
      const size = Math.max(6, 16 - i * 1.2);
      const node = r.node && AI.idx[r.node];
      return `<div class="rung" id="r${i}">
        <div class="scale num">${esc(s.big)}<small>${esc(s.small)}</small></div>
        <div class="spine"><i style="width:${size}px;height:${size}px;${node ? "background:" + C.tierVar(node.tier) : ""}"></i></div>
        <div class="body">
          <h3>${esc(r.name)}</h3>
          <p>${esc(r.see)}</p>
          <div class="meta"><b>Made of</b><span>${esc(r.made)}</span>${r.by ? `<b>Made by</b><span>${esc(r.by)}</span>` : ""}</div>
          ${node ? `<div class="go">${C.nodeChip(r.node)}</div>` : ""}
        </div>
        ${factor ? `<span class="zoomfactor" style="top:100%">×10${C.sup(factor)}</span>` : ""}
      </div>`;
    }).join("");
    const ppl = (t.people || []).map(C.person).filter(Boolean);
    const idx = AI.teardowns.indexOf(t); const prev = AI.teardowns[idx - 1], next = AI.teardowns[idx + 1];
    main.innerHTML = `<div class="wrap">
      <header class="td-head">
        <a href="#/teardowns" class="muted" style="text-decoration:none">← All teardowns</a>
        <div class="kind" style="margin-top:14px">${esc(t.kind)} · ${esc(t.maker)}</div>
        <h1>${esc(t.name)}</h1>
        <p class="lede">${esc(t.tagline)}</p>
        <dl class="td-facts">${t.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
        <p class="prose">${esc(t.why)}</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap">${t.node ? `<a class="btn primary" href="#/map?n=${t.node}">Trace it on the supply map</a>` : ""}<button class="btn" id="copyT">Copy link</button></div>
      </header>
      <nav class="td-nav" aria-label="On this page"><a href="#/teardown/${t.id}?s=zoom">Zoom in</a><a href="#/teardown/${t.id}?s=works">How it works</a><a href="#/teardown/${t.id}?s=made">How it's made</a><a href="#/teardown/${t.id}?s=atoms">Atoms</a><a href="#/teardown/${t.id}?s=people">People & money</a></nav>
      <section class="section" id="s-zoom" style="border-top:0">
        <div class="section-head"><h2>Zoom in, ten times at a time</h2><span class="muted">${t.ladder.length} levels, from ${esc(C.fmtScale(t.ladder[0].scale, t.ladder[0].unit).big)} down</span></div>
        <div class="ladder">${ladder}</div>
      </section>
      <section class="section two-col">
        <div id="s-works"><h2 style="margin-bottom:14px">How it works</h2><ol class="steps">${t.howWorks.map(([a, b]) => `<li><div><b>${esc(a)}</b><p>${esc(b)}</p></div></li>`).join("")}</ol></div>
        <div id="s-made"><h2 style="margin-bottom:14px">How it's made</h2><ol class="steps">${t.howMade.map(([a, b, n]) => `<li><div><b>${esc(a)}</b><p>${esc(b)}</p>${n && AI.idx[n] ? `<div style="margin-top:6px">${C.nodeChip(n)}</div>` : ""}</div></li>`).join("")}</ol></div>
      </section>
      <section class="section" id="s-atoms">
        <div class="section-head"><h2>The atoms inside</h2><a href="#/atoms">Full periodic table</a></div>
        <div class="el-strip">${t.elements.map(([s, role]) => { const e = C.element(s); const u = AI.elementUse[s]; return `<a class="el-tile ${u && u.risk === 3 ? "r3" : ""}" href="#/atoms?e=${s}"><span class="z">${e.z}</span><div class="sym">${s}</div><div style="font-size:.8rem">${esc(e.name)}</div><div class="r">${esc(role)}</div></a>`; }).join("")}</div>
        ${t.chokepoints && t.chokepoints.length ? `<h3 style="margin:26px 0 10px">Chokepoints in this product</h3><div style="display:flex;flex-wrap:wrap;gap:6px">${t.chokepoints.map(C.nodeChip).join("")}</div>` : ""}
      </section>
      <section class="section two-col" id="s-people">
        <div><h2 style="margin-bottom:14px">Who leads it</h2>${ppl.map(C.personMini).join("") || '<p class="muted">No people listed yet.</p>'}</div>
        <div><h2 style="margin-bottom:14px">The money</h2><dl class="kv">${(t.money || []).map(([k, v]) => `<dt>${esc(k)}</dt><dd class="num">${esc(v)}</dd>`).join("")}</dl>
          <h3 style="margin:22px 0 6px">Sources</h3><ul class="src-list">${(t.sources || []).map(([n, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a></li>`).join("")}</ul></div>
      </section>
      <nav class="section" style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">
        ${prev ? `<a class="btn" href="#/teardown/${prev.id}">← ${esc(prev.name)}</a>` : "<span></span>"}
        ${next ? `<a class="btn" href="#/teardown/${next.id}">${esc(next.name)} →</a>` : ""}
      </nav>
      ${V.footer()}</div>`;
    document.getElementById("copyT").onclick = C.copyLink;
  };

  /* ================================================================ PEOPLE */
  const LAYERS = { all: "Everyone", lab: "Labs & models", hyper: "Hyperscalers", chip: "Chips", fab: "Fabs, memory & tools", cloud: "Clouds", device: "Devices & robots", china: "China", investor: "Investors" };
  V.people = function (main, params) {
    main.innerHTML = `<div class="wrap"><section class="hero"><h1>The people</h1>
      <p class="lede">${AI.people.length} people who decide what gets built, from lab CEOs to the engineers who run the fabs. Each card says what they are working on now.</p></section>
      <div class="filters"><input type="search" id="pq" placeholder="Search by name, company or project" aria-label="Search people">
        <div class="seg" role="group" aria-label="Filter by layer">${Object.entries(LAYERS).map(([k, v]) => `<button data-l="${k}" aria-pressed="${k === "all"}">${v}</button>`).join("")}</div></div>
      <div class="p-grid" id="pgrid"></div>
      <p class="asof" style="margin-top:20px">Roles change often. Titles as reported through October 2026.</p>
      ${V.footer()}</div>`;
    let layer = "all"; let q = "";
    function draw() {
      const list = AI.people.filter((p) => (layer === "all" || p.layer === layer) && (!q || [p.name, p.org, p.role, p.now, p.bg].join(" ").toLowerCase().includes(q)));
      document.getElementById("pgrid").innerHTML = list.map((p) => `
        <article class="p-card" id="p-${p.id}">
          <header><span class="avatar">${esc(C.initials(p.name))}</span><div><h3>${esc(p.name)}</h3><div class="role">${esc(p.role)}, ${esc(p.org)}</div></div></header>
          <p class="now">${esc(p.now)}</p>
          <p class="bg">${esc(p.bg)}</p>
          <footer>${p.node ? C.nodeChip(p.node) : ""}${p.link ? `<a class="chip" href="${esc(p.link)}" target="_blank" rel="noopener">Wikipedia</a>` : ""}</footer>
        </article>`).join("") || `<div class="empty">Nobody matches “${esc(q)}”. Try a company name like “TSMC”.</div>`;
    }
    document.getElementById("pq").oninput = (e) => { q = e.target.value.toLowerCase().trim(); draw(); };
    C.$$(".seg button", main).forEach((b) => (b.onclick = () => { layer = b.dataset.l; C.$$(".seg button", main).forEach((x) => x.setAttribute("aria-pressed", x === b)); draw(); }));
    draw();
    if (params.p) { const el = document.getElementById("p-" + params.p); if (el) { el.style.borderColor = "var(--amber)"; el.scrollIntoView({ block: "center" }); } }
  };

  /* ================================================================ MONEY */
  V.money = function (main) {
    const M = AI.money;
    main.innerHTML = `<div class="wrap"><section class="hero"><h1>Follow the money</h1>
      <p class="lede">Four companies plan to spend over $700 billion on data centers in 2026. Labs raise $100 billion rounds, then hand most of it to chipmakers and clouds, some of which invested in the labs to begin with.</p></section>
      <div class="figures">${M.headline.map(([k, v]) => `<div><b class="num">${esc(v)}</b><span>${esc(k)}</span></div>`).join("")}</div>
      <section class="section two-col">
        <div class="chart-card"><h3>2026 capital spending, guided</h3><p class="muted" style="font-size:.88rem">US$ billions. Bars show the range where a company gave one.</p><svg class="chart" id="capex" viewBox="0 0 520 250" role="img" aria-label="Bar chart of 2026 capex guidance"></svg></div>
        <div class="chart-card"><h3>What the labs are worth</h3><p class="muted" style="font-size:.88rem">US$ billions, log scale, at each priced round or deal.</p><svg class="chart" id="vals" viewBox="0 0 520 250" role="img" aria-label="Line chart of lab valuations over time"></svg></div>
      </section>
      <section class="section">
        <div class="section-head"><h2>The deals that move money</h2>
          <div class="seg" role="group" aria-label="Filter deals">${["all", "equity", "compute", "chips", "license", "gov"].map((k) => `<button data-k="${k}" aria-pressed="${k === "all"}">${{ all: "All", equity: "Investment", compute: "Compute", chips: "Chips", license: "Licensing", gov: "Government" }[k]}</button>`).join("")}</div></div>
        <table class="deals"><thead><tr><th>When</th><th>From → To</th><th>Amount</th><th>What it buys</th></tr></thead><tbody id="dealRows"></tbody></table>
        <p class="asof" style="margin-top:12px">Many figures are multi-year, contingent or reported by press rather than confirmed. Treat them as order-of-magnitude.</p>
      </section>
      <section class="section"><h3>Sources</h3><ul class="src-list">${M.sources.map(([n, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a></li>`).join("")}</ul></section>
      ${V.footer()}</div>`;

    // capex bars
    const svg = d3.select("#capex"); const W = 520, H = 250, m = { l: 90, r: 50, t: 10, b: 30 };
    const x = d3.scaleLinear().domain([0, 220]).range([m.l, W - m.r]); const y = d3.scaleBand().domain(M.capex2026.map((d) => d.org)).range([m.t, H - m.b]).padding(0.32);
    svg.append("g").attr("class", "grid").attr("transform", `translate(0,${H - m.b})`).call(d3.axisBottom(x).ticks(5).tickSize(-(H - m.t - m.b)).tickFormat((v) => "$" + v + "B")).call((g) => g.select(".domain").remove());
    svg.selectAll("rect.bar").data(M.capex2026).join("rect").attr("x", x(0)).attr("y", (d) => y(d.org)).attr("height", y.bandwidth()).attr("width", (d) => x(d.lo) - x(0)).attr("rx", 3).style("fill", "var(--amber)");
    svg.selectAll("rect.rng").data(M.capex2026.filter((d) => d.hi > d.lo)).join("rect").attr("x", (d) => x(d.lo)).attr("y", (d) => y(d.org)).attr("height", y.bandwidth()).attr("width", (d) => x(d.hi) - x(d.lo)).attr("rx", 3).style("fill", "var(--amber)").style("opacity", 0.4);
    svg.selectAll("text.lab").data(M.capex2026).join("text").attr("x", m.l - 8).attr("y", (d) => y(d.org) + y.bandwidth() / 2).attr("dy", "0.35em").attr("text-anchor", "end").style("fill", "var(--text)").style("font-weight", 600).text((d) => d.org);
    svg.selectAll("text.val").data(M.capex2026).join("text").attr("x", (d) => x(d.hi) + 6).attr("y", (d) => y(d.org) + y.bandwidth() / 2).attr("dy", "0.35em").text((d) => (d.hi > d.lo ? `$${d.lo}–${d.hi}B` : `~$${d.lo}B`)).append("title").text((d) => d.note);

    // valuation lines
    const sv = d3.select("#vals"); const vm = { l: 50, r: 120, t: 16, b: 30 };
    const parse = d3.timeParse("%Y-%m");
    const series = Object.entries(M.valuations).map(([k, pts]) => ({ k, pts: pts.map(([d, v]) => ({ d: parse(d), v })) }));
    const all = series.flatMap((s) => s.pts);
    const vx = d3.scaleTime().domain(d3.extent(all, (p) => p.d)).range([vm.l, W - vm.r]);
    const vy = d3.scaleLog().domain([3, 1200]).range([H - vm.b, vm.t]);
    const cols = { OpenAI: "var(--t3)", Anthropic: "var(--amber)", xAI: "var(--t4)" };
    sv.append("g").attr("class", "grid").attr("transform", `translate(${vm.l},0)`).call(d3.axisLeft(vy).tickValues([10, 30, 100, 300, 1000]).tickSize(-(W - vm.l - vm.r)).tickFormat((v) => "$" + (v >= 1000 ? "1T" : v + "B"))).call((g) => g.select(".domain").remove());
    sv.append("g").attr("class", "axis").attr("transform", `translate(0,${H - vm.b})`).call(d3.axisBottom(vx).ticks(4).tickFormat(d3.timeFormat("%Y")));
    const ends = series.map((s) => ({ k: s.k, p: s.pts[s.pts.length - 1], y: vy(s.pts[s.pts.length - 1].v) })).sort((a, b) => a.y - b.y);
    for (let i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 15) ends[i].y = ends[i - 1].y + 15;
    ends.forEach((e) => sv.append("text").attr("x", vx(e.p.d) + 7).attr("y", e.y).attr("dy", "0.35em").style("fill", cols[e.k]).style("font-weight", 700).text(`${e.k} $${e.p.v}B`));
    series.forEach((s) => {
      sv.append("path").datum(s.pts).attr("fill", "none").attr("stroke", cols[s.k]).attr("stroke-width", 2.4).attr("d", d3.line().x((p) => vx(p.d)).y((p) => vy(p.v)));
      sv.selectAll(null).data(s.pts).join("circle").attr("cx", (p) => vx(p.d)).attr("cy", (p) => vy(p.v)).attr("r", 3.5).style("fill", cols[s.k]).append("title").text((p) => `${s.k}: $${p.v}B (${d3.timeFormat("%b %Y")(p.d)})`);
    });

    let kind = "all";
    function rows() {
      document.getElementById("dealRows").innerHTML = M.deals.filter((d) => kind === "all" || d.kind === kind).map((d) => `<tr><td class="num muted">${esc(d.date)}</td><td><b>${esc(d.from)}</b> → <b>${esc(d.to)}</b> <span class="kind-tag">${esc(d.kind)}</span></td><td class="amt">${esc(d.amt)}</td><td class="what">${esc(d.what)}</td></tr>`).join("");
    }
    C.$$(".seg button", main).forEach((b) => (b.onclick = () => { kind = b.dataset.k; C.$$(".seg button", main).forEach((x) => x.setAttribute("aria-pressed", x === b)); rows(); }));
    rows();
  };

  /* ================================================================ ATOMS */
  V.atoms = function (main, params) {
    const cells = AI.elements.map((e) => {
      const u = AI.elementUse[e.sym];
      const top = e.row > 8 ? e.row + 0.4 : e.row;
      return `<button class="pcell ${u ? "used r" + u.risk : ""}" style="grid-column:${e.col};grid-row:${Math.round(e.row > 8 ? e.row + 0.4 : e.row)}" data-s="${e.sym}" ${u ? "" : 'tabindex="-1" aria-hidden="true"'} title="${esc(e.name)}"><span class="z">${e.z}</span><span class="s">${e.sym}</span></button>`;
    }).join("");
    main.innerHTML = `<div class="wrap"><section class="hero"><h1>The atoms</h1>
      <p class="lede">${Object.keys(AI.elementUse).length} of the 118 elements end up inside an AI data center. Highlighted cells are used; red ones come mostly from a single country or region.</p></section>
      <div class="legend-inline"><span><i style="background:color-mix(in srgb,var(--amber) 14%,var(--bg2))"></i>Used, widely available</span><span><i style="background:color-mix(in srgb,var(--copper) 26%,var(--bg2))"></i>Concentrated supply</span><span><i style="background:color-mix(in srgb,var(--risk) 30%,var(--bg2))"></i>Single-region chokepoint</span><span><i style="background:var(--bg2)"></i>Not used</span></div>
      <div class="ptable" role="group" aria-label="Periodic table">${cells}</div>
      <div id="atomPanel" aria-live="polite"></div>
      ${V.footer()}</div>`;
    const panel = document.getElementById("atomPanel");
    function show(sym, push) {
      const e = C.element(sym); const u = AI.elementUse[sym]; if (!u) return;
      C.$$(".pcell", main).forEach((c) => c.classList.toggle("sel", c.dataset.s === sym));
      const inTd = AI.teardowns.filter((t) => t.elements.some(([s]) => s === sym));
      const nodes = AI.N.filter((d) => (d.el || []).includes(sym) || u.nodes.includes(d.id));
      panel.innerHTML = `<div class="atom-panel"><div><div class="big">${sym}</div><div><b>${esc(e.name)}</b></div><div class="muted">Atomic number ${e.z}</div>
        ${u.risk >= 2 ? `<span class="chip risk" style="margin-top:8px">${u.risk === 3 ? "Single-region chokepoint" : "Concentrated supply"}</span>` : ""}</div>
        <div><h3 style="margin-bottom:6px">What it does in AI</h3><p>${esc(u.role)}</p>
        <h3 style="margin:14px 0 6px">Where it comes from</h3><p>${esc(u.top)}</p>
        ${nodes.length ? `<h3 style="margin:14px 0 6px">Find it on the supply map</h3><div style="display:flex;flex-wrap:wrap;gap:6px">${nodes.map((d) => C.nodeChip(d.id)).join("")}</div>` : ""}
        ${inTd.length ? `<h3 style="margin:14px 0 6px">Inside these products</h3><div style="display:flex;flex-wrap:wrap;gap:6px">${inTd.map((t) => `<a class="chip" href="#/teardown/${t.id}">${esc(t.name)}</a>`).join("")}</div>` : ""}</div></div>`;
      if (push) AI.app.setParams({ e: sym });
    }
    C.$$(".pcell.used", main).forEach((c) => (c.onclick = () => { show(c.dataset.s, true); panel.scrollIntoView({ behavior: "smooth", block: "nearest" }); }));
    show(params.e && AI.elementUse[params.e] ? params.e : "Si", false);
  };

  /* ================================================================ WORLD */
  V.world = function (main) {
    const placed = AI.N.filter((d) => d.lat != null && d.tier >= 3);
    main.innerHTML = `<div class="wrap"><section class="hero"><h1>Where it happens</h1>
      <p class="lede">${placed.length} named places, from data centers in Texas to the quartz mine in Appalachia and the fabs of southern Taiwan. Colour shows the layer. Click a dot to trace it.</p></section>
      <div class="legend-inline" style="margin-bottom:10px">${[3, 4, 5, 6, 7, 8].filter((t) => placed.some((d) => d.tier === t)).map((t) => `<span><i style="background:${C.tierVar(t)};border-radius:50%"></i>${esc(AI.tiers[t].name)}</span>`).join("")}</div>
      <div class="world-wrap"><svg id="world" viewBox="0 0 960 500" role="img" aria-label="World map of AI supply chain sites"></svg><div class="tip" id="wtip"></div></div>
      <p class="asof" style="margin-top:10px">Some locations are approximate (company headquarters or a representative site). Country outlines from Natural Earth via world-atlas.</p>
      ${V.footer()}</div>`;
    const svg = d3.select("#world");
    const proj = d3.geoNaturalEarth1().scale(175).translate([480, 270]);
    const path = d3.geoPath(proj);
    svg.append("path").datum(d3.geoGraticule10()).attr("class", "graticule").attr("d", path);
    const gl = svg.append("g");
    fetch("vendor/countries-110m.json").then((r) => r.json()).then((w) => {
      gl.selectAll("path").data(topojson.feature(w, w.objects.countries).features).join("path").attr("class", "land").attr("d", path);
    }).catch(() => gl.append("text").attr("x", 480).attr("y", 250).attr("text-anchor", "middle").text("Country outlines could not load; sites are still shown."));
    const tip = d3.select("#wtip"); const wrap = svg.node().parentNode;
    svg.append("g").selectAll("circle").data(placed.sort((a, b) => a.tier - b.tier)).join("circle").attr("class", "site")
      .attr("cx", (d) => proj([d.lon, d.lat])[0]).attr("cy", (d) => proj([d.lon, d.lat])[1]).attr("r", (d) => (C.isChoke(d) ? 6.5 : 4.5))
      .style("fill", (d) => C.tierVar(d.tier)).attr("tabindex", 0)
      .on("mouseenter", (e, d) => tip.style("opacity", 1).html(`<b>${esc(d.label)}</b>${C.isChoke(d) ? " 🔒" : ""}<br><span class="muted">${esc(AI.tiers[d.tier].name)} · ${esc(d.loc || "")}</span>`))
      .on("mousemove", (e) => { const r = wrap.getBoundingClientRect(); tip.style("left", Math.min(e.clientX - r.left + 12, r.width - 290) + "px").style("top", e.clientY - r.top + 12 + "px"); })
      .on("mouseleave", () => tip.style("opacity", 0))
      .on("click", (e, d) => (location.hash = "#/map?n=" + d.id))
      .on("keydown", (e, d) => { if (e.key === "Enter") location.hash = "#/map?n=" + d.id; });
  };

  /* ================================================================ MORE (mobile menu) & ABOUT */
  V.more = function (main) {
    const items = [["#/companies", "Company dossiers", "Everything each AI company depends on, its chips, leaders and deals"], ["#/specs", "Accelerator spec sheet", "HBM, bandwidth, FP8/FP4, power and scale-up for every AI chip"],
      ["#/models", "Frontier models", "Who shipped what, open or closed"], ["#/sites", "Compute sites", "Gigawatts planned and online"], ["#/chokepoints", "Chokepoints & what-if", "Knock out a supplier, see who's hit"],
      ["#/compute", "Compute calculator", "Params × tokens → days, MWh and dollars"], ["#/roadmaps", "Roadmaps", "Nvidia, HBM and process-node timelines"], ["#/money", "Money", "Capex, valuations and deals"],
      ["#/atoms", "Atoms", "The periodic table of AI hardware"], ["#/world", "World map", "Where every site, fab and mine is"], ["#/glossary", "Glossary", "From KV cache to backside power"], ["#/about", "About & data", "Sources, method and data download"]];
    main.innerHTML = `<div class="wrap"><section class="hero" style="padding-bottom:0"><h1>More</h1></section><div class="more-list">${items.map(([h, t, d]) => `<a class="tour" href="${h}"><h3>${t}</h3><span class="path">${d}</span></a>`).join("")}</div>${V.footer()}</div>`;
  };

  V.about = function (main) {
    main.innerHTML = `<div class="wrap"><section class="hero"><h1>About this atlas</h1>
      <div class="prose"><p class="lede">An AI-focused companion to the Global Supply Chain Explorer. Instead of the top 100 companies, it follows only the companies building AI, and goes further down: past the factory and the mine to the atoms, and sideways to the people and the money.</p>
      <h3 style="margin:24px 0 8px">What's in it</h3>
      <p>${AI.N.length} named entities in 8 layers with ${AI.L.length} dependency links, ${AI.N.filter((d) => d.tier === 1).length} AI company dossiers, ${AI.teardowns.length} teardowns, ${AI.specs.accel.length} accelerators and ${AI.specs.models.length} model families on the spec sheets, ${AI.people.length} people, ${AI.money.deals.length} major deals, ${AI.specs.glossary.length} glossary terms, and ${Object.keys(AI.elementUse).length} elements.</p>
      <h3 style="margin:24px 0 8px">How to read the figures</h3>
      <p>Figures come from company announcements, filings and press reporting through October 2026 (Bloomberg, Reuters, FT, The Information, Epoch AI, TrendForce, Counterpoint, USGS). Many deal sizes are multi-year or contingent. Producer shares are rounded. Where reports conflicted, the more conservative figure is used. This is a map for understanding, not for investing or procurement.</p>
      <h3 style="margin:24px 0 8px">Ideas for what to add next</h3>
      <ul class="improve">
                <li>A timeline slider to watch the build-out from 2022 to 2028.</li>
        <li>Energy per answer: rough watt-hours from the prompt back to the power plant.</li>
        <li>Open the data as JSON so others can extend and correct it.</li>
        <li>Per-node “last verified” dates and a corrections form.</li>
      </ul>
      <h3 style="margin:24px 0 8px">Use the data</h3>
      <p>Everything on this site is open under the MIT licence. Download it as one JSON file with nodes, links, people, teardowns, specs, money and elements, or browse the source files in <code>js/data/</code> on GitHub.</p>
      <p><button class="btn primary" id="dlJson">Download atlas.json</button> <a class="btn" href="data/atlas.json">Open data/atlas.json</a></p>
      <h3 style="margin:24px 0 8px">Built with</h3><p>Plain HTML, CSS and JavaScript with D3.js. No build step, no tracking. Hosted on GitHub Pages.</p></div></section>${V.footer()}</div>`;
    document.getElementById("dlJson").onclick = () => {
      const data = AI.core.exportData();
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 1)], { type: "application/json" }));
      const a = document.createElement("a"); a.href = url; a.download = "atlas.json"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
    };
  };

  V.footer = () => `<footer class="foot">Atoms to Intelligence · status as of October 2026 · <a href="#/about">About & sources</a> · Companion to the <a href="https://hw6476ym.github.io/top100companies_supplychainFull/" target="_blank" rel="noopener">Global Supply Chain Explorer</a></footer>`;
})(window.AI);
