/* TEARDOWNS part 3 — the two jobs all this hardware does: training and inference.
   Ladders here descend through counts (GPUs, ops) instead of metres. */
(function (AI) {
  const T = AI.teardowns;

  T.push({
    id: "training", name: "A frontier training run", maker: "Any frontier lab", kind: "The job: training", node: "s_rainier",
    tagline: "100,000 chips doing one multiplication problem for three months.",
    facts: [["Chips", "~10⁵ GPUs/TPUs/Trainium"], ["Compute", "~10²⁶–10²⁷ FLOPs"], ["Duration", "~2–4 months"], ["Power", "~150–300 MW while running"], ["MFU", "~35–50% at scale"], ["Failure rate", "A hardware fault every few hours"]],
    why: "Training is where most of the capital goes. Getting 100,000 chips to act as one machine is a systems problem as much as a research one: networks, memory, failures and power swings decide how much of the theoretical compute turns into a better model.",
    ladder: [
      { scale: 100000, unit: "chips", name: "The cluster", see: "One job spread across ~100,000 accelerators in one or several buildings, sometimes several campuses linked by dedicated fibre (Microsoft Fairwater, Google multi-site TPU).", made: "Data parallelism across groups of replicas; gradients averaged every step.", by: "Cluster schedulers, NCCL / JAX / Neuron collectives", node: "s_rainier" },
      { scale: 10000, unit: "chips", name: "A pipeline stage group", see: "The model's layers are cut into stages; micro-batches flow through like an assembly line (pipeline parallelism).", made: "1F1B / interleaved schedules to hide 'bubbles' of idle time.", by: "Megatron-LM, DeepSpeed, MaxText, in-house stacks" },
      { scale: 72, unit: "chips", name: "One scale-up domain", see: "Tensor and expert parallelism live inside the fast domain (NVL72, TPU slice, Trn UltraServer) because they talk every layer.", made: "NVLink / ICI / NeuronLink all-to-all for mixture-of-experts routing.", by: "", node: "c_nvswitch" },
      { scale: 1, unit: "chip", name: "One accelerator", see: "Holds a shard of weights, optimizer state (often 2–3× the weights in FP32) and activations; recomputes some activations to save memory.", made: "HBM capacity is usually the binding limit.", by: "", node: "m_hbm4" },
      { scale: 1e15, unit: "FLOP/s", name: "One step's math", see: "Each token costs ~6 FLOPs per parameter in training (2 forward, 4 backward). Multiply by tokens and you get the run's total compute.", made: "Matrix multiplies in BF16/FP8 with FP32 accumulation.", by: "" },
      { scale: 1, unit: "MMA", name: "One tensor-core instruction", see: "A small matrix multiply-accumulate (e.g. 16×8×16) issued by a warp; everything above is billions of these.", made: "Transistors switching.", by: "", node: "m_b200die" }
    ],
    howWorks: [
      ["Data pipeline", "Trillions of filtered, deduplicated tokens stream from storage, tokenised and shuffled."],
      ["Forward pass", "Each micro-batch runs through every layer, producing a loss: how wrong the next-token guesses were."],
      ["Backward pass", "Gradients flow back through the layers (2× the forward compute)."],
      ["All-reduce", "Gradients are averaged across data-parallel replicas over the scale-out network; overlapping this with compute is the core trick."],
      ["Optimizer step", "AdamW-style update of every weight, sharded across chips (ZeRO / FSDP)."],
      ["Checkpoint", "State is saved every few minutes to hours so a failed chip costs minutes, not days."],
      ["Post-training", "After pre-training, RL on verifiable tasks runs many inference rollouts per update, blurring training and inference hardware."]
    ],
    howMade: [
      ["Secure compute", "Multi-year contracts for a site, power and chips.", "s_rainier"],
      ["Burn-in", "Racks are stress-tested; bad GPUs and links are weeded out before the run.", "f_foxconn"],
      ["Scaling-law sweeps", "Small runs predict the loss of the big one and pick hyperparameters.", null],
      ["The big run", "Weeks to months, with on-call teams watching loss curves and hardware health.", "c_gb200"],
      ["Evaluate and post-train", "Benchmarks, safety evals, then RL and fine-tuning.", null]
    ],
    elements: [["Si", "Every chip"], ["Cu", "NVLink spines and wires"], ["Hf", "Transistor gates"], ["C", "Gas burned for power"], ["U", "Nuclear power in some grids"]],
    chokepoints: ["m_hbm4", "m_cowos", "m_transformer", "m_turbine"],
    people: ["kaplan", "pachocki", "mccandlish", "dean", "brown_tom"],
    money: [["Compute cost of one frontier run", "~$1B+ (estimates)"], ["Rule of thumb", "6 × params × tokens = training FLOPs"], ["A GB200 GPU-hour (rented)", "~$3–6 (2026 market range)"]],
    sources: [["Kaplan et al., Scaling Laws (2020)", "https://arxiv.org/abs/2001.08361"], ["Hoffmann et al., Chinchilla (2022)", "https://arxiv.org/abs/2203.15556"], ["Narayanan et al., Megatron-LM at scale (2021)", "https://arxiv.org/abs/2104.04473"], ["Meta: Llama 3 paper, failure statistics (2024)", "https://arxiv.org/abs/2407.21783"]]
  });

  T.push({
    id: "inference", name: "Serving one AI answer", maker: "Any model provider", kind: "The job: inference", node: "p_chatgpt",
    tagline: "What happens in the ~seconds between Enter and the first word.",
    facts: [["Share of AI compute", "Majority and rising"], ["Bottleneck", "Memory bandwidth (decode)"], ["Batch", "Hundreds of users per GPU group"], ["KV cache", "GBs per long conversation"], ["Tricks", "Speculative decoding, MoE, FP4"], ["Metric", "Tokens/s per user and per MW"]],
    why: "Inference is now where the money is made and spent. For AI builders, its cost is set by memory bandwidth and capacity more than raw FLOPs, which is why HBM, SRAM-heavy chips and FP4 matter so much.",
    ladder: [
      { scale: 1e8, unit: "users", name: "The fleet", see: "Requests from hundreds of millions of users are routed by region and model to many clusters.", made: "Load balancers, schedulers, rate limits.", by: "", node: "s_abilene" },
      { scale: 72, unit: "chips", name: "A serving replica", see: "One copy of a big model spread over a scale-up domain; prefill and decode may run on different pools (disaggregated serving).", made: "Tensor + expert parallelism.", by: "vLLM, SGLang, TensorRT-LLM, Dynamo, in-house", node: "c_gb300" },
      { scale: 256, unit: "requests", name: "A batch", see: "Continuous batching packs many users' next tokens into one step so weights are read once for all of them.", made: "Paged KV cache blocks.", by: "" },
      { scale: 1e9, unit: "bytes", name: "One user's KV cache", see: "Keys and values for every past token in every layer; a 1M-token context can need tens of GB, so it spills to CPU memory or SSD.", made: "HBM, LPDDR, NVMe.", by: "", node: "m_hbm4" },
      { scale: 1, unit: "token", name: "One decode step", see: "Read all active weights from memory, do a little math, emit one token. Speculative decoding guesses several tokens with a small model and verifies them at once.", made: "FP8/FP4 matmuls.", by: "" }
    ],
    howWorks: [
      ["Route", "API gateway picks a model, region and replica; checks safety filters."],
      ["Prefill", "The whole prompt is processed in parallel; compute-bound. Prompt caching skips repeated prefixes."],
      ["Decode", "Tokens generated one at a time; memory-bandwidth-bound. Reasoning models decode thousands of hidden tokens first."],
      ["Tools", "Agents pause to call search, code execution or other APIs, then resume."],
      ["Stream", "Tokens stream back over HTTPS as they are produced."]
    ],
    howMade: [
      ["Quantise", "Weights compressed to FP8/FP4 with little quality loss.", null],
      ["Shard", "Model split across the scale-up domain.", "c_nvswitch"],
      ["Autoscale", "Replicas follow daily demand cycles across time zones.", "s_fairwater"]
    ],
    elements: [["Si", "Chips and SRAM"], ["Cu", "Interconnect"], ["Hf", "Gates"], ["Zr", "DRAM capacitors holding the KV cache"]],
    chokepoints: ["m_hbm4", "m_cowos"],
    people: ["altman", "amodei_d", "huang", "ross"],
    money: [["Cost per million tokens", "Fell ~10×+ per year for equal quality (2023–26)"], ["Nvidia's Rubin pitch", "~10× lower inference cost vs Blackwell"]],
    sources: [["Kwon et al., PagedAttention / vLLM (2023)", "https://arxiv.org/abs/2309.06180"], ["Leviathan et al., Speculative decoding (2023)", "https://arxiv.org/abs/2211.17192"], ["Epoch AI: LLM inference price trends", "https://epoch.ai/data-insights/llm-inference-price-trends"]]
  });
})(window.AI);
