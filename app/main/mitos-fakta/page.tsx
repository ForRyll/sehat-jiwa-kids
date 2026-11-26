"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import GameShell from "@/components/GameShell";
import Mascot from "@/components/Mascot";
import GentleSparkles from "@/components/GentleSparkles";
import { useMotionSafe } from "@/lib/storage";
import { mitosFaktaItems } from "@/content/mitos-fakta";

type SwipeDir = "left" | "right" | null;

export default function MitosFaktaPage() {
  const reduceMotion = useMotionSafe();
  const cards = mitosFaktaItems;

  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState<SwipeDir>(null);
  const [correct, setCorrect] = useState(0);
  const [sparkleKey, setSparkleKey] = useState(0);

  const finished = index >= cards.length;
  const card = cards[index] as (typeof cards)[number] | undefined;

  const handleSwipe = useCallback(
    (dir: SwipeDir) => {
      if (!card || answered) return;
      const userAnswer = dir === "left" ? "mitos" : "fakta";
      const isCorrect = userAnswer === card.jawaban;
      if (isCorrect) {
        setCorrect((c) => c + 1);
        setSparkleKey((k) => k + 1);
      }
      setAnswered(dir);
    },
    [card, answered],
  );

  const next = () => {
    setAnswered(null);
    setIndex((i) => i + 1);
  };

  const reset = () => {
    setIndex(0);
    setAnswered(null);
    setCorrect(0);
  };

  /* drag handler for swipe gesture */
  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      if (answered) return;
      if (info.offset.x < -60) handleSwipe("left");
      else if (info.offset.x > 60) handleSwipe("right");
    },
    [answered, handleSwipe],
  );

  return (
    <GameShell tone="violet">
      <h1 className="mt-5 text-center text-2xl font-extrabold text-slate-700">
        Mitos atau Fakta ✨
      </h1>
      <p className="mt-2 text-center text-slate-600">
        Geser kiri = Mitos, geser kanan = Fakta. Atau ketuk tombol di bawah.
      </p>

      {/* progress bar */}
      <div className="mt-5 flex gap-1" aria-hidden>
        {cards.map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/60"
          >
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-violet-400 to-fuchsia-400"
              initial={false}
              animate={{ width: i < index || finished ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {finished ? (
          /* ========== DONE ========== */
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 16 }}
            className="relative mt-6 overflow-hidden rounded-3xl bg-white/90 p-6 text-center shadow-xl shadow-violet-200/60 backdrop-blur"
          >
            <GentleSparkles burstKey={sparkleKey} />

            <div className="mx-auto mb-3 w-fit">
              <Mascot size={90} mood="menyemangati" />
            </div>

            <h2 className="text-xl font-extrabold text-slate-700">
              Keren! 🎉
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Kamu menjawab benar{" "}
              <strong>
                {correct} dari {cards.length}
              </strong>{" "}
              pernyataan.
            </p>

            <div className="mt-4 rounded-2xl bg-violet-50 p-4 text-left">
              <p className="text-sm font-bold text-slate-700">
                📋 Apa yang kamu latih
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li>🧠 Menguji pengetahuan tentang kesehatan mental</li>
                <li>💡 Membedakan mitos dan fakta</li>
                <li>📖 Belajar dari penjelasan tiap pernyataan</li>
              </ul>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Ingat, nggak apa-apa kalau belum semua benar. Yang penting kamu
              mau belajar! 💜
            </p>

            <motion.button
              onClick={reset}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="mt-5 w-full rounded-full bg-linear-to-r from-violet-400 to-fuchsia-400 py-3 font-bold text-white shadow-lg shadow-violet-300/60"
            >
              Main lagi
            </motion.button>
          </motion.div>
        ) : card ? (
          /* ========== CARD ========== */
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.25 }}
            className="mt-5"
          >
            {/* count */}
            <p className="text-center text-xs font-semibold text-slate-500">
              Kartu {index + 1} dari {cards.length}
            </p>

            {/* swipeable card */}
            <div className="relative mt-3">
              <GentleSparkles burstKey={sparkleKey} />
              <motion.div
                drag={answered ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={handleDragEnd}
                className={`cursor-grab select-none rounded-3xl bg-white/90 p-6 shadow-lg shadow-violet-200/50 backdrop-blur transition-colors active:cursor-grabbing ${
                  answered === "left"
                    ? "ring-2 ring-rose-400"
                    : answered === "right"
                      ? "ring-2 ring-emerald-400"
                      : ""
                }`}
              >
                <p className="text-center text-lg font-bold leading-relaxed text-slate-700">
                  &ldquo;{card.pernyataan}&rdquo;
                </p>

                {/* swipe hints */}
                {!answered && (
                  <div className="mt-4 flex justify-between text-xs text-slate-400">
                    <span>← Mitos</span>
                    <span>Fakta →</span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* answer buttons */}
            {!answered && (
              <div className="mt-4 flex gap-3">
                <motion.button
                  onClick={() => handleSwipe("left")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-2xl bg-rose-100 py-3 font-bold text-rose-700 shadow-md shadow-rose-200/60"
                >
                  ❌ Mitos
                </motion.button>
                <motion.button
                  onClick={() => handleSwipe("right")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-100 py-3 font-bold text-emerald-700 shadow-md shadow-emerald-200/60"
                >
                  ✅ Fakta
                </motion.button>
              </div>
            )}

            {/* feedback */}
            {answered && card && (
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className={`mt-4 rounded-2xl p-4 shadow-md ${
                  (answered === "left" ? "mitos" : "fakta") === card.jawaban
                    ? "bg-emerald-100 shadow-emerald-200/60"
                    : "bg-rose-100 shadow-rose-200/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mascot
                    size={40}
                    mood={
                      (answered === "left" ? "mitos" : "fakta") ===
                      card.jawaban
                        ? "senang"
                        : "berpikir"
                    }
                  />
                  <p className="font-bold text-slate-700">
                    {(answered === "left" ? "mitos" : "fakta") ===
                    card.jawaban
                      ? "Benar! 🎉"
                      : `Jawabannya: ${card.jawaban === "mitos" ? "Mitos" : "Fakta"}`}
                  </p>
                </div>

                <p className="mt-2 text-sm text-slate-600">
                  {card.penjelasan}
                </p>

                {card.materiTerkait && (
                  <Link
                    href={`/belajar/${card.materiTerkait}`}
                    className="mt-2 inline-block text-sm font-semibold text-violet-600 underline decoration-violet-300"
                  >
                    📖 Baca materi terkait
                  </Link>
                )}

                <motion.button
                  onClick={next}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-3 w-full rounded-full bg-linear-to-r from-violet-400 to-fuchsia-400 py-2.5 font-bold text-white shadow-md shadow-violet-300/60"
                >
                  {index === cards.length - 1 ? "Lihat Hasil" : "Lanjut"}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <p className="mx-auto mt-4 max-w-xs text-center text-xs text-slate-500">
        💡 Santai aja, ini bukan ujian. Semua jawabanmu membantu kamu belajar.
      </p>
    </GameShell>
  );
}
