"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { palestrantes } from "@/lib/data";
import { Instagram, ArrowUpRight } from "lucide-react";

export function Speakers() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 py-24">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-pink-light">02 · Palestrantes</span>
            <div className="w-12 h-px bg-pink-light" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
            Mentes que <br />
            <span className="font-serif italic text-white/50 text-4xl md:text-6xl">moldam o futuro</span>
          </h2>
        </div>
        <a href="/programacao" className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-pink-light">
          Ver todos
          <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {palestrantes.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-ink-soft"
          >
            <Image
              src={p.foto}
              alt={p.nome}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-pink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-pink-light mb-2">{p.cargo}</p>
              <h3 className="font-display text-2xl md:text-3xl leading-tight">{p.nome}</h3>
              <p className="text-sm text-white/60 mt-2 line-clamp-2 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">
                {p.bio}
              </p>
              {p.instagram && (
                <a
                  href={`https://instagram.com/${p.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-pink-light mt-3"
                >
                  <Instagram size={12} /> @{p.instagram}
                </a>
              )}
            </div>

            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              <ArrowUpRight size={14} />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
