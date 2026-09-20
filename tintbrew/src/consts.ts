export const SITE = {
  name: 'TintBrew',
  url: 'https://tintbrew.com',
  description:
    'Free online color tools. Mix colors in a perceptual color space, convert between HEX, RGB, HSL and CMYK, and see what any two colors make.',
  /** GSC verification token — public by design (rendered into page HTML) */
  gscVerification: 'l7avmRKYYEyNarRynT0jec_1G3qPCEKyjlKozdyGTpk',
  /**
   * Cloudflare Web Analytics beacon token — manual JS-snippet mode (dashboard
   * flow chosen 2026-09-20: edge auto-inject never fired for this site).
   * Do NOT also enable Automatic Setup in the dashboard — double counting.
   */
  cfBeaconToken: 'a6abcb30a8034b84b7d619bd6e67bd29',
  /** Google Analytics 4 measurement ID — public by design (rendered into gtag.js URL) */
  gaMeasurementId: 'G-5V4P4ZYYZH',
} as const;
