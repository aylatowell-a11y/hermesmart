// Product tile photography — PLACEHOLDER version for the standalone build.
//
// The real product photos (209 generated studio images) live outside the
// GitHub repo and are not bundled here, so every tile returns a clearly
// marked placeholder (warm tone + product name + "PHOTO COMING SOON") instead
// of a broken image or a glyph. See README.md for how to add the real photos.
// The exported names/signatures match the original module so App.tsx works
// unchanged.

import { photoPlaceholder } from "./placeholders";

export const PRODUCT_IMAGES: Record<string, string> = {};

export function productImageFor(p: {
  id?: number;
  name: string;
  category?: string;
  subcategory?: string;
  colors?: { name: string }[];
}): string {
  const sub = p.colors?.[0]?.name ?? p.subcategory ?? p.category ?? "";
  return photoPlaceholder(p.name, sub);
}
