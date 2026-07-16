// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import { SITE } from "./src/config/site";

// https://astro.build
export default defineConfig({
  // `site` é obrigatório para canonical, Open Graph e sitemap absolutos.
  site: SITE.url,
  // HTML estático puro — melhor para Core Web Vitals e crawl (SEO).
  output: "static",
  // Sem prefetch agressivo: público em 3G, economizamos dados.
  prefetch: false,
  trailingSlash: "never",
  build: {
    // URLs limpas e descritivas: /bolsa-familia/quem-tem-direito (sem .html)
    format: "directory",
    inlineStylesheets: "auto",
  },
  integrations: [
    tailwind({
      // Mantemos nosso próprio reset/base em global.css (tokens do design).
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      // Não lista no sitemap as páginas noindex: a busca e as categorias ainda
      // sem conteúdo. Ao publicar artigos numa categoria, remova-a desta lista.
      filter: (page) =>
        !/\/(buscar|auxilio-gas|cadunico|financas|tarifa-social|noticias|renda-extra|inss)\/?$/.test(page),
    }),
  ],
  markdown: {
    // Sem syntax highlight pesado: conteúdo é texto, não código.
    syntaxHighlight: false,
    smartypants: true,
  },
});
