# Benefício Claro

Site de conteúdo brasileiro sobre **benefícios sociais** (pilar de entrada: Bolsa Família / CadÚnico) e **finanças do dia a dia**. Foco 100% em tráfego orgânico do Google, monetizado por Google AdSense, com público predominantemente mobile e de baixa renda. Tema YMYL (saúde/dinheiro), construído para **performance**, **SEO** e **AEO** (otimização para respostas/IA).

> **Site independente.** Não é um site oficial do governo. Não temos vínculo com o Governo Federal, a Caixa ou o gov.br.

## Stack

- **[Astro](https://astro.build)** (estático, HTML server-rendered) — ótimo para Core Web Vitals e crawl.
- **TailwindCSS** com os **design tokens** extraídos do design de referência (ver `tailwind.config.mjs` e `src/styles/global.css`).
- **Content Collections** (Markdown/MDX) — cada artigo é um arquivo com frontmatter.
- **@astrojs/sitemap** — `sitemap-index.xml` no build. `robots.txt` gerado em `src/pages/robots.txt.ts`.
- **Deploy estático** (Cloudflare Pages ou Netlify).

## Rodando o projeto

```bash
npm install
npm run dev      # ambiente de desenvolvimento (http://localhost:4321)
npm run build    # build de produção em dist/
npm run preview  # serve o build localmente
```

Requer Node 18+.

## Estrutura

```
src/
├─ config/
│  ├─ site.ts          # marca, URL, e-mail E AdSense (publisher id / ligar-desligar) — edite AQUI
│  ├─ autores.ts       # autores (E-E-A-T): nome, bio, foto, vínculo com a Sobre
│  └─ categorias.ts    # pilares + subtópicos (estrutura pilar + satélites)
├─ data/               # dados editáveis das ferramentas
│  ├─ calendario.ts    # calendário de pagamento por NIS (atualizar mensalmente)
│  ├─ simulador.ts     # perguntas e regras de elegibilidade (declarativas)
│  └─ checklist.ts     # documentos por benefício
├─ content/
│  ├─ config.ts        # schema (zod) do frontmatter dos artigos
│  └─ artigos/<categoria>/<slug>.(md|mdx)
├─ components/         # componentes fiéis ao design (core, content, feedback, SEO, header/footer)
├─ layouts/BaseLayout.astro
├─ lib/                # utils (datas, tempo de leitura), seo (JSON-LD), icons
├─ pages/
│  ├─ index.astro                 # Home
│  ├─ [categoria]/index.astro      # página-pilar / listagem de categoria
│  ├─ [categoria]/[slug].astro     # template de artigo (o mais importante)
│  ├─ ferramentas/                 # hub + simulador + calendário + checklist
│  ├─ sobre.astro · contato.astro · politica-de-privacidade.astro
│  ├─ buscar.astro                 # busca on-site (client-side)
│  └─ robots.txt.ts
└─ styles/global.css   # tokens (CSS vars), reset/base e prosa do artigo
```

## Como adicionar um novo artigo

1. Crie um arquivo em `src/content/artigos/<categoria>/<slug>.md` (ou `.mdx`).
   - A URL final será `/<categoria>/<slug>` (ex.: `/bolsa-familia/como-atualizar-cadastro-unico`).
   - `<categoria>` deve existir em `src/config/categorias.ts`.
2. Preencha o **frontmatter** (validado por `src/content/config.ts`):

```yaml
---
title: "Como atualizar o CadÚnico sem sair de casa"
slug: "como-atualizar-cadastro-unico"      # deve bater com o nome do arquivo
categoria: "bolsa-familia"
description: "Meta description de 120–160 caracteres."
respostaRapida: "2–3 frases que respondem a dúvida principal (aparece em destaque após o H1)."
dataPublicacao: 2026-06-20
dataAtualizacao: 2026-06-20
autor: "ana_ribeiro"                        # id em src/config/autores.ts
revisado: true
subtopico: "inscricao"                       # chave do subtópico do pilar (opcional)
tags: ["cadúnico", "atualização"]
fontesOficiais:
  - label: "CadÚnico (gov.br)"
    href: "https://www.gov.br/mds/..."
howTo:                                       # opcional — gera schema HowTo
  name: "Como atualizar o CadÚnico"
  steps:
    - { name: "Passo 1", text: "..." }
faq:
  - { pergunta: "...?", resposta: "..." }
relacionados: ["quem-tem-direito-bolsa-familia"]  # slugs da mesma categoria (vazio = automático)
---
```

3. Escreva o corpo em Markdown usando `## ` e `### ` (o **índice** e o schema `Article` são gerados automaticamente; o tempo de leitura é calculado).
4. Para **callouts** (caixas de aviso) dentro do texto, use `.mdx` e o componente `Alert`:

```mdx
import Alert from "@components/feedback/Alert.astro";

<Alert tone="warning" title="Cuidado com golpes">
  Você nunca paga para se inscrever.
</Alert>
```

> Siga o **[CONTENT_GUIDE.md](./CONTENT_GUIDE.md)** para o tom e a qualidade da escrita.

O que é gerado automaticamente a partir do frontmatter/corpo: `<title>`, meta description, canonical, Open Graph, Twitter Card, breadcrumb, índice (H2/H3), caixa de resposta rápida, FAQ em acordeão, bloco de fontes, relacionados e o JSON-LD (`Article` + `FAQPage` + `HowTo` + `BreadcrumbList`).

## Como atualizar os dados das ferramentas

- **Calendário de pagamento** — `src/data/calendario.ts`. Troque `mesReferencia`, `periodo`, `atualizadoEm` e o array `datas` (final do NIS → dia). Confira a fonte oficial da Caixa.
- **Simulador de elegibilidade** — `src/data/simulador.ts`. Edite `PERGUNTAS` (fluxo) e `BENEFICIOS` (regras declarativas: `{ chaveDaPergunta: [valores que satisfazem] }`). `FALLBACK` é o resultado quando nada casa.
- **Checklist de documentos** — `src/data/checklist.ts`. Adicione/edite entradas em `LISTAS` (label + array de documentos).

Tudo client-side: nada é enviado a servidores nem salvo.

## AdSense

Configurado em **um único lugar**: `src/config/site.ts` (objeto `ADSENSE`).

```ts
export const ADSENSE = {
  ativo: true,                                // liga os anúncios
  publisherId: "ca-pub-XXXXXXXXXXXXXXXX",      // seu Publisher ID
  slots: { "apos-introducao": "1234567890", /* ... */ },
};
```

- Enquanto `ativo: false`, o componente `SlotAnuncio` renderiza um **placeholder** rotulado "Publicidade" (sem carregar script externo) — ideal para desenvolvimento e antes da aprovação.
- As posições no artigo seguem o design: **após a introdução**, **meio do artigo**, **final do artigo** e **lateral** (desktop). Toda unidade carrega o rótulo "Publicidade" (exigência YMYL + política do AdSense).

## Deploy

Build estático (`npm run build` → `dist/`). Antes de publicar, ajuste `SITE.url` em `src/config/site.ts`.

- **Cloudflare Pages**: build command `npm run build`, output `dist`.
- **Netlify**: build command `npm run build`, publish `dist`. O formulário de contato pode usar [Netlify Forms](https://docs.netlify.com/forms/setup/) — hoje ele compõe um e-mail via `mailto:` (sem backend).

O `sitemap-index.xml` e o `robots.txt` são gerados no build a partir de `SITE.url`.

## Performance, acessibilidade e qualidade

- HTML semântico, **um único H1** por página, hierarquia H2 > H3 > H4.
- Imagens com `width`/`height` e `loading="lazy"`; anúncios com altura reservada (CLS ~0).
- Fonte base de 18px, alvos de toque ≥ 44px, foco visível, contraste WCAG AA, navegação por teclado.
- Acordeões (FAQ e índice) usam `<details>` nativo — acessível e **sem JavaScript**.
- JavaScript só nas ferramentas interativas e no menu mobile (progressivo).

### Fontes

As fontes (Libre Franklin + Public Sans) são **auto-hospedadas** em `public/fonts` como WOFF2 (subsets `latin` + `latin-ext`, `font-display: swap`), declaradas em `src/styles/fonts.css`. Não há requisição ao CDN do Google — melhor para o público em 3G. Os dois pesos mais usados (Public Sans 400 e Libre Franklin 800) recebem `<link rel="preload">` em `BaseHead.astro`. Para regenerar (após mudar pesos/famílias), rode `node scripts/fetch-fonts.mjs`.

## Divergências resolvidas entre design e requisitos técnicos

Listadas em detalhe ao final da entrega. Em resumo: a marca foi trocada de "Descomplica Renda" (nome interno do design) para **"Benefício Claro"** (nome do projeto), mantendo 100% dos tokens visuais; o anúncio do "meio do artigo" é posicionado por aprimoramento progressivo; acordeões viraram `<details>` nativo (sem JS); e a busca passou a ser on-site (`/buscar`).
