"use client";

import { palestras, getPalestrante } from "@/lib/data";
import { useLiveTalk, setLiveTalk } from "@/lib/liveStore";
import { formatTime, formatDateShort } from "@/lib/format";
import { Radio, PowerOff } from "lucide-react";
import { motion } from "framer-motion";
import { AdminGate } from "@/components/AdminGate";

export default function Admin() {
  return (
    <AdminGate>
      <AdminPanel />
    </AdminGate>
  );
}

function AdminPanel() {
  const liveId = useLiveTalk();

  return (
    <div className="relative pt-20 sm:pt-24 pb-10">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-20 right-0 sm:right-20 w-[300px] sm:w-[400px] h-[250px] sm:h-[300px] bg-pink/20 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <Radio size={14} className="text-pink-light" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-pink-light">Painel administrativo</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-6xl leading-[0.9]">
          Acontecendo agora
        </h1>
        <p className="font-serif italic text-sm sm:text-base text-white/60 mt-2 max-w-xl">
          Selecione a palestra que está rolando. A home atualiza em tempo real.
        </p>

        <div className="mt-5 sm:mt-6">
          <button
            onClick={() => setLiveTalk(null)}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border text-xs sm:text-sm font-medium transition-all ${
              !liveId
                ? "bg-white text-ink border-white"
                : "border-white/10 bg-ink-soft hover:border-pink/40"
            }`}
          >
            <PowerOff size={14} />
            Nenhuma (offline)
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {palestras.map((p, i) => {
            const sp = getPalestrante(p.palestranteId);
            const active = liveId === p.id;
            return (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setLiveTalk(p.id)}
                className={`w-full text-left rounded-xl sm:rounded-2xl border p-3.5 sm:p-4 transition-all ${
                  active
                    ? "border-pink bg-pink/10"
                    : "border-white/10 bg-ink-soft hover:border-pink/40 hover:bg-ink-light"
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                  {active ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-light opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-light" />
                    </span>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  )}
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono">
                    {formatDateShort(p.inicio)} · {formatTime(p.inicio)}–{formatTime(p.fim)}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 rounded-full px-2 py-0.5 sm:ml-auto">
                    {p.trilha}
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg leading-tight">{p.titulo}</h3>
                {sp && <p className="text-[11px] sm:text-xs text-white/60 mt-0.5">{sp.nome}</p>}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
