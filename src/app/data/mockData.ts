// ─── Internal Dashboard Mock Data ───────────────────────────────────────────

export const kpiData = {
  totalInspections: 148,
  inspectionDelta: "+12 vs last quarter",
  backlogConversionRate: 63.5,
  conversionDelta: "+4.2% vs last quarter",
  revenuePotential: 4_872_500_000,
  revenueDelta: "+Rp 520jt vs last quarter",
  pendingPO: 54,
  pendingDelta: "38 units butuh follow-up",
  crossCommodityRate: 35, // NEW: Cross-Commodity Backlog Rate
};

export const commodityData = [
  { name: "BAT", value: 35, color: "#eab308" },
  { name: "GET", value: 42, color: "#1a2b4a" },
  { name: "TYR", value: 20, color: "#f97316" },
  { name: "FCG", value: 28, color: "#22c55e" },
  { name: "LUB", value: 22, color: "#3b82f6" },
  { name: "Autofire", value: 15, color: "#8b5cf6" },
  { name: "Autolube", value: 18, color: "#ef4444" },
  { name: "U/C", value: 25, color: "#64748b" },
];

export const monthlyConversionData = [
  { month: "Oct", plan: 28, actual: 16 },
  { month: "Nov", plan: 34, actual: 20 },
  { month: "Dec", plan: 30, actual: 21 },
  { month: "Jan", plan: 38, actual: 25 },
  { month: "Feb", plan: 42, actual: 29 },
  { month: "Mar", plan: 35, actual: 22 },
];

export const revenueByCommodityData = [
  { name: "Undispatched Backlog", BAT: 120, GET: 650, TYR: 420, FCG: 300, LUB: 250, Autofire: 150, Autolube: 85, "U/C": 380 } // In millions
];

export const inspectionTableData = [
  {
    unitId: "D375A-6-50234",
    model: "Komatsu D375A-6",
    customer: "PT Adaro Energy",
    site: "Kalsel",
    inspectionDate: "2026-02-14",
    commodities: {
      "U/C": { status: "Critical", backlogCount: 3 },
      BAT: { status: "Good", backlogCount: 0 },
      GET: { status: "Critical", backlogCount: 2 },
      TYR: { status: "Good", backlogCount: 0 },
      FCG: { status: "Caution", backlogCount: 1 },
      LUB: { status: "Good", backlogCount: 0 },
      Autofire: { status: "Good", backlogCount: 0 },
      Autolube: { status: "N/A", backlogCount: 0 },
    },
    totalPoGap: 125_000_000,
    leadTimeAvg: 14,
  },
  {
    unitId: "PC800-8-61823",
    model: "Komatsu PC800-8",
    customer: "PT Thiess",
    site: "Kaltim",
    inspectionDate: "2026-02-21",
    commodities: {
      "U/C": { status: "Good", backlogCount: 0 },
      BAT: { status: "Caution", backlogCount: 1 },
      GET: { status: "Good", backlogCount: 0 },
      TYR: { status: "N/A", backlogCount: 0 },
      FCG: { status: "Critical", backlogCount: 2 },
      LUB: { status: "Caution", backlogCount: 1 },
      Autofire: { status: "Good", backlogCount: 0 },
      Autolube: { status: "Good", backlogCount: 0 },
    },
    totalPoGap: 450_000_000,
    leadTimeAvg: 21,
  },
  {
    unitId: "CAT785D-AX8801",
    model: "CAT 785D",
    customer: "PT Agincourt",
    site: "Sumut",
    inspectionDate: "2026-02-25",
    commodities: {
      "U/C": { status: "Good", backlogCount: 0 },
      BAT: { status: "Good", backlogCount: 0 },
      GET: { status: "Good", backlogCount: 0 },
      TYR: { status: "Good", backlogCount: 0 },
      FCG: { status: "Good", backlogCount: 0 },
      LUB: { status: "Good", backlogCount: 0 },
      Autofire: { status: "Good", backlogCount: 0 },
      Autolube: { status: "Critical", backlogCount: 2 },
    },
    totalPoGap: 80_000_000,
    leadTimeAvg: 5,
  },
  {
    unitId: "BP-UC-002",
    model: "CAT D9T",
    customer: "PT Berau Coal",
    site: "Kaltim",
    inspectionDate: "2026-02-20",
    commodities: {
      BAT: { status: "Good", backlogCount: 0 },
      GET: { status: "Good", backlogCount: 0 },
      TYR: { status: "N/A", backlogCount: 0 },
      FCG: { status: "Good", backlogCount: 0 },
      LUB: { status: "Good", backlogCount: 0 },
      Autofire: { status: "Good", backlogCount: 0 },
      Autolube: { status: "Good", backlogCount: 0 },
      "U/C": { status: "Good", backlogCount: 0 },
    },
    totalPoGap: 0,
    leadTimeAvg: 0,
  },
  {
    unitId: "BP-HY-006",
    model: "CAT 390F",
    customer: "PT Baramulti",
    site: "Kalsel",
    inspectionDate: "2026-03-01",
    commodities: {
      BAT: { status: "Good", backlogCount: 0 },
      GET: { status: "Caution", backlogCount: 1 },
      TYR: { status: "N/A", backlogCount: 0 },
      FCG: { status: "Good", backlogCount: 0 },
      LUB: { status: "Good", backlogCount: 0 },
      Autofire: { status: "Good", backlogCount: 0 },
      Autolube: { status: "N/A", backlogCount: 0 },
      "U/C": { status: "Good", backlogCount: 0 },
    },
    totalPoGap: 45_000_000,
    leadTimeAvg: 4,
  },
];

