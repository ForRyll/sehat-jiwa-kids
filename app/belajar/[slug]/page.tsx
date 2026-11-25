import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
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
  return { title: item ? item.title : "Belajar" };
}

export default async function MateriPage({ params }: Props) {
  const { slug } = await params;
  const item = materi.find((m) => m.slug === slug);

  if (!item) notFound();

  return (
    <PageShell tone="sky">
      <Link href="/belajar" className="text-sm text-slate-500">
        ← Kembali
      </Link>

      <div className={`mt-4 rounded-3xl p-6 shadow-sm ${item.color}`}>
        <span className="text-5xl">{item.emoji}</span>
        <h1 className="mt-3 text-2xl font-extrabold text-slate-700">
          {item.title}
        </h1>
        <p className="mt-1 text-slate-600">{item.summary}</p>
      </div>

      {item.sections.length === 0 ? (
        <div className="mt-4 rounded-3xl bg-white p-5 text-center shadow-sm">
          <p className="text-3xl">🛠️</p>
          <p className="mt-2 font-semibold text-slate-700">
            Materi ini segera hadir
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Kami lagi menyiapkannya. Cek lagi nanti ya.
          </p>
        </div>
      ) : (
        item.sections.map((s) => (
          <section
            key={s.heading}
            className="mt-4 rounded-3xl bg-white p-5 shadow-sm"
          >
            <h2 className="font-bold text-slate-700">{s.heading}</h2>
            <div className="mt-2 space-y-3 text-sm leading-relaxed text-slate-600">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))
      )}

      {item.sumber.length > 0 && (
        <section className="mt-4 rounded-3xl bg-white/70 p-5">
          <h2 className="text-sm font-bold text-slate-700">
            Sumber dan bacaan lanjutan
          </h2>
          <ul className="mt-2 space-y-2 text-sm">
            {item.sumber.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-words text-sky-600 underline"
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