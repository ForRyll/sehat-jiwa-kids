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
} as const;

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

/**
 * Mengembalikan true jika animasi harus dikurangi/dimatikan
 * (baik karena Mode Tenang aktif atau prefers-reduced-motion OS aktif).
 */
export function useMotionSafe() {
  const prefersReduced = useReducedMotion();
  const { calmMode } = useCalmMode();
  return Boolean(calmMode || prefersReduced);
}
