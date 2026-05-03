import React, { useState } from "react";
import {
  Users,
  ClipboardCheck,
  TrendingUp,
  BarChart3,
  Search,
  Download,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  Target,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Info,
  ShieldAlert,
} from "lucide-react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  ReferenceLine,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

// --- BRAND COLORS ---
const BRAND_NAVY = "#1E3A8A";
const BRAND_GREEN = "#10B981";
const BRAND_RED = "#EF4444";
const BRAND_YELLOW = "#F59E0B";

// --- DUMMY DATA ---

const workloadData = [
  { region: "Kalsel", workload: 500, capacity: 320 },
  { region: "Kaltim", workload: 450, capacity: 420 },
  { region: "Sumsel", workload: 380, capacity: 400 },
  { region: "Sumut", workload: 320, capacity: 450 },
  { region: "Papua", workload: 280, capacity: 200 },
  { region: "Sulawesi", workload: 220, capacity: 250 },
];

const siteCoverageData = [
  { site: "PT Thiess", coverage: 85, units: 850, total: 1000 },
  { site: "PT Adaro", coverage: 40, units: 200, total: 500 },
  { site: "PT KPC", coverage: 72, units: 576, total: 800 },
  { site: "PT Berau", coverage: 65, units: 390, total: 600 },
  { site: "PT Bukit Asam", coverage: 90, units: 450, total: 500 },
];

const hitRateData = [
  { region: "Kalsel", normal: 120, critical: 45, yield: 27 },
  { region: "Kaltim", normal: 150, critical: 30, yield: 16 },
  { region: "Sumsel", normal: 100, critical: 65, yield: 39 },
  { region: "Sumut", normal: 180, critical: 15, yield: 8 },
  { region: "Papua", normal: 80, critical: 40, yield: 33 },
  { region: "Sulawesi", normal: 90, critical: 25, yield: 21 },
];

const conversionData = [
  { duration: 4.2, rate: 85, name: "Andi" },
  { duration: 3.5, rate: 70, name: "Budi" },
  { duration: 5.1, rate: 92, name: "Cici" },
  { duration: 2.8, rate: 45, name: "Dedi" },
  { duration: 4.8, rate: 88, name: "Eka" },
  { duration: 3.9, rate: 75, name: "Fani" },
  { duration: 6.2, rate: 95, name: "Gani" },
  { duration: 2.5, rate: 30, name: "Hadi" },
  { duration: 5.8, rate: 55, name: "Indra" },
];

const inspectorsData = [
  {
    name: "Ahmad Subarjo",
    branch: "Banjarmasin",
    units: 42,
    rate: 2.1,
    achievement: 105,
    quality: 98,
    findings: 12,
    revenue: 450000000,
  },
  {
    name: "Bambang Heru",
    branch: "Balikpapan",
    units: 38,
    rate: 1.9,
    achievement: 95,
    quality: 92,
    findings: 8,
    revenue: 280000000,
  },
  {
    name: "Citra Lestari",
    branch: "Palembang",
    units: 45,
    rate: 2.3,
    achievement: 112,
    quality: 99,
    findings: 15,
    revenue: 620000000,
  },
  {
    name: "Dedi Kurniawan",
    branch: "Samarinda",
    units: 28,
    rate: 1.4,
    achievement: 70,
    quality: 85,
    findings: 4,
    revenue: 120000000,
  },
  {
    name: "Eko Prasetyo",
    branch: "Banjarmasin",
    units: 35,
    rate: 1.8,
    achievement: 88,
    quality: 94,
    findings: 9,
    revenue: 340000000,
  },
];

// --- COMPONENTS ---

