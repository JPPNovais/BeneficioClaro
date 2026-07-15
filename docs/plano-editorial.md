# Plano editorial — Benefício Claro

Backlog priorizado de artigos. A rotina diária (agendamento) usa este arquivo para
escolher **o próximo artigo a escrever**: pega o **primeiro item não concluído**
(cujo arquivo ainda **não existe** em `src/content/artigos/<categoria>/<slug>.(md|mdx)`),
escreve seguindo o [CONTENT_GUIDE.md](../CONTENT_GUIDE.md) e o [CLAUDE.md](../CLAUDE.md),
publica e marca o item como concluído (`- [x]`).

Regras ao publicar:
- Datas do frontmatter = data da execução (`dataPublicacao` e `dataAtualizacao`).
- Ao publicar o **primeiro** artigo de uma categoria que ainda estava vazia
  (`cadunico`, `auxilio-gas`, `tarifa-social`, `financas`), **remova essa categoria**
  da lista de exclusão do sitemap em `astro.config.mjs` (para passar a ser indexada).
- Um artigo por execução. `npm run build` tem que passar.

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

## Finanças do dia a dia (categoria: financas)

- [ ] pe-de-meia-poupanca-estudante — como funciona a poupança do estudante
- [ ] conta-digital-sem-tarifa — como abrir conta digital gratuita
- [ ] como-sair-das-dividas-pouco-dinheiro — organizar as contas com pouca renda
- [ ] mei-e-bolsa-familia — ser MEI atrapalha o Bolsa Família?

## Como adicionar novos temas

Acrescente linhas `- [ ] slug — ângulo/keyword \`[subtopico]\`` na categoria certa.
Priorize dúvidas reais de alta busca e que dá para embasar em fonte oficial. Veja em
CONTENT_GUIDE.md os temas que aprovam no AdSense e atraem tráfego.
