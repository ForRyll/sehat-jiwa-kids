"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { useCalmMode, useDarkMode } from "@/lib/storage";

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { calmMode } = useCalmMode();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    document.documentElement.dataset.calmMode = calmMode ? "true" : "false";
  }, [calmMode]);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <MotionConfig reducedMotion={calmMode ? "always" : "user"}>
      {children}
    </MotionConfig>
  );
}
