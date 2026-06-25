# CLAUDE.md — Benefício Claro

Guia operacional para desenvolvimento deste projeto. Leia antes de mexer no código ou criar conteúdo. Documentos complementares: [README.md](README.md) (como rodar/deploy) e [CONTENT_GUIDE.md](CONTENT_GUIDE.md) (como escrever artigos).

## O que é o projeto

Site de conteúdo brasileiro sobre **benefícios sociais** (pilar de entrada: Bolsa Família / CadÚnico) e **finanças do dia a dia**. Monetização por **Google AdSense**, tráfego **100% orgânico** do Google, público **mobile e de baixa renda**, tema **YMYL** (saúde/dinheiro). Domínio: `beneficioclaro.com.br`. Deploy: **Vercel** (Astro estático, detectado automaticamente).

Prioridades, nesta ordem: **(1) qualidade/credibilidade do conteúdo → (2) SEO/AEO → (3) performance → (4) acessibilidade**.

## Stack e decisões de arquitetura (não quebrar sem motivo)

- **Astro 4, estático** (`output: "static"`). HTML server-rendered no build → ótimo para Core Web Vitals e crawl.
- **TailwindCSS v3** com **design tokens** em `tailwind.config.mjs` (e como CSS vars em `src/styles/global.css`). Os tokens vieram do design de referência — **não trocar paleta/tipografia/escala por conta própria**.
- **Content Collections** (`src/content/artigos/**`, `.md`/`.mdx`) — cada artigo é um arquivo com frontmatter. Schema em `src/content/config.ts`.
- **`@astrojs/sitemap` fixado em `3.2.1` exato (sem caret).** A 3.7.x usa o hook `astro:routes:resolved`, que só existe no Astro 5, e **quebra o build no Astro 4**. Não soltar o pin sem migrar para Astro 5.
- **Fontes auto-hospedadas** em `public/fonts` (WOFF2, subsets latin+latin-ext), declaradas em `src/styles/fonts.css`. Sem CDN do Google. Regenerar com `node scripts/fetch-fonts.mjs`.
- **Sem banco de dados / sem backend** por decisão de projeto. Nada de dados do usuário é salvo (o simulador/checklist rodam no aparelho — promessa de privacidade da home e da Política). Se um dia precisar: formulário → serviço (Formspree/Vercel); progresso → `localStorage`; busca em escala → Pagefind; calendário automático → fetch no build. DB só para área logada/admin (fora do escopo atual).
- Interatividade só onde precisa (ferramentas + menu mobile), com JS progressivo. Acordeões (FAQ/índice) usam `<details>` nativo, sem JS.

## Fidelidade ao design (regra forte)

O design visual é a **fonte da verdade** e vive no Claude Design (projeto `TesteSite`, id `e17b1fab-d0e9-4aea-9bbb-f29587ca2c4c`, acessível via MCP DesignSync). Implementar fielmente, não recriar. Tokens, layouts e componentes seguem o design. **Divergência conhecida e proposital:** a marca foi renomeada de "Descomplica Renda" (nome interno do design) para **"Benefício Claro"** — só o nome/domínio/wordmark; todos os tokens visuais foram mantidos. Marca e configs ficam em `src/config/site.ts`.

## AdSense (regras críticas)

- **Configuração em UM lugar:** `src/config/site.ts`, objeto `ADSENSE` (`ativo`, `publisherId`, `slots`, `previewPlaceholders`).
- **Enquanto não aprovado, NENHUM espaço de anúncio aparece** (`ativo: false` → o componente `SlotAnuncio`/`AdSlot` não renderiza nada, nem placeholder). Páginas com blocos de anúncio vazios são **reprovadas** na análise do Google. Só ligar (`ativo: true` + `publisherId` real) **depois da aprovação**.
- `previewPlaceholders: true` só para trabalho de design (mostra o placeholder rotulado). Manter `false` em produção e durante a análise.
- Posições previstas (ativadas só após aprovação): após a introdução, meio do artigo, final do artigo e lateral (desktop). Toda unidade carrega o rótulo "Publicidade".

## Padrão de conteúdo (para aprovar no AdSense e ranquear)

O AdSense reprova **"conteúdo de baixo valor"**. Todo artigo precisa, sem exceção (detalhes em [CONTENT_GUIDE.md](CONTENT_GUIDE.md)):

