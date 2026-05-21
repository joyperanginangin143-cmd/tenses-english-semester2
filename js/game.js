/* ============================================================
   game.js — Logika semua games di halaman Games
   
   File ini berisi 3 games:
   1. Kuis Pilihan Ganda (Quiz)
   2. Isi Kalimat Rumpang (Fill in the Blank)
   3. Tebak Rumus (Match)

   Cara kerja secara umum:
   - Kita simpan semua soal di dalam array (daftar) bernama
     quizQuestions, fillQuestions, dan matchData.
   - Saat game berjalan, kita ambil soal satu per satu dari
     array tersebut dan tampilkan ke layar.
   - Jawaban pengguna kita bandingkan dengan jawaban yang benar.
   ============================================================ */

/* ============================================================
   BANK SOAL — Data semua pertanyaan disimpan di sini
   ============================================================ */

/* --- BANK SOAL KUIS PILIHAN GANDA ---
   Setiap soal adalah object (objek) dengan properti:
   - question : teks pertanyaan
   - options  : array 4 pilihan jawaban
   - answer   : indeks jawaban benar (0=A, 1=B, 2=C, 3=D)
   - category : nama tenses
   - explanation: penjelasan mengapa jawaban itu benar */
const quizQuestions = [
  {
    question: "She ___ to school every day.",
    options: ["go", "goes", "went", "will go"],
    answer: 1,
    category: "Simple Present",
    explanation: "Pakai 'goes' karena subjeknya She (he/she/it) → tambahkan -s/-es pada kata kerja."
  },
  {
    question: "I ___ a book right now. Please don't disturb me.",
    options: ["read", "reads", "am reading", "was reading"],
    answer: 2,
    category: "Present Continuous",
    explanation: "'Right now' adalah penanda Present Continuous. Rumusnya: S + am/is/are + V-ing."
  },
  {
    question: "They ___ already ___ their homework.",
    options: ["have / finished", "has / finished", "had / finished", "will / finish"],
    answer: 0,
    category: "Present Perfect",
    explanation: "'Already' menandakan Present Perfect. They → pakai 'have'. Rumus: S + have/has + V3."
  },
  {
    question: "She ___ when I called her last night.",
    options: ["sleeps", "is sleeping", "was sleeping", "slept"],
    answer: 2,
    category: "Past Continuous",
    explanation: "'When I called' menunjukkan satu kejadian menginterupsi kejadian lain yang sedang berlangsung → Past Continuous: was sleeping."
  },
  {
    question: "He ___ the exam before I arrived at school.",
    options: ["finished", "has finished", "had finished", "will finish"],
    answer: 2,
    category: "Past Perfect",
    explanation: "'Before I arrived' → ada dua kejadian di masa lalu. Yang lebih dulu pakai Past Perfect: had finished."
  },
  {
    question: "I ___ to Japan next summer.",
    options: ["go", "went", "have gone", "will go"],
    answer: 3,
    category: "Simple Future",
    explanation: "'Next summer' adalah penanda masa depan → Simple Future: will + V1."
  },
  {
    question: "By 8 PM tonight, she ___ for 3 hours.",
    options: ["studies", "will study", "will have been studying", "had studied"],
    answer: 2,
    category: "Future Perfect Continuous",
    explanation: "'By 8 PM' + durasi waktu menunjukkan Future Perfect Continuous: will + have + been + V-ing."
  },
  {
    question: "They ___ football when it started to rain.",
    options: ["play", "played", "were playing", "have played"],
    answer: 2,
    category: "Past Continuous",
    explanation: "'When it started to rain' menginterupsi aktivitas yang sedang berlangsung → Past Continuous: were playing."
  },
  {
    question: "I ___ English for 2 years, and I still continue now.",
    options: ["learn", "learned", "have learned", "have been learning"],
    answer: 3,
    category: "Present Perfect Continuous",
    explanation: "Aktivitas dimulai di masa lalu dan masih berlanjut sekarang → Present Perfect Continuous: have been learning."
  },
  {
    question: "If I had studied harder, I ___ the exam.",
    options: ["pass", "would pass", "would have passed", "had passed"],
    answer: 2,
    category: "Past Future Perfect",
    explanation: "Conditional Type 3 (pengandaian di masa lalu): If + had + V3, ... would + have + V3."
  },
  {
    question: "She said she ___ us the next day.",
    options: ["will visit", "visits", "would visit", "is visiting"],
    answer: 2,
    category: "Past Future",
    explanation: "Indirect speech (kalimat tidak langsung) dari past → 'will' berubah menjadi 'would'."
  },
  {
    question: "By the time you arrive, I ___ dinner.",
    options: ["cook", "will cook", "will have cooked", "have cooked"],
    answer: 2,
    category: "Future Perfect",
    explanation: "'By the time' adalah penanda Future Perfect: will + have + V3."
  }
];

