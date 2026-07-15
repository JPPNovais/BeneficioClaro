/**
 * Tabelas oficiais de 2026 para a Calculadora de Salário Líquido (CLT).
 * EDITÁVEL — confira e atualize a cada virada de ano (as tabelas mudam).
 *
 * Fontes:
 *  - INSS 2026 (salário mínimo R$ 1.621, teto R$ 8.475,55) — método da
 *    "parcela a deduzir": INSS = salário × alíquota − parcela.
 *  - IRRF 2026 — Receita Federal (Lei nº 15.191/2025) + redutor mensal da
 *    Lei nº 15.270/2025 (isenção até R$ 5.000; redução linear até R$ 7.350).
 *
 * Cálculo 100% no navegador — nada é enviado nem salvo. É uma ESTIMATIVA para
 * CLT (não considera pensão alimentícia, outras deduções ou casos especiais).
 */
export interface FaixaTabela {
  /** Limite superior da faixa (R$). `null` = última faixa. */
  ate: number | null;
  /** Alíquota como fração. */
  aliquota: number;
  /** Parcela a deduzir (R$). */
  deduzir: number;
}

export const SALARIO = {
  atualizadoEm: "2026-07-15",

  inss: {
    teto: 8475.55,
    descontoMax: 988.09,
    // método da parcela a deduzir: INSS = min(salário, teto) × alíquota − deduzir
    faixas: [
      { ate: 1621.0, aliquota: 0.075, deduzir: 0 },
      { ate: 2902.84, aliquota: 0.09, deduzir: 24.32 },
      { ate: 4354.27, aliquota: 0.12, deduzir: 111.4 },
      { ate: 8475.55, aliquota: 0.14, deduzir: 198.49 },
    ] as FaixaTabela[],
  },

  irrf: {
    // tabela progressiva mensal 2026 (base = bruto − INSS − dependentes)
    faixas: [
      { ate: 2428.8, aliquota: 0, deduzir: 0 },
      { ate: 2826.65, aliquota: 0.075, deduzir: 182.16 },
      { ate: 3751.05, aliquota: 0.15, deduzir: 394.16 },
      { ate: 4664.68, aliquota: 0.225, deduzir: 675.49 },
      { ate: null, aliquota: 0.275, deduzir: 908.73 },
    ] as FaixaTabela[],
    deducaoDependente: 189.59,
    // redutor mensal (Lei 15.270/2025), em função do salário bruto:
    //  bruto <= 5000  → isento (IRRF 0)
    //  5000 < bruto <= 7350 → redução = 978,62 − 0,133145 × bruto
    //  bruto > 7350   → sem redução
    redutor: { isencaoAte: 5000, zeraAcima: 7350, coefA: 978.62, coefB: 0.133145 },
  },

  fontes: [
    {
      label: "Receita Federal — Tabelas do IR 2026 (gov.br)",
      href: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026",
    },
    {
      label: "Tabela INSS 2026 — Serasa",
      href: "https://www.serasaexperian.com.br/conteudos/tabela-inss-2026/",
    },
  ],
};
