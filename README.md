# Atoms to Intelligence

**The AI supply chain, from the chatbot down to the chip, the factory, the mine and the atom.**

[**▶ Open the live site**](https://hw6476ym.github.io/ai-atoms-to-intelligence/)

An AI-only companion to the [Global Supply Chain Explorer](https://hw6476ym.github.io/top100companies_supplychainFull/).
Instead of the top 100 companies, it follows only the companies building AI, and goes further:
past the mine to the elements, and sideways to the people who lead each layer and the money that pays for it.

```
AI company → Product → Compute site → System & chip → Component →
Fab, plant & tool → Material → Mine, well & power plant → Atom
```

## What's inside

| Section | What you can do |
|---|---|
| **Home** | A live trace that walks ChatGPT, Claude, Gemini, Grok or Meta AI down to a single element, plus the nine layers of the stack and the top chokepoints. |
| **Supply map** | 272 named entities in 8 tiers, 670+ dependency links. Pick a company in the sidebar or click any dot to light up its full chain, see one path down to the ground and one up to a user, the people who run it, and the atoms inside. Filter to one company or chokepoints only. |
| **Companies** | A dossier for each of 38 AI companies: everything it depends on by tier, the chips it runs on, its chokepoints, leaders, deals and atoms. |
| **Teardowns** | 14 teardowns zooming 10× at a time from a 2 m rack to a 0.2 nm atom: GB200, Vera Rubin, HBM, CoWoS, the ASML EUV scanner, a 2 nm transistor, TPU, a gigawatt campus, a language model, a frontier training run, serving one answer, optics, a humanoid robot and AI glasses. |
| **Specs** | Sortable spec sheet of 18 accelerators (HBM, TB/s, FP8/FP4, power, scale-up domain) with a bandwidth-vs-compute chart; a frontier-model table; Nvidia, HBM and process-node roadmaps; a 36-term glossary. |
| **Sites** | Gigawatts planned vs online at the 20 largest AI campuses. |
| **Chokepoints** | Every single-source dependency ranked by how many AI companies sit downstream, plus a what-if tool: knock out Taiwan fabs, HBM, ASML or Chinese minerals and see which chips can't be built and which products go dark. |
| **Calculator** | Params × tokens → FLOPs, wall-clock days, chip-hours, MWh, dollars and memory fit, on any chip in the spec sheet. |
| **People** | 93 leaders across labs, hyperscalers, chips, fabs, clouds, apps and China, each with what they're working on now. |
| **Money** | 2026 capex guidance, lab valuations over time and 23 of the biggest equity, compute, chip and licensing deals. |
| **Atoms** | Periodic table of the 45 elements inside AI hardware, what each does and how concentrated its supply is. |
| **World** | Every site, fab and mine on one map. |

Every view has a shareable URL (for example `#/map?n=f_asml`, `#/company/anthropic`, `#/chokepoints?x=f_tsmc18`).
Press `/` anywhere to search across companies, chips, people and elements.

## Open data

All data is in [`data/atlas.json`](data/atlas.json) (regenerated from `js/data/*.js`) and is MIT-licensed.
The About page also has a one-click download.

## Status of the data

Status as of **October 2026**. Figures are rounded public numbers from company announcements, filings and
press (Bloomberg, Reuters, FT, The Information, Epoch AI, TrendForce, Counterpoint, USGS). Many deals are
multi-year or contingent. Treat this as a map for understanding, not for investing or procurement.
Each teardown and the Money page link to their sources.

## Run locally

```bash
git clone https://github.com/hw6476ym/ai-atoms-to-intelligence.git
cd ai-atoms-to-intelligence
python3 -m http.server 8000   # then open http://localhost:8000
```

No build step and no tracking. D3, topojson and the world outline are vendored in `vendor/` so the site
works without third-party CDNs (only the Archivo web font loads from Google Fonts, with a system fallback).

## Project layout

```
index.html            app shell
css/style.css         "yellow room" theme (light + dark)
js/data/graph-*.js    the supply graph: nodes by tier, then links (graph-d = expansion + site GW)
js/data/specs.js      accelerators, models, roadmaps, glossary
js/data/teardowns-*.js zoom ladders, how it works, how it's made
js/data/people.js     key people and what they're working on
js/data/money.js      capex, valuations, deals
js/data/elements.js   periodic table + role of each element in AI
js/core.js            graph walking, search index, helpers
js/map.js             the D3 supply map
js/views.js           teardowns, people, money, atoms, world, about
js/views2.js          home, specs, models, roadmaps, sites, companies, chokepoints, calculator, glossary
js/app.js             hash router, search, theme
```

To add a node, call `n(id, label, tier, {...})` in a `graph-*.js` file and link it with `l("a", "b")`
(direction: thing → what it depends on).

## Ideas for next versions

- Timeline slider from 2022 to 2028.
- Energy per answer, traced back to the power plant.
- JSON export and a corrections form with per-node "last verified" dates.

## License

MIT