/* --- BANK SOAL ISI KALIMAT RUMPANG ---
   Setiap soal punya:
   - sentence  : kalimat dengan "___" sebagai tempat kosong
   - answer    : jawaban yang benar (bisa array jika ada alternatif)
   - hint      : petunjuk untuk pengguna
   - category  : nama tenses */
const fillQuestions = [
  {
    sentence: "Every morning, my mother ___ (cook) breakfast for us.",
    answer: ["cooks"],
    hint: "Simple Present → tambahkan -s/-es untuk He/She/It",
    category: "Simple Present"
  },
  {
    sentence: "Look! The children ___ (play) in the garden right now.",
    answer: ["are playing"],
    hint: "Present Continuous → am/is/are + V-ing",
    category: "Present Continuous"
  },
  {
    sentence: "I ___ (visit) Bali twice in my life.",
    answer: ["have visited"],
    hint: "Present Perfect → have/has + V3",
    category: "Present Perfect"
  },
  {
    sentence: "She ___ (study) for the exam when I called her.",
    answer: ["was studying"],
    hint: "Past Continuous → was/were + V-ing",
    category: "Past Continuous"
  },
  {
    sentence: "When I arrived, they ___ (already eat) all the food.",
    answer: ["had already eaten"],
    hint: "Past Perfect → had + V3",
    category: "Past Perfect"
  },
  {
    sentence: "Tomorrow, we ___ (travel) to Medan.",
    answer: ["will travel"],
    hint: "Simple Future → will + V1",
    category: "Simple Future"
  },
  {
    sentence: "I ___ (learn) English since I was in elementary school.",
    answer: ["have been learning"],
    hint: "Present Perfect Continuous → have/has + been + V-ing",
    category: "Present Perfect Continuous"
  },
  {
    sentence: "At this time tomorrow, they ___ (fly) to Jakarta.",
    answer: ["will be flying"],
    hint: "Future Continuous → will + be + V-ing",
    category: "Future Continuous"
  },
  {
    sentence: "By 2030, she ___ (teach) at this school for 10 years.",
    answer: ["will have been teaching"],
    hint: "Future Perfect Continuous → will + have + been + V-ing",
    category: "Future Perfect Continuous"
  },
  {
    sentence: "He said he ___ (come) to the meeting.",
    answer: ["would come"],
    hint: "Past Future → would + V1",
    category: "Past Future"
  }
];

/* --- DATA GAME TEBAK RUMUS ---
   Daftar pasangan tenses dengan rumusnya */
const matchData = [
  { tense: "Simple Present", formula: "S + V1/V(s/es)" },
  { tense: "Present Continuous", formula: "S + am/is/are + V-ing" },
  { tense: "Simple Past", formula: "S + V2" },
  { tense: "Past Continuous", formula: "S + was/were + V-ing" },
  { tense: "Present Perfect", formula: "S + have/has + V3" },
  { tense: "Past Perfect", formula: "S + had + V3" },
  { tense: "Simple Future", formula: "S + will + V1" },
  { tense: "Future Continuous", formula: "S + will + be + V-ing" },
  { tense: "Past Future", formula: "S + would + V1" },
  { tense: "Future Perfect", formula: "S + will + have + V3" },
];

/* ============================================================
   VARIABEL STATE (kondisi saat ini dari game)
   ============================================================ */

/* State bersama (dipakai oleh semua game) */
let totalScore  = 0;  // Total skor keseluruhan
let correctCount = 0; // Total jawaban benar
let wrongCount   = 0; // Total jawaban salah
let streak       = 0; // Streak (jawaban benar berturut-turut)

/* State khusus Kuis */
let quizCurrentIndex = 0; // Indeks soal kuis yang sedang ditampilkan
let quizShuffled     = []; // Soal yang sudah diacak
let quizAnswered     = false; // Apakah soal sudah dijawab?
let quizTimer        = null; // Referensi ke interval timer
let quizTimeLeft     = 15;   // Sisa waktu dalam detik

