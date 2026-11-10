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
  // Original Hermes photo, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Picotin Lock 18 pocket bag, ref H083189CCBQ,
  // $4,850 — verified to load and to show the grey-green pocket bag
  // (exterior pocket + padlock). Only the front view exists on the CDN.
  "Picotin Lock 18 pocket bag":
    "https://assets.hermes.com/is/image/hermesproduct/083189CCBQ_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked (user instruction 2026-11-09).
  // Le Petit Sac bag, ref H087967CC28, $6,350, Mysore goatskin — verified.
  "Le Petit Sac bag":
    "https://assets.hermes.com/is/image/hermesproduct/087967CC28_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked (user instruction 2026-11-09).
  // Double Longe bag, ref H087953CCAC, $7,100 — verified.
  "Double Longe bag":
    "https://assets.hermes.com/is/image/hermesproduct/087953CCAC_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked (user instruction 2026-11-09).
  // Tablier Sellier bag, ref H086583CKAA, $5,850 — verified.
  "Tablier Sellier bag":
    "https://assets.hermes.com/is/image/hermesproduct/086583CKAA_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Kelly Shoulder Etoupe bag": kellyShoulderV2,
  "Bolide Plume 45 bag": bolidePlume45,
  "Zipengo So Kelly pouch": zipengoSoKelly,
  "Box bag": boxBag,
  // Original Hermes photo, hotlinked (user instruction 2026-11-09).
  // Kelly Messenger bag, ref H085671CK89, PM Togo, Noir — verified to show
  // the black Kelly Messenger (flap + turnlock + strap). Default colour.
  "Kelly Messenger bag":
    "https://assets.hermes.com/is/image/hermesproduct/085671CK89_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked (user instruction 2026-11-09).
  // Bolide 1923 mini bag, ref H075180CK18, Etoupe Evercolor, $7,300 —
  // verified. NOTE: this changes the tile colour from the current pink
  // generated tile to Etoupe (REPORT §3, id 10).
  "Bolide 1923 mini bag":
    "https://assets.hermes.com/is/image/hermesproduct/075180CK18_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked (user instruction 2026-11-09).
  // Videpoches bag, ref H087901CKAE, $3,975 — verified.
  "Videpoches bag":
    "https://assets.hermes.com/is/image/hermesproduct/087901CKAE_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked (user instruction 2026-11-09).
  // Neo Double Sens 35 bicolor bag, ref H089099CAAD, $5,850 — verified.
  // (Store name is "Neo Double Sens 35 bag"; rename per REPORT §1 first,
  // or keep this key as-is until the rename is applied.)
  "Neo Double Sens 35 bicolor bag":
    "https://assets.hermes.com/is/image/hermesproduct/089099CAAD_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked (CDN probe 2026-11-10). Kelly Pocket 18
  // belt, Noir, ref H081120CK89 ($2,150) — verified: black Epsom belt with
  // pocket + silver Kelly clasp. The generated tile showed a coiled belt
  // with a gold buckle and no pocket (wrong product). NOTE: data.ts
  // description says "yellow gold plated band" but the ref's photo +
  // metallicFinish are Argenté (silver) — copy flag, see id 13.
  "Kelly Pocket 18 belt":
    "https://assets.hermes.com/is/image/hermesproduct/081120CK89_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked (user instruction 2026-11-09; CDN probe
  // 2026-11-10). Collier de Chien 50 belt, Rouge H, ref H010439CK55080
  // (US $4,975) — verified: red Box-calfskin strap, palladium CDC hardware.
  // NOTE: data.ts says Alligator/Gold — the US $4,975 Rouge H listing is Box
  // calfskin + Palladium; the alligator ref H060651UK10080 is NOT addressable
  // (0 hits on every probed form). Correct the material/finish fields in
  // data.ts or keep the photo + ref only — see cdn-probe.md §5.
  "Collier de Chien 50 belt":
    "https://assets.hermes.com/is/image/hermesproduct/010439CK55_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked (CDN probe 2026-11-10). Elan Pocket 24
  // reversible belt, Beige / Natural, ref H011790UCAAXS — verified: tan +
  // canvas belt bag, gold H buckle, model-worn shot. NOTE: data.ts says
  // Palladium — the beige variant on hermes.com is gold-plated (UCAA); the
  // palladium variant (UKAB) is the BLACK bag. Correct the finish in data.ts
  // or keep the photo + ref only — see cdn-probe.md §5.
  "Elan Pocket 24 reversible belt":
    "https://assets.hermes.com/is/image/hermesproduct/011790UCAA_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Serif 32 mm: NOT wired — the exact Red composite was not found (see
  // cdn-probe.md §5). The gold Serif buckle alone is verified
  // (011892UQ53_front_1) but shows no strap, so the generated tile stays.
  "Serif belt buckle & Reversible leather strap 32 mm": serifBelt32,
  // Original Hermes photo, hotlinked (CDN probe 2026-11-10). H belt buckle
  // & Reversible leather strap 38 mm, Black / Gris Foncé — belt-kit
  // composite (strap 077971CAAJ + plain-H buckle 064544CK05, palladium),
  // rendered at 750x1000 and visually verified. NOTE: data.ts lists no
  // finish; the gold variant (buckle 064544CM2M) is also verified — see
  // cdn-probe.md §5.
  "H belt buckle & Reversible leather strap 38 mm":
    "https://assets.hermes.com/is/image/hermesproduct/beltkits-38-f34?$leatherstrap=077971CAAJ_composite_103&$buckle=064544CK05_composite_103&extend=0,0,0,0&align=0,0&wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked (CDN probe 2026-11-10). Etriviere belt
  // buckle & Reversible leather strap 38 mm, Black / Blue Lin — belt-kit
  // composite (strap 077971CAAJ + Etriviere buckle 077931CP2K, gold),
  // rendered at 750x1000 and visually verified (black strap, dark-blue
  // reverse, gold stirrup buckle).
  "Etriviere belt buckle & Reversible leather strap 38 mm":
    "https://assets.hermes.com/is/image/hermesproduct/beltkits-38-f34?$leatherstrap=077971CAAJ_composite_103&$buckle=077931CP2K_composite_103&extend=0,0,0,0&align=0,0&wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked (CDN probe 2026-11-10). Etriers belt
  // buckle & Reversible leather strap 38 mm, Blue Moyen — belt-kit composite
  // (strap 077971CAME + Etriers buckle 081753CIJ3, palladium), rendered at
  // 750x1000 and visually verified (navy-blue strap, silver stirrup buckle).
  "Etriers belt buckle & Reversible leather strap 38 mm":
    "https://assets.hermes.com/is/image/hermesproduct/beltkits-38-f34?$leatherstrap=077971CAME_composite_103&$buckle=081753CIJ3_composite_103&extend=0,0,0,0&align=0,0&wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Bouncing sneaker, ref H242810ZH90, $1,275 —
  // verified to load and to show the white Bouncing sneaker (Blanc, the
  // default colour). Ref H252782ZHF7 is the Ecorce (brown suede)
  // colourway, not Blanc/Noir.
  "Bouncing sneaker":
    "https://assets.hermes.com/is/image/hermesproduct/242810ZH90_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Jet sneaker, ref H261807ZHAF, $1,300 —
  // verified to load and to show the rust suede/fabric Jet sneaker.
  "Jet sneaker":
    "https://assets.hermes.com/is/image/hermesproduct/261807ZHAF_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Nine ankle boot, ref H262820ZHNL, $1,450 —
  // verified to load and to show the beige suede Nine ankle boot.
  "Nine ankle boot":
    "https://assets.hermes.com/is/image/hermesproduct/262820ZHNL_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Noe loafer, ref H262834ZAAC, $1,175 —
  // verified to load and to show the rust suede Noe loafer (H cut-out).
  "Noe loafer":
    "https://assets.hermes.com/is/image/hermesproduct/262834ZAAC_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photos, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Bags ids 62–88 — every URL below returned
  // HTTP 200 with Referer https://hermesmart.vercel.app/ and was visually
  // confirmed to show the named product. Full audit: REPORT.md §3/§5.
  // Duplicate names share one key (one colourway wired per name, §2):
  // "24/24 - 21 bag" = H082141CCAJ (id 65; id 75 is H085157CKAL),
  // "Neo Garden Voyage 41 bag" = H086934CKAB (id 67; id 76 is H086717CKAC),
  // "Neo Garden Voyage 41 bredies bag" = H087934CKAB (id 62; id 82 is H087934CKAA).
  "Neo Garden Voyage 41 bredies bag":
    "https://assets.hermes.com/is/image/hermesproduct/087934CKAB_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Medor bag":
    "https://assets.hermes.com/is/image/hermesproduct/085055CKAT_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Arcon slim bag":
    "https://assets.hermes.com/is/image/hermesproduct/087032CKAB_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "24/24 - 21 bag":
    "https://assets.hermes.com/is/image/hermesproduct/082141CCAJ_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Hermès Geta bag":
    "https://assets.hermes.com/is/image/hermesproduct/085408CKAB_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Neo Garden Voyage 41 bag":
    "https://assets.hermes.com/is/image/hermesproduct/086934CKAB_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Messenger Attelage bag":
    "https://assets.hermes.com/is/image/hermesproduct/084111CK89_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Besace Attelee bag":
    "https://assets.hermes.com/is/image/hermesproduct/087913CC89_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Cliquetis bag":
    "https://assets.hermes.com/is/image/hermesproduct/086913CK89_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Jypsiere mini bag":
    "https://assets.hermes.com/is/image/hermesproduct/083982CKAY_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Mallette bag":
    "https://assets.hermes.com/is/image/hermesproduct/087960CT89_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Jige Elan 29 colorblock clutch":
    "https://assets.hermes.com/is/image/hermesproduct/083286CACD_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Lassoie Hermès bag":
    "https://assets.hermes.com/is/image/hermesproduct/087076CKAB_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "In-the-Loop plush belt bag":
    "https://assets.hermes.com/is/image/hermesproduct/084987CKAB_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Etriviere Shopping voyage bag":
    "https://assets.hermes.com/is/image/hermesproduct/088128CKAA_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Roulis mini bag":
    "https://assets.hermes.com/is/image/hermesproduct/070510CP1C_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Lindy 26 bag":
    "https://assets.hermes.com/is/image/hermesproduct/073430CP2D_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Silkycity 33 bag":
    "https://assets.hermes.com/is/image/hermesproduct/085933CKAB_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Hermès In-the-Loop 18 bag":
    "https://assets.hermes.com/is/image/hermesproduct/084274CCY1_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Hermès Della Cavalleria Elan bag":
    "https://assets.hermes.com/is/image/hermesproduct/089063CK37_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Hermès Geta slim bag":
    "https://assets.hermes.com/is/image/hermesproduct/086984CKAW_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Mini Medor bag":
    "https://assets.hermes.com/is/image/hermesproduct/085003CKY1_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "P'tit Arcon bag":
    "https://assets.hermes.com/is/image/hermesproduct/085871CKAE_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Halzan 25 bag":
    "https://assets.hermes.com/is/image/hermesproduct/082027CKY1_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Kelly Chaine bracelet, small model":
    "https://assets.hermes.com/is/image/hermesproduct/kelly-chaine-bracelet-small-model--218471B%2000-front-wm-2-0-0-1000-1000_g.jpg", // V, ref H218471Bv00 candidate — which of $12,900/$41,900 unconfirmed
  "Kelly Gourmette bracelet, very small model":
    "https://assets.hermes.com/is/image/hermesproduct/kelly-gourmette-bracelet-very-small-model--221410B%2000-front-wm-1-0-0-1000-1000_g.jpg", // V, ref H221410Bv00, $12,500 + $19,100 share this tile
  "Vertige bracelet":
    "https://assets.hermes.com/is/image/hermesproduct/vertige-bracelet--221207B%2000-front-wm-2-0-0-1000-1000_g.jpg", // V, ref H221207Bv00, $90,900 + $72,600 share this tile
  "Chaine d'ancre Chaos Nano bracelet":
    "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-chaos-nano-bracelet--225411B%2000-front-wm-1-0-0-1000-1000_g.jpg", // ref H225411Bv00; also H123431Bv00 (same view set)
  "Boucle Sellier “On The Rocks” bracelet, small model":
    "https://assets.hermes.com/is/image/hermesproduct/boucle-sellier-on-the-rocks-bracelet-small-model--224402B%2000-front-wm-2-0-0-1000-1000_g.jpg", // ref H224402Bv00; also H224401Bv00
  "Chaine d'ancre Verso bracelet, large model":
    "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-verso-bracelet--125408B%2000-front-wm-2-0-0-1000-1000_g.jpg", // ref H125408Bv00 (US page)
  "Clou de forge bracelet":
    "https://assets.hermes.com/is/image/hermesproduct/clou-de-forge-bracelet--125405B%2000-front-wm-2-0-0-1000-1000_g.jpg", // ref H125405Bv00 (US page)
  "Planètes & Météores bracelet":
    "https://assets.hermes.com/is/image/hermesproduct/223413B%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H223413Bv00, $45,700
  "Farandole bracelet":
    "https://assets.hermes.com/is/image/hermesproduct/farandole-bracelet--221413B%2000-front-wm-2-0-0-1000-1000_g.jpg", // ref H221413Bv00
  "Amulettes Kelly bracelet":
    "https://assets.hermes.com/is/image/hermesproduct/bracelet-amulettes-kelly--121425B%2000-front-wm-2-0-0-1000-1000_g.jpg", // ref H121425Bv00
  "Amulettes Constance bracelet":
    "https://assets.hermes.com/is/image/hermesproduct/amulettes-constance-bracelet--121400B%2000-worn-1-0-0-1000-1000_g.jpg", // ref H121400Bv00 — worn shot is the only verified view; front unverified
  "Kelly Cadenas double bracelet, small model":
    "https://assets.hermes.com/is/image/hermesproduct/brazalete-kelly-cadenas-tamano-pequeno--220465B%2000-front-wm-2-0-0-1000-1000_g.jpg", // ref H220465Bv00; see §4 caution (double-tour ref may differ)
  "Kelly watch, Mini model, 16 mm":
    "https://assets.hermes.com/is/image/hermesproduct/kelly-watch-mini-model-16mm--056853WW00-front-wm-1-0-0-1000-1000_g.jpg", // V, ref W056853WW00 — fully pavé rose gold; best matches $97,400 (id 260), NOT $6,750/$45,600
  "Arceau Chronographe watch, 42 mm":
    "https://assets.hermes.com/is/image/hermesproduct/arceau-chronographe-watch-42mm--404112WW00-front-wm-1-0-0-1000-1000_g.jpg", // ref W404112WW00; also W404113WW00 / W403964WW00
  "Heure H watch, Medium model, 30 mm":
    "https://assets.hermes.com/is/image/hermesproduct/heure-h-watch-medium-model-30mm--404144WW00-front-wm-1-0-0-1000-1000_g.jpg", // V, ref W404144WW00 — diamond pavé; most likely the $25,550 row, NOT the $8,800 plain row
  "Heure H watch, Small model, 25 mm":
    "https://assets.hermes.com/is/image/hermesproduct/heure-h-watch-small-model-25mm--404283WW00-front-wm-1-0-0-1000-1000_g.jpg", // ref W404283WW00
  "Hermès H08 Chronographe watch, 45 mm":
    "https://assets.hermes.com/is/image/hermesproduct/hermes-h08-chronographe-watch-45mm--403130WW00-front-wm-1-0-0-1000-1000_g.jpg", // V, ref W403130WW00, orange strap, $13,000
  "Arceau Le Temps Voyageur watch, 38 mm":
    "https://assets.hermes.com/is/image/hermesproduct/arceau-le-temps-voyageur-watch-38mm--057343WW00-front-wm-1-0-0-1000-1000_g.jpg", // ref W057343WW00, $31,275
  "Cape Cod watch, Mini model, 27 mm":
    "https://assets.hermes.com/is/image/hermesproduct/cape-cod-watch-mini-model-27mm--408333WW00-front-wm-1-0-0-1000-1000_g.jpg", // ref W408333WW00; price mismatch §2.3
  "Nantucket watch, Small model, 29 mm":
    "https://assets.hermes.com/is/image/hermesproduct/nantucket-watch-small-model-29mm--044188WW00-front-wm-1-0-0-1000-1000_g.jpg", // ref W044188WW00
  "Faubourg Marguerite watch, Mini model, 15 mm":
    "https://assets.hermes.com/is/image/hermesproduct/faubourg-marguerite-watch-mini-model-15mm--402996WW00-front-wm-1-0-0-1000-1000_g.jpg", // ref W402996WW00 (US), $75,300
  "Faubourg watch, Mini model, 15 mm":
    "https://assets.hermes.com/is/image/hermesproduct/faubourg-watch-mini-model-15mm--049310WW00-front-1-300-0-1000-1000_g.jpg", // ref W049310WW00 (US)
  "Hermès Cut Le Temps Suspendu watch, Large model, 39 mm":
    "https://assets.hermes.com/is/image/hermesproduct/hermes-cut-le-temps-suspendu-watch-large-model-39mm--408256WW00-front-wm-1-0-0-1000-1000_g.jpg", // ref W408256WW00, $44,900
  // Original Hermes photos, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). All URLs below returned HTTP 200 and were
  // visually confirmed to show the correct model (audit 2026-11-10).
  "Master sneaker":
    "https://assets.hermes.com/is/image/hermesproduct/261881ZHD8_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Day sneaker":
    "https://assets.hermes.com/is/image/hermesproduct/252883ZH90_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Match sneaker":
    "https://assets.hermes.com/is/image/hermesproduct/261863ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Kid sneaker":
    "https://assets.hermes.com/is/image/hermesproduct/251929ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Lucky slip-on sneaker":
    "https://assets.hermes.com/is/image/hermesproduct/252896ZHC9_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Quicker sneaker":
    "https://assets.hermes.com/is/image/hermesproduct/102190ZH09_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Nathan ankle boot":
    "https://assets.hermes.com/is/image/hermesproduct/262901ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Mateo ankle boot":
    "https://assets.hermes.com/is/image/hermesproduct/261972ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Jeff ankle boot: the exact $2,425 colourway ref H252122Zv02 has no
  // locatable CDN images (see report §5). This is the $2,500 Jeff colourway
  // (ref H242946ZH01, black PVD buckle) — same model, verified Jeff boot.
  "Jeff ankle boot":
    "https://assets.hermes.com/is/image/hermesproduct/242946ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Newton loafer":
    "https://assets.hermes.com/is/image/hermesproduct/262941ZAGN_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Honore loafer: PRICE MISMATCH — store $1,600, US hermes.com $1,650
  // (ref H232903ZANP). Photo is the correct model; price left as-is here.
  "Honore loafer":
    "https://assets.hermes.com/is/image/hermesproduct/232903ZANP_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Mind loafer: covers the $1,600 rows (ref H261937ZAC9, verified) and the
  // $1,675 row (id 183), whose US price is unconfirmed and whose own
  // colourway ref was not found — same model, right photo, flag in §5.
  "Mind loafer":
    "https://assets.hermes.com/is/image/hermesproduct/261937ZAC9_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Paris loafer":
    "https://assets.hermes.com/is/image/hermesproduct/172368ZA02_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Member loafer":
    "https://assets.hermes.com/is/image/hermesproduct/261947ZAC9_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Nicolas loafer":
    "https://assets.hermes.com/is/image/hermesproduct/262948ZA01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Nod loafer: ref H262939ZAC9 is the $1,350 colourway by inference
  // (the $1,300 colourway is H262103ZvE5, whose CDN images are not
  // locatable); the photo is visually confirmed to be a fringe Nod loafer.
  "Nod loafer":
    "https://assets.hermes.com/is/image/hermesproduct/262939ZAC9_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Low loafer":
    "https://assets.hermes.com/is/image/hermesproduct/252964ZAC9_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Noon mule: the exact US colourway ref H262002ZvC9 has no locatable CDN
  // images (see §5). This is the brown suede Noon mule (ref H262865ZHME) —
  // same model, verified. Alternate verified Noon mule: 262911ZH01 (black).
  "Noon mule":
    "https://assets.hermes.com/is/image/hermesproduct/262865ZHME_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Nick mule":
    "https://assets.hermes.com/is/image/hermesproduct/262937ZAC9_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Nils derby shoe":
    "https://assets.hermes.com/is/image/hermesproduct/262945ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Now derby shoe":
    "https://assets.hermes.com/is/image/hermesproduct/262933ZHME_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Keneth derby shoe":
    "https://assets.hermes.com/is/image/hermesproduct/251971ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Moreno derby shoe":
    "https://assets.hermes.com/is/image/hermesproduct/261974ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Lawrence derby shoe":
    "https://assets.hermes.com/is/image/hermesproduct/252998ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Middle derby shoe":
    "https://assets.hermes.com/is/image/hermesproduct/261978ZHME_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Lead derby shoe":
    "https://assets.hermes.com/is/image/hermesproduct/252975ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "May derby shoe":
    "https://assets.hermes.com/is/image/hermesproduct/261956ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
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
  // Original Hermes photo, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Bouncing sneaker, Blanc, ref H262850ZH90,
  // $1,125 — verified to load and to show the white Bouncing sneaker.
  "Bouncing sneaker, Blanc":
    "https://assets.hermes.com/is/image/hermesproduct/262850ZH90_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Neon sneaker, ref H262898ZH01, $1,350 —
  // verified to load and to show the black Neon sneaker.
  "Neon sneaker":
    "https://assets.hermes.com/is/image/hermesproduct/262898ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Next sneaker, ref H262891ZH01, $1,450 —
  // verified to load and to show the black/white Next sneaker.
  "Next sneaker":
    "https://assets.hermes.com/is/image/hermesproduct/262891ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  // Original Hermes photo, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Nobu sneaker, ref H262888ZH01, $1,400 —
  // verified to load and to show the black Nobu sneaker.
  "Nobu sneaker":
    "https://assets.hermes.com/is/image/hermesproduct/262888ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Chaine d'ancre necklace, small model":
    "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-necklace--101503B%2000-front-wm-2-0-0-1000-1000_g.jpg", // V, ref H101503Bv00, sterling silver
  "Clic Clac H bracelet":
    "https://assets.hermes.com/is/image/hermesproduct/clic-clac-h-bracelet--300001F%2001-worn-1-0-0-1000-1000_g.jpg", // V, ref H300001F 01, black enamel / YELLOW GOLD, $960 (default Noir)
  "Chaine d'ancre earrings":
    "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-enchainee-earrings-small-model--109510B%2000-front-wm-2-0-0-1000-1000_g.jpg", // V, ref H109510Bv00, sterling silver
  "Mini Thalassa bracelet":
    "https://assets.hermes.com/is/image/hermesproduct/mini-thalassa-bracelet--500522FK18-front-wm-2-0-0-1000-1000_g.jpg", // V, ref H500522FK18, Etoupe Swift / palladium, $580
  // Original Hermes photos, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Jewelry & watches audit 2026-11-10: each URL
  // below returned HTTP 200 with Referer https://hermesmart.vercel.app/.
  // "V" = also downloaded and visually confirmed to show the right item.
  // Where several refs exist for one name, the PRIMARY ref is wired here;
  // per-variant photos need an id-based lookup (see REPORT §2.5).
  "Chaine d'ancre Contour bracelet, white gold":
    "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-contour-bracelet--123405B%2000-front-wm-2-0-0-1000-1000_g.jpg", // V, ref H123405Bv00, $5,400
  "Colliers et Laisses pour Chiens scarf 90": scarf90V2,
  "Turf Les Courses Twilly": "https://assets.hermes.com/is/image/hermesproduct/061144S%2005_worn_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // Original Hermes photo, hotlinked (verified HTTP 200, 2026-11-10).
  // Original Hermes photo, hotlinked (CDN probe 2026-11-10, spaced ID
  // 251526S 02). No flat front view exists on the CDN — the tile is the
  // worn_1 model shot (verified: beige/brown striped stole).
  "Casaque Jumping scarf":
    "https://assets.hermes.com/is/image/hermesproduct/251526S%2002_worn_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H251526Sv02, $1,050 (REPLACE generated casaqueJumpingScarf)
  "Palonniers scarf 45": palonniersScarf45,
  "La Nature en Voyage scarf 90": laNatureScarf90,
  "Rouge Hermès gift set, Lip care": rougeLipCareSet,
  "Ombres d'Hermès, Eye shadow quartet, Ombres Sables":
    "https://assets.hermes.com/is/image/hermesproduct/60875PV007_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V60875PV007, $121 (REPLACE generated ombresEyeShadow)
  "Les Mains Hermès, Nail polish, Or Rose":
    "https://assets.hermes.com/is/image/hermesproduct/60861VV050_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V60861VV050, $66 (REPLACE generated nailPolishOrRose)
  // Original Hermes photo, hotlinked (CDN probe 2026-11-10, spaced ID
  // 104951M 01). Verified: tan case, red strap + striped band.
  "Bride-a-Brac Sellier case, large model":
    "https://assets.hermes.com/is/image/hermesproduct/104951M%2001_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H104951Mv01, $1,050 (REPLACE generated brideABracCase)
  "Matte lipstick, Rose Boisé":
    "https://assets.hermes.com/is/image/hermesproduct/60001MV048_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V60001MV048, $86 (REPLACE generated matteLipstickRoseBoise)
  "Musc Pallida, Eau de parfum, 3.4 fl.oz":
    "https://assets.hermes.com/is/image/hermesproduct/117337V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V117337V0, $435 (REPLACE generated muscPallida)
  "Musc Pallida refill, Eau de parfum":
    "https://assets.hermes.com/is/image/hermesproduct/118291V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V118291V0, $595 (REPLACE generated muscPallidaRefill)
  "Hermessence, Eau de toilette": hermessenceEdt,
  "Hermessence Essence, Eau de parfum": hermessenceEssence,
  "Cape Cod watch, Large model, 37 mm":
    "https://assets.hermes.com/is/image/hermesproduct/cape-cod-watch-large-model-37mm--043651WW00-front-1-300-0-800-800_g.jpg", // V, ref W043651WW00, Etoupe strap, $3,950 (403352WW00 was the Automatique — wrong model)
  "Cape Cod watch, Small model, 31 mm":
    "https://assets.hermes.com/is/image/hermesproduct/cape-cod-watch-small-model-31mm--060115WW00-front-wm-1-0-0-1000-1000_g.jpg", // ref W060115WW00, $3,825
  "Hermès H08 watch, 42 mm":
    "https://assets.hermes.com/is/image/hermesproduct/hermes-h08-watch-42mm--408230WW00-front-wm-1-0-0-1000-1000_g.jpg", // V, ref W408230WW00, titanium / grey dial / dark grey strap, $8,600 (402990WW00 was blue rubber strap, composite case)
  "Hermès Cut watch, Large model, 36 mm":
    "https://assets.hermes.com/is/image/hermesproduct/hermes-cut-watch-large-model-36mm--403190WW00-front-wm-1-0-0-1000-1000_g.jpg", // ref W403190WW00 candidate, $7,125
  "Kelly watch, Mini model, 16 mm, Grey":
    "https://assets.hermes.com/is/image/hermesproduct/kelly-watch-mini-model-16mm--408477WW00-front-wm-1-0-0-1000-1000_g.jpg", // V, ref W408477WW00, steel / copper-rose dial
  "Kelly watch, Mini model, 16 mm, Pink gold":
    "https://assets.hermes.com/is/image/hermesproduct/kelly-watch-mini-model-16mm--056854WW00-front-wm-1-0-0-1000-1000_g.jpg", // V, ref W056854WW00, rose gold / white MOP dial
  "Arceau Petite Lune watch, Large model, 38 mm":
    "https://assets.hermes.com/is/image/hermesproduct/arceau-petite-lune-watch-large-model-38mm--403043WW00-front-1-300-0-800-800_g.jpg", // V, ref W403043WW00, $20,800
  "Avalon throw blanket":
    "https://assets.hermes.com/is/image/hermesproduct/102668M59_worn_102?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H102668M 59, $2,050 (REPLACE generated avalonBlanket; tile is the worn shot — no flat/front view exists on the CDN)
  "Mosaique au 24 dinner plate, set of 2":
    "https://assets.hermes.com/is/image/hermesproduct/035001P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P035001P, $340 (REPLACE generated mosaiquePlates)
  "Saddle and bridle set": saddleBridle,
  "Rider jacket": riderJacket,
  "Gift card": giftCard,
  "Silk gift set for her": silkGiftSet,
  // Original Hermes photos, hotlinked from assets.hermes.com (user
  // instruction 2026-11-09). Fragrance / make-up / home audit 2026-11-10:
  // each URL below returned HTTP 200 with Referer
  // https://hermesmart.vercel.app/ and was downloaded and visually
  // confirmed to show the correct product ("V"). Duplicate name+price
  // rows (expansion colourways) share one map entry.
  "Ambre Narguile Eau de toilette":
    "https://assets.hermes.com/is/image/hermesproduct/113483V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V113483V0, $385
  "Myrrhe Eglantine Eau de toilette":
    "https://assets.hermes.com/is/image/hermesproduct/113575V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V113575V0, $385
  "Rose Ikebana Eau de toilette":
    "https://assets.hermes.com/is/image/hermesproduct/113578V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V113578V0, $385
  "Cedre Sambac Eau de toilette":
    "https://assets.hermes.com/is/image/hermesproduct/113485V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V113485V0, $385
  "Vetiver Tonka Eau de toilette":
    "https://assets.hermes.com/is/image/hermesproduct/113580V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V113580V0, $385
  "Violette Volynka Eau de toilette":
    "https://assets.hermes.com/is/image/hermesproduct/113581V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V113581V0, $385
  "Agar Ebene Eau de toilette":
    "https://assets.hermes.com/is/image/hermesproduct/113482V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V113482V0, $385
  "Poivre Samarcande Eau de toilette":
    "https://assets.hermes.com/is/image/hermesproduct/113577V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V113577V0, $385
  "Osmanthe Yunnan Eau de toilette":
    "https://assets.hermes.com/is/image/hermesproduct/113576V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V113576V0, $385
  "Iris Ukiyoe Eau de toilette":
    "https://assets.hermes.com/is/image/hermesproduct/113487V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V113487V0, $385
  "Santal Massoia Eau de toilette":
    "https://assets.hermes.com/is/image/hermesproduct/113579V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V113579V0, $385
  "Cuir d'Ange Eau de toilette":
    "https://assets.hermes.com/is/image/hermesproduct/113484V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V113484V0, $385
  "Oud Alezan Eau de parfum":
    "https://assets.hermes.com/is/image/hermesproduct/113467V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V113467V0, $435
  "Ginseng biloba Eau de parfum":
    "https://assets.hermes.com/is/image/hermesproduct/116173V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V116173V0, $435
  "Oud Esma Essence de parfum":
    "https://assets.hermes.com/is/image/hermesproduct/117057V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V117057V0, $782
  "Cardamusc Essence de parfum":
    "https://assets.hermes.com/is/image/hermesproduct/107117V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V107117V0, $465
  "Musc Pallida Essence de parfum":
    "https://assets.hermes.com/is/image/hermesproduct/107115V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V107115V0, $465
  "Barénia Pleine Fleur Eau de parfum":
    "https://assets.hermes.com/is/image/hermesproduct/118008V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V118008V0, $113 (30 ml)
  "Barénia Eau de parfum":
    "https://assets.hermes.com/is/image/hermesproduct/110436V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V110436V0, $113 (30 ml)
  "Barénia Perfumed soap":
    "https://assets.hermes.com/is/image/hermesproduct/110440V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V110440V0, $47
  "Terre d'Hermès Eau de parfum intense":
    "https://assets.hermes.com/is/image/hermesproduct/111230V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V111230V0, $137 (50 ml; note: data.ts wrongly files this under category "home" — see §5)
  "Barénia Pleine Fleur Eau de parfum gift set":
    "https://assets.hermes.com/is/image/hermesproduct/118236V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V118236V0, $147 (60 ml + 15 ml + 25 g soap)
  "Barénia eau de parfum gift set – The fragrance ritual":
    "https://assets.hermes.com/is/image/hermesproduct/116955V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V116955V0, $229 (100 ml + 15 ml + 25 g soap)
  "Hermessence gift set, Limited edition":
    "https://assets.hermes.com/is/image/hermesproduct/118249V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V118249V0, $240 (4×15 ml: Musc Pallida EDP, Oud Alezan EDP, Rose Ikebana EDT, Ambre Narguile EDT)
  "Twilly d'Hermès eau de parfum gift set – The fragrance ritual":
    "https://assets.hermes.com/is/image/hermesproduct/110983V0_front_wm_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V110983V0, $264 (85 ml + 15 ml + lotion; tile is front_wm_1 — no 101 exists)
  // Original Hermes photos, hotlinked (CDN probe 2026-11-10). Plain Twilly
  // EDP (NOT Tutti Twilly / Eau Ginger — different products), Bleue EDT and
  // Epice Marine EDT — refs found on hermes.com product pages, every URL
  // verified (HTTP 200 + visual check). Twilly + Bleue have NO front_wm_101
  // — the tile is front_wm_102 (bottle front).
  "Twilly d'Hermès Eau de parfum":
    "https://assets.hermes.com/is/image/hermesproduct/107263V0_front_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V107263V0, $105 (30 ml)
  "Eau des Merveilles Bleue Eau de toilette":
    "https://assets.hermes.com/is/image/hermesproduct/107179V0_front_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V107179V0, $92 — NOTE: V107179V0 is the 100 ml listing; store $92 is the 30 ml size (same bottle design). See cdn-probe.md §5.
  "Epice Marine Eau de toilette":
    "https://assets.hermes.com/is/image/hermesproduct/113486V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V113486V0, $385
  "A Walk in the Garden teapot":
    "https://assets.hermes.com/is/image/hermesproduct/043018P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P043018P, $1,370
  // Original Hermes photos, hotlinked (CDN probe 2026-11-10). A Walk in the
  // Garden tableware — all 10 remaining pieces; refs found on hermes.com
  // product pages, every URL verified (HTTP 200 + visual check). Duplicate
  // names share one key (one colourway per name): tea cup and saucer =
  // P043016P (green grid); a second variant P043116P (yellow grid) exists
  // but is not mapped to a store row — see cdn-probe.md §5.
  "A Walk in the Garden bowl, large model":
    "https://assets.hermes.com/is/image/hermesproduct/043285P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P043285P, $415
  "A Walk in the Garden salad bowl":
    "https://assets.hermes.com/is/image/hermesproduct/043036P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P043036P, $705
  "A Walk in the Garden bread and butter plate":
    "https://assets.hermes.com/is/image/hermesproduct/043212P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P043212P, $135
  "A Walk in the Garden dessert plate":
    "https://assets.hermes.com/is/image/hermesproduct/043107P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P043107P, $180
  "A Walk in the Garden tart platter":
    "https://assets.hermes.com/is/image/hermesproduct/043022P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P043022P, $515
  "A Walk in the Garden tea cup and saucer":
    "https://assets.hermes.com/is/image/hermesproduct/043016P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P043016P, $265
  "A Walk in the Garden Mug":
    "https://assets.hermes.com/is/image/hermesproduct/043031P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P043031P, $230
  "A Walk in the Garden hollow dish":
    "https://assets.hermes.com/is/image/hermesproduct/043013P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P043013P, $240
  "A Walk in the Garden dinner plate":
    "https://assets.hermes.com/is/image/hermesproduct/043001P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P043001P, $215
  "A Walk in the Garden tray, small model":
    "https://assets.hermes.com/is/image/hermesproduct/043089P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P043089P, $275
  // Original Hermes photos, hotlinked (CDN probe 2026-11-10, spaced ID
  // form: refs with "v" resolve as "{base} {digits}", e.g. H251526Sv02
  // -> 251526S 02; H800336Ev3340 -> 800336E 33). Scarves: only model-worn
  // views exist on the CDN (no flat front view, except the Jockey scarf
  // ring); the tile is the worn_1 model shot. Blankets / pillows: flat
  // front_wm_101 tile. Every URL verified (HTTP 200 + visual check).
  "Petite Casaque Lettres Equestres scarf":
    "https://assets.hermes.com/is/image/hermesproduct/254039S%2001_worn_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H254039Sv01, $570
  "Colliers de Chiens scarf":
    "https://assets.hermes.com/is/image/hermesproduct/392770T%2001_worn_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H392770Tv01, $510
  "Double Face stole":
    "https://assets.hermes.com/is/image/hermesproduct/259130S%2017_worn_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H259130Sv17, $1,625
  "Petite Casaque Parthenon scarf":
    "https://assets.hermes.com/is/image/hermesproduct/259171S%2001_worn_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H259171Sv01, $570
  "Champ de Courses a Chantilly triangle":
    "https://assets.hermes.com/is/image/hermesproduct/361173S%2006_worn_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H361173Sv06, $1,100
  "Cinetique scarf":
    "https://assets.hermes.com/is/image/hermesproduct/269172S%2001_worn_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H269172Sv01, $900
  "Carreaux scarf 80":
    "https://assets.hermes.com/is/image/hermesproduct/219153S%2001_worn_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H219153Sv01, $680
  "Les Leopards triangle":
    "https://assets.hermes.com/is/image/hermesproduct/362953S%2001_worn_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H362953Sv01, $1,100
  "Exceptional embroidered double-faced Twilly":
    "https://assets.hermes.com/is/image/hermesproduct/851517S%2001_worn_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H851517Sv01, $3,000
  "Boucles et Maillons Twilly":
    "https://assets.hermes.com/is/image/hermesproduct/064367S%2004_worn_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H064367Sv04, $260
  "Jockey long Twilly":
    "https://assets.hermes.com/is/image/hermesproduct/851592S%2002_worn_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H851592Sv02, $420
  "Jockey scarf ring":
    "https://assets.hermes.com/is/image/hermesproduct/604023S%2001_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H604023Sv01, $455
  "Summer Dye blanket":
    "https://assets.hermes.com/is/image/hermesproduct/104841M%2001_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H104841Mv01, $4,550
  "Avalon III throw blanket":
    "https://assets.hermes.com/is/image/hermesproduct/102665M%2060_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H102665Mv60, $2,050
  "Optimist 24 blanket":
    "https://assets.hermes.com/is/image/hermesproduct/104848M%2003_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H104848Mv03, $2,075
  "Les 6 Pas du Cheval blanket":
    "https://assets.hermes.com/is/image/hermesproduct/104837M%2001_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H104837Mv01, $3,250
  "Avalon III pillow, small model":
    "https://assets.hermes.com/is/image/hermesproduct/102666M%2055_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H102666Mv55, $900 (v54 did NOT resolve)
  "Avalon pillow, large model":
    "https://assets.hermes.com/is/image/hermesproduct/102669M%2053_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H102669Mv53, $1,300
  "H Horizon pillow, medium model":
    "https://assets.hermes.com/is/image/hermesproduct/103942M%2004_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H103942Mv04 (blue), $900
  "H Horizon pillow":
    "https://assets.hermes.com/is/image/hermesproduct/103942M%2005_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref H103942Mv05 (red), $900
  "Chevaux a la Couverture set of 2 mugs (n°1 and 2)":
    "https://assets.hermes.com/is/image/hermesproduct/081031P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P081031P (mug n°1), $500
  "Chevaux a la Couverture mug n°3":
    "https://assets.hermes.com/is/image/hermesproduct/081231P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P081231P, $250
  "Chevaux a la Couverture set of 3 mugs":
    "https://assets.hermes.com/is/image/hermesproduct/081431P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P081431P, $750
  "Iskender white wine glass":
    "https://assets.hermes.com/is/image/hermesproduct/010108P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P010108P, $530
  "Les Grigris Hermès Face and eye illuminating powder, Limited edition, Or Permabrass":
    "https://assets.hermes.com/is/image/hermesproduct/60863PV002_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V60863PV002, $121
  "HERMÈSISTIBLE Infused Care Oil, Rose Nashi":
    "https://assets.hermes.com/is/image/hermesproduct/60346HV010_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V60346HV010, $63
  "ROSE HERMÈS Rosy lip enhancer, Limited Edition, Rouge Airelle":
    "https://assets.hermes.com/is/image/hermesproduct/60843BV038_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V60843BV038, $90
  "TRAIT D'HERMÈS Precision eyeliner, Encre Noire":
    "https://assets.hermes.com/is/image/hermesproduct/60574EV001_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V60574EV001, $71
  "OMBRES D'HERMÈS Eye shadows, Ombres Pétales":
    "https://assets.hermes.com/is/image/hermesproduct/60365PV001_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V60365PV001, $114
  "TRAIT D'HERMÈS Revitalizing care mascara, Noir Fusain":
    "https://assets.hermes.com/is/image/hermesproduct/60510EV001_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V60510EV001, $71
  "ROSE HERMÈS Rosy lip glossy enhancer, Rose Confetti":
    "https://assets.hermes.com/is/image/hermesproduct/60487BV027_front_wm_104?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V60487BV027, $86 (tile is front_wm_104 — no 101/102 exists)
  "TRAIT D'HERMÈS Eye pencil, Or Permabrass":
    "https://assets.hermes.com/is/image/hermesproduct/60570CV010_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V60570CV010, $53
  "HERMÈS PLEIN AIR H Trio healthy glow mineral powder, Tottori":
    "https://assets.hermes.com/is/image/hermesproduct/60447PV001_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V60447PV001, $111
  "LES PINCEAUX HERMÈS Precision makeup brush, le Precis":
    "https://assets.hermes.com/is/image/hermesproduct/604440V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V604440V0, $112
  "ROUGE HERMÈS Silky Lipstick Shine, Rose Boisé":
    "https://assets.hermes.com/is/image/hermesproduct/60267TV048_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V60267TV048, $86
  "ROUGE HERMÈS Satin lipstick, Limited Edition, Rose Épicé":
    "https://assets.hermes.com/is/image/hermesproduct/60001SV021_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V60001SV021, $90
  "ROUGE HERMÈS Pre-composed gift set, Limited edition":
    "https://assets.hermes.com/is/image/hermesproduct/604810V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V604810V0, $172 (price mismatch — see §5)
  "Barénia Perfumed hair mist":
    "https://assets.hermes.com/is/image/hermesproduct/115954V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V115954V0, $63
  "Chevaux a la Couverture mug n°2":
    "https://assets.hermes.com/is/image/hermesproduct/081131P_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref P081131P (confirmed by image: blue horse), $250
  "Ambre Narguile Eau de toilette refill":
    "https://assets.hermes.com/is/image/hermesproduct/29751_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V29751, $525
  "Cedre Sambac Eau de toilette refill":
    "https://assets.hermes.com/is/image/hermesproduct/39937_front_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V39937, $525 (tile is front_1; front_wm_101 is 403)
  "Rose Ikebana Eau de toilette refill":
    "https://assets.hermes.com/is/image/hermesproduct/38167_front_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V38167, $525 (tile is front_1; front_wm_101 is 403)
  "Myrrhe Eglantine Eau de toilette refill":
    "https://assets.hermes.com/is/image/hermesproduct/39935_worn_1?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V39935, $525 (only worn_1 exists; front shot of the refill bottle)
  "Oud Alezan Perfumed body cream":
    "https://assets.hermes.com/is/image/hermesproduct/117059V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V117059V0, $165
  "Musc Pallida Perfumed body cream":
    "https://assets.hermes.com/is/image/hermesproduct/108377V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V108377V0, $165
  "Twilly d'Hermès Moisturizing body lotion":
    "https://assets.hermes.com/is/image/hermesproduct/107276V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V107276V0, $89
  "Twilly d'Hermes Perfumed hair mist":
    "https://assets.hermes.com/is/image/hermesproduct/108147V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V108147V0, $82
  "Eau des Merveilles Perfumed hair mist":
    "https://assets.hermes.com/is/image/hermesproduct/108145V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V108145V0, $82
  "L'Ombre des Merveilles Eau de parfum":
    "https://assets.hermes.com/is/image/hermesproduct/101653V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V101653V0 (100 ml), $147
  "L'Ambre des Merveilles Eau de parfum":
    "https://assets.hermes.com/is/image/hermesproduct/107246V0_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V107246V0 (100 ml), $147
  "Mid-length buttoned dress": dressMidLengthModel,
  "Long sleeveless dress": longSleevelessDressModel,
  "Embroidered pocket dress": embroideredPocketDress,
  "\"H\" jogging pants": hJoggingPants,
  // Original Hermes photo, hotlinked (user instruction 2026-11-09).
  // Kelly 18 belt, ref H069853CD10, Craie Epsom, rose-gold Kelly buckle —
  // verified to show the off-white/cream belt.
  "Kelly 18 belt":
    "https://assets.hermes.com/is/image/hermesproduct/069853CD10_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  "Rouge Hermès Nourishing lip care mask":
    "https://assets.hermes.com/is/image/hermesproduct/60855BV000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // V, ref V60855BV000, $100 (REPLACE generated lipCareMask)
  "Milo L'Aventure bucket hat": bucketHat,
  "Swing dressage breeches": dressageBreeches,
};

