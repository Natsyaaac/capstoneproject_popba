/**
* @fileOverview JavaScript Maths Function Library.
* @author <a href="https://github.com/richardhenyash">Richard Ash</a>
* @version 1.1.1
*/
/*jshint esversion: 6 */

/**
* [Function to return random question and answer array, given game mode, options and number of questions]
* @param  {[string]}    gameMode        [Game mode]
* @param  {[string]}    optionArray     [Array of active option button text value strings]
* @param  {[number]}    qno             [Number of questions]
* @return {[array]}                     [Question and answer array - an array of 2 item arrays giving question and answer]
*/
function returnQuestionArray(gameMode, optionArray, qno) {
    let questionArray = [];
    // Check game mode and run correct question array function
    if (gameMode == "multiply") {
        questionArray = returnMultiplicationQuestionArray(optionArray, qno);
    } else if (gameMode == "divide") {
        questionArray = returnDivisionQuestionArray(optionArray, qno);
    } else if (gameMode == "add") {
        questionArray = returnAdditionQuestionArray(optionArray, qno);
    } else if (gameMode == "subtract") {
        questionArray = returnSubtractionQuestionArray(optionArray, qno);
    } else if (gameMode == 'aljabar') {
        questionArray = returnAljabarQuestionArray(optionArray, qno)
    } else if (gameMode == 'time') {
        questionArray = returnTimeQuestionArray(optionArray, qno) // sementara pakai aljabar dulu
    } else if (gameMode == 'heavy') {
        questionArray = returnHeavyQuestionArray(optionArray, qno) // sementara pakai aljabar dulu
    } else if (gameMode == 'volume') {
        questionArray = returnVolumeQuestionArray(optionArray, qno) // sementara pakai aljabar dulu
    } else if (gameMode == 'up') {
        questionArray = returnUpQuestionArray(optionArray, qno) // sementara pakai aljabar dulu 
    } else if (gameMode == 'operator') {
        questionArray = returnOperatorQuestionArray(optionArray, qno)
    } 
    return (questionArray);
}




/**
* [Function to return random multiplication question and answer array, given options and number of questions]
* @param  {[string]}    optionArray     [Array of active option button text value strings]
* @param  {[number]}    qno             [Number of questions]
* @return {[array]}                     [Question and answer array - an array of 2 item arrays giving question and answer]
*/
function returnMultiplicationQuestionArray(optionArray, qno) {
    // Initialise multiplication question array
    let mqArray = [];
    let i;
    let ttq;
    let tk;
    // For 2, 5 and 10 times tables
    if (optionArray[0] == "2x, 5x, 10x") {
        let remq = (qno % 3);
        // Set number of 2 times table questions
        let no2xQ = Math.floor(qno / 3) + remq;
        // Set number of 5 times table questions
        let no5xQ = Math.floor(qno / 3);
        // Set number of 10 times table questions
        let no10xQ = Math.floor(qno / 3);
        // Generate random multiplication questions and add to array
        for (i = 0; i < no2xQ; i++) {
            // Generate random question
            ttq = returnMultiplicationQuestion(2);
            // Check random question is not already in question array
            tk = 0;
            while ((tk < 11) && (checkQuestionArray(ttq, mqArray))) {
                ttq = returnMultiplicationQuestion(2);
                tk++;
            }
            // Add random question to question array
            mqArray.push(ttq);
        }
        for (i = 0; i < no5xQ; i++) {
            // Generate random question
            ttq = returnMultiplicationQuestion(5);
            // Check random question is not already in question array
            tk = 0;
            while ((tk < 11) && (checkQuestionArray(ttq, mqArray))) {
                ttq = returnMultiplicationQuestion(5);
                tk++;
            }
            // Add random question to question array
            mqArray.push(ttq);
        }
        for (i = 0; i < no10xQ; i++) {
            // Generate random question
            ttq = returnMultiplicationQuestion(10);
            // Check random question is not already in question array
            tk = 0;
            while ((tk < 11) && (checkQuestionArray(ttq, mqArray))) {
                ttq = returnMultiplicationQuestion(10);
                tk++;
            }
            // Add random question to question array
            mqArray.push(ttq);
        }
    } else if (optionArray[0] == "Mixed 1 to 12") {
        // For mixed 1 to 12
        let ttno;
        let ttq;
        // Generate random multiplication questions and add to array
        for (i = 0; i < qno; i++) {
            ttno = Math.floor((Math.random() * 12) + 1);
            // Generate random question
            ttq = returnMultiplicationQuestion(ttno);
            // Check random question is not already in question array
            tk = 0;
            while ((tk < 11) && (checkQuestionArray(ttq, mqArray))) {
                ttq = returnMultiplicationQuestion(ttno);
                tk++;
            }
            // Add random question to question array
            mqArray.push(ttq);
        }
    } else {
        // For specific times tables
        let ttk = 0;
        let ttqstr;
        let ttqstrnew;
        for (i = 0; i < qno; i++) {
            ttqstr = (optionArray[ttk]);
            ttqstrnew = ttqstr.substring(0, ttqstr.length - 1);
            // Generate random question
            ttq = returnMultiplicationQuestion(ttqstrnew);
            // Check random question is not already in question array
            tk = 0;
            while ((tk < 11) && (checkQuestionArray(ttq, mqArray))) {
                ttq = returnMultiplicationQuestion(ttqstrnew);
                tk++;
            }
            // Add random question to question array
            mqArray.push(ttq);
            if (ttk < (optionArray.length - 1)) {
                ttk = (ttk + 1);
            } else {
                ttk = 0;
            }
        }
    }
    return (mqArray);
}

/**
* [Function to return random multiplication question and answer array from 1 to 12, given times table number]
* @param  {[number]}    tno             [Times table number, integer from 1 to 12]
* @return {[array]}                     [Question and answer array - an array of 2 items giving question and answer]
*/
function returnMultiplicationQuestion(tno) {
    // Set random number between 1 and 12
    let ttno = Math.floor((Math.random() * 12) + 1);
    // Set question string
    let ttqStr = tno.toString() + " x " + ttno.toString();
    // Set answer
    let ttAnswer = (tno * ttno);
    // Set question array
    let mq = [ttqStr, ttAnswer];
    return mq;
}

