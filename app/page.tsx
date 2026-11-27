import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import MenuCard from "@/components/MenuCard";
import MoodStrip from "@/components/MoodStrip";
import Onboarding from "@/components/Onboarding";
import PageShell from "@/components/PageShell";

const menus = [
  {
    href: "/belajar",
    title: "Belajar",
    desc: "Materi singkat seputar kesehatan mental",
    emoji: "📖",
    color: "bg-sky-100",
  },
  {
    href: "/main",
    title: "Main",
    desc: "Game relaksasi buat nenangin pikiran",
    emoji: "🎮",
    color: "bg-amber-100",
  },
  {
    href: "/bantuan",
    title: "Butuh Bantuan",
    desc: "Kontak dan cara cari dukungan",
    emoji: "🤝",
    color: "bg-rose-100",
  },
  {
    href: "/tentang",
    title: "Tentang",
    desc: "Kenalan sama website dan timnya",
    emoji: "ℹ️",
    color: "bg-emerald-100",
  },
];

export default function Home() {
  return (
    <PageShell tone="sky">
      <Onboarding />

      <HomeHero />

      <div className="mt-8 grid w-full grid-cols-2 gap-4">
        {menus.map((m, i) => (
          <MenuCard key={m.href} {...m} index={i} />
        ))}
      </div>

      <div className="mt-6">
        <MoodStrip />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="flex flex-col justify-between rounded-3xl bg-white/75 p-3.5 shadow-sm border border-white/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              📖
            </span>
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">
                Catatan Harian
              </h3>
              <p className="text-[10px] text-slate-500">
                Refleksi pribadi santai
              </p>
            </div>
          </div>
          <Link
            href="/catatan"
            className="mt-3 block text-center rounded-xl bg-rose-50 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-100 active:scale-95 transition"
          >
            Tulis →
          </Link>
        </div>

        <div className="flex flex-col justify-between rounded-3xl bg-white/75 p-3.5 shadow-sm border border-white/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              🏆
            </span>
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">
                Progres & Lencana
              </h3>
              <p className="text-[10px] text-slate-500">
                Pencapaian & favorit
              </p>
            </div>
          </div>
          <Link
            href="/progres"
            className="mt-3 block text-center rounded-xl bg-emerald-50 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 active:scale-95 transition"
          >
            Lihat →
          </Link>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        Website ini untuk edukasi dan bukan pengganti psikolog.
      </p>
    </PageShell>
  );
}
