/**
 * Ferramentas interativas do site — fonte única usada pelo hub (/ferramentas),
 * pela home e pela página-pilar. Adicionar uma ferramenta aqui já a faz aparecer
 * nos três lugares (e no schema ItemList do hub).
 *
 * A ordem é tool-first e proposital: as calculadoras do silo "trabalho" vêm
 * primeiro porque são o ativo que ranqueia e o motivo de a pessoa voltar.
 *
 * Roadmap de calculadoras (fase 1 do reposicionamento), por volume × facilidade:
 *   1. Rescisão / acerto trabalhista        6. Juros compostos ("quanto rende")
 *   2. Férias + 1/3 (com abono)             7. Financiamento SAC vs Price
 *   3. 13º salário (1ª e 2ª parcela)        8. Custo do rotativo do cartão
 *   4. Horas extras + adicional noturno + DSR
 *   5. Salário líquido (existe — refazer com memória de cálculo)
 * Não crie a entrada aqui antes da página existir: link morto e página fina
 * prejudicam a análise do AdSense.
 */

/** Silo da ferramenta — espelha GrupoCategoria em src/config/categorias.ts. */
export type GrupoFerramenta = "trabalho" | "beneficios";

export interface Ferramenta {
  title: string;
  /** Título curto para a home / listagens compactas. */
  short?: string;
  description: string;
  icon: string;
  href: string;
  grupo: GrupoFerramenta;
  tone?: "primary" | "cta";
}

export const FERRAMENTAS: Ferramenta[] = [
  {
    title: "Calculadora de Salário Líquido",
    short: "Salário líquido",
    description:
      "Digite o salário bruto e veja o líquido, com o INSS por faixa e o Imposto de Renda de 2026 — e a conta aberta linha por linha.",
    icon: "trending-up",
    href: "/ferramentas/calculadora-salario-liquido",
    grupo: "trabalho",
    tone: "cta",
  },
  {
    title: "Simulador do Saque-Aniversário do FGTS",
    short: "Saque-Aniversário do FGTS",
    description: "Digite o saldo do seu FGTS e veja quanto poderia sacar no saque-aniversário.",
    icon: "wallet",
    href: "/ferramentas/saque-aniversario-fgts",
    grupo: "trabalho",
  },
  {
    title: "Simulador de benefícios",
    description: "Responda 4 perguntas e veja a quais benefícios sociais você pode ter direito.",
    icon: "calculator",
    href: "/ferramentas/simulador",
    grupo: "beneficios",
  },
  {
    title: "Calendário de pagamento",
    description: "Descubra quando cai o seu Bolsa Família filtrando pelo final do NIS.",
    icon: "calendar",
    href: "/ferramentas/calendario",
    grupo: "beneficios",
  },
  {
    title: "Checklist de documentos",
    description: "Escolha o benefício e marque, um a um, os documentos que você já tem.",
    icon: "check-square",
    href: "/ferramentas/checklist",
    grupo: "beneficios",
  },
];

/** Ferramentas de um silo, na ordem definida acima. */
export function ferramentasDoGrupo(grupo: GrupoFerramenta): Ferramenta[] {
  return FERRAMENTAS.filter((f) => f.grupo === grupo);
}

/** Rótulos dos silos, para títulos de seção no hub. */
export const GRUPOS_FERRAMENTAS: { grupo: GrupoFerramenta; titulo: string; descricao: string }[] = [
  {
    grupo: "trabalho",
    titulo: "Salário, rescisão e FGTS",
    descricao: "Faça a conta com os seus números e veja de onde vem cada desconto.",
  },
  {
    grupo: "beneficios",
    titulo: "Benefícios sociais",
    descricao: "Elegibilidade, datas de pagamento e documentos.",
  },
];