// ─── Customer Portal Mock Data ────────────────────────────────────────────────

export const fleetHealthSummary = {
  overallScore: 72,
  scoreLabel: "Caution",
  scoreColor: "yellow",
  critical: 5,
  caution: 14,
  good: 23,
  totalUnits: 42,
  inspectedUnits: 38,
  inspectionCoverage: 90.5,
};

export const topUnitsAtRisk = [
  { unitId: "PC800-8-61823", model: "Komatsu PC800-8", site: "Kaltim", fatalCommodity: "FCG", riskLevel: "Critical", daysToBreakdown: 5 },
  { unitId: "D375A-6-50234", model: "Komatsu D375A-6", site: "Kalsel", fatalCommodity: "GET", riskLevel: "Critical", daysToBreakdown: 8 },
  { unitId: "CAT785D-AX8801", model: "CAT 785D", site: "Sumut", fatalCommodity: "Autolube", riskLevel: "Critical", daysToBreakdown: 12 },
];

export const unitHealthData = [
  {
    serialNumber: "D375A-6-50234",
    model: "Komatsu D375A-6",
    site: "Tambang Adaro - Kalimantan Selatan",
    lastInspection: "2026-02-14",
    hoursOperated: 14_250,
    overallHealth: "Critical",
    commodityStatus: {
      BAT: "Good",
      GET: "Critical",
      TYR: "Caution",
      FCG: "Good",
      LUB: "Good",
      Autofire: "Good",
      Autolube: "N/A",
      "U/C": "Critical"
    },
    maintenanceBundling: {
      hasRecommendation: true,
      message: "Unit requires GET replacement next week. We recommend replacing TYR (Caution status) simultaneously to save 3 days of downtime."
    },
    components: [
      {
        name: "Track Link Assembly",
        wear: 92,
        threshold: 80,
        remainingLife: "< 200 hrs",
        recommendedAction: "Segera ganti — telah melewati batas keausan standar (92% dari batas maksimal).",
        priority: "Critical",
        commodity: "GET"
      },
      {
        name: "Sprocket LH",
        wear: 85,
        threshold: 80,
        remainingLife: "~300 hrs",
        recommendedAction: "Jadwalkan penggantian dalam 1 bulan.",
        priority: "Critical",
        commodity: "GET"
      },
      {
        name: "Tyre Rear LH",
        wear: 78,
        threshold: 80,
        remainingLife: "~500 hrs",
        recommendedAction: "Masuk zona kuning — jadwalkan dalam 2 bulan ke depan.",
        priority: "Caution",
        commodity: "TYR"
      },
    ],
    poStatus: "Partial PO",
  },
  {
    serialNumber: "PC800-8-61823",
    model: "Komatsu PC800-8",
    site: "Tambang Thiess - Kalimantan Timur",
    lastInspection: "2026-02-21",
    hoursOperated: 9_800,
    overallHealth: "Critical",
    commodityStatus: {
      BAT: "Caution",
      GET: "Good",
      TYR: "N/A",
      FCG: "Critical",
      LUB: "Caution",
      Autofire: "Good",
      Autolube: "Good",
      "U/C": "Good"
    },
    maintenanceBundling: {
      hasRecommendation: true,
      message: "FCG Hydraulic Filter is critical. Bundle with BAT check to avoid future electrical issues."
    },
    components: [
      {
        name: "Air Filter Primary",
        wear: 75,
        threshold: 80,
        remainingLife: "~600 hrs",
        recommendedAction: "Ganti sesuai jadwal PM berikutnya.",
        priority: "Good",
        commodity: "FCG"
      },
      {
        name: "Hydraulic Oil Filter",
        wear: 82,
        threshold: 80,
        remainingLife: "~400 hrs",
        recommendedAction: "Segera order — filter sudah melewati threshold.",
        priority: "Critical",
        commodity: "FCG"
      },
      {
        name: "Battery 12V",
        wear: 79,
        threshold: 80,
        remainingLife: "~1 month",
        recommendedAction: "Voltage dropping slightly, schedule replacement soon.",
        priority: "Caution",
        commodity: "BAT"
      },
    ],
    poStatus: "Partial PO",
  },
  {
    serialNumber: "CAT785D-AX8801",
    model: "CAT 785D",
    site: "Tambang Agincourt - Sumatera Utara",
    lastInspection: "2026-02-25",
    hoursOperated: 22_100,
    overallHealth: "Critical",
    commodityStatus: {
      BAT: "Good",
      GET: "Good",
      TYR: "Good",
      FCG: "Good",
      LUB: "Good",
      Autofire: "Good",
      Autolube: "Critical",
      "U/C": "Good"
    },
    maintenanceBundling: {
      hasRecommendation: false,
      message: ""
    },
    components: [
      {
        name: "Engine Oil (10W40)",
        wear: 95,
        threshold: 80,
        remainingLife: "< 100 hrs",
        recommendedAction: "SEGERA GANTI — kondisi minyak kritis. Risiko kerusakan engine.",
        priority: "Critical",
        commodity: "Autolube"
      },
      {
        name: "Transmission Oil",
        wear: 88,
        threshold: 80,
        remainingLife: "~200 hrs",
        recommendedAction: "Jadwalkan penggantian bersamaan dengan engine oil.",
        priority: "Critical",
        commodity: "Autolube"
      },
    ],
    poStatus: "No PO",
  },
  {
    serialNumber: "BP-UC-002",
    model: "CAT D9T",
    site: "Tambang Berau Coal - Kalimantan Timur",
    lastInspection: "2026-02-20",
    hoursOperated: 18_500,
    overallHealth: "Good",
    commodityStatus: {
      BAT: "Good",
      GET: "Good",
      TYR: "N/A",
      FCG: "Good",
      LUB: "Good",
      Autofire: "Good",
      Autolube: "Good",
      "U/C": "Good"
    },
    maintenanceBundling: {
      hasRecommendation: false,
      message: ""
    },
    components: [],
    poStatus: "PO Issued",
  },
  {
    serialNumber: "BP-HY-006",
    model: "CAT 390F",
    site: "Tambang Baramulti - Kalimantan Selatan",
    lastInspection: "2026-03-01",
    hoursOperated: 5_400,
    overallHealth: "Good",
    commodityStatus: {
      BAT: "Good",
      GET: "Caution",
      TYR: "N/A",
      FCG: "Good",
      LUB: "Good",
      Autofire: "Good",
      Autolube: "N/A",
      "U/C": "Good"
    },
    maintenanceBundling: {
      hasRecommendation: true,
      message: "GET component shows slight wear. Plan replacement in next PM."
    },
    components: [
      {
        name: "Bucket Teeth",
        wear: 65,
        threshold: 80,
        remainingLife: "~800 hrs",
        recommendedAction: "Monitor wear in next inspection.",
        priority: "Caution",
        commodity: "GET"
      }
    ],
    poStatus: "Partial PO",
  },
];