/**
* [Function to return random division question and answer array, given options and number of questions]
* @param  {[string]}    optionArray     [Array of active option button text value strings]
* @param  {[number]}    qno             [Number of questions]
* @return {[array]}                     [Question and answer array - an array of 2 item arrays giving question and answer]
*/
function returnDivisionQuestionArray(optionArray, qno) {
    // Initialise division question array
    let dqArray = [];
    let dq;
    let i;
    let dk;
    // For 2, 5 and 10 division questions
    if ((optionArray[0].substring(1, 2) == "2") && (optionArray[0].substring(5, 6) == "5") && (optionArray[0].substring(9, 11) == "10")) {
        let remq = (qno % 3);
        // Set number of 2 division questions
        let no2Q = Math.floor(qno / 3) + remq;
        // Set number of 5 division questions
        let no5Q = Math.floor(qno / 3);
        // Set number of 10 division questions
        let no10Q = Math.floor(qno / 3);
        let dq;
        // Generate random division questions and add to array
        for (i = 0; i < no2Q; i++) {
            // Generate random question
            dq = returnDivisionQuestion(2);
            // Check random question is not already in question array
            dk = 0;
            while ((dk < 11) && (checkQuestionArray(dq, dqArray))) {
                dq = returnDivisionQuestion(2);
                dk++;
            }
            // Add random question to question array
            dqArray.push(dq);
        }
        for (i = 0; i < no5Q; i++) {
            // Generate random question
            dq = returnDivisionQuestion(5);
            dk = 0;
            while ((dk < 11) && (checkQuestionArray(dq, dqArray))) {
                dq = returnDivisionQuestion(5);
                dk++;
            }
            // Add random question to question array
            dqArray.push(dq);
        }
        for (i = 0; i < no10Q; i++) {
            // Generate random question
            dq = returnDivisionQuestion(10);
            // Check random question is not already in question array
            dk = 0;
            while ((dk < 11) && (checkQuestionArray(dq, dqArray))) {
                dq = returnDivisionQuestion(10);
                dk++;
            }
            // Add random question to question array
            dqArray.push(dq);
        }
    } else if (optionArray[0] == "Mixed 1 to 12") {
        // For mixed 1 to 12
        let dno;
        // Generate random division questions and add to array
        for (i = 0; i < qno; i++) {
            dno = Math.floor((Math.random() * 12) + 1);
            // Generate random question
            dq = returnDivisionQuestion(dno);
            // Check random question is not already in question array
            dk = 0;
            while ((dk < 11) && (checkQuestionArray(dq, dqArray))) {
                dq = returnDivisionQuestion(dno);
                dk++;
            }
            // Add random question to question array
            dqArray.push(dq);
        }
    } else {
        // For specific division questions
        let ddk = 0;
        let dqstr;
        let dqstrnew;
        // Generate random division questions and add to array
        for (i = 0; i < qno; i++) {
            dqstr = (optionArray[ddk]);
            dqstrnew = dqstr.substring(1, dqstr.length);
            // Generate random question
            dq = returnDivisionQuestion(dqstrnew);
            // Check random question is not already in question array
            dk = 0;
            while ((dk < 11) && (checkQuestionArray(dq, dqArray))) {
                dq = returnDivisionQuestion(dqstrnew);
                dk++;
            }
            // Add random question to question array
            dqArray.push(dq);
            // Increment division option counter
            if (ddk < (optionArray.length - 1)) {
                ddk = (ddk + 1);
            } else {
                ddk = 0;
            }
        }
    }
    return (dqArray);
}


/**
* [Function to return random division question and answer array from 1 to 12, given division table number]
* @param  {[number]}    dno             [Division table number, integer from 1 to 12]
* @return {[array]}                     [Question and answer array - an array of 2 items giving question and answer]
*/
function returnDivisionQuestion(dno) {
    // Set random number between 1 and 12
    let dtno = Math.floor((Math.random() * 12) + 1);
    // Set division sum
    let dsum = dtno * dno;
    // Set question string
    let dqStr = dsum.toString() + " &divide " + dno.toString();
    // Set answer
    let dAnswer = (dtno);
    // Set question array
    let dq = [dqStr, dAnswer];
    return dq;
}


/**
* [Function to return random subtraction question and answer array, given options and number of questions]
* @param  {[string]}    optionArray     [Array of active option button text value strings]
* @param  {[number]}    qno             [Number of questions]
* @return {[array]}                     [Question and answer array - an array of 2 item arrays giving question and answer]
*/
function returnSubtractionQuestionArray(optionArray, qno) {
    // Initialise subtraction question array
    let sqArray = [];
    let qt;
    let sq;
    let i;
    let sk;
    // Set question type
    if (optionArray[0] == "Mixed to 10") {
        qt = 10;
    } else if (optionArray[0] == "Mixed to 20") {
        qt = 20;
    } else if (optionArray[0] == "Mixed to 50") {
        qt = 50;
    } else if (optionArray[0] == "Mixed to 100") {
        qt = 100;
    }
    // Return random subtraction questions and add to array
    for (i = 0; i < qno; i++) {
        // Generate random question
        sq = returnSubtractionQuestion(qt);
        // Check random question is not already in question array
        sk = 0;
        while ((sk < qno) && (checkQuestionArray(sq, sqArray))) {
            sq = returnSubtractionQuestion(qt);
            sk++;
        }
        // Add random question to question array
        sqArray.push(sq);

    }
    return (sqArray);
}

/**
* [Function to return random subtraction question and answer array, given maximum sum]
* @param  {[number]}    maxsum          [Maximum sum]
* @return {[array]}                     [Question and answer array - an array of 2 items giving question and answer]
*/
function returnSubtractionQuestion(maxsum) {
    // Set first random number
    let no1 = Math.floor((Math.random() * maxsum) + 1);
    // Set second random number
    let no2 = Math.floor((Math.random() * maxsum) + 1);
    // Set minimum number
    let minno = Math.min(no1, no2);
    // Set maximum number
    let maxno = Math.max(no1, no2);
    // Set question string
    let mqStr = maxno.toString() + " - " + minno.toString();
    // Set answer
    let mqAnswer = (maxno - minno);
    // Set question array
    let mq = [mqStr, mqAnswer];
    return mq;
}

