"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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

function pickNext(prev: number) {
  let n: number;
  do {
    n = Math.floor(Math.random() * cards.length);
  } while (n === prev);
  return n;
}

export default function AfirmasiPage() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleTap = () => {
    if (flipped) {
      setFlipped(false);
      return;
    }
    setIndex((prev) => pickNext(prev));
    setFlipped(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-violet-50 px-5 py-8">
      <div className="w-full max-w-md">
        <Link href="/main" className="text-sm text-slate-500">
          ← Kembali
        </Link>
      </div>

      <h1 className="mt-4 text-2xl font-bold text-slate-700">Kartu Afirmasi 💌</h1>
      <p className="mt-2 max-w-xs text-center text-slate-600">
        Ketuk kartunya, ambil satu kalimat buat hari ini.
      </p>

      <div className="flex flex-1 items-center justify-center py-8">
        <button
          onClick={handleTap}
          aria-label={flipped ? "Tutup kartu" : "Ambil kartu"}
          className="h-80 w-64 [perspective:1000px]"
        >
          <motion.div
            className="relative h-full w-full [transform-style:preserve-3d]"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* sisi depan */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-violet-300 p-6 shadow-lg [backface-visibility:hidden]">
              <span className="text-6xl">☁️</span>
              <span className="mt-4 font-semibold text-white">
                Ketuk untuk ambil kartu
              </span>
            </div>

            {/* sisi belakang */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-white p-6 text-center shadow-lg [backface-visibility:hidden]"
              style={{ transform: "rotateY(180deg)" }}
            >
              <span className="text-3xl">💜</span>
              <p className="mt-4 text-lg font-semibold text-slate-700">
                {cards[index]}
              </p>
              <span className="mt-6 text-xs text-slate-400">
                Ketuk lagi untuk menutup
              </span>
            </div>
          </motion.div>
        </button>
      </div>
    </main>
  );
}