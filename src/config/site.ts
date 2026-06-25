/**
 * Configuração central do site — marca, URL e monetização.
 * Edite AQUI (e em nenhum outro lugar) para mudar nome, domínio ou AdSense.
 */
export const SITE = {
  /** Nome da marca, usado no logo, títulos e schema. */
  nome: "Benefício Claro",
  /** Slogan curto exibido no header. */
  slogan: "Seus direitos, sem complicação",
  /** URL canônica de produção (sem barra no final). */
  url: "https://beneficioclaro.com.br",
  /** Domínio "limpo" para exibição (rodapé, copyright). */
  dominio: "beneficioclaro.com.br",
  /** Idioma do conteúdo (usado em <html lang> e schema). */
  locale: "pt-BR",
  /** Descrição padrão (fallback de meta description e OG). */
  descricao:
    "Explicamos o Bolsa Família, o CadÚnico e outros benefícios sociais em linguagem simples, com ferramentas gratuitas e fontes oficiais.",
  /** E-mail de contato (página de contato e schema). */
  email: "contato@beneficioclaro.com.br",
  /** Imagem Open Graph padrão (PNG 1200×630, melhor compatibilidade que SVG). */
  ogImage: "/og-default.png",
  /** Ano de fundação (copyright). */
  anoFundacao: 2026,
} as const;

/**
 * Google AdSense — ligar/desligar e Publisher ID num único lugar.
 *
 * Como ativar em produção:
 *   1. publisherId: "ca-pub-XXXXXXXXXXXXXXXX" (seu ID real)
 *   2. ativo: true
 *   3. (opcional) defina os slotIds reais de cada posição.
 *
 * Enquanto `ativo` for false, NENHUM espaço de anúncio aparece no site (nem
 * placeholder) — comportamento correto durante a análise do AdSense, que
 * reprova páginas com blocos de anúncio vazios.
 *
 * `previewPlaceholders` (apenas para trabalho de design) força a exibição dos
 * placeholders rotulados "Publicidade" mesmo com `ativo: false`. Mantenha
 * false em produção e durante a análise do AdSense.
 */
export const ADSENSE = {
  ativo: false,
  previewPlaceholders: false,
  publisherId: "ca-pub-0000000000000000",
  /**
   * IDs de slot por posição. Crie os blocos no painel do AdSense e cole aqui.
   * Deixe vazio para usar anúncios automáticos / responsivos do bloco.
   */
  slots: {
    "apos-introducao": "",
    "meio-do-artigo": "",
    "final-do-artigo": "",
    lateral: "",
  },
} as const;

export type AdPlacement = keyof typeof ADSENSE.slots;

/** Itens de navegação principal (header). */
export const NAV_PRINCIPAL = [
  { href: "/", label: "Início", match: "home" },
  { href: "/bolsa-familia", label: "Bolsa Família", match: "pillar" },
  { href: "/ferramentas", label: "Ferramentas", match: "tools" },
  { href: "/ferramentas/calendario", label: "Calendário", match: "calendar" },
  { href: "/sobre", label: "Sobre", match: "about" },
] as const;
