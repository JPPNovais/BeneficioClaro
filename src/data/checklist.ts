/**
 * Checklist de documentos por benefício — EDITÁVEL.
 *
 * COMO ATUALIZAR: adicione/edite uma entrada em `LISTAS`. Cada lista tem um
 * `label` (mostrado no seletor) e um array `docs` (os itens marcáveis).
 * Mantenha a linguagem simples e concreta.
 */
export interface ListaDocumentos {
  key: string;
  label: string;
  docs: string[];
}

export const LISTAS: ListaDocumentos[] = [
  {
    key: "bolsa",
    label: "Bolsa Família / CadÚnico",
    docs: [
      "Documento de identidade (RG ou CNH) de todos da família",
      "CPF de todos da família",
      "Comprovante de residência atualizado",
      "Certidão de nascimento das crianças",
      "Comprovante de matrícula escolar das crianças",
      "Carteira de trabalho (se tiver)",
    ],
  },
  {
    key: "gas",
    label: "Auxílio Gás",
    docs: [
      "Estar inscrito no CadÚnico atualizado",
      "Documento de identidade do responsável",
      "NIS do responsável familiar",
    ],
  },
  {
    key: "tarifa",
    label: "Tarifa Social de Energia",
    docs: [
      "Estar inscrito no CadÚnico",
      "Conta de luz no nome do responsável",
      "NIS do responsável familiar",
    ],
  },
];
