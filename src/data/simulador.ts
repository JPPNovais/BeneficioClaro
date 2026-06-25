/**
 * Simulador de elegibilidade — perguntas e regras EDITÁVEIS.
 *
 * Tudo aqui é declarativo (dados, não código), então dá para ajustar sem mexer
 * na lógica. O simulador roda 100% no navegador: nada é enviado ou salvo.
 *
 * COMO EDITAR AS REGRAS:
 *  - `PERGUNTAS`: o fluxo passo a passo. Cada pergunta tem opções com `value`.
 *  - `BENEFICIOS`: cada benefício tem `condicoes` — um mapa
 *      { chaveDaPergunta: [valores que satisfazem] }.
 *    Regra: dentro de um array é "OU"; entre chaves diferentes é "E".
 *    Ex.: { renda: ["ate650","650-1300"], cadunico: ["sim","nao","naosei"] }
 *    significa "renda baixa E qualquer resposta de CadÚnico".
 *  - `FALLBACK`: mostrado quando nenhum benefício casa (nunca volta vazio).
 *
 * ⚠ É só uma ORIENTAÇÃO. A decisão final depende da análise oficial do
 * CadÚnico — isso fica explícito na tela de resultado.
 */
export interface OpcaoPergunta {
  value: string;
  label: string;
}

export interface Pergunta {
  key: string;
  title: string;
  help: string;
  options: OpcaoPergunta[];
}

export interface BeneficioSimulado {
  id: string;
  title: string;
  /** Por que pode ter direito (texto curto no resultado). */
  why: string;
  icon: string;
  /** Link para o artigo que explica o benefício. */
  artigoUrl: string;
  /** Condições de elegibilidade declarativas. */
  condicoes: Record<string, string[]>;
}

export const PERGUNTAS: Pergunta[] = [
  {
    key: "pessoas",
    title: "Quantas pessoas moram na sua casa?",
    help: "Conte todos, incluindo crianças.",
    options: [
      { value: "1", label: "Moro sozinho(a)" },
      { value: "2-3", label: "2 ou 3 pessoas" },
      { value: "4-5", label: "4 ou 5 pessoas" },
      { value: "6+", label: "6 ou mais" },
    ],
  },
  {
    key: "renda",
    title: "Qual a renda total da família por mês?",
    help: "Some tudo o que todos da casa ganham.",
    options: [
      { value: "ate650", label: "Até R$ 650" },
      { value: "650-1300", label: "De R$ 650 a R$ 1.300" },
      { value: "1300-2640", label: "De R$ 1.300 a R$ 2.640" },
      { value: "mais", label: "Mais de R$ 2.640" },
    ],
  },
  {
    key: "criancas",
    title: "Tem crianças, gestantes ou estudantes na família?",
    help: "Isso pode dar direito a mais benefícios.",
    options: [
      { value: "crianca", label: "Sim, criança de até 6 anos" },
      { value: "estudante", label: "Sim, estudante de escola pública" },
      { value: "gestante", label: "Sim, gestante" },
      { value: "nao", label: "Não" },
    ],
  },
  {
    key: "cadunico",
    title: "Você já está inscrito no CadÚnico?",
    help: "É o cadastro feito no CRAS.",
    options: [
      { value: "sim", label: "Sim, já fiz" },
      { value: "nao", label: "Ainda não" },
      { value: "naosei", label: "Não tenho certeza" },
    ],
  },
];

export const BENEFICIOS: BeneficioSimulado[] = [
  {
    id: "bolsa-familia",
    title: "Bolsa Família",
    why: "Renda por pessoa dentro do limite estimado.",
    icon: "hand-coins",
    artigoUrl: "/bolsa-familia/quem-tem-direito-bolsa-familia",
    condicoes: { renda: ["ate650", "650-1300"] },
  },
  {
    id: "tarifa-social",
    title: "Tarifa Social de Energia",
    why: "Famílias do CadÚnico com baixa renda têm desconto na conta de luz.",
    icon: "droplet",
    artigoUrl: "/tarifa-social",
    condicoes: { renda: ["ate650", "650-1300"] },
  },
  {
    id: "auxilio-gas",
    title: "Auxílio Gás",
    why: "Concedido a famílias do Bolsa Família e de baixa renda.",
    icon: "flame",
    artigoUrl: "/auxilio-gas",
    condicoes: { renda: ["ate650", "650-1300"] },
  },
  {
    id: "pe-de-meia",
    title: "Pé-de-Meia",
    why: "Estudante de escola pública de família de baixa renda.",
    icon: "graduation-cap",
    artigoUrl: "/financas",
    condicoes: { criancas: ["estudante"] },
  },
];

export const FALLBACK: BeneficioSimulado = {
  id: "conta-digital",
  title: "Conta digital sem tarifa",
  why: "Disponível para todos, sem custo.",
  icon: "wallet",
  artigoUrl: "/financas",
  condicoes: {},
};
