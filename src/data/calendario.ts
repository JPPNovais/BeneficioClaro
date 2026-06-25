/**
 * Calendário de pagamento do Bolsa Família, por final do NIS.
 *
 * COMO ATUALIZAR (mensalmente): troque `mesReferencia`, `periodo` e o array
 * `datas`. Os dados oficiais saem no calendário da Caixa/MDS — confira o link
 * em `fonte`. Cada item liga o último número do NIS (antes do dígito) ao dia
 * de pagamento daquele mês.
 *
 * ⚠ Os dados abaixo são um EXEMPLO (junho/2026). Atualize antes de publicar.
 */
export interface DiaPagamento {
  /** Último número do NIS, antes do dígito ("0" a "9"). */
  nis: string;
  /** Dia do pagamento, por extenso (ex.: "18 de junho"). */
  dia: string;
  /** Data ISO (YYYY-MM-DD), usada para ordenação e schema. */
  iso: string;
}

export interface Calendario {
  mesReferencia: string;
  periodo: string;
  /** Última atualização desta tabela (ISO). */
  atualizadoEm: string;
  fonte: { label: string; href: string };
  datas: DiaPagamento[];
}

export const CALENDARIO: Calendario = {
  mesReferencia: "junho de 2026",
  periodo: "De 18 a 30 de junho",
  atualizadoEm: "2026-06-12",
  fonte: {
    label: "Calendário Bolsa Família — Caixa",
    href: "https://www.caixa.gov.br/programas-sociais/bolsa-familia/",
  },
  datas: [
    { nis: "1", dia: "18 de junho", iso: "2026-06-18" },
    { nis: "2", dia: "19 de junho", iso: "2026-06-19" },
    { nis: "3", dia: "20 de junho", iso: "2026-06-20" },
    { nis: "4", dia: "23 de junho", iso: "2026-06-23" },
    { nis: "5", dia: "24 de junho", iso: "2026-06-24" },
    { nis: "6", dia: "25 de junho", iso: "2026-06-25" },
    { nis: "7", dia: "26 de junho", iso: "2026-06-26" },
    { nis: "8", dia: "27 de junho", iso: "2026-06-27" },
    { nis: "9", dia: "30 de junho", iso: "2026-06-30" },
    { nis: "0", dia: "30 de junho", iso: "2026-06-30" },
  ],
};
