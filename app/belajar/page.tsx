import MenuCard from "@/components/MenuCard";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { materi } from "@/content/materi";

export const metadata = {
  title: "Belajar",
};

export default function BelajarPage() {
  return (
    <PageShell tone="sky" backHref="/">
      <PageHeader
        emoji="📖"
        title="Belajar"
        desc="Materi singkat, pilih topik yang lagi kamu butuhkan."
      />

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
