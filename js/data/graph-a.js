/* ============================================================================
   AI SUPPLY GRAPH — part A: tiers, sectors, helpers, tier 1–3
   Every node is a named, real-world entity. Figures are approximate and
   dated; see the "asof" field and the Sources page. Status as of Oct 2026.
   ============================================================================ */
window.AI = window.AI || {};
(function (AI) {
  AI.tiers = {
    1: { name: "AI company", short: "Company", hint: "Who builds the intelligence" },
    2: { name: "Product", short: "Product", hint: "Models, apps and devices people use" },
    3: { name: "Compute site", short: "Site", hint: "Data centers and clusters where models train and run" },
    4: { name: "System & chip", short: "Chip", hint: "Racks, accelerators and processors" },
    5: { name: "Component", short: "Part", hint: "Memory, packaging, optics, power and cooling parts" },
    6: { name: "Fab, plant & tool", short: "Fab", hint: "Factories and machines that make the parts" },
    7: { name: "Material", short: "Material", hint: "Refined chemicals, gases, metals and films" },
    8: { name: "Source & power", short: "Source", hint: "Mines, wells and power plants at the bottom of it all" }
  };

  AI.sectors = {
    lab:    { name: "Frontier lab" },
    hyper:  { name: "Hyperscaler" },
    chip:   { name: "Chip designer" },
    cloud:  { name: "AI cloud" },
    device: { name: "Devices & robots" },
    china:  { name: "China AI" }
  };

  const N = (AI.N = []);
  const L = (AI.L = []);
  const idx = (AI.idx = {});
  AI.n = function (id, label, tier, info) {
    if (idx[id]) { console.warn("dup node", id); return id; }
    const d = Object.assign({ id, label, tier }, info || {});
    N.push(d); idx[id] = d; return id;
  };
  // l("a","b") or chain l("a>b>c") ; kinds: default supply edge
  AI.l = function (s, t, kind) {
    if (t === undefined && s.includes(">")) {
      const p = s.split(">").map((x) => x.trim());
      for (let i = 0; i < p.length - 1; i++) L.push({ source: p[i], target: p[i + 1] });
      return;
    }
    L.push({ source: s, target: t, kind: kind || "supply" });
  };
  // fan: one source → many targets
  AI.f = function (s, targets) { targets.forEach((t) => L.push({ source: s, target: t })); };
  // into: many sources → one target
  AI.i = function (sources, t) { sources.forEach((s) => L.push({ source: s, target: t })); };

  const n = AI.n;

  /* ------------------------------------------------------------------ TIER 1 */
  n("openai", "OpenAI", 1, { sector: "lab", hq: "San Francisco, USA", people: ["altman", "brockman", "pachocki", "simo", "chen_mark", "kwon", "weil", "friar"],
    cap: "~$852B valuation (Apr 2026); IPO talk deferred to 2027",
    desc: "Maker of ChatGPT and the GPT models. Restructured into a public-benefit corporation in 2025; spends more on compute than almost anyone, through Microsoft Azure, Oracle/Stargate, CoreWeave, AWS, AMD, Cerebras and its own Broadcom-built chips." });
  n("anthropic", "Anthropic", 1, { sector: "lab", hq: "San Francisco, USA", people: ["amodei_d", "amodei_da", "kaplan", "patil", "vora", "krishna", "mccandlish", "krieger", "clark", "brown_tom", "olah"],
    cap: "~$965B valuation after a $65B round (May 2026)",
    desc: "Maker of Claude. Runs on three chip families at once: AWS Trainium, Google TPUs and Nvidia GPUs, plus all of Colossus 1 since May 2026." });
  n("google", "Google / DeepMind", 1, { sector: "hyper", hq: "Mountain View, USA · London, UK", people: ["pichai", "hassabis", "kavukcuoglu", "dean", "kurian", "vahdat", "porat"],
    cap: "Alphabet: capex guidance raised repeatedly in 2026",
    desc: "The only frontier lab that designs its own AI chip (TPU, with Broadcom), owns its cloud, and owns the search and Android distribution. Gemini models trained on TPU pods." });
  n("meta", "Meta", 1, { sector: "hyper", hq: "Menlo Park, USA", people: ["zuckerberg", "wang_alex", "friedman", "saba", "bosworth"],
    cap: "2026 capex guidance $125–145B (Apr 2026)",
    desc: "Runs Meta Superintelligence Labs and the Meta AI assistant across 3B+ users. Building gigawatt-class clusters Prometheus (Ohio) and Hyperion (Louisiana)." });
  n("xai", "SpaceXAI (xAI)", 1, { sector: "lab", hq: "Palo Alto, USA · Memphis, USA", people: ["musk", "nicolls"],
    cap: "xAI valued ~$250B in SpaceX all-stock merger (Feb 2026)",
    desc: "Maker of Grok. Acquired by SpaceX in February 2026 and folded into the SpaceXAI division in May 2026. Built Colossus in Memphis in record time, then leased all of Colossus 1 to Anthropic." });
  n("microsoft", "Microsoft", 1, { sector: "hyper", hq: "Redmond, USA", people: ["nadella", "suleyman", "scott_kevin", "guthrie"],
    cap: "Fiscal Q3 2026 capex ~$31B in one quarter",
    desc: "Largest early backer of OpenAI and owner of Azure. Builds 'Fairwater' AI superfactories, its own Maia accelerators, and since late 2025 its own MAI superintelligence models." });
  n("amazon", "Amazon / AWS", 1, { sector: "hyper", hq: "Seattle, USA", people: ["jassy", "garman", "desantis"],
    cap: "Committed up to $50B into OpenAI's 2026 round; largest Anthropic backer",
    desc: "AWS designs Trainium accelerators through its Annapurna Labs unit and runs Project Rainier, one of the largest AI clusters on Earth, built for Anthropic." });
  n("apple", "Apple", 1, { sector: "device", hq: "Cupertino, USA", people: ["ternus", "cook", "federighi", "subramanya", "srouji"],
    cap: "AI runs on-device plus Private Cloud Compute",
    desc: "Runs Apple Intelligence on its own chips: the Neural Engine in every iPhone and Mac, and Apple-silicon servers for Private Cloud Compute." });
  n("nvidia", "Nvidia", 1, { sector: "chip", hq: "Santa Clara, USA", people: ["huang", "kress", "buck", "catanzaro", "ross"],
    cap: "Q2 FY27 revenue $96.2B; data center $89B (Aug 2026)",
    desc: "Designs the GPUs, CPUs, networking and full racks that most AI runs on. Fabless: every chip is made by TSMC. Licensed Groq's inference technology and hired its leaders in Dec 2025." });
  n("amd", "AMD", 1, { sector: "chip", hq: "Santa Clara, USA", people: ["su", "papermaster", "norrod"],
    cap: "Helios racks in production 2026; 6 GW OpenAI deal; up to 2 GW Anthropic deal from 2027",
    desc: "The main merchant alternative to Nvidia. Instinct GPUs plus EPYC CPUs and Pensando networking, sold as the 72-GPU Helios rack." });
  n("broadcom", "Broadcom", 1, { sector: "chip", hq: "Palo Alto, USA", people: ["tan_hock", "charlie_kawwas"],
    cap: "Custom AI chips for Google, Meta, OpenAI, Anthropic and others",
    desc: "Co-designs custom AI accelerators (Google's TPU, OpenAI's in-house chip) and makes the Ethernet switch chips (Tomahawk, Jericho) that wire AI clusters together." });
  n("cerebras", "Cerebras", 1, { sector: "chip", hq: "Sunnyvale, USA", people: ["feldman"],
    cap: "OpenAI chip purchase reported at $20B+ (2026)",
    desc: "Makes the Wafer-Scale Engine: one chip the size of a dinner plate, used for very fast inference." });
  n("oracle", "Oracle / OCI", 1, { sector: "cloud", hq: "Austin, USA", people: ["ellison", "magouyrk", "sicilia"],
    cap: "Lead builder of OpenAI's Stargate sites with Crusoe and others",
    desc: "Oracle Cloud Infrastructure rents giant Nvidia (and AMD) clusters; its multi-hundred-billion-dollar contract with OpenAI made it a core AI landlord." });
  n("coreweave", "CoreWeave", 1, { sector: "cloud", hq: "Livingston, USA", people: ["intrator"],
    cap: "Largest 'neocloud'; customers include OpenAI, Microsoft, Meta",
    desc: "GPU cloud that grew from crypto mining into one of the first to deploy each new Nvidia generation." });
  n("mistral", "Mistral AI", 1, { sector: "lab", hq: "Paris, France", people: ["mensch", "lample", "lacroix"],
    cap: "ASML-led round in 2025; Europe's leading frontier lab",
    desc: "European lab behind Le Chat and open-weight models; building its own data center outside Paris." });
  n("deepseek", "DeepSeek", 1, { sector: "china", hq: "Hangzhou, China", people: ["liang"],
    cap: "Funded by the quant fund High-Flyer",
    desc: "Chinese lab famous for efficient training. DeepSeek V4 (2026) was reworked to run on Huawei Ascend chips." });
  n("alibaba", "Alibaba (Qwen)", 1, { sector: "china", hq: "Hangzhou, China", people: ["wu_yongming", "zhou_jingren"],
    cap: "Three-year AI and cloud capex plan of RMB 380B+",
    desc: "Qwen is the most-downloaded open-weight model family. Alibaba Cloud mixes Nvidia stock, Huawei Ascend and its own T-Head chips." });
  n("huawei", "Huawei Ascend", 1, { sector: "china", hq: "Shenzhen, China", people: ["xu_zhijun"],
    cap: "Targets ~600k Ascend 910C plus the 950 series in 2026",
    desc: "China's main domestic AI chip, made by SMIC under US export controls, with Huawei's own in-house high-bandwidth memory." });
  n("tml", "Thinking Machines Lab", 1, { sector: "lab", hq: "San Francisco, USA", people: ["murati", "schulman"],
    cap: "$2B seed (2025); reported $5B Series B (Mar 2026)",
    desc: "Founded by former OpenAI CTO Mira Murati. First product, Tinker, is an API for fine-tuning open models." });
  n("ssi", "Safe Superintelligence", 1, { sector: "lab", hq: "Palo Alto, USA · Tel Aviv, Israel", people: ["sutskever"],
    cap: "Private; no product",
    desc: "Ilya Sutskever's lab. Trains on Google TPUs. Says it will ship nothing until it has safe superintelligence." });
  n("tesla", "Tesla AI", 1, { sector: "device", hq: "Austin, USA", people: ["musk", "elluswamy"],
    cap: "AI5 chip made by TSMC and Samsung",
    desc: "Self-driving software and the Optimus humanoid robot, trained on the Cortex cluster in Austin and run on Tesla-designed inference chips." });

  /* ------------------------------------------------------------------ TIER 2 */
  n("p_chatgpt", "ChatGPT", 2, { owner: "OpenAI", cap: "Hundreds of millions of weekly users", teardown: "llm",
    desc: "The chat app that started the boom. As of Oct 2026 runs the GPT-6 family (Sol for paid tiers, Luna for free) with charts and widgets drawn inside answers." });
  n("p_gpt", "GPT-6 models", 2, { owner: "OpenAI", teardown: "llm", desc: "OpenAI's model family. GPT-6 rolled out to all ChatGPT tiers in Oct 2026; GPT-5.5 shipped in Apr 2026." });
  n("p_codex", "Codex", 2, { owner: "OpenAI", desc: "OpenAI's coding agent: runs in the cloud and in your terminal, writing and testing code." });
  n("p_sora", "Sora", 2, { owner: "OpenAI", desc: "Video generation model and social app." });
  n("p_claude", "Claude (Opus, Sonnet, Haiku 5.5)", 2, { owner: "Anthropic", teardown: "llm",
    desc: "Anthropic's assistant and models. Opus 5.5 and Sonnet 5.5 launched in Sept 2026." });
  n("p_claudecode", "Claude Code", 2, { owner: "Anthropic", desc: "Agentic coding tool that works in your terminal, IDE and the web." });
  n("p_mythos", "Claude Mythos / Fable", 2, { owner: "Anthropic", flags: ["⚠ export-controlled June 2026"],
    desc: "Anthropic's top tier, above Opus. Mythos goes to vetted partners (Project Glasswing); Fable is the safeguarded public version on the same weights. Access was briefly suspended in June 2026 under US export controls." });
  n("p_gemini", "Gemini", 2, { owner: "Google", teardown: "llm", desc: "Google's model family and app. Gemini 3.5 Flash shipped May 2026; 3.5 Pro followed in preview." });
  n("p_aimode", "Google Search AI Mode", 2, { owner: "Google", desc: "Gemini-written answers inside Google Search, the largest AI deployment by query count." });
  n("p_metaai", "Meta AI", 2, { owner: "Meta", desc: "Assistant inside WhatsApp, Instagram, Facebook and Messenger." });
  n("p_rayban", "Ray-Ban Meta glasses", 2, { owner: "Meta · EssilorLuxottica", teardown: "glasses",
    desc: "Camera-and-speaker smart glasses running Meta AI; the Ray-Ban Display model adds a small in-lens screen and a wrist band that reads muscle signals." });
  n("p_grok", "Grok", 2, { owner: "SpaceXAI", desc: "xAI's model and assistant, built into X." });
  n("p_copilot", "Microsoft Copilot", 2, { owner: "Microsoft", desc: "AI assistant across Windows, Office and GitHub; runs OpenAI models, Microsoft's own MAI models and Anthropic models." });
  n("p_mai", "MAI models", 2, { owner: "Microsoft", desc: "Microsoft AI's in-house models (text, voice, image) from Mustafa Suleyman's team." });
  n("p_alexa", "Alexa+", 2, { owner: "Amazon", desc: "Rebuilt Alexa that uses Amazon Nova and Anthropic Claude models." });
  n("p_nova", "Amazon Nova", 2, { owner: "Amazon", desc: "Amazon's own model family on AWS Bedrock." });
  n("p_appleintel", "Apple Intelligence & Siri", 2, { owner: "Apple", desc: "On-device models plus Private Cloud Compute; Apple uses Google Gemini-based models for parts of the new Siri." });
  n("p_lechat", "Le Chat", 2, { owner: "Mistral", desc: "Mistral's assistant, popular in Europe." });
  n("p_deepseek", "DeepSeek V4", 2, { owner: "DeepSeek", desc: "Mixture-of-experts model reported at ~1 trillion total parameters; co-designed to run on Huawei Ascend." });
  n("p_qwen", "Qwen models", 2, { owner: "Alibaba", desc: "Open-weight model family widely used to build other models." });
  n("p_tinker", "Tinker", 2, { owner: "Thinking Machines Lab", desc: "API that lets researchers fine-tune open models without running their own clusters." });
  n("p_fsd", "Tesla FSD", 2, { owner: "Tesla", desc: "Camera-only driving system trained end-to-end on video from millions of cars." });
  n("p_optimus", "Optimus robot", 2, { owner: "Tesla", teardown: "robot", desc: "Humanoid robot: 28+ actuators, Tesla hands, and the same AI computer as the cars." });
  n("p_oci", "OCI AI infrastructure", 2, { owner: "Oracle", desc: "Rented GPU superclusters, the engine room of Stargate." });
  n("p_cwcloud", "CoreWeave Cloud", 2, { owner: "CoreWeave", desc: "GPU-by-the-hour cloud for labs and enterprises." });
  n("p_ascend_cloud", "Huawei Cloud / CloudMatrix", 2, { owner: "Huawei", desc: "Rack-scale Ascend systems (CloudMatrix 384) rented to Chinese labs." });

  /* ------------------------------------------------------------------ TIER 3 */
  n("s_abilene", "Stargate Abilene", 3, { loc: "Abilene, Texas, USA", owner: "Crusoe · Oracle · OpenAI", teardown: "datacenter",
    cap: "1.2 GW planned; ~0.3 GW running Apr 2026; completion targeted Q4 2026", lat: 32.45, lon: -99.73,
    desc: "First Stargate site: eight buildings of GB200 racks with closed-loop liquid cooling and on-site gas generation. A planned extra 600 MW expansion was dropped." });
  n("s_shackelford", "Stargate Shackelford County", 3, { loc: "Texas, USA", owner: "Vantage · OpenAI", cap: "2.0 GW planned, under construction", lat: 32.7, lon: -99.35, desc: "Frontier campus by Vantage Data Centers." });
  n("s_donaana", "Stargate Doña Ana County", 3, { loc: "New Mexico, USA", owner: "STACK · OpenAI", cap: "2.2 GW planned, foundations", lat: 32.4, lon: -106.8, desc: "Project Jupiter campus near Santa Teresa." });
  n("s_milam", "Stargate Milam County", 3, { loc: "Texas, USA", owner: "SB Energy (SoftBank) · OpenAI", cap: "1.2 GW planned", lat: 30.8, lon: -96.97, desc: "SoftBank-built site with its own solar and storage." });
  n("s_portwash", "Stargate Port Washington", 3, { loc: "Wisconsin, USA", owner: "Vantage · Oracle · OpenAI", cap: "1.3 GW planned", lat: 43.39, lon: -87.88, desc: "Lighthouse campus on Lake Michigan." });
  n("s_saline", "Stargate Saline Township", 3, { loc: "Michigan, USA", owner: "Related Digital · Oracle · OpenAI", cap: "1.4 GW planned", lat: 42.17, lon: -83.78, desc: "Closed-loop cooled campus near Ann Arbor." });
  n("s_uae", "Stargate UAE", 3, { loc: "Abu Dhabi, UAE", owner: "G42 · OpenAI · Oracle · Nvidia", cap: "First 200 MW of a 1 GW plan", lat: 24.45, lon: 54.6, desc: "Part of the 5 GW UAE–US AI campus." });
  n("s_fairwater", "Microsoft Fairwater", 3, { loc: "Mount Pleasant, Wisconsin, USA", owner: "Microsoft", cap: "Hundreds of thousands of GB200/GB300 GPUs", lat: 42.71, lon: -87.9, teardown: "datacenter",
    desc: "Microsoft's 'AI superfactory': two-storey halls of liquid-cooled racks linked over a dedicated AI WAN to a sister site in Atlanta." });
  n("s_fairwater_atl", "Fairwater Atlanta", 3, { loc: "Atlanta, Georgia, USA", owner: "Microsoft", lat: 33.75, lon: -84.39, desc: "Second Fairwater site, connected to Wisconsin so both train one model together." });
  n("s_rainier", "Project Rainier", 3, { loc: "New Carlisle, Indiana, USA", owner: "AWS · Anthropic", cap: "~500k Trainium2 chips at launch, growing toward 1M+", lat: 41.7, lon: -86.5,
    desc: "AWS's $11B Indiana campus built for Anthropic's Claude training, one of the largest non-Nvidia AI clusters." });
  n("s_google_tpu", "Google TPU fleet", 3, { loc: "Council Bluffs IA · The Dalles OR · Mayes County OK · and more", owner: "Google", lat: 41.26, lon: -95.86,
    desc: "Google's data centers hosting TPU pods for Gemini, plus TPUs rented to Anthropic (up to 1M TPUs), SSI, Meta and others." });
  n("s_colossus1", "Colossus 1", 3, { loc: "Memphis, Tennessee, USA", owner: "SpaceXAI · leased to Anthropic", cap: "300+ MW, 220k+ Nvidia GPUs", lat: 35.06, lon: -90.0, flags: ["⚠ gas-turbine air permits contested"],
    desc: "Built by xAI in 122 days in a former Electrolux factory. In May 2026 Anthropic took all of its capacity." });
  n("s_colossus2", "Colossus 2", 3, { loc: "Memphis, TN / Southaven, MS, USA", owner: "SpaceXAI", cap: "Targeted at gigawatt scale, 1M GPUs", lat: 35.0, lon: -89.98,
    desc: "xAI's second Memphis cluster, powered partly by imported gas plant capacity across the Mississippi state line." });
  n("s_prometheus", "Meta Prometheus", 3, { loc: "New Albany, Ohio, USA", owner: "Meta", cap: "~1 GW, online 2026", lat: 40.08, lon: -82.8, desc: "Meta's first gigawatt cluster; partly housed in weatherproof tents to build faster." });
  n("s_hyperion", "Meta Hyperion", 3, { loc: "Richland Parish, Louisiana, USA", owner: "Meta", cap: "2 GW initial, up to 5 GW", lat: 32.4, lon: -91.75, desc: "A campus nearly the footprint of lower Manhattan, fed by new Entergy gas plants." });
  n("s_fluidstack", "Anthropic–Fluidstack sites", 3, { loc: "Texas and New York, USA", owner: "Fluidstack · Anthropic", cap: "$50B program announced Nov 2025", lat: 31.0, lon: -100.0, desc: "Anthropic's first self-directed data center build." });
  n("s_everwind", "EverWind Nova Scotia", 3, { loc: "Cape Breton, Nova Scotia, Canada", owner: "EverWind · Anthropic", cap: "$10B wind-powered campus", lat: 46.1, lon: -60.2, desc: "Data center campus reported in 2026 to have Anthropic as its client." });
  n("s_coreweave", "CoreWeave fleet", 3, { loc: "30+ sites, USA & Europe", owner: "CoreWeave", lat: 40.7, lon: -74.3, desc: "Leased and owned data centers including Core Scientific campuses." });
  n("s_cortex", "Tesla Cortex", 3, { loc: "Giga Texas, Austin, USA", owner: "Tesla", lat: 30.22, lon: -97.62, desc: "Training cluster for FSD and Optimus next to the car factory." });
  n("s_pcc", "Apple Private Cloud Compute", 3, { loc: "Houston, Texas (servers) · Apple data centers", owner: "Apple", lat: 29.76, lon: -95.37, desc: "Apple-silicon servers built in Houston that run larger Apple Intelligence requests without keeping your data." });
  n("s_mistral", "Mistral Compute", 3, { loc: "Bruyères-le-Châtel, France", owner: "Mistral · Nvidia", cap: "Tens of thousands of Grace Blackwell GPUs", lat: 48.59, lon: 2.19, desc: "Europe's sovereign-AI cluster run by Mistral." });
  n("s_china", "Chinese hyperscale clusters", 3, { loc: "Ulanqab, Zhangbei, Guizhou and others, China", owner: "Alibaba · ByteDance · Tencent", lat: 41.0, lon: 113.1,
    desc: "Clusters in cool, cheap-power regions mixing pre-ban Nvidia chips with Huawei Ascend and in-house accelerators." });
  n("s_mobile", "Your phone & glasses", 3, { loc: "Everywhere", owner: "You", desc: "On-device AI: a share of inference now runs on the Neural Engine and NPU in your pocket or on your face." });
})(window.AI);
