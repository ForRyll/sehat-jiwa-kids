"use client";

import { useState } from "react";
import GentleSparkles from "@/components/GentleSparkles";
import { useFavoriteMateri, useReadMateri } from "@/lib/storage";

export default function MateriActions({ slug }: { slug: string }) {
  const { has: isRead, toggle: toggleRead } = useReadMateri();
  const { has: isFav, toggle: toggleFav } = useFavoriteMateri();
  const [burstKey, setBurstKey] = useState(0);

  const read = isRead(slug);
  const fav = isFav(slug);

  const handleRead = () => {
    if (!read) setBurstKey((k) => k + 1);
    toggleRead(slug);
  };

  return (
    <div className="relative mt-4 grid grid-cols-2 gap-3">
      <GentleSparkles burstKey={burstKey} />

      <button
        type="button"
        onClick={handleRead}
        aria-pressed={read}
        className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-2xl px-3 text-xs font-bold shadow-sm ring-1 transition active:scale-95 ${
          read
            ? "bg-emerald-500 text-white ring-emerald-500"
            : "glass-surface bg-white/85 text-slate-700 ring-white/80 hover:bg-white"
        }`}
      >
        <span aria-hidden>{read ? "✓" : "📖"}</span>
        <span>{read ? "Sudah Dibaca" : "Tandai Dibaca"}</span>
      </button>

      <button
        type="button"
        onClick={() => toggleFav(slug)}
        aria-pressed={fav}
        className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-2xl px-3 text-xs font-bold shadow-sm ring-1 transition active:scale-95 ${
          fav
            ? "bg-amber-400 text-slate-900 ring-amber-400"
            : "glass-surface bg-white/85 text-slate-700 ring-white/80 hover:bg-white"
        }`}
      >
        <span aria-hidden>{fav ? "💛" : "🤍"}</span>
        <span>{fav ? "Tersimpan" : "Simpan Favorit"}</span>
      </button>
    </div>
  );
}
