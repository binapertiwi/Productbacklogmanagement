import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { generatePerformanceData, CommodityType } from '../data/performanceMockData';
import { ChevronDown, Filter, Database, TrendingUp, BarChart3, Activity, Table, Info } from 'lucide-react';
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Props {
  commodity: CommodityType;
}

export function CommodityPerformanceDashboard({ commodity }: Props) {
  const data = useMemo(() => generatePerformanceData(commodity), [commodity]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Filters Section */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm flex flex-wrap gap-4 items-end backdrop-blur-sm bg-card/80 sticky top-0 z-20">
        <div className="flex items-center gap-2 mb-1 mr-4">
           <Filter className="w-4 h-4 text-brand-green" />
           <span className="text-sm font-black text-primary dark:text-foreground uppercase tracking-tight">Active Filters</span>
        </div>
        
        {(commodity === 'TYR' || commodity === 'GET' || commodity === 'U/C') && (
          <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
            <label className="text-[10px] text-muted-foreground font-black uppercase tracking-widest px-1">Brand</label>
            <div className="relative">
               <select className="w-full border border-border rounded-xl px-4 py-2 text-xs font-bold bg-background focus:outline-none focus:ring-2 focus:ring-brand-green/30 appearance-none cursor-pointer text-foreground">
                 <option>All Brands</option>
               </select>
               <ChevronDown className="w-3 h-3 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}
        
        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
          <label className="text-[10px] text-muted-foreground font-black uppercase tracking-widest px-1">Customer</label>
          <div className="relative">
             <select className="w-full border border-border rounded-xl px-4 py-2 text-xs font-bold bg-background focus:outline-none focus:ring-2 focus:ring-brand-green/30 appearance-none cursor-pointer text-foreground">
               <option>All Customers</option>
             </select>
             <ChevronDown className="w-3 h-3 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
          <label className="text-[10px] text-muted-foreground font-black uppercase tracking-widest px-1">Period</label>
          <div className="relative">
             <select className="w-full border border-border rounded-xl px-4 py-2 text-xs font-bold bg-background focus:outline-none focus:ring-2 focus:ring-brand-green/30 appearance-none cursor-pointer text-foreground">
               <option>Last 12 Months</option>
               <option>Current Year</option>
               <option>Q1 2026</option>
             </select>
             <ChevronDown className="w-3 h-3 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        
        <button className="px-5 py-2.5 bg-brand-navy dark:bg-brand-blue text-white rounded-xl text-xs font-black shadow-lg shadow-brand-navy/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
          APPLY
        </button>
      </div>

      {/* Population & Coverage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Population Section */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-black text-primary dark:text-foreground uppercase tracking-widest">Population Details: {commodity}</h3>
             </div>
             <TooltipUI>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground hover:text-primary transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[220px]">
                  Rincian populasi unit berdasarkan status kontrak (Contract vs Non-Contract) dan distribusi per cabang (Branch).
                </TooltipContent>
             </TooltipUI>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data.populationData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4}>
                        {data.populationData.map((e, i) => <Cell key={i} fill={e.color === '#1a2b4a' ? 'var(--primary)' : e.color} />)}
                        </Pie>
                        <Tooltip contentStyle={{ fontSize: 11, fontWeight: 700, borderRadius: 12, backgroundColor: "var(--card)", border: "1px solid var(--border)" }}  cursor={{ fill: "transparent" }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700 }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
             <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data.branchData} dataKey="value" cx="50%" cy="50%" innerRadius={0} outerRadius={80}>
                        {data.branchData.map((e, i) => <Cell key={i} fill={data.BRANCH_COLORS[i % data.BRANCH_COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ fontSize: 11, fontWeight: 700, borderRadius: 12, backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700 }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Coverage Section */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-green" />
                <h3 className="text-sm font-black text-primary dark:text-foreground uppercase tracking-widest">Backlog Coverage Analytic</h3>
             </div>
             <TooltipUI>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground hover:text-brand-green transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[220px]">
                  Analisis pemenuhan backlog (Achieved vs Not Achieved) dan tingkat cakupan per cabang operasional.
                </TooltipContent>
             </TooltipUI>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data.backlogCoveragePie} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} cornerRadius={4}>
                        {data.backlogCoveragePie.map((e, i) => <Cell key={i} fill={e.color === '#1a2b4a' ? 'var(--primary)' : e.color} />)}
                        </Pie>
                        <Tooltip contentStyle={{ fontSize: 11, fontWeight: 700, borderRadius: 12, backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700 }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.backlogBranchData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: "var(--muted-foreground)" }} />
                        <Tooltip contentStyle={{ fontSize: 11, fontWeight: 700, borderRadius: 12, backgroundColor: "var(--card)", border: "1px solid var(--border)" }} cursor={{ fill: "var(--muted)", opacity: 0.1 }} />
                        <Bar dataKey="coverage" radius={[4, 4, 0, 0]} barSize={25}>
                          {data.backlogBranchData.map((e, i) => <Cell key={i} fill={data.BRANCH_COLORS[i % data.BRANCH_COLORS.length]} />)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Lifetime & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-black text-primary dark:text-foreground uppercase tracking-widest">Lifetime Distribution</h3>
             </div>
             <TooltipUI>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground hover:text-primary transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[220px]">
                  Distribusi masa pakai komponen (Min, Avg, Max Life) berdasarkan histori pemakaian di berbagai site.
                </TooltipContent>
             </TooltipUI>
          </div>
           <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.lifetimeData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "var(--muted-foreground)" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "var(--muted-foreground)" }} />
                    <Tooltip contentStyle={{ fontSize: 11, fontWeight: 700, borderRadius: 12, backgroundColor: "var(--card)", border: "1px solid var(--border)" }} cursor={{ fill: "var(--muted)", opacity: 0.1 }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 9, fontWeight: 700, paddingTop: 15 }} />
                    <Bar dataKey="min" fill="var(--chart-1)" name="Min Life" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="avg" fill="var(--chart-2)" name="Avg Life" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="max" fill="var(--brand-blue)" name="Max Life" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all">
           <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2">
               <TrendingUp className="w-4 h-4 text-brand-green" />
               <h3 className="text-sm font-black text-primary dark:text-foreground uppercase tracking-widest">{commodity === 'GET' ? 'WEARNESS TREND' : 'COST PER HOUR TREND'}</h3>
             </div>
             <TooltipUI>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground hover:text-brand-green transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[220px]">
                  {commodity === 'GET' ? 'Tren tingkat keausan material GET berdasarkan ukuran dan durasi pemakaian.' : 'Analisis biaya operasional per jam (Cost per Hour) untuk memantau efisiensi penggunaan komponen.'}
                </TooltipContent>
             </TooltipUI>
          </div>
           <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                {commodity === 'GET' ? (
                    <LineChart data={data.costPerHour}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                      <XAxis dataKey="size" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "var(--muted-foreground)" }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "var(--muted-foreground)" }} />
                      <Tooltip contentStyle={{ fontSize: 11, fontWeight: 700, borderRadius: 12, backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                      <Line type="monotone" dataKey="cost" stroke="var(--primary)" strokeWidth={3} dot={{ stroke: 'var(--primary)', strokeWidth: 2, r: 4, fill: 'var(--card)' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                    </LineChart>
                ) : (
                    <BarChart data={data.costPerHour}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                      <XAxis dataKey="size" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "var(--muted-foreground)" }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "var(--muted-foreground)" }} />
                      <Tooltip contentStyle={{ fontSize: 11, fontWeight: 700, borderRadius: 12, backgroundColor: "var(--card)", border: "1px solid var(--border)" }} cursor={{ fill: "var(--muted)", opacity: 0.1 }} />
                      <Bar dataKey="cost" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                )}
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Tables Section */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all">
                <div className="bg-brand-navy dark:bg-brand-blue text-white text-[10px] font-black px-6 py-3 uppercase tracking-widest flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <Table className="w-3.5 h-3.5" /> Plan Replacement Forecast
                   </div>
                   <TooltipUI>
                    <TooltipTrigger asChild>
                      <button className="text-white/70 hover:text-white transition-colors">
                        <Info className="w-3 h-3" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[220px] bg-card text-foreground border-border shadow-xl">
                      Prediksi jadwal penggantian komponen per bulan untuk setiap pelanggan berdasarkan sisa lifetime unit.
                    </TooltipContent>
                   </TooltipUI>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-[10px] text-center border-separate border-spacing-0">
                        <thead className="bg-muted/50 text-muted-foreground uppercase font-black tracking-tighter">
                            <tr>
                                <th className="px-3 py-3 border-b border-r border-border sticky left-0 z-10 bg-muted/80 backdrop-blur-sm">Client</th>
                                <th className="px-3 py-3 border-b border-border">P/N</th>
                                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                                    <th key={m} className="px-2 py-3 border-b border-border">{m}</th>
                                ))}
                                <th className="px-3 py-3 border-b border-border font-black text-brand-green">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50 text-foreground">
                            {data.planTable.map((r) => (
                                <tr key={`${r.customer}-${r.pn}`} className="hover:bg-muted/30 transition-colors group text-[9px] font-bold">
                                    <td className="px-3 py-3 border-r border-border font-black text-primary dark:text-foreground sticky left-0 z-10 bg-card group-hover:bg-muted/30">{r.customer}</td>
                                    <td className="px-3 py-3 font-black opacity-70">{r.pn}</td>
                                    <td className="px-2 py-3 bg-muted/5">{r.jan}</td>
                                    <td className="px-2 py-3">{r.feb}</td>
                                    <td className="px-2 py-3 bg-muted/5 font-black text-brand-green/80">{r.mar}</td>
                                    <td className="px-2 py-3">{r.apr}</td>
                                    <td className="px-2 py-3 bg-muted/5">{r.may}</td>
                                    <td className="px-2 py-3">{r.jun}</td>
                                    <td className="px-2 py-3 bg-muted/5">{r.jul}</td>
                                    <td className="px-2 py-3">{r.aug}</td>
                                    <td className="px-2 py-3 bg-muted/5">{r.sep}</td>
                                    <td className="px-2 py-3">{r.oct}</td>
                                    <td className="px-2 py-3 bg-muted/5">{r.nov}</td>
                                    <td className="px-2 py-3">{r.dec}</td>
                                    <td className="px-3 py-3 font-black text-brand-green bg-brand-green/5">{r.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all">
                 <div className="bg-accent text-accent-foreground text-[10px] font-black px-6 py-3 uppercase tracking-widest flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5" /> Financial Efficiency Analysis
                    </div>
                    <TooltipUI>
                      <TooltipTrigger asChild>
                        <button className="text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                          <Info className="w-3 h-3" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[220px] bg-card text-foreground border-border shadow-xl">
                        Analisis efisiensi biaya per part number berdasarkan perbandingan harga pasar dan rata-rata lifetime komponen.
                      </TooltipContent>
                    </TooltipUI>
                 </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-center border-separate border-spacing-0">
                        <thead className="bg-accent/10 text-accent dark:text-accent-foreground text-[10px] font-black uppercase tracking-widest">
                            <tr>
                                <th className="px-4 py-4 border-b border-border">Part Number</th>
                                <th className="px-4 py-4 border-b border-border">Avg Life</th>
                                <th className="px-4 py-4 border-b border-border">Market Price</th>
                                <th className="px-4 py-4 border-b border-border text-primary font-black">Cost / Hour</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {data.costTable.map((r) => (
                                <tr key={r.pn} className="hover:bg-muted/30 transition-colors text-[11px] font-bold text-foreground">
                                    <td className="px-4 py-4 font-black text-primary dark:text-foreground">{r.pn}</td>
                                    <td className="px-4 py-4">{r.avg} H</td>
                                    <td className="px-4 py-4 opacity-70">Rp {r.price}</td>
                                    <td className="px-4 py-4 font-black text-brand-green bg-brand-green/5">Rp {r.costPerHour}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 mt-auto border-t border-border bg-muted/10 text-[9px] font-bold text-muted-foreground uppercase tracking-widest text-center italic">
                   Lower Cost/Hour indicates higher operational efficiency
                </div>
            </div>
       </div>

    </div>
  );
}
