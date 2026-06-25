import { defineCollection, z } from "astro:content";

/**
 * Coleção "artigos" — cada artigo é um arquivo .md/.mdx em
 * src/content/artigos/<categoria>/<slug>.(md|mdx).
 *
 * O frontmatter abaixo é a fonte de tudo: SEO, AEO (resposta rápida, FAQ,
 * HowTo), schema JSON-LD, índice, fontes oficiais e linkagem interna.
 * Veja CONTENT_GUIDE.md para o passo a passo de como escrever um artigo.
 */
const fonteOficial = z.object({
  label: z.string(),
  href: z.string().url(),
});

const faqItem = z.object({
  pergunta: z.string(),
  resposta: z.string(),
});

const artigos = defineCollection({
  type: "content",
  schema: z.object({
    /** Título visível (vira o H1 e o <title> base). Use a dúvida real. */
    title: z.string(),
    /**
     * Categoria/pilar — deve existir em src/config/categorias.ts.
     * Obs.: o slug da URL vem do campo reservado `slug` do frontmatter (lido
     * pelo Astro, fora deste schema) ou, na ausência, do nome do arquivo.
     * A URL final é /{categoria}/{slug}.
     */
    categoria: z.string(),
    /** Meta description (120–160 caracteres). */
    description: z.string(),
    /**
     * Resposta rápida (AEO): 2–3 frases que respondem a dúvida principal.
     * Aparece em destaque logo após o H1 e alimenta a extração por IA.
     */
    respostaRapida: z.string(),
    dataPublicacao: z.coerce.date(),
    dataAtualizacao: z.coerce.date(),
    /** id do autor em src/config/autores.ts. */
    autor: z.string().default("redacao"),
    /** Indica revisão editorial (selo "Revisado"). */
    revisado: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
    /** Subtópico do pilar (chave em categorias.ts) para agrupamento. */
    subtopico: z.string().optional(),
    fontesOficiais: z.array(fonteOficial).default([]),
    faq: z.array(faqItem).default([]),
    /**
     * Passos para schema HowTo (quando o artigo é um passo a passo).
     * Reflita exatamente os passos visíveis no corpo. Opcional.
     */
    howTo: z
      .object({
        name: z.string(),
        steps: z.array(
          z.object({ name: z.string(), text: z.string() })
        ),
      })
      .optional(),
    /** Slugs (relativos a /{categoria}/) de artigos relacionados. Vazio = automático. */
    relacionados: z.array(z.string()).default([]),
    /** Imagem de capa / Open Graph específica (relativa à raiz). Opcional. */
    image: z.string().optional(),
    /** Esconde da listagem e do build de produção. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { artigos };
