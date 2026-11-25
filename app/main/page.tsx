import Link from "next/link";
import MenuCard from "@/components/MenuCard";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Main",
};

export default function MainPage() {
  return (
    <PageShell tone="amber">
      <Link href="/" className="text-sm text-slate-500">
        ← Kembali
      </Link>

      <h1 className="mt-4 text-2xl font-extrabold text-slate-700">Main 🎮</h1>
      <p className="mt-2 text-slate-600">
        Santai sebentar, pilih yang kamu suka.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <MenuCard
          href="/main/napas"
          title="Latihan Napas"
          desc="Tenangin diri bareng Awan"
          emoji="🌬️"
          color="bg-sky-100"
          index={0}
        />
        <MenuCard
          href="/main/emosi"
          title="Tebak Emosi"
          desc="Kenali perasaanmu lewat situasi sehari-hari"
          emoji="🎭"
          color="bg-rose-100"
          index={1}
        />
        <MenuCard
          href="/main/afirmasi"
          title="Kartu Afirmasi"
          desc="Ambil kalimat penyemangat buat hari ini"
          emoji="💌"
          color="bg-violet-100"
          index={2}
        />
      </div>
    </PageShell>
  );
}