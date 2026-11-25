import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Butuh Bantuan",
};

const terdekat = [
  { emoji: "💬", text: "Cerita ke teman, keluarga, atau orang yang kamu percaya." },
  { emoji: "🏫", text: "Datangi layanan konseling di kampusmu." },
  { emoji: "🏥", text: "Kunjungi puskesmas, banyak yang sudah punya layanan kesehatan jiwa." },
  { emoji: "🧑‍⚕️", text: "Temui psikolog atau psikiater untuk pendampingan lebih lanjut." },
];

export default function BantuanPage() {
  return (
    <PageShell tone="rose" backHref="/">
      <PageHeader
        emoji="🤝"
        title="Butuh Bantuan?"
        desc="Merasa berat itu manusiawi, dan kamu nggak harus ngadepin semuanya sendirian. Ada orang yang siap dengerin."
      />

      {/* Darurat */}
      <Reveal delay={0.05} className="mt-6">
        <section className="relative overflow-hidden rounded-3xl bg-white/90 p-5 shadow-xl shadow-rose-300/40 ring-2 ring-rose-300/70 backdrop-blur">
          <span
            aria-hidden
            className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-rose-200/60"
          />
          <div className="relative flex items-start gap-3">
            <span
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-2xl motion-safe:animate-pulse"
            >
              💗
            </span>
            <h2 className="font-bold text-slate-700">
              Lagi dalam kondisi krisis sekarang?
            </h2>
          </div>
          <p className="relative mt-3 text-sm text-slate-600">
            Kalau kamu atau temanmu merasa nggak aman, punya pikiran untuk
            menyakiti diri sendiri, atau butuh bantuan segera, hubungi layanan
            berikut. Gratis dan bisa diakses kapan saja.
          </p>

          <div className="relative mt-4 rounded-2xl bg-rose-50 p-4 ring-1 ring-rose-200">
            <p className="font-bold text-slate-700">Healing119 (Kemenkes)</p>
            <p className="mt-1 text-sm text-slate-600">
              Telepon <b>119</b>, lalu tekan <b>ekstensi 8</b>. Atau chat lewat
              situs resminya.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-rose-300/60 motion-safe:animate-ping motion-reduce:hidden"
                />
                <a
                  href="tel:119"
                  className="relative flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-rose-500 to-pink-500 py-3.5 text-center font-bold text-white shadow-lg shadow-rose-300/60 transition active:scale-95"
                >
                  <span aria-hidden>📞</span> Telepon 119
                </a>
              </div>
              <a
                href="https://healing119.id"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white py-3 text-center font-bold text-rose-500 shadow-sm ring-1 ring-rose-200 transition active:scale-95"
              >
                Buka healing119.id ↗
              </a>
            </div>
          </div>

          <p className="relative mt-4 text-sm text-slate-600">
            Kalau situasinya sangat mendesak, langsung ke IGD rumah sakit
            terdekat atau minta tolong orang di sekitarmu.
          </p>
        </section>
      </Reveal>

      {/* Cerita ke orang terdekat */}
      <Reveal className="mt-6">
        <h2 className="mb-3 font-bold text-slate-700">
          Mulai dari yang terdekat
        </h2>
        <div className="grid gap-3">
          {terdekat.map((t, i) => (
            <Reveal key={t.text} delay={i * 0.06}>
              <div className="flex items-center gap-3 rounded-2xl bg-white/85 p-4 shadow-md shadow-black/5 ring-1 ring-white/70 backdrop-blur">
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-rose-100 to-orange-100 text-2xl"
                >
                  {t.emoji}
                </span>
                <p className="text-sm text-slate-600">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* Kontak konseling kampus: isi nanti */}
      <Reveal className="mt-6">
        <GlassCard className="border-2 border-dashed border-rose-200">
          <h2 className="font-bold text-slate-700">🏫 Konseling kampus</h2>
          <p className="mt-2 text-sm text-slate-600">
            Info kontak layanan konseling kampus akan ditambahkan di sini.
          </p>
        </GlassCard>
      </Reveal>

      <p className="mt-6 text-center text-xs text-slate-500">
        Website ini untuk edukasi dan bukan pengganti diagnosis atau perawatan
        dari tenaga profesional.
      </p>
    </PageShell>
  );
}
