import BelajarExplorer from "@/components/BelajarExplorer";
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
        desc="Materi singkat berbasis sumber tepercaya. Pilih atau cari topik yang lagi kamu butuhkan."
      />

      <BelajarExplorer items={materi} />
    </PageShell>
  );
}
