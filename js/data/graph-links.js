/* AI SUPPLY GRAPH — edges. Direction: user-facing thing → what it depends on. */
(function (AI) {
  const { l, f, i } = AI;

  /* companies → products */
  f("openai", ["p_chatgpt", "p_gpt", "p_codex", "p_sora"]);
  f("anthropic", ["p_claude", "p_claudecode", "p_mythos"]);
  f("google", ["p_gemini", "p_aimode"]);
  f("meta", ["p_metaai", "p_rayban"]);
  f("xai", ["p_grok"]);
  f("microsoft", ["p_copilot", "p_mai"]);
  f("amazon", ["p_alexa", "p_nova"]);
  f("apple", ["p_appleintel"]);
  f("mistral", ["p_lechat"]);
  f("deepseek", ["p_deepseek"]);
  f("alibaba", ["p_qwen"]);
  f("tml", ["p_tinker"]);
  f("tesla", ["p_fsd", "p_optimus"]);
  f("oracle", ["p_oci"]);
  f("coreweave", ["p_cwcloud"]);
  f("huawei", ["p_ascend_cloud"]);
  // chip companies → their chips
  f("nvidia", ["c_gb200", "c_gb300", "c_vr", "c_hopper", "c_nvswitch", "c_spectrumx", "c_vera"]);
  f("amd", ["c_mi355", "c_helios"]);
  f("broadcom", ["c_tpu7", "c_tpu8", "c_mtia", "c_oai_chip", "c_tomahawk"]);
  f("cerebras", ["c_wse3"]);
  f("huawei", ["c_ascend"]);
  f("google", ["c_tpu7", "c_tpu8"]);
  f("amazon", ["c_trn2", "c_trn3"]);
  f("microsoft", ["c_maia"]);
  f("meta", ["c_mtia"]);
  f("openai", ["c_oai_chip"]);
  f("tesla", ["c_ai5"]);
  f("apple", ["c_apple_silicon"]);
  // products used inside other products
  l("p_copilot", "p_gpt"); l("p_copilot", "p_claude"); l("p_copilot", "p_mai");
  l("p_alexa", "p_claude"); l("p_alexa", "p_nova");
  l("p_appleintel", "p_gemini");
  l("p_chatgpt", "p_gpt"); l("p_codex", "p_gpt");
  l("p_claudecode", "p_claude"); l("p_mythos", "p_claude");
  l("p_aimode", "p_gemini");
  l("p_tinker", "p_qwen");

  /* products → compute sites */
  f("p_gpt", ["s_abilene", "s_shackelford", "s_donaana", "s_milam", "s_portwash", "s_saline", "s_uae", "s_fairwater", "s_fairwater_atl", "s_coreweave"]);
  f("p_chatgpt", ["s_abilene", "s_fairwater", "s_coreweave"]);
  f("p_sora", ["s_coreweave", "s_abilene"]);
  f("p_claude", ["s_rainier", "s_google_tpu", "s_colossus1", "s_fluidstack", "s_everwind", "s_fairwater"]);
  f("p_mythos", ["s_rainier", "s_google_tpu"]);
  f("p_gemini", ["s_google_tpu"]);
  f("p_metaai", ["s_prometheus", "s_hyperion", "s_coreweave"]);
  f("p_rayban", ["s_mobile", "s_prometheus"]);
  f("p_grok", ["s_colossus2"]);
  f("p_mai", ["s_fairwater", "s_fairwater_atl"]);
  f("p_nova", ["s_rainier"]);
  f("p_appleintel", ["s_mobile", "s_pcc", "s_google_tpu"]);
  f("p_lechat", ["s_mistral"]);
  f("p_deepseek", ["s_china"]);
  f("p_qwen", ["s_china"]);
  f("p_tinker", ["s_google_tpu", "s_coreweave"]);
  f("p_fsd", ["s_cortex", "s_mobile"]);
  f("p_optimus", ["s_cortex"]);
  f("p_oci", ["s_abilene", "s_portwash", "s_saline", "s_uae"]);
  f("p_cwcloud", ["s_coreweave"]);
  f("p_ascend_cloud", ["s_china"]);
  l("ssi", "s_google_tpu");

  /* compute sites → systems & chips */
  f("s_abilene", ["c_gb200", "c_gb300", "c_spectrumx"]);
  f("s_shackelford", ["c_vr", "c_gb300"]);
  f("s_donaana", ["c_vr", "c_helios"]);
  f("s_milam", ["c_vr"]);
  f("s_portwash", ["c_vr"]);
  f("s_saline", ["c_vr", "c_oai_chip"]);
  f("s_uae", ["c_gb300"]);
  f("s_fairwater", ["c_gb200", "c_gb300", "c_maia", "c_spectrumx"]);
  f("s_fairwater_atl", ["c_gb300", "c_vr"]);
  f("s_rainier", ["c_trn2", "c_trn3"]);
  f("s_google_tpu", ["c_tpu7", "c_tpu8", "c_vr"]);
  f("s_colossus1", ["c_hopper", "c_gb200", "c_spectrumx"]);
  f("s_colossus2", ["c_gb200", "c_gb300", "c_spectrumx"]);
  f("s_prometheus", ["c_gb200", "c_mi355", "c_mtia", "c_tomahawk"]);
  f("s_hyperion", ["c_gb300", "c_vr", "c_helios", "c_tomahawk"]);
  f("s_fluidstack", ["c_vr", "c_tpu8"]);
  f("s_everwind", ["c_vr"]);
  f("s_coreweave", ["c_hopper", "c_gb200", "c_gb300", "c_vr"]);
  f("s_cortex", ["c_hopper", "c_gb200", "c_ai5"]);
  f("s_pcc", ["c_apple_silicon"]);
  f("s_mistral", ["c_gb200"]);
  f("s_china", ["c_ascend", "c_hopper"]);
  f("s_mobile", ["c_apple_silicon", "c_ar1", "c_ai5"]);
  l("c_oai_chip", "c_tomahawk");
  l("c_oai_chip", "c_wse3");
  l("s_abilene", "c_wse3");

  /* systems → components */
  f("c_gb200", ["m_b200die", "m_hbm3e", "m_cowos", "c_vera", "c_nvswitch", "m_cables", "m_power_shelf", "m_cdu", "m_optics"]);
  f("c_gb300", ["m_b200die", "m_hbm3e", "m_cowos", "c_vera", "c_nvswitch", "m_cables", "m_power_shelf", "m_cdu", "m_optics"]);
  f("c_vr", ["m_rubindie", "m_hbm4", "m_cowos", "c_vera", "c_nvswitch", "m_cables", "m_power_shelf", "m_cdu", "m_cpo"]);
  f("c_hopper", ["m_hbm3e", "m_cowos", "m_optics"]);
  f("c_tpu7", ["m_hbm3e", "m_cowos", "m_optics", "m_cdu"]);
  f("c_tpu8", ["m_hbm4", "m_cowos", "m_n2die", "m_optics", "m_cdu"]);
  f("c_trn2", ["m_hbm3e", "m_cowos", "m_optics"]);
  f("c_trn3", ["m_hbm3e", "m_cowos", "m_optics", "m_cdu"]);
  f("c_mi355", ["m_hbm3e", "m_cowos", "m_cdu"]);
  f("c_helios", ["m_n2die", "m_hbm4", "m_cowos", "m_cdu", "m_optics", "m_power_shelf"]);
  f("c_maia", ["m_hbm3e", "m_cowos"]);
  f("c_mtia", ["m_cowos"]);
  f("c_oai_chip", ["m_hbm4", "m_cowos"]);
  f("c_wse3", ["m_cdu", "m_power_shelf"]);
  f("c_ascend", ["m_ascend_mem"]);
  f("c_spectrumx", ["m_optics", "m_cpo"]);
  f("c_tomahawk", ["m_optics", "m_cpo"]);
  f("c_nvswitch", ["m_cables"]);
  f("c_apple_silicon", ["m_neural_engine", "m_n2die"]);
  f("c_ar1", ["m_neural_engine"]);
  f("c_ai5", ["m_neural_engine"]);
  l("p_optimus", "m_actuators");
  l("p_rayban", "m_display_glass");
  l("p_rayban", "c_ar1");
  // every big site needs power gear
  ["s_abilene", "s_shackelford", "s_donaana", "s_milam", "s_portwash", "s_saline", "s_fairwater", "s_rainier", "s_colossus1", "s_colossus2", "s_prometheus", "s_hyperion", "s_fluidstack", "s_everwind", "s_coreweave", "s_google_tpu"].forEach((s) => l(s, "m_transformer"));
  ["s_abilene", "s_colossus2", "s_hyperion", "s_shackelford", "s_donaana", "s_colossus1"].forEach((s) => l(s, "m_turbine"));
  ["s_abilene", "s_fairwater", "s_rainier", "s_google_tpu", "s_prometheus", "s_hyperion"].forEach((s) => l(s, "m_ssd"));

  /* components → fabs, plants, tools */
  f("m_b200die", ["f_tsmc18", "f_tsmc_az"]);
  f("m_rubindie", ["f_tsmc18"]);
  f("m_n2die", ["f_tsmc_n2"]);
  f("m_hbm3e", ["f_hynix_m15x", "f_samsung_p", "f_micron", "f_hanmi"]);
  f("m_hbm4", ["f_hynix_m15x", "f_samsung_p", "f_micron", "f_hanmi", "f_tsmc18"]);
  f("m_cowos", ["f_tsmc_ap", "m_abf"]);
  f("m_abf", ["f_ibiden", "f_ajinomoto", "f_nittobo"]);
  f("m_optics", ["f_innolight", "f_coherent"]);
  f("m_cpo", ["f_tsmc_ap", "f_coherent"]);
  f("m_cables", ["f_foxconn"]);
  f("m_power_shelf", ["f_vertiv"]);
  f("m_cdu", ["f_vertiv"]);
  f("m_transformer", ["f_hitachi_energy"]);
  f("m_turbine", ["f_gev"]);
  f("m_ssd", ["f_samsung_p"]);
  f("m_neural_engine", ["f_tsmc_n2", "f_tsmc18"]);
  f("m_actuators", ["f_tesla_act"]);
  f("m_display_glass", ["f_essilux"]);
  f("m_ascend_mem", ["f_smic"]);
  l("c_ascend", "f_smic");
  l("c_ai5", "f_samsung_p");
  // racks assembled by ODMs
  ["c_gb200", "c_gb300", "c_vr", "c_tpu7", "c_tpu8", "c_trn2", "c_trn3", "c_helios"].forEach((c) => l(c, "f_foxconn"));
  ["c_gb200", "c_gb300", "c_tpu7", "c_trn2", "c_trn3"].forEach((c) => l(c, "f_quanta"));
  // fabs → tools
  ["f_tsmc18", "f_tsmc_n2", "f_tsmc_az", "f_hynix_m15x", "f_samsung_p", "f_micron"].forEach((fab) => {
    f(fab, ["f_asml", "f_amat", "f_lam", "f_tel", "f_kla", "f_shinetsu", "f_resist"]);
  });
  f("f_smic", ["f_amat", "f_lam", "f_tel", "f_shinetsu"]);
  f("f_tsmc_ap", ["f_amat", "f_kla", "f_hanmi"]);
  f("f_asml", ["f_zeiss", "f_cymer", "f_trumpf"]);

  /* fabs/plants → materials */
  ["f_tsmc18", "f_tsmc_n2", "f_tsmc_az", "f_hynix_m15x", "f_samsung_p", "f_micron", "f_smic"].forEach((fab) => {
    f(fab, ["r_helium", "r_fluor", "r_copper", "r_hafnium", "r_cobalt", "r_tungsten", "r_tantalum", "r_upw", "r_neon"]);
  });
  f("f_shinetsu", ["r_polysi", "r_quartz"]);
  f("f_resist", ["r_resist", "r_fluor"]);
  f("f_cymer", ["r_tin"]);
  f("f_trumpf", ["r_helium"]);
  f("f_tsmc_ap", ["r_tin", "r_gold", "r_copper"]);
  f("f_hynix_m15x", ["r_tin"]);
  f("f_ibiden", ["r_abf", "r_copper"]);
  f("f_ajinomoto", ["r_abf"]);
  f("f_nittobo", ["r_abf"]);
  f("f_innolight", ["r_inp", "r_germanium", "r_gallium", "r_gold"]);
  f("f_coherent", ["r_inp", "r_gallium"]);
  f("f_vertiv", ["r_copper", "r_gallium", "r_aluminium"]);
  f("f_foxconn", ["r_copper", "r_aluminium", "r_gold"]);
  f("f_hitachi_energy", ["r_go_steel", "r_copper"]);
  f("f_gev", ["r_superalloy"]);
  f("f_tesla_act", ["r_magnet", "r_copper"]);
  f("f_essilux", ["r_gallium"]);
  f("f_wacker", ["r_quartz"]);
  l("r_polysi", "f_wacker");
  // energy
  l("m_turbine", "r_natgas");

  /* materials → sources */
  f("r_quartz", ["x_spruce"]);
  f("f_wacker", ["x_hemlock_sand"]);
  f("r_helium", ["x_qatar_he", "x_us_he"]);
  f("r_neon", ["x_neon"]);
  f("r_fluor", ["x_fluorspar"]);
  f("r_copper", ["x_escondida"]);
  f("r_cobalt", ["x_kolwezi"]);
  f("r_tantalum", ["x_coltan"]);
  f("r_tungsten", ["x_china_w"]);
  f("r_gallium", ["x_china_ga"]);
  f("x_china_ga", ["x_bauxite"]);
  f("r_aluminium", ["x_bauxite"]);
  f("r_germanium", ["x_yunnan_ge"]);
  f("r_inp", ["x_onsan"]);
  f("r_tin", ["x_tin"]);
  f("r_hafnium", ["x_zircon"]);
  f("r_magnet", ["x_bayan"]);
  f("r_gold", ["x_gold"]);
  f("r_go_steel", ["x_iron"]);
  f("r_superalloy", ["x_nickel", "x_kolwezi"]);
  f("r_natgas", ["x_permian"]);
  f("r_uranium", ["x_uranium"]);
  f("r_resist", ["x_tin"]);

  /* sites & fabs → electricity */
  ["s_abilene", "s_shackelford", "s_milam", "s_cortex", "s_pcc"].forEach((s) => l(s, "e_ercot"));
  ["s_colossus1", "s_colossus2"].forEach((s) => l(s, "e_memphis"));
  l("s_hyperion", "e_entergy"); l("e_entergy", "x_permian");
  l("s_fairwater", "e_wi_grid"); l("s_portwash", "e_wi_grid");
  l("s_fairwater", "e_crane"); l("e_crane", "r_uranium");
  l("s_rainier", "e_indiana"); l("s_rainier", "e_susquehanna"); l("e_susquehanna", "r_uranium");
  l("s_prometheus", "e_aep_oh");
  l("s_everwind", "e_nova_wind");
  l("s_china", "e_china_grid");
  l("e_memphis", "r_natgas"); l("e_ercot", "r_natgas");
  ["f_tsmc18", "f_tsmc_n2", "f_tsmc_ap"].forEach((fab) => l(fab, "e_taipower"));
  l("e_taipower", "r_natgas");
  ["f_hynix_m15x", "f_samsung_p"].forEach((fab) => l(fab, "e_kepco"));
  l("e_kepco", "r_uranium");
})(window.AI);