/**
* [Function to return random addition question and answer array, given maximum sum]
* @param  {[number]}    maxsum          [Maximum sum]
* @return {[array]}                     [Question and answer array - an array of 2 items giving question and answer]
*/
function returnAdditionQuestion(maxsum) {
    // Set first random number
    let no1 = Math.floor((Math.random() * (maxsum / 2)) + 1);
    // Set second random number
    let no2 = Math.floor((Math.random() * (maxsum / 2)) + 1);
    // Set question string
    let aqStr = no1.toString() + " + " + no2.toString();
    // Set answer
    let aqAnswer = (no1 + no2);
    // Set question array
    let aq = [aqStr, aqAnswer];
    return aq;
}


/**
* [Function to return random addition question and answer array, given options and number of questions]
* @param  {[string]}    optionArray     [Array of active option button text value strings]
* @param  {[number]}    qno             [Number of questions]
* @return {[array]}                     [Question and answer array - an array of 2 item arrays giving question and answer]
*/
function returnAdditionQuestionArray(optionArray, qno) {
    // Initialise addition question array
    let aqArray = [];
    let qt;
    let aq;
    let i;
    let ak;
    // Set question type
    if (optionArray[0] == "Mixed to 10") {
        qt = 10;
    } else if (optionArray[0] == "Mixed to 20") {
        qt = 20;
    } else if (optionArray[0] == "Mixed to 50") {
        qt = 50;
    } else if (optionArray[0] == "Mixed to 100") {
        qt = 100;
    }
    // Return random addition questions and add to array
    for (i = 0; i < qno; i++) {
        // Generate random question
        aq = returnAdditionQuestion(qt);
        // Check random question is not already in question array
        ak = 0;
        while ((ak < qno) && (checkQuestionArray(aq, aqArray))) {
            aq = returnAdditionQuestion(qt);
            ak++;
        }
        // Add random question to question array
        aqArray.push(aq);
    }
    return (aqArray);
}






/**
* [Function to generate array of 5 wrong multiplication answers, given current question]
* @param  {[array]}     qCurrent        [Current question array, array of 2 items giving question and answer]
* @return {[array]}                     [Array of 2 item arrays, 5 wrong answers and 1 correct answer]
*/
function wrongAnswersMultiplication(qCurrent) {
    // Set question string
    let qStr = qCurrent[0];
    // Set question string array from question string
    let qStrArray = qStr.split(" ");
    // Set first integer
    let no1 = parseInt(qStrArray[0]);
    // Set second integer
    let no2 = parseInt(qStrArray[2]);
    // Set correct answer
    let cA = qCurrent[1];
    // Initialise wrong answer array
    let wrongAnswerArray = [];
    // Add wrong answers to array
    if (no1 > 1) {
        wrongAnswerArray.push((no1 - 1) * no2);
    } else {
        wrongAnswerArray.push((no1 + 2) * no2);
    }
    if (no1 > 2) {
        wrongAnswerArray.push((no1 - 2) * no2);
    } else {
        wrongAnswerArray.push((no1 + 3) * no2);
    }
    wrongAnswerArray.push((no1 + 1) * no2);
    let minInt = ((no1 - 1) * no2);
    let maxInt = ((no1 + 1) * no2);
    if (maxInt < 10) {
        minInt = 0;
        maxInt = 10;
    }
    // Complete wrong answer array
    wrongAnswerArray = wrongAnswerArrayComplete(wrongAnswerArray, cA, minInt, maxInt);
    return (wrongAnswerArray);
}

/**
* [Function to generate array of 5 wrong division answers, given current question]
* @param  {[array]}     qCurrent        [Current question array, array of 2 items giving question and answer]
* @return {[array]}                     [Array of 2 item arrays, 5 wrong answers and 1 correct answer]
*/
function wrongAnswersDivision(qCurrent) {
    // Set question string
    let qStr = qCurrent[0];
    // Set question string array from question string
    let qStrArray = qStr.split(" ");
    // Set first integer
    let no1 = parseInt(qStrArray[0]);
    // Set correct answer
    let cA = qCurrent[1];
    // Set minimum integer
    let minInt = 1;
    // Set maximum integer
    let maxInt = 12;
    // Check minimum integer
    if (no1 < 12) {
        maxInt = no1;
    }
    // Check maximum integer
    if (maxInt < 6) {
        maxInt = 6;
    }
    // Add wrong answers to array
    let wrongAnswerArray = [(cA - 1), (cA + 1), (cA + 2)];
    // Complete wrong answer array
    wrongAnswerArray = wrongAnswerArrayComplete(wrongAnswerArray, cA, minInt, maxInt);
    return (wrongAnswerArray);
}

/**
* [Function to generate array of 5 wrong addition answers, given current question]
* @param  {[array]}     qCurrent        [Current question array, array of 2 items giving question and answer]
* @return {[array]}                     [Array of 2 item arrays, 5 wrong answers and 1 correct answer]
*/
function wrongAnswersAddition(qCurrent) {
    // Set question string
    let qStr = qCurrent[0];
    // Set question string array from question string
    let qStrArray = qStr.split(" ");
    // Set first integer
    let no1 = parseInt(qStrArray[0]);
    // Set second integer
    let no2 = parseInt(qStrArray[2]);
    // Set correct answer
    let cA = qCurrent[1];
    // Add wrong answers to array
    let wrongAnswerArray = [(cA - 1), (cA + 1), (cA + 2)];
    // Set minimum integer
    let minInt = (Math.max(no1, no2)) + 1;
    // Set maximum integer
    let maxInt = (no1 + no2 + 6);
    // Complete wrong answer array
    wrongAnswerArray = wrongAnswerArrayComplete(wrongAnswerArray, cA, minInt, maxInt);
    return (wrongAnswerArray);
}

