import Link from "next/link";

type BackLinkProps = {
  href?: string;
  label?: string;
};

export default function BackLink({
  href = "/",
  label = "Kembali",
}: BackLinkProps) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5 text-sm font-semibold text-slate-600 shadow-sm backdrop-blur transition hover:bg-white/80 active:scale-95"
    >
      <span
        aria-hidden
        className="transition-transform group-hover:-translate-x-0.5"
      >
        ←
      </span>
      {label}
    </Link>
  );
}
