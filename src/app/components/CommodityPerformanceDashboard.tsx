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

interface CommodityConfig {
  name: string;
  unit: string;
  healthIndexSubtext: string;
  criticalSubtext: string;
  components: string[];
  inspectionsCount: string;
  healthIndex: number;
  criticalUnits: number;
  revenuePotential: string;
  revenueTrend: string;
}

const COMMODITY_CONFIGS: Record<CommodityType, CommodityConfig> = {
  'U/C': {
    name: 'Undercarriage',
    unit: '% Worn',
    healthIndexSubtext: 'Berdasarkan rata-rata keausan komponen link, roller, & shoe',
    criticalSubtext: 'Memerlukan tindakan penggantian segera',
    components: ['Track Link', 'Roller', 'Shoe', 'Idler', 'Sprocket'],
    inspectionsCount: '112 Units',
    healthIndex: 74,
    criticalUnits: 24,
    revenuePotential: 'Rp 2.15 M',
    revenueTrend: '+Rp 150jt vs bulan lalu'
  },
  'BAT': {
    name: 'Battery',
    unit: 'V / SG',
    healthIndexSubtext: 'Berdasarkan voltase sel & berat jenis asam aki',
    criticalSubtext: 'Kapasitas di bawah ambang batas minimum',
    components: ['Battery Cells', 'Terminals & Cables', 'Acid Level/SG', 'Alternator Charging'],
    inspectionsCount: '85 Units',
    healthIndex: 82,
    criticalUnits: 8,
    revenuePotential: 'Rp 145 Jt',
    revenueTrend: '+Rp 15jt vs bulan lalu'
  },
  'GET': {
    name: 'Ground Engaging Tools',
    unit: 'mm',
    healthIndexSubtext: 'Berdasarkan ketebalan bucket teeth & shroud assembly',
    criticalSubtext: 'Risiko kerusakan lip assembly bucket tinggi',
    components: ['Bucket Teeth', 'Adapters', 'Lip Shrouds', 'Cutting Edge'],
    inspectionsCount: '98 Units',
    healthIndex: 68,
    criticalUnits: 18,
    revenuePotential: 'Rp 650 Jt',
    revenueTrend: '+Rp 80jt vs bulan lalu'
  },
  'TYR': {
    name: 'Tyre',
    unit: 'mm / PSI',
    healthIndexSubtext: 'Berdasarkan kedalaman tread & tekanan ban',
    criticalSubtext: 'Risiko pecah ban atau keausan tidak merata',
    components: ['Tread Depth', 'Inflation Pressure', 'Sidewall Condition', 'TKPH Tracking'],
    inspectionsCount: '140 Units',
    healthIndex: 79,
    criticalUnits: 15,
    revenuePotential: 'Rp 1.85 M',
    revenueTrend: '+Rp 210jt vs bulan lalu'
  },
  'FCG': {
    name: 'Fluid Connector & Guard',
    unit: '% Worn',
    healthIndexSubtext: 'Berdasarkan tingkat kebocoran hose & integritas guard',
    criticalSubtext: 'Risiko oil spill & kerusakan sistem hidrolik',
    components: ['Filter Restriction', 'Contamination Level', 'Structural Integrity', 'Leakage Visual'],
    inspectionsCount: '155 Units',
    healthIndex: 71,
    criticalUnits: 29,
    revenuePotential: 'Rp 920 Jt',
    revenueTrend: '+Rp 95jt vs bulan lalu'
  },
  'LUB': {
    name: 'Lubricant',
    unit: 'ppm / cSt',
    healthIndexSubtext: 'Berdasarkan analisis logam aus & viskositas oli',
    criticalSubtext: 'Indikasi kontaminasi parah di kompartemen',
    components: ['Viscosity Index', 'Fe/Cu Wear Elements', 'Silicon Contamination', 'Soot/Oxidation'],
    inspectionsCount: '210 Units',
    healthIndex: 85,
    criticalUnits: 12,
    revenuePotential: 'Rp 410 Jt',
    revenueTrend: '+Rp 35jt vs bulan lalu'
  },
  'Autofire': {
    name: 'Auto Fire Suppression',
    unit: 'Bar / PSI',
    healthIndexSubtext: 'Berdasarkan tekanan silinder & sensor kelistrikan',
    criticalSubtext: 'Sistem tidak aktif / gagal merespon darurat',
    components: ['Sensor Integrity', 'Nozzle Condition', 'Pressure Status', 'Actuator Response'],
    inspectionsCount: '64 Units',
    healthIndex: 91,
    criticalUnits: 4,
    revenuePotential: 'Rp 380 Jt',
    revenueTrend: '+Rp 40jt vs bulan lalu'
  },
  'Autolube': {
    name: 'Auto Lubrication System',
    unit: 'Psi / %',
    healthIndexSubtext: 'Berdasarkan tekanan pompa & distribusi grease distributor',
    criticalSubtext: 'Komponen pin & bushing tidak terlumasi',
    components: ['Pump Pressure', 'Metering Valve', 'Line Blockage', 'Grease Level %'],
    inspectionsCount: '78 Units',
    healthIndex: 76,
    criticalUnits: 11,
    revenuePotential: 'Rp 290 Jt',
    revenueTrend: '+Rp 25jt vs bulan lalu'
  }
};

