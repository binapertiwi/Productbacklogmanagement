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
  - Part Number Cost Analysis
- **Revenue Potential Tracking**: Visualisasi *Stacked Bar Chart* yang memetakan proyeksi potensial pendapatan per komoditas dari backlog yang belum terbit PO-nya.
- **AI Revenue & Operation Copilot**: Fitur panduan intelijen (*prescriptive*) yang memberikan *insight* operasional:
  - ✨ **Peluang PO Tinggi:** Deteksi unit pelanggan dengan rekomendasi penggabungan penawaran (*bundling quotation*).
  - ✨ **Risiko Lead Time:** Prediksi kelangkaan inventori stok berdasar tren historis (*shortage alert*).
  - ✨ **Produktivitas Mekanik:** Saran rotasi mekanik untuk pemerataan beban *inspection*.

---

### 3. Customer Portal (Fleet Health)
Portal yang dikhususkan bagi pelanggan B2B untuk menjaga transparansi dan kepercayaan operasional:
- **Urgency Matrix & Top Units at Risk**: Rangkuman sekilas mengenai armada yang paling rentan terhadap peluang *loss production*, dilengkapi dengan estimasi hari menuju kegagalan fungsional.
- **Commodity Breakdown Badges**: Setiap baris unit kini menampilkan *badge* ringkasan kondisi ke-7 komoditas untuk kemudahan *skimming* pengguna sebelum menggali data di tingkat komponen.
- **Maintenance Bundling Recommender**: Saran proaktif (berupa *banner alert* dalam detail unit) yang mendorong pelanggan untuk menggabungkan order komponen rusak *(Critical)* dengan komponen berisiko *(Caution)* demi menghemat waktu *downtime*.
- **Export Multi-Sheet PO**: Ekspor matriks rekomendasi PO secara langsung di mana data telah dikelompokkan bedasar komoditi untuk kelancaran eksekusi pihak *buyer/procurement*.
- **AI Fleet Reliability Advisor**: Panel proaktif di bawah ringkasan *Fleet Health* untuk prediksi masa depan:
  - ✨ **Insight Keandalan:** Prediksi kegagalan spesifik tingkat komponen secara waktu untuk meminimalisir *unplanned breakdown*.
  - ✨ **Efisiensi Downtime:** Rekomendasi kuantitatif penghematan jam operasional dengan servis gabungan.
  - ✨ **Budget Forecast:** Ramalan anggaran preventif berdasarkan jumlah armada berstatus bahaya untuk penyusunan RKAP kuartalan.

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

1. Clone repositori aplikasi ini.
2. Lakukan instalasi di terminal (*node modules*):
   ```bash
   npm i
   ```
3. Jalankan *environment development* *server*:
   ```bash
   npm run dev
   ```
4. Buka di `http://localhost:5173/`

*(Dokumen ini terakhir kali diperbarui pada 13 Maret 2026 - Sprint: Unit Detail DNA & U/C Reporting).*