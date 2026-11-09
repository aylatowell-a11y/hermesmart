import { defineAction, z, type ActionsModule, type Ctx } from "@hatch/space-sdk";
import { asc, desc, eq, gte } from "drizzle-orm";
import * as schema from "./schema";
import { EXPANSION } from "./catalog-expansion";

// The Admin Panel password lives ONLY here, server-side — it is never sent
// to the client or printed anywhere in the storefront markup. Rotated
// 2026-11-07 after the previous password had been shown in the sign-in
// form's placeholder text (now removed).
const ADMIN_PASSWORD = "Lux-Admin-7392-Qm";

const productOut = z.object({
  id: z.number(), name: z.string(), category: z.string(), subcategory: z.string(),
  theme: z.string(), line: z.string(), material: z.string(), modelSize: z.string(),
  metallicFinish: z.string(), colors: z.array(z.object({ name: z.string(), hex: z.string(), available: z.boolean() })),
  price: z.number(), priceLabel: z.string(), status: z.string(), description: z.string(),
  story: z.string(), tone: z.string(), glyph: z.string(), sortOrder: z.number(),
  refCode: z.string(), galleryViews: z.array(z.string()), applePay: z.boolean(),
  sizeOptions: z.array(z.object({ label: z.string(), available: z.boolean() })),
  accordions: z.array(z.string()), shippingDelay: z.string(), detailLines: z.array(z.string()),
});
type ProductOut = z.infer<typeof productOut>;

const settingsOut = z.object({
  storeName: z.string(), phone: z.string(), heroTitle: z.string(), heroText: z.string(),
  shipTo: z.string(), deliveryText: z.string(), returnsText: z.string(),
  paymentMethods: z.string(), bgColor: z.string(), serviceHours: z.string(),
  logoMode: z.string(), logoUrl: z.string(),
});

function parseColors(raw: string): ProductOut["colors"] {
  try {
    const v = JSON.parse(raw) as unknown;
    if (Array.isArray(v)) return v.filter((c): c is { name: string; hex: string; available: boolean } =>
      typeof c === "object" && c !== null && "name" in c && "hex" in c).map(c => ({ name: String(c.name), hex: String(c.hex), available: c.available !== false }));
  } catch { /* fall through */ }
  return [{ name: "Etoupe", hex: "#8a7a68", available: true }];
}
function parseStrArr(raw: string): string[] { try { const v = JSON.parse(raw) as unknown; return Array.isArray(v) ? v.map(String) : []; } catch { return []; } }
function parseSizes(raw: string): ProductOut["sizeOptions"] { try { const v = JSON.parse(raw) as unknown; if (Array.isArray(v)) return v.filter((s): s is { label: string; available: boolean } => typeof s === "object" && s !== null && "label" in s).map(s => ({ label: String(s.label), available: s.available !== false })); } catch { /* fall through */ } return []; }
function toProduct(r: typeof schema.products.$inferSelect): ProductOut {
  return { id: r.id, name: r.name, category: r.category, subcategory: r.subcategory, theme: r.theme, line: r.line, material: r.material, modelSize: r.modelSize, metallicFinish: r.metallicFinish, colors: parseColors(r.colors), price: r.price, priceLabel: r.priceLabel, status: r.status, description: r.description, story: r.story, tone: r.tone, glyph: r.glyph, sortOrder: r.sortOrder, refCode: r.refCode ?? "", galleryViews: parseStrArr(r.galleryViews ?? ""), applePay: (r.applePay ?? 1) !== 0, sizeOptions: parseSizes(r.sizeOptions ?? ""), accordions: parseStrArr(r.accordions ?? ""), shippingDelay: r.shippingDelay ?? "", detailLines: (r.detailLines ?? "").split("\n").filter(Boolean) };
}

