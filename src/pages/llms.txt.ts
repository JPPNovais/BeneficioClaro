import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "@config/site";
import { getCategoriaNome } from "@config/categorias";
import { urlArtigo, urlAbsoluta } from "@lib/utils";

/**
 * /llms.txt — índice curado do site para crawlers/assistentes de IA (convenção
 * llms.txt). Ajuda answer engines a entender e citar o conteúdo. Gerado no build
 * a partir da coleção de artigos, então nunca fica desatualizado.
 */
export const GET: APIRoute = async () => {
  const artigos = (await getCollection("artigos", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.dataAtualizacao.valueOf() - a.data.dataAtualizacao.valueOf()
  );

  const abs = (p: string) => urlAbsoluta(SITE.url, p);
  const linhaArtigo = (e: (typeof artigos)[number]) =>
    `- [${e.data.title}](${abs(urlArtigo(e.data.categoria, e.slug))}): ${e.data.description}`;

  const body = `# ${SITE.nome}

> ${SITE.descricao}

${SITE.nome} é um site independente de informação (não é um site oficial do governo) que explica benefícios sociais e finanças do dia a dia em linguagem simples. Todo conteúdo é original, escrito por autores reais e verificado em fontes oficiais (gov.br/MDS, Caixa) e corroborado em fontes confiáveis. Cada artigo começa com uma resposta rápida (answer-first) e traz perguntas frequentes.

## Artigos
${artigos.map(linhaArtigo).join("\n")}

## Ferramentas gratuitas
- [Simulador de benefícios](${abs("/ferramentas/simulador")}): responda 4 perguntas e veja a quais benefícios pode ter direito. Client-side, sem coletar dados.
- [Calendário de pagamento](${abs("/ferramentas/calendario")}): data do Bolsa Família por final do NIS.
- [Checklist de documentos](${abs("/ferramentas/checklist")}): documentos por benefício.

## Institucional
- [Sobre](${abs("/sobre")}): quem somos, como produzimos e revisamos o conteúdo.
- [Contato](${abs("/contato")})
- [Política de Privacidade](${abs("/politica-de-privacidade")})

## Observações
- Domínio: ${SITE.url}
- Idioma: ${SITE.locale}
- As ferramentas rodam no aparelho do usuário e não salvam dados pessoais.
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
