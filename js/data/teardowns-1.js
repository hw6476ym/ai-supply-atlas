/* TEARDOWNS part 1 — hardware, from the rack down to the atom.
   Each teardown has a zoom ladder: every rung is ~10× smaller than the last,
   so you literally descend from a 2-metre rack to a single atom. */
window.AI = window.AI || {};
(function (AI) {
  const T = (AI.teardowns = AI.teardowns || []);

  T.push({
    id: "gb200", name: "Nvidia GB200 NVL72", maker: "Nvidia", kind: "AI rack", node: "c_gb200",
    tagline: "The 1.4-tonne rack that acts like one giant GPU.",
    facts: [["GPUs", "72 Blackwell (144 dies)"], ["CPUs", "36 Grace"], ["Memory", "~13.5 TB HBM3E"], ["Power", "~120–130 kW"], ["Weight", "~1.36 t"], ["Price", "~$3M+ per rack (reported)"]],
    why: "Training a frontier model means doing roughly 10^26 multiplications. The NVL72 was the first rack where 72 GPUs share memory over NVLink fast enough to behave as one processor, which is why it became the unit every 2025–26 data center was designed around.",
    ladder: [
      { scale: 2.2, unit: "m", name: "The rack", see: "A 48U cabinet, liquid hoses in and out the back, ~2,000 kg on the floor with its cooling manifold.", made: "Steel and aluminium frame, copper busbar, 18 compute trays, 9 switch trays, power shelves.", by: "Foxconn, Quanta, Wiwynn (assembly)", node: "f_foxconn" },
      { scale: 0.45, unit: "m", name: "Compute tray", see: "A 1U drawer: two Grace Blackwell 'superchips' (4 GPUs + 2 CPUs) under copper cold plates.", made: "Printed circuit board, cold plates, quick-disconnect couplings, BlueField DPUs, ConnectX NICs.", by: "Nvidia design; ODMs build", node: "m_cdu" },
      { scale: 0.1, unit: "m", name: "B200 package", see: "Two GPU dies and eight HBM3E stacks on a silicon interposer, on an organic substrate the size of a coaster.", made: "CoWoS-L: dies + local silicon bridges + ABF substrate with ~20 copper layers.", by: "TSMC packaging (AP sites), Ibiden substrates", node: "m_cowos" },
      { scale: 0.028, unit: "m", name: "One GPU die", see: "About 800 mm², the largest area a scanner can print in one shot (the 'reticle limit').", made: "~104 billion transistors on TSMC 4NP, wired by ~15 copper layers.", by: "TSMC Fab 18 (Tainan); TSMC Arizona", node: "m_b200die" },
      { scale: 1e-3, unit: "m", name: "A Tensor Core cluster", see: "One of 144+ streaming multiprocessors (SMs), each with Tensor Cores that do matrix multiplies in FP4/FP8.", made: "Logic, SRAM caches, register files.", by: "Nvidia architecture team" },
      { scale: 1e-5, unit: "m", name: "Standard cells", see: "Rows of logic gates (NAND, flip-flops), each a few hundred nanometres wide.", made: "Transistors connected by the first metal layers.", by: "EDA tools from Synopsys and Cadence" },
      { scale: 5e-8, unit: "m", name: "A FinFET transistor", see: "A silicon 'fin' wrapped by a gate on three sides. Gate pitch ~50 nm. On/off switch for current.", made: "Silicon fin, hafnium-oxide insulator, metal gate (TiN, TiAl), tungsten contacts, cobalt/copper wires.", by: "Patterned with ASML EUV scanners", node: "f_asml" },
      { scale: 1.5e-9, unit: "m", name: "Gate oxide", see: "The insulator between gate and channel is ~1.5 nm thick: a handful of atomic layers.", made: "Hafnium dioxide (HfO₂) grown one atomic layer at a time.", by: "ALD tools (ASM International, Lam, AMAT)", node: "r_hafnium" },
      { scale: 2.35e-10, unit: "m", name: "Silicon atoms", see: "The channel is a crystal lattice; neighbouring silicon atoms are 0.235 nm apart. Doping adds boron or phosphorus atoms to control conduction.", made: "Si (14), with dopants B (5), P (15), As (33).", by: "Ingot grown from Spruce Pine quartz crucibles", node: "r_polysi" }
    ],
    howWorks: [
      ["Data comes in", "A prompt arrives as numbers (tokens). The Grace CPU stages it into GPU memory."],
      ["Weights stream from HBM", "Model weights sit in HBM3E stacks next to each GPU die; 8 TB/s per GPU of bandwidth feeds the cores."],
      ["Tensor Cores multiply", "Thousands of Tensor Cores multiply weight matrices by activations in 4-bit or 8-bit floating point, trillions of times a second."],
      ["NVLink shares the work", "A model too big for one GPU is split across all 72. NVLink switch trays let every GPU swap partial results at 1.8 TB/s."],
      ["Heat leaves by water", "~1,000+ W per GPU flows into copper cold plates, warm coolant goes to a CDU, then outside to dry coolers or chillers."],
      ["Answers go out", "Results return through ConnectX/BlueField network cards to the next rack or the user."]
    ],
    howMade: [
      ["Sand to silicon", "Quartz is smelted to metallurgical silicon, then purified to 11N polysilicon (Wacker, Hemlock).", "r_polysi"],
      ["Ingot and wafer", "A seed crystal pulls a 300 mm single-crystal ingot from melt in a quartz crucible; it is sliced and polished (Shin-Etsu, SUMCO).", "f_shinetsu"],
      ["Print the transistors", "~80+ mask layers at TSMC: EUV and DUV lithography, etch, deposition, implant, repeated for ~3 months.", "f_tsmc18"],
      ["Test and dice", "Wafers are probed; good dies cut out. Each B200 needs two good reticle-size dies.", "f_tsmc18"],
      ["Stack the memory", "SK hynix thins DRAM dies, drills TSVs, stacks 12 high into HBM3E.", "f_hynix_m15x"],
      ["Package (CoWoS-L)", "GPU dies and HBM are bonded beside each other on silicon bridges and an ABF substrate.", "f_tsmc_ap"],
      ["Build the superchip and tray", "Packages go onto boards with Grace CPUs, cold plates and NICs.", "f_foxconn"],
      ["Rack integration and burn-in", "Trays, NVLink spine, power shelves and manifolds are assembled and stress-tested for days before shipping.", "f_foxconn"]
    ],
    elements: [["Si", "Transistor channels, dies, interposer bridges"], ["Hf", "Gate insulator (high-k)"], ["Cu", "Wiring, cold plates, NVLink cables, busbar"], ["W", "Contacts between transistors and wires"], ["Co", "Liners and contacts"], ["Ta", "Copper diffusion barriers"], ["Ru", "Thinnest-wire liners"], ["Sn", "Solder micro-bumps"], ["Ag", "Solder alloy"], ["Au", "Contact plating"], ["Ni", "Under-bump metallisation"], ["B", "Dopant"], ["P", "Dopant"], ["Ti", "Gate metal (TiN)"], ["Fe", "Rack frame steel"], ["Al", "Heat spreaders, frame"]],
    chokepoints: ["f_asml", "f_tsmc18", "m_cowos", "m_hbm3e", "f_ajinomoto", "x_spruce"],
    people: ["huang", "buck", "kress", "wei_cc", "kwak"],
    money: [["Nvidia data center revenue, one quarter", "$89B (Q2 FY27)"], ["Typical gross margin", "~70%+"], ["Cost of a 1 GW GB200-class campus", "~$35–50B all-in"]],
    sources: [["Nvidia GB200 NVL72 product page", "https://www.nvidia.com/en-us/data-center/gb200-nvl72/"], ["Nvidia Q2 FY27 results coverage (HotHardware)", "https://hothardware.com/news/nvidias-ai-empire-crushes-q2-estimates-data-center-demand"]]
  });

  T.push({
    id: "rubin", name: "Nvidia Vera Rubin", maker: "Nvidia", kind: "Next-gen AI rack", node: "c_vr",
    tagline: "Shipping since August 2026: HBM4, 3 nm, and an 88-core CPU.",
    facts: [["GPU memory", "288 GB HBM4"], ["Bandwidth", "~22 TB/s per GPU"], ["FP4", "~50 PFLOPS per GPU (inference)"], ["Transistors", "~336B per GPU"], ["Process", "TSMC 3 nm class"], ["CPU", "Vera, 88 Arm cores"]],
    why: "Each Nvidia generation since 2016 has been 'one year, one architecture'. Rubin roughly triples inference throughput per GPU versus Blackwell Ultra, which is what lets labs serve bigger reasoning models at lower cost per answer.",
    ladder: [
      { scale: 2.2, unit: "m", name: "NVL144 rack", see: "Same Oberon-style rack footprint as GB200, now with 72 Rubin packages (144 GPU dies) and Vera CPUs.", made: "Liquid-cooled trays, NVLink 6 switch trays, 800 V DC power path in newer designs.", by: "Foxconn and other ODMs", node: "f_foxconn" },
      { scale: 0.1, unit: "m", name: "Rubin package", see: "Two reticle-size compute dies plus I/O chiplets, surrounded by eight HBM4 stacks.", made: "CoWoS-L on a larger interposer; bigger ABF substrate.", by: "TSMC advanced packaging", node: "m_cowos" },
      { scale: 0.012, unit: "m", name: "HBM4 stack", see: "12–16 DRAM layers on a logic base die with a 2,048-bit interface: twice as many wires as HBM3E.", made: "DRAM on 1b/1c-nm class nodes; base die from TSMC (for SK hynix).", by: "SK hynix (majority for Rubin per analysts), Samsung, Micron", node: "m_hbm4" },
      { scale: 0.028, unit: "m", name: "Rubin compute die", see: "~800 mm² of 3 nm logic.", made: "FinFET transistors at ~48 nm gate pitch, 15+ metal layers.", by: "TSMC Fab 18", node: "m_rubindie" },
      { scale: 4.8e-8, unit: "m", name: "3 nm FinFET", see: "TSMC's last FinFET node before nanosheets.", made: "Si fins, HfO₂, TiN/TiAl gates, W/Co contacts, Cu/Ru wires.", by: "ASML NXE EUV scanners", node: "f_asml" },
      { scale: 2.35e-10, unit: "m", name: "Atoms", see: "The same silicon lattice as every chip since the 1960s, now with a channel only a few dozen atoms across.", made: "Si, Hf, O, Ti, N, W, Co, Cu, Ru.", by: "", node: "r_polysi" }
    ],
    howWorks: [
      ["Reasoning tokens", "Modern models 'think' by generating thousands of hidden tokens. Rubin is tuned for this long-decode workload."],
      ["HBM4 feeds the cores", "Decoding is memory-bound: every new token re-reads the weights. 22 TB/s bandwidth is the headline number for a reason."],
      ["NVLink 6", "Doubles GPU-to-GPU bandwidth so huge mixture-of-experts models can route tokens to experts on other GPUs."],
      ["Vera CPU", "Handles orchestration, KV-cache offload and tool calls next to the GPUs, linked by NVLink-C2C."]
    ],
    howMade: [
      ["3 nm wafers", "TSMC N3 wafers in Tainan, ~3+ months in the fab.", "f_tsmc18"],
      ["HBM4 stacks", "SK hynix front-end in Icheon/Cheongju, logic base die from TSMC, stacked in Korea.", "f_hynix_m15x"],
      ["CoWoS-L", "TSMC packaging at AP6/AP8.", "f_tsmc_ap"],
      ["Rack build", "ODM assembly in Taiwan, Mexico and Texas.", "f_foxconn"]
    ],
    elements: [["Si", "Dies, interposer, bridges"], ["Hf", "Gate insulator"], ["Cu", "Interconnect, cooling"], ["Ru", "Liners in the finest wires"], ["W", "Contacts"], ["Sn", "Solder bumps"], ["In", "Thermal interface (some designs)"], ["Ga", "GaN power stages"]],
    chokepoints: ["m_hbm4", "m_cowos", "f_tsmc18", "f_asml"],
    people: ["huang", "kress", "buck"],
    money: [["Nvidia Q3 FY27 guidance", "$108B ± 2%"], ["CFO on supply", "Constrained through FY2028 or longer"]],
    sources: [["Nvidia GTC 2026 recap (Bizon)", "https://bizon-tech.com/blog/nvidia-gtc-2026-key-announcements"], ["HotHardware on Q2 FY27", "https://hothardware.com/news/nvidias-ai-empire-crushes-q2-estimates-data-center-demand"]]
  });

  T.push({
    id: "hbm", name: "High-Bandwidth Memory (HBM)", maker: "SK hynix · Samsung · Micron", kind: "Memory stack", node: "m_hbm4",
    tagline: "A skyscraper of memory chips, drilled through with copper.",
    facts: [["HBM3E", "8–12 dies, 24–36 GB, ~1.2 TB/s"], ["HBM4", "Up to 16 dies, up to 64 GB, 2,048-bit bus"], ["Die thickness", "~30–50 µm (thinner than a hair)"], ["TSVs", "Thousands per die"], ["Makers", "3 companies on Earth"], ["Share", "SK hynix ~50–58% (H1 2026)"]],
    why: "AI is limited less by how fast chips can multiply than by how fast they can fetch numbers. HBM puts memory millimetres from the GPU with thousands of parallel wires. Every AI accelerator, Nvidia or not, depends on these three companies.",
    ladder: [
      { scale: 0.012, unit: "m", name: "The stack", see: "A black rectangle ~11 × 11 mm, about 0.7 mm tall, sitting next to the GPU.", made: "DRAM dies + base die + molded underfill.", by: "SK hynix, Samsung, Micron", node: "m_hbm4" },
      { scale: 7.5e-4, unit: "m", name: "A cross-section", see: "Up to 16 dies, each ground to ~30 µm, glued by microbumps or (from HBM4E) direct copper hybrid bonds.", made: "Silicon, copper pillars, tin-silver solder, non-conductive film.", by: "Thermo-compression bonders (Hanmi, ASMPT, Hanwha)", node: "f_hanmi" },
      { scale: 5e-6, unit: "m", name: "Through-silicon via", see: "A copper-filled hole drilled straight through each die, ~5 µm wide, carrying signals up the stack.", made: "Deep reactive-ion etch, liner, barrier (Ta/TaN), copper fill.", by: "Lam Research etch, AMAT deposition", node: "f_lam" },
      { scale: 1e-7, unit: "m", name: "DRAM cell array", see: "Billions of 1-transistor/1-capacitor cells. Each stores one bit as a tiny charge.", made: "Buried word-line transistor plus a tall capacitor.", by: "1b/1c-nm DRAM process", node: "f_hynix_m15x" },
      { scale: 1e-8, unit: "m", name: "The capacitor", see: "A pillar dozens of times taller than wide, coated in a high-k dielectric.", made: "Zirconium oxide / hafnium oxide dielectric, TiN electrodes.", by: "Atomic-layer deposition", node: "r_hafnium" },
      { scale: 1e-15, unit: "C", name: "One bit", see: "A few femtocoulombs: on the order of thousands of electrons. It leaks away, so every cell is refreshed every ~32–64 ms.", made: "Electrons.", by: "" }
    ],
    howWorks: [
      ["Wide, not fast", "A DDR5 chip has a 64-bit bus. An HBM4 stack has 2,048 bits, so it moves far more per clock at lower power."],
      ["Short wires", "The stack sits on the same interposer as the GPU; signals travel millimetres, not centimetres."],
      ["Refresh", "DRAM forgets: capacitors leak, so the controller re-writes every row constantly."]
    ],
    howMade: [
      ["DRAM wafers", "Front-end DRAM fabs in Icheon, Pyeongtaek, Hiroshima, Taichung, using EUV on the latest nodes.", "f_hynix_m15x"],
      ["Base die", "For HBM4, a logic die (TSMC for SK hynix; Samsung's own foundry for Samsung).", "f_tsmc18"],
      ["TSV and thinning", "Drill vias, back-grind wafers to ~30–50 µm on carriers.", "f_lam"],
      ["Stack and bond", "Dies stacked one by one with thermo-compression bonding (MR-MUF at SK hynix).", "f_hanmi"],
      ["Test", "Known-good stacks shipped to TSMC for CoWoS.", "f_tsmc_ap"]
    ],
    elements: [["Si", "Dies"], ["Cu", "TSVs, pillars"], ["Sn", "Microbumps"], ["Ag", "Solder alloy"], ["Ta", "TSV barrier"], ["Zr", "Capacitor dielectric"], ["Hf", "Capacitor and gate dielectric"], ["Ti", "TiN electrodes"], ["W", "Word lines"]],
    chokepoints: ["m_hbm4", "f_hynix_m15x", "f_hanmi"],
    people: ["kwak", "chey", "jun_youngh", "mehrotra"],
    money: [["HBM share Q1 → Q2 2026", "SK hynix 58%→50%, Samsung 21%→33%, Micron 21%→18% (Counterpoint)"], ["HBM vs regular DRAM", "Several times the price per bit"]],
    sources: [["Silicon Analysts: HBM4 market share race", "https://siliconanalysts.com/analysis/hbm4-market-share-race-2026"]]
  });

  T.push({
    id: "cowos", name: "CoWoS advanced packaging", maker: "TSMC", kind: "Packaging process", node: "m_cowos",
    tagline: "Where a GPU becomes a GPU: dies and memory married on silicon.",
    facts: [["Name", "Chip-on-Wafer-on-Substrate"], ["Variants", "CoWoS-S, -R, -L"], ["Interposer size", "Several reticles"], ["Growth", "TSMC: ~80% CAGR 2022–27"], ["AP8", "40k+ wafers/month by late 2026 (DigiTimes)"], ["Next", "SoIC 3D stacking, panel-level, glass cores"]],
    why: "Chips got too big for one die and memory had to move closer. CoWoS lets several dies and HBM stacks talk at terabytes per second. From 2023 to 2025 it was the single tightest bottleneck: Nvidia could get wafers but not enough packaging.",
    ladder: [
      { scale: 0.1, unit: "m", name: "Finished package", see: "A substrate the size of a coaster with a metal lid.", made: "ABF substrate, interposer, dies, HBM, lid.", by: "TSMC AP sites; Amkor/ASE overflow", node: "f_tsmc_ap" },
      { scale: 0.06, unit: "m", name: "Interposer / bridges", see: "CoWoS-L uses small 'local silicon interconnect' bridges inside an organic layer instead of one huge silicon slab.", made: "Silicon bridges with fine copper wiring, redistribution layers.", by: "TSMC", node: "m_cowos" },
      { scale: 1e-3, unit: "m", name: "Substrate layers", see: "~20 layers of copper traces in ABF film around a glass-fibre core.", made: "ABF (Ajinomoto), T-glass cloth (Nittobo), copper.", by: "Ibiden, Unimicron", node: "m_abf" },
      { scale: 3e-5, unit: "m", name: "Microbumps", see: "Tens of thousands of solder bumps ~25–40 µm apart join each die to the interposer.", made: "Copper pillars capped with tin-silver solder.", by: "Plating and reflow", node: "r_tin" },
      { scale: 1e-6, unit: "m", name: "Redistribution wires", see: "Copper lines ~1–2 µm wide fan signals between GPU and HBM.", made: "Electroplated copper in polymer.", by: "", node: "r_copper" },
      { scale: 2.56e-10, unit: "m", name: "Copper atoms", see: "Copper's lattice spacing ~0.256 nm; electromigration at high current slowly pushes these atoms along the wire.", made: "Cu (29).", by: "", node: "x_escondida" }
    ],
    howWorks: [
      ["Side by side", "Dies and memory sit next to each other with ~thousands of short wires instead of a few long ones."],
      ["Bridges", "Only the areas that need ultra-dense wires get silicon bridges; the rest is cheaper organic material."],
      ["Fan-out to the board", "The substrate spreads connections to a few thousand balls that solder to the server board."]
    ],
    howMade: [
      ["Bridge and RDL fabrication", "TSMC makes silicon bridges and builds redistribution layers on a carrier wafer.", "f_tsmc_ap"],
      ["Chip-on-wafer", "Known-good GPU dies and HBM stacks are bonded onto the wafer.", "f_tsmc_ap"],
      ["Mold and thin", "Gaps filled, back side ground.", "f_tsmc_ap"],
      ["On-substrate", "The assembly is cut and attached to the ABF substrate, lidded and tested.", "f_ibiden"]
    ],
    elements: [["Si", "Bridges, dies"], ["Cu", "Wires, pillars"], ["Sn", "Solder"], ["Ag", "Solder alloy"], ["Ni", "Barrier"], ["Au", "Finish"], ["C", "Epoxy, ABF"], ["O", "Glass, oxides"]],
    chokepoints: ["f_tsmc_ap", "f_ajinomoto", "f_nittobo"],
    people: ["wei_cc", "huang"],
    money: [["TSMC AI accelerator revenue", "Fastest-growing segment; mid-40s% CAGR guided"], ["CoWoS price", "Tens of thousands of dollars per wafer"]],
    sources: [["Tom's Hardware: TSMC fab expansion roadmap (Jun 2026)", "https://www.tomshardware.com/tech-industry/semiconductors/analyzing-tsmcs-fab-expansion-roadmap-multi-fab-n2-ramp-cowos-soic-and-uncorking-bottlenecks"]]
  });

  T.push({
    id: "euv", name: "ASML EUV lithography scanner", maker: "ASML · Zeiss · Cymer · Trumpf", kind: "Chip-making machine", node: "f_asml",
    tagline: "A machine that makes light by blowing up tin, 50,000 times a second.",
    facts: [["Wavelength", "13.5 nm"], ["Price", "~€200M (NXE) to ~€380M (High-NA EXE)"], ["Weight", "~150–180 t"], ["Shipping", "~250 crates, multiple 747 loads"], ["Mirrors", "Smoothest surfaces humans make"], ["Makers", "One company"]],
    why: "To print features of a few dozen nanometres you need light with a wavelength near that size. Only ASML, after ~20 years and help from Intel, Samsung and TSMC, got 13.5 nm 'extreme ultraviolet' light working in production. Every leading AI chip passes through these machines dozens of times.",
    ladder: [
      { scale: 15, unit: "m", name: "The machine", see: "About the size of a bus, inside a cleanroom, connected to a separate laser room below.", made: "Light source, illuminator, reticle stage, projection optics, wafer stages.", by: "ASML Veldhoven", node: "f_asml" },
      { scale: 2, unit: "m", name: "Drive laser", see: "A CO₂ laser amplifier of 20+ kW, built from thousands of parts.", made: "CO₂ gas, optics, RF power.", by: "Trumpf", node: "f_trumpf" },
      { scale: 0.5, unit: "m", name: "Mirrors", see: "EUV is absorbed by air and glass, so everything is in vacuum and every optic is a mirror.", made: "~40–50 alternating molybdenum and silicon layers, each a few nanometres thick, reflecting ~70% per mirror.", by: "Zeiss Oberkochen", node: "f_zeiss" },
      { scale: 2.5e-5, unit: "m", name: "Tin droplet", see: "Molten tin droplets ~25 µm wide fall through a vessel; a pre-pulse flattens each, then the main pulse turns it into plasma at ~200,000 °C that emits 13.5 nm light.", made: "Sn (50).", by: "Cymer (ASML) San Diego", node: "f_cymer" },
      { scale: 1.35e-8, unit: "m", name: "The light", see: "A 13.5 nm photon carries ~92 eV, enough to ionise atoms in the photoresist.", made: "Photons from tin ions (Sn⁸⁺–Sn¹²⁺).", by: "" },
      { scale: 1e-9, unit: "m", name: "Photoresist molecules", see: "Resist molecules react where light lands, writing the pattern; stochastic 'shot noise' of few photons is now a key limit.", made: "Polymers or tin-oxide clusters.", by: "JSR, TOK, Shin-Etsu", node: "r_resist" }
    ],
    howWorks: [
      ["Make light", "Laser hits tin droplet, tin becomes plasma, plasma glows at 13.5 nm."],
      ["Collect and shape", "A collector mirror gathers light; the illuminator shapes it."],
      ["Reflect off the mask", "The pattern sits on a reflective mask (reticle)."],
      ["Shrink 4×", "Projection mirrors shrink the image 4× (8× in one direction for High-NA) onto the wafer."],
      ["Step and scan", "Stages moving at several g's scan each field, aligned to better than a nanometre, ~150+ wafers per hour."]
    ],
    howMade: [
      ["Optics", "Zeiss polishes and coats mirrors over many months.", "f_zeiss"],
      ["Source", "Cymer builds the tin vessel; Trumpf the laser.", "f_cymer"],
      ["Integration", "Assembled and tested in Veldhoven, then disassembled and flown to the fab.", "f_asml"],
      ["Install", "Months of re-assembly and qualification in the customer cleanroom.", "f_tsmc18"]
    ],
    elements: [["Sn", "Light source fuel"], ["Mo", "Mirror multilayers"], ["Si", "Mirror multilayers, wafers"], ["Ru", "Mirror capping layer"], ["H", "Hydrogen gas cleans tin off optics"], ["C", "CO₂ laser gas"], ["N", "Laser gas mix"], ["He", "Laser gas mix"]],
    chokepoints: ["f_asml", "f_zeiss", "f_trumpf"],
    people: ["fouquet", "van_den_brink"],
    money: [["ASML 2025 revenue", "~€32–33B"], ["High-NA EXE:5200", "~€380M each"]],
    sources: [["ASML: EUV lithography systems", "https://www.asml.com/en/products/euv-lithography-systems"]]
  });

  T.push({
    id: "transistor", name: "A 2 nm transistor", maker: "TSMC · Samsung · Intel", kind: "The switch inside every chip", node: "m_n2die",
    tagline: "From beach sand to a switch a few dozen atoms wide.",
    facts: [["Type", "Gate-all-around nanosheet"], ["Process", "TSMC N2 (2025–26), A16 next"], ["Steps", "1,000+ process steps"], ["Fab time", "~3–4 months per wafer"], ["Wafer cost", "~$30,000 (reported, N2)"], ["Per chip", "Tens to hundreds of billions"]],
    why: "Every AI calculation is a transistor turning on or off. Making them smaller cuts energy per operation; that is the whole reason we can afford AI at all.",
    ladder: [
      { scale: 0.3, unit: "m", name: "300 mm wafer", see: "A mirror-polished silicon disc holding a few dozen big AI dies or hundreds of phone chips.", made: "Single-crystal silicon.", by: "Shin-Etsu, SUMCO", node: "f_shinetsu" },
      { scale: 1e-2, unit: "m", name: "A die", see: "One chip, after dicing.", made: "Transistors + 15–20 wiring layers.", by: "TSMC Fab 20/22", node: "f_tsmc_n2" },
      { scale: 1e-6, unit: "m", name: "Metal stack", see: "Copper wires get wider going up; the bottom ones are ~10–12 nm wide. A16 adds power wires on the back side.", made: "Cu, Co, Ru, low-k dielectric.", by: "AMAT, Lam", node: "f_amat" },
      { scale: 4.5e-8, unit: "m", name: "Nanosheet transistor", see: "Three or four horizontal silicon ribbons stacked like a sandwich, each wrapped on all four sides by the gate.", made: "Si sheets, SiGe sacrificial layers (removed), HfO₂, work-function metals.", by: "Epitaxy, EUV, selective etch", node: "f_asml" },
      { scale: 5e-9, unit: "m", name: "One nanosheet", see: "~5 nm thick: roughly 20 silicon atoms.", made: "Si.", by: "", node: "r_polysi" },
      { scale: 2.35e-10, unit: "m", name: "Atoms", see: "At this scale, a few misplaced dopant atoms change how a transistor behaves; variability is the enemy.", made: "Si, Ge, Hf, O, Ti, N, B, P.", by: "", node: "r_polysi" }
    ],
    howWorks: [
      ["Gate voltage", "A small voltage on the gate pulls electrons into the channel (on) or pushes them away (off)."],
      ["All-around control", "Wrapping the gate on all sides stops leakage that plagued FinFETs at small sizes."],
      ["Logic", "Billions of these switches combine into adders and multipliers that do matrix math."]
    ],
    howMade: [
      ["Purify silicon", "Quartz → metallurgical Si → trichlorosilane → 11N polysilicon.", "f_wacker"],
      ["Grow the crystal", "Czochralski pulling in a Spruce Pine quartz crucible.", "f_shinetsu"],
      ["Stack Si/SiGe layers", "Epitaxy grows alternating silicon and silicon-germanium.", "f_amat"],
      ["Pattern with EUV", "Fins and gates printed with EUV, often with multiple exposures.", "f_asml"],
      ["Release the sheets", "SiGe is etched away selectively, leaving floating silicon ribbons.", "f_lam"],
      ["Gate all around", "HfO₂ and metal deposited atom by atom around each sheet (ALD).", "f_tel"],
      ["Wire it up", "Contacts and 15+ copper layers; inspected at every step.", "f_kla"]
    ],
    elements: [["Si", "Channel"], ["Ge", "Sacrificial SiGe layers, strain"], ["Hf", "Gate dielectric"], ["O", "Oxides"], ["Ti", "TiN gate metal"], ["Al", "Work-function tuning"], ["W", "Contacts"], ["Co", "Contacts / liners"], ["Ru", "Liners"], ["Cu", "Wires"], ["B", "Dopant"], ["P", "Dopant"], ["F", "Etch chemistry"], ["Ne", "DUV laser gas"], ["He", "Wafer cooling"]],
    chokepoints: ["f_asml", "f_tsmc_n2", "x_spruce", "f_resist"],
    people: ["wei_cc", "fouquet", "lip_bu_tan"],
    money: [["TSMC 2026 capex guidance", "~$52–56B"], ["N2/A16 capacity growth", "~70% CAGR through 2028 (TSMC)"]],
    sources: [["Tom's Hardware: TSMC roadmap", "https://www.tomshardware.com/tech-industry/semiconductors/analyzing-tsmcs-fab-expansion-roadmap-multi-fab-n2-ramp-cowos-soic-and-uncorking-bottlenecks"]]
  });
})(window.AI);
