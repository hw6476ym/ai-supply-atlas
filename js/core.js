/* Core helpers shared by every view. */
(function (AI) {
  const C = (AI.core = {});
  const esc = (C.esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));
  C.$ = (sel, el) => (el || document).querySelector(sel);
  C.$$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));

  C.tierVar = (t) => `var(--t${t})`;
  C.tierColor = (t) => getComputedStyle(document.documentElement).getPropertyValue(`--t${t}`).trim() || "#999";

  /* adjacency */
  const adj = (C.adj = {});
  AI.N.forEach((d) => (adj[d.id] = { out: new Set(), in: new Set() }));
  AI.L.forEach((e) => { adj[e.source].out.add(e.target); adj[e.target].in.add(e.source); });

  C.node = (id) => AI.idx[id];
  C.walk = function (id, dir) {
    const seen = new Set([id]); const stack = [id];
    while (stack.length) { const x = stack.pop(); adj[x][dir].forEach((y) => { if (!seen.has(y)) { seen.add(y); stack.push(y); } }); }
    return seen;
  };
  C.chain = (id) => { const a = C.walk(id, "in"), b = C.walk(id, "out"); b.forEach((x) => a.add(x)); return a; };

  // one representative path from a node down to a tier-8 source (BFS shortest)
  C.pathDown = function (id) {
    const prev = { [id]: null }; const q = [id];
    while (q.length) {
      const x = q.shift();
      if (AI.idx[x].tier === 8 && x !== id) { const p = []; let c = x; while (c) { p.unshift(c); c = prev[c]; } return p; }
      adj[x].out.forEach((y) => { if (!(y in prev)) { prev[y] = x; q.push(y); } });
    }
    return [id];
  };
  C.pathUp = function (id) {
    const prev = { [id]: null }; const q = [id];
    while (q.length) {
      const x = q.shift();
      if (AI.idx[x].tier === 1 && x !== id) { const p = []; let c = x; while (c) { p.push(c); c = prev[c]; } return p; }
      adj[x].in.forEach((y) => { if (!(y in prev)) { prev[y] = x; q.push(y); } });
    }
    return [id];
  };

  /* people ↔ nodes */
  const orgNode = {
    "OpenAI": "openai", "Anthropic": "anthropic", "Alphabet / Google": "google", "Google DeepMind": "google", "Google": "google", "Google Cloud": "google", "Alphabet": "google",
    "Meta": "meta", "SpaceX / SpaceXAI / Tesla": "xai", "SpaceXAI": "xai", "Tesla": "tesla", "Microsoft": "microsoft", "Microsoft AI": "microsoft",
    "Amazon": "amazon", "AWS": "amazon", "Apple": "apple", "Nvidia": "nvidia", "AMD": "amd", "Broadcom": "broadcom", "Cerebras": "cerebras",
    "Oracle": "oracle", "CoreWeave": "coreweave", "SoftBank": "s_milam", "Mistral AI": "mistral", "Thinking Machines Lab": "tml", "Safe Superintelligence": "ssi", "ByteDance": "bytedance", "Moonshot AI": "moonshot", "Zhipu AI": "zhipu", "Baidu": "baidu", "Nebius": "nebius", "Crusoe": "crusoe", "G42 / MGX": "g42", "Perplexity": "perplexity", "Anysphere (Cursor)": "anysphere", "Figure AI": "figure", "Arm": "softbank",
    "DeepSeek": "deepseek", "Alibaba": "alibaba", "Alibaba Cloud": "alibaba", "Huawei": "huawei", "TSMC": "f_tsmc18", "SK hynix": "f_hynix_m15x", "SK Group": "f_hynix_m15x",
    "Samsung Electronics": "f_samsung_p", "Micron": "f_micron", "ASML": "f_asml", "Intel": "intel"
  };
  AI.people.forEach((p) => { p.node = orgNode[p.org] || null; });
  C.peopleFor = function (id) {
    const d = AI.idx[id]; const ids = new Set(d.people || []);
    AI.people.forEach((p) => { if (p.node === id) ids.add(p.id); });
    return [...ids].map((x) => AI.people.find((p) => p.id === x)).filter(Boolean);
  };
  C.person = (id) => AI.people.find((p) => p.id === id);
  C.initials = (name) => name.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]).slice(0, 2).join("");

  C.teardownsFor = (id) => AI.teardowns.filter((t) => t.node === id || AI.idx[id].teardown === t.id || t.ladder.some((r) => r.node === id) || t.howMade.some((r) => r[2] === id));
  C.teardown = (id) => AI.teardowns.find((t) => t.id === id);
  C.element = (sym) => AI.elements.find((e) => e.sym === sym);
  C.elementsInNode = function (id) {
    const set = new Set(AI.idx[id].el || []);
    Object.entries(AI.elementUse).forEach(([s, u]) => { if (u.nodes.includes(id)) set.add(s); });
    return [...set];
  };
  C.isChoke = (d) => !!(d.noAlt || (d.flags || []).some((f) => f.startsWith("🔒")));

  /* search index */
  C.searchIndex = [];
  AI.N.forEach((d) => C.searchIndex.push({ kind: AI.tiers[d.tier].short, label: d.label, sub: d.loc || d.owner || d.hq || "", text: [d.label, d.loc, d.owner, d.hq, d.desc].join(" "), href: "#/map?n=" + d.id, tier: d.tier }));
  AI.teardowns.forEach((t) => C.searchIndex.push({ kind: "Teardown", label: t.name, sub: t.kind, text: [t.name, t.kind, t.tagline, t.maker].join(" "), href: "#/teardown/" + t.id, tier: 9 }));
  AI.people.forEach((p) => C.searchIndex.push({ kind: "Person", label: p.name, sub: p.role + ", " + p.org, text: [p.name, p.org, p.role, p.now].join(" "), href: "#/people?p=" + p.id, tier: 0 }));
  AI.elements.forEach((e) => { if (AI.elementUse[e.sym]) C.searchIndex.push({ kind: "Element", label: `${e.name} (${e.sym})`, sub: AI.elementUse[e.sym].role, text: [e.name, e.sym].join(" "), href: "#/atoms?e=" + e.sym, tier: 9 }); });
  C.search = function (q) {
    q = q.trim().toLowerCase(); if (!q) return [];
    const terms = q.split(/\s+/);
    return C.searchIndex.map((r) => {
      const l = r.label.toLowerCase(); const t = r.text.toLowerCase();
      if (!terms.every((w) => t.includes(w))) return null;
      let s = 0; if (l === q) s += 100; if (l.startsWith(q)) s += 50; if (l.includes(q)) s += 25; s -= r.label.length / 50;
      return [s, r];
    }).filter(Boolean).sort((a, b) => b[0] - a[0]).slice(0, 14).map((x) => x[1]);
  };

  C.exportData = () => ({
    generated: "2026-10", license: "MIT", tiers: AI.tiers,
    nodes: AI.N.map(({ x, y, vx, vy, index, fx, fy, _k, _y0, ...d }) => d),
    links: AI.L.map((e) => ({ source: typeof e.source === "object" ? e.source.id : e.source, target: typeof e.target === "object" ? e.target.id : e.target })),
    people: AI.people, teardowns: AI.teardowns, specs: AI.specs, money: AI.money, elementUse: AI.elementUse
  });

  /* small UI helpers */
  C.toast = function (msg) { const t = document.getElementById("toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(C._tt); C._tt = setTimeout(() => t.classList.remove("on"), 1800); };
  C.copyLink = function () {
    const url = location.href;
    (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(() => C.toast("Link copied"), () => { prompt("Copy this link", url); });
  };
  C.fmtScale = function (v, unit) {
    if (unit !== "m") {
      if (unit === "C") return { big: "~10⁻¹⁵ C", small: "a few fC of charge" };
      const exp = Math.round(Math.log10(v));
      return { big: (v >= 1000 ? "10" + sup(exp) : String(v)), small: unit };
    }
    const units = [[1e3, "km"], [1, "m"], [1e-2, "cm"], [1e-3, "mm"], [1e-6, "µm"], [1e-9, "nm"], [1e-12, "pm"]];
    for (const [f, u] of units) if (v >= f * 0.999) { const n = v / f; return { big: (n >= 100 ? Math.round(n) : +n.toPrecision(2)) + " " + u, small: "10" + sup(Math.floor(Math.log10(v))) + " m" }; }
    return { big: v.toExponential(1) + " m", small: "" };
  };
  function sup(n) { const m = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" }; return String(n).split("").map((c) => m[c]).join(""); }
  C.sup = sup;

  C.nodeChip = (id) => { const d = AI.idx[id]; if (!d) return ""; return `<a class="chip" href="#/map?n=${id}"><span class="sw" style="background:${C.tierVar(d.tier)}"></span>${esc(d.label)}${C.isChoke(d) ? ' <span class="risk-text" aria-label="chokepoint">🔒</span>' : ""}</a>`; };
  C.personMini = (p) => `<a class="person-mini" href="#/people?p=${p.id}"><span class="avatar">${esc(C.initials(p.name))}</span><span><b>${esc(p.name)}</b><br><span class="muted" style="font-size:.84rem">${esc(p.role)}, ${esc(p.org)}</span></span></a>`;
})(window.AI);