/**
* [Function to generate array of 5 wrong subtraction answers, given current question]
* @param  {[array]}     qCurrent        [Current question array, array of 2 items giving question and answer]
* @return {[array]}                     [Array of 2 item arrays, 5 wrong answers and 1 correct answer]
*/
function wrongAnswersSubtraction(qCurrent) {
    // Set question string
    let qStr = qCurrent[0];
    // Set question string array from question string
    let qStrArray = qStr.split(" ");
    // Set first integer   
    let no1 = parseInt(qStrArray[0]);
    // Set correct answer
    let cA = qCurrent[1];
    // Add wrong answers to array
    let wrongAnswerArray = [(cA - 1), (cA + 1), (cA + 2)];
    // Set maximum integer
    let maxInt = no1 - 1;
    // Set minimum integer
    let minInt = 0;
    // Check maximum integer
    if (maxInt < 6) {
        maxInt = 6;
    }
    // Complete wrong answer array
    wrongAnswerArray = wrongAnswerArrayComplete(wrongAnswerArray, cA, minInt, maxInt);
    return (wrongAnswerArray);
}



function returnAljabarQuestionArray(optionArray, qno) {
    let ajqArray = [];
    let questionType = optionArray[0];

    for (let i = 0; i < qno; i++) {
        let question, answer;
        let attempts = 0;

        do {
            attempts++;

            if (questionType == "Isi Kotak Kosong") {
                let a = Math.floor(Math.random() * 5) + 1;
                let b = Math.floor(Math.random() * 5) + a;
                question = `${a} + □ = ${b}`;
                answer = b - a;
            }

            else if (questionType == "Nilai Variabel") {
                let x = Math.floor(Math.random() * 5) + 1;
                let b = Math.floor(Math.random() * 5) + 1;
                let operator = Math.random() < 0.5 ? '+' : '-';

                if (operator === '+') {
                    question = `Jika x = ${x}, maka x + ${b} = ?`;
                    answer = x + b;
                } else {
                    question = `Jika x = ${x}, maka x - ${b} = ?`;
                    answer = x - b;
                }
            }

            else if (questionType == "Persamaan Sederhana") {
                let a = Math.floor(Math.random() * 5) + 1;
                let b = Math.floor(Math.random() * 5) + a;
                question = `x + ${a} = ${b}. Nilai x = ?`;
                answer = b - a;
            }

            else if (questionType == "Pola Bilangan") {
                let start = Math.floor(Math.random() * 3) + 1;
                let step = Math.floor(Math.random() * 3) + 1;
                let seq = `${start}, ${start + step}, ${start + 2 * step}, ${start + 3 * step}, ...`;
                question = `bilangan berikut dari pola: ${seq}`;
                answer = start + 4 * step;
            }

            // batasi jumlah percobaan biar gak infinite loop
            if (attempts > 20) break;

        } while (!question || !answer || checkQuestionArray([question, answer], ajqArray));

        ajqArray.push([question, answer]);
    }

    return ajqArray;
}

function returnTimeQuestionArray(optionArray, qno) {
    let tqArray = [];
    let questionType = optionArray[0];

    for (let i = 0; i < qno; i++) {
        let question, answer;
        let attempts = 0;

        do {
            attempts++;

            /**
             * Soal mode Waktu — versi teks penuh (tanpa visual)
             */
            if (questionType == "Baca Jam") {
                // Soal membaca jam dari format 24 jam ke format 12 jam
                let hour24 = Math.floor(Math.random() * 24); // ambil jam acak 0–23
                let hour12 = hour24 % 12 || 12; // ubah ke jam 12 (kalau 0 jadi 12)

                // tampilkan soal
                question = `Kalau sekarang jam ${hour24.toString().padStart(2, '0')}.00 siang, itu jam berapa`;

                // jawabannya angka (misal: 2)
                answer = hour12;
            }

            else if (questionType == "Tambah & Kurang Waktu") {
                // Soal penjumlahan atau pengurangan waktu
                let startHour = Math.floor(Math.random() * 12) + 1; // jam awal (1–12)
                let change = Math.floor(Math.random() * 5) + 1; // perubahan jam (1–5)
                let isAdd = Math.random() < 0.5; // acak tambah atau kurang
                let timePeriod = Math.random() < 0.5 ? "pagi" : "siang"; // acak pagi/siang
                let result;

                if (isAdd) {
                    result = (startHour + change - 1) % 12 + 1;
                    question = `Sekarang pukul ${startHour} ${timePeriod}, kalau ditambah ${change} jam jadi jam berapa?`;
                } else {
                    result = (startHour - change + 12 - 1) % 12 + 1;
                    question = `Sekarang pukul ${startHour} ${timePeriod}, kalau dikurangi ${change} jam jadi jam berapa?`;
                }

                answer = result;
            }

            else if (questionType == "Konversi Waktu") {
                // Soal konversi antara jam, menit, dan detik
                const types = ["detik-ke-menit", "menit-ke-jam", "jam-ke-menit"];
                let type = types[Math.floor(Math.random() * types.length)];

                if (type === "detik-ke-menit") {
                    let detik = 60 * (Math.floor(Math.random() * 5) + 1); // kelipatan 60
                    answer = detik / 60;
                    question = `Jika ${detik} detik, itu berapa menit?`;
                }
                else if (type === "menit-ke-jam") {
                    let menit = 60 * (Math.floor(Math.random() * 3) + 1); // 60, 120, 180
                    answer = menit / 60;
                    question = `Jika ${menit} menit, itu berapa jam?`;
                }
                else if (type === "jam-ke-menit") {
                    let jam = Math.floor(Math.random() * 4) + 1; // 1–4 jam
                    answer = jam * 60;
                    question = `Kalau ${jam} jam itu berapa menit?`;
                }

            }


            else if (questionType == "Selisih Waktu") {
                // Soal menghitung durasi waktu
                let startHour = Math.floor(Math.random() * 12) + 1;
                let duration = Math.floor(Math.random() * 5) + 1;
                let endHour = (startHour + duration) % 12 || 12;
                question = `Sebuah acara dimulai pukul ${startHour} dan berakhir pukul ${endHour}. Berapa jam acara berlangsung?`;
                answer = duration;
            }


            if (attempts > 20) break;

        } while (!question || !answer || checkQuestionArray([question, answer], tqArray));
        tqArray.push([question, answer]);
    }

    return tqArray;
}

