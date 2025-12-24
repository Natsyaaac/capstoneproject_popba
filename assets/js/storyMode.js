/**
 * @fileOverview Story Mode Question Generator - Soal Cerita untuk SD Kelas 1-6
 * @description Bank soal cerita yang meaningful dan mudah dipahami anak
 * @version 5.0.0
 * 
 * Semua mode dibuat dengan cerita yang masuk akal dan konteks sehari-hari anak
 */
/*jshint esversion: 6 */

const StoryMode = {
    names: {
        boys: ["Budi", "Andi", "Riko", "Deni", "Fajar", "Hasan", "Gilang", "Rizki", "Tono", "Wahyu"],
        girls: ["Ani", "Siti", "Dewi", "Rani", "Putri", "Maya", "Lina", "Nisa", "Tika", "Wulan"],
        teachers: ["Bu Guru", "Pak Guru", "Bu Ani", "Pak Budi"],
        families: ["Ayah", "Ibu", "Kakak", "Adik"]
    },

    items: {
        fruits: ["apel", "jeruk", "mangga", "pisang", "anggur"],
        snacks: ["kue", "roti", "permen", "coklat", "biskuit"],
        stationery: ["pensil", "pulpen", "buku tulis", "penghapus", "penggaris"],
        toys: ["boneka", "mobil-mobilan", "bola", "kelereng", "layangan"],
        animals: ["kucing", "kelinci", "ikan", "burung", "ayam"],
        school: ["meja", "kursi", "papan tulis", "tas", "sepatu"]
    },

    places: {
        school: ["kelas", "perpustakaan", "kantin", "lapangan", "taman sekolah"],
        home: ["rumah", "dapur", "taman", "kamar", "ruang tamu"],
        public: ["pasar", "toko", "supermarket", "taman kota", "toko buah"],
    },

    rand: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    randInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    randName: function() {
        return Math.random() < 0.5 ? this.rand(this.names.boys) : this.rand(this.names.girls);
    }
};

function getGradeRange(difficulty) {
    const difficultyGrades = {
        "easy": [1, 2, 3],
        "medium": [4, 5],
        "hard": [6]
    };
    return difficultyGrades[difficulty] || difficultyGrades["medium"];
}

function getRandomGrade(difficulty) {
    const grades = getGradeRange(difficulty);
    return grades[Math.floor(Math.random() * grades.length)];
}

