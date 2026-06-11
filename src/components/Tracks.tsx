"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DimensionLine } from "./DimensionLine";
import { ArrowUpRight } from "lucide-react";

const PROGRAM = [
  {
    day: "11",
    weekday: "Quinta",
    label: "Abertura Oficial",
    time: "Credenciamento 15h · Magna 19h",
    items: ["Credenciamento e kit do evento", "Palestra Magna", "Palavra do CREA-PI"],
    accent: "from-pink-light to-pink",
  },
  {
    day: "12",
    weekday: "Sexta",
    label: "Palestras & Mesas Redondas",
    time: "14h às 18h",
    items: [
      "Mesa: Viabilidade de Empreendimentos",
      "Aprovação e Licenciamentos na Prefeitura",
      "Responsabilidades junto ao CREA-PI",
      "Mesa: Gestão de Equipes e Equipamentos",
    ],
    accent: "from-pink to-accent",
  },
  {
    day: "13",
    weekday: "Sábado",
    label: "Minicursos",
    time: "12 minicursos paralelos",
    items: ["08h — 12h · 6 turmas matutinas", "14h — 16h · 6 turmas vespertinas"],
    accent: "from-accent to-pink-light",
  },
];

export function Tracks() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <DimensionLine label="Cronograma Geral · 3 Dias" className="mb-6 sm:mb-8" />
      <div className="flex items-end justify-between mb-5 sm:mb-6 flex-wrap gap-3 sm:gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl leading-none">Como vai funcionar</h2>
          <p className="text-xs sm:text-sm text-white/50 mt-2 max-w-md">
            Abertura na quinta, palestras e mesas na sexta, minicursos no sábado.
          </p>
        </div>
        <Link href="/programacao" className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-pink-light">
          Ver tudo
          <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
        </Link>
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
        {PROGRAM.map((d, i) => {
          return (
            <motion.div
              key={d.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl sm:rounded-3xl border border-white/10 bg-ink-soft p-5 sm:p-6 hover:border-pink/40 hover:bg-ink-light transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br ${d.accent} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />

              <div className="relative">
                <div className="mb-3 sm:mb-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-pink-light">{d.weekday}</p>
                  <p className="font-mono font-bold text-5xl sm:text-6xl leading-none mt-1 text-stroke-white tracking-tight">{d.day}</p>
                  <p className="text-[11px] sm:text-xs text-white/40 mt-1">Junho · 2026</p>
                </div>

                <h3 className="font-display text-lg sm:text-xl leading-tight">{d.label}</h3>
                <p className="text-[11px] sm:text-xs uppercase tracking-widest text-white/40 mt-1">{d.time}</p>

                <ul className="mt-3 space-y-1.5 text-xs sm:text-sm">
                  {d.items.map((it, idx) => (
                    <li key={idx} className="flex gap-2 text-white/70">
                      <span className="text-pink-light">·</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
