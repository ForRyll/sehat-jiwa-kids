import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import Mascot from "@/components/Mascot";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import { tentang } from "@/content/tentang";

export const metadata = {
  title: "Tentang",
};

const avatarColors = [
  "from-emerald-400 to-teal-400",
  "from-sky-400 to-indigo-400",
  "from-amber-400 to-orange-400",
  "from-fuchsia-400 to-pink-400",
];

function initials(nama: string) {
  return nama
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function TentangPage() {
  const { namaWebsite, tagline, tujuan, fitur, pkm, tim, kontak } = tentang;

  const pkmItems = [
    { label: "Judul", value: pkm.judul, wide: true },
    { label: "Skema", value: pkm.skema },
    { label: "Tahun", value: pkm.tahun },
    { label: "Kampus", value: pkm.kampus },
    { label: "Pendanaan", value: pkm.pendanaan },
  ];

  const anggota = [...tim.anggota, tim.dosen, tim.developer];

  return (
    <PageShell tone="emerald" backHref="/">
      {/* hero */}
      <Reveal className="mt-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative isolate">
            <div className="absolute inset-0 -z-10 rounded-full bg-white/60 blur-2xl" />
            <Mascot size={120} />
          </div>
          <h1 className="mt-3 bg-linear-to-r from-emerald-600 via-teal-500 to-sky-500 bg-clip-text text-3xl font-extrabold text-transparent">
            {namaWebsite}
          </h1>
          <p className="mt-1 text-slate-600">{tagline}</p>
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <GlassCard title="Tentang website ini">
          <div className="mt-2 space-y-3 text-sm leading-relaxed text-slate-600">
            {tujuan.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </GlassCard>
      </Reveal>

      {/* fitur */}
      <Reveal className="mt-6">
        <h2 className="mb-3 font-bold text-slate-700">Apa yang ada di sini?</h2>
        <div className="grid gap-3">
          {fitur.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="flex items-start gap-3 rounded-2xl bg-white/85 p-4 shadow-md shadow-black/5 ring-1 ring-white/70 backdrop-blur">
                <span
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-100 to-sky-100 text-2xl"
                >
                  {f.emoji}
                </span>
                <div className="text-sm text-slate-600">
                  <b className="text-slate-700">{f.title}</b>
                  <p className="mt-0.5">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* PKM */}
      <Reveal className="mt-6">
        <h2 className="mb-3 font-bold text-slate-700">Program PKM</h2>
        <div className="grid grid-cols-2 gap-3">
          {pkmItems.map((p) => (
            <div
              key={p.label}
              className={`rounded-2xl bg-white/85 p-4 shadow-md shadow-black/5 ring-1 ring-white/70 backdrop-blur ${
                p.wide ? "col-span-2" : ""
              }`}
            >
              <p className="text-xs font-semibold tracking-wide text-emerald-600 uppercase">
                {p.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                {p.value}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* tim */}
      <Reveal className="mt-6">
        <h2 className="mb-3 font-bold text-slate-700">Tim kami</h2>
        <div className="grid gap-3">
          {anggota.map((o, i) => (
            <Reveal key={o.nama + o.peran} delay={i * 0.06}>
              <div className="flex items-center gap-3 rounded-2xl bg-white/85 p-3 shadow-md shadow-black/5 ring-1 ring-white/70 backdrop-blur">
                <span
                  aria-hidden
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-sm font-extrabold text-white shadow ${
                    avatarColors[i % avatarColors.length]
                  }`}
                >
                  {initials(o.nama)}
                </span>
                <div>
                  <p className="font-semibold text-slate-700">{o.nama}</p>
                  <p className="text-xs text-slate-500">{o.peran}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <GlassCard title="Catatan penting">
          <div className="mt-2 space-y-3 text-sm leading-relaxed text-slate-600">
            <p>
              Website ini untuk edukasi dan bukan pengganti diagnosis atau
              perawatan dari psikolog, psikiater, maupun tenaga kesehatan.
              Kalau kamu butuh bantuan, buka halaman{" "}
              <Link href="/bantuan" className="font-semibold underline">
                Butuh Bantuan
              </Link>
              .
            </p>
            <p>
              Kami tidak meminta data pribadi seperti nama atau email, dan kamu
              tidak perlu membuat akun untuk memakai website ini.
            </p>
          </div>
        </GlassCard>
      </Reveal>

      <Reveal className="mt-6">
        <GlassCard title="Saran dan masukan">
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Ada saran atau menemukan sesuatu yang kurang pas? Kabari kami di{" "}
            <a
              href={`mailto:${kontak.email}`}
              className="font-semibold text-sky-600 underline"
            >
              {kontak.email}
            </a>
            .
          </p>
        </GlassCard>
      </Reveal>
    </PageShell>
  );
}
