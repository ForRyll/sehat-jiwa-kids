"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Beranda", icon: "🏠" },
  { href: "/belajar", label: "Belajar", icon: "📖" },
  { href: "/main", label: "Main", icon: "🎮" },
  { href: "/bantuan", label: "Bantuan", icon: "🤝" },
  { href: "/tentang", label: "Tentang", icon: "ℹ️" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi utama"
      className="glass-surface fixed inset-x-0 bottom-0 z-40 border-t border-white/70 bg-white/85 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_-8px_rgba(15,23,42,0.1)] backdrop-blur-md"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 px-1.5 py-1.5">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-1 text-[11px] transition active:scale-95 ${
                  isActive
                    ? "bg-sky-100/90 font-extrabold text-sky-800 shadow-xs ring-1 ring-sky-200/80"
                    : "font-semibold text-slate-600 hover:bg-slate-100/70 hover:text-slate-800"
                }`}
              >
                <span aria-hidden className="text-base leading-none">
                  {item.icon}
                </span>
                <span className="max-w-full truncate leading-tight">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
