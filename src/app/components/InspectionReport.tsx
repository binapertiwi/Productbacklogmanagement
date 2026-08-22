import React, { useState, useMemo } from 'react';
import {
  FileText, Download, Camera, ClipboardList, BarChart3,
  MapPin, AlertTriangle, ChevronRight, Wrench, Package, ExternalLink, TrendingUp, Bot, Sparkles, Activity, Eye,
  CheckCircle2, XCircle
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
  onExportPO: (recommendations: RecommendedPart[]) => void;
  isInternal?: boolean;
}

import { ReportComponentSummaryTable } from './ReportComponentSummaryTable';
import { ReportRecommendedPartsTable } from './ReportRecommendedPartsTable';

const formatRupiah = (value: number) =>
  value >= 1_000_000 ? `Rp ${(value / 1_000_000).toFixed(0)} Jt` : `Rp ${value.toLocaleString('id-ID')}`;

const wearColor = (pct: number) =>
  pct >= 85 ? 'bg-red-500' : pct >= 70 ? 'bg-yellow-400' : 'bg-brand-green';

const wearTextColor = (pct: number) =>
  pct >= 85 ? 'text-red-600 dark:text-red-400' : pct >= 70 ? 'text-yellow-600 dark:text-yellow-400' : 'text-brand-green';

