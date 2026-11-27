import { MascotMood } from "@/components/Mascot";
import { MoodType } from "@/lib/storage";

export type MoodConfig = {
  type: MoodType;
  emoji: string;
  label: string;
  subtitle: string;
  mascotMood: MascotMood;
  color: string; // Tailwind bg class
  ringColor: string; // Tailwind ring class
  badgeColor: string; // Tailwind text/bg
  reassurance: string;
  recommendation: {
    text: string;
    href: string;
    cta: string;
  };
};

export const MOOD_CONFIGS: Record<MoodType, MoodConfig> = {
  senang: {
    type: "senang",
    emoji: "😄",
    label: "Senang",
    subtitle: "Lagi berenergi & ceria",
    mascotMood: "senang",
    color: "bg-amber-100",
    ringColor: "ring-amber-400",
    badgeColor: "bg-amber-500 text-white",
    reassurance:
      "Senang banget melihatmu bahagia hari ini! Simpan energi baik ini, atau bagikan senyumanmu ke teman terdekat.",
    recommendation: {
      text: "Ambil kartu penyemangat buat menjaga energi baikmu!",
      href: "/main/afirmasi",
      cta: "Buka Kartu Afirmasi 💌",
    },
  },
  tenang: {
    type: "tenang",
    emoji: "😌",
    label: "Tenang",
    subtitle: "Pikiran adem & santai",
    mascotMood: "tenang",
    color: "bg-emerald-100",
    ringColor: "ring-emerald-400",
    badgeColor: "bg-emerald-500 text-white",
    reassurance:
      "Kondisi yang sangat nyaman. Menjaga ketenangan di tengah rutinitas kuliah adalah pencapaian yang patut disyukuri.",
    recommendation: {
      text: "Pertahankan ketenanganmu dengan artikel mindful singkat.",
      href: "/belajar/tidur-dan-pikiran",
      cta: "Baca Seputar Ketenangan 📖",
    },
  },
  biasa: {
    type: "biasa",
    emoji: "😐",
    label: "Biasa Saja",
    subtitle: "Hari netral mengalir santai",
    mascotMood: "berpikir",
    color: "bg-sky-100",
    ringColor: "ring-sky-400",
    badgeColor: "bg-sky-500 text-white",
    reassurance:
      "Hari yang biasa saja itu sangat normal dan sah. Tidak setiap hari harus luar biasa; ada dan bertahan hari ini sudah cukup.",
    recommendation: {
      text: "Coba uji wawasan santai seputar mitos & fakta kesehatan mental.",
      href: "/main/mitos-fakta",
      cta: "Main Mitos atau Fakta ✨",
    },
  },
  lelah: {
    type: "lelah",
    emoji: "🥱",
    label: "Lelah",
    subtitle: "Energi menipis & butuh rehat",
    mascotMood: "tidur",
    color: "bg-indigo-100",
    ringColor: "ring-indigo-400",
    badgeColor: "bg-indigo-500 text-white",
    reassurance:
      "Tubuh dan pikiranmu sedang minta istirahat. Jangan merasa bersalah untuk berhenti sejenak; istirahat itu bagian dari produktivitas.",
    recommendation: {
      text: "Cobalah latihan napas 3 menit untuk merilekskan otot-otot yang tegang.",
      href: "/main/napas",
      cta: "Latihan Napas Relaksasi 🌬️",
    },
  },
  sedih: {
    type: "sedih",
    emoji: "😔",
    label: "Sedih / Down",
    subtitle: "Hati lagi kurang enak",
    mascotMood: "menyemangati",
    color: "bg-rose-100",
    ringColor: "ring-rose-400",
    badgeColor: "bg-rose-500 text-white",
    reassurance:
      "Terima kasih sudah jujur mengakui perasaanmu. Rasa sedih ini valid, kamu tidak harus langsung merasa 'baik-baik saja'. Pelan-pelan ya.",
    recommendation: {
      text: "Ambil satu kalimat afirmasi lembut khusus untukmu hari ini.",
      href: "/main/afirmasi",
      cta: "Buka Kartu Afirmasi 💌",
    },
  },
  berat: {
    type: "berat",
    emoji: "😣",
    label: "Kewalahan",
    subtitle: "Beban terasa menumpuk",
    mascotMood: "menyemangati",
    color: "bg-violet-100",
    ringColor: "ring-violet-400",
    badgeColor: "bg-violet-500 text-white",
    reassurance:
      "Kedengarannya hari ini terasa sangat berat. Ingat, kamu tidak harus menyelesaikan semuanya sekaligus saat ini juga. Tarik napas, pecah jadi hal kecil.",
    recommendation: {
      text: "Teknik grounding 5-4-3-2-1 bisa membantumu kembali fokus dan tenang saat cemas.",
      href: "/main/grounding",
      cta: "Coba Grounding 5-4-3-2-1 🌿",
    },
  },
};

export const COMMON_MOOD_TAGS = [
  "Kuliah 📚",
  "Tugas & Ujian 📝",
  "Teman / Organisasi 👥",
  "Keluarga 🏡",
  "Tidur / Istirahat 💤",
  "Kesehatan Tubuh 🏃",
  "Keuangan 💸",
  "Me Time ☕",
  "Masa Depan 🧭",
];
