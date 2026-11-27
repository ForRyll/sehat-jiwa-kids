"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import Mascot from "@/components/Mascot";
import GentleSparkles from "@/components/GentleSparkles";
import GlassCard from "@/components/GlassCard";
import {
  useCalmMode,
  useDarkMode,
  useTextSize,
  useHapticSetting,
  useSoundSetting,
  useMoodHistory,
  useDiaryEntries,
  useReadMateri,
  useFavoriteMateri,
  useFavoriteAfirmasi,
  clearAllAppData,
  exportAllAppData,
  writeStorageRaw,
  STORAGE_KEYS,
  TextSize,
  useMotionSafe,
} from "@/lib/storage";

export default function PengaturanPage() {
  const reduceMotion = useMotionSafe();

  // Settings hooks
  const { calmMode, toggleCalmMode } = useCalmMode();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { textSize, setTextSize } = useTextSize();
  const { hapticEnabled, toggleHaptic } = useHapticSetting();
  const { soundEnabled, toggleSound } = useSoundSetting();

  // Data stats
  const { entries: moodEntries } = useMoodHistory();
  const { entries: diaryEntries } = useDiaryEntries();
  const { items: readMateri } = useReadMateri();
  const { items: favMateri } = useFavoriteMateri();
  const { items: favAfirmasi } = useFavoriteAfirmasi();

  // Local UI states
  const [burstKey, setBurstKey] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetTutorial = () => {
    writeStorageRaw(STORAGE_KEYS.ONBOARDING_DONE, "0");
    setBurstKey((k) => k + 1);
    showToast("Tutorial awal berhasil diaktifkan kembali! ☁️");
  };

  const handleExportBackup = () => {
    const ok = exportAllAppData();
    if (ok) {
      showToast("Cadangan data berhasil diunduh (.json) 📥");
    } else {
      showToast("Gagal mengunduh cadangan data.");
    }
  };

  const handleClearAll = () => {
    clearAllAppData();
    setShowResetConfirm(false);
    setBurstKey((k) => k + 1);
    showToast("Seluruh data lokal telah dibersihkan.");
  };

  return (
    <PageShell tone="neutral" backHref="/">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-slate-900/90 text-white px-4 py-2.5 text-xs font-bold shadow-xl backdrop-blur"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER SECTION */}
      <div className="relative text-center">
        <GentleSparkles burstKey={burstKey} />

        {/* Mascot */}
        <div className="mx-auto flex justify-center py-2">
          <Mascot
            size={110}
            mood="tenang"
            interactive={true}
            onReact={() => setBurstKey((k) => k + 1)}
          />
        </div>

        <h1 className="mt-2 text-2xl font-black text-slate-800">
          Pengaturan & Preferensi ⚙️
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Atur kenyamanan visual, animasi, dan kelola datamu secara mandiri.
        </p>
      </div>

      <div className="mt-6 space-y-5 mb-8">
        {/* BAGIAN 1: TAMPILAN & ANIMASI */}
        <GlassCard className="p-4 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Tampilan & Animasi
          </h2>

          {/* Toggle Mode Tenang */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-sm font-bold text-slate-800 block">
                Mode Tenang 🫧
              </span>
              <span className="text-xs text-slate-500 block leading-relaxed">
                Mematikan animasi ambient dan meminimalkan transisi layar agar lebih tenang di mata.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={calmMode}
              onClick={toggleCalmMode}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors ${
                calmMode ? "bg-sky-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform my-1 mx-1 ${
                  calmMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <hr className="border-slate-200/60" />

          {/* Toggle Mode Gelap */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-sm font-bold text-slate-800 block">
                Mode Gelap 🌙
              </span>
              <span className="text-xs text-slate-500 block leading-relaxed">
                Warna gelap lembut untuk kenyamanan membaca di malam hari.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={darkMode}
              onClick={toggleDarkMode}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors ${
                darkMode ? "bg-indigo-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform my-1 mx-1 ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <hr className="border-slate-200/60" />

          {/* Pilihan Ukuran Teks */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-bold text-slate-800">
                Ukuran Teks 🔍
              </span>
              <span className="text-xs font-semibold text-sky-600 capitalize">
                {textSize}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Sesuaikan besaran huruf agar nyaman dibaca di layar HP-mu.
            </p>

            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: "normal", label: "Normal", scale: "100%" },
                  { id: "medium", label: "Sedang", scale: "106%" },
                  { id: "large", label: "Besar", scale: "112%" },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTextSize(t.id as TextSize)}
                  className={`rounded-xl py-2 px-1 text-center transition active:scale-95 border ${
                    textSize === t.id
                      ? "bg-sky-500 text-white font-extrabold border-sky-600 shadow-xs"
                      : "bg-white/80 text-slate-700 font-semibold border-slate-200 hover:bg-white"
                  }`}
                >
                  <span className="block text-xs">{t.label}</span>
                  <span className="block text-[10px] opacity-80">{t.scale}</span>
                </button>
              ))}
            </div>

            {/* Preview text */}
            <div className="mt-3 rounded-2xl bg-white/70 p-3 text-xs leading-relaxed text-slate-600 border border-slate-200/50">
              Pratinjau: &ldquo;Kesehatan mental sama pentingnya dengan kesehatan fisik.&rdquo;
            </div>
          </div>
        </GlassCard>

        {/* BAGIAN 2: SENSORI & AKSESIBILITAS */}
        <GlassCard className="p-4 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Aksesibilitas & Sensori
          </h2>

          {/* Getaran Haptic */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-sm font-bold text-slate-800 block">
                Getaran Haptic 📳
              </span>
              <span className="text-xs text-slate-500 block leading-relaxed">
                Umpan balik getaran halus saat latihan napas atau menekan tombol tertentu (perangkat yang mendukung).
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={hapticEnabled}
              onClick={toggleHaptic}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors ${
                hapticEnabled ? "bg-sky-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform my-1 mx-1 ${
                  hapticEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <hr className="border-slate-200/60" />

          {/* Efek Suara */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-sm font-bold text-slate-800 block">
                Efek Suara 🎵
              </span>
              <span className="text-xs text-slate-500 block leading-relaxed">
                Suara relaksasi tambahan saat bermain game (default: mati).
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={soundEnabled}
              onClick={toggleSound}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors ${
                soundEnabled ? "bg-sky-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform my-1 mx-1 ${
                  soundEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </GlassCard>

        {/* BAGIAN 3: PANDUAN AWAL */}
        <GlassCard className="p-4 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Panduan & Tutorial
          </h2>
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-sm font-bold text-slate-800 block">
                Tutorial Pengenalan ☁️
              </span>
              <span className="text-xs text-slate-500 block">
                Putar ulang tutorial 3 slide panduan awal bersama Awan.
              </span>
            </div>
            <button
              type="button"
              onClick={handleResetTutorial}
              className="shrink-0 rounded-xl bg-sky-50 border border-sky-200 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-100 active:scale-95 transition"
            >
              Putar Ulang
            </button>
          </div>
        </GlassCard>

        {/* BAGIAN 4: PRIVASI & DATA LOKAL */}
        <GlassCard className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Privasi & Data Lokal
            </h2>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              🔒 100% di HP-mu
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Aplikasi ini tidak memiliki server basis data dan tidak meminta login.
            Seluruh data catatan, jurnal perasaan, dan progres tersimpan murni di perangkat ini.
          </p>

          {/* Data Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="rounded-xl bg-white/70 p-2.5 border border-slate-100">
              <span className="block text-base font-black text-slate-800">
                {readMateri.length}
              </span>
              <span className="block text-[10px] font-semibold text-slate-500">
                Materi Dibaca
              </span>
            </div>
            <div className="rounded-xl bg-white/70 p-2.5 border border-slate-100">
              <span className="block text-base font-black text-slate-800">
                {moodEntries.length}
              </span>
              <span className="block text-[10px] font-semibold text-slate-500">
                Cek Perasaan
              </span>
            </div>
            <div className="rounded-xl bg-white/70 p-2.5 border border-slate-100">
              <span className="block text-base font-black text-slate-800">
                {diaryEntries.length}
              </span>
              <span className="block text-[10px] font-semibold text-slate-500">
                Catatan Diary
              </span>
            </div>
            <div className="rounded-xl bg-white/70 p-2.5 border border-slate-100">
              <span className="block text-base font-black text-slate-800">
                {favMateri.length + favAfirmasi.length}
              </span>
              <span className="block text-[10px] font-semibold text-slate-500">
                Item Favorit
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={handleExportBackup}
              className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 active:scale-95 transition"
            >
              <span>📥</span>
              <span>Cadangkan Seluruh Data (.json)</span>
            </button>

            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-rose-50 border border-rose-200 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-100 active:scale-95 transition"
            >
              <span>🗑️</span>
              <span>Hapus Semua Data di Perangkat Ini</span>
            </button>
          </div>
        </GlassCard>

        {/* BAGIAN 5: TENTANG & TAUTAN PENTING */}
        <div className="text-center text-xs text-slate-500 space-y-2 pt-2">
          <p className="font-semibold text-slate-600">
            Website Edukasi Kesehatan Mental Mahasiswa (PKM)
          </p>
          <div className="flex justify-center gap-4 text-xs font-bold text-sky-600">
            <Link href="/tentang" className="hover:underline">
              Tentang Kami
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/bantuan" className="hover:underline">
              Kontak Bantuan
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/progres" className="hover:underline">
              Lencana Saya
            </Link>
          </div>
          <p className="text-[11px] text-slate-400">
            Versi 1.0 • Tanpa pelacakan pribadi • Dibuat dengan penuh cinta 💜
          </p>
        </div>
      </div>

      {/* CONFIRMATION MODAL TO CLEAR ALL DATA */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={reduceMotion ? undefined : { scale: 0.9, opacity: 0 }}
              animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
              exit={reduceMotion ? undefined : { scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl text-center"
            >
              <span className="text-4xl block mb-2" aria-hidden>
                ⚠️
              </span>
              <h2 className="text-base font-extrabold text-slate-800">
                Hapus Seluruh Data Aplikasi?
              </h2>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Tindakan ini akan mengosongkan jurnal perasaan, catatan harian, progres lencana,
                dan preferensi di browser ini. Data yang terhapus tidak dapat dikembalikan kecuali kamu memiliki file cadangan (.json).
              </p>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="flex-1 rounded-xl bg-rose-500 py-2.5 text-xs font-bold text-white hover:bg-rose-600 transition shadow-sm"
                >
                  Ya, Hapus Semua
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
