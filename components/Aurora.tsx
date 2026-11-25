"use client";

import { motion, useReducedMotion } from "framer-motion";

const stars = [
  { top: "6%", left: "14%", size: 14, delay: 0 },
  { top: "12%", left: "78%", size: 18, delay: 1.2 },
  { top: "26%", left: "42%", size: 10, delay: 0.6 },
  { top: "34%", left: "90%", size: 12, delay: 2 },
  { top: "48%", left: "8%", size: 16, delay: 1.6 },
  { top: "58%", left: "70%", size: 10, delay: 0.3 },
  { top: "72%", left: "30%", size: 14, delay: 2.4 },
  { top: "84%", left: "86%", size: 18, delay: 0.9 },
  { top: "92%", left: "12%", size: 12, delay: 1.9 },
];

type AuroraProps = {
  /** class Tailwind lengkap untuk warna gumpalan, contoh: "bg-cyan-300/50" */
  blobA: string;
  blobB: string;
};

export default function Aurora({ blobA, blobB }: AuroraProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className={`absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl ${blobA}`}
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute -bottom-28 -left-24 h-80 w-80 rounded-full blur-3xl ${blobB}`}
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 50, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-white"
          style={{ top: s.top, left: s.left, fontSize: s.size }}
          initial={false}
          animate={
            reduceMotion
              ? { opacity: 0.6 }
              : { opacity: [0.15, 0.95, 0.15], scale: [0.8, 1.25, 0.8] }
          }
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}
