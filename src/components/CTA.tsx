"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden bg-gradient-to-br from-pink via-pink-dark to-accent p-6 sm:p-8 md:p-12 text-center"
      >
        <div className="absolute inset-0 bg-hatch-bold opacity-40" />
        {/* Faixa estilo "atenção obra" no topo */}
        <div className="absolute top-0 inset-x-0 h-2 bg-hatch-bold" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
        <div className="absolute bottom-0 inset-x-0 h-2 bg-hatch-bold" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-pink-light/30 rounded-full blur-[100px] sm:blur-[120px]" />

        <div className="relative">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/70 mb-2 sm:mb-3">Junte-se</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl leading-[0.95]">
            Pronto para <span className="font-serif italic font-normal">construir</span> com a gente?
          </h2>
          <p className="text-sm sm:text-base text-white/80 mt-3 max-w-xl mx-auto">
            Três dias para fazer parte do que vai definir o setor pelos próximos anos.
          </p>
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/programacao"
              className="group bg-ink text-white font-semibold px-6 sm:px-7 py-3 rounded-full inline-flex items-center justify-center gap-2 hover:bg-white hover:text-ink transition-colors"
            >
              Explorar programação
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </Link>
            <Link
              href="/ingresso-jogos"
              className="group bg-white/10 backdrop-blur border border-white/30 text-white font-semibold px-6 sm:px-7 py-3 rounded-full inline-flex items-center justify-center gap-2 hover:bg-white hover:text-ink transition-colors"
            >
              Gerar ingresso
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
