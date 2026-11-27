"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import Mascot from "@/components/Mascot";
import GentleSparkles from "@/components/GentleSparkles";
import GlassCard from "@/components/GlassCard";
import { useMoodHistory, MoodType, MoodEntry, useMotionSafe } from "@/lib/storage";
import { MOOD_CONFIGS, COMMON_MOOD_TAGS } from "@/content/moods";

export default function PerasaanPage() {
  const reduceMotion = useMotionSafe();
  const { entries, todayEntry, saveMood, deleteEntry } = useMoodHistory();

  // Selected mood in the form
  const [selectedMood, setSelectedMood] = useState<MoodType>(
    todayEntry ? todayEntry.mood : "senang"
  );
  const [note, setNote] = useState<string>(todayEntry?.note || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    todayEntry?.tags || []
  );
  const [isEditing, setIsEditing] = useState<boolean>(!todayEntry);
  const [burstKey, setBurstKey] = useState<number>(0);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  // Active configuration based on selected mood
  const currentConfig = MOOD_CONFIGS[selectedMood];

  // Toggle tag
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Handle save
  const handleSave = () => {
    saveMood(selectedMood, note.trim(), selectedTags);
    setBurstKey((k) => k + 1);
    setIsEditing(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3500);
  };

  // Start editing again
  const handleEditAgain = () => {
    if (todayEntry) {
      setSelectedMood(todayEntry.mood);
      setNote(todayEntry.note || "");
      setSelectedTags(todayEntry.tags || []);
    }
    setIsEditing(true);
  };

  // Past 7 days calculation for mini visual calendar
  const past7Days = useMemo(() => {
    const list: { dateStr: string; dayName: string; dayNum: number; entry: MoodEntry | null }[] = [];
    const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      const found = entries.find((e) => e.date === dateStr) || null;
      list.push({
        dateStr,
        dayName: days[d.getDay()],
        dayNum: d.getDate(),
        entry: found,
      });
    }
    return list;
  }, [entries]);

  // Format Indonesian date
  const formatDateIndo = (dateStr: string) => {
    try {
      const [y, m, d] = dateStr.split("-").map(Number);
      const date = new Date(y, m - 1, d);
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <PageShell tone="amber" backHref="/">
      <div className="relative text-center">
        <GentleSparkles burstKey={burstKey} />

        {/* Mascot changing expression dynamically */}
        <div className="mx-auto flex justify-center py-2">
          <motion.div
            key={currentConfig.mascotMood}
            initial={reduceMotion ? undefined : { scale: 0.85, opacity: 0.8 }}
            animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Mascot
              size={120}
              mood={currentConfig.mascotMood}
              interactive={true}
              onReact={() => setBurstKey((k) => k + 1)}
            />
          </motion.div>
        </div>

        <h1 className="mt-2 text-2xl font-black text-slate-800">
          Cek Perasaan Harian 🌤️
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Ruang aman untuk menyadari dan memvalidasi apa yang kamu rasakan hari ini.
        </p>
      </div>

      {/* Success banner */}
      <AnimatePresence>
        {savedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="mt-4 rounded-2xl bg-emerald-500 p-3 text-center text-sm font-bold text-white shadow-md shadow-emerald-200"
          >
            ✨ Perasaanmu hari ini berhasil disimpan! Terima kasih sudah hadir untuk dirimu.
          </motion.div>
        )}
      </AnimatePresence>

      {/* TODAY'S SUMMARY CARD (when not editing) */}
      {!isEditing && todayEntry ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <GlassCard className="relative overflow-hidden p-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded-full bg-slate-200/80 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                  Hari ini, {formatDateIndo(todayEntry.date)}
                </span>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-3xl" aria-hidden>
                    {MOOD_CONFIGS[todayEntry.mood].emoji}
                  </span>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800">
                      {MOOD_CONFIGS[todayEntry.mood].label}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {MOOD_CONFIGS[todayEntry.mood].subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleEditAgain}
                className="flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 active:scale-95 transition"
              >
                ✏️ Ubah
              </button>
            </div>

            {/* Note & Tags */}
            {todayEntry.tags && todayEntry.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {todayEntry.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-slate-600 shadow-2xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {todayEntry.note && (
              <div className="mt-3 rounded-2xl bg-white/70 p-3 text-sm italic text-slate-700 shadow-2xs">
                &ldquo;{todayEntry.note}&rdquo;
              </div>
            )}

            {/* Mascot message */}
            <div className="mt-4 rounded-2xl bg-amber-50/90 p-3.5 border border-amber-200/60">
              <p className="text-xs font-bold text-amber-900 mb-1">
                💬 Pesan dari Awan:
              </p>
              <p className="text-xs leading-relaxed text-amber-950">
                {MOOD_CONFIGS[todayEntry.mood].reassurance}
              </p>
            </div>

            {/* Recommended Activity */}
            <div className="mt-3 flex flex-col gap-2 rounded-2xl bg-white/80 p-3.5 shadow-xs">
              <p className="text-xs text-slate-600">
                {MOOD_CONFIGS[todayEntry.mood].recommendation.text}
              </p>
              <Link
                href={MOOD_CONFIGS[todayEntry.mood].recommendation.href}
                className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 py-2 px-3 text-xs font-bold text-white shadow-sm hover:opacity-95 active:scale-95 transition"
              >
                {MOOD_CONFIGS[todayEntry.mood].recommendation.cta}
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      ) : (
        /* EDITING / INPUT FORM */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-5"
        >
          {/* Mood Selector Grid */}
          <GlassCard className="p-4">
            <h2 className="text-center text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Pilih Mood Kamu Saat Ini
            </h2>

            <div className="grid grid-cols-3 gap-2.5">
              {(Object.keys(MOOD_CONFIGS) as MoodType[]).map((type) => {
                const cfg = MOOD_CONFIGS[type];
                const isSelected = selectedMood === type;

                return (
                  <motion.button
                    key={type}
                    type="button"
                    onClick={() => {
                      setSelectedMood(type);
                      setBurstKey((k) => k + 1);
                    }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex min-h-[76px] flex-col items-center justify-center rounded-2xl p-2.5 transition-all ${
                      isSelected
                        ? `bg-white shadow-md ring-2 ${cfg.ringColor}`
                        : "bg-white/60 hover:bg-white/80"
                    }`}
                  >
                    <span className="text-3xl leading-none" aria-hidden>
                      {cfg.emoji}
                    </span>
                    <span
                      className={`mt-1.5 text-xs font-bold ${
                        isSelected ? "text-slate-800" : "text-slate-600"
                      }`}
                    >
                      {cfg.label}
                    </span>
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white shadow-xs">
                        ✓
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Validation Message Box */}
            <div className="mt-3.5 rounded-2xl bg-white/70 p-3 text-center border border-slate-100">
              <p className="text-xs leading-relaxed text-slate-700">
                {currentConfig.reassurance}
              </p>
            </div>
          </GlassCard>

          {/* Quick Trigger Tags */}
          <GlassCard className="p-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Apa yang mempengaruhi perasaanmu? <span className="text-[11px] font-normal normal-case text-slate-400">(opsional)</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {COMMON_MOOD_TAGS.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`min-h-9 rounded-xl px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${
                      active
                        ? "bg-sky-500 text-white shadow-sm ring-1 ring-sky-300"
                        : "bg-white/80 text-slate-600 hover:bg-white"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </GlassCard>

          {/* Optional Short Reflection Note */}
          <GlassCard className="p-4">
            <div className="flex justify-between items-center mb-1.5">
              <label
                htmlFor="mood-note"
                className="text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                Catatan Singkat <span className="font-normal normal-case text-slate-400">(opsional)</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {note.length}/200
              </span>
            </div>
            <textarea
              id="mood-note"
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 200))}
              placeholder="Contoh: Capek habis presentasi tugas, tapi lega udah lewat..."
              rows={3}
              className="w-full rounded-2xl border border-slate-200/80 bg-white/90 p-3 text-sm text-slate-700 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200 transition"
            />
          </GlassCard>

          {/* Action Button */}
          <div className="pt-1">
            <motion.button
              type="button"
              onClick={handleSave}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="w-full min-h-[48px] rounded-full bg-linear-to-r from-amber-400 via-orange-400 to-rose-400 py-3.5 text-base font-extrabold text-white shadow-lg shadow-orange-300/50 hover:shadow-orange-300/70 transition"
            >
              Simpan Perasaan Hari Ini ✨
            </motion.button>
            {todayEntry && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="mt-2 w-full py-2 text-center text-xs font-bold text-slate-500 hover:text-slate-700"
              >
                Batal
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* 7-DAY MINI CALENDAR / TREND */}
      <div className="mt-8">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Riwayat 7 Hari Terakhir 📅
            </h2>
            <span className="text-[11px] text-slate-500">
              {entries.length} hari tercatat
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {past7Days.map((item, idx) => {
              const isToday = idx === 6;
              const hasMood = item.entry !== null;
              const moodCfg = hasMood ? MOOD_CONFIGS[item.entry!.mood] : null;

              return (
                <div
                  key={item.dateStr}
                  className={`flex flex-col items-center justify-center rounded-2xl py-2 px-1 transition ${
                    isToday
                      ? "bg-amber-100/90 ring-1 ring-amber-300/80 font-bold"
                      : "bg-white/50"
                  }`}
                >
                  <span className="text-[10px] font-semibold text-slate-500">
                    {item.dayName}
                  </span>
                  <span className="text-xs font-extrabold text-slate-700 my-0.5">
                    {item.dayNum}
                  </span>
                  <span
                    className="text-lg leading-none mt-1 h-5 flex items-center justify-center"
                    aria-label={moodCfg?.label || "Belum tercatat"}
                  >
                    {moodCfg ? moodCfg.emoji : "·"}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-3 text-center text-[11px] text-slate-500">
            Semua data perasaan hanya tersimpan aman di browser perangkatmu.
          </p>
        </GlassCard>

        {/* Link to Catatan Harian */}
        <div className="mt-4 rounded-3xl bg-linear-to-r from-rose-100 via-pink-50 to-amber-100 p-4 border border-rose-200/70 shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl" aria-hidden>
              📖
            </span>
            <div>
              <h3 className="text-xs font-bold text-slate-800">
                Mau nulis refleksi lebih leluasa?
              </h3>
              <p className="text-[11px] text-slate-600">
                Ada panduan topik & ruang bebas di Catatan Pribadi.
              </p>
            </div>
          </div>
          <Link
            href="/catatan"
            className="shrink-0 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-rose-600 shadow-2xs hover:bg-rose-50 active:scale-95 transition"
          >
            Tulis →
          </Link>
        </div>
      </div>

      {/* RECENT REFLECTIONS LOG */}
      {entries.length > 0 && (
        <div className="mt-6 mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 px-1">
            Catatan Refleksi Sebelumnya
          </h2>

          <div className="space-y-3">
            {entries.slice(0, 5).map((entry) => {
              const cfg = MOOD_CONFIGS[entry.mood];
              return (
                <GlassCard key={entry.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl" aria-hidden>
                        {cfg.emoji}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-800">
                            {cfg.label}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {formatDateIndo(entry.date)}
                          </span>
                        </div>
                        {entry.tags && entry.tags.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {entry.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-md bg-slate-100 px-1.5 py-0.2 text-[10px] text-slate-600"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => deleteEntry(entry.id)}
                      title="Hapus catatan ini"
                      className="text-xs text-slate-400 hover:text-rose-500 p-1 transition"
                      aria-label="Hapus catatan ini"
                    >
                      ✕
                    </button>
                  </div>

                  {entry.note && (
                    <p className="mt-2.5 text-xs text-slate-600 bg-white/60 p-2.5 rounded-xl italic">
                      &ldquo;{entry.note}&rdquo;
                    </p>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}
    </PageShell>
  );
}
