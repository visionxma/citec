"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { palestrantes } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { DimensionLine } from "./DimensionLine";

export function Speakers() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <DimensionLine label={`${palestrantes.length} convidados`} className="mb-6 sm:mb-8" />

      <div className="flex items-end justify-between gap-3 mb-5 sm:mb-6 flex-wrap">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl leading-none">Quem fala no CITEC</h2>
        <Link href="/programacao" className="group inline-flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-pink-light">
          Ver na programação
          <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {palestrantes.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.4) }}
            className="group relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-ink-soft"
          >
            <Image
              src={p.foto}
              alt={p.nome}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

            <span className="absolute top-3 left-3 font-mono text-[10px] text-white/50">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-pink-light mb-1 truncate">{p.cargo}</p>
              <h3 className="font-display text-sm sm:text-base md:text-lg leading-tight">{p.nome}</h3>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
