"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Garis tipis di atas layar yang memanjang sesuai seberapa jauh halaman dibaca
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-40 h-1.5 origin-left bg-linear-to-r from-sky-400 via-indigo-400 to-fuchsia-400"
      style={{ scaleX }}
    />
  );
}
