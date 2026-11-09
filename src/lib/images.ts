import type { ImageMetadata } from 'astro';

// src/assets 内の画像を、CMS が保存するパス（例: /src/assets/profile/portrait.jpg）から引けるようにする
const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{jpg,jpeg,png,webp,avif,gif}', {
  eager: true,
});

/** パスから画像を取得。見つからなければ fallback（それもなければ undefined） */
export function resolveImage(path: string | undefined | null, fallback?: string): ImageMetadata | undefined {
  const norm = (p: string) => '/' + p.replace(/^\.?\/+/, '');
  if (path && images[norm(path)]) return images[norm(path)].default;
  if (fallback && images[norm(fallback)]) return images[norm(fallback)].default;
  return undefined;
}
