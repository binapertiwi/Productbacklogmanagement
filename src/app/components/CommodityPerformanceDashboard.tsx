import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { generatePerformanceData, CommodityType } from '../data/performanceMockData';

interface Props {
  commodity: CommodityType;
}

export function CommodityPerformanceDashboard({ commodity }: Props) {
  // useMemo: only regenerate data when commodity tab changes
  const data = useMemo(() => generatePerformanceData(commodity), [commodity]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-wrap gap-4 items-end">
        {(commodity === 'TYR' || commodity === 'GET' || commodity === 'U/C') && (
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Brand</label>
            <select className="border border-gray-200 rounded-md px-3 py-1.5 text-sm bg-white min-w-[150px]">
              <option>All</option>
            </select>
          </div>
        )}
        {(commodity === 'GET' || commodity === 'U/C') && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Component</label>
              <select className="border border-gray-200 rounded-md px-3 py-1.5 text-sm bg-white min-w-[150px]">
                <option>All</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Unit Type</label>
              <select className="border border-gray-200 rounded-md px-3 py-1.5 text-sm bg-white min-w-[150px]">
                <option>All</option>
              </select>
            </div>
          </>
        )}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Customer Name</label>
          <select className="border border-gray-200 rounded-md px-3 py-1.5 text-sm bg-white min-w-[150px]">
            <option>All</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Site</label>
          <select className="border border-gray-200 rounded-md px-3 py-1.5 text-sm bg-white min-w-[150px]">
            <option>All</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Period</label>
          <select className="border border-gray-200 rounded-md px-3 py-1.5 text-sm bg-white min-w-[150px]">
            <option>All</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-center mb-4 text-[#1a2b4a]">POPULATION {commodity}</h3>
          <div className="grid grid-cols-2 gap-4">
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie data={data.populationData} dataKey="value" cx="50%" cy="50%" innerRadius={0} outerRadius={60}>
                    {data.populationData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip />
                    <Legend iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
             <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie data={data.branchData} dataKey="value" cx="50%" cy="50%" innerRadius={0} outerRadius={60}>
                    {data.branchData.map((e, i) => <Cell key={i} fill={data.BRANCH_COLORS[i % data.BRANCH_COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-center mb-4 text-[#1a2b4a]">BACKLOG COVERAGE</h3>
           <div className="grid grid-cols-2 gap-4">
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie data={data.backlogCoveragePie} dataKey="value" cx="50%" cy="50%" innerRadius={30} outerRadius={60}>
                    {data.backlogCoveragePie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip />
                    <Legend iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.backlogBranchData}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="coverage" fill="#1a2b4a">
                      {data.backlogBranchData.map((e, i) => <Cell key={i} fill={data.BRANCH_COLORS[i % data.BRANCH_COLORS.length]} />)}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-center mb-4 text-[#1a2b4a]">LIFETIME TREND</h3>
           <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.lifetimeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend iconType="circle" />
                <Bar dataKey="min" fill="#1a2b4a" name="Min" />
                <Bar dataKey="avg" fill="#f97316" name="Average" />
                <Bar dataKey="max" fill="#22c55e" name="Max" />
            </BarChart>
           </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
           <h3 className="text-sm font-semibold text-center mb-4 text-[#1a2b4a]">{commodity === 'GET' ? 'WEARNESS TREND' : 'COST PER HOUR'}</h3>
           <ResponsiveContainer width="100%" height={250}>
            {commodity === 'GET' ? (
                <LineChart data={data.costPerHour}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="size" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="cost" stroke="#1a2b4a" strokeWidth={2} dot={false} />
                </LineChart>
            ) : (
                <BarChart data={data.costPerHour}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="size" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="cost" fill="#1a2b4a" />
                </BarChart>
            )}
           </ResponsiveContainer>
        </div>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-[#1a2b4a] text-white text-xs font-semibold px-4 py-2 uppercase">Plan Replacement</div>
                <div className="overflow-x-auto">
                    <table className="w-full text-[10px] text-center whitespace-nowrap">
                        <thead className="bg-[#1a2b4a]/90 text-white">
                            <tr>
                                <th className="px-2 py-1.5 font-medium border-r border-[#1a2b4a]">Customer</th>
                                <th className="px-2 py-1.5 font-medium border-r border-[#1a2b4a]">Plant</th>
                                <th className="px-2 py-1.5 font-medium border-r border-[#1a2b4a]">Part Number</th>
                                <th className="px-2 py-1.5 font-medium border-r border-[#1a2b4a]">Desc</th>
                                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                                    <th key={m} className="px-1.5 py-1.5 font-medium border-r border-[#1a2b4a]">{m.toUpperCase()}</th>
                                ))}
                                <th className="px-2 py-1.5 font-medium">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.planTable.map((r, i) => (
                                <tr key={i} className="border-b border-gray-100">
                                    <td className="px-2 py-1.5 font-semibold text-gray-700">{r.customer}</td>
                                    <td className="px-2 py-1.5 font-medium text-gray-600">{r.plant}</td>
                                    <td className="px-2 py-1.5">{r.pn}</td>
                                    <td className="px-2 py-1.5 text-left truncate max-w-[100px]">{r.desc}</td>
                                    <td className="px-1.5 py-1.5 bg-blue-50/50">{r.jan}</td>
                                    <td className="px-1.5 py-1.5">{r.feb}</td>
                                    <td className="px-1.5 py-1.5 bg-blue-50/50">{r.mar}</td>
                                    <td className="px-1.5 py-1.5">{r.apr}</td>
                                    <td className="px-1.5 py-1.5 bg-blue-50/50">{r.may}</td>
                                    <td className="px-1.5 py-1.5">{r.jun}</td>
                                    <td className="px-1.5 py-1.5 bg-blue-50/50">{r.jul}</td>
                                    <td className="px-1.5 py-1.5">{r.aug}</td>
                                    <td className="px-1.5 py-1.5 bg-blue-50/50">{r.sep}</td>
                                    <td className="px-1.5 py-1.5">{r.oct}</td>
                                    <td className="px-1.5 py-1.5 bg-blue-50/50">{r.nov}</td>
                                    <td className="px-1.5 py-1.5">{r.dec}</td>
                                    <td className="px-2 py-1.5 font-bold text-[#1a2b4a] bg-blue-50">{r.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-start">
                 <div className="bg-[#59cae3] text-white text-xs font-semibold px-4 py-2 uppercase">Cost Per Hour Analysis</div>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-center">
                        <thead className="bg-[#59cae3]/90 text-white">
                            <tr>
                                <th className="px-3 py-2 font-medium border-r border-[#59cae3]">Part Number</th>
                                <th className="px-3 py-2 font-medium border-r border-[#59cae3]">Min Lifetime</th>
                                <th className="px-3 py-2 font-medium border-r border-[#59cae3]">Avg Lifetime</th>
                                <th className="px-3 py-2 font-medium border-r border-[#59cae3]">Max Lifetime</th>
                                <th className="px-3 py-2 font-medium border-r border-[#59cae3]">Price</th>
                                <th className="px-3 py-2 font-medium">Cost/Hour</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.costTable.map((r, i) => (
                                <tr key={i} className="border-b border-gray-100">
                                    <td className="px-3 py-2 font-medium text-gray-700">{r.pn}</td>
                                    <td className="px-3 py-2">{r.minLine}</td>
                                    <td className="px-3 py-2">{r.avg}</td>
                                    <td className="px-3 py-2">{r.max}</td>
                                    <td className="px-3 py-2">Rp {r.price}</td>
                                    <td className="px-3 py-2 font-semibold text-[#1a2b4a] bg-blue-50">Rp {r.costPerHour}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
       </div>

    </div>
  );
}
