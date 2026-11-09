// Per-view gallery photography — PLACEHOLDER version for the standalone build.
//
// The real per-view photos are not bundled (see placeholders.ts), so every
// gallery view returns a clearly-marked placeholder whose label matches the
// view (Front / Worn / Side / Back / Detail / Above / Video). The view
// labels themselves come from the product's stored galleryViews (the audited
// data) or, when a product has none, from a type-based default set — so the
// gallery keeps the right number and order of views. A "Video" label keeps
// video: true so the product page still shows the video slot (its poster is
// the placeholder). Exported names/signatures match the original module.

import { photoPlaceholder } from "./placeholders";

export type GalleryProduct = {
  name: string;
  category?: string;
  subcategory?: string;
  colors?: { name: string }[];
};

const TYPE_LABELS: Record<string, string[]> = {
  bag: ["Front", "Side", "Above", "Back"],
  shoe: ["Front", "Worn", "Side", "Back", "Detail", "Above"],
  watch: ["Front", "Side", "Detail", "Worn on wrist", "Back"],
  perfume: ["Front", "Detail", "Side", "Bottle + orange box"],
  jewelry: ["Front", "Worn", "Detail"],
  scarf: ["Flat", "Worn", "Detail"],
  belt: ["Front", "Worn", "Detail"],
  blanket: ["Front", "Folded", "In situ", "Detail"],
  dress: ["Worn", "Worn", "Worn", "Worn", "Detail"],
  rtw: ["Front", "Worn", "Back", "Detail"],
  generic: ["Front", "In situ", "Detail"],
};

function defaultLabels(p: GalleryProduct): string[] {
  const sub = (p.subcategory ?? "").toLowerCase();
  const n = p.name.toLowerCase();
  if (/blanket|throw/.test(n) || sub.includes("blanket")) return TYPE_LABELS.blanket ?? ["Front", "Detail"];
  if (p.category === "watches" || /watch/.test(n)) return TYPE_LABELS.watch ?? ["Front", "Detail"];
  if (sub.includes("perfume") || (p.category === "fragrances" && !/lip|eye|nail|make-up|makeup/.test(n))) return TYPE_LABELS.perfume ?? ["Front", "Detail"];
  if (sub.includes("scarf") || sub.includes("scarves") || /scarf|twilly|shawl|stole/.test(n)) return TYPE_LABELS.scarf ?? ["Flat", "Detail"];
  if (sub === "shoes" || /sneaker|boot|loafer|mule|derby|sandal|espadrille|pump|ballerina/.test(n)) return TYPE_LABELS.shoe ?? ["Front", "Detail"];
  if (sub === "belts" || /belt/.test(n)) return TYPE_LABELS.belt ?? ["Front", "Detail"];
  if (sub.includes("dress") || /dress|skirt|caftan/.test(n)) return TYPE_LABELS.dress ?? ["Worn", "Detail"];
  if (p.category === "jewelry" || /necklace|bracelet|earring|bangle|\bring\b/.test(n)) return TYPE_LABELS.jewelry ?? ["Front", "Detail"];
  if (sub.includes("bag") || sub.includes("leather") || /bag|tote|sac|kelly|birkin|picotin|bolide|clutch|pouch|wallet|case/.test(n)) return TYPE_LABELS.bag ?? ["Front", "Detail"];
  if (sub.includes("ready") || p.category === "women" || p.category === "men" || p.category === "equestrian") return TYPE_LABELS.rtw ?? ["Front", "Detail"];
  if (p.category === "home") return TYPE_LABELS.blanket ?? ["Front", "Detail"];
  return TYPE_LABELS.generic ?? ["Front", "Detail"];
}

export function galleryForProduct(
  p: GalleryProduct & { galleryViews?: string[] },
  _colorIndex: number,
): { label: string; src: string; video: boolean }[] {
  const labels = (p.galleryViews && p.galleryViews.length >= 2)
    ? p.galleryViews
    : defaultLabels(p);
  return labels.map((label, i) => {
    const video = label === "Video";
    // Include the view number so repeated labels (e.g. several "Worn")
    // still get distinct placeholders.
    const caption = labels.filter((l) => l === label).length > 1
      ? `${label} · view ${i + 1} of ${labels.length}`
      : `${label} · ${p.name}`;
    return { label, src: photoPlaceholder(p.name, caption), video };
  });
}
