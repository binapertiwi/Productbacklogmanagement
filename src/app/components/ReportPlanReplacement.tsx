import React, { useState } from 'react';
import { Calendar, Download, Search } from 'lucide-react';

const DUMMY_DATA = [
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", pn: "99U12501T0", desc: "TL LUBRICATED D85ESS-2 84L", qty: 1, month1: "-", month2: "-" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", pn: "99U12501H0", desc: "SHOE SINGLE GROUSER D85ESS-2 610 MM", qty: 84, month1: "-", month2: "-" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", pn: "99U12501B0", desc: "SHOE BOLT KIT D85ESS-2", qty: 12, month1: "-", month2: "-" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", pn: "99U1250150", desc: "TRACK ROLLER SINGLE FLANGE D85ESS-2", qty: 12, month1: "-", month2: "-" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", pn: "99U12501D0", desc: "TRACK ROLLER DOUBLE FLANGE D85ESS-2", qty: 4, month1: "-", month2: "-" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", pn: "99U12501R0", desc: "CARRIER ROLLER D85ESS-2", qty: 4, month1: "-", month2: "-" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", pn: "99U12501L0", desc: "IDLER ASSY D85ESS-2", qty: 2, month1: "-", month2: "-" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "BRE", model: "D85ESS-2", pn: "99U12501G0", desc: "SEGMENT D85ESS-2", qty: 18, month1: "-", month2: "-" },
  
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", pn: "99U12501T0", desc: "TL LUBRICATED D85ESS-2 84L", qty: 1, month1: "-", month2: "1" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", pn: "99U12501H0", desc: "SHOE SINGLE GROUSER D85ESS-2 610 MM", qty: 84, month1: "-", month2: "84" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", pn: "99U12501B0", desc: "SHOE BOLT KIT D85ESS-2", qty: 12, month1: "-", month2: "1" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", pn: "99U1250150", desc: "TRACK ROLLER SINGLE FLANGE D85ESS-2", qty: 12, month1: "24", month2: "48" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", pn: "99U12501D0", desc: "TRACK ROLLER DOUBLE FLANGE D85ESS-2", qty: 4, month1: "8", month2: "16" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", pn: "99U12501R0", desc: "CARRIER ROLLER D85ESS-2", qty: 4, month1: "-", month2: "-" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", pn: "99U12501L0", desc: "IDLER ASSY D85ESS-2", qty: 2, month1: "2", month2: "-" },
  { customer: "PT RIUNG MITRA LESTARI", customerId: "C-U017", site: "KRASSI", model: "D85ESS-2", pn: "99U12501G0", desc: "SEGMENT D85ESS-2", qty: 18, month1: "-", month2: "-" },
];

export function ReportPlanReplacement() {
  const [periodFrom, setPeriodFrom] = useState('December 2026');
  const [periodTo, setPeriodTo] = useState('January 2027');
  const [model, setModel] = useState('D85ESS-2');
  const [customer, setCustomer] = useState('C-U017 - PT RIUNG MITRA LESTARI');
  const [site, setSite] = useState('');
  const [unit, setUnit] = useState('');

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-8 mt-8">
      {/* Title Header */}
      <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between bg-muted/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-green/20 flex items-center justify-center shadow-sm">
            <Calendar className="w-4 h-4 text-brand-green" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary dark:text-foreground tracking-tight uppercase">Plan Replacement</h3>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="p-4 bg-muted/10 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end mb-4 text-xs font-bold text-muted-foreground">
          <div className="md:col-span-2 flex gap-2 items-center">
            <div className="flex-1">
              <label className="block mb-1 text-[10px]">Select Period :</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={periodFrom}
                  onChange={(e) => setPeriodFrom(e.target.value)}
                  className="w-full pl-3 pr-8 py-1.5 border border-border rounded text-foreground font-medium" 
                />
                <Calendar className="w-4 h-4 absolute right-2.5 top-2 text-muted-foreground" />
              </div>
            </div>
            <span className="pt-4">To</span>
            <div className="flex-1">
              <label className="block mb-1 text-[10px]">&nbsp;</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={periodTo}
                  onChange={(e) => setPeriodTo(e.target.value)}
                  className="w-full pl-3 pr-8 py-1.5 border border-border rounded text-foreground font-medium" 
                />
                <Calendar className="w-4 h-4 absolute right-2.5 top-2 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <label className="block mb-1 text-[10px]">Select Model :</label>
            <select 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-1.5 border border-border rounded text-foreground font-medium bg-white dark:bg-muted"
            >
              <option value="D85ESS-2">D85ESS-2</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="block mb-1 text-[10px]">Customer :</label>
            <select 
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full px-3 py-1.5 border border-border rounded text-foreground font-medium bg-white dark:bg-muted"
            >
              <option value="C-U017 - PT RIUNG MITRA LESTARI">C-U017 - PT RIUNG MITRA LESTARI</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="block mb-1 text-[10px]">Site :</label>
            <select 
              value={site}
              onChange={(e) => setSite(e.target.value)}
              className="w-full px-3 py-1.5 border border-border rounded text-foreground font-medium bg-white dark:bg-muted"
            >
              <option value="">--Select One--</option>
              <option value="BRE">BRE</option>
              <option value="KRASSI">KRASSI</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="block mb-1 text-[10px]">Kode Unit :</label>
            <select 
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3 py-1.5 border border-border rounded text-foreground font-medium bg-white dark:bg-muted"
            >
              <option value="">-- Pilih Unit --</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button className="bg-brand-navy hover:bg-brand-navy/90 text-white px-6 py-1.5 rounded text-xs font-bold transition-colors">
            GO
          </button>
          <button className="bg-[#107C41] hover:bg-[#0c5e31] text-white px-4 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> EXCEL
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-border text-muted-foreground font-bold text-[10px] uppercase bg-white dark:bg-muted/10">
              <th className="p-3 border-r border-border">CUSTOMER</th>
              <th className="p-3 border-r border-border">CUSTOMER ID</th>
              <th className="p-3 border-r border-border">SITE</th>
              <th className="p-3 border-r border-border">MODEL</th>
              <th className="p-3 border-r border-border">PN</th>
              <th className="p-3 border-r border-border min-w-[200px]">DESC</th>
              <th className="p-3 border-r border-border whitespace-nowrap">Qty/Unit</th>
              <th className="p-3 border-r border-border whitespace-nowrap">Dec-2026</th>
              <th className="p-3 whitespace-nowrap">Jan-2027</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {DUMMY_DATA.map((row, idx) => (
              <tr key={idx} className="hover:bg-muted/30 transition-colors bg-white dark:bg-transparent">
                <td className="p-3 border-r border-border font-bold text-[10px] text-foreground">{row.customer}</td>
                <td className="p-3 border-r border-border font-bold text-[10px] text-foreground">{row.customerId}</td>
                <td className="p-3 border-r border-border font-bold text-[10px] text-foreground">{row.site}</td>
                <td className="p-3 border-r border-border font-bold text-[10px] text-foreground">{row.model}</td>
                <td className="p-3 border-r border-border font-bold text-[10px] text-foreground">{row.pn}</td>
                <td className="p-3 border-r border-border font-bold text-[10px] text-foreground">{row.desc}</td>
                <td className="p-3 border-r border-border font-bold text-[10px] text-foreground">{row.qty}</td>
                <td className="p-3 border-r border-border font-bold text-[10px] text-blue-600">{row.month1}</td>
                <td className="p-3 font-bold text-[10px] text-blue-600">{row.month2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
