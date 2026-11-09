// Product photography for the storefront. Every photo is an original
// studio-style image generated for this store (contact sheets in
// assets/sheets/, cropped per product into assets/products/) — never
// hotlinked. Exact products map by name; anything else (catalog-expansion
// rows, admin-added products) falls back to the closest photo of the same
// product type and colour family, so no tile ever shows a glyph/emoji.
//
// EXCEPTION (user instruction 2026-11-09, overrides the no-hotlink rule):
// the four men's sandals use the ORIGINAL Hermes photos hotlinked from
// assets.hermes.com, because the generated pool showed the wrong item for
// them (all four showed the same brown loafer; Izmir's gallery showed a
// sneaker). Each hotlinked URL was verified to load (HTTP 200) and to show
// the correct product before it was wired in.
import lePetitSac from "./assets/products/le-petit-sac.webp";
import doubleLonge from "./assets/products/double-longe.webp";
import tablierSellier from "./assets/products/tablier-sellier.webp";
import bolidePlume45 from "./assets/products/bolide-plume-45.webp";
import zipengoSoKelly from "./assets/products/zipengo-so-kelly.webp";
import boxBag from "./assets/products/box-bag.webp";
import kellyMessenger from "./assets/products/kelly-messenger.webp";
import bolide1923Mini from "./assets/products/bolide-1923-mini.webp";
import videpoches from "./assets/products/videpoches.webp";
import neoDoubleSens35 from "./assets/products/neo-double-sens-35.webp";
import kellyPocket18Belt from "./assets/products/kelly-pocket-18-belt.webp";
import collierDeChien50Belt from "./assets/products/collier-de-chien-50-belt.webp";
import elanPocket24Belt from "./assets/products/elan-pocket-24-belt.webp";
import serifBelt32 from "./assets/products/serif-belt-32.webp";
import hBelt38 from "./assets/products/h-belt-38.webp";
import etriviereBelt38 from "./assets/products/etriviere-belt-38.webp";
import etriersBelt38 from "./assets/products/etriers-belt-38.webp";
import bouncingSneaker from "./assets/products/bouncing-sneaker.webp";
import jetSneaker from "./assets/products/jet-sneaker.webp";
import nineAnkleBoot from "./assets/products/nine-ankle-boot.webp";
import noeLoafer from "./assets/products/noe-loafer.webp";
import bouncingSneakerBlanc from "./assets/products/bouncing-sneaker-blanc.webp";
import neonSneaker from "./assets/products/neon-sneaker.webp";
import nextSneaker from "./assets/products/next-sneaker.webp";
import nobuSneaker from "./assets/products/nobu-sneaker.webp";
import chaineDancreNecklace from "./assets/products/chaine-dancre-necklace.webp";
import clicClacHBracelet from "./assets/products/clic-clac-h-bracelet.webp";
import chaineDancreEarrings from "./assets/products/chaine-dancre-earrings.webp";
import miniThalassaBracelet from "./assets/products/mini-thalassa-bracelet.webp";
import chaineDancreContourBracelet from "./assets/products/chaine-dancre-contour-bracelet.webp";
import scarf90Colliers from "./assets/products/scarf-90-colliers.webp";
import twillyTurf from "./assets/products/twilly-turf.webp";
import casaqueJumpingScarf from "./assets/products/casaque-jumping-scarf.webp";
import palonniersScarf45 from "./assets/products/palonniers-scarf-45.webp";
import laNatureScarf90 from "./assets/products/la-nature-scarf-90.webp";
import rougeLipCareSet from "./assets/products/rouge-lip-care-set.webp";
import ombresEyeShadow from "./assets/products/ombres-eye-shadow.webp";
import nailPolishOrRose from "./assets/products/nail-polish-or-rose.webp";
import brideABracCase from "./assets/products/bride-a-brac-case.webp";
import matteLipstickRoseBoise from "./assets/products/matte-lipstick-rose-boise.webp";
import muscPallida from "./assets/products/musc-pallida.webp";
import muscPallidaRefill from "./assets/products/musc-pallida-refill.webp";
import hermessenceEdt from "./assets/products/hermessence-edt.webp";
import hermessenceEssence from "./assets/products/hermessence-essence.webp";
import capeCodLarge from "./assets/products/cape-cod-large.webp";
import capeCodSmall from "./assets/products/cape-cod-small.webp";
import h08Watch from "./assets/products/h08-watch.webp";
import cutWatch from "./assets/products/cut-watch.webp";
import kellyWatchMiniGrey from "./assets/products/kelly-watch-mini-grey.webp";
import kellyWatchMiniPink from "./assets/products/kelly-watch-mini-pink.webp";
import arceauPetiteLune from "./assets/products/arceau-petite-lune.webp";
import avalonBlanket from "./assets/products/avalon-blanket.webp";
import mosaiquePlates from "./assets/products/mosaique-plates.webp";
import saddleBridle from "./assets/products/saddle-bridle.webp";
import riderJacket from "./assets/products/rider-jacket.webp";
import giftCard from "./assets/products/gift-card.webp";
import silkGiftSet from "./assets/products/silk-gift-set.webp";
// Regenerated 8 Nov 2026 at clearly higher quality (user: "picture quality
// boht kharab"): photorealistic, sharp, high resolution. Ready-to-wear is
// MODEL-WORN (a real person wearing the garment, full-length, plain beige
// seamless background — as in the user's hermes.com video); bags/shoes/
// scarves stay clean studio still-life. Recreated in the same style — never
// downloaded or hotlinked from hermes.com.
import embroideredPocketDress from "./assets/products/media-generation-embroidered-pocket-dress-0-f11f921d-61a0-440b-8e50-ef1ddf446428.webp";
import hJoggingPants from "./assets/products/media-generation-h-jogging-pants-0-63cd46ef-e600-4561-b0d3-ef7c9590d067.webp";
import dressMidLengthModel from "./assets/products/media-generation-dress-mid-length-model-0-a215b884-01ad-456e-b5a2-f5a37f2c8bb7.webp";
import longSleevelessDressModel from "./assets/products/media-generation-long-sleeveless-dress-model-0-c03cbdd4-5a3f-4f6e-ad1b-d2195cbf00e9.webp";
import picotinLock18V2 from "./assets/products/media-generation-picotin-lock-18-v2-0-962268b7-c30a-4ce1-9219-18f1a87790d5.webp";
import kellyShoulderV2 from "./assets/products/media-generation-kelly-shoulder-v2-0-d0da1fa3-7f0f-419d-a7a7-64ceda592984.webp";
import bouncingSneakerBlancV2 from "./assets/products/media-generation-bouncing-sneaker-blanc-v2-0-9b68bad6-780d-4f64-87f1-71a10c0a4ec5.webp";
import scarf90V2 from "./assets/products/media-generation-scarf-90-v2-0-e276bf81-c4cf-4816-943a-c8b9fc448073.webp";
import coatModel from "./assets/products/media-generation-coat-model-0-164b7c6b-118b-423e-a88b-4e9b30e5dcc6.webp";
import knitSweaterModel from "./assets/products/media-generation-knit-sweater-model-0-5b7a8563-80ef-4613-a424-2b68dcaeef78.webp";
import bucketHat from "./assets/products/media-generation-bucket-hat-0-7948e42f-bff2-45fe-a622-9d13b7feaeaa.webp";
import lipCareMask from "./assets/products/media-generation-lip-care-mask-0-199ce1ff-a7c8-4d6b-acdd-4f68b986eb57.webp";
import dressageBreeches from "./assets/products/media-generation-dressage-breeches-0-b89930e2-4652-4260-aefa-73bf37b7cf5f.webp";
import kelly18Belt from "./assets/products/media-generation-kelly-18-belt-0-ed45476f-95c0-47d7-a3e5-3f8884b59a76.webp";
import fallbackStillLife from "./assets/products/fallback-still-life.webp";
import fallbackHandbag from "./assets/products/fallback-handbag.webp";

