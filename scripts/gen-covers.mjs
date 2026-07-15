/**
 * Gera capas on-brand (1200×675) DIVERSIFICADAS para os artigos, renderizando
 * um template SVG para PNG com as fontes da marca (resvg).
 *
 * Cada artigo recebe uma de 6 VARIANTES visuais (gradientes e composições
 * diferentes — marca-d'água, ícone em badge, círculos, painel lateral),
 * escolhida de forma determinística pelo slug. Assim as capas não ficam todas
 * iguais, mas seguem a identidade (verde/laranja + logo + tipografia).
 *
 * Dois modos:
 *  - Uma capa só (usado pela rotina diária):
 *      node scripts/gen-covers.mjs <slug> "<título>" <icon> "<EYEBROW>"
 *  - Todas as capas do array ARTIGOS (regenera o lote):
 *      node scripts/gen-covers.mjs
 *
 * Saída: src/assets/covers/<slug>.png (referenciar no frontmatter em `capa`).
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

// Ícones (mesma geometria do design, traço 2px).
const ICONS = {
  user: '<circle cx="12" cy="8" r="4"/><path d="M5 21c0-4 3-6 7-6s7 2 7 6"/>',
  wallet:
    '<path d="M3 7a2 2 0 012-2h12v4M3 7v10a2 2 0 002 2h14a2 2 0 002-2v-7H6a2 2 0 01-2-2z"/><path d="M17 13h.01"/>',
  "file-text":
    '<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  calendar: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/>',
  "check-square": '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 12l3 3 5-6"/>',
  "alert-triangle": '<path d="M12 4l9 16H3l9-16z"/><path d="M12 10v4M12 17h.01"/>',
  "hand-coins":
    '<ellipse cx="9" cy="6.5" rx="6" ry="3"/><path d="M3 6.5v4c0 1.7 2.7 3 6 3"/><circle cx="16.5" cy="15" r="5.5"/><path d="M16.5 13v4M15 14.5h2"/>',
  flame:
    '<path d="M12 3c1 3-2 4-2 7a4 4 0 008 0c0-2-1-3-1-3 .5 4-2 5-2 5 .5-3-1.5-4-1-6-2 1-2 3-2 4a5 5 0 0010 0c0-5-5-7-8-11z"/>',
  droplet: '<path d="M12 3c4 5 7 8 7 12a7 7 0 01-14 0c0-4 3-7 7-12z"/>',
  "graduation-cap":
    '<path d="M3 9l9-4 9 4-9 4-9-4z"/><path d="M7 11v5c0 1 2 2.5 5 2.5s5-1.5 5-2.5v-5M21 9v5"/>',
  calculator:
    '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  "trending-up": '<path d="M3 16l5-5 4 4 8-8"/><path d="M21 7v5h-5"/>',
  "piggy-bank":
    '<path d="M4 11a6 6 0 016-6h2a6 6 0 016 6v1l2 1v3l-2 .5A6 6 0 0114 19v2h-2v-1.5A6 6 0 014 14z"/><path d="M9 9h3M6 13h.01"/>',
  "credit-card": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
};

// 6 variantes: tema (cores) + deco (composição). Diversas, mas on-brand.
const VARIANTS = [
  { bg: ["#0A5446", "#052A24"], eyebrow: "#9FDAC6", accent: "#E5731F", deco: "watermark" },
  { bg: ["#128068", "#0A5446"], eyebrow: "#CCECE0", accent: "#E5731F", deco: "badge" },
  { bg: ["#B44C0A", "#7A3208"], eyebrow: "#FADDC9", accent: "#9FDAC6", deco: "watermark" },
  { bg: ["#2BA07E", "#0A5446"], eyebrow: "#E9F6F0", accent: "#E5731F", deco: "circles" },
  { bg: ["#073E34", "#141611"], eyebrow: "#9FDAC6", accent: "#E5731F", deco: "panel", panel: "#0D6B57" },
  { bg: ["#1D5FA8", "#123B60"], eyebrow: "#DCEAF8", accent: "#E5731F", deco: "circles" },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Hash simples e determinístico do slug → índice de variante.
function variantIndex(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h % VARIANTS.length;
}

// Desenha um ícone centrado em (cx,cy) com tamanho `size`, mantendo o traço.
function iconAt(name, cx, cy, size, color, opacity = 1, visualStroke = 3) {
  const scale = size / 24;
  const x = cx - size / 2;
  const y = cy - size / 2;
  const sw = ((visualStroke / size) * 24).toFixed(2);
  return `<g transform="translate(${x},${y}) scale(${scale})" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}">${ICONS[name] || ICONS["file-text"]}</g>`;
}

function wrap(text, maxChars = 24) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars) {
      if (cur) lines.push(cur.trim());
      cur = w;
    } else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur.trim());
  return lines;
}

function deco(v, icon) {
  const bar = `<rect x="64" y="600" width="120" height="8" rx="4" fill="${v.accent}"/>`;
  switch (v.deco) {
    case "badge":
      return `
        <rect x="978" y="60" width="158" height="158" rx="30" fill="${v.accent}"/>
        ${iconAt(icon, 1057, 139, 88, "#FFFFFF", 1, 3)}
        ${bar}`;
    case "circles":
      return `
        <circle cx="985" cy="360" r="172" fill="none" stroke="${v.eyebrow}" stroke-width="3" opacity="0.35"/>
        <circle cx="985" cy="360" r="108" fill="none" stroke="${v.eyebrow}" stroke-width="3" opacity="0.25"/>
        ${iconAt(icon, 985, 360, 120, "#FFFFFF", 0.92, 3)}
        ${bar}`;
    case "panel":
      return `
        <rect x="912" y="0" width="288" height="675" fill="${v.panel || v.accent}" opacity="0.9"/>
        ${iconAt(icon, 1056, 337, 150, "#FFFFFF", 0.95, 3)}
        ${bar}`;
    case "watermark":
    default:
      return `
        ${iconAt(icon, 980, 300, 380, "#FFFFFF", 0.1, 2.2)}
        ${bar}`;
  }
}

function svgFor({ slug, titulo, icon, eyebrow = "BOLSA FAMÍLIA", variant }) {
  const v = VARIANTS[variant ?? variantIndex(slug)];
  const lines = wrap(titulo);
  const lh = 80;
  const startY = 430 - ((lines.length - 1) * lh) / 2;
  const tspans = lines.map((l, i) => `<tspan x="64" y="${startY + i * lh}">${esc(l)}</tspan>`).join("");

  return `<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="${v.bg[0]}"/>
      <stop offset="1" stop-color="${v.bg[1]}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  ${deco(v, icon)}
  <svg x="64" y="56" width="56" height="56" viewBox="0 0 56 56">
    <rect width="56" height="56" rx="16" fill="#FFFFFF"/>
    <circle cx="28" cy="28" r="15" stroke="#9FDAC6" stroke-width="2.5"/>
    <path d="M19 31.5L25.5 24.5L30.5 29L37.5 20.5" stroke="#0D6B57" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M37.5 26V20.5H32" stroke="#E5731F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <text x="132" y="92" font-family="Libre Franklin" font-weight="800" font-size="27" letter-spacing="0.5" fill="#FFFFFF">BENEFÍCIO CLARO</text>
  <text x="64" y="320" font-family="Public Sans" font-weight="700" font-size="26" letter-spacing="2" fill="${v.eyebrow}">${esc(eyebrow)}</text>
  <text font-family="Libre Franklin" font-weight="800" font-size="62" fill="#FFFFFF">${tspans}</text>
</svg>`;
}

function gerar(a) {
  const idx = a.variant ?? variantIndex(a.slug);
  const resvg = new Resvg(svgFor(a), {
    fitTo: { mode: "width", value: 1200 },
    font: { loadSystemFonts: true, defaultFontFamily: "Public Sans", fontFiles: FONTS },
  });
  const png = resvg.render().asPng();
  writeFileSync(`${OUT}/${a.slug}.png`, png);
  console.log(`capa ${a.slug}.png (variante ${idx}) — ${(png.length / 1024).toFixed(1)} KB`);
}

// Lote padrão (regenera todas quando roda sem argumentos).
const ARTIGOS = [
  { slug: "quem-tem-direito-bolsa-familia", titulo: "Quem tem direito ao Bolsa Família?", icon: "user", eyebrow: "BOLSA FAMÍLIA" },
  { slug: "valor-do-bolsa-familia-2026", titulo: "Qual o valor do Bolsa Família em 2026?", icon: "wallet", eyebrow: "BOLSA FAMÍLIA" },
  { slug: "como-se-inscrever-cadastro-unico", titulo: "Como se inscrever pelo CadÚnico", icon: "file-text", eyebrow: "BOLSA FAMÍLIA" },
  { slug: "calendario-pagamento-bolsa-familia-2026", titulo: "Quando cai o Bolsa Família?", icon: "calendar", eyebrow: "BOLSA FAMÍLIA" },
  { slug: "atualizar-cadastro-unico", titulo: "Como atualizar o CadÚnico", icon: "check-square", eyebrow: "BOLSA FAMÍLIA" },
  { slug: "bolsa-familia-bloqueado-suspenso-cancelado", titulo: "Bolsa Família bloqueado: o que fazer", icon: "alert-triangle", eyebrow: "BOLSA FAMÍLIA" },
  { slug: "consultar-bolsa-familia-pelo-cpf", titulo: "Como consultar o Bolsa Família pelo CPF?", icon: "user", eyebrow: "BOLSA FAMÍLIA" },
];

mkdirSync(OUT, { recursive: true });

const [, , slug, titulo, icon = "file-text", eyebrow = "BOLSA FAMÍLIA"] = process.argv;
if (slug && titulo) {
  gerar({ slug, titulo, icon, eyebrow });
  console.log('\nReferencie no frontmatter: capa: "../../../assets/covers/' + slug + '.png"');
} else {
  // Lote: rodízio por índice garante espalhamento máximo das variantes.
  ARTIGOS.forEach((a, i) => gerar({ ...a, variant: i % VARIANTS.length }));
  console.log(`\n${ARTIGOS.length} capas geradas em ${OUT}`);
}
