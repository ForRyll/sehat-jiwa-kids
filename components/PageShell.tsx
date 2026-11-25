type PageShellProps = {
  children: React.ReactNode;
  tone?: "sky" | "amber" | "rose" | "emerald" | "violet";
};

const gradients = {
  sky: "from-sky-200 via-sky-50 to-white",
  amber: "from-amber-200 via-amber-50 to-white",
  rose: "from-rose-200 via-rose-50 to-white",
  emerald: "from-emerald-200 via-emerald-50 to-white",
  violet: "from-violet-200 via-violet-50 to-white",
};

export default function PageShell({ children, tone = "sky" }: PageShellProps) {
  return (
    <main
      className={`min-h-screen bg-linear-to-b px-5 py-8 ${gradients[tone]}`}
    >
      <div className="mx-auto max-w-md">{children}</div>
    </main>
  );
}