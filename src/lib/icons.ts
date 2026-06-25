/**
 * Fonte única dos ícones (geometria espelha o Lucide, traço 2px). Usado pelo
 * componente Icon.astro (servidor) e pelas ferramentas interativas (cliente),
 * para não duplicar o conjunto.
 */
export const ICON_PATHS: Record<string, string> = {
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  "chevron-down": '<path d="M6 9l6 6 6-6"/>',
  "chevron-right": '<path d="M9 6l6 6-6 6"/>',
  "arrow-right": '<path d="M5 12h14M13 6l6 6-6 6"/>',
  "arrow-left": '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  "file-text":
    '<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  calculator:
    '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h3"/>',
  calendar: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/>',
  "check-square": '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 12l3 3 5-6"/>',
  "hand-coins":
    '<ellipse cx="9" cy="6.5" rx="6" ry="3"/><path d="M3 6.5v4c0 1.7 2.7 3 6 3"/><circle cx="16.5" cy="15" r="5.5"/><path d="M16.5 13v4M15 14.5h2"/>',
  flame:
    '<path d="M12 3c1 3-2 4-2 7a4 4 0 008 0c0-2-1-3-1-3 .5 4-2 5-2 5 .5-3-1.5-4-1-6-2 1-2 3-2 4a5 5 0 0010 0c0-5-5-7-8-11z"/>',
  droplet: '<path d="M12 3c4 5 7 8 7 12a7 7 0 01-14 0c0-4 3-7 7-12z"/>',
  "graduation-cap":
    '<path d="M3 9l9-4 9 4-9 4-9-4z"/><path d="M7 11v5c0 1 2 2.5 5 2.5s5-1.5 5-2.5v-5M21 9v5"/>',
  "shield-check":
    '<path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M5 21c0-4 3-6 7-6s7 2 7 6"/>',
  phone: '<path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  "external-link":
    '<path d="M14 4h6v6M20 4l-9 9M18 13v6a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  "alert-triangle": '<path d="M12 4l9 16H3l9-16z"/><path d="M12 10v4M12 17h.01"/>',
  list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  "book-open":
    '<path d="M12 6c-1.5-1-4-1.5-7-1v13c3-.5 5.5 0 7 1 1.5-1 4-1.5 7-1V5c-3-.5-5.5 0-7 1z"/><path d="M12 6v13"/>',
  wallet:
    '<path d="M3 7a2 2 0 012-2h12v4M3 7v10a2 2 0 002 2h14a2 2 0 002-2v-7H6a2 2 0 01-2-2z"/><path d="M17 13h.01"/>',
  "piggy-bank":
    '<path d="M4 11a6 6 0 016-6h2a6 6 0 016 6v1l2 1v3l-2 .5A6 6 0 0114 19v2h-2v-1.5A6 6 0 014 14z"/><path d="M9 9h3M6 13h.01"/>',
  "credit-card": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
  "trending-up": '<path d="M3 16l5-5 4 4 8-8"/><path d="M21 7v5h-5"/>',
  heart: '<path d="M12 20s-7-4.5-7-9.5A3.5 3.5 0 0112 6a3.5 3.5 0 017 4.5C19 15.5 12 20 12 20z"/>',
  "map-pin": '<path d="M12 21c5-5 7-8 7-11a7 7 0 10-14 0c0 3 2 6 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  send: '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z"/>',
  download: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
};
