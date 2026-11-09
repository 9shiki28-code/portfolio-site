# 建築ライター ポートフォリオ兼ブログ（Astro）

Markdownで記事と実績を管理する、サーバー保守不要の静的サイトです。
ビルドするとHTMLファイルだけになるので、Cloudflare Pagesなどの無料ホスティングで公開できます。
サイトの中身（記事・設定・画像）はすべてこのフォルダの中にあり、ローカルに残ります。

> 名前・経歴・記事・実績は、すべて**仮の内容**です。下の「最初に書き換える場所」から差し替えてください。

---

## フォルダ構成

```
portfolio-site/
├─ src/
│  ├─ consts.js              ← 名前・肩書き・メール・SNS・公開URL（最初にここを編集）
│  ├─ content/
│  │  ├─ blog/               ← ブログ記事（1記事 = 1つの .md ファイル）
│  │  └─ works/              ← 実績（1件 = 1つの .md ファイル）
│  ├─ assets/                ← 記事や実績で使う画像（自動で最適化されます）
│  ├─ pages/                 ← ページのテンプレート（about.astro に経歴があります）
│  ├─ components/ layouts/   ← 共通パーツ
│  └─ styles/global.css      ← 色・書体（先頭の :root を変えると全体が変わります）
├─ public/                   ← そのまま配信するファイル（favicon, robots.txt）
├─ scripts/new-post.mjs      ← 記事のひな形を作るスクリプト
└─ dist/                     ← ビルド結果（公開するのはこの中身。自動生成なので編集不要）
```

## ページ一覧

| URL | 内容 |
| --- | --- |
| `/` | トップ（キャッチコピー・主な実績・最新ブログ・プロフィール） |
| `/works/` | 実績一覧（種類で絞り込み） |
| `/works/<ファイル名>/` | 実績の詳細（本文を書いた実績のみ） |
| `/blog/`, `/blog/2/` … | ブログ一覧（10件ごとに自動でページ分割） |
| `/blog/<ファイル名>/` | ブログ記事（目次・読了時間・前後の記事つき） |
| `/blog/tags/<タグ>/` | タグ別の記事一覧 |
| `/about/` `/contact/` | プロフィール、お問い合わせ |
| `/rss.xml` `/sitemap-index.xml` | RSS、サイトマップ（自動生成） |

---

## 最初に書き換える場所

1. **`src/consts.js`** … 名前、肩書き、紹介文、メールアドレス、SNSのURL、公開URL（`url`）
2. **`src/pages/about.astro`** … 経歴・対応できる仕事・資格
3. **`src/pages/index.astro`** … トップページの紹介文
4. **`src/content/blog/` と `src/content/works/`** … サンプルを削除して自分の記事・実績を追加
5. **`public/robots.txt`** … 公開URLが決まったら `example.pages.dev` を書き換え

---

## ブラウザで編集する（Pages CMS）

