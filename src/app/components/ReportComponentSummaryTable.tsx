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
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border shadow-sm overflow-hidden mt-6 mb-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[9px] sm:text-[10px]">
          <thead>
            <tr className="bg-muted/30 border-b border-border text-muted-foreground uppercase font-bold tracking-wider leading-tight">
              <th className="p-2 border-r border-border min-w-[100px]"></th>
              <th className="p-2 border-r border-border w-[60px]">Nominal<br/>Meas</th>
              <th className="p-2 border-r border-border w-[60px]">Rebuild<br/>Limit</th>
              <th className="p-2 border-r border-border w-[60px]">Meas<br/>Left<br/>(mm)</th>
              <th className="p-2 border-r border-border w-[60px]">Meas<br/>Right<br/>(mm)</th>
              <th className="p-2 border-r border-border w-[50px]">Worn<br/>Left<br/>(%)</th>
              <th className="p-2 border-r border-border w-[50px]">Worn<br/>Right<br/>(%)</th>
              <th className="p-2 border-r border-border w-[80px]">LH Replacement<br/>Plan On</th>
              <th className="p-2 border-r border-border w-[80px]">RH Replacement<br/>Plan On</th>
              <th className="p-2 border-r border-border w-[70px]">HM Install<br/>Left<br/>(Hour)</th>
              <th className="p-2 border-r border-border w-[70px]">HM Install<br/>Right<br/>(Hour)</th>
              <th className="p-2 border-r border-border w-[80px]">Left Install<br/>Date</th>
              <th className="p-2 border-r border-border w-[80px]">Right Install<br/>Date</th>
              <th className="p-2 border-r border-border w-[60px]">Lifetime<br/>LH</th>
              <th className="p-2 border-r border-border w-[60px]">Lifetime<br/>RH</th>
              <th className="p-2 border-r border-border w-[70px]">Brand Part<br/>Left</th>
              <th className="p-2 border-r border-border w-[70px]">Brand Part<br/>Right</th>
              <th className="p-2 border-r border-border w-[60px]">Remark<br/>LH</th>
              <th className="p-2 w-[60px]">Remark<br/>RH</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {DUMMY_SUMMARY_DATA.map((row, idx) => {
              const bgClass = row.name ? 'bg-white dark:bg-transparent' : 'bg-muted/10 dark:bg-muted/5';
              return (
                <tr key={idx} className={`${bgClass} hover:bg-muted/20 transition-colors`}>
                  <td className="p-2 border-r border-border font-bold text-foreground">{row.name}</td>
                  <td className="p-2 border-r border-border text-foreground font-semibold bg-yellow-300 dark:bg-yellow-500/20">{row.nom ?? '-'}</td>
                  <td className="p-2 border-r border-border text-foreground font-semibold bg-yellow-300 dark:bg-yellow-500/20">{row.reb ?? '-'}</td>
                  <td className="p-2 border-r border-border text-foreground bg-blue-50/50 dark:bg-blue-900/10 font-medium">{row.measL ?? '-'}</td>
                  <td className="p-2 border-r border-border text-foreground bg-blue-50/50 dark:bg-blue-900/10 font-medium">{row.measR ?? '-'}</td>
                  <td className="p-2 border-r border-border text-foreground text-center font-medium">{row.wornL ?? '-'}</td>
                  <td className="p-2 border-r border-border text-foreground text-center font-medium">{row.wornR ?? '-'}</td>
                  <td className="p-2 border-r border-border text-foreground font-mono">{row.repPlanL}</td>
                  <td className="p-2 border-r border-border text-foreground font-mono">{row.repPlanR}</td>
                  <td className="p-2 border-r border-border text-foreground bg-teal-50/50 dark:bg-teal-900/10 font-medium text-center">{row.hmInstL ?? '-'}</td>
                  <td className="p-2 border-r border-border text-foreground bg-teal-50/50 dark:bg-teal-900/10 font-medium text-center">{row.hmInstR ?? '-'}</td>
                  <td className="p-2 border-r border-border text-foreground font-mono">{row.instDateL}</td>
                  <td className="p-2 border-r border-border text-foreground font-mono">{row.instDateR}</td>
                  <td className="p-2 border-r border-border text-foreground font-medium text-center">{row.lifeL ?? '-'}</td>
                  <td className="p-2 border-r border-border text-foreground font-medium text-center">{row.lifeR ?? '-'}</td>
                  <td className="p-2 border-r border-border text-foreground bg-emerald-50/50 dark:bg-emerald-900/10 font-bold">{row.brandL}</td>
                  <td className="p-2 border-r border-border text-foreground bg-emerald-50/50 dark:bg-emerald-900/10 font-bold">{row.brandR}</td>
                  <td className="p-2 border-r border-border">
                    {row.remL !== '-' && (
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold text-white ${
                        row.remL === 'GOOD' ? 'bg-green-500' : 'bg-teal-500'
                      }`}>
                        {row.remL}
                      </span>
                    )}
                    {row.remL === '-' && '-'}
                  </td>
                  <td className="p-2">
                    {row.remR !== '-' && (
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold text-white ${
                        row.remR === 'GOOD' ? 'bg-green-500' : 'bg-teal-500'
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
