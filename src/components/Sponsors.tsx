"use client";

import { motion } from "framer-motion";
import { patrocinadores } from "@/lib/data";
import { useState } from "react";
import { X, Instagram, Globe } from "lucide-react";
import { DimensionLine } from "./DimensionLine";
import type { Patrocinador } from "@/lib/types";

export function Sponsors() {
  const [open, setOpen] = useState<Patrocinador | null>(null);
  const diamante = patrocinadores.filter((p) => p.tier === "diamante");
  const ouro = patrocinadores.filter((p) => p.tier === "ouro");
  const prata = patrocinadores.filter((p) => p.tier === "prata");
  const all = [...patrocinadores, ...patrocinadores];

  return (
    <section className="relative py-8 sm:py-12 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-hatch opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 mb-6 sm:mb-8">
        <DimensionLine label="Apoiadores e Parceiros" className="mb-4 sm:mb-5" />
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl leading-none">Patrocinadores</h2>
        <p className="text-xs sm:text-sm text-white/50 mt-2 max-w-xl">
          Quem apoia o CITEC 2026.
        </p>
      </div>

      {/* Diamond — featured large */}
      {diamante.length > 0 && (
        <div className="relative max-w-7xl mx-auto px-4 mb-5 sm:mb-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 sm:mb-3">Patrocinador Diamante</p>
          <div className="grid gap-3 md:grid-cols-2">
            {diamante.map((s) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() => setOpen(s)}
                className="group relative h-28 sm:h-36 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-ink-soft to-ink hover:border-pink/40 transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
                  <img src={s.logo} alt={s.nome} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute top-2.5 left-3 text-[9px] sm:text-[10px] uppercase tracking-widest text-pink-light">
                  ✦ Principal
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Gold + Silver marquees */}
      {ouro.length > 0 && (
        <div className="relative mb-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 px-4 max-w-7xl mx-auto">Ouro</p>
          <div className="overflow-hidden marquee-mask">
            <div className="flex gap-3 animate-marquee w-max">
              {[...ouro, ...ouro, ...ouro, ...ouro].map((s, i) => (
                <button
                  key={`${s.id}-${i}`}
                  onClick={() => setOpen(s)}
                  className="shrink-0 w-44 sm:w-56 h-20 sm:h-24 rounded-xl sm:rounded-2xl border border-white/10 bg-ink-soft hover:border-pink hover:bg-pink/5 transition flex items-center justify-center p-3 sm:p-4"
                >
                  <img src={s.logo} alt={s.nome} className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {prata.length > 0 && (
        <div className="relative">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 px-4 max-w-7xl mx-auto">Prata</p>
          <div className="overflow-hidden marquee-mask">
            <div className="flex gap-2 animate-marquee-reverse w-max">
              {[...prata, ...prata, ...prata, ...prata].map((s, i) => (
                <button
                  key={`${s.id}-${i}`}
                  onClick={() => setOpen(s)}
                  className="shrink-0 w-36 sm:w-44 h-16 sm:h-20 rounded-xl border border-white/10 bg-ink-soft hover:border-pink hover:bg-pink/5 transition flex items-center justify-center p-2.5 sm:p-3"
                >
                  <img src={s.logo} alt={s.nome} className="max-h-full max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {open && (
        <div
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-2xl sm:rounded-3xl max-w-md w-full p-6 sm:p-8 relative"
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-pink flex items-center justify-center transition-colors"
              aria-label="Fechar"
            >
              <X size={16} />
            </button>
            <div className="h-24 sm:h-32 bg-white/5 rounded-2xl flex items-center justify-center p-4 sm:p-6 mb-4 sm:mb-5">
              <img src={open.logo} alt={open.nome} className="max-h-full max-w-full object-contain" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-pink-light">
              Patrocinador {open.tier}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl mt-1">{open.nome}</h3>
            {open.descricao && <p className="text-sm text-white/70 mt-3">{open.descricao}</p>}
            <div className="flex flex-wrap gap-2 mt-6">
              {open.site && (
                <a
                  href={open.site}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-ink px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90"
                >
                  <Globe size={14} /> Site
                </a>
              )}
              {open.instagram && (
                <a
                  href={`https://instagram.com/${open.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-pink text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-dark"
                >
                  <Instagram size={14} /> @{open.instagram}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
