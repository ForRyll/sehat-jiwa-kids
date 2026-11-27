"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import GameShell from "@/components/GameShell";
import Mascot from "@/components/Mascot";
import GentleSparkles from "@/components/GentleSparkles";
import GlassCard from "@/components/GlassCard";
import { useMotionSafe, useGameStats } from "@/lib/storage";
import {
  CERITA_SCENARIOS,
  InteractiveScenario,
  StoryNode,
} from "@/content/cerita-interaktif";

export default function CeritaInteraktifPage() {
  const reduceMotion = useMotionSafe();
  const { recordGame } = useGameStats();

  const [activeScenario, setActiveScenario] =
    useState<InteractiveScenario | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string>("start");
  const [history, setHistory] = useState<string[]>([]);
  const [burstKey, setBurstKey] = useState(0);

  // Pick scenario
  const handleSelectScenario = (scenario: InteractiveScenario) => {
    setActiveScenario(scenario);
    setCurrentNodeId(scenario.initialNodeId);
    setHistory([]);
    setBurstKey((k) => k + 1);
  };

  // Choose option
  const handlePickOption = (nextNodeId: string) => {
    setHistory((prev) => [...prev, currentNodeId]);
    setCurrentNodeId(nextNodeId);

    // If next node has ending, trigger celebration and record game stat
    if (activeScenario && activeScenario.nodes[nextNodeId]?.ending) {
      setBurstKey((k) => k + 1);
      recordGame("ceritaCount", 1);
    }
  };

  // Go back one step
  const handleBackStep = () => {
    if (history.length === 0) return;
    const prevNodeId = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrentNodeId(prevNodeId);
  };

  // Restart current scenario
  const handleRestartScenario = () => {
    if (!activeScenario) return;
    setCurrentNodeId(activeScenario.initialNodeId);
    setHistory([]);
    setBurstKey((k) => k + 1);
  };

  // Current active node
  const currentNode: StoryNode | undefined =
    activeScenario?.nodes[currentNodeId];

  return (
    <GameShell tone="violet">
      <GentleSparkles burstKey={burstKey} />

      {/* VIEW 1: SCENARIO SELECTION SCREEN */}
      {!activeScenario && (
        <div className="relative text-center">
          <div className="mx-auto flex justify-center py-2">
            <Mascot
              size={110}
              mood="senang"
              interactive={true}
              onReact={() => setBurstKey((k) => k + 1)}
            />
          </div>

          <h1 className="mt-2 text-2xl font-black text-slate-800">
            Cerita Interaktif 🎭
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Hadapi dinamika perkuliahan. Tanpa pilihan yang &ldquo;salah&rdquo;, temukan strategi koping terbaikmu.
          </p>

          <div className="mt-6 space-y-3.5 text-left mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              Pilih Skenario Cerita
            </h2>

            {CERITA_SCENARIOS.map((scen, idx) => (
              <motion.div
                key={scen.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <GlassCard className="p-4 cursor-pointer hover:shadow-md transition">
                  <div
                    onClick={() => handleSelectScenario(scen)}
                    className="flex items-start gap-3.5"
                  >
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-2xl shrink-0 shadow-xs"
                      aria-hidden
                    >
                      {scen.emoji}
                    </span>
                    <div className="flex-1">
                      <span className="inline-block rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-bold text-violet-700 mb-1">
                        {scen.category}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-800 leading-snug">
                        {scen.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {scen.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-500 pb-4">
            💡 Setiap alur membuka refleksi koping berbasis psikologi kesehatan mental mahasiswa.
          </p>
        </div>
      )}

      {/* VIEW 2: ACTIVE STORYPLAY SCREEN */}
      {activeScenario && currentNode && (
        <div className="space-y-4">
          {/* Top navigation inside story */}
          <div className="flex items-center justify-between gap-2 pt-2">
            <button
              onClick={() => setActiveScenario(null)}
              className="inline-flex items-center gap-1 rounded-xl bg-white/80 px-2.5 py-1 text-xs font-bold text-slate-600 hover:bg-white active:scale-95 transition shadow-2xs"
            >
              <span>✕</span>
              <span>Ganti Skenario</span>
            </button>

            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-extrabold text-violet-800">
              {activeScenario.category}
            </span>
          </div>

          {/* Mascot in story */}
          <div className="flex flex-col items-center text-center">
            <motion.div
              key={currentNode.mascotMood}
              initial={reduceMotion ? undefined : { scale: 0.9, opacity: 0.8 }}
              animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            >
              <Mascot
                size={95}
                mood={currentNode.mascotMood}
                interactive={true}
                onReact={() => setBurstKey((k) => k + 1)}
              />
            </motion.div>
          </div>

          {/* Narrative Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNode.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <GlassCard className="p-5 relative overflow-hidden">
                <span className="text-xs font-bold text-violet-600 uppercase tracking-wider block mb-2">
                  {activeScenario.title}
                </span>

                <p className="text-sm leading-relaxed text-slate-700 font-medium whitespace-pre-line">
                  {currentNode.narrative}
                </p>
              </GlassCard>

              {/* NON-ENDING NODE: OPTIONS */}
              {currentNode.options && (
                <div className="mt-4 space-y-2.5">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
                    Apa langkah yang kamu pilih?
                  </p>

                  {currentNode.options.map((opt) => (
                    <motion.button
                      key={opt.nextNodeId}
                      onClick={() => handlePickOption(opt.nextNodeId)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-start gap-3 w-full rounded-2xl bg-white/90 p-4 text-left shadow-sm border border-violet-100 hover:border-violet-300 hover:bg-white active:scale-95 transition"
                    >
                      <span className="text-2xl shrink-0" aria-hidden>
                        {opt.emoji}
                      </span>
                      <span className="text-xs font-bold text-slate-800 leading-snug pt-0.5">
                        {opt.text}
                      </span>
                    </motion.button>
                  ))}

                  {history.length > 0 && (
                    <button
                      onClick={handleBackStep}
                      className="mt-2 text-center w-full py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700"
                    >
                      ← Kembali ke langkah sebelumnya
                    </button>
                  )}
                </div>
              )}

              {/* ENDING NODE: REFLECTION & COPING INSIGHT */}
              {currentNode.ending && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-5 space-y-4 mb-8"
                >
                  <GlassCard className="p-5 border-emerald-200 bg-linear-to-b from-white to-emerald-50/50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl" aria-hidden>
                        🌟
                      </span>
                      <h3 className="text-sm font-black text-emerald-900">
                        {currentNode.ending.title}
                      </h3>
                    </div>

                    <p className="text-xs leading-relaxed text-slate-700 mb-4">
                      {currentNode.ending.outcome}
                    </p>

                    {/* Coping Insight Box */}
                    <div className="rounded-2xl bg-amber-50/90 p-3.5 border border-amber-200/70 mb-3">
                      <span className="text-[11px] font-bold text-amber-900 block mb-1">
                        💡 Wawasan Koping:
                      </span>
                      <p className="text-xs leading-relaxed text-amber-950">
                        {currentNode.ending.copingInsight}
                      </p>
                    </div>

                    {/* Coping Tips List */}
                    <div className="rounded-2xl bg-white/80 p-3.5 border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-700 block mb-2">
                        📋 Tips Praktis untuk Diterapkan:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {currentNode.ending.copingTips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold shrink-0">
                              ✓
                            </span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Related Article Link */}
                    {currentNode.ending.materiSlug && (
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <Link
                          href={`/belajar/${currentNode.ending.materiSlug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:underline"
                        >
                          <span>📖 Baca materi edukasi:</span>
                          <span>{currentNode.ending.materiTitle} →</span>
                        </Link>
                      </div>
                    )}
                  </GlassCard>

                  {/* Ending Action Buttons */}
                  <div className="flex flex-col gap-2 pt-1">
                    <motion.button
                      onClick={handleRestartScenario}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-full rounded-2xl bg-linear-to-r from-violet-400 via-fuchsia-400 to-pink-400 py-3 text-xs font-extrabold text-white shadow-md shadow-violet-200"
                    >
                      Coba Pilihan Lain di Skenario Ini 🔄
                    </motion.button>

                    <button
                      onClick={() => setActiveScenario(null)}
                      className="w-full rounded-2xl bg-white/80 py-2.5 text-xs font-bold text-slate-600 hover:bg-white active:scale-95 transition shadow-2xs"
                    >
                      Pilih Skenario Lain 🎭
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </GameShell>
  );
}