function returnHeavyQuestionArray(optionArray, qno) {
    let hqArray = [];
    let questionType = optionArray[0];

    for (let i = 0; i < qno; i++) {
        let question, answer;
        let attempts = 0;

        do {
            attempts++;

            if (questionType == "Konversi Berat") {
                const types = [
                    { soal: "gram-ke-kg", question: (x) => `${x} gram = ... kilogram`, answer: (x) => x / 1000 },
                    { soal: "ons-ke-gram", question: (x) => `${x} ons = ... gram`, answer: (x) => x * 100 },
                    { soal: "ons-ke-kg", question: (x) => `${x} ons = ... kilogram`, answer: (x) => x / 10 },
                    { soal: "kg-ke-gram", question: (x) => `${x} kilogram = ... gram`, answer: (x) => x * 1000 }
                ];

                // Pilih jenis soal secara acak
                const randomType = types[Math.floor(Math.random() * types.length)];

                // Angka acak kecil biar jawaban gak ribuan
                const value = Math.floor(Math.random() * 9) + 1; // 1–9

                // Buat soal dan jawaban
                question = randomType.question(value);
                answer = randomType.answer(value);
            }


            else if (questionType == "Tambah & Kurang Berat") {
                let base = Math.floor(Math.random() * 9) + 1;  // 1–9
                let change = Math.floor(Math.random() * 5) + 1; // 1–5
                let isAdd = Math.random() < 0.5;

                let result = isAdd ? base + change : base - change;
                if (result < 0) result = Math.abs(result); // jaga jangan negatif

                if (isAdd) {
                    question = `Berat benda ${base} kg, lalu ditambah ${change} kg. Jadi beratnya ... kg.`;
                } else {
                    question = `Berat benda ${base} kg, lalu dikurangi ${change} kg. Sekarang beratnya ... kg.`;
                }
                answer = result;
            }

            else if (questionType == "Bandingkan Berat") {
                let left = Math.floor(Math.random() * 9) + 1;
                let right = Math.floor(Math.random() * 9) + 1;
                let leftGram = left * 100; // ons → gram
                let rightGram = right * 100;

                if (leftGram > rightGram) {
                    question = `Mana yang lebih berat, ${left} ons atau ${right} ons?`;
                    answer = left;
                } else if (leftGram < rightGram) {
                    question = `Mana yang lebih berat, ${left} ons atau ${right} ons?`;
                    answer = right;
                } else {
                    question = `${left} ons dan ${right} ons memiliki berat yang sama.`;
                    answer = left;
                }
            }

            else if (questionType == "Selisih Berat") {
                // pilih satuan secara acak (kg, ons, gram)
                const units = ["kg", "ons", "gram"];
                const unit = units[Math.floor(Math.random() * units.length)];

                // buat dua berat acak kecil (biar tidak ribuan)
                let a = Math.floor(Math.random() * 9) + 1; // 1–9
                let b = Math.floor(Math.random() * 9) + 1; // 1–9

                // pastikan selisihnya tidak negatif
                let diff = Math.abs(a - b);

                // buat soal yang jelas dan mudah
                question = `Berat benda A ${a} ${unit} dan benda B ${b} ${unit}. Selisih berat keduanya ... ${unit}.`;
                answer = diff;
            }
            if (attempts > 20) break;

        } while (!question || !answer || checkQuestionArray([question, answer], hqArray));
        hqArray.push([question, answer]);
    }

    return hqArray;
}

function returnVolumeQuestionArray(optionArray, qno) {
    let vqArray = [];
    let questionType = optionArray[0];

    for (let i = 0; i < qno; i++) {
        let question, answer;
        let attempts = 0;

        do {
            attempts++;

            // Soal konversi volume
            if (questionType == "Konversi Volume") {
                const types = [
                    { text: (x) => `${x} liter = ... mililiter`, calc: (x) => x * 1000 },
                    { text: (x) => `${x * 1000} mililiter = ... liter`, calc: (x) => x },
                    { text: (x) => `${x * 500} mililiter = ... liter`, calc: (x) => (x * 500) / 1000 }
                ];
                const chosen = types[Math.floor(Math.random() * types.length)];
                const num = Math.floor(Math.random() * 5) + 1; // 1–5 liter
                question = chosen.text(num);
                answer = chosen.calc(num);

                // ===== 2. Tambah Volume =====
            } else if (questionType == "Tambah & Kurang Volume") {
                let a = Math.floor(Math.random() * 5) + 1; // 1–5
                let b = Math.floor(Math.random() * 5) + 1; // 1–5
                question = `Di ember ada ${a} liter air, lalu ditambah ${b} liter lagi. Sekarang airnya jadi ... liter.`;
                answer = a + b;

                // ===== 3. Selisih Volume =====
            } else if (questionType == "Selisih Volume") {
                let a = Math.floor(Math.random() * 8) + 2; // 2–9
                let b = Math.floor(Math.random() * a);     // lebih kecil dari a
                question = `Ember A berisi ${a} liter air dan ember B berisi ${b} liter air. Selisih airnya adalah ... liter.`;
                answer = a - b;

                // ===== 4. Perkiraan Volume =====
            } else if (questionType == "Bandingkan Volume") {
                const types = [
                    { q: `Sebuah gelas berisi setengah air dari 1 liter botol. Kira-kira berapa mililiter air di gelas itu?`, a: 500 },
                    { q: `Sebuah ember bisa menampung 10 liter air. Kalau diisi separuhnya, isinya ... liter.`, a: 5 },
                    { q: `Setengah dari 2 liter air adalah ... liter.`, a: 1 },
                    { q: `1/4 dari 1 liter air adalah ... mililiter.`, a: 250 }
                ];
                const chosen = types[Math.floor(Math.random() * types.length)];
                question = chosen.q;
                answer = chosen.a;
            }
            if (attempts > 20) break;

        } while (!question || !answer || checkQuestionArray([question, answer], vqArray));
        vqArray.push([question, answer]);
    }

    return vqArray;
}

