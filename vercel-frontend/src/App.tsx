import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type ApiResponse } from "./api";
// Real photos: the image files are in ./assets/ (uploaded to the repo).
import heroImg from "./assets/media-generation-hero-hands-blanket-0-42d3a746-833a-44bc-b0cb-99ad6e08730c.webp";
// Original Hermes hero photo (hermes.com homepage, verified 2026-11-10):
// black-and-white triangular tiled bench + blue patterned blanket on a beige
// stone wall. Desktop 16:9, mobile 9:16 (the crop hermes.com serves ≤1023px).
const heroBenchImg = "https://assets.hermes.com/is/image/hermesedito/cover_maison_167?fit=wrap%2C0&wid=1920&resMode=sharp2&op_usm=1%2C1%2C6%2C0";
const heroBenchImgMobile = "https://assets.hermes.com/is/image/hermesedito/Cover_maison_mobile?fit=wrap%2C0&wid=767&resMode=sharp2&op_usm=1%2C1%2C6%2C0";
import runwayImg from "./assets/media-generation-runway-show-0-97e89bc4-b374-4de6-96e4-e7a69020f3a2.webp";
import outdoorsImg from "./assets/media-generation-editorial-outdoors-0-67c3bd9b-b631-4b20-a0fa-75d9e7d34982.webp";
// Original Hermes Baladeur poster (hermes.com homepage, verified 2026-11-10):
// woman + bicycle + large white Afghan hound in front of a desert screen.
// The video itself is served from public/videos/ as MP4 (see BOARD d).
const baladeurPosterImg = "https://assets.hermes.com/is/image/hermesedito/Hero_Baladeur_Cover_16x9?fit=wrap%2C0&wid=1920&resMode=sharp2&op_usm=1%2C1%2C6%2C0";
const baladeurPosterImgMobile = "https://assets.hermes.com/is/image/hermesedito/Hero_Baladeur_Cover_9x16?fit=wrap%2C0&wid=767&resMode=sharp2&op_usm=1%2C1%2C6%2C0";
import kellyImg from "./assets/media-generation-editorial-kelly-coat-0-7238f945-faef-4dda-bd99-0169e098f7ee.webp";
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
import { galleryForProduct } from "./galleryImages";

type Product = ApiResponse<typeof api, "getStorefront">["products"][number];
type Settings = ApiResponse<typeof api, "getStorefront">["settings"];
type View =
  | { t: "home" } | { t: "category"; cat: string; sub?: string }
  | { t: "product"; id: number } | { t: "page"; page: string }
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
// on each MEGA_RAW entry selects its photo; anything unknown falls back to heroImg.
function megaImage(e: MegaEntry): string {
  switch (e.img) {
    case "outdoors": return outdoorsImg;
    case "kelly": return kellyImg;
    case "runway": return runwayImg;
    case "heroBench": return heroBenchImg;
    case "riderJacket": return riderJacketImg;
    case "mensLeatherJacket": return mensLeatherJacketImg;
    case "chaineNecklace": return chaineNecklaceImg;
    case "capeCod": return capeCodImg;
    case "muscPallida": return muscPallidaImg;
    case "avalonBlanket": return avalonBlanketImg;
    case "saddleBridle": return saddleBridleImg;
    case "scarfColliers": return scarfColliersImg;
    default: return heroImg;
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
// portrait (4/5 mobile, 3/4 desktop); the original's desktop 16:9 crops
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
// Verified theme grids on hermes.com (7 Nov 2026): the exact four products, in
// this order, shown under each carousel theme. Names match this store's catalog
// rows exactly, so repeats (1/6/11, 2/7/12, …) render identical products/prices.
const THEME_GRID_ORDER: Record<string, string[]> = {
  "Belts": ["Kelly Pocket 18 belt", "Collier de Chien 50 belt", "Elan Pocket 24 reversible belt", "Serif belt buckle & Reversible leather strap 32 mm"],
  "Men's Shoes": ["Bouncing sneaker", "Jet sneaker", "Nine ankle boot", "Noe loafer"],
  "Fashion Jewelry": ["Chaine d'ancre necklace, small model", "Clic Clac H bracelet", "Chaine d'ancre earrings", "Mini Thalassa bracelet"],
  "Silk": ["Colliers et Laisses pour Chiens scarf 90", "Turf Les Courses Twilly", "Casaque Jumping scarf", "Palonniers scarf 45"],
  "Beauty": ["Rouge Hermès gift set, Lip care", "Ombres d'Hermès, Eye shadow quartet, Ombres Sables", "Les Mains Hermès, Nail polish, Or Rose", "Bride-a-Brac Sellier case, large model"],
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
    return <img src={light ? carriageWhiteImg : carriageBlackImg} alt={raw} className="h-[26px] w-auto object-contain lg:h-[30px]" />;
  }
  if (variant === "compact") {
    // Cart / checkout top: ONLY the carriage emblem, centred.
    return <img src={light ? carriageWhiteImg : carriageBlackImg} alt={raw} className="h-8 w-auto object-contain" />;
  }
  if (variant === "headerfull") {
    // Desktop full header (top of page / scrolling up): the full HERMÈS PARIS
    // lockup file — carriage above, HERMÈS, PARIS below — centred, in the
    // colour matching the surface (white over the hero, black on white).
    return <img src={light ? logoWhiteImg : logoBlackImg} alt={raw} className="h-[52px] w-auto object-contain" />;
  }
  if (mode === "logo") {
    return <img src={light ? carriageWhiteImg : carriageBlackImg} alt={raw} className={variant === "brand" ? "h-10 w-auto object-contain" : "h-12 w-auto object-contain"} />;
  }
  // "brand" (cart page top) and "full" (footer bottom): the full lockup file —
  // carriage above, HERMÈS, PARIS below — in the colour matching the surface.
  return <img src={light ? logoWhiteImg : logoBlackImg} alt={raw} className={variant === "brand" ? "h-[68px] w-auto object-contain" : "h-24 w-auto object-contain sm:h-28"} />;
}

function load<T>(k: string, fb: T): T { try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : fb; } catch { return fb; } }
function save(k: string, v: unknown) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } }

export function ProductVisual({ p, large: _large, altSrc, altActive }: { p: Product; large?: boolean; altSrc?: string; altActive?: boolean }) {
  // Real studio product photo for every product (assets/products/), filling
  // the tile with object-cover — no glyph/emoji placeholders on the storefront.
  const img = productImageFor(p);
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
      {p.status === "available_soon" && <span className="absolute bottom-3 left-3 bg-white/85 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-neutral-600">Available soon</span>}
      {p.status === "in_store_only" && <span className="absolute bottom-3 left-3 bg-white/85 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-neutral-600">In store only</span>}
      {p.status === "out_of_stock" && <span className="absolute bottom-3 left-3 bg-white/85 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-neutral-600">Out of stock</span>}
    </div>
  );
}

// Quick buy exists on hermes.com only on sneaker tiles. Every sneaker in
// this catalogue has "sneaker" in its name (45 products, subcategory
// "Shoes") — the same test the category page already uses for its Sneakers
// filter — so this per-product test is the reliable gate. Belts, beauty,
// bags, etc. never get a quick-buy button.
function isSneakerProduct(p: Product): boolean { return /sneaker/i.test(p.name); }

function ProductCard({ p, onOpen, onQuickBuy, colourInName, portrait }: { p: Product; onOpen: (id: number) => void; onQuickBuy?: (p: Product) => void; colourInName?: boolean; portrait?: boolean }) {
  const bagIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 8h14l-1.2 12.2a1.8 1.8 0 0 1-1.8 1.6H8a1.8 1.8 0 0 1-1.8-1.6L5 8Z" /><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" /></svg>;
  // Tile alternate views (hermes.com parity): the tile photo swaps on hover
  // (desktop) and cycles on horizontal swipe (touch) through the product's
  // gallery views — without opening the product page. The alternate is the
  // product's 2nd gallery view first (galleryForProduct, default colourway),
  // skipping Video views and any view that duplicates the tile photo.
  // Single-view products (e.g. Milo hat, Rider jacket) have no alternate.
  // CAVEAT: gallery views are mostly generated type-set photos, not the
  // original Hermes second view — the mechanism is exact, the imagery is
  // approximate until original second-view URLs are extracted live.
  const tileSrc = productImageFor(p);
  const altViews = useMemo(() => {
    const views = galleryForProduct(p, 0);
    const afterFirst = views.filter((v, i) => i >= 1 && !v.video && v.src !== tileSrc).map((v) => v.src);
    const first = views.filter((v) => !v.video && v.src !== tileSrc).map((v) => v.src);
    return [...new Set([...afterFirst, ...first])];
  }, [p, tileSrc]);
  const [altIdx, setAltIdx] = useState<number | null>(null);
  const [altArmed, setAltArmed] = useState(false);
  // Hover exists on laptop, not on mobile: only arm the hover swap on a
  // fine pointer, so touch taps never get a stuck hover state.
  const finePointer = useMemo(() => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches, []);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const onHoverStart = () => {
    if (!finePointer || altViews.length === 0) return;
    setAltArmed(true);
    setAltIdx(0);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = t ? { x: t.clientX, y: t.clientY } : null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current; touchRef.current = null;
    const t = e.changedTouches[0];
    if (!start || !t || altViews.length === 0) return;
    const dx = t.clientX - start.x; const dy = t.clientY - start.y;
    // Sideways swipe only: horizontal movement must dominate, so vertical
    // page scrolling never changes the photo. A swipe never opens the
    // product — the tap that follows it is suppressed once.
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      setAltArmed(true);
      setAltIdx((i) => {
        if (i === null) return dx < 0 ? 0 : altViews.length - 1;
        const next = dx < 0 ? i + 1 : i - 1;
        return ((next % altViews.length) + altViews.length) % altViews.length;
      });
      suppressClickRef.current = true;
    }
  };
  return (
    <div className="group relative cursor-pointer" role="link" aria-label={`${p.name}, ${priceText(p)}`} tabIndex={0}
      onClick={() => { if (suppressClickRef.current) { suppressClickRef.current = false; return; } onOpen(p.id); }} onKeyDown={(e) => { if (e.key === "Enter") onOpen(p.id); }}
      onMouseEnter={onHoverStart} onMouseLeave={() => setAltIdx(null)}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className={`${portrait ? "aspect-[4/5] sm:aspect-square" : "aspect-square"} overflow-hidden transition-transform duration-300 group-hover:scale-[1.015]`}><ProductVisual p={p} altSrc={altIdx !== null ? altViews[altIdx] : (altArmed ? altViews[0] : undefined)} altActive={altIdx !== null} /></div>
      {colourInName ? (
        // Category tile, as on hermes.com: the colour is appended to the
        // name ("Le Petit Sac bag, Beige/Natural"), the price sits below,
        // and a Quick buy bag button (sneaker pages) ends the text row.
        <div className="mt-3 flex items-start justify-between gap-2">
          <div>
            <p className="product-name text-left text-sm text-[var(--text)]">{p.name}{p.colors[0] ? `, ${p.colors[0].name}` : ""}</p>
            <p className="mt-0.5 text-left text-sm text-[var(--text)]">{priceText(p)}</p>
          </div>
          {onQuickBuy && p.status === "available" && (
            <button aria-label={`Quick buy ${p.name}`} className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-black/25 bg-white transition hover:bg-black hover:text-white"
              onClick={(e) => { e.stopPropagation(); onQuickBuy(p); }}>{bagIcon}</button>
          )}
        </div>
      ) : (
        <>
          <p className={`product-name mt-3 text-left ${portrait ? "px-2 text-[13px] leading-snug sm:px-0 sm:text-sm" : "text-sm"} text-[var(--text)]`}>{p.name}</p>
          {p.colors[0] && <p className={`mt-0.5 text-left ${portrait ? "px-2 text-[11px] sm:px-0 sm:text-xs" : "text-xs"} text-neutral-500`}>{p.colors[0].name}</p>}
          <p className={`mt-0.5 text-left ${portrait ? "px-2 text-[13px] sm:px-0 sm:text-sm" : "text-sm"} text-[var(--text)]`}>{priceText(p)}</p>
          {onQuickBuy && p.status === "available" && (
            <button aria-label={`Quick buy ${p.name}`} className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-base shadow transition hover:bg-black hover:text-white"
              onClick={(e) => { e.stopPropagation(); onQuickBuy(p); }}>{bagIcon}</button>
          )}
        </>
      )}
    </div>
  );
}

