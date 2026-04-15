"use client";

import { motion } from "framer-motion";

export function AmbientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden motion-reduce:hidden">
      <motion.div
        className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-primary/14 blur-[110px]"
        animate={{ x: [0, 90, -30, 0], y: [0, 30, 110, 0], scale: [1, 1.18, 0.96, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-4rem] top-28 h-96 w-96 rounded-full bg-secondary/14 blur-[140px]"
        animate={{ x: [0, -70, 20, 0], y: [0, 100, 30, 0], scale: [0.9, 1.12, 1, 0.9] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-7rem] left-[28%] h-[28rem] w-[28rem] rounded-full bg-primary-strong/10 blur-[150px]"
        animate={{ x: [0, 60, -60, 0], y: [0, -90, -20, 0], scale: [1, 1.08, 0.92, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-white/6"
        animate={{ rotate: [0, 180, 360], scale: [0.92, 1, 0.92] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 right-[18%] h-28 w-28 rounded-full bg-accent/10 blur-[70px]"
        animate={{ x: [0, 30, -20, 0], y: [0, -50, 20, 0], scale: [0.88, 1.05, 0.94, 0.88] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