function returnUpQuestionArray(optionArray, qno) {
    let uqArray = [];
    let questionType = optionArray[0];

    for (let i = 0; i < qno; i++) {
        let question, answer;
        let attempts = 0;

        do {
            attempts++;

            // ===== 1️⃣ Keliling Bangun Datar =====
            if (questionType == "Keliling Bangun Datar") {
                const shapes = [
                    { q: (s) => `Persegi dengan sisi ${s} cm, berapa kelilingnya?`, a: (s) => 4 * s },
                    { q: (p, l) => `Persegi panjang ${p} cm × ${l} cm, berapa kelilingnya?`, a: (p, l) => 2 * (p + l) }
                ];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                let s = Math.floor(Math.random() * 10) + 2;
                let p = Math.floor(Math.random() * 10) + 3;
                let l = Math.floor(Math.random() * 10) + 2;
                question = shape.q.length === 1 ? shape.q(s) : shape.q(p, l);
                answer = shape.q.length === 1 ? shape.a(s) : shape.a(p, l);
            }

            // ===== 2️⃣ Volume Bangun Ruang =====
            else if (questionType == "Volume Bangun Ruang") {
                const types = [
                    { q: (s) => `Kubus dengan sisi ${s} cm, berapa volumenya?`, a: (s) => s ** 3 },
                    { q: (p, l, t) => `Balok ${p}×${l}×${t} cm, berapa volumenya?`, a: (p, l, t) => p * l * t }
                ];
                const type = types[Math.floor(Math.random() * types.length)];
                let p = Math.floor(Math.random() * 10) + 2;
                let l = Math.floor(Math.random() * 10) + 2;
                let t = Math.floor(Math.random() * 10) + 2;
                let s = Math.floor(Math.random() * 10) + 2;
                question = type.q.length === 1 ? type.q(s) : type.q(p, l, t);
                answer = type.q.length === 1 ? type.a(s) : type.a(p, l, t);
            }

            // ===== 3️⃣ Luas Permukaan Bangun Ruang =====
            else if (questionType == "Luas Permukaan Bangun Ruang") {
                const types = [
                    { q: (s) => `Kubus sisi ${s} cm, berapa luas permukaannya?`, a: (s) => 6 * s * s },
                    { q: (p, l, t) => `Balok ${p}×${l}×${t} cm, berapa luas permukaannya?`, a: (p, l, t) => 2 * (p * l + p * t + l * t) }
                ];
                const type = types[Math.floor(Math.random() * types.length)];
                let s = Math.floor(Math.random() * 10) + 2;
                let p = Math.floor(Math.random() * 10) + 2;
                let l = Math.floor(Math.random() * 10) + 2;
                let t = Math.floor(Math.random() * 10) + 2;
                question = type.q.length === 1 ? type.q(s) : type.q(p, l, t);
                answer = type.q.length === 1 ? type.a(s) : type.a(p, l, t);
            }

            // ===== 4️⃣ Perbandingan Bangun =====
            else if (questionType == "Perbandingan Bangun") {
                let luas1 = Math.floor(Math.random() * 50) + 10;
                let luas2 = luas1 * 2;
                question = `Luas bangun A ${luas1} cm² dan bangun B ${luas2} cm². Berapa kali lebih besar bangun B dibanding A?`;
                answer = luas2 / luas1;
            }

            // ===== 5️⃣ Perkiraan Volume =====
            else if (questionType == "Perkiraan Volume") {
                const data = [
                    { q: `Botol 1 liter berisi setengah air. Kira-kira airnya ... ml.`, a: 500 },
                    { q: `Ember 10 liter berisi 1/4 air. Kira-kira airnya ... liter.`, a: 2.5 },
                    { q: `Separuh dari 6 liter air adalah ... liter.`, a: 3 }
                ];
                const pick = data[Math.floor(Math.random() * data.length)];
                question = pick.q;
                answer = pick.a;
            }

            // ===== 6️⃣ Bangun Campuran =====
            else if (questionType == "Bangun Campuran") {
                let luasPersegi = Math.floor(Math.random() * 50) + 10;
                let luasSegitiga = Math.floor(Math.random() * 30) + 10;
                question = `Sebuah taman terdiri dari persegi (${luasPersegi} cm²) dan segitiga (${luasSegitiga} cm²). Berapa total luas taman?`;
                answer = luasPersegi + luasSegitiga;
            }

            // ===== 7️⃣ Hubungan Luas dan Volume =====
            else if (questionType == "Hubungan Luas dan Volume") {
                let sisi = Math.floor(Math.random() * 8) + 2;
                let luasPermukaan = 6 * sisi * sisi;
                question = `Kubus memiliki luas permukaan ${luasPermukaan} cm². Berapa panjang sisinya?`;
                answer = sisi;
            }

            // ===== 8️⃣ Keliling Bangun Datar (ulang beda bentuk) =====
            else if (questionType == "Keliling Bangun Datar 2") {
                let jari = Math.floor(Math.random() * 10) + 2;
                question = `Lingkaran dengan jari-jari ${jari} cm. Kelilingnya (gunakan π=3,14) adalah ... cm.`;
                answer = parseFloat((2 * 3.14 * jari).toFixed(2));
            }

            if (attempts > 20) break;

        } while (!question || !answer || checkQuestionArray([question, answer], uqArray));

        uqArray.push([question, answer]);
    }

    return uqArray;
}

function returnOperatorQuestionArray(optionArray, qno) {
    let opqArray = [];
    let questionType = optionArray[0];

    for (let i = 0; i < qno; i++) {
        let question, answer;
        let attempts = 0;

        do {
            attempts++;

            if (questionType == "Kurang") {
                let a = Math.floor(Math.random() * 20) + 1;
                let b = Math.floor(Math.random() * 20) + 1;
                let max = Math.max(a, b);
                let min = Math.min(a, b);
                question = `${max} - ${min} = ?`;
                answer = max - min;
            } else if (questionType == "Tambah") {
                let a = Math.floor(Math.random() * 20) + 1;
                let b = Math.floor(Math.random() * 20) + 1;
                question = `${a} + ${b} = ?`;
                answer = a + b;
            } else if (questionType == "Bagi") {
                let b = Math.floor(Math.random() * 12) + 1;
                let ans = Math.floor(Math.random() * 12) + 1;
                let a = b * ans;
                question = `${a} ÷ ${b} = ?`;
                answer = ans;
            } else if (questionType == "Kali") {
                let a = Math.floor(Math.random() * 12) + 1;
                let b = Math.floor(Math.random() * 12) + 1;
                question = `${a} × ${b} = ?`;
                answer = a * b;
            }

            if (attempts > 20) break;

        } while (!question || !answer || checkQuestionArray([question, answer], opqArray));
        opqArray.push([question, answer]);
    }

    return opqArray;
}


