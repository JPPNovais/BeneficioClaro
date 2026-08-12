# CLAUDE.md — Benefício Claro

Guia operacional para desenvolvimento deste projeto. Leia antes de mexer no código ou criar conteúdo. Documentos complementares: [README.md](README.md) (como rodar/deploy) e [CONTENT_GUIDE.md](CONTENT_GUIDE.md) (como escrever artigos).

## O que é o projeto

Site brasileiro sobre **o dinheiro de quem trabalha**, com formato **tool-first**: o ativo principal são **calculadoras** (salário líquido, rescisão, férias, 13º, horas extras, FGTS), e o conteúdo existe para explicar a regra por trás de cada conta. Temas: salário e descontos (INSS/IRRF), rescisão e demissão, férias e 13º, **FGTS**, **INSS/aposentadoria**, **MEI e renda extra**, finanças do dia a dia (dívidas, Pix, orçamento). Monetização por **Google AdSense**, tráfego **100% orgânico**, público **mobile**, tema **YMYL** (dinheiro). Domínio: `beneficioclaro.com.br`. Deploy: **Vercel** (Astro estático, detectado automaticamente).

**Benefícios sociais** (Bolsa Família, CadÚnico, Auxílio Gás, Tarifa Social) são um **silo secundário**, com entrada em `/beneficios`. Continuam publicados e mantidos, nas **mesmas URLs de sempre** — não mover nem apagar, para não jogar fora a indexação já conquistada.

Prioridades, nesta ordem: **(1) qualidade/credibilidade do conteúdo → (2) SEO/AEO → (3) performance → (4) acessibilidade**.

### Por que tool-first (a tese do site)

O site é novo e o nicho é disputado por gov.br, grandes portais e blogs de banco. Artigo informativo genérico não vence essa SERP. Calculadora vence, por quatro motivos: a concorrência de "calculadora de rescisão" são páginas lentas e antigas; ferramenta gera engajamento real (a pessoa preenche, fica, volta) em vez de pogo-stick; ferramenta útil ganha link natural (fórum, grupo, blog de RH, sindicato), e link é o que falta a um site novo; e a intenção adjacente (crédito, financiamento) tem CPM muito acima de benefícios sociais.

O diferencial defensável não é ter a calculadora — é **mostrar a conta**. Toda ferramenta deve entregar: resultado primeiro, **memória de cálculo linha por linha**, **base legal por linha** (lei/portaria com link) e a **data de vigência** da tabela. Isso é o que ninguém faz, é o que sustenta E-E-A-T em YMYL e é o que faz assistentes de IA citarem o site.

**Arquitetura que já reflete isso:** `NAV_PRINCIPAL` começa pelas calculadoras; a home abre com as calculadoras e só depois traz conteúdo; a página-pilar `/trabalho` mostra as ferramentas do silo antes do índice; e `/metodologia` publica as fórmulas.

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
3. **Verificado em fonte oficial — e, quando possível, em mais de uma fonte confiável.** Todo número/prazo/regra é conferido na Receita Federal, Ministério do Trabalho, Previdência, Caixa, gov.br ou na lei **antes de publicar**. Preencher `fontesOficiais[]` (oficiais) **e** `referencias[]` (imprensa séria/institutos que confirmam). **Dado sem fonte não entra.**
4. **Answer-first (AEO)** — a `respostaRapida` (2–3 frases, 40–60 palavras) responde a dúvida logo após o H1.
5. **Exato (YMYL)** — informação errada prejudica quem lê. Na dúvida, não afirmar: explicar a regra e mandar ao canal oficial.
6. **E-E-A-T** — autor real (`autor`), "Atualizado em [data]" visível, revisão trimestral (atualizar `dataAtualizacao`), fontes citadas. **Nunca inventar autor nem credencial** (ver `src/config/autores.ts`).
7. **Sem tom de golpe** — nada de "garanta", "saque liberado", "dinheiro extra". Ser honesto sobre prazos e o que não depende da pessoa.
8. **Amarrado a uma ferramenta** — todo artigo do silo `trabalho` deve linkar a calculadora do tema (e a calculadora deve linkar o artigo). **Artigo órfão não entra**: se um tema não tem nem calculadora nem lugar no pilar, ele não está no plano.
9. **Volume** — manter um conjunto de artigos substanciais + as páginas institucionais (Sobre/Metodologia/Contato/Privacidade) antes de pedir revisão do AdSense.

Temas que aprovam e atraem tráfego, na ordem de prioridade atual:

