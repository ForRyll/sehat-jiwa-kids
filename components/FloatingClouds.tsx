"use client";

import { motion } from "framer-motion";
import { useMotionSafe } from "@/lib/storage";

const clouds = [
  { top: "5%", left: "8%", size: 90, duration: 9, opacity: 0.7 },
  { top: "20%", left: "68%", size: 64, duration: 12, opacity: 0.55 },
  { top: "55%", left: "-6%", size: 110, duration: 14, opacity: 0.45 },
  { top: "78%", left: "62%", size: 80, duration: 10, opacity: 0.6 },
];

function CloudShape({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 120 72" fill="white">
      <circle cx="35" cy="42" r="26" />
      <circle cx="62" cy="32" r="30" />
      <circle cx="90" cy="45" r="22" />
      <rect x="20" y="42" width="85" height="26" rx="13" />
    </svg>
  );
}

export default function FloatingClouds() {
  const reduceMotion = useMotionSafe();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {clouds.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: c.top, left: c.left, opacity: c.opacity }}
          animate={reduceMotion ? undefined : { x: [0, 40, 0] }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <CloudShape size={c.size} />
        </motion.div>
      ))}
    </div>
  );
}