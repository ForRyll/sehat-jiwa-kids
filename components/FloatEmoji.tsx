"use client";

import { motion, useReducedMotion } from "framer-motion";

type FloatEmojiProps = {
  emoji: string;
};

export default function FloatEmoji({ emoji }: FloatEmojiProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/70 text-5xl shadow-lg backdrop-blur"
      initial={{ scale: 0, rotate: -20 }}
      animate={
        reduceMotion
          ? { scale: 1, rotate: 0 }
          : { scale: 1, rotate: 0, y: [0, -6, 0] }
      }
      transition={{
        scale: { type: "spring", stiffness: 200, damping: 12 },
        rotate: { type: "spring", stiffness: 200, damping: 12 },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
      }}
    >
      {emoji}
    </motion.div>
  );
}
