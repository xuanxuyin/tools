// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://chartglade.com',
  integrations: [sitemap()],
  build: {
    // CSS is small — inline it to eliminate render-blocking requests entirely.
    inlineStylesheets: 'always',
  },
});
