# Product Backlog Management - Fleet Health & Procurement Portal

## Deskripsi Singkat

Aplikasi pemantauan kesehatan armada alat berat (Fleet Health) dan manajemen *Product Backlog* yang ditujukan untuk transformasi proses bisnis di PT Bina Pertiwi. Sistem ini memiliki kapabilitas *monitoring* operasional, manajemen inventori, dan prediksi proaktif dengan memadukan 8 komoditas utama secara holistik pada setiap unit.

## Fitur Utama Terkini (Changelog & Capabilities)

### 1. Multi-Commodity Unit-Centric Architecture

Sistem telah dirancang ulang menjadi arsitektur **Unit-Centric** (Berbasis Unit Multikomoditas). Kesehatan setiap unit (misal: Komatsu D375A-6) dipantau dan dikonsolidasikan dari 8 komoditas berikut:

1. **BAT** (Battery)
2. **GET** (Ground Engaging Tools)
3. **TYR** (Tyre)
4. **FCG** (Fluid Connector and Guard)
5. **LUB** (Lubricant)
6. **Autofire** (Auto Fire Supression)
7. **Autolube** (Auto Lubrication System)
8. **U/C** (Undercarriage) — **High Priority Development**

---

### 2. Internal Dashboard (Operation & Inventory)

Dashboard khusus untuk manajemen internal dan representatif operasional (Mekanik / Sales):

- **Cross-Commodity Backlog Matrix**: Tabel visual mutakhir yang memetakan status kesehatan ke-8 komoditi untuk setiap unit secara berdampingan (dengan indikator status). Mengurangi redundansi data dan memperjelas peluang *cross-selling/bundling*.
- **Commodity Performance Hub**: Sistem Tab yang memisahkan analitik spesifik per komoditas (*Overview*, **BAT, GET, TYR, FCG, LUB, Autofire, Autolube, U/C**). Masing-masing tab komoditas memiliki analitik performa terperinci:
  - Population Chart & Branch Distribution
  - Backlog Coverage
  - Lifetime Trend, Wearness / Cost Per Hour
  - Plan Replacement per Bulan
  - Part Number Cost Analysis
- **Revenue Potential Tracking**: Visualisasi metrik tingkat tinggi yang kini lebih berfokus pada **measurability** (Rp 4.87 M potensial) dengan segmentasi bar tebal (*Portfolio Breakdown*) dan rincian nominal per grup komoditi.
- **Strategic & Supply Chain Insights**: Tiga buah widget baru untuk mendukung pengambilan keputusan bisnis:
  - ✨ **Inventory Readiness & DOI:** Visualisasi kesiapan stok (Ready, Transit, OOS) terhadap *Critical Backlog* yang sedang berjalan.
  - ✨ **Cross-Selling Success Rate:** Pelacakan efektivitas penggabungan penawaran (*bundling*) lintas komoditas menjadi PO.
  - ✨ **Backlog Aging & Conversion Speed:** Grafik distribusi umur backlog (0-30+ hari) dan rata-rata kecepatan konversi menjadi PO.
- **AI Revenue & Operation Copilot**: Fitur panduan intelijen (*prescriptive*) yang kini ditempatkan secara strategis sebelum matriks utama untuk memberikan panduan sebelum eksekusi:
  - ✨ **Peluang PO Tinggi:** Deteksi unit pelanggan dengan rekomendasi penggabungan penawaran (*bundling quotation*).
  - ✨ **Risiko Lead Time:** Prediksi kelangkaan inventori stok berdasar tren historis (*shortage alert*).
  - ✨ **Produktivitas Mekanik:** Saran rotasi mekanik untuk pemerataan beban *inspection*.

---

### 3. Customer Portal (Fleet Health)

Portal yang dikhususkan bagi pelanggan B2B untuk menjaga transparansi dan kepercayaan operasional:

- **Financial & Safety Summary**: Baris ringkasan strategis baru untuk level manajerial pelanggan:
  - ✨ **Budget Forecasting:** Proyeksi anggaran pemeliharaan (30, 60, 90 hari) berdasarkan temuan teknis di lapangan.
  - ✨ **Safety & Compliance Index:** Skor keselamatan armada dengan **Visual Alarm (Pulse Animation)** jika terdapat temuan kritis pada komoditi *Tyre* atau *Autofire*.
  - ✨ **Procurement Pipeline Visibility:** Transparansi status pesanan dari tahap *Drafting, Quoted, PO Issued,* hingga *Delivered*.
