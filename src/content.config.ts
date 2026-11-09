import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Pages CMS などで空欄のまま保存されると "" や null が入ることがあるため、
 * 空の値は「未入力（undefined）」として扱う。
 */
const blank = (v: unknown) => (v === '' || v === null ? undefined : v);
const optional = <T extends z.ZodTypeAny>(schema: T) => z.preprocess(blank, schema.optional());
const list = z.preprocess((v) => (v == null || v === '' ? [] : v), z.array(z.string()).default([]));
const flag = (def: boolean) => z.preprocess(blank, z.boolean().default(def));

// URL名（ファイル名と同じ英小文字・数字・ハイフン）。入れるとこの値がURLになる
const slug = optional(z.string().regex(/^[a-z0-9][a-z0-9-]*$/, 'URL名は英小文字・数字・ハイフンで入力してください'));

/**
 * ブログ記事: src/content/blog/*.md
 * URL は slug（なければファイル名）になります（例: /blog/kitchen-interview/）
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug,
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: optional(z.coerce.date()),
      tags: list,
      // 画像は src/assets/blog/ に置いて相対パスで指定（例: ../../assets/blog/xxx.jpg）
      cover: optional(image()),
      coverAlt: optional(z.string()),
      // true にすると一覧・本番ビルドに出ません（下書き）
      draft: flag(false),
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
      slug,
      media: z.string(), // 掲載媒体・クライアント
      type: z.string(), // 取材記事 / コラム / SEO記事 など
      date: z.coerce.date(),
      summary: z.string(),
      url: optional(z.string().url()), // 掲載先URL
      tags: list,
      cover: optional(image()),
      coverAlt: optional(z.string()),
      featured: flag(false), // トップページに表示
      draft: flag(false),
    }),
});

export const collections = { blog, works };
