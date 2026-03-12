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
  { name: "Undispatched Backlog", BAT: 120, GET: 650, TYR: 420, FCG: 300, Autofire: 150, Autolube: 85, "U/C": 380 } // In millions
];

export const inspectionTableData = [
  {
    unitId: "BP-UC-001",
    model: "Komatsu D375A-6",
    customer: "PT Adaro Energy",
    site: "Kalsel",
    inspectionDate: "2026-02-14",
    commodities: {
      BAT: { status: "Good", backlogCount: 0 },
      GET: { status: "Critical", backlogCount: 2 },
      TYR: { status: "N/A", backlogCount: 0 },
      FCG: { status: "Caution", backlogCount: 1 },
      Autofire: { status: "Good", backlogCount: 0 },
      Autolube: { status: "N/A", backlogCount: 0 },
      "U/C": { status: "Critical", backlogCount: 3 },
    },
    totalPoGap: 125_000_000,
    leadTimeAvg: 14,
  },
  {
    unitId: "BP-FT-003",
    model: "CAT 785D",
    customer: "PT Thiess",
    site: "Kaltim",
    inspectionDate: "2026-02-21",
    commodities: {
      BAT: { status: "Critical", backlogCount: 1 },
      GET: { status: "Good", backlogCount: 0 },
      TYR: { status: "Critical", backlogCount: 4 },
      FCG: { status: "Good", backlogCount: 0 },
      Autofire: { status: "Critical", backlogCount: 1 },
      Autolube: { status: "Caution", backlogCount: 1 },
      "U/C": { status: "Good", backlogCount: 0 },
    },
    totalPoGap: 450_000_000,
    leadTimeAvg: 21,
  },
  {
    unitId: "BP-LB-004",
    model: "Komatsu PC2000-8",
    customer: "PT Agincourt",
    site: "Sumut",
    inspectionDate: "2026-02-25",
    commodities: {
      BAT: { status: "Good", backlogCount: 0 },
      GET: { status: "Good", backlogCount: 0 },
      TYR: { status: "N/A", backlogCount: 0 },
      FCG: { status: "Good", backlogCount: 0 },
      Autofire: { status: "Caution", backlogCount: 1 },
      Autolube: { status: "Critical", backlogCount: 2 },
      "U/C": { status: "Caution", backlogCount: 2 },
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
];

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
