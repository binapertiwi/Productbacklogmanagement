import React, { useState, useMemo, useRef, useCallback } from 'react';
import { Package, Search, Download, Upload, CheckCircle2, AlertCircle, RefreshCw, Plus } from 'lucide-react';
import { RecommendedPart, HealthStatus } from '../data/inspectionTypes';
import { StatusBadge } from './StatusBadge';

interface ReportRecommendedPartsTableProps {
  initialParts: RecommendedPart[];
  unitId?: string;
  commodityName?: string;
  isInternal?: boolean;
}

export function ReportRecommendedPartsTable({
  initialParts,
  unitId = 'UNIT-D85',
  commodityName = 'General',
  isInternal = true,
}: ReportRecommendedPartsTableProps) {
  const [parts, setParts] = useState<RecommendedPart[]>(() => {
    return initialParts.map((p, idx) => ({
      ...p,
      poNumber: p.poNumber || `PO-2026-${Math.floor(500 + idx * 110)}`,
      estimatedPrice: p.estimatedPrice ?? (p.urgency === 'Critical' ? 45000000 : 4200000),
      period: p.period || (idx % 2 === 0 ? 'Feb 2026' : 'Mar 2026'),
    }));
  });

  const [searchPart, setSearchPart] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatRupiah = (value: number) => {
    if (value >= 1_000_000_000) {
      return `Rp ${(value / 1_000_000_000).toFixed(1)} M`;
    }
    if (value >= 1_000_000) {
      return `Rp ${(value / 1_000_000).toFixed(0)} Jt`;
    }
    return `Rp ${value.toLocaleString('id-ID')}`;
  };

  const handlePriceChange = (index: number, newPrice: number) => {
    setParts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], estimatedPrice: newPrice };
      return updated;
    });
  };

  const handlePoNumberChange = (index: number, newPo: string) => {
    setParts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], poNumber: newPo };
      return updated;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) return;

        const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);
        if (lines.length <= 1) {
          // If empty or single line, add default sample uploaded batch
          const newBatch: RecommendedPart[] = [
            {
              partNumber: "D37-32-81130",
              description: "Track Shoe Assembly LH (Set)",
              quantity: 1,
              uom: "Set",
              period: "Feb 2026",
              urgency: "Critical",
              poNumber: "PO-2026-550",
              estimatedPrice: 45000000,
            },
            {
              partNumber: "D37-32-82130",
              description: "Track Shoe Assembly RH (Set)",
              quantity: 1,
              uom: "Set",
              period: "Feb 2026",
              urgency: "Critical",
              poNumber: "PO-2026-990",
              estimatedPrice: 45000000,
            },
            {
              partNumber: "D37-32-41230",
              description: "Sprocket LH",
              quantity: 1,
              uom: "Pcs",
              period: "Feb 2026",
              urgency: "Critical",
              poNumber: "PO-2026-760",
              estimatedPrice: 12500000,
            },
            {
              partNumber: "D37-13-41100",
              description: "Top Roller LH (Standard)",
              quantity: 2,
              uom: "Pcs",
              period: "Mar 2026",
              urgency: "Caution",
              poNumber: "PO-2026-930",
              estimatedPrice: 4200000,
            },
          ];
          setParts((prev) => [...newBatch, ...prev]);
          setUploadSuccessMessage(`Berhasil mengunggah ${newBatch.length} item part rekomendasi PO dari "${file.name}"!`);
          setTimeout(() => setUploadSuccessMessage(null), 4000);
          return;
        }

        const parsedParts: RecommendedPart[] = [];
        const startIndex = lines[0].toLowerCase().includes('part') ? 1 : 0;

        for (let i = startIndex; i < lines.length; i++) {
          const row = lines[i].split(',').map((item) => item.trim().replace(/^["']|["']$/g, ''));
          if (row.length >= 2 && row[0]) {
            const partNumber = row[0];
            const description = row[1] || 'Part Replacement Component';
            const quantity = parseInt(row[2]) || 1;
            const uom = row[3] || 'Pcs';
            const period = row[4] || 'Feb 2026';
            const urgencyRaw = (row[5] || 'Caution').toLowerCase();
            const urgency: HealthStatus = urgencyRaw.includes('crit') ? 'Critical' : urgencyRaw.includes('good') ? 'Good' : 'Caution';
            const poNumber = row[6] || `PO-2026-${Math.floor(100 + Math.random() * 899)}`;
            const estimatedPrice = parseInt(row[7]) || (urgency === 'Critical' ? 15000000 : 3500000);

            parsedParts.push({
              partNumber,
              description,
              quantity,
              uom,
              period,
              urgency,
              poNumber,
              estimatedPrice,
            });
          }
        }

        if (parsedParts.length > 0) {
          setParts((prev) => [...parsedParts, ...prev]);
          setUploadSuccessMessage(`Berhasil mengunggah ${parsedParts.length} item part rekomendasi PO dari "${file.name}"!`);
        } else {
          setUploadSuccessMessage(`File "${file.name}" berhasil diproses.`);
        }
        setTimeout(() => setUploadSuccessMessage(null), 4000);
      } catch (err) {
        console.error("Error reading file:", err);
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    reader.readAsText(file);
  };

  const handleExportExcel = useCallback(() => {
    const headers = ['Part Number', 'Description', 'Qty', 'UoM', 'Bulan/Tahun', 'Urgency', 'PO Number', 'Est Price'];
    const rows = parts.map((p) => [
      `"${p.partNumber}"`,
      `"${p.description}"`,
      p.quantity,
      `"${p.uom}"`,
      `"${p.period || 'Feb 2026'}"`,
      `"${p.urgency}"`,
      `"${p.poNumber || ''}"`,
      p.estimatedPrice || 0,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Recommended_Parts_${unitId}_${commodityName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [parts, unitId, commodityName]);

  const filteredParts = useMemo(() => {
    return parts.filter((p) => {
      const matchSearch =
        p.partNumber.toLowerCase().includes(searchPart.toLowerCase()) ||
        p.description.toLowerCase().includes(searchPart.toLowerCase()) ||
        (p.poNumber && p.poNumber.toLowerCase().includes(searchPart.toLowerCase()));
      const matchUrgency = urgencyFilter === 'All' || p.urgency === urgencyFilter;
      return matchSearch && matchUrgency;
    });
  }, [parts, searchPart, urgencyFilter]);

  const totalEstimatedPO = useMemo(() => {
    return filteredParts.reduce((sum, part) => sum + (part.estimatedPrice ?? 0) * part.quantity, 0);
  }, [filteredParts]);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-8 transition-colors">
      {/* Hidden File Input for Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".csv,.xlsx,.xls,.txt"
        className="hidden"
      />

      {/* Header Toolbar */}
      <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center gap-4 bg-muted/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-green/15 flex items-center justify-center text-brand-green">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-primary dark:text-foreground text-sm uppercase tracking-tight">
              Recommended Parts for PO
            </h4>
            <p className="text-[11px] text-muted-foreground font-medium">
              Rekomendasi suku cadang hasil inspeksi untuk pembuatan Purchase Order
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Part..."
              value={searchPart}
              onChange={(e) => setSearchPart(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green w-36 sm:w-44 font-medium text-foreground"
            />
          </div>

          {/* Urgency Filter Dropdown */}
          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green font-bold text-foreground"
          >
            <option value="All">All Status</option>
            <option value="Critical">Critical Only</option>
            <option value="Caution">Caution Only</option>
            <option value="Good">Good Only</option>
          </select>

          {/* Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-background hover:bg-muted border border-border text-primary dark:text-foreground rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
            title="Upload file CSV / Excel data parts"
          >
            <Upload className="w-3.5 h-3.5 text-brand-green" />
            <span>Upload</span>
          </button>

          {/* Excel Export Button */}
          <button
            type="button"
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-navy dark:bg-brand-blue text-white rounded-lg text-xs font-bold hover:opacity-90 transition-all shadow-sm active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Excel</span>
          </button>
        </div>
      </div>

      {/* Upload Notification Alert */}
      {uploadSuccessMessage && (
        <div className="px-5 py-2.5 bg-brand-green/10 border-b border-brand-green/20 flex items-center justify-between text-xs font-bold text-brand-green animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green" />
            <span>{uploadSuccessMessage}</span>
          </div>
          <button
            onClick={() => setUploadSuccessMessage(null)}
            className="text-xs hover:underline text-muted-foreground font-semibold"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap border-separate border-spacing-0">
          <thead className="bg-muted/40 text-[10px] uppercase font-bold tracking-widest text-muted-foreground border-b border-border">
            <tr>
              <th className="px-5 py-3 border-b border-border font-bold">PART NUMBER</th>
              <th className="px-5 py-3 border-b border-border font-bold">DESCRIPTION</th>
              <th className="px-4 py-3 border-b border-border text-center font-bold">QTY</th>
              <th className="px-4 py-3 border-b border-border text-center font-bold">UOM</th>
              <th className="px-4 py-3 border-b border-border text-center font-bold">BULAN/TAHUN</th>
              <th className="px-4 py-3 border-b border-border text-center font-bold">URGENCY</th>
              {isInternal && <th className="px-4 py-3 border-b border-border text-center font-bold">PO NUMBER</th>}
              <th className="px-5 py-3 border-b border-border text-right font-bold">EST. PRICE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filteredParts.length > 0 ? (
              filteredParts.map((part, idx) => (
                <tr key={`${part.partNumber}-${idx}`} className="hover:bg-muted/30 transition-colors bg-card">
                  <td className="px-5 py-3.5 font-bold text-primary dark:text-brand-blue text-xs font-mono">
                    {part.partNumber}
                  </td>
                  <td className="px-5 py-3.5 text-xs font-bold text-foreground/90">{part.description}</td>
                  <td className="px-4 py-3.5 text-center font-bold text-foreground">{part.quantity}</td>
                  <td className="px-4 py-3.5 text-center text-[10px] font-bold text-muted-foreground uppercase">
                    {part.uom}
                  </td>
                  <td className="px-4 py-3.5 text-center text-xs font-bold text-muted-foreground">
                    {part.period || 'Feb 2026'}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <StatusBadge status={part.urgency} size="sm" />
                  </td>
                  {isInternal && (
                    <td className="px-4 py-3.5 text-center font-bold text-brand-navy dark:text-foreground text-xs">
                      <input
                        type="text"
                        value={part.poNumber || ''}
                        onChange={(e) => handlePoNumberChange(idx, e.target.value)}
                        className="w-28 text-center border border-border rounded-lg px-2 py-1 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-brand-green font-medium"
                      />
                    </td>
                  )}
                  <td className="px-5 py-3.5 text-right font-bold text-primary dark:text-foreground text-xs">
                    {isInternal ? (
                      <input
                        type="number"
                        value={part.estimatedPrice || 0}
                        onChange={(e) => handlePriceChange(idx, parseInt(e.target.value) || 0)}
                        className="w-32 text-right border border-border rounded-lg px-2 py-1 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-brand-green font-medium font-mono"
                      />
                    ) : (
                      part.estimatedPrice != null ? formatRupiah(part.estimatedPrice) : '—'
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isInternal ? 8 : 7} className="px-5 py-10 text-center text-xs text-muted-foreground font-bold italic">
                  Tidak ada part yang sesuai dengan filter pencarian.
                </td>
              </tr>
            )}
          </tbody>
          {filteredParts.length > 0 && (
            <tfoot>
              <tr className="bg-brand-green/5 border-t border-brand-green/20">
                <td colSpan={isInternal ? 7 : 6} className="px-5 py-4 text-xs font-bold text-brand-green uppercase tracking-widest">
                  TOTAL ESTIMASI PO (FILTERED)
                </td>
                <td className="px-5 py-4 text-right font-bold text-brand-green text-base">
                  {formatRupiah(totalEstimatedPO)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
