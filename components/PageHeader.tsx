"use client";

import { motion, useReducedMotion } from "framer-motion";

type PageHeaderProps = {
  emoji: string;
  title: string;
  desc: string;
};

export default function PageHeader({ emoji, title, desc }: PageHeaderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-6 flex items-center gap-4"
    >
      <motion.div
        aria-hidden
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/70 text-4xl shadow-md backdrop-blur"
        animate={reduceMotion ? undefined : { rotate: [0, -10, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.5 }}
      >
        {emoji}
      </motion.div>
      <div>
        <h1 className="text-2xl font-extrabold text-slate-700">{title}</h1>
        <p className="mt-1 text-sm text-slate-600">{desc}</p>
      </div>
    </motion.div>
  );
}