/* State khusus Fill in the Blank */
let fillCurrentIndex = 0;
let fillShuffled     = [];
let fillAnswered     = false;

/* State khusus Match */
let matchSelected    = null; // Kartu yang sedang dipilih
let matchScore       = 0;    // Skor khusus game match
let matchTenseEl     = null; // Elemen DOM yang dipilih

/* ============================================================
   FUNGSI UTILITAS (Pembantu)
   ============================================================ */

/* Acak urutan array menggunakan algoritma Fisher-Yates.
   Kenapa harus diacak? Agar soal tidak selalu muncul dalam
   urutan yang sama, sehingga permainan lebih menantang. */
function shuffle(arr) {
  const a = [...arr]; // Buat salinan agar array asli tidak berubah
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]; // Tukar posisi elemen
  }
  return a;
}

/* Ambil elemen HTML dari DOM (shortcut agar tidak ketik panjang-panjang) */
function el(id) {
  return document.getElementById(id);
}

/* Update tampilan skor di bagian atas halaman */
function updateScoreDisplay() {
  el('total-score').textContent = totalScore;
  el('correct-count').textContent = correctCount;
  el('wrong-count').textContent = wrongCount;
  el('streak-count').textContent = streak;

  /* Efek animasi "bounce" saat skor berubah */
  el('total-score').style.transform = 'scale(1.3)';
  setTimeout(() => { el('total-score').style.transform = 'scale(1)'; }, 200);
}

/* ============================================================
   FUNGSI TAB (pindah antar mode game)
   ============================================================ */
function switchTab(tabName) {
  /* Sembunyikan semua panel game */
  document.querySelectorAll('.game-panel').forEach(p => p.classList.remove('active'));
  /* Hapus kelas active dari semua tombol tab */
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  /* Tampilkan panel yang dipilih */
  el('game-' + tabName).classList.add('active');

  /* Tandai tombol tab yang dipilih sebagai active */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabIndex = { quiz: 0, fillblank: 1, match: 2 };
  tabButtons[tabIndex[tabName]].classList.add('active');
}

/* ============================================================
   GAME 1: KUIS PILIHAN GANDA
   ============================================================ */

/* Fungsi ini dijalankan saat halaman pertama kali dibuka */
function initQuiz() {
  /* Acak soal dan ambil maksimal 10 soal */
  quizShuffled = shuffle(quizQuestions).slice(0, 10);
  quizCurrentIndex = 0;
  showQuizQuestion();
}

/* Tampilkan soal kuis ke layar */
function showQuizQuestion() {
  /* Kalau soal sudah habis, tampilkan hasil */
  if (quizCurrentIndex >= quizShuffled.length) {
    showResult();
    return;
  }

  /* Ambil soal saat ini dari array */
  const q = quizShuffled[quizCurrentIndex];

  /* Update progress bar dan teks progress */
  const progress = ((quizCurrentIndex + 1) / quizShuffled.length) * 100;
  el('quiz-progress-bar').style.width = progress + '%';
  el('quiz-progress-text').textContent = `Soal ${quizCurrentIndex + 1} dari ${quizShuffled.length}`;
  el('quiz-category').textContent = q.category;
  el('quiz-question').textContent = q.question;

  /* Sembunyikan feedback dan tombol next dari soal sebelumnya */
  el('quiz-feedback').style.display = 'none';
  el('quiz-next-btn').style.display = 'none';

  /* Acak urutan pilihan jawaban agar tidak selalu A yang benar */
  /* Kita simpan jawaban benar sebelum diacak */
  const correctText = q.options[q.answer];
  const shuffledOptions = shuffle(q.options);

  /* Buat tombol untuk setiap pilihan jawaban */
  const optionsContainer = el('quiz-options');
  optionsContainer.innerHTML = ''; // Hapus pilihan soal sebelumnya
  const labels = ['A', 'B', 'C', 'D'];

  shuffledOptions.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-label">${labels[idx]}</span> ${opt}`;

    /* Saat tombol diklik, panggil fungsi checkAnswer */
    btn.onclick = () => checkAnswer(btn, opt, correctText, q.explanation);
    optionsContainer.appendChild(btn);
  });

  /* Reset dan jalankan timer */
  quizAnswered = false;
  startTimer();
}

