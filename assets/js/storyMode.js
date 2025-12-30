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
                    () => { const a = S.randInt(15, 25); const b = S.randInt(5, a - 5); return [`Di kelas ada ${a} siswa. ${b} siswa izin pulang. Berapa siswa yang masih di kelas?`, a - b]; },
                    () => { const a = S.randInt(12, 20); const b = S.randInt(4, a - 3); return [`${S.randName()} memiliki ${a} ${S.rand(S.items.stationery)}. Dipinjam temannya ${b}. Sisa berapa?`, a - b]; },
                    () => { const a = S.randInt(20, 30); const b = S.randInt(6, 12); return [`Perpustakaan sekolah memiliki ${a} buku cerita. Dipinjam ${b} buku. Sisa buku berapa?`, a - b]; },
                    () => { const a = S.randInt(15, 25); const b = S.randInt(5, 10); return [`Di kebun ada ${a} ${S.randFruit()}. Dipetik ${b}. Berapa yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(18, 28); const b = S.randInt(6, 12); return [`${S.randName()} mengumpulkan ${a} ${S.randFruit()}. Dimakan ${b}. Berapa buah yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(25, 35); const b = S.randInt(10, 15); return [`Sekolah memiliki ${a} kursi. ${b} kursi rusak. Berapa kursi yang masih bisa digunakan?`, a - b]; },
                    () => { const a = S.randInt(14, 22); const b = S.randInt(4, 8); return [`Di kandang ada ${a} ${S.randAnimal()}. ${b} dilepas. Berapa yang masih di kandang?`, a - b]; },
                    () => { const a = S.randInt(16, 24); const b = S.randInt(5, 9); return [`${S.randName()} memiliki ${a} kelereng. Hilang ${b}. Sisa kelereng berapa?`, a - b]; },
                    () => { const a = S.randInt(20, 30); const b = S.randInt(7, 14); return [`Di gudang ada ${a} dus minuman. Terjual ${b} dus. Sisa dus berapa?`, a - b]; },
                    () => { const a = S.randInt(13, 21); const b = S.randInt(3, 7); return [`Di meja ada ${a} piring. Dipakai ${b}. Berapa piring yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(17, 27); const b = S.randInt(6, 11); return [`${S.randName()} membawa ${a} buku tulis. Diberikan ${b} ke adik. Sisa berapa buku?`, a - b]; },
                    () => { const a = S.randInt(22, 32); const b = S.randInt(8, 14); return [`Toko memiliki ${a} mainan. Terjual ${b}. Berapa mainan yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(15, 25); const b = S.randInt(4, 10); return [`Di taman bermain ada ${a} anak. ${b} anak pulang. Berapa anak yang masih bermain?`, a - b]; },
                    () => { const a = S.randInt(18, 28); const b = S.randInt(5, 10); return [`${S.randName()} membawa ${a} permen. Dibagikan ${b}. Sisa permen berapa?`, a - b]; },
                    () => { const a = S.randInt(20, 30); const b = S.randInt(6, 12); return [`Di rak ada ${a} buku pelajaran. Diambil ${b}. Berapa buku yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(14, 22); const b = S.randInt(3, 8); return [`Di kandang ada ${a} ayam. Dijual ${b}. Berapa ayam yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(19, 29); const b = S.randInt(7, 13); return [`Gudang menyimpan ${a} karung beras. Terpakai ${b}. Sisa karung berapa?`, a - b]; },
                    () => { const a = S.randInt(16, 26); const b = S.randInt(5, 9); return [`${S.randName()} memiliki ${a} pensil warna. Patah ${b}. Sisa berapa pensil?`, a - b]; },
                    () => { const a = S.randInt(21, 31); const b = S.randInt(8, 15); return [`Sekolah menerima ${a} buku baru. ${b} buku dipinjam siswa. Sisa buku berapa?`, a - b]; },
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

                    () => { const a = S.randInt(1200, 2200); const b = S.randInt(300, 700); return [`Pabrik memproduksi ${a} kotak sabun. Terjual ${b} kotak. Berapa kotak yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(900, 1800); const b = S.randInt(200, 500); return [`Gudang logistik menyimpan ${a} paket. Dikirim ${b} paket. Sisa paket berapa?`, a - b]; },
                    () => { const a = S.randInt(2000, 3500); const b = S.randInt(600, 1200); return [`Perusahaan percetakan mencetak ${a} brosur. Dibagikan ${b} brosur. Berapa brosur yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(700, 1400); const b = S.randInt(150, 400); return [`Petani memanen ${a} kg padi. Dijual ${b} kg. Sisa padi berapa kg?`, a - b]; },
                    () => { const a = S.randInt(3000, 5000); const b = S.randInt(900, 1800); return [`Perpustakaan universitas memiliki ${a} buku. Dipinjam ${b} buku. Sisa buku berapa?`, a - b]; },

                    () => { const a = S.randInt(1000, 1800); const b = S.randInt(250, 600); return [`Sekolah memiliki ${a} kursi. Rusak ${b} kursi. Berapa kursi yang masih bisa digunakan?`, a - b]; },
                    () => { const a = S.randInt(1500, 2800); const b = S.randInt(500, 1000); return [`Gudang menyimpan ${a} dus mie instan. Terjual ${b} dus. Sisa dus berapa?`, a - b]; },
                    () => { const a = S.randInt(800, 1600); const b = S.randInt(200, 450); return [`Toko alat tulis mempunyai ${a} pensil. Terjual ${b} pensil. Sisa pensil berapa?`, a - b]; },
                    () => { const a = S.randInt(2000, 3500); const b = S.randInt(700, 1300); return [`Penerbit mencetak ${a} buku pelajaran. Dikirim ${b} buku. Sisa buku berapa?`, a - b]; },
                    () => { const a = S.randInt(1200, 2400); const b = S.randInt(350, 750); return [`Koperasi sekolah memiliki ${a} botol air mineral. Terjual ${b} botol. Sisa berapa botol?`, a - b]; },

                    () => { const a = S.randInt(900, 1700); const b = S.randInt(200, 500); return [`Peternak memiliki ${a} telur ayam. Terjual ${b} butir. Sisa telur berapa?`, a - b]; },
                    () => { const a = S.randInt(2500, 4500); const b = S.randInt(800, 1600); return [`Gudang pusat menyimpan ${a} kardus barang. Dikirim ${b} kardus. Berapa kardus yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(1100, 2100); const b = S.randInt(300, 650); return [`Toko bangunan memiliki ${a} sak semen. Terjual ${b} sak. Sisa semen berapa sak?`, a - b]; },
                    () => { const a = S.randInt(1800, 3000); const b = S.randInt(500, 1000); return [`Perusahaan memiliki stok ${a} masker. Dibagikan ${b} masker. Berapa masker yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(1300, 2600); const b = S.randInt(400, 900); return [`Gudang obat menyimpan ${a} kotak vitamin. Terpakai ${b} kotak. Sisa vitamin berapa kotak?`, a - b]; },

                    () => { const a = S.randInt(500, 1000); const b = S.randInt(150, a - 200); return [`Toko buku memiliki ${a} buku. Terjual ${b} buku. Berapa buku yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(1000, 2000); const b = S.randInt(300, a - 400); return [`${S.randName()} menabung Rp${a.toLocaleString()}. Diambil Rp${b.toLocaleString()}. Sisa tabungan berapa rupiah?`, a - b]; },
                    () => { const a = S.randInt(800, 1500); const b = S.randInt(250, a - 300); return [`Gudang menyimpan ${a} karung beras. Dijual ${b} karung. Berapa karung yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(2500, 4000); const b = S.randInt(800, 1500); return [`Perpustakaan kota memiliki ${a} buku. Dipinjam ${b} buku. Berapa buku yang masih ada?`, a - b]; },
                    () => { const a = S.randInt(1500, 2500); const b = S.randInt(400, 800); return [`Supermarket mempunyai ${a} botol minuman. Terjual ${b} botol. Sisa berapa botol?`, a - b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(5000, 10000); const b = S.randInt(1500, a - 2000); return [`Pabrik memproduksi ${a.toLocaleString()} unit barang dalam satu minggu. Terjual ${b.toLocaleString()} unit ke berbagai toko. Berapa unit barang yang masih tersisa di gudang?`, a - b]; },
                    () => { const a = S.randInt(10000, 25000); const b = S.randInt(3000, 8000); return [`${S.randName()} memiliki tabungan sebesar Rp${a.toLocaleString()} hasil menabung selama setahun. Digunakan Rp${b.toLocaleString()} untuk membeli sepeda. Sisa tabungan berapa rupiah?`, a - b]; },
                    () => { const a = S.randInt(15000, 30000); const b = S.randInt(5000, 12000); return [`Sebuah stadion menampung ${a.toLocaleString()} penonton saat pertandingan berlangsung. Setelah pertandingan selesai, ${b.toLocaleString()} penonton pulang lebih awal. Berapa penonton yang masih berada di stadion?`, a - b]; },
                    () => { const a = S.randInt(8000, 15000); const b = S.randInt(2000, 5000); return [`Perkebunan mangga menghasilkan ${a.toLocaleString()} kg buah. Sebagian dijual ke pasar sebanyak ${b.toLocaleString()} kg. Berapa kg buah mangga yang tersisa?`, a - b]; },

                    () => { const a = S.randInt(12000, 20000); const b = S.randInt(4000, 9000); return [`Gudang logistik menyimpan ${a.toLocaleString()} paket bantuan. Sebanyak ${b.toLocaleString()} paket sudah dikirim ke daerah terdampak. Berapa paket yang masih ada di gudang?`, a - b]; },
                    () => { const a = S.randInt(18000, 30000); const b = S.randInt(6000, 14000); return [`Perusahaan percetakan mencetak ${a.toLocaleString()} buku pelajaran. Buku yang sudah didistribusikan sebanyak ${b.toLocaleString()} buah. Berapa buku yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(7000, 14000); const b = S.randInt(2000, 6000); return [`Petani memanen ${a.toLocaleString()} kg padi. Sebanyak ${b.toLocaleString()} kg dijual ke koperasi desa. Sisa padi berapa kg?`, a - b]; },
                    () => { const a = S.randInt(9000, 18000); const b = S.randInt(3000, 7000); return [`Toko elektronik memiliki stok ${a.toLocaleString()} unit barang. Terjual ${b.toLocaleString()} unit selama promo. Berapa unit yang masih tersedia?`, a - b]; },

                    () => { const a = S.randInt(20000, 35000); const b = S.randInt(7000, 15000); return [`Gudang pusat menyimpan ${a.toLocaleString()} kardus barang. Sebanyak ${b.toLocaleString()} kardus dikirim ke cabang lain. Berapa kardus yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(15000, 28000); const b = S.randInt(5000, 11000); return [`Perpustakaan kota memiliki ${a.toLocaleString()} buku. Dipinjam oleh pengunjung sebanyak ${b.toLocaleString()} buku. Berapa buku yang masih ada?`, a - b]; },

                    () => { const a = S.randInt(10000, 20000); const b = S.randInt(3000, 8000); return [`Sekolah membeli ${a.toLocaleString()} lembar kertas ujian. Digunakan ${b.toLocaleString()} lembar untuk ujian semester. Sisa kertas berapa lembar?`, a - b]; },
                    () => { const a = S.randInt(16000, 30000); const b = S.randInt(6000, 12000); return [`Pabrik minuman memproduksi ${a.toLocaleString()} botol minuman. Terjual ${b.toLocaleString()} botol ke distributor. Berapa botol yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(14000, 26000); const b = S.randInt(4000, 10000); return [`Koperasi sekolah memiliki stok ${a.toLocaleString()} alat tulis. Terjual ${b.toLocaleString()} alat tulis. Berapa stok yang masih ada?`, a - b]; },
                    () => { const a = S.randInt(18000, 32000); const b = S.randInt(7000, 16000); return [`Gudang obat menyimpan ${a.toLocaleString()} kotak vitamin. Sebanyak ${b.toLocaleString()} kotak dibagikan ke puskesmas. Sisa kotak vitamin berapa?`, a - b]; },

                    () => { const a = S.randInt(22000, 40000); const b = S.randInt(8000, 18000); return [`Perusahaan logistik mengirim ${a.toLocaleString()} paket hari ini. Sebanyak ${b.toLocaleString()} paket sudah sampai tujuan. Berapa paket yang belum sampai?`, a - b]; },
                    () => { const a = S.randInt(12000, 24000); const b = S.randInt(3500, 9000); return [`Peternakan ayam menghasilkan ${a.toLocaleString()} butir telur. Terjual ${b.toLocaleString()} butir ke pasar. Sisa telur berapa butir?`, a - b]; },
                    () => { const a = S.randInt(17000, 30000); const b = S.randInt(6000, 14000); return [`Gudang beras menyimpan ${a.toLocaleString()} kg beras. Dijual ${b.toLocaleString()} kg ke pedagang. Berapa kg beras yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(25000, 45000); const b = S.randInt(9000, 20000); return [`Penerbit mencetak ${a.toLocaleString()} majalah. Didistribusikan ${b.toLocaleString()} majalah ke toko-toko. Berapa majalah yang tersisa?`, a - b]; },
                    () => { const a = S.randInt(13000, 26000); const b = S.randInt(5000, 12000); return [`Supermarket memiliki ${a.toLocaleString()} botol air mineral. Terjual ${b.toLocaleString()} botol dalam satu hari. Sisa botol berapa?`, a - b]; },

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
                    () => { const a = S.randInt(8, 15); const b = S.randInt(5, 10); return [`${S.randName()} membeli ${a} ${S.randSnack()} di kantin sekolah. Penjual memberi bonus ${b} ${S.randSnack()} karena belanja banyak. Berapa total ${S.randSnack()} yang dimiliki ${S.randName()}?`, a + b]; },
                    () => { const a = S.randInt(12, 20); const b = S.randInt(6, 12); return [`Di kelas A terdapat ${a} siswa yang sedang belajar. Di kelas B ada ${b} siswa. Jika kedua kelas digabung, berapa total siswa seluruhnya?`, a + b]; },
                    () => { const a = S.randInt(10, 18); const b = S.randInt(7, 12); return [`${S.randName()} memiliki ${a} kelereng di tasnya. Temannya memberikan ${b} kelereng tambahan. Berapa jumlah kelereng ${S.randName()} sekarang?`, a + b]; },
                    () => { const a = S.randInt(15, 25); const b = S.randInt(8, 15); return [`Perpustakaan sekolah menerima ${a} buku baru dari penerbit. Tidak lama kemudian mendapat donasi ${b} buku lagi. Berapa total buku baru yang diterima?`, a + b]; },
                    () => { const a = S.randInt(10, 20); const b = S.randInt(5, 10); return [`Di sebuah kolam terdapat ${a} ikan hias. Pemilik kolam menambahkan ${b} ikan baru. Berapa jumlah ikan di kolam sekarang?`, a + b]; },

                    () => { const a = S.randInt(9, 16); const b = S.randInt(6, 11); return [`${S.randName()} mengumpulkan ${a} stiker dari majalah. Kakaknya memberi tambahan ${b} stiker. Berapa total stiker yang dimiliki?`, a + b]; },
                    () => { const a = S.randInt(11, 19); const b = S.randInt(5, 10); return [`Di taman bermain ada ${a} anak di pagi hari. Siang harinya datang lagi ${b} anak. Berapa jumlah anak di taman sekarang?`, a + b]; },
                    () => { const a = S.randInt(10, 18); const b = S.randInt(7, 12); return [`Kotak pensil ${S.randName()} berisi ${a} pensil. Ia membeli ${b} pensil baru di toko alat tulis. Berapa jumlah pensil seluruhnya?`, a + b]; },
                    () => { const a = S.randInt(14, 22); const b = S.randInt(6, 13); return [`Gudang sekolah menyimpan ${a} kursi. Datang kiriman ${b} kursi tambahan. Berapa jumlah kursi sekarang?`, a + b]; },
                    () => { const a = S.randInt(10, 17); const b = S.randInt(8, 14); return [`Di rak dapur ada ${a} piring bersih. Setelah dicuci, ditambahkan ${b} piring lagi. Berapa total piring di rak?`, a + b]; },

                    () => { const a = S.randInt(13, 21); const b = S.randInt(6, 12); return [`${S.randName()} memiliki ${a} buku cerita di rumah. Ia mendapat hadiah ${b} buku cerita dari orang tua. Berapa total buku cerita yang dimiliki?`, a + b]; },
                    () => { const a = S.randInt(15, 23); const b = S.randInt(7, 13); return [`Kelas menerima ${a} paket alat tulis. Kemudian datang lagi ${b} paket tambahan. Berapa total paket alat tulis?`, a + b]; },
                    () => { const a = S.randInt(9, 16); const b = S.randInt(5, 11); return [`Di kandang ada ${a} ayam. Peternak menambahkan ${b} ayam baru. Berapa jumlah ayam sekarang?`, a + b]; },
                    () => { const a = S.randInt(12, 20); const b = S.randInt(6, 12); return [`${S.randName()} memetik ${a} buah mangga. Kemudian memetik lagi ${b} buah. Berapa jumlah mangga seluruhnya?`, a + b]; },
                    () => { const a = S.randInt(14, 24); const b = S.randInt(8, 15); return [`Perpustakaan desa memiliki ${a} meja baca. Datang bantuan ${b} meja baru. Berapa total meja baca sekarang?`, a + b]; },

                    () => { const a = S.randInt(10, 18); const b = S.randInt(7, 12); return [`Di rak toko ada ${a} botol minuman. Pemilik toko menambah stok ${b} botol lagi. Berapa total botol minuman?`, a + b]; },
                    () => { const a = S.randInt(11, 19); const b = S.randInt(6, 11); return [`${S.randName()} mengoleksi ${a} mainan mobil. Ia membeli ${b} mainan mobil baru. Berapa jumlah koleksinya sekarang?`, a + b]; },
                    () => { const a = S.randInt(15, 25); const b = S.randInt(8, 15); return [`Sekolah menerima ${a} bola olahraga. Dari sponsor datang ${b} bola tambahan. Berapa total bola olahraga?`, a + b]; },
                    () => { const a = S.randInt(12, 20); const b = S.randInt(5, 10); return [`Di lemari terdapat ${a} seragam sekolah. Ditambahkan ${b} seragam baru. Berapa jumlah seragam sekarang?`, a + b]; },
                    () => { const a = S.randInt(10, 18); const b = S.randInt(6, 12); return [`${S.randName()} membawa ${a} permen. Temannya memberi tambahan ${b} permen. Berapa total permen yang dimiliki?`, a + b]; },

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
                    () => { const a = S.randInt(500, 1000); const b = S.randInt(250, 500); return [`Sebuah toko buku menjual ${a} buku pada bulan lalu. Pada bulan ini, toko tersebut menjual lagi ${b} buku. Berapa total buku yang terjual selama dua bulan tersebut?`, a + b]; },
                    () => { const a = S.randInt(1500, 2500); const b = S.randInt(750, 1250); return [`Desa A memiliki ${a.toLocaleString()} penduduk. Desa B memiliki ${b.toLocaleString()} penduduk. Jika digabung, berapa total jumlah penduduk kedua desa tersebut?`, a + b]; },
                    () => { const a = S.randInt(2000, 3500); const b = S.randInt(1000, 2000); return [`Pabrik A memproduksi ${a.toLocaleString()} unit barang dalam satu minggu. Pabrik B memproduksi ${b.toLocaleString()} unit barang. Berapa total unit barang yang diproduksi?`, a + b]; },
                    () => { const a = S.randInt(3000, 5000); const b = S.randInt(1500, 2500); return [`Stadion A dapat menampung ${a.toLocaleString()} penonton. Stadion B dapat menampung ${b.toLocaleString()} penonton. Berapa total kapasitas penonton dari kedua stadion tersebut?`, a + b]; },

                    () => { const a = S.randInt(800, 1400); const b = S.randInt(600, 1000); return [`Sebuah perpustakaan pusat memiliki ${a.toLocaleString()} buku pelajaran. Cabangnya memiliki ${b.toLocaleString()} buku. Berapa total buku yang dimiliki perpustakaan tersebut?`, a + b]; },
                    () => { const a = S.randInt(2500, 4000); const b = S.randInt(1200, 2200); return [`Gudang A menyimpan ${a.toLocaleString()} karung beras. Gudang B menyimpan ${b.toLocaleString()} karung beras. Berapa total karung beras yang tersedia?`, a + b]; },
                    () => { const a = S.randInt(1800, 2800); const b = S.randInt(900, 1600); return [`Sekolah pagi memiliki ${a.toLocaleString()} siswa. Sekolah sore memiliki ${b.toLocaleString()} siswa. Berapa total siswa seluruhnya?`, a + b]; },
                    () => { const a = S.randInt(3200, 4800); const b = S.randInt(1700, 2600); return [`Terminal bus kota melayani ${a.toLocaleString()} penumpang hari ini. Terminal lainnya melayani ${b.toLocaleString()} penumpang. Berapa total penumpang yang dilayani?`, a + b]; },

                    () => { const a = S.randInt(2100, 3600); const b = S.randInt(1400, 2400); return [`Pabrik roti memproduksi ${a.toLocaleString()} roti pada pagi hari dan ${b.toLocaleString()} roti pada sore hari. Berapa total roti yang diproduksi?`, a + b]; },
                    () => { const a = S.randInt(4000, 6000); const b = S.randInt(2000, 3500); return [`Bandara internasional melayani ${a.toLocaleString()} penumpang domestik dan ${b.toLocaleString()} penumpang internasional. Berapa total penumpang hari ini?`, a + b]; },
                    () => { const a = S.randInt(1500, 2500); const b = S.randInt(1000, 1800); return [`Peternakan sapi A menghasilkan ${a.toLocaleString()} liter susu. Peternakan B menghasilkan ${b.toLocaleString()} liter susu. Berapa total produksi susu?`, a + b]; },
                    () => { const a = S.randInt(2800, 4200); const b = S.randInt(1300, 2100); return [`Pabrik air mineral mengirim ${a.toLocaleString()} botol ke toko A dan ${b.toLocaleString()} botol ke toko B. Berapa total botol yang dikirim?`, a + b]; },

                    () => { const a = S.randInt(3500, 5500); const b = S.randInt(1800, 3000); return [`Perusahaan logistik mengirim ${a.toLocaleString()} paket pada pagi hari dan ${b.toLocaleString()} paket pada siang hari. Berapa total paket yang dikirim?`, a + b]; },
                    () => { const a = S.randInt(2000, 3200); const b = S.randInt(1600, 2600); return [`Rumah sakit A merawat ${a.toLocaleString()} pasien. Rumah sakit B merawat ${b.toLocaleString()} pasien. Berapa total pasien yang dirawat?`, a + b]; },
                    () => { const a = S.randInt(3000, 4800); const b = S.randInt(1400, 2400); return [`Kota A memiliki ${a.toLocaleString()} rumah. Kota B memiliki ${b.toLocaleString()} rumah. Berapa total rumah di kedua kota tersebut?`, a + b]; },
                    () => { const a = S.randInt(2500, 4000); const b = S.randInt(1500, 2500); return [`Perusahaan percetakan mencetak ${a.toLocaleString()} buku pelajaran dan ${b.toLocaleString()} buku cerita. Berapa total buku yang dicetak?`, a + b]; },

                    () => { const a = S.randInt(1800, 3000); const b = S.randInt(1200, 2000); return [`Sekolah dasar memiliki ${a.toLocaleString()} buku perpustakaan. Sekolah menengah memiliki ${b.toLocaleString()} buku. Berapa total buku seluruhnya?`, a + b]; },
                    () => { const a = S.randInt(4000, 6500); const b = S.randInt(2200, 3500); return [`Pelabuhan A memuat ${a.toLocaleString()} peti kemas. Pelabuhan B memuat ${b.toLocaleString()} peti kemas. Berapa total peti kemas yang dimuat?`, a + b]; },
                    () => { const a = S.randInt(2300, 3700); const b = S.randInt(1500, 2600); return [`Perusahaan tambang menghasilkan ${a.toLocaleString()} ton batu bara dari lokasi A dan ${b.toLocaleString()} ton dari lokasi B. Berapa total hasil tambang?`, a + b]; },
                    () => { const a = S.randInt(3000, 5000); const b = S.randInt(2000, 3500); return [`Pabrik tekstil memproduksi ${a.toLocaleString()} kain katun dan ${b.toLocaleString()} kain sutra. Berapa total kain yang diproduksi?`, a + b]; },

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
                    () => { const a = S.randInt(100000, 250000); const b = S.randInt(50000, 125000); return [`Seorang pedagang memiliki modal awal Rp${a.toLocaleString()}. Ia mendapat tambahan modal Rp${b.toLocaleString()}. Berapa total modal pedagang tersebut sekarang?`, a + b]; },
                    () => { const a = S.randInt(500000, 1000000); const b = S.randInt(250000, 500000); return [`Pemerintah mengalokasikan anggaran Rp${a.toLocaleString()} untuk proyek jalan dan Rp${b.toLocaleString()} untuk jembatan. Berapa total anggaran yang dikeluarkan?`, a + b]; },
                    () => { const a = S.randInt(150000, 350000); const b = S.randInt(75000, 175000); return [`Sebuah kota memiliki ${a.toLocaleString()} penduduk. Tahun ini datang ${b.toLocaleString()} pendatang baru. Berapa jumlah penduduk kota sekarang?`, a + b]; },
                    () => { const p = S.randInt(1, 4) / 10; const harga = S.randInt(1000, 5000); const naik = Math.round(harga * p); return [`Harga sebuah barang Rp${harga.toLocaleString()}. Karena inflasi, harga naik ${p * 100}%. Berapa besar kenaikan harga barang tersebut dalam rupiah?`, naik]; },

                    () => { const a = S.randInt(200000, 400000); const b = S.randInt(100000, 200000); return [`Modal usaha keluarga Rp${a.toLocaleString()}. Mereka menambah modal dari tabungan Rp${b.toLocaleString()}. Berapa total modal usaha keluarga tersebut?`, a + b]; },
                    () => { const a = S.randInt(600000, 1200000); const b = S.randInt(300000, 600000); return [`Perusahaan mengeluarkan Rp${a.toLocaleString()} untuk gaji dan Rp${b.toLocaleString()} untuk operasional. Berapa total pengeluaran perusahaan?`, a + b]; },
                    () => { const a = S.randInt(250000, 450000); const b = S.randInt(100000, 200000); return [`Jumlah penduduk desa A adalah ${a.toLocaleString()} jiwa. Desa B memiliki ${b.toLocaleString()} jiwa. Berapa total penduduk kedua desa?`, a + b]; },
                    () => { const p = S.randInt(1, 3) / 10; const harga = S.randInt(2000, 6000); const naik = Math.round(harga * p); return [`Harga tiket awal Rp${harga.toLocaleString()}. Harga naik ${p * 100}%. Berapa rupiah kenaikan harga tiket tersebut?`, naik]; },

                    () => { const a = S.randInt(300000, 600000); const b = S.randInt(150000, 300000); return [`Seorang pengusaha memiliki modal Rp${a.toLocaleString()}. Ia mendapat suntikan dana Rp${b.toLocaleString()}. Berapa total dana yang dimiliki?`, a + b]; },
                    () => { const a = S.randInt(800000, 1500000); const b = S.randInt(400000, 800000); return [`Anggaran pembangunan sekolah Rp${a.toLocaleString()}. Ditambah anggaran renovasi Rp${b.toLocaleString()}. Berapa total anggaran sekolah?`, a + b]; },
                    () => { const a = S.randInt(180000, 320000); const b = S.randInt(90000, 160000); return [`Penduduk awal sebuah kota ${a.toLocaleString()} jiwa. Terjadi urbanisasi sebanyak ${b.toLocaleString()} jiwa. Berapa total penduduk sekarang?`, a + b]; },
                    () => { const p = S.randInt(2, 5) / 10; const harga = S.randInt(1500, 4500); const naik = Math.round(harga * p); return [`Harga makanan Rp${harga.toLocaleString()}. Harga naik ${p * 100}%. Berapa rupiah kenaikan harga makanan tersebut?`, naik]; },

                    () => { const a = S.randInt(400000, 700000); const b = S.randInt(200000, 350000); return [`Modal awal koperasi Rp${a.toLocaleString()}. Mendapat bantuan Rp${b.toLocaleString()}. Berapa total modal koperasi sekarang?`, a + b]; },
                    () => { const a = S.randInt(900000, 1800000); const b = S.randInt(500000, 900000); return [`Dana proyek pemerintah pusat Rp${a.toLocaleString()}. Dana daerah Rp${b.toLocaleString()}. Berapa total dana proyek tersebut?`, a + b]; },
                    () => { const a = S.randInt(220000, 380000); const b = S.randInt(100000, 180000); return [`Penduduk sebuah kecamatan ${a.toLocaleString()} jiwa. Bertambah ${b.toLocaleString()} jiwa karena kelahiran. Berapa total penduduk sekarang?`, a + b]; },
                    () => { const p = S.randInt(1, 4) / 10; const harga = S.randInt(3000, 8000); const naik = Math.round(harga * p); return [`Harga barang elektronik Rp${harga.toLocaleString()}. Mengalami kenaikan ${p * 100}%. Berapa rupiah kenaikan harga tersebut?`, naik]; },

                    () => { const a = S.randInt(350000, 650000); const b = S.randInt(200000, 400000); return [`Modal usaha kecil Rp${a.toLocaleString()}. Mendapat tambahan modal Rp${b.toLocaleString()}. Berapa total modal usaha?`, a + b]; },
                    () => { const a = S.randInt(700000, 1400000); const b = S.randInt(350000, 700000); return [`Biaya pembangunan gedung Rp${a.toLocaleString()}. Biaya peralatan Rp${b.toLocaleString()}. Berapa total biaya yang dibutuhkan?`, a + b]; },
                    () => { const a = S.randInt(160000, 300000); const b = S.randInt(80000, 150000); return [`Jumlah warga awal ${a.toLocaleString()} jiwa. Datang pendatang baru ${b.toLocaleString()} jiwa. Berapa total jumlah warga?`, a + b]; },
                    () => { const p = S.randInt(2, 4) / 10; const harga = S.randInt(2500, 7000); const naik = Math.round(harga * p); return [`Harga barang pokok Rp${harga.toLocaleString()}. Naik ${p * 100}%. Berapa besar kenaikan harganya?`, naik]; },

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
                    () => { const b = S.randInt(2, 5); const a = b * S.randInt(3, 7); return [`${a} ${S.randSnack()} dibagikan sama rata kepada ${b} anak saat ulang tahun. Setiap anak mendapat berapa ${S.randSnack()}?`, a / b]; },
                    () => { const b = S.randInt(3, 6); const a = b * S.randInt(4, 8); return [`Perpustakaan memiliki ${a} buku yang akan disusun ke dalam ${b} rak dengan jumlah sama. Tiap rak berisi berapa buku?`, a / b]; },
                    () => { const b = S.randInt(2, 4); const a = b * S.randInt(5, 10); return [`${S.randName()} membawa ${a} permen dan membaginya sama rata kepada ${b} teman. Masing-masing teman mendapat berapa permen?`, a / b]; },
                    () => { const b = S.randInt(4, 6); const a = b * S.randInt(3, 6); return [`Ada ${a} kursi di aula yang disusun menjadi ${b} baris sama banyak. Setiap baris berisi berapa kursi?`, a / b]; },
                    () => { const b = S.randInt(2, 5); const a = b * S.randInt(4, 9); return [`Toko buah memiliki ${a} jeruk yang dimasukkan ke dalam ${b} keranjang sama rata. Tiap keranjang berisi berapa jeruk?`, a / b]; },

                    () => { const b = S.randInt(3, 5); const a = b * S.randInt(6, 10); return [`Guru membawa ${a} pensil untuk dibagikan kepada ${b} kelompok belajar secara merata. Tiap kelompok mendapat berapa pensil?`, a / b]; },
                    () => { const b = S.randInt(2, 4); const a = b * S.randInt(7, 12); return [`${S.randName()} memiliki ${a} kelereng dan membaginya sama banyak kepada ${b} adiknya. Setiap adik mendapat berapa kelereng?`, a / b]; },
                    () => { const b = S.randInt(4, 6); const a = b * S.randInt(5, 8); return [`Ada ${a} botol minum yang akan dibagikan ke ${b} meja piknik secara sama. Tiap meja mendapat berapa botol?`, a / b]; },
                    () => { const b = S.randInt(2, 5); const a = b * S.randInt(6, 9); return [`Petani memanen ${a} mangga dan memasukkannya ke ${b} peti sama rata. Tiap peti berisi berapa mangga?`, a / b]; },
                    () => { const b = S.randInt(3, 6); const a = b * S.randInt(4, 7); return [`Sekolah menyiapkan ${a} paket alat tulis untuk ${b} kelas secara merata. Tiap kelas mendapat berapa paket?`, a / b]; },

                    () => { const b = S.randInt(2, 4); const a = b * S.randInt(8, 12); return [`${a} roti dibagikan sama rata kepada ${b} kelompok siswa. Setiap kelompok mendapat berapa roti?`, a / b]; },
                    () => { const b = S.randInt(3, 5); const a = b * S.randInt(5, 9); return [`Panitia lomba menyediakan ${a} hadiah yang akan dibagi rata ke ${b} pemenang. Tiap pemenang mendapat berapa hadiah?`, a / b]; },
                    () => { const b = S.randInt(4, 6); const a = b * S.randInt(6, 10); return [`Di gudang terdapat ${a} kardus yang akan disusun menjadi ${b} tumpukan sama banyak. Tiap tumpukan berisi berapa kardus?`, a / b]; },
                    () => { const b = S.randInt(2, 5); const a = b * S.randInt(7, 11); return [`${S.randName()} membeli ${a} donat untuk dibagikan kepada ${b} temannya secara adil. Masing-masing mendapat berapa donat?`, a / b]; },
                    () => { const b = S.randInt(3, 6); const a = b * S.randInt(5, 8); return [`Petugas kebersihan mengumpulkan ${a} kantong sampah dan membaginya ke ${b} truk sama rata. Tiap truk membawa berapa kantong?`, a / b]; },

                    () => { const b = S.randInt(2, 4); const a = b * S.randInt(9, 14); return [`Terdapat ${a} bola yang akan dimasukkan ke ${b} kotak sama banyak. Tiap kotak berisi berapa bola?`, a / b]; },
                    () => { const b = S.randInt(3, 5); const a = b * S.randInt(6, 10); return [`${a} lembar kertas dibagi sama rata kepada ${b} siswa. Setiap siswa mendapat berapa lembar?`, a / b]; },
                    () => { const b = S.randInt(4, 6); const a = b * S.randInt(4, 7); return [`Di kelas ada ${a} buku tulis yang dibagikan ke ${b} kelompok belajar. Tiap kelompok mendapat berapa buku?`, a / b]; },
                    () => { const b = S.randInt(2, 5); const a = b * S.randInt(8, 12); return [`Penjual memiliki ${a} telur dan menaruhnya ke ${b} keranjang dengan jumlah sama. Tiap keranjang berisi berapa telur?`, a / b]; },
                    () => { const b = S.randInt(3, 6); const a = b * S.randInt(5, 9); return [`Panitia menyiapkan ${a} minuman untuk ${b} meja tamu secara merata. Tiap meja mendapat berapa minuman?`, a / b]; },

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
                    () => { const b = S.randInt(10, 25); const a = b * S.randInt(15, 30); return [`${a.toLocaleString()} butir telur dikemas ke dalam ${b} kotak dengan jumlah sama. Tiap kotak berisi berapa butir telur?`, a / b]; },
                    () => { const b = S.randInt(8, 15); const a = b * S.randInt(20, 40); return [`Sebuah pabrik memproduksi ${a.toLocaleString()} barang selama ${b} hari kerja. Rata-rata berapa barang yang diproduksi setiap hari?`, a / b]; },
                    () => { const b = S.randInt(12, 20); const a = b * S.randInt(25, 50); return [`Dana bantuan sebesar Rp${a.toLocaleString()} dibagikan sama rata kepada ${b} warga. Setiap warga menerima berapa rupiah?`, a / b]; },
                    () => { const b = S.randInt(5, 12); const a = b * S.randInt(30, 60); return [`Sebuah kendaraan menempuh jarak ${a} km dalam waktu ${b} jam. Berapa kecepatan kendaraan per jam?`, a / b]; },

                    () => { const b = S.randInt(6, 15); const a = b * S.randInt(40, 80); return [`Petani memanen ${a.toLocaleString()} kg padi dan membaginya ke ${b} karung sama berat. Tiap karung berisi berapa kg?`, a / b]; },
                    () => { const b = S.randInt(10, 20); const a = b * S.randInt(50, 100); return [`Gudang menyimpan ${a.toLocaleString()} botol air mineral yang dibagi ke ${b} truk secara merata. Tiap truk membawa berapa botol?`, a / b]; },
                    () => { const b = S.randInt(8, 18); const a = b * S.randInt(30, 70); return [`Sekolah menerima ${a.toLocaleString()} buku dan membagikannya ke ${b} kelas sama banyak. Tiap kelas mendapat berapa buku?`, a / b]; },
                    () => { const b = S.randInt(7, 14); const a = b * S.randInt(60, 120); return [`Pabrik roti menghasilkan ${a.toLocaleString()} roti yang akan dikirim ke ${b} toko sama rata. Tiap toko menerima berapa roti?`, a / b]; },

                    () => { const b = S.randInt(9, 20); const a = b * S.randInt(25, 55); return [`Panitia lomba menyiapkan ${a.toLocaleString()} hadiah untuk ${b} pemenang secara adil. Setiap pemenang mendapat berapa hadiah?`, a / b]; },
                    () => { const b = S.randInt(6, 12); const a = b * S.randInt(80, 150); return [`Sebuah perusahaan mengirim ${a.toLocaleString()} paket dalam ${b} hari. Rata-rata berapa paket yang dikirim per hari?`, a / b]; },
                    () => { const b = S.randInt(10, 25); const a = b * S.randInt(20, 50); return [`Donasi sebesar Rp${a.toLocaleString()} dibagikan sama rata kepada ${b} keluarga. Setiap keluarga mendapat berapa rupiah?`, a / b]; },
                    () => { const b = S.randInt(5, 10); const a = b * S.randInt(100, 200); return [`Sebuah bus menempuh ${a} km dalam ${b} jam perjalanan. Berapa km jarak tempuh rata-rata per jam?`, a / b]; },

                    () => { const b = S.randInt(8, 16); const a = b * S.randInt(70, 140); return [`Pabrik minuman memproduksi ${a.toLocaleString()} botol dalam ${b} shift kerja. Setiap shift menghasilkan berapa botol?`, a / b]; },
                    () => { const b = S.randInt(12, 24); const a = b * S.randInt(30, 60); return [`Perusahaan mencetak ${a.toLocaleString()} brosur selama ${b} hari. Rata-rata berapa brosur dicetak per hari?`, a / b]; },
                    () => { const b = S.randInt(6, 15); const a = b * S.randInt(90, 180); return [`Panen jagung sebanyak ${a.toLocaleString()} kg dimasukkan ke ${b} karung sama berat. Tiap karung berisi berapa kg?`, a / b]; },
                    () => { const b = S.randInt(10, 20); const a = b * S.randInt(40, 80); return [`Gudang membagikan ${a.toLocaleString()} dus mie instan ke ${b} toko secara merata. Tiap toko menerima berapa dus?`, a / b]; },

                    () => { const b = S.randInt(7, 14); const a = b * S.randInt(60, 120); return [`Perusahaan ekspedisi mengirim ${a.toLocaleString()} paket ke ${b} kota sama banyak. Tiap kota menerima berapa paket?`, a / b]; },
                    () => { const b = S.randInt(9, 18); const a = b * S.randInt(35, 70); return [`Sekolah membagikan ${a.toLocaleString()} lembar modul kepada ${b} kelas sama rata. Tiap kelas mendapat berapa modul?`, a / b]; },
                    () => { const b = S.randInt(5, 10); const a = b * S.randInt(150, 300); return [`Sebuah kapal menempuh ${a} km dalam ${b} jam. Berapa km kecepatan kapal per jam?`, a / b]; },
                    () => { const b = S.randInt(12, 24); const a = b * S.randInt(25, 50); return [`Dana operasional Rp${a.toLocaleString()} digunakan selama ${b} hari. Rata-rata penggunaan dana per hari berapa rupiah?`, a / b]; },

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
                    () => { const b = S.randInt(25, 50); const a = b * S.randInt(200, 400); return [`Perusahaan memperoleh keuntungan sebesar Rp${a.toLocaleString()} yang dibagikan sama rata kepada ${b} pemegang saham. Setiap pemegang saham menerima berapa rupiah?`, a / b]; },
                    () => { const b = S.randInt(12, 24); const a = b * S.randInt(500, 1000); return [`Sebuah pabrik memproduksi ${a.toLocaleString()} unit barang selama ${b} bulan. Berapa rata-rata produksi barang setiap bulan?`, a / b]; },
                    () => { const persen = S.randInt(10, 50); const hasil = S.randInt(100, 500); const total = Math.round((hasil * 100) / persen); return [`Sebanyak ${persen}% dari suatu jumlah barang adalah ${hasil} unit. Berapakah jumlah barang seluruhnya?`, total]; },
                    () => { const b = S.randInt(4, 8); const a = b * S.randInt(75, 150); return [`Sebidang tanah seluas ${a} meter persegi dibagi menjadi ${b} kavling dengan ukuran sama. Berapa luas masing-masing kavling?`, a / b]; },

                    () => { const b = S.randInt(30, 60); const a = b * S.randInt(150, 300); return [`Keuntungan usaha sebesar Rp${a.toLocaleString()} dibagikan secara adil kepada ${b} anggota koperasi. Setiap anggota memperoleh berapa rupiah?`, a / b]; },
                    () => { const b = S.randInt(6, 18); const a = b * S.randInt(800, 1600); return [`Total produksi ${a.toLocaleString()} unit barang dicapai dalam ${b} bulan. Rata-rata produksi per bulan berapa unit?`, a / b]; },
                    () => { const persen = S.randInt(20, 40); const hasil = S.randInt(200, 600); const total = Math.round((hasil * 100) / persen); return [`Sebesar ${persen}% dari jumlah siswa di sekolah adalah ${hasil} siswa. Berapa jumlah seluruh siswa di sekolah tersebut?`, total]; },
                    () => { const b = S.randInt(5, 10); const a = b * S.randInt(100, 200); return [`Tanah pertanian seluas ${a} m² dibagi menjadi ${b} petak sama besar. Berapa luas setiap petak?`, a / b]; },

                    () => { const b = S.randInt(20, 40); const a = b * S.randInt(250, 500); return [`Keuntungan proyek sebesar Rp${a.toLocaleString()} dibagi rata kepada ${b} pekerja. Setiap pekerja menerima berapa rupiah?`, a / b]; },
                    () => { const b = S.randInt(10, 20); const a = b * S.randInt(600, 1200); return [`Sebuah pabrik menghasilkan ${a.toLocaleString()} produk dalam ${b} bulan. Berapa rata-rata produk yang dihasilkan per bulan?`, a / b]; },
                    () => { const persen = S.randInt(15, 45); const hasil = S.randInt(150, 450); const total = Math.round((hasil * 100) / persen); return [`Jika ${persen}% dari jumlah penduduk desa adalah ${hasil} orang, berapa jumlah penduduk desa tersebut?`, total]; },
                    () => { const b = S.randInt(6, 12); const a = b * S.randInt(90, 180); return [`Lahan kosong seluas ${a} m² dibagi ke dalam ${b} petak sama besar. Berapa luas setiap petak lahan?`, a / b]; },

                    () => { const b = S.randInt(35, 70); const a = b * S.randInt(180, 360); return [`Keuntungan perusahaan sebesar Rp${a.toLocaleString()} akan dibagi sama rata kepada ${b} investor. Setiap investor memperoleh berapa rupiah?`, a / b]; },
                    () => { const b = S.randInt(8, 16); const a = b * S.randInt(900, 1800); return [`Total produksi pabrik sebanyak ${a.toLocaleString()} unit dicapai dalam ${b} bulan. Berapa rata-rata produksi per bulan?`, a / b]; },
                    () => { const persen = S.randInt(25, 50); const hasil = S.randInt(250, 700); const total = Math.round((hasil * 100) / persen); return [`Jika ${persen}% dari total karyawan adalah ${hasil} orang, berapa jumlah seluruh karyawan perusahaan?`, total]; },
                    () => { const b = S.randInt(4, 8); const a = b * S.randInt(120, 240); return [`Sebidang tanah dengan luas ${a} meter persegi dibagi menjadi ${b} bagian sama besar. Berapa luas tiap bagian?`, a / b]; },

                    () => { const b = S.randInt(28, 56); const a = b * S.randInt(220, 440); return [`Keuntungan usaha dagang sebesar Rp${a.toLocaleString()} dibagikan kepada ${b} mitra usaha. Setiap mitra mendapat berapa rupiah?`, a / b]; },
                    () => { const b = S.randInt(9, 18); const a = b * S.randInt(700, 1400); return [`Produksi total sebanyak ${a.toLocaleString()} unit dicapai selama ${b} bulan. Rata-rata produksi tiap bulan berapa unit?`, a / b]; },
                    () => { const persen = S.randInt(10, 40); const hasil = S.randInt(120, 480); const total = Math.round((hasil * 100) / persen); return [`Sebanyak ${persen}% dari total penduduk adalah ${hasil} orang. Berapa jumlah penduduk seluruhnya?`, total]; },
                    () => { const b = S.randInt(5, 10); const a = b * S.randInt(150, 300); return [`Luas tanah ${a} m² akan dibagi rata ke dalam ${b} kavling. Berapa luas setiap kavling?`, a / b]; },

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
                    () => { const a = S.randInt(3, 6); const b = S.randInt(3, 5); return [`Ada ${a} piring. Tiap piring berisi ${b} ${S.randSnack()}. Berapa jumlah ${S.randSnack()} seluruhnya?`, a * b]; },
                    () => { const a = S.randInt(4, 7); const b = S.randInt(2, 5); return [`${S.randName()} memiliki ${a} kantong. Setiap kantong berisi ${b} kelereng. Berapa jumlah kelereng semuanya?`, a * b]; },
                    () => { const a = S.randInt(3, 6); const b = S.randInt(4, 7); return [`Di rak buku ada ${a} susun. Setiap susun berisi ${b} buku. Berapa total buku?`, a * b]; },
                    () => { const a = S.randInt(4, 6); const b = S.randInt(5, 8); return [`Ada ${a} kotak. Setiap kotak berisi ${b} spidol. Berapa jumlah spidol seluruhnya?`, a * b]; },
                    () => { const a = S.randInt(5, 8); const b = S.randInt(3, 6); return [`Di taman ada ${a} barisan bangku. Tiap barisan ada ${b} bangku. Berapa bangku semuanya?`, a * b]; },

                    () => { const a = S.randInt(3, 5); const b = S.randInt(6, 9); return [`Ada ${a} kardus. Tiap kardus berisi ${b} botol minum. Berapa botol minum semuanya?`, a * b]; },
                    () => { const a = S.randInt(4, 8); const b = S.randInt(3, 5); return [`${S.randName()} membeli ${a} bungkus permen. Tiap bungkus berisi ${b} permen. Berapa permen semuanya?`, a * b]; },
                    () => { const a = S.randInt(3, 6); const b = S.randInt(4, 6); return [`Di kelas ada ${a} kelompok belajar. Tiap kelompok terdiri dari ${b} siswa. Berapa jumlah siswa seluruhnya?`, a * b]; },
                    () => { const a = S.randInt(5, 7); const b = S.randInt(2, 4); return [`Ada ${a} rak sepatu. Tiap rak berisi ${b} pasang sepatu. Berapa pasang sepatu semuanya?`, a * b]; },
                    () => { const a = S.randInt(4, 6); const b = S.randInt(5, 7); return [`Di gudang terdapat ${a} tumpukan. Tiap tumpukan berisi ${b} karung. Berapa karung semuanya?`, a * b]; },

                    () => { const a = S.randInt(2, 3); const b = S.randInt(2, 4); return [`Ada ${a} piring. Tiap piring ada ${b} ${S.randSnack()}. Berapa jumlah ${S.randSnack()}?`, a * b]; },
                    () => { const a = S.randInt(2, 4); const b = S.randInt(2, 3); return [`${S.randName()} punya ${a} kotak. Tiap kotak berisi ${b} ${S.randFruit()}. Berapa total buah?`, a * b]; },
                    () => { const a = S.randInt(2, 3); const b = S.randInt(3, 5); return [`Ada ${a} baris kursi. Tiap baris ada ${b} kursi. Berapa jumlah kursi?`, a * b]; },
                    () => { const a = S.randInt(2, 4); const b = S.randInt(2, 4); return [`Di taman ada ${a} pohon. Tiap pohon ada ${b} burung. Berapa total burung?`, a * b]; },
                    () => { const a = S.randInt(2, 3); const b = S.randInt(2, 5); return [`${a} anak masing-masing membawa ${b} pensil. Berapa pensil semuanya?`, a * b]; },
                ];
                break;
            case 2:
                questions = [
                    () => { const a = S.randInt(3, 6); const b = S.randInt(4, 6); return [`Ada ${a} keranjang sayur. Tiap keranjang berisi ${b} ikat bayam. Berapa ikat bayam semuanya?`, a * b]; },
                    () => { const a = S.randInt(4, 7); const b = S.randInt(3, 5); return [`${S.randName()} membeli ${a} kotak susu. Tiap kotak berisi ${b} botol susu. Berapa botol susu semuanya?`, a * b]; },
                    () => { const a = S.randInt(5, 8); const b = S.randInt(2, 4); return [`Di perpustakaan ada ${a} rak majalah. Tiap rak berisi ${b} majalah. Berapa majalah semuanya?`, a * b]; },
                    () => { const a = S.randInt(3, 6); const b = S.randInt(5, 7); return [`Ada ${a} kardus jeruk. Tiap kardus berisi ${b} jeruk. Berapa jeruk seluruhnya?`, a * b]; },
                    () => { const a = S.randInt(4, 6); const b = S.randInt(4, 6); return [`Di kelas terdapat ${a} baris kursi. Tiap baris ada ${b} kursi. Berapa jumlah kursi semuanya?`, a * b]; },

                    () => { const a = S.randInt(5, 7); const b = S.randInt(3, 5); return [`Ada ${a} kotak kue. Tiap kotak berisi ${b} kue. Berapa kue seluruhnya?`, a * b]; },
                    () => { const a = S.randInt(3, 5); const b = S.randInt(6, 8); return [`${S.randName()} mengumpulkan ${a} ikat pensil. Tiap ikat berisi ${b} pensil. Berapa pensil semuanya?`, a * b]; },
                    () => { const a = S.randInt(4, 7); const b = S.randInt(4, 6); return [`Di gudang ada ${a} tumpukan karung. Tiap tumpukan berisi ${b} karung. Berapa karung semuanya?`, a * b]; },
                    () => { const a = S.randInt(3, 6); const b = S.randInt(3, 5); return [`Ada ${a} kelompok pramuka. Tiap kelompok terdiri dari ${b} anak. Berapa anak semuanya?`, a * b]; },
                    () => { const a = S.randInt(5, 8); const b = S.randInt(2, 4); return [`Di toko ada ${a} rak topi. Tiap rak berisi ${b} topi. Berapa topi seluruhnya?`, a * b]; },

                    () => { const a = S.randInt(4, 6); const b = S.randInt(5, 7); return [`Ada ${a} piring berisi buah. Tiap piring berisi ${b} buah. Berapa buah semuanya?`, a * b]; },
                    () => { const a = S.randInt(3, 5); const b = S.randInt(4, 6); return [`${S.randName()} membawa ${a} tas. Tiap tas berisi ${b} buku tulis. Berapa buku tulis semuanya?`, a * b]; },
                    () => { const a = S.randInt(5, 7); const b = S.randInt(3, 5); return [`Di lapangan ada ${a} regu. Tiap regu terdiri dari ${b} pemain. Berapa pemain semuanya?`, a * b]; },
                    () => { const a = S.randInt(4, 6); const b = S.randInt(6, 8); return [`Ada ${a} kotak kapur. Tiap kotak berisi ${b} kapur tulis. Berapa kapur semuanya?`, a * b]; },
                    () => { const a = S.randInt(3, 6); const b = S.randInt(5, 7); return [`Di kebun ada ${a} barisan pohon. Tiap barisan ada ${b} pohon. Berapa pohon seluruhnya?`, a * b]; },

                    () => { const a = S.randInt(5, 8); const b = S.randInt(4, 6); return [`Ada ${a} meja belajar. Tiap meja memiliki ${b} laci. Berapa jumlah laci semuanya?`, a * b]; },
                    () => { const a = S.randInt(3, 5); const b = S.randInt(6, 9); return [`${S.randName()} membeli ${a} bungkus mie. Tiap bungkus berisi ${b} mie. Berapa mie semuanya?`, a * b]; },
                    () => { const a = S.randInt(4, 7); const b = S.randInt(3, 6); return [`Di kelas ada ${a} papan kelompok. Tiap papan berisi ${b} gambar. Berapa gambar seluruhnya?`, a * b]; },
                    () => { const a = S.randInt(5, 7); const b = S.randInt(2, 4); return [`Ada ${a} rak tas. Tiap rak berisi ${b} tas. Berapa tas semuanya?`, a * b]; },
                    () => { const a = S.randInt(3, 6); const b = S.randInt(4, 6); return [`Di ruang seni ada ${a} meja. Tiap meja terdapat ${b} kuas. Berapa kuas seluruhnya?`, a * b]; },

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
                    () => { const a = S.randInt(18, 25); const b = S.randInt(10, 20); return [`Sebuah gudang mengirim ${a} dus setiap hari. Tiap dus berisi ${b} botol. Berapa botol yang dikirim per hari?`, a * b]; },
                    () => { const a = S.randInt(20, 30); const b = S.randInt(12, 18); return [`Di aula sekolah ada ${a} baris bangku. Tiap baris terdapat ${b} bangku. Berapa bangku seluruhnya?`, a * b]; },
                    () => { const a = S.randInt(15, 22); const b = S.randInt(15, 25); return [`${S.randName()} membeli ${a} pak kertas. Tiap pak berisi ${b} lembar kertas. Berapa lembar kertas semuanya?`, a * b]; },
                    () => { const a = S.randInt(22, 30); const b = S.randInt(10, 16); return [`Sebuah peternakan memiliki ${a} kandang ayam. Tiap kandang berisi ${b} ayam. Berapa jumlah ayam semuanya?`, a * b]; },
                    () => { const a = S.randInt(12, 20); const b = S.randInt(20, 30); return [`Pabrik roti membuat ${a} loyang roti. Tiap loyang berisi ${b} roti. Berapa roti yang dihasilkan?`, a * b]; },

                    () => { const a = S.randInt(16, 24); const b = S.randInt(12, 20); return [`Di gudang ada ${a} rak minuman. Tiap rak berisi ${b} botol. Berapa botol semuanya?`, a * b]; },
                    () => { const a = S.randInt(14, 20); const b = S.randInt(15, 22); return [`${S.randName()} mencetak ${a} bundel soal. Tiap bundel berisi ${b} lembar. Berapa lembar soal semuanya?`, a * b]; },
                    () => { const a = S.randInt(18, 28); const b = S.randInt(8, 14); return [`Di kebun binatang ada ${a} kandang. Tiap kandang berisi ${b} hewan. Berapa hewan seluruhnya?`, a * b]; },
                    () => { const a = S.randInt(20, 30); const b = S.randInt(10, 15); return [`Sebuah perusahaan mengemas ${a} kotak setiap hari. Tiap kotak berisi ${b} produk. Berapa produk per hari?`, a * b]; },
                    () => { const a = S.randInt(15, 25); const b = S.randInt(12, 18); return [`Di ruang ujian ada ${a} baris meja. Tiap baris terdapat ${b} meja. Berapa meja seluruhnya?`, a * b]; },

                    () => { const a = S.randInt(12, 20); const b = S.randInt(10, 15); return [`Pabrik memproduksi ${a} kotak per hari. Tiap kotak berisi ${b} barang. Berapa barang per hari?`, a * b]; },
                    () => { const a = S.randInt(15, 25); const b = S.randInt(12, 18); return [`Ada ${a} baris kursi. Tiap baris ada ${b} kursi. Berapa kursi di stadion?`, a * b]; },
                    () => { const a = S.randInt(10, 20); const b = S.randInt(15, 25); return [`${S.randName()} membeli ${a} pak buku. Tiap pak berisi ${b} buku. Berapa buku semuanya?`, a * b]; },
                    () => { const a = S.randInt(20, 30); const b = S.randInt(8, 15); return [`Di peternakan ada ${a} kandang. Tiap kandang ada ${b} hewan. Berapa hewan semuanya?`, a * b]; },
                ];
                break;
            case 5:
                questions = [
                    () => { const a = S.randInt(18, 30); const b = S.randInt(10, 20); return [`Sebuah pabrik air minum mengemas ${a} dus setiap hari. Tiap dus berisi ${b} botol. Berapa botol yang diproduksi per hari?`, a * b]; },
                    () => { const a = S.randInt(20, 35); const b = S.randInt(12, 18); return [`Di gedung konser terdapat ${a} baris kursi. Setiap baris berisi ${b} kursi. Berapa kursi seluruhnya?`, a * b]; },
                    () => { const a = S.randInt(15, 25); const b = S.randInt(20, 30); return [`${S.randName()} membeli ${a} pak buku tulis. Tiap pak berisi ${b} buku. Berapa buku yang dibeli?`, a * b]; },
                    () => { const a = S.randInt(22, 30); const b = S.randInt(10, 15); return [`Sebuah peternakan memiliki ${a} kandang sapi. Tiap kandang berisi ${b} sapi. Berapa jumlah sapi semuanya?`, a * b]; },
                    () => { const a = S.randInt(16, 24); const b = S.randInt(15, 25); return [`Pabrik kue membuat ${a} loyang kue. Setiap loyang berisi ${b} kue. Berapa kue yang dihasilkan?`, a * b]; },

                    () => { const a = S.randInt(18, 26); const b = S.randInt(12, 20); return [`Di gudang ada ${a} rak sepatu. Tiap rak berisi ${b} pasang sepatu. Berapa pasang sepatu semuanya?`, a * b]; },
                    () => { const a = S.randInt(14, 22); const b = S.randInt(18, 28); return [`${S.randName()} mencetak ${a} bundel brosur. Tiap bundel berisi ${b} lembar. Berapa lembar brosur seluruhnya?`, a * b]; },
                    () => { const a = S.randInt(20, 30); const b = S.randInt(8, 14); return [`Di kebun binatang ada ${a} kandang burung. Tiap kandang berisi ${b} burung. Berapa burung semuanya?`, a * b]; },
                    () => { const a = S.randInt(25, 35); const b = S.randInt(10, 16); return [`Sebuah perusahaan mengirim ${a} kotak paket. Tiap kotak berisi ${b} barang. Berapa barang yang dikirim?`, a * b]; },
                    () => { const a = S.randInt(15, 25); const b = S.randInt(14, 20); return [`Di ruang kelas terdapat ${a} baris meja. Tiap baris ada ${b} meja. Berapa meja seluruhnya?`, a * b]; },

                    () => { const a = S.randInt(18, 28); const b = S.randInt(12, 18); return [`Sebuah toko roti membuat ${a} nampan roti. Tiap nampan berisi ${b} roti. Berapa roti semuanya?`, a * b]; },
                    () => { const a = S.randInt(20, 30); const b = S.randInt(15, 25); return [`Pabrik pensil memproduksi ${a} kotak. Tiap kotak berisi ${b} pensil. Berapa pensil yang diproduksi?`, a * b]; },
                    () => { const a = S.randInt(16, 24); const b = S.randInt(18, 30); return [`${S.randName()} membeli ${a} pak stiker. Tiap pak berisi ${b} stiker. Berapa stiker semuanya?`, a * b]; },
                    () => { const a = S.randInt(22, 32); const b = S.randInt(10, 15); return [`Di parkiran terdapat ${a} baris motor. Tiap baris berisi ${b} motor. Berapa motor seluruhnya?`, a * b]; },
                    () => { const a = S.randInt(18, 26); const b = S.randInt(20, 30); return [`Gudang menyimpan ${a} rak minuman. Tiap rak berisi ${b} botol. Berapa botol seluruhnya?`, a * b]; },

                    () => { const a = S.randInt(14, 22); const b = S.randInt(16, 24); return [`Sebuah sekolah membeli ${a} kardus buku. Tiap kardus berisi ${b} buku. Berapa buku semuanya?`, a * b]; },
                    () => { const a = S.randInt(20, 30); const b = S.randInt(12, 20); return [`Pabrik sabun memproduksi ${a} dus sabun. Tiap dus berisi ${b} batang. Berapa sabun seluruhnya?`, a * b]; },
                    () => { const a = S.randInt(18, 28); const b = S.randInt(15, 25); return [`Di gudang logistik ada ${a} palet. Tiap palet berisi ${b} kotak. Berapa kotak seluruhnya?`, a * b]; },
                    () => { const a = S.randInt(16, 24); const b = S.randInt(10, 18); return [`${S.randName()} menata ${a} baris kursi. Tiap baris berisi ${b} kursi. Berapa kursi semuanya?`, a * b]; },
                    () => { const a = S.randInt(22, 30); const b = S.randInt(12, 20); return [`Sebuah pabrik mainan memproduksi ${a} kotak mainan. Tiap kotak berisi ${b} mainan. Berapa mainan seluruhnya?`, a * b]; },

                    () => { const a = S.randInt(25, 50); const b = S.randInt(20, 40); return [`Pabrik memproduksi ${a} unit per jam. Dalam ${b} jam, berapa unit diproduksi?`, a * b]; },
                    () => { const a = S.randInt(50, 100); const b = S.randInt(25, 50); return [`Harga 1 barang Rp${a.toLocaleString()}. Jika beli ${b} barang, berapa totalnya?`, a * b]; },
                    () => { const a = S.randInt(30, 60); const b = S.randInt(15, 30); return [`Kecepatan mobil ${a} km/jam. Jarak yang ditempuh dalam ${b} jam adalah ... km`, a * b]; },
                    () => { const a = S.randInt(40, 80); const b = S.randInt(20, 35); return [`Sekolah punya ${a} kelas. Tiap kelas ada ${b} siswa. Berapa total siswa?`, a * b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(120, 300); const b = S.randInt(20, 60); return [`Harga satu buku Rp${a.toLocaleString()}. Jika membeli ${b} buku, berapa total harga yang harus dibayar?`, a * b]; },
                    () => { const a = S.randInt(80, 200); const b = S.randInt(30, 70); return [`Sebuah pabrik mempekerjakan ${a} karyawan selama ${b} jam. Berapa total jam kerja karyawan (orang-jam)?`, a * b]; },
                    () => { const persen = S.randInt(10, 40); const nilai = S.randInt(2000, 8000); const hasil = Math.round((persen * nilai) / 100); return [`Diskon sebesar ${persen}% dari harga Rp${nilai.toLocaleString()}. Berapa besar diskonnya?`, hasil]; },
                    () => { const a = S.randInt(40, 90); const b = S.randInt(25, 70); return [`Sebuah kebun berbentuk persegi panjang dengan panjang ${a} m dan lebar ${b} m. Berapa luas kebun tersebut?`, a * b]; },
                    () => { const skala = S.randInt(200, 600); const peta = S.randInt(6, 25); return [`Pada peta dengan skala 1:${skala}, jarak dua kota ${peta} cm. Berapa jarak sebenarnya dalam cm?`, skala * peta]; },

                    () => { const a = S.randInt(150, 350); const b = S.randInt(30, 80); return [`Harga satu kaos Rp${a.toLocaleString()}. Jika membeli ${b} kaos, berapa total harga?`, a * b]; },
                    () => { const a = S.randInt(60, 180); const b = S.randInt(40, 90); return [`Sebanyak ${a} siswa belajar selama ${b} jam. Berapa total jam belajar (orang-jam)?`, a * b]; },
                    () => { const persen = S.randInt(5, 30); const nilai = S.randInt(3000, 9000); const hasil = Math.round((persen * nilai) / 100); return [`Pajak sebesar ${persen}% dikenakan pada harga Rp${nilai.toLocaleString()}. Berapa pajaknya?`, hasil]; },
                    () => { const a = S.randInt(55, 120); const b = S.randInt(40, 85); return [`Sebuah lapangan memiliki panjang ${a} m dan lebar ${b} m. Berapa luas lapangan tersebut?`, a * b]; },
                    () => { const skala = S.randInt(150, 450); const peta = S.randInt(10, 30); return [`Pada peta skala 1:${skala}, jarak pada peta ${peta} cm. Berapa jarak sebenarnya?`, skala * peta]; },

                    () => { const a = S.randInt(100, 280); const b = S.randInt(50, 120); return [`Harga satu botol minuman Rp${a.toLocaleString()}. Jika membeli ${b} botol, berapa total harga?`, a * b]; },
                    () => { const a = S.randInt(90, 220); const b = S.randInt(25, 60); return [`Sebanyak ${a} pekerja bekerja selama ${b} jam. Berapa total jam kerja mereka?`, a * b]; },
                    () => { const persen = S.randInt(15, 35); const nilai = S.randInt(4000, 10000); const hasil = Math.round((persen * nilai) / 100); return [`Potongan harga ${persen}% dari Rp${nilai.toLocaleString()}. Berapa rupiah potongannya?`, hasil]; },
                    () => { const a = S.randInt(70, 130); const b = S.randInt(50, 90); return [`Sebuah tanah berbentuk persegi panjang berukuran ${a} m × ${b} m. Berapa luasnya?`, a * b]; },
                    () => { const skala = S.randInt(250, 700); const peta = S.randInt(8, 20); return [`Pada peta skala 1:${skala}, jarak pada peta ${peta} cm. Berapa jarak sebenarnya dalam cm?`, skala * peta]; },

                    () => { const a = S.randInt(110, 260); const b = S.randInt(40, 100); return [`Harga satu pensil Rp${a.toLocaleString()}. Jika membeli ${b} pensil, berapa total harga?`, a * b]; },
                    () => { const a = S.randInt(75, 200); const b = S.randInt(30, 75); return [`Sebanyak ${a} relawan bekerja selama ${b} jam. Berapa total jam kerja relawan?`, a * b]; },
                    () => { const persen = S.randInt(10, 50); const nilai = S.randInt(2500, 7500); const hasil = Math.round((persen * nilai) / 100); return [`Bunga sebesar ${persen}% dari Rp${nilai.toLocaleString()}. Berapa besar bunganya?`, hasil]; },
                    () => { const a = S.randInt(60, 110); const b = S.randInt(45, 95); return [`Sebuah halaman rumah berukuran ${a} m × ${b} m. Berapa luas halaman tersebut?`, a * b]; },
                    () => { const skala = S.randInt(300, 800); const peta = S.randInt(5, 15); return [`Pada peta berskala 1:${skala}, jarak ${peta} cm di peta mewakili jarak sebenarnya berapa cm?`, skala * peta]; },

                    () => { const a = S.randInt(130, 300); const b = S.randInt(35, 90); return [`Harga satu buku tulis Rp${a.toLocaleString()}. Jika membeli ${b} buku, berapa total yang harus dibayar?`, a * b]; },
                    () => { const a = S.randInt(100, 250); const b = S.randInt(20, 50); return [`Sebanyak ${a} peserta mengikuti pelatihan selama ${b} jam. Berapa total jam pelatihan (orang-jam)?`, a * b]; },
                    () => { const persen = S.randInt(5, 20); const nilai = S.randInt(5000, 12000); const hasil = Math.round((persen * nilai) / 100); return [`Komisi sebesar ${persen}% dari penjualan Rp${nilai.toLocaleString()}. Berapa komisi yang diterima?`, hasil]; },
                    () => { const a = S.randInt(80, 140); const b = S.randInt(60, 100); return [`Sebuah sawah memiliki ukuran ${a} m × ${b} m. Berapa luas sawah tersebut?`, a * b]; },
                    () => { const skala = S.randInt(180, 550); const peta = S.randInt(12, 28); return [`Pada peta dengan skala 1:${skala}, jarak ${peta} cm menunjukkan jarak sebenarnya berapa cm?`, skala * peta]; },

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
                    () => { const jam = S.randInt(5, 8); const tambah = S.randInt(1, 4); return [`${S.randName()} bangun tidur pukul ${jam}. Setelah ${tambah} jam, ia sarapan. Sarapan pukul berapa?`, jam + tambah]; },
                    () => { const jam = S.randInt(7, 11); const tambah = S.randInt(1, 3); return [`Sekolah dimulai pukul ${jam}. Pelajaran berlangsung ${tambah} jam. Selesai pukul berapa?`, jam + tambah]; },
                    () => { const jam = S.randInt(9, 12); const kurang = S.randInt(1, 3); return [`Sekarang pukul ${jam}. ${kurang} jam sebelumnya pukul berapa?`, jam - kurang]; },
                    () => { const jam = S.randInt(6, 9); const tambah = S.randInt(2, 4); return [`${S.randName()} mulai membersihkan rumah pukul ${jam}. Setelah ${tambah} jam, pekerjaan selesai. Selesai pukul berapa?`, jam + tambah]; },
                    () => { const jam = S.randInt(8, 10); const tambah = S.randInt(1, 3); return [`Acara TV dimulai pukul ${jam}. Acara berlangsung ${tambah} jam. Acara selesai pukul berapa?`, jam + tambah]; },

                    () => { const jam = S.randInt(10, 13); const kurang = S.randInt(1, 4); return [`Sekarang pukul ${jam}. ${kurang} jam yang lalu, jam berapa?`, jam - kurang]; },
                    () => { const jam = S.randInt(7, 9); const tambah = S.randInt(1, 2); return [`${S.randName()} berangkat ke sekolah pukul ${jam}. Perjalanan memakan waktu ${tambah} jam. Tiba pukul berapa?`, jam + tambah]; },
                    () => { const jam = S.randInt(11, 14); const tambah = S.randInt(1, 3); return [`Latihan olahraga dimulai pukul ${jam}. Latihan berlangsung ${tambah} jam. Selesai pukul berapa?`, jam + tambah]; },
                    () => { const jam = S.randInt(6, 8); const tambah = S.randInt(2, 4); return [`${S.randName()} mulai membantu orang tua pukul ${jam}. Setelah ${tambah} jam, selesai membantu. Jam berapa selesai?`, jam + tambah]; },
                    () => { const jam = S.randInt(9, 12); const kurang = S.randInt(1, 2); return [`Sekarang pukul ${jam}. ${kurang} jam yang lalu adalah pukul berapa?`, jam - kurang]; },

                    () => { const jam = S.randInt(8, 11); const tambah = S.randInt(1, 4); return [`Buku cerita mulai dibaca pukul ${jam}. Membaca selama ${tambah} jam. Selesai pukul berapa?`, jam + tambah]; },
                    () => { const jam = S.randInt(7, 10); const tambah = S.randInt(2, 3); return [`${S.randName()} mulai mengerjakan PR pukul ${jam}. PR selesai setelah ${tambah} jam. Jam berapa selesai?`, jam + tambah]; },
                    () => { const jam = S.randInt(10, 14); const kurang = S.randInt(2, 4); return [`Sekarang pukul ${jam}. ${kurang} jam sebelumnya pukul berapa?`, jam - kurang]; },
                    () => { const jam = S.randInt(6, 9); const tambah = S.randInt(1, 3); return [`${S.randName()} mulai memasak pukul ${jam}. Masak selama ${tambah} jam. Selesai pukul berapa?`, jam + tambah]; },
                    () => { const jam = S.randInt(8, 12); const tambah = S.randInt(1, 2); return [`Pelajaran tambahan dimulai pukul ${jam}. Setelah ${tambah} jam, pelajaran selesai. Jam berapa selesai?`, jam + tambah]; },

                    () => { const jam = S.randInt(9, 11); const kurang = S.randInt(1, 3); return [`Sekarang pukul ${jam}. ${kurang} jam yang lalu adalah pukul berapa?`, jam - kurang]; },
                    () => { const jam = S.randInt(7, 9); const tambah = S.randInt(2, 4); return [`${S.randName()} bermain bersama teman mulai pukul ${jam}. Bermain selama ${tambah} jam. Selesai pukul berapa?`, jam + tambah]; },
                    () => { const jam = S.randInt(10, 13); const tambah = S.randInt(1, 3); return [`Pertandingan dimulai pukul ${jam}. Pertandingan berlangsung ${tambah} jam. Selesai pukul berapa?`, jam + tambah]; },
                    () => { const jam = S.randInt(6, 8); const tambah = S.randInt(1, 2); return [`${S.randName()} berangkat ke pasar pukul ${jam}. Perjalanan ${tambah} jam. Sampai pukul berapa?`, jam + tambah]; },
                    () => { const jam = S.randInt(11, 14); const kurang = S.randInt(1, 3); return [`Sekarang pukul ${jam}. ${kurang} jam sebelumnya adalah pukul berapa?`, jam - kurang]; },

                    () => { const jam = S.randInt(8, 10); const tambah = S.randInt(2, 4); return [`Kegiatan pramuka dimulai pukul ${jam}. Kegiatan berlangsung ${tambah} jam. Selesai pukul berapa?`, jam + tambah]; },
                    () => { const jam = S.randInt(7, 9); const tambah = S.randInt(1, 3); return [`${S.randName()} mulai belajar kelompok pukul ${jam}. Setelah ${tambah} jam, belajar selesai. Jam berapa selesai?`, jam + tambah]; },
                    () => { const jam = S.randInt(10, 12); const kurang = S.randInt(1, 2); return [`Sekarang pukul ${jam}. ${kurang} jam yang lalu adalah pukul berapa?`, jam - kurang]; },
                    () => { const jam = S.randInt(6, 8); const tambah = S.randInt(2, 3); return [`${S.randName()} mulai berolahraga pagi pukul ${jam}. Setelah ${tambah} jam, selesai. Selesai pukul berapa?`, jam + tambah]; },
                    () => { const jam = S.randInt(9, 11); const tambah = S.randInt(1, 3); return [`Acara sekolah dimulai pukul ${jam}. Berlangsung selama ${tambah} jam. Acara selesai pukul berapa?`, jam + tambah]; },

                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const jam = S.randInt(7, 11); const menit = 30; const tambahJam = S.randInt(1, 2); return [`${S.randName()} mulai menonton TV pukul ${jam}.${menit}. Setelah ${tambahJam} jam, acara selesai. Selesai pukul berapa?`, jam + tambahJam]; },
                    () => { const jam = S.randInt(9, 14); const kurangJam = S.randInt(2, 4); return [`Sekarang pukul ${jam}.00. ${kurangJam} jam yang lalu, ${S.randName()} masih di sekolah. Jam berapa itu?`, jam - kurangJam]; },
                    () => { const menit = S.randInt(20, 45); const tambah = S.randInt(15, 35); return [`${S.randName()} membaca buku selama ${menit} menit, lalu lanjut membaca ${tambah} menit lagi. Total membaca berapa menit?`, menit + tambah]; },

                    () => { const jam = S.randInt(8, 12); const menit = 30; const tambahJam = S.randInt(1, 2); return [`Film dimulai pukul ${jam}.${menit}. Film berlangsung ${tambahJam} jam. Film selesai pukul berapa?`, jam + tambahJam]; },
                    () => { const jam = S.randInt(10, 16); const kurangJam = S.randInt(1, 3); return [`Sekarang pukul ${jam}.00. ${kurangJam} jam sebelumnya, ${S.randName()} sedang belajar. Jam berapa itu?`, jam - kurangJam]; },
                    () => { const menit = S.randInt(25, 50); const tambah = S.randInt(10, 30); return [`${S.randName()} mengerjakan PR selama ${menit} menit. Ia menambah waktu ${tambah} menit lagi. Total waktu belajar berapa menit?`, menit + tambah]; },

                    () => { const jam = S.randInt(6, 10); const menit = 30; const tambahJam = S.randInt(1, 2); return [`${S.randName()} mulai membersihkan rumah pukul ${jam}.${menit}. Setelah ${tambahJam} jam, pekerjaan selesai. Jam berapa selesai?`, jam + tambahJam]; },
                    () => { const jam = S.randInt(11, 15); const kurangJam = S.randInt(2, 4); return [`Jam dinding menunjukkan pukul ${jam}.00. ${kurangJam} jam sebelumnya pukul berapa?`, jam - kurangJam]; },
                    () => { const menit = S.randInt(15, 40); const tambah = S.randInt(20, 45); return [`${S.randName()} berolahraga ${menit} menit, lalu istirahat dan lanjut ${tambah} menit. Total waktu olahraga berapa menit?`, menit + tambah]; },

                    () => { const jam = S.randInt(8, 12); const menit = 30; const tambahJam = S.randInt(1, 2); return [`Pelajaran tambahan dimulai pukul ${jam}.${menit}. Pelajaran berlangsung ${tambahJam} jam. Selesai pukul berapa?`, jam + tambahJam]; },
                    () => { const jam = S.randInt(9, 13); const kurangJam = S.randInt(1, 3); return [`Sekarang pukul ${jam}.00. ${kurangJam} jam yang lalu, jam berapa?`, jam - kurangJam]; },
                    () => { const menit = S.randInt(20, 50); const tambah = S.randInt(15, 40); return [`${S.randName()} menonton video edukasi selama ${menit} menit lalu menonton lagi ${tambah} menit. Total menonton berapa menit?`, menit + tambah]; },

                    () => { const jam = S.randInt(7, 11); const menit = 30; const tambahJam = S.randInt(1, 2); return [`${S.randName()} mulai belajar kelompok pukul ${jam}.${menit}. Setelah ${tambahJam} jam, belajar selesai. Jam berapa selesai?`, jam + tambahJam]; },
                    () => { const jam = S.randInt(10, 14); const kurangJam = S.randInt(2, 4); return [`Sekarang pukul ${jam}.00. ${kurangJam} jam sebelumnya adalah pukul berapa?`, jam - kurangJam]; },
                    () => { const menit = S.randInt(30, 55); const tambah = S.randInt(10, 25); return [`${S.randName()} bermain game ${menit} menit, lalu bermain lagi ${tambah} menit. Total bermain berapa menit?`, menit + tambah]; },

                    () => { const jam = S.randInt(6, 9); const menit = 30; const tambahJam = S.randInt(1, 2); return [`${S.randName()} berangkat ke pasar pukul ${jam}.${menit}. Perjalanan memakan waktu ${tambahJam} jam. Sampai pukul berapa?`, jam + tambahJam]; },
                    () => { const jam = S.randInt(11, 15); const kurangJam = S.randInt(1, 3); return [`Jam sekarang menunjukkan ${jam}.00. ${kurangJam} jam sebelumnya, jam berapa?`, jam - kurangJam]; },
                    () => { const menit = S.randInt(20, 45); const tambah = S.randInt(20, 35); return [`${S.randName()} membantu orang tua selama ${menit} menit lalu lanjut ${tambah} menit. Total membantu berapa menit?`, menit + tambah]; },

                    () => { const jam = S.randInt(8, 12); const menit = 30; const tambahJam = S.randInt(1, 2); return [`Latihan olahraga dimulai pukul ${jam}.${menit}. Latihan berlangsung ${tambahJam} jam. Selesai pukul berapa?`, jam + tambahJam]; },
                    () => { const jam = S.randInt(9, 14); const kurangJam = S.randInt(2, 3); return [`Sekarang pukul ${jam}.00. ${kurangJam} jam yang lalu adalah pukul berapa?`, jam - kurangJam]; },
                    () => { const menit = S.randInt(15, 35); const tambah = S.randInt(25, 45); return [`${S.randName()} membaca komik ${menit} menit lalu membaca lagi ${tambah} menit. Total membaca berapa menit?`, menit + tambah]; },

                    () => { const jam = S.randInt(7, 10); const menit = 30; const tambahJam = S.randInt(1, 2); return [`${S.randName()} mulai menulis tugas pukul ${jam}.${menit}. Setelah ${tambahJam} jam, tugas selesai. Jam berapa selesai?`, jam + tambahJam]; },
                    () => { const jam = S.randInt(10, 15); const kurangJam = S.randInt(1, 4); return [`Sekarang pukul ${jam}.00. ${kurangJam} jam sebelumnya, jam berapa?`, jam - kurangJam]; },
                    () => { const menit = S.randInt(20, 50); const tambah = S.randInt(15, 30); return [`${S.randName()} belajar matematika ${menit} menit lalu menambah waktu ${tambah} menit. Total belajar berapa menit?`, menit + tambah]; },

                    () => { const jam = S.randInt(8, 12); const menit = 30; const tambahJam = S.randInt(1, 2); return [`Pukul ${jam}.${menit} + ${tambahJam} jam = pukul berapa?`, jam + tambahJam]; },
                    () => { const jam = S.randInt(10, 15); const kurangJam = S.randInt(2, 4); return [`Pukul ${jam}.00 - ${kurangJam} jam = pukul berapa?`, jam - kurangJam]; },
                    () => { const menit = S.randInt(20, 50); const tambah = S.randInt(15, 40); return [`${menit} menit + ${tambah} menit = ... menit`, menit + tambah]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const j1 = S.randInt(2, 4), m1 = S.randInt(30, 55), j2 = S.randInt(1, 3), m2 = S.randInt(20, 50); return [`Rani belajar ${j1} jam ${m1} menit lalu lanjut tugas ${j2} jam ${m2} menit. Total waktu belajar Rani berapa menit?`, j1 * 60 + m1 + j2 * 60 + m2]; },
                    () => { const j = S.randInt(3, 5), m = S.randInt(30, 55), k = S.randInt(60, 120); return [`Dimas menonton film ${j} jam ${m} menit tetapi berhenti ${k} menit lebih awal. Berapa menit film yang ditonton?`, j * 60 + m - k]; },
                    () => { const j1 = S.randInt(1, 3), m1 = S.randInt(40, 59), j2 = S.randInt(2, 4), m2 = S.randInt(15, 45); return [`Sinta membaca buku pagi ${j1} jam ${m1} menit dan sore ${j2} jam ${m2} menit. Total membaca berapa menit?`, j1 * 60 + m1 + j2 * 60 + m2]; },
                    () => { const j = S.randInt(4, 6), m = S.randInt(20, 50), k = S.randInt(75, 150); return [`Lomba berlangsung ${j} jam ${m} menit namun dihentikan ${k} menit lebih cepat. Berapa menit lomba berjalan?`, j * 60 + m - k]; },
                    () => { const j1 = S.randInt(2, 4), m1 = S.randInt(25, 50), j2 = S.randInt(2, 3), m2 = S.randInt(30, 55); return [`Andi bersepeda ${j1} jam ${m1} menit lalu jogging ${j2} jam ${m2} menit. Total waktu olahraga berapa menit?`, j1 * 60 + m1 + j2 * 60 + m2]; },
                    () => { const j = S.randInt(5, 7), m = S.randInt(30, 59), k = S.randInt(90, 180); return [`Pertunjukan seni dijadwalkan ${j} jam ${m} menit tapi dipersingkat ${k} menit. Berapa menit pertunjukan berlangsung?`, j * 60 + m - k]; },
                    () => { const j1 = S.randInt(3, 5), m1 = S.randInt(40, 59), j2 = S.randInt(1, 2), m2 = S.randInt(30, 50); return [`Nina menggambar ${j1} jam ${m1} menit lalu mewarnai ${j2} jam ${m2} menit. Total waktu berapa menit?`, j1 * 60 + m1 + j2 * 60 + m2]; },
                    () => { const j = S.randInt(6, 8), m = S.randInt(15, 45), k = S.randInt(120, 240); return [`Perjalanan bus ${j} jam ${m} menit namun dipercepat ${k} menit. Berapa menit perjalanan bus?`, j * 60 + m - k]; },
                    () => { const j1 = S.randInt(2, 3), m1 = S.randInt(50, 59), j2 = S.randInt(3, 4), m2 = S.randInt(20, 45); return [`Raka bermain game ${j1} jam ${m1} menit lalu belajar online ${j2} jam ${m2} menit. Total waktu berapa menit?`, j1 * 60 + m1 + j2 * 60 + m2]; },
                    () => { const j = S.randInt(7, 9), m = S.randInt(30, 59), k = S.randInt(180, 300); return [`Festival musik ${j} jam ${m} menit dipangkas ${k} menit karena hujan. Berapa menit festival berlangsung?`, j * 60 + m - k]; },
                    () => { const j1 = S.randInt(1, 3), m1 = S.randInt(35, 55), j2 = S.randInt(2, 4), m2 = S.randInt(25, 50); return [`Tono membersihkan rumah ${j1} jam ${m1} menit lalu membantu ibu ${j2} jam ${m2} menit. Total waktu berapa menit?`, j1 * 60 + m1 + j2 * 60 + m2]; },
                    () => { const j = S.randInt(4, 6), m = S.randInt(30, 59), k = S.randInt(100, 200); return [`Rapat kantor ${j} jam ${m} menit selesai ${k} menit lebih cepat. Berapa menit rapat berlangsung?`, j * 60 + m - k]; },
                    () => { const j1 = S.randInt(2, 4), m1 = S.randInt(20, 50), j2 = S.randInt(2, 3), m2 = S.randInt(40, 55); return [`Sari memasak ${j1} jam ${m1} menit lalu mencuci piring ${j2} jam ${m2} menit. Total waktu kerja berapa menit?`, j1 * 60 + m1 + j2 * 60 + m2]; },
                    () => { const j = S.randInt(5, 8), m = S.randInt(10, 40), k = S.randInt(150, 250); return [`Perjalanan kereta ${j} jam ${m} menit dipersingkat ${k} menit. Berapa menit perjalanan?`, j * 60 + m - k]; },
                    () => { const j1 = S.randInt(3, 5), m1 = S.randInt(30, 59), j2 = S.randInt(1, 2), m2 = S.randInt(20, 45); return [`Budi belajar ${j1} jam ${m1} menit lalu latihan soal ${j2} jam ${m2} menit. Total belajar berapa menit?`, j1 * 60 + m1 + j2 * 60 + m2]; },
                    () => { const j = S.randInt(6, 9), m = S.randInt(25, 55), k = S.randInt(200, 300); return [`Acara TV ${j} jam ${m} menit terpotong iklan ${k} menit. Berapa menit acara tayang?`, j * 60 + m - k]; },
                    () => { const j1 = S.randInt(2, 4), m1 = S.randInt(40, 55), j2 = S.randInt(2, 3), m2 = S.randInt(15, 35); return [`Lia berlatih tari ${j1} jam ${m1} menit lalu pemanasan ${j2} jam ${m2} menit. Total latihan berapa menit?`, j1 * 60 + m1 + j2 * 60 + m2]; },
                    () => { const j = S.randInt(5, 7), m = S.randInt(35, 59), k = S.randInt(110, 190); return [`Turnamen game ${j} jam ${m} menit dihentikan ${k} menit lebih awal. Berapa menit turnamen berjalan?`, j * 60 + m - k]; },
                    () => { const j1 = S.randInt(1, 3), m1 = S.randInt(45, 59), j2 = S.randInt(3, 4), m2 = S.randInt(20, 40); return [`Riko latihan musik ${j1} jam ${m1} menit lalu latihan vokal ${j2} jam ${m2} menit. Total latihan berapa menit?`, j1 * 60 + m1 + j2 * 60 + m2]; },
                    () => { const j = S.randInt(7, 9), m = S.randInt(15, 45), k = S.randInt(180, 280); return [`Pameran dibuka ${j} jam ${m} menit namun ditutup ${k} menit lebih awal. Berapa menit pameran berlangsung?`, j * 60 + m - k]; },
                    () => { const j1 = S.randInt(2, 4), m1 = S.randInt(30, 55), j2 = S.randInt(1, 3), m2 = S.randInt(35, 55); return [`Dina menyusun puzzle ${j1} jam ${m1} menit lalu membaca komik ${j2} jam ${m2} menit. Total waktu berapa menit?`, j1 * 60 + m1 + j2 * 60 + m2]; },
                    () => { const j = S.randInt(4, 6), m = S.randInt(45, 59), k = S.randInt(120, 220); return [`Latihan sepak bola ${j} jam ${m} menit dihentikan hujan ${k} menit lebih cepat. Berapa menit latihan?`, j * 60 + m - k]; },
                    () => { const j1 = S.randInt(3, 5), m1 = S.randInt(25, 50), j2 = S.randInt(2, 3), m2 = S.randInt(30, 55); return [`Yoga ${j1} jam ${m1} menit lalu meditasi ${j2} jam ${m2} menit. Total waktu berapa menit?`, j1 * 60 + m1 + j2 * 60 + m2]; },
                    () => { const j = S.randInt(6, 8), m = S.randInt(30, 59), k = S.randInt(160, 260); return [`Kegiatan pramuka ${j} jam ${m} menit dipersingkat ${k} menit. Berapa menit kegiatan berlangsung?`, j * 60 + m - k]; },
                    () => { const j1 = S.randInt(2, 4), m1 = S.randInt(35, 55), j2 = S.randInt(2, 3), m2 = S.randInt(25, 45); return [`Fajar mengerjakan PR ${j1} jam ${m1} menit lalu belajar kelompok ${j2} jam ${m2} menit. Total belajar berapa menit?`, j1 * 60 + m1 + j2 * 60 + m2]; },
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
                    () => { const j = S.randInt(1, 3); return [`Ani bermain selama ${j} jam. Berapa menit Ani bermain?`, j * 60]; },
                    () => { const j = S.randInt(1, 4); return [`Budi menonton TV selama ${j} jam. Itu sama dengan berapa menit?`, j * 60]; },
                    () => { const j = S.randInt(2, 3); return [`Citra belajar ${j} jam nonstop. Berapa menit waktu belajarnya?`, j * 60]; },
                    () => { const j = S.randInt(1, 2); return [`Doni tidur siang selama ${j} jam. Berapa menit Doni tidur?`, j * 60]; },
                    () => { const j = S.randInt(2, 4); return [`Eka latihan menggambar ${j} jam. Itu setara berapa menit?`, j * 60]; },

                    () => { const m = S.randInt(1, 2) * 60; return [`Fani duduk menunggu selama ${m} menit. Itu sama dengan berapa jam?`, m / 60]; },
                    () => { const m = 60; return [`Gilang membaca buku selama ${m} menit. Itu berapa jam?`, 1]; },
                    () => { const m = 120; return [`Hana menonton film selama ${m} menit. Itu sama dengan berapa jam?`, 2]; },
                    () => { const m = 180; return [`Irfan bermain game ${m} menit. Itu berapa jam?`, 3]; },
                    () => { const m = 240; return [`Joko belajar online ${m} menit. Itu sama dengan berapa jam?`, 4]; },

                    () => { return [`Satu hari penuh berlalu dari pagi sampai malam. 1 hari itu ada berapa jam?`, 24]; },
                    () => { return [`Kegiatan sekolah dari Senin sampai Minggu berlangsung 1 minggu. Berapa hari dalam 1 minggu?`, 7]; },
                    () => { return [`Kalender menunjukkan satu hari penuh. Itu sama dengan berapa jam?`, 24]; },
                    () => { return [`Dalam satu minggu ada hari sekolah dan libur. Totalnya ada berapa hari?`, 7]; },
                    () => { return [`Jika hari ini Senin, satu minggu ke depan ada berapa hari semuanya?`, 7]; },

                    () => { const j = S.randInt(1, 3); return [`Lina membantu ibu selama ${j} jam. Berapa menit Lina membantu?`, j * 60]; },
                    () => { const j = S.randInt(2, 4); return [`Miko bermain sepeda ${j} jam. Itu berapa menit?`, j * 60]; },
                    () => { const j = S.randInt(1, 2); return [`Nina menulis cerita ${j} jam. Berapa menit waktu menulisnya?`, j * 60]; },
                    () => { const j = S.randInt(2, 3); return [`Oscar membersihkan kamar ${j} jam. Itu sama dengan berapa menit?`, j * 60]; },
                    () => { const j = S.randInt(1, 4); return [`Putri latihan menari ${j} jam. Berapa menit latihan Putri?`, j * 60]; },

                    () => { const m = 60; return [`Qori menunggu giliran selama ${m} menit. Itu berapa jam?`, 1]; },
                    () => { const m = 120; return [`Raka belajar kelompok ${m} menit. Itu sama dengan berapa jam?`, 2]; },
                    () => { const m = 180; return [`Salsa menonton drama ${m} menit. Itu berapa jam?`, 3]; },
                    () => { const m = 240; return [`Timo mengikuti les ${m} menit. Itu sama dengan berapa jam?`, 4]; },
                    () => { const m = 300; return [`Umar bermain di taman ${m} menit. Itu berapa jam?`, 5]; },

                    () => { const jam = S.randInt(1, 3); return [`${jam} jam = ... menit`, jam * 60]; },
                    () => { const menit = S.randInt(1, 2) * 60; return [`${menit} menit = ... jam`, menit / 60]; },
                    () => { return [`1 hari = ... jam`, 24]; },
                    () => { return [`1 minggu = ... hari`, 7]; },
                    () => { const jam = S.randInt(2, 4); return [`${jam} jam ada berapa menit?`, jam * 60]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const j = S.randInt(2, 5); const m = S.randInt(10, 50); return [`Rani belajar selama ${j} jam ${m} menit tanpa berhenti. Total waktunya berapa menit?`, j * 60 + m]; },
                    () => { const j = S.randInt(3, 6); const m = S.randInt(15, 45); return [`Andi bermain di taman selama ${j} jam ${m} menit. Jika dihitung menit, menjadi berapa?`, j * 60 + m]; },
                    () => { const j = S.randInt(2, 4); const m = S.randInt(20, 55); return [`Sinta menonton film ${j} jam ${m} menit. Ubah waktu tersebut ke dalam menit!`, j * 60 + m]; },
                    () => { const j = S.randInt(4, 6); const m = S.randInt(10, 40); return [`Dika membantu ayah bekerja selama ${j} jam ${m} menit. Total menitnya berapa?`, j * 60 + m]; },
                    () => { const j = S.randInt(2, 5); const m = S.randInt(25, 50); return [`Lala membaca buku ${j} jam ${m} menit. Jika diubah ke menit, hasilnya berapa?`, j * 60 + m]; },

                    () => { const menit = S.randInt(90, 180); const jam = Math.floor(menit / 60); return [`Bimo menunggu selama ${menit} menit. Itu sama dengan berapa jam penuh?`, jam]; },
                    () => { const menit = S.randInt(100, 200); const jam = Math.floor(menit / 60); return [`Waktu istirahat sekolah adalah ${menit} menit. Itu setara berapa jam (dibulatkan ke bawah)?`, jam]; },
                    () => { const menit = S.randInt(120, 240); const jam = Math.floor(menit / 60); return [`Tono menonton serial selama ${menit} menit. Berapa jam penuh waktunya?`, jam]; },
                    () => { const menit = S.randInt(95, 175); const jam = Math.floor(menit / 60); return [`Perjalanan bus memakan waktu ${menit} menit. Itu berapa jam?`, jam]; },
                    () => { const menit = S.randInt(150, 300); const jam = Math.floor(menit / 60); return [`Acara berlangsung ${menit} menit. Jika dihitung jam penuh, menjadi berapa jam?`, jam]; },

                    () => { const h = S.randInt(2, 7); return [`Camping berlangsung selama ${h} hari. Total waktunya berapa jam?`, h * 24]; },
                    () => { const h = S.randInt(3, 6); return [`Libur sekolah berlangsung ${h} hari. Jika dihitung jam, ada berapa jam?`, h * 24]; },
                    () => { const h = S.randInt(4, 7); return [`Proyek dikerjakan selama ${h} hari nonstop. Berapa jam total waktunya?`, h * 24]; },
                    () => { const h = S.randInt(2, 5); return [`Lomba berlangsung ${h} hari berturut-turut. Itu setara berapa jam?`, h * 24]; },
                    () => { const h = S.randInt(5, 7); return [`Kegiatan pesantren kilat selama ${h} hari. Berapa jam semuanya?`, h * 24]; },

                    () => { const w = S.randInt(2, 4); return [`Latihan rutin dilakukan selama ${w} minggu. Total harinya berapa?`, w * 7]; },
                    () => { const w = S.randInt(3, 5); return [`Program belajar berlangsung ${w} minggu. Jika dihitung hari, menjadi berapa?`, w * 7]; },
                    () => { const w = S.randInt(2, 6); return [`Turnamen diadakan selama ${w} minggu. Total hari berapa?`, w * 7]; },
                    () => { const w = S.randInt(4, 6); return [`Pekerjaan proyek selesai dalam ${w} minggu. Itu setara berapa hari?`, w * 7]; },
                    () => { const w = S.randInt(2, 5); return [`Kursus online berjalan ${w} minggu penuh. Berapa hari total kursusnya?`, w * 7]; },

                    () => { const jam = S.randInt(2, 5); const menit = S.randInt(10, 50); return [`${jam} jam ${menit} menit = ... menit`, jam * 60 + menit]; },
                    () => { const menit = S.randInt(90, 180); const jam = Math.floor(menit / 60); return [`${menit} menit = berapa jam? (bulatkan ke bawah)`, jam]; },
                    () => { const hari = S.randInt(2, 7); return [`${hari} hari = ... jam`, hari * 24]; },
                    () => { const minggu = S.randInt(2, 4); return [`${minggu} minggu = ... hari`, minggu * 7]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const d = S.randInt(1, 3); return [`Seorang sejarawan mencatat sebuah kerajaan kuno bertahan selama ${d} dasawarsa. Jika diubah ke tahun, berapa lama kerajaan itu berdiri?`, d * 10]; }, () => { const a = S.randInt(1, 2); return [`Sebuah candi bersejarah telah berdiri selama ${a} abad dan masih kokoh hingga kini. Jika dihitung dalam tahun, berapa usia candi tersebut?`, a * 100]; }, () => { const t = S.randInt(24, 60); return [`Seorang guru mengabdi tanpa pindah sekolah selama ${t} tahun. Jika 1 windu = 8 tahun, berapa windu penuh masa pengabdiannya?`, Math.floor(t / 8)]; }, () => { const j = S.randInt(72, 168); return [`Mesin pabrik beroperasi nonstop selama ${j} jam untuk memenuhi pesanan. Jika diubah ke hari penuh, berapa hari mesin bekerja?`, Math.floor(j / 24)]; }, () => { const m = S.randInt(2880, 7200); return [`Ekspedisi penelitian berlangsung selama ${m} menit berturut-turut. Jika dihitung dalam hari penuh, berapa hari ekspedisi tersebut?`, Math.floor(m / 1440)]; },
                    () => { const w = S.randInt(2, 6); return [`Sebuah tradisi daerah diwariskan turun-temurun selama ${w} windu. Jika diubah ke satuan tahun, berapa lama tradisi itu berlangsung?`, w * 8]; }, () => { const a = S.randInt(2, 4); return [`Catatan sejarah menyebutkan sebuah dinasti berkuasa selama ${a} abad. Jika dihitung dalam tahun, berapa lama masa kekuasaannya?`, a * 100]; }, () => { const j = S.randInt(120, 300); return [`Tim riset tinggal di stasiun kutub selama ${j} jam tanpa pulang. Jika dihitung dalam hari penuh, berapa hari mereka berada di sana?`, Math.floor(j / 24)]; }, () => { const t = S.randInt(32, 80); return [`Seorang atlet profesional berlatih serius selama ${t} tahun. Jika dinyatakan dalam windu penuh, berapa windu masa latihannya?`, Math.floor(t / 8)]; }, () => { const d = S.randInt(4, 9); return [`Perayaan adat dilaksanakan terus-menerus selama ${d} dasawarsa. Jika diubah ke tahun, berapa lama perayaan itu berlangsung?`, d * 10]; },
                    () => { const h = S.randInt(240, 480); return [`Satelit komunikasi mengorbit bumi selama ${h} jam tanpa gangguan. Jika dihitung dalam hari penuh, berapa hari satelit aktif?`, Math.floor(h / 24)]; }, () => { const t = S.randInt(40, 96); return [`Seorang profesor mengajar di universitas selama ${t} tahun. Jika dihitung dalam windu penuh, ada berapa windu masa pengajarannya?`, Math.floor(t / 8)]; }, () => { const a = S.randInt(1, 3); return [`Sebuah benteng tua tercatat bertahan selama ${a} abad sebelum runtuh. Jika diubah ke tahun, berapa lama benteng itu berdiri?`, a * 100]; }, () => { const j = S.randInt(168, 360); return [`Kapal penelitian berlayar di lautan selama ${j} jam tanpa singgah. Jika dihitung dalam hari penuh, berapa hari pelayaran tersebut?`, Math.floor(j / 24)]; }, () => { const d = S.randInt(3, 7); return [`Manuskrip kuno disimpan dan dirawat selama ${d} dasawarsa. Jika dihitung dalam tahun, berapa usia manuskrip itu?`, d * 10]; },
                    () => { const w = S.randInt(3, 8); return [`Sebuah peradaban berkembang dan mencapai puncaknya selama ${w} windu. Jika dihitung dalam tahun, berapa lama peradaban itu berkembang?`, w * 8]; }, () => { const t = S.randInt(56, 120); return [`Tokoh sejarah terkenal hidup selama ${t} tahun. Jika dinyatakan dalam windu penuh, berapa windu usianya?`, Math.floor(t / 8)]; }, () => { const h = S.randInt(300, 600); return [`Penelitian laboratorium dilakukan nonstop selama ${h} jam. Jika dihitung dalam hari penuh, berapa hari penelitian berlangsung?`, Math.floor(h / 24)]; }, () => { const a = S.randInt(2, 5); return [`Perang besar dalam sejarah tercatat berlangsung selama ${a} abad. Jika diubah ke tahun, berapa lama perang tersebut terjadi?`, a * 100]; }, () => { const d = S.randInt(5, 10); return [`Tradisi keluarga dijaga turun-temurun selama ${d} dasawarsa. Jika dihitung dalam tahun, berapa lama tradisi itu bertahan?`, d * 10]; },
                    () => { const w = S.randInt(4, 10); return [`Sebuah kebudayaan berkembang selama ${w} windu sebelum akhirnya punah. Jika dihitung dalam tahun, berapa lama kebudayaan itu berkembang?`, w * 8]; }, () => { const t = S.randInt(64, 144); return [`Seorang ilmuwan melakukan riset sepanjang hidupnya selama ${t} tahun. Jika dinyatakan dalam windu penuh, berapa windu masa risetnya?`, Math.floor(t / 8)]; }, () => { const j = S.randInt(360, 720); return [`Stasiun luar angkasa beroperasi selama ${j} jam tanpa henti. Jika dihitung dalam hari penuh, berapa hari operasionalnya?`, Math.floor(j / 24)]; }, () => { const a = S.randInt(3, 6); return [`Kerajaan besar menguasai wilayahnya selama ${a} abad. Jika diubah ke satuan tahun, berapa lama kekuasaan itu berlangsung?`, a * 100]; }, () => { const d = S.randInt(6, 12); return [`Legenda rakyat diceritakan dari generasi ke generasi selama ${d} dasawarsa. Jika dihitung dalam tahun, berapa lama legenda itu dikenal?`, d * 10]; },
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
                    () => { const j1 = S.randInt(7, 9); const j2 = j1 + S.randInt(1, 3); return [`Pagi hari, dari jam ${j1} sampai jam ${j2} anak-anak belajar di kelas. Berapa lama waktunya?`, j2 - j1]; }, () => { const n = S.randName(); const m = S.randInt(8, 10); const s = m + S.randInt(1, 2); return [`${n} bermain di halaman rumah dari jam ${m} sampai jam ${s}. Berapa jam ${n} bermain?`, s - m]; }, () => { const m = S.randInt(7, 9); const s = m + S.randInt(2, 3); return [`Sekolah dimulai jam ${m} dan selesai jam ${s}. Berapa jam siswa berada di sekolah?`, s - m]; }, () => { const m = S.randInt(6, 8); const s = m + S.randInt(1, 3); return [`Ibu memasak sejak jam ${m} sampai jam ${s}. Berapa lama Ibu memasak?`, s - m]; }, () => { const m = S.randInt(9, 11); const s = m + 1; return [`Kartun favorit tayang dari jam ${m} sampai jam ${s}. Berapa jam durasinya?`, s - m]; },
                    () => { const n = S.randName(); const m = S.randInt(7, 9); const s = m + S.randInt(1, 3); return [`${n} bersepeda keliling komplek dari jam ${m} sampai jam ${s}. Berapa lama bersepeda?`, s - m]; }, () => { const m = S.randInt(8, 10); const s = m + 2; return [`Pelajaran Matematika dimulai jam ${m} dan berakhir jam ${s}. Berapa jam pelajaran?`, s - m]; }, () => { const m = S.randInt(6, 8); const s = m + S.randInt(1, 2); return [`Ayah berolahraga pagi dari jam ${m} sampai jam ${s}. Berapa jam olahraga?`, s - m]; }, () => { const m = S.randInt(10, 12); const s = m + S.randInt(1, 2); return [`Acara TV sore dimulai jam ${m} dan selesai jam ${s}. Berapa lama acara tersebut?`, s - m]; }, () => { const m = S.randInt(7, 9); const s = m + S.randInt(2, 3); return [`Perpustakaan sekolah buka jam ${m} dan tutup jam ${s}. Berapa jam perpustakaan buka?`, s - m]; },
                    () => { const n = S.randName(); const m = S.randInt(8, 10); const s = m + S.randInt(1, 2); return [`${n} membaca buku cerita dari jam ${m} sampai jam ${s}. Berapa lama membaca?`, s - m]; }, () => { const m = S.randInt(6, 8); const s = m + 2; return [`Olahraga pagi dimulai jam ${m} dan selesai jam ${s}. Berapa jam olahraga pagi?`, s - m]; }, () => { const m = S.randInt(9, 11); const s = m + 1; return [`Ulangan harian dimulai jam ${m} dan selesai jam ${s}. Berapa lama ulangan?`, s - m]; }, () => { const m = S.randInt(7, 9); const s = m + S.randInt(1, 2); return [`Sarapan keluarga dimulai jam ${m} dan selesai jam ${s}. Berapa jam sarapan?`, s - m]; }, () => { const m = S.randInt(10, 12); const s = m + S.randInt(1, 2); return [`Anak-anak bermain di taman dari jam ${m} sampai jam ${s}. Berapa lama bermain?`, s - m]; },
                    () => { const n = S.randName(); const m = S.randInt(6, 8); const s = m + S.randInt(1, 3); return [`${n} membantu orang tua dari jam ${m} sampai jam ${s}. Berapa jam membantu?`, s - m]; }, () => { const m = S.randInt(8, 10); const s = m + S.randInt(2, 3); return [`Belajar kelompok dimulai jam ${m} dan selesai jam ${s}. Berapa jam belajar kelompok?`, s - m]; }, () => { const m = S.randInt(7, 9); const s = m + 1; return [`Upacara sekolah dimulai jam ${m} dan selesai jam ${s}. Berapa jam upacara berlangsung?`, s - m]; }, () => { const m = S.randInt(9, 11); const s = m + S.randInt(1, 2); return [`Guru mengajar di kelas dari jam ${m} sampai jam ${s}. Berapa lama mengajar?`, s - m]; }, () => { const m = S.randInt(6, 8); const s = m + S.randInt(2, 3); return [`Pasar pagi buka jam ${m} dan tutup jam ${s}. Berapa jam pasar buka?`, s - m]; },
                    () => { const jam1 = S.randInt(7, 10); const jam2 = jam1 + S.randInt(1, 3); return [`Dari jam ${jam1} sampai jam ${jam2} = ... jam`, jam2 - jam1]; },
                    () => { const nama = S.randName(); const mulai = S.randInt(8, 11); const selesai = mulai + S.randInt(1, 3); return [`${nama} bermain dari jam ${mulai} sampai jam ${selesai}. Berapa lama bermain?`, selesai - mulai]; },
                    () => { const mulai = S.randInt(7, 9); const selesai = S.randInt(11, 13); return [`Sekolah mulai jam ${mulai} dan pulang jam ${selesai}. Berapa jam di sekolah?`, selesai - mulai]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const j1 = S.randInt(8, 10); const j2 = j1 + S.randInt(2, 4); return [`Pagi hari siswa belajar dari pukul ${j1}.00 sampai pukul ${j2}.30. Berapa menit total belajar?`, (j2 - j1) * 60 + 30]; }, () => { const d = S.randInt(90, 150); return [`Sebuah film diputar di bioskop dengan durasi ${d} menit. Jika diubah ke jam dan menit, sisa menitnya berapa?`, d % 60]; }, () => { const b = S.randInt(6, 8); const s = b + S.randInt(3, 5); return [`Bus berangkat pukul ${b}.00 dan tiba pukul ${s}.00. Berapa jam lama perjalanan?`, s - b]; }, () => { const j1 = S.randInt(9, 11); const j2 = j1 + S.randInt(1, 3); return [`Les privat dimulai pukul ${j1}.00 dan selesai pukul ${j2}.30. Berapa menit durasi les?`, (j2 - j1) * 60 + 30]; }, () => { const d = S.randInt(100, 160); return [`Video pembelajaran berdurasi ${d} menit. Jika dihitung jam, sisa menitnya berapa?`, d % 60]; },
                    () => { const b = S.randInt(7, 9); const s = b + S.randInt(2, 4); return [`Ayah bekerja dari pukul ${b}.00 sampai ${s}.00 sebelum istirahat. Berapa jam bekerja?`, s - b]; }, () => { const j1 = S.randInt(8, 10); const j2 = j1 + S.randInt(2, 3); return [`Latihan olahraga dimulai pukul ${j1}.00 dan berakhir pukul ${j2}.30. Berapa menit latihan?`, (j2 - j1) * 60 + 30]; }, () => { const d = S.randInt(95, 155); return [`Acara TV favorit berdurasi ${d} menit. Sisa menit setelah dihitung jam berapa?`, d % 60]; }, () => { const b = S.randInt(6, 8); const s = b + S.randInt(3, 4); return [`Perjalanan sekolah dimulai jam ${b}.00 dan sampai jam ${s}.00. Berapa jam perjalanan?`, s - b]; }, () => { const j1 = S.randInt(9, 11); const j2 = j1 + S.randInt(2, 4); return [`Perpustakaan buka pukul ${j1}.00 dan tutup pukul ${j2}.30. Berapa menit perpustakaan buka?`, (j2 - j1) * 60 + 30]; },
                    () => { const d = S.randInt(90, 180); return [`Rekaman video belajar berdurasi ${d} menit. Jika diubah ke jam, sisa menitnya berapa?`, d % 60]; }, () => { const b = S.randInt(7, 9); const s = b + S.randInt(2, 5); return [`Kegiatan pramuka dimulai jam ${b}.00 dan selesai jam ${s}.00. Berapa jam kegiatan?`, s - b]; }, () => { const j1 = S.randInt(8, 10); const j2 = j1 + S.randInt(1, 3); return [`Ulangan dimulai pukul ${j1}.00 dan selesai pukul ${j2}.30. Berapa menit durasi ulangan?`, (j2 - j1) * 60 + 30]; }, () => { const d = S.randInt(105, 165); return [`Film kartun berdurasi ${d} menit. Hitung sisa menit setelah jamnya.`, d % 60]; }, () => { const b = S.randInt(6, 8); const s = b + S.randInt(4, 6); return [`Perjalanan wisata dimulai jam ${b}.00 dan tiba jam ${s}.00. Berapa jam perjalanan?`, s - b]; },
                    () => { const j1 = S.randInt(9, 11); const j2 = j1 + S.randInt(2, 3); return [`Belajar kelompok dimulai pukul ${j1}.00 dan selesai pukul ${j2}.30. Berapa menit belajar?`, (j2 - j1) * 60 + 30]; }, () => { const d = S.randInt(120, 180); return [`Video dokumenter berdurasi ${d} menit. Jika dihitung ke jam, sisa menitnya berapa?`, d % 60]; }, () => { const b = S.randInt(7, 9); const s = b + S.randInt(3, 5); return [`Petani bekerja dari jam ${b}.00 sampai jam ${s}.00. Berapa jam bekerja?`, s - b]; }, () => { const j1 = S.randInt(8, 10); const j2 = j1 + S.randInt(2, 4); return [`Kegiatan lomba dimulai pukul ${j1}.00 dan selesai pukul ${j2}.30. Berapa menit lomba berlangsung?`, (j2 - j1) * 60 + 30]; }, () => { const d = S.randInt(90, 150); return [`Sebuah podcast berdurasi ${d} menit. Hitung sisa menit setelah jamnya.`, d % 60]; },

                    () => { const jam1 = S.randInt(8, 12); const menit1 = 0; const jam2 = jam1 + S.randInt(2, 4); const menit2 = 30; return [`Dari pukul ${jam1}.00 sampai ${jam2}.30, berapa menit?`, (jam2 - jam1) * 60 + menit2]; },
                    () => { const durasi = S.randInt(90, 150); return [`Film berdurasi ${durasi} menit. Berapa jam lebihnya? (sisanya dalam menit)`, durasi % 60]; },
                    () => { const berangkat = S.randInt(6, 8); const sampai = S.randInt(9, 12); return [`Berangkat jam ${berangkat}.00, sampai jam ${sampai}.00. Lama perjalanan ... jam`, sampai - berangkat]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const j1 = S.randInt(8, 11); const m1 = S.randInt(0, 3) * 15; const j2 = j1 + S.randInt(2, 5); const m2 = S.randInt(0, 3) * 15; return [`Seorang siswa mulai belajar pukul ${j1}.${m1.toString().padStart(2, '0')} dan selesai pukul ${j2}.${m2.toString().padStart(2, '0')}. Berapa menit total waktu belajarnya?`, (j2 * 60 + m2) - (j1 * 60 + m1)]; }, () => { const j1 = S.randInt(6, 9); const m1 = S.randInt(0, 3) * 15; const j2 = j1 + S.randInt(3, 6); const m2 = S.randInt(0, 3) * 15; return [`Bus berangkat pukul ${j1}.${m1.toString().padStart(2, '0')} dan tiba pukul ${j2}.${m2.toString().padStart(2, '0')}. Berapa menit lama perjalanan bus?`, (j2 * 60 + m2) - (j1 * 60 + m1)]; }, () => { const j1 = S.randInt(9, 12); const m1 = S.randInt(0, 3) * 15; const j2 = j1 + S.randInt(1, 4); const m2 = S.randInt(0, 3) * 15; return [`Les musik dimulai pukul ${j1}.${m1.toString().padStart(2, '0')} dan berakhir pukul ${j2}.${m2.toString().padStart(2, '0')}. Hitung durasinya dalam menit.`, (j2 * 60 + m2) - (j1 * 60 + m1)]; }, () => { const j1 = S.randInt(7, 10); const m1 = S.randInt(0, 3) * 15; const j2 = j1 + S.randInt(2, 5); const m2 = S.randInt(0, 3) * 15; return [`Ayah bekerja dari pukul ${j1}.${m1.toString().padStart(2, '0')} sampai ${j2}.${m2.toString().padStart(2, '0')}. Berapa menit ayah bekerja?`, (j2 * 60 + m2) - (j1 * 60 + m1)]; }, () => { const j1 = S.randInt(10, 12); const m1 = S.randInt(0, 3) * 15; const j2 = j1 + S.randInt(2, 4); const m2 = S.randInt(0, 3) * 15; return [`Film diputar pukul ${j1}.${m1.toString().padStart(2, '0')} dan selesai pukul ${j2}.${m2.toString().padStart(2, '0')}. Berapa menit durasi film?`, (j2 * 60 + m2) - (j1 * 60 + m1)]; },
                    () => { const t1 = S.randInt(2005, 2010); const t2 = S.randInt(2020, 2024); return [`Sebuah gedung dibangun tahun ${t1} dan direnovasi tahun ${t2}. Berapa tahun selang waktunya?`, t2 - t1]; }, () => { const t1 = S.randInt(1998, 2005); const t2 = 2024; return [`Seseorang lahir tahun ${t1} dan sekarang tahun ${t2}. Berapa umurnya sekarang?`, t2 - t1]; }, () => { const t1 = S.randInt(2012, 2016); const t2 = S.randInt(2022, 2024); return [`Sekolah berdiri tahun ${t1} dan sekarang tahun ${t2}. Sudah berapa tahun sekolah itu berdiri?`, t2 - t1]; }, () => { const t1 = S.randInt(2000, 2008); const t2 = S.randInt(2018, 2024); return [`Usaha keluarga dimulai tahun ${t1} dan masih berjalan sampai tahun ${t2}. Sudah berapa tahun usaha tersebut berjalan?`, t2 - t1]; }, () => { const t1 = S.randInt(2015, 2018); const t2 = 2024; return [`Seorang atlet mulai berlatih serius sejak tahun ${t1}. Pada tahun ${t2}, sudah berapa tahun ia berlatih?`, t2 - t1]; },
                    () => { const j1 = S.randInt(8, 10); const m1 = S.randInt(0, 3) * 15; const j2 = j1 + S.randInt(3, 6); const m2 = S.randInt(0, 3) * 15; return [`Perpustakaan buka pukul ${j1}.${m1.toString().padStart(2, '0')} dan tutup pukul ${j2}.${m2.toString().padStart(2, '0')}. Berapa menit perpustakaan buka?`, (j2 * 60 + m2) - (j1 * 60 + m1)]; }, () => { const j1 = S.randInt(6, 8); const m1 = S.randInt(0, 3) * 15; const j2 = j1 + S.randInt(4, 6); const m2 = S.randInt(0, 3) * 15; return [`Perjalanan wisata dimulai pukul ${j1}.${m1.toString().padStart(2, '0')} dan berakhir pukul ${j2}.${m2.toString().padStart(2, '0')}. Hitung lama perjalanan dalam menit.`, (j2 * 60 + m2) - (j1 * 60 + m1)]; }, () => { const j1 = S.randInt(9, 11); const m1 = S.randInt(0, 3) * 15; const j2 = j1 + S.randInt(2, 4); const m2 = S.randInt(0, 3) * 15; return [`Ujian dimulai pukul ${j1}.${m1.toString().padStart(2, '0')} dan selesai pukul ${j2}.${m2.toString().padStart(2, '0')}. Berapa menit waktu ujian?`, (j2 * 60 + m2) - (j1 * 60 + m1)]; }, () => { const j1 = S.randInt(7, 9); const m1 = S.randInt(0, 3) * 15; const j2 = j1 + S.randInt(5, 7); const m2 = S.randInt(0, 3) * 15; return [`Petani mulai bekerja pukul ${j1}.${m1.toString().padStart(2, '0')} dan berhenti pukul ${j2}.${m2.toString().padStart(2, '0')}. Berapa menit ia bekerja?`, (j2 * 60 + m2) - (j1 * 60 + m1)]; }, () => { const j1 = S.randInt(13, 15); const m1 = S.randInt(0, 3) * 15; const j2 = j1 + S.randInt(2, 4); const m2 = S.randInt(0, 3) * 15; return [`Latihan olahraga dimulai pukul ${j1}.${m1.toString().padStart(2, '0')} dan selesai pukul ${j2}.${m2.toString().padStart(2, '0')}. Hitung durasinya dalam menit.`, (j2 * 60 + m2) - (j1 * 60 + m1)]; },
                    () => { const t1 = S.randInt(1995, 2000); const t2 = S.randInt(2015, 2020); return [`Sebuah jembatan dibangun tahun ${t1} dan diperbaiki tahun ${t2}. Berapa tahun jaraknya?`, t2 - t1]; }, () => { const t1 = S.randInt(2003, 2007); const t2 = 2024; return [`Seseorang mulai sekolah tahun ${t1} dan sekarang tahun ${t2}. Sudah berapa tahun berlalu?`, t2 - t1]; }, () => { const t1 = S.randInt(2010, 2014); const t2 = S.randInt(2020, 2024); return [`Perusahaan berdiri tahun ${t1} dan berkembang hingga tahun ${t2}. Sudah berapa tahun perusahaan itu berjalan?`, t2 - t1]; }, () => { const t1 = S.randInt(2008, 2012); const t2 = S.randInt(2021, 2024); return [`Seorang penulis mulai menulis sejak tahun ${t1}. Pada tahun ${t2}, sudah berapa tahun ia menulis?`, t2 - t1]; }, () => { const t1 = S.randInt(2016, 2019); const t2 = 2024; return [`Seorang atlet mulai bertanding tahun ${t1}. Sampai tahun ${t2}, sudah berapa tahun kariernya?`, t2 - t1]; },

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
                    () => { const kg = S.randInt(1, 5); return [`Ibu membeli ${kg} kg gula di warung, lalu menimbang ulang. Berapa ons berat gula tersebut?`, kg * 10]; }, () => { const ons = S.randInt(2, 5) * 10; return [`Pedagang punya ${ons} ons beras dan ingin mengubahnya ke kilogram. Berapa kg berat beras itu?`, ons / 10]; }, () => { const kg = S.randInt(1, 3); return [`Seekor kucing diberi makan sebanyak ${kg} kg. Jika diubah ke gram, berapa gram makanannya?`, kg * 1000]; }, () => { const gram = S.randInt(1, 5) * 1000; return [`Di dapur ada ${gram} gram tepung. Jika ditulis dalam kilogram, menjadi berapa kg?`, gram / 1000]; }, () => { const kg = S.randInt(1, 5); return [`Ayah mengangkat karung seberat ${kg} kg. Berapa ons berat karung tersebut?`, kg * 10]; },
                    () => { const ons = S.randInt(1, 5) * 10; return [`Seorang penjual menulis berat ${ons} ons di papan. Itu sama dengan berapa kg?`, ons / 10]; }, () => { const kg = S.randInt(1, 4); return [`Tas sekolah beratnya ${kg} kg. Jika diubah ke gram, berapa gram berat tas itu?`, kg * 1000]; }, () => { const gram = S.randInt(2, 6) * 1000; return [`Timbangan menunjukkan ${gram} gram. Dalam kilogram, berat itu sama dengan berapa kg?`, gram / 1000]; }, () => { const kg = S.randInt(1, 5); return [`Di pasar, ibu membeli ${kg} kg apel. Berapa ons apel yang dibeli ibu?`, kg * 10]; }, () => { const ons = S.randInt(2, 5) * 10; return [`Kotak kecil berisi ${ons} ons gula. Jika diubah ke kilogram, berapa kg?`, ons / 10]; },
                    () => { const kg = S.randInt(1, 3); return [`Seekor ayam beratnya ${kg} kg. Berapa gram berat ayam tersebut?`, kg * 1000]; }, () => { const gram = S.randInt(1, 4) * 1000; return [`Di resep tertulis ${gram} gram tepung. Itu sama dengan berapa kg?`, gram / 1000]; }, () => { const kg = S.randInt(2, 5); return [`Karung beras beratnya ${kg} kg. Jika dihitung dalam ons, menjadi berapa ons?`, kg * 10]; }, () => { const ons = S.randInt(3, 6) * 10; return [`Penjual menimbang cabai seberat ${ons} ons. Berapa kg cabai tersebut?`, ons / 10]; }, () => { const kg = S.randInt(1, 4); return [`Buku paket beratnya ${kg} kg. Jika ditulis dalam gram, berapa gram beratnya?`, kg * 1000]; },
                    () => { const gram = S.randInt(2, 5) * 1000; return [`Kantong tepung berisi ${gram} gram. Dalam satuan kilogram, berapa kg isinya?`, gram / 1000]; }, () => { const kg = S.randInt(1, 5); return [`Ibu membawa buah seberat ${kg} kg. Jika diubah ke ons, berapa ons berat buah itu?`, kg * 10]; }, () => { const ons = S.randInt(1, 5) * 10; return [`Di meja ada ${ons} ons gula. Berapa kg gula tersebut?`, ons / 10]; }, () => { const kg = S.randInt(1, 3); return [`Seekor kelinci beratnya ${kg} kg. Jika diubah ke gram, berapa gram berat kelinci?`, kg * 1000]; }, () => { const gram = S.randInt(3, 6) * 1000; return [`Timbangan dapur menunjukkan ${gram} gram. Dalam kilogram, berat itu menjadi berapa kg?`, gram / 1000]; },

                    () => { const kg = S.randInt(1, 5); return [`${kg} kg = ... ons (1 kg = 10 ons)`, kg * 10]; },
                    () => { const ons = S.randInt(1, 5) * 10; return [`${ons} ons = ... kg`, ons / 10]; },
                    () => { const kg = S.randInt(1, 3); return [`${kg} kg = ... gram (1 kg = 1000 gram)`, kg * 1000]; },
                    () => { const gram = S.randInt(1, 5) * 1000; return [`${gram} gram = ... kg`, gram / 1000]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const kg = S.randInt(1, 10); const gram = S.randInt(100, 900); return [`Seorang pedagang membawa beras seberat ${kg} kg ${gram} gram, jika ditimbang ulang semuanya menjadi berapa gram?`, kg * 1000 + gram]; }, () => { const kuintal = S.randInt(1, 5); return [`Pak tani memanen padi sebanyak ${kuintal} kuintal dan ingin mencatatnya dalam kilogram, berapa kg hasil panennya?`, kuintal * 100]; }, () => { const kg = S.randInt(100, 500); return [`Gudang mencatat stok tepung ${kg} kg, jika diubah ke satuan kuintal menjadi berapa kuintal?`, kg / 100]; }, () => { const ons = S.randInt(10, 50); return [`Ibu membeli gula sebanyak ${ons} ons di pasar, jika diubah ke gram menjadi berapa gram?`, ons * 100]; }, () => { const kg = S.randInt(2, 9); const gram = S.randInt(200, 800); return [`Tas belanja berisi ${kg} kg ${gram} gram buah, total berat buah tersebut dalam gram adalah berapa?`, kg * 1000 + gram]; },
                    () => { const kuintal = S.randInt(1, 4); return [`Hasil panen jagung mencapai ${kuintal} kuintal, jika ditulis dalam kilogram berapa kg semuanya?`, kuintal * 100]; }, () => { const kg = S.randInt(150, 450); return [`Truk mengangkut pasir seberat ${kg} kg, itu sama dengan berapa kuintal?`, kg / 100]; }, () => { const ons = S.randInt(15, 45); return [`Penjual keju memotong keju seberat ${ons} ons, jika dihitung dalam gram menjadi berapa gram?`, ons * 100]; }, () => { const kg = S.randInt(1, 8); const gram = S.randInt(100, 900); return [`Seekor hewan kecil ditimbang dan hasilnya ${kg} kg ${gram} gram, berapa gram berat hewan tersebut?`, kg * 1000 + gram]; }, () => { const kuintal = S.randInt(2, 5); return [`Gudang beras menyimpan ${kuintal} kuintal beras, jika diubah ke kg menjadi berapa kilogram?`, kuintal * 100]; },
                    () => { const kg = S.randInt(120, 380); return [`Catatan logistik menunjukkan berat barang ${kg} kg, jika diubah ke kuintal menjadi berapa kuintal?`, kg / 100]; }, () => { const ons = S.randInt(20, 50); return [`Seorang pembeli membeli daging ${ons} ons, berapa gram daging yang dibelinya?`, ons * 100]; }, () => { const kg = S.randInt(3, 10); const gram = S.randInt(150, 850); return [`Ransel pendaki beratnya ${kg} kg ${gram} gram, jika ditulis dalam gram menjadi berapa?`, kg * 1000 + gram]; }, () => { const kuintal = S.randInt(1, 3); return [`Petani menjual singkong sebanyak ${kuintal} kuintal, jika dikonversi ke kg menjadi berapa?`, kuintal * 100]; }, () => { const kg = S.randInt(200, 500); return [`Sebuah mesin memiliki berat ${kg} kg, jika dinyatakan dalam kuintal berapa nilainya?`, kg / 100]; },
                    () => { const ons = S.randInt(12, 48); return [`Toko menjual mentega seberat ${ons} ons, jika dihitung dalam gram menjadi berapa gram?`, ons * 100]; }, () => { const kg = S.randInt(2, 9); const gram = S.randInt(100, 900); return [`Ibu menimbang bahan kue ${kg} kg ${gram} gram, total berat bahan tersebut dalam gram adalah berapa?`, kg * 1000 + gram]; }, () => { const kuintal = S.randInt(2, 5); return [`Hasil panen kentang mencapai ${kuintal} kuintal, jika diubah ke kilogram menjadi berapa kg?`, kuintal * 100]; }, () => { const kg = S.randInt(100, 400); return [`Catatan gudang menunjukkan berat semen ${kg} kg, itu setara dengan berapa kuintal?`, kg / 100]; }, () => { const ons = S.randInt(18, 50); return [`Penjual menakar kopi ${ons} ons, jika diubah ke gram menjadi berapa gram?`, ons * 100]; },
                    () => { const kg = S.randInt(4, 10); const gram = S.randInt(200, 900); return [`Seekor anak kambing ditimbang ${kg} kg ${gram} gram, berapa gram berat seluruhnya?`, kg * 1000 + gram]; }, () => { const kuintal = S.randInt(1, 4); return [`Gudang logistik menyimpan ${kuintal} kuintal gula, jika diubah ke kg menjadi berapa kilogram?`, kuintal * 100]; }, () => { const kg = S.randInt(180, 500); return [`Muatan truk tercatat ${kg} kg, jika dinyatakan dalam kuintal menjadi berapa?`, kg / 100]; }, () => { const ons = S.randInt(10, 40); return [`Ibu membeli cokelat seberat ${ons} ons, jika diubah ke gram menjadi berapa gram?`, ons * 100]; }, () => { const kg = S.randInt(1, 10); const gram = S.randInt(100, 900); return [`Timbangan menunjukkan ${kg} kg ${gram} gram, total berat dalam gram adalah berapa?`, kg * 1000 + gram]; },

                    () => { const kg = S.randInt(1, 10); const gram = S.randInt(100, 900); return [`${kg} kg ${gram} gram = ... gram`, kg * 1000 + gram]; },
                    () => { const kuintal = S.randInt(1, 5); return [`${kuintal} kuintal = ... kg (1 kuintal = 100 kg)`, kuintal * 100]; },
                    () => { const kg = S.randInt(100, 500); return [`${kg} kg = ... kuintal`, kg / 100]; },
                    () => { const ons = S.randInt(10, 50); return [`${ons} ons = ... gram`, ons * 100]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const ton = S.randInt(1, 5); const kg = S.randInt(100, 900); return [`Sebuah truk tambang mengangkut pasir seberat ${ton} ton ${kg} kg, jika seluruh muatan ditulis dalam kilogram menjadi berapa kg?`, ton * 1000 + kg]; }, () => { const kg = S.randInt(2000, 8000); return [`Catatan gudang menunjukkan berat besi ${kg.toLocaleString()} kg, jika diubah ke satuan ton hasilnya berapa ton?`, kg / 1000]; }, () => { const ton = S.randInt(1, 3); const kuintal = S.randInt(1, 9); return [`Gudang beras menyimpan stok ${ton} ton ${kuintal} kuintal, jika dihitung seluruhnya dalam kilogram menjadi berapa kg?`, ton * 1000 + kuintal * 100]; }, () => { const ton = S.randInt(2, 6); const kg = S.randInt(200, 950); return [`Sebuah kapal membawa muatan ${ton} ton ${kg} kg, berapa kilogram total muatan kapal tersebut?`, ton * 1000 + kg]; }, () => { const kg = S.randInt(3500, 9500); return [`Laporan logistik mencatat berat semen ${kg.toLocaleString()} kg, jika dinyatakan dalam ton menjadi berapa ton?`, kg / 1000]; },
                    () => { const ton = S.randInt(1, 4); const kuintal = S.randInt(2, 8); return [`Hasil panen tebu mencapai ${ton} ton ${kuintal} kuintal, jika diubah ke kilogram menjadi berapa kg?`, ton * 1000 + kuintal * 100]; }, () => { const ton = S.randInt(3, 7); const kg = S.randInt(100, 800); return [`Truk proyek mengangkut batu sebanyak ${ton} ton ${kg} kg, total berat dalam kilogram adalah berapa?`, ton * 1000 + kg]; }, () => { const kg = S.randInt(2500, 7000); return [`Berat mesin tercatat ${kg.toLocaleString()} kg, jika dikonversi ke ton menjadi berapa ton?`, kg / 1000]; }, () => { const ton = S.randInt(2, 5); const kuintal = S.randInt(1, 9); return [`Gudang pupuk memiliki stok ${ton} ton ${kuintal} kuintal, jika ditulis dalam kilogram menjadi berapa kg?`, ton * 1000 + kuintal * 100]; }, () => { const ton = S.randInt(1, 6); const kg = S.randInt(300, 900); return [`Muatan kapal kargo adalah ${ton} ton ${kg} kg, berapa kilogram seluruh muatan tersebut?`, ton * 1000 + kg]; },
                    () => { const kg = S.randInt(4000, 9000); return [`Laporan ekspedisi menunjukkan berat paket besar ${kg.toLocaleString()} kg, jika diubah ke satuan ton menjadi berapa ton?`, kg / 1000]; }, () => { const ton = S.randInt(2, 4); const kuintal = S.randInt(3, 9); return [`Hasil panen jagung mencapai ${ton} ton ${kuintal} kuintal, jika dihitung dalam kilogram menjadi berapa kg?`, ton * 1000 + kuintal * 100]; }, () => { const ton = S.randInt(3, 8); const kg = S.randInt(150, 750); return [`Truk pengangkut pasir membawa ${ton} ton ${kg} kg, berapa kilogram total muatannya?`, ton * 1000 + kg]; }, () => { const kg = S.randInt(3000, 8500); return [`Berat total barang di gudang adalah ${kg.toLocaleString()} kg, jika dinyatakan dalam ton menjadi berapa ton?`, kg / 1000]; }, () => { const ton = S.randInt(1, 5); const kuintal = S.randInt(2, 7); return [`Petani menyimpan hasil panen ${ton} ton ${kuintal} kuintal, jika diubah ke kilogram menjadi berapa kg?`, ton * 1000 + kuintal * 100]; },
                    () => { const ton = S.randInt(2, 6); const kg = S.randInt(100, 900); return [`Sebuah proyek konstruksi menerima material ${ton} ton ${kg} kg, total berat material dalam kilogram adalah berapa?`, ton * 1000 + kg]; }, () => { const kg = S.randInt(5000, 10000); return [`Catatan pabrik menunjukkan produksi besi ${kg.toLocaleString()} kg, jika dikonversi ke ton menjadi berapa ton?`, kg / 1000]; }, () => { const ton = S.randInt(1, 4); const kuintal = S.randInt(4, 9); return [`Gudang logistik mencatat stok ${ton} ton ${kuintal} kuintal, jika dihitung seluruhnya dalam kilogram menjadi berapa kg?`, ton * 1000 + kuintal * 100]; }, () => { const ton = S.randInt(3, 7); const kg = S.randInt(250, 850); return [`Kapal pengangkut membawa muatan ${ton} ton ${kg} kg, berapa kilogram total muatan kapal?`, ton * 1000 + kg]; }, () => { const kg = S.randInt(2800, 9200); return [`Laporan tahunan mencatat berat barang ${kg.toLocaleString()} kg, jika diubah ke satuan ton menjadi berapa ton?`, kg / 1000]; },
                    () => { const ton = S.randInt(2, 5); const kuintal = S.randInt(1, 8); return [`Hasil panen singkong sebanyak ${ton} ton ${kuintal} kuintal, jika dinyatakan dalam kilogram menjadi berapa kg?`, ton * 1000 + kuintal * 100]; }, () => { const ton = S.randInt(4, 8); const kg = S.randInt(100, 700); return [`Truk besar mengangkut material ${ton} ton ${kg} kg, total berat dalam kilogram adalah berapa?`, ton * 1000 + kg]; }, () => { const kg = S.randInt(3500, 8000); return [`Gudang pusat mencatat berat stok ${kg.toLocaleString()} kg, jika dikonversi ke ton menjadi berapa ton?`, kg / 1000]; }, () => { const ton = S.randInt(1, 6); const kuintal = S.randInt(2, 9); return [`Petani mengumpulkan hasil panen ${ton} ton ${kuintal} kuintal, jika dihitung dalam kilogram menjadi berapa kg?`, ton * 1000 + kuintal * 100]; }, () => { const ton = S.randInt(2, 7); const kg = S.randInt(300, 900); return [`Sebuah kapal logistik membawa ${ton} ton ${kg} kg muatan, berapa kilogram total muatan tersebut?`, ton * 1000 + kg]; },

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
                    () => { const a = S.randInt(1, 5); const b = S.randInt(1, 4); return [`${S.randName()} pergi ke pasar pagi dan membeli ${a} kg ${S.randFruit()}, lalu menambah belanjaan ${b} kg lagi karena stok di rumah habis. Total buah yang dibawa pulang berapa kg?`, a + b]; }, () => { const total = S.randInt(6, 10); const ambil = S.randInt(1, 4); return [`Di dapur ada karung berisi ${total} kg beras, ibu memasak dan mengambil ${ambil} kg untuk persiapan makan siang. Sisa beras sekarang berapa kg?`, total - ambil]; }, () => { const a = S.randInt(2, 6); const b = S.randInt(1, 3); return [`Tas sekolah ${S.randName()} awalnya berbobot ${a} kg, lalu dimasukkan buku tambahan seberat ${b} kg. Sekarang berat tas menjadi berapa kg?`, a + b]; }, () => { const total = S.randInt(7, 12); const pakai = S.randInt(2, 5); return [`Gudang kecil menyimpan ${total} kg tepung, sebagian digunakan ${pakai} kg untuk membuat kue. Berapa kg tepung yang tersisa di gudang?`, total - pakai]; }, () => { const a = S.randInt(1, 4); const b = S.randInt(1, 4); return [`${S.randName()} membantu ayah memindahkan ${a} kg gula, lalu memindahkan lagi ${b} kg ke rak lain. Total gula yang dipindahkan berapa kg?`, a + b]; },
                    () => { const total = S.randInt(8, 14); const diambil = S.randInt(3, 6); return [`Di warung ada ${total} kg kentang, pelanggan membeli ${diambil} kg. Berapa kg kentang yang masih tersisa di warung?`, total - diambil]; }, () => { const a = S.randInt(2, 7); const b = S.randInt(1, 5); return [`Keranjang pertama berisi ${a} kg jeruk dan keranjang kedua berisi ${b} kg jeruk. Jika digabung, total jeruk berapa kg?`, a + b]; }, () => { const total = S.randInt(6, 11); const rusak = S.randInt(1, 3); return [`Petani memanen ${total} kg tomat, namun ${rusak} kg rusak saat perjalanan. Berapa kg tomat yang masih bagus?`, total - rusak]; }, () => { const a = S.randInt(3, 8); const b = S.randInt(1, 4); return [`${S.randName()} menimbang beras ${a} kg, lalu menambahkan lagi ${b} kg ke timbangan. Timbangan menunjukkan total berapa kg?`, a + b]; }, () => { const total = S.randInt(9, 15); const dipakai = S.randInt(2, 6); return [`Gudang sekolah menyimpan ${total} kg pasir, digunakan ${dipakai} kg untuk praktik. Sisa pasir sekarang berapa kg?`, total - dipakai]; },
                    () => { const a = S.randInt(2, 5); const b = S.randInt(2, 5); return [`Ibu membeli ${a} kg apel dan ${b} kg pir untuk bekal anak-anak. Total buah yang dibeli berapa kg?`, a + b]; }, () => { const total = S.randInt(7, 13); const diambil = S.randInt(1, 5); return [`Di lemari es ada ${total} kg daging, sebagian ${diambil} kg dimasak hari ini. Berapa kg daging yang tersisa?`, total - diambil]; }, () => { const a = S.randInt(1, 6); const b = S.randInt(1, 4); return [`${S.randName()} membawa ${a} kg tepung dari toko, lalu membeli tambahan ${b} kg karena kurang. Total tepung yang dibawa pulang berapa kg?`, a + b]; }, () => { const total = S.randInt(10, 16); const dijual = S.randInt(3, 7); return [`Pedagang memiliki ${total} kg cabai, terjual ${dijual} kg hari ini. Sisa cabai berapa kg?`, total - dijual]; }, () => { const a = S.randInt(2, 7); const b = S.randInt(1, 5); return [`Karung pertama berisi ${a} kg beras dan karung kedua berisi ${b} kg beras. Jika digabung, total beras berapa kg?`, a + b]; },
                    () => { const total = S.randInt(8, 14); const dipakai = S.randInt(2, 5); return [`Di dapur tersedia ${total} kg gula, digunakan ${dipakai} kg untuk membuat minuman. Berapa kg gula yang tersisa?`, total - dipakai]; }, () => { const a = S.randInt(3, 6); const b = S.randInt(2, 4); return [`${S.randName()} mengangkat ${a} kg wortel, lalu menambah ${b} kg lagi ke keranjang. Total wortel yang dibawa berapa kg?`, a + b]; }, () => { const total = S.randInt(6, 12); const hilang = S.randInt(1, 3); return [`Gudang mencatat ${total} kg beras, ternyata ${hilang} kg tumpah. Berapa kg beras yang masih ada?`, total - hilang]; }, () => { const a = S.randInt(2, 8); const b = S.randInt(1, 4); return [`Ayah membeli ${a} kg ikan di pagi hari, lalu membeli tambahan ${b} kg siang hari. Total ikan berapa kg?`, a + b]; }, () => { const total = S.randInt(9, 15); const dipakai = S.randInt(3, 6); return [`Di rumah ada ${total} kg air galon cadangan, digunakan ${dipakai} kg. Sisa air sekarang berapa kg?`, total - dipakai]; },
                    () => { const a = S.randInt(1, 5); const b = S.randInt(2, 5); return [`${S.randName()} membawa ${a} kg jagung dari kebun, lalu memetik lagi ${b} kg. Total jagung yang dibawa berapa kg?`, a + b]; }, () => { const total = S.randInt(7, 12); const diambil = S.randInt(2, 4); return [`Di kios ada ${total} kg gula merah, pembeli mengambil ${diambil} kg. Sisa gula merah berapa kg?`, total - diambil]; }, () => { const a = S.randInt(3, 7); const b = S.randInt(1, 3); return [`Tas belanja berisi ${a} kg bawang, lalu ditambah ${b} kg bawang putih. Total bawang berapa kg?`, a + b]; }, () => { const total = S.randInt(10, 18); const terpakai = S.randInt(4, 7); return [`Gudang pakan menyimpan ${total} kg pakan ternak, terpakai ${terpakai} kg hari ini. Sisa pakan berapa kg?`, total - terpakai]; }, () => { const a = S.randInt(2, 6); const b = S.randInt(2, 6); return [`${S.randName()} menimbang dua karung beras masing-masing ${a} kg dan ${b} kg. Jika digabung, total beratnya berapa kg?`, a + b]; },

                    () => { const a = S.randInt(2, 8); const b = S.randInt(1, 5); return [`${S.randName()} membeli ${a} kg ${S.randFruit()}. Lalu membeli ${b} kg lagi. Total berapa kg?`, a + b]; },
                    () => { const total = S.randInt(5, 12); const diambil = S.randInt(2, total - 2); return [`Ada ${total} kg beras. Diambil ${diambil} kg. Sisa berapa kg?`, total - diambil]; },
                    () => { const a = S.randInt(3, 8); const b = S.randInt(2, 5); return [`Berat tas ${a} kg. Ditambah buku ${b} kg. Total berat tas berapa kg?`, a + b]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const a = S.randInt(10, 30); const b = S.randInt(5, 15); return [`Di gudang ada karung A seberat ${a} kg dan karung B ${b} kg, keduanya diangkat ke timbangan bersama. Total berat yang terbaca berapa kg?`, a + b]; }, () => { const total = S.randInt(50, 100); const jual = S.randInt(20, 40); return [`Petani menyimpan ${total} kg beras di lumbung, lalu menjual ${jual} kg ke pasar pagi. Berapa kg beras yang masih tersisa?`, total - jual]; }, () => { const a = S.randInt(25, 50); const b = S.randInt(15, 30); return [`Sebuah truk membawa ${a} kg sayur dari desa dan menambah ${b} kg buah di kota. Total muatan truk sekarang berapa kg?`, a + b]; }, () => { const total = S.randInt(60, 120); const pakai = S.randInt(25, 50); return [`Gudang pakan ternak memiliki ${total} kg stok, digunakan ${pakai} kg hari ini. Sisa pakan berapa kg?`, total - pakai]; }, () => { const a = S.randInt(12, 35); const b = S.randInt(8, 20); return [`${S.randName()} memindahkan ${a} kg gula ke rak, lalu menambah ${b} kg lagi. Total gula yang dipindahkan berapa kg?`, a + b]; },
                    () => { const total = S.randInt(70, 150); const rusak = S.randInt(15, 35); return [`Panen kentang mencapai ${total} kg, namun ${rusak} kg rusak saat pengiriman. Berapa kg kentang yang masih layak jual?`, total - rusak]; }, () => { const a = S.randInt(20, 45); const b = S.randInt(10, 25); return [`Keranjang pertama berisi ${a} kg jeruk dan keranjang kedua ${b} kg jeruk, keduanya digabung. Total jeruk berapa kg?`, a + b]; }, () => { const total = S.randInt(80, 160); const diambil = S.randInt(30, 60); return [`Gudang sekolah menyimpan ${total} kg pasir, digunakan ${diambil} kg untuk pembangunan. Sisa pasir berapa kg?`, total - diambil]; }, () => { const a = S.randInt(15, 40); const b = S.randInt(10, 30); return [`Pedagang membeli ${a} kg cabai pagi hari dan ${b} kg lagi sore hari. Total cabai yang dibeli berapa kg?`, a + b]; }, () => { const total = S.randInt(55, 110); const terjual = S.randInt(20, 45); return [`Toko beras memiliki ${total} kg stok, terjual ${terjual} kg hari ini. Berapa kg stok yang tersisa?`, total - terjual]; },
                    () => { const a = S.randInt(18, 45); const b = S.randInt(12, 28); return [`Truk kecil mengangkut ${a} kg beras lalu menambah ${b} kg jagung. Total muatan truk berapa kg?`, a + b]; }, () => { const total = S.randInt(90, 180); const dipakai = S.randInt(40, 70); return [`Pabrik roti menyimpan ${total} kg tepung, dipakai ${dipakai} kg untuk produksi. Sisa tepung berapa kg?`, total - dipakai]; }, () => { const a = S.randInt(22, 48); const b = S.randInt(14, 26); return [`${S.randName()} membawa ${a} kg pupuk, lalu meminjamkan ${b} kg ke tetangga. Total pupuk yang awalnya dibawa berapa kg?`, a + b]; }, () => { const total = S.randInt(65, 130); const hilang = S.randInt(15, 30); return [`Gudang mencatat ${total} kg gula, ternyata ${hilang} kg tumpah. Berapa kg gula yang masih ada?`, total - hilang]; }, () => { const a = S.randInt(20, 50); const b = S.randInt(10, 35); return [`Pasar menerima kiriman ${a} kg ikan dan ${b} kg udang. Total hasil laut berapa kg?`, a + b]; },
                    () => { const total = S.randInt(100, 200); const terpakai = S.randInt(35, 80); return [`Depot air menyimpan ${total} kg air bersih, digunakan ${terpakai} kg. Sisa air berapa kg?`, total - terpakai]; }, () => { const a = S.randInt(15, 38); const b = S.randInt(12, 32); return [`Dua karung tepung masing-masing ${a} kg dan ${b} kg ditimbang bersamaan. Total beratnya berapa kg?`, a + b]; }, () => { const total = S.randInt(75, 140); const dijual = S.randInt(25, 55); return [`Peternak memiliki ${total} kg pakan, menjual ${dijual} kg ke tetangga. Sisa pakan berapa kg?`, total - dijual]; }, () => { const a = S.randInt(28, 55); const b = S.randInt(18, 35); return [`Kapal kecil membawa ${a} kg garam dan ${b} kg ikan asin. Total muatan kapal berapa kg?`, a + b]; }, () => { const total = S.randInt(60, 120); const dipakai = S.randInt(20, 50); return [`Dapur umum memiliki ${total} kg beras, dipakai ${dipakai} kg untuk memasak. Sisa beras berapa kg?`, total - dipakai]; },
                    () => { const a = S.randInt(24, 50); const b = S.randInt(16, 34); return [`Gudang logistik menerima ${a} kg mie instan dan ${b} kg gula. Total barang masuk berapa kg?`, a + b]; }, () => { const total = S.randInt(85, 170); const rusak = S.randInt(20, 45); return [`Panen apel mencapai ${total} kg, ${rusak} kg rusak di perjalanan. Berapa kg apel yang masih baik?`, total - rusak]; }, () => { const a = S.randInt(30, 60); const b = S.randInt(15, 40); return [`Truk besar mengangkut ${a} kg semen dan ${b} kg pasir. Total muatan truk berapa kg?`, a + b]; }, () => { const total = S.randInt(95, 190); const terjual = S.randInt(30, 70); return [`Gudang buah menyimpan ${total} kg stok, terjual ${terjual} kg hari ini. Sisa stok berapa kg?`, total - terjual]; }, () => { const a = S.randInt(20, 45); const b = S.randInt(20, 45); return [`Dua karung pupuk masing-masing ${a} kg dan ${b} kg diangkut bersamaan. Total berat pupuk berapa kg?`, a + b]; },

                    () => { const a = S.randInt(10, 30); const b = S.randInt(5, 15); return [`Berat karung A ${a} kg, karung B ${b} kg. Total berat berapa kg?`, a + b]; },
                    () => { const total = S.randInt(50, 100); const dijual = S.randInt(20, 40); return [`Petani punya ${total} kg beras. Dijual ${dijual} kg. Sisa berapa kg?`, total - dijual]; },
                    () => { const a = S.randInt(25, 50); const b = S.randInt(15, 30); return [`Truk mengangkut ${a} kg sayur dan ${b} kg buah. Total muatan berapa kg?`, a + b]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const ton = S.randInt(2, 5); const tambah = S.randInt(500, 1500); return [`Sebuah truk proyek mengangkut ${ton} ton pasir, lalu ditambah lagi ${tambah} kg semen. Jika ditimbang bersama, berapa total beratnya dalam kg?`, ton * 1000 + tambah]; }, () => { const awal = S.randInt(3000, 5000); const kurang = S.randInt(500, 1500); return [`Gudang logistik mencatat stok awal ${awal.toLocaleString()} kg beras, kemudian ${kurang.toLocaleString()} kg dikirim ke cabang lain. Berapa kg stok yang tersisa di gudang?`, awal - kurang]; }, () => { const ton = S.randInt(3, 6); const tambah = S.randInt(200, 900); return [`Kapal kecil membawa ${ton} ton garam, lalu ditambah muatan ikan seberat ${tambah} kg. Hitung total muatan kapal dalam kg.`, ton * 1000 + tambah]; }, () => { const awal = S.randInt(4000, 7000); const rusak = S.randInt(800, 1800); return [`Gudang buah menyimpan ${awal.toLocaleString()} kg apel, namun ${rusak.toLocaleString()} kg rusak karena banjir. Berapa kg apel yang masih bisa dijual?`, awal - rusak]; }, () => { const ton = S.randInt(2, 4); const tambah = S.randInt(750, 1750); return [`Truk tambang memuat ${ton} ton batu, kemudian ditambah ${tambah} kg batu kecil. Total muatan truk dalam kg berapa?`, ton * 1000 + tambah]; },
                    () => { const awal = S.randInt(3500, 6500); const dijual = S.randInt(600, 1600); return [`Stok gula di gudang awalnya ${awal.toLocaleString()} kg, dijual ${dijual.toLocaleString()} kg ke pasar induk. Sisa gula berapa kg?`, awal - dijual]; }, () => { const ton = S.randInt(4, 7); const tambah = S.randInt(300, 1200); return [`Sebuah truk besar membawa ${ton} ton beras dan ditambah ${tambah} kg karung kecil. Berapa total berat beras dalam kg?`, ton * 1000 + tambah]; }, () => { const awal = S.randInt(5000, 8000); const dipakai = S.randInt(1000, 2500); return [`Pabrik pakan memiliki ${awal.toLocaleString()} kg bahan baku, digunakan ${dipakai.toLocaleString()} kg hari ini. Berapa kg yang masih tersisa?`, awal - dipakai]; }, () => { const ton = S.randInt(2, 6); const tambah = S.randInt(400, 1400); return [`Truk pengangkut membawa ${ton} ton pupuk, lalu ditambah ${tambah} kg pupuk cair. Hitung total beratnya dalam kg.`, ton * 1000 + tambah]; }, () => { const awal = S.randInt(3200, 6000); const hilang = S.randInt(700, 1300); return [`Gudang mencatat ${awal.toLocaleString()} kg jagung, namun ${hilang.toLocaleString()} kg hilang saat distribusi. Berapa kg jagung yang tersisa?`, awal - hilang]; },
                    () => { const ton = S.randInt(3, 5); const tambah = S.randInt(500, 1600); return [`Kapal kargo membawa ${ton} ton tepung dan menambah ${tambah} kg muatan tambahan. Total muatan kapal dalam kg berapa?`, ton * 1000 + tambah]; }, () => { const awal = S.randInt(4500, 7500); const terjual = S.randInt(900, 2000); return [`Gudang beras menyimpan ${awal.toLocaleString()} kg stok, lalu terjual ${terjual.toLocaleString()} kg hari ini. Sisa stok berapa kg?`, awal - terjual]; }, () => { const ton = S.randInt(2, 7); const tambah = S.randInt(600, 1800); return [`Truk logistik mengangkut ${ton} ton bahan bangunan dan ${tambah} kg perlengkapan. Hitung total berat muatan dalam kg.`, ton * 1000 + tambah]; }, () => { const awal = S.randInt(3800, 6800); const dipakai = S.randInt(800, 1700); return [`Gudang sekolah memiliki ${awal.toLocaleString()} kg semen, digunakan ${dipakai.toLocaleString()} kg untuk renovasi. Berapa kg semen yang tersisa?`, awal - dipakai]; }, () => { const ton = S.randInt(3, 6); const tambah = S.randInt(450, 1350); return [`Truk proyek membawa ${ton} ton pasir dan ditambah ${tambah} kg kerikil. Total berat muatan dalam kg berapa?`, ton * 1000 + tambah]; },
                    () => { const awal = S.randInt(4200, 7200); const rusak = S.randInt(900, 1900); return [`Gudang sayur menyimpan ${awal.toLocaleString()} kg kentang, ${rusak.toLocaleString()} kg busuk karena hujan. Berapa kg kentang yang masih baik?`, awal - rusak]; }, () => { const ton = S.randInt(4, 8); const tambah = S.randInt(300, 1100); return [`Sebuah truk besar membawa ${ton} ton kayu dan ${tambah} kg papan kecil. Total berat kayu dalam kg berapa?`, ton * 1000 + tambah]; }, () => { const awal = S.randInt(5000, 9000); const dijual = S.randInt(1200, 2800); return [`Gudang hasil panen mencatat ${awal.toLocaleString()} kg gabah, dijual ${dijual.toLocaleString()} kg. Sisa gabah berapa kg?`, awal - dijual]; }, () => { const ton = S.randInt(2, 5); const tambah = S.randInt(800, 2000); return [`Truk pengangkut membawa ${ton} ton beras dan ditambah ${tambah} kg beras kemasan. Berapa total berat muatan dalam kg?`, ton * 1000 + tambah]; }, () => { const awal = S.randInt(3600, 6400); const terpakai = S.randInt(700, 1500); return [`Gudang dapur umum memiliki ${awal.toLocaleString()} kg beras, terpakai ${terpakai.toLocaleString()} kg hari ini. Sisa beras berapa kg?`, awal - terpakai]; },

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
                    () => { const a = S.randInt(3, 8); const b = S.randInt(2, 7); const max = Math.max(a, b); return [`Bu Rani beli apel ${a} kg dan jeruk ${b} kg. Buah mana yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const a = S.randInt(2, 6); const b = S.randInt(3, 8); const min = Math.min(a, b); return [`Adik membawa tas A ${a} kg, kakak membawa tas B ${b} kg. Tas mana yang lebih ringan? (jawab beratnya)`, min]; },
                    () => { const kg = S.randInt(2, 5); const ons = kg * 10 + S.randInt(1, 5); return [`Di toko ada gula ${kg} kg dan beras ${ons} ons. Barang mana yang lebih berat? Jawab dalam kg yang lebih berat.`, ons > kg * 10 ? Math.ceil(ons / 10) : kg]; },
                    () => { const a = S.randInt(4, 9); const b = S.randInt(4, 9); const max = Math.max(a, b); return [`Bola besi ${a} kg dan bola kayu ${b} kg. Mana yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const a = S.randInt(1, 5); const b = S.randInt(3, 7); const min = Math.min(a, b); return [`Tas sekolah Andi ${a} kg, tas sekolah Budi ${b} kg. Mana tas yang lebih ringan? (jawab beratnya)`, min]; },
                    () => { const kg = S.randInt(3, 6); const ons = kg * 10 - S.randInt(1, 5); return [`Ibu membeli tepung ${kg} kg dan gula ${ons} ons. Mana yang lebih berat? Jawab dalam kg yang lebih berat.`, ons > kg * 10 ? Math.ceil(ons / 10) : kg]; },
                    () => { const a = S.randInt(5, 10); const b = S.randInt(3, 8); const max = Math.max(a, b); return [`Koper biru ${a} kg, koper merah ${b} kg. Koper mana yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const a = S.randInt(2, 6); const b = S.randInt(4, 9); const min = Math.min(a, b); return [`Kardus mainan ${a} kg, kardus buku ${b} kg. Kardus mana yang lebih ringan? (jawab beratnya)`, min]; },
                    () => { const kg = S.randInt(4, 7); const ons = kg * 10 + S.randInt(6, 9); return [`Semangka ${kg} kg dan melon ${ons} ons. Buah mana yang lebih berat? Jawab dalam kg yang lebih berat.`, ons > kg * 10 ? Math.ceil(ons / 10) : kg]; },
                    () => { const a = S.randInt(6, 11); const b = S.randInt(4, 9); const max = Math.max(a, b); return [`Karung beras ${a} kg, karung gula ${b} kg. Mana yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const a = S.randInt(3, 7); const b = S.randInt(5, 10); const min = Math.min(a, b); return [`Ransel hijau ${a} kg, ransel biru ${b} kg. Ransel mana yang lebih ringan? (jawab beratnya)`, min]; },
                    () => { const kg = S.randInt(1, 4); const ons = kg * 10 - S.randInt(2, 4); return [`Mangga ${kg} kg dan apel ${ons} ons. Mana yang lebih berat? Jawab dalam kg yang lebih berat.`, ons > kg * 10 ? Math.ceil(ons / 10) : kg]; },
                    () => { const a = S.randInt(7, 12); const b = S.randInt(5, 10); const max = Math.max(a, b); return [`Kotak peralatan ${a} kg, kotak perkakas ${b} kg. Kotak mana yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const a = S.randInt(4, 8); const b = S.randInt(6, 11); const min = Math.min(a, b); return [`Tas wanita ${a} kg, tas pria ${b} kg. Mana yang lebih ringan? (jawab beratnya)`, min]; },
                    () => { const kg = S.randInt(5, 8); const ons = kg * 10 + S.randInt(0, 3); return [`Kentang ${kg} kg dan wortel ${ons} ons. Sayuran mana yang lebih berat? Jawab dalam kg yang lebih berat.`, ons > kg * 10 ? Math.ceil(ons / 10) : kg]; },
                    () => { const a = S.randInt(8, 13); const b = S.randInt(6, 11); const max = Math.max(a, b); return [`Galon air ${a} kg, galon minyak ${b} kg. Mana yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const a = S.randInt(5, 9); const b = S.randInt(7, 12); const min = Math.min(a, b); return [`Koper kecil ${a} kg, koper besar ${b} kg. Mana yang lebih ringan? (jawab beratnya)`, min]; },
                    () => { const kg = S.randInt(2, 5); const ons = kg * 10 + S.randInt(-2, 2); return [`Telur ${kg} kg dan daging ${ons} ons. Bahan makanan mana yang lebih berat? Jawab dalam kg yang lebih berat.`, ons > kg * 10 ? Math.ceil(ons / 10) : kg]; },
                    () => { const a = S.randInt(9, 14); const b = S.randInt(7, 12); const max = Math.max(a, b); return [`Baterai mobil ${a} kg, aki motor ${b} kg. Mana yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const a = S.randInt(6, 10); const b = S.randInt(8, 13); const min = Math.min(a, b); return [`Tas laptop ${a} kg, tas dokumen ${b} kg. Tas mana yang lebih ringan? (jawab beratnya)`, min]; },
                    () => { const kg = S.randInt(3, 6); const ons = kg * 10 + S.randInt(7, 10); return [`Buku ${kg} kg dan majalah ${ons} ons. Mana yang lebih berat? Jawab dalam kg yang lebih berat.`, ons > kg * 10 ? Math.ceil(ons / 10) : kg]; },
                    () => { const a = S.randInt(10, 15); const b = S.randInt(8, 13); const max = Math.max(a, b); return [`Lemari es ${a} kg, mesin cuci ${b} kg. Alat elektronik mana yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const a = S.randInt(7, 11); const b = S.randInt(9, 14); const min = Math.min(a, b); return [`Keranjang buah ${a} kg, keranjang sayur ${b} kg. Keranjang mana yang lebih ringan? (jawab beratnya)`, min]; },
                    () => { const kg = S.randInt(4, 7); const ons = kg * 10 - S.randInt(8, 12); return [`Besi ${kg} kg dan alumunium ${ons} ons. Logam mana yang lebih berat? Jawab dalam kg yang lebih berat.`, ons > kg * 10 ? Math.ceil(ons / 10) : kg]; },
                    () => { const a = S.randInt(11, 16); const b = S.randInt(9, 14); const max = Math.max(a, b); return [`Motor ${a} kg, sepeda ${b} kg. Kendaraan mana yang lebih berat? (jawab beratnya)`, max]; },

                    () => { const a = S.randInt(3, 8); const b = S.randInt(2, 7); const max = Math.max(a, b); return [`Apel ${a} kg dan jeruk ${b} kg. Mana yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const a = S.randInt(2, 6); const b = S.randInt(3, 8); const min = Math.min(a, b); return [`Tas A ${a} kg, tas B ${b} kg. Mana yang lebih ringan? (jawab beratnya)`, min]; },
                    () => { const kg = S.randInt(2, 5); const ons = kg * 10 + S.randInt(1, 5); return [`${kg} kg dan ${ons} ons. Mana lebih berat? Jawab dalam kg yang lebih berat.`, ons > kg * 10 ? Math.ceil(ons / 10) : kg]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const a = S.randInt(10, 30); const b = S.randInt(15, 35); const max = Math.max(a, b); return [`Pak Joni mengangkut karung beras ${a} kg dan karung gula ${b} kg. Karung mana yang lebih berat? (jawab beratnya dalam kg)`, max]; },
                    () => { const kg = S.randInt(3, 8); const gram = S.randInt(2500, 4500); const kgGram = gram / 1000; return [`Di pasar ada sekantong beras ${kg} kg dan sekantong gula ${gram.toLocaleString()} gram. Mana yang lebih berat? (jawab dalam kg)`, kg > kgGram ? kg : Math.round(kgGram * 10) / 10]; },
                    () => { const a = S.randInt(12, 28); const b = S.randInt(18, 32); const max = Math.max(a, b); return [`Galon air minum ${a} kg dan galon minyak goreng ${b} kg. Mana galon yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const kg = S.randInt(4, 9); const gram = S.randInt(3500, 5500); const kgGram = gram / 1000; return [`Kardus buku ${kg} kg dan kardus mainan ${gram.toLocaleString()} gram. Kardus mana yang lebih berat? (jawab dalam kg)`, kg > kgGram ? kg : Math.round(kgGram * 10) / 10]; },
                    () => { const a = S.randInt(15, 40); const b = S.randInt(20, 38); const max = Math.max(a, b); return [`Koper ukuran besar ${a} kg dan koper ukuran sedang ${b} kg. Mana yang lebih berat? (jawab kg-nya)`, max]; },
                    () => { const ons = S.randInt(30, 80); const gram = S.randInt(2000, 4000); const kgOns = ons / 10; const kgGram = gram / 1000; return [`Ibu beli telur ${ons} ons dan daging ${gram.toLocaleString()} gram. Mana yang lebih berat? (jawab dalam kg)`, kgOns > kgGram ? Math.round(kgOns * 10) / 10 : Math.round(kgGram * 10) / 10]; },
                    () => { const a = S.randInt(18, 36); const b = S.randInt(22, 40); const max = Math.max(a, b); return [`Mesin cuci ${a} kg dan lemari es ${b} kg. Barang elektronik mana yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const kg = S.randInt(5, 12); const gram = S.randInt(4500, 7500); const kgGram = gram / 1000; return [`Pasir ${kg} kg dan semen ${gram.toLocaleString()} gram. Material mana yang lebih berat? (jawab dalam kg)`, kg > kgGram ? kg : Math.round(kgGram * 10) / 10]; },
                    () => { const a = S.randInt(22, 45); const b = S.randInt(25, 42); const max = Math.max(a, b); return [`Ban mobil ${a} kg dan ban truk ${b} kg. Mana yang lebih berat? (jawab kg-nya)`, max]; },
                    () => { const ons = S.randInt(40, 90); const gram = S.randInt(3000, 6000); const kgOns = ons / 10; const kgGram = gram / 1000; return [`Sayuran ${ons} ons dan buah-buahan ${gram.toLocaleString()} gram. Mana yang lebih berat? (jawab dalam kg)`, kgOns > kgGram ? Math.round(kgOns * 10) / 10 : Math.round(kgGram * 10) / 10]; },
                    () => { const a = S.randInt(25, 50); const b = S.randInt(28, 48); const max = Math.max(a, b); return [`AC split ${a} kg dan water heater ${b} kg. Peralatan mana yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const kg = S.randInt(6, 15); const gram = S.randInt(5500, 9500); const kgGram = gram / 1000; return [`Cat tembok ${kg} kg dan paku ${gram.toLocaleString()} gram. Bahan bangunan mana yang lebih berat? (jawab dalam kg)`, kg > kgGram ? kg : Math.round(kgGram * 10) / 10]; },
                    () => { const a = S.randInt(30, 55); const b = S.randInt(32, 52); const max = Math.max(a, b); return [`Genset portable ${a} kg dan kompresor ${b} kg. Alat teknik mana yang lebih berat? (jawab kg-nya)`, max]; },
                    () => { const ons = S.randInt(50, 100); const gram = S.randInt(4000, 8000); const kgOns = ons / 10; const kgGram = gram / 1000; return [`Bumbu dapur ${ons} ons dan bahan kue ${gram.toLocaleString()} gram. Mana yang lebih berat? (jawab dalam kg)`, kgOns > kgGram ? Math.round(kgOns * 10) / 10 : Math.round(kgGram * 10) / 10]; },
                    () => { const a = S.randInt(35, 60); const b = S.randInt(38, 58); const max = Math.max(a, b); return [`Tangki gas 12 kg ${a} kg dan tangki gas 3 kg ${b} kg. Mana yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const kg = S.randInt(8, 18); const gram = S.randInt(7000, 12000); const kgGram = gram / 1000; return [`Kertas ${kg} kg dan plastik ${gram.toLocaleString()} gram. Material daur ulang mana yang lebih berat? (jawab dalam kg)`, kg > kgGram ? kg : Math.round(kgGram * 10) / 10]; },
                    () => { const a = S.randInt(40, 65); const b = S.randInt(42, 62); const max = Math.max(a, b); return [`Motor listrik ${a} kg dan sepeda listrik ${b} kg. Kendaraan mana yang lebih berat? (jawab kg-nya)`, max]; },
                    () => { const ons = S.randInt(60, 120); const gram = S.randInt(5000, 10000); const kgOns = ons / 10; const kgGram = gram / 1000; return [`Obat-obatan ${ons} ons dan alat kesehatan ${gram.toLocaleString()} gram. Mana yang lebih berat? (jawab dalam kg)`, kgOns > kgGram ? Math.round(kgOns * 10) / 10 : Math.round(kgGram * 10) / 10]; },
                    () => { const a = S.randInt(45, 70); const b = S.randInt(48, 68); const max = Math.max(a, b); return [`Rak besi ${a} kg dan meja kerja ${b} kg. Furniture mana yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const kg = S.randInt(10, 22); const gram = S.randInt(8500, 15000); const kgGram = gram / 1000; return [`Besi beton ${kg} kg dan kawat ${gram.toLocaleString()} gram. Material konstruksi mana yang lebih berat? (jawab dalam kg)`, kg > kgGram ? kg : Math.round(kgGram * 10) / 10]; },
                    () => { const a = S.randInt(50, 75); const b = S.randInt(52, 72); const max = Math.max(a, b); return [`Pompa air ${a} kg dan mesin pemotong rumput ${b} kg. Perkakas mana yang lebih berat? (jawab kg-nya)`, max]; },
                    () => { const ons = S.randInt(70, 140); const gram = S.randInt(6000, 12000); const kgOns = ons / 10; const kgGram = gram / 1000; return [`Makanan kaleng ${ons} ons dan minuman kaleng ${gram.toLocaleString()} gram. Mana yang lebih berat? (jawab dalam kg)`, kgOns > kgGram ? Math.round(kgOns * 10) / 10 : Math.round(kgGram * 10) / 10]; },
                    () => { const a = S.randInt(55, 80); const b = S.randInt(58, 78); const max = Math.max(a, b); return [`Komputer desktop ${a} kg dan printer besar ${b} kg. Perangkat IT mana yang lebih berat? (jawab beratnya)`, max]; },
                    () => { const kg = S.randInt(12, 25); const gram = S.randInt(10000, 18000); const kgGram = gram / 1000; return [`Kayu ${kg} kg dan triplek ${gram.toLocaleString()} gram. Bahan kayu mana yang lebih berat? (jawab dalam kg)`, kg > kgGram ? kg : Math.round(kgGram * 10) / 10]; },
                    () => { const a = S.randInt(60, 85); const b = S.randInt(62, 82); const max = Math.max(a, b); return [`Speaker aktif ${a} kg dan amplifier ${b} kg. Perangkat audio mana yang lebih berat? (jawab kg-nya)`, max]; },

                    () => { const a = S.randInt(10, 30); const b = S.randInt(15, 35); const max = Math.max(a, b); return [`Karung A ${a} kg, karung B ${b} kg. Lebih berat mana? (jawab kg-nya)`, max]; },
                    () => { const kg = S.randInt(3, 8); const gram = S.randInt(2500, 4500); const kgGram = gram / 1000; return [`${kg} kg dan ${gram.toLocaleString()} gram. Mana lebih berat? (dalam kg)`, kg > kgGram ? kg : Math.round(kgGram)]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const ton = S.randInt(2, 5); const kuintal = S.randInt(15, 40); const tonKg = ton * 1000; const kuintalKg = kuintal * 100; return [`Truk A membawa pasir ${ton} ton dan truk B membawa batu ${kuintal} kuintal. Mana yang lebih berat? (jawab beratnya dalam kg)`, Math.max(tonKg, kuintalKg)]; },
                    () => { const a = S.randInt(1500, 3000); const b = S.randInt(1800, 3500); return [`Kapal angkut barang A membawa muatan ${a.toLocaleString()} kg dan kapal B membawa ${b.toLocaleString()} kg. Berapa kg selisih berat muatan keduanya?`, Math.abs(a - b)]; },
                    () => { const ton = S.randInt(3, 7); const kuintal = S.randInt(25, 60); const tonKg = ton * 1000; const kuintalKg = kuintal * 100; return [`Gudang penyimpanan beras ${ton} ton dan gudang gula ${kuintal} kuintal. Gudang mana yang menyimpan barang lebih berat? (dalam kg)`, Math.max(tonKg, kuintalKg)]; },
                    () => { const a = S.randInt(2500, 4500); const b = S.randInt(2800, 5000); return [`Proyek konstruksi menggunakan semen ${a.toLocaleString()} kg dan besi beton ${b.toLocaleString()} kg. Berapa kg perbedaan berat material tersebut?`, Math.abs(a - b)]; },
                    () => { const ton = S.randInt(4, 8); const kuintal = S.randInt(35, 75); const tonKg = ton * 1000; const kuintalKg = kuintal * 100; return [`Kapal kontainer mengangkut baja ${ton} ton dan kapal lain mengangkut alumunium ${kuintal} kuintal. Muatan mana yang lebih berat? (jawab dalam kg)`, Math.max(tonKg, kuintalKg)]; },
                    () => { const a = S.randInt(3500, 6000); const b = S.randInt(3800, 6500); return [`Pabrik tekstil memiliki kapas ${a.toLocaleString()} kg dan pabrik lain memiliki wol ${b.toLocaleString()} kg. Hitung selisih berat bahan baku dalam kg!`, Math.abs(a - b)]; },
                    () => { const ton = S.randInt(5, 10); const kuintal = S.randInt(45, 90); const tonKg = ton * 1000; const kuintalKg = kuintal * 100; return [`Perusahaan pertambangan menghasilkan batubara ${ton} ton dan perusahaan lain menghasilkan bijih besi ${kuintal} kuintal. Produksi mana yang lebih berat? (dalam kg)`, Math.max(tonKg, kuintalKg)]; },
                    () => { const a = S.randInt(4500, 7500); const b = S.randInt(4800, 8000); return [`Bendungan menampung air ${a.toLocaleString()} kg dan waduk menampung ${b.toLocaleString()} kg. Berapa kg selisih kapasitas tampungan air?`, Math.abs(a - b)]; },
                    () => { const ton = S.randInt(6, 12); const kuintal = S.randInt(55, 110); const tonKg = ton * 1000; const kuintalKg = kuintal * 100; return [`Pabrik semen memproduksi ${ton} ton semen dan pabrik pupuk memproduksi ${kuintal} kuintal pupuk. Mana produksi yang lebih berat? (jawab dalam kg)`, Math.max(tonKg, kuintalKg)]; },
                    () => { const a = S.randInt(5500, 9000); const b = S.randInt(5800, 9500); return [`Pelabuhan bongkar muat kopi ${a.toLocaleString()} kg dan pelabuhan lain bongkar muat teh ${b.toLocaleString()} kg. Hitung selisih berat komoditas dalam kg!`, Math.abs(a - b)]; },
                    () => { const ton = S.randInt(7, 14); const kuintal = S.randInt(65, 130); const tonKg = ton * 1000; const kuintalKg = kuintal * 100; return [`Gudang logistik menyimpan beras ${ton} ton dan gudang lain menyimpan jagung ${kuintal} kuintal. Stok mana yang lebih berat? (dalam kg)`, Math.max(tonKg, kuintalKg)]; },
                    () => { const a = S.randInt(6500, 10500); const b = S.randInt(6800, 11000); return [`Ekspor kayu keras ${a.toLocaleString()} kg dan ekspor kayu lapis ${b.toLocaleString()} kg. Berapa kg perbedaan berat ekspor kayu?`, Math.abs(a - b)]; },
                    () => { const ton = S.randInt(8, 16); const kuintal = S.randInt(75, 150); const tonKg = ton * 1000; const kuintalKg = kuintal * 100; return [`Pengiriman global mengangkut mesin ${ton} ton dan pengiriman domestik mengangkut suku cadang ${kuintal} kuintal. Kiriman mana yang lebih berat? (jawab dalam kg)`, Math.max(tonKg, kuintalKg)]; },
                    () => { const a = S.randInt(7500, 12000); const b = S.randInt(7800, 12500); return [`Pembangkit listrik menggunakan batubara ${a.toLocaleString()} kg dan pembangkit lain menggunakan gas ${b.toLocaleString()} kg. Hitung selisih berat bahan bakar dalam kg!`, Math.abs(a - b)]; },
                    () => { const ton = S.randInt(9, 18); const kuintal = S.randInt(85, 170); const tonKg = ton * 1000; const kuintalKg = kuintal * 100; return [`Industri otomotif membutuhkan baja ${ton} ton dan industri elektronik membutuhkan tembaga ${kuintal} kuintal. Kebutuhan bahan mana yang lebih berat? (dalam kg)`, Math.max(tonKg, kuintalKg)]; },
                    () => { const a = S.randInt(8500, 13500); const b = S.randInt(8800, 14000); return [`Tambang emas menghasilkan ${a.toLocaleString()} kg bijih emas dan tambang perak menghasilkan ${b.toLocaleString()} kg bijih perak. Berapa kg selisih produksi logam mulia?`, Math.abs(a - b)]; },
                    () => { const ton = S.randInt(10, 20); const kuintal = S.randInt(95, 190); const tonKg = ton * 1000; const kuintalKg = kuintal * 100; return [`Perusahaan farmasi memproduksi obat ${ton} ton dan perusahaan kosmetik memproduksi bahan ${kuintal} kuintal. Produksi mana yang lebih berat? (jawab dalam kg)`, Math.max(tonKg, kuintalKg)]; },
                    () => { const a = S.randInt(9500, 15000); const b = S.randInt(9800, 15500); return [`Industri kertas menggunakan pulp ${a.toLocaleString()} kg dan industri plastik menggunakan resin ${b.toLocaleString()} kg. Hitung perbedaan berat bahan baku dalam kg!`, Math.abs(a - b)]; },
                    () => { const ton = S.randInt(11, 22); const kuintal = S.randInt(105, 210); const tonKg = ton * 1000; const kuintalKg = kuintal * 100; return [`Perusahaan konstruksi menggunakan beton ${ton} ton dan perusahaan jalan tol menggunakan aspal ${kuintal} kuintal. Material mana yang lebih berat? (dalam kg)`, Math.max(tonKg, kuintalKg)]; },
                    () => { const a = S.randInt(10500, 16500); const b = S.randInt(10800, 17000); return [`Peternakan sapi menghasilkan daging ${a.toLocaleString()} kg dan peternakan ayam menghasilkan ${b.toLocaleString()} kg. Berapa kg selisih produksi daging?`, Math.abs(a - b)]; },
                    () => { const ton = S.randInt(12, 24); const kuintal = S.randInt(115, 230); const tonKg = ton * 1000; const kuintalKg = kuintal * 100; return [`Perusahaan minyak mengangkut crude oil ${ton} ton dan perusahaan gas mengangkut LNG ${kuintal} kuintal. Muatan energi mana yang lebih berat? (jawab dalam kg)`, Math.max(tonKg, kuintalKg)]; },
                    () => { const a = S.randInt(11500, 18000); const b = S.randInt(11800, 18500); return [`Industri garmen memiliki kain katun ${a.toLocaleString()} kg dan industri sepatu memiliki kulit ${b.toLocaleString()} kg. Hitung selisih berat bahan mentah dalam kg!`, Math.abs(a - b)]; },
                    () => { const ton = S.randInt(13, 26); const kuintal = S.randInt(125, 250); const tonKg = ton * 1000; const kuintalKg = kuintal * 100; return [`Perusahaan perkapalan membawa kontainer ${ton} ton dan perusahaan penerbangan membawa kargo ${kuintal} kuintal. Pengiriman mana yang lebih berat? (dalam kg)`, Math.max(tonKg, kuintalKg)]; },
                    () => { const a = S.randInt(12500, 19500); const b = S.randInt(12800, 20000); return [`Industri mainan memproduksi plastik ${a.toLocaleString()} kg dan industri peralatan rumah memproduksi logam ${b.toLocaleString()} kg. Berapa kg perbedaan berat produksi?`, Math.abs(a - b)]; },
                    () => { const ton = S.randInt(14, 28); const kuintal = S.randInt(135, 270); const tonKg = ton * 1000; const kuintalKg = kuintal * 100; return [`Perusahaan real estate menggunakan material ${ton} ton dan perusahaan infrastruktur menggunakan peralatan ${kuintal} kuintal. Kebutuhan mana yang lebih berat? (jawab dalam kg)`, Math.max(tonKg, kuintalKg)]; },

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
                    () => { const a = S.randInt(5, 10); const b = S.randInt(2, a - 1); return [`Kakak membawa benda A seberat ${a} kg dan adik membawa benda B seberat ${b} kg. Berapa kg selisih berat keduanya?`, a - b]; },
                    () => { const a = S.randInt(4, 9); const b = S.randInt(2, 6); const diff = Math.abs(a - b); return [`Ibu pergi dengan tas ${a} kg, Ayah membawa ransel ${b} kg. Berapa kg selisih berat tas dan ransel?`, diff]; },
                    () => { const a = S.randInt(6, 12); const b = S.randInt(3, a - 2); return [`Buah apel di keranjang merah ${a} kg, di keranjang biru ${b} kg. Hitung selisih berat apel di kedua keranjang!`, a - b]; },
                    () => { const a = S.randInt(7, 15); const b = S.randInt(4, 10); const diff = Math.abs(a - b); return [`Buku-buku di rak atas ${a} kg, di rak bawah ${b} kg. Berapa kg perbedaan berat buku di kedua rak?`, diff]; },
                    () => { const a = S.randInt(8, 14); const b = S.randInt(5, a - 1); return [`Kotak mainan di kamar Andi ${a} kg, di kamar Budi ${b} kg. Berapa kg lebih berat kotak Andi?`, a - b]; },
                    () => { const a = S.randInt(9, 16); const b = S.randInt(6, 12); const diff = Math.abs(a - b); return [`Karung beras ${a} kg dan karung gula ${b} kg. Hitung selisih berat karung beras dan gula!`, diff]; },
                    () => { const a = S.randInt(10, 18); const b = S.randInt(7, a - 3); return [`Galon air minum isi ulang ${a} kg, galon baru ${b} kg. Berapa kg lebih berat galon isi ulang?`, a - b]; },
                    () => { const a = S.randInt(11, 20); const b = S.randInt(8, 15); const diff = Math.abs(a - b); return [`Bola bowling ${a} kg dan bola basket ${b} kg. Berapa kg selisih berat kedua bola?`, diff]; },
                    () => { const a = S.randInt(12, 22); const b = S.randInt(9, a - 4); return [`Koper besar ${a} kg dan koper kecil ${b} kg. Berapa kg lebih ringan koper kecil?`, a - b]; },
                    () => { const a = S.randInt(13, 24); const b = S.randInt(10, 18); const diff = Math.abs(a - b); return [`Kardus elektronik ${a} kg dan kardus pakaian ${b} kg. Hitung perbedaan berat kedua kardus!`, diff]; },
                    () => { const a = S.randInt(14, 26); const b = S.randInt(11, a - 5); return [`Pot bunga dari tanah liat ${a} kg dan pot plastik ${b} kg. Berapa kg lebih berat pot tanah liat?`, a - b]; },
                    () => { const a = S.randInt(15, 28); const b = S.randInt(12, 21); const diff = Math.abs(a - b); return [`Setrika listrik ${a} kg dan blender ${b} kg. Berapa kg selisih berat alat elektronik tersebut?`, diff]; },
                    () => { const a = S.randInt(16, 30); const b = S.randInt(13, a - 6); return [`Kotak perkakas ayah ${a} kg dan kotak alat ibu ${b} kg. Berapa kg lebih berat kotak ayah?`, a - b]; },
                    () => { const a = S.randInt(17, 32); const b = S.randInt(14, 24); const diff = Math.abs(a - b); return [`Lemari es kecil ${a} kg dan mesin cuci ${b} kg. Hitung selisih berat kedua alat rumah tangga!`, diff]; },
                    () => { const a = S.randInt(18, 34); const b = S.randInt(15, a - 7); return [`Sepeda motor ${a} kg dan sepeda ontel ${b} kg. Berapa kg lebih ringan sepeda ontel?`, a - b]; },
                    () => { const a = S.randInt(19, 36); const b = S.randInt(16, 27); const diff = Math.abs(a - b); return [`Meja makan kayu ${a} kg dan meja belajar ${b} kg. Berapa kg perbedaan berat kedua meja?`, diff]; },
                    () => { const a = S.randInt(20, 38); const b = S.randInt(17, a - 8); return [`Rak buku besi ${a} kg dan rak buku kayu ${b} kg. Berapa kg lebih berat rak besi?`, a - b]; },
                    () => { const a = S.randInt(21, 40); const b = S.randInt(18, 30); const diff = Math.abs(a - b); return [`Kursi malas ${a} kg dan kursi kantor ${b} kg. Hitung selisih berat kedua kursi!`, diff]; },
                    () => { const a = S.randInt(22, 42); const b = S.randInt(19, a - 9); return [`Piano elektronik ${a} kg dan keyboard ${b} kg. Berapa kg lebih ringan keyboard?`, a - b]; },
                    () => { const a = S.randInt(23, 44); const b = S.randInt(20, 33); const diff = Math.abs(a - b); return [`TV LED ${a} kg dan sound system ${b} kg. Berapa kg selisih berat perangkat hiburan tersebut?`, diff]; },
                    () => { const a = S.randInt(24, 46); const b = S.randInt(21, a - 10); return [`Komputer desktop ${a} kg dan laptop ${b} kg. Berapa kg lebih berat komputer desktop?`, a - b]; },
                    () => { const a = S.randInt(25, 48); const b = S.randInt(22, 36); const diff = Math.abs(a - b); return [`AC standing ${a} kg dan kipas angin besar ${b} kg. Hitung perbedaan berat pendingin ruangan tersebut!`, diff]; },
                    () => { const a = S.randInt(26, 50); const b = S.randInt(23, a - 11); return [`Gitar akustik ${a} kg dan gitar elektrik ${b} kg. Berapa kg lebih ringan gitar elektrik?`, a - b]; },
                    () => { const a = S.randInt(27, 52); const b = S.randInt(24, 39); const diff = Math.abs(a - b); return [`Treadmill ${a} kg dan sepeda statis ${b} kg. Berapa kg selisih berat alat olahraga tersebut?`, diff]; },
                    () => { const a = S.randInt(28, 54); const b = S.randInt(25, a - 12); return [`Kasur spring bed ${a} kg dan kasur busa ${b} kg. Berapa kg lebih berat spring bed?`, a - b]; },
                    () => { const a = S.randInt(29, 56); const b = S.randInt(26, 42); const diff = Math.abs(a - b); return [`Lemari pakaian ${a} kg dan rak sepatu ${b} kg. Hitung selisih berat furniture tersebut!`, diff]; },

                    () => { const a = S.randInt(5, 10); const b = S.randInt(2, a - 1); return [`Berat benda A ${a} kg dan B ${b} kg. Selisihnya berapa kg?`, a - b]; },
                    () => { const a = S.randInt(4, 9); const b = S.randInt(2, 6); const diff = Math.abs(a - b); return [`Tas ${a} kg dan ransel ${b} kg. Selisih beratnya ... kg`, diff]; },
                ];
                break;
            case 4: case 5:
                questions = [
                    () => { const a = S.randInt(25, 50); const b = S.randInt(15, 35); return [`Di gudang terdapat karung beras ${a} kg dan karung gula ${b} kg. Berapa kg selisih berat kedua karung tersebut?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(100, 200); const b = S.randInt(80, 150); return [`Pak peternak memiliki kambing ${a} kg dan domba ${b} kg. Hitung selisih berat kedua hewan ternak tersebut!`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(30, 60); const b = S.randInt(20, 40); return [`Mesin cuci front loading ${a} kg dan mesin cuci top loading ${b} kg. Berapa kg perbedaan berat kedua mesin cuci?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(120, 220); const b = S.randInt(90, 170); return [`Lemari es 2 pintu ${a} kg dan lemari es 1 pintu ${b} kg. Hitung selisih berat kedua lemari es!`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(35, 70); const b = S.randInt(25, 45); return [`Komputer gaming ${a} kg dan komputer kantor ${b} kg. Berapa kg lebih berat komputer gaming?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(140, 240); const b = S.randInt(100, 190); return [`Sapi perah ${a} kg dan sapi pedaging ${b} kg. Berapa kg selisih berat kedua jenis sapi tersebut?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(40, 80); const b = S.randInt(30, 50); return [`Motor bebek ${a} kg dan motor matic ${b} kg. Hitung perbedaan berat kedua motor!`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(160, 260); const b = S.randInt(110, 210); return [`Kuda pacuan ${a} kg dan kuda pekerja ${b} kg. Berapa kg selisih berat kuda pacuan dan kuda pekerja?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(45, 90); const b = S.randInt(35, 55); return [`AC inverter ${a} kg dan AC non-inverter ${b} kg. Berapa kg lebih ringan AC non-inverter?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(180, 280); const b = S.randInt(120, 230); return [`Kambing etawa ${a} kg dan kambing jawa ${b} kg. Hitung selisih berat kedua jenis kambing!`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(50, 100); const b = S.randInt(40, 60); return [`Water dispenser galon ${a} kg dan water dispenser isi ulang ${b} kg. Berapa kg perbedaan berat kedua dispenser?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(200, 300); const b = S.randInt(130, 250); return [`Kerbau sungai ${a} kg dan kerbau rawa ${b} kg. Berapa kg selisih berat kerbau sungai dan kerbau rawa?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(55, 110); const b = S.randInt(45, 65); return [`Kompor gas 2 tungku ${a} kg dan kompor gas 1 tungku ${b} kg. Hitung selisih berat kedua kompor!`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(220, 320); const b = S.randInt(140, 270); return [`Sapi limousin ${a} kg dan sapi simmental ${b} kg. Berapa kg lebih berat sapi limousin?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(60, 120); const b = S.randInt(50, 70); return [`Kipas angin berdiri ${a} kg dan kipas angin duduk ${b} kg. Berapa kg perbedaan berat kedua kipas angin?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(240, 340); const b = S.randInt(150, 290); return [`Kambing boer ${a} kg dan kambing kacang ${b} kg. Hitung selisih berat kambing boer dan kambing kacang!`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(65, 130); const b = S.randInt(55, 75); return [`Oven listrik ${a} kg dan microwave ${b} kg. Berapa kg lebih ringan microwave?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(260, 360); const b = S.randInt(160, 310); return [`Sapi brahman ${a} kg dan sapi angus ${b} kg. Berapa kg selisih berat kedua jenis sapi impor tersebut?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(70, 140); const b = S.randInt(60, 80); return [`Vacuum cleaner robot ${a} kg dan vacuum cleaner tangan ${b} kg. Hitung perbedaan berat kedua vacuum cleaner!`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(280, 380); const b = S.randInt(170, 330); return [`Kambing saanen ${a} kg dan kambing alpine ${b} kg. Berapa kg lebih berat kambing saanen?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(75, 150); const b = S.randInt(65, 85); return [`Rice cooker besar ${a} kg dan rice cooker kecil ${b} kg. Berapa kg selisih berat kedua rice cooker?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(300, 400); const b = S.randInt(180, 350); return [`Sapi holstein ${a} kg dan sapi jersey ${b} kg. Hitung selisih berat sapi holstein dan sapi jersey!`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(80, 160); const b = S.randInt(70, 90); return [`Mesin jahit portabel ${a} kg dan mesin jahit tradisional ${b} kg. Berapa kg perbedaan berat kedua mesin jahit?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(320, 420); const b = S.randInt(190, 370); return [`Kambing nubian ${a} kg dan kambing toggenburg ${b} kg. Berapa kg selisih berat kedua jenis kambing susu tersebut?`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(85, 170); const b = S.randInt(75, 95); return [`Mixer roti ${a} kg dan blender daging ${b} kg. Hitung selisih berat kedua alat dapur tersebut!`, Math.abs(a - b)]; },

                    () => { const a = S.randInt(25, 50); const b = S.randInt(15, 35); return [`Karung beras ${a} kg dan gula ${b} kg. Selisih beratnya ... kg`, Math.abs(a - b)]; },
                    () => { const a = S.randInt(100, 200); const b = S.randInt(80, 150); return [`Kambing ${a} kg dan domba ${b} kg. Selisih beratnya ... kg`, Math.abs(a - b)]; },
                ];
                break;
            case 6:
                questions = [
                    () => { const a = S.randInt(2000, 4000); const b = S.randInt(1500, 3000); return [`Truk pengangkut pasir membawa ${a.toLocaleString()} kg dan truk pengangkut batu membawa ${b.toLocaleString()} kg. Hitung selisih berat muatan kedua truk tersebut dalam kg!`, Math.abs(a - b)]; },
                    () => { const ton1 = S.randInt(2, 5); const ton2 = S.randInt(3, 6); return [`Kapal kargo pertama mengangkut ${ton1} ton baja dan kapal kedua mengangkut ${ton2} ton alumunium. Berapa kg selisih berat muatan kedua kapal?`, Math.abs(ton1 - ton2) * 1000]; },
                    () => { const a = S.randInt(2500, 4500); const b = S.randInt(1800, 3500); return [`Gudang A menyimpan beras ${a.toLocaleString()} kg dan gudang B menyimpan jagung ${b.toLocaleString()} kg. Hitung selisih stok bahan pangan kedua gudang!`, Math.abs(a - b)]; },
                    () => { const ton1 = S.randInt(3, 7); const ton2 = S.randInt(4, 8); return [`Perusahaan kontraktor menggunakan semen ${ton1} ton dan perusahaan developer menggunakan besi ${ton2} ton. Berapa kg perbedaan penggunaan material konstruksi?`, Math.abs(ton1 - ton2) * 1000]; },
                    () => { const a = S.randInt(3000, 5000); const b = S.randInt(2200, 4000); return [`Pabrik tekstil memiliki kapas ${a.toLocaleString()} kg dan pabrik garmen memiliki kain ${b.toLocaleString()} kg. Hitung selisih berat bahan baku industri tekstil!`, Math.abs(a - b)]; },
                    () => { const ton1 = S.randInt(4, 8); const ton2 = S.randInt(5, 9); return [`Tambang batubara menghasilkan ${ton1} ton dan tambang bijih besi menghasilkan ${ton2} ton. Berapa kg selisih produksi kedua tambang?`, Math.abs(ton1 - ton2) * 1000]; },
                    () => { const a = S.randInt(3500, 5500); const b = S.randInt(2600, 4500); return [`Bendungan A menampung air ${a.toLocaleString()} kg dan bendungan B menampung ${b.toLocaleString()} kg. Hitung selisih kapasitas tampungan air!`, Math.abs(a - b)]; },
                    () => { const ton1 = S.randInt(5, 10); const ton2 = S.randInt(6, 11); return [`Ekspor kayu keras ${ton1} ton dan ekspor kayu lapis ${ton2} ton. Berapa kg perbedaan volume ekspor kayu?`, Math.abs(ton1 - ton2) * 1000]; },
                    () => { const a = S.randInt(4000, 6000); const b = S.randInt(3000, 5000); return [`Pembangkit listrik menggunakan batubara ${a.toLocaleString()} kg dan pembangkit lain menggunakan gas ${b.toLocaleString()} kg. Hitung selisih konsumsi bahan bakar!`, Math.abs(a - b)]; },
                    () => { const ton1 = S.randInt(6, 12); const ton2 = S.randInt(7, 13); return [`Perusahaan otomotif membutuhkan baja ${ton1} ton dan perusahaan elektronik membutuhkan tembaga ${ton2} ton. Berapa kg selisih kebutuhan bahan baku?`, Math.abs(ton1 - ton2) * 1000]; },
                    () => { const a = S.randInt(4500, 6500); const b = S.randInt(3400, 5500); return [`Tambang emas menghasilkan bijih ${a.toLocaleString()} kg dan tambang perak menghasilkan ${b.toLocaleString()} kg. Hitung selisih produksi logam mulia!`, Math.abs(a - b)]; },
                    () => { const ton1 = S.randInt(7, 14); const ton2 = S.randInt(8, 15); return [`Perusahaan farmasi memproduksi obat ${ton1} ton dan perusahaan kosmetik memproduksi bahan ${ton2} ton. Berapa kg selisih produksi kedua perusahaan?`, Math.abs(ton1 - ton2) * 1000]; },
                    () => { const a = S.randInt(5000, 7000); const b = S.randInt(3800, 6000); return [`Industri kertas menggunakan pulp ${a.toLocaleString()} kg dan industri plastik menggunakan resin ${b.toLocaleString()} kg. Hitung selisih konsumsi bahan baku!`, Math.abs(a - b)]; },
                    () => { const ton1 = S.randInt(8, 16); const ton2 = S.randInt(9, 17); return [`Perusahaan konstruksi menggunakan beton ${ton1} ton dan perusahaan jalan tol menggunakan aspal ${ton2} ton. Berapa kg selisih penggunaan material?`, Math.abs(ton1 - ton2) * 1000]; },
                    () => { const a = S.randInt(5500, 7500); const b = S.randInt(4200, 6500); return [`Peternakan sapi menghasilkan daging ${a.toLocaleString()} kg dan peternakan ayam menghasilkan ${b.toLocaleString()} kg. Hitung selisih produksi daging!`, Math.abs(a - b)]; },
                    () => { const ton1 = S.randInt(9, 18); const ton2 = S.randInt(10, 19); return [`Perusahaan minyak mengangkut crude oil ${ton1} ton dan perusahaan gas mengangkut LNG ${ton2} ton. Berapa kg selisih volume energi yang diangkut?`, Math.abs(ton1 - ton2) * 1000]; },
                    () => { const a = S.randInt(6000, 8000); const b = S.randInt(4600, 7000); return [`Industri garmen memiliki kain katun ${a.toLocaleString()} kg dan industri sepatu memiliki kulit ${b.toLocaleString()} kg. Hitung selisih persediaan bahan mentah!`, Math.abs(a - b)]; },
                    () => { const ton1 = S.randInt(10, 20); const ton2 = S.randInt(11, 21); return [`Perusahaan perkapalan membawa kontainer ${ton1} ton dan perusahaan penerbangan membawa kargo ${ton2} ton. Berapa kg selisih kapasitas pengiriman?`, Math.abs(ton1 - ton2) * 1000]; },
                    () => { const a = S.randInt(6500, 8500); const b = S.randInt(5000, 7500); return [`Industri mainan memproduksi plastik ${a.toLocaleString()} kg dan industri peralatan rumah memproduksi logam ${b.toLocaleString()} kg. Hitung selisih produksi manufaktur!`, Math.abs(a - b)]; },
                    () => { const ton1 = S.randInt(11, 22); const ton2 = S.randInt(12, 23); return [`Perusahaan real estate menggunakan material ${ton1} ton dan perusahaan infrastruktur menggunakan peralatan ${ton2} ton. Berapa kg selisih kebutuhan proyek?`, Math.abs(ton1 - ton2) * 1000]; },
                    () => { const a = S.randInt(7000, 9000); const b = S.randInt(5400, 8000); return [`Pabrik pupuk menghasilkan urea ${a.toLocaleString()} kg dan pabrik kimia menghasilkan amonia ${b.toLocaleString()} kg. Hitung selisih produksi bahan kimia!`, Math.abs(a - b)]; },
                    () => { const ton1 = S.randInt(12, 24); const ton2 = S.randInt(13, 25); return [`Perusahaan baja memproduksi besi beton ${ton1} ton dan perusahaan alumunium memproduksi alumunium ${ton2} ton. Berapa kg selisih produksi logam?`, Math.abs(ton1 - ton2) * 1000]; },
                    () => { const a = S.randInt(7500, 9500); const b = S.randInt(5800, 8500); return [`Pabrik ban memproduksi ban mobil ${a.toLocaleString()} kg dan pabrik aki memproduksi aki ${b.toLocaleString()} kg. Hitung selisih produksi komponen otomotif!`, Math.abs(a - b)]; },
                    () => { const ton1 = S.randInt(13, 26); const ton2 = S.randInt(14, 27); return [`Perusahaan pertanian menggunakan pupuk ${ton1} ton dan perusahaan perkebunan menggunakan pestisida ${ton2} ton. Berapa kg selisih penggunaan bahan pertanian?`, Math.abs(ton1 - ton2) * 1000]; },
                    () => { const a = S.randInt(8000, 10000); const b = S.randInt(6200, 9000); return [`Pabrik semen memproduksi semen ${a.toLocaleString()} kg dan pabrik bata memproduksi bata ${b.toLocaleString()} kg. Hitung selisih produksi bahan bangunan!`, Math.abs(a - b)]; },
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
