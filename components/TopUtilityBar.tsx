"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCalmMode, useDarkMode } from "@/lib/storage";

export default function TopUtilityBar() {
  const pathname = usePathname();
  const { calmMode, toggleCalmMode } = useCalmMode();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const onBantuan = pathname === "/bantuan";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[calc(0.75rem+env(safe-area-inset-top))] z-40">
      <div className="mx-auto flex max-w-md items-center justify-end gap-1.5 px-3 sm:px-4">
        <button
          type="button"
          onClick={toggleDarkMode}
          aria-pressed={darkMode}
          aria-label={darkMode ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
          title={darkMode ? "Mode Gelap aktif" : "Aktifkan Mode Gelap"}
          className={`pointer-events-auto inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-2.5 text-sm font-bold shadow-sm ring-1 backdrop-blur transition active:scale-95 ${
            darkMode
              ? "bg-indigo-950/90 text-amber-200 ring-indigo-700/70"
              : "bg-white/80 text-slate-700 ring-white/80 hover:bg-white"
          }`}
        >
          <span aria-hidden>{darkMode ? "☀️" : "🌙"}</span>
        </button>

        <button
          type="button"
          onClick={toggleCalmMode}
          aria-pressed={calmMode}
          aria-label={
            calmMode
              ? "Matikan Mode Tenang (animasi dikurangi)"
              : "Aktifkan Mode Tenang (kurangi animasi)"
          }
          title={calmMode ? "Mode Tenang aktif" : "Aktifkan Mode Tenang"}
          className={`pointer-events-auto inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-xs font-bold shadow-sm ring-1 backdrop-blur transition active:scale-95 ${
            calmMode
              ? "bg-slate-700 text-white ring-slate-600"
              : "bg-white/80 text-slate-700 ring-white/80 hover:bg-white"
          }`}
        >
          <span aria-hidden>{calmMode ? "🫧" : "✨"}</span>
          <span>{calmMode ? "Tenang" : "Mode Tenang"}</span>
        </button>

        {!onBantuan && (
          <Link
            href="/bantuan"
            aria-label="Butuh bantuan cepat"
            className="pointer-events-auto inline-flex min-h-11 items-center gap-1 rounded-full bg-rose-50/90 px-3 text-xs font-bold text-rose-700 shadow-sm ring-1 ring-rose-200/80 backdrop-blur transition hover:bg-rose-100 active:scale-95"
          >
            <span aria-hidden>🤝</span>
            <span>Bantuan</span>
          </Link>
        )}
      </div>
    </div>
  );
}
