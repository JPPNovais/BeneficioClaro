import type { APIRoute } from "astro";
import { SITE } from "@config/site";

/**
 * robots.txt gerado no build. Libera todo o conteúdo (tráfego 100% orgânico) e
 * aponta para o sitemap-index gerado pelo @astrojs/sitemap.
 */
export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
