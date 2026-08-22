import React, { useState, useMemo } from 'react';
import { Camera, Download, Package, FileText, ClipboardList, Bot, AlertTriangle, ChevronRight, Activity, Calendar, User, Clock, Shield, Search, Eye, CheckCircle2, XCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { StatusBadge } from './StatusBadge';
import { RecommendedPart, CommodityInspectionReport } from '../data/inspectionTypes';
import { ReportRecommendedPartsTable } from './ReportRecommendedPartsTable';

interface FCGReportLayoutProps {
  unit: {
    serialNumber: string;
    model: string;
    customer: string;
    site: string;
    hoursOperated: number;
    lastInspection: string;
    overallHealth: string;
  };
  activeReport?: CommodityInspectionReport;
  onExportPO: (recommendations: RecommendedPart[]) => void;
  isInternal?: boolean;
}

interface FCGComponent {
  component: string;
  category: string;
  size: string;
  brand: string;
  hmKmInstall: string;
  plantReplacementDate: string;
  action: string;
  partNumber: string;
  productionNumber: string;
  qty: number;
  condition: string;
  remark: string;
  hoseLocation: string;
  partDesc: string;
  installDate: string;
  uom: string;
  recommendation: string;
}

const FCG_COMPONENTS_MOCK: FCGComponent[] = [
  {
    component: "Main Hydraulic Hose (Pump to Valve)",
    category: "Fluid Connector",
    size: "1.25 inch (DN32)",
    brand: "Gates MegaSys",
    hmKmInstall: "4,500 Hrs",
    plantReplacementDate: "2026-08-15",
    action: "Replace immediately",
    partNumber: "20Y-60-31650",
    productionNumber: "GAT-2024-0987-AX",
    qty: 1,
    condition: "Critical - Severe abrasion & external steel wire reinforcement exposure",
    remark: "External sleeve is torn, pressure drops detected on differential gauge",
    hoseLocation: "Main Pump Outlet to Control Valve Inlet Block",
    partDesc: "High-Pressure 4-Spiral Steel Wire Reinforced Hose Assy",
    installDate: "2024-05-12",
    uom: "Pcs",
    recommendation: "Immediate replacement with OEM Gates MegaSys hose to prevent burst downtime"
  },
  {
    component: "Travel Motor Hose (LH Inner)",
    category: "Fluid Connector",
    size: "0.75 inch (DN20)",
    brand: "Komatsu Genuine OEM",
    hmKmInstall: "8,200 Hrs",
    plantReplacementDate: "2026-11-20",
    action: "Monitor closely",
    partNumber: "20Y-60-41550",
    productionNumber: "KOM-2023-8841-B",
    qty: 2,
    condition: "Caution - Slight aging cracks on outer rubber cover",
    remark: "Surface micro-cracking observed, no wire mesh exposure or leaks present",
    hoseLocation: "Lower Frame LH Travel Motor Connector Port A",
    partDesc: "Medium-Pressure Steel Wire Braided Hydraulic Hose Assy",
    installDate: "2023-09-18",
    uom: "Pcs",
    recommendation: "Inspect every 250 Hrs interval, schedule replacement at next PM 500 session"
  },
  {
    component: "Boom Cylinder Line Hose A",
    category: "Fluid Connector",
    size: "1.00 inch (DN25)",
    brand: "Bridgestone",
    hmKmInstall: "9,000 Hrs",
    plantReplacementDate: "2027-01-15",
    action: "Good",
    partNumber: "20Y-60-31120",
    productionNumber: "BST-2024-1122-C",
    qty: 1,
    condition: "Good - Perfect structural integrity",
    remark: "No leakage, protective spiral guard sleeve is intact and in solid condition",
    hoseLocation: "Main Frame distributor to RH Boom Cylinder Head Port",
    partDesc: "High-Pressure multi-spiral wire reinforcement line hose",
    installDate: "2024-09-05",
    uom: "Pcs",
    recommendation: "No immediate action required, continue standard routine inspection"
  },
  {
    component: "Bucket Cylinder Line Guard",
    category: "Fluid Guard",
    size: "N/A",
    brand: "Bina Pertiwi Custom",
    hmKmInstall: "9,800 Hrs",
    plantReplacementDate: "2027-06-10",
    action: "Good",
    partNumber: "BP-FG-800-09",
    productionNumber: "BP-2025-FG09",
    qty: 1,
    condition: "Good - Guard is fully secured and structurally aligned",
    remark: "Heavy-duty steel mesh protection sleeve has minor scratches but zero deformation",
    hoseLocation: "Bucket cylinder arm mounting bracket pipeline shield",
    partDesc: "Heavy Duty Anti-Burst Metal Guard Shell Protective Wrap",
    installDate: "2025-01-10",
    uom: "Set",
    recommendation: "Ensure mounting bolts remain tightened to standard torque on next PM"
  }
];

const FCG_RECOMMENDED_PARTS: RecommendedPart[] = [
  {
    partNumber: "20Y-60-31650",
    description: "Hose Assy High Pressure (Pump-to-Valve)",
    quantity: 1,
    uom: "Pcs",
    urgency: "Critical",
    estimatedPrice: 1850000
  },
  {
    partNumber: "07012-70095",
    description: "O-Ring Seal (NBR - Standard)",
    quantity: 10,
    uom: "Pcs",
    urgency: "Critical",
    estimatedPrice: 45000
  },
  {
    partNumber: "20Y-60-41550",
    description: "Hose Assy Medium Pressure (Travel LH)",
    quantity: 2,
    uom: "Pcs",
    urgency: "Caution",
    estimatedPrice: 1200000
  },
  {
    partNumber: "07260-24155",
    description: "Hydraulic Split Flange Clamp 1.25\"",
    quantity: 4,
    uom: "Pcs",
    urgency: "Caution",
    estimatedPrice: 280000
  }
];

const INSPECTION_HISTORY_MOCK = [
  { id: 'INS-2026-FCG-001', date: '2026-02-21', inspector: 'Ahmad Fauzi', approvalDate: '2026-02-22' },
  { id: 'INS-2025-FCG-089', date: '2025-11-15', inspector: 'Dwi Cahyono', approvalDate: '2025-11-16' },
  { id: 'INS-2025-FCG-042', date: '2025-08-10', inspector: 'Ahmad Fauzi', approvalDate: '2025-08-11' },
];

const PLACEHOLDER_PHOTOS = [
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
];

export function FCGReportLayout({ unit, activeReport, onExportPO, isInternal }: FCGReportLayoutProps) {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [selectedInspectionId, setSelectedInspectionId] = useState<string | null>(null);

  // Chart Data Dummies
  const componentCheckData = [
    { name: 'Done Check', value: 42, color: '#10B981' },
    { name: 'Not Yet', value: 8, color: '#E5E7EB' }
  ];

  const tirapDistributionData = [
    { name: 'Merah (Critical)', value: 5, color: '#EF4444' },
    { name: 'Kuning (Caution)', value: 14, color: '#F59E0B' },
    { name: 'Hijau (Good)', value: 23, color: '#10B981' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* ── HEADER / SUMMARY MAIN WRAPPER CONTAINER ── */}
      <div className={`space-y-8 bg-card p-6 rounded-2xl border border-border ${selectedInspectionId ? 'print:hidden' : ''}`}>
      
      {/* ── 1. EXECUTIVE SUMMARY WIDGETS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1: OVERALL HEALTH */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 flex flex-col items-center justify-center">
          <h4 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">Overall Health</h4>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ value: 72 }, { value: 28 }]}
                  cx="50%" cy="50%"
                  innerRadius={45} outerRadius={60}
                  startAngle={90} endAngle={-270}
                  dataKey="value" stroke="none"
                >
                  <Cell fill="#F59E0B" />
                  <Cell fill="#E5E7EB" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-brand-navy">72</span>
              <span className="text-[10px] text-muted-foreground font-semibold">/100</span>
            </div>
          </div>
          <div className="mt-4">
            <StatusBadge status="Caution" size="md" />
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
              <span className="text-lg font-bold text-destructive">5</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-amber-500/5 rounded-lg border border-amber-500/10">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-xs text-amber-700 dark:text-amber-400 font-bold">Caution</span>
              </div>
              <span className="text-lg font-bold text-amber-600">14</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-brand-green/5 rounded-lg border border-brand-green/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                <span className="text-xs text-brand-green font-bold">Good</span>
              </div>
              <span className="text-lg font-bold text-brand-green">23</span>
            </div>
          </div>
        </div>

        {/* Card 3: COMPONENT CHECK */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 flex flex-col items-center justify-center">
          <h4 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">Component Check</h4>
          <div className="w-full h-32 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={componentCheckData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" stroke="none">
                  {componentCheckData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <RechartsTooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-brand-navy">42</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center gap-4 text-[10px] font-semibold text-muted-foreground">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-brand-green"></div> Done</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-200"></div> Not Yet</div>
          </div>
        </div>

        {/* Card 4: DISTRIBUTION OF TIRAP */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 flex flex-col items-center justify-center">
          <h4 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">Distribution of Tirap</h4>
          <div className="w-full h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={tirapDistributionData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" stroke="none">
                  {tirapDistributionData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <RechartsTooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center justify-center gap-3 text-[10px] font-semibold text-muted-foreground">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Cr</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Ca</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-brand-green"></div> Go</div>
          </div>
        </div>
      </div>

      {/* ── 2. RECOMMENDED PARTS FOR PO ── */}
      <ReportRecommendedPartsTable 
        initialParts={FCG_RECOMMENDED_PARTS} 
        unitId={unit.serialNumber} 
        commodityName="FCG" 
        isInternal={isInternal} 
      />

      {/* ── 3. INSPECTION HISTORY TABLE ── */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-border bg-muted/50 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-brand-navy" />
          <h3 className="text-sm font-bold text-primary dark:text-foreground uppercase tracking-tight">Inspection History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-[10px] uppercase font-bold tracking-widest text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-3 font-bold">Inspection Date</th>
                <th className="px-6 py-3 font-bold">Report No</th>
                <th className="px-6 py-3 font-bold">Inspector Name</th>
                <th className="px-6 py-3 font-bold">Serial No</th>
                <th className="px-6 py-3 font-bold">Approval Date</th>
                <th className="px-6 py-3 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {INSPECTION_HISTORY_MOCK.map((row, idx) => (
                <tr 
                  key={idx} 
                  className={`hover:bg-muted/50 cursor-pointer border-l-4 transition-all duration-200 ${
                    selectedInspectionId === row.id 
                      ? 'bg-brand-navy/5 dark:bg-brand-green/5 border-l-brand-green font-medium' 
                      : 'border-l-transparent'
                  }`}
                  onClick={() => setSelectedInspectionId(row.id === selectedInspectionId ? null : row.id)}
                >
                  <td className="px-6 py-4 font-semibold text-foreground">{row.date}</td>
                  <td className="px-6 py-4 font-mono text-xs font-bold text-brand-navy">{row.id}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{row.inspector}</td>
                  <td className="px-6 py-4 font-semibold text-foreground">{unit.serialNumber}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.approvalDate}</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      className={`p-2 rounded-lg transition-all duration-200 inline-flex items-center justify-center hover:scale-105 active:scale-95 ${
                        selectedInspectionId === row.id 
                          ? 'bg-brand-green text-white shadow-sm shadow-brand-green/20 ring-2 ring-brand-green/20 scale-105' 
                          : 'bg-muted hover:bg-brand-navy hover:text-white text-muted-foreground'
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
      </div> {/* ── END OF HEADER / SUMMARY MAIN WRAPPER CONTAINER ── */}

      {selectedInspectionId && (
        <div id="printable-area" className="print:m-0 print:p-0 print:border-none mt-12 pt-12 border-t border-border space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 ease-out">
          
          {/* ── METADATA HEADER (Moved to Item Inspection Details & Dynamic) ── */}
          {(() => {
            const selectedRow = INSPECTION_HISTORY_MOCK.find(r => r.id === selectedInspectionId);
            if (!selectedRow) return null;
            
            const isLatest = selectedRow.id === INSPECTION_HISTORY_MOCK[0].id;
            const isSecond = selectedRow.id === INSPECTION_HISTORY_MOCK[1]?.id;
            
            const displaySMU = isLatest 
              ? unit.hoursOperated 
              : isSecond 
                ? unit.hoursOperated - 1200 
                : unit.hoursOperated - 2500;
                
            const displayStatus = isLatest 
              ? unit.overallHealth 
              : isSecond 
                ? 'Caution' 
                : 'Good';

            return (
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
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
                <div className="flex items-center gap-6 pl-6 border-l border-border hidden md:flex">
                  <div className="text-right">
                    <h6 className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Health Status</h6>
                    <StatusBadge status={displayStatus} size="lg" />
                  </div>
                  <button 
                    onClick={() => window.print()}
                    className="print:hidden flex flex-col items-center justify-center gap-1 px-4 py-2 bg-card hover:bg-muted border border-border text-brand-navy dark:text-brand-green rounded-xl transition-all shadow-sm group"
                  >
                    <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Download PDF</span>
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
                Detailed Inspection Findings & Technical Data ({selectedInspectionId})
              </span>
            </div>
          </div>

          {/* ── DETAILS WRAPPER CONTAINER ── */}
          <div className="bg-muted/30 border border-border rounded-2xl p-6 space-y-8 shadow-inner">
            
            {/* Moved ReportPlanReplacement to the section above Inspection History */}

            {/* ── 4. DETAILED INSPECTION FINDINGS ── */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-primary dark:text-foreground uppercase tracking-wider">Detailed Technical Parameters</h3>
              
              <div className="space-y-6">
                {FCG_COMPONENTS_MOCK.map((item, idx) => {
                  const fields = [
                    { label: 'Category', value: item.category },
                    { label: 'Size', value: item.size },
                    { label: 'Brand', value: item.brand },
                    { label: 'HM/KM Install', value: item.hmKmInstall },
                    { label: 'Plant Replacement Date', value: item.plantReplacementDate },
                    { label: 'Action', value: item.action },
                    { label: 'Component', value: item.component },
                    { label: 'Part Number', value: item.partNumber },
                    { label: 'Production Number', value: item.productionNumber },
                    { label: 'Qty', value: `${item.qty} ${item.uom}` },
                    { label: 'Condition', value: item.condition },
                    { label: 'Remark', value: item.remark },
                    { label: 'Hose Location', value: item.hoseLocation },
                    { label: 'Part Desc.', value: item.partDesc },
                    { label: 'Install Date', value: item.installDate },
                    { label: 'UOM', value: item.uom },
                    { label: 'Recommendation', value: item.recommendation },
                  ];

                  return (
                    <div key={idx} className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                            <Bot className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-primary dark:text-foreground text-base">{item.component}</h4>
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">Location: {item.hoseLocation}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground font-medium italic">Action Status:</span>
                          <StatusBadge 
                            status={item.action.toLowerCase().includes('replace') ? 'Critical' : item.action.toLowerCase().includes('monitor') ? 'Caution' : 'Good'} 
                            size="md" 
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-4 gap-x-8">
                        {fields.map((f, fIdx) => (
                          <div key={fIdx} className="pb-2 border-b border-border flex flex-col justify-center">
                            <span className="text-muted-foreground font-semibold text-[10px] uppercase tracking-widest mb-1">{f.label}</span>
                            <span 
                              className={`text-sm font-semibold truncate block ${
                                f.label === 'Action' && f.value.toLowerCase().includes('replace') ? 'text-red-500' :
                                f.label === 'Action' && f.value.toLowerCase().includes('monitor') ? 'text-yellow-600' :
                                f.label === 'Condition' && f.value.toLowerCase().includes('critical') ? 'text-red-500 font-bold' :
                                'text-foreground'
                              }`}
                              title={f.value?.toString()}
                            >
                              {f.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Inspection Field Evidence */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Camera className="w-5 h-5 text-brand-navy" />
                  <h4 className="text-base font-bold text-primary dark:text-foreground uppercase tracking-tight">Inspection Field Evidence</h4>
                </div>
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {PLACEHOLDER_PHOTOS.map((url, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhoto(url)}
                        className="aspect-[4/3] rounded-lg overflow-hidden border border-border hover:border-brand-green transition-all group relative bg-muted"
                      >
                        <img src={url} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <p className="text-[10px] font-bold text-white uppercase tracking-wider">View Full Photo</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activePhoto && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <img src={activePhoto} alt="Evidence detail" className="max-w-4xl max-h-[85vh] rounded-xl object-contain shadow-2xl" />
          <button className="absolute top-4 right-4 text-white hover:text-red-400 text-3xl font-bold" onClick={() => setActivePhoto(null)}>✕</button>
        </div>
      )}
    </div>
  );
}
