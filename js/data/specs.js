/* TECHNICAL REFERENCE — for people who build with this stuff.
   Spec-sheet numbers are vendor peak figures (dense unless noted). "—" means not disclosed.
   Status as of Oct 2026. */
(function (AI) {
  const S = (AI.specs = {});

  /* ---------------------------------------------------------------- Accelerators
     fp8 / fp4 in PFLOPS (dense), hbm in GB, bw in TB/s, tdp in W, scaleUp = chips in one memory-coherent domain */
  S.accel = [
    { id: "h100", name: "H100 SXM", maker: "Nvidia", year: 2022, node: "TSMC 4N", xtors: 80, mem: "HBM3", hbm: 80, bw: 3.35, fp8: 1.98, fp4: null, tdp: 700, link: "NVLink 4 · 0.9 TB/s", scaleUp: 8, graph: "c_hopper", note: "The chip that trained the GPT-4 generation." },
    { id: "h200", name: "H200", maker: "Nvidia", year: 2024, node: "TSMC 4N", xtors: 80, mem: "HBM3E", hbm: 141, bw: 4.8, fp8: 1.98, fp4: null, tdp: 700, link: "NVLink 4 · 0.9 TB/s", scaleUp: 8, graph: "c_hopper", note: "Same compute as H100, 76% more memory." },
    { id: "b200", name: "B200 (in GB200)", maker: "Nvidia", year: 2024, node: "TSMC 4NP", xtors: 208, mem: "HBM3E", hbm: 192, bw: 8, fp8: 5, fp4: 10, tdp: 1200, link: "NVLink 5 · 1.8 TB/s", scaleUp: 72, graph: "c_gb200", note: "Two reticle-limit dies in one package; GB200 NVL72 is the scale-up unit." },
    { id: "b300", name: "B300 Blackwell Ultra", maker: "Nvidia", year: 2025, node: "TSMC 4NP", xtors: 208, mem: "HBM3E 12-Hi", hbm: 288, bw: 8, fp8: 5, fp4: 15, tdp: 1400, link: "NVLink 5 · 1.8 TB/s", scaleUp: 72, graph: "c_gb300", note: "FP4-heavy refresh for reasoning inference." },
    { id: "rubin", name: "Rubin (VR200)", maker: "Nvidia", year: 2026, node: "TSMC N3", xtors: 336, mem: "HBM4", hbm: 288, bw: 22, fp8: null, fp4: 50, fp4note: "inference NVFP4; 35 training", tdp: null, link: "NVLink 6 · 3.6 TB/s", scaleUp: 72, graph: "c_vr", note: "Shipping since Aug 2026. Rack: 3.6 EF NVFP4, 20.7 TB HBM4." },
    { id: "rubin_ultra", name: "Rubin Ultra (planned)", maker: "Nvidia", year: 2027, node: "TSMC N3", xtors: null, mem: "HBM4E", hbm: 1000, bw: 32, fp8: null, fp4: 100, tdp: 3600, link: "NVLink 7 · ~10.8 TB/s", scaleUp: 144, graph: null, note: "H2 2027, Kyber NVL576 racks at ~600 kW, 800 V DC.", planned: true },
    { id: "mi300x", name: "MI300X", maker: "AMD", year: 2023, node: "TSMC N5/N6", xtors: 153, mem: "HBM3", hbm: 192, bw: 5.3, fp8: 2.6, fp4: null, tdp: 750, link: "Infinity Fabric · 0.9 TB/s", scaleUp: 8, graph: "c_mi355", note: "First AMD GPU to win big LLM inference deployments." },
    { id: "mi355x", name: "MI355X", maker: "AMD", year: 2025, node: "TSMC N3P / N6", xtors: 185, mem: "HBM3E", hbm: 288, bw: 8, fp8: 5, fp4: 10, tdp: 1400, link: "Infinity Fabric", scaleUp: 8, graph: "c_mi355", note: "Matches B200 memory and FP4; 8-GPU scale-up only." },
    { id: "mi455x", name: "MI455X (Helios)", maker: "AMD", year: 2026, node: "TSMC N2 / N3", xtors: 320, mem: "HBM4", hbm: 432, bw: 19.6, bwnote: "up to 23.3 in some reports", fp8: 20, fp4: 40, tdp: null, link: "UALink-over-Ethernet", scaleUp: 72, graph: "c_helios", note: "First 2 nm AI GPU; 72-GPU Helios rack with ~31 TB HBM4." },
    { id: "tpu7", name: "TPU7x Ironwood", maker: "Google", year: 2025, node: "TSMC N3 (reported)", xtors: null, mem: "HBM3E", hbm: 192, bw: 7.37, fp8: 4.61, fp4: null, tdp: null, link: "ICI · 1.2 TB/s + OCS", scaleUp: 9216, graph: "c_tpu7", note: "Pods of 9,216 chips joined by optical circuit switches." },
    { id: "tpu8t", name: "TPU 8t", maker: "Google", year: 2026, node: "—", xtors: null, mem: "HBM", hbm: null, bw: null, fp8: null, fp4: 12.6, fp4note: "121 EF per 9,600-chip pod", tdp: null, link: "Virgo network", scaleUp: 9600, graph: "c_tpu8", note: "Training chip; GA expected H2 2026." },
    { id: "tpu8i", name: "TPU 8i", maker: "Google", year: 2026, node: "—", xtors: null, mem: "HBM + 384 MB SRAM", hbm: 288, bw: null, fp8: 10.1, fp8note: "11.6 EF per 1,152-chip pod", fp4: null, tdp: null, link: "ICI · 19.2 TB/s", scaleUp: 1152, graph: "c_tpu8", note: "Inference chip with very large on-die SRAM." },
    { id: "trn2", name: "Trainium2", maker: "AWS", year: 2024, node: "TSMC N5", xtors: null, mem: "HBM3", hbm: 96, bw: 2.9, fp8: 1.3, fp4: null, tdp: null, link: "NeuronLink", scaleUp: 64, graph: "c_trn2", note: "Fills Project Rainier for Anthropic." },
    { id: "trn3", name: "Trainium3", maker: "AWS", year: 2025, node: "TSMC N3", xtors: null, mem: "HBM3E", hbm: 144, bw: 4.9, fp8: 2.52, fp4: null, tdp: null, link: "NeuronSwitch-v1", scaleUp: 144, graph: "c_trn3", note: "Trn3 UltraServer: 144 chips, 362 PF FP8, 20.7 TB HBM." },
    { id: "maia200", name: "Maia 200", maker: "Microsoft", year: 2026, node: "TSMC N3", xtors: null, mem: "HBM3E + 272 MB SRAM", hbm: 216, bw: null, fp8: null, fp4: 10, tdp: 750, link: "On-die Ethernet · 2.8 TB/s", scaleUp: 6144, graph: "c_maia", note: "Inference-first; Ethernet scale-up to 6,144 chips." },
    { id: "ascend910c", name: "Ascend 910C", maker: "Huawei", year: 2025, node: "SMIC N+2 (7 nm)", xtors: null, mem: "HBM2E", hbm: 128, bw: 3.2, fp8: null, fp16: 0.8, fp4: null, tdp: null, link: "UB mesh", scaleUp: 384, graph: "c_ascend", note: "CloudMatrix 384 wires 384 chips with optics to beat NVL72 on total FLOPs at ~4× the power." },
    { id: "ascend950", name: "Ascend 950PR", maker: "Huawei", year: 2026, node: "SMIC N+3 (5 nm-class)", xtors: null, mem: "HiBL (in-house)", hbm: 112, bw: 1.4, fp8: 1, fp4: 2, tdp: null, link: "2 TB/s", scaleUp: null, graph: "c_ascend", note: "Inference part; 950DT training chip due late 2026." },
    { id: "wse3", name: "Cerebras WSE-3", maker: "Cerebras", year: 2024, node: "TSMC N5", xtors: 4000, mem: "44 GB on-wafer SRAM", hbm: 44, bw: 21000, bwnote: "21 PB/s SRAM", fp8: null, fp16: 125, fp16note: "sparse", fp4: null, tdp: 23000, tdpnote: "whole CS-3 system", link: "SwarmX", scaleUp: 2048, graph: "c_wse3", note: "Whole-wafer chip; fastest single-stream token speed." }
  ];

  /* ---------------------------------------------------------------- Frontier models */
  S.models = [
    { name: "GPT-6 (Sol, Luna, Instant)", lab: "OpenAI", date: "2026-09/10", open: false, arch: "—", ctx: "~1M", note: "Rolled out to all ChatGPT tiers Oct 2026; Sol for paid, Luna for free.", graph: "p_gpt" },
    { name: "GPT-5.5", lab: "OpenAI", date: "2026-04", open: false, arch: "—", ctx: "—", note: "Agentic upgrade; doubled per-token price.", graph: "p_gpt" },
    { name: "gpt-oss-120b", lab: "OpenAI", date: "2025-08", open: true, arch: "MoE, 117B total / 5.1B active", ctx: "128K", note: "OpenAI's first open weights since GPT-2." },
    { name: "Claude Mythos / Fable 5.1", lab: "Anthropic", date: "2026-09", open: false, arch: "—", ctx: "1M", note: "Top tier above Opus; Fable is the safeguarded public version.", graph: "p_mythos" },
    { name: "Claude Opus 5.5 / Sonnet 5.5", lab: "Anthropic", date: "2026-09", open: false, arch: "—", ctx: "1M", note: "Opus 5.5 is the general flagship; Sonnet 5.5 the fast workhorse.", graph: "p_claude" },
    { name: "Gemini 3.5 Pro / Flash", lab: "Google DeepMind", date: "2026-05", open: false, arch: "—", ctx: "1M–2M", note: "Flash GA at I/O 2026; Pro rolled out after. Gemini 4 reported for Oct 2026.", graph: "p_gemini" },
    { name: "Gemma 3 / 4", lab: "Google DeepMind", date: "2025–26", open: true, arch: "Dense, small", ctx: "128K", note: "Google's open-weight line." },
    { name: "Muse Spark", lab: "Meta MSL", date: "2026", open: false, arch: "—", ctx: "—", note: "First model from Meta Superintelligence Labs; closed, replaced Llama in Meta AI and glasses.", graph: "p_metaai" },
    { name: "Llama 4 Maverick / Scout", lab: "Meta", date: "2025-04", open: true, arch: "MoE, 400B / 109B total, 17B active", ctx: "1M / 10M", note: "Meta's last big open release before the MSL pivot." },
    { name: "Grok 4.x", lab: "SpaceXAI", date: "2025-07 →", open: false, arch: "—", ctx: "256K–500K", note: "Trained on Colossus; Grok 5 not yet released as of Oct 2026.", graph: "p_grok" },
    { name: "MAI models", lab: "Microsoft AI", date: "2025–26", open: false, arch: "—", ctx: "—", note: "Text, voice and image models from Suleyman's team.", graph: "p_mai" },
    { name: "DeepSeek V4", lab: "DeepSeek", date: "2026-04 →", open: true, arch: "MoE, ~1T+ total, ~37B active (reported)", ctx: "1M", note: "Co-designed with Huawei for Ascend; MIT licence.", graph: "p_deepseek" },
    { name: "Qwen 3.x", lab: "Alibaba", date: "2025–26", open: true, arch: "Dense + MoE family", ctx: "up to 1M", note: "Most-downloaded open family; base for countless fine-tunes.", graph: "p_qwen" },
    { name: "Kimi K2 / K3", lab: "Moonshot AI", date: "2025-07 / 2026-07", open: true, arch: "MoE, K2: 1T total / 32B active", ctx: "256K–1M", note: "Agentic open model from Beijing.", graph: "p_kimi" },
    { name: "GLM-5.x", lab: "Zhipu (Z.ai)", date: "2026", open: true, arch: "MoE, ~750B total (reported)", ctx: "—", note: "Strong open coding model.", graph: "p_glm" },
    { name: "Mistral Large 3 / 4", lab: "Mistral AI", date: "2025-12 / 2026-10", open: true, arch: "MoE, L3: 675B / 41B active", ctx: "256K", note: "Europe's frontier open weights.", graph: "p_lechat" }
  ];

  /* ---------------------------------------------------------------- Roadmaps */
  S.roadmaps = {
    nvidia: [
      [2020, "Ampere A100", "7 nm, HBM2e, TF32"], [2022, "Hopper H100", "4N, HBM3, FP8, Transformer Engine"], [2024, "Blackwell B200", "Two-die, HBM3E, FP4, NVL72"],
      [2025, "Blackwell Ultra B300", "288 GB, more FP4"], [2026, "Rubin", "N3, HBM4, NVLink 6, Vera CPU"], [2027, "Rubin Ultra", "HBM4E, NVL576 Kyber racks"], [2028, "Feynman", "3D stacking, NVLink 8"]
    ],
    hbm: [
      { gen: "HBM2E", year: 2020, pin: 3.6, stackBw: 0.46, cap: 16, hi: 8, used: "A100, TPU v4" },
      { gen: "HBM3", year: 2022, pin: 6.4, stackBw: 0.82, cap: 24, hi: 12, used: "H100, MI300X" },
      { gen: "HBM3E", year: 2024, pin: 9.6, stackBw: 1.2, cap: 36, hi: 12, used: "H200, B200, B300, TPU7, Trn2/3" },
      { gen: "HBM4", year: 2026, pin: 11, stackBw: 2.8, cap: 64, hi: 16, used: "Rubin, MI455X, TPU 8", note: "2,048-bit bus; logic base die" },
      { gen: "HBM4E", year: 2027, pin: 13, stackBw: 3.3, cap: 64, hi: 16, used: "Rubin Ultra", note: "Custom base dies; hybrid bonding" }
    ],
    process: [
      { node: "N5 / N4", year: 2020, device: "FinFET", ai: "H100 (4N), B200 (4NP), Trn2, WSE-3" },
      { node: "N3", year: 2022, device: "FinFET", ai: "Rubin, Trn3, Maia 200, MI355X, A19" },
      { node: "N2", year: 2025, device: "Nanosheet GAA", ai: "MI455X compute dies, next Apple chips" },
      { node: "A16", year: 2026, device: "GAA + backside power (Super Power Rail)", ai: "Expected in 2027–28 AI parts" },
      { node: "A14", year: 2028, device: "GAA, 2nd gen", ai: "Planned" },
      { node: "Intel 18A", year: 2025, device: "RibbonFET + PowerVia", ai: "Panther Lake; seeking AI foundry customers" },
      { node: "SMIC N+3", year: 2026, device: "FinFET via DUV multi-patterning", ai: "Huawei Ascend 950" }
    ]
  };

  /* ---------------------------------------------------------------- Glossary */
  S.glossary = [
    ["Token", "A word-piece. Models read and write tokens; ~0.75 English words each."],
    ["Parameter", "One learned number (weight) in a model. Frontier models have hundreds of billions to trillions."],
    ["MoE (mixture of experts)", "A model where each token only uses a few 'expert' sub-networks, so a 1T-parameter model may compute with only ~30B active parameters per token."],
    ["Pre-training", "Learning to predict the next token over trillions of tokens. The most compute-hungry phase."],
    ["Post-training / RL", "Fine-tuning after pre-training: supervised examples, RLHF, and reinforcement learning on verifiable tasks like code and math."],
    ["Inference", "Running a trained model to answer requests. Now the majority of AI compute spend."],
    ["KV cache", "Saved attention keys and values for every past token, so the model doesn't recompute them. Long contexts make it huge and push demand for HBM."],
    ["Prefill vs decode", "Prefill reads the whole prompt at once (compute-bound); decode writes one token at a time (memory-bandwidth-bound). Rubin CPX targets prefill."],
    ["FLOP / PFLOPS / EF", "Floating-point operation. PFLOPS = 10¹⁵ per second; an exaflop (EF) is 10¹⁸."],
    ["FP8 / FP4 / NVFP4", "8- and 4-bit number formats. Fewer bits = more math per watt; NVFP4 adds block scaling so 4-bit stays accurate."],
    ["Dense vs sparse FLOPS", "Vendors often quote 2:4 structured-sparsity numbers, which are 2× dense. This atlas uses dense where it can."],
    ["MFU", "Model FLOPs Utilization: the share of a chip's peak math a training job actually achieves. 35–50% is good at scale."],
    ["6ND rule", "Training compute ≈ 6 × parameters × training tokens (in FLOPs) for a dense transformer."],
    ["HBM", "High-Bandwidth Memory: DRAM dies stacked with through-silicon vias and placed beside the GPU."],
    ["TSV", "Through-silicon via: a copper-filled hole through a thinned die that carries signals vertically."],
    ["CoWoS", "TSMC's Chip-on-Wafer-on-Substrate packaging that puts logic and HBM side by side on silicon."],
    ["SoIC / hybrid bonding", "Stacking dies face-to-face with direct copper-to-copper bonds, no solder bumps."],
    ["Reticle limit", "The largest area a scanner prints in one exposure, ~858 mm² (26 × 33 mm). High-NA EUV halves it."],
    ["EUV / High-NA EUV", "13.5 nm-wavelength lithography from ASML. High-NA (0.55) prints finer lines but with a half-size field."],
    ["GAA / nanosheet", "Gate-all-around transistor: stacked silicon ribbons wrapped by the gate on four sides. Replaces FinFET at 2 nm."],
    ["Backside power", "Moving power wires to the back of the wafer (TSMC A16, Intel PowerVia) to free the front for signals."],
    ["Scale-up vs scale-out", "Scale-up links chips into one memory domain (NVLink, ICI); scale-out links domains into a cluster (InfiniBand, Ethernet)."],
    ["NVLink / NVSwitch", "Nvidia's GPU-to-GPU link and switch that make 72 GPUs behave like one."],
    ["UALink / UEC", "Open industry alternatives to NVLink (UALink) and to InfiniBand (Ultra Ethernet)."],
    ["OCS", "Optical circuit switch: MEMS mirrors that reroute light between TPU racks without converting to electrons."],
    ["CPO", "Co-packaged optics: lasers and photonics on the switch package, cutting transceiver power."],
    ["Rail-optimized fabric", "A network where GPU #k in every server connects to the same switch 'rail', reducing hops for collective operations."],
    ["All-reduce", "The collective operation that averages gradients across all GPUs every step; network bandwidth caps it."],
    ["PUE", "Power usage effectiveness: total facility power ÷ IT power. Liquid-cooled AI halls reach ~1.1–1.2."],
    ["Liquid cooling (DLC)", "Direct-to-chip liquid cooling through cold plates; required above ~40–50 kW per rack."],
    ["800 V DC", "Higher-voltage rack power that Nvidia is moving to for ~1 MW racks, reducing copper."],
    ["Behind-the-meter", "Power generated on-site (gas turbines, fuel cells) without waiting for a grid connection."],
    ["Interconnection queue", "The wait to connect to the grid; years in many US regions and the real limit on AI build-out."],
    ["Neocloud", "GPU-specialist clouds such as CoreWeave, Nebius, Lambda and Crusoe."],
    ["ASIC / XPU", "Custom accelerator designed for one company (TPU, Trainium, Maia, MTIA), often with Broadcom or Marvell."],
    ["Chokepoint", "A step with one or two suppliers worldwide and no quick substitute."]
  ];

  S.sources = [
    ["Google Cloud: TPU7x (Ironwood) specs", "https://docs.cloud.google.com/tpu/docs/tpu7x"],
    ["AWS: Trn3 UltraServers", "https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-ec2-trn3-ultraservers/"],
    ["HPCwire: Maia 200", "https://www.hpcwire.com/2026/01/26/microsoft-raises-the-ai-inference-bar-with-maia-200/"],
    ["Digital Citizen: MI455X", "https://www.digitalcitizen.life/amd-instinct-mi455x-brings-432gb-of-hbm4-and-40-pflops-of-ai-compute-to-helios/"],
    ["VRLA Tech: Vera Rubin architecture", "https://vrlatech.com/nvidia-vera-rubin-architecture-explained/"],
    ["TrendForce: Ascend 950PR & DeepSeek V4", "https://www.trendforce.com/news/2026/04/07/news-decoding-deepseek-v4-how-huaweis-ascend-950-pr-is-powering-chinas-push-to-break-cuda-dependence/"],
    ["Gigazine: TPU 8t / 8i", "https://gigazine.net/gsc_news/en/20260423-google-tpu-8t-8i"],
    ["Nvidia: GB200 NVL72", "https://www.nvidia.com/en-us/data-center/gb200-nvl72/"],
    ["AI model families, Oct 2026 (Dremio blog)", "https://datalakehousehub.com/blog/ai-model-families-2026/"]
  ];
})(window.AI);