const C = (name: string, hex: string, available = true) => ({ name, hex, available });
type Seed = [string, string, string, string, number, string, string, string, string, string, { name: string; hex: string; available: boolean }[], string, string, string];
// name, category, subcategory, theme, price, priceLabel, line, material, size, finish, colors, status, tone, glyph
const SEED: Seed[] = [
  ["Picotin Lock 18 pocket bag", "leather", "Bags and clutches", "Leather Goods", 4850, "", "Picotin", "Maurice calfskin", "18", "Palladium", [C("Etoupe", "#8a7a68"), C("Gold", "#b98a4a"), C("Noir", "#1c1c1e", false)], "available_soon", "#e9ede8", "👜"],
  ["Le Petit Sac bag", "leather", "Bags and clutches", "Leather Goods", 6350, "", "Le Petit Sac", "Box calfskin", "PM", "Palladium", [C("Rouge H", "#6e2434"), C("Noir", "#1c1c1e")], "available_soon", "#ece9e2", "👜"],
  ["Double Longe bag", "women", "Bags and clutches", "Leather Goods", 7100, "", "Double Longe", "Epsom calfskin", "GM", "Palladium", [C("Bleu Nuit", "#2c3550")], "available_soon", "#e9ede8", "👜"],
  ["Tablier Sellier bag", "leather", "Bags and clutches", "Leather Goods", 5850, "", "Tablier Sellier", "Hunter cowhide", "MM", "Palladium", [C("Naturel", "#c8a97e")], "available_soon", "#eee9df", "👜"],
  ["Kelly Shoulder Etoupe bag", "women", "Bags and clutches", "Leather Goods", 8600, "", "Kelly", "Togo calfskin", "Shoulder", "Gold", [C("Etoupe", "#8a7a68")], "available_soon", "#e9ede8", "👜"],
  ["Bolide Plume 45 bag", "leather", "Luggage and bags", "Leather Goods", 11850, "", "Bolide", "Negonda calfskin", "45", "Palladium", [C("Noir", "#1c1c1e")], "available", "#e7eae4", "🧳"],
  ["Zipengo So Kelly pouch", "leather", "Small leather goods", "Leather Goods", 1525, "", "Zipengo", "Milo lambskin", "PM", "Palladium", [C("Gold", "#b98a4a")], "available", "#ece9e2", "👝"],
  ["Box bag", "women", "Bags and clutches", "Leather Goods", 13500, "", "Box", "Box calfskin", "MM", "Gold", [C("Noir", "#1c1c1e")], "available_soon", "#e9ede8", "👜"],
  ["Kelly Messenger bag", "men", "Bags and clutches", "Leather Goods", 14900, "", "Kelly", "Togo calfskin", "GM", "Palladium", [C("Noir", "#1c1c1e"), C("Etoupe", "#8a7a68")], "available", "#e7eae4", "💼"],
  ["Bolide 1923 mini bag", "leather", "Bags and clutches", "Leather Goods", 7300, "", "Bolide", "Epsom calfskin", "Mini", "Palladium", [C("Rose Sakura", "#e8b7c3"), C("Jaune Citron", "#e5d76a", false)], "available_soon", "#f0eae6", "👜"],
  ["Videpoches bag", "men", "Bags and clutches", "Leather Goods", 3975, "", "Videpoches", "Hunter cowhide", "PM", "Palladium", [C("Fauve", "#a6703f")], "available", "#ece9e2", "💼"],
  ["Neo Double Sens 35 bag", "women", "Bags and clutches", "Leather Goods", 5850, "", "Double Sens", "Clemence calfskin", "35", "Palladium", [C("Etoupe", "#8a7a68")], "out_of_stock", "#e9ede8", "👜"],
  ["Kelly Pocket 18 belt", "women", "Belts", "Belts", 2150, "", "Kelly", "Epsom calfskin", "18 mm", "Gold", [C("Black", "#1c1c1e"), C("Gold", "#b98a4a")], "available", "#eee9df", "〰"],
  ["Collier de Chien 50 belt", "women", "Belts", "Belts", 4975, "", "Collier de Chien", "Alligator", "50 mm", "Gold", [C("Red", "#8e2f38")], "available", "#e9ede8", "〰"],
  ["Elan Pocket 24 reversible belt", "men", "Belts", "Belts", 3625, "", "Elan", "Box calfskin", "24 mm", "Palladium", [C("Beige / Natural", "#c8a97e")], "available", "#ece9e2", "〰"],
  ["Serif belt buckle & Reversible leather strap 32 mm", "men", "Belts", "Belts", 1060, "", "Serif", "Togo calfskin", "32 mm", "Palladium", [C("Red", "#8e2f38")], "available", "#e7eae4", "〰"],
  ["Bouncing sneaker", "men", "Shoes", "Men's Shoes", 1275, "", "Bouncing", "Calfskin", "42", "", [C("Blanc", "#f2efe8"), C("Noir", "#1c1c1e")], "available", "#eef0ea", "👟"],
  ["Jet sneaker", "men", "Shoes", "Men's Shoes", 1300, "", "Jet", "Technical knit", "42", "", [C("Gris", "#9a9a94")], "available", "#e9ede8", "👟"],
  ["Nine ankle boot", "men", "Shoes", "Men's Shoes", 1450, "", "Nine", "Calfskin", "43", "", [C("Noir", "#1c1c1e")], "available_soon", "#ece9e2", "🥾"],
  ["Noe loafer", "men", "Shoes", "Men's Shoes", 1175, "", "Noe", "Suede calfskin", "42", "", [C("Brun", "#6b4a2e")], "available", "#eee9df", "👞"],
  ["Chaine d'ancre necklace, small model", "jewelry", "Fashion jewelry", "Fashion Jewelry", 720, "", "Chaine d'ancre", "Silver", "Small", "Silver", [C("Silver", "#c9c9c9")], "available", "#eef0ea", "✦"],
  ["Clic Clac H bracelet", "jewelry", "Fashion jewelry", "Fashion Jewelry", 960, "", "Clic H", "Enamel", "PM", "Gold", [C("Noir", "#1c1c1e"), C("Blanc", "#f2efe8"), C("Rouge", "#8e2f38", false)], "available", "#e9ede8", "◯"],
  ["Chaine d'ancre earrings", "jewelry", "Fashion jewelry", "Fashion Jewelry", 1000, "", "Chaine d'ancre", "Silver", "Small", "Silver", [C("Silver", "#c9c9c9")], "available", "#ece9e2", "✦"],
  ["Mini Thalassa bracelet", "jewelry", "Fashion jewelry", "Fashion Jewelry", 580, "", "Thalassa", "Swift calfskin", "T2", "Palladium", [C("Bleu", "#3c5a78")], "available", "#e7eae4", "◯"],
  ["Colliers et Laisses pour Chiens scarf 90", "women", "Scarves, shawls and stoles", "Silk", 660, "", "Scarf 90", "Silk twill", "90", "", [C("Marine / Rouge", "#31405e"), C("Vert / Sauge", "#7d8b6f"), C("Rose / Poudre", "#dfb3ba"), C("Orange / Potiron", "#d97b36"), C("Bleu / Ciel", "#9db8cc"), C("Jaune / Citron", "#e5d76a")], "available", "#f0eae6", "🧣"],
  ["Turf Les Courses Twilly", "women", "Scarves, shawls and stoles", "Silk", 260, "", "Twilly", "Silk twill", "Twilly", "", [C("Vert", "#7d8b6f"), C("Rose", "#dfb3ba")], "available", "#eef0ea", "🧣"],
  ["Casaque Jumping scarf", "women", "Scarves, shawls and stoles", "Silk", 1050, "", "Casaque", "Cashmere and silk", "140", "", [C("Naturel", "#c8a97e")], "available", "#ece9e2", "🧣"],
  ["Palonniers scarf 45", "women", "Scarves, shawls and stoles", "Silk", 325, "", "Scarf 45", "Silk twill", "45", "", [C("Bleu", "#3c5a78")], "available_soon", "#e9ede8", "🧣"],
  ["La Nature en Voyage scarf 90", "women", "Scarves, shawls and stoles", "Silk", 660, "", "Scarf 90", "Silk twill", "90", "", [C("Sauge", "#9aa88e"), C("Terracotta", "#b96a44")], "available", "#f0eae6", "🧣"],
  ["Rouge Hermès gift set, Lip care", "fragrances", "Make-up", "Beauty", 186, "", "Rouge Hermès", "Lip care", "Set", "", [C("Rouge Casaque", "#8e2f38")], "available", "#f3ecec", "💄"],
  ["Ombres d'Hermès, Eye shadow quartet, Ombres Sables", "fragrances", "Make-up", "Beauty", 121, "", "Ombres d'Hermès", "Eye shadow", "Quartet", "", [C("Ombres Sables", "#c9a887")], "available", "#eee9df", "✨"],
  ["Les Mains Hermès, Nail polish, Or Rose", "fragrances", "Make-up", "Beauty", 66, "", "Les Mains Hermès", "Nail polish", "15 ml", "", [C("Or Rose", "#d9a08a")], "available", "#f3ecec", "💅"],
  ["Bride-a-Brac Sellier case, large model", "home", "Textiles", "Beauty", 1050, "", "Bride-a-Brac", "Canvas", "Large", "", [C("Naturel", "#c8a97e")], "available", "#ece9e2", "🧳"],
  ["Musc Pallida, Eau de parfum, 3.4 fl.oz", "fragrances", "Perfumes", "Fragrances", 435, "", "Hermessence", "Eau de parfum", "3.4 fl.oz", "", [C("Musc Pallida", "#d8cfc4")], "available", "#f0eae6", "◈"],
  ["Musc Pallida refill, Eau de parfum", "fragrances", "Perfumes", "Fragrances", 595, "", "Hermessence", "Eau de parfum", "Refill", "", [C("Refill", "#d8cfc4")], "available", "#eef0ea", "◈"],
  ["Hermessence, Eau de toilette", "fragrances", "Perfumes", "Fragrances", 385, "$385 and up", "Hermessence", "Eau de toilette", "3.4 fl.oz", "", [C("Ambre Narguile", "#b98a4a")], "available", "#ece9e2", "◈"],
  ["Hermessence Essence, Eau de parfum", "fragrances", "Perfumes", "Fragrances", 465, "", "Hermessence", "Essence de parfum", "3.4 fl.oz", "", [C("Essence", "#8a7a68")], "out_of_stock", "#e9ede8", "◈"],
  ["Cape Cod watch, Large model, 37 mm", "watches", "Cape Cod", "Watches", 3950, "", "Cape Cod", "Steel", "Large 37 mm", "Steel", [C("Etoupe strap", "#8a7a68"), C("Noir strap", "#1c1c1e")], "available", "#e7eae4", "⌚"],
  ["Cape Cod watch, Small model, 31 mm", "watches", "Cape Cod", "Watches", 3825, "", "Cape Cod", "Steel", "Small 31 mm", "Steel", [C("Gold strap", "#b98a4a")], "available", "#ece9e2", "⌚"],
  ["Hermès H08 watch, 42 mm", "watches", "Hermès H08", "Watches", 8600, "", "Hermès H08", "Titanium", "42 mm", "Titanium", [C("Noir", "#1c1c1e")], "available", "#e9ede8", "⌚"],
  ["Hermès Cut watch, Large model, 36 mm", "watches", "Hermès Cut", "Watches", 7125, "$7,125 – $17,025", "Hermès Cut", "Steel", "Large 36 mm", "Steel", [C("Steel", "#c9c9c9")], "available", "#eef0ea", "⌚"],
  ["Kelly watch, Mini model, 16 mm, Grey", "watches", "Kelly", "Watches", 6750, "", "Kelly", "Steel", "Mini 16 mm", "Steel", [C("Gris", "#9a9a94")], "available", "#ece9e2", "⌚"],
  ["Kelly watch, Mini model, 16 mm, Pink gold", "watches", "Kelly", "Watches", 45600, "", "Kelly", "Pink gold", "Mini 16 mm", "Pink gold", [C("Rose", "#dfb3ba")], "in_store_only", "#f0eae6", "⌚"],
  ["Avalon throw blanket", "home", "Blankets and throws", "Home", 1875, "", "Avalon", "Wool and cashmere", "Throw", "", [C("Ecru / Gris", "#d8cfc4")], "available", "#eee9df", "▦"],
  ["Mosaique au 24 dinner plate, set of 2", "home", "Tableware", "Home", 340, "", "Mosaique au 24", "Porcelain", "Set of 2", "Gold", [C("Gold", "#c9a227")], "available", "#eef0ea", "◎"],
  ["Saddle and bridle set", "equestrian", "Tack", "Equestrian", 8900, "", "Equestrian", "Leather", "Full", "Palladium", [C("Noir", "#1c1c1e")], "available_soon", "#ece9e2", "♞"],
  ["Rider jacket", "equestrian", "Rider clothing", "Equestrian", 2450, "", "Equestrian", "Technical fabric", "M", "", [C("Marine", "#31405e")], "available", "#e9ede8", "♞"],
  ["Gift card", "gifts", "Gift cards", "Gifts", 250, "$250 and up", "Gift card", "Card", "Digital", "", [C("Orange box", "#e85d1f")], "available", "#f7ead9", "🎁"],
  ["Silk gift set for her", "gifts", "For women", "Gifts", 920, "", "Gift set", "Silk twill", "Set", "", [C("Rose", "#dfb3ba")], "available", "#f0eae6", "🎁"],
];

