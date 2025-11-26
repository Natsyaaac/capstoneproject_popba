/**
 * @fileOverview Story Mode Question Generator - Soal Cerita untuk SD Kelas 1-6
 * @description Bank soal cerita profesional untuk game Balloon Pop Maths
 * @version 2.0.0
 * 
 * Mode yang didukung:
 * - aljabar (Aljabar)
 * - time (Waktu)
 * - heavy (Massa/Berat)
 * - volume (Volume)
 * - up (Bangunan/Geometri)
 * - operator (Operasi Hitung)
 */
/*jshint esversion: 6 */

const StoryMode = {
    names: {
        boys: ["Budi", "Andi", "Riko", "Deni", "Fajar", "Hasan", "Gilang", "Rizki", "Tono", "Wahyu", "Bagus", "Dimas", "Eko", "Faisal", "Galih"],
        girls: ["Ani", "Siti", "Dewi", "Rani", "Putri", "Maya", "Lina", "Nisa", "Tika", "Wulan", "Bunga", "Citra", "Dina", "Eka", "Fitri"],
        teachers: ["Bu Guru", "Pak Guru", "Bu Ani", "Pak Budi", "Bu Sari", "Pak Hendra"],
        families: ["Ayah", "Ibu", "Kakak", "Adik", "Nenek", "Kakek", "Paman", "Bibi"]
    },

    items: {
        fruits: ["apel", "jeruk", "mangga", "pisang", "anggur", "semangka", "melon", "strawberry", "pepaya", "rambutan"],
        snacks: ["kue", "roti", "permen", "coklat", "biskuit", "donat", "puding", "es krim", "keripik", "wafer"],
        stationery: ["pensil", "pulpen", "buku tulis", "penghapus", "penggaris", "crayon", "spidol", "rautan", "gunting", "lem"],
        toys: ["boneka", "mobil-mobilan", "robot", "bola", "puzzle", "lego", "kelereng", "yoyo", "layangan", "kartu"],
        animals: ["kucing", "kelinci", "hamster", "ikan", "burung", "ayam", "bebek", "kambing", "sapi", "kuda"],
        flowers: ["mawar", "melati", "anggrek", "tulip", "bunga matahari", "kamboja", "dahlia", "krisan", "lavender", "lily"]
    },

    places: {
        school: ["kelas", "perpustakaan", "kantin", "lapangan", "taman sekolah", "ruang guru", "aula", "laboratorium"],
        home: ["rumah", "dapur", "taman", "kamar", "ruang tamu", "garasi", "halaman", "gudang"],
        public: ["pasar", "toko", "supermarket", "taman kota", "kebun binatang", "museum", "kolam renang", "perpustakaan kota"],
        nature: ["sawah", "kebun", "hutan", "sungai", "pantai", "gunung", "danau", "taman bunga"]
    },

    containers: {
        small: ["kotak", "tas", "kantong", "toples", "wadah", "keranjang kecil"],
        medium: ["keranjang", "karung", "peti", "baki", "nampan"],
        large: ["lemari", "rak", "gudang", "truk", "kontainer"]
    },

    rand: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    randInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    randName: function() {
        const allNames = [...this.names.boys, ...this.names.girls];
        return this.rand(allNames);
    },

    randItem: function() {
        const allItems = [
            ...this.items.fruits,
            ...this.items.snacks,
            ...this.items.stationery
        ];
        return this.rand(allItems);
    }
};

function getStoryQuestionsByGrade(grade, gameMode, difficulty) {
    const gradeQuestions = {
        1: generateGrade1Questions,
        2: generateGrade2Questions,
        3: generateGrade3Questions,
        4: generateGrade4Questions,
        5: generateGrade5Questions,
        6: generateGrade6Questions
    };

    const generator = gradeQuestions[grade] || generateGrade3Questions;
    return generator(gameMode, difficulty);
}

