import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import Mascot from "@/components/Mascot";
import PageShell from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell tone="sky">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <Mascot size={140} />

        <GlassCard className="mt-4 w-full">
          <p className="text-xs font-extrabold tracking-wider text-sky-700 uppercase">
            Halaman 404
          </p>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-800">
            Halamannya nggak ketemu
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Nggak apa-apa, kadang tautan bisa bergeser atau salah ketik. Yuk
            kembali ke beranda atau pilih menu di bawah.
          </p>

          <div className="mt-5 flex flex-col gap-2.5">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-sky-500 px-5 font-bold text-white shadow-sm transition hover:bg-sky-600 active:scale-95"
            >
              Kembali ke Beranda
            </Link>
            <Link
              href="/bantuan"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-rose-50 px-5 text-sm font-bold text-rose-700 ring-1 ring-rose-200 transition hover:bg-rose-100 active:scale-95"
            >
              Butuh Bantuan?
            </Link>
          </div>
        </GlassCard>
      </div>
    </PageShell>
  );
}
