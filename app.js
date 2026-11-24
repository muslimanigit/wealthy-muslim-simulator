(() => {
  "use strict";

  const STORAGE_KEY = "wealthy-muslim-simulator-v2";

  const presets = [
    ["Small budget", 1000],
    ["Modest savings", 10000],
    ["Significant budget", 100000],
    ["Millionaire", 1000000],
    ["High Net Worth", 10000000],
    ["Ultra Wealth", 100000000],
    ["Billionaire", 1000000000]
  ];

  const categories = [
    "All", "Water", "Food", "Mosques and Infrastructure", "Quran and Islamic Knowledge",
    "Islamic Education", "Orphans", "Healthcare", "Dawah", "Children and Future Generations",
    "Emergency Relief", "Environment", "New Muslims", "Scholars and Educators",
    "Humanitarian Dawah", "Housing", "Research and Technology"
  ];

  // Global Simulator State
  let state = {
    startingWealth: 100000000, // $100M default
    currency: "USD",
    lang: "en", // "en" or "sq"
    donations: {}, // itemId -> count
    customPrices: {},
    selectedCategory: "All",
    searchQuery: "",
    sort: "featured",
    editingPriceId: null // inline price editing id
  };

  // Load persisted state
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") {
      state = { ...state, ...saved };
      if (saved.quantities && !saved.donations) {
        state.donations = saved.quantities;
      }
    }
  } catch (_) { }

  // Currency config
  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
  function getCurrencySymbol() {
    return currencySymbols[state.currency] || "$";
  }

  function formatMoney(value) {
    const symbol = getCurrencySymbol();
    const num = Math.max(0, Math.round(Number(value) || 0));
    return `${symbol}${num.toLocaleString("en-US")}`;
  }

  function formatCompactNumber(num) {
    if (num >= 1e12) return (num / 1e12).toFixed(num % 1e12 === 0 ? 0 : 1) + (state.lang === "sq" ? " trilion" : " trillion");
    if (num >= 1e9) return (num / 1e9).toFixed(num % 1e9 === 0 ? 0 : 1) + (state.lang === "sq" ? " miliard" : " billion");
    if (num >= 1e6) return (num / 1e6).toFixed(num % 1e6 === 0 ? 0 : 1) + (state.lang === "sq" ? " milion" : " million");
    if (num >= 1e3) return (num / 1e3).toFixed(num % 1e3 === 0 ? 0 : 1) + "k";
    return num.toLocaleString("en-US");
  }

  function getPrice(project) {
    const custom = state.customPrices[project.id];
    return Math.max(1, Math.round(Number(custom ?? project.defaultCost) || 1));
  }

  function totalDonated() {
    return PROJECTS.reduce((total, project) => {
      const count = state.donations[project.id] || 0;
      return total + count * getPrice(project);
    }, 0);
  }

  function remainingBalance() {
    return Math.max(0, state.startingWealth - totalDonated());
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // ============================================================
  // ALBANIAN TRANSLATION MAPPINGS (SHQIP)
  // ============================================================
  const ALBANIAN_PROJECT_NAMES = {
    "dawah-1": "Kanale islame në YouTube",
    "dawah-2": "Përmbajtje islame me format të shkurtër (Reels, TikTok)",
    "dawah-3": "Dokumentarë islamë",
    "dawah-4": "Podkaste të davetit",
    "dawah-5": "Materiale daveti me shkrim",
    "dawah-6": "Përkthimi i librave islamë",
    "dawah-7": "Përkthime të Kuranit në gjuhë me nevojë",
    "dawah-8": "Shpërndarja falas e Kuranit",
    "dawah-9": "Shpërndarja e literaturës islame",
    "dawah-10": "Program mentorimi për myslimanët e rinj",
    "dawah-11": "Pako mirëseardhjeje për myslimanët e rinj",
    "dawah-12": "Qendra komunitare për myslimanët e rinj",
    "dawah-13": "Shkolla islame falas",
    "dawah-14": "Platforma të arsimit islam në internet",
    "dawah-15": "Programe për mësimin e gjuhës arabe",
    "dawah-16": "Mësimi i Kuranit në internet",
    "dawah-17": "Trajnim për thirrësit islamë",
    "dawah-18": "Paga për punonjësit me orar të plotë të davetit",
    "dawah-19": "Qendra kërkimore islame",
    "dawah-20": "Ndërtimi i xhamive në komunitete me nevojë",
    "dawah-21": "Mirëmbajtja dhe riparimi i xhamive",
    "dawah-22": "Ngritja e bibliotekave në xhami",
    "dawah-23": "Krijimi i një vakëfi të dedikuar për davet",
    "dawah-24": "Krijimi i fondeve të përhershme të vakëfit",
    "dawah-25": "Organizata humanitare të udhëhequra nga myslimanë",
    "dawah-26": "Filma vizatimorë islamë për fëmijë",
    "dawah-27": "Lojëra edukative islame",
    "dawah-28": "Libra islamë për fëmijë",
    "dawah-29": "Asistentë mësimorë islamë me inteligjencë artificiale",
    "dawah-30": "Aplikacione mobile për Kuranin dhe lutjet",
    "water-1": "Ndërtimi i puseve të ujit",
    "water-2": "Riparimi i puseve ekzistuese",
    "water-3": "Instalimi i sistemeve të filtrimit të ujit",
    "water-4": "Sigurimi i ujit të pastër të pijshëm",
    "water-5": "Ndërtimi i sistemeve ujore komunitare",
    "food-1": "Pako ushqimore emergjente",
    "food-2": "Vakte të ngrohta për nevojtarët",
    "food-3": "Pako ushqimore mujore për familjet",
    "food-4": "Pako ushqimore të Ramazanit (Iftar)",
    "food-5": "Kuzhina komunitare për të varfrit",
    "orphan-1": "Sponsorizimi vjetor i jetimëve",
    "orphan-2": "Mbështetje arsimore për jetimët",
    "orphan-3": "Ndërtimi i qendrave për kujdesin e jetimëve",
    "health-1": "Klinika shëndetësore lëvizëse",
    "health-2": "Pajisje mjekësore emergjente",
    "health-3": "Barna thelbësore për zona lufte",
    "health-4": "Operacione të syve (kataraktit) për të varfrit",
    "health-5": "Mbështetje për maternitete në zona rurale",
    "tree-1": "Mbjellja e pemëve të ullirit (Vakëf)",
    "tree-2": "Mbjellja e palmave të hurmave (Vakëf)",
    "tree-3": "Pyllëzimi dhe mbrojtja e mjedisit",
    "relief-1": "Tenda për ndihmë emergjente",
    "relief-2": "Pako të ngrohjes dimërore",
    "relief-3": "Strehime të përkohshme modulare"
  };

  function getProjectName(project) {
    if (state.lang === "sq") {
      if (ALBANIAN_PROJECT_NAMES[project.id]) return ALBANIAN_PROJECT_NAMES[project.id];
      let name = project.name;
      name = name
        .replace(/Building\s+/gi, "Ndërtimi i ")
        .replace(/Repairing\s+/gi, "Riparimi i ")
        .replace(/Installing\s+/gi, "Instalimi i ")
        .replace(/Providing\s+/gi, "Sigurimi i ")
        .replace(/Establishing\s+/gi, "Krijimi i ")
        .replace(/Support for\s+/gi, "Mbështetje për ")
        .replace(/Support\s+/gi, "Mbështetje për ")
        .replace(/Distribution of\s+/gi, "Shpërndarja e ")
        .replace(/Distribution\s+/gi, "Shpërndarja e ")
        .replace(/Free\s+/gi, "Falas ")
        .replace(/water wells/gi, "puseve të ujit")
        .replace(/water filtration systems/gi, "sistemeve të filtrimit të ujit")
        .replace(/clean drinking water/gi, "ujit të pastër të pijshëm")
        .replace(/community water systems/gi, "sistemeve ujore komunitare")
        .replace(/mosques/gi, "xhamive")
        .replace(/mosque/gi, "xhami")
        .replace(/schools/gi, "shkollave")
        .replace(/school/gi, "shkollë")
        .replace(/libraries/gi, "bibliotekave")
        .replace(/library/gi, "bibliotekë")
        .replace(/Quran/gi, "Kuran")
        .replace(/Islamic/gi, "Islam")
        .replace(/books/gi, "librave")
        .replace(/book/gi, "libër")
        .replace(/translations/gi, "përkthimeve")
        .replace(/translation/gi, "përkthim")
        .replace(/programs/gi, "programeve")
        .replace(/program/gi, "program")
        .replace(/food/gi, "ushqim")
        .replace(/meals/gi, "vakteve")
        .replace(/meal/gi, "vakt")
        .replace(/orphans/gi, "jetimëve")
        .replace(/orphan/gi, "jetim")
        .replace(/medical/gi, "mjekësor")
        .replace(/emergency/gi, "emergjente")
        .replace(/relief/gi, "ndihmë")
        .replace(/endowment \(Waqf\)/gi, "vakëfit");
      return name;
    }
    return project.name;
  }

  function getProjectUnit(unit) {
    if (state.lang === "sq") {
      const u = (unit || "unit").toLowerCase();
      const map = {
        "project": "projekt",
        "month": "muaj",
        "well": "pus",
        "water well": "pus",
        "person": "person",
        "student": "nxënës",
        "family": "familje",
        "pack": "pako",
        "tree": "pemë",
        "kit": "komplet",
        "school": "shkollë",
        "mosque": "xhami",
        "clinic": "klinikë",
        "child": "fëmijë",
        "orphan": "jetim",
        "unit": "njësi"
      };
      return map[u] || u;
    }
    return unit || "unit";
  }

  function getCategoryName(category) {
    if (state.lang === "sq") {
      const catMap = {
        "All": "Të gjitha",
        "Water": "Ujë",
        "Food": "Ushqim",
        "Mosques and Infrastructure": "Xhami & Infrastrukturë",
        "Quran and Islamic Knowledge": "Kurani & Dija Islame",
        "Islamic Education": "Arsimi Islam",
        "Orphans": "Jetimët",
        "Healthcare": "Kujdesi Shëndetësor",
        "Dawah": "Daveti",
        "Children and Future Generations": "Fëmijët & Brezat e Ardhshëm",
        "Emergency Relief": "Ndihma Emergjente",
        "Environment": "Mjedisi",
        "New Muslims": "Myslimanët e Rinj",
        "Scholars and Educators": "Dijetarët & Mësuesit",
        "Humanitarian Dawah": "Daveti Humanitar",
        "Housing": "Strehimi",
        "Research and Technology": "Kërkimi & Teknologjia"
      };
      return catMap[category] || category;
    }
    return category;
  }

  // ============================================================
  // CUTOUT 3D-STYLE VECTOR SVG ICON SYSTEM (TRANSPARENT BACKGROUNDS)
  // ============================================================
  function getIconSVG(type, size = 64) {
    switch (type) {
      case "mosque":
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="msq_dome" x1="50" y1="12" x2="50" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#34d399"/>
              <stop offset="50%" stop-color="#059669"/>
              <stop offset="100%" stop-color="#064e3b"/>
            </linearGradient>
            <linearGradient id="msq_gold" x1="50" y1="4" x2="50" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="40%" stop-color="#f59e0b"/>
              <stop offset="100%" stop-color="#b45309"/>
            </linearGradient>
            <linearGradient id="msq_wall" x1="20" y1="42" x2="80" y2="88" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="70%" stop-color="#f1f5f9"/>
              <stop offset="100%" stop-color="#cbd5e1"/>
            </linearGradient>
            <linearGradient id="msq_arch" x1="50" y1="56" x2="50" y2="84" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#047857"/>
              <stop offset="100%" stop-color="#022c22"/>
            </linearGradient>
          </defs>
          <polygon points="12,82 50,92 88,82 50,72" fill="#e2e8f0"/>
          <polygon points="12,82 50,92 50,88 12,78" fill="#94a3b8"/>
          <polygon points="50,92 88,82 88,78 50,88" fill="#cbd5e1"/>
          <rect x="28" y="44" width="44" height="38" rx="2" fill="url(#msq_wall)" stroke="#cbd5e1" stroke-width="1.2"/>
          <path d="M42 82v-20c0-4.5 3.5-8 8-8s8 3.5 8 8v20z" fill="url(#msq_arch)"/>
          <path d="M44 82v-18c0-3.3 2.7-6 6-6s6 2.7 6 6v18z" fill="#022c22"/>
          <circle cx="50" cy="52" r="2.5" fill="url(#msq_gold)"/>
          <path d="M32 54v-8c0-2.2 1.8-4 4-4s4 1.8 4 4v8z" fill="#059669" opacity="0.85"/>
          <path d="M60 54v-8c0-2.2 1.8-4 4-4s4 1.8 4 4v8z" fill="#059669" opacity="0.85"/>
          <path d="M50 14c-14 12-20 20-20 30h40c0-10-6-18-20-30z" fill="url(#msq_dome)"/>
          <path d="M50 14c-4 9-7 18-7 30h3c0-11 3-19 7-28 4 9 7 17 7 28h3c0-12-3-21-7-30z" fill="#6ee7b7" opacity="0.4"/>
          <path d="M50 5v9M50 7a4 4 0 1 0 3 6 3 3 0 0 1-3-6z" stroke="url(#msq_gold)" stroke-width="2.2" stroke-linecap="round" fill="url(#msq_gold)"/>
          <rect x="16" y="32" width="8" height="50" rx="1.5" fill="url(#msq_wall)" stroke="#cbd5e1" stroke-width="1"/>
          <rect x="14" y="48" width="12" height="3" rx="1" fill="#059669"/>
          <rect x="14" y="34" width="12" height="3" rx="1" fill="#059669"/>
          <polygon points="20,20 15,32 25,32" fill="url(#msq_dome)"/>
          <path d="M20 15v5" stroke="url(#msq_gold)" stroke-width="1.8"/>
          <circle cx="20" cy="14" r="2" fill="url(#msq_gold)"/>
          <rect x="76" y="32" width="8" height="50" rx="1.5" fill="url(#msq_wall)" stroke="#cbd5e1" stroke-width="1"/>
          <rect x="74" y="48" width="12" height="3" rx="1" fill="#059669"/>
          <rect x="74" y="34" width="12" height="3" rx="1" fill="#059669"/>
          <polygon points="80,20 75,32 85,32" fill="url(#msq_dome)"/>
          <path d="M80 15v5" stroke="url(#msq_gold)" stroke-width="1.8"/>
          <circle cx="80" cy="14" r="2" fill="url(#msq_gold)"/>
        </svg>`;

      case "water":
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="well_roof" x1="50" y1="12" x2="50" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#f97316"/>
              <stop offset="70%" stop-color="#ea580c"/>
              <stop offset="100%" stop-color="#9a3412"/>
            </linearGradient>
            <linearGradient id="well_stone" x1="50" y1="52" x2="50" y2="88" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#94a3b8"/>
              <stop offset="60%" stop-color="#64748b"/>
              <stop offset="100%" stop-color="#334155"/>
            </linearGradient>
            <radialGradient id="well_water" cx="50" cy="62" r="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="60%" stop-color="#0284c7"/>
              <stop offset="100%" stop-color="#0369a1"/>
            </radialGradient>
          </defs>
          <path d="M26 32v34" stroke="#78350f" stroke-width="5" stroke-linecap="round"/>
          <path d="M74 32v34" stroke="#78350f" stroke-width="5" stroke-linecap="round"/>
          <path d="M24 34h52" stroke="#92400e" stroke-width="4" stroke-linecap="round"/>
          <polygon points="50,12 86,32 14,32" fill="url(#well_roof)" stroke="#7c2d12" stroke-width="1.5"/>
          <path d="M50 12v20M32 22l18 10M68 22L50 32" stroke="#7c2d12" stroke-width="1.2" opacity="0.6"/>
          <rect x="42" y="38" width="16" height="8" rx="2" fill="#d97706" stroke="#b45309" stroke-width="1"/>
          <line x1="50" y1="46" x2="50" y2="60" stroke="#fde68a" stroke-width="2.5" stroke-dasharray="2 1"/>
          <polygon points="44,56 56,56 54,68 46,68" fill="#b45309" stroke="#78350f" stroke-width="1.2"/>
          <path d="M44 56c0-4 12-4 12 0" stroke="#78350f" stroke-width="1.5" fill="none"/>
          <ellipse cx="50" cy="58" rx="4" ry="1.5" fill="#38bdf8"/>
          <path d="M16 62v18c0 7 15.2 12 34 12s34-5 34-12V62" fill="url(#well_stone)" stroke="#1e293b" stroke-width="2"/>
          <ellipse cx="50" cy="62" rx="34" ry="11" fill="#475569" stroke="#1e293b" stroke-width="2"/>
          <ellipse cx="50" cy="62" rx="28" ry="8" fill="url(#well_water)"/>
          <ellipse cx="50" cy="62" rx="16" ry="4" stroke="#e0f2fe" stroke-width="1" fill="none" opacity="0.75"/>
          <circle cx="56" cy="51" r="2" fill="#38bdf8"/>
          <circle cx="48" cy="48" r="1.5" fill="#bae6fd"/>
        </svg>`;

      case "quran":
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="qr_wood" x1="50" y1="46" x2="50" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#b45309"/>
              <stop offset="50%" stop-color="#78350f"/>
              <stop offset="100%" stop-color="#451a03"/>
            </linearGradient>
            <linearGradient id="qr_cover" x1="50" y1="20" x2="50" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#059669"/>
              <stop offset="100%" stop-color="#064e3b"/>
            </linearGradient>
            <linearGradient id="qr_gold" x1="50" y1="26" x2="50" y2="58" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="60%" stop-color="#f59e0b"/>
              <stop offset="100%" stop-color="#d97706"/>
            </linearGradient>
          </defs>
          <path d="M22 84l56-42M78 84L22 42" stroke="url(#qr_wood)" stroke-width="7" stroke-linecap="round"/>
          <polygon points="50,63 46,67 50,71 54,67" fill="#f59e0b"/>
          <path d="M14 36c11-7 24-5 36 3 12-8 25-10 36-3v26c-11-7-24-5-36 3-12-8-25-10-36-3z" fill="url(#qr_cover)" stroke="#047857" stroke-width="1.8"/>
          <path d="M18 38c9-5 21-4 30 2v22c-9-6-21-7-30-2z" fill="#fffdf5" stroke="#fef3c7" stroke-width="1"/>
          <line x1="24" y1="43" x2="42" y2="48" stroke="url(#qr_gold)" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="24" y1="48" x2="42" y2="53" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/>
          <line x1="24" y1="53" x2="42" y2="58" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/>
          <path d="M82 38c-9-5-21-4-30 2v22c9-6 21-7 30-2z" fill="#ffffff" stroke="#fef3c7" stroke-width="1"/>
          <line x1="76" y1="43" x2="58" y2="48" stroke="url(#qr_gold)" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="76" y1="48" x2="58" y2="53" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/>
          <line x1="76" y1="53" x2="58" y2="58" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/>
          <path d="M50 40v30l4-4 4 4v-30" fill="url(#qr_gold)" stroke="#b45309" stroke-width="0.8"/>
          <circle cx="50" cy="40" r="3" fill="url(#qr_gold)"/>
        </svg>`;

      case "food":
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fd_bowl" x1="50" y1="44" x2="50" y2="84" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#ea580c"/>
              <stop offset="60%" stop-color="#c2410c"/>
              <stop offset="100%" stop-color="#7c2d12"/>
            </linearGradient>
            <radialGradient id="fd_stew" cx="50" cy="50" r="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#fbbf24"/>
              <stop offset="50%" stop-color="#f59e0b"/>
              <stop offset="100%" stop-color="#b45309"/>
            </radialGradient>
          </defs>
          <path d="M18 52c0 18 14.3 32 32 32s32-14 32-32H18z" fill="url(#fd_bowl)" stroke="#7c2d12" stroke-width="2.2"/>
          <ellipse cx="50" cy="52" rx="32" ry="11" fill="#9a3412" stroke="#7c2d12" stroke-width="2"/>
          <ellipse cx="50" cy="51" rx="27" ry="9" fill="url(#fd_stew)"/>
          <circle cx="42" cy="50" r="3.5" fill="#78350f"/>
          <circle cx="57" cy="49" r="3" fill="#15803d"/>
          <circle cx="51" cy="53" r="3" fill="#dc2626"/>
          <circle cx="36" cy="52" r="2.5" fill="#ea580c"/>
          <circle cx="62" cy="53" r="2.5" fill="#fde047"/>
          <path d="M38 40c-3-6 3-10 0-16M50 38c-3-7 3-11 0-18M62 40c-3-6 3-10 0-16" stroke="#fef08a" stroke-width="3" stroke-linecap="round" opacity="0.85"/>
          <ellipse cx="25" cy="74" rx="11" ry="6" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
          <ellipse cx="23" cy="73" rx="4" ry="2.5" fill="#451a03"/>
          <ellipse cx="28" cy="73" rx="4" ry="2.5" fill="#451a03"/>
        </svg>`;

      case "school":
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sch_roof" x1="50" y1="16" x2="50" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#3b82f6"/>
              <stop offset="70%" stop-color="#1d4ed8"/>
              <stop offset="100%" stop-color="#1e3a8a"/>
            </linearGradient>
            <linearGradient id="sch_wall" x1="50" y1="36" x2="50" y2="84" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="60%" stop-color="#f8fafc"/>
              <stop offset="100%" stop-color="#e2e8f0"/>
            </linearGradient>
          </defs>
          <rect x="42" y="10" width="16" height="15" rx="2" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
          <polygon points="50,3 58,10 42,10" fill="url(#sch_roof)"/>
          <circle cx="50" cy="17" r="4" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1"/>
          <line x1="50" y1="15" x2="50" y2="17" stroke="#ffffff" stroke-width="1.2"/>
          <line x1="50" y1="17" x2="52" y2="18" stroke="#ffffff" stroke-width="1.2"/>
          <polygon points="50,22 84,36 16,36" fill="url(#sch_roof)" stroke="#1e40af" stroke-width="1.8"/>
          <rect x="22" y="36" width="56" height="48" rx="2" fill="url(#sch_wall)" stroke="#cbd5e1" stroke-width="1.8"/>
          <rect x="27" y="42" width="5" height="42" fill="#cbd5e1" rx="1"/>
          <rect x="40" y="42" width="5" height="42" fill="#cbd5e1" rx="1"/>
          <rect x="55" y="42" width="5" height="42" fill="#cbd5e1" rx="1"/>
          <rect x="68" y="42" width="5" height="42" fill="#cbd5e1" rx="1"/>
          <rect x="34" y="44" width="4" height="8" rx="1" fill="#93c5fd"/>
          <rect x="47" y="44" width="6" height="8" rx="1" fill="#93c5fd"/>
          <rect x="62" y="44" width="4" height="8" rx="1" fill="#93c5fd"/>
          <path d="M46 84v-18c0-2.5 1.8-4.5 4-4.5s4 2 4 4.5v18z" fill="#78350f" stroke="#451a03" stroke-width="1.2"/>
        </svg>`;

      case "orphan":
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="orp_heart" x1="50" y1="16" x2="50" y2="84" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#f43f5e"/>
              <stop offset="50%" stop-color="#ec4899"/>
              <stop offset="100%" stop-color="#8b5cf6"/>
            </linearGradient>
          </defs>
          <path d="M50 82s-28-15-28-36c0-10 8-18 18-18 7 0 9 4 10 7 1-3 3-7 10-7 10 0 18 8 18 18 0 21-28 36-28 36z" fill="url(#orp_heart)"/>
          <circle cx="42" cy="40" r="6" fill="#ffffff"/>
          <path d="M32 58c0-6 4.5-10 10-10s10 4 10 10z" fill="#ffffff"/>
          <circle cx="58" cy="44" r="5" fill="#fef08a"/>
          <path d="M50 59c0-5 3.6-9 8-9s8 4 8 9z" fill="#fef08a"/>
          <polygon points="50,22 52,27 57,29 52,31 50,36 48,31 43,29 48,27" fill="#fef08a"/>
        </svg>`;

      case "health":
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hlth_van" x1="50" y1="36" x2="50" y2="76" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="70%" stop-color="#f8fafc"/>
              <stop offset="100%" stop-color="#e2e8f0"/>
            </linearGradient>
            <linearGradient id="hlth_glass" x1="68" y1="42" x2="68" y2="58" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="100%" stop-color="#0284c7"/>
            </linearGradient>
          </defs>
          <path d="M16 48h46l14 10v18H16z" fill="url(#hlth_van)" stroke="#cbd5e1" stroke-width="2"/>
          <path d="M62 48l14 10v8h-14z" fill="url(#hlth_glass)" stroke="#0284c7" stroke-width="1.2"/>
          <path d="M38 54a7 7 0 1 0 7 11 5.5 5.5 0 0 1-7-11z" fill="#ef4444"/>
          <rect x="34" y="42" width="10" height="5" rx="2" fill="#ef4444"/>
          <line x1="32" y1="41" x2="46" y2="41" stroke="#f87171" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="30" cy="76" r="8" fill="#1e293b"/>
          <circle cx="30" cy="76" r="3.5" fill="#cbd5e1"/>
          <circle cx="66" cy="76" r="8" fill="#1e293b"/>
          <circle cx="66" cy="76" r="3.5" fill="#cbd5e1"/>
        </svg>`;

      case "tree":
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tr_trunk" x1="50" y1="42" x2="50" y2="86" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#92400e"/>
              <stop offset="60%" stop-color="#78350f"/>
              <stop offset="100%" stop-color="#451a03"/>
            </linearGradient>
            <linearGradient id="tr_leaf" x1="50" y1="12" x2="50" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#22c55e"/>
              <stop offset="60%" stop-color="#16a34a"/>
              <stop offset="100%" stop-color="#14532d"/>
            </linearGradient>
          </defs>
          <path d="M47 50c1 12-2 24-3 36h12c-1-12-4-24-3-36z" fill="url(#tr_trunk)"/>
          <line x1="46" y1="58" x2="55" y2="58" stroke="#b45309" stroke-width="2.2" stroke-linecap="round"/>
          <line x1="45" y1="67" x2="56" y2="67" stroke="#b45309" stroke-width="2.2" stroke-linecap="round"/>
          <line x1="44" y1="76" x2="57" y2="76" stroke="#b45309" stroke-width="2.2" stroke-linecap="round"/>
          <circle cx="45" cy="50" r="4" fill="#f59e0b"/>
          <circle cx="55" cy="50" r="4" fill="#f59e0b"/>
          <circle cx="50" cy="54" r="3.5" fill="#d97706"/>
          <path d="M50 48C32 48 12 30 12 30c17 1 30 9 38 18z" fill="url(#tr_leaf)"/>
          <path d="M50 48C68 48 88 30 88 30c-17 1-30 9-38 18z" fill="url(#tr_leaf)"/>
          <path d="M50 48C50 25 35 10 35 10c5 13 9 25 15 38z" fill="#16a34a"/>
          <path d="M50 48C50 25 65 10 65 10c-5 13-9 25-15 38z" fill="#22c55e"/>
          <path d="M50 48C28 38 20 16 20 16c12 6 22 20 30 32z" fill="#15803d"/>
          <path d="M50 48C72 38 80 16 80 16c-12 6-22 20-30 32z" fill="#16a34a"/>
        </svg>`;

      case "dawah":
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mic_body" x1="50" y1="20" x2="50" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#a855f7"/>
              <stop offset="100%" stop-color="#6b21a8"/>
            </linearGradient>
          </defs>
          <line x1="50" y1="58" x2="50" y2="76" stroke="#4c1d95" stroke-width="5" stroke-linecap="round"/>
          <ellipse cx="50" cy="76" rx="16" ry="5" fill="#3b0764" stroke="#4c1d95" stroke-width="2"/>
          <path d="M35 40c0 10 6.7 18 15 18s15-8 15-18" stroke="#4c1d95" stroke-width="4" stroke-linecap="round"/>
          <rect x="42" y="24" width="16" height="30" rx="8" fill="url(#mic_body)" stroke="#581c87" stroke-width="1.8"/>
          <rect x="44" y="26" width="12" height="14" rx="6" fill="#fbbf24"/>
          <path d="M25 32a22 22 0 0 0 0 22M75 32a22 22 0 0 1 0 22" stroke="#a78bfa" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M18 24a32 32 0 0 0 0 38M82 24a32 32 0 0 1 0 38" stroke="#c4b5fd" stroke-width="3" stroke-linecap="round"/>
        </svg>`;

      case "tech":
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tech_body" x1="50" y1="60" x2="50" y2="76" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#94a3b8"/>
              <stop offset="100%" stop-color="#475569"/>
            </linearGradient>
            <linearGradient id="tech_screen" x1="50" y1="24" x2="50" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#0f172a"/>
              <stop offset="100%" stop-color="#1e1b4b"/>
            </linearGradient>
          </defs>
          <polygon points="20,60 80,60 88,74 12,74" fill="url(#tech_body)" stroke="#334155" stroke-width="1.8"/>
          <rect x="40" y="66" width="20" height="4" rx="1.5" fill="#cbd5e1"/>
          <rect x="24" y="26" width="52" height="34" rx="3" fill="url(#tech_screen)" stroke="#1e293b" stroke-width="2"/>
          <polygon points="50,33 53,38 58,36 55,41 60,44 54,46 56,52 51,49 48,54 45,49 40,51 42,46 36,44 42,41 39,36 44,38" fill="#38bdf8"/>
        </svg>`;

      case "housing":
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hs_roof" x1="50" y1="18" x2="50" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#ea580c"/>
              <stop offset="100%" stop-color="#9a3412"/>
            </linearGradient>
            <linearGradient id="hs_wall" x1="50" y1="44" x2="50" y2="84" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="100%" stop-color="#f1f5f9"/>
            </linearGradient>
          </defs>
          <rect x="66" y="20" width="8" height="16" fill="#78350f" stroke="#451a03" stroke-width="1.2"/>
          <path d="M70 18c-1-3 2-5 0-8" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round"/>
          <polygon points="50,18 86,44 14,44" fill="url(#hs_roof)" stroke="#7c2d12" stroke-width="2"/>
          <rect x="22" y="44" width="56" height="40" rx="2" fill="url(#hs_wall)" stroke="#cbd5e1" stroke-width="2"/>
          <rect x="44" y="58" width="12" height="26" rx="1.5" fill="#78350f" stroke="#451a03" stroke-width="1.2"/>
          <circle cx="53" cy="72" r="1.5" fill="#fef08a"/>
          <rect x="28" y="52" width="10" height="11" rx="1.5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
          <rect x="62" y="52" width="10" height="11" rx="1.5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
        </svg>`;

      case "scholar":
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sch_bisht" x1="50" y1="46" x2="50" y2="84" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#064e3b"/>
              <stop offset="100%" stop-color="#022c22"/>
            </linearGradient>
          </defs>
          <circle cx="50" cy="28" r="10" fill="#1e293b"/>
          <ellipse cx="50" cy="22" rx="11" ry="5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <path d="M32 82c0-14 8-24 18-24s18 10 18 24z" fill="url(#sch_bisht)"/>
          <path d="M43 58l7 18 7-18" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>
          <rect x="42" y="66" width="16" height="12" rx="2" fill="#78350f" stroke="#b45309" stroke-width="1.2"/>
          <line x1="50" y1="66" x2="50" y2="78" stroke="#fef08a" stroke-width="1.2"/>
        </svg>`;

      case "relief":
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rel_box" x1="50" y1="24" x2="50" y2="84" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#eab308"/>
              <stop offset="60%" stop-color="#ca8a04"/>
              <stop offset="100%" stop-color="#854d0e"/>
            </linearGradient>
          </defs>
          <polygon points="50,22 80,36 50,50 20,36" fill="#fde047" stroke="#a16207" stroke-width="1.8"/>
          <polygon points="20,36 50,50 50,82 20,68" fill="#ca8a04" stroke="#854d0e" stroke-width="1.8"/>
          <polygon points="80,36 50,50 50,82 80,68" fill="url(#rel_box)" stroke="#854d0e" stroke-width="1.8"/>
          <path d="M46 56a8 8 0 1 0 8 13 6.2 6.2 0 0 1-8-13z" fill="#dc2626"/>
          <polygon points="50,22 55,24 50,50 45,48" fill="#ffffff" opacity="0.45"/>
        </svg>`;

      case "center-figure":
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fig_suit" x1="50" y1="36" x2="50" y2="82" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#1e293b"/>
              <stop offset="100%" stop-color="#0f172a"/>
            </linearGradient>
          </defs>
          <circle cx="50" cy="20" r="8" fill="#334155"/>
          <ellipse cx="50" cy="16" rx="8" ry="4" fill="#1e293b"/>
          <polygon points="47,28 53,28 51,33 49,33" fill="#ffffff"/>
          <polygon points="49,31 51,31 52,44 50,47 48,44" fill="#047857"/>
          <path d="M36 34c3-2 10-3 14-3s11 1 14 3l-2 26h-24z" fill="url(#fig_suit)" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="50" y1="33" x2="50" y2="60" stroke="#0f172a" stroke-width="1"/>
          <path d="M38 60l2 24h4l3-20 3 20h4l2-24z" fill="#0f172a"/>
          <ellipse cx="42" cy="85" rx="3.5" ry="2" fill="#020617"/>
          <ellipse cx="58" cy="85" rx="3.5" ry="2" fill="#020617"/>
        </svg>`;

      default:
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,15 56,32 74,32 59,44 65,61 50,50 35,61 41,44 26,32 44,32" fill="#10b981" stroke="#047857" stroke-width="1.8"/>
        </svg>`;
    }
  }

  // Pre-load icon images for instant canvas drawing
  const iconImageCache = new Map();
  function getIconImage(type, size = 80) {
    const key = `${type}_${size}`;
    if (iconImageCache.has(key)) return iconImageCache.get(key);

    const svgStr = getIconSVG(type, size);
    const img = new Image();
    img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svgStr);
    iconImageCache.set(key, img);
    return img;
  }

  function getArtFor(project) {
    const name = project.name.toLowerCase();
    const cat = (project.category || "").toLowerCase();

    if (/water|well|filtration|drinking/i.test(name)) return { type: "water", size: 52 };
    if (/quran|mushaf|scripture|translation/i.test(name)) return { type: "quran", size: 48 };
    if (/mosque|masjid|minaret|waqf building|center/i.test(name)) return { type: "mosque", size: 74 };
    if (/meal|food|kitchen|hunger|iftar|ramadan basket/i.test(name)) return { type: "food", size: 48 };
    if (/school|university|education|student|academy|classroom/i.test(name)) return { type: "school", size: 66 };
    if (/orphan|child|youth|family/i.test(name)) return { type: "orphan", size: 50 };
    if (/hospital|clinic|medical|health|doctor|ambulance/i.test(name)) return { type: "health", size: 62 };
    if (/tree|date palm|olive|farm|agriculture|environment/i.test(name)) return { type: "tree", size: 58 };
    if (/dawah|youtube|podcast|broadcast|media|cartoon/i.test(name)) return { type: "dawah", size: 50 };
    if (/ai|software|technology|app|assist/i.test(name)) return { type: "tech", size: 50 };
    if (/housing|home|shelter|tent/i.test(name)) return { type: "housing", size: 58 };
    if (/scholar|teacher|educator|mentor/i.test(name)) return { type: "scholar", size: 54 };
    if (/relief|emergency|aid pack/i.test(name)) return { type: "relief", size: 50 };

    if (cat.includes("water")) return { type: "water", size: 52 };
    if (cat.includes("mosque")) return { type: "mosque", size: 74 };
    if (cat.includes("food")) return { type: "food", size: 48 };
    if (cat.includes("quran")) return { type: "quran", size: 48 };
    if (cat.includes("education")) return { type: "school", size: 66 };

    return { type: "default", size: 48 };
  }

  // ============================================================
  // 2.5D CANVAS SIMULATION ENGINE WITH SPACED-OUT GALLERY
  // ============================================================
  class StageScene {
    constructor(canvas, onLabelClick, onHoverItem) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.onLabelClick = onLabelClick;
      this.onHoverItem = onHoverItem;

      this.camera = {
        x: 0,
        z: 0,
        zoom: 1.0,
        targetX: 0,
        targetZ: 0,
        targetZoom: 1.0
      };

      this.tilt = 0.45;
      this.piles = new Map();

      this.isDragging = false;
      this.hasDragged = false;
      this.startX = 0;
      this.startY = 0;
      this.lastMouseX = 0;
      this.lastMouseY = 0;
      this.hoveredItem = null;

      this.centerFigure = {
        x: 0,
        z: 0,
        size: 60,
        type: "center-figure"
      };

      this.setupCanvas();
      this.bindEvents();
      this.startLoop();
    }

    setupCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = this.canvas.parentElement;
      const rect = this.canvas.getBoundingClientRect();
      const w = rect.width || (parent ? parent.clientWidth : window.innerWidth) || 800;
      const h = rect.height || (parent ? parent.clientHeight : window.innerHeight) || 600;
      this.canvas.width = Math.round(w * dpr);
      this.canvas.height = Math.round(h * dpr);
      this.dpr = dpr;
    }

    bindEvents() {
      window.addEventListener("resize", () => this.setupCanvas());

      this.canvas.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;
        this.isDragging = true;
        this.hasDragged = false;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
      });

      window.addEventListener("mousemove", (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;

        if (this.isDragging) {
          const dx = e.clientX - this.startX;
          const dy = e.clientY - this.startY;
          if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            this.hasDragged = true;
          }

          const moveX = (e.movementX || 0) / (this.camera.zoom * this.dpr);
          const moveZ = (e.movementY || 0) / (this.camera.zoom * this.tilt * this.dpr);

          this.camera.x -= moveX;
          this.camera.z -= moveZ;
          this.camera.targetX = this.camera.x;
          this.camera.targetZ = this.camera.z;
        } else {
          if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            this.handleHover(e.clientX - rect.left, e.clientY - rect.top);
          }
        }
      });

      window.addEventListener("mouseup", (e) => {
        if (this.isDragging) {
          this.isDragging = false;
          if (!this.hasDragged) {
            const rect = this.canvas.getBoundingClientRect();
            this.handleClick(e.clientX - rect.left, e.clientY - rect.top);
          }
        }
      });

      this.canvas.addEventListener("wheel", (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.15 : 0.87;
        this.zoomBy(factor);
      }, { passive: false });

      let touchStartDist = 0;
      let lastTouchX = 0;
      let lastTouchY = 0;

      this.canvas.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) {
          this.isDragging = true;
          lastTouchX = e.touches[0].clientX;
          lastTouchY = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
          this.isDragging = false;
          touchStartDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
        }
      }, { passive: true });

      this.canvas.addEventListener("touchmove", (e) => {
        if (e.touches.length === 1 && this.isDragging) {
          const dx = e.touches[0].clientX - lastTouchX;
          const dy = e.touches[0].clientY - lastTouchY;
          lastTouchX = e.touches[0].clientX;
          lastTouchY = e.touches[0].clientY;

          this.camera.x -= dx / (this.camera.zoom * this.dpr);
          this.camera.z -= dy / (this.camera.zoom * this.tilt * this.dpr);
          this.camera.targetX = this.camera.x;
          this.camera.targetZ = this.camera.z;
        } else if (e.touches.length === 2) {
          const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          if (touchStartDist > 0) {
            const factor = dist / touchStartDist;
            this.camera.targetZoom = Math.min(3.5, Math.max(0.18, this.camera.zoom * factor));
            touchStartDist = dist;
          }
        }
      }, { passive: true });

      this.canvas.addEventListener("touchend", () => {
        this.isDragging = false;
      });
    }

    zoomBy(factor) {
      this.camera.targetZoom = Math.min(3.5, Math.max(0.2, this.camera.targetZoom * factor));
    }

    recenter() {
      let minX = -140;
      let maxX = 140;
      let minZ = -140;
      let maxZ = 140;

      let count = 0;
      for (const pile of this.piles.values()) {
        if (pile.count > 0) {
          count++;
          minX = Math.min(minX, pile.x - pile.width / 2);
          maxX = Math.max(maxX, pile.x + pile.width / 2);
          minZ = Math.min(minZ, pile.z - pile.depth / 2);
          maxZ = Math.max(maxZ, pile.z + pile.depth / 2);
        }
      }

      const centerX = (minX + maxX) / 2;
      const centerZ = (minZ + maxZ) / 2;
      const spanX = Math.max(380, (maxX - minX) * 1.35);
      const spanZ = Math.max(380, (maxZ - minZ) * 1.35);

      const rect = this.canvas.getBoundingClientRect();
      const fitZoomX = rect.width / spanX;
      const fitZoomZ = rect.height / (spanZ * this.tilt);
      const targetZoom = Math.min(1.3, Math.max(0.22, Math.min(fitZoomX, fitZoomZ)));

      this.camera.targetX = centerX;
      this.camera.targetZ = centerZ;
      this.camera.targetZoom = targetZoom;
    }

    focusPile(projectId) {
      const pile = this.piles.get(projectId);
      if (!pile) return;

      this.camera.targetX = pile.x;
      this.camera.targetZ = pile.z;

      const rect = this.canvas.getBoundingClientRect();
      const idealZoom = Math.min(1.5, Math.max(0.4, (rect.width * 0.38) / Math.max(180, pile.width)));
      this.camera.targetZoom = idealZoom;
    }

    syncDonations(donations, newlyDonatedId = null, addedAmount = 0) {
      const activeProjects = PROJECTS.filter(p => (donations[p.id] || 0) > 0);

      let currentRightX = 260;
      let currentLeftX = -260;
      const pileMargin = 160;

      activeProjects.forEach((project, index) => {
        const count = donations[project.id];
        const art = getArtFor(project);
        const baseSize = art.size;

        const visualInstances = Math.min(36, count);
        const cols = Math.max(1, Math.ceil(Math.sqrt(visualInstances)));
        const rows = Math.ceil(visualInstances / cols);

        const spacingX = baseSize * 1.5;
        const spacingZ = baseSize * 2.6;

        const pileWidth = Math.max(100, cols * spacingX);
        const pileDepth = Math.max(100, rows * spacingZ);

        let pile = this.piles.get(project.id);
        const isRight = index % 2 === 0;

        let posX;
        if (isRight) {
          posX = currentRightX + pileWidth / 2;
          currentRightX += pileWidth + pileMargin;
        } else {
          posX = currentLeftX - pileWidth / 2;
          currentLeftX -= (pileWidth + pileMargin);
        }

        const posZ = 0;

        if (!pile) {
          pile = {
            id: project.id,
            project,
            art,
            x: posX,
            z: posZ,
            count: 0,
            instances: [],
            width: pileWidth,
            depth: pileDepth,
            cols,
            rows,
            labelYOffset: (rows * spacingZ * this.tilt) / 2 + baseSize + 30
          };
          this.piles.set(project.id, pile);
        }

        const prevCount = pile.count;
        pile.x = posX;
        pile.z = posZ;
        pile.count = count;
        pile.width = pileWidth;
        pile.depth = pileDepth;
        pile.cols = cols;
        pile.rows = rows;
        pile.labelYOffset = (rows * spacingZ * this.tilt) / 2 + baseSize + 30;

        const newInstances = [];
        for (let i = 0; i < visualInstances; i++) {
          const c = i % cols;
          const r = Math.floor(i / cols);

          const localX = (c - (cols - 1) / 2) * spacingX;
          const localZ = (r - (rows - 1) / 2) * spacingZ;

          const existing = pile.instances[i];
          const isNewlyAdded = (project.id === newlyDonatedId && i >= Math.min(36, prevCount));

          newInstances.push({
            worldX: pile.x + localX,
            worldZ: pile.z + localZ,
            size: baseSize,
            type: art.type,
            dropY: isNewlyAdded ? (90 + Math.random() * 50) : (existing ? existing.dropY : 0),
            dropVel: 0,
            instanceIndex: i + 1
          });
        }
        pile.instances = newInstances;
      });

      for (const [id, pile] of this.piles.entries()) {
        if (!donations[id] || donations[id] <= 0) {
          this.piles.delete(id);
        }
      }

      if (newlyDonatedId && this.piles.has(newlyDonatedId)) {
        this.focusPile(newlyDonatedId);
      }
    }

    worldToScreen(wx, wz) {
      const cx = (this.canvas.width / this.dpr) / 2;
      const cy = (this.canvas.height / this.dpr) / 2;
      const scale = this.camera.zoom;

      const sx = cx + (wx - this.camera.x) * scale;
      const sy = cy + (wz - this.camera.z) * scale * this.tilt;
      return { sx, sy, scale };
    }

    handleHover(mouseX, mouseY) {
      let hit = null;

      for (const pile of this.piles.values()) {
        for (let i = pile.instances.length - 1; i >= 0; i--) {
          const inst = pile.instances[i];
          const { sx, sy, scale } = this.worldToScreen(inst.worldX, inst.worldZ);
          const s = inst.size * scale;
          const top = sy - s - inst.dropY * scale;

          if (mouseX >= sx - s / 2 && mouseX <= sx + s / 2 &&
            mouseY >= top && mouseY <= sy) {
            hit = {
              pile,
              inst,
              name: getProjectName(pile.project),
              number: inst.instanceIndex,
              total: pile.count,
              cost: getPrice(pile.project),
              screenX: sx,
              screenY: top
            };
            break;
          }
        }
        if (hit) break;
      }

      this.hoveredItem = hit;
      if (this.onHoverItem) this.onHoverItem(hit);
    }

    handleClick(mouseX, mouseY) {
      for (const pile of this.piles.values()) {
        const { sx, sy, scale } = this.worldToScreen(pile.x, pile.z - pile.depth / 2);
        const labelY = sy - pile.labelYOffset * scale - 12;

        if (Math.abs(mouseX - sx) < 110 && Math.abs(mouseY - labelY) < 20) {
          this.focusPile(pile.id);
          if (this.onLabelClick) this.onLabelClick(pile.id);
          return;
        }
      }
    }

    startLoop() {
      const render = () => {
        this.updatePhysics();
        this.draw();
        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    }

    updatePhysics() {
      this.camera.x += (this.camera.targetX - this.camera.x) * 0.12;
      this.camera.z += (this.camera.targetZ - this.camera.z) * 0.12;
      this.camera.zoom += (this.camera.targetZoom - this.camera.zoom) * 0.12;

      for (const pile of this.piles.values()) {
        for (const inst of pile.instances) {
          if (inst.dropY > 0 || inst.dropVel !== 0) {
            inst.dropVel += 1.8;
            inst.dropY -= inst.dropVel;
            if (inst.dropY <= 0) {
              inst.dropY = 0;
              inst.dropVel = -inst.dropVel * 0.32;
              if (Math.abs(inst.dropVel) < 0.8) inst.dropVel = 0;
            }
          }
        }
      }
    }

    draw() {
      const ctx = this.ctx;
      const w = this.canvas.width / this.dpr;
      const h = this.canvas.height / this.dpr;

      ctx.save();
      ctx.scale(this.dpr, this.dpr);
      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, Math.max(w, h));
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.7, "#fafafa");
      grad.addColorStop(1, "#f1f3f6");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const drawables = [];

      drawables.push({
        type: "center-figure",
        sortZ: this.centerFigure.z,
        worldX: this.centerFigure.x,
        worldZ: this.centerFigure.z,
        size: this.centerFigure.size,
        iconType: this.centerFigure.type
      });

      for (const pile of this.piles.values()) {
        for (const inst of pile.instances) {
          drawables.push({
            type: "instance",
            sortZ: inst.worldZ,
            inst,
            pile
          });
        }
      }

      drawables.sort((a, b) => a.sortZ - b.sortZ);

      for (const item of drawables) {
        if (item.type === "center-figure") {
          this.drawCenterFigure(ctx, item);
        } else if (item.type === "instance") {
          this.drawInstance(ctx, item.inst, item.pile);
        }
      }

      for (const pile of this.piles.values()) {
        this.drawPileLabel(ctx, pile);
      }

      ctx.restore();
    }

    drawCenterFigure(ctx, item) {
      const { sx, sy, scale } = this.worldToScreen(item.worldX, item.worldZ);
      const s = item.size * scale;

      ctx.save();

      const shadowW = s * 0.38;
      const shadowH = shadowW * this.tilt;

      const shadowGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, shadowW);
      shadowGrad.addColorStop(0, "rgba(15, 23, 42, 0.25)");
      shadowGrad.addColorStop(0.4, "rgba(15, 23, 42, 0.08)");
      shadowGrad.addColorStop(0.8, "rgba(15, 23, 42, 0.01)");
      shadowGrad.addColorStop(1, "rgba(15, 23, 42, 0)");

      ctx.beginPath();
      ctx.ellipse(sx, sy, shadowW, shadowH, 0, 0, Math.PI * 2);
      ctx.fillStyle = shadowGrad;
      ctx.fill();

      const img = getIconImage("center-figure", 80);
      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, sx - s / 2, sy - s * 0.95, s, s);
      }

      ctx.font = `bold ${Math.max(10, Math.round(11 * scale))}px -apple-system, sans-serif`;
      ctx.fillStyle = "#64748b";
      ctx.textAlign = "center";
      ctx.fillText(state.lang === "sq" ? "Ti" : "You", sx, sy + 16 * scale);
      ctx.restore();
    }

    drawInstance(ctx, inst, pile) {
      const { sx, sy, scale } = this.worldToScreen(inst.worldX, inst.worldZ);
      const s = inst.size * scale;
      const dropOffset = inst.dropY * scale;

      ctx.save();

      const shadowFactor = Math.max(0.1, 1 - inst.dropY / 140);
      const shadowW = s * 0.36 * shadowFactor;
      const shadowH = shadowW * this.tilt;

      const shadowGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, shadowW);
      shadowGrad.addColorStop(0, `rgba(15, 23, 42, ${0.26 * shadowFactor})`);
      shadowGrad.addColorStop(0.4, `rgba(15, 23, 42, ${0.08 * shadowFactor})`);
      shadowGrad.addColorStop(0.8, `rgba(15, 23, 42, ${0.01 * shadowFactor})`);
      shadowGrad.addColorStop(1, "rgba(15, 23, 42, 0)");

      ctx.beginPath();
      ctx.ellipse(sx, sy, shadowW, shadowH, 0, 0, Math.PI * 2);
      ctx.fillStyle = shadowGrad;
      ctx.fill();

      const img = getIconImage(inst.type, 80);
      const drawY = sy - s * 0.92 - dropOffset;

      if (this.hoveredItem && this.hoveredItem.inst === inst) {
        ctx.shadowColor = "rgba(16, 185, 129, 0.75)";
        ctx.shadowBlur = 14;
      }

      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, sx - s / 2, drawY, s, s);
      }
      ctx.restore();
    }

    drawPileLabel(ctx, pile) {
      const { sx, sy, scale } = this.worldToScreen(pile.x, pile.z - pile.depth / 2);
      const totalCost = pile.count * getPrice(pile.project);
      const projectName = getProjectName(pile.project);
      const text = `${pile.count.toLocaleString()} ${projectName} • ${formatMoney(totalCost)}`;

      ctx.save();
      const fontSize = Math.max(10, Math.min(13, Math.round(12 * Math.sqrt(scale))));
      ctx.font = `700 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

      const textWidth = ctx.measureText(text).width;
      const padX = 12;
      const padY = 5;
      const boxW = textWidth + padX * 2;
      const boxH = fontSize + padY * 2;
      const boxY = sy - pile.labelYOffset * scale - boxH;

      ctx.shadowColor = "rgba(15, 23, 42, 0.08)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;

      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(sx - boxW / 2, boxY, boxW, boxH, 999);
      } else {
        const rx = sx - boxW / 2, ry = boxY, rw = boxW, rh = boxH, rad = Math.min(boxH / 2, 8);
        ctx.moveTo(rx + rad, ry);
        ctx.arcTo(rx + rw, ry, rx + rw, ry + rh, rad);
        ctx.arcTo(rx + rw, ry + rh, rx, ry + rh, rad);
        ctx.arcTo(rx, ry + rh, rx, ry, rad);
        ctx.arcTo(rx, ry, rx + rw, ry, rad);
        ctx.closePath();
      }
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      ctx.shadowColor = "transparent";
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#0f172a";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, sx, boxY + boxH / 2);

      ctx.restore();
    }
  }

  // ============================================================
  // DOM ELEMENTS & EVENT WIRING
  // ============================================================
  const $ = (selector) => document.querySelector(selector);
  const elements = {
    balance: $("#balanceValue"),
    spent: $("#spentValue"),
    starting: $("#startingValue"),
    spentPie: $("#spentPie"),
    centerBtn: $("#centerBtn"),
    inspirationBtn: $("#inspirationBtn"),
    resetTopBtn: $("#resetTopBtn"),
    zoomInBtn: $("#zoomInBtn"),
    zoomOutBtn: $("#zoomOutBtn"),
    canvasNote: $("#canvasNote"),
    tooltip: $("#canvasTooltip"),
    catalog: $("#catalog"),
    count: $("#catalogCount"),
    nav: $("#categoryNav"),
    search: $("#searchInput"),
    currency: $("#currencySelect"),
    langSelect: $("#langSelect"),
    resetBtn: $("#resetButton"),
    wealthBtn: $("#wealthButton"),
    receiptBtn: $("#receiptButton"),
    particleLayer: $("#particleLayer"),
    toast: $("#toast"),
    stageCanvas: $("#stageCanvas")
  };

  let tweenFrame = null;
  let displayedBalance = state.startingWealth - totalDonated();

  function tweenBalance() {
    cancelAnimationFrame(tweenFrame);
    const startNum = displayedBalance;
    const targetNum = remainingBalance();
    const startTime = performance.now();
    const duration = 500;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      displayedBalance = Math.round(startNum + (targetNum - startNum) * eased);
      renderBalance(displayedBalance);

      if (progress < 1) {
        tweenFrame = requestAnimationFrame(animate);
      }
    };
    tweenFrame = requestAnimationFrame(animate);
  }

  function renderBalance(currentBalance = remainingBalance()) {
    const spent = totalDonated();
    const pct = state.startingWealth > 0 ? Math.min(100, (spent / state.startingWealth) * 100) : 0;
    const isSq = state.lang === "sq";

    const leftWord = isSq ? "të mbetura" : "left";
    elements.balance.textContent = `${formatMoney(currentBalance)} ${leftWord}`;
    elements.spentPie.style.setProperty("--pct", pct);

    const spentRowLabel = $(".spent-label");
    if (spentRowLabel) {
      if (isSq) {
        spentRowLabel.innerHTML = `Keni dhuruar <strong id="spentValue">${formatMoney(spent)}</strong> nga <span id="startingValue">${formatMoney(state.startingWealth)}</span>`;
      } else {
        spentRowLabel.innerHTML = `You've donated <strong id="spentValue">${formatMoney(spent)}</strong> of <span id="startingValue">${formatMoney(state.startingWealth)}</span>`;
      }
    }

    if (spent > 0) {
      elements.canvasNote.style.opacity = "0.85";
    }
  }

  function toast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => elements.toast.classList.remove("show"), 2800);
  }

  function burstDonationParticles(originElement) {
    const rect = originElement ? originElement.getBoundingClientRect() : {
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
      width: 0,
      height: 0
    };

    const icons = ["✨", "💧", "💚", "🪙", "🌿", "🤲", "✦", "📖"];
    const count = 10;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "money-particle";
      particle.textContent = icons[Math.floor(Math.random() * icons.length)];

      const startX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 30;
      const startY = rect.top + rect.height / 2 + (Math.random() - 0.5) * 20;

      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      elements.particleLayer.appendChild(particle);

      const targetX = (Math.random() - 0.5) * 160;
      const targetY = -(80 + Math.random() * 120);
      const rotate = (Math.random() - 0.5) * 360;

      particle.animate([
        { transform: "translate(0, 0) scale(0.6)", opacity: 1 },
        { transform: `translate(${targetX * 0.5}px, ${targetY * 0.6}px) scale(1.1)`, opacity: 0.9, offset: 0.5 },
        { transform: `translate(${targetX}px, ${targetY + 40}px) scale(0.8) rotate(${rotate}deg)`, opacity: 0 }
      ], {
        duration: 900 + Math.random() * 400,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      }).onfinish = () => particle.remove();
    }
  }

  // ============================================================
  // MULTILINGUAL UI STRINGS & DYNAMIC TEXT REFRESH
  // ============================================================
  function renderStaticTexts() {
    const isSq = state.lang === "sq";

    const brand = $("#brandText");
    if (brand) brand.textContent = isSq ? "MULIMANI I PASUR" : "THE WEALTHY MUSLIM";

    const centerBtnSpan = $("#centerBtn span");
    if (centerBtnSpan) centerBtnSpan.textContent = isSq ? "Qendro" : "Center";

    const inspBtnSpan = $("#inspirationBtn span");
    if (inspBtnSpan) inspBtnSpan.textContent = isSq ? "Urtësia" : "Wisdom";

    const wealthBtnSpan = $("#wealthButton .btn-text-full");
    if (wealthBtnSpan) wealthBtnSpan.textContent = isSq ? "Buxheti" : "Budget";

    const receiptBtnSpan = $("#receiptButton .btn-text-full");
    if (receiptBtnSpan) receiptBtnSpan.textContent = isSq ? "Fatura" : "Receipt";

    const resetBtnSpan = $("#resetTopBtn span");
    if (resetBtnSpan) resetBtnSpan.textContent = isSq ? "Rinis" : "Reset";

    const sideTitle = $("#sidebarTitle");
    if (sideTitle) sideTitle.textContent = isSq ? "Dhuro" : "Donate";

    if (elements.search) {
      elements.search.placeholder = isSq ? "Kërko kauza..." : "Search causes...";
      elements.search.setAttribute("aria-label", isSq ? "Kërko kauza" : "Search initiatives");
    }

    const hadithText = $("#hadithText");
    if (hadithText) {
      hadithText.textContent = isSq
        ? "“Sa e mirë është pasuria e pastër në duart e njeriut të drejtë!”"
        : "“How excellent is pure wealth in the hands of a righteous person!”";
    }

    const hadithRef = $("#hadithRef");
    if (hadithRef) {
      hadithRef.textContent = isSq ? "— Profeti Muhamed ﷺ" : "— Prophet Muhammad ﷺ";
    }

    const duaNote = $("#duaNote");
    if (duaNote) {
      duaNote.textContent = isSq
        ? "Allahu e bekoftë pasurinë tuaj, e pranoftë sadakanë tuaj dhe ju mundësoftë të sillni mirësi të pafundme në botë. Amin."
        : "May Allah bless your wealth, accept your charity, and make it possible for you to bring immense good into the world. Ameen.";
    }

    // Inspiration Dialog
    const inspKicker = $("#inspirationDialog .dialog-kicker");
    if (inspKicker) inspKicker.textContent = isSq ? "Udhëzimi Islam" : "Islamic Guidance";

    const inspTitle = $("#inspirationDialog .dialog-title");
    if (inspTitle) inspTitle.textContent = isSq ? "Vlera e Pasurisë në Islam" : "The Value of Wealth in Islam";

    const wisdomCards = document.querySelectorAll("#inspirationDialog .wisdom-card");
    if (wisdomCards.length >= 4) {
      wisdomCards[0].querySelector(".wisdom-translation").textContent = isSq
        ? "“Shembulli i atyre që shpenzojnë pasurinë e tyre në rrugën e Allahut është si i një kokrre nga e cila mbijnë shtatë kallinj, ku secili kalli ka njëqind kokrra. Dhe Allahu ia shumëfishon kujt të dojë.”"
        : "“The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills.”";
      wisdomCards[0].querySelector(".wisdom-source").textContent = isSq ? "— Surja El-Bekare (2:261)" : "— Surah Al-Baqarah (2:261)";

      wisdomCards[1].querySelector(".wisdom-translation").textContent = isSq
        ? "“Sa e mirë është pasuria e pastër dhe e drejtë në duart e njeriut të drejtë!”"
        : "“How excellent is pure, righteous wealth in the hands of a righteous person!”";
      wisdomCards[1].querySelector(".wisdom-source").textContent = isSq ? "— Profeti Muhamed ﷺ (El-Edeb El-Mufred, Sahih)" : "— Prophet Muhammad ﷺ (Al-Adab Al-Mufrad, Sahih)";

      wisdomCards[2].querySelector(".wisdom-translation").textContent = isSq
        ? "“Nuk ka zili të ligjshme përveçse në dy raste: një person të cilit Allahu i ka dhënë pasuri dhe ai e shpenzon me të drejtë në rrugën e së vërtetës, dhe një person të cilit Allahu i ka dhënë dije dhe ai gjykon me të dhe ua mëson të tjerëve.”"
        : "“There is no legitimate envy except in two cases: a person upon whom Allah has bestowed wealth and he spends it rightfully in the cause of truth, and a person upon whom Allah has bestowed wisdom and he judges by it and teaches it.”";
      wisdomCards[2].querySelector(".wisdom-source").textContent = isSq ? "— Sahih el-Buhari & Sahih Muslim" : "— Sahih al-Bukhari & Sahih Muslim";

      wisdomCards[3].querySelector(".wisdom-translation").textContent = isSq
        ? "“Sadakaja nuk e pakëson pasurinë aspak.”"
        : "“Charity does not decrease wealth in the slightest.”";
      wisdomCards[3].querySelector(".wisdom-source").textContent = isSq ? "— Sahih Muslim (2588)" : "— Sahih Muslim (2588)";

      const duaBox = $("#inspirationDialog .dua-box");
      if (duaBox) {
        duaBox.querySelector(".dua-title").textContent = isSq ? "✨ Një Lutje për Trashëgiminë Tuaj" : "✨ A Prayer for Your Legacy";
        duaBox.querySelector("p").textContent = isSq
          ? "Allahu jua mundësoftë, jua zgjeroftë rrizkun e hallallit, ju dhuroftë sinqeritet në çdo vepër dhe e bëftë pasurinë tuaj një mjet të dobisë së përjetshme, dritë të vazhdueshme dhe Sadaka Rrjedhëse (Jariyah) për ju dhe umetin. Amin."
          : "May Allah make it possible for you, expand your halal provision, grant you sincerity in every action, and make your wealth a means of eternal benefit, enduring light, and continuous Sadaqah Jariyah for you and the Ummah. Ameen.";
      }
    }

    const closeInspBtn = $("#closeInspirationBottom");
    if (closeInspBtn) closeInspBtn.textContent = isSq ? "Elhamdulilah" : "Alhamdulillah";

    // Wealth Dialog texts
    const wealthKicker = $("#wealthDialog .dialog-kicker");
    if (wealthKicker) wealthKicker.textContent = isSq ? "Buxheti Hipotetik" : "Hypothetical Budget";

    const wealthTitle = $("#wealthDialog .dialog-title");
    if (wealthTitle) wealthTitle.textContent = isSq ? "Zgjidhni pasurinë fillestare" : "Choose starting wealth";

    const customLabel = $("#wealthDialog .custom-field span");
    if (customLabel) customLabel.textContent = isSq ? "Shuma e personalizuar" : "Custom amount";

    const customInput = $("#customWealth");
    if (customInput) customInput.placeholder = isSq ? "Shkruani shumën" : "Enter amount";

    const cancelWealthBtn = $("#wealthDialog [value='cancel']");
    if (cancelWealthBtn) cancelWealthBtn.textContent = isSq ? "Anulo" : "Cancel";

    const applyWealthBtn = $("#wealthDialog [value='confirm']");
    if (applyWealthBtn) applyWealthBtn.textContent = isSq ? "Apliko pasurinë" : "Apply wealth";

    // Receipt Dialog texts
    const receiptKicker = $("#receiptDialog .dialog-kicker");
    if (receiptKicker) receiptKicker.textContent = isSq ? "Ndikimi Hipotetik" : "Hypothetical Impact";

    const receiptTitle = $("#receiptDialog .dialog-title");
    if (receiptTitle) receiptTitle.textContent = isSq ? "Fatura e ndikimit tuaj" : "Your impact receipt";

    const copySummaryBtn = $("#copySummary");
    if (copySummaryBtn) copySummaryBtn.textContent = isSq ? "Kopjo përmbledhjen" : "Copy summary";

    const closeReceiptBottom = $("#closeReceiptBottom");
    if (closeReceiptBottom) closeReceiptBottom.textContent = isSq ? "Përfundo" : "Done";
  }

  // ============================================================
  // SIDEBAR CATALOG WITH INLINE INPUTS & VECTOR THUMBNAILS
  // ============================================================
  function buildCategories() {
    elements.nav.innerHTML = categories.map(cat => {
      const active = state.selectedCategory === cat ? "active" : "";
      const label = getCategoryName(cat);
      return `<button type="button" class="category-pill ${active}" data-category="${cat}">${label}</button>`;
    }).join("");
  }

  function getVisibleProjects() {
    const query = state.searchQuery.trim().toLowerCase();
    return PROJECTS.filter(p => {
      if (state.selectedCategory !== "All" && p.category !== state.selectedCategory) return false;
      if (!query) return true;
      const transName = getProjectName(p);
      const catName = getCategoryName(p.category);
      return `${p.name} ${transName} ${p.category} ${catName} ${p.subcategory || ""} ${p.description || ""}`.toLowerCase().includes(query);
    });
  }

  function renderCatalog() {
    const projects = getVisibleProjects();
    const balance = remainingBalance();
    const isSq = state.lang === "sq";
    elements.count.textContent = isSq
      ? `${projects.length} ${projects.length === 1 ? "kauzë" : "kauza"}`
      : `${projects.length} ${projects.length === 1 ? "cause" : "causes"}`;

    elements.catalog.innerHTML = projects.map(project => {
      const count = state.donations[project.id] || 0;
      const price = getPrice(project);
      const art = getArtFor(project);
      const canAffordOne = balance >= price;
      const isEditingPrice = state.editingPriceId === project.id;
      const isCustomPrice = state.customPrices[project.id] !== undefined;
      const displayName = getProjectName(project);
      const displayUnit = getProjectUnit(project.unit);

      return `
        <article class="item-card ${count > 0 ? "has-donated" : ""}" data-id="${project.id}">
          <div class="card-top">
            <div class="card-thumb">
              ${getIconSVG(art.type, 48)}
              ${count > 0 ? `<div class="card-count-badge">×${count.toLocaleString()}</div>` : ""}
            </div>
            <div class="card-info">
              <h3 class="card-name" title="${displayName}">${displayName}</h3>
              
              <!-- Inline Price Display or Editor -->
              <div class="card-price-row">
                ${isEditingPrice ? `
                  <div class="inline-price-editor" data-id="${project.id}">
                    <span class="currency-prefix">${getCurrencySymbol()}</span>
                    <input type="number" min="1" step="1" class="inline-price-field" value="${price}" autoFocus aria-label="Custom price">
                    <button type="button" class="inline-save-btn" data-action="save-price-inline" data-id="${project.id}" title="${isSq ? "Ruaj çmimin" : "Save price"}">✓</button>
                    <button type="button" class="inline-reset-btn" data-action="reset-price-inline" data-id="${project.id}" title="${isSq ? "Rikthe te parazgjedhja" : "Reset to default"}">↺</button>
                  </div>
                ` : `
                  <div class="price-display-group">
                    <span class="card-price">${formatMoney(price)}</span>
                    <span class="card-unit">/ ${displayUnit}</span>
                    <button type="button" class="inline-edit-btn" data-action="edit-price-inline" data-id="${project.id}" title="${isSq ? "Kliko për të personalizuar çmimin" : "Click to customize price"}">
                      ✏️ ${isCustomPrice ? `<span class="custom-dot" title="Customized"></span>` : ""}
                    </button>
                  </div>
                `}
              </div>
            </div>
            <!-- Stacked Action (Donate + Refund) -->
            <div class="card-action">
              <button class="donate-btn" type="button" data-action="donate" ${canAffordOne ? "" : "disabled"}>${isSq ? "Dhuro" : "Donate"}</button>
              <button class="sell-btn ${count > 0 ? "active" : ""}" type="button" data-action="undo" ${count > 0 ? "" : "disabled"} title="${isSq ? "Kthe 1 dhurim" : "Refund 1 donation"}">${isSq ? "Kthe" : "Refund"}</button>
            </div>
          </div>

          <!-- Multiplier Chips (x10, x100, x1,000) -->
          <div class="card-mults" aria-label="Bulk donation multipliers">
            ${[10, 100, 1000].map(mult => {
        const affordable = balance >= price * mult;
        return `<button class="mult-chip" type="button" data-action="mult" data-mult="${mult}" ${affordable ? "" : "disabled"}>x${mult.toLocaleString()}</button>`;
      }).join("")}
          </div>

          <!-- Inline Custom Quantity Donation Row -->
          <div class="inline-qty-row">
            <input type="number" min="1" step="1" class="inline-qty-field" placeholder="${isSq ? "Sasi e personalizuar..." : "Custom qty..."}" data-id="${project.id}" aria-label="Custom donation quantity">
            <button type="button" class="inline-qty-donate-btn" data-action="donate-custom-qty" data-id="${project.id}">${isSq ? "Dhuro" : "Donate"}</button>
          </div>
        </article>
      `;
    }).join("");
  }

  // ============================================================
  // DONATION ACTIONS
  // ============================================================
  function donate(project, quantity, triggerElement = null) {
    if (!project || quantity <= 0) return;
    const price = getPrice(project);
    const balance = remainingBalance();
    const affordable = Math.floor(balance / price);
    const isSq = state.lang === "sq";

    if (affordable <= 0) {
      toast(isSq ? "Nuk keni pasuri të mjaftueshme për këtë dhurim." : "Not enough remaining wealth for this donation.");
      return;
    }

    const actual = Math.min(quantity, affordable);
    state.donations[project.id] = (state.donations[project.id] || 0) + actual;

    persist();
    tweenBalance();
    renderCatalog();

    if (triggerElement) {
      burstDonationParticles(triggerElement);
    }

    stage.syncDonations(state.donations, project.id, actual);

    if (actual < quantity) {
      toast(isSq ? `U dhuruan ${actual.toLocaleString()} (maksimumi i përballueshëm).` : `Donated ${actual.toLocaleString()} (maximum affordable).`);
    }
  }

  function undoDonation(project, quantity = 1) {
    if (!project || !state.donations[project.id]) return;
    const current = state.donations[project.id];
    const newCount = Math.max(0, current - quantity);

    if (newCount === 0) {
      delete state.donations[project.id];
    } else {
      state.donations[project.id] = newCount;
    }

    persist();
    tweenBalance();
    renderCatalog();

    stage.syncDonations(state.donations);
  }

  function resetAll() {
    const isSq = state.lang === "sq";
    const confirmMsg = isSq
      ? "A jeni të sigurt që dëshironi të fshini të gjitha dhurimet dhe të filloni nga e para?"
      : "Are you sure you want to reset all donations and start from scratch?";

    if (!confirm(confirmMsg)) return;

    [elements.resetBtn, elements.resetTopBtn].forEach(b => {
      if (b) {
        b.classList.remove("spinning");
        b.offsetWidth;
        b.classList.add("spinning");
      }
    });

    state.donations = {};
    state.customPrices = {};
    state.editingPriceId = null;
    displayedBalance = state.startingWealth;

    persist();
    renderBalance();
    renderCatalog();
    stage.syncDonations(state.donations);
    stage.recenter();

    toast(isSq ? "Simulimi u rinis nga e para." : "Simulation restarted from scratch.");
  }

  // ============================================================
  // INITIALIZE STAGE SCENE & EVENT LISTENERS
  // ============================================================
  const stage = new StageScene(
    elements.stageCanvas,
    (pileId) => {
      const card = elements.catalog.querySelector(`[data-id="${pileId}"]`);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.style.borderColor = "var(--green)";
        setTimeout(() => { card.style.borderColor = ""; }, 1200);
      }
    },
    (hoverItem) => {
      if (hoverItem) {
        elements.tooltip.textContent = `${hoverItem.name} (#${hoverItem.number} of ${hoverItem.total}) • ${formatMoney(hoverItem.cost)}`;
        elements.tooltip.style.left = `${hoverItem.screenX}px`;
        elements.tooltip.style.top = `${hoverItem.screenY}px`;
        elements.tooltip.classList.add("show");
      } else {
        elements.tooltip.classList.remove("show");
      }
    }
  );

  stage.syncDonations(state.donations);

  // Sidebar item interaction
  elements.catalog.addEventListener("click", (e) => {
    const actionEl = e.target.closest("[data-action]");
    const card = e.target.closest(".item-card");
    if (!card) return;

    const project = PROJECTS.find(p => p.id === card.dataset.id);
    if (!project) return;
    const isSq = state.lang === "sq";

    if (actionEl) {
      const action = actionEl.dataset.action;
      if (action === "donate") {
        donate(project, 1, actionEl);
      } else if (action === "undo") {
        undoDonation(project, 1);
      } else if (action === "mult") {
        const mult = Number(actionEl.dataset.mult) || 1;
        donate(project, mult, actionEl);
      } else if (action === "edit-price-inline") {
        state.editingPriceId = project.id;
        renderCatalog();
        const input = elements.catalog.querySelector(`.inline-price-editor[data-id="${project.id}"] input`);
        if (input) {
          input.focus();
          input.select();
        }
      } else if (action === "save-price-inline") {
        const input = card.querySelector(".inline-price-field");
        if (input) {
          const val = Math.round(Number(input.value));
          if (val > 0) {
            state.customPrices[project.id] = val;
            state.editingPriceId = null;
            persist();
            renderBalance();
            renderCatalog();
            stage.syncDonations(state.donations);
            toast(isSq ? `U përditësua çmimi për ${getProjectName(project)}.` : `Updated price for ${project.name}.`);
          } else {
            toast(isSq ? "Shkruani një çmim të vlefshëm më të madh se zero." : "Enter a valid price greater than zero.");
          }
        }
      } else if (action === "reset-price-inline") {
        delete state.customPrices[project.id];
        state.editingPriceId = null;
        persist();
        renderBalance();
        renderCatalog();
        stage.syncDonations(state.donations);
        toast(isSq ? `Çmimi për ${getProjectName(project)} u kthye në vlerën e paracaktuar.` : `Reset price for ${project.name} to default estimate.`);
      } else if (action === "donate-custom-qty") {
        const input = card.querySelector(".inline-qty-field");
        if (input) {
          const qty = Math.floor(Number(input.value));
          if (qty > 0) {
            donate(project, qty, actionEl);
            input.value = "";
          } else {
            toast(isSq ? "Shkruani një sasi të vlefshme për të dhuruar." : "Enter a valid quantity to donate.");
          }
        }
      }
    } else {
      if (state.donations[project.id]) {
        stage.focusPile(project.id);
      }
    }
  });

  // Handle Enter key on inline inputs
  elements.catalog.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const card = e.target.closest(".item-card");
      if (!card) return;
      const project = PROJECTS.find(p => p.id === card.dataset.id);
      if (!project) return;

      if (e.target.classList.contains("inline-price-field")) {
        const saveBtn = card.querySelector('[data-action="save-price-inline"]');
        if (saveBtn) saveBtn.click();
      } else if (e.target.classList.contains("inline-qty-field")) {
        const donateBtn = card.querySelector('[data-action="donate-custom-qty"]');
        if (donateBtn) donateBtn.click();
      }
    } else if (e.key === "Escape") {
      if (state.editingPriceId) {
        state.editingPriceId = null;
        renderCatalog();
      }
    }
  });

  // Category navigation
  elements.nav.addEventListener("click", (e) => {
    const pill = e.target.closest(".category-pill");
    if (!pill) return;
    state.selectedCategory = pill.dataset.category;
    buildCategories();
    renderCatalog();
  });

  // Search input
  elements.search.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderCatalog();
  });

  // Currency select
  elements.currency.addEventListener("change", (e) => {
    state.currency = e.target.value;
    persist();
    renderBalance();
    renderCatalog();
  });

  // Language select (English / Shqip)
  if (elements.langSelect) {
    elements.langSelect.addEventListener("change", (e) => {
      state.lang = e.target.value;
      persist();
      renderStaticTexts();
      buildCategories();
      renderCatalog();
      renderBalance();
      stage.syncDonations(state.donations);
      toast(state.lang === "sq" ? "Gjuha u ndryshua në Shqip." : "Language changed to English.");
    });
  }

  // Center button
  elements.centerBtn.addEventListener("click", () => {
    stage.recenter();
  });

  // Zoom buttons
  elements.zoomInBtn.addEventListener("click", () => stage.zoomBy(1.3));
  elements.zoomOutBtn.addEventListener("click", () => stage.zoomBy(1 / 1.3));

  // Reset buttons (Topbar and Sidebar)
  elements.resetBtn.addEventListener("click", resetAll);
  if (elements.resetTopBtn) {
    elements.resetTopBtn.addEventListener("click", resetAll);
  }

  // Inspiration Dialog wiring
  const inspirationDialog = $("#inspirationDialog");
  if (elements.inspirationBtn && inspirationDialog) {
    elements.inspirationBtn.addEventListener("click", () => {
      inspirationDialog.showModal();
    });
    $("#closeInspiration").addEventListener("click", () => inspirationDialog.close());
    $("#closeInspirationBottom").addEventListener("click", () => inspirationDialog.close());
  }

  // ============================================================
  // WEALTH DIALOG
  // ============================================================
  function openWealthDialog() {
    const dialog = $("#wealthDialog");
    const container = $("#wealthPresets");
    const isSq = state.lang === "sq";

    const presetLabels = isSq ? [
      "Buxhet i vogël", "Kursime modeste", "Buxhet i konsiderueshëm", "Milioner",
      "Pasuri e lartë", "Ultra i pasur", "Miliarder"
    ] : [
      "Small budget", "Modest savings", "Significant budget", "Millionaire",
      "High Net Worth", "Ultra Wealth", "Billionaire"
    ];

    container.innerHTML = presets.map(([, amount], i) => {
      const active = state.startingWealth === amount ? "active" : "";
      return `
        <button type="button" class="wealth-preset ${active}" data-amount="${amount}">
          ${formatMoney(amount)}
          <span>${presetLabels[i]}</span>
        </button>
      `;
    }).join("") + `
      <button type="button" class="wealth-preset" data-amount="custom">
        ${isSq ? "E zgjedhur" : "Custom"}
        <span>${isSq ? "Shkruani buxhetin" : "Enter budget"}</span>
      </button>
    `;

    $("#customWealth").value = "";
    dialog.showModal();
  }

  elements.wealthBtn.addEventListener("click", openWealthDialog);

  $("#wealthPresets").addEventListener("click", (e) => {
    const btn = e.target.closest(".wealth-preset");
    if (!btn) return;
    document.querySelectorAll(".wealth-preset").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    if (btn.dataset.amount !== "custom") {
      $("#customWealth").value = btn.dataset.amount;
    }
  });

  $("#wealthForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const isSq = state.lang === "sq";
    const val = Math.floor(Number($("#customWealth").value));
    if (!val || val < 1) {
      toast(isSq ? "Shkruani një shumë të vlefshme pasurie." : "Enter a valid wealth amount.");
      return;
    }

    state.startingWealth = val;
    persist();
    renderBalance();
    renderCatalog();
    $("#wealthDialog").close();

    const spent = totalDonated();
    if (spent > val) {
      toast(isSq ? `Dhurimet aktuale arrijnë në ${formatMoney(spent)} — ${formatMoney(spent - val)} mbi këtë buxhet.` : `Current donations total ${formatMoney(spent)} — ${formatMoney(spent - val)} over this budget.`);
    } else {
      toast(isSq ? "Pasuria fillestare u përditësua." : "Starting wealth updated.");
    }
  });

  document.querySelectorAll(".dialog-close, [value='cancel']").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const dialog = e.target.closest("dialog");
      if (dialog) dialog.close();
    });
  });

  // ============================================================
  // IMPACT RECEIPT DIALOG
  // ============================================================
  function renderReceipt() {
    const donatedProjects = PROJECTS.filter(p => (state.donations[p.id] || 0) > 0);
    const spent = totalDonated();
    const isSq = state.lang === "sq";

    if (!donatedProjects.length) {
      $("#receiptContent").innerHTML = `
        <div class="receipt-empty">
          <p>${isSq ? "Ende nuk është financuar asnjë nismë." : "No initiatives have been funded yet."}</p>
          <p style="margin-top: 6px; font-size: 0.82rem; color: #94a3b8;">${isSq ? "Dhurohuni kauzave nga shiriti anësor për të vizualizuar ndikimin tuaj." : "Donate to causes from the sidebar to visualize your impact."}</p>
        </div>
      `;
      return;
    }

    $("#receiptContent").innerHTML = `
      <table class="receipt-table">
        <thead>
          <tr>
            <th>${isSq ? "Nisma" : "Initiative"}</th>
            <th>${isSq ? "Sasia" : "Quantity"}</th>
            <th>${isSq ? "Kostoja për njësi" : "Unit Cost"}</th>
            <th>${isSq ? "Totali" : "Total"}</th>
          </tr>
        </thead>
        <tbody>
          ${donatedProjects.map(p => {
      const count = state.donations[p.id];
      const price = getPrice(p);
      const name = getProjectName(p);
      const cat = getCategoryName(p.category);
      return `
              <tr>
                <td><strong>${name}</strong><br><small style="color:#64748b">${cat}</small></td>
                <td>${count.toLocaleString()}</td>
                <td>${formatMoney(price)}</td>
                <td><strong>${formatMoney(count * price)}</strong></td>
              </tr>
            `;
    }).join("")}
        </tbody>
      </table>
      <div class="receipt-totals">
        <div><span>${isSq ? "Totali i Dhuruar" : "Total Donated"}</span><br><strong>${formatMoney(spent)}</strong></div>
        <div style="text-align: right;"><span>${isSq ? "Bilanci i Mbetur" : "Remaining Balance"}</span><br><strong>${formatMoney(remainingBalance())}</strong></div>
      </div>
      <div class="receipt-dua">
        <strong>✨ ${isSq ? "Allahu jua mundësoftë:" : "May Allah make it possible for you:"}</strong><br>
        ${isSq
        ? "“Shembulli i atyre që shpenzojnë pasurinë e tyre në rrugën e Allahut është si i një kokrre nga e cila mbijnë shtatë kallinj, ku secili kalli ka njëqind kokrra...” (Kurani 2:261). Allahu i pranoftë qëllimet tuaja dhe jua shumëfishoftë shpërblimin. Amin."
        : "“The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven spikes; in each spike is a hundred grains...” (Quran 2:261). May Allah accept your intentions and multiply your reward. Ameen."}
      </div>
    `;
  }

  elements.receiptBtn.addEventListener("click", () => {
    renderReceipt();
    $("#receiptDialog").showModal();
  });

  $("#closeReceipt").addEventListener("click", () => $("#receiptDialog").close());
  $("#closeReceiptBottom").addEventListener("click", () => $("#receiptDialog").close());

  $("#copySummary").addEventListener("click", async () => {
    const donatedProjects = PROJECTS.filter(p => (state.donations[p.id] || 0) > 0);
    const isSq = state.lang === "sq";
    const summary = isSq
      ? `Kam alokuar ${formatMoney(totalDonated())} në ${donatedProjects.length} nisma në simuluesin e ndikimit Muslimani i Pasur. Të mbetura: ${formatMoney(remainingBalance())}.`
      : `I allocated ${formatMoney(totalDonated())} across ${donatedProjects.length} initiatives in The Wealthy Muslim impact simulator. Remaining: ${formatMoney(remainingBalance())}.`;

    try {
      await navigator.clipboard.writeText(summary);
      toast(isSq ? "Përmbledhja e ndikimit u kopjua në kujtesë." : "Impact summary copied to clipboard.");
    } catch (_) {
      toast(summary);
    }
  });

  // Initial render
  if (elements.langSelect) {
    elements.langSelect.value = state.lang || "en";
  }
  renderStaticTexts();
  buildCategories();
  renderBalance();
  renderCatalog();
  elements.currency.value = state.currency;
})();
