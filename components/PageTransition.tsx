"use client";

import { motion } from "framer-motion";
import { useMotionSafe } from "@/lib/storage";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useMotionSafe();

  if (reduceMotion) {
    return <div className="flex flex-1 flex-col">{children}</div>;
  }

  return (
    <motion.div
      className="flex flex-1 flex-col"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
