export const SITE = {
  name: 'ChartGlade',
  url: 'https://chartglade.com',
  description:
    'Free printable teaching charts for K-5: place value, multiplication, hundred charts, sight words and the cursive alphabet — open, print, done.',
  /** GSC verification token — fill in when the GSC Domain property is created (public by design) */
  gscVerification: '',
  /**
   * Cloudflare Web Analytics beacon token — leave EMPTY: analytics runs in
   * automatic-inject mode at the edge (same as tintbrew prod, avoids double counting).
   */
  cfBeaconToken: '',
} as const;
