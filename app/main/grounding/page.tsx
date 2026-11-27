"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GameShell from "@/components/GameShell";
import Mascot from "@/components/Mascot";
import GentleSparkles from "@/components/GentleSparkles";
import { useMotionSafe, useGameStats } from "@/lib/storage";

/* ---------- steps ---------- */
type GroundingStep = {
  count: number;
  sense: string;
  emoji: string;
  prompt: string;
  color: string;
};

const steps: GroundingStep[] = [
  {
    count: 5,
    sense: "dilihat",
    emoji: "👀",
    prompt: "Sebutkan 5 hal yang bisa kamu lihat di sekitarmu sekarang.",
    color: "bg-sky-100",
  },
  {
    count: 4,
    sense: "disentuh",
    emoji: "✋",
    prompt: "Sebutkan 4 hal yang bisa kamu sentuh atau rasakan teksturnya.",
    color: "bg-emerald-100",
  },
  {
    count: 3,
    sense: "didengar",
    emoji: "👂",
    prompt: "Sebutkan 3 suara yang bisa kamu dengar sekarang.",
    color: "bg-amber-100",
  },
  {
    count: 2,
    sense: "dicium",
    emoji: "👃",
    prompt: "Sebutkan 2 bau atau aroma yang bisa kamu cium.",
    color: "bg-rose-100",
  },
  {
    count: 1,
    sense: "dirasa",
    emoji: "👅",
    prompt: "Sebutkan 1 hal yang bisa kamu rasakan di lidahmu.",
    color: "bg-violet-100",
  },
];

export default function GroundingPage() {
  const reduceMotion = useMotionSafe();
  const { recordGame } = useGameStats();

  const [stepIdx, setStepIdx] = useState(0);
  const [tapped, setTapped] = useState<number[]>([]); // items tapped in current step
  const [sparkleKey, setSparkleKey] = useState(0);

  const finished = stepIdx >= steps.length;
  const currentStep = steps[stepIdx] as GroundingStep | undefined;

  const handleTap = (itemIdx: number) => {
    if (!currentStep) return;
    if (tapped.includes(itemIdx)) return;

    const next = [...tapped, itemIdx];
    setTapped(next);

    // auto advance when all items tapped
    if (next.length >= currentStep.count) {
      setSparkleKey((k) => k + 1);
      if (stepIdx + 1 >= steps.length) {
        recordGame("groundingCount", 1);
      }
      setTimeout(() => {
        setStepIdx((s) => s + 1);
        setTapped([]);
      }, 600);
    }
  };

  const reset = () => {
    setStepIdx(0);
    setTapped([]);
  };

  const mascotMood = finished
    ? "menyemangati"
    : stepIdx >= 3
      ? "tenang"
      : "senang";

  return (
    <GameShell tone="emerald">
      <h1 className="mt-5 text-center text-2xl font-extrabold text-slate-700">
        Grounding 5-4-3-2-1 🌿
      </h1>
      <p className="mt-2 text-center text-slate-600">
        Fokus ke panca inderamu. Ketuk satu per satu, pelan-pelan aja.
      </p>

      {/* progress bar */}
      <div className="mt-5 flex gap-1.5" aria-hidden>
        {steps.map((_, i) => (
          <div
            key={i}
            className="h-2 flex-1 overflow-hidden rounded-full bg-white/70"
          >
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-emerald-400 to-teal-400"
              initial={false}
              animate={{ width: i < stepIdx || finished ? "100%" : "0%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
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
            className="relative mt-6 overflow-hidden rounded-3xl bg-white/90 p-6 text-center shadow-xl shadow-emerald-200/60 backdrop-blur"
          >
            <GentleSparkles burstKey={sparkleKey} />

            <div className="mx-auto mb-3 w-fit">
              <Mascot size={90} mood="menyemangati" />
            </div>

            <h2 className="text-xl font-extrabold text-slate-700">
              Luar biasa! 🎉
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Kamu sudah menyelesaikan latihan grounding 5-4-3-2-1.
            </p>

            <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-left">
              <p className="text-sm font-bold text-slate-700">
                📋 Apa yang kamu latih
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {steps.map((s) => (
                  <li key={s.sense}>
                    {s.emoji} {s.count} hal yang {s.sense}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Teknik grounding membantu mengalihkan fokus dari pikiran cemas ke
              panca indera — sehingga sistem saraf bisa kembali tenang.
            </p>

            <motion.button
              onClick={reset}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="mt-5 w-full rounded-full bg-linear-to-r from-emerald-400 to-teal-400 py-3 font-bold text-white shadow-lg shadow-emerald-300/60"
            >
              Main lagi
            </motion.button>
          </motion.div>
        ) : currentStep ? (
          /* ========== ACTIVE STEP ========== */
          <motion.div
            key={stepIdx}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.3 }}
            className="mt-5"
          >
            {/* mascot */}
            <div className="mx-auto mb-3 w-fit">
              <Mascot size={72} mood={mascotMood} />
            </div>

            {/* step label */}
            <p className="text-center text-xs font-semibold text-slate-500">
              Langkah {stepIdx + 1} dari {steps.length}
            </p>

            {/* prompt card */}
            <div
              className={`mt-3 rounded-3xl p-5 shadow-lg shadow-emerald-200/50 backdrop-blur ${currentStep.color}`}
            >
              <p className="text-center text-3xl">{currentStep.emoji}</p>
              <p className="mt-2 text-center font-bold text-slate-700">
                {currentStep.prompt}
              </p>
            </div>

            {/* tap targets */}
            <div className="relative mt-4 grid grid-cols-5 gap-2">
              <GentleSparkles burstKey={sparkleKey} />
              {Array.from({ length: currentStep.count }, (_, i) => {
                const done = tapped.includes(i);
                return (
                  <motion.button
                    key={i}
                    onClick={() => handleTap(i)}
                    disabled={done}
                    whileHover={done ? undefined : { scale: 1.08 }}
                    whileTap={done ? undefined : { scale: 0.9 }}
                    animate={done ? { scale: [1, 1.2, 1] } : undefined}
                    transition={{ duration: 0.3 }}
                    className={`flex aspect-square min-h-[44px] items-center justify-center rounded-2xl text-2xl shadow-md transition-colors ${
                      done
                        ? "bg-emerald-400 text-white shadow-emerald-300/60"
                        : "bg-white/90 text-slate-400 shadow-slate-200/40"
                    }`}
                    aria-label={
                      done
                        ? `Item ${i + 1} sudah ditandai`
                        : `Tandai item ${i + 1}`
                    }
                  >
                    {done ? "✓" : currentStep.emoji}
                  </motion.button>
                );
              })}
            </div>

            <p className="mt-3 text-center text-xs text-slate-500">
              Ketuk tombol di atas setiap kali kamu menemukan satu hal. Nggak
              perlu cepat-cepat.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </GameShell>
  );
}