type NewProd = { name: string; category: string; subcategory: string; theme: string; price: number; line: string; material: string; modelSize: string; metallicFinish: string; colors: { name: string; hex: string; available: boolean }[]; status: "available" | "available_soon" | "out_of_stock" | "in_store_only"; tone: string; glyph: string; refCode: string; galleryViews: string[]; applePay: number; sizeOptions: { label: string; available: boolean }[]; accordions: string[]; shippingDelay: string; detailLines: string[]; description: string };
// Product-page accordions (user's own phone video of hermes.com, 8 Nov 2026:
// the mobile product page DOES show "PRODUCT DETAILS" above CARE — this
// supersedes the earlier desktop-audit reading). The stored set matches what
// visitors see: PRODUCT DETAILS / CARE / DELIVERY & RETURNS / GIFTING.
const ACC4 = ["PRODUCT DETAILS", "CARE", "DELIVERY & RETURNS", "GIFTING"];
const NEW_PRODUCTS: NewProd[] = [
  { name: "Mid-length buttoned dress", category: "women", subcategory: "Dresses and skirts", theme: "", price: 6700, line: "Fall-Winter 2026", material: "Ottoman viscose and silk knit (38% viscose, 38% wool, 22% polyamide)", modelSize: "42", metallicFinish: "", colors: [C("Noir", "#1c1c1e")], status: "available", tone: "#e9ede8", glyph: "👗", refCode: "H6H2542D50242", galleryViews: ["Worn", "Video", "Worn", "Worn", "Worn", "Worn", "Worn"], applePay: 0, sizeOptions: [{ label: "42", available: true }], accordions: ACC4, shippingDelay: "Ships in 7 to 10 business days", detailLines: ["Model wears size 36 and is 178 cm (5'10\") tall", "V-neck", "Shiny Ottoman knit", "Made in Italy"], description: "Mid-length buttoned dress in shiny Ottoman viscose and silk knit with a V-neck. The model wears size 36 and is 178 cm tall. Made in Italy." },
  { name: "Bouncing sneaker, Blanc", category: "men", subcategory: "Shoes", theme: "Men's Shoes", price: 1125, line: "Bouncing", material: "Suede goatskin, calfskin and technical canvas", modelSize: "42", metallicFinish: "", colors: [C("Blanc", "#f2efe8"), C("Noir", "#1c1c1e"), C("Gris", "#9a9a94"), C("Marine", "#31405e"), C("Naturel", "#c8a97e")], status: "available", tone: "#eef0ea", glyph: "👟", refCode: "H262850ZH90", galleryViews: ["Front", "Worn", "Side", "Back", "Detail", "Above"], applePay: 1, sizeOptions: ["39", "39.5", "40", "40.5", "41", "41.5", "42", "42.5", "43", "43.5", "44", "44.5", "45", "45.5", "46", "46.5", "47", "47.5", "48"].map(l => ({ label: l, available: !["47", "47.5", "48"].includes(l) })), accordions: ACC4, shippingDelay: "", detailLines: ["Also available as H261015Zv90 — $1,125", "+21 more colours available", "Made in Italy"], description: "Bouncing sneaker in suede goatskin, calfskin and technical canvas with a light sole. Made in Italy." },
  { name: "Chaine d'ancre Contour bracelet, white gold", category: "jewelry", subcategory: "Fashion jewelry", theme: "Fashion Jewelry", price: 5400, line: "Chaine d'ancre", material: "White gold 750/1000", modelSize: "XS", metallicFinish: "White gold", colors: [], status: "available", tone: "#eef0ea", glyph: "✦", refCode: "H123405B 00XS", galleryViews: ["Front", "Worn on wrist", "Front"], applePay: 1, sizeOptions: ["XS", "SH", "ST", "LG"].map(l => ({ label: l, available: true })), accordions: ACC4, shippingDelay: "", detailLines: ["Interior circumference: 5.7\"", "Link size: 0.62\" x 0.37\"", "Set with 33 diamonds", "Made in France"], description: "Chaine d'ancre Contour bracelet in white gold 750/1000, set with 33 diamonds. Interior circumference 5.7\", link 0.62\" x 0.37\". Made in France." },
  { name: "Arceau Petite Lune watch, Large model, 38 mm", category: "watches", subcategory: "Arceau", theme: "Watches", price: 20800, line: "Arceau", material: "Steel", modelSize: "Large 38 mm", metallicFinish: "Steel", colors: [C("Bleu Saphir", "#2c3550")], status: "available", tone: "#e7eae4", glyph: "⌚", refCode: "W403043WW00", galleryViews: ["Front", "Worn", "Detail dial", "Front"], applePay: 1, sizeOptions: [], accordions: [...ACC4, "USER GUIDE"], shippingDelay: "Ships in 7 to 10 business days", detailLines: ["Case size: Large 38 mm", "Strap: Bleu Saphir", "Made in Switzerland"], description: "Arceau Petite Lune watch, Large model 38 mm in steel with a Bleu Saphir strap and moon-phase dial. Made in Switzerland." },
  { name: "Matte lipstick, Rose Boisé", category: "fragrances", subcategory: "Make-up", theme: "Beauty", price: 86, line: "Rouge Hermès", material: "Matte lipstick", modelSize: "0.12 oz", metallicFinish: "", colors: [C("48 Rose Boisé", "#a15c68"), C("Rose Velours", "#b76e79"), C("Rouge Amarante", "#8e2f38"), C("Orange Boîte", "#d97b36"), C("Corail Tempête", "#e07856")], status: "available", tone: "#f3ecec", glyph: "💄", refCode: "V60001MV048", galleryViews: ["Front", "Detail", "Open", "Swatch", "Worn", "Case", "Back"], applePay: 1, sizeOptions: [], accordions: ["INGREDIENTS", "HOW TO USE", "DELIVERY & RETURNS", "GIFTING"], shippingDelay: "", detailLines: ["Volume: 0.12 oz", "+6 more shades available", "Made in Italy"], description: "Rouge Hermès matte lipstick, 48 Rose Boisé. Volume 0.12 oz. Made in Italy." },
  // Verified on hermes.com desktop, 7 Nov 2026 — Belts theme grid + Keep exploring sneakers (names/prices/colours exactly as listed there).
  { name: "H belt buckle & Reversible leather strap 38 mm", category: "women", subcategory: "Belts", theme: "Belts", price: 1700, line: "H", material: "Calfskin", modelSize: "38 mm", metallicFinish: "", colors: [C("Black / Gris Foncé", "#232323")], status: "available", tone: "#eee9df", glyph: "〰", refCode: "", galleryViews: [], applePay: 1, sizeOptions: [], accordions: ACC4, shippingDelay: "", detailLines: ["Strap width: 38 mm", "Reversible strap"], description: "Belt with H buckle and a reversible leather strap, 38 mm — Black on one side, Gris Foncé on the other." },
  { name: "Etriviere belt buckle & Reversible leather strap 38 mm", category: "women", subcategory: "Belts", theme: "Belts", price: 985, line: "Etriviere", material: "Calfskin", modelSize: "38 mm", metallicFinish: "", colors: [C("Black / Blue Lin", "#31405e")], status: "available", tone: "#eef0ea", glyph: "〰", refCode: "", galleryViews: [], applePay: 1, sizeOptions: [], accordions: ACC4, shippingDelay: "", detailLines: ["Strap width: 38 mm", "Reversible strap"], description: "Belt with Etriviere buckle and a reversible leather strap, 38 mm — Black on one side, Blue Lin on the other." },
  { name: "Etriers belt buckle & Reversible leather strap 38 mm", category: "women", subcategory: "Belts", theme: "Belts", price: 1060, line: "Etriers", material: "Calfskin", modelSize: "38 mm", metallicFinish: "", colors: [C("Blue Moyen", "#4a6a9a")], status: "available", tone: "#e7eae4", glyph: "〰", refCode: "", galleryViews: [], applePay: 1, sizeOptions: [], accordions: ACC4, shippingDelay: "", detailLines: ["Strap width: 38 mm", "Reversible strap"], description: "Belt with Etriers buckle and a reversible leather strap, 38 mm, in Blue Moyen." },
  { name: "Neon sneaker", category: "men", subcategory: "Shoes", theme: "Men's Shoes", price: 1350, line: "Neon", material: "Calfskin", modelSize: "42", metallicFinish: "", colors: [], status: "available", tone: "#eef0ea", glyph: "👟", refCode: "", galleryViews: [], applePay: 1, sizeOptions: [], accordions: ACC4, shippingDelay: "", detailLines: [], description: "Neon sneaker in calfskin with a light sole." },
  { name: "Next sneaker", category: "men", subcategory: "Shoes", theme: "Men's Shoes", price: 1450, line: "Next", material: "Calfskin", modelSize: "42", metallicFinish: "", colors: [], status: "available", tone: "#e9ede8", glyph: "👟", refCode: "", galleryViews: [], applePay: 1, sizeOptions: [], accordions: ACC4, shippingDelay: "", detailLines: [], description: "Next sneaker in calfskin with a light sole." },
  { name: "Nobu sneaker", category: "men", subcategory: "Shoes", theme: "Men's Shoes", price: 1400, line: "Nobu", material: "Calfskin", modelSize: "42", metallicFinish: "", colors: [], status: "available", tone: "#f0eae6", glyph: "👟", refCode: "", galleryViews: [], applePay: 1, sizeOptions: [], accordions: ACC4, shippingDelay: "", detailLines: [], description: "Nobu sneaker in calfskin with a light sole." },
  // Verified live on hermes.com (7 Nov 2026 video audit): gallery 7 items —
  // view 1 Worn, view 2 VIDEO, views 3-7 Worn. Second colour Noir is out of
  // stock (colour swatch disabled; Notify Me copy on the real page).
  { name: "Long sleeveless dress", category: "women", subcategory: "Dresses and skirts", theme: "", price: 4550, line: "Spring-Summer 2026", material: "Silk", modelSize: "", metallicFinish: "", colors: [C("Blanc Céramique", "#f2efe8"), C("Noir", "#1c1c1e", false)], status: "available", tone: "#f0eae6", glyph: "👗", refCode: "H6H2521D7DC", galleryViews: ["Worn", "Video", "Worn", "Worn", "Worn", "Worn", "Worn"], applePay: 1, sizeOptions: [], accordions: ACC4, shippingDelay: "", detailLines: ["Made in France"], description: "Long sleeveless dress in Blanc Céramique, worn full-length with cream mules. The Noir colourway is currently out of stock — we will notify you when it is back in stock." },
  // Audited on hermes.com (7 Nov 2026): product/le-philateliste-du-faubourg-scarf-90-H004205Sv12
  // — $660, Marine / Blanc / Indigo selected, gallery exactly Flat / Worn / Detail, no video in
  // the gallery (the tying video sits below the description as a separate editorial block).
  { name: "Le Philateliste du Faubourg scarf 90", category: "women", subcategory: "Scarves, shawls and stoles", theme: "Silk", price: 660, line: "Scarf 90", material: "Silk twill (100% silk)", modelSize: "90", metallicFinish: "", colors: [C("Marine / Blanc / Indigo", "#31405e"), C("Vermillon / Crème / Lie de Vin", "#a03428")], status: "available", tone: "#f0eae6", glyph: "🧣", refCode: "H004205S 12", galleryViews: ["Flat", "Worn", "Detail"], applePay: 1, sizeOptions: [], accordions: ACC4, shippingDelay: "", detailLines: ["Designed by Octave Marsal", "Dimensions: 34.8\" x 34.8\" — hand-rolled edges, so dimensions may vary", "Made in France"], description: "Le Philateliste du Faubourg scarf 90 in silk twill with hand-rolled edges (100% silk), designed by Octave Marsal. The postage-stamp print covers the whole scarf. Made in France." },
  // From the user's phone video of hermes.com (8 Nov 2026): the Spring-Summer
  // 2026 Collection page and the Embroidered pocket dress page, whose
  // "Perfect Partner" row is exactly the first four products below (in this
  // order) — they share the dress's theme so the partner row resolves to
  // them. Prices/names exactly as shown in the video.
  { name: "Kelly 18 belt", category: "women", subcategory: "Belts", theme: "Spring-Summer 2026", price: 1375, line: "Kelly", material: "Calfskin", modelSize: "", metallicFinish: "Gold plated", colors: [C("Blanc Craie", "#efe9df")], status: "available", tone: "#eee9df", glyph: "〰", refCode: "", galleryViews: ["Front", "Worn", "Detail"], applePay: 1, sizeOptions: [], accordions: ACC4, shippingDelay: "", detailLines: ["Made in France"], description: "Kelly 18 belt in Blanc Craie calfskin with a pocket-shaped buckle in gold plated metal, inspired by the flap of the Kelly bag. Made in France." },
  { name: "Rouge Hermès Nourishing lip care mask", category: "fragrances", subcategory: "Make-up", theme: "Spring-Summer 2026", price: 100, line: "Rouge Hermès", material: "Lip care mask", modelSize: "", metallicFinish: "", colors: [C("Orange", "#e07856")], status: "available", tone: "#f3ecec", glyph: "💄", refCode: "", galleryViews: ["Front", "Open", "Detail"], applePay: 1, sizeOptions: [], accordions: ACC4, shippingDelay: "", detailLines: ["Made in Italy"], description: "Rouge Hermès nourishing lip care mask — a balm mask that nourishes, smooths and protects the lips. Made in Italy." },
  { name: "Milo L'Aventure bucket hat", category: "women", subcategory: "Hats and gloves", theme: "Spring-Summer 2026", price: 610, line: "", material: "Cotton canvas", modelSize: "", metallicFinish: "", colors: [C("Blanc", "#f2efe8")], status: "available", tone: "#eef0ea", glyph: "🎩", refCode: "", galleryViews: ["Front", "Side", "Detail"], applePay: 1, sizeOptions: [], accordions: ACC4, shippingDelay: "", detailLines: ["Made in France"], description: "Milo L'Aventure bucket hat in white cotton canvas with a printed carriage motif. Made in France." },
  { name: "Swing dressage breeches", category: "equestrian", subcategory: "Rider clothing", theme: "Spring-Summer 2026", price: 1350, line: "", material: "Technical fabric", modelSize: "", metallicFinish: "", colors: [C("Blanc", "#f2efe8")], status: "available", tone: "#f0eae6", glyph: "♞", refCode: "", galleryViews: ["Front", "Side", "Back", "Detail"], applePay: 1, sizeOptions: ["36", "38", "40", "42"].map(l => ({ label: l, available: true })), accordions: ACC4, shippingDelay: "", detailLines: ["Made in Italy"], description: "Swing dressage breeches in a white technical fabric, cut for the saddle and worn with tall riding boots. Made in Italy." },
  { name: "\"H\" jogging pants", category: "women", subcategory: "Pants and shorts", theme: "", price: 1775, line: "Spring-Summer 2026", material: "Cotton", modelSize: "", metallicFinish: "", colors: [C("Blanc", "#f2efe8")], status: "available", tone: "#eef0ea", glyph: "👖", refCode: "", galleryViews: ["Front", "Side", "Back", "Detail"], applePay: 1, sizeOptions: ["36", "38", "40", "42"].map(l => ({ label: l, available: true })), accordions: ACC4, shippingDelay: "", detailLines: ["Made in Italy"], description: "\"H\" jogging pants in white cotton with a drawstring waist and an embroidered \"H\" detail, from the Spring-Summer 2026 collection. Made in Italy." },
  // The dress itself — exact data read from the user's video frame (8 Nov
  // 2026): $820, colour Blanc, ref H6S4515D5A039, Made in Italy, gallery of 4
  // (Front / Side / Back / Detail of the embroidered pocket), size drawer.
  { name: "Embroidered pocket dress", category: "women", subcategory: "Dresses and skirts", theme: "Spring-Summer 2026", price: 820, line: "Spring-Summer 2026", material: "Cotton jersey (100% cotton)", modelSize: "", metallicFinish: "", colors: [C("Blanc", "#f2efe8")], status: "available", tone: "#f0eae6", glyph: "👗", refCode: "H6S4515D5A039", galleryViews: ["Front", "Side", "Back", "Detail"], applePay: 1, sizeOptions: ["34", "36", "38", "40", "42"].map(l => ({ label: l, available: true })), accordions: ACC4, shippingDelay: "", detailLines: ["Crewneck with rib trim", "Front pocket with 'Mosaique' embroidery", "This piece runs true-to-size.", "Made in Italy"], description: "Straight dress in plain cotton jersey (100% cotton). Crewneck with rib trim and a front pocket with 'Mosaique' embroidery. This piece runs true-to-size. Made in Italy." },
];
async function ensureVerifiedProducts(ctx: Ctx) {
  const db = ctx.db<typeof schema>();
  const all = await db.select({ id: schema.products.id, name: schema.products.name }).from(schema.products);
  const names = new Set(all.map(p => p.name));
  const now = new Date();
  for (const np of NEW_PRODUCTS) {
    if (names.has(np.name)) continue;
    await db.insert(schema.products).values({ name: np.name, category: np.category, subcategory: np.subcategory, theme: np.theme, price: np.price, priceLabel: "", line: np.line, material: np.material, modelSize: np.modelSize, metallicFinish: np.metallicFinish, colors: JSON.stringify(np.colors), status: np.status, description: np.description, story: `The story behind — ${np.name} continues a Hermès line first imagined in the Maison's workshops, reinterpreted each season in new materials and colourways.`, tone: np.tone, glyph: np.glyph, refCode: np.refCode, galleryViews: JSON.stringify(np.galleryViews), applePay: np.applePay, sizeOptions: JSON.stringify(np.sizeOptions), accordions: JSON.stringify(np.accordions), shippingDelay: np.shippingDelay, detailLines: np.detailLines.join("\n"), sortOrder: 500, createdAt: now });
  }
  // Verified corrections to existing rows (idempotent: only fills empty ref codes)
  const rows = await db.select().from(schema.products);
  const petit = rows.find(r => r.name === "Le Petit Sac bag");
  if (petit && !petit.refCode) {
    await db.update(schema.products).set({ status: "out_of_stock", colors: JSON.stringify([C("Caramel", "#b07a45", false)]), material: "Reversible Mysore goatskin", metallicFinish: "Yellow gold plated", refCode: "H087967CC28", galleryViews: JSON.stringify(["Front", "Worn", "Side", "Above", "Back"]), accordions: JSON.stringify(ACC4), detailLines: ["Dimensions: L 7.9\" x H 4.5\" x W 0.8\"", "Handle length: 7.1\"", "H-shaped D-rings", "Lambskin lining", "Made in France"].join("\n"), description: "Le Petit Sac bag in reversible Mysore goatskin with H-shaped D-rings and a lambskin lining. Yellow gold plated hardware. Made in France." }).where(eq(schema.products.id, petit.id));
  }
  const avalon = rows.find(r => r.name === "Avalon throw blanket");
  if (avalon && !avalon.refCode) {
    await db.update(schema.products).set({ price: 2050, colors: JSON.stringify([C("Ecru / Camel", "#c8a97e"), C("Ecru / Gris foncé", "#5a5a54"), C("Vert Cèdre", "#5f7161")]), refCode: "H102668M 59", galleryViews: JSON.stringify(["Front", "Worn (wrapped)", "Detail", "Back", "Folded"]), applePay: 0, accordions: JSON.stringify(["DELIVERY & RETURNS", "GIFTING"]), detailLines: ["Dimensions: 53.1\" x 66.9\"", "90% Merinos wool, 10% cashmere", "Designed by Hermès Studio", "Made in Great Britain"].join("\n"), material: "Merinos wool and cashmere", description: "Avalon throw blanket in 90% Merinos wool and 10% cashmere, 53.1\" x 66.9\". Designed by Hermès Studio. Made in Great Britain." }).where(eq(schema.products.id, avalon.id));
  }
  // Homepage BELTS theme colours — verified on hermes.com (7 Nov 2026): the
  // theme grid shows Kelly Pocket 18 in Black, Collier de Chien 50 in Red,
  // Elan Pocket 24 in Beige/Natural and the Serif strap in Red. Corrects
  // only rows still carrying the ORIGINAL seed colourways (Noir / Noir-Gold
  // / Noir-Etoupe), so admin edits made later are never overwritten.
  const beltColors: Record<string, { name: string; hex: string; available: boolean }[]> = {
    "Kelly Pocket 18 belt": [C("Noir", "#1c1c1e"), C("Vert Foncé", "#2e4a3a"), C("Etoupe", "#8a7a68")],
    "Collier de Chien 50 belt": [C("Red", "#8e2f38")],
    "Elan Pocket 24 reversible belt": [C("Beige / Natural", "#c8a97e")],
    "Serif belt buckle & Reversible leather strap 32 mm": [C("Red", "#8e2f38")],
  };
  const oldBeltFirst = new Set(["Noir", "Noir / Gold", "Noir / Etoupe"]);
  for (const r of rows) {
    const target = beltColors[r.name];
    if (!target || !target[0]) continue;
    const cur = parseColors(r.colors);
    if (cur[0] && oldBeltFirst.has(cur[0].name) && cur[0].name !== target[0].name) {
      await db.update(schema.products).set({ colors: JSON.stringify(target) }).where(eq(schema.products.id, r.id));
    }
  }
  // Belts theme order — the verified hermes.com theme grid leads with these four, in this order.
  const beltOrder: Record<string, number> = { "Kelly Pocket 18 belt": 120, "H belt buckle & Reversible leather strap 38 mm": 121, "Etriviere belt buckle & Reversible leather strap 38 mm": 122, "Etriers belt buckle & Reversible leather strap 38 mm": 123, "Collier de Chien 50 belt": 124, "Elan Pocket 24 reversible belt": 125, "Serif belt buckle & Reversible leather strap 32 mm": 126 };
  for (const r of rows) {
    const target = beltOrder[r.name];
    if (target !== undefined && r.sortOrder !== target) {
      await db.update(schema.products).set({ sortOrder: target }).where(eq(schema.products.id, r.id));
    }
  }
  // Product-page audit corrections (hermes.com product links opened one by one,
  // 7 Nov 2026). Each is gated on the row still carrying its pre-audit marker,
  // so the correction lands exactly once and never overwrites later admin edits.
  const kellyBelt = rows.find(r => r.name === "Kelly Pocket 18 belt");
  if (kellyBelt && !kellyBelt.refCode) {
    await db.update(schema.products).set({ refCode: "H081120CK89", colors: JSON.stringify([C("Noir", "#1c1c1e"), C("Vert Foncé", "#2e4a3a"), C("Etoupe", "#8a7a68")]), metallicFinish: "Argenté", galleryViews: JSON.stringify(["Front", "Worn", "Front", "Detail"]), detailLines: ["Belt width: 13 mm", "Buckle with yellow gold plated band", "Pocket shaped like the Kelly bag flap, with a zipped pocket at the back", "Finish options: Gold, Argenté", "Made in France"].join("\n"), description: "Kelly Pocket 18 belt in Epsom calfskin (100% calfskin), 13 mm wide. Its buckle features a yellow gold plated band, and its pocket — shaped like the Kelly bag flap — conceals a zipped pocket at the back. Made in France.", story: "The Kelly pocket belt — reinventing the codes of the iconic Kelly, its pocket echoes the flap of the Kelly bag." }).where(eq(schema.products.id, kellyBelt.id));
  }
  const picotin = rows.find(r => r.name === "Picotin Lock 18 pocket bag");
  if (picotin && !picotin.refCode) {
    await db.update(schema.products).set({ refCode: "H083189CCBQ", colors: JSON.stringify([C("Vert Loden", "#4a5d43", false)]), material: "Goeland canvas and Swift calfskin", galleryViews: JSON.stringify(["Front", "Side", "Above", "Back"]), detailLines: ["Dimensions: L 7.1\" x H 7.5\" x D 5.1\"", "Leather cord lock, yellow gold plated, with blue \"H\" stitching", "Key chain inside", "Two exterior pockets forming four compartments", "Hand carry", "Made in France"].join("\n"), description: "Picotin Lock 18 pocket bag in Goeland canvas and Swift calfskin, Vert Loden. Its leather cord lock is yellow gold plated with blue \"H\" stitching; a key chain sits inside, and two exterior pockets form four compartments. Hand carry. Made in France.", story: "A legend on a more spacious scale." }).where(eq(schema.products.id, picotin.id));
  }
  const dress = rows.find(r => r.name === "Mid-length buttoned dress");
  if (dress && dress.refCode === "H6H2542D50242") {
    await db.update(schema.products).set({ refCode: "H6H2542D502", colors: JSON.stringify([C("Noir", "#1c1c1e"), C("Gorgeous Blue", "#7a9cc4")]), material: "Shiny Ottoman viscose and silk knit (38% viscose, 38% wool, 22% polyamide, 2% elastane)", detailLines: ["Model wears size 36 and is 178 cm (5'10\") tall", "Length: 114.5 cm (45\")", "Sleeveless dress with rounded collar", "Corozo buttons", "Made in Italy"].join("\n"), description: "Mid-length buttoned dress in shiny Ottoman viscose and silk knit (38% viscose, 38% wool, 22% polyamide, 2% elastane). Sleeveless dress with a rounded collar and Corozo buttons. Length 114.5 cm (45\"). Made in Italy.", story: "The new silk and knit Ottoman fabric — a shiny Ottoman knit that gives the silhouette its fluid structure." }).where(eq(schema.products.id, dress.id));
  }
  // Made-in correction for the same dress (live hermes.com page fetched
  // 2026-11-07 states "Made in Italy"; an earlier re-check read the same).
  // Rows already carrying ref H6H2542D502 from the block above still show
  // "Made in France" — swap only that country name, nothing else, and only
  // while the row still contains it, so the fix lands once and never
  // overwrites a later admin edit.
  const dressMadeIn = rows.find(r => r.name === "Mid-length buttoned dress");
  if (dressMadeIn && dressMadeIn.refCode === "H6H2542D502" && (dressMadeIn.detailLines ?? "").includes("Made in France")) {
    await db.update(schema.products).set({
      detailLines: (dressMadeIn.detailLines ?? "").split("Made in France").join("Made in Italy"),
      description: (dressMadeIn.description ?? "").split("Made in France").join("Made in Italy"),
    }).where(eq(schema.products.id, dressMadeIn.id));
  }
  // Accordion data restoration (user's phone video of hermes.com, 8 Nov
  // 2026): the mobile product page DOES have a "PRODUCT DETAILS" accordion
  // above CARE, superseding the earlier desktop audit that removed it. An
  // earlier correction stripped that entry from stored rows (and the
  // original seed stored no set at all); normalize every row to the
  // canonical four — PRODUCT DETAILS / CARE / DELIVERY & RETURNS / GIFTING,
  // in that order — keeping any extra entries the row carries (a watch's
  // USER GUIDE, the lipstick's INGREDIENTS / HOW TO USE) after them.
  // Idempotent: once a row matches, it is never rewritten again.
  const ACC_CORE = ["PRODUCT DETAILS", "CARE", "DELIVERY & RETURNS", "GIFTING"];
  for (const r of rows) {
    const acc = parseStrArr(r.accordions ?? "");
    const next = [...ACC_CORE, ...acc.filter((a) => !ACC_CORE.includes(a))];
    if (JSON.stringify(next) !== JSON.stringify(acc)) {
      await db.update(schema.products).set({ accordions: JSON.stringify(next) }).where(eq(schema.products.id, r.id));
    }
  }
  // Collection lines (user's phone video, 8 Nov 2026): the Ready-to-Wear
  // sub-nav leads with "Fall-Winter 2026 Collection" and "Spring-Summer 2026
  // Collection", and the dresses COLLECTION facet lists those two seasons.
  // This store files its current dress stock under Fall-Winter 2026 and the
  // video's two new pieces (plus the Blanc Céramique long dress) under
  // Spring-Summer 2026. Gated on the row still carrying the old generic
  // line ("" or "Ready-to-Wear"), so later admin edits are never overwritten.
  const SS2026 = new Set(["Embroidered pocket dress", "Long sleeveless dress"]);
  for (const r of rows) {
    if (r.subcategory !== "Dresses and skirts") continue;
    if (r.line !== "" && r.line !== "Ready-to-Wear") continue;
    const target = SS2026.has(r.name) ? "Spring-Summer 2026" : "Fall-Winter 2026";
    await db.update(schema.products).set({ line: target }).where(eq(schema.products.id, r.id));
  }
  const bouncingBlanc = rows.find(r => r.name === "Bouncing sneaker, Blanc");
  if (bouncingBlanc && (bouncingBlanc.detailLines ?? "").includes("+21 more")) {
    await db.update(schema.products).set({ colors: JSON.stringify([C("Blanc", "#f2efe8"), C("Beige Racine / Blanc", "#d8c9ae"), C("Bleu Minéral / Blanc", "#7d94ac"), C("Noir", "#1c1c1e"), C("Bleu Jean", "#4a6a9a")]), galleryViews: JSON.stringify(["Front", "Worn", "Side", "Back", "Detail", "Above"]), sizeOptions: JSON.stringify([{ label: "37.5", available: true }, { label: "38.5", available: false }, { label: "41.5", available: true }]), detailLines: ["Also available as H261015Zv90 — $1,125", "+23 more colors available", "Contrasting sole with \"H\" insert and \"H\" logo pattern", "Double-functional insole — sole in rubber, lining in lambskin", "Height: 1 cm (0.4\")", "Made in Italy"].join("\n"), description: "Bouncing sneaker in suede goatskin and calfskin, Blanc. Contrasting sole with an \"H\" insert and \"H\" logo pattern, contrasting details at the ankle and a double-functional insole. Sole in rubber, lining in lambskin. Height 1 cm (0.4\"). Made in Italy.", story: "A sneaker with a spring in its step." }).where(eq(schema.products.id, bouncingBlanc.id));
  }
}

