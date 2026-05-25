/**
 * TitleBlock — carimbo de prancha técnica (title block).
 *
 * Grid de células com label uppercase + valor mono, imitando o carimbo
 * do canto inferior direito de uma prancha de engenharia/arquitetura.
 *
 *   ┌─────────────┬─────────────┬─────────────┐
 *   │ PROJETO     │ REVISÃO     │ DATA        │
 *   │ CITEC       │ 04          │ 06.2026     │
 *   └─────────────┴─────────────┴─────────────┘
 */
type Cell = { label: string; value: string };

export function TitleBlock({
  cells,
  className = "",
}: {
  cells: Cell[];
  className?: string;
}) {
  return (
    <div
      className={`inline-grid border border-white/15 rounded-sm overflow-hidden ${className}`}
      style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}
    >
      {cells.map((c, i) => (
        <div
          key={i}
          className={`px-3 py-2 ${i > 0 ? "border-l border-white/15" : ""} bg-ink/40`}
        >
          <div className="text-[9px] uppercase tracking-[0.25em] text-white/40 font-mono">
            {c.label}
          </div>
          <div className="text-xs font-mono font-bold text-white mt-0.5 whitespace-nowrap">
            {c.value}
          </div>
        </div>
      ))}
    </div>
  );
}
