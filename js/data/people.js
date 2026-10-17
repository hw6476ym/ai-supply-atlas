/* KEY PEOPLE — who leads each layer of the AI stack and what they are working on.
   Roles as of Oct 2026 from public reporting; titles change often, check sources. */
(function (AI) {
  const P = (AI.people = []);
  const w = (s) => "https://en.wikipedia.org/wiki/" + s;
  function p(id, name, org, role, layer, bg, now, link, extra) {
    P.push(Object.assign({ id, name, org, role, layer, bg, now, link }, extra || {}));
  }

  /* ---------- OpenAI */
  p("altman", "Sam Altman", "OpenAI", "CEO & co-founder", "lab",
    "Ran Y Combinator before co-founding OpenAI in 2015. Briefly ousted by the board in Nov 2023, reinstated days later.",
    "Raising the largest private rounds in history ($122B at $852B in Apr 2026), building 9+ GW of Stargate sites, custom Broadcom chips and an IPO now pointed at 2027.", w("Sam_Altman"));
  p("brockman", "Greg Brockman", "OpenAI", "President & co-founder", "lab",
    "Former Stripe CTO; built much of OpenAI's early infrastructure.", "Leads scaling of OpenAI's compute and infrastructure buildout.", w("Greg_Brockman"));
  p("pachocki", "Jakub Pachocki", "OpenAI", "Chief Scientist", "lab",
    "Polish computer scientist and former competitive programmer; led GPT-4 pre-training.", "Sets research direction for the GPT-6 generation, including automated AI research.", w("Jakub_Pachocki"));
  p("chen_mark", "Mark Chen", "OpenAI", "Chief Research Officer", "lab",
    "Joined in 2018; led work on DALL·E, Codex and the o-series reasoning models.", "Runs OpenAI's research organisation day to day.", null);
  p("simo", "Fidji Simo", "OpenAI", "CEO of Applications", "lab",
    "Former CEO of Instacart and head of the Facebook app.", "Runs ChatGPT, consumer products and the business side; the CFO reports to her.", w("Fidji_Simo"));
  p("friar", "Sarah Friar", "OpenAI", "CFO", "lab",
    "Former CEO of Nextdoor and CFO of Square.", "Manages OpenAI's financing and the path toward a public listing.", w("Sarah_Friar"));
  p("kwon", "Jason Kwon", "OpenAI", "Chief Strategy Officer", "lab", "Former general counsel at OpenAI.", "Policy, government relations and strategy.", null);
  p("weil", "Kevin Weil", "OpenAI", "VP, OpenAI for Science", "lab", "Former Instagram and Twitter product lead; OpenAI CPO 2024–25.", "Applies OpenAI models to accelerate scientific research.", w("Kevin_Weil"));

  /* ---------- Anthropic */
  p("amodei_d", "Dario Amodei", "Anthropic", "CEO & co-founder", "lab",
    "Biophysics PhD; led research at OpenAI (GPT-2/GPT-3) before leaving to found Anthropic in 2021.",
    "Scaling Claude across Trainium, TPUs and GPUs (multi-gigawatt deals with Amazon, Google/Broadcom, Microsoft/Nvidia, SpaceX); $65B round at $965B (May 2026); argues for export controls and AI safety rules.", w("Dario_Amodei"));
  p("amodei_da", "Daniela Amodei", "Anthropic", "President & co-founder", "lab",
    "Previously VP of safety and policy at OpenAI and an early Stripe employee.", "Runs operations and oversees Anthropic Labs.", w("Daniela_Amodei"));
  p("kaplan", "Jared Kaplan", "Anthropic", "Chief Science Officer & co-founder", "lab",
    "Theoretical physicist; co-authored the 2020 'scaling laws' paper that predicted how models improve with compute.", "Leads research strategy for Claude models.", w("Jared_Kaplan"));
  p("mccandlish", "Sam McCandlish", "Anthropic", "Chief Architect & co-founder", "lab", "Physicist; co-author of the scaling-laws work.", "Focused on model pre-training (since Jan 2026).", null);
  p("patil", "Rahul Patil", "Anthropic", "CTO", "lab", "Former CTO of Stripe.", "Runs compute, infrastructure and inference since Oct 2025.", null);
  p("vora", "Ami Vora", "Anthropic", "Chief Product Officer", "lab", "Former product leader at WhatsApp/Meta and Faire.", "Leads Claude apps and products since Jan 2026.", null);
  p("krieger", "Mike Krieger", "Anthropic", "Co-lead, Anthropic Labs", "lab", "Co-founder of Instagram; Anthropic CPO 2024–Jan 2026.", "Incubating new products in Anthropic Labs with Ben Mann.", w("Mike_Krieger"));
  p("krishna", "Krishna Rao", "Anthropic", "CFO", "lab", "Former Airbnb finance executive.", "Runs Anthropic's mega-rounds and compute contracts.", null);
  p("clark", "Jack Clark", "Anthropic", "Co-founder, Head of Policy", "lab", "Former journalist and OpenAI policy director; writes the Import AI newsletter.", "Government engagement and AI policy.", w("Jack_Clark_(AI_policy_expert)"));
  p("brown_tom", "Tom Brown", "Anthropic", "Co-founder, leads compute", "lab", "Lead author of the GPT-3 paper.", "Plans and procures Anthropic's compute.", null);
  p("olah", "Chris Olah", "Anthropic", "Co-founder, interpretability lead", "lab", "Pioneer of neural-network interpretability at Google Brain and OpenAI.", "Mapping the features and circuits inside Claude.", w("Chris_Olah"));

  /* ---------- Google */
  p("pichai", "Sundar Pichai", "Alphabet / Google", "CEO", "hyper", "Led Chrome and Android before becoming CEO in 2015.", "Steering Gemini into Search and Android while pushing TPU sales to outside customers.", w("Sundar_Pichai"));
  p("hassabis", "Demis Hassabis", "Google DeepMind", "CEO & co-founder", "lab", "Chess prodigy, game designer, neuroscientist; 2024 Nobel Prize in Chemistry for AlphaFold.", "Leads Gemini and DeepMind's science work (AlphaFold, weather, fusion, math).", w("Demis_Hassabis"));
  p("kavukcuoglu", "Koray Kavukcuoglu", "Google", "Chief AI Architect", "lab", "DeepMind's former CTO.", "Moves Gemini models into Google products faster (since 2025).", null);
  p("dean", "Jeff Dean", "Google", "Chief Scientist", "lab", "Co-built MapReduce, BigTable and TensorFlow; co-founded Google Brain.", "Gemini co-lead and TPU co-design.", w("Jeff_Dean"));
  p("vahdat", "Amin Vahdat", "Google", "Chief Technologist, AI Infrastructure", "hyper", "Networking researcher; built Google's data-center network and optical switching.", "TPU systems, the Virgo network and gigawatt-scale data centers.", null);
  p("kurian", "Thomas Kurian", "Google Cloud", "CEO", "hyper", "Former Oracle president of product development.", "Sells TPUs and Gemini to enterprises and labs (Anthropic, SSI, Apple).", w("Thomas_Kurian"));
  p("porat", "Ruth Porat", "Alphabet", "President & Chief Investment Officer", "hyper", "Former CFO of Morgan Stanley and Alphabet.", "Energy and data-center investment strategy.", w("Ruth_Porat"));

  /* ---------- Meta */
  p("zuckerberg", "Mark Zuckerberg", "Meta", "CEO & founder", "hyper", "Founded Facebook in 2004.", "Spending $125–145B in 2026 capex on 'personal superintelligence'; Prometheus and Hyperion clusters; AI glasses.", w("Mark_Zuckerberg"));
  p("wang_alex", "Alexandr Wang", "Meta", "Chief AI Officer, Meta Superintelligence Labs", "lab", "Founded Scale AI at 19; Meta invested ~$14B in Scale in 2025.", "Leads frontier model research at MSL; scope narrowed in a March 2026 reorg.", w("Alexandr_Wang"));
  p("friedman", "Nat Friedman", "Meta", "Head of products & applied research, MSL", "lab", "Former GitHub CEO and AI investor.", "Turning MSL models into Meta AI products.", w("Nat_Friedman"));
  p("saba", "Maher Saba", "Meta", "Head of applied AI engineering", "hyper", "Senior Reality Labs executive.", "Runs the 'data engine' and engineering for Meta's models (since Mar 2026).", null);
  p("bosworth", "Andrew Bosworth", "Meta", "CTO, Reality Labs", "device", "Long-time Meta executive; built Facebook's ads and News Feed.", "AI glasses (Ray-Ban Meta, Display) and AR hardware.", w("Andrew_Bosworth"));

  /* ---------- SpaceXAI / Tesla */
  p("musk", "Elon Musk", "SpaceX / SpaceXAI / Tesla", "CEO", "lab", "Co-founded OpenAI (left 2018), runs Tesla and SpaceX; founded xAI in 2023.", "Merged xAI into SpaceX (Feb 2026); Colossus 2; orbital compute ideas; Optimus robots and Tesla AI5 chips.", w("Elon_Musk"));
  p("nicolls", "Michael Nicolls", "SpaceXAI", "President, xAI / SpaceXAI", "lab", "Former Starlink engineering vice president.", "Running xAI inside SpaceX since April 2026.", null);
  p("elluswamy", "Ashok Elluswamy", "Tesla", "VP, AI software", "device", "Early Autopilot engineer.", "FSD and Optimus neural networks.", null);

  /* ---------- Microsoft */
  p("nadella", "Satya Nadella", "Microsoft", "Chairman & CEO", "hyper", "CEO since 2014; moved Microsoft to cloud first.", "Fairwater AI superfactories, a renegotiated OpenAI partnership, and Microsoft's own MAI models.", w("Satya_Nadella"));
  p("suleyman", "Mustafa Suleyman", "Microsoft AI", "CEO, Microsoft AI", "lab", "Co-founded DeepMind and Inflection AI.", "Leads the MAI Superintelligence team, consumer Copilot and in-house models.", w("Mustafa_Suleyman"));
  p("scott_kevin", "Kevin Scott", "Microsoft", "CTO", "hyper", "Former LinkedIn engineering head.", "AI infrastructure strategy and the Maia chip roadmap.", w("Kevin_Scott_(computer_scientist)"));
  p("guthrie", "Scott Guthrie", "Microsoft", "EVP, Cloud + AI", "hyper", "Built ASP.NET and much of Azure.", "Runs Azure's data-center buildout.", w("Scott_Guthrie"));

  /* ---------- Amazon */
  p("jassy", "Andy Jassy", "Amazon", "CEO", "hyper", "Founded and ran AWS for 15 years.", "Anthropic partnership, Alexa+, up to $50B into OpenAI's 2026 round, record capex.", w("Andy_Jassy"));
  p("garman", "Matt Garman", "AWS", "CEO", "hyper", "Joined AWS as an intern in 2005.", "Trainium3, Project Rainier and Bedrock.", null);
  p("desantis", "Peter DeSantis", "Amazon", "SVP, AGI, custom silicon & quantum", "chip", "Long-time head of AWS infrastructure.", "Leads Amazon's combined model (Nova), chip (Trainium) and quantum organisation since late 2025.", null);

  /* ---------- Apple */
  p("ternus", "John Ternus", "Apple", "CEO (from Sept 2026)", "device", "Mechanical engineer; ran Apple hardware engineering.", "Took over from Tim Cook in September 2026 with AI and Siri as the central test.", null);
  p("cook", "Tim Cook", "Apple", "Executive Chairman", "device", "Apple CEO 2011–2026.", "Board chair after handing the CEO role to John Ternus.", w("Tim_Cook"));
  p("federighi", "Craig Federighi", "Apple", "SVP, Software Engineering", "device", "Runs iOS and macOS.", "Apple Intelligence and the rebuilt Siri; AI chief reports to him.", w("Craig_Federighi"));
  p("subramanya", "Amar Subramanya", "Apple", "VP of AI", "lab", "16 years at Google (Gemini assistant engineering lead), then Microsoft.", "Apple Foundation Models, ML research and AI safety (since Dec 2025).", null);
  p("srouji", "Johny Srouji", "Apple", "SVP, Hardware Technologies", "chip", "Led every Apple-silicon chip since the A4.", "Neural Engine and server chips for Private Cloud Compute.", w("Johny_Srouji"));

  /* ---------- Nvidia */
  p("huang", "Jensen Huang", "Nvidia", "CEO & co-founder", "chip", "Co-founded Nvidia at a Denny's in 1993.", "Vera Rubin ramp, Rubin Ultra and Feynman roadmap, $30B into OpenAI, sovereign AI deals worldwide.", w("Jensen_Huang"));
  p("kress", "Colette Kress", "Nvidia", "CFO", "chip", "Former Cisco and Microsoft finance executive.", "Says supply stays constrained through fiscal 2028.", null);
  p("buck", "Ian Buck", "Nvidia", "VP, Hyperscale & HPC", "chip", "Created CUDA's predecessor, Brook, at Stanford.", "Data-center GPU product line and customer engineering.", w("Ian_Buck"));
  p("catanzaro", "Bryan Catanzaro", "Nvidia", "VP, Applied Deep Learning Research", "chip", "Built cuDNN.", "Nemotron open models and research.", null);
  p("ross", "Jonathan Ross", "Nvidia", "Senior executive (from Groq)", "chip", "Started the TPU project at Google, then founded Groq.", "Joined Nvidia when it licensed Groq's inference tech (Dec 2025).", w("Jonathan_Ross_(businessman)"));

  /* ---------- AMD, Broadcom, Cerebras, Intel */
  p("su", "Lisa Su", "AMD", "Chair & CEO", "chip", "MIT PhD in electrical engineering; rescued AMD from near-bankruptcy after 2014.", "Helios racks; 6 GW deal with OpenAI (with warrants for up to ~10% of AMD); up to 2 GW with Anthropic from 2027.", w("Lisa_Su"));
  p("papermaster", "Mark Papermaster", "AMD", "CTO", "chip", "Former IBM and Apple chip executive.", "Chiplet architecture and the MI400 roadmap.", null);
  p("norrod", "Forrest Norrod", "AMD", "EVP, Data Center Solutions", "chip", "Former Dell server head.", "EPYC and Instinct business.", null);
  p("tan_hock", "Hock Tan", "Broadcom", "President & CEO", "chip", "Built Broadcom through acquisitions (Avago, Broadcom, VMware).", "Custom AI chips for Google, Meta, OpenAI, Anthropic and others; Tomahawk 6 switches.", w("Hock_Tan"));
  p("charlie_kawwas", "Charlie Kawwas", "Broadcom", "President, Semiconductor Solutions", "chip", "Long-time Broadcom engineer.", "Runs the custom-accelerator (XPU) programs.", null);
  p("feldman", "Andrew Feldman", "Cerebras", "CEO & co-founder", "chip", "Previously founded SeaMicro (sold to AMD).", "Wafer-scale inference clusters, including for OpenAI.", null);
  p("lip_bu_tan", "Lip-Bu Tan", "Intel", "CEO", "fab", "Former Cadence CEO and veteran chip investor.", "Rebuilding Intel Foundry (18A, 14A) and seeking AI customers; the US government took a ~10% stake in 2025.", w("Lip-Bu_Tan"));

  /* ---------- Clouds */
  p("ellison", "Larry Ellison", "Oracle", "Chairman & CTO", "cloud", "Co-founded Oracle in 1977.", "Turned Oracle into OpenAI's Stargate landlord.", w("Larry_Ellison"));
  p("magouyrk", "Clay Magouyrk", "Oracle", "Co-CEO", "cloud", "Built Oracle Cloud Infrastructure.", "Gigawatt OCI build for OpenAI and others (co-CEO since Sept 2025).", null);
  p("sicilia", "Mike Sicilia", "Oracle", "Co-CEO", "cloud", "Ran Oracle's industries business.", "Applications and industry AI.", null);
  p("intrator", "Michael Intrator", "CoreWeave", "CEO & co-founder", "cloud", "Former natural-gas trader who started CoreWeave mining Ethereum.", "Racing to deploy each Nvidia generation first.", null);
  p("son", "Masayoshi Son", "SoftBank", "Chairman & CEO", "investor", "Early backer of Alibaba; founded the Vision Fund.", "Stargate chair; $30B into OpenAI's 2026 round; SB Energy sites.", w("Masayoshi_Son"));

  /* ---------- Europe & new labs */
  p("mensch", "Arthur Mensch", "Mistral AI", "CEO & co-founder", "lab", "Former DeepMind researcher.", "Mistral Compute data center and Europe's sovereign AI push.", w("Arthur_Mensch"));
  p("lample", "Guillaume Lample", "Mistral AI", "Chief Scientist & co-founder", "lab", "Former Meta AI researcher (LLaMA).", "Mistral's model training.", null);
  p("lacroix", "Timothée Lacroix", "Mistral AI", "CTO & co-founder", "lab", "Former Meta AI engineer.", "Infrastructure and platform.", null);
  p("murati", "Mira Murati", "Thinking Machines Lab", "CEO & founder", "lab", "OpenAI CTO 2018–2024; led ChatGPT's launch.", "Tinker fine-tuning API and the lab's own models.", w("Mira_Murati"));
  p("schulman", "John Schulman", "Thinking Machines Lab", "Chief Scientist", "lab", "OpenAI co-founder; invented PPO, a core RL method behind ChatGPT.", "Post-training research.", w("John_Schulman"));
  p("sutskever", "Ilya Sutskever", "Safe Superintelligence", "CEO & co-founder", "lab", "Co-author of AlexNet (2012); OpenAI co-founder and chief scientist until 2024.", "A 'straight shot' to safe superintelligence on Google TPUs.", w("Ilya_Sutskever"));

  /* ---------- China */
  p("liang", "Liang Wenfeng", "DeepSeek", "Founder & CEO", "china", "Co-founded the quant hedge fund High-Flyer.", "DeepSeek V4 on Huawei Ascend; ultra-efficient training.", w("Liang_Wenfeng"));
  p("wu_yongming", "Eddie Wu", "Alibaba", "CEO", "china", "Alibaba co-founder.", "RMB 380B+ AI and cloud investment; Qwen.", null);
  p("zhou_jingren", "Zhou Jingren", "Alibaba Cloud", "CTO", "china", "Former Microsoft researcher.", "Leads Qwen model development.", null);
  p("xu_zhijun", "Eric Xu", "Huawei", "Rotating Chairman", "china", "Long-time Huawei strategist.", "Publicly laid out the Ascend 950/960/970 roadmap and in-house HBM.", null);

  /* ---------- Fabs, memory, tools */
  p("wei_cc", "C.C. Wei", "TSMC", "Chairman & CEO", "fab", "Joined TSMC in 1998; led its advanced-node and packaging push.", "N2/A16 ramp, CoWoS expansion, Arizona build-out (~$165B US commitment).", w("C._C._Wei"));
  p("kwak", "Kwak Noh-jung", "SK hynix", "CEO", "fab", "Career SK hynix engineer and manufacturing chief.", "Defending HBM leadership into HBM4/HBM4E; new M15X and Yongin fabs.", null);
  p("chey", "Chey Tae-won", "SK Group", "Chairman", "fab", "Bought Hynix into SK in 2012 when few wanted it.", "Group-level AI and HBM strategy; ties with Nvidia and OpenAI.", w("Chey_Tae-won"));
  p("jun_youngh", "Jun Young-hyun", "Samsung Electronics", "Vice Chairman, head of DS (chips)", "fab", "Former head of Samsung memory and batteries.", "Turned around Samsung's HBM, winning HBM4 business in 2026.", null);
  p("mehrotra", "Sanjay Mehrotra", "Micron", "CEO", "fab", "Co-founded SanDisk.", "HBM share and new US memory fabs in Idaho and New York.", w("Sanjay_Mehrotra"));
  p("fouquet", "Christophe Fouquet", "ASML", "CEO", "fab", "Ran ASML's EUV business before becoming CEO in 2024.", "High-NA EUV adoption, China export rules, Mistral investment.", null);
  p("van_den_brink", "Martin van den Brink", "ASML", "Former President & CTO (retired 2024)", "fab", "Spent 40 years at ASML; drove EUV from experiment to production.", "Advisor; architect of the machine every AI chip depends on.", w("Martin_van_den_Brink"));
  /* ---------- Expansion: China labs, neoclouds, apps, robotics, Arm */
  p("liang_rubo", "Liang Rubo", "ByteDance", "CEO", "china", "ByteDance co-founder; CEO since 2021.", "Doubao and the Seed research team; China's largest AI capex.", null);
  p("wu_yonghui", "Wu Yonghui", "ByteDance", "Head of Seed (foundation models)", "china", "Former Google Fellow who worked on Google's neural machine translation and Gemini.", "Leads ByteDance's frontier model research since 2025.", null);
  p("yang_zhilin", "Yang Zhilin", "Moonshot AI", "Founder & CEO", "china", "CMU PhD; co-author of Transformer-XL and XLNet.", "Kimi K-series open MoE models.", null);
  p("zhang_peng", "Zhang Peng", "Zhipu AI", "CEO", "china", "Tsinghua-trained computer scientist.", "GLM models and Zhipu's public listing.", null);
  p("robin_li", "Robin Li", "Baidu", "Co-founder & CEO", "china", "Built Baidu search in 2000.", "ERNIE, Kunlun chips and Apollo Go robotaxis.", w("Robin_Li"));
  p("volozh", "Arkady Volozh", "Nebius", "Founder & CEO", "cloud", "Co-founded Yandex.", "Building Nebius into a global neocloud.", w("Arkady_Volozh"));
  p("lochmiller", "Chase Lochmiller", "Crusoe", "Co-founder & CEO", "infra", "Former quant trader and climber.", "Builds Stargate Abilene and other gigawatt campuses.", null);
  p("tahnoon", "Sheikh Tahnoon bin Zayed", "G42 / MGX", "Chairman", "infra", "UAE national security adviser; chairs ADIA, G42 and MGX.", "UAE's 5 GW AI campus and global AI investments.", w("Tahnoun_bin_Zayed_Al_Nahyan"));
  p("srinivas", "Aravind Srinivas", "Perplexity", "Co-founder & CEO", "app", "Former OpenAI and DeepMind research intern; Berkeley PhD.", "Perplexity answer engine and the Comet browser.", w("Aravind_Srinivas"));
  p("truell", "Michael Truell", "Anysphere (Cursor)", "Co-founder & CEO", "app", "MIT graduate who co-founded Anysphere in 2022.", "Cursor editor and its in-house coding models.", null);
  p("adcock", "Brett Adcock", "Figure AI", "Founder & CEO", "device", "Founded Vettery and Archer Aviation.", "Figure 03 humanoid and the Helix model.", null);
  p("shazeer", "Noam Shazeer", "Google DeepMind", "Gemini co-lead", "lab", "Co-author of 'Attention Is All You Need' and of mixture-of-experts layers; founded Character.AI.", "Co-leads Gemini model development since returning to Google in 2024.", w("Noam_Shazeer"));
  p("haas", "Rene Haas", "Arm", "CEO", "chip", "Former Nvidia executive.", "Arm cores inside Grace, Vera, Graviton, Axion and Cobalt; Arm's own server chips.", w("Rene_Haas"));
})(window.AI);
