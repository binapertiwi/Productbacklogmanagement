import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, LabelList } from 'recharts';
import { generatePerformanceData, CommodityType } from '../data/performanceMockData';
import { ChevronDown, Filter, Database, TrendingUp, BarChart3, Activity, Table, Info, ClipboardList, AlertTriangle, DollarSign, Search, Download } from 'lucide-react';
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
  const navigate = useNavigate();
  const data = useMemo(() => generatePerformanceData(commodity), [commodity]);

  const [filters, setFilters] = useState<Record<string, string>>({
    'Area Kerja': 'All Area Kerjas',
    'Brand': 'All Brands',
    'Site': 'All Sites',
    'Customer': 'All Customers',
    'Period': 'All Periods'
  });

  const filterOptions: Record<string, string[]> = {
    'Area Kerja': ['All Area Kerjas', 'Area 1', 'Area 2', 'Area 3'],
    'Brand': ['All Brands', 'Komatsu', 'Caterpillar', 'Kobelco'],
    'Site': ['All Sites', 'SBY', 'PKU', 'BJM', 'BPP', 'MKS'],
    'Customer': ['All Customers', 'PT ABC', 'PT DEC'],
    'Period': ['All Periods', 'Last 12 Months', 'Current Year', 'Q1 2026']
  };

  if (commodity === 'U/C') {
    return (
      <TooltipProvider>
        <div className="space-y-6 animate-in fade-in duration-500">
        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 flex flex-wrap gap-4 items-end relative">
          <div className="flex items-center gap-2 mb-1 mr-4">
             <Filter className="w-4 h-4 text-blue-900" />
             <span className="text-sm font-bold text-blue-900 uppercase tracking-tight">Active Filters</span>
          </div>
          
          {Object.entries(filterOptions).map(([label, options]) => (
            <div key={label} className="flex flex-col gap-1.5 flex-1 min-w-[120px]">
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest px-1">{label}</label>
              <div className="relative">
                 <select 
                   value={filters[label]}
                   onChange={(e) => setFilters({...filters, [label]: e.target.value})}
                   className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/30 appearance-none cursor-pointer text-gray-700"
                 >
                   {options.map(opt => <option key={opt}>{opt}</option>)}
                 </select>
                 <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          ))}
          
          <button className="px-6 py-2.5 bg-blue-900 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-blue-800 transition-colors">
            APPLY
          </button>
        </div>

        {/* KPI Score Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: TOTAL U/C INSPECTIONS */}
          <div className="bg-card rounded-xl border border-border p-5 flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-primary/5 rounded-full group-hover:scale-110 transition-transform" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                  Total U/C Inspections
                  <TooltipUI>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Jumlah total inspeksi komponen Under Carriage yang telah dilakukan.</p>
                    </TooltipContent>
                  </TooltipUI>
                </p>
                <h3 className="text-2xl font-bold text-blue-900 mt-1">112 Units</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <ClipboardList className="w-5 h-5 text-blue-900" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-green-600 relative z-10">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+8% vs last month</span>
            </div>
          </div>

          {/* Card 2: U/C HEALTH INDEX */}
          <div className="bg-card rounded-xl border border-border p-5 flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-green-500/5 rounded-full group-hover:scale-110 transition-transform" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                  U/C Health Index
                  <TooltipUI>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Indeks kesehatan Under Carriage berdasarkan rata-rata persentase keausan komponen.</p>
                    </TooltipContent>
                  </TooltipUI>
                </p>
                <h3 className="text-2xl font-bold text-blue-900 mt-1">74%</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Activity className="w-5 h-5 text-blue-900" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 relative z-10">
              Based on overall % Worn data
            </div>
          </div>

          {/* Card 3: CRITICAL U/C UNITS */}
          <div className="bg-card rounded-xl border border-border p-5 flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-red-500/5 rounded-full group-hover:scale-110 transition-transform" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                  Critical U/C Units
                  <TooltipUI>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Jumlah unit dengan komponen Under Carriage yang berada dalam kondisi kritis dan memerlukan penggantian segera.</p>
                    </TooltipContent>
                  </TooltipUI>
                </p>
                <h3 className="text-2xl font-bold text-blue-900 mt-1">24 Units</h3>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-red-500 font-medium relative z-10">
              Require immediate replacement
            </div>
          </div>

          {/* Card 4: U/C REVENUE POTENTIAL */}
          <div className="bg-card rounded-xl border border-border p-5 flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500/5 rounded-full group-hover:scale-110 transition-transform" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                  U/C Revenue Potential
                  <TooltipUI>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Estimasi potensi pendapatan dari penggantian komponen Under Carriage.</p>
                    </TooltipContent>
                  </TooltipUI>
                </p>
                <h3 className="text-2xl font-bold text-blue-900 mt-1">Rp 2.15 M</h3>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-green-600 relative z-10">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+Rp 150jt vs last period</span>
            </div>
          </div>
        </div>



        {/* Tier 1 - Population & Coverage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Population Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-6 flex items-center gap-1">
              POPULATION DETAILS: U/C
              <TooltipUI>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Distribusi populasi unit berdasarkan model dan cabang.</p>
                </TooltipContent>
              </TooltipUI>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.populationData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} label={({ value }) => value}>
                    {data.populationData.map((e, i) => <Cell key={i} fill={e.color === '#1a2b4a' ? '#1e3a8a' : e.color} />)}
                  </Pie>
                  <Tooltip />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700 }} />
                </PieChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, bottom: 20 }}>
                  <Pie data={data.branchData} dataKey="value" cx="50%" cy="50%" innerRadius={0} outerRadius={65} label={({ value }) => value}>
                    {data.branchData.map((e, i) => <Cell key={i} fill={data.BRANCH_COLORS[i % data.BRANCH_COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Backlog Coverage Analytic */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-6 flex items-center gap-1">
              BACKLOG COVERAGE ANALYTIC
              <TooltipUI>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Analisis cakupan backlog per cabang.</p>
                </TooltipContent>
              </TooltipUI>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.backlogCoveragePie} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} label={({ value }) => value}>
                    {data.backlogCoveragePie.map((e, i) => <Cell key={i} fill={e.color === '#1a2b4a' ? '#1e3a8a' : e.color} />)}
                  </Pie>
                  <Tooltip />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700 }} />
                </PieChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.backlogBranchData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700 }} />
                  <Tooltip />
                  <Bar dataKey="coverage" radius={[4, 4, 0, 0]} barSize={25}>
                    {data.backlogBranchData.map((e, i) => <Cell key={i} fill={data.BRANCH_COLORS[i % data.BRANCH_COLORS.length]} />)}
                    <LabelList dataKey="coverage" position="top" style={{ fontSize: 10, fontWeight: 700, fill: '#4b5563' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tier 2 - Lifetime & Health Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lifetime Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-6 flex items-center gap-1">
              LIFETIME DISTRIBUTION
              <TooltipUI>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Distribusi umur pakai komponen Under Carriage (Min, Avg, Max).</p>
                </TooltipContent>
              </TooltipUI>
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.lifetimeData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700 }} />
                  <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
                  <Tooltip />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 9, fontWeight: 700 }} />
                  <Bar dataKey="min" fill="#3b82f6" name="Min Life" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="min" position="top" style={{ fontSize: 8, fontWeight: 700, fill: '#4b5563' }} />
                  </Bar>
                  <Bar dataKey="avg" fill="#10b981" name="Avg Life" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="avg" position="top" style={{ fontSize: 8, fontWeight: 700, fill: '#4b5563' }} />
                  </Bar>
                  <Bar dataKey="max" fill="#ef4444" name="Max Life" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="max" position="top" style={{ fontSize: 8, fontWeight: 700, fill: '#4b5563' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Component Wear Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-6 flex items-center gap-1">
              COMPONENT WEAR BREAKDOWN
              <TooltipUI>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Rincian kondisi keausan komponen (Normal, Caution, Critical).</p>
                </TooltipContent>
              </TooltipUI>
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.componentStatus} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" />
                  <YAxis dataKey="part" type="category" tick={{ fontSize: 10, fontWeight: 700 }} />
                  <Tooltip />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 9, fontWeight: 700 }} />
                  <Bar dataKey="Normal" stackId="a" fill="#10b981">
                    <LabelList dataKey="Normal" position="center" style={{ fontSize: 9, fontWeight: 700, fill: '#fff' }} />
                  </Bar>
                  <Bar dataKey="Caution" stackId="a" fill="#f59e0b">
                    <LabelList dataKey="Caution" position="center" style={{ fontSize: 9, fontWeight: 700, fill: '#fff' }} />
                  </Bar>
                  <Bar dataKey="Critical" stackId="a" fill="#ef4444">
                    <LabelList dataKey="Critical" position="center" style={{ fontSize: 9, fontWeight: 700, fill: '#fff' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tier 3 - Trends & Efficiency Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost Per Hour Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-6 flex items-center gap-1">
              COST PER HOUR TREND
              <TooltipUI>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Tren biaya per jam untuk komponen Under Carriage.</p>
                </TooltipContent>
              </TooltipUI>
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.costPerHour}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="size" tick={{ fontSize: 10, fontWeight: 700 }} />
                  <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
                  <Tooltip />
                  <Bar dataKey="cost" fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={20}>
                    <LabelList dataKey="cost" position="top" style={{ fontSize: 10, fontWeight: 700, fill: '#4b5563' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Financial Efficiency Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-6 flex items-center gap-1">
              FINANCIAL EFFICIENCY ANALYSIS
              <TooltipUI>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Analisis efisiensi finansial berdasarkan part number.</p>
                </TooltipContent>
              </TooltipUI>
            </h3>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-center border-separate border-spacing-0">
                <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  <tr>
                    <th className="px-4 py-4 border-b border-gray-200">Part Number</th>
                    <th className="px-4 py-4 border-b border-gray-200">Avg Life</th>
                    <th className="px-4 py-4 border-b border-gray-200">Market Price</th>
                    <th className="px-4 py-4 border-b border-gray-200">Cost / Hour</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.costTable.map((r) => (
                    <tr key={r.pn} className="hover:bg-gray-50 transition-colors text-[11px] font-bold text-gray-700">
                      <td className="px-4 py-4 font-bold text-blue-900">{r.pn}</td>
                      <td className="px-4 py-4">{r.avg} H</td>
                      <td className="px-4 py-4 opacity-70">Rp {r.price}</td>
                      <td className="px-4 py-4 font-bold text-green-600 bg-green-50">Rp {r.costPerHour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Plan Replacement Forecast (Full Width) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest flex items-center gap-1">
              PLAN REPLACEMENT FORECAST
              <TooltipUI>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Perkiraan jadwal penggantian komponen Under Carriage.</p>
                </TooltipContent>
              </TooltipUI>
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Client or P/N..."
                  className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-40"
                />
              </div>
              {/* Status Filter */}
              <select className="text-xs border border-gray-200 rounded-lg py-1.5 px-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700">
                <option value="">All Status</option>
                <option value="critical">Critical</option>
                <option value="caution">Caution</option>
                <option value="normal">Normal</option>
              </select>
              {/* Export Button */}
              <button className="flex items-center gap-1.5 bg-blue-900 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-800 transition-colors">
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] text-center border-separate border-spacing-0">
              <thead className="bg-gray-50 text-gray-500 uppercase font-bold tracking-tighter">
                <tr>
                  <th className="px-3 py-3 border-b border-gray-200 sticky left-0 z-10 bg-gray-50">Client</th>
                  <th className="px-3 py-3 border-b border-gray-200">P/N</th>
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                    <th key={m} className="px-2 py-3 border-b border-gray-200">{m}</th>
                  ))}
                  <th className="px-3 py-3 border-b border-gray-200 font-bold text-green-600">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {data.planTable.map((r) => (
                  <tr key={`${r.customer}-${r.pn}`} className="hover:bg-gray-50 transition-colors group text-[9px] font-bold">
                    <td className="px-3 py-3 border-r border-gray-200 font-bold text-blue-900 sticky left-0 z-10 bg-white group-hover:bg-gray-50">{r.customer}</td>
                    <td className="px-3 py-3 font-bold opacity-70">{r.pn}</td>
                    <td className="px-2 py-3 bg-gray-50">{r.jan}</td>
                    <td className="px-2 py-3">{r.feb}</td>
                    <td className="px-2 py-3 bg-gray-50 font-bold text-green-600">{r.mar}</td>
                    <td className="px-2 py-3">{r.apr}</td>
                    <td className="px-2 py-3 bg-gray-50">{r.may}</td>
                    <td className="px-2 py-3">{r.jun}</td>
                    <td className="px-2 py-3 bg-gray-50">{r.jul}</td>
                    <td className="px-2 py-3">{r.aug}</td>
                    <td className="px-2 py-3 bg-gray-50">{r.sep}</td>
                    <td className="px-2 py-3">{r.oct}</td>
                    <td className="px-2 py-3 bg-gray-50">{r.nov}</td>
                    <td className="px-2 py-3">{r.dec}</td>
                    <td className="px-3 py-3 font-bold text-green-600 bg-green-50">{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cross-Component Backlog Matrix (Full Width) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest flex items-center gap-1">
              CROSS-COMPONENT BACKLOG MATRIX
              <TooltipUI>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Matriks temuan backlog lintas komponen untuk setiap unit.</p>
                </TooltipContent>
              </TooltipUI>
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Armada or Model..."
                  className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-40"
                />
              </div>
              {/* Export Button */}
              <button className="flex items-center gap-1.5 bg-blue-900 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-800 transition-colors">
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] text-center border-separate border-spacing-0">
              <thead className="bg-gray-50 text-gray-500 uppercase font-bold tracking-tighter">
                <tr>
                  <th className="px-3 py-3 border-b border-gray-200 sticky left-0 z-10 bg-gray-50 text-left">Armada / Model</th>
                  <th className="px-3 py-3 border-b border-gray-200 text-left">Customer / Site</th>
                  <th className="px-3 py-3 border-b border-gray-200">Track Link</th>
                  <th className="px-3 py-3 border-b border-gray-200">Roller</th>
                  <th className="px-3 py-3 border-b border-gray-200">Shoe</th>
                  <th className="px-3 py-3 border-b border-gray-200">Idler</th>
                  <th className="px-3 py-3 border-b border-gray-200">Sprocket</th>
                  <th className="px-3 py-3 border-b border-gray-200 font-bold text-red-600">Active Backlogs</th>
                  <th className="px-3 py-3 border-b border-gray-200 font-bold text-blue-900">Potensi PO</th>
                  <th className="px-3 py-3 border-b border-gray-200">Avg Lead Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {data.backlogMatrix && data.backlogMatrix.map((r, idx) => (
                  <tr 
                    key={idx} 
                    className="hover:bg-gray-50 transition-colors group text-[9px] font-bold cursor-pointer"
                    onClick={() => navigate(`/unit/${r.armada}?tab=U/C`)}
                  >
                    <td className="px-3 py-3 border-r border-gray-200 font-bold text-blue-900 sticky left-0 z-10 bg-white group-hover:bg-gray-50 text-left">
                      <div>{r.armada}</div>
                      <div className="text-gray-400 font-normal">{r.model}</div>
                    </td>
                    <td className="px-3 py-3 text-left">
                      <div>{r.customer}</div>
                      <div className="text-gray-400 font-normal">{r.site}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold ${
                        r.trackLink > 2 ? 'bg-red-500 text-white' : 
                        r.trackLink > 0 ? 'bg-yellow-400 text-white' : 
                        'bg-green-100 text-green-600'
                      }`}>
                        {r.trackLink}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold ${
                        r.roller > 2 ? 'bg-red-500 text-white' : 
                        r.roller > 0 ? 'bg-yellow-400 text-white' : 
                        'bg-green-100 text-green-600'
                      }`}>
                        {r.roller}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold ${
                        r.shoe > 2 ? 'bg-red-500 text-white' : 
                        r.shoe > 0 ? 'bg-yellow-400 text-white' : 
                        'bg-green-100 text-green-600'
                      }`}>
                        {r.shoe}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold ${
                        r.idler > 2 ? 'bg-red-500 text-white' : 
                        r.idler > 0 ? 'bg-yellow-400 text-white' : 
                        'bg-green-100 text-green-600'
                      }`}>
                        {r.idler}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold ${
                        r.sprocket > 2 ? 'bg-red-500 text-white' : 
                        r.sprocket > 0 ? 'bg-yellow-400 text-white' : 
                        'bg-green-100 text-green-600'
                      }`}>
                        {r.sprocket}
                      </div>
                    </td>
                    <td className="px-3 py-3 font-bold text-red-600">{r.activeBacklogs}</td>
                    <td className="px-3 py-3 font-bold text-blue-900">{r.potensiPO}</td>
                    <td className="px-3 py-3">{r.avgLeadTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </TooltipProvider>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Filters Section */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm flex flex-wrap gap-4 items-end backdrop-blur-sm bg-card/80 sticky top-0 z-20">
        <div className="flex items-center gap-2 mb-1 mr-4">
           <Filter className="w-4 h-4 text-brand-green" />
           <span className="text-sm font-bold text-primary dark:text-foreground uppercase tracking-tight">Active Filters</span>
        </div>
        
        {(commodity === 'TYR' || commodity === 'GET' || commodity === 'U/C') && (
          <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
            <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest px-1">Brand</label>
            <div className="relative">
               <select className="w-full border border-border rounded-xl px-4 py-2 text-xs font-bold bg-background focus:outline-none focus:ring-2 focus:ring-brand-green/30 appearance-none cursor-pointer text-foreground">
                 <option>All Brands</option>
               </select>
               <ChevronDown className="w-3 h-3 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}
        
        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
          <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest px-1">Customer</label>
          <div className="relative">
             <select className="w-full border border-border rounded-xl px-4 py-2 text-xs font-bold bg-background focus:outline-none focus:ring-2 focus:ring-brand-green/30 appearance-none cursor-pointer text-foreground">
               <option>All Customers</option>
             </select>
             <ChevronDown className="w-3 h-3 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
          <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest px-1">Period</label>
          <div className="relative">
             <select className="w-full border border-border rounded-xl px-4 py-2 text-xs font-bold bg-background focus:outline-none focus:ring-2 focus:ring-brand-green/30 appearance-none cursor-pointer text-foreground">
               <option>Last 12 Months</option>
               <option>Current Year</option>
               <option>Q1 2026</option>
             </select>
             <ChevronDown className="w-3 h-3 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        
        <button className="px-5 py-2.5 bg-brand-navy dark:bg-brand-blue text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-navy/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
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
                <h3 className="text-sm font-bold text-primary dark:text-foreground uppercase tracking-widest">Population Details: {commodity}</h3>
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
                        <Pie data={data.populationData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} label={({ value }) => value}>
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
                        <Pie data={data.branchData} dataKey="value" cx="50%" cy="50%" innerRadius={0} outerRadius={80} label={({ value }) => value}>
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
                <h3 className="text-sm font-bold text-primary dark:text-foreground uppercase tracking-widest">Backlog Coverage Analytic</h3>
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
                        <Pie data={data.backlogCoveragePie} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} cornerRadius={4} label={({ value }) => value}>
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
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "var(--muted-foreground)" }} />
                        <Tooltip contentStyle={{ fontSize: 11, fontWeight: 700, borderRadius: 12, backgroundColor: "var(--card)", border: "1px solid var(--border)" }} cursor={{ fill: "var(--muted)", opacity: 0.1 }} />
                        <Bar dataKey="coverage" radius={[4, 4, 0, 0]} barSize={25}>
                          {data.backlogBranchData.map((e, i) => <Cell key={i} fill={data.BRANCH_COLORS[i % data.BRANCH_COLORS.length]} />)}
                          <LabelList dataKey="coverage" position="top" style={{ fontSize: 10, fontWeight: 700, fill: 'var(--muted-foreground)' }} />
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
                <h3 className="text-sm font-bold text-primary dark:text-foreground uppercase tracking-widest">Lifetime Distribution</h3>
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
                    <Bar dataKey="min" fill="var(--chart-1)" name="Min Life" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="min" position="top" style={{ fontSize: 8, fontWeight: 700, fill: 'var(--muted-foreground)' }} />
                    </Bar>
                    <Bar dataKey="avg" fill="var(--chart-2)" name="Avg Life" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="avg" position="top" style={{ fontSize: 8, fontWeight: 700, fill: 'var(--muted-foreground)' }} />
                    </Bar>
                    <Bar dataKey="max" fill="var(--brand-blue)" name="Max Life" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="max" position="top" style={{ fontSize: 8, fontWeight: 700, fill: 'var(--muted-foreground)' }} />
                    </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all">
           <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2">
               <TrendingUp className="w-4 h-4 text-brand-green" />
               <h3 className="text-sm font-bold text-primary dark:text-foreground uppercase tracking-widest">{commodity === 'GET' ? 'WEARNESS TREND' : 'COST PER HOUR TREND'}</h3>
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
                      <Line type="monotone" dataKey="cost" stroke="var(--primary)" strokeWidth={3} dot={{ stroke: 'var(--primary)', strokeWidth: 2, r: 4, fill: 'var(--card)' }} activeDot={{ r: 6, strokeWidth: 0 }}>
                        <LabelList dataKey="cost" position="top" style={{ fontSize: 10, fontWeight: 700, fill: 'var(--muted-foreground)' }} />
                      </Line>
                    </LineChart>
                ) : (
                    <BarChart data={data.costPerHour}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                      <XAxis dataKey="size" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "var(--muted-foreground)" }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "var(--muted-foreground)" }} />
                      <Tooltip contentStyle={{ fontSize: 11, fontWeight: 700, borderRadius: 12, backgroundColor: "var(--card)", border: "1px solid var(--border)" }} cursor={{ fill: "var(--muted)", opacity: 0.1 }} />
                      <Bar dataKey="cost" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={20}>
                        <LabelList dataKey="cost" position="top" style={{ fontSize: 10, fontWeight: 700, fill: 'var(--muted-foreground)' }} />
                      </Bar>
                    </BarChart>
                )}
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Tables Section */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all">
                <div className="bg-white border-b border-border text-[10px] font-bold px-6 py-3 uppercase tracking-widest flex flex-wrap items-center justify-between gap-4">
                   <div className="flex items-center gap-2 text-primary">
                     <Table className="w-3.5 h-3.5" /> Plan Replacement Forecast
                   </div>
                   
                   <div className="flex items-center gap-3">
                     {/* Search */}
                     <div className="relative min-w-[150px]">
                        <input 
                          type="text" 
                          placeholder="Search Client or P/N..." 
                          className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-[10px] font-bold bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/30 appearance-none cursor-pointer text-gray-700"
                        />
                        <Search className="w-3 h-3 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                     </div>

                     {/* Filter Status */}
                     <div className="relative min-w-[100px]">
                        <select 
                          className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-[10px] font-bold bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/30 appearance-none cursor-pointer text-gray-700"
                        >
                          <option>ALL STATUS</option>
                          <option>NORMAL</option>
                          <option>CAUTION</option>
                          <option>CRITICAL</option>
                        </select>
                        <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                     </div>

                     {/* Export Button */}
                     <button className="px-4 py-1.5 bg-brand-green text-white rounded-lg text-[10px] font-bold shadow-sm hover:bg-brand-green/90 transition-colors flex items-center gap-1.5">
                       <Download className="w-3 h-3" /> EXPORT
                     </button>

                     <TooltipUI>
                      <TooltipTrigger asChild>
                        <button className="text-muted-foreground hover:text-primary transition-colors">
                          <Info className="w-3 h-3" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[220px] bg-card text-foreground border-border shadow-xl">
                        Prediksi jadwal penggantian komponen per bulan untuk setiap pelanggan berdasarkan sisa lifetime unit.
                      </TooltipContent>
                     </TooltipUI>
                   </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-[10px] text-center border-separate border-spacing-0">
                        <thead className="bg-muted/50 text-muted-foreground uppercase font-bold tracking-tighter">
                            <tr>
                                <th className="px-3 py-3 border-b border-r border-border sticky left-0 z-10 bg-muted/80 backdrop-blur-sm">Client</th>
                                <th className="px-3 py-3 border-b border-border">P/N</th>
                                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                                    <th key={m} className="px-2 py-3 border-b border-border">{m}</th>
                                ))}
                                <th className="px-3 py-3 border-b border-border font-bold text-brand-green">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50 text-foreground">
                            {data.planTable.map((r) => (
                                <tr key={`${r.customer}-${r.pn}`} className="hover:bg-muted/30 transition-colors group text-[9px] font-bold">
                                    <td className="px-3 py-3 border-r border-border font-bold text-primary dark:text-foreground sticky left-0 z-10 bg-card group-hover:bg-muted/30">{r.customer}</td>
                                    <td className="px-3 py-3 font-bold opacity-70">{r.pn}</td>
                                    <td className="px-2 py-3 bg-muted/5">{r.jan}</td>
                                    <td className="px-2 py-3">{r.feb}</td>
                                    <td className="px-2 py-3 bg-muted/5 font-bold text-brand-green/80">{r.mar}</td>
                                    <td className="px-2 py-3">{r.apr}</td>
                                    <td className="px-2 py-3 bg-muted/5">{r.may}</td>
                                    <td className="px-2 py-3">{r.jun}</td>
                                    <td className="px-2 py-3 bg-muted/5">{r.jul}</td>
                                    <td className="px-2 py-3">{r.aug}</td>
                                    <td className="px-2 py-3 bg-muted/5">{r.sep}</td>
                                    <td className="px-2 py-3">{r.oct}</td>
                                    <td className="px-2 py-3 bg-muted/5">{r.nov}</td>
                                    <td className="px-2 py-3">{r.dec}</td>
                                    <td className="px-3 py-3 font-bold text-brand-green bg-brand-green/5">{r.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all">
                 <div className="bg-accent text-accent-foreground text-[10px] font-bold px-6 py-3 uppercase tracking-widest flex items-center justify-between">
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
                        <thead className="bg-accent/10 text-accent dark:text-accent-foreground text-[10px] font-bold uppercase tracking-widest">
                            <tr>
                                <th className="px-4 py-4 border-b border-border">Part Number</th>
                                <th className="px-4 py-4 border-b border-border">Avg Life</th>
                                <th className="px-4 py-4 border-b border-border">Market Price</th>
                                <th className="px-4 py-4 border-b border-border text-primary font-bold">Cost / Hour</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {data.costTable.map((r) => (
                                <tr key={r.pn} className="hover:bg-muted/30 transition-colors text-[11px] font-bold text-foreground">
                                    <td className="px-4 py-4 font-bold text-primary dark:text-foreground">{r.pn}</td>
                                    <td className="px-4 py-4">{r.avg} H</td>
                                    <td className="px-4 py-4 opacity-70">Rp {r.price}</td>
                                    <td className="px-4 py-4 font-bold text-brand-green bg-brand-green/5">Rp {r.costPerHour}</td>
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
