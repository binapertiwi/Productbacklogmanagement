import React, { useState, useMemo, useCallback } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Shield,
  Activity,
  Gauge,
  Clock,
  Download,
  Search,
  Filter,
  Layers,
  Wrench,
  Sparkles,
  DollarSign
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
} from "recharts";
import { fleetHealthSummary, unitHealthData, topUnitsAtRisk } from "../data/mockData";

const healthColor = {
  Critical: {
    text: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    bar: "bg-red-500",
    dot: "bg-red-500",
  },
  Caution: {
    text: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700",
    bar: "bg-yellow-400",
    dot: "bg-yellow-400",
  },
  Good: {
    text: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-700",
    bar: "bg-green-500",
    dot: "bg-green-500",
  },
  "N/A": {
    text: "text-gray-500",
    bg: "bg-gray-50",
    border: "border-gray-200",
    badge: "bg-gray-100 text-gray-500",
    bar: "bg-gray-300",
    dot: "bg-gray-300",
  }
};

const poStatusStyle: Record<string, string> = {
  "PO Issued": "bg-green-100 text-green-700",
  "Partial PO": "bg-yellow-100 text-yellow-700",
  "No PO": "bg-red-100 text-red-700",
};

function HealthGauge({ score, label }: { score: number; label: string }) {
  const color = label === "Critical" ? "#ef4444" : label === "Caution" ? "#eab308" : "#22c55e";
  const data = [{ value: score, fill: color }];

  return (
    <div className="relative" style={{ width: 140, height: 140 }}>
      <RadialBarChart
        width={140}
        height={140}
        cx="50%"
        cy="50%"
        innerRadius={48}
        outerRadius={62}
        startAngle={180}
        endAngle={-180}
        data={[{ value: 100, fill: "#f0f0f0" }, ...data]}
        barSize={12}
      >
        <RadialBar dataKey="value" cornerRadius={8} background={false} />
        <Tooltip formatter={(v) => [`${v}%`, "Health Score"]} contentStyle={{ fontSize: 11 }} />
      </RadialBarChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl" style={{ color }}>{score}</span>
        <span className="text-xs text-gray-400">/ 100</span>
      </div>
    </div>
  );
}

