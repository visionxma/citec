"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const STATS = [
  { value: 3, suffix: "", label: "Dias de evento" },
  { value: 18, suffix: "", label: "Sessões oficiais" },
  { value: 21, suffix: "", label: "Palestrantes" },
  { value: 12, suffix: "", label: "Minicursos práticos" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString("pt-BR"));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [inView, to]);

  return (
    <span ref={ref} className="inline-flex items-baseline font-mono font-bold tracking-tight">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-8 sm:py-12 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-hatch opacity-70" />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl sm:rounded-3xl overflow-hidden">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-ink p-5 sm:p-6 md:p-8 group hover:bg-ink-soft transition-colors duration-300"
            >
              <div className="font-display text-3xl sm:text-4xl md:text-6xl text-gradient-pink leading-none">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/50 group-hover:text-pink-light transition-colors">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
