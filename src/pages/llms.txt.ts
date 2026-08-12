import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "@config/site";
import { CATEGORIAS, categoriasDoGrupo } from "@config/categorias";
import { GRUPOS_FERRAMENTAS, ferramentasDoGrupo } from "@config/ferramentas";
import { urlArtigo, urlAbsoluta } from "@lib/utils";

/**
 * /llms.txt — índice curado do site para crawlers/assistentes de IA (convenção
 * llms.txt). Ajuda answer engines a entender e citar o conteúdo.
 *
 * Tudo aqui é gerado a partir das configs e da coleção de artigos — nada é
 * escrito à mão, para o arquivo não envelhecer quando o site muda.
 */
export const GET: APIRoute = async () => {
  const artigos = (await getCollection("artigos", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.dataAtualizacao.valueOf() - a.data.dataAtualizacao.valueOf()
  );

  const abs = (p: string) => urlAbsoluta(SITE.url, p);
  const linhaArtigo = (e: (typeof artigos)[number]) =>
    `- [${e.data.title}](${abs(urlArtigo(e.data.categoria, e.slug))}): ${e.data.description}`;

  // Artigos agrupados por categoria, na ordem das categorias configuradas.
  const secoesArtigos = CATEGORIAS.map((cat) => {
    const lista = artigos.filter((a) => a.data.categoria === cat.slug);
    if (lista.length === 0) return null;
    return `### ${cat.nome} (${abs(`/${cat.slug}`)})\n${lista.map(linhaArtigo).join("\n")}`;
  })
    .filter(Boolean)
    .join("\n\n");

  const secoesFerramentas = GRUPOS_FERRAMENTAS.map((g) => {
    const lista = ferramentasDoGrupo(g.grupo);
    if (lista.length === 0) return null;
    return `### ${g.titulo}\n${lista.map((f) => `- [${f.title}](${abs(f.href)}): ${f.description}`).join("\n")}`;
  })
    .filter(Boolean)
    .join("\n\n");

  const hubBeneficios = categoriasDoGrupo("beneficios")
    .map((c) => c.nome)
    .join(", ");

  const body = `# ${SITE.nome}

> ${SITE.descricao}

${SITE.nome} é um site independente de informação (não é um site oficial do governo). O foco é **o dinheiro de quem trabalha**: salário e descontos (INSS, IRRF), rescisão, férias, 13º, FGTS, INSS/aposentadoria, MEI e finanças do dia a dia. Também mantemos um silo sobre benefícios sociais (${hubBeneficios}).

O diferencial é a transparência do cálculo: cada calculadora mostra a memória de cálculo linha por linha e a base legal de cada alíquota, e as fórmulas e tabelas ficam públicas em ${abs("/metodologia")}, com a data em que cada tabela foi conferida. Todo conteúdo é original e verificado em fonte oficial (Receita Federal, Ministério do Trabalho, Previdência Social, Caixa, gov.br e a lei). Cada artigo começa com uma resposta rápida (answer-first) e traz perguntas frequentes.

## Artigos

${secoesArtigos}

## Ferramentas gratuitas

${secoesFerramentas}

## Institucional
- [Metodologia](${abs("/metodologia")}): fórmulas, tabelas vigentes, fontes e limites de cada cálculo.
- [Sobre](${abs("/sobre")}): quem somos, como produzimos e revisamos o conteúdo.
- [Benefícios sociais](${abs("/beneficios")}): hub dos guias de benefícios do governo.
- [Contato](${abs("/contato")})
- [Política de Privacidade](${abs("/politica-de-privacidade")})

## Observações
- Domínio: ${SITE.url}
- Idioma: ${SITE.locale}
- As ferramentas rodam no aparelho do usuário: nada é enviado a servidor nem salvo.
- Os cálculos são estimativas e não substituem a folha de pagamento nem o cálculo oficial da Caixa e do INSS.
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
