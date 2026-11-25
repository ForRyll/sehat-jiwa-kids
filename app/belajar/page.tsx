import Link from "next/link";
import MenuCard from "@/components/MenuCard";
import PageShell from "@/components/PageShell";
import { materi } from "@/content/materi";

export const metadata = {
  title: "Belajar",
};

export default function BelajarPage() {
  return (
    <PageShell tone="sky">
      <Link href="/" className="text-sm text-slate-500">
        ← Kembali
      </Link>

      <h1 className="mt-4 text-2xl font-extrabold text-slate-700">Belajar 📖</h1>
      <p className="mt-2 text-slate-600">
        Materi singkat, pilih topik yang lagi kamu butuhkan.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {materi.map((m, i) => (
          <MenuCard
            key={m.slug}
            href={`/belajar/${m.slug}`}
            title={m.title}
            desc={m.summary}
            emoji={m.emoji}
            color={m.color}
            index={i}
          />
        ))}
      </div>
    </PageShell>
  );
}