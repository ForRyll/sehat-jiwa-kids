"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  STORAGE_KEYS,
  useMotionSafe,
  useStorageString,
} from "@/lib/storage";
import Aurora from "./Aurora";
import FloatingClouds from "./FloatingClouds";
import Mascot, { type MascotMood } from "./Mascot";

const slides: {
  emoji: string;
  mood: MascotMood;
  title: string;
  text: string;
}[] = [
  {
    emoji: "👋",
    mood: "senang",
    title: "Hai, aku Awan!",
    text: "Selamat datang! Di sini kamu bisa belajar mengenal dan merawat kesehatan mentalmu dengan cara yang santai.",
  },
  {
    emoji: "🎈",
    mood: "menyemangati",
    title: "Apa yang bisa kamu lakukan?",
    text: "Baca materi singkat yang gampang dipahami, lalu main game relaksasi buat nenangin pikiran.",
  },
  {
    emoji: "💛",
    mood: "tenang",
    title: "Satu hal penting",
    text: "Website ini untuk edukasi, bukan pengganti psikolog. Kalau butuh bantuan, buka menu Butuh Bantuan ya.",
  },
];

export default function Onboarding() {
  const reduceMotion = useMotionSafe();
  // di server dianggap "sudah selesai" ("1") supaya overlay nggak ikut ter-render
  const [doneRaw, setDoneRaw] = useStorageString(
    STORAGE_KEYS.ONBOARDING_DONE,
    "0",
    "1"
  );
  const show = doneRaw !== "1";
  const [step, setStep] = useState(0);

  const finish = () => {
    setDoneRaw("1");
    setStep(0);
  };

  const isLast = step === slides.length - 1;
  const slide = slides[step];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-linear-to-b from-sky-300 via-indigo-200 to-fuchsia-200 px-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.35 }}
        >
          <Aurora blobA="bg-cyan-200/60" blobB="bg-fuchsia-300/50" />
          <FloatingClouds />

          <button
            type="button"
            onClick={finish}
            className="absolute top-[calc(1rem+env(safe-area-inset-top))] right-5 z-10 inline-flex min-h-11 items-center rounded-full bg-white/70 px-4 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:bg-white/90 active:scale-95"
          >
            Lewati
          </button>

          <div className="relative z-10 flex w-full flex-col items-center">
            {/* maskot dengan riak dan ekspresi per slide */}
            <motion.div
              className="relative isolate"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 140, damping: 12 }}
            >
              {!reduceMotion &&
                [0, 1].map((i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    className="absolute inset-0 rounded-full border-2 border-white/80"
                    animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 1.5,
                      ease: "easeOut",
                    }}
                  />
                ))}
              <div className="absolute inset-0 -z-10 rounded-full bg-white/60 blur-2xl" />
              <Mascot size={170} mood={slide.mood} />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="mt-8 flex max-w-sm flex-col items-center"
              >
                <motion.span
                  aria-hidden
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 text-3xl shadow-md backdrop-blur"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.1,
                    type: "spring",
                    stiffness: 240,
                    damping: 14,
                  }}
                >
                  {slide.emoji}
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="mt-4 text-2xl font-extrabold text-slate-700"
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="mt-3 text-slate-600"
                >
                  {slide.text}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex gap-2" aria-hidden>
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === step ? "w-7 bg-indigo-500" : "w-2 bg-white/80"
                  }`}
                />
              ))}
            </div>

            <motion.button
              type="button"
              onClick={() => (isLast ? finish() : setStep(step + 1))}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 min-h-12 w-full max-w-xs rounded-full bg-linear-to-r from-sky-400 via-indigo-400 to-fuchsia-400 py-3.5 text-lg font-bold text-white shadow-lg shadow-indigo-300/60"
            >
              {isLast ? "Mulai ✨" : "Lanjut"}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
