# Plano editorial — Benefício Claro

Backlog priorizado de artigos. A rotina diária (agendamento) escolhe **o próximo
artigo a escrever** seguindo o [CONTENT_GUIDE.md](../CONTENT_GUIDE.md) e o
[CLAUDE.md](../CLAUDE.md), publica e marca o item como concluído (`- [x]`).

**Ordem de escolha do tema (importante):**
1. **Notícia primeiro.** Faça uma busca rápida por novidades importantes e datadas do
   escopo (nova tabela de INSS/IRRF, salário mínimo, mudança de regra trabalhista,
   prazos do IR, Selic, calendário do mês, portaria). Se houver algo **relevante,
   atual e verificável em fonte oficial que ainda não está no site**, escreva essa
   NOTÍCIA (categoria `noticias`, ou a categoria do tema quando for específico).
2. **Senão, evergreen — na ordem dos silos.** Pegue o primeiro item `- [ ]` cujo
   arquivo ainda **não existe**, respeitando esta prioridade de seção:
   `trabalho` → `fgts` → `inss` → `financas` → `renda-extra` → benefícios sociais.
   O silo `trabalho` é o foco do site; os benefícios estão em **manutenção**.

**Nunca repita.** Antes de escrever, confira os artigos existentes. Se o tema já foi
publicado, **atualize o artigo antigo** (e a `dataAtualizacao`) em vez de criar um
quase igual — conteúdo duplicado prejudica SEO e AdSense.

Regras ao publicar:
- Datas do frontmatter = data da execução (`dataPublicacao` e `dataAtualizacao`).
- Gerar a **capa** (`node scripts/gen-covers.mjs <slug> "<título>" <icon> "<EYEBROW>"`)
  e referenciar em `capa`/`capaAlt` no frontmatter.
- **Amarrar à ferramenta.** Todo artigo de `trabalho`/`fgts` linka a calculadora do
  tema no corpo (e `/metodologia` quando cita alíquota). Artigo órfão não entra.
- **Números vêm de `src/data/`.** Se o artigo cita alíquota, faixa ou teto, use os
  mesmos valores das tabelas — e, se a norma mudou, atualize a tabela e o
  `atualizadoEm` no mesmo commit.
- Nunca inventar autor nem credencial (ver `src/config/autores.ts`).
- Um artigo por execução. `npm run build` tem que passar.

**Escopo do site:** **o dinheiro de quem trabalha** — salário e descontos, rescisão,
férias e 13º, FGTS, INSS/aposentadoria, MEI/renda extra e finanças do dia a dia.
Benefícios sociais seguem como silo secundário (`/beneficios`), em manutenção: podem
render notícia e atualização, mas não são a prioridade de novos artigos.

## Notícias (atualidades)

Não é um backlog fixo — vem dos acontecimentos. A cada execução, priorize se houver
novidade importante e verificável. Exemplos de boa notícia datada: nova tabela do IRRF
ou do INSS, salário mínimo do ano, Imposto de Renda (prazos, restituição), Selic/juros,
reajustes e portarias trabalhistas, rendimento anual do FGTS, calendário e valores do
mês (FGTS, INSS, Bolsa Família), mudanças no CadÚnico/biometria.

## Salário, rescisão e direitos (categoria: trabalho) — PRIORIDADE

Silo principal. Cada item abaixo é o par de uma calculadora (existente ou no roadmap
de `src/config/ferramentas.ts`); siga a "Estrutura do artigo de cálculo" do
[CONTENT_GUIDE.md](../CONTENT_GUIDE.md).

