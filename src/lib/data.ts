import type { Palestrante, Palestra, Patrocinador } from "./types";

export const EVENTO = {
  nome: "CITEC 2026",
  subtitulo: "Congresso de Inovação, Tecnologia e Construção Civil",
  tema: "Da sala de aula ao mercado de trabalho",
  dataInicio: "2026-06-11T19:00:00-03:00",
  dataFim: "2026-06-13T16:00:00-03:00",
  local: "Auditório Afya Uninovafapi — Teresina, PI",
  cidade: "Teresina, PI",
};

export const palestrantes: Palestrante[] = [
  {
    id: "p-magna",
    nome: "Palestrante Nacional",
    cargo: "A confirmar",
    bio: "Profissional de referência nacional em inovação e tecnologia aplicada à construção civil. Nome a ser anunciado em breve.",
    foto: "https://i.pravatar.cc/400?img=15",
  },
  {
    id: "p-crea",
    nome: "Representante CREA-PI",
    cargo: "Conselho Regional de Engenharia e Agronomia — PI",
    bio: "Abertura institucional do CITEC 2026 com palavra oficial do CREA-PI.",
    foto: "https://i.pravatar.cc/400?img=33",
  },
  {
    id: "p-prefeitura",
    nome: "Secretaria de Urbanismo",
    cargo: "Prefeitura de Teresina",
    bio: "Especialista em aprovação de projetos e licenciamentos municipais para obras civis.",
    foto: "https://i.pravatar.cc/400?img=12",
  },
  {
    id: "p-crea2",
    nome: "Eng. Responsabilidade Técnica",
    cargo: "CREA-PI",
    bio: "Detalhamento das responsabilidades técnicas, ART e fiscalização junto ao CREA-PI.",
    foto: "https://i.pravatar.cc/400?img=68",
  },
];

const SALA = "Auditório Afya Uninovafapi";

export const palestras: Palestra[] = [
  // QUINTA 11/06 — Abertura
  {
    id: "t1",
    slug: "palestra-magna-engenheiro-do-futuro",
    titulo: "Engenheiro do Futuro: Inovação e Tecnologia na Construção Civil",
    descricao:
      "Palestra magna de abertura do CITEC 2026. Como inovação e tecnologia estão redefinindo o papel do engenheiro civil — da formação acadêmica até a entrega de obras de alto desempenho.",
    palestranteId: "p-magna",
    sala: SALA,
    inicio: "2026-06-11T19:00:00-03:00",
    fim: "2026-06-11T20:00:00-03:00",
    trilha: "Inovação",
    tipo: "palestra-magna",
    materiais: [],
  },
  {
    id: "t2",
    slug: "palavra-crea-pi",
    titulo: "Palavra do CREA-PI",
    descricao:
      "Abertura oficial com palavra institucional do Conselho Regional de Engenharia e Agronomia do Piauí.",
    palestranteId: "p-crea",
    sala: SALA,
    inicio: "2026-06-11T20:00:00-03:00",
    fim: "2026-06-11T20:30:00-03:00",
    trilha: "Construção",
    tipo: "institucional",
    materiais: [],
  },

  // SEXTA 12/06 — Palestras e Mesas Redondas
  {
    id: "t3",
    slug: "mesa-viabilidade-financiamento",
    titulo: "Viabilidade do Empreendimento e Financiamento",
    descricao:
      "Mesa redonda com três convidados sobre estudo de viabilidade econômica, captação e modelos de financiamento para empreendimentos imobiliários.",
    palestranteId: null,
    sala: SALA,
    inicio: "2026-06-12T15:00:00-03:00",
    fim: "2026-06-12T15:40:00-03:00",
    trilha: "Construção",
    tipo: "mesa-redonda",
    materiais: [],
  },
  {
    id: "t4",
    slug: "aprovacao-licenciamentos-prefeitura",
    titulo: "Aprovação e Licenciamentos na Prefeitura",
    descricao:
      "Os caminhos práticos para aprovar projetos e obter licenças junto à Prefeitura de Teresina — fluxos, documentação e armadilhas comuns.",
    palestranteId: "p-prefeitura",
    sala: SALA,
    inicio: "2026-06-12T15:40:00-03:00",
    fim: "2026-06-12T16:10:00-03:00",
    trilha: "Construção",
    tipo: "palestra",
    materiais: [],
  },
  {
    id: "t5",
    slug: "responsabilidades-crea-pi",
    titulo: "Responsabilidades junto ao CREA-PI",
    descricao:
      "ART, responsabilidade técnica, fiscalização e o que o profissional precisa saber para atuar com segurança junto ao CREA-PI.",
    palestranteId: "p-crea2",
    sala: SALA,
    inicio: "2026-06-12T16:50:00-03:00",
    fim: "2026-06-12T17:20:00-03:00",
    trilha: "Construção",
    tipo: "palestra",
    materiais: [],
  },
  {
    id: "t6",
    slug: "mesa-gestao-equipes-equipamentos",
    titulo: "Gestão de Equipes e Equipamentos",
    descricao:
      "Mesa redonda com três convidados sobre liderança em canteiro, alocação de equipes e gestão de equipamentos com tecnologia.",
    palestranteId: null,
    sala: SALA,
    inicio: "2026-06-12T17:20:00-03:00",
    fim: "2026-06-12T18:00:00-03:00",
    trilha: "Tecnologia",
    tipo: "mesa-redonda",
    materiais: [],
  },

  // SÁBADO 13/06 — Minicursos
  {
    id: "t7",
    slug: "minicursos-matutino",
    titulo: "Minicursos · Turno Matutino",
    descricao:
      "Minicursos práticos paralelos das 08h às 12h. Inscrição prévia conforme tema escolhido.",
    palestranteId: null,
    sala: SALA,
    inicio: "2026-06-13T08:00:00-03:00",
    fim: "2026-06-13T12:00:00-03:00",
    trilha: "Tecnologia",
    tipo: "minicurso",
    materiais: [],
  },
  {
    id: "t8",
    slug: "intervalo-almoco",
    titulo: "Intervalo para Almoço",
    descricao: "Pausa para almoço e networking entre os participantes.",
    palestranteId: null,
    sala: SALA,
    inicio: "2026-06-13T12:00:00-03:00",
    fim: "2026-06-13T14:00:00-03:00",
    trilha: "Construção",
    tipo: "intervalo",
    materiais: [],
  },
  {
    id: "t9",
    slug: "minicursos-vespertino",
    titulo: "Minicursos · Turno Vespertino",
    descricao:
      "Minicursos práticos paralelos das 14h às 16h. Inscrição prévia conforme tema escolhido.",
    palestranteId: null,
    sala: SALA,
    inicio: "2026-06-13T14:00:00-03:00",
    fim: "2026-06-13T16:00:00-03:00",
    trilha: "Tecnologia",
    tipo: "minicurso",
    materiais: [],
  },
];

