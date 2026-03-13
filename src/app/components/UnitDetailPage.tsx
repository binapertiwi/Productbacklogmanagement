import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router';
import {
  ArrowLeft, Activity, MapPin, Clock, ChevronRight,
  Sparkles, Download, AlertTriangle, Bot
} from 'lucide-react';
import { CommodityKey, RecommendedPart, ALL_COMMODITIES, COMMODITY_LABELS } from '../data/inspectionTypes';
import { findUnitBySerial } from '../data/inspectionMockData';
import { unitHealthData } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { lazy, Suspense } from 'react';

const InspectionReport = lazy(() =>
  import('./InspectionReport').then((m) => ({ default: m.InspectionReport }))
);

const statusRank = { Critical: 0, Caution: 1, Monitor: 2, Good: 3, Replace: 0, 'N/A': 4 };

export function UnitDetailPage() {
  const { serialNumber } = useParams<{ serialNumber: string }>();
  const navigate = useNavigate();

  // Try to find unit from holistic data, fallback to basic mockData
  const holisticUnit = serialNumber ? findUnitBySerial(serialNumber) : undefined;
  const basicUnit = unitHealthData.find(u => u.serialNumber === serialNumber);

  // Determine active commodity — default to the most critical one
  const defaultCommodity = holisticUnit
    ? [...ALL_COMMODITIES].sort((a, b) =>
        (statusRank[holisticUnit.commodityStatus[a]] ?? 5) -
        (statusRank[holisticUnit.commodityStatus[b]] ?? 5)
      ).find(c => holisticUnit.commodityStatus[c] !== 'N/A') ?? 'U/C'
    : 'U/C';

  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as CommodityKey | null;
  const initialTab = tabParam && ALL_COMMODITIES.includes(tabParam) ? tabParam : defaultCommodity;

  const [activeTab, setActiveTab] = useState<CommodityKey>(initialTab);

  // Sync tab with URL parameter
  useEffect(() => {
    const currentTab = searchParams.get('tab') as CommodityKey | null;
    if (currentTab && ALL_COMMODITIES.includes(currentTab)) {
      setActiveTab(currentTab);
    }
  }, [searchParams]);

  if (!holisticUnit && !basicUnit) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground font-bold">Unit tidak ditemukan: {serialNumber}</p>
          <button onClick={() => navigate(-1)} className="mt-4 text-brand-green font-black hover:underline flex items-center gap-1 mx-auto">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
        </div>
      </div>
    );
  }

  // Merge data sources
  const unit = holisticUnit ?? {
    serialNumber: basicUnit!.serialNumber,
    model: basicUnit!.model,
    customer: basicUnit!.site,
    site: basicUnit!.site,
    hoursOperated: basicUnit!.hoursOperated,
    lastInspection: basicUnit!.lastInspection,
    overallHealth: basicUnit!.overallHealth as any,
    aiSummary: 'AI sedang menganalisis kondisi unit ini...',
    commodityStatus: basicUnit!.commodityStatus as any,
    inspectionReports: {},
  };

  const activeReport = holisticUnit?.inspectionReports?.[activeTab];
  const tabStatus = unit.commodityStatus[activeTab];

  const handleExportPO = (recommendations: RecommendedPart[]) => {
    alert(`Draft PO untuk ${activeTab} disiapkan!\n${recommendations.length} part dari ${unit.serialNumber} telah ditambahkan.`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── STICKY UNIT HEADER ───────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-card/95 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="px-4 sm:px-6 py-3">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-2">
            <button onClick={() => navigate(-1)} className="hover:text-brand-green transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-navy dark:text-brand-green">Unit Detail</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{unit.serialNumber}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Unit Identity */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-navy dark:bg-brand-blue/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <Activity className="w-6 h-6 text-white dark:text-brand-green" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-lg sm:text-xl font-black text-primary dark:text-foreground tracking-tight">{unit.serialNumber}</h1>
                  <StatusBadge status={unit.overallHealth} size="md" />
                </div>
                <p className="text-xs text-muted-foreground font-bold">{unit.model}</p>
                <div className="flex items-center gap-3 mt-0.5 text-[11px] text-muted-foreground font-bold">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{unit.site}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />SMU: {unit.hoursOperated.toLocaleString()} Hrs</span>
                  <span>·</span>
                  <span>{unit.customer}</span>
                </div>
              </div>
            </div>

            {/* Health Badges — 7 commodities */}
            <div className="flex flex-wrap gap-1.5">
              {ALL_COMMODITIES.map(comm => {
                const s = unit.commodityStatus[comm];
                const isNA = s === 'N/A';
                return (
                  <div
                    key={comm}
                    title={`${COMMODITY_LABELS[comm]}: ${s}`}
                    className={`px-2 py-1 rounded-lg border text-[10px] font-black flex flex-col items-center leading-none cursor-default transition-all
                      ${isNA
                        ? 'bg-muted border-border text-muted-foreground opacity-50'
                        : s === 'Critical'
                          ? 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
                          : s === 'Caution'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400'
                            : 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
                      }`}
                  >
                    <span className="text-[9px] opacity-60 pb-0.5">{comm}</span>
                    <span>{s}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* AI Summary Panel */}
        <div className="bg-gradient-to-r from-[#43E97B]/10 to-[#38F9D7]/10 dark:from-[#43E97B]/5 dark:to-[#38F9D7]/5 rounded-2xl border border-[#38F9D7]/25 p-4 flex items-start gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#43E97B] to-[#38F9D7] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
            <Bot className="w-5 h-5 text-teal-900" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">AI Unit Summary</p>
              <span className="text-[9px] bg-teal-500/10 text-teal-600 dark:text-teal-400 px-1.5 py-0.5 rounded font-bold">Active Thinking</span>
            </div>
            <p className="text-sm font-bold text-foreground/90 leading-relaxed">{unit.aiSummary}</p>
          </div>
        </div>

        {/* ── COMMODITY TABS ─────────────────────────────────────────────────── */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-border overflow-x-auto">
            <div className="flex min-w-max px-4 pt-3">
              {ALL_COMMODITIES.map(comm => {
                const s = unit.commodityStatus[comm];
                const isNA = s === 'N/A';
                const hasReport = !!holisticUnit?.inspectionReports?.[comm];
                const isActive = activeTab === comm;

                return (
                  <button
                    key={comm}
                    disabled={isNA}
                    onClick={() => setActiveTab(comm)}
                    className={`relative flex flex-col items-center gap-0.5 px-4 py-2.5 text-[11px] font-black border-b-2 transition-all whitespace-nowrap mr-1
                      ${isNA
                        ? 'border-transparent text-muted-foreground/40 cursor-not-allowed opacity-50'
                        : isActive
                          ? 'border-brand-green text-brand-green bg-brand-green/5'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 hover:bg-muted/30'
                      }`}
                  >
                    {/* Status dot */}
                    {!isNA && (
                      <div className={`w-1.5 h-1.5 rounded-full mb-0.5 ${
                        s === 'Critical' ? 'bg-red-500' :
                        s === 'Caution' ? 'bg-yellow-400' :
                        'bg-brand-green'
                      }`} />
                    )}
                    <span className="uppercase tracking-wider">{comm}</span>
                    <span className="text-[8px] font-medium opacity-70 normal-case">{COMMODITY_LABELS[comm]}</span>
                    {hasReport && !isNA && (
                      <div className="absolute -top-0.5 right-1 w-1.5 h-1.5 rounded-full bg-brand-blue" title="Laporan tersedia" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-5">
            {activeReport ? (
              <Suspense fallback={<div className="flex justify-center py-24"><div className="w-8 h-8 border-4 border-primary/20 border-t-brand-green rounded-full animate-spin" /></div>}>
                <InspectionReport
                  key={activeTab}
                  report={activeReport}
                  unitId={unit.serialNumber}
                  onExportPO={handleExportPO}
                />
              </Suspense>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  tabStatus === 'N/A'
                    ? 'bg-muted'
                    : tabStatus === 'Critical'
                      ? 'bg-red-100 dark:bg-red-900/20'
                      : 'bg-muted/50'
                }`}>
                  <AlertTriangle className={`w-8 h-8 ${
                    tabStatus === 'N/A' ? 'text-muted-foreground/30' :
                    tabStatus === 'Critical' ? 'text-red-400' : 'text-muted-foreground/50'
                  }`} />
                </div>
                {tabStatus === 'N/A' ? (
                  <>
                    <p className="text-sm font-black text-muted-foreground">Komoditas {activeTab} tidak diaplikasikan</p>
                    <p className="text-xs text-muted-foreground/70">Unit ini tidak dilengkapi dengan {COMMODITY_LABELS[activeTab]}.</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-black text-foreground">{COMMODITY_LABELS[activeTab]} — Status: <StatusBadge status={tabStatus} /></p>
                    <p className="text-xs text-muted-foreground max-w-md">
                      Laporan inspeksi detail untuk komoditas ini belum tersedia dalam sistem. Silakan hubungi mekanik untuk membuat laporan inspeksi.
                    </p>
                    <button className="mt-2 flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-xl text-xs font-bold hover:opacity-90 transition-all">
                      <Download className="w-3.5 h-3.5" /> Request Inspection Report
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
