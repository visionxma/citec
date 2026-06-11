export type Palestrante = {
  id: string;
  nome: string;
  bio: string;
  foto: string;
  instagram?: string;
  cargo?: string;
};

export type Material = {
  id: string;
  tipo: "slide" | "pdf" | "video" | "link";
  titulo: string;
  url: string;
};

export type SessaoTipo =
  | "palestra-magna"
  | "palestra"
  | "mesa-redonda"
  | "minicurso"
  | "intervalo"
  | "institucional";

export type Palestra = {
  id: string;
  slug: string;
  titulo: string;
  descricao: string;
  palestranteId: string | null;
  /** IDs dos demais palestrantes (mesas redondas com co-convidados). */
  palestrantesExtras?: string[];
  /** Texto exibido no lugar do palestrante quando ainda não confirmado. */
  palestranteNota?: string;
  sala: string;
  inicio: string;
  fim: string;
  trilha: "Inovação" | "Tecnologia" | "Construção";
  tipo: SessaoTipo;
  materiais: Material[];
};

export type Patrocinador = {
  id: string;
  nome: string;
  logo: string;
  tier: "diamante" | "ouro" | "prata";
  site?: string;
  instagram?: string;
  descricao?: string;
  principal?: boolean;
};
