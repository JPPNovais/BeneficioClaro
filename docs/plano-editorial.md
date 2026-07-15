# Plano editorial — Benefício Claro

Backlog priorizado de artigos. A rotina diária (agendamento) escolhe **o próximo
artigo a escrever** seguindo o [CONTENT_GUIDE.md](../CONTENT_GUIDE.md) e o
[CLAUDE.md](../CLAUDE.md), publica e marca o item como concluído (`- [x]`).

**Ordem de escolha do tema (importante):**
1. **Notícia primeiro.** Faça uma busca rápida por novidades importantes e datadas
   dos benefícios (novo valor anunciado, mudança de regra, calendário do mês,
   portaria, revisão cadastral). Se houver algo **relevante, atual e verificável em
   fonte oficial que ainda não está no site**, escreva essa NOTÍCIA (categoria
   `noticias`, ou a categoria do benefício quando for específico).
2. **Senão, evergreen.** Pegue o primeiro item `- [ ]` do backlog cujo arquivo ainda
   **não existe** em `src/content/artigos/<categoria>/<slug>.(md|mdx)`.

**Nunca repita.** Antes de escrever, confira os artigos existentes. Se o tema já foi
publicado, **atualize o artigo antigo** (e a `dataAtualizacao`) em vez de criar um
quase igual — conteúdo duplicado prejudica SEO e AdSense.

Regras ao publicar:
- Datas do frontmatter = data da execução (`dataPublicacao` e `dataAtualizacao`).
- Gerar a **capa** (`node scripts/gen-covers.mjs <slug> "<título>" <icon> "<EYEBROW>"`)
  e referenciar em `capa`/`capaAlt` no frontmatter.
- Ao publicar o **primeiro** artigo de uma categoria ainda vazia (`cadunico`,
  `auxilio-gas`, `tarifa-social`, `financas`, `noticias`, `fgts`, `renda-extra`,
  `inss`), **remova essa categoria** da lista de exclusão do sitemap em `astro.config.mjs`.
- Um artigo por execução. `npm run build` tem que passar.

**Escopo do site:** benefícios sociais **e** economia do dia a dia do brasileiro —
FGTS, INSS/aposentadoria, renda extra e como ganhar dinheiro, finanças pessoais. Não
foque só em Bolsa Família: alterne os temas para diversificar o tráfego.

## Notícias (atualidades)

Não é um backlog fixo — vem dos acontecimentos. A cada execução, priorize se houver
novidade importante e verificável. Exemplos de boa notícia datada: salário mínimo do
ano, Imposto de Renda (prazos, restituição), Selic/juros, calendário e valores do mês
(Bolsa Família, FGTS, INSS), reajustes anunciados, novas portarias, mudanças no
CadÚnico/biometria, novos programas.

## Bolsa Família (aprofundar o pilar)

- [x] quem-tem-direito-bolsa-familia — quem tem direito, renda, Regra de Proteção `[quem-tem-direito]`
- [x] valor-do-bolsa-familia-2026 — quanto recebe, adicionais `[valores]`
- [x] como-se-inscrever-cadastro-unico — passo a passo da inscrição `[inscricao]`
- [x] calendario-pagamento-bolsa-familia-2026 — quando cai, por NIS `[pagamento]`
- [x] atualizar-cadastro-unico — atualização, averiguação `[inscricao]`
- [x] bolsa-familia-bloqueado-suspenso-cancelado — o que fazer `[pagamento]`
- [x] consultar-bolsa-familia-pelo-cpf — como consultar o benefício pelo CPF/app `[pagamento]`
- [ ] como-sacar-bolsa-familia-caixa-tem — sacar e usar pelo Caixa Tem (Pix, contas) `[pagamento]`
- [ ] regra-de-protecao-bolsa-familia — como funciona quando a renda aumenta `[quem-tem-direito]`
- [ ] bolsa-familia-carteira-assinada — posso receber trabalhando de carteira? `[quem-tem-direito]`
- [ ] beneficio-primeira-infancia — adicional de R$ 150 por criança até 6 anos `[valores]`
- [ ] bolsa-familia-mora-sozinho — quem mora sozinho tem direito? `[quem-tem-direito]`
- [ ] nao-recebi-bolsa-familia-o-que-fazer — pagamento não caiu na data `[pagamento]`

