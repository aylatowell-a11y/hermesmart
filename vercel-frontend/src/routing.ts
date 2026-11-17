// Real URLs for categories, products and the contact page (History API
// routing), matching the original hermes.com URL shape:
// /us/en/category/<path>/, /us/en/product/<slug>-<REF>/ and
// /us/en/contact-us/. Deep links are served by vercel.json rewrites (every
// app path serves index.html) and parsed back here on load and on popstate.
// Views that cannot be routed safely (cart, checkout, admin, info
// pages other than contact, about) are left unrouted: navigating to them
// does not push a history entry, so browser Back returns to the last
// routed view. Nothing here invents products, prices or copy — the known
// category paths below are the original's own URLs, verified live
// 2026-11-11; anything else uses the same shape with a slugified name.

export type ParsedRoute =
  | { kind: "home" }
  | { kind: "category"; cat: string; sub?: string }
  | { kind: "product"; id: number }
  | { kind: "faq"; topic: string }
  | { kind: "contact" }
  | { kind: "account" }
  | { kind: "cart" }
  | { kind: "bespoke" };

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

// Original hermes.com category URLs, verified live 2026-11-11 (Fall-Winter
// collection page + the 13 extracted categories). Key is
// `${cat}|${sub.toLowerCase()}` where cat/sub are this store's view values.
const CATEGORY_PATHS: Record<string, string> = {
  "women|belts": "women/belts",
  "women|fall-winter 2026 collection": "women/ready-wear/fall-winter-collection",
  "women|fall-winter 2026": "women/ready-wear/fall-winter-collection",
  "women|spring-summer 2027 collection": "women/ready-wear/spring-summer-collection",
  "women|spring-summer 2027": "women/ready-wear/spring-summer-collection",
  "women|spring-summer 2026 collection": "women/ready-wear/spring-summer-collection",
  "women|spring-summer 2026": "women/ready-wear/spring-summer-collection",
  "women|dresses and skirts": "women/ready-wear/dresses-and-skirts",
  // The desktop WOMEN menu's "Dresses" item resolves to sub "Dresses"
  // (MEGA_DESKTOP_WOMEN), whose URL is /women/dresses/. Without this
  // entry a direct load of that URL fell through to the women's default
  // page (bags [45]) — the same failure the RTW parent had (2026-11-17:
  // cart Back landed on /women/dresses/ and showed bags).
  "women|dresses": "women/dresses",
  // The women's RTW PARENT page (2026-11-16): the original's own URL is
  // /women/ready-wear/ (no "to"). Without this entry the slug fell through
  // to the generic matcher, found no sub called "ready-wear", and rendered
  // the women's default page (bags [45]) instead of the [421] parent list.
  "women|ready-to-wear": "women/ready-wear",
  // Women's Hair accessories page (2026-11-16) — the original's own
  // URL is /women/hair-accessories/ (26 tiles, hairPos order).
  "women|hair accessories": "women/hair-accessories",
  // Group 4 (2026-11-17) — the women's Hats and gloves page: the
  // original's own URL is /women/accessories/ (the menu heading is
  // "Hats and gloves"). "women|hats and gloves" is listed FIRST so the
  // reverse lookup of /women/accessories/ returns sub "Hats and
  // gloves" (REVERSE_PATHS is first-writer-wins); "women|accessories"
  // keeps a direct sub-"Accessories" view on the same URL. The old
  // generic URL /women/hats-and-gloves/ still resolves to the same
  // view via the generic matcher — no duplicate page.
  "women|hats and gloves": "women/accessories",
  "women|accessories": "women/accessories",
  // Women's Ballet flats page (Group 1, 2026-11-17) — the original's
  // own URL /women/shoes/ballet-flats/ (42 tiles, balletPos order).
  "women|ballet flats": "women/shoes/ballet-flats",
  // Women's Twilly page (Group 1, 2026-11-17) — the original's own
  // URL /women/scarves-shawls-and-stoles/twillys-and-other-small-formats/
  // (96 tiles, twillyPos order).
  "women|twilly and other small formats": "women/scarves-shawls-and-stoles/twillys-and-other-small-formats",
  "women|scarves, shawls and stoles": "women/scarves-shawls-and-stoles",
  "women|shoes": "women/shoes",
  "fashion-jewelry|": "women/fashion-jewelry",
  "fashion-jewelry|bracelets": "women/fashion-jewelry/bracelets",
  "fashion-jewelry|earrings": "women/fashion-jewelry/earrings",
  "fashion-jewelry|necklaces": "women/fashion-jewelry/necklaces",
  "fashion-jewelry|rings": "women/fashion-jewelry/rings",
  "fashion-jewelry|pins and brooches": "women/fashion-jewelry/pins-and-brooches",
  "fashion-jewelry|hair accessories and combs": "women/fashion-jewelry/hair-accessories-and-combs",
  "fashion-jewelry|hairbands and hatbands": "women/fashion-jewelry/hairbands-and-hatbands",
  "women|bracelets": "women/fashion-jewelry/bracelets",
  // The women's default page (cat "women", no sub) IS the women's bags page.
  "women|": "leather-goods/bags-and-clutches/womens-bags-and-clutches",
  "leather|women's bags and clutches": "leather-goods/bags-and-clutches/womens-bags-and-clutches",
  "leather|men's bags and clutches": "leather-goods/bags-and-clutches/mens-bags-and-clutches",
  "leather|small leather goods": "leather-goods/small-leather-goods",
  // Leather Accessories / Luggage sub-pages (2026-11-17) — the original's
  // own URLs. Charms / Travel accessories / Suitcases are the new pages;
  // Straps + Reading and writing get entries too so the Charms sub-nav
  // siblings link to the original's URLs (not the generic /leather/ slugs).
  "leather|charms": "leather-goods/accessories/charms",
  "leather|straps": "leather-goods/accessories/straps",
  "leather|reading and writing": "leather-goods/accessories/reading-and-writing",
  // Group 4 (2026-11-17) — the Accessories / Luggage PARENT pages:
  // the original's own URLs are /leather-goods/accessories/ and
  // /leather-goods/luggage/ (the sub-pages hang under them). The old
  // generic URLs /leather/accessories/ and /leather/luggage/ still
  // resolve to the same views via the generic matcher (the headings
  // are in the leather NAV subs), so no duplicate page is created.
  "leather|accessories": "leather-goods/accessories",
  "leather|luggage": "leather-goods/luggage",
  "leather|travel accessories": "leather-goods/luggage/travel-accessories",
  "leather|suitcases and travel bags": "leather-goods/luggage/suitcases-and-travel-bags",
  "men|shoes": "men/shoes",
  "men|ready-to-wear": "men/ready-wear",
  "men|fall-winter 2026 collection": "men/ready-wear/fall-winter-collection",
  "men|fall-winter 2026": "men/ready-wear/fall-winter-collection",
  "watches|": "watches",
  "fragrances|": "fragrances-and-make-up",
  // Fragrances sub-pages (2026-11-17) — the original's own URLs
  // (/fragrances/art-living/ is the Bath page; /fragrances/women/ and
  // /fragrances/men/ are the universes; the make-up sub-pages live
  // under /make-up/). Without these the generic slug fallback resolved
  // some of them, but Bath had no route at all (the Bath [0] bug).
  "fragrances|bath": "fragrances/art-living",
  "fragrances|the women's universe": "fragrances/women",
  "fragrances|the men's universe": "fragrances/men",
  "fragrances|hermessence collection": "fragrances/hermessence-collection",
  "fragrances|fragrances": "fragrances",
  "fragrances|make-up": "make-up",
  "fragrances|lips": "make-up/lips",
  "fragrances|face": "make-up/face",
  "fragrances|eyes": "make-up/eyes",
  "fragrances|hands": "make-up/hands",
  "fragrances|accessories": "make-up/accessories",
  "home|": "home",
  "home|tableware": "home/tableware",
  // Home Tech universe page (2026-11-17) — the original's own URL
  // /home-art-living/tech-universe/ (40 tiles, techPos order).
  "home|tech universe": "home-art-living/tech-universe",
  // Group 1 Home pages (2026-11-17) — the original's own URLs.
  // Furniture 161 tiles (furnPos), Cases 96 (casesPos), Office 139
  // (officePos), Children 70 (childPos).
  "home|furniture, lighting and rugs": "home/furniture-and-lighting",
  "home|cases and bath linens": "home/cases-and-bath-linen",
  "home|office and writing": "home/office-and-writing",
  "home|children and baby": "home-art-living/children-and-baby",
  // Group 3 Home pages (2026-11-17) — the original's own URLs.
  // Decorative objects 279 tiles (objectsPos), Blankets and pillows
  // 153 (textilesPos) — the menu item RETARGETS here from the old
  // /home/blankets-and-pillows/ slug (the old URL still resolves to
  // the same view via the generic slug match, so it shows [153] too,
  // not a duplicate page). Sports and outdoor 48 (sportsPos), Beach
  // 108 (beachPos).
  "home|decorative objects and games": "home/objects",
  "home|blankets and pillows": "home/textiles",
  "home|sports and outdoor": "home-art-living/sports-and-outdoor",
  "home|beach": "home-art-living/beach",
  // Equestrian Horse / Rider sub-pages (2026-11-17) — the original's
  // own URLs; without these the generic slug fallback still resolved
  // them, but the explicit entries keep the routing table truthful.
  "equestrian|horse": "equestrian/horse",
  "equestrian|rider": "equestrian/rider",
  // Jewelry Collections sub-pages (Group 1, 2026-11-17) — the
  // original's own URLs. The Wonders 19 tiles (wondersPos), Precious
  // moments 21 (preciousPos).
  "jewelry|the wonders": "jewelry/collections/wonders",
  "jewelry|precious moments": "jewelry/collections/precious-moments",
  "jewelry|collections": "jewelry/collections",
  "jewelry|chaînes d'ancre": "jewelry/collections/chaine-d-ancre",
};

