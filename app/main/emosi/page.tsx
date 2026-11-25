"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GameShell from "@/components/GameShell";

type Option = { emoji: string; name: string; note: string };
type Scenario = { situation: string; options: Option[] };

const scenarios: Scenario[] = [
  {
    situation: "Besok ada presentasi, tapi slide kamu belum selesai.",
    options: [
      { emoji: "😰", name: "Cemas", note: "Cemas itu tanda tubuhmu lagi siap-siap menghadapi hal penting." },
      { emoji: "😵", name: "Panik", note: "Panik muncul waktu terasa nggak ada waktu. Tarik napas dulu, lalu pecah tugasnya jadi bagian kecil." },
      { emoji: "🔥", name: "Tertantang", note: "Rasa tertantang bisa jadi bahan bakar. Pakai buat mulai satu langkah kecil." },
    ],
  },
  {
    situation: "Nilai ujian keluar dan lebih rendah dari harapanmu.",
    options: [
      { emoji: "😞", name: "Kecewa", note: "Kecewa itu tanda kamu peduli sama usahamu." },
      { emoji: "😠", name: "Marah", note: "Marah sering muncul waktu usaha terasa nggak dihargai. Boleh dirasain, lalu salurkan dengan sehat." },
      { emoji: "😳", name: "Malu", note: "Malu itu wajar, tapi satu nilai nggak menentukan siapa dirimu." },
    ],
  },
  {
    situation: "Teman-temanmu lagi hangout, tapi kamu nggak diajak.",
    options: [
      { emoji: "😢", name: "Sedih", note: "Sedih itu wajar waktu merasa ditinggalkan." },
      { emoji: "🫥", name: "Kesepian", note: "Kesepian itu sinyal bahwa kamu butuh koneksi. Coba kabarin satu orang yang kamu nyaman." },
      { emoji: "😤", name: "Kesal", note: "Kesal bisa muncul dari rasa nggak dianggap. Kadang ngobrol langsung bisa meluruskan salah paham." },
    ],
  },
  {
    situation: "Tugas kelompok, tapi cuma kamu yang benar-benar mengerjakan.",
    options: [
      { emoji: "😤", name: "Kesal", note: "Kesal itu masuk akal waktu bebannya nggak adil." },
      { emoji: "😮‍💨", name: "Lelah", note: "Lelah menandakan kamu udah ngasih banyak. Jangan lupa istirahat." },
      { emoji: "🥺", name: "Tidak dihargai", note: "Merasa nggak dihargai itu berat. Menyampaikan kebutuhanmu ke tim adalah langkah yang sah." },
    ],
  },
  {
    situation: "Akhirnya tugas besarmu selesai dan sudah dikumpulkan!",
    options: [
      { emoji: "😌", name: "Lega", note: "Lega itu tanda tubuhmu akhirnya boleh rileks. Nikmati." },
      { emoji: "🥳", name: "Bangga", note: "Bangga itu pantas. Kamu udah melewati prosesnya." },
      { emoji: "😶", name: "Kosong", note: "Rasa kosong setelah tegang lama itu umum. Kasih waktu buat tubuh dan pikiranmu pulih." },
    ],
  },
];

// posisi tetap untuk hujan konfeti di layar selesai
const confetti = [
  { left: "8%", delay: 0, emoji: "🎉" },
  { left: "22%", delay: 0.3, emoji: "⭐" },
  { left: "36%", delay: 0.1, emoji: "✨" },
  { left: "50%", delay: 0.5, emoji: "🎊" },
  { left: "64%", delay: 0.2, emoji: "⭐" },
  { left: "78%", delay: 0.4, emoji: "✨" },
  { left: "90%", delay: 0.15, emoji: "🎉" },
];

