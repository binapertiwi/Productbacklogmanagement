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
    text: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    badge: "bg-destructive/15 text-destructive font-bold",
    bar: "bg-destructive",
    dot: "bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.5)]",
  },
  Caution: {
    text: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    badge: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 font-bold",
    bar: "bg-yellow-400",
    dot: "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]",
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

const poStatusStyle: Record<string, string> = {
  "PO Issued": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold",
  "Partial PO": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 font-bold",
  "No PO": "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold",
};

function HealthGauge({ score, label }: { score: number; label: string }) {
  const color = label === "Critical" ? "#ef4444" : label === "Caution" ? "#eab308" : "#23a34e";
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
        data={[{ value: 100, fill: "var(--border)" }, ...data]}
        barSize={12}
      >
        <RadialBar dataKey="value" cornerRadius={8} background={false} />
        <Tooltip formatter={(v) => [`${v}%`, "Health Score"]} contentStyle={{ fontSize: 11, backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }} />
      </RadialBarChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>{score}</span>
        <span className="text-xs text-muted-foreground/70 font-medium">/ 100</span>
      </div>
    </div>
  );
}

function WearBar({ wear, threshold }: { wear: number; threshold: number }) {
  const color =
    wear >= threshold ? "bg-red-500" : wear >= threshold * 0.9 ? "bg-yellow-400" : "bg-green-500";
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden relative">
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-muted-foreground/50 z-10"
          style={{ left: `${threshold}%` }}
        />
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${Math.min(wear, 100)}%` }}
        />
      </div>
      <span className={`text-[10px] w-8 text-right flex-shrink-0 font-bold ${wear >= threshold ? "text-red-600" : "text-muted-foreground"}`}>
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
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 bg-background min-h-screen transition-colors duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary dark:text-foreground">Fleet Health & Procurement Portal</h1>
          <p className="text-sm text-muted-foreground">Monitoring kesehatan unit dan backlog perbaikan secara transparan</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPO}
            className="flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-lg text-sm hover:bg-brand-green/90 transition-colors shadow-md shadow-brand-green/20 self-start sm:self-auto font-bold"
          >
            <Download className="w-4 h-4" />
            Export PO Recommendation
          </button>
        </div>
      </div>

      {/* ── FLEET HEALTH SUMMARY ─────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Health Score Card */}
        <div className="sm:col-span-1 bg-card rounded-xl border border-border p-4 sm:p-5 shadow-sm flex flex-col items-center justify-center transition-all hover:shadow-md">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 text-center font-bold">Overall Fleet Health Score</p>
          <HealthGauge score={s.overallScore} label={s.scoreLabel} />
          <div className={`mt-2 flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${s.scoreLabel === "Good"
            ? "bg-brand-green/10 text-brand-green"
            : s.scoreLabel === "Caution"
              ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
              : "bg-destructive/10 text-destructive"
            }`}>
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.scoreLabel === "Good" ? "bg-brand-green" : s.scoreLabel === "Caution" ? "bg-yellow-400" : "bg-destructive"
              }`}></span>
            {s.scoreLabel}
          </div>
          <p className="text-xs text-muted-foreground/50 mt-2 text-center text-balance">
            Kondisi rata-rata semua komponen
          </p>
        </div>

        {/* Urgency Matrix */}
        <div className="sm:col-span-1 lg:col-span-1 bg-card rounded-xl border border-border p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-4 h-4 text-primary dark:text-foreground" />
            <h3 className="text-primary dark:text-foreground font-bold">Urgency Matrix</h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between p-2 bg-destructive/5 rounded-lg border border-destructive/10">
              <div className="flex items-center gap-2">
                 <XCircle className="w-4 h-4 text-destructive" />
                 <span className="text-xs text-destructive font-bold">Critical</span>
              </div>
              <span className="text-lg font-bold text-destructive">{s.critical}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
              <div className="flex items-center gap-2">
                 <AlertTriangle className="w-4 h-4 text-yellow-500" />
                 <span className="text-xs text-yellow-600 dark:text-yellow-400 font-bold">Caution</span>
              </div>
              <span className="text-lg font-bold text-yellow-500">{s.caution}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-brand-green/5 rounded-lg border border-brand-green/10">
              <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-brand-green" />
                 <span className="text-xs text-brand-green font-bold">Good</span>
              </div>
              <span className="text-lg font-bold text-brand-green">{s.good}</span>
            </div>
          </div>
        </div>

        {/* Top Units At Risk */}
        <div className="sm:col-span-2 lg:col-span-2 bg-card rounded-xl border border-border p-4 sm:p-5 shadow-sm border-l-4 border-l-destructive transition-all hover:shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <h3 className="text-primary dark:text-foreground font-bold">Top Units at Risk of Breakdown</h3>
          </div>
          <div className="space-y-2">
             {topUnitsAtRisk.map((unit, idx) => (
               <div key={idx} className="flex justify-between items-center bg-muted rounded p-2 text-xs transition-colors hover:bg-muted/80">
                 <div>
                   <span className="font-bold text-primary dark:text-brand-blue">{unit.unitId}</span> <span className="text-muted-foreground font-medium">({unit.site})</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="text-destructive bg-destructive/10 px-2 py-0.5 rounded font-bold">
                      Fatal: {unit.fatalCommodity}
                    </span>
                    <span className="text-foreground/70 font-medium">
                      Est. {unit.daysToBreakdown} hari
                    </span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* ── AI FLEET RELIABILITY ADVISOR ─────────────────── */}
      <div className="bg-gradient-to-r from-[#43E97B] to-[#38F9D7] p-4 sm:p-5 rounded-xl text-teal-950 shadow-md relative overflow-hidden mt-2 border border-teal-100/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-card/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <Sparkles className="w-5 h-5 text-teal-900" />
          <h3 className="font-bold text-teal-950 tracking-wide">AI Fleet Reliability Advisor</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          <div className="bg-card/60 rounded-lg p-3.5 border border-white/50 flex flex-col justify-between backdrop-blur-sm">
            <div>
              <h4 className="text-xs font-semibold text-teal-900 mb-2 uppercase tracking-wide flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Insight Keandalan</h4>
              <p className="text-xs text-teal-950/80 leading-relaxed mb-3 text-balance">Unit <span className="font-bold text-red-600">PC800-8-61823</span> memiliki probabilitas 85% untuk gagal pada komponen FCG dalam 7-10 hari.</p>
            </div>
            <button className="text-[11px] font-bold text-white bg-teal-700 hover:bg-teal-800 transition-colors py-1.5 px-3 rounded shadow-sm self-start">Prioritaskan di PO Export</button>
          </div>
          <div className="bg-card/60 rounded-lg p-3.5 border border-white/50 flex flex-col justify-between backdrop-blur-sm">
            <div>
              <h4 className="text-xs font-semibold text-teal-900 mb-2 uppercase tracking-wide flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Efisiensi Downtime</h4>
              <p className="text-xs text-teal-950/80 leading-relaxed mb-3 text-balance">Unit <span className="font-bold">D375A-6-50234</span> membutuhkan GET (Critical) & BAT (Caution). Gabungkan minggu ini hemat 12 jam.</p>
            </div>
            <button className="text-[11px] font-bold text-teal-800 bg-card/80 hover:bg-card transition-colors py-1.5 px-3 rounded border border-teal-200 self-start">Gabungkan Kebutuhan Part</button>
          </div>
          <div className="bg-card/60 rounded-lg p-3.5 border border-white/50 flex flex-col justify-between backdrop-blur-sm">
            <div>
              <h4 className="text-xs font-semibold text-teal-900 mb-2 uppercase tracking-wide flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Budget Forecast</h4>
              <p className="text-xs text-teal-950/80 leading-relaxed mb-3 text-balance">Estimasi anggaran pemeliharaan Q2 2026 adalah sekitar <span className="font-bold text-sm">Rp 1.2 Miliar</span> berdasarkan tren armada saat ini.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Notice Banner */}
      <div className="bg-gradient-to-r from-brand-navy to-brand-blue rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white shadow-md border border-white/10">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm"><FileText className="w-5 h-5 text-brand-green" /></div>
          <div>
            <p className="text-sm font-bold">Grouped Export PO Recommendation</p>
            <p className="text-xs text-blue-100/80 mt-0.5">Konversi otomatis list backlog menjadi draf PO Excel/PDF yang terpisah per komoditi.</p>
          </div>
        </div>
        <button onClick={handleExportPO} className="flex items-center gap-2 px-4 py-2.5 bg-brand-green text-white rounded-lg text-sm hover:bg-brand-green/90 transition-all font-bold shadow-lg shadow-brand-green/20">
           <Download className="w-4 h-4" /> Export Multi-Sheet
        </button>
      </div>

      {/* ── TECHNICAL DETAILS PER UNIT ───────────────────── */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden transition-colors">
        <div className="px-4 sm:px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-muted/30">
          <div>
            <h3 className="text-primary dark:text-foreground font-bold font-heading">Technical Details per Unit</h3>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">Identifikasi kesehatan unit secara holistik (Multi-Commodity)</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative">
              <Filter className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select className="pl-8 pr-8 py-1.5 text-[11px] border border-border rounded-lg bg-background focus:outline-none focus:ring-1 focus:ring-primary/30 appearance-none cursor-pointer w-full text-foreground font-bold" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>All Status</option><option>Critical</option><option>Caution</option><option>Good</option>
              </select>
              <ChevronDown className="w-3 h-3 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative">
              <Layers className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select className="pl-8 pr-8 py-1.5 text-[11px] border border-border rounded-lg bg-background focus:outline-none focus:ring-1 focus:ring-primary/30 appearance-none cursor-pointer w-full text-foreground font-bold" value={commodityFilter} onChange={(e) => setCommodityFilter(e.target.value)}>
                <option>All Commodity</option><option>BAT</option><option>GET</option><option>TYR</option><option>FCG</option><option>Autofire</option><option>Autolube</option><option>U/C</option>
              </select>
              <ChevronDown className="w-3 h-3 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Cari unit..." className="pl-9 pr-4 py-1.5 text-[11px] border border-border rounded-lg bg-background focus:outline-none focus:ring-1 focus:ring-primary/30 w-full sm:w-44 text-foreground font-medium" value={search} onChange={handleSearchChange} />
            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {filtered.map((unit) => {
            const isOpen = expandedUnit === unit.serialNumber;
            const hc = healthColor[unit.overallHealth as keyof typeof healthColor] || healthColor["N/A"];
            return (
              <div key={unit.serialNumber} className="group">
                <div className={`px-4 sm:px-5 py-4 cursor-pointer hover:bg-muted/50 transition-all ${isOpen ? "bg-muted/50" : ""}`} onClick={() => setExpandedUnit(isOpen ? null : unit.serialNumber)}>
                  <div className="flex items-start gap-4">
                    <div className={`w-1.5 h-12 rounded-full flex-shrink-0 ${hc.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-lg font-bold text-primary dark:text-foreground flex items-center gap-3">
                             {unit.serialNumber}
                             <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${hc.badge}`}>{unit.overallHealth}</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-0.5 font-medium">{unit.model} — {unit.site}</div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                           <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {new Date(unit.lastInspection).toLocaleDateString("id-ID")}</span>
                           <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5"/> {unit.hoursOperated.toLocaleString()} H</span>
                           {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 flex-wrap">
                        {Object.entries(unit.commodityStatus).map(([comm, status]) => (
                          <div key={comm} className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-bold ${(healthColor[status as keyof typeof healthColor] || healthColor["N/A"]).bg} ${(healthColor[status as keyof typeof healthColor] || healthColor["N/A"]).border} ${(healthColor[status as keyof typeof healthColor] || healthColor["N/A"]).text}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${(healthColor[status as keyof typeof healthColor] || healthColor["N/A"]).dot}`} /> {comm}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {isOpen && (
                  <div className="px-4 sm:px-14 py-6 bg-muted/20 border-y border-border/50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {unit.components.map((comp, cIdx) => {
                        const cc = healthColor[comp.status as keyof typeof healthColor] || healthColor["N/A"];
                        return (
                          <div key={cIdx} className="bg-card border border-border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-sm font-bold text-primary dark:text-foreground">{comp.name}</h4>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${cc.badge}`}>{comp.status}</span>
                            </div>
                            <div className="mb-3">
                              <div className="flex justify-between text-[11px] text-muted-foreground font-bold mb-1">
                                <span>Wear/Cond</span><span>{comp.wear}% / {comp.threshold}%</span>
                              </div>
                              <WearBar wear={comp.wear} threshold={comp.threshold} />
                            </div>
                            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg mb-3">
                              <span className="text-[10px] text-muted-foreground font-bold">Est. Life Remaining</span>
                              <span className={`text-[11px] font-bold ${cc.text}`}>{comp.remainingLife}</span>
                            </div>
                            <p className="text-[10px] text-foreground/70 italic bg-muted/30 p-2 rounded border border-border/30">{comp.recommendedAction}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button onClick={handleExportPO} className="flex items-center gap-2 px-4 py-2 bg-brand-navy dark:bg-brand-blue text-white rounded-lg text-xs font-bold shadow-md hover:opacity-90 transition-opacity">
                        <FileText className="w-3.5 h-3.5" /> Export Maintenance Proposal — {unit.serialNumber}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground font-bold italic">Tidak ada armada yang sesuai kriteria.</div>
          )}
        </div>
        <div className="px-4 sm:px-5 py-3 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[10px] font-bold text-muted-foreground/50 bg-muted/20">
          <span>Menampilkan {filtered.length} dari {unitHealthData.length} unit — via Aplikasi MMA</span>
          <span>Data diperbarui: 03 Mar 2026, 08:30 WIB</span>
        </div>
      </div>
    </div>
  );
}