export const PRODUCT_IMAGES: Record<string, string> = {
  "Picotin Lock 18 pocket bag": picotinLock18V2,
  "Le Petit Sac bag": lePetitSac,
  "Double Longe bag": doubleLonge,
  "Tablier Sellier bag": tablierSellier,
  "Kelly Shoulder Etoupe bag": kellyShoulderV2,
  "Bolide Plume 45 bag": bolidePlume45,
  "Zipengo So Kelly pouch": zipengoSoKelly,
  "Box bag": boxBag,
  "Kelly Messenger bag": kellyMessenger,
  "Bolide 1923 mini bag": bolide1923Mini,
  "Videpoches bag": videpoches,
  "Neo Double Sens 35 bag": neoDoubleSens35,
  "Kelly Pocket 18 belt": kellyPocket18Belt,
  "Collier de Chien 50 belt": collierDeChien50Belt,
  "Elan Pocket 24 reversible belt": elanPocket24Belt,
  "Serif belt buckle & Reversible leather strap 32 mm": serifBelt32,
  "H belt buckle & Reversible leather strap 38 mm": hBelt38,
  "Etriviere belt buckle & Reversible leather strap 38 mm": etriviereBelt38,
  "Etriers belt buckle & Reversible leather strap 38 mm": etriersBelt38,
  "Bouncing sneaker": bouncingSneaker,
  "Jet sneaker": jetSneaker,
  "Nine ankle boot": nineAnkleBoot,
  "Noe loafer": noeLoafer,
  // Original Hermes photo, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Izmir sandal, ref H041141ZH01, $950 — verified
  // to load and to show the black calfskin Izmir sandal (H cut-out strap).
  "Izmir sandal":
    "https://assets.hermes.com/is/image/hermesproduct/041141ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Chypre sandal, ref H222000ZH01, $1,125 —
  // verified to load and to show the black calfskin techno-sandal.
  "Chypre sandal":
    "https://assets.hermes.com/is/image/hermesproduct/222000ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Naxos sandal, ref H262912ZHC9, $1,425 —
  // verified to load and to show the beige suede sandal (Albion buckles).
  "Naxos sandal":
    "https://assets.hermes.com/is/image/hermesproduct/262912ZHC9_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Jackson sandal, ref H242948ZHC9, $1,500 —
  // verified to load and to show the beige/black sandal (Kelly buckle).
  "Jackson sandal":
    "https://assets.hermes.com/is/image/hermesproduct/242948ZHC9_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Bouncing sneaker, Blanc": bouncingSneakerBlancV2,
  "Neon sneaker": neonSneaker,
  "Next sneaker": nextSneaker,
  "Nobu sneaker": nobuSneaker,
  "Chaine d'ancre necklace, small model": chaineDancreNecklace,
  "Clic Clac H bracelet": clicClacHBracelet,
  "Chaine d'ancre earrings": chaineDancreEarrings,
  "Mini Thalassa bracelet": miniThalassaBracelet,
  "Chaine d'ancre Contour bracelet, white gold": chaineDancreContourBracelet,
  "Colliers et Laisses pour Chiens scarf 90": scarf90V2,
  "Turf Les Courses Twilly": twillyTurf,
  "Casaque Jumping scarf": casaqueJumpingScarf,
  "Palonniers scarf 45": palonniersScarf45,
  "La Nature en Voyage scarf 90": laNatureScarf90,
  "Rouge Hermès gift set, Lip care": rougeLipCareSet,
  "Ombres d'Hermès, Eye shadow quartet, Ombres Sables": ombresEyeShadow,
  "Les Mains Hermès, Nail polish, Or Rose": nailPolishOrRose,
  "Bride-a-Brac Sellier case, large model": brideABracCase,
  "Matte lipstick, Rose Boisé": matteLipstickRoseBoise,
  "Musc Pallida, Eau de parfum, 3.4 fl.oz": muscPallida,
  "Musc Pallida refill, Eau de parfum": muscPallidaRefill,
  "Hermessence, Eau de toilette": hermessenceEdt,
  "Hermessence Essence, Eau de parfum": hermessenceEssence,
  "Cape Cod watch, Large model, 37 mm": capeCodLarge,
  "Cape Cod watch, Small model, 31 mm": capeCodSmall,
  "Hermès H08 watch, 42 mm": h08Watch,
  "Hermès Cut watch, Large model, 36 mm": cutWatch,
  "Kelly watch, Mini model, 16 mm, Grey": kellyWatchMiniGrey,
  "Kelly watch, Mini model, 16 mm, Pink gold": kellyWatchMiniPink,
  "Arceau Petite Lune watch, Large model, 38 mm": arceauPetiteLune,
  "Avalon throw blanket": avalonBlanket,
  "Mosaique au 24 dinner plate, set of 2": mosaiquePlates,
  "Saddle and bridle set": saddleBridle,
  "Rider jacket": riderJacket,
  "Gift card": giftCard,
  "Silk gift set for her": silkGiftSet,
  "Mid-length buttoned dress": dressMidLengthModel,
  "Long sleeveless dress": longSleevelessDressModel,
  "Embroidered pocket dress": embroideredPocketDress,
  "\"H\" jogging pants": hJoggingPants,
  "Kelly 18 belt": kelly18Belt,
  "Rouge Hermès Nourishing lip care mask": lipCareMask,
  "Milo L'Aventure bucket hat": bucketHat,
  "Swing dressage breeches": dressageBreeches,
};

