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
  authorJobTitle?: string;
  image?: string;
  /** Categoria/seção do artigo (articleSection). */
  section?: string;
  /** Palavras-chave (tags). */
  keywords?: string[];
  /** Número de palavras do corpo (sinal de profundidade). */
  wordCount?: number;
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
      ...(a.authorJobTitle ? { jobTitle: a.authorJobTitle } : {}),
    },
    publisher: { "@id": ORG_ID },
    image: a.image ? [a.image] : [urlAbsoluta(SITE.url, SITE.ogImage)],
    ...(a.section ? { articleSection: a.section } : {}),
    ...(a.keywords && a.keywords.length ? { keywords: a.keywords.join(", ") } : {}),
    ...(a.wordCount ? { wordCount: a.wordCount } : {}),
  };
}

/** WebPage — nó por página, ligado ao WebSite. Incluído em toda página. */
export function webPageSchema(opts: { url: string; name: string; description: string }) {
  return {
    "@type": "WebPage",
    "@id": opts.url,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: SITE.locale,
    isPartOf: { "@id": SITE_ID },
  };
}

/** WebApplication gratuito (ferramentas). Bom para rich results de "app grátis". */
export function softwareAppSchema(opts: { name: string; description: string; url: string }) {
  return {
    "@type": "WebApplication",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    inLanguage: SITE.locale,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    publisher: { "@id": ORG_ID },
  };
}

/** ItemList — usado no hub de ferramentas. */
export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url,
    })),
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
