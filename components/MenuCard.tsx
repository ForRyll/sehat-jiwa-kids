"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type MenuCardProps = {
  href: string;
  title: string;
  desc: string;
  emoji: string;
  color: string; // class Tailwind lengkap, contoh: "bg-sky-100"
  index: number;
};

export default function MenuCard({
  href,
  title,
  desc,
  emoji,
  color,
  index,
}: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 * index, duration: 0.4 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={href}
        className={`flex h-full flex-col rounded-3xl p-4 shadow-sm ${color}`}
      >
        <span className="text-4xl">{emoji}</span>
        <span className="mt-3 text-lg font-bold text-slate-700">{title}</span>
        <span className="mt-1 text-sm text-slate-600">{desc}</span>
      </Link>
    </motion.div>
  );
}