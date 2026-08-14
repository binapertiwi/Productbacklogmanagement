import React from 'react';

const DUMMY_SUMMARY_DATA = [
  { name: 'LINK-PITCH', nom: 761, reb: 773, measL: 762.2, measR: 762.2, wornL: 10, wornR: 10, repPlanL: '2026-01-02', repPlanR: '2026-01-02', hmInstL: 13476, hmInstR: 13476, instDateL: '2025-03-15', instDateR: '2025-03-15', lifeL: 1044.5, lifeR: 1044.5, brandL: 'UTP', brandR: 'UTP', remL: 'GOOD', remR: 'GOOD' },
  { name: 'LINK-HEIGHT', nom: 105, reb: 97, measL: 104.2, measR: 104.2, wornL: 10, wornR: 10, repPlanL: '2026-01-02', repPlanR: '2026-01-02', hmInstL: 13476, hmInstR: 13476, instDateL: '2025-03-15', instDateR: '2025-03-15', lifeL: 1044.5, lifeR: 1044.5, brandL: 'UTP', brandR: 'UTP', remL: 'GOOD', remR: 'GOOD' },
  { name: 'BUSHING', nom: 59.3, reb: 54.3, measL: 58.6, measR: 58.6, wornL: 14, wornR: 14, repPlanL: '2025-12-24', repPlanR: '2025-12-24', hmInstL: 13476, hmInstR: 13476, instDateL: '2025-03-15', instDateR: '2025-03-15', lifeL: 1044.5, lifeR: 1044.5, brandL: 'UTP', brandR: 'UTP', remL: 'GOOD', remR: 'GOOD' },
  { name: 'SHOE', nom: 20, reb: 10, measL: 22.8, measR: 22.8, wornL: 32, wornR: 32, repPlanL: '2026-01-28', repPlanR: '2026-01-28', hmInstL: 9525, hmInstR: 9525, instDateL: '-', instDateR: '-', lifeL: 4995.5, lifeR: 4995.5, brandL: 'KOMATSU', brandR: 'KOMATSU', remL: 'GOOD', remR: 'GOOD' },
  { name: 'CARRIER-ROLLER', nom: 120, reb: 105, measL: 116.7, measR: 116, wornL: 24, wornR: 29, repPlanL: '2025-10-20', repPlanR: '2025-10-12', hmInstL: 13476, hmInstR: 13476, instDateL: '2025-03-15', instDateR: '2025-03-15', lifeL: 1044.5, lifeR: 1044.5, brandL: 'UTP', brandR: 'UTP', remL: 'GOOD', remR: 'GOOD' },
  { name: '', nom: null, reb: null, measL: 115.2, measR: 116, wornL: 34, wornR: 29, repPlanL: '2025-10-03', repPlanR: '2025-10-12', hmInstL: 13476, hmInstR: 13476, instDateL: '2025-03-15', instDateR: '2025-03-15', lifeL: 1044.5, lifeR: 1044.5, brandL: 'UTP', brandR: 'UTP', remL: 'GOOD', remR: 'GOOD' },
  { name: 'IDLER', nom: 19, reb: 25, measL: 19.5, measR: 19.5, wornL: 8, wornR: 8, repPlanL: '2026-01-06', repPlanR: '2026-01-06', hmInstL: 13476, hmInstR: 13476, instDateL: '2025-03-15', instDateR: '2025-03-15', lifeL: 1044.5, lifeR: 1044.5, brandL: 'KOMATSU', brandR: 'KOMATSU', remL: 'GOOD', remR: 'GOOD' },
  { name: 'SPROCKET-SEGMENT', nom: 0, reb: 8, measL: 1.4, measR: 1.4, wornL: 23, wornR: 23, repPlanL: '2025-10-22', repPlanR: '2025-10-22', hmInstL: 13476, hmInstR: 13476, instDateL: '2025-03-15', instDateR: '2025-03-15', lifeL: 1044.5, lifeR: 1044.5, brandL: 'UTP', brandR: 'UTP', remL: 'GOOD', remR: 'GOOD' },
  { name: 'TRACK-TENSION', nom: 10, reb: 30, measL: 14, measR: 16, wornL: null, wornR: null, repPlanL: '-', repPlanR: '-', hmInstL: null, hmInstR: null, instDateL: '-', instDateR: '-', lifeL: null, lifeR: null, brandL: '-', brandR: '-', remL: 'NORMAL', remR: 'NORMAL' },
  { name: 'TRACK-ROLLER', nom: 156, reb: 144, measL: 154.3, measR: 154.3, wornL: 14, wornR: 14, repPlanL: '2025-11-06', repPlanR: '2025-11-06', hmInstL: 13476, hmInstR: 13476, instDateL: '2025-03-15', instDateR: '2025-03-15', lifeL: 1044.5, lifeR: 1044.5, brandL: 'UTP', brandR: 'UTP', remL: 'GOOD', remR: 'GOOD' },
  { name: '', nom: null, reb: null, measL: 154.4, measR: 154.4, wornL: 13, wornR: 13, repPlanL: '2025-11-08', repPlanR: '2025-11-08', hmInstL: 13476, hmInstR: 13476, instDateL: '2025-03-15', instDateR: '2025-03-15', lifeL: 1044.5, lifeR: 1044.5, brandL: 'UTP', brandR: 'UTP', remL: 'GOOD', remR: 'GOOD' },
  { name: '', nom: null, reb: null, measL: 154.5, measR: 154.4, wornL: 13, wornR: 13, repPlanL: '2025-11-08', repPlanR: '2025-11-08', hmInstL: 13476, hmInstR: 13476, instDateL: '2025-03-15', instDateR: '2025-03-15', lifeL: 1044.5, lifeR: 1044.5, brandL: 'UTP', brandR: 'UTP', remL: 'GOOD', remR: 'GOOD' },
  { name: '', nom: null, reb: null, measL: 154.5, measR: 154.5, wornL: 13, wornR: 13, repPlanL: '2025-11-08', repPlanR: '2025-11-08', hmInstL: 13476, hmInstR: 13476, instDateL: '2025-03-15', instDateR: '2025-03-15', lifeL: 1044.5, lifeR: 1044.5, brandL: 'UTP', brandR: 'UTP', remL: 'GOOD', remR: 'GOOD' },
  { name: '', nom: null, reb: null, measL: 154.4, measR: 154.4, wornL: 13, wornR: 13, repPlanL: '2025-11-08', repPlanR: '2025-11-08', hmInstL: 13476, hmInstR: 13476, instDateL: '2025-03-15', instDateR: '2025-03-15', lifeL: 1044.5, lifeR: 1044.5, brandL: 'UTP', brandR: 'UTP', remL: 'GOOD', remR: 'GOOD' },
  { name: '', nom: null, reb: null, measL: 154.3, measR: 154.3, wornL: 14, wornR: 14, repPlanL: '2025-11-06', repPlanR: '2025-11-06', hmInstL: 13476, hmInstR: 13476, instDateL: '2025-03-15', instDateR: '2025-03-15', lifeL: 1044.5, lifeR: 1044.5, brandL: 'UTP', brandR: 'UTP', remL: 'GOOD', remR: 'GOOD' },
  { name: '', nom: null, reb: null, measL: 154.3, measR: 154.3, wornL: 14, wornR: 14, repPlanL: '2025-11-06', repPlanR: '2025-11-06', hmInstL: 13476, hmInstR: 13476, instDateL: '2025-03-15', instDateR: '2025-03-15', lifeL: 1044.5, lifeR: 1044.5, brandL: 'UTP', brandR: 'UTP', remL: 'GOOD', remR: 'GOOD' },
];

