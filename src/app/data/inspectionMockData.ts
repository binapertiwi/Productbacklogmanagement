// ─── Inspection Report: Mock Data for Unified Unit Detail View ───────────────
// Provides rich, realistic mock data for 3 units with detailed inspection
// reports for multiple commodities, used by UnitDetailPage.

import { UnitHolisticData } from './inspectionTypes';

// Placeholder photos from realistic-looking construction equipment images
const PLACEHOLDER_PHOTOS = [
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
];

export const unitHolisticData: UnitHolisticData[] = [
  // ─── UNIT 1: D375A-6-50234 (Critical) ──────────────────────────────────────
  {
    serialNumber: 'D375A-6-50234',
    model: 'Komatsu D375A-6',
    customer: 'PT Adaro Energy',
    site: 'Tambang Adaro — Kalimantan Selatan',
    hoursOperated: 14_250,
    lastInspection: '2026-02-14',
    overallHealth: 'Critical',
    aiSummary: 'Unit ini membutuhkan penggantian U/C segera (keausan 92%). Pertimbangkan bundling dengan GET untuk menghemat 3 hari downtime dan estimasi penghematan Rp 45 juta biaya mobilisasi.',
    commodityStatus: {
      BAT: 'Good', GET: 'Critical', TYR: 'Caution',
      FCG: 'Good', Autofire: 'Good', Autolube: 'N/A', 'U/C': 'Critical',
    },
    inspectionReports: {
      'U/C': {
        metadata: {
          inspectionId: 'INS-2026-UC-001',
          inspectionDate: '2026-02-14',
          mechanicName: 'Budi Santoso',
          mechanicId: 'MEC-BJM-021',
          commodity: 'U/C',
          overallStatus: 'Critical',
          serviceMeterUnit: 14_250,
        },
        measurements: [
          { 
            id: 'uc-1', componentName: 'Track Link Assembly LH', position: 'L', actualValue: 124.5, measurementUnit: 'mm', standardValue: '135.0mm', healthPercentage: 92, estimatedRemainingLife: 150, actionStatus: 'Critical', category: 'Link Assembly',
            imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a1cd13a1?w=50&h=50&fit=crop',
            history: [
              { date: '2025-08-10', smu: 12800, value: 134.2, wearPercentage: 15 },
              { date: '2025-10-15', smu: 13500, value: 131.5, wearPercentage: 45 },
              { date: '2025-12-20', smu: 14100, value: 126.8, wearPercentage: 82 },
              { date: '2026-02-14', smu: 14250, value: 124.5, wearPercentage: 92 }
            ]
          },
          { 
            id: 'uc-2', componentName: 'Track Link Assembly RH', position: 'R', actualValue: 125.8, measurementUnit: 'mm', standardValue: '135.0mm', healthPercentage: 88, estimatedRemainingLife: 220, actionStatus: 'Critical', category: 'Link Assembly',
            imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a1cd13a1?w=50&h=50&fit=crop',
            history: [
              { date: '2025-08-10', smu: 12800, value: 134.5, wearPercentage: 12 },
              { date: '2025-10-15', smu: 13500, value: 132.2, wearPercentage: 38 },
              { date: '2025-12-20', smu: 14100, value: 128.5, wearPercentage: 75 },
              { date: '2026-02-14', smu: 14250, value: 125.8, wearPercentage: 88 }
            ]
          },
          { 
            id: 'uc-3', componentName: 'Bushing LH', position: 'L', actualValue: 68.2, measurementUnit: 'mm', standardValue: '72.0mm', healthPercentage: 85, estimatedRemainingLife: 300, actionStatus: 'Critical', category: 'Bushings',
            imageUrl: 'https://images.unsplash.com/photo-1579847209170-4927cb044944?w=50&h=50&fit=crop',
            history: [
              { date: '2025-08-10', smu: 12800, value: 71.8, wearPercentage: 10 },
              { date: '2025-10-15', smu: 13500, value: 70.5, wearPercentage: 40 },
              { date: '2025-12-20', smu: 14100, value: 69.1, wearPercentage: 78 },
              { date: '2026-02-14', smu: 14250, value: 68.2, wearPercentage: 85 }
            ]
          },
          { 
            id: 'uc-4', componentName: 'Bushing RH', position: 'R', actualValue: 69.5, measurementUnit: 'mm', standardValue: '72.0mm', healthPercentage: 78, estimatedRemainingLife: 450, actionStatus: 'Caution', category: 'Bushings',
            imageUrl: 'https://images.unsplash.com/photo-1579847209170-4927cb044944?w=50&h=50&fit=crop',
            history: [
              { date: '2025-08-10', smu: 12800, value: 71.9, wearPercentage: 8 },
              { date: '2025-10-15', smu: 13500, value: 70.8, wearPercentage: 35 },
              { date: '2025-12-20', smu: 14100, value: 70.0, wearPercentage: 62 },
              { date: '2026-02-14', smu: 14250, value: 69.5, wearPercentage: 78 }
            ]
          },
          { 
            id: 'uc-5', componentName: 'Carrier Roller LH #1', position: 'L', actualValue: 185.0, measurementUnit: 'mm', standardValue: '200.0mm', healthPercentage: 65, estimatedRemainingLife: 800, actionStatus: 'Monitor', category: 'Rollers',
            imageUrl: 'https://images.unsplash.com/photo-1542646391-d8ec8f6c6d05?w=50&h=50&fit=crop',
            history: [
              { date: '2025-08-10', smu: 12800, value: 198.5, wearPercentage: 10 },
              { date: '2025-10-15', smu: 13500, value: 194.2, wearPercentage: 35 },
              { date: '2025-12-20', smu: 14100, value: 188.5, wearPercentage: 55 },
              { date: '2026-02-14', smu: 14250, value: 185.0, wearPercentage: 65 }
            ]
          },
          { 
            id: 'uc-6', componentName: 'Carrier Roller RH #1', position: 'R', actualValue: 187.5, measurementUnit: 'mm', standardValue: '200.0mm', healthPercentage: 58, estimatedRemainingLife: 950, actionStatus: 'Monitor', category: 'Rollers',
            imageUrl: 'https://images.unsplash.com/photo-1542646391-d8ec8f6c6d05?w=50&h=50&fit=crop',
            history: [
              { date: '2025-08-10', smu: 12800, value: 199.0, wearPercentage: 8 },
              { date: '2025-10-15', smu: 13500, value: 195.5, wearPercentage: 28 },
              { date: '2025-12-20', smu: 14100, value: 190.2, wearPercentage: 45 },
              { date: '2026-02-14', smu: 14250, value: 187.5, wearPercentage: 58 }
            ]
          },
          { 
            id: 'uc-7', componentName: 'Track Shoes LH (Grousers)', position: 'L', actualValue: 42.1, measurementUnit: 'mm', standardValue: '65.0mm', healthPercentage: 94, estimatedRemainingLife: 120, actionStatus: 'Critical', category: 'Track Shoes',
            imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=50&h=50&fit=crop',
            history: [
              { date: '2025-08-10', smu: 12800, value: 62.1, wearPercentage: 15 },
              { date: '2025-10-15', smu: 13500, value: 55.4, wearPercentage: 48 },
              { date: '2025-12-20', smu: 14100, value: 45.8, wearPercentage: 85 },
              { date: '2026-02-14', smu: 14250, value: 42.1, wearPercentage: 94 }
            ]
          },
          { 
            id: 'uc-8', componentName: 'Front Idler LH', position: 'L', actualValue: 18.5, measurementUnit: 'mm', standardValue: '22.0mm', healthPercentage: 45, estimatedRemainingLife: 1500, actionStatus: 'Good', category: 'Idlers',
            imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=50&h=50&fit=crop',
            history: [
              { date: '2025-08-10', smu: 12800, value: 21.8, wearPercentage: 5 },
              { date: '2025-10-15', smu: 13500, value: 20.5, wearPercentage: 20 },
              { date: '2025-12-20', smu: 14100, value: 19.2, wearPercentage: 35 },
              { date: '2026-02-14', smu: 14250, value: 18.5, wearPercentage: 45 }
            ]
          }
        ],
        evidence: {
          mechanicNotes: 'Track shoe kiri (LH) dalam kondisi kritis dengan keausan melebihi batas operasional. Terdapat retak pada 3 sambungan link di sisi LH. Sprocket LH menunjukkan tanda-tanda pitch elongation. Disarankan penggantian segera sebelum unit beroperasi pada shift berikutnya. Jika dioperasikan, risiko track lepas (off-track) sangat tinggi, terutama pada medan berlereng.',
          photoUrls: PLACEHOLDER_PHOTOS,
        },
        recommendations: [
          { partNumber: 'D37-32-81130', description: 'Track Shoe Assembly LH (Set)', quantity: 1, uom: 'Set', urgency: 'Critical', estimatedPrice: 45_000_000 },
          { partNumber: 'D37-32-82130', description: 'Track Shoe Assembly RH (Set)', quantity: 1, uom: 'Set', urgency: 'Critical', estimatedPrice: 45_000_000 },
          { partNumber: 'D37-32-41230', description: 'Sprocket LH', quantity: 1, uom: 'Pcs', urgency: 'Critical', estimatedPrice: 12_500_000 },
          { partNumber: 'D37-13-41100', description: 'Top Roller LH (Standard)', quantity: 2, uom: 'Pcs', urgency: 'Caution', estimatedPrice: 4_200_000 },
        ],
      },
      'GET': {
        metadata: {
          inspectionId: 'INS-2026-GET-001',
          inspectionDate: '2026-02-14',
          mechanicName: 'Budi Santoso',
          mechanicId: 'MEC-BJM-021',
          commodity: 'GET',
          overallStatus: 'Critical',
          serviceMeterUnit: 14_250,
        },
        measurements: [
          { id: 'get-1', componentName: 'Cutting Edge Center', position: 'Center', actualValue: 15, measurementUnit: 'mm', standardValue: '≥ 25mm', healthPercentage: 88, estimatedRemainingLife: 120, actionStatus: 'Critical' },
          { id: 'get-2', componentName: 'End Bit LH', position: 'L', actualValue: 22, measurementUnit: 'mm', standardValue: '≥ 30mm', healthPercentage: 82, estimatedRemainingLife: 200, actionStatus: 'Critical' },
          { id: 'get-3', componentName: 'End Bit RH', position: 'R', actualValue: 25, measurementUnit: 'mm', standardValue: '≥ 30mm', healthPercentage: 78, estimatedRemainingLife: 280, actionStatus: 'Caution' },
          { id: 'get-4', componentName: 'Tooth Adapter #1', position: 'Center-L', actualValue: 'OK', measurementUnit: '', healthPercentage: 90, actionStatus: 'Good' },
          { id: 'get-5', componentName: 'Tooth Adapter #2', position: 'Center-R', actualValue: 'Worn', measurementUnit: '', healthPercentage: 55, estimatedRemainingLife: 150, actionStatus: 'Monitor' },
        ],
        evidence: {
          mechanicNotes: 'Cutting edge center sudah menipis signifikan, mendekati batas penggantian. End bit LH sudah melebihi batas minimum. Kondisi operasi di material batubara keras mempercepat keausan 20-30% lebih cepat dari standar.',
          photoUrls: [PLACEHOLDER_PHOTOS[0], PLACEHOLDER_PHOTOS[2]],
        },
        recommendations: [
          { partNumber: 'D37-72-61320', description: 'Cutting Edge (Center) — 16 holes', quantity: 1, uom: 'Pcs', urgency: 'Critical', estimatedPrice: 8_500_000 },
          { partNumber: 'D37-72-61430', description: 'End Bit LH', quantity: 1, uom: 'Pcs', urgency: 'Critical', estimatedPrice: 3_200_000 },
        ],
      },
      'TYR': {
        metadata: {
          inspectionId: 'INS-2026-TYR-001',
          inspectionDate: '2026-02-14',
          mechanicName: 'Budi Santoso',
          mechanicId: 'MEC-BJM-021',
          commodity: 'TYR',
          overallStatus: 'Caution',
          serviceMeterUnit: 14_250,
        },
        measurements: [
          { id: 'tyr-1', componentName: 'Front Left Tyre', position: 'FL', actualValue: 25, measurementUnit: 'mm', standardValue: '≥ 20mm', healthPercentage: 78, estimatedRemainingLife: 500, actionStatus: 'Caution' },
          { id: 'tyr-2', componentName: 'Front Right Tyre', position: 'FR', actualValue: 28, measurementUnit: 'mm', standardValue: '≥ 20mm', healthPercentage: 82, estimatedRemainingLife: 650, actionStatus: 'Good' },
        ],
        evidence: {
          mechanicNotes: 'Ban depan kiri menunjukkan tanda-tanda keausan tidak merata (shoulder wear). Perlu pemeriksaan tekanan angin dan alignment secara berkala.',
          photoUrls: [PLACEHOLDER_PHOTOS[1]],
        },
        recommendations: [
          { partNumber: 'B40-D-26.5R25', description: 'Tyre 26.5R25 — Front Left', quantity: 1, uom: 'Pcs', urgency: 'Caution', estimatedPrice: 28_000_000 },
        ],
      },
      'BAT': {
        metadata: {
          inspectionId: 'INS-2026-BAT-001',
          inspectionDate: '2026-02-14',
          mechanicName: 'Budi Santoso',
          mechanicId: 'MEC-BJM-021',
          commodity: 'BAT',
          overallStatus: 'Good',
          serviceMeterUnit: 14_250,
        },
        measurements: [
          { id: 'bat-1', componentName: 'Battery #1 (Main)', position: 'L-Bank', actualValue: 24.8, measurementUnit: 'V', standardValue: '≥ 24V', healthPercentage: 88, estimatedRemainingLife: 2200, actionStatus: 'Good' },
          { id: 'bat-2', componentName: 'Battery #2 (Main)', position: 'R-Bank', actualValue: 24.5, measurementUnit: 'V', standardValue: '≥ 24V', healthPercentage: 85, estimatedRemainingLife: 2000, actionStatus: 'Good' },
        ],
        evidence: {
          mechanicNotes: 'Kondisi baterai masih baik. Tegangan sistem stabil di 24V. Tidak ada tanda korosi pada terminal.',
          photoUrls: [],
        },
        recommendations: [],
      },
    },
  },

  // ─── UNIT 2: PC800-8-61823 (Critical) ──────────────────────────────────────
  {
    serialNumber: 'PC800-8-61823',
    model: 'Komatsu PC800-8',
    customer: 'PT Thiess',
    site: 'Tambang Thiess — Kalimantan Timur',
    hoursOperated: 9_800,
    lastInspection: '2026-02-21',
    overallHealth: 'Critical',
    aiSummary: 'Hydraulic Filter FCG sudah melewati threshold (82%). Bundle penggantian dengan battery check untuk mencegah gangguan elektrikal yang berpotensi menyebabkan downtime lebih lama.',
    commodityStatus: {
      BAT: 'Caution', GET: 'Good', TYR: 'N/A',
      FCG: 'Critical', Autofire: 'Good', Autolube: 'Good', 'U/C': 'Good',
    },
    inspectionReports: {
      'FCG': {
        metadata: {
          inspectionId: 'INS-2026-FCG-001',
          inspectionDate: '2026-02-21',
          mechanicName: 'Ahmad Fauzi',
          mechanicId: 'MEC-BPP-015',
          commodity: 'FCG',
          overallStatus: 'Critical',
          serviceMeterUnit: 9_800,
        },
        measurements: [
          { id: 'fcg-1', componentName: 'Hydraulic Oil Filter (Main)', position: 'Primary', actualValue: 82, measurementUnit: '%', standardValue: '< 80%', healthPercentage: 82, estimatedRemainingLife: 400, actionStatus: 'Critical' },
          { id: 'fcg-2', componentName: 'Engine Air Filter (Primary)', position: 'Primary', actualValue: 75, measurementUnit: '%', standardValue: '< 80%', healthPercentage: 75, estimatedRemainingLife: 600, actionStatus: 'Caution' },
          { id: 'fcg-3', componentName: 'Engine Air Filter (Safety)', position: 'Safety', actualValue: 45, measurementUnit: '%', standardValue: '< 80%', healthPercentage: 45, estimatedRemainingLife: 1200, actionStatus: 'Good' },
          { id: 'fcg-4', componentName: 'Return Filter Hydraulic', position: 'Return Line', actualValue: 68, measurementUnit: '%', standardValue: '< 80%', healthPercentage: 68, estimatedRemainingLife: 750, actionStatus: 'Monitor' },
          { id: 'fcg-5', componentName: 'Hydraulic Hose Line A', position: 'Boom Cylinder', actualValue: 'OK', measurementUnit: '', healthPercentage: 90, actionStatus: 'Good' },
        ],
        evidence: {
          mechanicNotes: 'Filter oli hidrolik utama menunjukkan indikator merah pada differential pressure gauge. Perlu penggantian segera untuk mencegah kontaminasi oli dan kerusakan pompa hidrolik. Selang line A dalam kondisi baik, tidak ditemukan kebocoran atau abrasi.',
          photoUrls: [PLACEHOLDER_PHOTOS[0], PLACEHOLDER_PHOTOS[3]],
        },
        recommendations: [
          { partNumber: '20Y-60-31650', description: 'Hydraulic Filter Element (Main)', quantity: 1, uom: 'Pcs', urgency: 'Critical', estimatedPrice: 850_000 },
          { partNumber: '600-181-9640', description: 'Air Filter Primary (Engine)', quantity: 1, uom: 'Pcs', urgency: 'Caution', estimatedPrice: 420_000 },
        ],
      },
      'BAT': {
        metadata: {
          inspectionId: 'INS-2026-BAT-002',
          inspectionDate: '2026-02-21',
          mechanicName: 'Ahmad Fauzi',
          mechanicId: 'MEC-BPP-015',
          commodity: 'BAT',
          overallStatus: 'Caution',
          serviceMeterUnit: 9_800,
        },
        measurements: [
          { id: 'bat-3', componentName: 'Battery #1 (12V)', position: 'Bank-L', actualValue: 12.1, measurementUnit: 'V', standardValue: '≥ 12.4V', healthPercentage: 72, estimatedRemainingLife: 1200, actionStatus: 'Caution' },
          { id: 'bat-4', componentName: 'Battery #2 (12V)', position: 'Bank-R', actualValue: 12.4, measurementUnit: 'V', standardValue: '≥ 12.4V', healthPercentage: 79, estimatedRemainingLife: 1500, actionStatus: 'Monitor' },
        ],
        evidence: {
          mechanicNotes: 'Tegangan battery #1 sedikit di bawah standar minimum. Voltage drop saat starting test mencapai 9.8V (batas aman 10.2V). Disarankan penggantian dalam 2 minggu ke depan.',
          photoUrls: [PLACEHOLDER_PHOTOS[2]],
        },
        recommendations: [
          { partNumber: 'KOM-BAT-12V-200AH', description: 'Battery 12V 200Ah — Komatsu OEM', quantity: 1, uom: 'Pcs', urgency: 'Caution', estimatedPrice: 3_500_000 },
        ],
      },
    },
  },

  // ─── UNIT 3: CAT785D-AX8801 (Critical) ──────────────────────────────────────
  {
    serialNumber: 'CAT785D-AX8801',
    model: 'CAT 785D',
    customer: 'PT Agincourt',
    site: 'Tambang Agincourt — Sumatera Utara',
    hoursOperated: 22_100,
    lastInspection: '2026-02-25',
    overallHealth: 'Critical',
    aiSummary: 'Engine oil berada dalam kondisi sangat kritis (95% degradasi). Hentikan operasi unit dan lakukan penggantian segera untuk mencegah kerusakan engine senilai > Rp 800 juta.',
    commodityStatus: {
      BAT: 'Good', GET: 'Good', TYR: 'Good',
      FCG: 'Good', Autofire: 'Good', Autolube: 'Critical', 'U/C': 'Good',
    },
    inspectionReports: {
      'Autolube': {
        metadata: {
          inspectionId: 'INS-2026-ALB-001',
          inspectionDate: '2026-02-25',
          mechanicName: 'Didik Prasetyo',
          mechanicId: 'MEC-SBY-033',
          commodity: 'Autolube',
          overallStatus: 'Critical',
          serviceMeterUnit: 22_100,
        },
        measurements: [
          { id: 'alb-1', componentName: 'Engine Oil (10W40)', position: 'Crankcase', actualValue: 95, measurementUnit: '%', standardValue: '< 80%', healthPercentage: 95, estimatedRemainingLife: 80, actionStatus: 'Critical' },
          { id: 'alb-2', componentName: 'Transmission Oil (TDH)', position: 'Trans Box', actualValue: 88, measurementUnit: '%', standardValue: '< 80%', healthPercentage: 88, estimatedRemainingLife: 180, actionStatus: 'Critical' },
          { id: 'alb-3', componentName: 'Differential Oil (rear)', position: 'Rear Axle', actualValue: 65, measurementUnit: '%', standardValue: '< 80%', healthPercentage: 65, estimatedRemainingLife: 820, actionStatus: 'Monitor' },
          { id: 'alb-4', componentName: 'Brake Fluid', position: 'Master Cylinder', actualValue: 40, measurementUnit: '%', standardValue: '< 60%', healthPercentage: 40, estimatedRemainingLife: 1500, actionStatus: 'Good' },
        ],
        evidence: {
          mechanicNotes: 'Hasil oil sampling (lab analysis) menunjukkan kandungan silicon 42 ppm (batas normal: <20 ppm) — indikasi kontaminasi debu melalui air filter yang jebol. Engine oil berubah warna menjadi hitam pekat dengan viskositas di bawah standar. UNIT WAJIB DISTOP OPERASI.',
          photoUrls: [PLACEHOLDER_PHOTOS[0], PLACEHOLDER_PHOTOS[1], PLACEHOLDER_PHOTOS[3]],
        },
        recommendations: [
          { partNumber: 'CAT-EO-10W40-20L', description: 'Engine Oil 10W40 — 20L', quantity: 4, uom: 'Pcs', urgency: 'Critical', estimatedPrice: 1_200_000 },
          { partNumber: 'CAT-TDH-50-20L', description: 'Transmission Oil TDH-50 — 20L', quantity: 3, uom: 'Pcs', urgency: 'Critical', estimatedPrice: 980_000 },
          { partNumber: '1R-0762', description: 'Oil Filter Element (Engine)', quantity: 2, uom: 'Pcs', urgency: 'Critical', estimatedPrice: 320_000 },
        ],
      },
    },
  },
];

// Helper: lookup unit holistic data by serial number
export const findUnitBySerial = (serialNumber: string): UnitHolisticData | undefined =>
  unitHolisticData.find((u) => u.serialNumber === serialNumber);
