import MenuCard from "@/components/MenuCard";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Main",
};

export default function MainPage() {
  return (
    <PageShell tone="amber" backHref="/">
      <PageHeader
        emoji="🎮"
        title="Main"
        desc="Santai sebentar, pilih yang kamu suka."
      />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <MenuCard
          href="/main/skrining"
          title="Skrining Mandiri"
          desc="Cek tingkat stres & kecemasan harianmu"
          emoji="📋"
          color="bg-emerald-100"
          index={0}
        />
        <MenuCard
          href="/main/napas"
          title="Latihan Napas"
          desc="Tenangin diri bareng Awan"
          emoji="🌬️"
          color="bg-sky-100"
          index={1}
        />
        <MenuCard
          href="/main/emosi"
          title="Tebak Emosi"
          desc="Kenali perasaanmu lewat situasi sehari-hari"
          emoji="🎭"
          color="bg-rose-100"
          index={2}
        />
        <MenuCard
          href="/main/afirmasi"
          title="Kartu Afirmasi"
          desc="Ambil kalimat penyemangat buat hari ini"
          emoji="💌"
          color="bg-violet-100"
          index={3}
        />
      </div>

      <p className="mt-6 rounded-2xl bg-white/60 p-3 text-center text-xs text-slate-600 backdrop-blur">
        💡 Santai aja, di sini nggak ada skor dan nggak ada batas waktu.
      </p>
    </PageShell>
  );
}