import { Database } from 'lucide-react';

export function ReportComponentSummaryTable() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border shadow-sm overflow-hidden mt-6 mb-8">
      <div className="px-6 py-4 border-b border-border bg-slate-50/50 dark:bg-slate-800/20 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center">
          <Database className="w-4 h-4 text-brand-green" />
        </div>
        <div>
          <h4 className="text-[13px] font-bold text-primary dark:text-foreground uppercase tracking-widest">Component Summary Data</h4>
          <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">Ringkasan hasil inspeksi, rencana penggantian, dan data pemasangan seluruh komponen.</p>
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="w-full text-left border-collapse text-[9px] sm:text-[10px]">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800/40 text-muted-foreground uppercase font-bold tracking-wider leading-tight">
              <th className="p-3 border-b border-r border-border min-w-[120px]">Component</th>
              <th className="p-3 border-b border-r border-border text-center w-[70px]">Nominal<br/>Meas</th>
              <th className="p-3 border-b border-r border-border text-center w-[70px]">Rebuild<br/>Limit</th>
              <th className="p-3 border-b border-r border-border text-center w-[70px]">Meas<br/>Left (mm)</th>
              <th className="p-3 border-b border-r border-border text-center w-[70px]">Meas<br/>Right (mm)</th>
              <th className="p-3 border-b border-r border-border text-center w-[60px]">Worn<br/>Left (%)</th>
              <th className="p-3 border-b border-r border-border text-center w-[60px]">Worn<br/>Right (%)</th>
              <th className="p-3 border-b border-r border-border text-center w-[90px]">LH Replacement<br/>Plan On</th>
              <th className="p-3 border-b border-r border-border text-center w-[90px]">RH Replacement<br/>Plan On</th>
              <th className="p-3 border-b border-r border-border text-center w-[80px]">HM Install<br/>Left (Hr)</th>
              <th className="p-3 border-b border-r border-border text-center w-[80px]">HM Install<br/>Right (Hr)</th>
              <th className="p-3 border-b border-r border-border text-center w-[90px]">Left Install<br/>Date</th>
              <th className="p-3 border-b border-r border-border text-center w-[90px]">Right Install<br/>Date</th>
              <th className="p-3 border-b border-r border-border text-center w-[70px]">Lifetime<br/>LH</th>
              <th className="p-3 border-b border-r border-border text-center w-[70px]">Lifetime<br/>RH</th>
              <th className="p-3 border-b border-r border-border text-center w-[80px]">Brand Part<br/>Left</th>
              <th className="p-3 border-b border-r border-border text-center w-[80px]">Brand Part<br/>Right</th>
              <th className="p-3 border-b border-r border-border text-center w-[70px]">Remark<br/>LH</th>
              <th className="p-3 border-b text-center w-[70px]">Remark<br/>RH</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {DUMMY_SUMMARY_DATA.map((row, idx) => {
              const bgClass = row.name ? 'bg-white dark:bg-transparent' : 'bg-muted/10 dark:bg-muted/5';
              return (
                <tr key={idx} className={`${bgClass} hover:bg-muted/20 transition-colors`}>
                  <td className="p-3 border-b border-r border-border font-bold text-primary dark:text-foreground">{row.name}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground font-bold text-center bg-yellow-300 dark:bg-yellow-500/20">{row.nom ?? '-'}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground font-bold text-center bg-yellow-300 dark:bg-yellow-500/20">{row.reb ?? '-'}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground bg-blue-50/50 dark:bg-blue-900/10 font-bold text-center">{row.measL ?? '-'}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground bg-blue-50/50 dark:bg-blue-900/10 font-bold text-center">{row.measR ?? '-'}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground text-center font-bold">{row.wornL ?? '-'}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground text-center font-bold">{row.wornR ?? '-'}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground font-mono text-center">{row.repPlanL}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground font-mono text-center">{row.repPlanR}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground bg-teal-50/50 dark:bg-teal-900/10 font-bold text-center">{row.hmInstL ?? '-'}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground bg-teal-50/50 dark:bg-teal-900/10 font-bold text-center">{row.hmInstR ?? '-'}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground font-mono text-center">{row.instDateL}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground font-mono text-center">{row.instDateR}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground font-bold text-center">{row.lifeL ?? '-'}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground font-bold text-center">{row.lifeR ?? '-'}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground bg-emerald-50/50 dark:bg-emerald-900/10 font-bold text-center">{row.brandL}</td>
                  <td className="p-3 border-b border-r border-border text-primary dark:text-foreground bg-emerald-50/50 dark:bg-emerald-900/10 font-bold text-center">{row.brandR}</td>
                  <td className="p-3 border-b border-r border-border text-center">
                    {row.remL !== '-' && (
                      <span className={`inline-block px-2 py-1 rounded-md text-[9px] font-bold text-white shadow-sm ${
                        row.remL === 'GOOD' || row.remL === 'NORMAL' ? 'bg-[#10B981]' : 'bg-[#0F766E]'
                      }`}>
                        {row.remL}
                      </span>
                    )}
                    {row.remL === '-' && '-'}
                  </td>
                  <td className="p-3 border-b border-border text-center">
                    {row.remR !== '-' && (
                      <span className={`inline-block px-2 py-1 rounded-md text-[9px] font-bold text-white shadow-sm ${
                        row.remR === 'GOOD' || row.remR === 'NORMAL' ? 'bg-[#10B981]' : 'bg-[#0F766E]'
                      }`}>
                        {row.remR}
                      </span>
                    )}
                    {row.remR === '-' && '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
