/** Contract shared by every printable page (same role as tintbrew's ScenarioDef). */
export interface PageDef {
  /** Flat URL slug, e.g. 'place-value-chart' -> /place-value-chart/ */
  slug: string;
  /** Which hub owns the page (drives breadcrumb + footer grouping). */
  hub: 'charts' | 'sight-words' | 'cursive';
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  introHeading: string;
  /** Hand-written teaching facts — the anti-thin-content layer. */
  intro: string[];
  /** Small print hint above the sheet, e.g. 'Fits one letter page, portrait.' */
  printNote: string;
  tips: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  related: { href: string; label: string }[];
  /** Interactive printable -> also gets WebApplication JSON-LD. */
  interactive?: boolean;
  /** Wide sheets (1-20 grids, number lines) print landscape. */
  landscape?: boolean;
}