function generateGrade1Questions(gameMode, difficulty) {
    const S = StoryMode;
    let questions = [];

    switch(gameMode) {
        case "operator":
            questions = [
                () => {
                    const nama = S.randName();
                    const benda = S.rand(S.items.fruits);
                    const a = S.randInt(1, 5);
                    const b = S.randInt(1, 4);
                    return [`${nama} punya ${a} ${benda}. ${S.rand(S.names.families)} memberi ${b} ${benda} lagi. Berapa ${benda} ${nama} sekarang?`, a + b];
                },
                () => {
                    const nama = S.randName();
                    const benda = S.rand(S.items.snacks);
                    const total = S.randInt(3, 8);
                    const dimakan = S.randInt(1, total - 1);
                    return [`${nama} mempunyai ${total} ${benda}. Dimakan ${dimakan} buah. Berapa sisa ${benda}nya?`, total - dimakan];
                },
                () => {
                    const nama = S.randName();
                    const benda = S.rand(S.items.stationery);
                    const a = S.randInt(2, 6);
                    const b = S.randInt(1, 4);
                    return [`Di meja ada ${a} ${benda}. ${nama} menambah ${b} ${benda} lagi. Berapa jumlah ${benda} di meja?`, a + b];
                },
                () => {
                    const nama = S.randName();
                    const benda = S.rand(S.items.toys);
                    const total = S.randInt(4, 9);
                    const diberikan = S.randInt(1, total - 2);
                    return [`${nama} punya ${total} ${benda}. Diberikan ke teman ${diberikan} buah. Berapa yang tersisa?`, total - diberikan];
                },
                () => {
                    const benda = S.rand(S.items.fruits);
                    const di_keranjang = S.randInt(2, 5);
                    const di_meja = S.randInt(1, 4);
                    return [`Ada ${di_keranjang} ${benda} di keranjang dan ${di_meja} ${benda} di meja. Berapa jumlah semua ${benda}?`, di_keranjang + di_meja];
                }
            ];
            break;

        case "aljabar":
            questions = [
                () => {
                    const a = S.randInt(1, 5);
                    const result = S.randInt(a + 1, a + 5);
                    return [`${a} + ... = ${result}. Berapa angka yang hilang?`, result - a];
                },
                () => {
                    const result = S.randInt(3, 8);
                    const a = S.randInt(1, result - 1);
                    return [`... + ${a} = ${result}. Berapa angka yang hilang?`, result - a];
                },
                () => {
                    const nama = S.randName();
                    const benda = S.rand(S.items.snacks);
                    const sekarang = S.randInt(4, 8);
                    const awal = S.randInt(1, sekarang - 1);
                    return [`${nama} punya beberapa ${benda}. Setelah dapat ${sekarang - awal}, jadi ${sekarang}. Awalnya berapa?`, awal];
                },
                () => {
                    const total = S.randInt(4, 9);
                    const kiri = S.randInt(1, total - 1);
                    return [`${kiri} + ? = ${total}. Nilai ? adalah ...`, total - kiri];
                },
                () => {
                    const a = S.randInt(2, 6);
                    const b = S.randInt(1, a - 1);
                    return [`${a} - ... = ${b}. Berapa angka yang hilang?`, a - b];
                }
            ];
            break;

        case "time":
            questions = [
                () => {
                    const jam = S.randInt(7, 11);
                    return [`Jam berapa ${jam} lebih satu jam?`, jam + 1];
                },
                () => {
                    const jam = S.randInt(8, 12);
                    return [`Jam berapa ${jam} kurang satu jam?`, jam - 1];
                },
                () => {
                    const nama = S.randName();
                    const jam_mulai = S.randInt(7, 9);
                    const durasi = S.randInt(1, 2);
                    return [`${nama} mulai belajar jam ${jam_mulai}. Belajar ${durasi} jam. Selesai jam berapa?`, jam_mulai + durasi];
                },
                () => {
                    const nama = S.randName();
                    const jam = S.randInt(6, 8);
                    return [`${nama} bangun jam ${jam} pagi. Sekarang sudah lewat 2 jam. Jam berapa sekarang?`, jam + 2];
                },
                () => {
                    const jam = S.randInt(1, 5);
                    return [`${jam} jam = ... menit. Berapa menitnya?`, jam * 60];
                }
            ];
            break;

        case "heavy":
            questions = [
                () => {
                    const nama = S.randName();
                    const buah = S.rand(S.items.fruits);
                    const berat = S.randInt(1, 5);
                    const tambah = S.randInt(1, 3);
                    return [`${nama} membeli ${berat} kg ${buah}. Lalu membeli lagi ${tambah} kg. Berapa kg semua ${buah}nya?`, berat + tambah];
                },
                () => {
                    const a = S.randInt(2, 6);
                    const b = S.randInt(1, 3);
                    return [`Berat benda ${a} kg dikurangi ${b} kg. Sisanya berapa kg?`, a - b];
                },
                () => {
                    const nama = S.randName();
                    const berat = S.randInt(1, 5);
                    const satuan = "kg";
                    return [`Tas ${nama} beratnya ${berat} ${satuan}. Jika ditambah 1 ${satuan}, jadi berapa?`, berat + 1];
                },
                () => {
                    const berat_a = S.randInt(1, 5);
                    const berat_b = S.randInt(1, 5);
                    return [`Berat apel ${berat_a} kg dan berat jeruk ${berat_b} kg. Total beratnya berapa kg?`, berat_a + berat_b];
                },
                () => {
                    const total = S.randInt(4, 8);
                    const diambil = S.randInt(1, total - 1);
                    return [`Beras ${total} kg, diambil ${diambil} kg. Sisa beras berapa kg?`, total - diambil];
                }
            ];
            break;

        case "volume":
            questions = [
                () => {
                    const nama = S.randName();
                    const liter = S.randInt(1, 5);
                    const tambah = S.randInt(1, 3);
                    return [`${nama} punya ${liter} liter air. Ditambah ${tambah} liter. Jadi berapa liter?`, liter + tambah];
                },
                () => {
                    const total = S.randInt(3, 8);
                    const diminum = S.randInt(1, total - 1);
                    return [`Ada ${total} liter jus. Diminum ${diminum} liter. Sisa jus berapa liter?`, total - diminum];
                },
                () => {
                    const gelas_a = S.randInt(1, 4);
                    const gelas_b = S.randInt(1, 4);
                    return [`Gelas A berisi ${gelas_a} liter air. Gelas B berisi ${gelas_b} liter. Total air berapa liter?`, gelas_a + gelas_b];
                },
                () => {
                    const nama = S.randName();
                    const ember = S.randInt(3, 7);
                    const dituang = S.randInt(1, ember - 1);
                    return [`${nama} punya ember berisi ${ember} liter air. Dituang ${dituang} liter ke pot. Sisa air di ember berapa liter?`, ember - dituang];
                },
                () => {
                    const botol = S.randInt(2, 5);
                    return [`Ada ${botol} botol air, tiap botol 1 liter. Berapa liter semua airnya?`, botol];
                }
            ];
            break;

        case "up":
            questions = [
                () => {
                    const sisi = S.randInt(1, 5);
                    return [`Persegi punya 4 sisi sama panjang. Jika 1 sisi = ${sisi} cm, berapa total panjang 4 sisi?`, sisi * 4];
                },
                () => {
                    const sisi = S.randInt(2, 5);
                    return [`Keliling persegi dengan sisi ${sisi} cm adalah ... cm`, sisi * 4];
                },
                () => {
                    const panjang = S.randInt(3, 6);
                    const lebar = S.randInt(2, 4);
                    return [`Persegi panjang punya panjang ${panjang} cm dan lebar ${lebar} cm. Berapa kelilingnya?`, 2 * (panjang + lebar)];
                },
                () => {
                    const sisi = S.randInt(2, 4);
                    return [`Jika sisi persegi ${sisi} cm, kelilingnya = 4 x ${sisi} = ... cm`, sisi * 4];
                },
                () => {
                    const nama = S.randName();
                    const sisi = S.randInt(2, 5);
                    return [`${nama} menggambar persegi dengan sisi ${sisi} cm. Berapa keliling persegi itu?`, sisi * 4];
                }
            ];
            break;
    }

    return questions;
}

