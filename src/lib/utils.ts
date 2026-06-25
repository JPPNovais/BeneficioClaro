/**
 * Utilitários compartilhados: datas (pt-BR), tempo de leitura e URLs.
 */

const fmtLongo = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const fmtCurto = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "short",
});

/** "12 de junho de 2026" — usado em "Atualizado em [data]" e no schema. */
export function formatarData(date: Date): string {
  return fmtLongo.format(date);
}

/** "12 de jun." → normalizamos para "12 jun" (igual aos cards do design). */
export function formatarDataCurta(date: Date): string {
  return fmtCurto.format(date).replace(/\.$/, "").replace(" de ", " ");
}

/** Data ISO (YYYY-MM-DD) para atributos datetime e schema. */
export function dataISO(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Tempo de leitura estimado (~200 palavras/min) a partir do texto do corpo. */
export function tempoLeitura(texto: string): string {
  const palavras = texto.trim().split(/\s+/).filter(Boolean).length;
  const minutos = Math.max(1, Math.round(palavras / 200));
  return `${minutos} min`;
}

/** Junta a URL do site com um caminho, sem barras duplicadas. */
export function urlAbsoluta(site: URL | string | undefined, caminho: string): string {
  const base = (typeof site === "string" ? site : site?.toString() || "").replace(/\/$/, "");
  const path = caminho.startsWith("/") ? caminho : `/${caminho}`;
  return `${base}${path}`;
}

/** URL pública de um artigo a partir de categoria + slug. */
export function urlArtigo(categoria: string, slug: string): string {
  return `/${categoria}/${slug}`;
}
