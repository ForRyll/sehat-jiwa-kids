"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";

const questions = [
  {
    question: "Dalam seminggu terakhir, seberapa sering kamu merasa tegang, cemas, atau khawatir berlebihan?",
    options: [
      { score: 0, label: "Jarang / Tidak pernah" },
      { score: 1, label: "Kadang-kadang" },
      { score: 2, label: "Sering" },
      { score: 3, label: "Hampir setiap waktu" },
    ],
  },
  {
    question: "Apakah kamu mengalami kesulitan tidur atau sering terbangun di malam hari karena memikirkan tugas/kuliah?",
    options: [
      { score: 0, label: "Tidak pernah" },
      { score: 1, label: "1-2 kali seminggu" },
      { score: 2, label: "3-4 kali seminggu" },
      { score: 3, label: "Setiap hari" },
    ],
  },
  {
    question: "Seberapa sering kamu merasa sulit berkonsentrasi saat belajar atau mendengarkan penjelasan?",
    options: [
      { score: 0, label: "Tidak pernah" },
      { score: 1, label: "Jarang" },
      { score: 2, label: "Sering" },
      { score: 3, label: "Selalu" },
    ],
  },
  {
    question: "Apakah kamu merasa kehabisan energi atau mudah lelah tanpa alasan fisik yang jelas?",
    options: [
      { score: 0, label: "Tidak" },
      { score: 1, label: "Sedikit" },
      { score: 2, label: "Cukup sering" },
      { score: 3, label: "Sangat sering" },
    ],
  },
];

export default function SkriningPage() {
  const [current, setCurrent] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (score: number) => {
    const nextScore = totalScore + score;
    setTotalScore(nextScore);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setTotalScore(0);
    setFinished(false);
  };

  // Kategori hasil
  let resultTitle = "Kondisi Baik 🌟";
  let resultDesc = "Tingkat stresmu tampak terkendali. Pertahankan pola istirahat dan self-care yang baik!";
  let resultColor = "bg-emerald-50 text-emerald-800 border-emerald-200";

  if (totalScore >= 8) {
    resultTitle = "Perlu Perhatian / Stres Tinggi ⚠️";
    resultDesc = "Skor menunjukkan tingkat stres yang cukup tinggi. Coba gunakan latihan napas dalam, istirahat cukup, atau hubungi layanan bantuan jika butuh teman bicara.";
    resultColor = "bg-rose-50 text-rose-800 border-rose-200";
  } else if (totalScore >= 4) {
    resultTitle = "Stres Ringan / Sedang 💡";
    resultDesc = "Kamu sedang mengalami tekanan ringan hingga sedang. Luangkan waktu untuk relaksasi dan hobi.";
    resultColor = "bg-amber-50 text-amber-800 border-amber-200";
  }

  return (
    <PageShell tone="emerald" backHref="/main">
      <PageHeader
        emoji="📋"
        title="Skrining Mandiri Stres"
        desc="Kenali tingkat stres harianmu lewat asesmen keperawatan singkat."
      />

      <div className="mt-6">
        {!finished ? (
          <GlassCard className="p-6">
            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-3">
              <span>Pertanyaan {current + 1} dari {questions.length}</span>
              <span>Progress: {Math.round(((current + 1) / questions.length) * 100)}%</span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h2 className="text-lg font-bold text-slate-800 mb-6">
              {questions[current].question}
            </h2>

            <div className="space-y-3">
              {questions[current].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt.score)}
                  className="w-full text-left p-4 rounded-2xl bg-white/80 border border-slate-200/60 shadow-sm hover:bg-emerald-50 hover:border-emerald-300 transition active:scale-[0.99] font-medium text-slate-700"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </GlassCard>
        ) : (
          <GlassCard className="p-6 text-center">
            <span className="text-4xl mb-3 block">📊</span>
            <h2 className="text-xl font-extrabold text-slate-800 mb-2">Hasil Skrining</h2>
            <div className={`p-4 rounded-2xl border mb-6 text-left ${resultColor}`}>
              <h3 className="font-bold text-base mb-1">{resultTitle}</h3>
              <p className="text-sm">{resultDesc}</p>
              <p className="text-xs mt-2 opacity-80">Skor Total: {totalScore} / 12</p>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={resetQuiz}
                className="px-5 py-2.5 rounded-xl bg-slate-200 font-semibold text-slate-700 hover:bg-slate-300 transition"
              >
                Ulangi Tes
              </button>
              <Link
                href="/main/napas"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 font-semibold text-white hover:bg-emerald-700 transition shadow-md"
              >
                Coba Latihan Napas 🌬️
              </Link>
            </div>
          </GlassCard>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        *Skrining ini bersifat mandiri untuk edukasi keperawatan, bukan diagnosis klinis resmi.
      </p>
    </PageShell>
  );
}
