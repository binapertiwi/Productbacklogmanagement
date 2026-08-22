import React, { useState, useMemo, useCallback } from 'react';
import { Calendar, Download, Search, Filter } from 'lucide-react';

interface PlanReplacementItem {
  customer: string;
  customerId: string;
  site: string;
  model: string;
  unitCode: string;
  pn: string;
  desc: string;
  qty: number;
  replaceQty: string;
  period: string;
}

const ALL_PLAN_DATA: PlanReplacementItem[] = [
  // PT Adaro Energy
  { customer: "PT ADARO ENERGY", customerId: "C-ADR01", site: "Tutupan", model: "D85ESS-2", unitCode: "D85-TUT-01", pn: "99U12501T0", desc: "TL LUBRICATED D85ESS-2 84L", qty: 1, replaceQty: "1", period: "2026-12" },
  { customer: "PT ADARO ENERGY", customerId: "C-ADR01", site: "Tutupan", model: "D85ESS-2", unitCode: "D85-TUT-01", pn: "99U12501H0", desc: "SHOE SINGLE GROUSER D85ESS-2 610 MM", qty: 84, replaceQty: "84", period: "2026-12" },
  { customer: "PT ADARO ENERGY", customerId: "C-ADR01", site: "Tutupan", model: "D85ESS-2", unitCode: "D85-TUT-02", pn: "99U12501B0", desc: "SHOE BOLT KIT D85ESS-2", qty: 12, replaceQty: "12", period: "2026-12" },
  { customer: "PT ADARO ENERGY", customerId: "C-ADR01", site: "Paringin", model: "PC800-8", unitCode: "PC800-PAR-01", pn: "20Y-60-31650", desc: "MAIN HYDRAULIC HOSE ASSY", qty: 2, replaceQty: "2", period: "2026-12" },
  { customer: "PT ADARO ENERGY", customerId: "C-ADR01", site: "Paringin", model: "PC800-8", unitCode: "PC800-PAR-02", pn: "07012-70095", desc: "O-RING SEAL NBR HIGH TEMP", qty: 10, replaceQty: "10", period: "2026-12" },
  { customer: "PT ADARO ENERGY", customerId: "C-ADR01", site: "Wara", model: "WA500-6", unitCode: "WA500-WAR-01", pn: "421-22-31180", desc: "STEERING CYLINDER LINE HOSE", qty: 4, replaceQty: "-", period: "2026-12" },

  // PT Thiess
  { customer: "PT THIESS", customerId: "C-THS02", site: "Sangatta", model: "D85ESS-2", unitCode: "D85-SGT-01", pn: "99U1250150", desc: "TRACK ROLLER SINGLE FLANGE D85ESS-2", qty: 12, replaceQty: "12", period: "2026-12" },
  { customer: "PT THIESS", customerId: "C-THS02", site: "Sangatta", model: "D85ESS-2", unitCode: "D85-SGT-01", pn: "99U12501D0", desc: "TRACK ROLLER DOUBLE FLANGE D85ESS-2", qty: 4, replaceQty: "4", period: "2026-12" },
  { customer: "PT THIESS", customerId: "C-THS02", site: "Sangatta", model: "PC800-8", unitCode: "PC800-SGT-03", pn: "20Y-60-41550", desc: "TRAVEL MOTOR HOSE LH INNER", qty: 2, replaceQty: "2", period: "2026-12" },
  { customer: "PT THIESS", customerId: "C-THS02", site: "Melak", model: "WA500-6", unitCode: "WA500-MLK-01", pn: "421-22-31190", desc: "BRAKE SYSTEM ACCUMULATOR HOSE", qty: 2, replaceQty: "1", period: "2026-12" },

  // PT Agincourt Resources
  { customer: "PT AGINCOURT RESOURCES", customerId: "C-AGI03", site: "Martabe", model: "D85ESS-2", unitCode: "D85-MTB-01", pn: "99U12501R0", desc: "CARRIER ROLLER D85ESS-2", qty: 4, replaceQty: "-", period: "2026-12" },
  { customer: "PT AGINCOURT RESOURCES", customerId: "C-AGI03", site: "Martabe", model: "D85ESS-2", unitCode: "D85-MTB-01", pn: "99U12501L0", desc: "IDLER ASSY D85ESS-2", qty: 2, replaceQty: "2", period: "2026-12" },
  { customer: "PT AGINCOURT RESOURCES", customerId: "C-AGI03", site: "Martabe", model: "PC800-8", unitCode: "PC800-MTB-02", pn: "20Y-60-31120", desc: "BOOM CYLINDER LINE HOSE A", qty: 1, replaceQty: "1", period: "2026-12" },

  // PT Berau Coal
  { customer: "PT BERAU COAL", customerId: "C-BRU04", site: "Lati", model: "D85ESS-2", unitCode: "D85-LAT-01", pn: "99U12501G0", desc: "SEGMENT D85ESS-2", qty: 18, replaceQty: "-", period: "2026-12" },
  { customer: "PT BERAU COAL", customerId: "C-BRU04", site: "Binungan", model: "PC800-8", unitCode: "PC800-BIN-01", pn: "BP-FG-800-09", desc: "BUCKET CYLINDER LINE GUARD ASSY", qty: 1, replaceQty: "1", period: "2026-12" },
  { customer: "PT BERAU COAL", customerId: "C-BRU04", site: "Sambarata", model: "WA500-6", unitCode: "WA500-SMB-01", pn: "07260-24155", desc: "HYDRAULIC SPLIT FLANGE CLAMP 1.25\"", qty: 4, replaceQty: "4", period: "2026-12" },

  // PT Baramulti
  { customer: "PT BARAMULTI", customerId: "C-BAR05", site: "Bunyu", model: "D85ESS-2", unitCode: "D85-BNY-01", pn: "99U12501T0", desc: "TL LUBRICATED D85ESS-2 84L", qty: 1, replaceQty: "1", period: "2026-12" },
  { customer: "PT BARAMULTI", customerId: "C-BAR05", site: "Bunyu", model: "D85ESS-2", unitCode: "D85-BNY-01", pn: "99U12501H0", desc: "SHOE SINGLE GROUSER D85ESS-2 610 MM", qty: 84, replaceQty: "-", period: "2026-12" },
  { customer: "PT BARAMULTI", customerId: "C-BAR05", site: "Bunyu", model: "PC800-8", unitCode: "PC800-BNY-02", pn: "20Y-60-31650", desc: "MAIN HYDRAULIC HOSE ASSY", qty: 1, replaceQty: "1", period: "2026-12" },

  // PT Riung Mitra Lestari (Fallback default)
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", unitCode: "D85-BRE-01", pn: "99U12501T0", desc: "TL LUBRICATED D85ESS-2 84L", qty: 1, replaceQty: "-", period: "2026-12" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", unitCode: "D85-BRE-01", pn: "99U12501H0", desc: "SHOE SINGLE GROUSER D85ESS-2 610 MM", qty: 84, replaceQty: "-", period: "2026-12" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", unitCode: "D85-BRE-02", pn: "99U12501B0", desc: "SHOE BOLT KIT D85ESS-2", qty: 12, replaceQty: "-", period: "2026-12" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", unitCode: "D85-BRE-02", pn: "99U1250150", desc: "TRACK ROLLER SINGLE FLANGE D85ESS-2", qty: 12, replaceQty: "-", period: "2026-12" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", unitCode: "D85-BRE-03", pn: "99U12501D0", desc: "TRACK ROLLER DOUBLE FLANGE D85ESS-2", qty: 4, replaceQty: "-", period: "2026-12" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", unitCode: "D85-BRE-03", pn: "99U12501R0", desc: "CARRIER ROLLER D85ESS-2", qty: 4, replaceQty: "-", period: "2026-12" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", unitCode: "D85-BRE-04", pn: "99U12501L0", desc: "IDLER ASSY D85ESS-2", qty: 2, replaceQty: "-", period: "2026-12" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", unitCode: "D85-BRE-04", pn: "99U12501G0", desc: "SEGMENT D85ESS-2", qty: 18, replaceQty: "-", period: "2026-12" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", unitCode: "D85-KRA-01", pn: "99U12501T0", desc: "TL LUBRICATED D85ESS-2 84L", qty: 1, replaceQty: "1", period: "2026-12" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", unitCode: "D85-KRA-01", pn: "99U12501H0", desc: "SHOE SINGLE GROUSER D85ESS-2 610 MM", qty: 84, replaceQty: "84", period: "2026-12" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", unitCode: "D85-KRA-02", pn: "99U12501B0", desc: "SHOE BOLT KIT D85ESS-2", qty: 12, replaceQty: "1", period: "2026-12" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", unitCode: "D85-KRA-02", pn: "99U1250150", desc: "TRACK ROLLER SINGLE FLANGE D85ESS-2", qty: 12, replaceQty: "48", period: "2026-12" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", unitCode: "D85-KRA-03", pn: "99U12501D0", desc: "TRACK ROLLER DOUBLE FLANGE D85ESS-2", qty: 4, replaceQty: "16", period: "2026-12" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", unitCode: "D85-KRA-03", pn: "99U12501R0", desc: "CARRIER ROLLER D85ESS-2", qty: 4, replaceQty: "-", period: "2026-12" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", unitCode: "D85-KRA-04", pn: "99U12501L0", desc: "IDLER ASSY D85ESS-2", qty: 2, replaceQty: "-", period: "2026-12" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", unitCode: "D85-KRA-04", pn: "99U12501G0", desc: "SEGMENT D85ESS-2", qty: 18, replaceQty: "-", period: "2026-12" },
];

