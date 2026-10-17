/* SUPPLY MAP — a tiered graph: companies on the left, mines and power plants on the right. */
(function (AI) {
  const C = AI.core; const esc = C.esc;
  const TIER_GAP = 250;
  const R = { 1: 15, 2: 9, 3: 10, 4: 10, 5: 9, 6: 9, 7: 8, 8: 9 };
  let laidOut = false;

  function layout() {
    if (laidOut) return;
    // seed: within each tier, order nodes by the mean position of their parents for fewer crossings
    const byTier = {}; AI.N.forEach((d) => (byTier[d.tier] = byTier[d.tier] || []).push(d));
    const order = {};
    Object.keys(byTier).sort().forEach((t) => {
      const arr = byTier[t];
      arr.forEach((d) => {
        const ps = [...C.adj[d.id].in].map((p) => order[p]).filter((v) => v !== undefined);
        d._k = ps.length ? ps.reduce((a, b) => a + b, 0) / ps.length : 0.5;
      });
      arr.sort((a, b) => a._k - b._k);
      arr.forEach((d, i) => { order[d.id] = (i + 0.5) / arr.length; });
    });
    Object.entries(byTier).forEach(([t, arr]) => {
      const span = Math.max(900, arr.length * 46);
      arr.forEach((d, i) => { d.x = (t - 4.5) * TIER_GAP; d.y = d._y0 = -span / 2 + (i + 0.5) * (span / arr.length); });
    });
    const links = AI.L.map((e) => ({ source: e.source, target: e.target }));
    const sim = d3.forceSimulation(AI.N)
      .force("link", d3.forceLink(links).id((d) => d.id).distance(TIER_GAP).strength(0.02))
      .force("charge", d3.forceManyBody().strength(-40).distanceMax(300))
      .force("collide", d3.forceCollide().radius((d) => R[d.tier] + 9))
      .force("x", d3.forceX((d) => (d.tier - 4.5) * TIER_GAP).strength(1))
      .force("y", d3.forceY((d) => d._y0).strength(0.25))
      .stop();
    for (let i = 0; i < 260; i++) sim.tick();
    AI.N.forEach((d) => { d.x = (d.tier - 4.5) * TIER_GAP; });
    laidOut = true;
  }

  AI.renderMap = function (main, params) {
    layout();
    const companies = AI.N.filter((d) => d.tier === 1).sort((a, b) => a.label.localeCompare(b.label));
    main.innerHTML = `
    <div class="map-view">
      <aside class="map-rail" id="rail" aria-label="Map filters">
        <div class="rail-top">
          <div class="rail-group" style="flex:1;margin:0 0 12px">
            <h4><label for="coSel">Follow one company</label></h4>
            <select id="coSel"><option value="">All AI companies</option>${companies.map((c) => `<option value="${c.id}">${esc(c.label)}</option>`).join("")}</select>
          </div>
          <button class="btn rail-toggle" id="railToggle" aria-expanded="false" style="align-self:flex-end;margin-bottom:12px">Filters</button>
        </div>
        <div class="rail-more">
          <div class="rail-group">
            <h4>Show</h4>
            <label class="toggle"><input type="checkbox" id="chokeOnly"> Only chokepoints 🔒</label>
            <label class="toggle"><input type="checkbox" id="labelsAll" checked> Labels</label>
          </div>
          <div class="rail-group">
            <h4>Layers (click to hide)</h4>
            <div id="tierLegend"></div>
          </div>
          <div class="rail-group">
            <h4>How to read this</h4>
            <p class="muted" style="font-size:.88rem">Each column is one layer of the AI stack. Lines point from a thing to what it depends on. Click any dot to light up its full chain, from the company that uses it to the mine that feeds it.</p>
          </div>
        </div>
      </aside>
      <div class="map-stage" id="stage">
        <svg id="mapSvg" role="img" aria-label="AI supply chain graph"></svg>
        <div class="map-toolbar">
          <button id="fitBtn">Fit to screen</button>
          <button id="clearBtn">Clear selection</button>
          <button id="shareBtn">Copy link</button>
        </div>
        <div class="map-hint" id="mapHint">Drag to pan, scroll or pinch to zoom. Click a dot to trace its chain.</div>
        <div class="tip" id="tip"></div>
      </div>
      <aside class="map-detail" id="detail" aria-live="polite"></aside>
    </div>`;

    const svg = d3.select("#mapSvg");
    const g = svg.append("g");
    const zoom = d3.zoom().scaleExtent([0.08, 4]).on("zoom", (e) => g.attr("transform", e.transform));
    svg.call(zoom).on("dblclick.zoom", null);

    // tier bands & labels
    const ys = AI.N.map((d) => d.y); const y0 = Math.min(...ys) - 80, y1 = Math.max(...ys) + 60;
    Object.entries(AI.tiers).forEach(([t, v]) => {
      const x = (t - 4.5) * TIER_GAP;
      g.append("rect").attr("class", "tier-band").attr("x", x - 95).attr("y", y0).attr("width", 190).attr("height", y1 - y0).attr("rx", 14);
      g.append("text").attr("class", "tier-label").attr("x", x).attr("y", y0 + 26).text(v.name).style("fill", C.tierVar(t));
    });

    const link = g.append("g").selectAll("path").data(AI.L).join("path").attr("class", "link")
      .attr("d", (e) => { const s = AI.idx[e.source], t = AI.idx[e.target]; const mx = (s.x + t.x) / 2; return `M${s.x},${s.y}C${mx},${s.y} ${mx},${t.y} ${t.x},${t.y}`; });

    const node = g.append("g").selectAll("g").data(AI.N).join("g").attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`).attr("tabindex", 0).attr("role", "button")
      .attr("aria-label", (d) => d.label + ", " + AI.tiers[d.tier].name);
    node.append("circle").attr("r", (d) => R[d.tier]).style("fill", (d) => C.tierVar(d.tier));
    node.filter((d) => C.isChoke(d)).append("text").attr("class", "lock").attr("text-anchor", "middle").attr("dy", (d) => -R[d.tier] - 3).text("🔒");
    const labels = node.append("text").attr("text-anchor", "middle").attr("dy", (d) => R[d.tier] + 12)
      .text((d) => (d.label.length > 30 ? d.label.slice(0, 29) + "…" : d.label));

    const tip = d3.select("#tip"); const stage = document.getElementById("stage");
    node.on("mouseenter", (e, d) => {
      tip.style("opacity", 1).html(`<b>${esc(d.label)}</b><br><span class="muted">${esc(AI.tiers[d.tier].name)}${d.loc ? " · " + esc(d.loc) : ""}</span>${d.cap ? "<br>" + esc(d.cap) : ""}`);
    }).on("mousemove", (e) => { const r = stage.getBoundingClientRect(); tip.style("left", Math.min(e.clientX - r.left + 14, r.width - 290) + "px").style("top", e.clientY - r.top + 14 + "px"); })
      .on("mouseleave", () => tip.style("opacity", 0))
      .on("click", (e, d) => { e.stopPropagation(); select(d.id, true); })
      .on("keydown", (e, d) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(d.id, true); } });
    svg.on("click", () => clear(true));

    const hiddenTiers = new Set();
    const legend = d3.select("#tierLegend");
    Object.entries(AI.tiers).forEach(([t, v]) => {
      legend.append("div").attr("class", "legend-row").attr("role", "button").attr("tabindex", 0)
        .html(`<span class="sw" style="background:${C.tierVar(t)}"></span>${esc(v.name)} <span class="muted" style="margin-left:auto">${AI.N.filter((d) => d.tier == t).length}</span>`)
        .on("click", function () { hiddenTiers.has(+t) ? hiddenTiers.delete(+t) : hiddenTiers.add(+t); this.classList.toggle("off"); applyView(); })
        .on("keydown", function (e) { if (e.key === "Enter") this.click(); });
    });

    let selected = null; let company = params.co || ""; let chokeOnly = params.choke === "1";
    document.getElementById("coSel").value = company;
    document.getElementById("chokeOnly").checked = chokeOnly;

    function visibleSet() {
      let set = company ? C.walk(company, "out") : new Set(AI.N.map((d) => d.id));
      return set;
    }
    function applyView() {
      const vis = visibleSet();
      const keep = selected ? C.chain(selected) : null;
      node.style("display", (d) => (hiddenTiers.has(d.tier) || !vis.has(d.id) ? "none" : null))
        .classed("dim", (d) => (keep ? !keep.has(d.id) : chokeOnly ? !C.isChoke(d) : false))
        .classed("sel", (d) => d.id === selected);
      link.style("display", (e) => (hiddenTiers.has(AI.idx[e.source].tier) || hiddenTiers.has(AI.idx[e.target].tier) || !vis.has(e.source) || !vis.has(e.target) ? "none" : null))
        .classed("hot", (e) => keep && keep.has(e.source) && keep.has(e.target))
        .classed("dim", (e) => (keep ? !(keep.has(e.source) && keep.has(e.target)) : chokeOnly));
      const showAll = document.getElementById("labelsAll").checked;
      labels.style("display", (d) => (showAll || (keep && keep.has(d.id)) || d.tier === 1 ? null : "none"));
    }

    function fit(ids, ms) {
      const pts = (ids ? AI.N.filter((d) => ids.has(d.id)) : AI.N.filter((d) => !hiddenTiers.has(d.tier) && visibleSet().has(d.id)));
      if (!pts.length) return;
      const xs = pts.map((d) => d.x), ys2 = pts.map((d) => d.y);
      const bx0 = Math.min(...xs) - 110, bx1 = Math.max(...xs) + 110, by0 = Math.min(...ys2) - 70, by1 = Math.max(...ys2) + 50;
      const w = stage.clientWidth, h = stage.clientHeight;
      const k = Math.min(w / (bx1 - bx0), h / (by1 - by0), 1.4);
      svg.transition().duration(ms == null ? 600 : ms).call(zoom.transform, d3.zoomIdentity.translate(w / 2 - ((bx0 + bx1) / 2) * k, h / 2 - ((by0 + by1) / 2) * k + 10).scale(k));
    }

    const narrow = () => window.innerWidth < 760;
    const near = (id) => new Set([id, ...C.adj[id].in, ...C.adj[id].out]);
    function select(id, push) {
      selected = id; applyView(); renderDetail(id);
      fit(narrow() ? near(id) : C.chain(id));
      if (push) AI.app.setParams({ n: id, co: company || null, choke: chokeOnly ? "1" : null });
      document.getElementById("detail").classList.add("open");
    }
    function clear(push) {
      selected = null; applyView(); renderEmpty();
      document.getElementById("detail").classList.remove("open");
      if (push) AI.app.setParams({ n: null, co: company || null, choke: chokeOnly ? "1" : null });
    }

    function renderEmpty() {
      const chokes = AI.N.filter(C.isChoke).slice(0, 8);
      document.getElementById("detail").innerHTML = `
      <div class="detail-empty">
        <h3>Pick anything to trace it</h3>
        <ol>
          <li>Click a company on the left edge to see everything it depends on.</li>
          <li>Click a mine or power plant on the right edge to see which AI products would feel it.</li>
          <li>Red locks mark chokepoints with one or two suppliers worldwide.</li>
        </ol>
        <div class="d-section"><h4>Good places to start</h4>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${["p_chatgpt", "p_claude", "p_gemini", "c_gb200", "m_hbm4", "f_asml", "x_spruce", "x_china_ga"].map(C.nodeChip).join("")}</div></div>
        <div class="d-section"><h4>Chokepoints</h4><div style="display:flex;flex-wrap:wrap;gap:6px">${chokes.map((d) => C.nodeChip(d.id)).join("")}</div></div>
      </div>`;
    }

    function listOf(ids, label) {
      if (!ids.length) return "";
      return `<div class="d-section"><h4>${label} (${ids.length})</h4><ul class="link-list">${ids.map((x) => AI.idx[x]).sort((a, b) => a.tier - b.tier || a.label.localeCompare(b.label)).map((d) =>
        `<li><button data-go="${d.id}"><span class="sw" style="background:${C.tierVar(d.tier)}"></span>${esc(d.label)}${C.isChoke(d) ? " 🔒" : ""}<span class="t">${esc(AI.tiers[d.tier].short)}</span></button></li>`).join("")}</ul></div>`;
    }

    function renderDetail(id) {
      const d = AI.idx[id]; const det = document.getElementById("detail");
      const down = C.pathDown(id), up = C.pathUp(id);
      const up1 = [...C.walk(id, "in")].map((x) => AI.idx[x]).filter((x) => x.tier === 1 && x.id !== id);
      const ppl = C.peopleFor(id); const tds = C.teardownsFor(id); const els = C.elementsInNode(id);
      det.innerHTML = `
        <button class="icon-btn sheet-close" id="sheetClose" aria-label="Close details">✕</button>
        <div class="d-tier"><span class="sw" style="background:${C.tierVar(d.tier)}"></span>${esc(AI.tiers[d.tier].name)}${d.sector ? " · " + esc(AI.sectors[d.sector].name) : ""}</div>
        <h2 class="d-title">${esc(d.label)}</h2>
        ${d.loc || d.hq ? `<div class="d-loc">${esc(d.loc || d.hq)}</div>` : ""}
        ${(d.flags || []).map((f) => `<span class="chip risk" style="margin:8px 6px 0 0">${esc(f)}</span>`).join("")}
        <p class="d-desc">${esc(d.desc || "")}</p>
        <dl class="kv">${d.owner ? `<dt>Owner</dt><dd>${esc(d.owner)}</dd>` : ""}${d.cap ? `<dt>Scale</dt><dd>${esc(d.cap)}</dd>` : ""}</dl>
        ${d.noAlt ? `<div class="choke"><strong>🔒 Why this is a chokepoint</strong>${esc(d.noAlt)}${d.workaround ? `<div class="wa"><b>How the world routes around it:</b> ${esc(d.workaround)}</div>` : ""}</div>` : ""}
        ${tds.length ? `<div class="d-section"><h4>See how it's made, down to atoms</h4>${tds.map((t) => `<a class="btn primary" style="margin:0 6px 6px 0" href="#/teardown/${t.id}">${esc(t.name)} teardown</a>`).join("")}</div>` : ""}
        ${down.length > 1 ? `<div class="d-section"><h4>One path down to the ground</h4><div class="chainline">${down.map((x, i) => (i ? " → " : "") + `<b>${esc(AI.idx[x].label)}</b>`).join("")}</div></div>` : ""}
        ${up.length > 1 ? `<div class="d-section"><h4>One path up to a user</h4><div class="chainline">${up.map((x, i) => (i ? " ← " : "") + `<b>${esc(AI.idx[x].label)}</b>`).join("")}</div></div>` : ""}
        ${up1.length && d.tier > 1 ? `<div class="d-section"><h4>AI companies that depend on this (${up1.length})</h4><div style="display:flex;flex-wrap:wrap;gap:6px">${up1.map((x) => C.nodeChip(x.id)).join("")}</div></div>` : ""}
        ${ppl.length ? `<div class="d-section"><h4>Key people</h4>${ppl.map(C.personMini).join("")}</div>` : ""}
        ${els.length ? `<div class="d-section"><h4>Atoms inside</h4><div style="display:flex;flex-wrap:wrap;gap:6px">${els.map((s) => `<a class="chip" href="#/atoms?e=${s}"><b>${s}</b> ${esc(C.element(s).name)}</a>`).join("")}</div></div>` : ""}
        ${listOf([...C.adj[id].out], "Depends on")}
        ${listOf([...C.adj[id].in], "Used by")}
        <div class="d-section"><button class="btn" id="copyD">Copy link to this</button></div>`;
      det.scrollTop = 0;
      det.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => select(b.dataset.go, true)));
      const sc = document.getElementById("sheetClose"); if (sc) sc.onclick = () => det.classList.remove("open");
      document.getElementById("copyD").onclick = C.copyLink;
    }

    document.getElementById("coSel").onchange = (e) => { company = e.target.value; selected = null; applyView(); renderEmpty(); fit(); AI.app.setParams({ n: null, co: company || null, choke: chokeOnly ? "1" : null }); };
    document.getElementById("chokeOnly").onchange = (e) => { chokeOnly = e.target.checked; applyView(); AI.app.setParams({ choke: chokeOnly ? "1" : null }); };
    document.getElementById("labelsAll").onchange = applyView;
    document.getElementById("fitBtn").onclick = () => fit(selected ? C.chain(selected) : null);
    document.getElementById("clearBtn").onclick = () => clear(true);
    document.getElementById("shareBtn").onclick = C.copyLink;
    document.getElementById("railToggle").onclick = function () { const r = document.getElementById("rail"); r.classList.toggle("open"); this.setAttribute("aria-expanded", r.classList.contains("open")); };
    setTimeout(() => { const h = document.getElementById("mapHint"); if (h) h.style.display = "none"; }, 9000);

    applyView();
    if (params.n && AI.idx[params.n]) { selected = params.n; applyView(); renderDetail(params.n); fit(narrow() ? near(params.n) : C.chain(params.n), 0); document.getElementById("detail").classList.add("open"); }
    else if (params.tier && AI.tiers[params.tier]) {
      const t = +params.tier; const ids = new Set(AI.N.filter((d) => d.tier === t).map((d) => d.id));
      renderEmpty();
      document.getElementById("detail").insertAdjacentHTML("afterbegin", `<div class="d-section" style="margin-top:0"><div class="d-tier"><span class="sw" style="background:${C.tierVar(t)}"></span>Layer ${t} of 8</div><h2 class="d-title">${esc(AI.tiers[t].name)}</h2><p class="muted">${esc(AI.tiers[t].hint)}.</p>${listOf([...ids], "Everything in this layer")}</div>`);
      document.querySelectorAll("#detail [data-go]").forEach((b) => b.addEventListener("click", () => select(b.dataset.go, true)));
      fit(ids, 0); requestAnimationFrame(() => fit(ids, 0));
      document.getElementById("detail").classList.add("open");
      return;
    }
    else { renderEmpty(); fit(null, 0); }
    // re-fit when the container size settles; on phones start zoomed on the first two layers
    requestAnimationFrame(() => {
      if (selected) fit(narrow() ? near(selected) : C.chain(selected), 0);
      else fit(narrow() ? new Set(AI.N.filter((d) => d.tier <= 2).map((d) => d.id)) : null, 0);
    });
  };
})(window.AI);