1. **Salário e descontos** — "como calcular salário líquido", "tabela INSS/IRRF do ano", "quem é isento de IR", "como calcular horas extras", "adicional noturno", "DSR".
2. **Rescisão e demissão** — "como calcular a rescisão", "aviso prévio", "multa de 40%", "pedido de demissão x demissão sem justa causa", "acordo mútuo", "seguro-desemprego".
3. **Férias e 13º** — "cálculo das férias", "terço constitucional", "vender 10 dias de férias vale a pena", "as duas parcelas do 13º".
4. **FGTS e INSS** — "como consultar/sacar o FGTS", "saque-aniversário vale a pena", "como consultar o INSS", "aposentadoria por idade".
5. **MEI, dívidas e Pix** — "como abrir MEI", "DAS e limite de faturamento", "como limpar o nome", "custo do rotativo do cartão".
6. **Benefícios sociais** (silo secundário, manutenção) — "quem tem direito", "qual o valor", "calendário / quando cai", "benefício bloqueado".

**Frescor e não-duplicação:** além do evergreen, publicar **notícias/atualidades** datadas e verificáveis (novas tabelas, mudanças de regra, portarias, salário mínimo, calendário do mês) na categoria `noticias` ou na do tema. **Nunca repetir um tema já publicado** — atualizar o artigo existente (e a `dataAtualizacao`) em vez de criar um quase igual; conteúdo duplicado prejudica SEO e AdSense. Detalhes em [CONTENT_GUIDE.md](CONTENT_GUIDE.md).

## Padrão de ferramenta (o ativo do site)

Toda calculadora nova segue este contrato — é o que diferencia o site das calculadoras concorrentes:

1. **Resultado primeiro**, no topo, antes de qualquer explicação.
2. **Memória de cálculo aberta** em seguida: cada linha com rótulo, valor e como saiu (base, alíquota, parcela a deduzir).
3. **Base legal por linha** — lei/portaria com link, não uma citação genérica no fim da página.
4. **Selo de vigência** — "Tabelas de <ano> · conferido em <data>", vindo do `atualizadoEm` do arquivo de dados.
5. **Limites declarados** — o que a conta *não* considera, dito de forma explícita (é o que evita reclamação e sustenta a honestidade YMYL).
6. **Link para `/metodologia`** e para o artigo que explica a regra.
7. **Tabelas em `src/data/*.ts`**, nunca hardcoded na página — `/metodologia` renderiza a partir dos mesmos objetos, então a metodologia publicada não pode divergir do código.
8. **100% client-side**, sem envio de dados (é uma promessa pública em `/metodologia`, `/sobre` e na Política).
9. Registrar em `src/config/ferramentas.ts` com o `grupo` correto — a entrada aparece sozinha na home, no hub e no pilar. **Não cadastrar antes da página existir** (link morto reprova no AdSense).

## SEO/AEO (gerado automaticamente — não duplicar à mão)

Cada página recebe: `<title>` (encurta o sufixo da marca se passar de 60 chars), meta description, canonical, Open Graph/Twitter e JSON-LD (`WebSite` + `Organization` + `WebPage` em todas; `Article`+`FAQPage`+`HowTo`+`BreadcrumbList` nos artigos; `WebApplication` nas ferramentas; `ItemList` no hub; `FAQPage` na home). Gerados no build: `sitemap-index.xml` (exclui `noindex` via filtro no `astro.config.mjs`), `robots.txt` (libera crawlers de IA), `llms.txt` (índice p/ IA) e `rss.xml`. Fontes: `src/lib/seo.ts` (builders), `src/components/seo/*`, `src/pages/{robots.txt,llms.txt,rss.xml}.ts`. Checklist de AEO por artigo em [CONTENT_GUIDE.md](CONTENT_GUIDE.md).

## Como adicionar um artigo

Arquivo em `src/content/artigos/<categoria>/<slug>.md` (ou `.mdx` para usar `<Alert>` inline). URL final: `/<categoria>/<slug>`. `<categoria>` deve existir em `src/config/categorias.ts`. Frontmatter (schema em `src/content/config.ts`):

