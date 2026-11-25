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
    <main className="flex min-h-screen flex-col items-center bg-sky-50 px-5 py-10">
      <Onboarding />

      <Mascot size={120} />
      <h1 className="mt-4 text-center text-2xl font-bold text-slate-700">
        Hai! Mau ngapain hari ini?
      </h1>
      <p className="mt-1 text-center text-slate-500">
        Pelan-pelan aja, nggak ada yang buru-buru.
      </p>

      <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-4">
        {menus.map((m, i) => (
          <MenuCard key={m.href} {...m} index={i} />
        ))}
      </div>
    </main>
  );
}