- **Urgency Matrix & Top Units at Risk**: Rangkuman sekilas mengenai armada yang paling rentan terhadap peluang *loss production*, dilengkapi dengan estimasi hari menuju kegagalan fungsional.
- **Commodity Breakdown Badges**: Setiap baris unit kini menampilkan *badge* ringkasan kondisi ke-8 komoditas untuk kemudahan *skimming* pengguna sebelum menggali data di tingkat komponen.
- **Maintenance Bundling Recommender**: Saran proaktif (berupa *banner alert* dalam detail unit) yang mendorong pelanggan untuk menggabungkan order komponen rusak *(Critical)* dengan komponen berisiko *(Caution)* demi menghemat waktu *downtime*.
- **AI Fleet Reliability Advisor**: Panel proaktif di bawah ringkasan *Fleet Health* untuk prediksi masa depan.

---

### 4. Unified Unit Detail View (The "DNA" Report)

Satu landasan pelaporan tunggal (*Single Source of Truth*) yang dapat diakses baik dari sisi internal maupun pelanggan untuk konsistensi data teknis:

- **Consistent Navigation**: Klik pada baris armada di Matrix atau Portal akan mengarahkan ke halaman detail holistik yang seragam.
- **Deep-Link Commodity Support**: Fitur navigasi langsung ke tab inspeksi spesifik (misal: klik badge U/C merah di Matrix akan langsung membuka Detail Unit pada tab U/C).
- **Enhanced Technical Reporting (U/C Focus)**:
  - **Categorized Findings**: Komponen dikelompokkan secara logis (Link Assembly, Bushings, Rollers, dll) dengan referensi visual.
  - **Global Wear Distribution Chart**: Grafik ringkasan di bagian atas yang menunjukkan kondisi wear terekstrim per grup komponen.
  - **Historical Trend Analysis**: Setiap grup komponen memiliki grafik garis sejarah keausan (3-4 inspeksi terakhir) terhadap batas kritis 80%.
  - **Professional Field Evidence**: Galeri foto inspeksi yang terorganisir dengan label figur dan catatan teknis formal dari inspektur.
- **PO Draft Integration**: Kemudahan konversi temuan kerusakan teknis langsung menjadi draf Purchase Order.

### 5. Inspector Productivity & Coverage

Halaman khusus untuk memantau efisiensi tenaga kerja dan cakupan inspeksi di tingkat nasional:

- **Manpower vs Workload Map**: Analisis kapasitas inspeksi terhadap populasi unit per wilayah untuk mencegah *under-coverage*.
- **Coverage by Customer Site**: Persentase unit terinspeksi vs total populasi di setiap lokasi pelanggan.
- **Quality to PO Conversion**: Scatter chart yang menghubungkan rata-rata durasi inspeksi dengan tingkat konversi menjadi Purchase Order.
- **Inspection Hit Rate (Yield)**: Stacked bar chart yang memetakan temuan *Critical* vs *Normal* untuk mengukur kualitas inspeksi.
- **AI Workforce Copilot (Aurora Theme)**: Asisten cerdas dengan tema visual dinamis untuk rekomendasi *workforce rebalancing* dan optimasi alokasi *resources*.

---

## Teknologi & Implementasi

Sistem saat ini sepenuhnya dikelola dan dibangun menggunakan:

- React dengan rendering interaktif cepat.
- **Premium UI Design**: Antarmuka modern dengan estetika premium yang responsif dan interaktif.
- **Brand Identity Integration**: Palet warna yang selaras dengan identitas merek perusahaan (Navy, Green, Blue) untuk konsistensi di seluruh aplikasi.
- **"Aurora" AI Theme**: Tema khusus (Teal ke Mint Green) untuk bagian berbasis AI, memberikan kesan proses berpikir aktif dan inovasi.
- **Full Dark Mode Support**: Dukungan penuh untuk mode gelap (Dark Mode) yang dapat disesuaikan oleh pengguna untuk kenyamanan navigasi.
- **Recharts** untuk visualisasi analitik dan tren komoditas.
- **Lucide-React** untuk ikonografi yang minimalis.
- **Next-Themes** untuk manajemen tema (Light/Dark).
- Simulasi skema AI / GCP Data Processing Warehouse terpusat.

