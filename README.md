# POPBA - Pop Balon Ajaib

<div align="center">

<img src="./assets/testing/responsive/balloon-pop-maths-responsive.png" width="100%" style="margin: 15px;">

**Game Edukasi Matematika Interaktif untuk Siswa Sekolah Dasar**

[![Status](https://img.shields.io/badge/Status-Active-success)]()
[![Platform](https://img.shields.io/badge/Platform-Web-blue)]()
[![Language](https://img.shields.io/badge/Language-Bahasa%20Indonesia-red)]()

</div>

---

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Tim Pengembang](#tim-pengembang)
- [Identifikasi Masalah dan Tujuan](#identifikasi-masalah-dan-tujuan)
- [Stakeholder Analysis](#stakeholder-analysis)
- [Kebutuhan Sistem](#kebutuhan-sistem)
  - [Kebutuhan Fungsional](#kebutuhan-fungsional)
  - [Kebutuhan Non-Fungsional](#kebutuhan-non-fungsional)
- [Ruang Lingkup Proyek](#ruang-lingkup-proyek)
- [Fitur Utama](#fitur-utama)
- [Mode Permainan](#mode-permainan)
- [Alur Permainan](#alur-permainan)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Struktur Proyek](#struktur-proyek)
- [Arsitektur Informasi](#arsitektur-informasi)
- [Desain dan Tampilan](#desain-dan-tampilan)
- [Panduan Penggunaan](#panduan-penggunaan)
- [Jadwal Pengembangan](#jadwal-pengembangan)
- [Pengujian](#pengujian)
- [Deployment](#deployment)
- [Lisensi dan Kredit](#lisensi-dan-kredit)

---

## Tentang Proyek

**POPBA (Pop Balon Ajaib)** atau **Balloon Pop Maths** adalah aplikasi game edukasi berbasis web yang dirancang khusus untuk membantu siswa Sekolah Dasar dalam mempelajari konsep matematika dasar dengan cara yang menyenangkan dan interaktif.

Game ini dikembangkan sebagai bagian dari **Capstone Project Kelompok 14** dengan judul:

> *"Implementasi Game Interaktif Aplikasi POPBA (Pop Balon Ajaib) untuk Pembelajaran Matematika di SD Negeri 11 Metro Pusat"*

### Mengapa POPBA?

Proses pembelajaran matematika yang masih bersifat konvensional (ceramah & papan tulis) seringkali membuat siswa mudah bosan dan kurang fokus. POPBA hadir sebagai solusi media pembelajaran digital yang menarik dan menyenangkan, sehingga siswa lebih antusias dan aktif dalam belajar matematika.

---

## Tim Pengembang

<div align="center">

### Kelompok 14 - Universitas Muhammadiyah Metro

**Program Studi Ilmu Komputer | Tahun Akademik 2025**

</div>

| No | Nama | NPM | Peran | Deskripsi Tugas | Tools |
|----|------|-----|-------|-----------------|-------|
| 1 | **Noval Kurniawan** | 23430064 | Project Manager & Analyst | Mengkoordinasi tim, melakukan analisis kebutuhan sistem | Google Docs |
| 2 | **Pandu Winata** | 23430079 | UI/UX Designer | Mendesain tampilan antarmuka sistem yang menarik dan ramah anak | Canva |
| 3 | **Ilyas Zulkarnaen Z.** | 23430082 | Frontend & Backend Developer | Mengembangkan logika sistem dan mengimplementasikan antarmuka pengguna | HTML, CSS, JavaScript |
| 4 | **Gilang Prayoga D.S.** | 23430107 | Brainstorming | Mengembangkan ide dan konsep permainan | Google Gemini, YouTube |
| 5 | **Yupia** | 23430134 | Quality Assurance & Dokumentasi | Melakukan uji coba sistem dan mencatat hasilnya | GameBench |
| 6 | **Salma Nabila U.** | 23430016 | Quality Assurance & Dokumentasi | Melakukan uji coba sistem dan mencatat hasilnya | GameBench |

---

## Identifikasi Masalah dan Tujuan

### Permasalahan yang Dihadapi

| No | Kendala | Masalah | Solusi POPBA |
|----|---------|---------|--------------|
| 1 | Pembelajaran matematika masih konvensional (ceramah & papan tulis) | Siswa mudah bosan dan kurang fokus saat belajar matematika karena metode tidak interaktif | Pembelajaran diganti menggunakan game interaktif POPBA sebagai media pembelajaran digital yang menarik sehingga siswa lebih antusias dan aktif belajar |
| 2 | Guru kesulitan memberikan latihan soal dengan variasi bentuk interaktif | Pembelajaran cenderung monoton dan tidak ada evaluasi real-time terhadap jawaban siswa | Menyediakan fitur soal latihan interaktif dengan balon pop-up dan feedback otomatis ketika siswa menjawab |

### Tujuan Proyek

Berdasarkan identifikasi permasalahan di atas, tujuan dari Capstone Project ini adalah:

1. **Menciptakan media pembelajaran matematika yang interaktif dan menyenangkan**
2. **Membantu siswa memahami konsep matematika dasar** melalui pendekatan game-based learning
3. **Meningkatkan motivasi dan antusiasme belajar siswa** dengan visualisasi yang menarik
4. **Menyediakan feedback real-time** untuk setiap jawaban siswa
5. **Memfasilitasi pembelajaran mandiri** baik di sekolah maupun di rumah

---

## Stakeholder Analysis

### Pemangku Kepentingan

| No | User | Peran |
|----|------|-------|
| 1 | **Siswa** | Pengguna utama yang memainkan game POPBA dan belajar matematika dengan berbagai level |
| 2 | **Guru** | Memantau hasil belajar siswa dan memberikan evaluasi berdasarkan nilai dalam game |
| 3 | **Tim Pengembang** | Membuat, menguji, dan memelihara aplikasi game interaktif POPBA |

### Hasil Wawancara dengan Guru

Wawancara dilakukan dengan **Ibu Dian Triningsih** dari SD Negeri 11 Metro Pusat:

| Pertanyaan | Jawaban |
|------------|---------|
| Apakah siswa sering merasa bosan saat belajar matematika? | Ya, karena metode belajar masih menggunakan buku dan papan tulis |
| Apakah pembelajaran berbasis game dapat membantu siswa? | Tentu, siswa akan lebih semangat dan fokus jika belajar sambil bermain |
| Sebaiknya game ini digunakan di sekolah, rumah, atau keduanya? | Sebaiknya bisa digunakan di rumah dan sekolah agar bisa lebih memahami pelajaran |
| Apa harapan terhadap implementasi aplikasi POPBA? | Semoga dapat membantu siswa lebih memahami matematika dasar dan meningkatkan motivasi belajar |

---

## Kebutuhan Sistem

### Kebutuhan Fungsional

Berikut adalah daftar kebutuhan fungsional beserta penjelasan fungsinya:

| No | Kebutuhan | Deskripsi Fungsi |
|----|-----------|------------------|
| 1 | **Pemilihan Level Permainan** | Aplikasi menyediakan beberapa tingkatan kesulitan (mudah, sedang, sulit) sesuai kemampuan siswa. Fungsi ini memungkinkan personalisasi pembelajaran sesuai tingkat pemahaman masing-masing siswa. |
| 2 | **Permainan Interaktif Matematika** | Siswa dapat belajar sambil bermain melalui permainan "Balon Ajaib" yang berisi soal-soal penjumlahan, pengurangan, perkalian, dan pembagian. Balon yang dipecahkan memberikan pengalaman visual yang menarik. |
| 3 | **Umpan Balik Langsung (Real-time Feedback)** | Setelah menjawab soal, aplikasi langsung memberikan respon benar/salah beserta efek suara dan animasi. Fungsi ini membantu siswa memahami kesalahan secara instan. |
| 4 | **Sistem Skor dan High Score** | Menampilkan skor akhir, jumlah jawaban benar, dan menyimpan skor tertinggi. Fungsi ini memotivasi siswa untuk terus meningkatkan performa. |
| 5 | **Pengulangan Permainan** | Siswa dapat mengulangi permainan atau level tertentu untuk memperbaiki nilai. Fungsi ini mendukung konsep latihan berulang dalam pembelajaran. |
| 6 | **Petunjuk Penggunaan (How to Play)** | Menu bantuan atau panduan cara menggunakan aplikasi POPBA dengan benar. Fungsi ini memastikan semua pengguna dapat memahami mekanisme game. |

### Kebutuhan Non-Fungsional

| No | Aspek | Deskripsi |
|----|-------|-----------|
| 1 | **Usability (Kemudahan Penggunaan)** | Tampilan antarmuka sederhana, berwarna cerah, dengan ikon menarik agar mudah dipahami oleh siswa SD |
| 2 | **Performance (Kinerja Sistem)** | Aplikasi berjalan responsif dengan waktu loading tidak lebih dari 3 detik saat membuka menu atau memulai permainan |
| 3 | **Reliability (Keandalan)** | Aplikasi stabil dan dapat digunakan tanpa error meskipun banyak siswa mengakses bersamaan |
| 4 | **Availability (Ketersediaan)** | Aplikasi dapat diakses kapan pun tanpa batasan waktu selama perangkat dan koneksi tersedia |
| 5 | **Compatibility (Kompatibilitas)** | Dapat dijalankan di berbagai perangkat (smartphone, tablet, laptop, desktop) dengan ukuran layar berbeda |
| 6 | **Maintainability (Kemudahan Pemeliharaan)** | Sistem mudah diperbarui atau diperbaiki, mendukung penambahan level atau soal baru di masa mendatang |
| 7 | **Interactivity (Interaktivitas)** | Pengalaman belajar menarik melalui animasi, suara, dan umpan balik langsung saat menjawab soal |
| 8 | **Localization (Bahasa)** | Menggunakan Bahasa Indonesia sederhana agar mudah dipahami oleh siswa SD |

---

## Ruang Lingkup Proyek

### Apa yang Termasuk dalam Sistem

| Aspek | Termasuk | Tidak Termasuk |
|-------|----------|----------------|
| **User/Aktor** | Guru dan siswa sekolah | Admin sekolah pusat, Kepala sekolah, Orang tua siswa |
| **Fitur Utama** | Mode soal, high score, options, nyawa (hati), how to play | Pengolahan nilai ujian, integrasi sistem akademik sekolah |
| **Media** | Aplikasi web dan desktop berbasis game | Website portal khusus |
| **Hak Akses** | Guru dan siswa sekolah | Pengunjung umum |

### Fitur Prioritas

| No | Fitur | Alasan Prioritas |
|----|-------|------------------|
| 1 | **Mode Soal** | Diperlukan untuk memilih jenis soal sesuai kompetensi siswa |
| 2 | **High Score** | Menampilkan skor tertinggi untuk memotivasi siswa |
| 3 | **Options** | Memilih jumlah pertanyaan, kesulitan, dan tipe soal |
| 4 | **Nyawa (Hati)** | Memberikan kesempatan siswa untuk mencoba lagi |
| 5 | **How to Play** | Membantu siswa memahami cara bermain dengan benar |

---

## Fitur Utama

### 1. Judul dan Branding
```
Komponen: Header dengan logo "Balloon Pop Maths"
Fungsi: Identitas visual game yang menarik perhatian anak-anak
Lokasi: Bagian atas halaman utama
```
<img src="./assets/testing/features/title.png" style="margin: 15px; width:300px;">

### 2. Game Mode Selector
```
Komponen: Tombol pemilihan mode permainan
Fungsi: Memungkinkan pemilihan jenis operasi matematika yang ingin dipelajari
Mode: Aljabar, Waktu, Massa, Volume, Bangunan, Operasi, Ujian
```
<img src="./assets/testing/features/game-mode.png" style="margin: 15px; width:300px;">

### 3. High Score Panel
```
Komponen: Panel penampil skor tertinggi
Fungsi: Menyimpan dan menampilkan skor terbaik untuk memotivasi siswa
Format: Skor saat ini / Skor maksimal (contoh: 0 / 10)
```
<img src="./assets/testing/features/high-score.png" style="margin: 15px; width:300px;">

### 4. Tombol Play
```
Komponen: Tombol besar "PLAY"
Fungsi: Memulai permainan setelah mode dan pengaturan dipilih
Validasi: Menampilkan notifikasi jika mode belum dipilih
```
<img src="./assets/testing/features/play.png" style="margin: 15px; width:300px;">

### 5. Audio Control
```
Komponen: Tombol kontrol suara (on/off)
Fungsi: Mengaktifkan atau menonaktifkan efek suara permainan
Manfaat: Menyesuaikan pengalaman bermain sesuai lingkungan
```
<img src="./assets/testing/features/options-audio.png" style="margin: 15px; width:300px;">

### 6. Light/Dark Mode Toggle
```
Komponen: Tombol pengaturan tema (terang/gelap)
Fungsi: Mengubah tampilan visual untuk kenyamanan mata
Mode: Light mode (siang) dan Dark mode (malam)
```

### 7. Pilihan (Options)
```
Komponen: Menu pengaturan permainan
Fungsi: Mengatur parameter permainan seperti jumlah soal dan tingkat kesulitan
Lokasi: Tombol "Pilihan" di halaman utama
```

### 8. Input Soal
```
Komponen: Menu input soal kustom
Fungsi: Memungkinkan guru atau pengguna menambahkan soal sendiri
Manfaat: Fleksibilitas dalam penyesuaian materi pembelajaran
```

### 9. How to Play Section
```
Komponen: Panel panduan bermain
Fungsi: Memberikan instruksi langkah-langkah cara bermain game
Target: Membantu pengguna baru memahami mekanisme permainan
```
<img src="./assets/testing/features/how-to-play.png" style="margin: 15px; width:300px;">

### 10. Answer Balloons
```
Komponen: Balon-balon berisi angka jawaban
Fungsi: Elemen interaktif utama yang dipecahkan untuk menjawab soal
Animasi: Efek "pop" saat benar, efek "deflate" saat salah
Suara: Feedback audio untuk setiap interaksi
```
<img src="./assets/testing/features/game-balloons.png" style="margin: 15px; width:500px;">

### 11. Custom Cursor
```
Komponen: Pointer kustom berbentuk jarum/pin
Fungsi: Memberikan pengalaman interaktif saat mengarahkan ke balon
Visual: Memperkuat konsep "memecahkan" balon
```
<img src="./assets/images/pin.svg" style="margin: 15px; width:30px;">

### 12. Game Loader
```
Komponen: Animasi loading saat memuat permainan
Fungsi: Memberikan feedback visual bahwa game sedang dimuat
Desain: Animasi balon yang menarik perhatian
```
<img src="./assets/testing/features/game-loader.png" style="margin: 15px; width:100px;">

### 13. Sistem Nyawa (Health Bar)
```
Komponen: Indikator nyawa berbentuk hati
Fungsi: Menunjukkan sisa kesempatan menjawab salah
Mekanisme: Nyawa berkurang saat jawaban salah, game over saat habis
```

### 14. Question Display
```
Komponen: Panel penampil soal matematika
Fungsi: Menampilkan soal yang harus dijawab oleh siswa
Format: Operasi matematika dengan angka yang harus dihitung
```

---

## Mode Permainan

POPBA menyediakan berbagai mode permainan untuk mendukung pembelajaran matematika yang komprehensif:

### 1. Aljabar
```
Deskripsi: Mode untuk belajar konsep dasar aljabar
Tipe Soal: Mencari nilai x dalam persamaan sederhana
Target: Pengenalan konsep variabel untuk siswa SD kelas tinggi
```

### 2. Waktu
```
Deskripsi: Mode untuk belajar konsep waktu
Tipe Soal: Membaca jam, menghitung selisih waktu, konversi satuan waktu
Target: Pemahaman konsep waktu dan pengukurannya
```

### 3. Massa
```
Deskripsi: Mode untuk belajar konsep berat/massa
Tipe Soal: Konversi satuan berat (gram, kilogram), perbandingan massa
Target: Pemahaman konsep pengukuran berat
```

### 4. Volume
```
Deskripsi: Mode untuk belajar konsep volume/isi
Tipe Soal: Menghitung volume, konversi satuan (liter, mililiter)
Target: Pemahaman konsep kapasitas dan volume
```

### 5. Bangunan
```
Deskripsi: Mode untuk belajar bangun datar dan ruang
Tipe Soal: Mengenali bentuk, menghitung luas dan keliling
Target: Pemahaman geometri dasar
```

### 6. Operasi
```
Deskripsi: Mode untuk operasi matematika dasar
Tipe Soal: Penjumlahan, pengurangan, perkalian, pembagian
Target: Penguatan kemampuan berhitung dasar
```

### 7. Ujian
```
Deskripsi: Mode evaluasi komprehensif
Tipe Soal: Campuran dari semua mode
Target: Mengukur pemahaman keseluruhan materi
```

---

## Alur Permainan

### Flowchart Permainan

```
[MULAI]
    │
    ▼
[Masuk ke Aplikasi] ──► Tampilan Menu Home
    │
    ▼
[Pilih Materi dan Opsi]
    │
    ▼
┌───────────────────────┐
│ Sudah Memilih Mode? │
└───────────────────────┘
    │           │
   TIDAK       YA
    │           │
    ▼           ▼
[Notifikasi:    [Mulai Bermain]
"Silahkan           │
pilih mode          ▼
terlebih      [Menjawab Soal dengan
dahulu"]       Memecahkan Balon]
                    │
                    ▼
              ┌─────────────┐
              │ Jawaban     │
              │ Benar?      │
              └─────────────┘
                │         │
              BENAR     SALAH
                │         │
                ▼         ▼
           [Lanjut    [Nyawa
            Soal       Berkurang]
            Berikutnya]    │
                │         ▼
                │    ┌─────────────┐
                │    │ Nyawa Habis?│
                │    └─────────────┘
                │      │         │
                │    TIDAK      YA
                │      │         │
                │      ▼         ▼
                │    [Coba     [Game Over]
                │     Lagi]        │
                │                  │
                ▼                  │
          ┌─────────────┐         │
          │ Soal Selesai?│         │
          └─────────────┘         │
            │         │           │
          TIDAK      YA          │
            │         │           │
            ▼         ▼           │
          [Soal   [Tampilkan  ◄───┘
          Berikutnya] High Score]
                        │
                        ▼
                  [Kembali ke
                   Menu Utama]
                        │
                        ▼
                    [SELESAI]
```

### Activity Diagram

| Pemain | Sistem |
|--------|--------|
| Membuka website Balloon Pop Math | Menampilkan halaman utama dengan pilihan permainan |
| Memilih jenis permainan | Mencatat jenis permainan yang dipilih |
| Memilih tingkat kesulitan | Mencatat tingkat kesulitan |
| Memilih tombol Bermain | Menampilkan soal pertama dan nyawa penuh |
| Menjawab soal dengan memecahkan balon | Memeriksa jawaban |
| - | Jika benar: Tampilkan soal berikutnya |
| - | Jika salah: Kurangi 1 nyawa |
| - | Menampilkan skor akhir pemain |
| - | Kembali ke halaman utama secara otomatis |

---

## Teknologi yang Digunakan

### Bahasa Pemrograman

| Teknologi | Fungsi | Keterangan |
|-----------|--------|------------|
| **HTML5** | Struktur halaman | Membentuk kerangka dan elemen-elemen halaman web |
| **CSS3** | Styling dan animasi | Mengatur tampilan visual, warna, layout, dan animasi balon |
| **JavaScript** | Logika permainan | Mengontrol mekanisme game, skor, validasi jawaban, dan interaktivitas |

### Framework dan Library

| Library | Fungsi | Versi |
|---------|--------|-------|
| **Bootstrap 4** | Framework CSS responsif | Memastikan tampilan optimal di berbagai ukuran layar |
| **jQuery** | Manipulasi DOM | Mempermudah interaksi dengan elemen halaman |
| **Font Awesome** | Ikon visual | Menyediakan ikon-ikon menarik untuk tombol dan navigasi |
| **EmailJS** | Pengiriman email | Memungkinkan pengiriman feedback tanpa backend (opsional) |
| **Firebase** | Penyimpanan gambar | Menyimpan aset gambar untuk mode visual (opsional) |

### Font yang Digunakan

| Font | Kegunaan | Sumber |
|------|----------|--------|
| **Whale I Tried** | Judul utama | Font kartun bergaris tepi yang menyerupai balon |
| **Nunito** | Teks isi | Font sans-serif yang bersih dan mudah dibaca |

### Dukungan Browser

| Browser | Status | Catatan |
|---------|--------|---------|
| Google Chrome | Didukung | Rekomendasi utama |
| Microsoft Edge | Didukung | - |
| Mozilla Firefox | Didukung | - |
| Safari | Didukung | - |
| Opera | Didukung | - |
| Internet Explorer | Tidak Didukung | Tidak kompatibel |

---

## Struktur Proyek

```
balloon-pop-maths/
│
├── index.html                    # Halaman utama aplikasi (Single Page Application)
├── 404.html                      # Halaman error untuk URL yang tidak ditemukan
├── server.js                     # Server statis Node.js untuk Replit deployment
├── README.md                     # Dokumentasi proyek (file ini)
├── TESTING.md                    # Dokumentasi lengkap pengujian
├── replit.md                     # Konfigurasi khusus Replit
│
└── assets/                       # Folder utama semua aset aplikasi
    │
    ├── css/                      # Stylesheet aplikasi
    │   ├── style.css             # Style utama: layout, warna, animasi balon
    │   └── style_cloud.css       # Style untuk efek animasi awan di background
    │
    ├── js/                       # JavaScript - Logika permainan
    │   ├── initialisation.js     # Inisialisasi game: setup awal, load data
    │   ├── game-logic.js         # Logika inti: skor, nyawa, win/lose condition
    │   ├── maths.js              # Generator soal matematika untuk semua mode
    │   ├── display.js            # Kontrol tampilan: update UI, show/hide elements
    │   ├── events.js             # Event handler: klik balon, tombol, navigasi
    │   ├── animation.js          # Animasi: balon pop, efek visual, transisi
    │   ├── audio.js              # Kontrol audio: play/pause, volume, efek suara
    │   ├── background.js         # Animasi background: awan bergerak, gradasi
    │   ├── nightMode.js          # Toggle mode gelap/terang untuk kenyamanan mata
    │   ├── storyMode.js          # Mode cerita: pembelajaran dengan narasi
    │   ├── input-soal.js         # Fitur input soal kustom oleh guru
    │   ├── mail.js               # Integrasi EmailJS untuk form kontak
    │   ├── firebase-config.js    # Konfigurasi Firebase (opsional, untuk gambar)
    │   └── spec/                 # Unit test dengan Jasmine
    │       ├── displaySpec.js    # Test untuk fungsi display
    │       └── mathsSpec.js      # Test untuk fungsi matematika
    │
    ├── sounds/                   # File audio efek suara
    │   ├── pop.mp3               # Suara balon pecah (jawaban benar)
    │   ├── deflate.mp3           # Suara balon kempes (jawaban salah)
    │   ├── well-done.mp3         # Suara selamat saat menang
    │   ├── unlucky.mp3           # Suara game over
    │   ├── high-score.mp3        # Suara saat mencapai high score baru
    │   └── music_background.mp3  # Musik latar permainan
    │
    ├── fonts/                    # Font kustom
    │   ├── whale-i-tried.ttf     # Font utama judul (TrueType)
    │   ├── whale-i-tried.woff    # Font untuk web (WOFF)
    │   ├── whale-i-tried.woff2   # Font untuk web terkompresi (WOFF2)
    │   ├── whale-i-tried.eot     # Font untuk IE lama (EOT)
    │   └── whale-i-tried.svg     # Font dalam format SVG
    │
    ├── images/                   # Gambar dan grafis game
    │   ├── balloon-blue-sprite.png     # Sprite balon biru dengan animasi
    │   ├── balloon-green-sprite.png    # Sprite balon hijau dengan animasi
    │   ├── balloon-orange-sprite.png   # Sprite balon oranye dengan animasi
    │   ├── balloon-pink-sprite.png     # Sprite balon pink dengan animasi
    │   ├── balloon-purple-sprite.png   # Sprite balon ungu dengan animasi
    │   ├── balloon-red-sprite.png      # Sprite balon merah dengan animasi
    │   ├── balloon-yellow-sprite.png   # Sprite balon kuning dengan animasi
    │   ├── balloon-purple-cropped.png  # Balon ungu untuk dekorasi header
    │   ├── pin.svg                     # Cursor kustom bentuk jarum
    │   ├── icon.png                    # Ikon aplikasi
    │   ├── splash.png                  # Splash screen image
    │   └── balloon-favicon.ico         # Favicon browser
    │
    ├── testing/                  # Dokumentasi visual pengujian
    │   ├── features/             # Screenshot setiap fitur game
    │   ├── responsive/           # Screenshot tampilan responsif
    │   └── validation/           # Laporan validasi HTML/CSS/JS
    │
    └── wireframes/               # Desain dan perencanaan UI
        ├── rev0/                 # Sketsa tangan awal
        ├── rev1/                 # Wireframe digital versi 1
        ├── rev2/                 # Wireframe responsif
        ├── site-map.png          # Peta navigasi situs
        ├── game-logic.png        # Diagram logika permainan
        ├── colour-palette.png    # Palet warna yang digunakan
        └── colour-gradient.png   # Gradasi warna background
```

### Penjelasan File JavaScript Utama

| File | Fungsi | Deskripsi Detail |
|------|--------|------------------|
| `initialisation.js` | Setup Awal | Memuat konfigurasi, mengatur state awal game, dan menginisialisasi semua komponen |
| `game-logic.js` | Logika Inti | Mengontrol alur permainan: mulai, pause, cek jawaban, update skor, dan kondisi menang/kalah |
| `maths.js` | Generator Soal | Membuat soal matematika secara dinamis untuk setiap mode (aljabar, waktu, massa, dll) |
| `display.js` | Kontrol UI | Mengatur tampilan elemen: menampilkan soal, update skor, animasi transisi halaman |
| `events.js` | Event Handler | Menangani semua interaksi user: klik balon, tombol navigasi, pengaturan |
| `animation.js` | Efek Visual | Mengatur animasi balon pecah, efek konfeti, dan transisi visual lainnya |
| `audio.js` | Manajemen Suara | Mengontrol semua efek suara dan musik latar, termasuk mute/unmute |
| `nightMode.js` | Mode Gelap | Toggle antara tema terang dan gelap untuk kenyamanan pengguna |
| `input-soal.js` | Soal Kustom | Memungkinkan guru menambahkan soal sendiri ke dalam game |

---

## Arsitektur Informasi

Game POPBA terdiri dari satu halaman web (Single Page Application) yang terbagi menjadi beberapa section:

### 1. Heading Section
```
Lokasi: Bagian atas halaman
Komponen: Logo dan judul "Balloon Pop Maths"
Fungsi: Identitas brand dan navigasi kembali ke home
Interaksi: Klik untuk refresh/kembali ke menu utama
```

### 2. Options Section
```
Lokasi: Di bawah heading
Komponen: Tombol-tombol mode permainan (Aljabar, Waktu, Massa, dll)
Fungsi: Pemilihan jenis permainan yang ingin dimainkan
Interaksi: Klik untuk memilih mode, tombol aktif akan ter-highlight
```

### 3. Control Section
```
Lokasi: Tengah halaman
Komponen: High Score panel, tombol Play, kontrol Audio, Light/Dark mode
Fungsi: Kontrol utama game dan pengaturan
Interaksi: Klik Play untuk mulai, toggle untuk audio dan tema
```

### 4. Settings Section
```
Lokasi: Di bawah control
Komponen: Tombol Pilihan dan Input Soal
Fungsi: Pengaturan lanjutan dan kustomisasi soal
Interaksi: Klik untuk membuka menu pengaturan
```

### 5. Game Section
```
Lokasi: Menggantikan section lain saat game aktif
Komponen: Pertanyaan, balon jawaban, skor, nyawa
Fungsi: Area bermain utama
Interaksi: Klik balon untuk menjawab
```

### 6. Footer Section
```
Lokasi: Bagian bawah halaman
Komponen: Link Contact Developer, link GitHub
Fungsi: Informasi pengembang dan kontak
Interaksi: Klik untuk menghubungi atau melihat source code
```

---

## Desain dan Tampilan

### Skema Warna

| Warna | Kode Hex | Penggunaan |
|-------|----------|------------|
| **Blue Bell** | #908CD9 | Tombol, area pertanyaan, garis skor |
| **Purple Mountain Majesty** | #9C70BD | Efek hover tombol, footer, kontrol audio |
| **Purpureus** | #A2529A | Teks dialog, teks skor, teks informasi |
| **Green Blue Crayola** | #3E8BC6 | Garis tepi tombol dan area pertanyaan |
| **Azure X11** | #EEFBFF | Teks judul, teks tombol, latar dialog |
| **Candy Pink** | #DC7774 | Bar kesehatan/nyawa |
| **Silver Chalice** | #A9A9A9 | Bayangan teks pada balon |

### Background

Latar belakang menggunakan gradasi 3 warna bertema "langit":
- **#7CC0FF** - Biru langit cerah
- **#6FD1F4** - Biru muda
- **#9EFBF5** - Cyan terang

### Responsive Design

Aplikasi dirancang responsif untuk berbagai perangkat:

| Perangkat | Lebar | Layout |
|-----------|-------|--------|
| Desktop | > 992px | Full layout, semua elemen terlihat |
| Tablet | 768px - 992px | Layout adaptif, beberapa elemen di-stack |
| Mobile | < 768px | Layout vertikal, tombol lebih besar untuk touch |

---

## Panduan Penggunaan

### Untuk Siswa

1. **Buka aplikasi** melalui browser di perangkat apapun
2. **Pilih mode permainan** yang ingin dipelajari (Aljabar, Waktu, dll)
3. **Klik tombol PLAY** untuk memulai
4. **Baca soal** yang muncul di layar
5. **Klik balon** yang berisi jawaban yang benar
6. **Perhatikan nyawa** - jangan sampai habis!
7. **Lihat skor** di akhir permainan
8. **Ulangi** untuk meningkatkan skor!

### Untuk Guru

1. **Pilih mode** sesuai materi yang diajarkan
2. **Atur tingkat kesulitan** melalui menu Pilihan
3. **Gunakan Input Soal** untuk menambah soal kustom
4. **Pantau High Score** siswa sebagai evaluasi
5. **Gunakan di kelas** dengan proyektor atau perangkat individual

---

## Jadwal Pengembangan

### Metodologi: RAD (Rapid Application Development)

| No | Tahapan | Deskripsi | Durasi | Output |
|----|---------|-----------|--------|--------|
| 1 | **Requirements Planning** | Wawancara user, identifikasi kebutuhan fungsional & non-fungsional | 1 minggu | Dokumen capaian pembelajaran siswa |
| 2 | **User Design** | Mendesain UI/UX, membuat mockup game | 1 minggu | Mockup sistem game |
| 3 | **Construction** | Pengkodean, integrasi modul, uji fungsionalitas | 4 minggu | Sistem siap diuji |
| 4 | **Testing** | Pengujian pengguna, revisi bug, penyempurnaan tampilan | 1 minggu | Sistem stabil dan siap implementasi |
| 5 | **Cutover** | Instalasi sistem, pelatihan pengguna, dokumentasi | 1 minggu | Sistem terpasang dan laporan akhir |

**Total Waktu Pengembangan: 8 Minggu**

---

## Pengujian

Dokumentasi lengkap pengujian tersedia di file [TESTING.md](TESTING.md).

### Jenis Pengujian

1. **Functional Testing** - Memastikan semua fitur berfungsi sesuai spesifikasi
2. **Usability Testing** - Menguji kemudahan penggunaan oleh siswa SD
3. **Responsive Testing** - Memastikan tampilan optimal di berbagai perangkat
4. **Browser Compatibility Testing** - Menguji kompatibilitas dengan berbagai browser
5. **Performance Testing** - Mengukur waktu loading dan responsivitas

### Tools Pengujian

- **GameBench** - Untuk pengujian performa game
- **Chrome DevTools** - Untuk debugging dan responsive testing
- **Jasmine** - Untuk unit testing JavaScript

---

## Deployment

### Menjalankan Lokal

Aplikasi dapat dijalankan menggunakan server Node.js sederhana:

```bash
# Clone repository
git clone [repository-url]

# Masuk ke direktori
cd balloon-pop-maths

# Jalankan server
node server.js

# Akses di browser
# http://localhost:5000
```

### Deployment di Replit

Proyek ini dikonfigurasi untuk deployment di Replit:

1. Server statis berjalan di port 5000
2. Semua file disajikan dari direktori root
3. Cache control diatur untuk mencegah caching berlebihan

### Konfigurasi Deployment

- **Target**: Static site
- **Public Directory**: `.` (root)
- **Port**: 5000

---

## Lisensi dan Kredit

### Kredit

- **Font Whale I Tried** - [Misti's Fonts](https://mistifonts.com/) (Free for personal use)
- **Font Nunito** - [Google Fonts](https://fonts.google.com/) (Open Font License)
- **Icons** - [Font Awesome](https://fontawesome.com/)
- **Framework** - [Bootstrap](https://getbootstrap.com/)

### Ucapan Terima Kasih

- **SD Negeri 11 Metro Pusat** - Tempat implementasi dan pengujian
- **Ibu Dian Triningsih** - Narasumber wawancara kebutuhan sistem
- **Program Studi Ilmu Komputer** - Universitas Muhammadiyah Metro
- **Dosen Pembimbing** - Atas bimbingan selama pengembangan Capstone Project

---

<div align="center">

### POPBA - Pop Balon Ajaib

**Belajar Matematika Jadi Lebih Mudah, Seru, dan Menyenangkan!**

*Capstone Project Kelompok 14 - Universitas Muhammadiyah Metro*

*Program Studi Ilmu Komputer - Tahun Akademik 2025*

---

[Dokumentasi](https://www.instagram.com/p/DP0JtvKkT_-/) | [Demo](https://replit.com) | [Source Code](https://github.com)

</div>
