import { palestras, getPalestrantesDePalestra, EVENTO } from "@/lib/data";
import { formatDate, formatTime } from "@/lib/format";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, ArrowUpRight, Mic, Users, DraftingCompass, Coffee, Award, HardHat } from "lucide-react";
import type { SessaoTipo } from "@/lib/types";

export const metadata = { title: "Programação — CITEC 2026" };

const TRILHA_COLORS = {
  "Inovação": "from-pink to-pink-dark",
  "Tecnologia": "from-accent to-pink",
  "Construção": "from-pink-light to-accent",
} as const;

const TIPO_META: Record<SessaoTipo, { label: string; icon: any; badge: string }> = {
  "palestra-magna": { label: "Palestra Magna", icon: HardHat, badge: "bg-gradient-to-r from-pink-light to-accent" },
  "palestra": { label: "Palestra", icon: Mic, badge: "bg-white/10" },
  "mesa-redonda": { label: "Mesa Redonda", icon: Users, badge: "bg-accent/30 border border-accent/50" },
  "minicurso": { label: "Minicurso", icon: DraftingCompass, badge: "bg-pink/30 border border-pink/50" },
  "intervalo": { label: "Intervalo", icon: Coffee, badge: "bg-white/5 border border-white/10" },
  "institucional": { label: "Institucional", icon: Award, badge: "bg-white/10" },
};

export default function Programacao() {
  const byDay = palestras.reduce<Record<string, typeof palestras>>((acc, p) => {
    const day = p.inicio.slice(0, 10);
    (acc[day] ??= []).push(p);
    return acc;
  }, {});
  const days = Object.keys(byDay).sort();

  return (
    <div className="relative pt-20 sm:pt-24 pb-10">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-pink/20 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-pink-light">Programação Oficial</span>
          <div className="w-10 sm:w-12 h-px bg-pink-light" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.9]">
          Programação
        </h1>
        <p className="font-serif italic text-base sm:text-lg text-white/50 mt-2">
          “{EVENTO.tema}”
        </p>
        <p className="text-xs sm:text-sm text-white/50 mt-1">
          {EVENTO.local}
        </p>

        <div className="mt-8 sm:mt-10 space-y-8 sm:space-y-10">
          {days.map((day, dayIdx) => (
            <section key={day}>
              <div className="flex items-baseline gap-3 sm:gap-4 mb-3 sm:mb-4 sticky top-16 sm:top-20 z-10 py-2.5 sm:py-3 -mx-4 px-4 bg-ink/80 backdrop-blur-lg">
                <span className="font-mono font-bold text-4xl sm:text-5xl text-stroke-pink tracking-tight">
                  {String(dayIdx + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-pink-light">Dia {dayIdx + 1}</p>
                  <h2 className="font-display text-base sm:text-xl capitalize mt-0.5">{formatDate(day + "T00:00:00-03:00")}</h2>
                </div>
              </div>

              <div className="space-y-2">
                {byDay[day]
                  .sort((a, b) => a.inicio.localeCompare(b.inicio))
                  .map((p) => {
                    const sps = getPalestrantesDePalestra(p);
                    const sp = sps[0];
                    const meta = TIPO_META[p.tipo];
                    const TipoIcon = meta.icon;
                    const isPassivo = p.tipo === "intervalo";
                    const Wrapper: any = isPassivo ? "div" : Link;
                    const wrapperProps = isPassivo ? {} : { href: `/materiais/${p.slug}` };
                    return (
                      <Wrapper
                        key={p.id}
                        {...wrapperProps}
                        className={`group relative block rounded-xl sm:rounded-2xl border border-white/10 transition-all duration-300 overflow-hidden ${
                          isPassivo
                            ? "bg-white/[0.02]"
                            : "bg-ink-soft hover:border-pink/40 hover:bg-ink-light active:bg-ink-light"
                        }`}
                      >
                        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${TRILHA_COLORS[p.trilha]} ${isPassivo ? "opacity-30" : ""}`} />
                        <div className="p-3.5 sm:p-5 flex items-start gap-3 sm:gap-4">
                          <div className="font-mono font-bold text-lg sm:text-2xl text-white shrink-0 w-[60px] sm:w-[80px] pt-1 sm:pt-1 tracking-tight">
                            {formatTime(p.inicio)}
                          </div>
                          {sps.length > 1 ? (
                            <div className="flex -space-x-4 sm:-space-x-5 shrink-0">
                              {sps.map((s, i) => (
                                <div
                                  key={s.id}
                                  className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-ink-soft"
                                  style={{ zIndex: sps.length - i }}
                                >
                                  <Image src={s.foto} alt={s.nome} fill className="object-cover" sizes="48px" />
                                </div>
                              ))}
                            </div>
                          ) : sp ? (
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                              <Image src={sp.foto} alt={sp.nome} fill className="object-cover" sizes="48px" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-ink flex items-center justify-center shrink-0">
                              <TipoIcon size={14} className="text-pink-light" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                              <span className={`text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold rounded-full px-2 sm:px-2.5 py-0.5 ${meta.badge}`}>
                                <TipoIcon size={10} className="inline -mt-px mr-1" />
                                {meta.label}
                              </span>
                              <span className="text-[10px] sm:text-xs text-white/50 hidden sm:inline-flex items-center gap-1">
                                <MapPin size={10} /> {p.sala}
                              </span>
                              <span className="text-[10px] sm:text-xs text-white/50 inline-flex items-center gap-1 font-mono">
                                <Clock size={10} /> {formatTime(p.inicio)}–{formatTime(p.fim)}
                              </span>
                            </div>
                            <h3 className="font-display text-base sm:text-xl leading-tight">{p.titulo}</h3>
                            {sps.length > 1 ? (
                              <p className="text-[11px] sm:text-xs text-white/60 mt-0.5">
                                {sps.map((s) => s.nome).join(" · ")}
                              </p>
                            ) : sp ? (
                              <p className="text-[11px] sm:text-xs text-white/60 mt-0.5 truncate">{sp.nome} · <span className="text-white/40">{sp.cargo}</span></p>
                            ) : p.palestranteNota ? (
                              <p className="text-[11px] sm:text-xs text-white/60 mt-0.5">{p.palestranteNota}</p>
                            ) : null}
                            <p className="text-[10px] sm:text-xs text-white/40 mt-1 sm:hidden inline-flex items-center gap-1">
                              <MapPin size={10} /> {p.sala}
                            </p>
                          </div>
                          {!isPassivo && (
                            <ArrowUpRight className="text-white/20 group-hover:text-pink-light group-hover:rotate-45 transition-all duration-300 shrink-0 mt-1" size={18} />
                          )}
                        </div>
                      </Wrapper>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
