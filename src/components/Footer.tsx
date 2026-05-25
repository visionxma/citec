import Link from "next/link";
import { Logo } from "./Logo";
import { EVENTO } from "@/lib/data";
import { Instagram, Linkedin, Youtube, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-16 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-pink/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 pt-10 sm:pt-12 pb-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-3 text-white/60 max-w-sm text-sm leading-relaxed">
              {EVENTO.subtitulo}. {EVENTO.local}.
            </p>
            <div className="flex gap-2 mt-4">
              {[Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center hover:bg-pink hover:border-pink transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Navegação</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["/", "Início"],
                ["/programacao", "Programação"],
                ["/materiais", "Materiais"],
                ["/ingresso-jogos", "Sala de Jogos"],
                ["/admin", "Admin"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-white/70 hover:text-pink-light transition-colors inline-flex items-center gap-1 group">
                    {label}
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Evento</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>10 — 13 Jun 2026</li>
              <li>{EVENTO.local}</li>
              <li className="font-serif italic text-white/50">“{EVENTO.tema}”</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Contato</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="mailto:contato@citec.com.br" className="hover:text-pink-light">contato@citec.com.br</a></li>
              <li><a href="mailto:imprensa@citec.com.br" className="hover:text-pink-light">imprensa@citec.com.br</a></li>
              <li><a href="mailto:patrocinio@citec.com.br" className="hover:text-pink-light">patrocinio@citec.com.br</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <p className="text-xs text-white/40 text-center md:text-left">© 2026 CITEC. Todos os direitos reservados.</p>
          <p className="hidden md:block font-display md:text-[8rem] leading-none text-stroke-white absolute -bottom-6 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap opacity-30">
            CITEC 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
