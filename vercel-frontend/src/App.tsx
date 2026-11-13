import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type ApiResponse, type LocalChat } from "./api";
// Real photos: the image files are in ./assets/ (uploaded to the repo).
// Original Hermes hero photo (hermes.com homepage, verified 2026-11-10):
// black-and-white triangular tiled bench + blue patterned blanket on a beige
// stone wall. Desktop 16:9, mobile 9:16 (the crop hermes.com serves ≤1023px).
const heroBenchImg = "https://assets.hermes.com/is/image/hermesedito/cover_maison_167?fit=wrap%2C0&wid=1920&resMode=sharp2&op_usm=1%2C1%2C6%2C0";
const heroBenchImgMobile = "https://assets.hermes.com/is/image/hermesedito/Cover_maison_mobile?fit=wrap%2C0&wid=767&resMode=sharp2&op_usm=1%2C1%2C6%2C0";
// Original Hermes Baladeur poster (hermes.com homepage, verified 2026-11-10):
// woman + bicycle + large white Afghan hound in front of a desert screen.
// The video itself is served from public/videos/ as MP4 (see BOARD d).
const baladeurPosterImg = "https://assets.hermes.com/is/image/hermesedito/Hero_Baladeur_Cover_16x9?fit=wrap%2C0&wid=1920&resMode=sharp2&op_usm=1%2C1%2C6%2C0";
const baladeurPosterImgMobile = "https://assets.hermes.com/is/image/hermesedito/Hero_Baladeur_Cover_9x16?fit=wrap%2C0&wid=767&resMode=sharp2&op_usm=1%2C1%2C6%2C0";
// Original Hermes Kelly editorial (hermes.com homepage, verified 2026-11-10):
// two stacked gold Kelly RINGS (one plain, one diamond-pavé) on an orange /
// terracotta background. "Bague" = ring — this is what hermes.com shows for
// the Kelly story text; there is no bracelet version on the homepage.
const kellyRingsImg = "https://assets.hermes.com/is/image/hermesedito/Bague_Kelly_Push_2_Nov_Phase_1_16x9?fit=wrap%2C0&wid=1920&resMode=sharp2&op_usm=1%2C1%2C6%2C0";
const kellyRingsImgMobile = "https://assets.hermes.com/is/image/hermesedito/Bague_Kelly_Push_2_Nov_Phase_1_9x16?fit=wrap%2C0&wid=767&resMode=sharp2&op_usm=1%2C1%2C6%2C0";
import carriageBlackImg from "./assets/hermes-carriage-black.png";
import carriageWhiteImg from "./assets/hermes-carriage-white.png";
import logoBlackImg from "./assets/hermes-logo-black.png";
import logoWhiteImg from "./assets/hermes-logo-white.png";
import loadingHorseTrotGif from "./assets/loading-horse-trot.gif";
import loadingHorseJumpRunGif from "./assets/loading-horse-jump-run.gif";
import loadingHorseGallopGif from "./assets/loading-horse-gallop.gif";
// Mega-menu category photos — one distinct photo per nav category.
import riderJacketImg from "./assets/products/rider-jacket.webp";
import mensLeatherJacketImg from "./assets/products/mens-leather-jacket.webp";
import chaineNecklaceImg from "./assets/products/chaine-dancre-necklace.webp";
import capeCodImg from "./assets/products/cape-cod-large.webp";
import muscPallidaImg from "./assets/products/musc-pallida.webp";
import avalonBlanketImg from "./assets/products/avalon-blanket.webp";
import saddleBridleImg from "./assets/products/saddle-bridle.webp";
import scarfColliersImg from "./assets/products/scarf-90-colliers.webp";
import { fileToBase64 } from "./fileToBase64";
import { productImageFor } from "./productImages";
import { galleryForProduct, hiResHermes } from "./galleryImages";
import { accountUrl, categoryUrl, contactUrl, faqUrl, parseUrl, productRefFromPath, productUrl } from "./routing";

type Product = ApiResponse<typeof api, "getStorefront">["products"][number];
type Settings = ApiResponse<typeof api, "getStorefront">["settings"];
type View =
  | { t: "home" } | { t: "category"; cat: string; sub?: string }
  | { t: "product"; id: number } | { t: "page"; page: string }
  | { t: "faq"; topic: string }
  | { t: "account"; mode?: "login" | "signup" } | { t: "checkout" } | { t: "admin" } | { t: "about" } | { t: "cart" };
type CartItem = { key: string; productId: number; name: string; price: number; qty: number; color: string; size: string; glyph: string; tone: string; refCode: string };

type MegaSection = { heading: string; items: string[] };
type MegaEntry = { key: string; label: string; caption: string; tone: string; glyph: string; img: string; columns: MegaSection[][] };
const MEGA_RAW: MegaEntry[] = [
  { key: "women", label: "WOMEN", caption: "SPRING-SUMMER 2027 RUNWAY SHOW", tone: "#e85d1f", glyph: "👗", img: "runway", columns: [
    [{ heading: "READY-TO-WEAR", items: ["Fall-Winter 2026 Collection","Spring-Summer 2026 Collection","Coats and jackets","Leather","Dresses and skirts","Tops and shirts","Pants and shorts","Knitwear and twillaines","T-shirts and sweatshirts","Beachwear","Spring-Summer 2027 runway show","Fall-Winter 2026 runway show","Fall-Winter 2026 the second chapter"] }],
    [{ heading: "SHOES", items: ["Sandals","Sneakers","Boots and ankle boots","Pumps","Loafers and mules","Ballet flats","View all"] }],
    [{ heading: "SCARVES SHAWLS AND STOLES", items: ["Silk scarves and accessories","Cashmere shawls and stoles","Twilly and other small formats","View all","How to tie your scarf","Styled in Silk"] }, { heading: "FASHION JEWELRY", items: ["Bracelets","Necklaces and pendants","Earrings","Rings","View all"] }],
    [{ heading: "BELTS", items: [] }, { heading: "HATS AND GLOVES", items: [] }, { heading: "HAIR ACCESSORIES", items: [] }],
  ]},
  { key: "men", label: "MEN", caption: "MEN'S READY-TO-WEAR", tone: "#c8a97e", glyph: "🧥", img: "mensLeatherJacket", columns: [
    [{ heading: "READY-TO-WEAR", items: ["Fall-Winter 2026 Collection","Spring-Summer 2026 Collection","Coats and parkas","Jackets and blazers","Knitwear","Shirts","T-shirts and sweatshirts","Pants and shorts","Beachwear","Fall-Winter 2026 runway show"] }],
    [{ heading: "SHOES", items: ["Sneakers","Sandals","Loafers and mules","Derbies and Oxford shoes","Boots and ankle boots","View all"] }],
    [{ heading: "TIES AND SCARVES", items: ["Ties, bow ties and pocket squares","Scarves","Styled in Silk"] }, { heading: "FASHION JEWELRY", items: [] }, { heading: "BELTS", items: [] }, { heading: "HATS AND GLOVES", items: [] }],
  ]},
  { key: "leather", label: "LEATHER GOODS", caption: "BAGS AND CLUTCHES", tone: "#d97b36", glyph: "👜", img: "kelly", columns: [
    [{ heading: "BAGS AND CLUTCHES", items: ["Women's bags and clutches","Men's bags and clutches","View all"] }],
    [{ heading: "SMALL LEATHER GOODS", items: ["To Go wallets","Wallets","Card holders","Pouches and cases","View all"] }],
    [{ heading: "ACCESSORIES", items: ["Charms","Straps","Reading and writing"] }],
    [{ heading: "LUGGAGE", items: ["Suitcases and travel bags","Travel accessories"] }],
  ]},
  { key: "jewelry", label: "JEWELRY", caption: "PRECIOUS MOMENTS", tone: "#b98a4a", glyph: "✦", img: "chaineNecklace", columns: [
    [{ heading: "GOLD JEWELRY", items: ["Rings","Wedding rings","Bracelets","Necklaces and pendants","Earrings","View all"] }],
    [{ heading: "SILVER JEWELRY", items: ["Rings","Bracelets","Necklaces and pendants","Earrings","View all"] }],
    [{ heading: "COLLECTIONS", items: ["Kelly","Chaînes d'ancre","Equestrian","The Wonders","Precious moments"] }],
    [{ heading: "MEN", items: [] }],
  ]},
  { key: "watches", label: "WATCHES", caption: "CAPE COD", tone: "#8a7a68", glyph: "⌚", img: "capeCod", columns: [
    [{ heading: "TIMEPIECES", items: ["Our collections","Women","Men","Straps"] }],
    [{ heading: "HERMÈS TIME", items: ["Watches and Wonders Geneva"] }, { heading: "APPLE WATCH HERMÈS", items: [] }],
  ]},
  { key: "fragrances", label: "FRAGRANCES AND MAKE-UP", caption: "LIMITED EDITION GRIGRIS D'HERMÈS COLLECTION", tone: "#dfb3ba", glyph: "◈", img: "muscPallida", columns: [
    [{ heading: "FRAGRANCES", items: ["Hermessence collection","The Women's Universe","The Men's Universe","Bath","View all"] }],
    [{ heading: "MAKE-UP", items: ["Lips","Face","Eyes","Hands","Accessories","View all"] }],
    [{ heading: "GIFTS", items: [] }, { heading: "SERVICES", items: ["Virtual try on","Foundation Shade Finder","Fragrance Finder"] }],
  ]},
  { key: "home", label: "HOME AND ART OF LIVING", caption: "BLANKETS AND PILLOWS", tone: "#d8cfc4", glyph: "▦", img: "avalonBlanket", columns: [
    [{ heading: "HOME", items: ["Tableware","Blankets and pillows","Decorative objects and games","Furniture, lighting and rugs","Office and writing","Cases and bath linens"] }],
    [{ heading: "CHILDREN AND BABY", items: [] }, { heading: "BEACH", items: [] }, { heading: "SPORTS AND OUTDOOR", items: [] }, { heading: "TECH UNIVERSE", items: [] }, { heading: "HORIZONS ATELIERS", items: [] }],
    [{ heading: "PETIT H", items: [] }],
  ]},
  { key: "equestrian", label: "EQUESTRIAN", caption: "HORSE", tone: "#a6703f", glyph: "♞", img: "saddleBridle", columns: [
    [{ heading: "SADDLES", items: [] }, { heading: "HORSE", items: [] }, { heading: "RIDER", items: [] }],
  ]},
  { key: "gifts", label: "GIFTS", caption: "CASHMERE SHAWLS AND STOLES", tone: "#7d8b6f", glyph: "🎁", img: "scarfColliers", columns: [
    [{ heading: "GIFTS FOR WOMEN", items: [] }, { heading: "GIFTS FOR MEN", items: [] }, { heading: "GIFTS FOR CHILDREN AND BABIES", items: [] }, { heading: "GIFTS FOR DOGS", items: [] }],
  ]},
  { key: "about", label: "ABOUT HERMÈS", caption: "HERMÈS PARIS", tone: "#efe9df", glyph: "H", img: "heroBench", columns: [
    [{ heading: "", items: ["Contemporary Artisans Since 1837","Finance & Governance","Join Hermès","Sustainable Development"] }],
  ]},
];
// Desktop mega menu for WOMEN, verified on hermes.com (7 Nov 2026). The shared
// MEGA_RAW structure still drives the mobile drawer, which follows the user's video.
const MEGA_DESKTOP_WOMEN: MegaSection[][] = [
  [{ heading: "READY-TO-WEAR", items: ["Fall-Winter 2026", "Spring-Summer 2026", "Coats and jackets", "Leather", "Dresses", "Tops and shirts", "Pants and shorts", "Knitwear and sweaters", "T-shirts and polos", "Beachwear", "Discover the runway shows"] }],
  [{ heading: "SHOES", items: ["Fall-Winter 2026", "Sneakers", "Loafers", "Sandals", "Boots", "Pumps", "High heels", "Ballerinas", "Mules"] }, { heading: "SCARVES AND STOLES", items: ["Twillys", "Scarves 90 cm", "Equestrian", "Cashmere", "Stole", "Discover scarf tying"] }],
  [{ heading: "FASHION JEWELRY", items: ["Bracelets", "Earrings", "Necklaces", "Rings", "Pins and brooches", "Hair accessories and combs", "Hairbands and hatbands"] }, { heading: "THE GLOVES' WORLD", items: [] }, { heading: "HATS", items: [] }],
  [{ heading: "BELTS", items: [] }, { heading: "HATS AND GLOVES", items: [] }, { heading: "HAIR ACCESSORIES", items: [] }],
];
type NavOverride = { label?: string; caption?: string; hidden?: boolean; dest?: string };
type NavOverrides = Record<string, NavOverride>;
function applyNavOverrides(overrides: NavOverrides): MegaEntry[] {
  return MEGA_RAW.filter(e => !overrides[e.key]?.hidden).map(e => ({ ...e, label: overrides[e.key]?.label || e.label, caption: overrides[e.key]?.caption || e.caption, key: e.key }));
}
// One distinct photo per nav category (mega-menu left image). The `img` key
// on each MEGA_RAW entry selects its photo; anything unknown falls back to
// heroBenchImg (the real homepage bench photo).
// Real Hermes photos for the mega-menu slots (hotlinked, as the user
// requires — NO AI-generated images anywhere on the storefront). The
// original's WOMEN menu photo is the SS27 runway show and its LEATHER
// menu photo is "Bags and clutches" (a woman running with bags); neither
// exposes its image URL in the browser (lazy-load placeholder), so these
// slots use real Hermes product photos instead: the Cashmere coat worn
// photo for WOMEN, the Picotin Lock 18 bag for LEATHER. The exact
// editorial stills are a follow-up once their URLs are captured from a
// desktop browser's Network panel.
const MEGA_PHOTO_RUNWAY = "https://assets.hermes.com/is/image/hermesproduct/6H0113DAA3_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$";
const MEGA_PHOTO_KELLY = "https://assets.hermes.com/is/image/hermesproduct/083189CCBQ_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$";
function megaImage(e: MegaEntry): string {
  switch (e.img) {
    case "kelly": return MEGA_PHOTO_KELLY;
    case "runway": return MEGA_PHOTO_RUNWAY;
    case "heroBench": return heroBenchImg;
    case "riderJacket": return riderJacketImg;
    case "mensLeatherJacket": return mensLeatherJacketImg;
    case "chaineNecklace": return chaineNecklaceImg;
    case "capeCod": return capeCodImg;
    case "muscPallida": return muscPallidaImg;
    case "avalonBlanket": return avalonBlanketImg;
    case "saddleBridle": return saddleBridleImg;
    case "scarfColliers": return scarfColliersImg;
    default: return heroBenchImg;
  }
}
function headingToSub(h: string): string { const t = h.toLowerCase(); return t.charAt(0).toUpperCase() + t.slice(1); }
function megaTarget(entry: MegaEntry, overrides: NavOverrides, heading: string, item?: string): View {
  const dest = overrides[entry.key]?.dest || entry.key;
  if (entry.key === "about") {
    const txt = item || heading;
    if (txt.includes("Finance")) return { t: "page", page: "finance" };
    if (txt.includes("Join")) return { t: "page", page: "join" };
    if (txt.includes("Sustainable")) return { t: "page", page: "sustainability" };
    return { t: "about" };
  }
  if (item) {
    if (item === "How to tie your scarf" || item === "Discover scarf tying") return { t: "page", page: "guides" };
    if (item === "Discover the runway shows") return { t: "category", cat: dest, sub: "Ready-to-Wear" };
    return { t: "category", cat: dest, sub: item === "View all" ? headingToSub(heading) : item };
  }
  // standalone heading
  const special: Record<string,string> = { "GIFTS FOR WOMEN":"For women","GIFTS FOR MEN":"For men","GIFTS FOR CHILDREN AND BABIES":"For children","GIFTS FOR DOGS":"For dogs","APPLE WATCH HERMÈS":"Cape Cod" };
  return { t: "category", cat: dest, sub: special[heading] || headingToSub(heading) };
}
const NAV: { key: string; label: string; subs: string[] }[] = MEGA_RAW.filter(e=>e.key!=="about").map(e => ({ key: e.key, label: e.label, subs: [...new Set(e.columns.flatMap(col => col.flatMap(sec => [headingToSub(sec.heading), ...sec.items])).filter(Boolean))] }));
// Candidate sub-names per top-level category, for reversing slug category
// URLs back into views (routing). Built from the nav lists plus the two
// short collection spellings the desktop mega menu uses.
const SUBS_BY_CAT: Record<string, string[]> = (() => {
  const m: Record<string, string[]> = {};
  for (const n of NAV) m[n.key] = [...n.subs];
  m["women"] = [...new Set([...(m["women"] ?? []), "Fall-Winter 2026", "Spring-Summer 2026"])];
  return m;
})();
const THEMES = ["Silk", "Beauty", "Belts", "Men's Shoes", "Fashion Jewelry", "Fragrances", "Watches", "Leather Goods", "Home"];
// Discover carousel — verified on hermes.com (7 Nov 2026) by clicking controls 1–15:
// 15 controls, but only 5 themes, repeated three times in this exact order.
// Every repeat shows the SAME products at the SAME prices — no extra themes.
const CAROUSEL_BASE_THEMES = ["Belts", "Men's Shoes", "Fashion Jewelry", "Silk", "Beauty"];
const CAROUSEL_THEMES: string[] = Array.from({ length: 15 }, (_, i) => CAROUSEL_BASE_THEMES[i % CAROUSEL_BASE_THEMES.length] ?? "Belts");
// Discover carousel editorial photos — the ORIGINAL hermes.com homepage
// (block_fetish, NOV_PHASE_1, re-verified 2026-11-10 via the translate
// proxy): one editorial/MODEL photo per theme, NOT a product photo. The
// homepage JSON holds exactly 5 slides; the original's counter runs
// 1/15–15/15 because the 5 themes repeat 3× (slides 1/6/11 Belts,
// 2/7/12 Men's shoes, …), exactly as CAROUSEL_THEMES repeats them —
// nothing extra added, nothing invented. All 10 URLs below were fetched
// (HTTP 200) and VIEWED: the 3x4 portrait crop is the original's mobile
// editorial image and is used on every breakpoint because our slides are
// portrait (3/4 mobile, 16:9 desktop); the original's desktop 16:9 crops
// are the same scenes in landscape (Fashion jewelry desktop is 9:16, the
// same face/bracelets close-up, even tighter). The 4 products shown under
// each theme are unchanged (THEME_GRID_ORDER).
const CAROUSEL_EDITORIAL: Record<string, { img: string; alt: string }> = {
  "Belts": { img: "https://assets.hermes.com/is/image/hermesedito/WOMEN_BELT_NOV_P1_26_3x4?fit=wrap%2C0&wid=767&resMode=sharp2&op_usm=1%2C1%2C6%2C0", alt: "Model wearing the Kelly Pocket 18 belt" },
  "Men's Shoes": { img: "https://assets.hermes.com/is/image/hermesedito/SHOES_NOV_P1_26_3x4?fit=wrap%2C0&wid=767&resMode=sharp2&op_usm=1%2C1%2C6%2C0", alt: "Model wearing brown leather loafers" },
  "Fashion Jewelry": { img: "https://assets.hermes.com/is/image/hermesedito/FASHION_JEWELRY_BELT_NOV_P1_26_3x4?fit=wrap%2C0&wid=767&resMode=sharp2&op_usm=1%2C1%2C6%2C0", alt: "Close-up of a model wearing Kelly bracelets" },
  "Silk": { img: "https://assets.hermes.com/is/image/hermesedito/SILK_NOV_P1_26_3x4?fit=wrap%2C0&wid=767&resMode=sharp2&op_usm=1%2C1%2C6%2C0", alt: "Model wearing a patterned silk scarf" },
  "Beauty": { img: "https://assets.hermes.com/is/image/hermesedito/MAKEUP_NOV_P1_26_3x4?fit=wrap%2C0&wid=767&resMode=sharp2&op_usm=1%2C1%2C6%2C0", alt: "Close-up of a model wearing red lipstick" },
};
// Discover carousel DESKTOP editorial photos — the original's desktop
// (≥1024px) carousel serves the SAME scenes in 16:9 landscape (verified
// 2026-11-10: all 5 URLs HTTP 200 at wid=1920; the probed files are
// 1237×696 = 16:9, including the "9x16"-named Fashion Jewelry one). The
// desktop carousel uses these for EVERY slide — centre and side strips
// alike — so a strip becoming the centre only changes width, never the
// image (the strips show the 16:9 image centre-cropped to 128px, exactly
// as on hermes.com). Mobile keeps the 3x4 portrait URLs above.
const CAROUSEL_EDITORIAL_DESKTOP: Record<string, { img: string; alt: string }> = {
  "Belts": { img: "https://assets.hermes.com/is/image/hermesedito/WOMEN_BELT_NOV_P1_26_16x9?fit=wrap%2C0&wid=1920&resMode=sharp2&op_usm=1%2C1%2C6%2C0", alt: "Model wearing the Kelly Pocket 18 belt" },
  "Men's Shoes": { img: "https://assets.hermes.com/is/image/hermesedito/SHOES_NOV_P1_26_16x9?fit=wrap%2C0&wid=1920&resMode=sharp2&op_usm=1%2C1%2C6%2C0", alt: "Model wearing brown leather loafers" },
  "Fashion Jewelry": { img: "https://assets.hermes.com/is/image/hermesedito/FASHION_JEWELRY_BELT_NOV_P1_26_9x16?fit=wrap%2C0&wid=1920&resMode=sharp2&op_usm=1%2C1%2C6%2C0", alt: "Close-up of a model wearing Kelly bracelets" },
  "Silk": { img: "https://assets.hermes.com/is/image/hermesedito/SILK_NOV_P1_26_16x9?fit=wrap%2C0&wid=1920&resMode=sharp2&op_usm=1%2C1%2C6%2C0", alt: "Model wearing a patterned silk scarf" },
  "Beauty": { img: "https://assets.hermes.com/is/image/hermesedito/MAKEUP_NOV_P1_26_16x9?fit=wrap%2C0&wid=1920&resMode=sharp2&op_usm=1%2C1%2C6%2C0", alt: "Close-up of a model wearing red lipstick" },
};
// Verified theme grids on hermes.com (7 Nov 2026, re-verified live
// 11 Nov 2026 16:40, browser task f0a7843e): the exact four products, in
// this order, shown under each carousel theme. Resolved by refCode, NOT by
// name — name-matching landed on the wrong colour variant (Bouncing sneaker
// Blanc instead of Beige/Natural, Noe loafer Brun instead of Yellow).
// Entries starting with "id:" resolve by product id — used only for the
// Serif strap row (id 16), whose refCode is empty in our data.
// Tiebreaks (disclosed, verify against the live tile photo): Bouncing
// sneaker H221898ZHBG is the FIRST Beige/Natural $1,275 Bouncing in the
// men's shoes category (extraction pos 151); five other same-name/price/
// colour rows exist (H262851ZHF8, H231763ZHNL, H221898ZHX3, H231763ZHX3,
// H27100GZHAF). Mini Thalassa H500522FD89 is the FIRST Black $580 in the
// bracelets category (extraction pos 108); alternatives H500522FC89,
// H500522FK89. White variant ADDED 2026-11-11 as id 5086 (ref H004391Sv05,
// $660, live-read); Silk slot 1 now points at it (was H004391Sv02
// Marine/Rouge). Noe loafer H262834ZAAC: colour corrected
// Brun -> Yellow in data.ts (live extraction pos 262 + theme tile both
// Yellow). Kelly Pocket 18 belt H081120CK89 price $1,375 -> $2,150 in
// data.ts (same change). Names NOT renamed here: Chaine d'ancre necklace /
// earrings (product-page fetch 403'd — unverified); Beauty renames
// (Eye shadow quartet / Nail polish) ARE in data.ts, product-page
// confirmed.
const THEME_GRID_ORDER: Record<string, string[]> = {
  "Belts": ["H081120CK89", "H010439CK55080", "H011790UCAAXS", "id:16"],
  "Men's Shoes": ["H221898ZHBG", "H261807ZHAF", "H262820ZHNL", "H261881ZHD8390"],
  "Fashion Jewelry": ["H101503Bv00", "H306324FvN2", "H109510Bv00", "H500522FD89"],
  "Silk": ["H004391Sv05", "H061144Sv06", "H251526Sv02", "H891071Sv01"],
  "Beauty": ["VP25SETD25BUNDLE", "V60875PV007", "H004366Sv05", "H104951Mv01"],
};
const fmt = (n: number) => "$" + n.toLocaleString("en-US");
const priceText = (p: Product) => (p.priceLabel ? p.priceLabel : fmt(p.price));

// Fixed rotation for the loading horse: Trot → Jump-then-Run → Gallop →
// Trot … The counter lives at module scope, so it persists across every
// navigation for the whole session and the same GIF never shows twice in a
// row. Each veil mount takes the NEXT GIF in the order — no user action.
const LOADING_HORSE_GIFS = [loadingHorseTrotGif, loadingHorseJumpRunGif, loadingHorseGallopGif];
// Display FRAME widths per GIF — NOT one width for all three. The horse
// silhouette inside each GIF frame sits on transparent padding, and the
// padding differs per GIF (measured on the actual files): the Trot GIF is
// 722x238 and its horse spans only ~51-54% of the frame width, while the
// Jump-then-Run and Gallop GIFs are 512x341 with the horse spanning ~80-86%.
// Sizing every frame to the same width therefore made the visible horse —
// the Trot above all — render far smaller than the previous static horse:
// the "zoomed-out" look. Each frame width below is chosen so the VISIBLE
// HORSE ITSELF measures ~172-182px wide on desktop and ~150px on mobile
// for all three GIFs — on the phone that is the large centred horse of the
// user's hermes.com video, roughly a third of the screen wide (aspect ratio
// untouched, never stretched).
const LOADING_HORSE_FRAME_CLS = [
  "w-[288px] sm:w-[312px] lg:w-[352px]", // Trot (722x238, horse ~50-53% of frame)
  "w-[188px] sm:w-[196px] lg:w-[224px]", // Jump-then-Run (512x341, horse ~78-84%)
  "w-[188px] sm:w-[196px] lg:w-[224px]", // Gallop (512x341, horse ~75-85%)
];
let loadingHorseShows = 0;
function takeLoadingHorseGif(): { src: string; show: number; idx: number } {
  const show = loadingHorseShows;
  loadingHorseShows += 1;
  const idx = show % LOADING_HORSE_GIFS.length;
  return { src: LOADING_HORSE_GIFS[idx] ?? LOADING_HORSE_GIFS[0] ?? "", show, idx };
}
function LoadingVeil({ leaving = false, ms = 2200 }: { leaving?: boolean; ms?: number }) {
  // As on hermes.com: full-viewport semi-transparent WHITE veil (the previous
  // page stays underneath, heavily washed out and faintly visible), the
  // animated horse ALONE — centred, slightly above the middle — and a thin
  // black progress bar growing left-to-right along the very top edge, its
  // duration synced to the veil's hold time. No visible text, no spinner.
  // The horse is one of the user's three GIFs, taken in rotation when the
  // veil mounts; the img is keyed by its show number so the element is
  // created fresh and the GIF always starts from its first frame (the
  // jump-then-run GIF therefore always opens with the jump). The GIFs loop
  // forever by themselves, so the horse keeps moving for the whole hold.
  // The frame width is PER GIF (LOADING_HORSE_FRAME_CLS): each GIF's frame
  // is scaled so the VISIBLE HORSE — not the transparent frame — measures
  // ~170-190px wide on desktop and ~130-150px on mobile, the size of the
  // previous static horse. Height stays auto, so every GIF keeps its own
  // aspect ratio. Fades in ~180ms on mount; when `leaving` flips, fades
  // out ~300ms before unmount — never a hard cut. Never blocks clicks
  // (pointer-events:none).
  const [horse] = useState(takeLoadingHorseGif);
  return (
    <div className={`loading-veil fixed inset-0 z-[70] bg-white/75 ${leaving ? "leaving" : ""}`} style={{ pointerEvents: "none" }} role="alertdialog" aria-label="Loading, please wait.">
      <span className="loadbar absolute left-0 top-0 block h-[3px] bg-black" style={{ animationDuration: `${ms}ms` }} aria-hidden="true" />
      <span className="absolute left-1/2 top-[42%] block -translate-x-1/2 -translate-y-1/2">
        <img key={horse.show} src={horse.src} alt="" aria-hidden="true" className={`h-auto object-contain ${LOADING_HORSE_FRAME_CLS[horse.idx] ?? LOADING_HORSE_FRAME_CLS[0]}`} />
      </span>
    </div>
  );
}
function HermesLogo({ settings, light, variant = "full" }: { settings: Settings; light?: boolean; variant?: "header" | "full" | "compact" | "brand" | "headerfull" }) {
  // Default artwork = the user's own logo files. The colour always follows
  // the background it sits on: white file on dark surfaces (over the hero),
  // black file on light ones (cream header, footer, cart, checkout, admin).
  // An admin-uploaded logo (Theme & Settings) still overrides the default.
  const raw = (settings.storeName || "HERMÈS PARIS").trim();
  const main = raw.replace(/\s+PARIS$/i, "") || "HERMÈS";
  const mode = settings.logoMode || "both";
  const hasImg = mode !== "name" && !!settings.logoUrl;
  const ink = light ? "#ffffff" : "#191919";
  if (mode === "name") {
    const size = variant === "full" ? "text-[30px] sm:text-[34px]" : variant === "brand" ? "text-[22px]" : "text-[19px]";
    return <span className={`font-serif-d block text-center font-semibold leading-none tracking-[0.16em] ${size}`} style={{ color: ink }}>{main}</span>;
  }
  if (hasImg) {
    const cls = variant === "header" ? "h-7 w-auto max-w-[150px] object-contain lg:h-9"
      : variant === "headerfull" ? "h-11 w-auto max-w-[220px] object-contain"
      : variant === "brand" ? "h-14 w-auto max-w-[200px] object-contain"
      : variant === "compact" ? "h-9 w-auto max-w-[160px] object-contain"
      : "h-24 w-auto max-w-[260px] object-contain";
    return <img src={settings.logoUrl} alt={raw} className={cls} />;
  }
  if (variant === "header") {
    // Header on hermes.com: ONLY the small carriage emblem, dead-centre —
    // white while over the dark hero image, black once on the cream header.
    // Original mobile logo box is 60x36 (3.75rem x 2.25rem) with the carriage
    // artwork 60px wide inside it, so the img is fixed to 60px wide and the
    // carriage (aspect 820:369) renders 60x27, centred — not the 80px wide
    // it rendered at w-auto.
    return <img src={light ? carriageWhiteImg : carriageBlackImg} alt={raw} className="h-[36px] w-[60px] object-contain" />;
  }
  if (variant === "compact") {
    // Cart / checkout top: ONLY the carriage emblem, centred.
    return <img src={light ? carriageWhiteImg : carriageBlackImg} alt={raw} className="h-8 w-auto object-contain" />;
  }
  if (variant === "headerfull") {
    // Desktop full header (top of page / scrolling up): the full HERMÈS PARIS
    // lockup file — carriage above, HERMÈS, PARIS below — centred, in the
    // colour matching the surface (white over the hero, black on white).
    return <img src={light ? logoWhiteImg : logoBlackImg} alt={raw} className="h-[48px] w-auto object-contain" />;
  }
  if (mode === "logo") {
    return <img src={light ? carriageWhiteImg : carriageBlackImg} alt={raw} className={variant === "brand" ? "h-10 w-auto object-contain" : "h-12 w-auto object-contain"} />;
  }
  // "brand" (cart page top) and "full" (footer bottom): the full lockup file —
  // carriage above, HERMÈS, PARIS below — in the colour matching the surface.
  return <img src={light ? logoWhiteImg : logoBlackImg} alt={raw} className={variant === "brand" ? "h-[48px] w-auto object-contain" : "h-[58px] w-auto object-contain"} />;
}

function load<T>(k: string, fb: T): T { try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : fb; } catch { return fb; } }
function save(k: string, v: unknown) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } }

export function ProductVisual({ p, large: _large, altSrc, altActive, hideStatus }: { p: Product; large?: boolean; altSrc?: string; altActive?: boolean; hideStatus?: boolean }) {
  // Real studio product photo for every product (assets/products/), filling
  // the tile with object-cover — no glyph/emoji placeholders on the storefront.
  const img = productImageFor(p);
  // No visible status pill on the photo: hermes.com shows none on its
  // category/search tiles — the status is screen-reader-only here (on
  // mobile the tile renders it as text below the photo instead).
  // Recommendation tiles (RelatedRow) hide it entirely — the original's
  // Perfect Partner / Keep exploring tiles carry no status at all.
  const statusLabel = p.status === "available_soon" ? "Available soon" : p.status === "in_store_only" ? "In store only" : p.status === "out_of_stock" ? "Out of stock" : "";
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: p.tone }} aria-label={p.name}>
      <img src={img} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
      {/* Hover alternate (hermes.com): a second photo of the same product,
          stacked over the tile photo and cross-faded in (300 ms) while the
          tile is hovered / swiped. Mounted only once armed so listing pages
          don't double their image requests. */}
      {altSrc && (
        <img src={altSrc} alt="" aria-hidden="true" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${altActive ? "opacity-100" : "opacity-0"}`} />
      )}
      {statusLabel && !hideStatus && <span className="sr-only">{statusLabel}</span>}
    </div>
  );
}

// Cart/checkout thumbnails must be the product's OWN photo (its gallery
// first still view — the original Hermes photo), never the generated-pool
// fallback: the old productImageFor({name, price}) call dropped the id,
// so "Cashmere coat with shawl collar" fell into the /shawl/ keyword
// branch and the cart showed a blue scarf for a white coat (user's
// screenshot, 2026-11-11). Falls back to productImageFor with the id.
function cartImageFor(products: Product[], productId: number, name: string, price: number): string {
  const prod = products.find((x) => x.id === productId);
  if (prod) {
    const first = galleryForProduct(prod, 0).find((v) => !v.video);
    if (first) return first.src;
    return productImageFor(prod);
  }
  return productImageFor({ name, price });
}

// Quick buy exists on hermes.com only on sneaker tiles. Every sneaker in
// this catalogue has "sneaker" in its name (45 products, subcategory
// "Shoes") — the same test the category page already uses for its Sneakers
// filter — so this per-product test is the reliable gate. Belts, beauty,
// bags, etc. never get a quick-buy button.
function isSneakerProduct(p: Product): boolean { return /sneaker/i.test(p.name); }

function ProductCard({ p, onOpen, onQuickBuy, colourInName, plainTile }: { p: Product; onOpen: (id: number) => void; onQuickBuy?: (p: Product) => void; colourInName?: boolean; plainTile?: boolean }) {
  const bagIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 8h14l-1.2 12.2a1.8 1.8 0 0 1-1.8 1.6H8a1.8 1.8 0 0 1-1.8-1.6L5 8Z" /><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" /></svg>;
  // Tile views (hermes.com parity): the tile photo first, then the
  // alternates — the product's gallery views after the first
  // (galleryForProduct, default colourway), skipping Video views and any
  // view that duplicates the tile photo. Single-view products (e.g. Milo
  // hat, Rider jacket) have no alternate and no arrows/dots.
  // Homepage theme tiles (plainTile) stay fully plain: no arrows, no
  // dots, no hover-swap, no swipe. Hovering the name/price text below
  // the photo triggers nothing.
  // CAVEAT: gallery views are mostly generated type-set photos, not the
  // original Hermes second view — the mechanism is exact, the imagery is
  // approximate until original second-view URLs are extracted live.
  const tileSrc = productImageFor(p);
  // No visible status line on tiles: hermes.com shows NO status badge or
  // text on its category tiles (mobile or desktop) — the user's phone
  // screenshots of the original (2026-11-12) show no "Available soon" on
  // the coat or the sweater tiles, while the clone rendered it below the
  // photo on mobile. The status stays screen-reader-only here and drives
  // buyability (isBuyableStatus) only.
  const statusText = p.status === "available_soon" ? "Available soon" : p.status === "in_store_only" ? "In store only" : p.status === "out_of_stock" ? "Out of stock" : "";
  const altViews = useMemo(() => {
    const views = galleryForProduct(p, 0);
    const afterFirst = views.filter((v, i) => i >= 1 && !v.video && v.src !== tileSrc).map((v) => v.src);
    const first = views.filter((v) => !v.video && v.src !== tileSrc).map((v) => v.src);
    return [...new Set([...afterFirst, ...first])];
  }, [p, tileSrc]);
  const views = useMemo(() => [tileSrc, ...altViews], [tileSrc, altViews]);
  const viewCount = views.length;
  // Current view index (0 = tile photo). The photo area is a sliding
  // track: each view is an absolute slide translated by (view - idx) full
  // widths plus the live drag offset, so on touch the photo follows the
  // finger sideways and snaps smoothly to the nearest view on release —
  // as on hermes.com's mobile tiles. (The old code only stepped the photo
  // with a hard cut on touchend: no follow, no dots.)
  const [idx, setIdx] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [photoHovered, setPhotoHovered] = useState(false);
  const hoveredRef = useRef(false);
  const touchRef = useRef<{ x: number; y: number; w: number } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const suppressClickRef = useRef(false);
  const clampIdx = (i: number) => Math.max(0, Math.min(viewCount - 1, i));
  // Views rendered in the track: the current view and its neighbours
  // (plainTile renders only the tile photo itself).
  const rendered = plainTile ? [0] : [idx - 1, idx, idx + 1].filter((v) => v >= 0 && v < viewCount);
  // Hover flip (hermes.com): resting the mouse on the tile photo flips
  // INSTANTLY from view 1 to view 2 the moment the mouse arrives — the
  // user flagged the old ~1.8s timer wait (2026-11-11). It stays on view 2
  // while hovered and returns instantly to view 1 on mouseleave, or as
  // soon as the visitor steps/swipes the photos manually.
  const onPhotoEnter = () => {
    setPhotoHovered(true);
    if (plainTile || viewCount <= 1) return;
    hoveredRef.current = true;
    setIdx(1);
  };
  const onPhotoLeave = () => {
    setPhotoHovered(false);
    hoveredRef.current = false;
    setIdx(0);
  };
  // Arrow step: moves one view in either direction, stopping at the ends
  // (no wrap — the dots show the finite set).
  const stepTile = (dir: 1 | -1) => { setIdx((cur) => clampIdx(cur + dir)); };
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    const w = trackRef.current?.getBoundingClientRect().width ?? 0;
    touchRef.current = t ? { x: t.clientX, y: t.clientY, w } : null;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const start = touchRef.current;
    const t = e.touches[0];
    if (!start || !t || plainTile || viewCount <= 1) return;
    const dx = t.clientX - start.x; const dy = t.clientY - start.y;
    // Sideways drag only: horizontal movement must dominate, so vertical
    // page scrolling never moves the photo.
    if (Math.abs(dx) < 8 || Math.abs(dx) <= Math.abs(dy)) return;
    setDragging(true);
    // Follow the finger, clamped to one slide width; at either end the
    // drag is damped (rubber-band) since there is no further view.
    const w = start.w || 1;
    let off = Math.max(-w, Math.min(w, dx));
    if ((idx === 0 && off > 0) || (idx === viewCount - 1 && off < 0)) off *= 0.25;
    setDragX(off);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current; touchRef.current = null;
    const t = e.changedTouches[0];
    setDragging(false);
    if (!start || !t || plainTile || viewCount <= 1) { setDragX(0); return; }
    const dx = t.clientX - start.x; const dy = t.clientY - start.y;
    const w = start.w || 1;
    // A real sideways swipe (not a tap, not a vertical scroll) snaps to
    // the next/previous view; anything smaller springs back. A swipe never
    // opens the product — the tap that follows it is suppressed once.
    if (Math.abs(dx) > Math.max(40, w * 0.2) && Math.abs(dx) > Math.abs(dy) * 1.5) {
      const next = clampIdx(idx + (dx < 0 ? 1 : -1));
      if (next !== idx) { setIdx(next); suppressClickRef.current = true; }
    }
    setDragX(0);
  };
  return (
    <div className="relative cursor-pointer" role="link" aria-label={`${p.name}, ${priceText(p)}`} tabIndex={0}
      onClick={() => { if (suppressClickRef.current) { suppressClickRef.current = false; return; } onOpen(p.id); }} onKeyDown={(e) => { if (e.key === "Enter") onOpen(p.id); }}>
      <div ref={trackRef} className={`relative aspect-[3/4] overflow-hidden transition-transform duration-300 ${photoHovered ? "scale-[1.015]" : ""}`} style={{ background: p.tone }} onMouseEnter={onPhotoEnter} onMouseLeave={onPhotoLeave} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        {/* Sliding track — the current view and its neighbours, each an
            absolute slide translated by (view - idx) full widths plus the
            live drag offset. */}
        {rendered.map((v) => (
          <img key={v} src={views[v]} alt={v === idx ? p.name : ""} aria-hidden={v === idx ? undefined : true} loading="lazy" draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ transform: `translateX(calc(${(v - idx) * 100}% + ${dragX}px))`, transition: dragging ? "none" : "transform 300ms ease" }} />
        ))}
        {statusText && <span className="sr-only">{statusText}</span>}
        {/* Pagination dots (hermes.com mobile tiles): below the photo is
            where the original shows them — centred on the photo's bottom
            edge, the active view black, the rest faint. Mobile only, and
            never on homepage theme tiles (those stay fully plain). */}
        {!plainTile && viewCount > 1 && (
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 lg:hidden" aria-hidden="true">
            {views.map((_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === idx ? "bg-black" : "bg-black/30"}`} />
            ))}
          </div>
        )}
        {/* plainTile (homepage theme tiles only): hermes.com's homepage
            tiles have NO < > arrows at all — the arrows live on category
            tiles and the product-page gallery. Hidden here only. */}
        {!plainTile && viewCount > 1 && (
          <>
            {idx > 0 && (
              <button aria-label="Previous image" className={`absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center bg-white text-black shadow transition-opacity focus-visible:opacity-100 ${photoHovered ? "opacity-100" : "opacity-0"}`} onClick={(e) => { e.stopPropagation(); stepTile(-1); }} onKeyDown={(e) => e.stopPropagation()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
              </button>
            )}
            {idx < viewCount - 1 && (
              <button aria-label="Next image" className={`absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center bg-white text-black shadow transition-opacity focus-visible:opacity-100 ${photoHovered ? "opacity-100" : "opacity-0"}`} onClick={(e) => { e.stopPropagation(); stepTile(1); }} onKeyDown={(e) => e.stopPropagation()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>
              </button>
            )}
          </>
        )}
      </div>
      {colourInName ? (
        // Category tile, as on hermes.com: the colour is appended to the
        // name ("Le Petit Sac bag, Beige/Natural"), the price sits below,
        // and a Quick buy bag button (sneaker pages) ends the text row.
        <div className="mt-2 flex items-start justify-between gap-2">
          <div>
            <p className="product-name px-2 text-left text-xs leading-5 text-[var(--text)]">{p.name}{p.colors[0] ? <span className="sr-only">, {p.colors[0].name}</span> : ""}</p>
            <p className="mt-0.5 px-2 text-left text-xs leading-5 text-[var(--text)]">{priceText(p)}</p>
          </div>
          {onQuickBuy && isBuyableStatus(p.status) && (
            <button aria-label={`Quick buy ${p.name}`} className="mt-[5px] flex h-9 w-9 shrink-0 items-center justify-center border border-black/25 bg-white transition hover:bg-black hover:text-white"
              onClick={(e) => { e.stopPropagation(); onQuickBuy(p); }}>{bagIcon}</button>
          )}
        </div>
      ) : (
        <>
          <p className="product-name mt-2 px-2 text-left text-xs leading-5 text-[var(--text)]">{p.name}</p>
          {p.colors[0] && <p className="sr-only">{p.colors[0].name}</p>}
          <p className="mt-0.5 px-2 text-left text-xs leading-5 text-[var(--text)]">{priceText(p)}</p>
          {onQuickBuy && isBuyableStatus(p.status) && (
            <button aria-label={`Quick buy ${p.name}`} className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-base shadow transition hover:bg-black hover:text-white"
              onClick={(e) => { e.stopPropagation(); onQuickBuy(p); }}>{bagIcon}</button>
          )}
        </>
      )}
    </div>
  );
}

// Fall-Winter grid video tiles — the original's Fall-Winter page shows these
// 6 products as wide autoplay video tiles (the other 2 has_video products,
// pos 1 + 20, have video only in their product-page gallery). Ids are the
// compiled store ids for refs H6H2811DCKX (pos 5, id 4786), H6H0416DT4C
// (pos 36, id 4810), H6H1301D3LN (pos 45, id 4763), H6H0140DA02 (pos 85,
// id 4845), H6H1411D302 (pos 156, id 4897), H6H0540DTLK (pos 236, id 4768).
const FW_VIDEO_TILE_IDS: ReadonlySet<number> = new Set([4763, 4768, 4786, 4810, 4845, 4897]);

function VideoTile({ p, onOpen }: { p: Product; onOpen: (id: number) => void }) {
  // Wide double-column video tile, as on hermes.com's Fall-Winter grid:
  // autoplay muted loop video with a small white pause button bottom-right
  // and the product name + price below, like a normal tile. The MP4 is the
  // original Hermes clip (HLS -> MP4, staged in public/videos/ 2026-11-11);
  // the poster is the original Hermes video poster frame. The clip plays
  // only while the tile is on screen.
  const views = galleryForProduct(p, 0);
  const vid = views.find((v) => v.video && v.videoSrc);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver((es) => setInView(!!es[0]?.isIntersecting), { threshold: 0.25 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  if (!vid || !vid.videoSrc) return <ProductCard p={p} colourInName onOpen={onOpen} />;
  return (
    <div ref={ref} className="group relative col-span-2 cursor-pointer" role="link" aria-label={`${p.name}, ${priceText(p)}`} tabIndex={0}
      onClick={() => onOpen(p.id)} onKeyDown={(e) => { if (e.key === "Enter") onOpen(p.id); }}>
      <div className="relative aspect-[16/9] overflow-hidden">
        <ProductVideo src={vid.videoSrc} poster={vid.src} playing={!paused && inView} className="h-full w-full object-cover" />
        <button aria-label={paused ? "Play video" : "Pause video"} aria-pressed={!paused} className="absolute bottom-2 right-2 z-10 flex h-8 w-8 items-center justify-center bg-white text-black shadow" onClick={(e) => { e.stopPropagation(); setPaused(!paused); }}>
          {paused ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5-13-7.5Z" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
          )}
        </button>
      </div>
      <p className="product-name mt-2 px-2 text-left text-xs leading-5 text-[var(--text)]">{p.name}</p>
      <p className="mt-0.5 px-2 text-left text-xs leading-5 text-[var(--text)]">{priceText(p)}</p>
    </div>
  );
}

export function App() {
  const qc = useQueryClient();
  const store = useQuery({ queryKey: ["storefront"], queryFn: () => api.getStorefront({}) });
  const products = useMemo(() => store.data?.products ?? [], [store.data]);
  const settings: Settings = store.data?.settings ?? { storeName: "HERMÈS PARIS", phone: "800-441-4488", heroTitle: "Threading ideas", heroText: "", shipTo: "UNITED STATES", deliveryText: "", returnsText: "", paymentMethods: "", bgColor: "#fcf7f1", serviceHours: "Monday to Saturday 10am - 9pm EST", logoMode: "both", logoUrl: "", flagshipStore: "691 Madison Avenue, New York", shipToCountries: "UNITED STATES", newsletterText: "Receive our newsletter and discover our stories, collections, and surprises.", newsletterSuccess: "Thank you \u2014 you are subscribed to the newsletter.", copyrightText: "\u00a9 Herm\u00e8s 2026. All rights reserved.", serviceDeliveryBody: "Free standard delivery. Herm\u00e8s offers several fast and secure delivery options.", serviceReturnsBody: "Free returns within 30 days. See conditions and procedure in our return FAQs.", servicePaymentBody: "All the transactions made on Hermes.com are secured", chatEnabled: true, chatWelcome: "", legalLinksJson: "[[\"General Terms and Conditions of Sale\",\"terms\"],[\"General Terms and Conditions of Use\",\"terms\"],[\"Terms and conditions\",\"terms\"],[\"Privacy & cookies\",\"privacy\"],[\"Legal issues\",\"legal\"],[\"Accessibility\",\"accessibility\"],[\"Site map\",\"sitemap\"]]" };

  // Real URLs (History API routing): the initial view comes from the URL
  // when it is a routed one (category, contact page, or home); a product
  // URL keeps its ref and resolves to the product once the catalog has
  // loaded (effect below) — the URL is already correct, so nothing is
  // pushed on load.
  const initialRoute = useMemo(() => {
    if (typeof window === "undefined") return { view: null as View | null, productRef: null as string | null };
    const parsed = parseUrl(window.location.pathname, [], SUBS_BY_CAT);
    if (parsed && parsed.kind === "category") return { view: { t: "category", cat: parsed.cat, sub: parsed.sub } as View, productRef: null as string | null };
    if (parsed && parsed.kind === "contact") return { view: { t: "page", page: "contact" } as View, productRef: null as string | null };
    if (parsed && parsed.kind === "account") return { view: { t: "account" } as View, productRef: null as string | null };
    if (parsed && parsed.kind === "faq") return { view: { t: "faq", topic: parsed.topic } as View, productRef: null as string | null };
    if (parsed && parsed.kind === "home") return { view: { t: "home" } as View, productRef: null as string | null };
    return { view: null as View | null, productRef: productRefFromPath(window.location.pathname) };
  }, []);
  const [view, setView] = useState<View>(initialRoute.view ?? { t: "home" });
  const pendingProductRef = useRef<string | null>(initialRoute.productRef);
  const productsRef = useRef<Product[]>([]);
  const viewRef = useRef<View>(initialRoute.view ?? { t: "home" });
  // Per-category list state, so browser Back restores a category exactly
  // as it was left (how many products were loaded + scroll position).
  const catStateRef = useRef<Record<string, { visible: number; scrollY: number }>>({});
  // The category (or home) a product was opened from — the product page's
  // Back controls return to it, never to the default bags category.
  const [fromView, setFromView] = useState<View | null>(null);
  // Desktop sticky buy bar visibility, reported up from ProductView so
  // the chat bubble can sit above the bar (see ChatBubble).
  const [buyBarVisible, setBuyBarVisible] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => load("hlx-cart", []));
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => load("hlx-user", null));
  const [addedDialog, setAddedDialog] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [menuCat, setMenuCat] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const [navOverrides, setNavOverrides] = useState<NavOverrides>(() => load("hlx-nav-overrides", {}));
  const headerRef = useRef<HTMLElement>(null);
  const mega = useMemo(() => applyNavOverrides(navOverrides), [navOverrides]);
  useEffect(() => { save("hlx-nav-overrides", navOverrides); }, [navOverrides]);
  useEffect(() => { const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuCat(null); }; const onDoc = (e: MouseEvent) => { if (menuCat && headerRef.current && !headerRef.current.contains(e.target as Node)) setMenuCat(null); }; document.addEventListener("keydown", onKey); document.addEventListener("mousedown", onDoc); return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDoc); }; }, [menuCat]);
  const [mobileNav, setMobileNav] = useState(false);
  const [navLoading, setNavLoading] = useState(false);
  const [veilLeaving, setVeilLeaving] = useState(false);
  const [veilMs, setVeilMs] = useState(2200);
  const loadTimer = useRef<number>(0);
  const fadeTimer = useRef<number>(0);
  // Show the veil for `ms`, then fade it OUT over ~300ms before unmounting —
  // no hard cut, no flash, and it can never get stuck (timers always run).
  const pulse = (ms = 2200) => {
    window.clearTimeout(loadTimer.current); window.clearTimeout(fadeTimer.current);
    setVeilMs(ms); setVeilLeaving(false); setNavLoading(true);
    loadTimer.current = window.setTimeout(() => {
      setVeilLeaving(true);
      fadeTimer.current = window.setTimeout(() => { setNavLoading(false); setVeilLeaving(false); }, 300);
    }, ms);
  };
  // DIRECTION-AWARE HEADER, as on hermes.com. Three states:
  //  - "top": at scroll 0 — no solid bar; transparent full header over the hero.
  //  - "slim": scrolling DOWN past ~250px — the full header is replaced by a
  //    slim pinned nav-only board (desktop: category nav only, no logo /
  //    Search / Account / Cart, thin black line underneath; mobile: the slim
  //    carriage header IS the board). It stays pinned the whole way down,
  //    including at the footer — it never hides.
  //  - "full": scrolling UP from anywhere — the full solid header returns
  //    immediately (logo, Search, Account, Cart, nav row).
  // Hysteresis: direction movement accumulates and only switches after
  // ~14px down / ~8px up of sustained movement, so tiny jitters never flip it.
  const [headerMode, setHeaderMode] = useState<"top" | "slim" | "full">("top");
  useEffect(() => {
    // Position is tracked three ways so the board works everywhere: the
    // window's own scroll (normal browsers), a capture-phase document scroll
    // listener (any inner/outer scroller an embedded shell may use instead),
    // and wheel/touch movement (direction signal when no scroll offset is
    // readable at all). Whichever source reports, the state machine is the
    // same: <=24px = top; sustained down past ~250px = slim; sustained up = full.
    let virtualY = window.scrollY || document.documentElement.scrollTop || 0;
    let downAcc = 0; let upAcc = 0; let lastTouchY: number | null = null;
    const feed = (dy: number) => {
      if (virtualY <= 24) { downAcc = 0; upAcc = 0; setHeaderMode((p) => (p === "top" ? p : "top")); return; }
      if (dy > 0) {
        downAcc += dy; upAcc = 0;
        if (downAcc >= 14 && virtualY > 250) setHeaderMode((p) => (p === "slim" ? p : "slim"));
        else if (downAcc >= 14) setHeaderMode((p) => (p === "top" ? "full" : p));
      } else if (dy < 0) {
        upAcc += -dy; downAcc = 0;
        if (upAcc >= 8) setHeaderMode((p) => (p === "full" ? p : "full"));
      }
    };
    const onScroll = (e?: Event) => {
      const t = e?.target as (HTMLElement & { scrollTop?: number }) | null;
      const y = (t && typeof t.scrollTop === "number" ? t.scrollTop : 0) || window.scrollY || document.documentElement.scrollTop || 0;
      const dy = y - virtualY; virtualY = y; feed(dy);
    };
    const onWheel = (e: WheelEvent) => { virtualY = Math.max(0, virtualY + e.deltaY); feed(e.deltaY); };
    const onTouchStart = (e: TouchEvent) => { lastTouchY = e.touches[0]?.clientY ?? null; };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY; if (y === undefined) return;
      if (lastTouchY !== null) { const dy = lastTouchY - y; virtualY = Math.max(0, virtualY + dy); feed(dy); }
      lastTouchY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);
  // Fallback for embedded shells where an outer scroller moves the page and
  // window.scrollY never changes: a 1px sentinel at the very top of the page
  // leaves the viewport the moment the page moves; that alone can only flip
  // top <-> full (direction needs real scroll deltas), which still guarantees
  // the header board is present and solid once the page has moved.
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [sentinelGone, setSentinelGone] = useState(false);
  useEffect(() => { const el = sentinelRef.current; if (!el || typeof IntersectionObserver === "undefined") return; const io = new IntersectionObserver((es) => { for (const e of es) setSentinelGone(!e.isIntersecting); }, { threshold: 0 }); io.observe(el); return () => io.disconnect(); }, []);
  useEffect(() => { setHeaderMode((p) => (sentinelGone ? (p === "top" ? "full" : p) : "top")); }, [sentinelGone]);
  // Pinned offset for the category sub-nav: the height of the header block
  // that is actually pinned at the top RIGHT NOW — the main nav row plus
  // the logo/Search row above it when it is shown. In slim mode (scrolled
  // down) the logo row is hidden, so the offset is just the nav's height
  // (~44px) and the sub-nav docks directly under the pinned nav with no
  // gap; scrolling up restores the full header and the offset grows with
  // it, so header + sub-nav stay one continuous pinned block.
  // WHY NOT A SINGLE ResizeObserver ON THE HEADER (Phase 1): that effect
  // ran on mount while the store was still loading — the component returns
  // the loading veil before the header exists, so headerRef.current was
  // null and the effect bailed; its [view.t] deps never re-ran it after
  // the header mounted, so headerH stayed at its initial 141 forever —
  // 141 - 46 = 95px, exactly the floating gap the verifier saw. Callback
  // refs fire when the element itself mounts, whatever the render history,
  // so they cannot go stale this way.
  const [navH, setNavH] = useState(44);
  const [topRowH, setTopRowH] = useState(55);
  const navRoRef = useRef<ResizeObserver | null>(null);
  const topRowRoRef = useRef<ResizeObserver | null>(null);
  const measureNav = useCallback((el: HTMLElement | null) => {
    navRoRef.current?.disconnect(); navRoRef.current = null;
    if (!el) return;
    setNavH(el.offsetHeight);
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => { const h = el.offsetHeight; setNavH((prev) => (prev === h ? prev : h)); });
    ro.observe(el); navRoRef.current = ro;
  }, []);
  const measureTopRow = useCallback((el: HTMLElement | null) => {
    topRowRoRef.current?.disconnect(); topRowRoRef.current = null;
    if (!el) return;
    setTopRowH(el.offsetHeight);
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => { const h = el.offsetHeight; setTopRowH((prev) => (prev === h ? prev : h)); });
    ro.observe(el); topRowRoRef.current = ro;
  }, []);
  // Height of the pinned header block the sub-nav must dock under.
  const pinTop = topRowH + navH;
  const subNavTop = headerMode === "slim" ? navH : pinTop;
  // The sub-nav's sticky offset is the header height that is ACTUALLY
  // pinned right now: just the nav row (~44px) in slim mode (scrolled
  // down), the full header (logo row + nav, ~99px) otherwise. The user
  // (2026-11-12 20:46) chose "Original jaisa pin karo": hermes.com pins
  // its category sub-nav under the header while scrolling, so ours does
  // the same. (Round 11 had made it scroll away on the claim that
  // hermes.com's sub-nav scrolls away — the live category audit showed
  // that claim is wrong for category pages: the original pins it.)
  // Full-header height for the product page's top padding: the live
  // measured header height while the header is FULL, frozen while slim so
  // scrolling never shifts the page (the padding only matters at scroll 0,
  // where the header is always full). The old hardcoded lg:pt-[142px] came
  // from the stale-141 bug and left a ~45px gap above the gallery — the
  // original's gallery starts exactly at the header's bottom edge.
  const [fullPinTop, setFullPinTop] = useState(99);
  useEffect(() => { if (headerMode !== "slim") setFullPinTop(pinTop); }, [pinTop, headerMode]);
  const [themeIdx, setThemeIdx] = useState(0);
  // Last viewed (hermes.com): persists across page loads in this browser
  // (localStorage, like the cart) — the original shows a product viewed
  // earlier even after a direct URL load of another PDP, so an in-memory
  // list (which resets on reload) never showed it. It only ever holds
  // products actually opened in this browser; a fresh browser shows none.
  const [lastViewedIds, setLastViewedIds] = useState<number[]>(() => load("hlx-lastviewed", []));
  useEffect(() => { save("hlx-lastviewed", lastViewedIds); }, [lastViewedIds]);
  const [cookie, setCookie] = useState<string | null>(() => { try { return localStorage.getItem("hlx-cookies"); } catch { return "pending"; } });
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => { save("hlx-cart", cart); }, [cart]);
  useEffect(() => { save("hlx-user", user); }, [user]);
  useEffect(() => { productsRef.current = products; }, [products]);
  useEffect(() => { viewRef.current = view; }, [view]);
  // Deep link to a product: the ref in the URL resolves once the catalog loads.
  useEffect(() => {
    if (!pendingProductRef.current || products.length === 0) return;
    const ref = pendingProductRef.current;
    pendingProductRef.current = null;
    const found = products.find((x) => (x.refCode || "").replace(/\s+/g, "").toLowerCase() === ref.toLowerCase());
    if (found) setView({ t: "product", id: found.id });
  }, [products]);
  useEffect(() => { try { let k = localStorage.getItem("hlx-visitor"); if (!k) { k = "v-" + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem("hlx-visitor", k); } const day = new Date().toISOString().slice(0, 10); const flag = `hlx-visit-${day}`; if (!localStorage.getItem(flag)) { localStorage.setItem(flag, "1"); api.recordVisit({ visitorKey: k, day }).catch(() => {}); } } catch { /* ignore */ } }, []);
  const catKey = (cat: string, sub?: string) => `${cat}|${sub ?? ""}`;
  const saveCatState = (v: View) => {
    if (v.t !== "category") return;
    const k = catKey(v.cat, v.sub);
    const prev = catStateRef.current[k] ?? { visible: 40, scrollY: 0 };
    catStateRef.current[k] = { visible: prev.visible, scrollY: window.scrollY };
  };
  const restoreCatScroll = (cat: string, sub?: string) => {
    const saved = catStateRef.current[catKey(cat, sub)];
    const y = saved?.scrollY ?? 0;
    requestAnimationFrame(() => { window.setTimeout(() => window.scrollTo({ top: y }), 60); });
  };
  const go = (v: View, opts?: { restore?: boolean }) => {
    const cur = viewRef.current;
    if (cur.t === "category") saveCatState(cur);
    if (v.t === "product" && (cur.t === "category" || cur.t === "home")) setFromView(cur);
    // Real URL for routed views (home / category / product / contact /
    // account / faq); other views (cart, checkout, admin, other pages,
    // about) stay unrouted so browser Back returns to the last routed view.
    const url = v.t === "home" ? "/" : v.t === "category" ? categoryUrl(v.cat, v.sub) : v.t === "product" ? (() => { const pr = products.find((x) => x.id === v.id); return pr ? productUrl(pr.name, pr.refCode, pr.id) : null; })() : v.t === "page" && v.page === "contact" ? contactUrl() : v.t === "account" ? accountUrl() : v.t === "faq" ? faqUrl(v.topic) : null;
    if (url) { try { window.history.pushState(null, "", url); } catch { /* ignore */ } }
    if (v.t === "category" && !opts?.restore) pulse(2200);
    setView(v); setMobileNav(false); setMenuCat(null);
    if (opts?.restore && v.t === "category") restoreCatScroll(v.cat, v.sub);
    else { topRef.current?.scrollIntoView(); window.scrollTo({ top: 0 }); }
  };
  // ---- History (browser Back) --------------------------------------------
  // popstate: the URL already changed; render the view it names and restore
  // the category's saved list/scroll state instead of resetting it.
  useEffect(() => {
    const onPop = () => {
      const parsed = parseUrl(window.location.pathname, productsRef.current, SUBS_BY_CAT);
      if (!parsed) return;
      const cur = viewRef.current;
      if (parsed.kind === "home") {
        if (cur.t === "category") saveCatState(cur);
        setView({ t: "home" }); setMobileNav(false); setMenuCat(null);
        window.scrollTo({ top: 0 });
        return;
      }
      if (parsed.kind === "contact") {
        if (cur.t === "category") saveCatState(cur);
        setView({ t: "page", page: "contact" }); setMobileNav(false); setMenuCat(null);
        window.scrollTo({ top: 0 });
        return;
      }
      if (parsed.kind === "account") {
        if (cur.t === "category") saveCatState(cur);
        setView({ t: "account" }); setMobileNav(false); setMenuCat(null);
        window.scrollTo({ top: 0 });
        return;
      }
      if (parsed.kind === "faq") {
        if (cur.t === "category") saveCatState(cur);
        setView({ t: "faq", topic: parsed.topic }); setMobileNav(false); setMenuCat(null);
        window.scrollTo({ top: 0 });
        return;
      }
      if (parsed.kind === "category") {
        if (cur.t === "category") saveCatState(cur);
        if (cur.t === "category" || cur.t === "home") setFromView(cur);
        setView({ t: "category", cat: parsed.cat, sub: parsed.sub }); setMobileNav(false); setMenuCat(null);
        restoreCatScroll(parsed.cat, parsed.sub);
        return;
      }
      if (cur.t === "category" || cur.t === "home") setFromView(cur);
      setView({ t: "product", id: parsed.id }); setMobileNav(false); setMenuCat(null);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  // Cart prices always follow the LIVE catalog, as on hermes.com: a price
  // corrected after an item was added (Kelly Pocket 18 belt $1,375 -> $2,150)
  // must show the current price in the cart, not the price stored at add-time.
  // Fall back to the stored price only if the product is no longer in the catalog.
  const livePrice = (i: CartItem) => {
    const p = products.find((x) => x.id === i.productId) ?? (i.refCode ? products.find((x) => (x.refCode ?? "") === i.refCode) : undefined);
    return p ? p.price : i.price;
  };
  const pricedCart = cart.map((i) => ({ ...i, price: livePrice(i) }));
  const cartTotal = pricedCart.reduce((s, i) => s + i.qty * i.price, 0);

  const addToCart = (p: Product, color = "", size = "", qty = 1) => {
    const c = color || p.colors[0]?.name || "";
    const key = `${p.id}|${c}|${size}`;
    setCart((prev) => {
      const ex = prev.find((i) => i.key === key);
      if (ex) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { key, productId: p.id, name: p.name, price: p.price, qty, color: c, size, glyph: p.glyph, tone: p.tone, refCode: p.refCode ?? "" }];
    });
    setAddedDialog(p.name);
  };

  const searchResults = useMemo(() => {
    const q = searchQ.trim().toLowerCase();
    if (!q) return [];
    // Plural/singular-insensitive search: singularize tokens on both sides
    // ("sneakers" matches "sneaker", "scarves" matches "scarf") and require
    // every query term to match, so "silk scarf" narrows instead of OR-ing.
    // The query is split on NON-alphanumeric characters (the same split the
    // product text uses) — the old whitespace-only split left punctuation
    // inside terms, so "Men's shoes" ("men's" -> "men'"), "long-sleeve"
    // and "sneaker," never matched anything. Single-letter fragments left
    // by apostrophes ("men's" -> "s") are dropped — they match everything.
    // refCode IS indexed: a ref search ("H261015Zv90", "H6H2800DEMO")
    // returned 0 before because refCode was never in the token list.
    const VARIANTS: Record<string, string> = { scarves: "scarf", sneakers: "sneaker", glasses: "glass" };
    const norm = (w: string) => {
      const v = VARIANTS[w];
      if (v) return v;
      if (/ies$/.test(w) && w.length > 3) return w.slice(0, -3) + "y";
      if (/s$/.test(w) && !/ss$/.test(w)) return w.slice(0, -1);
      return w;
    };
    const terms = q.split(/[^a-z0-9\u00e0-\u00ff]+/).map(norm).filter((t) => t.length >= 2);
    if (terms.length === 0) return [];
    return products.filter((p) => {
      const tokens = [p.name, p.refCode, p.category, p.subcategory, p.line, p.material, p.theme]
        .join(" ").toLowerCase().split(/[^a-z0-9\u00e0-\u00ff]+/).map(norm);
      return terms.every((t) => tokens.some((tok) => tok.includes(t)));
    });
  }, [searchQ, products]);

  if (store.isPending) return <div className="flex min-h-screen items-center justify-center" style={{ background: "#fcf7f1" }}><img src={carriageBlackImg} alt="Hermès Paris" className="h-10 w-auto object-contain" /></div>;
  if (store.error) return <div className="p-8 text-center"><p>Failed to load the store.</p><button aria-label="Retry loading store" className="mt-4 border border-black px-6 py-2 text-xs uppercase tracking-widest" onClick={() => store.refetch()}>Retry</button></div>;

  return (
    <div ref={topRef} className="relative min-h-screen overflow-x-clip" style={{ background: settings.bgColor || "#fcf7f1", color: "#000" }}>
      <div ref={sentinelRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-2 w-px" />
      {/* HEADER — fixed and DIRECTION-AWARE, exactly like hermes.com.
          "top" (scroll 0, homepage): transparent over the hero, white logo + icons.
          "slim" (scrolling down past ~250px): a slim pinned board — desktop shows
          ONLY the category nav row in black on white with a thin black line
          underneath (no logo, no Search, no Account, no Cart); mobile keeps its
          slim carriage header, which is its board. It never hides, even at the footer.
          "full" (scrolling up from anywhere): the full solid white header returns
          at once — black HERMÈS PARIS lockup (desktop) / carriage (mobile),
          Search, Account, Cart and the nav row.
          Hidden on the standalone cart/checkout pages, like hermes.com. */}
      {view.t !== "cart" && view.t !== "checkout" && (() => {
        const onHero = view.t === "home" && headerMode === "top" && !menuCat;
        const slim = headerMode === "slim";
        const ink = onHero ? "#ffffff" : "#191919";
        return (
      <header ref={headerRef} className={`fixed inset-x-0 top-0 z-40 pt-safe transition-[border-color,color] duration-300 ${onHero ? "border-b border-transparent" : "border-b border-[#f6f1eb]"}`} style={{ background: onHero ? "transparent" : "#fcf7f1", color: ink }}>
        {/* Top row (logo / Search / Account / Cart). In the slim state this row
            is gone on DESKTOP — only the nav board below remains. On mobile the
            slim carriage header IS the board, so the row stays at every width
            below lg. */}
        <div ref={measureTopRow} className={`grid grid-cols-[1fr_auto_1fr] items-center px-4 pb-1.5 pt-1 sm:px-6 lg:pb-0 lg:pt-[7px] ${slim ? "lg:hidden" : ""}`}>
          <div className="flex items-center">
            <button aria-label="Open menu" className="flex h-9 w-9 items-center justify-center lg:hidden" onClick={() => setMobileNav(true)}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.5" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            </button>
            {/* hermes.com has a real text input at the far left edge (not a
                button): magnifier at its left, placeholder "Search", thin
                underline. Focusing it opens the search panel (which carries
                the same query), so typing shows results at once. */}
            <div className="hidden items-center gap-2 lg:flex">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 21 21" /></svg>
              <input aria-label="Search for an article" className="w-44 bg-transparent pb-0.5 text-xs outline-none" placeholder="Search" value={searchQ} onChange={(e) => { setSearchQ(e.target.value); if (e.target.value.trim()) setSearchOpen(true); }} onFocus={() => { if (searchQ.trim()) setSearchOpen(true); }} style={{ borderBottom: `1px solid ${onHero ? "rgba(255,255,255,.7)" : "rgba(0,0,0,.6)"}`, color: onHero ? "#fff" : "#525252" }} />
            </div>
            <button aria-label="Search" className="flex h-9 w-9 items-center justify-center lg:hidden" onClick={() => setSearchOpen(true)}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 21 21" /></svg>
            </button>
          </div>
          <button aria-label="Hermès Paris home" className="translate-x-[5px] justify-self-center text-center" onClick={() => go({ t: "home" })}>
            {/* Desktop full header: the full HERMÈS PARIS lockup centred.
                Mobile: ONLY the small carriage emblem, as in the user's video. */}
            <span className="hidden lg:block"><HermesLogo settings={settings} light={onHero} variant="headerfull" /></span>
            <span className="lg:hidden"><HermesLogo settings={settings} light={onHero} variant="header" /></span>
          </button>
          <div className="flex items-center justify-end gap-0.5 sm:gap-2">
            {/* Header has Account + Cart icons only — hermes.com has NO
                Sign up / Login text buttons (user-confirmed 2026-11-10 from
                side-by-side screenshots). The Account icon opens the
                account / sign-in page, where "Create an account" lives. */}
            <button aria-label="Account" className="flex h-9 w-9 items-center justify-center" onClick={() => go({ t: "account" })}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20c1.4-3.6 4.2-5.2 7.5-5.2s6.1 1.6 7.5 5.2" /></svg>
            </button>
            <button aria-label={cartCount === 0 ? "Cart, empty" : `Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`} className="relative flex h-9 w-9 items-center justify-center" onClick={() => go({ t: "cart" })}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.5" aria-hidden="true"><path d="M5 8h14l-1.2 12.2a1.8 1.8 0 0 1-1.8 1.6H8a1.8 1.8 0 0 1-1.8-1.6L5 8Z" /><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" /></svg>
              {cartCount > 0 && <span className={`absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${onHero ? "bg-white text-black" : "bg-black text-white"}`}>{cartCount}</span>}
            </button>
          </div>
        </div>
        <nav ref={measureNav} aria-label="Main navigation" className={`relative hidden items-center justify-center gap-0 px-4 pb-0 pt-0 lg:flex`} onMouseLeave={() => setMenuCat(null)}>
          {mega.map((n) => (
            <div key={n.key} className="flex items-center" onMouseEnter={() => setMenuCat(n.key)}>
              {/* hermes.com has a vertical "|" separator between GIFTS and
                  ABOUT HERMÈS; it sits directly before the last nav item. */}
              {n.key === "about" && <span aria-hidden="true" className="mx-1 text-[10px] font-bold text-neutral-400">|</span>}
              {/* Click OPENS, never toggles: hover already opens the menu on mouseenter, so a toggle would close it again on the first click. Dismissal stays via mouse-leave / Escape / outside click. */}
              <button aria-label={`Open ${n.label} menu`} aria-expanded={menuCat === n.key} aria-haspopup="true" className={`whitespace-nowrap px-3 ${slim ? "py-[14px]" : "pb-3"} text-[10px] font-bold uppercase tracking-[1px] ${menuCat === n.key ? "underline underline-offset-8 decoration-1" : "hover:underline underline-offset-4"}`} onClick={() => setMenuCat(n.key)}>{n.label}</button>
            </div>
          ))}
          {menuCat && (() => { const entry = mega.find(e => e.key === menuCat); if (!entry) return null; const cols = entry.key === "women" ? MEGA_DESKTOP_WOMEN : entry.columns; return (
            <div className="absolute inset-x-0 top-full z-50 border-t border-[#f6f1eb] bg-[#fffcf7]" role="menu" aria-label={`${entry.label} mega menu`} onMouseEnter={() => setMenuCat(entry.key)}>
              <div className="mx-auto flex max-w-7xl gap-10 px-6 py-8">
                <button aria-label={`${entry.label} ${entry.caption}`} className="relative block h-[340px] w-[260px] shrink-0 overflow-hidden text-left" onClick={() => go(megaTarget(entry, navOverrides, entry.columns[0]?.[0]?.heading || "", entry.columns[0]?.[0]?.items[0]))}>
                  <img src={megaImage(entry)} alt={entry.caption} className="h-full w-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-10 text-[13px] font-bold uppercase leading-snug tracking-wide text-white">{entry.caption}{entry.key === "women" && <span className="mt-1 block text-[11px] font-semibold normal-case tracking-normal underline underline-offset-4">Discover the runway show</span>}</span>
                </button>
                <div className="flex flex-1 gap-10 overflow-x-auto">
                  {cols.map((col, ci) => (
                    <div key={ci} className="min-w-[170px] space-y-7">
                      {col.map((sec) => (
                        <div key={sec.heading || sec.items.join(",")}>
                          {sec.heading ? <button aria-label={`${entry.label} ${sec.heading}`} className="mb-2 block text-left text-[11px] font-bold uppercase tracking-[0.14em] hover:underline" onClick={() => go(megaTarget(entry, navOverrides, sec.heading))}>{sec.heading}</button> : null}
                          {sec.items.map((it) => <button key={it} aria-label={`${entry.label} ${it}`} className="block w-full py-[5px] text-left text-sm leading-5 text-black hover:underline" onClick={() => go(megaTarget(entry, navOverrides, sec.heading, it))}>{it}</button>)}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div> ); })()}
        </nav>
      </header>
      ); })()}
      {view.t !== "cart" && view.t !== "checkout" && menuCat && <div aria-hidden="true" className={`fixed inset-0 z-30 bg-black/25 ${headerMode === "slim" ? "top-[46px]" : "top-[112px]"}`} onClick={() => setMenuCat(null)} />}
      {navLoading && <LoadingVeil leaving={veilLeaving} ms={veilMs} />}

      {mobileNav && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-label="Menu">
          <div className="drawer-left flex h-full w-full flex-col overflow-y-auto bg-[#fffcf7]">
            <div className="flex items-center justify-between px-5 pb-1 pt-5">
              <span className="text-xs uppercase tracking-[0.28em]">Menu</span>
              <button aria-label="Close menu" className="flex h-10 w-10 items-center justify-center" onClick={() => setMobileNav(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
              </button>
            </div>
            <div className="flex-1 px-5 pb-4">
              {mega.map((n) => {
                const expanded = mobileExpanded === n.key;
                const sections = n.columns.flatMap((col) => col).filter((s) => s.heading || s.items.length > 0);
                const title = n.label.charAt(0) + n.label.slice(1).toLowerCase();
                return (
                  <div key={n.key} className={n.key === "about" ? "mt-7" : ""}>
                    {!expanded ? (
                      <button aria-label={`Mobile ${n.label}`} aria-expanded={false} className="flex w-full items-center justify-between py-[13px] text-left text-[12px] uppercase tracking-[0.12em]" onClick={() => { setMobileExpanded(n.key); setMobileSub(null); }}>
                        <span>{n.label}</span><span aria-hidden="true" className="text-base leading-none">+</span>
                      </button>
                    ) : (
                      <div className="pb-2">
                        <button aria-label={`Mobile ${n.label} collapse`} aria-expanded={true} className="flex w-full items-baseline justify-between pb-1 pt-2 text-left" onClick={() => { setMobileExpanded(null); setMobileSub(null); }}>
                          <span className="font-serif-d text-[27px] leading-tight">{title}</span><span aria-hidden="true" className="text-lg leading-none">−</span>
                        </button>
                        <div className="mb-3 h-px w-[55%] bg-black/50" aria-hidden="true" />
                        {sections.map((sec) => {
                          const subKey = `${n.key}|${sec.heading}`;
                          const subOpen = mobileSub === subKey;
                          const hasKids = sec.items.length > 0;
                          return (
                            <div key={subKey}>
                              <button aria-label={`Mobile ${n.label} ${sec.heading || sec.items[0]}`} aria-expanded={hasKids ? subOpen : undefined} className="flex w-full items-center justify-between py-[9px] text-left text-[11px] uppercase tracking-[0.12em]" onClick={() => { if (hasKids) setMobileSub(subOpen ? null : subKey); else go(megaTarget(n, navOverrides, sec.heading)); }}>
                                <span>{sec.heading || sec.items[0]}</span>{hasKids && <span aria-hidden="true" className="text-sm leading-none">{subOpen ? "−" : "+"}</span>}
                              </button>
                              {hasKids && subOpen && sec.items.map((it) => (
                                <button key={it} aria-label={`Mobile ${n.label} ${it}`} className="block w-full py-[7px] pl-3 text-left text-sm normal-case tracking-normal text-neutral-800" onClick={() => go(megaTarget(n, navOverrides, sec.heading, it))}>{it}</button>
                              ))}
                            </div>
                          );
                        })}
                        {n.key !== "about" && (
                          <button aria-label={`Mobile ${n.label} ${n.caption}`} className="relative mt-3 block h-36 w-full overflow-hidden text-left" onClick={() => go(megaTarget(n, navOverrides, sections[0]?.heading || "", sections[0]?.items[0]))}>
                            <img src={megaImage(n)} alt={n.caption} className="h-full w-full object-cover" />
                            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-2.5 pt-10 text-[11px] font-bold uppercase tracking-wide text-white">{n.caption}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="px-5 py-4" style={{ background: "#fcf7f1" }}>
              <button aria-label="Find a store" className="flex w-full items-center gap-3 py-2 text-left text-sm" onClick={() => go({ t: "page", page: "stores" })}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 21s-6.5-5.4-6.5-10.4A6.5 6.5 0 0 1 12 4.5a6.5 6.5 0 0 1 6.5 6.1C18.5 15.6 12 21 12 21Z" /><circle cx="12" cy="10.5" r="2.3" /></svg>
                Find a store
              </button>
              <button aria-label="Mobile menu account" className="flex w-full items-center gap-3 py-2 text-left text-sm" onClick={() => go({ t: "account" })}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20c1.4-3.6 4.2-5.2 7.5-5.2s6.1 1.6 7.5 5.2" /></svg>
                Account
              </button>
              <button aria-label="Mobile menu contact us" className="flex w-full items-center gap-3 py-2 text-left text-sm" onClick={() => go({ t: "page", page: "contact" })}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H12l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8Z" /></svg>
                Contact us
              </button>
            </div>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-[#fcf7f1] fade-up overflow-y-auto">
          <div className="mx-auto max-w-5xl px-4 py-8">
            <div className="flex items-center gap-3 border-b border-black pb-3">
              <span className="text-xl">⌕</span>
              <input aria-label="Search for an article input" autoFocus className="w-full bg-transparent text-lg outline-none" placeholder="Search for an article" value={searchQ} onChange={(e) => setSearchQ(e.target.value)} />
              <button aria-label="Close search" className="text-xl" onClick={() => { setSearchOpen(false); setSearchQ(""); }}>✕</button>
            </div>
            {searchQ && <p className="mt-4 text-xs uppercase tracking-[0.2em] text-neutral-500">{searchResults.length} result{searchResults.length === 1 ? "" : "s"} for “{searchQ}”</p>}
            {searchQ.trim() && (() => { const terms = [...new Set(searchResults.flatMap((p) => [p.name, p.line, p.subcategory].filter(Boolean)))].slice(0, 5); return terms.length > 0 ? (
              <div className="mt-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-500">Suggested searches, {terms.length} items</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {terms.map((t) => { const c = searchResults.filter((p) => [p.name, p.line, p.subcategory].includes(t)).length; return <button key={t} aria-label={`Suggested search ${t}`} className="border border-black/30 px-3.5 py-1.5 text-xs hover:border-black" onClick={() => setSearchQ(t)}>{t} <span className="text-neutral-500">({c})</span></button>; })}
                </div>
              </div> ) : null; })()}
            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {searchResults.map((p) => <ProductCard key={p.id} p={p} onOpen={(id) => { setSearchOpen(false); go({ t: "product", id }); }} />)}
            </div>
            {searchQ && searchResults.length === 0 && <p className="mt-10 text-center text-sm text-neutral-600">No article matches your search. Try “scarf”, “Cape Cod” or “Picotin”.</p>}
          </div>
        </div>
      )}

      <main className={view.t === "home" || view.t === "cart" || view.t === "checkout" ? "" : view.t === "product" ? "" : view.t === "category" && view.cat !== "about" ? "pt-[62px] lg:pt-[120px]" : "pt-[62px] lg:pt-[142px]"} style={view.t === "product" ? { paddingTop: fullPinTop } : undefined}>
        {view.t === "home" && <HomeView settings={settings} products={products} themeIdx={themeIdx} setThemeIdx={setThemeIdx} go={go} addToCart={addToCart} pulse={pulse} />}
        {view.t === "cart" && <CartPage cart={pricedCart} setCart={setCart} settings={settings} go={go} total={cartTotal} count={cartCount} products={products} />}
        {view.t === "category" && view.cat === "about" && <AboutPage go={go} />}
        {view.t === "category" && view.cat !== "about" && <CategoryView key={view.cat + (view.sub ?? "")} products={products} cat={view.cat} sub={view.sub} go={go} addToCart={addToCart} pinTop={pinTop} stickyTop={subNavTop} initialVisible={catStateRef.current[catKey(view.cat, view.sub)]?.visible ?? 40} onVisibleChange={(n) => { const k = catKey(view.cat, view.sub); const prev = catStateRef.current[k] ?? { visible: 40, scrollY: 0 }; catStateRef.current[k] = { ...prev, visible: n }; }} />}
        {view.t === "product" && <ProductView key={view.id} products={products} id={view.id} go={go} addToCart={addToCart} settings={settings} user={user} from={fromView} lastViewedIds={lastViewedIds} onBuyBarChange={setBuyBarVisible} onViewed={(pid) => setLastViewedIds((prev) => [pid, ...prev.filter((x) => x !== pid)].slice(0, 9))} />}
        {view.t === "page" && <InfoPage page={view.page} settings={settings} go={go} user={user} />}
        {view.t === "faq" && <FaqPage topic={view.topic} go={go} />}
        {view.t === "about" && <AboutPage go={go} />}
        {view.t === "account" && <AccountView key={view.mode ?? "login"} user={user} setUser={setUser} go={go} mode={view.mode} />}
        {view.t === "checkout" && <CheckoutView cart={pricedCart} setCart={setCart} user={user} go={go} total={cartTotal} settings={settings} products={products} />}
        {view.t === "admin" && <AdminView products={products} settings={settings} qc={qc} navOverrides={navOverrides} setNavOverrides={setNavOverrides} />}
      </main>

      {view.t !== "cart" && view.t !== "checkout" && <Footer settings={settings} go={go} />}
      {view.t !== "admin" && <ChatBubble settings={settings} go={go} view={view} buyBarVisible={buyBarVisible} />}

      {addedDialog && (
        <div className="fixed right-4 top-4 z-50 w-[320px] max-w-[calc(100vw-32px)] bg-[#fffcf7] p-5 fade-up" role="dialog" aria-label="Item added to cart">
          <button aria-label="Close added to cart dialog" className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center text-lg leading-none text-neutral-600" onClick={() => setAddedDialog("")}>×</button>
          <div className="flex items-start gap-3 pr-6">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="mt-0.5 shrink-0"><path d="M5 8h14l-1.2 12.2a1.8 1.8 0 0 1-1.8 1.6H8a1.8 1.8 0 0 1-1.8-1.6L5 8Z" /><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" /></svg>
            <div>
              <p className="text-sm leading-6">This item has been added to the cart</p>
              <p className="mt-1 text-xs text-neutral-500">{addedDialog}</p>
            </div>
          </div>
          <button aria-label="View cart" className="mt-4 w-full bg-black py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white" onClick={() => { setAddedDialog(""); go({ t: "cart" }); }}>View cart</button>
        </div>
      )}

      {cookie === null && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/20 bg-[#fffcf7] p-5">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em]">Cookies Hermes.com</h2>
            <p className="mt-2 text-sm text-neutral-700">We use cookies to improve your experience, analyse traffic and personalise content. You may set your preferences, refuse all cookies, or accept all cookies.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button aria-label="Set your cookies" className="border border-black px-5 py-2.5 text-[11px] uppercase tracking-[0.2em]" onClick={() => { localStorage.setItem("hlx-cookies", "custom"); setCookie("custom"); }}>Set your cookies</button>
              <button aria-label="Refuse all cookies" className="border border-black px-5 py-2.5 text-[11px] uppercase tracking-[0.2em]" onClick={() => { localStorage.setItem("hlx-cookies", "refused"); setCookie("refused"); }}>Refuse all cookies</button>
              <button aria-label="Accept all cookies" className="bg-black px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white" onClick={() => { localStorage.setItem("hlx-cookies", "accepted"); setCookie("accepted"); }}>Accept all cookies</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HomeView({ settings, products, themeIdx, setThemeIdx, go, addToCart, pulse }: { settings: Settings; products: Product[]; themeIdx: number; setThemeIdx: (i: number) => void; go: (v: View, opts?: { restore?: boolean }) => void; addToCart: (p: Product, c?: string, s?: string, q?: number) => void; pulse: (ms?: number) => void }) {
  const activeIdx = Math.min(CAROUSEL_THEMES.length - 1, Math.max(0, themeIdx));
  const theme = CAROUSEL_THEMES[activeIdx] ?? "Belts";
  const strip = products.filter((p) => p.theme === theme);
  // Grid = the verified four products for this theme, in verified order, so
  // positions 1/6/11 (Belts), 2/7/12, … always show identical products/prices.
  // Resolved by refCode (THEME_GRID_ORDER); "id:" entries resolve by id.
  const orderedRefs = THEME_GRID_ORDER[theme];
  const ordered = orderedRefs ? orderedRefs.map((r) => r.startsWith("id:") ? products.find((p) => p.id === Number(r.slice(3))) : products.find((p) => p.refCode === r)).filter((p): p is Product => !!p) : [];
  const shown = (ordered.length ? ordered : strip.length ? strip : products).slice(0, 4);
  const heroText = settings.heroText || "The blanket provides a canvas that can take any direction, from reimagining motifs to asserting a bold artistic signature. Its playful composition allows style to express itself on a larger scale.";
  const heroWords = (settings.heroTitle || "Threading ideas").split(" ");
  const heroFirst = heroWords[0] ?? "Threading";
  const heroRest = heroWords.slice(1).join(" ") || "ideas";
  const CAROUSEL_N = CAROUSEL_THEMES.length; // 15 slides (5 themes x 3)
  // The mobile carousel is a WINDOW (like the desktop carousel and like
  // hermes.com): 11 slides around the active index, the centre slide wide
  // (73vw, 3:4) and the side strips narrow slices. Tapping a side strip
  // GROWS it to the centre while the old centre shrinks to a strip (the
  // width transition does the move) — the user's video proves the
  // original's mobile carousel grows on tap; a scroll-snap list only
  // slides sideways at a constant width and never grows. No scrolling
  // here at all. Swipe left/right moves one theme (tap suppressed after
  // a swipe so it does not also navigate).
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const onCarouselTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };
  const onCarouselTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      suppressClickRef.current = true;
      window.setTimeout(() => { suppressClickRef.current = false; }, 350);
      goToSlide(activeIdx + (dx < 0 ? 1 : -1));
    }
  };
  // Desktop carousel navigation — no scrolling: the desktop carousel is a
  // fixed window (see below), so changing the theme re-renders it with the
  // new centre slide and the width transition does the move. Wraps 15→1
  // and 1→15, as on hermes.com. Used by the desktop slides + arrows and
  // by the mobile window + swipe.
  const goToSlide = (i: number) => {
    const idx = ((i % CAROUSEL_N) + CAROUSEL_N) % CAROUSEL_N;
    setThemeIdx(idx);
  };
  const themeDest = (t: string): View => {
    const rep = products.find((p) => p.theme === t);
    return rep ? { t: "category", cat: rep.category } : { t: "home" };
  };
  const [vidPaused, setVidPaused] = useState(false);
  const [vidMuted, setVidMuted] = useState(true);
  // Baladeur video: portrait MP4 + poster on phones, landscape on desktop
  // (the original serves 9:16 mobile / 16:9 desktop). MP4s live in
  // public/videos/ (dress-video precedent); poster is the Hermes CDN cover.
  const baladeurIsMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;
  const baladeurSrc = baladeurIsMobile ? "/videos/baladeur-mobile.mp4" : "/videos/baladeur-desktop.mp4";
  const baladeurPoster = baladeurIsMobile ? baladeurPosterImgMobile : baladeurPosterImg;
  // The Baladeur film is the ONLY video on the homepage (verified on
  // hermes.com). It starts moving when scrolled into view and freezes when
  // out of view or paused — exactly the real behaviour. NOTE (2026-11-10):
  // the original Hermes video file could NOT be wired in yet — its URL is
  // not in any product asset list, the homepage HTML is Cloudflare-blocked
  // and the archived copy is rate-limited, so no verified video URL exists
  // for it. Until one is found, the motion stays recreated in-app on the
  // editorial still (slow cinematic pan); the controls match the real ones.
  const vidRef = useRef<HTMLElement>(null);
  const [vidInView, setVidInView] = useState(false);
  useEffect(() => { const el = vidRef.current; if (!el) return; const ob = new IntersectionObserver((es) => setVidInView(!!es[0]?.isIntersecting), { threshold: 0.2 }); ob.observe(el); return () => ob.disconnect(); }, []);
  return (
    <div className="overflow-x-clip">
      {/* BOARD a) HERO — full-viewport, full-bleed; the whole hero is a link */}
      <section className="relative cursor-pointer overflow-x-clip" onClick={() => go({ t: "category", cat: "home", sub: "Blankets and pillows" })} aria-label="Threading ideas — discover the blanket collection">
        <picture>
          <source media="(max-width: 640px)" srcSet={heroBenchImgMobile} />
          {/* Mobile height is FULL-SCREEN (100svh, 100vh fallback), as on
              hermes.com: the user's phone screenshots (2026-11-12) show the
              original's mobile hero running to the bottom of the screen
              (text + DISCOVER near the bottom edge), while the old 70vh
              ended ~25vh early and showed the "Discover the world" board
              below — a visible size gap, and the shorter crop also made the
              image read warmer/brighter than the original's taller crop.
              100svh fills the visible screen (accounting for the mobile
              browser chrome); 100vh is the fallback for older browsers. */}
          <img src={heroBenchImg} alt="Blue patterned blanket folded on a black-and-white triangular tiled bench against a beige stone wall" className="h-screen h-[100svh] w-full object-cover object-center sm:h-screen" />
        </picture>
        {/* Vintage dark gradients, as on hermes.com (measured live
            2026-11-11 23:21): top darkening ~15–20% of the height,
            near-black at the very top (behind the header); bottom
            darkening ~20–22%, near-black at the very bottom (behind the
            title text). The bottom text div's own from-black/55 sits
            above the bottom overlay. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-black/90 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent pb-6 pt-6 text-white sm:pb-8 sm:pt-8">
          <div className="mx-auto max-w-[629px] px-[15px] text-center">
            <h1 className="font-serif-d text-[34px] italic leading-tight"><span>{heroFirst}</span> {heroRest}</h1>
            <p className="mx-auto mt-1 w-full max-w-[500px] break-words font-serif-d text-[16px] italic leading-[21px]">{heroText}</p>
            <button aria-label="Discover the blanket collection" className="font-mono-d mt-4 text-[11px] uppercase tracking-[1px] underline underline-offset-8 lg:mt-6" onClick={() => go({ t: "category", cat: "home", sub: "Blankets and pillows" })}>Discover</button>
          </div>
        </div>
      </section>

      {/* BOARDS b)+c) DISCOVER CAROUSEL + PRODUCTS FOR THE THEME — one warm
          cream board, no divider between carousel and theme products */}
      <section className="group w-full" style={{ background: settings.bgColor || "#fcf7f1" }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:pb-12 lg:pt-16">
        {/* Mobile heading — centred, two lines, as in the user's video */}
        <h2 className="font-serif-d text-center text-[34px] italic leading-snug lg:hidden">Discover the world <span className="block">of Hermès</span></h2>
        {/* Desktop heading — top-left, as verified on hermes.com */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="mx-auto max-w-[629px] text-center">
              <h2 className="font-serif-d text-[34px] italic leading-snug">Discover the world of Hermès</h2>
            </div>
            {/* Desktop carousel counter + arrows, top-right (as on hermes.com:
                "1/15" counter with prev/next arrows; mobile has only the
                progress line below the carousel). */}
            <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-3">
              <span className="font-mono-d text-xs font-medium tracking-normal text-black">{activeIdx + 1}/{CAROUSEL_N}</span>
              <button type="button" aria-label="Previous theme" onClick={() => goToSlide(activeIdx - 1)} className="flex h-8 w-8 items-center justify-center text-xl leading-none text-black">‹</button>
              <button type="button" aria-label="Next theme" onClick={() => goToSlide(activeIdx + 1)} className="flex h-8 w-8 items-center justify-center text-xl leading-none text-black">›</button>
            </div>
          </div>
        </div>
        {/* DESKTOP carousel (lg+) — matches hermes.com desktop exactly
            (measured from the user's laptop screenshots of hermes.com):
            full-bleed; centre slide 60.8vw wide × 35vw tall (16:9 desktop
            editorial); side slides as 185px strips (same 16:9 image,
            centre-cropped), 2 visible per side (5 slices total — the
            128px strips the old code used showed 3 per side, 7 total);
            white label button only on the centre slide, 32px above its
            bottom. Clicking a strip (or an arrow) brings it to the centre
            with a smooth width transition and the previous centre becomes
            a strip. Starts with BELTS (index 0) in the centre. The window
            renders the 11 slides around the active index (circular), so
            wrapping 15→1 / 1→15 is seamless and no slide mounts/unmounts
            in view. */}
        <div className="carousel-full-bleed mt-6 hidden overflow-hidden lg:mt-8 lg:block" role="tablist" aria-label="Discover themes">
          <div className="flex h-[35vw] justify-center gap-[3px]">
            {Array.from({ length: 11 }, (_, k) => k - 5).map((off) => {
              const logicalIdx = (((activeIdx + off) % CAROUSEL_THEMES.length) + CAROUSEL_THEMES.length) % CAROUSEL_THEMES.length;
              const t = CAROUSEL_THEMES[logicalIdx] ?? "Belts";
              const ed = CAROUSEL_EDITORIAL_DESKTOP[t];
              if (!ed) return null;
              const isActive = off === 0;
              return (
                <button key={logicalIdx} role="tab" aria-selected={isActive} aria-label={`Theme ${t}, ${logicalIdx + 1} of ${CAROUSEL_THEMES.length}`} onClick={() => goToSlide(logicalIdx)}
                  className="relative h-full shrink-0 overflow-hidden transition-[width] duration-500 ease-out"
                  style={{ width: isActive ? "60.8vw" : 185 }}>
                  <img src={ed.img} alt={ed.alt} loading="lazy" className="h-full w-full object-cover" />
                  {isActive && (
                    <span className="font-mono-d absolute bottom-8 left-1/2 flex h-12 -translate-x-1/2 items-center whitespace-nowrap rounded-none bg-white px-8 text-xs font-medium uppercase text-black">{t}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {/* MOBILE carousel — windowed (like desktop): the centre slide is
            wide (73vw, 3:4) and the side strips are narrow slices; tapping
            a side strip GROWS it to the centre while the old centre
            shrinks to a strip (width transition, exactly as on hermes.com
            — the user's video shows the side photo growing into the
            middle on tap). No scrolling: the width transition does the
            move. Swipe left/right moves one theme. The row height is the
            centre slide's height (73vw x 4/3 = 97.33vw) so it never jumps
            while the widths animate. Label only on the centre slide. */}
        <div className="-mx-4 mt-6 overflow-hidden lg:hidden" role="tablist" aria-label="Discover themes"
          onTouchStart={onCarouselTouchStart} onTouchEnd={onCarouselTouchEnd}>
          <div className="flex h-[97.33vw] justify-center gap-[3px]">
            {Array.from({ length: 11 }, (_, k) => k - 5).map((off) => {
              const logicalIdx = (((activeIdx + off) % CAROUSEL_THEMES.length) + CAROUSEL_THEMES.length) % CAROUSEL_THEMES.length;
              const t = CAROUSEL_THEMES[logicalIdx] ?? "Belts";
              const ed = CAROUSEL_EDITORIAL[t];
              if (!ed) return null;
              const isActive = off === 0;
              return (
                <button key={logicalIdx} role="tab" aria-selected={isActive} aria-label={`Theme ${t}, ${logicalIdx + 1} of ${CAROUSEL_THEMES.length}`}
                  onClick={() => { if (suppressClickRef.current) return; if (!isActive) goToSlide(logicalIdx); }}
                  className="relative h-full shrink-0 cursor-pointer overflow-hidden transition-[width] duration-500 ease-out"
                  style={{ width: isActive ? "73vw" : 64 }}>
                  <img src={ed.img} alt={ed.alt} loading="lazy" className="h-full w-full object-cover" />
                  {isActive && (
                    <span className="font-mono-d absolute bottom-4 left-1/2 flex h-12 -translate-x-1/2 items-center whitespace-nowrap rounded-none bg-white px-8 text-sm font-medium uppercase text-black">{t}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mx-auto mt-6 h-px w-[120px] bg-black/15 lg:mt-8" aria-hidden="true">
          <div className="h-full bg-black transition-transform duration-300" style={{ width: `${100 / CAROUSEL_THEMES.length}%`, transform: `translateX(${activeIdx * 100}%)` }} />
        </div>
        {/* No counter/arrows on mobile — the original's mobile carousel has only
            the progress line above (verified on hermes.com, phone). The 1/15
            counter + arrows are in the desktop heading above (hidden lg:block). */}
        {/* The original renders this heading sr-only (visually hidden,
            screen-reader only) — verified in hermes.com's rendered HTML:
            <h2 class="sr-only">Products for the theme Belts</h2>. The 4
            products below ARE visible on the original, so only the heading
            is hidden, not the products. */}
        <h2 className="sr-only">PRODUCTS FOR THE THEME {theme.toUpperCase()}</h2>
        <div key={theme} className="-mx-4 mt-6 grid grid-cols-2 gap-x-[2px] gap-y-8 sm:mx-0 lg:mt-8 lg:grid-cols-4 lg:gap-[2px]">
          {shown.map((p) => <ProductCard key={p.id} p={p} plainTile onOpen={(id) => go({ t: "product", id })} onQuickBuy={isSneakerProduct(p) ? (prod) => addToCart(prod) : undefined} />)}
        </div>
      </div>
      </section>

      {/* BOARD d) VIDEO — full-bleed board, as on hermes.com (measured
          2026-11-11, 1919x998): the 16:9 Baladeur video is 600px tall
          (60vh, min 550px — at 1366 the original's video is ~550px, not
          the 62vh ~390px the old code gave) and the title, sub-text and
          Discover link are OVERLAID on the video's lower dark area —
          there is NO black block below the video. A dark gradient covers
          the bottom ~53% of the board (near-black at the bottom).
          Controls are bare white glyphs (no white squares) at the
          video's bottom-right: pause glyph 64px from the right edge,
          sound glyph 21px from it, both centred 28px above the bottom
          (30px gap between glyphs). The Kelly board abuts directly
          below (no gap). (An earlier note claiming a black block below
          the video was WRONG — the user's screenshots + live measurement
          prove the overlay.)
          MOBILE HEIGHT (fixed 2026-11-12 from the user's phone
          screenshots of hermes.com, 720x1640): the original's mobile
          video is TALLER than the 62vh the old code used — the DISCOVER
          underline sits ~58px above the video bottom and the video runs
          to the bottom of the screen, giving ~76vh, so the board is
          75vh on phones (desktop stays 60vh / min 550px). At 75vh the
          9:16 mobile video shows almost uncropped (360 wide x ~615
          tall ≈ the video's natural 9:16 shape). */}
      <section ref={vidRef} className="relative overflow-hidden bg-black" aria-label="The great outdoors in stereo video">
        <div className="relative overflow-hidden">
        {/* Baladeur video board — desktop is FULL viewport height (100vh):
            measured live 2026-11-12 ~21:55 at 1919x998: the original's
            board is ~998px (100vh), NOT 60vh/min-550px (the clone's old
            599px was ~40% too short). The audit's "~360px" reading was
            wrong. Mobile stays 75vh (Round 10b, from the user's video).
            Caption stays at bottom-[58px]: the original's caption underline
            is 58px above the board bottom, the clone's is 56px — identical. */}
        <ProductVideo src={baladeurSrc} poster={baladeurPoster} playing={!vidPaused && vidInView} muted={vidMuted} className="h-[75vh] w-full object-cover lg:h-screen" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[53%] bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-[58px] z-10 px-4 text-center text-white">
          <h2 className="font-serif-d text-[30px] italic">The great outdoors in stereo</h2>
          <p className="font-serif-d mx-auto mt-1 text-[20px] italic">Ride lightly, listen largely. The Hermès sound comes where the road begins.</p>
          <button aria-label="Discover the equestrian collection" className="font-mono-d pointer-events-auto mt-5 text-xs font-medium uppercase tracking-normal underline underline-offset-8" onClick={() => go({ t: "category", cat: "equestrian" })}>Discover the collection</button>
        </div>
        <div className="absolute bottom-[10px] right-[10px] z-10 flex items-center gap-[5px]">
          <button aria-label={vidPaused ? "Play video" : "Pause video"} aria-pressed={vidPaused} className="flex h-9 w-9 items-center justify-center text-white" onClick={() => setVidPaused(!vidPaused)}>
            {vidPaused
              ? <svg width="10" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5-13-7.5Z" /></svg>
              : <svg width="10" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="5" height="16" /><rect x="14" y="4" width="5" height="16" /></svg>}
          </button>
          <button aria-label={vidMuted ? "Enable sound" : "Mute"} aria-pressed={!vidMuted} className="flex h-9 w-9 items-center justify-center text-white" onClick={() => setVidMuted(!vidMuted)}>
            {vidMuted
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" stroke="none" /><path d="M16 9l6 6M22 9l-6 6" /></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" stroke="none" /><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" /></svg>}
          </button>
        </div>
        </div>
      </section>

      {/* BOARD e) KELLY EDITORIAL — full-bleed photographic board, as on
          hermes.com: two stacked gold Kelly RINGS (one plain, one pavé-set
          with diamonds) on an orange background; the whole image is a link
          to Jewelry, as on the original. PHONE measurements (user's
          screenshot of hermes.com, 720×1640, photo 174–1543px — all four
          gold edges fit within 2px): the original does NOT show the 9:16
          file at natural size — it shows the centre ~87% zoomed ~1.15×,
          bottom-anchored (top ~6.7% cropped, bottom ~0.6%, sides ~6.7%),
          in a container ~1.90× as tall as wide (720×1369), so the rings
          render ~15% larger and sit at ~27–64% of the height. The text is
          3 lines at ~18px Playfair italic (measured with the real font:
          18px gives the original's exact line breaks at 306/315/299px;
          the old 24px wrapped to 4 lines and crept up to the rings), line
          height ~31px, first line top at ~81% of the height, with a clear
          ~17% gap below the rings. The bottom ~38% carries a dark
          gradient (measured: ~0% at 65% height → ~77% black at the very
          bottom) — the rendered original is much darker at the bottom
          than the raw file. The CTA is ~12px with tight tracking
          (~0.05em; measured 181px wide — the old 0.3em rendered ~253px).
          DESKTOP is untouched: natural 16:9, 28px text, no gradient,
          live-verified 2026-11-10. */}
      <section className="relative mb-12 cursor-pointer overflow-hidden lg:mb-16" style={{ background: "#2e1c11" }} onClick={() => go({ t: "category", cat: "jewelry" })} aria-label="The Kelly story — discover the collection">
        <div className="relative aspect-[720/1369] overflow-hidden sm:aspect-auto">
          <picture>
            <source media="(max-width: 640px)" srcSet={kellyRingsImgMobile} />
            <img src={kellyRingsImg} alt="Two gold Kelly rings, one pavé-set with diamonds, on an orange background" className="absolute bottom-[-0.7%] left-1/2 block w-[115.3%] max-w-none -translate-x-1/2 sm:static sm:bottom-auto sm:w-full sm:max-w-full sm:translate-x-0" />
          </picture>
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 pb-6 pt-6 text-center text-white sm:pb-8 sm:pt-8">
            <p className="font-serif-d mx-auto max-w-3xl px-4 text-[20px] italic leading-[28px]">With each new collection, the Kelly story reinvents itself and reveals new depths. A legendary design, constantly in motion.</p>
            <button aria-label="Discover the Kelly collection" className="font-mono-d mt-4 text-xs font-medium uppercase tracking-normal underline underline-offset-8 lg:mt-6" onClick={() => go({ t: "category", cat: "jewelry" })}>Discover the collection</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Colour-name → filter family, as on hermes.com where the COLOR facet groups
// specific colourways into families (Black, Beige/Natural, Blue …).
function colorFamily(name: string): string {
  const n = name.toLowerCase();
  if (/multi|colorblock|tricolore/.test(n)) return "Multi-colored";
  if (/noir|black/.test(n)) return "Black";
  if (/blanc|white|céramique|ceramique|craie|neige/.test(n)) return "White";
  if (/vert|green|loden|sauge|jade|céladon|celadon|menthe|olive/.test(n)) return "Green";
  if (/bleu|blue|marine|indigo|saphire|saphir|céleste|celeste|hydra|atoll|jean/.test(n)) return "Blue";
  if (/gris|grey|gray|graphite|ardoise|acier|étoupe|etoupe/.test(n)) return "Grey";
  if (/rouge|red|vermillon|lie de vin|amarante|bourgogne|corail/.test(n)) return "Red";
  if (/rose|pink|pivoine|sakura|fuchsia/.test(n)) return "Pink";
  if (/orange|boîte|boite/.test(n)) return "Orange";
  if (/jaune|yellow|souffre|lime|curry/.test(n)) return "Yellow";
  if (/violet|mauve|prune|cassis|lilas|purple/.test(n)) return "Purple";
  if (/marron|brown|chocolat|ébène|ebene|noisette|havane|cognac|moka/.test(n)) return "Brown";
  if (/beige|natural|naturel|gold|caramel|fauve|alezan|alézan|biscuit|chai|sable|paille|argile|kraft|miel|bois|doré|dore/.test(n)) return "Beige/Natural";
  return "Others";
}

// ---- Filter-facet derivations (verified from hermes.com's served facet
// JSONs for women's belts + men's shoes, 2026-11-10; counts are always OUR
// catalogue's, never the original's) ----
// Belts Width buckets — the facet JSON's own value lists map the mm widths:
// Extra narrow = extra_fin/13mm, Narrow = fin/24mm, Wide = large/32/38/40mm,
// Extra wide = extra_large/50mm. 18mm (Kelly Pocket 18) is an extra-fine
// width, so it joins Extra narrow.
function beltWidthBucket(modelSize: string): string {
  const m = parseInt(modelSize, 10);
  if (Number.isNaN(m)) return "";
  if (m <= 18) return "Extra narrow";
  if (m <= 24) return "Narrow";
  if (m <= 40) return "Wide";
  return "Extra wide";
}
// A belt kit is a buckle + a strap sold together ("buckle & ... strap") —
// the original's Customizable / Personalize: Yes products.
function isBeltKit(p: { name: string }): boolean { return /buckle &/i.test(p.name); }
// A product is buyable when its page shows ADD TO CART on hermes.com.
// "Available soon" tiles show ADD TO CART on their product pages (verified
// in the live extraction), so they are buyable here too — the tile shows
// no on-photo badge (the status is screen-reader-only on desktop, a
// small-caps line below the photo on mobile) and the product page buy box
// shows no status label either.
function isBuyableStatus(s: string): boolean { return s === "available" || s === "available_soon"; }
// Configurable ("Customizable") products show PERSONALIZE on hermes.com
// instead of ADD TO CART — the buyer chooses colours/finishes first.
// The store has no configurator yet, so the button opens an honest notice
// (ProductPage, configOpen); configUrl preserves the original config page.
function isConfigProduct(p: { configUrl?: string }): boolean { return !!p.configUrl; }
// Belts Universe — kit belts by their width, complete belts under "Belts".
// (Kit widths other than 13/24/32mm have no Universe option on the original;
// those rows simply carry no Universe value, as on hermes.com.)
function beltUniverse(p: { name: string; modelSize: string }): string {
  if (!isBeltKit(p)) return "Belts";
  const m = parseInt(p.modelSize, 10);
  if (m === 13 || m === 24 || m === 32) return `${m} mm kit belt`;
  return "";
}
// Men's-shoes type from the product name (the original's Category facet for
// men's shoes is the shoe type, not our flat "Shoes" subcategory).
function shoeType(p: { name: string }): string {
  const n = p.name.toLowerCase();
  if (/sneaker/.test(n)) return "Sneakers";
  if (/sandal/.test(n)) return "Sandals";
  if (/espadrille/.test(n)) return "Espadrilles";
  if (/boot/.test(n)) return "Ankle boots";
  if (/derby/.test(n)) return "Derbies";
  if (/oxford/.test(n)) return "Oxford shoes";
  if (/loafer/.test(n)) return "Loafers";
  if (/mule/.test(n)) return "Mules";
  return "Shoes";
}
// Men's-shoes Universe — the coarser grouping of the same types.
function shoeUniverse(p: { name: string }): string {
  const t = shoeType(p);
  if (t === "Loafers" || t === "Mules") return "Loafers and mules";
  if (t === "Derbies" || t === "Oxford shoes") return "Derbies and oxford shoes";
  if (t === "Ankle boots") return "Boots and ankle boots";
  return t;
}
// Metallic finish families — the original's facet groups finishes into
// Silver / Yellow gold / Rose gold / Black.
function finishFamily(f: string): string {
  const v = (f || "").toLowerCase();
  if (/argent|palladium|silver/.test(v)) return "Silver";
  if (/gold plated|^gold$|yellow gold/.test(v)) return "Yellow gold";
  if (/rose/.test(v)) return "Rose gold";
  if (/black|noir/.test(v)) return "Black";
  return f;
}
// Men's-shoes material families — the original's Material facet options.
function materialFamily(m: string): string {
  const v = (m || "").toLowerCase();
  if (/shearling/.test(v)) return "Shearling";
  if (/alligator|crocodile|python|ostrich|lizard|precious/.test(v)) return "Precious leather";
  if (/suede/.test(v)) return "Suede leather";
  if (/textile|canvas|fabric|twill|mesh/.test(v)) return "Textile";
  if (/grain|textured|emboss/.test(v)) return "Textured leather";
  return "Smooth leather";
}
// Colour-facet image tiles — the original's Color facet uses MAIN_COLOR_*
// image tiles (verified HTTP 200, 2026-11-10), not flat hex circles.
function colorMainUrl(family: string): string | null {
  const map: Record<string, string> = {
    "Black": "MAIN_COLOR_NOIR", "Beige/Natural": "MAIN_COLOR_BEIGE", "Red": "MAIN_COLOR_ROUGE",
    "Brown": "MAIN_COLOR_MARRON", "Grey": "MAIN_COLOR_GRIS", "Pink": "MAIN_COLOR_ROSE",
    "Purple": "MAIN_COLOR_VIOLET", "White": "MAIN_COLOR_BLANC", "Blue": "MAIN_COLOR_BLEU",
    "Orange": "MAIN_COLOR_ORANGE", "Green": "MAIN_COLOR_VERT", "Yellow": "MAIN_COLOR_JAUNE",
  };
  const code = map[family];
  if (!code) return null;
  return `https://assets.hermes.com/is/image/hermesproduct/${code}?wid=100&hei=100&fit=fit`;
}

// "Product theme" carousel cards shown below every category grid, as on
// hermes.com (15 themed link cards).
const THEME_CARDS: { label: string; view: View }[] = [
  { label: "Small leather goods", view: { t: "category", cat: "leather", sub: "Small leather goods" } },
  { label: "Jewelry", view: { t: "category", cat: "jewelry" } },
  { label: "Fine jewelry", view: { t: "category", cat: "jewelry" } },
  { label: "Women's scarves", view: { t: "category", cat: "women", sub: "Scarves, shawls and stoles" } },
  { label: "Ex-libris", view: { t: "category", cat: "home" } },
  { label: "Women's beauty", view: { t: "category", cat: "fragrances", sub: "Make-up" } },
  { label: "Women's sneakers", view: { t: "category", cat: "women", sub: "Sneakers" } },
  { label: "Women's accessories", view: { t: "category", cat: "women" } },
  { label: "Women's ready-to-wear", view: { t: "category", cat: "women", sub: "Ready-to-Wear" } },
  { label: "Bags and clutches", view: { t: "category", cat: "leather", sub: "Bags and clutches" } },
  { label: "Women's shoes", view: { t: "category", cat: "women", sub: "Shoes" } },
  { label: "Women's sandals", view: { t: "category", cat: "women", sub: "Sandals" } },
  { label: "Pompons", view: { t: "category", cat: "home" } },
  { label: "Women's watches", view: { t: "category", cat: "watches" } },
  { label: "Women's belts", view: { t: "category", cat: "women", sub: "Belts" } },
];
// "Product theme" carousel — per-page themes, verified from hermes.com's
// served category HTML (2026-11-10). The original shows 5 page-dependent
// related categories x 3 repeats = 15 slides, each an EDITORIAL image
// (hermesedito) with the overlay title bottom-right — NO heading, NO
// counter, NO arrows, swipe-only. All 20 image URLs verified HTTP 200.
// Only the two pages with verified data are mapped; other pages keep the
// existing fixed 15-card list until their own data is fetched.
const ED = (name: string) => `https://assets.hermes.com/is/image/hermesedito/${encodeURIComponent(name)}?fit=wrap%2C0&wid=767&resMode=sharp2&op_usm=1%2C1%2C6%2C0`;
type ThemeSlide = { label: string; imgMo: string; imgDesktop: string; view: View };
const THEME_CAROUSEL_DATA: Record<string, ThemeSlide[]> = {
  belts: [
    { label: "Shoes", imgMo: ED("U_BELT_FEMME_LV2_P1_MO"), imgDesktop: ED("U_BELT_FEMME_LV2_P1_DESKTOP"), view: { t: "category", cat: "women", sub: "Shoes" } },
    { label: "Scarves, shawls and stoles", imgMo: ED("U_BELT_FEMME_LV2_P2_MO"), imgDesktop: ED("U_BELT_FEMME_LV2_P2_DESKTOP"), view: { t: "category", cat: "women", sub: "Scarves, shawls and stoles" } },
    { label: "Fashion jewelry", imgMo: ED("U_BELT_FEMME_LV2_P3_MO"), imgDesktop: ED("U_BELT_FEMME_LV2_P3_DESKTOP"), view: { t: "category", cat: "jewelry", sub: "Bracelets" } },
    { label: "Ready-to-wear", imgMo: ED("U_BELT_FEMME_LV2_P4_MO"), imgDesktop: ED("U_BELT_FEMME_LV2_P4_DESKTOP"), view: { t: "category", cat: "women", sub: "Ready-to-Wear" } },
    { label: "Small leather goods", imgMo: ED("U_BELT_FEMME_LV2_P5_MO"), imgDesktop: ED("U_BELT_FEMME_LV2_P5_DESKTOP"), view: { t: "category", cat: "leather", sub: "Small leather goods" } },
  ],
  menshoes: [
    { label: "Jewelry", imgMo: ED("HSHOES-bij-homme-3_4 P1-1"), imgDesktop: ED("HSHOES-bij-homme-16_9_P1new"), view: { t: "category", cat: "jewelry" } },
    { label: "Scarves", imgMo: ED("HSHOES-soie homme 34 P2-1"), imgDesktop: ED("HSHOES-soie homme 169 P2-1"), view: { t: "category", cat: "men", sub: "Scarves, shawls and stoles" } },
    { label: "Ready-to-wear", imgMo: ED("HSHOES-Pap homme 34 P3-1"), imgDesktop: ED("HSHOES-Pap homme 169 P3-1"), view: { t: "category", cat: "men", sub: "Ready-to-Wear" } },
    { label: "Timepieces", imgMo: ED("HSHOES-horlo-homme-3_4_P4-1"), imgDesktop: ED("HSHOES-horlo-homme-16_9_P4-1"), view: { t: "category", cat: "watches" } },
    { label: "Hats and gloves", imgMo: ED("HSHOES-gants chapeaux homme 34 P5-1"), imgDesktop: ED("HSHOES-gants chapeaux homme 169 P5-1"), view: { t: "category", cat: "men", sub: "Hats and gloves" } },
  ],
  fallwinter: [
    // Fall-Winter 2026 Collection page carousel — 5 themes verified live on
    // hermes.com 2026-11-11 (browser tasks 1f7267c5 + 6fc222ae). Editorial
    // image IDs come from the user's own Chrome DevTools Inspect (<source>
    // elements inside each slide's <picture>); every URL verified HTTP 200
    // at wid=3840 and wid=1920. Desktop uses wid=3840; mobile reuses the
    // SAME image ID at wid=1920 — no mobile-only IDs were ever published
    // for these slides, so none are invented.
    { label: "SMALL LEATHER GOODS", imgMo: "https://assets.hermes.com/is/image/hermesedito/PAP_F_LV2_P1_DESKTOP-1?fit=wrap%2C0&wid=1920&resMode=sharp2&op_usm=1%2C1%2C6%2C0", imgDesktop: "https://assets.hermes.com/is/image/hermesedito/PAP_F_LV2_P1_DESKTOP-1?fit=wrap%2C0&wid=3840&resMode=sharp2&op_usm=1%2C1%2C6%2C0", view: { t: "category", cat: "leather", sub: "Small leather goods" } },
    { label: "BELTS", imgMo: "https://assets.hermes.com/is/image/hermesedito/PAP_F_LV2_P2_DESKTOP-1?fit=wrap%2C0&wid=1920&resMode=sharp2&op_usm=1%2C1%2C6%2C0", imgDesktop: "https://assets.hermes.com/is/image/hermesedito/PAP_F_LV2_P2_DESKTOP-1?fit=wrap%2C0&wid=3840&resMode=sharp2&op_usm=1%2C1%2C6%2C0", view: { t: "category", cat: "women", sub: "Belts" } },
    { label: "LOAFERS AND MULES", imgMo: "https://assets.hermes.com/is/image/hermesedito/PAP_F_LV2_P3_DESKTOP-1?fit=wrap%2C0&wid=1920&resMode=sharp2&op_usm=1%2C1%2C6%2C0", imgDesktop: "https://assets.hermes.com/is/image/hermesedito/PAP_F_LV2_P3_DESKTOP-1?fit=wrap%2C0&wid=3840&resMode=sharp2&op_usm=1%2C1%2C6%2C0", view: { t: "category", cat: "women", sub: "Loafers and mules" } },
    { label: "FASHION JEWELRY", imgMo: "https://assets.hermes.com/is/image/hermesedito/PAP_F_LV2_P4_DESKTOP-1?fit=wrap%2C0&wid=1920&resMode=sharp2&op_usm=1%2C1%2C6%2C0", imgDesktop: "https://assets.hermes.com/is/image/hermesedito/PAP_F_LV2_P4_DESKTOP-1?fit=wrap%2C0&wid=3840&resMode=sharp2&op_usm=1%2C1%2C6%2C0", view: { t: "category", cat: "jewelry" } },
    { label: "HATS AND GLOVES", imgMo: "https://assets.hermes.com/is/image/hermesedito/PAP_F_LV2_P5_DESKTOP-1?fit=wrap%2C0&wid=1920&resMode=sharp2&op_usm=1%2C1%2C6%2C0", imgDesktop: "https://assets.hermes.com/is/image/hermesedito/PAP_F_LV2_P5_DESKTOP-1?fit=wrap%2C0&wid=3840&resMode=sharp2&op_usm=1%2C1%2C6%2C0", view: { t: "category", cat: "women", sub: "Hats and gloves" } },
  ],
};
const MOSAIC_ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[4/3]", "aspect-[3/4]", "aspect-[5/6]", "aspect-square"];

type FGroup = "category" | "line" | "material" | "modelSize" | "finish" | "size" | "color" | "width" | "personalize" | "universe";
type FSection = { key: string; title: string; kind: "checks" | "color" | "size" | "price" | "sort"; group?: FGroup; options: { value: string; count: number; hex?: string }[] };
const EMPTY_SEL: Record<FGroup, string[]> = { category: [], line: [], material: [], modelSize: [], finish: [], size: [], color: [], width: [], personalize: [], universe: [] };

// Fall-Winter theme carousel — the original's category-page carousel for
// this page (verified live 2026-11-11): 5 themes x 3 repeats = 15 slides,
// NO arrows, NO auto-advance. Desktop: wide 16:9 centre slide (60.8vw,
// 35vw tall) with 128px side strips, 2 visible per side; the white label
// button sits ON the centre slide near its bottom and links to the theme's
// category; clicking a side strip brings it to the centre. Mobile:
// portrait 3:4 swipeable slides, label button 16px above the slide bottom.
// Progress line below: thin light-grey track with a ~1/5 black segment
// that moves per theme. Mirrors the homepage Discover carousel geometry.
function FallWinterThemeCarousel({ go }: { go: (v: View, opts?: { restore?: boolean }) => void }) {
  const themes = THEME_CAROUSEL_DATA.fallwinter ?? [];
  const slides = [...themes, ...themes, ...themes];
  const [activeIdx, setActiveIdx] = useState(0);
  const themeIdx = themes.length ? activeIdx % themes.length : 0;
  const goTo = (i: number) => setActiveIdx(slides.length ? ((i % slides.length) + slides.length) % slides.length : 0);
  // The mobile carousel is a WINDOW (like the desktop carousel and like
  // hermes.com): the centre slide is wide (73vw, 3:4) and the side strips
  // are narrow slices; tapping a side strip GROWS it to the centre while
  // the old centre shrinks to a strip (width transition). No scrolling.
  // Swipe left/right moves one theme (tap suppressed after a swipe).
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const onCarouselTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };
  const onCarouselTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      suppressClickRef.current = true;
      window.setTimeout(() => { suppressClickRef.current = false; }, 350);
      goTo(activeIdx + (dx < 0 ? 1 : -1));
    }
  };
  if (slides.length === 0) return null;
  return (
    <div>
      {/* DESKTOP (lg+) — centre slide + side strips, as on hermes.com */}
      <div className="carousel-full-bleed mt-6 hidden overflow-hidden lg:mt-8 lg:block" role="tablist" aria-label="Product theme carousel">
        <div className="flex h-[35vw] justify-center gap-[3px]">
          {Array.from({ length: 11 }, (_, k) => k - 5).map((off) => {
            const logicalIdx = (((activeIdx + off) % slides.length) + slides.length) % slides.length;
            const slide = slides[logicalIdx];
            if (!slide) return null;
            const isActive = off === 0;
            const n = (logicalIdx % themes.length) + 1;
            return (
              <div key={logicalIdx} role="tab" aria-selected={isActive} aria-label={`Visible Category ${slide.label}, ${n} of ${themes.length}`} tabIndex={0}
                onClick={() => { if (!isActive) goTo(logicalIdx); }}
                onKeyDown={(e) => { if (e.key === "Enter" && !isActive) goTo(logicalIdx); }}
                className="relative h-full shrink-0 cursor-pointer overflow-hidden transition-[width] duration-500 ease-out"
                style={{ width: isActive ? "60.8vw" : 128 }}>
                <img src={slide.imgDesktop} alt={slide.label} loading="lazy" className="h-full w-full object-cover" />
                {isActive && (
                  <button aria-label={`Go to ${slide.label}`} className="font-mono-d absolute bottom-8 left-1/2 flex h-12 -translate-x-1/2 items-center whitespace-nowrap rounded-none bg-white px-8 text-xs font-medium uppercase text-black" onClick={(e) => { e.stopPropagation(); go(slide.view); }}>{slide.label}</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* MOBILE — windowed (like desktop): centre slide wide (73vw, 3:4),
          side strips narrow; tapping a side strip GROWS it to the centre
          (width transition, as on hermes.com). No scrolling. */}
      <div className="-mx-4 mt-6 overflow-hidden lg:hidden" role="tablist" aria-label="Product theme carousel"
        onTouchStart={onCarouselTouchStart} onTouchEnd={onCarouselTouchEnd}>
        <div className="flex h-[97.33vw] justify-center gap-[3px]">
          {Array.from({ length: 11 }, (_, k) => k - 5).map((off) => {
            const logicalIdx = (((activeIdx + off) % slides.length) + slides.length) % slides.length;
            const slide = slides[logicalIdx];
            if (!slide) return null;
            const isActive = off === 0;
            const n = (logicalIdx % themes.length) + 1;
            return (
              <div key={logicalIdx} role="tab" aria-selected={isActive} aria-label={`Visible Category ${slide.label}, ${n} of ${themes.length}`} tabIndex={0}
                onClick={() => { if (suppressClickRef.current) return; if (!isActive) goTo(logicalIdx); }}
                onKeyDown={(e) => { if (e.key === "Enter" && !isActive) goTo(logicalIdx); }}
                className="relative h-full shrink-0 cursor-pointer overflow-hidden transition-[width] duration-500 ease-out"
                style={{ width: isActive ? "73vw" : 64 }}>
                <img src={slide.imgMo} alt={slide.label} loading="lazy" className="h-full w-full object-cover" />
                {isActive && (
                  <button aria-label={`Go to ${slide.label}`} className="font-mono-d absolute bottom-4 left-1/2 flex h-12 -translate-x-1/2 items-center whitespace-nowrap rounded-none bg-white px-8 text-sm font-medium uppercase text-black" onClick={(e) => { e.stopPropagation(); go(slide.view); }}>{slide.label}</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Progress line — thin light-grey track, ~1/5 black segment per theme */}
      <div className="mx-auto mt-6 h-px w-[120px] bg-black/15 lg:mt-8" aria-hidden="true">
        <div className="h-full bg-black transition-transform duration-300" style={{ width: `${100 / themes.length}%`, transform: `translateX(${themeIdx * 100}%)` }} />
      </div>
    </div>
  );
}

function CategoryView({ products, cat, sub, go, addToCart, pinTop, stickyTop, initialVisible, onVisibleChange }: { products: Product[]; cat: string; sub?: string; go: (v: View, opts?: { restore?: boolean }) => void; addToCart: (p: Product) => void; pinTop: number; stickyTop: number; initialVisible?: number; onVisibleChange?: (n: number) => void }) {
  const nav = NAV.find((n) => n.key === cat);
  const label = nav?.label ?? cat.toUpperCase();
  const base = useMemo(() => {
    const catList = products.filter((p) => p.category === cat);
    if (!sub) return catList;
    const low = sub.toLowerCase();
    // Synonym / group mapping so a menu item shows ONLY its own products
    const syn: Record<string, (p: Product) => boolean> = {
      "women's bags and clutches": (p) => p.subcategory === "Bags and clutches" && (p.category === "women" || p.category === "leather"),
      "men's bags and clutches": (p) => p.subcategory === "Bags and clutches" && (p.category === "men" || p.category === "leather"),
      "silk scarves and accessories": (p) => p.subcategory === "Scarves, shawls and stoles",
      "cashmere shawls and stoles": (p) => p.subcategory === "Scarves, shawls and stoles",
      "hermessence collection": (p) => p.line === "Hermessence" || p.subcategory === "Perfumes",
      "the women's universe": (p) => p.category === "fragrances",
      "the men's universe": (p) => p.category === "fragrances",
      "our collections": (p) => p.category === "watches",
      "women": (p) => p.category === "watches" || p.category === "women",
      "men": (p) => p.category === "watches" || p.category === "men",
      "straps": (p) => p.category === "watches",
      "sandals": (p) => /sandal/i.test(p.name),
      "sneakers": (p) => /sneaker/i.test(p.name),
      "boots and ankle boots": (p) => /boot/i.test(p.name),
      "pumps": (p) => /pump/i.test(p.name),
      "loafers and mules": (p) => /loafer/i.test(p.name),
      "derbies and oxford shoes": (p) => /derby|oxford/i.test(p.name),
      "rings": (p) => /ring/i.test(p.name) || p.category === "jewelry",
      "wedding rings": (p) => /ring/i.test(p.name),
      "bracelets": (p) => /bracelet/i.test(p.name),
      "necklaces and pendants": (p) => /necklace/i.test(p.name),
      "earrings": (p) => /earring/i.test(p.name),
      "lips": (p) => /lip/i.test(p.name),
      "face": (p) => p.category === "fragrances",
      "eyes": (p) => /eye/i.test(p.name),
      "hands": (p) => /nail|mains/i.test(p.name),
      "blankets and pillows": (p) => p.subcategory === "Blankets and throws",
      "for women": (p) => p.subcategory === "For women" || p.category === "gifts",
      "for men": (p) => p.category === "gifts",
      "for children": (p) => p.category === "gifts",
      "for dogs": (p) => p.subcategory === "Scarves, shawls and stoles" && /chiens/i.test(p.name),
      "dresses": (p) => p.subcategory === "Dresses and skirts",
      "ready-to-wear": (p) => p.line === "Ready-to-Wear" || p.subcategory === "Dresses and skirts",
      // Fall-Winter 2026 is a gendered collection: the women's page (cat
      // "women") shows the women's 330 and the men's page (cat "men") shows
      // the men's 143. Both sets carry the same line value — the product's
      // own category is what separates them. (Batch 15, 2026-11-11.)
      "fall-winter 2026 collection": (p) => p.line === "Fall-Winter 2026" && p.category === cat,
      "spring-summer 2026 collection": (p) => p.line === "Spring-Summer 2026",
      "scarves shawls and stoles": (p) => p.subcategory === "Scarves, shawls and stoles",
      "loafers": (p) => /loafer/i.test(p.name),
      "boots": (p) => /boot/i.test(p.name),
      "mules": (p) => /mule|loafer/i.test(p.name),
      "necklaces": (p) => /necklace/i.test(p.name),
      "twillys": (p) => p.subcategory === "Scarves, shawls and stoles",
      "scarves 90 cm": (p) => p.subcategory === "Scarves, shawls and stoles",
      "cashmere": (p) => p.subcategory === "Scarves, shawls and stoles",
      "stole": (p) => p.subcategory === "Scarves, shawls and stoles",
      "pins and brooches": (p) => p.category === "jewelry",
    };
    if (syn[low]) return products.filter(syn[low]);
    const strict = (x: Product) => x.subcategory.toLowerCase() === low || x.line.toLowerCase() === low;
    const inCat = catList.filter(strict);
    if (inCat.length) return inCat;
    const across = products.filter(strict);
    if (across.length) return across;
    // Heading-style subs (e.g. "Bags and clutches", "Belts", "Shoes", "Perfumes", "Make-up", "Tableware", "Tack")
    const bySubCat = products.filter((x) => x.subcategory.toLowerCase() === low);
    if (bySubCat.length) return bySubCat;
    return [];
  }, [products, cat, sub]);

  // ---- Page identity -------------------------------------------------------
  const subLow = (sub ?? "").toLowerCase();
  const isMensBags = /men's bags/.test(subLow) && !/women's bags/.test(subLow);
  const isBagsPage = /bags and clutches/.test(subLow) || (cat === "women" && !sub);
  const isSneakersPage = /sneaker/.test(subLow);
  const isDressesPage = /dress/.test(subLow);
  // Ready-to-Wear pages (Women): the dresses page AND the two season
  // collections and sibling RTW lists from the user's video — they all share
  // the same sideways sub-nav and the COLLECTION-first facet order.
  const RTW_SUBS = ["Fall-Winter 2026 Collection", "Spring-Summer 2026 Collection", "Coats and jackets", "Leather", "Dresses and skirts", "Tops and shirts", "Pants and shorts", "Knitwear and twillaines", "T-shirts and sweatshirts", "Beachwear"];
  // The desktop mega menu shortens the two collections to "Fall-Winter
  // 2026" / "Spring-Summer 2026" — those subs land on the same collection
  // pages (matched by line), so they count as RTW pages too and title
  // themselves with the full "… Collection" name.
  const isCollectionSub = subLow === "fall-winter 2026" || subLow === "spring-summer 2026";
  const isRTWPage = cat === "women" && (isDressesPage || isCollectionSub || RTW_SUBS.some((l) => l.toLowerCase() === subLow));
  const isShoesPage = isSneakersPage || /sandals|loafers|derbies|boots|shoes/.test(subLow) || (cat === "men" && !sub);
  // Verified facet orders exist for these two pages only (served facet
  // JSONs, 2026-11-10): women's belts and men's shoes.
  const isBeltsPage = subLow === "belts";
  const isMensShoesPage = cat === "men" && isShoesPage;
  // Category titles render in proper case (hermes.com: "Fall-Winter 2026
  // Collection"). The `sub` values come from the URL slug map in
  // routing.ts, which is lowercase — map the two season collections to
  // their display titles here instead of title-casing every sub: other
  // subs are already proper case (e.g. "Bags and clutches") and a generic
  // title-case would wrongly capitalise small words ("and").
  const COLLECTION_TITLES: Record<string, string> = {
    "fall-winter 2026": "Fall-Winter 2026 Collection",
    "fall-winter 2026 collection": "Fall-Winter 2026 Collection",
    "spring-summer 2026": "Spring-Summer 2026 Collection",
    "spring-summer 2026 collection": "Spring-Summer 2026 Collection",
  };
  const titleText = COLLECTION_TITLES[subLow] ?? (isCollectionSub && sub ? `${sub} Collection` : sub ?? (cat === "women" ? "Women's bags and clutches" : label.charAt(0) + label.slice(1).toLowerCase()));
  const crumbTop = isBagsPage ? "LEATHER GOODS | BAGS AND CLUTCHES" : isRTWPage ? `${label} | READY-TO-WEAR` : sub ? `${label} | ${sub.toUpperCase()}` : label;

  // Sub-nav siblings — the row under the title, current one underlined,
  // ending with "View all" (lists verified on hermes.com for bags /
  // sneakers / dresses; other categories list their own menu siblings).
  type Sib = { label: string; view: View; current: boolean };
  let siblings: Sib[] = [];
  if (isBagsPage) {
    siblings = [
      { label: "Women's bags and clutches", view: { t: "category", cat, sub: "Women's bags and clutches" }, current: !isMensBags },
      { label: "Men's bags and clutches", view: { t: "category", cat, sub: "Men's bags and clutches" }, current: isMensBags },
      { label: "View all", view: { t: "category", cat, sub: "Bags and clutches" }, current: false },
    ];
  } else if (isSneakersPage) {
    siblings = ["Sneakers", "Sandals", "Loafers and mules", "Derbies and Oxford shoes", "Boots and ankle boots"].map((l) => ({ label: l, view: { t: "category", cat, sub: l } as View, current: l.toLowerCase() === subLow }));
    siblings.push({ label: "View all", view: { t: "category", cat, sub: "Shoes" }, current: false });
  } else if (isRTWPage) {
    // The original lists only the CURRENT collection first — the other
    // season is not a sibling on a collection page (the Fall-Winter page
    // has no Spring-Summer item, and vice versa).
    const rtwList = RTW_SUBS.filter((l) => {
      const ll = l.toLowerCase();
      if (ll === "spring-summer 2026 collection" && (subLow === "fall-winter 2026 collection" || subLow === "fall-winter 2026")) return false;
      if (ll === "fall-winter 2026 collection" && (subLow === "spring-summer 2026 collection" || subLow === "spring-summer 2026")) return false;
      return true;
    });
    siblings = rtwList.map((l) => ({ label: l, view: { t: "category", cat, sub: l } as View, current: l.toLowerCase() === subLow || (isCollectionSub && l.toLowerCase() === `${subLow} collection`) || (l === "Dresses and skirts" && isDressesPage && !RTW_SUBS.some((x) => x.toLowerCase() === subLow)) }));
  } else if (nav) {
    siblings = nav.subs.map((s) => ({ label: s, view: { t: "category", cat, sub: s } as View, current: s === sub }));
    siblings.push({ label: "View all", view: { t: "category", cat }, current: !sub });
  }

  // ---- Filter state — selections are STAGED in the drawer (§F) and only
  // applied to the grid when APPLY is clicked or the drawer is closed;
  // they do NOT update the grid immediately. Applied state (sel /
  // onlineOnly / sort / priceMin / priceMax) drives the grid; draft state
  // (dSel / dOnline / dSort / dPriceMin / dPriceMax) is what the drawer
  // edits. Opening the drawer snapshots the applied state into the draft.
  const [fOpen, setFOpen] = useState(false);
  const [mosaic, setMosaic] = useState(false);
  const [visible, setVisible] = useState(initialVisible ?? 40);
  // Persist the loaded count so browser Back restores the category as left.
  useEffect(() => { onVisibleChange?.(visible); }, [visible]);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [sel, setSel] = useState<Record<FGroup, string[]>>(EMPTY_SEL);
  const [sort, setSort] = useState("relevance");
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [dSel, setDSel] = useState<Record<FGroup, string[]>>(EMPTY_SEL);
  const [dOnline, setDOnline] = useState(false);
  const [dSort, setDSort] = useState("relevance");
  const [dPriceMin, setDPriceMin] = useState<number | null>(null);
  const [dPriceMax, setDPriceMax] = useState<number | null>(null);
  // All sections collapsed by default, except men's shoes where LINE is
  // expanded by default (§F).
  const [openKey, setOpenKey] = useState(isMensShoesPage ? "line" : "");
  const [loadedMsg, setLoadedMsg] = useState("");
  const subNavRef = useRef<HTMLElement>(null);
  // On mount, scroll the sideways sub-nav so the CURRENT sibling is in view
  // (the row itself scrolls horizontally; the page never moves).
  useEffect(() => {
    // Scroll the sideways sub-nav so the CURRENT sibling is fully in view.
    // The current item's position is measured against the nav's own scroll
    // content: offsetLeft is relative to the sticky bar (the offsetParent),
    // not the nav, so the first item scrolls to exactly 0 and is never
    // clipped at the left edge.
    const navEl = subNavRef.current; if (!navEl) return;
    const ensureVisible = () => {
      const cur = navEl.querySelector<HTMLElement>("[data-current='true']"); if (!cur) return;
      const pos = cur.offsetLeft - navEl.offsetLeft;
      const left = Math.max(0, pos - 12);
      const right = pos + cur.offsetWidth;
      if (navEl.scrollLeft > left || navEl.scrollLeft + navEl.clientWidth < right) navEl.scrollTo({ left });
    };
    ensureVisible();
    const t = window.setTimeout(ensureVisible, 400);
    return () => window.clearTimeout(t);
  }, []);
  const themeRef = useRef<HTMLDivElement>(null);

  const priceLo = base.length ? Math.min(...base.map((p) => p.price)) : 0;
  const priceHi = base.length ? Math.max(...base.map((p) => p.price)) : 0;
  const pMin = priceMin ?? priceLo;
  const pMax = priceMax ?? priceHi;
  const priceNarrowed = pMin > priceLo || pMax < priceHi;

  // Per-page derived facet values (see the helpers above). On the belts
  // page Category is kit-vs-complete and Finish is the family; on men's
  // shoes Category is the shoe type and Material is the family.
  const catVal = (p: Product) => isBeltsPage ? (isBeltKit(p) ? "Belt kits" : "Belts") : isMensShoesPage ? shoeType(p) : p.subcategory;
  const finishVal = (p: Product) => isBeltsPage ? finishFamily(p.metallicFinish) : p.metallicFinish;
  const matVal = (p: Product) => isMensShoesPage ? materialFamily(p.material) : p.material;
  const universeVal = (p: Product) => isBeltsPage ? beltUniverse(p) : isMensShoesPage ? shoeUniverse(p) : "";
  const filterList = (s: Record<FGroup, string[]>, on: boolean, lo: number, hi: number) => base.filter((p) =>
    (!on || isBuyableStatus(p.status)) &&
    (!s.category.length || s.category.includes(catVal(p))) &&
    (!s.line.length || s.line.includes(p.line)) &&
    (!s.material.length || s.material.includes(matVal(p))) &&
    (!s.modelSize.length || s.modelSize.includes(p.modelSize)) &&
    (!s.finish.length || s.finish.includes(finishVal(p))) &&
    (!s.size.length || p.sizeOptions.some((sz) => s.size.includes(sz.label))) &&
    (!s.color.length || p.colors.some((c) => s.color.includes(colorFamily(c.name)))) &&
    (!s.width.length || s.width.includes(beltWidthBucket(p.modelSize))) &&
    (!s.personalize.length || (isBeltKit(p) && s.personalize.includes("Yes"))) &&
    (!s.universe.length || s.universe.includes(universeVal(p))) &&
    p.price >= lo && p.price <= hi);
  const filtered = useMemo(() => {
    let list = filterList(sel, onlineOnly, pMin, pMax);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    // Fall-Winter 2026 (batch 16 men 1-143, batch 17 women 1-330,
    // user-approved 2026-11-11): the FW rows carry fwPos = the original's
    // extraction position, and the grid lists them in the original's
    // order — Blue Eperon (fwPos 1) first on men's, Cashmere coat with
    // shawl collar (fwPos 1) first on women's. Only a list containing
    // fwPos rows is reordered; every other row has no fwPos, so every
    // other page keeps its exact order.
    // Stable sort: rows without fwPos keep their relative order after
    // the positioned rows, so sub-category views keep relative order too.
    else if (list.some((p) => p.fwPos !== undefined)) list = [...list].sort((a, b) => (a.fwPos ?? Infinity) - (b.fwPos ?? Infinity));
    return list;
  }, [base, sel, onlineOnly, sort, pMin, pMax]);
  // How many of OUR products the staged draft selection would show — the
  // number in the drawer's "APPLY Update {N} products" button (§F).
  const draftCount = useMemo(() => filterList(dSel, dOnline, dPriceMin ?? priceLo, dPriceMax ?? priceHi).length, [base, dSel, dOnline, dPriceMin, dPriceMax, priceLo, priceHi]);
  const openDrawer = () => { setDSel(sel); setDOnline(onlineOnly); setDSort(sort); setDPriceMin(priceMin); setDPriceMax(priceMax); setFOpen(true); };
  const applyDraft = () => { setSel(dSel); setOnlineOnly(dOnline); setSort(dSort); setPriceMin(dPriceMin); setPriceMax(dPriceMax); setVisible(40); setLoadedMsg(""); };
  const closeDrawer = () => { applyDraft(); setFOpen(false); };

  const totalSel = (Object.keys(EMPTY_SEL) as FGroup[]).reduce((n, g) => n + sel[g].length, 0) + (onlineOnly ? 1 : 0) + (priceNarrowed ? 1 : 0);
  const filtersActive = totalSel > 0;
  // The heading count is always honest: the number of products this store
  // actually carries in this list (the filtered count while filters apply).
  const displayCount = filtersActive ? filtered.length : base.length;

  // Drawer toggles edit the STAGED draft only — the grid is untouched until
  // APPLY / drawer close commits the draft (§F).
  const toggle = (group: FGroup, val: string) => {
    setDSel((s) => ({ ...s, [group]: s[group].includes(val) ? s[group].filter((x) => x !== val) : [...s[group], val] }));
  };
  const clearFilters = () => { setSel(EMPTY_SEL); setOnlineOnly(false); setSort("relevance"); setPriceMin(null); setPriceMax(null); setVisible(40); setLoadedMsg(""); };

  // Selected-filter pills (removable) + "Clear filters applied"
  type Pill = { group: FGroup | "online" | "price"; value: string; label: string };
  const pills: Pill[] = [
    ...(Object.keys(EMPTY_SEL) as FGroup[]).flatMap((g) => sel[g].map((v) => ({ group: g as FGroup | "online" | "price", value: v, label: v }))),
    ...(onlineOnly ? [{ group: "online" as const, value: "online", label: "Available online" }] : []),
    ...(priceNarrowed ? [{ group: "price" as const, value: "price", label: `${fmt(pMin)} – ${fmt(pMax)}` }] : []),
  ];
  const removePill = (pl: Pill) => {
    if (pl.group === "online") setOnlineOnly(false);
    else if (pl.group === "price") { setPriceMin(null); setPriceMax(null); }
    else { const g = pl.group; setSel((s) => ({ ...s, [g]: s[g].filter((x) => x !== pl.value) })); }
    setVisible(40); setLoadedMsg("");
  };

  // ---- Facet sections, built from THIS category's own products ------------
  const countBy = (fn: (p: Product) => string) => {
    const m = new Map<string, number>();
    for (const p of base) { const v = fn(p); if (v) m.set(v, (m.get(v) ?? 0) + 1); }
    return [...m.entries()].map(([value, count]) => ({ value, count })).sort((a, b) => a.value.localeCompare(b.value));
  };
  const sizeCount = new Map<string, number>();
  for (const p of base) for (const s of p.sizeOptions) sizeCount.set(s.label, (sizeCount.get(s.label) ?? 0) + 1);
  const sizeOpts = [...sizeCount.entries()].map(([value, count]) => ({ value, count })).sort((a, b) => (parseFloat(a.value) - parseFloat(b.value)) || a.value.localeCompare(b.value));
  const famMap = new Map<string, { count: number; hex: string }>();
  for (const p of base) {
    const seen = new Set<string>();
    for (const c of p.colors) {
      const f = colorFamily(c.name);
      if (seen.has(f)) continue;
      seen.add(f);
      const e = famMap.get(f);
      if (e) e.count += 1; else famMap.set(f, { count: 1, hex: c.hex });
    }
  }
  const colorOpts = [...famMap.entries()].map(([value, e]) => ({ value, count: e.count, hex: e.hex })).sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));

  const secCategory: FSection | null = base.length ? { key: "category", title: "Category", kind: "checks", group: "category", options: countBy((p) => catVal(p)) } : null;
  const secLine: FSection | null = countBy((p) => p.line).length ? { key: "line", title: isRTWPage ? "Collection" : "Line", kind: "checks", group: "line", options: countBy((p) => p.line) } : null;
  const secMaterial: FSection | null = countBy((p) => matVal(p)).length ? { key: "material", title: "Material", kind: "checks", group: "material", options: countBy((p) => matVal(p)) } : null;
  const secModelSize: FSection | null = countBy((p) => p.modelSize).length ? { key: "modelsize", title: "Model size", kind: "checks", group: "modelSize", options: countBy((p) => p.modelSize) } : null;
  const secFinish: FSection | null = countBy((p) => finishVal(p)).length ? { key: "finish", title: "Metallic finish", kind: "checks", group: "finish", options: countBy((p) => finishVal(p)) } : null;
  const secSize: FSection | null = sizeOpts.length ? { key: "size", title: "Size", kind: "size", group: "size", options: sizeOpts } : null;
  const secColor: FSection | null = colorOpts.length ? { key: "color", title: "Color", kind: "color", group: "color", options: colorOpts } : null;
  // Belts-only facets (verified facet JSON): Width buckets from the mm
  // modelSize; Personalize "Yes" for belt kits; Universe kit-width/complete.
  const secWidth: FSection | null = countBy((p) => beltWidthBucket(p.modelSize)).length ? { key: "width", title: "Width", kind: "checks", group: "width", options: countBy((p) => beltWidthBucket(p.modelSize)) } : null;
  const secPersonalize: FSection | null = countBy((p) => isBeltKit(p) ? "Yes" : "").length ? { key: "personalize", title: "Personalize", kind: "checks", group: "personalize", options: countBy((p) => isBeltKit(p) ? "Yes" : "") } : null;
  const secUniverse: FSection | null = countBy((p) => universeVal(p)).length ? { key: "universe", title: "Universe", kind: "checks", group: "universe", options: countBy((p) => universeVal(p)) } : null;
  const secPrice: FSection | null = priceHi - priceLo >= 50 ? { key: "price", title: "Price", kind: "price", options: [] } : null;
  const secSort: FSection = { key: "sort", title: "Sort by", kind: "sort", options: [] };
  const sections: FSection[] = [];
  const pushSec = (s: FSection | null) => { if (s) sections.push(s); };
  // Facet order per category — live extraction §F (belts: Available
  // online, Category, Metallic finish, Width, Personalize, Color, Size,
  // Price, Universe, Line, Sort by; men's shoes: Line, Material, Size,
  // Category, Universe, Color, Price, Sort by). "Available online" is the
  // switch rendered at the very top of the drawer, before the sections;
  // Sort by is a section inside the drawer and stays last. Other pages
  // keep their existing order.
  if (isBeltsPage) { pushSec(secCategory); pushSec(secFinish); pushSec(secWidth); pushSec(secPersonalize); pushSec(secColor); pushSec(secSize); pushSec(secPrice); pushSec(secUniverse); pushSec(secLine); pushSec(secSort); }
  else if (isMensShoesPage) { pushSec(secLine); pushSec(secMaterial); pushSec(secSize); pushSec(secCategory); pushSec(secUniverse); pushSec(secColor); pushSec(secPrice); pushSec(secSort); }
  else if (isRTWPage) { pushSec(secLine); pushSec(secSize); pushSec(secCategory); pushSec(secMaterial); pushSec(secColor); pushSec(secPrice); pushSec(secSort); }
  else if (isBagsPage) { pushSec(secCategory); pushSec(secLine); pushSec(secMaterial); pushSec(secModelSize); pushSec(secFinish); pushSec(secColor); pushSec(secPrice); pushSec(secSort); }
  else if (isShoesPage) { pushSec(secLine); pushSec(secMaterial); pushSec(secSize); pushSec(secColor); pushSec(secPrice); pushSec(secSort); }
  else { pushSec(secCategory); pushSec(secLine); pushSec(secMaterial); pushSec(secModelSize); pushSec(secSize); pushSec(secFinish); pushSec(secColor); pushSec(secPrice); pushSec(secSort); }
  const openSection = sections.some((s) => s.key === openKey) ? openKey : "";

  const quickBuyOn = isSneakersPage;

  // Editorial interlude in the unfiltered grid, as on hermes.com — but
  // ONLY the Belts page has one, and it is TEXT-ONLY (verified live
  // 2026-11-12 ~22:04): heading "Within reach" + the line below, no
  // image and no link. The wide IMAGE tile is removed everywhere: the
  // original's Shoes page has NO editorial tile at all (its "Light on
  // your feet" tile was invented), the Belts page has no image tile, and
  // the Bags page's two real wide tiles ("The goldsmith's touch" +
  // "City style", heading + italic subtext BELOW the photo + DISCOVER)
  // cannot be wired yet — their image URLs do not expose in the browser
  // (lazy-load placeholder). The invented AI-photo wide tile + the
  // invented "Ready to carry" text tile are gone.
  const edText = { title: "Within reach", body: "The silhouette sharpens, the gait lightens, hands are left free to roam.", view: null as View | null };
  type GridItem = { kind: "product"; p: Product } | { kind: "video"; p: Product } | { kind: "text" };
  const gridItems: GridItem[] = [];
  // The Fall-Winter collection page carries NO editorial tiles on the
  // original (verified in its first 120 products). Only the Belts page
  // carries the text interlude (verified live 2026-11-12).
  const isFallWinterPage = isRTWPage && (subLow === "fall-winter 2026 collection" || subLow === "fall-winter 2026");
  const showTextInterlude = !filtersActive && sort === "relevance" && !isFallWinterPage && isBeltsPage;
  filtered.slice(0, visible).forEach((p, i) => {
    // Fall-Winter video tiles: the 6 tile-video products render as wide
    // autoplay video tiles instead of photo tiles (original behaviour).
    if (isFallWinterPage && FW_VIDEO_TILE_IDS.has(p.id)) gridItems.push({ kind: "video", p });
    else gridItems.push({ kind: "product", p });
    if (showTextInterlude && i === 3) gridItems.push({ kind: "text" });
  });

  const renderSection = (s: FSection) => {
    const isOpen = openSection === s.key;
    const group = s.group;
    const selCount = group ? dSel[group].length : 0;
    const span = priceHi - priceLo;
    const dpMin = dPriceMin ?? priceLo;
    const dpMax = dPriceMax ?? priceHi;
    return (
      <div key={s.key} className="border-t border-black/10">
        <button aria-label={`${s.title} filter section`} aria-expanded={isOpen} className="flex w-full items-center justify-between py-4 text-left" onClick={() => setOpenKey(isOpen ? "" : s.key)}>
          <span className="text-[12px] font-semibold uppercase tracking-[0.22em]">{s.title}{selCount > 0 ? ` (${selCount})` : ""}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={`transition-transform ${isOpen ? "rotate-180" : ""}`}><path d="m5 9 7 7 7-7" /></svg>
        </button>
        {isOpen && (
          <div className="pb-5">
            {s.kind === "checks" && group && s.options.map((o) => (
              <label key={o.value} className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm">
                <input type="checkbox" aria-label={`${s.title} ${o.value}`} checked={dSel[group].includes(o.value)} onChange={() => toggle(group, o.value)} className="h-4 w-4 shrink-0 accent-black" />
                <span>{o.value} <span className="text-neutral-500">({o.count})</span></span>
              </label>
            ))}
            {s.kind === "color" && group && (
              <div className="grid grid-cols-6 gap-x-1 gap-y-3">
                {s.options.map((o) => {
                  const on = dSel[group].includes(o.value);
                  return (
                    <button key={o.value} aria-label={`Color ${o.value} (${o.count})`} aria-pressed={on} className="flex flex-col items-center gap-1" onClick={() => toggle(group, o.value)}>
                      <span className="h-8 w-8 rounded-full ring-1 ring-black/20" style={{ background: o.hex ?? "#cccccc", boxShadow: on ? "0 0 0 2px #fffcf7, 0 0 0 4px #000" : undefined }} />
                      <span className="text-center text-[10px] leading-tight">{o.value}</span>
                      <span className="text-[10px] leading-tight text-neutral-500">({o.count})</span>
                    </button>
                  );
                })}
              </div>
            )}
            {s.kind === "size" && group && (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {s.options.map((o) => {
                  const on = dSel[group].includes(o.value);
                  return (
                    <button key={o.value} aria-label={`Size ${o.value}, ${o.count} items`} aria-pressed={on} className={`border px-1 py-2 text-center ${on ? "border-black bg-black text-white" : "border-black/25 hover:border-black"}`} onClick={() => toggle(group, o.value)}>
                      <span className="block text-sm font-medium">{o.value}</span>
                      <span className={`block text-[10px] ${on ? "text-white/70" : "text-neutral-500"}`}>{o.count} item{o.count === 1 ? "" : "s"}</span>
                    </button>
                  );
                })}
              </div>
            )}
            {s.kind === "price" && (
              <div className="px-1 pt-2">
                <div className="relative h-6">
                  <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-black/15" />
                  <div className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-black" style={{ left: `${span > 0 ? ((dpMin - priceLo) / span) * 100 : 0}%`, width: `${span > 0 ? ((dpMax - dpMin) / span) * 100 : 100}%` }} />
                  <input type="range" aria-label="Minimum price" min={priceLo} max={priceHi} step={50} value={dpMin} onChange={(e) => { setDPriceMin(Math.min(Number(e.target.value), dpMax)); }} className="pointer-events-none absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-black [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black" />
                  <input type="range" aria-label="Maximum price" min={priceLo} max={priceHi} step={50} value={dpMax} onChange={(e) => { setDPriceMax(Math.max(Number(e.target.value), dpMin)); }} className="pointer-events-none absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-black [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black" />
                </div>
                <div className="mt-1 flex justify-between text-xs text-neutral-600"><span>{fmt(dpMin)}</span><span>{fmt(dpMax)}</span></div>
              </div>
            )}
            {s.kind === "sort" && [["relevance", "Relevance"], ["low", "Lowest price"], ["high", "Highest price"]].map(([v = "relevance", l = ""]) => (
              <label key={v} className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm">
                <input type="radio" name="catsort" aria-label={`Sort by ${l}`} checked={dSort === v} onChange={() => { setDSort(v); }} className="h-4 w-4 accent-black" />{l}
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-0 sm:px-6">
      {/* Plain-text breadcrumb (not links), then the title with its count
          attached directly — no description text at the top. Both are
          LEFT-aligned, as on hermes.com ("Fall-Winter 2026 Collection
          [330]"); the header-to-title gap is ~30px via the main top
          padding (category views) plus this block's zero top padding. */}
      <p className="font-mono-d text-left text-[10px] font-medium uppercase tracking-normal text-neutral-500">{crumbTop}</p>
      <h1 className="mt-1 text-left text-[24px] leading-[34px]">{titleText}<span className="ml-2 text-[16px] font-normal text-neutral-500">[{displayCount}]</span></h1>

      {/* Sub-nav row: siblings (current underlined) + FILTER button +
          Product/Mosaic view toggle. STICKY, pinned under the header like
          hermes.com: the user (2026-11-12 20:46) chose "Original jaisa pin
          karo". Its top offset (stickyTop) is the header height actually
          pinned right now — just the nav row in slim mode (scrolled down),
          the full header otherwise — so header + sub-nav stay one
          continuous pinned block with no gap. (Round 11 had made it scroll
          away; the live category audit showed hermes.com pins it on
          category pages.) ONE line at every width: on mobile the sibling
          row SCROLLS SIDEWAYS (it must never wrap to two lines or cut
          items off), the view toggle stays at the right end of the same
          line, and FILTER lives in the floating FILTER & SORT pill
          instead; on desktop the row shows fully with its FILTER button.
          The row is set at 11px with 12px gaps so all 9 Fall-Winter
          items + FILTER fit the 1280px content width at 1920px with no
          clipping and no scroll (measured against the real Manrope
          advances: ~1095px of ~1232px). */}
      <div className="sticky z-30 -mx-4 mt-4 bg-[#fcf7f1] px-4 py-3 sm:-mx-6 sm:px-6" style={{ top: stickyTop }}>
        <div className="flex items-center gap-x-3">
          <nav ref={subNavRef} className="no-scrollbar flex min-w-0 flex-1 gap-3 overflow-x-auto whitespace-nowrap" aria-label="Subcategories">
            {siblings.map((s) => (
              <button key={s.label} data-current={s.current || undefined} aria-label={`Subcategory ${s.label}`} aria-current={s.current || undefined} className={`shrink-0 border-b pb-[2px] pt-1 text-[11px] tracking-wide ${s.current ? "border-black font-medium text-black" : "border-transparent text-neutral-600 hover:text-black"}`} onClick={() => go(s.view)}>{s.label}</button>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-3">
            <button aria-label={totalSel ? `Open filters, ${totalSel} selected` : "Open filters"} className={`font-mono-d hidden items-center gap-2 py-1 text-xs font-medium uppercase tracking-normal lg:flex ${totalSel > 0 ? "bg-black px-3 text-white" : ""}`} onClick={openDrawer}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 6h12M19 6h2M3 12h4M11 12h10M3 18h9M16 18h5" /><circle cx="17" cy="6" r="2" /><circle cx="9" cy="12" r="2" /><circle cx="14" cy="18" r="2" /></svg>
              FILTER{totalSel > 0 ? ` (${totalSel})` : ""}
            </button>
            <div className="flex items-center gap-1.5" role="radiogroup" aria-label="View toggle">
              <button aria-label="Product view" role="radio" aria-checked={!mosaic} className={`flex h-8 w-8 items-center justify-center ${!mosaic ? "text-black" : "text-neutral-400 hover:text-neutral-600"}`} onClick={() => setMosaic(false)}>
                {/* hermes.com's Product-view icon is ONE square divided by a
                    thick black cross (a windowpane), not four separate small
                    squares. The previous 4-square grid read as a grid; the
                    original is a single outer outline with a solid cross
                    through its middle. Strokes are pure #000 when active,
                    inactive stays currentColor (grey). */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={!mosaic ? "#000" : "currentColor"} aria-hidden="true"><rect x="4" y="4" width="16" height="16" strokeWidth="1.5" /><line x1="12" y1="4" x2="12" y2="20" strokeWidth="2" /><line x1="4" y1="12" x2="20" y2="12" strokeWidth="2" /></svg>
              </button>
              <button aria-label="Mosaic view" role="radio" aria-checked={mosaic} className={`flex h-8 w-8 items-center justify-center ${mosaic ? "text-black" : "text-neutral-400 hover:text-neutral-600"}`} onClick={() => setMosaic(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="11" height="7" /><rect x="16" y="3" width="5" height="11" /><rect x="3" y="12" width="6" height="9" /><rect x="11" y="12" width="5" height="5" /><rect x="11" y="19" width="10" height="2" /></svg>
              </button>
            </div>
          </div>
        </div>
        {filtersActive && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-black/10 pt-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Selected filters:</span>
            {pills.map((pl) => (
              <button key={`${pl.group}-${pl.value}`} aria-label={`Remove this filter ${pl.label}`} className="flex items-center gap-1.5 bg-black px-2.5 py-1 text-xs uppercase text-white" onClick={() => removePill(pl)}>
                {pl.label}<span aria-hidden="true">×</span>
              </button>
            ))}
            <button aria-label="Clear filters" className="ml-auto text-xs underline underline-offset-4" onClick={clearFilters}>Clear</button>
          </div>
        )}
      </div>

      {filtered.length === 0 && <p className="py-16 text-center text-sm text-neutral-600">{sub ? `No articles in “${sub}” in this store yet.` : "No articles match these filters. Clear a filter to see more."}</p>}

      {!mosaic ? (
        <div className="carousel-full-bleed mt-8 grid grid-cols-2 gap-[2px] lg:grid-cols-4">
          {gridItems.map((it) => it.kind === "product" ? (
            <ProductCard key={it.p.id} p={it.p} colourInName onOpen={(id) => go({ t: "product", id })} onQuickBuy={quickBuyOn && isSneakerProduct(it.p) ? (prod) => addToCart(prod) : undefined} />
          ) : it.kind === "video" ? (
            <VideoTile key={it.p.id} p={it.p} onOpen={(id) => go({ t: "product", id })} />
          ) : (
            <div key="ed-text" className="flex aspect-square flex-col justify-center bg-[#efe9df] p-6">
              <p className="font-serif-d text-xl italic">{edText.title}</p>
              <p className="mt-3 text-sm leading-6 text-neutral-700">{edText.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="mt-8 columns-2 gap-2 sm:columns-4 lg:columns-7">
            {filtered.map((p, i) => (
              <button key={p.id} aria-label={p.name} className="mb-2 block w-full break-inside-avoid overflow-hidden" style={{ background: p.tone }} onClick={() => go({ t: "product", id: p.id })}>
                <img src={productImageFor(p)} alt={p.name} loading="lazy" className={`w-full object-cover ${MOSAIC_ASPECTS[i % MOSAIC_ASPECTS.length] ?? "aspect-square"}`} />
              </button>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-neutral-500">{`${filtered.length} products viewed out of ${filtered.length}`}</p>
        </div>
      )}

      {!mosaic && visible < filtered.length && (
        <div className="mt-12 text-center">
          <p className="text-xs text-neutral-500">{`${Math.min(visible, filtered.length)} products viewed out of ${filtered.length}`}</p>
          <div className="mx-auto mt-4 h-px w-[120px] bg-black/15"><div className="h-full bg-black transition-all" style={{ width: `${filtered.length ? (Math.min(visible, filtered.length) / filtered.length) * 100 : 0}%` }} /></div>
          <button aria-label="SEE MORE PRODUCTS" className="font-mono-d mt-4 inline-flex h-12 items-center justify-center border border-black px-8 text-xs font-medium uppercase tracking-normal" onClick={() => { const next = Math.min(visible + 40, filtered.length); const added = next - visible; setVisible(next); setLoadedMsg(`${added} products loaded`); }}>SEE MORE PRODUCTS</button>
          {loadedMsg && <p className="sr-only" role="status">{loadedMsg}</p>}
        </div>
      )}
      {!mosaic && visible >= filtered.length && filtered.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-xs text-neutral-500">{`${filtered.length} products viewed out of ${filtered.length}`}</p>
          <div className="mx-auto mt-4 h-px w-[120px] bg-black" />
        </div>
      )}

      {/* Below the grid: linked breadcrumb → Product theme carousel →
          (women's bags only) category description → service strip/footer. */}
      <nav aria-label="Breadcrumb" className="font-mono-d mt-12 border-t border-black/10 pt-5 text-center text-[10px] font-medium uppercase tracking-normal text-neutral-500 lg:mt-16">
        <button aria-label={`Breadcrumb ${label}`} className="underline-offset-4 hover:underline" onClick={() => go({ t: "category", cat })}>{label}</button>
        {sub && (
          <>
            {" / "}
            <button aria-label={`Breadcrumb ${isBagsPage ? "Bags and clutches" : isRTWPage ? "Ready-to-Wear" : (base[0]?.subcategory ?? sub)}`} className="underline-offset-4 hover:underline" onClick={() => go({ t: "category", cat, sub: isBagsPage ? "Bags and clutches" : isRTWPage ? "Ready-to-Wear" : sub })}>{(isBagsPage ? "Bags and clutches" : isRTWPage ? "Ready-to-Wear" : (base[0]?.subcategory ?? sub)).toUpperCase()}</button>
            {" / "}
            <span className="normal-case tracking-normal text-black">{titleText}</span>
          </>
        )}
        {!sub && (<>{" / "}<span className="normal-case tracking-normal text-black">{titleText}</span></>)}
      </nav>

      {/* Product theme carousel — the original's category page has this swiper
          (aria-label "Product theme carousel", 15 slides = 5 categories x 3)
          with NO visible heading, NO counter and NO arrow buttons (verified
          in hermes.com's rendered category HTML: no "Product theme" heading
          text, no "/15" counter anywhere — swipe-only). */}
      <section className="mt-12 lg:mt-10" aria-label="Product theme carousel">
        {isFallWinterPage ? (
          <FallWinterThemeCarousel go={go} />
        ) : (
        <div ref={themeRef} className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-1">
          {(() => {
            const themed = isBeltsPage ? THEME_CAROUSEL_DATA.belts : isMensShoesPage ? THEME_CAROUSEL_DATA.menshoes : null;
            if (themed) {
              // 5 page-dependent themes x 3 repeats = 15 slides, editorial
              // images with the overlay title bottom-right (as on hermes.com).
              const slides = [...themed, ...themed, ...themed];
              return slides.map((slide, i) => (
                <button key={`${slide.label}-${i}`} data-theme-card aria-label={`Product theme ${slide.label}`} className="relative w-[42%] shrink-0 snap-start overflow-hidden text-left sm:w-[23%] lg:w-[18.6%]" onClick={() => go(slide.view)}>
                  <picture>
                    <source media="(min-width: 1024px)" srcSet={slide.imgDesktop} />
                    <img src={slide.imgMo} alt={slide.label} loading="lazy" className="aspect-[3/4] w-full object-cover lg:aspect-[16/9]" />
                  </picture>
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-2 pb-2 pt-10 text-right text-[12px] font-bold uppercase leading-5 text-white">{slide.label}</span>
                </button>
              ));
            }
            return THEME_CARDS.map((card) => {
              const rep = products.find((p) => p.category === (card.view.t === "category" ? card.view.cat : ""));
              return (
                <button key={card.label} data-theme-card aria-label={`Product theme ${card.label}`} className="w-[42%] shrink-0 snap-start text-left sm:w-[23%] lg:w-[18.6%]" onClick={() => go(card.view)}>
                  <span className="block aspect-[4/3] overflow-hidden bg-[#ece7dd]">{rep && <img src={productImageFor(rep)} alt="" className="h-full w-full object-cover" />}</span>
                  <span className="mt-2 block text-sm">{card.label}</span>
                </button>
              );
            });
          })()}
        </div>
        )}
      </section>


      <button aria-label="Filter and sort products" className={`font-mono-d fixed bottom-4 left-1/2 z-40 flex h-12 -translate-x-1/2 items-center gap-2 px-8 text-xs font-medium uppercase tracking-normal shadow-lg ring-1 ring-black/10 lg:hidden ${totalSel > 0 ? "bg-black text-white" : "bg-white"}`} onClick={openDrawer}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2.2" /><circle cx="10" cy="17" r="2.2" /></svg>
        Filter &amp; Sort{totalSel > 0 ? ` (${totalSel})` : ""}
      </button>

      {fOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={closeDrawer}>
          <div className="drawer-in absolute flex flex-col bg-[#fffcf7] max-lg:inset-x-0 max-lg:bottom-0 max-lg:max-h-[88vh] lg:right-0 lg:top-0 lg:h-full lg:w-[33vw] lg:min-w-[380px] lg:max-w-[520px]" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Filter">
            <div className="flex items-center justify-between px-6 pt-5">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.25em]">FILTER</h2>
              <button aria-label="Close filters" className="flex items-center gap-1.5 py-1 text-sm" onClick={closeDrawer}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
                Close
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-4">
              <p className="mt-3 text-xs leading-5 text-neutral-500">Selecting a filter will apply the update to products count based on selection</p>
              <div className="mt-4 flex items-start justify-between gap-4 border-t border-black/10 pt-4">
                <div>
                  <p className="text-sm font-medium">Available online</p>
                </div>
                <button type="button" role="switch" aria-checked={dOnline} aria-label="Available online" onClick={() => { setDOnline(!dOnline); }} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${dOnline ? "bg-black" : "bg-black/25"}`}>
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${dOnline ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </div>
              {sections.map(renderSection)}
            </div>
            <div className="border-t border-black/10 px-6 py-4">
              <button aria-label={`Apply filters, update ${draftCount} products`} className="w-full bg-black py-3.5 text-[12px] font-semibold uppercase tracking-[0.25em] text-white" onClick={closeDrawer}>APPLY Update {draftCount} products</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RelatedRow({ title, items, go, mt, onQuickBuy, hidePrice, feature }: { title: string; items: Product[]; go: (v: View, opts?: { restore?: boolean }) => void; mt?: string; onQuickBuy?: (p: Product) => void; hidePrice?: boolean; feature?: Product }) {
  if (items.length === 0) return null;
  const tile = (x: Product) => (
    <div key={x.id} className="cursor-pointer lg:w-[220px] lg:shrink-0" role="link" aria-label={`${x.name}, ${priceText(x)}`} tabIndex={0} onClick={() => go({ t: "product", id: x.id })} onKeyDown={(e) => { if (e.key === "Enter") go({ t: "product", id: x.id }); }}>
      {/* Recommendation tiles (Perfect Partner / Keep exploring) have NO
          Quick buy button and NO status — hermes.com never shows either on
          its recommendation tiles. The photo is the tile's own image only. */}
      <div className="relative aspect-[3/4] overflow-hidden"><ProductVisual p={x} hideStatus /></div>
      <p className="mt-2 px-2 text-xs leading-5">{x.name}</p>
      {x.colors[0] && <p className="sr-only">Color: {x.colors[0].name}</p>}
      {!hidePrice && <p className="mt-0.5 px-2 text-xs leading-5">{priceText(x)}</p>}
    </div>
  );
  return (
    <section className={`mx-auto ${mt ?? "mt-12 lg:mt-20"} max-w-5xl px-4 sm:px-6`}>
      {/* Heading as in the user's video: large italic serif, centred
          ("The Perfect Partner"). Tiles are LARGE on mobile — a 2-column
          grid of big photos, nearly full-width halves — and a 4-across
          horizontal row on desktop. With `feature` (the current product,
          hermes.com's "The Perfect Partner" mosaic) the first tile is
          LARGE — the product itself, spanning both rows of a 2×2 grid of
          the partner tiles beside it, image only, no name or price. */}
      <h2 className="font-serif-d text-center text-[30px] italic leading-snug">{title}</h2>
      {feature ? (
        <div className="mt-8 grid grid-cols-2 gap-[2px] lg:flex lg:gap-[2px]">
          <div className="col-span-2 cursor-pointer lg:w-[480px] lg:shrink-0" role="link" aria-label={`${feature.name}, ${priceText(feature)}`} tabIndex={0} onClick={() => go({ t: "product", id: feature.id })} onKeyDown={(e) => { if (e.key === "Enter") go({ t: "product", id: feature.id }); }}>
            <div className="relative aspect-[3/4] overflow-hidden lg:aspect-auto lg:h-full"><ProductVisual p={feature} /></div>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-[2px] lg:flex lg:flex-col lg:gap-[2px]">
            <div className="contents lg:flex lg:gap-[2px]">{items.slice(0, 2).map(tile)}</div>
            <div className="contents lg:flex lg:gap-[2px]">{items.slice(2, 4).map(tile)}</div>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-[2px] lg:flex lg:overflow-x-auto lg:pb-1">
          {items.map(tile)}
        </div>
      )}
    </section>
  );
}

// Real Hermes product video — the original hermes.com video for a
// product, downloaded and hosted on the store itself (user instruction
// 2026-11-09/10: use the original video wherever the original site has
// one). The HLS (.m3u8) hotlink was replaced 2026-11-10 because the stream
// never advanced in the browser (frozen poster, 0 pixel change over 7s of
// "playing"): the MP4 here is the same original Hermes clip, converted
// from the HLS stream and served from the store's own origin, so a plain
// <video> plays it natively in every browser — no hls.js, no cross-origin
// fetch. Muted, no autoplay, no seek bar: it only plays while `playing`
// is true, exactly like the original product-page video.
function ProductVideo({ src, poster, playing, muted = true, className }: { src: string; poster: string; playing: boolean; muted?: boolean; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
    if (playing) video.play().catch(() => {});
    else video.pause();
  }, [playing, muted]);
  return <video ref={videoRef} src={src} muted={muted} loop playsInline preload="metadata" poster={poster} className={className} aria-label="Product video" />;
}

function ProductView({ products, id, go, addToCart, settings, user, from, lastViewedIds, onViewed, onBuyBarChange }: { products: Product[]; id: number; go: (v: View, opts?: { restore?: boolean }) => void; addToCart: (p: Product, c?: string, s?: string, q?: number) => void; settings: Settings; user: { name: string; email: string } | null; from: View | null; lastViewedIds: number[]; onViewed: (id: number) => void; onBuyBarChange: (visible: boolean) => void }) {
  const p = products.find((x) => x.id === id) ?? products[0];
  // The category this product was opened from (tracked in App when
  // navigating to a product). Back controls return to it; a deep link has
  // no origin, so it falls back to the product's own subcategory page.
  const backCat: { t: "category"; cat: string; sub?: string } = from && from.t === "category" ? from : { t: "category", cat: p.category, sub: p.subcategory };
  const backView: View = from ?? backCat;
  const goBack = () => go(backView, { restore: true });
  // Breadcrumb middle crumb: the product's season collection when it has
  // one (the original's product breadcrumb is WOMEN / FALL-WINTER 2026
  // COLLECTION / <name>), otherwise its subcategory.
  const collName = p.line === "Fall-Winter 2026" ? "Fall-Winter 2026 Collection" : p.line === "Spring-Summer 2026" ? "Spring-Summer 2026 Collection" : null;
  const crumbMid = collName ?? p.subcategory;
  // Finish options (e.g. the Kelly Pocket belt's Gold / Argenté buckle group)
  // ride in a detail line so no schema change is needed; the selected finish
  // is the product's metallicFinish.
  const [colorIdx, setColorIdx] = useState(0);
  const [thumb, setThumb] = useState(0);
  const [vidPlaying, setVidPlaying] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  // IMAGE GALLERY dialog zoom — the original's vertical slider. The zoom is
  // a continuous scale over the "fit-height" base (photo height = viewport
  // height): 1 = whole photo (height fills the viewport), 10 = extreme
  // close-up, default = the "cover" scale that fills the viewport width.
  // null = default (cover, recomputed from the photo's aspect). +/− move one
  // ×1.516 step; dragging the thumb sets it from the dot (log scale).
  const [zoom, setZoom] = useState<number | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dialogIdx, setDialogIdx] = useState(0);
  const [imgAspect, setImgAspect] = useState(0.75);
  const [vp, setVp] = useState({ w: typeof window !== "undefined" ? window.innerWidth : 1920, h: typeof window !== "undefined" ? window.innerHeight : 998 });
  const dragRef = useRef<{ x: number; y: number; pan: { x: number; y: number } } | null>(null);
  const sliderDragRef = useRef(false);
  const sliderHitRef = useRef<HTMLDivElement>(null);
  const [sizeDrawer, setSizeDrawer] = useState(false);
  // "SIZE GUIDE" drawer (hermes.com): a right-side drawer with the
  // measurement table — RTW (7-col), knitwear (5-col) and shoes (3-col:
  // Hermès Size | US/UK | Foot length, measured live 2026-11-12).
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [guideTab, setGuideTab] = useState<"chart" | "measure">("chart");
  const [guideUnit, setGuideUnit] = useState<"cm" | "in">("in");
  const isShoeSize = p.subcategory === "Shoes";
  // Ready-to-wear size chart (Hermes Size | US | Chest | Waist | Hip |
  // Back width | Sleeves length), transcribed LIVE from the original's
  // Size Guide drawer on the Blanc coat PDP (2026-11-11 23:21). Inches are
  // decimal values with a " suffix; cm reproduces the site's own separators
  // verbatim (commas in most rows, a period in one) — never derived.
  const RTW_CHART_IN: [string, string, string, string, string, string, string][] = [
    ["32", "0", "28.86\"", "22.23\"", "31.6\"", "13\"", "26\""],
    ["34", "2", "30.42\"", "23.79\"", "33.15\"", "13.65\"", "26.38\""],
    ["36", "4", "31.98\"", "25.35\"", "34.71\"", "13.84\"", "26.77\""],
    ["38", "6", "33.54\"", "26.91\"", "36.27\"", "14.04\"", "27\""],
    ["40", "8", "35.1\"", "28.47\"", "37.83\"", "14.43\"", "27.36\""],
    ["42", "10", "36.66\"", "30.03\"", "39.39\"", "14.82\"", "27.76\""],
    ["44", "12", "38.22\"", "31.59\"", "40.95\"", "15.21\"", "28.15\""],
    ["46", "14", "39.78\"", "33.15\"", "42.51\"", "15.6\"", "28.54\""],
    ["48", "16", "41.34\"", "34.71\"", "44.07\"", "15.99\"", "28.94\""],
    ["50", "18", "42.9\"", "36.27\"", "45.63\"", "16.38\"", "29.33\""],
    ["52", "20", "44.46\"", "37.83\"", "47.19\"", "16.77\"", "29.72\""],
  ];
  const RTW_CHART_CM: [string, string, string, string, string, string, string][] = [
    ["32", "0", "74 cm", "57 cm", "81 cm", "33 cm", "66,5 cm"],
    ["34", "2", "78 cm", "61 cm", "85 cm", "35 cm", "67,5 cm"],
    ["36", "4", "82 cm", "65 cm", "89 cm", "35.5 cm", "68,5 cm"],
    ["38", "6", "86 cm", "69 cm", "93 cm", "36 cm", "69 cm"],
    ["40", "8", "90 cm", "73 cm", "97 cm", "37 cm", "69,5 cm"],
    ["42", "10", "94 cm", "77 cm", "101 cm", "38 cm", "70,5 cm"],
    ["44", "12", "98 cm", "81 cm", "105 cm", "39 cm", "71,5 cm"],
    ["46", "14", "102 cm", "85 cm", "109 cm", "40 cm", "72,5 cm"],
    ["48", "16", "106 cm", "89 cm", "113 cm", "41 cm", "73,5 cm"],
    ["50", "18", "110 cm", "93 cm", "117 cm", "42 cm", "74,5 cm"],
    ["52", "20", "114 cm", "97 cm", "121 cm", "43 cm", "75,5 cm"],
  ];
  // Measurement-guide steps, verbatim from the original's Size Guide
  // drawer (including the site's "strech" spelling — do not correct it).
  const MEASURE_STEPS: [string, string][] = [
    ["Chest circumference", "Starting from the back, wrap the measuring tape around the largest part of your chest. Make sure to keep a straight horizontal line."],
    ["Waist circumference", "Starting from the back, wrap the measuring tape around your waist, running it over your belly button."],
    ["Hip circumference", "Starting from the back, wrap the measuring tape around the largest part of your hips."],
    ["Back width", "Running the measuring tape on your back, place the tip on the extremity of one shoulder and then strech it to the other shoulder."],
    ["Sleeves length", "Keeping your arm outstretched, place the tip of the measuring tape at the top of your shoulder and strech it down to the wrist."],
  ];
  // Knitwear (sweaters/cardigans) Size Guide — the original's chart for a
  // knit has only 5 columns (no Hip, no Back width) and 3 measurement
  // steps (no Hip, no Back width). The figures are the RTW chart's own
  // chest/waist/sleeve values (verified identical on the sweater's PDP,
  // 2026-11-12) — derived from the chart above, never retyped.
  const KNIT_CHART_IN = RTW_CHART_IN.map((r) => [r[0], r[1], r[2], r[3], r[6]] as [string, string, string, string, string]);
  const KNIT_CHART_CM = RTW_CHART_CM.map((r) => [r[0], r[1], r[2], r[3], r[6]] as [string, string, string, string, string]);
  const KNIT_MEASURE_STEPS = [MEASURE_STEPS[0], MEASURE_STEPS[1], MEASURE_STEPS[4]];
  const isKnit = p.subcategory === "Knitwear and twillaines";
  // SHOES Size Guide — transcribed LIVE from the original's Bouncing
  // sneaker PDP Size Guide drawer (2026-11-12): 3 columns (Hermès Size |
  // US or UK | Foot length), Hermès sizes 34–42 in half sizes. Foot length
  // uses a comma decimal in cm ("21,80 cm") and a period in inches; the
  // US view shows inches with TWO decimals ("8.58\"") while the UK view
  // rounds to ONE decimal ("8.6\"") — the same physical length, the
  // original's own display difference, preserved exactly. The location
  // selector offers US + UK here (the two measured conversions); the
  // original offers 17 locations, the other 15 are not yet measured.
  // Row: [Hermès, US, UK, foot cm, foot inches (US view, 2 dec), foot inches (UK view, 1 dec)]
  const SHOE_CHART: [string, string, string, string, string, string][] = [
    ["34", "4", "2", "21,80 cm", "8.58\"", "8.6\""],
    ["34,5", "4,5", "2,5", "22,14 cm", "8.66\"", "8.7\""],
    ["35", "5", "3", "22,47 cm", "8.78\"", "8.8\""],
    ["35,5", "5,5", "3,5", "22,80 cm", "8.9\"", "9\""],
    ["36", "6", "4", "23,13 cm", "9.02\"", "9.1\""],
    ["36,5", "6,5", "4,5", "23,47 cm", "9.15\"", "9.2\""],
    ["37", "7", "5", "23,8 cm", "9.27\"", "9.4\""],
    ["37,5", "7,5", "5,5", "24,13 cm", "9.39\"", "9.5\""],
    ["38", "8", "6", "24,47 cm", "9.51\"", "9.6\""],
    ["38,5", "8,5", "6,5", "24,80 cm", "9.64\"", "9.8\""],
    ["39", "9", "7", "25,13 cm", "9.76\"", "9.9\""],
    ["39,5", "9,5", "7,5", "25,47 cm", "9.88\"", "10\""],
    ["40", "10", "8", "25,80 cm", "10\"", "10.2\""],
    ["40,5", "10,5", "8,5", "26,13 cm", "10.13\"", "10.3\""],
    ["41", "11", "9", "26,46 cm", "10.25\"", "10.4\""],
    ["41,5", "11,5", "9,5", "26,80 cm", "10.37\"", "10.6\""],
    ["42", "12", "10", "27,13 cm", "10.49\"", "10.7\""],
  ];
  const SHOE_CHART_INTRO = "To find your perfect size, enter your usual size and we'll convert it for you.";
  const SHOE_MEASURE_HEADING = "Taking the appropriate measures!";
  const SHOE_MEASURE_INTRO = "To find the perfect size, use a measuring tape to measure yourself following the steps explained below. We recommend that you keep the measuring tape loose and that you size up if you are in-between sizes.";
  const SHOE_MEASURE_STEPS: [string, string][] = [
    ["Place the tip of your bare foot against the wall.", ""],
    ["Place your foot on a piece of paper on a flat and solid surface and draw a line at the tip of your biggest toe using a pencil.", ""],
    ["Measure the length between the two lines.", ""],
    ["Refer to the chart below to find the corresponding shoe size.", ""],
  ];
  const SHOE_MEASURE_TIP = "Our tip: Following the instructions, measure both feet and take into account the maximum length when selecting your shoe size.";
  // Shoe Size Guide location (US default, UK measured too). The RTW/knit
  // drawer keeps its US-only location select (unchanged).
  const [guideLoc, setGuideLoc] = useState<"US" | "UK">("US");
  // No pre-selected size: hermes.com never pre-selects one (the buy-box
  // button always reads "Select a size" on landing, on every colourway).
  // The old `p?.defaultSize` init made the Noir coat's button read
  // "Select a size 32" — the ref still shows the first size (…DA0232)
  // via displaySize below, so nothing is lost by starting empty.
  const [selSize, setSelSize] = useState("");
  const [sizeGone, setSizeGone] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState(user?.email ?? "");
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [notified, setNotified] = useState("");
  // Apple Pay is only offered on devices that support it. ApplePaySession
  // exists on iOS/macOS Safari; on Android Chrome it does not, and the
  // original hides the PAY button there — the user's phone screenshot
  // 2026-11-13 shows only ADD TO CART on the original (Android).
  const applePayAvailable = typeof window !== "undefined" && typeof (window as unknown as { ApplePaySession?: unknown }).ApplePaySession !== "undefined";
  const [accOpen, setAccOpen] = useState(-1);
  const stripRef = useRef<HTMLDivElement>(null);
  // Sticky desktop buy bar: shown once the buy panel has scrolled out of
  // view (IntersectionObserver on the buy box itself).
  const buyBoxRef = useRef<HTMLDivElement>(null);
  const [buyBoxInView, setBuyBoxInView] = useState(true);
  useEffect(() => {
    const el = buyBoxRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const ob = new IntersectionObserver((es) => setBuyBoxInView(!!es[0]?.isIntersecting), { threshold: 0 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  // Report the desktop sticky bar's visibility up to the App so the chat
  // bubble can sit above it (hermes.com: the bubble clears the bar with
  // a gap; ours overlapped ADD TO CART, hiding the final "T"). Only the
  // desktop bar counts — it is lg-only; the mobile bubble already sits
  // 76px up on product pages. Cleanup resets it on unmount/product change.
  // hermes.com also hides the bar at the very bottom of the page (the
  // footer lockup) — it stays visible through the service strip and the
  // footer columns, then disappears once the lockup is in view.
  const [nearBottom, setNearBottom] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      setNearBottom(doc.scrollHeight - window.scrollY - window.innerHeight < 150);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  useEffect(() => {
    onBuyBarChange(!!p && isBuyableStatus(p.status) && !buyBoxInView && !nearBottom);
    return () => onBuyBarChange(false);
  }, [buyBoxInView, nearBottom, p?.status, onBuyBarChange]);
  const notifyMut = useMutation({ mutationFn: () => api.requestNotify({ productId: p?.id ?? 0, productName: p?.name ?? "", email: notifyEmail }), onSuccess: () => setNotified("Thank you — we will notify you when this product is back in stock.") });
  // Last viewed: session-only, derived from the App-level id list (never
  // seeded from storage) — the section renders only once at least one
  // product was actually opened in this session (RelatedRow returns null
  // for an empty list). The current product is excluded.
  const lastViewed = lastViewedIds.filter((x) => x !== p.id).slice(0, 4).map((i) => products.find((x) => x.id === i)).filter((x): x is Product => !!x);
  useEffect(() => {
    if (!p) return;
    api.recordProductView({ productId: p.id }).catch(() => {});
    onViewed(p.id);
  }, [p?.id]);
  useEffect(() => {
    // A video view AUTOPLAYS (muted, loop) the moment it is selected;
    // leaving it stops it. The strip slides sideways so the selected view
    // lands in the FIRST position (snap-start panels + inline "start").
    const isVideoView = galleryForProduct(p, colorIdx)[thumb]?.video;
    setVidPlaying(!!isVideoView);
    stripRef.current?.querySelectorAll<HTMLElement>("[data-panel]")[thumb]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, [thumb]);
  useEffect(() => { if (!zoomOpen) return; const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomOpen(false); }; document.addEventListener("keydown", onKey); return () => document.removeEventListener("keydown", onKey); }, [zoomOpen]);
  // Track the viewport while the gallery dialog is open (the dialog's zoom
  // math is viewport-relative).
  useEffect(() => { if (!zoomOpen) return; const onRs = () => setVp({ w: window.innerWidth, h: window.innerHeight }); onRs(); window.addEventListener("resize", onRs); return () => window.removeEventListener("resize", onRs); }, [zoomOpen]);
  if (!p) return <p className="p-10 text-center">Product not found.</p>;
  const color = p.colors[colorIdx] ?? p.colors[0];
  // Sibling colourways (Cashmere coat): hermes.com shows both colour
  // thumbs on each colour's page and tapping one navigates to that
  // colour's own product page. Siblings render first (Noir before Blanc
  // Naturel on the Blanc page, as on hermes.com); the own colour stays
  // selected.
  const colorwaySiblings = (p.colorwayRefs ?? []).map((ref) => products.find((x) => x.refCode === ref)).filter((x): x is Product => !!x && x.id !== p.id);
  // Colour photo thumbnails (hermes.com, measured 2026-11-11): one 53x70
  // photo per colourway — the colourway's own tile photo — selected
  // underlined, in refCode order (the original's Blanc page lists Noir
  // first, Blanc second). Only when a distinct photo exists per colourway
  // (colourway siblings + own tile, or a single colour); several colours
  // on one row keep the solid hex squares (no per-colour photo exists).
  const colorThumbs: { key: string; src: string; name: string; selected: boolean; onClick: () => void }[] | null = (() => {
    if (!color) return null;
    if (colorwaySiblings.length > 0) {
      const rows = [...colorwaySiblings, p].sort((a, b) => (a.refCode ?? "").localeCompare(b.refCode ?? ""));
      return rows.map((row) => {
        const isOwn = row.id === p.id;
        const cn = row.colors[0];
        return { key: `ct-${row.id}`, src: productImageFor(row), name: isOwn ? (color.pdpName ?? color.name) : (cn?.pdpName ?? cn?.name ?? ""), selected: isOwn, onClick: () => { if (!isOwn) go({ t: "product", id: row.id }); } };
      });
    }
    if (p.colors.length === 1) {
      return [{ key: "ct-own", src: productImageFor(p), name: color.pdpName ?? color.name, selected: true, onClick: () => {} }];
    }
    return null;
  })();
  const isShoe = p.subcategory === "Shoes" || /sneaker|boot|loafer/i.test(p.name);
  const isRTW = p.subcategory.toLowerCase().includes("ready") || p.subcategory === "Dresses and skirts" || (p.category === "equestrian" && /jacket/i.test(p.name));
  const hasCustomSizes = (p.sizeOptions?.length ?? 0) > 0;
  const needsSize = isShoe || isRTW || hasCustomSizes;
  const sizeList: { label: string; available: boolean }[] = hasCustomSizes ? p.sizeOptions : isShoe ? ["40", "41", "42", "43", "44", "45"].map((label) => ({ label, available: true })) : ["XS", "S", "M", "L", "XL"].map((label) => ({ label, available: true }));
  const canAdd = isBuyableStatus(p.status) && !sizeGone && (!needsSize || selSize !== "");
  // Shown reference (hermes.com): the base ref + the selected size,
  // defaulting to the FIRST size when none is chosen yet (Blanc coat:
  // H6H0113DAA3 + 36 = H6H0113DAA336). Products with no size row keep
  // the bare ref. NOTE for the data pass: the coat's first size in
  // sizeOptions must be the one the original shows on landing (34) —
  // with sizes stored [32,34,36,38,40,42] this computes ...DAA332.
  const displaySize = selSize || sizeList[0]?.label || "";
  // Shoe refs on hermes.com use a SPACE where the refCode has "v" and the
  // size as tenths (38.5 -> 385): "H261015Zv90" + size 38.5 displays as
  // "H261015Z 90385" (verified live 2026-11-13). Only for refs containing
  // "v"; other shoes keep the plain refCode + size form.
  const displayRef = p.refCode && needsSize && displaySize
    ? (isShoe && p.refCode.includes("v") && !Number.isNaN(parseFloat(displaySize))
        ? `${p.refCode.replace("v", " ")}${Math.round(parseFloat(displaySize) * 10)}`
        : `${p.refCode}${displaySize}`)
    : p.refCode;
  // Gallery views — EVERY view is a DISTINCT photo whose content matches
  // its label (Detail = extreme close-up, Worn = model wearing it, Above =
  // top-down, Back = rear, Side = profile), shot for that view in
  // galleryImages.ts. The old build reused the product's single tile photo
  // for every view with CSS rotate/scale transforms — that was the user's
  // exact complaint ("2nd and 3rd photos are in the wrong style or just
  // repeat the first"). Colour switch reloads the WHOLE gallery with the
  // selected colourway's own photos and backgrounds, thumbnails included.
  type GalView = { label: string; src: string; video?: boolean; videoSrc?: string };
  // Hi-res PDP photos: the strip, thumbnails, dialog and video poster all
  // use the original's 1536x2048 dialog form (hiResHermes) — the 300x400
  // strip file upscaled 2x+ is exactly the blur the user reported.
  const views: GalView[] = galleryForProduct(p, colorIdx).map((v) => ({ ...v, src: hiResHermes(v.src) }));
  const curView = views[thumb] ?? views[0];
  // IMAGE GALLERY dialog — the original's dialog holds the STILL views only
  // (the video view is excluded: 7 stills for the coat, not 8).
  const dialogViews = views.filter((v) => !v.video);
  const dialogView = dialogViews[dialogIdx] ?? dialogViews[0];
  // Cover scale for the dialog photo (fills the viewport width), relative to
  // the fit-height base; clamped to the zoom range [1, 10].
  const coverScale = Math.min(10, Math.max(1, vp.w / (imgAspect * vp.h)));
  const zoomScale = zoom ?? coverScale;
  const renderedH = vp.h * zoomScale;
  const renderedW = imgAspect * renderedH;
  const maxPanX = Math.max(0, (renderedW - vp.w) / 2);
  const maxPanY = Math.max(0, (renderedH - vp.h) / 2);
  const clampPan = (x: number, y: number) => ({ x: Math.max(-maxPanX, Math.min(maxPanX, x)), y: Math.max(-maxPanY, Math.min(maxPanY, y)) });
  // Re-clamp the pan whenever the rendered size changes (e.g. zooming out
  // shrinks how far the photo can be panned).
  useEffect(() => { setPan((prev) => { const c = clampPan(prev.x, prev.y); return c.x === prev.x && c.y === prev.y ? prev : c; }); }, [renderedW, renderedH]);
  // Zoom slider dot: the panel's thumb travels 40–290px from the panel top
  // (250px); the dot is log-linear in the scale (min 1 at the bottom,
  // max 10 at the top) — this reproduces the original's measured dot
  // positions (default 522, min 624, max 374 at 1919x998).
  const zoomFrac = Math.log(10 / zoomScale) / Math.log(10);
  const dotTop = 40 + zoomFrac * 250;
  const zoomStepFactor = 1.516;
  const zoomInStep = () => { setZoom((z) => Math.max(1, Math.min(10, (z ?? coverScale) * zoomStepFactor))); };
  const zoomOutStep = () => { setZoom((z) => Math.max(1, Math.min(10, (z ?? coverScale) / zoomStepFactor))); };
  const setZoomFromClientY = (clientY: number) => {
    const el = sliderHitRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const f = Math.max(0, Math.min(1, (clientY - r.top) / r.height));
    setZoom(Math.max(1, Math.min(10, Math.pow(10, 1 - f))));
  };
  // Colour switch reloads the WHOLE gallery: the new colourway's own view
  // photos replace every panel and thumbnail, the gallery returns to its
  // first view and any playing video stops.
  const galleryKey = views.map((v) => v.src).join("|");
  useEffect(() => { setThumb(0); setVidPlaying(false); stripRef.current?.scrollTo({ left: 0 }); }, [galleryKey]);
  const descLines = p.detailLines.filter((l) => !l.startsWith("Finish options:") && !/\+\d+ more/.test(l) && !l.startsWith("Also available as"));
  const editorial = p.story && !p.story.startsWith("The story behind") ? p.story : "";
  const partnerPool = products.filter((x) => x.id !== p.id);
  // Per-product overrides (Cashmere coat): the exact "The Perfect Partner"
  // / "Keep exploring" rows from hermes.com; every other product keeps the
  // derived lists below.
  const partners = p.partnerIds ? p.partnerIds.map((id) => products.find((x) => x.id === id)).filter((x): x is Product => !!x) : [...partnerPool.filter((x) => x.name === p.name), ...partnerPool.filter((x) => x.name !== p.name && x.theme !== "" && x.theme === p.theme), ...partnerPool.filter((x) => x.name !== p.name && x.category === p.category && x.subcategory === p.subcategory)].filter((x, i, a) => a.findIndex((y) => y.id === x.id) === i).slice(0, 4);
  const partnerIds = new Set(partners.map((x) => x.id));
  const explore = p.exploreIds ? p.exploreIds.map((id) => products.find((x) => x.id === id)).filter((x): x is Product => !!x) : partnerPool.filter((x) => x.category === p.category && !partnerIds.has(x.id)).filter((x, i, a) => a.findIndex((y) => y.name.toLowerCase() === x.name.toLowerCase()) === i).slice(0, 4);
  const thumbBtn = (v: GalView, i: number) => (
    <button key={v.label + i} aria-label={`Gallery thumbnail ${v.label}${v.video ? " (video)" : ""}`} aria-current={thumb === i} className="relative h-12 w-10 shrink-0 bg-white ring-1 ring-black/15" onClick={() => setThumb(i)}>
      <span className="absolute inset-0 overflow-hidden">
        <img src={v.src} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        {v.video && <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-[10px] text-white" aria-hidden="true">▶</span>}
      </span>
      {thumb === i && <span className="absolute inset-x-0 -bottom-[5px] h-[2px] bg-black" aria-hidden="true" />}
    </button>
  );
  // Rich lines: a per-product override body is an array of lines —
  // "## " = subheading, "• " = bullet, anything else a paragraph. Used
  // by the Cashmere coat's verbatim accordion bodies and by the
  // description bullets ("• " lines in detailLines).
  const renderRichLines = (lines: string[]) => {
    const out: React.ReactNode[] = [];
    let bullets: string[] = [];
    const flush = () => {
      if (bullets.length === 0) return;
      out.push(<ul key={`ul-${out.length}`} className="list-disc space-y-1 pl-5">{bullets.map((b) => <li key={b}>{b}</li>)}</ul>);
      bullets = [];
    };
    lines.forEach((l, i) => {
      if (l.startsWith("## ")) { flush(); out.push(<p key={`${i}-${l}`} className="pt-1.5 font-semibold text-black first:pt-0">{l.slice(3)}</p>); }
      else if (l.startsWith("• ")) { bullets.push(l.slice(2)); }
      else { flush(); out.push(<p key={`${i}-${l}`}>{l}</p>); }
    });
    flush();
    return <>{out}</>;
  };
  const accBodies: Record<string, string[]> = p.accordionBodies ?? {};
  const accItems: { title: string; content: React.ReactNode }[] = [
    // PRODUCT DETAILS first — the user's phone video of hermes.com (8 Nov
    // 2026) proves the mobile product page carries this accordion above
    // CARE, superseding the earlier desktop audit. Its content is the
    // product's own key details (material + the audited detail lines).
    { title: "PRODUCT DETAILS", content: (<>
      {p.material && <p>{p.material}</p>}
      {descLines.map((l) => <p key={l} className="mt-1.5">{l}</p>)}
      {p.modelSize && <p className="mt-1.5">Model size: {p.modelSize}</p>}
      {p.metallicFinish && <p className="mt-1.5">Finish: {p.metallicFinish}</p>}
      {descLines.length === 0 && !p.material && <p>See the product description for this article's details.</p>}
    </>) },
    { title: "CARE", content: <>Preserve the original qualities of this article by avoiding contact with water, perfume and cosmetics. Store it in its original case, away from direct light and heat, and entrust maintenance to a Hermès boutique.</> },
    { title: "DELIVERY & RETURNS", content: (<>
      <p className="font-semibold text-black">Shipping</p>
      {settings.deliveryText ? <p className="mt-1">{settings.deliveryText}</p> : <>
        <p className="mt-1">Free standard delivery. Hermès offers several fast and secure delivery options.</p>
        <p className="mt-3 font-semibold text-black">Delivery options</p>
        <p className="mt-1">Standard Delivery (Free): An estimated delivery date will be provided at checkout (expected delivery date is visible during the payment step). Your order will be prepared within 1 to 2 business days and delivered within 3 to 5 business days.</p>
        <p className="mt-1">Express Delivery ($35): Your order will be prepared within 1 business day and delivered within 1 to 2 business days.</p>
        <p className="mt-1">Same-Day Delivery ($35): Order by 2:00 PM EST (except on weekends and holidays), your order will be delivered within 1 to 2 business days.</p>
      </>}
      <p className="mt-4 font-semibold text-black">Payment methods</p>
      {settings.paymentMethods ? <p className="mt-1">{settings.paymentMethods}</p> : <p className="mt-1">By card: Visa®, MasterCard®, American Express®, Discover®, Diners Club®, JCB® and China Union Pay®. By PayPal® and Apple Pay®. Payment is debited immediately for personalized product.</p>}
      <p className="mt-4 font-semibold text-black">Returns and exchanges</p>
      {settings.returnsText ? <p className="mt-1">{settings.returnsText}</p> : <>
        <p className="mt-1">Free returns within 30 days. See conditions and procedure in our FAQ.</p>
        <p className="mt-3 font-semibold text-black">Returns</p>
        <p className="mt-1">If you do not receive your order within [estimated time shown on order summary], please contact Customer Service.</p>
        <p className="mt-3 font-semibold text-black">Designer or product exclusions</p>
        <p className="mt-1">Some items are not eligible for delivery. Please see our Delivery FAQs for more details.</p>
        <p className="mt-3 font-semibold text-black">Return policy</p>
        <p className="mt-1">Returning your item is free. You have 30 days from the delivery date to return your product. Your item must be in a new condition and the packaging must be in its original state. Packages (including the orange box) will be collected at no extra charge when you have your return pick-up. Please note that international shipping costs and certain categories in Leather Goods are not refundable.</p>
      </>}
    </>) },
    { title: "GIFTING", content: <>Your purchases are delivered in an orange box tied with a Bolduc ribbon, with the exception of fragrances, makeup and beauty products, books, certain equestrian and bulky items. During checkout, you can include one card with a personalized message and a priceless invoice. The gift recipient can exchange a gift. For more details, please contact Customer Service.</> },
    // USER GUIDE (Arceau id 53) is NOT rendered yet: the original's
    // USER GUIDE is a PDF link ("Open PDF … (Open in a new tab)") and
    // the PDF URL is not in any saved source. Restore it as a link row
    // once the real PDF URL is read from the live product page — the
    // invented watch-care sentences above were removed 2026-11-10.
  ].map((it) => {
    const body = accBodies[it.title];
    return body ? { title: it.title, content: <div className="space-y-1.5">{renderRichLines(body)}</div> } : it;
  });
  // Buy actions (Personalize / Apple Pay + Add to cart / in-store /
  // Notify me) — shared by the desktop buy box and the mobile row
  // after the description, so each device matches the original's
  // own order (mobile: description first, then the buttons).
  const buyActions = (
    isConfigProduct(p) ? (
            <div className="mt-4">
              <button aria-label="Personalize" className="font-mono-d flex h-12 w-full items-center justify-center gap-2 bg-black text-xs font-medium uppercase tracking-normal text-white" onClick={() => setConfigOpen((v) => !v)}>Personalize</button>
              {configOpen && <p className="mt-4 border border-black/20 p-3 text-sm">Personalization for this article is not available in this store yet. Please call <a className="underline" href={`tel:${settings.phone}`}>{settings.phone}</a> for assistance.</p>}
            </div>
          ) : isBuyableStatus(p.status) ? (
            <div className="mt-4">
              <div className="flex">
                {p.applePay && <button aria-label="Buy with Apple Pay" className={`font-mono-d flex h-12 flex-1 items-center justify-center gap-1.5 border border-black text-xs font-medium uppercase text-black${applePayAvailable ? "" : " max-lg:hidden"}`} onClick={() => { if (!canAdd) { setSizeDrawer(true); return; } addToCart(p, color?.pdpName ?? color?.name, needsSize ? selSize : p.modelSize); }}><svg width="15" height="15" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg><span>Pay</span></button>}
                <button aria-label="Add to cart" className="font-mono-d flex h-12 flex-1 items-center justify-center gap-2 bg-black text-xs font-medium uppercase tracking-normal text-white" onClick={() => { if (!canAdd) { setSizeDrawer(true); return; } addToCart(p, color?.pdpName ?? color?.name, needsSize ? selSize : p.modelSize); }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 8h14l-1.2 12.2a1.8 1.8 0 0 1-1.8 1.6H8a1.8 1.8 0 0 1-1.8-1.6L5 8Z" /><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" /></svg>Add to cart</button>
              </div>
            </div>
          ) : p.status === "in_store_only" ? (
            <p className="mt-4 border border-black/20 p-3 text-sm">This article is available in store only. Please visit a boutique or call <a className="underline" href={`tel:${settings.phone}`}>{settings.phone}</a>.</p>
          ) : (
            <div className="mt-4">
              <p className="text-sm">We will notify you when this product is back in stock</p>
              {notified ? <p className="mt-3 text-sm font-medium" role="status">{notified}</p> : notifyOpen ? (
                <div className="mt-3 flex gap-2">
                  <input aria-label="Email for notify me" type="email" className="min-w-0 flex-1 border border-black/30 px-3 py-3 text-sm" placeholder="Your email" value={notifyEmail} onChange={(e) => setNotifyEmail(e.target.value)} />
                  <button aria-label="Notify me when back in stock" className="flex items-center gap-2 border border-black bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-black" onClick={() => { if (notifyEmail.includes("@")) notifyMut.mutate(); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="1.5" /><path d="m3.5 7 8.5 6 8.5-6" /></svg>Notify me
                  </button>
                </div>
              ) : (
                <button aria-label="Notify me when back in stock" className="mt-3 flex w-full items-center justify-center gap-2 border border-black bg-white py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black" onClick={() => setNotifyOpen(true)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="1.5" /><path d="m3.5 7 8.5 6 8.5-6" /></svg>Notify me
                </button>
              )}
            </div>
          )
  );

  return (
    <div className="pb-24 lg:pb-24">
      {/* Gallery starts exactly at the header's bottom edge (main already
          pads by the measured full header height) — no extra top margin,
          as on hermes.com. */}
      <div className="relative">
        {/* Gallery — a wide horizontal strip of large panels, nearly
            full-bleed, with the thumbnail strip at its BOTTOM-LEFT corner
            (selected thumbnail underlined). Clicking a photo opens the
            full-screen IMAGE GALLERY dialog. A video view never autoplays:
            selecting it starts it, with only the small white square
            play/pause toggle. There is NO quantity selector on a product
            page — quantity is changed in the cart only. */}
        <div className="relative">
          {/* Back button: hermes.com shows it top-left of the gallery on
              desktop too (user's 1366px screenshot, 2026-11-11) — but NOT
              at very wide widths (no arrow at 1919px, verified twice), so
              it hides from 2xl up. */}
          <button aria-label="Back" className="absolute left-3 top-3 z-20 flex h-9 w-9 items-center justify-center bg-white text-black shadow 2xl:hidden" onClick={goBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20 12H4m0 0 6-6M4 12l6 6" /></svg>
          </button>
          <div ref={stripRef} className="no-scrollbar flex snap-x snap-mandatory gap-[1px] overflow-x-auto" role="group" aria-label="Product gallery">
            {views.map((v, i) => (
              <div key={v.label + i} data-panel data-viewsrc={v.src} className={`relative aspect-[3/4] w-full shrink-0 snap-start overflow-hidden bg-[#efe9df] sm:w-[48%] lg:w-[34.8%] ${thumb === i ? "ring-1 ring-black/50" : ""}`}>
                {v.video ? (
                  <button aria-label={`View ${v.label} video`} className="relative block h-full w-full" onClick={() => { if (thumb !== i) setThumb(i); }}>
                    {v.videoSrc ? (
                      <ProductVideo src={v.videoSrc} poster={v.src} playing={vidPlaying && thumb === i && !zoomOpen} className="h-full w-full object-cover" />
                    ) : (
                      <img src={v.src} alt={`${p.name} — video`} className={`h-full w-full object-cover ${vidPlaying && thumb === i ? "dress-walk" : ""}`} />
                    )}
                  </button>
                ) : (
                  <button aria-label={`View ${v.label} — open image gallery`} className="block h-full w-full cursor-zoom-in" onClick={() => { setThumb(i); setDialogIdx(Math.max(0, dialogViews.findIndex((d) => d.src === v.src))); setZoom(null); setPan({ x: 0, y: 0 }); setZoomOpen(true); }}>
                    <img src={v.src} alt={`${p.name} — ${v.label} view`} className="h-full w-full object-cover" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {/* Video pause/play: a small white button at the BOTTOM EDGE of
              the gallery (two bars = pause), shown only while the selected
              view is the video view. The video autoplays when selected. */}
          {curView?.video && (
            <button aria-label={vidPlaying ? "Pause video" : "Play video"} aria-pressed={vidPlaying} className="absolute bottom-3 right-3 z-20 flex h-9 w-9 items-center justify-center bg-white text-black shadow" onClick={() => setVidPlaying((v) => !v)}>
              {vidPlaying ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="5" height="16" /><rect x="14" y="4" width="5" height="16" /></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5-13-7.5Z" /></svg>
              )}
            </button>
          )}
          <div className="absolute bottom-3 left-3 z-20 hidden gap-1.5 lg:flex" role="group" aria-label="Gallery thumbnails">
            {views.map((v, i) => thumbBtn(v, i))}
          </div>
        </div>
        {/* Mobile gallery dots — hermes.com mobile PDP shows dots below
            the photo (no thumbnails); desktop keeps the bottom-left
            thumbnails above. Tapping a dot scrolls the strip (the [thumb]
            effect scrolls the selected panel into view). */}
        {views.length > 1 && (
          <div className="mt-3 flex justify-center gap-1.5 lg:hidden" role="tablist" aria-label="Product gallery pages">
            {views.map((v, i) => (
              <button key={`dot-${i}`} aria-label={`Go to image ${i + 1} of ${views.length}`} aria-current={thumb === i} onClick={() => setThumb(i)} className={`h-[5px] w-[5px] rounded-full ${thumb === i ? "bg-black" : "bg-black/25"}`} />
            ))}
          </div>
        )}
        {/* Buy box — a panel floating over the BOTTOM-RIGHT of the
            gallery on desktop; below the gallery on mobile, as in the
            user's phone videos of hermes.com. */}
        <div ref={buyBoxRef} className="relative z-10 border border-black/10 bg-[#fffcf7] px-[15px] pb-6 pt-4 lg:absolute lg:bottom-6 lg:right-6 lg:w-[380px] lg:p-[15px]">
          <h1 className="text-base leading-6">{p.name}</h1>
          {/* Price under the name — MOBILE ONLY (lg:hidden). The original's
              mobile PDP shows the price directly under the title
              (user's phone screenshot 2026-11-13); its desktop PDP puts
              the price right-aligned just above the buttons instead
              (measured on hermes.com 2026-11-13). */}
          <p className="mt-2 text-sm leading-[22px] lg:hidden">{priceText(p)}</p>
          {p.colors.length > 0 && color && (
            <>
              <div className="mt-4 flex items-baseline justify-between">
                <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Color</p>
                <p className="text-sm">{color.pdpName ?? color.name}</p>
              </div>
              {isBuyableStatus(p.status) ? (
                colorThumbs ? (
                  <div className="mt-2 flex flex-wrap items-start gap-[3px]">
                    {colorThumbs.map((t) => (
                      <span key={t.key} className="relative mb-[3px]">
                        <button aria-label={`Colour ${t.name}`} onClick={t.onClick} className="block h-[70px] w-[53px] overflow-hidden bg-[#efe9df]">
                          <img src={t.src} alt="" className="h-full w-full object-cover" />
                        </button>
                        {t.selected && <span className="absolute inset-x-0 -bottom-[3px] h-[2px] bg-black" aria-hidden="true" />}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="mt-2 flex flex-wrap items-center gap-x-[2px] gap-y-2">
                    {colorwaySiblings.map((sib) => {
                      const sc = sib.colors[0];
                      if (!sc) return null;
                      return (
                        <button key={`sib-${sib.id}`} aria-label={`Colour ${sc.pdpName ?? sc.name}`} onClick={() => go({ t: "product", id: sib.id })}
                          className="relative h-9 w-9 border-2 border-black/20 lg:h-[59px] lg:w-[59px]" style={{ background: sc.hex || "#cccccc" }} />
                      );
                    })}
                    {p.colors.map((c, i) => (
                      <button key={c.name} aria-label={`Colour ${c.pdpName ?? c.name}${c.available && isBuyableStatus(p.status) ? "" : " (unavailable)"}`} disabled={!c.available || !isBuyableStatus(p.status)} onClick={() => { setColorIdx(i); setThumb(0); setVidPlaying(false); }}
                        className={`relative h-9 w-9 border-2 lg:h-[59px] lg:w-[59px] ${i === colorIdx ? "border-black" : "border-black/20"} ${!c.available || !isBuyableStatus(p.status) ? "opacity-40" : ""}`} style={{ background: c.hex || "#cccccc" }}>
                        {(!c.available || !isBuyableStatus(p.status)) && <span className="absolute inset-0 flex items-center justify-center text-white">✕</span>}
                      </button>
                    ))}
                  </div>
                )
              ) : (
                <div className="mt-2 flex flex-wrap items-start gap-[3px]">
                  {colorThumbs ? (
                    <span className="relative mb-[3px]">
                      <button disabled aria-label={`Colour ${color.name} (unavailable)`} className="relative block h-[70px] w-[53px] overflow-hidden bg-[#efe9df] opacity-40">
                        <img src={colorThumbs.find((t) => t.selected)?.src ?? colorThumbs[0].src} alt="" className="h-full w-full object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-lg text-white">✕</span>
                      </button>
                    </span>
                  ) : (
                    <button disabled aria-label={`Colour ${color.name} (unavailable)`} className="relative h-9 w-9 border-2 border-black/20 opacity-40 lg:h-[59px] lg:w-[59px]" style={{ background: color.hex || "#cccccc" }}><span className="absolute inset-0 flex items-center justify-center text-white">✕</span></button>
                  )}
                </div>
              )}
            </>
          )}
          {isBuyableStatus(p.status) && needsSize && (
            <div className="mt-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Size</p>
              <button aria-label="Select a size" className="mt-1 flex min-h-[46px] w-full items-center justify-between border-b border-black/20 py-3 text-sm" onClick={() => setSizeDrawer(true)}>
                <span className="flex flex-col items-start leading-snug"><span className={selSize ? "text-neutral-500" : ""}>Select a size</span>{selSize ? <span className="underline underline-offset-4">{selSize}</span> : null}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
              </button>
              <div className="mt-2 flex justify-end">
                <button aria-label="Size guide" className="flex items-center gap-1.5 text-xs underline underline-offset-2" onClick={() => setSizeGuideOpen(true)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="2" y="9" width="20" height="7" rx="1" /><path d="M6.5 9v3.5M11 9v3.5M15.5 9v3.5M20 9v3.5" /></svg>
                  Size Guide
                </button>
              </div>
              {sizeGone && <p className="mt-1.5 text-xs font-medium text-red-700" role="status">The desired size is no longer available</p>}
              {/* Shipping-delay line: the original's buy card shows it ONLY
                  once a size is chosen (live measurement 2026-11-11 23:21:
                  absent on landing, present after selecting 36). It sits
                  below the size block, above the buttons. */}
              {p.shippingDelay && selSize && <p className="mt-3 text-xs leading-[18px] text-[#696969]">{p.shippingDelay}</p>}
            </div>
          )}
          {/* Price — DESKTOP ONLY (hidden lg:block), right-aligned just
              above the buttons, as on the original's desktop PDP
              (measured on hermes.com 2026-11-13: $13,500 sits on its own
              line above [Apple Pay | ADD TO CART], NOT under the name). */}
          <p className="mt-4 hidden text-right text-sm leading-[22px] lg:block">{priceText(p)}</p>
          <div className="hidden lg:block">{buyActions}</div>
        </div>
      </div>

      {/* Below the gallery — description LEFT (always open), accordions
          RIGHT: exactly PRODUCT DETAILS / CARE / DELIVERY & RETURNS /
          GIFTING (the user's 8 Nov 2026 phone video restored PRODUCT
          DETAILS), all closed by default, only one open at a time. */}
      <div className="mx-auto mt-0 grid max-w-5xl gap-6 px-4 sm:px-6 lg:mt-12 lg:grid-cols-2">
        <section className="bg-[#fffcf7] p-5">
          <h3 className="sr-only">Product description</h3>
          <p className="mt-2.5 text-xs leading-5 text-black">{p.description}</p>
          {descLines.length > 0 && (
            <div className="mt-2.5 space-y-2.5 text-xs leading-5 text-black">
              {renderRichLines(descLines)}
            </div>
          )}
          {p.madeIn && <p className="mt-2.5 text-xs leading-5 text-black">Made in {p.madeIn}</p>}
          {displayRef && <p className="mt-4 text-xs text-[#696969]">Product reference: {displayRef}</p>}
          <p className="mt-4 text-xs text-[#696969]">Like to know more? <button aria-label="Contact Customer Service" className="underline underline-offset-4" onClick={() => go({ t: "page", page: "contact" })}>Contact Customer Service</button></p>
        </section>
        {/* Mobile buy actions — on the original's mobile PDP the
            buttons sit AFTER the description (desktop keeps them in the
            buy box above). */}
        <div className="lg:hidden">{buyActions}</div>
        <div className="mb-[15px] bg-[#fffcf7e6] px-4 py-2">
          {accItems.map((it, i) => (
            <div key={it.title} className="border-t border-[#f6f1eb] last:border-b">
              <button aria-label={`${it.title} section`} aria-expanded={accOpen === i} className="font-mono-d flex w-full items-center justify-between pb-[5px] pt-[23px] text-left text-xs uppercase tracking-normal" onClick={() => setAccOpen(accOpen === i ? -1 : i)}>
                {it.title}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={accOpen === i ? "rotate-180 transition-transform" : "transition-transform"}><path d="m5 9 7 7 7-7" /></svg>
              </button>
              {accOpen === i && <div className="pb-6 text-xs leading-5 text-black">{it.content}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* "The story behind" — on hermes.com the product story is its own
          headed editorial section BELOW the description/accordions and ABOVE
          "The Perfect Partner", but ONLY for products whose story is real
          editorial copy. The templated "The story behind — …" rows render
          nothing here (and nothing in the description panel either) — the
          `editorial` const above already implements that split. */}
      {editorial && (
        <section className="mx-auto mt-12 max-w-5xl px-4 text-center sm:px-6 lg:mt-20">
          <h2 className="font-serif-d text-center text-[30px] italic leading-snug">The story behind</h2>
          <p className="font-serif-d mx-auto mt-8 max-w-3xl text-[20px] italic leading-[28px]">{editorial}</p>
        </section>
      )}
      <RelatedRow title="The Perfect Partner" items={partners} go={go} onQuickBuy={(p) => addToCart(p)} feature={p} />
      <RelatedRow title="Keep exploring" items={explore} go={go} onQuickBuy={(p) => addToCart(p)} />
      <RelatedRow title="Last viewed products" items={lastViewed} go={go} mt="mt-20 lg:mt-28" hidePrice onQuickBuy={(p) => addToCart(p)} />

      <nav aria-label="Breadcrumb" className="font-mono-d mx-auto mt-14 max-w-5xl border-t border-black/10 px-4 pt-5 text-center text-[10px] font-medium uppercase tracking-normal text-neutral-500 sm:px-6">
        <button aria-label={`Breadcrumb ${NAV.find((n) => n.key === p.category)?.label ?? p.category}`} className="underline-offset-4 hover:underline" onClick={() => go({ t: "category", cat: p.category })}>{NAV.find((n) => n.key === p.category)?.label ?? p.category.toUpperCase()}</button>
        <span aria-hidden="true" className="mx-2 inline-block h-2 w-px bg-[#696969]" />
        <button aria-label={`Breadcrumb ${crumbMid}`} className="underline-offset-4 hover:underline" onClick={() => go({ t: "category", cat: p.category, sub: crumbMid })}>{crumbMid}</button>
        <span aria-hidden="true" className="mx-2 inline-block h-2 w-px bg-[#696969]" />
        <span className="text-black">{p.name}</span>
      </nav>

      {/* IMAGE GALLERY dialog — matches hermes.com (measured 2026-11-12,
          1919x998): the photo fills the viewport at the default "cover"
          zoom (the white dialog background appears only when zoomed out);
          NO visible title and NO counter (both exist only as
          screen-reader text); the video view is NOT in the dialog (7 stills
          only); a vertical zoom slider on the LEFT (off-white 32x330px
          panel, + top, − bottom, 5px black dot, track light grey above the
          dot / dark grey below); Close X top-right in a 24x24 off-white
          square; thumbnails bottom-left, 36px pitch, the selected one with
          a 2px black border; the photo drags/pans 1:1 when zoomed (plain
          arrow cursor, clicking it does nothing); switching thumbnails
          keeps the zoom. */}
      {zoomOpen && dialogView && (
        <div className="fixed inset-0 z-[80] select-none bg-white" role="dialog" aria-label="Image gallery">
          <h2 className="sr-only">Image Gallery</h2>
          {/* Photo — rendered at the zoom scale over the fit-height base,
              centred, panned by drag. */}
          <div
            className="absolute inset-0 overflow-hidden bg-white"
            style={{ touchAction: "none" }}
            onPointerDown={(e) => { if (e.button !== 0) return; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); dragRef.current = { x: e.clientX, y: e.clientY, pan: { ...pan } }; }}
            onPointerMove={(e) => { const d = dragRef.current; if (!d) return; setPan(clampPan(d.pan.x + (e.clientX - d.x), d.pan.y + (e.clientY - d.y))); }}
            onPointerUp={() => { dragRef.current = null; }}
            onPointerCancel={() => { dragRef.current = null; }}
          >
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={dialogView.src}
                alt={`${p.name} — ${dialogView.label} view`}
                draggable={false}
                onLoad={(e) => { const im = e.currentTarget; if (im.naturalWidth && im.naturalHeight) setImgAspect(im.naturalWidth / im.naturalHeight); }}
                style={{ width: `${renderedW}px`, height: `${renderedH}px`, maxWidth: "none", transform: `translate(${pan.x}px, ${pan.y}px)` }}
              />
            </div>
          </div>
          {/* Close X — 24x24 off-white square, 24px from the top-right. */}
          <button aria-label="Close image gallery" className="absolute right-6 top-6 z-20 flex h-6 w-6 items-center justify-center" style={{ background: "#f8f5f1" }} onClick={() => setZoomOpen(false)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
          {/* Vertical zoom slider — off-white panel, left, vertically centred. */}
          <div className="absolute left-6 top-1/2 z-20 h-[330px] w-8 -translate-y-1/2" style={{ background: "#f8f5f1" }} role="slider" aria-label="Zoom" aria-valuemin={1} aria-valuemax={10} aria-valuenow={Math.round(zoomScale * 100) / 100}>
            <button aria-label="Zoom in" className="absolute left-1/2 top-2 flex h-5 w-5 -translate-x-1/2 items-center justify-center text-black" onClick={zoomInStep}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
            </button>
            <div
              ref={sliderHitRef}
              className="absolute left-0 top-[40px] h-[250px] w-full"
              style={{ touchAction: "none" }}
              onPointerDown={(e) => { if (e.button !== 0) return; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); sliderDragRef.current = true; setZoomFromClientY(e.clientY); }}
              onPointerMove={(e) => { if (sliderDragRef.current) setZoomFromClientY(e.clientY); }}
              onPointerUp={() => { sliderDragRef.current = false; }}
              onPointerCancel={() => { sliderDragRef.current = false; }}
            >
              <div className="absolute left-1/2 top-[2px] h-[246px] w-px -translate-x-1/2 bg-[#444444]">
                <div className="absolute left-0 top-0 w-px bg-[#919191]" style={{ height: `${Math.max(0, Math.min(246, dotTop - 42 + 2.5))}px` }} />
              </div>
              <div className="absolute left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-black" style={{ top: `${dotTop - 40}px` }} />
            </div>
            <button aria-label="Zoom out" className="absolute bottom-[11px] left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center text-black" onClick={zoomOutStep}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14" /></svg>
            </button>
          </div>
          {/* Thumbnails — bottom-left, 36px pitch, selected = 2px black border. */}
          <div className="absolute bottom-[25px] left-6 z-20 flex gap-[2px]" role="group" aria-label="Image gallery thumbnails">
            {dialogViews.map((v, i) => (
              <button
                key={v.label + i}
                aria-label={`View ${i + 1} of ${dialogViews.length}: ${v.label}`}
                aria-current={dialogIdx === i}
                className={`relative h-[47px] w-9 shrink-0 overflow-hidden border-2 ${dialogIdx === i ? "border-black" : "border-transparent"}`}
                onClick={() => { setDialogIdx(i); const vi = views.findIndex((x) => x.src === v.src); if (vi >= 0) setThumb(vi); setPan({ x: 0, y: 0 }); }}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                  e.preventDefault();
                  const n = e.key === "ArrowRight" ? Math.min(dialogViews.length - 1, i + 1) : Math.max(0, i - 1);
                  setDialogIdx(n); const vi = views.findIndex((x) => x.src === dialogViews[n].src); if (vi >= 0) setThumb(vi); setPan({ x: 0, y: 0 });
                  (e.currentTarget.parentElement?.children[n] as HTMLElement | undefined)?.focus();
                }}
              >
                <img src={v.src} alt="" aria-hidden="true" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* "Select a size" — a slide-in drawer from the RIGHT on desktop and
          a bottom sheet on mobile, as on hermes.com. Title "Size" is
          underlined and centred, Close (×) top right; sizes list
          vertically one per row; unavailable sizes are grey, crossed out
          and marked "Unavailable" on the right; choosing an available size
          closes the drawer and fills the buy-box size button; "Size Guide"
          sits at the bottom right with a small ruler icon to its left. */}
      {sizeDrawer && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-label="Select a size">
          <button aria-label="Close size selector" className="absolute inset-0 h-full w-full bg-black/30" onClick={() => setSizeDrawer(false)} />
          <div className="drawer-in absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col bg-[#fffcf7] shadow-2xl lg:inset-x-auto lg:bottom-auto lg:right-0 lg:top-0 lg:h-full lg:w-[340px] lg:max-w-[88vw]">
            <div className="relative border-b border-black/10 px-5 py-4">
              <span className="block text-center text-[12px] font-semibold uppercase tracking-[0.25em] underline underline-offset-4">Select a size</span>
              <span className="mt-1.5 block text-center text-xs text-neutral-500">Please select a size to add this product to your cart</span>
              <button aria-label="Close size selector" className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center" onClick={() => setSizeDrawer(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-2">
              {sizeList.map((opt) => opt.available ? (
                <button key={opt.label} aria-label={`Size ${opt.label}`} aria-pressed={selSize === opt.label} className={`flex w-full items-center justify-between border-b border-black/10 py-3.5 text-left text-sm ${selSize === opt.label ? "font-semibold" : ""}`} onClick={() => { setSelSize(opt.label); setSizeGone(false); setSizeDrawer(false); }}>
                  <span className={selSize === opt.label ? "underline underline-offset-4" : ""}>{opt.label}</span>
                </button>
              ) : (
                <div key={opt.label} className="flex w-full items-center justify-between border-b border-black/10 py-3.5 text-sm text-[#696969]" aria-label={`Size ${opt.label} unavailable`}>
                  <span className="line-through">{opt.label}</span>
                  <span>Unavailable</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end border-t border-[#f6f1eb] px-5 py-4">
              <button aria-label="Open size guide" className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] underline" onClick={() => { setSizeDrawer(false); if (isShoeSize) { go({ t: "page", page: "guides" }); return; } setSizeGuideOpen(true); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 17 17 3l4 4L7 21l-4-4Z" /><path d="M8 16l1.5 1.5M11 13l1.5 1.5M14 10l1.5 1.5" /></svg>
                Size guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* "SIZE GUIDE" — a slide-in drawer from the RIGHT on desktop and a
          bottom sheet on mobile, as on hermes.com. Scale matches the
          original (user's 1366px screenshots, 2026-11-11): ~380px wide,
          11px title, icon + label tabs, "Select a location *" select
          showing US, small cm/inches radio circles, compact 12px table
          with sentence-case headers. The coat's table has 7 columns
          (Hip + Back width included); a sweater's has 5 (no Hip/Back
          width) — the original varies the table by garment, and no
          sweater in our catalogue carries sizes yet, so the 7-column
          table is what this drawer shows. */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-label="Size guide">
          <button aria-label="Close size guide" className="absolute inset-0 h-full w-full bg-black/30" onClick={() => setSizeGuideOpen(false)} />
          <div className="drawer-in absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col bg-[#fffcf7] shadow-2xl lg:inset-x-auto lg:bottom-auto lg:right-0 lg:top-0 lg:h-full lg:w-[380px] lg:max-w-[92vw]">
            <div className="relative border-b border-black/10 px-4 py-3.5">
              <span className="block text-center text-[11px] font-medium uppercase tracking-[0.3em]">Size Guide</span>
              <button aria-label="Close size guide" className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center" onClick={() => setSizeGuideOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="flex items-start justify-between border-b border-black/10 pb-3">
                <button aria-label="Find the right size tab" className={`flex flex-col items-center gap-1.5 text-xs ${guideTab === "chart" ? "font-semibold" : "text-neutral-500"}`} onClick={() => setGuideTab("chart")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="12" cy="7.5" r="3.2" /><path d="M5.5 20c.8-3.4 3.4-5 6.5-5s5.7 1.6 6.5 5" /></svg>
                  Find the right size
                </button>
                <button aria-label="Measurement guide tab" className={`flex flex-col items-center gap-1.5 text-xs ${guideTab === "measure" ? "font-semibold" : "text-neutral-500"}`} onClick={() => setGuideTab("measure")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1Z" /><path d="M14.5 6.5l3 3" /></svg>
                  Measurement guide
                </button>
              </div>
              <label className="mt-4 block text-[11px] text-neutral-500" htmlFor="guide-location">Select a location *</label>
              <div className="relative mt-1">
                {/* Shoes: US + UK (both measured live). RTW/knit: US only
                    (the chart is the US conversion). */}
                {isShoeSize ? (
                  <select id="guide-location" aria-label="Select a location" className="w-full appearance-none border-b border-black/25 bg-transparent py-2 pr-8 text-sm outline-none" value={guideLoc} onChange={(e) => setGuideLoc(e.target.value as "US" | "UK")}>
                    <option value="US">US</option>
                    <option value="UK">UK</option>
                  </select>
                ) : (
                  <select id="guide-location" aria-label="Select a location" className="w-full appearance-none border-b border-black/25 bg-transparent py-2 pr-8 text-sm outline-none" value="US" onChange={() => {}}>
                    <option value="US">US</option>
                  </select>
                )}
                <svg className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </div>
              <div className="mt-4 flex items-center gap-6" role="radiogroup" aria-label="Measurement unit">
                <button role="radio" aria-checked={guideUnit === "cm"} aria-label="Show measurements in centimetres" className="flex items-center gap-2 text-xs" onClick={() => setGuideUnit("cm")}>
                  <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full border border-black">{guideUnit === "cm" ? <span className="h-[6px] w-[6px] rounded-full bg-black" /> : null}</span>
                  cm
                </button>
                <button role="radio" aria-checked={guideUnit === "in"} aria-label="Show measurements in inches" className="flex items-center gap-2 text-xs" onClick={() => setGuideUnit("in")}>
                  <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full border border-black">{guideUnit === "in" ? <span className="h-[6px] w-[6px] rounded-full bg-black" /> : null}</span>
                  inches
                </button>
              </div>
              {guideTab === "chart" ? (
                isShoeSize ? (
                  <div className="mt-5 overflow-x-auto">
                  <p className="mb-3 text-xs leading-5 text-neutral-700">{SHOE_CHART_INTRO}</p>
                  <p className="mb-3 text-xs font-semibold text-black">Size comparison chart in {guideUnit === "in" ? "inches" : "centimeter"}</p>
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-black/20 text-[11px] text-neutral-500">
                        <th className="py-2 pr-2 font-medium">Hermès Size</th>
                        <th className="py-2 pr-2 font-medium">{guideLoc}</th>
                        <th className="py-2 font-medium">Foot length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SHOE_CHART.map((r) => (
                        <tr key={r[0]} className="border-b border-black/10">
                          <td className="py-2 pr-2">{r[0]}</td>
                          <td className="py-2 pr-2">{guideLoc === "US" ? r[1] : r[2]}</td>
                          {/* Foot length: cm is the same for both locations;
                              inches use 2 decimals in the US view, 1 in UK. */}
                          <td className="py-2">{guideUnit === "in" ? (guideLoc === "US" ? r[4] : r[5]) : r[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                ) : (
                <div className="mt-5 overflow-x-auto">
                <p className="mb-3 text-xs font-semibold text-black">Size comparison chart in {guideUnit === "in" ? "inches" : "centimetres"}</p>
                <table className="w-full min-w-[520px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-black/20 text-[11px] text-neutral-500">
                      <th className="py-2 pr-2 font-medium">Hermès Size</th>
                      <th className="py-2 pr-2 font-medium">US</th>
                      <th className="py-2 pr-2 font-medium">Chest circumference</th>
                      <th className="py-2 pr-2 font-medium">Waist circumference</th>
                      {!isKnit && <th className="py-2 pr-2 font-medium">Hip circumference</th>}
                      {!isKnit && <th className="py-2 pr-2 font-medium">Back width</th>}
                      <th className="py-2 font-medium">Sleeves length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(isKnit ? (guideUnit === "in" ? KNIT_CHART_IN : KNIT_CHART_CM) : (guideUnit === "in" ? RTW_CHART_IN : RTW_CHART_CM)).map((r) => (
                      <tr key={r[0]} className="border-b border-black/10">
                        <td className="py-2 pr-2">{r[0]}</td>
                        <td className="py-2 pr-2">{r[1]}</td>
                        <td className="py-2 pr-2">{r[2]}</td>
                        <td className="py-2 pr-2">{r[3]}</td>
                        {isKnit ? (
                          <td className="py-2">{r[4]}</td>
                        ) : (
                          <>
                            <td className="py-2 pr-2">{r[4]}</td>
                            <td className="py-2 pr-2">{r[5]}</td>
                            <td className="py-2">{r[6]}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
                )
              ) : (
                isShoeSize ? (
                  <div className="mt-5 text-xs leading-6 text-neutral-700">
                    <p className="font-semibold text-black">{SHOE_MEASURE_HEADING}</p>
                    <p className="mt-2">{SHOE_MEASURE_INTRO}</p>
                    <ol className="mt-4 space-y-4">
                      {SHOE_MEASURE_STEPS.map(([title], i) => (
                        <li key={title}>
                          <p className="font-semibold text-black">{i + 1} — {title}</p>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-5">{SHOE_MEASURE_TIP}</p>
                    <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-black/20 text-[11px] text-neutral-500">
                          <th className="py-2 pr-2 font-medium">Hermès Size</th>
                          <th className="py-2 font-medium">Foot length</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Measurement tab foot lengths: cm as in the chart;
                            inches use the one-decimal (UK) display. */}
                        {SHOE_CHART.map((r) => (
                          <tr key={r[0]} className="border-b border-black/10">
                            <td className="py-2 pr-2">{r[0]}</td>
                            <td className="py-2">{guideUnit === "in" ? r[5] : r[3]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  </div>
                ) : (
                <div className="mt-5 text-xs leading-6 text-neutral-700">
                  <p>To take your measurements and find your perfect size, you will need a measuring tape. Make sure to keep the tape loose. If you are in-between sizes, we recommend sizing up. Time to follow the guide!</p>
                  <ol className="mt-4 space-y-4">
                    {(isKnit ? KNIT_MEASURE_STEPS : MEASURE_STEPS).map(([title, body], i) => (
                      <li key={title}>
                        <p className="font-semibold text-black">{i + 1} — {title}</p>
                        <p className="mt-0.5">{body}</p>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-5">Match the obtained figures with the corresponding size in the chart below</p>
                  <p className="mt-2">Our tip: If you do not have a measuring tape, use standard tape and then measure the tape against a ruler</p>
                  <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[460px] text-left text-xs">
                    <thead>
                      <tr className="border-b border-black/20 text-[11px] text-neutral-500">
                        <th className="py-2 pr-2 font-medium">Hermès Size</th>
                        <th className="py-2 pr-2 font-medium">Chest circumference</th>
                        <th className="py-2 pr-2 font-medium">Waist circumference</th>
                        {!isKnit && <th className="py-2 pr-2 font-medium">Hip circumference</th>}
                        {!isKnit && <th className="py-2 pr-2 font-medium">Back width</th>}
                        <th className="py-2 font-medium">Sleeves length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(isKnit ? KNIT_CHART_CM : RTW_CHART_CM).map((r) => (
                        <tr key={r[0]} className="border-b border-black/10">
                          <td className="py-2 pr-2">{r[0]}</td>
                          <td className="py-2 pr-2">{r[2]}</td>
                          <td className="py-2 pr-2">{r[3]}</td>
                          {isKnit ? (
                            <td className="py-2">{r[4]}</td>
                          ) : (
                            <>
                              <td className="py-2 pr-2">{r[4]}</td>
                              <td className="py-2 pr-2">{r[5]}</td>
                              <td className="py-2">{r[6]}</td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sticky mobile buy bar — in the user's phone video of hermes.com the
          black ADD TO CART button stays fixed at the BOTTOM of the screen
          while the product page scrolls (the chat bubble floats above it).
          Tapping it with no size chosen opens the size drawer first.
          Out-of-stock products get the NOTIFY ME bar instead, which jumps
          back up to the buy box and opens the email capture. Desktop keeps
          the floating buy card only. */}
      {isBuyableStatus(p.status) && (
        <div className="fixed inset-x-0 bottom-0 z-40 bg-black pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
          {isConfigProduct(p) ? (
            <button aria-label="Personalize" className="flex w-full items-center justify-center gap-2 bg-black py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white" onClick={() => { setConfigOpen(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              Personalize
            </button>
          ) : (
          <button aria-label="Add to cart" disabled={sizeGone} className={`flex w-full items-center justify-center gap-2 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white ${sizeGone ? "cursor-not-allowed bg-neutral-400" : "bg-black"}`} onClick={() => { if (needsSize && !selSize) { setSizeDrawer(true); return; } addToCart(p, color?.pdpName ?? color?.name, needsSize ? selSize : p.modelSize); }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 8h14l-1.2 12.2a1.8 1.8 0 0 1-1.8 1.6H8a1.8 1.8 0 0 1-1.8-1.6L5 8Z" /><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" /></svg>
            Add to cart
          </button>
          )}
        </div>
      )}
      {/* Sticky DESKTOP buy bar — once the buy panel has scrolled out of
          view, a translucent bar pins to the bottom: small thumbnail +
          name + price on the left, Apple Pay + black ADD TO CART on the
          right. Same addToCart action (and size gating) as the in-panel
          buttons; config products get PERSONALIZE instead. */}
      {isBuyableStatus(p.status) && !buyBoxInView && !nearBottom && (
        <div className="fixed inset-x-0 bottom-0 z-40 hidden items-center justify-between gap-4 border-t border-black/10 bg-[#fffcf7]/90 px-6 py-3 backdrop-blur lg:flex" role="region" aria-label="Quick buy">
          <div className="flex min-w-0 items-center gap-3">
            <img src={productImageFor(p)} alt="" className="h-12 w-10 shrink-0 object-cover" />
            <span className="min-w-0">
              <span className="block truncate text-sm">{p.name}</span>
              <span className="mt-0.5 block text-sm">{priceText(p)}</span>
            </span>
          </div>
          <div className="flex shrink-0">
            {isConfigProduct(p) ? (
              <button aria-label="Personalize" className="font-mono-d flex h-12 items-center justify-center gap-2 bg-black px-8 text-xs font-medium uppercase tracking-normal text-white" onClick={() => { setConfigOpen(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Personalize</button>
            ) : (
              <>
                {p.applePay && <button aria-label="Buy with Apple Pay" className={`font-mono-d flex h-12 items-center justify-center gap-1.5 border border-black px-6 text-xs font-medium uppercase text-black${applePayAvailable ? "" : " max-lg:hidden"}`} onClick={() => { if (!canAdd) { setSizeDrawer(true); return; } addToCart(p, color?.pdpName ?? color?.name, needsSize ? selSize : p.modelSize); }}><svg width="15" height="15" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg><span>Pay</span></button>}
                <button aria-label="Add to cart" className="font-mono-d flex h-12 items-center justify-center gap-2 bg-black px-8 text-xs font-medium uppercase tracking-normal text-white" onClick={() => { if (!canAdd) { setSizeDrawer(true); return; } addToCart(p, color?.pdpName ?? color?.name, needsSize ? selSize : p.modelSize); }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 8h14l-1.2 12.2a1.8 1.8 0 0 1-1.8 1.6H8a1.8 1.8 0 0 1-1.8-1.6L5 8Z" /><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" /></svg>Add to cart</button>
              </>
            )}
          </div>
        </div>
      )}
      {!isBuyableStatus(p.status) && p.status !== "in_store_only" && (
        <div className="fixed inset-x-0 bottom-0 z-40 bg-white px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-1px_10px_rgba(0,0,0,0.14)] lg:hidden">
          <button aria-label="Notify me when back in stock" className="flex w-full items-center justify-center gap-2 border border-black bg-white py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-black" onClick={() => { setNotifyOpen(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="1.5" /><path d="m3.5 7 8.5 6 8.5-6" /></svg>
            Notify me
          </button>
        </div>
      )}
    </div>
  );
}

const FOOTER_COLS: { title: string; links: [string, string][] }[] = [
  { title: "SERVICES", links: [["Contact us", "contact"], ["FAQ", "faq"], ["Find a store", "stores"], ["Stores selling beauty products", "stores"], ["Stores selling Apple Watch Hermès", "stores"], ["Gifting", "gifting"], ["Made to measure", "measure"], ["Maintenance and repair", "maintenance"], ["User guides", "guides"]] },
  { title: "ORDERS", links: [["Payment", "faq:payment"], ["Shipping", "shipping"], ["Collect in store", "collect"], ["Track orders", "track"], ["Returns and exchanges", "returns"]] },
  { title: "LA MAISON HERMÈS", links: [["Sustainable development", "sustainability"], ["The Hermès Foundation", "foundation"], ["Join Hermès", "join"], ["Finance & Governance", "finance"], ["Our partner brands", "partners"]] },
  { title: "LEGAL", links: [["Terms and conditions", "terms"], ["Privacy & cookies", "privacy"], ["Binding Corporate Rules (BCRs)", "bcr"], ["California Transparency in Supply Chain Act", "california"], ["Transparency in coverage", "coverage"], ["Do Not Sell/Share My Personal Information", "donotsell"], ["Legal issues", "legal"], ["Accessibility", "accessibility"], ["Hermès Sitemap", "sitemap"]] },
];
const PAGES: Record<string, { title: string; body: string[] }> = {
  contact: { title: "Customer Service", body: ["Monday to Saturday 10am - 9pm EST: 800-441-4488.", "The answer to your question can certainly be found in the FAQs.", "You can also contact us outside public holidays:"] },
  faq: { title: "FAQ", body: ["How long is delivery? Complimentary Ground delivery applies to orders up to $2,000; Express 2 day $35, Standard Overnight $60, Priority Overnight $70, Saturday Delivery $85, White Glove $500. Express is required over $2,000 and White Glove over $25,000.", "Can I return an article? Yes — free returns within 30 days of delivery, in its original condition and packaging.", "Which payment methods are accepted? MasterCard, Visa, American Express, Diners Club, Carte Blanche, JCB, Discover, Accel, Pulse, Nyce, Star and China Union Pay; PayPal and Apple Pay for select products.", "Are Birkin and Kelly quota bags sold online? No. These articles are offered in store only."] },
  stores: { title: "Find a store", body: ["Hermès boutiques welcome you across the United States. Flagship: 691 Madison Avenue, New York — Monday to Saturday 10 AM – 9 PM.", "Beauty products and Apple Watch Hermès are available in selected boutiques; please call 800-441-4488 to confirm availability before your visit."] },
  gifting: { title: "Gifting", body: ["Every order arrives in the orange box tied with Bolduc ribbon. Add a gift message at checkout; the delivery note never shows prices. Gift cards are available under Gifts → Gift cards."] },
  measure: { title: "Made to measure", body: ["The Sur Mesure atelier creates pieces measured, cut and finished for one person only. Appointments are arranged in boutique or by phone at 800-441-4488."] },
  maintenance: { title: "Maintenance and repair", body: ["Hermès artisans restore leather goods, silk, watches and jewelry in the Maison's workshops. Bring your article to any boutique for an assessment; a quotation is provided before any work begins."] },
  guides: { title: "User guides", body: ["Watch user guide: pull the crown to set the time; keep away from magnetic fields; service every 3–5 years.", "Scarf guide: your scarf 90 can be worn around the neck, as a top, a belt or on a bag handle. Dry clean only.", "Leather guide: wipe with a soft dry cloth and store in the dust bag provided.", "Wrist size guide: measure around your wrist and choose the closest size between 5.5\" and 6.5\" for Petite Lune straps."] },
  payment: { title: "Payment", body: ["We accept MasterCard, Visa, American Express, Diners Club, Carte Blanche, JCB, Discover, Accel, Pulse, Nyce, Star and China Union Pay. PayPal and Apple Pay are available for select products.", "All the transactions made on the Hermes.com website are secure."] },
  shipping: { title: "Shipping", body: ["Complimentary Ground delivery for orders up to $2,000. Express 2 day $35; Standard Overnight $60; Priority Overnight $70; Saturday Delivery $85; White Glove $500. Furniture transport is 6% of the order, up to a maximum of $5,000.", "Express delivery is required for orders over $2,000; White Glove delivery is required over $25,000. Every parcel is delivered in the orange box tied with Bolduc ribbon, with signature required for high-value orders."] },
  collect: { title: "Collect in store", body: ["Select articles can be reserved online and collected in boutique. Bring your order confirmation and an ID; your article will be held for 48 hours."] },
  track: { title: "Track orders", body: ["Order tracking is available from your account after sign-in."] },
  returns: { title: "Returns and exchanges", body: ["Free returns within 30 days of delivery. Articles must be returned in their original condition and packaging, with the Sellier tag intact; personalised articles are not eligible for return.", "A complimentary FedEx pre-paid return label is available from your account. Fragrances must be unopened, shoes must have undamaged soles, and an Apple Watch Hermès must be unpaired before return. Returns made in store are eligible for exchange or store credit only."] },
  sustainability: { title: "Sustainable development", body: ["Hermès builds objects made to last and be repaired. Materials are sourced responsibly and craftsmanship is passed down through six generations of artisans."] },
  foundation: { title: "The Hermès Foundation", body: ["Created in 2008, the Fondation d'entreprise Hermès supports creators, artisans and biodiversity through programmes in the arts, training and the environment."] },
  join: { title: "Join Hermès", body: ["The Maison recruits artisans, sales associates and head-office talent throughout the year. A human adventure since 1837 — bring your savoir-faire."] },
  finance: { title: "Finance & Governance", body: ["Hermès International is listed on Euronext Paris. Annual reports, regulated information and governance documents are published for shareholders each year."] },
  partners: { title: "Our partner brands", body: ["The group includes Puiforcat (silversmith), Saint-Louis (crystal), John Lobb (bootmaker) and Shang Xia — Maisons that share the same demand for exceptional craftsmanship."] },
  terms: { title: "Terms and conditions", body: ["By purchasing on this store you accept these terms. Prices are shown in US dollars, taxes calculated at checkout. Articles remain the property of the Maison until payment is received in full."] },
  privacy: { title: "Privacy & cookies", body: ["We process your data to fulfil orders, manage your account and — with your consent — send the newsletter. You may refuse or accept cookies at any time from the cookie dialog shown on your first visit."] },
  bcr: { title: "Binding Corporate Rules", body: ["The group's Binding Corporate Rules govern international transfers of personal data and have been approved by the competent European authorities."] },
  california: { title: "California Transparency in Supply Chain Act", body: ["The Maison audits its supply chain to verify that materials are not produced by forced or trafficked labour, and trains employees with direct responsibility for supply-chain management."] },
  coverage: { title: "Transparency in coverage", body: ["Machine-readable files for the group's US health plans are made available in accordance with the Transparency in Coverage rule."] },
  donotsell: { title: "Do Not Sell/Share My Personal Information", body: ["We do not sell your personal information. To exercise your privacy rights, contact customer service at 800-441-4488 or from your account page."] },
  legal: { title: "Legal issues", body: ["All content on this site — texts, images and the Hermès name — is protected. Counterfeit articles harm artisans and customers; report suspected counterfeits to customer service."] },
  accessibility: { title: "Accessibility", body: ["We aim to make this store usable by everyone: full keyboard navigation, labelled controls and text alternatives for imagery. Tell us at 800-441-4488 if any page is difficult to use."] },
};

// Contact form, per the original hermes.com/us/en/contact-us/ (audited
// 2026-11-11): labels ABOVE every field, underline-only inputs (no boxes,
// no placeholders), "Expected format" hints under e-mail and telephone,
// area code as a flag + "US +1" control, subject as a custom dropdown with
// the original's exact 12 options, message ~95px tall, consent on the left
// with a fixed ~200px SEND button right-aligned on the same row.
const SUBJECTS = ["Product information", "Order follow up", "Returns and exchanges for online purchases", "Returns and exchanges for in-store purchases", "Customer experience", "Product care and repair", "Press and communication", "Bespoke", "Furniture specialist", "Equestrian specialist", "Do not sell my data", "Other"];

function ContactForm({ settings, go }: { settings: Settings; go: (v: View, opts?: { restore?: boolean }) => void }) {
  const [f, setF] = useState({ first: "", last: "", email: "", area: "US +1", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState("");
  const [err, setErr] = useState("");
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [subjectTouched, setSubjectTouched] = useState(false);
  const subjectInvalid = subjectTouched && !f.subject;
  // Underline-only field (original): no box, no side/top borders; grey
  // underline turning black on the active field.
  const fieldCls = "w-full rounded-none border-0 border-b border-black/30 bg-transparent px-0 py-2 text-sm text-black focus:border-black focus:outline-none";
  const labelCls = "mb-0.5 block text-xs text-neutral-700";
  const flag = (
    <span aria-hidden="true" className="inline-block h-[13px] w-[19px] shrink-0 overflow-hidden border border-black/10" title="United States">
      <span className="block h-full w-full" style={{ background: "linear-gradient(to bottom, #b22234 0 7.7%, #ffffff 7.7% 15.4%, #b22234 15.4% 23.1%, #ffffff 23.1% 30.8%, #b22234 30.8% 38.5%, #ffffff 38.5% 46.2%, #b22234 46.2% 53.8%, #ffffff 53.8% 61.5%, #b22234 61.5% 69.2%, #ffffff 69.2% 76.9%, #b22234 76.9% 84.6%, #ffffff 84.6% 92.3%, #b22234 92.3% 100%)" }}>
        <span className="block h-[54%] w-[40%] bg-[#3c3b6e]" />
      </span>
    </span>
  );
  const chevron = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>;
  if (sent) return <p className="mt-6 border border-black/15 bg-[#fffcf7] p-5 text-sm" role="status">{sent}</p>;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.first || !f.last || !f.email.includes("@") || !/^\d{10}$/.test(f.phone.replace(/\D/g, "").replace(/^1/, "")) || !f.message || !f.subject) {
      setSubjectTouched(true);
      setErr("Please complete all fields — the telephone must be a US number (+1 followed by 10 digits).");
      return;
    }
    setErr(""); setSent(`Thank you, ${f.first}. Your message about “${f.subject}” has been sent — customer service will reply to ${f.email}.`);
  };
  return (
    <form className="mt-2 space-y-9" onSubmit={submit}>
      <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="cf-first">First name *</label>
          <input id="cf-first" aria-label="Contact first name" className={fieldCls} value={f.first} onChange={(e) => setF({ ...f, first: e.target.value })} />
        </div>
        <div>
          <label className={labelCls} htmlFor="cf-last">Last name *</label>
          <input id="cf-last" aria-label="Contact last name" className={fieldCls} value={f.last} onChange={(e) => setF({ ...f, last: e.target.value })} />
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor="cf-email">E-mail *</label>
        <input id="cf-email" aria-label="Contact email" type="email" className={fieldCls} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        <p className="mt-1 text-xs text-neutral-500">Expected format: yourname@domain.com</p>
      </div>
      <div className="flex items-start gap-8">
        <div className="w-[140px] shrink-0">
          <label className={labelCls} htmlFor="cf-area">Area code *</label>
          <div className="flex items-center gap-2 border-b border-black/30 py-2 focus-within:border-black">
            {flag}
            <select id="cf-area" aria-label="Contact area code" className="w-full appearance-none bg-transparent text-sm text-black focus:outline-none" value={f.area} onChange={(e) => setF({ ...f, area: e.target.value })}>
              <option value="US +1">US +1</option>
            </select>
            <span className="text-neutral-500">{chevron}</span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <label className={labelCls} htmlFor="cf-phone">Telephone number *</label>
          <input id="cf-phone" aria-label="Contact telephone" className={fieldCls} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
          <p className="mt-1 text-xs text-neutral-500">Expected format: phone number with 10 digits</p>
          {/* hermes.com shows a second hint under the telephone field. */}
          <p className="mt-1 text-xs text-neutral-500">Minimum 10 numbers</p>
        </div>
      </div>
      <div className="relative">
        <button type="button" aria-label="Contact subject" aria-expanded={subjectOpen} className={`flex w-full items-center justify-between border-b bg-transparent px-0 py-2 text-left text-sm focus:outline-none ${subjectInvalid ? "border-red-700" : "border-black/30 focus:border-black"}`} onClick={() => { if (subjectOpen) { setSubjectOpen(false); setSubjectTouched(true); } else setSubjectOpen(true); }}>
          <span className={f.subject ? "text-black" : "text-neutral-500"}>{f.subject || "Please select a subject *"}</span>
          <span className="text-neutral-500">{chevron}</span>
        </button>
        {subjectInvalid && <p className="mt-1 text-xs text-red-700" role="status">Required information</p>}
        {subjectOpen && (
          <>
            <button aria-hidden="true" tabIndex={-1} className="fixed inset-0 z-10 cursor-default" onClick={() => { setSubjectOpen(false); setSubjectTouched(true); }} />
            <ul className="absolute left-0 right-0 z-20 mt-1 max-h-72 overflow-auto border border-black/15 bg-white py-1 shadow-md">
              {SUBJECTS.map((s) => <li key={s}><button type="button" className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-[#f6f1eb]" onClick={() => { setF({ ...f, subject: s }); setSubjectOpen(false); setSubjectTouched(true); }}>{s}</button></li>)}
            </ul>
          </>
        )}
      </div>
      <div>
        <label className={labelCls} htmlFor="cf-message">Your message *</label>
        <textarea id="cf-message" aria-label="Contact message" className={fieldCls} rows={4} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
      </div>
      {err && <p className="-mt-4 text-sm text-red-700" role="status">{err}</p>}
      <div className="flex items-end justify-between gap-6">
        <p className="max-w-[520px] text-xs leading-5 text-neutral-600">By sending your message, you agree to accept the <button type="button" aria-label="General Terms and Conditions of Use" className="underline" onClick={() => go({ t: "page", page: "terms" })}>General Terms and Conditions of Use<span className="sr-only"> (new window)</span></button> and that your data will be processed in compliance with the <button type="button" aria-label="Privacy Policy" className="underline" onClick={() => go({ t: "page", page: "privacy" })}>Privacy Policy<span className="sr-only"> (new window)</span></button> of Hermès.</p>
        <button aria-label="Send contact message" type="submit" className="h-10 w-[200px] shrink-0 bg-black text-[11px] font-semibold uppercase tracking-[0.2em] text-white">Send</button>
      </div>
    </form>
  );
}

// ---- FAQ pages -----------------------------------------------------------
// The original's FAQ layout, measured live 2026-11-12 on the Payment page
// (hermes.com/us/en/faq/online-shopping/payment/#4605): a "← BACK" button,
// a left sidebar of 4 groups (only one expanded at a time; ONLINE SHOPPING
// expanded on load), the topic's accordions (single-open, + / − at right,
// the URL hash #4605…#4610 follows the open question), and a centred
// "More questions?" card overlapping a wide still-life photo. Only the
// Payment topic has its questions + answers so far; the other sidebar items
// point at the closest existing page until their own FAQ topic is built.
// Sidebar item order and wording are the original's own.
const FAQ_GROUPS: { key: string; label: string; icon: "bag" | "person" | "box" | "h"; items: string[] }[] = [
  { key: "online-shopping", label: "ONLINE SHOPPING", icon: "bag", items: ["Browsing", "Orders", "Gifting", "Delivery", "Collect in store", "Payment", "Returns and exchanges", "Trade Program"] },
  { key: "customer-account", label: "CUSTOMER ACCOUNT", icon: "person", items: ["Account creation", "Forgotten password", "Settings and cancellation"] },
  { key: "products", label: "PRODUCTS", icon: "box", items: ["Availability", "Size guide", "Care and repair", "Authentication", "Stores selling beauty products", "Orange boxes", "Bespoke", "Apple Watch Hermès"] },
  { key: "house", label: "THE HOUSE OF HERMÈS", icon: "h", items: ["Newsletter - advertising emails", "Manufacture", "House of Hermès", "Cookies", "Security and Data Protection"] },
];
// Interim destinations for sidebar items without their own FAQ topic page.
const FAQ_ITEM_VIEW: Record<string, View> = {
  "Delivery": { t: "page", page: "shipping" },
  "Collect in store": { t: "page", page: "collect" },
  "Returns and exchanges": { t: "page", page: "returns" },
  "Gifting": { t: "page", page: "gifting" },
  "Orders": { t: "page", page: "track" },
  "Size guide": { t: "page", page: "guides" },
  "Stores selling beauty products": { t: "page", page: "stores" },
  "Care and repair": { t: "page", page: "maintenance" },
  "Bespoke": { t: "page", page: "measure" },
  "Apple Watch Hermès": { t: "page", page: "stores" },
  "Orange boxes": { t: "page", page: "gifting" },
  "Cookies": { t: "page", page: "privacy" },
  "Security and Data Protection": { t: "page", page: "privacy" },
};
// Payment FAQ — all 6 questions + answers verbatim from the original
// (hashes #4605–#4610). Note the site's own spellings: "CarteBlanche®"
// (no space) and "Paypal®".
const PAYMENT_QAS: { q: string; hash: string; intro: string; bullets?: string[] }[] = [
  { q: "Which means of payment are accepted by Hermes.com?", hash: "4605", intro: "You can only pay for your purchases with a credit or charge card: MasterCard®, Visa®, American Express®. Diners Club®, CarteBlanche®, JCB®, Discover®, Accel®, Pulse®, Nyce®, Star® and China Union Pay®. You should enter your credit card or charge card number, its expiry date and its card verification number on the relevant page. Payments via Paypal® and Apple Pay® are accepted for select products." },
  { q: "Is my payment secure?", hash: "4606", intro: "All the transactions made on the Hermes.com website are secure. The padlock symbol next to the address bar of the page beginning with \"https\" indicates that you are in a secure setting. HERMÈS INTERNATIONAL has also established specific security measures to protect your personal information from non-authorized access and use. However, you should never consider the transmission of data by Internet to be 100% secure. Any information that you make available online can potentially be recuperated and used by third parties." },
  { q: "Do you accept international credit cards?", hash: "4607", intro: "We accept international credit cards; however, when placing your order, you must enter the international billing address that is linked to your credit card." },
  { q: "Can I place an order using a bank card that is not my own?", hash: "4608", intro: "Yes, in this case please indicate the billing address associated with the card." },
  { q: "When will my credit card be debited?", hash: "4609", intro: "Your payment will only be debited when your order is shipped, except for personalized products and for pre-orders. In this case, your payment will be debited at the time the order is placed." },
  { q: "What is the security code on my payment card?", hash: "4610", intro: "A unique code made up of 3 or 4 digits secures remote sale transactions. This code can be found:", bullets: ["on the back of your credit card in the signature field. It is made up of 3 digits (Visa or MasterCard, for example).", "or on front, above your card number. It is made up of 4 digits (American Express, for example)."] },
];
// "More questions?" photo — the original's own FAQ banner image
// (banniere-faq.png), found in the page's HTML: a still-life of grey
// crates, orange tape rings and wooden shelves. Served at the original's
// own 440px-high variant.
const FAQ_MORE_QUESTIONS_IMG = "https://assets.hermes.com/is/image/hermesedito/banniere-faq.png?fit=hfit&hei=440";

function FaqPage({ topic, go }: { topic: string; go: (v: View, opts?: { restore?: boolean }) => void }) {
  const [openGroup, setOpenGroup] = useState("online-shopping");
  const [openQa, setOpenQa] = useState(() => {
    if (typeof window === "undefined") return 0;
    const h = window.location.hash.replace("#", "");
    const i = PAYMENT_QAS.findIndex((x) => x.hash === h);
    return i >= 0 ? i : 0;
  });
  // Today only the "payment" topic has its questions + answers; routing
  // only ever produces that topic (see routing.ts).
  const activeItem = topic === "payment" ? "Payment" : "";
  const openQuestion = (i: number) => {
    setOpenQa(i);
    try { window.history.replaceState(null, "", `#${PAYMENT_QAS[i]?.hash ?? "4605"}`); } catch { /* ignore */ }
  };
  const groupIcon = (icon: "bag" | "person" | "box" | "h") => {
    if (icon === "h") return <span className="font-serif-d text-[15px] leading-none">H</span>;
    if (icon === "bag") return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 8h12l-1.2 12H7.2L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>;
    if (icon === "person") return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5" /></svg>;
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8l9-4 9 4v8l-9 4-9-4V8Z" /><path d="M3 8l9 4 9-4M12 12v8" /></svg>;
  };
  return (
    <div className="mx-auto w-full max-w-[1258px] px-4 pb-16 pt-6">
      <div className="grid gap-4 lg:grid-cols-[413px_1fr]">
        <div>
          <button aria-label="Back" className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em]" onClick={() => window.history.back()}>
            <span aria-hidden="true">←</span> Back
          </button>
          <div className="bg-[#fffcf7] py-2">
            {FAQ_GROUPS.map((g) => (
              <div key={g.key}>
                <button
                  aria-expanded={openGroup === g.key}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left"
                  onClick={() => setOpenGroup(openGroup === g.key ? "" : g.key)}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/20">{groupIcon(g.icon)}</span>
                  <span className="flex-1 text-[12px] font-medium uppercase tracking-[0.18em]">{g.label}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={openGroup === g.key ? "rotate-180" : ""}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                {openGroup === g.key && (
                  <div className="pb-2">
                    {g.items.map((item) => {
                      const active = item === activeItem;
                      return (
                        <button
                          key={item}
                          aria-current={active ? "page" : undefined}
                          className={`block w-full py-2 pl-7 pr-4 text-left text-sm hover:underline ${active ? "font-bold text-black" : "text-[#696969]"}`}
                          onClick={() => { if (active) return; go(FAQ_ITEM_VIEW[item] ?? { t: "page", page: "faq" }); }}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#fffcf7] px-6 py-6 sm:px-8">
          <h1 className="text-base font-bold uppercase tracking-[0.2em]">Payment</h1>
          <div className="mt-2">
            {PAYMENT_QAS.map((qa, i) => (
              <div key={qa.hash} className="border-b border-[#f6f1eb]">
                <button
                  aria-expanded={openQa === i}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  onClick={() => openQuestion(i)}
                >
                  <span className="text-[15px] font-bold text-black">{qa.q}</span>
                  <span aria-hidden="true" className="shrink-0 text-xl font-light leading-none">{openQa === i ? "−" : "+"}</span>
                </button>
                {openQa === i && (
                  <div className="pb-5 text-sm leading-6 text-neutral-700">
                    <p>{qa.intro}</p>
                    {qa.bullets?.map((b, j) => <p key={j} className="mt-2 pl-4">•&nbsp;&nbsp;{b}</p>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* "More questions?" — the original's white card centred over the
          still-life photo, overlapping its lower part and extending below
          it onto the cream page background; no button or link in the card. */}
      <div className="mt-14">
        {FAQ_MORE_QUESTIONS_IMG ? (
          <img src={FAQ_MORE_QUESTIONS_IMG} alt="A group of colorful objects are arranged on a shelf" className="aspect-[4/1] w-full object-cover" />
        ) : null}
        <div className={`relative mx-auto w-full max-w-[1020px] bg-[#fffcf7] px-6 py-12 text-center ${FAQ_MORE_QUESTIONS_IMG ? "-mt-[121px]" : ""}`}>
          <h3 className="font-serif-d text-3xl italic">More questions?</h3>
          <p className="mt-4 text-sm leading-6 text-neutral-700">Do you need to contact our team?</p>
          <p className="text-sm leading-6 text-neutral-700">Our advisors will be delighted to answer your questions.</p>
        </div>
      </div>
    </div>
  );
}

function InfoPage({ page, settings, go, user }: { page: string; settings: Settings; go: (v: View, opts?: { restore?: boolean }) => void; user: { name: string; email: string } | null }) {
  if (page === "sitemap") {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="font-serif-d text-3xl italic">Hermès Sitemap</h1>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {NAV.map((n) => (
            <div key={n.key}>
              <button aria-label={`Sitemap ${n.label}`} className="text-xs font-semibold uppercase tracking-[0.2em] underline-offset-4 hover:underline" onClick={() => go({ t: "category", cat: n.key })}>{n.label}</button>
              {n.subs.map((s) => <button key={s} aria-label={`Sitemap ${n.label} ${s}`} className="block py-1 text-sm text-neutral-600 hover:underline" onClick={() => go({ t: "category", cat: n.key, sub: s })}>{s}</button>)}
            </div>
          ))}
          {FOOTER_COLS.map((c) => (
            <div key={c.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">{c.title}</p>
              {c.links.map(([l, pg]) => <button key={l} aria-label={`Sitemap page ${l}`} className="block py-1 text-sm text-neutral-600 hover:underline" onClick={() => { if (pg.startsWith("faq:")) go({ t: "faq", topic: pg.slice(4) }); else go({ t: "page", page: pg }); }}>{l}</button>)}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (page === "track") {
    return <TrackOrders settings={settings} user={user} go={go} />;
  }
  if (page === "contact") {
    // Contact Us page, per the original hermes.com/us/en/contact-us/
    // (audited 2026-11-11): BACK button above a white panel on the cream
    // page; "CONTACT US" in a pale heading band with a divider below it;
    // "Customer Service" sub-heading; hours line, then the phone on its
    // own line as a tel link; FAQs as a bold link; "* Required information"
    // right-aligned just above the form. Panel is ~2/3 of the viewport
    // wide (905px at 1366, ~1270px at 1919), full width on mobile.
    const back = () => { if (window.history.length > 1) window.history.back(); else go({ t: "home" }); };
    return (
      <div className="mx-auto px-4 py-6 sm:py-8">
        <div className="mx-auto w-full max-w-[1280px] sm:max-w-[66vw]">
          <button aria-label="Back" className="font-mono-d mb-4 text-xs font-medium uppercase tracking-[0.15em] text-black" onClick={back}>← BACK</button>
          <div className="bg-white">
            <div className="border-b border-[#e2d8ce] bg-[#fcf7f1] px-6 py-5 sm:px-8">
              <h1 className="font-mono-d text-xl font-medium uppercase">Contact us</h1>
            </div>
            <div className="px-6 py-7 sm:px-8">
              <h2 className="text-[15px] font-bold text-black">Customer Service</h2>
              <p className="mt-4 text-sm leading-7 text-neutral-700">{settings.serviceHours} :</p>
              <p className="text-sm leading-7"><a aria-label="Call Hermès customer service" className="underline underline-offset-4" href={`tel:${settings.phone}`}>{settings.phone}</a></p>
              <p className="mt-4 text-sm leading-7 text-neutral-700">The answer to your question can certainly be found in the <a href="/us/en/faq/" aria-label="Frequently asked questions" className="font-bold underline underline-offset-4" onClick={(e) => { e.preventDefault(); go({ t: "page", page: "faq" }); }}>FAQs</a></p>
              <p className="mt-4 text-sm leading-7 text-neutral-700">You can also contact us outside public holidays:</p>
              <p className="mt-6 text-right text-xs text-neutral-600">* Required information</p>
              <ContactForm settings={settings} go={go} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  const pg = PAGES[page] ?? PAGES.faq;
  const data = pg ?? { title: "Hermès", body: [] as string[] };
  // Admin-editable overrides (Theme & Settings): the delivery / returns /
  // payment text and the flagship store address, when the admin has set
  // them. Otherwise the original's wording stands.
  let body = data.body;
  if (page === "shipping" && settings.deliveryText) body = [settings.deliveryText, ...data.body.slice(1)];
  if (page === "returns" && settings.returnsText) body = [settings.returnsText, ...data.body.slice(1)];
  if (page === "payment" && settings.paymentMethods) body = [`We accept ${settings.paymentMethods}.`, ...data.body.slice(1)];
  if (page === "stores" && settings.flagshipStore) body = data.body.map((b) => b.replace("691 Madison Avenue, New York", settings.flagshipStore));
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif-d text-3xl italic">{data.title}</h1>
      {body.map((b, i) => <p key={i} className="mt-4 text-sm leading-7 text-neutral-700">{b}</p>)}
      {page === "contact" && <ContactForm settings={settings} go={go} />}
      {(page === "donotsell" || page === "legal") && <p className="mt-4 text-sm">Customer service: <a aria-label="Call customer service" className="underline" href={`tel:${settings.phone}`}>{settings.phone}</a> — {settings.serviceHours}.</p>}
      <button aria-label="Continue shopping" className="mt-8 border border-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.25em]" onClick={() => go({ t: "home" })}>Continue shopping</button>
    </div>
  );
}

function TrackOrders({ user, go }: { settings: Settings; user: { name: string; email: string } | null; go: (v: View, opts?: { restore?: boolean }) => void }) {
  const [email, setEmail] = useState(user?.email ?? "");
  const [orderId, setOrderId] = useState("");
  const [sent, setSent] = useState("");
  const [tracked, setTracked] = useState<{ id: number; status: string } | null>(null);
  const [trackMsg, setTrackMsg] = useState("");
  const q = useQuery({ queryKey: ["track", sent], queryFn: () => api.myOrders({ email: sent }), enabled: sent.includes("@") });
  const doTrack = async () => {
    const em = user?.email ?? email;
    if (orderId.trim()) {
      const r = await api.trackOrder({ orderId: Number(orderId), email: em });
      if (r.found && r.order) { setTracked({ id: r.order.id, status: r.order.status }); setTrackMsg(""); setSent(em); }
      else { setTracked(null); setTrackMsg("No order found with that number and email."); }
    } else setSent(em);
  };
  const steps = ["Pending", "Processing", "Shipped", "Delivered"];
  const shown = tracked ? (q.data?.orders.filter(o => o.id === tracked.id) ?? []) : (q.data?.orders ?? []);
  if (!user) return (
    <div className="mx-auto max-w-md px-4 py-12 text-center">
      <h1 className="text-xs font-semibold uppercase tracking-[0.35em]">Track orders</h1>
      <p className="mt-4 text-sm leading-6 text-neutral-700">Please sign in to track your orders — order tracking is available from your account.</p>
      <button aria-label="Sign in to track orders" className="mt-6 w-full bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => go({ t: "account" })}>Sign in</button>
    </div>
  );
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif-d text-3xl italic">Track orders</h1>
      <p className="mt-3 text-sm text-neutral-700">Enter your order number and the email used at checkout to see its status timeline, or leave the number empty to list all your orders.</p>
      <div className="mt-5 grid gap-2 sm:grid-cols-[140px_1fr_auto]">
        <input aria-label="Order number for tracking" inputMode="numeric" className="border border-black/30 px-3 py-3 text-sm" placeholder="Order #" value={orderId} onChange={(e) => setOrderId(e.target.value.replace(/[^0-9]/g, ""))} />
        <input aria-label="Email for order tracking" type="email" className="min-w-0 border border-black/30 px-3 py-3 text-sm" placeholder="Your checkout email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button aria-label="Track my orders" className="bg-black px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white" onClick={doTrack}>Track</button>
      </div>
      {trackMsg && <p className="mt-4 text-sm text-red-700" role="status">{trackMsg}</p>}
      {q.data && shown.length === 0 && !trackMsg && <p className="mt-6 text-sm text-neutral-600">No orders found for this email yet.</p>}
      {shown.map((o) => {
        const norm = o.status === "Placed" ? "Pending" : o.status === "Confirmed" ? "Processing" : o.status;
        const idx = steps.indexOf(norm);
        let items: { name: string; qty: number; price: number }[] = []; try { items = JSON.parse(o.items) as typeof items; } catch { items = []; }
        return (
        <div key={o.id} className="mt-4 border border-black/10 bg-[#fffcf7] p-4">
          <p className="text-sm font-medium">Order #{o.id} — {fmt(o.total)} — <span className="uppercase tracking-wider">{o.status}</span></p>
          <p className="text-xs text-neutral-500">{new Date(o.createdAt).toLocaleString()}{o.paymentMethod ? ` · Paid with ${o.paymentMethod}` : ""}{o.deliveryOption ? ` · ${o.deliveryOption}` : ""}</p>
          {items.map((it, i) => <p key={i} className="mt-1 text-sm text-neutral-700">{it.qty} × {it.name} — {fmt(it.price * it.qty)}</p>)}
          {o.status === "Cancelled" ? <p className="mt-3 text-sm text-red-700">This order was cancelled.</p> : (
            <div className="mt-4 flex items-center" aria-label={`Order ${o.id} status timeline`}>{steps.map((st, i) => <div key={st} className="flex flex-1 items-center last:flex-none"><div className="flex flex-col items-center"><span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] ${i <= idx ? "bg-black text-white" : "border border-black/30 text-neutral-400"}`}>{i <= idx ? "✓" : i + 1}</span><span className="mt-1 whitespace-nowrap text-[10px] uppercase tracking-wider">{st}</span></div>{i < steps.length - 1 && <span className={`mx-1 mb-4 h-px flex-1 ${i < idx ? "bg-black" : "bg-black/20"}`} />}</div>)}</div>
          )}
        </div> );
      })}
      <button aria-label="Go to account" className="mt-8 text-xs uppercase tracking-[0.2em] underline" onClick={() => go({ t: "account" })}>Open my account</button>
    </div>
  );
}

function AboutPage({ go }: { go: (v: View, opts?: { restore?: boolean }) => void }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">About Hermès</p>
      <h1 className="font-serif-d mt-2 text-4xl italic">A house of creation since 1837</h1>
      <p className="mt-5 text-sm leading-7 text-neutral-700">Founded in 1837 as a harness workshop in Paris, Hermès is a family-run, independent house built on craftsmanship, creative freedom and objects made to last. Six generations of artisans have shaped its leather goods, silk, ready-to-wear, jewelry, watches, perfume and art of living.</p>
      <p className="mt-4 text-sm leading-7 text-neutral-700">Sixteen métiers work side by side: leather, silk, porcelain, crystal, jewelry and more — each object beginning in the hands of a single artisan who signs their work through its quality alone.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[["Leather Goods", "leather"], ["Silk", "women"], ["The Home", "home"]].map(([l, c]) => (
          <button key={l} aria-label={`Explore ${l}`} className="border border-black px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.2em]" onClick={() => go({ t: "category", cat: c ?? "home" })}>{l}</button>
        ))}
      </div>
    </div>
  );
}

const fmt2 = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function CartPage({ cart, setCart, settings, go, total, count, products }: { cart: CartItem[]; setCart: (c: CartItem[]) => void; settings: Settings; go: (v: View, opts?: { restore?: boolean }) => void; total: number; count: number; products: Product[] }) {
  const [giftOpen, setGiftOpen] = useState(false);
  const [giftCard, setGiftCard] = useState<"blank" | "personal">("blank");
  const [giftMsg, setGiftMsg] = useState("");
  const [hidePrice, setHidePrice] = useState(false);
  // The cart page shows NO payment details/methods or card fields (verified
  // live on hermes.com §E) — only the BUY WITH APPLE PAY button below.
  const delayFor = (i: CartItem) => products.find((p) => p.id === i.productId)?.shippingDelay ?? "";
  // Right column (shared by the filled and empty cart): Orange Box,
  // Customer Service, Reinsurance — in that order, as on hermes.com (§E).
  const rightCol = (
    <div className="space-y-6">
      <section className="bg-[#fffcf7] px-5 py-5" aria-label="The orange box section">
        <div className="border-b border-[#f6f1eb] pb-4"><h2 className={CO_HEAD_LG}>The Orange Box</h2></div>
        <div className="flex items-center gap-4 py-4">
          <img src="https://www.hermes.com/us/en/assets/images/orange-box.png" alt="" aria-hidden="true" className="h-[70px] w-[70px] shrink-0" style={{ boxShadow: "-6px 6px 12px #f6f1eb78" }} />
          <p className="text-xs leading-5 text-black">All orders are delivered in an orange box tied with a Bolduc ribbon, with the exception of <button aria-label="Certain items exceptions from cart" className="underline" onClick={() => go({ t: "page", page: "gifting" })}>certain items</button></p>
        </div>
      </section>
      <section className="bg-[#fffcf7] px-5 py-5" aria-label="Customer service section">
        <h2 className={CO_HEAD}>Customer Service</h2>
        <p className="mt-4 text-sm text-neutral-600">Monday to Saturday 10am - 9pm EST :</p>
        <p className="mt-1 text-sm"><a aria-label="Call customer service from cart" className="underline" href={`tel:${settings.phone}`}>{settings.phone}</a></p>
      </section>
      <section className="bg-[#fffcf7] px-5 py-5" aria-label="Reinsurance section">
        <h2 className={CO_HEAD}>Reinsurance</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 text-center">
          <button aria-label="Returns and exchanges from cart" className="flex flex-col items-center gap-2 text-sm" onClick={() => go({ t: "page", page: "returns" })}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 8h11l-3-3M17 16H6l3 3" /></svg>Returns &amp; exchanges</button>
          <button aria-label="Shop securely from cart" className="flex flex-col items-center gap-2 text-sm" onClick={() => go({ t: "page", page: "payment" })}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="1" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>Shop securely</button>
        </div>
      </section>
    </div>
  );
  // Minimal cart-page footer (§E): five links + copyright only — no
  // newsletter / footer services block on the cart page. The link set
  // matches hermes.com's cart footer exactly: "Terms and conditions,
  // Privacy & cookies, Legal issues, Accessibility, Site map".
  const cartFooter = (
    <div className="mt-10 border-t border-[#f6f1eb] bg-[#fffcf7] px-5 py-5 text-[13px] text-neutral-600">
      <p>
        <button aria-label="Cart footer Terms and conditions" className="hover:underline" onClick={() => go({ t: "page", page: "terms" })}>Terms and conditions</button>
        {" | "}
        <button aria-label="Cart footer Privacy and cookies" className="hover:underline" onClick={() => go({ t: "page", page: "privacy" })}>Privacy &amp; cookies</button>
        {" | "}
        <button aria-label="Cart footer Legal issues" className="hover:underline" onClick={() => go({ t: "page", page: "legal" })}>Legal issues</button>
        {" | "}
        <button aria-label="Cart footer Accessibility" className="hover:underline" onClick={() => go({ t: "page", page: "accessibility" })}>Accessibility</button>
        {" | "}
        <button aria-label="Cart footer Site map" className="hover:underline" onClick={() => go({ t: "page", page: "sitemap" })}>Site map</button>
      </p>
      <p className="pt-1">{settings.copyrightText || "© Hermès 2026. All rights reserved."}</p>
    </div>
  );
  return (
    <div className="min-h-screen bg-[#fcf7f1]">
      <div className="mx-auto max-w-[1290px] px-4 py-6 sm:px-6">
        <div className="relative flex items-start">
          <button aria-label="Back to store from cart" className="flex h-10 items-center gap-1.5 text-sm" onClick={() => go({ t: "home" })}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20 12H4m0 0 6-6M4 12l6 6" /></svg><span className="hidden sm:inline">Back</span>
          </button>
          <span className="absolute left-1/2 top-0 -translate-x-1/2"><HermesLogo settings={settings} variant="brand" /></span>
          <span className="w-10" />
        </div>
        <div className="mt-2"><CheckoutProgress step={1} nextStep /></div>
        {cart.length === 0 ? (
          <div className="mt-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_463px]">
              <div className="flex flex-col items-center bg-[#fffcf7] px-6 py-16 text-center">
                <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M5 8h14l-1.2 12.2a1.8 1.8 0 0 1-1.8 1.6H8a1.8 1.8 0 0 1-1.8-1.6L5 8Z" /><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" /></svg>
                <h1 className="mt-5 text-lg">Your cart is empty</h1>
                <button aria-label="Continue shopping from empty cart" className="mt-6 bg-black px-10 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => go({ t: "home" })}>Continue shopping</button>
              </div>
              {rightCol}
            </div>
            {cartFooter}
          </div>
        ) : (
          <div>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_463px]">
              <div>
                <h3 className="font-mono-d text-center text-xs font-medium uppercase tracking-normal">You have {count} item{count === 1 ? "" : "s"} in your cart.</h3>
                {cart.map((i) => {
                  const delay = delayFor(i);
                  const delayText = delay ? (delay.endsWith(".") ? delay : `${delay}.`) : "";
                  return (
                    <div key={i.key} className="mt-5 flex gap-4 border-b border-black/10 pb-5">
                      <div className="w-24 shrink-0 sm:w-[172px]">
                        <button aria-label={`Open ${i.name}`} className="block w-full overflow-hidden" onClick={() => go({ t: "product", id: i.productId })}><img src={cartImageFor(products, i.productId, i.name, i.price)} alt={i.name} className="w-full object-cover" /></button>
                        <div className="mt-2 flex items-center justify-center gap-2">
                          <button aria-label={`Decrease quantity of ${i.name}`} disabled={i.qty <= 1} className="h-7 w-7 border border-black/30 disabled:cursor-not-allowed disabled:opacity-30" onClick={() => setCart(cart.map((x) => x.key === i.key ? { ...x, qty: Math.max(1, x.qty - 1) } : x))}>−</button>
                          <span aria-label={`Quantity of ${i.name}`}>{i.qty}</span>
                          <button aria-label={`Increase quantity of ${i.name}`} className="h-7 w-7 border border-black/30" onClick={() => setCart(cart.map((x) => x.key === i.key ? { ...x, qty: x.qty + 1 } : x))}>+</button>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <button aria-label={`Open ${i.name}`} className="text-left text-sm underline-offset-4 hover:underline" onClick={() => go({ t: "product", id: i.productId })}>{i.name}</button>
                        {i.color ? <p className="mt-1 text-xs text-neutral-600">Color: {i.color}</p> : null}
                        {i.size ? <p className="text-xs text-neutral-600">Size: {i.size}</p> : null}
                        {i.refCode ? <p className="text-xs text-neutral-600">Ref: {i.refCode}{i.size}</p> : null}
                        {delayText ? <p className="mt-2 flex items-start gap-1.5 text-xs text-neutral-600"><span aria-hidden="true">ⓘ</span><span>{delayText}</span></p> : null}
                      </div>
                      <div className="shrink-0 text-right">
                        <button aria-label={`Remove ${i.name} from cart`} className="text-xs underline" onClick={() => setCart(cart.filter((x) => x.key !== i.key))}>Remove</button>
                        <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-neutral-500">Price</p>
                        <p className="text-sm">{fmt2(i.price * i.qty)}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="mt-6 space-y-3 border-t border-black/10 pt-5 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>{fmt2(total)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>-</span></div>
                  <p className="-mt-1 text-xs text-neutral-500">Shipping costs will be calculated during checkout</p>
                  <div className="flex justify-between"><span>Taxes</span><span>-</span></div>
                  <p className="-mt-1 text-xs text-neutral-500">Taxes will be calculated during checkout</p>
                  <div className="flex justify-between border-t border-black/10 pt-3 text-sm font-semibold uppercase tracking-[0.15em]"><span>Total</span><span>{fmt2(total)}</span></div>
                </div>
                <div className="mt-6 border border-black/10">
                  <label className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em]">
                    Gifting
                    <input type="checkbox" aria-label="Gifting" checked={giftOpen} onChange={(e) => setGiftOpen(e.target.checked)} className="h-4 w-4 shrink-0 accent-black" />
                  </label>
                  {giftOpen && (
                    <div className="border-t border-black/10 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">You can define a personal message</p>
                      <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm">
                        <input type="radio" name="giftcard" aria-label="Blank card" checked={giftCard === "blank"} onChange={() => setGiftCard("blank")} className="h-4 w-4 accent-black" /> Blank card
                      </label>
                      <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm">
                        <input type="radio" name="giftcard" aria-label="Personal message" checked={giftCard === "personal"} onChange={() => setGiftCard("personal")} className="h-4 w-4 accent-black" /> Personal message
                      </label>
                      {giftCard === "personal" && (
                        <textarea aria-label="Your personal gift message" className="mt-3 w-full border border-black/25 bg-white px-3 py-2.5 text-sm outline-none" rows={3} placeholder="Write your message" value={giftMsg} onChange={(e) => setGiftMsg(e.target.value)} />
                      )}
                      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em]">You can hide price on invoice</p>
                      <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm">
                        <input type="checkbox" aria-label="Hide price on invoice" checked={hidePrice} onChange={(e) => setHidePrice(e.target.checked)} className="h-4 w-4 accent-black" /> Hide price on invoice
                      </label>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex gap-3">
                  <button aria-label="Checkout from cart" className="font-mono-d flex h-12 flex-1 items-center justify-center bg-black text-xs font-medium uppercase tracking-normal text-white" onClick={() => go({ t: "checkout" })}>Checkout</button>
                  <button aria-label="Buy with Apple Pay from cart" className="flex h-12 flex-1 items-center justify-center gap-1.5 border border-black bg-white text-sm font-semibold" onClick={() => go({ t: "checkout" })}><span className="text-sm font-semibold">Buy with</span><svg width="15" height="15" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg><span className="text-sm font-semibold">Pay</span></button>
                </div>
              </div>
              <aside className="h-fit lg:sticky lg:bottom-0">{rightCol}</aside>
            </div>
            {cartFooter}
          </div>
        )}
      </div>
    </div>
  );
}

function SocialCircles() {
  const cls = "flex h-6 w-6 items-center justify-center rounded-full bg-black text-white lg:h-4 lg:w-4";
  return (
    <div className="flex gap-4">
      <a aria-label="Hermès on Facebook" href="https://www.facebook.com/Hermes" target="_blank" rel="noreferrer" className={cls}>
        <svg className="h-4 w-4 lg:h-3 lg:w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.2 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.3c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8.8v2.8h2.4V21h3Z" /></svg>
      </a>
      <a aria-label="Hermès on Instagram" href="https://www.instagram.com/hermes" target="_blank" rel="noreferrer" className={cls}>
        <svg className="h-4 w-4 lg:h-3 lg:w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="3.8" /><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" /></svg>
      </a>
      <a aria-label="Hermès on YouTube" href="https://www.youtube.com/@HermesParis" target="_blank" rel="noreferrer" className={cls}>
        <svg className="h-4 w-4 lg:h-3 lg:w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" /></svg>
      </a>
    </div>
  );
}

// Floating chat bubble — bottom-right on every page except admin,
// as on hermes.com: a 48px white circle
// with the speech-bubble glyph, bottom-5 right-5, accessible name "Open a
// Live Chat with an advisor". Opening it first shows the Live Chat consent
// dialog (§G, verbatim text + Privacy Policy link + CONTINUE), then a
// brief loading spinner, then the chat with the verbatim welcome message
// and a generic "Client Specialist" greeting — no real advisor is named.
// The thread itself is localStorage hv-chat (api.getChatMessages /
// sendChatMessage), the same store the Admin Panel chat tab reads, so the
// store's replies appear in the same thread. On mobile product pages the
// bubble sits above the sticky ADD TO CART bar; on desktop it does the
// same ONLY while the sticky bar is visible (buyBarVisible, reported up
// from ProductView's IntersectionObserver) — raised 76px so it clears the
// 72px bar with a gap, exactly as on hermes.com. When the bar is hidden
// the desktop bubble stays at bottom-5 like everywhere else.
function ChatBubble({ settings, go, view, buyBarVisible }: { settings: Settings; go: (v: View, opts?: { restore?: boolean }) => void; view: View; buyBarVisible?: boolean }) {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<"consent" | "loading" | "chat">("consent");
  const [msgs, setMsgs] = useState<LocalChat[]>([]);
  const [draft, setDraft] = useState("");
  const [chatOpenedAt, setChatOpenedAt] = useState("");
  const [closedNote, setClosedNote] = useState<"closed" | "new" | null>(null);
  if (!settings.chatEnabled) return null;
  const load = () => { void api.getChatMessages({}).then((r) => setMsgs(r.messages)); };
  const fmtTime = (iso: string) => { const d = new Date(iso); return Number.isNaN(d.getTime()) ? "" : d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }); };
  const nowTime = () => new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const hasAdvisorMsg = msgs.some((m) => m.from !== "customer");
  const openPanel = () => { setOpen(true); setStage("consent"); setClosedNote(null); load(); };
  const closePanel = () => { const wasChat = stage === "chat"; setOpen(false); if (wasChat) setClosedNote(hasAdvisorMsg ? "new" : "closed"); };
  const continueChat = () => { setStage("loading"); setChatOpenedAt(nowTime()); window.setTimeout(() => setStage("chat"), 900); };
  const send = async () => {
    const t = draft.trim();
    if (!t) return;
    const r = await api.sendChatMessage({ from: "customer", text: t });
    if (r.ok) { setDraft(""); load(); }
  };
  // Desktop raise is state-driven: only while the sticky bar is visible
  // (buyBarVisible); otherwise the desktop bubble stays at bottom-5.
  // Hidden on the MOBILE homepage: the original's mobile homepage shows
  // no floating chat bubble (user's video, 2026-11-12) while ours sat on
  // top of the product photos below the carousel. Desktop homepage keeps
  // it (the original has it there).
  const barVisible = view.t === "product" && !!buyBarVisible;
  return (
    <div className={`fixed z-40 flex flex-col items-end gap-2 right-5 ${view.t === "home" ? "max-lg:hidden" : ""} ${view.t === "product" ? "bottom-[calc(76px+env(safe-area-inset-bottom))]" : "bottom-5"} ${barVisible ? "lg:bottom-[76px]" : "lg:bottom-5"}`}>
      {open && (
        <>
          <button aria-label="Close the live chat with an advisor" className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg leading-none text-neutral-600 shadow-lg ring-1 ring-black/10" onClick={closePanel}>×</button>
          <div className="w-[390px] max-w-[calc(100vw-40px)] bg-white p-4 shadow-xl ring-1 ring-black/10" role="dialog" aria-label="Message">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.5 0-3-.4-4.2-1.1L3 20l1.1-5.3A8.5 8.5 0 1 1 21 11.5Z" /><path d="M8 10.5h8M8 13.5h5" /></svg>
                Message
              </p>
              <button aria-label="Collapse live chat" className="flex h-8 w-8 items-center justify-center text-neutral-600" onClick={closePanel}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </button>
            </div>
            {stage === "consent" && (
              <div role="alertdialog" aria-label="Live chat consent">
                <p className="mt-2 text-sm leading-6 text-neutral-700">By using our Live Chat, you accept the use of your personal data by Hermès of Paris in order to respond to your requests about a product or service and to enhance the customer experience. To find out more about the management of your personal data and your rights, please see our <button type="button" aria-label="Privacy Policy" className="underline" onClick={() => { closePanel(); go({ t: "page", page: "privacy" }); }}>Privacy Policy</button>.</p>
                <button aria-label="Continue to live chat" className="mx-auto mt-5 block border border-black px-8 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em]" onClick={continueChat}>Continue</button>
              </div>
            )}
            {stage === "loading" && (
              <div className="flex items-center justify-center py-16" aria-label="Loading live chat">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-black/15 border-t-black" aria-hidden="true" />
              </div>
            )}
            {stage === "chat" && (
              <>
                <div className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-neutral-500"><span className="h-px flex-1 bg-black/10" aria-hidden="true" />Today<span className="h-px flex-1 bg-black/10" aria-hidden="true" /></div>
                <div className="mt-3 max-h-[50vh] space-y-2 overflow-y-auto">
                  <div className="max-w-[85%] bg-[#f6f1eb] px-3 py-2 text-sm leading-5">
                    Welcome to Hermès.com Live Chat! We are delighted to assist you and a Client Specialist will be with you shortly.
                    <p className="mt-1 text-right text-[10px] text-neutral-500">{chatOpenedAt}</p>
                  </div>
                  {msgs.map((m) => m.from === "customer" ? (
                    <div key={m.id} className="ml-auto max-w-[85%] text-right">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">You</p>
                      <p className="bg-black px-3 py-2 text-left text-sm leading-5 text-white">{m.text}</p>
                      <p className="mt-0.5 text-[10px] text-neutral-500">{fmtTime(m.createdAt)}</p>
                    </div>
                  ) : (
                    <div key={m.id} className="max-w-[85%] bg-[#f6f1eb] px-3 py-2 text-sm leading-5">
                      {m.text}
                      <p className="mt-1 text-right text-[10px] text-neutral-500">{fmtTime(m.createdAt)}</p>
                    </div>
                  ))}
                </div>
                <form aria-label="Send a message to an advisor" className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); void send(); }}>
                  <input aria-label="Your message" required className="min-w-0 flex-1 border border-black/20 bg-white px-3 py-2.5 text-sm outline-none" placeholder="Your message" value={draft} onChange={(e) => setDraft(e.target.value)} />
                  <button aria-label="Send" type="submit" className="flex w-11 shrink-0 items-center justify-center bg-black text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 3 10.5 13.5M21 3l-7 18-3.5-7.5L3 10l18-7Z" /></svg>
                  </button>
                </form>
              </>
            )}
          </div>
        </>
      )}
      <button aria-label="Open a Live Chat with an advisor" aria-expanded={open} className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/10" onClick={() => { if (open) closePanel(); else openPanel(); }}>
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.5 0-3-.4-4.2-1.1L3 20l1.1-5.3A8.5 8.5 0 1 1 21 11.5Z" /><path d="M8 10.5h8M8 13.5h5" /></svg>
      </button>
      {!open && closedNote === "closed" && <p className="text-[11px] text-neutral-600">Live chat support closed</p>}
      {!open && closedNote === "new" && <p className="text-[11px] text-neutral-600">New message from Live chat support</p>}
    </div>
  );
}

function Footer({ settings, go }: { settings: Settings; go: (v: View, opts?: { restore?: boolean }) => void }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState("");
  const [ship, setShip] = useState(settings.shipTo);
  const [shipOpen, setShipOpen] = useState(false);
  const shipCountries = (settings.shipToCountries || "UNITED STATES").split(",").map((c) => c.trim()).filter(Boolean);
  const [openCol, setOpenCol] = useState<string | null>(null);
  const [subOpen, setSubOpen] = useState(false);
  const [svcIdx, setSvcIdx] = useState(0);
  const sub = useMutation({ mutationFn: () => api.subscribeNewsletter({ email }), onSuccess: () => { setDone(settings.newsletterSuccess || "Thank you — you are subscribed to the newsletter."); setEmail(""); } });
  useEffect(() => { setShip(settings.shipTo); }, [settings.shipTo]);
  const serviceIcons: Record<string, React.ReactNode> = {
    "STANDARD DELIVERY": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M2.5 6h12v10h-12zM14.5 9.5h3.6l3 3.4v3.1h-6.6" /><circle cx="6.5" cy="17.8" r="1.9" /><circle cx="17.3" cy="17.8" r="1.9" /></svg>,
    "RETURNS": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M8.5 5.5 4 10l4.5 4.5M4 10h10a6 6 0 0 1 0 12h-3" /></svg>,
    "CUSTOMER SERVICE": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M5 3.5h4l1.5 4.5L8 10a13 13 0 0 0 6 6l2-2.5 4.5 1.5v4a2 2 0 0 1-2.2 2A18.5 18.5 0 0 1 3 5.7a2 2 0 0 1 2-2.2Z" /></svg>,
    "SECURED PAYMENT": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="2.5" y="6" width="15" height="11" rx="1.5" /><path d="M2.5 9.8h15" /><path d="M17.2 13.2v-1.4a1.5 1.5 0 0 1 3 0v1.4" /><rect x="15.8" y="13.2" width="5.7" height="5" rx="0.8" fill="currentColor" stroke="none" /></svg>,
  };
  const services: { title: string; body: React.ReactNode; page: string }[] = [
    { title: "STANDARD DELIVERY", page: "shipping", body: <>{settings.serviceDeliveryBody || "Free standard delivery. Hermès offers several fast and secure delivery options."}</> },
    { title: "RETURNS", page: "returns", body: settings.serviceReturnsBody ? <>{settings.serviceReturnsBody}</> : <>Free returns within 30 days. See conditions and procedure in our return<button aria-label="Return FAQs" className="underline underline-offset-2" onClick={(e) => { e.stopPropagation(); go({ t: "page", page: "returns" }); }}>FAQs</button>.</> },
    { title: "CUSTOMER SERVICE", page: "contact", body: <>{settings.serviceHours}<br /><a aria-label="Call Hermès customer service" className="underline underline-offset-2" href={`tel:${settings.phone}`} onClick={(e) => e.stopPropagation()}>{settings.phone}</a> | <button aria-label="Contact us from footer" className="underline underline-offset-2" onClick={(e) => { e.stopPropagation(); go({ t: "page", page: "contact" }); }}>Contact us</button></> },
    { title: "SECURED PAYMENT", page: "payment", body: <>{settings.servicePaymentBody || "All the transactions made on Hermes.com are secured"}</> },
  ];
  const newsletterForm = (boxed: boolean) => done ? <p className="mt-3 text-sm font-medium" role="status">{done}</p> : boxed ? (
    <>
      <input aria-label="Newsletter email" type="email" className="mt-3 w-full border border-black/30 px-3 py-2.5 text-sm" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button aria-label="Subscribe to the newsletter" className="mt-2 w-full border border-black py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em]" onClick={() => { if (email.includes("@")) sub.mutate(); }}>Subscribe<span className="sr-only"> to the Newsletter</span></button>
    </>
  ) : (
    <>
      <button aria-label="Subscribe to the newsletter" className="font-mono-d mt-2 text-xs font-medium uppercase tracking-normal underline underline-offset-8" onClick={() => setSubOpen(!subOpen)}>Subscribe<span className="sr-only"> to the Newsletter</span></button>
      {subOpen && (
        <div className="mt-3">
          <input aria-label="Newsletter email" type="email" className="w-full border border-black/30 px-3 py-2.5 text-sm" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button aria-label="Confirm newsletter subscription" className="mt-2 w-full border border-black py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em]" onClick={() => { if (email.includes("@")) sub.mutate(); }}>Subscribe<span className="sr-only"> to the Newsletter</span></button>
        </div>
      )}
    </>
  );
  const svc = services[svcIdx] ?? services[0]!;
  return (
    <>
    <footer>
      {/* BOARD f) SERVICE STRIP — #fcf7f1 (very pale warm cream, sampled on
          hermes.com), thin rule ABOVE and BELOW it. Mobile: ONE service at
          a time, centred, with < > arrows on the sides — exactly as on the
          real site. Desktop: all four at once in four columns, thin line
          icons, no arrows, no carousel. */}
      <div style={{ background: "#fcf7f1" }}>
      <div className="relative px-12 py-4 text-center lg:hidden">
        <button aria-label="Previous image" className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-neutral-700" onClick={() => setSvcIdx((svcIdx + services.length - 1) % services.length)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg></button>
        <div key={svc.title}>
          <span className="flex justify-center">{serviceIcons[svc.title]}</span>
          <p className="font-mono-d mt-1 text-xs font-light uppercase tracking-normal sm:mt-4">{svc.title}</p>
          <p className="mx-auto mt-1 max-w-xs text-[11px] leading-[18px] text-black">{svc.body}</p>
        </div>
        <button aria-label="Next image" className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-neutral-700" onClick={() => setSvcIdx((svcIdx + 1) % services.length)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg></button>
      </div>
      <div className="hidden w-full gap-10 px-6 py-8 text-center lg:grid lg:grid-cols-4">
        {services.map((s) => (
          <div key={s.title}>
            <span className="flex justify-center">{serviceIcons[s.title]}</span>
            <p className="font-mono-d mt-1 text-xs font-light uppercase tracking-normal sm:mt-4">{s.title}</p>
            <p className="mx-auto mt-2 max-w-xs text-[11px] leading-[18px] text-black">{s.body}</p>
          </div>
        ))}
      </div>
      </div>
      {/* BOARD g) FOOTER — #f6f1eb (light warm greige, sampled on
          hermes.com; pale, never brown). Mobile — accordion rows in the
          order SERVICES / ORDERS / LA MAISON HERMÈS / LEGAL, LEGAL open by
          default, its links flowing in small text with | separators, then
          NEWSLETTER, FOLLOW US, SHIP TO and the copyright row. */}
      <div className="lg:hidden" style={{ background: "#f6f1eb" }}>
        <div className="px-4 py-2">
          {FOOTER_COLS.map((c) => {
            const open = openCol === c.title;
            const isServices = c.title === "SERVICES";
            const cols = isServices ? [...FOOTER_COLS[0]!.links] : c.links;
            return (
              <div key={c.title} className="border-b border-[#f6f1eb] last:border-b-0">
                <button aria-label={`Footer section ${c.title}`} aria-expanded={open} className="font-mono-d flex w-full items-center justify-between py-4 text-left text-xs font-light uppercase tracking-normal" onClick={() => setOpenCol(open ? null : c.title)}>
                  {c.title}<span aria-hidden="true" className="text-base">{open ? "−" : "+"}</span>
                </button>
                {open && (
                  <div className="pb-4 leading-7">
                    {cols.map(([l, pg], i) => (
                      <span key={l}>{i > 0 && <span aria-hidden="true" className="mx-2 text-neutral-400">|</span>}<button aria-label={`Footer ${l}`} className="py-1 text-left text-[11px] leading-[18px] text-black" onClick={() => go({ t: "page", page: pg })}>{l}</button></span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="border-t border-[#f6f1eb] px-4 py-6">
          <p className="font-mono-d text-xs font-light uppercase tracking-normal">Newsletter</p>
          <p className="mt-4 text-[11px] leading-[18px] text-black">{settings.newsletterText || "Receive our newsletter and discover our stories, collections, and surprises."}</p>
          {newsletterForm(false)}
          <p className="font-mono-d mt-8 text-xs font-light uppercase tracking-normal">Follow us</p>
          <div className="mt-3"><SocialCircles /></div>
          <div className="relative mt-7 border-t border-[#f6f1eb] pt-5">
            <button aria-label="Ship to country selector" aria-expanded={shipOpen} className="flex items-center gap-2 text-xs text-neutral-700 uppercase tracking-wider" onClick={() => setShipOpen(!shipOpen)}>
              <span>Ship to : <span className="font-medium underline underline-offset-4">{ship}</span></span>
              {/* hermes.com shows only "SHIP TO : UNITED STATES" — "Change
                  your location" is the button's hidden label, not visible text. */}
              <span className="sr-only">Change your location</span>
            </button>
            {shipOpen && (
              <div className="absolute bottom-full left-0 z-50 mb-2 w-72 max-w-[85vw] border border-[#f6f1eb] bg-[#fffcf7] py-2" role="listbox" aria-label="Choose your location">
                {shipCountries.map((c) => (
                  <button key={c} role="option" aria-selected={ship === c} className={`block w-full px-4 py-2 text-left text-xs uppercase tracking-wider ${ship === c ? "font-semibold underline underline-offset-4" : "hover:underline"}`} onClick={() => { setShip(c); setShipOpen(false); }}>{c}</button>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-600">
            <p>{settings.copyrightText || "© Hermès 2026. All rights reserved."}</p>
          </div>
        </div>
      </div>
      {/* Desktop — five open columns on #f6f1eb, as verified on hermes.com */}
      <div className="hidden lg:block" style={{ background: "#f6f1eb" }}>
        <div className="grid max-w-[1585px] gap-12 px-6 py-16 lg:grid-cols-5">
          {FOOTER_COLS.map((c) => (
            <div key={c.title}>
              <p className="font-mono-d pb-2.5 text-xs font-light uppercase tracking-normal">{c.title}</p>
              {c.links.map(([l, pg]) => <button key={l} aria-label={`Footer ${l}`} className="block py-1 text-left text-[11px] leading-[18px] text-black hover:text-[#696969] hover:underline" onClick={() => { if (pg.startsWith("faq:")) go({ t: "faq", topic: pg.slice(4) }); else go({ t: "page", page: pg }); }}>{l}</button>)}
            </div>
          ))}
          <div>
            <p className="font-mono-d text-xs font-light uppercase tracking-normal">Newsletter</p>
            <p className="mt-4 text-[11px] leading-[18px] text-black">{settings.newsletterText || "Receive our newsletter and discover our stories, collections, and surprises."}</p>
            {newsletterForm(false)}
            <p className="font-mono-d mt-8 text-xs font-light uppercase tracking-normal">Follow us</p>
            <div className="mt-3"><SocialCircles /></div>
          </div>
        </div>
      </div>
      <div className="hidden border-t border-[#e2d8ce] lg:block" style={{ background: "#f6f1eb" }}>
        <div className="flex max-w-[1585px] flex-wrap items-center justify-between gap-3 px-6 py-4 text-xs text-neutral-600">
          <div className="relative">
            <button aria-label="Ship to country selector" aria-expanded={shipOpen} className="flex items-center gap-2 uppercase tracking-wider" onClick={() => setShipOpen(!shipOpen)}>
              <span>Ship to : <span className="font-medium underline underline-offset-4">{ship}</span></span>
              {/* hermes.com shows only "SHIP TO : UNITED STATES" — "Change
                  your location" is the button's hidden label, not visible text. */}
              <span className="sr-only">Change your location</span>
            </button>
            {shipOpen && (
              <div className="absolute bottom-full left-0 z-50 mb-2 w-72 border border-[#f6f1eb] bg-[#fffcf7] py-2" role="listbox" aria-label="Choose your location">
                {shipCountries.map((c) => (
                  <button key={c} role="option" aria-selected={ship === c} className={`block w-full px-4 py-2 text-left text-xs uppercase tracking-wider ${ship === c ? "font-semibold underline underline-offset-4" : "hover:underline"}`} onClick={() => { setShip(c); setShipOpen(false); }}>{c}</button>
                ))}
              </div>
            )}
          </div>
          <p>{settings.copyrightText || "© Hermès 2026. All rights reserved."}</p>
        </div>
      </div>
      {/* BOARD h) BELOW THE FOOTER — the lockup band: a large plain area in
          #fcf7f1 (the same pale cream as the service strip, sampled on
          hermes.com — NOT pure white) with the black HERMÈS PARIS lockup
          centred in it. Nothing follows it; this is the page bottom. */}
      <div className="flex justify-center py-[120px]" style={{ background: "#fcf7f1" }}>
        <HermesLogo settings={settings} variant="full" />
      </div>
    </footer>
    </>
  );
}

function AccountView({ user, setUser, go, mode }: { user: { name: string; email: string } | null; setUser: (u: { name: string; email: string } | null) => void; go: (v: View, opts?: { restore?: boolean }) => void; mode?: "login" | "signup" }) {
  // Which form shows first: "signup" when opened from the header "Sign up"
  // option, "login" otherwise. The visitor can switch inside the page.
  const [authMode, setAuthMode] = useState<"login" | "signup">(mode ?? "login");
  // Sign-in form.
  const [liEmail, setLiEmail] = useState(""); const [liPw, setLiPw] = useState(""); const [liMsg, setLiMsg] = useState(""); const [emailStep, setEmailStep] = useState(true);
  const [forgotMsg, setForgotMsg] = useState("");
  // Create-account form (Hermes create-account page layout).
  const [suTitle, setSuTitle] = useState(""); const [suFirst, setSuFirst] = useState(""); const [suLast, setSuLast] = useState("");
  const [suEmail, setSuEmail] = useState(""); const [suCode, setSuCode] = useState(""); const [suShowCode, setSuShowCode] = useState(false);
  const [suPw, setSuPw] = useState(""); const [suShowPw, setSuShowPw] = useState(false); const [suArea, setSuArea] = useState("US +1"); const [suPhone, setSuPhone] = useState(""); const [suDob, setSuDob] = useState(""); const [suMarketing, setSuMarketing] = useState(false);
  const [suMsg, setSuMsg] = useState(""); const [sentCode, setSentCode] = useState(""); const [codeWait, setCodeWait] = useState(0);
  const login = useMutation({ mutationFn: async () => {
    // Admin Gmail sign-in: the admin panel link was removed from this page
    // (user request 2026-11-13) — instead, signing in here with the admin
    // Gmail + admin password opens the Admin Panel directly.
    const admin = await api.adminData({ email: liEmail, password: liPw });
    if (admin.ok) return { ok: true, message: "Signed in.", name: "Admin", isAdmin: true };
    const u = await api.loginUser({ email: liEmail, password: liPw });
    return { ...u, isAdmin: false };
  }, onSuccess: (r) => { setLiMsg(r.message); if (r.ok) { if (r.isAdmin) { save("hlx-admin-auth", { email: liEmail, password: liPw }); go({ t: "admin" }); } else setUser({ name: r.name, email: liEmail }); } } });
  const reg = useMutation({ mutationFn: () => api.registerUser({ name: `${suFirst} ${suLast}`.trim(), email: suEmail, password: suPw }), onSuccess: (r) => { setSuMsg(r.message); if (r.ok) { const digits = suPhone.replace(/\D/g, "").replace(/^1/, ""); const areaDigits = suArea.match(/\+\d+/)?.[0] ?? "+1"; const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; const dobParts = suDob.split("-"); const dobDisplay = dobParts.length === 3 ? `${monthNames[Number(dobParts[1]) - 1] ?? ""} ${Number(dobParts[2])}, ${dobParts[0]}` : ""; save("hlx-profile", { title: suTitle, phone: `${areaDigits} ${digits}`, dob: dobDisplay }); const newUser = { name: `${suFirst} ${suLast}`.trim(), email: suEmail }; save("hlx-user", newUser); setUser(newUser); go({ t: "home" }); } } });
  const ordersQ = useQuery({ queryKey: ["myorders", user?.email], queryFn: () => api.myOrders({ email: user?.email ?? "" }), enabled: !!user });
  // Signed-in account tabs (§D addendum): exactly five, in this order.
  const [acctTab, setAcctTab] = useState<"orders" | "profile" | "addresses" | "payments" | "reservations">("orders");
  const [acctNote, setAcctNote] = useState("");
  // Countdown for the SEND CODE button. This hook MUST live here, before the
  // `if (user)` early return below — a hook after that return breaks the
  // Rules of Hooks and blanks the whole page whenever the user signs in,
  // signs up or signs out (found 2026-11-13).
  useEffect(() => {
    if (codeWait <= 0) return;
    const t = window.setTimeout(() => setCodeWait((v) => v - 1), 1000);
    return () => window.clearTimeout(t);
  }, [codeWait]);
  if (user) {
    // Phone / date of birth entered at sign-up (saved locally on
    // registration — the clone's account record holds name + email only).
    const savedProfile = load<{ title?: string; phone?: string; dob?: string }>("hlx-profile", {});
    const savedAddresses = [...new Set((ordersQ.data?.orders ?? []).map((o) => o.address).filter(Boolean))];
    const tabs: { key: typeof acctTab; label: string }[] = [
      { key: "orders", label: "Order history" },
      { key: "profile", label: "Profile information" },
      { key: "addresses", label: "Address book" },
      { key: "payments", label: "Payments" },
      { key: "reservations", label: "E-reservations" },
    ];
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="font-mono-d text-xs font-medium uppercase tracking-normal">Account</h1>
        <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Account">
            <ul className="space-y-1">
              {tabs.map((t) => (
                <li key={t.key}>
                  <button aria-label={`Account ${t.label}`} aria-current={acctTab === t.key || undefined} className={`w-full px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.22em] ${acctTab === t.key ? "bg-black text-white" : "hover:bg-black/5"}`} onClick={() => { setAcctTab(t.key); setAcctNote(""); }}>{t.label}</button>
                </li>
              ))}
            </ul>
            <button aria-label="Sign out" className="mt-6 border border-black px-8 py-3 text-[11px] uppercase tracking-[0.25em]" onClick={() => { setUser(null); save("hlx-user", null); setAuthMode("login"); setEmailStep(true); setLiPw(""); setLiMsg(""); go({ t: "account", mode: "login" }); }}>Sign out</button>
          </nav>
          <div>
            {acctTab === "orders" && (
              <>
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.25em]">Order history</h2>
                {(ordersQ.data?.orders.length ?? 0) === 0 ? (
                  <>
                    <p className="mt-4 text-sm text-neutral-700">Nothing&apos;s tickled your fancy yet?</p>
                    <button aria-label="Continue shopping from account" className="mt-6 bg-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => go({ t: "home" })}>Continue shopping</button>
                  </>
                ) : (
                  ordersQ.data?.orders.map((o) => {
                    let items: { name: string; qty: number; price: number }[] = [];
                    try { items = JSON.parse(o.items) as typeof items; } catch { items = []; }
                    return (
                      <div key={o.id} className="mt-3 border border-black/10 bg-[#fffcf7] p-4">
                        <p className="text-sm font-medium">Order #{o.id} — {fmt(o.total)} — <span className="uppercase tracking-wider">{o.status}</span></p>
                        <p className="text-xs text-neutral-500">{new Date(o.createdAt).toLocaleString()}</p>
                        {items.map((it, i) => <p key={i} className="mt-1 text-sm text-neutral-700">{it.qty} × {it.name} — {fmt(it.price * it.qty)}</p>)}
                      </div>
                    );
                  })
                )}
              </>
            )}
            {acctTab === "profile" && (
              <>
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-[13px] font-semibold uppercase tracking-[0.25em]">Profile information</h2>
                  <button aria-label="Edit profile information" className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] underline" onClick={() => setAcctNote("Profile editing is not available — please contact customer service to update your details.")}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" /></svg>
                    Edit
                  </button>
                </div>
                <dl className="mt-6 space-y-4 text-sm">
                  <div><dt className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Name</dt><dd className="mt-1">{savedProfile.title ? `${savedProfile.title}. ${user.name}` : user.name}</dd></div>
                  <div><dt className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">E-mail</dt><dd className="mt-1">{user.email}</dd></div>
                  <div><dt className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Telephone number</dt><dd className="mt-1">{savedProfile.phone || ""}</dd></div>
                  <div><dt className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Date of birth</dt><dd className="mt-1">{savedProfile.dob || ""}</dd></div>
                  <div><dt className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Password</dt><dd className="mt-1">*********</dd></div>
                </dl>
                <p className="mt-6 text-sm text-neutral-700">You are not subscribed to the Hermès newsletter.</p>
                {acctNote && <p className="mt-4 text-sm text-neutral-600" role="status">{acctNote}</p>}
              </>
            )}
            {acctTab === "addresses" && (
              <>
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.25em]">Address book</h2>
                {savedAddresses.length === 0 ? (
                  <p className="mt-4 text-sm text-neutral-700">There is no address saved yet.</p>
                ) : (
                  savedAddresses.map((a, i) => <p key={i} className="mt-4 text-sm text-neutral-700">{a}</p>)
                )}
                <button aria-label="Add an address" className="mt-6 bg-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => setAcctNote("Add an address at checkout — your delivery address will be saved here.")}>Add an address</button>
                {acctNote && <p className="mt-4 text-sm text-neutral-600" role="status">{acctNote}</p>}
              </>
            )}
            {acctTab === "payments" && (
              <>
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.25em]">Payments</h2>
                <p className="mt-4 text-sm text-neutral-700">You did not store card information.</p>
              </>
            )}
            {acctTab === "reservations" && (
              <>
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.25em]">E-reservations</h2>
                <p className="mt-4 text-sm text-neutral-700">You do not have e-reservations in your account.</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
  // Password criteria for the create-account form (live-checked).
  const crit = {
    len: suPw.length >= 10,
    upper: /[A-Z]/.test(suPw),
    lower: /[a-z]/.test(suPw),
    digit: /[0-9]/.test(suPw),
    special: /[^A-Za-z0-9]/.test(suPw),
  };
  const critOk = crit.len && crit.upper && crit.lower && crit.digit && crit.special;
  // SEND CODE is a demo in this standalone build: there is no email service,
  // so the code is generated here and shown to the visitor to enter below.
  const sendCode = () => {
    if (!suEmail.includes("@")) { setSuMsg("Please enter a valid email address first."); return; }
    setSentCode(String(Math.floor(100000 + Math.random() * 900000)));
    setCodeWait(60);
    setSuMsg("");
  };
  const submitSignup = () => {
    if (!suEmail.includes("@")) return setSuMsg("Please enter a valid email address.");
    // Already registered? Tell the visitor right away instead of letting
    // them fill the whole form — they should sign in, not sign up again.
    const existingUsers = load<{ email?: string }[]>("hv-users", []);
    if (existingUsers.some((u) => (u.email ?? "").toLowerCase() === suEmail.trim().toLowerCase())) return setSuMsg("An account with this email already exists. Please sign in.");
    if (!sentCode) return setSuMsg("Please press SEND CODE first — a code will be shown for you to enter.");
    if (suCode.trim() !== sentCode) return setSuMsg("The verification code does not match the code shown above.");
    if (!critOk) return setSuMsg("Please choose a password that meets all the criteria below.");
    if (!suTitle) return setSuMsg("Please choose a title.");
    if (!suFirst.trim() || !suLast.trim()) return setSuMsg("Please enter your first and last name.");
    const digits = suPhone.replace(/\D/g, "").replace(/^1/, "");
    if (!/^\d{10}$/.test(digits)) return setSuMsg("Please enter a 10-digit telephone number.");
    // Date of birth comes from the calendar picker (YYYY-MM-DD), so it is
    // always complete — month, day and year together. Age is checked by
    // calendar: the visitor is 18+ when their 18th birthday is today or earlier.
    const dobParts = suDob.split("-");
    const dobDate = dobParts.length === 3 ? new Date(Number(dobParts[0]), Number(dobParts[1]) - 1, Number(dobParts[2])) : null;
    const dobValid = !!dobDate && dobDate.getFullYear() === Number(dobParts[0]) && dobDate.getMonth() === Number(dobParts[1]) - 1 && dobDate.getDate() === Number(dobParts[2]);
    if (!dobValid) return setSuMsg("Please enter your complete date of birth.");
    const today = new Date(); const eighteenth = new Date(dobDate.getFullYear() + 18, dobDate.getMonth(), dobDate.getDate());
    if (eighteenth > today) return setSuMsg("Please enter a valid date of birth to confirm that you are at least 18 years of age.");
    setSuMsg("");
    reg.mutate();
  };
  const underline = "mt-1 w-full border-0 border-b border-black/40 bg-transparent px-0 py-2.5 text-[15px] text-black outline-none focus:border-black";
  const lab = "block text-left text-[13px] text-neutral-500";
  const hint = "mt-1 block text-xs text-neutral-500";
  if (authMode === "login") {
    return (
      <div className="mx-4 my-10 max-w-md bg-[#fffcf7] px-6 py-10 sm:mx-auto sm:px-8">
        <h1 className="font-mono-d text-center text-xs font-medium uppercase tracking-normal">Account</h1>
        <p className="mt-4 text-center text-sm leading-6 text-neutral-700">Please enter your email below to access or create your account</p>
        <p className="mt-2 text-center text-sm leading-6 text-neutral-700">Please insert your email to receive your order confirmation. If you have already registered with us, your password will be requested.</p>
        <div className="mt-6 space-y-4">
          <label className={lab}>E-mail *
            <input aria-label="Sign in email" type="email" className={underline} value={liEmail} disabled={!emailStep} onChange={(e) => setLiEmail(e.target.value)} />
            <span className={hint}>Expected format: yourname@domain.com</span>
          </label>
          {!emailStep && (
            <>
              <button aria-label="Use a different email" className="block text-xs uppercase tracking-[0.2em] underline" onClick={() => { setEmailStep(true); setLiPw(""); setLiMsg(""); }}>Use a different email</button>
              <label className={lab}>Password *
                <input aria-label="Sign in password" type="password" className={underline} value={liPw} onChange={(e) => setLiPw(e.target.value)} />
              </label>
            </>
          )}
        </div>
        {liMsg && <p className="mt-3 text-sm text-red-700" role="status">{liMsg}</p>}
        {emailStep ? (
          <button aria-label="Continue with email" className="font-mono-d mt-5 flex h-12 w-full items-center justify-center bg-black text-xs font-medium uppercase tracking-normal text-white" onClick={() => { if (!liEmail.includes("@")) { setLiMsg("Please enter a valid email address."); return; } setLiMsg(""); setEmailStep(false); }}>Continue</button>
        ) : (
          <button aria-label="Sign in button" className="font-mono-d mt-5 flex h-12 w-full items-center justify-center bg-black text-xs font-medium uppercase tracking-normal text-white" onClick={() => login.mutate()}>Sign in</button>
        )}
        <button aria-label="Forgot password" className="mt-4 w-full text-center text-xs uppercase tracking-[0.2em] underline" onClick={() => setForgotMsg("This standalone build has no email service, so password reset is unavailable — please create a new account or contact customer service.")}>Forgot your password?</button>
        {forgotMsg && <p className="mt-3 text-center text-xs leading-5 text-neutral-600" role="status">{forgotMsg}</p>}
        <p className="mt-6 text-center text-sm text-neutral-700">New here? <button aria-label="Go to create account" className="underline" onClick={() => { setAuthMode("signup"); setLiMsg(""); setEmailStep(true); setSuEmail(liEmail); }}>Create an account</button></p>
      </div>
    );
  }
  // Create account — laid out like hermes.com/us/en/account/create/:
  // intro + "* Required information", then two columns (Login information |
  // Personal information), then the create button.
  return (
    <div className="mx-4 my-10 max-w-4xl bg-[#fffcf7] px-6 py-10 sm:mx-auto sm:px-8">
      <h1 className="font-mono-d mb-6 text-center text-xs font-medium uppercase tracking-normal">Create an account</h1>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-neutral-700">By creating an account, you agree to accept the <button aria-label="General Terms and Conditions of Use" className="underline" onClick={() => go({ t: "page", page: "terms" })}>General Terms and Conditions of Use</button> and that your data will be processed in compliance with the <button aria-label="Privacy Policy" className="underline" onClick={() => go({ t: "page", page: "privacy" })}>Privacy Policy</button> of Hermès.</p>
        <p className="shrink-0 text-xs text-neutral-500">* Required information</p>
      </div>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.25em]">Login information</h2>
          <label className={`${lab} mt-5`}>E-mail *
            <span className="mt-1 flex items-end gap-3">
              <input aria-label="Create account email" type="email" className={`${underline} min-w-0 flex-1`} value={suEmail} onChange={(e) => setSuEmail(e.target.value)} />
              <button aria-label="Send verification code" type="button" disabled={codeWait > 0} className="shrink-0 bg-black px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-50" onClick={sendCode}>Send code</button>
            </span>
            {sentCode && <span className="mt-1 block text-xs text-neutral-500">{codeWait} SECONDS REMAINING BEFORE YOU CAN REQUEST A NEW CODE</span>}
            <span className={hint}>Expected format: yourname@domain.com</span>
          </label>
          {sentCode && <p className="mt-3 border border-black/15 bg-[#f6f1eb] px-3 py-2 text-xs leading-5 text-neutral-800" role="status">Your code is <strong>{sentCode}</strong>; enter it in Verification code below.</p>}
          <label className={`${lab} mt-5`}>Verification code *
            <input aria-label="Verification code" type={suShowCode ? "text" : "password"} inputMode="numeric" className={underline} value={suCode} onChange={(e) => setSuCode(e.target.value)} disabled={!sentCode} />
            <span className={hint}>Expected format: 123456</span>
          </label>
          <button aria-label={suShowCode ? "Hide verification code" : "Show verification code"} type="button" className="mt-1 block w-full text-right text-xs uppercase tracking-[0.15em] underline" onClick={() => setSuShowCode(!suShowCode)}>{suShowCode ? "Hide" : "Show"}</button>
          <label className={`${lab} mt-5`}>Password *
            <input aria-label="Create account password" type={suShowPw ? "text" : "password"} className={underline} value={suPw} onChange={(e) => setSuPw(e.target.value)} />
          </label>
          <button aria-label={suShowPw ? "Hide password" : "Show password"} type="button" className="mt-1 block w-full text-right text-xs uppercase tracking-[0.15em] underline" onClick={() => setSuShowPw(!suShowPw)}>{suShowPw ? "Hide" : "Show"}</button>
          <div className="mt-3 bg-[#f6f1eb] px-4 py-3">
            <p className="text-xs leading-5 text-neutral-700">For your security, we invite you to fill your password according to the following criteria:</p>
            <ul className="mt-2 space-y-1 text-xs text-neutral-700">
              <li><span className={crit.len ? "font-bold text-green-700" : "text-neutral-400"}>{crit.len ? "✓" : "•"}</span> At least 10 characters</li>
              <li><span className={crit.upper ? "font-bold text-green-700" : "text-neutral-400"}>{crit.upper ? "✓" : "•"}</span> At least 1 uppercase letter</li>
              <li><span className={crit.lower ? "font-bold text-green-700" : "text-neutral-400"}>{crit.lower ? "✓" : "•"}</span> At least 1 lowercase letter</li>
              <li><span className={crit.digit ? "font-bold text-green-700" : "text-neutral-400"}>{crit.digit ? "✓" : "•"}</span> At least 1 number</li>
              <li><span className={crit.special ? "font-bold text-green-700" : "text-neutral-400"}>{crit.special ? "✓" : "•"}</span> At least 1 special character</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.25em]">Personal information</h2>
          <label className={`${lab} mt-5`}>Title *
            <select aria-label="Title" className={underline} value={suTitle} onChange={(e) => setSuTitle(e.target.value)}>
              <option value="">Select</option><option value="Mr">Mr</option><option value="Mrs">Mrs</option><option value="Miss">Miss</option><option value="Ms">Ms</option><option value="Dr">Dr</option>
            </select>
          </label>
          <label className={`${lab} mt-5`}>First name *
            <input aria-label="First name" type="text" className={underline} value={suFirst} onChange={(e) => setSuFirst(e.target.value)} />
          </label>
          <label className={`${lab} mt-5`}>Last name *
            <input aria-label="Last name" type="text" className={underline} value={suLast} onChange={(e) => setSuLast(e.target.value)} />
          </label>
          <div className="mt-5 flex items-end gap-3">
            <label className={`${lab} w-32 shrink-0`}>Area code *
              <select aria-label="Area code" className={underline} value={suArea} onChange={(e) => setSuArea(e.target.value)}>
                <option value="US +1">🇺🇸 US +1</option>
              </select>
            </label>
            <label className={`${lab} min-w-0 flex-1`}>Telephone number *
              <input aria-label="Telephone number" type="tel" className={underline} value={suPhone} onChange={(e) => setSuPhone(e.target.value)} />
              <span className={hint}>Expected format: phone number with 10 digits</span>
              <span className={hint}>Minimum 10 numbers</span>
              <span className={hint}>Numbers only</span>
            </label>
          </div>
          <div className="mt-5">
            <label className={lab}>Date of birth *
              <input aria-label="Date of birth" type="date" className={underline} value={suDob} onChange={(e) => setSuDob(e.target.value)} />
              <span className={hint}>Choose your date of birth from the calendar — you must be at least 18 years of age</span>
            </label>
          </div>
        </div>
      </div>
      <label className="mt-8 flex cursor-pointer items-start gap-2.5 text-sm leading-6 text-neutral-700">
        <input type="checkbox" aria-label="Receive marketing information from Hermès" checked={suMarketing} onChange={(e) => setSuMarketing(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-black" />
        <span>I agree to receive information about offers, services, products and events from Hermès Sellier and other Hermès group companies via phone, email, instant messaging, and mail, in accordance with the Privacy Policy. I can update my communication preferences anytime through my customer account and opt out of commercial email messages by clicking the &ldquo;Unsubscribe&rdquo; link located at the bottom of each email.</span>
      </label>
      {suMsg && <p className="mt-6 text-sm text-red-700" role="status">{suMsg}</p>}
      <button aria-label="Create an account" className="mt-8 w-full bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white sm:mx-auto sm:block sm:w-80" onClick={submitSignup}>Create an account</button>
      <p className="mt-6 text-center text-sm text-neutral-700">Already have an account? <button aria-label="Go to sign in" className="underline" onClick={() => { setAuthMode("login"); setSuMsg(""); setEmailStep(true); }}>Sign in</button></p>
    </div>
  );

}

const US_STATES = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
const CO_HEAD = "font-mono-d text-xs font-medium uppercase tracking-normal";
// Orange Box heading on the original: Overpass Mono 16px/24px/300
// (cart shell CSS .orange-box-title), not the 12px/500 section head.
const CO_HEAD_LG = "font-mono-d text-base font-light uppercase tracking-normal";
// Legal footer links (cart / checkout / account footers): the original
// lists General Terms and Conditions of Sale + of Use first, verbatim
// from the served cart HTML. Admin-editable via settings.legalLinksJson.
const DEFAULT_LEGAL_LINKS: [string, string][] = [["General Terms and Conditions of Sale", "terms"], ["General Terms and Conditions of Use", "terms"], ["Terms and conditions", "terms"], ["Privacy & cookies", "privacy"], ["Legal issues", "legal"], ["Accessibility", "accessibility"], ["Site map", "sitemap"]];
function parseLegalLinks(s: Settings): [string, string][] {
  try { const v = JSON.parse(s.legalLinksJson || "") as unknown; if (Array.isArray(v) && v.length) return v as [string, string][]; } catch { /* fall through */ }
  return DEFAULT_LEGAL_LINKS;
}

function CheckoutProgress({ step, nextStep }: { step: 1 | 2 | 3; nextStep?: boolean }) {
  const labels = ["Cart", "Checkout", "Confirmation"];
  return (
    <div className="px-2 pb-[15px] pt-6 lg:pb-6 lg:pt-8" aria-label="Checkout progress">
      <div className="relative mx-6">
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#919191]" aria-hidden="true" />
        <span className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-black" style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }} aria-hidden="true" />
        <div className="relative flex justify-between">
          {labels.map((l, i) => {
            const n = i + 1;
            const done = n < step;
            const current = n === step;
            return (
              <span key={l} className="flex w-20 flex-col items-center gap-2">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] ${done || current ? "bg-black text-white" : "border border-black/50 bg-[#fcf7f1] text-transparent"}`}>{done ? "✓" : "•"}</span>
                <span className={`font-mono-d text-[10px] font-medium uppercase tracking-normal ${current || done ? "text-black" : "text-neutral-500"}`}>{l}</span>
                {nextStep && !done && !current && <span className="text-[8px] uppercase tracking-[0.18em] text-neutral-400">Next step</span>}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CheckoutView({ cart, setCart, user, go, total, settings, products }: { cart: CartItem[]; setCart: (c: CartItem[]) => void; user: { name: string; email: string } | null; go: (v: View, opts?: { restore?: boolean }) => void; total: number; settings: Settings; products: Product[] }) {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [email, setEmail] = useState(user?.email ?? "");
  const [accountEdit, setAccountEdit] = useState(!user);
  const [agree, setAgree] = useState(true);
  const [termsAgree, setTermsAgree] = useState(false);
  const [bankAgree, setBankAgree] = useState(false);
  const [termsErr, setTermsErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [tab, setTab] = useState<"ship" | "collect">("ship");
  const [f, setF] = useState({ location: "United States", title: "", first: user?.name.split(" ")[0] ?? "", last: user?.name.split(" ").slice(1).join(" ") ?? "", company: "", address: "", address2: "", city: "", state: "", zip: "", zipPlus: "", area: "US +1", phone: "" });
  const [attempted, setAttempted] = useState(false);
  const [deliverySaved, setDeliverySaved] = useState(false);
  const [storeQuery, setStoreQuery] = useState("");
  const [storeErr, setStoreErr] = useState("");
  const [storePicked, setStorePicked] = useState("");
  const [pay, setPay] = useState("Visa");
  const [placed, setPlaced] = useState(0);
  const [placedTotal, setPlacedTotal] = useState(0);
  const mountCartCount = useRef(cart.length);
  useEffect(() => { if (mountCartCount.current === 0) go({ t: "cart" }); }, []);
  // Payment methods are admin-editable (Theme & Settings); the default
  // list is the original's US methods, in the original's order.
  const payMethods = settings.paymentMethods ? settings.paymentMethods.split(",").map((m) => m.trim()).filter(Boolean) : ["MasterCard", "Visa", "American Express", "Diners Club", "Carte Blanche", "JCB", "Discover", "Accel", "Pulse", "Nyce", "Star", "China Union Pay", "PayPal", "Apple Pay"];
  const order = useMutation({
    mutationFn: () => api.placeOrder({ customerName: `${f.first} ${f.last}`.trim() || (user?.name ?? "Customer"), email, address: tab === "collect" ? `Collect in store — ${storePicked}` : `${f.address}${f.address2 ? ", " + f.address2 : ""}, ${f.city}, ${f.state} ${f.zip}`, paymentMethod: pay, deliveryOption: tab === "collect" ? "Collect in store" : "Ship to an address", items: cart.map((i) => ({ productId: i.productId, name: i.name, price: i.price, qty: i.qty, color: i.color, size: i.size })) }),
    onSuccess: (r) => { setPlacedTotal(total); setPlaced(r.orderId); setCart([]); window.scrollTo({ top: 0 }); },
  });
  const req = (v: string) => attempted && !v.trim();
  const phoneDigits = f.phone.replace(/\D/g, "").replace(/^1/, "");
  const phoneBad = attempted && !/^\d{10}$/.test(phoneDigits);
  const fieldErr = (bad: boolean) => bad ? <p className="mt-1 text-xs text-[#b3261e]">Required information</p> : null;
  const underline = "w-full border-0 border-b border-black/40 bg-transparent px-0 py-2 text-[15px] outline-none focus:border-black";
  const labelCls = "block text-[13px] text-neutral-500";
  const footerLinks: [string, string][] = parseLegalLinks(settings);

  const shell = (children: React.ReactNode, step: 1 | 2 | 3) => (
    <div className="min-h-screen" style={{ background: "#fcf7f1" }}>
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-4 sm:px-6">
        <div className="relative flex items-start">
          <button aria-label={step === 3 ? "Back to store from confirmation" : "Back to cart from checkout"} className="flex h-10 items-center justify-center gap-1 text-sm" onClick={() => go(step === 3 ? { t: "home" } : { t: "cart" })}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20 12H4m0 0 6-6M4 12l6 6" /></svg><span className="hidden lg:inline">Back</span>
          </button>
          <span className="absolute left-1/2 top-1 -translate-x-1/2"><HermesLogo settings={settings} variant="compact" /></span>
          <span className="w-10" />
        </div>
        <CheckoutProgress step={step} />
        {children}
      </div>
    </div>
  );

  if (placed) return shell(
    <div className="mt-8 bg-[#fffcf7] px-5 py-10 text-center sm:px-8">
      <p className="font-serif-d text-4xl italic">Merci</p>
      <h1 className="font-serif-d mt-3 text-3xl italic">Thank you — order #{placed} confirmed</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-700">Total: {fmt2(placedTotal)}. A confirmation will be sent to {email}. Your order will be delivered in the orange box tied with Bolduc ribbon.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button aria-label="View my orders after checkout" className="bg-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => go({ t: "account" })}>My Orders</button>
        <button aria-label="Track order after checkout" className="border border-black px-8 py-3 text-[11px] uppercase tracking-[0.25em]" onClick={() => go({ t: "page", page: "track" })}>Track order</button>
        <button aria-label="Continue shopping after order" className="border border-black px-8 py-3 text-[11px] uppercase tracking-[0.25em]" onClick={() => go({ t: "home" })}>Continue shopping</button>
      </div>
    </div>, 3);

  if (cart.length === 0) return shell(
    <div className="mt-8 bg-[#fffcf7] px-5 py-16 text-center">
      <h1 className="font-serif-d text-3xl italic">Your cart is empty</h1>
      <button aria-label="Shop from empty checkout" className="mt-6 border border-black px-10 py-3 text-[11px] font-semibold uppercase tracking-[0.25em]" onClick={() => go({ t: "home" })}>Discover the collections</button>
    </div>, 2);

  return shell(
    <div className="mt-6 space-y-4">
      {/* SUMMARY */}
      <section className="bg-[#fffcf7] px-4 lg:px-6" aria-label="Order summary section">
        <button aria-label="Checkout summary" aria-expanded={summaryOpen} className="flex min-h-[56px] w-full items-center border-b border-[#f6f1eb] text-left" onClick={() => setSummaryOpen(!summaryOpen)}>
          <span className={CO_HEAD}>Summary</span>
          <span className="ml-6 text-[15px] text-neutral-600">{fmt2(total)}</span>
          <span className="ml-auto text-lg" aria-hidden="true">{summaryOpen ? "⌃" : "⌄"}</span>
        </button>
        {summaryOpen && (
          <div className="pb-5">
            {cart.map((i) => (
              <div key={i.key} className="flex items-center gap-3 border-t border-[#f6f1eb] py-3">
                <span className="h-14 w-14 shrink-0 overflow-hidden" aria-hidden="true"><img src={cartImageFor(products, i.productId, i.name, i.price)} alt="" className="h-full w-full object-cover" /></span>
                <span className="min-w-0 flex-1 text-sm">{i.name}<span className="block text-xs text-neutral-500">{i.color}{i.size ? ` · ${i.size}` : ""} · Qty {i.qty}</span></span>
                <span className="text-sm">{fmt2(i.price * i.qty)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-[#f6f1eb] pt-3 text-sm"><span>Shipping</span><span className="text-xs text-neutral-500">Calculated at delivery step</span></div>
            <div className="mt-1 flex justify-between text-sm font-medium"><span>Total</span><span>{fmt2(total)}</span></div>
          </div>
        )}
      </section>

      {/* ACCOUNT */}
      <section className="bg-[#fffcf7] px-4 pb-5 pt-0 lg:px-6" aria-label="Account section">
        <div className="flex min-h-[56px] items-center justify-between border-b border-[#f6f1eb]">
          <h2 className={CO_HEAD}>Account</h2>
          {!accountEdit && (
            <button aria-label="Edit account email" className="flex h-10 w-10 items-center justify-center rounded-full" onClick={() => setAccountEdit(true)}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4.2 1.2L5 16 16.5 4.5Z" /></svg>
            </button>
          )}
        </div>
        {!accountEdit ? (
          <p className="mt-4 text-[15px]">{email}</p>
        ) : (
          <div className="mt-4">
            <p className="text-sm leading-6 text-neutral-800">This email address will be associated with the account being created for you, and where you will receive your order confirmation.</p>
            <label className="mt-5 block">
              <span className="text-[13px] text-neutral-500">E-mail *</span>
              <input aria-label="Checkout email" type="email" className="mt-1 w-full px-3 py-3 text-[15px] outline-none" value={email} onChange={(e) => { setEmail(e.target.value); setEmailErr(""); }} />
            </label>
            {emailErr && <p className="mt-1 text-xs text-[#b3261e]" role="status">{emailErr}</p>}
            <label className="mt-4 flex cursor-pointer items-start gap-3 p-4 text-sm leading-6 text-neutral-800">
              <input type="checkbox" aria-label="Agree to receive information about offers" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-black" />
              <span>I agree to receive information about offers, services, products and events from <span className="underline">Hermès Seller</span> and other <span className="underline">Hermès group companies</span> via phone, email, instant messaging, and mail, in accordance with the <button type="button" aria-label="Privacy Policy from account consent" className="underline" onClick={() => go({ t: "page", page: "privacy" })}>Privacy Policy</button>.</span>
            </label>
            <p className="mt-3 text-[13px] leading-5 text-neutral-400">I can update my communication preferences anytime through my customer account and opt out of commercial email messages by clicking the &quot;Unsubscribe&quot; link located at the bottom of each email.</p>
            <button aria-label="Use another email address" className="mt-3 text-sm underline underline-offset-4" onClick={() => { setEmail(""); setEmailErr(""); }}>Use another email address</button>
            <p className="mt-5 text-[13px] leading-5 text-neutral-600">By clicking on &quot;Continue&quot;, you agree that your information will be processed by Hermès International, Hermès Seller and their service providers, in accordance with the <button type="button" aria-label="Privacy Policy from continue text" className="underline" onClick={() => go({ t: "page", page: "privacy" })}>Privacy Policy</button>.</p>
            <button aria-label="Continue from account step" className="mt-4 w-full bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => { if (!email.includes("@")) { setEmailErr("Please enter a valid email address."); return; } setAccountEdit(false); }}>Continue</button>
            <div className="mt-6 space-y-2 border-t border-[#f6f1eb] pt-4 text-[13px] text-neutral-600">
              {footerLinks.map(([l, pg]) => <button key={l} aria-label={`Account footer ${l}`} className="block hover:underline" onClick={() => go({ t: "page", page: pg })}>{l}</button>)}
              <p className="pt-1">{settings.copyrightText || "© Hermès 2026. All rights reserved."}</p>
            </div>
          </div>
        )}
      </section>

      {/* DELIVERY */}
      <section className="bg-[#fffcf7] px-4 pb-5 pt-0 lg:px-6" aria-label="Delivery section">
        <div className="flex min-h-[56px] items-center border-b border-[#f6f1eb]"><h2 className={CO_HEAD}>Delivery</h2></div>
        <div className="mt-4 grid grid-cols-2" role="tablist" aria-label="Delivery method">
          <button role="tab" aria-selected={tab === "ship"} aria-label="Ship to an address" className={`flex flex-col items-center gap-1.5 border-b-2 px-2 pb-3 pt-1 text-center text-[15px] ${tab === "ship" ? "border-black text-black" : "border-black/15 text-neutral-400"}`} onClick={() => { setTab("ship"); setDeliverySaved(false); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M2.5 6h12v10h-12zM14.5 9.5h3.6l3 3.4v3.1h-6.6" /><circle cx="6.5" cy="17.8" r="1.9" /><circle cx="17.3" cy="17.8" r="1.9" /></svg>
            Ship to an<br />address
          </button>
          <button role="tab" aria-selected={tab === "collect"} aria-label="Collect in store" className={`flex flex-col items-center gap-1.5 border-b-2 px-2 pb-3 pt-1 text-center text-[15px] ${tab === "collect" ? "border-black text-black" : "border-black/15 text-neutral-400"}`} onClick={() => { setTab("collect"); setDeliverySaved(false); setStorePicked(""); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 9.5 5.5 4h13L20 9.5a2.8 2.8 0 0 1-5.5.5 2.9 2.9 0 0 1-5 0 2.8 2.8 0 0 1-5.5-.5Z" /><path d="M5.5 12.5V20h13v-7.5M9.5 20v-4.5h5V20" /></svg>
            Collect in store
          </button>
        </div>
        {tab === "ship" ? (
          <div className="pt-5">
            <h3 className="text-[17px] font-bold">Shipping address</h3>
            <p className="mt-3 text-right text-[13px]">* Required information</p>
            <div className="mt-2 space-y-6">
              <label className={labelCls}>Location *
                <span className="relative block">
                  <select aria-label="Location" className={`${underline} appearance-none pr-8`} value={f.location} onChange={(e) => setF({ ...f, location: e.target.value })}>
                    {["United States"].map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2" aria-hidden="true">⌄</span>
                </span>
              </label>
              <label className={labelCls}>Title *
                <span className="relative block">
                  <select aria-label="Title" className={`${underline} appearance-none pr-8`} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })}>
                    <option value=""> </option>{["Mr", "Mrs", "Miss", "Ms", "Dr"].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2" aria-hidden="true">⌄</span>
                </span>
                {fieldErr(req(f.title))}
              </label>
              <label className={labelCls}>First name *
                <input aria-label="First name" className={underline} value={f.first} onChange={(e) => setF({ ...f, first: e.target.value })} />
                {fieldErr(req(f.first))}
              </label>
              <label className={labelCls}>Last name *
                <input aria-label="Last name" className={underline} value={f.last} onChange={(e) => setF({ ...f, last: e.target.value })} />
                {fieldErr(req(f.last))}
              </label>
              <label className={labelCls}>Company (optional)
                <input aria-label="Company" className={underline} value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} />
              </label>
              <div>
                <label className={labelCls}>Address *
                  <input aria-label="Address" className={underline} value={f.address} onChange={(e) => setF({ ...f, address: e.target.value })} />
                </label>
                {fieldErr(req(f.address))}
              </div>
              <label className={labelCls}>Address continued
                <input aria-label="Address continued" className={underline} value={f.address2} onChange={(e) => setF({ ...f, address2: e.target.value })} />
              </label>
              <label className={labelCls}>City *
                <input aria-label="City" className={underline} value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} />
                {fieldErr(req(f.city))}
              </label>
              <label className={labelCls}>State *
                <span className="relative block">
                  <select aria-label="State" className={`${underline} appearance-none pr-10`} value={f.state} onChange={(e) => setF({ ...f, state: e.target.value })}>
                    <option value=""> </option>{US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {f.state ? (
                    <button type="button" aria-label="Clear state" className="absolute right-6 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-sm" onClick={(e) => { e.preventDefault(); setF({ ...f, state: "" }); }}>✕</button>
                  ) : null}
                  <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2" aria-hidden="true">⌄</span>
                </span>
                {fieldErr(req(f.state))}
              </label>
              <label className={labelCls}>Zip code *
                <input aria-label="Zip code" inputMode="numeric" className={underline} value={f.zip} onChange={(e) => setF({ ...f, zip: e.target.value })} />
                {fieldErr(req(f.zip))}
                <span className="mt-1 block text-xs font-normal text-neutral-600">Expected format: enter a valid postal code for your country</span>
              </label>
              <label className={labelCls}>Zip +
                <input aria-label="Zip plus" inputMode="numeric" className={underline} value={f.zipPlus} onChange={(e) => setF({ ...f, zipPlus: e.target.value })} />
              </label>
              <div className="grid grid-cols-[1fr_1.2fr] gap-4">
                <label className={labelCls}>Area code *
                  <select aria-label="Area code" className={`${underline} appearance-none`} value={f.area} onChange={(e) => setF({ ...f, area: e.target.value })}>
                    <option value="US +1">🇺🇸 US +1</option>
                  </select>
                </label>
                <label className={labelCls}>Telephone number *
                  <input aria-label="Telephone number" inputMode="tel" className={underline} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
                </label>
              </div>
              <div>
                {fieldErr(phoneBad)}
                <p className="text-xs text-neutral-600">Expected format: phone number with 10 digits</p>
              </div>
            </div>
            <button aria-label="Save delivery address" className="mt-7 w-full bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => {
              setAttempted(true);
              const ok = f.title && f.first.trim() && f.last.trim() && f.address.trim() && f.city.trim() && f.state && f.zip.trim() && /^\d{10}$/.test(phoneDigits);
              if (ok) { setDeliverySaved(true); }
            }}>Save</button>
            {deliverySaved && <p className="mt-3 text-sm font-medium" role="status">Delivery address saved — payment is now available below.</p>}
          </div>
        ) : (
          <div className="pt-5">
            <p className="text-sm">Please find and select a store.</p>
            <div className="mt-4 flex items-center gap-2 border-b border-black/40 pb-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 21 21" /></svg>
              <input aria-label="Enter a location" className="min-w-0 flex-1 bg-transparent text-[15px] outline-none" placeholder="Enter a location" value={storeQuery} onChange={(e) => { setStoreQuery(e.target.value); setStoreErr(""); }} />
              <button aria-label="Use my location" className="flex h-8 w-8 shrink-0 items-center justify-center" onClick={() => setStoreErr("Location permission is handled by your browser — please type a location instead.")}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="7.5" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" /></svg>
              </button>
            </div>
            {storeErr && <p className="mt-2 text-xs text-neutral-600" role="status">{storeErr}</p>}
            <button aria-label="Find a store to collect from" className="mt-4 w-full bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => {
              if (!storeQuery.trim()) { setStoreErr("Please enter a location."); return; }
              setStorePicked(`Hermès — ${settings.flagshipStore || "691 Madison Avenue, New York"}`); setDeliverySaved(true);
            }}>Find</button>
            {storePicked && (
              <div className="mt-4 border border-[#f6f1eb] p-4" role="status">
                <p className="text-sm font-medium">{storePicked}</p>
                <p className="mt-1 text-sm text-neutral-600">Selected for collection — {settings.serviceHours}. Payment is now available below.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* PAYMENT */}
      <section className="bg-[#fffcf7] px-4 pb-5 pt-0 lg:px-6" aria-label="Payment section">
        <div className="flex min-h-[56px] items-center border-b border-[#f6f1eb]"><h2 className={CO_HEAD}>Payment</h2></div>
        {!deliverySaved ? (
          <p className="mt-3 text-sm leading-6 text-neutral-500">Payment will be available once your delivery information above is saved.</p>
        ) : (
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {payMethods.map((m) => <button key={m} aria-label={`Pay with ${m}`} className={`border px-3 py-3 text-sm ${pay === m ? "border-black bg-black text-white" : "border-black/30"}`} onClick={() => setPay(m)}>{m}</button>)}
            </div>
            <p className="mt-2 text-xs text-neutral-500">PayPal and Apple Pay are available for select products.</p>
            <p className="mt-3 text-xs leading-5 text-neutral-500">Selecting a method records it on the order; no card is charged and no card details are collected.</p>
            <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm leading-6 text-neutral-800">
              <input type="checkbox" aria-label="Agree to the General Terms and Conditions of Use" checked={termsAgree} onChange={(e) => { setTermsAgree(e.target.checked); setTermsErr(""); }} className="mt-1 h-4 w-4 shrink-0 accent-black" />
              <span>I agree to the Hermès <button type="button" aria-label="General Terms and Conditions of Use" className="underline" onClick={() => go({ t: "page", page: "terms" })}>General Terms and Conditions of Use</button>. I also agree to the creation of a customer account (if I do not have one yet) and to the processing of my data in compliance with Hermès <button type="button" aria-label="Privacy Policy from payment consent" className="underline" onClick={() => go({ t: "page", page: "privacy" })}>Privacy Policy</button>.</span>
            </label>
            <label className="mt-3 flex cursor-pointer items-start gap-3 text-sm leading-6 text-neutral-800">
              <input type="checkbox" aria-label="Accept that Hermès keeps my bank details until my account is debited" checked={bankAgree} onChange={(e) => setBankAgree(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-black" />
              <span>I accept that Hermès keeps my bank details until my account is debited, which will happen when my order is dispatched.</span>
            </label>
            {termsErr && <p className="mt-2 text-xs text-[#b3261e]" role="status">{termsErr}</p>}
            {order.isError && <p className="mt-2 text-sm text-red-700" role="status">The order could not be placed. Please check your details and try again.</p>}
            <button aria-label="Place order" disabled={order.isPending || accountEdit} className="font-mono-d mt-4 flex h-12 w-full items-center justify-center bg-black text-xs font-medium uppercase tracking-normal text-white disabled:bg-neutral-400" onClick={() => { if (!termsAgree) { setTermsErr("Please accept our Terms & Conditions"); return; } order.mutate(); }}>{order.isPending ? "Placing order…" : `Place order — ${fmt2(total)}`}</button>
            {accountEdit && <p className="mt-2 text-xs text-neutral-500">Confirm your email in the Account section above before placing the order.</p>}
          </div>
        )}
      </section>

      {/* THE ORANGE BOX */}
      <section className="bg-[#fffcf7] px-4 pt-0 lg:px-6" aria-label="The orange box section">
        <div className="flex min-h-[56px] items-center border-b border-[#f6f1eb]"><h2 className={CO_HEAD_LG}>The Orange Box</h2></div>
        <div className="flex items-center gap-4 py-4">
          <img src="https://www.hermes.com/us/en/assets/images/orange-box.png" alt="" aria-hidden="true" className="h-[70px] w-[70px] shrink-0" style={{ boxShadow: "-6px 6px 12px #f6f1eb78" }} />
          <p className="text-xs leading-5 text-black">All orders are delivered in an orange box tied with a Bolduc ribbon, with the exception of <button aria-label="Certain items exceptions" className="underline" onClick={() => go({ t: "page", page: "gifting" })}>certain items</button></p>
        </div>
      </section>

      {/* CUSTOMER SERVICE */}
      <section className="bg-[#fffcf7] px-4 pb-5 pt-0 lg:px-6" aria-label="Customer service section">
        <div className="flex min-h-[56px] items-center border-b border-[#f6f1eb]"><h2 className={CO_HEAD}>Customer Service</h2></div>
        <p className="mt-4 text-sm text-neutral-600">{settings.serviceHours}</p>
        <p className="mt-1 text-sm"><a aria-label="Call customer service from checkout" className="underline" href={`tel:${settings.phone}`}>{settings.phone}</a></p>
        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <button aria-label="Returns and exchanges from checkout" className="flex flex-col items-center gap-2 text-sm" onClick={() => go({ t: "page", page: "returns" })}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 8h11l-3-3M17 16H6l3 3" /></svg>
            Returns &amp; exchanges
          </button>
          <button aria-label="Shop securely" className="flex flex-col items-center gap-2 text-sm" onClick={() => go({ t: "page", page: "payment" })}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="1" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
            Shop securely
          </button>
        </div>
        <div className="mt-8 space-y-2 border-t border-[#f6f1eb] pt-4 text-[13px] text-neutral-600">
          {footerLinks.map(([l, pg]) => <button key={l} aria-label={`Checkout footer ${l}`} className="block hover:underline" onClick={() => go({ t: "page", page: pg })}>{l}</button>)}
          <p className="pt-1">{settings.copyrightText || "© Hermès 2026. All rights reserved."}</p>
        </div>
      </section>
    </div>, 2);
}

// Admin Panel — Chat tab. Reads the same localStorage thread (hv-chat)
// the customer ChatBubble writes to, so both sides see one thread.
// Admin edits are per-browser only (localStorage, no working backend):
// messages live in this browser only.
function AdminChat({ email, password }: { email: string; password: string }) {
  const [msgs, setMsgs] = useState<LocalChat[]>([]);
  const [reply, setReply] = useState("");
  const [note, setNote] = useState("");
  const load = async () => { const r = await api.getChatMessages({}); setMsgs(r.messages); };
  useEffect(() => { void load(); }, []);
  const sendReply = async () => {
    const text = reply.trim(); if (!text) return;
    const r = await api.sendChatMessage({ from: "admin", text });
    if (r.ok) { setReply(""); setNote("Reply sent."); void load(); } else setNote("Reply failed.");
  };
  return (
    <div className="mt-6 max-w-3xl">
      <p className="text-sm text-neutral-600">Customer chat messages from the floating chat bubble. Reply here and the customer sees it in the same thread. Messages are stored in this browser only.</p>
      <div className="mt-4 flex gap-2">
        <button aria-label="Refresh chat messages" className="border border-black px-4 py-2 text-[11px] uppercase tracking-[0.18em]" onClick={() => void load()}>Refresh</button>
        <button aria-label="Mark all chat messages read" className="border border-black px-4 py-2 text-[11px] uppercase tracking-[0.18em]" onClick={async () => { await api.adminMarkChatRead({ email, password }); setNote("Marked all read."); void load(); }}>Mark all read</button>
        <button aria-label="Clear all chat messages" className="border border-red-800 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-red-800" onClick={async () => { const r = await api.adminClearChat({ email, password }); if (r.ok) { setNote("Chat cleared."); void load(); } }}>Clear all</button>
      </div>
      {note && <p className="mt-2 text-sm text-neutral-600" role="status">{note}</p>}
      {msgs.length === 0 && <p className="mt-4 text-sm text-neutral-600">No chat messages yet.</p>}
      {msgs.map((m) => (
        <div key={m.id} className="mb-2 mt-3 border border-black/10 bg-[#fffdf9] p-4">
          <p className="text-xs text-neutral-500">{m.from === "customer" ? "Customer" : "Admin"}{m.name ? ` — ${m.name}` : ""} · {new Date(m.createdAt).toLocaleString()}{m.readByAdmin ? "" : " · UNREAD"}</p>
          <p className="mt-1 text-sm">{m.text}</p>
          <button aria-label={`Delete chat message ${m.id}`} className="mt-2 border border-red-800 px-3 py-1 text-[11px] uppercase tracking-wider text-red-800" onClick={async () => { await api.adminDeleteChatMessage({ email, password, id: m.id }); void load(); }}>Delete</button>
        </div>
      ))}
      <div className="mt-4 flex gap-2">
        <input aria-label="Reply to chat" className="min-w-0 flex-1 border border-black/25 bg-white px-3 py-2.5 text-sm" placeholder="Reply as the store…" value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") void sendReply(); }} />
        <button aria-label="Send chat reply" className="bg-black px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white" onClick={() => void sendReply()}>Send reply</button>
      </div>
    </div>
  );
}

function AdminView({ products, settings, qc, navOverrides, setNavOverrides }: { products: Product[]; settings: Settings; qc: ReturnType<typeof useQueryClient>; navOverrides: NavOverrides; setNavOverrides: (n: NavOverrides) => void }) {
  const [pw, setPw] = useState(""); const [adminEmail, setAdminEmail] = useState(""); const [authed, setAuthed] = useState(false); const [tab, setTab] = useState("Dashboard");
  const [msg, setMsg] = useState("");
  // Auto-sign-in when the admin Gmail was used on the customer sign-in form:
  // that sign-in stores the admin credentials in hlx-admin-auth, so the
  // panel opens directly without a second sign-in (user request 2026-11-13).
  useEffect(() => {
    const stored = load<{ email?: string; password?: string } | null>("hlx-admin-auth", null);
    if (!stored?.email || !stored?.password) return;
    void api.adminData({ email: stored.email, password: stored.password }).then((r) => {
      if (r.ok) { setAdminEmail(stored.email!); setPw(stored.password!); setAuthed(true); setMsg(""); }
    });
  }, []);
  const dataQ = useQuery({ queryKey: ["admin", adminEmail, pw], queryFn: () => api.adminData({ email: adminEmail, password: pw }), enabled: authed });
  const blank = { id: 0, name: "", category: "women", subcategory: "", theme: "Silk", price: 0, priceLabel: "", status: "available" as const, line: "", material: "", modelSize: "", metallicFinish: "", colorsJson: JSON.stringify([{ name: "Etoupe", hex: "#8a7a68", available: true }]), description: "", story: "", tone: "#e9ede8", glyph: "◆" };
  const [form, setForm] = useState(blank);
  const [logoUploading, setLogoUploading] = useState(false);
  const [stg, setStg] = useState<Settings>(settings);
  useEffect(() => { setStg(settings); }, [settings]);
  const saveProduct = useMutation({ mutationFn: () => api.adminSaveProduct({ email: adminEmail, password: pw, ...form }), onSuccess: (r) => { setMsg(r.ok ? "Product saved — it is now live on the storefront." : "Save failed."); setForm(blank); qc.invalidateQueries({ queryKey: ["storefront"] }); dataQ.refetch(); } });
  const delProduct = useMutation({ mutationFn: (id: number) => api.adminDeleteProduct({ email: adminEmail, password: pw, id }), onSuccess: () => { setMsg("Product deleted."); setConfirmProdDelete(null); qc.invalidateQueries({ queryKey: ["storefront"] }); dataQ.refetch(); } });
  const updOrder = useMutation({ mutationFn: (v: { id: number; status: string }) => api.adminUpdateOrder({ email: adminEmail, password: pw, ...v }), onSuccess: () => { setMsg("Order status updated."); dataQ.refetch(); qc.invalidateQueries({ queryKey: ["myorders"] }); } });
  const saveSettings = useMutation({ mutationFn: () => api.adminSaveSettings({ email: adminEmail, password: pw, settings: stg }), onSuccess: () => { setMsg("Settings saved — the storefront now shows the new values."); qc.invalidateQueries({ queryKey: ["storefront"] }); } });
  const [orderQ, setOrderQ] = useState(""); const [orderStatus, setOrderStatus] = useState("All"); const [orderDetail, setOrderDetail] = useState<number | null>(null);
  const [prodQ, setProdQ] = useState("");
  const [custQ, setCustQ] = useState(""); const [custDetail, setCustDetail] = useState<number | null>(null); const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [confirmProdDelete, setConfirmProdDelete] = useState<number | null>(null);
  const markViewed = useMutation({ mutationFn: (v: { kind: "order" | "user"; id: number }) => api.adminMarkViewed({ email: adminEmail, password: pw, ...v }), onSuccess: () => dataQ.refetch() });
  const setDisabled = useMutation({ mutationFn: (v: { id: number; disabled: boolean }) => api.adminSetUserDisabled({ email: adminEmail, password: pw, ...v }), onSuccess: () => { setMsg("Account updated."); dataQ.refetch(); } });
  const delUser = useMutation({ mutationFn: (id: number) => api.adminDeleteUser({ email: adminEmail, password: pw, id }), onSuccess: () => { setMsg("Account deleted."); setConfirmDelete(null); setCustDetail(null); dataQ.refetch(); } });

  if (!authed) return (
    <div className="mx-auto max-w-md px-4 py-14">
      <h1 className="font-serif-d text-center text-3xl italic">Admin Panel</h1>
      <p className="mt-2 text-center text-sm text-neutral-600">Sign in to manage products, orders, customers, theme and settings.</p>
      <input aria-label="Admin email" type="email" className="mt-6 w-full border border-black/30 px-3 py-3 text-sm" placeholder="Admin email (Gmail)" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
      <input aria-label="Admin password" type="password" className="mt-3 w-full border border-black/30 px-3 py-3 text-sm" placeholder="Admin password" value={pw} onChange={(e) => setPw(e.target.value)} />
      {msg && <p className="mt-2 text-sm text-red-700" role="status">{msg}</p>}
      <button aria-label="Admin sign in" className="mt-4 w-full bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={async () => {
        const r = await api.adminData({ email: adminEmail, password: pw });
        if (r.ok) { setAuthed(true); setMsg(""); qc.invalidateQueries({ queryKey: ["admin"] }); } else setMsg("Incorrect admin email or password.");
      }}>Sign in to Admin</button>
    </div>
  );
  const d = dataQ.data;
  const tabs = ["Dashboard", "Products", "Orders", "Customers", "Sales", "Navigation", "Newsletter", "Chat", "Theme & Settings"];
  const inputCls = "w-full border border-black/25 px-3 py-2.5 text-sm bg-white";
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif-d text-3xl italic">Admin Panel</h1>
        <button aria-label="Admin sign out" className="border border-black px-5 py-2 text-[11px] uppercase tracking-[0.2em]" onClick={() => { setAuthed(false); setPw(""); setAdminEmail(""); save("hlx-admin-auth", null); }}>Sign out</button>
      </div>
      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto">
        {tabs.map((t) => <button key={t} aria-label={`Admin tab ${t}`} className={`shrink-0 border px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] ${tab === t ? "border-black bg-black text-white" : "border-black/30"}`} onClick={() => { setTab(t); dataQ.refetch(); }}>{t}</button>)}
      </div>
      {msg && <p className="mt-4 border border-black/15 bg-[#fffdf9] px-4 py-3 text-sm" role="status">{msg}</p>}

      {tab === "Dashboard" && d && (
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[["Total Store Visits", d.stats.visitsTotal], ["Visits today", d.stats.visitsToday], ["Total orders", d.stats.orders], ["Pending orders", d.stats.pendingOrders], ["Total Sales / Revenue (USD)", fmt(d.stats.revenue)], ["Registered accounts", d.stats.users], ["New accounts today", d.stats.newAccountsToday], ["Newsletter subscribers", d.stats.newsletter], ["Notify-Me requests", d.stats.notify], ["Return requests", d.stats.returns], ["Total products", d.stats.products], ["Unviewed (NEW) orders", d.stats.newOrders]].map(([l, v]) => (
              <div key={String(l)} className="border border-black/10 bg-[#fffdf9] p-5"><p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">{l}</p><p className="mt-2 text-3xl">{v}</p></div>
            ))}
          </div>
          <p className="mt-4 text-sm text-neutral-600">Note: Hermès' real internal admin is not public — this Admin is built to manage this store the way a real luxury store admin does: sales, views, orders and accounts in one place. All numbers below are computed from real visits, orders and accounts in this store.</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="border border-black/10 bg-[#fffdf9] p-5"><h3 className="text-xs font-semibold uppercase tracking-[0.25em]">Store visits by day</h3>{d.visitsByDay.length === 0 && <p className="mt-2 text-sm text-neutral-600">No visits recorded yet.</p>}{d.visitsByDay.map(v => <p key={v.day} className="mt-1.5 flex justify-between text-sm"><span>{v.day}</span><span>{v.count} visit{v.count === 1 ? "" : "s"}</span></p>)}</div>
            <div className="border border-black/10 bg-[#fffdf9] p-5"><h3 className="text-xs font-semibold uppercase tracking-[0.25em]">Most viewed products</h3>{d.mostViewed.length === 0 && <p className="mt-2 text-sm text-neutral-600">No product views yet — open a product page and its count will appear.</p>}{d.mostViewed.map(v => <p key={v.productId} className="mt-1.5 flex justify-between text-sm"><span>{v.productName}</span><span>{v.views} views</span></p>)}</div>
            <div className="border border-black/10 bg-[#fffdf9] p-5"><h3 className="text-xs font-semibold uppercase tracking-[0.25em]">Top-selling products</h3>{d.topSelling.length === 0 && <p className="mt-2 text-sm text-neutral-600">No sales yet.</p>}{d.topSelling.map(v => <p key={v.name} className="mt-1.5 flex justify-between text-sm"><span>{v.name} × {v.qty}</span><span>{fmt(v.total)}</span></p>)}</div>
            <div className="border border-black/10 bg-[#fffdf9] p-5"><h3 className="text-xs font-semibold uppercase tracking-[0.25em]">Recent orders</h3>{d.orders.slice(0, 6).map(o => <button key={o.id} aria-label={`Recent order ${o.id}`} className="mt-1.5 flex w-full justify-between text-left text-sm hover:underline" onClick={() => { setTab("Orders"); setOrderDetail(o.id); markViewed.mutate({ kind: "order", id: o.id }); }}><span>#{o.id} — {o.customerName} {!o.viewedByAdmin && <span className="bg-black px-1.5 py-0.5 text-[10px] font-bold text-white">NEW</span>}</span><span>{fmt(o.total)} · {o.status}</span></button>)}</div>
          </div>
        </div>
      )}

      {tab === "Products" && (
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <input aria-label="Search products" className="mb-3 w-full border border-black/25 bg-white px-3 py-2.5 text-sm" placeholder={`Search all ${products.length} products by name, category, line or material…`} value={prodQ} onChange={(e) => setProdQ(e.target.value)} />
            {products.filter((p) => !prodQ || [p.name, p.category, p.subcategory, p.line, p.material, p.theme].join(" ").toLowerCase().includes(prodQ.toLowerCase())).length === 0 && <p className="text-sm text-neutral-600">No products match “{prodQ}”.</p>}
            {products.filter((p) => !prodQ || [p.name, p.category, p.subcategory, p.line, p.material, p.theme].join(" ").toLowerCase().includes(prodQ.toLowerCase())).map((p) => (
              <div key={p.id} className="mb-2 flex items-center gap-3 border border-black/10 bg-[#fffdf9] p-3">
                <span className="h-11 w-11 shrink-0 overflow-hidden"><img src={productImageFor(p)} alt="" className="h-full w-full object-cover" /></span>
                <div className="min-w-0 flex-1"><p className="truncate text-sm">{p.name}</p><p className="text-xs text-neutral-500">{p.category} · {p.subcategory} · {p.status.replaceAll("_", " ")}</p></div>
                <p className="text-sm">{priceText(p)}</p>
                <span className="whitespace-nowrap text-xs text-neutral-500">{(dataQ.data?.productViews.find(v => v.productId === p.id)?.views ?? 0)} views</span>
                <button aria-label={`Edit ${p.name}`} className="border border-black px-3 py-1.5 text-[11px] uppercase tracking-wider" onClick={() => setForm({ id: p.id, name: p.name, category: p.category, subcategory: p.subcategory, theme: p.theme, price: p.price, priceLabel: p.priceLabel, status: p.status as typeof blank.status, line: p.line, material: p.material, modelSize: p.modelSize, metallicFinish: p.metallicFinish, colorsJson: JSON.stringify(p.colors), description: p.description, story: p.story, tone: p.tone, glyph: p.glyph })}>Edit</button>
                {confirmProdDelete === p.id ? <><span className="text-xs">Delete?</span><button aria-label={`Confirm delete ${p.name}`} className="border border-red-800 px-3 py-1.5 text-[11px] uppercase tracking-wider text-red-800" onClick={() => delProduct.mutate(p.id)}>Confirm</button><button aria-label="Cancel delete product" className="border border-black px-3 py-1.5 text-[11px] uppercase tracking-wider" onClick={() => setConfirmProdDelete(null)}>Cancel</button></> : <button aria-label={`Delete ${p.name}`} className="border border-red-800 px-3 py-1.5 text-[11px] uppercase tracking-wider text-red-800" onClick={() => setConfirmProdDelete(p.id)}>Delete</button>}
              </div>
            ))}
          </div>
          <form className="h-fit border border-black/15 bg-[#fffdf9] p-5" onSubmit={(e) => { e.preventDefault(); saveProduct.mutate(); }}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em]">{form.id ? "Edit product" : "Add product"}</h2>
            <div className="mt-4 space-y-3">
              <input aria-label="Product name" className={inputCls} placeholder="Name *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <div className="grid grid-cols-2 gap-2">
                <select aria-label="Product category" className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{NAV.map((n) => <option key={n.key} value={n.key}>{n.label}</option>)}<option value="leather">LEATHER (shared)</option></select>
                <input aria-label="Product subcategory" className={inputCls} placeholder="Subcategory" value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select aria-label="Product theme" className={inputCls} value={form.theme} onChange={(e) => setForm({ ...form, theme: e.target.value })}>{THEMES.map((t) => <option key={t} value={t}>{t}</option>)}</select>
                <select aria-label="Product stock status" className={inputCls} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as typeof blank.status })}><option value="available">Available</option><option value="available_soon">Available soon</option><option value="out_of_stock">Out of stock</option><option value="in_store_only">In store only</option></select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input aria-label="Product price USD" type="number" min={0} className={inputCls} placeholder="Price USD *" required value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
                <input aria-label="Product price label" className={inputCls} placeholder="Price label (e.g. $385 and up)" value={form.priceLabel} onChange={(e) => setForm({ ...form, priceLabel: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input aria-label="Product line" className={inputCls} placeholder="Line" value={form.line} onChange={(e) => setForm({ ...form, line: e.target.value })} />
                <input aria-label="Product material" className={inputCls} placeholder="Material" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input aria-label="Product model size" className={inputCls} placeholder="Model size" value={form.modelSize} onChange={(e) => setForm({ ...form, modelSize: e.target.value })} />
                <input aria-label="Product metallic finish" className={inputCls} placeholder="Metallic finish" value={form.metallicFinish} onChange={(e) => setForm({ ...form, metallicFinish: e.target.value })} />
              </div>
              <textarea aria-label="Product colours JSON" className={inputCls} rows={2} placeholder='Colours JSON [{"name":"Noir","hex":"#1c1c1e","available":true}]' value={form.colorsJson} onChange={(e) => setForm({ ...form, colorsJson: e.target.value })} />
              <div className="grid grid-cols-2 gap-2">
                <input aria-label="Product card colour tone" className={inputCls} placeholder="Card tone #e9ede8" value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })} />
                <input aria-label="Product symbol" className={inputCls} placeholder="Symbol (emoji)" value={form.glyph} onChange={(e) => setForm({ ...form, glyph: e.target.value })} />
              </div>
              <textarea aria-label="Product description" className={inputCls} rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <textarea aria-label="Product story" className={inputCls} rows={2} placeholder="The story behind" value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} />
              <button aria-label="Save product" type="submit" className="w-full bg-black py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white">{saveProduct.isPending ? "Saving…" : form.id ? "Save changes" : "Add product"}</button>
              {form.id > 0 && <button aria-label="Cancel editing product" type="button" className="w-full border border-black py-2.5 text-[11px] uppercase tracking-[0.2em]" onClick={() => setForm(blank)}>Cancel edit</button>}
            </div>
          </form>
        </div>
      )}

      {tab === "Orders" && d && (
        <div className="mt-6">
          <div className="flex flex-wrap gap-2">
            <input aria-label="Search orders" className="min-w-52 flex-1 border border-black/25 bg-white px-3 py-2.5 text-sm" placeholder="Search by order #, customer, email or date…" value={orderQ} onChange={(e) => setOrderQ(e.target.value)} />
            <select aria-label="Filter orders by status" className="border border-black/25 bg-white px-3 py-2.5 text-sm" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>{["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(st => <option key={st} value={st}>{st}</option>)}</select>
          </div>
          {d.orders.filter(o => (orderStatus === "All" || o.status === orderStatus) && (!orderQ || `#${o.id} ${o.customerName} ${o.email} ${o.createdAt}`.toLowerCase().includes(orderQ.toLowerCase()))).length === 0 && <p className="mt-4 text-sm text-neutral-600">No orders match.</p>}
          {d.orders.filter(o => (orderStatus === "All" || o.status === orderStatus) && (!orderQ || `#${o.id} ${o.customerName} ${o.email} ${o.createdAt}`.toLowerCase().includes(orderQ.toLowerCase()))).map((o) => {
            let items: { name: string; qty: number; price: number; color?: string; size?: string }[] = []; try { items = JSON.parse(o.items) as typeof items; } catch { items = []; }
            const open = orderDetail === o.id;
            return (
            <div key={o.id} className="mb-2 border border-black/10 bg-[#fffdf9] p-4">
              <div className="flex flex-wrap items-center gap-3">
                <button aria-label={`Order ${o.id} detail`} className="min-w-0 flex-1 text-left" onClick={() => { setOrderDetail(open ? null : o.id); if (!o.viewedByAdmin) markViewed.mutate({ kind: "order", id: o.id }); }}>
                  <p className="text-sm font-medium">#{o.id} — {o.customerName} ({o.email}) {!o.viewedByAdmin && <span className="bg-black px-1.5 py-0.5 text-[10px] font-bold text-white">NEW</span>}</p>
                  <p className="text-xs text-neutral-500">{new Date(o.createdAt).toLocaleString()} · {o.paymentMethod || "—"} · {o.deliveryOption || "—"}</p>
                </button>
                <p className="text-sm">{fmt(o.total)}</p>
                <select aria-label={`Order ${o.id} status`} className="border border-black/30 px-2 py-2 text-sm" value={["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].includes(o.status) ? o.status : "Pending"} onChange={(e) => updOrder.mutate({ id: o.id, status: e.target.value })}>
                  {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((st) => <option key={st} value={st}>{st}</option>)}
                </select>
              </div>
              {open && <div className="mt-3 border-t border-black/10 pt-3 text-sm">
                {items.map((it, i) => <p key={i} className="py-0.5">{it.qty} × {it.name}{it.color ? ` — ${it.color}` : ""}{it.size ? ` · ${it.size}` : ""} — {fmt(it.price * it.qty)}</p>)}
                <p className="mt-2 text-neutral-600">Address: {o.address || "—"}</p>
                <p className="text-neutral-600">Payment: {o.paymentMethod || "—"} (demo) · Delivery: {o.deliveryOption || "—"} · Status timeline: Pending → Processing → Shipped → Delivered (current: {o.status})</p>
              </div>}
            </div> );
          })}
        </div>
      )}

      {tab === "Customers" && d && (
        <div className="mt-6">
          <input aria-label="Search customers" className="w-full max-w-md border border-black/25 bg-white px-3 py-2.5 text-sm" placeholder="Search by name or email…" value={custQ} onChange={(e) => setCustQ(e.target.value)} />
          <div className="mt-4">
          {d.users.filter(u => !custQ || `${u.name} ${u.email}`.toLowerCase().includes(custQ.toLowerCase())).length === 0 && <p className="text-sm text-neutral-600">No registered customers match.</p>}
          {d.users.filter(u => !custQ || `${u.name} ${u.email}`.toLowerCase().includes(custQ.toLowerCase())).map((u) => {
            const open = custDetail === u.id; const uOrders = d.orders.filter(o => o.email.toLowerCase() === u.email.toLowerCase());
            return (
            <div key={u.id} className="mb-2 border border-black/10 bg-[#fffdf9] p-4">
              <div className="flex flex-wrap items-center gap-3">
                <button aria-label={`Customer ${u.email} detail`} className="min-w-0 flex-1 text-left text-sm" onClick={() => { setCustDetail(open ? null : u.id); if (!u.viewedByAdmin) markViewed.mutate({ kind: "user", id: u.id }); }}>
                  {u.name} — {u.email} {!u.viewedByAdmin && <span className="bg-black px-1.5 py-0.5 text-[10px] font-bold text-white">NEW</span>} {u.disabled ? <span className="border border-red-800 px-1.5 py-0.5 text-[10px] font-bold text-red-800">DISABLED</span> : null}
                  <span className="block text-xs text-neutral-500">Joined {new Date(u.createdAt).toLocaleDateString()} · {u.totalOrders} orders · {fmt(u.totalSpent)} spent</span>
                </button>
                <button aria-label={`${u.disabled ? "Enable" : "Disable"} account ${u.email}`} className="border border-black px-3 py-1.5 text-[11px] uppercase tracking-wider" onClick={() => setDisabled.mutate({ id: u.id, disabled: !u.disabled })}>{u.disabled ? "Enable" : "Disable"}</button>
                {confirmDelete === u.id ? <>
                  <span className="text-xs">Delete this account?</span>
                  <button aria-label={`Confirm delete account ${u.email}`} className="border border-red-800 px-3 py-1.5 text-[11px] uppercase tracking-wider text-red-800" onClick={() => delUser.mutate(u.id)}>Confirm delete</button>
                  <button aria-label="Cancel delete account" className="border border-black px-3 py-1.5 text-[11px] uppercase tracking-wider" onClick={() => setConfirmDelete(null)}>Cancel</button>
                </> : <button aria-label={`Delete account ${u.email}`} className="border border-red-800 px-3 py-1.5 text-[11px] uppercase tracking-wider text-red-800" onClick={() => setConfirmDelete(u.id)}>Delete</button>}
              </div>
              {open && <div className="mt-3 border-t border-black/10 pt-3 text-sm">
                {uOrders.length === 0 && <p className="text-neutral-600">No orders yet.</p>}
                {uOrders.map(o => <p key={o.id} className="py-0.5">#{o.id} — {fmt(o.total)} — {o.status} · {o.address || "No address recorded"}</p>)}
              </div>}
            </div> );
          })}
          </div>
          {d.notify.length > 0 && <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.25em]">Notify-Me requests</h3>}
          {d.notify.map((n) => <div key={n.id} className="mt-2 border border-black/10 bg-[#fffdf9] p-4 text-sm">{n.productName} — {n.email}</div>)}
          {d.returns.length > 0 && <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.25em]">Return requests</h3>}
          {d.returns.map((r) => <div key={r.id} className="mt-2 border border-black/10 bg-[#fffdf9] p-4 text-sm">Order #{r.orderId} — {r.email} — {r.status} — {r.reason}</div>)}
        </div>
      )}

      {tab === "Sales" && d && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="border border-black/10 bg-[#fffdf9] p-5"><h3 className="text-xs font-semibold uppercase tracking-[0.25em]">Sales by day</h3><p className="mt-2 text-sm font-medium">Total revenue (excl. cancelled): {fmt(d.stats.revenue)}</p>{d.salesByDay.length === 0 && <p className="mt-2 text-sm text-neutral-600">No sales yet.</p>}{d.salesByDay.map(v => <p key={v.day} className="mt-1.5 flex justify-between text-sm"><span>{v.day} · {v.orders} order{v.orders === 1 ? "" : "s"}</span><span>{fmt(v.total)}</span></p>)}<p className="mt-3 text-xs text-neutral-500">Weekly total (last 7 days): {fmt(d.salesByDay.filter(v => Date.now() - new Date(v.day).getTime() < 7 * 24 * 3600 * 1000).reduce((sum, v) => sum + v.total, 0))}</p></div>
          <div className="border border-black/10 bg-[#fffdf9] p-5"><h3 className="text-xs font-semibold uppercase tracking-[0.25em]">Sales by category</h3>{d.salesByCategory.length === 0 && <p className="mt-2 text-sm text-neutral-600">No sales yet.</p>}{d.salesByCategory.map(v => <p key={v.category} className="mt-1.5 flex justify-between text-sm"><span>{v.category} · {v.qty} items</span><span>{fmt(v.total)}</span></p>)}</div>
          <div className="border border-black/10 bg-[#fffdf9] p-5 lg:col-span-2"><h3 className="text-xs font-semibold uppercase tracking-[0.25em]">Sales by product</h3>{d.salesByProduct.length === 0 && <p className="mt-2 text-sm text-neutral-600">No sales yet.</p>}{d.salesByProduct.map(v => <p key={v.name} className="mt-1.5 flex justify-between text-sm"><span>{v.name} × {v.qty}</span><span>{fmt(v.total)}</span></p>)}</div>
        </div>
      )}

      {tab === "Navigation" && (
        <div className="mt-6 max-w-3xl">
          <p className="text-sm text-neutral-600">Edit the mega-menu: change a top label or its left-image caption, set where it leads (destination category key), or hide it. Changes apply to the desktop mega menu and the mobile drawer immediately on this device.</p>
          {MEGA_RAW.map(e => { const ov = navOverrides[e.key] ?? {}; return (
            <div key={e.key} className="mt-3 grid gap-2 border border-black/10 bg-[#fffdf9] p-4 sm:grid-cols-2">
              <label className="text-xs uppercase tracking-[0.18em]">Label ({e.key})<input aria-label={`Nav label ${e.key}`} className={inputCls + " mt-1"} value={ov.label ?? e.label} onChange={(ev) => setNavOverrides({ ...navOverrides, [e.key]: { ...ov, label: ev.target.value } })} /></label>
              <label className="text-xs uppercase tracking-[0.18em]">Image caption<input aria-label={`Nav caption ${e.key}`} className={inputCls + " mt-1"} value={ov.caption ?? e.caption} onChange={(ev) => setNavOverrides({ ...navOverrides, [e.key]: { ...ov, caption: ev.target.value } })} /></label>
              <label className="text-xs uppercase tracking-[0.18em]">Destination (category key)<input aria-label={`Nav destination ${e.key}`} className={inputCls + " mt-1"} value={ov.dest ?? e.key} onChange={(ev) => setNavOverrides({ ...navOverrides, [e.key]: { ...ov, dest: ev.target.value } })} /></label>
              <label className="flex items-end gap-2 pb-1 text-sm"><input type="checkbox" aria-label={`Hide nav ${e.key}`} checked={!!ov.hidden} onChange={(ev) => setNavOverrides({ ...navOverrides, [e.key]: { ...ov, hidden: ev.target.checked } })} className="h-5 w-5 accent-black" /> Hide from navigation</label>
            </div> ); })}
          <button aria-label="Reset navigation" className="mt-4 border border-black px-6 py-2.5 text-[11px] uppercase tracking-[0.2em]" onClick={() => setNavOverrides({})}>Reset navigation to Hermès defaults</button>
        </div>
      )}

      {tab === "Newsletter" && d && (
        <div className="mt-6">
          {d.newsletter.length === 0 && <p className="text-sm text-neutral-600">No subscribers yet. Emails collected from the footer newsletter form appear here.</p>}
          {d.newsletter.map((n) => <div key={n.id} className="mb-2 border border-black/10 bg-[#fffdf9] p-4 text-sm">{n.email}</div>)}
        </div>
      )}

      {tab === "Chat" && (
        <AdminChat email={adminEmail} password={pw} />
      )}

      {tab === "Theme & Settings" && (
        <form className="mt-6 grid max-w-3xl gap-3" onSubmit={(e) => { e.preventDefault(); saveSettings.mutate(); }}>
          <div className="border border-black/15 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em]">Logo</p>
            <p className="mt-1 text-sm text-neutral-600">The header shows the carriage emblem + store name by default. Upload your own logo image to replace the emblem, and choose what the header displays. Changes go live on the storefront as soon as you save.</p>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="flex h-20 min-w-36 items-center justify-center border border-black/15 bg-[#fcf7f1] px-3">
                {stg.logoUrl ? <img src={stg.logoUrl} alt="Current store logo" className="max-h-16 w-auto object-contain" /> : <HermesLogo settings={stg} variant="compact" />}
              </div>
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.18em]">Display
                  <select aria-label="Logo display mode" className={inputCls + " mt-1"} value={stg.logoMode} onChange={(e) => setStg({ ...stg, logoMode: e.target.value })}>
                    <option value="both">Logo + Name</option>
                    <option value="logo">Logo only</option>
                    <option value="name">Name only</option>
                  </select>
                </label>
                <label className="inline-block cursor-pointer border border-black px-4 py-2 text-[11px] uppercase tracking-[0.18em]">
                  {logoUploading ? "Uploading…" : "Upload / replace logo image"}
                  <input aria-label="Upload logo image" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden" onChange={async (e) => {
                    const f = e.target.files?.[0]; e.target.value = "";
                    if (!f) return;
                    setLogoUploading(true);
                    try { const f64 = await fileToBase64(f); const r = await api.adminUploadLogo({ email: adminEmail, password: pw, dataBase64: f64.dataBase64, mimeType: f64.mimeType || f.type || "image/png", clear: false }); if (r.ok) { setStg(s => ({ ...s, logoUrl: r.logoUrl })); setMsg("Logo image uploaded — press “Save settings & theme” to keep the display mode, the image itself is already live."); qc.invalidateQueries({ queryKey: ["storefront"] }); } else setMsg("Logo upload failed — please use a PNG, JPG, WebP or SVG under 5 MB."); } catch { setMsg("Logo upload failed."); }
                    setLogoUploading(false);
                  }} />
                </label>
                {stg.logoUrl && <button aria-label="Remove logo image" type="button" className="ml-2 border border-red-800 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-red-800" onClick={async () => { const r = await api.adminUploadLogo({ email: adminEmail, password: pw, dataBase64: "", mimeType: "image/png", clear: true }); if (r.ok) { setStg(s => ({ ...s, logoUrl: "" })); setMsg("Logo image removed — the default carriage emblem is shown again."); qc.invalidateQueries({ queryKey: ["storefront"] }); } }}>Remove logo image</button>}
              </div>
            </div>
          </div>
          <label className="text-xs uppercase tracking-[0.2em]">Store name<input aria-label="Setting store name" className={inputCls + " mt-1"} value={stg.storeName} onChange={(e) => setStg({ ...stg, storeName: e.target.value })} /></label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs uppercase tracking-[0.2em]">Phone<input aria-label="Setting phone" className={inputCls + " mt-1"} value={stg.phone} onChange={(e) => setStg({ ...stg, phone: e.target.value })} /></label>
            <label className="text-xs uppercase tracking-[0.2em]">Service hours<input aria-label="Setting service hours" className={inputCls + " mt-1"} value={stg.serviceHours} onChange={(e) => setStg({ ...stg, serviceHours: e.target.value })} /></label>
          </div>
          <label className="text-xs uppercase tracking-[0.2em]">Homepage hero headline<input aria-label="Setting hero title" className={inputCls + " mt-1"} value={stg.heroTitle} onChange={(e) => setStg({ ...stg, heroTitle: e.target.value })} /></label>
          <label className="text-xs uppercase tracking-[0.2em]">Homepage hero text<textarea aria-label="Setting hero text" className={inputCls + " mt-1"} rows={3} value={stg.heroText} onChange={(e) => setStg({ ...stg, heroText: e.target.value })} /></label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs uppercase tracking-[0.2em]">Theme background colour<input aria-label="Setting background colour" className={inputCls + " mt-1"} value={stg.bgColor} onChange={(e) => setStg({ ...stg, bgColor: e.target.value })} /></label>
            <label className="text-xs uppercase tracking-[0.2em]">Default ship-to country<input aria-label="Setting ship to" className={inputCls + " mt-1"} value={stg.shipTo} onChange={(e) => setStg({ ...stg, shipTo: e.target.value })} /></label>
          </div>
          <label className="text-xs uppercase tracking-[0.2em]">Delivery text<textarea aria-label="Setting delivery text" className={inputCls + " mt-1"} rows={3} value={stg.deliveryText} onChange={(e) => setStg({ ...stg, deliveryText: e.target.value })} /></label>
          <label className="text-xs uppercase tracking-[0.2em]">Returns text<textarea aria-label="Setting returns text" className={inputCls + " mt-1"} rows={2} value={stg.returnsText} onChange={(e) => setStg({ ...stg, returnsText: e.target.value })} /></label>
          <label className="text-xs uppercase tracking-[0.2em]">Payment methods<input aria-label="Setting payment methods" className={inputCls + " mt-1"} value={stg.paymentMethods} onChange={(e) => setStg({ ...stg, paymentMethods: e.target.value })} /></label>
          <label className="text-xs uppercase tracking-[0.2em]">Flagship store address<input aria-label="Setting flagship store" className={inputCls + " mt-1"} value={stg.flagshipStore} onChange={(e) => setStg({ ...stg, flagshipStore: e.target.value })} /></label>
          <label className="text-xs uppercase tracking-[0.2em]">Ship-to countries (comma separated)<input aria-label="Setting ship-to countries" className={inputCls + " mt-1"} value={stg.shipToCountries} onChange={(e) => setStg({ ...stg, shipToCountries: e.target.value })} /></label>
          <label className="text-xs uppercase tracking-[0.2em]">Newsletter text<textarea aria-label="Setting newsletter text" className={inputCls + " mt-1"} rows={2} value={stg.newsletterText} onChange={(e) => setStg({ ...stg, newsletterText: e.target.value })} /></label>
          <label className="text-xs uppercase tracking-[0.2em]">Newsletter success message<input aria-label="Setting newsletter success" className={inputCls + " mt-1"} value={stg.newsletterSuccess} onChange={(e) => setStg({ ...stg, newsletterSuccess: e.target.value })} /></label>
          <label className="text-xs uppercase tracking-[0.2em]">Copyright line<input aria-label="Setting copyright text" className={inputCls + " mt-1"} value={stg.copyrightText} onChange={(e) => setStg({ ...stg, copyrightText: e.target.value })} /></label>
          <label className="text-xs uppercase tracking-[0.2em]">Service strip — delivery text<textarea aria-label="Setting service delivery body" className={inputCls + " mt-1"} rows={2} value={stg.serviceDeliveryBody} onChange={(e) => setStg({ ...stg, serviceDeliveryBody: e.target.value })} /></label>
          <label className="text-xs uppercase tracking-[0.2em]">Service strip — returns text<textarea aria-label="Setting service returns body" className={inputCls + " mt-1"} rows={2} value={stg.serviceReturnsBody} onChange={(e) => setStg({ ...stg, serviceReturnsBody: e.target.value })} /></label>
          <label className="text-xs uppercase tracking-[0.2em]">Service strip — payment text<textarea aria-label="Setting service payment body" className={inputCls + " mt-1"} rows={2} value={stg.servicePaymentBody} onChange={(e) => setStg({ ...stg, servicePaymentBody: e.target.value })} /></label>
          <label className="text-xs uppercase tracking-[0.2em]">Chat welcome message<textarea aria-label="Setting chat welcome" className={inputCls + " mt-1"} rows={2} value={stg.chatWelcome} onChange={(e) => setStg({ ...stg, chatWelcome: e.target.value })} /></label>
          <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]"><input aria-label="Setting chat enabled" type="checkbox" checked={stg.chatEnabled} onChange={(e) => setStg({ ...stg, chatEnabled: e.target.checked })} /> Chat bubble enabled</label>
          <p className="text-xs leading-5 text-neutral-500">Admin changes are saved in this browser only (localStorage) — there is no working backend, so they do not carry to another device or browser, and clearing browser data wipes them.</p>
          <button aria-label="Save settings" type="submit" className="bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white">{saveSettings.isPending ? "Saving…" : "Save settings & theme"}</button>
        </form>
      )}
    </div>
  );
}

