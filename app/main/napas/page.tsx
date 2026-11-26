"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GameShell from "@/components/GameShell";
import Mascot from "@/components/Mascot";
import GentleSparkles from "@/components/GentleSparkles";
import { useMotionSafe } from "@/lib/storage";

/* ---------- pola napas ---------- */
type BreathPattern = {
  id: string;
  label: string;
  desc: string;
  phases: { label: string; hint: string; seconds: number; scale: number }[];
};

const patterns: BreathPattern[] = [
  {
    id: "box",
    label: "Box Breathing",
    desc: "4-4-4-4 — cocok untuk fokus",
    phases: [
      { label: "Tarik napas…", hint: "Hirup pelan lewat hidung", seconds: 4, scale: 1.5 },
      { label: "Tahan…", hint: "Tahan dengan santai", seconds: 4, scale: 1.5 },
      { label: "Buang pelan…", hint: "Hembuskan lewat mulut", seconds: 4, scale: 1 },
      { label: "Tahan…", hint: "Jeda sejenak", seconds: 4, scale: 1 },
    ],
  },
  {
    id: "relax",
    label: "Relaksasi",
    desc: "4-4-6 — cocok untuk rileks",
    phases: [
      { label: "Tarik napas…", hint: "Hirup pelan lewat hidung", seconds: 4, scale: 1.55 },
      { label: "Tahan…", hint: "Tahan dengan santai", seconds: 4, scale: 1.55 },
      { label: "Buang pelan-pelan…", hint: "Hembuskan lewat mulut", seconds: 6, scale: 1 },
    ],
  },
];

const durationOptions = [
  { label: "1 menit", seconds: 60 },
  { label: "3 menit", seconds: 180 },
  { label: "5 menit", seconds: 300 },
];

type Stage = "setup" | "running" | "done";

