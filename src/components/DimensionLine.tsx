/**
 * DimensionLine — linha de cota no estilo de desenho técnico.
 *
 * Renderiza duas linhas horizontais (uma de cada lado) ligadas por um label
 * centralizado, com tracinhos verticais nas extremidades — como uma medida
 * de planta baixa.
 *
 *   |───────────  LABEL  ───────────|
 *
 * Usado para "rotular" elementos com cara de instrumento, não de UI.
 */
export function DimensionLine({
  label,
  className = "",
  variant = "default",
}: {
  label: string;
  className?: string;
  variant?: "default" | "pink";
}) {
  const stroke = variant === "pink" ? "bg-pink-light/70" : "bg-white/30";
  const textColor = variant === "pink" ? "text-pink-light" : "text-white/50";

  return (
    <div className={`inline-flex items-center gap-3 w-full ${className}`}>
      {/* Tick esquerdo */}
      <div className={`w-px h-2 ${stroke} shrink-0`} />
      {/* Linha esquerda */}
      <div className={`flex-1 h-px ${stroke}`} />
      {/* Label */}
      <span
        className={`text-[10px] uppercase tracking-[0.3em] font-mono ${textColor} whitespace-nowrap`}
      >
        {label}
      </span>
      {/* Linha direita */}
      <div className={`flex-1 h-px ${stroke}`} />
      {/* Tick direito */}
      <div className={`w-px h-2 ${stroke} shrink-0`} />
    </div>
  );
}