export default function EmosiPage() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const finished = index >= scenarios.length;
  const scenario = scenarios[index];

  const next = () => {
    setPicked(null);
    setIndex((i) => i + 1);
  };

  const restart = () => {
    setPicked(null);
    setIndex(0);
  };

  return (
    <GameShell tone="amber">
      <h1 className="mt-5 text-2xl font-extrabold text-slate-700">
        Tebak Emosi 🎭
      </h1>
      <p className="mt-2 text-slate-600">
        Nggak ada jawaban salah. Pilih perasaan yang paling mirip denganmu.
      </p>

      {/* progres */}
      <div className="mt-5 flex gap-1.5" aria-hidden>
        {scenarios.map((_, i) => (
          <div
            key={i}
            className="h-2 flex-1 overflow-hidden rounded-full bg-white/70"
          >
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-amber-400 to-orange-400"
              initial={false}
              animate={{ width: i < index || finished ? "100%" : "0%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {finished ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 16 }}
            className="relative mt-8 overflow-hidden rounded-3xl bg-white/90 p-6 text-center shadow-xl shadow-amber-200/60 backdrop-blur"
          >
            {confetti.map((c, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="pointer-events-none absolute -top-6 text-xl"
                style={{ left: c.left }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 260, opacity: [0, 1, 1, 0], rotate: 180 }}
                transition={{ duration: 2.4, delay: c.delay, ease: "easeIn" }}
              >
                {c.emoji}
              </motion.span>
            ))}
            <motion.p
              className="text-5xl"
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.2, repeat: 2 }}
            >
              🌟
            </motion.p>
            <h2 className="mt-3 text-xl font-extrabold text-slate-700">
              Kerja bagus!
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Mengenali perasaan adalah langkah pertama buat mengelolanya.
            </p>
            <motion.button
              onClick={restart}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="mt-5 w-full rounded-full bg-linear-to-r from-amber-400 to-orange-400 py-3 font-bold text-white shadow-lg shadow-amber-300/60"
            >
              Main lagi
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="mt-5"
          >
            <p className="text-xs font-semibold text-slate-500">
              Situasi {index + 1} dari {scenarios.length}
            </p>
            <div className="mt-2 rounded-3xl bg-white/90 p-5 shadow-lg shadow-amber-200/50 backdrop-blur">
              <p className="font-bold text-slate-700">{scenario.situation}</p>
            </div>

            <div className="mt-4 grid gap-3">
              {scenario.options.map((o, i) => {
                const isPicked = picked === i;
                return (
                  <motion.button
                    key={o.name}
                    disabled={picked !== null}
                    onClick={() => setPicked(i)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{
                      opacity: picked !== null && !isPicked ? 0.5 : 1,
                      y: 0,
                      scale: isPicked ? 1.03 : 1,
                    }}
                    transition={{ delay: picked === null ? 0.08 * i : 0, duration: 0.3 }}
                    whileHover={picked === null ? { scale: 1.02 } : undefined}
                    whileTap={picked === null ? { scale: 0.96 } : undefined}
                    className={`flex items-center gap-3 rounded-2xl p-4 text-left shadow-md transition-colors ${
                      isPicked
                        ? "bg-amber-100 shadow-amber-300/60 ring-2 ring-amber-400"
                        : "bg-white shadow-amber-200/40"
                    }`}
                  >
                    <span className="text-3xl">{o.emoji}</span>
                    <span className="flex-1 font-bold text-slate-700">
                      {o.name}
                    </span>
                    {isPicked && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 12 }}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-white"
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {picked !== null && (
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="mt-4 rounded-2xl bg-emerald-100 p-4 shadow-md shadow-emerald-200/60"
              >
                <p className="text-sm text-slate-700">
                  {scenario.options[picked].note}
                </p>
                <motion.button
                  onClick={next}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-3 w-full rounded-full bg-linear-to-r from-emerald-400 to-teal-400 py-2.5 font-bold text-white shadow-md shadow-emerald-300/60"
                >
                  {index === scenarios.length - 1 ? "Selesai" : "Lanjut"}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </GameShell>
  );
}
