"use client";

import { useRouter } from "next/navigation";
import { STORAGE_KEYS, writeStorageRaw } from "@/lib/storage";

export default function ReplayOnboardingButton() {
  const router = useRouter();

  const handleReplay = () => {
    writeStorageRaw(STORAGE_KEYS.ONBOARDING_DONE, "0");
    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleReplay}
      className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 font-bold text-white shadow-sm transition hover:bg-emerald-600 active:scale-95"
    >
      <span aria-hidden>☁️</span>
      <span>Putar Ulang Tutorial</span>
    </button>
  );
}
