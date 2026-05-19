import React, { useState, useMemo } from 'react';
import {
  FileText, Download, Camera, ClipboardList, BarChart3,
  MapPin, AlertTriangle, ChevronRight, Wrench, Package, ExternalLink, TrendingUp, Bot, Sparkles, Activity, Eye
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, ReferenceLine, BarChart, Bar, Cell, Tooltip, PieChart, Pie
} from 'recharts';
import { CommodityInspectionReport, RecommendedPart, MeasurementItem } from '../data/inspectionTypes';
import { StatusBadge } from './StatusBadge';
import { VisualMapping } from './VisualMapping';

interface InspectionReportProps {
  report: CommodityInspectionReport;
  unitId: string;
  onExportPO: (recommendations: RecommendedPart[]) => void;
}

const formatRupiah = (value: number) =>
  value >= 1_000_000 ? `Rp ${(value / 1_000_000).toFixed(0)} Jt` : `Rp ${value.toLocaleString('id-ID')}`;

const wearColor = (pct: number) =>
  pct >= 85 ? 'bg-red-500' : pct >= 70 ? 'bg-yellow-400' : 'bg-brand-green';

const wearTextColor = (pct: number) =>
  pct >= 85 ? 'text-red-600 dark:text-red-400' : pct >= 70 ? 'text-yellow-600 dark:text-yellow-400' : 'text-brand-green';

