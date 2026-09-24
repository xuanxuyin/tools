/// <reference types="astro/client" />

// Plain-JS modules consumed by tests (scripts/og-color.mjs, scripts/og-data.mjs).
declare module '*.mjs';

interface ImportMetaEnv {
  /** Google Search Console verification token (optional; renders meta tag only when set) */
  readonly PUBLIC_GSC_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
