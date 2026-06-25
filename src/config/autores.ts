/**
 * Autores (E-E-A-T) — cada artigo referencia um autor por `id` no frontmatter.
 * A mini-bio e o vínculo com a página Sobre reforçam credibilidade em YMYL.
 */
export interface Autor {
  id: string;
  nome: string;
  cargo: string;
  bio: string;
  /** Foto em /public (use WebP/SVG). Vazio = usa iniciais. */
  foto?: string;
  /** Âncora/URL na página Sobre que apresenta o autor. */
  perfilUrl: string;
}

export const AUTORES: Record<string, Autor> = {
  redacao: {
    id: "redacao",
    nome: "Equipe Benefício Claro",
    cargo: "Redação",
    bio: "Time de redatores que explica benefícios sociais e finanças do dia a dia em linguagem simples, sempre conferindo cada informação nas fontes oficiais (gov.br, Caixa e Ministério do Desenvolvimento).",
    perfilUrl: "/sobre#equipe",
  },
  ana_ribeiro: {
    id: "ana_ribeiro",
    nome: "Ana Ribeiro",
    cargo: "Especialista em benefícios sociais",
    bio: "Assistente social com mais de 10 anos de experiência em atendimento no CRAS e no CadÚnico. Revisa nossos conteúdos sobre Bolsa Família e programas de transferência de renda.",
    perfilUrl: "/sobre#equipe",
  },
};

/** Resolve um autor por id, com fallback seguro para a Redação. */
export function getAutor(id?: string): Autor {
  return (id && AUTORES[id]) || AUTORES.redacao;
}