/* Fungsi timer countdown untuk kuis */
function startTimer() {
  /* Hentikan timer sebelumnya (jika ada) */
  if (quizTimer) clearInterval(quizTimer);
  quizTimeLeft = 15;
  updateTimerDisplay();

  quizTimer = setInterval(() => {
    quizTimeLeft--;
    updateTimerDisplay();

    /* Warna merah saat tersisa 5 detik */
    if (quizTimeLeft <= 5) {
      el('quiz-timer').classList.add('danger');
    }

    /* Waktu habis: tandai semua jawaban dan lanjut */
    if (quizTimeLeft <= 0) {
      clearInterval(quizTimer);
      if (!quizAnswered) {
        timeOut();
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  el('quiz-timer').textContent = `⏱️ ${quizTimeLeft}s`;
}

/* Saat waktu habis tanpa menjawab */
function timeOut() {
  quizAnswered = true;
  streak = 0;
  wrongCount++;
  updateScoreDisplay();

  /* Tampilkan feedback waktu habis */
  showFeedback('quiz', false, 'Waktu habis! ⏰', 'Coba lebih cepat di soal berikutnya.');
  el('quiz-next-btn').style.display = 'inline-block';

  /* Nonaktifkan semua tombol pilihan */
  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
}

/* Cek apakah jawaban yang dipilih benar atau salah */
function checkAnswer(clickedBtn, selectedText, correctText, explanation) {
  if (quizAnswered) return; // Cegah klik ganda
  quizAnswered = true;
  clearInterval(quizTimer); // Hentikan timer

  const isCorrect = selectedText === correctText;

  /* Tandai semua tombol: mana yang benar dan mana yang salah */
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
    const btnText = btn.textContent.trim().substring(1).trim(); // Hapus label A/B/C/D

    if (btnText === correctText) {
      btn.classList.add('correct');
    } else if (btn === clickedBtn && !isCorrect) {
      btn.classList.add('wrong');
    }
  });

  /* Update skor */
  if (isCorrect) {
    streak++;
    correctCount++;
    /* Bonus poin untuk streak berturut-turut */
    const bonus = streak >= 3 ? 20 : 10;
    totalScore += bonus;
    showFeedback('quiz', true,
      streak >= 3 ? `🔥 Streak x${streak}! +${bonus} poin` : '✅ Benar! +10 poin',
      explanation
    );
  } else {
    streak = 0;
    wrongCount++;
    showFeedback('quiz', false, '❌ Salah!', `Jawaban yang benar: "${correctText}". ${explanation}`);
  }

  updateScoreDisplay();
  el('quiz-next-btn').style.display = 'inline-block';
}

/* Tampilkan feedback (kotak hijau/merah di bawah pilihan) */
function showFeedback(gameId, isCorrect, title, text) {
  const feedbackEl  = el(gameId === 'quiz' ? 'quiz-feedback' : 'fill-feedback');
  const iconEl      = el(gameId === 'quiz' ? 'feedback-icon' : 'fill-feedback-icon');
  const titleEl     = el(gameId === 'quiz' ? 'feedback-title' : 'fill-feedback-title');
  const textEl      = el(gameId === 'quiz' ? 'feedback-text' : 'fill-feedback-text');

  feedbackEl.style.display = 'flex';
  feedbackEl.className = `feedback-box ${isCorrect ? 'correct-fb' : 'wrong-fb'}`;
  iconEl.textContent  = isCorrect ? '✅' : '❌';
  titleEl.textContent = title;
  textEl.textContent  = text;
}

/* Pindah ke soal kuis berikutnya */
function nextQuizQuestion() {
  el('quiz-timer').classList.remove('danger');
  quizCurrentIndex++;
  showQuizQuestion();
}

/* Reset dan mulai kuis dari awal */
function resetQuiz() {
  el('result-panel').style.display = 'none';
  el('game-quiz').style.display = 'block';
  clearInterval(quizTimer);
  quizCurrentIndex = 0;
  quizShuffled = shuffle(quizQuestions).slice(0, 10);
  showQuizQuestion();
}

/* Tampilkan panel hasil akhir */
function showResult() {
  el('game-quiz').style.display = 'none';
  const resultPanel = el('result-panel');
  resultPanel.style.display = 'block';

  const pct = Math.round((correctCount / (correctCount + wrongCount)) * 100) || 0;

  /* Pilih emoji dan pesan sesuai skor */
  let emoji, title, message;
  if (pct >= 90) { emoji = '🏆'; title = 'Sempurna!'; message = 'Kamu menguasai tenses dengan sangat baik!'; }
  else if (pct >= 70) { emoji = '🎉'; title = 'Bagus Sekali!'; message = 'Kamu memahami sebagian besar tenses!'; }
  else if (pct >= 50) { emoji = '👍'; title = 'Lumayan!'; message = 'Masih perlu sedikit latihan lagi!'; }
  else { emoji = '📚'; title = 'Terus Belajar!'; message = 'Yuk ulangi materi tenses dan coba lagi!'; }

  el('result-emoji').textContent     = emoji;
  el('result-title').textContent     = title;
  el('result-message').textContent   = message;
  el('result-correct').textContent   = correctCount;
  el('result-wrong').textContent     = wrongCount;
  el('result-pct').textContent       = pct + '%';
}

/* ============================================================
   GAME 2: ISI KALIMAT RUMPANG
   ============================================================ */

function initFill() {
  fillShuffled = shuffle(fillQuestions).slice(0, 10);
  fillCurrentIndex = 0;
  showFillQuestion();
}

function showFillQuestion() {
  if (fillCurrentIndex >= fillShuffled.length) {
    switchTab('quiz');
    showResult();
    return;
  }

  const q = fillShuffled[fillCurrentIndex];

  /* Update progress */
  const progress = ((fillCurrentIndex + 1) / fillShuffled.length) * 100;
  el('fill-progress-bar').style.width = progress + '%';
  el('fill-progress-text').textContent = `Soal ${fillCurrentIndex + 1} dari ${fillShuffled.length}`;
  el('fill-category').textContent = q.category;

  /* Ganti ___ dengan HTML span bergaris bawah */
  el('fill-sentence').innerHTML = q.sentence.replace(
    /___\s*\([^)]+\)/g,
    '<span class="blank">_______________</span>'
  );

  /* Reset input dan feedback */
  const input = el('fill-answer');
  input.value = '';
  input.className = 'fill-input';
  input.disabled = false;
  input.focus();

  el('fill-feedback').style.display = 'none';
  el('fill-next-btn').style.display = 'none';
  el('hint-text').style.display = 'none';
  fillAnswered = false;
}

/* Cek jawaban fill in the blank */
function checkFillAnswer() {
  if (fillAnswered) return;
  fillAnswered = true;

  const q = fillShuffled[fillCurrentIndex];
  const input = el('fill-answer');
  /* Normalisasi: hapus spasi ekstra, jadikan huruf kecil semua */
  const userAnswer = input.value.trim().toLowerCase();

  /* Cek apakah jawaban pengguna cocok dengan salah satu jawaban yang benar */
  const isCorrect = q.answer.some(ans => ans.toLowerCase() === userAnswer);

  input.disabled = true;
  input.className = `fill-input ${isCorrect ? 'correct-input' : 'wrong-input'}`;

  if (isCorrect) {
    streak++;
    correctCount++;
    totalScore += 10;
    showFeedback('fill', true, '✅ Benar! +10 poin', q.hint);
  } else {
    streak = 0;
    wrongCount++;
    showFeedback('fill', false, '❌ Belum tepat',
      `Jawaban yang benar: "${q.answer[0]}". ${q.hint}`);
  }

  updateScoreDisplay();
  el('fill-next-btn').style.display = 'inline-block';
}

/* Tampilkan petunjuk (hint) */
function showHint() {
  const q = fillShuffled[fillCurrentIndex];
  el('hint-text').textContent = '💡 Petunjuk: ' + q.hint;
  el('hint-text').style.display = 'block';
}

function nextFillQuestion() {
  fillCurrentIndex++;
  showFillQuestion();
}

function resetFill() {
  fillCurrentIndex = 0;
  fillShuffled = shuffle(fillQuestions).slice(0, 10);
  showFillQuestion();
}

/* ============================================================
   GAME 3: TEBAK RUMUS (MATCH)
   ============================================================ */

function generateMatchGame() {
  matchSelected = null;
  matchTenseEl  = null;

  /* Ambil 5 pasang acak dari matchData */
  const selected = shuffle(matchData).slice(0, 5);
  const tenses   = selected.map(d => d.tense);
  const formulas = shuffle(selected.map(d => d.formula)); // Acak lagi urutan rumus

  const container = el('match-area');
  container.innerHTML = '';

  /* Buat judul dua kolom */
  const leftTitle  = document.createElement('div');
  leftTitle.className = 'match-column-title';
  leftTitle.textContent = '🏷️ Nama Tenses';

  const rightTitle = document.createElement('div');
  rightTitle.className = 'match-column-title';
  rightTitle.textContent = '📐 Rumus';

  container.appendChild(leftTitle);
  container.appendChild(rightTitle);

  /* Buat kartu untuk setiap tenses dan rumus */
  tenses.forEach(tense => {
    const card = document.createElement('div');
    card.className = 'match-card';
    card.textContent = tense;
    card.dataset.type   = 'tense';
    card.dataset.value  = tense;
    card.onclick = () => selectMatchCard(card, 'tense');
    container.appendChild(card);
  });

  formulas.forEach(formula => {
    const card = document.createElement('div');
    card.className = 'match-card';
    card.textContent = formula;
    card.dataset.type  = 'formula';
    card.dataset.value = formula;
    card.onclick = () => selectMatchCard(card, 'formula');
    container.appendChild(card);
  });

  /* Susun ulang kartu secara selang-seling tenses-formula
     agar terlihat dua kolom yang benar (menggunakan CSS grid order) */
  const allCards = container.querySelectorAll('.match-card');
  const tenseCards   = [...allCards].filter(c => c.dataset.type === 'tense');
  const formulaCards = [...allCards].filter(c => c.dataset.type === 'formula');

  /* CSS Grid: tenses di kolom 1, formula di kolom 2 */
  tenseCards.forEach((c, i) => { c.style.gridColumn = '1'; c.style.gridRow = i + 2; });
  formulaCards.forEach((c, i) => { c.style.gridColumn = '2'; c.style.gridRow = i + 2; });
}

/* Logika saat kartu diklik */
function selectMatchCard(card, type) {
  if (card.classList.contains('matched') || card.classList.contains('used')) return;

  if (type === 'tense') {
    /* Klik kartu tenses: simpan sebagai pilihan pertama */
    if (matchTenseEl) matchTenseEl.classList.remove('selected');
    matchTenseEl = card;
    card.classList.add('selected');

    /* Kalau formula sudah dipilih, cek kecocokan */
    if (matchSelected && matchSelected.dataset.type === 'formula') {
      checkMatch(card, matchSelected);
    }
  } else {
    /* Klik kartu formula */
    if (matchSelected) matchSelected.classList.remove('selected');
    matchSelected = card;
    card.classList.add('selected');

    /* Kalau tenses sudah dipilih, cek kecocokan */
    if (matchTenseEl) {
      checkMatch(matchTenseEl, card);
    }
  }
}

/* Cek apakah pasangan tenses-rumus cocok */
function checkMatch(tenseCard, formulaCard) {
  const tenseName  = tenseCard.dataset.value;
  const formulaVal = formulaCard.dataset.value;

  /* Cari apakah pasangan ini ada di matchData */
  const correct = matchData.find(d => d.tense === tenseName && d.formula === formulaVal);

  if (correct) {
    /* Cocok! */
    tenseCard.classList.remove('selected');
    formulaCard.classList.remove('selected');
    tenseCard.classList.add('matched');
    formulaCard.classList.add('matched');
    matchScore += 20;
    totalScore += 20;
    correctCount++;
    streak++;
    el('match-score').textContent = matchScore;
    updateScoreDisplay();
  } else {
    /* Tidak cocok */
    tenseCard.classList.add('no-match');
    formulaCard.classList.add('no-match');
    streak = 0;
    wrongCount++;
    updateScoreDisplay();
    setTimeout(() => {
      tenseCard.classList.remove('no-match', 'selected');
      formulaCard.classList.remove('no-match', 'selected');
      matchSelected = null;
      matchTenseEl  = null;
    }, 600); // Setelah 600ms animasi getar, reset
    return;
  }

  /* Reset pilihan */
  matchSelected = null;
  matchTenseEl  = null;
}

/* ============================================================
   INISIALISASI: Jalankan semua game saat halaman siap
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
  initFill();
  generateMatchGame();
});
