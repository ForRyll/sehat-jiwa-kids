export type BadgeCategory = "belajar" | "tenang" | "refleksi" | "game";

export type Badge = {
  id: string;
  title: string;
  desc: string;
  icon: string;
  category: BadgeCategory;
  target: number;
  unit: string;
  color: string; // Tailwind color class
  checkProgress: (stats: UserStats) => number;
};

export type UserStats = {
  readMateriCount: number;
  favoriteMateriCount: number;
  favoriteAfirmasiCount: number;
  moodCount: number;
  diaryCount: number;
  napasCount: number;
  groundingCount: number;
  mitosFaktaCount: number;
};

export const BADGES: Badge[] = [
  {
    id: "baca-1",
    title: "Langkah Pertama",
    desc: "Membaca 1 materi edukasi kesehatan mental.",
    icon: "🌱",
    category: "belajar",
    target: 1,
    unit: "materi",
    color: "from-emerald-400 to-teal-500",
    checkProgress: (s) => s.readMateriCount,
  },
  {
    id: "baca-4",
    title: "Penjelajah Jiwa",
    desc: "Menyelesaikan 4 materi edukasi.",
    icon: "📚",
    category: "belajar",
    target: 4,
    unit: "materi",
    color: "from-sky-400 to-indigo-500",
    checkProgress: (s) => s.readMateriCount,
  },
  {
    id: "baca-8",
    title: "Cendekia Sehat",
    desc: "Membaca seluruh 8 materi edukasi seputar mahasiswa.",
    icon: "🎓",
    category: "belajar",
    target: 8,
    unit: "materi",
    color: "from-amber-400 to-orange-500",
    checkProgress: (s) => s.readMateriCount,
  },
  {
    id: "napas-1",
    title: "Napas Pertama",
    desc: "Menyelesaikan 1 sesi latihan pernapasan dalam.",
    icon: "🌬️",
    category: "tenang",
    target: 1,
    unit: "sesi",
    color: "from-cyan-400 to-blue-500",
    checkProgress: (s) => s.napasCount,
  },
  {
    id: "grounding-1",
    title: "Pijakan Kuat",
    desc: "Mempraktikkan 1 kali teknik grounding 5-4-3-2-1.",
    icon: "🌿",
    category: "tenang",
    target: 1,
    unit: "latihan",
    color: "from-emerald-400 to-green-600",
    checkProgress: (s) => s.groundingCount,
  },
  {
    id: "tenang-3",
    title: "Sahabat Tenang",
    desc: "Menyelesaikan total 3 latihan relaksasi (napas atau grounding).",
    icon: "🧘",
    category: "tenang",
    target: 3,
    unit: "latihan",
    color: "from-teal-400 to-emerald-500",
    checkProgress: (s) => s.napasCount + s.groundingCount,
  },
  {
    id: "mood-1",
    title: "Menyapa Rasa",
    desc: "Mencatat 1 kali suasana hati di Cek Perasaan Harian.",
    icon: "🌤️",
    category: "refleksi",
    target: 1,
    unit: "kali",
    color: "from-amber-300 to-yellow-500",
    checkProgress: (s) => s.moodCount,
  },
  {
    id: "mood-5",
    title: "Sahabat Emosi",
    desc: "Mencatat perasaan harian sebanyak 5 kali.",
    icon: "🌈",
    category: "refleksi",
    target: 5,
    unit: "kali",
    color: "from-pink-400 to-rose-500",
    checkProgress: (s) => s.moodCount,
  },
  {
    id: "diary-1",
    title: "Pena Pertama",
    desc: "Menulis 1 catatan refleksi di Catatan Harian Pribadi.",
    icon: "✍️",
    category: "refleksi",
    target: 1,
    unit: "catatan",
    color: "from-rose-400 to-pink-500",
    checkProgress: (s) => s.diaryCount,
  },
  {
    id: "diary-3",
    title: "Penyimpan Cerita",
    desc: "Menulis 3 catatan refleksi pribadi.",
    icon: "📖",
    category: "refleksi",
    target: 3,
    unit: "catatan",
    color: "from-purple-400 to-indigo-500",
    checkProgress: (s) => s.diaryCount,
  },
  {
    id: "mitos-1",
    title: "Pembeda Mitos",
    desc: "Menyelesaikan 1 putaran kuis Mitos atau Fakta.",
    icon: "✨",
    category: "game",
    target: 1,
    unit: "ronde",
    color: "from-violet-400 to-fuchsia-500",
    checkProgress: (s) => s.mitosFaktaCount,
  },
  {
    id: "favorit-1",
    title: "Penyimpan Kebaikan",
    desc: "Menyimpan minimal 1 materi atau kartu afirmasi favorit.",
    icon: "⭐",
    category: "refleksi",
    target: 1,
    unit: "item",
    color: "from-yellow-400 to-amber-500",
    checkProgress: (s) => s.favoriteMateriCount + s.favoriteAfirmasiCount,
  },
];
