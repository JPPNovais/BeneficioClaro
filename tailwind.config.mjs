/**
 * Benefício Claro — Tailwind config
 *
 * Os design tokens abaixo foram EXTRAÍDOS FIELMENTE do design de referência
 * (design system "Descomplica Renda" no Claude Design — mesma fonte da verdade
 * visual). Hex, escala tipográfica, espaçamentos, raios e sombras batem 1:1
 * com tokens/*.css do design. Os mesmos valores também existem como CSS custom
 * properties em src/styles/global.css, para que componentes possam usar tanto
 * utilitários do Tailwind quanto `var(--token)`.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx,vue,svelte}"],
  theme: {
    extend: {
      colors: {
        // --- Primary: deep emerald-green (confiança, dinheiro, "go") ---
        green: {
          50: "#E9F6F0",
          100: "#CCECE0",
          200: "#9FDAC6",
          300: "#5FBFA1",
          400: "#2BA07E",
          500: "#128068",
          600: "#0D6B57",
          700: "#0A5446",
          800: "#073E34",
          900: "#052A24",
        },
        // --- CTA: terracota-laranja quente (ação, calor) ---
        orange: {
          50: "#FDF0E7",
          100: "#FADDC9",
          200: "#F4BC95",
          300: "#EE9659",
          400: "#E5731F",
          500: "#CF5A0E",
          600: "#B44C0A",
          700: "#8F3C09",
        },
        // --- Neutros quentes (cinzas com fundo de areia) ---
        ink: {
          50: "#F7F8F2",
          100: "#F0F1EA",
          200: "#E6E7DF",
          250: "#D8DAD0",
          300: "#C5C7BB",
          400: "#9A9D8D",
          500: "#767969",
          600: "#5C5F53",
          700: "#43463D",
          800: "#2C2E27",
          900: "#1A1B17",
        },
        white: "#FFFFFF",
        // --- Semânticos ---
        info: {
          50: "#EFF5FC",
          100: "#DCEAF8",
          600: "#1D5FA8",
          700: "#154C86",
        },
        success: {
          50: "#E9F6F0",
          100: "#CCECE0",
          600: "#0D6B57",
        },
        warning: {
          50: "#FDF6E9",
          100: "#FBEBCF",
          600: "#B45309",
          700: "#92400E",
        },
        error: {
          50: "#FDEEEC",
          100: "#FBE0DD",
          600: "#C0271F",
          700: "#9B1F18",
        },
        // --- Aliases semânticos ---
        primary: {
          DEFAULT: "#0D6B57",
          strong: "#0A5446",
          soft: "#E9F6F0",
        },
        cta: {
          DEFAULT: "#CF5A0E",
          hover: "#B44C0A",
        },
        link: {
          DEFAULT: "#0A5446",
          hover: "#073E34",
        },
      },
      fontFamily: {
        heading: ['"Libre Franklin"', '"Segoe UI"', "system-ui", "-apple-system", "sans-serif"],
        body: ['"Public Sans"', '"Segoe UI"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"Public Sans"', "ui-monospace", '"Cascadia Mono"', "monospace"],
      },
      // Escala tipográfica do design. Body padrão = 18px (nunca menor no corpo).
      fontSize: {
        xs: ["0.875rem", { lineHeight: "1.45" }], // 14 — legendas, legal
        sm: ["1rem", { lineHeight: "1.45" }], // 16 — meta, labels
        base: ["1.125rem", { lineHeight: "1.65" }], // 18 — corpo (mínimo)
        lg: ["1.25rem", { lineHeight: "1.45" }], // 20 — lead
        xl: ["1.5rem", { lineHeight: "1.3" }], // 24 — H3
        "2xl": ["1.875rem", { lineHeight: "1.3" }], // 30 — H2
        "3xl": ["2.25rem", { lineHeight: "1.15" }], // 36 — H1 mobile
        "4xl": ["2.75rem", { lineHeight: "1.15" }], // 44 — H1 desktop
        "5xl": ["3.5rem", { lineHeight: "1.1" }], // 56 — hero display
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
      lineHeight: {
        tight: "1.15",
        snug: "1.3",
        normal: "1.45",
        relaxed: "1.65",
      },
      letterSpacing: {
        tight: "-0.02em",
        normal: "0",
        wide: "0.04em",
      },
      // Grade base de 4px.
      spacing: {
        0: "0",
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        // Alvos de toque (piso de acessibilidade = 44px)
        "control-sm": "40px",
        "control-min": "44px",
        "control-md": "48px",
        "control-lg": "56px",
      },
      maxWidth: {
        container: "1120px", // cap de conteúdo no desktop
        prose: "720px", // coluna de leitura do artigo
      },
      minHeight: {
        "control-min": "44px",
        "control-md": "48px",
        "control-lg": "56px",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px", // padrão: botões, inputs
        lg: "16px", // cards
        xl: "22px", // blocos de destaque, resposta rápida
        pill: "999px",
      },
      borderWidth: {
        thick: "2px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(26, 27, 23, 0.06)",
        sm: "0 1px 3px rgba(26, 27, 23, 0.08), 0 1px 2px rgba(26, 27, 23, 0.04)",
        md: "0 4px 10px rgba(26, 27, 23, 0.08), 0 1px 3px rgba(26, 27, 23, 0.05)",
        lg: "0 12px 28px rgba(26, 27, 23, 0.10), 0 4px 8px rgba(26, 27, 23, 0.05)",
        "focus-cta": "0 0 0 3px #FADDC9",
        "focus-ring": "0 0 0 3px #CCECE0",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0, 0.2, 1)",
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        fast: "120ms",
        base: "180ms",
        slow: "260ms",
      },
      backgroundImage: {
        "hero-fade": "linear-gradient(180deg, #E9F6F0, #F7F8F2)",
      },
    },
  },
  plugins: [],
};
