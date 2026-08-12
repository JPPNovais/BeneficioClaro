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
  /** Silo a que a categoria pertence (ver GrupoCategoria). */
  grupo: GrupoCategoria;
  /** Tem página-pilar dedicada? */
  pilar: boolean;
  /** Texto do herói da página-pilar. */
  heroEyebrow?: string;
  heroTitulo?: string;
  heroDescricao?: string;
  /** Agrupadores de subtópicos para a página-pilar. */
  subtopicos?: Subtopico[];
  /**
   * Silo de ferramentas destacado no topo da página-pilar (tool-first).
   * Deixe vazio para uma página-pilar só de conteúdo.
   */
  ferramentasGrupo?: "trabalho" | "beneficios";
  /**
   * Slugs de categorias irmãs cujos artigos aparecem numa seção extra do pilar
   * ("Também sobre..."). Serve para o pilar já nascer útil enquanto os artigos
   * da própria categoria não existem, e para amarrar a linkagem interna do silo.
   */
  irmas?: string[];
  /** Título da seção de categorias irmãs no pilar. */
  irmasTitulo?: string;
}

/**
 * Grupo do silo: define onde a categoria aparece na navegação e nas listagens.
 *
 * - "trabalho": o foco atual do site (o dinheiro de quem trabalha).
 * - "beneficios": silo secundário, agrupado no hub /beneficios. As URLs dos
 *   artigos NÃO mudaram — o rebaixamento é de navegação, para não perder a
 *   indexação já conquistada.
 * - "geral": transversal (notícias).
 */
export type GrupoCategoria = "trabalho" | "beneficios" | "geral";

export const CATEGORIAS: Categoria[] = [
  {
    slug: "trabalho",
    nome: "Salário e rescisão",
    rotulo: "Trabalho",
    grupo: "trabalho",
    pilar: true,
    heroEyebrow: "Guia completo",
    heroTitulo: "Salário, rescisão e seus direitos: o guia com a conta aberta",
    heroDescricao:
      "Quanto você recebe, quanto é descontado e por qual regra. Cada valor com a fórmula à vista e a base legal do lado — mais as calculadoras para fazer a conta com os seus números.",
    ferramentasGrupo: "trabalho",
    irmas: ["fgts", "inss", "financas", "renda-extra"],
    irmasTitulo: "Também sobre o dinheiro do trabalho",
    subtopicos: [
      {
        key: "salario",
        icon: "wallet",
        title: "Salário e descontos",
        desc: "Líquido, INSS por faixa, IRRF e horas extras.",
      },
      {
        key: "rescisao",
        icon: "file-text",
        title: "Demissão e rescisão",
        desc: "Aviso prévio, multa de 40% e seguro-desemprego.",
      },
      {
        key: "ferias-decimo",
        icon: "calendar",
        title: "Férias e 13º",
        desc: "Terço constitucional, abono e as duas parcelas.",
      },
      {
        key: "outros-direitos",
        icon: "shield-check",
        title: "Outros direitos",
        desc: "Adicional noturno, DSR, vale-transporte e PIS.",
      },
    ],
  },
  {
    slug: "fgts",
    nome: "FGTS",
    rotulo: "FGTS",
    grupo: "trabalho",
    pilar: false,
  },
  {
    slug: "inss",
    nome: "INSS e aposentadoria",
    rotulo: "INSS",
    grupo: "trabalho",
    pilar: false,
  },
  {
    slug: "financas",
    nome: "Finanças do dia a dia",
    rotulo: "Finanças",
    grupo: "trabalho",
    pilar: false,
  },
  {
    slug: "renda-extra",
    nome: "MEI e renda extra",
    rotulo: "MEI e renda extra",
    grupo: "trabalho",
    pilar: false,
  },

  // ===== Silo secundário: benefícios sociais =====
  // Mantidos com as URLs originais (não perder a indexação já conquistada).
  // A entrada na navegação é o hub /beneficios.
  {
    slug: "bolsa-familia",
    nome: "Bolsa Família",
    rotulo: "Bolsa Família",
    grupo: "beneficios",
    pilar: true,
    heroEyebrow: "Guia completo",
    heroTitulo: "Bolsa Família: o guia completo e atualizado",
    heroDescricao:
      "Tudo o que você precisa saber, em um só lugar e em linguagem simples: quem tem direito, valores, como se inscrever e quando recebe.",
    ferramentasGrupo: "beneficios",
    irmas: ["cadunico", "auxilio-gas", "tarifa-social"],
    irmasTitulo: "Outros benefícios sociais",
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
    grupo: "beneficios",
    pilar: false,
  },
  {
    slug: "auxilio-gas",
    nome: "Auxílio Gás",
    rotulo: "Auxílio Gás",
    grupo: "beneficios",
    pilar: false,
  },
  {
    slug: "tarifa-social",
    nome: "Tarifa Social de Energia",
    rotulo: "Tarifa Social",
    grupo: "beneficios",
    pilar: false,
  },

  // ===== Transversal =====
  {
    slug: "noticias",
    nome: "Notícias",
    rotulo: "Notícias",
    grupo: "geral",
    pilar: false,
  },
];

export function getCategoria(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug);
}

export function getCategoriaNome(slug: string): string {
  return getCategoria(slug)?.nome ?? slug;
}

/** Categorias de um silo, na ordem em que aparecem acima. */
export function categoriasDoGrupo(grupo: GrupoCategoria): Categoria[] {
  return CATEGORIAS.filter((c) => c.grupo === grupo);
}
