export const SITE = {
  name: 'ChartGlade',
  url: 'https://chartglade.com',
  description:
    'Free printable teaching charts for K-5: place value, multiplication, hundred charts, sight words and the cursive alphabet — open, print, done.',
  /** GSC verification token — fill in when the GSC Domain property is created (public by design) */
  gscVerification: 'Vhk0hhBsJZaIU0agffwwA66LLr5glJzw2P6yepbUMho',
  /** Pinterest domain-claim token (p:domain_verify) — claim flow: Settings → Link to Pinterest (2026-09-11) */
  pinterestVerification: '9e2c0ccd82c9b9e4267e65480e2a6258',
  /**
   * Cloudflare Web Analytics beacon token — leave EMPTY: analytics runs in
   * automatic-inject mode at the edge (same as tintbrew prod, avoids double counting).
   */
  cfBeaconToken: '',
  /** Google Analytics 4 measurement ID — public by design (rendered into gtag.js URL) */
  gaMeasurementId: 'G-EKH9T22FDT',
} as const;

/**
 * Site-wide content freshness date (2026-10-04 incumbent teardown: winners all
 * carry visible updated dates / sitemap lastmod; we carried none). Bump on
 * every content batch — do NOT bump for code-only deploys, or the signal
 * becomes noise. Renders as the visible "Last updated" line, JSON-LD
 * dateModified, and the sitemap lastmod (astro.config.mjs mirrors it — mjs
 * can't import this TS file).
 */
export const CONTENT_UPDATED = '2026-10-04';
