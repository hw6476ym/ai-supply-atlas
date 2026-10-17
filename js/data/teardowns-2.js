/* TEARDOWNS part 2 — TPU, data center, the model itself, optics, robot, glasses */
(function (AI) {
  const T = AI.teardowns;

  T.push({
    id: "tpu", name: "Google TPU (Ironwood → TPU 8)", maker: "Google · Broadcom", kind: "Custom AI chip", node: "c_tpu8",
    tagline: "Google's own chip, wired together with mirrors that steer light.",
    facts: [["Ironwood (v7)", "192 GB HBM3E, 9,216-chip pods"], ["TPU 8t", "Training, 9,600-chip pods, ~121 EF FP4"], ["TPU 8i", "Inference, 288 GB HBM, 384 MB SRAM"], ["Scale", "'Virgo' network to ~1M chips"], ["Users", "Gemini, Anthropic, SSI, Apple, Meta"], ["Since", "TPU v1 in 2015"]],
    why: "The TPU is the most proven alternative to Nvidia. Because Google designs the chip, network, compiler and model together, it can tune the whole stack, and in 2025–26 it began selling that capacity at huge scale to rivals such as Anthropic.",
    ladder: [
      { scale: 100, unit: "m", name: "A pod", see: "Thousands of chips across many racks, wired in a 3D torus.", made: "Racks, optical circuit switches, liquid cooling.", by: "Google data centers", node: "s_google_tpu" },
      { scale: 0.3, unit: "m", name: "Optical circuit switch", see: "A box of tiny MEMS mirrors that re-aim laser beams to rewire the pod in seconds, routing around failed chips.", made: "Silicon micro-mirrors, fibre, lenses.", by: "Google (Apollo OCS)", node: "m_optics" },
      { scale: 0.1, unit: "m", name: "TPU tray", see: "Four chips per board under cold plates.", made: "PCB, cold plates, ICI links.", by: "Celestica, Quanta, others", node: "f_quanta" },
      { scale: 0.03, unit: "m", name: "TPU chip", see: "Compute dies plus HBM stacks on CoWoS.", made: "TSMC silicon, HBM.", by: "Broadcom physical design; MediaTek on some variants", node: "m_cowos" },
      { scale: 1e-3, unit: "m", name: "Matrix multiply unit (MXU)", see: "A systolic array: a grid of multiply-accumulate cells where data pulses through like blood through a heart.", made: "Logic.", by: "Google TPU team" },
      { scale: 1e-9, unit: "m", name: "Transistors and atoms", see: "Same silicon lattice as every other chip.", made: "Si, Hf, Cu, W.", by: "TSMC", node: "f_tsmc18" }
    ],
    howWorks: [
      ["Systolic arrays", "Weights load once; activations flow across the grid, each cell multiplying and passing the sum on, so data is reused without trips to memory."],
      ["SparseCores", "Dedicated units for embedding lookups used in recommendation and some model layers."],
      ["ICI + OCS", "Chips talk directly over Inter-Chip Interconnect; optical switches reconfigure the topology for each job."],
      ["JAX / XLA", "Google's compiler turns model code into TPU instructions; this software stack is the real moat."]
    ],
    howMade: [
      ["Design", "Google architects; Broadcom turns it into a manufacturable chip.", "broadcom"],
      ["Fab", "TSMC.", "f_tsmc18"],
      ["Package", "CoWoS with HBM.", "f_tsmc_ap"],
      ["Racks", "Assembled by ODMs, installed in Google data centers.", "f_quanta"]
    ],
    elements: [["Si", "Chips, MEMS mirrors"], ["Cu", "Wiring, cooling"], ["In", "Lasers (InP) in optics"], ["P", "Lasers (InP)"], ["Hf", "Gate dielectric"], ["Au", "MEMS mirror coating"]],
    chokepoints: ["m_hbm3e", "m_cowos", "f_tsmc18"],
    people: ["pichai", "vahdat", "dean", "tan_hock"],
    money: [["Anthropic–Google/Broadcom deal", "~5 GW from 2027"], ["TPU 8 GA", "H2 2026"]],
    sources: [["Gigazine: TPU 8t and 8i", "https://gigazine.net/gsc_news/en/20260423-google-tpu-8t-8i"], ["Anthropic: SpaceX compute deal and partners", "https://www.anthropic.com/news/higher-limits-spacex"]]
  });

  T.push({
    id: "datacenter", name: "A gigawatt AI campus (Stargate Abilene)", maker: "Crusoe · Oracle · OpenAI", kind: "AI factory", node: "s_abilene",
    tagline: "A city's worth of electricity, turned into tokens.",
    facts: [["Planned power", "~1.2 GW"], ["Buildings", "8"], ["GPUs", "Up to ~400k GB200-class"], ["Running (Apr 2026)", "~0.3 GW, 4 of 8 buildings"], ["Cooling", "Closed-loop liquid"], ["Cost", "Tens of billions $"]],
    why: "The model is only as big as the building. A 1 GW campus uses as much power as ~750,000 US homes, and most of the hard problems (permits, turbines, transformers, water, labour) are not about chips at all.",
    ladder: [
      { scale: 2000, unit: "m", name: "The campus", see: "Hundreds of acres of West Texas: halls, substations, gas generation, cooling yards.", made: "Concrete, steel, copper, land.", by: "Crusoe (developer), Oracle (operator)", node: "s_abilene" },
      { scale: 300, unit: "m", name: "A data hall", see: "One building ~100+ MW, rows of racks on slab floors.", made: "Pre-fab electrical rooms, cooling loops, cable trays.", by: "Construction firms, Vertiv, Schneider", node: "f_vertiv" },
      { scale: 10, unit: "m", name: "Substation & transformers", see: "Grid voltage (hundreds of kV) stepped down to medium voltage, then low voltage at the rack.", made: "Grain-oriented steel cores, copper windings, oil.", by: "Hitachi Energy, Siemens Energy, GE Vernova", node: "m_transformer" },
      { scale: 10, unit: "m", name: "Gas turbine", see: "On-site generation to supplement the grid.", made: "Nickel superalloy blades.", by: "GE Vernova, Siemens Energy", node: "m_turbine" },
      { scale: 2.2, unit: "m", name: "One rack", see: "~130 kW per GB200 rack: as much as ~100 homes.", made: "See the GB200 teardown.", by: "Nvidia + ODMs", node: "c_gb200" },
      { scale: 1e-2, unit: "m", name: "Coolant", see: "Water-glycol at ~25–45 °C flowing through copper cold plates and back to dry coolers.", made: "H₂O, propylene glycol.", by: "", node: "m_cdu" },
      { scale: 1e-10, unit: "m", name: "Electrons and molecules", see: "Every watt becomes heat carried away by water molecules.", made: "H, O, Cu.", by: "" }
    ],
    howWorks: [
      ["Power in", "Grid + on-site generation → substations → transformers → busways → rack power shelves (54 V or 800 V DC)."],
      ["Compute", "Racks join into a cluster through three networks: NVLink (in rack), InfiniBand/Ethernet back-end (between racks), front-end (to the internet)."],
      ["Heat out", "~100% of the electricity becomes heat; closed-loop liquid cooling uses little water once filled."],
      ["Reliability", "With 100,000+ GPUs, something fails every few hours; training jobs checkpoint constantly to survive."]
    ],
    howMade: [
      ["Land and power", "Find land with a power path (grid interconnect, gas line) and permits.", "e_ercot"],
      ["Long-lead gear", "Order transformers and turbines years ahead.", "m_transformer"],
      ["Build shells", "Concrete and steel, with prefab electrical rooms.", "f_vertiv"],
      ["Fit out", "Cooling loops, cable trays, fibre.", "m_optics"],
      ["Rack drop", "Racks arrive pre-integrated and burned-in from ODMs.", "f_foxconn"]
    ],
    elements: [["Cu", "Cables, windings, busbars, cold plates"], ["Fe", "Steel structure, transformer cores"], ["Si", "Electrical steel, chips"], ["Al", "Busways, frames"], ["C", "Concrete, natural gas"], ["Ni", "Turbine alloys"], ["H", "Water, fuel"], ["O", "Water, combustion"]],
    chokepoints: ["m_transformer", "m_turbine", "e_ercot"],
    people: ["altman", "ellison", "magouyrk", "son"],
    money: [["Seven US Stargate sites", "9+ GW planned (Epoch AI, Apr 2026)"], ["Big-4 hyperscaler capex 2026", "~$700B+ (reports)"]],
    sources: [["Epoch AI: where the Stargate sites stand", "https://epoch.ai/blog/openai-stargate-where-the-us-sites-stand"], ["Yahoo Finance: hyperscaler 2026 capex", "https://finance.yahoo.com/sectors/technology/articles/hyperscalers-hit-700-billion-2026-111243744.html"]]
  });

  T.push({
    id: "llm", name: "A large language model", maker: "OpenAI · Anthropic · Google DeepMind · Meta · others", kind: "The software product", node: "p_claude",
    tagline: "Trillions of numbers, learned from text, that predict the next word.",
    facts: [["Parameters", "Hundreds of billions to trillions"], ["Training data", "Tens of trillions of tokens"], ["Training compute", "~10^26–10^27 operations"], ["Training run", "Weeks to months on 10^5+ chips"], ["Architecture", "Transformer (2017)"], ["Output", "One token at a time"]],
    why: "This is what all the steel, silicon and gas is for. A model is a file of numbers (weights). It is 'made' by running the hardware above for months, and 'works' by running it again for every word you read.",
    ladder: [
      { scale: 1e12, unit: "params", name: "The model", see: "A file of ~10¹² numbers, a few terabytes in 8-bit form.", made: "Weights learned during training.", by: "Frontier labs", node: "p_claude" },
      { scale: 1e2, unit: "layers", name: "Transformer layers", see: "~100 identical blocks stacked; each refines the meaning of every token.", made: "Attention + feed-forward (often mixture-of-experts).", by: "" },
      { scale: 1e1, unit: "heads", name: "Attention", see: "Each token looks back at every earlier token and decides which ones matter.", made: "Query, key and value matrices.", by: "" },
      { scale: 1e4, unit: "dims", name: "A token's vector", see: "Each word-piece is a list of ~10,000 numbers that encodes its meaning in context.", made: "Floating-point numbers (BF16/FP8/FP4).", by: "" },
      { scale: 1, unit: "weight", name: "One weight", see: "A single number in 4–16 bits, stored as charge in HBM and as voltage in SRAM.", made: "Bits.", by: "", node: "m_hbm4" },
      { scale: 1e-15, unit: "C", name: "Electrons", see: "In the end, an AI's knowledge is a pattern of electrons in memory cells, and its thinking is electrons switching transistors.", made: "e⁻", by: "" }
    ],
    howWorks: [
      ["Tokenise", "Your text is split into tokens (word-pieces) and turned into vectors."],
      ["Attend", "In each layer, attention mixes information between tokens."],
      ["Transform", "Feed-forward/expert layers apply learned knowledge."],
      ["Predict", "The last layer outputs a probability for every possible next token; one is sampled."],
      ["Repeat", "The new token is appended and the process repeats. Reasoning models do this thousands of times privately before answering."],
      ["Use tools", "Agents call search, code and other tools between tokens."]
    ],
    howMade: [
      ["Collect data", "Web text, books, code, licensed data, synthetic data, and human-written examples.", null],
      ["Pre-train", "Predict the next token across trillions of tokens on 100,000+ accelerators for months.", "s_rainier"],
      ["Post-train", "Supervised fine-tuning, reinforcement learning from human and AI feedback, and RL on verifiable tasks (code, math).", null],
      ["Evaluate and red-team", "Capability, safety and misuse testing; frontier models now go through government and third-party evaluation.", null],
      ["Deploy", "Weights copied to inference clusters worldwide; served by batching many users per GPU.", "s_google_tpu"]
    ],
    elements: [["Si", "Every transistor that trains and runs it"], ["Cu", "Every wire"], ["Hf", "Every gate"], ["C", "Natural gas burned to power it"], ["U", "Nuclear fuel powering some of it"], ["H", "Water that cools it"]],
    chokepoints: ["m_hbm4", "m_cowos", "f_asml", "m_transformer"],
    people: ["amodei_d", "altman", "hassabis", "kaplan", "pachocki", "kavukcuoglu", "wang_alex"],
    money: [["OpenAI round (Apr 2026)", "$122B at $852B"], ["Anthropic round (May 2026)", "$65B at $965B"], ["Training a frontier model", "~$1B+ of compute (estimates)"]],
    sources: [["Vaswani et al., 'Attention Is All You Need' (2017)", "https://arxiv.org/abs/1706.03762"], ["Kaplan et al., 'Scaling Laws for Neural Language Models' (2020)", "https://arxiv.org/abs/2001.08361"]]
  });

  T.push({
    id: "optics", name: "1.6T optical transceiver", maker: "InnoLight · Coherent · Eoptolink · Broadcom", kind: "Networking part", node: "m_optics",
    tagline: "Turns electricity into laser light so racks can talk.",
    facts: [["Speed", "1.6 terabits per second"], ["Lanes", "8 × 200 Gb/s"], ["Power", "~20–30 W each"], ["Per GPU", "Several modules in a large cluster"], ["Laser", "Indium phosphide EML or silicon photonics"], ["Next", "Co-packaged optics"]],
    why: "A 100,000-GPU cluster needs millions of optical links. Optics are now one of the largest costs and power draws in the network, and indium phosphide lasers are a quiet bottleneck.",
    ladder: [
      { scale: 0.1, unit: "m", name: "The module", see: "A metal plug (OSFP) the size of a pack of gum, plugged into a switch.", made: "Housing, PCB, DSP chip, optics.", by: "InnoLight, Eoptolink, Coherent", node: "f_innolight" },
      { scale: 1e-2, unit: "m", name: "DSP chip", see: "Cleans up 200 Gb/s signals; often made by Broadcom or Marvell at TSMC.", made: "5/3 nm CMOS.", by: "Broadcom, Marvell", node: "f_tsmc18" },
      { scale: 1e-3, unit: "m", name: "Laser chip", see: "A sliver of indium phosphide that emits infrared light at ~1,310 nm.", made: "InP, InGaAsP quantum wells.", by: "Coherent, Lumentum, Broadcom", node: "f_coherent" },
      { scale: 1e-8, unit: "m", name: "Quantum wells", see: "Layers a few nanometres thick where electrons and holes recombine to make photons.", made: "In, Ga, As, P.", by: "MOCVD epitaxy", node: "r_inp" },
      { scale: 5.9e-10, unit: "m", name: "InP lattice", see: "Indium and phosphorus atoms alternating in a zinc-blende crystal (lattice constant ~0.587 nm).", made: "In (49), P (15).", by: "Indium from zinc smelters like Korea Zinc", node: "x_onsan" }
    ],
    howWorks: [
      ["Serialize", "The DSP turns parallel data into fast serial streams."],
      ["Modulate", "A laser's light is switched on and off (or in four levels, PAM4) billions of times a second."],
      ["Fibre", "Light travels through glass fibre with almost no loss."],
      ["Detect", "A germanium or InGaAs photodiode converts light back to current."]
    ],
    howMade: [
      ["Grow wafers", "InP substrates and epitaxial layers.", "f_coherent"],
      ["Make lasers and photonic chips", "Fabbed, cleaved, tested.", "f_coherent"],
      ["Assemble", "Lasers, lenses, fibre and DSP aligned to micron precision.", "f_innolight"]
    ],
    elements: [["In", "Laser substrate"], ["P", "Laser substrate"], ["Ga", "Quantum wells"], ["As", "Quantum wells"], ["Ge", "Photodetectors"], ["Si", "DSP, silicon photonics, fibre glass"], ["Au", "Contacts"]],
    chokepoints: ["r_inp", "r_gallium", "f_innolight"],
    people: ["tan_hock", "huang"],
    money: [["Optical module market", "Tens of billions $ per year, growing with each cluster"]],
    sources: [["Coherent Sherman InP fab", "https://www.coherent.com/news/press-releases"]]
  });

  T.push({
    id: "robot", name: "Humanoid robot (Tesla Optimus)", maker: "Tesla", kind: "Embodied AI", node: "p_optimus",
    tagline: "A neural network with hands.",
    facts: [["Height", "~1.7 m"], ["Actuators", "28+ body, ~22 DoF hands (Gen 3 goal)"], ["Brain", "Tesla AI computer"], ["Power", "~2.3 kWh battery (Gen 2 spec)"], ["Training", "Video + teleoperation + simulation"], ["Status", "Pilot production"]],
    why: "Robots move AI from screens into the physical world, and add a new set of chokepoints: rare-earth magnets, precision screws and gears, and batteries.",
    ladder: [
      { scale: 1.7, unit: "m", name: "The robot", see: "A humanoid frame with cameras in the head.", made: "Aluminium, steel, plastics, battery pack in the torso.", by: "Tesla", node: "p_optimus" },
      { scale: 0.1, unit: "m", name: "An actuator", see: "Motor + gearbox or roller screw + sensors + controller in one unit.", made: "Motor, planetary roller screw or harmonic drive, encoder.", by: "Tesla; suppliers in China & Japan", node: "m_actuators" },
      { scale: 0.03, unit: "m", name: "Motor", see: "Copper windings around a rotor of permanent magnets.", made: "NdFeB magnets, copper, electrical steel.", by: "", node: "r_magnet" },
      { scale: 1e-6, unit: "m", name: "Magnet grains", see: "Micron-sized grains of Nd₂Fe₁₄B; dysprosium at the grain edges keeps them strong when hot.", made: "Nd, Pr, Fe, B, Dy, Tb.", by: "Mostly China", node: "x_bayan" },
      { scale: 1e-10, unit: "m", name: "Atoms", see: "Neodymium's 4f electrons produce the strong magnetic moment.", made: "Nd (60).", by: "" }
    ],
    howWorks: [
      ["See", "Cameras feed a vision network (like FSD)."],
      ["Decide", "An end-to-end policy outputs joint targets many times a second."],
      ["Act", "Each actuator's controller drives its motor to the commanded position and force."],
      ["Learn", "Data from teleoperation, video and simulation trains the policy on the Cortex cluster."]
    ],
    howMade: [
      ["Mine and separate rare earths", "Bayan Obo and others.", "x_bayan"],
      ["Make magnets and motors", "Mostly in China.", "r_magnet"],
      ["Build actuators", "Tesla lines in Fremont/Austin.", "f_tesla_act"],
      ["Train the brain", "On Tesla Cortex.", "s_cortex"]
    ],
    elements: [["Nd", "Magnets"], ["Pr", "Magnets"], ["Dy", "Heat-resistant magnets"], ["Fe", "Magnets, steel"], ["B", "Magnets"], ["Cu", "Windings"], ["Li", "Battery"], ["Ni", "Battery cathode"], ["Al", "Frame"]],
    chokepoints: ["x_bayan", "r_magnet"],
    people: ["musk", "elluswamy"],
    money: [["Target price (Musk)", "$20–30k at scale"]],
    sources: [["Tesla AI & Robotics", "https://www.tesla.com/AI"]]
  });

  T.push({
    id: "glasses", name: "Ray-Ban Meta glasses", maker: "Meta · EssilorLuxottica", kind: "AI wearable", node: "p_rayban",
    tagline: "An AI that sees what you see, in a 50-gram frame.",
    facts: [["Weight", "~50 g (Display model ~70 g)"], ["Chip", "Qualcomm AR1 Gen 1"], ["Camera", "12 MP"], ["AI", "Meta AI, on-device + cloud"], ["Display model", "Monocular waveguide + Neural Band"], ["Maker", "EssilorLuxottica"]],
    why: "Glasses are the most likely 'next phone' for AI: always there, hands-free, with a camera at eye level. They show how tiny the physical slice of AI can be when most of the thinking happens in a distant data center.",
    ladder: [
      { scale: 0.15, unit: "m", name: "The glasses", see: "Wayfarer frames hiding cameras, five microphones, speakers and a battery in the arms.", made: "Acetate, lenses, electronics.", by: "EssilorLuxottica", node: "f_essilux" },
      { scale: 0.01, unit: "m", name: "AR1 chip", see: "A Qualcomm processor with an NPU that wakes on 'Hey Meta' and handles photos.", made: "Silicon (TSMC/Samsung).", by: "Qualcomm", node: "c_ar1" },
      { scale: 1e-3, unit: "m", name: "Waveguide (Display)", see: "A lens with microscopic structures that bend a tiny projector's light into your eye.", made: "Glass, nanostructures.", by: "Lumus-style waveguides, LCoS projector", node: "m_display_glass" },
      { scale: 1e-6, unit: "m", name: "Camera pixel", see: "~1 µm pixels in a CMOS sensor turn photons into electrons.", made: "Si.", by: "Sony, Samsung, OmniVision" },
      { scale: 1e-10, unit: "m", name: "Atoms", see: "Silicon, lithium (battery), gallium (LEDs).", made: "Si, Li, Ga, In.", by: "" }
    ],
    howWorks: [
      ["Listen", "Microphones and the NPU detect the wake word."],
      ["Capture", "Camera takes a photo when you ask about what you see."],
      ["Think in the cloud", "Via your phone, the request goes to Meta's data centers (e.g. Prometheus) where Meta AI answers."],
      ["Speak or show", "Answer plays through open-ear speakers or appears on the Display lens."]
    ],
    howMade: [
      ["Chips", "Qualcomm AR1, sensors.", "c_ar1"],
      ["Frames and lenses", "EssilorLuxottica factories.", "f_essilux"],
      ["Cloud", "Meta data centers.", "s_prometheus"]
    ],
    elements: [["Si", "Chips, sensor"], ["Li", "Battery"], ["Co", "Battery"], ["Ga", "LEDs"], ["In", "Display ITO"], ["Nd", "Speaker magnets"]],
    chokepoints: ["r_gallium", "r_magnet"],
    people: ["zuckerberg", "bosworth"],
    money: [["Meta took ~3% of EssilorLuxottica", "2025"]],
    sources: [["Meta Ray-Ban Display announcement", "https://about.fb.com/news/"]]
  });
})(window.AI);
