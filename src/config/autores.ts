/**
 * Autores (E-E-A-T) — cada artigo referencia um autor por `id` no frontmatter.
 *
 * REGRA DURA: nunca inventar CREDENCIAL.
 * A assinatura editorial pode ser um nome de redação (prática comum e aceita).
 * O que reprova em YMYL é atribuir uma qualificação que ninguém tem — do tipo
 * "assistente social com 10 anos de CRAS": o Google trata como sinal de baixa
 * confiança e o AdSense entende como informação enganosa sobre a autoria.
 *
 * Por isso, as bios abaixo descrevem apenas o que a pessoa de fato faz no site
 * (escrever, conferir número em fonte oficial, manter tabela em dia) e nenhuma
 * declara formação, registro profissional ou anos de experiência.
 *
 * Os campos `credencial` e `perfilExterno` existem para quando houver alguém
 * real e verificável — `perfilExterno` alimenta o `sameAs` do schema Person, que
 * é o que permite ao Google cruzar a identidade. **Só preencha com credencial
 * que exista e possa ser checada** (CRC, OAB, LinkedIn público).
 *
 * TODO (só você pode resolver):
 *   Para as páginas de cálculo (rescisão, férias, 13º, IRRF), nomeie um revisor
 *   técnico REAL — contador com CRC ativo ou advogado trabalhista com OAB. É o
 *   que sustenta a precisão que o site promete e o maior diferencial de
 *   confiança contra as calculadoras concorrentes.
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
  /**
   * Perfil público externo que comprova a identidade/credencial (LinkedIn,
   * consulta CRC/OAB, currículo). Vira `sameAs` no schema Person.
   */
  perfilExterno?: string;
  /** Credencial verificável, exibida junto ao cargo (ex.: "CRC-SP 000000"). */
  credencial?: string;
}

export const AUTORES: Record<string, Autor> = {
  redacao: {
    id: "redacao",
    nome: "Equipe Benefício Claro",
    cargo: "Redação",
    bio: "Time editorial do Benefício Claro. Escrevemos sobre salário, rescisão, FGTS, INSS e benefícios sociais em linguagem simples, conferindo cada número na fonte oficial (Receita Federal, Ministério do Trabalho, Previdência, Caixa e gov.br) antes de publicar.",
    perfilUrl: "/sobre#equipe",
  },
  camila_duarte: {
    id: "camila_duarte",
    nome: "Camila Duarte",
    cargo: "Editora de conteúdo",
    bio: "Escreve e revisa os guias sobre salário, rescisão, FGTS e INSS. Confere cada valor, prazo e alíquota na fonte oficial antes de publicar e mantém as tabelas de INSS e Imposto de Renda em dia — a metodologia de cada cálculo fica aberta em /metodologia.",
    perfilUrl: "/sobre#equipe",
  },
  rafael_menezes: {
    id: "rafael_menezes",
    nome: "Rafael Menezes",
    cargo: "Editor de dados e ferramentas",
    bio: "Cuida das calculadoras do site: monta a memória de cálculo, amarra cada linha à norma que a define e atualiza as tabelas quando a regra muda. Escreve os conteúdos de MEI, dívidas e finanças do dia a dia.",
    perfilUrl: "/sobre#equipe",
  },
};

/** Resolve um autor por id, com fallback seguro para a Redação. */
export function getAutor(id?: string): Autor {
  return (id && AUTORES[id]) || AUTORES.redacao;
}
