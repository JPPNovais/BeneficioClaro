# Guia de Escrita dos Artigos — Benefício Claro

Este guia define **como escrever** os artigos do site. O objetivo é conteúdo genuinamente útil, original e com **voz humana e natural** — nunca conteúdo raso, padronizado ou "robótico". Quem lê é uma pessoa de baixa renda, no celular, muitas vezes ansiosa para resolver um problema concreto (receber um benefício, atualizar um cadastro, saber quando o dinheiro cai). Escreva para ela.

---

## ⚠ Padrão para aprovação no Google AdSense (leia primeiro)

O AdSense reprova sites com **"conteúdo de baixo valor"**: textos rasos, genéricos, copiados, sem autor, sem fontes, ou que só repetem o que já existe. Para ser aprovado (e para ranquear), todo artigo precisa cumprir, sem exceção:

1. **Originalidade.** Escreva do zero, com as suas palavras e a sua organização. **Nunca** copie/cole trechos de outros sites ou do gov.br — parafraseie, explique e acrescente. Conteúdo duplicado é a principal causa de reprovação.
2. **Profundidade e completude.** Responda a dúvida **de verdade**, do começo ao fim. Em geral isso pede **800+ palavras** de conteúdo real (não enchimento): regras, valores, exemplos, exceções, próximos passos. Um artigo que "fala sobre" o tema sem resolver nada é raso.
3. **Verificação em fontes oficiais — e mais de uma.** Todo número, prazo, regra ou data tem que ser conferido na **fonte oficial** (gov.br/MDS, Caixa, leis) **antes de publicar**. Sempre que possível, **confirme em uma segunda fonte confiável** (imprensa séria, instituto) — preencha `fontesOficiais[]` (oficiais) e `referencias[]` (corroboradoras). Dado sem fonte = não publica.
4. **Exatidão (YMYL).** Este é um tema de "dinheiro/vida": informação errada prejudica gente vulnerável e derruba a confiança. Se não tem certeza, **não afirme** — escreva "depende", explique a regra e mande para o canal oficial.
5. **Autoria e frescor (E-E-A-T).** Todo artigo tem autor real (`autor`), data de atualização e fontes. Revise a cada trimestre e atualize `dataAtualizacao`.
6. **Sem promessas falsas.** Nunca diga "garanta seu benefício", "saque liberado", "dinheiro extra". Isso é tom de golpe e o AdSense pune. Seja honesto sobre prazos, exigências e o que **não** depende da pessoa.
7. **Volume do site.** O AdSense avalia o site como um todo. Tenha um conjunto de artigos substanciais (não 2 ou 3) + as páginas institucionais (Sobre, Contato, Privacidade — já existem) antes de pedir revisão.

**Temas que ajudam na aprovação e atraem tráfego** (alta busca, dúvida real, dá para responder com autoridade): "quem tem direito", "qual o valor / quanto vou receber", "como me inscrever no CadÚnico", "calendário de pagamento / quando cai", "como consultar se fui aprovado", "regra de proteção", "o que fazer se o benefício foi bloqueado/cancelado", "como atualizar o cadastro". Fuja de tema vago, opinativo ou que você não consiga embasar em fonte oficial.

---

## Princípios

### 1. Comece respondendo (answer-first)
A primeira coisa do artigo é a resposta direta à dúvida principal — é a **`respostaRapida`** do frontmatter (2–3 frases, 40–60 palavras), que aparece em destaque logo após o título. Diga o essencial primeiro; depois aprofunde. Quem precisa da resposta rápida resolve em 10 segundos; quem quer entender continua lendo.

> **Bom:** "Você tem direito ao Bolsa Família se a renda por pessoa da família for de até R$ 218 por mês e todos estiverem no CadÚnico. O valor mínimo é R$ 600. A inscrição é gratuita, no CRAS."
>
> **Ruim:** "O Bolsa Família é um importante programa que ao longo dos anos passou por diversas mudanças..." (enrola antes de responder).

