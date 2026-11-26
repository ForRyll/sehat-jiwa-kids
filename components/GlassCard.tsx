type GlassCardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function GlassCard({
  title,
  children,
  className = "",
}: GlassCardProps) {
  return (
    <section
      className={`glass-surface rounded-3xl bg-white/85 p-5 shadow-lg shadow-black/5 ring-1 ring-white/70 backdrop-blur ${className}`}
    >
      {title && <h2 className="font-bold text-slate-700">{title}</h2>}
      {children}
    </section>
  );
}
