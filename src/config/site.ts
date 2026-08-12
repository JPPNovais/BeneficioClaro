/**
 * Configuração central do site — marca, URL e monetização.
 * Edite AQUI (e em nenhum outro lugar) para mudar nome, domínio ou AdSense.
 */
export const SITE = {
  /** Nome da marca, usado no logo, títulos e schema. */
  nome: "Benefício Claro",
  /** Slogan curto exibido no header. */
  slogan: "O dinheiro do seu trabalho, claro",
  /** URL canônica de produção (sem barra no final). */
  url: "https://beneficioclaro.com.br",
  /** Domínio "limpo" para exibição (rodapé, copyright). */
  dominio: "beneficioclaro.com.br",
  /** Idioma do conteúdo (usado em <html lang> e schema). */
  locale: "pt-BR",
  /** Descrição padrão (fallback de meta description e OG). */
  descricao:
    "Calculadoras gratuitas de rescisão, férias, 13º e salário líquido, com a memória de cálculo aberta e a base legal de cada desconto. Roda no seu aparelho.",
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

/**
 * Google Analytics 4 — medição de tráfego.
 *
 * O carregamento acontece **apenas em build de produção** (`import.meta.env.PROD`),
 * para o `npm run dev` não sujar os dados. Deixe `gaId` vazio para desligar por
 * completo (nenhum script é injetado).
 *
 * Atenção ao trocar/ligar: o GA4 usa cookies e é um tratamento de dados — tem que
 * continuar declarado na Política de Privacidade (/politica-de-privacidade).
 * As promessas de que as CALCULADORAS não enviam nada seguem verdadeiras: elas
 * rodam no navegador e o GA não recebe o que a pessoa digita nos campos.
 */
export const ANALYTICS = {
  /** ID de medição do GA4 (formato G-XXXXXXXXXX). Vazio = desligado. */
  gaId: "G-X9BEDKXSQ9",
} as const;

/**
 * Itens de navegação principal (header).
 *
 * Ordem tool-first, proposital: as calculadoras vêm antes do conteúdo porque
 * são o ativo que ranqueia e o motivo de a pessoa voltar. Os benefícios sociais
 * seguem acessíveis pelo hub /beneficios (silo secundário) — as URLs dos
 * artigos antigos não mudaram.
 */
export const NAV_PRINCIPAL = [
  { href: "/", label: "Início" },
  { href: "/ferramentas", label: "Calculadoras" },
  { href: "/trabalho", label: "Salário e rescisão" },
  { href: "/beneficios", label: "Benefícios" },
  { href: "/sobre", label: "Sobre" },
] as const;
