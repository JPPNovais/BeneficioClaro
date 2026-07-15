import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "@config/site";
import { getCategoriaNome } from "@config/categorias";
import { urlArtigo, urlAbsoluta } from "@lib/utils";

/**
 * /rss.xml — feed RSS 2.0 dos artigos, gerado no build. Ajuda na descoberta
 * (leitores de feed, alguns crawlers) e sinaliza frescor. Sem dependência
 * externa: o XML é montado à mão, com escape.
 */
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const GET: APIRoute = async () => {
  const artigos = (await getCollection("artigos", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.dataAtualizacao.valueOf() - a.data.dataAtualizacao.valueOf()
  );

  const items = artigos
    .map((e) => {
      const link = urlAbsoluta(SITE.url, urlArtigo(e.data.categoria, e.slug));
      return `    <item>
      <title>${esc(e.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${e.data.dataPublicacao.toUTCString()}</pubDate>
      <category>${esc(getCategoriaNome(e.data.categoria))}</category>
      <description>${esc(e.data.description)}</description>
    </item>`;
    })
    .join("\n");

  const lastBuild = artigos[0]?.data.dataAtualizacao.toUTCString() ?? new Date(0).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.nome)} — Artigos</title>
    <link>${SITE.url}</link>
    <description>${esc(SITE.descricao)}</description>
    <language>${SITE.locale}</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
