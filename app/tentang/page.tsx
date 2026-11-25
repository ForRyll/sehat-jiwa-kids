import Link from "next/link";
import Mascot from "@/components/Mascot";
import PageShell from "@/components/PageShell";
import { tentang } from "@/content/tentang";

export const metadata = {
  title: "Tentang",
};

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
      <h2 className="font-bold text-slate-700">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">
        {children}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 py-2 last:border-0">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-medium text-slate-700">{value}</span>
    </div>
  );
}

export default function TentangPage() {
  const { namaWebsite, tagline, tujuan, fitur, pkm, tim, kontak } = tentang;

  return (
    <PageShell tone="emerald">
      <Link href="/" className="text-sm text-slate-500">
        ← Kembali
      </Link>

      <div className="mt-4 flex flex-col items-center text-center">
        <Mascot size={110} />
        <h1 className="mt-3 text-2xl font-extrabold text-slate-700">
          {namaWebsite}
        </h1>
        <p className="mt-1 text-slate-600">{tagline}</p>
      </div>

      <Card title="Tentang website ini">
        <div className="space-y-3">
          {tujuan.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Card>

      <Card title="Apa yang ada di sini?">
        <ul className="space-y-3">
          {fitur.map((f) => (
            <li key={f.title} className="flex gap-3">
              <span className="text-2xl">{f.emoji}</span>
              <span>
                <b className="text-slate-700">{f.title}</b>
                <br />
                {f.desc}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Program PKM">
        <Row label="Judul" value={pkm.judul} />
        <Row label="Skema" value={pkm.skema} />
        <Row label="Kampus" value={pkm.kampus} />
        <Row label="Tahun" value={pkm.tahun} />
        <Row label="Pendanaan" value={pkm.pendanaan} />
      </Card>

      <Card title="Tim kami">
        {[...tim.anggota, tim.dosen, tim.developer].map((o) => (
          <Row key={o.nama + o.peran} label={o.peran} value={o.nama} />
        ))}
      </Card>

      <Card title="Catatan penting">
        <div className="space-y-3">
          <p>
            Website ini untuk edukasi dan bukan pengganti diagnosis atau
            perawatan dari psikolog, psikiater, maupun tenaga kesehatan. Kalau
            kamu butuh bantuan, buka halaman{" "}
            <Link href="/bantuan" className="underline">
              Butuh Bantuan
            </Link>
            .
          </p>
          <p>
            Kami tidak meminta data pribadi seperti nama atau email, dan kamu
            tidak perlu membuat akun untuk memakai website ini.
          </p>
        </div>
      </Card>

      <Card title="Saran dan masukan">
        <p>
          Ada saran atau menemukan sesuatu yang kurang pas? Kabari kami di{" "}
          <a href={`mailto:${kontak.email}`} className="text-sky-600 underline">
            {kontak.email}
          </a>
          .
        </p>
      </Card>
    </PageShell>
  );
}