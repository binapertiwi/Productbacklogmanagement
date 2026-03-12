import React from 'react';
import { CommodityKey, MeasurementItem, HealthStatus } from '../data/inspectionTypes';

interface VisualMappingProps {
  commodityType: CommodityKey;
  measurements: MeasurementItem[];
}

// Helper: Convert healthPercentage to color
function getStatusColor(status: HealthStatus): string {
  if (status === 'Critical' || status === 'Replace') return '#ef4444';
  if (status === 'Caution' || status === 'Monitor') return '#eab308';
  if (status === 'Good') return '#23a34e';
  return '#94a3b8';
}

// ─── Diagram U/C (Undercarriage) ──────────────────────────────────────────────
function UCSvgDiagram({ measurements }: { measurements: MeasurementItem[] }) {
  const getItem = (name: string) => measurements.find(m => m.componentName.toLowerCase().includes(name.toLowerCase()));
  const trackLH = getItem('Track Shoe LH');
  const trackRH = getItem('Track Shoe RH');
  const sprocketLH = getItem('Sprocket LH');
  const sprocketRH = getItem('Sprocket RH');
  const topRollerLH = getItem('Top Roller LH');
  const topRollerRH = getItem('Top Roller RH');
  const frontIdlerLH = getItem('Front Idler LH');

  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-xl mx-auto" aria-label="U/C Undercarriage diagram">
      {/* Body frame */}
      <rect x="100" y="60" width="400" height="80" rx="8" fill="var(--muted)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="300" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="var(--muted-foreground)">KOMATSU D375A-6 — UNDERCARRIAGE</text>

      {/* Front Idler LH */}
      <circle cx="90" cy="100" r="30" fill={getStatusColor(frontIdlerLH?.actionStatus ?? 'N/A')} opacity="0.85" />
      <text x="90" y="104" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">Idler</text>

      {/* Sprockets */}
      <circle cx="510" cy="100" r="28" fill={getStatusColor(sprocketLH?.actionStatus ?? 'N/A')} opacity="0.85" />
      <text x="510" y="97" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">Spr</text>
      <text x="510" y="108" textAnchor="middle" fontSize="8" fill="white">LH</text>

      <circle cx="555" cy="100" r="22" fill={getStatusColor(sprocketRH?.actionStatus ?? 'N/A')} opacity="0.7" />
      <text x="555" y="97" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">Spr</text>
      <text x="555" y="107" textAnchor="middle" fontSize="7" fill="white">RH</text>

      {/* Top Rollers */}
      <circle cx="220" cy="58" r="14" fill={getStatusColor(topRollerLH?.actionStatus ?? 'N/A')} opacity="0.85" />
      <text x="220" y="62" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">TR-L</text>
      <circle cx="380" cy="58" r="14" fill={getStatusColor(topRollerRH?.actionStatus ?? 'N/A')} opacity="0.85" />
      <text x="380" y="62" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">TR-R</text>

      {/* Track Shoes (ground bars) */}
      <rect x="60" y="132" width="430" height="18" rx="4" fill={getStatusColor(trackLH?.actionStatus ?? 'N/A')} opacity="0.8" />
      <text x="275" y="145" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">Track Shoe LH  {trackLH ? `(${trackLH.actualValue}${trackLH.measurementUnit})` : ''}</text>

      <rect x="60" y="154" width="430" height="14" rx="4" fill={getStatusColor(trackRH?.actionStatus ?? 'N/A')} opacity="0.6" />
      <text x="275" y="164" textAnchor="middle" fontSize="8" fill="white">Track Shoe RH  {trackRH ? `(${trackRH.actualValue}${trackRH.measurementUnit})` : ''}</text>

      {/* Legend */}
      <g transform="translate(10, 10)">
        <circle cx="10" cy="10" r="6" fill="#ef4444" /><text x="20" y="14" fontSize="9" fill="var(--muted-foreground)">Critical</text>
        <circle cx="80" cy="10" r="6" fill="#eab308" /><text x="90" y="14" fontSize="9" fill="var(--muted-foreground)">Caution</text>
        <circle cx="150" cy="10" r="6" fill="#23a34e" /><text x="160" y="14" fontSize="9" fill="var(--muted-foreground)">Good</text>
      </g>
    </svg>
  );
}

