"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMotionSafe } from "@/lib/storage";

const stars = [
  { x: -46, y: -38, delay: 0, color: "text-amber-300" },
  { x: 48, y: -34, delay: 0.05, color: "text-sky-300" },
  { x: -58, y: 12, delay: 0.1, color: "text-rose-300" },
  { x: 56, y: 14, delay: 0.08, color: "text-emerald-300" },
  { x: -24, y: -56, delay: 0.04, color: "text-violet-300" },
  { x: 26, y: -54, delay: 0.12, color: "text-amber-200" },
];

export default function GentleSparkles({ burstKey }: { burstKey: number }) {
  const reduceMotion = useMotionSafe();

  if (reduceMotion || burstKey === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <AnimatePresence mode="popLayout">
        <div key={burstKey} className="relative">
          {stars.map((s, i) => (
            <motion.span
              key={i}
              className={`absolute text-base ${s.color}`}
              initial={{ opacity: 0.9, scale: 0.4, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.1, x: s.x, y: s.y }}
              transition={{
                duration: 0.75,
                delay: s.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              ✦
            </motion.span>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
