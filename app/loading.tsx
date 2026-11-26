import PageShell from "@/components/PageShell";

export default function Loading() {
  return (
    <PageShell tone="sky">
      <div className="mt-6 flex flex-col items-center gap-4">
        <div className="h-28 w-28 rounded-full bg-white/60 motion-safe:animate-pulse" />
        <div className="h-7 w-48 rounded-2xl bg-white/60 motion-safe:animate-pulse" />
        <div className="h-4 w-64 rounded-xl bg-white/50 motion-safe:animate-pulse" />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-36 rounded-3xl bg-white/60 motion-safe:animate-pulse"
          />
        ))}
      </div>
    </PageShell>
  );
}
