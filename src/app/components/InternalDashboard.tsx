import React, { useState, useMemo, useCallback, Suspense } from "react";
import { useNavigate } from "react-router";
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
  Sparkles,
  ArrowUpRight,
  TrendingDown,
  LayoutDashboard,
  FileText,
  Clock
} from "lucide-react";
import {
  kpiData,
  monthlyConversionData,
  revenueByCommodityData,
  inspectionTableData,
  internalStrategicKPIs,
  formatRupiah,
} from "../data/mockData";
import { CommodityPerformanceDashboard } from "./CommodityPerformanceDashboard";
import { CommodityType } from "../data/performanceMockData";

type TabType = "Overview" | CommodityType;

const commKeys: CommodityType[] = ["U/C", "BAT", "GET", "TYR", "FCG", "Autofire", "Autolube"];

export function InternalDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("Overview");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 bg-background transition-colors duration-300">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary dark:text-foreground flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-brand-green" />
            Operation & Inventory Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitoring efektivitas konversi backlog menjadi Purchase Order secara realtime
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-xs font-bold text-muted-foreground hover:bg-accent hover:text-foreground transition-all shadow-sm">
            <RefreshCw className="w-3.5 h-3.5" />
            Sync Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-navy dark:bg-brand-blue text-white rounded-lg text-xs font-bold hover:opacity-90 transition-all shadow-md">
            <Download className="w-3.5 h-3.5" />
            Download Report
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-1 border-b border-border pb-0.5">
        {(["Overview", ...commKeys] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-xs font-bold transition-all whitespace-nowrap border-b-2 relative ${
              activeTab === tab
                ? "border-brand-green text-brand-green"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-brand-green shadow-[0_0_8px_rgba(35,163,78,0.5)]" />
            )}
          </button>
        ))}
      </div>

      {activeTab !== "Overview" ? (
        <Suspense fallback={<div className="flex justify-center py-24"><div className="w-8 h-8 border-4 border-primary/20 border-t-brand-green rounded-full animate-spin" /></div>}>
          <CommodityPerformanceDashboard commodity={activeTab} />
        </Suspense>
      ) : (
        <>
          {/* ── KPI GRID ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Inspections */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-primary/5 rounded-full group-hover:scale-110 transition-transform" />
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Total Inspections</p>
                  <p className="text-3xl text-primary dark:text-foreground mt-1 font-extrabold tracking-tight">{kpiData.totalInspections}</p>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary dark:text-foreground">
                  <ClipboardList className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-green-600 font-bold bg-green-50 dark:bg-green-900/10 px-2 py-1 rounded-md w-fit">
                <TrendingUp className="w-3.5 h-3.5 font-bold" />
                <span>{kpiData.inspectionDelta}</span>
              </div>
            </div>

            {/* Backlog Conversion Rate */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-brand-green/5 rounded-full group-hover:scale-110 transition-transform" />
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Conversion Rate</p>
                  <p className="text-3xl text-brand-green mt-1 font-extrabold tracking-tight">{conversionRate}%</p>
                </div>
                <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-green-600 font-bold bg-green-50 dark:bg-green-900/10 px-2 py-1 rounded-md w-fit">
                <TrendingUp className="w-3.5 h-3.5 font-bold" />
                <span>{kpiData.conversionDelta}</span>
              </div>
            </div>

             {/* Cross-Commodity Backlog Rate */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-purple-500/5 rounded-full group-hover:scale-110 transition-transform" />
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Cross-Commodity Backlog</p>
                  <p className="text-3xl text-purple-600 dark:text-purple-400 mt-1 font-extrabold tracking-tight">{kpiData.crossCommodityRate}%</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/10 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-4 text-[10px] text-muted-foreground font-bold italic">Unit dengan &gt;2 backlog multi-komoditi</p>
            </div>

            {/* Revenue Potential */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full group-hover:scale-110 transition-transform" />
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Revenue Potential</p>
                  <p className="text-2xl text-primary dark:text-foreground mt-1 font-extrabold tracking-tight">{formatRupiah(kpiData.revenuePotential)}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-green-600 font-bold bg-green-50 dark:bg-green-900/10 px-2 py-1 rounded-md w-fit">
                <ArrowUpRight className="w-3.5 h-3.5 font-bold" />
                <span>{kpiData.revenueDelta}</span>
              </div>
            </div>
          </div>

          {/* ── AI REVENUE & OPERATION COPILOT ─────────────────── */}
          <div className="bg-gradient-to-r from-[#43E97B] to-[#38F9D7] rounded-2xl p-6 shadow-lg relative overflow-hidden border border-white/20">
            {/* Animated background pulse */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-pulse pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-xl flex items-center justify-center shadow-inner">
                <Sparkles className="w-6 h-6 text-teal-900" />
              </div>
              <div>
                <h3 className="text-teal-950 text-xl font-black tracking-tight flex items-center gap-2">
                  AI Revenue & Operation Copilot
                  <span className="text-[10px] bg-teal-950 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Active Thinking</span>
                </h3>
                <p className="text-teal-900/70 text-xs font-bold italic">Proactive analytics for hyper-growth & operational excellence</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
              {/* Insight 1: Predictive Conversion */}
              <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-5 border border-white/60 flex flex-col justify-between group hover:bg-white/60 transition-all duration-300 shadow-sm hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between mb-3 text-teal-900">
                    <h4 className="text-sm font-black tracking-tight uppercase">High Probability PO</h4>
                    <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded font-black">CRITICAL</span>
                  </div>
                  <p className="text-xs text-teal-950/90 leading-relaxed font-bold">
                    Terdapat <span className="underline decoration-red-500 decoration-2">5 unit di PT Thiess (Kaltim)</span> dengan status Critical pada <span className="font-black">GET & U/C</span>. Secara historis, Thiess menyetujui PO <span className="text-teal-800 bg-teal-800/10 px-1">40% lebih cepat</span> untuk bundling awal bulan.
                  </p>
                </div>
                <button className="mt-5 text-[11px] font-black text-white bg-teal-900 hover:bg-black transition-all py-2.5 px-4 rounded-xl w-full flex items-center justify-center gap-2 shadow-lg shadow-teal-900/20">
                  <FileText className="w-3.5 h-3.5" /> Generate Draft Bundling Quo
                </button>
              </div>

              {/* Insight 2: Inventory Alert */}
              <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-5 border border-white/60 flex flex-col justify-between group hover:bg-white/60 transition-all duration-300 shadow-sm hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between mb-3 text-teal-900">
                    <h4 className="text-sm font-black tracking-tight uppercase">Stock Shortage Alert</h4>
                    <span className="text-[10px] bg-teal-700 text-white px-2 py-0.5 rounded font-black">ANALYTIC</span>
                  </div>
                  <p className="text-xs text-teal-950/90 leading-relaxed font-bold">
                    Permintaan <span className="font-black">FCG & Autolube</span> di Kalsel melonjak <span className="text-teal-800 font-extrabold">25%</span> bulan ini. Estimasi <span className="text-red-700">shortage</span> akan terjadi dalam <span className="font-black underline">14 hari</span> di Gudang BJM.
                  </p>
                </div>
                <button className="mt-5 text-[11px] font-black text-teal-900 bg-white/80 hover:bg-white transition-all py-2.5 px-4 rounded-xl w-full flex items-center justify-center gap-2 border border-teal-200">
                  <ArrowUpRight className="w-3.5 h-3.5" /> Lihat Analisis Detail Stok
                </button>
              </div>

              {/* Insight 3: Mechanic Productivity */}
              <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-5 border border-white/60 flex flex-col justify-between group hover:bg-white/60 transition-all duration-300 shadow-sm hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between mb-3 text-teal-900">
                    <h4 className="text-sm font-black tracking-tight uppercase">Force Balancing</h4>
                    <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded font-black">RESOURCE</span>
                  </div>
                  <p className="text-xs text-teal-950/90 leading-relaxed font-bold">
                    <span className="font-black">35% inspeksi</span> minggu ini terfokus pada <span className="font-black uppercase tracking-wider">TYR</span>. AI menyarankan rotasi mekanik spesialis U/C ke area <span className="font-black">Kaltim</span> untuk menyeimbangkan cakupan.
                  </p>
                </div>
                <button className="mt-5 text-[11px] font-black text-blue-900 bg-white/80 hover:bg-white transition-all py-2.5 px-4 rounded-xl w-full flex items-center justify-center gap-2 border border-blue-200">
                  <RefreshCw className="w-3.5 h-3.5" /> Rebalance Resources Now
                </button>
              </div>
            </div>
          </div>

          {/* ── STRATEGIC & SUPPLY CHAIN INSIGHTS ──────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Inventory Readiness Card */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col shadow-sm group hover:shadow-md transition-all">
              <div className="p-5 border-b border-border bg-muted/30">
                <h4 className="text-sm font-black text-primary dark:text-foreground flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-brand-green" />
                  Inventory Readiness & DOI
                </h4>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center">
                <div className="flex items-end justify-between mb-2">
                  <p className="text-3xl font-black text-brand-green tracking-tight">{internalStrategicKPIs.inventory.fulfillmentRatio}%</p>
                  <span className="text-[10px] font-black text-green-600 bg-green-500/10 px-2 py-0.5 rounded uppercase tracking-tighter">Healthy (Target &gt;85%)</span>
                </div>
                <p className="text-[10px] text-muted-foreground font-bold mb-6 italic tracking-tight">Kesiapan stok terhadap Critical Backlog saat ini</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden flex shadow-inner">
                      <div className="h-full bg-brand-green" style={{ width: `${internalStrategicKPIs.inventory.readyInStock}%` }}></div>
                      <div className="h-full bg-yellow-400" style={{ width: `${internalStrategicKPIs.inventory.inTransit}%` }}></div>
                      <div className="h-full bg-red-500" style={{ width: `${internalStrategicKPIs.inventory.outOfStock}%` }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase mb-0.5">Ready</p>
                      <p className="text-sm font-black text-brand-green">{internalStrategicKPIs.inventory.readyInStock}%</p>
                    </div>
                    <div className="text-center border-x border-border">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase mb-0.5">Transit</p>
                      <p className="text-sm font-black text-yellow-500">{internalStrategicKPIs.inventory.inTransit}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase mb-0.5">OOS</p>
                      <p className="text-sm font-black text-red-500">{internalStrategicKPIs.inventory.outOfStock}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Bundling & Cross-Selling Card */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col shadow-sm group hover:shadow-md transition-all">
              <div className="p-5 border-b border-border bg-muted/30">
                <h4 className="text-sm font-black text-primary dark:text-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-600" />
                  Cross-Selling Success Rate
                </h4>
              </div>
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="bg-purple-500/5 rounded-xl p-4 border border-purple-500/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-purple-700 dark:text-purple-400 font-black uppercase mb-1">Avg Commodity/PO</p>
                    <p className="text-2xl font-black text-purple-600 dark:text-purple-400 tracking-tight">{internalStrategicKPIs.commercial.avgCommodityPerPO}</p>
                  </div>
                  <div className="bg-purple-600/10 p-2 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/20 rounded-xl p-3 border border-border hover:border-purple-500/30 transition-colors">
                    <p className="text-[9px] text-muted-foreground font-bold uppercase mb-0.5">Bundled Units</p>
                    <p className="text-lg font-black text-primary dark:text-foreground">{internalStrategicKPIs.commercial.bundledUnits}</p>
                  </div>
                  <div className="bg-muted/20 rounded-xl p-3 border border-border hover:border-purple-500/30 transition-colors">
                    <p className="text-[9px] text-muted-foreground font-bold uppercase mb-0.5">Conversion rate</p>
                    <p className="text-lg font-black text-primary dark:text-foreground">{internalStrategicKPIs.commercial.crossSellRate}%</p>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium italic leading-tight">*Peningkatan cross-sell didorong oleh Matrix & AI Suggestion</p>
              </div>
            </div>

            {/* 3. Backlog Aging & Conversion Speed */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col shadow-sm group hover:shadow-md transition-all">
              <div className="p-5 border-b border-border bg-muted/30">
                <h4 className="text-sm font-black text-primary dark:text-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Backlog Aging & Conversion
                </h4>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex items-baseline justify-between mb-4">
                   <p className="text-sm text-muted-foreground font-bold">Avg. Speed to PO</p>
                   <p className="text-xl font-black text-blue-600 tracking-tight">{internalStrategicKPIs.operations.avgLeadTimeToPO} Days</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-2">Backlog Pending by Age</p>
                  <div className="flex h-8 rounded-lg overflow-hidden border border-border shadow-inner">
                    {internalStrategicKPIs.operations.agingBacklogs.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="h-full flex items-center justify-center text-[10px] font-black text-white hover:opacity-80 transition-opacity" 
                        style={{ backgroundColor: item.color, width: `${(item.count / 54) * 100}%` }}
                        title={`${item.category}: ${item.count}`}
                      >
                        {item.count > 5 && item.count}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
                    {internalStrategicKPIs.operations.agingBacklogs.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[8px] font-extrabold text-muted-foreground uppercase">{item.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── CHARTS SECTION ───────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Revenue Momentum Chart */}
            <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-primary dark:text-foreground font-black text-lg tracking-tight">Revenue Potential</h3>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">By Commodity (Target Fokus)</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-primary" /></div>
              </div>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueByCommodityData} layout="vertical" barSize={12}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" opacity={0.5} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" hide />
                    <Tooltip 
                      cursor={{ fill: "var(--muted)", opacity: 0.1 }}
                      contentStyle={{ fontSize: 11, fontWeight: 700, borderRadius: 12, backgroundColor: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} 
                      formatter={(v) => [`Rp ${v} Jt`, 'Potential']} 
                    />
                    <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 9, fontWeight: 700, paddingTop: 10 }} />
                    <Bar dataKey="GET" stackId="a" fill="var(--chart-1)" />
                    <Bar dataKey="TYR" stackId="a" fill="var(--chart-2)" />
                    <Bar dataKey="FCG" stackId="a" fill="var(--chart-3)" />
                    <Bar dataKey="Autofire" stackId="a" fill="var(--chart-4)" />
                    <Bar dataKey="BAT" stackId="a" fill="var(--chart-5)" />
                    <Bar dataKey="Autolube" stackId="a" fill="#ef4444" />
                    <Bar dataKey="U/C" stackId="a" fill="#64748b" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Gap Map */}
            <div className="lg:col-span-3 bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-primary dark:text-foreground font-black text-lg tracking-tight">Plan vs Actual Performance</h3>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Backlog findings vs PO Conversion</p>
                </div>
                <div className="flex gap-2">
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary"></div><span className="text-[10px] font-bold text-muted-foreground">Findings</span></div>
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-secondary"></div><span className="text-[10px] font-bold text-muted-foreground">PO Issued</span></div>
                </div>
              </div>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyConversionData} barGap={6}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "var(--muted-foreground)" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "var(--muted-foreground)" }} />
                    <Tooltip 
                       cursor={{ fill: "var(--muted)", opacity: 0.1 }}
                      contentStyle={{ fontSize: 11, fontWeight: 700, borderRadius: 12, backgroundColor: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} 
                    />
                    <Bar dataKey="plan" name="Findings" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="actual" name="Converted PO" fill="var(--secondary)" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ── CROSS-COMMODITY MATRIX ───────────────────────── */}
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden transition-all hover:shadow-lg">
            {/* Header section */}
            <div className="px-6 py-5 border-b border-border flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-muted/20">
              <div>
                <h3 className="text-primary dark:text-foreground font-black text-lg tracking-tight">Cross-Commodity Backlog Matrix</h3>
                <p className="text-[11px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">Visualisasi kesehatan relasi multi-komoditas per unit armada</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative group">
                  <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-brand-green transition-colors" />
                  <input
                    type="text"
                    placeholder="Search Unit ID or Customer..."
                    className="pl-10 pr-4 py-2 text-xs border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-brand-green/30 w-full sm:w-64 text-foreground font-bold transition-all"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-xl text-xs font-black hover:opacity-90 transition-all shadow-md shadow-brand-green/20">
                  <Download className="w-4 h-4" /> EXPORT MATRIX
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap border-separate border-spacing-0">
                <thead className="bg-muted/50 text-[10px] uppercase font-black tracking-widest text-muted-foreground/80 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 border-b border-border">Armada / Model</th>
                    <th className="px-6 py-4 border-b border-border">Customer / Site</th>
                    {commKeys.map(k => <th key={k} className="px-3 py-4 border-b border-border text-center">{k}</th>)}
                    <th className="px-6 py-4 border-b border-border text-right">Potensi PO</th>
                    <th className="px-6 py-4 border-b border-border text-center">Avg Lead Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filtered.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/30 transition-colors group cursor-pointer" onClick={() => navigate(`/unit/${row.unitId}`)}>
                      <td className="px-6 py-4">
                        <div className="font-black text-primary dark:text-foreground group-hover:text-brand-green mb-0.5">{row.unitId}</div>
                        <div className="text-[10px] text-muted-foreground font-bold">{row.model}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs font-bold text-foreground mb-0.5">{row.customer}</div>
                        <div className="text-[10px] text-muted-foreground font-medium">{row.site}</div>
                      </td>
                      {commKeys.map(k => {
                        const status = row.commodities[k];
                        const handleCellClick = (e: React.MouseEvent) => {
                          e.stopPropagation();
                          navigate(`/unit/${row.unitId}?tab=${k}`);
                        };

                        if (status.status === "N/A") {
                           return <td key={k} className="px-3 py-4 text-center cursor-default tracking-tighter" onClick={(e) => e.stopPropagation()}><div className="w-4 h-4 rounded-full bg-muted/40 mx-auto" /></td>
                        } else if (status.status === "Critical") {
                           return <td key={k} className="px-3 py-4 text-center" onClick={handleCellClick}><div className="flex items-center justify-center gap-1.5 px-2 py-1 bg-red-500/10 rounded-lg cursor-pointer hover:bg-red-500/20 transition-all"><div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" /><span className="text-[10px] font-black text-red-600">({status.backlogCount})</span></div></td>
                        } else if (status.status === "Caution") {
                           return <td key={k} className="px-3 py-4 text-center" onClick={handleCellClick}><div className="flex items-center justify-center gap-1.5 px-2 py-1 bg-yellow-500/10 rounded-lg cursor-pointer hover:bg-yellow-500/20 transition-all"><div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]" /><span className="text-[10px] font-black text-yellow-600 dark:text-yellow-400">({status.backlogCount})</span></div></td>
                        } else {
                           return <td key={k} className="px-3 py-4 text-center" onClick={handleCellClick}><div className="w-3 h-3 rounded-full bg-brand-green shadow-[0_0_8px_rgba(35,163,78,0.4)] mx-auto cursor-pointer hover:scale-125 transition-all" /></td>
                        }
                      })}
                      <td className="px-6 py-4 text-right">
                        <div className="text-xs font-black text-primary dark:text-foreground">{formatRupiah(row.totalPoGap)}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                         <div className={`text-[11px] font-black px-2 py-1 rounded inline-block ${row.leadTimeAvg > 14 ? "bg-red-500/10 text-red-600" : row.leadTimeAvg > 7 ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" : "bg-muted/50 text-muted-foreground"}`}>
                           {row.leadTimeAvg} DAYS
                         </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={11} className="text-center py-20 text-muted-foreground font-black italic">Search result empty. Re-sync database recommended.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
             <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/10">
               <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-brand-green"></div><span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Normal</span></div>
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div><span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Caution</span></div>
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div><span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Critical (# Backlogs)</span></div>
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-muted/40"></div><span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Unit N/A</span></div>
               </div>
               <div className="text-[9px] text-muted-foreground/60 font-black uppercase tracking-widest">Real-time Data sync active — updated 2m ago</div>
             </div>
          </div>
        </>
      )}
    </div>
  );
}
