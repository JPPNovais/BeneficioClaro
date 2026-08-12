# Guia de Escrita dos Artigos — Benefício Claro

Este guia define **como escrever** os artigos do site. O objetivo é conteúdo genuinamente útil, original e com **voz humana e natural** — nunca conteúdo raso, padronizado ou "robótico".

**Para quem você escreve.** Uma pessoa no celular, com uma pergunta concreta e urgente sobre o próprio dinheiro: acabou de ser demitida e quer saber quanto vai receber; recebeu uma proposta e quer saber o líquido; está decidindo se adere ao saque-aniversário; ou depende de um benefício e quer saber quando cai. Ela não quer um ensaio: quer o número e a razão do número.

**A regra que define o site.** O conteúdo aqui é o **par** de uma calculadora, não um texto solto. A ferramenta dá o número; o artigo explica a regra, mostra a conta com um exemplo real e diz o que muda em cada situação. Um artigo do silo `trabalho` que não linka nenhuma ferramenta (e não é linkado por nenhuma) está órfão — reescreva o plano antes de escrever o texto.

---

## ⚠ Padrão para aprovação no Google AdSense (leia primeiro)

O AdSense reprova sites com **"conteúdo de baixo valor"**: textos rasos, genéricos, copiados, sem autor, sem fontes, ou que só repetem o que já existe. Para ser aprovado (e para ranquear), todo artigo precisa cumprir, sem exceção:

1. **Originalidade.** Escreva do zero, com as suas palavras e a sua organização. **Nunca** copie/cole trechos de outros sites ou do gov.br — parafraseie, explique e acrescente. Conteúdo duplicado é a principal causa de reprovação.
2. **Profundidade e completude.** Responda a dúvida **de verdade**, do começo ao fim. Em geral isso pede **800+ palavras** de conteúdo real (não enchimento): regras, valores, exemplos, exceções, próximos passos. Um artigo que "fala sobre" o tema sem resolver nada é raso.
3. **Verificação em fontes oficiais — e mais de uma.** Todo número, prazo, regra ou data tem que ser conferido na **fonte oficial** (Receita Federal, Ministério do Trabalho, Previdência, Caixa, gov.br, a lei) **antes de publicar**. Sempre que possível, **confirme em uma segunda fonte confiável** (imprensa séria, instituto) — preencha `fontesOficiais[]` (oficiais) e `referencias[]` (corroboradoras). Dado sem fonte = não publica.
4. **Exatidão (YMYL).** Este é um tema de "dinheiro/vida": informação errada prejudica quem lê e derruba a confiança. Se não tem certeza, **não afirme** — escreva "depende", explique a regra e mande para o canal oficial.
5. **Autoria e frescor (E-E-A-T).** Todo artigo tem autor real (`autor`), data de atualização e fontes. **Autor e credencial nunca são inventados** — ver `src/config/autores.ts`. Revise a cada trimestre e atualize `dataAtualizacao`.
6. **Sem promessas falsas.** Nunca diga "garanta seu benefício", "saque liberado", "dinheiro extra", "descubra quanto você vai receber a mais". Isso é tom de golpe e o AdSense pune. Seja honesto sobre prazos, exigências e o que **não** depende da pessoa.
7. **Mostre a conta.** Em tema de cálculo (salário, rescisão, férias, 13º, FGTS), não basta dizer a fórmula: faça **um exemplo numérico completo**, linha por linha, com valores redondos e a alíquota de cada etapa. E diga o que a conta **não** cobre. É o mesmo contrato das calculadoras — ver "Padrão de ferramenta" no [CLAUDE.md](CLAUDE.md).
8. **Volume do site.** O AdSense avalia o site como um todo. Tenha um conjunto de artigos substanciais (não 2 ou 3) + as páginas institucionais (Sobre, Metodologia, Contato, Privacidade — já existem) antes de pedir revisão.

**Temas que ajudam na aprovação e atraem tráfego** (alta busca, dúvida real, dá para responder com autoridade), na ordem de prioridade do site:

