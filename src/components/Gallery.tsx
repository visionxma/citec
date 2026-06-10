"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DimensionLine } from "./DimensionLine";

const SHOTS = [
  {
    src: "/images/eng-projeto.jpg",
    alt: "Engenheiro desenhando uma planta técnica com escala sobre a prancheta",
    eyebrow: "Análise",
    title: "Viabilidade do empreendimento",
  },
  {
    src: "/images/eng-obra.jpg",
    alt: "Operários e armaduras de aço em um canteiro de obras visto do alto",
    eyebrow: "Prefeitura",
    title: "Licenças e aprovações",
  },
  {
    src: "/images/eng-arquitetura.jpg",
    alt: "Arranha-céus de vidro vistos de baixo para cima",
    eyebrow: "CREA",
    title: "Responsabilidade técnica",
  },
  {
    src: "/images/eng-equipe.jpg",
    alt: "Equipe de engenheiros de capacete sobre uma laje em construção",
    eyebrow: "Construção",
    title: "Gestão de equipes",
  },
];

export function Gallery() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <DimensionLine label="Inovação · Tecnologia · Construção" className="mb-6 sm:mb-8" />

      <div className="flex items-end justify-between gap-3 mb-5 sm:mb-6 flex-wrap">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl leading-none">Da sala de aula ao mercado de trabalho</h2>
        <span className="text-xs sm:text-sm text-white/50 max-w-xs sm:text-right">
          O caminho do projeto à obra — o que a engenharia reúne em três dias.
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {SHOTS.map(({ src, alt, eyebrow, title }, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 aspect-[4/5]"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute inset-0 bg-blueprint opacity-20 mix-blend-overlay pointer-events-none" />

            <span className="absolute top-3 left-3 font-mono text-[10px] text-white/50">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-[10px] uppercase tracking-[0.25em] text-pink-light">{eyebrow}</p>
              <p className="font-display text-base sm:text-xl leading-tight mt-1">{title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