## 3. DESIGN SYSTEM & UI/UX STANDARDS (THE MASTER RULES)

### A. Design Philosophy & Style

Sistem desain ini menganut pendekatan **Industrial Premium** yang mengedepankan presisi, efisiensi, dan eksklusivitas untuk skala *B2B Enterprise Dashboard & Analytics*.

- **Flat Design (Data-Centric):** Digunakan untuk tabel data, matriks backlog, dan area dengan kepadatan informasi tinggi. Fokus pada keterbacaan data maksimal tanpa distraksi visual.
- **Glassmorphism & Subtle Depth (AI-Centric & Highlights):** Digunakan untuk panel AI Copilot, kartu metrik utama (KPI), dan elemen interaktif proaktif. Menciptakan kedalaman visual (z-axis) untuk memisahkan lapisan informasi statis dan dinamis.

### B. Strict Color Palette & CSS Variables

Semua elemen visual WAJIB merujuk pada variabel CSS berikut untuk menjamin konsistensi tema Light dan Dark.

| Token | Light Mode Value | Dark Mode Value | CSS Variable | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | `#1E3A8A` | `#1E3A8A` | `--primary` | Brand Navy |
| **Secondary** | `#10B981` | `#10B981` | `--secondary` | Brand Green |
| **AI Accent** | `linear-gradient(to right, #34D399, #2DD4BF)` | `linear-gradient(to right, #34D399, #2DD4BF)` | `--ai-accent` | Aurora Theme (Emerald to Teal) |
| **Muted** | `#64748B` | `#94A3B8` | `--muted` | Slate-500 / Slate-400 |
| **Success** | `#10B981` | `#34D399` | `--success` | Green-500 / Emerald-400 |
| **Warning** | `#D97706` | `#F59E0B` | `--warning` | Amber-600 (High Contrast) |
| **Destructive** | `#EF4444` | `#EF4444` | `--destructive` | Red-500 |
| **Info** | `#2563EB` | `#60A5FA` | `--info` | Blue-600 / Blue-400 |

- **Anti-pattern (DILARANG):**
  - Jangan gunakan warna hitam murni `#000000`. Gunakan `#0F172A` (Slate-900) untuk teks utama.
  - Jangan gunakan warna putih murni `#FFFFFF` untuk area background kerja besar. Gunakan `#F8FAFC` (Slate-50) di Light Mode.

### C. Typography Scale (Outfit & Inter)

Tipografi menggunakan sistem skala modular untuk menjamin hierarki informasi yang jelas.

| Level | Font Family | Size (rem/px) | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1** | Outfit | `2.25rem` (36px) | 700 (Bold) | `1.2` | Page Title |
| **H2** | Outfit | `1.5rem` (24px) | 600 (SemiBold) | `1.3` | Section Title |
| **H3** | Outfit | `1.25rem` (20px) | 600 (SemiBold) | `1.4` | Card Title |
| **Body** | Inter | `1.0rem` (16px) | 400 (Regular) | `1.5` | Default Text |
| **Small** | Inter | `0.875rem` (14px) | 400 (Regular) | `1.4` | Labels, Captions |
| **Muted** | Inter | `0.875rem` (14px) | 300 (Light) | `1.4` | Secondary Info |
| **Metric** | Inter | `1.875rem` (30px) | 700 (Bold) | `1.2` | Numbers (`tabular-nums`) |

### D. Spacing, Grid & Layout Rules

- **Sistem Spasial:** Berbasis kelipatan 8px (Tailwind: `p-1`=4px, `p-2`=8px, `p-4`=16px, `p-8`=32px).
- **Hybrid Grid Layout:**
  - **Sidebar AI Width:** Maksimal `w-80` (`20rem` / `320px`).
  - **White-Space Management:** Gunakan `gap-6` untuk jarak antar kartu utama. Komponen berat (tabel/matriks) harus membentang 100% lebar jika berada di bawah area sidebar.
  - **Sticky Behavior:** Kolom "Armada/Model" pada tabel matriks wajib menggunakan `sticky left-0` untuk navigasi horizontal yang aman.

