/* AI SUPPLY GRAPH — part D: expansion. More labs (China, apps, robotics), neoclouds,
   alternative chips, packaging, PCBs, photomasks, grid gear, batteries. Plus numeric
   power figures for the compute-site tracker. */
(function (AI) {
  const { n, l, f } = AI;
  AI.sectors.app = { name: "AI apps" };
  AI.sectors.infra = { name: "Infra & investors" };

  /* ---------- Tier 1 */
  n("bytedance", "ByteDance (Seed)", 1, { sector: "china", hq: "Beijing, China · Singapore", people: ["liang_rubo", "wu_yonghui"], cap: "Largest AI capex in China (reported ~$20B+ for 2026)", desc: "Owner of TikTok and Douyin; its Seed team builds the Doubao models, China's most-used chatbot. Rents Nvidia capacity abroad (Malaysia) and buys domestic chips at home." });
  n("moonshot", "Moonshot AI", 1, { sector: "china", hq: "Beijing, China", people: ["yang_zhilin"], cap: "Backed by Alibaba and Tencent", desc: "Maker of the Kimi models; Kimi K2 (2025) was a 1-trillion-parameter open MoE that topped open agentic benchmarks." });
  n("zhipu", "Zhipu AI (Z.ai)", 1, { sector: "china", hq: "Beijing, China", people: ["zhang_peng"], cap: "Listed in Hong Kong in early 2026 (reported)", desc: "Tsinghua spin-out behind the GLM models; on the US Entity List since Jan 2025." });
  n("baidu", "Baidu", 1, { sector: "china", hq: "Beijing, China", people: ["robin_li"], desc: "ERNIE models, Apollo Go robotaxis and Kunlun AI chips." });
  n("tencent", "Tencent", 1, { sector: "china", hq: "Shenzhen, China", desc: "Hunyuan models inside WeChat; big buyer of Nvidia H20 and domestic chips." });
  n("nebius", "Nebius", 1, { sector: "cloud", hq: "Amsterdam, Netherlands", people: ["volozh"], cap: "$17.4B Microsoft capacity deal (2025); Meta deal", desc: "Neocloud spun out of Yandex's international business, run by Arkady Volozh." });
  n("crusoe", "Crusoe", 1, { sector: "infra", hq: "San Francisco & Denver, USA", people: ["lochmiller"], desc: "Developer that builds and runs Stargate Abilene; started by burning stranded gas to mine bitcoin." });
  n("lambda", "Lambda", 1, { sector: "cloud", hq: "San Jose, USA", desc: "GPU cloud and workstation maker popular with researchers; multi-billion Microsoft deal (2025)." });
  n("g42", "G42 / MGX", 1, { sector: "infra", hq: "Abu Dhabi, UAE", people: ["tahnoon"], desc: "Abu Dhabi's AI champion and the UAE's investment arm MGX, partners in Stargate UAE and investors in OpenAI, xAI and Anthropic-adjacent infrastructure." });
  n("softbank", "SoftBank", 1, { sector: "infra", hq: "Tokyo, Japan", people: ["son"], cap: "$30B into OpenAI's 2026 round; owns Arm", desc: "Stargate's lead financier and owner of Arm, whose CPU designs sit in Grace, Vera, Graviton, Axion and Cobalt." });
  n("perplexity", "Perplexity", 1, { sector: "app", hq: "San Francisco, USA", people: ["srinivas"], desc: "AI answer engine and Comet browser; runs a mix of its own fine-tunes and frontier APIs." });
  n("anysphere", "Anysphere (Cursor)", 1, { sector: "app", hq: "San Francisco, USA", people: ["truell"], desc: "Maker of Cursor, the fastest-growing AI code editor; trains its own models plus calls Anthropic and OpenAI." });
  n("figure", "Figure AI", 1, { sector: "device", hq: "San Jose, USA", people: ["adcock"], desc: "Humanoid robot maker running its own Helix vision-language-action model." });
  n("waymo", "Waymo", 1, { sector: "device", hq: "Mountain View, USA", desc: "Alphabet's robotaxi; the largest deployed embodied-AI fleet, trained on Google TPUs." });
  n("intel", "Intel", 1, { sector: "chip", hq: "Santa Clara, USA", people: ["lip_bu_tan"], cap: "US government ~10% owner; Nvidia $5B stake", desc: "Gaudi accelerators, Xeon host CPUs and Intel Foundry (18A, 14A) courting AI customers." });
  n("qualcomm", "Qualcomm", 1, { sector: "chip", hq: "San Diego, USA", desc: "Phone NPUs and, from 2026, AI200/AI250 data-center inference racks; Humain (Saudi Arabia) is the first customer." });
  n("groq", "Groq", 1, { sector: "chip", hq: "Mountain View, USA", desc: "LPU inference chips with no HBM, all SRAM. Nvidia licensed the technology and hired its leaders in Dec 2025; GroqCloud continues." });

  /* ---------- Tier 2 */
  n("p_doubao", "Doubao", 2, { owner: "ByteDance", desc: "China's most-used AI assistant." });
  n("p_kimi", "Kimi K2 / K3", 2, { owner: "Moonshot AI", desc: "Open-weight agentic MoE models." });
  n("p_glm", "GLM-5", 2, { owner: "Zhipu", desc: "Open-weight coding and agent models." });
  n("p_ernie", "ERNIE", 2, { owner: "Baidu", desc: "Baidu's model family, trained largely on Kunlun chips." });
  n("p_hunyuan", "Hunyuan", 2, { owner: "Tencent", desc: "Tencent's models inside WeChat and Yuanbao." });
  n("p_perplexity", "Perplexity & Comet", 2, { owner: "Perplexity", desc: "Answer engine and agentic browser." });
  n("p_cursor", "Cursor", 2, { owner: "Anysphere", desc: "AI code editor with its own Composer models." });
  n("p_figure", "Figure 03 + Helix", 2, { owner: "Figure AI", teardown: "robot", desc: "Home humanoid running an on-board vision-language-action model." });
  n("p_waymo", "Waymo Driver", 2, { owner: "Waymo", desc: "Lidar + camera + radar stack, millions of paid rides." });
  n("p_nebius", "Nebius AI Cloud", 2, { owner: "Nebius", desc: "GPU cloud in Finland, Paris, New Jersey and more." });
  n("p_lambda", "Lambda Cloud", 2, { owner: "Lambda", desc: "On-demand GPU clusters." });
  n("p_groqcloud", "GroqCloud", 2, { owner: "Groq", desc: "Very fast token serving of open models." });

  /* ---------- Tier 3 */
  n("s_ashburn", "Northern Virginia 'Data Center Alley'", 3, { loc: "Loudoun & Prince William, Virginia, USA", owner: "AWS · Microsoft · Google · Meta · CoreWeave · others", lat: 39.03, lon: -77.49, cap: "World's largest data-center market, ~5+ GW", flags: ["⚠ grid-constrained"], desc: "Where most of the internet already lives; new AI capacity is limited by Dominion's power hook-ups." });
  n("s_nebius_nj", "Nebius Vineland & Finland", 3, { loc: "Vineland, New Jersey · Mäntsälä, Finland", owner: "Nebius", lat: 39.49, lon: -75.03, desc: "Nebius sites serving Microsoft's 300 MW contract." });
  n("s_johor", "Johor data-center hub", 3, { loc: "Johor, Malaysia", owner: "ByteDance · others", lat: 1.49, lon: 103.74, flags: ["⚠ export-control scrutiny"], desc: "Southeast Asia's fastest-growing AI hub, where Chinese firms rent Nvidia capacity outside China." });
  n("s_crusoe_wy", "Crusoe Wyoming & Texas sites", 3, { loc: "Cheyenne, Wyoming · Texas", owner: "Crusoe", lat: 41.14, lon: -104.82, desc: "Gas-and-renewables-powered campuses beyond Abilene." });
  n("s_lambda", "Lambda clusters", 3, { loc: "USA", owner: "Lambda", lat: 37.34, lon: -121.89, desc: "Leased data halls running Nvidia clusters." });

  /* ---------- Tier 4 */
  n("c_gaudi3", "Intel Gaudi 3", 4, { owner: "Intel", cap: "128 GB HBM2E", desc: "Ethernet-native accelerator; modest share, cheaper per FLOP." });
  n("c_ai200", "Qualcomm AI200 / AI250", 4, { owner: "Qualcomm", cap: "768 GB LPDDR per card", desc: "Inference racks betting on cheap LPDDR capacity instead of HBM." });
  n("c_lpu", "Groq LPU", 4, { owner: "Groq", desc: "Deterministic SRAM-only inference chip, originally on GlobalFoundries 14 nm, next gen at Samsung." });
  n("c_h20", "Nvidia H20 (China)", 4, { owner: "Nvidia", flags: ["⚠ export-licensed"], desc: "Cut-down Hopper made for China; banned in April 2025, re-licensed in mid-2025 with a 15% revenue share to the US government, then discouraged by Beijing." });
  n("c_kunlun", "Baidu Kunlun P800", 4, { owner: "Baidu", desc: "Baidu's in-house AI chip; clusters of 30,000+ chips." });
  n("c_cambricon", "Cambricon Siyuan 590/690", 4, { owner: "Cambricon", desc: "China's second domestic AI chip after Ascend; ByteDance is a major buyer." });
  n("c_retimer", "PCIe/CXL retimers & switches", 4, { owner: "Astera Labs · Broadcom · Marvell", desc: "Small chips that keep signals clean between GPUs, CPUs, NICs and memory across a board or rack." });

  /* ---------- Tier 5 */
  n("m_pcb", "High-layer PCBs & copper-clad laminate", 5, { owner: "Victory Giant · TTM · Elite Material (EMC) · Doosan", el: ["Cu", "Si", "O", "C"], desc: "GB200 boards need 20+ layer, low-loss laminate; a quiet supply squeeze in 2025–26." });
  n("m_bess", "Battery storage (BESS)", 5, { owner: "Tesla Megapack · Fluence · CATL", el: ["Li", "Fe", "P", "C", "Ni", "Co"], desc: "Smooths the huge, spiky power swings of synchronized training runs and backs up the grid." });
  n("m_fuelcell", "On-site fuel cells", 5, { owner: "Bloom Energy", el: ["Zr", "Y", "Ni", "La"], desc: "Solid-oxide fuel cells that turn gas into power without a grid connection; deployed for Oracle and others." });
  n("m_switchgear", "Switchgear & UPS", 5, { owner: "Schneider · Eaton · ABB · Siemens · Vertiv", el: ["Cu", "Ag", "Fe", "S", "F"], desc: "Breakers, busways and UPS that route megawatts safely; SF6 gas insulation is being phased out." });
  n("m_fiber", "Optical fibre & cabling", 5, { owner: "Corning · Prysmian · Fujikura", el: ["Si", "O", "Ge"], desc: "AI halls use ~10× the fibre of a normal data center; Meta and others signed huge Corning deals." });
  n("m_photomask", "Photomasks", 5, { owner: "TSMC in-house · Photronics · DNP · Toppan", el: ["Si", "O", "Mo", "Ta", "Ru", "Cr"], desc: "The stencils a scanner projects. A leading-edge mask set costs tens of millions of dollars." });
  n("m_cxmt_hbm", "CXMT HBM (China)", 5, { owner: "ChangXin Memory", desc: "China's attempt at domestic HBM3; a few generations behind." });
  n("m_sram_die", "Large on-die SRAM", 5, { owner: "Groq · Cerebras · Google · Microsoft", desc: "Memory built into the logic die itself: fastest possible, but costly per bit." });

  /* ---------- Tier 6 */
  n("f_intel_az", "Intel Fab 52 (18A)", 6, { loc: "Chandler, Arizona, USA", owner: "Intel", lat: 33.27, lon: -111.88, desc: "First US high-volume 18A fab with RibbonFET transistors and PowerVia backside power." });
  n("f_samsung_tx", "Samsung Taylor", 6, { loc: "Taylor, Texas, USA", owner: "Samsung", lat: 30.57, lon: -97.4, desc: "2 nm-class fab anchored by a $16.5B Tesla contract for AI6 chips." });
  n("f_amkor_az", "Amkor Peoria", 6, { loc: "Peoria, Arizona, USA", owner: "Amkor", lat: 33.58, lon: -112.24, desc: "US advanced-packaging campus to package Arizona-made Nvidia and Apple chips." });
  n("f_ase", "ASE & SPIL", 6, { loc: "Kaohsiung & Taichung, Taiwan", owner: "ASE Technology", lat: 22.62, lon: 120.3, desc: "World's largest outsourced packager; takes CoWoS overflow and test." });
  n("f_cxmt", "CXMT Hefei", 6, { loc: "Hefei, China", owner: "ChangXin Memory", lat: 31.82, lon: 117.23, desc: "China's DRAM champion moving into HBM." });
  n("f_hoya", "HOYA & AGC mask blanks", 6, { loc: "Japan", owner: "HOYA · AGC", lat: 35.7, lon: 139.4, flags: ["🔒 EUV mask blanks"], noAlt: "HOYA and AGC make nearly all EUV mask blanks: ultra-flat glass coated with 40 Mo/Si layer pairs.", workaround: "Applied Materials and others are qualifying blank deposition; no near-term second region.", desc: "Make the defect-free glass blanks EUV photomasks start from." });
  n("f_corning", "Corning fibre plants", 6, { loc: "Hickory & Wilmington, North Carolina, USA", owner: "Corning", lat: 35.73, lon: -81.34, desc: "Optical fibre for AI data centers." });
  n("f_bloom", "Bloom Energy Newark", 6, { loc: "Newark, Delaware, USA", owner: "Bloom Energy", lat: 39.68, lon: -75.75, desc: "Fuel-cell factory scaling for AI campuses." });
  n("f_megapack", "Tesla Megafactory", 6, { loc: "Lathrop, California · Shanghai", owner: "Tesla", lat: 37.82, lon: -121.28, desc: "Builds Megapack batteries used at xAI and other AI sites." });
  n("f_eaton", "Schneider, Eaton & ABB plants", 6, { loc: "USA · Europe · India", owner: "Schneider · Eaton · ABB", lat: 41.5, lon: -81.7, desc: "Electrical gear makers expanding US output for AI halls." });
  n("f_victory", "Victory Giant & EMC (PCB/CCL)", 6, { loc: "Huizhou, China · Taoyuan, Taiwan · Thailand", owner: "Victory Giant · Elite Material", lat: 23.1, lon: 114.4, desc: "Main makers of the high-layer boards and laminate inside Nvidia racks." });
  n("f_naura", "NAURA & SMEE (China tools)", 6, { loc: "Beijing & Shanghai, China", owner: "NAURA · AMEC · SMEE", lat: 39.8, lon: 116.5, desc: "China's domestic etch, deposition and lithography makers, scaling under export controls." });
  n("f_siemens_energy", "Siemens Energy & Mitsubishi Power", 6, { loc: "Berlin · Charlotte · Takasago", owner: "Siemens Energy · Mitsubishi Heavy", lat: 52.52, lon: 13.32, desc: "The other two heavy gas-turbine makers, also sold out for years." });

  /* ---------- Tier 7 */
  n("r_mask_blank", "EUV mask blanks", 7, { el: ["Si", "O", "Ti", "Mo", "Ru", "Ta"], desc: "Low-expansion titania-silica glass with 40 Mo/Si bilayers and a ruthenium cap." });
  n("r_lithium", "Lithium", 7, { el: ["Li"], flags: ["⚠ China refines ~65%"], desc: "For battery storage at AI campuses, robots and devices." });
  n("r_moly", "Molybdenum", 7, { el: ["Mo"], desc: "EUV mirror and blank multilayers; steel alloys." });
  n("r_ccl", "Low-loss laminate resin & glass", 7, { el: ["C", "H", "O", "Si"], desc: "PPO/hydrocarbon resins and low-Dk glass cloth for 224 Gb/s signals." });

  /* ---------- Tier 8 */
  n("x_atacama", "Salar de Atacama", 8, { loc: "Antofagasta, Chile", owner: "SQM · Albemarle", lat: -23.5, lon: -68.25, desc: "Lithium brine evaporated in giant ponds." });
  n("x_greenbushes", "Greenbushes lithium", 8, { loc: "Western Australia", owner: "Talison", lat: -33.86, lon: 116.06, desc: "World's largest hard-rock lithium mine; ore mostly refined in China." });
  n("x_climax", "Climax & Chilean molybdenum", 8, { loc: "Colorado, USA · Chile", owner: "Freeport · Codelco", lat: 39.37, lon: -106.18, desc: "Molybdenum, often a by-product of copper." });
  n("e_dominion", "Dominion Energy (Virginia)", 8, { loc: "Virginia, USA", owner: "Dominion", lat: 37.5, lon: -77.4, desc: "Utility for Data Center Alley; data centers are ~25% of its sales." });
  n("e_malaysia", "TNB Malaysia grid", 8, { loc: "Malaysia", owner: "Tenaga Nasional", lat: 3.1, lon: 101.7, desc: "Coal and gas grid feeding Johor's data-center boom." });

  /* ---------- links */
  f("bytedance", ["p_doubao", "c_cambricon"]); f("moonshot", ["p_kimi"]); f("zhipu", ["p_glm"]); f("baidu", ["p_ernie", "c_kunlun"]); f("tencent", ["p_hunyuan"]);
  f("nebius", ["p_nebius"]); f("lambda", ["p_lambda"]); f("crusoe", ["s_abilene", "s_crusoe_wy"]); f("g42", ["s_uae"]); f("softbank", ["s_milam", "p_gpt"]);
  f("perplexity", ["p_perplexity"]); f("anysphere", ["p_cursor"]); f("figure", ["p_figure"]); f("waymo", ["p_waymo"]);
  f("intel", ["c_gaudi3", "f_intel_az"]); f("qualcomm", ["c_ai200", "c_ar1"]); f("groq", ["p_groqcloud", "c_lpu"]); f("nvidia", ["c_h20"]); f("nvidia", ["c_lpu"]);
  f("p_doubao", ["s_china", "s_johor"]); f("p_kimi", ["s_china"]); f("p_glm", ["s_china"]); f("p_ernie", ["s_china"]); f("p_hunyuan", ["s_china"]);
  f("p_perplexity", ["p_gpt", "p_claude", "s_coreweave"]); f("p_cursor", ["p_claude", "p_gpt", "s_coreweave"]); f("p_figure", ["s_mobile", "m_actuators"]); f("p_waymo", ["s_google_tpu", "s_mobile"]);
  f("p_nebius", ["s_nebius_nj"]); f("p_lambda", ["s_lambda"]); f("p_groqcloud", ["c_lpu"]);
  f("s_ashburn", ["c_gb200", "c_gb300", "c_hopper", "c_trn2", "m_transformer", "e_dominion", "m_switchgear"]);
  f("s_nebius_nj", ["c_gb300", "c_vr", "m_transformer"]); f("s_johor", ["c_hopper", "c_gb200", "e_malaysia"]); f("s_crusoe_wy", ["c_gb300", "m_turbine"]); f("s_lambda", ["c_gb200", "c_hopper"]);
  f("s_china", ["c_h20", "c_kunlun", "c_cambricon"]);
  ["s_rainier", "s_fairwater", "s_abilene", "s_google_tpu"].forEach((s) => l("s_ashburn" === s ? s : s, "m_switchgear"));
  ["s_abilene", "s_fairwater", "s_hyperion", "s_prometheus", "s_rainier", "s_colossus2"].forEach((s) => l(s, "m_fiber"));
  ["s_colossus1", "s_colossus2", "s_abilene"].forEach((s) => l(s, "m_bess"));
  l("s_abilene", "m_fuelcell"); l("s_crusoe_wy", "m_fuelcell");
  ["c_gb200", "c_gb300", "c_vr", "c_helios"].forEach((c) => l(c, "m_pcb"));
  ["c_gb200", "c_gb300", "c_vr", "c_trn2", "c_trn3", "c_tpu7"].forEach((c) => l(c, "c_retimer"));
  l("c_retimer", "f_tsmc18");
  f("c_gaudi3", ["m_hbm3e", "f_tsmc18"]); l("c_ai200", "f_tsmc18"); f("c_lpu", ["f_samsung_p"]); f("c_h20", ["m_hbm3e", "m_cowos"]);
  f("c_kunlun", ["f_samsung_p", "m_cxmt_hbm"]); f("c_cambricon", ["f_smic", "m_cxmt_hbm"]); l("c_wse3", "m_sram_die"); l("c_tpu8", "m_sram_die"); l("c_maia", "m_sram_die");
  l("m_sram_die", "f_tsmc18"); l("m_cxmt_hbm", "f_cxmt"); l("f_cxmt", "f_naura"); l("f_smic", "f_naura");
  l("m_cowos", "f_amkor_az"); l("m_cowos", "f_ase");
  f("f_tsmc18", ["m_photomask"]); f("f_tsmc_n2", ["m_photomask"]); f("f_intel_az", ["m_photomask", "f_asml", "f_amat", "f_lam", "r_helium", "r_fluor", "r_copper", "r_hafnium"]);
  f("f_samsung_tx", ["f_asml", "m_photomask"]); l("c_ai5", "f_samsung_tx"); l("c_ai5", "f_tsmc_az");
  l("m_photomask", "f_hoya"); l("f_hoya", "r_mask_blank"); f("r_mask_blank", ["r_moly", "x_spruce"]); l("r_moly", "x_climax");
  l("m_pcb", "f_victory"); f("f_victory", ["r_ccl", "r_copper"]); l("r_ccl", "f_nittobo");
  l("m_bess", "f_megapack"); l("f_megapack", "r_lithium"); f("r_lithium", ["x_atacama", "x_greenbushes"]);
  l("m_fuelcell", "f_bloom"); l("f_bloom", "r_natgas");
  l("m_switchgear", "f_eaton"); l("f_eaton", "r_copper");
  l("m_fiber", "f_corning"); f("f_corning", ["r_germanium", "r_helium"]);
  l("m_turbine", "f_siemens_energy"); l("f_siemens_energy", "r_superalloy");
  l("f_amkor_az", "r_tin"); l("f_ase", "r_tin"); l("f_ase", "r_gold");
  l("e_dominion", "r_natgas"); l("e_dominion", "r_uranium"); l("e_malaysia", "r_natgas");

  /* ---------- numeric power figures for the compute tracker (GW planned / GW online, approx.) */
  const gw = {
    s_abilene: [1.2, 0.6], s_shackelford: [2.0, 0], s_donaana: [2.2, 0], s_milam: [1.2, 0], s_portwash: [1.3, 0], s_saline: [1.4, 0], s_uae: [1.0, 0.2],
    s_fairwater: [2.0, 0.6], s_fairwater_atl: [1.0, 0.3], s_rainier: [2.2, 1.0], s_colossus1: [0.3, 0.3], s_colossus2: [1.0, 0.4], s_prometheus: [1.0, 0.8],
    s_hyperion: [5.0, 0], s_fluidstack: [1.0, 0], s_everwind: [1.0, 0], s_mistral: [1.4, 0.1], s_nebius_nj: [0.3, 0.1], s_johor: [2.0, 1.0], s_ashburn: [8.0, 5.0]
  };
  Object.entries(gw).forEach(([id, [p, o]]) => { if (AI.idx[id]) { AI.idx[id].gw = p; AI.idx[id].gwOn = o; } });
})(window.AI);
