"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { EVENTO } from "@/lib/data";
import { Countdown } from "./Countdown";
import { DimensionLine } from "./DimensionLine";
import { TitleBlock } from "./TitleBlock";
import { Ruler } from "./Ruler";
import { ArrowUpRight } from "lucide-react";

const TAGS = ["Inovação", "Tecnologia", "Construção Civil", "Engenharia", "Afya Uninovafapi", "CREA-PI", "Teresina"];

export function Hero() {
  return (
    <section className="relative pt-20 sm:pt-24 pb-8 sm:pb-10 spotlight overflow-hidden">
      {/* Foto de engenharia ao fundo do topo */}
      <Image
        src="/images/eng-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center pointer-events-none"
      />
      {/* Escurecimento para manter o logo e os textos legíveis */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30 pointer-events-none" />

      {/* Grade técnica por cima da foto */}
      <div className="absolute inset-0 bg-blueprint bg-blueprint-cross opacity-60 pointer-events-none" />

      {/* Iluminação de fundo estática — sem blobs animados */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-pink/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Top meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-5 sm:mb-6"
        >
          <div className="flex items-center gap-2 glass rounded-full pl-1 pr-3 sm:pr-4 py-1">
            <span className="bg-pink text-white text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase px-2 sm:px-2.5 py-1 rounded-full">
              CITEC 2026
            </span>
            <span className="text-[11px] sm:text-xs text-white/70">10 — 13 Jun · Teresina, PI</span>
          </div>
        </motion.div>

        {/* Logo + edição */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-2xl"
          >
            <Image
              src="/logos/citec-color.png"
              alt="CITEC — Congresso de Inovação, Tecnologia e Construção Civil"
              width={900}
              height={400}
              priority
              sizes="(max-width: 768px) 90vw, 600px"
              className="w-full h-auto"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute right-0 top-0 hidden lg:block max-w-xs text-right"
          >
            <span className="font-serif italic text-2xl text-white/80 leading-tight block">
              Da sala de aula
            </span>
            <span className="font-serif italic text-2xl text-white/40 leading-tight block">
              ao mercado de trabalho.
            </span>
          </motion.p>
        </div>

        {/* Bottom content grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 sm:mt-8 grid gap-6 lg:grid-cols-[1fr_auto] items-end"
        >
          <div className="max-w-xl">
            <p className="lg:hidden font-serif italic text-lg sm:text-xl text-white/80 mb-4 sm:mb-6">
              Da sala de aula ao mercado de trabalho.
            </p>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">
              Em junho a engenharia civil do Piauí se reúne em Teresina. Três dias de palestras, mesas redondas e minicursos no Auditório Afya Uninovafapi, com apoio do CREA-PI.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <Link
                href="/programacao"
                className="group relative bg-white text-ink font-semibold px-6 py-3 sm:px-7 sm:py-3.5 rounded-full inline-flex items-center justify-center gap-2 hover:bg-pink hover:text-white transition-colors duration-300"
              >
                Ver a programação
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
              </Link>
              <Link
                href="/ingresso-jogos"
                className="group glass rounded-full px-6 py-3 sm:px-7 sm:py-3.5 inline-flex items-center justify-center gap-2 font-semibold hover:bg-pink/20 hover:border-pink transition-colors duration-300"
              >
                Ingresso da sala de jogos
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          <div className="min-w-[260px] sm:min-w-[340px]">
            <DimensionLine label="Início em" variant="pink" className="mb-2 sm:mb-3" />
            <Countdown target={EVENTO.dataInicio} />
          </div>
        </motion.div>

        {/* Régua + Carimbo de prancha técnica */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8 sm:mt-10 hidden sm:block"
        >
          <Ruler startLabel="QUI 11.06" endLabel="SÁB 13.06" className="mb-4 max-w-2xl" />
          <TitleBlock
            cells={[
              { label: "Edição", value: "04" },
              { label: "Local", value: "Auditório Afya · Teresina" },
              { label: "Período", value: "10–13 · 06 · 2026" },
              { label: "Apoio", value: "CREA-PI" },
            ]}
          />
        </motion.div>
      </div>

      {/* Tags marquee */}
      <div className="relative mt-10 sm:mt-12 border-y border-white/10 py-3 sm:py-4 marquee-mask">
        <div className="flex gap-8 sm:gap-12 animate-marquee w-max">
          {[...TAGS, ...TAGS, ...TAGS].map((tag, i) => (
            <span key={i} className="flex items-center gap-8 sm:gap-12 text-lg sm:text-2xl md:text-3xl font-display tracking-wide text-white/30 hover:text-pink transition-colors whitespace-nowrap">
              {tag}
              <span className="text-pink">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
