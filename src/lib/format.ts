// Fuso fixo de Teresina, PI: sem isso, o build estático (servidor em UTC)
// renderiza todos os horários com +3h.
const TZ = "America/Fortaleza";

export function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  });
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    timeZone: TZ,
  });
}

export function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    timeZone: TZ,
  });
}