### E. Component Anatomy & States

- **Cards:**
  - *Background:* `bg-white` (Light) / `bg-slate-800` (Dark).
  - *Border:* `border-slate-200` (Light) / `border-slate-700` (Dark).
  - *Radius:* `rounded-2xl` (16px).
  - *Shadow:* `shadow-sm` untuk kondisi statis, `shadow-md` saat aktif/hover.
- **Buttons & Inputs:**
  - *Touch Target:* Tinggi minimal `44px` (Tailwind `h-11`) untuk form interaktif.
  - *Hover State:* Transisi warna halus (`transition-colors duration-200`).
  - *Focus State:* `ring-2 ring-primary ring-offset-2`.
- **Modals & Tooltips:**
  - *Z-index Hierarchy:* Tooltip (`z-50`), Modal (`z-40`), Header (`z-30`).
  - *Backdrop:* `bg-black/50 backdrop-blur-sm` (opacity/blur).
- **Data Viz (Recharts):**
  - Wajib menggunakan warna `--primary` dan `--secondary` untuk data series utama.
  - Dilarang keras menggunakan palet warna default bawaan library Recharts.

### F. Global Transitions & Animations

- **Default Transition:** `transition-all duration-200 ease-in-out` untuk semua elemen interaktif standar.
- **Custom Animations:**
  - **Pulse (Active Thinking):** Digunakan untuk indikator status AI yang sedang memproses data atau status Kritis pada matriks.
  - **Fade-In-Up:** Digunakan untuk komponen yang dimuat secara dinamis dari AI stream.

## Menjalankan Aplikasi

Aplikasi ini dapat dijalankan langsung dari direktori utama (root) atau dari dalam folder `site`.

### Opsi A: Menjalankan dari Direktori Utama (Root) - Rekomendasi

1. Lakukan instalasi di terminal:

   ```bash
   npm run install-all
   ```

2. Jalankan *environment development* *server*:

   ```bash
   npm run dev
   ```

### Opsi B: Menjalankan dari Folder `site`

1. Masuk ke folder site: `cd site`
2. Lakukan instalasi: `npm i`
3. Jalankan server: `npm run dev`
4. Buka browser di: `http://localhost:5173/`

*(Dokumen ini terakhir kali diperbarui pada 28 April 2026 - Sprint: Premium UI & Advanced Procurement UX).*

---

## Pembaruan & Riwayat Teknis

- **[v 1.3.3] [2026-05-19] Feature & Data Hardening: Multi-Tab Inspection History & Mechanic Safety Audit**:
  - `src/app/components/InspectionReport.tsx`:
    - Menambahkan tabel **Inspection History** pada bagian summary untuk seluruh komoditas umum (U/C, GET, TYR, BAT, LUB, Autofire).
    - Implementasi generator riwayat inspeksi dinamis menggunakan React `useMemo` berdasarkan komoditas aktif, tanggal inspeksi terkini, dan nama mekanik/inspektor aktif.
    - Styling premium dengan dukungan penuh Light/Dark Mode yang terintegrasi secara seamless dengan visual token UI Bina Pertiwi.
  - `src/app/data/inspectionMockData.ts` & `src/app/components/FCGReportLayout.tsx`:
    - Melakukan audit data inspeksi untuk menghilangkan seluruh penggunaan nama "Budi Santoso", dan menggantinya secara menyeluruh dengan nama **"Dwi Cahyono"** sebagai inspektor/mekanik yang tersertifikasi demi standarisasi keamanan dan privasi data operasional.
- **[v 1.3.2] [2026-05-12] UI/UX: Scorecard Style Unification**:
  - `src/app/components/InternalDashboard.tsx`, `src/app/components/InspectorProductivity.tsx`:
    - Menyeragamkan gaya scorecard dengan menghapus background *pill* pada teks tren (Opsi 2: Gaya Teks Bersih).
