import { getPalestraBySlug, getPalestrantesDePalestra, palestras } from "@/lib/data";
import { formatDate, formatTime } from "@/lib/format";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FileText, Film, Presentation, ExternalLink, MapPin, Clock, ArrowLeft, Instagram } from "lucide-react";

export function generateStaticParams() {
  return palestras.map((p) => ({ slug: p.slug }));
}

const icons = {
  slide: Presentation,
  pdf: FileText,
  video: Film,
  link: ExternalLink,
} as const;

const labels = {
  slide: "Slides",
  pdf: "PDF",
  video: "Vídeo",
  link: "Link externo",
} as const;

export default function PalestraPage({ params }: { params: { slug: string } }) {
  const palestra = getPalestraBySlug(params.slug);
  if (!palestra) notFound();
  const sps = getPalestrantesDePalestra(palestra);

  return (
    <div className="relative pt-20 sm:pt-24 pb-10">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-pink/20 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4">
        <Link href="/materiais" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-pink-light mb-5 sm:mb-6 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para materiais
        </Link>

        <span className="text-[10px] uppercase tracking-[0.25em] bg-pink/30 border border-pink/50 rounded-full px-3 py-1 font-semibold">
          {palestra.trilha}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-6xl mt-3 sm:mt-4 leading-[0.95]">{palestra.titulo}</h1>
        <p className="font-serif italic text-base sm:text-lg text-white/70 mt-3 sm:mt-4 leading-relaxed">{palestra.descricao}</p>

        <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 text-xs sm:text-sm text-white/70">
          <span className="inline-flex items-center gap-1.5 sm:gap-2"><MapPin size={13} className="text-pink-light" /> {palestra.sala}</span>
          <span className="inline-flex items-center gap-1.5 sm:gap-2">
            <Clock size={13} className="text-pink-light" /> <span><span className="font-mono">{formatTime(palestra.inicio)}–{formatTime(palestra.fim)}</span> · {formatDate(palestra.inicio)}</span>
          </span>
        </div>

        {sps.length === 0 && palestra.palestranteNota && (
          <div className="mt-5 sm:mt-6 rounded-2xl sm:rounded-3xl glass p-4 sm:p-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-pink-light">Palestrante</p>
            <p className="font-display text-lg sm:text-2xl mt-1">{palestra.palestranteNota}</p>
          </div>
        )}

        {sps.length > 0 && (
          <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4">
            {sps.map((sp, i) => (
              <div key={sp.id} className="flex gap-3 sm:gap-4 items-start rounded-2xl sm:rounded-3xl glass p-4 sm:p-5">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0">
                  <Image src={sp.foto} alt={sp.nome} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-pink-light">
                    {sps.length > 1 ? `Convidado ${String(i + 1).padStart(2, "0")}` : "Palestrante"}
                  </p>
                  <p className="font-display text-lg sm:text-2xl mt-1">{sp.nome}</p>
                  <p className="text-xs sm:text-sm text-white/60">{sp.cargo}</p>
                  <p className="text-xs sm:text-sm text-white/70 mt-2 sm:mt-3 leading-relaxed">{sp.bio}</p>
                  {sp.instagram && (
                    <a href={`https://instagram.com/${sp.instagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-pink-light hover:text-white mt-3">
                      <Instagram size={12} /> @{sp.instagram}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 className="font-display text-xl sm:text-2xl mt-8 sm:mt-10 mb-3 sm:mb-4">Materiais disponíveis</h2>
        {palestra.materiais.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-ink-soft p-5 sm:p-6 text-sm sm:text-base text-white/60">
            Os materiais desta sessão serão publicados após o evento.
          </div>
        )}
        <div className="grid gap-3 md:grid-cols-2">
          {palestra.materiais.map((m) => {
            const Icon = icons[m.tipo];
            return (
              <a
                key={m.id}
                href={m.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/10 bg-ink-soft hover:border-pink/40 hover:bg-ink-light p-4 sm:p-5 flex items-center gap-3 sm:gap-4 transition-all duration-300"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-pink-light shrink-0">
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate text-sm sm:text-base">{m.titulo}</div>
                  <div className="text-[10px] sm:text-xs text-white/50 mt-0.5">{labels[m.tipo]}</div>
                </div>
                <ExternalLink size={16} className="text-white/30 group-hover:text-pink-light shrink-0" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
