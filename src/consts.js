// サイト全体の設定
//
// 名前・肩書き・サイトの説明・SNSリンク・お問い合わせの選択肢は src/data/site.json にあり、
// Pages CMS の「基本情報」から編集できます。
// このファイルには、間違えるとサイトやフォームが動かなくなる設定だけを置いています。
import site from './data/site.json' with { type: 'json' };

export const SITE = {
  // 公開URL（独自ドメイン）
  url: 'https://shoko-nakamura.com',
  title: site.title,
  description: site.description,
  lang: 'ja',
  postsPerPage: 10,
};

export const AUTHOR = {
  name: site.name,
  nameEn: site.nameEn,
  role: site.role,
  location: site.location,
  // フォームを使っている間はサイトに表示されません（CONTACT.showEmail）
  email: '9shiki28@gmail.com',
  /** @type {{ label: string, href: string }[]} */
  links: (site.links ?? []).filter((l) => l && l.label && l.href),
};

// お問い合わせフォーム（外部フォームサービス）
// Formspree（https://formspree.io/）で発行された URL を formAction に設定します。
// 空のままだとフォームの代わりにメールアドレスが表示されます。
export const CONTACT = {
  formAction: 'https://formspree.io/f/xaeegeql',
  // フォームがあるときもメールアドレスを表示するか（迷惑メール対策のため false 推奨）
  showEmail: false,
  // 問い合わせ種別の選択肢（src/data/site.json の contactTopics）
  topics: (site.contactTopics ?? []).filter(Boolean),
};

export const WORK_TYPES = ['取材記事', '企業広報', 'SEO記事', 'コラム', '監修・編集', 'インタビュー'];

export const NAV = [
  { label: 'Works', ja: '実績', href: '/works/' },
  { label: 'Blog', ja: 'ブログ', href: '/blog/' },
  { label: 'About', ja: 'プロフィール', href: '/about/' },
  { label: 'Contact', ja: 'お問い合わせ', href: '/contact/' },
];
