import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
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
  DollarSign,
  Info,
  Sparkles
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  RadialBarChart,
  RadialBar,
  Tooltip as RechartsTooltip,
} from "recharts";
import { fleetHealthSummary, unitHealthData, topUnitsAtRisk, customerStrategicKPIs, formatRupiah } from "../data/mockData";
import { ALL_COMMODITIES, COMMODITY_LABELS } from "../data/inspectionTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const healthColor = {
  Critical: {
    text: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    badge: "bg-destructive/15 text-destructive font-bold",
    bar: "bg-destructive",
    dot: "bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.5)]",
  },
  Caution: {
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    badge: "bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold",
    bar: "bg-amber-500",
    dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
  },
  Good: {
    text: "text-brand-green",
    bg: "bg-brand-green/10",
    border: "border-brand-green/20",
    badge: "bg-brand-green/15 text-brand-green font-bold",
    bar: "bg-brand-green",
    dot: "bg-brand-green shadow-[0_0_8px_rgba(35,163,78,0.5)]",
  },
  "N/A": {
    text: "text-muted-foreground",
    bg: "bg-muted",
    border: "border-border",
    badge: "bg-muted text-muted-foreground font-medium",
    bar: "bg-muted-foreground/30",
    dot: "bg-muted-foreground/30",
  }
};

function HealthGauge({ score, label }: { score: number; label: string }) {
  const color = label === "Critical" ? "#ef4444" : label === "Caution" ? "#d97706" : "#23a34e";
  const data = [{ value: score, fill: color }];

  return (
    <div className="relative" style={{ width: 140, height: 140 }}>
      <RadialBarChart width={140} height={140} cx="50%" cy="50%" innerRadius={48} outerRadius={62} startAngle={180} endAngle={-180} data={[{ value: 100, fill: "var(--border)" }, ...data]} barSize={12}>
        <RadialBar dataKey="value" cornerRadius={8} background={false} />
        <RechartsTooltip formatter={(v) => [`${v}%`, "Health Score"]} contentStyle={{ fontSize: 11, backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }} />
      </RadialBarChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-2xl font-bold" style={{ color }}>{score}</span><span className="text-xs text-muted-foreground/70 font-medium">/ 100</span></div>
    </div>
  );
}