// Catalog expansion (2026-11-07): real Hermès products/prices extracted from
// hermes.com category pages (see catalog-expansion.ts header). Idempotent:
// expansion rows live at sortOrder >= 2000; a partial run is rebuilt whole.
async function ensureExpansion(ctx: Ctx) {
  const db = ctx.db<typeof schema>();
  const existing = await db.select({ id: schema.products.id }).from(schema.products).where(gte(schema.products.sortOrder, 2000));
  if (existing.length >= EXPANSION.length) return;
  if (existing.length > 0) await db.delete(schema.products).where(gte(schema.products.sortOrder, 2000));
  const tones = ["#e9ede8", "#ece9e2", "#eef0ea", "#f0eae6", "#eee9df", "#e7eae4", "#f3ecec"];
  const now = new Date();
  const materialFor = (cat: string, sub: string): string =>
    sub === "Bags and clutches" ? "Leather" :
    sub === "Shoes" ? "Leather" :
    sub === "Bracelets" ? "Gold" :
    sub === "Scarves, shawls and stoles" ? "Silk" :
    cat === "watches" ? "Metal" :
    sub === "Tableware" ? "Porcelain" :
    sub === "Blankets and throws" ? "Wool and cashmere" : "";
  const values = EXPANSION.map((r, i) => {
    const [name, price, priceLabel, category, subcategory, theme] = r;
    const isMosaiquePouch = name === "“Mosaique” pouch dress";
    const isWraparound = name === "Wraparound dress";
    return {
      name, category, subcategory, theme, price, priceLabel,
      line: subcategory === "Bracelets" ? "Gold jewelry" : subcategory === "Dresses and skirts" ? "Fall-Winter 2026" : "",
      material: materialFor(category, subcategory), modelSize: "", metallicFinish: "",
      colors: JSON.stringify(isMosaiquePouch ? [C("Rose Pivoine", "#dfb3ba"), C("Noir", "#1c1c1e")] : []),
      status: "available" as const,
      description: `${name}. A Hermès creation from the ${subcategory} collection, made with the Maison's savoir-faire. Delivered in the orange box tied with Bolduc ribbon.`,
      story: `The story behind — ${name} continues a Hermès line first imagined in the Maison's workshops, reinterpreted each season in new materials and colourways.`,
      tone: tones[i % tones.length] ?? "#e9ede8", glyph: "◆",
      refCode: "",
      galleryViews: JSON.stringify(isMosaiquePouch ? ["Worn", "Worn", "Worn", "Worn", "Worn"] : isWraparound ? ["Worn", "Worn", "Worn", "Worn", "Worn", "Front", "Worn"] : []),
      applePay: 1, sizeOptions: JSON.stringify([]), accordions: JSON.stringify(ACC4),
      shippingDelay: "", detailLines: "", sortOrder: 2000 + i, createdAt: now,
    };
  });
  for (let s = 0; s < values.length; s += 100) {
    await db.insert(schema.products).values(values.slice(s, s + 100));
  }
}

