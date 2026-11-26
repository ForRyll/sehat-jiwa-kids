"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMotionSafe } from "@/lib/storage";

export type MascotMood =
  | "senang"
  | "tenang"
  | "menyemangati"
  | "berpikir"
  | "tidur";

type MascotProps = {
  size?: number;
  mood?: MascotMood;
  interactive?: boolean;
  onReact?: () => void;
};

export default function Mascot({
  size = 180,
  mood = "tenang",
  interactive = false,
  onReact,
}: MascotProps) {
  const reduceMotion = useMotionSafe();
  const [waving, setWaving] = useState(false);

  const activeMood: MascotMood = waving ? "senang" : mood;

  const triggerWave = () => {
    if (!interactive) return;
    setWaving(true);
    onReact?.();
    setTimeout(() => setWaving(false), 1400);
  };

  return (
    <motion.div
      animate={
        reduceMotion
          ? undefined
          : waving
            ? { y: [0, -14, -4, -10, 0], scale: [1, 1.05, 1] }
            : { y: [0, -10, 0] }
      }
      transition={
        waving
          ? { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
          : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
      }
      style={{ width: size, height: size }}
      className={interactive ? "cursor-pointer select-none" : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? "Sapa Awan, ketuk untuk melambai" : undefined}
      onClick={triggerWave}
      onKeyDown={(e) => {
        if (interactive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          triggerWave();
        }
      }}
    >
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        role="img"
        aria-label={`Maskot awan sedang ${activeMood}`}
      >
        {/* tangan kecil kanan saat melambai atau menyemangati */}
        {(waving || activeMood === "menyemangati") && (
          <motion.g
            animate={
              reduceMotion
                ? undefined
                : { rotate: [-10, 18, -10, 18, 0] }
            }
            transition={{ duration: 1.1, ease: "easeInOut" }}
            style={{ transformOrigin: "162px 128px" }}
          >
            <ellipse
              cx="172"
              cy="112"
              rx="11"
              ry="15"
              transform="rotate(24 172 112)"
              fill="#BFE3FF"
            />
          </motion.g>
        )}

        {/* badan awan */}
        <g fill="#BFE3FF">
          <circle cx="70" cy="110" r="45" />
          <circle cx="120" cy="90" r="50" />
          <circle cx="150" cy="120" r="38" />
          <rect x="50" y="110" width="120" height="48" rx="24" />
        </g>

        {/* pipi */}
        <circle
          cx="85"
          cy="128"
          r="9"
          fill="#FFB8C6"
          opacity={activeMood === "senang" ? 0.95 : 0.75}
        />
        <circle
          cx="135"
          cy="128"
          r="9"
          fill="#FFB8C6"
          opacity={activeMood === "senang" ? 0.95 : 0.75}
        />

        {/* mata berdasarkan mood */}
        {activeMood === "tidur" ? (
          <>
            <path
              d="M83 116 Q90 122 97 116"
              stroke="#33415C"
              strokeWidth="3.2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M123 116 Q130 122 137 116"
              stroke="#33415C"
              strokeWidth="3.2"
              fill="none"
              strokeLinecap="round"
            />
            <text
              x="148"
              y="72"
              fill="#64748B"
              fontSize="14"
              fontWeight="bold"
            >
              zZ
            </text>
          </>
        ) : activeMood === "senang" ? (
          <>
            <path
              d="M83 117 Q90 109 97 117"
              stroke="#33415C"
              strokeWidth="3.2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M123 117 Q130 109 137 117"
              stroke="#33415C"
              strokeWidth="3.2"
              fill="none"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <motion.ellipse
              cx="90"
              cy="115"
              rx="5"
              ry={activeMood === "berpikir" ? 5.5 : 7}
              fill="#33415C"
              animate={reduceMotion ? undefined : { scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                times: [0, 0.45, 0.5, 0.55, 1],
              }}
              style={{ transformOrigin: "90px 115px" }}
            />
            <motion.ellipse
              cx="130"
              cy="115"
              rx="5"
              ry={activeMood === "berpikir" ? 5.5 : 7}
              fill="#33415C"
              animate={reduceMotion ? undefined : { scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                times: [0, 0.45, 0.5, 0.55, 1],
              }}
              style={{ transformOrigin: "130px 115px" }}
            />
          </>
        )}

        {/* mulut berdasarkan mood */}
        {activeMood === "berpikir" ? (
          <path
            d="M103 134 L117 132"
            stroke="#33415C"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        ) : activeMood === "tidur" ? (
          <circle cx="110" cy="134" r="3.5" fill="#33415C" opacity="0.7" />
        ) : activeMood === "senang" || activeMood === "menyemangati" ? (
          <path
            d="M98 130 Q110 145 122 130"
            stroke="#33415C"
            strokeWidth="3.2"
            fill="none"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M100 132 Q110 141 120 132"
            stroke="#33415C"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        )}
      </svg>
    </motion.div>
  );
}
