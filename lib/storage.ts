"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

export const STORAGE_SCHEMA_VERSION = 1;
const SCHEMA_KEY = "sjk:schema-version";
const STORAGE_EVENT = "sjk-storage";

export const STORAGE_KEYS = {
  ONBOARDING_DONE: "onboarding-done",
  CALM_MODE: "sjk:calm-mode",
  DARK_MODE: "sjk:dark-mode",
  READ_MATERI: "sjk:read-materi",
  FAVORITE_MATERI: "sjk:favorite-materi",
  MOOD_HISTORY: "sjk:mood-history",
  DIARY_ENTRIES: "sjk:diary-entries",
  GAME_STATS: "sjk:game-stats",
  FAVORITE_AFIRMASI: "sjk:favorite-afirmasi",
  TEXT_SIZE: "sjk:text-size",
  HAPTIC_ENABLED: "sjk:haptic-enabled",
  SOUND_ENABLED: "sjk:sound-enabled",
} as const;

export type TextSize = "normal" | "medium" | "large";

export type GameStats = {
  napasCount: number;
  groundingCount: number;
  mitosFaktaCount: number;
  afirmasiDrawn: number;
  emosiCount: number;
  skriningCount: number;
};

export type MoodType =
  | "senang"
  | "tenang"
  | "biasa"
  | "lelah"
  | "sedih"
  | "berat";

export type MoodEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  mood: MoodType;
  note?: string;
  tags?: string[];
};

export type DiaryEntry = {
  id: string;
  title: string;
  content: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  sticker?: string;
  promptId?: string;
};

function isBrowser() {
  return typeof window !== "undefined";
}

function ensureSchema() {
  if (!isBrowser()) return;
  try {
    const raw = window.localStorage.getItem(SCHEMA_KEY);
    if (!raw) {
      window.localStorage.setItem(SCHEMA_KEY, String(STORAGE_SCHEMA_VERSION));
    }
  } catch {
    // Abaikan jika localStorage diblokir (mis. mode privat ketat)
  }
}

export function readStorageRaw(key: string): string | null {
  if (!isBrowser()) return null;
  ensureSchema();
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorageRaw(key: string, value: string): void {
  if (!isBrowser()) return;
  ensureSchema();
  try {
    window.localStorage.setItem(key, value);
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key } }));
  } catch {
    // Abaikan jika kuota penuh atau localStorage diblokir
  }
}

export function removeStorageRaw(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key } }));
  } catch {
    // Abaikan error akses storage
  }
}

