/**
 * Gera capas on-brand (1200×675) para os artigos, renderizando um template SVG
 * para PNG com as fontes da marca (resvg). Rode na raiz: `node scripts/gen-covers.mjs`.
 *
 * Edite o array ARTIGOS para adicionar/alterar capas. As imagens vão para
 * src/assets/covers/<slug>.png e são referenciadas no frontmatter (campo `capa`).
 */
import { Resvg } from "@resvg/resvg-js";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = "src/assets/covers";
const FONTS = [
  "public/fonts/libre-franklin-800-latin.woff2",
  "public/fonts/libre-franklin-800-latin-ext.woff2",
  "public/fonts/libre-franklin-700-latin.woff2",
  "public/fonts/public-sans-700-latin.woff2",
];

// Ícones (mesma geometria do design, traço 2px) usados como marca-d'água.
const ICONS = {
  user: '<circle cx="12" cy="8" r="4"/><path d="M5 21c0-4 3-6 7-6s7 2 7 6"/>',
  wallet:
    '<path d="M3 7a2 2 0 012-2h12v4M3 7v10a2 2 0 002 2h14a2 2 0 002-2v-7H6a2 2 0 01-2-2z"/><path d="M17 13h.01"/>',
  "file-text":
    '<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  calendar: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/>',
  "check-square": '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 12l3 3 5-6"/>',
  "alert-triangle": '<path d="M12 4l9 16H3l9-16z"/><path d="M12 10v4M12 17h.01"/>',
};

const ARTIGOS = [
  { slug: "quem-tem-direito-bolsa-familia", titulo: "Quem tem direito ao Bolsa Família?", icon: "user" },
  { slug: "valor-do-bolsa-familia-2026", titulo: "Qual o valor do Bolsa Família em 2026?", icon: "wallet" },
  { slug: "como-se-inscrever-cadastro-unico", titulo: "Como se inscrever pelo CadÚnico", icon: "file-text" },
  { slug: "calendario-pagamento-bolsa-familia-2026", titulo: "Quando cai o Bolsa Família?", icon: "calendar" },
  { slug: "atualizar-cadastro-unico", titulo: "Como atualizar o CadÚnico", icon: "check-square" },
  { slug: "bolsa-familia-bloqueado-suspenso-cancelado", titulo: "Bolsa Família bloqueado: o que fazer", icon: "alert-triangle" },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Quebra o título em linhas de até ~maxChars caracteres.
function wrap(text, maxChars = 24) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars) {
      if (cur) lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur.trim());
  return lines;
}

function svgFor({ titulo, icon }) {
  const lines = wrap(titulo);
  const lh = 80;
  const startY = 430 - ((lines.length - 1) * lh) / 2;
  const tspans = lines
    .map((l, i) => `<tspan x="64" y="${startY + i * lh}">${esc(l)}</tspan>`)
    .join("");

  return `<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0A5446"/>
      <stop offset="1" stop-color="#052A24"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <g transform="translate(815,150) scale(18)" fill="none" stroke="#FFFFFF" stroke-width="0.13" stroke-linecap="round" stroke-linejoin="round" opacity="0.10">${ICONS[icon] || ""}</g>
  <svg x="64" y="56" width="56" height="56" viewBox="0 0 56 56">
    <rect width="56" height="56" rx="16" fill="#FFFFFF"/>
    <circle cx="28" cy="28" r="15" stroke="#9FDAC6" stroke-width="2.5"/>
    <path d="M19 31.5L25.5 24.5L30.5 29L37.5 20.5" stroke="#0D6B57" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M37.5 26V20.5H32" stroke="#E5731F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <text x="132" y="92" font-family="Libre Franklin" font-weight="800" font-size="27" letter-spacing="0.5" fill="#FFFFFF">BENEFÍCIO CLARO</text>
  <text x="64" y="320" font-family="Public Sans" font-weight="700" font-size="26" letter-spacing="2" fill="#9FDAC6">BOLSA FAMÍLIA</text>
  <text font-family="Libre Franklin" font-weight="800" font-size="62" fill="#FFFFFF">${tspans}</text>
  <rect x="64" y="600" width="120" height="8" rx="4" fill="#E5731F"/>
</svg>`;
}

mkdirSync(OUT, { recursive: true });
for (const a of ARTIGOS) {
  const resvg = new Resvg(svgFor(a), {
    fitTo: { mode: "width", value: 1200 },
    font: { loadSystemFonts: true, defaultFontFamily: "Public Sans", fontFiles: FONTS },
  });
  const png = resvg.render().asPng();
  writeFileSync(`${OUT}/${a.slug}.png`, png);
  console.log(`capa ${a.slug}.png — ${(png.length / 1024).toFixed(1)} KB`);
}
console.log(`\n${ARTIGOS.length} capas geradas em ${OUT}`);
