"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 28, scale: 0.985, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-full"
    >
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-[linear-gradient(90deg,transparent,rgba(114,242,255,0.98),rgba(213,145,255,0.9),transparent)]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0, 1, 0.5, 0] }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-y-0 left-[-18%] w-[40%] bg-[linear-gradient(90deg,transparent,rgba(114,242,255,0.2),rgba(255,255,255,0.08),transparent)] blur-2xl"
          initial={{ x: "-110%" }}
          animate={{ x: "340%" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {children}
    </motion.div>
  );
}