function generateGrade2Questions(gameMode, difficulty) {
    const S = StoryMode;
    let questions = [];

    switch(gameMode) {
        case "operator":
            questions = [
                () => {
                    const nama = S.randName();
                    const benda = S.rand(S.items.fruits);
                    const a = S.randInt(5, 15);
                    const b = S.randInt(3, 10);
                    return [`${nama} punya ${a} ${benda}. Diberi lagi ${b} buah. Berapa jumlah ${benda} sekarang?`, a + b];
                },
                () => {
                    const nama = S.randName();
                    const benda = S.rand(S.items.snacks);
                    const total = S.randInt(10, 20);
                    const dimakan = S.randInt(3, total - 3);
                    return [`${nama} membeli ${total} ${benda}. Dimakan ${dimakan} buah. Berapa sisanya?`, total - dimakan];
                },
                () => {
                    const rows = S.randInt(2, 4);
                    const cols = S.randInt(2, 5);
                    const benda = S.rand(S.items.snacks);
                    return [`Ada ${rows} baris ${benda}, tiap baris ada ${cols} buah. Berapa jumlah semua ${benda}?`, rows * cols];
                },
                () => {
                    const nama = S.randName();
                    const total = S.randInt(10, 20);
                    const orang = S.randInt(2, 5);
                    const benda = S.rand(S.items.snacks);
                    const jawaban = Math.floor(total / orang);
                    return [`${nama} punya ${jawaban * orang} ${benda} dibagi sama rata untuk ${orang} teman. Masing-masing dapat berapa?`, jawaban];
                },
                () => {
                    const di_a = S.randInt(5, 12);
                    const di_b = S.randInt(3, 10);
                    const benda = S.rand(S.items.stationery);
                    return [`Di kotak A ada ${di_a} ${benda}, di kotak B ada ${di_b} ${benda}. Berapa jumlah semua ${benda}?`, di_a + di_b];
                }
            ];
            break;

        case "aljabar":
            questions = [
                () => {
                    const a = S.randInt(3, 10);
                    const result = S.randInt(a + 2, a + 10);
                    return [`${a} + n = ${result}. Nilai n adalah ...`, result - a];
                },
                () => {
                    const result = S.randInt(5, 15);
                    const a = S.randInt(2, result - 2);
                    return [`n + ${a} = ${result}. Berapakah n?`, result - a];
                },
                () => {
                    const nama = S.randName();
                    const benda = S.rand(S.items.toys);
                    const awal = S.randInt(3, 8);
                    const total = S.randInt(awal + 2, awal + 8);
                    return [`${nama} punya ${awal} ${benda}. Setelah ulang tahun jadi ${total}. Dapat hadiah berapa ${benda}?`, total - awal];
                },
                () => {
                    const a = S.randInt(5, 15);
                    const b = S.randInt(2, a - 2);
                    return [`${a} - x = ${b}. Nilai x = ...`, a - b];
                },
                () => {
                    const pola_awal = S.randInt(1, 3);
                    const langkah = S.randInt(1, 3);
                    return [`Pola bilangan: ${pola_awal}, ${pola_awal + langkah}, ${pola_awal + 2*langkah}, ... Bilangan selanjutnya adalah ...`, pola_awal + 3*langkah];
                }
            ];
            break;

        case "time":
            questions = [
                () => {
                    const nama = S.randName();
                    const jam_mulai = S.randInt(7, 10);
                    const durasi = S.randInt(1, 3);
                    return [`${nama} mulai sekolah jam ${jam_mulai}. Pulang ${durasi} jam kemudian. Jam berapa ${nama} pulang?`, jam_mulai + durasi];
                },
                () => {
                    const jam = S.randInt(1, 4);
                    return [`${jam} jam berapa menit?`, jam * 60];
                },
                () => {
                    const menit = S.randInt(1, 3) * 60;
                    return [`${menit} menit = ... jam?`, menit / 60];
                },
                () => {
                    const nama = S.randName();
                    const jam_mulai = S.randInt(8, 12);
                    const jam_selesai = jam_mulai + S.randInt(1, 3);
                    return [`${nama} bermain dari jam ${jam_mulai} sampai jam ${jam_selesai}. Berapa jam ${nama} bermain?`, jam_selesai - jam_mulai];
                },
                () => {
                    const nama = S.randName();
                    const jam = S.randInt(6, 9);
                    const tambah = S.randInt(1, 3);
                    return [`${nama} bangun jam ${jam}. ${tambah} jam kemudian pergi sekolah. Jam berapa pergi sekolah?`, jam + tambah];
                }
            ];
            break;

        case "heavy":
            questions = [
                () => {
                    const nama = S.randName();
                    const buah = S.rand(S.items.fruits);
                    const a = S.randInt(2, 8);
                    const b = S.randInt(1, 5);
                    return [`${nama} beli ${a} kg ${buah}. Lalu beli lagi ${b} kg. Berapa kg total ${buah}nya?`, a + b];
                },
                () => {
                    const berat_a = S.randInt(3, 10);
                    const berat_b = S.randInt(2, berat_a - 1);
                    return [`Berat tas A ${berat_a} kg dan tas B ${berat_b} kg. Selisih beratnya berapa kg?`, berat_a - berat_b];
                },
                () => {
                    const kg = S.randInt(1, 5);
                    return [`${kg} kg = ... ons? (1 kg = 10 ons)`, kg * 10];
                },
                () => {
                    const ons = S.randInt(1, 5) * 10;
                    return [`${ons} ons = ... kg?`, ons / 10];
                },
                () => {
                    const nama = S.randName();
                    const berat = S.randInt(5, 15);
                    const diambil = S.randInt(2, berat - 2);
                    const benda = S.rand(S.items.fruits);
                    return [`${nama} punya ${berat} kg ${benda}. Dijual ${diambil} kg. Sisa berapa kg?`, berat - diambil];
                }
            ];
            break;

        case "volume":
            questions = [
                () => {
                    const nama = S.randName();
                    const liter_a = S.randInt(2, 8);
                    const liter_b = S.randInt(1, 5);
                    return [`${nama} menuang ${liter_a} liter air ke ember, lalu ${liter_b} liter lagi. Berapa liter air di ember?`, liter_a + liter_b];
                },
                () => {
                    const total = S.randInt(5, 15);
                    const digunakan = S.randInt(2, total - 2);
                    return [`Ada ${total} liter cat. Digunakan ${digunakan} liter. Sisa cat berapa liter?`, total - digunakan];
                },
                () => {
                    const liter = S.randInt(1, 5);
                    return [`${liter} liter = ... mililiter? (1 liter = 1000 ml)`, liter * 1000];
                },
                () => {
                    const ml = S.randInt(1, 5) * 1000;
                    return [`${ml} mililiter = ... liter?`, ml / 1000];
                },
                () => {
                    const nama = S.randName();
                    const gelas = S.randInt(3, 8);
                    const isi = S.randInt(1, 3);
                    return [`${nama} punya ${gelas} gelas, tiap gelas berisi ${isi} liter. Berapa liter semua airnya?`, gelas * isi];
                }
            ];
            break;

        case "up":
            questions = [
                () => {
                    const sisi = S.randInt(2, 8);
                    return [`Persegi dengan sisi ${sisi} cm. Kelilingnya = 4 x sisi = ... cm`, sisi * 4];
                },
                () => {
                    const panjang = S.randInt(4, 10);
                    const lebar = S.randInt(2, 6);
                    return [`Persegi panjang dengan p = ${panjang} cm dan l = ${lebar} cm. Kelilingnya = 2 x (p + l) = ... cm`, 2 * (panjang + lebar)];
                },
                () => {
                    const sisi = S.randInt(2, 6);
                    return [`Luas persegi dengan sisi ${sisi} cm = sisi x sisi = ... cm²`, sisi * sisi];
                },
                () => {
                    const panjang = S.randInt(3, 8);
                    const lebar = S.randInt(2, 5);
                    return [`Luas persegi panjang dengan panjang ${panjang} cm dan lebar ${lebar} cm = ... cm²`, panjang * lebar];
                },
                () => {
                    const nama = S.randName();
                    const sisi = S.randInt(3, 7);
                    return [`${nama} membuat bingkai foto berbentuk persegi dengan sisi ${sisi} cm. Keliling bingkai = ... cm`, sisi * 4];
                }
            ];
            break;
    }

    return questions;
}

