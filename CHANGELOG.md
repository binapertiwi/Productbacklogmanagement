# Changelog

## [Unreleased] — 2026-08-22

### Added
- **Halaman Customer Internal Portal**:
  - Membuat halaman baru sebagai salinan dari Customer Portal untuk penggunaan internal.
  - Menambahkan *Empty State* pada halaman Customer Internal. Data dashboard (Fleet Health Summary, Urgency Matrix, Units at Risk) dan daftar unit tidak akan ditampilkan sebelum pengguna memilih *Customer* pada dropdown filter.
  - Memposisikan dropdown *Filter Customer* di bagian kanan atas halaman Customer Internal (di samping tombol Export PO Recommendation).
- **Tab Customer Internal**: Menambahkan kembali tab "Customer Internal" pada menu utama navigasi, menggantikan tab "Internal Dashboard" yang sebelumnya disembunyikan.
- **Data Unit Mock**: Menambahkan berbagai entri data *dummy* baru pada `unitHealthData` (mockData.ts) sehingga tabel `Technical Details per Unit` memiliki beragam contoh data untuk masing-masing customer (PT Adaro Energy, PT Thiess, PT Agincourt Resources, dll.).
- **Fitur Upload pada Recommended Parts for PO**: Menambahkan tombol dan fitur **Upload** file (CSV/Excel) pada tabel *Recommended Parts for PO*, memungkinkan pengguna mengunggah daftar suku cadang rekomendasi secara langsung dengan integrasi parsing data, pembaruan otomatis nomor PO, estimasi harga, dan kalkulasi total estimasi PO.
- **Tabel Plan Replacement di Customer Internal Portal**: Menempatkan tabel *Plan Replacement* di halaman utama Customer Internal Portal (`/customer-internal`), diposisikan di bagian bawah tabel *Technical Details per Unit*.
- **Data Mock Plan Replacement Multi-Customer**: Menyediakan data estimasi penggantian part yang relevan sesuai customer yang dipilih (PT Adaro Energy, PT Thiess, PT Agincourt Resources, PT Berau Coal, PT Baramulti, PT Riung Mitra Lestari).

### Changed
- **Posisi Filter Bulan/Tahun di Header**: Memindahkan dropdown filter **Bulan/Tahun** ke bagian *header* atas, berdampingan sejajar dengan filter *Customer* dan tombol *Export PO Recommendation*, sehingga konteks global filter terpusat dan toolbar sekunder lebih rapi.
- **Filter Waktu (Bulan/Tahun)**: Mengubah nama dan opsi dropdown filter waktu dari "All Bulan" menjadi **"All Bulan/Tahun"** (dengan opsi bulan spesifik: Januari–Juni 2026).
- **Filter Plan Replacement**: Menghilangkan dropdown filter *Customer* dari toolbar tabel Plan Replacement — customer dikunci secara global di header Customer Internal Portal.
- **Relokasi Plan Replacement ke Bawah Technical Details per Unit**: Memindahkan posisi tabel Plan Replacement agar tampil di bawah tabel *Technical Details per Unit* di Customer Internal Portal.
- **Relokasi Plan Replacement**: Menghapus tampilan Plan Replacement dari sub-laporan unit detail (`FCGReportLayout.tsx` dan `InspectionReport.tsx`) dan menjadikannya komponen terpusat di dashboard utama Customer Internal.
- **Default Routing (Halaman Login)**: Mengubah konfigurasi `routes.ts` sehingga halaman Login menjadi halaman default (`index: true`) saat membuka aplikasi.
- **Navigasi Login**: Mengubah `handleLogin` pada Login Screen agar tombol "Masuk" redirect otomatis ke `/customer-internal`.
- **Halaman Customer Portal (Eksternal)**: Menghilangkan dropdown *Filter Customer* dari Customer Portal sehingga pengguna eksternal tidak dapat memfilter data ke customer lain.