// ========== OPERATOR MODE ==========
function generateOperatorQuestions(grade, subMode) {
    const S = StoryMode;
    let questions = [];

    if (subMode === "Kurang" || subMode === "pengurangan") {
        switch(grade) {
            case 1:
                questions = [
                    () => { const a = S.randInt(3, 9); const b = S.randInt(1, a-1); return [`${S.randName()} punya ${a} ${S.rand(S.items.fruits)}. Dimakan ${b}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(5, 10); const b = S.randInt(1, a-2); return [`Ada ${a} ${S.rand(S.items.snacks)} di piring. Dimakan ${b}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(4, 8); const b = S.randInt(1, a-1); return [`Di tas ada ${a} ${S.rand(S.items.stationery)}. Diberi teman ${b}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(6, 10); const b = S.randInt(2, a-1); return [`Ibu punya ${a} telur. Pakai untuk masak ${b}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(5, 9); const b = S.randInt(1, a-2); return [`${S.randName()} punya ${a} kelereng. Kalah main ${b}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(7, 10); const b = S.randInt(2, 4); return [`Di pohon ada ${a} burung. ${b} terbang pergi. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(5, 9); const b = S.randInt(1, 3); return [`Ada ${a} ${S.rand(S.items.toys)} di lemari. Dimainkan ${b}. Sisa di lemari berapa?`, a - b]; },
                    () => { const a = S.randInt(8, 10); const b = S.randInt(2, 5); return [`Kolam punya ${a} ikan. Dijual ${b} ekor. Sisa berapa ikan?`, a - b]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(10, 20); const b = S.randInt(3, a-3); return [`${S.randName()} beli ${a} permen. Dimakan ${b}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(15, 25); const b = S.randInt(5, a-5); return [`Di kelas ada ${a} siswa. ${b} sakit. Hadir berapa siswa?`, a - b]; },
                    () => { const a = S.randInt(12, 20); const b = S.randInt(4, a-3); return [`Ibu belanja ${a} botol minyak. Pakai ${b}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(20, 30); const b = S.randInt(8, a-5); return [`Perpustakaan punya ${a} komik. Dipinjam ${b}. Tinggal berapa komik?`, a - b]; },
                    () => { const a = S.randInt(15, 25); const b = S.randInt(5, 10); return [`Ayah panen ${a} mangga. Diberi tetangga ${b}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(18, 28); const b = S.randInt(6, 12); return [`Toko punya ${a} buku. Terjual ${b}. Sisa berapa buku?`, a - b]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const a = S.randInt(50, 100); const b = S.randInt(15, a-20); return [`Ayah punya uang Rp${a}.000. Belanja Rp${b}.000. Sisa berapa ribu?`, a - b]; },
                    () => { const a = S.randInt(100, 200); const b = S.randInt(30, a-30); return [`Toko punya ${a} telur. Terjual ${b}. Sisa berapa telur?`, a - b]; },
                    () => { const a = S.randInt(80, 150); const b = S.randInt(25, a-20); return [`Peternakan punya ${a} ayam. Dijual ${b}. Sisa berapa ayam?`, a - b]; },
                    () => { const a = S.randInt(150, 250); const b = S.randInt(50, a-40); return [`Pabrik buat ${a} roti. Terjual ${b}. Sisa berapa roti?`, a - b]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const a = S.randInt(500, 1000); const b = S.randInt(150, a-200); return [`Toko buku punya ${a} buku. Terjual ${b}. Sisa berapa buku?`, a - b]; },
                    () => { const a = S.randInt(1000, 2000); const b = S.randInt(300, a-400); return [`${S.randName()} tabung Rp${a.toLocaleString()}. Ambil Rp${b.toLocaleString()}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(800, 1500); const b = S.randInt(250, a-300); return [`Gudang punya ${a} karung beras. Jual ${b}. Sisa berapa karung?`, a - b]; },
                    () => { const a = S.randInt(2500, 4000); const b = S.randInt(800, 1500); return [`Perpustakaan punya ${a} buku. Rusak ${b}. Bagus berapa buku?`, a - b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(5000, 10000); const b = S.randInt(1500, a-2000); return [`Pabrik buat ${a.toLocaleString()} tas. Cacat ${b.toLocaleString()}. Bagus berapa?`, a - b]; },
                    () => { const a = S.randInt(10000, 25000); const b = S.randInt(3000, 8000); return [`${S.randName()} punya tabungan Rp${a.toLocaleString()}. Pakai Rp${b.toLocaleString()}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(15000, 30000); const b = S.randInt(5000, 12000); return [`Stadium penuh ${a.toLocaleString()} penonton. Pergi ${b.toLocaleString()}. Tinggal berapa?`, a - b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(50000, 100000); const b = S.randInt(15000, a-20000); return [`Perusahaan punya aset Rp${a.toLocaleString()}. Rugi Rp${b.toLocaleString()}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(100000, 250000); const b = S.randInt(30000, 80000); return [`Bank punya uang Rp${a.toLocaleString()}. Ditarik Rp${b.toLocaleString()}. Sisa berapa?`, a - b]; },
                    () => { const persen = S.randInt(10, 30); const nilai = S.randInt(500, 2000); const potongan = Math.round((persen * nilai) / 100); return [`Harga barang Rp${nilai.toLocaleString()}. Diskon ${persen}%. Jadi berapa rupiah?`, nilai - potongan]; },
                ];
                break;
        }
    }
    else if (subMode === "Tambah" || subMode === "penjumlahan") {
        switch(grade) {
            case 1:
                questions = [
                    () => { const a = S.randInt(1, 5); const b = S.randInt(1, 4); return [`${S.randName()} punya ${a} ${S.rand(S.items.fruits)}. Dikasih Ibu ${b}. Jadi punya berapa?`, a + b]; },
                    () => { const a = S.randInt(2, 6); const b = S.randInt(1, 3); return [`Pagi ambil ${a} air minum. Siang ambil ${b}. Ambil berapa banyak?`, a + b]; },
                    () => { const a = S.randInt(1, 5); const b = S.randInt(2, 4); return [`Di lemari ada ${a} buku. Beli ${b} lagi. Total berapa buku?`, a + b]; },
                    () => { const a = S.randInt(2, 5); const b = S.randInt(1, 4); return [`Ibu beli ${a} telur di pagi. Beli ${b} telur lagi di sore. Total berapa telur?`, a + b]; },
                    () => { const a = S.randInt(3, 6); const b = S.randInt(2, 4); return [`Hari ini dapat ${a} permen. Besok dapat ${b}. Total dapat berapa permen?`, a + b]; },
                    () => { const a = S.randInt(2, 5); const b = S.randInt(1, 3); return [`${S.randName()} dapat ${a} stiker. Dapat lagi ${b} stiker. Total berapa stiker?`, a + b]; },
                    () => { const a = S.randInt(1, 4); const b = S.randInt(2, 5); return [`Ada ${a} anak main. Datang ${b} anak lagi. Total anak berapa?`, a + b]; },
                    () => { const a = S.randInt(2, 6); const b = S.randInt(1, 4); return [`Basket punya ${a} apel. Ambil ${b} apel dari pohon. Total berapa apel?`, a + b]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(8, 15); const b = S.randInt(5, 10); return [`${S.randName()} beli ${a} roti. Dapat bonus ${b} roti. Total berapa roti?`, a + b]; },
                    () => { const a = S.randInt(12, 20); const b = S.randInt(6, 12); return [`Kelas A ada ${a} siswa. Kelas B ada ${b} siswa. Total siswa berapa?`, a + b]; },
                    () => { const a = S.randInt(10, 18); const b = S.randInt(7, 12); return [`Ayah dapat gaji bonus Rp${a}.000. Ibu dapat Rp${b}.000. Total dapat berapa ribu?`, a + b]; },
                    () => { const a = S.randInt(15, 25); const b = S.randInt(8, 15); return [`Perpustakaan dapat buku baru ${a}. Dapat donasi ${b} buku. Total berapa buku?`, a + b]; },
                    () => { const a = S.randInt(10, 20); const b = S.randInt(5, 10); return [`Senin jual ${a} kue. Selasa jual ${b} kue. Total jual berapa kue?`, a + b]; },
                    () => { const a = S.randInt(18, 25); const b = S.randInt(10, 15); return [`${S.randName()} dapat ${a} stiker dari teman. Dapat ${b} dari guru. Total berapa stiker?`, a + b]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const a = S.randInt(50, 100); const b = S.randInt(25, 50); return [`${S.randName()} tabung Rp${a}.000. Dapat hadiah Rp${b}.000. Total tabungan berapa ribu?`, a + b]; },
                    () => { const a = S.randInt(100, 200); const b = S.randInt(50, 100); return [`Toko punya barang ${a}. Dapat stok baru ${b}. Total berapa barang?`, a + b]; },
                    () => { const a = S.randInt(150, 250); const b = S.randInt(75, 125); return [`Peternakan punya ${a} ayam. Beli ${b} ayam baru. Total berapa ayam?`, a + b]; },
                    () => { const a = S.randInt(80, 150); const b = S.randInt(40, 80); return [`Kebun punya ${a} pohon mangga. Tanam ${b} pohon baru. Total berapa pohon?`, a + b]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const a = S.randInt(500, 1000); const b = S.randInt(250, 500); return [`Bulan lalu jual ${a} buku. Bulan ini jual ${b}. Total jual berapa buku?`, a + b]; },
                    () => { const a = S.randInt(1500, 2500); const b = S.randInt(750, 1250); return [`Desa A punya ${a.toLocaleString()} jiwa. Desa B punya ${b.toLocaleString()} jiwa. Total berapa jiwa?`, a + b]; },
                    () => { const a = S.randInt(2000, 3500); const b = S.randInt(1000, 2000); return [`Pabrik A buat ${a.toLocaleString()} unit. Pabrik B buat ${b.toLocaleString()} unit. Total berapa?`, a + b]; },
                    () => { const a = S.randInt(3000, 5000); const b = S.randInt(1500, 2500); return [`Toko A punya stok ${a.toLocaleString()}. Toko B punya ${b.toLocaleString()}. Total berapa?`, a + b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(10000, 25000); const b = S.randInt(5000, 15000); return [`Pabrik A hasilkan ${a.toLocaleString()} unit. Pabrik B hasilkan ${b.toLocaleString()} unit. Total berapa?`, a + b]; },
                    () => { const a = S.randInt(25000, 50000); const b = S.randInt(10000, 25000); return [`Kota A populasi ${a.toLocaleString()} jiwa. Kota B populasi ${b.toLocaleString()}}. Total berapa?`, a + b]; },
                    () => { const a = S.randInt(50000, 100000); const b = S.randInt(25000, 50000); return [`${S.randName()} tabung Rp${a.toLocaleString()}. Dapat hadiah Rp${b.toLocaleString()}. Total berapa?`, a + b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(100000, 250000); const b = S.randInt(50000, 125000); return [`Modal awal Rp${a.toLocaleString()}. Pinjam Rp${b.toLocaleString()}. Total modal berapa?`, a + b]; },
                    () => { const a = S.randInt(500000, 1000000); const b = S.randInt(250000, 500000); return [`Proyek A anggaran Rp${a.toLocaleString()}. Proyek B Rp${b.toLocaleString()}. Total berapa?`, a + b]; },
                    () => { const pecahan = S.randInt(1, 4) / 10; const nilai = S.randInt(1000, 5000); const tambah = Math.round(nilai * pecahan); return [`Harga awal Rp${nilai.toLocaleString()}. Naik ${(pecahan * 100).toFixed(0)}%. Harga baru berapa?`, nilai + tambah]; },
                ];
                break;
        }
    }
    else if (subMode === "Bagi" || subMode === "pembagian") {
        switch(grade) {
            case 1:
                questions = [
                    () => { const b = S.randInt(2, 3); const a = b * S.randInt(2, 4); return [`${S.randName()} punya ${a} ${S.rand(S.items.snacks)}. Dibagi ${b} anak sama rata. Tiap anak dapat berapa?`, a / b]; },
                    () => { const b = S.randInt(2, 4); const a = b * S.randInt(1, 3); return [`Ada ${a} buku bagi ke ${b} tas sama rata. Tiap tas berapa buku?`, a / b]; },
                    () => { const b = 2; const a = b * S.randInt(2, 5); return [`${S.randName()} punya ${a} ${S.rand(S.items.toys)}. Dibagi adik sama banyak. Dapat berapa?`, a / b]; },
                    () => { const b = S.randInt(2, 3); const a = b * S.randInt(2, 4); return [`Ada ${a} permen dibagi ke ${b} kantong sama rata. Tiap kantong berapa?`, a / b]; },
                    () => { const b = 2; const a = b * S.randInt(3, 5); return [`${a} pensil dibagi untuk ${b} anak sama rata. Tiap anak dapat berapa?`, a / b]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const b = S.randInt(2, 5); const a = b * S.randInt(3, 6); return [`${a} {{S.rand(S.items.snacks)}} dibagi ke ${b} anak sama rata. Tiap anak dapat berapa?`, a / b]; },
                    () => { const b = S.randInt(3, 5); const a = b * S.randInt(4, 8); return [`Ada ${a} buku di ${b} rak sama rata. Tiap rak berapa buku?`, a / b]; },
                    () => { const b = S.randInt(2, 4); const a = b * S.randInt(5, 10); return [`${S.randName()} dapat ${a} stiker dibagi ke ${b} teman sama rata. Tiap teman dapat berapa?`, a / b]; },
                    () => { const b = S.randInt(4, 6); const a = b * S.randInt(3, 6); return [`Ada ${a} kursi di ${b} baris sama rata. Tiap baris berapa kursi?`, a / b]; },
                    () => { const b = S.randInt(2, 5); const a = b * S.randInt(4, 8); return [`${a} apel bagi ke ${b} keranjang sama rata. Tiap keranjang berapa apel?`, a / b]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const b = S.randInt(5, 10); const a = b * S.randInt(8, 15); return [`Kelas A ada ${a} siswa dibagi ${b} kelompok. Tiap kelompok berapa siswa?`, a / b]; },
                    () => { const b = S.randInt(4, 8); const a = b * S.randInt(10, 20); return [`Ada ${a} {{S.rand(S.items.snacks)}} dikemas ke ${b} kotak sama. Tiap kotak berapa?`, a / b]; },
                    () => { const b = S.randInt(5, 10); const a = b * S.randInt(12, 25); return [`${a} halaman buku dibaca dalam ${b} hari. Tiap hari berapa halaman?`, a / b]; },
                    () => { const b = S.randInt(6, 12); const a = b * S.randInt(8, 15); return [`Perpustakaan punya ${a} buku di ${b} rak sama rata. Tiap rak berapa buku?`, a / b]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const b = S.randInt(10, 25); const a = b * S.randInt(15, 30); return [`{{b}} kotak punya ${a} telur. Tiap kotak berapa telur?`, a / b]; },
                    () => { const b = S.randInt(8, 15); const a = b * S.randInt(20, 40); return [`Pabrik buat ${a} barang dalam ${b} hari. Per hari berapa barang?`, a / b]; },
                    () => { const b = S.randInt(12, 20); const a = b * S.randInt(25, 50); return [`Dana Rp${a.toLocaleString()} dibagi ke ${b} orang sama. Tiap orang dapat berapa?`, a / b]; },
                    () => { const b = S.randInt(5, 12); const a = b * S.randInt(30, 60); return [`Jarak ${a} km ditempuh dalam ${b} jam. Kecepatan berapa km/jam?`, a / b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const b = S.randInt(15, 30); const a = b * S.randInt(50, 100); return [`{{a.toLocaleString()}} produk dibagi ke ${b} toko sama. Tiap toko dapat berapa?`, a / b]; },
                    () => { const b = S.randInt(12, 24); const a = b * S.randInt(100, 200); return [`Penjualan Rp${a.toLocaleString()} dalam {{b}} bulan. Per bulan berapa?`, a / b]; },
                    () => { const b = S.randInt(20, 40); const a = b * S.randInt(75, 150); return [`{{a.toLocaleString()}} siswa di {{b}} kelas sama. Tiap kelas berapa siswa?`, a / b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const b = S.randInt(25, 50); const a = b * S.randInt(200, 400); return [`Keuntungan Rp${a.toLocaleString()} dibagi {{b}} pemegang saham sama. Tiap orang dapat berapa?`, a / b]; },
                    () => { const b = S.randInt(12, 24); const a = b * S.randInt(500, 1000); return [`Produksi {{a.toLocaleString()}} unit dalam {{b}} bulan. Per bulan berapa unit?`, a / b]; },
                    () => { const persen = S.randInt(10, 50); const hasil = S.randInt(100, 500); const total = Math.round((hasil * 100) / persen); return [`{{persen}}% dari suatu bilangan = {{hasil}}. Bilangan itu berapa?`, total]; },
                ];
                break;
        }
    }
    else if (subMode === "Kali" || subMode === "perkalian") {
        switch(grade) {
            case 1:
                questions = [
                    () => { const a = S.randInt(1, 5); return [`${S.randName()} dapat ${a} {{S.rand(S.items.stationery)}}. Adik dapat sama banyak. Total berapa?`, a * 2]; },
                    () => { const a = S.randInt(2, 4); const b = 3; return [`Ada {{b}} tas masing-masing isi {{a}} {{S.rand(S.items.snacks)}}. Total berapa?`, a * b]; },
                    () => { const a = S.randInt(2, 4); return [`Tiap anak dapat {{a}} {{S.rand(S.items.fruits)}}. Ada 2 anak. Total berapa?`, a * 2]; },
                    () => { const a = S.randInt(2, 4); const b = 3; return [`Ada {{b}} pot. Tiap pot {{a}} bunga. Total berapa bunga?`, a * b]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(2, 6); const b = S.randInt(2, 5); return [`${S.randName()} beli {{b}} paket. Tiap paket {{a}} {{S.rand(S.items.snacks)}}. Total berapa?`, a * b]; },
                    () => { const a = S.randInt(3, 8); const b = S.randInt(2, 5); return [`Ada {{b}} baris kursi. Tiap baris {{a}} kursi. Total berapa?`, a * b]; },
                    () => { const a = S.randInt(2, 7); const b = S.randInt(3, 6); return [`Tiap siswa dapat {{a}} pensil. Ada {{b}} siswa. Total berapa pensil?`, a * b]; },
                    () => { const a = S.randInt(4, 10); const b = S.randInt(2, 5); return [`Tiap telur dalam 1 peti {{a}} butir. Ada {{b}} peti. Total berapa telur?`, a * b]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const a = S.randInt(10, 25); const b = S.randInt(3, 8); return [`Tiap siswa bayar Rp{{a}}.000 untuk acara. Ada {{b}} siswa. Total berapa ribu?`, a * b]; },
                    () => { const a = S.randInt(5, 15); const b = S.randInt(4, 8); return [`Ada {{b}} rak. Tiap rak {{a}} buku. Total berapa buku?`, a * b]; },
                    () => { const a = S.randInt(8, 20); const b = S.randInt(3, 7); return [`Tiap hari jual {{a}} kg barang. Ada {{b}} hari. Total berapa kg?`, a * b]; },
                    () => { const a = S.randInt(6, 12); const b = S.randInt(4, 9); return [`Tiap kotak punya {{a}} telur. Ada {{b}} kotak. Total berapa telur?`, a * b]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const a = S.randInt(15, 40); const b = S.randInt(4, 10); return [`Pabrik buat {{a}} barang per hari. Ada {{b}} hari kerja. Total berapa?`, a * b]; },
                    () => { const a = S.randInt(12, 30); const b = S.randInt(5, 12); return [`Tiap siswa dapat Rp{{a}}.000 uang saku. Ada {{b}} siswa. Total berapa ribu?`, a * b]; },
                    () => { const a = S.randInt(20, 50); const b = S.randInt(4, 8); return [`Tiap petak panen {{a}} kg padi. Ada {{b}} petak. Total berapa kg?`, a * b]; },
                    () => { const a = S.randInt(10, 25); const b = S.randInt(6, 12); return [`Tiap mobil angkut {{a}} barang. Ada {{b}} mobil. Total berapa barang?`, a * b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(100, 250); const b = S.randInt(8, 15); return [`Pabrik buat {{a}} unit per hari. Ada {{b}} hari kerja. Total berapa unit?`, a * b]; },
                    () => { const a = S.randInt(150, 400); const b = S.randInt(5, 10); return [`Tiap siswa bayar Rp{{a}}.000. Ada {{b}} siswa. Total berapa ribu?`, a * b]; },
                    () => { const a = S.randInt(50, 150); const b = S.randInt(8, 14); return [`Setiap bulan hemat Rp{{a}}.000. Ada {{b}} bulan. Total hemat berapa ribu?`, a * b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(500, 1500); const b = S.randInt(6, 15); return [`Tiap bulan untung Rp{{a}}.000. Ada {{b}} bulan. Total untung berapa ribu?`, a * b]; },
                    () => { const a = S.randInt(200, 600); const b = S.randInt(8, 16); return [`Produksi {{a}} unit per hari. Ada {{b}} hari kerja. Total berapa unit?`, a * b]; },
                    () => { const a = S.randInt(250, 750); const b = S.randInt(7, 14); return [`Tiap siswa bayar Rp{{a}}.000 untuk trip. Ada {{b}} siswa. Total berapa ribu?`, a * b]; },
                ];
                break;
        }
    }

    return questions;
}

// ========== ALJABAR MODE ==========
function generateAljabarQuestions(grade, subMode) {
    const S = StoryMode;
    let questions = [];

    if (subMode === "Isi Kotak Kosong") {
        switch(grade) {
            case 1:
                questions = [
                    () => { const a = S.randInt(1, 5); const b = S.randInt(1, 5); const c = a + b; return [`{{a}} + [   ] = {{c}}. Kotak isi berapa?`, b]; },
                    () => { const a = S.randInt(2, 6); const b = S.randInt(1, 5); const c = a + b; return [`[   ] + {{b}} = {{c}}. Kotak isi berapa?`, a]; },
                    () => { const a = S.randInt(3, 8); const b = S.randInt(1, 5); const c = a - b; return [`{{a}} - [   ] = {{c}}. Kotak isi berapa?`, b]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(5, 15); const b = S.randInt(5, 15); const c = a + b; return [`{{a}} + [   ] = {{c}}. Kotak isi berapa?`, b]; },
                    () => { const a = S.randInt(10, 25); const b = S.randInt(5, 15); const c = a - b; return [`{{a}} - [   ] = {{c}}. Kotak isi berapa?`, b]; },
                    () => { const a = S.randInt(8, 20); const b = S.randInt(2, 8); const c = a * b; return [`{{a}} × [   ] = {{c}}. Kotak isi berapa?`, b]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const a = S.randInt(20, 50); const b = S.randInt(10, 30); const c = a + b; return [`{{a}} + [   ] = {{c}}. Kotak isi berapa?`, b]; },
                    () => { const a = S.randInt(50, 100); const b = S.randInt(20, 50); const c = a - b; return [`{{a}} - [   ] = {{c}}. Kotak isi berapa?`, b]; },
                    () => { const a = S.randInt(15, 30); const b = S.randInt(3, 10); const c = a * b; return [`{{a}} × [   ] = {{c}}. Kotak isi berapa?`, b]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const a = S.randInt(100, 300); const b = S.randInt(50, 200); const c = a + b; return [`{{a}} + [   ] = {{c}}. Kotak isi berapa?`, b]; },
                    () => { const a = S.randInt(300, 600); const b = S.randInt(100, 300); const c = a - b; return [`{{a}} - [   ] = {{c}}. Kotak isi berapa?`, b]; },
                    () => { const a = S.randInt(20, 50); const b = S.randInt(4, 12); const c = a * b; return [`{{a}} × [   ] = {{c}}. Kotak isi berapa?`, b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(1000, 5000); const b = S.randInt(500, 3000); const c = a + b; return [`{{a.toLocaleString()}} + [   ] = {{c.toLocaleString()}}. Kotak isi berapa?`, b]; },
                    () => { const a = S.randInt(5000, 10000); const b = S.randInt(1000, 5000); const c = a - b; return [`{{a.toLocaleString()}} - [   ] = {{c.toLocaleString()}}. Kotak isi berapa?`, b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(10000, 50000); const b = S.randInt(5000, 30000); const c = a + b; return [`{{a.toLocaleString()}} + [   ] = {{c.toLocaleString()}}. Kotak isi berapa?`, b]; },
                    () => { const a = S.randInt(50000, 100000); const b = S.randInt(10000, 50000); const c = a - b; return [`{{a.toLocaleString()}} - [   ] = {{c.toLocaleString()}}. Kotak isi berapa?`, b]; },
                ];
                break;
        }
    }
    else if (subMode === "Nilai Variabel") {
        switch(grade) {
            case 1:
                questions = [
                    () => { const a = S.randInt(2, 5); const b = S.randInt(1, 3); const hasil = a + b; return [`Jika A = {{a}} dan B = {{b}}, maka A + B = ?`, hasil]; },
                    () => { const a = S.randInt(4, 8); const b = S.randInt(1, 3); const hasil = a - b; return [`Jika C = {{a}} dan D = {{b}}, maka C - D = ?`, hasil]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(5, 15); const b = S.randInt(3, 10); const hasil = a + b; return [`Jika X = {{a}} dan Y = {{b}}, maka X + Y = ?`, hasil]; },
                    () => { const a = S.randInt(10, 20); const b = S.randInt(3, 10); const hasil = a - b; return [`Jika M = {{a}} dan N = {{b}}, maka M - N = ?`, hasil]; },
                    () => { const a = S.randInt(3, 8); const b = S.randInt(2, 5); const hasil = a * b; return [`Jika P = {{a}} dan Q = {{b}}, maka P × Q = ?`, hasil]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const a = S.randInt(20, 50); const b = S.randInt(10, 30); const hasil = a + b; return [`Jika A = {{a}} dan B = {{b}}, maka A + B = ?`, hasil]; },
                    () => { const a = S.randInt(50, 100); const b = S.randInt(20, 50); const hasil = a - b; return [`Jika C = {{a}} dan D = {{b}}, maka C - D = ?`, hasil]; },
                    () => { const a = S.randInt(10, 25); const b = S.randInt(3, 10); const hasil = a * b; return [`Jika M = {{a}} dan N = {{b}}, maka M × N = ?`, hasil]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const a = S.randInt(100, 300); const b = S.randInt(50, 200); const hasil = a + b; return [`Jika X = {{a}} dan Y = {{b}}, maka X + Y = ?`, hasil]; },
                    () => { const a = S.randInt(300, 600); const b = S.randInt(100, 300); const hasil = a - b; return [`Jika P = {{a}} dan Q = {{b}}, maka P - Q = ?`, hasil]; },
                    () => { const a = S.randInt(15, 40); const b = S.randInt(4, 12); const hasil = a * b; return [`Jika A = {{a}} dan B = {{b}}, maka A × B = ?`, hasil]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(1000, 5000); const b = S.randInt(500, 3000); const hasil = a + b; return [`Jika X = {{a}} dan Y = {{b}}, maka X + Y = ?`, hasil]; },
                    () => { const a = S.randInt(5000, 10000); const b = S.randInt(1000, 5000); const hasil = a - b; return [`Jika M = {{a}} dan N = {{b}}, maka M - N = ?`, hasil]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(10000, 50000); const b = S.randInt(5000, 30000); const hasil = a + b; return [`Jika A = {{a}} dan B = {{b}}, maka A + B = ?`, hasil]; },
                    () => { const a = S.randInt(50000, 100000); const b = S.randInt(10000, 50000); const hasil = a - b; return [`Jika P = {{a}} dan Q = {{b}}, maka P - Q = ?`, hasil]; },
                ];
                break;
        }
    }
    else if (subMode === "Persamaan Sederhana") {
        switch(grade) {
            case 1:
                questions = [
                    () => { const a = S.randInt(2, 5); const b = S.randInt(1, 3); const hasil = a + b; return [`X + {{b}} = {{hasil}}, maka X = ?`, a]; },
                    () => { const a = S.randInt(4, 8); const b = S.randInt(1, 3); const hasil = a - b; return [`Y - {{b}} = {{hasil}}, maka Y = ?`, a]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(5, 15); const b = S.randInt(3, 10); const hasil = a + b; return [`A + {{b}} = {{hasil}}, maka A = ?`, a]; },
                    () => { const a = S.randInt(10, 20); const b = S.randInt(3, 10); const hasil = a - b; return [`B - {{b}} = {{hasil}}, maka B = ?`, a]; },
                    () => { const a = S.randInt(3, 8); const b = S.randInt(2, 5); const hasil = a * b; return [`C × {{b}} = {{hasil}}, maka C = ?`, a]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const a = S.randInt(20, 50); const b = S.randInt(10, 30); const hasil = a + b; return [`X + {{b}} = {{hasil}}, maka X = ?`, a]; },
                    () => { const a = S.randInt(50, 100); const b = S.randInt(20, 50); const hasil = a - b; return [`Y - {{b}} = {{hasil}}, maka Y = ?`, a]; },
                    () => { const a = S.randInt(10, 25); const b = S.randInt(3, 10); const hasil = a * b; return [`M × {{b}} = {{hasil}}, maka M = ?`, a]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const a = S.randInt(100, 300); const b = S.randInt(50, 200); const hasil = a + b; return [`A + {{b}} = {{hasil}}, maka A = ?`, a]; },
                    () => { const a = S.randInt(300, 600); const b = S.randInt(100, 300); const hasil = a - b; return [`B - {{b}} = {{hasil}}, maka B = ?`, a]; },
                    () => { const a = S.randInt(15, 40); const b = S.randInt(4, 12); const hasil = a * b; return [`P × {{b}} = {{hasil}}, maka P = ?`, a]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(1000, 5000); const b = S.randInt(500, 3000); const hasil = a + b; return [`X + {{b}} = {{hasil}}, maka X = ?`, a]; },
                    () => { const a = S.randInt(5000, 10000); const b = S.randInt(1000, 5000); const hasil = a - b; return [`Y - {{b}} = {{hasil}}, maka Y = ?`, a]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(10000, 50000); const b = S.randInt(5000, 30000); const hasil = a + b; return [`A + {{b}} = {{hasil}}, maka A = ?`, a]; },
                    () => { const a = S.randInt(50000, 100000); const b = S.randInt(10000, 50000); const hasil = a - b; return [`B - {{b}} = {{hasil}}, maka B = ?`, a]; },
                ];
                break;
        }
    }
    else if (subMode === "Pola Bilangan") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`Pola: 2, 4, 6, 8, [   ]. Angka selanjutnya?`, 10]; },
                    () => { return [`Pola: 1, 3, 5, 7, [   ]. Angka selanjutnya?`, 9]; },
                    () => { return [`Pola: 5, 10, 15, 20, [   ]. Angka selanjutnya?`, 25]; },
                ];
                break;
            case 2:
                questions = [
                    () => { return [`Pola: 2, 4, 6, 8, 10, [   ]. Angka selanjutnya?`, 12]; },
                    () => { return [`Pola: 1, 2, 3, 4, 5, [   ]. Angka selanjutnya?`, 6]; },
                    () => { return [`Pola: 3, 6, 9, 12, [   ]. Angka selanjutnya?`, 15]; },
                    () => { return [`Pola: 10, 20, 30, 40, [   ]. Angka selanjutnya?`, 50]; },
                ];
                break;
            case 3:
                questions = [
                    () => { return [`Pola: 5, 10, 15, 20, 25, [   ]. Angka selanjutnya?`, 30]; },
                    () => { return [`Pola: 2, 4, 8, 16, [   ]. Angka selanjutnya?`, 32]; },
                    () => { return [`Pola: 1, 4, 9, 16, [   ]. Angka selanjutnya?`, 25]; },
                    () => { return [`Pola: 100, 90, 80, 70, [   ]. Angka selanjutnya?`, 60]; },
                ];
                break;
            case 4:
                questions = [
                    () => { return [`Pola: 5, 10, 20, 40, [   ]. Angka selanjutnya?`, 80]; },
                    () => { return [`Pola: 1, 1, 2, 3, 5, 8, [   ]. Angka selanjutnya?`, 13]; },
                    () => { return [`Pola: 2, 6, 12, 20, [   ]. Angka selanjutnya?`, 30]; },
                    () => { return [`Pola: 1000, 900, 800, 700, [   ]. Angka selanjutnya?`, 600]; },
                ];
                break;
            case 5:
                questions = [
                    () => { return [`Pola: 2, 4, 8, 16, 32, [   ]. Angka selanjutnya?`, 64]; },
                    () => { return [`Pola: 1, 4, 9, 16, 25, [   ]. Angka selanjutnya?`, 36]; },
                    () => { return [`Pola: 3, 9, 27, 81, [   ]. Angka selanjutnya?`, 243]; },
                ];
                break;
            case 6:
                questions = [
                    () => { return [`Pola: 1, 1, 2, 3, 5, 8, 13, [   ]. Angka selanjutnya?`, 21]; },
                    () => { return [`Pola: 2, 6, 12, 20, 30, [   ]. Angka selanjutnya?`, 42]; },
                    () => { return [`Pola: 1, 4, 9, 16, 25, 36, [   ]. Angka selanjutnya?`, 49]; },
                ];
                break;
        }
    }

    return questions;
}

// ========== TIME MODE ==========
function generateTimeQuestions(grade, subMode) {
    const S = StoryMode;
    let questions = [];

    if (subMode === "Baca Jam") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`Jam menunjuk 08.00. Pukul berapa?`, "delapan pagi"]; },
                    () => { return [`Jam menunjuk 12.00. Pukul berapa?`, "dua belas siang"]; },
                    () => { return [`Jam menunjuk 03.00. Pukul berapa?`, "tiga sore"]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const jam = S.randInt(1, 11); return [`Jam menunjuk 0${jam < 10 ? '0' + jam : jam}.00. Pukul berapa?`, jam + " pagi"]; },
                    () => { const jam = S.randInt(1, 12); return [`Jam menunjuk ${jam < 10 ? '0' + jam : jam}.30. Pukul berapa?`, jam + ":30"]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const jam = S.randInt(8, 23); return [`Jam digital menunjuk ${jam < 10 ? '0' + jam : jam}.00. Pukul berapa (format 12 jam)?`, (jam > 12 ? jam - 12 : jam) + " " + (jam >= 12 ? "siang/malam" : "pagi")]; },
                    () => { const jam = S.randInt(8, 23); const menit = S.randInt(0, 5) * 15; return [`Jam digital menunjuk ${jam < 10 ? '0' + jam : jam}.${menit < 10 ? '0' + menit : menit}. Pukul berapa (format 12 jam)?`, (jam > 12 ? jam - 12 : jam) + ":" + (menit < 10 ? '0' + menit : menit)]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const jam = S.randInt(0, 23); return [`Jam digital menunjuk ${jam < 10 ? '0' + jam : jam}.00. Pukul berapa (format 12 jam)?`, (jam > 12 ? jam - 12 : (jam === 0 ? 12 : jam))]; },
                    () => { const jam = S.randInt(0, 23); const menit = S.randInt(0, 59); return [`Jam menunjuk ${jam < 10 ? '0' + jam : jam}.${menit < 10 ? '0' + menit : menit}. Berapa menit dari jam 12?`, jam * 60 + menit]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const jam = S.randInt(0, 23); return [`Jam ${jam < 10 ? '0' + jam : jam}.00 adalah pukul berapa sore/malam (format 12 jam)?`, (jam > 12 ? jam - 12 : (jam === 0 ? 12 : jam))]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const jam = S.randInt(0, 23); return [`${jam < 10 ? '0' + jam : jam}.00 pagi/malam adalah pukul berapa (12 jam)?`, (jam > 12 ? jam - 12 : (jam === 0 ? 12 : jam))]; },
                ];
                break;
        }
    }
    else if (subMode === "Tambah & Kurang Waktu") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`Sekarang pukul 08.00. 2 jam kemudian pukul berapa?`, 10]; },
                    () => { return [`Sekarang pukul 10.00. 3 jam yang lalu pukul berapa?`, 7]; },
                    () => { return [`Sekarang pukul 02.00. 4 jam kemudian pukul berapa?`, 6]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const jam = S.randInt(8, 12); const tambah = S.randInt(1, 4); return [`Sekarang pukul 0${jam}.00. Ditambah {{tambah}} jam jadi pukul berapa?`, jam + tambah]; },
                    () => { const jam = S.randInt(8, 12); const kurang = S.randInt(1, jam - 1); return [`Sekarang pukul 0${jam}.00. {{kurang}} jam yang lalu pukul berapa?`, jam - kurang]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const jam = S.randInt(8, 20); const tambah = S.randInt(1, 5); const hasil = jam + tambah > 24 ? jam + tambah - 24 : jam + tambah; return [`Sekarang pukul {{jam}}.00. Ditambah {{tambah}} jam jadi pukul berapa?`, hasil]; },
                    () => { const jam = S.randInt(8, 20); const kurang = S.randInt(1, jam); return [`Sekarang pukul {{jam}}.00. {{kurang}} jam yang lalu pukul berapa?`, jam - kurang]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const jam = S.randInt(1, 24); const menit = S.randInt(0, 59); const tambah = S.randInt(1, 240); const hasil_jam = (jam * 60 + menit + tambah) / 60; return [`Sekarang {{jam}}:{{menit < 10 ? '0' : ''}}{{menit}}. {{tambah}} menit kemudian jam berapa?`, Math.floor(hasil_jam % 24)]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const jam = S.randInt(1, 24); const menit = S.randInt(0, 59); const detik = S.randInt(0, 59); const tambah = S.randInt(60, 600); return [`Sekarang {{jam}}:{{menit < 10 ? '0' : ''}}{{menit}}:{{detik < 10 ? '0' : ''}}{{detik}}. {{tambah}} detik kemudian jam berapa?`, jam]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const jam = S.randInt(1, 24); const menit = S.randInt(0, 59); const tambah = S.randInt(1, 480); return [`Sekarang {{jam}}:{{menit < 10 ? '0' : ''}}{{menit}}. {{tambah}} menit kemudian jam berapa?`, Math.floor((jam * 60 + menit + tambah) / 60) % 24]; },
                ];
                break;
        }
    }
    else if (subMode === "Konversi Waktu") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`1 jam = berapa menit?`, 60]; },
                    () => { return [`2 jam = berapa menit?`, 120]; },
                    () => { return [`1 hari = berapa jam?`, 24]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const jam = S.randInt(1, 10); return [`{{jam}} jam = berapa menit?`, jam * 60]; },
                    () => { const hari = S.randInt(1, 7); return [`{{hari}} hari = berapa jam?`, hari * 24]; },
                    () => { return [`120 menit = berapa jam?`, 2]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const jam = S.randInt(1, 24); return [`{{jam}} jam = berapa menit?`, jam * 60]; },
                    () => { const hari = S.randInt(1, 30); return [`{{hari}} hari = berapa jam?`, hari * 24]; },
                    () => { const menit = S.randInt(1, 10) * 60; return [`{{menit}} menit = berapa jam?`, menit / 60]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const jam = S.randInt(1, 48); return [`{{jam}} jam = berapa menit?`, jam * 60]; },
                    () => { const minggu = S.randInt(1, 10); return [`{{minggu}} minggu = berapa hari?`, minggu * 7]; },
                    () => { const detik = S.randInt(1, 10) * 60; return [`{{detik}} detik = berapa menit?`, detik / 60]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const jam = S.randInt(1, 168); return [`{{jam}} jam = berapa hari?`, jam / 24]; },
                    () => { const minggu = S.randInt(1, 52); return [`{{minggu}} minggu = berapa hari?`, minggu * 7]; },
                    () => { const bulan = S.randInt(1, 12); return [`{{bulan}} bulan ≈ berapa hari?`, bulan * 30]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const hari = S.randInt(1, 365); return [`{{hari}} hari = berapa minggu?`, Math.floor(hari / 7)]; },
                    () => { const tahun = S.randInt(1, 10); return [`{{tahun}} tahun = berapa hari?`, tahun * 365]; },
                    () => { const jam = S.randInt(1, 8760); return [`{{jam}} jam = berapa hari?`, Math.round(jam / 24)]; },
                ];
                break;
        }
    }
    else if (subMode === "Selisih Waktu") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`Dari pukul 08.00 sampai 10.00 berapa jam?`, 2]; },
                    () => { return [`Dari pukul 09.00 sampai 12.00 berapa jam?`, 3]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const jam1 = S.randInt(8, 15); const jam2 = S.randInt(jam1 + 1, 20); return [`Dari pukul 0{{jam1}}.00 sampai 0{{jam2}}.00 berapa jam?`, jam2 - jam1]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const jam1 = S.randInt(8, 15); const jam2 = S.randInt(jam1 + 1, 20); return [`Dari jam {{jam1}} sampai jam {{jam2}} berapa jam?`, jam2 - jam1]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const jam1 = S.randInt(0, 20); const jam2 = S.randInt(jam1 + 1, 24); return [`Dari jam {{jam1}} sampai jam {{jam2}} berapa jam?`, jam2 - jam1]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const hari1 = S.randInt(1, 25); const hari2 = S.randInt(hari1 + 1, 31); return [`Dari tanggal {{hari1}} sampai {{hari2}} berapa hari?`, hari2 - hari1]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const bulan1 = S.randInt(1, 11); const bulan2 = S.randInt(bulan1 + 1, 12); return [`Dari bulan {{bulan1}} sampai bulan {{bulan2}} berapa bulan?`, bulan2 - bulan1]; },
                ];
                break;
        }
    }

    return questions;
}

