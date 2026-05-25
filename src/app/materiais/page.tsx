import { palestras, getPalestrante } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";

export const metadata = { title: "Materiais — CITEC 2026" };

export default function Materiais() {
  return (
    <div className="relative pt-20 sm:pt-24 pb-10">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[400px] bg-accent/20 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-pink-light">Conteúdo</span>
          <div className="w-10 sm:w-12 h-px bg-pink-light" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.9]">
          Materiais
        </h1>
        <p className="font-serif italic text-base sm:text-lg text-white/50 mt-2 max-w-xl">
          Slides, PDFs e vídeos — para você revisitar o que importou.
        </p>

        <div className="grid gap-3 mt-6 sm:mt-8 md:grid-cols-2">
          {palestras.map((p) => {
            const sp = getPalestrante(p.palestranteId);
            return (
              <Link
                key={p.id}
                href={`/materiais/${p.slug}`}
                className="group relative rounded-2xl border border-white/10 bg-ink-soft hover:border-pink/40 hover:bg-ink-light transition-all duration-300 p-3.5 sm:p-4 flex gap-3 sm:gap-4"
              >
                {sp ? (
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0">
                    <Image src={sp.foto} alt={sp.nome} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="64px" />
                  </div>
                ) : (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white/40">
                    <Download size={20} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-pink-light">{p.trilha}</span>
                    <ArrowUpRight size={16} className="text-white/30 group-hover:text-pink-light group-hover:rotate-45 transition-all duration-300 shrink-0" />
                  </div>
                  <h3 className="font-display text-base sm:text-xl leading-tight mt-1.5">{p.titulo}</h3>
                  {sp && <p className="text-xs sm:text-sm text-white/60 mt-1 truncate">{sp.nome}</p>}
                  <div className="flex items-center gap-1.5 mt-2 sm:mt-3 text-[10px] sm:text-xs text-white/50">
                    <Download size={12} />
                    {p.materiais.length > 0
                      ? `${p.materiais.length} material(is) disponível(is)`
                      : "Materiais disponíveis após o evento"}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
