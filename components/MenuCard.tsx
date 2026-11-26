"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMotionSafe } from "@/lib/storage";

type MenuCardProps = {
  href: string;
  title: string;
  desc: string;
  emoji: string;
  illustration?: React.ReactNode;
  color: string; // class Tailwind lengkap, contoh: "bg-sky-100"
  index: number;
};

export default function MenuCard({
  href,
  title,
  desc,
  emoji,
  illustration,
  color,
  index,
}: MenuCardProps) {
  const reduceMotion = useMotionSafe();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.1 * index,
        type: "spring",
        stiffness: 140,
        damping: 16,
      }}
      whileHover={{ y: -4, rotate: index % 2 === 0 ? -1 : 1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={href}
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl p-4 shadow-lg shadow-black/5 ring-1 ring-white/70 ${color}`}
      >
        {/* dekorasi lingkaran di sudut */}
        <span
          aria-hidden
          className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/40 transition-transform duration-500 group-hover:scale-125"
        />

        <motion.span
          aria-hidden
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 text-3xl shadow-sm"
          animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
          transition={{
            duration: 3 + (index % 3) * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        >
          {illustration ?? emoji}
        </motion.span>

        <span className="relative mt-3 text-lg font-bold text-slate-700">
          {title}
        </span>
        <span className="relative mt-1 flex-1 text-sm text-slate-600">
          {desc}
        </span>
        <span
          aria-hidden
          className="relative mt-3 self-end text-lg font-bold text-slate-500 transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}