export default function NapasPage() {
  const reduceMotion = useMotionSafe();

  /* ---------- state ---------- */
  const [stage, setStage] = useState<Stage>("setup");
  const [patternId, setPatternId] = useState("relax");
  const [durationIdx, setDurationIdx] = useState(1); // default 3 min
  const [hapticOn, setHapticOn] = useState(false);
  const [phase, setPhase] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [sparkleKey, setSparkleKey] = useState(0);

  const pattern = patterns.find((p) => p.id === patternId) ?? patterns[0];
  const targetSeconds = durationOptions[durationIdx].seconds;
  const current = pattern.phases[phase];

  const startTimeRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ---------- haptic helper ---------- */
  const vibrate = useCallback(
    (ms: number) => {
      if (hapticOn && typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(ms);
      }
    },
    [hapticOn],
  );

  /* ---------- elapsed & auto-finish timer ---------- */
  useEffect(() => {
    if (stage !== "running") return;
    intervalRef.current = setInterval(() => {
      const now = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsed(now);
      if (now >= targetSeconds) {
        setStage("done");
        setSparkleKey((k) => k + 1);
        vibrate(200);
      }
    }, 500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [stage, targetSeconds, vibrate]);

  /* ---------- phase cycling ---------- */
  useEffect(() => {
    if (stage !== "running") return;
    const timer = setTimeout(() => {
      const nextPhase = (phase + 1) % pattern.phases.length;
      if (nextPhase === 0) {
        setCycles((c) => c + 1);
        setSparkleKey((k) => k + 1);
      }
      vibrate(40);
      setPhase(nextPhase);
    }, current.seconds * 1000);
    return () => clearTimeout(timer);
  }, [stage, phase, current.seconds, pattern.phases.length, vibrate]);

  /* ---------- actions ---------- */
  const start = () => {
    setPhase(0);
    setCycles(0);
    setElapsed(0);
    startTimeRef.current = Date.now();
    setStage("running");
  };

  const stop = () => {
    setStage("done");
    vibrate(100);
  };

  const reset = () => {
    setStage("setup");
    setPhase(0);
    setCycles(0);
    setElapsed(0);
  };

  /* ---------- orb layer ---------- */
  const layer = (delay: number, boost: number) => ({
    animate:
      stage === "running"
        ? { scale: current.scale * boost }
        : reduceMotion
          ? { scale: 1 }
          : { scale: [1, 1.06, 1] },
    transition:
      stage === "running"
        ? { duration: current.seconds, ease: "easeInOut" as const, delay }
        : reduceMotion
          ? { duration: 0.3 }
          : { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
  });

  /* ---------- time helpers ---------- */
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  const remaining = Math.max(0, targetSeconds - elapsed);

  /* ---------- render ---------- */
  return (
    <GameShell tone="sky">
      <h1 className="mt-5 text-center text-2xl font-extrabold text-slate-700">
        Latihan Napas 🌬️
      </h1>
      <p className="mt-2 text-center text-slate-600">
        Ikuti ritme lingkaran. Santai aja, nggak ada yang salah.
      </p>

      <AnimatePresence mode="wait">
        {/* ========== SETUP ========== */}
        {stage === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="mt-5 flex flex-1 flex-col"
          >
            {/* mascot */}
            <div className="mx-auto mb-4">
              <Mascot size={100} mood="senang" />
            </div>

            {/* pattern picker */}
            <p className="text-xs font-semibold text-slate-500">Pola napas</p>
            <div className="mt-2 grid gap-2">
              {patterns.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPatternId(p.id)}
                  className={`min-h-[44px] rounded-2xl border p-3 text-left transition-colors ${
                    patternId === p.id
                      ? "border-sky-400 bg-sky-50 shadow-md shadow-sky-200/60"
                      : "border-slate-200 bg-white/80"
                  }`}
                >
                  <span className="font-bold text-slate-700">{p.label}</span>
                  <span className="ml-2 text-sm text-slate-500">{p.desc}</span>
                </button>
              ))}
            </div>

            {/* duration picker */}
            <p className="mt-4 text-xs font-semibold text-slate-500">
              Durasi sesi
            </p>
            <div className="mt-2 flex gap-2">
              {durationOptions.map((d, i) => (
                <button
                  key={d.seconds}
                  onClick={() => setDurationIdx(i)}
                  className={`min-h-[44px] flex-1 rounded-xl py-2 font-bold transition-colors ${
                    durationIdx === i
                      ? "bg-sky-400 text-white shadow-md shadow-sky-300/60"
                      : "bg-white/80 text-slate-600"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* haptic toggle */}
            <label className="mt-4 flex min-h-[44px] cursor-pointer items-center gap-3 rounded-2xl bg-white/70 p-3">
              <input
                type="checkbox"
                checked={hapticOn}
                onChange={(e) => setHapticOn(e.target.checked)}
                className="h-5 w-5 accent-sky-500"
              />
              <span className="text-sm text-slate-700">
                Getaran haptic{" "}
                <span className="text-xs text-slate-400">(jika didukung)</span>
              </span>
            </label>

            {/* start button */}
            <motion.button
              onClick={start}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="mx-auto mt-6 w-full max-w-xs rounded-full bg-linear-to-r from-sky-400 to-indigo-400 py-3.5 text-lg font-bold text-white shadow-lg shadow-sky-300/60"
            >
              Mulai
            </motion.button>
          </motion.div>
        )}

        {/* ========== RUNNING ========== */}
        {stage === "running" && (
          <motion.div
            key="running"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="flex flex-1 flex-col items-center justify-center"
          >
            {/* mascot kecil di atas orb */}
            <div className="mb-2">
              <Mascot size={64} mood="tenang" />
            </div>

            {/* orb area */}
            <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
              {/* progress ring */}
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
              </svg>

              {/* orb layers */}
              <motion.div
                className="absolute h-28 w-28 rounded-full bg-sky-300/30 blur-xl sm:h-36 sm:w-36"
                {...layer(0.3, 1.25)}
              />
              <motion.div
                className="absolute h-28 w-28 rounded-full border-2 border-white/70 bg-white/20 sm:h-36 sm:w-36"
                {...layer(0.15, 1.1)}
              />
              <motion.div
                className="flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-br from-sky-300 to-indigo-400 shadow-xl shadow-sky-400/40 sm:h-36 sm:w-36"
                {...layer(0, 1)}
              >
                <span className="text-3xl sm:text-4xl" aria-hidden>
                  ☁️
                </span>
              </motion.div>
            </div>

            {/* label & hint */}
            <div className="mt-4 h-16 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={phase}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-xl font-bold text-slate-700"
                >
                  {current.label}
                </motion.p>
              </AnimatePresence>
              <p className="mt-1 text-sm text-slate-500">{current.hint}</p>
            </div>

            {/* phase dots */}
            <div className="mt-2 flex items-center gap-2" aria-hidden>
              {pattern.phases.map((p, i) => (
                <span
                  key={p.label + i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === phase ? "w-6 bg-sky-500" : "w-2 bg-white/80"
                  }`}
                />
              ))}
            </div>

            {/* timer & cycles */}
            <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span>⏱ {formatTime(remaining)}</span>
              {cycles > 0 && <span>Putaran: {cycles} 🎉</span>}
            </div>

            {/* stop button */}
            <motion.button
              onClick={stop}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="mx-auto mt-5 w-full max-w-xs rounded-full bg-white py-3.5 text-lg font-bold text-sky-600 shadow-lg shadow-sky-200"
            >
              Berhenti
            </motion.button>
          </motion.div>
        )}

        {/* ========== DONE ========== */}
        {stage === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 16 }}
            className="relative mt-6 overflow-hidden rounded-3xl bg-white/90 p-6 text-center shadow-xl shadow-sky-200/60 backdrop-blur"
          >
            <GentleSparkles burstKey={sparkleKey} />

            <div className="mx-auto mb-3 w-fit">
              <Mascot size={90} mood="menyemangati" />
            </div>

            <h2 className="text-xl font-extrabold text-slate-700">
              Kerja bagus! 🎉
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Kamu baru saja berlatih{" "}
              <strong>{pattern.label}</strong> selama{" "}
              <strong>{formatTime(elapsed)}</strong>.
            </p>

            <div className="mt-4 rounded-2xl bg-sky-50 p-4 text-left">
              <p className="text-sm font-bold text-slate-700">
                📋 Apa yang kamu latih
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li>
                  🌬️ Pola: {pattern.label} ({pattern.desc})
                </li>
                <li>🔁 Putaran selesai: {cycles}</li>
                <li>⏱ Total waktu: {formatTime(elapsed)}</li>
              </ul>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Latihan pernapasan membantu mengaktifkan sistem saraf parasimpatik
              — membantu tubuh lebih rileks dan tenang.
            </p>

            <motion.button
              onClick={reset}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="mt-5 w-full rounded-full bg-linear-to-r from-sky-400 to-indigo-400 py-3 font-bold text-white shadow-lg shadow-sky-300/60"
            >
              Latihan lagi
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mx-auto mt-4 max-w-xs text-center text-xs text-slate-500">
        Kalau kamu merasa pusing, berhenti dan bernapas seperti biasa.
      </p>
    </GameShell>
  );
}
