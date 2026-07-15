import type { APIRoute } from "astro";
import { SITE } from "@config/site";

/**
 * robots.txt gerado no build. Libera todo o conteúdo (tráfego 100% orgânico),
 * permite explicitamente os principais crawlers de IA — queremos ser citados
 * por assistentes/answer engines (AEO) — e aponta para o sitemap e o llms.txt.
 */
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Google-Extended",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Applebot-Extended",
  "CCBot",
  "Amazonbot",
  "Bytespider",
];

export const GET: APIRoute = () => {
  const aiRules = AI_BOTS.map((b) => `User-agent: ${b}\nAllow: /`).join("\n\n");
  const body = `# Benefício Claro — robots.txt
User-agent: *
Allow: /

# Crawlers de IA — permitidos (queremos ser citados por assistentes)
${aiRules}

Sitemap: ${SITE.url}/sitemap-index.xml
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