- **Salário e descontos:** "como calcular o salário líquido", "tabela do INSS / do IR do ano", "quem é isento de Imposto de Renda", "como calcular hora extra", "adicional noturno", "DSR", "quanto rende um aumento".
- **Rescisão e demissão:** "como calcular a rescisão", "aviso prévio (trabalhado e indenizado)", "multa de 40%", "pedido de demissão x sem justa causa x acordo mútuo", "seguro-desemprego: quem tem direito e quantas parcelas".
- **Férias e 13º:** "como calcular as férias", "terço constitucional", "vender 10 dias vale a pena", "férias proporcionais", "as duas parcelas do 13º e os descontos".
- **FGTS:** "como consultar/sacar o FGTS", "saque-aniversário vale a pena", "quanto de FGTS recebo na demissão".
- **INSS/aposentadoria:** "como consultar o Meu INSS", "auxílio-doença", "BPC/LOAS", "aposentadoria por idade".
- **MEI, dívidas e Pix:** "como abrir MEI", "DAS e limite de faturamento", "quando vale virar ME", "como sair das dívidas", "limpar o nome", "custo de parcelar no cartão", "Pix com segurança".
- **Economia/notícias:** salário mínimo do ano, Imposto de Renda (prazos/restituição), Selic, novas tabelas e portarias.
- **Benefícios sociais** (silo secundário, em manutenção): "quem tem direito", "qual o valor", "como me inscrever no CadÚnico", "calendário / quando cai", "benefício bloqueado/cancelado".

Fuja de tema vago, opinativo ou que você não consiga embasar em fonte oficial. E não escreva sobre recomendação de investimento ou produto financeiro específico: o site explica regra e faz conta, não indica onde aplicar.

---

## Princípios

### 1. Comece respondendo (answer-first)
A primeira coisa do artigo é a resposta direta à dúvida principal — é a **`respostaRapida`** do frontmatter (2–3 frases, 40–60 palavras), que aparece em destaque logo após o título. Diga o essencial primeiro; depois aprofunde. Quem precisa da resposta rápida resolve em 10 segundos; quem quer entender continua lendo.

> **Bom:** "Na demissão sem justa causa você recebe saldo de salário, aviso prévio, férias proporcionais + 1/3, 13º proporcional, a multa de 40% do FGTS e pode sacar o saldo. Pedindo demissão, perde o aviso, a multa e o saque."
>
> **Ruim:** "A rescisão do contrato de trabalho é um tema que gera muitas dúvidas e que ao longo dos anos passou por diversas mudanças na legislação..." (enrola antes de responder).

### 2. Linguagem simples e ritmo natural
- Frases de **tamanhos variados**. Alterne curtas e médias. Evite parágrafos-bloco.
- Palavras do dia a dia. Se precisar usar um termo técnico (NIS, per capita, CRAS), explique na hora, com um exemplo.
- Fale com a pessoa: "você", "a sua família", "se você recebe...".
- **Evite muletas robóticas e padrões repetitivos:** "Em conclusão", "Vale ressaltar que", "É importante destacar", transições artificiais, listas idênticas em todo artigo, excesso de ressalvas. Se uma frase não acrescenta informação, corte.

### 3. Valor concreto e verificável
Traga **passos reais, valores, prazos e datas** das fontes oficiais (Receita Federal, Ministério do Trabalho, Previdência, Caixa, gov.br, a lei) — e **cite a fonte** (preencha `fontesOficiais[]`). Número sem fonte gera desconfiança em tema YMYL.

- Em vez de "o desconto varia", diga: "o INSS é progressivo, de 7,5% a 14% por faixa, e para no teto de R$ 8.475,55 — o desconto máximo é R$ 988,09 (tabela de 2026)".
- Em vez de "demora um tempo", diga: "o pagamento da rescisão tem prazo de 10 dias corridos a partir do fim do contrato".
- Números de INSS/IRRF/FGTS que o site usa nas contas vivem em `src/data/` e estão publicados em `/metodologia` — **use os mesmos** e linke a página, para o artigo não divergir da calculadora.

### 4. Exemplos práticos do dia a dia
Sempre que houver uma conta ou regra, dê um exemplo concreto com valor redondo e a conta à vista:

> "Com salário de R$ 3.000 e nenhum dependente: o INSS é R$ 248,60 (faixa de 12%: R$ 3.000 × 12% = R$ 360, menos a parcela a deduzir de R$ 111,40). A base do IR fica em R$ 2.751,40. Pela tabela, o imposto seria R$ 24,20 — mas quem ganha até R$ 5.000 de bruto tem o IR zerado pelo redutor. Líquido: R$ 2.751,40."

Mostre a conta, não só o resultado. É o mesmo compromisso das calculadoras: quem lê tem que poder conferir.

### 5. Antecipe a próxima dúvida
Depois de responder uma pergunta, pense: "o que essa pessoa vai querer saber **agora**?" e responda. Use isso para encadear seções e para montar o **`faq[]`** (que também vira o schema FAQPage). Perguntas reais, não decorativas.

### 6. Empatia, sem paternalismo
A pessoa não é "carente" nem "coitada": ela tem direitos e está buscando informação. Escreva com respeito, direto ao ponto, sem dramatizar e sem julgar. Alerte sobre **golpes** quando fizer sentido ("você nunca paga para se inscrever") — isso protege quem lê.