### 2. Linguagem simples e ritmo natural
- Frases de **tamanhos variados**. Alterne curtas e médias. Evite parágrafos-bloco.
- Palavras do dia a dia. Se precisar usar um termo técnico (NIS, per capita, CRAS), explique na hora, com um exemplo.
- Fale com a pessoa: "você", "a sua família", "se você recebe...".
- **Evite muletas robóticas e padrões repetitivos:** "Em conclusão", "Vale ressaltar que", "É importante destacar", transições artificiais, listas idênticas em todo artigo, excesso de ressalvas. Se uma frase não acrescenta informação, corte.

### 3. Valor concreto e verificável
Traga **passos reais, valores, prazos e datas** das fontes oficiais (gov.br, Caixa, MDS) — e **cite a fonte** (preencha `fontesOficiais[]`). Número sem fonte gera desconfiança em tema YMYL.

- Em vez de "o valor pode variar", diga: "R$ 600 de mínimo + R$ 150 por criança de até 6 anos (valores de 2026)".
- Em vez de "demora um tempo", diga: "a análise leva, em média, de 30 a 45 dias".

### 4. Exemplos práticos do dia a dia
Sempre que houver uma conta ou regra, dê um exemplo concreto:

> "Se a sua família tem 4 pessoas e renda total de R$ 800, a renda por pessoa é R$ 800 ÷ 4 = R$ 200. Como é menor que R$ 218, pode ter direito."

### 5. Antecipe a próxima dúvida
Depois de responder uma pergunta, pense: "o que essa pessoa vai querer saber **agora**?" e responda. Use isso para encadear seções e para montar o **`faq[]`** (que também vira o schema FAQPage). Perguntas reais, não decorativas.

### 6. Empatia, sem paternalismo
A pessoa não é "carente" nem "coitada": ela tem direitos e está buscando informação. Escreva com respeito, direto ao ponto, sem dramatizar e sem julgar. Alerte sobre **golpes** quando fizer sentido ("você nunca paga para se inscrever") — isso protege quem lê.

---

## Estrutura recomendada

1. **Título (`title`)** — a dúvida real, de preferência em forma de pergunta quando fizer sentido ("Quem tem direito ao Bolsa Família em 2026?"). Um único H1 por página (o template cuida disso).
2. **Resposta rápida (`respostaRapida`)** — a resposta direta.
3. **Introdução curta** — 1 parágrafo situando o tema.
4. **Seções com `## ` (H2) em forma de pergunta** sempre que possível ("Quanto é o valor?", "Como me inscrevo?"). Subdivida com `### ` (H3) se necessário. O índice e os schemas saem daqui.
5. **Passo a passo** quando for um procedimento — e preencha `howTo` no frontmatter espelhando exatamente os passos visíveis (gera schema HowTo).
6. **Fontes oficiais (`fontesOficiais[]`)** — sempre.
7. **FAQ (`faq[]`)** — 3 a 6 perguntas reais.
8. **Relacionados (`relacionados[]`)** — 2 a 3 artigos vizinhos (linkagem interna do cluster).

### Cabeçalhos em forma de pergunta
Use a linguagem que a pessoa usaria na busca/no Google: "Quando cai o pagamento?", "Posso receber se trabalho de carteira assinada?". Isso ajuda no SEO e no AEO (citação por IA).

---

## Frescor (atualização)
Conteúdo atualizado é fator de confiança e de citação por IA. **Revise cada artigo a cada trimestre** (valores, datas, prazos) e atualize a `dataAtualizacao`. O site exibe "Atualizado em [data]" de forma visível.

---

## Checklist antes de publicar