- **[v 1.3.1] [2026-05-12] Feature: U/C Commodity Dashboard Refinement**:
  - `src/app/components/CommodityPerformanceDashboard.tsx`:
    - Refaktor tampilan khusus komoditas 'U/C' dengan hierarki 3 Tier (Macro, Mid, Micro).
    - Implementasi filter aktif sticky, grafik populasi, coverage analitik, lifetime distribution, component wear breakdown, cost per hour, financial efficiency table, dan plan replacement forecast table.
  - `src/app/data/performanceMockData.ts`:
    - Pembaruan data mock untuk menyertakan data status komponen U/C (Normal, Caution, Critical) yang spesifik.
- **[v 1.3.0] [2026-05-12] Design System: Global UI/UX Audit & Refinement**:
  - `src/styles/theme.css`: Diperbarui dengan nilai eksak dari README.md untuk konsistensi token desain.
  - `src/app/components/InternalDashboard.tsx`, `CustomerPortal.tsx`, `InspectionReport.tsx`, `InspectorProductivity.tsx`, `UnitDetailPage.tsx`, `VisualMapping.tsx`, `CommodityPerformanceDashboard.tsx`:
    - **Typography Standardization**: Mengganti semua penggunaan `font-black` (weight 900) dengan `font-bold` (weight 700) untuk estetika "Industrial Premium" yang lebih elegan.
    - **Brand Color Enforcement**: Memastikan penggunaan variabel warna brand (Navy `#1E3A8A` dan Green `#10B981`) dan menghapus nilai warna hardcoded.
    - **Aurora Theme Unification**: Memperbarui gradien AI ke tema Aurora (`from-[#34D399] to-[#2DD4BF]`).
    - **SVG Optimization**: Pada `VisualMapping.tsx`, mengubah `fontWeight="900"` menjadi `"bold"` pada elemen teks SVG.
- **[v 1.2.4] [2026-05-04] Data Unification: LUB (Lubricant) Commodity Integration**:
  - `src/app/data/inspectionTypes.ts`: Menambahkan `'LUB'` ke dalam `CommodityKey` dan `ALL_COMMODITIES` array.
  - `src/app/data/performanceMockData.ts`: Menambahkan `'LUB'` ke dalam `CommodityType`.
  - `src/app/data/mockData.ts`: Menambahkan entri data simulasi untuk komoditas LUB pada `commodityData`, `revenueByCommodityData`, `inspectionTableData`, dan `unitHealthData`.
  - `src/app/components/InternalDashboard.tsx`: Memperbarui `commKeys` untuk menampilkan tab navigasi "LUB" tepat di sebelah "FCG".
  - `README.md`: Memperbarui dokumentasi untuk mencakup 8 komoditas utama.

- **[v 1.2.3] [2026-05-04] Data Visualization: Advanced Analytics & Commercialization**:
  - `src/app/components/InspectorProductivity.tsx`:
    - **Quadrant Analysis (Scatter Chart)**: Upgrade visualisasi konversi PO dengan garis referensi (Crosshairs) pada sumbu X (Durasi) dan Y (Rate) untuk membagi data menjadi 4 kuadran performa.
    - **Absolute Value Visualization**: Menambahkan informasi nominal (unit/total) pada tooltip dan label grafik *Coverage by Site* untuk akurasi data operasional.
    - **Composed Yield Trend**: Transformasi grafik hit rate menjadi `ComposedChart` yang menggabungkan `Stacked Bar` (temuan) dengan `Line Chart` (Yield Rate %) pada sumbu Y ganda.
    - **Leaderboard Commercialization**: Penambahan metrik finansial (**Est. Revenue**) dan urgensi (**Critical Findings**) pada tabel peringkat inspektur untuk menggeser fokus dari sekadar volume ke nilai bisnis.

- **[v 1.2.2] [2026-05-04] UI/UX & Documentation: Inspector Productivity Finalization**:
  - `README.md`: Menambahkan narasi lengkap halaman "Inspector Productivity & Coverage" pada bagian Fitur Utama Terkini.
  - `src/app/components/InspectorProductivity.tsx`:
    - Penambahan **Information Tooltips** (ikon `Info`) pada seluruh kartu grafik (*Manpower vs Workload, Coverage, Quality Conversion,* dan *Hit Rate*) untuk meningkatkan literasi data melalui penjelasan proaktif saat hover.

