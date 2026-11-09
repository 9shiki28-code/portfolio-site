import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export type Work = CollectionEntry<'works'>;

/** 公開中のブログ記事（新しい順）。開発中（npm run dev）は下書きも表示します。 */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** 公開中の実績（新しい順） */
export async function getWorks(): Promise<Work[]> {
  const works = await getCollection('works', ({ data }) => import.meta.env.DEV || !data.draft);
  return works.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** 全記事のタグと件数（件数の多い順） */
export function countTags(posts: Post[]): [string, number][] {
  const map = new Map<string, number>();
  for (const p of posts) for (const t of p.data.tags) map.set(t, (map.get(t) ?? 0) + 1);
  return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ja'));
}

/** 日本語の読了時間（1分あたり約500文字で計算） */
export function readingMinutes(body: string | undefined): number {
  if (!body) return 1;
  const text = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/[#>*_`\-\[\]\(\)]/g, '')
    .replace(/\s+/g, '');
  return Math.max(1, Math.round(text.length / 500));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Tokyo',
  }).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** 記事の本文中に出てくるタグを使ったURL（日本語タグにも対応） */
export function tagHref(tag: string): string {
  return `/blog/tags/${encodeURIComponent(tag)}/`;
}
