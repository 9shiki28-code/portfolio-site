// 新しい記事のひな形を作るスクリプト
//   npm run new -- my-new-post            → ブログ記事 src/content/blog/my-new-post.md
//   npm run new -- my-work --works        → 実績 src/content/works/my-work.md
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const isWork = args.includes('--works');
const slug = args.find((a) => !a.startsWith('--'));

if (!slug || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error('使い方: npm run new -- <英小文字・数字・ハイフンのファイル名> [--works]');
  console.error('例:     npm run new -- kitchen-interview');
  process.exit(1);
}

const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' }); // YYYY-MM-DD
const dir = join('src', 'content', isWork ? 'works' : 'blog');
const file = join(dir, `${slug}.md`);

if (existsSync(file)) {
  console.error(`すでに存在します: ${file}`);
  process.exit(1);
}

const blogTemplate = `---
title: タイトル
slug: ${slug}
description: 一覧や検索結果に表示される説明文（80〜120字程度）
pubDate: ${today}
tags: []
# cover: ../../assets/blog/${slug}.jpg
# coverAlt: 画像の説明
draft: true
---

本文をここに書きます。

## 見出し

`;

const workTemplate = `---
title: 記事・仕事のタイトル
slug: ${slug}
media: 掲載媒体・クライアント名
type: 取材記事
date: ${today}
summary: 一覧に表示される概要（60〜100字程度）
# url: https://掲載先のURL
tags: []
# cover: ../../assets/works/${slug}.jpg
# coverAlt: 画像の説明
featured: false
draft: true
---

<!-- 本文を書くと詳細ページが作られます。空のままなら url の掲載先へリンクします。 -->
`;

mkdirSync(dir, { recursive: true });
writeFileSync(file, isWork ? workTemplate : blogTemplate, 'utf8');
console.log(`作成しました: ${file}`);
console.log('公開するときは draft: true を削除してください。');
