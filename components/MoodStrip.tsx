"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import GentleSparkles from "./GentleSparkles";

type Mood = {
  emoji: string;
  label: string;
  msg: string;
  href?: string;
  cta?: string;
};

const moods: Mood[] = [
  {
    emoji: "😄",
    label: "Senang",
    msg: "Seneng dengernya! Nikmati momen ini, dan boleh banget cerita ke orang terdekat.",
  },
  {
    emoji: "🙂",
    label: "Baik",
    msg: "Bagus, tetap pelan-pelan ya. Mau coba game santai?",
    href: "/main",
    cta: "Buka Main",
  },
  {
    emoji: "😐",
    label: "Biasa",
    msg: "Hari yang biasa aja juga nggak apa-apa. Kadang cukup rehat sebentar.",
    href: "/main/napas",
    cta: "Latihan napas",
  },
  {
    emoji: "😔",
    label: "Sedih",
    msg: "Makasih udah jujur sama perasaanmu. Coba tarik napas pelan dulu, kamu nggak sendirian.",
    href: "/main/napas",
    cta: "Latihan napas",
  },
  {
    emoji: "😣",
    label: "Berat",
    msg: "Kedengarannya lagi berat. Pelan-pelan ya, dan kamu boleh cerita ke orang yang kamu percaya.",
    href: "/bantuan",
    cta: "Lihat bantuan",
  },
];

export default function MoodStrip() {
  const [picked, setPicked] = useState<number | null>(null);
  const [burstKey, setBurstKey] = useState(0);

  return (
    <section className="glass-surface relative rounded-3xl bg-white/60 p-4 shadow-md backdrop-blur">
      <GentleSparkles burstKey={burstKey} />
      <h2 className="text-center text-sm font-bold text-slate-700">
        Hari ini lagi ngerasa apa?
      </h2>

      <div className="mt-3 flex gap-2">
        {moods.map((m, i) => (
          <motion.button
            key={m.label}
            onClick={() => {
              const next = picked === i ? null : i;
              setPicked(next);
              if (next !== null) setBurstKey((k) => k + 1);
            }}
            aria-pressed={picked === i}
            aria-label={m.label}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: picked === i ? 1.12 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={`flex-1 rounded-2xl py-2 text-2xl transition-colors ${
              picked === i
                ? "bg-white shadow-md ring-2 ring-sky-400"
                : "bg-white/70"
            }`}
          >
            {m.emoji}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {picked !== null && (
          <motion.div
            key={picked}
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-center text-sm text-slate-600">
              {moods[picked].msg}
            </p>
            {moods[picked].href && (
              <Link
                href={moods[picked].href}
                className="mt-3 block rounded-full bg-linear-to-r from-sky-400 to-indigo-400 py-2.5 text-center text-sm font-bold text-white shadow-md active:scale-95"
              >
                {moods[picked].cta}
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
