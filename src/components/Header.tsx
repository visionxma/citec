"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/programacao", label: "Programação" },
  { href: "/materiais", label: "Materiais" },
  { href: "/ingresso-jogos", label: "Sala de Jogos" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // fecha o menu ao mudar de rota
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // bloqueia scroll do body quando o menu mobile está aberto
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-3 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div
          className={`flex items-center justify-between rounded-2xl border transition-all duration-500 ${
            scrolled || open
              ? "glass border-white/10 px-3 sm:px-4 py-2"
              : "border-transparent px-2 py-2"
          }`}
        >
          <Link href="/" aria-label="Início CITEC" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-1 relative">
            {NAV.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    active ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-lg bg-white/5 border border-white/10" />
                  )}
                  <span className="relative">{n.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/ingresso-jogos"
              className="hidden md:inline-flex items-center gap-1.5 bg-white text-ink font-semibold text-sm px-4 py-2 rounded-lg hover:bg-pink hover:text-white transition-colors"
            >
              Ingresso · Sala de Jogos
              <ArrowUpRight size={14} />
            </Link>
            <button
              className="md:hidden w-10 h-10 -mr-1 rounded-lg flex items-center justify-center hover:bg-white/5"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-x-3 top-[64px] z-40 transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="glass rounded-2xl overflow-hidden divide-y divide-white/5">
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center justify-between px-5 py-4 text-base font-medium transition-colors ${
                  active ? "bg-pink/10 text-pink-light" : "hover:bg-white/5"
                }`}
              >
                {n.label}
                <ArrowUpRight size={16} className="opacity-40" />
              </Link>
            );
          })}
          <Link
            href="/ingresso-jogos"
            className="flex items-center justify-center gap-2 m-3 px-5 py-3.5 rounded-xl bg-white text-ink font-semibold text-sm"
          >
            Ingresso · Sala de Jogos
            <ArrowUpRight size={14} />
          </Link>
        </nav>
      </div>
      {/* Mobile backdrop */}
      {open && (
        <button
          className="md:hidden fixed inset-0 top-[64px] bg-ink/60 backdrop-blur-sm z-30"
          onClick={() => setOpen(false)}
          aria-label="Fechar menu"
        />
      )}
    </header>
  );
}