async function ensureSeed(ctx: Ctx) {
  const db = ctx.db<typeof schema>();
  const existing = await db.select({ id: schema.products.id }).from(schema.products).limit(1);
  if (existing.length === 0) {
    const now = new Date();
    await db.insert(schema.products).values(SEED.map((s, i) => ({
      name: s[0], category: s[1], subcategory: s[2], theme: s[3], price: s[4], priceLabel: s[5],
      line: s[6], material: s[7], modelSize: s[8], metallicFinish: s[9], colors: JSON.stringify(s[10]),
      status: s[11] as "available" | "available_soon" | "out_of_stock" | "in_store_only",
      description: `${s[0]}. Crafted in ${s[7].toLowerCase()} with the Maison's savoir-faire. Delivered in the orange box tied with Bolduc ribbon.`,
      story: `The story behind — ${s[0]} continues a Hermès line first imagined in the Maison's workshops, reinterpreted each season in new materials and colourways.`,
      tone: s[12], glyph: s[13], sortOrder: i, createdAt: now,
    })));
  }
  const st = await db.select().from(schema.settings).limit(1);
  if (st.length === 0) {
    await db.insert(schema.settings).values({ id: 1, storeName: "HERMÈS PARIS", phone: "800-441-4488", heroTitle: "Threading ideas", heroText: "The blanket provides a canvas that can take any direction, from reimagining motifs to asserting a bold artistic signature. Its playful composition allows style to express itself on a larger scale.", shipTo: "UNITED STATES", deliveryText: "Complimentary ground shipping 1-10 business days up to $2,000; express required over $2,000; white-glove delivery over $25,000. Delivered in the orange box tied with Bolduc ribbon.", returnsText: "Free returns within 30 days of delivery.", paymentMethods: "Visa, MasterCard, Amex, Discover, Diners, JCB, China Union Pay, PayPal, Apple Pay", bgColor: "#f7f2ec", serviceHours: "Monday to Saturday 10 AM - 9 PM" });
  }
  await ensureVerifiedProducts(ctx);
  await ensureExpansion(ctx);
  const st2 = await db.select().from(schema.settings).limit(1);
  if (st2.length === 0) {
    // settings were just inserted above on first run; nothing to do
  } else if (st2[0] && (!st2[0].deliveryText || !st2[0].heroText)) {
    const cur = st2[0];
    await db.update(schema.settings).set({ heroText: cur.heroText || "The blanket provides a canvas that can take any direction, from reimagining motifs to asserting a bold artistic signature. Its playful composition allows style to express itself on a larger scale.", deliveryText: cur.deliveryText || "Complimentary ground shipping 1-10 business days up to $2,000; express required over $2,000; white-glove delivery over $25,000. Delivered in the orange box tied with Bolduc ribbon.", returnsText: cur.returnsText || "Free returns within 30 days of delivery.", paymentMethods: cur.paymentMethods || "Visa, MasterCard, Amex, Discover, Diners, JCB, China Union Pay, PayPal, Apple Pay" }).where(eq(schema.settings.id, 1));
  }
}
async function loadSettings(ctx: Ctx): Promise<z.infer<typeof settingsOut>> {
  const db = ctx.db<typeof schema>();
  const rows = await db.select().from(schema.settings).limit(1);
  const r = rows[0];
  if (!r) return { storeName: "HERMÈS PARIS", phone: "800-441-4488", heroTitle: "Threading ideas", heroText: "", shipTo: "UNITED STATES", deliveryText: "", returnsText: "", paymentMethods: "", bgColor: "#f7f2ec", serviceHours: "Monday to Saturday 10 AM - 9 PM", logoMode: "both", logoUrl: "" };
  let logoUrl = "";
  if (r.logoBlobKey) { try { logoUrl = await ctx.blobs.getUrl(r.logoBlobKey); } catch { logoUrl = ""; } }
  return { storeName: r.storeName, phone: r.phone, heroTitle: r.heroTitle, heroText: r.heroText, shipTo: r.shipTo, deliveryText: r.deliveryText, returnsText: r.returnsText, paymentMethods: r.paymentMethods, bgColor: r.bgColor, serviceHours: r.serviceHours, logoMode: r.logoMode || "both", logoUrl };
}