const BAG_POOL = [picotinLock18V2, kellyShoulderV2, tablierSellier, boxBag, doubleLonge, neoDoubleSens35, fallbackHandbag];
const DRESS_POOL = [dressMidLengthModel, longSleevelessDressModel, embroideredPocketDress];
const SHOE_POOL = [bouncingSneaker, bouncingSneakerBlanc, jetSneaker, neonSneaker, nextSneaker, nobuSneaker];
const WATCH_POOL = [capeCodLarge, capeCodSmall, h08Watch, cutWatch, arceauPetiteLune];
const BELT_POOL = [kellyPocket18Belt, hBelt38, serifBelt32, etriviereBelt38];
const SCARF_POOL = [scarf90Colliers, laNatureScarf90, casaqueJumpingScarf, palonniersScarf45];
const PERFUME_POOL = [muscPallida, hermessenceEdt, hermessenceEssence, muscPallidaRefill];
const JEWEL_POOL = [chaineDancreNecklace, clicClacHBracelet, miniThalassaBracelet, chaineDancreContourBracelet];

function pick(pool: string[], seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return pool[h % pool.length] ?? pool[0] ?? fallbackStillLife;
}

export function productImageFor(p: { id?: number; name: string; category?: string; subcategory?: string; colors?: { name: string }[] }): string {
  const exact = PRODUCT_IMAGES[p.name];
  if (exact) return exact;
  // Repeated name+price rows are separate colourway tiles (as on hermes.com);
  // the product id varies the photo within the type pool so no two tiles in a
  // grid are identical.
  const seed = `${p.name}#${p.id ?? ""}`;
  const n = `${p.name} ${p.subcategory ?? ""}`.toLowerCase();
  const col = (p.colors?.[0]?.name ?? "").toLowerCase();
  if (/twilly/.test(n)) return twillyTurf;
  if (/scarf|shawl|stole|silk/.test(n) && !/gift set/.test(n)) {
    if (/45/.test(n)) return palonniersScarf45;
    return pick(SCARF_POOL, seed);
  }
  if (/belt/.test(n)) {
    if (/collier de chien/.test(n)) return collierDeChien50Belt;
    if (/\bh\b|h belt/.test(n)) return hBelt38;
    return pick(BELT_POOL, seed);
  }
  if (/sneaker/.test(n)) {
    if (/blanc|white/.test(col)) return bouncingSneakerBlanc;
    if (/noir|black/.test(col)) return bouncingSneaker;
    if (/gris|grey|gray/.test(col)) return jetSneaker;
    return pick(SHOE_POOL, seed);
  }
  if (/boot/.test(n)) return nineAnkleBoot;
  if (/loafer|mule|derby|oxford|espadrille|sandal|pump|ballerina|flat|shoe/.test(n)) return noeLoafer;
  if (/watch/.test(n)) {
    if (/moon|lune|arceau/.test(n)) return arceauPetiteLune;
    if (/h08/.test(n)) return h08Watch;
    if (/cut/.test(n)) return cutWatch;
    if (/kelly/.test(n)) return /pink|rose/.test(col + n) ? kellyWatchMiniPink : kellyWatchMiniGrey;
    if (/small|mini|31 mm/.test(n)) return capeCodSmall;
    return pick(WATCH_POOL, seed);
  }
  if (/necklace/.test(n)) return chaineDancreNecklace;
  if (/earring/.test(n)) return chaineDancreEarrings;
  if (/bracelet|bangle/.test(n)) {
    if (/diamond|white gold|contour/.test(n)) return chaineDancreContourBracelet;
    if (/leather|thalassa/.test(n)) return miniThalassaBracelet;
    return clicClacHBracelet;
  }
  if (/ring/.test(n)) return chaineDancreContourBracelet;
  if (/lipstick|lip/.test(n)) return /gift|set|care/.test(n) ? rougeLipCareSet : matteLipstickRoseBoise;
  if (/eye shadow|eyeshadow|ombres|mascara|face|powder|blush|foundation/.test(n)) return ombresEyeShadow;
  if (/nail/.test(n)) return nailPolishOrRose;
  if (/perfume|parfum|eau de|cologne|hermessence|fragrance/.test(n)) {
    if (/refill/.test(n)) return muscPallidaRefill;
    return pick(PERFUME_POOL, seed);
  }
  if (/blanket|throw|pillow|cushion/.test(n)) return avalonBlanket;
  if (/plate|tableware|porcelain|glass|carafe|teapot|cup|bowl|vase/.test(n)) return mosaiquePlates;
  if (/saddle|bridle|tack|horse/.test(n)) return saddleBridle;
  // Ready-to-wear is model-worn, as on hermes.com: dresses rotate through
  // the model-worn dress photos, coats/knits/pants/hats get their own
  // model-worn shots instead of one flat product photo for everything.
  if (/dress|skirt|caftan/.test(n)) return pick(DRESS_POOL, seed);
  if (/coat|parka/.test(n)) return coatModel;
  if (/knit|sweater|twillaine|cardigan/.test(n)) return knitSweaterModel;
  if (/jogging|pants|trousers/.test(n)) return hJoggingPants;
  if (/breeches/.test(n)) return dressageBreeches;
  if (/bucket hat|\bhat\b|cap/.test(n)) return bucketHat;
  if (/jacket|shirt|top|t-shirt|blouse/.test(n)) return riderJacket;
  if (/gift card/.test(n)) return giftCard;
  if (/gift set/.test(n)) return silkGiftSet;
  if (/case|pouch|wallet|card holder/.test(n)) return /bride/.test(n) ? brideABracCase : zipengoSoKelly;
  if (/bag|tote|sac|kelly|birkin|picotin|bolide|clutch/.test(n)) {
    if (/pink|rose/.test(col)) return bolide1923Mini;
    if (/noir|black/.test(col)) return pick([boxBag, kellyMessenger, bolidePlume45], seed);
    if (/caramel|tan|gold|fauve|naturel/.test(col)) return pick([lePetitSac, tablierSellier, videpoches], seed);
    return pick(BAG_POOL, seed);
  }
  if (p.category === "jewelry") return pick(JEWEL_POOL, seed);
  if (p.category === "watches") return pick(WATCH_POOL, seed);
  if (p.category === "fragrances") return pick(PERFUME_POOL, seed);
  if (p.category === "leather" || p.category === "women" || p.category === "men") return pick(BAG_POOL, seed);
  if (p.category === "home") return avalonBlanket;
  if (p.category === "equestrian") return saddleBridle;
  if (p.category === "gifts") return giftCard;
  return fallbackStillLife;
}
