// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://chartglade.com',
  integrations: [
    sitemap({
      // freshness signal (2026-10-04 incumbent teardown): sitemap lastmod.
      // Mirrors src/consts.ts CONTENT_UPDATED (mjs can't import the TS file) —
      // bump BOTH on content batches only, never on code-only deploys.
      serialize: (item) => ({ ...item, lastmod: new Date('2026-10-04') }),
    }),
  ],
  build: {
    // CSS is small — inline it to eliminate render-blocking requests entirely.
    inlineStylesheets: 'always',
  },
});
