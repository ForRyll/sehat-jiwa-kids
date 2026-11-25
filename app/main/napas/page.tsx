"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const phases = [
  { label: "Tarik napas…", seconds: 4, scale: 1.5 },
  { label: "Tahan…", seconds: 4, scale: 1.5 },
  { label: "Buang pelan-pelan…", seconds: 6, scale: 1 },
];

export default function NapasPage() {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(
      () => setPhase((p) => (p + 1) % phases.length),
      phases[phase].seconds * 1000
    );
    return () => clearTimeout(timer);
  }, [running, phase]);

  const current = phases[phase];

  const toggle = () => {
    setPhase(0);
    setRunning((r) => !r);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-sky-50 px-5 py-8">
      <div className="w-full max-w-md">
        <Link href="/main" className="text-sm text-slate-500">
          ← Kembali
        </Link>
      </div>

      <h1 className="mt-4 text-2xl font-bold text-slate-700">Latihan Napas</h1>
      <p className="mt-2 text-center text-slate-600">
        Ikuti ritme lingkaran. Santai aja, nggak ada yang salah.
      </p>

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex h-72 w-72 items-center justify-center">
          <motion.div
            className="h-36 w-36 rounded-full bg-sky-300/70"
            animate={{ scale: running ? current.scale : 1 }}
            transition={{
              duration: running ? current.seconds : 0.5,
              ease: "easeInOut",
            }}
          />
        </div>

        <p className="mt-4 h-8 text-xl font-semibold text-slate-700">
          {running ? current.label : "Siap?"}
        </p>
      </div>

      <button
        onClick={toggle}
        className="w-full max-w-xs rounded-full bg-sky-400 py-3 font-semibold text-white active:scale-95"
      >
        {running ? "Berhenti" : "Mulai"}
      </button>

      <p className="mt-4 max-w-xs text-center text-xs text-slate-500">
        Kalau kamu merasa pusing, berhenti dan bernapas seperti biasa.
      </p>
    </main>
  );
}