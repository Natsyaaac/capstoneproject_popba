/**
 * @fileOverview Story Mode Question Generator - Soal Cerita untuk SD Kelas 1-6
 * @description Bank soal cerita profesional untuk game Balloon Pop Maths
 * @version 3.0.0
 * 
 * Tingkat Kesulitan:
 * - Easy: Kelas 1-3 SD (bilangan kecil, operasi sederhana)
 * - Medium: Kelas 4-5 SD (bilangan lebih besar, operasi campuran)
 * - Hard: Kelas 6 SD (bilangan besar, operasi kompleks, persentase, pecahan)
 * 
 * Mode yang didukung:
 * - operator (Operasi Hitung) dengan sub-mode: Kurang, Tambah, Bagi, Kali
 * - aljabar (Aljabar) dengan sub-mode: Isi Kotak Kosong, Nilai Variabel, Persamaan Sederhana, Pola Bilangan
 * - time (Waktu) dengan sub-mode: Baca Jam, Tambah & Kurang Waktu, Konversi Waktu, Selisih Waktu
 * - heavy (Massa/Berat) dengan sub-mode: Konversi Berat, Tambah & Kurang Berat, Bandingkan Berat, Selisih Berat
 * - volume (Volume) dengan sub-mode: Volume, Tambah Volume, Selisih Volume, Perkiraan Volume
 * - up (Bangunan/Geometri) dengan sub-mode yang sesuai
 */
/*jshint esversion: 6 */

