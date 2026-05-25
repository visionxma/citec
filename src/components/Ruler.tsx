/**
 * Ruler — régua técnica horizontal.
 *
 * Renderiza uma linha base com tracinhos verticais espaçados:
 * - tick "grande" a cada 50px (linha de 10px)
 * - tick "pequeno" a cada 10px (linha de 4px)
 *
 * Implementado via SVG pattern repetitivo. Aceita labels opcionais nas pontas.
 *
 *  |‖‖‖‖|‖‖‖‖|‖‖‖‖|‖‖‖‖|
 */
export function Ruler({
  className = "",
  startLabel,
  endLabel,
}: {
  className?: string;
  startLabel?: string;
  endLabel?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {startLabel && (
        <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-white/40 whitespace-nowrap">
          {startLabel}
        </span>
      )}
      <svg
        className="flex-1 h-3 text-white/30"
        viewBox="0 0 1000 12"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <pattern
            id="ruler-ticks"
            x="0"
            y="0"
            width="50"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            {/* base line */}
            <line x1="0" y1="11" x2="50" y2="11" stroke="currentColor" strokeWidth="1" />
            {/* big tick */}
            <line x1="0" y1="2" x2="0" y2="11" stroke="currentColor" strokeWidth="1" />
            {/* small ticks */}
            <line x1="10" y1="7" x2="10" y2="11" stroke="currentColor" strokeWidth="1" />
            <line x1="20" y1="7" x2="20" y2="11" stroke="currentColor" strokeWidth="1" />
            <line x1="30" y1="7" x2="30" y2="11" stroke="currentColor" strokeWidth="1" />
            <line x1="40" y1="7" x2="40" y2="11" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1000" height="12" fill="url(#ruler-ticks)" />
      </svg>
      {endLabel && (
        <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-white/40 whitespace-nowrap">
          {endLabel}
        </span>
      )}
    </div>
  );
}
