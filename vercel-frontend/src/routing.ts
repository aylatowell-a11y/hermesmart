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
  | { kind: "account" };

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
  "women|spring-summer 2026 collection": "women/ready-wear/spring-summer-collection",
  "women|spring-summer 2026": "women/ready-wear/spring-summer-collection",
  "women|dresses and skirts": "women/ready-wear/dresses-and-skirts",
  "women|scarves, shawls and stoles": "women/scarves-shawls-and-stoles",
  "women|shoes": "women/shoes",
  "women|bracelets": "women/fashion-jewelry/bracelets",
  // The women's default page (cat "women", no sub) IS the women's bags page.
  "women|": "leather-goods/bags-and-clutches/womens-bags-and-clutches",
  "leather|women's bags and clutches": "leather-goods/bags-and-clutches/womens-bags-and-clutches",
  "leather|men's bags and clutches": "leather-goods/bags-and-clutches/mens-bags-and-clutches",
  "leather|small leather goods": "leather-goods/small-leather-goods",
  "men|shoes": "men/shoes",
  "men|ready-to-wear": "men/ready-wear",
  "men|fall-winter 2026 collection": "men/ready-wear/fall-winter-collection",
  "men|fall-winter 2026": "men/ready-wear/fall-winter-collection",
  "watches|": "watches",
  "fragrances|": "fragrances-and-make-up",
  "home|": "home",
  "home|tableware": "home/tableware",
};

const REVERSE_PATHS: Record<string, { cat: string; sub?: string }> = {};
for (const [key, path] of Object.entries(CATEGORY_PATHS)) {
  const [cat = "", sub = ""] = key.split("|");
  // First writer wins: several keys share one path (e.g. the two
  // Fall-Winter spellings); the canonical sub is the full "… Collection".
  if (!REVERSE_PATHS[path]) REVERSE_PATHS[path] = sub ? { cat, sub } : { cat };
}

export const TOP_CATS = ["women", "men", "leather", "jewelry", "watches", "fragrances", "home", "equestrian", "gifts", "about"];

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
