// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domain decided 11-11 (fortunewillow.com, RDAP-verified free); site is set so
// canonical/sitemap emit launch URLs from now on (上线清单第 5 条提前执行).
export default defineConfig({
  site: 'https://fortunewillow.com',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always',
  },
});
