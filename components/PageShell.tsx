import Aurora from "./Aurora";
import BackLink from "./BackLink";
import FloatingClouds from "./FloatingClouds";

type PageShellProps = {
  children: React.ReactNode;
  tone?: "sky" | "amber" | "rose" | "emerald" | "violet";
  /** Kalau diisi, tombol "Kembali" bubble muncul di atas halaman. */
  backHref?: string;
};

const tones = {
  sky: {
    bg: "from-sky-300 via-sky-100 to-indigo-100",
    blobA: "bg-cyan-300/50",
    blobB: "bg-indigo-300/40",
  },
  amber: {
    bg: "from-amber-300 via-orange-100 to-rose-100",
    blobA: "bg-yellow-300/50",
    blobB: "bg-rose-300/40",
  },
  rose: {
    bg: "from-rose-300 via-rose-100 to-orange-100",
    blobA: "bg-pink-300/50",
    blobB: "bg-orange-300/40",
  },
  emerald: {
    bg: "from-emerald-300 via-emerald-100 to-sky-100",
    blobA: "bg-teal-300/50",
    blobB: "bg-sky-300/40",
  },
  violet: {
    bg: "from-violet-300 via-fuchsia-100 to-pink-100",
    blobA: "bg-fuchsia-300/50",
    blobB: "bg-indigo-300/40",
  },
};

export default function PageShell({
  children,
  tone = "sky",
  backHref,
}: PageShellProps) {
  const t = tones[tone];

  return (
    <main
      className={`relative min-h-dvh overflow-hidden bg-linear-to-br px-5 py-8 ${t.bg}`}
    >
      {/* gumpalan warna yang bergerak pelan + bintang berkedip */}
      <Aurora blobA={t.blobA} blobB={t.blobB} />

      <FloatingClouds />

      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-md flex-col">
        {backHref && <BackLink href={backHref} />}
        {children}
      </div>
    </main>
  );
}