export function InspectionReport({ report, unitId, onExportPO, isInternal }: InspectionReportProps) {
  const { metadata, measurements, evidence, recommendations } = report;
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [selectedInspectionId, setSelectedInspectionId] = useState<string | null>(null);

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
      
      {/* ── HEADER / SUMMARY SECTION ── */}
      <div className={`space-y-6 sm:space-y-8 ${selectedInspectionId ? 'print:hidden' : ''}`}>
      
        {/* ── TOP TITLE & CONTEXT ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-primary dark:text-foreground">Detail Inspection Report</h2>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">Laporan lengkap hasil inspeksi komoditas {metadata.commodity}</p>
          </div>
        </div>
        
        {/* ── B: EXECUTIVE SUMMARY WIDGETS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: OVERALL HEALTH */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 flex flex-col items-center justify-center">
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
        <div className="bg-card rounded-xl shadow-sm border border-border p-5 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-primary dark:text-foreground font-bold text-sm uppercase tracking-tight">Urgency Matrix</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between p-2 bg-destructive/5 rounded-lg border border-destructive/10">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-destructive" />
                <span className="text-xs text-destructive font-bold">Critical</span>
              </div>
              <span className="text-lg font-bold text-destructive">{criticalCount}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-amber-500/5 rounded-lg border border-amber-500/10">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-xs text-amber-700 dark:text-amber-400 font-bold">Caution</span>
              </div>
              <span className="text-lg font-bold text-amber-600">{cautionCount}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-brand-green/5 rounded-lg border border-brand-green/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                <span className="text-xs text-brand-green font-bold">Good</span>
              </div>
              <span className="text-lg font-bold text-brand-green">{goodCount}</span>
            </div>
          </div>
        </div>

        {/* Card 3: COMPONENT CHECK */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 flex flex-col items-center justify-center">
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
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-muted"></div> Pending</div>
          </div>
        </div>
      </div>

      {/* ── C: PO RECOMMENDATIONS ────────────────────────────────────────── */}
      <ReportRecommendedPartsTable 
        initialParts={recommendations} 
        unitId={unitId} 
        commodityName={metadata.commodity} 
        isInternal={isInternal} 
      />

      {/* ── B2. INSPECTION HISTORY TABLE ── */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="px-4 sm:px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-muted/30">
          <div>
            <h3 className="text-primary dark:text-foreground font-bold font-display text-base sm:text-lg tracking-tight">Inspection History</h3>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">Riwayat inspeksi berkala dan laporan teknis unit</p>
          </div>
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
                <tr 
                  key={idx} 
                  className={`hover:bg-muted/30 cursor-pointer border-l-4 transition-all duration-200 ${
                    selectedInspectionId === row.id 
                      ? 'bg-brand-navy/5 dark:bg-brand-green/5 border-l-brand-green font-medium' 
                      : 'border-l-transparent'
                  }`}
                  onClick={() => setSelectedInspectionId(row.id === selectedInspectionId ? null : row.id)}
                >
                  <td className="px-5 py-3.5 font-semibold text-foreground/90">{row.date}</td>
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-brand-navy dark:text-brand-green">{row.id}</td>
                  <td className="px-5 py-3.5 font-medium text-foreground/80">{row.inspector}</td>
                  <td className="px-5 py-3.5 font-semibold text-foreground/90">{unitId}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{row.approvalDate}</td>
                  <td className="px-5 py-3.5 text-center">
                    <button 
                      className={`p-2 rounded-lg transition-all duration-200 inline-flex items-center justify-center hover:scale-105 active:scale-95 ${
                        selectedInspectionId === row.id 
                          ? 'bg-brand-green text-white dark:text-background shadow-sm shadow-brand-green/20 ring-2 ring-brand-green/20 scale-105' 
                          : 'bg-muted/50 hover:bg-brand-navy hover:text-white dark:hover:bg-brand-green dark:hover:text-background text-muted-foreground'
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      {selectedInspectionId && (
        <div id="printable-area" className="print:m-0 print:p-0 print:border-none space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 ease-out">
          
          {/* ── METADATA HEADER (Selected Inspection Report) ── */}
          {(() => {
            const selectedRow = inspectionHistory.find(r => r.id === selectedInspectionId);
            if (!selectedRow) return null;
            
            const isLatest = selectedRow.id === inspectionHistory[0].id;
            const isSecond = selectedRow.id === inspectionHistory[1]?.id;
            
            const displaySMU = isLatest 
              ? metadata.serviceMeterUnit 
              : isSecond 
                ? metadata.serviceMeterUnit - 1450 
                : metadata.serviceMeterUnit - 2800;
                
            const displayStatus = isLatest 
              ? metadata.overallStatus 
              : isSecond 
                ? 'Caution' 
                : 'Good';

            return (
              <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 flex-1">
                  <div className="space-y-1">
                    <h6 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">No. Inspeksi</h6>
                    <p className="text-sm font-bold text-primary dark:text-foreground font-mono">{selectedRow.id}</p>
                  </div>
                  <div className="space-y-1">
                    <h6 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Tanggal</h6>
                    <p className="text-sm font-bold text-primary dark:text-foreground">
                      {new Date(selectedRow.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h6 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Inspektor</h6>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center text-[10px] font-bold text-brand-green">
                        {selectedRow.inspector.charAt(0)}
                      </div>
                      <p className="text-sm font-bold text-primary dark:text-foreground truncate">{selectedRow.inspector}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h6 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">SMU Unit</h6>
                    <p className="text-sm font-bold text-primary dark:text-foreground">{displaySMU.toLocaleString()} Hrs</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 md:pl-6 md:border-l md:border-border justify-between sm:justify-end">
                  <div className="text-left md:text-right">
                    <h6 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Health Status</h6>
                    <StatusBadge status={displayStatus} size="lg" />
                  </div>
                  <button 
                    onClick={() => window.print()}
                    className="print:hidden flex items-center justify-center gap-1.5 px-4 py-2 bg-card hover:bg-muted border border-border text-brand-navy dark:text-brand-green rounded-xl transition-all shadow-sm group text-xs font-bold"
                  >
                    <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            );
          })()}

          {/* ── SECTION DIVIDER & HEADER FOR DETAILED FINDINGS ── */}
          <div className="pt-2 pb-1 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-primary dark:text-foreground flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-green animate-pulse shrink-0" />
                Detailed Inspection Findings & Technical Data
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                Parameter dan pengukuran teknis komprehensif untuk laporan <span className="font-mono font-bold text-primary dark:text-foreground">{selectedInspectionId}</span>
              </p>
            </div>
          </div>

          {/* ── D: DETAILED INSPECTION FINDINGS ── */}

            {/* VISUAL COMPONENT MAP */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="px-4 sm:px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-muted/30">
                <div>
                  <h4 className="font-bold text-primary dark:text-foreground font-display text-base sm:text-lg tracking-tight">Visual Component Map</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">Pemetaan visual lokasi dan kondisi keausan komponen</p>
                </div>
                <span className="text-xs text-muted-foreground font-bold font-mono">ID: {metadata.inspectionId}-VIS</span>
              </div>
              <div className="p-6">
                <VisualMapping commodityType={metadata.commodity} measurements={measurements} />
              </div>
            </div>

            {/* TECHNICAL MEASUREMENT BLOCKS (DETAILED) */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
                <div>
                  <h3 className="text-primary dark:text-foreground font-bold font-display text-base sm:text-lg tracking-tight">Technical Inspection Findings</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">Hasil pengukuran keausan dan kondisi fisik komponen</p>
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

              {/* NEW: Comprehensive Component Summary Table */}
              <ReportComponentSummaryTable />

              {(Object.entries(categories) as [string, MeasurementItem[]][]).map(([category, items]) => (
                <CategorySection key={category} category={category} items={items} metadata={metadata} />
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
                     <span className="absolute -top-2 -left-2 text-4xl text-brand-green/20 font-serif lowercase italic">&ldquo;</span>
                     <p className="text-sm text-foreground/80 leading-relaxed italic font-medium relative z-10">
                       {evidence.mechanicNotes}
                     </p>
                     <span className="absolute -bottom-6 -right-2 text-4xl text-brand-green/20 font-serif lowercase italic rotate-180">&rdquo;</span>
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
          </div>
        )}

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

function CategorySection({ category, items, metadata }: { category: string, items: MeasurementItem[], metadata: any }) {
  const [selectedPointIdx, setSelectedPointIdx] = useState<number | null>(null);
  
  const historyData = items[0]?.history || [];
  
  // Dummy logic to adjust values based on selected historical point
  const displayItems = items.map(item => {
    if (selectedPointIdx === null || !historyData[selectedPointIdx]) return item;
    
    // Create some dummy variation for the historical view
    const histPoint = historyData[selectedPointIdx];
    const wearFactor = (histPoint.wearPercentage || 50) / 100;
    
    return {
      ...item,
      healthPercentage: Math.round(item.healthPercentage * wearFactor),
      estimatedRemainingLife: item.estimatedRemainingLife ? Math.round(item.estimatedRemainingLife / wearFactor) : undefined
    };
  });

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden transition-all hover:shadow-md ring-1 ring-transparent hover:ring-brand-green/10">
      {/* Category Header */}
      <div className="px-6 py-4 border-b border-border flex items-center gap-4 bg-muted/10">
        <div className="w-12 h-12 bg-muted rounded-xl border border-border overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
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

      {/* Category Intelligence Summary */}
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
                  <p>⚠️ <span className="font-bold text-red-600 dark:text-red-400">Tindakan Segera:</span> Grup {category} berada pada risiko tinggi dengan rata-rata keausan {avgWear}%. Komponen terburuk adalah <span className="font-bold">{worstItem.componentName} ({worstItem.healthPercentage}%)</span>. Disarankan penggantian segera.</p>
                );
              } else if (isCaution) {
                return (
                  <p>⚠️ <span className="font-bold text-yellow-600 dark:text-yellow-400">Perhatian:</span> Kondisi {category} menunjukkan keausan moderat ({avgWear}%). Jadwalkan penggantian dalam interval servis berikutnya.</p>
                );
              } else {
                return (
                  <p>✅ <span className="font-bold text-brand-green">Status Optimal:</span> Seluruh komponen dalam grup {category} berfungsi dalam parameter standar.</p>
                );
              }
            })()}
          </div>
        </div>
      </div>

      {/* NEW: Wide Summary Table */}
      <div className="px-6 py-4 border-b border-border">
        <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Summary (Seluruh Komponen)</h5>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left whitespace-nowrap border-separate border-spacing-0">
            <thead className="bg-muted/30 text-[9px] uppercase font-bold tracking-widest text-muted-foreground/60">
              <tr>
                <th className="px-4 py-2 border-b border-border font-bold">Component</th>
                <th className="px-4 py-2 border-b border-border text-center">Standard</th>
                <th className="px-4 py-2 border-b border-border text-center">Wear %</th>
                <th className="px-4 py-2 border-b border-border text-center">Est. Life</th>
                <th className="px-4 py-2 border-b border-border text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-2 font-bold text-primary dark:text-foreground">{item.componentName}</td>
                  <td className="px-4 py-2 text-center text-muted-foreground">{item.standardValue ?? '—'}</td>
                  <td className="px-4 py-2 text-center">
                    <span className={`font-bold ${wearTextColor(item.healthPercentage)}`}>{item.healthPercentage}%</span>
                  </td>
                  <td className="px-4 py-2 text-center text-foreground font-bold">
                    {item.estimatedRemainingLife ? `${item.estimatedRemainingLife.toLocaleString()} H` : '—'}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <StatusBadge status={item.actionStatus} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 divide-y xl:divide-y-0 xl:divide-x divide-border">
        {/* Left Column: Detailed Technical Table (L/R split) */}
        <div className="overflow-x-auto p-4">
          <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
            Detail Pengukuran (Kiri / Kanan) {selectedPointIdx !== null && <span className="text-brand-green ml-2">Point Selected</span>}
          </h5>
          <table className="w-full text-xs text-left whitespace-nowrap border-collapse">
            <thead className="bg-transparent text-[9px] uppercase font-bold tracking-widest text-muted-foreground/60 border-b border-border/50">
              <tr>
                <th className="px-4 py-3">Component / Pos</th>
                <th className="px-4 py-3 text-center">HM Install</th>
                <th className="px-4 py-3 text-center">Life Time</th>
                <th className="px-4 py-3 text-center">Measurement</th>
                <th className="px-4 py-3 text-center">Worn %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {displayItems.map((item) => {
                let wear = item.healthPercentage;
                let meas = parseFloat(String(item.actualValue)) || 120;
                
                if (selectedPointIdx !== null && historyData[selectedPointIdx]) {
                   wear = historyData[selectedPointIdx].wearPercentage;
                   meas = 145 - (wear / 100) * 20; 
                }
                
                const rightWear = Math.max(0, wear - 4);
                const rightMeas = meas + 1.2;

                return (
                  <React.Fragment key={item.id}>
                    <tr className="hover:bg-muted/10 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-bold text-primary dark:text-foreground text-xs">{item.componentName} LH</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Pos: L</p>
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-primary dark:text-foreground">13476 H</td>
                      <td className="px-4 py-3 text-center font-bold text-primary dark:text-foreground">1044.5 H</td>
                      <td className="px-4 py-3 text-center font-bold text-red-500">{meas.toFixed(1)} mm</td>
                      <td className="px-4 py-3 text-center font-bold text-red-500">{wear.toFixed(1)}%</td>
                    </tr>
                    <tr className="hover:bg-muted/10 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-bold text-primary dark:text-foreground text-xs">{item.componentName} RH</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Pos: R</p>
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-primary dark:text-foreground">13476 H</td>
                      <td className="px-4 py-3 text-center font-bold text-primary dark:text-foreground">1044.5 H</td>
                      <td className="px-4 py-3 text-center font-bold text-red-500">{rightMeas.toFixed(1)} mm</td>
                      <td className="px-4 py-3 text-center font-bold text-red-500">{rightWear.toFixed(1)}%</td>
                    </tr>
                  </React.Fragment>
                );
              })}
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
            {historyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  onClick={(e) => {
                    if (e && e.activeTooltipIndex !== undefined) {
                      setSelectedPointIdx(e.activeTooltipIndex);
                    }
                  }}
                  className="cursor-pointer"
                >
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
                    activeDot={{ r: 8, strokeWidth: 0, fill: '#10B981' }} 
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-border rounded-2xl bg-muted/20 p-8 text-center">
                 <BarChart3 className="w-10 h-10 text-muted-foreground/30 mb-2" />
                 <p className="text-xs text-muted-foreground font-bold italic">No historical trend data available.</p>
              </div>
            )}
            {selectedPointIdx !== null && (
              <div className="mt-2 text-center">
                <button onClick={() => setSelectedPointIdx(null)} className="text-[10px] font-bold text-brand-green hover:underline">Reset Selection</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
