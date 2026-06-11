"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLiveTalk } from "@/lib/liveStore";
import { palestras, getPalestrante } from "@/lib/data";
import { formatTime } from "@/lib/format";
import { useEffect, useState } from "react";
import { MapPin, Clock, ArrowUpRight, Radio } from "lucide-react";

export function LivePanel() {
  const liveId = useLiveTalk();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(id);
  }, []);

  const live = palestras.find((p) => p.id === liveId);

  return (
    <section className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="flex items-center gap-3 mb-4 sm:mb-5">
        <Radio size={14} className="text-pink-light" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-pink-light">
          Painel ao vivo
        </span>
        <div className="flex-1 divider-gradient" />
      </div>

      <AnimatePresence mode="wait">
        {!live ? (
          <motion.div
            key="offline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 overflow-hidden"
          >
            <div className="absolute inset-0 bg-hatch opacity-50 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-white/30" />
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white/40">
                  Aguardando próxima palestra
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl mt-2 text-stroke-white">
                EM BREVE
              </h2>
              <p className="text-white/60 text-sm sm:text-base mt-2 max-w-xl">
                Quando uma palestra começar, ela aparece aqui — em tempo real, sem refresh.
              </p>
              <Link
                href="/programacao"
                className="mt-4 inline-flex items-center gap-2 text-sm text-pink-light hover:text-white group"
              >
                Ver programação completa
                <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ) : (
          <LiveCard key={live.id} live={live} now={now} />
        )}
      </AnimatePresence>
    </section>
  );
}

// Imagem de fallback por trilha, usada quando a sessão não tem palestrante
// (credenciamento, abertura, coffee break, etc.).
const TRILHA_IMG: Record<string, string> = {
  "Construção": "/images/eng-obra.jpg",
  "Tecnologia": "/images/eng-projeto.jpg",
  "Inovação": "/images/eng-arquitetura.jpg",
};

function LiveCard({ live, now }: { live: (typeof palestras)[number]; now: number }) {
  const sp = getPalestrante(live.palestranteId);
  const imgSrc = sp?.foto ?? TRILHA_IMG[live.trilha] ?? "/images/eng-hero.jpg";
  const start = new Date(live.inicio).getTime();
  const end = new Date(live.fim).getTime();
  const progress = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-pink/30"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink/25 via-ink-soft to-accent/15" />
      <div className="absolute inset-0 bg-hatch opacity-60" />

      <div className="relative grid md:grid-cols-[260px_1fr] gap-0">
        <div className="relative h-48 sm:h-64 md:h-auto overflow-hidden">
          <Image
            src={imgSrc}
            alt={sp?.nome ?? live.titulo}
            fill
            className="object-cover"
            sizes="260px"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ink via-ink/40 to-transparent" />
        </div>

        <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-between gap-4 sm:gap-5">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
              <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-light opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-pink-light" />
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold text-pink-light">
                Acontecendo agora
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-2 py-0.5">
                {live.trilha}
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl leading-[0.95] tracking-tight">
              {live.titulo}
            </h2>

            {sp && (
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 border border-white/20">
                  <Image src={sp.foto} alt={sp.nome} fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">{sp.nome}</p>
                  <p className="text-xs sm:text-sm text-white/60">{sp.cargo}</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap gap-3 sm:gap-5 text-xs sm:text-sm text-white/80 mb-3">
              <span className="inline-flex items-center gap-1.5 sm:gap-2">
                <MapPin size={13} className="text-pink-light" /> {live.sala}
              </span>
              <span className="inline-flex items-center gap-1.5 sm:gap-2">
                <Clock size={13} className="text-pink-light" />
                <span className="font-mono">{formatTime(live.inicio)} — {formatTime(live.fim)}</span>
              </span>
            </div>

            <div>
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-white/40 mb-2">
                <span>Progresso</span>
                <span className="ticker">{Math.round(progress)}%</span>
              </div>
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-pink-light via-pink to-accent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