const REVERSE_PATHS: Record<string, { cat: string; sub?: string }> = {};
for (const [key, path] of Object.entries(CATEGORY_PATHS)) {
  const [cat = "", sub = ""] = key.split("|");
  // First writer wins: several keys share one path (e.g. the two
  // Fall-Winter spellings); the canonical sub is the full "… Collection".
  if (!REVERSE_PATHS[path]) REVERSE_PATHS[path] = sub ? { cat, sub } : { cat };
}

export const TOP_CATS = ["women", "men", "leather", "jewelry", "fashion-jewelry", "watches", "fragrances", "home", "equestrian", "gifts", "about"];

export function categoryUrl(cat: string, sub?: string): string {
  const key = `${cat}|${(sub ?? "").toLowerCase()}`;
  const known = CATEGORY_PATHS[key];
  if (known) return `/us/en/category/${known}/`;
  const slug = sub ? slugify(sub) : "";
  return slug ? `/us/en/category/${cat}/${slug}/` : `/us/en/category/${cat}/`;
}

export function productUrl(name: string, refCode: string, id: number): string {
  const ref = (refCode || "").replace(/\s+/g, "");
  const slug = slugify(name);
  if (ref) return `/us/en/product/${slug ? `${slug}-` : ""}${ref}/`;
  return `/us/en/product/${slug ? `${slug}-` : ""}${id}/`;
}

