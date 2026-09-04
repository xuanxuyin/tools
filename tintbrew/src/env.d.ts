/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Google Search Console verification token (optional; renders meta tag only when set) */
  readonly PUBLIC_GSC_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