const generateBacklogMatrix = (commodity: CommodityType) => {
  switch (commodity) {
    case 'BAT':
      return [
        { armada: 'PC2000-8-50112', model: 'Komatsu PC2000-8', customer: 'PT Kaltim Prima Coal', site: 'Kaltim', comp1: 2, comp2: 0, comp3: 1, comp4: 0, activeBacklogs: 3, potensiPO: 'Rp 45 Jt', avgLeadTime: '3 DAYS' },
        { armada: 'CAT789D-AX102', model: 'CAT 789D', customer: 'PT Adaro Energy', site: 'Kalsel', comp1: 0, comp2: 1, comp3: 0, comp4: 2, activeBacklogs: 3, potensiPO: 'Rp 60 Jt', avgLeadTime: '5 DAYS' },
        { armada: 'EX5600-6-90812', model: 'Hitachi EX5600-6', customer: 'PT Bukit Asam', site: 'Sumsel', comp1: 3, comp2: 0, comp3: 0, comp4: 0, activeBacklogs: 3, potensiPO: 'Rp 80 Jt', avgLeadTime: '4 DAYS' },
        { armada: 'PC1250-8-10293', model: 'Komatsu PC1250-8', customer: 'PT Berau Coal', site: 'Kaltim', comp1: 0, comp2: 0, comp3: 0, comp4: 0, activeBacklogs: 0, potensiPO: '-', avgLeadTime: '0 DAYS' },
        { armada: 'HD785-7-30882', model: 'Komatsu HD785-7', customer: 'PT Thiess', site: 'Kaltim', comp1: 1, comp2: 0, comp3: 0, comp4: 0, activeBacklogs: 1, potensiPO: 'Rp 15 Jt', avgLeadTime: '2 DAYS' }
      ];
    case 'GET':
      return [
        { armada: 'EX5600-6-90812', model: 'Hitachi EX5600-6', customer: 'PT Kaltim Prima Coal', site: 'Kaltim', comp1: 3, comp2: 0, comp3: 2, comp4: 1, activeBacklogs: 6, potensiPO: 'Rp 180 Jt', avgLeadTime: '7 DAYS' },
        { armada: 'PC2000-8-50112', model: 'Komatsu PC2000-8', customer: 'PT Bukit Asam', site: 'Sumsel', comp1: 0, comp2: 1, comp3: 0, comp4: 0, activeBacklogs: 1, potensiPO: 'Rp 35 Jt', avgLeadTime: '4 DAYS' },
        { armada: 'CAT789D-AX102', model: 'CAT 789D', customer: 'PT Adaro Energy', site: 'Kalsel', comp1: 0, comp2: 0, comp3: 0, comp4: 0, activeBacklogs: 0, potensiPO: '-', avgLeadTime: '0 DAYS' },
        { armada: 'PC1250-8-10293', model: 'Komatsu PC1250-8', customer: 'PT Berau Coal', site: 'Kaltim', comp1: 2, comp2: 0, comp3: 1, comp4: 0, activeBacklogs: 3, potensiPO: 'Rp 75 Jt', avgLeadTime: '5 DAYS' },
        { armada: 'EX3600-6-80921', model: 'Hitachi EX3600-6', customer: 'PT Thiess', site: 'Kaltim', comp1: 1, comp2: 0, comp3: 0, comp4: 0, activeBacklogs: 1, potensiPO: 'Rp 40 Jt', avgLeadTime: '3 DAYS' }
      ];
    case 'TYR':
      return [
        { armada: 'CAT789D-AX102', model: 'CAT 789D', customer: 'PT Adaro Energy', site: 'Kalsel', comp1: 4, comp2: 1, comp3: 0, comp4: 1, activeBacklogs: 6, potensiPO: 'Rp 650 Jt', avgLeadTime: '10 DAYS' },
        { armada: 'HD785-7-30882', model: 'Komatsu HD785-7', customer: 'PT Thiess', site: 'Kaltim', comp1: 1, comp2: 0, comp3: 2, comp4: 0, activeBacklogs: 3, potensiPO: 'Rp 180 Jt', avgLeadTime: '6 DAYS' },
        { armada: 'CAT785D-AX8801', model: 'CAT 785D', customer: 'PT Agincourt', site: 'Sumut', comp1: 0, comp2: 2, comp3: 0, comp4: 0, activeBacklogs: 2, potensiPO: 'Rp 120 Jt', avgLeadTime: '4 DAYS' },
        { armada: 'UNIT-MT4400', model: 'Terex MT4400', customer: 'PT Kaltim Prima Coal', site: 'Kaltim', comp1: 0, comp2: 0, comp3: 0, comp4: 0, activeBacklogs: 0, potensiPO: '-', avgLeadTime: '0 DAYS' },
        { armada: 'HD465-7-40291', model: 'Komatsu HD465-7', customer: 'PT Bukit Asam', site: 'Sumsel', comp1: 2, comp2: 0, comp3: 0, comp4: 0, activeBacklogs: 2, potensiPO: 'Rp 90 Jt', avgLeadTime: '5 DAYS' }
      ];
    case 'FCG':
      return [
        { armada: 'PC2000-8-50112', model: 'Komatsu PC2000-8', customer: 'PT Kaltim Prima Coal', site: 'Kaltim', comp1: 2, comp2: 1, comp3: 3, comp4: 1, activeBacklogs: 7, potensiPO: 'Rp 220 Jt', avgLeadTime: '8 DAYS' },
        { armada: 'EX5600-6-90812', model: 'Hitachi EX5600-6', customer: 'PT Bukit Asam', site: 'Sumsel', comp1: 0, comp2: 2, comp3: 0, comp4: 0, activeBacklogs: 2, potensiPO: 'Rp 85 Jt', avgLeadTime: '4 DAYS' },
        { armada: 'CAT789D-AX102', model: 'CAT 789D', customer: 'PT Adaro Energy', site: 'Kalsel', comp1: 1, comp2: 0, comp3: 0, comp4: 1, activeBacklogs: 2, potensiPO: 'Rp 45 Jt', avgLeadTime: '3 DAYS' },
        { armada: 'PC1250-8-10293', model: 'Komatsu PC1250-8', customer: 'PT Berau Coal', site: 'Kaltim', comp1: 0, comp2: 0, comp3: 0, comp4: 0, activeBacklogs: 0, potensiPO: '-', avgLeadTime: '0 DAYS' },
        { armada: 'D375A-6-50234', model: 'Komatsu D375A-6', customer: 'PT Thiess', site: 'Kaltim', comp1: 3, comp2: 0, comp3: 1, comp4: 0, activeBacklogs: 4, potensiPO: 'Rp 140 Jt', avgLeadTime: '5 DAYS' }
      ];
    case 'LUB':
      return [
        { armada: 'EX5600-6-90812', model: 'Hitachi EX5600-6', customer: 'PT Kaltim Prima Coal', site: 'Kaltim', comp1: 3, comp2: 1, comp3: 0, comp4: 2, activeBacklogs: 6, potensiPO: 'Rp 110 Jt', avgLeadTime: '5 DAYS' },
        { armada: 'PC2000-8-50112', model: 'Komatsu PC2000-8', customer: 'PT Bukit Asam', site: 'Sumsel', comp1: 0, comp2: 2, comp3: 1, comp4: 0, activeBacklogs: 3, potensiPO: 'Rp 65 Jt', avgLeadTime: '4 DAYS' },
        { armada: 'CAT789D-AX102', model: 'CAT 789D', customer: 'PT Adaro Energy', site: 'Kalsel', comp1: 0, comp2: 0, comp3: 0, comp4: 0, activeBacklogs: 0, potensiPO: '-', avgLeadTime: '0 DAYS' },
        { armada: 'PC1250-8-10293', model: 'Komatsu PC1250-8', customer: 'PT Berau Coal', site: 'Kaltim', comp1: 1, comp2: 0, comp3: 0, comp4: 1, activeBacklogs: 2, potensiPO: 'Rp 40 Jt', avgLeadTime: '3 DAYS' },
        { armada: 'D375A-6-50234', model: 'Komatsu D375A-6', customer: 'PT Thiess', site: 'Kaltim', comp1: 0, comp2: 1, comp3: 0, comp4: 0, activeBacklogs: 1, potensiPO: 'Rp 25 Jt', avgLeadTime: '2 DAYS' }
      ];
    case 'Autofire':
      return [
        { armada: 'CAT789D-AX102', model: 'CAT 789D', customer: 'PT Adaro Energy', site: 'Kalsel', comp1: 1, comp2: 0, comp3: 1, comp4: 0, activeBacklogs: 2, potensiPO: 'Rp 80 Jt', avgLeadTime: '4 DAYS' },
        { armada: 'EX5600-6-90812', model: 'Hitachi EX5600-6', customer: 'PT Kaltim Prima Coal', site: 'Kaltim', comp1: 0, comp2: 1, comp3: 0, comp4: 0, activeBacklogs: 1, potensiPO: 'Rp 45 Jt', avgLeadTime: '3 DAYS' },
        { armada: 'PC2000-8-50112', model: 'Komatsu PC2000-8', customer: 'PT Bukit Asam', site: 'Sumsel', comp1: 0, comp2: 0, comp3: 0, comp4: 0, activeBacklogs: 0, potensiPO: '-', avgLeadTime: '0 DAYS' },
        { armada: 'PC1250-8-10293', model: 'Komatsu PC1250-8', customer: 'PT Berau Coal', site: 'Kaltim', comp1: 2, comp2: 0, comp3: 0, comp4: 1, activeBacklogs: 3, potensiPO: 'Rp 120 Jt', avgLeadTime: '6 DAYS' },
        { armada: 'HD785-7-30882', model: 'Komatsu HD785-7', customer: 'PT Thiess', site: 'Kaltim', comp1: 0, comp2: 0, comp3: 1, comp4: 0, activeBacklogs: 1, potensiPO: 'Rp 35 Jt', avgLeadTime: '3 DAYS' }
      ];
    case 'Autolube':
      return [
        { armada: 'EX5600-6-90812', model: 'Hitachi EX5600-6', customer: 'PT Kaltim Prima Coal', site: 'Kaltim', comp1: 2, comp2: 1, comp3: 0, comp4: 1, activeBacklogs: 4, potensiPO: 'Rp 65 Jt', avgLeadTime: '5 DAYS' },
        { armada: 'PC2000-8-50112', model: 'Komatsu PC2000-8', customer: 'PT Bukit Asam', site: 'Sumsel', comp1: 0, comp2: 0, comp3: 1, comp4: 0, activeBacklogs: 1, potensiPO: 'Rp 20 Jt', avgLeadTime: '3 DAYS' },
        { armada: 'CAT789D-AX102', model: 'CAT 789D', customer: 'PT Adaro Energy', site: 'Kalsel', comp1: 0, comp2: 0, comp3: 0, comp4: 0, activeBacklogs: 0, potensiPO: '-', avgLeadTime: '0 DAYS' },
        { armada: 'PC1250-8-10293', model: 'Komatsu PC1250-8', customer: 'PT Berau Coal', site: 'Kaltim', comp1: 3, comp2: 0, comp3: 1, comp4: 0, activeBacklogs: 4, potensiPO: 'Rp 85 Jt', avgLeadTime: '6 DAYS' },
        { armada: 'D375A-6-50234', model: 'Komatsu D375A-6', customer: 'PT Thiess', site: 'Kaltim', comp1: 1, comp2: 0, comp3: 0, comp4: 0, activeBacklogs: 1, potensiPO: 'Rp 25 Jt', avgLeadTime: '3 DAYS' }
      ];
    case 'U/C':
    default:
      return [
        { armada: 'D375A-6-50234', model: 'Komatsu D375A-6', customer: 'PT Adaro Energy', site: 'Kalsel', comp1: 3, comp2: 0, comp3: 2, comp4: 0, comp5: 1, activeBacklogs: 8, potensiPO: 'Rp 125 Jt', avgLeadTime: '14 DAYS' },
        { armada: 'PC800-8-61823', model: 'Komatsu PC800-8', customer: 'PT Thiess', site: 'Kaltim', comp1: 0, comp2: 1, comp3: 0, comp4: 0, comp5: 0, activeBacklogs: 4, potensiPO: 'Rp 450 Jt', avgLeadTime: '21 DAYS' },
        { armada: 'CAT785D-AX8801', model: 'CAT 785D', customer: 'PT Agincourt', site: 'Sumut', comp1: 0, comp2: 0, comp3: 0, comp4: 0, comp5: 0, activeBacklogs: 2, potensiPO: 'Rp 80 Jt', avgLeadTime: '5 DAYS' },
        { armada: 'BP-UC-002', model: 'CAT D8T', customer: 'PT Berau Coal', site: 'Kaltim', comp1: 0, comp2: 0, comp3: 0, comp4: 0, comp5: 0, activeBacklogs: 0, potensiPO: '-', avgLeadTime: '0 DAYS' },
        { armada: 'BP-HY-006', model: 'CAT 320F', customer: 'PT Baramulti', site: 'Kalsel', comp1: 0, comp2: 0, comp3: 0, comp4: 0, comp5: 0, activeBacklogs: 1, potensiPO: 'Rp 45 Jt', avgLeadTime: '4 DAYS' }
      ];
  }
};

