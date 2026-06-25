/**
 * Regenera as fontes auto-hospedadas (WOFF2, subsets latin + latin-ext) a
 * partir do Google Fonts e gera src/styles/fonts.css com os @font-face locais.
 *
 * Uso: `node scripts/fetch-fonts.mjs` (na raiz do projeto). Requer Node 18+.
 * Edite a constante CSS_URL para mudar famílias/pesos.
 */
import { writeFile, mkdir } from "node:fs/promises";

const OUT_DIR = "public/fonts";
const CSS_OUT = "src/styles/fonts.css";
const CSS_URL =
  "https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@600;700;800&family=Public+Sans:wght@400;500;600;700&display=swap";
// UA de Chrome moderno → garante WOFF2.
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const WANTED = new Set(["latin", "latin-ext"]);

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const css = await fetch(CSS_URL, { headers: { "User-Agent": UA } }).then((r) => r.text());

const faces = [];
for (const b of css.split("/*").slice(1)) {
  const subset = b.slice(0, b.indexOf("*/")).trim();
  if (!WANTED.has(subset)) continue;
  const fam = /font-family:\s*'([^']+)'/.exec(b)?.[1];
  const weight = /font-weight:\s*(\d+)/.exec(b)?.[1];
  const url = /src:\s*url\(([^)]+)\)/.exec(b)?.[1];
  const range = /unicode-range:\s*([^;]+);/.exec(b)?.[1]?.trim();
  if (fam && weight && url) faces.push({ fam, weight, url, range, subset });
}

await mkdir(OUT_DIR, { recursive: true });

const rules = [];
for (const f of faces) {
  const file = `${slug(f.fam)}-${f.weight}-${f.subset}.woff2`;
  const buf = Buffer.from(await fetch(f.url, { headers: { "User-Agent": UA } }).then((r) => r.arrayBuffer()));
  await writeFile(`${OUT_DIR}/${file}`, buf);
  rules.push(
    `@font-face {\n  font-family: "${f.fam}";\n  font-style: normal;\n  font-weight: ${f.weight};\n  font-display: swap;\n  src: url("/fonts/${file}") format("woff2");\n  unicode-range: ${f.range};\n}`
  );
  console.log(`baixado ${file} (${(buf.length / 1024).toFixed(1)} KB)`);
}

const header = `/* ===========================================================================
   Benefício Claro — fontes auto-hospedadas (WOFF2, subsets latin + latin-ext)
   GERADO por scripts/fetch-fonts.mjs — não edite à mão. font-display: swap.
   =========================================================================== */\n\n`;
await writeFile(CSS_OUT, header + rules.join("\n\n") + "\n");
console.log(`\n${faces.length} @font-face gerados em ${CSS_OUT}`);