function WearBar({ wear, threshold }: { wear: number; threshold: number }) {
  const color = wear >= threshold ? "bg-red-500" : wear >= threshold * 0.9 ? "bg-amber-500" : "bg-green-500";
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden relative">
        <div className="absolute top-0 bottom-0 w-0.5 bg-muted-foreground/50 z-10" style={{ left: `${threshold}%` }} />
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${Math.min(wear, 100)}%` }} />
      </div>
      <span className={`text-[10px] w-8 text-right flex-shrink-0 font-bold ${wear >= threshold ? "text-red-600" : "text-muted-foreground"}`}>{wear}%</span>
    </div>
  );
}

export function CustomerPortal() {
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [commodityFilter, setCommodityFilter] = useState("All Commodity");
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState(true);
  const navigate = useNavigate();

  const s = fleetHealthSummary;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return unitHealthData.filter((u) => {
      const matchesSearch = u.serialNumber.toLowerCase().includes(q) || u.model.toLowerCase().includes(q) || u.site.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All Status" || u.overallHealth === statusFilter;
      const matchesCommodity = commodityFilter === "All Commodity" || (u.commodityStatus as Record<string, string>)[commodityFilter] !== "N/A";
      return matchesSearch && matchesStatus && matchesCommodity;
    });
  }, [search, statusFilter, commodityFilter]);

  const handleExportPO = useCallback(() => { alert("Export PO Recommendation\n\nPO akan digenerate dan dikelompokkan secara otomatis...\n\n[Demo Mode]"); }, []);
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), []);

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 bg-background min-h-screen transition-colors duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-primary dark:text-foreground">Fleet Health & Procurement Portal</h1><p className="text-sm text-muted-foreground">Monitoring kesehatan unit dan backlog perbaikan secara transparan</p></div>
        <div className="flex items-center gap-2"><button onClick={handleExportPO} className="flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-lg text-sm hover:bg-brand-green/90 transition-colors shadow-md shadow-brand-green/20 font-bold"><Download className="w-4 h-4" />Export PO Recommendation</button></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative items-start">
        {/* ── ROW 1 & 2 LEFT CONTENT ────────────────────────── */}
        <div className={`${isAiCopilotOpen ? 'lg:col-span-9' : 'lg:col-span-12'} space-y-6`}>
            {/* Fleet Health Summary Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="sm:col-span-1 bg-card rounded-xl border border-border p-4 sm:p-5 shadow-sm flex flex-col items-center justify-center transition-all hover:shadow-md relative">
                    <div className="absolute top-4 right-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="text-muted-foreground hover:text-primary transition-colors">
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[200px]">
                          Skor kesehatan rata-rata seluruh armada berdasarkan temuan teknis terbaru.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 text-center font-bold">Overall Health</p>
                    <HealthGauge score={s.overallScore} label={s.scoreLabel} />
                    <div className={`mt-2 flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${s.scoreLabel === "Good" ? "bg-brand-green/10 text-brand-green" : s.scoreLabel === "Caution" ? "bg-amber-500/10 text-amber-700 dark:text-amber-400" : "bg-destructive/10 text-destructive"}`}>
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.scoreLabel === "Good" ? "bg-brand-green" : s.scoreLabel === "Caution" ? "bg-amber-500" : "bg-destructive"}`}></span>{s.scoreLabel}
                    </div>
                </div>
                <div className="sm:col-span-1 lg:col-span-1 bg-card rounded-xl border border-border p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-primary dark:text-foreground" />
                        <h3 className="text-primary dark:text-foreground font-black text-sm uppercase tracking-tight">Urgency Matrix</h3>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="text-muted-foreground hover:text-primary transition-colors">
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[200px]">
                          Pengelompokan unit berdasarkan tingkat urgensi perbaikan (Critical, Caution, Good).
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center justify-between p-2 bg-destructive/5 rounded-lg border border-destructive/10"><div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /><span className="text-xs text-destructive font-bold">Critical</span></div><span className="text-lg font-bold text-destructive">{s.critical}</span></div>
                        <div className="flex items-center justify-between p-2 bg-amber-500/5 rounded-lg border border-amber-500/10"><div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600" /><span className="text-xs text-amber-700 dark:text-amber-400 font-bold">Caution</span></div><span className="text-lg font-bold text-amber-600">{s.caution}</span></div>
                        <div className="flex items-center justify-between p-2 bg-brand-green/5 rounded-lg border border-brand-green/10"><div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-green" /><span className="text-xs text-brand-green font-bold">Good</span></div><span className="text-lg font-bold text-brand-green">{s.good}</span></div>
                    </div>
                </div>
                <div className="sm:col-span-2 lg:col-span-2 bg-card rounded-xl border border-border p-4 sm:p-5 shadow-sm border-l-4 border-l-destructive transition-all hover:shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        <h3 className="text-primary dark:text-foreground font-black text-sm uppercase tracking-tight">Top Units at Risk</h3>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="text-muted-foreground hover:text-destructive transition-colors">
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[200px]">
                          Daftar unit dengan risiko kegagalan fungsional tertinggi dan estimasi waktu kerusakannya.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="space-y-2">
                        {topUnitsAtRisk.map((unit) => (<div key={unit.unitId} className="flex justify-between items-center bg-muted rounded p-2 text-xs transition-colors hover:bg-muted/80"><div><span className="font-bold text-primary dark:text-brand-blue">{unit.unitId}</span> <span className="text-muted-foreground font-medium">({unit.site})</span></div><div className="flex items-center gap-3"><span className="text-destructive bg-destructive/10 px-2 py-0.5 rounded font-bold">Fatal: {unit.fatalCommodity}</span><span className="text-foreground/70 font-medium">Est. {unit.daysToBreakdown} hari</span></div></div>))}
                    </div>
                </div>
            </div>

            {/* Financial & Safety Summary Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-primary dark:text-foreground font-black text-lg tracking-tight">Budget Forecasting</h3>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="text-muted-foreground hover:text-brand-navy dark:hover:text-brand-blue transition-colors">
                                <Info className="w-3.5 h-3.5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-[200px]">
                              Proyeksi kebutuhan anggaran pemeliharaan armada untuk periode 30 dan 90 hari ke depan.
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <h6 className="text-[10px] text-muted-foreground font-black uppercase tracking-wider mt-0.5">Projected Maintenance</h6>
                      </div>
                      <div className="w-10 h-10 bg-brand-navy/10 dark:bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-navy dark:text-brand-blue"><DollarSign className="w-5 h-5" /></div>
                    </div>
                    <div className="space-y-4"><div className="grid grid-cols-2 gap-3"><div className="p-3 bg-muted/20 rounded-xl border border-border"><p className="text-[9px] text-muted-foreground font-bold uppercase mb-0.5">Next 30D</p><p className="text-sm font-black text-primary dark:text-foreground">{formatRupiah(customerStrategicKPIs.budgetForecast.total30Days)}</p></div><div className="p-3 bg-muted/20 rounded-xl border border-border"><p className="text-[9px] text-muted-foreground font-bold uppercase mb-0.5">Next 90D</p><p className="text-sm font-black text-primary dark:text-foreground">{formatRupiah(customerStrategicKPIs.budgetForecast.total90Days)}</p></div></div></div>
                </div>
                <div className={`bg-card rounded-2xl border-2 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all ${customerStrategicKPIs.safetyIndex.fleetSafetyScore < 100 ? "border-red-500/50" : "border-border"}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-primary dark:text-foreground font-black text-lg tracking-tight">Safety & Compliance</h3>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="text-muted-foreground hover:text-red-500 transition-colors">
                                <Info className="w-3.5 h-3.5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-[200px]">
                              Indeks kepatuhan standar keselamatan kerja berdasarkan kondisi sistem proteksi unit (Fire/Safety).
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <h6 className="text-[10px] text-muted-foreground font-black uppercase tracking-wider mt-0.5">Fleet Assurance</h6>
                      </div>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${customerStrategicKPIs.safetyIndex.fleetSafetyScore < 100 ? "bg-red-500 text-white animate-pulse" : "bg-brand-green/10 text-brand-green"}`}><Shield className="w-5 h-5" /></div>
                    </div>
                    <div className="flex items-center gap-6"><div className="relative"><svg className="w-20 h-20"><circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/20" /><circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={226} strokeDashoffset={226 - (226 * customerStrategicKPIs.safetyIndex.fleetSafetyScore) / 100} className={customerStrategicKPIs.safetyIndex.fleetSafetyScore < 100 ? "text-red-500" : "text-brand-green"} /></svg><div className="absolute inset-0 flex items-center justify-center font-black text-lg">{customerStrategicKPIs.safetyIndex.fleetSafetyScore}%</div></div><div className="flex-1 space-y-2">{customerStrategicKPIs.safetyIndex.components.map((c) => (<div key={c.name} className="flex flex-col"><div className="flex justify-between items-center mb-1"><span className="text-[9px] font-bold text-muted-foreground">{c.name}</span><span className={`text-[9px] font-black ${c.status === "Critical" ? "text-red-500" : "text-brand-green"}`}>{c.score}%</span></div><div className="h-1 bg-muted rounded-full overflow-hidden"><div className={`h-full ${c.status === "Critical" ? "bg-red-500" : "bg-brand-green"}`} style={{ width: `${c.score}%` }}></div></div></div>))}</div></div>
                </div>
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-primary dark:text-foreground font-black text-lg tracking-tight">Procurement</h3>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="text-muted-foreground hover:text-brand-green transition-colors">
                                <Info className="w-3.5 h-3.5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-[200px]">
                              Status pemenuhan kebutuhan suku cadang dan progres pengiriman hingga ke site.
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Progress</p>
                      </div>
                      <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green"><Layers className="w-5 h-5" /></div>
                    </div>
                    <div className="space-y-4"><div className="flex justify-between items-end mb-1"><span className="text-[10px] text-muted-foreground font-bold uppercase">Delivery Progress</span><span className="text-xs font-black text-brand-green">{customerStrategicKPIs.procurementPipeline.fulfillmentProgress}%</span></div><div className="h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-brand-green" style={{ width: `${customerStrategicKPIs.procurementPipeline.fulfillmentProgress}%` }}></div></div></div>
                </div>
            </div>
        </div>

        {/* ── AI SIDEBAR ────────────────────────────────────── */}
        {isAiCopilotOpen ? (
          <div className="lg:col-span-3 lg:row-span-2 space-y-6 lg:sticky lg:top-6 self-start animate-in slide-in-from-right-8 duration-300">
            <div className="bg-gradient-to-b from-[#43E97B] to-[#38F9D7] rounded-2xl p-5 shadow-lg relative overflow-hidden border border-white/20 flex flex-col gap-4">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 animate-pulse pointer-events-none"></div>
              <div className="flex items-start justify-between relative z-10 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/30 backdrop-blur-md rounded-xl flex items-center justify-center shadow-inner shrink-0"><Sparkles className="w-4 h-4 text-teal-900" /></div>
                  <h3 className="text-teal-950 font-black tracking-tight leading-tight">AI Advisor</h3>
                </div>
                <button onClick={() => setIsAiCopilotOpen(false)} className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-teal-950 transition-colors shrink-0" aria-label="Collapse AI Advisor"><ChevronDown className="w-4 h-4 -rotate-90" /></button>
              </div>
              <div className="flex flex-col gap-4 relative z-10">
                <div className="bg-white/40 backdrop-blur-xl rounded-xl p-4 border border-white/60 flex flex-col justify-between group hover:bg-white/60 transition-all shadow-sm">
                  <div className="flex items-center justify-between mb-2 text-teal-900"><h4 className="text-xs font-black tracking-tight uppercase">Insight Keandalan</h4><span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded font-black">CRITICAL</span></div>
                  <p className="text-[11px] text-teal-950/90 leading-relaxed font-bold mb-3">Unit <span className="font-black text-red-600 underline">PC800-8-61823</span> memiliki probabilitas 85% untuk gagal.</p>
                  <button className="text-[10px] font-black text-white bg-teal-900 hover:bg-black transition-all py-2 px-3 rounded-lg w-full flex items-center justify-center gap-1.5 shadow-lg"><AlertTriangle className="w-3 h-3" /> Prioritaskan PO</button>
                </div>
                <div className="bg-white/40 backdrop-blur-xl rounded-xl p-4 border border-white/60 flex flex-col justify-between group hover:bg-white/60 transition-all shadow-sm">
                  <div className="flex items-center justify-between mb-2 text-teal-900"><h4 className="text-xs font-black tracking-tight uppercase">Efisiensi</h4><span className="text-[9px] bg-teal-700 text-white px-1.5 py-0.5 rounded font-black">ANALYTIC</span></div>
                  <p className="text-[11px] text-teal-950/90 leading-relaxed font-bold mb-3">Gabungkan minggu ini untuk <span className="text-teal-800 underline">hemat 12 jam downtime</span>.</p>
                  <button className="text-[10px] font-black text-teal-900 bg-white/80 hover:bg-white transition-all py-2 px-3 rounded-lg w-full flex items-center justify-center gap-1.5 border border-teal-200"><Clock className="w-3 h-3" /> Gabungkan Part</button>
                </div>
                <div className="bg-white/40 backdrop-blur-xl rounded-xl p-4 border border-white/60 flex flex-col justify-between group hover:bg-white/60 transition-all shadow-sm">
                  <div className="flex items-center justify-between mb-2 text-teal-900"><h4 className="text-xs font-black tracking-tight uppercase">Budget Forecast</h4><span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-black">FINANCE</span></div>
                  <p className="text-[11px] text-teal-950/90 leading-relaxed font-bold mb-3">Estimasi anggaran pemeliharaan armada Q2 2026 adalah sekitar <span className="font-black text-lg">Rp 1.2 M</span>.</p>
                  <div className="text-[10px] font-black text-teal-900/60 bg-white/40 py-2 px-3 rounded-lg w-full flex items-center justify-center italic">Forecasting active...</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed bottom-6 right-6 z-50">
            <button onClick={() => setIsAiCopilotOpen(true)} className="bg-gradient-to-br from-[#43E97B] to-[#38F9D7] text-teal-900 p-3 rounded-full shadow-xl hover:scale-110 transition-all flex items-center justify-center border border-white/40 group" aria-label="Open AI Advisor"><Sparkles className="w-6 h-6 group-hover:animate-pulse" /></button>
          </div>
        )}

        {/* ── ROW 3+: FULL WIDTH ────────────────────────────── */}
        <div className="lg:col-span-12">
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden transition-colors">
              <div className="px-4 sm:px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-muted/30">
                <div><h3 className="text-primary dark:text-foreground font-bold font-heading">Technical Details per Unit</h3><p className="text-xs text-muted-foreground mt-0.5 font-medium">Identifikasi kesehatan unit secara holistik</p></div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="relative flex-1 sm:flex-none">
                        <Filter className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                        <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-full sm:w-[130px] pl-8 h-9 text-xs font-bold bg-background"><SelectValue placeholder="All Status" /></SelectTrigger><SelectContent><SelectItem value="All Status">All Status</SelectItem><SelectItem value="Critical">Critical</SelectItem><SelectItem value="Caution">Caution</SelectItem><SelectItem value="Good">Good</SelectItem></SelectContent></Select>
                    </div>
                    <div className="relative flex-1 sm:flex-none">
                        <Layers className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                        <Select value={commodityFilter} onValueChange={setCommodityFilter}><SelectTrigger className="w-full sm:w-[150px] pl-8 h-9 text-xs font-bold bg-background"><SelectValue placeholder="All Commodity" /></SelectTrigger><SelectContent><SelectItem value="All Commodity">All Commodity</SelectItem>{ALL_COMMODITIES.map(c => (<SelectItem key={c} value={c}>{c}</SelectItem>))}</SelectContent></Select>
                    </div>
                    <div className="relative flex-1 sm:flex-none"><Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" /><input type="text" placeholder="Cari unit..." className="pl-9 pr-4 text-xs h-9 border border-border rounded-lg bg-background focus:outline-none focus:ring-1 focus:ring-primary/30 w-full sm:w-44 text-foreground font-medium" value={search} onChange={handleSearchChange} /></div>
                </div>
              </div>
              <div className="divide-y divide-border">
                {filtered.map((unit) => {
                  const isOpen = expandedUnit === unit.serialNumber;
                  const hc = healthColor[unit.overallHealth as keyof typeof healthColor] || healthColor["N/A"];
                  return (
                    <div key={unit.serialNumber} className="group">
                      <div className={`px-4 sm:px-5 py-4 cursor-pointer hover:bg-muted/50 transition-all ${isOpen ? "bg-muted/50" : ""}`} onClick={() => setExpandedUnit(isOpen ? null : unit.serialNumber)}>
                        <div className="flex items-start gap-4"><div className={`w-1.5 h-12 rounded-full flex-shrink-0 ${hc.dot}`} /><div className="flex-1 min-w-0"><div className="flex flex-col md:flex-row md:items-start justify-between gap-2"><div className="min-w-0"><div className="text-lg font-bold text-primary dark:text-foreground flex items-center gap-3">{unit.serialNumber}<span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${hc.badge}`}>{unit.overallHealth}</span></div><div className="text-sm text-muted-foreground mt-0.5 font-medium">{unit.model} — {unit.site}</div></div><div className="flex items-center gap-3 text-xs text-muted-foreground font-medium"><span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {new Date(unit.lastInspection).toLocaleDateString("id-ID")}</span><span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5"/> {unit.hoursOperated.toLocaleString()} H</span>{isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</div></div><div className="mt-4 flex items-center gap-2 flex-wrap">{ALL_COMMODITIES.map(comm => { const status = (unit.commodityStatus as any)[comm]; if (!status) return null; return (<div key={comm} onClick={(e) => { e.stopPropagation(); if (status !== 'N/A') navigate(`/unit/${unit.serialNumber}?tab=${comm}`); }} className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-bold transition-all ${status !== 'N/A' ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-default opacity-50'} ${(healthColor[status as keyof typeof healthColor] || healthColor["N/A"]).bg} ${(healthColor[status as keyof typeof healthColor] || healthColor["N/A"]).border} ${(healthColor[status as keyof typeof healthColor] || healthColor["N/A"]).text}`}><div className={`w-1.5 h-1.5 rounded-full ${(healthColor[status as keyof typeof healthColor] || healthColor["N/A"]).dot}`} /> {comm}</div>); })}</div></div></div>
                      </div>
                      {isOpen && (<div className="px-4 sm:px-14 py-6 bg-muted/20 border-y border-border/50 animate-in fade-in slide-in-from-top-1 duration-200"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"><div><h4 className="text-sm font-black text-primary dark:text-foreground">Komponen Dominan & Status Keausan</h4><p className="text-xs text-muted-foreground mt-0.5">Rekomendasi tindakan berdasar temuan inspeksi terakhir</p></div><button onClick={(e) => { e.stopPropagation(); navigate(`/unit/${unit.serialNumber}`); }} className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-navy dark:bg-brand-blue text-white rounded-lg text-xs font-bold shadow-md hover:opacity-90 transition-opacity w-full sm:w-auto min-h-[44px]"><FileText className="w-3.5 h-3.5" /> Full Inspection Report</button></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{unit.components.map((comp) => { const cc = healthColor[comp.priority as keyof typeof healthColor] || healthColor["N/A"]; return (<div key={comp.name} className="bg-card border border-border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"><div className="flex justify-between items-start mb-3"><h4 className="text-sm font-bold text-primary dark:text-foreground">{comp.name}</h4><span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${cc.badge}`}>{comp.priority}</span></div><div className="mb-3"><div className="flex justify-between text-[11px] text-muted-foreground font-bold mb-1"><span>Wear/Cond</span><span>{comp.wear}% / {comp.threshold}%</span></div><WearBar wear={comp.wear} threshold={comp.threshold} /></div><div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg mb-3"><span className="text-[10px] text-muted-foreground font-bold">Est. Life Remaining</span><span className={`text-[11px] font-bold ${cc.text}`}>{comp.remainingLife}</span></div><p className="text-[10px] text-foreground/70 italic bg-muted/30 p-2 rounded border border-border/30">{comp.recommendedAction}</p></div>); })}</div></div>)}
                    </div>
                  );
                })}
                {filtered.length === 0 && (<div className="py-20 text-center text-muted-foreground font-bold italic">Tidak ada armada yang sesuai kriteria.</div>)}
              </div>
              <div className="px-4 sm:px-5 py-3 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[10px] font-bold text-muted-foreground/50 bg-muted/20"><span>Menampilkan {filtered.length} dari {unitHealthData.length} unit</span><span>Data diperbarui: 03 Mar 2026, 08:30 WIB</span></div>
            </div>
        </div>
      </div>
    </div>
  );
}