function generateGrade3Questions(gameMode, difficulty) {
    const S = StoryMode;
    let questions = [];

    switch(gameMode) {
        case "operator":
            questions = [
                () => {
                    const nama = S.randName();
                    const benda = S.rand(S.items.fruits);
                    const kotak = S.randInt(3, 6);
                    const isi = S.randInt(5, 12);
                    return [`${nama} punya ${kotak} kotak ${benda}. Tiap kotak berisi ${isi} buah. Berapa jumlah semua ${benda}?`, kotak * isi];
                },
                () => {
                    const total = S.randInt(20, 50);
                    const kelompok = S.randInt(2, 5);
                    const benda = S.rand(S.items.snacks);
                    const jawaban = Math.floor(total / kelompok);
                    return [`Ada ${jawaban * kelompok} ${benda} dibagi ke ${kelompok} piring sama rata. Tiap piring berisi berapa ${benda}?`, jawaban];
                },
                () => {
                    const a = S.randInt(50, 150);
                    const b = S.randInt(30, 100);
                    return [`Hitunglah: ${a} + ${b} = ...`, a + b];
                },
                () => {
                    const a = S.randInt(100, 200);
                    const b = S.randInt(30, a - 20);
                    return [`Hitunglah: ${a} - ${b} = ...`, a - b];
                },
                () => {
                    const nama = S.randName();
                    const uang = S.randInt(5, 15) * 1000;
                    const harga = S.randInt(2, 8) * 1000;
                    return [`${nama} punya Rp${uang.toLocaleString()}. Membeli buku Rp${harga.toLocaleString()}. Sisa uang ${nama} berapa rupiah?`, (uang - harga)];
                }
            ];
            break;

        case "aljabar":
            questions = [
                () => {
                    const a = S.randInt(5, 20);
                    const b = S.randInt(3, 15);
                    const result = a + b;
                    return [`${a} + x = ${result}. Nilai x adalah ...`, b];
                },
                () => {
                    const x = S.randInt(2, 10);
                    const a = S.randInt(1, 5);
                    const result = x * a;
                    return [`${a} × x = ${result}. Berapakah nilai x?`, x];
                },
                () => {
                    const nama = S.randName();
                    const benda = S.rand(S.items.stationery);
                    const harga_satuan = S.randInt(2, 10);
                    const total = harga_satuan * S.randInt(3, 8);
                    return [`${nama} membeli beberapa ${benda} seharga Rp${total.toLocaleString()}. Jika 1 ${benda} = Rp${harga_satuan.toLocaleString()}, berapa ${benda} yang dibeli?`, total / harga_satuan];
                },
                () => {
                    const start = S.randInt(2, 5);
                    const step = S.randInt(2, 4);
                    return [`Pola: ${start}, ${start + step}, ${start + 2*step}, ${start + 3*step}, ... Suku ke-5 adalah ...`, start + 4*step];
                },
                () => {
                    const a = S.randInt(10, 30);
                    const b = S.randInt(5, a - 5);
                    return [`x - ${a - b} = ${b}. Nilai x = ...`, a];
                }
            ];
            break;

        case "time":
            questions = [
                () => {
                    const nama = S.randName();
                    const jam_mulai = S.randInt(7, 10);
                    const menit_durasi = S.randInt(2, 4) * 30;
                    const jam_selesai = jam_mulai + Math.floor(menit_durasi / 60);
                    const sisa_menit = menit_durasi % 60;
                    if (sisa_menit === 0) {
                        return [`${nama} belajar mulai jam ${jam_mulai}. Durasi belajar ${menit_durasi / 60} jam. Selesai jam berapa?`, jam_selesai];
                    } else {
                        return [`${menit_durasi} menit = ... jam ... menit. Berapa jamnya saja?`, Math.floor(menit_durasi / 60)];
                    }
                },
                () => {
                    const jam = S.randInt(1, 5);
                    const menit = S.randInt(1, 3) * 15;
                    const total_menit = jam * 60 + menit;
                    return [`${jam} jam ${menit} menit = ... menit`, total_menit];
                },
                () => {
                    const jam_mulai = S.randInt(8, 14);
                    const jam_selesai = jam_mulai + S.randInt(1, 4);
                    return [`Film dimulai jam ${jam_mulai}.00 dan selesai jam ${jam_selesai}.00. Berapa jam durasi film?`, jam_selesai - jam_mulai];
                },
                () => {
                    const menit = S.randInt(2, 5) * 60;
                    return [`${menit} menit = ... jam`, menit / 60];
                },
                () => {
                    const nama = S.randName();
                    const jam_berangkat = S.randInt(6, 8);
                    const durasi_perjalanan = S.randInt(1, 2);
                    return [`${nama} berangkat dari rumah jam ${jam_berangkat}. Sampai sekolah ${durasi_perjalanan} jam kemudian. Jam berapa sampai?`, jam_berangkat + durasi_perjalanan];
                }
            ];
            break;

        case "heavy":
            questions = [
                () => {
                    const kg = S.randInt(1, 10);
                    return [`${kg} kilogram = ... gram? (1 kg = 1000 gram)`, kg * 1000];
                },
                () => {
                    const gram = S.randInt(1, 10) * 1000;
                    return [`${gram} gram = ... kilogram?`, gram / 1000];
                },
                () => {
                    const nama = S.randName();
                    const beras = S.randInt(5, 20);
                    const gula = S.randInt(2, 10);
                    return [`${nama} membeli ${beras} kg beras dan ${gula} kg gula. Total berat belanjaan = ... kg`, beras + gula];
                },
                () => {
                    const ons = S.randInt(10, 50);
                    return [`${ons} ons = ... kg? (10 ons = 1 kg)`, ons / 10];
                },
                () => {
                    const nama = S.randName();
                    const total = S.randInt(10, 30);
                    const dijual = S.randInt(5, total - 3);
                    const buah = S.rand(S.items.fruits);
                    return [`${nama} punya ${total} kg ${buah}. Dijual ${dijual} kg. Sisa berapa kg?`, total - dijual];
                }
            ];
            break;

        case "volume":
            questions = [
                () => {
                    const liter = S.randInt(2, 10);
                    return [`${liter} liter = ... mililiter?`, liter * 1000];
                },
                () => {
                    const ml = S.randInt(2, 10) * 1000;
                    return [`${ml} mililiter = ... liter?`, ml / 1000];
                },
                () => {
                    const nama = S.randName();
                    const ember = S.randInt(5, 15);
                    const digunakan = S.randInt(2, ember - 2);
                    return [`${nama} punya ${ember} liter air. Digunakan ${digunakan} liter untuk menyiram. Sisa air berapa liter?`, ember - digunakan];
                },
                () => {
                    const botol = S.randInt(3, 8);
                    const isi = S.randInt(1, 3);
                    return [`Ada ${botol} botol, tiap botol berisi ${isi} liter. Berapa liter total airnya?`, botol * isi];
                },
                () => {
                    const total = S.randInt(10, 30);
                    const gelas = S.randInt(2, 5);
                    const jawaban = Math.floor(total / gelas);
                    return [`${jawaban * gelas} liter air dibagi ke ${gelas} ember sama rata. Tiap ember berisi ... liter`, jawaban];
                }
            ];
            break;

        case "up":
            questions = [
                () => {
                    const sisi = S.randInt(3, 12);
                    return [`Keliling persegi dengan sisi ${sisi} cm = ... cm`, sisi * 4];
                },
                () => {
                    const sisi = S.randInt(3, 10);
                    return [`Luas persegi dengan sisi ${sisi} cm = ... cm²`, sisi * sisi];
                },
                () => {
                    const p = S.randInt(5, 15);
                    const l = S.randInt(3, 10);
                    return [`Keliling persegi panjang dengan p=${p} cm dan l=${l} cm = ... cm`, 2 * (p + l)];
                },
                () => {
                    const p = S.randInt(4, 12);
                    const l = S.randInt(2, 8);
                    return [`Luas persegi panjang dengan panjang ${p} cm dan lebar ${l} cm = ... cm²`, p * l];
                },
                () => {
                    const alas = S.randInt(4, 12);
                    const tinggi = S.randInt(3, 10);
                    return [`Luas segitiga dengan alas ${alas} cm dan tinggi ${tinggi} cm = 1/2 × a × t = ... cm²`, (alas * tinggi) / 2];
                }
            ];
            break;
    }

    return questions;
}

