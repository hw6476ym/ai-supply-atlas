/* AI SUPPLY GRAPH — part C: tier 6 (fabs, plants, tools), 7 (materials), 8 (sources & power) */
(function (AI) {
  const n = AI.n;

  /* ------------------------------------------------------------------ TIER 6 */
  n("f_tsmc18", "TSMC Fab 18", 6, { loc: "Tainan, Taiwan", owner: "TSMC", lat: 23.11, lon: 120.27, flags: ["🔒 leading-edge chokepoint", "⚠ Taiwan Strait risk"],
    noAlt: "Almost every frontier AI accelerator die (Blackwell, Rubin, TPU, Trainium, MI355X) is printed at TSMC's 5 nm and 3 nm fabs in southern Taiwan.",
    workaround: "TSMC Arizona Fab 21 makes N4 today and targets N3 in 2027; Samsung and Intel 18A/14A are courting AI customers; Tesla split AI5 across TSMC and Samsung. None replaces Taiwan volume before ~2028.",
    desc: "GigaFab making N5/N4 and N3; home of Blackwell's 4NP silicon and Rubin's 3 nm dies." });
  n("f_tsmc_n2", "TSMC Fab 20 & 22 (N2/A16)", 6, { loc: "Hsinchu & Kaohsiung, Taiwan", owner: "TSMC", lat: 22.7, lon: 120.3, desc: "2 nm gate-all-around production ramping across Hsinchu and Kaohsiung in 2026." });
  n("f_tsmc_az", "TSMC Arizona Fab 21", 6, { loc: "Phoenix, Arizona, USA", owner: "TSMC", lat: 33.75, lon: -112.1, cap: "N4 now; N3 Q3 2027; N2/A16 later", desc: "First US Blackwell wafers came off this line in 2025, but they still flew back to Taiwan for packaging." });
  n("f_tsmc_ap", "TSMC advanced packaging (AP6/AP7/AP8)", 6, { loc: "Zhunan, Chiayi & Tainan, Taiwan", owner: "TSMC", lat: 24.68, lon: 120.88, flags: ["🔒 CoWoS bottleneck"],
    noAlt: "TSMC does the large majority of CoWoS packaging for AI accelerators worldwide.",
    workaround: "Amkor, ASE/SPIL and Intel Foundry offer overflow packaging; Amkor and TSMC are adding Arizona packaging. Glass and panel-level substrates are the next attempt to break the limit.",
    desc: "AP8 (a converted LCD fab) heads for 40k+ CoWoS wafers/month by late 2026; AP7 in Chiayi becomes the largest packaging campus." });
  n("f_hynix_m15x", "SK hynix M15X & M16", 6, { loc: "Cheongju & Icheon, South Korea", owner: "SK hynix", lat: 36.63, lon: 127.49, flags: ["🔒 HBM leader"],
    noAlt: "SK hynix has supplied most of Nvidia's HBM since 2023.",
    workaround: "Samsung qualified HBM3E 12-high and shipped HBM4 from Feb 2026; Micron ramps from Hiroshima and Taiwan. Three suppliers, none spare.",
    desc: "Front-end DRAM wafers (M16) and the dedicated HBM fab M15X, then TSV stacking and test." });
  n("f_samsung_p", "Samsung Pyeongtaek & Cheonan", 6, { loc: "Pyeongtaek & Cheonan, South Korea", owner: "Samsung", lat: 37.02, lon: 127.05, desc: "World's largest semiconductor complex; DRAM, HBM4 and foundry lines. Samsung's Taylor, Texas fab will make Tesla AI chips." });
  n("f_micron", "Micron Hiroshima & Taichung", 6, { loc: "Hiroshima, Japan · Taichung, Taiwan", owner: "Micron", lat: 34.4, lon: 132.5, desc: "Micron's HBM front end and stacking; new US fabs in Idaho and New York come later in the decade." });
  n("f_smic", "SMIC SN2 (Shanghai)", 6, { loc: "Shanghai, China", owner: "SMIC", lat: 31.2, lon: 121.6, flags: ["⚠ no EUV access"], desc: "Makes Huawei Ascend chips on 7 nm and N+3 (5 nm-class) using DUV multi-patterning, with lower yields and higher cost." });
  n("f_ibiden", "Ibiden Ogaki", 6, { loc: "Ogaki, Gifu, Japan", owner: "Ibiden", lat: 35.36, lon: 136.6, desc: "Top maker of the large ABF substrates Nvidia uses." });
  n("f_innolight", "InnoLight Suzhou & Thailand", 6, { loc: "Suzhou, China · Thailand", owner: "InnoLight", lat: 31.3, lon: 120.6, desc: "World's largest maker of 800G/1.6T optical modules; shifting capacity to Thailand for US customers." });
  n("f_coherent", "Coherent Sherman", 6, { loc: "Sherman, Texas, USA", owner: "Coherent", lat: 33.64, lon: -96.6, desc: "6-inch indium phosphide fab for the lasers inside AI optics." });
  n("f_foxconn", "Foxconn AI server plants", 6, { loc: "Guadalajara, Mexico · Houston, USA · Taiwan", owner: "Foxconn", lat: 20.67, lon: -103.35, desc: "Assembles a large share of GB200/GB300 racks; building Nvidia supercomputer plants in Texas." });
  n("f_quanta", "Quanta & Wistron/Wiwynn", 6, { loc: "Taiwan · Mexico · Texas", owner: "Quanta · Wistron", lat: 25.0, lon: 121.4, desc: "Other main rack and server assemblers for Nvidia, Google and AWS." });
  n("f_asml", "ASML Veldhoven", 6, { loc: "Veldhoven, Netherlands", owner: "ASML", lat: 51.41, lon: 5.42, teardown: "euv", flags: ["🔒 sole EUV maker"],
    noAlt: "ASML is the only company that makes EUV lithography scanners. No leading-edge AI chip can be made without one.",
    workaround: "None at 3 nm and below. China's SMIC stretches older DUV scanners with multi-patterning; Canon nanoimprint and Chinese EUV efforts are years behind.",
    desc: "Builds every EUV scanner on Earth, ~€200M (low-NA) to ~€380M (High-NA EXE) each, shipped in 250+ crates." });
  n("f_zeiss", "Zeiss SMT Oberkochen", 6, { loc: "Oberkochen, Germany", owner: "Carl Zeiss", lat: 48.78, lon: 10.1, flags: ["🔒 sole EUV optics"],
    noAlt: "Zeiss makes the only mirrors flat enough for EUV: if scaled to Germany, the biggest bump would be under a millimetre.", workaround: "None.",
    desc: "Makes the multilayer molybdenum/silicon mirrors inside every EUV scanner." });
  n("f_cymer", "Cymer San Diego", 6, { loc: "San Diego, California, USA", owner: "ASML", lat: 32.9, lon: -117.2, desc: "Builds the EUV light source: tin droplets hit by a laser 50,000 times a second." });
  n("f_trumpf", "Trumpf Ditzingen", 6, { loc: "Ditzingen, Germany", owner: "Trumpf", lat: 48.83, lon: 9.07, flags: ["🔒 sole drive laser"], desc: "Makes the 20+ kW CO2 laser amplifier that vaporises the tin." });
  n("f_amat", "Applied Materials", 6, { loc: "Santa Clara, USA · Austin · Singapore", owner: "Applied Materials", lat: 37.38, lon: -121.97, desc: "Deposition, etch and inspection tools; the largest chip-equipment company." });
  n("f_lam", "Lam Research", 6, { loc: "Fremont, USA", owner: "Lam Research", lat: 37.5, lon: -121.95, desc: "Etch and deposition; dominant in high-aspect-ratio etch for memory and HBM TSVs." });
  n("f_tel", "Tokyo Electron", 6, { loc: "Tokyo & Kumamoto, Japan", owner: "Tokyo Electron", lat: 35.68, lon: 139.75, desc: "Coater-developer tracks paired with every EUV scanner (near-monopoly), plus etch and cleaning." });
  n("f_kla", "KLA", 6, { loc: "Milpitas, USA", owner: "KLA", lat: 37.43, lon: -121.9, desc: "Inspection and metrology: finds defects a few nanometres wide." });
  n("f_hanmi", "Hanmi & ASMPT bonders", 6, { loc: "Incheon, South Korea · Singapore", owner: "Hanmi Semiconductor · ASMPT · Hanwha", lat: 37.45, lon: 126.7, desc: "Thermo-compression bonders that stack HBM dies; hybrid bonding comes with HBM4E/HBM5." });
  n("f_shinetsu", "Shin-Etsu & SUMCO wafer plants", 6, { loc: "Japan (Gunma, Saga) · Taiwan", owner: "Shin-Etsu · SUMCO", lat: 36.3, lon: 139.0, flags: ["⚠ ~55% of 300mm wafers from two Japanese firms"],
    desc: "Grow 300 mm single-crystal silicon ingots and slice them into the polished wafers every chip starts from." });
  n("f_resist", "JSR, TOK & Shin-Etsu photoresist", 6, { loc: "Japan", owner: "JSR · Tokyo Ohka · Shin-Etsu · Sumitomo", lat: 35.4, lon: 139.5, flags: ["⚠ Japan ~90% of EUV resist"],
    desc: "Light-sensitive chemicals the scanner patterns. Japan dominates EUV resists." });
  n("f_ajinomoto", "Ajinomoto Fine-Techno", 6, { loc: "Kawasaki, Japan", owner: "Ajinomoto", lat: 35.53, lon: 139.7, flags: ["🔒 near-monopoly on ABF film"],
    noAlt: "Ajinomoto (the MSG company) supplies nearly all Build-up Film used in high-end chip substrates.", workaround: "Sekisui and Taiyo Ink are qualifying alternatives; glass-core substrates are the long-term route around it.",
    desc: "Turned a by-product of seasoning chemistry into the insulating film inside every AI chip package." });
  n("f_nittobo", "Nittobo glass cloth", 6, { loc: "Fukushima, Japan", owner: "Nitto Boseki", lat: 37.4, lon: 140.4, flags: ["🔒 T-glass shortage 2025–26"],
    noAlt: "Nittobo makes most of the low-expansion 'T-glass' fibre cloth used in high-end substrate cores.", workaround: "Capacity expansions in Japan and Taiwan; slow to qualify.",
    desc: "Woven glass fibre that keeps big substrates from warping when they heat up." });
  n("f_wacker", "Wacker Burghausen & Hemlock", 6, { loc: "Burghausen, Germany · Hemlock, Michigan, USA", owner: "Wacker · Hemlock Semiconductor", lat: 48.17, lon: 12.83,
    desc: "Make electronic-grade polysilicon at 'eleven nines' purity: 99.999999999% silicon." });
  n("f_gev", "GE Vernova Greenville", 6, { loc: "Greenville, South Carolina, USA", owner: "GE Vernova", lat: 34.85, lon: -82.4, desc: "Builds heavy-duty gas turbines; order book stretches years out because of data centers." });
  n("f_vertiv", "Vertiv plants", 6, { loc: "Ohio, USA · India · China · Europe", owner: "Vertiv", lat: 39.96, lon: -83.0, desc: "Power and thermal gear for AI halls, co-designed with Nvidia reference designs." });
  n("f_hitachi_energy", "Hitachi Energy transformer works", 6, { loc: "Sweden · USA (South Boston, VA) · India", owner: "Hitachi Energy", lat: 36.7, lon: -78.9, desc: "Largest transformer maker; multi-billion-dollar expansion driven by data-center demand." });
  n("f_tesla_act", "Tesla Fremont & Austin robot lines", 6, { loc: "Fremont, California & Austin, Texas, USA", owner: "Tesla", lat: 37.49, lon: -121.94, desc: "Pilot lines for Optimus actuators and hands." });
  n("f_essilux", "EssilorLuxottica", 6, { loc: "Italy · China · Thailand", owner: "EssilorLuxottica", lat: 46.15, lon: 12.2, desc: "Makes the frames and lenses for Ray-Ban Meta; Meta took a minority stake in 2025." });

  /* ------------------------------------------------------------------ TIER 7 */
  n("r_polysi", "Electronic-grade polysilicon", 7, { el: ["Si"], desc: "Silicon purified to 11N (one stray atom per 100 billion) via the Siemens trichlorosilane process." });
  n("r_quartz", "High-purity quartz crucibles", 7, { el: ["Si", "O"], flags: ["🔒 single region"], desc: "The quartz bowls that hold molten silicon while ingots are pulled. The purest quartz comes from one place in North Carolina." });
  n("r_resist", "EUV photoresist", 7, { el: ["C", "H", "O", "S", "F", "Sn"], desc: "Chemically amplified resists, and newer metal-oxide (tin-based) resists for finer lines." });
  n("r_neon", "Neon & excimer gases", 7, { el: ["Ne", "Ar", "Kr", "F"], desc: "Neon carries the ArF/KrF lasers in DUV scanners; about half once came from Ukrainian purifiers fed by Russian steel mills." });
  n("r_helium", "Helium", 7, { el: ["He"], flags: ["⚠ few sources"], desc: "Cools wafers and purges tools. Comes out of natural gas fields; there is no substitute in many steps." });
  n("r_fluor", "Fluorine chemicals (HF, NF3, WF6)", 7, { el: ["F", "H", "N", "W"], desc: "Etch, clean and deposit. Hydrofluoric acid starts from fluorspar, mostly mined in China." });
  n("r_copper", "Copper (electroplating & cable)", 7, { el: ["Cu"], desc: "Wires every chip (up to ~15 metal layers), every cable and every busbar. A 1 GW site uses thousands of tonnes." });
  n("r_hafnium", "Hafnium oxide precursors", 7, { el: ["Hf", "O"], desc: "Hafnium is the 'high-k' insulator under every transistor gate since 2007. It is a by-product of refining nuclear-grade zirconium." });
  n("r_cobalt", "Cobalt & ruthenium liners", 7, { el: ["Co", "Ru"], desc: "Thin metal liners and contacts in the smallest wires, where copper alone would fail." });
  n("r_tungsten", "Tungsten", 7, { el: ["W"], desc: "Fills the vertical contacts between transistors and the first metal layer." });
  n("r_tantalum", "Tantalum", 7, { el: ["Ta"], desc: "Barrier layers that stop copper from leaking into silicon; comes from coltan ore." });
  n("r_tin", "Tin (solder & EUV fuel)", 7, { el: ["Sn"], desc: "Micro-bumps join chips to packages; and molten tin droplets are the EUV light source." });
  n("r_gallium", "Gallium", 7, { el: ["Ga"], flags: ["⚠ ~98% refined in China; export-licensed since 2023"], desc: "In GaN power transistors for rack power and in laser compounds." });
  n("r_germanium", "Germanium", 7, { el: ["Ge"], flags: ["⚠ China export controls"], desc: "In silicon-germanium for photodetectors and fast transistors, and in fibre-optic glass." });
  n("r_inp", "Indium phosphide", 7, { el: ["In", "P"], desc: "The semiconductor that makes the lasers in optical transceivers. Indium is a by-product of zinc refining." });
  n("r_abf", "ABF resin & glass cloth", 7, { el: ["C", "H", "O", "Si"], desc: "Epoxy-based build-up film plus woven glass fibre." });
  n("r_gold", "Gold & silver", 7, { el: ["Au", "Ag"], desc: "Contact plating, bond finishes and silver-loaded solders." });
  n("r_go_steel", "Grain-oriented electrical steel", 7, { el: ["Fe", "Si"], flags: ["⚠ one US maker"], desc: "Special steel whose crystals line up to cut transformer losses; Cleveland-Cliffs is the only US producer." });
  n("r_superalloy", "Nickel superalloys", 7, { el: ["Ni", "Co", "Cr", "Re", "Al"], desc: "Single-crystal turbine blades that survive gas hotter than their own melting point." });
  n("r_magnet", "NdFeB magnets", 7, { el: ["Nd", "Pr", "Dy", "Tb", "Fe", "B"], flags: ["⚠ ~90% made in China; export-licensed 2025"], desc: "The strongest permanent magnets, inside every robot motor and cooling pump." });
  n("r_upw", "Ultrapure water", 7, { el: ["H", "O"], desc: "A big fab uses tens of thousands of tonnes a day, cleaned until it barely conducts electricity." });
  n("r_natgas", "Natural gas", 7, { el: ["C", "H"], desc: "The fastest way to power a new AI campus in the US today, via turbines and engines." });
  n("r_uranium", "Enriched uranium", 7, { el: ["U"], desc: "Fuel for nuclear plants signed to AI deals (Three Mile Island restart, Susquehanna, SMRs)." });
  n("r_aluminium", "Aluminium", 7, { el: ["Al"], desc: "Racks, heat sinks, busbars and the gallium by-product stream." });

  /* ------------------------------------------------------------------ TIER 8 */
  n("x_spruce", "Spruce Pine quartz", 8, { loc: "Spruce Pine, North Carolina, USA", owner: "Sibelco · The Quartz Corp", lat: 35.91, lon: -82.06, flags: ["🔒 near-sole source"],
    noAlt: "Spruce Pine supplies most of the ultra-high-purity quartz used for crucibles in which silicon ingots are grown.",
    workaround: "Synthetic quartz and Norwegian/Russian deposits cover some grades. Hurricane Helene (Sept 2024) shut the mines for weeks, a live test that the world passed narrowly.",
    desc: "A 3-mile patch of Appalachian granite with unusually pure quartz." });
  n("x_hemlock_sand", "Silicon metal smelters", 8, { loc: "China (Xinjiang, Yunnan) · Norway · Brazil · USA", owner: "Hoshine · Elkem · Ferroglobe", lat: 44.3, lon: 86.0, flags: ["⚠ China ~75%"], desc: "Arc furnaces reduce quartz with carbon to metallurgical silicon before purification." });
  n("x_qatar_he", "Ras Laffan helium", 8, { loc: "Ras Laffan, Qatar", owner: "QatarEnergy", lat: 25.9, lon: 51.55, desc: "About a third of the world's helium, separated from LNG." });
  n("x_us_he", "US helium fields", 8, { loc: "Kansas, Texas, Wyoming, USA", owner: "ExxonMobil (LaBarge) and others", lat: 42.3, lon: -110.2, desc: "The other big helium source; Korean and Taiwanese fabs import heavily." });
  n("x_neon", "Neon purifiers", 8, { loc: "Ukraine (historically) · China · USA · Korea", owner: "Cryoin · Ingas · Linde · POSCO", lat: 46.48, lon: 30.73, desc: "Neon is a by-product of steelmaking air-separation units; supply diversified after 2022." });
  n("x_fluorspar", "Fluorspar mines", 8, { loc: "Jiangxi & Inner Mongolia, China · Mexico", owner: "China Kings · Orbia", lat: 28.0, lon: 115.0, flags: ["⚠ China ~60%"], desc: "Calcium fluoride ore, the start of every fluorine chemical." });
  n("x_escondida", "Escondida & Chilean copper", 8, { loc: "Atacama, Chile", owner: "BHP · Codelco", lat: -24.27, lon: -69.07, desc: "World's largest copper mine; Chile and Peru supply ~40% of mined copper." });
  n("x_kolwezi", "Kolwezi cobalt", 8, { loc: "Lualaba, DR Congo", owner: "CMOC · Glencore", lat: -10.7, lon: 25.47, flags: ["⚠ DRC ~70% of cobalt"], desc: "Most cobalt in the world, including artisanal mining with labour abuses." });
  n("x_coltan", "Coltan mines", 8, { loc: "Eastern DR Congo · Rwanda · Brazil · Australia", owner: "Various", lat: -1.68, lon: 29.22, flags: ["⚠ conflict mineral"], desc: "Tantalum ore; parts of the trade fund armed groups." });
  n("x_china_w", "Jiangxi tungsten", 8, { loc: "Jiangxi, China", owner: "China Tungsten High-Tech and others", lat: 25.8, lon: 114.9, flags: ["⚠ China ~80%"], desc: "Most of the world's tungsten." });
  n("x_china_ga", "Chinese alumina refineries (gallium)", 8, { loc: "Shandong & Shanxi, China", owner: "Chalco and others", lat: 36.6, lon: 117.0, flags: ["🔒 ~98% of gallium"],
    noAlt: "China refines nearly all primary gallium as a by-product of alumina.", workaround: "Germany, Japan and Kazakhstan have restarted small recovery lines; a US plant is planned. Years to scale.",
    desc: "Gallium is skimmed from the caustic liquor used to make alumina." });
  n("x_yunnan_ge", "Yunnan germanium", 8, { loc: "Yunnan, China", owner: "Yunnan Germanium and others", lat: 25.0, lon: 102.7, desc: "Recovered from zinc ores and coal ash." });
  n("x_onsan", "Korea Zinc Onsan smelter", 8, { loc: "Ulsan, South Korea", owner: "Korea Zinc", lat: 35.43, lon: 129.35, desc: "One of the world's largest indium producers, recovered from zinc refining." });
  n("x_tin", "Tin mines", 8, { loc: "Yunnan, China · Bangka, Indonesia · Myanmar (Wa State)", owner: "Yunnan Tin · PT Timah", lat: -2.1, lon: 106.1, desc: "Tin comes largely from three countries, one of them a rebel-held region of Myanmar." });
  n("x_zircon", "Zircon sands (hafnium)", 8, { loc: "Australia · South Africa · then France & USA refining", owner: "Iluka · Tronox · Framatome · ATI", lat: -31.0, lon: 115.8, desc: "Hafnium is separated from zirconium, mostly in France and the US." });
  n("x_bayan", "Bayan Obo rare earths", 8, { loc: "Inner Mongolia, China", owner: "China Northern Rare Earth", lat: 41.78, lon: 109.97, flags: ["🔒 dominant rare-earth source"],
    noAlt: "China mines ~70% and processes ~90% of rare earths and makes most NdFeB magnets.", workaround: "MP Materials (Mountain Pass, now with US government backing), Lynas (Australia/Malaysia) and new magnet plants in the US and Japan.",
    desc: "The world's largest rare-earth mine." });
  n("x_gold", "Gold & silver mines", 8, { loc: "Worldwide", owner: "Newmont, Barrick and others", lat: 40.0, lon: -116.0, desc: "Tiny quantities per chip, enormous totals across the industry." });
  n("x_permian", "Permian & Haynesville gas", 8, { loc: "Texas & Louisiana, USA", owner: "Many producers", lat: 31.9, lon: -102.1, desc: "Shale gas powers much of the Texas and Louisiana AI build-out." });
  n("x_uranium", "Uranium mines", 8, { loc: "Kazakhstan · Canada · Namibia · Australia", owner: "Kazatomprom · Cameco", lat: 47.0, lon: 66.0, desc: "Kazakhstan supplies ~40% of mined uranium." });
  n("x_iron", "Iron ore", 8, { loc: "Pilbara, Australia · Brazil", owner: "Rio Tinto · BHP · Vale", lat: -22.3, lon: 118.0, desc: "For transformer steel, racks and buildings." });
  n("x_nickel", "Nickel & rhenium sources", 8, { loc: "Indonesia · Chile (rhenium from copper-moly)", owner: "Various", lat: -2.5, lon: 121.0, desc: "Indonesia now supplies over half of mined nickel; rhenium, rarer than gold, comes from Chilean copper." });
  n("x_bauxite", "Bauxite mines", 8, { loc: "Guinea · Australia", owner: "Various", lat: 10.5, lon: -14.0, desc: "Aluminium ore, and indirectly the source of gallium." });
  n("e_ercot", "ERCOT Texas grid", 8, { loc: "Texas, USA", owner: "ERCOT", lat: 31.0, lon: -97.5, desc: "Gas, wind and solar grid feeding Abilene, Milam and Shackelford; large-load requests passed 200 GW in 2025." });
  n("e_memphis", "Memphis gas turbines & TVA", 8, { loc: "Memphis, TN & Southaven, MS, USA", owner: "SpaceXAI · TVA · MLGW", lat: 35.1, lon: -90.05, flags: ["⚠ contested air permits"], desc: "Mobile gas turbines and the TVA grid power Colossus." });
  n("e_entergy", "Entergy Louisiana gas plants", 8, { loc: "Louisiana, USA", owner: "Entergy", lat: 32.4, lon: -91.7, desc: "Three new combined-cycle gas plants approved for Meta Hyperion." });
  n("e_crane", "Crane Clean Energy Center (TMI-1)", 8, { loc: "Middletown, Pennsylvania, USA", owner: "Constellation", lat: 40.15, lon: -76.72, desc: "Three Mile Island Unit 1, restarting for Microsoft under a 20-year deal." });
  n("e_susquehanna", "Susquehanna nuclear", 8, { loc: "Berwick, Pennsylvania, USA", owner: "Talen Energy", lat: 41.09, lon: -76.15, desc: "Sells ~1.9 GW to AWS under a long-term deal." });
  n("e_taipower", "Taipower grid", 8, { loc: "Taiwan", owner: "Taipower", lat: 23.7, lon: 121.0, flags: ["⚠ TSMC ≈ 9% of Taiwan's power"], desc: "Mostly imported LNG and coal; every leading-edge AI chip begins here." });
  n("e_kepco", "KEPCO grid", 8, { loc: "South Korea", owner: "KEPCO", lat: 36.5, lon: 127.8, desc: "Powers the HBM fabs; nuclear ~30%." });
  n("e_nova_wind", "Nova Scotia wind", 8, { loc: "Cape Breton, Canada", owner: "EverWind", lat: 46.1, lon: -60.4, desc: "Wind power for the EverWind campus." });
  n("e_wi_grid", "We Energies (Wisconsin)", 8, { loc: "Wisconsin, USA", owner: "WEC Energy", lat: 43.0, lon: -88.0, desc: "Building new gas and solar for Microsoft Fairwater and Port Washington." });
  n("e_aep_oh", "AEP Ohio", 8, { loc: "Ohio, USA", owner: "AEP", lat: 40.0, lon: -82.9, desc: "Utility serving Prometheus and the New Albany data-center cluster." });
  n("e_indiana", "NIPSCO & Indiana grid", 8, { loc: "Indiana, USA", owner: "NIPSCO", lat: 41.6, lon: -86.7, desc: "Serves AWS New Carlisle (Project Rainier)." });
  n("e_china_grid", "Chinese grid (coal, hydro, solar)", 8, { loc: "China", owner: "State Grid", lat: 35.0, lon: 105.0, desc: "Cheap abundant power is China's AI advantage even without top chips." });
})(window.AI);