const StoryMode = {
    names: {
        boys: ["Budi", "Andi", "Riko", "Deni", "Fajar", "Hasan", "Gilang", "Rizki", "Tono", "Wahyu",
            "Bagus", "Dimas", "Eko", "Faisal", "Galih", "Irfan", "Joko", "Kevin", "Lukman", "Mahmud",
            "Naufal", "Omar", "Putra", "Qori", "Raka", "Satria", "Taufik", "Umar", "Vino", "Wawan"],
        girls: ["Ani", "Siti", "Dewi", "Rani", "Putri", "Maya", "Lina", "Nisa", "Tika", "Wulan",
            "Bunga", "Citra", "Dina", "Eka", "Fitri", "Gita", "Hana", "Indah", "Julia", "Kartika",
            "Laras", "Mila", "Nadya", "Ola", "Puspita", "Qisya", "Ratna", "Sarah", "Tiara", "Umi"],
        teachers: ["Bu Guru", "Pak Guru", "Bu Ani", "Pak Budi", "Bu Sari", "Pak Hendra", "Bu Ratna", "Pak Ahmad"],
        families: ["Ayah", "Ibu", "Kakak", "Adik", "Nenek", "Kakek", "Paman", "Bibi", "Sepupu"]
    },

    items: {
        fruits: ["apel", "jeruk", "mangga", "pisang", "anggur", "semangka", "melon", "strawberry", "pepaya", "rambutan", "durian", "salak", "jambu", "nanas", "kelapa"],
        snacks: ["kue", "roti", "permen", "coklat", "biskuit", "donat", "puding", "es krim", "keripik", "wafer", "martabak", "bakpao", "onde-onde", "lapis legit"],
        stationery: ["pensil", "pulpen", "buku tulis", "penghapus", "penggaris", "crayon", "spidol", "rautan", "gunting", "lem", "kertas", "map", "stabilo", "jangka"],
        toys: ["boneka", "mobil-mobilan", "robot", "bola", "puzzle", "lego", "kelereng", "yoyo", "layangan", "kartu", "pesawat-pesawatan", "teddy bear"],
        animals: ["kucing", "kelinci", "hamster", "ikan", "burung", "ayam", "bebek", "kambing", "sapi", "kuda", "domba", "anjing"],
        flowers: ["mawar", "melati", "anggrek", "tulip", "bunga matahari", "kamboja", "dahlia", "krisan", "lavender", "lily"],
        vegetables: ["wortel", "bayam", "kangkung", "tomat", "terong", "kentang", "buncis", "kacang panjang", "cabai"],
        school: ["meja", "kursi", "papan tulis", "tas", "sepatu", "seragam", "topi", "dasi"]
    },

    places: {
        school: ["kelas", "perpustakaan", "kantin", "lapangan", "taman sekolah", "ruang guru", "aula", "laboratorium", "UKS"],
        home: ["rumah", "dapur", "taman", "kamar", "ruang tamu", "garasi", "halaman", "gudang", "kamar mandi"],
        public: ["pasar", "toko", "supermarket", "taman kota", "kebun binatang", "museum", "kolam renang", "perpustakaan kota", "mall", "bioskop"],
        nature: ["sawah", "kebun", "hutan", "sungai", "pantai", "gunung", "danau", "taman bunga", "ladang"]
    },

    rand: function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    randInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    randName: function () {
        const allNames = [...this.names.boys, ...this.names.girls];
        return this.rand(allNames);
    },

    randBoyName: function () {
        return this.rand(this.names.boys);
    },

    randGirlName: function () {
        return this.rand(this.names.girls);
    },

    randItem: function () {
        const allItems = [...this.items.fruits, ...this.items.snacks, ...this.items.stationery];
        return this.rand(allItems);
    },

    randFruit: function () {
        return this.rand(this.items.fruits);
    },

    randSnack: function () {
        return this.rand(this.items.snacks);
    },

    randToy: function () {
        return this.rand(this.items.toys);
    },

    randAnimal: function () {
        return this.rand(this.items.animals);
    },

    randPlace: function () {
        const allPlaces = [...this.places.school, ...this.places.public];
        return this.rand(allPlaces);
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

function generateOperatorQuestions(grade, subMode) {
    const S = StoryMode;
    let questions = [];

    if (subMode === "Kurang" || subMode === "pengurangan") {
        switch (grade) {
            case 1:
                questions = [
                    () => {
                        const a = S.randInt(4, 9); const b = S.randInt(1, a - 1);
                        return [`${S.randName()} membawa ${a} ${S.randFruit()} ke sekolah. Dimakan ${b}. Sisa berapa?`, a - b];
                    },

                    () => {
                        const a = S.randInt(6, 10); const b = S.randInt(1, a - 2);
                        return [`Di piring ada ${a} ${S.randSnack()}. ${b} dimakan. Tinggal berapa?`, a - b];
                    },

                    () => {
                        const a = S.randInt(5, 8); const b = S.randInt(1, a - 1);
                        return [`${S.randName()} mengoleksi ${a} ${S.randToy()}. ${b} rusak. Sisa berapa?`, a - b];
                    },

                    () => {
                        const a = S.randInt(7, 10); const b = S.randInt(2, a - 1);
                        return [`Ada ${a} ${S.randFruit()} di tas. Dibagikan ${b}. Berapa yang tersisa?`, a - b];
                    },

                    () => {
                        const a = S.randInt(5, 9); const b = S.randInt(1, a - 2);
                        return [`${S.randName()} memiliki ${a} buku tulis. Hilang ${b}. Sekarang ada berapa?`, a - b];
                    },

                    () => {
                        const a = S.randInt(6, 10); const b = S.randInt(1, 4);
                        return [`Ada ${a} kucing di halaman. ${b} pergi. Sisa kucing berapa?`, a - b];
                    },

                    () => {
                        const a = S.randInt(5, 9); const b = S.randInt(1, 3);
                        return [`${S.randName()} menyimpan ${a} permen. Diberikan ${b} ke teman. Sisa berapa?`, a - b];
                    },

                    () => {
                        const a = S.randInt(8, 10); const b = S.randInt(2, 5);
                        return [`Di kolam ada ${a} ikan. ${b} ikan diambil. Tinggal berapa?`, a - b];
                    },

                    () => {
                        const a = S.randInt(4, 8); const b = S.randInt(1, a - 1);
                        return [`${S.randName()} punya ${a} pensil warna. ${b} patah. Sisa berapa?`, a - b];
                    },

                    () => {
                        const a = S.randInt(6, 10); const b = S.randInt(1, a - 1);
                        return [`Ada ${a} balon. ${b} balon pecah. Berapa balon yang masih ada?`, a - b];
                    },
                    () => { const a = S.randInt(3, 9); const b = S.randInt(1, a - 1); return [`${S.randName()} punya ${a} ${S.randFruit()}. Dimakan ${b}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(5, 10); const b = S.randInt(1, a - 2); return [`Ada ${a} ${S.randSnack()} di meja. Diambil ${b}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(4, 8); const b = S.randInt(1, a - 1); return [`${S.randName()} mempunyai ${a} ${S.randToy()}. Diberikan ke teman ${b}. Berapa yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(6, 10); const b = S.randInt(2, a - 1); return [`Di keranjang ada ${a} ${S.randFruit()}. ${S.rand(S.names.families)} mengambil ${b}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(5, 9); const b = S.randInt(1, a - 2); return [`${S.randName()} punya ${a} ${S.rand(S.items.stationery)}. Hilang ${b}. Sekarang punya berapa?`, a - b]; },
                    () => { const a = S.randInt(7, 10); const b = S.randInt(2, 4); return [`Ada ${a} burung di pohon. ${b} burung terbang. Berapa burung yang masih di pohon?`, a - b]; },
                    () => { const a = S.randInt(5, 9); const b = S.randInt(1, 3); return [`${S.randName()} memiliki ${a} kelereng. Diberikan ${b} ke adik. Sisa kelereng berapa?`, a - b]; },
                    () => { const a = S.randInt(8, 10); const b = S.randInt(2, 5); return [`Di akuarium ada ${a} ikan. ${b} ikan dipindahkan. Berapa ikan yang tersisa?`, a - b]; },

                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(10, 20); const b = S.randInt(3, a - 3); return [`${S.randName()} membeli ${a} ${S.randSnack()}. Dimakan ${b}. Berapa sisanya?`, a - b]; },
                    () => { const a = S.randInt(15, 25); const b = S.randInt(5, a - 5); return [`Di kelas ada ${a} siswa. ${b} siswa pulang. Berapa siswa yang masih di kelas?`, a - b]; },
                    () => { const a = S.randInt(12, 20); const b = S.randInt(4, a - 3); return [`${S.randName()} punya ${a} ${S.rand(S.items.stationery)}. Dipinjamkan ${b}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(20, 30); const b = S.randInt(8, a - 5); return [`Perpustakaan punya ${a} buku. Dipinjam ${b} buku. Sisa buku di perpustakaan berapa?`, a - b]; },
                    () => { const a = S.randInt(15, 25); const b = S.randInt(5, 10); return [`Di taman ada ${a} ${S.randAnimal()}. ${b} pergi. Berapa yang masih ada?`, a - b]; },
                    () => { const a = S.randInt(18, 28); const b = S.randInt(6, 12); return [`${S.randName()} mengumpulkan ${a} ${S.randFruit()}. Dijual ${b}. Berapa yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(25, 35); const b = S.randInt(10, 15); return [`Sekolah memiliki ${a} komputer. ${b} komputer rusak. Berapa komputer yang bisa dipakai?`, a - b]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const a = S.randInt(50, 100); const b = S.randInt(15, a - 20); return [`${S.randName()} mempunyai Rp${a}.000. Dibelikan buku Rp${b}.000. Sisa uang berapa ribu rupiah?`, a - b]; },
                    () => { const a = S.randInt(100, 200); const b = S.randInt(30, a - 30); return [`Toko punya ${a} ${S.randSnack()}. Terjual ${b}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(80, 150); const b = S.randInt(25, a - 20); return [`Di peternakan ada ${a} ayam. Dijual ${b} ekor. Berapa ayam yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(150, 250); const b = S.randInt(50, a - 40); return [`Pabrik memproduksi ${a} roti. ${b} roti terjual. Berapa roti yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(200, 300); const b = S.randInt(80, 120); return [`Sekolah mempunyai ${a} buku. Dipinjamkan ${b} buku ke siswa. Sisa buku berapa?`, a - b]; },
                    () => { const a = S.randInt(75, 125); const b = S.randInt(20, 40); return [`${S.randName()} mengumpulkan ${a} stiker. Diberikan ${b} ke teman. Berapa stiker yang dimiliki sekarang?`, a - b]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const a = S.randInt(500, 1000); const b = S.randInt(150, a - 200); return [`Toko buku memiliki ${a} buku. Terjual ${b} buku. Berapa buku yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(1000, 2000); const b = S.randInt(300, a - 400); return [`${S.randName()} menabung Rp${a.toLocaleString()}. Diambil Rp${b.toLocaleString()}. Sisa tabungan berapa rupiah?`, a - b]; },
                    () => { const a = S.randInt(800, 1500); const b = S.randInt(250, a - 300); return [`Gudang menyimpan ${a} karung beras. Dijual ${b} karung. Berapa karung yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(2500, 4000); const b = S.randInt(800, 1500); return [`Perpustakaan kota memiliki ${a} buku. Dipinjam ${b} buku. Berapa buku yang masih ada?`, a - b]; },
                    () => { const a = S.randInt(1500, 2500); const b = S.randInt(400, 800); return [`Supermarket mempunyai ${a} botol minuman. Terjual ${b} botol. Sisa berapa botol?`, a - b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(5000, 10000); const b = S.randInt(1500, a - 2000); return [`Pabrik memproduksi ${a.toLocaleString()} unit barang. Terjual ${b.toLocaleString()} unit. Berapa unit yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(10000, 25000); const b = S.randInt(3000, 8000); return [`${S.randName()} memiliki tabungan Rp${a.toLocaleString()}. Digunakan Rp${b.toLocaleString()}. Sisa tabungan berapa rupiah?`, a - b]; },
                    () => { const a = S.randInt(15000, 30000); const b = S.randInt(5000, 12000); return [`Stadion menampung ${a.toLocaleString()} penonton. ${b.toLocaleString()} penonton pulang. Berapa penonton yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(8000, 15000); const b = S.randInt(2000, 5000); return [`Perkebunan menghasilkan ${a.toLocaleString()} kg buah. Dijual ${b.toLocaleString()} kg. Berapa kg yang tersisa?`, a - b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(50000, 100000); const b = S.randInt(15000, a - 20000); return [`Perusahaan memiliki aset Rp${a.toLocaleString()}. Pengeluaran Rp${b.toLocaleString()}. Sisa aset berapa rupiah?`, a - b]; },
                    () => { const a = S.randInt(100000, 250000); const b = S.randInt(30000, 80000); return [`Koperasi memiliki modal Rp${a.toLocaleString()}. Digunakan Rp${b.toLocaleString()}. Berapa sisa modalnya?`, a - b]; },
                    () => { const a = S.randInt(75000, 150000); const b = S.randInt(20000, 50000); return [`Populasi kota adalah ${a.toLocaleString()} jiwa. ${b.toLocaleString()} jiwa pindah. Berapa populasi sekarang?`, a - b]; },
                    () => { const persen = S.randInt(10, 30); const nilai = S.randInt(500, 2000); const potongan = Math.round((persen * nilai) / 100); return [`Harga barang Rp${nilai.toLocaleString()}. Diskon ${persen}%. Berapa potongan harganya?`, potongan]; },
                    () => { const a = S.randInt(1000000, 5000000); const b = S.randInt(250000, 1000000); return [`Dana BOS sekolah Rp${a.toLocaleString()}. Digunakan Rp${b.toLocaleString()}. Berapa sisa dananya?`, a - b]; },
                ];
                break;
        }
    }
    else if (subMode === "Tambah" || subMode === "penjumlahan") {
        switch (grade) {
            case 1:
                questions = [
                    () => { const a = S.randInt(1, 5); const b = S.randInt(1, 4); return [`${S.randName()} punya ${a} ${S.randFruit()}. Diberi ${b} lagi. Berapa semuanya?`, a + b]; },
                    () => { const a = S.randInt(2, 6); const b = S.randInt(1, 3); return [`Ada ${a} ${S.randSnack()} di piring. Ditambah ${b}. Jadi berapa?`, a + b]; },
                    () => { const a = S.randInt(1, 5); const b = S.randInt(2, 4); return [`${S.randName()} punya ${a} ${S.randToy()}. ${S.rand(S.names.families)} memberi ${b} lagi. Sekarang punya berapa?`, a + b]; },
                    () => { const a = S.randInt(2, 5); const b = S.randInt(1, 4); return [`Di meja ada ${a} buku. ${S.randName()} meletakkan ${b} buku lagi. Berapa buku di meja sekarang?`, a + b]; },
                    () => { const a = S.randInt(3, 6); const b = S.randInt(2, 4); return [`Di taman ada ${a} kupu-kupu. Datang ${b} kupu-kupu lagi. Berapa kupu-kupu sekarang?`, a + b]; },
                    () => { const a = S.randInt(2, 5); const b = S.randInt(1, 3); return [`${S.randName()} mengumpulkan ${a} daun. Lalu menemukan ${b} daun lagi. Berapa daun semuanya?`, a + b]; },
                    () => { const a = S.randInt(1, 4); const b = S.randInt(2, 5); return [`Ada ${a} anak bermain. ${b} anak lagi datang. Berapa anak yang bermain sekarang?`, a + b]; },
                    () => { const a = S.randInt(2, 6); const b = S.randInt(1, 4); return [`Di keranjang ada ${a} ${S.randFruit()}. Ibu menambahkan ${b} ${S.randFruit()}. Berapa buah sekarang?`, a + b]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(8, 15); const b = S.randInt(5, 10); return [`${S.randName()} membeli ${a} ${S.randSnack()}. Dapat bonus ${b}. Berapa total ${S.randSnack()}nya?`, a + b]; },
                    () => { const a = S.randInt(12, 20); const b = S.randInt(6, 12); return [`Di kelas A ada ${a} siswa. Di kelas B ada ${b} siswa. Berapa total siswa?`, a + b]; },
                    () => { const a = S.randInt(10, 18); const b = S.randInt(7, 12); return [`${S.randName()} punya ${a} kelereng. Diberi ${b} kelereng oleh teman. Berapa kelereng sekarang?`, a + b]; },
                    () => { const a = S.randInt(15, 25); const b = S.randInt(8, 15); return [`Perpustakaan mendapat ${a} buku baru. Kemudian dapat donasi ${b} buku lagi. Berapa total buku baru?`, a + b]; },
                    () => { const a = S.randInt(10, 20); const b = S.randInt(5, 10); return [`Di kolam ada ${a} ikan. Ditambah ${b} ikan lagi. Berapa ikan sekarang?`, a + b]; },
                    () => { const a = S.randInt(18, 25); const b = S.randInt(10, 15); return [`${S.randName()} mengumpulkan ${a} stiker. Dapat ${b} stiker lagi dari kakak. Berapa stiker semuanya?`, a + b]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const a = S.randInt(50, 100); const b = S.randInt(25, 50); return [`${S.randName()} menabung Rp${a}.000. Dapat uang saku Rp${b}.000. Berapa total tabungan dalam ribu rupiah?`, a + b]; },
                    () => { const a = S.randInt(100, 200); const b = S.randInt(50, 100); return [`Toko memiliki ${a} barang. Dapat kiriman ${b} barang lagi. Berapa total barang?`, a + b]; },
                    () => { const a = S.randInt(150, 250); const b = S.randInt(75, 125); return [`Peternak memiliki ${a} ayam. Membeli ${b} ayam lagi. Berapa total ayam?`, a + b]; },
                    () => { const a = S.randInt(80, 150); const b = S.randInt(40, 80); return [`Di kebun ada ${a} pohon mangga. Ditanam ${b} pohon lagi. Berapa total pohon mangga?`, a + b]; },
                    () => { const a = S.randInt(200, 350); const b = S.randInt(100, 200); return [`Sekolah memiliki ${a} kursi. Membeli ${b} kursi baru. Berapa kursi sekarang?`, a + b]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const a = S.randInt(500, 1000); const b = S.randInt(250, 500); return [`Toko buku menjual ${a} buku bulan lalu. Bulan ini terjual ${b} buku. Berapa total buku terjual?`, a + b]; },
                    () => { const a = S.randInt(1500, 2500); const b = S.randInt(750, 1250); return [`Desa A berpenduduk ${a.toLocaleString()} jiwa. Desa B berpenduduk ${b.toLocaleString()} jiwa. Berapa total penduduk?`, a + b]; },
                    () => { const a = S.randInt(2000, 3500); const b = S.randInt(1000, 2000); return [`Pabrik A memproduksi ${a.toLocaleString()} unit. Pabrik B memproduksi ${b.toLocaleString()} unit. Total produksi berapa?`, a + b]; },
                    () => { const a = S.randInt(3000, 5000); const b = S.randInt(1500, 2500); return [`Stadion A menampung ${a.toLocaleString()} penonton. Stadion B menampung ${b.toLocaleString()} penonton. Berapa total kapasitas?`, a + b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(10000, 25000); const b = S.randInt(5000, 15000); return [`Perusahaan A menghasilkan ${a.toLocaleString()} unit. Perusahaan B menghasilkan ${b.toLocaleString()} unit. Total produksi berapa?`, a + b]; },
                    () => { const a = S.randInt(25000, 50000); const b = S.randInt(10000, 25000); return [`Kota A berpenduduk ${a.toLocaleString()} jiwa. Kota B berpenduduk ${b.toLocaleString()} jiwa. Berapa total penduduk?`, a + b]; },
                    () => { const a = S.randInt(15000, 30000); const b = S.randInt(8000, 15000); return [`Perpustakaan memiliki ${a.toLocaleString()} buku. Dapat donasi ${b.toLocaleString()} buku. Berapa total buku?`, a + b]; },
                    () => { const a = S.randInt(50000, 100000); const b = S.randInt(25000, 50000); return [`${S.randName()} menabung Rp${a.toLocaleString()}. Dapat hadiah Rp${b.toLocaleString()}. Berapa total uangnya?`, a + b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(100000, 250000); const b = S.randInt(50000, 125000); return [`Modal usaha Rp${a.toLocaleString()}. Dapat pinjaman Rp${b.toLocaleString()}. Berapa total modal?`, a + b]; },
                    () => { const a = S.randInt(500000, 1000000); const b = S.randInt(250000, 500000); return [`Anggaran proyek A Rp${a.toLocaleString()}. Proyek B Rp${b.toLocaleString()}. Total anggaran berapa?`, a + b]; },
                    () => { const a = S.randInt(150000, 350000); const b = S.randInt(75000, 175000); return [`Populasi kota ${a.toLocaleString()} jiwa. Pendatang baru ${b.toLocaleString()} jiwa. Berapa populasi total?`, a + b]; },
                    () => { const pecahan = S.randInt(1, 4) / 10; const nilai = S.randInt(1000, 5000); const tambah = Math.round(nilai * pecahan); return [`Harga barang Rp${nilai.toLocaleString()}. Naik ${pecahan * 100}%. Kenaikan harganya berapa rupiah?`, tambah]; },
                ];
                break;
        }
    }
    else if (subMode === "Bagi" || subMode === "pembagian") {
        switch (grade) {
            case 1:
                questions = [
                    () => { const b = S.randInt(2, 3); const a = b * S.randInt(2, 4); return [`Ada ${a} ${S.randSnack()} dibagi ${b} anak. Masing-masing dapat berapa?`, a / b]; },
                    () => { const b = S.randInt(2, 4); const a = b * S.randInt(1, 3); return [`${a} ${S.randFruit()} dibagi sama rata ke ${b} piring. Tiap piring berisi berapa?`, a / b]; },
                    () => { const b = 2; const a = b * S.randInt(2, 5); return [`${S.randName()} punya ${a} ${S.randToy()}. Dibagi 2 sama banyak. Masing-masing berapa?`, a / b]; },
                    () => { const b = S.randInt(2, 3); const a = b * S.randInt(2, 4); return [`Ada ${a} kelereng dibagi ke ${b} kantong sama rata. Tiap kantong berisi berapa?`, a / b]; },
                    () => { const b = 2; const a = b * S.randInt(3, 5); return [`${a} pensil dibagi rata untuk ${b} anak. Berapa pensil untuk tiap anak?`, a / b]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const b = S.randInt(2, 5); const a = b * S.randInt(3, 6); return [`${a} ${S.randSnack()} dibagi ${b} anak sama rata. Tiap anak dapat berapa?`, a / b]; },
                    () => { const b = S.randInt(3, 5); const a = b * S.randInt(4, 8); return [`Ada ${a} buku disusun di ${b} rak sama banyak. Tiap rak berisi berapa buku?`, a / b]; },
                    () => { const b = S.randInt(2, 4); const a = b * S.randInt(5, 10); return [`${S.randName()} punya ${a} stiker dibagi ke ${b} teman. Masing-masing dapat berapa?`, a / b]; },
                    () => { const b = S.randInt(4, 6); const a = b * S.randInt(3, 6); return [`${a} kursi disusun menjadi ${b} baris sama banyak. Tiap baris ada berapa kursi?`, a / b]; },
                    () => { const b = S.randInt(2, 5); const a = b * S.randInt(4, 8); return [`Di toko ada ${a} apel dimasukkan ke ${b} keranjang sama rata. Tiap keranjang berisi berapa?`, a / b]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const b = S.randInt(5, 10); const a = b * S.randInt(8, 15); return [`${a} siswa dibagi ${b} kelompok sama rata. Tiap kelompok ada berapa siswa?`, a / b]; },
                    () => { const b = S.randInt(4, 8); const a = b * S.randInt(10, 20); return [`Ada ${a} ${S.randSnack()} dibungkus ke ${b} kotak sama banyak. Tiap kotak berisi berapa?`, a / b]; },
                    () => { const b = S.randInt(5, 10); const a = b * S.randInt(12, 25); return [`${a} halaman buku dibaca ${b} hari sama banyak. Berapa halaman tiap hari?`, a / b]; },
                    () => { const b = S.randInt(6, 12); const a = b * S.randInt(8, 15); return [`Perpustakaan punya ${a} buku dibagi ke ${b} rak sama rata. Tiap rak berisi berapa buku?`, a / b]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const b = S.randInt(10, 25); const a = b * S.randInt(15, 30); return [`${a.toLocaleString()} butir telur dikemas ke ${b} kotak sama banyak. Tiap kotak berisi berapa?`, a / b]; },
                    () => { const b = S.randInt(8, 15); const a = b * S.randInt(20, 40); return [`Pabrik memproduksi ${a} barang dalam ${b} hari. Berapa barang per hari?`, a / b]; },
                    () => { const b = S.randInt(12, 20); const a = b * S.randInt(25, 50); return [`Dana Rp${a.toLocaleString()} dibagi ${b} orang sama rata. Masing-masing dapat berapa rupiah?`, a / b]; },
                    () => { const b = S.randInt(5, 12); const a = b * S.randInt(30, 60); return [`${a} km ditempuh ${b} jam. Berapa km per jam?`, a / b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const b = S.randInt(15, 30); const a = b * S.randInt(50, 100); return [`${a.toLocaleString()} produk dibagi ke ${b} toko sama rata. Tiap toko dapat berapa produk?`, a / b]; },
                    () => { const b = S.randInt(12, 24); const a = b * S.randInt(100, 200); return [`Penjualan Rp${a.toLocaleString()} dalam ${b} bulan. Rata-rata per bulan berapa rupiah?`, a / b]; },
                    () => { const b = S.randInt(20, 40); const a = b * S.randInt(75, 150); return [`${a.toLocaleString()} siswa dibagi ${b} kelas. Tiap kelas berisi berapa siswa?`, a / b]; },
                    () => { const b = S.randInt(8, 16); const a = b * S.randInt(125, 250); return [`Jarak ${a.toLocaleString()} km ditempuh ${b} jam. Kecepatan berapa km/jam?`, a / b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const b = S.randInt(25, 50); const a = b * S.randInt(200, 400); return [`Keuntungan Rp${a.toLocaleString()} dibagi ${b} pemegang saham. Masing-masing dapat berapa?`, a / b]; },
                    () => { const b = S.randInt(12, 24); const a = b * S.randInt(500, 1000); return [`Total produksi ${a.toLocaleString()} unit selama ${b} bulan. Rata-rata produksi per bulan berapa?`, a / b]; },
                    () => { const persen = S.randInt(10, 50); const hasil = S.randInt(100, 500); const total = Math.round((hasil * 100) / persen); return [`${persen}% dari suatu bilangan adalah ${hasil}. Berapakah bilangan itu?`, total]; },
                    () => { const b = S.randInt(4, 8); const a = b * S.randInt(75, 150); return [`Luas tanah ${a} m² dibagi ${b} kavling sama besar. Luas tiap kavling berapa m²?`, a / b]; },
                ];
                break;
        }
    }
    else if (subMode === "Kali" || subMode === "perkalian") {
        switch (grade) {
            case 1:
                questions = [
                    () => { const a = S.randInt(2, 3); const b = S.randInt(2, 4); return [`Ada ${a} piring. Tiap piring ada ${b} ${S.randSnack()}. Berapa jumlah ${S.randSnack()}?`, a * b]; },
                    () => { const a = S.randInt(2, 4); const b = S.randInt(2, 3); return [`${S.randName()} punya ${a} kotak. Tiap kotak berisi ${b} ${S.randFruit()}. Berapa total buah?`, a * b]; },
                    () => { const a = S.randInt(2, 3); const b = S.randInt(3, 5); return [`Ada ${a} baris kursi. Tiap baris ada ${b} kursi. Berapa jumlah kursi?`, a * b]; },
                    () => { const a = S.randInt(2, 4); const b = S.randInt(2, 4); return [`Di taman ada ${a} pohon. Tiap pohon ada ${b} burung. Berapa total burung?`, a * b]; },
                    () => { const a = S.randInt(2, 3); const b = S.randInt(2, 5); return [`${a} anak masing-masing membawa ${b} pensil. Berapa pensil semuanya?`, a * b]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(3, 6); const b = S.randInt(3, 5); return [`Ada ${a} keranjang. Tiap keranjang berisi ${b} ${S.randFruit()}. Berapa total buah?`, a * b]; },
                    () => { const a = S.randInt(4, 7); const b = S.randInt(3, 6); return [`${S.randName()} membeli ${a} pak roti. Tiap pak berisi ${b} roti. Berapa roti semuanya?`, a * b]; },
                    () => { const a = S.randInt(3, 5); const b = S.randInt(4, 7); return [`Di kelas ada ${a} baris meja. Tiap baris ada ${b} meja. Berapa total meja?`, a * b]; },
                    () => { const a = S.randInt(4, 6); const b = S.randInt(5, 8); return [`Ada ${a} kotak pensil. Tiap kotak berisi ${b} pensil. Berapa pensil semuanya?`, a * b]; },
                    () => { const a = S.randInt(5, 8); const b = S.randInt(4, 6); return [`Di lapangan ada ${a} kelompok. Tiap kelompok ada ${b} anak. Berapa anak semuanya?`, a * b]; },
                ];
                break;
            case 3:
                questions = [
                    () => { const a = S.randInt(6, 10); const b = S.randInt(5, 9); return [`Ada ${a} dus. Tiap dus berisi ${b} ${S.randSnack()}. Berapa total ${S.randSnack()}?`, a * b]; },
                    () => { const a = S.randInt(7, 12); const b = S.randInt(6, 10); return [`${S.randName()} membeli ${a} lusin pensil. 1 lusin = ${b} buah. Berapa pensil semuanya?`, a * b]; },
                    () => { const a = S.randInt(8, 12); const b = S.randInt(7, 11); return [`Peternak punya ${a} kandang. Tiap kandang ada ${b} ayam. Berapa total ayam?`, a * b]; },
                    () => { const a = S.randInt(5, 10); const b = S.randInt(8, 12); return [`Ada ${a} kelas. Tiap kelas ada ${b} bangku. Berapa bangku semuanya?`, a * b]; },
                    () => { const a = S.randInt(6, 9); const b = S.randInt(6, 10); return [`Di toko ada ${a} rak. Tiap rak ada ${b} botol. Berapa botol semuanya?`, a * b]; },
                ];
                break;
            case 4:
                questions = [
                    () => { const a = S.randInt(12, 20); const b = S.randInt(10, 15); return [`Pabrik memproduksi ${a} kotak per hari. Tiap kotak berisi ${b} barang. Berapa barang per hari?`, a * b]; },
                    () => { const a = S.randInt(15, 25); const b = S.randInt(12, 18); return [`Ada ${a} baris kursi. Tiap baris ada ${b} kursi. Berapa kursi di stadion?`, a * b]; },
                    () => { const a = S.randInt(10, 20); const b = S.randInt(15, 25); return [`${S.randName()} membeli ${a} pak buku. Tiap pak berisi ${b} buku. Berapa buku semuanya?`, a * b]; },
                    () => { const a = S.randInt(20, 30); const b = S.randInt(8, 15); return [`Di peternakan ada ${a} kandang. Tiap kandang ada ${b} hewan. Berapa hewan semuanya?`, a * b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(25, 50); const b = S.randInt(20, 40); return [`Pabrik memproduksi ${a} unit per jam. Dalam ${b} jam, berapa unit diproduksi?`, a * b]; },
                    () => { const a = S.randInt(50, 100); const b = S.randInt(25, 50); return [`Harga 1 barang Rp${a.toLocaleString()}. Jika beli ${b} barang, berapa totalnya?`, a * b]; },
                    () => { const a = S.randInt(30, 60); const b = S.randInt(15, 30); return [`Kecepatan mobil ${a} km/jam. Jarak yang ditempuh dalam ${b} jam adalah ... km`, a * b]; },
                    () => { const a = S.randInt(40, 80); const b = S.randInt(20, 35); return [`Sekolah punya ${a} kelas. Tiap kelas ada ${b} siswa. Berapa total siswa?`, a * b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(100, 250); const b = S.randInt(50, 100); return [`Harga 1 unit Rp${a.toLocaleString()}. Total harga ${b} unit adalah berapa rupiah?`, a * b]; },
                    () => { const a = S.randInt(75, 150); const b = S.randInt(40, 80); return [`Pekerja ${a} orang bekerja ${b} jam. Berapa total jam kerja (orang-jam)?`, a * b]; },
                    () => { const persen = S.randInt(5, 25); const nilai = S.randInt(1000, 5000); const hasil = Math.round((persen * nilai) / 100); return [`Berapa ${persen}% dari Rp${nilai.toLocaleString()}?`, hasil]; },
                    () => { const a = S.randInt(50, 100); const b = S.randInt(30, 60); return [`Luas tanah ${a} m × ${b} m. Berapa luas totalnya dalam m²?`, a * b]; },
                    () => { const skala = S.randInt(100, 500); const peta = S.randInt(5, 20); return [`Pada peta skala 1:${skala}, jarak ${peta} cm di peta = berapa cm sebenarnya?`, skala * peta]; },
                ];
                break;
        }
    }

    return questions;
}

function generateAljabarQuestions(grade, subMode) {
    const S = StoryMode;
    let questions = [];

    if (subMode === "Isi Kotak Kosong") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const a = S.randInt(1, 5); const h = S.randInt(a + 1, a + 5); return [`${S.randName()} punya ${a} ${S.randFruit()}, lalu diberi beberapa lagi hingga menjadi ${h}. Berapa isi kotak (□)?`, h - a]; },
                    () => { const h = S.randInt(4, 10); const a = S.randInt(1, h - 1); return [`Di meja ada beberapa ${S.randSnack()}. Setelah ditambah ${a} menjadi ${h}. Berapa jumlah awalnya (□)?`, h - a]; },
                    () => { const a = S.randInt(5, 12); const s = S.randInt(1, a - 2); return [`${S.randName()} punya ${a} kelereng, lalu diberikan beberapa hingga sisa ${s}. Berapa yang diberikan (□)?`, a - s]; },
                    () => { const h = S.randInt(6, 15); const a = S.randInt(2, h - 2); return [`Jumlah pensil ${S.randName()} setelah ditambah beberapa menjadi ${h}. Jika sebelumnya ada ${a}, berapa yang ditambahkan (□)?`, h - a]; },
                    () => { const a = S.randInt(8, 15); const b = S.randInt(2, 6); return [`Ada beberapa burung di pohon. Setelah ${b} terbang, tersisa ${a - b}. Berapa burung mula-mula (□)?`, a]; },
                    () => { const a = S.randInt(3, 7); const h = S.randInt(a + 2, a + 6); return [`${S.randName()} membaca ${a} halaman buku, lalu melanjutkan hingga total ${h} halaman. Berapa halaman selanjutnya (□)?`, h - a]; },
                    () => { const h = S.randInt(5, 12); const a = S.randInt(1, h - 1); return [`Di keranjang ada beberapa ${S.randFruit()}. Setelah diambil ${a}, tersisa ${h - a}. Berapa jumlah awalnya (□)?`, h]; },
                    () => { const a = S.randInt(6, 10); const s = S.randInt(1, 4); return [`${S.randName()} memiliki ${a} balon, lalu beberapa pecah sehingga tersisa ${a - s}. Berapa balon yang pecah (□)?`, s]; },
                    () => { const h = S.randInt(7, 14); const a = S.randInt(3, h - 3); return [`Jumlah ikan di akuarium menjadi ${h} setelah ditambah beberapa. Jika sebelumnya ada ${a}, berapa ikan yang ditambahkan (□)?`, h - a]; },
                    () => { const a = S.randInt(9, 15); const s = S.randInt(3, 7); return [`${S.randName()} membawa ${a} permen, lalu membagikan beberapa hingga tersisa ${a - s}. Berapa permen yang dibagikan (□)?`, s]; },
                    () => { const a = S.randInt(2, 6); const t = S.randInt(a + 3, a + 9); return [`${S.randName()} membawa ${a} botol air. Di sekolah mendapat beberapa lagi hingga total ${t}. Berapa botol tambahan (□)?`, t - a]; },
                    () => { const t = S.randInt(7, 14); const a = S.randInt(2, t - 3); return [`Jumlah ${S.randFruit()} di kantin ada ${t}. Jika ${a} milik ${S.randName()}, berapa milik teman-temannya (□)?`, t - a]; },
                    () => { const a = S.randInt(6, 12); const s = S.randInt(2, a - 3); return [`${S.randName()} mengumpulkan ${a} stiker. Beberapa ditukar hingga tersisa ${s}. Berapa yang ditukar (□)?`, a - s]; },
                    () => { const t = S.randInt(10, 20); const a = S.randInt(4, t - 4); return [`Total kursi di kelas ada ${t}. Jika ${a} sudah ditempati, berapa kursi kosong (□)?`, t - a]; },
                    () => { const a = S.randInt(8, 16); const h = S.randInt(2, 7); return [`Di rak ada ${a} buku. ${h} dipinjam teman. Berapa buku yang tersisa (□)?`, a - h]; },
                    () => { const a = S.randInt(3, 9); const t = S.randInt(a + 4, a + 10); return [`${S.randName()} memiliki ${a} poin game, lalu bermain hingga total poin ${t}. Berapa poin yang didapat (□)?`, t - a]; },
                    () => { const t = S.randInt(9, 18); const h = S.randInt(3, 8); return [`Ada ${t} lampu di aula. ${h} mati. Berapa lampu yang masih menyala (□)?`, t - h]; },
                    () => { const a = S.randInt(5, 11); const s = S.randInt(1, 4); return [`${S.randName()} membawa ${a} bekal. Sebagian dimakan hingga tersisa ${a - s}. Berapa yang dimakan (□)?`, s]; },
                    () => { const t = S.randInt(12, 20); const a = S.randInt(5, t - 5); return [`Jumlah penonton pertandingan ${t}. Jika ${a} adalah siswa, berapa penonton lain (□)?`, t - a]; },
                    () => { const a = S.randInt(7, 15); const s = S.randInt(3, 6); return [`${S.randName()} menyusun ${a} lego. ${s} dilepas kembali. Berapa lego yang masih tersusun (□)?`, a - s]; },
                    () => { const a = S.randInt(1, 5); const result = S.randInt(a + 1, a + 5); return [`${a} + □ = ${result}. Angka dalam kotak adalah ...`, result - a]; },
                    () => { const result = S.randInt(4, 10); const a = S.randInt(1, result - 1); return [`□ + ${a} = ${result}. Isi kotak kosong adalah ...`, result - a]; },
                    () => { const a = S.randInt(5, 12); const b = S.randInt(1, a - 2); return [`${a} - □ = ${b}. Berapa angka dalam kotak?`, a - b]; },
                    () => { const total = S.randInt(6, 15); const kiri = S.randInt(2, total - 2); return [`${kiri} + □ = ${total}. Nilai kotak adalah ...`, total - kiri]; },
                    () => { const a = S.randInt(8, 15); const b = S.randInt(2, 6); return [`□ - ${b} = ${a - b}. Angka dalam kotak adalah ...`, a]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const a = S.randInt(10, 30); const t = S.randInt(a + 5, a + 25); return [`${S.randName()} memiliki ${a} koin dan mendapat beberapa lagi hingga total ${t}. Berapa koin tambahan (□)?`, t - a]; },
                    () => { const b = S.randInt(3, 8); const t = b * S.randInt(5, 15); return [`${S.randName()} membagi hadiah sama banyak ke ${b} anak hingga total ${t}. Berapa hadiah awal (□)?`, t / b]; },
                    () => { const a = S.randInt(50, 100); const s = S.randInt(15, 40); return [`Di gudang ada ${a} karung beras. Setelah diambil beberapa, tersisa ${a - s}. Berapa yang diambil (□)?`, s]; },
                    () => { const d = S.randInt(3, 10); const q = S.randInt(5, 15); return [`Jumlah apel dibagi rata ke ${d} keranjang, tiap keranjang berisi ${q}. Berapa jumlah apel awal (□)?`, d * q]; },
                    () => { const a = S.randInt(20, 40); const t = S.randInt(a + 10, a + 35); return [`${S.randName()} mengumpulkan ${a} poin lalu bermain hingga total ${t}. Berapa poin tambahan (□)?`, t - a]; },
                    () => { const b = S.randInt(4, 9); const t = b * S.randInt(6, 12); return [`Sebuah kelas membeli ${t} buku dan dibagi rata ke ${b} kelompok. Berapa buku tiap kelompok (□)?`, t / b]; },
                    () => { const a = S.randInt(60, 120); const s = S.randInt(20, 50); return [`${S.randName()} membawa ${a} permen dan membagikan beberapa hingga sisa ${a - s}. Berapa yang dibagikan (□)?`, s]; },
                    () => { const d = S.randInt(4, 12); const q = S.randInt(6, 14); return [`Sebuah toko mengemas barang ke ${d} kotak dengan isi sama banyak, tiap kotak ${q}. Berapa barang awal (□)?`, d * q]; },
                    () => { const a = S.randInt(15, 35); const t = S.randInt(a + 8, a + 28); return [`Saldo awal ${S.randName()} adalah ${a} ribu rupiah, lalu menjadi ${t}. Berapa uang yang ditambahkan (□)?`, t - a]; },
                    () => { const b = S.randInt(3, 7); const t = b * S.randInt(10, 20); return [`Total kursi ${t} disusun sama banyak ke ${b} baris. Berapa kursi tiap baris (□)?`, t / b]; },
                    () => { const a = S.randInt(70, 150); const s = S.randInt(25, 60); return [`Stok awal ada ${a} botol minum. Setelah terjual beberapa, tersisa ${a - s}. Berapa yang terjual (□)?`, s]; },
                    () => { const d = S.randInt(5, 10); const q = S.randInt(8, 16); return [`Jumlah kelereng dibagi rata ke ${d} anak, tiap anak mendapat ${q}. Berapa kelereng awal (□)?`, d * q]; },
                    () => { const a = S.randInt(25, 45); const t = S.randInt(a + 12, a + 40); return [`${S.randName()} menulis ${a} halaman lalu lanjut hingga ${t}. Berapa halaman tambahan (□)?`, t - a]; },
                    () => { const b = S.randInt(4, 8); const t = b * S.randInt(7, 15); return [`${t} snack dibagi rata ke ${b} kantong. Berapa isi tiap kantong (□)?`, t / b]; },
                    () => { const a = S.randInt(80, 140); const s = S.randInt(30, 70); return [`Tangki berisi ${a} liter air. Setelah dipakai, tersisa ${a - s}. Berapa liter yang digunakan (□)?`, s]; },
                    () => { const d = S.randInt(6, 12); const q = S.randInt(5, 12); return [`Pabrik menghasilkan barang yang dikemas ke ${d} kotak, tiap kotak ${q}. Berapa total barang (□)?`, d * q]; },
                    () => { const a = S.randInt(18, 38); const t = S.randInt(a + 10, a + 30); return [`${S.randName()} mengoleksi ${a} kartu dan bertambah hingga ${t}. Berapa kartu tambahan (□)?`, t - a]; },
                    () => { const b = S.randInt(5, 9); const t = b * S.randInt(9, 18); return [`Sebanyak ${t} pensil dibagi rata ke ${b} siswa. Berapa pensil tiap siswa (□)?`, t / b]; },
                    () => { const a = S.randInt(90, 160); const s = S.randInt(35, 80); return [`Gudang menyimpan ${a} dus, lalu mengirim sebagian hingga tersisa ${a - s}. Berapa dus yang dikirim (□)?`, s]; },
                    () => { const d = S.randInt(7, 14); const q = S.randInt(6, 13); return [`Panitia membagi hadiah sama rata ke ${d} kelompok, tiap kelompok ${q}. Berapa hadiah awal (□)?`, d * q]; },
                    () => { const a = S.randInt(10, 30); const result = S.randInt(a + 5, a + 25); return [`${a} + □ = ${result}. Berapa angka dalam kotak?`, result - a]; },
                    () => { const b = S.randInt(3, 8); const result = S.randInt(20, 60); const a = result / b; return [`□ × ${b} = ${result}. Nilai kotak adalah ...`, a]; },
                    () => { const a = S.randInt(50, 100); const b = S.randInt(15, 40); return [`${a} - □ = ${a - b}. Angka dalam kotak adalah ...`, b]; },
                    () => { const divisor = S.randInt(3, 10); const quotient = S.randInt(5, 15); return [`□ ÷ ${divisor} = ${quotient}. Berapa angka dalam kotak?`, divisor * quotient]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(5, 15); const b = S.randInt(2, 8); const c = S.randInt(5, 20); const r = a * b + c; return [`${S.randName()} membeli ${a} kantong permen, tiap kantong berisi □ permen, lalu mendapat bonus ${c} permen sehingga total ${r}. Berapa isi tiap kantong (□)?`, b]; },
                    () => { const x = S.randInt(2, 10); const a = S.randInt(2, 5); return [`${S.randName()} memiliki beberapa kotak, tiap kotak berisi ${a} buku sehingga total ${a * x} buku. Berapa jumlah kotak (□)?`, x]; },
                    () => { const r = S.randInt(100, 300); const a = S.randInt(20, 50); return [`Tabungan ${S.randName()} bertambah ${a} ribu rupiah hingga menjadi ${r} ribu. Berapa tabungan awalnya (□)?`, r - a]; },
                    () => { const a = S.randInt(6, 12); const b = S.randInt(3, 9); const c = S.randInt(10, 30); const r = a * b + c; return [`Ada ${a} rak buku, tiap rak berisi □ buku, lalu ditambah ${c} buku menjadi ${r}. Berapa buku tiap rak (□)?`, b]; },
                    () => { const x = S.randInt(3, 12); const a = S.randInt(4, 7); return [`Sebuah kelas memiliki ${a} baris kursi dengan jumlah sama sehingga total ${a * x} kursi. Berapa kursi tiap baris (□)?`, x]; },
                    () => { const r = S.randInt(120, 260); const a = S.randInt(30, 80); return [`Stok awal barang ditambah ${a} unit menjadi ${r} unit. Berapa stok awal (□)?`, r - a]; },
                    () => { const a = S.randInt(7, 14); const b = S.randInt(2, 6); const c = S.randInt(8, 25); const r = a * b + c; return [`${S.randName()} menyusun ${a} baris lego, tiap baris □ lego, lalu menambah ${c} lego hingga total ${r}. Berapa lego tiap baris (□)?`, b]; },
                    () => { const x = S.randInt(2, 9); const a = S.randInt(5, 10); return [`Total ${a * x} botol air dibagi sama banyak ke beberapa dus, tiap dus berisi ${a}. Berapa jumlah dus (□)?`, x]; },
                    () => { const r = S.randInt(150, 320); const a = S.randInt(40, 90); return [`Uang kas ditambah ${a} ribu rupiah sehingga menjadi ${r} ribu. Berapa uang kas awal (□)?`, r - a]; },
                    () => { const a = S.randInt(8, 16); const b = S.randInt(3, 7); const c = S.randInt(12, 30); const r = a * b + c; return [`Ada ${a} meja, tiap meja terdapat □ kursi, lalu ditambah ${c} kursi menjadi ${r}. Berapa kursi tiap meja (□)?`, b]; },
                    () => { const x = S.randInt(3, 10); const a = S.randInt(6, 12); return [`Jumlah pensil adalah ${a * x} dan disusun sama banyak ke beberapa kotak, tiap kotak ${a}. Berapa jumlah kotak (□)?`, x]; },
                    () => { const r = S.randInt(110, 280); const a = S.randInt(25, 70); return [`Jumlah pengunjung bertambah ${a} orang sehingga total ${r}. Berapa jumlah awal pengunjung (□)?`, r - a]; },
                    () => { const a = S.randInt(9, 18); const b = S.randInt(2, 5); const c = S.randInt(10, 35); const r = a * b + c; return [`${S.randName()} membawa ${a} kantong beras, tiap kantong □ kg, lalu ditambah ${c} kg sehingga total ${r} kg. Berapa kg tiap kantong (□)?`, b]; },
                    () => { const x = S.randInt(4, 12); const a = S.randInt(3, 8); return [`Total ${a * x} kue dibagi rata ke beberapa piring, tiap piring berisi ${a}. Berapa jumlah piring (□)?`, x]; },
                    () => { const r = S.randInt(130, 300); const a = S.randInt(35, 85); return [`Produksi hari ini bertambah ${a} unit sehingga total ${r}. Berapa produksi awal (□)?`, r - a]; },
                    () => { const a = S.randInt(10, 20); const b = S.randInt(2, 6); const c = S.randInt(15, 40); const r = a * b + c; return [`Ada ${a} kotak mainan, tiap kotak □ mainan, lalu ditambah ${c} mainan menjadi ${r}. Berapa mainan tiap kotak (□)?`, b]; },
                    () => { const x = S.randInt(5, 14); const a = S.randInt(4, 9); return [`Jumlah total kursi ${a * x} disusun ke beberapa baris, tiap baris ${a}. Berapa jumlah baris (□)?`, x]; },
                    () => { const r = S.randInt(160, 350); const a = S.randInt(50, 100); return [`Persediaan awal ditambah ${a} unit menjadi ${r} unit. Berapa persediaan awal (□)?`, r - a]; },
                    () => { const a = S.randInt(6, 15); const b = S.randInt(3, 8); const c = S.randInt(10, 25); const r = a * b + c; return [`${S.randName()} menyiapkan ${a} paket, tiap paket □ barang, lalu menambah ${c} barang hingga total ${r}. Berapa barang tiap paket (□)?`, b]; },
                    () => { const x = S.randInt(3, 11); const a = S.randInt(7, 13); return [`Total ${a * x} tanaman ditanam sama banyak ke beberapa baris, tiap baris ${a}. Berapa jumlah baris (□)?`, x]; },
                    () => { const a = S.randInt(5, 15); const b = S.randInt(2, 8); const result = a * b + S.randInt(5, 20); return [`${a} × □ + ${result - a * b} = ${result}. Nilai kotak adalah ...`, b]; },
                    () => { const x = S.randInt(2, 10); const a = S.randInt(2, 5); const b = S.randInt(5, 20); return [`${a} × □ = ${a * x}. Berapa nilai kotak?`, x]; },
                    () => { const result = S.randInt(100, 300); const a = S.randInt(20, 50); return [`□ + ${a} = ${result}. Angka dalam kotak adalah ...`, result - a]; },
                ];
                break;
        }
    }
    else if (subMode === "Nilai Variabel") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const x = S.randInt(2, 8); const b = S.randInt(1, 5); return [`Jika Ani memiliki n = ${x} permen lalu membeli ${b} lagi, berapa jumlah permen Ani sekarang?`, x + b]; },
                    () => { const x = S.randInt(5, 12); const b = S.randInt(1, x - 2); return [`Jika Budi memiliki x = ${x} kelereng dan kehilangan ${b}, berapa sisa kelereng Budi?`, x - b]; },
                    () => { const x = S.randInt(2, 6); const b = S.randInt(2, 4); return [`Jika satu kotak berisi y = ${x} buku dan ada ${b} kotak, berapa jumlah buku seluruhnya?`, x * b]; },
                    () => { const x = S.randInt(2, 5); const a = S.randInt(3, 6); const b = S.randInt(1, 4); return [`Jika m = ${x}, hitung jumlah buah jika ada ${a} buah di meja dan ${b} buah di tas.`, a + x + b]; },
                    () => { const x = S.randInt(3, 9); const b = S.randInt(2, 6); return [`Jika Dika mengumpulkan n = ${x} stiker setiap hari selama ${b} hari, berapa total stiker Dika?`, x * b]; },
                    () => { const x = S.randInt(6, 15); const b = S.randInt(2, 5); return [`Jika Rina memiliki x = ${x} pensil lalu meminjamkan ${b} pensil, berapa sisa pensil Rina?`, x - b]; },
                    () => { const x = S.randInt(4, 10); const b = S.randInt(3, 7); return [`Jika satu rak berisi y = ${x} buku dan ada ${b} rak, berapa jumlah seluruh buku?`, x * b]; },
                    () => { const x = S.randInt(3, 8); const a = S.randInt(2, 5); return [`Jika m = ${x}, berapa jumlah kelereng jika ditambah ${a} kelereng lagi?`, x + a]; },
                    () => { const x = S.randInt(7, 14); const b = S.randInt(3, 6); return [`Jika Sinta memiliki x = ${x} permen lalu membagikan ${b}, berapa permen yang tersisa?`, x - b]; },
                    () => { const x = S.randInt(2, 6); const b = S.randInt(4, 8); return [`Jika satu kantong berisi y = ${x} apel dan ada ${b} kantong, berapa jumlah apel semuanya?`, x * b]; },
                    () => { const x = S.randInt(5, 10); const a = S.randInt(3, 7); return [`Jika m = ${x}, hitung total balon jika ditambah ${a} balon lagi.`, x + a]; },
                    () => { const x = S.randInt(6, 12); const b = S.randInt(2, 5); return [`Jika Andi memiliki x = ${x} buku dan memberikan ${b} ke temannya, berapa buku yang tersisa?`, x - b]; },
                    () => { const x = S.randInt(3, 7); const b = S.randInt(3, 6); return [`Jika satu piring berisi y = ${x} kue dan ada ${b} piring, berapa jumlah kue seluruhnya?`, x * b]; },
                    () => { const x = S.randInt(4, 9); const a = S.randInt(2, 6); return [`Jika m = ${x}, berapa jumlah uang jika ditambah ${a} ribu rupiah?`, x + a]; },
                    () => { const x = S.randInt(8, 16); const b = S.randInt(3, 7); return [`Jika Rudi memiliki x = ${x} kelereng lalu kehilangan ${b}, berapa sisa kelerengnya?`, x - b]; },
                    () => { const x = S.randInt(2, 5); const b = S.randInt(5, 9); return [`Jika satu kotak berisi y = ${x} pensil dan ada ${b} kotak, berapa jumlah pensil semuanya?`, x * b]; },
                    () => { const x = S.randInt(5, 11); const a = S.randInt(3, 6); return [`Jika m = ${x}, hitung jumlah buku jika ditambah ${a} buku lagi.`, x + a]; },
                    () => { const x = S.randInt(6, 13); const b = S.randInt(2, 6); return [`Jika Nisa memiliki x = ${x} stiker dan memberikan ${b}, berapa stiker yang tersisa?`, x - b]; },
                    () => { const x = S.randInt(3, 6); const b = S.randInt(4, 8); return [`Jika satu rak berisi y = ${x} sepatu dan ada ${b} rak, berapa jumlah sepatu seluruhnya?`, x * b]; },
                    () => { const x = S.randInt(7, 15); const a = S.randInt(2, 6); return [`Jika m = ${x}, berapa total pensil jika ditambah ${a} pensil lagi?`, x + a]; },
                    () => { const x = S.randInt(2, 8); const b = S.randInt(1, 5); return [`Jika n = ${x}, maka n + ${b} = ...`, x + b]; },
                    () => { const x = S.randInt(5, 12); const b = S.randInt(1, x - 2); return [`Jika x = ${x}, maka x - ${b} = ...`, x - b]; },
                    () => { const x = S.randInt(2, 6); const b = S.randInt(2, 4); return [`Jika y = ${x}, maka y × ${b} = ...`, x * b]; },
                    () => { const x = S.randInt(2, 5); const a = S.randInt(3, 6); const b = S.randInt(1, 4); return [`Jika m = ${x}, maka ${a} + m + ${b} = ...`, a + x + b]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const x = S.randInt(5, 15); const a = S.randInt(2, 5); const b = S.randInt(3, 10); return [`Jika setiap kotak berisi x = ${x} buku dan ada ${a} kotak, lalu ditambah ${b} buku, berapa jumlah buku seluruhnya?`, a * x + b]; },
                    () => { const x = S.randInt(4, 12); const a = S.randInt(2, 6); const b = S.randInt(1, 5); return [`Jika setiap rak berisi n = ${x} buku dan ada ${a} rak, lalu ${b} buku dipinjam, berapa sisa buku?`, a * x - b]; },
                    () => { const x = S.randInt(3, 10); const y = S.randInt(2, 8); return [`Jika Ani memiliki x = ${x} pensil dan Budi memiliki y = ${y} pensil, berapa jumlah pensil mereka?`, x + y]; },
                    () => { const x = S.randInt(2, 6); const a = S.randInt(3, 8); return [`Jika satu kotak berisi p = ${x} apel dan ada ${a} kotak, berapa jumlah apel semuanya?`, a * x]; },
                    () => { const x = S.randInt(6, 14); const a = S.randInt(2, 5); const b = S.randInt(4, 12); return [`Jika setiap kantong berisi x = ${x} permen dan ada ${a} kantong, lalu ditambah ${b} permen, berapa total permen?`, a * x + b]; },
                    () => { const x = S.randInt(5, 13); const a = S.randInt(3, 7); const b = S.randInt(1, 6); return [`Jika tiap kotak berisi n = ${x} kue dan ada ${a} kotak, lalu ${b} kue dimakan, berapa sisa kue?`, a * x - b]; },
                    () => { const x = S.randInt(4, 11); const y = S.randInt(3, 10); return [`Jika Rina memiliki x = ${x} buku dan Sinta memiliki y = ${y} buku, berapa selisih jumlah buku mereka?`, x - y]; },
                    () => { const x = S.randInt(3, 7); const a = S.randInt(4, 8); return [`Jika satu paket berisi p = ${x} pensil dan ada ${a} paket, berapa jumlah pensil seluruhnya?`, a * x]; },
                    () => { const x = S.randInt(7, 16); const a = S.randInt(2, 4); const b = S.randInt(5, 15); return [`Jika setiap dus berisi x = ${x} botol dan ada ${a} dus, lalu ditambah ${b} botol, berapa total botol?`, a * x + b]; },
                    () => { const x = S.randInt(4, 10); const a = S.randInt(3, 6); const b = S.randInt(2, 7); return [`Jika setiap rak berisi n = ${x} buku dan ada ${a} rak, lalu ${b} buku hilang, berapa sisa buku?`, a * x - b]; },
                    () => { const x = S.randInt(5, 12); const y = S.randInt(2, 8); return [`Jika di rumah ada x = ${x} kursi dan di aula ada y = ${y} kursi, berapa jumlah kursi seluruhnya?`, x + y]; },
                    () => { const x = S.randInt(2, 6); const a = S.randInt(5, 9); return [`Jika satu keranjang berisi p = ${x} jeruk dan ada ${a} keranjang, berapa jumlah jeruk semuanya?`, a * x]; },
                    () => { const x = S.randInt(6, 15); const a = S.randInt(2, 5); const b = S.randInt(3, 9); return [`Jika tiap kantong berisi x = ${x} beras dan ada ${a} kantong, lalu ditambah ${b} kg beras, berapa total beras?`, a * x + b]; },
                    () => { const x = S.randInt(5, 14); const a = S.randInt(2, 6); const b = S.randInt(1, 5); return [`Jika setiap kotak berisi n = ${x} mainan dan ada ${a} kotak, lalu ${b} mainan rusak, berapa sisa mainan?`, a * x - b]; },
                    () => { const x = S.randInt(3, 9); const y = S.randInt(4, 11); return [`Jika Ani memiliki x = ${x} permen dan Dika memiliki y = ${y} permen, berapa jumlah permen mereka?`, x + y]; },
                    () => { const x = S.randInt(2, 7); const a = S.randInt(3, 10); return [`Jika satu kotak berisi p = ${x} spidol dan ada ${a} kotak, berapa jumlah spidol seluruhnya?`, a * x]; },
                    () => { const x = S.randInt(8, 18); const a = S.randInt(2, 4); const b = S.randInt(6, 14); return [`Jika setiap rak berisi x = ${x} buku dan ada ${a} rak, lalu ditambah ${b} buku baru, berapa total buku?`, a * x + b]; },
                    () => { const x = S.randInt(6, 13); const a = S.randInt(3, 7); const b = S.randInt(2, 6); return [`Jika tiap kotak berisi n = ${x} kelereng dan ada ${a} kotak, lalu ${b} kelereng hilang, berapa sisa kelereng?`, a * x - b]; },
                    () => { const x = S.randInt(4, 10); const y = S.randInt(2, 7); return [`Jika di kelas ada x = ${x} meja dan y = ${y} meja di ruang lain, berapa selisih jumlah meja?`, x - y]; },
                    () => { const x = S.randInt(3, 8); const a = S.randInt(4, 9); return [`Jika satu paket berisi p = ${x} penghapus dan ada ${a} paket, berapa jumlah penghapus semuanya?`, a * x]; },
                    () => { const x = S.randInt(5, 15); const a = S.randInt(2, 5); const b = S.randInt(3, 10); return [`Jika x = ${x}, maka ${a}x + ${b} = ...`, a * x + b]; },
                    () => { const x = S.randInt(3, 10); const a = S.randInt(2, 6); const b = S.randInt(1, 5); return [`Jika n = ${x}, maka ${a}n - ${b} = ...`, a * x - b]; },
                    () => { const x = S.randInt(4, 12); const y = S.randInt(2, 8); return [`Jika x = ${x} dan y = ${y}, maka x + y = ...`, x + y]; },
                    () => { const x = S.randInt(2, 6); const a = S.randInt(3, 8); return [`Jika p = ${x}, maka ${a} × p = ...`, a * x]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const x = S.randInt(5, 15); const a = S.randInt(2, 6); const b = S.randInt(5, 15); const c = S.randInt(2, 8); return [`Jika setiap kotak berisi x = ${x} buku, ada ${a} kotak, ditambah ${b} buku dan ${c} buku rusak, berapa jumlah buku sekarang?`, a * x + b - c]; },
                    () => { const x = S.randInt(4, 10); const y = S.randInt(3, 7); const a = S.randInt(2, 4); const b = S.randInt(2, 5); return [`Jika satu rak berisi x = ${x} buku dan rak lain berisi y = ${y} buku, dengan ${a} rak pertama dan ${b} rak kedua, berapa jumlah buku seluruhnya?`, a * x + b * y]; },
                    () => { const x = S.randInt(4, 10); const a = S.randInt(2, 5); return [`Jika luas persegi dengan sisi m = ${x} meter, lalu dikurangi ${a} meter persegi untuk jalan, berapa sisa luasnya?`, x * x - a]; },
                    () => { const x = S.randInt(6, 14); const a = S.randInt(2, 6); const b = S.randInt(6, 18); const c = S.randInt(3, 9); return [`Jika setiap kantong berisi x = ${x} kue, ada ${a} kantong, ditambah ${b} kue dan ${c} kue dimakan, berapa jumlah kue sekarang?`, a * x + b - c]; },
                    () => { const x = S.randInt(5, 12); const y = S.randInt(2, 6); const a = S.randInt(2, 4); const b = S.randInt(2, 5); return [`Jika Ani memiliki x = ${x} permen dan Budi memiliki y = ${y} permen, Ani punya ${a} kantong dan Budi punya ${b} kantong, berapa jumlah permen mereka?`, a * x + b * y]; },
                    () => { const x = S.randInt(3, 9); const a = S.randInt(2, 6); return [`Jika sebuah taman berbentuk persegi dengan sisi m = ${x} meter dan ${a} meter dipakai untuk kolam, berapa luas sisa taman?`, x * x - a]; },
                    () => { const x = S.randInt(7, 15); const a = S.randInt(2, 5); const b = S.randInt(5, 20); const c = S.randInt(2, 10); return [`Jika satu dus berisi x = ${x} botol, ada ${a} dus, lalu ditambah ${b} botol dan ${c} botol pecah, berapa botol tersisa?`, a * x + b - c]; },
                    () => { const x = S.randInt(4, 9); const y = S.randInt(3, 8); const a = S.randInt(2, 4); const b = S.randInt(2, 6); return [`Jika rak A berisi x = ${x} buku dan rak B berisi y = ${y} buku, ada ${a} rak A dan ${b} rak B, berapa jumlah buku seluruhnya?`, a * x + b * y]; },
                    () => { const x = S.randInt(5, 11); const a = S.randInt(2, 5); return [`Jika panjang sisi lantai berbentuk persegi adalah m = ${x} meter, lalu ${a} meter persegi dipakai untuk meja, berapa luas sisa lantai?`, x * x - a]; },
                    () => { const x = S.randInt(6, 13); const a = S.randInt(2, 6); const b = S.randInt(8, 22); const c = S.randInt(3, 10); return [`Jika setiap rak berisi x = ${x} buku, ada ${a} rak, lalu ditambah ${b} buku dan ${c} buku hilang, berapa jumlah buku sekarang?`, a * x + b - c]; },
                    () => { const x = S.randInt(5, 12); const y = S.randInt(2, 7); const a = S.randInt(2, 4); const b = S.randInt(2, 6); return [`Jika satu kotak berisi x = ${x} kelereng dan kotak lain berisi y = ${y} kelereng, dengan ${a} kotak pertama dan ${b} kotak kedua, berapa jumlah kelereng seluruhnya?`, a * x + b * y]; },
                    () => { const x = S.randInt(4, 10); const a = S.randInt(2, 6); return [`Jika luas halaman berbentuk persegi dengan sisi m = ${x} meter dan ${a} meter persegi digunakan untuk jalan, berapa luas halaman yang tersisa?`, x * x - a]; },
                    () => { const x = S.randInt(8, 16); const a = S.randInt(2, 6); const b = S.randInt(10, 25); const c = S.randInt(4, 12); return [`Jika satu karung berisi x = ${x} kg beras, ada ${a} karung, lalu ditambah ${b} kg dan ${c} kg terpakai, berapa kg beras sekarang?`, a * x + b - c]; },
                    () => { const x = S.randInt(4, 9); const y = S.randInt(3, 7); const a = S.randInt(2, 5); const b = S.randInt(2, 6); return [`Jika rak kecil berisi x = ${x} buku dan rak besar berisi y = ${y} buku, ada ${a} rak kecil dan ${b} rak besar, berapa jumlah buku seluruhnya?`, a * x + b * y]; },
                    () => { const x = S.randInt(6, 12); const a = S.randInt(2, 5); return [`Jika sebuah lapangan berbentuk persegi dengan sisi m = ${x} meter dan ${a} meter persegi dipakai untuk panggung, berapa luas lapangan yang tersisa?`, x * x - a]; },
                    () => { const x = S.randInt(9, 18); const a = S.randInt(2, 6); const b = S.randInt(12, 30); const c = S.randInt(5, 15); return [`Jika satu kotak berisi x = ${x} botol, ada ${a} kotak, lalu ditambah ${b} botol dan ${c} botol bocor, berapa botol yang tersisa?`, a * x + b - c]; },
                    () => { const x = S.randInt(5, 10); const y = S.randInt(4, 9); const a = S.randInt(2, 4); const b = S.randInt(3, 6); return [`Jika rak depan berisi x = ${x} sepatu dan rak belakang berisi y = ${y} sepatu, ada ${a} rak depan dan ${b} rak belakang, berapa jumlah sepatu seluruhnya?`, a * x + b * y]; },
                    () => { const x = S.randInt(4, 11); const a = S.randInt(2, 6); return [`Jika luas kolam berbentuk persegi dengan sisi m = ${x} meter dan ${a} meter persegi tertutup daun, berapa luas kolam yang bersih?`, x * x - a]; },
                    () => { const x = S.randInt(7, 15); const a = S.randInt(2, 5); const b = S.randInt(10, 22); const c = S.randInt(4, 12); return [`Jika satu rak berisi x = ${x} mainan, ada ${a} rak, lalu ditambah ${b} mainan dan ${c} mainan rusak, berapa mainan yang tersisa?`, a * x + b - c]; },
                    () => { const x = S.randInt(5, 9); const y = S.randInt(3, 8); const a = S.randInt(2, 4); const b = S.randInt(2, 6); return [`Jika lemari A berisi x = ${x} baju dan lemari B berisi y = ${y} baju, ada ${a} lemari A dan ${b} lemari B, berapa jumlah baju seluruhnya?`, a * x + b * y]; },
                    () => { const x = S.randInt(5, 15); const a = S.randInt(2, 6); const b = S.randInt(5, 15); const c = S.randInt(2, 8); return [`Jika x = ${x}, maka ${a}x + ${b} - ${c} = ...`, a * x + b - c]; },
                    () => { const x = S.randInt(3, 8); const y = S.randInt(2, 6); const a = S.randInt(2, 4); const b = S.randInt(2, 5); return [`Jika x = ${x} dan y = ${y}, maka ${a}x + ${b}y = ...`, a * x + b * y]; },
                    () => { const x = S.randInt(4, 10); const a = S.randInt(2, 5); return [`Jika m = ${x}, maka m² - ${a} = ...`, x * x - a]; },
                ];
                break;
        }
    }
    else if (subMode === "Persamaan Sederhana") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const a = S.randInt(2, 6); const b = S.randInt(a + 1, a + 8); return [`Andi memiliki x kelereng, lalu diberi ${a} kelereng sehingga totalnya menjadi ${b}. Berapa kelereng Andi semula?`, b - a]; },
                    () => { const x = S.randInt(3, 10); const a = S.randInt(1, x - 1); return [`Budi mempunyai x pensil, lalu meminjamkan ${a} pensil sehingga tersisa ${x - a}. Berapa jumlah pensil Budi semula?`, x]; },
                    () => { const b = S.randInt(2, 5); const result = S.randInt(6, 15); return [`Jumlah buku Dina dan n buku milik Rani adalah ${result}. Jika Dina memiliki ${result - b} buku, berapa buku milik Rani?`, b]; },
                    () => { const a = S.randInt(3, 8); const b = S.randInt(5, 15); return [`Ani memiliki ${a} permen, lalu membeli y permen sehingga jumlahnya menjadi ${a + b}. Berapa permen yang dibeli Ani?`, b]; },
                    () => { const a = S.randInt(2, 6); const b = S.randInt(a + 2, a + 9); return [`Sebuah kotak berisi x bola, kemudian ditambah ${a} bola sehingga totalnya ${b}. Berapa bola awal dalam kotak?`, b - a]; },
                    () => { const x = S.randInt(4, 12); const a = S.randInt(1, x - 1); return [`Sebuah rak awalnya berisi x buku, lalu ${a} buku diambil sehingga tersisa ${x - a} buku. Berapa buku semula?`, x]; },
                    () => { const b = S.randInt(2, 6); const result = S.randInt(7, 18); return [`Total kelereng Riko dan n kelereng Doni adalah ${result}. Jika Riko memiliki ${result - b} kelereng, berapa kelereng Doni?`, b]; },
                    () => { const a = S.randInt(4, 9); const b = S.randInt(6, 16); return [`Jumlah apel Sinta bertambah menjadi ${a + b} setelah ia membeli y apel. Jika sebelumnya ia punya ${a} apel, berapa apel yang dibeli?`, b]; },
                    () => { const a = S.randInt(3, 7); const b = S.randInt(a + 3, a + 10); return [`Uang Dina bertambah ${a} ribu rupiah sehingga totalnya menjadi ${b} ribu rupiah. Berapa uang Dina semula?`, b - a]; },
                    () => { const x = S.randInt(5, 15); const a = S.randInt(2, x - 2); return [`Kotak mainan awalnya berisi x mainan, lalu ${a} mainan rusak sehingga tersisa ${x - a}. Berapa mainan semula?`, x]; },
                    () => { const b = S.randInt(3, 7); const result = S.randInt(10, 20); return [`Jumlah pensil Tono dan n pensil milik Bima adalah ${result}. Jika Tono memiliki ${result - b} pensil, berapa pensil Bima?`, b]; },
                    () => { const a = S.randInt(2, 8); const b = S.randInt(5, 14); return [`Di meja terdapat ${a} buku, lalu ditambah y buku sehingga totalnya ${a + b} buku. Berapa buku yang ditambahkan?`, b]; },
                    () => { const a = S.randInt(3, 6); const b = S.randInt(a + 4, a + 11); return [`Jumlah koin dalam dompet setelah ditambah ${a} koin menjadi ${b} koin. Berapa koin awalnya?`, b - a]; },
                    () => { const x = S.randInt(6, 14); const a = S.randInt(2, x - 2); return [`Tangki air awalnya berisi x liter air, lalu ${a} liter digunakan sehingga tersisa ${x - a} liter. Berapa liter air semula?`, x]; },
                    () => { const b = S.randInt(2, 6); const result = S.randInt(8, 16); return [`Jumlah buku di rak A dan n buku di rak B adalah ${result}. Jika rak A berisi ${result - b} buku, berapa buku di rak B?`, b]; },
                    () => { const a = S.randInt(3, 7); const b = S.randInt(6, 15); return [`Rani memiliki ${a} bunga, lalu membeli y bunga sehingga total bunganya ${a + b}. Berapa bunga yang dibeli Rani?`, b]; },
                    () => { const a = S.randInt(2, 6); const b = S.randInt(a + 5, a + 12); return [`Jumlah kursi di ruangan setelah ditambah ${a} kursi menjadi ${b} kursi. Berapa jumlah kursi semula?`, b - a]; },
                    () => { const x = S.randInt(5, 13); const a = S.randInt(1, x - 2); return [`Gudang berisi x karung beras, lalu ${a} karung diambil sehingga tersisa ${x - a}. Berapa karung semula?`, x]; },
                    () => { const b = S.randInt(3, 8); const result = S.randInt(9, 20); return [`Jumlah mangga milik Ani dan n mangga milik Sari adalah ${result}. Jika Ani memiliki ${result - b} mangga, berapa mangga Sari?`, b]; },
                    () => { const a = S.randInt(4, 8); const b = S.randInt(7, 17); return [`Awalnya ada ${a} botol minum, lalu ditambah y botol sehingga jumlahnya ${a + b}. Berapa botol yang ditambahkan?`, b]; },
                    () => { const a = S.randInt(2, 6); const b = S.randInt(a + 1, a + 8); return [`x + ${a} = ${b}. Nilai x = ...`, b - a]; },
                    () => { const x = S.randInt(3, 10); const a = S.randInt(1, x - 1); return [`x - ${a} = ${x - a}. Nilai x = ...`, x]; },
                    () => { const b = S.randInt(2, 5); const result = S.randInt(6, 15); return [`${result - b} + n = ${result}. Nilai n = ...`, b]; },
                    () => { const a = S.randInt(3, 8); const b = S.randInt(5, 15); return [`${a} + y = ${a + b}. Nilai y = ...`, b]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const x = S.randInt(3, 12); const a = S.randInt(2, 5); return [`Setiap kotak berisi x pensil. Jika ada ${a} kotak dan total pensil ${a * x}, berapa nilai x?`, x]; },
                    () => { const x = S.randInt(4, 10); const a = S.randInt(2, 4); const b = S.randInt(5, 15); return [`${a} kantong masing-masing berisi x kelereng. Setelah ditambah ${b} kelereng, jumlahnya ${a * x + b}. Berapa kelereng di tiap kantong?`, x]; },
                    () => { const x = S.randInt(5, 15); const a = S.randInt(2, 5); const b = S.randInt(3, 10); return [`Ada ${a} rak berisi x buku. Setelah ${b} buku diambil, jumlahnya ${a * x - b}. Berapa buku di tiap rak?`, x]; },
                    () => { const x = S.randInt(6, 18); const d = S.randInt(2, 6); const q = x / d; if (Number.isInteger(q)) return [`Jumlah kue adalah x buah. Jika dibagi rata ke ${d} anak, tiap anak mendapat ${q} kue. Berapa jumlah kue semula?`, x]; return [`2 kotak berisi total ${2 * S.randInt(3, 10)} bola. Berapa isi tiap kotak?`, S.randInt(3, 10)]; },
                    () => { const x = S.randInt(3, 12); const a = S.randInt(2, 6); return [`Satu kantong berisi x permen. Jika ada ${a} kantong dan total permen ${a * x}, berapa permen per kantong?`, x]; },
                    () => { const x = S.randInt(4, 10); const a = S.randInt(2, 5); const b = S.randInt(4, 12); return [`${a} kotak berisi x apel. Setelah ditambah ${b} apel, totalnya ${a * x + b}. Berapa apel tiap kotak?`, x]; },
                    () => { const x = S.randInt(5, 14); const a = S.randInt(2, 4); const b = S.randInt(3, 9); return [`Terdapat ${a} dus berisi x botol. Setelah ${b} botol rusak, tersisa ${a * x - b} botol. Berapa botol tiap dus?`, x]; },
                    () => { const x = S.randInt(6, 18); const d = S.randInt(2, 6); const q = x / d; if (Number.isInteger(q)) return [`Sejumlah x buku dibagi rata ke ${d} rak, masing-masing berisi ${q} buku. Berapa jumlah buku semula?`, x]; return [`3 kantong berisi total ${3 * S.randInt(4, 10)} kelereng. Berapa isi tiap kantong?`, S.randInt(4, 10)]; },
                    () => { const x = S.randInt(3, 11); const a = S.randInt(2, 5); return [`Satu meja memiliki x kursi. Jika ada ${a} meja dan total kursi ${a * x}, berapa kursi per meja?`, x]; },
                    () => { const x = S.randInt(4, 12); const a = S.randInt(2, 4); const b = S.randInt(5, 13); return [`${a} kotak berisi x buku tulis. Setelah ditambah ${b} buku, jumlahnya ${a * x + b}. Berapa buku di tiap kotak?`, x]; },
                    () => { const x = S.randInt(5, 15); const a = S.randInt(2, 6); const b = S.randInt(2, 8); return [`Ada ${a} kantong berisi x kelereng. Setelah ${b} kelereng hilang, jumlahnya ${a * x - b}. Berapa kelereng per kantong?`, x]; },
                    () => { const x = S.randInt(6, 18); const d = S.randInt(2, 6); const q = x / d; if (Number.isInteger(q)) return [`x jeruk dibagi sama rata ke ${d} anak, masing-masing mendapat ${q} jeruk. Berapa jeruk semula?`, x]; return [`4 dus berisi total ${4 * S.randInt(3, 9)} botol. Berapa botol per dus?`, S.randInt(3, 9)]; },
                    () => { const x = S.randInt(3, 12); const a = S.randInt(2, 5); return [`Setiap rak berisi x buku. Jika terdapat ${a} rak dan total buku ${a * x}, berapa buku per rak?`, x]; },
                    () => { const x = S.randInt(4, 11); const a = S.randInt(2, 4); const b = S.randInt(6, 14); return [`${a} kotak berisi x mainan. Setelah ditambah ${b} mainan, jumlahnya ${a * x + b}. Berapa mainan tiap kotak?`, x]; },
                    () => { const x = S.randInt(5, 13); const a = S.randInt(2, 5); const b = S.randInt(3, 9); return [`Ada ${a} kantong berisi x koin. Setelah ${b} koin diambil, totalnya ${a * x - b}. Berapa koin tiap kantong?`, x]; },
                    () => { const x = S.randInt(6, 18); const d = S.randInt(2, 6); const q = x / d; if (Number.isInteger(q)) return [`x liter air dibagi ke ${d} ember, masing-masing berisi ${q} liter. Berapa liter air semula?`, x]; return [`5 kotak berisi total ${5 * S.randInt(2, 8)} bola. Berapa bola tiap kotak?`, S.randInt(2, 8)]; },
                    () => { const x = S.randInt(3, 10); const a = S.randInt(2, 6); return [`Satu paket berisi x pensil. Jika ada ${a} paket dan total pensil ${a * x}, berapa pensil per paket?`, x]; },
                    () => { const x = S.randInt(4, 12); const a = S.randInt(2, 4); const b = S.randInt(5, 15); return [`${a} rak berisi x buku. Setelah ditambah ${b} buku, totalnya ${a * x + b}. Berapa buku tiap rak?`, x]; },
                    () => { const x = S.randInt(5, 14); const a = S.randInt(2, 5); const b = S.randInt(2, 7); return [`Ada ${a} dus berisi x botol. Setelah ${b} botol pecah, tersisa ${a * x - b}. Berapa botol tiap dus?`, x]; },
                    () => { const x = S.randInt(6, 18); const d = S.randInt(2, 6); const q = x / d; if (Number.isInteger(q)) return [`x permen dibagikan sama rata ke ${d} anak, masing-masing mendapat ${q} permen. Berapa permen semula?`, x]; return [`6 kantong berisi total ${6 * S.randInt(3, 7)} kelereng. Berapa isi tiap kantong?`, S.randInt(3, 7)]; },
                    () => { const x = S.randInt(3, 12); const a = S.randInt(2, 5); const result = a * x; return [`${a}x = ${result}. Nilai x = ...`, x]; },
                    () => { const x = S.randInt(4, 10); const a = S.randInt(2, 4); const b = S.randInt(5, 15); return [`${a}x + ${b} = ${a * x + b}. Nilai x = ...`, x]; },
                    () => { const x = S.randInt(5, 15); const a = S.randInt(2, 5); const b = S.randInt(3, 10); return [`${a}x - ${b} = ${a * x - b}. Nilai x = ...`, x]; },
                    () => { const x = S.randInt(6, 18); const divisor = S.randInt(2, 6); const quotient = x / divisor; if (Number.isInteger(quotient)) return [`x ÷ ${divisor} = ${quotient}. Nilai x = ...`, x]; return [`2x = ${2 * S.randInt(3, 10)}. Nilai x = ...`, S.randInt(3, 10)]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const x = S.randInt(2, 10); const a = S.randInt(2, 6); const b = S.randInt(3, 12); return [`Ani membeli ${a} kantong permen, tiap kantong berisi x permen. Setelah ditambah ${b} permen, jumlahnya ${a * x + b}. Berapa permen tiap kantong?`, x]; },
                    () => { const x = S.randInt(3, 8); const a = S.randInt(3, 6); const b = S.randInt(2, 5); return [`Ada ${a} kotak berisi x pensil. Setelah ${b} pensil diambil, jumlahnya ${a * x - b}. Berapa pensil tiap kotak?`, x]; },
                    () => { const x = S.randInt(4, 12); const a = S.randInt(2, 4); return [`Terdapat ${a} rak buku, masing-masing berisi x buku. Jika total buku ${a * x}, berapa buku tiap rak?`, x]; },
                    () => { const x = S.randInt(6, 18); const a = S.randInt(2, 6); const q = x / a; if (Number.isInteger(q)) return [`Sebanyak x kue dibagi rata ke ${a} anak, masing-masing mendapat ${q} kue. Berapa jumlah kue semula?`, x]; return [`2 kotak berisi total ${2 * S.randInt(3, 10)} bola. Berapa isi tiap kotak?`, S.randInt(3, 10)]; },
                    () => { const x = S.randInt(2, 10); const a = S.randInt(2, 5); const b = S.randInt(4, 14); return [`Budi memiliki ${a} dus berisi x botol. Setelah ditambah ${b} botol, jumlahnya ${a * x + b}. Berapa botol tiap dus?`, x]; },
                    () => { const x = S.randInt(3, 9); const a = S.randInt(3, 6); const b = S.randInt(2, 6); return [`Ada ${a} kantong berisi x kelereng. Setelah ${b} kelereng hilang, totalnya ${a * x - b}. Berapa kelereng tiap kantong?`, x]; },
                    () => { const x = S.randInt(4, 12); const a = S.randInt(2, 4); return [`Satu kelas memiliki ${a} meja. Jika tiap meja berisi x buku dan total buku ${a * x}, berapa buku di tiap meja?`, x]; },
                    () => { const x = S.randInt(8, 20); const a = S.randInt(2, 5); const q = x / a; if (Number.isInteger(q)) return [`x jeruk dibagikan sama rata ke ${a} keranjang, tiap keranjang berisi ${q} jeruk. Berapa jeruk semula?`, x]; return [`3 dus berisi total ${3 * S.randInt(4, 9)} apel. Berapa apel tiap dus?`, S.randInt(4, 9)]; },
                    () => { const x = S.randInt(2, 9); const a = S.randInt(2, 6); const b = S.randInt(3, 10); return [`Rani memiliki ${a} kotak mainan, masing-masing berisi x mainan. Setelah ditambah ${b} mainan, jumlahnya ${a * x + b}. Berapa mainan tiap kotak?`, x]; },
                    () => { const x = S.randInt(3, 10); const a = S.randInt(3, 5); const b = S.randInt(2, 7); return [`Terdapat ${a} rak sepatu berisi x pasang sepatu. Setelah ${b} pasang diambil, totalnya ${a * x - b}. Berapa pasang sepatu tiap rak?`, x]; },
                    () => { const x = S.randInt(4, 12); const a = S.randInt(2, 4); return [`Ada ${a} kotak kapur tulis, tiap kotak berisi x kapur. Jika total kapur ${a * x}, berapa kapur tiap kotak?`, x]; },
                    () => { const x = S.randInt(6, 18); const a = S.randInt(2, 6); const q = x / a; if (Number.isInteger(q)) return [`x liter air dibagi rata ke ${a} ember, masing-masing berisi ${q} liter. Berapa liter air semula?`, x]; return [`4 ember berisi total ${4 * S.randInt(3, 8)} liter air. Berapa liter tiap ember?`, S.randInt(3, 8)]; },
                    () => { const x = S.randInt(2, 10); const a = S.randInt(2, 5); const b = S.randInt(5, 15); return [`Sinta menyusun ${a} rak buku, tiap rak berisi x buku. Setelah ditambah ${b} buku, jumlahnya ${a * x + b}. Berapa buku tiap rak?`, x]; },
                    () => { const x = S.randInt(3, 9); const a = S.randInt(3, 6); const b = S.randInt(2, 6); return [`Ada ${a} kantin kecil, masing-masing memiliki x meja. Setelah ${b} meja dipindah, totalnya ${a * x - b}. Berapa meja tiap kantin?`, x]; },
                    () => { const x = S.randInt(4, 11); const a = S.randInt(2, 4); return [`Di gudang terdapat ${a} tumpukan karung, tiap tumpukan berisi x karung. Jika totalnya ${a * x}, berapa karung tiap tumpukan?`, x]; },
                    () => { const x = S.randInt(6, 20); const a = S.randInt(2, 5); const q = x / a; if (Number.isInteger(q)) return [`x buku dibagi sama rata ke ${a} siswa, masing-masing mendapat ${q} buku. Berapa buku semula?`, x]; return [`5 paket berisi total ${5 * S.randInt(2, 7)} buku. Berapa buku tiap paket?`, S.randInt(2, 7)]; },
                    () => { const x = S.randInt(2, 9); const a = S.randInt(2, 6); const b = S.randInt(4, 11); return [`Terdapat ${a} laci berisi x alat tulis. Setelah ditambah ${b} alat tulis, jumlahnya ${a * x + b}. Berapa alat tulis tiap laci?`, x]; },
                    () => { const x = S.randInt(3, 10); const a = S.randInt(3, 5); const b = S.randInt(2, 6); return [`Ada ${a} rak berisi x botol minum. Setelah ${b} botol rusak, tersisa ${a * x - b}. Berapa botol tiap rak?`, x]; },
                    () => { const x = S.randInt(4, 12); const a = S.randInt(2, 4); return [`Sebuah toko memiliki ${a} etalase, masing-masing berisi x barang. Jika total barang ${a * x}, berapa barang tiap etalase?`, x]; },
                    () => { const x = S.randInt(6, 18); const a = S.randInt(2, 6); const q = x / a; if (Number.isInteger(q)) return [`x permen dibagi rata ke ${a} anak, masing-masing mendapat ${q} permen. Berapa permen semula?`, x]; return [`6 kantong berisi total ${6 * S.randInt(3, 6)} permen. Berapa permen tiap kantong?`, S.randInt(3, 6)]; },
                    () => { const x = S.randInt(2, 10); const a = S.randInt(2, 6); const b = S.randInt(3, 12); return [`${a}x + ${b} = ${a * x + b}. Nilai x = ...`, x]; },
                    () => { const x = S.randInt(3, 8); const a = S.randInt(3, 6); const b = S.randInt(2, 5); const c = S.randInt(5, 15); return [`${a}x - ${b} = ${a * x - b}. Nilai x = ...`, x]; },
                    () => { const x = S.randInt(4, 12); const a = S.randInt(2, 4); const b = S.randInt(10, 30); return [`${a}x = ${a * x}. Nilai x = ...`, x]; },
                    () => { const x = S.randInt(5, 15); const a = S.randInt(2, 5); return [`x/${a} = ${x / a}. Nilai x = ... (jika habis dibagi)`, x]; },
                ];
                break;
        }
    }
    else if (subMode === "Pola Bilangan") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const start = S.randInt(1, 5); const step = S.randInt(1, 3); return [`Ani menata kelereng berurutan: ${start}, ${start + step}, ${start + 2 * step}, ${start + 3 * step}, ... Kelereng berikutnya berjumlah ...`, start + 4 * step]; },
                    () => { const start = S.randInt(2, 6); const step = S.randInt(2, 4); return [`Jumlah kursi di tiap baris adalah ${start}, ${start + step}, ${start + 2 * step}, ... Banyak kursi pada baris ke-4 adalah ...`, start + 3 * step]; },
                    () => { const start = S.randInt(1, 3); const step = 2; return [`Jumlah lampu menyala bertambah dengan pola ganjil: ${start}, ${start + step}, ${start + 2 * step}, ... Jumlah lampu berikutnya adalah ...`, start + 3 * step]; },
                    () => { const start = S.randInt(3, 7); const step = S.randInt(1, 3); return [`Rani mencatat jumlah buku per hari: ${start}, ${start + step}, ${start + 2 * step}, ${start + 3 * step}, ... Jumlah buku hari berikutnya adalah ...`, start + 4 * step]; },
                    () => { const start = S.randInt(2, 5); const step = S.randInt(2, 5); return [`Jumlah pengunjung toko tiap jam adalah ${start}, ${start + step}, ${start + 2 * step}, ... Banyak pengunjung pada jam ke-4 adalah ...`, start + 3 * step]; },
                    () => { const start = S.randInt(1, 4); const step = 2; return [`Jumlah koin yang dikumpulkan membentuk pola: ${start}, ${start + step}, ${start + 2 * step}, ... Jumlah koin berikutnya adalah ...`, start + 3 * step]; },
                    () => { const start = S.randInt(4, 8); const step = S.randInt(1, 4); return [`Banyak pohon di tiap baris adalah ${start}, ${start + step}, ${start + 2 * step}, ${start + 3 * step}, ... Banyak pohon selanjutnya adalah ...`, start + 4 * step]; },
                    () => { const start = S.randInt(2, 6); const step = S.randInt(3, 6); return [`Tabungan Dina bertambah teratur: ${start}, ${start + step}, ${start + 2 * step}, ... Tabungan pada urutan ke-4 adalah ...`, start + 3 * step]; },
                    () => { const start = S.randInt(1, 5); const step = 1; return [`Jumlah siswa hadir bertambah satu-satu: ${start}, ${start + step}, ${start + 2 * step}, ... Jumlah siswa berikutnya adalah ...`, start + 3 * step]; },
                    () => { const start = S.randInt(3, 6); const step = 2; return [`Jumlah langkah Riko setiap hari: ${start}, ${start + step}, ${start + 2 * step}, ${start + 3 * step}, ... Jumlah langkah berikutnya adalah ...`, start + 4 * step]; },
                    () => { const start = S.randInt(2, 4); const step = S.randInt(2, 3); return [`Jumlah apel di keranjang bertambah: ${start}, ${start + step}, ${start + 2 * step}, ... Banyak apel pada urutan ke-4 adalah ...`, start + 3 * step]; },
                    () => { const start = S.randInt(5, 9); const step = S.randInt(1, 3); return [`Jumlah halaman yang dibaca tiap hari: ${start}, ${start + step}, ${start + 2 * step}, ${start + 3 * step}, ... Halaman hari berikutnya adalah ...`, start + 4 * step]; },
                    () => { const start = S.randInt(1, 3); const step = 2; return [`Pola loncatan katak adalah ${start}, ${start + step}, ${start + 2 * step}, ... Loncatan berikutnya adalah ...`, start + 3 * step]; },
                    () => { const start = S.randInt(4, 7); const step = S.randInt(2, 4); return [`Jumlah kursi di aula disusun bertambah: ${start}, ${start + step}, ${start + 2 * step}, ... Jumlah kursi ke-4 adalah ...`, start + 3 * step]; },
                    () => { const start = S.randInt(2, 5); const step = 3; return [`Jumlah kue yang dipanggang bertahap: ${start}, ${start + step}, ${start + 2 * step}, ${start + 3 * step}, ... Jumlah kue berikutnya adalah ...`, start + 4 * step]; },
                    () => { const start = S.randInt(1, 4); const step = S.randInt(1, 2); return [`Jumlah pensil di kotak bertambah: ${start}, ${start + step}, ${start + 2 * step}, ... Banyak pensil berikutnya adalah ...`, start + 3 * step]; },
                    () => { const start = S.randInt(3, 6); const step = 2; return [`Jumlah tanaman yang tumbuh tiap minggu: ${start}, ${start + step}, ${start + 2 * step}, ${start + 3 * step}, ... Jumlah tanaman selanjutnya adalah ...`, start + 4 * step]; },
                    () => { const start = S.randInt(2, 6); const step = S.randInt(2, 5); return [`Banyak botol minum disusun berurutan: ${start}, ${start + step}, ${start + 2 * step}, ... Banyak botol ke-4 adalah ...`, start + 3 * step]; },
                    () => { const start = S.randInt(1, 5); const step = 2; return [`Jumlah bintang yang terlihat membentuk pola: ${start}, ${start + step}, ${start + 2 * step}, ... Jumlah bintang berikutnya adalah ...`, start + 3 * step]; },
                    () => { const start = S.randInt(4, 8); const step = S.randInt(1, 3); return [`Jumlah kotak yang disusun bertambah: ${start}, ${start + step}, ${start + 2 * step}, ${start + 3 * step}, ... Jumlah kotak selanjutnya adalah ...`, start + 4 * step]; },
                    () => { const start = S.randInt(1, 5); const step = S.randInt(1, 3); return [`Pola: ${start}, ${start + step}, ${start + 2 * step}, ${start + 3 * step}, ... Bilangan selanjutnya adalah ...`, start + 4 * step]; },
                    () => { const start = S.randInt(2, 6); const step = S.randInt(2, 4); return [`Pola: ${start}, ${start + step}, ${start + 2 * step}, ... Bilangan ke-4 adalah ...`, start + 3 * step]; },
                    () => { const start = S.randInt(1, 3); const step = 2; return [`Pola bilangan ganjil: ${start}, ${start + step}, ${start + 2 * step}, ... Bilangan selanjutnya adalah ...`, start + 3 * step]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const start = S.randInt(1, 5); const step = S.randInt(3, 6); return [`Ani menyusun balok dengan pola jumlah: ${start}, ${start + step}, ${start + 2 * step}, ... Banyak balok pada susunan ke-5 adalah ...`, start + 4 * step]; },
                    () => { const a = S.randInt(2, 5); return [`Jumlah koin Rani berlipat ganda: ${a}, ${a * 2}, ${a * 4}, ${a * 8}, ... Jumlah koin berikutnya adalah ...`, a * 16]; },
                    () => { const start = S.randInt(5, 10); const step = S.randInt(4, 8); return [`Jumlah kursi di aula bertambah teratur: ${start}, ${start + step}, ${start + 2 * step}, ... Banyak kursi pada baris ke-6 adalah ...`, start + 5 * step]; },
                    () => { const base = S.randInt(2, 4); return [`Jumlah bakteri berkembang: 1, ${base}, ${base * base}, ${base * base * base}, ... Jumlah bakteri berikutnya adalah ...`, base * base * base * base]; },
                    () => { const start = S.randInt(2, 6); const step = S.randInt(3, 7); return [`Banyak pengunjung pameran tiap jam: ${start}, ${start + step}, ${start + 2 * step}, ... Jumlah pengunjung jam ke-5 adalah ...`, start + 4 * step]; },
                    () => { const a = S.randInt(3, 6); return [`Tabungan Dina selalu dua kali lipat: ${a}, ${a * 2}, ${a * 4}, ${a * 8}, ... Tabungan berikutnya adalah ...`, a * 16]; },
                    () => { const start = S.randInt(6, 12); const step = S.randInt(5, 9); return [`Jumlah halaman buku yang dibaca per hari: ${start}, ${start + step}, ${start + 2 * step}, ... Halaman pada hari ke-6 adalah ...`, start + 5 * step]; },
                    () => { const base = S.randInt(2, 5); return [`Jumlah sel membelah diri: 1, ${base}, ${base * base}, ${base * base * base}, ... Jumlah sel berikutnya adalah ...`, base ** 4]; },
                    () => { const start = S.randInt(3, 7); const step = S.randInt(4, 6); return [`Jumlah kursi disusun bertahap: ${start}, ${start + step}, ${start + 2 * step}, ... Banyak kursi pada susunan ke-5 adalah ...`, start + 4 * step]; },
                    () => { const a = S.randInt(2, 4); return [`Jumlah pohon ditanam berlipat: ${a}, ${a * 2}, ${a * 4}, ${a * 8}, ... Jumlah pohon selanjutnya adalah ...`, a * 16]; },
                    () => { const start = S.randInt(4, 9); const step = S.randInt(3, 8); return [`Jumlah botol minum di gudang bertambah: ${start}, ${start + step}, ${start + 2 * step}, ... Jumlah botol ke-6 adalah ...`, start + 5 * step]; },
                    () => { const base = S.randInt(2, 4); return [`Pertumbuhan jamur mengikuti pola: 1, ${base}, ${base * base}, ${base * base * base}, ... Jumlah jamur berikutnya adalah ...`, base ** 4]; },
                    () => { const start = S.randInt(5, 11); const step = S.randInt(4, 7); return [`Jumlah penonton pertandingan bertambah: ${start}, ${start + step}, ${start + 2 * step}, ... Penonton pada urutan ke-5 adalah ...`, start + 4 * step]; },
                    () => { const a = S.randInt(3, 5); return [`Jumlah hadiah dilipatgandakan: ${a}, ${a * 2}, ${a * 4}, ${a * 8}, ... Jumlah hadiah berikutnya adalah ...`, a * 16]; },
                    () => { const start = S.randInt(6, 10); const step = S.randInt(5, 8); return [`Jumlah kendaraan parkir bertambah: ${start}, ${start + step}, ${start + 2 * step}, ... Kendaraan pada urutan ke-6 adalah ...`, start + 5 * step]; },
                    () => { const base = S.randInt(2, 3); return [`Jumlah virus menyebar: 1, ${base}, ${base * base}, ${base * base * base}, ... Jumlah virus berikutnya adalah ...`, base ** 4]; },
                    () => { const start = S.randInt(2, 6); const step = S.randInt(3, 6); return [`Jumlah buku di rak bertambah teratur: ${start}, ${start + step}, ${start + 2 * step}, ... Banyak buku pada rak ke-5 adalah ...`, start + 4 * step]; },
                    () => { const a = S.randInt(2, 6); return [`Jumlah uang tabungan selalu dua kali lipat: ${a}, ${a * 2}, ${a * 4}, ${a * 8}, ... Tabungan berikutnya adalah ...`, a * 16]; },
                    () => { const start = S.randInt(7, 12); const step = S.randInt(4, 9); return [`Jumlah penumpang bus bertambah: ${start}, ${start + step}, ${start + 2 * step}, ... Penumpang ke-6 adalah ...`, start + 5 * step]; },
                    () => { const base = S.randInt(2, 4); return [`Pola perkembangbiakan tanaman: 1, ${base}, ${base * base}, ${base * base * base}, ... Jumlah tanaman berikutnya adalah ...`, base ** 4]; },
                    () => { const start = S.randInt(1, 5); const step = S.randInt(3, 6); return [`Pola: ${start}, ${start + step}, ${start + 2 * step}, ... Suku ke-5 adalah ...`, start + 4 * step]; },
                    () => { const a = S.randInt(2, 5); return [`Pola: ${a}, ${a * 2}, ${a * 4}, ${a * 8}, ... Bilangan selanjutnya adalah ...`, a * 16]; },
                    () => { const start = S.randInt(5, 10); const step = S.randInt(4, 8); return [`Pola: ${start}, ${start + step}, ${start + 2 * step}, ... Suku ke-6 adalah ...`, start + 5 * step]; },
                    () => { const base = S.randInt(2, 4); return [`Pola: 1, ${base}, ${base * base}, ${base * base * base}, ... Bilangan selanjutnya adalah ...`, base * base * base * base]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const n = S.randInt(5, 10); const a = S.randInt(2, 5); const b = S.randInt(1, 8); return [`Jumlah pensil pada barisan mengikuti rumus Un = ${a}n + ${b}. Banyak pensil pada susunan ke-${n} adalah ...`, a * n + b]; },
                    () => { const n = S.randInt(4, 8); const a = S.randInt(2, 4); const b = S.randInt(1, 5); return [`Jumlah kursi pada barisan mengikuti rumus Un = ${a}n - ${b}. Banyak kursi pada barisan ke-${n} adalah ...`, a * n - b]; },
                    () => { const start = S.randInt(3, 8); const step = S.randInt(5, 10); return [`Jumlah buku di rak membentuk barisan: ${start}, ${start + step}, ${start + 2 * step}, ... Banyak buku pada rak ke-7 adalah ...`, start + 6 * step]; },
                    () => { const a = 2; const n = S.randInt(4, 6); return [`Jumlah bakteri berkembang: 2, 4, 8, 16, ... Jumlah bakteri pada tahap ke-${n} adalah ...`, Math.pow(a, n)]; },
                    () => { const n = S.randInt(6, 12); const a = S.randInt(3, 6); const b = S.randInt(2, 9); return [`Jumlah kelereng mengikuti rumus Un = ${a}n + ${b}. Banyak kelereng pada urutan ke-${n} adalah ...`, a * n + b]; },
                    () => { const n = S.randInt(5, 9); const a = S.randInt(2, 5); const b = S.randInt(1, 6); return [`Jumlah pengunjung bertambah dengan rumus Un = ${a}n - ${b}. Banyak pengunjung ke-${n} adalah ...`, a * n - b]; },
                    () => { const start = S.randInt(4, 9); const step = S.randInt(6, 12); return [`Jumlah botol disusun berurutan: ${start}, ${start + step}, ${start + 2 * step}, ... Banyak botol pada susunan ke-7 adalah ...`, start + 6 * step]; },
                    () => { const a = 3; const n = S.randInt(3, 5); return [`Jumlah sel berkembang: 3, 9, 27, ... Jumlah sel pada tahap ke-${n} adalah ...`, Math.pow(a, n)]; },
                    () => { const n = S.randInt(5, 11); const a = S.randInt(2, 6); const b = S.randInt(3, 10); return [`Jumlah halaman buku mengikuti rumus Un = ${a}n + ${b}. Halaman pada hari ke-${n} adalah ...`, a * n + b]; },
                    () => { const n = S.randInt(4, 8); const a = S.randInt(3, 5); const b = S.randInt(1, 7); return [`Jumlah kendaraan parkir mengikuti rumus Un = ${a}n - ${b}. Kendaraan ke-${n} adalah ...`, a * n - b]; },
                    () => { const start = S.randInt(5, 10); const step = S.randInt(4, 9); return [`Jumlah siswa hadir tiap hari: ${start}, ${start + step}, ${start + 2 * step}, ... Jumlah siswa hari ke-7 adalah ...`, start + 6 * step]; },
                    () => { const a = 4; const n = S.randInt(3, 5); return [`Jumlah virus menyebar: 4, 16, 64, ... Jumlah virus pada tahap ke-${n} adalah ...`, Math.pow(a, n)]; },
                    () => { const n = S.randInt(6, 10); const a = S.randInt(2, 5); const b = S.randInt(2, 8); return [`Jumlah kursi aula mengikuti rumus Un = ${a}n + ${b}. Jumlah kursi pada barisan ke-${n} adalah ...`, a * n + b]; },
                    () => { const n = S.randInt(5, 9); const a = S.randInt(3, 6); const b = S.randInt(1, 6); return [`Jumlah buku perpustakaan mengikuti rumus Un = ${a}n - ${b}. Buku ke-${n} adalah ...`, a * n - b]; },
                    () => { const start = S.randInt(6, 12); const step = S.randInt(5, 10); return [`Jumlah pohon ditanam berurutan: ${start}, ${start + step}, ${start + 2 * step}, ... Jumlah pohon ke-7 adalah ...`, start + 6 * step]; },
                    () => { const a = 5; const n = S.randInt(3, 4); return [`Jumlah bakteri berkembang cepat: 5, 25, 125, ... Jumlah bakteri tahap ke-${n} adalah ...`, Math.pow(a, n)]; },
                    () => { const n = S.randInt(5, 12); const a = S.randInt(2, 4); const b = S.randInt(3, 9); return [`Jumlah penonton mengikuti rumus Un = ${a}n + ${b}. Penonton pada urutan ke-${n} adalah ...`, a * n + b]; },
                    () => { const n = S.randInt(4, 8); const a = S.randInt(3, 5); const b = S.randInt(1, 5); return [`Jumlah kendaraan keluar parkiran mengikuti rumus Un = ${a}n - ${b}. Kendaraan ke-${n} adalah ...`, a * n - b]; },
                    () => { const start = S.randInt(4, 8); const step = S.randInt(6, 11); return [`Jumlah meja di aula bertambah: ${start}, ${start + step}, ${start + 2 * step}, ... Jumlah meja ke-7 adalah ...`, start + 6 * step]; },
                    () => { const a = 2; const n = S.randInt(5, 7); return [`Jumlah sel membelah: 2, 4, 8, 16, ... Jumlah sel pada tahap ke-${n} adalah ...`, Math.pow(a, n)]; },
                    () => { const n = S.randInt(5, 10); const a = S.randInt(2, 5); const b = S.randInt(1, 8); return [`Rumus suku ke-n: Un = ${a}n + ${b}. Suku ke-${n} = ...`, a * n + b]; },
                    () => { const n = S.randInt(4, 8); const a = S.randInt(2, 4); const b = S.randInt(1, 5); return [`Rumus suku ke-n: Un = ${a}n - ${b}. Suku ke-${n} = ...`, a * n - b]; },
                    () => { const start = S.randInt(3, 8); const step = S.randInt(5, 10); return [`Barisan aritmetika: ${start}, ${start + step}, ${start + 2 * step}, ... Suku ke-7 = ...`, start + 6 * step]; },
                    () => { const a = 2; const n = S.randInt(4, 6); return [`Barisan geometri: 2, 4, 8, 16, ... Suku ke-${n} = ...`, Math.pow(a, n)]; },
                ];
                break;
        }
    }

    return questions;
}

function generateTimeQuestions(grade, subMode) {
    const S = StoryMode;
    let questions = [];

    if (subMode === "Baca Jam") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const jam = S.randInt(6, 10); return [`Pagi hari, Ani bangun tidur saat jarum pendek menunjuk angka ${jam} dan jarum panjang di angka 12. Pukul berapa Ani bangun?`, jam]; },
                    () => { const jam = S.randInt(7, 11); return [`Budi mulai belajar pukul ${jam}.00 pagi. Satu jam kemudian, pukul berapa Budi selesai belajar?`, jam + 1]; },
                    () => { const jam = S.randInt(8, 12); return [`Siti berangkat ke sekolah pukul ${jam}.00. Dua jam kemudian ia sampai di rumah nenek. Pukul berapa Siti sampai?`, jam + 2 > 12 ? jam + 2 - 12 : jam + 2]; },
                    () => { const jam = S.randInt(9, 12); return [`Jam dinding di ruang tamu menunjukkan pukul ${jam}.00. Tiga jam yang lalu, pukul berapa jam tersebut menunjukkan waktu?`, jam - 3 <= 0 ? jam - 3 + 12 : jam - 3]; },
                    () => { const jam24 = S.randInt(13, 18); return [`Acara lomba dimulai pukul ${jam24}.00. Jika ditulis dalam sistem 12 jam, pukul berapa acara tersebut dimulai?`, jam24 - 12]; },
                    () => { const jam = S.randInt(1, 6); return [`Dina tidur siang pukul ${jam}.00 siang. Tepat 12 jam kemudian, jam menunjukkan pukul berapa?`, jam]; },
                    () => { const jam = S.randInt(7, 10); return [`Ayah berangkat bekerja pukul ${jam}.00 pagi dan pulang 4 jam kemudian. Pukul berapa Ayah pulang?`, jam + 4 > 12 ? jam + 4 - 12 : jam + 4]; },
                    () => { const jam = S.randInt(8, 12); return [`Sekarang jam menunjukkan pukul ${jam}.00. Jika waktu dimundurkan 2 jam, jam menunjukkan pukul berapa?`, jam - 2 <= 0 ? jam - 2 + 12 : jam - 2]; },
                    () => { const jam = S.randInt(6, 9); return [`Rina mulai mengerjakan PR pukul ${jam}.00 dan selesai 3 jam kemudian. Pukul berapa Rina selesai mengerjakan PR?`, jam + 3]; },
                    () => { const jam24 = S.randInt(14, 22); return [`Film diputar pada pukul ${jam24}.00. Dalam sistem 12 jam, pukul berapa film tersebut dimulai?`, jam24 - 12]; },
                    () => { const jam = S.randInt(9, 12); return [`Jam kelas menunjukkan pukul ${jam}.00. Lima jam kemudian, jam menunjukkan pukul berapa?`, jam + 5 > 12 ? jam + 5 - 12 : jam + 5]; },
                    () => { const jam = S.randInt(1, 5); return [`Tono tidur malam pukul ${jam}.00 dini hari. Tepat 12 jam setelah itu, jam menunjukkan pukul berapa?`, jam]; },
                    () => { const jam = S.randInt(7, 11); return [`Ibu mulai memasak pukul ${jam}.00 pagi dan selesai 2 jam kemudian. Pukul berapa Ibu selesai memasak?`, jam + 2]; },
                    () => { const jam = S.randInt(8, 12); return [`Sekarang jam menunjukkan pukul ${jam}.00. Empat jam yang lalu menunjukkan pukul berapa?`, jam - 4 <= 0 ? jam - 4 + 12 : jam - 4]; },
                    () => { const jam = S.randInt(6, 10); return [`Doni berolahraga pukul ${jam}.00 pagi dan beristirahat 1 jam kemudian. Pukul berapa Doni beristirahat?`, jam + 1]; },
                    () => { const jam24 = S.randInt(13, 19); return [`Kereta berangkat pukul ${jam24}.00. Jika ditulis dengan jam biasa, pukul berapa kereta berangkat?`, jam24 - 12]; },
                    () => { const jam = S.randInt(10, 12); return [`Jam menunjukkan pukul ${jam}.00. Dua jam lagi jam akan menunjukkan pukul berapa?`, jam + 2 > 12 ? jam + 2 - 12 : jam + 2]; },
                    () => { const jam = S.randInt(7, 11); return [`Lani mulai menonton TV pukul ${jam}.00 dan berhenti 3 jam kemudian. Pukul berapa Lani berhenti menonton?`, jam + 3 > 12 ? jam + 3 - 12 : jam + 3]; },
                    () => { const jam = S.randInt(8, 12); return [`Sekarang pukul ${jam}.00. Jika waktu dimajukan 6 jam, jam menunjukkan pukul berapa?`, jam + 6 > 12 ? jam + 6 - 12 : jam + 6]; },
                    () => { const jam = S.randInt(1, 6); return [`Jam berapa waktu yang ditunjukkan 12 jam setelah pukul ${jam}.00 siang?`, jam]; },
                    () => { const jam = S.randInt(7, 12); return [`Jarum pendek di angka ${jam}, jarum panjang di angka 12. Jam berapa?`, jam]; },
                    () => { const jam = S.randInt(1, 12); return [`Jam menunjukkan pukul ${jam}.00. Dalam 1 jam akan menunjukkan pukul berapa?`, jam === 12 ? 1 : jam + 1]; },
                    () => { const jam = S.randInt(8, 11); return [`${S.randName()} bangun pukul ${jam}.00. Sekarang sudah 2 jam kemudian. Jam berapa sekarang?`, jam + 2]; },
                    () => { const jam24 = S.randInt(13, 18); return [`Pukul ${jam24}.00 sama dengan pukul berapa siang/sore?`, jam24 - 12]; },
                    () => { const jam = S.randInt(1, 6); return [`Jam berapa 12 jam setelah pukul ${jam}.00 pagi?`, jam]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const jam = S.randInt(7, 10); const menit = S.randInt(1, 4) * 15; return [`Di ruang kelas, jam dinding menunjukkan jarum pendek di angka ${jam} dan jarum panjang di angka ${menit / 5}. Pukul berapa tepatnya jam tersebut?`, `${jam}.${menit}`]; },
                    () => { const jam = S.randInt(6, 9); const menit = 30; return [`Ani melihat jam di dapur menunjukkan pukul ${jam}.${menit}. Dalam satu jam, pukul berapa Ani akan makan siang?`, `${jam + 1}.${menit}`]; },
                    () => { const jam = S.randInt(14, 20); return [`Acara televisi dimulai pukul ${jam}.30. Jika ditulis dalam format 12 jam, pukul berapa acara tersebut dimulai?`, jam - 12]; },
                    () => { const jam = S.randInt(1, 11); return [`Budi mulai belajar pukul ${jam}.00 dan berhenti tepat pukul ${jam + 1}.00. Berapa menit Budi belajar?`, 60]; },
                    () => { const jam = S.randInt(8, 11); const menit = 45; return [`Jam di rumah Siti menunjukkan pukul ${jam}.${menit}. Jarum panjang berada di angka berapa?`, menit / 5]; },
                    () => { const jam = S.randInt(15, 21); return [`Kereta berangkat pukul ${jam}.30 sore. Jika diubah ke jam biasa, pukul berapa kereta berangkat?`, jam - 12]; },
                    () => { const jam = S.randInt(2, 10); return [`Donu bermain sepeda dari pukul ${jam}.00 sampai pukul ${jam + 1}.00. Berapa menit Donu bermain sepeda?`, 60]; },
                    () => { const jam = S.randInt(7, 10); const menit = 15; return [`Jam dinding di kelas menunjukkan pukul ${jam}.${menit}. Jarum panjang menunjuk angka berapa?`, menit / 5]; },
                    () => { const jam = S.randInt(16, 22); return [`Film favorit Rani mulai pukul ${jam}.30. Jika ditulis dengan jam 12 jam, pukul berapa film dimulai?`, jam - 12]; },
                    () => { const jam = S.randInt(3, 9); return [`Ibu memasak dari pukul ${jam}.00 hingga pukul ${jam + 1}.00. Berapa menit waktu memasak Ibu?`, 60]; },
                    () => { const jam = S.randInt(8, 11); const menit = S.randInt(1, 4) * 15; return [`Jarum pendek jam berada di angka ${jam} dan jarum panjang di angka ${menit / 5}. Pukul berapa waktu yang ditunjukkan jam tersebut?`, `${jam}.${menit}`]; },
                    () => { const jam = S.randInt(13, 19); return [`Latihan dimulai pukul ${jam}.30. Jika ditulis dalam format jam pagi/sore, pukul berapa latihan dimulai?`, jam - 12]; },
                    () => { const jam = S.randInt(4, 10); return [`Andi membaca buku dari pukul ${jam}.00 sampai ${jam + 1}.00. Berapa menit Andi membaca buku?`, 60]; },
                    () => { const jam = S.randInt(6, 9); const menit = 45; return [`Jam di ruang tamu menunjukkan pukul ${jam}.${menit}. Jarum panjang berada di angka berapa?`, menit / 5]; },
                    () => { const jam = S.randInt(14, 20); return [`Pertandingan dimulai pukul ${jam}.30. Dalam sistem 12 jam, pukul berapa pertandingan dimulai?`, jam - 12]; },
                    () => { const jam = S.randInt(7, 10); const menit = S.randInt(1, 4) * 15; return [`Jarum pendek di ${jam} dan jarum panjang di ${menit / 5}. Jam berapa menit?`, menit]; },
                    () => { const jam = S.randInt(14, 20); return [`Pukul ${jam}.30 dalam format 12 jam adalah pukul berapa?`, jam - 12]; },
                    () => { const jam = S.randInt(1, 11); return [`Berapa menit dari pukul ${jam}.00 sampai pukul ${jam + 1}.00?`, 60]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const jam = S.randInt(8, 15); const menit = S.randInt(10, 50); return [`Ani mulai belajar pukul ${jam}.${menit.toString().padStart(2, '0')}. Ia belajar selama 45 menit. Menit pada jam sekarang menjadi berapa? (hanya menit)`, (menit + 45) % 60]; },
                    () => { return [`Budi berangkat tidur pukul 23.30. Ia tidur selama 2 jam 45 menit. Sekarang pukul berapa? (jawab jamnya saja)`, 2]; },
                    () => { const jam = S.randInt(7, 14); const menit = S.randInt(5, 40); return [`Siti mulai membaca buku pukul ${jam}.${menit.toString().padStart(2, '0')}. Setelah 30 menit, menit pada jam menunjukkan angka berapa?`, (menit + 30) % 60]; },
                    () => { return [`Film malam dimulai pukul 22.15 dan berlangsung 3 jam. Film selesai pukul berapa? (jawab jamnya saja)`, 1]; },
                    () => { const jam = S.randInt(9, 16); const menit = S.randInt(20, 55); return [`Rani mulai mengerjakan PR pukul ${jam}.${menit.toString().padStart(2, '0')}. Setelah 35 menit, menitnya menjadi berapa?`, (menit + 35) % 60]; },
                    () => { return [`Ayah berangkat kerja pukul 21.40 dan perjalanan memakan waktu 2 jam 30 menit. Tiba pukul berapa? (jawab jamnya saja)`, 0]; },
                    () => { const jam = S.randInt(6, 12); const menit = S.randInt(15, 45); return [`Doni mulai bersepeda pukul ${jam}.${menit.toString().padStart(2, '0')}. Ia bersepeda selama 40 menit. Menit akhirnya berapa?`, (menit + 40) % 60]; },
                    () => { return [`Acara TV dimulai pukul 20.45 dan berlangsung 4 jam. Acara berakhir pukul berapa? (jawab jamnya saja)`, 0]; },
                    () => { const jam = S.randInt(8, 14); const menit = S.randInt(10, 50); return [`Ibu memasak pukul ${jam}.${menit.toString().padStart(2, '0')}. Setelah 25 menit, menit pada jam menunjukkan berapa?`, (menit + 25) % 60]; },
                    () => { return [`Kereta berangkat pukul 23.20 dan tiba setelah 1 jam 50 menit. Kereta tiba pukul berapa? (jawab jamnya saja)`, 1]; },
                    () => { const jam = S.randInt(7, 13); const menit = S.randInt(20, 55); return [`Tono mulai bermain game pukul ${jam}.${menit.toString().padStart(2, '0')}. Ia bermain selama 50 menit. Menit akhirnya menjadi berapa?`, (menit + 50) % 60]; },
                    () => { return [`Pertandingan dimulai pukul 18.30 dan berlangsung 6 jam. Pertandingan selesai pukul berapa? (jawab jamnya saja)`, 0]; },
                    () => { const jam = S.randInt(10, 16); const menit = S.randInt(5, 35); return [`Nina mulai menggambar pukul ${jam}.${menit.toString().padStart(2, '0')}. Setelah 15 menit, menitnya menjadi berapa?`, (menit + 15) % 60]; },
                    () => { return [`Kakak mulai belajar pukul 19.50 dan belajar selama 3 jam. Kakak selesai belajar pukul berapa? (jawab jamnya saja)`, 22]; },
                    () => { const jam = S.randInt(6, 12); const menit = S.randInt(15, 55); return [`Adi mulai membersihkan kamar pukul ${jam}.${menit.toString().padStart(2, '0')}. Setelah 55 menit, menit pada jam menjadi berapa?`, (menit + 55) % 60]; },
                    () => { return [`Bus berangkat pukul 23.45 dan perjalanan memakan waktu 1 jam 30 menit. Bus tiba pukul berapa? (jawab jamnya saja)`, 1]; },
                    () => { const jam = S.randInt(9, 15); const menit = S.randInt(10, 40); return [`Lina mulai menonton kartun pukul ${jam}.${menit.toString().padStart(2, '0')}. Setelah 20 menit, menit akhirnya berapa?`, (menit + 20) % 60]; },
                    () => { return [`Paman berangkat pukul 17.20 dan tiba setelah 7 jam. Paman tiba pukul berapa? (jawab jamnya saja)`, 0]; },
                    () => { const jam = S.randInt(8, 14); const menit = S.randInt(25, 55); return [`Tari mulai latihan menari pukul ${jam}.${menit.toString().padStart(2, '0')}. Setelah 35 menit, menit jam menunjukkan berapa?`, (menit + 35) % 60]; },
                    () => { return [`Pesawat lepas landas pukul 22.10 dan terbang selama 4 jam 30 menit. Pesawat mendarat pukul berapa? (jawab jamnya saja)`, 2]; },
                    () => { const jam = S.randInt(8, 15); const menit = S.randInt(10, 50); return [`Pukul ${jam}.${menit.toString().padStart(2, '0')} ditambah 45 menit. Menitnya jadi berapa? (hanya menit)`, (menit + 45) % 60]; },
                    () => { return [`Pukul 23.30 + 2 jam 45 menit = pukul berapa? (jawab jamnya saja)`, 2]; },
                ];
                break;
        }
    }
    else if (subMode === "Tambah & Kurang Waktu") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const jam = S.randInt(7, 10); const tambah = S.randInt(1, 3); return [`${S.randName()} mulai belajar jam ${jam}. Belajar ${tambah} jam. Selesai jam berapa?`, jam + tambah]; },
                    () => { const jam = S.randInt(10, 14); const kurang = S.randInt(1, 3); return [`Sekarang jam ${jam}. ${kurang} jam yang lalu jam berapa?`, jam - kurang]; },
                    () => { const jam = S.randInt(8, 11); const tambah = S.randInt(2, 4); return [`Film mulai jam ${jam}. Durasi ${tambah} jam. Film selesai jam berapa?`, jam + tambah]; },
                    () => { const jam = S.randInt(6, 9); const tambah = S.randInt(1, 3); return [`${S.randName()} bangun jam ${jam}. ${tambah} jam kemudian berangkat sekolah. Berangkat jam berapa?`, jam + tambah]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const jam = S.randInt(8, 12); const menit = 30; const tambahJam = S.randInt(1, 2); return [`Pukul ${jam}.${menit} + ${tambahJam} jam = pukul berapa?`, jam + tambahJam]; },
                    () => { const jam = S.randInt(10, 15); const kurangJam = S.randInt(2, 4); return [`Pukul ${jam}.00 - ${kurangJam} jam = pukul berapa?`, jam - kurangJam]; },
                    () => { const menit = S.randInt(20, 50); const tambah = S.randInt(15, 40); return [`${menit} menit + ${tambah} menit = ... menit`, menit + tambah]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const jam1 = S.randInt(1, 3); const menit1 = S.randInt(15, 45); const jam2 = S.randInt(1, 2); const menit2 = S.randInt(10, 30); return [`${jam1} jam ${menit1} menit + ${jam2} jam ${menit2} menit = ... menit total`, jam1 * 60 + menit1 + jam2 * 60 + menit2]; },
                    () => { const jam = S.randInt(2, 5); const menit = S.randInt(20, 50); const kurang = S.randInt(30, 90); return [`${jam} jam ${menit} menit - ${kurang} menit = berapa menit sisanya?`, jam * 60 + menit - kurang]; },
                ];
                break;
        }
    }
    else if (subMode === "Konversi Waktu") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const jam = S.randInt(1, 3); return [`${jam} jam = ... menit`, jam * 60]; },
                    () => { const menit = S.randInt(1, 2) * 60; return [`${menit} menit = ... jam`, menit / 60]; },
                    () => { return [`1 hari = ... jam`, 24]; },
                    () => { return [`1 minggu = ... hari`, 7]; },
                    () => { const jam = S.randInt(2, 4); return [`${jam} jam ada berapa menit?`, jam * 60]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const jam = S.randInt(2, 5); const menit = S.randInt(10, 50); return [`${jam} jam ${menit} menit = ... menit`, jam * 60 + menit]; },
                    () => { const menit = S.randInt(90, 180); const jam = Math.floor(menit / 60); return [`${menit} menit = berapa jam? (bulatkan ke bawah)`, jam]; },
                    () => { const hari = S.randInt(2, 7); return [`${hari} hari = ... jam`, hari * 24]; },
                    () => { const minggu = S.randInt(2, 4); return [`${minggu} minggu = ... hari`, minggu * 7]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const dasawarsa = S.randInt(1, 3); return [`${dasawarsa} dasawarsa = ... tahun`, dasawarsa * 10]; },
                    () => { const abad = S.randInt(1, 2); return [`${abad} abad = ... tahun`, abad * 100]; },
                    () => { const tahun = S.randInt(20, 50); return [`${tahun} tahun = ... windu (1 windu = 8 tahun)`, Math.floor(tahun / 8)]; },
                    () => { const jam = S.randInt(48, 120); return [`${jam} jam = ... hari`, Math.floor(jam / 24)]; },
                ];
                break;
        }
    }
    else if (subMode === "Selisih Waktu") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const jam1 = S.randInt(7, 10); const jam2 = jam1 + S.randInt(1, 3); return [`Dari jam ${jam1} sampai jam ${jam2} = ... jam`, jam2 - jam1]; },
                    () => { const nama = S.randName(); const mulai = S.randInt(8, 11); const selesai = mulai + S.randInt(1, 3); return [`${nama} bermain dari jam ${mulai} sampai jam ${selesai}. Berapa lama bermain?`, selesai - mulai]; },
                    () => { const mulai = S.randInt(7, 9); const selesai = S.randInt(11, 13); return [`Sekolah mulai jam ${mulai} dan pulang jam ${selesai}. Berapa jam di sekolah?`, selesai - mulai]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const jam1 = S.randInt(8, 12); const menit1 = 0; const jam2 = jam1 + S.randInt(2, 4); const menit2 = 30; return [`Dari pukul ${jam1}.00 sampai ${jam2}.30, berapa menit?`, (jam2 - jam1) * 60 + menit2]; },
                    () => { const durasi = S.randInt(90, 150); return [`Film berdurasi ${durasi} menit. Berapa jam lebihnya? (sisanya dalam menit)`, durasi % 60]; },
                    () => { const berangkat = S.randInt(6, 8); const sampai = S.randInt(9, 12); return [`Berangkat jam ${berangkat}.00, sampai jam ${sampai}.00. Lama perjalanan ... jam`, sampai - berangkat]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const jam1 = S.randInt(8, 12); const menit1 = S.randInt(0, 3) * 15; const jam2 = jam1 + S.randInt(2, 5); const menit2 = S.randInt(0, 3) * 15; const total = (jam2 * 60 + menit2) - (jam1 * 60 + menit1); return [`Dari ${jam1}.${menit1.toString().padStart(2, '0')} sampai ${jam2}.${menit2.toString().padStart(2, '0')} = ... menit`, total]; },
                    () => { const tahun1 = S.randInt(2010, 2015); const tahun2 = 2024; return [`Dari tahun ${tahun1} sampai ${tahun2} = ... tahun`, tahun2 - tahun1]; },
                ];
                break;
        }
    }

    return questions;
}

function generateHeavyQuestions(grade, subMode) {
    const S = StoryMode;
    let questions = [];

    if (subMode === "Konversi Berat") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const kg = S.randInt(1, 5); return [`${kg} kg = ... ons (1 kg = 10 ons)`, kg * 10]; },
                    () => { const ons = S.randInt(1, 5) * 10; return [`${ons} ons = ... kg`, ons / 10]; },
                    () => { const kg = S.randInt(1, 3); return [`${kg} kg = ... gram (1 kg = 1000 gram)`, kg * 1000]; },
                    () => { const gram = S.randInt(1, 5) * 1000; return [`${gram} gram = ... kg`, gram / 1000]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const kg = S.randInt(1, 10); const gram = S.randInt(100, 900); return [`${kg} kg ${gram} gram = ... gram`, kg * 1000 + gram]; },
                    () => { const kuintal = S.randInt(1, 5); return [`${kuintal} kuintal = ... kg (1 kuintal = 100 kg)`, kuintal * 100]; },
                    () => { const kg = S.randInt(100, 500); return [`${kg} kg = ... kuintal`, kg / 100]; },
                    () => { const ons = S.randInt(10, 50); return [`${ons} ons = ... gram`, ons * 100]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const ton = S.randInt(1, 5); const kg = S.randInt(100, 900); return [`${ton} ton ${kg} kg = ... kg`, ton * 1000 + kg]; },
                    () => { const kg = S.randInt(2000, 8000); return [`${kg.toLocaleString()} kg = ... ton`, kg / 1000]; },
                    () => { const ton = S.randInt(1, 3); const kuintal = S.randInt(1, 9); return [`${ton} ton ${kuintal} kuintal = ... kg`, ton * 1000 + kuintal * 100]; },
                ];
                break;
        }
    }
    else if (subMode === "Tambah & Kurang Berat") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const a = S.randInt(2, 8); const b = S.randInt(1, 5); return [`${S.randName()} membeli ${a} kg ${S.randFruit()}. Lalu membeli ${b} kg lagi. Total berapa kg?`, a + b]; },
                    () => { const total = S.randInt(5, 12); const diambil = S.randInt(2, total - 2); return [`Ada ${total} kg beras. Diambil ${diambil} kg. Sisa berapa kg?`, total - diambil]; },
                    () => { const a = S.randInt(3, 8); const b = S.randInt(2, 5); return [`Berat tas ${a} kg. Ditambah buku ${b} kg. Total berat tas berapa kg?`, a + b]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const a = S.randInt(10, 30); const b = S.randInt(5, 15); return [`Berat karung A ${a} kg, karung B ${b} kg. Total berat berapa kg?`, a + b]; },
                    () => { const total = S.randInt(50, 100); const dijual = S.randInt(20, 40); return [`Petani punya ${total} kg beras. Dijual ${dijual} kg. Sisa berapa kg?`, total - dijual]; },
                    () => { const a = S.randInt(25, 50); const b = S.randInt(15, 30); return [`Truk mengangkut ${a} kg sayur dan ${b} kg buah. Total muatan berapa kg?`, a + b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const ton = S.randInt(2, 5); const tambah = S.randInt(500, 1500); return [`Muatan truk ${ton} ton. Ditambah ${tambah} kg. Total berat dalam kg = ...`, ton * 1000 + tambah]; },
                    () => { const awal = S.randInt(3000, 5000); const kurang = S.randInt(500, 1500); return [`Stok gudang ${awal.toLocaleString()} kg. Dijual ${kurang.toLocaleString()} kg. Sisa berapa kg?`, awal - kurang]; },
                ];
                break;
        }
    }
    else if (subMode === "Bandingkan Berat") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const a = S.randInt(3, 8); const b = S.randInt(2, 7); const max = Math.max(a, b); return [`Apel ${a} kg dan jeruk ${b} kg. Mana yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const a = S.randInt(2, 6); const b = S.randInt(3, 8); const min = Math.min(a, b); return [`Tas A ${a} kg, tas B ${b} kg. Mana yang lebih ringan? (jawab beratnya)`, min]; },
                    () => { const kg = S.randInt(2, 5); const ons = kg * 10 + S.randInt(1, 5); return [`${kg} kg dan ${ons} ons. Mana lebih berat? Jawab dalam kg yang lebih berat.`, ons > kg * 10 ? Math.ceil(ons / 10) : kg]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const a = S.randInt(10, 30); const b = S.randInt(15, 35); const max = Math.max(a, b); return [`Karung A ${a} kg, karung B ${b} kg. Lebih berat mana? (jawab kg-nya)`, max]; },
                    () => { const kg = S.randInt(3, 8); const gram = S.randInt(2500, 4500); const kgGram = gram / 1000; return [`${kg} kg dan ${gram.toLocaleString()} gram. Mana lebih berat? (dalam kg)`, kg > kgGram ? kg : Math.round(kgGram)]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const ton = S.randInt(2, 5); const kuintal = S.randInt(15, 40); const tonKg = ton * 1000; const kuintalKg = kuintal * 100; return [`${ton} ton vs ${kuintal} kuintal. Lebih berat mana? (dalam kg)`, Math.max(tonKg, kuintalKg)]; },
                    () => { const a = S.randInt(1500, 3000); const b = S.randInt(1800, 3500); return [`${a.toLocaleString()} kg vs ${b.toLocaleString()} kg. Selisihnya berapa kg?`, Math.abs(a - b)]; },
                ];
                break;
        }
    }
    else if (subMode === "Selisih Berat") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const a = S.randInt(5, 10); const b = S.randInt(2, a - 1); return [`Berat benda A ${a} kg dan B ${b} kg. Selisihnya berapa kg?`, a - b]; },
                    () => { const a = S.randInt(4, 9); const b = S.randInt(2, 6); const diff = Math.abs(a - b); return [`Tas ${a} kg dan ransel ${b} kg. Selisih beratnya ... kg`, diff]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const a = S.randInt(25, 50); const b = S.randInt(15, 35); return [`Karung beras ${a} kg dan gula ${b} kg. Selisih beratnya ... kg`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(100, 200); const b = S.randInt(80, 150); return [`Kambing ${a} kg dan domba ${b} kg. Selisih beratnya ... kg`, Math.abs(a - b)]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(2000, 4000); const b = S.randInt(1500, 3000); return [`Truk A ${a.toLocaleString()} kg, truk B ${b.toLocaleString()} kg. Selisihnya ... kg`, Math.abs(a - b)]; },
                    () => { const ton1 = S.randInt(2, 5); const ton2 = S.randInt(3, 6); return [`${ton1} ton vs ${ton2} ton. Selisih dalam kg = ...`, Math.abs(ton1 - ton2) * 1000]; },
                ];
                break;
        }
    }

    return questions;
}

function generateVolumeQuestions(grade, subMode) {
    const S = StoryMode;
    let questions = [];

    if (subMode === "Konversi Volume") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const liter = S.randInt(1, 5); return [`Ibu membeli ${liter} liter sirup untuk acara keluarga. Berapa mililiter sirup yang dibeli Ibu? (1 liter = 1000 ml)`, liter * 1000]; },
                    () => { const ml = S.randInt(1, 4) * 1000; return [`Di dapur ada ${ml} mililiter minyak goreng. Itu sama dengan berapa liter?`, ml / 1000]; },
                    () => { const botol = S.randInt(2, 6); return [`Di kulkas ada ${botol} botol susu. Setiap botol berisi 1 liter. Berapa liter susu seluruhnya?`, botol]; },
                    () => { const liter = S.randInt(2, 5); return [`Ayah membeli ${liter} liter bensin untuk motor. Berapa mililiter bensin tersebut?`, liter * 1000]; },
                    () => { const ml = S.randInt(2, 6) * 1000; return [`Seorang pedagang membawa ${ml} mililiter air minum. Jika diubah ke liter, menjadi berapa liter?`, ml / 1000]; },
                    () => { const botol = S.randInt(3, 8); return [`Terdapat ${botol} botol air mineral. Setiap botol berisi 1 liter. Total air mineral berapa liter?`, botol]; },
                    () => { const liter = S.randInt(1, 4); return [`Nina menuang ${liter} liter air ke dalam galon kecil. Berapa mililiter air tersebut?`, liter * 1000]; },
                    () => { const ml = S.randInt(3, 7) * 1000; return [`Di laboratorium tersedia ${ml} mililiter cairan kimia. Itu setara dengan berapa liter?`, ml / 1000]; },
                    () => { const botol = S.randInt(2, 5); return [`Di meja ada ${botol} botol jus jeruk. Jika tiap botol 1 liter, berapa liter jus semuanya?`, botol]; },
                    () => { const liter = S.randInt(2, 6); return [`Seorang penjual membawa ${liter} liter air kelapa. Berapa mililiter air kelapa tersebut?`, liter * 1000]; },
                    () => { const ml = S.randInt(1, 5) * 1000; return [`Resep kue membutuhkan ${ml} mililiter susu. Itu sama dengan berapa liter susu?`, ml / 1000]; },
                    () => { const botol = S.randInt(4, 9); return [`Panitia menyediakan ${botol} botol air minum. Setiap botol berisi 1 liter. Total air minum berapa liter?`, botol]; },
                    () => { const liter = S.randInt(1, 5); return [`Ibu memasak sup menggunakan ${liter} liter air. Berapa mililiter air yang digunakan Ibu?`, liter * 1000]; },
                    () => { const ml = S.randInt(2, 8) * 1000; return [`Tangki kecil berisi ${ml} mililiter air. Jika diubah ke liter, menjadi berapa liter?`, ml / 1000]; },
                    () => { const botol = S.randInt(3, 7); return [`Di toko ada ${botol} botol minyak goreng. Setiap botol berisi 1 liter. Total minyak goreng berapa liter?`, botol]; },
                    () => { const liter = S.randInt(2, 4); return [`Adi membawa ${liter} liter air minum saat berkemah. Berapa mililiter air yang dibawa Adi?`, liter * 1000]; },
                    () => { const ml = S.randInt(4, 9) * 1000; return [`Sebuah drum kecil berisi ${ml} mililiter air. Itu sama dengan berapa liter?`, ml / 1000]; },
                    () => { const botol = S.randInt(2, 6); return [`Di ruang olahraga tersedia ${botol} botol air. Setiap botol 1 liter. Berapa liter air semuanya?`, botol]; },
                    () => { const liter = S.randInt(3, 6); return [`Seorang pedagang jus menyiapkan ${liter} liter jus buah. Berapa mililiter jus tersebut?`, liter * 1000]; },
                    () => { const ml = S.randInt(1, 6) * 1000; return [`Dokter menyiapkan ${ml} mililiter cairan infus. Jika diubah ke liter, menjadi berapa liter?`, ml / 1000]; },
                    () => { const liter = S.randInt(1, 5); return [`${liter} liter = ... mililiter (1 liter = 1000 ml)`, liter * 1000]; },
                    () => { const ml = S.randInt(1, 3) * 1000; return [`${ml.toLocaleString()} mililiter = ... liter`, ml / 1000]; },
                    () => { const botol = S.randInt(2, 6); return [`Ada ${botol} botol air, tiap botol 1 liter. Total berapa liter?`, botol]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const sisi = S.randInt(3, 7); return [`Kubus sisi ${sisi} cm. Volume = sisi³ = ... cm³`, sisi * sisi * sisi]; },
                    () => { const p = S.randInt(4, 8); const l = S.randInt(3, 6); const t = S.randInt(2, 5); return [`Balok ${p}×${l}×${t} cm. Volume = p×l×t = ... cm³`, p * l * t]; },
                    () => { const liter = S.randInt(2, 8); const ml = S.randInt(100, 500); return [`${liter} liter ${ml} ml = ... ml`, liter * 1000 + ml]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const sisi = S.randInt(5, 12); return [`Volume kubus sisi ${sisi} cm = ... cm³`, sisi * sisi * sisi]; },
                    () => { const r = S.randInt(3, 7); const t = S.randInt(5, 12); return [`Volume tabung r=${r} cm, t=${t} cm ≈ π×r²×t = ... cm³ (π=3.14, bulatkan)`, Math.round(3.14 * r * r * t)]; },
                    () => { const dm3 = S.randInt(1, 10); return [`${dm3} dm³ = ... liter (1 dm³ = 1 liter)`, dm3]; },
                ];
                break;
        }
    }
    else if (subMode === "Tambah Volume" || subMode === "Tambah & Kurang Volume") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const a = S.randInt(2, 6); const b = S.randInt(1, 5); return [`Di galon ada ${a} liter air. Ibu menambahkan ${b} liter lagi. Sekarang ada berapa liter air?`, a + b]; },
                    () => { const total = S.randInt(6, 12); const dipakai = S.randInt(1, total - 3); return [`Di dapur ada ${total} liter air. Digunakan ${dipakai} liter untuk memasak. Sisa berapa liter air?`, total - dipakai]; },
                    () => { const botol = S.randInt(3, 7); return [`Ada ${botol} botol susu, setiap botol berisi 1 liter. Total susu berapa liter?`, botol]; },
                    () => { const a = S.randInt(1, 5); const b = S.randInt(2, 6); return [`Ayah membeli ${a} liter bensin lalu membeli lagi ${b} liter. Total bensin berapa liter?`, a + b]; },
                    () => { const total = S.randInt(5, 10); const tumpah = S.randInt(1, 3); return [`Ember berisi ${total} liter air. ${tumpah} liter tumpah. Sisa air berapa liter?`, total - tumpah]; },
                    () => { const gelas = S.randInt(4, 8); return [`Di meja ada ${gelas} gelas jus. Setiap gelas berisi 1 liter. Total jus berapa liter?`, gelas]; },
                    () => { const a = S.randInt(2, 7); const b = S.randInt(1, 4); return [`Bak mandi berisi ${a} liter air. Kemudian ditambah ${b} liter. Jadi ada berapa liter air?`, a + b]; },
                    () => { const total = S.randInt(7, 15); const diminum = S.randInt(2, 5); return [`Persediaan sirup ada ${total} liter. Diminum ${diminum} liter. Sisa sirup berapa liter?`, total - diminum]; },
                    () => { const botol = S.randInt(2, 6); return [`Terdapat ${botol} botol air mineral. Tiap botol berisi 1 liter. Total air berapa liter?`, botol]; },
                    () => { const a = S.randInt(3, 8); const b = S.randInt(2, 5); return [`Seorang pedagang membawa ${a} liter jus. Ia menambah ${b} liter lagi. Total jus berapa liter?`, a + b]; },
                    () => { const total = S.randInt(6, 12); const dipakai = S.randInt(1, 4); return [`Di galon ada ${total} liter air. Digunakan ${dipakai} liter untuk minum. Sisa berapa liter?`, total - dipakai]; },
                    () => { const gelas = S.randInt(3, 6); return [`Ada ${gelas} gelas susu, setiap gelas berisi 1 liter. Berapa liter susu semuanya?`, gelas]; },
                    () => { const a = S.randInt(2, 5); const b = S.randInt(3, 7); return [`Ibu menyiapkan ${a} liter air lalu menambah ${b} liter lagi. Total air berapa liter?`, a + b]; },
                    () => { const total = S.randInt(8, 14); const bocor = S.randInt(1, 4); return [`Tangki berisi ${total} liter air. Karena bocor, ${bocor} liter keluar. Sisa air berapa liter?`, total - bocor]; },
                    () => { const botol = S.randInt(5, 9); return [`Panitia menyediakan ${botol} botol minuman. Tiap botol berisi 1 liter. Total minuman berapa liter?`, botol]; },
                    () => { const a = S.randInt(1, 4); const b = S.randInt(2, 6); return [`Doni membawa ${a} liter air dari rumah dan membeli lagi ${b} liter. Total air berapa liter?`, a + b]; },
                    () => { const total = S.randInt(5, 11); const diminum = S.randInt(1, 3); return [`Jus mangga ada ${total} liter. Diminum ${diminum} liter. Sisa jus berapa liter?`, total - diminum]; },
                    () => { const gelas = S.randInt(4, 7); return [`Di kantin ada ${gelas} gelas teh. Setiap gelas 1 liter. Total teh berapa liter?`, gelas]; },
                    () => { const a = S.randInt(3, 7); const b = S.randInt(1, 5); return [`Bak air berisi ${a} liter. Ditambah lagi ${b} liter. Jadi berapa liter air sekarang?`, a + b]; },
                    () => { const total = S.randInt(9, 15); const dipakai = S.randInt(2, 6); return [`Persediaan air ada ${total} liter. Dipakai ${dipakai} liter. Sisa air berapa liter?`, total - dipakai]; },
                    () => { const a = S.randInt(2, 6); const b = S.randInt(1, 4); return [`Di ember ada ${a} liter air. Ditambah ${b} liter. Jadi berapa liter?`, a + b]; },
                    () => { const total = S.randInt(5, 10); const diminum = S.randInt(1, total - 2); return [`Ada ${total} liter jus. Diminum ${diminum} liter. Sisa berapa liter?`, total - diminum]; },
                    () => { const gelas = S.randInt(3, 6); return [`Ada ${gelas} gelas air, tiap gelas 1 liter. Total berapa liter?`, gelas]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const a = S.randInt(10, 25); const b = S.randInt(5, 15); return [`Bak berisi ${a} liter air. Ditambah ${b} liter. Total ... liter`, a + b]; },
                    () => { const total = S.randInt(30, 60); const dipakai = S.randInt(10, 25); return [`Tangki berisi ${total} liter. Digunakan ${dipakai} liter. Sisa ... liter`, total - dipakai]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(50, 100); const b = S.randInt(25, 50); return [`Kolam berisi ${a} liter air. Ditambah ${b} liter. Total ... liter`, a + b]; },
                    () => { const total = S.randInt(200, 500); const dipakai = S.randInt(50, 150); return [`Tandon berisi ${total} liter. Dikurangi ${dipakai} liter. Sisa ... liter`, total - dipakai]; },
                ];
                break;
        }
    }
    else if (subMode === "Selisih Volume") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const a = S.randInt(5, 10); const b = S.randInt(2, a - 1); return [`Ember A berisi ${a} liter, ember B berisi ${b} liter. Selisihnya ... liter`, a - b]; },
                    () => { const a = S.randInt(4, 8); const b = S.randInt(2, 6); return [`Galon A ${a} liter, galon B ${b} liter. Selisih isinya ... liter`, Math.abs(a - b)]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const a = S.randInt(20, 40); const b = S.randInt(10, 30); return [`Bak A ${a} liter, bak B ${b} liter. Selisihnya ... liter`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(50, 100); const b = S.randInt(30, 70); return [`Tangki A ${a} liter, tangki B ${b} liter. Selisih volume ... liter`, Math.abs(a - b)]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(100, 300); const b = S.randInt(80, 250); return [`Kolam A ${a} liter, kolam B ${b} liter. Selisih ... liter`, Math.abs(a - b)]; },
                    () => { const m3 = S.randInt(2, 8); const liter = S.randInt(500, 1500); return [`${m3} m³ vs ${liter.toLocaleString()} liter. 1 m³ = 1000 liter. Selisih dalam liter = ...`, Math.abs(m3 * 1000 - liter)]; },
                ];
                break;
        }
    }
    else if (subMode === "Perkiraan Volume" || subMode === "Bandingkan Volume") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { return [`Setengah dari 1 liter = ... mililiter`, 500]; },
                    () => { return [`Seperempat dari 1 liter = ... mililiter`, 250]; },
                    () => { const liter = S.randInt(2, 6); return [`Separuh dari ${liter} liter = ... liter`, liter / 2]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const liter = S.randInt(8, 20); return [`${liter} liter diisi setengahnya. Isinya ... liter`, liter / 2]; },
                    () => { const total = S.randInt(12, 24); return [`1/4 dari ${total} liter = ... liter`, total / 4]; },
                    () => { const liter = S.randInt(10, 30); return [`3/4 dari ${liter} liter = ... liter`, (3 * liter) / 4]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const persen = S.randInt(20, 50); const total = S.randInt(100, 500); return [`${persen}% dari ${total} liter = ... liter`, (persen * total) / 100]; },
                    () => { const total = S.randInt(200, 600); return [`2/5 dari ${total} liter = ... liter`, (2 * total) / 5]; },
                ];
                break;
        }
    }

    return questions;
}

