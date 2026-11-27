"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import Mascot from "@/components/Mascot";
import GentleSparkles from "@/components/GentleSparkles";
import GlassCard from "@/components/GlassCard";
import {
  useReadMateri,
  useFavoriteMateri,
  useFavoriteAfirmasi,
  useMoodHistory,
  useDiaryEntries,
  useGameStats,
  useMotionSafe,
} from "@/lib/storage";
import { BADGES, Badge, BadgeCategory, UserStats } from "@/content/badges";
import { materi } from "@/content/materi";

export default function ProgresPage() {
  const reduceMotion = useMotionSafe();

  // Storage hooks
  const { items: readMateriSlugs } = useReadMateri();
  const { items: favoriteMateriSlugs, toggle: toggleFavMateri } =
    useFavoriteMateri();
  const { items: favoriteAfirmasiList, toggle: toggleFavAfirmasi } =
    useFavoriteAfirmasi();
  const { entries: moodEntries } = useMoodHistory();
  const { entries: diaryEntries } = useDiaryEntries();
  const { stats: gameStats } = useGameStats();

  // Active view tab: "lencana" | "favorit"
  const [activeTab, setActiveTab] = useState<"lencana" | "favorit">("lencana");
  const [badgeCategory, setBadgeCategory] = useState<BadgeCategory | "semua">(
    "semua"
  );
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [burstKey, setBurstKey] = useState(0);

  // Compile user statistics
  const userStats: UserStats = useMemo(
    () => ({
      readMateriCount: readMateriSlugs.length,
      favoriteMateriCount: favoriteMateriSlugs.length,
      favoriteAfirmasiCount: favoriteAfirmasiList.length,
      moodCount: moodEntries.length,
      diaryCount: diaryEntries.length,
      napasCount: gameStats.napasCount,
      groundingCount: gameStats.groundingCount,
      mitosFaktaCount: gameStats.mitosFaktaCount,
    }),
    [
      readMateriSlugs.length,
      favoriteMateriSlugs.length,
      favoriteAfirmasiList.length,
      moodEntries.length,
      diaryEntries.length,
      gameStats,
    ]
  );

  // Calculate unlocked badges
  const badgeStatusList = useMemo(() => {
    return BADGES.map((b) => {
      const current = b.checkProgress(userStats);
      const isUnlocked = current >= b.target;
      const progressPercent = Math.min(100, Math.round((current / b.target) * 100));
      return {
        badge: b,
        current,
        isUnlocked,
        progressPercent,
      };
    });
  }, [userStats]);

  const totalUnlocked = badgeStatusList.filter((b) => b.isUnlocked).length;

  // Filtered badges by category
  const filteredBadges = useMemo(() => {
    if (badgeCategory === "semua") return badgeStatusList;
    return badgeStatusList.filter((b) => b.badge.category === badgeCategory);
  }, [badgeStatusList, badgeCategory]);

  // Favorite Materi items
  const favoriteMateriItems = useMemo(() => {
    return materi.filter((m) => favoriteMateriSlugs.includes(m.slug));
  }, [favoriteMateriSlugs]);

  const handleSelectBadge = (b: Badge) => {
    setSelectedBadge(b);
    setBurstKey((k) => k + 1);
  };

  return (
    <PageShell tone="emerald" backHref="/">
      {/* HEADER SECTION */}
      <div className="relative text-center">
        <GentleSparkles burstKey={burstKey} />

        {/* Mascot */}
        <div className="mx-auto flex justify-center py-2">
          <Mascot
            size={110}
            mood={totalUnlocked >= 3 ? "senang" : "tenang"}
            interactive={true}
            onReact={() => setBurstKey((k) => k + 1)}
          />
        </div>

        <h1 className="mt-2 text-2xl font-black text-slate-800">
          Progres & Lencana 🌟
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Setiap langkah kecilmu berharga. Belajar dan rawat dirimu tanpa tekanan.
        </p>

        {/* Supportive Badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100/90 border border-emerald-300/80 px-3.5 py-1 text-xs font-bold text-emerald-800 shadow-2xs">
          <span>🌿 Tanpa sistem streak</span>
          <span className="text-emerald-300">•</span>
          <span>Bebas beristirahat kapan pun</span>
        </div>
      </div>

      {/* OVERVIEW STATS CARDS */}
      <div className="mt-6 grid grid-cols-3 gap-2.5">
        <div className="rounded-2xl bg-white/80 p-3 text-center shadow-xs border border-white">
          <span className="text-xl block mb-0.5">📖</span>
          <span className="text-lg font-black text-slate-800 leading-tight">
            {readMateriSlugs.length}
          </span>
          <span className="text-[11px] block font-semibold text-slate-500">
            Materi Dibaca
          </span>
        </div>

        <div className="rounded-2xl bg-white/80 p-3 text-center shadow-xs border border-white">
          <span className="text-xl block mb-0.5">🧘</span>
          <span className="text-lg font-black text-slate-800 leading-tight">
            {gameStats.napasCount + gameStats.groundingCount}
          </span>
          <span className="text-[11px] block font-semibold text-slate-500">
            Sesi Relaksasi
          </span>
        </div>

        <div className="rounded-2xl bg-white/80 p-3 text-center shadow-xs border border-white">
          <span className="text-xl block mb-0.5">🏆</span>
          <span className="text-lg font-black text-slate-800 leading-tight">
            {totalUnlocked}/{BADGES.length}
          </span>
          <span className="text-[11px] block font-semibold text-slate-500">
            Lencana Diraih
          </span>
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div className="mt-6 flex rounded-2xl bg-white/60 p-1 shadow-2xs border border-white/70">
        <button
          onClick={() => setActiveTab("lencana")}
          className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition active:scale-95 ${
            activeTab === "lencana"
              ? "bg-white text-emerald-800 shadow-sm ring-1 ring-emerald-200"
              : "text-slate-600 hover:text-slate-800"
          }`}
        >
          🏆 Lencana ({totalUnlocked})
        </button>
        <button
          onClick={() => setActiveTab("favorit")}
          className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition active:scale-95 ${
            activeTab === "favorit"
              ? "bg-white text-emerald-800 shadow-sm ring-1 ring-emerald-200"
              : "text-slate-600 hover:text-slate-800"
          }`}
        >
          ⭐ Favorit ({favoriteMateriItems.length + favoriteAfirmasiList.length})
        </button>
      </div>

      {/* TAB 1: BADGES (LENCANA) */}
      {activeTab === "lencana" && (
        <div className="mt-5 space-y-4">
          {/* Category Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
            {(
              [
                { id: "semua", label: "Semua" },
                { id: "belajar", label: "📖 Belajar" },
                { id: "tenang", label: "🧘 Tenang" },
                { id: "refleksi", label: "🌤️ Refleksi" },
                { id: "game", label: "🎮 Game" },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setBadgeCategory(cat.id)}
                className={`shrink-0 rounded-xl px-3 py-1.5 font-bold transition active:scale-95 ${
                  badgeCategory === cat.id
                    ? "bg-emerald-500 text-white shadow-xs"
                    : "bg-white/70 text-slate-600 hover:bg-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {filteredBadges.map(({ badge, current, isUnlocked, progressPercent }) => (
              <motion.button
                key={badge.id}
                type="button"
                onClick={() => handleSelectBadge(badge)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex flex-col items-center justify-between rounded-3xl p-4 text-center transition shadow-sm ${
                  isUnlocked
                    ? "bg-white ring-2 ring-emerald-400 shadow-emerald-100"
                    : "bg-white/60 opacity-80"
                }`}
              >
                {/* Status pin */}
                {isUnlocked ? (
                  <span className="absolute -top-1.5 -right-1.5 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-extrabold text-white shadow-xs">
                    ✓ Terbuka
                  </span>
                ) : (
                  <span className="absolute -top-1.5 -right-1.5 rounded-full bg-slate-300 px-1.5 py-0.5 text-[9px] font-bold text-slate-600">
                    🔒
                  </span>
                )}

                {/* Badge Icon */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-xs transition ${
                    isUnlocked
                      ? `bg-linear-to-br ${badge.color} text-white shadow-md`
                      : "bg-slate-200/80 text-slate-400 grayscale"
                  }`}
                >
                  {badge.icon}
                </div>

                <div className="mt-2.5 w-full">
                  <h3 className="text-xs font-black text-slate-800 line-clamp-1">
                    {badge.title}
                  </h3>
                  <p className="mt-0.5 text-[10px] text-slate-500 line-clamp-2 leading-tight">
                    {badge.desc}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mt-3 w-full">
                  <div className="flex justify-between text-[10px] font-semibold text-slate-400 mb-1">
                    <span>
                      {Math.min(current, badge.target)}/{badge.target} {badge.unit}
                    </span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        isUnlocked ? "bg-emerald-500" : "bg-slate-400"
                      }`}
                      initial={false}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: FAVORITES (FAVORIT) */}
      {activeTab === "favorit" && (
        <div className="mt-5 space-y-6 mb-8">
          {/* Section 1: Materi Favorit */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Materi Edukasi Disimpan ({favoriteMateriItems.length})
              </h2>
              <Link
                href="/belajar"
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                Cari Materi →
              </Link>
            </div>

            {favoriteMateriItems.length === 0 ? (
              <GlassCard className="p-4 text-center">
                <span className="text-2xl block mb-1">📖</span>
                <p className="text-xs text-slate-500">
                  Belum ada materi yang kamu favoritkan. Ketuk tombol &ldquo;Simpan Favorit&rdquo; di halaman bacaan.
                </p>
              </GlassCard>
            ) : (
              <div className="space-y-2.5">
                {favoriteMateriItems.map((m) => (
                  <GlassCard key={m.slug} className="p-3.5 flex items-center justify-between gap-3">
                    <Link
                      href={`/belajar/${m.slug}`}
                      className="flex items-center gap-3 flex-1 hover:opacity-90 transition"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-xl shrink-0">
                        {m.emoji}
                      </span>
                      <div>
                        <h3 className="text-xs font-extrabold text-slate-800">
                          {m.title}
                        </h3>
                        <p className="text-[10px] text-slate-500 line-clamp-1">
                          {m.summary}
                        </p>
                      </div>
                    </Link>

                    <button
                      onClick={() => toggleFavMateri(m.slug)}
                      className="text-xs text-slate-400 hover:text-rose-500 p-1.5 transition"
                      title="Hapus dari favorit"
                    >
                      ✕
                    </button>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Afirmasi Favorit */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Kartu Afirmasi Disimpan ({favoriteAfirmasiList.length})
              </h2>
              <Link
                href="/main/afirmasi"
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                Ambil Kartu →
              </Link>
            </div>

            {favoriteAfirmasiList.length === 0 ? (
              <GlassCard className="p-4 text-center">
                <span className="text-2xl block mb-1">💌</span>
                <p className="text-xs text-slate-500">
                  Belum ada afirmasi yang kamu simpan. Ketuk &ldquo;Simpan ke Favorit&rdquo; saat membuka kartu afirmasi.
                </p>
              </GlassCard>
            ) : (
              <div className="space-y-2.5">
                {favoriteAfirmasiList.map((cardText) => (
                  <GlassCard key={cardText} className="p-4 flex items-start justify-between gap-3 bg-linear-to-r from-violet-50 to-pink-50 border-violet-100">
                    <div className="flex items-start gap-2.5 flex-1">
                      <span className="text-xl shrink-0" aria-hidden>
                        💜
                      </span>
                      <p className="text-xs font-bold text-slate-800 leading-relaxed">
                        &ldquo;{cardText}&rdquo;
                      </p>
                    </div>

                    <button
                      onClick={() => toggleFavAfirmasi(cardText)}
                      className="text-xs text-slate-400 hover:text-rose-500 p-1 transition shrink-0"
                      title="Hapus afirmasi ini"
                    >
                      ✕
                    </button>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* BADGE DETAIL MODAL */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={reduceMotion ? undefined : { scale: 0.9, opacity: 0 }}
              animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
              exit={reduceMotion ? undefined : { scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center relative"
            >
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
                aria-label="Tutup"
              >
                ✕
              </button>

              <div
                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl text-4xl shadow-md ${
                  selectedBadge.checkProgress(userStats) >= selectedBadge.target
                    ? `bg-linear-to-br ${selectedBadge.color} text-white`
                    : "bg-slate-200 text-slate-400 grayscale"
                }`}
              >
                {selectedBadge.icon}
              </div>

              <h2 className="mt-3.5 text-base font-black text-slate-800">
                {selectedBadge.title}
              </h2>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                {selectedBadge.desc}
              </p>

              {/* Status info */}
              <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs">
                {selectedBadge.checkProgress(userStats) >= selectedBadge.target ? (
                  <div className="text-emerald-700 font-bold flex items-center justify-center gap-1.5">
                    <span>✨</span>
                    <span>Lencana ini sudah berhasil kamu raih!</span>
                  </div>
                ) : (
                  <div className="text-slate-600">
                    Progres saat ini:{" "}
                    <strong>
                      {selectedBadge.checkProgress(userStats)} / {selectedBadge.target}{" "}
                      {selectedBadge.unit}
                    </strong>
                  </div>
                )}
              </div>

              <div className="mt-4 rounded-2xl bg-amber-50/80 p-3 border border-amber-200/60 text-left">
                <p className="text-[11px] font-bold text-amber-900 mb-0.5">
                  💬 Awan berkata:
                </p>
                <p className="text-[11px] text-amber-950 leading-relaxed">
                  {selectedBadge.checkProgress(userStats) >= selectedBadge.target
                    ? "Hebat banget! Langkah kecil yang kamu ambil bukti kepedulianmu pada kesehatan diri."
                    : "Nggak perlu buru-buru ya. Nikmati proses belajarmu satu demi satu, kapan pun kamu siap."}
                </p>
              </div>

              <button
                onClick={() => setSelectedBadge(null)}
                className="mt-5 w-full rounded-2xl bg-slate-800 py-3 text-xs font-bold text-white shadow-xs hover:bg-slate-900 transition"
              >
                Tutup
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
