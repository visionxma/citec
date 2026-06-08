"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { getPatrocinadorPrincipal } from "@/lib/data";
import { Instagram, CheckCircle2, ArrowRight } from "lucide-react";

type Step = "intro" | "instagram" | "form" | "ingresso";

export default function IngressoJogos() {
  const sponsor = getPatrocinadorPrincipal();
  const [step, setStep] = useState<Step>("intro");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  function abrirInstagram() {
    if (sponsor.instagram) {
      window.open(`https://instagram.com/${sponsor.instagram}`, "_blank");
    }
    setStep("form");
  }

  function gerarIngresso(e: React.FormEvent) {
    e.preventDefault();
    const t = `CITEC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setToken(t);
    setStep("ingresso");
  }

  return (
    <div className="relative pt-20 sm:pt-24 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-pink/30 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4">
        <div className="text-center mb-5 sm:mb-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-pink-light mb-2">Bônus exclusivo</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl leading-[0.9]">Sala de Jogos</h1>
          <p className="font-serif italic text-sm sm:text-base text-white/60 mt-2 px-4">
            Gere seu ingresso e relaxe entre uma palestra e outra.
          </p>
        </div>

        <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8">
          <AnimatePresence mode="wait">
            {step === "intro" && (
              <motion.div key="intro" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="font-display text-2xl sm:text-3xl">Como funciona</h2>
                <ol className="mt-5 sm:mt-6 space-y-3 sm:space-y-4 text-sm sm:text-base text-white/80">
                  {[
                    "Siga nosso patrocinador principal no Instagram.",
                    "Preencha seu nome e e-mail.",
                    "Apresente o QR code na entrada da sala de jogos.",
                  ].map((t, i) => (
                    <li key={i} className="flex gap-3 sm:gap-4 items-start">
                      <span className="font-mono font-bold text-2xl sm:text-3xl text-gradient-pink leading-none shrink-0 tracking-tight">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="pt-1 sm:pt-1.5">{t}</span>
                    </li>
                  ))}
                </ol>
                <button
                  onClick={() => setStep("instagram")}
                  className="mt-8 sm:mt-10 w-full bg-gradient-to-r from-pink to-accent hover:from-pink-dark hover:to-pink text-white font-semibold py-3.5 sm:py-4 rounded-2xl inline-flex items-center justify-center gap-2 transition-all duration-300"
                >
                  Começar <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {step === "instagram" && (
              <motion.div key="ig" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
                <h2 className="font-display text-2xl sm:text-3xl break-all px-2">
                  {sponsor.instagram ? `Siga @${sponsor.instagram}` : `Siga ${sponsor.nome}`}
                </h2>
                <p className="text-sm sm:text-base text-white/70 mt-3 leading-relaxed">
                  <span className="font-semibold text-white">{sponsor.nome}</span> é nosso patrocinador principal e torna o CITEC possível.
                </p>
                <button
                  onClick={abrirInstagram}
                  className="mt-6 sm:mt-8 w-full bg-gradient-to-r from-pink-light via-pink to-accent text-white font-semibold py-3.5 sm:py-4 rounded-2xl inline-flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  <Instagram size={18} /> {sponsor.instagram ? "Abrir Instagram" : "Continuar"}
                </button>
                <p className="text-xs text-white/40 mt-4">
                  {sponsor.instagram ? "Após seguir, volte aqui para continuar." : "Em breve o Instagram do patrocinador."}
                </p>
              </motion.div>
            )}

            {step === "form" && (
              <motion.form key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={gerarIngresso}>
                <h2 className="font-display text-2xl sm:text-3xl">Seus dados</h2>
                <p className="text-white/60 text-xs sm:text-sm mt-2">Usaremos apenas para identificar você na entrada.</p>
                <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-white/50 mb-2">Nome completo</label>
                    <input
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      autoComplete="name"
                      className="w-full bg-ink/60 border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:py-3.5 text-base focus:border-pink focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-white/50 mb-2">E-mail</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      inputMode="email"
                      className="w-full bg-ink/60 border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:py-3.5 text-base focus:border-pink focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 sm:mt-8 w-full bg-gradient-to-r from-pink to-accent text-white font-semibold py-3.5 sm:py-4 rounded-2xl"
                >
                  Gerar ingresso
                </button>
              </motion.form>
            )}

            {step === "ingresso" && (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                  <CheckCircle2 className="mx-auto text-green-400" size={48} />
                </motion.div>
                <h2 className="font-display text-2xl sm:text-3xl mt-3 sm:mt-4">Ingresso gerado!</h2>
                <p className="text-sm sm:text-base text-white/60 mt-1">Apresente este QR na entrada da sala de jogos.</p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl inline-block"
                >
                  <QRCodeSVG value={token} size={180} className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]" />
                </motion.div>

                <div className="mt-5 sm:mt-6 text-left bg-ink/60 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">Participante</p>
                  <p className="font-display text-lg sm:text-2xl mt-1 break-words">{nome}</p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 mt-3 sm:mt-4">Código</p>
                  <p className="font-mono text-pink-light text-xs sm:text-sm break-all mt-1">{token}</p>
                </div>

                <button
                  onClick={() => { setStep("intro"); setNome(""); setEmail(""); setToken(""); }}
                  className="mt-5 sm:mt-6 text-sm text-white/60 hover:text-pink-light"
                >
                  Gerar outro ingresso
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