export function InspectionReport({ report, unitId, onExportPO }: InspectionReportProps) {
  const { metadata, measurements, evidence, recommendations } = report;
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  // Group measurements by category
  const categories = useMemo(() => {
    const groups: Record<string, MeasurementItem[]> = {};
    measurements.forEach(m => {
      const cat = m.category || 'General';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(m);
    });
    return groups;
  }, [measurements]);

  // Analytics computations
  const criticalCount = measurements.filter(m => m.actionStatus === 'Critical').length;
  const cautionCount = measurements.filter(m => m.actionStatus === 'Caution').length;
  const goodCount = measurements.filter(m => m.actionStatus === 'Good').length;
  const averageWear = measurements.length > 0 ? Math.round(measurements.reduce((acc, m) => acc + m.healthPercentage, 0) / measurements.length) : 0;
  const overallHealthScore = Math.max(0, 100 - averageWear);

  // Generate inspection history dynamically
  const inspectionHistory = useMemo(() => {
    const commodity = metadata.commodity;
    return [
      { id: `INS-2026-${commodity}-001`, date: metadata.inspectionDate, inspector: metadata.mechanicName, approvalDate: '2026-02-15' },
      { id: `INS-2025-${commodity}-089`, date: '2025-11-15', inspector: 'Dwi Cahyono', approvalDate: '2025-11-16' },
      { id: `INS-2025-${commodity}-042`, date: '2025-08-10', inspector: 'Ahmad Fauzi', approvalDate: '2025-08-11' }
    ];
  }, [metadata]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* ── A: METADATA HEADER (Unchanged or slightly improved) ── */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
          <div className="space-y-1">
            <h6 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">No. Inspeksi</h6>
            <p className="text-sm font-bold text-primary dark:text-foreground">{metadata.inspectionId}</p>
          </div>
          <div className="space-y-1">
            <h6 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Tanggal</h6>
            <p className="text-sm font-bold text-primary dark:text-foreground">
              {new Date(metadata.inspectionDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div className="space-y-1">
            <h6 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Inspektor</h6>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center text-[10px] font-bold text-brand-green">
                {metadata.mechanicName.charAt(0)}
              </div>
              <p className="text-sm font-bold text-primary dark:text-foreground truncate">{metadata.mechanicName}</p>
            </div>
          </div>
          <div className="space-y-1">
            <h6 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">SMU Unit</h6>
            <p className="text-sm font-bold text-primary dark:text-foreground">{metadata.serviceMeterUnit.toLocaleString()} Hrs</p>
          </div>
        </div>
        <div className="flex items-center gap-4 pl-6 border-l border-border hidden md:flex">
          <div className="text-right">
            <h6 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Health Status</h6>
            <StatusBadge status={metadata.overallStatus} size="lg" />
          </div>
        </div>
      </div>

      {/* ── B: EXECUTIVE SUMMARY WIDGETS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: OVERALL HEALTH */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-6 flex flex-col items-center justify-center">
          <h4 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">Overall Health</h4>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ value: overallHealthScore }, { value: 100 - overallHealthScore }]}
                  cx="50%" cy="50%"
                  innerRadius={45} outerRadius={60}
                  startAngle={90} endAngle={-270}
                  dataKey="value" stroke="none"
                >
                  <Cell fill={overallHealthScore >= 80 ? '#10B981' : overallHealthScore >= 60 ? '#F59E0B' : '#EF4444'} />
                  <Cell fill="#E5E7EB" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-brand-navy">{overallHealthScore}</span>
              <span className="text-[10px] text-muted-foreground font-semibold">/100</span>
            </div>
          </div>
          <div className="mt-4">
            <StatusBadge status={metadata.overallStatus} size="md" />
          </div>
        </div>

        {/* Card 2: URGENCY MATRIX */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-6 flex flex-col justify-center">
          <h4 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4 text-center">Urgency Matrix</h4>
          <div className="space-y-3 w-full max-w-[200px] mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs font-bold text-gray-600">Critical</span>
              </div>
              <span className="text-sm font-bold text-red-600">{criticalCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="text-xs font-bold text-gray-600">Caution</span>
              </div>
              <span className="text-sm font-bold text-yellow-600">{cautionCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-green"></div>
                <span className="text-xs font-bold text-gray-600">Good</span>
              </div>
              <span className="text-sm font-bold text-brand-green">{goodCount}</span>
            </div>
          </div>
        </div>

        {/* Card 3: COMPONENT CHECK */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-6 flex flex-col items-center justify-center">
          <h4 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">Component Check</h4>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ name: 'Done Check', value: measurements.length, color: '#10B981' }, { name: 'Not Yet', value: 0, color: '#E5E7EB' }]}
                  cx="50%" cy="50%"
                  innerRadius={40} outerRadius={60}
                  dataKey="value" stroke="none"
                >
                  <Cell fill="#10B981" />
                  <Cell fill="#E5E7EB" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
               <span className="text-xl font-bold text-brand-navy">{measurements.length}</span>
               <span className="text-[9px] text-muted-foreground font-semibold uppercase">Points</span>
            </div>
          </div>
          <div className="mt-4 flex gap-3 text-[10px] font-bold">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-brand-green"></div> Done</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-200"></div> Pending</div>
          </div>
        </div>
      </div>

      {/* ── B2. INSPECTION HISTORY TABLE ── */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-border bg-muted/20 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-brand-navy dark:text-brand-green" />
          <h3 className="text-sm font-bold text-primary dark:text-foreground uppercase tracking-tight">Inspection History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-separate border-spacing-0">
            <thead className="bg-muted/40 text-[10px] uppercase font-bold tracking-widest text-muted-foreground border-b border-border">
              <tr>
                <th className="px-5 py-3 border-b border-border font-bold">Inspection Date</th>
                <th className="px-5 py-3 border-b border-border font-bold">Report No</th>
                <th className="px-5 py-3 border-b border-border font-bold">Inspector Name</th>
                <th className="px-5 py-3 border-b border-border font-bold">Serial No</th>
                <th className="px-5 py-3 border-b border-border font-bold">Approval Date</th>
                <th className="px-5 py-3 border-b border-border font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {inspectionHistory.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground/90">{row.date}</td>
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-brand-navy dark:text-brand-green">{row.id}</td>
                  <td className="px-5 py-3.5 font-medium text-foreground/80">{row.inspector}</td>
                  <td className="px-5 py-3.5 font-semibold text-foreground/90">{unitId}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{row.approvalDate}</td>
                  <td className="px-5 py-3.5 text-center">
                    <button className="p-2 bg-muted/50 hover:bg-brand-navy hover:text-white dark:hover:bg-brand-green dark:hover:text-black rounded-lg transition-colors text-muted-foreground inline-flex">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── C: PO RECOMMENDATIONS ────────────────────────────────────────── */}
      {(() => {
        const [search, setSearch] = useState('');
        const [urgency, setUrgency] = useState('All');

        const filteredParts = recommendations.filter(p => {
          const matchesSearch = p.partNumber.toLowerCase().includes(search.toLowerCase()) || 
                              p.description.toLowerCase().includes(search.toLowerCase());
          const matchesUrgency = urgency === 'All' || p.urgency === urgency;
          return matchesSearch && matchesUrgency;
        });

        const handleExportExcel = () => {
          const headers = ['Part Number', 'Description', 'Qty', 'UoM', 'Urgency', 'Est Price'];
          const rows = filteredParts.map(p => [
            p.partNumber,
            p.description,
            p.quantity,
            p.uom,
            p.urgency,
            p.estimatedPrice || 0
          ]);
          
          const csvContent = [
            headers.join(','),
            ...rows.map(r => r.join(','))
          ].join('\n');

          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.setAttribute('href', url);
          link.setAttribute('download', `Recommended_Parts_${unitId}_${metadata.commodity}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        if (recommendations.length === 0) return (
          <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-5 flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center"><Wrench className="w-5 h-5 text-brand-green" /></div>
            <div>
              <p className="text-sm font-bold text-brand-green">Tidak Ada Part yang Perlu Diganti</p>
              <p className="text-xs text-muted-foreground font-bold mt-0.5">Semua komponen dalam batas normal. Lanjutkan monitoring sesuai jadwal PM.</p>
            </div>
          </div>
        );

        return (
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center gap-4 bg-muted/20">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-brand-green" />
                <h4 className="font-bold text-primary dark:text-foreground text-sm uppercase tracking-tight">Recommended Parts for PO</h4>
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
                <input 
                  type="text" 
                  placeholder="Search Part..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white dark:bg-muted border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green w-32 sm:w-40 font-bold"
                />
                <select 
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white dark:bg-muted border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green font-bold"
                >
                  <option value="All">All Status</option>
                  <option value="Critical">Critical Only</option>
                  <option value="Caution">Caution Only</option>
                </select>
                <button 
                  onClick={handleExportExcel}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-navy text-white rounded-lg text-xs font-bold hover:opacity-90 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Excel
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap border-separate border-spacing-0">
                <thead className="bg-muted/40 text-[10px] uppercase font-bold tracking-widest text-muted-foreground/70 border-b border-border">
                  <tr>
                    <th className="px-5 py-3 border-b border-border">Part Number</th>
                    <th className="px-4 py-3 border-b border-border">Description</th>
                    <th className="px-3 py-3 border-b border-border text-center">Qty</th>
                    <th className="px-3 py-3 border-b border-border text-center">UoM</th>
                    <th className="px-4 py-3 border-b border-border text-center">Urgency</th>
                    <th className="px-4 py-3 border-b border-border text-right">Est. Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredParts.length > 0 ? filteredParts.map((part) => (
                    <tr key={part.partNumber} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3 font-bold text-primary dark:text-brand-green text-xs">{part.partNumber}</td>
                      <td className="px-4 py-3 text-xs font-bold text-foreground/90">{part.description}</td>
                      <td className="px-3 py-3 text-center font-bold text-foreground">{part.quantity}</td>
                      <td className="px-3 py-3 text-center text-[10px] font-bold text-muted-foreground">{part.uom}</td>
                      <td className="px-4 py-3 text-center"><StatusBadge status={part.urgency} size="sm" /></td>
                      <td className="px-4 py-3 text-right font-bold text-primary dark:text-foreground text-xs">
                        {part.estimatedPrice != null ? formatRupiah(part.estimatedPrice) : '—'}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-5 py-8 text-center text-xs text-muted-foreground font-bold italic">
                        Tidak ada data yang sesuai dengan filter.
                      </td>
                    </tr>
                  )}
                </tbody>
                {filteredParts.length > 0 && (
                  <tfoot>
                    <tr className="bg-muted/20">
                      <td colSpan={5} className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Estimasi PO (Filtered)</td>
                      <td className="px-4 py-3 text-right font-bold text-brand-green text-sm">
                        {formatRupiah(filteredParts.reduce((sum, r) => sum + (r.estimatedPrice ?? 0) * r.quantity, 0))}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
            
            <div className="px-5 py-4 bg-muted/10 flex justify-between items-center">
              <span className="text-[10px] text-muted-foreground font-bold italic">Menampilkan {filteredParts.length} dari {recommendations.length} item</span>
              <button
                onClick={() => onExportPO(filteredParts)}
                disabled={filteredParts.length === 0}
                className="flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-green/20 hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileText className="w-4 h-4" />
                Add to PO Draft ({filteredParts.length} items)
              </button>
            </div>
          </div>
        );
      })()}

      {/* ── VISUAL SEPARATOR BETWEEN HEADER/SUMMARY & DETAILS ── */}
      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-dashed border-border"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-card px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-navy dark:text-brand-green border border-border rounded-full shadow-sm flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-brand-navy dark:text-brand-green animate-pulse" />
            Detailed Inspection Findings & Technical Data
          </span>
        </div>
      </div>

      {/* ── DETAILS WRAPPER CONTAINER ── */}
      <div className="bg-muted/10 border border-border rounded-2xl p-6 space-y-8 shadow-inner">
        {/* ── D: DETAILED INSPECTION FINDINGS ── */}

        {/* VISUAL COMPONENT MAP */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/20">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-green" />
            <h4 className="font-bold text-primary dark:text-foreground text-sm uppercase tracking-tight">Visual Component Map</h4>
          </div>
          <span className="text-[10px] text-muted-foreground font-bold font-mono">ID: {metadata.inspectionId}-VIS</span>
        </div>
        <div className="p-6">
          <VisualMapping commodityType={metadata.commodity} measurements={measurements} />
        </div>
      </div>

      {/* TECHNICAL MEASUREMENT BLOCKS (DETAILED) */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-primary dark:text-foreground uppercase tracking-tight">Technical Inspection Findings</h3>
          </div>
          <div className="flex items-center gap-4 bg-muted/30 px-4 py-2 rounded-xl border border-border/50">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-brand-green"></div>
               <span className="text-[10px] font-bold text-muted-foreground uppercase">Normal</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
               <span className="text-[10px] font-bold text-muted-foreground uppercase">Caution</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500"></div>
               <span className="text-[10px] font-bold text-muted-foreground uppercase">Critical</span>
             </div>
          </div>
        </div>

        {/* Global Wear Summary Chart (Mini Dashboard) */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
           <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-4 h-4 text-brand-green" />
              <h4 className="text-xs font-bold text-primary dark:text-foreground uppercase tracking-widest">Global Wear Distribution per Component Group</h4>
           </div>
           <div className="h-[120px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={Object.entries(categories).map(([name, items]) => ({
                    name,
                    wear: Math.max(...items.map(i => i.healthPercentage))
                 }))}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                    <XAxis dataKey="name" fontSize={9} fontWeight={700} stroke="var(--muted-foreground)" />
                    <Tooltip 
                       contentStyle={{ fontSize: 10, fontWeight: 700, borderRadius: 8, backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                       cursor={{ fill: 'var(--muted)', opacity: 0.1 }}
                    />
                    <Bar dataKey="wear" radius={[4, 4, 0, 0]} barSize={40}>
                       {(Object.entries(categories) as [string, MeasurementItem[]][]).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={Math.max(...entry[1].map(i => i.healthPercentage)) >= 85 ? '#ef4444' : Math.max(...entry[1].map(i => i.healthPercentage)) >= 70 ? '#facc15' : '#23a34e'} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {(Object.entries(categories) as [string, MeasurementItem[]][]).map(([category, items]) => (
          // ... (Rest of category rendering logic - keeping for context in my head)
          <div key={category} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden transition-all hover:shadow-md ring-1 ring-transparent hover:ring-brand-green/10">
            {/* Category Header */}
            <div className="px-6 py-4 border-b border-border flex items-center gap-4 bg-muted/10">
              <div className="w-12 h-12 bg-white dark:bg-muted rounded-xl border border-border overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                {items[0].imageUrl ? (
                  <img src={items[0].imageUrl} alt={category} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <Package className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-primary dark:text-foreground text-base uppercase tracking-tight">{category}</h4>
                <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                  {items.length} Points Measured — {metadata.commodity} Specs
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground font-bold italic mr-2">Status Group:</span>
                <StatusBadge 
                  status={items.some(i => i.actionStatus === 'Critical') ? 'Critical' : items.some(i => i.actionStatus === 'Caution') ? 'Caution' : 'Good'} 
                  size="sm" 
                />
              </div>
            </div>

            {/* Category Intelligence Summary (NEW) */}
            <div className="px-6 py-4 bg-brand-navy/[0.02] border-b border-border flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-brand-green" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-brand-navy dark:text-brand-green uppercase tracking-wider">Component Insight Summary</p>
                <div className="text-xs text-muted-foreground leading-relaxed font-medium">
                  {(() => {
                    const worstItem = [...items].sort((a, b) => b.healthPercentage - a.healthPercentage)[0];
                    const avgWear = Math.round(items.reduce((acc, curr) => acc + curr.healthPercentage, 0) / items.length);
                    const isCritical = items.some(i => i.actionStatus === 'Critical');
                    const isCaution = items.some(i => i.actionStatus === 'Caution');

                    if (isCritical) {
                      return (
                        <p>⚠️ <span className="font-bold text-red-600 dark:text-red-400">Tindakan Segera:</span> Grup {category} berada pada risiko tinggi dengan rata-rata keausan {avgWear}%. Komponen terburuk adalah <span className="font-bold">{worstItem.componentName} ({worstItem.healthPercentage}%)</span>. Disarankan penggantian segera untuk mencegah kerusakan struktural.</p>
                      );
                    } else if (isCaution) {
                      return (
                        <p>⚠️ <span className="font-bold text-yellow-600 dark:text-yellow-400">Perhatian:</span> Kondisi {category} menunjukkan keausan moderat ({avgWear}%). <span className="font-bold">{worstItem.componentName}</span> mendekati limit operasional. Jadwalkan penggantian dalam interval servis berikutnya untuk optimalisasi downtime.</p>
                      );
                    } else {
                      return (
                        <p>✅ <span className="font-bold text-brand-green">Status Optimal:</span> Seluruh komponen dalam grup {category} berfungsi dalam parameter standar (Avg Wear: {avgWear}%). Lanjutkan pemantauan rutin pada inspeksi berikutnya.</p>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 divide-y xl:divide-y-0 xl:divide-x divide-border">
              {/* Left Column: Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left whitespace-nowrap border-separate border-spacing-0">
                  <thead className="bg-muted/30 text-[9px] uppercase font-bold tracking-widest text-muted-foreground/60">
                    <tr>
                      <th className="px-6 py-3 border-b border-border font-bold">Component / Pos</th>
                      <th className="px-4 py-3 border-b border-border text-center">Actual Val</th>
                      <th className="px-4 py-3 border-b border-border text-center">Standard</th>
                      <th className="px-4 py-3 border-b border-border">Wear %</th>
                      <th className="px-4 py-3 border-b border-border text-center">Est. Life</th>
                      <th className="px-6 py-3 border-b border-border text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-primary dark:text-foreground">{item.componentName}</div>
                          <div className="text-[10px] font-bold text-muted-foreground mt-0.5">Pos: {item.position ?? 'N/A'}</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`text-sm font-bold ${wearTextColor(item.healthPercentage)}`}>
                            {item.actualValue} <span className="text-[9px] font-bold opacity-60 lowercase">{item.measurementUnit}</span>
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center font-bold text-muted-foreground/70">
                          {item.standardValue ?? '—'}
                        </td>
                        <td className="px-4 py-4 min-w-[120px]">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all ${wearColor(item.healthPercentage)}`} 
                                style={{ width: `${item.healthPercentage}%` }} 
                              />
                            </div>
                            <span className={`text-[11px] font-bold w-8 text-right ${wearTextColor(item.healthPercentage)}`}>
                              {item.healthPercentage}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center font-bold text-foreground">
                          {item.estimatedRemainingLife ? `${item.estimatedRemainingLife.toLocaleString()} H` : '—'}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <StatusBadge status={item.actionStatus} size="sm" variant="dot-label" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Right Column: Historical Trend Chart */}
              <div className="p-6 bg-muted/5 flex flex-col justify-center min-h-[300px]">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Wear Trend Analysis (Historical)
                  </h5>
                  <div className="flex gap-4">
                     <div className="flex items-center gap-1.5">
                       <div className="w-2.5 h-0.5 bg-brand-green"></div>
                       <span className="text-[9px] font-bold text-muted-foreground">Actual %</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                       <div className="w-2.5 h-0.5 bg-red-500 dashed border-t-2 border-red-500"></div>
                       <span className="text-[9px] font-bold text-red-500 uppercase">Limit</span>
                     </div>
                  </div>
                </div>
                
                <div className="flex-1 h-full min-h-[220px]">
                  {items[0].history ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={items[0].history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                        <XAxis 
                          dataKey="smu" 
                          stroke="var(--muted-foreground)" 
                          fontSize={10} 
                          fontWeight={700}
                          tickFormatter={(v) => `${v} H`}
                        />
                        <YAxis 
                          domain={[0, 100]} 
                          stroke="var(--muted-foreground)" 
                          fontSize={10} 
                          fontWeight={700} 
                          tickFormatter={(v) => `${v}%`}
                        />
                        <RechartsTooltip 
                          contentStyle={{ 
                            fontSize: 11, 
                            fontWeight: 700, 
                            borderRadius: 12, 
                            backgroundColor: 'var(--card)', 
                            border: '1px solid var(--border)',
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                          }}
                          labelFormatter={(v) => `SMU: ${v} Hrs`}
                        />
                        <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="4 4" label={{ position: 'right', value: 'LIMIT', fill: '#ef4444', fontSize: 10, fontWeight: 700 }} />
                        <Line 
                          type="monotone" 
                          dataKey="wearPercentage" 
                          stroke="#10B981" 
                          strokeWidth={4} 
                          dot={{ r: 6, strokeWidth: 2, fill: '#fff' }} 
                          activeDot={{ r: 8, strokeWidth: 0 }} 
                          animationDuration={1500}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-border rounded-2xl bg-muted/20 p-8 text-center">
                       <BarChart3 className="w-10 h-10 text-muted-foreground/30 mb-2" />
                       <p className="text-xs text-muted-foreground font-bold italic">No historical trend data available for this component series yet.</p>
                       <p className="text-[10px] text-muted-foreground/60 max-w-[200px] mt-1">Histori akan muncul secara otomatis setelah inspeksi ke-2 selesai diinput ke sistem MMA.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FIELD EVIDENCE (SYSTEMATIC GRID) */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <Camera className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-primary dark:text-foreground uppercase tracking-tight">Inspection Field Evidence</h3>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Mechanic Notes (Left) */}
          <div className="xl:col-span-1 bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList className="w-4 h-4 text-brand-green" />
              <h4 className="font-bold text-primary dark:text-foreground text-xs uppercase tracking-widest">Inspector Notes</h4>
            </div>
            <div className="flex-1 bg-muted/20 rounded-xl p-5 border border-border/50 relative">
               <span className="absolute -top-2 -left-2 text-4xl text-brand-green/20 font-serif lowercase italic">"</span>
               <p className="text-sm text-foreground/80 leading-relaxed italic font-medium relative z-10">
                 {evidence.mechanicNotes}
               </p>
               <span className="absolute -bottom-6 -right-2 text-4xl text-brand-green/20 font-serif lowercase italic rotate-180">"</span>
            </div>
            <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-xs font-bold text-brand-green">
                 {metadata.mechanicName.charAt(0)}
               </div>
               <div>
                  <p className="text-[11px] font-bold text-primary dark:text-foreground">{metadata.mechanicName}</p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase">{metadata.mechanicId} • Senior Technician</p>
               </div>
            </div>
          </div>

          {/* Photo Gallery Grid (Right) */}
          <div className="xl:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-brand-green" />
                <h4 className="font-bold text-primary dark:text-foreground text-xs uppercase tracking-widest">Evidence Photo Gallery</h4>
              </div>
              <span className="text-[10px] bg-muted px-2 py-0.5 rounded font-bold text-muted-foreground uppercase">{evidence.photoUrls.length} Files</span>
            </div>
            
            {evidence.photoUrls.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {evidence.photoUrls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhoto(url)}
                    className="aspect-[4/3] rounded-xl overflow-hidden border border-border hover:border-brand-green transition-all group relative bg-muted"
                  >
                    <img src={url} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <div className="flex items-center justify-between w-full">
                         <span className="text-[10px] font-bold text-white uppercase tracking-wider">Fig. {idx + 1}</span>
                         <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-muted/20 rounded-2xl border-2 border-dashed border-border">
                <Camera className="w-12 h-12 text-muted-foreground/20 mb-3" />
                <p className="text-xs text-muted-foreground font-bold italic">No physical evidence photos uploaded for this inspection.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      </div> {/* ── END OF DETAILS WRAPPER CONTAINER ── */}

      {/* Photo Lightbox */}
      {activePhoto && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setActivePhoto(null)}
        >
          <img src={activePhoto} alt="Evidence detail" className="max-w-3xl max-h-[80vh] rounded-2xl object-contain shadow-2xl" />
          <button className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-red-400 transition-colors" onClick={() => setActivePhoto(null)}>✕</button>
        </div>
      )}

    </div>
  );
}
