// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/consts.js';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // 公開URL。Cloudflare Pages で発行されたURLや独自ドメインに書き換えてください（src/consts.js の SITE.url）
  site: SITE.url,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