// ========== HEAVY MODE (MASS/WEIGHT) ==========
function generateHeavyQuestions(grade, subMode) {
    const S = StoryMode;
    let questions = [];

    if (subMode === "Konversi Berat") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`1 kg = berapa ons?`, 10]; },
                    () => { return [`2 kg = berapa ons?`, 20]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const kg = S.randInt(1, 10); return [`{{kg}} kg = berapa ons?`, kg * 10]; },
                    () => { const ons = S.randInt(10, 100); return [`{{ons}} ons = berapa kg?`, ons / 10]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const kg = S.randInt(1, 100); return [`{{kg}} kg = berapa gram?`, kg * 1000]; },
                    () => { const gram = S.randInt(1000, 100000); return [`{{gram}} gram = berapa kg?`, gram / 1000]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const ton = S.randInt(1, 10); return [`{{ton}} ton = berapa kg?`, ton * 1000]; },
                    () => { const kg = S.randInt(1000, 100000); return [`{{kg}} kg = berapa ton?`, kg / 1000]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const ton = S.randInt(1, 100); return [`{{ton}} ton = berapa kg?`, ton * 1000]; },
                    () => { const kg = S.randInt(1000, 1000000); return [`{{kg}} kg = berapa ton?`, kg / 1000]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const ton = S.randInt(1, 1000); return [`{{ton}} ton = berapa kg?`, ton * 1000]; },
                    () => { const kg = S.randInt(1000, 10000000); return [`{{kg}} kg = berapa ton?`, kg / 1000]; },
                ];
                break;
        }
    }
    else if (subMode === "Tambah & Kurang Berat") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`Berat A 3 kg. Berat B 2 kg. Total berapa kg?`, 5]; },
                    () => { return [`Berat tas 5 kg. Diisi barang 2 kg. Total berapa kg?`, 7]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(5, 20); const b = S.randInt(5, 20); return [`Berat tas A {{a}} kg. Tas B {{b}} kg. Total berapa kg?`, a + b]; },
                    () => { const a = S.randInt(10, 50); const b = S.randInt(5, a); return [`Berat {{a}} kg. Dikurangi {{b}} kg. Sisa berapa kg?`, a - b]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const a = S.randInt(20, 100); const b = S.randInt(20, 100); return [`Berat A {{a}} kg. Berat B {{b}} kg. Total berapa kg?`, a + b]; },
                    () => { const a = S.randInt(100, 500); const b = S.randInt(50, a); return [`Berat {{a}} kg. Diambil {{b}} kg. Sisa berapa kg?`, a - b]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const a = S.randInt(100, 1000); const b = S.randInt(100, 1000); return [`Berat {{a}} kg. Tambah {{b}} kg. Total berapa kg?`, a + b]; },
                    () => { const a = S.randInt(500, 5000); const b = S.randInt(100, a); return [`Berat {{a}} kg. Kurangi {{b}} kg. Sisa berapa kg?`, a - b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(1000, 10000); const b = S.randInt(1000, 10000); return [`Berat {{a}} kg. Tambah {{b}} kg. Total berapa kg?`, a + b]; },
                    () => { const a = S.randInt(5000, 50000); const b = S.randInt(1000, a); return [`Berat {{a}} kg. Kurangi {{b}} kg. Sisa berapa kg?`, a - b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(10000, 100000); const b = S.randInt(10000, 100000); return [`Berat {{a}} kg. Tambah {{b}} kg. Total berapa kg?`, a + b]; },
                ];
                break;
        }
    }
    else if (subMode === "Bandingkan Berat") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`Berat A 5 kg. Berat B 3 kg. A lebih berat berapa kg?`, 2]; },
                    () => { return [`Berat tas 4 kg. Berat buku 2 kg. Tas lebih berat berapa kg?`, 2]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(10, 30); const b = S.randInt(5, a); return [`Berat A {{a}} kg. Berat B {{b}} kg. Selisih berapa kg?`, a - b]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const a = S.randInt(50, 200); const b = S.randInt(20, a); return [`Berat A {{a}} kg. Berat B {{b}} kg. A lebih berat berapa kg?`, a - b]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const a = S.randInt(500, 2000); const b = S.randInt(200, a); return [`Berat A {{a}} kg. Berat B {{b}} kg. Selisih berapa kg?`, a - b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(5000, 20000); const b = S.randInt(2000, a); return [`Berat A {{a}} kg. Berat B {{b}} kg. Selisih berapa kg?`, a - b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(50000, 200000); const b = S.randInt(20000, a); return [`Berat A {{a}} kg. Berat B {{b}} kg. Selisih berapa kg?`, a - b]; },
                ];
                break;
        }
    }
    else if (subMode === "Selisih Berat") {
        switch(grade) {
            case 1:
                questions = [
                    () => { const a = S.randInt(3, 9); const b = S.randInt(1, a); return [`Berat {{a}} kg. Berat {{b}} kg. Selisih berapa?`, a - b]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(10, 30); const b = S.randInt(5, a); return [`Berat {{a}} kg. Berat {{b}} kg. Selisih berapa kg?`, a - b]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const a = S.randInt(50, 200); const b = S.randInt(20, a); return [`Berat {{a}} kg dan {{b}} kg. Selisihnya berapa kg?`, a - b]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const a = S.randInt(500, 2000); const b = S.randInt(200, a); return [`Berat {{a}} kg dan {{b}} kg. Selisihnya berapa kg?`, a - b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(5000, 20000); const b = S.randInt(2000, a); return [`Berat {{a}} kg dan {{b}} kg. Selisihnya berapa kg?`, a - b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(50000, 200000); const b = S.randInt(20000, a); return [`Berat {{a}} kg dan {{b}} kg. Selisihnya berapa kg?`, a - b]; },
                ];
                break;
        }
    }

    return questions;
}

// ========== VOLUME MODE ==========
function generateVolumeQuestions(grade, subMode) {
    const S = StoryMode;
    let questions = [];

    if (subMode === "Konversi Volume") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`1 liter = berapa mililiter?`, 1000]; },
                    () => { return [`2 liter = berapa mililiter?`, 2000]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const liter = S.randInt(1, 10); return [`{{liter}} liter = berapa mililiter?`, liter * 1000]; },
                    () => { const ml = S.randInt(1000, 10000); return [`{{ml}} mililiter = berapa liter?`, ml / 1000]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const liter = S.randInt(1, 100); return [`{{liter}} liter = berapa mililiter?`, liter * 1000]; },
                    () => { const ml = S.randInt(1000, 100000); return [`{{ml}} mililiter = berapa liter?`, ml / 1000]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const liter = S.randInt(1, 1000); return [`{{liter}} liter = berapa mililiter?`, liter * 1000]; },
                    () => { const ml = S.randInt(1000, 1000000); return [`{{ml}} mililiter = berapa liter?`, ml / 1000]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const m3 = S.randInt(1, 100); return [`{{m3}} m³ = berapa liter?`, m3 * 1000]; },
                    () => { const liter = S.randInt(1000, 100000); return [`{{liter}} liter = berapa m³?`, liter / 1000]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const m3 = S.randInt(1, 1000); return [`{{m3}} m³ = berapa liter?`, m3 * 1000]; },
                    () => { const liter = S.randInt(1000, 1000000); return [`{{liter}} liter = berapa m³?`, liter / 1000]; },
                ];
                break;
        }
    }
    else if (subMode === "Tambah & Kurang Volume") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`Ember A punya 5 liter air. Ember B punya 3 liter. Total berapa liter?`, 8]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(5, 20); const b = S.randInt(5, 20); return [`Wadah A {{a}} liter. Wadah B {{b}} liter. Total berapa liter?`, a + b]; },
                    () => { const a = S.randInt(10, 50); const b = S.randInt(5, a); return [`Air {{a}} liter. Diambil {{b}} liter. Sisa berapa liter?`, a - b]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const a = S.randInt(20, 100); const b = S.randInt(20, 100); return [`Tangki A {{a}} liter. Tangki B {{b}} liter. Total berapa liter?`, a + b]; },
                    () => { const a = S.randInt(100, 500); const b = S.randInt(50, a); return [`Bejana punya {{a}} liter. Dipindah {{b}} liter. Sisa berapa liter?`, a - b]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const a = S.randInt(100, 1000); const b = S.randInt(100, 1000); return [`Kolam A {{a}} liter. Kolam B {{b}} liter. Total berapa liter?`, a + b]; },
                    () => { const a = S.randInt(500, 5000); const b = S.randInt(100, a); return [`Air {{a}} liter. Dikurangi {{b}} liter. Sisa berapa liter?`, a - b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(1000, 10000); const b = S.randInt(1000, 10000); return [`Tangki A {{a}} liter. Tangki B {{b}} liter. Total berapa liter?`, a + b]; },
                    () => { const a = S.randInt(5000, 50000); const b = S.randInt(1000, a); return [`Volume {{a}} liter. Dikurangi {{b}} liter. Sisa berapa liter?`, a - b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(10000, 100000); const b = S.randInt(10000, 100000); return [`Kolam A {{a}} liter. Kolam B {{b}} liter. Total berapa liter?`, a + b]; },
                ];
                break;
        }
    }
    else if (subMode === "Bandingkan Volume") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`Gelas A punya 5 liter. Gelas B punya 2 liter. A lebih banyak berapa liter?`, 3]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(10, 30); const b = S.randInt(5, a); return [`Wadah A {{a}} liter. Wadah B {{b}} liter. Selisih berapa liter?`, a - b]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const a = S.randInt(50, 200); const b = S.randInt(20, a); return [`Tangki A {{a}} liter. Tangki B {{b}} liter. Selisih berapa liter?`, a - b]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const a = S.randInt(500, 2000); const b = S.randInt(200, a); return [`Kolam A {{a}} liter. Kolam B {{b}} liter. Selisih berapa liter?`, a - b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(5000, 20000); const b = S.randInt(2000, a); return [`Volume A {{a}} liter. Volume B {{b}} liter. Selisih berapa liter?`, a - b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(50000, 200000); const b = S.randInt(20000, a); return [`Kolam A {{a}} liter. Kolam B {{b}} liter. Selisih berapa liter?`, a - b]; },
                ];
                break;
        }
    }
    else if (subMode === "Selisih Volume") {
        switch(grade) {
            case 1:
                questions = [
                    () => { const a = S.randInt(3, 9); const b = S.randInt(1, a); return [`Volume {{a}} liter dan {{b}} liter. Selisih berapa?`, a - b]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(10, 30); const b = S.randInt(5, a); return [`Volume {{a}} liter dan {{b}} liter. Selisihnya berapa liter?`, a - b]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const a = S.randInt(50, 200); const b = S.randInt(20, a); return [`Volume {{a}} liter dan {{b}} liter. Selisihnya berapa liter?`, a - b]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const a = S.randInt(500, 2000); const b = S.randInt(200, a); return [`Volume {{a}} liter dan {{b}} liter. Selisihnya berapa liter?`, a - b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(5000, 20000); const b = S.randInt(2000, a); return [`Volume {{a}} liter dan {{b}} liter. Selisihnya berapa liter?`, a - b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(50000, 200000); const b = S.randInt(20000, a); return [`Volume {{a}} liter dan {{b}} liter. Selisihnya berapa liter?`, a - b]; },
                ];
                break;
        }
    }

    return questions;
}

// ========== UP MODE (GEOMETRY) ==========
function generateUpQuestions(grade, subMode) {
    const S = StoryMode;
    let questions = [];

    if (subMode === "Keliling Bangun Datar") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`Persegi sisi 4 cm. Keliling berapa cm?`, 16]; },
                    () => { return [`Persegi panjang panjang 6 cm, lebar 4 cm. Keliling berapa cm?`, 20]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const s = S.randInt(5, 20); return [`Persegi sisi {{s}} cm. Keliling berapa cm?`, s * 4]; },
                    () => { const p = S.randInt(8, 20); const l = S.randInt(5, p); return [`Persegi panjang panjang {{p}} cm, lebar {{l}} cm. Keliling berapa cm?`, (p + l) * 2]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const s = S.randInt(10, 50); return [`Persegi sisi {{s}} cm. Keliling berapa cm?`, s * 4]; },
                    () => { const p = S.randInt(20, 60); const l = S.randInt(10, p); return [`Persegi panjang {{p}} cm × {{l}} cm. Keliling berapa cm?`, (p + l) * 2]; },
                    () => { const s1 = S.randInt(5, 15); const s2 = S.randInt(5, 15); const s3 = S.randInt(5, 15); return [`Segitiga sisi {{s1}} cm, {{s2}} cm, {{s3}} cm. Keliling berapa cm?`, s1 + s2 + s3]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const s = S.randInt(20, 100); return [`Persegi sisi {{s}} cm. Keliling berapa cm?`, s * 4]; },
                    () => { const p = S.randInt(50, 150); const l = S.randInt(20, p); return [`Persegi panjang {{p}} cm × {{l}} cm. Keliling berapa cm?`, (p + l) * 2]; },
                    () => { const r = S.randInt(5, 20); return [`Lingkaran jari-jari {{r}} cm. Keliling berapa cm? (π=3.14)`, Math.round(2 * 3.14 * r)]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const s = S.randInt(100, 500); return [`Persegi sisi {{s}} cm. Keliling berapa cm?`, s * 4]; },
                    () => { const p = S.randInt(200, 500); const l = S.randInt(100, p); return [`Persegi panjang {{p}} cm × {{l}} cm. Keliling berapa cm?`, (p + l) * 2]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const s = S.randInt(500, 1000); return [`Persegi sisi {{s}} cm. Keliling berapa cm?`, s * 4]; },
                    () => { const r = S.randInt(100, 500); return [`Lingkaran jari-jari {{r}} cm. Keliling berapa cm? (π=3.14)`, Math.round(2 * 3.14 * r)]; },
                ];
                break;
        }
    }
    else if (subMode === "Volume Bangun Ruang") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`Kubus sisi 2 cm. Volume berapa cm³?`, 8]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const s = S.randInt(2, 10); return [`Kubus sisi {{s}} cm. Volume berapa cm³?`, s * s * s]; },
                    () => { const p = S.randInt(5, 15); const l = S.randInt(3, 12); const t = S.randInt(2, 10); return [`Balok {{p}} × {{l}} × {{t}} cm. Volume berapa cm³?`, p * l * t]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const s = S.randInt(5, 20); return [`Kubus sisi {{s}} cm. Volume berapa cm³?`, s * s * s]; },
                    () => { const p = S.randInt(10, 30); const l = S.randInt(8, 25); const t = S.randInt(5, 20); return [`Balok {{p}} × {{l}} × {{t}} cm. Volume berapa cm³?`, p * l * t]; },
                    () => { const r = S.randInt(5, 15); const t = S.randInt(10, 30); return [`Silinder jari-jari {{r}} cm, tinggi {{t}} cm. Volume berapa cm³? (π=3.14)`, Math.round(3.14 * r * r * t)]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const s = S.randInt(10, 50); return [`Kubus sisi {{s}} cm. Volume berapa cm³?`, s * s * s]; },
                    () => { const p = S.randInt(30, 100); const l = S.randInt(20, 80); const t = S.randInt(15, 60); return [`Balok {{p}} × {{l}} × {{t}} cm. Volume berapa cm³?`, p * l * t]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const s = S.randInt(50, 200); return [`Kubus sisi {{s}} cm. Volume berapa cm³?`, s * s * s]; },
                    () => { const p = S.randInt(100, 500); const l = S.randInt(50, 400); const t = S.randInt(30, 300); return [`Balok {{p}} × {{l}} × {{t}} cm. Volume berapa cm³?`, p * l * t]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const s = S.randInt(100, 500); return [`Kubus sisi {{s}} cm. Volume berapa cm³?`, s * s * s]; },
                    () => { const r = S.randInt(50, 200); const t = S.randInt(100, 400); return [`Silinder jari-jari {{r}} cm, tinggi {{t}} cm. Volume berapa cm³? (π=3.14)`, Math.round(3.14 * r * r * t)]; },
                ];
                break;
        }
    }
    else if (subMode === "Luas Permukaan Bangun Ruang") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`Kubus sisi 2 cm. Luas permukaan berapa cm²?`, 24]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const s = S.randInt(2, 10); return [`Kubus sisi {{s}} cm. Luas permukaan berapa cm²?`, s * s * 6]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const s = S.randInt(5, 20); return [`Kubus sisi {{s}} cm. Luas permukaan berapa cm²?`, s * s * 6]; },
                    () => { const p = S.randInt(10, 30); const l = S.randInt(8, 25); const t = S.randInt(5, 20); return [`Balok {{p}} × {{l}} × {{t}} cm. Luas permukaan berapa cm²?`, 2 * (p * l + p * t + l * t)]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const s = S.randInt(10, 50); return [`Kubus sisi {{s}} cm. Luas permukaan berapa cm²?`, s * s * 6]; },
                    () => { const p = S.randInt(30, 100); const l = S.randInt(20, 80); const t = S.randInt(15, 60); return [`Balok {{p}} × {{l}} × {{t}} cm. Luas permukaan berapa cm²?`, 2 * (p * l + p * t + l * t)]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const s = S.randInt(50, 200); return [`Kubus sisi {{s}} cm. Luas permukaan berapa cm²?`, s * s * 6]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const s = S.randInt(100, 500); return [`Kubus sisi {{s}} cm. Luas permukaan berapa cm²?`, s * s * 6]; },
                    () => { const r = S.randInt(50, 200); const t = S.randInt(100, 400); return [`Silinder jari-jari {{r}} cm, tinggi {{t}} cm. Luas permukaan berapa cm²? (π=3.14)`, Math.round(2 * 3.14 * r * (r + t))]; },
                ];
                break;
        }
    }
    else if (subMode === "Perbandingan Bangun") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`Persegi A sisi 2 cm. Persegi B sisi 4 cm. Luas B berapa kali luas A?`, 4]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const s1 = S.randInt(2, 10); const s2 = s1 * 2; return [`Persegi A sisi {{s1}} cm. Persegi B sisi {{s2}} cm. Luas B berapa kali luas A?`, 4]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const s1 = S.randInt(5, 20); const s2 = s1 * 3; return [`Persegi A sisi {{s1}} cm. Persegi B sisi {{s2}} cm. Luas B berapa kali luas A?`, 9]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const s1 = S.randInt(10, 50); const s2 = s1 * 2; return [`Kubus A sisi {{s1}} cm. Kubus B sisi {{s2}} cm. Volume B berapa kali volume A?`, 8]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const s1 = S.randInt(50, 200); const s2 = s1 * 3; return [`Kubus A sisi {{s1}} cm. Kubus B sisi {{s2}} cm. Volume B berapa kali volume A?`, 27]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const s1 = S.randInt(100, 500); const s2 = s1 * 2; return [`Kubus A sisi {{s1}} cm. Kubus B sisi {{s2}} cm. Volume B berapa kali volume A?`, 8]; },
                ];
                break;
        }
    }
    else if (subMode === "Perkiraan Volume") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`Balok panjang 5 cm, lebar 4 cm, tinggi 3 cm. Volume kira-kira berapa cm³?`, 60]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const p = S.randInt(5, 20); const l = S.randInt(3, 15); const t = S.randInt(2, 10); return [`Balok {{p}} × {{l}} × {{t}} cm. Volume kira-kira berapa cm³?`, p * l * t]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const p = S.randInt(10, 30); const l = S.randInt(8, 25); const t = S.randInt(5, 20); return [`Balok {{p}} × {{l}} × {{t}} cm. Volume kira-kira berapa cm³?`, p * l * t]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const p = S.randInt(30, 100); const l = S.randInt(20, 80); const t = S.randInt(15, 60); return [`Balok {{p}} × {{l}} × {{t}} cm. Volume kira-kira berapa cm³?`, p * l * t]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const p = S.randInt(100, 500); const l = S.randInt(50, 400); const t = S.randInt(30, 300); return [`Balok {{p}} × {{l}} × {{t}} cm. Volume kira-kira berapa cm³?`, p * l * t]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const p = S.randInt(500, 1000); const l = S.randInt(300, 800); const t = S.randInt(200, 600); return [`Balok {{p}} × {{l}} × {{t}} cm. Volume kira-kira berapa cm³?`, p * l * t]; },
                ];
                break;
        }
    }
    else if (subMode === "Bangun Campuran") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`Persegi panjang panjang 6 cm, lebar 4 cm. Persegi sisi 2 cm. Total luas berapa cm²?`, 28]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const p = S.randInt(8, 20); const l = S.randInt(5, 15); const s = S.randInt(3, 10); return [`Persegi panjang {{p}} × {{l}} cm. Persegi sisi {{s}} cm. Total luas berapa cm²?`, p * l + s * s]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const p = S.randInt(20, 60); const l = S.randInt(10, 50); const s = S.randInt(10, 30); return [`Persegi panjang {{p}} × {{l}} cm. Persegi sisi {{s}} cm. Total luas berapa cm²?`, p * l + s * s]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const p = S.randInt(50, 150); const l = S.randInt(20, 100); const s = S.randInt(20, 80); return [`Persegi panjang {{p}} × {{l}} cm. Persegi sisi {{s}} cm. Total luas berapa cm²?`, p * l + s * s]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const p = S.randInt(200, 500); const l = S.randInt(100, 400); const s = S.randInt(100, 300); return [`Persegi panjang {{p}} × {{l}} cm. Persegi sisi {{s}} cm. Total luas berapa cm²?`, p * l + s * s]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const p = S.randInt(500, 1000); const l = S.randInt(300, 800); const s = S.randInt(200, 600); return [`Persegi panjang {{p}} × {{l}} cm. Persegi sisi {{s}} cm. Total luas berapa cm²?`, p * l + s * s]; },
                ];
                break;
        }
    }
    else if (subMode === "Hubungan Luas dan Volume") {
        switch(grade) {
            case 1:
                questions = [
                    () => { return [`Jika panjang kubus bertambah 2× maka volume menjadi berapa kali?`, 8]; },
                ];
                break;
            case 2:
                questions = [
                    () => { return [`Jika sisi kubus 2× lipat maka luas permukaan menjadi berapa kali?`, 4]; },
                    () => { return [`Jika sisi kubus 2× lipat maka volume menjadi berapa kali?`, 8]; },
                ];
                break;
            case 3:
                questions = [
                    () => { return [`Jika sisi kubus 3× lipat maka luas permukaan menjadi berapa kali?`, 9]; },
                    () => { return [`Jika sisi kubus 3× lipat maka volume menjadi berapa kali?`, 27]; },
                ];
                break;
            case 4:
                questions = [
                    () => { return [`Jika panjang balok 2×, lebar 2×, tinggi 2× maka volume menjadi berapa kali?`, 8]; },
                    () => { return [`Jika luas alas 4× lebih besar dan tinggi sama, volume menjadi berapa kali?`, 4]; },
                ];
                break;
            case 5:
                questions = [
                    () => { return [`Jika jari-jari silinder 2× maka luas permukaan menjadi berapa kali?`, 4]; },
                    () => { return [`Jika jari-jari silinder 2× dan tinggi sama, volume menjadi berapa kali?`, 4]; },
                ];
                break;
            case 6:
                questions = [
                    () => { return [`Jika semua dimensi 3× maka luas permukaan menjadi berapa kali?`, 9]; },
                    () => { return [`Jika semua dimensi 3× maka volume menjadi berapa kali?`, 27]; },
                ];
                break;
        }
    }

    return questions;
}

