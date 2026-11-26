"use client";

import { useEffect } from "react";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import Mascot from "@/components/Mascot";
import PageShell from "@/components/PageShell";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageShell tone="amber">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <Mascot size={140} />

        <GlassCard className="mt-4 w-full">
          <h1 className="text-2xl font-extrabold text-slate-800">
            Ada kendala sebentar
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Tarik napas pelan dulu, ya. Halaman ini mengalami gangguan teknis
            sesaat dan bisa dicoba muat ulang.
          </p>

          <div className="mt-5 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-amber-500 px-5 font-bold text-white shadow-sm transition hover:bg-amber-600 active:scale-95"
            >
              Coba Lagi
            </button>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white/80 px-5 text-sm font-bold text-slate-700 ring-1 ring-slate-200 transition hover:bg-white active:scale-95"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </GlassCard>
      </div>
    </PageShell>
  );
}
