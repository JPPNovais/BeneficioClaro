/**
 * Construtores de schema JSON-LD (schema.org). O schema deve SEMPRE refletir o
 * conteúdo visível na página — por isso é gerado a partir do mesmo frontmatter
 * que renderiza a tela (resposta rápida, FAQ, passos, fontes).
 */
import { SITE } from "@config/site";
import { urlAbsoluta } from "@lib/utils";

const ORG_ID = `${SITE.url}/#organizacao`;
const SITE_ID = `${SITE.url}/#site`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.nome,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: urlAbsoluta(SITE.url, "/logo-mark.svg"),
    },
    description: SITE.descricao,
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE.nome,
    url: SITE.url,
    inLanguage: SITE.locale,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: urlAbsoluta(SITE.url, "/buscar?q={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export interface ArticleSchemaInput {
  url: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorUrl: string;
  image?: string;
}
export function articleSchema(a: ArticleSchemaInput) {
  return {
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.datePublished,
    dateModified: a.dateModified,
    inLanguage: SITE.locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": a.url },
    author: {
      "@type": "Person",
      name: a.authorName,
      url: a.authorUrl,
    },
    publisher: { "@id": ORG_ID },
    image: a.image ? [a.image] : [urlAbsoluta(SITE.url, SITE.ogImage)],
  };
}

export interface FaqItem {
  pergunta: string;
  resposta: string;
}
export function faqSchema(faq: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.pergunta,
      acceptedAnswer: { "@type": "Answer", text: f.resposta },
    })),
  };
}

export interface HowToInput {
  name: string;
  steps: { name: string; text: string }[];
}
export function howToSchema(howTo: HowToInput) {
  return {
    "@type": "HowTo",
    name: howTo.name,
    step: howTo.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/**
 * Empacota uma lista de nós de schema em um único @graph. Devolve o objeto
 * pronto para JSON.stringify (com @context no topo).
 */
export function graph(nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
