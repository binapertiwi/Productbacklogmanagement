// ─── Unified Inspection Report — TypeScript Interfaces ───────────────────────
// These types form the "DNA" of the standardized inspection system.
// One structure adapts to render all 7 commodity types consistently.

export type CommodityKey = 'BAT' | 'GET' | 'TYR' | 'FCG' | 'Autofire' | 'Autolube' | 'U/C';

export type HealthStatus = 'Good' | 'Caution' | 'Critical' | 'N/A' | 'Replace' | 'Monitor';

// Metadata Inspeksi — siapa, kapan, dan komoditas apa
export interface InspectionMetadata {
  inspectionId: string;
  inspectionDate: string; // YYYY-MM-DD
  mechanicName: string;
  mechanicId: string;
  commodity: CommodityKey;
  overallStatus: HealthStatus;
  serviceMeterUnit: number; // Jam terbang (jam) saat inspeksi
}

// Item Pengukuran Dinamis — satu baris di tabel inti
// actualValue bisa mm (GET/U/C), Volt (BAT), % (FCG), Psi (Autofire/Autolube)
export interface MeasurementItem {
  id: string;
  componentName: string;   // "Track Shoe", "Front Right Tire", "Cell 1"
  position?: string;       // "L" | "R" | "FL" | "FR" | "RL" | "RR" | "Idler" (opsional)
  actualValue: number | string;
  measurementUnit: string; // "mm" | "V" | "%" | "Psi" | "°C"
  standardValue?: string;  // Referensi standar pabrikan (opsional)
  healthPercentage: number; // 0 - 100 (%) = sisa umur komponen
  estimatedRemainingLife?: number; // Sisa umur dalam jam (opsional)
  actionStatus: HealthStatus;
}

// Bukti & Catatan Lapangan (dari Aplikasi MMA)
export interface FieldEvidence {
  mechanicNotes: string;
  photoUrls: string[]; // URL foto temuan di lapangan
}

// Rekomendasi Part untuk PO
export interface RecommendedPart {
  partNumber: string;
  description: string;
  quantity: number;
  uom: string; // Unit of Measure: "Pcs", "Set", "Liter"
  urgency: HealthStatus;
  estimatedPrice?: number; // Estimasi harga (Rupiah)
}

// ─── Main Interface: Satu unit inspeksi untuk satu komoditas ─────────────────
export interface CommodityInspectionReport {
  metadata: InspectionMetadata;
  measurements: MeasurementItem[];
  evidence: FieldEvidence;
  recommendations: RecommendedPart[];
}

// ─── Unit Holistic Data: Seluruh data satu unit, semua komoditas ─────────────
export interface UnitHolisticData {
  serialNumber: string;
  model: string;
  customer: string;
  site: string;
  hoursOperated: number; // SMU saat ini
  lastInspection: string; // YYYY-MM-DD
  overallHealth: HealthStatus;
  aiSummary: string; // Kalimat AI ringkas untuk panel summary
  // commodityStatus: status ringkasan per komoditas untuk 7 badge di header
  commodityStatus: Record<CommodityKey, HealthStatus>;
  // inspectionReports: laporan detail per komoditas (mungkin tidak semua ada)
  inspectionReports: Partial<Record<CommodityKey, CommodityInspectionReport>>;
}
