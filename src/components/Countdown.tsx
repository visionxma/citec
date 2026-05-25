"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms % 86400000) / 3600000),
    m: Math.floor((ms % 3600000) / 60000),
    s: Math.floor((ms % 60000) / 1000),
  };
}

export function Countdown({ target }: { target: string }) {
  const date = new Date(target);
  const [t, setT] = useState(() => diff(date));

  useEffect(() => {
    const id = setInterval(() => setT(diff(date)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { label: "dias", value: t.d },
    { label: "horas", value: t.h },
    { label: "min", value: t.m },
    { label: "seg", value: t.s },
  ];

  return (
    <div className="flex gap-px bg-white/5 rounded-2xl p-px overflow-hidden">
      {items.map((i, idx) => (
        <motion.div
          key={i.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * idx, duration: 0.5 }}
          className="flex-1 bg-ink/80 backdrop-blur px-3 sm:px-5 py-3 sm:py-4 first:rounded-l-2xl last:rounded-r-2xl text-center min-w-[60px] sm:min-w-[80px]"
        >
          <div className="font-mono font-bold text-3xl sm:text-4xl md:text-5xl leading-none text-white tracking-tight">
            {String(i.value).padStart(2, "0")}
          </div>
          <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40 mt-1.5 sm:mt-2">
            {i.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
