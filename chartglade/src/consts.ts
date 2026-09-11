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
} as const;
