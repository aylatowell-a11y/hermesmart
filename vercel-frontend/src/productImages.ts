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
  // Original Hermes photo, hotlinked (live extraction 2026-11-10 §B; verified HTTP 200).
  // Le Philateliste du Faubourg scarf 90, ref H004205S 12, $660 — tile is the Flat view.
  "Le Philateliste du Faubourg scarf 90":
    "https://assets.hermes.com/is/image/hermesproduct/004205S%2012_flat_wm_103?$product_default_bg$",
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
  // Original Hermes photo, hotlinked (CDN probe 2026-11-10; front_wm_101 verified HTTP 200).
  // Satin lipstick, Beige Kalahari, ref V60001SV013, $86 — replaces the pooled
  // matteLipstickRoseBoise tile, which showed a red/burgundy bullet (wrong shade).
  "Satin lipstick, Beige Kalahari":
    "https://assets.hermes.com/is/image/hermesproduct/60001SV013_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
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
  // Original Hermes photo, hotlinked (live extraction 2026-11-10 §B; verified HTTP 200).
  // Milo Panorama bucket hat, ref H261010N 0W58, $690 — tile is the Front view.
  "Milo Panorama bucket hat":
    "https://assets.hermes.com/is/image/hermesproduct/261010N%200W_front_wm_102?$product_default_bg$",
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

