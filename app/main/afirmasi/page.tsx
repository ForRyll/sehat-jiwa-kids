
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GameShell from "@/components/GameShell";
import { useMotionSafe } from "@/lib/storage";

const cards = [
  "Nggak apa-apa kalau hari ini cuma bisa sedikit. Sedikit tetap berarti.",
  "Kamu boleh istirahat tanpa harus merasa bersalah.",
  "Progress nggak selalu terlihat, tapi kamu tetap bergerak.",
  "Perasaanmu valid, sekecil apa pun itu.",
  "Membandingkan dirimu dengan orang lain nggak adil buat prosesmu.",
  "Meminta bantuan itu tanda keberanian, bukan kelemahan.",
  "Satu langkah kecil hari ini sudah cukup.",
  "Kamu lebih dari sekadar nilai dan pencapaianmu.",
  "Kamu sudah melewati hari-hari berat sebelumnya, dan kamu masih di sini.",
];

// Arah percikan saat kartu terbuka
const sparkles = [
  { x: -100, y: -120 },
  { x: 105, y: -95 },
  { x: -120, y: 15 },
  { x: 125, y: 45 },
  { x: -65, y: 130 },
  { x: 75, y: 140 },
];

function pickNext(prev: number) {
  let n: number;

  do {
    n = Math.floor(Math.random() * cards.length);
  } while (n === prev);

  return n;
}

export default function AfirmasiPage() {
  const reduceMotion = useMotionSafe();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [drawn, setDrawn] = useState(0);

  const handleTap = () => {
    if (flipped) {
      setFlipped(false);
      return;
    }

    setIndex((prev) => pickNext(prev));
    setDrawn((d) => d + 1);
    setFlipped(true);
  };

  return (
    <GameShell tone="violet">
      <h1 className="mt-5 text-center text-2xl font-extrabold text-slate-700">
        Kartu Afirmasi 💌
      </h1>

      <p className="mx-auto mt-2 max-w-xs text-center text-slate-600">
        Ketuk kartunya, ambil satu kalimat buat hari ini.
      </p>

      <div className="flex flex-1 flex-col items-center justify-center py-8">
        <motion.div
          className="relative"
          animate={
            flipped || reduceMotion
              ? { y: 0 }
              : { y: [0, -10, 0] }
          }
          transition={
            flipped || reduceMotion
              ? { duration: 0.3 }
              : {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          {/* Percikan saat kartu terbuka */}
          {flipped &&
            !reduceMotion &&
            sparkles.map((s, i) => (
              <motion.span
                key={`${drawn}-${i}`}
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-2xl"
                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: s.x,
                  y: s.y,
                  scale: [0, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.1,
                  delay: 0.3,
                  ease: "easeOut",
                }}
              >
                ✨
              </motion.span>
            ))}

          <motion.button
            onClick={handleTap}
            aria-label={flipped ? "Tutup kartu" : "Ambil kartu"}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="block h-80 w-64"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="relative h-full w-full"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 14,
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Sisi depan */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-linear-to-br from-violet-400 via-fuchsia-400 to-pink-300 p-6 shadow-xl shadow-fuchsia-300/50 ring-4 ring-white/60"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <span className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-white/20" />

                <span className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-white/20" />

                <span className="absolute top-5 right-6 text-xl opacity-80">
                  ✦
                </span>

                <span className="absolute bottom-6 left-6 text-lg opacity-80">
                  ✦
                </span>

                <span className="text-6xl drop-shadow">
                  ☁️
                </span>

                <span className="mt-4 font-bold text-white drop-shadow-sm">
                  Ketuk untuk ambil kartu
                </span>
              </div>

              {/* Sisi belakang */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-white p-6 text-center shadow-xl shadow-violet-300/50 ring-4 ring-violet-200"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <span className="text-3xl">💜</span>

                <p className="mt-4 text-lg font-bold text-slate-700">
                  {cards[index]}
                </p>

                <span className="mt-6 text-xs text-slate-400">
                  Ketuk lagi untuk menutup
                </span>
              </div>
            </motion.div>
          </motion.button>
        </motion.div>

        <p className="mt-8 h-5 text-xs font-semibold text-slate-500">
          {drawn > 0 ? `Kartu yang kamu ambil: ${drawn}` : ""}
        </p>
      </div>
    </GameShell>
  );
}
