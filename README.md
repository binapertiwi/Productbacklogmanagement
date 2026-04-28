# Product Backlog Management - Fleet Health & Procurement Portal

## Deskripsi Singkat
Aplikasi pemantauan kesehatan armada alat berat (Fleet Health) dan manajemen *Product Backlog* yang ditujukan untuk transformasi proses bisnis di PT Bina Pertiwi. Sistem ini memiliki kapabilitas *monitoring* operasional, manajemen inventori, dan prediksi proaktif dengan memadukan 7 komoditas utama secara holistik pada setiap unit.

## Fitur Utama Terkini (Changelog & Capabilities)

### 1. Multi-Commodity Unit-Centric Architecture
Sistem telah dirancang ulang menjadi arsitektur **Unit-Centric** (Berbasis Unit Multikomoditas). Kesehatan setiap unit (misal: Komatsu D375A-6) dipantau dan dikonsolidasikan dari 7 komoditas berikut:
1. **BAT** (Battery)
2. **GET** (Ground Engaging Tools)
3. **TYR** (Tyre)
4. **FCG** (Fluid Connector and Guard)
5. **Autofire** (Auto Fire Supression)
6. **Autolube** (Auto Lubrication System)
7. **U/C** (Undercarriage) — **High Priority Priority Development**

---

### 2. Internal Dashboard (Operation & Inventory)
Dashboard khusus untuk manajemen internal dan representatif operasional (Mekanik / Sales):
- **Cross-Commodity Backlog Matrix**: Tabel visual mutakhir yang memetakan status kesehatan ke-7 komoditi untuk setiap unit secara berdampingan (dengan indikator status). Mengurangi redundansi data dan memperjelas peluang *cross-selling/bundling*.
- **Commodity Performance Hub**: Sistem Tab yang memisahkan analitik spesifik per komoditas (*Overview*, **BAT, GET, TYR, FCG, Autofire, Autolube, U/C**). Masing-masing tab komoditas memiliki analitik performa terperinci:
  - Population Chart & Branch Distribution
  - Backlog Coverage
  - Lifetime Trend, Wearness / Cost Per Hour
  - Plan Replacement per Bulan
  - Part Number Cost Analysis- **Revenue Potential Tracking**: Visualisasi metrik tingkat tinggi yang kini lebih berfokus pada **measurability** (Rp 4.87 M potensial) dengan segmentasi bar tebal (*Portfolio Breakdown*) dan rincian nominal per grup komoditi.
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
- **Commodity Breakdown Badges**: Setiap baris unit kini menampilkan *badge* ringkasan kondisi ke-7 komoditas untuk kemudahan *skimming* pengguna sebelum menggali data di tingkat komponen.
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

- **[2026-04-28] Functional: Advanced PO Table & Sticky Navigation**:
  - `src/app/components/Layout.tsx` & `src/app/components/UnitDetailPage.tsx`:
    - Implementasi **Layered Sticky Strategy** untuk navigasi multi-level. Header utama, breadcrumb, dan identitas unit tetap terkunci (*frozen*) di posisi atas saat scrolling panjang, menjaga konteks pengguna tetap terjaga.
  - `src/app/components/InspectionReport.tsx`:
    - **Recommended Parts for PO Enhancement**: 
      - Penambahan fitur **Dynamic Search Filter** dan **Urgency Filter** (All, Critical, Caution) pada tabel rekomendasi.
      - Implementasi fitur **Export to Excel (CSV)** yang mendukung ekspor data terpilih lengkap dengan metadata unit dan estimasi harga total yang terupdate secara real-time.
    - **AI Insight Summarization**: Penambahan ringkasan otomatis per komponen menggunakan ikon `Sparkles` untuk memberikan interpretasi data cepat bagi pengguna.
  - **Media Asset Optimization**: Migrasi dari placeholder eksternal ke aset gambar AI berkualitas tinggi yang disimpan secara lokal di `/public/images/components/` untuk menjamin stabilitas perenderan dan privasi data.

- **[2026-04-28] Design System: Industrial Premium Unification**:
  - `src/styles/theme.css` & `src/styles/fonts.css`:
    - Implementasi unifikasi tipografi global: **Outfit** untuk seluruh heading (h1-h6) dan **Inter** untuk teks body (font-sans).
    - Refinansi palet warna menggunakan sistem **HSL Harmonious** (Brand Navy, Brand Green, Brand Blue) untuk tampilan yang lebih dalam dan eksklusif.
    - Standarisasi elemen dasar (`@layer base`) termasuk tombol, label, dan input agar konsisten di seluruh modul (Internal, Customer, & Admin).
  - Penyeragaman gaya kartu (cards) dengan shadow halus, border-radius `2xl`, dan interaktivitas mikro yang premium.

