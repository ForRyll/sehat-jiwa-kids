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

      <p className="mt-6 text-center text-xs text-slate-500">
        Website ini untuk edukasi dan bukan pengganti psikolog.
      </p>
    </PageShell>
  );
}