function generateUpQuestions(grade, subMode) {
    const S = StoryMode;
    let questions = [];

    if (subMode === "Keliling Bangun Datar") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const sisi = S.randInt(2, 8); return [`Persegi sisi ${sisi} cm. Keliling = 4 × sisi = ... cm`, sisi * 4]; },
                    () => { const p = S.randInt(4, 10); const l = S.randInt(2, 6); return [`Persegi panjang p=${p} cm, l=${l} cm. Keliling = 2(p+l) = ... cm`, 2 * (p + l)]; },
                    () => { const sisi = S.randInt(3, 7); return [`Segitiga sama sisi dengan sisi ${sisi} cm. Keliling = 3 × sisi = ... cm`, sisi * 3]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const sisi = S.randInt(5, 15); return [`Persegi sisi ${sisi} cm. Keliling = ... cm`, sisi * 4]; },
                    () => { const p = S.randInt(8, 20); const l = S.randInt(5, 12); return [`Persegi panjang ${p} × ${l} cm. Keliling = ... cm`, 2 * (p + l)]; },
                    () => { const a = S.randInt(5, 12); const b = S.randInt(6, 15); const c = S.randInt(4, 10); return [`Segitiga sisi ${a}, ${b}, ${c} cm. Keliling = ... cm`, a + b + c]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const r = S.randInt(5, 14); return [`Lingkaran r=${r} cm. Keliling = 2πr = ... cm (π=3.14, bulatkan)`, Math.round(2 * 3.14 * r)]; },
                    () => { const d = S.randInt(10, 20); return [`Lingkaran diameter ${d} cm. Keliling = πd = ... cm (π=3.14, bulatkan)`, Math.round(3.14 * d)]; },
                    () => { const sisi = S.randInt(8, 18); return [`Segi enam beraturan sisi ${sisi} cm. Keliling = 6 × sisi = ... cm`, sisi * 6]; },
                ];
                break;
        }
    }
    else if (subMode === "Volume Bangun Ruang") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const sisi = S.randInt(2, 5); return [`Kubus sisi ${sisi} cm. Volume = sisi³ = ... cm³`, sisi * sisi * sisi]; },
                    () => { const p = S.randInt(3, 6); const l = S.randInt(2, 4); const t = S.randInt(2, 4); return [`Balok ${p}×${l}×${t} cm. Volume = ... cm³`, p * l * t]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const sisi = S.randInt(4, 10); return [`Kubus sisi ${sisi} cm. Volume = ... cm³`, sisi * sisi * sisi]; },
                    () => { const p = S.randInt(5, 12); const l = S.randInt(4, 8); const t = S.randInt(3, 7); return [`Balok ${p}×${l}×${t} cm. Volume = ... cm³`, p * l * t]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const r = S.randInt(3, 8); const t = S.randInt(5, 12); return [`Tabung r=${r} cm, t=${t} cm. Volume = πr²t = ... cm³ (π=3.14, bulatkan)`, Math.round(3.14 * r * r * t)]; },
                    () => { const sisi = S.randInt(4, 10); const t = S.randInt(6, 15); return [`Limas segi empat alas ${sisi}×${sisi} cm, t=${t} cm. Volume = 1/3 × alas × t = ... cm³`, Math.round((sisi * sisi * t) / 3)]; },
                ];
                break;
        }
    }
    else if (subMode === "Luas Permukaan Bangun Ruang") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const sisi = S.randInt(2, 5); return [`Kubus sisi ${sisi} cm. Luas permukaan = 6×sisi² = ... cm²`, 6 * sisi * sisi]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const sisi = S.randInt(4, 10); return [`Kubus sisi ${sisi} cm. LP = 6s² = ... cm²`, 6 * sisi * sisi]; },
                    () => { const p = S.randInt(5, 10); const l = S.randInt(3, 7); const t = S.randInt(2, 6); return [`Balok ${p}×${l}×${t} cm. LP = 2(pl+pt+lt) = ... cm²`, 2 * (p * l + p * t + l * t)]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const sisi = S.randInt(5, 12); return [`Kubus sisi ${sisi} cm. LP = 6s² = ... cm²`, 6 * sisi * sisi]; },
                    () => { const p = S.randInt(6, 15); const l = S.randInt(4, 10); const t = S.randInt(3, 8); return [`Balok ${p}×${l}×${t} cm. LP = 2(pl+pt+lt) = ... cm²`, 2 * (p * l + p * t + l * t)]; },
                    () => { const r = S.randInt(4, 10); const t = S.randInt(8, 15); return [`Tabung r=${r}, t=${t} cm. LP = 2πr(r+t) = ... cm² (π=3.14, bulatkan)`, Math.round(2 * 3.14 * r * (r + t))]; },
                ];
                break;
        }
    }
    else if (subMode === "Perbandingan Bangun") {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const luas1 = S.randInt(10, 30); const kali = S.randInt(2, 3); return [`Luas A = ${luas1} cm², luas B = ${luas1 * kali} cm². B berapa kali A?`, kali]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const luas1 = S.randInt(20, 60); const luas2 = luas1 * 2; return [`Luas A ${luas1} cm², B ${luas2} cm². B berapa kali lebih besar?`, 2]; },
                    () => { const keliling1 = S.randInt(16, 40); const keliling2 = keliling1 * 3; return [`Keliling A ${keliling1} cm, B ${keliling2} cm. B berapa kali A?`, 3]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const sisi1 = S.randInt(3, 6); const sisi2 = sisi1 * 2; return [`Kubus A sisi ${sisi1} cm, B sisi ${sisi2} cm. Volume B berapa kali A?`, 8]; },
                    () => { const r1 = S.randInt(2, 5); const r2 = r1 * 2; return [`Lingkaran A r=${r1} cm, B r=${r2} cm. Luas B berapa kali A?`, 4]; },
                ];
                break;
        }
    }
    else {
        switch (grade) {
            case 1: case 2: case 3:
                questions = [
                    () => { const sisi = S.randInt(2, 6); return [`Persegi sisi ${sisi} cm. Keliling = ... cm`, sisi * 4]; },
                    () => { const p = S.randInt(4, 8); const l = S.randInt(2, 5); return [`Persegi panjang ${p}×${l} cm. Luas = ... cm²`, p * l]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const sisi = S.randInt(4, 10); return [`Luas persegi sisi ${sisi} cm = ... cm²`, sisi * sisi]; },
                    () => { const alas = S.randInt(5, 12); const tinggi = S.randInt(4, 10); return [`Luas segitiga alas ${alas} cm, tinggi ${tinggi} cm = ... cm²`, (alas * tinggi) / 2]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const r = S.randInt(4, 12); return [`Luas lingkaran r=${r} cm = πr² = ... cm² (π=3.14, bulatkan)`, Math.round(3.14 * r * r)]; },
                    () => { const alas = S.randInt(6, 15); const tinggi = S.randInt(5, 12); return [`Luas jajargenjang alas ${alas} cm, tinggi ${tinggi} cm = ... cm²`, alas * tinggi]; },
                ];
                break;
        }
    }

    return questions;
}