- [x] como-calcular-salario-liquido — a conta completa, INSS + IRRF, com exemplo (linke /ferramentas/calculadora-salario-liquido) `[salario]`
- [ ] tabela-inss-2026 — faixas, teto e desconto máximo, com a conta da parcela a deduzir `[salario]`
- [ ] tabela-imposto-de-renda-2026 — faixas, isenção, redutor e dedução por dependente `[salario]`
- [ ] como-calcular-rescisao — todas as verbas da demissão sem justa causa, com exemplo fechado `[rescisao]`
- [ ] aviso-previo-como-funciona — trabalhado x indenizado, os 3 dias por ano, quem paga o quê `[rescisao]`
- [ ] pedido-de-demissao-o-que-recebo — o que se perde ao pedir as contas `[rescisao]`
- [ ] acordo-mutuo-demissao — demissão por acordo: 20% de multa, 80% do saque, sem seguro `[rescisao]`
- [ ] seguro-desemprego-quem-tem-direito — requisitos, número de parcelas e valor `[rescisao]`
- [ ] como-calcular-ferias — férias + 1/3, proporcionais e os descontos `[ferias-decimo]`
- [ ] vender-ferias-vale-a-pena — abono pecuniário: quanto rende vender 10 dias `[ferias-decimo]`
- [ ] como-calcular-decimo-terceiro — as duas parcelas e por que a 2ª vem menor `[ferias-decimo]`
- [ ] como-calcular-hora-extra — 50% e 100%, reflexo no DSR, com exemplo `[outros-direitos]`
- [ ] adicional-noturno-como-calcular — 20%, hora reduzida de 52min30s `[outros-direitos]`
- [ ] justa-causa-o-que-recebo — o que sobra e quais faltas configuram `[rescisao]`

## FGTS (categoria: fgts)

- [x] consultar-saldo-fgts — como ver o saldo pelo app FGTS e pelo site da Caixa
- [x] saque-aniversario-fgts-como-funciona — como funciona e vale a pena? (linke a ferramenta /ferramentas/saque-aniversario-fgts)
- [ ] fgts-demissao-sem-justa-causa — quanto recebo de FGTS + multa de 40%
- [ ] saque-rescisao-x-saque-aniversario — diferença entre as duas modalidades
- [ ] como-sacar-fgts — em quais situações dá para sacar o FGTS
- [ ] fgts-rende-quanto — rendimento anual do FGTS
- [ ] fgts-conta-inativa — como sacar FGTS de conta antiga/inativa

## INSS e aposentadoria (categoria: inss)

- [x] como-consultar-o-inss — usar o Meu INSS pelo app e site
- [x] auxilio-doenca-quem-tem-direito — regras e como pedir
- [x] bpc-loas-quem-tem-direito — benefício de R$ 1 salário mínimo (idoso/deficiente)
- [x] aposentadoria-por-idade-regras — idade e tempo de contribuição em 2026
- [ ] como-contar-tempo-de-contribuicao — CNIS, períodos que contam e como corrigir
- [ ] quanto-vou-receber-de-aposentadoria — média dos salários e o cálculo do valor

## Finanças do dia a dia (categoria: financas)

- [x] pix-como-usar-com-seguranca — limites e como evitar golpes no Pix
- [x] como-limpar-o-nome — Serasa Limpa Nome e Desenrola Brasil
- [x] abono-salarial-pis-pasep-2026 — quem tem direito, valor e calendário do abono salarial
- [ ] custo-de-parcelar-no-cartao — quanto custa o rotativo e o parcelado, com exemplo
- [ ] como-sair-das-dividas-pouco-dinheiro — organizar as contas com pouca renda
- [ ] como-fazer-orcamento-familiar — método simples para o mês fechar
- [ ] conta-digital-sem-tarifa — como abrir conta digital gratuita
- [ ] como-comecar-a-investir-com-pouco — Tesouro Direto e poupança
- [ ] pe-de-meia-poupanca-estudante — como funciona a poupança do estudante

## MEI e renda extra (categoria: renda-extra)

- [x] como-abrir-mei — passo a passo para virar MEI e vantagens
- [ ] das-mei-quanto-custa — valor do DAS, o que ele cobre e o que acontece se atrasar
- [ ] limite-faturamento-mei — teto anual, o que fazer ao estourar e quando virar ME
- [ ] mei-e-bolsa-familia — ser MEI atrapalha o Bolsa Família?
- [ ] como-ganhar-dinheiro-extra — ideias reais de renda extra em 2026
- [ ] como-ganhar-dinheiro-na-internet — formas reais e seguras (sem golpe)
- [ ] trabalhos-em-casa-para-ganhar-dinheiro — opções de trabalho remoto
- [ ] como-vender-online — marketplaces e redes sociais
- [ ] renda-extra-para-aposentados — o que a lei permite

