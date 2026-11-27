"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import GentleSparkles from "./GentleSparkles";
import { useMoodHistory, MoodType } from "@/lib/storage";
import { MOOD_CONFIGS } from "@/content/moods";

export default function MoodStrip() {
  const { todayEntry, saveMood } = useMoodHistory();
  const [burstKey, setBurstKey] = useState(0);

  const moodsList = Object.keys(MOOD_CONFIGS) as MoodType[];
  const currentMood = todayEntry ? todayEntry.mood : null;
  const activeConfig = currentMood ? MOOD_CONFIGS[currentMood] : null;

  const handlePick = (type: MoodType) => {
    saveMood(type);
    setBurstKey((k) => k + 1);
  };

  return (
    <section className="glass-surface relative rounded-3xl bg-white/70 p-4 shadow-md backdrop-blur border border-white/60">
      <GentleSparkles burstKey={burstKey} />

      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-bold text-slate-800">
          Hari ini lagi ngerasa apa? 🌤️
        </h2>
        <Link
          href="/perasaan"
          className="text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline"
        >
          {todayEntry ? "Lihat Riwayat →" : "Buka Jurnal →"}
        </Link>
      </div>

      {/* Mood Selector Buttons */}
      <div className="mt-3 grid grid-cols-6 gap-1.5">
        {moodsList.map((type) => {
          const cfg = MOOD_CONFIGS[type];
          const isSelected = currentMood === type;

          return (
            <motion.button
              key={type}
              type="button"
              onClick={() => handlePick(type)}
              aria-pressed={isSelected}
              aria-label={cfg.label}
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              animate={{ scale: isSelected ? 1.15 : 1 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              className={`flex aspect-square min-h-11 items-center justify-center rounded-2xl text-2xl transition-all ${
                isSelected
                  ? `bg-white shadow-md ring-2 ${cfg.ringColor}`
                  : "bg-white/80 hover:bg-white"
              }`}
            >
              <span className="leading-none">{cfg.emoji}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Message and action button */}
      <AnimatePresence mode="wait">
        {activeConfig && (
          <motion.div
            key={currentMood}
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-2xl bg-white/80 p-3 text-center shadow-2xs border border-slate-100">
              <p className="text-xs font-semibold text-slate-700">
                {activeConfig.reassurance}
              </p>
            </div>

            <div className="mt-2.5 flex gap-2">
              <Link
                href="/perasaan"
                className="flex-1 rounded-xl bg-slate-100 py-2 text-center text-xs font-bold text-slate-700 hover:bg-slate-200 active:scale-95 transition"
              >
                ✏️ Tambah Catatan
              </Link>
              {activeConfig.recommendation.href && (
                <Link
                  href={activeConfig.recommendation.href}
                  className="flex-1 rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 py-2 text-center text-xs font-bold text-white shadow-xs active:scale-95 transition"
                >
                  {activeConfig.recommendation.cta}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