export function readStorageJson<T>(key: string, fallback: T): T {
  const raw = readStorageRaw(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorageJson<T>(key: string, value: T): void {
  try {
    writeStorageRaw(key, JSON.stringify(value));
  } catch {
    // Abaikan jika serialisasi gagal
  }
}

function subscribeStorage(callback: () => void) {
  if (!isBrowser()) return () => {};

  const handleCustom = () => callback();
  const handleNative = () => callback();

  window.addEventListener(STORAGE_EVENT, handleCustom);
  window.addEventListener("storage", handleNative);

  return () => {
    window.removeEventListener(STORAGE_EVENT, handleCustom);
    window.removeEventListener("storage", handleNative);
  };
}

/**
 * Hook aman untuk membaca dan menulis nilai string di localStorage dengan useSyncExternalStore.
 */
export function useStorageString(
  key: string,
  clientFallback = "",
  serverFallback = clientFallback
) {
  const getSnapshot = useCallback(
    () => readStorageRaw(key) ?? clientFallback,
    [key, clientFallback]
  );
  const getServerSnapshot = useCallback(() => serverFallback, [serverFallback]);

  const value = useSyncExternalStore(
    subscribeStorage,
    getSnapshot,
    getServerSnapshot
  );

  const setValue = useCallback(
    (next: string) => {
      writeStorageRaw(key, next);
    },
    [key]
  );

  return [value, setValue] as const;
}

/**
 * Hook untuk Mode Tenang (mematikan animasi ambient dan mengurangi transisi).
 */
export function useCalmMode() {
  const [raw, setRaw] = useStorageString(STORAGE_KEYS.CALM_MODE, "0");
  const calmMode = raw === "1";

  const setCalmMode = useCallback(
    (enabled: boolean) => {
      setRaw(enabled ? "1" : "0");
    },
    [setRaw]
  );

  const toggleCalmMode = useCallback(() => {
    setRaw(calmMode ? "0" : "1");
  }, [calmMode, setRaw]);

  return { calmMode, setCalmMode, toggleCalmMode };
}

/**
 * Hook untuk Mode Gelap opsional dengan warna yang tetap lembut.
 */
export function useDarkMode() {
  const [raw, setRaw] = useStorageString(STORAGE_KEYS.DARK_MODE, "0");
  const darkMode = raw === "1";

  const setDarkMode = useCallback(
    (enabled: boolean) => {
      setRaw(enabled ? "1" : "0");
    },
    [setRaw]
  );

  const toggleDarkMode = useCallback(() => {
    setRaw(darkMode ? "0" : "1");
  }, [darkMode, setRaw]);

  return { darkMode, setDarkMode, toggleDarkMode };
}

/**
 * Hook untuk pilihan ukuran teks (normal, medium, large).
 */
export function useTextSize() {
  const [raw, setRaw] = useStorageString(STORAGE_KEYS.TEXT_SIZE, "normal");
  const textSize: TextSize =
    raw === "medium" || raw === "large" ? raw : "normal";

  const setTextSize = useCallback(
    (size: TextSize) => {
      setRaw(size);
    },
    [setRaw]
  );

  return { textSize, setTextSize };
}

/**
 * Hook untuk preferensi getaran haptic.
 */
export function useHapticSetting() {
  const [raw, setRaw] = useStorageString(STORAGE_KEYS.HAPTIC_ENABLED, "1");
  const hapticEnabled = raw !== "0";

  const setHapticEnabled = useCallback(
    (enabled: boolean) => {
      setRaw(enabled ? "1" : "0");
    },
    [setRaw]
  );

  const toggleHaptic = useCallback(() => {
    setRaw(hapticEnabled ? "0" : "1");
  }, [hapticEnabled, setRaw]);

  return { hapticEnabled, setHapticEnabled, toggleHaptic };
}

/**
 * Hook untuk preferensi suara (default mati).
 */
export function useSoundSetting() {
  const [raw, setRaw] = useStorageString(STORAGE_KEYS.SOUND_ENABLED, "0");
  const soundEnabled = raw === "1";

  const setSoundEnabled = useCallback(
    (enabled: boolean) => {
      setRaw(enabled ? "1" : "0");
    },
    [setRaw]
  );

  const toggleSound = useCallback(() => {
    setRaw(soundEnabled ? "0" : "1");
  }, [soundEnabled, setRaw]);

  return { soundEnabled, setSoundEnabled, toggleSound };
}

/**
 * Menghapus semua data lokal aplikasi di perangkat.
 */
export function clearAllAppData(): void {
  if (!isBrowser()) return;
  try {
    const keysToRemove = [
      STORAGE_KEYS.ONBOARDING_DONE,
      STORAGE_KEYS.CALM_MODE,
      STORAGE_KEYS.DARK_MODE,
      STORAGE_KEYS.READ_MATERI,
      STORAGE_KEYS.FAVORITE_MATERI,
      STORAGE_KEYS.MOOD_HISTORY,
      STORAGE_KEYS.DIARY_ENTRIES,
      STORAGE_KEYS.GAME_STATS,
      STORAGE_KEYS.FAVORITE_AFIRMASI,
      STORAGE_KEYS.TEXT_SIZE,
      STORAGE_KEYS.HAPTIC_ENABLED,
      STORAGE_KEYS.SOUND_ENABLED,
    ];
    for (const k of keysToRemove) {
      window.localStorage.removeItem(k);
    }
    window.dispatchEvent(
      new CustomEvent(STORAGE_EVENT, { detail: { key: "all" } })
    );
  } catch {
    // Abaikan error
  }
}

/**
 * Mengekspor seluruh data lokal pengguna menjadi file backup JSON.
 */
export function exportAllAppData(): boolean {
  if (!isBrowser()) return false;
  try {
    const data: Record<string, unknown> = {};
    const keys = [
      STORAGE_KEYS.READ_MATERI,
      STORAGE_KEYS.FAVORITE_MATERI,
      STORAGE_KEYS.MOOD_HISTORY,
      STORAGE_KEYS.DIARY_ENTRIES,
      STORAGE_KEYS.GAME_STATS,
      STORAGE_KEYS.FAVORITE_AFIRMASI,
      STORAGE_KEYS.CALM_MODE,
      STORAGE_KEYS.DARK_MODE,
      STORAGE_KEYS.TEXT_SIZE,
    ];
    for (const k of keys) {
      const val = window.localStorage.getItem(k);
      if (val !== null) {
        try {
          data[k] = JSON.parse(val);
        } catch {
          data[k] = val;
        }
      }
    }

    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sehatjiwa-backup-${getTodayDateString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Hook untuk menyimpan daftar slug (mis. materi dibaca atau favorit) di localStorage.
 */
export function useSlugList(key: string) {
  const [raw, setRaw] = useStorageString(key, "[]", "[]");

  const items = useMemo<string[]>(() => {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed)
        ? parsed.filter((x): x is string => typeof x === "string")
        : [];
    } catch {
      return [];
    }
  }, [raw]);

  const toggle = useCallback(
    (slug: string) => {
      const next = items.includes(slug)
        ? items.filter((s) => s !== slug)
        : [...items, slug];
      setRaw(JSON.stringify(next));
    },
    [items, setRaw]
  );

  const has = useCallback((slug: string) => items.includes(slug), [items]);

  return { items, toggle, has };
}

export function useReadMateri() {
  return useSlugList(STORAGE_KEYS.READ_MATERI);
}

export function useFavoriteMateri() {
  return useSlugList(STORAGE_KEYS.FAVORITE_MATERI);
}

export function useFavoriteAfirmasi() {
  return useSlugList(STORAGE_KEYS.FAVORITE_AFIRMASI);
}

export function getTodayDateString(): string {
  if (!isBrowser()) return "";
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function useMoodHistory() {
  const [raw, setRaw] = useStorageString(STORAGE_KEYS.MOOD_HISTORY, "[]", "[]");

  const entries = useMemo<MoodEntry[]>(() => {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as MoodEntry[]) : [];
    } catch {
      return [];
    }
  }, [raw]);

  const saveMood = useCallback(
    (mood: MoodType, note?: string, tags?: string[]) => {
      const now = Date.now();
      const today = getTodayDateString();
      const existingIdx = entries.findIndex((e) => e.date === today);

      let next: MoodEntry[];
      if (existingIdx >= 0) {
        next = [...entries];
        next[existingIdx] = {
          ...next[existingIdx],
          mood,
          timestamp: now,
          note: note !== undefined ? note : next[existingIdx].note,
          tags: tags !== undefined ? tags : next[existingIdx].tags,
        };
      } else {
        const newEntry: MoodEntry = {
          id: `mood-${now}`,
          date: today,
          timestamp: now,
          mood,
          note: note ?? "",
          tags: tags ?? [],
        };
        next = [newEntry, ...entries];
      }

      setRaw(JSON.stringify(next));
    },
    [entries, setRaw]
  );

  const deleteEntry = useCallback(
    (id: string) => {
      const next = entries.filter((e) => e.id !== id);
      setRaw(JSON.stringify(next));
    },
    [entries, setRaw]
  );

  const todayDate = isBrowser() ? getTodayDateString() : "";
  const todayEntry = useMemo(() => {
    if (!todayDate) return null;
    return entries.find((e) => e.date === todayDate) ?? null;
  }, [entries, todayDate]);

  return { entries, todayEntry, saveMood, deleteEntry };
}

export function useDiaryEntries() {
  const [raw, setRaw] = useStorageString(STORAGE_KEYS.DIARY_ENTRIES, "[]", "[]");

  const entries = useMemo<DiaryEntry[]>(() => {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as DiaryEntry[]) : [];
    } catch {
      return [];
    }
  }, [raw]);

  const saveEntry = useCallback(
    (data: {
      id?: string;
      title: string;
      content: string;
      sticker?: string;
      promptId?: string;
    }) => {
      const now = Date.now();
      const today = getTodayDateString();

      let next: DiaryEntry[];
      if (data.id) {
        next = entries.map((e) =>
          e.id === data.id
            ? {
                ...e,
                title: data.title,
                content: data.content,
                sticker: data.sticker ?? e.sticker,
                promptId: data.promptId ?? e.promptId,
                timestamp: now,
              }
            : e
        );
      } else {
        const newEntry: DiaryEntry = {
          id: `diary-${now}`,
          title: data.title || "Refleksi Hari Ini",
          content: data.content,
          date: today,
          timestamp: now,
          sticker: data.sticker || "✍️",
          promptId: data.promptId,
        };
        next = [newEntry, ...entries];
      }

      setRaw(JSON.stringify(next));
    },
    [entries, setRaw]
  );

  const deleteEntry = useCallback(
    (id: string) => {
      const next = entries.filter((e) => e.id !== id);
      setRaw(JSON.stringify(next));
    },
    [entries, setRaw]
  );

  const clearAllEntries = useCallback(() => {
    setRaw("[]");
  }, [setRaw]);

  const exportEntries = useCallback(
    (format: "txt" | "json" = "txt") => {
      if (!isBrowser() || entries.length === 0) return false;

      let fileContent = "";
      let mimeType = "text/plain";
      const fileName = `catatan-harian-${getTodayDateString()}.${format}`;

      if (format === "json") {
        fileContent = JSON.stringify(entries, null, 2);
        mimeType = "application/json";
      } else {
        fileContent = entries
          .map(
            (e) =>
              `========================================\n` +
              `Tanggal : ${e.date}\n` +
              `Judul   : ${e.sticker || "✍️"} ${e.title}\n` +
              `----------------------------------------\n` +
              `${e.content}\n` +
              `========================================\n\n`
          )
          .join("");
      }

      const blob = new Blob([fileContent], { type: `${mimeType};charset=utf-8` });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return true;
    },
    [entries]
  );

  return { entries, saveEntry, deleteEntry, clearAllEntries, exportEntries };
}

