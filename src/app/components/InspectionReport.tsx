import React, { useState } from 'react';
import {
  FileText, Download, Camera, ClipboardList, BarChart3,
  MapPin, AlertTriangle, ChevronRight, Wrench, Package, ExternalLink
} from 'lucide-react';
import { CommodityInspectionReport, RecommendedPart } from '../data/inspectionTypes';
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

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* ── A: METADATA HEADER ────────────────────────────────────────────── */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">No. Inspeksi</p>
            <p className="text-sm font-black text-primary dark:text-foreground">{metadata.inspectionId}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Tanggal</p>
            <p className="text-sm font-black text-primary dark:text-foreground">
              {new Date(metadata.inspectionDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Inspektor</p>
            <p className="text-sm font-black text-primary dark:text-foreground">{metadata.mechanicName}</p>
            <p className="text-[10px] text-muted-foreground">{metadata.mechanicId}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">SMU saat Inspeksi</p>
            <p className="text-sm font-black text-primary dark:text-foreground">{metadata.serviceMeterUnit.toLocaleString()} Hrs</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Status Komoditas</p>
            <StatusBadge status={metadata.overallStatus} size="lg" />
          </div>
        </div>
      </div>

      {/* ── B: VISUAL MAPPING ─────────────────────────────────────────────── */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2 bg-muted/20">
          <MapPin className="w-4 h-4 text-brand-green" />
          <h4 className="font-black text-primary dark:text-foreground text-sm uppercase tracking-tight">Visual Component Map</h4>
          <span className="text-[10px] text-muted-foreground font-bold ml-1">— klik komponen untuk lihat detail</span>
        </div>
        <div className="p-5">
          <VisualMapping commodityType={metadata.commodity} measurements={measurements} />
        </div>
      </div>

      {/* ── C: MEASUREMENT TABLE ──────────────────────────────────────────── */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2 bg-muted/20">
          <BarChart3 className="w-4 h-4 text-primary dark:text-foreground" />
          <h4 className="font-black text-primary dark:text-foreground text-sm uppercase tracking-tight">Technical Measurement Table</h4>
          <span className="ml-auto text-[10px] font-bold text-muted-foreground">{measurements.length} komponen terukur</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap border-separate border-spacing-0">
            <thead className="bg-muted/40 text-[10px] uppercase font-black tracking-widest text-muted-foreground/70 border-b border-border">
              <tr>
                <th className="px-5 py-3 border-b border-border">Component</th>
                <th className="px-3 py-3 border-b border-border text-center">Pos.</th>
                <th className="px-4 py-3 border-b border-border text-center">Actual</th>
                <th className="px-3 py-3 border-b border-border">Std. Value</th>
                <th className="px-4 py-3 border-b border-border text-center">Wear / Health</th>
                <th className="px-4 py-3 border-b border-border text-center">Est. Life</th>
                <th className="px-4 py-3 border-b border-border text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {measurements.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-5 py-3.5">
                    <span className="font-black text-primary dark:text-foreground text-xs">{item.componentName}</span>
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <span className="text-[11px] font-bold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">{item.position ?? '—'}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`text-sm font-black ${wearTextColor(item.healthPercentage)}`}>
                      {item.actualValue} <span className="text-[10px] font-bold opacity-70">{item.measurementUnit}</span>
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="text-[10px] font-bold text-muted-foreground italic">{item.standardValue ?? '—'}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${wearColor(item.healthPercentage)}`} style={{ width: `${item.healthPercentage}%` }} />
                      </div>
                      <span className={`text-[10px] font-black w-8 text-right ${wearTextColor(item.healthPercentage)}`}>{item.healthPercentage}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    {item.estimatedRemainingLife != null ? (
                      <span className="text-[11px] font-bold text-foreground">{item.estimatedRemainingLife.toLocaleString()} Hrs</span>
                    ) : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <StatusBadge status={item.actionStatus} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── D: FIELD EVIDENCE ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mechanic Notes */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="w-4 h-4 text-primary dark:text-foreground" />
            <h4 className="font-black text-primary dark:text-foreground text-sm uppercase tracking-tight">Catatan Mekanik</h4>
          </div>
          <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
            <p className="text-sm text-foreground/80 leading-relaxed italic font-medium">"{evidence.mechanicNotes}"</p>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground font-bold">
            <span>Inspector: {metadata.mechanicName} ({metadata.mechanicId})</span>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-4 h-4 text-primary dark:text-foreground" />
            <h4 className="font-black text-primary dark:text-foreground text-sm uppercase tracking-tight">Evidence Photos</h4>
            <span className="ml-auto text-[10px] font-bold text-muted-foreground">{evidence.photoUrls.length} foto</span>
          </div>
          {evidence.photoUrls.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {evidence.photoUrls.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(url)}
                  className="aspect-video rounded-lg overflow-hidden border border-border hover:border-brand-green transition-all group relative"
                >
                  <img src={url} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-24 bg-muted/30 rounded-xl border border-border/50">
              <p className="text-xs text-muted-foreground font-bold italic">Foto belum tersedia untuk komoditas ini</p>
            </div>
          )}
        </div>
      </div>

      {/* Photo Lightbox */}
      {activePhoto && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setActivePhoto(null)}
        >
          <img src={activePhoto} alt="Evidence detail" className="max-w-3xl max-h-[80vh] rounded-2xl object-contain shadow-2xl" />
          <button className="absolute top-4 right-4 text-white text-2xl font-black hover:text-red-400 transition-colors" onClick={() => setActivePhoto(null)}>✕</button>
        </div>
      )}

      {/* ── E: PO RECOMMENDATIONS ────────────────────────────────────────── */}
      {recommendations.length > 0 && (
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2 bg-muted/20">
            <Package className="w-4 h-4 text-brand-green" />
            <h4 className="font-black text-primary dark:text-foreground text-sm uppercase tracking-tight">Recommended Parts for PO</h4>
            <span className="ml-auto px-2 py-0.5 bg-brand-green/10 text-brand-green text-[10px] font-black rounded">{recommendations.length} Items</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap border-separate border-spacing-0">
              <thead className="bg-muted/40 text-[10px] uppercase font-black tracking-widest text-muted-foreground/70 border-b border-border">
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
                {recommendations.map((part, idx) => (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-black text-primary dark:text-brand-green text-xs">{part.partNumber}</td>
                    <td className="px-4 py-3 text-xs font-bold text-foreground/90">{part.description}</td>
                    <td className="px-3 py-3 text-center font-black text-foreground">{part.quantity}</td>
                    <td className="px-3 py-3 text-center text-[10px] font-bold text-muted-foreground">{part.uom}</td>
                    <td className="px-4 py-3 text-center"><StatusBadge status={part.urgency} size="sm" /></td>
                    <td className="px-4 py-3 text-right font-black text-primary dark:text-foreground text-xs">
                      {part.estimatedPrice != null ? formatRupiah(part.estimatedPrice) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-muted/20">
                  <td colSpan={5} className="px-5 py-3 text-xs font-black text-muted-foreground uppercase tracking-widest">Total Estimasi PO</td>
                  <td className="px-4 py-3 text-right font-black text-brand-green text-sm">
                    {formatRupiah(recommendations.reduce((sum, r) => sum + (r.estimatedPrice ?? 0) * r.quantity, 0))}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="px-5 py-4 bg-muted/10 flex justify-end">
            <button
              onClick={() => onExportPO(recommendations)}
              className="flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-xl text-sm font-black shadow-lg shadow-brand-green/20 hover:opacity-90 transition-all active:scale-95"
            >
              <FileText className="w-4 h-4" />
              Add to PO Draft ({recommendations.length} items)
            </button>
          </div>
        </div>
      )}

      {recommendations.length === 0 && (
        <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center"><Wrench className="w-5 h-5 text-brand-green" /></div>
          <div>
            <p className="text-sm font-black text-brand-green">Tidak Ada Part yang Perlu Diganti</p>
            <p className="text-xs text-muted-foreground font-bold mt-0.5">Semua komponen dalam batas normal. Lanjutkan monitoring sesuai jadwal PM.</p>
          </div>
        </div>
      )}
    </div>
  );
}