// ─── Strategic Strategic KPIs (Enriched Data) ────────────────────────────────

export const internalStrategicKPIs = {
  inventory: {
    readyInStock: 68,
    inTransit: 18,
    outOfStock: 14,
    fulfillmentRatio: 86.5, // Target > 85%
  },
  commercial: {
    bundledUnits: 12,
    avgCommodityPerPO: 1.8, // Target > 1.5
    crossSellRate: 42,
  },
  operations: {
    avgLeadTimeToPO: 12, // Target < 14 Days
    agingBacklogs: [
      { category: "0-7 Days", count: 24, color: "#22c55e" },
      { category: "8-14 Days", count: 18, color: "#eab308" },
      { category: "15-30 Days", count: 8, color: "#f97316" },
      { category: ">30 Days", count: 4, color: "#ef4444" },
    ]
  }
};

// ─── Customer Strategic Insights Data (NEW) ───────────────────────────────────

export const topCustomersData = [
  { customer: "PT Thiess", revenue: 850_000_000, conversionRate: 75, fill: "#1a2b4a" },
  { customer: "PT Adaro Energy", revenue: 620_000_000, conversionRate: 60, fill: "#1a2b4a" },
  { customer: "PT KPC", revenue: 450_000_000, conversionRate: 82, fill: "#1a2b4a" },
  { customer: "PT SIS", revenue: 380_000_000, conversionRate: 55, fill: "#1a2b4a" },
  { customer: "PT BUMA", revenue: 310_000_000, conversionRate: 45, fill: "#1a2b4a" }
];