```yaml
---
title: "..."                 # vira H1 e base do <title>; use a dúvida real
slug: "..."                  # = nome do arquivo (campo reservado do Astro)
categoria: "trabalho"        # slug em src/config/categorias.ts
description: "120–160 caracteres"
respostaRapida: "2–3 frases, resposta direta (answer-first)"
dataPublicacao: 2026-06-25
dataAtualizacao: 2026-06-25
autor: "redacao"             # id em src/config/autores.ts (nunca inventar autor)
revisado: true
subtopico: "rescisao"        # chave do subtópico do pilar (opcional)
tags: ["..."]
fontesOficiais: [{ label, href }]   # gov.br/Caixa/MDS/leis
referencias:    [{ label, href }]   # imprensa séria/institutos que confirmam
howTo: { name, steps: [{ name, text }] }   # opcional → schema HowTo
faq:  [{ pergunta, resposta }]             # → schema FAQPage
relacionados: ["outro-slug-da-categoria"]  # vazio = automático
capa: "../../../assets/covers/<slug>.png"  # opcional: imagem em src/, otimizada
capaAlt: "descrição da capa"               # alt da capa (acessibilidade)
---
```

Gerado automaticamente: `<title>`, meta description, canonical, OG/Twitter, breadcrumb, índice (dos H2/H3), caixa de resposta rápida, FAQ em acordeão, fontes + referências, relacionados e JSON-LD (`Article` + `FAQPage` + `HowTo` + `BreadcrumbList` + `WebSite` + `Organization`). O schema deve sempre refletir o conteúdo visível.

### Imagens

- **Capa (opcional):** campo `capa` aponta para uma imagem em `src/` (caminho relativo ao arquivo). É otimizada no build pelo `<Image>` do Astro (WebP/AVIF, `width`/`height` → CLS 0, lazy-load) e vira a imagem de OG/Twitter da página. Sem capa, o artigo fica text-first (mais leve, ideal p/ 3G).
- **Capas on-brand templatizadas:** `node scripts/gen-covers.mjs` gera capas 1200×675 (verde + título + ícone) em `src/assets/covers/`. Edite o array `ARTIGOS` do script para adicionar novas.
- **Imagens no corpo:** use `<Image>` (em `.mdx`) ou pré-otimize antes de usar `![]()`. Sempre com `width`/`height` e `loading="lazy"`. Use imagem só quando agrega (ex.: print do Caixa Tem) — público em 3G.
- **Cards de artigo são text-first** (sem thumbnail), fiel ao design. Capas aparecem na página do artigo e no compartilhamento (OG/Discover).

## Dados das ferramentas (editáveis, client-side)

Todo arquivo aqui carrega `atualizadoEm` e, quando aplicável, `fontes[]`. **Ao mexer em qualquer tabela, atualize `atualizadoEm` no mesmo commit** — a data é exibida no site (`/metodologia` e a própria ferramenta) como promessa de vigência.

- Tabelas de INSS e IRRF (salário líquido): `src/data/salario.ts` — **conferir na virada do ano** e a cada portaria. `/metodologia` renderiza estas faixas.
- Faixas do saque-aniversário do FGTS: `src/data/fgts.ts`.
- Calendário de pagamento por NIS: `src/data/calendario.ts` — **atualizar mensalmente** (mês, período, `atualizadoEm`, datas; conferir na fonte oficial). Dado vencido aqui é pior que ausência de dado.
- Regras do simulador (perguntas + condições declarativas): `src/data/simulador.ts`.
- Checklist de documentos: `src/data/checklist.ts`.

## Estrutura de silos e URLs (não quebrar)

- `src/config/categorias.ts` — cada categoria tem `grupo`: `"trabalho"` (foco), `"beneficios"` (secundário) ou `"geral"`. O `grupo` decide onde a categoria aparece na navegação, na home e no hub; **não decide a URL**.
- Pilar `/trabalho` (`pilar: true`): mostra as ferramentas do silo, os subtópicos e — via `irmas` — os artigos de `fgts`, `inss`, `financas` e `renda-extra`. Isso mantém a linkagem interna do silo amarrada.
- Pilar `/bolsa-familia` segue existindo igual, com `irmas` apontando para as outras categorias de benefício.
- Hubs estáticos: `/ferramentas` (calculadoras, por grupo), `/beneficios` (silo secundário), `/metodologia` (fórmulas e vigência).
- **Nunca renomear o slug de uma categoria com artigos publicados.** Isso muda a URL de todos eles e descarta a indexação. Se um dia for inevitável, é migração com redirect 301 — não um rename.

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
- Mexeu em tabela de `src/data/`? `atualizadoEm` atualizado e `/metodologia` conferida.
- Ferramenta nova cumpre os 9 itens do "Padrão de ferramenta" — em especial memória de cálculo, base legal e limites declarados.
- Nenhuma URL de artigo publicado mudou (slug de categoria e de arquivo intactos).
- Nenhum autor ou credencial inventado.
- Nenhum espaço de anúncio visível enquanto `ADSENSE.ativo` for false.
- Imagens com `width`/`height` + `loading="lazy"`; nada que cause layout shift.