// New products from the live extraction (compile 2026-11-11): original
// Hermes tile photos, hotlinked from assets.hermes.com (user instruction
// 2026-11-09). Every URL was HEAD-checked (HTTP 200) before wiring.
const NEW_TILE: Record<number, string> = {
  417: "https://assets.hermes.com/is/image/hermesproduct/404113WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  418: "https://assets.hermes.com/is/image/hermesproduct/403964WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  419: "https://assets.hermes.com/is/image/hermesproduct/404111WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  420: "https://assets.hermes.com/is/image/hermesproduct/402993WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  421: "https://assets.hermes.com/is/image/hermesproduct/402991WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  422: "https://assets.hermes.com/is/image/hermesproduct/402992WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  423: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0000751JAG_composite_105&$product_default_bg$",
  424: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0003181JBT_composite_105&$product_default_bg$",
  425: "https://assets.hermes.com/is/image/hermesproduct/403249WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  426: "https://assets.hermes.com/is/image/hermesproduct/403269WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  427: "https://assets.hermes.com/is/image/hermesproduct/404343WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  428: "https://assets.hermes.com/is/image/hermesproduct/404144WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  429: "https://assets.hermes.com/is/image/hermesproduct/404330WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  430: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0000661JN7_composite_105&$product_default_bg$",
  431: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0001091+TT_composite_105&$brac=00007610AJ_composite_105&$product_default_bg$",
  432: "https://assets.hermes.com/is/image/hermesproduct/404091WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  433: "https://assets.hermes.com/is/image/hermesproduct/404086WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  434: "https://assets.hermes.com/is/image/hermesproduct/404104WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  435: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0001091+TT_composite_105&$brac=0000771+BN_composite_105&$product_default_bg$",
  436: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0001091+TT_composite_105&$brac=0000771+93_composite_105&$product_default_bg$",
  437: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0001091+TT_composite_105&$brac=0000771+BD_composite_105&$product_default_bg$",
  438: "https://assets.hermes.com/is/image/hermesproduct/402990WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  442: "https://assets.hermes.com/is/image/hermesproduct/403131WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  443: "https://assets.hermes.com/is/image/hermesproduct/408200WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  444: "https://assets.hermes.com/is/image/hermesproduct/403130WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  446: "https://assets.hermes.com/is/image/hermesproduct/049427WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  448: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0003221J89_composite_105&$product_default_bg$",
  449: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0002051J89_composite_105&$product_default_bg$",
  450: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0003061J89_composite_105&$product_default_bg$",
  451: "https://assets.hermes.com/is/image/hermesproduct/057342WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  452: "https://assets.hermes.com/is/image/hermesproduct/404995WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  453: "https://assets.hermes.com/is/image/hermesproduct/057198WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  454: "https://assets.hermes.com/is/image/hermesproduct/407953WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  455: "https://assets.hermes.com/is/image/hermesproduct/407949WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  456: "https://assets.hermes.com/is/image/hermesproduct/407957WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  457: "https://assets.hermes.com/is/image/hermesproduct/408201WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  459: "https://assets.hermes.com/is/image/hermesproduct/404391WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  460: "https://assets.hermes.com/is/image/hermesproduct/404380WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  461: "https://assets.hermes.com/is/image/hermesproduct/404370WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  462: "https://assets.hermes.com/is/image/hermesproduct/407856WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  463: "https://assets.hermes.com/is/image/hermesproduct/404012WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  464: "https://assets.hermes.com/is/image/hermesproduct/408240WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  465: "https://assets.hermes.com/is/image/hermesproduct/403229WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  466: "https://assets.hermes.com/is/image/hermesproduct/408066WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  469: "https://assets.hermes.com/is/image/hermesproduct/408309WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  470: "https://assets.hermes.com/is/image/hermesproduct/408557WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  471: "https://assets.hermes.com/is/image/hermesproduct/408556WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  472: "https://assets.hermes.com/is/image/hermesproduct/408311WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  473: "https://assets.hermes.com/is/image/hermesproduct/408310WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  474: "https://assets.hermes.com/is/image/hermesproduct/056853WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  475: "https://assets.hermes.com/is/image/hermesproduct/407845WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  476: "https://assets.hermes.com/is/image/hermesproduct/408486WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  477: "https://assets.hermes.com/is/image/hermesproduct/049098WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  478: "https://assets.hermes.com/is/image/hermesproduct/404389WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  479: "https://assets.hermes.com/is/image/hermesproduct/407842WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  480: "https://assets.hermes.com/is/image/hermesproduct/404371WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  481: "https://assets.hermes.com/is/image/hermesproduct/408520WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  482: "https://assets.hermes.com/is/image/hermesproduct/408396WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  483: "https://assets.hermes.com/is/image/hermesproduct/408349WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  484: "https://assets.hermes.com/is/image/hermesproduct/408196WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  485: "https://assets.hermes.com/is/image/hermesproduct/404101WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  486: "https://assets.hermes.com/is/image/hermesproduct/048402WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  487: "https://assets.hermes.com/is/image/hermesproduct/403486WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  488: "https://assets.hermes.com/is/image/hermesproduct/403951WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  489: "https://assets.hermes.com/is/image/hermesproduct/408258WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  490: "https://assets.hermes.com/is/image/hermesproduct/403450WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  491: "https://assets.hermes.com/is/image/hermesproduct/403086WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  492: "https://assets.hermes.com/is/image/hermesproduct/403006WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  493: "https://assets.hermes.com/is/image/hermesproduct/404305WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  494: "https://assets.hermes.com/is/image/hermesproduct/059681WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  495: "https://assets.hermes.com/is/image/hermesproduct/407844WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  496: "https://assets.hermes.com/is/image/hermesproduct/407837WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  497: "https://assets.hermes.com/is/image/hermesproduct/404316WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  498: "https://assets.hermes.com/is/image/hermesproduct/404324WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  501: "https://assets.hermes.com/is/image/hermesproduct/404053WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  502: "https://assets.hermes.com/is/image/hermesproduct/404029WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  504: "https://assets.hermes.com/is/image/hermesproduct/404472WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  508: "https://assets.hermes.com/is/image/hermesproduct/404460WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  510: "https://assets.hermes.com/is/image/hermesproduct/408261WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  511: "https://assets.hermes.com/is/image/hermesproduct/407873WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  512: "https://assets.hermes.com/is/image/hermesproduct/407847WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  513: "https://assets.hermes.com/is/image/hermesproduct/404329WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  514: "https://assets.hermes.com/is/image/hermesproduct/404379WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  515: "https://assets.hermes.com/is/image/hermesproduct/407846WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  516: "https://assets.hermes.com/is/image/hermesproduct/404342WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  517: "https://assets.hermes.com/is/image/hermesproduct/404165WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  520: "https://assets.hermes.com/is/image/hermesproduct/404070WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  521: "https://assets.hermes.com/is/image/hermesproduct/404061WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  522: "https://assets.hermes.com/is/image/hermesproduct/403993WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  523: "https://assets.hermes.com/is/image/hermesproduct/407843WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  524: "https://assets.hermes.com/is/image/hermesproduct/404423WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  525: "https://assets.hermes.com/is/image/hermesproduct/404421WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  526: "https://assets.hermes.com/is/image/hermesproduct/404449WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  527: "https://assets.hermes.com/is/image/hermesproduct/404448WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  528: "https://assets.hermes.com/is/image/hermesproduct/404432WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  529: "https://assets.hermes.com/is/image/hermesproduct/404424WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  530: "https://assets.hermes.com/is/image/hermesproduct/404420WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  531: "https://assets.hermes.com/is/image/hermesproduct/404419WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  532: "https://assets.hermes.com/is/image/hermesproduct/404005WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  533: "https://assets.hermes.com/is/image/hermesproduct/404392WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  534: "https://assets.hermes.com/is/image/hermesproduct/404230WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  535: "https://assets.hermes.com/is/image/hermesproduct/404229WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  536: "https://assets.hermes.com/is/image/hermesproduct/404223WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  537: "https://assets.hermes.com/is/image/hermesproduct/404203WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  538: "https://assets.hermes.com/is/image/hermesproduct/403480WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  539: "https://assets.hermes.com/is/image/hermesproduct/403477WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  540: "https://assets.hermes.com/is/image/hermesproduct/404977WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  542: "https://assets.hermes.com/is/image/hermesproduct/404048WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  543: "https://assets.hermes.com/is/image/hermesproduct/404928WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  544: "https://assets.hermes.com/is/image/hermesproduct/404412WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  545: "https://assets.hermes.com/is/image/hermesproduct/404411WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  546: "https://assets.hermes.com/is/image/hermesproduct/404381WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  547: "https://assets.hermes.com/is/image/hermesproduct/404257WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  548: "https://assets.hermes.com/is/image/hermesproduct/404256WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  549: "https://assets.hermes.com/is/image/hermesproduct/404112WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  552: "https://assets.hermes.com/is/image/hermesproduct/059255WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  553: "https://assets.hermes.com/is/image/hermesproduct/402996WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  554: "https://assets.hermes.com/is/image/hermesproduct/404963WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  555: "https://assets.hermes.com/is/image/hermesproduct/404951WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  556: "https://assets.hermes.com/is/image/hermesproduct/404942WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  557: "https://assets.hermes.com/is/image/hermesproduct/403267WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  558: "https://assets.hermes.com/is/image/hermesproduct/403206WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  560: "https://assets.hermes.com/is/image/hermesproduct/403078WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  562: "https://assets.hermes.com/is/image/hermesproduct/059548WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  569: "https://assets.hermes.com/is/image/hermesproduct/055473WW00_front_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  570: "https://assets.hermes.com/is/image/hermesproduct/055360WW00_front_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  575: "https://assets.hermes.com/is/image/hermesproduct/053606WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  576: "https://assets.hermes.com/is/image/hermesproduct/055926WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  577: "https://assets.hermes.com/is/image/hermesproduct/054184WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  589: "https://assets.hermes.com/is/image/hermesproduct/049572WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  596: "https://assets.hermes.com/is/image/hermesproduct/044287WW00_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  605: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0001091+TT_composite_105&$brac=00030810AL_composite_105&$product_default_bg$",
  606: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0001091+TT_composite_105&$brac=00030810AJ_composite_105&$product_default_bg$",
  607: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0001091+TT_composite_105&$brac=00007610GT_composite_105&$product_default_bg$",
  608: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0004051JQ0_composite_105&$product_default_bg$",
  609: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0004051JN3_composite_105&$product_default_bg$",
  610: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0004051JJ7_composite_105&$product_default_bg$",
  611: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0004051J7U_composite_105&$product_default_bg$",
  612: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0004051J6C_composite_105&$product_default_bg$",
  613: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0003191JBV_composite_105&$product_default_bg$",
  614: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0003191JBT_composite_105&$product_default_bg$",
  615: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0003191JBO_composite_105&$product_default_bg$",
  616: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0003121JBQ_composite_105&$product_default_bg$",
  617: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0002691JBQ_composite_105&$product_default_bg$",
  618: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0002611JBP_composite_105&$product_default_bg$",
  619: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0002611JAL_composite_105&$product_default_bg$",
  620: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0000741JCU_composite_105&$product_default_bg$",
  621: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0000741JBM_composite_105&$product_default_bg$",
  622: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0000741JAN_composite_105&$product_default_bg$",
  623: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0000741JAJ_composite_105&$product_default_bg$",
  624: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0000741JAG_composite_105&$product_default_bg$",
  625: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0000721JAN_composite_105&$product_default_bg$",
  626: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0000671JN7_composite_105&$product_default_bg$",
  627: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0000671J5K_composite_105&$product_default_bg$",
  628: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0000671J37_composite_105&$product_default_bg$",
  629: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0000671J18_composite_105&$product_default_bg$",
  630: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0000601J89_composite_105&$product_default_bg$",
  631: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000961+01_composite_105&$brac=0000601J37_composite_105&$product_default_bg$",
  632: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0007351J01_composite_105&$product_default_bg$",
  633: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0004081JCP_composite_105&$product_default_bg$",
  634: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0004041JJ7_composite_105&$product_default_bg$",
  635: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0004041J18_composite_105&$product_default_bg$",
  636: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0004031JQ0_composite_105&$product_default_bg$",
  637: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0004031JJ7_composite_105&$product_default_bg$",
  638: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0004031J6C_composite_105&$product_default_bg$",
  639: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0004021JJ7_composite_105&$product_default_bg$",
  640: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0004021JB4_composite_105&$product_default_bg$",
  641: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0004021J1A_composite_105&$product_default_bg$",
  642: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0003071J89_composite_105&$product_default_bg$",
  643: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0002591JBP_composite_105&$product_default_bg$",
  644: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0002021JS2_composite_105&$product_default_bg$",
  645: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0002021J1A_composite_105&$product_default_bg$",
  646: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0002011J1A_composite_105&$product_default_bg$",
  647: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0000751JCU_composite_105&$product_default_bg$",
  648: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0000751JBM_composite_105&$product_default_bg$",
  649: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0000751JAN_composite_105&$product_default_bg$",
  650: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0000751JAJ_composite_105&$product_default_bg$",
  651: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0000661J5K_composite_105&$product_default_bg$",
  652: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0000661J4D_composite_105&$product_default_bg$",
  653: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0000661J37_composite_105&$product_default_bg$",
  654: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0000661J18_composite_105&$product_default_bg$",
  655: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0000651J37_composite_105&$product_default_bg$",
  656: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0000651J18_composite_105&$product_default_bg$",
  657: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0000641JN7_composite_105&$product_default_bg$",
  658: "https://assets.hermes.com/is/image/hermesproduct/templateaw-f34?$cad=0000971+01_composite_105&$brac=0000641J37_composite_105&$product_default_bg$",
  659: "https://assets.hermes.com/is/image/hermesproduct/060492WP00_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  660: "https://assets.hermes.com/is/image/hermesproduct/060110WP00_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  661: "https://assets.hermes.com/is/image/hermesproduct/KB0054WK0M_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  662: "https://assets.hermes.com/is/image/hermesproduct/KB0357WK09_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  663: "https://assets.hermes.com/is/image/hermesproduct/KB0100WK37_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  664: "https://assets.hermes.com/is/image/hermesproduct/KB0101WK37_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  665: "https://assets.hermes.com/is/image/hermesproduct/KB0080WK37_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  666: "https://assets.hermes.com/is/image/hermesproduct/KB0035WK37_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  667: "https://assets.hermes.com/is/image/hermesproduct/KB0028WK37_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  668: "https://assets.hermes.com/is/image/hermesproduct/KB0033WKT0_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  669: "https://assets.hermes.com/is/image/hermesproduct/KB0073WK93_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  670: "https://assets.hermes.com/is/image/hermesproduct/KB0073WK18_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  671: "https://assets.hermes.com/is/image/hermesproduct/KB0027WK18_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  672: "https://assets.hermes.com/is/image/hermesproduct/KB0101WK89_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  673: "https://assets.hermes.com/is/image/hermesproduct/KB0100WK89_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  674: "https://assets.hermes.com/is/image/hermesproduct/KB0069WK73_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  675: "https://assets.hermes.com/is/image/hermesproduct/KB0038WK73_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  676: "https://assets.hermes.com/is/image/hermesproduct/KB0075WK34_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  677: "https://assets.hermes.com/is/image/hermesproduct/KB0029WK34_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  678: "https://assets.hermes.com/is/image/hermesproduct/KB0027WK93_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  679: "https://assets.hermes.com/is/image/hermesproduct/KB0016WK89_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  680: "https://assets.hermes.com/is/image/hermesproduct/KB0054WK09_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  681: "https://assets.hermes.com/is/image/hermesproduct/KB0033WK09_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  682: "https://assets.hermes.com/is/image/hermesproduct/060126WS01_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  683: "https://assets.hermes.com/is/image/hermesproduct/058069WS8F_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  684: "https://assets.hermes.com/is/image/hermesproduct/058069WS75_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  685: "https://assets.hermes.com/is/image/hermesproduct/058069WS4W_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  686: "https://assets.hermes.com/is/image/hermesproduct/KB0081WK34_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  687: "https://assets.hermes.com/is/image/hermesproduct/KB0103WK34_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  688: "https://assets.hermes.com/is/image/hermesproduct/KB0101WK01_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  689: "https://assets.hermes.com/is/image/hermesproduct/KB0061WK89_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  690: "https://assets.hermes.com/is/image/hermesproduct/KB0061WK01_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  691: "https://assets.hermes.com/is/image/hermesproduct/KB0079WK93_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  692: "https://assets.hermes.com/is/image/hermesproduct/KB0057WK18_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  693: "https://assets.hermes.com/is/image/hermesproduct/KB0102WK34_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  694: "https://assets.hermes.com/is/image/hermesproduct/KB0098WK93_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  695: "https://assets.hermes.com/is/image/hermesproduct/KB0079WK18_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  696: "https://assets.hermes.com/is/image/hermesproduct/KB0061WK37_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  697: "https://assets.hermes.com/is/image/hermesproduct/KB0060WK89_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  698: "https://assets.hermes.com/is/image/hermesproduct/KB0058WK93_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  699: "https://assets.hermes.com/is/image/hermesproduct/KB0058WK3Q_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  700: "https://assets.hermes.com/is/image/hermesproduct/KB0058WK18_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  701: "https://assets.hermes.com/is/image/hermesproduct/KB0057WK93_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  702: "https://assets.hermes.com/is/image/hermesproduct/KB0057WK3Q_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  703: "https://assets.hermes.com/is/image/hermesproduct/KB0036WK89_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  704: "https://assets.hermes.com/is/image/hermesproduct/KB0036WK34_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  705: "https://assets.hermes.com/is/image/hermesproduct/KB0034WK93_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  706: "https://assets.hermes.com/is/image/hermesproduct/KB0034WK3Q_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  707: "https://assets.hermes.com/is/image/hermesproduct/KB0034WK18_flat_101?extend=300,300,300,300&align=0,0&$product_default_bg$",
  708: "https://assets.hermes.com/is/image/hermesproduct/0000711JGG_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  709: "https://assets.hermes.com/is/image/hermesproduct/0000641J37_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  710: "https://assets.hermes.com/is/image/hermesproduct/0000671J37_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  711: "https://assets.hermes.com/is/image/hermesproduct/0000751JAN_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  712: "https://assets.hermes.com/is/image/hermesproduct/0000651J37_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  713: "https://assets.hermes.com/is/image/hermesproduct/0000651J18_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  714: "https://assets.hermes.com/is/image/hermesproduct/0000601J37_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  715: "https://assets.hermes.com/is/image/hermesproduct/0000661J18_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  716: "https://assets.hermes.com/is/image/hermesproduct/0000661J37_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  717: "https://assets.hermes.com/is/image/hermesproduct/0000751JAG_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  718: "https://assets.hermes.com/is/image/hermesproduct/0000671J18_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  719: "https://assets.hermes.com/is/image/hermesproduct/0000741JCU_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  722: "https://assets.hermes.com/is/image/hermesproduct/0000661J5K_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  723: "https://assets.hermes.com/is/image/hermesproduct/0000641JN7_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  725: "https://assets.hermes.com/is/image/hermesproduct/00007610AJ_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  726: "https://assets.hermes.com/is/image/hermesproduct/0004021JJ7_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  727: "https://assets.hermes.com/is/image/hermesproduct/0004051J7U_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  728: "https://assets.hermes.com/is/image/hermesproduct/0000751JCU_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  729: "https://assets.hermes.com/is/image/hermesproduct/0000751JBM_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  730: "https://assets.hermes.com/is/image/hermesproduct/0000751JAJ_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  731: "https://assets.hermes.com/is/image/hermesproduct/0000741JBM_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  732: "https://assets.hermes.com/is/image/hermesproduct/0000741JAG_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  733: "https://assets.hermes.com/is/image/hermesproduct/0000721JAN_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  734: "https://assets.hermes.com/is/image/hermesproduct/0000631OAJ_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  735: "https://assets.hermes.com/is/image/hermesproduct/0003221J89_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  736: "https://assets.hermes.com/is/image/hermesproduct/0000671J5K_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  737: "https://assets.hermes.com/is/image/hermesproduct/0000661J4D_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  738: "https://assets.hermes.com/is/image/hermesproduct/0000601J89_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  739: "https://assets.hermes.com/is/image/hermesproduct/0002051J89_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  742: "https://assets.hermes.com/is/image/hermesproduct/0003191JBO_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  743: "https://assets.hermes.com/is/image/hermesproduct/0003181JBV_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  744: "https://assets.hermes.com/is/image/hermesproduct/0003181JBT_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  745: "https://assets.hermes.com/is/image/hermesproduct/0000741JAJ_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  746: "https://assets.hermes.com/is/image/hermesproduct/0000671JN7_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  747: "https://assets.hermes.com/is/image/hermesproduct/0002021JS2_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  748: "https://assets.hermes.com/is/image/hermesproduct/0004051J6C_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  749: "https://assets.hermes.com/is/image/hermesproduct/0004031J6C_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  750: "https://assets.hermes.com/is/image/hermesproduct/0004021J1A_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  751: "https://assets.hermes.com/is/image/hermesproduct/0003191JBV_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  752: "https://assets.hermes.com/is/image/hermesproduct/0003191JBT_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  753: "https://assets.hermes.com/is/image/hermesproduct/0000741JAN_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  754: "https://assets.hermes.com/is/image/hermesproduct/0000661JN7_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  755: "https://assets.hermes.com/is/image/hermesproduct/0002021J1A_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  756: "https://assets.hermes.com/is/image/hermesproduct/0004081JCP_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  757: "https://assets.hermes.com/is/image/hermesproduct/0003121JBQ_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  758: "https://assets.hermes.com/is/image/hermesproduct/0007351J01_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  759: "https://assets.hermes.com/is/image/hermesproduct/0002591JBP_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  760: "https://assets.hermes.com/is/image/hermesproduct/0002611JBP_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  761: "https://assets.hermes.com/is/image/hermesproduct/0003071J89_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  762: "https://assets.hermes.com/is/image/hermesproduct/00030810AL_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  763: "https://assets.hermes.com/is/image/hermesproduct/0004051JQ0_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  764: "https://assets.hermes.com/is/image/hermesproduct/0004051JJ7_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  765: "https://assets.hermes.com/is/image/hermesproduct/0004031JJ7_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  766: "https://assets.hermes.com/is/image/hermesproduct/0004041JJ7_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  767: "https://assets.hermes.com/is/image/hermesproduct/0004031JQ0_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  768: "https://assets.hermes.com/is/image/hermesproduct/0004021JB4_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  769: "https://assets.hermes.com/is/image/hermesproduct/00030810AJ_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  770: "https://assets.hermes.com/is/image/hermesproduct/0003061J89_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  771: "https://assets.hermes.com/is/image/hermesproduct/0004051JN3_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  772: "https://assets.hermes.com/is/image/hermesproduct/0002691JBQ_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  773: "https://assets.hermes.com/is/image/hermesproduct/0004041J18_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  774: "https://assets.hermes.com/is/image/hermesproduct/0002611JAL_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  775: "https://assets.hermes.com/is/image/hermesproduct/591371S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  776: "https://assets.hermes.com/is/image/hermesproduct/004323S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  777: "https://assets.hermes.com/is/image/hermesproduct/004368S%2009_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  778: "https://assets.hermes.com/is/image/hermesproduct/984380S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  779: "https://assets.hermes.com/is/image/hermesproduct/984364S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  780: "https://assets.hermes.com/is/image/hermesproduct/361173S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  781: "https://assets.hermes.com/is/image/hermesproduct/064281S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  782: "https://assets.hermes.com/is/image/hermesproduct/064395S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  783: "https://assets.hermes.com/is/image/hermesproduct/743778S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  784: "https://assets.hermes.com/is/image/hermesproduct/894307S%2009_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  785: "https://assets.hermes.com/is/image/hermesproduct/064297S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  786: "https://assets.hermes.com/is/image/hermesproduct/364397S%2022_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  787: "https://assets.hermes.com/is/image/hermesproduct/259171S%2003_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  788: "https://assets.hermes.com/is/image/hermesproduct/361173S%2007_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  789: "https://assets.hermes.com/is/image/hermesproduct/004391S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  790: "https://assets.hermes.com/is/image/hermesproduct/004103S%2004_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  791: "https://assets.hermes.com/is/image/hermesproduct/004368S%2008_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  792: "https://assets.hermes.com/is/image/hermesproduct/904385S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  793: "https://assets.hermes.com/is/image/hermesproduct/983795S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  794: "https://assets.hermes.com/is/image/hermesproduct/244091S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  795: "https://assets.hermes.com/is/image/hermesproduct/362953S%2007_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  796: "https://assets.hermes.com/is/image/hermesproduct/044393S%2009_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  797: "https://assets.hermes.com/is/image/hermesproduct/394402T%2004_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  798: "https://assets.hermes.com/is/image/hermesproduct/244091S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  799: "https://assets.hermes.com/is/image/hermesproduct/244394S%2008_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  800: "https://assets.hermes.com/is/image/hermesproduct/243912S%2004_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  801: "https://assets.hermes.com/is/image/hermesproduct/364052S%2010_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  802: "https://assets.hermes.com/is/image/hermesproduct/441592S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  803: "https://assets.hermes.com/is/image/hermesproduct/244394S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  804: "https://assets.hermes.com/is/image/hermesproduct/243162S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  805: "https://assets.hermes.com/is/image/hermesproduct/784418S%2011_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  806: "https://assets.hermes.com/is/image/hermesproduct/004323S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  807: "https://assets.hermes.com/is/image/hermesproduct/984207S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  808: "https://assets.hermes.com/is/image/hermesproduct/361173S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  809: "https://assets.hermes.com/is/image/hermesproduct/881584S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  810: "https://assets.hermes.com/is/image/hermesproduct/629174S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  811: "https://assets.hermes.com/is/image/hermesproduct/251526S%2004_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  812: "https://assets.hermes.com/is/image/hermesproduct/259172S%2004_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  813: "https://assets.hermes.com/is/image/hermesproduct/394402T%2005_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  814: "https://assets.hermes.com/is/image/hermesproduct/259130S%2019_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  815: "https://assets.hermes.com/is/image/hermesproduct/251526S%2001_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  816: "https://assets.hermes.com/is/image/hermesproduct/364397S%2027_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  817: "https://assets.hermes.com/is/image/hermesproduct/244363S%2012_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  818: "https://assets.hermes.com/is/image/hermesproduct/244091S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  819: "https://assets.hermes.com/is/image/hermesproduct/244362S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  820: "https://assets.hermes.com/is/image/hermesproduct/004366S%2011_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  821: "https://assets.hermes.com/is/image/hermesproduct/004365S%2007_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  822: "https://assets.hermes.com/is/image/hermesproduct/004373S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  823: "https://assets.hermes.com/is/image/hermesproduct/244362S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  824: "https://assets.hermes.com/is/image/hermesproduct/244394S%2013_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  825: "https://assets.hermes.com/is/image/hermesproduct/004297S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  826: "https://assets.hermes.com/is/image/hermesproduct/981173S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  827: "https://assets.hermes.com/is/image/hermesproduct/243162S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  828: "https://assets.hermes.com/is/image/hermesproduct/244273S%2019_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  829: "https://assets.hermes.com/is/image/hermesproduct/242898S%2016_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  830: "https://assets.hermes.com/is/image/hermesproduct/244362S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  831: "https://assets.hermes.com/is/image/hermesproduct/244273S%2008_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  832: "https://assets.hermes.com/is/image/hermesproduct/244328S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  833: "https://assets.hermes.com/is/image/hermesproduct/254039S%2003_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  834: "https://assets.hermes.com/is/image/hermesproduct/259130S%2021_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  835: "https://assets.hermes.com/is/image/hermesproduct/364397S%2020_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  836: "https://assets.hermes.com/is/image/hermesproduct/244328S%2009_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  837: "https://assets.hermes.com/is/image/hermesproduct/259175S%2002_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  838: "https://assets.hermes.com/is/image/hermesproduct/254039S%2002_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  839: "https://assets.hermes.com/is/image/hermesproduct/004373S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  840: "https://assets.hermes.com/is/image/hermesproduct/984327S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  841: "https://assets.hermes.com/is/image/hermesproduct/984380S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  842: "https://assets.hermes.com/is/image/hermesproduct/983795S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  843: "https://assets.hermes.com/is/image/hermesproduct/243162S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  844: "https://assets.hermes.com/is/image/hermesproduct/244091S%2007_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  845: "https://assets.hermes.com/is/image/hermesproduct/244362S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  846: "https://assets.hermes.com/is/image/hermesproduct/004368S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  847: "https://assets.hermes.com/is/image/hermesproduct/004373S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  848: "https://assets.hermes.com/is/image/hermesproduct/004323S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  849: "https://assets.hermes.com/is/image/hermesproduct/601463S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  850: "https://assets.hermes.com/is/image/hermesproduct/604063S%2001_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  851: "https://assets.hermes.com/is/image/hermesproduct/601107S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  852: "https://assets.hermes.com/is/image/hermesproduct/061144S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  853: "https://assets.hermes.com/is/image/hermesproduct/064281S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  854: "https://assets.hermes.com/is/image/hermesproduct/362953S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  855: "https://assets.hermes.com/is/image/hermesproduct/984364S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  856: "https://assets.hermes.com/is/image/hermesproduct/259130S%2022_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  857: "https://assets.hermes.com/is/image/hermesproduct/604073S%2001_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  858: "https://assets.hermes.com/is/image/hermesproduct/603653S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  859: "https://assets.hermes.com/is/image/hermesproduct/259171S%2004_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  860: "https://assets.hermes.com/is/image/hermesproduct/629174S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  861: "https://assets.hermes.com/is/image/hermesproduct/743778S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  862: "https://assets.hermes.com/is/image/hermesproduct/894372S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  863: "https://assets.hermes.com/is/image/hermesproduct/603652S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  864: "https://assets.hermes.com/is/image/hermesproduct/601372S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  865: "https://assets.hermes.com/is/image/hermesproduct/984327S%2008_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  866: "https://assets.hermes.com/is/image/hermesproduct/262494S%20B5_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  867: "https://assets.hermes.com/is/image/hermesproduct/259172S%2003_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  868: "https://assets.hermes.com/is/image/hermesproduct/004391S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  869: "https://assets.hermes.com/is/image/hermesproduct/364397S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  870: "https://assets.hermes.com/is/image/hermesproduct/004373S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  871: "https://assets.hermes.com/is/image/hermesproduct/001356S%2036_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  872: "https://assets.hermes.com/is/image/hermesproduct/262494S%20H7_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  873: "https://assets.hermes.com/is/image/hermesproduct/244177S%2011_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  874: "https://assets.hermes.com/is/image/hermesproduct/901428S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  875: "https://assets.hermes.com/is/image/hermesproduct/262494S%20H2_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  876: "https://assets.hermes.com/is/image/hermesproduct/891071S%2009_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  877: "https://assets.hermes.com/is/image/hermesproduct/043708S%2007_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  878: "https://assets.hermes.com/is/image/hermesproduct/784354S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  879: "https://assets.hermes.com/is/image/hermesproduct/244363S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  880: "https://assets.hermes.com/is/image/hermesproduct/244394S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  881: "https://assets.hermes.com/is/image/hermesproduct/244362S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  882: "https://assets.hermes.com/is/image/hermesproduct/244394S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  883: "https://assets.hermes.com/is/image/hermesproduct/601473S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  884: "https://assets.hermes.com/is/image/hermesproduct/601433S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  885: "https://assets.hermes.com/is/image/hermesproduct/742571S%2008_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  886: "https://assets.hermes.com/is/image/hermesproduct/601973S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  887: "https://assets.hermes.com/is/image/hermesproduct/604053S%2001_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  888: "https://assets.hermes.com/is/image/hermesproduct/362953S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  889: "https://assets.hermes.com/is/image/hermesproduct/394402T%2001_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  890: "https://assets.hermes.com/is/image/hermesproduct/004373S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  891: "https://assets.hermes.com/is/image/hermesproduct/004366S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  892: "https://assets.hermes.com/is/image/hermesproduct/904385S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  893: "https://assets.hermes.com/is/image/hermesproduct/984380S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  894: "https://assets.hermes.com/is/image/hermesproduct/044393S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  895: "https://assets.hermes.com/is/image/hermesproduct/451592S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  896: "https://assets.hermes.com/is/image/hermesproduct/603953S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  897: "https://assets.hermes.com/is/image/hermesproduct/004365S%2008_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  898: "https://assets.hermes.com/is/image/hermesproduct/782898S%2017_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  899: "https://assets.hermes.com/is/image/hermesproduct/242898S%2017_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  900: "https://assets.hermes.com/is/image/hermesproduct/984207S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  901: "https://assets.hermes.com/is/image/hermesproduct/044393S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  902: "https://assets.hermes.com/is/image/hermesproduct/004297S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  903: "https://assets.hermes.com/is/image/hermesproduct/894372S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  904: "https://assets.hermes.com/is/image/hermesproduct/891071S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  905: "https://assets.hermes.com/is/image/hermesproduct/244363S%2018_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  906: "https://assets.hermes.com/is/image/hermesproduct/603963S%2001_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  907: "https://assets.hermes.com/is/image/hermesproduct/983795S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  908: "https://assets.hermes.com/is/image/hermesproduct/891071S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  909: "https://assets.hermes.com/is/image/hermesproduct/894307S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  910: "https://assets.hermes.com/is/image/hermesproduct/629174S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  911: "https://assets.hermes.com/is/image/hermesproduct/984364S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  912: "https://assets.hermes.com/is/image/hermesproduct/064367S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  913: "https://assets.hermes.com/is/image/hermesproduct/981173S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  914: "https://assets.hermes.com/is/image/hermesproduct/601432S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  915: "https://assets.hermes.com/is/image/hermesproduct/601472S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  916: "https://assets.hermes.com/is/image/hermesproduct/891071S%2007_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  917: "https://assets.hermes.com/is/image/hermesproduct/904385S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  918: "https://assets.hermes.com/is/image/hermesproduct/604052S%2001_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  919: "https://assets.hermes.com/is/image/hermesproduct/601104S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  920: "https://assets.hermes.com/is/image/hermesproduct/603982S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  921: "https://assets.hermes.com/is/image/hermesproduct/004366S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  922: "https://assets.hermes.com/is/image/hermesproduct/601972S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  923: "https://assets.hermes.com/is/image/hermesproduct/244363S%2014_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  924: "https://assets.hermes.com/is/image/hermesproduct/004391S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  925: "https://assets.hermes.com/is/image/hermesproduct/004368S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  926: "https://assets.hermes.com/is/image/hermesproduct/004373S%2007_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  927: "https://assets.hermes.com/is/image/hermesproduct/004365S%2009_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  928: "https://assets.hermes.com/is/image/hermesproduct/004323S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  929: "https://assets.hermes.com/is/image/hermesproduct/064367S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  930: "https://assets.hermes.com/is/image/hermesproduct/064297S%2011_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  931: "https://assets.hermes.com/is/image/hermesproduct/019012S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  932: "https://assets.hermes.com/is/image/hermesproduct/601979S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  933: "https://assets.hermes.com/is/image/hermesproduct/604072S%2001_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  934: "https://assets.hermes.com/is/image/hermesproduct/219153S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  935: "https://assets.hermes.com/is/image/hermesproduct/894307S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  936: "https://assets.hermes.com/is/image/hermesproduct/594366S%2010_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  937: "https://assets.hermes.com/is/image/hermesproduct/061144S%2008_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  938: "https://assets.hermes.com/is/image/hermesproduct/603973S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  939: "https://assets.hermes.com/is/image/hermesproduct/219153S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  940: "https://assets.hermes.com/is/image/hermesproduct/004297S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  941: "https://assets.hermes.com/is/image/hermesproduct/004365S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  942: "https://assets.hermes.com/is/image/hermesproduct/064367S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  943: "https://assets.hermes.com/is/image/hermesproduct/064281S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  944: "https://assets.hermes.com/is/image/hermesproduct/851342S%2014_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  945: "https://assets.hermes.com/is/image/hermesproduct/983795S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  946: "https://assets.hermes.com/is/image/hermesproduct/901428S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  947: "https://assets.hermes.com/is/image/hermesproduct/064297S%2008_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  948: "https://assets.hermes.com/is/image/hermesproduct/981173S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  949: "https://assets.hermes.com/is/image/hermesproduct/004366S%2008_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  950: "https://assets.hermes.com/is/image/hermesproduct/064395S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  951: "https://assets.hermes.com/is/image/hermesproduct/004297S%2008_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  952: "https://assets.hermes.com/is/image/hermesproduct/603962S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  953: "https://assets.hermes.com/is/image/hermesproduct/001762S%2034_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  954: "https://assets.hermes.com/is/image/hermesproduct/364397S%2024_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  955: "https://assets.hermes.com/is/image/hermesproduct/063803S%2028_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  956: "https://assets.hermes.com/is/image/hermesproduct/854393S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  957: "https://assets.hermes.com/is/image/hermesproduct/044393S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  958: "https://assets.hermes.com/is/image/hermesproduct/362953S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  959: "https://assets.hermes.com/is/image/hermesproduct/063803S%2032_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  960: "https://assets.hermes.com/is/image/hermesproduct/064395S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  961: "https://assets.hermes.com/is/image/hermesproduct/004297S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  962: "https://assets.hermes.com/is/image/hermesproduct/601462S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  963: "https://assets.hermes.com/is/image/hermesproduct/004365S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  964: "https://assets.hermes.com/is/image/hermesproduct/004103S%2008_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  965: "https://assets.hermes.com/is/image/hermesproduct/901428S%2007_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  966: "https://assets.hermes.com/is/image/hermesproduct/064297S%2010_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  967: "https://assets.hermes.com/is/image/hermesproduct/892588S%2005_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  968: "https://assets.hermes.com/is/image/hermesproduct/064297S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  969: "https://assets.hermes.com/is/image/hermesproduct/854393S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  970: "https://assets.hermes.com/is/image/hermesproduct/244354S%2002_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  971: "https://assets.hermes.com/is/image/hermesproduct/244303S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  972: "https://assets.hermes.com/is/image/hermesproduct/244273S%2017_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  973: "https://assets.hermes.com/is/image/hermesproduct/004310S%2002_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  974: "https://assets.hermes.com/is/image/hermesproduct/064297S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  975: "https://assets.hermes.com/is/image/hermesproduct/004311S%2007_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  976: "https://assets.hermes.com/is/image/hermesproduct/063803S%2027_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  977: "https://assets.hermes.com/is/image/hermesproduct/061144S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  978: "https://assets.hermes.com/is/image/hermesproduct/894372S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  979: "https://assets.hermes.com/is/image/hermesproduct/004103S%2007_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  980: "https://assets.hermes.com/is/image/hermesproduct/063803S%2030_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  981: "https://assets.hermes.com/is/image/hermesproduct/061798S%2005_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  982: "https://assets.hermes.com/is/image/hermesproduct/064395S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  983: "https://assets.hermes.com/is/image/hermesproduct/064281S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  984: "https://assets.hermes.com/is/image/hermesproduct/983908S%2011_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  985: "https://assets.hermes.com/is/image/hermesproduct/064103S%2008_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  986: "https://assets.hermes.com/is/image/hermesproduct/894372S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  987: "https://assets.hermes.com/is/image/hermesproduct/064103S%2010_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  988: "https://assets.hermes.com/is/image/hermesproduct/064281S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  989: "https://assets.hermes.com/is/image/hermesproduct/891526S%2003_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  990: "https://assets.hermes.com/is/image/hermesproduct/063803S%2023_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  991: "https://assets.hermes.com/is/image/hermesproduct/004103S%2006_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  992: "https://assets.hermes.com/is/image/hermesproduct/004310S%2010_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  993: "https://assets.hermes.com/is/image/hermesproduct/244303S%2004_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  994: "https://assets.hermes.com/is/image/hermesproduct/904353S%2002_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  995: "https://assets.hermes.com/is/image/hermesproduct/364355S%2008_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  996: "https://assets.hermes.com/is/image/hermesproduct/983908S%2009_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  997: "https://assets.hermes.com/is/image/hermesproduct/004103S%2010_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  998: "https://assets.hermes.com/is/image/hermesproduct/891526S%2005_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  999: "https://assets.hermes.com/is/image/hermesproduct/894356S%2007_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1000: "https://assets.hermes.com/is/image/hermesproduct/061798S%2004_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1001: "https://assets.hermes.com/is/image/hermesproduct/064103S%2004_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1002: "https://assets.hermes.com/is/image/hermesproduct/983908S%2010_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1003: "https://assets.hermes.com/is/image/hermesproduct/361798S%2003_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1004: "https://assets.hermes.com/is/image/hermesproduct/361798S%2002_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1005: "https://assets.hermes.com/is/image/hermesproduct/411920S%2004_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1006: "https://assets.hermes.com/is/image/hermesproduct/004311S%2002_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1007: "https://assets.hermes.com/is/image/hermesproduct/361798S%2007_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1008: "https://assets.hermes.com/is/image/hermesproduct/004300S%2011_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1009: "https://assets.hermes.com/is/image/hermesproduct/892588S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1010: "https://assets.hermes.com/is/image/hermesproduct/244230S%2007_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1011: "https://assets.hermes.com/is/image/hermesproduct/942494S%2010_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1012: "https://assets.hermes.com/is/image/hermesproduct/001371S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1013: "https://assets.hermes.com/is/image/hermesproduct/984329S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1014: "https://assets.hermes.com/is/image/hermesproduct/892588S%2004_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1015: "https://assets.hermes.com/is/image/hermesproduct/064259S%2005_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1016: "https://assets.hermes.com/is/image/hermesproduct/061798S%2010_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1017: "https://assets.hermes.com/is/image/hermesproduct/001422S%2048_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1018: "https://assets.hermes.com/is/image/hermesproduct/004307S%2009_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1019: "https://assets.hermes.com/is/image/hermesproduct/244354S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1020: "https://assets.hermes.com/is/image/hermesproduct/904353S%2003_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1021: "https://assets.hermes.com/is/image/hermesproduct/004163S%2007_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1022: "https://assets.hermes.com/is/image/hermesproduct/984350S%2005_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1023: "https://assets.hermes.com/is/image/hermesproduct/064289S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1024: "https://assets.hermes.com/is/image/hermesproduct/064103S%2009_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1025: "https://assets.hermes.com/is/image/hermesproduct/894356S%2005_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1026: "https://assets.hermes.com/is/image/hermesproduct/894356S%2008_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1027: "https://assets.hermes.com/is/image/hermesproduct/894358S%2002_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1028: "https://assets.hermes.com/is/image/hermesproduct/361798S%2006_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1029: "https://assets.hermes.com/is/image/hermesproduct/282977S%2004_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1030: "https://assets.hermes.com/is/image/hermesproduct/942494S%2009_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1031: "https://assets.hermes.com/is/image/hermesproduct/232494S%2004_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1032: "https://assets.hermes.com/is/image/hermesproduct/242898S%2015_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1033: "https://assets.hermes.com/is/image/hermesproduct/942494S%2007_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1034: "https://assets.hermes.com/is/image/hermesproduct/161635S%2004_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1035: "https://assets.hermes.com/is/image/hermesproduct/004103S%2002_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1036: "https://assets.hermes.com/is/image/hermesproduct/784283S%2004_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1037: "https://assets.hermes.com/is/image/hermesproduct/904353S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1038: "https://assets.hermes.com/is/image/hermesproduct/894356S%2002_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1039: "https://assets.hermes.com/is/image/hermesproduct/943374S%2002_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1040: "https://assets.hermes.com/is/image/hermesproduct/004299S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1041: "https://assets.hermes.com/is/image/hermesproduct/244230S%2011_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1042: "https://assets.hermes.com/is/image/hermesproduct/063081S%2013_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1043: "https://assets.hermes.com/is/image/hermesproduct/884317S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1044: "https://assets.hermes.com/is/image/hermesproduct/244303S%2008_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1045: "https://assets.hermes.com/is/image/hermesproduct/943374S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1046: "https://assets.hermes.com/is/image/hermesproduct/262494S%20H1_front_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1047: "https://assets.hermes.com/is/image/hermesproduct/902773S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1048: "https://assets.hermes.com/is/image/hermesproduct/064103S%2005_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1049: "https://assets.hermes.com/is/image/hermesproduct/891526S%2004_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1050: "https://assets.hermes.com/is/image/hermesproduct/004237S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1051: "https://assets.hermes.com/is/image/hermesproduct/064315S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1052: "https://assets.hermes.com/is/image/hermesproduct/282977S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1053: "https://assets.hermes.com/is/image/hermesproduct/259160S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1054: "https://assets.hermes.com/is/image/hermesproduct/063419S%2023_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1055: "https://assets.hermes.com/is/image/hermesproduct/004211S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1056: "https://assets.hermes.com/is/image/hermesproduct/064316S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1057: "https://assets.hermes.com/is/image/hermesproduct/004299S%2005_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1058: "https://assets.hermes.com/is/image/hermesproduct/004204S%2007_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1059: "https://assets.hermes.com/is/image/hermesproduct/004192S%2008_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1060: "https://assets.hermes.com/is/image/hermesproduct/001657S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1061: "https://assets.hermes.com/is/image/hermesproduct/001554S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1062: "https://assets.hermes.com/is/image/hermesproduct/241423S%2013_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1063: "https://assets.hermes.com/is/image/hermesproduct/902898S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1064: "https://assets.hermes.com/is/image/hermesproduct/004096S%2012_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1065: "https://assets.hermes.com/is/image/hermesproduct/004096S%2009_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1066: "https://assets.hermes.com/is/image/hermesproduct/392917T%2001_folded_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1067: "https://assets.hermes.com/is/image/hermesproduct/004282S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1068: "https://assets.hermes.com/is/image/hermesproduct/594205S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1069: "https://assets.hermes.com/is/image/hermesproduct/004205S%2009_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1070: "https://assets.hermes.com/is/image/hermesproduct/901617S%2004_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1071: "https://assets.hermes.com/is/image/hermesproduct/004096S%2013_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1072: "https://assets.hermes.com/is/image/hermesproduct/894008S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1073: "https://assets.hermes.com/is/image/hermesproduct/251635S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1074: "https://assets.hermes.com/is/image/hermesproduct/004281S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1075: "https://assets.hermes.com/is/image/hermesproduct/904208S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1076: "https://assets.hermes.com/is/image/hermesproduct/004205S%2012_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1077: "https://assets.hermes.com/is/image/hermesproduct/904207S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1078: "https://assets.hermes.com/is/image/hermesproduct/004211S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1079: "https://assets.hermes.com/is/image/hermesproduct/941167S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1080: "https://assets.hermes.com/is/image/hermesproduct/244175S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1081: "https://assets.hermes.com/is/image/hermesproduct/593373S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1082: "https://assets.hermes.com/is/image/hermesproduct/244175S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1083: "https://assets.hermes.com/is/image/hermesproduct/244175S%2007_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1084: "https://assets.hermes.com/is/image/hermesproduct/902773S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1085: "https://assets.hermes.com/is/image/hermesproduct/244230S%2010_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1086: "https://assets.hermes.com/is/image/hermesproduct/782773S%2001_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1087: "https://assets.hermes.com/is/image/hermesproduct/259159S%2002_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1088: "https://assets.hermes.com/is/image/hermesproduct/259130S%2014_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1089: "https://assets.hermes.com/is/image/hermesproduct/004211S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1090: "https://assets.hermes.com/is/image/hermesproduct/004096S%2007_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1091: "https://assets.hermes.com/is/image/hermesproduct/004204S%2008_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1092: "https://assets.hermes.com/is/image/hermesproduct/392917T%2004_folded_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1093: "https://assets.hermes.com/is/image/hermesproduct/902898S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1094: "https://assets.hermes.com/is/image/hermesproduct/244175S%2009_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1095: "https://assets.hermes.com/is/image/hermesproduct/603893S%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1096: "https://assets.hermes.com/is/image/hermesproduct/243912S%2013_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1097: "https://assets.hermes.com/is/image/hermesproduct/211730S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1098: "https://assets.hermes.com/is/image/hermesproduct/063761S%2022_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1099: "https://assets.hermes.com/is/image/hermesproduct/004391S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1100: "https://assets.hermes.com/is/image/hermesproduct/853081S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1101: "https://assets.hermes.com/is/image/hermesproduct/004366S%2009_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1102: "https://assets.hermes.com/is/image/hermesproduct/854398S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1103: "https://assets.hermes.com/is/image/hermesproduct/161266S%2003_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1104: "https://assets.hermes.com/is/image/hermesproduct/043708S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1105: "https://assets.hermes.com/is/image/hermesproduct/043708S%2009_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1106: "https://assets.hermes.com/is/image/hermesproduct/044393S%2010_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1107: "https://assets.hermes.com/is/image/hermesproduct/782631S%2004_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1108: "https://assets.hermes.com/is/image/hermesproduct/403744T%2006_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1109: "https://assets.hermes.com/is/image/hermesproduct/403744T%2005_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1110: "https://assets.hermes.com/is/image/hermesproduct/394860T%2001_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1111: "https://assets.hermes.com/is/image/hermesproduct/394860T%2002_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1112: "https://assets.hermes.com/is/image/hermesproduct/061144S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1113: "https://assets.hermes.com/is/image/hermesproduct/064281S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1114: "https://assets.hermes.com/is/image/hermesproduct/392770T%2002_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1115: "https://assets.hermes.com/is/image/hermesproduct/392770T%2005_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1116: "https://assets.hermes.com/is/image/hermesproduct/894307S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1117: "https://assets.hermes.com/is/image/hermesproduct/851342S%2013_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1118: "https://assets.hermes.com/is/image/hermesproduct/064395S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1119: "https://assets.hermes.com/is/image/hermesproduct/394852T%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1120: "https://assets.hermes.com/is/image/hermesproduct/043708S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1121: "https://assets.hermes.com/is/image/hermesproduct/004187S%2007_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1122: "https://assets.hermes.com/is/image/hermesproduct/984380S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1123: "https://assets.hermes.com/is/image/hermesproduct/983795S%2007_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1124: "https://assets.hermes.com/is/image/hermesproduct/064395S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1125: "https://assets.hermes.com/is/image/hermesproduct/354414S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1126: "https://assets.hermes.com/is/image/hermesproduct/262494S%20H8_front_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1127: "https://assets.hermes.com/is/image/hermesproduct/259172S%2002_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1128: "https://assets.hermes.com/is/image/hermesproduct/259172S%2001_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1129: "https://assets.hermes.com/is/image/hermesproduct/244328S%2012_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1130: "https://assets.hermes.com/is/image/hermesproduct/201635S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1131: "https://assets.hermes.com/is/image/hermesproduct/364052S%2017_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1132: "https://assets.hermes.com/is/image/hermesproduct/364052S%2015_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1133: "https://assets.hermes.com/is/image/hermesproduct/364052S%2012_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1134: "https://assets.hermes.com/is/image/hermesproduct/364052S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1135: "https://assets.hermes.com/is/image/hermesproduct/354413S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1136: "https://assets.hermes.com/is/image/hermesproduct/354411S%2007_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1137: "https://assets.hermes.com/is/image/hermesproduct/201635S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1138: "https://assets.hermes.com/is/image/hermesproduct/714394S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1139: "https://assets.hermes.com/is/image/hermesproduct/604033S%2001_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1140: "https://assets.hermes.com/is/image/hermesproduct/259175S%2001_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1141: "https://assets.hermes.com/is/image/hermesproduct/262494S%20H9_folded_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1142: "https://assets.hermes.com/is/image/hermesproduct/394402T%2003_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1143: "https://assets.hermes.com/is/image/hermesproduct/881828S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1144: "https://assets.hermes.com/is/image/hermesproduct/782210S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1145: "https://assets.hermes.com/is/image/hermesproduct/781828S%2001_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1146: "https://assets.hermes.com/is/image/hermesproduct/714310S%2001_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1147: "https://assets.hermes.com/is/image/hermesproduct/594149S%2002_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1148: "https://assets.hermes.com/is/image/hermesproduct/394402T%2002_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1149: "https://assets.hermes.com/is/image/hermesproduct/361173S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1150: "https://assets.hermes.com/is/image/hermesproduct/392770T%2003_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1151: "https://assets.hermes.com/is/image/hermesproduct/392770T%2004_folded_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1152: "https://assets.hermes.com/is/image/hermesproduct/004368S%2010_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1153: "https://assets.hermes.com/is/image/hermesproduct/883904S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1154: "https://assets.hermes.com/is/image/hermesproduct/784164S%2010_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1155: "https://assets.hermes.com/is/image/hermesproduct/781698S%2005_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1156: "https://assets.hermes.com/is/image/hermesproduct/773151S%2001_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1157: "https://assets.hermes.com/is/image/hermesproduct/232494S%2012_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1158: "https://assets.hermes.com/is/image/hermesproduct/394852T%2005_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1159: "https://assets.hermes.com/is/image/hermesproduct/711228S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1160: "https://assets.hermes.com/is/image/hermesproduct/394852T%2003_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1161: "https://assets.hermes.com/is/image/hermesproduct/779151S%2001_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1162: "https://assets.hermes.com/is/image/hermesproduct/593802S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1163: "https://assets.hermes.com/is/image/hermesproduct/004284S%2008_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1164: "https://assets.hermes.com/is/image/hermesproduct/062842S%2007_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1165: "https://assets.hermes.com/is/image/hermesproduct/219153S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1166: "https://assets.hermes.com/is/image/hermesproduct/629127S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1167: "https://assets.hermes.com/is/image/hermesproduct/363791S%2024_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1168: "https://assets.hermes.com/is/image/hermesproduct/363791S%2023_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1169: "https://assets.hermes.com/is/image/hermesproduct/062743S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1170: "https://assets.hermes.com/is/image/hermesproduct/064217S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1171: "https://assets.hermes.com/is/image/hermesproduct/062842S%2006_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1172: "https://assets.hermes.com/is/image/hermesproduct/741063S%2011_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1173: "https://assets.hermes.com/is/image/hermesproduct/251635S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1174: "https://assets.hermes.com/is/image/hermesproduct/884317S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1175: "https://assets.hermes.com/is/image/hermesproduct/251635S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1176: "https://assets.hermes.com/is/image/hermesproduct/211730S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1177: "https://assets.hermes.com/is/image/hermesproduct/894008S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1178: "https://assets.hermes.com/is/image/hermesproduct/392917T%2003_folded_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1179: "https://assets.hermes.com/is/image/hermesproduct/903577S%2016_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1180: "https://assets.hermes.com/is/image/hermesproduct/714216S%2001_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1181: "https://assets.hermes.com/is/image/hermesproduct/259156S%2002_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1182: "https://assets.hermes.com/is/image/hermesproduct/594275S%2008_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1183: "https://assets.hermes.com/is/image/hermesproduct/594204S%2003_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1184: "https://assets.hermes.com/is/image/hermesproduct/594009S%2003_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1185: "https://assets.hermes.com/is/image/hermesproduct/244039S%2001_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1186: "https://assets.hermes.com/is/image/hermesproduct/062842S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1187: "https://assets.hermes.com/is/image/hermesproduct/262494S%20G7_folded_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1188: "https://assets.hermes.com/is/image/hermesproduct/894219S%2003_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1189: "https://assets.hermes.com/is/image/hermesproduct/594148S%2001_flat_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1190: "https://assets.hermes.com/is/image/hermesproduct/244193S%2011_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1191: "https://assets.hermes.com/is/image/hermesproduct/244216S%2012_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1192: "https://assets.hermes.com/is/image/hermesproduct/001730S%2025_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1193: "https://assets.hermes.com/is/image/hermesproduct/781698S%2004_worn_101?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1194: "https://assets.hermes.com/is/image/hermesproduct/884148S%2001_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1195: "https://assets.hermes.com/is/image/hermesproduct/591730S%2001_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1196: "https://assets.hermes.com/is/image/hermesproduct/593081S%2002_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1197: "https://assets.hermes.com/is/image/hermesproduct/001364SF45_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1198: "https://assets.hermes.com/is/image/hermesproduct/594008S%2013_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1199: "https://assets.hermes.com/is/image/hermesproduct/591364S%2002_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1200: "https://assets.hermes.com/is/image/hermesproduct/262494S%20A3_folded_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1201: "https://assets.hermes.com/is/image/hermesproduct/262494S%20F2_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1202: "https://assets.hermes.com/is/image/hermesproduct/262494S%20B4_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1203: "https://assets.hermes.com/is/image/hermesproduct/262494S%2099_flat_wm_102?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1204: "https://assets.hermes.com/is/image/hermesproduct/903577S%2017_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1205: "https://assets.hermes.com/is/image/hermesproduct/004211S%2005_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1206: "https://assets.hermes.com/is/image/hermesproduct/062910S%2002_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1207: "https://assets.hermes.com/is/image/hermesproduct/062743S%2012_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
  1208: "https://assets.hermes.com/is/image/hermesproduct/004237S%2004_flat_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$",
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
  if (p.id !== undefined && NEW_TILE[p.id]) return NEW_TILE[p.id];
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
