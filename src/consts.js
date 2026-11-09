
export const SITE = {
  // 公開URLが確定したら変更
  url: 'https://example.pages.dev',
  title: '中村しょう子 | 建築ライター・二級建築士',
  description:
    '建築士としての専門知識と工務店での実務経験を生かし、住宅・建築分野を中心に企画・取材・執筆を手がける中村しょう子のポートフォリオとブログ。',
  lang: 'ja',
  postsPerPage: 10,
};

export const AUTHOR = {
  name: '中村 しょう子',
  nameEn: 'Shoko Nakamura',
  role: '建築ライター / 二級建築士',
  tagline:
    '建築の専門知識と現場経験を、伝わる言葉に。',
  email: '9shiki28@gmail.com',
  location: '東京都',
  links: [
    // 実際のSNS・noteのURLが決まったら追加
    // { label: 'note', href: 'https://note.com/...' },
  ],
};

// お問い合わせフォーム（外部フォームサービス）
// Formspree（https://formspree.io/）でフォームを作成し、発行された URL を formAction に貼ってください。
// 例: 'https://formspree.io/f/abcdwxyz'
// 空のままだとフォームの代わりにメールアドレスが表示されます。
export const CONTACT = {
  formAction: 'https://formspree.io/f/xaeegeql',
  // フォームがあるときもメールアドレスを表示するか（迷惑メール対策のため false 推奨）
  showEmail: false,
  // 問い合わせ種別の選択肢
  topics: ['取材・執筆のご依頼', 'SEO記事・Webコンテンツのご依頼', '監修・編集のご依頼', 'その他のご相談'],
};

export const WORK_TYPES = [
  '取材記事',
  '企業広報',
  'SEO記事',
  'コラム',
  '監修・編集',
];

export const NAV = [
  { label: 'Works', ja: '実績', href: '/works/' },
  { label: 'Blog', ja: 'ブログ', href: '/blog/' },
  { label: 'About', ja: 'プロフィール', href: '/about/' },
  { label: 'Contact', ja: 'お問い合わせ', href: '/contact/' },
];
