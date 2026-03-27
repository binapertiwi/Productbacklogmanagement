import React, { useState, useMemo, useCallback, Suspense, lazy } from "react";
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
  Clock,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import {
  kpiData,
  monthlyConversionData,
  revenueByCommodityData,
  inspectionTableData,
  internalStrategicKPIs,
  formatRupiah,
} from "../data/mockData";
import { CommodityType } from "../data/performanceMockData";

const CommodityPerformanceDashboard = lazy(() =>
  import("./CommodityPerformanceDashboard").then((m) => ({ default: m.CommodityPerformanceDashboard }))
);

type TabType = "Overview" | CommodityType;

const commKeys: CommodityType[] = ["U/C", "BAT", "GET", "TYR", "FCG", "Autofire", "Autolube"];

export function InternalDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("Overview");
  const [search, setSearch] = useState("");
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState(true);
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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0">
          <button 
            className="flex items-center justify-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-xs font-bold text-muted-foreground hover:bg-accent hover:text-foreground transition-all shadow-sm w-full sm:w-auto min-h-[44px]"
            aria-label="Sync Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Sync Data
          </button>
          <button 
            className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-navy dark:bg-brand-blue text-white rounded-lg text-xs font-bold hover:opacity-90 transition-all shadow-md w-full sm:w-auto min-h-[44px]"
            aria-label="Download Report"
          >
            <Download className="w-3.5 h-3.5" />
            Download Report
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-1 border-b border-border pb-0.5" role="tablist" aria-label="Dashboard views">
        {(["Overview", ...commKeys] as TabType[]).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative items-start">
          
          {/* ── ROW 1: KPI GRID ──────────────────────────────── */}
          <div className={`${isAiCopilotOpen ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${isAiCopilotOpen ? 'xl:grid-cols-4 lg:grid-cols-2' : 'lg:grid-cols-4'} gap-4`}>
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
          </div>

          {/* ── ROW 1-2: AI SIDEBAR ──────────────────────────── */}
          {isAiCopilotOpen ? (
            <div className="lg:col-span-3 lg:row-span-2 space-y-6 lg:sticky lg:top-6 self-start animate-in slide-in-from-right-8 duration-300">
              <div className="bg-gradient-to-b from-[#43E97B] to-[#38F9D7] rounded-2xl p-5 shadow-lg relative overflow-hidden border border-white/20 flex flex-col gap-4">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 animate-pulse pointer-events-none"></div>
                <div className="flex items-start justify-between relative z-10 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/30 backdrop-blur-md rounded-lg flex items-center justify-center shadow-inner shrink-0"><Sparkles className="w-4 h-4 text-teal-900" /></div>
                    <h3 className="text-teal-950 font-black tracking-tight leading-tight">AI Copilot</h3>
                  </div>
                  <button onClick={() => setIsAiCopilotOpen(false)} className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-teal-950 transition-colors shrink-0" aria-label="Collapse AI Copilot"><ChevronDown className="w-4 h-4 -rotate-90" /></button>
                </div>
                <div className="flex flex-col gap-4 relative z-10">
                  <div className="bg-white/40 backdrop-blur-xl rounded-xl p-4 border border-white/60 flex flex-col justify-between group hover:bg-white/60 transition-all shadow-sm">
                    <div className="flex items-center justify-between mb-2 text-teal-900"><h4 className="text-xs font-black tracking-tight uppercase">High Probability PO</h4><span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded font-black">CRITICAL</span></div>
                    <p className="text-[11px] text-teal-950/90 leading-relaxed font-bold mb-3">Terdapat <span className="underline decoration-red-500 decoration-2">5 unit di PT Thiess (Kaltim)</span> dengan status Critical.</p>
                    <button className="text-[10px] font-black text-white bg-teal-900 hover:bg-black transition-all py-2 px-3 rounded-lg w-full flex items-center justify-center gap-1.5 shadow-lg"><FileText className="w-3 h-3" /> Draft Bundling</button>
                  </div>
                  <div className="bg-white/40 backdrop-blur-xl rounded-xl p-4 border border-white/60 flex flex-col justify-between group hover:bg-white/60 transition-all shadow-sm">
                    <div className="flex items-center justify-between mb-2 text-teal-900"><h4 className="text-xs font-black tracking-tight uppercase">Stock Shortage</h4><span className="text-[9px] bg-teal-700 text-white px-1.5 py-0.5 rounded font-black">ANALYTIC</span></div>
                    <p className="text-[11px] text-teal-950/90 leading-relaxed font-bold mb-3">Shortage estimasi <span className="font-black underline text-red-700">14 hari</span> di Gudang BJM.</p>
                    <button className="text-[10px] font-black text-teal-900 bg-white/80 hover:bg-white transition-all py-2 px-3 rounded-lg w-full flex items-center justify-center gap-1.5 border border-teal-200"><ArrowUpRight className="w-3 h-3" /> Detail Stok</button>
                  </div>
                  <div className="bg-white/40 backdrop-blur-xl rounded-xl p-4 border border-white/60 flex flex-col justify-between group hover:bg-white/60 transition-all shadow-sm">
                    <div className="flex items-center justify-between mb-2 text-teal-900"><h4 className="text-xs font-black tracking-tight uppercase">Force Balancing</h4><span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-black">RESOURCE</span></div>
                    <p className="text-[11px] text-teal-950/90 leading-relaxed font-bold mb-3"><span className="font-black">35% inspeksi</span> terfokus pada TYR. AI sarankan rotasi mekanik U/C ke Kaltim.</p>
                    <button className="text-[10px] font-black text-blue-900 bg-white/80 hover:bg-white transition-all py-2 px-3 rounded-lg w-full flex items-center justify-center gap-1.5 border border-blue-200"><RefreshCw className="w-3.5 h-3.5" /> Rebalance Now</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="fixed bottom-6 right-6 z-50">
              <button onClick={() => setIsAiCopilotOpen(true)} className="bg-gradient-to-br from-[#43E97B] to-[#38F9D7] text-teal-900 p-3 rounded-full shadow-xl hover:scale-110 transition-all flex items-center justify-center border border-white/40 group" aria-label="Open AI Copilot"><Sparkles className="w-6 h-6 group-hover:animate-pulse" /></button>
            </div>
          )}

          {/* ── ROW 2: STRATEGIC INSIGHTS ────────────────────── */}
          <div className={`${isAiCopilotOpen ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
            <div className={`grid grid-cols-1 ${isAiCopilotOpen ? 'xl:grid-cols-3 lg:grid-cols-2' : 'lg:grid-cols-3'} gap-6`}>
              <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col shadow-sm group hover:shadow-md transition-all">
                <div className="p-5 border-b border-border bg-muted/30">
                  <h4 className="text-sm font-black text-primary dark:text-foreground flex items-center gap-2"><RefreshCw className="w-4 h-4 text-brand-green" /> Inventory Readiness & DOI</h4>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div className="flex items-end justify-between mb-2">
                    <p className="text-3xl font-black text-brand-green tracking-tight">{internalStrategicKPIs.inventory.fulfillmentRatio}%</p>
                    <span className="text-[10px] font-black text-green-600 bg-green-500/10 px-2 py-0.5 rounded uppercase tracking-tighter">Healthy (Target &gt;85%)</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-bold mb-6 italic tracking-tight">Kesiapan stok terhadap Critical Backlog saat ini</p>
                  <div className="space-y-4">
                    <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden flex shadow-inner">
                      <div className="h-full bg-brand-green" style={{ width: `${internalStrategicKPIs.inventory.readyInStock}%` }}></div>
                      <div className="h-full bg-yellow-400" style={{ width: `${internalStrategicKPIs.inventory.inTransit}%` }}></div>
                      <div className="h-full bg-red-500" style={{ width: `${internalStrategicKPIs.inventory.outOfStock}%` }}></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center"><p className="text-[10px] text-muted-foreground font-bold uppercase mb-0.5">Ready</p><p className="text-sm font-black text-brand-green">{internalStrategicKPIs.inventory.readyInStock}%</p></div>
                      <div className="text-center border-x border-border"><p className="text-[10px] text-muted-foreground font-bold uppercase mb-0.5">Transit</p><p className="text-sm font-black text-yellow-500">{internalStrategicKPIs.inventory.inTransit}%</p></div>
                      <div className="text-center"><p className="text-[10px] text-muted-foreground font-bold uppercase mb-0.5">OOS</p><p className="text-sm font-black text-red-500">{internalStrategicKPIs.inventory.outOfStock}%</p></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col shadow-sm group hover:shadow-md transition-all">
                <div className="p-5 border-b border-border bg-muted/30">
                  <h4 className="text-sm font-black text-primary dark:text-foreground flex items-center gap-2"><Layers className="w-4 h-4 text-purple-600" /> Cross-Selling Success</h4>
                </div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="bg-purple-500/5 rounded-xl p-4 border border-purple-500/10 flex items-center justify-between">
                    <div><p className="text-[10px] text-purple-700 dark:text-purple-400 font-black uppercase mb-1">Avg Commodity/PO</p><p className="text-2xl font-black text-purple-600 dark:text-purple-400 tracking-tight">{internalStrategicKPIs.commercial.avgCommodityPerPO}</p></div>
                    <div className="bg-purple-600/10 p-2 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors"><TrendingUp className="w-5 h-5" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/20 rounded-xl p-3 border border-border hover:border-purple-500/30 transition-colors"><p className="text-[9px] text-muted-foreground font-bold uppercase mb-0.5">Bundled Units</p><p className="text-lg font-black text-primary dark:text-foreground">{internalStrategicKPIs.commercial.bundledUnits}</p></div>
                    <div className="bg-muted/20 rounded-xl p-3 border border-border hover:border-purple-500/30 transition-colors"><p className="text-[9px] text-muted-foreground font-bold uppercase mb-0.5">Conv. Rate</p><p className="text-lg font-black text-primary dark:text-foreground">{internalStrategicKPIs.commercial.crossSellRate}%</p></div>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col shadow-sm group hover:shadow-md transition-all">
                <div className="p-5 border-b border-border bg-muted/30">
                  <h4 className="text-sm font-black text-primary dark:text-foreground flex items-center gap-2"><Clock className="w-4 h-4 text-blue-600" /> Backlog Aging</h4>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="flex items-baseline justify-between mb-4"><p className="text-sm text-muted-foreground font-bold">Avg. Speed to PO</p><p className="text-xl font-black text-blue-600 tracking-tight">{internalStrategicKPIs.operations.avgLeadTimeToPO} Days</p></div>
                  <div className="space-y-2">
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-2">Backlog Pending</p>
                    <div className="flex h-8 rounded-lg overflow-hidden border border-border shadow-inner">
                      {internalStrategicKPIs.operations.agingBacklogs.map((item) => (<div key={item.category} className="h-full flex items-center justify-center text-[10px] font-black text-white hover:opacity-80 transition-opacity" style={{ backgroundColor: item.color, width: `${(item.count / 54) * 100}%` }} title={`${item.category}: ${item.count}`}>{item.count > 5 && item.count}</div>))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 3+: FULL WIDTH SECTION ───────────────────── */}
          <div className="lg:col-span-12 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <div><h3 className="text-primary dark:text-foreground font-black text-lg tracking-tight">Revenue Potential</h3><p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">By Commodity</p></div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600"><DollarSign className="w-5 h-5 font-black" /></div>
                </div>
                <div className="mt-4 mb-6">
                   <p className="text-4xl font-black text-primary tracking-tighter">{formatRupiah(kpiData.revenuePotential)}</p>
                   <div className="flex items-center gap-2 mt-2"><span className="text-[10px] text-green-600 font-black bg-green-500/10 px-2 py-0.5 rounded uppercase">+{kpiData.revenueDelta} Increase</span></div>
                </div>
                <div className="space-y-6 flex-1 flex flex-col justify-end">
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-2">Portfolio Breakdown</p>
                  <div className="flex h-12 rounded-xl overflow-hidden border border-border shadow-inner bg-muted/20">
                    {(() => {
                      const rev = revenueByCommodityData[0];
                      const total = Object.entries(rev).reduce((acc, [k, v]) => k !== 'name' ? acc + (v as number) : acc, 0);
                      const colors: Record<string, string> = { "GET": "bg-[var(--chart-1)]", "TYR": "bg-[var(--chart-2)]", "FCG": "bg-[var(--chart-3)]", "Autofire": "bg-[var(--chart-4)]", "BAT": "bg-[var(--chart-5)]", "Autolube": "bg-red-500", "U/C": "bg-slate-500" };
                      return (Object.entries(rev) as [string, number|string][]).filter(([k]) => k !== 'name').map(([k, v]) => (<div key={k} className={`h-full ${colors[k] || 'bg-muted'} hover:opacity-80 transition-opacity flex items-center justify-center text-[8px] sm:text-[10px] font-black text-white border-r border-white/5`} style={{ width: `${((v as number) / total) * 100}%` }} title={`${k}: Rp ${v} Jt`}>{k === 'Autofire' ? 'AF' : k === 'Autolube' ? 'AL' : k}</div>));
                    })()}
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-2">
                    {(() => {
                       const rev = revenueByCommodityData[0];
                       const top4 = (Object.entries(rev) as [string, number|string][]).filter(([k]) => k !== 'name').sort((a, b) => (b[1] as number) - (a[1] as number)).slice(0, 4);
                       const colors: Record<string, string> = { "GET": "bg-[var(--chart-1)]", "TYR": "bg-[var(--chart-2)]", "FCG": "bg-[var(--chart-3)]", "Autofire": "bg-[var(--chart-4)]", "BAT": "bg-[var(--chart-5)]", "Autolube": "bg-red-500", "U/C": "bg-slate-500" };
                       const labels: Record<string, string> = { "GET": "Ground Engaging", "TYR": "Tyre & Rims", "FCG": "Fluid Connector", "Autofire": "Auto Fire Supp.", "BAT": "Battery System", "Autolube": "Auto Lubrication", "U/C": "Undercarriage" };
                       return top4.map(([k, v]) => (<div key={k} className="flex items-center justify-between border-b border-border/50 pb-1"><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${colors[k] || 'bg-muted'}`} /><span className="text-[10px] font-bold text-muted-foreground uppercase truncate max-w-[80px]">{labels[k] || k}</span></div><span className="text-[11px] font-black text-primary">Rp {v} Jt</span></div>));
                    })()}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3 bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div><h3 className="text-primary dark:text-foreground font-black text-lg tracking-tight">Plan vs Actual</h3><p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Findings vs PO</p></div>
                </div>
                <div className="h-[260px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyConversionData} barGap={6}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "var(--muted-foreground)" }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "var(--muted-foreground)" }} />
                      <Tooltip cursor={{ fill: "var(--muted)", opacity: 0.1 }} contentStyle={{ fontSize: 11, fontWeight: 700, borderRadius: 12, backgroundColor: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} />
                      <Bar dataKey="plan" name="Findings" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={20} />
                      <Bar dataKey="actual" name="Converted PO" fill="var(--secondary)" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden transition-all hover:shadow-lg">
              <div className="px-6 py-5 border-b border-border flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-muted/20">
                <div><h3 className="text-primary dark:text-foreground font-black text-lg tracking-tight">Cross-Commodity Backlog Matrix</h3><p className="text-[11px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">Visualisasi kesehatan relasi multi-komoditas per unit armada</p></div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative group"><Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-brand-green transition-colors" /><input type="text" placeholder="Search Unit ID or Customer..." className="pl-10 pr-4 py-2 text-xs border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-brand-green/30 w-full sm:w-64 text-foreground font-bold transition-all" value={search} onChange={handleSearchChange} /></div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-xl text-xs font-black hover:opacity-90 transition-all shadow-md shadow-brand-green/20"><Download className="w-4 h-4" /> EXPORT MATRIX</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap border-separate border-spacing-0">
                  <thead className="bg-muted/50 text-[10px] uppercase font-black tracking-widest text-muted-foreground/80 border-b border-border">
                    <tr><th className="px-6 py-4 border-b border-border sticky left-0 z-20 bg-muted/50">Armada / Model</th><th className="px-6 py-4 border-b border-border">Customer / Site</th>{commKeys.map(k => <th key={k} className="px-3 py-4 border-b border-border text-center">{k}</th>)}<th className="px-6 py-4 border-b border-border text-right">Potensi PO</th><th className="px-6 py-4 border-b border-border text-center">Avg Lead Time</th></tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {filtered.map((row) => (
                      <tr key={row.unitId} className="hover:bg-muted/30 transition-colors group cursor-pointer" onClick={() => navigate(`/unit/${row.unitId}`)}>
                        <td className="px-6 py-4 sticky left-0 z-10 bg-card group-hover:bg-muted/30 transition-colors border-r border-border/10"><div className="font-black text-primary dark:text-foreground group-hover:text-brand-green mb-0.5">{row.unitId}</div><div className="text-[10px] text-muted-foreground font-bold">{row.model}</div></td>
                        <td className="px-6 py-4"><div className="text-xs font-bold text-foreground mb-0.5">{row.customer}</div><div className="text-[10px] text-muted-foreground font-medium">{row.site}</div></td>
                        {commKeys.map(k => {
                          const status = row.commodities[k];
                          const handleCellClick = (e: React.MouseEvent) => { e.stopPropagation(); navigate(`/unit/${row.unitId}?tab=${k}`); };
                          if (status.status === "N/A") { return <td key={k} className="px-3 py-4 text-center cursor-default tracking-tighter" onClick={(e) => e.stopPropagation()}><div className="w-4 h-4 rounded-full bg-muted/40 mx-auto" /></td> }
                          else if (status.status === "Critical") { return <td key={k} className="px-3 py-4 text-center" onClick={handleCellClick}><div className="flex items-center justify-center gap-1.5 px-2 py-1 bg-red-500/10 rounded-lg cursor-pointer hover:bg-red-500/20 transition-all"><div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" /><span className="text-[10px] font-black text-red-600">({status.backlogCount})</span></div></td> }
                          else if (status.status === "Caution") { return <td key={k} className="px-3 py-4 text-center" onClick={handleCellClick}><div className="flex items-center justify-center gap-1.5 px-2 py-1 bg-yellow-500/10 rounded-lg cursor-pointer hover:bg-yellow-500/20 transition-all"><div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]" /><span className="text-[10px] font-black text-yellow-600 dark:text-yellow-400">({status.backlogCount})</span></div></td> }
                          else { return <td key={k} className="px-3 py-4 text-center" onClick={handleCellClick}><div className="w-3 h-3 rounded-full bg-brand-green shadow-[0_0_8px_rgba(35,163,78,0.4)] mx-auto cursor-pointer hover:scale-125 transition-all" /></td> }
                        })}
                        <td className="px-6 py-4 text-right"><div className="text-xs font-black text-primary dark:text-foreground">{formatRupiah(row.totalPoGap)}</div></td>
                        <td className="px-6 py-4 text-center"><div className={`text-[11px] font-black px-2 py-1 rounded inline-block ${row.leadTimeAvg > 14 ? "bg-red-500/10 text-red-600" : row.leadTimeAvg > 7 ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" : "bg-muted/50 text-muted-foreground"}`}>{row.leadTimeAvg} DAYS</div></td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (<tr><td colSpan={11} className="text-center py-20 text-muted-foreground font-black italic">Search result empty. Re-sync database recommended.</td></tr>)}
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
          </div>
        </div>
      )}
    </div>
  );
}
