/**
 * Categorias = pilares de conteúdo (estrutura "pilar + satélites").
 *
 * Cada categoria com `pilar: true` ganha uma página-pilar em /{slug}, que
 * agrupa seus artigos satélite pelos `subtopicos` definidos abaixo. Cada
 * artigo aponta para um subtópico pelo campo `subtopico` no frontmatter; a
 * linkagem interna (pilar ⇄ satélites) é montada automaticamente a partir
 * disso e das tags.
 */
export interface Subtopico {
  /** Chave usada no frontmatter do artigo (campo `subtopico`). */
  key: string;
  /** Nome do ícone (ver Icon.astro). */
  icon: string;
  title: string;
  desc: string;
}

export interface Categoria {
  slug: string;
  nome: string;
  /** Rótulo curto para badges/breadcrumb. */
  rotulo: string;
  /** Tem página-pilar dedicada? */
  pilar: boolean;
  /** Texto do herói da página-pilar. */
  heroEyebrow?: string;
  heroTitulo?: string;
  heroDescricao?: string;
  /** Agrupadores de subtópicos para a página-pilar. */
  subtopicos?: Subtopico[];
}

export const CATEGORIAS: Categoria[] = [
  {
    slug: "bolsa-familia",
    nome: "Bolsa Família",
    rotulo: "Bolsa Família",
    pilar: true,
    heroEyebrow: "Guia completo",
    heroTitulo: "Bolsa Família: o guia completo e atualizado",
    heroDescricao:
      "Tudo o que você precisa saber, em um só lugar e em linguagem simples: quem tem direito, valores, como se inscrever e quando recebe.",
    subtopicos: [
      {
        key: "quem-tem-direito",
        icon: "user",
        title: "Quem tem direito",
        desc: "Renda, CadÚnico e regras de elegibilidade.",
      },
      {
        key: "valores",
        icon: "wallet",
        title: "Valores e parcelas",
        desc: "Quanto cada família recebe e os adicionais.",
      },
      {
        key: "inscricao",
        icon: "file-text",
        title: "Inscrição e CadÚnico",
        desc: "Passo a passo para entrar no programa.",
      },
      {
        key: "pagamento",
        icon: "calendar",
        title: "Pagamento",
        desc: "Datas, NIS e como sacar.",
      },
    ],
  },
  {
    slug: "cadunico",
    nome: "CadÚnico",
    rotulo: "CadÚnico",
    pilar: false,
  },
  {
    slug: "auxilio-gas",
    nome: "Auxílio Gás",
    rotulo: "Auxílio Gás",
    pilar: false,
  },
  {
    slug: "tarifa-social",
    nome: "Tarifa Social de Energia",
    rotulo: "Tarifa Social",
    pilar: false,
  },
  {
    slug: "financas",
    nome: "Finanças do dia a dia",
    rotulo: "Finanças",
    pilar: false,
  },
  {
    slug: "noticias",
    nome: "Notícias",
    rotulo: "Notícias",
    pilar: false,
  },
];

export function getCategoria(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug);
}

export function getCategoriaNome(slug: string): string {
  return getCategoria(slug)?.nome ?? slug;
}