- [ ] A `respostaRapida` responde a dúvida principal em 2–3 frases?
- [ ] O título e os H2 usam a linguagem real de quem busca?
- [ ] Há ao menos um exemplo prático com números?
- [ ] Todo valor/prazo tem fonte oficial em `fontesOficiais[]`?
- [ ] O `faq[]` tem perguntas reais (não decorativas)?
- [ ] Se é um passo a passo, o `howTo` espelha os passos do texto?
- [ ] Linkou o pilar e 2–3 satélites (`relacionados[]` ou links no corpo)?
- [ ] Releu em voz alta? Soa como uma pessoa explicando, não como um robô?
- [ ] `dataAtualizacao` está correta?

---

## Notícias e frescor — e nunca repetir conteúdo

Um site que só repete os mesmos temas evergreen estagna e pode ser visto como **conteúdo duplicado/raso** (ruim para SEO e para o AdSense). Por isso, o mix ideal combina dois tipos de artigo:

- **Evergreen** (o backlog do `docs/plano-editorial.md`): "quem tem direito", "qual o valor", "como se inscrever". Respondem dúvidas perenes.
- **Notícias/atualidades** (categoria `noticias` ou dentro da categoria do benefício): o que **está saindo agora** e interessa ao leitor — novos valores anunciados, mudança de regra, calendário do mês, portarias, prazos de revisão cadastral, novidades de programas. É o que traz frescor, atrai tráfego novo e sinaliza um site vivo.

Regras de ouro:

1. **Nunca repita um tema já publicado.** Antes de escrever, confira os artigos existentes. Se o assunto já existe, **atualize o artigo antigo** (e a `dataAtualizacao`) em vez de criar um quase igual — dois textos parecidos competem entre si e cheiram a conteúdo duplicado.
2. **Traga um ângulo ou fato novo.** Uma notícia tem que ter uma novidade real e datada (um anúncio, um número que mudou, um prazo). Sem novidade verificável, não é notícia — é repetição.
3. **Notícia também precisa de fonte oficial.** Vale a mesma régua: confirme em gov.br/MDS/Caixa e cite. Se a "novidade" não se confirma em fonte oficial, não publique.
4. **Data importa.** Deixe claro a que mês/ano a informação se refere; revise ou aposente notícias que envelhecem.

## Checklist de AEO (ser citado por IA e ranquear no Google)

Além da qualidade, cada artigo deve cumprir os sinais que fazem um conteúdo ser
escolhido por buscadores e por assistentes de IA. Antes de publicar, confira:

- [ ] **Resposta rápida** (`respostaRapida`) logo após o H1, em 2–3 frases diretas.
- [ ] **Um único H1**; estrutura com **pelo menos 3 H2/H3**, de preferência em forma de pergunta.
- [ ] **FAQ** (`faq[]`) com 3–6 perguntas reais → vira schema `FAQPage`.
- [ ] **800+ palavras** de conteúdo real (corpo + resposta rápida + FAQ).
- [ ] **Título de 15 a 60 caracteres** (o sistema encurta o sufixo da marca se precisar).
- [ ] **Meta description de 120 a 160 caracteres**.
- [ ] **Listas e/ou tabelas** onde ajudam a escanear (valores, passos, datas).
- [ ] **Fontes oficiais + referências** (`fontesOficiais[]`/`referencias[]`) — dado sem fonte não entra.
- [ ] **E-E-A-T**: autor real, "Atualizado em [data]" e revisão trimestral (`dataAtualizacao`).
- [ ] **Imagens com `alt`** (campo `capaAlt` para a capa).
- [ ] **Linkagem interna**: aponta para o pilar e 2–3 satélites vizinhos.

O JSON-LD (`Article`, `FAQPage`, `HowTo`, `BreadcrumbList`), o `llms.txt`, o `rss.xml`,
o sitemap e o robots (com crawlers de IA liberados) são gerados automaticamente — você
só precisa entregar o conteúdo e o frontmatter no padrão acima.

## O diferencial humano
Vem de **clareza, exemplos reais, dados atualizados e empatia** com a situação de quem lê — **não** de enrolação, não de palavras difíceis, não de repetir fórmulas. Se em dúvida entre soar "profissional" e soar "claro", escolha **claro**.
