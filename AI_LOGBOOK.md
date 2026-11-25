# 📓 Logbook Pemanfaatan Kecerdasan Artifisial 

**Nama Proyek:** PhysLab 10 — Laboratorium Fisika Virtual SMA Kelas 10  
**Alat AI yang Digunakan:** Google Gemini  
**Tautan Repositori:** https://github.com  

---

## Tahap 1: Eksplorasi Ide & Perancangan Solusi
*(Interaksi AI dalam menentukan konsep produk dan arsitektur aplikasi)*

* **Permasalahan & Tujuan Awal:**  
  Kami ingin membuat media pembelajaran fisika kelas 10 yang bisa menggantikan alat praktikum fisik yang terbatas di sekolah, ringan dibuka di HP maupun laptop, serta tetap dapat digunakan ketika tidak ada koneksi internet.
* **Prompt yang Digunakan:**  
  > *"Kami siswa kelas 10 ingin membuat website simulasi laboratorium fisika virtual yang ringan, interaktif, dan bisa dipakai secara offline. Tolong bantu rancang struktur folder, pembagian modul praktikum fisika kelas 10, dan konsep antarmukanya."*
* **Hasil Saran dari AI:**  
  AI menyarankan arsitektur aplikasi web statis (*Vanilla HTML, CSS, JavaScript*) dengan 5–6 modul utama (Gerak Parabola, Hukum Hooke, Bidang Miring, Ayunan Bandul, Kekekalan Energi Mekanik, dan Hukum Archimedes), dilengkapi *Service Worker* (PWA) untuk fitur *offline* serta sistem *gamifikasi* misi tantangan.
* **Validasi & Modifikasi Mandiri:**  
  - Kami menyeleksi topik praktikum agar sesuai dengan materi pelajaran Fisika SMA Kelas 10 di sekolah kami.  
  - Kami memutuskan untuk menambahkan fitur **Lembar Kerja Siswa (LKS)** interaktif dan tombol **ekspor hasil percobaan ke format `.PNG` dan `.CSV` (Excel)** agar website benar-benar bisa dipakai untuk mengumpulkan laporan tugas praktikum.  
  - Kami juga memilih tema visual **Dark Glassmorphism Futuristik** untuk tampilan utama agar lebih modern dan menarik bagi siswa.

---

## Tahap 2: Penyusunan Kerangka Kode (*Scaffolding*)
*(Interaksi AI dalam merancang struktur dasar HTML/CSS dan logika simulasi HTML5 Canvas)*

* **Prompt yang Digunakan:**  
  > *"Buatkan kerangka HTML, CSS, dan logika JavaScript HTML5 Canvas untuk menghitung rumus fisika secara real-time beserta animasi visualnya pada modul Gerak Parabola, Pegas, Bidang Miring, Bandul, Energi, dan Hukum Archimedes."*
* **Hasil Saran dari AI:**  
  AI memberikan struktur kode modular yang memisahkan desain global (`style.css`), fungsi bantuan bersama (`lab-tools.js`), serta file HTML dan JS terpisah untuk setiap simulasi agar mudah dikelola.
* **Validasi & Modifikasi Mandiri:**  
  - Kami memvalidasi setiap rumus fisika yang digunakan pada kode (seperti \(X_{max} = \frac{v_0^2 \sin 2\theta}{g}\), \(F = k \cdot \Delta x\), \(T = 2\pi\sqrt{L/g}\), dan \(F_a = \rho_{cair} \cdot g \cdot V_{celup}\)) menggunakan perhitungan kalkulator manual untuk memastikan angka output pada kartu hasil sesuai dengan teori fisika.  
  - Kami merancang dan memasukkan aset ilustrasi visual laboratorium khusus (`hero-lab.png`) di halaman beranda serta logo ikon aplikasi (`icon-app.png`) untuk tampilan saat di-*install*.  
  - Kami menyesuaikan tata letak *grid* beranda menjadi 6 kartu simetris dan menambahkan panel peringkat skor peneliti (`localStorage`).

---

## Tahap 3: Pemecahan Masalah & Penanganan Galat (*Debugging*)
*(Interaksi AI saat memperbaiki kesalahan program selama pengujian)*

* **Masalah 1 — Kanvas Simulasi Kosong (*Blank Canvas*) pada Beberapa Modul:**  
  - **Gejala:** Saat halaman *Gerak Parabola* dan *Hukum Archimedes* dibuka, kotak kanvas putih tampil kosong tanpa gambar meriam maupun tangki air.  
  - **Bantuan AI:** AI membantu melacak sumber galat melalui fitur *Inspect Element -> Console* browser, yang menunjukkan adanya tag `<script>` penutup yang terpotong di bagian bawah HTML serta kurung kurawal `}` yang tidak seimbang saat menyalin kode JS.  
  - **Validasi & Modifikasi Mandiri:** Kami memeriksa ulang setiap file HTML dan JS menggunakan *Console* browser hingga seluruh *SyntaxError* hilang dan animasi simulasi berjalan mulus di semua 6 halaman.

