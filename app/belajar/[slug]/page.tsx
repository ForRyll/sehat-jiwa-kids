import Link from "next/link";
import { notFound } from "next/navigation";
import GlassCard from "@/components/GlassCard";
import MateriActions from "@/components/MateriActions";
import PageShell from "@/components/PageShell";
import ReadingProgress from "@/components/ReadingProgress";
import Reveal from "@/components/Reveal";
import TopicIllustration from "@/components/TopicIllustration";
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
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/75 shadow-lg backdrop-blur">
              <TopicIllustration slug={item.slug} size={56} />
            </div>

            <h1 className="mt-4 text-2xl font-extrabold text-slate-700">
              {item.title} <span aria-hidden>{item.emoji}</span>
            </h1>

            <p className="mt-1 text-slate-600">{item.summary}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600">
              <span className="rounded-full bg-white/75 px-2.5 py-1">
                {item.kategori}
              </span>
              <span className="rounded-full bg-white/75 px-2.5 py-1">
                ⏱️ {item.waktuBaca} menit baca
              </span>
              {item.direview === "belum" && (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-800">
                  Menunggu review dosen
                </span>
              )}
            </div>
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

      <Reveal className="mt-4">
        <GlassCard className="border border-emerald-200/70 bg-emerald-50/70">
          <div className="flex items-center gap-2">
            <span aria-hidden className="text-xl">
              🌱
            </span>
            <h2 className="font-bold text-slate-700">
              Coba ini: {item.latihan.judul}
            </h2>
          </div>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
            {item.latihan.langkah.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </GlassCard>
      </Reveal>

      <Reveal className="mt-4">
        <GlassCard className="border border-rose-200/70 bg-rose-50/70">
          <div className="flex items-center gap-2">
            <span aria-hidden className="text-xl">
              🤝
            </span>
            <h2 className="font-bold text-slate-700">Kapan perlu bantuan?</h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {item.kapanPerluBantuan}
          </p>
          <Link
            href="/bantuan"
            className="mt-3 inline-flex min-h-11 items-center rounded-2xl bg-rose-500 px-4 text-xs font-bold text-white shadow-xs transition hover:bg-rose-600 active:scale-95"
          >
            Lihat Halaman Bantuan →
          </Link>
        </GlassCard>
      </Reveal>

      <MateriActions slug={item.slug} />

      {item.sumber.length > 0 && (
        <Reveal className="mt-4">
          <section className="glass-surface rounded-3xl bg-white/60 p-5 ring-1 ring-white/70 backdrop-blur">
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
                    <span>{s.label} ↗</span>
                    <span className="mt-0.5 block text-[11px] font-normal text-slate-500">
                      {s.jenis}
                      {s.tahun ? ` • ${s.tahun}` : ""} •{" "}
                      {s.bahasa === "id" ? "Indonesia" : "Inggris"} • Dicek{" "}
                      {s.diverifikasi}
                    </span>
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
