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
  mesReferencia: "outubro de 2026",
  periodo: "De 19 a 30 de outubro",
  atualizadoEm: "2026-10-02",
  fonte: {
    label: "Bolsa Família terá valor mínimo de R$ 691 a partir de outubro — MDS (gov.br)",
    href: "https://www.gov.br/mds/pt-br/noticias/bolsa-familia-tera-valor-minimo-de-r-691-a-partir-de-outubro",
  },
  // Outubro/2026: os últimos 10 dias úteis do mês são 19, 20, 21, 22, 23, 26,
  // 27, 28, 29 e 30 (outubro não tem feriado nacional; os feriados de 2/11,
  // 15/11 e 20/11 são de novembro). Final 1 = 19/10; final 0 = 30/10. Também
  // é o 1º mês com o valor mínimo reajustado para R$ 691 (Decreto 13.120/2026).
  datas: [
    { nis: "1", dia: "19 de outubro", iso: "2026-10-19" },
    { nis: "2", dia: "20 de outubro", iso: "2026-10-20" },
    { nis: "3", dia: "21 de outubro", iso: "2026-10-21" },
    { nis: "4", dia: "22 de outubro", iso: "2026-10-22" },
    { nis: "5", dia: "23 de outubro", iso: "2026-10-23" },
    { nis: "6", dia: "26 de outubro", iso: "2026-10-26" },
    { nis: "7", dia: "27 de outubro", iso: "2026-10-27" },
    { nis: "8", dia: "28 de outubro", iso: "2026-10-28" },
    { nis: "9", dia: "29 de outubro", iso: "2026-10-29" },
    { nis: "0", dia: "30 de outubro", iso: "2026-10-30" },
  ],
};
