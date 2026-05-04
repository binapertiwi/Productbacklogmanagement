// ─── Component Data for Performance Dashboards ──────────────────────────────────
// This file serves mock data specific to the new commodity performance views

export type CommodityType = 'BAT' | 'GET' | 'TYR' | 'FCG' | 'LUB' | 'Autofire' | 'Autolube' | 'U/C';

export const generatePerformanceData = (commodity: CommodityType) => {
  // Pies
  const populationData = [
    { name: 'Contract', value: 65, color: '#f97316' },
    { name: 'Non Contract', value: 35, color: '#1a2b4a' },
  ];

  const branchData = [
    { name: 'SBY', value: 20 },
    { name: 'PKU', value: 15 },
    { name: 'BJM', value: 25 },
    { name: 'BPP', value: 30 },
    { name: 'MKS', value: 10 },
  ];
  const BRANCH_COLORS = ['#3b82f6', '#f97316', '#22c55e', '#eab308', '#a855f7'];

  const backlogCoveragePie = [
    { name: 'Achieved', value: 75, color: '#f97316' },
    { name: 'Not Achieved', value: 25, color: '#1a2b4a' },
  ];

  // Fixed: was using Math.random() which caused different values on every re-render (flickering bug).
  // Now uses deterministic, stable values per branch.
  const BRANCH_COVERAGES: Record<string, number> = {
    SBY: 72, PKU: 58, BJM: 85, BPP: 63, MKS: 90,
  };
  const backlogBranchData = branchData.map(b => ({
    name: b.name,
    coverage: BRANCH_COVERAGES[b.name] ?? 70,
  }));

  const componentStatus = [
    { part: 'Component A', replace: 40, good: 60, monitor: 20 },
    { part: 'Component B', replace: 20, good: 50, monitor: 30 },
    { part: 'Component C', replace: 10, good: 80, monitor: 10 },
    { part: 'Component D', replace: 30, good: 40, monitor: 30 },
  ];

  const lifetimeData = [
    { name: 'Type A', min: 1000, avg: 1500, max: 2000 },
    { name: 'Type B', min: 1200, avg: 1800, max: 2400 },
    { name: 'Type C', min: 800, avg: 1100, max: 1500 },
    { name: 'Type D', min: 2000, avg: 2500, max: 3000 },
    { name: 'Type E', min: 1500, avg: 1800, max: 2200 },
  ];

  const costPerHour = [
    { size: 'Size 1', cost: 120 },
    { size: 'Size 2', cost: 220 },
    { size: 'Size 3', cost: 150 },
    { size: 'Size 4', cost: 250 },
    { size: 'Size 5', cost: 550 },
    { size: 'Size 6', cost: 350 },
    { size: 'Size 7', cost: 650 },
    { size: 'Size 8', cost: 420 },
    { size: 'Size 9', cost: 110 },
    { size: 'Size 10', cost: 210 },
  ];

  const damageTrend = [
    { size: 'Size 1', replace: 15, good: 40, repair: 10 },
    { size: 'Size 2', replace: 25, good: 60, repair: 20 },
    { size: 'Size 3', replace: 35, good: 50, repair: 30 },
    { size: 'Size 4', replace: 45, good: 80, repair: 40 },
    { size: 'Size 5', replace: 55, good: 100, repair: 50 },
  ];

  const planTable = [
    { customer: 'PT ABC', plant: 'SMD', pn: 'HD785', desc: 'HOSE ASSY', jan: 4, feb: 5, mar: 5, apr: 4, may: 5, jun: 6, jul: 5, aug: 5, sep: 4, oct: 2, nov: 3, dec: 6, total: 52 },
    { customer: 'PT DEC', plant: 'BJM', pn: 'PC2000', desc: 'HOSE ASSY', jan: 6, feb: 7, mar: 3, apr: 4, may: 3, jun: 4, jul: 5, aug: 3, sep: 4, oct: 3, nov: 2, dec: 4, total: 48 },
    { customer: 'PT ABC', plant: 'SMD', pn: 'HD465', desc: 'HOSE ASSY', jan: 4, feb: 5, mar: 5, apr: 4, may: 5, jun: 6, jul: 5, aug: 5, sep: 4, oct: 2, nov: 3, dec: 5, total: 52 },
    { customer: 'PT DEC', plant: 'BJM', pn: 'PC1250', desc: 'HOSE ASSY', jan: 6, feb: 7, mar: 3, apr: 4, may: 3, jun: 4, jul: 5, aug: 3, sep: 4, oct: 3, nov: 2, dec: 4, total: 48 },
    { customer: 'PT ABC', plant: 'BJM', pn: 'D375', desc: 'HOSE ASSY', jan: 4, feb: 5, mar: 5, apr: 4, may: 5, jun: 6, jul: 5, aug: 5, sep: 4, oct: 2, nov: 3, dec: 5, total: 52 },
  ];

  const costTable = [
    { pn: '15T-203-121A', minLine: 3100, avg: 4530, max: 6500, price: '2.500.000', costPerHour: 554 },
    { pn: '15T-203-121B', minLine: 2100, avg: 3530, max: 4500, price: '1.200.000', costPerHour: 340 },
    { pn: '15T-203-121C', minLine: 4100, avg: 5530, max: 7500, price: '3.800.000', costPerHour: 680 },
  ];

  return {
    populationData,
    branchData,
    BRANCH_COLORS,
    backlogCoveragePie,
    backlogBranchData,
    componentStatus,
    lifetimeData,
    costPerHour,
    damageTrend,
    planTable,
    costTable,
  };
};
