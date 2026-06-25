# Guia de Escrita dos Artigos — Benefício Claro

Este guia define **como escrever** os artigos do site. O objetivo é conteúdo genuinamente útil, original e com **voz humana e natural** — nunca conteúdo raso, padronizado ou "robótico". Quem lê é uma pessoa de baixa renda, no celular, muitas vezes ansiosa para resolver um problema concreto (receber um benefício, atualizar um cadastro, saber quando o dinheiro cai). Escreva para ela.

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

## O diferencial humano
Vem de **clareza, exemplos reais, dados atualizados e empatia** com a situação de quem lê — **não** de enrolação, não de palavras difíceis, não de repetir fórmulas. Se em dúvida entre soar "profissional" e soar "claro", escolha **claro**.