function generateGrade4Questions(gameMode, difficulty) {
    const S = StoryMode;
    let questions = [];

    switch(gameMode) {
        case "operator":
            questions = [
                () => {
                    const a = S.randInt(100, 500);
                    const b = S.randInt(50, 300);
                    const c = S.randInt(20, 150);
                    return [`Hitunglah: ${a} + ${b} - ${c} = ...`, a + b - c];
                },
                () => {
                    const a = S.randInt(10, 25);
                    const b = S.randInt(5, 15);
                    return [`Hitunglah: ${a} × ${b} = ...`, a * b];
                },
                () => {
                    const b = S.randInt(5, 12);
                    const hasil = S.randInt(5, 15);
                    const a = b * hasil;
                    return [`Hitunglah: ${a} ÷ ${b} = ...`, hasil];
                },
                () => {
                    const nama = S.randName();
                    const harga = S.randInt(15, 50) * 1000;
                    const jumlah = S.randInt(2, 5);
                    return [`${nama} membeli ${jumlah} buku seharga Rp${harga.toLocaleString()} per buku. Total yang harus dibayar = Rp...`, harga * jumlah];
                },
                () => {
                    const nama = S.randName();
                    const uang = S.randInt(50, 100) * 1000;
                    const beli1 = S.randInt(15, 30) * 1000;
                    const beli2 = S.randInt(10, 20) * 1000;
                    return [`${nama} punya Rp${uang.toLocaleString()}. Membeli buku Rp${beli1.toLocaleString()} dan pensil Rp${beli2.toLocaleString()}. Sisa uang = Rp...`, uang - beli1 - beli2];
                }
            ];
            break;

        case "aljabar":
            questions = [
                () => {
                    const x = S.randInt(2, 10);
                    const koef = S.randInt(2, 5);
                    const result = x * koef;
                    return [`${koef}x = ${result}. Nilai x = ...`, x];
                },
                () => {
                    const x = S.randInt(3, 12);
                    const a = S.randInt(2, 8);
                    const result = x + a;
                    return [`x + ${a} = ${result}. Nilai x = ...`, x];
                },
                () => {
                    const start = S.randInt(1, 5);
                    const step = S.randInt(2, 5);
                    const n = 5;
                    return [`Pola bilangan: ${start}, ${start + step}, ${start + 2*step}, ... Suku ke-${n} adalah ...`, start + (n-1)*step];
                },
                () => {
                    const nama = S.randName();
                    const x = S.randInt(5, 15);
                    const ditambah = S.randInt(3, 10);
                    const total = x + ditambah;
                    return [`${nama} punya x ${S.rand(S.items.snacks)}. Setelah ditambah ${ditambah}, jadi ${total}. Nilai x = ...`, x];
                },
                () => {
                    const a = S.randInt(2, 6);
                    const b = S.randInt(1, 5);
                    const x = S.randInt(2, 8);
                    const result = a * x + b;
                    return [`${a}x + ${b} = ${result}. Nilai x = ...`, x];
                }
            ];
            break;

        case "time":
            questions = [
                () => {
                    const hari = S.randInt(1, 5);
                    return [`${hari} hari = ... jam? (1 hari = 24 jam)`, hari * 24];
                },
                () => {
                    const minggu = S.randInt(1, 4);
                    return [`${minggu} minggu = ... hari?`, minggu * 7];
                },
                () => {
                    const jam = S.randInt(24, 96);
                    return [`${jam} jam = ... hari? (Pembulatan ke bawah)`, Math.floor(jam / 24)];
                },
                () => {
                    const nama = S.randName();
                    const jam_mulai = 8;
                    const menit_mulai = 30;
                    const durasi_jam = S.randInt(1, 3);
                    const jam_selesai = jam_mulai + durasi_jam;
                    return [`${nama} mulai belajar jam ${jam_mulai}.${menit_mulai}. Belajar ${durasi_jam} jam. Selesai jam berapa? (Jawab jamnya saja)`, jam_selesai];
                },
                () => {
                    const detik = S.randInt(60, 300);
                    return [`${detik} detik = ... menit? (Pembulatan ke bawah)`, Math.floor(detik / 60)];
                }
            ];
            break;

        case "heavy":
            questions = [
                () => {
                    const kg = S.randInt(1, 5);
                    const gram = S.randInt(100, 900);
                    return [`${kg} kg ${gram} gram = ... gram`, kg * 1000 + gram];
                },
                () => {
                    const gram = S.randInt(1500, 5000);
                    return [`${gram} gram = ... kg ... gram. Berapa kg nya saja?`, Math.floor(gram / 1000)];
                },
                () => {
                    const kuintal = S.randInt(1, 5);
                    return [`${kuintal} kuintal = ... kg? (1 kuintal = 100 kg)`, kuintal * 100];
                },
                () => {
                    const nama = S.randName();
                    const berat_a = S.randInt(2, 10);
                    const berat_b = S.randInt(1, 5);
                    return [`${nama} membeli ${berat_a} kg beras dan ${berat_b} kg gula. Total berat = ... kg`, berat_a + berat_b];
                },
                () => {
                    const ton = S.randInt(1, 3);
                    return [`${ton} ton = ... kg? (1 ton = 1000 kg)`, ton * 1000];
                }
            ];
            break;

        case "volume":
            questions = [
                () => {
                    const liter = S.randInt(1, 5);
                    const ml = S.randInt(100, 900);
                    return [`${liter} liter ${ml} ml = ... ml`, liter * 1000 + ml];
                },
                () => {
                    const ml = S.randInt(1500, 8000);
                    return [`${ml} ml = ... liter ... ml. Berapa liternya saja?`, Math.floor(ml / 1000)];
                },
                () => {
                    const nama = S.randName();
                    const ember = S.randInt(10, 30);
                    const digunakan = S.randInt(5, ember - 3);
                    return [`${nama} punya ${ember} liter air. Digunakan ${digunakan} liter. Sisa air = ... liter`, ember - digunakan];
                },
                () => {
                    const sisi = S.randInt(2, 5);
                    return [`Volume kubus dengan sisi ${sisi} cm = sisi³ = ... cm³`, sisi * sisi * sisi];
                },
                () => {
                    const p = S.randInt(3, 8);
                    const l = S.randInt(2, 5);
                    const t = S.randInt(2, 4);
                    return [`Volume balok dengan p=${p} cm, l=${l} cm, t=${t} cm = ... cm³`, p * l * t];
                }
            ];
            break;

        case "up":
            questions = [
                () => {
                    const sisi = S.randInt(3, 10);
                    return [`Luas persegi dengan sisi ${sisi} cm = ... cm²`, sisi * sisi];
                },
                () => {
                    const p = S.randInt(5, 15);
                    const l = S.randInt(3, 10);
                    return [`Luas persegi panjang ${p} cm × ${l} cm = ... cm²`, p * l];
                },
                () => {
                    const alas = S.randInt(4, 12);
                    const tinggi = S.randInt(3, 10);
                    return [`Luas segitiga dengan alas ${alas} cm dan tinggi ${tinggi} cm = ... cm²`, (alas * tinggi) / 2];
                },
                () => {
                    const sisi = S.randInt(2, 6);
                    return [`Volume kubus dengan sisi ${sisi} cm = ... cm³`, sisi * sisi * sisi];
                },
                () => {
                    const p = S.randInt(3, 8);
                    const l = S.randInt(2, 5);
                    const t = S.randInt(2, 6);
                    return [`Volume balok ${p} × ${l} × ${t} cm = ... cm³`, p * l * t];
                }
            ];
            break;
    }

    return questions;
}

