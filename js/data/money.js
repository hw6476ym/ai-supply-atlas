/* MONEY — where the money comes from and where it goes. Figures are reported,
   rounded, and often include contingent or multi-year commitments. */
(function (AI) {
  const M = (AI.money = {});

  // 2026 capex guidance (USD billions). lo/hi range; source dates noted.
  M.capex2026 = [
    { org: "Amazon", lo: 200, hi: 200, note: "Guided ~$200B (Feb 2026); spent ~$131B in 2025" },
    { org: "Microsoft", lo: 190, hi: 190, note: "Near $190B (reported Jul 2026)" },
    { org: "Alphabet", lo: 175, hi: 185, note: "$175–185B, more than double 2025 (Feb 2026)" },
    { org: "Meta", lo: 125, hi: 145, note: "Raised from $115–135B to $125–145B (Apr 2026)" }
  ];

  // Lab valuations over time (USD billions, post-money or deal valuation)
  M.valuations = {
    OpenAI: [["2023-01", 29], ["2024-10", 157], ["2025-03", 300], ["2025-10", 500], ["2026-04", 852]],
    Anthropic: [["2023-05", 4.1], ["2024-03", 18.4], ["2025-03", 61.5], ["2025-09", 183], ["2026-02", 380], ["2026-05", 965]],
    "xAI": [["2024-05", 24], ["2024-12", 50], ["2025-03", 80], ["2026-02", 250]]
  };

  // Big flows of money. from → to. kind: equity | compute | chips | license | gov
  M.deals = [
    { date: "2019–2023", from: "Microsoft", to: "OpenAI", amt: "~$13B", kind: "equity", what: "Cash and Azure credits that funded GPT-3 to GPT-4." },
    { date: "2023–2024", from: "Amazon", to: "Anthropic", amt: "$8B", kind: "equity", what: "Made AWS Anthropic's primary training partner (Trainium)." },
    { date: "2023–2025", from: "Google", to: "Anthropic", amt: "~$3B+", kind: "equity", what: "Equity stake plus TPU cloud contracts; Google added more in the 2026 round." },
    { date: "Jun 2025", from: "Meta", to: "Scale AI", amt: "~$14B", kind: "equity", what: "49% stake; Alexandr Wang joined Meta to run Superintelligence Labs." },
    { date: "Sep 2025", from: "OpenAI", to: "Oracle", amt: "~$300B over ~5 yrs (reported)", kind: "compute", what: "Stargate capacity; the largest cloud contract ever reported." },
    { date: "Sep 2025", from: "Nvidia", to: "Intel", amt: "$5B", kind: "equity", what: "Stake plus joint x86 + RTX/NVLink products." },
    { date: "Aug 2025", from: "US government", to: "Intel", amt: "~10% stake", kind: "gov", what: "CHIPS Act grants converted into equity." },
    { date: "Oct 2025", from: "OpenAI", to: "AMD", amt: "6 GW of GPUs", kind: "chips", what: "AMD gave OpenAI warrants for up to 160M shares (~10%) tied to deployment." },
    { date: "Oct 2025", from: "OpenAI", to: "Broadcom", amt: "10 GW custom chips", kind: "chips", what: "OpenAI-designed accelerators and Ethernet racks from 2026 to 2029." },
    { date: "Oct 2025", from: "Anthropic", to: "Google", amt: "Up to 1M TPUs, tens of billions $", kind: "compute", what: "Over 1 GW of TPU capacity in 2026." },
    { date: "Nov 2025", from: "OpenAI", to: "AWS", amt: "$38B", kind: "compute", what: "Seven-year deal for Nvidia GPUs on AWS." },
    { date: "Nov 2025", from: "Microsoft & Nvidia", to: "Anthropic", amt: "Up to $5B + $10B", kind: "equity", what: "Anthropic committed $30B to Azure capacity in return." },
    { date: "Nov 2025", from: "Anthropic", to: "Fluidstack", amt: "$50B", kind: "compute", what: "Own data centers in Texas and New York." },
    { date: "Dec 2025", from: "Nvidia", to: "Groq", amt: "~$20B (reported)", kind: "license", what: "Non-exclusive license of Groq's inference tech; founder Jonathan Ross and team joined Nvidia." },
    { date: "Feb 2026", from: "SpaceX", to: "xAI", amt: "$250B (all stock)", kind: "equity", what: "Merger valuing the combined company at ~$1.25T." },
    { date: "Feb 2026", from: "Investors", to: "Anthropic", amt: "$30B at $380B", kind: "equity", what: "Series G." },
    { date: "Apr 2026", from: "Amazon, Nvidia, SoftBank +", to: "OpenAI", amt: "$122B at $852B", kind: "equity", what: "Amazon $50B (~$35B contingent), Nvidia $30B, SoftBank $30B." },
    { date: "Apr 2026", from: "OpenAI", to: "Cerebras", amt: "$20B+ (reported)", kind: "chips", what: "Wafer-scale inference capacity, with an equity stake." },
    { date: "May 2026", from: "Altimeter, Dragoneer, Greenoaks, Sequoia +", to: "Anthropic", amt: "$65B at $965B", kind: "equity", what: "Briefly made Anthropic the most valuable private AI lab; Google contributed several billion." },
    { date: "May 2026", from: "Anthropic", to: "SpaceX", amt: "All of Colossus 1 (300+ MW)", kind: "compute", what: "Plus interest in multi-GW orbital compute." },
    { date: "2026", from: "Anthropic", to: "AMD", amt: "Up to 2 GW of MI450-series", kind: "chips", what: "Starting H1 2027." },
    { date: "2026", from: "Anthropic", to: "Google & Broadcom", amt: "~5 GW", kind: "compute", what: "TPU capacity from 2027." },
    { date: "2026", from: "Anthropic", to: "Amazon", amt: "Up to 5 GW", kind: "compute", what: "Nearly 1 GW of new Trainium capacity by end of 2026." }
  ];

  M.headline = [
    ["Big-4 capex 2026 (guided)", "~$700–745B"],
    ["Nvidia data-center revenue, one quarter", "$89B (Q2 FY27)"],
    ["Largest private round ever", "OpenAI, $122B (Apr 2026)"],
    ["Highest private AI valuation", "Anthropic, $965B (May 2026)"],
    ["Stargate US sites planned", "9+ GW"]
  ];

  M.sources = [
    ["Bloomberg Law: OpenAI $122B round", "https://news.bloomberglaw.com/tech-and-telecom-law/openai-valued-at-852-billion-after-closing-122-billion-round"],
    ["Bloomberg Law: Anthropic $965B", "https://news.bloomberglaw.com/private-equity/anthropic-raises-at-965-billion-valuation-eclipsing-openai-1"],
    ["AI Weekly / FT: 2026 capex", "https://aiweekly.co/alerts/amazon-microsoft-alphabet-meta-plan-725b-ai-capex-in-2026"],
    ["Yahoo Finance: Meta capex raise", "https://finance.yahoo.com/sectors/technology/articles/hyperscalers-hit-700-billion-2026-111243744.html"],
    ["Anthropic: compute partners (May 2026)", "https://www.anthropic.com/news/higher-limits-spacex"],
    ["SpaceX–xAI merger summary", "https://episteme.tllm.fr/wiki/SpaceXAI"],
    ["Epoch AI: Stargate sites", "https://epoch.ai/blog/openai-stargate-where-the-us-sites-stand"]
  ];
})(window.AI);