const KPICard = ({ 
  title, 
  value, 
  trend, 
  icon: Icon, 
  progress 
}: { 
  title: string; 
  value: string; 
  trend?: { val: string; pos: boolean }; 
  icon: any; 
  progress?: number 
}) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#1E3A8A]/5 rounded-full group-hover:scale-110 transition-transform" />
    <div className="flex items-start justify-between relative z-10">
      <div>
        <div className="flex items-center gap-1.5">
          <h5 className="text-[10px] text-muted-foreground font-black tracking-widest uppercase">{title}</h5>
          <TooltipProvider>
            <ShadcnTooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-[#1E3A8A] transition-colors">
                  <Info className="w-3 h-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[200px]">
                Metrik operasional untuk {title.toLowerCase()}.
              </TooltipContent>
            </ShadcnTooltip>
          </TooltipProvider>
        </div>
        <p className="text-3xl text-[#1E3A8A] dark:text-foreground mt-1 font-extrabold tracking-tight">{value}</p>
      </div>
      <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-xl flex items-center justify-center text-[#1E3A8A]">
        <Icon className="w-5 h-5" />
      </div>
    </div>
    {trend && (
      <div className={`mt-4 flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-md w-fit ${trend.pos ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
        <ArrowUpRight className={`w-3.5 h-3.5 font-bold ${trend.pos ? '' : 'rotate-90'}`} />
        <span>{trend.val}</span>
      </div>
    )}
    {progress !== undefined && (
      <div className="mt-4 space-y-2 relative z-10">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase text-muted-foreground">
          <span>Target Coverage</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>
    )}
  </div>
);

export const InspectorProductivity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState(true);

  const filteredInspectors = inspectorsData.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 bg-background transition-colors duration-300">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E3A8A] dark:text-foreground flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-[#10B981]" />
            Inspector Productivity & Coverage
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-medium">
            Monitoring efisiensi tenaga kerja dan rasio cakupan inspeksi nasional
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0">
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1 shadow-sm">
            <Select defaultValue="q1-2026">
              <SelectTrigger className="w-[120px] h-8 text-xs font-bold border-none bg-transparent shadow-none focus:ring-0">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q1-2026">Q1 2026</SelectItem>
                <SelectItem value="q4-2025">Q4 2025</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-px h-4 bg-border"></div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px] h-8 text-xs font-bold border-none bg-transparent shadow-none focus:ring-0">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="kalimantan">Kalimantan</SelectItem>
                <SelectItem value="sumatera">Sumatera</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="h-10 gap-2 border-border text-muted-foreground hover:bg-accent hover:text-foreground transition-all shadow-sm">
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sync Data</span>
          </Button>
          <Button className="h-10 gap-2 bg-[#1E3A8A] dark:bg-brand-blue text-white rounded-lg text-xs font-bold shadow-md hover:opacity-90 transition-opacity">
            <Download className="h-3.5 w-3.5" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative items-start">
        <div className={`${isAiCopilotOpen ? 'lg:col-span-9' : 'lg:col-span-12'} space-y-6`}>
          {/* TIER 1: EXECUTIVE KPI CARDS */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${isAiCopilotOpen ? 'xl:grid-cols-4 lg:grid-cols-2' : 'lg:grid-cols-4'} gap-4`}>
            <KPICard 
              title="Total Inspections" 
              value="412 Units" 
              trend={{ val: "12% Up", pos: true }}
              icon={ClipboardCheck}
            />
            <KPICard 
              title="Productivity Rate" 
              value="2.1 U/Day" 
              trend={{ val: "Optimal", pos: true }}
              icon={TrendingUp}
            />
            <KPICard 
              title="Active Personnel" 
              value="45 Pax" 
              icon={Users}
            />
            <KPICard 
              title="National Coverage" 
              value="68%" 
              progress={68}
              icon={Target}
            />
          </div>

          {/* TIER 2: CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Manpower vs Workload Map */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 tracking-wide uppercase">Manpower vs Workload Map</h3>
                  <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">Kapasitas inspeksi vs populasi unit per wilayah</p>
                </div>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <ShadcnTooltip>
                      <TooltipTrigger asChild>
                        <button className="text-muted-foreground hover:text-[#1E3A8A] transition-colors">
                          <Info className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[240px]">
                        <p className="font-bold mb-1">Manpower vs Workload</p>
                        Membandingkan kapasitas inspeksi (garis hijau) dengan total populasi unit (batang navy) per wilayah untuk mendeteksi ketimpangan beban kerja.
                      </TooltipContent>
                    </ShadcnTooltip>
                  </TooltipProvider>
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={workloadData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis 
                      dataKey="region" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 700 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 700 }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '11px', fontWeight: 700, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: 700 }} />
                    <Bar 
                      name="Unit Population" 
                      dataKey="workload" 
                      fill={BRAND_NAVY} 
                      radius={[4, 4, 0, 0]} 
                      barSize={30}
                    />
                    <Line 
                      name="Capacity" 
                      type="monotone" 
                      dataKey="capacity" 
                      stroke="#10B981" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Coverage by Customer Site */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 tracking-wide uppercase">Coverage by Customer Site</h3>
                  <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">% Unit terinspeksi vs total populasi site</p>
                </div>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <ShadcnTooltip>
                      <TooltipTrigger asChild>
                        <button className="text-muted-foreground hover:text-[#1E3A8A] transition-colors">
                          <Info className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[240px]">
                        <p className="font-bold mb-1">Coverage by Site</p>
                        Persentase unit yang berhasil terinspeksi dibandingkan dengan total populasi unit di setiap site pelanggan. Warna hijau menunjukkan cakupan di atas 80%.
                      </TooltipContent>
                    </ShadcnTooltip>
                  </TooltipProvider>
                  <Target className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={siteCoverageData} margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="site" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 700 }}
                    />
                    <Tooltip 
                       contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}
                    />
                    <Bar dataKey="coverage" fill={BRAND_NAVY} radius={[0, 4, 4, 0]} barSize={20}>
                      {siteCoverageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.coverage > 80 ? BRAND_GREEN : BRAND_NAVY} />
                      ))}
                      <Tooltip 
                        formatter={(value, name, props) => [`${value}% (${props.payload.units}/${props.payload.total} Units)`, "Coverage"]}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR: AI COPILOT */}
        {isAiCopilotOpen ? (
          <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-6 self-start animate-in slide-in-from-right-8 duration-300">
            <div className="bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl p-5 shadow-lg relative overflow-hidden border border-white/20 flex flex-col gap-4">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 animate-pulse pointer-events-none"></div>
              <div className="flex items-start justify-between relative z-10 mb-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/30 backdrop-blur-md rounded-lg flex items-center justify-center shadow-inner shrink-0">
                      <Sparkles className="w-4 h-4 text-teal-900" />
                    </div>
                    <h3 className="text-teal-950 font-black tracking-tight leading-tight uppercase text-sm">AI Workforce Copilot</h3>
                  </div>
                  <div className="flex items-center gap-1.5 ml-10">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-black animate-pulse"></span>
                    <span className="text-[10px] font-bold text-black uppercase tracking-wider bg-black/10 px-2 py-0.5 rounded-full">Active Thinking</span>
                  </div>
                </div>
                <button onClick={() => setIsAiCopilotOpen(false)} className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-teal-950 transition-colors shrink-0">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-4 relative z-10">
                <div className="bg-white/90 backdrop-blur-xl rounded-xl p-4 border border-white/60 flex flex-col justify-between group hover:bg-white transition-all shadow-sm">
                  <div className="flex items-center justify-between mb-2 text-teal-900">
                    <h4 className="text-[10px] font-black tracking-tight uppercase">Coverage Alert</h4>
                    <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded font-black">CRITICAL</span>
                  </div>
                  <p className="text-[11px] text-teal-950/90 leading-relaxed font-bold mb-3">
                    Kalsel memiliki populasi <span className="underline decoration-red-500 decoration-2">500 unit aktif</span> namun hanya di-cover oleh 8 inspektur.
                  </p>
                  <Button size="sm" className="text-[10px] font-black text-white bg-teal-900 hover:bg-black transition-all h-8 w-full flex items-center justify-center gap-1.5 shadow-lg">
                    <RotateCcw className="w-3 h-3" /> Rebalance Workforce
                  </Button>
                </div>

                <div className="bg-white/90 backdrop-blur-xl rounded-xl p-4 border border-white/60 flex flex-col justify-between group hover:bg-white transition-all shadow-sm">
                  <div className="flex items-center justify-between mb-2 text-teal-900">
                    <h4 className="text-[10px] font-black tracking-tight uppercase">Resource Allocation</h4>
                    <span className="text-[9px] bg-[#1E3A8A] text-white px-1.5 py-0.5 rounded font-black">OPTIMIZATION</span>
                  </div>
                  <p className="text-[11px] text-teal-950/90 leading-relaxed font-bold mb-3">
                    AI mengalokasikan <span className="font-black underline text-[#10B981]">12% lebih banyak resources</span> ke area dengan backlog kritis.
                  </p>
                  <Button variant="outline" size="sm" className="text-[10px] font-black text-teal-900 bg-white/50 hover:bg-white transition-all h-8 w-full flex items-center justify-center gap-1.5 border-teal-200">
                    <RotateCcw className="w-3 h-3" /> Optimasi Manpower
                  </Button>
                </div>

                <div className="bg-white/90 backdrop-blur-xl rounded-xl p-4 border border-white/60 flex flex-col justify-between group hover:bg-white transition-all shadow-sm">
                  <div className="flex items-center justify-between mb-2 text-teal-900">
                    <h4 className="text-[10px] font-black tracking-tight uppercase">Quality Insight</h4>
                    <span className="text-[9px] bg-teal-700 text-white px-1.5 py-0.5 rounded font-black">ACHIEVEMENT</span>
                  </div>
                  <p className="text-[11px] text-teal-950/90 leading-relaxed font-bold mb-3">
                    Efisiensi Andi (Kalsel) <span className="font-black underline text-teal-700">95%</span> lebih tinggi dari rata-rata nasional.
                  </p>
                  <Button variant="outline" size="sm" className="text-[10px] font-black text-teal-900 bg-white/50 hover:bg-white transition-all h-8 w-full flex items-center justify-center gap-1.5 border-teal-200">
                    <ArrowUpRight className="w-3 h-3" /> Lihat Profil
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed bottom-6 right-6 z-50">
            <button onClick={() => setIsAiCopilotOpen(true)} className="bg-gradient-to-r from-emerald-400 to-teal-400 text-teal-900 p-3 rounded-full shadow-xl hover:scale-110 transition-all flex items-center justify-center border border-white/40 group">
              <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
            </button>
          </div>
        )}

        {/* TIER 3: LEADERBOARD & ADDITIONAL CHARTS */}
        <div className="lg:col-span-12 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quality to PO Conversion */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 tracking-wide uppercase">Quality to PO Conversion</h3>
                  <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">Avg Duration vs PO Rate %</p>
                </div>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <ShadcnTooltip>
                      <TooltipTrigger asChild>
                        <button className="text-muted-foreground hover:text-[#1E3A8A] transition-colors">
                          <Info className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[240px]">
                        <p className="font-bold mb-1">Quality to PO Conversion</p>
                        Menganalisis korelasi antara durasi inspeksi (sumbu X) dengan tingkat keberhasilan konversi menjadi PO (sumbu Y). Titik hijau menunjukkan konversi tinggi (&gt;80%).
                      </TooltipContent>
                    </ShadcnTooltip>
                  </TooltipProvider>
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis 
                      type="number" 
                      dataKey="duration" 
                      name="Duration" 
                      unit="hr" 
                      domain={[0, 8]}
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700 }}
                      label={{ value: 'Avg Hours / Unit', position: 'insideBottom', offset: -10, fontSize: 10, fontWeight: 700 }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="rate" 
                      name="PO Rate" 
                      unit="%" 
                      domain={[0, 100]}
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700 }}
                      label={{ value: 'PO Conversion %', angle: -90, position: 'insideLeft', fontSize: 10, fontWeight: 700 }}
                    />
                    <ZAxis type="category" dataKey="name" name="Inspector" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '12px', fontSize: '11px', fontWeight: 700 }} />
                    
                    {/* Quadrant Analysis Crosshairs */}
                    <ReferenceLine x={4.0} stroke="#9CA3AF" strokeDasharray="3 3" label={{ value: 'Avg Duration', position: 'insideTopRight', fontSize: 9, fill: '#9CA3AF', fontWeight: 700 }} />
                    <ReferenceLine y={50} stroke="#9CA3AF" strokeDasharray="3 3" label={{ value: 'Target Rate', position: 'insideRight', fontSize: 9, fill: '#9CA3AF', fontWeight: 700 }} />
                    
                    <Scatter name="Inspectors" data={conversionData} fill={BRAND_NAVY}>
                      {conversionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.rate > 80 ? BRAND_GREEN : BRAND_NAVY} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Inspection Hit Rate (Yield) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 tracking-wide uppercase">Inspection Hit Rate (Yield)</h3>
                  <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">Rasio temuan backlog kritis vs total inspeksi per wilayah</p>
                </div>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <ShadcnTooltip>
                      <TooltipTrigger asChild>
                        <button className="text-muted-foreground hover:text-[#1E3A8A] transition-colors">
                          <Info className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[240px]">
                        <p className="font-bold mb-1">Inspection Hit Rate (Yield)</p>
                        Menampilkan distribusi temuan backlog kritis (merah) dibandingkan temuan normal (hijau) per wilayah untuk mengukur efektivitas deteksi kerusakan.
                      </TooltipContent>
                    </ShadcnTooltip>
                  </TooltipProvider>
                  <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={hitRateData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis 
                      dataKey="region" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 700 }}
                    />
                    <YAxis 
                      yAxisId="left"
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 700 }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: BRAND_YELLOW, fontSize: 11, fontWeight: 700 }}
                      unit="%"
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }} />
                    <Bar yAxisId="left" name="Normal Findings" dataKey="normal" stackId="a" fill={BRAND_GREEN} radius={[0, 0, 0, 0]} />
                    <Bar yAxisId="left" name="Critical Findings" dataKey="critical" stackId="a" fill={BRAND_RED} radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" name="Yield Rate" type="monotone" dataKey="yield" stroke={BRAND_YELLOW} strokeWidth={3} dot={{ r: 4, fill: BRAND_YELLOW }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* LEADERBOARD TABLE */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-lg">
            <div className="px-6 py-5 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gray-50/50">
              <div>
                <h3 className="text-sm font-bold text-gray-800 tracking-wide uppercase">Inspector Leaderboard</h3>
                <p className="text-[11px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">Performa inspektur berdasarkan output dan kualitas data</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search Inspector..." 
                    className="pl-10 pr-4 py-2 text-xs border-gray-200 rounded-xl bg-white w-full sm:w-64 focus:ring-2 focus:ring-[#10B981]/30"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" className="rounded-xl border-gray-200">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="px-6 py-4 font-black text-primary uppercase text-[10px] tracking-widest">Inspector Name</TableHead>
                    <TableHead className="px-6 py-4 font-black text-primary uppercase text-[10px] tracking-widest">Branch</TableHead>
                    <TableHead className="px-6 py-4 font-black text-primary uppercase text-[10px] tracking-widest text-right">Units (MTD)</TableHead>
                    <TableHead className="px-6 py-4 font-black text-primary uppercase text-[10px] tracking-widest text-right">Critical Findings</TableHead>
                    <TableHead className="px-6 py-4 font-black text-primary uppercase text-[10px] tracking-widest text-right">Est. Revenue</TableHead>
                    <TableHead className="px-6 py-4 font-black text-primary uppercase text-[10px] tracking-widest text-center">Achievement</TableHead>
                    <TableHead className="px-6 py-4 font-black text-primary uppercase text-[10px] tracking-widest text-center">Quality</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInspectors.map((inspector, idx) => (
                    <TableRow key={idx} className="hover:bg-gray-50/80 transition-colors group cursor-pointer border-b border-gray-50 last:border-0">
                      <TableCell className="px-6 py-4 font-bold text-primary">{inspector.name}</TableCell>
                      <TableCell className="px-6 py-4 text-muted-foreground font-medium">{inspector.branch}</TableCell>
                      <TableCell className="px-6 py-4 text-right font-black">{inspector.units}</TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 font-bold">
                          {inspector.findings} Issues
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right font-mono text-brand-blue font-bold">
                        Rp {(inspector.revenue / 1000000).toFixed(0)}jt
                      </TableCell>
                      <TableCell className="px-6 py-4 text-center">
                        <Badge 
                          className={`font-black rounded-lg ${
                            inspector.achievement >= 100 
                              ? 'bg-green-500/10 text-green-600 border-green-500/20' 
                              : inspector.achievement < 80 
                              ? 'bg-red-500/10 text-red-600 border-red-500/20'
                              : 'bg-brand-blue/10 text-brand-blue border-brand-blue/20'
                          }`}
                          variant="outline"
                        >
                          {inspector.achievement}%
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#10B981]" 
                              style={{ width: `${inspector.quality}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-black text-muted-foreground">{inspector.quality}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-center">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-[#10B981]/10 hover:text-[#10B981]">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectorProductivity;