export const patrocinadores: Patrocinador[] = [
  {
    id: "s1",
    nome: "AFYA",
    logo: "/logos/afya.png",
    tier: "diamante",
    site: "https://afya.com.br",
    instagram: "afya",
    descricao: "Patrocinador principal do CITEC 2026. Apoiando a inovação e a construção do futuro.",
    principal: true,
  },
  {
    id: "s2",
    nome: "BuildTech",
    logo: "https://placehold.co/240x120/D4145A/FFFFFF?text=BUILDTECH",
    tier: "ouro",
    site: "https://example.com",
    instagram: "buildtech",
  },
  {
    id: "s3",
    nome: "Habitat",
    logo: "https://placehold.co/240x120/2E3192/FFFFFF?text=HABITAT",
    tier: "ouro",
    site: "https://example.com",
    instagram: "habitat",
  },
  {
    id: "s4",
    nome: "ArqLab",
    logo: "https://placehold.co/240x120/8B0E3C/FFFFFF?text=ARQLAB",
    tier: "prata",
    site: "https://example.com",
    instagram: "arqlab",
  },
  {
    id: "s5",
    nome: "DroneOps",
    logo: "https://placehold.co/240x120/0A0A0A/FF2E7E?text=DRONEOPS",
    tier: "prata",
    site: "https://example.com",
    instagram: "droneops",
  },
  {
    id: "s6",
    nome: "Smartbuild",
    logo: "https://placehold.co/240x120/FFFFFF/0A0A0A?text=SMARTBUILD",
    tier: "prata",
    site: "https://example.com",
    instagram: "smartbuild",
  },
];

export function getPalestrante(id: string | null) {
  if (!id) return undefined;
  return palestrantes.find((p) => p.id === id);
}

export function getPalestraBySlug(slug: string) {
  return palestras.find((p) => p.slug === slug);
}

export function getPatrocinadorPrincipal() {
  return patrocinadores.find((p) => p.principal) ?? patrocinadores[0];
}
