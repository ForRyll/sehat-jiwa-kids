"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type Option = { emoji: string; name: string; note: string };
type Scenario = { situation: string; options: Option[] };

const scenarios: Scenario[] = [
  {
    situation: "Besok ada presentasi, tapi slide kamu belum selesai.",
    options: [
      { emoji: "😰", name: "Cemas", note: "Cemas itu tanda tubuhmu lagi siap-siap menghadapi hal penting." },
      { emoji: "😵", name: "Panik", note: "Panik muncul waktu terasa nggak ada waktu. Tarik napas dulu, lalu pecah tugasnya jadi bagian kecil." },
      { emoji: "🔥", name: "Tertantang", note: "Rasa tertantang bisa jadi bahan bakar. Pakai buat mulai satu langkah kecil." },
    ],
  },
  {
    situation: "Nilai ujian keluar dan lebih rendah dari harapanmu.",
    options: [
      { emoji: "😞", name: "Kecewa", note: "Kecewa itu tanda kamu peduli sama usahamu." },
      { emoji: "😠", name: "Marah", note: "Marah sering muncul waktu usaha terasa nggak dihargai. Boleh dirasain, lalu salurkan dengan sehat." },
      { emoji: "😳", name: "Malu", note: "Malu itu wajar, tapi satu nilai nggak menentukan siapa dirimu." },
    ],
  },
  {
    situation: "Teman-temanmu lagi hangout, tapi kamu nggak diajak.",
    options: [
      { emoji: "😢", name: "Sedih", note: "Sedih itu wajar waktu merasa ditinggalkan." },
      { emoji: "🫥", name: "Kesepian", note: "Kesepian itu sinyal bahwa kamu butuh koneksi. Coba kabarin satu orang yang kamu nyaman." },
      { emoji: "😤", name: "Kesal", note: "Kesal bisa muncul dari rasa nggak dianggap. Kadang ngobrol langsung bisa meluruskan salah paham." },
    ],
  },
  {
    situation: "Tugas kelompok, tapi cuma kamu yang benar-benar mengerjakan.",
    options: [
      { emoji: "😤", name: "Kesal", note: "Kesal itu masuk akal waktu bebannya nggak adil." },
      { emoji: "😮‍💨", name: "Lelah", note: "Lelah menandakan kamu udah ngasih banyak. Jangan lupa istirahat." },
      { emoji: "🥺", name: "Tidak dihargai", note: "Merasa nggak dihargai itu berat. Menyampaikan kebutuhanmu ke tim adalah langkah yang sah." },
    ],
  },
  {
    situation: "Akhirnya tugas besarmu selesai dan sudah dikumpulkan!",
    options: [
      { emoji: "😌", name: "Lega", note: "Lega itu tanda tubuhmu akhirnya boleh rileks. Nikmati." },
      { emoji: "🥳", name: "Bangga", note: "Bangga itu pantas. Kamu udah melewati prosesnya." },
      { emoji: "😶", name: "Kosong", note: "Rasa kosong setelah tegang lama itu umum. Kasih waktu buat tubuh dan pikiranmu pulih." },
    ],
  },
];

export default function EmosiPage() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const finished = index >= scenarios.length;
  const scenario = scenarios[index];

  const next = () => {
    setPicked(null);
    setIndex((i) => i + 1);
  };

  const restart = () => {
    setPicked(null);
    setIndex(0);
  };

  return (
    <main className="min-h-screen bg-amber-50 px-5 py-8">
      <div className="mx-auto max-w-md">
        <Link href="/main" className="text-sm text-slate-500">
          ← Kembali
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-slate-700">Tebak Emosi 🎭</h1>
        <p className="mt-2 text-slate-600">
          Nggak ada jawaban salah. Pilih perasaan yang paling mirip denganmu.
        </p>

        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-3xl bg-white p-6 text-center shadow-sm"
            >
              <p className="text-4xl">🌟</p>
              <h2 className="mt-3 text-xl font-bold text-slate-700">Kerja bagus!</h2>
              <p className="mt-2 text-sm text-slate-600">
                Mengenali perasaan adalah langkah pertama buat mengelolanya.
              </p>
              <button
                onClick={restart}
                className="mt-5 w-full rounded-full bg-amber-400 py-3 font-semibold text-white active:scale-95"
              >
                Main lagi
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className="mt-6"
            >
              <p className="text-xs text-slate-500">
                Situasi {index + 1} dari {scenarios.length}
              </p>
              <div className="mt-2 rounded-3xl bg-white p-5 shadow-sm">
                <p className="font-semibold text-slate-700">{scenario.situation}</p>
              </div>

              <div className="mt-4 grid gap-3">
                {scenario.options.map((o, i) => (
                  <button
                    key={o.name}
                    disabled={picked !== null}
                    onClick={() => setPicked(i)}
                    className={`flex items-center gap-3 rounded-2xl p-4 text-left shadow-sm transition active:scale-95 ${
                      picked === i ? "bg-amber-200" : "bg-white"
                    } ${picked !== null && picked !== i ? "opacity-50" : ""}`}
                  >
                    <span className="text-3xl">{o.emoji}</span>
                    <span className="font-semibold text-slate-700">{o.name}</span>
                  </button>
                ))}
              </div>

              {picked !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-2xl bg-emerald-100 p-4"
                >
                  <p className="text-sm text-slate-700">
                    {scenario.options[picked].note}
                  </p>
                  <button
                    onClick={next}
                    className="mt-3 w-full rounded-full bg-emerald-400 py-2.5 font-semibold text-white active:scale-95"
                  >
                    {index === scenarios.length - 1 ? "Selesai" : "Lanjut"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}