### Changed — Design System Audit & Standardization (2026-08-22)
- **Tokenisasi Warna Global (Zero Hardcoded Colors)**: Mengganti semua kelas warna hardcoded (`bg-white`, `bg-slate-*`, `border-slate-*`, `border-gray-*`, `text-gray-*`, `text-blue-900`, `text-blue-800`) dengan design token Tailwind yang benar (`bg-card`, `bg-muted`, `border-border`, `text-foreground`, `text-muted-foreground`, `text-primary`) di seluruh komponen utama. Zero instance hardcoded color tersisa.
- **Dark Mode — Full Token Coverage**: Memastikan seluruh card container, tabel, filter toolbar, sticky header, dan section header memiliki dark mode yang benar via token (`bg-card`, `bg-muted`, `border-border`) yang otomatis menyesuaikan tema terang/gelap.
- **Semantic HTML — Icon di luar `<h1>`**: Memindahkan icon Lucide dari dalam tag `<h1>` ke elemen sibling `<div className="flex items-center gap-2">` di halaman `InternalDashboard` dan `InspectorProductivity` untuk semantic HTML yang bersih dan accessible.
- **Font Class `font-heading` → `font-display`**: Mengganti kelas `font-heading` (tidak terdefinisi di design system) dengan `font-display` (Outfit, sesuai `theme.css`) di `CustomerInternalPortal` dan `CustomerPortal`.
- **`InspectorProductivity.tsx`**: (a) `text-brand-navy` pada `<h1>` → `text-primary` untuk konsistensi antar halaman; (b) 4 card chart dan tabel leaderboard: `bg-white`/`border-gray-*`/`text-gray-*` → design token; (c) `bg-gray-50/50` thead → `bg-muted/30`.
- **`InternalDashboard.tsx`**: `bg-slate-500` pada portfolio breakdown bar/legend → `bg-muted-foreground`.
- **`FCGReportLayout.tsx`**: 30+ instance — card wrapper `bg-white dark:bg-slate-900` → `bg-card`; border `border-slate-*`/`border-gray-*` → `border-border`; table header `bg-gray-50` → `bg-muted/50`; table cells `text-gray-*` → `text-foreground`/`text-muted-foreground`; section headers `text-brand-navy` → `text-primary dark:text-foreground`; detail wrapper, foto evidence, download button.
- **`InspectionReport.tsx`**: 12 instance — wrapper utama `bg-white dark:bg-slate-900 border-slate-*` → `bg-card border-border`; 3 executive summary card; metadata header card; detail wrapper `bg-[#f8fafc] dark:bg-[#090d16]` → `bg-muted/30`; icon wrapper; action button; `dark:text-slate-900` → `dark:text-background`.
- **`CommodityPerformanceDashboard.tsx`**: 20+ instance — sticky filter bar `bg-white/85` → `bg-card/85`, select `bg-white text-gray-700` → `bg-card dark:bg-input text-foreground`, button `bg-blue-900 hover:bg-blue-800` → `bg-primary hover:bg-primary/90`; 4 KPI card dan 4 chart card `bg-white border-gray-100` → `bg-card border-border`; plan replacement table thead `bg-gray-50 text-gray-500` → `bg-muted/50 text-muted-foreground`; tbody `divide-gray-100 text-gray-700` → `divide-border text-foreground`; sticky column `bg-white group-hover:bg-gray-50` → `bg-card group-hover:bg-muted/50`; backlog matrix table (pola identik).
- **`ReportComponentSummaryTable.tsx`**: wrapper `bg-white dark:bg-slate-900` → `bg-card`; header bar `bg-slate-50/50 dark:bg-slate-800/20` → `bg-muted/30`; thead row `bg-slate-50/50 dark:bg-slate-800/20` → `bg-muted/30`; row logic `bg-white dark:bg-transparent` → `bg-card dark:bg-transparent`.
- **Responsive & PWA**: Seluruh perubahan di atas mempertahankan breakpoint `sm:` / `md:` / `lg:` yang sudah ada, tidak mengubah layout responsif.

### Removed
- **Internal Dashboard Tab**: Tab "Internal Dashboard" lama dihapus dari navigasi atas.
- **Customer Filter (Customer Portal)**: Dropdown filter customer dihapus dari antarmuka Customer Portal eksternal.