function generateGrade5Questions(gameMode, difficulty) {
    const S = StoryMode;
    let questions = [];

    switch(gameMode) {
        case "operator":
            questions = [
                () => {
                    const a = S.randInt(100, 999);
                    const b = S.randInt(10, 99);
                    return [`Hitunglah: ${a} × ${b} = ...`, a * b];
                },
                () => {
                    const b = S.randInt(10, 25);
                    const hasil = S.randInt(10, 50);
                    const a = b * hasil;
                    return [`Hitunglah: ${a} ÷ ${b} = ...`, hasil];
                },
                () => {
                    const nama = S.randName();
                    const tabungan = S.randInt(100, 500) * 1000;
                    const perBulan = S.randInt(20, 80) * 1000;
                    const bulan = S.randInt(2, 6);
                    return [`${nama} punya tabungan Rp${tabungan.toLocaleString()}. Menabung Rp${perBulan.toLocaleString()} per bulan selama ${bulan} bulan. Total tabungan = Rp...`, tabungan + (perBulan * bulan)];
                },
                () => {
                    const a = S.randInt(1000, 5000);
                    const b = S.randInt(500, 2000);
                    const c = S.randInt(100, 800);
                    return [`Hitunglah: ${a} - ${b} + ${c} = ...`, a - b + c];
                },
                () => {
                    const persen = S.randInt(10, 50);
                    const nilai = S.randInt(100, 500);
                    return [`${persen}% dari ${nilai} = ...`, (persen * nilai) / 100];
                }
            ];
            break;

        case "aljabar":
            questions = [
                () => {
                    const a = S.randInt(2, 5);
                    const b = S.randInt(3, 10);
                    const x = S.randInt(2, 8);
                    const result = a * x + b;
                    return [`${a}n + ${b} = ${result}. Nilai n = ...`, x];
                },
                () => {
                    const a = S.randInt(2, 6);
                    const b = S.randInt(1, 8);
                    const x = S.randInt(3, 10);
                    const result = a * x - b;
                    return [`${a}x - ${b} = ${result}. Nilai x = ...`, x];
                },
                () => {
                    const start = S.randInt(2, 10);
                    const ratio = S.randInt(2, 3);
                    return [`Deret: ${start}, ${start * ratio}, ${start * ratio * ratio}, ... Suku ke-4 = ...`, start * Math.pow(ratio, 3)];
                },
                () => {
                    const nama = S.randName();
                    const x = S.randInt(10, 30);
                    const y = x + S.randInt(5, 15);
                    return [`Umur ${nama} adalah x tahun. 5 tahun lagi umurnya ${y + 5} tahun. Umur ${nama} sekarang = ... tahun`, y];
                },
                () => {
                    const a = S.randInt(10, 50);
                    const b = S.randInt(5, 20);
                    const result = a - b;
                    return [`y - ${b} = ${result}. Nilai y = ...`, a];
                }
            ];
            break;

        case "time":
            questions = [
                () => {
                    const bulan = S.randInt(1, 6);
                    return [`${bulan} bulan = ... hari? (1 bulan = 30 hari)`, bulan * 30];
                },
                () => {
                    const tahun = S.randInt(1, 3);
                    return [`${tahun} tahun = ... bulan?`, tahun * 12];
                },
                () => {
                    const windu = S.randInt(1, 3);
                    return [`${windu} windu = ... tahun? (1 windu = 8 tahun)`, windu * 8];
                },
                () => {
                    const abad = S.randInt(1, 2);
                    return [`${abad} abad = ... tahun?`, abad * 100];
                },
                () => {
                    const nama = S.randName();
                    const jam_berangkat = S.randInt(6, 9);
                    const durasi_jam = S.randInt(1, 3);
                    const durasi_menit = S.randInt(1, 3) * 15;
                    const total_menit = durasi_jam * 60 + durasi_menit;
                    return [`${nama} berangkat jam ${jam_berangkat}.00. Perjalanan ${durasi_jam} jam ${durasi_menit} menit. Sampai dalam berapa menit total?`, total_menit];
                }
            ];
            break;

        case "heavy":
            questions = [
                () => {
                    const ton = S.randInt(1, 5);
                    const kg = S.randInt(100, 900);
                    return [`${ton} ton ${kg} kg = ... kg`, ton * 1000 + kg];
                },
                () => {
                    const kuintal = S.randInt(1, 10);
                    return [`${kuintal} kuintal = ... kg`, kuintal * 100];
                },
                () => {
                    const kg = S.randInt(500, 5000);
                    return [`${kg} kg = ... kuintal`, kg / 100];
                },
                () => {
                    const nama = S.randName();
                    const berat_awal = S.randInt(50, 100);
                    const tambah = S.randInt(10, 30);
                    return [`Berat badan ${nama} adalah ${berat_awal} kg. Setelah ${S.randInt(3, 6)} bulan, naik ${tambah} kg. Berat badan sekarang = ... kg`, berat_awal + tambah];
                },
                () => {
                    const kg = S.randInt(2000, 8000);
                    return [`${kg} kg = ... ton`, kg / 1000];
                }
            ];
            break;

        case "volume":
            questions = [
                () => {
                    const sisi = S.randInt(3, 8);
                    return [`Volume kubus dengan rusuk ${sisi} cm = ... cm³`, sisi * sisi * sisi];
                },
                () => {
                    const p = S.randInt(5, 12);
                    const l = S.randInt(3, 8);
                    const t = S.randInt(2, 6);
                    return [`Volume balok ${p} × ${l} × ${t} cm = ... cm³`, p * l * t];
                },
                () => {
                    const sisi = S.randInt(3, 7);
                    return [`Luas permukaan kubus dengan sisi ${sisi} cm = 6 × sisi² = ... cm²`, 6 * sisi * sisi];
                },
                () => {
                    const liter = S.randInt(1, 10);
                    return [`${liter} liter = ... dm³? (1 liter = 1 dm³)`, liter];
                },
                () => {
                    const dm3 = S.randInt(1, 10);
                    return [`${dm3} dm³ = ... cm³? (1 dm³ = 1000 cm³)`, dm3 * 1000];
                }
            ];
            break;

        case "up":
            questions = [
                () => {
                    const sisi = S.randInt(3, 10);
                    return [`Luas permukaan kubus dengan sisi ${sisi} cm = 6s² = ... cm²`, 6 * sisi * sisi];
                },
                () => {
                    const p = S.randInt(4, 10);
                    const l = S.randInt(3, 8);
                    const t = S.randInt(2, 6);
                    return [`Luas permukaan balok ${p} × ${l} × ${t} cm = 2(pl + pt + lt) = ... cm²`, 2 * (p*l + p*t + l*t)];
                },
                () => {
                    const r = S.randInt(3, 10);
                    return [`Keliling lingkaran dengan jari-jari ${r} cm = 2 × π × r = ... cm (π = 3.14, bulatkan)`, Math.round(2 * 3.14 * r)];
                },
                () => {
                    const r = S.randInt(3, 8);
                    return [`Luas lingkaran dengan jari-jari ${r} cm = π × r² = ... cm² (π = 3.14, bulatkan)`, Math.round(3.14 * r * r)];
                },
                () => {
                    const alas = S.randInt(5, 15);
                    const tinggi = S.randInt(4, 12);
                    return [`Luas jajargenjang dengan alas ${alas} cm dan tinggi ${tinggi} cm = ... cm²`, alas * tinggi];
                }
            ];
            break;
    }

    return questions;
}

