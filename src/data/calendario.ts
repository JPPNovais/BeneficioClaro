/**
 * Calendário de pagamento do Bolsa Família, por final do NIS.
 *
 * COMO ATUALIZAR (mensalmente): troque `mesReferencia`, `periodo`, `atualizadoEm`
 * e o array `datas`. Dado de pagamento vencido é pior que dado ausente — é a
 * primeira coisa que a pessoa vem conferir.
 *
 * A REGRA OFICIAL (MDS/Caixa) é determinística e permite conferir a tabela:
 * o pagamento cai nos **últimos dez dias úteis** do mês, escalonado pelo final
 * do NIS — final 1 no primeiro dia, final 0 no último. Sábados, domingos e
 * feriados nacionais não contam.
 *
 * ⚠ DUAS EXCEÇÕES que a regra não cobre — sempre confira a fonte oficial:
 *   1. **Dezembro** é antecipado (concentrado no começo do mês).
 *   2. Municípios em **emergência/calamidade** recebem tudo no primeiro dia,
 *      sem escalonamento.
 *
 * Também confira feriados nacionais no mês (ex.: 2/11, 15/11, 20/11, 25/12),
 * que empurram as datas.
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
  mesReferencia: "agosto de 2026",
  periodo: "De 18 a 31 de agosto",
  atualizadoEm: "2026-08-12",
  fonte: {
    label: "Calendário Bolsa Família 2026 — Ministério do Desenvolvimento (gov.br)",
    href: "https://www.gov.br/mds/pt-br/noticias-e-conteudos/desenvolvimento-social/noticias-desenvolvimento-social/confira-o-calendario-de-pagamentos-do-bolsa-familia-de-2026",
  },
  // Agosto/2026: os últimos 10 dias úteis do mês são 18, 19, 20, 21, 24, 25,
  // 26, 27, 28 e 31 (agosto não tem feriado nacional). Final 1 = 18/08;
  // final 0 = 31/08. Confere com a regra oficial do MDS e com o calendário
  // divulgado pela imprensa.
  datas: [
    { nis: "1", dia: "18 de agosto", iso: "2026-08-18" },
    { nis: "2", dia: "19 de agosto", iso: "2026-08-19" },
    { nis: "3", dia: "20 de agosto", iso: "2026-08-20" },
    { nis: "4", dia: "21 de agosto", iso: "2026-08-21" },
    { nis: "5", dia: "24 de agosto", iso: "2026-08-24" },
    { nis: "6", dia: "25 de agosto", iso: "2026-08-25" },
    { nis: "7", dia: "26 de agosto", iso: "2026-08-26" },
    { nis: "8", dia: "27 de agosto", iso: "2026-08-27" },
    { nis: "9", dia: "28 de agosto", iso: "2026-08-28" },
    { nis: "0", dia: "31 de agosto", iso: "2026-08-31" },
  ],
};
