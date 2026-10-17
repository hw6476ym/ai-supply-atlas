/* THE ATOMS — which elements AI hardware is made of, what each does, and where it comes from.
   Producer shares are approximate (USGS Mineral Commodity Summaries and industry reports). */
(function (AI) {
  // [Z, symbol, name]
  const raw = "1 H Hydrogen|2 He Helium|3 Li Lithium|4 Be Beryllium|5 B Boron|6 C Carbon|7 N Nitrogen|8 O Oxygen|9 F Fluorine|10 Ne Neon|11 Na Sodium|12 Mg Magnesium|13 Al Aluminium|14 Si Silicon|15 P Phosphorus|16 S Sulfur|17 Cl Chlorine|18 Ar Argon|19 K Potassium|20 Ca Calcium|21 Sc Scandium|22 Ti Titanium|23 V Vanadium|24 Cr Chromium|25 Mn Manganese|26 Fe Iron|27 Co Cobalt|28 Ni Nickel|29 Cu Copper|30 Zn Zinc|31 Ga Gallium|32 Ge Germanium|33 As Arsenic|34 Se Selenium|35 Br Bromine|36 Kr Krypton|37 Rb Rubidium|38 Sr Strontium|39 Y Yttrium|40 Zr Zirconium|41 Nb Niobium|42 Mo Molybdenum|43 Tc Technetium|44 Ru Ruthenium|45 Rh Rhodium|46 Pd Palladium|47 Ag Silver|48 Cd Cadmium|49 In Indium|50 Sn Tin|51 Sb Antimony|52 Te Tellurium|53 I Iodine|54 Xe Xenon|55 Cs Caesium|56 Ba Barium|57 La Lanthanum|58 Ce Cerium|59 Pr Praseodymium|60 Nd Neodymium|61 Pm Promethium|62 Sm Samarium|63 Eu Europium|64 Gd Gadolinium|65 Tb Terbium|66 Dy Dysprosium|67 Ho Holmium|68 Er Erbium|69 Tm Thulium|70 Yb Ytterbium|71 Lu Lutetium|72 Hf Hafnium|73 Ta Tantalum|74 W Tungsten|75 Re Rhenium|76 Os Osmium|77 Ir Iridium|78 Pt Platinum|79 Au Gold|80 Hg Mercury|81 Tl Thallium|82 Pb Lead|83 Bi Bismuth|84 Po Polonium|85 At Astatine|86 Rn Radon|87 Fr Francium|88 Ra Radium|89 Ac Actinium|90 Th Thorium|91 Pa Protactinium|92 U Uranium|93 Np Neptunium|94 Pu Plutonium|95 Am Americium|96 Cm Curium|97 Bk Berkelium|98 Cf Californium|99 Es Einsteinium|100 Fm Fermium|101 Md Mendelevium|102 No Nobelium|103 Lr Lawrencium|104 Rf Rutherfordium|105 Db Dubnium|106 Sg Seaborgium|107 Bh Bohrium|108 Hs Hassium|109 Mt Meitnerium|110 Ds Darmstadtium|111 Rg Roentgenium|112 Cn Copernicium|113 Nh Nihonium|114 Fl Flerovium|115 Mc Moscovium|116 Lv Livermorium|117 Ts Tennessine|118 Og Oganesson";

  function pos(z) {
    // returns [col 1-18, row 1-9] with lanthanides row 8, actinides row 9 (display rows)
    if (z === 1) return [1, 1]; if (z === 2) return [18, 1];
    if (z <= 10) return z <= 4 ? [z - 2, 2] : [z + 8, 2];
    if (z <= 18) return z <= 12 ? [z - 10, 3] : [z, 3];
    if (z <= 36) return [z - 18, 4];
    if (z <= 54) return [z - 36, 5];
    if (z <= 56) return [z - 54, 6];
    if (z <= 71) return [z - 54, 8.6]; // La–Lu row (cols 3..17)
    if (z <= 86) return [z - 68, 6];
    if (z <= 88) return [z - 86, 7];
    if (z <= 103) return [z - 86, 9.6]; // Ac–Lr
    return [z - 100, 7];
  }

  AI.elements = raw.split("|").map((s) => {
    const [z, sym, ...name] = s.split(" ");
    const zz = +z; const [col, row] = pos(zz);
    return { z: zz, sym, name: name.join(" "), col, row };
  });

  // role in AI hardware. risk: 0 none, 1 watch, 2 concentrated, 3 single-region chokepoint
  AI.elementUse = {
    Si: { role: "The chip itself: every transistor channel, wafer and silicon bridge. Also in electrical steel and glass fibre.", top: "China ~75% of silicon metal; Japan (Shin-Etsu, SUMCO) ~55% of 300 mm wafers", risk: 2, nodes: ["r_polysi", "f_shinetsu", "x_spruce", "x_hemlock_sand"] },
    Cu: { role: "Wires inside chips, cold plates, NVLink cables, busbars, transformer windings.", top: "Chile ~24%, DR Congo, Peru; China refines ~45%", risk: 1, nodes: ["r_copper", "x_escondida"] },
    Hf: { role: "High-k gate insulator under every modern transistor; DRAM capacitors.", top: "By-product of zirconium refining (France, USA, China)", risk: 2, nodes: ["r_hafnium", "x_zircon"] },
    W: { role: "Contacts between transistors and the first wiring layer.", top: "China ~80%", risk: 3, nodes: ["r_tungsten", "x_china_w"] },
    Co: { role: "Contacts and liners in the finest wires; superalloys; batteries.", top: "DR Congo ~70%; China refines most", risk: 3, nodes: ["r_cobalt", "x_kolwezi"] },
    Ru: { role: "Liners for the narrowest wires; capping layer on EUV mirrors.", top: "South Africa ~85% (platinum-group by-product)", risk: 3, nodes: ["r_cobalt"] },
    Ta: { role: "Barrier that stops copper diffusing into silicon; capacitors.", top: "DR Congo, Rwanda, Brazil", risk: 2, nodes: ["r_tantalum", "x_coltan"] },
    Ti: { role: "Titanium nitride gate metals and electrodes.", top: "China, Japan, Russia (sponge)", risk: 1, nodes: [] },
    N: { role: "Nitrides (TiN, TaN, GaN), and nitrogen purge gas everywhere in the fab.", top: "Air", risk: 0, nodes: [] },
    O: { role: "Oxides: HfO₂ gates, SiO₂ insulators; water.", top: "Air & water", risk: 0, nodes: ["r_upw"] },
    H: { role: "Hydrogen cleans tin off EUV mirrors; ultrapure water; natural gas fuel.", top: "Everywhere", risk: 0, nodes: ["r_upw", "r_natgas"] },
    He: { role: "Cools wafers, purges tools, laser gas; no substitute in many steps.", top: "USA ~40%, Qatar ~35%", risk: 2, nodes: ["r_helium", "x_qatar_he", "x_us_he"] },
    Ne: { role: "Lasing gas in DUV (ArF/KrF) scanners.", top: "By-product of steel-mill air separation; Ukraine was ~50% pre-2022", risk: 2, nodes: ["r_neon", "x_neon"] },
    Ar: { role: "Sputtering and inert atmospheres; ArF laser gas.", top: "Air", risk: 0, nodes: ["r_neon"] },
    Kr: { role: "KrF laser gas.", top: "Air separation", risk: 1, nodes: ["r_neon"] },
    F: { role: "Etch gases (CF₄, NF₃), hydrofluoric acid, WF₆, photoresist.", top: "Fluorspar: China ~60%, Mexico", risk: 2, nodes: ["r_fluor", "x_fluorspar"] },
    Sn: { role: "Solder micro-bumps; molten tin droplets are the EUV light source; metal-oxide resists.", top: "China, Indonesia, Myanmar (Wa State)", risk: 2, nodes: ["r_tin", "x_tin"] },
    Ag: { role: "Tin-silver solder; contacts.", top: "Mexico, Peru, China", risk: 1, nodes: ["r_gold"] },
    Au: { role: "Contact finishes, bond pads, MEMS mirrors.", top: "Widely mined", risk: 0, nodes: ["r_gold", "x_gold"] },
    Ni: { role: "Under-bump barrier; turbine superalloys; batteries.", top: "Indonesia ~55%", risk: 2, nodes: ["r_superalloy", "x_nickel"] },
    Ga: { role: "GaN power transistors for rack power; InGaAs lasers; LEDs.", top: "China ~98% of primary gallium (export-licensed since 2023)", risk: 3, nodes: ["r_gallium", "x_china_ga"] },
    Ge: { role: "SiGe layers for nanosheet transistors and photodetectors; fibre glass.", top: "China ~60%+ (export-controlled)", risk: 3, nodes: ["r_germanium", "x_yunnan_ge"] },
    In: { role: "Indium phosphide lasers in optical transceivers; ITO; thermal interface.", top: "China ~60%, Korea (Korea Zinc), Japan", risk: 2, nodes: ["r_inp", "x_onsan"] },
    P: { role: "Dopant (n-type silicon); indium phosphide lasers.", top: "Phosphate rock (Morocco, China)", risk: 1, nodes: ["r_inp"] },
    As: { role: "Dopant; gallium arsenide and InGaAs in optics.", top: "China, Peru", risk: 1, nodes: [] },
    B: { role: "Dopant (p-type silicon); NdFeB magnets.", top: "Turkey, USA", risk: 1, nodes: ["r_magnet"] },
    Mo: { role: "EUV mirror multilayers (Mo/Si); some contacts.", top: "China, Chile, USA", risk: 1, nodes: [] },
    Zr: { role: "DRAM capacitor dielectric (ZrO₂).", top: "Australia, South Africa (zircon sands)", risk: 1, nodes: ["x_zircon"] },
    Al: { role: "Work-function tuning in gates; heat sinks, frames, busways.", top: "China ~58% of smelting", risk: 1, nodes: ["r_aluminium", "x_bauxite"] },
    C: { role: "Epoxies, photoresists, ABF film, natural gas, CO₂ laser gas.", top: "Everywhere", risk: 0, nodes: ["r_abf", "r_natgas"] },
    S: { role: "Photoresist acid generators; sulfuric acid cleans.", top: "Oil and gas refining", risk: 0, nodes: ["r_resist"] },
    Fe: { role: "Steel racks and buildings; grain-oriented transformer steel; NdFeB magnets.", top: "Australia, Brazil", risk: 0, nodes: ["r_go_steel", "x_iron"] },
    Cr: { role: "Superalloys; stainless coolant plumbing.", top: "South Africa, Kazakhstan", risk: 1, nodes: ["r_superalloy"] },
    Re: { role: "Turbine-blade superalloys (rarer than gold).", top: "Chile (copper-moly by-product)", risk: 2, nodes: ["r_superalloy"] },
    Nd: { role: "Permanent magnets in robot motors, pumps, fans, speakers.", top: "China ~70% mined, ~90% magnets", risk: 3, nodes: ["r_magnet", "x_bayan"] },
    Pr: { role: "Magnets (with Nd).", top: "China", risk: 3, nodes: ["r_magnet", "x_bayan"] },
    Dy: { role: "Keeps magnets strong when hot.", top: "China/Myanmar ~95%+", risk: 3, nodes: ["r_magnet", "x_bayan"] },
    Tb: { role: "High-temperature magnets.", top: "China/Myanmar", risk: 3, nodes: ["r_magnet"] },
    Li: { role: "Batteries in robots, glasses, backup power (BESS) at data centers.", top: "Australia, Chile; China refines ~65%", risk: 2, nodes: [] },
    U: { role: "Nuclear fuel for plants signed to power AI campuses.", top: "Kazakhstan ~40%, Canada, Namibia", risk: 2, nodes: ["r_uranium", "x_uranium"] },
    Sc: { role: "Scandium-doped aluminium nitride in RF filters and next-gen ferroelectrics.", top: "China, Philippines, Russia", risk: 2, nodes: [] },
    Pt: { role: "Contacts, sensors, catalytic processes.", top: "South Africa ~70%", risk: 2, nodes: [] },
    Pd: { role: "Plating on connectors.", top: "Russia ~40%, South Africa", risk: 2, nodes: [] },
    Bi: { role: "Low-temperature solders.", top: "China", risk: 1, nodes: [] },
    Sb: { role: "Dopant; flame retardants in boards.", top: "China ~50% (export-controlled 2024)", risk: 2, nodes: [] }
  };
})(window.AI);
