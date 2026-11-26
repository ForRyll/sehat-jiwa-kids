import PageShell from "@/components/PageShell";

export default function BelajarLoading() {
  return (
    <PageShell tone="sky" backHref="/">
      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="h-16 w-16 rounded-2xl bg-white/60 motion-safe:animate-pulse" />
        <div className="h-7 w-36 rounded-2xl bg-white/60 motion-safe:animate-pulse" />
        <div className="h-4 w-56 rounded-xl bg-white/50 motion-safe:animate-pulse" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-40 rounded-3xl bg-white/60 motion-safe:animate-pulse"
          />
        ))}
      </div>
    </PageShell>
  );
}
