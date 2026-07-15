/**
 * Saque-Aniversário do FGTS — tabela de faixas (EDITÁVEL).
 *
 * O valor do saque-aniversário = saldo × alíquota + parcela adicional, conforme
 * a faixa em que o saldo total do FGTS se encaixa (regra da Lei nº 8.036/90).
 * A tabela é estável, mas confira na fonte oficial antes de mudar.
 *
 * Tudo é calculado no navegador — nada é enviado nem salvo.
 */
export interface FaixaSaque {
  /** Limite superior da faixa (R$). `null` = última faixa (acima de tudo). */
  ate: number | null;
  /** Alíquota como fração (0.5 = 50%). */
  aliquota: number;
  /** Parcela adicional fixa (R$). */
  adicional: number;
}

export const SAQUE_ANIVERSARIO = {
  atualizadoEm: "2026-07-15",
  fontes: [
    {
      label: "FGTS — Caixa Econômica Federal",
      href: "https://www.caixa.gov.br/beneficios-trabalhador/fgts/Paginas/default.aspx",
    },
    {
      label: "Agência Brasil — Saque-Aniversário do FGTS 2026",
      href: "https://agenciabrasil.ebc.com.br/economia/noticia/2026-01/saque-aniversario-do-fgts-2026-comeca-ser-liberado",
    },
  ],
  faixas: [
    { ate: 500, aliquota: 0.5, adicional: 0 },
    { ate: 1000, aliquota: 0.4, adicional: 50 },
    { ate: 5000, aliquota: 0.3, adicional: 150 },
    { ate: 10000, aliquota: 0.2, adicional: 650 },
    { ate: 15000, aliquota: 0.15, adicional: 1150 },
    { ate: 20000, aliquota: 0.1, adicional: 1900 },
    { ate: null, aliquota: 0.05, adicional: 2900 },
  ] as FaixaSaque[],
};
