import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Butuh Bantuan",
};

export default function BantuanPage() {
  return (
    <PageShell tone="rose">
      <Link href="/" className="text-sm text-slate-500">
        ← Kembali
      </Link>

      <h1 className="mt-4 text-2xl font-extrabold text-slate-700">
        Butuh Bantuan? 🤝
      </h1>
      <p className="mt-2 text-slate-600">
        Merasa berat itu manusiawi, dan kamu nggak harus ngadepin semuanya
        sendirian. Ada orang yang siap dengerin.
      </p>

      {/* Darurat */}
      <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="font-bold text-slate-700">
          Lagi dalam kondisi krisis sekarang?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Kalau kamu atau temanmu merasa nggak aman, punya pikiran untuk
          menyakiti diri sendiri, atau butuh bantuan segera, hubungi layanan
          berikut. Gratis dan bisa diakses kapan saja.
        </p>

        <div className="mt-4 rounded-2xl bg-rose-100 p-4">
          <p className="font-semibold text-slate-700">Healing119 (Kemenkes)</p>
          <p className="mt-1 text-sm text-slate-600">
            Telepon <b>119</b>, lalu tekan <b>ekstensi 8</b>. Atau chat lewat
            situs resminya.
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <a
              href="tel:119"
              className="rounded-full bg-rose-400 py-3 text-center font-semibold text-white active:scale-95"
            >
              Telepon 119
            </a>
            <a
              href="https://healing119.id"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white py-3 text-center font-semibold text-rose-500 active:scale-95"
            >
              Buka healing119.id
            </a>
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-600">
          Kalau situasinya sangat mendesak, langsung ke IGD rumah sakit
          terdekat atau minta tolong orang di sekitarmu.
        </p>
      </section>

      {/* Cerita ke orang terdekat */}
      <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="font-bold text-slate-700">Mulai dari yang terdekat</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
          <li>Cerita ke teman, keluarga, atau orang yang kamu percaya.</li>
          <li>Datangi layanan konseling di kampusmu.</li>
          <li>Kunjungi puskesmas, banyak yang sudah punya layanan kesehatan jiwa.</li>
          <li>Temui psikolog atau psikiater untuk pendampingan lebih lanjut.</li>
        </ul>
      </section>

      {/* Kontak konseling kampus: isi nanti */}
      <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="font-bold text-slate-700">Konseling kampus</h2>
        <p className="mt-2 text-sm text-slate-600">
          Info kontak layanan konseling kampus akan ditambahkan di sini.
        </p>
      </section>

      <p className="mt-6 text-center text-xs text-slate-500">
        Website ini untuk edukasi dan bukan pengganti diagnosis atau perawatan
        dari tenaga profesional.
      </p>
    </PageShell>
  );
}