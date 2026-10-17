/* Router, search and theme. Routes are hash-based so the site works on GitHub Pages
   without a server: #/map?n=f_asml, #/teardown/hbm, #/people?p=su, #/atoms?e=Ga */
(function (AI) {
  const C = AI.core;
  const main = document.getElementById("main");
  const app = (AI.app = {});
  let current = { route: null, params: {} };
  let silent = false;

  function parse() {
    const h = location.hash.replace(/^#\/?/, "");
    const [path, qs] = h.split("?");
    const params = Object.fromEntries(new URLSearchParams(qs || ""));
    const parts = path.split("/").filter(Boolean);
    return { route: parts[0] || "home", arg: parts[1], params };
  }

  app.setParams = function (patch) {
    const { route, arg } = parse();
    const p = Object.assign({}, current.params, patch);
    Object.keys(p).forEach((k) => (p[k] == null || p[k] === "") && delete p[k]);
    current.params = p;
    const qs = new URLSearchParams(p).toString();
    silent = true;
    history.replaceState(null, "", "#/" + (route === "home" ? "" : route) + (arg ? "/" + arg : "") + (qs ? "?" + qs : ""));
    setTimeout(() => (silent = false), 0);
  };

  const titles = { home: "", map: "Supply map", teardowns: "Teardowns", teardown: "Teardown", people: "People", money: "Money", atoms: "Atoms", world: "World", more: "More", about: "About" };

  function render() {
    if (silent) return;
    const { route, arg, params } = parse();
    const sameView = current.route === route && current.arg === arg;
    // within the teardown page, ?s= just scrolls
    if (sameView && route === "teardown" && params.s) { scrollToSection(params.s); return; }
    current = { route, arg, params };
    document.body.dataset.route = route;
    const tab = route === "teardown" ? "teardowns" : route;
    C.$$("[data-tab]").forEach((a) => a.toggleAttribute("aria-current", a.dataset.tab === tab || (tab === "home" && a.dataset.tab === "home")));
    C.$$("[data-tab]").forEach((a) => { if (a.hasAttribute("aria-current")) a.setAttribute("aria-current", "page"); });
    if (["money", "atoms", "world", "about"].includes(route)) C.$$('.bottom-tabs [data-tab="more"]').forEach((a) => a.setAttribute("aria-current", "page"));
    try {
      if (route === "map") AI.renderMap(main, params);
      else if (route === "teardown") AI.views.teardown(main, arg);
      else if (AI.views[route]) AI.views[route](main, params);
      else AI.views.home(main);
    } catch (err) {
      console.error(err);
      main.innerHTML = `<div class="wrap"><div class="empty" style="margin-top:40px">This page hit an error: ${C.esc(err.message)}. <a href="#/">Go home</a>.</div></div>`;
    }
    const t = route === "teardown" && C.teardown(arg) ? C.teardown(arg).name : titles[route];
    document.title = (t ? t + " — " : "") + "Atoms to Intelligence";
    if (route !== "map") window.scrollTo(0, 0);
    if (route === "teardown" && params.s) setTimeout(() => scrollToSection(params.s), 50);
  }
  function scrollToSection(s) { const el = document.getElementById("s-" + s); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }

  window.addEventListener("hashchange", render);

  /* search overlay */
  const ov = document.getElementById("searchOverlay"); const inp = document.getElementById("searchInput"); const res = document.getElementById("searchResults");
  let sel = 0, results = [];
  function openSearch() { ov.hidden = false; inp.value = ""; draw(); inp.focus(); }
  function closeSearch() { ov.hidden = true; }
  function draw() {
    results = C.search(inp.value); sel = 0;
    res.innerHTML = results.map((r, i) => `<li role="option" aria-selected="${i === sel}"><a href="${r.href}"><span class="sw" style="width:10px;height:10px;border-radius:50%;flex:none;background:${r.tier ? C.tierVar(r.tier) : "var(--amber)"}"></span><span><b>${C.esc(r.label)}</b><br><span class="muted" style="font-size:.82rem">${C.esc((r.sub || "").slice(0, 90))}</span></span><span class="k">${C.esc(r.kind)}</span></a></li>`).join("") || (inp.value ? `<li class="muted" style="padding:10px">Nothing found for “${C.esc(inp.value)}”. Try a company, a chip, a person or an element.</li>` : "");
  }
  inp.addEventListener("input", draw);
  inp.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(0, Math.min(results.length - 1, sel + (e.key === "ArrowDown" ? 1 : -1))); C.$$("#searchResults li").forEach((li, i) => li.setAttribute("aria-selected", i === sel)); }
    if (e.key === "Enter" && results[sel]) { location.hash = results[sel].href; closeSearch(); }
  });
  res.addEventListener("click", (e) => { if (e.target.closest("a")) closeSearch(); });
  ov.addEventListener("click", (e) => { if (e.target === ov) closeSearch(); });
  document.getElementById("openSearch").onclick = openSearch;
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !ov.hidden) closeSearch();
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    if (!typing && (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k"))) { e.preventDefault(); openSearch(); }
  });

  /* theme */
  const root = document.documentElement;
  try { const t = localStorage.getItem("a2i-theme"); if (t) root.dataset.theme = t; } catch (e) {}
  document.getElementById("themeBtn").onclick = () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : !matchMedia("(prefers-color-scheme: light)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("a2i-theme", root.dataset.theme); } catch (e) {}
    if (current.route === "map" || current.route === "money" || current.route === "world") { current.route = null; render(); }
  };

  render();
})(window.AI);
