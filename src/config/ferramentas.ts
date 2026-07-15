/**
 * Ferramentas interativas do site — fonte única usada pelo hub (/ferramentas)
 * e pela home. Adicionar uma ferramenta aqui já a faz aparecer nos dois lugares
 * (e no schema ItemList do hub). Ordene por relevância.
 */
export interface Ferramenta {
  title: string;
  /** Título curto para a home / listagens compactas. */
  short?: string;
  description: string;
  icon: string;
  href: string;
  tone?: "primary" | "cta";
}

export const FERRAMENTAS: Ferramenta[] = [
  {
    title: "Simulador de benefícios",
    description: "Responda 4 perguntas e veja a quais benefícios sociais você pode ter direito.",
    icon: "calculator",
    href: "/ferramentas/simulador",
    tone: "cta",
  },
  {
    title: "Calculadora de Salário Líquido",
    short: "Salário líquido",
    description: "Digite o salário bruto e veja o líquido, com INSS e Imposto de Renda de 2026.",
    icon: "trending-up",
    href: "/ferramentas/calculadora-salario-liquido",
  },
  {
    title: "Simulador do Saque-Aniversário do FGTS",
    short: "Saque-Aniversário do FGTS",
    description: "Digite o saldo do seu FGTS e veja quanto poderia sacar no saque-aniversário.",
    icon: "wallet",
    href: "/ferramentas/saque-aniversario-fgts",
  },
  {
    title: "Calendário de pagamento",
    description: "Descubra quando cai o seu Bolsa Família filtrando pelo final do NIS.",
    icon: "calendar",
    href: "/ferramentas/calendario",
  },
  {
    title: "Checklist de documentos",
    description: "Escolha o benefício e marque, um a um, os documentos que você já tem.",
    icon: "check-square",
    href: "/ferramentas/checklist",
  },
];
