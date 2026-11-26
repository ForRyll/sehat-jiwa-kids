import Aurora from "./Aurora";
import BackLink from "./BackLink";
import FloatingClouds from "./FloatingClouds";
import PageTransition from "./PageTransition";

export type PageTone =
  | "sky"
  | "amber"
  | "rose"
  | "emerald"
  | "violet"
  | "indigo"
  | "neutral";

type PageShellProps = {
  children: React.ReactNode;
  tone?: PageTone;
  /** Kalau diisi, tombol "Kembali" bubble muncul di atas halaman. */
  backHref?: string;
};

const tones: Record<PageTone, { bg: string; blobA: string; blobB: string }> = {
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
  indigo: {
    bg: "from-indigo-300 via-sky-100 to-violet-100",
    blobA: "bg-indigo-300/50",
    blobB: "bg-sky-300/40",
  },
  neutral: {
    bg: "from-slate-200 via-slate-50 to-sky-50",
    blobA: "bg-slate-300/40",
    blobB: "bg-sky-200/40",
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
      className={`relative min-h-dvh overflow-x-hidden bg-linear-to-br px-4 pt-[calc(4.5rem+env(safe-area-inset-top))] pb-[calc(6.5rem+env(safe-area-inset-bottom))] sm:px-5 ${t.bg}`}
    >
      {/* gumpalan warna yang bergerak pelan + bintang berkedip */}
      <Aurora blobA={t.blobA} blobB={t.blobB} />

      <FloatingClouds />

      <div className="relative mx-auto flex min-h-[calc(100dvh-11rem)] max-w-md flex-col">
        {backHref && <BackLink href={backHref} />}
        <PageTransition>{children}</PageTransition>
      </div>
    </main>
  );
}