function generateGrade6Questions(gameMode, difficulty) {
    const S = StoryMode;
    let questions = [];

    switch(gameMode) {
        case "operator":
            questions = [
                () => {
                    const a = S.randInt(100, 999);
                    const b = S.randInt(100, 999);
                    return [`Hitunglah: ${a} × ${b} = ...`, a * b];
                },
                () => {
                    const persen = S.randInt(10, 75);
                    const nilai = S.randInt(200, 1000);
                    return [`${persen}% dari ${nilai} = ...`, (persen * nilai) / 100];
                },
                () => {
                    const nama = S.randName();
                    const harga_awal = S.randInt(100, 500) * 1000;
                    const diskon = S.randInt(10, 40);
                    const potongan = (diskon * harga_awal) / 100;
                    return [`${nama} membeli baju Rp${harga_awal.toLocaleString()} dengan diskon ${diskon}%. Berapa potongan harganya? (dalam ribuan)`, potongan / 1000];
                },
                () => {
                    const a = S.randInt(1, 9);
                    const b = S.randInt(1, 9);
                    const c = S.randInt(1, 9);
                    return [`Hitunglah: ${a} + ${b} × ${c} = ... (ingat urutan operasi)`, a + (b * c)];
                },
                () => {
                    const pembilang = S.randInt(1, 5);
                    const penyebut = S.randInt(pembilang + 1, 10);
                    const kali = S.randInt(10, 50);
                    return [`${pembilang}/${penyebut} × ${kali} = ...`, (pembilang * kali) / penyebut];
                }
            ];
            break;

        case "aljabar":
            questions = [
                () => {
                    const a = S.randInt(2, 6);
                    const b = S.randInt(3, 12);
                    const x = S.randInt(2, 10);
                    const result = a * x + b;
                    return [`${a}x + ${b} = ${result}. Nilai x = ...`, x];
                },
                () => {
                    const a = S.randInt(2, 5);
                    const b = S.randInt(1, a);
                    const x = S.randInt(3, 12);
                    const result = a * x - b;
                    return [`${a}x - ${b} = ${result}. Nilai x = ...`, x];
                },
                () => {
                    const x = S.randInt(5, 20);
                    const a = S.randInt(2, 4);
                    const b = S.randInt(1, 10);
                    const result = (x / a) + b;
                    return [`x/${a} + ${b} = ${result}. Nilai x = ...`, x];
                },
                () => {
                    const n = S.randInt(5, 8);
                    const a = S.randInt(2, 5);
                    const b = S.randInt(1, 10);
                    return [`Suku ke-n dari Un = ${a}n + ${b}. Suku ke-${n} = ...`, a * n + b];
                },
                () => {
                    const a = S.randInt(2, 5);
                    const b = S.randInt(1, 5);
                    const c = S.randInt(2, 4);
                    const d = S.randInt(1, 10);
                    const x = S.randInt(2, 8);
                    const lhs = a * x + b;
                    const rhs = c * x + d;
                    if (lhs === rhs) {
                        return [`${a}x + ${b} = ${lhs}. Nilai x = ...`, x];
                    }
                    return [`${a}x + ${b} = ${lhs}. Nilai x = ...`, x];
                }
            ];
            break;

        case "time":
            questions = [
                () => {
                    const dasawarsa = S.randInt(1, 5);
                    return [`${dasawarsa} dasawarsa = ... tahun? (1 dasawarsa = 10 tahun)`, dasawarsa * 10];
                },
                () => {
                    const abad = S.randInt(1, 3);
                    return [`${abad} abad = ... tahun?`, abad * 100];
                },
                () => {
                    const nama = S.randName();
                    const tahun_lahir = S.randInt(2010, 2015);
                    const tahun_sekarang = 2024;
                    return [`${nama} lahir tahun ${tahun_lahir}. Berapa umur ${nama} di tahun ${tahun_sekarang}?`, tahun_sekarang - tahun_lahir];
                },
                () => {
                    const tahun = S.randInt(10, 50);
                    return [`${tahun} tahun = ... windu ... tahun. Berapa windunya saja?`, Math.floor(tahun / 8)];
                },
                () => {
                    const jam1 = S.randInt(8, 14);
                    const menit1 = S.randInt(0, 3) * 15;
                    const jam2 = jam1 + S.randInt(1, 4);
                    const menit2 = S.randInt(0, 3) * 15;
                    const durasi = (jam2 * 60 + menit2) - (jam1 * 60 + menit1);
                    return [`Dari jam ${jam1}.${menit1.toString().padStart(2, '0')} sampai jam ${jam2}.${menit2.toString().padStart(2, '0')} adalah ... menit`, durasi];
                }
            ];
            break;

        case "heavy":
            questions = [
                () => {
                    const ton = S.randInt(2, 10);
                    const kuintal = S.randInt(1, 9);
                    return [`${ton} ton ${kuintal} kuintal = ... kg`, ton * 1000 + kuintal * 100];
                },
                () => {
                    const kg = S.randInt(1000, 9000);
                    return [`${kg} kg = ... ton ... kg. Berapa tonnya saja?`, Math.floor(kg / 1000)];
                },
                () => {
                    const nama = S.randName();
                    const berat_truk = S.randInt(2, 5);
                    const muatan = S.randInt(500, 2000);
                    return [`Truk ${nama} beratnya ${berat_truk} ton. Muatan ${muatan} kg. Total berat = ... kg`, berat_truk * 1000 + muatan];
                },
                () => {
                    const perbandingan_a = S.randInt(2, 5);
                    const perbandingan_b = S.randInt(1, 4);
                    const total = (perbandingan_a + perbandingan_b) * S.randInt(5, 20);
                    const bagian_a = (perbandingan_a / (perbandingan_a + perbandingan_b)) * total;
                    return [`Perbandingan berat A : B = ${perbandingan_a} : ${perbandingan_b}. Jika total ${total} kg, berat A = ... kg`, bagian_a];
                },
                () => {
                    const skala = S.randInt(1, 5) * 100;
                    const berat_model = S.randInt(10, 50);
                    return [`Jika skala ${skala} : 1, dan berat model ${berat_model} gram, berat asli = ... gram`, skala * berat_model];
                }
            ];
            break;

        case "volume":
            questions = [
                () => {
                    const r = S.randInt(3, 7);
                    const t = S.randInt(5, 12);
                    const vol = Math.round(3.14 * r * r * t);
                    return [`Volume tabung dengan r=${r} cm dan t=${t} cm = π × r² × t = ... cm³ (π=3.14, bulatkan)`, vol];
                },
                () => {
                    const sisi = S.randInt(4, 10);
                    return [`Volume kubus dengan sisi ${sisi} cm = ... cm³`, sisi * sisi * sisi];
                },
                () => {
                    const p = S.randInt(5, 12);
                    const l = S.randInt(4, 10);
                    const t = S.randInt(3, 8);
                    return [`Volume balok ${p} × ${l} × ${t} cm = ... cm³`, p * l * t];
                },
                () => {
                    const alas = S.randInt(4, 10);
                    const tinggi_segitiga = S.randInt(3, 8);
                    const tinggi_prisma = S.randInt(5, 12);
                    const vol = (alas * tinggi_segitiga / 2) * tinggi_prisma;
                    return [`Volume prisma segitiga (alas ${alas} cm, tinggi segitiga ${tinggi_segitiga} cm, tinggi prisma ${tinggi_prisma} cm) = ... cm³`, vol];
                },
                () => {
                    const sisi_alas = S.randInt(4, 10);
                    const tinggi = S.randInt(5, 12);
                    const vol = Math.round((sisi_alas * sisi_alas * tinggi) / 3);
                    return [`Volume limas persegi (sisi alas ${sisi_alas} cm, tinggi ${tinggi} cm) = 1/3 × s² × t = ... cm³`, vol];
                }
            ];
            break;

        case "up":
            questions = [
                () => {
                    const r = S.randInt(5, 12);
                    const luas = Math.round(3.14 * r * r);
                    return [`Luas lingkaran dengan r=${r} cm = π × r² = ... cm² (π=3.14, bulatkan)`, luas];
                },
                () => {
                    const r = S.randInt(4, 10);
                    const keliling = Math.round(2 * 3.14 * r);
                    return [`Keliling lingkaran dengan r=${r} cm = 2 × π × r = ... cm (π=3.14, bulatkan)`, keliling];
                },
                () => {
                    const sisi = S.randInt(4, 10);
                    return [`Luas permukaan kubus dengan sisi ${sisi} cm = 6 × s² = ... cm²`, 6 * sisi * sisi];
                },
                () => {
                    const p = S.randInt(5, 12);
                    const l = S.randInt(4, 10);
                    const t = S.randInt(3, 8);
                    const lp = 2 * (p*l + p*t + l*t);
                    return [`Luas permukaan balok ${p} × ${l} × ${t} cm = 2(pl + pt + lt) = ... cm²`, lp];
                },
                () => {
                    const sisi1 = S.randInt(3, 8);
                    const sisi2 = sisi1 * 2;
                    const perbandingan = (sisi2 * sisi2 * sisi2) / (sisi1 * sisi1 * sisi1);
                    return [`Jika sisi kubus diperbesar 2x, volume menjadi berapa kali lipat?`, perbandingan];
                }
            ];
            break;
    }

    return questions;
}

function getStoryQuestion(gameMode, difficulty, questionType) {
    const difficultyGrades = {
        "easy": [1, 2],
        "medium": [3, 4],
        "hard": [5, 6]
    };

    const grades = difficultyGrades[difficulty] || difficultyGrades["medium"];
    const selectedGrade = grades[Math.floor(Math.random() * grades.length)];
    
    const questions = getStoryQuestionsByGrade(selectedGrade, gameMode, difficulty);
    
    if (questions && questions.length > 0) {
        const questionGenerator = questions[Math.floor(Math.random() * questions.length)];
        return questionGenerator();
    }
    
    return null;
}

function getStoryQuestionArray(gameMode, difficulty, questionType, qno) {
    let questionArray = [];
    let attempts = 0;
    const maxAttempts = qno * 10;
    
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
        console.warn(`Warning: Only generated ${questionArray.length}/${qno} unique questions`);
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
    window.getStoryQuestionsByGrade = getStoryQuestionsByGrade;
    window.getRandomStoryByMode = getRandomStoryByMode;
}