export function App() {
  const qc = useQueryClient();
  const store = useQuery({ queryKey: ["storefront"], queryFn: () => api.getStorefront({}) });
  const products = useMemo(() => store.data?.products ?? [], [store.data]);
  const settings: Settings = store.data?.settings ?? { storeName: "HERMÈS PARIS", phone: "800-441-4488", heroTitle: "Threading ideas", heroText: "", shipTo: "UNITED STATES", deliveryText: "", returnsText: "", paymentMethods: "", bgColor: "#f7f2ec", serviceHours: "Monday to Saturday 10 AM - 9 PM", logoMode: "both", logoUrl: "" };

  const [view, setView] = useState<View>({ t: "home" });
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
  const [themeIdx, setThemeIdx] = useState(0);
  const [cookie, setCookie] = useState<string | null>(() => { try { return localStorage.getItem("hlx-cookies"); } catch { return "pending"; } });
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => { save("hlx-cart", cart); }, [cart]);
  useEffect(() => { save("hlx-user", user); }, [user]);
  useEffect(() => { try { let k = localStorage.getItem("hlx-visitor"); if (!k) { k = "v-" + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem("hlx-visitor", k); } const day = new Date().toISOString().slice(0, 10); const flag = `hlx-visit-${day}`; if (!localStorage.getItem(flag)) { localStorage.setItem(flag, "1"); api.recordVisit({ visitorKey: k, day }).catch(() => {}); } } catch { /* ignore */ } }, []);
  const go = (v: View) => { if (v.t === "category") pulse(2200); setView(v); setMobileNav(false); setMenuCat(null); topRef.current?.scrollIntoView(); window.scrollTo({ top: 0 }); };
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

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
    const VARIANTS: Record<string, string> = { scarves: "scarf", sneakers: "sneaker", glasses: "glass" };
    const norm = (w: string) => {
      const v = VARIANTS[w];
      if (v) return v;
      if (/ies$/.test(w) && w.length > 3) return w.slice(0, -3) + "y";
      if (/s$/.test(w) && !/ss$/.test(w)) return w.slice(0, -1);
      return w;
    };
    const terms = q.split(/\s+/).map(norm);
    return products.filter((p) => {
      const tokens = [p.name, p.category, p.subcategory, p.line, p.material, p.theme]
        .join(" ").toLowerCase().split(/[^a-z0-9\u00e0-\u00ff]+/).map(norm);
      return terms.every((t) => tokens.some((tok) => tok.includes(t)));
    });
  }, [searchQ, products]);

  if (store.isPending) return <div className="flex min-h-screen items-center justify-center" style={{ background: "#f7f2ec" }}><img src={carriageBlackImg} alt="Hermès Paris" className="h-10 w-auto object-contain" /></div>;
  if (store.error) return <div className="p-8 text-center"><p>Failed to load the store.</p><button aria-label="Retry loading store" className="mt-4 border border-black px-6 py-2 text-xs uppercase tracking-widest" onClick={() => store.refetch()}>Retry</button></div>;

  return (
    <div ref={topRef} className="relative min-h-screen" style={{ background: settings.bgColor || "#f7f2ec", color: "#191919" }}>
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
      <header ref={headerRef} className={`fixed inset-x-0 top-0 z-40 pt-safe transition-[background-color,border-color,color] duration-300 ${onHero ? "border-b border-transparent" : slim ? "border-b border-black" : "border-b border-black/10 shadow-[0_1px_0_rgba(0,0,0,0.02)]"}`} style={{ background: onHero ? "transparent" : "#ffffff", color: ink }}>
        {/* Top row (logo / Search / Account / Cart). In the slim state this row
            is gone on DESKTOP — only the nav board below remains. On mobile the
            slim carriage header IS the board, so the row stays at every width
            below lg. */}
        <div className={`mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-2 pb-1.5 pt-2 sm:px-6 lg:pb-0 lg:pt-3 ${slim ? "lg:hidden" : ""}`}>
          <div className="flex items-center">
            <button aria-label="Open menu" className="flex h-9 w-9 items-center justify-center lg:hidden" onClick={() => setMobileNav(true)}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.5" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            </button>
            <button aria-label="Search for an article" className="hidden items-center gap-2 pl-1 text-sm lg:flex" onClick={() => setSearchOpen(true)}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 21 21" /></svg>
              <span className="pb-0.5" style={{ borderBottom: `1px solid ${onHero ? "rgba(255,255,255,.7)" : "rgba(0,0,0,.6)"}`, color: onHero ? "#fff" : "#525252" }}>Search</span>
            </button>
            <button aria-label="Search" className="flex h-9 w-9 items-center justify-center lg:hidden" onClick={() => setSearchOpen(true)}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 21 21" /></svg>
            </button>
          </div>
          <button aria-label="Hermès Paris home" className="justify-self-center text-center" onClick={() => go({ t: "home" })}>
            {/* Desktop full header: the full HERMÈS PARIS lockup centred.
                Mobile: ONLY the small carriage emblem, as in the user's video. */}
            <span className="hidden lg:block"><HermesLogo settings={settings} light={onHero} variant="headerfull" /></span>
            <span className="lg:hidden"><HermesLogo settings={settings} light={onHero} variant="header" /></span>
          </button>
          <div className="flex items-center justify-end gap-0.5 sm:gap-2">
            {/* Sign up / Login — visible text options in the header (desktop),
                next to Account / Cart, in the Hermes small-uppercase style.
                "Sign up" opens the create-account page, "Login" the sign-in
                page. On mobile they are hidden; the Account icon opens the
                account page there. */}
            <button aria-label="Sign up" className="hidden px-2 text-[12px] font-semibold uppercase tracking-[0.18em] hover:underline lg:block" style={{ color: ink, textShadow: onHero ? "0 1px 2px rgba(0,0,0,.45)" : undefined }} onClick={() => go({ t: "account", mode: "signup" })}>Sign up</button>
            <button aria-label="Login" className="hidden px-2 text-[12px] font-semibold uppercase tracking-[0.18em] hover:underline lg:block" style={{ color: ink, textShadow: onHero ? "0 1px 2px rgba(0,0,0,.45)" : undefined }} onClick={() => go({ t: "account", mode: "login" })}>Login</button>
            <button aria-label="Account" className="flex h-9 w-9 items-center justify-center" onClick={() => go({ t: "account" })}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20c1.4-3.6 4.2-5.2 7.5-5.2s6.1 1.6 7.5 5.2" /></svg>
            </button>
            <button aria-label={`Cart, ${cartCount} items`} className="relative flex h-9 w-9 items-center justify-center" onClick={() => go({ t: "cart" })}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.5" aria-hidden="true"><path d="M5 8h14l-1.2 12.2a1.8 1.8 0 0 1-1.8 1.6H8a1.8 1.8 0 0 1-1.8-1.6L5 8Z" /><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" /></svg>
              {cartCount > 0 && <span className={`absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${onHero ? "bg-white text-black" : "bg-black text-white"}`}>{cartCount}</span>}
            </button>
          </div>
        </div>
        <nav aria-label="Main navigation" className={`relative mx-auto hidden max-w-7xl items-center justify-center gap-5 px-4 pb-0 lg:flex ${slim ? "pt-0" : "pt-2"}`} onMouseLeave={() => setMenuCat(null)}>
          {mega.map((n) => (
            <div key={n.key} className="flex items-center" onMouseEnter={() => setMenuCat(n.key)}>
              {n.key === "about" && <span aria-hidden="true" className="mr-5 block h-4 w-px" style={{ background: onHero ? "rgba(255,255,255,.55)" : "rgba(0,0,0,.3)" }} />}
              <button aria-label={`Open ${n.label} menu`} aria-expanded={menuCat === n.key} aria-haspopup="true" className={`whitespace-nowrap ${slim ? "py-[14px]" : "pb-3"} text-[11px] font-medium uppercase tracking-[0.14em] ${menuCat === n.key ? "underline underline-offset-8 decoration-1" : "hover:underline underline-offset-4"}`} onClick={() => { if (menuCat === n.key) { if (n.key === "about") go({ t: "about" }); else go({ t: "category", cat: navOverrides[n.key]?.dest || n.key }); } else setMenuCat(n.key); }}>{n.label}</button>
            </div>
          ))}
          {menuCat && (() => { const entry = mega.find(e => e.key === menuCat); if (!entry) return null; const cols = entry.key === "women" ? MEGA_DESKTOP_WOMEN : entry.columns; return (
            <div className="absolute inset-x-0 top-full z-50 border-t border-black/10 bg-white shadow-[0_24px_40px_rgba(0,0,0,0.12)]" role="menu" aria-label={`${entry.label} mega menu`} onMouseEnter={() => setMenuCat(entry.key)}>
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
          <div className="drawer-left flex h-full w-full flex-col overflow-y-auto bg-white">
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
            <div className="px-5 py-4" style={{ background: "#f7f2ec" }}>
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
        <div className="fixed inset-0 z-50 bg-[#f7f2ec] fade-up overflow-y-auto">
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

      <main className={view.t === "home" || view.t === "cart" || view.t === "checkout" ? "" : "pt-[62px] lg:pt-[142px]"}>
        {view.t === "home" && <HomeView settings={settings} products={products} themeIdx={themeIdx} setThemeIdx={setThemeIdx} go={go} addToCart={addToCart} pulse={pulse} />}
        {view.t === "cart" && <CartPage cart={cart} setCart={setCart} settings={settings} go={go} total={cartTotal} count={cartCount} />}
        {view.t === "category" && view.cat === "about" && <AboutPage go={go} />}
        {view.t === "category" && view.cat !== "about" && <CategoryView key={view.cat + (view.sub ?? "")} products={products} cat={view.cat} sub={view.sub} go={go} addToCart={addToCart} />}
        {view.t === "product" && <ProductView key={view.id} products={products} id={view.id} go={go} addToCart={addToCart} settings={settings} user={user} />}
        {view.t === "page" && <InfoPage page={view.page} settings={settings} go={go} user={user} />}
        {view.t === "about" && <AboutPage go={go} />}
        {view.t === "account" && <AccountView key={view.mode ?? "login"} user={user} setUser={setUser} go={go} mode={view.mode} />}
        {view.t === "checkout" && <CheckoutView cart={cart} setCart={setCart} user={user} go={go} total={cartTotal} settings={settings} />}
        {view.t === "admin" && <AdminView products={products} settings={settings} qc={qc} navOverrides={navOverrides} setNavOverrides={setNavOverrides} />}
      </main>

      {view.t !== "cart" && view.t !== "checkout" && <Footer settings={settings} go={go} />}

      {addedDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setAddedDialog("")}>
          <div className="w-full max-w-md bg-[#fffdf9] p-7 text-center shadow-2xl fade-up" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Item added to cart">
            <p className="text-sm leading-6">This item has been added to the cart</p>
            <p className="mt-1 text-xs text-neutral-500">{addedDialog}</p>
            <div className="mt-5 flex gap-3">
              <button aria-label="Close added to cart dialog" className="flex-1 border border-black py-3 text-[11px] uppercase tracking-[0.2em]" onClick={() => setAddedDialog("")}>Close</button>
              <button aria-label="View cart" className="flex-1 bg-black py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white" onClick={() => { setAddedDialog(""); go({ t: "cart" }); }}>View cart</button>
            </div>
          </div>
        </div>
      )}

      {cookie === null && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/20 bg-[#fffdf9] p-5 shadow-2xl">
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

function HomeView({ settings, products, themeIdx, setThemeIdx, go, addToCart, pulse }: { settings: Settings; products: Product[]; themeIdx: number; setThemeIdx: (i: number) => void; go: (v: View) => void; addToCart: (p: Product, c?: string, s?: string, q?: number) => void; pulse: (ms?: number) => void }) {
  const activeIdx = Math.min(CAROUSEL_THEMES.length - 1, Math.max(0, themeIdx));
  const theme = CAROUSEL_THEMES[activeIdx] ?? "Belts";
  const strip = products.filter((p) => p.theme === theme);
  // Grid = the verified four products for this theme, in verified order, so
  // positions 1/6/11 (Belts), 2/7/12, … always show identical products/prices.
  const orderedNames = THEME_GRID_ORDER[theme];
  const ordered = orderedNames ? orderedNames.map((n) => products.find((p) => p.name === n)).filter((p): p is Product => !!p) : [];
  const shown = (ordered.length ? ordered : strip.length ? strip : products).slice(0, 4);
  const heroText = settings.heroText || "The blanket provides a canvas that can take any direction, from reimagining motifs to asserting a bold artistic signature. Its playful composition allows style to express itself on a larger scale.";
  const heroWords = (settings.heroTitle || "Threading ideas").split(" ");
  const heroFirst = heroWords[0] ?? "Threading";
  const heroRest = heroWords.slice(1).join(" ") || "ideas";
  const carouselRef = useRef<HTMLDivElement>(null);
  const centerSlide = (i: number, smooth = true) => {
    // Wrap around the 15 controls, as on hermes.com (15 → 1 and 1 → 15).
    const idx = ((i % CAROUSEL_THEMES.length) + CAROUSEL_THEMES.length) % CAROUSEL_THEMES.length;
    const el = carouselRef.current;
    const slide = el?.querySelectorAll<HTMLElement>("[data-slide]")[idx];
    if (slide) slide.scrollIntoView({ behavior: smooth ? "smooth" : "auto", inline: "center", block: "nearest" });
    setThemeIdx(idx);
  };
  const onCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-slide]");
    if (!slide) return;
    const w = slide.offsetWidth + 12;
    const idx = Math.min(CAROUSEL_THEMES.length - 1, Math.max(0, Math.round(el.scrollLeft / w)));
    if (idx !== activeIdx) setThemeIdx(idx);
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
          <img src={heroBenchImg} alt="Blue patterned blanket folded on a black-and-white triangular tiled bench against a beige stone wall" className="h-[70vh] w-full object-cover object-center sm:h-screen" />
        </picture>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent pb-8 pt-24 text-white sm:pb-10">
          <div className="mx-auto max-w-7xl px-5 text-center sm:px-6 lg:px-10 lg:text-left">
            <h1 className="font-serif-d text-[32px] italic leading-tight sm:text-5xl"><span className="lg:block">{heroFirst}</span> {heroRest}</h1>
            <p className="mx-auto mt-3 w-full max-w-full break-words font-serif-d text-[13px] italic leading-[1.75] sm:max-w-xl sm:text-sm lg:mx-0">{heroText}</p>
            <button aria-label="Discover the blanket collection" className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] underline underline-offset-8" onClick={() => go({ t: "category", cat: "home", sub: "Blankets and pillows" })}>Discover</button>
          </div>
        </div>
      </section>

      {/* BOARDS b)+c) DISCOVER CAROUSEL + PRODUCTS FOR THE THEME — one warm
          cream board, no divider between carousel and theme products */}
      <section className="w-full" style={{ background: settings.bgColor || "#f7f2ec" }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        {/* Mobile heading — centred, two lines, as in the user's video */}
        <h2 className="font-serif-d text-center text-[28px] italic leading-snug lg:hidden">Discover the world <span className="block">of Hermès</span></h2>
        {/* Desktop heading — top-left, as verified on hermes.com */}
        <div className="hidden lg:block">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-serif-d text-lg" style={{ color: "#5b6b7c" }}>Discover the world of Hermès</p>
              <h2 className="font-serif-d mt-1 text-4xl italic">Everything within reach</h2>
              <button aria-label={`Discover the theme ${theme}`} className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] underline underline-offset-8" onClick={() => go(themeDest(theme))}>Discover the theme</button>
            </div>
            <div className="flex items-center gap-3 pt-2" aria-label="Theme position">
              <button aria-label="Previous theme" className="flex h-9 w-9 items-center justify-center border border-black/25 hover:border-black" onClick={() => centerSlide(activeIdx - 1)}>‹</button>
              <span className="text-sm tabular-nums" aria-live="polite">{activeIdx + 1} / {CAROUSEL_THEMES.length}</span>
              <button aria-label="Next theme" className="flex h-9 w-9 items-center justify-center border border-black/25 hover:border-black" onClick={() => centerSlide(activeIdx + 1)}>›</button>
            </div>
          </div>
        </div>
        {/* Swipe carousel — one large central image, neighbours peeking at the edges */}
        <div ref={carouselRef} onScroll={onCarouselScroll} className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[12%] pb-1 sm:px-[18%] lg:px-[31%]" role="tablist" aria-label="Discover themes">
          {CAROUSEL_THEMES.map((t, i) => {
            const ed = CAROUSEL_EDITORIAL[t];
            if (!ed) return null;
            return (
              <button key={`${t}-${i}`} data-slide role="tab" aria-selected={activeIdx === i} aria-label={`Theme ${t}, ${i + 1} of ${CAROUSEL_THEMES.length}`} onClick={() => centerSlide(i)}
                className={`relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden text-left transition-opacity duration-300 lg:aspect-[3/4] ${activeIdx === i ? "opacity-100" : "opacity-75"}`}>
                <img src={ed.img} alt={ed.alt} loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-black shadow">{t}</span>
              </button>
            );
          })}
        </div>
        <div className="mx-auto mt-4 h-[2px] w-44 bg-black/15" aria-hidden="true">
          <div className="h-full bg-black transition-transform duration-300" style={{ width: `${100 / CAROUSEL_THEMES.length}%`, transform: `translateX(${activeIdx * 100}%)` }} />
        </div>
        {/* No counter/arrows on mobile — the original's mobile carousel has only
            the progress line above (verified on hermes.com, phone). The 1/15
            counter + arrows live only in the desktop heading above (hidden lg:block). */}
        {/* The original renders this heading sr-only (visually hidden,
            screen-reader only) — verified in hermes.com's rendered HTML:
            <h2 class="sr-only">Products for the theme Belts</h2>. The 4
            products below ARE visible on the original, so only the heading
            is hidden, not the products. */}
        <h2 className="sr-only">Products for the theme {theme}</h2>
        <div key={theme} className="-mx-4 mt-5 grid grid-cols-2 gap-x-[3px] gap-y-10 sm:mx-0 sm:gap-5 lg:grid-cols-4">
          {shown.map((p) => <ProductCard key={p.id} p={p} portrait onOpen={(id) => go({ t: "product", id })} onQuickBuy={isSneakerProduct(p) ? (prod) => addToCart(prod) : undefined} />)}
        </div>
      </div>
      </section>

      {/* BOARD d) VIDEO — full-bleed BLACK board, no gap from the cream board
          above. Video frame on top (white square controls bottom-right);
          title, sub-text and Discover link centred on black BELOW the frame. */}
      <section ref={vidRef} className="relative overflow-hidden bg-black" aria-label="The great outdoors in stereo video">
        <div className="relative overflow-hidden">
        <ProductVideo src={baladeurSrc} poster={baladeurPoster} playing={!vidPaused && vidInView} muted={vidMuted} className="h-[62vh] w-full object-cover" />
        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
          <button aria-label={vidPaused ? "Play video" : "Pause video"} aria-pressed={vidPaused} className="flex h-9 w-9 items-center justify-center bg-white text-black shadow" onClick={() => setVidPaused(!vidPaused)}>
            {vidPaused
              ? <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5-13-7.5Z" /></svg>
              : <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="5" height="16" /><rect x="14" y="4" width="5" height="16" /></svg>}
          </button>
          <button aria-label={vidMuted ? "Enable sound" : "Mute"} aria-pressed={!vidMuted} className="flex h-9 w-9 items-center justify-center bg-white text-black shadow" onClick={() => setVidMuted(!vidMuted)}>
            {vidMuted
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" stroke="none" /><path d="M16 9l6 6M22 9l-6 6" /></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" stroke="none" /><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" /></svg>}
          </button>
        </div>
        </div>
        <div className="bg-black px-4 py-12 text-center text-white">
          <h2 className="font-serif-d text-3xl italic sm:text-4xl">The great outdoors in stereo</h2>
          <p className="font-serif-d mx-auto mt-3 max-w-lg text-base italic">Ride lightly, listen largely. The Hermès sound comes where the road begins.</p>
          <button aria-label="Discover the equestrian collection" className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] underline underline-offset-8" onClick={() => go({ t: "category", cat: "equestrian" })}>Discover the collection</button>
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
      <section className="relative cursor-pointer overflow-hidden" style={{ background: "#2e1c11" }} onClick={() => go({ t: "category", cat: "jewelry" })} aria-label="The Kelly story — discover the collection">
        <div className="relative aspect-[720/1369] overflow-hidden sm:aspect-auto">
          <picture>
            <source media="(max-width: 640px)" srcSet={kellyRingsImgMobile} />
            <img src={kellyRingsImg} alt="Two gold Kelly rings, one pavé-set with diamonds, on an orange background" className="absolute bottom-[-0.7%] left-1/2 block w-[115.3%] max-w-none -translate-x-1/2 sm:static sm:bottom-auto sm:w-full sm:max-w-full sm:translate-x-0" />
          </picture>
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/75 to-transparent sm:hidden" />
          <div className="absolute inset-x-0 bottom-0 pb-4 pt-8 text-center text-white sm:pb-12">
            <p className="font-serif-d mx-auto max-w-3xl px-4 text-[18px] italic leading-[31px] sm:text-[28px] sm:leading-snug">With each new collection, the Kelly story reinvents itself and reveals new depths. A legendary design, constantly in motion.</p>
            <button aria-label="Discover the Kelly collection" className="mt-4 text-xs font-semibold uppercase tracking-[0.05em] underline underline-offset-8 sm:tracking-[0.3em]" onClick={() => go({ t: "category", cat: "jewelry" })}>Discover the collection</button>
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
const MOSAIC_ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[4/3]", "aspect-[3/4]", "aspect-[5/6]", "aspect-square"];

type FGroup = "category" | "line" | "material" | "modelSize" | "finish" | "size" | "color";
type FSection = { key: string; title: string; kind: "checks" | "color" | "size" | "price" | "sort"; group?: FGroup; options: { value: string; count: number; hex?: string }[] };
const EMPTY_SEL: Record<FGroup, string[]> = { category: [], line: [], material: [], modelSize: [], finish: [], size: [], color: [] };

function CategoryView({ products, cat, sub, go, addToCart }: { products: Product[]; cat: string; sub?: string; go: (v: View) => void; addToCart: (p: Product) => void }) {
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
      "fall-winter 2026 collection": (p) => p.line === "Fall-Winter 2026",
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
  const isWomensBags = isBagsPage && !isMensBags;
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
  const titleText = isCollectionSub && sub ? `${sub} Collection` : sub ?? (cat === "women" ? "Women's bags and clutches" : label.charAt(0) + label.slice(1).toLowerCase());
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
    siblings = RTW_SUBS.map((l) => ({ label: l, view: { t: "category", cat, sub: l } as View, current: l.toLowerCase() === subLow || (isCollectionSub && l.toLowerCase() === `${subLow} collection`) || (l === "Dresses and skirts" && isDressesPage && !RTW_SUBS.some((x) => x.toLowerCase() === subLow)) }));
  } else if (nav) {
    siblings = nav.subs.map((s) => ({ label: s, view: { t: "category", cat, sub: s } as View, current: s === sub }));
    siblings.push({ label: "View all", view: { t: "category", cat }, current: !sub });
  }

  // ---- Filter state — selections apply IMMEDIATELY (as on hermes.com) -----
  const [fOpen, setFOpen] = useState(false);
  const [mosaic, setMosaic] = useState(false);
  const [visible, setVisible] = useState(40);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [sel, setSel] = useState<Record<FGroup, string[]>>(EMPTY_SEL);
  const [sort, setSort] = useState("relevance");
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [openKey, setOpenKey] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [moreLeaving, setMoreLeaving] = useState(false);
  const [loadedMsg, setLoadedMsg] = useState("");
  const [descOpen, setDescOpen] = useState(false);
  const subNavRef = useRef<HTMLElement>(null);
  // On mount, scroll the sideways sub-nav so the CURRENT sibling is in view
  // (the row itself scrolls horizontally; the page never moves).
  useEffect(() => {
    const navEl = subNavRef.current; if (!navEl) return;
    const cur = navEl.querySelector<HTMLElement>("[data-current='true']"); if (!cur) return;
    navEl.scrollTo({ left: Math.max(0, cur.offsetLeft - 12) });
  }, []);
  const themeRef = useRef<HTMLDivElement>(null);

  const priceLo = base.length ? Math.min(...base.map((p) => p.price)) : 0;
  const priceHi = base.length ? Math.max(...base.map((p) => p.price)) : 0;
  const pMin = priceMin ?? priceLo;
  const pMax = priceMax ?? priceHi;
  const priceNarrowed = pMin > priceLo || pMax < priceHi;

  const filtered = useMemo(() => {
    let list = base.filter((p) =>
      (!onlineOnly || p.status === "available") &&
      (!sel.category.length || sel.category.includes(p.subcategory)) &&
      (!sel.line.length || sel.line.includes(p.line)) &&
      (!sel.material.length || sel.material.includes(p.material)) &&
      (!sel.modelSize.length || sel.modelSize.includes(p.modelSize)) &&
      (!sel.finish.length || sel.finish.includes(p.metallicFinish)) &&
      (!sel.size.length || p.sizeOptions.some((s) => sel.size.includes(s.label))) &&
      (!sel.color.length || p.colors.some((c) => sel.color.includes(colorFamily(c.name)))) &&
      p.price >= pMin && p.price <= pMax);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [base, sel, onlineOnly, sort, pMin, pMax]);

  const totalSel = (Object.keys(EMPTY_SEL) as FGroup[]).reduce((n, g) => n + sel[g].length, 0) + (onlineOnly ? 1 : 0) + (priceNarrowed ? 1 : 0);
  const filtersActive = totalSel > 0;
  // The heading count is always honest: the number of products this store
  // actually carries in this list (the filtered count while filters apply).
  const displayCount = filtersActive ? filtered.length : base.length;

  const toggle = (group: FGroup, val: string) => {
    setSel((s) => ({ ...s, [group]: s[group].includes(val) ? s[group].filter((x) => x !== val) : [...s[group], val] }));
    setVisible(40); setLoadedMsg("");
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
    return [...m.entries()].map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
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

  const secCategory: FSection | null = base.length ? { key: "category", title: "Category", kind: "checks", group: "category", options: countBy((p) => p.subcategory) } : null;
  const secLine: FSection | null = countBy((p) => p.line).length ? { key: "line", title: isRTWPage ? "Collection" : "Line", kind: "checks", group: "line", options: countBy((p) => p.line) } : null;
  const secMaterial: FSection | null = countBy((p) => p.material).length ? { key: "material", title: "Material", kind: "checks", group: "material", options: countBy((p) => p.material) } : null;
  const secModelSize: FSection | null = countBy((p) => p.modelSize).length ? { key: "modelsize", title: "Model size", kind: "checks", group: "modelSize", options: countBy((p) => p.modelSize) } : null;
  const secFinish: FSection | null = countBy((p) => p.metallicFinish).length ? { key: "finish", title: "Metallic finish", kind: "checks", group: "finish", options: countBy((p) => p.metallicFinish) } : null;
  const secSize: FSection | null = sizeOpts.length ? { key: "size", title: "Size", kind: "size", group: "size", options: sizeOpts } : null;
  const secColor: FSection | null = colorOpts.length ? { key: "color", title: "Color", kind: "color", group: "color", options: colorOpts } : null;
  const secPrice: FSection | null = priceHi - priceLo >= 50 ? { key: "price", title: "Price", kind: "price", options: [] } : null;
  const secSort: FSection = { key: "sort", title: "Sort by", kind: "sort", options: [] };
  const sections: FSection[] = [];
  const pushSec = (s: FSection | null) => { if (s) sections.push(s); };
  if (isRTWPage) { pushSec(secLine); pushSec(secSize); pushSec(secCategory); pushSec(secMaterial); pushSec(secColor); pushSec(secPrice); pushSec(secSort); }
  else if (isBagsPage) { pushSec(secCategory); pushSec(secLine); pushSec(secMaterial); pushSec(secModelSize); pushSec(secFinish); pushSec(secColor); pushSec(secPrice); pushSec(secSort); }
  else if (isShoesPage) { pushSec(secLine); pushSec(secMaterial); pushSec(secSize); pushSec(secColor); pushSec(secPrice); pushSec(secSort); }
  else { pushSec(secCategory); pushSec(secLine); pushSec(secMaterial); pushSec(secModelSize); pushSec(secSize); pushSec(secFinish); pushSec(secColor); pushSec(secPrice); pushSec(secSort); }
  const openSection = sections.some((s) => s.key === openKey) ? openKey : (sections[0]?.key ?? "");

  const quickBuyOn = isSneakersPage;

  // Editorial tiles interleaved in the unfiltered grid, as on hermes.com.
  const edText = isBagsPage
    ? { title: "Ready to carry", body: "The leather goods universe — handbags, crossbody bags, totes and clutches in leather, canvas and silk, crafted in the Maison's workshops to be carried every day.", view: { t: "category", cat: "leather", sub: "Bags and clutches" } as View }
    : { title: titleText, body: `The ${titleText.charAt(0).toLowerCase() + titleText.slice(1)} selection — pieces crafted in the Maison's workshops, made to last and to be repaired.`, view: { t: "category", cat } as View };
  const edWide = isBagsPage
    ? { img: kellyImg, alt: "Woman in a dark brown coat holding a tan Kelly bag", lines: ["An extraordinary journey", "The world of leather", "Equestrian style"], view: { t: "category", cat: "leather", sub: "Bags and clutches" } as View }
    : isShoesPage
      ? { img: outdoorsImg, alt: "Woman on a bicycle with a large white Afghan hound in a desert landscape", lines: ["Light on your feet", "Sneakers in calfskin and technical canvas"], view: { t: "category", cat } as View }
      : { img: heroImg, alt: "Hands smoothing a blue patterned blanket against a warm brown stone wall", lines: [titleText, "Discover the collection"], view: { t: "category", cat } as View };
  type GridItem = { kind: "product"; p: Product } | { kind: "text" } | { kind: "wide" };
  const gridItems: GridItem[] = [];
  const showEditorial = !filtersActive && sort === "relevance";
  filtered.slice(0, visible).forEach((p, i) => {
    gridItems.push({ kind: "product", p });
    if (showEditorial && i === 3) gridItems.push({ kind: "text" });
    if (showEditorial && i === 11) gridItems.push({ kind: "wide" });
  });

  const renderSection = (s: FSection) => {
    const isOpen = openSection === s.key;
    const group = s.group;
    const selCount = group ? sel[group].length : 0;
    const span = priceHi - priceLo;
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
                <input type="checkbox" aria-label={`${s.title} ${o.value}`} checked={sel[group].includes(o.value)} onChange={() => toggle(group, o.value)} className="h-4 w-4 shrink-0 accent-black" />
                <span>{o.value} <span className="text-neutral-500">({o.count})</span></span>
              </label>
            ))}
            {s.kind === "color" && group && (
              <div className="grid grid-cols-6 gap-x-1 gap-y-3">
                {s.options.map((o) => {
                  const on = sel[group].includes(o.value);
                  return (
                    <button key={o.value} aria-label={`Color ${o.value} (${o.count})`} aria-pressed={on} className="flex flex-col items-center gap-1" onClick={() => toggle(group, o.value)}>
                      <span className={`h-8 w-8 rounded-full ${on ? "ring-2 ring-black ring-offset-2" : "ring-1 ring-black/20"}`} style={{ background: o.hex ?? "#cccccc" }} />
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
                  const on = sel[group].includes(o.value);
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
                  <div className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-black" style={{ left: `${span > 0 ? ((pMin - priceLo) / span) * 100 : 0}%`, width: `${span > 0 ? ((pMax - pMin) / span) * 100 : 100}%` }} />
                  <input type="range" aria-label="Minimum price" min={priceLo} max={priceHi} step={50} value={pMin} onChange={(e) => { setPriceMin(Math.min(Number(e.target.value), pMax)); setVisible(40); setLoadedMsg(""); }} className="pointer-events-none absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-black [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black" />
                  <input type="range" aria-label="Maximum price" min={priceLo} max={priceHi} step={50} value={pMax} onChange={(e) => { setPriceMax(Math.max(Number(e.target.value), pMin)); setVisible(40); setLoadedMsg(""); }} className="pointer-events-none absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-black [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black" />
                </div>
                <div className="mt-1 flex justify-between text-xs text-neutral-600"><span>{fmt(pMin)}</span><span>{fmt(pMax)}</span></div>
              </div>
            )}
            {s.kind === "sort" && [["relevance", "Relevance"], ["low", "Lowest price"], ["high", "Highest price"]].map(([v = "relevance", l = ""]) => (
              <label key={v} className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm">
                <input type="radio" name="catsort" aria-label={`Sort by ${l}`} checked={sort === v} onChange={() => { setSort(v); setVisible(40); setLoadedMsg(""); }} className="h-4 w-4 accent-black" />{l}
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Plain-text breadcrumb (not links), then the title with its count
          attached directly — no description text at the top. */}
      <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">{crumbTop}</p>
      <h1 className="font-serif-d mt-2 text-3xl">{titleText}<span className="text-xl text-neutral-500"> {displayCount}products</span></h1>

      {/* Sticky sub-nav row: siblings (current underlined) + FILTER button +
          Product/Mosaic view toggle — pinned under the header on scroll.
          ONE line at every width: on mobile the sibling row SCROLLS SIDEWAYS
          (the user's main complaint — it must never wrap to two lines or cut
          items off), the view toggle stays at the right end of the same
          line, and FILTER lives in the floating FILTER & SORT pill instead;
          on desktop the row shows fully with its FILTER button. */}
      <div className="sticky top-[61px] z-30 -mx-4 mt-4 bg-[#f7f2ec] px-4 py-3 sm:-mx-6 sm:px-6 lg:top-[141px]">
        <div className="flex items-center gap-x-4 lg:gap-x-5">
          <nav ref={subNavRef} className="no-scrollbar flex min-w-0 flex-1 gap-5 overflow-x-auto whitespace-nowrap" aria-label="Subcategories">
            {siblings.map((s) => (
              <button key={s.label} data-current={s.current || undefined} aria-label={`Subcategory ${s.label}`} aria-current={s.current || undefined} className={`shrink-0 py-1 text-[12px] tracking-wide ${s.current ? "font-medium text-black underline underline-offset-8" : "text-neutral-600 hover:text-black"}`} onClick={() => go(s.view)}>{s.label}</button>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-4">
            <button aria-label={totalSel ? `Open filters, ${totalSel} selected` : "Open filters"} className="hidden items-center gap-2 py-1 text-[12px] font-semibold uppercase tracking-[0.2em] lg:flex" onClick={() => setFOpen(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 6h12M19 6h2M3 12h4M11 12h10M3 18h9M16 18h5" /><circle cx="17" cy="6" r="2" /><circle cx="9" cy="12" r="2" /><circle cx="14" cy="18" r="2" /></svg>
              FILTER{totalSel > 0 ? ` (${totalSel})` : ""}
            </button>
            <div className="flex items-center gap-1.5" role="radiogroup" aria-label="View toggle">
              <button aria-label="Product view" role="radio" aria-checked={!mosaic} className={`flex h-8 w-8 items-center justify-center ${!mosaic ? "bg-black text-white" : "text-neutral-500 hover:text-black"}`} onClick={() => setMosaic(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="3" width="8" height="8" /><rect x="13" y="3" width="8" height="8" /><rect x="3" y="13" width="8" height="8" /><rect x="13" y="13" width="8" height="8" /></svg>
              </button>
              <button aria-label="Mosaic view" role="radio" aria-checked={mosaic} className={`flex h-8 w-8 items-center justify-center ${mosaic ? "bg-black text-white" : "text-neutral-500 hover:text-black"}`} onClick={() => setMosaic(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="3" width="11" height="7" /><rect x="16" y="3" width="5" height="11" /><rect x="3" y="12" width="6" height="9" /><rect x="11" y="12" width="5" height="5" /><rect x="11" y="19" width="10" height="2" /></svg>
              </button>
            </div>
          </div>
        </div>
        {filtersActive && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-black/10 pt-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Selected filters</span>
            {pills.map((pl) => (
              <button key={`${pl.group}-${pl.value}`} aria-label={`Remove this filter ${pl.label}`} className="flex items-center gap-1.5 border border-black/40 bg-white px-2.5 py-1 text-xs" onClick={() => removePill(pl)}>
                {pl.label}<span aria-hidden="true">✕</span>
              </button>
            ))}
            <button aria-label="Clear filters applied" className="text-xs underline underline-offset-4" onClick={clearFilters}>Clear filters applied</button>
          </div>
        )}
      </div>

      {filtered.length === 0 && <p className="py-16 text-center text-sm text-neutral-600">{sub ? `No articles in “${sub}” in this store yet.` : "No articles match these filters. Clear a filter to see more."}</p>}

      {!mosaic ? (
        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {gridItems.map((it) => it.kind === "product" ? (
            <ProductCard key={it.p.id} p={it.p} colourInName onOpen={(id) => go({ t: "product", id })} onQuickBuy={quickBuyOn && isSneakerProduct(it.p) ? (prod) => addToCart(prod) : undefined} />
          ) : it.kind === "text" ? (
            <div key="ed-text" className="flex aspect-square flex-col justify-center bg-[#efe9df] p-6">
              <p className="font-serif-d text-xl italic">{edText.title}</p>
              <p className="mt-3 text-sm leading-6 text-neutral-700">{edText.body}</p>
              <button aria-label={`Discover ${edText.title}`} className="mt-4 self-start text-[11px] font-semibold uppercase tracking-[0.22em] underline underline-offset-4" onClick={() => go(edText.view)}>Discover</button>
            </div>
          ) : (
            <div key="ed-wide" className="relative col-span-2 min-h-[240px] overflow-hidden">
              <img src={edWide.img} alt={edWide.alt} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 px-6 text-center text-white">
                {edWide.lines.map((l) => <p key={l} className="font-serif-d text-xl italic leading-snug sm:text-2xl">{l}</p>)}
                <button aria-label="Discover the collection" className="mt-4 border border-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em]" onClick={() => go(edWide.view)}>Discover</button>
              </div>
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
          <p className="mt-4 text-center text-xs text-neutral-500">{filtered.length} products viewed out of {filtered.length}</p>
        </div>
      )}

      {loadingMore && <LoadingVeil leaving={moreLeaving} ms={2200} />}
      {!mosaic && visible < filtered.length && (
        <div className="mt-12 text-center">
          <button aria-label={loadingMore ? "Loading, please wait." : "See more products"} disabled={loadingMore} className="border border-black px-10 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] disabled:opacity-60" onClick={() => { setLoadingMore(true); setMoreLeaving(false); setTimeout(() => setMoreLeaving(true), 100); setTimeout(() => { const next = Math.min(visible + 40, filtered.length); const added = next - visible; setVisible(next); setLoadingMore(false); setMoreLeaving(false); setLoadedMsg(`${added} products added. ${next} out of ${filtered.length} displayed`); }, 2200); }}>SEE MORE PRODUCTS</button>
          <div className="mx-auto mt-5 h-px w-64 bg-black/15"><div className="h-full bg-black transition-all" style={{ width: `${filtered.length ? (Math.min(visible, filtered.length) / filtered.length) * 100 : 0}%` }} /></div>
          <p className="mt-2 text-xs text-neutral-500">{Math.min(visible, filtered.length)} products viewed</p>
          {loadedMsg && <p className="mt-1 text-xs text-neutral-500" role="status">{loadedMsg}</p>}
        </div>
      )}
      {!mosaic && visible >= filtered.length && filtered.length > 40 && (
        <div className="mt-12 text-center">
          <div className="mx-auto h-px w-64 bg-black" />
          <p className="mt-2 text-xs text-neutral-500">{filtered.length} products viewed out of {filtered.length}</p>
          {loadedMsg && <p className="mt-1 text-xs text-neutral-500" role="status">{loadedMsg}</p>}
        </div>
      )}

      {/* Below the grid: linked breadcrumb → Product theme carousel →
          (women's bags only) category description → service strip/footer. */}
      <nav aria-label="Breadcrumb" className="mt-16 border-t border-black/10 pt-5 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
        <button aria-label={`Breadcrumb ${label}`} className="underline-offset-4 hover:underline" onClick={() => go({ t: "category", cat })}>{label}</button>
        {sub && (
          <>
            {" / "}
            <button aria-label={`Breadcrumb ${isBagsPage ? "Bags and clutches" : (base[0]?.subcategory ?? sub)}`} className="underline-offset-4 hover:underline" onClick={() => go({ t: "category", cat, sub: isBagsPage ? "Bags and clutches" : sub })}>{(isBagsPage ? "Bags and clutches" : (base[0]?.subcategory ?? sub)).toUpperCase()}</button>
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
      <section className="mt-12" aria-label="Product theme carousel">
        <div ref={themeRef} className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-1">
          {THEME_CARDS.map((card) => {
            const rep = products.find((p) => p.category === (card.view.t === "category" ? card.view.cat : ""));
            return (
              <button key={card.label} data-theme-card aria-label={`Product theme ${card.label}`} className="w-[42%] shrink-0 snap-start text-left sm:w-[23%] lg:w-[18.6%]" onClick={() => go(card.view)}>
                <span className="block aspect-[4/3] overflow-hidden bg-[#ece7dd]">{rep && <img src={productImageFor(rep)} alt="" className="h-full w-full object-cover" />}</span>
                <span className="mt-2 block text-sm">{card.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {isWomensBags && (
        <section className="mt-12 max-w-3xl">
          <p className={`text-sm leading-7 text-neutral-700 ${descOpen ? "" : "line-clamp-2"}`}>From the Hermès Geta, with its distinctive H-shaped clasp, to the Neo Garden and its relaxed, generous silhouette, the women's bags and clutches collection is crafted in the Maison's workshops. Handbags, crossbody bags, totes and clutches in leather, canvas and silk — objects made to be carried every day, made to last, and made to be repaired.</p>
          <button aria-label={descOpen ? "See less about the collection" : "See more about the collection"} className="mt-2 text-xs underline underline-offset-4" onClick={() => setDescOpen(!descOpen)}>{descOpen ? "See Less" : "See More"}</button>
        </section>
      )}

      <button aria-label="Filter and sort products" className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 bg-white px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] shadow-lg ring-1 ring-black/10 lg:hidden" onClick={() => setFOpen(true)}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2.2" /><circle cx="10" cy="17" r="2.2" /></svg>
        Filter &amp; Sort
      </button>

      {fOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setFOpen(false)}>
          <div className="drawer-in absolute flex flex-col bg-white max-lg:inset-x-0 max-lg:bottom-0 max-lg:max-h-[88vh] lg:right-0 lg:top-0 lg:h-full lg:w-[33vw] lg:min-w-[380px] lg:max-w-[520px]" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Filter">
            <div className="flex items-center justify-between px-6 pt-5">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.25em]">FILTER</h2>
              <button aria-label="Close filters" className="flex items-center gap-1.5 py-1 text-sm" onClick={() => setFOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
                Close
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-4">
              <p className="mt-3 text-xs leading-5 text-neutral-500">Selecting a filter will apply the update to the results you are currently visiting.</p>
              <div className="mt-4 flex items-start justify-between gap-4 border-t border-black/10 pt-4">
                <div>
                  <p className="text-sm font-medium">Available online</p>
                  <p className="mt-0.5 text-xs text-neutral-500">Only view products which are available online</p>
                </div>
                <button type="button" role="switch" aria-checked={onlineOnly} aria-label="Available online" onClick={() => { setOnlineOnly(!onlineOnly); setVisible(40); setLoadedMsg(""); }} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${onlineOnly ? "bg-black" : "bg-black/25"}`}>
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${onlineOnly ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </div>
              {sections.map(renderSection)}
            </div>
            <div className="border-t border-black/10 px-6 py-4">
              <button aria-label="Apply filters" className="w-full bg-black py-3.5 text-[12px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => setFOpen(false)}>APPLY</button>
              {totalSel > 0 && <button aria-label="Clear filters" className="mt-3 w-full py-1 text-center text-[12px] uppercase tracking-[0.2em] underline underline-offset-4" onClick={clearFilters}>CLEAR</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RelatedRow({ title, items, go }: { title: string; items: Product[]; go: (v: View) => void }) {
  if (items.length === 0) return null;
  return (
    <section className="mx-auto mt-14 max-w-5xl px-4 sm:px-6">
      {/* Heading as in the user's video: large italic serif, centred
          ("The Perfect Partner"). Tiles are LARGE on mobile — a 2-column
          grid of big photos, nearly full-width halves — and a 4-across
          horizontal row on desktop. */}
      <h2 className="font-serif-d text-center text-[26px] italic leading-snug sm:text-[30px]">{title}</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:flex lg:overflow-x-auto lg:pb-1">
        {items.map((x) => (
          <div key={x.id} className="cursor-pointer lg:w-[220px] lg:shrink-0" role="link" aria-label={`${x.name}, ${priceText(x)}`} tabIndex={0} onClick={() => go({ t: "product", id: x.id })} onKeyDown={(e) => { if (e.key === "Enter") go({ t: "product", id: x.id }); }}>
            <div className="aspect-square overflow-hidden"><ProductVisual p={x} /></div>
            <p className="mt-3 text-sm">{x.name}</p>
            {x.colors[0] && <p className="mt-0.5 text-xs text-neutral-500">Color: {x.colors[0].name}</p>}
            <p className="mt-0.5 text-sm">{priceText(x)}</p>
          </div>
        ))}
      </div>
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

function ProductView({ products, id, go, addToCart, settings, user }: { products: Product[]; id: number; go: (v: View) => void; addToCart: (p: Product, c?: string, s?: string, q?: number) => void; settings: Settings; user: { name: string; email: string } | null }) {
  const p = products.find((x) => x.id === id) ?? products[0];
  // Finish options (e.g. the Kelly Pocket belt's Gold / Argenté buckle group)
  // ride in a detail line so no schema change is needed; the selected finish
  // is the product's metallicFinish.
  const finishLine = p?.detailLines.find((l) => l.startsWith("Finish options:"));
  const finishOptions = finishLine ? finishLine.replace("Finish options:", "").split(",").map((s) => s.trim()).filter(Boolean) : [];
  const [colorIdx, setColorIdx] = useState(0);
  const [showAllColors, setShowAllColors] = useState(false);
  const [thumb, setThumb] = useState(0);
  const [vidPlaying, setVidPlaying] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [sizeDrawer, setSizeDrawer] = useState(false);
  const [selSize, setSelSize] = useState("");
  const [sizeGone, setSizeGone] = useState(false);
  const [finishIdx, setFinishIdx] = useState(() => { const i = finishOptions.indexOf(p?.metallicFinish ?? ""); return i >= 0 ? i : 0; });
  const [notifyEmail, setNotifyEmail] = useState(user?.email ?? "");
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notified, setNotified] = useState("");
  const [accOpen, setAccOpen] = useState(-1);
  const [wishMsg, setWishMsg] = useState("");
  const [lastViewed, setLastViewed] = useState<Product[]>([]);
  const [tiePlaying, setTiePlaying] = useState(false);
  const [tieMuted, setTieMuted] = useState(true);
  const [tieVol, setTieVol] = useState(50);
  const [tieProg, setTieProg] = useState(0);
  const tieRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const notifyMut = useMutation({ mutationFn: () => api.requestNotify({ productId: p?.id ?? 0, productName: p?.name ?? "", email: notifyEmail }), onSuccess: () => setNotified("Thank you — we will notify you when this product is back in stock.") });
  const wishMut = useMutation({ mutationFn: () => api.toggleWishlist({ email: user?.email ?? "", productId: p?.id ?? 0, productName: p?.name ?? "" }), onSuccess: (r) => setWishMsg(r.added ? "Added to your wishlist." : "Removed from your wishlist.") });
  useEffect(() => {
    if (!p) return;
    api.recordProductView({ productId: p.id }).catch(() => {});
    try {
      const raw = JSON.parse(localStorage.getItem("hlx-last-viewed") || "[]") as number[];
      const ids = [p.id, ...raw.filter((x) => x !== p.id)].slice(0, 9);
      localStorage.setItem("hlx-last-viewed", JSON.stringify(ids));
      setLastViewed(ids.slice(1).map((i) => products.find((x) => x.id === i)).filter((x): x is Product => !!x).slice(0, 4));
    } catch { /* ignore */ }
  }, [p?.id]);
  useEffect(() => {
    // Stop the video only when LEAVING the video view. Selecting the video
    // view must NOT reset vidPlaying: the tap sets thumb to the video view
    // AND vidPlaying to true, and an unconditional reset here would
    // immediately clobber vidPlaying back to false, so the first tap to
    // play would do nothing and the video would sit frozen on its poster.
    const isVideoView = galleryForProduct(p, colorIdx)[thumb]?.video;
    if (!isVideoView) setVidPlaying(false);
    stripRef.current?.querySelectorAll<HTMLElement>("[data-panel]")[thumb]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [thumb]);
  useEffect(() => { if (!zoomOpen) return; const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomOpen(false); }; document.addEventListener("keydown", onKey); return () => document.removeEventListener("keydown", onKey); }, [zoomOpen]);
  useEffect(() => { if (!tiePlaying) return; const t = window.setInterval(() => setTieProg((v) => (v + 1) % 101), 120); return () => window.clearInterval(t); }, [tiePlaying]);
  if (!p) return <p className="p-10 text-center">Product not found.</p>;
  const moreMatch = p.detailLines.join(" ").match(/\+(\d+) more/);
  const moreColors = moreMatch ? Number(moreMatch[1]) : null;
  const color = p.colors[colorIdx] ?? p.colors[0];
  const isShoe = p.subcategory === "Shoes" || /sneaker|boot|loafer/i.test(p.name);
  const isRTW = p.subcategory.toLowerCase().includes("ready") || p.subcategory === "Dresses and skirts" || (p.category === "equestrian" && /jacket/i.test(p.name));
  const hasCustomSizes = (p.sizeOptions?.length ?? 0) > 0;
  const needsSize = isShoe || isRTW || hasCustomSizes;
  const sizeList: { label: string; available: boolean }[] = hasCustomSizes ? p.sizeOptions : isShoe ? ["40", "41", "42", "43", "44", "45"].map((label) => ({ label, available: true })) : ["XS", "S", "M", "L", "XL"].map((label) => ({ label, available: true }));
  const canAdd = p.status === "available" && !sizeGone && (!needsSize || selSize !== "");
  // Gallery views — EVERY view is a DISTINCT photo whose content matches
  // its label (Detail = extreme close-up, Worn = model wearing it, Above =
  // top-down, Back = rear, Side = profile), shot for that view in
  // galleryImages.ts. The old build reused the product's single tile photo
  // for every view with CSS rotate/scale transforms — that was the user's
  // exact complaint ("2nd and 3rd photos are in the wrong style or just
  // repeat the first"). Colour switch reloads the WHOLE gallery with the
  // selected colourway's own photos and backgrounds, thumbnails included.
  type GalView = { label: string; src: string; video?: boolean; videoSrc?: string };
  const views: GalView[] = galleryForProduct(p, colorIdx);
  const curView = views[thumb] ?? views[0];
  // Colour switch reloads the WHOLE gallery: the new colourway's own view
  // photos replace every panel and thumbnail, the gallery returns to its
  // first view and any playing video stops.
  const galleryKey = views.map((v) => v.src).join("|");
  useEffect(() => { setThumb(0); setVidPlaying(false); stripRef.current?.scrollTo({ left: 0 }); }, [galleryKey]);
  const finishHex = (f: string) => (/argent|silver|palladium/i.test(f) ? "#c9c9c9" : /pink|rose/i.test(f) ? "#e0a899" : "#c9a227");
  const finishSel = finishOptions[finishIdx] ?? finishOptions[0] ?? "";
  const descLines = p.detailLines.filter((l) => !l.startsWith("Finish options:") && !/\+\d+ more/.test(l) && !l.startsWith("Also available as"));
  const editorial = p.story && !p.story.startsWith("The story behind") ? p.story : "";
  const isScarfStory = p.name.includes("Philateliste");
  const partnerPool = products.filter((x) => x.id !== p.id);
  const partners = [...partnerPool.filter((x) => x.name === p.name), ...partnerPool.filter((x) => x.name !== p.name && x.theme !== "" && x.theme === p.theme), ...partnerPool.filter((x) => x.name !== p.name && x.category === p.category && x.subcategory === p.subcategory)].filter((x, i, a) => a.findIndex((y) => y.id === x.id) === i).slice(0, 4);
  const partnerIds = new Set(partners.map((x) => x.id));
  const explore = partnerPool.filter((x) => x.category === p.category && !partnerIds.has(x.id)).filter((x, i, a) => a.findIndex((y) => y.name.toLowerCase() === x.name.toLowerCase()) === i).slice(0, 4);
  const thumbBtn = (v: GalView, i: number) => (
    <button key={v.label + i} aria-label={`Gallery thumbnail ${v.label}${v.video ? " (video)" : ""}`} aria-current={thumb === i} className="relative h-12 w-10 shrink-0 bg-white ring-1 ring-black/15" onClick={() => setThumb(i)}>
      <span className="absolute inset-0 overflow-hidden">
        <img src={v.src} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        {v.video && <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-[10px] text-white" aria-hidden="true">▶</span>}
      </span>
      {thumb === i && <span className="absolute inset-x-0 -bottom-[5px] h-[2px] bg-black" aria-hidden="true" />}
    </button>
  );
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
      {p.madeIn && <p className="mt-1.5">Made in {p.madeIn}</p>}
      {descLines.length === 0 && !p.material && <p>See the product description for this article's details.</p>}
    </>) },
    { title: "CARE", content: <>Preserve the original qualities of this article by avoiding contact with water, perfume and cosmetics. Store it in its original case, away from direct light and heat, and entrust maintenance to a Hermès boutique.</> },
    { title: "DELIVERY & RETURNS", content: (<>
      <p className="font-semibold text-black">Shipping</p>
      <p className="mt-1">Complimentary ground shipping within 1 to 10 business days for items up to $2,000. Ship to a store for collection with 2 Day delivery. Express delivery is required for orders greater than $2,000. Items greater than $25,000 require white glove delivery. Purchases are delivered in an orange box tied with a Bolduc ribbon, with the exception of certain items. Select items require ground shipping. See the delivery <button aria-label="Delivery FAQs" className="underline underline-offset-2" onClick={() => go({ t: "page", page: "faq" })}>FAQs</button> for details on shipping methods, costs and delivery times.</p>
      <p className="mt-4 font-semibold text-black">Payment methods</p>
      <p className="mt-1">By card: Visa®, MasterCard®, American Express®, Discover®, Diners Club®, JCB® and China Union Pay®. By PayPal® and Apple Pay®. Payment is debited immediately for personalized product.</p>
      <p className="mt-4 font-semibold text-black">Returns and exchanges</p>
      <p className="mt-1">Easy and complimentary, within 30 days. We recommend that you try your shoes on non-abrasive or carpeted surfaces. We will not be able to accept your return if the sole is damaged or marked. The Hermès Sellier tag must be intact, attached, and free of any alteration or damage. Personalized product cannot be refunded or exchanged. See conditions and procedure in our return FAQs.</p>
    </>) },
    { title: "GIFTING", content: <>Your purchases are delivered in an orange box tied with a Bolduc ribbon, with the exception of fragrances, makeup and beauty products, books, certain equestrian and bulky items. During checkout, you can include one card with a personalized message and a priceless invoice. The gift recipient can exchange a gift. For more details, please contact Customer Service.</> },
    // USER GUIDE — only the Arceau watch carries it on hermes.com (the
    // product's own accordions list in data.ts proves it: Arceau Petite
    // Lune, id 53). Content is the watch user guide already in this file.
    ...(p.accordions?.includes("USER GUIDE") ? [{ title: "USER GUIDE", content: <>Watch user guide: pull the crown to set the time; keep away from magnetic fields; service every 3–5 years.</> }] : []),
  ];
  return (
    <div className="pb-24 lg:pb-6">
      <p className="mx-auto max-w-7xl px-4 pt-8 text-[11px] uppercase tracking-[0.25em] text-neutral-500 sm:px-6">
        <button aria-label="Back to category" className="underline-offset-4 hover:underline" onClick={() => go({ t: "category", cat: p.category })}>{(NAV.find((n) => n.key === p.category)?.label ?? p.category.toUpperCase())}</button> &gt; <button aria-label={`Back to ${p.subcategory}`} className="underline-offset-4 hover:underline" onClick={() => go({ t: "category", cat: p.category, sub: p.subcategory })}>{p.subcategory}</button>
      </p>
      <div className="relative mt-4">
        {/* Gallery — a wide horizontal strip of large panels, nearly
            full-bleed, with the thumbnail strip at its BOTTOM-LEFT corner
            (selected thumbnail underlined). Clicking a photo opens the
            full-screen IMAGE GALLERY dialog. A video view never autoplays:
            selecting it starts it, with only the small white square
            play/pause toggle. There is NO quantity selector on a product
            page — quantity is changed in the cart only. */}
        <div className="relative">
          <div ref={stripRef} className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto" role="group" aria-label="Product gallery">
            {views.map((v, i) => (
              <div key={v.label + i} data-panel data-viewsrc={v.src} className={`relative aspect-[3/4] w-[82%] shrink-0 snap-center overflow-hidden bg-[#efe9df] sm:w-[48%] lg:w-[33.5%] ${thumb === i ? "ring-1 ring-black/50" : ""}`}>
                {v.video ? (
                  <button aria-label={vidPlaying && thumb === i ? "Pause video" : "Play video"} aria-pressed={vidPlaying && thumb === i} className="relative block h-full w-full" onClick={() => { if (thumb === i) setVidPlaying(!vidPlaying); else { setThumb(i); setVidPlaying(true); } }}>
                    {v.videoSrc ? (
                      <ProductVideo src={v.videoSrc} poster={v.src} playing={vidPlaying && thumb === i && !zoomOpen} className="h-full w-full object-cover" />
                    ) : (
                      <img src={v.src} alt={`${p.name} — video`} className={`h-full w-full object-cover ${vidPlaying && thumb === i ? "dress-walk" : ""}`} />
                    )}
                    {!(vidPlaying && thumb === i) && <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5-13-7.5Z" /></svg></span></span>}
                    <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-white text-black shadow" aria-hidden="true">
                      {vidPlaying && thumb === i
                        ? <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="5" height="16" /><rect x="14" y="4" width="5" height="16" /></svg>
                        : <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5-13-7.5Z" /></svg>}
                    </span>
                  </button>
                ) : (
                  <button aria-label={`View ${v.label} — open image gallery`} className="block h-full w-full cursor-zoom-in" onClick={() => { setThumb(i); setZoomLevel(2); setZoomOpen(true); }}>
                    <img src={v.src} alt={`${p.name} — ${v.label} view`} className="h-full w-full object-cover" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 left-3 z-20 flex gap-1.5" role="group" aria-label="Gallery thumbnails">
            {views.map((v, i) => thumbBtn(v, i))}
          </div>
        </div>
        {/* Buy box — a WHITE CARD floating over the BOTTOM-RIGHT of the
            gallery on desktop; below the gallery on mobile, as in the
            user's phone videos of hermes.com. */}
        <div className="relative z-10 mx-4 mt-4 border border-black/10 bg-white p-6 shadow-xl lg:absolute lg:bottom-6 lg:right-6 lg:mx-0 lg:mt-0 lg:w-[380px]">
          <h1 className="font-serif-d text-[24px] leading-snug">{p.name}</h1>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-sm text-neutral-600">Price</span>
            <span className="text-base">{priceText(p)}</span>
          </div>
          {p.colors.length > 0 && color && (
            <>
              <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-neutral-500">Color</p>
              <p className="mt-1 text-sm font-medium underline underline-offset-4">{color.name}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {(showAllColors ? p.colors : p.colors.slice(0, 6)).map((c, i) => (
                  <button key={c.name} aria-label={`Colour ${c.name}${c.available && p.status === "available" ? "" : " (unavailable)"}`} disabled={!c.available || p.status !== "available"} onClick={() => { setColorIdx(i); setThumb(0); setVidPlaying(false); }}
                    className={`relative h-9 w-9 rounded-full border-2 ${i === colorIdx ? "border-black" : "border-black/20"} ${!c.available || p.status !== "available" ? "opacity-40" : ""}`} style={{ background: c.hex }}>
                    {(!c.available || p.status !== "available") && <span className="absolute inset-0 flex items-center justify-center text-white">✕</span>}
                  </button>
                ))}
                {!showAllColors && (p.colors.length > 6 || moreColors) && (
                  <button aria-label={moreColors ? `${moreColors} more colors, show all` : "Show all colors"} className="flex h-9 min-w-9 items-center justify-center bg-neutral-800 px-2 text-[11px] font-semibold text-white" onClick={() => setShowAllColors(true)}>+{moreColors ?? (p.colors.length - 6)}</button>
                )}
                {showAllColors && moreColors && <span className="text-[11px] text-neutral-500">{moreColors} more colors available in store</span>}
              </div>
            </>
          )}
          {finishOptions.length > 0 && (
            <>
              <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-neutral-500">Finish</p>
              <p className="mt-1 text-sm font-medium underline underline-offset-4">{finishSel}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {finishOptions.map((f, i) => (
                  <button key={f} aria-label={`Finish ${f}`} aria-pressed={i === finishIdx} onClick={() => setFinishIdx(i)} className={`h-9 w-9 rounded-full border-2 ${i === finishIdx ? "border-black" : "border-black/20"}`} style={{ background: finishHex(f) }} />
                ))}
              </div>
            </>
          )}
          {p.status === "available" && needsSize && (
            <div className="mt-5">
              <button aria-label="Select a size" className="flex w-full items-center justify-between border border-black/40 px-4 py-3 text-sm" onClick={() => setSizeDrawer(true)}>
                <span className="flex items-center gap-2.5">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 17 17 3l4 4L7 21l-4-4Z" /><path d="M8 16l1.5 1.5M11 13l1.5 1.5M14 10l1.5 1.5" /></svg>
                  {selSize ? `Size — ${selSize}` : "Select a size"}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m5 9 7 7 7-7" /></svg>
              </button>
              {!selSize && !sizeGone && <p className="mt-1.5 text-xs text-neutral-500">Please choose a size before adding to cart.</p>}
              {sizeGone && <p className="mt-1.5 text-xs font-medium text-red-700" role="status">The desired size is no longer available</p>}
            </div>
          )}
          {p.status === "available" ? (
            <div className="mt-5">
              <div className="flex">
                {p.applePay && <button aria-label="Buy with Apple Pay" disabled={!canAdd} className={`flex flex-1 items-center justify-center gap-1.5 border py-3.5 text-[13px] font-semibold ${canAdd ? "border-black bg-white text-black" : "cursor-not-allowed border-black/20 bg-neutral-100 text-neutral-400"}`} onClick={() => { if (canAdd) addToCart(p, color?.name, needsSize ? selSize : p.modelSize); }}><span className="text-[11px] font-medium uppercase tracking-[0.08em]">Buy with</span><svg width="15" height="15" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg><span>Pay</span></button>}
                <button aria-label="Add to cart" disabled={!canAdd} className={`flex flex-1 items-center justify-center gap-2 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white ${canAdd ? "bg-black" : "cursor-not-allowed bg-neutral-400"}`} onClick={() => { if (canAdd) addToCart(p, color?.name, needsSize ? selSize : p.modelSize); }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 8h14l-1.2 12.2a1.8 1.8 0 0 1-1.8 1.6H8a1.8 1.8 0 0 1-1.8-1.6L5 8Z" /><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" /></svg>Add to cart</button>
              </div>
              {p.shippingDelay && <p className="mt-2 text-xs text-neutral-500">{p.shippingDelay}.</p>}
              <div className="mt-3">{user ? <button aria-label="Add to wishlist" className="text-xs uppercase tracking-[0.18em] underline" onClick={() => wishMut.mutate()}>♡ Add to wishlist</button> : <button aria-label="Sign in for wishlist" className="text-xs uppercase tracking-[0.18em] underline" onClick={() => go({ t: "account" })}>♡ Sign in to add to wishlist</button>}{wishMsg && <p className="mt-1 text-xs" role="status">{wishMsg}</p>}</div>
            </div>
          ) : p.status === "in_store_only" ? (
            <p className="mt-5 border border-black/20 p-3 text-sm">This article is available in store only. Please visit a boutique or call <a className="underline" href={`tel:${settings.phone}`}>{settings.phone}</a>.</p>
          ) : (
            <div className="mt-5">
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
          )}
        </div>
      </div>

      {/* Below the gallery — description LEFT (always open), accordions
          RIGHT: exactly PRODUCT DETAILS / CARE / DELIVERY & RETURNS /
          GIFTING (the user's 8 Nov 2026 phone video restored PRODUCT
          DETAILS), all closed by default, only one open at a time. */}
      <div className="mx-auto mt-12 grid max-w-5xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <section>
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.25em]">Product description</h3>
          <p className="mt-4 text-sm leading-7 text-neutral-800">{p.description}</p>
          {editorial && <p className="font-serif-d mt-4 text-[17px] italic leading-7">{editorial}</p>}
          {descLines.length > 0 && (
            <div className="mt-4 space-y-1 text-sm leading-6 text-neutral-700">
              {descLines.map((l) => <p key={l}>{l}</p>)}
            </div>
          )}
          {p.refCode && <p className="mt-4 text-xs text-neutral-500">Product reference: {p.refCode}</p>}
          <p className="mt-4 text-sm">Like to know more? <button aria-label="Contact Customer Service" className="underline underline-offset-4" onClick={() => go({ t: "page", page: "contact" })}>Contact Customer Service</button></p>
        </section>
        <div>
          {accItems.map((it, i) => (
            <div key={it.title} className="border-t border-black/10 last:border-b">
              <button aria-label={`${it.title} section`} aria-expanded={accOpen === i} className="flex w-full items-center justify-between py-4 text-left text-[11px] font-semibold uppercase tracking-[0.22em]" onClick={() => setAccOpen(accOpen === i ? -1 : i)}>
                {it.title}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={accOpen === i ? "rotate-180 transition-transform" : "transition-transform"}><path d="m5 9 7 7 7-7" /></svg>
              </button>
              {accOpen === i && <div className="pb-5 text-sm leading-6 text-neutral-700">{it.content}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* NOTE (2026-11-10): the original "tying your Twilly" video for this
          scarf (a 16-second clip below the description on hermes.com) could
          NOT be wired in yet — its video URL is not in any product asset
          list and the scarf page HTML is Cloudflare-blocked, so no verified
          video URL exists for it. Until one is found, the motion stays
          recreated in-app on the product photo (slow pan); the controls
          match the real ones. */}
      {isScarfStory && (
        <section className="mx-auto mt-12 max-w-5xl px-4 sm:px-6">
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.25em]">Play the illustration video</h2>
          <div ref={tieRef} className="relative mt-4 overflow-hidden" style={{ background: "#efe9df" }}>
            <img src={productImageFor(p)} alt={`${p.name} — illustration video`} className={`aspect-video w-full object-cover ${tiePlaying ? "dress-walk" : ""}`} />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-black/55 px-3 py-2 text-white sm:gap-3">
              <button aria-label={tiePlaying ? "Pause illustration video" : "Play illustration video"} aria-pressed={tiePlaying} className="flex h-8 w-8 shrink-0 items-center justify-center" onClick={() => setTiePlaying(!tiePlaying)}>
                {tiePlaying
                  ? <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="5" height="16" /><rect x="14" y="4" width="5" height="16" /></svg>
                  : <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5-13-7.5Z" /></svg>}
              </button>
              <button aria-label={tieMuted ? "Unmute illustration video" : "Mute illustration video"} className="shrink-0 text-[11px] uppercase tracking-wider" onClick={() => setTieMuted(!tieMuted)}>{tieMuted ? "Unmute" : "Mute"}</button>
              <label className="hidden shrink-0 items-center gap-1.5 text-[11px] uppercase tracking-wider sm:flex">Volume
                <input aria-label="Volume level" type="range" min={0} max={100} value={tieVol} onChange={(e) => { setTieVol(Number(e.target.value)); if (Number(e.target.value) > 0) setTieMuted(false); }} className="w-16 accent-white" />
              </label>
              <div className="h-1 min-w-8 flex-1 bg-white/30" role="progressbar" aria-label="Video progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={tieProg}><div className="h-full bg-white transition-[width] duration-150" style={{ width: `${tieProg}%` }} /></div>
              <button aria-label="Fullscreen illustration video" className="flex h-8 w-8 shrink-0 items-center justify-center" onClick={() => { tieRef.current?.requestFullscreen?.().catch(() => {}); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
              </button>
            </div>
          </div>
          <p className="font-serif-d mt-5 text-xl italic">The art and craft of tying your Twilly</p>
          <button aria-label="Over a thousand ways to tie your scarf" className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] underline underline-offset-4" onClick={() => go({ t: "page", page: "guides" })}>Over a thousand ways to tie your scarf</button>
        </section>
      )}

      <RelatedRow title="The Perfect Partner" items={partners} go={go} />
      <RelatedRow title="Keep exploring" items={explore} go={go} />
      <RelatedRow title="Last viewed products" items={lastViewed} go={go} />

      <nav aria-label="Breadcrumb" className="mx-auto mt-14 max-w-5xl border-t border-black/10 px-4 pt-5 text-[11px] uppercase tracking-[0.2em] text-neutral-500 sm:px-6">
        <button aria-label={`Breadcrumb ${NAV.find((n) => n.key === p.category)?.label ?? p.category}`} className="underline-offset-4 hover:underline" onClick={() => go({ t: "category", cat: p.category })}>{NAV.find((n) => n.key === p.category)?.label ?? p.category.toUpperCase()}</button>
        {" > "}
        <button aria-label={`Breadcrumb ${p.subcategory}`} className="underline-offset-4 hover:underline" onClick={() => go({ t: "category", cat: p.category, sub: p.subcategory })}>{p.subcategory}</button>
        {" > "}
        <span className="text-black">{p.name}</span>
      </nav>

      {/* Full-screen IMAGE GALLERY dialog — large image, Close X top-right,
          Zoom in / Zoom out buttons and a ZOOM slider (default 2), an image
          counter, and the same thumbnail strip at the bottom-left. */}
      {zoomOpen && curView && (
        <div className="fixed inset-0 z-[80] flex flex-col" style={{ background: "#f7f2ec" }} role="dialog" aria-label="Image gallery">
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">Image Gallery</span>
            <button aria-label="Close image gallery" className="flex h-10 w-10 items-center justify-center" onClick={() => setZoomOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-28">
            {curView.video ? (
              <button aria-label={vidPlaying ? "Pause video" : "Play video"} aria-pressed={vidPlaying} className="relative block max-h-full" onClick={() => setVidPlaying(!vidPlaying)}>
                {curView.videoSrc ? (
                  <ProductVideo src={curView.videoSrc} poster={curView.src} playing={vidPlaying} className="max-h-[62vh] w-auto object-contain" />
                ) : (
                  <img src={curView.src} alt={`${p.name} — video`} className={`max-h-[62vh] w-auto object-contain ${vidPlaying ? "dress-walk" : ""}`} />
                )}
                {!vidPlaying && <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5-13-7.5Z" /></svg></span></span>}
              </button>
            ) : (
              <img src={curView.src} alt={`${p.name} — ${curView.label} view`} className="max-h-full max-w-full object-contain transition-transform duration-300" style={{ transform: `scale(${zoomLevel})` }} />
            )}
            <div className="absolute bottom-4 left-4 flex gap-1.5" role="group" aria-label="Image gallery thumbnails">
              {views.map((v, i) => thumbBtn(v, i))}
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 px-3 py-2 shadow ring-1 ring-black/10 sm:gap-3">
              <button aria-label="Zoom out" className="flex h-8 w-8 items-center justify-center border border-black/30 text-lg leading-none" onClick={() => setZoomLevel(Math.max(1, Math.round((zoomLevel - 0.25) * 100) / 100))}>−</button>
              <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]">Zoom
                <input aria-label="Zoom level" type="range" min={1} max={3} step={0.1} value={zoomLevel} onChange={(e) => setZoomLevel(Number(e.target.value))} className="w-24 accent-black sm:w-32" />
              </label>
              <button aria-label="Zoom in" className="flex h-8 w-8 items-center justify-center border border-black/30 text-lg leading-none" onClick={() => setZoomLevel(Math.min(3, Math.round((zoomLevel + 0.25) * 100) / 100))}>+</button>
              <span className="text-xs text-neutral-600" aria-live="polite">{thumb + 1} / {views.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* "Select a size" — a slide-in drawer from the RIGHT, as on
          hermes.com. Unavailable sizes are grey, crossed out and marked
          Unavailable; choosing an available size closes the drawer and
          fills the buy-box size button. */}
      {sizeDrawer && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-label="Select a size">
          <button aria-label="Close size selector" className="absolute inset-0 h-full w-full bg-black/30" onClick={() => setSizeDrawer(false)} />
          <div className="drawer-in absolute right-0 top-0 flex h-full w-[340px] max-w-[88vw] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <span className="text-[12px] font-semibold uppercase tracking-[0.25em]">Select a size</span>
              <button aria-label="Close size selector" className="flex h-9 w-9 items-center justify-center" onClick={() => setSizeDrawer(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-3">
              {sizeList.map((opt) => opt.available ? (
                <button key={opt.label} aria-label={`Size ${opt.label}`} aria-pressed={selSize === opt.label} className={`flex w-full items-center justify-between border-b border-black/10 py-3.5 text-left text-sm ${selSize === opt.label ? "font-semibold" : ""}`} onClick={() => { setSelSize(opt.label); setSizeGone(false); setSizeDrawer(false); }}>
                  {opt.label}{selSize === opt.label && <span aria-hidden="true">✓</span>}
                </button>
              ) : (
                <div key={opt.label} className="flex w-full items-center justify-between border-b border-black/10 py-3.5 text-sm text-neutral-400" aria-label={`Size ${opt.label} unavailable`}>
                  <span className="line-through">{opt.label}</span><span className="text-xs uppercase tracking-wider">Unavailable</span>
                </div>
              ))}
            </div>
            <div className="border-t border-black/10 px-5 py-4">
              <button aria-label="Open size guide" className="text-xs uppercase tracking-[0.18em] underline" onClick={() => { setSizeDrawer(false); go({ t: "page", page: "guides" }); }}>Size guide</button>
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
      {p.status === "available" && (
        <div className="fixed inset-x-0 bottom-0 z-40 bg-white px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-1px_10px_rgba(0,0,0,0.14)] lg:hidden">
          <button aria-label="Add to cart" disabled={sizeGone} className={`flex w-full items-center justify-center gap-2 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-white ${sizeGone ? "cursor-not-allowed bg-neutral-400" : "bg-black"}`} onClick={() => { if (needsSize && !selSize) { setSizeDrawer(true); return; } addToCart(p, color?.name, needsSize ? selSize : p.modelSize); }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 8h14l-1.2 12.2a1.8 1.8 0 0 1-1.8 1.6H8a1.8 1.8 0 0 1-1.8-1.6L5 8Z" /><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" /></svg>
            Add to cart
          </button>
        </div>
      )}
      {p.status !== "available" && p.status !== "in_store_only" && (
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
  { title: "ORDERS", links: [["Payment", "payment"], ["Shipping", "shipping"], ["Collect in store", "collect"], ["Track orders", "track"], ["Returns and exchanges", "returns"]] },
  { title: "LA MAISON HERMÈS", links: [["Sustainable development", "sustainability"], ["The Hermès Foundation", "foundation"], ["Join Hermès", "join"], ["Finance & Governance", "finance"], ["Our partner brands", "partners"]] },
  { title: "LEGAL", links: [["Terms and conditions", "terms"], ["Privacy & cookies", "privacy"], ["Binding Corporate Rules (BCRs)", "bcr"], ["California Transparency in Supply Chain Act", "california"], ["Transparency in coverage", "coverage"], ["Do Not Sell/Share My Personal Information", "donotsell"], ["Legal issues", "legal"], ["Accessibility", "accessibility"], ["Hermès Sitemap", "sitemap"]] },
];
const PAGES: Record<string, { title: string; body: string[] }> = {
  contact: { title: "Contact us", body: ["Our customer service is at your disposal Monday to Saturday, 10 AM – 9 PM EST.", "By phone: 800-441-4488."] },
  faq: { title: "FAQ", body: ["How long is delivery? Complimentary Ground delivery applies to orders up to $2,000; Express 2 day $35, Standard Overnight $60, Priority Overnight $70, Saturday Delivery $85, White Glove $500. Express is required over $2,000 and White Glove over $25,000.", "Can I return an article? Yes — free returns within 30 days of delivery, in its original condition and packaging.", "Which payment methods are accepted? MasterCard, Visa, American Express, Diners Club, Carte Blanche, JCB, Discover, Accel, Pulse, Nyce, Star and China Union Pay; PayPal and Apple Pay for select products.", "Are Birkin and Kelly quota bags sold online? No. These articles are offered in store only."] },
  stores: { title: "Find a store", body: ["Hermès boutiques welcome you across the United States. Flagship: 691 Madison Avenue, New York — Monday to Saturday 10 AM – 9 PM.", "Beauty products and Apple Watch Hermès are available in selected boutiques; please call 800-441-4488 to confirm availability before your visit."] },
  gifting: { title: "Gifting", body: ["Every order arrives in the orange box tied with Bolduc ribbon. Add a gift message at checkout; the delivery note never shows prices. Gift cards are available under Gifts → Gift cards."] },
  measure: { title: "Made to measure", body: ["The Sur Mesure atelier creates pieces measured, cut and finished for one person only. Appointments are arranged in boutique or by phone at 800-441-4488."] },
  maintenance: { title: "Maintenance and repair", body: ["Hermès artisans restore leather goods, silk, watches and jewelry in the Maison's workshops. Bring your article to any boutique for an assessment; a quotation is provided before any work begins."] },
  guides: { title: "User guides", body: ["Watch user guide: pull the crown to set the time; keep away from magnetic fields; service every 3–5 years.", "Scarf guide: your scarf 90 can be worn around the neck, as a top, a belt or on a bag handle. Dry clean only.", "Leather guide: wipe with a soft dry cloth and store in the dust bag provided.", "Wrist size guide: measure around your wrist and choose the closest size between 5.5\" and 6.5\" for Petite Lune straps."] },
  payment: { title: "Payment", body: ["We accept MasterCard, Visa, American Express, Diners Club, Carte Blanche, JCB, Discover, Accel, Pulse, Nyce, Star and China Union Pay. PayPal and Apple Pay are available for select products.", "All transactions made on this store are secured with encrypted payment processing."] },
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

function ContactForm({ settings }: { settings: Settings }) {
  const [f, setF] = useState({ first: "", last: "", email: "", phone: "", subject: "Order enquiry", message: "" });
  const [sent, setSent] = useState("");
  const [err, setErr] = useState("");
  const inputCls = "w-full border border-black/30 px-3 py-3 text-sm";
  if (sent) return <p className="mt-6 border border-black/15 bg-[#fffdf9] p-5 text-sm" role="status">{sent}</p>;
  return (
    <form className="mt-6 space-y-3" onSubmit={(e) => { e.preventDefault(); if (!f.first || !f.last || !f.email.includes("@") || !/^\d{10}$/.test(f.phone.replace(/\D/g, "").replace(/^1/, "")) || !f.message) { setErr("Please complete all fields — the telephone must be a US number (+1 followed by 10 digits)."); return; } setErr(""); setSent(`Thank you, ${f.first}. Your message about “${f.subject}” has been sent — customer service will reply to ${f.email} within one business day.`); }}>
      <div className="grid gap-3 sm:grid-cols-2">
        <input aria-label="Contact first name" className={inputCls} placeholder="First name *" value={f.first} onChange={(e) => setF({ ...f, first: e.target.value })} />
        <input aria-label="Contact last name" className={inputCls} placeholder="Last name *" value={f.last} onChange={(e) => setF({ ...f, last: e.target.value })} />
      </div>
      <input aria-label="Contact email" type="email" className={inputCls} placeholder="E-mail *" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      <input aria-label="Contact telephone" className={inputCls} placeholder="Telephone (+1, 10 digits) *" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
      <select aria-label="Contact subject" className={inputCls} value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })}>
        {["Order enquiry", "Delivery", "Returns and exchanges", "Product information", "Account", "Other"].map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <textarea aria-label="Contact message" className={inputCls} rows={5} placeholder="Your message *" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
      {err && <p className="text-sm text-red-700" role="status">{err}</p>}
      <p className="text-xs text-neutral-500">Customer service: {settings.phone} — {settings.serviceHours}.</p>
      <button aria-label="Send contact message" type="submit" className="w-full bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white">Send</button>
    </form>
  );
}

function InfoPage({ page, settings, go, user }: { page: string; settings: Settings; go: (v: View) => void; user: { name: string; email: string } | null }) {
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
              {c.links.map(([l, pg]) => <button key={l} aria-label={`Sitemap page ${l}`} className="block py-1 text-sm text-neutral-600 hover:underline" onClick={() => go({ t: "page", page: pg })}>{l}</button>)}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (page === "track") {
    return <TrackOrders settings={settings} user={user} go={go} />;
  }
  const pg = PAGES[page] ?? PAGES.faq;
  const data = pg ?? { title: "Hermès", body: [] as string[] };
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif-d text-3xl italic">{data.title}</h1>
      {data.body.map((b, i) => <p key={i} className="mt-4 text-sm leading-7 text-neutral-700">{b}</p>)}
      {page === "contact" && <ContactForm settings={settings} />}
      {(page === "donotsell" || page === "legal") && <p className="mt-4 text-sm">Customer service: <a aria-label="Call customer service" className="underline" href={`tel:${settings.phone}`}>{settings.phone}</a> — {settings.serviceHours}.</p>}
      <button aria-label="Continue shopping" className="mt-8 border border-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.25em]" onClick={() => go({ t: "home" })}>Continue shopping</button>
    </div>
  );
}

function TrackOrders({ user, go }: { settings: Settings; user: { name: string; email: string } | null; go: (v: View) => void }) {
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
        <div key={o.id} className="mt-4 border border-black/10 bg-[#fffdf9] p-4">
          <p className="text-sm font-medium">Order #{o.id} — {fmt(o.total)} — <span className="uppercase tracking-wider">{o.status}</span></p>
          <p className="text-xs text-neutral-500">{new Date(o.createdAt).toLocaleString()}{o.paymentMethod ? ` · Paid with ${o.paymentMethod} (demo)` : ""}{o.deliveryOption ? ` · ${o.deliveryOption}` : ""}</p>
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

function AboutPage({ go }: { go: (v: View) => void }) {
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

function CartPage({ cart, setCart, settings, go, total, count }: { cart: CartItem[]; setCart: (c: CartItem[]) => void; settings: Settings; go: (v: View) => void; total: number; count: number }) {
  const [giftOpen, setGiftOpen] = useState(false);
  const [gift, setGift] = useState(false);
  return (
    <div className="min-h-screen bg-[#fffdf9]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="relative flex items-start">
          <button aria-label="Back to store from cart" className="flex h-10 items-center gap-1.5 text-sm" onClick={() => go({ t: "home" })}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20 12H4m0 0 6-6M4 12l6 6" /></svg> Back
          </button>
          <span className="absolute left-1/2 top-0 -translate-x-1/2"><HermesLogo settings={settings} variant="brand" /></span>
          <span className="w-10" />
        </div>
        <div className="mt-2"><CheckoutProgress step={1} nextStep /></div>
        {cart.length === 0 ? (
          <div className="mt-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
              <div className="flex flex-col items-center bg-white px-6 py-16 text-center">
                <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M5 8h14l-1.2 12.2a1.8 1.8 0 0 1-1.8 1.6H8a1.8 1.8 0 0 1-1.8-1.6L5 8Z" /><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" /></svg>
                <h1 className="mt-5 text-lg">Your cart is empty</h1>
                <button aria-label="Continue shopping from empty cart" className="mt-6 bg-black px-10 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => go({ t: "home" })}>Continue shopping</button>
              </div>
              <div className="space-y-6">
                <section className="bg-white px-5 py-5" aria-label="The orange box section">
                  <h2 className={CO_HEAD}>The Orange Box</h2>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="relative block h-16 w-16 shrink-0 overflow-hidden" style={{ background: "#e85d1f" }} aria-hidden="true"><span className="absolute left-1/2 top-0 h-full w-[6px] -translate-x-1/2 bg-[#5a2d16]" /><span className="absolute left-0 top-1/2 h-[6px] w-full -translate-y-1/2 bg-[#5a2d16]" /><span className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#5a2d16]" /></span>
                    <p className="text-sm leading-6 text-neutral-800">All orders are delivered in an orange box tied with a Bolduc ribbon, with the exception of <button aria-label="Certain items exceptions from cart" className="underline" onClick={() => go({ t: "page", page: "gifting" })}>certain items</button></p>
                  </div>
                </section>
                <section className="bg-white px-5 py-5" aria-label="Customer service section">
                  <h2 className={CO_HEAD}>Customer Service</h2>
                  <p className="mt-4 text-sm text-neutral-600">Monday to Saturday 10am - 9pm EST :</p>
                  <p className="mt-1 text-sm"><a aria-label="Call customer service from cart" className="underline" href={`tel:${settings.phone}`}>{settings.phone}</a></p>
                  <div className="mt-5 grid grid-cols-2 gap-4 text-center">
                    <button aria-label="Returns and exchanges from cart" className="flex flex-col items-center gap-2 text-sm" onClick={() => go({ t: "page", page: "returns" })}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 8h11l-3-3M17 16H6l3 3" /></svg>Returns &amp; exchanges</button>
                    <button aria-label="Shop securely from cart" className="flex flex-col items-center gap-2 text-sm" onClick={() => go({ t: "page", page: "payment" })}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="1" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>Shop securely</button>
                  </div>
                </section>
              </div>
            </div>
            <div className="mt-10 space-y-2 text-[13px] text-neutral-600">
              {([["Terms and conditions", "terms"], ["Privacy & cookies", "privacy"], ["Legal issues", "legal"], ["Accessibility", "accessibility"], ["Site map", "sitemap"]] as [string, string][]).map(([l, pg]) => <button key={l} aria-label={`Cart footer ${l}`} className="block hover:underline" onClick={() => go({ t: "page", page: pg })}>{l}</button>)}
              <p className="pt-1">© Hermès 2026. All rights reserved.</p>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <h1 className="text-xs font-semibold uppercase tracking-[0.25em]">You have {count} item{count === 1 ? "" : "s"} in your cart</h1>
              {cart.map((i) => (
                <div key={i.key} className="mt-5 flex gap-4 border-b border-black/10 pb-5">
                  <button aria-label={`Open ${i.name}`} className="h-24 w-24 shrink-0 overflow-hidden" onClick={() => go({ t: "product", id: i.productId })}><img src={productImageFor({ name: i.name, price: i.price })} alt={i.name} className="h-full w-full object-cover" /></button>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">{i.name}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{i.color ? `Colour: ${i.color}` : ""}{i.size ? ` · Size: ${i.size}` : ""}{i.refCode ? <><br />Ref: {i.refCode}</> : null}</p>
                    <div className="mt-2.5 flex items-center gap-3">
                      <button aria-label={`Decrease quantity of ${i.name}`} disabled={i.qty <= 1} className="h-7 w-7 border border-black/30 disabled:cursor-not-allowed disabled:opacity-30" onClick={() => setCart(cart.map((x) => x.key === i.key ? { ...x, qty: Math.max(1, x.qty - 1) } : x))}>−</button>
                      <span aria-label={`Quantity of ${i.name}`}>{i.qty}</span>
                      <button aria-label={`Increase quantity of ${i.name}`} className="h-7 w-7 border border-black/30" onClick={() => setCart(cart.map((x) => x.key === i.key ? { ...x, qty: x.qty + 1 } : x))}>+</button>
                      <button aria-label={`Remove ${i.name} from cart`} className="ml-2 text-xs underline" onClick={() => setCart(cart.filter((x) => x.key !== i.key))}>Remove</button>
                    </div>
                  </div>
                  <p className="text-sm">{fmt2(i.price * i.qty)}</p>
                </div>
              ))}
              <div className="mt-5 border border-black/10">
                <button aria-label="Toggle gifting options" aria-expanded={giftOpen} className="flex w-full items-center justify-between px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em]" onClick={() => setGiftOpen(!giftOpen)}>Gifting <span>{giftOpen ? "−" : "+"}</span></button>
                {giftOpen && <label className="flex items-center gap-2 px-4 pb-4 text-sm"><input type="checkbox" aria-label="This is a gift" checked={gift} onChange={(e) => setGift(e.target.checked)} className="accent-black" /> This is a gift — deliver in the orange box with a gift message and no prices on the delivery note.</label>}
              </div>
            </div>
            <aside className="h-fit border border-black/10 p-5">
              <div className="mt-4 flex justify-between border-t border-black/10 pt-4 text-sm font-semibold uppercase tracking-[0.15em]"><span>Total</span><span>{fmt2(total)}</span></div>
              <button aria-label="Checkout from cart" className="mt-5 w-full bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => go({ t: "checkout" })}>Checkout</button>
              <button aria-label="Buy with Apple Pay from cart" className="mt-2 w-full border border-black bg-white py-3.5 text-sm font-semibold" onClick={() => go({ t: "checkout" })}>Buy with Apple Pay</button>
              <div className="mt-6 border-t border-black/10 pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em]">The Orange Box</p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">Every order is delivered in the orange box tied with Bolduc ribbon.</p>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.25em]">Customer service</p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">Monday to Saturday 10 AM – 9 PM EST<br /><a className="underline" href={`tel:${settings.phone}`}>{settings.phone}</a></p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

function SocialCircles() {
  const cls = "flex h-10 w-10 items-center justify-center rounded-full bg-black text-white";
  return (
    <div className="flex gap-3">
      <a aria-label="Hermès on Facebook" href="https://www.facebook.com/Hermes" target="_blank" rel="noreferrer" className={cls}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.2 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.3c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8.8v2.8h2.4V21h3Z" /></svg>
      </a>
      <a aria-label="Hermès on Instagram" href="https://www.instagram.com/hermes" target="_blank" rel="noreferrer" className={cls}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="3.8" /><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" /></svg>
      </a>
      <a aria-label="Hermès on YouTube" href="https://www.youtube.com/@HermesParis" target="_blank" rel="noreferrer" className={cls}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" /></svg>
      </a>
    </div>
  );
}

function Footer({ settings, go }: { settings: Settings; go: (v: View) => void }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState("");
  const [ship, setShip] = useState(settings.shipTo);
  const [openCol, setOpenCol] = useState<string | null>("LEGAL");
  const [subOpen, setSubOpen] = useState(false);
  const [svcIdx, setSvcIdx] = useState(0);
  const sub = useMutation({ mutationFn: () => api.subscribeNewsletter({ email }), onSuccess: () => { setDone("Thank you — you are subscribed to the newsletter."); setEmail(""); } });
  useEffect(() => { setShip(settings.shipTo); }, [settings.shipTo]);
  const serviceIcons: Record<string, React.ReactNode> = {
    "STANDARD DELIVERY": <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M2.5 6h12v10h-12zM14.5 9.5h3.6l3 3.4v3.1h-6.6" /><circle cx="6.5" cy="17.8" r="1.9" /><circle cx="17.3" cy="17.8" r="1.9" /></svg>,
    "RETURNS": <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M8.5 5.5 4 10l4.5 4.5M4 10h10a6 6 0 0 1 0 12h-3" /></svg>,
    "CUSTOMER SERVICE": <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M5 3.5h4l1.5 4.5L8 10a13 13 0 0 0 6 6l2-2.5 4.5 1.5v4a2 2 0 0 1-2.2 2A18.5 18.5 0 0 1 3 5.7a2 2 0 0 1 2-2.2Z" /></svg>,
    "SECURED PAYMENT": <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="2.5" y="6" width="15" height="11" rx="1.5" /><path d="M2.5 9.8h15" /><rect x="15.8" y="13.2" width="5.7" height="5" rx="0.8" /><path d="M17.2 13.2v-1.4a1.5 1.5 0 0 1 3 0v1.4" /></svg>,
  };
  const services: { title: string; body: React.ReactNode; page: string }[] = [
    { title: "STANDARD DELIVERY", page: "shipping", body: <>Free standard delivery. Hermès offers several fast and secure delivery options.</> },
    { title: "RETURNS", page: "returns", body: <>Free returns within 30 days. See conditions and procedure in our <button aria-label="Return FAQs" className="underline underline-offset-2" onClick={(e) => { e.stopPropagation(); go({ t: "page", page: "returns" }); }}>return FAQs</button>.</> },
    { title: "CUSTOMER SERVICE", page: "contact", body: <>{settings.serviceHours}, <a aria-label="Call Hermès customer service" className="underline underline-offset-2" href={`tel:${settings.phone}`} onClick={(e) => e.stopPropagation()}>{settings.phone}</a> | <button aria-label="Contact us from footer" className="underline underline-offset-2" onClick={(e) => { e.stopPropagation(); go({ t: "page", page: "contact" }); }}>Contact us</button></> },
    { title: "SECURED PAYMENT", page: "payment", body: <>All the transactions made on Hermes.com are secured</> },
  ];
  const newsletterForm = (boxed: boolean) => done ? <p className="mt-3 text-sm font-medium" role="status">{done}</p> : boxed ? (
    <>
      <input aria-label="Newsletter email" type="email" className="mt-3 w-full border border-black/30 px-3 py-2.5 text-sm" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button aria-label="Subscribe to the newsletter" className="mt-2 w-full border border-black py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em]" onClick={() => { if (email.includes("@")) sub.mutate(); }}>Subscribe to the newsletter</button>
    </>
  ) : (
    <>
      <button aria-label="Subscribe to the newsletter" className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] underline underline-offset-8" onClick={() => setSubOpen(!subOpen)}>Subscribe to the newsletter</button>
      {subOpen && (
        <div className="mt-3">
          <input aria-label="Newsletter email" type="email" className="w-full border border-black/30 px-3 py-2.5 text-sm" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button aria-label="Confirm newsletter subscription" className="mt-2 w-full border border-black py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em]" onClick={() => { if (email.includes("@")) sub.mutate(); }}>Subscribe to the newsletter</button>
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
      <div className="border-y border-black/15" style={{ background: "#fcf7f1" }}>
      <div className="relative px-12 py-10 text-center lg:hidden">
        <button aria-label="Previous service" className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-xl text-neutral-700" onClick={() => setSvcIdx((svcIdx + services.length - 1) % services.length)}>‹</button>
        <div key={svc.title} className="cursor-pointer" onClick={() => go({ t: "page", page: svc.page })}>
          <span className="flex justify-center">{serviceIcons[svc.title]}</span>
          <button aria-label={`Service ${svc.title}`} className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.25em]" onClick={(e) => { e.stopPropagation(); go({ t: "page", page: svc.page }); }}>{svc.title}</button>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-neutral-600">{svc.body}</p>
        </div>
        <button aria-label="Next service" className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-xl text-neutral-700" onClick={() => setSvcIdx((svcIdx + 1) % services.length)}>›</button>
      </div>
      <div className="mx-auto hidden max-w-7xl gap-8 px-4 py-10 text-center sm:px-6 lg:grid lg:grid-cols-4 lg:text-left">
        {services.map((s) => (
          <div key={s.title} className="cursor-pointer" onClick={() => go({ t: "page", page: s.page })}>
            <span className="flex justify-center lg:justify-start">{serviceIcons[s.title]}</span>
            <button aria-label={`Service ${s.title}`} className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.25em]" onClick={(e) => { e.stopPropagation(); go({ t: "page", page: s.page }); }}>{s.title}</button>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-neutral-600 lg:mx-0">{s.body}</p>
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
              <div key={c.title} className="border-b border-black/10 last:border-b-0">
                <button aria-label={`Footer section ${c.title}`} aria-expanded={open} className="flex w-full items-center justify-between py-4 text-left text-[11px] font-semibold uppercase tracking-[0.25em]" onClick={() => setOpenCol(open ? null : c.title)}>
                  {c.title}<span aria-hidden="true" className="text-base">{open ? "−" : "+"}</span>
                </button>
                {open && (c.title === "LEGAL" ? (
                  <div className="pb-4 leading-7">
                    {cols.map(([l, pg], i) => (
                      <span key={l}>{i > 0 && <span aria-hidden="true" className="mx-2 text-neutral-400">|</span>}<button aria-label={`Footer ${l}`} className="py-1 text-left text-[13px] leading-5 text-neutral-700" onClick={() => go({ t: "page", page: pg })}>{l}</button></span>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 pb-4">
                    {cols.map(([l, pg]) => <button key={l} aria-label={`Footer ${l}`} className="py-1.5 text-left text-[13px] leading-5 text-neutral-700" onClick={() => go({ t: "page", page: pg })}>{l}</button>)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div className="border-t border-black/10 px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em]">Newsletter</p>
          <p className="mt-2 text-sm leading-6 text-neutral-600">Receive our newsletter and discover our stories, collections, and surprises.</p>
          {newsletterForm(false)}
          <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.25em]">Follow us</p>
          <div className="mt-3"><SocialCircles /></div>
          <label className="mt-7 flex items-center gap-2 border-t border-black/10 pt-5 text-xs text-neutral-700">SHIP TO :
            <select aria-label="Ship to country selector" className="max-w-[55vw] appearance-none bg-transparent py-1 font-medium uppercase underline underline-offset-4" value={ship} onChange={(e) => setShip(e.target.value)}>
              {["UNITED STATES", "UNITED KINGDOM", "FRANCE", "PAKISTAN", "UNITED ARAB EMIRATES", "INDIA"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-600">
            <p>© Hermès 2026. All rights reserved.</p>
          </div>
        </div>
      </div>
      {/* Desktop — five open columns on #f6f1eb, as verified on hermes.com */}
      <div className="hidden lg:block" style={{ background: "#f6f1eb" }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-5">
          {FOOTER_COLS.map((c) => (
            <div key={c.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em]">{c.title}</p>
              {c.links.map(([l, pg]) => <button key={l} aria-label={`Footer ${l}`} className="block py-1.5 text-left text-sm text-neutral-700 hover:underline" onClick={() => go({ t: "page", page: pg })}>{l}</button>)}
            </div>
          ))}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em]">Newsletter</p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">Receive our newsletter and discover our stories, collections, and surprises.</p>
            {newsletterForm(false)}
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.25em]">Follow us</p>
            <div className="mt-3"><SocialCircles /></div>
          </div>
        </div>
      </div>
      <div className="hidden border-t border-black/10 lg:block" style={{ background: "#f6f1eb" }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs text-neutral-600">
          <label className="flex items-center gap-2 uppercase tracking-wider">Ship to :
            <select aria-label="Ship to country selector" className="appearance-none bg-transparent py-1 font-medium uppercase underline underline-offset-4" value={ship} onChange={(e) => setShip(e.target.value)}>
              {["UNITED STATES", "UNITED KINGDOM", "FRANCE", "PAKISTAN", "UNITED ARAB EMIRATES", "INDIA"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <p>© Hermès 2026. All rights reserved.</p>
        </div>
      </div>
      {/* BOARD h) BELOW THE FOOTER — the lockup band: a large plain area in
          #fcf7f1 (the same pale cream as the service strip, sampled on
          hermes.com — NOT pure white) with the black HERMÈS PARIS lockup
          centred in it. Nothing follows it; this is the page bottom. */}
      <div className="flex justify-center py-16 sm:py-20" style={{ background: "#fcf7f1" }}>
        <HermesLogo settings={settings} variant="full" />
      </div>
    </footer>
    {/* Floating chat bubble — mobile only, bottom-right, as on hermes.com.
        Opens Contact us. Desktop has no floating bubble. */}
    <button aria-label="Customer service chat" className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/10 lg:hidden" onClick={() => go({ t: "page", page: "contact" })}>
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.5 0-3-.4-4.2-1.1L3 20l1.1-5.3A8.5 8.5 0 1 1 21 11.5Z" /><path d="M8 10.5h8M8 13.5h5" /></svg>
    </button>
    </>
  );
}

function AccountView({ user, setUser, go, mode }: { user: { name: string; email: string } | null; setUser: (u: { name: string; email: string } | null) => void; go: (v: View) => void; mode?: "login" | "signup" }) {
  // Which form shows first: "signup" when opened from the header "Sign up"
  // option, "login" otherwise. The visitor can switch inside the page.
  const [authMode, setAuthMode] = useState<"login" | "signup">(mode ?? "login");
  // Sign-in form.
  const [liEmail, setLiEmail] = useState(""); const [liPw, setLiPw] = useState(""); const [liMsg, setLiMsg] = useState(""); const [emailStep, setEmailStep] = useState(true);
  const [forgotMsg, setForgotMsg] = useState("");
  // Create-account form (Hermes create-account page layout).
  const [suTitle, setSuTitle] = useState(""); const [suFirst, setSuFirst] = useState(""); const [suLast, setSuLast] = useState("");
  const [suEmail, setSuEmail] = useState(""); const [suCode, setSuCode] = useState(""); const [suShowCode, setSuShowCode] = useState(false);
  const [suPw, setSuPw] = useState(""); const [suArea, setSuArea] = useState("US +1"); const [suPhone, setSuPhone] = useState(""); const [suDob, setSuDob] = useState("");
  const [suMsg, setSuMsg] = useState(""); const [sentCode, setSentCode] = useState("");
  const login = useMutation({ mutationFn: () => api.loginUser({ email: liEmail, password: liPw }), onSuccess: (r) => { setLiMsg(r.message); if (r.ok) setUser({ name: r.name, email: liEmail }); } });
  const reg = useMutation({ mutationFn: () => api.registerUser({ name: `${suFirst} ${suLast}`.trim(), email: suEmail, password: suPw }), onSuccess: (r) => { setSuMsg(r.message); if (r.ok) setUser({ name: `${suFirst} ${suLast}`.trim(), email: suEmail }); } });
  const ordersQ = useQuery({ queryKey: ["myorders", user?.email], queryFn: () => api.myOrders({ email: user?.email ?? "" }), enabled: !!user });
  const extrasQ = useQuery({ queryKey: ["myextras", user?.email], queryFn: () => api.myExtras({ email: user?.email ?? "" }), enabled: !!user });
  const [retMsg, setRetMsg] = useState("");
  const retMut = useMutation({ mutationFn: (oid: number) => api.requestReturn({ orderId: oid, email: user?.email ?? "", reason: "Return requested from My Orders" }), onSuccess: (r) => { setRetMsg(r.message); extrasQ.refetch(); } });
  if (user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-serif-d text-3xl italic">Welcome, {user.name}</h1>
        <p className="mt-2 text-sm text-neutral-600">{user.email}</p>
        <h2 className="mt-8 text-xs font-semibold uppercase tracking-[0.25em]">Your orders</h2>
        {ordersQ.data?.orders.length === 0 && <p className="mt-3 text-sm text-neutral-600">No orders yet. Your order history will appear here.</p>}
        {ordersQ.data?.orders.map((o) => {
          let items: { name: string; qty: number; price: number }[] = [];
          try { items = JSON.parse(o.items) as typeof items; } catch { items = []; }
          return (
            <div key={o.id} className="mt-3 border border-black/10 bg-[#fffdf9] p-4">
              <p className="text-sm font-medium">Order #{o.id} — {fmt(o.total)} — <span className="uppercase tracking-wider">{o.status}</span></p>
              <p className="text-xs text-neutral-500">{new Date(o.createdAt).toLocaleString()}</p>
              {items.map((it, i) => <p key={i} className="mt-1 text-sm text-neutral-700">{it.qty} × {it.name} — {fmt(it.price * it.qty)}</p>)}
              {o.status !== "Cancelled" && <button aria-label={`Request return for order ${o.id}`} className="mt-2 text-xs uppercase tracking-[0.18em] underline" onClick={() => retMut.mutate(o.id)}>Request return</button>}
            </div>
          );
        })}
        {retMsg && <p className="mt-4 text-sm" role="status">{retMsg}</p>}
        <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.25em]">Profile & addresses</h2>
        <p className="mt-2 text-sm text-neutral-700">{user.name} — {user.email}</p>
        {[...new Set((ordersQ.data?.orders ?? []).map(o => o.address).filter(Boolean))].map((a, i) => <p key={i} className="mt-1 text-sm text-neutral-600">Saved address: {a}</p>)}
        {[...new Set((ordersQ.data?.orders ?? []).map(o => o.address).filter(Boolean))].length === 0 && <p className="mt-1 text-sm text-neutral-600">No saved address yet — your checkout address will appear here.</p>}
        <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.25em]">Wishlist</h2>
        {(extrasQ.data?.wishlist.length ?? 0) === 0 && <p className="mt-2 text-sm text-neutral-600">Your wishlist is empty. Use “Add to wishlist” on a product page.</p>}
        {extrasQ.data?.wishlist.map(w => <button key={w.id} aria-label={`Wishlist ${w.productName}`} className="mt-1 block text-sm underline" onClick={() => go({ t: "product", id: w.productId })}>{w.productName}</button>)}
        <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.25em]">Notify Me list</h2>
        {(extrasQ.data?.notify.length ?? 0) === 0 && <p className="mt-2 text-sm text-neutral-600">No Notify Me requests yet.</p>}
        {extrasQ.data?.notify.map(n => <p key={n.id} className="mt-1 text-sm text-neutral-700">{n.productName}</p>)}
        {(extrasQ.data?.returns.length ?? 0) > 0 && <><h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.25em]">Returns</h2>{extrasQ.data?.returns.map(r => <p key={r.id} className="mt-1 text-sm text-neutral-700">Order #{r.orderId} — {r.status}</p>)}</>}
        <div className="mt-8 flex gap-3">
          <button aria-label="Continue shopping from account" className="bg-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => go({ t: "home" })}>Continue shopping</button>
          <button aria-label="Sign out" className="border border-black px-8 py-3 text-[11px] uppercase tracking-[0.25em]" onClick={() => setUser(null)}>Sign out</button>
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
    setSuMsg("");
  };
  const submitSignup = () => {
    if (!suEmail.includes("@")) return setSuMsg("Please enter a valid email address.");
    if (!sentCode) return setSuMsg("Please press SEND CODE first — a demo code will be shown for you to enter.");
    if (suCode.trim() !== sentCode) return setSuMsg("The verification code does not match the demo code shown above.");
    if (!critOk) return setSuMsg("Please choose a password that meets all the criteria below.");
    if (!suTitle) return setSuMsg("Please choose a title.");
    if (!suFirst.trim() || !suLast.trim()) return setSuMsg("Please enter your first and last name.");
    const digits = suPhone.replace(/\D/g, "").replace(/^1/, "");
    if (!/^\d{10}$/.test(digits)) return setSuMsg("Please enter a 10-digit telephone number.");
    setSuMsg("");
    reg.mutate();
  };
  const underline = "mt-1 w-full border-0 border-b border-black/40 bg-transparent px-0 py-2.5 text-[15px] text-black outline-none focus:border-black";
  const lab = "block text-left text-[13px] text-neutral-500";
  const hint = "mt-1 block text-xs text-neutral-500";
  if (authMode === "login") {
    return (
      <div className="mx-4 my-10 max-w-md bg-white px-6 py-10 sm:mx-auto sm:px-8">
        <h1 className="text-center text-[13px] uppercase tracking-[0.3em] [font-family:ui-monospace,Menlo,monospace]">Sign in</h1>
        <p className="mt-4 text-center text-sm leading-6 text-neutral-700">{emailStep ? "Please enter your email below to sign in to your account." : `Welcome back — please enter your password for ${liEmail}.`}</p>
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
          <button aria-label="Continue with email" className="mt-5 w-full bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => { if (!liEmail.includes("@")) { setLiMsg("Please enter a valid email address."); return; } setLiMsg(""); setEmailStep(false); }}>Continue</button>
        ) : (
          <button aria-label="Sign in button" className="mt-5 w-full bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => login.mutate()}>Sign in</button>
        )}
        <button aria-label="Forgot password" className="mt-4 w-full text-center text-xs uppercase tracking-[0.2em] underline" onClick={() => setForgotMsg("This standalone build has no email service, so password reset is unavailable — please create a new account or contact customer service.")}>Forgot your password?</button>
        {forgotMsg && <p className="mt-3 text-center text-xs leading-5 text-neutral-600" role="status">{forgotMsg}</p>}
        <p className="mt-6 text-center text-sm text-neutral-700">New to Hermès? <button aria-label="Go to create account" className="underline" onClick={() => { setAuthMode("signup"); setLiMsg(""); setForgotMsg(""); setEmailStep(true); }}>Create an account</button></p>
        <p className="mt-8 border-t border-black/10 pt-4 text-center text-xs text-neutral-500">Store admin? <button aria-label="Sign in to Admin Panel" className="underline" onClick={() => go({ t: "admin" })}>Sign in to Admin Panel</button></p>
      </div>
    );
  }
  // Create account — laid out like hermes.com/us/en/account/create/:
  // intro + "* Required information", then two columns (Login information |
  // Personal information), then the create button.
  return (
    <div className="mx-4 my-10 max-w-4xl bg-white px-6 py-10 sm:mx-auto sm:px-8">
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
              <button aria-label="Send verification code" type="button" className="shrink-0 bg-black px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white" onClick={sendCode}>Send code</button>
            </span>
            <span className={hint}>Expected format: yourname@domain.com</span>
          </label>
          {sentCode && <p className="mt-3 border border-amber-700/30 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900" role="status">Demo code — this standalone build has no email service, so no email is sent. Your code is <strong>{sentCode}</strong>; enter it in Verification code below.</p>}
          <label className={`${lab} mt-5`}>Verification code *
            <input aria-label="Verification code" type={suShowCode ? "text" : "password"} inputMode="numeric" className={underline} value={suCode} onChange={(e) => setSuCode(e.target.value)} />
            <span className={hint}>Expected format: 123456</span>
          </label>
          <button aria-label={suShowCode ? "Hide verification code" : "Show verification code"} type="button" className="mt-1 block w-full text-right text-xs uppercase tracking-[0.15em] underline" onClick={() => setSuShowCode(!suShowCode)}>{suShowCode ? "Hide" : "Show"}</button>
          <label className={`${lab} mt-5`}>Password *
            <input aria-label="Create account password" type="password" className={underline} value={suPw} onChange={(e) => setSuPw(e.target.value)} />
          </label>
          <div className="mt-3 bg-[#f5f1ea] px-4 py-3">
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
                <option value="US +1">🇺🇸 US +1</option><option value="GB +44">🇬🇧 GB +44</option><option value="FR +33">🇫🇷 FR +33</option><option value="PK +92">🇵🇰 PK +92</option><option value="IN +91">🇮🇳 IN +91</option><option value="AE +971">🇦🇪 AE +971</option>
              </select>
            </label>
            <label className={`${lab} min-w-0 flex-1`}>Telephone number *
              <input aria-label="Telephone number" type="tel" className={underline} value={suPhone} onChange={(e) => setSuPhone(e.target.value)} />
              <span className={hint}>Expected format: phone number with 10 digits</span>
            </label>
          </div>
          <label className={`${lab} mt-5`}>Date of birth
            <input aria-label="Date of birth" type="date" className={underline} value={suDob} onChange={(e) => setSuDob(e.target.value)} />
          </label>
        </div>
      </div>
      {suMsg && <p className="mt-6 text-sm text-red-700" role="status">{suMsg}</p>}
      <button aria-label="Create my account" className="mt-8 w-full bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white sm:mx-auto sm:block sm:w-80" onClick={submitSignup}>Create my account</button>
      <p className="mt-6 text-center text-sm text-neutral-700">Already have an account? <button aria-label="Go to sign in" className="underline" onClick={() => { setAuthMode("login"); setSuMsg(""); setEmailStep(true); }}>Sign in</button></p>
      <p className="mt-8 border-t border-black/10 pt-4 text-center text-xs text-neutral-500">Store admin? <button aria-label="Sign in to Admin Panel" className="underline" onClick={() => go({ t: "admin" })}>Sign in to Admin Panel</button></p>
    </div>
  );

}

const US_STATES = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
const CO_HEAD = "text-[13px] uppercase tracking-[0.28em] [font-family:ui-monospace,SFMono-Regular,Menlo,monospace]";

function CheckoutProgress({ step, nextStep }: { step: 1 | 2 | 3; nextStep?: boolean }) {
  const labels = ["Cart", "Checkout", "Confirmation"];
  return (
    <div className="px-2 pt-5" aria-label="Checkout progress">
      <div className="relative mx-6">
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/25" aria-hidden="true" />
        <span className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-black" style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }} aria-hidden="true" />
        <div className="relative flex justify-between">
          {labels.map((l, i) => {
            const n = i + 1;
            const done = n < step;
            const current = n === step;
            return (
              <span key={l} className="flex w-20 flex-col items-center gap-2">
                <span className={`flex h-[15px] w-[15px] items-center justify-center rounded-full text-[8px] ${done || current ? "bg-black text-white" : "border border-black/50 bg-[#f7f2ec] text-transparent"}`}>{done ? "✓" : "•"}</span>
                <span className={`text-[10px] uppercase tracking-[0.22em] [font-family:ui-monospace,Menlo,monospace] ${current || done ? "text-black" : "text-neutral-500"}`}>{l}</span>
                {nextStep && !done && !current && <span className="text-[8px] uppercase tracking-[0.18em] text-neutral-400">Next step</span>}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CheckoutView({ cart, setCart, user, go, total, settings }: { cart: CartItem[]; setCart: (c: CartItem[]) => void; user: { name: string; email: string } | null; go: (v: View) => void; total: number; settings: Settings }) {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [email, setEmail] = useState(user?.email ?? "");
  const [accountEdit, setAccountEdit] = useState(!user);
  const [agree, setAgree] = useState(true);
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
  const [chatOpen, setChatOpen] = useState(false);
  const mountCartCount = useRef(cart.length);
  useEffect(() => { if (mountCartCount.current === 0) go({ t: "cart" }); }, []);
  const payMethods = ["Visa", "MasterCard", "American Express", "Discover", "Diners Club", "JCB", "China Union Pay", "PayPal", "Apple Pay"];
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
  const footerLinks: [string, string][] = [["Terms and conditions", "terms"], ["Privacy & cookies", "privacy"], ["Legal issues", "legal"], ["Accessibility", "accessibility"], ["Site map", "sitemap"]];

  const shell = (children: React.ReactNode, step: 1 | 2 | 3) => (
    <div className="min-h-screen" style={{ background: "#f7f2ec" }}>
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-4 sm:px-6">
        <div className="relative flex items-start">
          <button aria-label={step === 3 ? "Back to store from confirmation" : "Back to cart from checkout"} className="flex h-10 w-10 items-center justify-center" onClick={() => go(step === 3 ? { t: "home" } : { t: "cart" })}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20 12H4m0 0 6-6M4 12l6 6" /></svg>
          </button>
          <span className="absolute left-1/2 top-1 -translate-x-1/2"><HermesLogo settings={settings} variant="compact" /></span>
          <span className="w-10" />
        </div>
        <CheckoutProgress step={step} />
        {children}
      </div>
      <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2">
        {chatOpen && (
          <div className="w-64 bg-white p-4 shadow-xl" role="dialog" aria-label="Customer service help">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">Customer service</p>
            <p className="mt-2 text-sm leading-6 text-neutral-700">Monday to Saturday 10am - 9pm EST<br /><a aria-label="Call customer service from chat" className="underline" href={`tel:${settings.phone}`}>{settings.phone}</a></p>
            <button aria-label="Contact us from chat" className="mt-3 w-full bg-black py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white" onClick={() => go({ t: "page", page: "contact" })}>Contact us</button>
          </div>
        )}
        <button aria-label="Customer service chat" aria-expanded={chatOpen} className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/10" onClick={() => setChatOpen(!chatOpen)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M21 12a8 8 0 0 1-8 8H4l2.2-2.9A8 8 0 1 1 21 12Z" /><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth="2.6" strokeLinecap="round" /></svg>
        </button>
      </div>
    </div>
  );

  if (placed) return shell(
    <div className="mt-8 bg-[#fffdf9] px-5 py-10 text-center sm:px-8">
      <p className="font-serif-d text-4xl italic">Merci</p>
      <h1 className="font-serif-d mt-3 text-3xl italic">Thank you — order #{placed} confirmed</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-700">Total: {fmt2(placedTotal)} (demo checkout — no real charge). A confirmation will be sent to {email}. Your order will be delivered in the orange box tied with Bolduc ribbon.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button aria-label="View my orders after checkout" className="bg-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => go({ t: "account" })}>My Orders</button>
        <button aria-label="Track order after checkout" className="border border-black px-8 py-3 text-[11px] uppercase tracking-[0.25em]" onClick={() => go({ t: "page", page: "track" })}>Track order</button>
        <button aria-label="Continue shopping after order" className="border border-black px-8 py-3 text-[11px] uppercase tracking-[0.25em]" onClick={() => go({ t: "home" })}>Continue shopping</button>
      </div>
    </div>, 3);

  if (cart.length === 0) return shell(
    <div className="mt-8 bg-[#fffdf9] px-5 py-16 text-center">
      <h1 className="font-serif-d text-3xl italic">Your cart is empty</h1>
      <button aria-label="Shop from empty checkout" className="mt-6 border border-black px-10 py-3 text-[11px] font-semibold uppercase tracking-[0.25em]" onClick={() => go({ t: "home" })}>Discover the collections</button>
    </div>, 2);

  return shell(
    <div className="mt-6 space-y-4">
      {/* SUMMARY */}
      <section className="bg-[#fffdf9]" aria-label="Order summary section">
        <button aria-label="Checkout summary" aria-expanded={summaryOpen} className="flex w-full items-center px-5 py-5 text-left" onClick={() => setSummaryOpen(!summaryOpen)}>
          <span className={CO_HEAD}>Summary</span>
          <span className="ml-6 text-[15px] text-neutral-600">{fmt2(total)}</span>
          <span className="ml-auto text-lg" aria-hidden="true">{summaryOpen ? "⌃" : "⌄"}</span>
        </button>
        {summaryOpen && (
          <div className="px-5 pb-5">
            {cart.map((i) => (
              <div key={i.key} className="flex items-center gap-3 border-t border-black/10 py-3">
                <span className="h-14 w-14 shrink-0 overflow-hidden" aria-hidden="true"><img src={productImageFor({ name: i.name, price: i.price })} alt="" className="h-full w-full object-cover" /></span>
                <span className="min-w-0 flex-1 text-sm">{i.name}<span className="block text-xs text-neutral-500">{i.color}{i.size ? ` · ${i.size}` : ""} · Qty {i.qty}</span></span>
                <span className="text-sm">{fmt2(i.price * i.qty)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-black/10 pt-3 text-sm"><span>Shipping</span><span className="text-xs text-neutral-500">Calculated at delivery step</span></div>
            <div className="mt-1 flex justify-between text-sm font-medium"><span>Total</span><span>{fmt2(total)}</span></div>
          </div>
        )}
      </section>

      {/* ACCOUNT */}
      <section className="bg-[#fffdf9] px-5 py-5" aria-label="Account section">
        <div className="flex items-center justify-between">
          <h2 className={CO_HEAD}>Account</h2>
          {!accountEdit && (
            <button aria-label="Edit account email" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1ece3]" onClick={() => setAccountEdit(true)}>
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
              <input aria-label="Checkout email" type="email" className="mt-1 w-full bg-[#eef3f1] px-3 py-3 text-[15px] outline-none" value={email} onChange={(e) => { setEmail(e.target.value); setEmailErr(""); }} />
            </label>
            {emailErr && <p className="mt-1 text-xs text-[#b3261e]" role="status">{emailErr}</p>}
            <label className="mt-4 flex cursor-pointer items-start gap-3 bg-[#f7f2ec] p-4 text-sm leading-6 text-neutral-800">
              <input type="checkbox" aria-label="Agree to receive information about offers" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-black" />
              <span>I agree to receive information about offers, services, products and events from <span className="underline">Hermès Seller</span> and other <span className="underline">Hermès group companies</span> via phone, email, instant messaging, and mail, in accordance with the <button type="button" aria-label="Privacy Policy from account consent" className="underline" onClick={() => go({ t: "page", page: "privacy" })}>Privacy Policy</button>.</span>
            </label>
            <p className="mt-3 text-[13px] leading-5 text-neutral-400">I can update my communication preferences anytime through my customer account and opt out of commercial email messages by clicking the &quot;Unsubscribe&quot; link located at the bottom of each email.</p>
            <button aria-label="Use another email address" className="mt-3 text-sm underline underline-offset-4" onClick={() => { setEmail(""); setEmailErr(""); }}>Use another email address</button>
            <p className="mt-5 text-[13px] leading-5 text-neutral-600">By clicking on &quot;Continue&quot;, you agree that your information will be processed by Hermès International, Hermès Seller and their service providers, in accordance with the <button type="button" aria-label="Privacy Policy from continue text" className="underline" onClick={() => go({ t: "page", page: "privacy" })}>Privacy Policy</button>.</p>
            <button aria-label="Continue from account step" className="mt-4 w-full bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white" onClick={() => { if (!email.includes("@")) { setEmailErr("Please enter a valid email address."); return; } setAccountEdit(false); }}>Continue</button>
            <div className="mt-6 space-y-2 border-t border-black/10 pt-4 text-[13px] text-neutral-600">
              {footerLinks.map(([l, pg]) => <button key={l} aria-label={`Account footer ${l}`} className="block hover:underline" onClick={() => go({ t: "page", page: pg })}>{l}</button>)}
              <p className="pt-1">© Hermès 2026. All rights reserved.</p>
            </div>
          </div>
        )}
      </section>

      {/* DELIVERY */}
      <section className="bg-[#fffdf9] px-5 py-5" aria-label="Delivery section">
        <h2 className={CO_HEAD}>Delivery</h2>
        <div className="mt-4 grid grid-cols-2" role="tablist" aria-label="Delivery method">
          <button role="tab" aria-selected={tab === "ship"} aria-label="Ship to an address" className={`flex flex-col items-center gap-1.5 border-b-2 px-2 pb-3 pt-1 text-center text-[15px] ${tab === "ship" ? "border-black text-black" : "border-black/15 text-neutral-400"}`} onClick={() => { setTab("ship"); setDeliverySaved(false); }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M2.5 6h12v10h-12zM14.5 9.5h3.6l3 3.4v3.1h-6.6" /><circle cx="6.5" cy="17.8" r="1.9" /><circle cx="17.3" cy="17.8" r="1.9" /></svg>
            Ship to an<br />address
          </button>
          <button role="tab" aria-selected={tab === "collect"} aria-label="Collect in store" className={`flex flex-col items-center gap-1.5 border-b-2 px-2 pb-3 pt-1 text-center text-[15px] ${tab === "collect" ? "border-black text-black" : "border-black/15 text-neutral-400"}`} onClick={() => { setTab("collect"); setDeliverySaved(false); setStorePicked(""); }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 9.5 5.5 4h13L20 9.5a2.8 2.8 0 0 1-5.5.5 2.9 2.9 0 0 1-5 0 2.8 2.8 0 0 1-5.5-.5Z" /><path d="M5.5 12.5V20h13v-7.5M9.5 20v-4.5h5V20" /></svg>
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
                    {["United States", "United Kingdom", "France", "Canada", "Pakistan", "United Arab Emirates", "India"].map((c) => <option key={c} value={c}>{c}</option>)}
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
                    <option value="US +1">🇺🇸 US +1</option><option value="GB +44">🇬🇧 GB +44</option><option value="FR +33">🇫🇷 FR +33</option><option value="PK +92">🇵🇰 PK +92</option>
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
              setStorePicked("Hermès — 691 Madison Avenue, New York"); setDeliverySaved(true);
            }}>Find</button>
            {storePicked && (
              <div className="mt-4 border border-black/15 p-4" role="status">
                <p className="text-sm font-medium">{storePicked}</p>
                <p className="mt-1 text-sm text-neutral-600">Selected for collection — Monday to Saturday 10 AM – 9 PM. Payment is now available below.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* PAYMENT */}
      <section className="bg-[#fffdf9] px-5 py-5" aria-label="Payment section">
        <h2 className={CO_HEAD}>Payment</h2>
        {!deliverySaved ? (
          <p className="mt-3 text-sm leading-6 text-neutral-500">Payment will be available once your delivery information above is saved.</p>
        ) : (
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {payMethods.map((m) => <button key={m} aria-label={`Pay with ${m}`} className={`border px-3 py-3 text-sm ${pay === m ? "border-black bg-black text-white" : "border-black/30"}`} onClick={() => setPay(m)}>{m}</button>)}
            </div>
            <p className="mt-3 text-xs leading-5 text-neutral-500">Demo checkout only — selecting a method records it on the order; no card is charged and no card details are collected.</p>
            {order.isError && <p className="mt-2 text-sm text-red-700" role="status">The order could not be placed. Please check your details and try again.</p>}
            <button aria-label="Place order" disabled={order.isPending || accountEdit} className="mt-4 w-full bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white disabled:bg-neutral-400" onClick={() => order.mutate()}>{order.isPending ? "Placing order…" : `Place order — ${fmt2(total)}`}</button>
            {accountEdit && <p className="mt-2 text-xs text-neutral-500">Confirm your email in the Account section above before placing the order.</p>}
          </div>
        )}
      </section>

      {/* THE ORANGE BOX */}
      <section className="bg-[#fffdf9] px-5 py-5" aria-label="The orange box section">
        <h2 className={CO_HEAD}>The Orange Box</h2>
        <div className="mt-4 flex items-center gap-4">
          <span className="relative block h-20 w-20 shrink-0 overflow-hidden" style={{ background: "#e85d1f" }} aria-hidden="true">
            <span className="absolute left-1/2 top-0 h-full w-[7px] -translate-x-1/2 bg-[#5a2d16]" />
            <span className="absolute left-0 top-1/2 h-[7px] w-full -translate-y-1/2 bg-[#5a2d16]" />
            <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#5a2d16]" />
          </span>
          <p className="text-sm leading-6 text-neutral-800">All orders are delivered in an orange box tied with a Bolduc ribbon, with the exception of <button aria-label="Certain items exceptions" className="underline" onClick={() => go({ t: "page", page: "gifting" })}>certain items</button></p>
        </div>
      </section>

      {/* CUSTOMER SERVICE */}
      <section className="bg-[#fffdf9] px-5 py-5" aria-label="Customer service section">
        <h2 className={CO_HEAD}>Customer Service</h2>
        <p className="mt-4 text-sm text-neutral-600">Monday to Saturday 10am - 9pm EST :</p>
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
        <div className="mt-8 space-y-2 border-t border-black/10 pt-4 text-[13px] text-neutral-600">
          {footerLinks.map(([l, pg]) => <button key={l} aria-label={`Checkout footer ${l}`} className="block hover:underline" onClick={() => go({ t: "page", page: pg })}>{l}</button>)}
          <p className="pt-1">© Hermès 2026. All rights reserved.</p>
        </div>
      </section>
    </div>, 2);
}

function AdminView({ products, settings, qc, navOverrides, setNavOverrides }: { products: Product[]; settings: Settings; qc: ReturnType<typeof useQueryClient>; navOverrides: NavOverrides; setNavOverrides: (n: NavOverrides) => void }) {
  const [pw, setPw] = useState(""); const [adminEmail, setAdminEmail] = useState(""); const [authed, setAuthed] = useState(false); const [tab, setTab] = useState("Dashboard");
  const [msg, setMsg] = useState("");
  const dataQ = useQuery({ queryKey: ["admin", adminEmail, pw], queryFn: () => api.adminData({ email: adminEmail, password: pw }), enabled: authed });
  const blank = { id: 0, name: "", category: "women", subcategory: "", theme: "Silk", price: 0, priceLabel: "", status: "available" as const, line: "", material: "", modelSize: "", metallicFinish: "", colorsJson: JSON.stringify([{ name: "Etoupe", hex: "#8a7a68", available: true }]), description: "", story: "", tone: "#e9ede8", glyph: "◆" };
  const [form, setForm] = useState(blank);
  const [logoUploading, setLogoUploading] = useState(false);
  const [stg, setStg] = useState<Settings>(settings);
  useEffect(() => { setStg(settings); }, [settings]);
  const saveProduct = useMutation({ mutationFn: () => api.adminSaveProduct({ email: adminEmail, password: pw, ...form }), onSuccess: (r) => { setMsg(r.ok ? "Product saved — it is now live on the storefront." : "Save failed."); setForm(blank); qc.invalidateQueries({ queryKey: ["storefront"] }); dataQ.refetch(); } });
  const delProduct = useMutation({ mutationFn: (id: number) => api.adminDeleteProduct({ email: adminEmail, password: pw, id }), onSuccess: () => { setMsg("Product deleted."); qc.invalidateQueries({ queryKey: ["storefront"] }); dataQ.refetch(); } });
  const updOrder = useMutation({ mutationFn: (v: { id: number; status: string }) => api.adminUpdateOrder({ email: adminEmail, password: pw, ...v }), onSuccess: () => { setMsg("Order status updated."); dataQ.refetch(); qc.invalidateQueries({ queryKey: ["myorders"] }); } });
  const saveSettings = useMutation({ mutationFn: () => api.adminSaveSettings({ email: adminEmail, password: pw, settings: stg }), onSuccess: () => { setMsg("Settings saved — the storefront now shows the new values."); qc.invalidateQueries({ queryKey: ["storefront"] }); } });
  const [orderQ, setOrderQ] = useState(""); const [orderStatus, setOrderStatus] = useState("All"); const [orderDetail, setOrderDetail] = useState<number | null>(null);
  const [prodQ, setProdQ] = useState("");
  const [custQ, setCustQ] = useState(""); const [custDetail, setCustDetail] = useState<number | null>(null); const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
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
  const tabs = ["Dashboard", "Products", "Orders", "Customers", "Sales", "Navigation", "Newsletter", "Theme & Settings"];
  const inputCls = "w-full border border-black/25 px-3 py-2.5 text-sm bg-white";
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif-d text-3xl italic">Admin Panel</h1>
        <button aria-label="Admin sign out" className="border border-black px-5 py-2 text-[11px] uppercase tracking-[0.2em]" onClick={() => { setAuthed(false); setPw(""); setAdminEmail(""); }}>Sign out</button>
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
                <button aria-label={`Delete ${p.name}`} className="border border-red-800 px-3 py-1.5 text-[11px] uppercase tracking-wider text-red-800" onClick={() => delProduct.mutate(p.id)}>Delete</button>
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
            <select aria-label="Filter orders by status" className="border border-black/25 bg-white px-3 py-2.5 text-sm" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>{["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Placed", "Confirmed"].map(st => <option key={st} value={st}>{st}</option>)}</select>
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

      {tab === "Theme & Settings" && (
        <form className="mt-6 grid max-w-3xl gap-3" onSubmit={(e) => { e.preventDefault(); saveSettings.mutate(); }}>
          <div className="border border-black/15 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em]">Logo</p>
            <p className="mt-1 text-sm text-neutral-600">The header shows the carriage emblem + store name by default. Upload your own logo image to replace the emblem, and choose what the header displays. Changes go live on the storefront as soon as you save.</p>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="flex h-20 min-w-36 items-center justify-center border border-black/15 bg-[#f7f2ec] px-3">
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
          <button aria-label="Save settings" type="submit" className="bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white">{saveSettings.isPending ? "Saving…" : "Save settings & theme"}</button>
        </form>
      )}
    </div>
  );
}

