"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { EVENTO } from "@/lib/data";
import { Instagram, ArrowRight, Download, RotateCcw } from "lucide-react";

type Step = "intro" | "instagram" | "form" | "ingresso";

export default function IngressoJogos() {
  const [step, setStep] = useState<Step>("intro");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  function abrirInstagram() {
    window.open(`https://instagram.com/${EVENTO.instagramOficial}`, "_blank");
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
                    "Siga nosso perfil oficial no Instagram.",
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
                <h2 className="font-display text-2xl sm:text-3xl px-2">
                  Siga {EVENTO.nomeOficial}
                </h2>
                <p className="text-sm sm:text-base text-white/70 mt-3 leading-relaxed">
                  Instagram oficial do curso de Engenharia Civil que organiza o CITEC.
                </p>
                <button
                  onClick={abrirInstagram}
                  className="mt-6 sm:mt-8 w-full bg-gradient-to-r from-pink-light via-pink to-accent text-white font-semibold py-3.5 sm:py-4 rounded-2xl inline-flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  <Instagram size={18} /> Abrir @{EVENTO.instagramOficial}
                </button>
                <p className="text-xs text-white/40 mt-4">Após seguir, volte aqui para continuar.</p>
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
                      maxLength={42}
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
              <motion.div key="done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-pink-light">Ingresso gerado</p>
                <h2 className="font-display text-2xl sm:text-3xl mt-1">Tudo pronto, {nome.split(" ")[0]}!</h2>
                <p className="text-sm text-white/60 mt-1">Baixe e apresente na entrada da sala de jogos.</p>

                <Ticket nome={nome} token={token} />

                <button
                  onClick={() => { setStep("intro"); setNome(""); setEmail(""); setToken(""); }}
                  className="mt-5 inline-flex items-center gap-2 text-sm text-white/60 hover:text-pink-light transition-colors"
                >
                  <RotateCcw size={14} /> Gerar outro ingresso
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ingresso desenhado em <canvas>: o que aparece na tela é exatamente o JPG
// que será baixado (WYSIWYG), com a tipografia e as cores da marca.
// ---------------------------------------------------------------------------

const COR = {
  ink: "#0A0A0F",
  pink: "#E91E63",
  pinkLight: "#FF4D8D",
  accent: "#5B5BF5",
  white: "#FFFFFF",
};

function Ticket({ nome, token }: { nome: string; token: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // QRCodeCanvas (v3) não encaminha ref; pegamos o <canvas> pelo wrapper.
  const qrWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Garante que as fontes da marca estejam carregadas antes de pintar.
      try {
        await Promise.all([
          (document as any).fonts?.load('400 120px "Anton"'),
          (document as any).fonts?.load('700 40px "Montserrat"'),
          (document as any).fonts?.load('italic 400 34px "Fraunces"'),
          (document as any).fonts?.load('400 32px "JetBrains Mono"'),
        ]);
      } catch {
        /* segue com fallback */
      }
      if (cancelled) return;
      requestAnimationFrame(() => {
        const qr = qrWrapRef.current?.querySelector("canvas") ?? null;
        desenhar(canvasRef.current, qr, nome, token);
      });
    })();
    return () => { cancelled = true; };
  }, [nome, token]);

  function baixar() {
    const c = canvasRef.current;
    if (!c) return;
    const url = c.toDataURL("image/jpeg", 0.95);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ingresso-citec-${token}.jpg`;
    a.click();
  }

  return (
    <div className="mt-5 sm:mt-6">
      <motion.canvas
        ref={canvasRef}
        width={1080}
        height={1640}
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="w-full max-w-[340px] mx-auto rounded-[20px] shadow-2xl shadow-pink/20"
      />
      {/* QR oculto, fonte de pixels para o canvas do ingresso */}
      <div ref={qrWrapRef} style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", opacity: 0, pointerEvents: "none" }}>
        <QRCodeCanvas value={token} size={520} level="M" includeMargin={false} fgColor="#0A0A0F" bgColor="#FFFFFF" />
      </div>
      <button
        onClick={baixar}
        className="mt-5 w-full max-w-[340px] mx-auto bg-gradient-to-r from-pink to-accent hover:from-pink-dark hover:to-pink text-white font-semibold py-3.5 rounded-2xl inline-flex items-center justify-center gap-2 transition-all duration-300"
      >
        <Download size={18} /> Baixar ingresso (JPG)
      </button>
    </div>
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

// Ajusta o tamanho da fonte até o texto caber em maxWidth.
function fitFont(ctx: CanvasRenderingContext2D, text: string, family: string, maxWidth: number, startPx: number, weight = "400") {
  let px = startPx;
  ctx.font = `${weight} ${px}px ${family}`;
  while (ctx.measureText(text).width > maxWidth && px > 18) {
    px -= 2;
    ctx.font = `${weight} ${px}px ${family}`;
  }
  return px;
}

function desenhar(
  canvas: HTMLCanvasElement | null,
  qr: HTMLCanvasElement | null,
  nome: string,
  token: string,
) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const pad = 90;
  const contentW = W - pad * 2;

  // Fundo: gradiente vertical escuro com um leve toque de pink no topo.
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#1A0712");
  bg.addColorStop(0.5, "#0C0710");
  bg.addColorStop(1, COR.ink);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Brilho radial pink no topo.
  const glow = ctx.createRadialGradient(cx, 120, 40, cx, 120, 720);
  glow.addColorStop(0, "rgba(233,30,99,0.28)");
  glow.addColorStop(1, "rgba(233,30,99,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, 760);

  // Borda interna sutil.
  ctx.strokeStyle = "rgba(255,77,141,0.30)";
  ctx.lineWidth = 2;
  roundRect(ctx, 24, 24, W - 48, H - 48, 44);
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  // Topo: marca à esquerda, "INGRESSO" à direita.
  ctx.letterSpacing = "6px";
  ctx.fillStyle = COR.pinkLight;
  ctx.font = '400 30px "Anton"';
  ctx.fillText("✦ CITEC 2026", pad, 96);
  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.font = '500 28px "JetBrains Mono"';
  ctx.fillText("INGRESSO", W - pad, 100);
  ctx.letterSpacing = "0px";

  // Título.
  ctx.textAlign = "center";
  ctx.fillStyle = COR.white;
  const titlePx = fitFont(ctx, "SALA DE JOGOS", '"Anton"', contentW, 132);
  ctx.font = `400 ${titlePx}px "Anton"`;
  ctx.fillText("SALA DE JOGOS", cx, 168);

  // Subtítulo.
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = 'italic 400 34px "Fraunces"';
  ctx.fillText("Bônus exclusivo · relaxe entre as palestras", cx, 168 + titlePx + 16);

  // Painel branco do QR.
  const panel = 600;
  const panelX = cx - panel / 2;
  const panelY = 400;
  ctx.fillStyle = COR.white;
  roundRect(ctx, panelX, panelY, panel, panel, 40);
  ctx.fill();

  // QR centralizado no painel.
  if (qr) {
    const qrSize = 500;
    const qrX = cx - qrSize / 2;
    const qrY = panelY + (panel - qrSize) / 2;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);
    ctx.imageSmoothingEnabled = true;
  }

  // Participante.
  let y = panelY + panel + 56;
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.letterSpacing = "5px";
  ctx.font = '500 26px "JetBrains Mono"';
  ctx.fillText("PARTICIPANTE", cx, y);
  ctx.letterSpacing = "0px";

  y += 44;
  ctx.fillStyle = COR.white;
  const nomePx = fitFont(ctx, nome || "—", '"Anton"', contentW, 64);
  ctx.font = `400 ${nomePx}px "Anton"`;
  ctx.fillText(nome || "—", cx, y);

  // Código.
  y += nomePx + 30;
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.letterSpacing = "5px";
  ctx.font = '500 24px "JetBrains Mono"';
  ctx.fillText("CÓDIGO", cx, y);
  ctx.letterSpacing = "0px";

  y += 38;
  ctx.fillStyle = COR.pinkLight;
  const codePx = fitFont(ctx, token, '"JetBrains Mono"', contentW, 34, "600");
  ctx.font = `600 ${codePx}px "JetBrains Mono"`;
  ctx.fillText(token, cx, y);

  // Picote (perfuração) com entalhes nas laterais.
  const perfY = H - 250;
  ctx.fillStyle = COR.ink;
  ctx.beginPath();
  ctx.arc(24, perfY, 34, 0, Math.PI * 2);
  ctx.arc(W - 24, perfY, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 3;
  ctx.setLineDash([14, 12]);
  ctx.beginPath();
  ctx.moveTo(70, perfY);
  ctx.lineTo(W - 70, perfY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Canhoto: informações do evento.
  ctx.textAlign = "center";
  ctx.fillStyle = COR.white;
  ctx.font = '400 46px "Anton"';
  ctx.fillText("11 — 13 JUN 2026", cx, perfY + 36);

  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = '500 26px "Montserrat"';
  ctx.fillText("Teresina · Auditório Afya", cx, perfY + 100);
  ctx.fillStyle = "rgba(255,255,255,0.38)";
  ctx.font = '400 24px "Montserrat"';
  ctx.fillText("Apresente este QR na entrada da sala de jogos", cx, perfY + 142);
}