1. **Original** — escrito do zero, com palavras próprias. Nunca copiar/colar de outros sites nem do gov.br (parafrasear e acrescentar). Conteúdo duplicado reprova.
2. **Profundo e completo** — resolver a dúvida de fato, do início ao fim. Em geral **800+ palavras** de conteúdo real (regras, valores, exemplos, exceções, próximos passos), não enchimento.
3. **Verificado em fonte oficial — e, quando possível, em mais de uma fonte confiável.** Todo número/prazo/regra é conferido em gov.br/MDS, Caixa ou lei **antes de publicar**. Preencher `fontesOficiais[]` (oficiais) **e** `referencias[]` (imprensa séria/institutos que confirmam). **Dado sem fonte não entra.**
4. **Answer-first (AEO)** — a `respostaRapida` (2–3 frases, 40–60 palavras) responde a dúvida logo após o H1.
5. **Exato (YMYL)** — informação errada prejudica quem lê. Na dúvida, não afirmar: explicar a regra e mandar ao canal oficial.
6. **E-E-A-T** — autor real (`autor`), "Atualizado em [data]" visível, revisão trimestral (atualizar `dataAtualizacao`), fontes citadas.
7. **Sem tom de golpe** — nada de "garanta", "saque liberado", "dinheiro extra". Ser honesto sobre prazos e o que não depende da pessoa.
8. **Volume** — manter um conjunto de artigos substanciais + as páginas institucionais (Sobre/Contato/Privacidade já existem) antes de pedir revisão do AdSense.

Temas que aprovam e atraem tráfego: "quem tem direito", "qual o valor / quanto vou receber", "como me inscrever no CadÚnico", "calendário / quando cai", "como consultar se fui aprovado", "regra de proteção", "benefício bloqueado/cancelado, o que fazer", "como atualizar o cadastro".

## Como adicionar um artigo

Arquivo em `src/content/artigos/<categoria>/<slug>.md` (ou `.mdx` para usar `<Alert>` inline). URL final: `/<categoria>/<slug>`. `<categoria>` deve existir em `src/config/categorias.ts`. Frontmatter (schema em `src/content/config.ts`):

```yaml
---
title: "..."                 # vira H1 e base do <title>; use a dúvida real
slug: "..."                  # = nome do arquivo (campo reservado do Astro)
categoria: "bolsa-familia"
description: "120–160 caracteres"
respostaRapida: "2–3 frases, resposta direta (answer-first)"
dataPublicacao: 2026-06-25
dataAtualizacao: 2026-06-25
autor: "ana_ribeiro"         # id em src/config/autores.ts
revisado: true
subtopico: "quem-tem-direito" # chave do subtópico do pilar (opcional)
tags: ["..."]
fontesOficiais: [{ label, href }]   # gov.br/Caixa/MDS/leis
referencias:    [{ label, href }]   # imprensa séria/institutos que confirmam
howTo: { name, steps: [{ name, text }] }   # opcional → schema HowTo
faq:  [{ pergunta, resposta }]             # → schema FAQPage
relacionados: ["outro-slug-da-categoria"]  # vazio = automático
---
```

Gerado automaticamente: `<title>`, meta description, canonical, OG/Twitter, breadcrumb, índice (dos H2/H3), caixa de resposta rápida, FAQ em acordeão, fontes + referências, relacionados e JSON-LD (`Article` + `FAQPage` + `HowTo` + `BreadcrumbList` + `WebSite` + `Organization`). O schema deve sempre refletir o conteúdo visível.

## Dados das ferramentas (editáveis, client-side)

- Calendário de pagamento por NIS: `src/data/calendario.ts` — **atualizar mensalmente** (mês, período, `atualizadoEm`, datas; conferir na fonte oficial).
- Regras do simulador (perguntas + condições declarativas): `src/data/simulador.ts`.
- Checklist de documentos: `src/data/checklist.ts`.

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ (sempre rodar antes de considerar uma mudança pronta)
npm run preview
```

## Antes de considerar uma mudança pronta

- `npm run build` passa sem erro.
- Um único `<h1>` por página; hierarquia H2>H3.
- Fatos novos conferidos em fonte oficial e citados (`fontesOficiais[]`/`referencias[]`).
- Nenhum espaço de anúncio visível enquanto `ADSENSE.ativo` for false.
- Imagens com `width`/`height` + `loading="lazy"`; nada que cause layout shift.
