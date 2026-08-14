import React from 'react';
import { Calendar, Clock, Package, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

const DUMMY_DATA = [
  {
    type: "Cylinder",
    qty: 2,
    partNo: "707-13-11110",
    status: "Good",
    poNo: "PO-2026-001",
    lastHmDate: "12500 / 01 Feb 2026",
    planHmDate: "15000 / 01 Aug 2026",
  },
  {
    type: "Pump",
    qty: 1,
    partNo: "708-2L-00300",
    status: "Caution",
    poNo: "PO-2026-002",
    lastHmDate: "11000 / 15 Jan 2026",
    planHmDate: "13500 / 15 Jul 2026",
  },
  {
    type: "Motor",
    qty: 1,
    partNo: "706-7G-01040",
    status: "Critical",
    poNo: "PO-2026-003",
    lastHmDate: "14000 / 10 Mar 2026",
    planHmDate: "14500 / 10 Apr 2026",
  }
];

export function ReportPlanReplacement() {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-6">
      <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between bg-muted/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-navy dark:bg-brand-blue flex items-center justify-center shadow-sm">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary dark:text-foreground tracking-tight">Report Plan Replacement</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Jadwal penggantian komponen terencana</p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
              <th className="p-3">Type</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3">Part No</th>
              <th className="p-3">Status</th>
              <th className="p-3">PO No</th>
              <th className="p-3 whitespace-nowrap">Last HM / Date</th>
              <th className="p-3 whitespace-nowrap">Plan HM / Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {DUMMY_DATA.map((row, idx) => (
              <tr key={idx} className="hover:bg-muted/30 transition-colors">
                <td className="p-3 font-bold text-foreground">
                  <div className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-muted-foreground" />
                    {row.type}
                  </div>
                </td>
                <td className="p-3 text-center font-bold text-foreground">{row.qty}</td>
                <td className="p-3 font-mono text-muted-foreground">{row.partNo}</td>
                <td className="p-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    row.status === 'Good' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    row.status === 'Caution' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {row.status === 'Good' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    {row.status}
                  </span>
                </td>
                <td className="p-3">
                  <span className="font-bold text-brand-navy dark:text-brand-blue">{row.poNo}</span>
                </td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {row.lastHmDate}
                  </div>
                </td>
                <td className="p-3 text-foreground font-bold whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-brand-green" /> {row.planHmDate}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
