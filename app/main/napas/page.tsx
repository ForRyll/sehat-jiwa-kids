"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import GameShell from "@/components/GameShell";

const phases = [
  { label: "Tarik napas…", hint: "Hirup pelan lewat hidung", seconds: 4, scale: 1.55 },
  { label: "Tahan…", hint: "Tahan dengan santai", seconds: 4, scale: 1.55 },
  { label: "Buang pelan-pelan…", hint: "Hembuskan lewat mulut", seconds: 6, scale: 1 },
];

export default function NapasPage() {
  const reduceMotion = useReducedMotion();
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => {
      const nextPhase = (phase + 1) % phases.length;
      if (nextPhase === 0) setCycles((c) => c + 1);
      setPhase(nextPhase);
    }, phases[phase].seconds * 1000);
    return () => clearTimeout(timer);
  }, [running, phase]);

  const current = phases[phase];

  const toggle = () => {
    setPhase(0);
    if (!running) setCycles(0);
    setRunning((r) => !r);
  };

  // tiga lapisan orb bergerak sedikit berurutan supaya terasa seperti riak
  const layer = (delay: number, boost: number) => ({
    animate: running
      ? { scale: current.scale * boost }
      : reduceMotion
        ? { scale: 1 }
        : { scale: [1, 1.06, 1] },
    transition: running
      ? { duration: current.seconds, ease: "easeInOut" as const, delay }
      : reduceMotion
        ? { duration: 0.3 }
        : { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
  });

  return (
    <GameShell tone="sky">
      <h1 className="mt-5 text-center text-2xl font-extrabold text-slate-700">
        Latihan Napas 🌬️
      </h1>
      <p className="mt-2 text-center text-slate-600">
        Ikuti ritme lingkaran. Santai aja, nggak ada yang salah.
      </p>

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative flex h-80 w-80 items-center justify-center">
          {/* cincin progres per fase */}
          <svg
            viewBox="0 0 320 320"
            className="absolute inset-0 -rotate-90"
            aria-hidden
          >
            <circle
              cx="160"
              cy="160"
              r="150"
              fill="none"
              stroke="white"
              strokeOpacity="0.5"
              strokeWidth="6"
            />
            {running && (
              <motion.circle
                key={phase}
                cx="160"
                cy="160"
                r="150"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: current.seconds, ease: "linear" }}
              />
            )}
          </svg>

          {/* lapisan orb */}
          <motion.div
            className="absolute h-36 w-36 rounded-full bg-sky-300/30 blur-xl"
            {...layer(0.3, 1.25)}
          />
          <motion.div
            className="absolute h-36 w-36 rounded-full border-2 border-white/70 bg-white/20"
            {...layer(0.15, 1.1)}
          />
          <motion.div
            className="flex h-36 w-36 items-center justify-center rounded-full bg-linear-to-br from-sky-300 to-indigo-400 shadow-xl shadow-sky-400/40"
            {...layer(0, 1)}
          >
            <span className="text-4xl" aria-hidden>
              ☁️
            </span>
          </motion.div>
        </div>

        <div className="mt-6 h-16 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={running ? phase : "idle"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-xl font-bold text-slate-700"
            >
              {running ? current.label : "Siap?"}
            </motion.p>
          </AnimatePresence>
          <p className="mt-1 text-sm text-slate-500">
            {running ? current.hint : "Mulai kalau kamu sudah nyaman"}
          </p>
        </div>

        <div className="mt-2 flex items-center gap-2" aria-hidden>
          {phases.map((p, i) => (
            <span
              key={p.label}
              className={`h-2 rounded-full transition-all duration-300 ${
                running && i === phase
                  ? "w-6 bg-sky-500"
                  : "w-2 bg-white/80"
              }`}
            />
          ))}
        </div>
        <p className="mt-3 h-5 text-xs font-semibold text-slate-500">
          {running && cycles > 0 ? `Putaran selesai: ${cycles} 🎉` : ""}
        </p>
      </div>

      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        className={`mx-auto w-full max-w-xs rounded-full py-3.5 text-lg font-bold shadow-lg transition-colors ${
          running
            ? "bg-white text-sky-600 shadow-sky-200"
            : "bg-linear-to-r from-sky-400 to-indigo-400 text-white shadow-sky-300/60"
        }`}
      >
        {running ? "Berhenti" : "Mulai"}
      </motion.button>

      <p className="mx-auto mt-4 max-w-xs text-center text-xs text-slate-500">
        Kalau kamu merasa pusing, berhenti dan bernapas seperti biasa.
      </p>
    </GameShell>
  );
}
