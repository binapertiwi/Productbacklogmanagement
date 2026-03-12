import React, { useState, useMemo, useCallback, Suspense } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ClipboardList,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Filter,
  Download,
  RefreshCw,
  Search,
  Layers,
  Sparkles
} from "lucide-react";
import {
  kpiData,
  monthlyConversionData,
  revenueByCommodityData,
  inspectionTableData,
  formatRupiah,
} from "../data/mockData";
import { CommodityPerformanceDashboard } from "./CommodityPerformanceDashboard";
import { CommodityType } from "../data/performanceMockData";

type TabType = "Overview" | CommodityType;

const commKeys: CommodityType[] = ["BAT", "GET", "TYR", "FCG", "Autofire", "Autolube", "U/C"];

export function InternalDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("Overview");
  const [search, setSearch] = useState("");

  // useMemo: only recompute when `search` changes, not on every render
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return inspectionTableData.filter(
      (row) =>
        row.unitId.toLowerCase().includes(q) ||
        row.customer.toLowerCase().includes(q)
    );
  }, [search]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    []
  );

  const conversionRate = kpiData.backlogConversionRate;

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-[#1a2b4a]">Operation & Inventory Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Monitoring efektivitas konversi backlog menjadi Purchase Order
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 shadow-sm self-start sm:self-auto">
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 border-b border-gray-200 pb-2">
        {(["Overview", ...commKeys] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap border-b-2 ${
              activeTab === tab
                ? "border-[#f97316] text-[#1a2b4a] bg-orange-50/50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab !== "Overview" ? (
        <Suspense fallback={<div className="flex justify-center py-12"><div className="w-6 h-6 border-4 border-[#1a2b4a]/20 border-t-[#f97316] rounded-full animate-spin" /></div>}>
          <CommodityPerformanceDashboard commodity={activeTab} />
        </Suspense>
      ) : (
        <>
          {/* ── KPI CARDS ─────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Total Inspections */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider leading-tight">Total Inspections</p>
                  <p className="text-2xl sm:text-3xl text-[#1a2b4a] mt-1">{kpiData.totalInspections}</p>
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#1a2b4a]/10 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
                  <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a2b4a]" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{kpiData.inspectionDelta}</span>
              </p>
            </div>

            {/* Backlog Conversion Rate */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider leading-tight">Conversion Rate</p>
                  <p className="text-2xl sm:text-3xl text-[#1a2b4a] mt-1">{conversionRate}%</p>
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#f97316]" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{kpiData.conversionDelta}</span>
              </p>
            </div>

             {/* Cross-Commodity Backlog Rate */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider leading-tight">Cross-Commodity Backlog</p>
                  <p className="text-2xl sm:text-3xl text-[#1a2b4a] mt-1">{kpiData.crossCommodityRate}%</p>
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2 truncate">Unit dengan &gt;2 backlog komoditi</p>
            </div>

            {/* Revenue Potential */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider leading-tight">Revenue Potential</p>
                  <p className="text-lg sm:text-2xl text-[#1a2b4a] mt-1">{formatRupiah(kpiData.revenuePotential)}</p>
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{kpiData.revenueDelta}</span>
              </p>
            </div>
          </div>

          {/* ── AI CO-PILOT INSIGHTS ──────────────────────────── */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-4 sm:p-5 shadow-sm relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-200/40 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h3 className="text-indigo-900 font-bold">AI Revenue & Operation Copilot</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative z-10">
              {/* Insight 1: Predictive Conversion */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-indigo-50 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-indigo-900 mb-2 flex items-center gap-1.5">
                    <span className="text-indigo-500">✨</span> Peluang PO Tinggi
                  </h4>
                  <p className="text-xs text-indigo-950/80 leading-relaxed mb-3">
                    Terdapat 5 unit di PT Thiess (Kaltim) dengan status <span className="font-semibold text-red-600">Critical</span> pada komoditi GET dan U/C sekaligus. Secara historis, Thiess menyetujui PO 40% lebih cepat untuk pengajuan <i>bundling</i> di awal bulan.
                  </p>
                </div>
                <button className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors py-2 px-3 rounded-md w-full sm:w-auto self-start mt-2 shadow-sm">
                  Generate Draft Bundling Quotation
                </button>
              </div>

              {/* Insight 2: Inventory Alert */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-indigo-50 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-indigo-900 mb-2 flex items-center gap-1.5">
                    <span className="text-indigo-500">✨</span> Risiko Lead Time
                  </h4>
                  <p className="text-xs text-indigo-950/80 leading-relaxed mb-3">
                    Permintaan komoditi FCG dan Autolube di area Kalsel melonjak 25% bulan ini. Berdasarkan stok Gudang BJM, estimasi <span className="font-semibold text-orange-600">shortage</span> akan terjadi dalam 14 hari.
                  </p>
                </div>
                <button className="text-xs font-semibold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors py-2 px-3 rounded-md w-full sm:w-auto self-start mt-2 border border-indigo-200">
                  Lihat Analisis Stok
                </button>
              </div>

              {/* Insight 3: Mechanic Productivity */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-indigo-50 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-indigo-900 mb-2 flex items-center gap-1.5">
                    <span className="text-indigo-500">✨</span> Produktivitas Mekanik
                  </h4>
                  <p className="text-xs text-indigo-950/80 leading-relaxed mb-3">
                    35% inspeksi minggu ini terpusat pada TYR. Pertimbangkan untuk merotasi mekanik spesialis U/C ke area Kaltim minggu depan untuk menyeimbangkan cakupan inspeksi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── CHARTS ROW ────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Revenue Potential stacked chart */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm flex flex-col justify-center">
              <h3 className="text-[#1a2b4a] mb-1">Revenue Potential by Commodity</h3>
              <p className="text-xs text-gray-500 mb-3 block">Backlog blm PO (Jt Rp). Target fokus marketing bulanan.</p>
              <div className="relative h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueByCommodityData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" hide />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [`Rp ${v} Jt`, 'Potensi']} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="GET" stackId="a" fill="#1a2b4a" />
                    <Bar dataKey="TYR" stackId="a" fill="#f97316" />
                    <Bar dataKey="FCG" stackId="a" fill="#22c55e" />
                    <Bar dataKey="Autofire" stackId="a" fill="#8b5cf6" />
                    <Bar dataKey="BAT" stackId="a" fill="#eab308" />
                    <Bar dataKey="Autolube" stackId="a" fill="#ef4444" />
                    <Bar dataKey="U/C" stackId="a" fill="#64748b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Bar Chart */}
            <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
              <h3 className="text-[#1a2b4a] mb-1">Plan vs Actual — Monthly Conversion</h3>
              <p className="text-xs text-gray-500 mb-3">Perbandingan temuan mekanik vs PO yang terbit per bulan</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyConversionData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span style={{ fontSize: 11 }}>
                        {value === "plan" ? "Plan (Temuan)" : "Actual (PO Terbit)"}
                      </span>
                    )}
                  />
                  <Bar dataKey="plan" name="plan" fill="#1a2b4a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" name="actual" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── UNIT CENTRIC MATRIX TABLE ───────────────────────── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            {/* Table Header */}
            <div className="px-4 sm:px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-[#1a2b4a]">Cross-Commodity Backlog Matrix</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Visualisasi kesehatan relasi multikomoditas per unit
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari Unit / Customer..."
                    className="pl-9 pr-4 py-1.5 text-xs border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1a2b4a]/30 w-full sm:w-56"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a2b4a] text-white rounded-md text-xs hover:bg-[#1a2b4a]/90 transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  Export Matrix
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-gray-50/80 text-gray-500 border-b border-gray-100 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-medium">Unit ID & Model</th>
                    <th className="px-4 py-3 font-medium">Customer & Site</th>
                    {commKeys.map(k => <th key={k} className="px-3 py-3 font-medium text-center">{k}</th>)}
                    <th className="px-4 py-3 font-medium text-right">Total PO Gap</th>
                    <th className="px-4 py-3 font-medium text-center">Lead Time Avg</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-[#1a2b4a]">{row.unitId}</div>
                        <div className="text-xs text-gray-500">{row.model}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-700">{row.customer}</div>
                        <div className="text-xs text-gray-400">{row.site}</div>
                      </td>
                      {commKeys.map(k => {
                        const status = row.commodities[k];
                        if (status.status === "N/A") {
                           return <td key={k} className="px-3 py-3 text-center"><div className="w-3 h-3 rounded-full bg-gray-200 mx-auto" title="N/A"></div></td>
                        } else if (status.status === "Critical") {
                           return <td key={k} className="px-3 py-3 text-center text-xs font-semibold text-red-600"><div className="flex items-center justify-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500 shadow-sm" title="Critical"></div>({status.backlogCount})</div></td>
                        } else if (status.status === "Caution") {
                           return <td key={k} className="px-3 py-3 text-center text-xs font-semibold text-yellow-600"><div className="flex items-center justify-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm" title="Warning"></div>({status.backlogCount})</div></td>
                        } else {
                           return <td key={k} className="px-3 py-3 text-center"><div className="w-3 h-3 rounded-full bg-green-500 shadow-sm mx-auto" title="Clear"></div></td>
                        }
                      })}
                      <td className="px-4 py-3 text-right">
                        <div className="text-sm text-gray-700 font-medium">{formatRupiah(row.totalPoGap)}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                         <div className={`text-sm ${row.leadTimeAvg > 14 ? "text-red-600" : row.leadTimeAvg > 7 ? "text-yellow-600" : "text-gray-600"}`}>
                           {row.leadTimeAvg} Hari
                         </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={10} className="text-center py-6 text-gray-400 text-sm">Tidak ada data unit yang ditemukan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
             <div className="px-4 sm:px-5 py-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gray-50/50">
               <div className="flex items-center gap-4 text-[10px] text-gray-500">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Clear</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> Warning</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Critical Backlog (#)</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-200"></div> N/A</span>
               </div>
               <div className="text-[10px] text-gray-400">Data diperbarui secara realtime</div>
             </div>
          </div>
        </>
      )}
    </div>
  );
}
