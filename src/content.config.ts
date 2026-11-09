import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * ブログ記事: src/content/blog/*.md
 * ファイル名がそのままURLになります（例: kominka-renovation.md → /blog/kominka-renovation/）
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      // 画像は src/assets/ に置いて相対パスで指定（例: ../../assets/blog/xxx.jpg）
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // true にすると一覧・本番ビルドに出ません（下書き）
      draft: z.boolean().default(false),
    }),
});

/**
 * 実績（ポートフォリオ）: src/content/works/*.md
 * 本文を書けば詳細ページが作られ、url だけなら外部の掲載先へリンクします。
 */
const works = defineCollection({
  loader: glob({ base: './src/content/works', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      media: z.string(), // 掲載媒体・クライアント
      type: z.string(), // 取材記事 / コラム / SEO記事 など
      date: z.coerce.date(),
      summary: z.string(),
      url: z.string().url().optional(), // 掲載先URL
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      featured: z.boolean().default(false), // トップページに表示
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, works };
