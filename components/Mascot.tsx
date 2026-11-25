"use client";

import { motion } from "framer-motion";

type MascotProps = {
  size?: number;
};

export default function Mascot({ size = 180 }: MascotProps) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%" role="img" aria-label="Maskot awan">
        {/* badan awan */}
        <g fill="#BFE3FF">
          <circle cx="70" cy="110" r="45" />
          <circle cx="120" cy="90" r="50" />
          <circle cx="150" cy="120" r="38" />
          <rect x="50" y="110" width="120" height="48" rx="24" />
        </g>

        {/* pipi */}
        <circle cx="85" cy="128" r="9" fill="#FFB8C6" opacity="0.8" />
        <circle cx="135" cy="128" r="9" fill="#FFB8C6" opacity="0.8" />

        {/* mata (berkedip) */}
        <motion.ellipse
          cx="90" cy="115" rx="5" ry="7" fill="#33415C"
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
          style={{ transformOrigin: "90px 115px" }}
        />
        <motion.ellipse
          cx="130" cy="115" rx="5" ry="7" fill="#33415C"
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
          style={{ transformOrigin: "130px 115px" }}
        />

        {/* senyum */}
        <path d="M100 132 Q110 142 120 132" stroke="#33415C" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}