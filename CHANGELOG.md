# Changelog

## [Unreleased]
### Added
- **Halaman Customer Internal Portal**: 
  - Membuat halaman baru sebagai salinan dari Customer Portal untuk penggunaan internal.
  - Menambahkan *Empty State* pada halaman Customer Internal. Data dashboard (Fleet Health Summary, Urgency Matrix, Units at Risk) dan daftar unit tidak akan ditampilkan sebelum pengguna memilih *Customer* pada dropdown filter.
  - Memposisikan dropdown *Filter Customer* di bagian kanan atas halaman Customer Internal (di samping tombol Export PO Recommendation).
- **Tab Customer Internal**: Menambahkan kembali tab "Customer Internal" pada menu utama navigasi, menggantikan tab "Internal Dashboard" yang sebelumnya disembunyikan.
- **Data Unit Mock**: Menambahkan berbagai entri data *dummy* baru pada `unitHealthData` (mockData.ts) sehingga tabel `Technical Details per Unit` memiliki beragam contoh data untuk masing-masing customer (PT Adaro Energy, PT Thiess, PT Agincourt Resources, dll.).

### Changed
- **Default Routing (Halaman Login)**: Mengubah konfigurasi `routes.ts` sehingga halaman Login menjadi halaman default pertama kali (`index: true`) yang dimuat saat membuka aplikasi.
- **Navigasi Login**: Mengubah fungsi `handleLogin` pada halaman Login Screen sehingga tombol "Masuk" secara otomatis mengarahkan (redirect) pengguna ke halaman `/customer-internal`.
- **Halaman Customer Portal (Eksternal)**: Menghilangkan dropdown *Filter Customer* sepenuhnya dari halaman Customer Portal, sehingga pengguna eksternal tidak dapat memfilter data ke customer lain.

### Removed
- **Internal Dashboard Tab**: Tab "Internal Dashboard" lama disembunyikan/dihapus dari navigasi atas.
- **Customer Filter (Customer Portal)**: Dropdown filter customer dihapus dari antarmuka Customer Portal standar.
