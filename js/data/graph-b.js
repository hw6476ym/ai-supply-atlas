/* AI SUPPLY GRAPH — part B: tier 4 (systems & chips) and tier 5 (components) */
(function (AI) {
  const n = AI.n;

  /* ------------------------------------------------------------------ TIER 4 */
  n("c_gb200", "Nvidia GB200 NVL72", 4, { owner: "Nvidia", teardown: "gb200", cap: "72 Blackwell GPUs + 36 Grace CPUs per rack, ~120–130 kW",
    el: ["Si", "Cu", "Au", "Sn", "Ag", "Hf", "W", "Co", "Ta"],
    desc: "The rack that defined 2025: 72 GPUs wired by NVLink so they act like one giant GPU with ~13.5 TB of HBM. Liquid-cooled, about 1.4 tonnes." });
  n("c_gb300", "Nvidia GB300 NVL72", 4, { owner: "Nvidia", cap: "Blackwell Ultra: 288 GB HBM3E per GPU", desc: "Blackwell Ultra refresh shipping in volume through 2026: more memory per GPU and faster FP4 inference." });
  n("c_vr", "Nvidia Vera Rubin NVL144", 4, { owner: "Nvidia", teardown: "rubin", cap: "Rubin GPU: 288 GB HBM4, ~22 TB/s, ~50 PFLOPS FP4",
    desc: "Shipments began early August 2026; full racks scaling at Google Cloud, Microsoft and Oracle. Pairs Rubin GPUs with the Arm-based Vera CPU." });
  n("c_hopper", "Nvidia H100 / H200 fleet", 4, { owner: "Nvidia", cap: "Millions installed 2023–2025", desc: "The Hopper generation that trained GPT-4-era models; still the bulk of rented GPUs worldwide." });
  n("c_tpu7", "Google TPU v7 Ironwood", 4, { owner: "Google · Broadcom", teardown: "tpu", cap: "192 GB HBM3E per chip; pods of 9,216 chips",
    desc: "Google's 2025 inference-first TPU, linked in pods by optical circuit switches that reroute light with tiny mirrors." });
  n("c_tpu8", "Google TPU 8t / 8i", 4, { owner: "Google", teardown: "tpu", cap: "8t pods: 9,600 chips; 8i: 288 GB HBM + 384 MB SRAM",
    desc: "Announced April 2026: the first time Google split a TPU generation into a training chip (8t) and an inference chip (8i). GA expected H2 2026." });
  n("c_trn2", "AWS Trainium2", 4, { owner: "AWS (Annapurna Labs)", cap: "96 GB HBM per chip; Trn2 UltraServers of 64 chips", desc: "The chip that fills Project Rainier." });
  n("c_trn3", "AWS Trainium3", 4, { owner: "AWS (Annapurna Labs)", cap: "TSMC 3 nm; UltraServers of 144 chips", desc: "AWS's first 3 nm AI chip, ramping 2026." });
  n("c_mi355", "AMD Instinct MI355X", 4, { owner: "AMD", cap: "288 GB HBM3E", desc: "2025 AMD GPU used by Oracle, Meta and others." });
  n("c_helios", "AMD Helios (MI455X)", 4, { owner: "AMD", cap: "72 MI455X GPUs, ~31 TB HBM4 per rack", desc: "AMD's first full rack, in production in 2026, with EPYC 'Venice' CPUs and Pensando 'Vulcano' NICs. Built for OpenAI's 6 GW commitment." });
  n("c_maia", "Microsoft Maia 200", 4, { owner: "Microsoft", desc: "Microsoft's second in-house AI accelerator, aimed at inference for Copilot and OpenAI models." });
  n("c_mtia", "Meta MTIA", 4, { owner: "Meta · Broadcom", desc: "Meta's in-house accelerator for ranking, recommendation and now generative inference." });
  n("c_oai_chip", "OpenAI custom accelerator", 4, { owner: "OpenAI · Broadcom", cap: "10 GW program announced Oct 2025; first racks 2026", desc: "OpenAI's own chip co-designed with Broadcom and made at TSMC; reported financing of $50B+ for the program." });
  n("c_wse3", "Cerebras WSE-3", 4, { owner: "Cerebras", cap: "4 trillion transistors, 44 GB on-chip SRAM", desc: "A whole 300 mm wafer used as one chip, so the model stays in on-chip memory." });
  n("c_ascend", "Huawei Ascend 910C / 950", 4, { owner: "Huawei", flags: ["⚠ export-controlled supply"], cap: "950PR: ~1 PFLOPS FP8, 112 GB in-house memory",
    desc: "China's flagship AI chip. The 950PR (2026) is made on SMIC's N+3 (5 nm-class) process using deep-UV multi-patterning, without EUV." });
  n("c_ai5", "Tesla AI5", 4, { owner: "Tesla", desc: "Tesla's next driving/robot computer chip, made at both TSMC and Samsung." });
  n("c_apple_silicon", "Apple A19 Pro / M-series", 4, { owner: "Apple", cap: "TSMC N3P", desc: "Every Apple chip carries a Neural Engine; M-series chips also fill Apple's cloud servers." });
  n("c_ar1", "Qualcomm AR1 Gen 1", 4, { owner: "Qualcomm", desc: "The processor inside Ray-Ban Meta glasses." });
  n("c_nvswitch", "NVLink Switch tray", 4, { owner: "Nvidia", desc: "Nine switch trays per NVL72 rack let any GPU talk to any other at 1.8 TB/s through a copper spine of ~5,000 cables." });
  n("c_spectrumx", "Nvidia InfiniBand & Spectrum-X", 4, { owner: "Nvidia (ex-Mellanox)", desc: "Networks that link racks into clusters of 100,000+ GPUs." });
  n("c_tomahawk", "Broadcom Tomahawk 6 / Jericho", 4, { owner: "Broadcom", cap: "102.4 Tb/s switch chip", desc: "Ethernet switch silicon used by Meta, Microsoft, Google and others for AI fabrics." });
  n("c_vera", "Grace / Vera CPU", 4, { owner: "Nvidia", desc: "Arm-based CPUs that sit beside the GPUs, feeding them data. Vera has 88 custom Arm cores." });

  /* ------------------------------------------------------------------ TIER 5 */
  n("m_b200die", "Blackwell GPU die (TSMC 4NP)", 5, { owner: "Nvidia · made by TSMC", teardown: "gb200", el: ["Si", "Hf", "Cu", "Co", "W", "Ta", "Ru", "Ti", "N", "O"],
    cap: "Two reticle-sized dies, 208B transistors per B200", desc: "Each B200 is two of the largest dies a lithography scanner can print, joined by a 10 TB/s link." });
  n("m_rubindie", "Rubin GPU die (TSMC N3)", 5, { owner: "Nvidia · made by TSMC", teardown: "rubin", cap: "~336B transistors per Rubin GPU", desc: "Rubin compute dies on TSMC's 3 nm class process." });
  n("m_n2die", "2 nm accelerator dies", 5, { owner: "AMD · Apple · others · made by TSMC", desc: "TSMC N2 gate-all-around nanosheet transistors, used in AMD MI450-series compute dies and next-generation Apple chips." });
  n("m_hbm3e", "HBM3E 12-high stacks", 5, { owner: "SK hynix · Micron · Samsung", teardown: "hbm", el: ["Si", "Cu", "Sn", "Ag", "Hf", "Zr", "Ti", "N"],
    flags: ["🔒 three suppliers worldwide"], cap: "36 GB per stack, ~1.2 TB/s",
    desc: "Twelve DRAM dies thinned to ~30–50 µm, stacked and drilled through with thousands of copper 'through-silicon vias'." });
  n("m_hbm4", "HBM4 stacks", 5, { owner: "SK hynix · Samsung · Micron", teardown: "hbm", flags: ["🔒 AI memory chokepoint"], cap: "2,048-bit interface; up to 64 GB per stack",
    desc: "New generation for Rubin and MI455X. For the first time the bottom 'base die' is a logic chip made at a foundry (TSMC for SK hynix). SK hynix had ~50–58% of HBM revenue in H1 2026; Samsung climbing fast." });
  n("m_cowos", "CoWoS-L advanced packaging", 5, { owner: "TSMC", teardown: "cowos", flags: ["🔒 capacity chokepoint"], el: ["Si", "Cu", "Sn", "Ag", "Ni", "Au"],
    desc: "'Chip-on-Wafer-on-Substrate': GPU dies and HBM stacks placed side by side on a silicon bridge so they can exchange terabytes per second. For years the single tightest bottleneck in AI." });
  n("m_abf", "ABF package substrate", 5, { owner: "Ibiden · Unimicron · AT&S · Shinko", el: ["Cu", "Si", "O", "C"],
    desc: "The multi-layer board under the chip: copper traces built up in layers of Ajinomoto Build-up Film around a glass-fibre core." });
  n("m_optics", "800G / 1.6T optical transceivers", 5, { owner: "InnoLight · Eoptolink · Coherent · Broadcom DSPs", teardown: "optics", el: ["In", "P", "Ga", "As", "Si", "Ge"],
    desc: "Pluggable modules that turn electrical signals into laser light so racks can talk across a data hall. A big cluster uses millions of them." });
  n("m_cpo", "Co-packaged optics", 5, { owner: "Nvidia · Broadcom · TSMC COUPE", desc: "Lasers and optics moved onto the switch package itself to cut power; ramping in 2026 switches." });
  n("m_cables", "NVLink copper cable spine", 5, { owner: "Amphenol and others", el: ["Cu", "Ag", "Au"], desc: "Two miles of copper cable in the back of each NVL72 rack. Copper beats optics at rack distance for power and cost." });
  n("m_power_shelf", "Rack power shelves & VRMs", 5, { owner: "Delta · Lite-On · MPS · Infineon · Vicor", el: ["Si", "Ga", "N", "Cu", "C"],
    desc: "Convert grid power down to under 1 volt at hundreds of amps per GPU. Gallium-nitride and silicon-carbide transistors increasingly do the switching; Nvidia is moving racks to 800 V DC." });
  n("m_cdu", "Liquid cooling (CDUs, cold plates)", 5, { owner: "Vertiv · CoolIT · Boyd · Motivair (Schneider)", el: ["Cu", "Al", "Fe", "Cr", "Ni"],
    desc: "Copper cold plates on each chip, quick-disconnect hoses and coolant distribution units that move heat out of the rack." });
  n("m_transformer", "Power transformers", 5, { owner: "Hitachi Energy · Siemens Energy · GE Vernova · HD Hyundai", flags: ["⚠ 2–4 year lead times"], el: ["Fe", "Si", "Cu"],
    desc: "Step grid voltage down for the campus. Their cores use grain-oriented electrical steel; waits stretched to years." });
  n("m_turbine", "Gas turbines", 5, { owner: "GE Vernova · Siemens Energy · Mitsubishi Power", flags: ["⚠ sold out into 2029+"], el: ["Ni", "Co", "Cr", "Re", "Al", "Ti"],
    desc: "Many AI campuses generate their own power on-site because the grid can't connect them fast enough. Hot-section blades are single-crystal nickel superalloys." });
  n("m_ssd", "Enterprise SSDs (NAND flash)", 5, { owner: "Samsung · SK hynix/Solidigm · Kioxia · Micron", desc: "Hold training data, checkpoints and retrieval indexes." });
  n("m_neural_engine", "Phone-class NPU block", 5, { owner: "Apple · Qualcomm", desc: "The neural processing unit inside a phone or glasses chip." });
  n("m_actuators", "Robot actuators & hands", 5, { owner: "Tesla in-house · suppliers in China & Japan", teardown: "robot", el: ["Nd", "Pr", "Dy", "Fe", "B", "Cu"],
    desc: "Motors with neodymium magnets plus planetary roller screws and harmonic gears; the costliest part of a humanoid." });
  n("m_display_glass", "Waveguide display & micro-projector", 5, { owner: "EssilorLuxottica · Lumus · LCoS makers", teardown: "glasses", desc: "Tiny projector and waveguide lens that put an image in one eye of the Ray-Ban Display." });
  n("m_ascend_mem", "HiBL in-house memory", 5, { owner: "Huawei", desc: "Huawei's own stacked memory for the Ascend 950, built because HBM exports to China are restricted." });
})(window.AI);