/**
* [Function to check if a new question is already contained in the question array]
* @param  {[array]}     nq              [New question, 2 item array of question and answer]
* @return {[array]}     qArray          [Question array, array of 2 item arrays to check]
*/
function checkQuestionArray(nq, qArray) {
                let i = 0;
                let qCheck = false;
                while ((qCheck == false) && (i < qArray.length)) {
                    if (qArray[i][0] == nq[0]) {
                        qCheck = true;
                    }
                    i++;
                }
                return (qCheck);
            }

/**
* [Function to generate array of 5 wrong answers and the correct answer, given game mode and current question]
* @param  {[string]}    gameMode        [Game mode]
* @param  {[array]}     qCurrent        [Current question array, array of 2 items giving question and answer]
* @return {[array]}                     [Array of 2 item arrays, 5 wrong answers and 1 correct answer]
*/
function answerArray(gameMode, qCurrent) {
            // Initialise answer array
            let answerArray = [];
            // Check game mode, run relevant wrong answer function to add wrong answers to answer array
            if (gameMode == 'aljabar') {
                answerArray = wrongAnswerAljabarQuestion(qCurrent);
            } else if (gameMode == 'time') {
                answerArray = wrongAnswerTimeQuestion(qCurrent);
            } else if (gameMode == 'heavy') {
                answerArray = wrongAnswerHeavyQuestion(qCurrent);
            } else if (gameMode == 'volume') {
                answerArray = wrongAnswerVolumeQuestion(qCurrent);
            } else if (gameMode == 'up') {
                answerArray = wrongAnswerUpQuestion(qCurrent);
            } else if (gameMode == 'operator') {
                answerArray = wrongAnswerOperatorQuestion(qCurrent);
            }
            // Add correct answer to answer array
            answerArray.push(qCurrent[1]);
            // Shuffle answer array to randomise order
            answerArray = shuffleArray(answerArray);
            return (answerArray);
        }


        /**
         * [Function to generate array of 5 wrong answers for algebra questions]
         * @param  {[array]} qCurrent [Current question array: [question, correctAnswer]]
         * @return {[array]}          [Array of 5 wrong answers]
         */
        function wrongAnswerAljabarQuestion(qCurrent) {
            let question = qCurrent[0];
            let cA = qCurrent[1];
            let wrongAnswerArray = [];

            // 1️⃣ Isi Kotak Kosong → biasanya bentuknya a + □ = b
            if (question.includes("□")) {
                // Jawaban salah dibuat dari selisih mirip, tapi bukan tepat b - a
                wrongAnswerArray = [cA + 1, cA - 1, cA + 2, cA - 2];
            }

            // 2️⃣ Nilai Variabel → "Jika x = ..., maka x + b = ?" atau "x - b = ?"
            else if (question.includes("Jika x =")) {
                // Jawaban salah dibuat di sekitar hasil operasi x ± b
                wrongAnswerArray = [cA + 1, cA - 1, cA + 2, cA - 2];
            }

            // 3️⃣ Persamaan Sederhana → "x + a = b. Nilai x = ?"
            else if (question.includes("Nilai x")) {
                // Biasanya bentuk a dan b kecil, jadi pakai ±1 sampai ±3
                wrongAnswerArray = [cA + 1, cA - 1, cA + 2, cA - 2, cA + 3];
            }

            // 4️⃣ Pola Bilangan → "Tentukan bilangan berikutnya dari pola: ..."
            else if (question.includes("pola") || question.includes("berikutnya")) {
                // Jawaban salah dibuat dengan beda langkah dari step aslinya
                wrongAnswerArray = [cA + 1, cA - 1, cA + 2, cA - 2, cA + 3];
            }

            // 🔄 Tambahan keamanan – isi sampai 5 kalau belum cukup
            while (wrongAnswerArray.length < 5) {
                let randOffset = Math.floor(Math.random() * 5) + 1;
                let wrong = Math.random() < 0.5 ? cA + randOffset : cA - randOffset;
                if (!wrongAnswerArray.includes(wrong) && wrong !== cA) {
                    wrongAnswerArray.push(wrong);
                }
            }

            // Pastikan jumlah tetap 5
            return wrongAnswerArray.slice(0, 5);
        }

        function wrongAnswerTimeQuestion(qCurrent) {
            let cA = qCurrent[1]; // jawaban benar (integer)
            let wrongAnswerArray = [];

            // Tambahkan jawaban salah ±1 atau ±2 dari jawaban benar
            let offsets = [1, 2, -1, -2];
            offsets.forEach(offset => {
                let wrong = cA + offset;
                if (wrong < 1) wrong += 12;
                if (wrong > 12) wrong -= 12;
                wrongAnswerArray.push(wrong);
            });

            // Tambahkan satu angka acak lain jika kurang dari 5
            while (wrongAnswerArray.length < 5) {
                let rand = Math.floor(Math.random() * 12) + 1;
                if (!wrongAnswerArray.includes(rand) && rand !== cA) {
                    wrongAnswerArray.push(rand);
                }
            }

            // Acak urutan jawaban salah
            wrongAnswerArray = wrongAnswerArray.sort(() => Math.random() - 0.5);

            // Pastikan jumlah tetap 5
            return wrongAnswerArray.slice(0, 5);
        }

        function wrongAnswerHeavyQuestion(qCurrent) {
            let cA = qCurrent[1]; // jawaban benar (integer)
            let wrongAnswerArray = [];

            // Tambahkan jawaban salah ±1 atau ±2 dari jawaban benar
            let offsets = [1, 2, -1, -2];
            offsets.forEach(offset => {
                let wrong = cA + offset;
                if (wrong < 0) wrong = 0;
                wrongAnswerArray.push(wrong);
            });

            // Tambahkan satu angka acak lain jika kurang dari 5
            while (wrongAnswerArray.length < 5) {
                let rand = Math.floor(Math.random() * 20); // misal sampai 20 kg
                if (!wrongAnswerArray.includes(rand) && rand !== cA) {
                    wrongAnswerArray.push(rand);
                }
            }

            // Acak urutan jawaban salah
            wrongAnswerArray = wrongAnswerArray.sort(() => Math.random() - 0.5);

            // Pastikan jumlah tetap 5
            return wrongAnswerArray.slice(0, 5);
        }

        function wrongAnswerVolumeQuestion(qCurrent) {
            let cA = qCurrent[1]; // jawaban benar (integer)
            let wrongAnswerArray = [];

            // Tambahkan jawaban salah ±1 atau ±2 dari jawaban benar
            let offsets = [1, 2, -1, -2];
            offsets.forEach(offset => {
                let wrong = cA + offset;
                if (wrong < 0) wrong = 0;
                wrongAnswerArray.push(wrong);
            });

            // Tambahkan satu angka acak lain jika kurang dari 5
            while (wrongAnswerArray.length < 5) {
                let rand = Math.floor(Math.random() * 20); // misal sampai 20 liter
                if (!wrongAnswerArray.includes(rand) && rand !== cA) {
                    wrongAnswerArray.push(rand);
                }
            }

            // Acak urutan jawaban salah
            wrongAnswerArray = wrongAnswerArray.sort(() => Math.random() - 0.5);

            // Pastikan jumlah tetap 5
            return wrongAnswerArray.slice(0, 5);
        }

        function wrongAnswerUpQuestion(qCurrent) {
            let cA = qCurrent[1]; // jawaban benar (integer)
            let wrongAnswerArray = [];

            // Tambahkan jawaban salah ±1 atau ±2 dari jawaban benar
            let offsets = [1, 2, -1, -2];
            offsets.forEach(offset => {
                let wrong = cA + offset;
                if (wrong < 0) wrong = 0;
                wrongAnswerArray.push(wrong);
            });

            // Tambahkan satu angka acak lain jika kurang dari 5
            while (wrongAnswerArray.length < 5) {
                let rand = Math.floor(Math.random() * 50); // misal sampai 50
                if (!wrongAnswerArray.includes(rand) && rand !== cA) {
                    wrongAnswerArray.push(rand);
                }
            }

            // Acak urutan jawaban salah
            wrongAnswerArray = wrongAnswerArray.sort(() => Math.random() - 0.5);

            // Pastikan jumlah tetap 5
            return wrongAnswerArray.slice(0, 5);
        }

        function wrongAnswerOperatorQuestion(qCurrent) {
            let cA = qCurrent[1]; // jawaban benar (integer)
            let wrongAnswerArray = [];

            // Tambahkan jawaban salah ±1 atau ±2 dari jawaban benar
            let offsets = [1, 2, -1, -2];
            offsets.forEach(offset => {
                let wrong = cA + offset;
                wrongAnswerArray.push(wrong);
            });

            // Tambahkan satu angka acak lain jika kurang dari 5
            while (wrongAnswerArray.length < 5) {
                let rand = Math.floor(Math.random() * 50); // misal sampai 50
                if (!wrongAnswerArray.includes(rand) && rand !== cA) {
                    wrongAnswerArray.push(rand);
                }
            }

            // Acak urutan jawaban salah
            wrongAnswerArray = wrongAnswerArray.sort(() => Math.random() - 0.5);

            // Pastikan jumlah tetap 5
            return wrongAnswerArray.slice(0, 5);
        }

        /**
        * [Function to populate wrong answer array with two randomly generated integers between the two integers given. 
          Generates random integers until a random integer not already in the array and not equal to the correct answer is found.
          Returns completed wrong answer array]
        * @param  {[array]}     wrongAnswerArray    [Array of 2 item arrays]
        * @param  {[number]}    cA                  [Correct answer]
        * @param  {[number]}    minInt              [Minimum integer]
        * @param  {[number]}    maxInt              [Maximum integer]
        * @return {[array]}                         [Array of 2 item arrays]
        */
        function wrongAnswerArrayComplete(wrongAnswerArray, cA, minInt, maxInt) {
            if ((maxInt - minInt) < 6) {
                maxInt = minInt + 6;
            }
            // Get random integer between 2 integers given
            let randomInt;
            randomInt = getRandomIntInclusive(minInt, maxInt);
            // Check if random integer is in wrong answer array, generate another random integer if it is
            while ((wrongAnswerArray.includes(randomInt)) || (randomInt == cA)) {
                randomInt = getRandomIntInclusive(minInt, maxInt);
            }
            // Add random integer to wrong answer array
            wrongAnswerArray.push(randomInt);
            // Get random integer between 2 integers given
            randomInt = getRandomIntInclusive(minInt, maxInt);
            // Check if random integer is in wrong answer array, generate another random integer if it is
            while ((wrongAnswerArray.includes(randomInt)) || (randomInt == cA)) {
                randomInt = getRandomIntInclusive(minInt, maxInt);
            }
            // Add random integer to wrong answer array
            wrongAnswerArray.push(randomInt);
            return (wrongAnswerArray);
        }

        /**
        * [Function to generate a random integer between the two integers given. 
          Function referenced from MDN Web Docs link below:
          https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random]
        * @param  {[number]}    min             [Minimum integer]
        * @param  {[number]}    max             [Maximum integer]
        * @return {[number]}                    [Integer]
        */
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            // The maximum is inclusive and the minimum is inclusive
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        /**
        * [Function to randomize an array in place using the Durstenfeld shuffle algorithm. 
          Function referenced from stack overflow link below, many thanks to Laurens Holst:
          https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array]
        * @param  {[array]}     arrayToShuffle  [Array to shuffle]
        * @return {[array]}                     [Shuffled array]
        */
        function shuffleArray(arrayToShuffle) {
            let j;
            for (let i = arrayToShuffle.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                [arrayToShuffle[i], arrayToShuffle[j]] = [arrayToShuffle[j], arrayToShuffle[i]];
            }
            return (arrayToShuffle);
        }