// The original's contact page URL, verified live 2026-11-11.
export function contactUrl(): string {
  return "/us/en/contact-us/";
}

// The original's bespoke equestrian editorial page, verified live
// 2026-11-17 (the Equestrian menu's SADDLES item links here, not to a
// product listing).
export function bespokeUrl(): string {
  return "/us/en/content/344534-bespoke-equestrian/";
}

// The account page URL — a direct load of /us/en/account/ used to render
// the homepage (parseUrl returned null for it), so the account view only
// appeared after clicking the header Account icon at the same URL.
export function accountUrl(): string {
  return "/us/en/account/";
}

// The original's FAQ topic URL, verified live 2026-11-12 (Payment page).
// Only "payment" has a built FAQ page so far; other topics are not routed.
export function faqUrl(topic: string): string {
  return `/us/en/faq/online-shopping/${slugify(topic)}/`;
}

// The product ref embedded in a product URL path, if the path is one.
export function productRefFromPath(path: string): string | null {
  const clean = path.split("?")[0]?.split("#")[0] ?? "";
  const m = clean.replace(/\/+$/, "").match(/\/us\/en\/product\/([^/]+)$/);
  if (!m || !m[1]) return null;
  const last = m[1].split("-").pop() ?? "";
  return last || null;
}

export function parseUrl(
  path: string,
  products: { id: number; refCode: string }[],
  subsByCat: Record<string, string[]>,
): ParsedRoute | null {
  let clean = (path.split("?")[0]?.split("#")[0] ?? "").replace(/^\/+/, "").replace(/\/+$/, "");
  if (clean === "") return { kind: "home" };
  if (clean.startsWith("us/en/")) clean = clean.slice("us/en/".length);
  if (clean === "") return { kind: "home" };
  if (clean === "contact-us") return { kind: "contact" };
  if (clean === "account") return { kind: "account" };
  if (clean === "content/344534-bespoke-equestrian") return { kind: "bespoke" };
  // The cart is a full page on the original (/us/en/cart/) — routed so
  // browser Back from it returns to the page the user came from
  // (2026-11-17: unrouted, Back skipped the product page entirely).
  if (clean === "cart") return { kind: "cart" };
  if (clean.startsWith("faq/online-shopping/")) {
    const topic = clean.slice("faq/online-shopping/".length).split("/")[0] ?? "";
    // Only the Payment FAQ page is built so far; other topics fall back
    // to home rather than rendering an empty FAQ page.
    if (topic === "payment") return { kind: "faq", topic };
    return null;
  }
  if (clean.startsWith("product/")) {
    const seg = clean.slice("product/".length).split("/")[0] ?? "";
    const tail = seg.split("-").pop() ?? "";
    if (!tail) return null;
    // Match by ref code first (spaces stripped); fall back to a bare id.
    const byRef = products.find((p) => (p.refCode || "").replace(/\s+/g, "").toLowerCase() === tail.toLowerCase());
    if (byRef) return { kind: "product", id: byRef.id };
    if (/^\d+$/.test(tail)) {
      const byId = products.find((p) => p.id === Number(tail));
      if (byId) return { kind: "product", id: byId.id };
    }
    return null;
  }
  if (clean.startsWith("category/")) {
    const rest = clean.slice("category/".length);
    const known = REVERSE_PATHS[rest];
    if (known) return { kind: "category", cat: known.cat, sub: known.sub };
    const segs = rest.split("/").filter(Boolean);
    const cat = segs[0] ?? "";
    if (!TOP_CATS.includes(cat)) return null;
    if (segs.length === 1) return { kind: "category", cat };
    const subSlug = segs.slice(1).join("/");
    const candidates = subsByCat[cat] ?? [];
    const match = candidates.find((s) => slugify(s) === subSlug);
    if (match) return { kind: "category", cat, sub: match };
    // Unknown sub slug: fall back to the category landing rather than home.
    return { kind: "category", cat };
  }
  return null;
}