// ========== MAIN DISPATCHER ==========
function getOperatorQuestion(grade, subMode) {
    const questions = generateOperatorQuestions(grade, subMode);
    if (questions.length === 0) return null;
    const questionFunc = questions[Math.floor(Math.random() * questions.length)];
    return questionFunc();
}

function getAljabarQuestion(grade, subMode) {
    const questions = generateAljabarQuestions(grade, subMode);
    if (questions.length === 0) return null;
    const questionFunc = questions[Math.floor(Math.random() * questions.length)];
    return questionFunc();
}

function getTimeQuestion(grade, subMode) {
    const questions = generateTimeQuestions(grade, subMode);
    if (questions.length === 0) return null;
    const questionFunc = questions[Math.floor(Math.random() * questions.length)];
    return questionFunc();
}

function getHeavyQuestion(grade, subMode) {
    const questions = generateHeavyQuestions(grade, subMode);
    if (questions.length === 0) return null;
    const questionFunc = questions[Math.floor(Math.random() * questions.length)];
    return questionFunc();
}

function getVolumeQuestion(grade, subMode) {
    const questions = generateVolumeQuestions(grade, subMode);
    if (questions.length === 0) return null;
    const questionFunc = questions[Math.floor(Math.random() * questions.length)];
    return questionFunc();
}

function getUpQuestion(grade, subMode) {
    const questions = generateUpQuestions(grade, subMode);
    if (questions.length === 0) return null;
    const questionFunc = questions[Math.floor(Math.random() * questions.length)];
    return questionFunc();
}
