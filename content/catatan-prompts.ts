export type JournalPrompt = {
  id: string;
  emoji: string;
  title: string;
  hint: string;
  placeholder: string;
  stickers: string[];
};

export const JOURNAL_PROMPTS: JournalPrompt[] = [
  {
    id: "syukur",
    emoji: "🌿",
    title: "1 Hal Sederhana yang Kusyukuri",
    hint: "Bisa hal sekecil minum air dingin saat haus, angin sejuk, atau candaan teman.",
    placeholder: "Hari ini aku bersyukur karena...",
    stickers: ["🌿", "🌻", "☀️", "🍵", "✨"],
  },
  {
    id: "lepas-beban",
    emoji: "🍃",
    title: "Melepaskan Hal di Luar Kendaliku",
    hint: "Keluarkan beban di kepala. Ingat, tidak semua hal adalah tanggung jawabmu hari ini.",
    placeholder: "Hal yang sedang bikin aku cemas atau kepikiran adalah...",
    stickers: ["🍃", "🌧️", "☁️", "🌊", "🕊️"],
  },
  {
    id: "kebaikan-diri",
    emoji: "💌",
    title: "Kalimat Hangat untuk Diriku",
    hint: "Bayangkan sahabat terbaikmu sedang kesulitan, apa yang akan kamu katakan padanya?",
    placeholder: "Untuk diriku yang sudah berjuang hari ini: kamu boleh...",
    stickers: ["💌", "💛", "🧸", "🫂", "🌸"],
  },
  {
    id: "progres-kecil",
    emoji: "⭐",
    title: "Kemenangan Kecil Hari Ini",
    hint: "Bangun tepat waktu, mandi, atau sekadar bertahan melewati hari sulit adalah progres nyata.",
    placeholder: "Meskipun terasa biasa atau berat, hari ini aku bangga karena...",
    stickers: ["⭐", "🎉", "🌱", "🏆", "🌟"],
  },
  {
    id: "istirahat",
    emoji: "☕",
    title: "Bentuk Rehat yang Kubutuhkan",
    hint: "Kenali sinyal lelah tubuhmu. Apakah kamu butuh tidur, me-time, atau jalan santai?",
    placeholder: "Malam ini atau besok, aku ingin memanjakan tubuh dan pikiranku dengan...",
    stickers: ["☕", "🛌", "🎧", "🌙", "🕯️"],
  },
  {
    id: "bebas",
    emoji: "✍️",
    title: "Tulis Bebas Sepuasnya",
    hint: "Tanpa aturan, tanpa takut dinilai. Hanya kamu dan pikiranmu yang jujur.",
    placeholder: "Apa pun yang sedang ada di hatiku saat ini...",
    stickers: ["✍️", "💭", "🎨", "📖", "🌈"],
  },
];