- **[2026-04-28] UI Enhancement: Information Tooltips**:
  - `src/app/components/InternalDashboard.tsx` & `src/app/components/CustomerPortal.tsx`: 
    - Penambahan fitur **Information Pop-up (Tooltip)** pada setiap card KPI dan Strategic Insights.
    - Menggunakan komponen `shadcn/ui/tooltip` (Radix UI) yang muncul saat hover pada ikon "i" (Info).
    - Memberikan penjelasan singkat mengenai metrik di setiap card untuk meningkatkan literasi data pengguna (Internal & Customer).
  - Integrasi ikon `Info` dari Lucide-React pada header setiap card secara konsisten.

- **[2026-04-28] Expansion: Customer Strategic Insights**:
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

- **[2026-03-27] Performance & Theme Optimization**:
  - `src/styles/theme.css`: Penambahan CSS Variables `--input-background` dan `--switch-background` pada `.dark` class untuk menjamin konsistensi background form di Dark Mode.
  - `src/app/components/CommodityPerformanceDashboard.tsx` & `src/app/components/figma/ImageWithFallback.tsx`: Penghapusan *hardcoded colors* (seperti `bg-[#59cae3]`, `bg-gray-100`) dan diganti dengan *semantic variables* (`bg-accent`, `bg-muted`) agar Dark Mode bekerja sempurna.
  - Penambahan `loading="lazy"` pada elemen `<img />` untuk meningkatkan kecepatan muat (Lazy Loading).

- **[2026-03-27] UI/UX Best Practices Implementation**:
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

- **[2026-03-27] UI/UX & Layout Hybrid Optimization**:
  - `src/app/components/InternalDashboard.tsx` & `src/app/components/CustomerPortal.tsx`: 
    - Rekonstruksi arsitektur tata letak menjadi **Hybrid Layout**. Fitur *AI Copilot/Advisor* kini hanya menjadi sidebar vertikal untuk baris konten teratas (KPI & Strategic Insights).
    - Bagian konten berat seperti *Revenue Potential*, *Performance Gap Map*, dan *Cross-Commodity Matrix/Technical Details* kini menggunakan **lebar penuh (100% width)** di bawah area sidebar untuk memaksimalkan ruang baca data.
    - Hal ini menyelesaikan isu "ruang kosong" di bawah sidebar dan mencegah grafik utama terhimpit, sekaligus tetap mempertahankan keunggulan *above-the-fold* untuk AI insights.
  - Perbaikan teknis pada JSX untuk menangani *character escaping* (>) dan stabilitas *dynamic class names* pada Tailwind.

- **[2026-03-27] Layout Hybrid & White-Space Optimization**:
  - `src/app/components/InternalDashboard.tsx` & `src/app/components/CustomerPortal.tsx`: 
    - Rekonstruksi arsitektur tata letak menjadi **Grid-Hybrid**. Fitur *AI Copilot/Advisor* kini menggunakan `row-span-2` sehingga berdampingan hanya dengan 2 baris konten teratas (KPI & Ringkasan Strategis).
    - Menghilangkan isu *empty white space* (ruang kosong di bawah sidebar) dengan menarik bagian konten berat (*Charts*, *Matrix*, dan *Technical Details*) ke posisi **lebar penuh (100% width)** di bawah area sidebar.
    - Hal ini memberikan visibilitas maksimal bagi tabel data tanpa mengorbankan aksesibilitas proaktif dari AI Insights.

- **[2026-03-27] AI Copilot Content Restoration**:
  - `src/app/components/InternalDashboard.tsx` & `src/app/components/CustomerPortal.tsx`: 
    - Mengembalikan kelengkapan *Insight Card* ke-3 (Force Balancing & Budget Forecast) di dalam AI Sidebar agar analisis AI kembali utuh dan komprehensif.
    - Tinggi dari 3 *card* AI vertikal pada layout baru ini tetap proporsional dan mengisi secara pas kedalaman ruang di samping konten utama (KPI & Insights), tanpa menghasilkan *white-space* atau ruang kosong di kedua halaman.
