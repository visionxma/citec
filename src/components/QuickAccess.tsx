"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const items = [
  {
    href: "/programacao",
    eyebrow: "Agenda",
    title: "Programação completa",
    desc: "A grade dos três dias com horários, salas e quem fala em cada sessão.",
    accent: "from-pink to-pink-dark",
    big: true,
  },
  {
    href: "/materiais",
    eyebrow: "Depois do evento",
    title: "Materiais",
    desc: "Slides e gravações ficam aqui.",
    accent: "from-accent to-pink",
  },
  {
    href: "/ingresso-jogos",
    eyebrow: "Sala de jogos",
    title: "Pegar ingresso",
    desc: "Siga o patrocinador no Insta e gere seu QR.",
    accent: "from-pink-light to-accent",
  },
];

export function QuickAccess() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="flex items-baseline justify-between gap-3 mb-5 sm:mb-6 flex-wrap">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl leading-none">Atalhos</h2>
        <span className="text-xs sm:text-sm text-white/40">o que você provavelmente quer</span>
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-3 md:grid-rows-[auto] md:auto-rows-fr">
        {items.map(({ href, title, desc, eyebrow, accent, big }, i) => (
          <motion.div
            key={href}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={big ? "md:row-span-2" : ""}
          >
            <Link
              href={href}
              className={`group relative h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-ink-soft p-5 sm:p-6 md:p-7 flex flex-col justify-between hover:border-pink/40 transition-colors duration-500 ${big ? "min-h-[200px]" : "min-h-[120px] sm:min-h-[200px]"}`}
            >
              <div className={`absolute -inset-1 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700`} />

              <div className="relative">
                <div className="flex items-center justify-end mb-3 sm:mb-4">
                  <ArrowUpRight className="text-white/30 group-hover:text-pink-light group-hover:rotate-45 transition-all duration-500" size={20} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-pink-light mb-2">{eyebrow}</p>
                <h3 className={`font-display ${big ? "text-2xl sm:text-3xl md:text-4xl" : "text-lg sm:text-xl md:text-2xl"} leading-tight`}>
                  {title}
                </h3>
                <p className="text-white/60 mt-2 max-w-md text-xs sm:text-sm">{desc}</p>
              </div>

              {big && (
                <div className="relative mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-white/10 text-xs sm:text-sm text-white/50">
                  <p>Palestra magna · 4 mesas e palestras · minicursos manhã e tarde no sábado.</p>
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
