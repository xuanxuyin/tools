// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domain decided 11-11 (fortunewillow.com, RDAP-verified free); site is set so
// canonical/sitemap emit launch URLs from now on (上线清单第 5 条提前执行).
export default defineConfig({
  site: 'https://fortunewillow.com',
  integrations: [sitemap()],
  // 👤 11/16 "merit按钮挡住功德箱":那条底部暗色胶囊是 Astro dev toolbar——
  // 只在 dev 存在、生产没有,但验收时它压住滚动到视口底部的功德箱,关掉
  devToolbar: { enabled: false },
  build: {
    inlineStylesheets: 'always',
  },
});