const okRes = z.object({ ok: z.literal(true) });

export const Actions = {
  getStorefront: defineAction({
    description: "Returns all products and store settings, seeding the verified Hermès catalog on first run.",
    request: z.object({}),
    response: z.object({ products: z.array(productOut), settings: settingsOut }),
    handler: async (ctx): Promise<{ products: ProductOut[]; settings: z.infer<typeof settingsOut> }> => {
      await ensureSeed(ctx);
      const db = ctx.db<typeof schema>();
      const rows = await db.select().from(schema.products).orderBy(asc(schema.products.sortOrder));
      return { products: rows.map(toProduct), settings: await loadSettings(ctx) };
    },
  }),
  searchProducts: defineAction({
    description: "Searches products by name, category, line or material.",
    request: z.object({ query: z.string().max(120) }),
    response: z.object({ products: z.array(productOut) }),
    handler: async (ctx, args): Promise<{ products: ProductOut[] }> => {
      await ensureSeed(ctx);
      const db = ctx.db<typeof schema>();
      const rows = await db.select().from(schema.products).orderBy(asc(schema.products.sortOrder));
      const q = args.query.trim().toLowerCase();
      if (!q) return { products: rows.map(toProduct) };
      return { products: rows.map(toProduct).filter(p => [p.name, p.category, p.subcategory, p.line, p.material, p.theme].join(" ").toLowerCase().includes(q)) };
    },
  }),
  placeOrder: defineAction({
    description: "Places a checkout order from cart items and returns the order id.",
    request: z.object({ customerName: z.string().min(1).max(120), email: z.string().email(), address: z.string().max(400).default(""), paymentMethod: z.string().max(60).default(""), deliveryOption: z.string().max(80).default(""), items: z.array(z.object({ productId: z.number(), name: z.string(), price: z.number(), qty: z.number().int().min(1).max(20), color: z.string().default(""), size: z.string().default("") })) }),
    response: z.object({ ok: z.literal(true), orderId: z.number(), total: z.number() }),
    handler: async (ctx, args): Promise<{ ok: true; orderId: number; total: number }> => {
      const db = ctx.db<typeof schema>();
      const total = args.items.reduce((s, i) => s + i.price * i.qty, 0);
      const res = await db.insert(schema.orders).values({ customerName: args.customerName, email: args.email, address: args.address, paymentMethod: args.paymentMethod, deliveryOption: args.deliveryOption, viewedByAdmin: 0, items: JSON.stringify(args.items), total, status: "Pending", createdAt: new Date() }).returning({ id: schema.orders.id });
      const row = res[0]; if (!row) throw new Error("order failed");
      ctx.invalidateQueries();
      return { ok: true as const, orderId: row.id, total };
    },
  }),
  registerUser: defineAction({
    description: "Registers a customer account.",
    request: z.object({ name: z.string().min(1).max(120), email: z.string().email(), password: z.string().min(4).max(80) }),
    response: z.object({ ok: z.boolean(), message: z.string(), name: z.string().default("") }),
    handler: async (ctx, args): Promise<{ ok: boolean; message: string; name: string }> => {
      const db = ctx.db<typeof schema>();
      const existing = await db.select().from(schema.users).where(eq(schema.users.email, args.email)).limit(1);
      if (existing.length) return { ok: false, message: "An account with this email already exists. Please sign in.", name: "" };
      await db.insert(schema.users).values({ name: args.name, email: args.email, password: args.password, createdAt: new Date() });
      ctx.invalidateQueries();
      return { ok: true, message: "Account created. Welcome to the Maison.", name: args.name };
    },
  }),
  loginUser: defineAction({
    description: "Signs a customer in with email and password.",
    request: z.object({ email: z.string().email(), password: z.string().min(1).max(80) }),
    response: z.object({ ok: z.boolean(), message: z.string(), name: z.string().default("") }),
    handler: async (ctx, args): Promise<{ ok: boolean; message: string; name: string }> => {
      const db = ctx.db<typeof schema>();
      const rows = await db.select().from(schema.users).where(eq(schema.users.email, args.email)).limit(1);
      const u = rows[0];
      if (!u || u.password !== args.password) return { ok: false, message: "Email or password not recognised.", name: "" };
      if (u.disabled) return { ok: false, message: "This account has been disabled. Please contact customer service.", name: "" };
      return { ok: true, message: "Signed in.", name: u.name };
    },
  }),
  myOrders: defineAction({
    description: "Lists orders placed with the given email.",
    request: z.object({ email: z.string().email() }),
    response: z.object({ orders: z.array(z.object({ id: z.number(), total: z.number(), status: z.string(), items: z.string(), address: z.string(), paymentMethod: z.string(), deliveryOption: z.string(), createdAt: z.string() })) }),
    handler: async (ctx, args) => {
      const db = ctx.db<typeof schema>();
      const rows = await db.select().from(schema.orders).where(eq(schema.orders.email, args.email)).orderBy(desc(schema.orders.id));
      return { orders: rows.map(r => ({ id: r.id, total: r.total, status: r.status, items: r.items, address: r.address, paymentMethod: r.paymentMethod, deliveryOption: r.deliveryOption, createdAt: r.createdAt.toISOString() })) };
    },
  }),
  subscribeNewsletter: defineAction({
    description: "Records a newsletter subscription email.",
    request: z.object({ email: z.string().email() }),
    response: okRes,
    handler: async (ctx, args): Promise<{ ok: true }> => {
      const db = ctx.db<typeof schema>();
      const existing = await db.select().from(schema.newsletter).where(eq(schema.newsletter.email, args.email)).limit(1);
      if (!existing.length) await db.insert(schema.newsletter).values({ email: args.email, createdAt: new Date() });
      ctx.invalidateQueries();
      return { ok: true as const };
    },
  }),
  requestNotify: defineAction({
    description: "Records a back-in-stock Notify Me request for a product.",
    request: z.object({ productId: z.number(), productName: z.string().max(200), email: z.string().email() }),
    response: okRes,
    handler: async (ctx, args): Promise<{ ok: true }> => {
      const db = ctx.db<typeof schema>();
      await db.insert(schema.notifyRequests).values({ productId: args.productId, productName: args.productName, email: args.email, createdAt: new Date() });
      ctx.invalidateQueries();
      return { ok: true as const };
    },
  }),

  recordVisit: defineAction({
    description: "Records one store visit per visitor per day.",
    request: z.object({ visitorKey: z.string().min(4).max(120), day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }),
    response: okRes,
    handler: async (ctx, args): Promise<{ ok: true }> => {
      const db = ctx.db<typeof schema>();
      const ex = await db.select().from(schema.visits).where(eq(schema.visits.visitorKey, args.visitorKey));
      if (!ex.some(v => v.day === args.day)) { try { await db.insert(schema.visits).values({ visitorKey: args.visitorKey, day: args.day, createdAt: new Date() }); } catch { /* duplicate */ } }
      return { ok: true as const };
    },
  }),
  recordProductView: defineAction({
    description: "Increments the view count for a product.",
    request: z.object({ productId: z.number() }),
    response: okRes,
    handler: async (ctx, args): Promise<{ ok: true }> => {
      const db = ctx.db<typeof schema>();
      const rows = await db.select().from(schema.productViews).where(eq(schema.productViews.productId, args.productId)).limit(1);
      if (rows.length) await db.update(schema.productViews).set({ views: (rows[0]?.views ?? 0) + 1 }).where(eq(schema.productViews.productId, args.productId));
      else await db.insert(schema.productViews).values({ productId: args.productId, views: 1 });
      return { ok: true as const };
    },
  }),
  trackOrder: defineAction({
    description: "Tracks one order by order number and email.",
    request: z.object({ orderId: z.number(), email: z.string().email() }),
    response: z.object({ found: z.boolean(), order: z.object({ id: z.number(), total: z.number(), status: z.string(), items: z.string(), address: z.string(), paymentMethod: z.string(), deliveryOption: z.string(), createdAt: z.string() }).nullable() }),
    handler: async (ctx, args) => {
      const db = ctx.db<typeof schema>();
      const rows = await db.select().from(schema.orders).where(eq(schema.orders.id, args.orderId)).limit(1);
      const r = rows[0];
      if (!r || r.email.toLowerCase() !== args.email.toLowerCase()) return { found: false, order: null };
      return { found: true, order: { id: r.id, total: r.total, status: r.status, items: r.items, address: r.address, paymentMethod: r.paymentMethod, deliveryOption: r.deliveryOption, createdAt: r.createdAt.toISOString() } };
    },
  }),
  myExtras: defineAction({
    description: "Returns a customer's wishlist, notify requests and return requests.",
    request: z.object({ email: z.string().email() }),
    response: z.object({ wishlist: z.array(z.object({ id: z.number(), productId: z.number(), productName: z.string() })), notify: z.array(z.object({ id: z.number(), productName: z.string() })), returns: z.array(z.object({ id: z.number(), orderId: z.number(), status: z.string(), reason: z.string() })) }),
    handler: async (ctx, args) => {
      const db = ctx.db<typeof schema>();
      const [w, n, r] = await Promise.all([db.select().from(schema.wishlist).where(eq(schema.wishlist.email, args.email)).orderBy(desc(schema.wishlist.id)), db.select().from(schema.notifyRequests).where(eq(schema.notifyRequests.email, args.email)).orderBy(desc(schema.notifyRequests.id)), db.select().from(schema.returnRequests).where(eq(schema.returnRequests.email, args.email)).orderBy(desc(schema.returnRequests.id))]);
      return { wishlist: w.map(x => ({ id: x.id, productId: x.productId, productName: x.productName })), notify: n.map(x => ({ id: x.id, productName: x.productName })), returns: r.map(x => ({ id: x.id, orderId: x.orderId, status: x.status, reason: x.reason })) };
    },
  }),
  toggleWishlist: defineAction({
    description: "Adds or removes a product from a customer's wishlist.",
    request: z.object({ email: z.string().email(), productId: z.number(), productName: z.string().max(200) }),
    response: z.object({ ok: z.literal(true), added: z.boolean() }),
    handler: async (ctx, args): Promise<{ ok: true; added: boolean }> => {
      const db = ctx.db<typeof schema>();
      const rows = await db.select().from(schema.wishlist).where(eq(schema.wishlist.email, args.email));
      const ex = rows.find(x => x.productId === args.productId);
      if (ex) { await db.delete(schema.wishlist).where(eq(schema.wishlist.id, ex.id)); ctx.invalidateQueries(); return { ok: true as const, added: false }; }
      await db.insert(schema.wishlist).values({ email: args.email, productId: args.productId, productName: args.productName, createdAt: new Date() });
      ctx.invalidateQueries(); return { ok: true as const, added: true };
    },
  }),
  requestReturn: defineAction({
    description: "Requests a return for an order within 30 days of purchase.",
    request: z.object({ orderId: z.number(), email: z.string().email(), reason: z.string().max(500).default("") }),
    response: z.object({ ok: z.boolean(), message: z.string() }),
    handler: async (ctx, args): Promise<{ ok: boolean; message: string }> => {
      const db = ctx.db<typeof schema>();
      const rows = await db.select().from(schema.orders).where(eq(schema.orders.id, args.orderId)).limit(1);
      const o = rows[0];
      if (!o || o.email.toLowerCase() !== args.email.toLowerCase()) return { ok: false, message: "Order not found for this email." };
      if (Date.now() - o.createdAt.getTime() > 30 * 24 * 3600 * 1000) return { ok: false, message: "The 30-day return window for this order has passed." };
      await db.insert(schema.returnRequests).values({ orderId: args.orderId, email: args.email, reason: args.reason, status: "Requested", createdAt: new Date() });
      ctx.invalidateQueries(); return { ok: true, message: "Return requested. Our customer service will contact you." };
    },
  }),
  adminData: defineAction({
    description: "Returns full admin data: visits, sales, orders, customers, product views, newsletter, notify and returns.",
    request: z.object({ password: z.string().max(80) }),
    response: z.object({
      ok: z.boolean(),
      stats: z.object({ products: z.number(), orders: z.number(), users: z.number(), revenue: z.number(), newsletter: z.number(), notify: z.number(), visitsTotal: z.number(), visitsToday: z.number(), pendingOrders: z.number(), newAccountsToday: z.number(), newOrders: z.number(), returns: z.number() }),
      visitsByDay: z.array(z.object({ day: z.string(), count: z.number() })),
      salesByDay: z.array(z.object({ day: z.string(), total: z.number(), orders: z.number() })),
      salesByCategory: z.array(z.object({ category: z.string(), total: z.number(), qty: z.number() })),
      salesByProduct: z.array(z.object({ name: z.string(), total: z.number(), qty: z.number() })),
      topSelling: z.array(z.object({ name: z.string(), total: z.number(), qty: z.number() })),
      mostViewed: z.array(z.object({ productId: z.number(), productName: z.string(), views: z.number() })),
      productViews: z.array(z.object({ productId: z.number(), views: z.number() })),
      orders: z.array(z.object({ id: z.number(), customerName: z.string(), email: z.string(), total: z.number(), status: z.string(), items: z.string(), address: z.string(), paymentMethod: z.string(), deliveryOption: z.string(), viewedByAdmin: z.number(), createdAt: z.string() })),
      users: z.array(z.object({ id: z.number(), name: z.string(), email: z.string(), disabled: z.number(), viewedByAdmin: z.number(), totalOrders: z.number(), totalSpent: z.number(), createdAt: z.string() })),
      newsletter: z.array(z.object({ id: z.number(), email: z.string() })),
      notify: z.array(z.object({ id: z.number(), productName: z.string(), email: z.string() })),
      returns: z.array(z.object({ id: z.number(), orderId: z.number(), email: z.string(), reason: z.string(), status: z.string() })),
    }),
    handler: async (ctx, args) => {
      const empty = { ok: false, stats: { products: 0, orders: 0, users: 0, revenue: 0, newsletter: 0, notify: 0, visitsTotal: 0, visitsToday: 0, pendingOrders: 0, newAccountsToday: 0, newOrders: 0, returns: 0 }, visitsByDay: [], salesByDay: [], salesByCategory: [], salesByProduct: [], topSelling: [], mostViewed: [], productViews: [], orders: [], users: [], newsletter: [], notify: [], returns: [] };
      if (args.password !== ADMIN_PASSWORD) return empty;
      await ensureSeed(ctx);
      const db = ctx.db<typeof schema>();
      const [prods, ords, usrs, news, noti, vis, pvs, rets] = await Promise.all([
        db.select().from(schema.products), db.select().from(schema.orders).orderBy(desc(schema.orders.id)),
        db.select().from(schema.users).orderBy(desc(schema.users.id)), db.select().from(schema.newsletter).orderBy(desc(schema.newsletter.id)),
        db.select().from(schema.notifyRequests).orderBy(desc(schema.notifyRequests.id)), db.select().from(schema.visits),
        db.select().from(schema.productViews), db.select().from(schema.returnRequests).orderBy(desc(schema.returnRequests.id)),
      ]);
      const today = new Date().toISOString().slice(0, 10);
      const paid = ords.filter(o => o.status !== "Cancelled");
      const revenue = paid.reduce((sum, o) => sum + o.total, 0);
      const vMap = new Map<string, number>(); vis.forEach(v => vMap.set(v.day, (vMap.get(v.day) ?? 0) + 1));
      const visitsByDay = [...vMap.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([day, count]) => ({ day, count }));
      const sMap = new Map<string, { total: number; orders: number }>(); paid.forEach(o => { const d = o.createdAt.toISOString().slice(0, 10); const cur = sMap.get(d) ?? { total: 0, orders: 0 }; cur.total += o.total; cur.orders += 1; sMap.set(d, cur); });
      const salesByDay = [...sMap.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([day, v]) => ({ day, total: v.total, orders: v.orders }));
      type Item = { productId?: number; name: string; price: number; qty: number };
      const catMap = new Map<string, { total: number; qty: number }>(); const prodMap = new Map<string, { total: number; qty: number }>();
      const prodById = new Map(prods.map(pr => [pr.id, pr]));
      paid.forEach(o => { let items: Item[] = []; try { items = JSON.parse(o.items) as Item[]; } catch { items = []; } items.forEach(it => { const amt = it.price * it.qty; const cat = (it.productId ? prodById.get(it.productId)?.category : undefined) ?? "Other"; const c = catMap.get(cat) ?? { total: 0, qty: 0 }; c.total += amt; c.qty += it.qty; catMap.set(cat, c); const pm = prodMap.get(it.name) ?? { total: 0, qty: 0 }; pm.total += amt; pm.qty += it.qty; prodMap.set(it.name, pm); }); });
      const salesByProduct = [...prodMap.entries()].map(([name, v]) => ({ name, total: v.total, qty: v.qty })).sort((a, b) => b.total - a.total);
      const nameById = new Map(prods.map(pr => [pr.id, pr.name]));
      const mostViewed = [...pvs].sort((a, b) => b.views - a.views).slice(0, 10).map(v => ({ productId: v.productId, productName: nameById.get(v.productId) ?? `#${v.productId}`, views: v.views }));
      return {
        ok: true,
        stats: { products: prods.length, orders: ords.length, users: usrs.length, revenue, newsletter: news.length, notify: noti.length, visitsTotal: vis.length, visitsToday: visitsByDay.find(v => v.day === today)?.count ?? 0, pendingOrders: ords.filter(o => o.status === "Pending" || o.status === "Placed").length, newAccountsToday: usrs.filter(u => u.createdAt.toISOString().slice(0, 10) === today).length, newOrders: ords.filter(o => !o.viewedByAdmin).length, returns: rets.length },
        visitsByDay, salesByDay,
        salesByCategory: [...catMap.entries()].map(([category, v]) => ({ category, total: v.total, qty: v.qty })).sort((a, b) => b.total - a.total),
        salesByProduct, topSelling: salesByProduct.slice(0, 5), mostViewed,
        productViews: pvs.map(v => ({ productId: v.productId, views: v.views })),
        orders: ords.map(o => ({ id: o.id, customerName: o.customerName, email: o.email, total: o.total, status: o.status, items: o.items, address: o.address, paymentMethod: o.paymentMethod, deliveryOption: o.deliveryOption, viewedByAdmin: o.viewedByAdmin, createdAt: o.createdAt.toISOString() })),
        users: usrs.map(u => { const uo = ords.filter(o => o.email.toLowerCase() === u.email.toLowerCase() && o.status !== "Cancelled"); return { id: u.id, name: u.name, email: u.email, disabled: u.disabled, viewedByAdmin: u.viewedByAdmin, totalOrders: uo.length, totalSpent: uo.reduce((sum, o) => sum + o.total, 0), createdAt: u.createdAt.toISOString() }; }),
        newsletter: news.map(n => ({ id: n.id, email: n.email })),
        notify: noti.map(n => ({ id: n.id, productName: n.productName, email: n.email })),
        returns: rets.map(r => ({ id: r.id, orderId: r.orderId, email: r.email, reason: r.reason, status: r.status })),
      };
    },
  }),
  adminMarkViewed: defineAction({
    description: "Marks an order or customer as viewed by admin, clearing its NEW badge.",
    request: z.object({ password: z.string().max(80), kind: z.enum(["order", "user"]), id: z.number() }),
    response: z.object({ ok: z.boolean() }),
    handler: async (ctx, args): Promise<{ ok: boolean }> => {
      if (args.password !== ADMIN_PASSWORD) return { ok: false };
      const db = ctx.db<typeof schema>();
      if (args.kind === "order") await db.update(schema.orders).set({ viewedByAdmin: 1 }).where(eq(schema.orders.id, args.id));
      else await db.update(schema.users).set({ viewedByAdmin: 1 }).where(eq(schema.users.id, args.id));
      ctx.invalidateQueries(); return { ok: true };
    },
  }),
  adminSetUserDisabled: defineAction({
    description: "Disables or re-enables a customer account from the admin panel.",
    request: z.object({ password: z.string().max(80), id: z.number(), disabled: z.boolean() }),
    response: z.object({ ok: z.boolean() }),
    handler: async (ctx, args): Promise<{ ok: boolean }> => {
      if (args.password !== ADMIN_PASSWORD) return { ok: false };
      const db = ctx.db<typeof schema>();
      await db.update(schema.users).set({ disabled: args.disabled ? 1 : 0 }).where(eq(schema.users.id, args.id));
      ctx.invalidateQueries(); return { ok: true };
    },
  }),
  adminDeleteUser: defineAction({
    description: "Deletes a customer account from the admin panel.",
    request: z.object({ password: z.string().max(80), id: z.number() }),
    response: z.object({ ok: z.boolean() }),
    handler: async (ctx, args): Promise<{ ok: boolean }> => {
      if (args.password !== ADMIN_PASSWORD) return { ok: false };
      const db = ctx.db<typeof schema>();
      await db.delete(schema.users).where(eq(schema.users.id, args.id));
      ctx.invalidateQueries(); return { ok: true };
    },
  }),
  adminSaveProduct: defineAction({
    description: "Creates or updates a product from the admin panel.",
    request: z.object({
      password: z.string().max(80), id: z.number().default(0), name: z.string().min(1).max(200),
      category: z.string().max(60), subcategory: z.string().max(120).default(""), theme: z.string().max(60).default(""),
      price: z.number().int().min(0).max(10000000), priceLabel: z.string().max(60).default(""),
      status: z.enum(["available", "available_soon", "out_of_stock", "in_store_only"]).default("available"),
      line: z.string().max(80).default(""), material: z.string().max(80).default(""), modelSize: z.string().max(40).default(""),
      metallicFinish: z.string().max(40).default(""), colorsJson: z.string().max(2000).default("[]"),
      description: z.string().max(2000).default(""), story: z.string().max(2000).default(""),
      tone: z.string().max(20).default("#e9ede8"), glyph: z.string().max(4).default("◆"),
      refCode: z.string().max(40).optional(), galleryViews: z.string().max(1000).optional(), applePay: z.boolean().optional(),
      sizeOptions: z.string().max(1500).optional(), accordions: z.string().max(500).optional(), shippingDelay: z.string().max(120).optional(), detailLines: z.string().max(1500).optional(),
    }),
    response: z.object({ ok: z.boolean(), id: z.number() }),
    handler: async (ctx, args): Promise<{ ok: boolean; id: number }> => {
      if (args.password !== ADMIN_PASSWORD) return { ok: false, id: 0 };
      const db = ctx.db<typeof schema>();
      const vals = { name: args.name, category: args.category, subcategory: args.subcategory, theme: args.theme, price: args.price, priceLabel: args.priceLabel, status: args.status, line: args.line, material: args.material, modelSize: args.modelSize, metallicFinish: args.metallicFinish, colors: args.colorsJson, description: args.description, story: args.story, tone: args.tone, glyph: args.glyph,
        ...(args.refCode !== undefined ? { refCode: args.refCode } : {}), ...(args.galleryViews !== undefined ? { galleryViews: args.galleryViews } : {}),
        ...(args.applePay !== undefined ? { applePay: args.applePay ? 1 : 0 } : {}), ...(args.sizeOptions !== undefined ? { sizeOptions: args.sizeOptions } : {}),
        ...(args.accordions !== undefined ? { accordions: args.accordions } : {}), ...(args.shippingDelay !== undefined ? { shippingDelay: args.shippingDelay } : {}),
        ...(args.detailLines !== undefined ? { detailLines: args.detailLines } : {}) };
      if (args.id > 0) { await db.update(schema.products).set(vals).where(eq(schema.products.id, args.id)); ctx.invalidateQueries(); return { ok: true, id: args.id }; }
      const res = await db.insert(schema.products).values({ ...vals, sortOrder: 999, createdAt: new Date() }).returning({ id: schema.products.id });
      ctx.invalidateQueries();
      return { ok: true, id: res[0]?.id ?? 0 };
    },
  }),
  adminDeleteProduct: defineAction({
    description: "Deletes a product from the admin panel.",
    request: z.object({ password: z.string().max(80), id: z.number() }),
    response: z.object({ ok: z.boolean() }),
    handler: async (ctx, args): Promise<{ ok: boolean }> => {
      if (args.password !== ADMIN_PASSWORD) return { ok: false };
      const db = ctx.db<typeof schema>();
      await db.delete(schema.products).where(eq(schema.products.id, args.id));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),
  adminUpdateOrder: defineAction({
    description: "Updates an order status from the admin panel.",
    request: z.object({ password: z.string().max(80), id: z.number(), status: z.string().max(40) }),
    response: z.object({ ok: z.boolean() }),
    handler: async (ctx, args): Promise<{ ok: boolean }> => {
      if (args.password !== ADMIN_PASSWORD) return { ok: false };
      const db = ctx.db<typeof schema>();
      await db.update(schema.orders).set({ status: args.status }).where(eq(schema.orders.id, args.id));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),
  adminSaveSettings: defineAction({
    description: "Saves store settings, hero content and theme from the admin panel.",
    request: z.object({ password: z.string().max(80), settings: settingsOut }),
    response: z.object({ ok: z.boolean() }),
    handler: async (ctx, args): Promise<{ ok: boolean }> => {
      if (args.password !== ADMIN_PASSWORD) return { ok: false };
      await ensureSeed(ctx);
      const db = ctx.db<typeof schema>();
      await db.update(schema.settings).set({ storeName: args.settings.storeName, phone: args.settings.phone, heroTitle: args.settings.heroTitle, heroText: args.settings.heroText, shipTo: args.settings.shipTo, deliveryText: args.settings.deliveryText, returnsText: args.settings.returnsText, paymentMethods: args.settings.paymentMethods, bgColor: args.settings.bgColor, serviceHours: args.settings.serviceHours, logoMode: ["both", "logo", "name"].includes(args.settings.logoMode) ? args.settings.logoMode : "both" }).where(eq(schema.settings.id, 1));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),
  adminUploadLogo: defineAction({
    description: "Uploads or replaces the store logo image, or removes it, from the admin panel.",
    request: z.object({ password: z.string().max(80), dataBase64: z.string().max(8_000_000).default(""), mimeType: z.string().max(60).default("image/png"), clear: z.boolean().default(false) }),
    response: z.object({ ok: z.boolean(), logoUrl: z.string() }),
    handler: async (ctx, args): Promise<{ ok: boolean; logoUrl: string }> => {
      if (args.password !== ADMIN_PASSWORD) return { ok: false, logoUrl: "" };
      await ensureSeed(ctx);
      const db = ctx.db<typeof schema>();
      if (args.clear || !args.dataBase64) {
        await db.update(schema.settings).set({ logoBlobKey: "" }).where(eq(schema.settings.id, 1));
        ctx.invalidateQueries();
        return { ok: true, logoUrl: "" };
      }
      const mime = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(args.mimeType) ? args.mimeType : "image/png";
      const bytes = Buffer.from(args.dataBase64, "base64");
      if (bytes.length === 0 || bytes.length > 5_000_000) return { ok: false, logoUrl: "" };
      const key = "logo/store-logo";
      await ctx.blobs.put(key, bytes, { contentType: mime });
      await db.update(schema.settings).set({ logoBlobKey: key }).where(eq(schema.settings.id, 1));
      ctx.invalidateQueries();
      return { ok: true, logoUrl: await ctx.blobs.getUrl(key) };
    },
  }),
} satisfies ActionsModule;