function getStoryQuestionsByModeAndSubMode(gameMode, subMode, difficulty) {
    const grade = getRandomGrade(difficulty);
    let questions = [];

    switch (gameMode) {
        case "operator":
            questions = generateOperatorQuestions(grade, subMode);
            break;
        case "aljabar":
            questions = generateAljabarQuestions(grade, subMode);
            break;
        case "time":
            questions = generateTimeQuestions(grade, subMode);
            break;
        case "heavy":
            questions = generateHeavyQuestions(grade, subMode);
            break;
        case "volume":
            questions = generateVolumeQuestions(grade, subMode);
            break;
        case "up":
            questions = generateUpQuestions(grade, subMode);
            break;
        default:
            questions = generateOperatorQuestions(grade, "Tambah");
    }

    return questions;
}

function getStoryQuestion(gameMode, difficulty, questionType) {
    const questions = getStoryQuestionsByModeAndSubMode(gameMode, questionType, difficulty);

    if (questions && questions.length > 0) {
        const questionGenerator = questions[Math.floor(Math.random() * questions.length)];
        try {
            return questionGenerator();
        } catch (e) {
            console.warn("Error generating question:", e);
            return null;
        }
    }

    return null;
}

function getStoryQuestionArray(gameMode, difficulty, questionType, qno) {
    let questionArray = [];
    let attempts = 0;
    const maxAttempts = qno * 20;

    console.log(`📚 Generating ${qno} questions for mode: ${gameMode}, subMode: ${questionType}, difficulty: ${difficulty}`);

    while (questionArray.length < qno && attempts < maxAttempts) {
        attempts++;
        const questionData = getStoryQuestion(gameMode, difficulty, questionType);

        if (questionData && questionData[0] && questionData[1] !== undefined) {
            const isDuplicate = questionArray.some(q => q[0] === questionData[0]);

            if (!isDuplicate) {
                questionArray.push(questionData);
            }
        }
    }

    if (questionArray.length < qno) {
        console.warn(`⚠️ Only generated ${questionArray.length}/${qno} unique questions for ${gameMode} - ${questionType}`);
    } else {
        console.log(`✅ Successfully generated ${questionArray.length} questions`);
    }

    return questionArray;
}

function getRandomStoryByMode(gameMode) {
    const difficulty = typeof bpmDifficulty !== 'undefined' ? bpmDifficulty : "medium";
    const questionData = getStoryQuestion(gameMode, difficulty, null);

    if (questionData) {
        return questionData;
    }

    const S = StoryMode;
    const nama = S.randName();
    const benda = S.randItem();
    const a = S.randInt(2, 10);
    const b = S.randInt(1, 8);

    return [`${nama} punya ${a} ${benda}. Diberi ${b} lagi. Berapa totalnya?`, a + b];
}

if (typeof window !== 'undefined') {
    window.StoryMode = StoryMode;
    window.getStoryQuestion = getStoryQuestion;
    window.getStoryQuestionArray = getStoryQuestionArray;
    window.getStoryQuestionsByModeAndSubMode = getStoryQuestionsByModeAndSubMode;
    window.getRandomStoryByMode = getRandomStoryByMode;
}
