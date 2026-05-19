import React, { useState } from 'react';
import { Camera, Download, Package, FileText, ClipboardList, Bot, AlertTriangle, ChevronRight, Activity, Calendar, User, Clock, Shield } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { RecommendedPart, CommodityInspectionReport } from '../data/inspectionTypes';

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

const PLACEHOLDER_PHOTOS = [
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
];

export function FCGReportLayout({ unit, activeReport, onExportPO }: FCGReportLayoutProps) {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  
  // Format price helper
  const formatRupiah = (value: number) => {
    return `Rp ${value.toLocaleString('id-ID')}`;
  };

  // Metadata Extraction
  const metadata = {
    reportNo: activeReport?.metadata.inspectionId ?? 'INS-2026-FCG-001',
    createdDate: activeReport?.metadata.inspectionDate ?? '2026-02-21',
    inspector: activeReport?.metadata.mechanicName ?? 'Ahmad Fauzi',
    serialNumber: unit.serialNumber,
    vehicleType: unit.model,
    vehicleBrand: unit.model.toLowerCase().includes('komatsu') ? 'Komatsu' : unit.model.toLowerCase().includes('cat') ? 'Caterpillar' : 'Komatsu',
    workingHour: activeReport?.metadata.serviceMeterUnit ?? unit.hoursOperated,
    hmUnit: 'Hrs'
  };

  const handleExportCSV = () => {
    const headers = ['Part Number', 'Description', 'Qty', 'UoM', 'Urgency', 'Est Price'];
    const rows = FCG_RECOMMENDED_PARTS.map(p => [
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
    link.setAttribute('download', `FCG_Recommended_Parts_${unit.serialNumber}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalEstimatedPO = FCG_RECOMMENDED_PARTS.reduce(
    (sum, part) => sum + (part.estimatedPrice ?? 0) * part.quantity, 
    0
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* ── 1. INSPECTION METADATA BAR ── */}
      <div className="bg-gray-50 dark:bg-muted/30 rounded-xl p-4 border border-border/80 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Report No</span>
            <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 break-all">{metadata.reportNo}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Created Date</span>
            <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">{metadata.createdDate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Inspector</span>
            <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 truncate">{metadata.inspector}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Serial Number</span>
            <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">{metadata.serialNumber}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Vehicle Type</span>
            <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 truncate">{metadata.vehicleType}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Vehicle Brand</span>
            <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">{metadata.vehicleBrand}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Working Hour</span>
            <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">{metadata.workingHour.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">HM Unit</span>
            <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">{metadata.hmUnit}</span>
          </div>
        </div>
      </div>

      {/* ── 2. COMPONENT DETAIL CARDS (The Parameter Matrix) ── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base sm:text-lg font-bold text-primary dark:text-foreground uppercase tracking-tight">FCG Parameter Matrix</h3>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 px-3 py-1 rounded-lg border border-blue-100 dark:border-blue-900/50">
            <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest">Hydraulic Connector Standardized Data</span>
          </div>
        </div>

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
              <div 
                key={idx} 
                className="bg-card rounded-xl border border-border p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow ring-1 ring-transparent hover:ring-brand-green/10"
              >
                {/* Header of component card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/80 gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Bot className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary dark:text-foreground text-sm sm:text-base">{item.component}</h4>
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">Location: {item.hoseLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground font-medium italic">Action Status:</span>
                    <StatusBadge 
                      status={item.action.toLowerCase().includes('replace') ? 'Critical' : item.action.toLowerCase().includes('monitor') ? 'Caution' : 'Good'} 
                      size="sm" 
                    />
                  </div>
                </div>
                
                {/* 17 Parameters dense grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-6">
                  {fields.map((f, fIdx) => (
                    <div key={fIdx} className="pb-2 border-b border-gray-100 dark:border-border/40 flex flex-col justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-[11px] uppercase tracking-wider mb-0.5">{f.label}</span>
                      <span 
                        className={`text-[12px] sm:text-sm font-bold truncate block ${
                          f.label === 'Action' && f.value.toLowerCase().includes('replace') ? 'text-red-500' :
                          f.label === 'Action' && f.value.toLowerCase().includes('monitor') ? 'text-amber-500' :
                          f.label === 'Condition' && f.value.toLowerCase().includes('critical') ? 'text-red-500 font-bold' :
                          'text-gray-800 dark:text-gray-200'
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
      </div>

      {/* ── 3. INSPECTION FIELD EVIDENCE ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          <h3 className="text-base sm:text-lg font-bold text-primary dark:text-foreground uppercase tracking-tight">Inspection Field Evidence</h3>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PLACEHOLDER_PHOTOS.map((url, idx) => {
              const captions = [
                "Fig. 1 - Abraded Hose Sleeve showing inner wire reinforcement",
                "Fig. 2 - Differential pressure gauge reading red at 82% threshold",
                "Fig. 3 - Left travel motor pipeline checking under active load",
                "Fig. 4 - Boom cylinder mounting brackets structural inspection"
              ];
              return (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(url)}
                  className="aspect-[4/3] rounded-lg overflow-hidden border border-border hover:border-brand-green transition-all group relative bg-muted"
                >
                  <img 
                    src={url} 
                    alt={`Evidence ${idx + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3">
                    <p className="text-[9px] sm:text-[10px] font-bold text-white leading-tight uppercase tracking-wide">
                      {captions[idx]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 4. RECOMMENDED PARTS FOR PO ── */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center gap-4 bg-muted/25">
          <div className="flex items-center gap-2">
            <Package className="w-4.5 h-4.5 text-brand-green" />
            <h4 className="font-bold text-primary dark:text-foreground text-sm uppercase tracking-tight">Recommended Parts for PO</h4>
          </div>
          <div className="flex items-center gap-2 sm:ml-auto">
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-muted dark:hover:bg-muted/80 text-foreground rounded-lg text-xs font-bold transition-all border border-border"
            >
              <Download className="w-3.5 h-3.5" />
              CSV Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap border-separate border-spacing-0">
            <thead className="bg-muted/30 text-[10px] uppercase font-bold tracking-widest text-muted-foreground border-b border-border">
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
              {FCG_RECOMMENDED_PARTS.map((part) => (
                <tr key={part.partNumber} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-primary dark:text-brand-green text-xs">{part.partNumber}</td>
                  <td className="px-4 py-3.5 text-xs font-bold text-gray-800 dark:text-gray-200">{part.description}</td>
                  <td className="px-3 py-3.5 text-center font-bold text-foreground">{part.quantity}</td>
                  <td className="px-3 py-3.5 text-center text-[10px] font-bold text-muted-foreground uppercase">{part.uom}</td>
                  <td className="px-4 py-3.5 text-center"><StatusBadge status={part.urgency} size="sm" /></td>
                  <td className="px-4 py-3.5 text-right font-bold text-primary dark:text-foreground text-xs">
                    {part.estimatedPrice != null ? formatRupiah(part.estimatedPrice) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-muted/20">
                <td colSpan={5} className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Estimasi PO (Fluid Connector)</td>
                <td className="px-4 py-3 text-right font-bold text-brand-green text-sm sm:text-base">
                  {formatRupiah(totalEstimatedPO)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div className="px-5 py-4 bg-muted/10 flex justify-between items-center border-t border-border/80">
          <span className="text-[10px] text-muted-foreground font-bold italic">Total recommendations: {FCG_RECOMMENDED_PARTS.length} spare parts</span>
          <button
            onClick={() => onExportPO(FCG_RECOMMENDED_PARTS)}
            className="flex items-center gap-2 px-6 py-2.5 bg-brand-green hover:bg-brand-green/90 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-brand-green/20 transition-all active:scale-95"
          >
            <FileText className="w-4 h-4" />
            Add to PO Draft ({FCG_RECOMMENDED_PARTS.length} items)
          </button>
        </div>
      </div>

      {/* Lightbox for physical evidence */}
      {activePhoto && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <img src={activePhoto} alt="Evidence detail" className="max-w-4xl max-h-[85vh] rounded-xl object-contain shadow-2xl" />
          <button 
            className="absolute top-4 right-4 text-white hover:text-red-400 text-3xl font-bold transition-colors" 
            onClick={() => setActivePhoto(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
