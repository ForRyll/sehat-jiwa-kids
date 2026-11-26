"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import TopicIllustration from "@/components/TopicIllustration";
import type { KategoriMateri, Materi } from "@/content/materi";
import { useFavoriteMateri, useReadMateri } from "@/lib/storage";

type FilterValue = "Semua" | "Favorit" | KategoriMateri;

const filters: FilterValue[] = [
  "Semua",
  "Favorit",
  "Stres & Kuliah",
  "Emosi & Pikiran",
  "Kebiasaan Sehat",
  "Relasi",
];

export default function BelajarExplorer({ items }: { items: Materi[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Semua");
  const { has: isRead } = useReadMateri();
  const { has: isFav, toggle: toggleFav } = useFavoriteMateri();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((m) => {
      if (activeFilter === "Favorit" && !isFav(m.slug)) return false;
      if (
        activeFilter !== "Semua" &&
        activeFilter !== "Favorit" &&
        m.kategori !== activeFilter
      ) {
        return false;
      }
      if (!q) return true;
      return (
        m.title.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q) ||
        m.kategori.toLowerCase().includes(q)
      );
    });
  }, [items, query, activeFilter, isFav]);

  return (
    <div className="mt-6 space-y-4">
      {/* Pencarian */}
      <div className="relative">
        <label htmlFor="cari-materi" className="sr-only">
          Cari materi
        </label>
        <input
          id="cari-materi"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari topik, mis. stres, tidur, cemas..."
          className="glass-surface min-h-11 w-full rounded-2xl bg-white/85 px-4 pr-10 text-sm text-slate-700 placeholder-slate-400 shadow-sm ring-1 ring-white/80 backdrop-blur focus:ring-2 focus:ring-sky-400 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Hapus pencarian"
            className="absolute top-1/2 right-2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 hover:bg-slate-200/60"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Kategori */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter kategori materi"
      >
        {filters.map((f) => {
          const active = activeFilter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              aria-pressed={active}
              className={`inline-flex min-h-11 items-center rounded-full px-3.5 text-xs font-bold transition active:scale-95 ${
                active
                  ? "bg-sky-600 text-white shadow-sm"
                  : "glass-surface bg-white/75 text-slate-700 ring-1 ring-white/80 hover:bg-white"
              }`}
            >
              {f === "Favorit" ? "💛 Favorit" : f}
            </button>
          );
        })}
      </div>

      {/* Daftar Materi */}
      {filtered.length === 0 ? (
        <div className="glass-surface rounded-3xl bg-white/80 p-6 text-center shadow-md backdrop-blur">
          <p className="text-2xl" aria-hidden>
            🔍
          </p>
          <p className="mt-2 font-bold text-slate-700">
            Belum ada materi yang cocok
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Coba kata kunci lain atau pilih filter &ldquo;Semua&rdquo;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filtered.map((m) => {
            const read = isRead(m.slug);
            const fav = isFav(m.slug);

            return (
              <article
                key={m.slug}
                className={`relative flex items-start gap-3.5 rounded-3xl p-4 shadow-md shadow-black/5 ring-1 ring-white/70 transition ${m.color}`}
              >
                <Link
                  href={`/belajar/${m.slug}`}
                  className="flex min-w-0 flex-1 items-start gap-3.5"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/80 shadow-xs">
                    <TopicIllustration slug={m.slug} size={42} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-white/75 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                        {m.kategori}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600">
                        • {m.waktuBaca} mnt
                      </span>
                      {read && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                          ✓ Dibaca
                        </span>
                      )}
                      {m.direview === "belum" && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">
                          Menunggu review
                        </span>
                      )}
                    </div>

                    <h2 className="mt-1 text-base font-extrabold text-slate-800">
                      {m.title}
                    </h2>
                    <p className="mt-0.5 line-clamp-2 text-xs text-slate-600">
                      {m.summary}
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => toggleFav(m.slug)}
                  aria-pressed={fav}
                  aria-label={
                    fav
                      ? `Hapus ${m.title} dari favorit`
                      : `Simpan ${m.title} ke favorit`
                  }
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg transition active:scale-90 ${
                    fav
                      ? "bg-amber-200/90 text-amber-800 shadow-xs"
                      : "bg-white/70 text-slate-500 hover:bg-white"
                  }`}
                >
                  <span aria-hidden>{fav ? "💛" : "🤍"}</span>
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
