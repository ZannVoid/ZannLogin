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
    </div>
  );
}
