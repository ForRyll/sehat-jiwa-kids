"use client";

import { useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { useMotionSafe } from "@/lib/storage";
import GentleSparkles from "./GentleSparkles";
import Mascot from "./Mascot";

const subscribe = () => () => {};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 18) return "Selamat sore";
  return "Selamat malam";
}

// di server pakai sapaan netral supaya tidak beda dengan hasil hydration
const getServerGreeting = () => "Hai";

const cheers = [
  "Hai! Senang ketemu kamu lagi ✨",
  "Pelan-pelan aja hari ini, ya ☁️",
  "Kamu udah melakukan yang terbaik hari ini 💛",
];

export default function HomeHero() {
  const reduceMotion = useMotionSafe();
  const [burstKey, setBurstKey] = useState(0);
  const [tapped, setTapped] = useState(false);

  const greeting = useSyncExternalStore(
    subscribe,
    getGreeting,
    getServerGreeting
  );

  const handleReact = () => {
    setBurstKey((k) => k + 1);
    setTapped(true);
  };

  const bubbleText = tapped
    ? cheers[burstKey % cheers.length]
    : `${greeting}! Aku Awan ☁️`;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative isolate">
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
        <GentleSparkles burstKey={burstKey} />
        <Mascot size={132} mood="tenang" interactive onReact={handleReact} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 14 }}
        className="relative mt-5 rounded-2xl bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 shadow-md backdrop-blur"
      >
        <span
          aria-hidden
          className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white/80"
        />
        {bubbleText}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="mt-4 bg-linear-to-r from-sky-600 via-indigo-500 to-fuchsia-500 bg-clip-text text-3xl font-extrabold text-transparent"
      >
        Mau ngapain hari ini?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="mt-1 text-slate-600"
      >
        Pelan-pelan aja, nggak ada yang buru-buru.
      </motion.p>
    </div>
  );
}