## CadÚnico (categoria: cadunico)

- [ ] o-que-e-cadastro-unico — o que é e para que serve
- [ ] como-fazer-cadastro-unico — primeira inscrição, passo a passo
- [ ] beneficios-do-cadastro-unico — quais benefícios o CadÚnico dá direito
- [ ] cadastro-unico-pelo-aplicativo — pré-cadastro e consulta pelo app

## Auxílio Gás (categoria: auxilio-gas)

- [ ] auxilio-gas-quem-tem-direito-valor — quem tem direito e valor do vale-gás
- [ ] calendario-auxilio-gas — quando cai o Auxílio Gás
- [ ] auxilio-gas-como-sacar — como sacar/usar o benefício

## Tarifa Social de Energia (categoria: tarifa-social)

- [ ] tarifa-social-energia-quem-tem-direito — desconto na conta de luz, quem tem direito
- [ ] como-pedir-tarifa-social — inscrição automática e como solicitar

## FGTS (categoria: fgts)

- [ ] consultar-saldo-fgts — como ver o saldo pelo app FGTS e pelo site da Caixa
- [ ] saque-aniversario-fgts-como-funciona — como funciona e vale a pena? (linke a ferramenta /ferramentas/saque-aniversario-fgts)
- [ ] saque-rescisao-x-saque-aniversario — diferença entre as duas modalidades
- [ ] como-sacar-fgts — em quais situações dá para sacar o FGTS
- [ ] fgts-demissao-sem-justa-causa — quanto recebo de FGTS + multa de 40%
- [ ] fgts-rende-quanto — rendimento anual do FGTS
- [ ] fgts-conta-inativa — como sacar FGTS de conta antiga/inativa

## Renda extra e trabalho (categoria: renda-extra)

- [ ] como-ganhar-dinheiro-extra — ideias reais de renda extra em 2026
- [ ] como-abrir-mei — passo a passo para virar MEI e vantagens
- [ ] como-ganhar-dinheiro-na-internet — formas reais e seguras (sem golpe)
- [ ] trabalhos-em-casa-para-ganhar-dinheiro — opções de trabalho remoto
- [ ] como-vender-online — marketplaces e redes sociais
- [ ] renda-extra-para-aposentados — o que a lei permite

## Finanças do dia a dia (categoria: financas)

- [ ] como-sair-das-dividas-pouco-dinheiro — organizar as contas com pouca renda
- [ ] conta-digital-sem-tarifa — como abrir conta digital gratuita
- [ ] pe-de-meia-poupanca-estudante — como funciona a poupança do estudante
- [ ] como-fazer-orcamento-familiar — método simples para o mês fechar
- [ ] pix-como-usar-com-seguranca — limites e como evitar golpes no Pix
- [ ] como-limpar-o-nome — Serasa Limpa Nome e Desenrola Brasil
- [ ] como-comecar-a-investir-com-pouco — Tesouro Direto e poupança
- [ ] mei-e-bolsa-familia — ser MEI atrapalha o Bolsa Família?

## INSS e aposentadoria (categoria: inss)

- [ ] como-consultar-o-inss — usar o Meu INSS pelo app e site
- [ ] auxilio-doenca-quem-tem-direito — regras e como pedir
- [ ] bpc-loas-quem-tem-direito — benefício de R$ 1 salário mínimo (idoso/deficiente)
- [ ] aposentadoria-por-idade-regras — idade e tempo de contribuição em 2026

## Como adicionar novos temas

Acrescente linhas `- [ ] slug — ângulo/keyword \`[subtopico]\`` na categoria certa.
Priorize dúvidas reais de alta busca e que dá para embasar em fonte oficial. Veja em
CONTENT_GUIDE.md os temas que aprovam no AdSense e atraem tráfego.