- **[v 1.2.1] [2026-05-04] UI/UX Refinement: Inspector Productivity Optimization**:
  - `src/app/components/InspectorProductivity.tsx`:
    - **Resource Allocation Integration**: Memindahkan widget "Resource Allocation" ke dalam panel *AI Workforce Copilot* sebagai *inner card* untuk alur informasi yang lebih kontekstual.
    - **New Widget: Inspection Hit Rate (Yield)**: Implementasi grafik `Stacked BarChart` untuk memvisualisasikan rasio temuan kritis vs normal per wilayah.
    - **Strict Brand Color Enforcement**: Standardisasi seluruh grafik menggunakan palet **Brand Navy (#1E3A8A)** dan **Brand Green (#10B981)**, serta menghilangkan penggunaan warna hitam solid pada elemen bar dan scatter.
    - **KPI Icon Styling**: Pembaruan gaya ikon pada kartu KPI utama agar mengikuti estetika *muted Navy/Green* yang premium.

- **[v 1.2.0] [2026-05-04] Design System: Inspector Productivity Unification**:
  - `src/app/components/InspectorProductivity.tsx`:
    - **AI Workforce Copilot Refactoring**: Transformasi widget AI menjadi desain *Aurora* premium dengan gradien `from-emerald-400 to-teal-400`. Menambahkan indikator status **"ACTIVE THINKING"** dengan animasi pulse dan fitur **Collapse/Expand** untuk fleksibilitas ruang kerja.
    - **Card & Typography Standardization**: Penerapan sistem kartu `bg-white` dengan border halus dan bayangan *Industrial Premium*. Judul grafik diseragamkan menggunakan gaya tipografi *bold uppercase* untuk keterbacaan tingkat enterprise.
    - **Enhanced Interactivity**: Penambahan komponen `Tooltip` (Info) pada metrik KPI utama untuk penjelasan data proaktif.
    - **Responsive Sidebar**: Penataan ulang layout menjadi *Hybrid Grid* yang memastikan tabel leaderboard tetap memiliki ruang maksimal saat panel AI ditutup.

- **[v 1.1.3] [2026-04-28] Functional: Advanced PO Table & Sticky Navigation**:
  - `src/app/components/Layout.tsx` & `src/app/components/UnitDetailPage.tsx`:
    - Implementasi **Layered Sticky Strategy** untuk navigasi multi-level. Header utama, breadcrumb, dan identitas unit tetap terkunci (*frozen*) di posisi atas saat scrolling panjang, menjaga konteks pengguna tetap terjaga.
  - `src/app/components/InspectionReport.tsx`:
    - **Recommended Parts for PO Enhancement**:
      - Penambahan fitur **Dynamic Search Filter** dan **Urgency Filter** (All, Critical, Caution) pada tabel rekomendasi.
      - Implementasi fitur **Export to Excel (CSV)** yang mendukung ekspor data terpilih lengkap dengan metadata unit dan estimasi harga total yang terupdate secara real-time.
    - **AI Insight Summarization**: Penambahan ringkasan otomatis per komponen menggunakan ikon `Sparkles` untuk memberikan interpretasi data cepat bagi pengguna.
  - **Media Asset Optimization**: Migrasi dari placeholder eksternal ke aset gambar AI berkualitas tinggi yang disimpan secara lokal di `/public/images/components/` untuk menjamin stabilitas perenderan dan privasi data.

- **[v 1.1.2] [2026-04-28] Design System: Industrial Premium Unification**:
  - `src/styles/theme.css` & `src/styles/fonts.css`:
    - Implementasi unifikasi tipografi global: **Outfit** untuk seluruh heading (h1-h6) dan **Inter** untuk teks body (font-sans).
    - Refinansi palet warna menggunakan sistem **HSL Harmonious** (Brand Navy, Brand Green, Brand Blue) untuk tampilan yang lebih dalam dan eksklusif.
    - Standarisasi elemen dasar (`@layer base`) termasuk tombol, label, dan input agar konsisten di seluruh modul (Internal, Customer, & Admin).
  - Penyeragaman gaya kartu (cards) dengan shadow halus, border-radius `2xl`, dan interaktivitas mikro yang premium.

- **[v 1.1.1] [2026-04-28] UI Enhancement: Information Tooltips**:
  - `src/app/components/InternalDashboard.tsx` & `src/app/components/CustomerPortal.tsx`:
    - Penambahan fitur **Information Pop-up (Tooltip)** pada setiap card KPI dan Strategic Insights.
    - Menggunakan komponen `shadcn/ui/tooltip` (Radix UI) yang muncul saat hover pada ikon "i" (Info).
    - Memberikan penjelasan singkat mengenai metrik di setiap card untuk meningkatkan literasi data pengguna (Internal & Customer).
  - Integrasi ikon `Info` dari Lucide-React pada header setiap card secara konsisten.

- **[v 1.1.0] [2026-04-28] Expansion: Customer Strategic Insights**:
  - `src/app/components/InternalDashboard.tsx`:
    - Menambahkan baris baru **"Customer Strategic Insight"** dengan 4 visualisasi data:
      - **Top 5 Customers**: Bar chart horizontal dengan drill-down filter ke tabel matriks.
      - **Backlog Density**: Scatter chart untuk menganalisis urgensi temuan kritis per populasi unit.
      - **Regional Revenue**: Heatmap visual dalam bentuk list progress bar untuk distribusi pendapatan wilayah.
      - **Capture Rate**: Donut chart untuk memantau wallet share (Findings vs PO).
    - Implementasi filter global **Period** dan **Regional/Branch** yang terintegrasi dengan seluruh kartu di dashboard.
    - **Cross-Commodity Backlog Matrix Enhancement**:
      - Penambahan filter tingkat lanjut: **Status** (Critical, Caution, Normal) dan **Min Backlogs** (>1, >3, >5).
      - Penambahan kolom baru **"Active Backlogs"** yang merangkum total temuan per unit dengan indikator visual *High Risk* (ikon 🔥).
  - `src/app/data/mockData.ts`: Penambahan data simulasi untuk mendukung visualisasi baru (topCustomersData, backlogDensityData, regionalRevenueData, captureRateData).

- **[v 1.0.4] [2026-03-27] Performance & Theme Optimization**:
  - `src/styles/theme.css`: Penambahan CSS Variables `--input-background` dan `--switch-background` pada `.dark` class untuk menjamin konsistensi background form di Dark Mode.
  - `src/app/components/CommodityPerformanceDashboard.tsx` & `src/app/components/figma/ImageWithFallback.tsx`: Penghapusan *hardcoded colors* (seperti `bg-[#59cae3]`, `bg-gray-100`) dan diganti dengan *semantic variables* (`bg-accent`, `bg-muted`) agar Dark Mode bekerja sempurna.
  - Penambahan `loading="lazy"` pada elemen `<img />` untuk meningkatkan kecepatan muat (Lazy Loading).

- **[v 1.0.3] [2026-03-27] UI/UX Best Practices Implementation**:
  - `src/app/components/InternalDashboard.tsx` & `src/app/components/CustomerPortal.tsx`:
    - Implementasi **Sticky Right Sidebar (Flexbox Layout)** untuk fitur *AI Revenue & Operation Copilot* dan *AI Fleet Reliability Advisor*. Panel ini kini berada berdampingan dengan konten utama (*side-by-side context*) dengan lebar tetap (`w-80`) sehingga terlihat seketika (*above the fold*) tanpa *scrolling* dan tidak menyebabkan konten utama squashed.
    - Menambahkan tombol *Collapse* (perkecil panel) dan ikon *Floating* untuk membuka ulang panel AI jika layar ingin dimaksimalkan untuk melihat tabel matriks.
  - `src/app/components/UnitDetailPage.tsx`:
    - Mengubah dan menyeragamkan palet/gradasi warna komponen **AI Unit Summary** agar sinkron identitas visualnya dengan *AI Copilot* di halaman Dashboard utama (memberikan edukasi konsisten bagi pengguna tentang UI AI generatif di aplikasi).
  - `src/app/components/InternalDashboard.tsx`:
    - Penempatan *action buttons* "Sync Data" dan "Download Report" disesuaikan menggunakan proporsi ergonomis untuk tampilan seluler (Full width di *mobile*, sejajar di *desktop*).
    - **Sticky Columns** diimplementasikan pada kolom "Armada/Model" pada Cross-Commodity Matrix agar pengguna tidak kehilangan orientasi konteks saat scrolling horizontal (terutama di layar kecil).
    - Penambahan Atribut WAI-ARIA (`role="tablist"`, `role="tab"`) untuk mendukung tab navigasi agar ramah *Screen Reader*.
  - `src/app/components/CustomerPortal.tsx`:
    - Penggantian seluruh *dropdown select* asli (`<select>`) menjadi **Shadcn UI `<Select>`** Component yang lebih modern, konsisten di seluruh browser, dan mudah disentuh (ukuran target ideal 44px) dari perangkat seluler.
    - Peningkatan tingkat **aksesibilitas kontras WCAG** untuk status "Caution" dengan mengubah elemen kuning menjadi palet *amber-600* pada Light Mode sehingga dapat dibaca jelas di luar ruangan/di bawah terik matahari.
    - Tombol CTA *"Export Maintenance Proposal"* dipindahkan dari bagian bawah accordion ke bagian atas persis berdampingan dengan Header Unit, mengeliminasi isu hilangnya tombol jika item kerusakannya banyak.
    - Memperbaiki alur interaksi Akordion *Progressive Disclosure* yang sebelumnya salah rute menjadi fitur yang sepenuhnya berfungsi.

- **[v 1.0.2] [2026-03-27] UI/UX & Layout Hybrid Optimization**:
  - `src/app/components/InternalDashboard.tsx` & `src/app/components/CustomerPortal.tsx`:
    - Rekonstruksi arsitektur tata letak menjadi **Hybrid Layout**. Fitur *AI Copilot/Advisor* kini hanya menjadi sidebar vertikal untuk baris konten teratas (KPI & Strategic Insights).
    - Bagian konten berat seperti *Revenue Potential*, *Performance Gap Map*, dan *Cross-Commodity Matrix/Technical Details* kini menggunakan **lebar penuh (100% width)** di bawah area sidebar untuk memaksimalkan ruang baca data.
    - Hal ini menyelesaikan isu "ruang kosong" di bawah sidebar dan mencegah grafik utama terhimpit, sekaligus tetap mempertahankan keunggulan *above-the-fold* untuk AI insights.
  - Perbaikan teknis pada JSX untuk menangani *character escaping* (>) dan stabilitas *dynamic class names* pada Tailwind.

- **[v 1.0.1] [2026-03-27] Layout Hybrid & White-Space Optimization**:
  - `src/app/components/InternalDashboard.tsx` & `src/app/components/CustomerPortal.tsx`:
    - Rekonstruksi arsitektur tata letak menjadi **Grid-Hybrid**. Fitur *AI Copilot/Advisor* kini menggunakan `row-span-2` sehingga berdampingan hanya dengan 2 baris konten teratas (KPI & Ringkasan Strategis).
    - Menghilangkan isu *empty white space* (ruang kosong di bawah sidebar) dengan menarik bagian konten berat (*Charts*, *Matrix*, dan *Technical Details*) ke posisi **lebar penuh (100% width)** di bawah area sidebar.
    - Hal ini memberikan visibilitas maksimal bagi tabel data tanpa mengorbankan aksesibilitas proaktif dari AI Insights.

- **[v 1.0.0] [2026-03-27] AI Copilot Content Restoration**:
  - `src/app/components/InternalDashboard.tsx` & `src/app/components/CustomerPortal.tsx`:
    - Mengembalikan kelengkapan *Insight Card* ke-3 (Force Balancing & Budget Forecast) di dalam AI Sidebar agar analisis AI kembali utuh dan komprehensif.
    - Tinggi dari 3 *card* AI vertikal pada layout baru ini tetap proporsional dan mengisi secara pas kedalaman ruang di samping konten utama (KPI & Insights), tanpa menghasilkan *white-space* atau ruang kosong di kedua halaman.
