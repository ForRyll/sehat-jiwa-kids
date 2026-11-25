"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Mascot from "./Mascot";

const STORAGE_KEY = "onboarding-done";

const slides = [
  {
    title: "Hai, aku Awan!",
    text: "Selamat datang! Di sini kamu bisa belajar mengenal dan merawat kesehatan mentalmu dengan cara yang santai.",
  },
  {
    title: "Apa yang bisa kamu lakukan?",
    text: "Baca materi singkat yang gampang dipahami, lalu main game relaksasi buat nenangin pikiran.",
  },
  {
    title: "Satu hal penting",
    text: "Website ini untuk edukasi, bukan pengganti psikolog. Kalau butuh bantuan, buka menu Butuh Bantuan ya.",
  },
];

const subscribe = () => () => {};

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

// di server dianggap "sudah selesai" supaya overlay nggak ikut ter-render
const getServerSnapshot = () => true;

export default function Onboarding() {
  const done = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);
  const [step, setStep] = useState(0);

  const show = !done && !dismissed;

  const finish = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setDismissed(true);
  };

  const isLast = step === slides.length - 1;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sky-50 px-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            onClick={finish}
            className="absolute right-5 top-5 text-sm text-slate-500"
          >
            Lewati
          </button>

          <Mascot size={150} />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className="mt-8 max-w-sm"
            >
              <h2 className="text-2xl font-bold text-slate-700">
                {slides[step].title}
              </h2>
              <p className="mt-3 text-slate-600">{slides[step].text}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === step ? "w-6 bg-sky-400" : "w-2 bg-sky-200"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => (isLast ? finish() : setStep(step + 1))}
            className="mt-8 w-full max-w-xs rounded-full bg-sky-400 py-3 font-semibold text-white active:scale-95"
          >
            {isLast ? "Mulai" : "Lanjut"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}