export function useGameStats() {
  const [raw, setRaw] = useStorageString(STORAGE_KEYS.GAME_STATS, "{}", "{}");

  const stats = useMemo<GameStats>(() => {
    try {
      const p = JSON.parse(raw);
      return {
        napasCount: p.napasCount || 0,
        groundingCount: p.groundingCount || 0,
        mitosFaktaCount: p.mitosFaktaCount || 0,
        afirmasiDrawn: p.afirmasiDrawn || 0,
        emosiCount: p.emosiCount || 0,
        skriningCount: p.skriningCount || 0,
      };
    } catch {
      return {
        napasCount: 0,
        groundingCount: 0,
        mitosFaktaCount: 0,
        afirmasiDrawn: 0,
        emosiCount: 0,
        skriningCount: 0,
      };
    }
  }, [raw]);

  const recordGame = useCallback(
    (key: keyof GameStats, amount = 1) => {
      const current = { ...stats };
      current[key] = (current[key] || 0) + amount;
      setRaw(JSON.stringify(current));
    },
    [stats, setRaw]
  );

  return { stats, recordGame };
}

/**
 * Mengembalikan true jika animasi harus dikurangi/dimatikan

 * (baik karena Mode Tenang aktif atau prefers-reduced-motion OS aktif).
 */
export function useMotionSafe() {
  const prefersReduced = useReducedMotion();
  const { calmMode } = useCalmMode();
  return Boolean(calmMode || prefersReduced);
}
