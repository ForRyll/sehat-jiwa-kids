"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { useCalmMode, useDarkMode, useTextSize } from "@/lib/storage";

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { calmMode } = useCalmMode();
  const { darkMode } = useDarkMode();
  const { textSize } = useTextSize();

  useEffect(() => {
    document.documentElement.dataset.calmMode = calmMode ? "true" : "false";
  }, [calmMode]);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.dataset.textSize = textSize;
  }, [textSize]);

  return (
    <MotionConfig reducedMotion={calmMode ? "always" : "user"}>
      {children}
    </MotionConfig>
  );
}
