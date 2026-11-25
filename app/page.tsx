import FloatingClouds from "@/components/FloatingClouds";
import Mascot from "@/components/Mascot";
import MenuCard from "@/components/MenuCard";
import Onboarding from "@/components/Onboarding";

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
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-sky-200 via-sky-50 to-amber-50 px-5 py-10">
      <FloatingClouds />
      <Onboarding />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-white/60 blur-2xl" />
          <Mascot size={120} />
        </div>

        <h1 className="mt-4 text-center text-2xl font-extrabold text-slate-700">
          Hai! Mau ngapain hari ini?
        </h1>
        <p className="mt-1 text-center text-slate-600">
          Pelan-pelan aja, nggak ada yang buru-buru.
        </p>

        <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-4">
          {menus.map((m, i) => (
            <MenuCard key={m.href} {...m} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}