export function CommodityPerformanceDashboard({ commodity }: Props) {
  const navigate = useNavigate();

  const config = useMemo(() => COMMODITY_CONFIGS[commodity], [commodity]);

  const rawData = useMemo(() => generatePerformanceData(commodity), [commodity]);

  const transformedData = useMemo(() => {
    // Map Component Status to actual component names and unify status keys
    const componentStatus = rawData.componentStatus.map((item, index) => {
      const partName = config.components[index] || item.part;
      
      // Unify keys: Critical, Caution, Normal
      // U/C has: Critical, Caution, Normal
      // Others have: replace (Critical), monitor (Caution), good (Normal)
      return {
        part: partName,
        Critical: 'Critical' in item ? (item.Critical as number) : ((item as any).replace || 0),
        Caution: 'Caution' in item ? (item.Caution as number) : ((item as any).monitor || 0),
        Normal: 'Normal' in item ? (item.Normal as number) : ((item as any).good || 0),
      };
    });

    const backlogMatrix = generateBacklogMatrix(commodity);

    return {
      ...rawData,
      componentStatus,
      backlogMatrix,
    };
  }, [commodity, rawData, config]);

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

  return (
    <TooltipProvider>
      <div className="space-y-6 animate-in fade-in duration-500">
        
        {/* Filters Section (Sticky at Top) */}
        <div className="bg-card/85 backdrop-blur-md rounded-xl shadow-sm border border-border p-6 flex flex-wrap gap-4 items-end sticky top-0 z-20 transition-all">
          <div className="flex items-center gap-2 mb-1 mr-4">
             <Filter className="w-4 h-4 text-primary" />
             <span className="text-sm font-bold text-primary uppercase tracking-tight">Active Filters</span>
          </div>
          
          {Object.entries(filterOptions).map(([label, options]) => (
            <div key={label} className="flex flex-col gap-1.5 flex-1 min-w-[120px]">
              <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest px-1">{label}</label>
              <div className="relative">
                 <select 
                   value={filters[label]}
                   onChange={(e) => setFilters({...filters, [label]: e.target.value})}
                   className="w-full border border-border rounded-lg px-3 py-2 text-xs font-bold bg-card dark:bg-input focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer text-foreground dark:text-foreground"
                 >
                   {options.map(opt => <option key={opt}>{opt}</option>)}
                 </select>
                 <ChevronDown className="w-3 h-3 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          ))}
          
          <button className="px-6 py-2.5 bg-primary text-white rounded-lg text-xs font-bold shadow-sm hover:bg-primary/90 transition-colors">
            APPLY
          </button>
        </div>

        {/* KPI Score Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: TOTAL INSPECTIONS */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500/5 rounded-full group-hover:scale-110 transition-transform" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                  Total {config.name} Inspections
                  <TooltipUI>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs text-slate-100">Jumlah total inspeksi komponen {config.name} yang telah dilakukan.</p>
                    </TooltipContent>
                  </TooltipUI>
                </p>
                <h3 className="text-2xl font-bold text-primary mt-1 tabular-nums">{config.inspectionsCount}</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-green-600 relative z-10">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+8% vs last month</span>
            </div>
          </div>

          {/* Card 2: HEALTH INDEX */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/5 rounded-full group-hover:scale-110 transition-transform" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                  {config.name} Health Index
                  <TooltipUI>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs text-slate-100">Indeks kesehatan komponen berdasarkan data pengukuran riil.</p>
                    </TooltipContent>
                  </TooltipUI>
                </p>
                <h3 className="text-2xl font-bold text-primary mt-1 tabular-nums">{config.healthIndex}%</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Activity className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground relative z-10">
              {config.healthIndexSubtext}
            </div>
          </div>

          {/* Card 3: CRITICAL UNITS */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-red-500/5 rounded-full group-hover:scale-110 transition-transform" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                  Critical {config.name} Units
                  <TooltipUI>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs text-slate-100">Jumlah unit dengan komponen dalam kondisi kritis dan memerlukan penggantian segera.</p>
                    </TooltipContent>
                  </TooltipUI>
                </p>
                <h3 className="text-2xl font-bold text-red-600 mt-1 tabular-nums">{config.criticalUnits} Units</h3>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-red-500 font-medium relative z-10">
              {config.criticalSubtext}
            </div>
          </div>

          {/* Card 4: REVENUE POTENTIAL */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-green-500/5 rounded-full group-hover:scale-110 transition-transform" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                  {config.name} Revenue Potential
                  <TooltipUI>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs text-slate-100">Estimasi potensi pendapatan dari transaksi PO komoditas ini.</p>
                    </TooltipContent>
                  </TooltipUI>
                </p>
                <h3 className="text-2xl font-bold text-primary mt-1 tabular-nums">{config.revenuePotential}</h3>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-green-600 relative z-10">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>{config.revenueTrend}</span>
            </div>
          </div>
        </div>

        {/* Tier 1 - Population & Coverage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Population Details */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-1">
              POPULATION DETAILS: {commodity}
              <TooltipUI>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs text-slate-100">Distribusi populasi unit berdasarkan status kontrak dan cabang operasional.</p>
                </TooltipContent>
              </TooltipUI>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={transformedData.populationData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} label={({ value }) => value}>
                    {transformedData.populationData.map((e, i) => <Cell key={i} fill={e.color === '#1a2b4a' ? '#1E3A8A' : e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 10, fontWeight: 700 }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700 }} />
                </PieChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, bottom: 20 }}>
                  <Pie data={transformedData.branchData} dataKey="value" cx="50%" cy="50%" innerRadius={0} outerRadius={65} label={({ value }) => value}>
                    {transformedData.branchData.map((e, i) => <Cell key={i} fill={transformedData.BRANCH_COLORS[i % transformedData.BRANCH_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 10, fontWeight: 700 }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Backlog Coverage Analytic */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-1">
              BACKLOG COVERAGE ANALYTIC
              <TooltipUI>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs text-slate-100">Rasio pemenuhan backlog dan performa pencapaian target per wilayah cabang.</p>
                </TooltipContent>
              </TooltipUI>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={transformedData.backlogCoveragePie} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} label={({ value }) => value}>
                    {transformedData.backlogCoveragePie.map((e, i) => <Cell key={i} fill={e.color === '#1a2b4a' ? '#1E3A8A' : e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 10, fontWeight: 700 }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700 }} />
                </PieChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transformedData.backlogBranchData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700 }} />
                  <Tooltip contentStyle={{ fontSize: 10, fontWeight: 700 }} />
                  <Bar dataKey="coverage" radius={[4, 4, 0, 0]} barSize={25}>
                    {transformedData.backlogBranchData.map((e, i) => <Cell key={i} fill={transformedData.BRANCH_COLORS[i % transformedData.BRANCH_COLORS.length]} />)}
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
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-1">
              LIFETIME DISTRIBUTION
              <TooltipUI>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs text-slate-100">Distribusi umur pakai komponen (Min, Avg, Max Life) dalam satuan jam operasional.</p>
                </TooltipContent>
              </TooltipUI>
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transformedData.lifetimeData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700 }} />
                  <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
                  <Tooltip contentStyle={{ fontSize: 10, fontWeight: 700 }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 9, fontWeight: 700 }} />
                  <Bar dataKey="min" fill="#3b82f6" name="Min Life" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="min" position="top" style={{ fontSize: 8, fontWeight: 700, fill: '#4b5563' }} />
                  </Bar>
                  <Bar dataKey="avg" fill="#10B981" name="Avg Life" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="avg" position="top" style={{ fontSize: 8, fontWeight: 700, fill: '#4b5563' }} />
                  </Bar>
                  <Bar dataKey="max" fill="#EF4444" name="Max Life" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="max" position="top" style={{ fontSize: 8, fontWeight: 700, fill: '#4b5563' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Component Wear Breakdown */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-1">
              COMPONENT WEAR BREAKDOWN
              <TooltipUI>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs text-slate-100">Peta distribusi status kesehatan komponen utama berdasarkan data inspeksi.</p>
                </TooltipContent>
              </TooltipUI>
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transformedData.componentStatus} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis type="number" />
                  <YAxis dataKey="part" type="category" tick={{ fontSize: 10, fontWeight: 700 }} />
                  <Tooltip contentStyle={{ fontSize: 10, fontWeight: 700 }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 9, fontWeight: 700 }} />
                  <Bar dataKey="Normal" stackId="a" fill="#10B981" name="Normal">
                    <LabelList dataKey="Normal" position="center" style={{ fontSize: 9, fontWeight: 700, fill: '#fff' }} />
                  </Bar>
                  <Bar dataKey="Caution" stackId="a" fill="#F59E0B" name="Caution">
                    <LabelList dataKey="Caution" position="center" style={{ fontSize: 9, fontWeight: 700, fill: '#fff' }} />
                  </Bar>
                  <Bar dataKey="Critical" stackId="a" fill="#EF4444" name="Critical">
                    <LabelList dataKey="Critical" position="center" style={{ fontSize: 9, fontWeight: 700, fill: '#fff' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tier 3 - Trends (Cost/Wear Trend 100% Width) */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-1">
            {commodity === 'GET' ? 'WEARNESS TREND' : 'COST PER HOUR TREND'}
            <TooltipUI>
              <TooltipTrigger>
                <Info className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs text-slate-100">
                  {commodity === 'GET' 
                    ? 'Analisis tren keausan komponen GET berdasarkan ukuran komponen.'
                    : `Tren grafik rata-rata biaya per jam operasional (${config.unit}) untuk komoditas.`
                  }
                </p>
              </TooltipContent>
            </TooltipUI>
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              {commodity === 'GET' ? (
                <LineChart data={transformedData.costPerHour}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="size" tick={{ fontSize: 10, fontWeight: 700 }} />
                  <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
                  <Tooltip contentStyle={{ fontSize: 10, fontWeight: 700 }} />
                  <Line type="monotone" dataKey="cost" stroke="#1E3A8A" strokeWidth={3} dot={{ stroke: '#1E3A8A', strokeWidth: 2, r: 4, fill: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }}>
                    <LabelList dataKey="cost" position="top" style={{ fontSize: 10, fontWeight: 700, fill: '#4b5563' }} />
                  </Line>
                </LineChart>
              ) : (
                <BarChart data={transformedData.costPerHour}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="size" tick={{ fontSize: 10, fontWeight: 700 }} />
                  <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
                  <Tooltip contentStyle={{ fontSize: 10, fontWeight: 700 }} />
                  <Bar dataKey="cost" fill="#1E3A8A" radius={[4, 4, 0, 0]} barSize={20}>
                    <LabelList dataKey="cost" position="top" style={{ fontSize: 10, fontWeight: 700, fill: '#4b5563' }} />
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Plan Replacement Forecast (Full Width) */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-primary dark:text-foreground font-bold font-display text-base sm:text-lg tracking-tight flex items-center gap-1">
                Plan Replacement Forecast
                <TooltipUI>
                  <TooltipTrigger>
                    <Info className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs text-foreground">Estimasi jadwal rencana penggantian komponen berdasarkan bulan di tahun berjalan.</p>
                  </TooltipContent>
                </TooltipUI>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">Estimasi jadwal rencana penggantian komponen armada per bulan</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search Client or P/N..."
                  className="pl-8 pr-3 py-1.5 text-xs border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary w-40"
                />
              </div>
              {/* Status Filter */}
              <select className="text-xs border border-border rounded-lg py-1.5 px-2 focus:outline-none focus:ring-1 focus:ring-primary bg-card dark:bg-input text-foreground dark:text-foreground">
                <option>All Status</option>
                <option>High Urgency</option>
                <option>Normal</option>
              </select>
              {/* Export Button */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold shadow-sm hover:bg-primary/90 transition-colors">
                <Download className="w-3.5 h-3.5" /> EXCEL
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground uppercase text-[10px] tracking-wider font-bold">
                  <th className="px-3 py-3 border-b border-border">Customer</th>
                  <th className="px-3 py-3 border-b border-border">Part Number</th>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                    <th key={m} className="px-2 py-3 border-b border-border">{m}</th>
                  ))}
                  <th className="px-3 py-3 border-b border-border font-bold text-green-600">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {transformedData.planTable.map((r) => (
                  <tr key={`${r.customer}-${r.pn}`} className="hover:bg-muted/50 transition-colors group text-[9px] font-bold">
                    <td className="px-3 py-3 border-r border-border font-bold text-primary">{r.customer}</td>
                    <td className="px-3 py-3 font-bold opacity-70">{r.pn}</td>
                    <td className="px-2 py-3 bg-muted/50 tabular-nums">{r.jan}</td>
                    <td className="px-2 py-3 tabular-nums">{r.feb}</td>
                    <td className="px-2 py-3 bg-muted/50 font-bold text-green-600 tabular-nums">{r.mar}</td>
                    <td className="px-2 py-3 tabular-nums">{r.apr}</td>
                    <td className="px-2 py-3 bg-muted/50 tabular-nums">{r.may}</td>
                    <td className="px-2 py-3 tabular-nums">{r.jun}</td>
                    <td className="px-2 py-3 bg-muted/50 tabular-nums">{r.jul}</td>
                    <td className="px-2 py-3 tabular-nums">{r.aug}</td>
                    <td className="px-2 py-3 bg-muted/50 tabular-nums">{r.sep}</td>
                    <td className="px-2 py-3 tabular-nums">{r.oct}</td>
                    <td className="px-2 py-3 bg-muted/50 tabular-nums">{r.nov}</td>
                    <td className="px-2 py-3 tabular-nums">{r.dec}</td>
                    <td className="px-3 py-3 font-bold text-green-600 bg-green-500/10 tabular-nums">{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cross-Component Backlog Matrix (Full Width) */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-primary dark:text-foreground font-bold font-display text-base sm:text-lg tracking-tight flex items-center gap-1">
                Cross-Component Backlog Matrix
                <TooltipUI>
                  <TooltipTrigger>
                    <Info className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs text-foreground">Peta visual temuan backlog aktif yang terbagi per komponen alat berat untuk unit armada.</p>
                  </TooltipContent>
                </TooltipUI>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">Peta visual temuan backlog aktif per komponen alat berat</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search Armada or Model..."
                  className="pl-8 pr-3 py-1.5 text-xs border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary w-40"
                />
              </div>
              {/* Export Button */}
              <button className="flex items-center gap-1.5 bg-primary text-white text-xs px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors">
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] text-center border-separate border-spacing-0">
              <thead className="bg-muted/50 text-muted-foreground uppercase font-bold tracking-tighter">
                <tr>
                  <th className="px-3 py-3 border-b border-border sticky left-0 z-10 bg-muted/50 text-left">Armada / Model</th>
                  <th className="px-3 py-3 border-b border-border text-left">Customer / Site</th>
                  {config.components.map((comp) => (
                    <th key={comp} className="px-3 py-3 border-b border-border">{comp}</th>
                  ))}
                  <th className="px-3 py-3 border-b border-border font-bold text-red-600">Active Backlogs</th>
                  <th className="px-3 py-3 border-b border-border font-bold text-primary">Potensi PO</th>
                  <th className="px-3 py-3 border-b border-border">Avg Lead Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {transformedData.backlogMatrix && transformedData.backlogMatrix.map((r, idx) => (
                  <tr 
                    key={idx} 
                    className="hover:bg-muted/50 transition-colors group text-[9px] font-bold cursor-pointer"
                    onClick={() => navigate(`/unit/${r.armada}?tab=${commodity}`)}
                  >
                    <td className="px-3 py-3 border-r border-border font-bold text-primary sticky left-0 z-10 bg-card group-hover:bg-muted/50 text-left">
                      <div>{r.armada}</div>
                      <div className="text-muted-foreground font-normal">{r.model}</div>
                    </td>
                    <td className="px-3 py-3 text-left">
                      <div>{r.customer}</div>
                      <div className="text-muted-foreground font-normal">{r.site}</div>
                    </td>
                    
                    {config.components.map((comp, compIdx) => {
                      const val = compIdx === 0 ? r.comp1 :
                                  compIdx === 1 ? r.comp2 :
                                  compIdx === 2 ? r.comp3 :
                                  compIdx === 3 ? r.comp4 :
                                  compIdx === 4 ? (r as any).comp5 : 0;
                      return (
                        <td key={comp} className="px-3 py-3">
                          <div className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold ${
                            val > 2 ? 'bg-red-500 text-white' : 
                            val > 0 ? 'bg-yellow-400 text-white' : 
                            'bg-green-100 text-green-600'
                          }`}>
                            {val}
                          </div>
                        </td>
                      );
                    })}
                    
                    <td className="px-3 py-3 font-bold text-red-600 tabular-nums">{r.activeBacklogs}</td>
                    <td className="px-3 py-3 font-bold text-primary tabular-nums">{r.potensiPO}</td>
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