// ─── Diagram TYR (Tyre) ───────────────────────────────────────────────────────
function TYRSvgDiagram({ measurements }: { measurements: MeasurementItem[] }) {
  const positions: { label: string; key: string; cx: number; cy: number }[] = [
    { label: 'FL', key: 'Front Left', cx: 150, cy: 70 },
    { label: 'FR', key: 'Front Right', cx: 450, cy: 70 },
    { label: 'RL', key: 'Rear Left', cx: 150, cy: 140 },
    { label: 'RR', key: 'Rear Right', cx: 450, cy: 140 },
  ];

  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-xl mx-auto" aria-label="TYR Tyre position diagram">
      {/* Vehicle body */}
      <rect x="210" y="60" width="180" height="90" rx="12" fill="var(--muted)" stroke="var(--border)" strokeWidth="2" />
      <text x="300" y="110" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--muted-foreground)">VEHICLE</text>

      {positions.map(pos => {
        const item = measurements.find(m => m.componentName.includes(pos.key) || m.position === pos.label);
        const color = getStatusColor(item?.actionStatus ?? 'N/A');
        return (
          <g key={pos.label}>
            <ellipse cx={pos.cx} cy={pos.cy} rx="35" ry="22" fill={color} opacity="0.85" />
            <text x={pos.cx} y={pos.cy - 2} textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">{pos.label}</text>
            {item && <text x={pos.cx} y={pos.cy + 10} textAnchor="middle" fontSize="8" fill="white">{item.actualValue}{item.measurementUnit}</text>}
          </g>
        );
      })}

      {/* Legend */}
      <g transform="translate(10, 180)">
        <circle cx="10" cy="8" r="5" fill="#ef4444" /><text x="18" y="12" fontSize="9" fill="var(--muted-foreground)">Critical</text>
        <circle cx="75" cy="8" r="5" fill="#eab308" /><text x="83" y="12" fontSize="9" fill="var(--muted-foreground)">Caution</text>
        <circle cx="140" cy="8" r="5" fill="#23a34e" /><text x="148" y="12" fontSize="9" fill="var(--muted-foreground)">Good</text>
        <circle cx="195" cy="8" r="5" fill="#94a3b8" /><text x="203" y="12" fontSize="9" fill="var(--muted-foreground)">N/A</text>
      </g>
    </svg>
  );
}

// ─── Diagram BAT (Battery) ────────────────────────────────────────────────────
function BATSvgDiagram({ measurements }: { measurements: MeasurementItem[] }) {
  return (
    <svg viewBox="0 0 600 180" className="w-full max-w-xl mx-auto" aria-label="Battery diagram">
      <text x="300" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--muted-foreground)">BATTERY BANK LAYOUT</text>
      {measurements.map((item, idx) => {
        const color = getStatusColor(item.actionStatus);
        const x = 90 + idx * 200;
        return (
          <g key={item.id}>
            <rect x={x} y="50" width="140" height="90" rx="8" fill={color} opacity="0.85" />
            <text x={x + 70} y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">{item.componentName}</text>
            <text x={x + 70} y="108" textAnchor="middle" fontSize="14" fontWeight="900" fill="white">{item.actualValue} {item.measurementUnit}</text>
            <text x={x + 70} y="128" textAnchor="middle" fontSize="9" fill="white">{item.position ?? ''}</text>
          </g>
        );
      })}
      {/* Terminal connectors */}
      {measurements.length > 1 && (
        <line x1="230" y1="95" x2="290" y2="95" stroke="var(--muted-foreground)" strokeWidth="3" strokeDasharray="4 2" />
      )}
    </svg>
  );
}

// ─── Generic Diagram for FCG / Autofire / Autolube ────────────────────────────
function GenericDiagram({ commodityType, measurements }: { commodityType: CommodityKey; measurements: MeasurementItem[] }) {
  const titleMap: Partial<Record<CommodityKey, string>> = {
    FCG: 'FILTER & CONNECTOR LAYOUT',
    Autofire: 'FIRE SUPPRESSION SYSTEM LAYOUT',
    Autolube: 'LUBRICATION SYSTEM LAYOUT',
    GET: 'GROUND ENGAGING TOOLS LAYOUT',
  };
  return (
    <svg viewBox="0 0 600 180" className="w-full max-w-xl mx-auto" aria-label={`${commodityType} diagram`}>
      <text x="300" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--muted-foreground)">
        {titleMap[commodityType] ?? commodityType + ' COMPONENTS LAYOUT'}
      </text>
      {measurements.slice(0, 5).map((item, idx) => {
        const color = getStatusColor(item.actionStatus);
        const col = idx % 3;
        const row = Math.floor(idx / 3);
        const x = 60 + col * 180;
        const y = 50 + row * 70;
        return (
          <g key={item.id}>
            <rect x={x} y={y} width="150" height="48" rx="8" fill={color} opacity="0.85" />
            <text x={x + 75} y={y + 18} textAnchor="middle" fontSize="9" fontWeight="bold" fill="white"
              style={{ textOverflow: 'ellipsis' }}>
              {item.componentName.length > 22 ? item.componentName.substring(0, 20) + '…' : item.componentName}
            </text>
            <text x={x + 75} y={y + 33} textAnchor="middle" fontSize="11" fontWeight="900" fill="white">
              {item.actualValue} {item.measurementUnit}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function VisualMapping({ commodityType, measurements }: VisualMappingProps) {
  return (
    <div className="w-full bg-muted/30 dark:bg-muted/10 rounded-xl p-4 border border-border/50">
      {commodityType === 'U/C' && <UCSvgDiagram measurements={measurements} />}
      {commodityType === 'TYR' && <TYRSvgDiagram measurements={measurements} />}
      {commodityType === 'BAT' && <BATSvgDiagram measurements={measurements} />}
      {(commodityType === 'FCG' || commodityType === 'Autofire' || commodityType === 'Autolube' || commodityType === 'GET') && (
        <GenericDiagram commodityType={commodityType} measurements={measurements} />
      )}
    </div>
  );
}