// Ready-to-wear — ORIGINAL Hermes photos, hotlinked from assets.hermes.com
// (user instruction 2026-11-09). Audited 2026-11-10, see
// workspace/hermes-audit/readytowear/REPORT.md: every URL returned HTTP 200
// with Referer https://hermesmart.vercel.app/ and its tile was visually confirmed
// to show the correct model-worn garment. Keyed by product id: repeated names
// are separate colourways with different refs.
const RTW_TILE: Record<number, string> = {
  50: "https://assets.hermes.com/is/image/hermesproduct/6H2542D502_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Mid-length buttoned dress
  61: "https://assets.hermes.com/is/image/hermesproduct/6H2521D7DC_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Long sleeveless dress
  89: "https://assets.hermes.com/is/image/hermesproduct/6H0521D502_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Dress with shoulder straps
  90: "https://assets.hermes.com/is/image/hermesproduct/6H0544D502_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Embroidered dress with shoulder straps
  91: "https://assets.hermes.com/is/image/hermesproduct/6H0577DJ02_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “H Kelly” caftan
  92: "https://assets.hermes.com/is/image/hermesproduct/6H2324D14C_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Cashmere short skirt
  93: "https://assets.hermes.com/is/image/hermesproduct/6H1309DT02_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Zipped miniskirt
  94: "https://assets.hermes.com/is/image/hermesproduct/6H0570DB4C_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “Mosaique” pouch dress
  95: "https://assets.hermes.com/is/image/hermesproduct/6H0325DR02_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “L'Enseigne du Sellier” long skirt
  96: "https://assets.hermes.com/is/image/hermesproduct/6H0572DB4C_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “Mosaique” short-sleeve dress
  97: "https://assets.hermes.com/is/image/hermesproduct/6H0542DRLK_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “L'Enseigne du Sellier” caftan
  98: "https://assets.hermes.com/is/image/hermesproduct/6H2805DRDC_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “L'Enseigne du Sellier” caftan tunic
  99: "https://assets.hermes.com/is/image/hermesproduct/6H0570DBDK_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “Mosaique” pouch dress
  100: "https://assets.hermes.com/is/image/hermesproduct/6H0321DEMO_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “A Propos de Bottes” buttoned skirt
  101: "https://assets.hermes.com/is/image/hermesproduct/6H4524DV91_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Sleeveless dress
  102: "https://assets.hermes.com/is/image/hermesproduct/6H2321DBDC_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Straight skirt
  103: "https://assets.hermes.com/is/image/hermesproduct/6H0577DJ91_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “H Kelly” caftan
  104: "https://assets.hermes.com/is/image/hermesproduct/6H0540DT91_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Embroidered short shirt dress
  105: "https://assets.hermes.com/is/image/hermesproduct/6H0570DB02_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “Mosaique” pouch dress
  106: "https://assets.hermes.com/is/image/hermesproduct/6H0333DB02_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Pochon skirt
  107: "https://assets.hermes.com/is/image/hermesproduct/6H0545DH02_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “Soleil de Soie Poudre” classic caftan
  108: "https://assets.hermes.com/is/image/hermesproduct/6H0573DNKL_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “Cahier du Colporteur” classic caftan
  109: "https://assets.hermes.com/is/image/hermesproduct/6H0575DNKL_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “Cahier du Colporteur” shirt dress
  110: "https://assets.hermes.com/is/image/hermesproduct/6H0550DQKL_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Wraparound dress
  111: "https://assets.hermes.com/is/image/hermesproduct/6H4521DCKL_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Long dress
  112: "https://assets.hermes.com/is/image/hermesproduct/6H0530DV90_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Equestrian shirt dress
  113: "https://assets.hermes.com/is/image/hermesproduct/6H0572DB90_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “Mosaique” short-sleeve dress
  114: "https://assets.hermes.com/is/image/hermesproduct/6H0333DB90_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Pochon skirt
  115: "https://assets.hermes.com/is/image/hermesproduct/6H0572DB02_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “Mosaique” short-sleeve dress
  116: "https://assets.hermes.com/is/image/hermesproduct/6H0542DR02_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “L'Enseigne du Sellier” caftan
  117: "https://assets.hermes.com/is/image/hermesproduct/6H0530DV02_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Equestrian shirt dress
  118: "https://assets.hermes.com/is/image/hermesproduct/6H2324D15H_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Cashmere short skirt
  119: "https://assets.hermes.com/is/image/hermesproduct/6H0354DY5H_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Equestrian miniskirt
  120: "https://assets.hermes.com/is/image/hermesproduct/6H2324D1A3_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Cashmere short skirt
  121: "https://assets.hermes.com/is/image/hermesproduct/6H0326D7LK_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Wrap skirt
  122: "https://assets.hermes.com/is/image/hermesproduct/6H4316DFG8_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “Cahier du Colporteur” miniskirt
  123: "https://assets.hermes.com/is/image/hermesproduct/6H4524DVLU_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Sleeveless dress
  124: "https://assets.hermes.com/is/image/hermesproduct/6H0570DB90_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “Mosaique” pouch dress
  125: "https://assets.hermes.com/is/image/hermesproduct/6H0325DRLK_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // “L'Enseigne du Sellier” long skirt
  412: "https://assets.hermes.com/is/image/hermesproduct/800336E%2033_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$", // Swing dressage breeches
  413: "https://assets.hermes.com/is/image/hermesproduct/6E2404D3A3_worn_102?wid=750&hei=1000&fit=fit&$product_default_bg$", // “H” jogging pants
  414: "https://assets.hermes.com/is/image/hermesproduct/6E4515DA90_worn_102?wid=750&hei=1000&fit=fit&$product_default_bg$", // Embroidered pocket dress
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

export function productImageFor(p: { id?: number; price?: number; name: string; category?: string; subcategory?: string; colors?: { name: string }[] }): string {
  // Original Hermes tile for audited ready-to-wear (id-keyed: colourways share names).
  if (p.id !== undefined && RTW_TILE[p.id]) return RTW_TILE[p.id];
  const exact = PRODUCT_IMAGES[p.name];
  if (exact) return exact;
  // One name, several real colourways at different prices — the tile must
  // follow the price, not the name. All refs verified against hermes.com
  // (audit 2026-11-10). "Match sneaker" and "Mind loafer" need no branch:
  // all their rows share one ref, covered by the PRODUCT_IMAGES entry above.
  if (p.name === "Leader sneaker") {
    if (p.price === 1675) return "https://assets.hermes.com/is/image/hermesproduct/261884ZHNH_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$";
    if (p.price === 1600) return "https://assets.hermes.com/is/image/hermesproduct/252864ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$";
    if (p.price === 1525) return "https://assets.hermes.com/is/image/hermesproduct/252863ZHGQ_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$";
  }
  if (p.name === "Loop sneaker") {
    if (p.price === 1525) return "https://assets.hermes.com/is/image/hermesproduct/252853ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$";
    if (p.price === 1750) return "https://assets.hermes.com/is/image/hermesproduct/252857ZH01_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$";
  }
  if (p.name === "Mix mule") {
    // $1,150 rows use the SE-listed Mix ref H27107HZHAB (tile verified as a
    // Mix mule); the US $1,150 colourway ref H261141ZvE5 has no locatable
    // CDN images (see report §5).
    if (p.price === 1150) return "https://assets.hermes.com/is/image/hermesproduct/27107HZHAB_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$";
    if (p.price === 1425) return "https://assets.hermes.com/is/image/hermesproduct/261950ZHME_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$";
  }
  // Repeated name+price rows are separate colourway tiles (as on hermes.com);
  // the product id varies the photo within the type pool so no two tiles in a
  // grid are identical.
  const seed = `${p.name}#${p.id ?? ""}`;
  const n = `${p.name} ${p.subcategory ?? ""}`.toLowerCase();
  const col = (p.colors?.[0]?.name ?? "").toLowerCase();
  if (/twilly/.test(n)) return "https://assets.hermes.com/is/image/hermesproduct/061144S%2005_worn_1?wid=750&hei=1000&fit=fit&$product_default_bg$"; // Original Hermes photo, hotlinked (verified HTTP 200, 2026-11-10).
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