---

## Estrutura recomendada

1. **Título (`title`)** — a dúvida real, de preferência em forma de pergunta quando fizer sentido ("Como calcular a rescisão na demissão sem justa causa?"). Um único H1 por página (o template cuida disso).
2. **Resposta rápida (`respostaRapida`)** — a resposta direta.
3. **Introdução curta** — 1 parágrafo situando o tema.
4. **Seções com `## ` (H2) em forma de pergunta** sempre que possível ("Quanto é o valor?", "Como me inscrevo?"). Subdivida com `### ` (H3) se necessário. O índice e os schemas saem daqui.
5. **Passo a passo** quando for um procedimento — e preencha `howTo` no frontmatter espelhando exatamente os passos visíveis (gera schema HowTo).
6. **Fontes oficiais (`fontesOficiais[]`)** — sempre.
7. **FAQ (`faq[]`)** — 3 a 6 perguntas reais.
8. **Relacionados (`relacionados[]`)** — 2 a 3 artigos vizinhos (linkagem interna do cluster).
9. **Link para a calculadora do tema** — no corpo, logo depois de explicar a fórmula, e não só no fim. Em artigo de cálculo isso não é opcional.

### Estrutura do artigo de cálculo (rescisão, férias, 13º, salário, FGTS)

Este é o formato que o site usa para competir — siga a ordem:

1. **Resposta rápida** com as verbas/o resultado, sem rodeio.
2. **O que entra na conta** — lista das verbas ou parcelas, uma linha cada.
3. **Como se calcula cada uma** — uma subseção por verba, com a fórmula em texto simples.
4. **Exemplo completo com um caso** — salário, tempo de casa, situação; e a conta linha por linha até o total. Use valores redondos.
5. **O que muda em cada situação** — pedido de demissão, justa causa, acordo mútuo, contrato de experiência, dependentes, etc.
6. **O que a conta não considera** — pensão alimentícia, plano de saúde, adiantamentos, categorias com regra própria. Dizer isso protege quem lê e protege o site.
7. **Prazos e o que fazer se não pagarem** — próximo passo concreto (sindicato, Ministério do Trabalho, ação).
8. **Link para a calculadora** e para `/metodologia`.

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
- [ ] Linkou a **calculadora** do tema (e a ferramenta linka de volta)?
- [ ] Se tem conta: fez o exemplo numérico completo e disse o que a conta não considera?
- [ ] Os números batem com `src/data/` e com `/metodologia`?
- [ ] O autor é real e a credencial é verificável (nada inventado)?
- [ ] Releu em voz alta? Soa como uma pessoa explicando, não como um robô?
- [ ] `dataAtualizacao` está correta?

---

## Notícias e frescor — e nunca repetir conteúdo

Um site que só repete os mesmos temas evergreen estagna e pode ser visto como **conteúdo duplicado/raso** (ruim para SEO e para o AdSense). Por isso, o mix ideal combina dois tipos de artigo:

- **Evergreen** (o backlog do `docs/plano-editorial.md`): "como calcular a rescisão", "como funciona o aviso prévio", "quem tem direito". Respondem dúvidas perenes e são o par dos artigos de calculadora.
- **Notícias/atualidades** (categoria `noticias` ou a categoria do tema): o que **está saindo agora** — nova tabela de IR ou de INSS, salário mínimo, mudança de regra, portaria, prazo de restituição, calendário do mês. É o que traz frescor, atrai tráfego novo e sinaliza um site vivo.

Regras de ouro:

1. **Nunca repita um tema já publicado.** Antes de escrever, confira os artigos existentes. Se o assunto já existe, **atualize o artigo antigo** (e a `dataAtualizacao`) em vez de criar um quase igual — dois textos parecidos competem entre si e cheiram a conteúdo duplicado.
2. **Traga um ângulo ou fato novo.** Uma notícia tem que ter uma novidade real e datada (um anúncio, um número que mudou, um prazo). Sem novidade verificável, não é notícia — é repetição.
3. **Notícia também precisa de fonte oficial.** Vale a mesma régua: confirme na Receita, no Diário Oficial, no gov.br ou na Caixa e cite. Se a "novidade" não se confirma em fonte oficial, não publique.
4. **Data importa.** Deixe claro a que mês/ano a informação se refere; revise ou aposente notícias que envelhecem.
5. **Mudança de tabela é dado, não só notícia.** Quando uma tabela de INSS, IRRF ou FGTS muda, atualize também o arquivo em `src/data/` e o `atualizadoEm` — senão a notícia contradiz a calculadora, e isso destrói exatamente a confiança que o site vende.

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