---

# Silo secundário: benefícios sociais (manutenção)

Estes clusters **não são prioridade de novos artigos**. Continuam publicados nas mesmas
URLs e devem ser mantidos vivos: atualizar valores/calendário quando mudam, cobrir
notícia relevante e revisar trimestralmente. Só escreva um item `- [ ]` daqui quando o
backlog de `trabalho`, `fgts`, `inss`, `financas` e `renda-extra` estiver vazio.

## Bolsa Família (aprofundar o pilar)

- [x] quem-tem-direito-bolsa-familia — quem tem direito, renda, Regra de Proteção `[quem-tem-direito]`
- [x] valor-do-bolsa-familia-2026 — quanto recebe, adicionais `[valores]`
- [x] como-se-inscrever-cadastro-unico — passo a passo da inscrição `[inscricao]`
- [x] calendario-pagamento-bolsa-familia-2026 — quando cai, por NIS `[pagamento]`
- [x] atualizar-cadastro-unico — atualização, averiguação `[inscricao]`
- [x] bolsa-familia-bloqueado-suspenso-cancelado — o que fazer `[pagamento]`
- [x] consultar-bolsa-familia-pelo-cpf — como consultar o benefício pelo CPF/app `[pagamento]`
- [x] como-sacar-bolsa-familia-caixa-tem — sacar e usar pelo Caixa Tem (Pix, contas) `[pagamento]`
- [x] regra-de-protecao-bolsa-familia — como funciona quando a renda aumenta `[quem-tem-direito]`
- [ ] bolsa-familia-carteira-assinada — posso receber trabalhando de carteira? `[quem-tem-direito]`
- [ ] beneficio-primeira-infancia — adicional de R$ 150 por criança até 6 anos `[valores]`
- [x] bolsa-familia-mora-sozinho — quem mora sozinho tem direito? (notícia: Portaria MDS 1.199/2026 adia entrevista domiciliar até 2027) `[quem-tem-direito]`
- [ ] nao-recebi-bolsa-familia-o-que-fazer — pagamento não caiu na data `[pagamento]`

## CadÚnico (categoria: cadunico)

- [x] o-que-e-cadastro-unico — o que é e para que serve
- [ ] como-fazer-cadastro-unico — primeira inscrição, passo a passo
- [ ] beneficios-do-cadastro-unico — quais benefícios o CadÚnico dá direito
- [ ] cadastro-unico-pelo-aplicativo — pré-cadastro e consulta pelo app

## Auxílio Gás (categoria: auxilio-gas)

- [x] gas-do-povo-quem-tem-direito — Auxílio Gás virou Gás do Povo (vale-recarga do botijão), quem tem direito, valor e como retirar `[auxilio-gas-quem-tem-direito-valor]`
- [x] calendario-auxilio-gas — calendário de liberação do vale por ciclo/família (notícia: MDS fixou liberação sempre no dia 10; ciclos por tamanho da família)
- [ ] auxilio-gas-como-sacar — passo a passo detalhado de retirada na revenda credenciada

## Tarifa Social de Energia (categoria: tarifa-social)

- [x] tarifa-social-energia-quem-tem-direito — desconto na conta de luz, quem tem direito
- [ ] como-pedir-tarifa-social — inscrição automática e como solicitar

---

## Como adicionar novos temas

Acrescente linhas `- [ ] slug — ângulo/keyword \`[subtopico]\`` na categoria certa,
respeitando a prioridade dos silos (trabalho primeiro). Priorize dúvidas reais de alta
busca, que dá para embasar em fonte oficial **e que tenham uma calculadora do lado** —
é a combinação que ranqueia com site novo. Veja em CONTENT_GUIDE.md os temas que
aprovam no AdSense e atraem tráfego, e em CLAUDE.md o "Padrão de ferramenta".