function WearBar({ wear, threshold }: { wear: number; threshold: number }) {
  const color =
    wear >= threshold ? "bg-red-500" : wear >= threshold * 0.9 ? "bg-yellow-400" : "bg-green-500";
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden relative">
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gray-400 z-10"
          style={{ left: `${threshold}%` }}
        />
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${Math.min(wear, 100)}%` }}
        />
      </div>
      <span className={`text-xs w-10 text-right flex-shrink-0 ${wear >= threshold ? "text-red-600" : "text-gray-600"}`}>
        {wear}%
      </span>
    </div>
  );
}

export function CustomerPortal() {
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [commodityFilter, setCommodityFilter] = useState("All Commodity");

  const s = fleetHealthSummary;

  // useMemo: recompute only when filters change
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return unitHealthData.filter((u) => {
      const matchesSearch =
        u.serialNumber.toLowerCase().includes(q) ||
        u.model.toLowerCase().includes(q) ||
        u.site.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All Status" || u.overallHealth === statusFilter;

      const matchesCommodity =
        commodityFilter === "All Commodity" ||
        (u.commodityStatus as Record<string, string>)[commodityFilter] !== "N/A";

      return matchesSearch && matchesStatus && matchesCommodity;
    });
  }, [search, statusFilter, commodityFilter]);

  const handleExportPO = useCallback(() => {
    alert(
      "Export PO Recommendation\n\nPO akan digenerate dan dikelompokkan secara otomatis dalam sheet berbeda berdasarkan komoditi (GET, TYR, Autolube, dll) untuk mempermudah buyer mengeksekusi PO ke vendor atau PIC terkait.\n\n[Demo Mode]"
    );
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    []
  );

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-[#1a2b4a]">Fleet Health & Procurement Portal</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Transparansi data kondisi unit alat berat untuk pengambilan keputusan pemeliharaan
          </p>
        </div>
        <button
          onClick={handleExportPO}
          className="flex items-center gap-2 px-4 py-2 bg-[#f97316] text-white rounded-lg text-sm hover:bg-[#ea6c0a] transition-colors shadow-md shadow-orange-200 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          Export PO Recommendation
        </button>
      </div>

      {/* ── FLEET HEALTH SUMMARY ─────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

        {/* Health Score Card */}
        <div className="sm:col-span-1 bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm flex flex-col items-center justify-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 text-center">Overall Fleet Health Score</p>
          <HealthGauge score={s.overallScore} label={s.scoreLabel} />
          <div className={`mt-2 flex items-center gap-2 px-3 py-1 rounded-full text-sm ${s.scoreLabel === "Good"
            ? "bg-green-100 text-green-700"
            : s.scoreLabel === "Caution"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
            }`}>
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.scoreLabel === "Good" ? "bg-green-500" : s.scoreLabel === "Caution" ? "bg-yellow-400" : "bg-red-500"
              }`}></span>
            {s.scoreLabel}
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Kondisi rata-rata semua komponen
          </p>
        </div>

        {/* Urgency Matrix */}
        <div className="sm:col-span-1 lg:col-span-1 bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-4 h-4 text-[#1a2b4a]" />
            <h3 className="text-[#1a2b4a]">Urgency Matrix</h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center gap-2">
                 <XCircle className="w-4 h-4 text-red-500" />
                 <span className="text-xs text-red-600 font-medium">Critical</span>
              </div>
              <span className="text-lg font-bold text-red-600">{s.critical}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="flex items-center gap-2">
                 <AlertTriangle className="w-4 h-4 text-yellow-500" />
                 <span className="text-xs text-yellow-600 font-medium">Caution</span>
              </div>
              <span className="text-lg font-bold text-yellow-500">{s.caution}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-green-500" />
                 <span className="text-xs text-green-600 font-medium">Good</span>
              </div>
              <span className="text-lg font-bold text-green-600">{s.good}</span>
            </div>
          </div>
        </div>

        {/* Top Units At Risk */}
        <div className="sm:col-span-2 lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm border-l-4 border-l-red-500">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h3 className="text-[#1a2b4a]">Top Units at Risk of Breakdown</h3>
          </div>
          <div className="space-y-2">
             {topUnitsAtRisk.map((unit, idx) => (
               <div key={idx} className="flex justify-between items-center bg-gray-50 rounded p-2 text-xs">
                 <div>
                   <span className="font-semibold text-[#1a2b4a]">{unit.unitId}</span> <span className="text-gray-500">({unit.site})</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="text-red-600 bg-red-100 px-2 py-0.5 rounded font-medium">
                      Fatal: {unit.fatalCommodity}
                    </span>
                    <span className="text-gray-600">
                      Est. {unit.daysToBreakdown} hari
                    </span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* ── AI FLEET RELIABILITY ADVISOR ─────────────────── */}
      <div className="bg-gradient-to-br from-[#1a2b4a] to-[#243a61] p-4 sm:p-5 rounded-xl text-white shadow-md relative overflow-hidden mt-2">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-teal-400" />
          <h3 className="font-bold text-white tracking-wide">AI Fleet Reliability Advisor</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {/* Insight 1: Predictive Breakdown */}
          <div className="bg-white/10 rounded-lg p-3.5 border border-white/10 flex flex-col justify-between backdrop-blur-sm">
            <div>
              <h4 className="text-xs font-semibold text-teal-200 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Insight Keandalan
              </h4>
              <p className="text-xs text-blue-50 leading-relaxed mb-3">
                Berdasarkan tren keausan <i className="opacity-80">Lifetime Trend</i>, unit <span className="font-semibold text-red-300">PC800-8-61823</span> memiliki probabilitas 85% untuk mengalami kegagalan pada komponen FCG dalam 7-10 hari ke depan, yang dapat memicu kerusakan sekunder pada sistem hidrolik.
              </p>
            </div>
            <button className="text-[11px] font-semibold text-[#1a2b4a] bg-teal-400 hover:bg-teal-300 transition-colors py-1.5 px-3 rounded w-full sm:w-auto self-start mt-1 shadow-sm">
              Prioritaskan di PO Export
            </button>
          </div>

          {/* Insight 2: Smart Scheduling */}
          <div className="bg-white/10 rounded-lg p-3.5 border border-white/10 flex flex-col justify-between backdrop-blur-sm">
            <div>
              <h4 className="text-xs font-semibold text-teal-200 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Efisiensi Downtime
              </h4>
              <p className="text-xs text-blue-50 leading-relaxed mb-3">
                Unit <span className="font-semibold text-white">D375A-6-50234</span> membutuhkan penggantian GET (Critical) saat ini, dan BAT akan mencapai batas <i className="opacity-80">Caution</i> dalam 3 minggu. Lakukan penggantian secara bersamaan minggu ini untuk menghemat estimasi <i>downtime</i> sebesar 12 jam operasional.
              </p>
            </div>
            <button className="text-[11px] font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors py-1.5 px-3 rounded w-full sm:w-auto self-start mt-1 border border-white/10">
              Gabungkan Kebutuhan Part
            </button>
          </div>

          {/* Insight 3: Budget Forecasting */}
          <div className="bg-white/10 rounded-lg p-3.5 border border-white/10 flex flex-col justify-between backdrop-blur-sm">
            <div>
              <h4 className="text-xs font-semibold text-teal-200 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-teal-400" /> Budget Forecast
              </h4>
              <p className="text-xs text-blue-50 leading-relaxed mb-3">
                Berdasarkan kondisi <span className="text-yellow-300 font-medium">Warning (Kuning)</span> saat ini di seluruh armada komoditi U/C dan TYR, estimasi anggaran pemeliharaan untuk Q2 2026 adalah sekitar <span className="font-bold text-white text-sm">Rp 1.2 Miliar</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Notice Banner */}
      <div className="bg-gradient-to-r from-[#1a2b4a] to-[#243a61] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white shadow-md">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-[#f97316]" />
          </div>
          <div>
            <p className="text-sm">Grouped Export PO Recommendation</p>
            <p className="text-xs text-blue-200 mt-0.5">
              Konversi otomatis list backlog menjadi draf PO Excel/PDF yang terpisah per komoditi (Sheet TYR, Sheet GET, dll) untuk kemudahan buyer.
            </p>
          </div>
        </div>
        <button
          onClick={handleExportPO}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#f97316] text-white rounded-lg text-sm hover:bg-[#ea6c0a] transition-colors self-start sm:self-auto flex-shrink-0"
        >
           <Download className="w-4 h-4" />
           Export Multi-Sheet
        </button>
      </div>

      {/* ── TECHNICAL DETAILS PER UNIT ───────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="px-4 sm:px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-[#1a2b4a]">Technical Details per Unit</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Identifikasi kesehatan unit secara holistik (Multi-Commodity)
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Status Filter */}
            <div className="relative">
              <Filter className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                className="pl-8 pr-8 py-1.5 text-[11px] border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1a2b4a]/30 appearance-none cursor-pointer w-full"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Status</option>
                <option>Critical</option>
                <option>Caution</option>
                <option>Good</option>
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Commodity Filter */}
            <div className="relative">
              <Layers className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                className="pl-8 pr-8 py-1.5 text-[11px] border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1a2b4a]/30 appearance-none cursor-pointer w-full"
                value={commodityFilter}
                onChange={(e) => setCommodityFilter(e.target.value)}
              >
                <option>All Commodity</option>
                <option>BAT</option>
                <option>GET</option>
                <option>TYR</option>
                <option>FCG</option>
                <option>Autofire</option>
                <option>Autolube</option>
                <option>U/C</option>
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari unit..."
                className="pl-9 pr-4 py-1.5 text-[11px] border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1a2b4a]/30 w-full sm:w-44"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        {/* Unit Cards */}
        <div className="divide-y divide-gray-50">
          {filtered.map((unit) => {
            const isOpen = expandedUnit === unit.serialNumber;
            const hc = healthColor[unit.overallHealth as keyof typeof healthColor] || healthColor.Good;

            return (
              <div key={unit.serialNumber}>
                {/* Unit Row */}
                <div
                  className={`px-4 sm:px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${isOpen ? "bg-gray-50" : ""}`}
                  onClick={() => setExpandedUnit(isOpen ? null : unit.serialNumber)}
                >
                  <div className="flex items-start gap-4">
                    {/* Status Dot */}
                    <div className={`w-1.5 h-full min-h-[60px] rounded-full flex-shrink-0 ${hc.dot}`} />
                    
                    <div className="flex-1 min-w-0">
                      {/* Top row */}
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-lg font-bold text-[#1a2b4a] flex items-center gap-3">
                             {unit.serialNumber}
                             <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold flex items-center gap-1 ${hc.badge} border border-transparent`}>
                               {unit.overallHealth}
                             </span>
                          </div>
                          <div className="text-sm text-gray-500 mt-0.5">{unit.model}</div>
                        </div>

                        {/* Right quick stats */}
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                           <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> Inspeksi: {new Date(unit.lastInspection).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</span>
                           <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5"/> {unit.hoursOperated.toLocaleString()} jam</span>
                           {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                        </div>
                      </div>

                      {/* Main feature: Commodity Breakdown Badges */}
                      <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-100 flex flex-col lg:flex-row gap-3 items-center justify-between">
                         <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Commodity Breakdown</span>
                            {Object.entries(unit.commodityStatus).map(([comm, status]) => {
                               const ch = healthColor[status as keyof typeof healthColor] || healthColor.Good;
                               return (
                                 <div key={comm} className={`flex items-center gap-1.5 px-2.5 py-1 rounded border ${ch.bg} ${ch.border}`}>
                                    <span className={`w-2 h-2 rounded-full ${ch.dot}`}></span>
                                    <span className={`text-[11px] font-bold ${ch.text}`}>{comm}</span>
                                 </div>
                               )
                            })}
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded: Component Details */}
                {isOpen && (
                  <div className={`px-4 sm:px-5 pb-5 pt-2 ${hc.bg} border-t ${hc.border}`}>
                    
                    {/* Maintenance Bundling Recommender */}
                    {unit.maintenanceBundling.hasRecommendation && (
                       <div className="mb-5 bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 items-start shadow-sm">
                          <Wrench className="w-5 h-5 text-[#1a2b4a] flex-shrink-0 mt-0.5" />
                          <div>
                             <h4 className="text-sm font-semibold text-[#1a2b4a] mb-1">Maintenance Bundling Recommendation</h4>
                             <p className="text-xs text-gray-700 leading-relaxed">{unit.maintenanceBundling.message}</p>
                          </div>
                       </div>
                    )}

                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                      Detail Komponen
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                      {unit.components.map((comp, idx) => {
                        const cc = healthColor[comp.priority as keyof typeof healthColor] || healthColor.Good;
                        return (
                          <div key={idx} className={`bg-white rounded-xl p-4 border ${cc.border} shadow-sm group hover:shadow-md transition-shadow`}>
                            {/* Component Header */}
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#1a2b4a] leading-tight">{comp.name}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                   <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold text-gray-600 bg-gray-100`}>
                                     {comp.commodity}
                                   </span>
                                   <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${cc.badge}`}>
                                     {comp.priority}
                                   </span>
                                </div>
                              </div>
                              <span className={`ml-2 flex-shrink-0 ${cc.text}`}>
                                {comp.priority === "Critical" ? (
                                  <XCircle className="w-5 h-5" />
                                ) : comp.priority === "Caution" ? (
                                  <AlertTriangle className="w-5 h-5" />
                                ) : (
                                  <CheckCircle2 className="w-5 h-5" />
                                )}
                              </span>
                            </div>

                            {/* Wear Bar */}
                            <div className="mb-3">
                              <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                                <span>Tingkat Keausan / Kondisi</span>
                                <span>Threshold: {comp.threshold}%</span>
                              </div>
                              <WearBar wear={comp.wear} threshold={comp.threshold} />
                            </div>

                            {/* Component Life Remaining */}
                            <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg mb-3 border border-gray-100">
                              <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-xs text-gray-500 font-medium">Est. Life Remaining</span>
                              </div>
                              <span className={`text-xs font-bold ${cc.text}`}>{comp.remainingLife}</span>
                            </div>

                            {/* Recommended Action */}
                            <div>
                              <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Recommended Action</p>
                              <p className="text-xs text-gray-700 leading-relaxed bg-white border border-gray-100 p-2 rounded">{comp.recommendedAction}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Export per unit */}
                    <div className="mt-5 flex justify-end">
                      <button
                        onClick={handleExportPO}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1a2b4a] text-white rounded-lg text-xs hover:bg-[#243a61] transition-colors shadow-sm"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Export PO — {unit.serialNumber}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <Search className="w-8 h-8 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Tidak ada unit yang sesuai dengan pencarian atau filter komoditi.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-5 py-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs text-gray-400">
          <span>Menampilkan {filtered.length} dari {unitHealthData.length} unit — via Aplikasi MMA</span>
          <span>Data diperbarui: 03 Mar 2026, 08:30 WIB</span>
        </div>
      </div>
    </div>
  );
}
