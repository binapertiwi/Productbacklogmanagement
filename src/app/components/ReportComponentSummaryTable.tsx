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

export function ReportComponentSummaryTable() {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mt-6 mb-8">
      <div className="px-4 sm:px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-muted/30">
        <div>
          <h3 className="text-primary dark:text-foreground font-bold font-display text-base sm:text-lg tracking-tight">Component Summary Data</h3>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">Ringkasan hasil inspeksi, rencana penggantian, dan data pemasangan seluruh komponen.</p>
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="w-full text-left border-collapse text-[9px] sm:text-[10px]">
          <thead>
            <tr className="bg-muted/30 text-muted-foreground uppercase text-[9px] font-bold tracking-wider leading-tight">
              <th className="px-4 py-3 border-b border-border min-w-[120px]">Component</th>
              <th className="px-4 py-3 border-b border-border text-center w-[70px]">Nominal<br/>Meas</th>
              <th className="px-4 py-3 border-b border-border text-center w-[70px]">Rebuild<br/>Limit</th>
              <th className="px-4 py-3 border-b border-border text-center w-[70px]">Meas<br/>Left (mm)</th>
              <th className="px-4 py-3 border-b border-border text-center w-[70px]">Meas<br/>Right (mm)</th>
              <th className="px-4 py-3 border-b border-border text-center w-[60px]">Worn<br/>Left (%)</th>
              <th className="px-4 py-3 border-b border-border text-center w-[60px]">Worn<br/>Right (%)</th>
              <th className="px-4 py-3 border-b border-border text-center w-[90px]">LH Replacement<br/>Plan On</th>
              <th className="px-4 py-3 border-b border-border text-center w-[90px]">RH Replacement<br/>Plan On</th>
              <th className="px-4 py-3 border-b border-border text-center w-[80px]">HM Install<br/>Left (Hr)</th>
              <th className="px-4 py-3 border-b border-border text-center w-[80px]">HM Install<br/>Right (Hr)</th>
              <th className="px-4 py-3 border-b border-border text-center w-[90px]">Left Install<br/>Date</th>
              <th className="px-4 py-3 border-b border-border text-center w-[90px]">Right Install<br/>Date</th>
              <th className="px-4 py-3 border-b border-border text-center w-[70px]">Lifetime<br/>LH</th>
              <th className="px-4 py-3 border-b border-border text-center w-[70px]">Lifetime<br/>RH</th>
              <th className="px-4 py-3 border-b border-border text-center w-[80px]">Brand Part<br/>Left</th>
              <th className="px-4 py-3 border-b border-border text-center w-[80px]">Brand Part<br/>Right</th>
              <th className="px-4 py-3 border-b border-border text-center w-[70px]">Remark<br/>LH</th>
              <th className="px-4 py-3 border-b border-border text-center w-[70px]">Remark<br/>RH</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {DUMMY_SUMMARY_DATA.map((row, idx) => {
              const bgClass = row.name ? 'bg-card dark:bg-transparent' : 'bg-muted/10 dark:bg-muted/5';
              return (
                <tr key={idx} className={`${bgClass} hover:bg-muted/20 transition-colors`}>
                  <td className="px-4 py-3 border-b border-border/50 font-bold text-primary dark:text-foreground">{row.name}</td>
                  <td className="px-4 py-3 border-b border-border/50 text-center">
                    <span className="text-yellow-600 dark:text-yellow-500 font-bold">{row.nom ?? '-'}</span>
                  </td>
                  <td className="px-4 py-3 border-b border-border/50 text-center">
                    <span className="text-yellow-600 dark:text-yellow-500 font-bold">{row.reb ?? '-'}</span>
                  </td>
                  <td className="px-4 py-3 border-b border-border/50 text-center font-bold text-primary dark:text-foreground">{row.measL ?? '-'}</td>
                  <td className="px-4 py-3 border-b border-border/50 text-center font-bold text-primary dark:text-foreground">{row.measR ?? '-'}</td>
                  <td className="px-4 py-3 border-b border-border/50 text-center font-bold text-muted-foreground">{row.wornL ?? '-'}</td>
                  <td className="px-4 py-3 border-b border-border/50 text-center font-bold text-muted-foreground">{row.wornR ?? '-'}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-mono text-center text-muted-foreground">{row.repPlanL}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-mono text-center text-muted-foreground">{row.repPlanR}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-bold text-center text-primary dark:text-foreground">{row.hmInstL ?? '-'}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-bold text-center text-primary dark:text-foreground">{row.hmInstR ?? '-'}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-mono text-center text-muted-foreground">{row.instDateL}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-mono text-center text-muted-foreground">{row.instDateR}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-bold text-center text-primary dark:text-foreground">{row.lifeL ?? '-'}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-bold text-center text-primary dark:text-foreground">{row.lifeR ?? '-'}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-bold text-center text-brand-green dark:text-brand-green">{row.brandL}</td>
                  <td className="px-4 py-3 border-b border-border/50 font-bold text-center text-brand-green dark:text-brand-green">{row.brandR}</td>
                  <td className="px-4 py-3 border-b border-border/50 text-center">
                    {row.remL !== '-' && (
                      <span className={`inline-block px-2 py-1 rounded text-[9px] font-bold ${
                        row.remL === 'GOOD' || row.remL === 'NORMAL' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400'
                      }`}>
                        {row.remL}
                      </span>
                    )}
                    {row.remL === '-' && <span className="text-muted-foreground">-</span>}
                  </td>
                  <td className="px-4 py-3 border-b border-border/50 text-center">
                    {row.remR !== '-' && (
                      <span className={`inline-block px-2 py-1 rounded text-[9px] font-bold ${
                        row.remR === 'GOOD' || row.remR === 'NORMAL' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400'
                      }`}>
                        {row.remR}
                      </span>
                    )}
                    {row.remR === '-' && <span className="text-muted-foreground">-</span>}
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