[Pages CMS](https://app.pagescms.org/) にGitHubでログインし、`portfolio-site` を選ぶと、ブログ記事と実績をブラウザで追加・編集できます。
保存すると GitHub に記録され、Cloudflare が自動で公開します（1〜2分）。編集画面の設定は `.pages.yml` にあります。

- **URL名（slug）** は英小文字・数字・ハイフンで入力します。記事のURLとファイル名になるので、公開後は変えないでください
- **新しいブログ記事は「下書き」がオンの状態で始まります**。書き終えたらオフにして保存すると公開されます
- 画像はブログ用が `src/assets/blog/`、実績用が `src/assets/works/` に保存され、表示時に自動で軽量化されます
- 「トップページ」「プロフィール」「ページの紹介文」「基本情報」のメニューでは、各ページの文章・経歴・資格・写真・SNSリンクなどを編集できます（中身は `src/data/` の JSON ファイル）
- サイトのURL、お問い合わせフォームの送信先、メールアドレスは、誤って変えないよう CMS には出していません（`src/consts.js` で編集）

CMSで編集したあとにこのPCのファイルを編集するときは、先に `git pull` で最新の状態を取り込んでください。

## 日々の使い方

PowerShellでこのフォルダを開いてから実行します。

### 手元で表示を確認する

```bash
npm run dev
```

ブラウザで http://localhost:4321 を開きます。ファイルを保存すると自動で反映されます（終了は Ctrl + C）。
開発中は下書き（`draft: true`）の記事も表示されます。

### ブログ記事を追加する

```bash
npm run new -- kitchen-interview
```

`src/content/blog/kitchen-interview.md` ができるので、タイトルと本文を書きます。
ファイル名がそのままURL（`/blog/kitchen-interview/`）になるので、英小文字・数字・ハイフンで付けてください。
公開するときは `draft: true` の行を削除します。

記事の先頭（frontmatter）の項目:

```yaml
---
title: 記事タイトル
description: 一覧や検索結果に出る説明文
pubDate: 2026-11-09
updatedDate: 2026-11-20          # 任意：更新日
tags: [取材ノート, リノベーション]
cover: ../../assets/blog/xxx.jpg  # 任意：アイキャッチ画像
coverAlt: 画像の説明
draft: true                      # 任意：下書き
---
```

### 実績を追加する

```bash
npm run new -- house-in-hayama --works
```

- 本文を書くと、サイト内に詳細ページ（担当したこと・記事のポイントなど）ができます
- 本文が空なら、一覧のカードは `url` に書いた掲載先へ直接リンクします
- `featured: true` にした実績がトップページの「主な実績」に表示されます（最大3件）
- `type` は「取材記事」「コラム」「SEO記事」「インタビュー」など自由に書けます（一覧の絞り込みに使われます）

### 画像を使う

画像は `src/assets/blog/` や `src/assets/works/` に置き、記事からは相対パスで指定します。
ビルド時に自動でWebP化・リサイズされます。

```markdown
![撮影した外観](../../assets/blog/exterior.jpg)
```

※ 取材写真は、撮影者・掲載媒体の使用許諾を確認してから掲載してください。

---

## 公開する（Cloudflare Pages・無料）

まず手元でビルドが通るか確認します。

```bash
npm run build
```

`dist/` フォルダができれば成功です。公開方法は次のどちらかです。

### 方法A：GitHub と連携して自動公開（おすすめ）

記事を書いて GitHub に push するだけで、自動でビルド・公開されます。GitHub がそのままバックアップにもなります。

1. Git はインストール済み、このフォルダも Git リポジトリ（ブランチ `main`）になっています
2. GitHub に非公開（Private）リポジトリを作り、このフォルダを push

   ```bash
   git add -A
   git commit -m "記事を追加"
   git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
   git push -u origin main
   ```

   2回目以降は `git add -A` → `git commit -m "..."` → `git push` だけです。
3. Cloudflare ダッシュボード → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** でリポジトリを選択
4. ビルド設定:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
5. 発行された `https://xxxx.pages.dev` を `src/consts.js` の `url` と `public/robots.txt` に書いて、もう一度 push

### 方法B：手元でビルドしてアップロード

Git を使わない方法です。

- **ダッシュボードから**：Workers & Pages → Create → Pages → **Upload assets** で `dist` フォルダをドラッグ＆ドロップ
- **コマンドで**：`npx wrangler pages deploy dist`（初回はブラウザで Cloudflare にログイン）

記事を更新するたびに `npm run build` → アップロード、を繰り返します。

### 独自ドメイン

Cloudflare Pages のプロジェクト → **Custom domains** から設定できます（ドメイン代のみ）。

---

## バックアップとデータの持ち方

- サイトの元データは `src/` と `public/` と設定ファイルだけです。このフォルダをそのままコピーすれば丸ごと保存できます
- `node_modules/` と `dist/` は自動生成なので保存不要です（`npm install` / `npm run build` で再作成できます）
- 方法Aを使うと、GitHub に変更履歴つきで自動的に残ります

## サーバー保守について

公開されるのはHTML・CSS・画像だけで、データベースやPHPはありません。
WordPress のような本体・プラグインの更新作業やセキュリティパッチは不要です。
年に1回程度 `npm update` で Astro を更新すれば十分です（しなくてもサイトは動き続けます）。

---

## このPC固有の設定について

このPCでは Windows のアプリ制御（Smart App Control など）が Rollup のネイティブモジュールをブロックするため、
`package.json` の `overrides` で WebAssembly 版の Rollup（`@rollup/wasm-node`）を使うようにしています。
動作は同じで、ビルドが少し遅くなるだけです。Cloudflare 上のビルドでもそのまま動きます。

## お問い合わせフォーム（Formspree）

`/contact/` のフォームは外部サービス [Formspree](https://formspree.io/) に送信します。サーバーは不要で、送信内容はメールで届きます（無料プランは月50件まで）。

1. Formspree にアカウント登録し、**New Form** でフォームを作成（通知先は受け取りたいメールアドレス）
2. 発行された `https://formspree.io/f/xxxxxxxx` を `src/consts.js` の `CONTACT.formAction` に貼る
3. 公開後のサイトから一度テスト送信し、初回に届く確認メールで承認する

- `formAction` が空のあいだは、フォームの代わりにメールアドレスが表示されます
- フォームがあるときはメールアドレスを表示しません（迷惑メール対策）。表示したい場合は `showEmail: true`
- ご用件の選択肢は `CONTACT.topics` で変更できます
- スパム対策の隠し欄（`_gotcha`）を入れてあります。迷惑な送信が多ければ Formspree 側の設定で reCAPTCHA を有効にできます
- 他のサービス（Getform、Formcarry など）でも、送信先URLを差し替えるだけで使えます