export const backlogDensityData = [
  { customer: "PT Thiess", units: 15, criticalFindings: 8 },
  { customer: "PT Adaro", units: 22, criticalFindings: 5 },
  { customer: "PT KPC", units: 18, criticalFindings: 12 },
  { customer: "PT SIS", units: 10, criticalFindings: 2 },
  { customer: "PT BUMA", units: 8, criticalFindings: 6 },
  { customer: "PT PAMA", units: 25, criticalFindings: 4 },
  { customer: "PT Berau", units: 12, criticalFindings: 1 },
];

export const regionalRevenueData = [
  { name: "Kaltim", value: 2_150_000_000 },
  { name: "Kalsel", value: 1_420_000_000 },
  { name: "Sumsel", value: 680_000_000 },
  { name: "Sumut", value: 450_000_000 },
  { name: "Sulsel", value: 172_500_000 }
];

export const captureRateData = [
  { name: "Converted to PO", value: 320 },
  { name: "Unconverted Backlog", value: 180 }
];

export const customerStrategicKPIs = {
  budgetForecast: {
    total30Days: 1_250_000_000,
    total60Days: 2_840_000_000,
    total90Days: 4_120_500_000,
    projectedEvents: [
      { month: "Apr", cost: 1250000000, criticalUnits: 3 },
      { month: "May", cost: 1590000000, criticalUnits: 5 },
      { month: "Jun", cost: 1280500000, criticalUnits: 2 },
    ]
  },
  safetyIndex: {
    fleetSafetyScore: 94.5, // Alert if < 100%
    components: [
      { name: "Tyre Condition", score: 89, weight: 60, status: "Critical" },
      { name: "Autofire Readiness", score: 100, weight: 40, status: "Good" },
    ],
    lastIncident: "None recorded in last 180 days"
  },
  procurementPipeline: {
    drafting: 8,
    quoted: 14,
    poIssued: 12,
    delivered: 20,
    fulfillmentProgress: 65, // (delivered / total)
  }
};

export const formatRupiah = (value: number): string => {
  if (value === 0) return "-";
  if (value >= 1_000_000_000) {
    return `Rp ${(value / 1_000_000_000).toFixed(2)} M`;
  }
  if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000).toFixed(0)} Jt`;
  }
  return `Rp ${value.toLocaleString("id-ID")}`;
};
