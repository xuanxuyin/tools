// @ts-check
import { defineConfig } from 'astro/config';

// Prototype stage: no sitemap yet (added at launch with real domain).
export default defineConfig({
  build: {
    inlineStylesheets: 'always',
  },
});
