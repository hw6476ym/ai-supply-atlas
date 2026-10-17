/* Views, part 2: new home, spec sheet, compute tracker, company dossiers,
   chokepoint what-if, compute calculator, glossary. */
(function (AI) {
  const C = AI.core; const esc = C.esc; const V = AI.views;
  const fmt = (v, d) => (v == null ? "—" : (+v).toLocaleString("en-US", { maximumFractionDigits: d == null ? 1 : d }));

  /* ---------- shared: exposure score for chokepoints (how many AI companies sit upstream) */
  C.exposure = function (id) { return [...C.walk(id, "in")].filter((x) => AI.idx[x].tier === 1 && x !== id); };
  C.chokes = () => AI.N.filter(C.isChoke).map((d) => ({ d, exp: C.exposure(d.id) })).sort((a, b) => b.exp.length - a.exp.length || a.d.tier - b.d.tier);

  /* ================================================================ HOME */
  const TRACES = [
    { label: "ChatGPT", path: ["p_chatgpt", "s_abilene", "c_gb200", "m_hbm3e", "f_hynix_m15x", "f_asml", "f_cymer", "r_tin", "x_tin"], atom: "Sn", line: "Every HBM chip is patterned by EUV light made from exploding tin droplets." },
    { label: "Claude", path: ["p_claude", "s_google_tpu", "c_tpu7", "m_optics", "f_coherent", "r_inp", "x_onsan"], atom: "In", line: "TPU pods talk over lasers grown on indium phosphide, recovered from zinc smelting in Korea." },
    { label: "Gemini", path: ["p_gemini", "s_google_tpu", "c_tpu8", "m_n2die", "f_tsmc_n2", "f_shinetsu", "r_quartz", "x_spruce"], atom: "Si", line: "The silicon is grown in crucibles of quartz from a 3-mile strip of North Carolina." },
    { label: "Grok", path: ["p_grok", "s_colossus2", "c_gb300", "m_power_shelf", "f_vertiv", "r_gallium", "x_china_ga", "x_bauxite"], atom: "Ga", line: "Rack power runs through gallium-nitride switches; ~98% of gallium is refined in China." },
    { label: "Meta AI", path: ["p_metaai", "s_hyperion", "m_turbine", "f_gev", "r_superalloy", "x_nickel"], atom: "Re", line: "Hyperion's gas turbines spin on single-crystal blades alloyed with rhenium, rarer than gold." }
  ];

  V.home = function (main) {
    const nChoke = AI.N.filter(C.isChoke).length;
    const gwPlanned = AI.N.reduce((a, d) => a + (d.gw || 0), 0);
    const stats = [
      [AI.N.filter((d) => d.tier === 1).length, "AI companies traced"], [AI.N.length, "named entities"], [AI.L.length, "supply links"], [nChoke, "chokepoints"],
      [AI.people.length, "leaders"], [AI.teardowns.length, "teardowns"], [Math.round(gwPlanned) + " GW", "of compute sites tracked"], [AI.money.deals.length, "money flows"]
    ];
    const examples = {
      1: ["openai", "anthropic", "google", "nvidia"], 2: ["p_chatgpt", "p_claude", "p_gemini", "p_cursor"], 3: ["s_abilene", "s_rainier", "s_colossus1", "s_hyperion"],
      4: ["c_gb200", "c_vr", "c_tpu8", "c_trn3"], 5: ["m_hbm4", "m_cowos", "m_optics", "m_transformer"], 6: ["f_tsmc18", "f_asml", "f_hynix_m15x", "f_zeiss"],
      7: ["r_polysi", "r_hafnium", "r_helium", "r_gallium"], 8: ["x_spruce", "x_china_ga", "x_kolwezi", "e_crane"]
    };
    const scales = ["idea", "app", "~1 km", "~2 m", "~1 cm", "~1 km", "~1 µm", "~1 km", "~0.2 nm"];
    const strata = Object.entries(AI.tiers).map(([t, v]) => `
      <a class="stratum" href="#/map?tier=${t}" style="--c:${C.tierVar(t)}">
        <span class="s-scale">${scales[t - 1]}</span>
        <span class="s-name">Tier ${t} · ${esc(v.name)}<span class="s-hint">${esc(v.hint)}</span></span>
        <span class="s-ex">${examples[t].map((id) => `<b>${esc(AI.idx[id].label)}</b>`).join(", ")}…</span>
        <span class="s-n num">${AI.N.filter((d) => d.tier == t).length}</span>
      </a>`).join("");
    const chokes = C.chokes().slice(0, 6);
    main.innerHTML = `
    <section class="hero2">
      <div class="wrap">
        <p class="kicker">The AI supply chain, Oct 2026</p>
        <h1>Follow any AI product<br>down to the atom.</h1>
        <p class="lede">${AI.N.filter((d) => d.tier === 1).length} AI companies, every chip, fab, material and mine they depend on, the ${AI.people.length} people running each layer, and the money moving between them. Built for people who work in AI and want the whole stack on one screen.</p>
        <div class="trace" id="trace" aria-live="polite">
          <div class="trace-tabs" role="tablist" aria-label="Pick a product to trace">${TRACES.map((t, i) => `<button role="tab" data-i="${i}" aria-selected="${i === 0}">${esc(t.label)}</button>`).join("")}</div>
          <ol class="trace-row" id="traceRow"></ol>
          <p class="trace-line" id="traceLine"></p>
        </div>
        <div class="hero-cta">
          <a class="btn primary" href="#/map">Open the supply map</a>
          <a class="btn" href="#/specs">Accelerator spec sheet</a>
          <a class="btn" href="#/chokepoints">Run a what-if</a>
        </div>
      </div>
    </section>
    <div class="statbar"><div class="wrap statbar-in">${stats.map(([v, k]) => `<div><b class="num">${esc(String(v))}</b><span>${esc(k)}</span></div>`).join("")}</div></div>
    <div class="wrap">
      <section class="section" style="border-top:0">
        <div class="section-head"><h2>Tools for people who build AI</h2></div>
        <div class="tools">
          <a class="tool" href="#/specs"><span class="tool-ico">▦</span><h3>Accelerator spec sheet</h3><p>${AI.specs.accel.length} chips side by side: HBM, bandwidth, FP8/FP4, power, scale-up domain. Plus a bandwidth-vs-compute chart.</p></a>
          <a class="tool" href="#/compute"><span class="tool-ico">∑</span><h3>Compute calculator</h3><p>Params × tokens → FLOPs, GPU-days, megawatt-hours and dollars, on any chip in the sheet.</p></a>
          <a class="tool" href="#/chokepoints"><span class="tool-ico">🔒</span><h3>Chokepoints & what-if</h3><p>Knock out ASML, TSMC, HBM or gallium and see which labs and products lose supply.</p></a>
          <a class="tool" href="#/sites"><span class="tool-ico">⚡</span><h3>Compute site tracker</h3><p>Gigawatts planned and online at Stargate, Rainier, Colossus, Hyperion, Fairwater and more.</p></a>
          <a class="tool" href="#/models"><span class="tool-ico">◎</span><h3>Frontier models</h3><p>Who shipped what, open or closed, architecture and context, and where it was trained.</p></a>
          <a class="tool" href="#/roadmaps"><span class="tool-ico">→</span><h3>Roadmaps</h3><p>Nvidia's annual cadence, HBM generations and process nodes from N5 to A14.</p></a>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2>Nine layers, from idea to atom</h2><a href="#/map">See them all on the map</a></div>
        <div class="descent">${strata}
          <a class="stratum atoms" href="#/atoms">
            <span class="s-scale">${scales[8]}</span>
            <span class="s-name">Atoms<span class="s-hint">The elements it's all made of</span></span>
            <span class="s-ex"><b>Silicon</b>, <b>hafnium</b>, <b>copper</b>, <b>gallium</b>, <b>neodymium</b>…</span>
            <span class="s-n num">${Object.keys(AI.elementUse).length}</span>
          </a>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2>Where it could break</h2><a href="#/chokepoints">All ${nChoke} chokepoints</a></div>
        <div class="choke-grid">${chokes.map(({ d, exp }) => `<a class="choke-card" href="#/map?n=${d.id}"><span class="d-tier"><span class="sw" style="background:${C.tierVar(d.tier)}"></span>${esc(AI.tiers[d.tier].name)}</span><h3>${esc(d.label)}</h3><p>${esc((d.noAlt || d.desc || "").slice(0, 150))}${(d.noAlt || d.desc || "").length > 150 ? "…" : ""}</p><span class="exp"><b class="num">${exp.length}</b> AI companies exposed</span></a>`).join("")}</div>
      </section>

      <section class="section">
        <div class="section-head"><h2>Take something apart</h2><a href="#/teardowns">All ${AI.teardowns.length} teardowns</a></div>
        <div class="td-grid">${AI.teardowns.map(V.tdCard).slice(0, 8).join("")}</div>
      </section>

      <section class="section">
        <div class="section-head"><h2>The numbers that matter right now</h2><a href="#/money">All money flows</a></div>
        <div class="figures">${AI.money.headline.map(([k, v]) => `<div><b class="num">${esc(v)}</b><span>${esc(k)}</span></div>`).join("")}</div>
      </section>
      ${V.footer()}
    </div>`;
    startTrace();
  };

  let traceTimer = null;
  function startTrace() {
    const row = document.getElementById("traceRow"); if (!row) return;
    const tabs = C.$$("#trace [role=tab]");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0; let user = false;
    function show(k) {
      i = k; const t = TRACES[k]; const e = C.element(t.atom);
      tabs.forEach((b, j) => b.setAttribute("aria-selected", j === k));
      row.innerHTML = t.path.map((id, j) => { const d = AI.idx[id]; return `<li style="--c:${C.tierVar(d.tier)};--d:${j * 110}ms"><a href="#/map?n=${id}"><span class="t-tier">${esc(AI.tiers[d.tier].short)}</span><span class="t-dot"></span><span class="t-name">${esc(d.label)}</span></a></li>`; }).join("")
        + `<li class="t-atom" style="--d:${t.path.length * 110}ms"><a href="#/atoms?e=${t.atom}"><span class="t-tier">Atom</span><span class="t-sym">${t.atom}</span><span class="t-name">${esc(e.name)} · ${e.z}</span></a></li>`;
      row.classList.remove("play"); void row.offsetWidth; row.classList.add("play");
      document.getElementById("traceLine").textContent = t.line;
    }
    tabs.forEach((b) => (b.onclick = () => { user = true; show(+b.dataset.i); }));
    show(0);
    clearInterval(traceTimer);
    if (!reduce) traceTimer = setInterval(() => { if (!document.getElementById("traceRow")) return clearInterval(traceTimer); if (!user) show((i + 1) % TRACES.length); }, 7000);
  }

  /* ================================================================ SPECS */
  V.specs = function (main, params) {
    const A = AI.specs.accel;
    const cols = [["name", "Chip"], ["maker", "Maker"], ["year", "Year"], ["node", "Process"], ["xtors", "Transistors (B)"], ["mem", "Memory"], ["hbm", "Capacity (GB)"], ["bw", "Bandwidth (TB/s)"], ["fp8", "FP8 (PF)"], ["fp4", "FP4 (PF)"], ["tdp", "Power (W)"], ["link", "Scale-up link"], ["scaleUp", "Scale-up domain"]];
    let sortK = params.sort || "year", dir = params.dir === "asc" ? 1 : -1, maker = params.maker || "";
    main.innerHTML = `<div class="wrap"><section class="hero"><p class="kicker">Reference</p><h1>Accelerator spec sheet</h1>
      <p class="lede">Every AI chip that matters, on the numbers that decide what you can train and serve. Peak vendor figures, dense unless noted. Click a column to sort; click a chip to see where it sits in the supply chain.</p></section>
      <div class="filters"><div class="seg" role="group" aria-label="Filter by maker">${["", ...new Set(A.map((a) => a.maker))].map((m) => `<button data-m="${esc(m)}" aria-pressed="${m === maker}">${m || "All makers"}</button>`).join("")}</div></div>
      <div class="table-wrap"><table class="spec" id="specT"><thead><tr>${cols.map(([k, l]) => `<th data-k="${k}" tabindex="0" aria-sort="none">${esc(l)}</th>`).join("")}</tr></thead><tbody></tbody></table></div>
      <p class="asof" style="margin-top:10px">Planned parts are marked. “—” means the vendor hasn't published it. FP8 for Rubin isn't disclosed; Ironwood FP4 isn't supported natively.</p>
      <section class="section two-col">
        <div class="chart-card"><h3>Memory bandwidth vs low-precision compute</h3><p class="muted" style="font-size:.88rem">Decode speed tracks bandwidth (y); training and prefill track compute (x). Bubble size = HBM capacity. FP4 used where FP8 isn't published.</p><svg class="chart" id="bwChart" viewBox="0 0 560 360" role="img" aria-label="Scatter of bandwidth vs compute"></svg></div>
        <div class="chart-card"><h3>Memory per chip, by generation</h3><p class="muted" style="font-size:.88rem">GB of on-package memory. Capacity sets the largest model and KV cache one chip can hold.</p><svg class="chart" id="memChart" viewBox="0 0 560 360" role="img" aria-label="Bar chart of memory per chip"></svg></div>
      </section>
      <section class="section"><h3>Sources</h3><ul class="src-list">${AI.specs.sources.map(([n, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a></li>`).join("")}</ul></section>
      ${V.footer()}</div>`;
    const tb = C.$("#specT tbody");
    function cell(a, k) {
      let v = a[k];
      if (k === "name") return `<b>${esc(v)}</b>${a.planned ? ' <span class="kind-tag">planned</span>' : ""}<div class="muted" style="font-size:.8rem;max-width:30ch">${esc(a.note)}</div>`;
      if (k === "fp8" && v == null && a.fp16) return `<span class="muted">${fmt(a.fp16)} FP16${a.fp16note ? " " + esc(a.fp16note) : ""}</span>`;
      if (k === "year") return `<span class="num">${v}</span>`;
      if (typeof v === "number") return `<span class="num">${fmt(v, 2)}</span>${a[k + "note"] ? `<div class="muted" style="font-size:.76rem">${esc(a[k + "note"])}</div>` : ""}`;
      return esc(v == null ? "—" : v);
    }
    function draw() {
      const rows = A.filter((a) => !maker || a.maker === maker).slice().sort((a, b) => {
        const x = a[sortK], y = b[sortK];
        if (x == null && y == null) return 0; if (x == null) return 1; if (y == null) return -1;
        return (typeof x === "number" ? x - y : String(x).localeCompare(String(y))) * dir;
      });
      tb.innerHTML = rows.map((a) => `<tr ${a.graph ? `data-g="${a.graph}" tabindex="0"` : ""}>${cols.map(([k]) => `<td>${cell(a, k)}</td>`).join("")}</tr>`).join("");
      C.$$("#specT th").forEach((th) => th.setAttribute("aria-sort", th.dataset.k === sortK ? (dir > 0 ? "ascending" : "descending") : "none"));
      C.$$("#specT tr[data-g]").forEach((tr) => { tr.onclick = () => (location.hash = "#/map?n=" + tr.dataset.g); tr.onkeydown = (e) => { if (e.key === "Enter") tr.onclick(); }; });
    }
    C.$$("#specT th").forEach((th) => { th.onclick = () => { if (sortK === th.dataset.k) dir = -dir; else { sortK = th.dataset.k; dir = -1; } draw(); AI.app.setParams({ sort: sortK, dir: dir > 0 ? "asc" : null }); }; th.onkeydown = (e) => { if (e.key === "Enter") th.onclick(); }; });
    C.$$(".seg button", main).forEach((b) => (b.onclick = () => { maker = b.dataset.m; C.$$(".seg button", main).forEach((x) => x.setAttribute("aria-pressed", x === b)); draw(); AI.app.setParams({ maker: maker || null }); }));
    draw();

    // scatter: x = best low-precision PF (fp8 else fp4/2 shown as fp4), y = bandwidth
    const pts = A.filter((a) => a.bw && a.bw < 1000 && (a.fp8 || a.fp4)).map((a) => ({ a, x: a.fp8 || a.fp4, isFp4: !a.fp8, y: a.bw, r: a.hbm || 50 }));
    const W = 560, H = 360, m = { l: 48, r: 20, t: 16, b: 40 };
    const svg = d3.select("#bwChart");
    const x = d3.scaleLog().domain([0.8, 60]).range([m.l, W - m.r]); const y = d3.scaleLinear().domain([0, 24]).range([H - m.b, m.t]);
    const rs = d3.scaleSqrt().domain([0, 450]).range([3, 20]);
    svg.append("g").attr("class", "grid").attr("transform", `translate(0,${H - m.b})`).call(d3.axisBottom(x).tickValues([1, 2, 5, 10, 20, 50]).tickFormat((v) => v + " PF").tickSize(-(H - m.t - m.b))).call((g) => g.select(".domain").remove());
    svg.append("g").attr("class", "grid").attr("transform", `translate(${m.l},0)`).call(d3.axisLeft(y).ticks(6).tickFormat((v) => v + " TB/s").tickSize(-(W - m.l - m.r))).call((g) => g.select(".domain").remove());
    const mk = { Nvidia: "var(--t5)", AMD: "var(--t1)", Google: "var(--t7)", AWS: "var(--t3)", Microsoft: "var(--t6)", Huawei: "var(--t2)", Cerebras: "var(--t8)" };
    const gp = svg.append("g").selectAll("g").data(pts).join("g").attr("transform", (p) => `translate(${x(p.x)},${y(p.y)})`);
    gp.append("circle").attr("r", (p) => rs(p.r)).style("fill", (p) => mk[p.a.maker] || "var(--muted)").style("fill-opacity", 0.35).style("stroke", (p) => mk[p.a.maker] || "var(--muted)").style("stroke-width", 1.5).style("stroke-dasharray", (p) => (p.isFp4 ? "3 2" : null));
    gp.append("text").attr("x", (p) => rs(p.r) + 4).attr("dy", "0.35em").style("fill", "var(--text)").style("font-size", "11px").text((p) => p.a.name.replace(" (in GB200)", "").replace(" (VR200)", "").replace(" (Helios)", "").replace(" Blackwell Ultra", "").replace(" (planned)", "*"));
    gp.append("title").text((p) => `${p.a.name}: ${p.y} TB/s, ${p.x} PF ${p.isFp4 ? "FP4" : "FP8"}, ${p.a.hbm} GB`);
    svg.append("text").attr("x", W - m.r).attr("y", H - 6).attr("text-anchor", "end").text("Peak FP8 (dashed = FP4) →");

    // memory bars
    const mem = A.filter((a) => a.hbm && a.hbm < 2000 && !a.mem.includes("SRAM") || a.id === "maia200").filter((a) => a.hbm).sort((a, b) => a.year - b.year || a.hbm - b.hbm);
    const s2 = d3.select("#memChart"); const m2 = { l: 130, r: 50, t: 8, b: 24 };
    const xb = d3.scaleLinear().domain([0, d3.max(mem, (a) => a.hbm)]).range([m2.l, W - m2.r]); const yb = d3.scaleBand().domain(mem.map((a) => a.name)).range([m2.t, H - m2.b]).padding(0.2);
    s2.selectAll("rect").data(mem).join("rect").attr("x", m2.l).attr("y", (a) => yb(a.name)).attr("height", yb.bandwidth()).attr("width", (a) => xb(a.hbm) - m2.l).attr("rx", 2).style("fill", (a) => mk[a.maker] || "var(--muted)").style("opacity", (a) => (a.planned ? 0.45 : 0.9));
    s2.selectAll("text.l").data(mem).join("text").attr("x", m2.l - 6).attr("y", (a) => yb(a.name) + yb.bandwidth() / 2).attr("dy", "0.35em").attr("text-anchor", "end").style("font-size", "10.5px").text((a) => a.name.replace(" (in GB200)", "").replace(" Blackwell Ultra", ""));
    s2.selectAll("text.v").data(mem).join("text").attr("x", (a) => xb(a.hbm) + 4).attr("y", (a) => yb(a.name) + yb.bandwidth() / 2).attr("dy", "0.35em").style("font-size", "10.5px").style("fill", "var(--text)").text((a) => a.hbm + " GB");
  };

  /* ================================================================ MODELS & ROADMAPS & GLOSSARY */
  V.models = function (main) {
    main.innerHTML = `<div class="wrap"><section class="hero"><p class="kicker">Reference</p><h1>Frontier models</h1>
      <p class="lede">The model families that matter in October 2026: who built them, whether the weights are open, what's known about the architecture, and where they run. Labs disclose less every year, so many cells are blank on purpose.</p></section>
      <div class="filters"><div class="seg" role="group" aria-label="Filter"><button data-o="" aria-pressed="true">All</button><button data-o="closed" aria-pressed="false">Closed</button><button data-o="open" aria-pressed="false">Open weights</button></div></div>
      <div class="table-wrap"><table class="spec"><thead><tr><th>Model</th><th>Lab</th><th>Released</th><th>Weights</th><th>Architecture</th><th>Context</th><th>Runs on</th></tr></thead><tbody id="mRows"></tbody></table></div>
      <p class="asof" style="margin-top:10px">Release dates are year-month. Architecture details only where the lab or credible reporting disclosed them.</p>
      ${V.footer()}</div>`;
    let o = "";
    function draw() {
      document.getElementById("mRows").innerHTML = AI.specs.models.filter((m) => !o || (o === "open") === m.open).map((m) => {
        const runs = m.graph ? [...C.adj[m.graph].out].map((x) => AI.idx[x]).filter((d) => d.tier === 3).slice(0, 3) : [];
        return `<tr ${m.graph ? `data-g="${m.graph}" tabindex="0"` : ""}><td><b>${esc(m.name)}</b><div class="muted" style="font-size:.8rem;max-width:36ch">${esc(m.note)}</div></td><td>${esc(m.lab)}</td><td class="num">${esc(m.date)}</td><td>${m.open ? '<span class="chip ok-chip">Open</span>' : '<span class="chip">Closed</span>'}</td><td>${esc(m.arch)}</td><td class="num">${esc(m.ctx)}</td><td>${runs.map((d) => esc(d.label)).join(", ") || "—"}</td></tr>`;
      }).join("");
      C.$$("#mRows tr[data-g]").forEach((tr) => (tr.onclick = () => (location.hash = "#/map?n=" + tr.dataset.g)));
    }
    C.$$(".seg button", main).forEach((b) => (b.onclick = () => { o = b.dataset.o; C.$$(".seg button", main).forEach((x) => x.setAttribute("aria-pressed", x === b)); draw(); }));
    draw();
  };

  V.roadmaps = function (main) {
    const R = AI.specs.roadmaps;
    main.innerHTML = `<div class="wrap"><section class="hero"><p class="kicker">Reference</p><h1>Roadmaps</h1>
      <p class="lede">The three clocks the whole industry runs on: Nvidia's one-architecture-a-year cadence, the HBM generation, and the transistor node.</p></section>
      <section class="section" style="border-top:0"><h2 style="margin-bottom:16px">Nvidia data-center GPUs</h2>
        <ol class="timeline">${R.nvidia.map(([y, n, d]) => `<li class="${y > 2026 ? "future" : y === 2026 ? "now" : ""}"><span class="ty num">${y}</span><b>${esc(n)}</b><span class="muted">${esc(d)}</span></li>`).join("")}</ol></section>
      <section class="section"><h2 style="margin-bottom:16px">HBM generations</h2>
        <div class="table-wrap"><table class="spec"><thead><tr><th>Generation</th><th>Volume year</th><th>Pin speed (Gb/s)</th><th>Per stack (TB/s)</th><th>Max per stack (GB)</th><th>Dies high</th><th>Used in</th></tr></thead>
        <tbody>${R.hbm.map((h) => `<tr><td><b>${h.gen}</b>${h.note ? `<div class="muted" style="font-size:.8rem">${esc(h.note)}</div>` : ""}</td><td class="num">${h.year}</td><td class="num">${h.pin}</td><td class="num">${h.stackBw}</td><td class="num">${h.cap}</td><td class="num">${h.hi}</td><td>${esc(h.used)}</td></tr>`).join("")}</tbody></table></div></section>
      <section class="section"><h2 style="margin-bottom:16px">Process nodes</h2>
        <div class="table-wrap"><table class="spec"><thead><tr><th>Node</th><th>Volume year</th><th>Transistor</th><th>AI chips on it</th></tr></thead>
        <tbody>${R.process.map((p) => `<tr><td><b>${esc(p.node)}</b></td><td class="num">${p.year}</td><td>${esc(p.device)}</td><td>${esc(p.ai)}</td></tr>`).join("")}</tbody></table></div></section>
      ${V.footer()}</div>`;
  };

  V.glossary = function (main) {
    main.innerHTML = `<div class="wrap"><section class="hero"><p class="kicker">Reference</p><h1>Glossary</h1>
      <p class="lede">${AI.specs.glossary.length} terms you'll meet across this atlas, from KV cache to backside power.</p></section>
      <div class="filters"><input type="search" id="gq" placeholder="Filter terms" aria-label="Filter glossary"></div>
      <dl class="gloss" id="gl"></dl>${V.footer()}</div>`;
    const draw = (q) => (document.getElementById("gl").innerHTML = AI.specs.glossary.filter(([t, d]) => !q || (t + d).toLowerCase().includes(q)).map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join("") || `<div class="empty">No term matches.</div>`);
    document.getElementById("gq").oninput = (e) => draw(e.target.value.toLowerCase().trim());
    draw("");
  };

  /* ================================================================ SITES */
  V.sites = function (main) {
    const sites = AI.N.filter((d) => d.gw).sort((a, b) => b.gw - a.gw);
    const tot = sites.reduce((a, d) => a + d.gw, 0), on = sites.reduce((a, d) => a + d.gwOn, 0);
    main.innerHTML = `<div class="wrap"><section class="hero"><p class="kicker">Tracker</p><h1>Compute sites</h1>
      <p class="lede">${sites.length} of the largest AI campuses, by planned power. A gigawatt runs roughly 500,000–700,000 Blackwell-class GPUs including cooling and networking.</p></section>
      <div class="figures"><div><b class="num">${fmt(tot)} GW</b><span>planned across these sites</span></div><div><b class="num">~${fmt(on)} GW</b><span>estimated online, Oct 2026</span></div><div><b class="num">${fmt(tot * 0.9 * 8.76, 0)} TWh/yr</b><span>if all ran at 90% load (≈ ${fmt((tot * 0.9 * 8.76) / 4200 * 100, 0)}% of US electricity use)</span></div></div>
      <div class="site-list">${sites.map((d) => {
        const chips = [...C.adj[d.id].out].map((x) => AI.idx[x]).filter((x) => x.tier === 4);
        const users = [...C.adj[d.id].in].map((x) => AI.idx[x]).filter((x) => x.tier <= 2);
        return `<a class="site-row" href="#/map?n=${d.id}">
          <div class="sr-name"><b>${esc(d.label)}</b><span class="muted">${esc(d.loc || "")}</span><span class="muted" style="font-size:.82rem">${esc(d.owner || "")}</span></div>
          <div class="sr-bar" aria-label="${d.gw} GW planned, ${d.gwOn} GW online"><i class="plan" style="width:${(d.gw / sites[0].gw) * 100}%"></i><i class="on" style="width:${(d.gwOn / sites[0].gw) * 100}%"></i><span class="num">${fmt(d.gwOn)} / ${fmt(d.gw)} GW</span></div>
          <div class="sr-meta"><span>${chips.map((c) => esc(c.label.replace("Nvidia ", ""))).join(", ")}</span><span class="muted">${users.map((u) => esc(u.label)).slice(0, 4).join(", ")}</span></div>
        </a>`; }).join("")}</div>
      <p class="asof" style="margin-top:12px">Planned figures from company and press reports; “online” is an estimate from public reporting and satellite-based trackers (e.g. Epoch AI). Treat as ±30%.</p>
      ${V.footer()}</div>`;
  };

  /* ================================================================ COMPANY DOSSIER */
  V.company = function (main, id) {
    const d = AI.idx[id];
    if (!d || d.tier !== 1) { V.companies(main); return; }
    const down = C.walk(id, "out");
    const byTier = (t) => [...down].map((x) => AI.idx[x]).filter((x) => x.tier === t && x.id !== id);
    const chokes = [...down].map((x) => AI.idx[x]).filter(C.isChoke);
    const ppl = C.peopleFor(id);
    const deals = AI.money.deals.filter((m) => [m.from, m.to].some((s) => s.toLowerCase().includes(d.label.split(/[ (/]/)[0].toLowerCase())));
    const accel = AI.specs.accel.filter((a) => down.has(a.graph));
    const els = new Set(); down.forEach((x) => C.elementsInNode(x).forEach((s) => els.add(s)));
    const sec = (t, title) => { const arr = byTier(t); return arr.length ? `<div class="dos-col"><h4><span class="sw" style="background:${C.tierVar(t)}"></span>${title} <span class="muted">${arr.length}</span></h4><div class="chips">${arr.map((x) => C.nodeChip(x.id)).join("")}</div></div>` : ""; };
    main.innerHTML = `<div class="wrap">
      <section class="hero"><a href="#/companies" class="muted" style="text-decoration:none">← All companies</a>
        <p class="kicker" style="margin-top:14px">${esc(AI.sectors[d.sector] ? AI.sectors[d.sector].name : "AI company")} · ${esc(d.hq || "")}</p>
        <h1>${esc(d.label)}</h1><p class="lede">${esc(d.desc)}</p>
        ${d.cap ? `<p class="chip" style="margin-top:6px">${esc(d.cap)}</p>` : ""}
        <div class="hero-cta"><a class="btn primary" href="#/map?co=${id}">See its full chain on the map</a><button class="btn" id="copyC">Copy link</button></div></section>
      <div class="figures"><div><b class="num">${down.size - 1}</b><span>things it depends on</span></div><div><b class="num">${byTier(3).length}</b><span>compute sites</span></div><div><b class="num">${byTier(4).length}</b><span>chip & system types</span></div><div><b class="num">${chokes.length}</b><span>chokepoints in its chain</span></div><div><b class="num">${els.size}</b><span>elements</span></div></div>
      <section class="section dossier">${sec(2, "Products")}${sec(3, "Compute sites")}${sec(4, "Chips & systems")}${sec(5, "Components")}${sec(6, "Fabs, plants & tools")}${sec(7, "Materials")}${sec(8, "Sources & power")}</section>
      ${accel.length ? `<section class="section"><h2 style="margin-bottom:14px">Chips it runs on</h2><div class="table-wrap"><table class="spec"><thead><tr><th>Chip</th><th>HBM (GB)</th><th>TB/s</th><th>FP8 PF</th><th>FP4 PF</th><th>Scale-up</th></tr></thead><tbody>${accel.map((a) => `<tr><td><b>${esc(a.name)}</b></td><td class="num">${fmt(a.hbm)}</td><td class="num">${fmt(a.bw)}</td><td class="num">${fmt(a.fp8)}</td><td class="num">${fmt(a.fp4)}</td><td class="num">${fmt(a.scaleUp, 0)}</td></tr>`).join("")}</tbody></table></div></section>` : ""}
      ${chokes.length ? `<section class="section"><h2 style="margin-bottom:14px">Chokepoints it can't avoid</h2><div class="chips">${chokes.map((x) => C.nodeChip(x.id)).join("")}</div></section>` : ""}
      <section class="section two-col">
        <div><h2 style="margin-bottom:14px">Leadership</h2>${ppl.map(C.personMini).join("") || '<p class="muted">Not listed yet.</p>'}</div>
        <div><h2 style="margin-bottom:14px">Money</h2>${deals.length ? `<ul class="deal-mini">${deals.map((m) => `<li><span class="muted num">${esc(m.date)}</span> <b>${esc(m.from)} → ${esc(m.to)}</b> <span class="num">${esc(m.amt)}</span><br><span class="muted">${esc(m.what)}</span></li>`).join("")}</ul>` : '<p class="muted">No major deals listed.</p>'}</div>
      </section>
      <section class="section"><h2 style="margin-bottom:14px">Atoms in its chain</h2><div class="chips">${[...els].sort().map((s) => `<a class="chip" href="#/atoms?e=${s}"><b>${s}</b> ${esc(C.element(s).name)}</a>`).join("")}</div></section>
      ${V.footer()}</div>`;
    document.getElementById("copyC").onclick = C.copyLink;
  };

  V.companies = function (main) {
    const groups = {}; AI.N.filter((d) => d.tier === 1).forEach((d) => (groups[d.sector] = groups[d.sector] || []).push(d));
    main.innerHTML = `<div class="wrap"><section class="hero"><p class="kicker">Dossiers</p><h1>AI companies</h1><p class="lede">One page per company: everything it depends on from product to mine, its chokepoints, chips, leaders, deals and atoms.</p></section>
      ${Object.entries(groups).map(([s, arr]) => `<section class="section" style="padding:24px 0"><h3 style="margin-bottom:12px">${esc(AI.sectors[s].name)}</h3><div class="co-grid">${arr.map((d) => { const n = C.walk(d.id, "out").size - 1; const ch = [...C.walk(d.id, "out")].filter((x) => C.isChoke(AI.idx[x])).length; return `<a class="co-card" href="#/company/${d.id}"><b>${esc(d.label)}</b><span class="muted">${esc(d.hq || "")}</span><span class="co-stat"><span class="num">${n}</span> dependencies · <span class="num risk-text">${ch}</span> 🔒</span></a>`; }).join("")}</div></section>`).join("")}
      ${V.footer()}</div>`;
  };

  /* ================================================================ CHOKEPOINTS + WHAT-IF */
  V.chokepoints = function (main, params) {
    const list = C.chokes();
    let removed = new Set((params.x || "").split(",").filter((x) => AI.idx[x]));
    const pickable = AI.N.filter((d) => d.tier >= 4).sort((a, b) => a.tier - b.tier || a.label.localeCompare(b.label));
    main.innerHTML = `<div class="wrap"><section class="hero"><p class="kicker">Risk</p><h1>Chokepoints & what&#8209;if</h1>
      <p class="lede">Places in the stack with one or two suppliers on Earth. Pick any of them (or anything else) to knock out, and see which AI companies and products sit downstream.</p></section>
      <section class="whatif">
        <div class="wi-controls">
          <label for="wiPick"><b>Knock out</b></label>
          <select id="wiPick"><option value="">Add a fab, chip, material or mine…</option>${[4, 5, 6, 7, 8].map((t) => `<optgroup label="${esc(AI.tiers[t].name)}">${pickable.filter((d) => d.tier === t).map((d) => `<option value="${d.id}">${esc(d.label)}${C.isChoke(d) ? " 🔒" : ""}</option>`).join("")}</optgroup>`).join("")}</select>
          <div class="wi-presets"><span class="muted">Scenarios:</span>
            <button data-p="f_tsmc18,f_tsmc_n2,f_tsmc_ap">Taiwan fabs offline</button>
            <button data-p="x_china_ga,x_yunnan_ge,x_bayan,x_china_w">China mineral export ban</button>
            <button data-p="m_hbm3e,m_hbm4">No HBM</button>
            <button data-p="f_asml">No new EUV tools</button>
            <button data-p="m_transformer,m_turbine">Grid gear shortage</button></div>
          <div class="chips" id="wiSel"></div>
        </div>
        <div class="wi-result" id="wiOut" aria-live="polite"></div>
      </section>
      <section class="section"><div class="section-head"><h2>All chokepoints, ranked by exposure</h2></div>
        <div class="choke-list">${list.map(({ d, exp }) => `
          <article class="cl-row" id="ck-${d.id}">
            <div class="cl-score"><b class="num">${exp.length}</b><span>companies exposed</span></div>
            <div><span class="d-tier"><span class="sw" style="background:${C.tierVar(d.tier)}"></span>${esc(AI.tiers[d.tier].name)}${d.loc ? " · " + esc(d.loc) : ""}</span>
              <h3><a href="#/map?n=${d.id}">${esc(d.label)}</a></h3>
              <p>${esc(d.noAlt || d.desc || "")}</p>
              ${d.workaround ? `<p class="muted"><b>Workaround:</b> ${esc(d.workaround)}</p>` : ""}
              <button class="btn" data-ko="${d.id}">Knock this out</button></div>
          </article>`).join("")}</div></section>
      ${V.footer()}</div>`;
    function compute() {
      const sel = document.getElementById("wiSel");
      sel.innerHTML = [...removed].map((x) => `<button class="chip risk" data-rm="${x}" aria-label="Remove ${esc(AI.idx[x].label)}">${esc(AI.idx[x].label)} ✕</button>`).join("");
      C.$$("[data-rm]", sel).forEach((b) => (b.onclick = () => { removed.delete(b.dataset.rm); compute(); }));
      AI.app.setParams({ x: removed.size ? [...removed].join(",") : null });
      const out = document.getElementById("wiOut");
      if (!removed.size) { out.innerHTML = `<div class="empty">Pick something to knock out, or start with a scenario.</div>`; return; }
      const hit = new Set(); removed.forEach((r) => C.walk(r, "in").forEach((x) => hit.add(x)));
      removed.forEach((r) => hit.delete(r));
      // a node is fully cut off if every one of its direct dependencies at the next tier down is hit or removed (only for chips & components)
      const cut = new Set();
      // Cut-off model: a component (tier 5) is lost when ALL of its factories are gone (they are alternative suppliers);
      // a chip or system (tier 4) is lost when ANY component it needs is lost, or all of its own fabs are gone.
      const gone = (x) => removed.has(x) || cut.has(x);
      const ODM = ["f_foxconn", "f_quanta"];
      for (let pass = 0; pass < 3; pass++) {
        [...hit].map((x) => AI.idx[x]).filter((d) => d.tier === 5 || d.tier === 4).sort((a, b) => b.tier - a.tier).forEach((d) => {
          if (cut.has(d.id)) return;
          const out = [...C.adj[d.id].out].map((x) => AI.idx[x]);
          const t5 = out.filter((x) => x.tier === 5), t6 = out.filter((x) => x.tier === 6 && !ODM.includes(x.id));
          const lost = d.tier === 5 ? (t6.length && t6.every((x) => gone(x.id))) || t5.some((x) => gone(x.id)) : t5.some((x) => gone(x.id)) || (t6.length && t6.every((x) => gone(x.id)));
          if (lost) cut.add(d.id);
        });
      }
      // sites lose all their accelerators → dark; products whose every site is dark → can't be served
      [3, 2].forEach((t) => [...hit].map((x) => AI.idx[x]).filter((d) => d.tier === t).forEach((d) => {
        const deps = [...C.adj[d.id].out].map((x) => AI.idx[x]).filter((x) => x.tier === t + 1 && !(t === 3 && ["c_spectrumx", "c_tomahawk", "c_nvswitch", "c_retimer", "c_vera"].includes(x.id)));
        if (deps.length && deps.every((x) => gone(x.id))) cut.add(d.id);
      }));
      const cos = [...hit].map((x) => AI.idx[x]).filter((d) => d.tier === 1);
      const prods = [...hit].map((x) => AI.idx[x]).filter((d) => d.tier === 2);
      const sites = [...hit].map((x) => AI.idx[x]).filter((d) => d.tier === 3);
      const chips = [...hit].map((x) => AI.idx[x]).filter((d) => d.tier === 4);
      const gwHit = sites.reduce((a, d) => a + (d.gw || 0), 0);
      out.innerHTML = `
        <div class="figures"><div><b class="num">${cos.length}</b><span>of ${AI.N.filter((d) => d.tier === 1).length} AI companies exposed</span></div><div><b class="num">${prods.length}</b><span>products exposed</span></div><div><b class="num">${chips.length}</b><span>chip & system types exposed</span></div><div><b class="num">${fmt(gwHit)} GW</b><span>of tracked sites exposed</span></div></div>
        ${cut.size ? `<p style="margin-top:14px"><b class="risk-text">Can't be built</b> (a required part has no supplier left): ${[...cut].map((x) => esc(AI.idx[x].label)).join(", ")}.</p>` : `<p class="muted" style="margin-top:14px">Nothing is fully cut off: every exposed item still has at least one other supplier in this map. Expect shortages and price spikes rather than a full stop.</p>`}
        <h4 style="margin:16px 0 8px">AI companies downstream</h4><div class="chips">${cos.map((d) => `<a class="chip" href="#/company/${d.id}">${esc(d.label)}</a>`).join("") || '<span class="muted">None</span>'}</div>
        <h4 style="margin:16px 0 8px">Products downstream</h4><div class="chips">${prods.map((d) => C.nodeChip(d.id)).join("") || '<span class="muted">None</span>'}</div>
        <p class="asof" style="margin-top:14px">Exposure means the item depends on the knocked-out node somewhere in its chain. Stockpiles, inventory and substitution speed are not modelled.</p>`;
    }
    document.getElementById("wiPick").onchange = (e) => { if (e.target.value) { removed.add(e.target.value); e.target.value = ""; compute(); } };
    C.$$("[data-p]", main).forEach((b) => (b.onclick = () => { removed = new Set(b.dataset.p.split(",")); compute(); document.querySelector(".whatif").scrollIntoView({ behavior: "smooth", block: "start" }); }));
    C.$$("[data-ko]", main).forEach((b) => (b.onclick = () => { removed.add(b.dataset.ko); compute(); document.querySelector(".whatif").scrollIntoView({ behavior: "smooth", block: "start" }); }));
    compute();
  };

  /* ================================================================ COMPUTE CALCULATOR */
  V.compute = function (main) {
    const chips = AI.specs.accel.filter((a) => a.fp8 || a.fp4);
    main.innerHTML = `<div class="wrap"><section class="hero"><p class="kicker">Calculator</p><h1>What would it take to train it?</h1>
      <p class="lede">Back-of-envelope compute for a dense-equivalent transformer: FLOPs ≈ 6 × parameters × tokens. Pick a chip from the spec sheet and see time, energy and cost. For mixture-of-experts models, use active parameters.</p></section>
      <div class="calc">
        <form class="calc-in" id="calcF" onsubmit="return false">
          <label for="cp">Active parameters (billions)</label><input id="cp" type="number" min="0.1" step="any" value="70">
          <label for="ct">Training tokens (trillions)</label><input id="ct" type="number" min="0.01" step="any" value="15">
          <label for="cc">Chip</label><select id="cc">${chips.map((a) => `<option value="${a.id}" ${a.id === "b200" ? "selected" : ""}>${esc(a.name)} (${a.fp8 ? a.fp8 + " PF FP8" : a.fp4 + " PF FP4"})</option>`).join("")}</select>
          <label for="cn">Number of chips</label><input id="cn" type="number" min="1" step="1" value="16384">
          <label for="cm">MFU (share of peak achieved)</label><input id="cm" type="number" min="1" max="100" step="1" value="40"><span class="unit">%</span>
          <label for="cw">All-in power per chip (kW, incl. CPU, network, cooling)</label><input id="cw" type="number" min="0.1" step="any" value="1.9">
          <label for="cd">Price per chip-hour (USD)</label><input id="cd" type="number" min="0" step="any" value="4">
          <div class="calc-presets"><span class="muted">Presets:</span><button type="button" data-pre="8,15">Llama-3-8B-like</button><button type="button" data-pre="70,15">70B on 15T</button><button type="button" data-pre="405,15.6">405B dense</button><button type="button" data-pre="37,15">MoE, 37B active</button></div>
        </form>
        <div class="calc-out" id="calcO" aria-live="polite"></div>
      </div>
      <section class="section"><h3>How this is calculated</h3><ul class="improve">
        <li>Training FLOPs = 6 × N × D (Kaplan et al. 2020). Ignores attention FLOPs, which matter at very long context.</li>
        <li>Time = FLOPs ÷ (chips × peak FLOP/s × MFU). Peak uses FP8 where published, otherwise FP4; real runs often train in BF16 (half the FP8 rate).</li>
        <li>Chinchilla-optimal tokens ≈ 20 × parameters (Hoffmann et al. 2022). Frontier models are trained far past this to make inference cheaper.</li>
        <li>Energy = chips × kW × hours. A 1.9 kW all-in figure per Blackwell GPU is typical for an NVL72 hall at PUE ~1.2.</li>
      </ul></section>${V.footer()}</div>`;
    const $ = (id) => document.getElementById(id);
    function calc() {
      const N = +$("cp").value * 1e9, D = +$("ct").value * 1e12, a = chips.find((x) => x.id === $("cc").value), n = +$("cn").value, mfu = +$("cm").value / 100, kw = +$("cw").value, usd = +$("cd").value;
      const peak = (a.fp8 || a.fp4) * 1e15; const F = 6 * N * D;
      const sec = F / (n * peak * Math.max(mfu, 0.01)); const hrs = sec / 3600; const days = hrs / 24;
      const mwh = (n * kw * hrs) / 1000; const cost = n * hrs * usd; const chin = 20 * N;
      const homes = mwh / 10.5; // avg US home ~10.5 MWh/yr
      $("calcO").innerHTML = `
        <div class="big-out"><span>Training compute</span><b class="num">${(() => { const [m, e] = F.toExponential(2).split("e+"); return m + " × 10" + C.sup(+e); })()} FLOP</b></div>
        <div class="figures">
          <div><b class="num">${days < 1 ? fmt(hrs, 1) + " h" : fmt(days, 1) + " days"}</b><span>wall-clock on ${n.toLocaleString()} × ${esc(a.name)}</span></div>
          <div><b class="num">${fmt(n * hrs, 0)}</b><span>chip-hours</span></div>
          <div><b class="num">${mwh >= 1000 ? fmt(mwh / 1000, 1) + " GWh" : fmt(mwh, 0) + " MWh"}</b><span>energy ≈ ${fmt(homes, 0)} US homes for a year</span></div>
          <div><b class="num">$${cost >= 1e9 ? fmt(cost / 1e9, 2) + "B" : cost >= 1e6 ? fmt(cost / 1e6, 1) + "M" : fmt(cost, 0)}</b><span>at $${usd}/chip-hour</span></div>
          <div><b class="num">${fmt(n * kw / 1000, 1)} MW</b><span>power draw while running</span></div>
          <div><b class="num">${fmt(D / chin, 1)}×</b><span>Chinchilla-optimal tokens (${fmt(chin / 1e12, 2)}T)</span></div>
        </div>
        <p class="muted" style="margin-top:12px">Fits in memory? Weights alone at 2 bytes/param need ${fmt(N * 2 / 1e9, 0)} GB; with optimizer state (~16 bytes/param for mixed-precision Adam) ~${fmt(N * 16 / 1e12, 2)} TB, i.e. at least ${fmt(Math.ceil(N * 16 / (a.hbm * 1e9)), 0)} × ${esc(a.name)} before activations.</p>`;
    }
    C.$$("#calcF input, #calcF select").forEach((el) => (el.oninput = calc));
    C.$$("[data-pre]").forEach((b) => (b.onclick = () => { const [p, t] = b.dataset.pre.split(","); $("cp").value = p; $("ct").value = t; calc(); }));
    calc();
  };
})(window.AI);