* **Masalah 2 — Sinkronisasi Tema & Konflik *Cache* Offline (`sw.js`):**  
  - **Gejala:** Pembaruan tampilan tidak langsung muncul di browser karena *Service Worker* masih menyimpan versi lama, dan ikon aplikasi saat di-*install* awalnya hanya menampilkan huruf inisial polosan.  
  - **Bantuan AI:** AI menyarankan pembaruan versi *cache* pada `sw.js` serta penggunaan jalur file ikon lokal (`./icon-app.png`) pada `manifest.json`.  
  - **Validasi & Modifikasi Mandiri:** Kami menghapus fitur pengubah tema manual yang bentrok, menerapkan kelas tema seragam `futuristic-home` di seluruh halaman, mengunggah file ikon aplikasi asli ke repositori, dan menguji instalasi aplikasi di desktop Windows serta mode pesawat (*offline*).

* **Masalah 3 — Kelengkapan Navigasi Antar-Halaman:**  
  - **Validasi & Modifikasi Mandiri:** Setelah menambahkan modul ke-6 (*Archimedes*), kami memperbarui barisan menu `<nav>` pada seluruh file HTML (`index.html`, `parabola.html`, `pegas.html`, `bidang-miring.html`, `bandul.html`, dan `energi.html`) secara mandiri agar perpindahan antar-ruang laboratorium konsisten dari halaman mana pun.

---

## Tahap 4: Refleksi & Penjelasan Kode
*(Verifikasi pemahaman tim terhadap fungsi dan cara kerja program yang dibuat)*

Melalui pengerjaan proyek **PhysLab 10**, tim kami memahami cara kerja arsitektur website interaktif secara menyeluruh:
1. **Pemisahan Struktur, Gaya, dan Logika:** `HTML` berperan menyusun elemen antarmuka (*slider*, tombol, tabel, dan area `<canvas>`), `CSS` mengatur tata letak responsif dan efek *glassmorphism*, sedangkan `JavaScript` menghitung persamaan fisika dan menggambar ulang posisi benda setiap *frame* menggunakan `requestAnimationFrame()`.
2. **Manajemen Data Lokal & Offline:** Kami memahami bagaimana `localStorage` menyimpan skor tantangan pengguna secara permanen di browser, serta bagaimana `manifest.json` dan `sw.js` (*Service Worker*) bekerja sama menyimpan aset web ke memori perangkat agar dapat di-*install* dan dijalankan tanpa koneksi internet.
3. **Etika Penggunaan AI:** AI berperan sebagai mentor teknis dan alat bantu *debugging* yang mempercepat proses pembuatan kode, sementara seluruh pengujian rumus, perbaikan struktur file, desain aset visual, dan verifikasi akhir dilakukan langsung oleh tim kami.
---

## Tahap 5: Pengembangan Lanjutan (Ekspansi 9 Modul & Fitur Penjelasan Otomatis)
*(Iteraksi lanjutan berdasarkan evaluasi tim untuk memperkaya materi listrik-magnet dan pemahaman konsep siswa)*

* **Permasalahan & Evaluasi Tim:**  
  Setelah menguji versi awal (6 modul), tim kami menyadari bahwa siswa tidak hanya membutuhkan angka hasil akhir, tetapi juga penjelasan langkah cara menghitungnya dan alasan fisika di balik hasil tersebut. Selain itu, materi Listrik Dinamis dan Kemagnetan perlu ditambahkan agar cakupan materi kelas 10 semakin lengkap.
* **Prompt yang Digunakan:**  
  > *"Tambahkan 3 modul baru yaitu Hukum Ohm & Rangkaian Listrik (Seri/Paralel), Elektromagnet, dan Induksi Faraday, serta buat kotak Analisis & Penjelasan Otomatis di bawah hasil hitungan pada seluruh 9 modul."*
* **Validasi & Modifikasi Mandiri:**  
  - Kami menguji logika rangkaian seri dan paralel pada modul Listrik, termasuk skenario *overload* (arus > 2,5 A) yang memutus filamen lampu.  
  - Kami menguji perubahan kutub magnet (U-S) pada modul Elektromagnet serta simpangan jarum Galvanometer pada modul Induksi Faraday.  
  - Kami memperbarui berkas `sw.js` ke versi `v8` dan menguji seluruh 9 halaman dalam mode *offline* serta memperbarui `README.md`.
  - Halaman ini mendukung mode offline otomatis. Setelah kunjungan pertama dengan koneksi internet. Seluruh isi halaman ini tetap dapat diakses meskipun perangkat Anda sedang offline.