interface ReportPlanReplacementProps {
  selectedCustomer?: string;
}

export function ReportPlanReplacement({ selectedCustomer }: ReportPlanReplacementProps) {
  const [period, setPeriod] = useState('2026-12');
  const [model, setModel] = useState('All');
  const [site, setSite] = useState('All');
  const [unit, setUnit] = useState('All');

  const customerScopedData = useMemo(() => {
    if (!selectedCustomer || selectedCustomer === 'All Customers') {
      return ALL_PLAN_DATA;
    }
    const normalized = selectedCustomer.toUpperCase();
    const matched = ALL_PLAN_DATA.filter(item => item.customer.includes(normalized) || normalized.includes(item.customer));
    return matched.length > 0 ? matched : ALL_PLAN_DATA;
  }, [selectedCustomer]);

  const availableSites = useMemo(() => {
    const sites = Array.from(new Set(customerScopedData.map(d => d.site)));
    return sites;
  }, [customerScopedData]);

  const availableModels = useMemo(() => {
    const models = Array.from(new Set(customerScopedData.map(d => d.model)));
    return models;
  }, [customerScopedData]);

  const availableUnits = useMemo(() => {
    const units = Array.from(new Set(customerScopedData.map(d => d.unitCode)));
    return units;
  }, [customerScopedData]);

  const filteredData = useMemo(() => {
    return customerScopedData.filter(row => {
      const matchModel = model === 'All' || row.model === model;
      const matchSite = site === 'All' || row.site === site;
      const matchUnit = unit === 'All' || row.unitCode === unit;
      return matchModel && matchSite && matchUnit;
    });
  }, [customerScopedData, model, site, unit]);

  const handleExportExcel = useCallback(() => {
    const headers = ['CUSTOMER', 'CUSTOMER ID', 'SITE', 'MODEL', 'KODE UNIT', 'PN', 'DESC', 'QTY/UNIT', 'REPLACE'];
    const rows = filteredData.map(r => [
      `"${r.customer}"`,
      `"${r.customerId}"`,
      `"${r.site}"`,
      `"${r.model}"`,
      `"${r.unitCode}"`,
      `"${r.pn}"`,
      `"${r.desc}"`,
      r.qty,
      `"${r.replaceQty}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Plan_Replacement_${selectedCustomer || 'All'}_${period}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredData, selectedCustomer, period]);

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden transition-colors">
      {/* Title Header */}
      <div className="px-4 sm:px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-muted/30">
        <div>
          <h3 className="text-primary dark:text-foreground font-bold font-display text-base sm:text-lg tracking-tight">Plan Replacement</h3>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">Jadwal estimasi penggantian komponen armada</p>
        </div>
        <div className="text-xs text-muted-foreground font-bold">
          Total: <span className="text-primary dark:text-foreground font-extrabold">{filteredData.length} Item</span>
        </div>
      </div>

      {/* Filters Section (Customer filter removed) */}
      <div className="p-4 bg-muted/10 border-b border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-4 text-xs font-bold text-muted-foreground">
          <div>
            <label className="block mb-1 text-[10px] uppercase tracking-wider">Select Period :</label>
            <input 
              type="month" 
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-3 py-1.5 border border-border rounded-lg text-foreground font-medium bg-background focus:outline-none focus:ring-1 focus:ring-brand-green text-xs" 
            />
          </div>
          
          <div>
            <label className="block mb-1 text-[10px] uppercase tracking-wider">Select Model :</label>
            <select 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-1.5 border border-border rounded-lg text-foreground font-medium bg-background focus:outline-none focus:ring-1 focus:ring-brand-green text-xs"
            >
              <option value="All">All Model</option>
              {availableModels.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-[10px] uppercase tracking-wider">Site :</label>
            <select 
              value={site}
              onChange={(e) => setSite(e.target.value)}
              className="w-full px-3 py-1.5 border border-border rounded-lg text-foreground font-medium bg-background focus:outline-none focus:ring-1 focus:ring-brand-green text-xs"
            >
              <option value="All">-- Select Site --</option>
              {availableSites.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-[10px] uppercase tracking-wider">Kode Unit :</label>
            <select 
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3 py-1.5 border border-border rounded-lg text-foreground font-medium bg-background focus:outline-none focus:ring-1 focus:ring-brand-green text-xs"
            >
              <option value="All">-- Pilih Unit --</option>
              {availableUnits.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-border/50">
          <button 
            type="button" 
            onClick={() => {}} 
            className="bg-brand-navy dark:bg-brand-blue hover:opacity-90 text-white px-6 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            GO
          </button>
          <button 
            type="button"
            onClick={handleExportExcel}
            className="bg-[#107C41] hover:bg-[#0c5e31] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" /> EXCEL
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-border text-muted-foreground font-bold text-[10px] uppercase bg-muted/30 tracking-wider">
              <th className="px-4 py-3 border-b border-border">CUSTOMER</th>
              <th className="px-4 py-3 border-b border-border">CUSTOMER ID</th>
              <th className="px-4 py-3 border-b border-border">SITE</th>
              <th className="px-4 py-3 border-b border-border">MODEL</th>
              <th className="px-4 py-3 border-b border-border">PN</th>
              <th className="px-4 py-3 border-b border-border min-w-[200px]">DESC</th>
              <th className="px-4 py-3 border-b border-border text-center whitespace-nowrap">Qty/Unit</th>
              <th className="px-4 py-3 border-b border-border text-center whitespace-nowrap">REPLACE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredData.length > 0 ? (
              filteredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors bg-card">
                  <td className="px-4 py-3 border-b border-border/50 font-bold text-[10px] text-foreground">{row.customer}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-bold text-[10px] text-foreground">{row.customerId}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-bold text-[10px] text-foreground">{row.site}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-bold text-[10px] text-foreground">{row.model}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-bold text-[10px] text-primary dark:text-brand-green font-mono">{row.pn}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-bold text-[10px] text-foreground">{row.desc}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-bold text-[10px] text-foreground text-center">{row.qty}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-bold text-[10px] text-blue-600 dark:text-blue-400 text-center">{row.replaceQty}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground font-bold italic">
                  Tidak ada data Plan Replacement yang sesuai kriteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
