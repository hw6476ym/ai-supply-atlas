# Atoms to Intelligence

**The AI supply chain, from the chatbot down to the chip, the factory, the mine and the atom.**

[**▶ Open the live site**](https://bidurkaphle-pixel.github.io/ai-atoms-to-intelligence/)

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
| **Supply map** | 201 named entities in 8 layers, 525 dependency links. Click anything to light up its full chain, see one path down to the ground and one up to a user, the people who run it, and the atoms inside. Filter to one company or to chokepoints only. |
| **Teardowns** | 12 products taken apart ten times at a time, from a 2 m rack to a 0.2 nm silicon atom: Nvidia GB200 and Vera Rubin, HBM, CoWoS packaging, the ASML EUV scanner, a 2 nm transistor, Google TPU, a gigawatt data center, a large language model, optical transceivers, a humanoid robot and AI glasses. Each has *how it works*, *how it's made* step by step, chokepoints, people and money. |
| **People** | 80 leaders across labs, hyperscalers, chip designers, fabs, memory makers, toolmakers, clouds and China, each with what they are working on now. |
| **Money** | 2026 capex guidance, lab valuations over time, and 23 of the biggest equity, compute, chip and licensing deals. |
| **Atoms** | A periodic table of the 45 elements inside AI hardware: what each does, where it is mined, and how concentrated the supply is. |
| **World** | Every site, fab and mine with coordinates on one map. |

Every view has a shareable URL (for example `#/map?n=f_asml`, `#/teardown/hbm`, `#/atoms?e=Ga`).
Press `/` anywhere to search across companies, chips, people and elements.

## Status of the data

Status as of **October 2026**. Figures are rounded public numbers from company announcements, filings and
press (Bloomberg, Reuters, FT, The Information, Epoch AI, TrendForce, Counterpoint, USGS). Many deals are
multi-year or contingent. Treat this as a map for understanding, not for investing or procurement.
Each teardown and the Money page link to their sources.

## Run locally

```bash
git clone https://github.com/bidurkaphle-pixel/ai-atoms-to-intelligence.git
cd ai-atoms-to-intelligence
python3 -m http.server 8000   # then open http://localhost:8000
```

No build step and no tracking. D3, topojson and the world outline are vendored in `vendor/` so the site
works without third-party CDNs (only the Archivo web font loads from Google Fonts, with a system fallback).

## Project layout

```
index.html            app shell
css/style.css         "yellow room" theme (light + dark)
js/data/graph-*.js    the supply graph: nodes by tier, then links
js/data/teardowns-*.js zoom ladders, how it works, how it's made
js/data/people.js     key people and what they're working on
js/data/money.js      capex, valuations, deals
js/data/elements.js   periodic table + role of each element in AI
js/core.js            graph walking, search index, helpers
js/map.js             the D3 supply map
js/views.js           home, teardowns, people, money, atoms, world, about
js/app.js             hash router, search, theme
```

To add a node, call `n(id, label, tier, {...})` in a `graph-*.js` file and link it with `l("a", "b")`
(direction: thing → what it depends on).

## Ideas for next versions

- "What if" mode: remove a node (Taiwan, gallium, ASML) and see which AI products lose supply.
- Timeline slider from 2022 to 2028.
- Energy per answer, traced back to the power plant.
- JSON export and a corrections form with per-node "last verified" dates.

## License

MIT
