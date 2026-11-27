"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import Mascot from "@/components/Mascot";
import GentleSparkles from "@/components/GentleSparkles";
import GlassCard from "@/components/GlassCard";
import { useDiaryEntries, DiaryEntry, useMotionSafe } from "@/lib/storage";
import { JOURNAL_PROMPTS, JournalPrompt } from "@/content/catatan-prompts";

export default function CatatanPage() {
  const reduceMotion = useMotionSafe();
  const { entries, saveEntry, deleteEntry, clearAllEntries, exportEntries } =
    useDiaryEntries();

  // Mode state: 'list' | 'create' | 'edit'
  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [activePrompt, setActivePrompt] = useState<JournalPrompt>(
    JOURNAL_PROMPTS[0]
  );
  const [title, setTitle] = useState(JOURNAL_PROMPTS[0].title);
  const [content, setContent] = useState("");
  const [sticker, setSticker] = useState(JOURNAL_PROMPTS[0].stickers[0]);

  // Search & view states
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [burstKey, setBurstKey] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Open creation form with a specific prompt
  const handleSelectPrompt = (prompt: JournalPrompt) => {
    setActivePrompt(prompt);
    setTitle(prompt.title);
    setSticker(prompt.stickers[0]);
  };

  // Start new note
  const handleStartNew = () => {
    setEditingId(null);
    setActivePrompt(JOURNAL_PROMPTS[0]);
    setTitle(JOURNAL_PROMPTS[0].title);
    setContent("");
    setSticker(JOURNAL_PROMPTS[0].stickers[0]);
    setIsWriting(true);
  };

  // Start edit existing note
  const handleStartEdit = (entry: DiaryEntry) => {
    setEditingId(entry.id);
    setTitle(entry.title);
    setContent(entry.content);
    setSticker(entry.sticker || "✍️");
    setIsWriting(true);
  };

  // Save note
  const handleSave = () => {
    if (!content.trim()) {
      showToast("Tulis sedikit ceritamu dulu sebelum disimpan ya ✨");
      return;
    }

    saveEntry({
      id: editingId || undefined,
      title: title.trim() || "Refleksi Hari Ini",
      content: content.trim(),
      sticker,
      promptId: activePrompt.id,
    });

    setBurstKey((k) => k + 1);
    setIsWriting(false);
    setEditingId(null);
    setContent("");
    showToast("Catatan berhasil disimpan rapi! 📖");
  };

  // Export
  const handleExport = (format: "txt" | "json") => {
    const success = exportEntries(format);
    if (success) {
      showToast(`Catatan berhasil diunduh (${format.toUpperCase()}) 📥`);
    } else {
      showToast("Belum ada catatan untuk diunduh.");
    }
  };

  // Filtered entries
  const filteredEntries = useMemo(() => {
    if (!searchQuery.trim()) return entries;
    const q = searchQuery.toLowerCase();
    return entries.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.content.toLowerCase().includes(q) ||
        e.date.includes(q)
    );
  }, [entries, searchQuery]);

  // Format date Indonesia
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
    <PageShell tone="rose" backHref="/">
      {/* Toast feedback */}
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

      <div className="relative text-center">
        <GentleSparkles burstKey={burstKey} />

        {/* Mascot */}
        <div className="mx-auto flex justify-center py-2">
          <Mascot
            size={110}
            mood={isWriting ? "berpikir" : "senang"}
            interactive={true}
            onReact={() => setBurstKey((k) => k + 1)}
          />
        </div>

        <h1 className="mt-2 text-2xl font-black text-slate-800">
          Catatan Harian 📖
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Ruang bebas untuk menuangkan pikiran, tanpa takut dihakimi.
        </p>

        {/* Privacy badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-600 shadow-2xs border border-white">
          <span>🔒 100% Privat</span>
          <span className="text-slate-300">•</span>
          <span>Tersimpan hanya di HP-mu</span>
        </div>
      </div>

      {/* TOP CONTROLS */}
      {!isWriting && (
        <div className="mt-6 flex flex-col gap-3">
          <motion.button
            onClick={handleStartNew}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-linear-to-r from-rose-400 via-pink-400 to-amber-400 py-3.5 text-sm font-extrabold text-white shadow-md shadow-rose-200 hover:shadow-rose-300 transition"
          >
            <span>✍️</span>
            <span>Tulis Refleksi Baru</span>
          </motion.button>

          {entries.length > 0 && (
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex gap-2">
                <button
                  onClick={() => handleExport("txt")}
                  className="rounded-xl bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-white active:scale-95 transition shadow-2xs"
                >
                  📥 Unduh .txt
                </button>
                <button
                  onClick={() => handleExport("json")}
                  className="rounded-xl bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-white active:scale-95 transition shadow-2xs"
                >
                  📥 Cadangan .json
                </button>
              </div>

              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-xs font-semibold text-rose-500 hover:text-rose-700 px-2 py-1"
              >
                Hapus Semua
              </button>
            </div>
          )}
        </div>
      )}

      {/* WRITING / EDITING FORM */}
      <AnimatePresence>
        {isWriting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 space-y-4"
          >
            {/* Prompt Selector (Only when creating new) */}
            {!editingId && (
              <GlassCard className="p-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Pilih Panduan Refleksi
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {JOURNAL_PROMPTS.map((p) => {
                    const active = activePrompt.id === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSelectPrompt(p)}
                        className={`flex flex-col text-left p-2.5 rounded-2xl transition active:scale-95 ${
                          active
                            ? "bg-rose-100 ring-2 ring-rose-400 shadow-xs"
                            : "bg-white/70 hover:bg-white"
                        }`}
                      >
                        <span className="text-xl">{p.emoji}</span>
                        <span className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">
                          {p.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-[11px] text-slate-500 italic">
                  💡 {activePrompt.hint}
                </p>
              </GlassCard>
            )}

            {/* Editor Area */}
            <GlassCard className="p-4 space-y-3">
              {/* Sticker selection & Title */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1 overflow-x-auto pb-1 max-w-[130px] shrink-0">
                  {activePrompt.stickers.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSticker(s)}
                      className={`text-lg p-1 rounded-xl transition ${
                        sticker === s
                          ? "bg-rose-200 ring-1 ring-rose-400 scale-110"
                          : "hover:bg-slate-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Judul catatan..."
                  className="flex-1 rounded-xl border border-slate-200 bg-white/90 px-3 py-1.5 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-rose-400 focus:outline-none"
                />
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={activePrompt.placeholder}
                  rows={7}
                  className="w-full rounded-2xl border border-slate-200 bg-white/95 p-3.5 text-sm leading-relaxed text-slate-800 placeholder-slate-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200 transition"
                />
                <div className="text-right text-[11px] text-slate-400 mt-1">
                  {content.trim() ? `${content.trim().split(/\s+/).length} kata` : "0 kata"} • {content.length} karakter
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriting(false)}
                  className="flex-1 rounded-full bg-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-300 active:scale-95 transition"
                >
                  Batal
                </button>
                <motion.button
                  type="button"
                  onClick={handleSave}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-2 rounded-full bg-linear-to-r from-rose-400 via-pink-400 to-amber-400 py-3 text-sm font-extrabold text-white shadow-md shadow-rose-300 transition"
                >
                  Simpan Catatan ✨
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SAVED ENTRIES LIST */}
      {!isWriting && (
        <div className="mt-6 mb-8 space-y-4">
          {entries.length > 0 && (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Cari catatan atau tanggal..."
                className="w-full rounded-2xl border border-white/80 bg-white/80 px-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Empty state */}
          {entries.length === 0 ? (
            <GlassCard className="p-6 text-center">
              <span className="text-4xl block mb-2" aria-hidden>
                🌱
              </span>
              <h2 className="text-base font-extrabold text-slate-800">
                Belum ada catatan
              </h2>
              <p className="mt-1 text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Menulis pikiranmu adalah cara sehat untuk melepaskan beban di kepala.
                Coba tulis satu kalimat kecil hari ini.
              </p>
              <button
                onClick={handleStartNew}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-rose-400 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-rose-500 active:scale-95 transition"
              >
                Mulai Menulis ✍️
              </button>
            </GlassCard>
          ) : filteredEntries.length === 0 ? (
            <p className="text-center text-xs text-slate-500 py-6">
              Tidak ada catatan yang cocok dengan &ldquo;{searchQuery}&rdquo;.
            </p>
          ) : (
            <div className="space-y-3">
              {filteredEntries.map((entry) => {
                const isExpanded = expandedId === entry.id;
                return (
                  <GlassCard key={entry.id} className="p-4 transition hover:shadow-md">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" aria-hidden>
                          {entry.sticker || "✍️"}
                        </span>
                        <div>
                          <h3 className="text-sm font-extrabold text-slate-800">
                            {entry.title}
                          </h3>
                          <span className="text-[10px] font-semibold text-slate-400">
                            {formatDateIndo(entry.date)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStartEdit(entry)}
                          className="rounded-lg p-1.5 text-xs text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                          title="Edit catatan"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => {
                            deleteEntry(entry.id);
                            showToast("Catatan dihapus.");
                          }}
                          className="rounded-lg p-1.5 text-xs text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition"
                          title="Hapus catatan"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p
                        className={`text-xs leading-relaxed text-slate-700 whitespace-pre-wrap ${
                          isExpanded ? "" : "line-clamp-3"
                        }`}
                      >
                        {entry.content}
                      </p>

                      {entry.content.length > 140 && (
                        <button
                          onClick={() =>
                            setExpandedId(isExpanded ? null : entry.id)
                          }
                          className="mt-1.5 text-[11px] font-bold text-rose-500 hover:underline"
                        >
                          {isExpanded ? "Sembunyikan ↑" : "Baca selengkapnya ↓"}
                        </button>
                      )}
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* CONFIRMATION MODAL TO CLEAR ALL */}
      <AnimatePresence>
        {showClearConfirm && (
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
                Hapus Semua Catatan?
              </h2>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Tindakan ini akan menghapus seluruh catatan di perangkat ini secara permanen.
                Disarankan mengunduh cadangan (.txt/.json) terlebih dahulu.
              </p>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    clearAllEntries();
                    setShowClearConfirm(false);
                    showToast("Semua catatan berhasil dihapus.");
                  }}
                  className="flex-1 rounded-xl bg-rose-500 py-2.5 text-xs font-bold text-white hover:bg-rose-600 transition shadow-sm"
                >
                  Ya, Hapus
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
