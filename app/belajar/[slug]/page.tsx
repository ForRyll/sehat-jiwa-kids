import Link from "next/link";
import { notFound } from "next/navigation";
import FloatEmoji from "@/components/FloatEmoji";
import GlassCard from "@/components/GlassCard";
import PageShell from "@/components/PageShell";
import ReadingProgress from "@/components/ReadingProgress";
import Reveal from "@/components/Reveal";
import { materi, DIAKSES } from "@/content/materi";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return materi.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = materi.find((m) => m.slug === slug);

  return {
    title: item ? item.title : "Belajar",
  };
}

export default async function MateriPage({ params }: Props) {
  const { slug } = await params;
  const item = materi.find((m) => m.slug === slug);

  if (!item) notFound();

  return (
    <PageShell tone="sky" backHref="/belajar">
      <ReadingProgress />

      <Reveal className="mt-5">
        <div
          className={`relative overflow-hidden rounded-3xl p-6 shadow-xl shadow-black/5 ring-1 ring-white/70 ${item.color}`}
        >
          <span
            aria-hidden
            className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/40"
          />

          <span
            aria-hidden
            className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-white/30"
          />

          <div className="relative">
            <FloatEmoji emoji={item.emoji} />

            <h1 className="mt-4 text-2xl font-extrabold text-slate-700">
              {item.title}
            </h1>

            <p className="mt-1 text-slate-600">{item.summary}</p>
          </div>
        </div>
      </Reveal>

      {item.sections.length === 0 ? (
        <Reveal className="mt-4">
          <GlassCard className="text-center">
            <p className="text-3xl">🛠️</p>

            <p className="mt-2 font-semibold text-slate-700">
              Materi ini segera hadir
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Kami lagi menyiapkannya. Cek lagi nanti ya.
            </p>
          </GlassCard>
        </Reveal>
      ) : (
        item.sections.map((s, i) => (
          <Reveal key={s.heading} className="mt-4">
            <GlassCard>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  style={{
                    width: "32px",
                    height: "32px",
                    minWidth: "32px",
                    minHeight: "32px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    lineHeight: 1,
                  }}
                  className="bg-linear-to-br from-sky-400 to-indigo-400 text-sm font-extrabold text-white shadow"
                >
                  {i + 1}
                </span>

                <h2 className="font-bold text-slate-700">{s.heading}</h2>
              </div>

              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        ))
      )}

      {item.sumber.length > 0 && (
        <Reveal className="mt-4">
          <section className="rounded-3xl bg-white/60 p-5 ring-1 ring-white/70 backdrop-blur">
            <h2 className="text-sm font-bold text-slate-700">
              Sumber dan bacaan lanjutan
            </h2>

            <ul className="mt-3 space-y-2 text-sm">
              {item.sumber.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl bg-white/70 px-3 py-2 font-medium wrap-break-word text-sky-600 transition hover:bg-white active:scale-[0.98]"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-3 text-xs text-slate-400">
              Terakhir diakses: {DIAKSES}
            </p>
          </section>
        </Reveal>
      )}

      <p className="mt-6 text-center text-xs text-slate-500">
        Materi ini untuk edukasi dan bukan pengganti diagnosis atau perawatan
        dari tenaga profesional. Butuh bantuan?{" "}
        <Link href="/bantuan" className="underline">
          Lihat di sini
        </Link>
      </p>
    </PageShell>
  );
}
