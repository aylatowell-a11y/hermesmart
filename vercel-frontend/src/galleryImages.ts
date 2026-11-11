// Per-view gallery photography. HARD RULE of this module (the user's exact
// complaint): every gallery view is a DISTINCT photo whose content matches
// its view label — a "Detail" view is an extreme close-up, a "Worn" view
// shows a model wearing/using the piece, "Above" is top-down, "Back" is
// the rear, "Side" is a side profile, "Front"/"Flat" is straight-on.
// The previous gallery reused ONE photo for every view with CSS
// rotate/scale transforms; that is gone — no view ever reuses another
// view's photo, and the product's own tile photo (productImageFor) is not
// used inside the gallery either.
//
// How the photos were made: for each audited product (and each product
// type) a contact sheet was generated in the same studio style — plain
// seamless background correct for the colourway — with one panel per view,
// then cut into one file per view under assets/gallery/. Nothing was
// downloaded or hotlinked from hermes.com — EXCEPT the four men's sandals
// (user instruction 2026-11-09, overrides that rule): their galleries use
// the ORIGINAL Hermes photos hotlinked from assets.hermes.com, because the
// generated type set showed a sneaker for these sandals. Each hotlinked
// URL was verified to load (HTTP 200) and to show the correct product and
// view before it was wired in. The same exception covers the two dresses'
// "Video" views (user instruction 2026-11-10): the Mid-length buttoned
// dress and the Long sleeveless dress play the ORIGINAL Hermes video, not
// the old pan-over-stills. The clips are the original Hermes videos,
// downloaded and hosted on the store itself as MP4s (converted from the
// Hermes HLS stream — the HLS hotlink froze on its poster in the browser,
// so it was replaced 2026-11-10). Each clip's poster frame was visually
// confirmed to show the correct dress.
import bolidePlume45 from "./assets/products/bolide-plume-45.webp";
import kellyVertFront from "./assets/gallery/kelly-belt-vert-front.webp";
import kellyVertWorn from "./assets/gallery/kelly-belt-vert-worn.webp";
import kellyVertFront2 from "./assets/gallery/kelly-belt-vert-front2.webp";
import kellyVertDetail from "./assets/gallery/kelly-belt-vert-detail.webp";
import kellyEtoupeFront from "./assets/gallery/kelly-belt-etoupe-front.webp";
import kellyEtoupeWorn from "./assets/gallery/kelly-belt-etoupe-worn.webp";
import kellyEtoupeFront2 from "./assets/gallery/kelly-belt-etoupe-front2.webp";
import kellyEtoupeDetail from "./assets/gallery/kelly-belt-etoupe-detail.webp";
import bFront from "./assets/gallery/bouncing-front.webp";
import bWorn from "./assets/gallery/bouncing-worn.webp";
import bSide from "./assets/gallery/bouncing-side.webp";
import bBack from "./assets/gallery/bouncing-back.webp";
import bDetail from "./assets/gallery/bouncing-detail.webp";
import bAbove from "./assets/gallery/bouncing-above.webp";
import midFront from "./assets/gallery/mid-dress-front.webp";
import midCloseup from "./assets/gallery/mid-dress-closeup.webp";
import midBack from "./assets/gallery/mid-dress-back.webp";
import midThreeQuarter from "./assets/gallery/mid-dress-threequarter.webp";
import midSide from "./assets/gallery/mid-dress-side.webp";
import midFront2 from "./assets/gallery/mid-dress-front2.webp";
import longFront from "./assets/gallery/long-dress-front.webp";
import longCloseup from "./assets/gallery/long-dress-closeup.webp";
import longBack from "./assets/gallery/long-dress-back.webp";
import longThreeQuarter from "./assets/gallery/long-dress-threequarter.webp";
import longSide from "./assets/gallery/long-dress-side.webp";
import longDetail from "./assets/gallery/long-dress-detail.webp";
import dBlueFront from "./assets/gallery/dress-blue-front.webp";
import dBlueBack from "./assets/gallery/dress-blue-back.webp";
import dBlueSide from "./assets/gallery/dress-blue-side.webp";
import picFront from "./assets/gallery/picotin-front.webp";
import picSide from "./assets/gallery/picotin-side.webp";
import picAbove from "./assets/gallery/picotin-above.webp";
import picBack from "./assets/gallery/picotin-back.webp";
import embFront from "./assets/gallery/embroidered-front.webp";
import embSide from "./assets/gallery/embroidered-side.webp";
import embBack from "./assets/gallery/embroidered-back.webp";
import embDetail from "./assets/gallery/embroidered-detail.webp";
import bagFront from "./assets/gallery/bag-front.webp";
import bagSide from "./assets/gallery/bag-side.webp";
import bagAbove from "./assets/gallery/bag-above.webp";
import bagBack from "./assets/gallery/bag-back.webp";
import bagWorn from "./assets/gallery/bag-worn.webp";
import shoeFront from "./assets/gallery/shoe-front.webp";
import shoeWorn from "./assets/gallery/shoe-worn.webp";
import shoeSide from "./assets/gallery/shoe-side.webp";
import shoeBack from "./assets/gallery/shoe-back.webp";
import shoeDetail from "./assets/gallery/shoe-detail.webp";
import shoeAbove from "./assets/gallery/shoe-above.webp";
import watchFront from "./assets/gallery/watch-front.webp";
import watchSide from "./assets/gallery/watch-side.webp";
import watchDetail from "./assets/gallery/watch-detail.webp";
import watchWorn from "./assets/gallery/watch-worn.webp";
import watchBack from "./assets/gallery/watch-back.webp";
import perfFront from "./assets/gallery/perfume-front.webp";
import perfDetail from "./assets/gallery/perfume-detail.webp";
import perfSide from "./assets/gallery/perfume-side.webp";
import perfBox from "./assets/gallery/perfume-box.webp";
import perfSpray from "./assets/gallery/perfume-spray.webp";
import perfBase from "./assets/gallery/perfume-base.webp";
import jewFront from "./assets/gallery/jewelry-front.webp";
import jewWorn from "./assets/gallery/jewelry-worn.webp";
import jewDetail from "./assets/gallery/jewelry-detail.webp";
import scarfFlat from "./assets/gallery/scarf-flat.webp";
import scarfWorn from "./assets/gallery/scarf-worn.webp";
import scarfDetail from "./assets/gallery/scarf-detail.webp";
import beltFront from "./assets/gallery/belt-front.webp";
import beltWorn from "./assets/gallery/belt-worn.webp";
import beltDetail from "./assets/gallery/belt-detail.webp";
import blanketFlat from "./assets/gallery/blanket-flat.webp";
import blanketFolded from "./assets/gallery/blanket-folded.webp";
import blanketInSitu from "./assets/gallery/blanket-insitu.webp";
import blanketDetail from "./assets/gallery/blanket-detail.webp";
import bucketHat from "./assets/products/media-generation-bucket-hat-0-7948e42f-bff2-45fe-a622-9d13b7feaeaa.webp";
import riderJacket from "./assets/products/rider-jacket.webp";
import rougeLipCareSet from "./assets/products/rouge-lip-care-set.webp";
import brideABracCase from "./assets/products/bride-a-brac-case.webp";

export type GalleryProduct = {
  name: string;
  id?: number;
  price?: number;
  category?: string;
  subcategory?: string;
  colors?: { name: string }[];
};

const V = (label: string, src: string, videoSrc?: string) => ({ label, src, videoSrc });

// Audited products — exact view sets from the verified per-view specs.
// Kelly Pocket 18 belt, Noir — ORIGINAL Hermes photos, hotlinked. Ref
// H081120CK89, Epsom calfskin, $2,150. All 4 views verified (HTTP 200 +
// viewed 2026-11-10): Front = black belt with pocket + silver Kelly clasp;
// Worn = model wearing it; Front = belt + detached pocket; Detail =
// close-up of the silver clasp + HERMÈS engraving. Matches data.ts
// galleryViews ["Front","Worn","Front","Detail"] exactly. Replaces the
// generated kelly-belt-*.webp set (which showed a coiled belt with a gold
// buckle and no pocket — wrong product).
const KELLY_NOIR = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/081120CK89_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$"),
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/081120CK89_worn_102?wid=750&hei=1000&fit=fit&$product_default_bg$"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/081120CK89_front_wm_103?wid=750&hei=1000&fit=fit&$product_default_bg$"),
  V("Detail", "https://assets.hermes.com/is/image/hermesproduct/081120CK89_detail_wm_104?wid=750&hei=1000&fit=fit&$product_default_bg$"),
];
const KELLY_VERT = [V("Front", kellyVertFront), V("Worn", kellyVertWorn), V("Front", kellyVertFront2), V("Detail", kellyVertDetail)];
const KELLY_ETOUPE = [V("Front", kellyEtoupeFront), V("Worn", kellyEtoupeWorn), V("Front", kellyEtoupeFront2), V("Detail", kellyEtoupeDetail)];

const HERMES_IMG = "https://assets.hermes.com/is/image/hermesproduct/";
const HERMES_Q = "?wid=750&hei=1000&fit=fit&$product_default_bg$";
// Bouncing sneaker, Blanc — ORIGINAL Hermes photos, hotlinked (user
// instruction 2026-11-09). Ref H262850ZH90, $1,125. Views: 101 front, 102 worn.
const BOUNCING_BLANC = [
  V("Front", HERMES_IMG + "262850ZH90_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262850ZH90_worn_102" + HERMES_Q),
  V("Side", HERMES_IMG + "262850ZH90_side_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "262850ZH90_back_wm_105" + HERMES_Q),
  V("Detail", HERMES_IMG + "262850ZH90_detail_wm_106" + HERMES_Q),
  V("Above", HERMES_IMG + "262850ZH90_above_wm_107" + HERMES_Q),
];
// Colourways that have their own shot set get exactly their own photos —
// never another colourway's photos mixed in.

// Original Hermes product videos, downloaded and hosted on the store
// itself (user instruction 2026-11-09/10 — use the original video wherever
// the original site has one). The HLS (.m3u8) hotlink was replaced
// 2026-11-10 because the stream never advanced in the browser (frozen
// poster, 0 pixel change over 7s of "playing"): the MP4s below are the
// same original Hermes clips, converted from the HLS stream (highest
// -bandwidth variant, H.264/AAC, no re-encode) and served from the store's
// own origin, so they play natively in every browser without hls.js and
// without a cross-origin fetch. The video is one per product — the same
// clip for both colourways of the Mid-length dress.
// Files live in vercel-frontend/public/videos/ (served at /videos/...).
const MID_DRESS_VIDEO = "/videos/mid-dress.mp4";
const LONG_DRESS_VIDEO = "/videos/long-dress.mp4";

const MID_NOIR = [V("Worn", midFront), V("Video", midFront, MID_DRESS_VIDEO), V("Worn", midCloseup), V("Worn", midBack), V("Worn", midThreeQuarter), V("Worn", midSide), V("Worn", midFront2)];
// The Gorgeous Blue colourway has its own three model-worn photos (front /
// back / side, light beige background); its gallery is exactly those plus
// the video slot, whose poster is the blue front photo.
const MID_BLUE = [V("Worn", dBlueFront), V("Video", dBlueFront, MID_DRESS_VIDEO), V("Worn", dBlueBack), V("Worn", dBlueSide)];

const LONG_SET = [V("Worn", longFront), V("Video", longFront, LONG_DRESS_VIDEO), V("Worn", longCloseup), V("Worn", longBack), V("Worn", longThreeQuarter), V("Worn", longSide), V("Detail", longDetail)];

// Izmir sandal — ORIGINAL Hermes photos, hotlinked from assets.hermes.com
// (user instruction 2026-11-09). Ref H041141ZH01, black calfskin, $950.
// Views verified against the originals: 101 = pair front 3/4, 102 = model
// wearing, 104 = single side profile, 105 = pair back 3/4, 106 = top-down.
const IZMIR_SET = [
  V("Front", HERMES_IMG + "041141ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "041141ZH01_worn_102" + HERMES_Q),
  V("Side", HERMES_IMG + "041141ZH01_front_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "041141ZH01_front_wm_105" + HERMES_Q),
  V("Above", HERMES_IMG + "041141ZH01_front_wm_106" + HERMES_Q),
];

// Chypre sandal — ORIGINAL Hermes photos, hotlinked from assets.hermes.com
// (user instruction 2026-11-09). Ref H222000ZH01, black calfskin, $1,125.
// Views verified: 101 = front, 102 = model wearing (104/105/106 do not exist).
const CHYPRE_SET = [
  V("Front", HERMES_IMG + "222000ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "222000ZH01_worn_102" + HERMES_Q),
];
// Naxos sandal — ORIGINAL Hermes photos, hotlinked from assets.hermes.com
// (user instruction 2026-11-09). Ref H262912ZHC9, beige suede, $1,425.
// Views verified: 101 = front, 103 = model wearing (104/105/106, worn_102 do not exist).
const NAXOS_SET = [
  V("Front", HERMES_IMG + "262912ZHC9_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262912ZHC9_worn_103" + HERMES_Q),
];
// Jackson sandal — ORIGINAL Hermes photos, hotlinked from assets.hermes.com
// (user instruction 2026-11-09). Ref H242948ZHC9, beige/black, $1,500.
// Views verified: 101 = front, 103 = model wearing (104/105/106, worn_102 do not exist).
const JACKSON_SET = [
  V("Front", HERMES_IMG + "242948ZHC9_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "242948ZHC9_worn_103" + HERMES_Q),
];
// Bouncing sneaker $1,275, Blanc — ref H242810ZH90. Views: 101 front,
// 103 worn (worn_102 does NOT exist), 104 side, 105 back, 106 detail,
// 107 above. All six visually confirmed: white Bouncing, black "H" heel.
const SHOE_BOUNCING_1275_BLANC = [
  V("Front", HERMES_IMG + "242810ZH90_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "242810ZH90_worn_103" + HERMES_Q),
  V("Side", HERMES_IMG + "242810ZH90_side_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "242810ZH90_back_wm_105" + HERMES_Q),
  V("Detail", HERMES_IMG + "242810ZH90_detail_wm_106" + HERMES_Q),
  V("Above", HERMES_IMG + "242810ZH90_above_wm_107" + HERMES_Q),
];
// Bouncing sneaker $1,275, Noir — ref H242810ZH02. Views: 101 front,
// 104 side, 105 back, 106 detail, 107 above. NO worn view exists
// (worn_102 and worn_103 both 403). All five visually confirmed: black
// Bouncing, white sole.
const SHOE_BOUNCING_1275_NOIR = [
  V("Front", HERMES_IMG + "242810ZH02_front_wm_101" + HERMES_Q),
  V("Side", HERMES_IMG + "242810ZH02_side_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "242810ZH02_back_wm_105" + HERMES_Q),
  V("Detail", HERMES_IMG + "242810ZH02_detail_wm_106" + HERMES_Q),
  V("Above", HERMES_IMG + "242810ZH02_above_wm_107" + HERMES_Q),
];
// Bouncing sneaker $1,125, Noir — ref H262850ZH01. Replaces the GENERATED
// bouncing-noir webp photos. Views: 101 front, 102 worn, 104 side,
// 105 back, 106 detail, 107 above. All six visually confirmed: all-black
// technical-mesh Bouncing, black sole.
const SHOE_BOUNCING_1125_NOIR = [
  V("Front", HERMES_IMG + "262850ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262850ZH01_worn_102" + HERMES_Q),
  V("Side", HERMES_IMG + "262850ZH01_side_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "262850ZH01_back_wm_105" + HERMES_Q),
  V("Detail", HERMES_IMG + "262850ZH01_detail_wm_106" + HERMES_Q),
  V("Above", HERMES_IMG + "262850ZH01_above_wm_107" + HERMES_Q),
];

// Bouncing sneaker — ORIGINAL Hermes photos, hotlinked (user instruction
// 2026-11-09). Ref H252782ZHF7, $1,275. Views: 101 front, 102 worn.
const BOUNCING_SET = [
  V("Front", HERMES_IMG + "252782ZHF7_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "252782ZHF7_worn_102" + HERMES_Q),
  V("Side", HERMES_IMG + "252782ZHF7_side_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "252782ZHF7_back_wm_105" + HERMES_Q),
  V("Detail", HERMES_IMG + "252782ZHF7_detail_wm_106" + HERMES_Q),
  V("Above", HERMES_IMG + "252782ZHF7_above_wm_107" + HERMES_Q),
];
// Jet sneaker — ref H261807ZHAF, $1,300. Views: 101 front, 102 worn.
const JET_SET = [
  V("Front", HERMES_IMG + "261807ZHAF_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "261807ZHAF_worn_102" + HERMES_Q),
  V("Side", HERMES_IMG + "261807ZHAF_side_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "261807ZHAF_back_wm_105" + HERMES_Q),
  V("Detail", HERMES_IMG + "261807ZHAF_detail_wm_106" + HERMES_Q),
  V("Above", HERMES_IMG + "261807ZHAF_above_wm_107" + HERMES_Q),
];
// Neon sneaker — ref H262898ZH01, $1,350. Views: 101 front, 102 worn.
const NEON_SET = [
  V("Front", HERMES_IMG + "262898ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262898ZH01_worn_102" + HERMES_Q),
];
// Next sneaker — ref H262891ZH01, $1,450. Views: 101 front, 102 worn.
const NEXT_SET = [
  V("Front", HERMES_IMG + "262891ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262891ZH01_worn_102" + HERMES_Q),
];
// Nobu sneaker — ref H262888ZH01, $1,400. Views: 101 front, 102 worn.
const NOBU_SET = [
  V("Front", HERMES_IMG + "262888ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262888ZH01_worn_102" + HERMES_Q),
];
// Master sneaker — ref H261881ZHD8, $1,275. Views: 101 front, 102 worn.
const MASTER_SET = [
  V("Front", HERMES_IMG + "261881ZHD8_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "261881ZHD8_worn_102" + HERMES_Q),
];
// Day sneaker — ref H252883ZH90, $1,675. Views: 101 front, 102 worn.
const DAY_SET = [
  V("Front", HERMES_IMG + "252883ZH90_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "252883ZH90_worn_102" + HERMES_Q),
];
// Match sneaker — ref H261863ZH01, $1,250 ($1,150 row uses the same set;
// its own colourway ref was not found, price confirmed via US listing).
// Views: 101 front, 102 worn, 104 side, 105 back, 106 detail, 107 above
// (CDN probe 2026-11-10; front_wm_1 and worn_2 are near-duplicates — not wired).
const MATCH_SET = [
  V("Front", HERMES_IMG + "261863ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "261863ZH01_worn_102" + HERMES_Q),
  V("Side", HERMES_IMG + "261863ZH01_side_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "261863ZH01_back_wm_105" + HERMES_Q),
  V("Detail", HERMES_IMG + "261863ZH01_detail_wm_106" + HERMES_Q),
  V("Above", HERMES_IMG + "261863ZH01_above_wm_107" + HERMES_Q),
];
// Kid sneaker — ref H251929ZH01, $1,150. Views: 101 front, 102 worn.
const KID_SET = [
  V("Front", HERMES_IMG + "251929ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "251929ZH01_worn_102" + HERMES_Q),
];
// Leader sneaker $1,675 — ref H261884ZHNH. Views: 101 front, 102 worn.
const LEADER_1675_SET = [
  V("Front", HERMES_IMG + "261884ZHNH_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "261884ZHNH_worn_102" + HERMES_Q),
];
// Leader sneaker $1,600 — ref H252864ZH01. Views: 101 front, 102 worn, 103 worn.
const LEADER_1600_SET = [
  V("Front", HERMES_IMG + "252864ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "252864ZH01_worn_102" + HERMES_Q),
  V("Worn", HERMES_IMG + "252864ZH01_worn_103" + HERMES_Q),
];
// Leader sneaker $1,525 — ref H252863ZHGQ. Views: 101 front, 102 worn.
const LEADER_1525_SET = [
  V("Front", HERMES_IMG + "252863ZHGQ_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "252863ZHGQ_worn_102" + HERMES_Q),
];
// Lucky slip-on sneaker — ref H252896ZHC9, $1,100. Views: 101 front, 102 worn.
const LUCKY_SET = [
  V("Front", HERMES_IMG + "252896ZHC9_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "252896ZHC9_worn_102" + HERMES_Q),
];
// Loop sneaker $1,525 — ref H252853ZH01. Views: 101 front, 102 worn, 103 worn.
const LOOP_1525_SET = [
  V("Front", HERMES_IMG + "252853ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "252853ZH01_worn_102" + HERMES_Q),
  V("Worn", HERMES_IMG + "252853ZH01_worn_103" + HERMES_Q),
];
// Loop sneaker $1,750 — ref H252857ZH01. Views: 101 front, 102 worn.
const LOOP_1750_SET = [
  V("Front", HERMES_IMG + "252857ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "252857ZH01_worn_102" + HERMES_Q),
];
// Quicker sneaker — ref H102190ZH09, $1,175. Views: 101 front, 102 worn,
// 104 side (single), 105 back (pair), 106 above (top-down), 107 side
// (pair, second side angle). All six verified visually.
const QUICKER_SET = [
  V("Front", HERMES_IMG + "102190ZH09_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "102190ZH09_worn_102" + HERMES_Q),
  V("Side", HERMES_IMG + "102190ZH09_front_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "102190ZH09_front_wm_105" + HERMES_Q),
  V("Above", HERMES_IMG + "102190ZH09_front_wm_106" + HERMES_Q),
  V("Side", HERMES_IMG + "102190ZH09_front_wm_107" + HERMES_Q),
];
// Nine ankle boot — ref H262820ZHNL, $1,450. Views: 101 front, 102 worn.
const NINE_SET = [
  V("Front", HERMES_IMG + "262820ZHNL_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262820ZHNL_worn_102" + HERMES_Q),
  V("Side", HERMES_IMG + "262820ZHNL_side_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "262820ZHNL_back_wm_105" + HERMES_Q),
];
// Nathan ankle boot — ref H262901ZH01 (BE-listed), $1,600. Views: 101, 102 worn.
const NATHAN_SET = [
  V("Front", HERMES_IMG + "262901ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262901ZH01_worn_102" + HERMES_Q),
];
// Mateo ankle boot — ref H261972ZH01 (CA-listed), $1,825. Views: 101, 102 worn.
const MATEO_SET = [
  V("Front", HERMES_IMG + "261972ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "261972ZH01_worn_102" + HERMES_Q),
];
// Jeff ankle boot — sibling colourway ref H242946ZH01 ($2,500) — the exact
// $2,425 ref H252122Zv02 has no locatable CDN images (see report §5).
// Views: 101 front, 102 worn.
const JEFF_SET = [
  V("Front", HERMES_IMG + "242946ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "242946ZH01_worn_102" + HERMES_Q),
];
// Noe loafer — ref H262834ZAAC, $1,175. Views: 101 front, 102 worn.
const NOE_SET = [
  V("Front", HERMES_IMG + "262834ZAAC_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262834ZAAC_worn_102" + HERMES_Q),
  V("Side", HERMES_IMG + "262834ZAAC_side_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "262834ZAAC_back_wm_105" + HERMES_Q),
];
// Newton loafer — ref H262941ZAGN, $1,400. Views: 101 front, 102 worn.
const NEWTON_SET = [
  V("Front", HERMES_IMG + "262941ZAGN_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262941ZAGN_worn_102" + HERMES_Q),
];
// Honore loafer — ref H232903ZANP, US $1,650 (store $1,600 — mismatch, §5).
// Views: 101 front, 102 worn.
const HONORE_SET = [
  V("Front", HERMES_IMG + "232903ZANP_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "232903ZANP_worn_102" + HERMES_Q),
];
// Mind loafer — ref H261937ZAC9, $1,600 (also used for the $1,675 row, whose
// own colourway ref was not found). Views: 101 front, 102 worn, 104 side,
// 105 back (CDN probe 2026-11-10; front_wm_1 and worn_2 are near-duplicates
// — not wired).
const MIND_SET = [
  V("Front", HERMES_IMG + "261937ZAC9_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "261937ZAC9_worn_102" + HERMES_Q),
  V("Side", HERMES_IMG + "261937ZAC9_side_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "261937ZAC9_back_wm_105" + HERMES_Q),
];
// Paris loafer — ref H172368ZA02, $1,450. Views: 101 front, 102 worn.
const PARIS_SET = [
  V("Front", HERMES_IMG + "172368ZA02_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "172368ZA02_worn_102" + HERMES_Q),
];
// Member loafer — ref H261947ZAC9, $1,150. Views: 101 front, 103 worn.
const MEMBER_SET = [
  V("Front", HERMES_IMG + "261947ZAC9_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "261947ZAC9_worn_103" + HERMES_Q),
];
// Nicolas loafer — ref H262948ZA01, $1,450. Views: 101 front, 102 worn.
const NICOLAS_SET = [
  V("Front", HERMES_IMG + "262948ZA01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262948ZA01_worn_102" + HERMES_Q),
];
// Nod loafer — ref H262939ZAC9 (inferred $1,350 colourway; fringe loafer
// visually confirmed as Nod). Views: 101 front, 102 worn.
const NOD_SET = [
  V("Front", HERMES_IMG + "262939ZAC9_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262939ZAC9_worn_102" + HERMES_Q),
];
// Low loafer — ref H252964ZAC9 (UK/CA/MO-listed), $1,325 (US price
// unconfirmed). Views: 101 front, 102 worn, 103 worn.
const LOW_SET = [
  V("Front", HERMES_IMG + "252964ZAC9_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "252964ZAC9_worn_102" + HERMES_Q),
  V("Worn", HERMES_IMG + "252964ZAC9_worn_103" + HERMES_Q),
];
// Noon mule — sibling colourway ref H262865ZHME (brown suede); the exact US
// ref H262002ZvC9 has no locatable CDN images (see §5). Views: 101 front,
// 102 worn, 104 side, 105 back (CDN probe 2026-11-10; front_wm_1 and worn_2
// are near-duplicates — not wired).
const NOON_SET = [
  V("Front", HERMES_IMG + "262865ZHME_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262865ZHME_worn_102" + HERMES_Q),
  V("Side", HERMES_IMG + "262865ZHME_side_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "262865ZHME_back_wm_105" + HERMES_Q),
];
// Mix mule $1,150 — ref H27107HZHAB (SE-listed). Views: 101 front, 104 side,
// 105 back (CDN probe 2026-11-10 — corrects the earlier "only 101 exists"
// note: no WORN view exists on the CDN). Do not add a worn view from the
// $1,425 Mix — it is a different (shearling) colourway.
const MIX_1150_SET = [
  V("Front", HERMES_IMG + "27107HZHAB_front_wm_101" + HERMES_Q),
  V("Side", HERMES_IMG + "27107HZHAB_side_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "27107HZHAB_back_wm_105" + HERMES_Q),
];
// Mix mule $1,425 — ref H261950ZHME. Views: 101 front, 102 worn, 104 side,
// 105 back, worn_2 second worn shot (CDN probe 2026-11-10; worn_2 is a
// different seated shot, not a duplicate of worn_102; front_wm_1 is).
const MIX_1425_SET = [
  V("Front", HERMES_IMG + "261950ZHME_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "261950ZHME_worn_102" + HERMES_Q),
  V("Side", HERMES_IMG + "261950ZHME_side_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "261950ZHME_back_wm_105" + HERMES_Q),
  V("Worn", HERMES_IMG + "261950ZHME_worn_2" + HERMES_Q),
];
// Nick mule — ref H262937ZAC9, $1,375. Views: 101 front, 103 worn.
const NICK_SET = [
  V("Front", HERMES_IMG + "262937ZAC9_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262937ZAC9_worn_103" + HERMES_Q),
];
// Nils derby shoe — ref H262945ZH01, $1,525. Views: 101 front, 102 worn.
const NILS_SET = [
  V("Front", HERMES_IMG + "262945ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262945ZH01_worn_102" + HERMES_Q),
];
// Now derby shoe — ref H262933ZHME (IE/UK/CA/MO-listed), $1,825.
// Views: 101 front, 102 worn.
const NOW_SET = [
  V("Front", HERMES_IMG + "262933ZHME_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "262933ZHME_worn_102" + HERMES_Q),
];
// Keneth derby shoe — ref H251971ZH01, $1,825. Views: 101 front, 102 worn.
const KENETH_SET = [
  V("Front", HERMES_IMG + "251971ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "251971ZH01_worn_102" + HERMES_Q),
];
// Moreno derby shoe — ref H261974ZH01 (HK-listed), $1,375. Views: 101, 102 worn.
const MORENO_SET = [
  V("Front", HERMES_IMG + "261974ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "261974ZH01_worn_102" + HERMES_Q),
];
// Lawrence derby shoe — ref H252998ZH01, $1,675. Views: 101 front, 102 worn.
const LAWRENCE_SET = [
  V("Front", HERMES_IMG + "252998ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "252998ZH01_worn_102" + HERMES_Q),
];
// Middle derby shoe — ref H261978ZHME, $1,450. Views: 101 front, 102 worn.
const MIDDLE_SET = [
  V("Front", HERMES_IMG + "261978ZHME_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "261978ZHME_worn_102" + HERMES_Q),
];
// Lead derby shoe — ref H252975ZH01, $1,750. Views: 101 front, 102 worn.
const LEAD_SET = [
  V("Front", HERMES_IMG + "252975ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "252975ZH01_worn_102" + HERMES_Q),
];
// May derby shoe — ref H261956ZH01, $1,375. Views: 101 front, 102 worn.
// (Verified: the May derby really is this sleek Nappa lace-up with ecru
// laces — it looks sneaker-like, and that is what hermes.com sells.)
const MAY_SET = [
  V("Front", HERMES_IMG + "261956ZH01_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "261956ZH01_worn_102" + HERMES_Q),
];

// Bags — ORIGINAL Hermes photos, hotlinked from assets.hermes.com (user
// instruction 2026-11-09). Every URL returned HTTP 200 with Referer
// https://hermesmart.vercel.app/ and was visually confirmed (REPORT §5).
// A view listed here exists; views that 403'd are omitted, so most bags
// have a 1–2 view gallery — that is correct, do not pad with generated views.
const PICOTIN_POCKET_SET = [
  V("Front", HERMES_IMG + "083189CCBQ_front_wm_101" + HERMES_Q),
];
const LE_PETIT_SAC_SET = [
  V("Front", HERMES_IMG + "087967CC28_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "087967CC28_worn_102" + HERMES_Q),
];
const DOUBLE_LONGE_SET = [
  V("Front", HERMES_IMG + "087953CCAC_front_wm_101" + HERMES_Q),
];
const TABLIER_SET = [
  V("Front", HERMES_IMG + "086583CKAA_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "086583CKAA_worn_102" + HERMES_Q),
];
const BOLIDE_1923_MINI_SET = [
  V("Front", HERMES_IMG + "075180CK18_front_wm_101" + HERMES_Q),
];
const VIDEPOCHES_SET = [
  V("Front", HERMES_IMG + "087901CKAE_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "087901CKAE_worn_102" + HERMES_Q),
];
const NEO_DOUBLE_SENS_SET = [
  V("Front", HERMES_IMG + "089099CAAD_front_wm_101" + HERMES_Q),
];
// Kelly Messenger bag, Noir — ORIGINAL Hermes photos, hotlinked. Ref
// H085671CK89, PM Togo calfskin, $14,700 InStock on hermes.com US
// ("Kelly Messenger PM bag - Black"). Front: black Kelly Messenger,
// flap + turnlock + strap. Worn: man carrying the black bag.
const BAGS_KELLY_MESSENGER_NOIR = [
  V("Front", HERMES_IMG + "085671CK89_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "085671CK89_worn_102" + HERMES_Q),
];
// Kelly Messenger bag, Etoupe — ORIGINAL Hermes photos, hotlinked. Ref
// H085671CK18, PM Togo calfskin. Front: grey-taupe Kelly Messenger,
// palladium turnlock. Worn: same male model/pose as Noir, dark grey-taupe.
const BAGS_KELLY_MESSENGER_ETOUPE = [
  V("Front", HERMES_IMG + "085671CK18_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "085671CK18_worn_102" + HERMES_Q),
];
// Bolide 1923 mini bag, Jaune Citron — ORIGINAL Hermes photos, hotlinked.
// Ref H075180CK9O, Evercolor calfskin, $7,300. Front: bright yellow dome
// mini, gold hardware. Detail: close-up of yellow zip and handle. Side:
// side/profile angle of the yellow dome. (Resale listings quote "9N" but
// the CDN proves 9O — H075180CK9N is 403.)
const BAGS_BOLIDE_1923_MINI_JAUNE_CITRON = [
  V("Front", HERMES_IMG + "075180CK9O_front_wm_101" + HERMES_Q),
  V("Detail", HERMES_IMG + "075180CK9O_front_wm_104" + HERMES_Q),
  V("Side", HERMES_IMG + "075180CK9O_front_wm_105" + HERMES_Q),
];
// Kelly 18 belt, Blanc Craie — ORIGINAL Hermes photos, hotlinked. Ref
// H069853CD10, Epsom calfskin, rose-gold Kelly buckle. Front: off-white /
// cream belt coiled, rose-gold buckle, tan reverse visible. Worn: woman
// in navy wearing the cream belt.
const BAGS_KELLY_18_BELT = [
  V("Front", HERMES_IMG + "069853CD10_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "069853CD10_worn_102" + HERMES_Q),
];
const NEO_GARDEN_BREDIES_SET = [
  V("Front", HERMES_IMG + "087934CKAB_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "087934CKAB_worn_102" + HERMES_Q),
];
const MEDOR_SET = [
  V("Front", HERMES_IMG + "085055CKAT_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "085055CKAT_worn_102" + HERMES_Q),
];
const ARCON_SLIM_SET = [
  V("Front", HERMES_IMG + "087032CKAB_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "087032CKAB_worn_102" + HERMES_Q),
];
const TWENTYFOUR_SET = [
  V("Front", HERMES_IMG + "082141CCAJ_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "082141CCAJ_worn_102" + HERMES_Q),
];
const GETA_SET = [
  V("Front", HERMES_IMG + "085408CKAB_front_wm_101" + HERMES_Q),
];
const NEO_GARDEN_41_SET = [
  V("Front", HERMES_IMG + "086934CKAB_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "086934CKAB_worn_102" + HERMES_Q),
];
const MESSENGER_ATTELAGE_SET = [
  V("Front", HERMES_IMG + "084111CK89_front_wm_101" + HERMES_Q),
  V("Detail", HERMES_IMG + "084111CK89_front_wm_104" + HERMES_Q),
  V("Back", HERMES_IMG + "084111CK89_front_wm_105" + HERMES_Q),
];
const BESACE_SET = [
  V("Front", HERMES_IMG + "087913CC89_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "087913CC89_worn_102" + HERMES_Q),
  V("Worn", HERMES_IMG + "087913CC89_worn_103" + HERMES_Q),
];
const CLIQUETIS_SET = [
  V("Front", HERMES_IMG + "086913CK89_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "086913CK89_worn_102" + HERMES_Q),
];
const JYPSIERE_MINI_SET = [
  V("Front", HERMES_IMG + "083982CKAY_front_wm_101" + HERMES_Q),
];
const MALLETTE_SET = [
  V("Front", HERMES_IMG + "087960CT89_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "087960CT89_worn_102" + HERMES_Q),
  V("Worn", HERMES_IMG + "087960CT89_worn_103" + HERMES_Q),
];
const JIGE_SET = [
  V("Front", HERMES_IMG + "083286CACD_front_wm_101" + HERMES_Q),
];
// Lassoie: Worn view (087076CKAB_worn_102) probed 200 but NOT yet visually
// confirmed — Front only until that check is done (REPORT §4.7).
const LASSOIE_SET = [
  V("Front", HERMES_IMG + "087076CKAB_front_wm_101" + HERMES_Q),
];
const ITL_PLUSH_SET = [
  V("Front", HERMES_IMG + "084987CKAB_front_wm_101" + HERMES_Q),
];
const ETRIVIERE_SET = [
  V("Front", HERMES_IMG + "088128CKAA_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "088128CKAA_worn_102" + HERMES_Q),
  V("Worn", HERMES_IMG + "088128CKAA_worn_103" + HERMES_Q),
];
const ROULIS_MINI_SET = [
  V("Front", HERMES_IMG + "070510CP1C_front_wm_101" + HERMES_Q),
];
const LINDY_26_SET = [
  V("Front", HERMES_IMG + "073430CP2D_front_wm_101" + HERMES_Q),
];
const SILKYCITY_SET = [
  V("Front", HERMES_IMG + "085933CKAB_front_wm_101" + HERMES_Q),
];
const ITL_18_SET = [
  V("Front", HERMES_IMG + "084274CCY1_front_wm_101" + HERMES_Q),
];
const DELLA_SET = [
  V("Front", HERMES_IMG + "089063CK37_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "089063CK37_worn_102" + HERMES_Q),
];
const GETA_SLIM_SET = [
  V("Front", HERMES_IMG + "086984CKAW_front_wm_101" + HERMES_Q),
];
const MINI_MEDOR_SET = [
  V("Front", HERMES_IMG + "085003CKY1_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "085003CKY1_worn_102" + HERMES_Q),
];
const PTIT_ARCON_SET = [
  V("Front", HERMES_IMG + "085871CKAE_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "085871CKAE_worn_102" + HERMES_Q),
  V("Worn", HERMES_IMG + "085871CKAE_worn_103" + HERMES_Q),
];
const HALZAN_25_SET = [
  V("Front", HERMES_IMG + "082027CKY1_front_wm_101" + HERMES_Q),
];

// Jewelry & watches audit 2026-11-10 — ORIGINAL Hermes photos, hotlinked
// from assets.hermes.com. Every URL below returned HTTP 200 with
// Referer https://hermesmart.vercel.app/. "V" = tile visually confirmed.
const CONTOUR_BRACELET_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-contour-bracelet--123405B%2000-front-wm-2-0-0-1000-1000_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-contour-bracelet--123405B%2000-front-wm-4-0-0-1000-1000_g.jpg"),
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-contour-bracelet--123405B%2000-worn-3-300-0-800-800_g.jpg"),
];
const CLICCLAC_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/clic-clac-h-bracelet--300001FO31-front-wm-1-0-0-1000-1000_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/clic-clac-h-bracelet--300001FO31-front-wm-4-0-0-1000-1000_g.jpg"),
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/clic-clac-h-bracelet--300001FO31-worn-3-300-0-800-800_g.jpg"),
];
const THALASSA_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/mini-thalassa-bracelet--500522FC37-front-wm-2-0-0-1000-1000_g.jpg"),
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/mini-thalassa-bracelet--500522FC37-worn-3-300-0-800-800_g.jpg"),
];
const KELLY_CHAINE_BRACELET_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/kelly-chaine-bracelet-small-model--218471B%2000-front-wm-2-0-0-1000-1000_g.jpg"),
];
const KELLY_GOURMETTE_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/kelly-gourmette-bracelet-very-small-model--221410B%2000-front-wm-1-0-0-1000-1000_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/kelly-gourmette-bracelet-very-small-model--221410B%2000-front-wm-3-0-0-1000-1000_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/kelly-gourmette-bracelet-very-small-model--221410B%2000-front-wm-5-0-0-1000-1000_g.jpg"),
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/kelly-gourmette-bracelet-very-small-model--221410B%2000-worn-3-300-0-800-800_g.jpg"),
];
const VERTIGE_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/vertige-bracelet--221207B%2000-front-wm-2-0-0-1000-1000_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/vertige-bracelet--221207B%2000-front-wm-4-0-0-1000-1000_g.jpg"),
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/vertige-bracelet--221207B%2000-worn-3-300-0-800-800_g.jpg"),
];
const CHAOS_NANO_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-chaos-nano-bracelet--225411B%2000-front-wm-1-0-0-1000-1000_g.jpg"),
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-chaos-nano-bracelet--225411B%2000-worn-3-300-0-800-800_g.jpg"),
];
const BOUCLE_SELLIER_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/boucle-sellier-on-the-rocks-bracelet-small-model--224402B%2000-front-wm-2-0-0-1000-1000_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/boucle-sellier-on-the-rocks-bracelet-small-model--224402B%2000-front-wm-4-0-0-1000-1000_g.jpg"),
];
const VERSO_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-verso-bracelet--125408B%2000-front-wm-2-0-0-1000-1000_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-verso-bracelet--125408B%2000-front-wm-4-0-0-1000-1000_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-verso-bracelet--125408B%2000-front-wm-5-0-0-1000-1000_g.jpg"),
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-verso-bracelet--125408B%2000-worn-3-300-0-800-800_g.jpg"),
];
const CLOU_FORGE_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/clou-de-forge-bracelet--125405B%2000-front-wm-2-0-0-1000-1000_g.jpg"),
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/clou-de-forge-bracelet--125405B%2000-worn-3-300-0-800-800_g.jpg"),
];
const PLANETES_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/223413B%2000_front_wm_101?wid=750&hei=1000&fit=fit&$product_default_bg$"),
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/planetes-and-meteores-bracelet--223413B%2000-worn-1-300-0-800-800_g.jpg"),
];
const FARANDOLE_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/farandole-bracelet--221413B%2000-front-wm-2-0-0-1000-1000_g.jpg"),
];
const AMULETTES_KELLY_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/bracelet-amulettes-kelly--121425B%2000-front-wm-2-0-0-1000-1000_g.jpg"),
];
const AMULETTES_CONSTANCE_SET = [
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/amulettes-constance-bracelet--121400B%2000-worn-1-0-0-1000-1000_g.jpg"),
];
const KELLY_CADENAS_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/brazalete-kelly-cadenas-tamano-pequeno--220465B%2000-front-wm-2-0-0-1000-1000_g.jpg"),
];
const CAPECOD_LARGE_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/cape-cod-watch-large-model-37mm--403352WW00-front-wm-1-0-0-1000-1000_g.jpg"),
];
const CAPECOD_SMALL_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/cape-cod-watch-small-model-31mm--060115WW00-front-wm-1-0-0-1000-1000_g.jpg"),
  V("Detail", "https://assets.hermes.com/is/image/hermesproduct/cape-cod-watch-small-model-31mm--060115WW00-detail-wm-4-0-0-800-800_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/cape-cod-watch-small-model-31mm--060115WW00-worn-2-300-0-800-800_g.jpg"),
];
const H08_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/hermes-h08-watch-42mm--402990WW00-front-wm-1-0-0-1000-1000_g.jpg"),
];
const CUT_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/hermes-cut-watch-large-model-36mm--403190WW00-front-wm-1-0-0-1000-1000_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/hermes-cut-watch-large-model-36mm--403190WW00-worn-2-300-0-800-800_g.jpg"),
];
// Clic Clac H bracelet, Noir — YELLOW-GOLD hardware. Ref H300001F 01.
// Gold hardware has no front-wm views; studio front is worn-1, worn-3 is
// the on-wrist shot. Both visually confirmed.
const JW_CLIC_CLAC_NOIR = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/clic-clac-h-bracelet--300001F%2001-worn-1-0-0-1000-1000_g.jpg"),
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/clic-clac-h-bracelet--300001F%2001-worn-3-300-0-800-800_g.jpg"),
];
// Clic Clac H bracelet, Blanc — YELLOW-GOLD hardware. Ref H300001F 31.
const JW_CLIC_CLAC_BLANC = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/clic-clac-h-bracelet--300001F%2031-worn-1-0-0-1000-1000_g.jpg"),
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/clic-clac-h-bracelet--300001F%2031-worn-3-300-0-800-800_g.jpg"),
];
// Clic Clac H bracelet, Rouge — YELLOW-GOLD hardware. Ref H300001F 94.
// Only ONE view exists for gold hardware (front-1). Its swatch is
// unavailable in data.ts, so this set is unreachable until Rouge is
// made selectable — wired now so the branch is complete.
const JW_CLIC_CLAC_ROUGE = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/clic-clac-h-bracelet--300001F%2094-front-1-300-0-800-800_g.jpg"),
];
// Cape Cod watch, Large model, 37 mm, Etoupe strap — ref W043651WW00.
// Quartz, opaline silvered dial with Arabic numerals, date at 3, short
// double tour strap in etoupe Swift calfskin. US page confirms $3,950.
const JW_CAPECOD_LARGE_ETOUPE = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/cape-cod-watch-large-model-37mm--043651WW00-front-1-300-0-800-800_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/cape-cod-watch-large-model-37mm--043651WW00-worn-2-300-0-800-800_g.jpg"),
];
// Cape Cod watch, Large model, 37 mm, Noir strap — ref W056579WW00.
// Black double-tour strap + same opaline Arabic dial as the Etoupe twin.
const JW_CAPECOD_LARGE_NOIR = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/cape-cod-watch-large-model-37mm--056579WW00-front-1-300-0-800-800_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/cape-cod-watch-large-model-37mm--056579WW00-front-3-300-0-800-800_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/cape-cod-watch-large-model-37mm--056579WW00-worn-2-300-0-800-800_g.jpg"),
];
// Mini Thalassa bracelet — ETOUPE Swift strap + PALLADIUM clasp.
// Ref H500522FK18. (data.ts listed "Bleu" — wrong; see data fix.)
const JW_THALASSA_ETOUPE = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/mini-thalassa-bracelet--500522FK18-front-wm-2-0-0-1000-1000_g.jpg"),
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/mini-thalassa-bracelet--500522FK18-worn-3-300-0-800-800_g.jpg"),
];
// Chaine d'ancre necklace, small model — sterling silver. Ref H101503Bv00.
const JW_CHAINE_ANCRE_NECKLACE = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-necklace--101503B%2000-front-wm-2-0-0-1000-1000_g.jpg"),
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-necklace--101503B%2000-worn-3-300-0-800-800_g.jpg"),
];
// Chaine d'ancre earrings — "Chaine d'ancre Enchainee earrings, small
// model", sterling silver. Ref H109510Bv00.
const JW_CHAINE_ANCRE_EARRINGS = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-enchainee-earrings-small-model--109510B%2000-front-wm-2-0-0-1000-1000_g.jpg"),
  V("Worn", "https://assets.hermes.com/is/image/hermesproduct/chaine-d-ancre-enchainee-earrings-small-model--109510B%2000-worn-3-300-0-800-800_g.jpg"),
];
// Hermes H08 watch, 42 mm — TITANIUM case, grained grey dial, dark grey
// rubber strap. Ref W408230WW00. US page confirms $8,600.
const JW_H08_TITANIUM = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/hermes-h08-watch-42mm--408230WW00-front-wm-1-0-0-1000-1000_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/hermes-h08-watch-42mm--408230WW00-worn-2-300-0-800-800_g.jpg"),
];
// Kelly watch, Mini model, 16 mm, Grey — steel, copper rose-tinted
// stamped dial, diamond-set case sides. Ref W408477WW00. (Dial is
// copper-rose, not grey — "Gris" most plausibly = the steel-grey overall
// look; name left as-is.)
const JW_KELLY_MINI_GREY = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/kelly-watch-mini-model-16mm--408477WW00-front-wm-1-0-0-1000-1000_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/kelly-watch-mini-model-16mm--408477WW00-front-wm-4-0-0-1000-1000_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/kelly-watch-mini-model-16mm--408477WW00-worn-2-300-0-800-800_g.jpg"),
];
// Kelly watch, Mini model, 16 mm, Pink gold — rose gold, white
// mother-of-pearl dial, 43-diamond case, 221-diamond plate. Ref
// W056854WW00. NOT W056853WW00 (that is id 260, $97,400).
const JW_KELLY_MINI_PINKGOLD = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/kelly-watch-mini-model-16mm--056854WW00-front-wm-1-0-0-1000-1000_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/kelly-watch-mini-model-16mm--056854WW00-front-wm-4-0-0-1000-1000_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/kelly-watch-mini-model-16mm--056854WW00-worn-2-300-0-800-800_g.jpg"),
];
const KELLY_WATCH_MINI_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/kelly-watch-mini-model-16mm--056853WW00-front-wm-1-0-0-1000-1000_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/kelly-watch-mini-model-16mm--056853WW00-front-wm-4-0-0-1000-1000_g.jpg"),
];
const ARCEAU_LUNE_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/arceau-petite-lune-watch-large-model-38mm--403043WW00-front-1-300-0-800-800_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/arceau-petite-lune-watch-large-model-38mm--403043WW00-front-5-300-0-800-800_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/arceau-petite-lune-watch-large-model-38mm--403043WW00-worn-2-300-0-800-800_g.jpg"),
];
const ARCEAU_CHRONO_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/arceau-chronographe-watch-42mm--404112WW00-front-wm-1-0-0-1000-1000_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/arceau-chronographe-watch-42mm--404112WW00-worn-2-300-0-800-800_g.jpg"),
];
const HEUREH_MED_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/heure-h-watch-medium-model-30mm--404144WW00-front-wm-1-0-0-1000-1000_g.jpg"),
];
const HEUREH_SMALL_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/heure-h-watch-small-model-25mm--404283WW00-front-wm-1-0-0-1000-1000_g.jpg"),
];
const H08_CHRONO_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/hermes-h08-chronographe-watch-45mm--403130WW00-front-wm-1-0-0-1000-1000_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/hermes-h08-chronographe-watch-45mm--403130WW00-worn-2-300-0-800-800_g.jpg"),
  V("Detail", "https://assets.hermes.com/is/image/hermesproduct/hermes-h08-chronographe-watch-45mm--403130WW00-detail-wm-4-0-0-800-800_g.jpg"),
];
const TEMPS_VOYAGEUR_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/arceau-le-temps-voyageur-watch-38mm--057343WW00-front-wm-1-0-0-1000-1000_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/arceau-le-temps-voyageur-watch-38mm--057343WW00-worn-3-300-0-800-800_g.jpg"),
];
const CAPECOD_MINI_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/cape-cod-watch-mini-model-27mm--408333WW00-front-wm-1-0-0-1000-1000_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/cape-cod-watch-mini-model-27mm--408333WW00-worn-2-300-0-800-800_g.jpg"),
];
const NANTUCKET_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/nantucket-watch-small-model-29mm--044188WW00-front-wm-1-0-0-1000-1000_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/nantucket-watch-small-model-29mm--044188WW00-front-wm-5-0-0-1000-1000_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/nantucket-watch-small-model-29mm--044188WW00-worn-2-300-0-800-800_g.jpg"),
  V("Detail", "https://assets.hermes.com/is/image/hermesproduct/nantucket-watch-small-model-29mm--044188WW00-crop-wm-4-0-0-800-800_g.jpg"),
];
const FAUBOURG_MARGUERITE_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/faubourg-marguerite-watch-mini-model-15mm--402996WW00-front-wm-1-0-0-1000-1000_g.jpg"),
];
const FAUBOURG_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/faubourg-watch-mini-model-15mm--049310WW00-front-1-300-0-1000-1000_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/faubourg-watch-mini-model-15mm--049310WW00-front-4-300-0-800-800_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/faubourg-watch-mini-model-15mm--049310WW00-worn-2-300-0-800-800_g.jpg"),
];
const CUT_SUSPENDU_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/hermes-cut-le-temps-suspendu-watch-large-model-39mm--408256WW00-front-wm-1-0-0-1000-1000_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/hermes-cut-le-temps-suspendu-watch-large-model-39mm--408256WW00-front-wm-4-0-0-1000-1000_g.jpg"),
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/hermes-cut-le-temps-suspendu-watch-large-model-39mm--408256WW00-front-wm-5-0-0-1000-1000_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/hermes-cut-le-temps-suspendu-watch-large-model-39mm--408256WW00-worn-2-300-0-800-800_g.jpg"),
  V("Worn on wrist", "https://assets.hermes.com/is/image/hermesproduct/hermes-cut-le-temps-suspendu-watch-large-model-39mm--408256WW00-worn-3-300-0-800-800_g.jpg"),
];

// Ready-to-wear — ORIGINAL Hermes photos, hotlinked from assets.hermes.com
// (user instruction 2026-11-09). Audited 2026-11-10, see
// workspace/hermes-audit/readytowear/REPORT.md. Every URL returned HTTP 200 with
// Referer https://hermesmart.vercel.app/. Views are the original's own gallery in
// numeric order, all model-worn (labelled "Worn"); ids 50/61 keep their video at
// position 2 (their worn_102 does not exist on the CDN). Keyed by product id:
// repeated names are separate colourways with different refs.
const RTW_GALLERY: Record<number, { label: string; src: string; videoSrc?: string }[]> = {
  50: [ // Mid-length buttoned dress — ref H6H2542D502
    V("Worn", HERMES_IMG + "6H2542D502_worn_101" + HERMES_Q),
    V("Video", HERMES_IMG + "6H2542D502_worn_101" + HERMES_Q, MID_DRESS_VIDEO),
    V("Worn", HERMES_IMG + "6H2542D502_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2542D502_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2542D502_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2542D502_worn_106" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2542D502_worn_107" + HERMES_Q),
  ],
  61: [ // Long sleeveless dress — ref H6H2521D7DC
    V("Worn", HERMES_IMG + "6H2521D7DC_worn_101" + HERMES_Q),
    V("Video", HERMES_IMG + "6H2521D7DC_worn_101" + HERMES_Q, LONG_DRESS_VIDEO),
    V("Worn", HERMES_IMG + "6H2521D7DC_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2521D7DC_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2521D7DC_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2521D7DC_worn_106" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2521D7DC_worn_107" + HERMES_Q),
  ],
  89: [ // Dress with shoulder straps — ref H6H0521D502
    V("Worn", HERMES_IMG + "6H0521D502_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0521D502_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0521D502_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0521D502_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0521D502_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0521D502_worn_106" + HERMES_Q),
  ],
  90: [ // Embroidered dress with shoulder straps — ref H6H0544D502
    V("Worn", HERMES_IMG + "6H0544D502_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0544D502_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0544D502_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0544D502_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0544D502_worn_106" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0544D502_worn_107" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0544D502_worn_108" + HERMES_Q),
  ],
  91: [ // “H Kelly” caftan — ref H6H0577DJ02
    V("Worn", HERMES_IMG + "6H0577DJ02_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0577DJ02_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0577DJ02_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0577DJ02_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0577DJ02_worn_106" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0577DJ02_worn_107" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0577DJ02_worn_108" + HERMES_Q),
  ],
  92: [ // Cashmere short skirt — ref H6H2324D14C
    V("Worn", HERMES_IMG + "6H2324D14C_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2324D14C_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2324D14C_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2324D14C_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2324D14C_worn_105" + HERMES_Q),
  ],
  93: [ // Zipped miniskirt — ref H6H1309DT02
    V("Worn", HERMES_IMG + "6H1309DT02_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H1309DT02_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H1309DT02_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H1309DT02_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H1309DT02_worn_105" + HERMES_Q),
  ],
  94: [ // “Mosaique” pouch dress — ref H6H0570DB4C
    V("Worn", HERMES_IMG + "6H0570DB4C_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0570DB4C_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0570DB4C_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0570DB4C_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0570DB4C_worn_105" + HERMES_Q),
  ],
  95: [ // “L'Enseigne du Sellier” long skirt — ref H6H0325DR02
    V("Worn", HERMES_IMG + "6H0325DR02_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0325DR02_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0325DR02_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0325DR02_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0325DR02_worn_105" + HERMES_Q),
  ],
  96: [ // “Mosaique” short-sleeve dress — ref H6H0572DB4C
    V("Worn", HERMES_IMG + "6H0572DB4C_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB4C_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB4C_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB4C_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB4C_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB4C_worn_106" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB4C_worn_107" + HERMES_Q),
  ],
  97: [ // “L'Enseigne du Sellier” caftan — ref H6H0542DRLK
    V("Worn", HERMES_IMG + "6H0542DRLK_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0542DRLK_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0542DRLK_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0542DRLK_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0542DRLK_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0542DRLK_worn_106" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0542DRLK_worn_107" + HERMES_Q),
  ],
  98: [ // “L'Enseigne du Sellier” caftan tunic — ref H6H2805DRDC
    V("Worn", HERMES_IMG + "6H2805DRDC_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2805DRDC_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2805DRDC_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2805DRDC_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2805DRDC_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2805DRDC_worn_106" + HERMES_Q),
  ],
  99: [ // “Mosaique” pouch dress — ref H6H0570DBDK
    V("Worn", HERMES_IMG + "6H0570DBDK_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0570DBDK_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0570DBDK_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0570DBDK_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0570DBDK_worn_105" + HERMES_Q),
  ],
  100: [ // “A Propos de Bottes” buttoned skirt — ref H6H0321DEMO
    V("Worn", HERMES_IMG + "6H0321DEMO_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0321DEMO_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0321DEMO_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0321DEMO_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0321DEMO_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0321DEMO_worn_106" + HERMES_Q),
  ],
  101: [ // Sleeveless dress — ref H6H4524DV91
    V("Worn", HERMES_IMG + "6H4524DV91_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4524DV91_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4524DV91_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4524DV91_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4524DV91_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4524DV91_worn_106" + HERMES_Q),
  ],
  102: [ // Straight skirt — ref H6H2321DBDC
    V("Worn", HERMES_IMG + "6H2321DBDC_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2321DBDC_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2321DBDC_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2321DBDC_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2321DBDC_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2321DBDC_worn_106" + HERMES_Q),
  ],
  103: [ // “H Kelly” caftan — ref H6H0577DJ91
    V("Worn", HERMES_IMG + "6H0577DJ91_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0577DJ91_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0577DJ91_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0577DJ91_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0577DJ91_worn_105" + HERMES_Q),
  ],
  104: [ // Embroidered short shirt dress — ref H6H0540DT91
    V("Worn", HERMES_IMG + "6H0540DT91_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0540DT91_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0540DT91_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0540DT91_worn_104" + HERMES_Q),
  ],
  105: [ // “Mosaique” pouch dress — ref H6H0570DB02
    V("Worn", HERMES_IMG + "6H0570DB02_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0570DB02_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0570DB02_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0570DB02_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0570DB02_worn_105" + HERMES_Q),
  ],
  106: [ // Pochon skirt — ref H6H0333DB02
    V("Worn", HERMES_IMG + "6H0333DB02_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0333DB02_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0333DB02_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0333DB02_worn_106" + HERMES_Q),
  ],
  107: [ // “Soleil de Soie Poudre” classic caftan — ref H6H0545DH02
    V("Worn", HERMES_IMG + "6H0545DH02_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0545DH02_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0545DH02_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0545DH02_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0545DH02_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0545DH02_worn_106" + HERMES_Q),
  ],
  108: [ // “Cahier du Colporteur” classic caftan — ref H6H0573DNKL
    V("Worn", HERMES_IMG + "6H0573DNKL_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0573DNKL_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0573DNKL_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0573DNKL_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0573DNKL_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0573DNKL_worn_106" + HERMES_Q),
  ],
  109: [ // “Cahier du Colporteur” shirt dress — ref H6H0575DNKL
    V("Worn", HERMES_IMG + "6H0575DNKL_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0575DNKL_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0575DNKL_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0575DNKL_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0575DNKL_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0575DNKL_worn_106" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0575DNKL_worn_107" + HERMES_Q),
  ],
  110: [ // Wraparound dress — ref H6H0550DQKL
    V("Worn", HERMES_IMG + "6H0550DQKL_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0550DQKL_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0550DQKL_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0550DQKL_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0550DQKL_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0550DQKL_worn_107" + HERMES_Q),
  ],
  111: [ // Long dress — ref H6H4521DCKL
    V("Worn", HERMES_IMG + "6H4521DCKL_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4521DCKL_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4521DCKL_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4521DCKL_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4521DCKL_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4521DCKL_worn_106" + HERMES_Q),
  ],
  112: [ // Equestrian shirt dress — ref H6H0530DV90
    V("Worn", HERMES_IMG + "6H0530DV90_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0530DV90_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0530DV90_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0530DV90_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0530DV90_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0530DV90_worn_106" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0530DV90_worn_107" + HERMES_Q),
  ],
  113: [ // “Mosaique” short-sleeve dress — ref H6H0572DB90
    V("Worn", HERMES_IMG + "6H0572DB90_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB90_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB90_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB90_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB90_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB90_worn_106" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB90_worn_107" + HERMES_Q),
  ],
  114: [ // Pochon skirt — ref H6H0333DB90
    V("Worn", HERMES_IMG + "6H0333DB90_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0333DB90_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0333DB90_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0333DB90_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0333DB90_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0333DB90_worn_106" + HERMES_Q),
  ],
  115: [ // “Mosaique” short-sleeve dress — ref H6H0572DB02
    V("Worn", HERMES_IMG + "6H0572DB02_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB02_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB02_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB02_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB02_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB02_worn_106" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0572DB02_worn_107" + HERMES_Q),
  ],
  116: [ // “L'Enseigne du Sellier” caftan — ref H6H0542DR02
    V("Worn", HERMES_IMG + "6H0542DR02_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0542DR02_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0542DR02_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0542DR02_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0542DR02_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0542DR02_worn_106" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0542DR02_worn_107" + HERMES_Q),
  ],
  117: [ // Equestrian shirt dress — ref H6H0530DV02
    V("Worn", HERMES_IMG + "6H0530DV02_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0530DV02_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0530DV02_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0530DV02_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0530DV02_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0530DV02_worn_106" + HERMES_Q),
  ],
  118: [ // Cashmere short skirt — ref H6H2324D15H
    V("Worn", HERMES_IMG + "6H2324D15H_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2324D15H_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2324D15H_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2324D15H_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2324D15H_worn_105" + HERMES_Q),
  ],
  119: [ // Equestrian miniskirt — ref H6H0354DY5H
    V("Worn", HERMES_IMG + "6H0354DY5H_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0354DY5H_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0354DY5H_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0354DY5H_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0354DY5H_worn_105" + HERMES_Q),
  ],
  120: [ // Cashmere short skirt — ref H6H2324D1A3
    V("Worn", HERMES_IMG + "6H2324D1A3_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2324D1A3_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2324D1A3_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2324D1A3_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H2324D1A3_worn_105" + HERMES_Q),
  ],
  121: [ // Wrap skirt — ref H6H0326D7LK
    V("Worn", HERMES_IMG + "6H0326D7LK_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0326D7LK_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0326D7LK_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0326D7LK_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0326D7LK_worn_105" + HERMES_Q),
  ],
  122: [ // “Cahier du Colporteur” miniskirt — ref H6H4316DFG8
    V("Worn", HERMES_IMG + "6H4316DFG8_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4316DFG8_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4316DFG8_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4316DFG8_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4316DFG8_worn_105" + HERMES_Q),
  ],
  123: [ // Sleeveless dress — ref H6H4524DVLU
    V("Worn", HERMES_IMG + "6H4524DVLU_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4524DVLU_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4524DVLU_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4524DVLU_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4524DVLU_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H4524DVLU_worn_106" + HERMES_Q),
  ],
  124: [ // “Mosaique” pouch dress — ref H6H0570DB90
    V("Worn", HERMES_IMG + "6H0570DB90_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0570DB90_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0570DB90_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0570DB90_worn_104" + HERMES_Q),
  ],
  125: [ // “L'Enseigne du Sellier” long skirt — ref H6H0325DRLK
    V("Worn", HERMES_IMG + "6H0325DRLK_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0325DRLK_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0325DRLK_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0325DRLK_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6H0325DRLK_worn_105" + HERMES_Q),
  ],
  412: [ // Swing dressage breeches — ref H800336Ev3340
    V("Worn", HERMES_IMG + "800336E 33_worn_101" + HERMES_Q),
    V("Worn", HERMES_IMG + "800336E 33_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "800336E 33_worn_103" + HERMES_Q),
  ],
  413: [ // “H” jogging pants — ref H6E2404D3A3
    V("Worn", HERMES_IMG + "6E2404D3A3_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6E2404D3A3_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6E2404D3A3_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6E2404D3A3_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6E2404D3A3_worn_106" + HERMES_Q),
  ],
  414: [ // Embroidered pocket dress — ref H6E4515DA90
    V("Worn", HERMES_IMG + "6E4515DA90_worn_102" + HERMES_Q),
    V("Worn", HERMES_IMG + "6E4515DA90_worn_103" + HERMES_Q),
    V("Worn", HERMES_IMG + "6E4515DA90_worn_104" + HERMES_Q),
    V("Worn", HERMES_IMG + "6E4515DA90_worn_105" + HERMES_Q),
    V("Worn", HERMES_IMG + "6E4515DA90_worn_106" + HERMES_Q),
  ],
};

// Long sleeveless dress, Noir colourway (ref H6H2521D702) — its own photos, no video.
const LONG_NOIR = [
  V("Worn", HERMES_IMG + "6H2521D702_worn_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "6H2521D702_worn_102" + HERMES_Q),
  V("Worn", HERMES_IMG + "6H2521D702_worn_103" + HERMES_Q),
  V("Worn", HERMES_IMG + "6H2521D702_worn_104" + HERMES_Q),
  V("Worn", HERMES_IMG + "6H2521D702_worn_105" + HERMES_Q),
  V("Worn", HERMES_IMG + "6H2521D702_worn_106" + HERMES_Q),
];

// Type sets — applied to every other product by the type rules. Each label
// maps to the photo actually shot for that label, never a reuse.
const BAG_SET = [V("Front", bagFront), V("Side", bagSide), V("Above", bagAbove), V("Back", bagBack)];
const SHOE_SET = [V("Front", shoeFront), V("Worn", shoeWorn), V("Side", shoeSide), V("Back", shoeBack), V("Detail", shoeDetail), V("Above", shoeAbove)];
const WATCH_SET = [V("Front", watchFront), V("Side", watchSide), V("Detail", watchDetail), V("Worn on wrist", watchWorn), V("Back", watchBack)];
const PERFUME_SET = [V("Front", perfFront), V("Detail", perfDetail), V("Side", perfSide), V("Bottle + orange box", perfBox), V("Scale in hand", perfSpray), V("Detail", perfBase)];
const JEWELRY_SET = [V("Front", jewFront), V("Worn", jewWorn), V("Detail", jewDetail)];
const SCARF_SET = [V("Flat", scarfFlat), V("Worn", scarfWorn), V("Detail", scarfDetail)];
const BELT_SET = [V("Front", beltFront), V("Worn", beltWorn), V("Detail", beltDetail)];
const BLANKET_SET = [V("Front", blanketFlat), V("Folded", blanketFolded), V("In situ", blanketInSitu), V("Detail", blanketDetail)];
const DRESS_SET = [V("Worn", longFront), V("Worn", longCloseup), V("Worn", longBack), V("Worn", longThreeQuarter), V("Detail", longDetail)];
const RTW_SET = [V("Front", longFront), V("Worn", longCloseup), V("Back", longBack), V("Detail", longDetail)];
const GENERIC_SET = [V("Front", bagFront), V("In situ", blanketInSitu), V("Detail", blanketDetail)];

// Resolve a label from the product's stored gallery data to the photo that
// was shot for that label within a type set.
function byLabel(set: { label: string; src: string }[], label: string, index: number): string {
  const l = label.toLowerCase();
  const pick = (test: (s: string) => boolean) => set.find((v) => test(v.label.toLowerCase()));
  const at = (i: number) => set[i % set.length] ?? set[0];
  const first = set[0];
  const resolve = (found: { label: string; src: string } | undefined) => (found ?? at(index) ?? first)?.src ?? "";
  if (l.includes("detail") || l.includes("dial") || l.includes("swatch") || l.includes("case")) return resolve(pick((s) => s.includes("detail")));
  if (l.includes("worn") || l.includes("wrist")) return resolve(pick((s) => s.includes("worn")));
  if (l.includes("above")) return resolve(pick((s) => s.includes("above")));
  if (l.includes("back")) return resolve(pick((s) => s.includes("back")));
  if (l.includes("side")) return resolve(pick((s) => s.includes("side")));
  if (l.includes("flat") || l.includes("front")) return (pick((s) => s.includes("flat") || s.includes("front")) ?? first)?.src ?? "";
  if (l.includes("folded")) return resolve(pick((s) => s.includes("folded")));
  if (l.includes("box")) return resolve(pick((s) => s.includes("box")));
  if (l.includes("hand") || l.includes("scale")) return resolve(pick((s) => s.includes("hand")));
  if (l.includes("situ")) return resolve(pick((s) => s.includes("situ")));
  if (l.includes("open")) return resolve(pick((s) => s.includes("above") || s.includes("box")));
  return resolve(undefined);
}

function typeSet(p: GalleryProduct): { label: string; src: string }[] {
  const sub = (p.subcategory ?? "").toLowerCase();
  const n = p.name.toLowerCase();
  if (/blanket|throw/.test(n) || sub.includes("blanket")) return BLANKET_SET;
  if (p.category === "watches" || /watch/.test(n)) return WATCH_SET;
  if (sub.includes("perfume") || (p.category === "fragrances" && !/lip|eye|nail|make-up|makeup/.test(n))) return PERFUME_SET;
  if (sub.includes("scarf") || sub.includes("scarves") || /scarf|twilly|shawl|stole/.test(n)) return SCARF_SET;
  if (sub === "shoes" || /sneaker|boot|loafer|mule|derby|sandal|espadrille|pump|ballerina/.test(n)) return SHOE_SET;
  if (sub === "belts" || /belt/.test(n)) return BELT_SET;
  if (sub.includes("dress") || /dress|skirt|caftan/.test(n)) return DRESS_SET;
  if (p.category === "jewelry" || /necklace|bracelet|earring|bangle|\bring\b/.test(n)) return JEWELRY_SET;
  if (sub.includes("bag") || sub.includes("leather") || /bag|tote|sac|kelly|birkin|picotin|bolide|clutch|pouch|wallet|case/.test(n)) return BAG_SET;
  if (sub.includes("ready") || p.category === "women" || p.category === "men" || p.category === "equestrian") return RTW_SET;
  if (p.category === "home") return BLANKET_SET;
  return GENERIC_SET;
}

/**
 * The gallery for a product in the colour at `colorIndex`: an ordered list
 * of { label, src, video } where every photo is distinct within the list
 * and matches its label. Colour switch returns that colourway's own photos
 * (and its own plain background, which is baked into the photos).
 */
// Fragrance / make-up / home audit 2026-11-10 (see
// workspace/hermes-audit/fragrance-home-scarves/REPORT.md §2):
// ORIGINAL Hermes photos, hotlinked from assets.hermes.com (user
// instruction 2026-11-09). Every view below was HTTP-200 +
// download-verified. NOTE: 39937/38167 front_wm_101 are 403 despite
// a probe HIT — the refill tiles use front_1 instead (REPORT §7.7).
const AMBRE_NARGUILE_SET = [
  V("Front", HERMES_IMG + "113483V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "113483V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "113483V0_front_wm_103" + HERMES_Q),
  V("Refill", HERMES_IMG + "113483V0_front_wm_104" + HERMES_Q),
];
const MYRRHE_EGLANTINE_SET = [
  V("Front", HERMES_IMG + "113575V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "113575V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "113575V0_front_wm_103" + HERMES_Q),
];
const ROSE_IKEBANA_SET = [
  V("Front", HERMES_IMG + "113578V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "113578V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "113578V0_front_wm_103" + HERMES_Q),
  V("Refill", HERMES_IMG + "113578V0_front_wm_104" + HERMES_Q),
];
const CEDRE_SAMBAC_SET = [
  V("Front", HERMES_IMG + "113485V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "113485V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "113485V0_front_wm_103" + HERMES_Q),
  V("Refill", HERMES_IMG + "113485V0_front_wm_104" + HERMES_Q),
];
const VETIVER_TONKA_SET = [
  V("Front", HERMES_IMG + "113580V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "113580V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "113580V0_front_wm_103" + HERMES_Q),
  V("Refill", HERMES_IMG + "113580V0_front_wm_104" + HERMES_Q),
];
const VIOLETTE_VOLYNKA_SET = [
  V("Front", HERMES_IMG + "113581V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "113581V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "113581V0_front_wm_103" + HERMES_Q),
  V("Refill", HERMES_IMG + "113581V0_front_wm_104" + HERMES_Q),
];
const AGAR_EBENE_SET = [
  V("Front", HERMES_IMG + "113482V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "113482V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "113482V0_front_wm_103" + HERMES_Q),
  V("Refill", HERMES_IMG + "113482V0_front_wm_104" + HERMES_Q),
];
const POIVRE_SAMARCANDE_SET = [
  V("Front", HERMES_IMG + "113577V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "113577V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "113577V0_front_wm_103" + HERMES_Q),
  V("Refill", HERMES_IMG + "113577V0_front_wm_104" + HERMES_Q),
];
const OSMANTHE_YUNNAN_SET = [
  V("Front", HERMES_IMG + "113576V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "113576V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "113576V0_front_wm_103" + HERMES_Q),
  V("Refill", HERMES_IMG + "113576V0_front_wm_104" + HERMES_Q),
];
const IRIS_UKIYOE_SET = [
  V("Front", HERMES_IMG + "113487V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "113487V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "113487V0_front_wm_103" + HERMES_Q),
];
const SANTAL_MASSOIA_SET = [
  V("Front", HERMES_IMG + "113579V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "113579V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "113579V0_front_wm_103" + HERMES_Q),
];
const CUIR_DANGE_SET = [
  V("Front", HERMES_IMG + "113484V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "113484V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "113484V0_front_wm_103" + HERMES_Q),
];
const MUSC_PALLIDA_EDP_SET = [
  V("Front", HERMES_IMG + "117337V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "117337V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "117337V0_front_wm_103" + HERMES_Q),
  V("Side", HERMES_IMG + "117337V0_front_wm_104" + HERMES_Q),
  V("Editorial", HERMES_IMG + "117337V0_front_wm_106" + HERMES_Q),
];
const MUSC_PALLIDA_REFILL_SET = [
  V("Front", HERMES_IMG + "118291V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "118291V0_front_wm_102" + HERMES_Q),
  V("Refill", HERMES_IMG + "118291V0_front_wm_103" + HERMES_Q),
  V("Editorial", HERMES_IMG + "118291V0_front_wm_104" + HERMES_Q),
];
const OUD_ALEZAN_SET = [
  V("Front", HERMES_IMG + "113467V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "113467V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "113467V0_front_wm_104" + HERMES_Q),
];
const GINSENG_BILOBA_SET = [
  V("Front", HERMES_IMG + "116173V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "116173V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "116173V0_front_wm_103" + HERMES_Q),
  V("Refill", HERMES_IMG + "116173V0_front_wm_104" + HERMES_Q),
  V("Editorial", HERMES_IMG + "116173V0_front_wm_106" + HERMES_Q),
];
const TERRE_INTENSE_SET = [
  V("Front", HERMES_IMG + "111230V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "111230V0_front_wm_103" + HERMES_Q),
  V("Detail", HERMES_IMG + "111230V0_front_wm_104" + HERMES_Q),
  V("Refill", HERMES_IMG + "111230V0_front_wm_105" + HERMES_Q),
  V("Editorial", HERMES_IMG + "111230V0_front_wm_106" + HERMES_Q),
];
const OUD_ESMA_SET = [
  V("Front", HERMES_IMG + "117057V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "117057V0_front_wm_102" + HERMES_Q),
];
const CARDAMUSC_SET = [
  V("Front", HERMES_IMG + "107117V0_front_wm_101" + HERMES_Q),
  V("Detail", HERMES_IMG + "107117V0_front_wm_102" + HERMES_Q),
];
const MUSC_PALLIDA_ESSENCE_SET = [
  V("Front", HERMES_IMG + "107115V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "107115V0_front_wm_102" + HERMES_Q),
];
const BARENIA_EDP_SET = [
  V("Front", HERMES_IMG + "110436V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "110436V0_front_wm_103" + HERMES_Q),
  V("Detail", HERMES_IMG + "110436V0_front_wm_104" + HERMES_Q),
  V("Detail", HERMES_IMG + "110436V0_worn_102" + HERMES_Q),
];
const PLEINE_FLEUR_SET = [
  V("Front", HERMES_IMG + "118008V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "118008V0_front_wm_103" + HERMES_Q),
  V("Detail", HERMES_IMG + "118008V0_front_wm_104" + HERMES_Q),
  V("Refill", HERMES_IMG + "118008V0_front_wm_106" + HERMES_Q),
];
const BARENIA_SOAP_SET = [
  V("Front", HERMES_IMG + "110440V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "110440V0_front_wm_102" + HERMES_Q),
];
const PLEINE_FLEUR_GIFT_SET = [
  V("Front", HERMES_IMG + "118236V0_front_wm_101" + HERMES_Q),
];
const BARENIA_GIFT_SET = [
  V("Front", HERMES_IMG + "116955V0_front_wm_101" + HERMES_Q),
  V("Open", HERMES_IMG + "116955V0_front_wm_102" + HERMES_Q),
];
const HERMESSENCE_LE_GIFT_SET = [
  V("Front", HERMES_IMG + "118249V0_front_wm_101" + HERMES_Q),
  V("Flat", HERMES_IMG + "118249V0_front_wm_102" + HERMES_Q),
];
const TWILLY_GIFT_SET = [
  V("Front", HERMES_IMG + "110983V0_front_wm_1" + HERMES_Q),
  V("Detail", HERMES_IMG + "110983V0_front_wm_2" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "110983V0_front_wm_3" + HERMES_Q),
];
const AMBRE_REFILL_SET = [
  V("Front", HERMES_IMG + "29751_front_wm_101" + HERMES_Q),
];
const CEDRE_REFILL_SET = [
  V("Front", HERMES_IMG + "39937_front_1" + HERMES_Q),
];
const ROSE_IKEBANA_REFILL_SET = [
  V("Front", HERMES_IMG + "38167_front_1" + HERMES_Q),
];
const MYRRHE_REFILL_SET = [
  V("Front", HERMES_IMG + "39935_worn_1" + HERMES_Q),
];
const OUD_ALEZAN_CREAM_SET = [
  V("Front", HERMES_IMG + "117059V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "117059V0_front_wm_102" + HERMES_Q),
  V("Open", HERMES_IMG + "117059V0_front_wm_103" + HERMES_Q),
  V("Above", HERMES_IMG + "117059V0_front_wm_104" + HERMES_Q),
];
const MUSC_PALLIDA_CREAM_SET = [
  V("Front", HERMES_IMG + "108377V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "108377V0_front_wm_102" + HERMES_Q),
  V("Open", HERMES_IMG + "108377V0_front_wm_103" + HERMES_Q),
];
const TWILLY_LOTION_SET = [
  V("Front", HERMES_IMG + "107276V0_front_wm_101" + HERMES_Q),
  V("Detail", HERMES_IMG + "107276V0_front_wm_102" + HERMES_Q),
];
const TWILLY_MIST_SET = [
  V("Front", HERMES_IMG + "108147V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "108147V0_front_wm_102" + HERMES_Q),
  V("Side", HERMES_IMG + "108147V0_front_wm_103" + HERMES_Q),
];
const MERVEILLES_MIST_SET = [
  V("Front", HERMES_IMG + "108145V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "108145V0_front_wm_102" + HERMES_Q),
  V("Side", HERMES_IMG + "108145V0_front_wm_103" + HERMES_Q),
];
const LOMBRE_SET = [
  V("Front", HERMES_IMG + "101653V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "101653V0_front_wm_103" + HERMES_Q),
];
const LAMBRE_SET = [
  V("Front", HERMES_IMG + "107246V0_front_wm_101" + HERMES_Q),
  V("Bottle + orange box", HERMES_IMG + "107246V0_front_wm_102" + HERMES_Q),
];
const MATTE_LIPSTICK_SET = [
  V("Front", HERMES_IMG + "60001MV048_front_wm_101" + HERMES_Q),
  V("Detail", HERMES_IMG + "60001MV048_front_wm_102" + HERMES_Q),
  V("Open", HERMES_IMG + "60001MV048_front_wm_103" + HERMES_Q),
  V("Case", HERMES_IMG + "60001MV048_front_wm_104" + HERMES_Q),
  V("Worn", HERMES_IMG + "60001MV048_worn_105" + HERMES_Q),
  V("Worn", HERMES_IMG + "60001MV048_worn_106" + HERMES_Q),
];
const OMBRES_SABLES_SET = [
  V("Front", HERMES_IMG + "60875PV007_front_wm_101" + HERMES_Q),
  V("Pans", HERMES_IMG + "60875PV007_front_wm_104" + HERMES_Q),
  V("Detail", HERMES_IMG + "60875PV007_front_wm_105" + HERMES_Q),
  V("Open", HERMES_IMG + "60875PV007_front_wm_106" + HERMES_Q),
  V("Worn", HERMES_IMG + "60875PV007_worn_102" + HERMES_Q),
];
const NAIL_POLISH_SET = [
  V("Front", HERMES_IMG + "60861VV050_front_wm_101" + HERMES_Q),
  V("Swatch", HERMES_IMG + "60861VV050_front_wm_104" + HERMES_Q),
  V("Box", HERMES_IMG + "60861VV050_front_wm_105" + HERMES_Q),
  V("Detail", HERMES_IMG + "60861VV050_front_wm_106" + HERMES_Q),
  V("Worn", HERMES_IMG + "60861VV050_worn_102" + HERMES_Q),
];
const LES_GRIGRIS_SET = [
  V("Front", HERMES_IMG + "60863PV002_front_wm_101" + HERMES_Q),
  V("Detail", HERMES_IMG + "60863PV002_front_wm_104" + HERMES_Q),
  V("Open", HERMES_IMG + "60863PV002_front_wm_105" + HERMES_Q),
  V("Box", HERMES_IMG + "60863PV002_front_wm_106" + HERMES_Q),
  V("Worn", HERMES_IMG + "60863PV002_worn_102" + HERMES_Q),
];
const HERMESISTIBLE_OIL_SET = [
  V("Front", HERMES_IMG + "60346HV010_front_wm_101" + HERMES_Q),
  V("Swatch", HERMES_IMG + "60346HV010_front_wm_104" + HERMES_Q),
  V("Applicator", HERMES_IMG + "60346HV010_front_wm_105" + HERMES_Q),
  V("Cap", HERMES_IMG + "60346HV010_front_wm_106" + HERMES_Q),
  V("Worn", HERMES_IMG + "60346HV010_worn_102" + HERMES_Q),
];
const ROUGE_AIRELLE_SET = [
  V("Front", HERMES_IMG + "60843BV038_front_wm_101" + HERMES_Q),
  V("Detail", HERMES_IMG + "60843BV038_front_wm_104" + HERMES_Q),
  V("Box", HERMES_IMG + "60843BV038_front_wm_105" + HERMES_Q),
  V("Case", HERMES_IMG + "60843BV038_front_wm_106" + HERMES_Q),
  V("Worn", HERMES_IMG + "60843BV038_worn_102" + HERMES_Q),
];
const EYELINER_SET = [
  V("Front", HERMES_IMG + "60574EV001_front_wm_101" + HERMES_Q),
  V("Box", HERMES_IMG + "60574EV001_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "60574EV001_front_wm_103" + HERMES_Q),
  V("Swatch", HERMES_IMG + "60574EV001_front_wm_106" + HERMES_Q),
  V("Worn", HERMES_IMG + "60574EV001_worn_105" + HERMES_Q),
];
const PETALES_SET = [
  V("Front", HERMES_IMG + "60365PV001_front_wm_101" + HERMES_Q),
  V("Pans", HERMES_IMG + "60365PV001_detail_wm_102" + HERMES_Q),
  V("Worn", HERMES_IMG + "60365PV001_worn_103" + HERMES_Q),
  V("Worn", HERMES_IMG + "60365PV001_worn_105" + HERMES_Q),
];
const MASCARA_SET = [
  V("Front", HERMES_IMG + "60510EV001_front_wm_101" + HERMES_Q),
  V("Box", HERMES_IMG + "60510EV001_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "60510EV001_front_wm_103" + HERMES_Q),
  V("Worn", HERMES_IMG + "60510EV001_worn_105" + HERMES_Q),
];
const ROSE_CONFETTI_SET = [
  V("Front", HERMES_IMG + "60487BV027_front_wm_104" + HERMES_Q),
  V("Case", HERMES_IMG + "60487BV027_front_wm_3" + HERMES_Q),
  V("Worn", HERMES_IMG + "60487BV027_worn_105" + HERMES_Q),
];
const EYE_PENCIL_SET = [
  V("Front", HERMES_IMG + "60570CV010_front_wm_101" + HERMES_Q),
  V("Tip", HERMES_IMG + "60570CV010_front_wm_102" + HERMES_Q),
  V("Cap", HERMES_IMG + "60570CV010_front_wm_103" + HERMES_Q),
  V("Swatch", HERMES_IMG + "60570CV010_front_wm_106" + HERMES_Q),
  V("Worn", HERMES_IMG + "60570CV010_worn_105" + HERMES_Q),
];
const PLEIN_AIR_SET = [
  V("Front", HERMES_IMG + "60447PV001_front_wm_101" + HERMES_Q),
  V("Open", HERMES_IMG + "60447PV001_front_wm_102" + HERMES_Q),
  V("Box", HERMES_IMG + "60447PV001_front_wm_103" + HERMES_Q),
];
const BRUSH_SET = [
  V("Front", HERMES_IMG + "604440V0_front_wm_101" + HERMES_Q),
  V("Box", HERMES_IMG + "604440V0_front_wm_102" + HERMES_Q),
];
const LIP_MASK_SET = [
  V("Front", HERMES_IMG + "60855BV000_front_wm_101" + HERMES_Q),
  V("Closed", HERMES_IMG + "60855BV000_front_wm_104" + HERMES_Q),
  V("Box", HERMES_IMG + "60855BV000_front_wm_105" + HERMES_Q),
  V("Flat", HERMES_IMG + "60855BV000_front_wm_106" + HERMES_Q),
  V("Worn", HERMES_IMG + "60855BV000_worn_103" + HERMES_Q),
];
const SILKY_LIPSTICK_SET = [
  V("Front", HERMES_IMG + "60267TV048_front_wm_101" + HERMES_Q),
  V("Detail", HERMES_IMG + "60267TV048_front_wm_102" + HERMES_Q),
  V("Case", HERMES_IMG + "60267TV048_front_wm_103" + HERMES_Q),
  V("Box", HERMES_IMG + "60267TV048_front_wm_104" + HERMES_Q),
  V("Worn", HERMES_IMG + "60267TV048_worn_105" + HERMES_Q),
];
const SATIN_LIPSTICK_SET = [
  V("Front", HERMES_IMG + "60001SV021_front_wm_101" + HERMES_Q),
  V("Detail", HERMES_IMG + "60001SV021_front_wm_102" + HERMES_Q),
  V("Case", HERMES_IMG + "60001SV021_front_wm_103" + HERMES_Q),
  V("Box", HERMES_IMG + "60001SV021_front_wm_104" + HERMES_Q),
  V("Worn", HERMES_IMG + "60001SV021_worn_105" + HERMES_Q),
];
// Satin lipstick, Beige Kalahari — ref V60001SV013, $86. Same 5-view shape
// as SATIN_LIPSTICK_SET (Rose Épicé); every view verified HTTP 200 by CDN
// probe 2026-11-10 (worn_102 / flat_wm_103 / detail_wm_104 are 403).
const SATIN_LIPSTICK_KALAHARI_SET = [
  V("Front", HERMES_IMG + "60001SV013_front_wm_101" + HERMES_Q),
  V("Detail", HERMES_IMG + "60001SV013_front_wm_102" + HERMES_Q),
  V("Case", HERMES_IMG + "60001SV013_front_wm_103" + HERMES_Q),
  V("Box", HERMES_IMG + "60001SV013_front_wm_104" + HERMES_Q),
  V("Worn", HERMES_IMG + "60001SV013_worn_105" + HERMES_Q),
];
const PRECOMPOSED_SET = [
  V("Front", HERMES_IMG + "604810V0_front_wm_101" + HERMES_Q),
  V("Closed", HERMES_IMG + "604810V0_front_wm_102" + HERMES_Q),
  V("Refills", HERMES_IMG + "604810V0_front_wm_103" + HERMES_Q),
  V("Worn", HERMES_IMG + "604810V0_worn_105" + HERMES_Q),
];
const BARENIA_MIST_SET = [
  V("Front", HERMES_IMG + "115954V0_front_wm_101" + HERMES_Q),
  V("Box", HERMES_IMG + "115954V0_front_wm_102" + HERMES_Q),
  V("Editorial", HERMES_IMG + "115954V0_front_wm_103" + HERMES_Q),
];
const MUG_N2_SET = [ V("Front", HERMES_IMG + "081131P_front_wm_101" + HERMES_Q) ];
const AVALON_SET = [
  V("Worn", HERMES_IMG + "102668M59_worn_102" + HERMES_Q),
];
const MOSAIQUE_PLATE_SET = [
  V("Front", HERMES_IMG + "035001P_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "035001P_front_wm_102" + HERMES_Q),
  V("Side", HERMES_IMG + "035001P_front_wm_103" + HERMES_Q),
];
const GARDEN_TEAPOT_SET = [
  V("Front", HERMES_IMG + "043018P_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "043018P_front_wm_102" + HERMES_Q),
  V("Side", HERMES_IMG + "043018P_front_wm_103" + HERMES_Q),
];
// A Walk in the Garden tableware — ORIGINAL Hermes photos, hotlinked (CDN
// probe 2026-11-10; refs from hermes.com product pages, every URL HTTP 200 +
// visually confirmed). The 102 "In situ" table-setting shot and worn_2 are
// the SAME files reused across the Garden product pages (as on hermes.com) —
// the tile is always 101. worn_1 / worn_3 are near-duplicates of 101 / 103
// and are not wired.
const GARDEN_BOWL_SET = [
  V("Front", HERMES_IMG + "043285P_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "043285P_front_wm_102" + HERMES_Q),
];
const GARDEN_SALAD_BOWL_SET = [
  V("Front", HERMES_IMG + "043036P_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "043036P_front_wm_102" + HERMES_Q),
];
const GARDEN_BREAD_PLATE_SET = [
  V("Front", HERMES_IMG + "043212P_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "043212P_front_wm_102" + HERMES_Q),
  V("Side", HERMES_IMG + "043212P_front_wm_103" + HERMES_Q),
];
const GARDEN_DESSERT_PLATE_SET = [
  V("Front", HERMES_IMG + "043107P_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "043107P_front_wm_102" + HERMES_Q),
  V("Side", HERMES_IMG + "043107P_front_wm_103" + HERMES_Q),
];
const GARDEN_TART_PLATTER_SET = [
  V("Front", HERMES_IMG + "043022P_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "043022P_front_wm_102" + HERMES_Q),
  V("Side", HERMES_IMG + "043022P_front_wm_104" + HERMES_Q),
];
const GARDEN_TEA_CUP_SET = [
  V("Front", HERMES_IMG + "043016P_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "043016P_front_wm_102" + HERMES_Q),
  V("Side", HERMES_IMG + "043016P_front_wm_103" + HERMES_Q),
];
const GARDEN_MUG_SET = [
  V("Front", HERMES_IMG + "043031P_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "043031P_front_wm_102" + HERMES_Q),
  V("Side", HERMES_IMG + "043031P_front_wm_103" + HERMES_Q),
];
const GARDEN_HOLLOW_DISH_SET = [
  V("Front", HERMES_IMG + "043013P_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "043013P_front_wm_102" + HERMES_Q),
  V("Side", HERMES_IMG + "043013P_front_wm_103" + HERMES_Q),
];
const GARDEN_DINNER_PLATE_SET = [
  V("Front", HERMES_IMG + "043001P_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "043001P_front_wm_102" + HERMES_Q),
  V("Side", HERMES_IMG + "043001P_front_wm_103" + HERMES_Q),
];
const GARDEN_TRAY_SET = [
  V("Front", HERMES_IMG + "043089P_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "043089P_front_wm_102" + HERMES_Q),
  V("Side", HERMES_IMG + "043089P_front_wm_103" + HERMES_Q),
];
// Plain Twilly EDP / Bleue EDT / Epice Marine EDT — ORIGINAL Hermes photos,
// hotlinked (CDN probe 2026-11-10). Twilly (V107263V0) and Bleue (V107179V0)
// have NO front_wm_101 — the front view is front_wm_102. worn_2 / worn_3 are
// near-duplicates of 102 / 103 and are not wired.
const TWILLY_EDP_SET = [
  V("Front", HERMES_IMG + "107263V0_front_wm_102" + HERMES_Q),
  V("Bottle + box", HERMES_IMG + "107263V0_front_wm_103" + HERMES_Q),
];
const BLEUE_EDT_SET = [
  V("Front", HERMES_IMG + "107179V0_front_wm_102" + HERMES_Q),
  V("Bottle + box", HERMES_IMG + "107179V0_front_wm_103" + HERMES_Q),
];
const EPICE_MARINE_SET = [
  V("Front", HERMES_IMG + "113486V0_front_wm_101" + HERMES_Q),
  V("Bottle + box", HERMES_IMG + "113486V0_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "113486V0_front_wm_103" + HERMES_Q),
];
// Belts — ORIGINAL Hermes photos, hotlinked (CDN probe 2026-11-10).
// CDC 50 (Rouge H, ref H010439CK55080): 101 front + worn_102 (worn_2 is a
// near-duplicate crop — not wired). Elan Pocket 24 (Beige/Natural, ref
// H011790UCAAXS): 101 front + worn_2 model shot (front_wm_1 is a
// near-duplicate — not wired).
const CDC50_SET = [
  V("Front", HERMES_IMG + "010439CK55_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "010439CK55_worn_102" + HERMES_Q),
];
const ELAN_SET = [
  V("Front", HERMES_IMG + "011790UCAA_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "011790UCAA_worn_2" + HERMES_Q),
];
// Belt-kit composites: buckle + strap kits have NO {ref}_{view} URL — the
// photo is a Scene7 composite, beltkits-{width}-f34?$leatherstrap={STRAP}
// _composite_103&$buckle={BUCKLE}_composite_103. Only _composite_103 exists
// (101/102 are 403). The sized form (&wid=750&hei=1000) returns a 750x1000
// JPEG (verified 2026-11-10) and is what is wired below. H 38 mm: strap
// 077971CAAJ + plain-H buckle 064544CK05 (palladium). Etriviere 38 mm: strap
// 077971CAAJ + buckle 077931CP2K (gold stirrup). Etriers 38 mm: strap
// 077971CAME + buckle 081753CIJ3 (palladium stirrup).
const H38_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/beltkits-38-f34?$leatherstrap=077971CAAJ_composite_103&$buckle=064544CK05_composite_103&extend=0,0,0,0&align=0,0&wid=750&hei=1000&fit=fit&$product_default_bg$"),
];
const ETRIVIERE38_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/beltkits-38-f34?$leatherstrap=077971CAAJ_composite_103&$buckle=077931CP2K_composite_103&extend=0,0,0,0&align=0,0&wid=750&hei=1000&fit=fit&$product_default_bg$"),
];
const ETRIERS38_SET = [
  V("Front", "https://assets.hermes.com/is/image/hermesproduct/beltkits-38-f34?$leatherstrap=077971CAME_composite_103&$buckle=081753CIJ3_composite_103&extend=0,0,0,0&align=0,0&wid=750&hei=1000&fit=fit&$product_default_bg$"),
];
// Spaced-ID finds — ORIGINAL Hermes photos, hotlinked (CDN probe
// 2026-11-10, batch 16/17). Refs with "v" resolve as "{base} {digits}"
// (space in the image ID, e.g. H251526Sv02 -> 251526S 02). Scarves have
// only model-worn views on the CDN (no flat front view, except the
// Jockey scarf ring); near-duplicates are NOT wired: Avalon III blanket
// worn_1/2/3 mirror front_wm_101/102/103; Boucles Twilly worn_2 mirrors
// worn_102; Summer Dye worn_2 mirrors worn_102; Les 6 Pas worn_2 mirrors
// front_wm_102; Avalon pillows front_wm_103 / worn_1 / worn_3 mirror
// front_wm_101; Avalon large worn_2 mirrors front_wm_102.
const CASAQUE_SCARF_SET = [
  V("Worn", HERMES_IMG + "251526S%2002_worn_1" + HERMES_Q),
  V("Worn", HERMES_IMG + "251526S%2002_worn_102" + HERMES_Q),
  V("Worn", HERMES_IMG + "251526S%2002_worn_2" + HERMES_Q),
];
const LETTRES_SCARF_SET = [
  V("Worn", HERMES_IMG + "254039S%2001_worn_1" + HERMES_Q),
  V("Worn", HERMES_IMG + "254039S%2001_worn_102" + HERMES_Q),
  V("Worn", HERMES_IMG + "254039S%2001_worn_2" + HERMES_Q),
];
const COLLIERS_SCARF_SET = [
  V("Worn", HERMES_IMG + "392770T%2001_worn_1" + HERMES_Q),
];
const DOUBLE_FACE_STOLE_SET = [
  V("Worn", HERMES_IMG + "259130S%2017_worn_1" + HERMES_Q),
];
const PARTHENON_SCARF_SET = [
  V("Worn", HERMES_IMG + "259171S%2001_worn_1" + HERMES_Q),
];
const CHANTILLY_TRI_SET = [
  V("Worn", HERMES_IMG + "361173S%2006_worn_1" + HERMES_Q),
];
const CINETIQUE_SCARF_SET = [
  V("Worn", HERMES_IMG + "269172S%2001_worn_1" + HERMES_Q),
];
const CARREAUX_SCARF_SET = [
  V("Worn", HERMES_IMG + "219153S%2001_worn_1" + HERMES_Q),
];
const LEOPARDS_TRI_SET = [
  V("Worn", HERMES_IMG + "362953S%2001_worn_1" + HERMES_Q),
];
const EXCEPTIONAL_TWILLY_SET = [
  V("Worn", HERMES_IMG + "851517S%2001_worn_1" + HERMES_Q),
];
const BOUCLES_TWILLY_SET = [
  V("Worn", HERMES_IMG + "064367S%2004_worn_1" + HERMES_Q),
  V("Worn", HERMES_IMG + "064367S%2004_worn_102" + HERMES_Q),
];
const JOCKEY_LONG_TWILLY_SET = [
  V("Worn", HERMES_IMG + "851592S%2002_worn_1" + HERMES_Q),
];
const JOCKEY_RING_SET = [
  V("Front", HERMES_IMG + "604023S%2001_front_wm_101" + HERMES_Q),
];
const SUMMER_DYE_BLANKET_SET = [
  V("Front", HERMES_IMG + "104841M%2001_front_wm_101" + HERMES_Q),
  V("Worn", HERMES_IMG + "104841M%2001_worn_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "104841M%2001_back_wm_105" + HERMES_Q),
];
const AVALON_III_BLANKET_SET = [
  V("Front", HERMES_IMG + "102665M%2060_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "102665M%2060_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "102665M%2060_front_wm_103" + HERMES_Q),
];
const OPTIMIST_BLANKET_SET = [
  V("Front", HERMES_IMG + "104848M%2003_front_wm_101" + HERMES_Q),
  V("Detail", HERMES_IMG + "104848M%2003_back_wm_105" + HERMES_Q),
];
const PAS_CHEVAL_BLANKET_SET = [
  V("Front", HERMES_IMG + "104837M%2001_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "104837M%2001_front_wm_102" + HERMES_Q),
  V("Detail", HERMES_IMG + "104837M%2001_back_wm_105" + HERMES_Q),
];
const AVALON_III_PILLOW_SET = [
  V("Front", HERMES_IMG + "102666M%2055_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "102666M%2055_front_wm_102" + HERMES_Q),
  V("In situ", HERMES_IMG + "102666M%2055_worn_2" + HERMES_Q),
];
const AVALON_PILLOW_SET = [
  V("Front", HERMES_IMG + "102669M%2053_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "102669M%2053_front_wm_102" + HERMES_Q),
];
const H_HORIZON_MEDIUM_SET = [
  V("Front", HERMES_IMG + "103942M%2004_front_wm_101" + HERMES_Q),
];
const H_HORIZON_SET = [
  V("Front", HERMES_IMG + "103942M%2005_front_wm_101" + HERMES_Q),
];
const BRIDE_A_BRAC_SET = [
  V("Front", HERMES_IMG + "104951M%2001_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "104951M%2001_front_wm_102" + HERMES_Q),
  V("In situ", HERMES_IMG + "104951M%2001_worn_2" + HERMES_Q),
];
const MUG_N1_SET = [ V("Front", HERMES_IMG + "081031P_front_wm_101" + HERMES_Q) ];
const MUG_N3_SET = [ V("Front", HERMES_IMG + "081231P_front_wm_101" + HERMES_Q) ];
const MUG_SET3_SET = [ V("Front", HERMES_IMG + "081431P_front_wm_101" + HERMES_Q) ];
const ISKENDER_SET = [
  V("Front", HERMES_IMG + "010108P_front_wm_101" + HERMES_Q),
  V("In situ", HERMES_IMG + "010108P_front_wm_102" + HERMES_Q),
];
// Matte lipstick, Rose Velours — shade 78, ref V60001MV078 ($86).
// Views mirror MATTE_LIPSTICK_SET (048): 101 front, 102 bullet close-up,
// 103 medallion end, 104 case + orange box, worn_105/106 models.
// Visually confirmed: raspberry-pink bullet, distinct from 048 (dusty
// rose/mauve) and 033 (bright orange).
const FH_LIP_ROSE_VELOURS = [
  V("Front", HERMES_IMG + "60001MV078_front_wm_101" + HERMES_Q),
  V("Detail", HERMES_IMG + "60001MV078_front_wm_102" + HERMES_Q),
  V("Open", HERMES_IMG + "60001MV078_front_wm_103" + HERMES_Q),
  V("Case", HERMES_IMG + "60001MV078_front_wm_104" + HERMES_Q),
  V("Worn", HERMES_IMG + "60001MV078_worn_105" + HERMES_Q),
  V("Worn", HERMES_IMG + "60001MV078_worn_106" + HERMES_Q),
];
// Matte lipstick, Orange Boite — shade 33, ref V60001MV033 ($86).
// Only 5 views exist: worn_105 is 403 for this ref. Visually confirmed:
// bright orange bullet, distinct from 048 and 078.
const FH_LIP_ORANGE_BOITE = [
  V("Front", HERMES_IMG + "60001MV033_front_wm_101" + HERMES_Q),
  V("Detail", HERMES_IMG + "60001MV033_front_wm_102" + HERMES_Q),
  V("Open", HERMES_IMG + "60001MV033_front_wm_103" + HERMES_Q),
  V("Case", HERMES_IMG + "60001MV033_front_wm_104" + HERMES_Q),
  V("Worn", HERMES_IMG + "60001MV033_worn_106" + HERMES_Q),
];
// Mid-length buttoned dress, Gorgeous Blue — GENERATED photos (pre-existing
// MID_BLUE assets). No Video view on purpose: the only available clip
// (MID_DRESS_VIDEO) shows the NOIR dress, so playing it on the blue
// colourway would show the wrong colour. The original blue colourway's
// photos were not found (ref unknown; needs a live-browser read).
const FH_MID_BLUE = [
  V("Worn", dBlueFront),
  V("Worn", dBlueBack),
  V("Worn", dBlueSide),
];
// Milo L'Aventure bucket hat, Blanc — GENERATED single view (same asset as
// the tile). No original Blanc photo exists: the only verified original
// is the PINK colourway — do NOT wire it here.
const FH_MILO_HAT = [V("Front", bucketHat)];
// Rider jacket, Marine — GENERATED single view (same asset as the tile).
// Product is INVENTED (no hermes.com original exists).
const FH_RIDER_JACKET = [V("Front", riderJacket)];
// Rouge Hermes gift set, Lip care — GENERATED single view (same asset as
// the tile). Bundle ref VP25SETD25BUNDLE returns 403 on every probed view.
const FH_LIP_CARE_SET = [V("Front", rougeLipCareSet)];
// Bride-a-Brac Sellier case, large model, Naturel — GENERATED single view
// (same asset as the tile). Full CDN scan of 104951M01 = 0 hits.
const FH_BRIDE_A_BRAC = [V("Front", brideABracCase)];

export function galleryForProduct(
  p: GalleryProduct & { galleryViews?: string[] },
  colorIndex: number,
): { label: string; src: string; video: boolean; videoSrc?: string }[] {
  const name = p.name;
  const colorName = (p.colors?.[colorIndex]?.name ?? p.colors?.[0]?.name ?? "").toLowerCase();
  let set: { label: string; src: string; videoSrc?: string }[] | null = null;

  if (p.id !== undefined && RTW_GALLERY[p.id]) {
    // Original Hermes gallery for audited ready-to-wear (id-keyed: colourways share names).
    set = RTW_GALLERY[p.id];
    if (name === "Long sleeveless dress" && /noir|black/.test(colorName)) set = LONG_NOIR;
    if (name === "Mid-length buttoned dress" && /blue/.test(colorName)) set = FH_MID_BLUE;
  } else if (name === "Kelly Pocket 18 belt") {
    set = /vert/.test(colorName) ? KELLY_VERT : /etoupe/.test(colorName) ? KELLY_ETOUPE : KELLY_NOIR;
  } else if (name === "Collier de Chien 50 belt") {
    set = CDC50_SET;
  } else if (name === "Elan Pocket 24 reversible belt") {
    set = ELAN_SET;
  } else if (name === "H belt buckle & Reversible leather strap 38 mm") {
    set = H38_SET;
  } else if (name === "Etriviere belt buckle & Reversible leather strap 38 mm") {
    set = ETRIVIERE38_SET;
  } else if (name === "Etriers belt buckle & Reversible leather strap 38 mm") {
    set = ETRIERS38_SET;
  } else if (name === "Bouncing sneaker, Blanc") {
    if (/noir|black/.test(colorName)) set = SHOE_BOUNCING_1125_NOIR;
    else set = BOUNCING_BLANC;
  } else if (name === "Mid-length buttoned dress") {
    set = /blue/.test(colorName) ? MID_BLUE : MID_NOIR;
  } else if (name === "Long sleeveless dress") {
    set = LONG_SET;
  } else if (name === "Le Philateliste du Faubourg scarf 90") {
    // Original Hermes photos, hotlinked (live extraction 2026-11-10 §B; each URL verified HTTP 200).
    // Ref H004205S 12, $660. Replaces the generated phFlat/phWorn/phDetail set.
    set = [
      V("Flat", "https://assets.hermes.com/is/image/hermesproduct/004205S%2012_flat_wm_103?$product_default_bg$"),
      V("Worn", "https://assets.hermes.com/is/image/hermesproduct/004205S%2012_worn_104?$product_default_bg$"),
      V("Detail", "https://assets.hermes.com/is/image/hermesproduct/004205S%2012_detail_wm_105?$product_default_bg$"),
    ];
  } else if (name === "Embroidered pocket dress") {
    set = [V("Front", embFront), V("Side", embSide), V("Back", embBack), V("Detail", embDetail)];
  } else if (name === "Izmir sandal") {
    // Original Hermes photos, hotlinked (user instruction 2026-11-09).
    set = IZMIR_SET;
  } else if (name === "Chypre sandal") {
    // Original Hermes photos, hotlinked (user instruction 2026-11-09).
    set = CHYPRE_SET;
  } else if (name === "Naxos sandal") {
    // Original Hermes photos, hotlinked (user instruction 2026-11-09).
    set = NAXOS_SET;
  } else if (name === "Jackson sandal") {
    // Original Hermes photos, hotlinked (user instruction 2026-11-09).
    set = JACKSON_SET;
  } else if (name === "Bolide Plume 45 bag") {
    // Invented product (no original on hermes.com). Its gallery fell through
    // to the bag pool and showed a Kelly-style tan top-handle bag while the
    // colour is Noir (found live 2026-11-10). Use its own generated Bolide
    // dome-bag tile photo so the gallery shows the correct product.
    set = [V("Front", bolidePlume45)];
  } else if (name === "Ambre Narguile Eau de toilette") {
    set = AMBRE_NARGUILE_SET;
  } else if (name === "Myrrhe Eglantine Eau de toilette") {
    set = MYRRHE_EGLANTINE_SET;
  } else if (name === "Rose Ikebana Eau de toilette") {
    set = ROSE_IKEBANA_SET;
  } else if (name === "Cedre Sambac Eau de toilette") {
    set = CEDRE_SAMBAC_SET;
  } else if (name === "Vetiver Tonka Eau de toilette") {
    set = VETIVER_TONKA_SET;
  } else if (name === "Violette Volynka Eau de toilette") {
    set = VIOLETTE_VOLYNKA_SET;
  } else if (name === "Agar Ebene Eau de toilette") {
    set = AGAR_EBENE_SET;
  } else if (name === "Poivre Samarcande Eau de toilette") {
    set = POIVRE_SAMARCANDE_SET;
  } else if (name === "Osmanthe Yunnan Eau de toilette") {
    set = OSMANTHE_YUNNAN_SET;
  } else if (name === "Iris Ukiyoe Eau de toilette") {
    set = IRIS_UKIYOE_SET;
  } else if (name === "Santal Massoia Eau de toilette") {
    set = SANTAL_MASSOIA_SET;
  } else if (name === "Cuir d'Ange Eau de toilette") {
    set = CUIR_DANGE_SET;
  } else if (name === "Musc Pallida, Eau de parfum, 3.4 fl.oz") {
    set = MUSC_PALLIDA_EDP_SET;
  } else if (name === "Musc Pallida refill, Eau de parfum") {
    set = MUSC_PALLIDA_REFILL_SET;
  } else if (name === "Oud Alezan Eau de parfum") {
    set = OUD_ALEZAN_SET;
  } else if (name === "Ginseng biloba Eau de parfum") {
    set = GINSENG_BILOBA_SET;
  } else if (name === "Terre d'Hermès Eau de parfum intense") {
    set = TERRE_INTENSE_SET;
  } else if (name === "Oud Esma Essence de parfum") {
    set = OUD_ESMA_SET;
  } else if (name === "Cardamusc Essence de parfum") {
    set = CARDAMUSC_SET;
  } else if (name === "Musc Pallida Essence de parfum") {
    set = MUSC_PALLIDA_ESSENCE_SET;
  } else if (name === "Barénia Eau de parfum") {
    set = BARENIA_EDP_SET;
  } else if (name === "Barénia Pleine Fleur Eau de parfum") {
    set = PLEINE_FLEUR_SET;
  } else if (name === "Barénia Perfumed soap") {
    set = BARENIA_SOAP_SET;
  } else if (name === "Barénia Pleine Fleur Eau de parfum gift set") {
    set = PLEINE_FLEUR_GIFT_SET;
  } else if (name === "Barénia eau de parfum gift set – The fragrance ritual") {
    set = BARENIA_GIFT_SET;
  } else if (name === "Hermessence gift set, Limited edition") {
    set = HERMESSENCE_LE_GIFT_SET;
  } else if (name === "Twilly d'Hermès eau de parfum gift set – The fragrance ritual") {
    set = TWILLY_GIFT_SET;
  } else if (name === "Twilly d'Hermès Eau de parfum") {
    set = TWILLY_EDP_SET;
  } else if (name === "Eau des Merveilles Bleue Eau de toilette") {
    set = BLEUE_EDT_SET;
  } else if (name === "Epice Marine Eau de toilette") {
    set = EPICE_MARINE_SET;
  } else if (name === "Ambre Narguile Eau de toilette refill") {
    set = AMBRE_REFILL_SET;
  } else if (name === "Cedre Sambac Eau de toilette refill") {
    set = CEDRE_REFILL_SET;
  } else if (name === "Rose Ikebana Eau de toilette refill") {
    set = ROSE_IKEBANA_REFILL_SET;
  } else if (name === "Myrrhe Eglantine Eau de toilette refill") {
    set = MYRRHE_REFILL_SET;
  } else if (name === "Oud Alezan Perfumed body cream") {
    set = OUD_ALEZAN_CREAM_SET;
  } else if (name === "Musc Pallida Perfumed body cream") {
    set = MUSC_PALLIDA_CREAM_SET;
  } else if (name === "Twilly d'Hermès Moisturizing body lotion") {
    set = TWILLY_LOTION_SET;
  } else if (name === "Twilly d'Hermes Perfumed hair mist") {
    set = TWILLY_MIST_SET;
  } else if (name === "Eau des Merveilles Perfumed hair mist") {
    set = MERVEILLES_MIST_SET;
  } else if (name === "L'Ombre des Merveilles Eau de parfum") {
    set = LOMBRE_SET;
  } else if (name === "L'Ambre des Merveilles Eau de parfum") {
    set = LAMBRE_SET;
  } else if (name === "Matte lipstick, Rose Boisé") {
    // Per-shade galleries: each shade is its own hermes.com product/ref.
    // 48 Rose Boisé (V60001MV048) is the default; 78 Rose Velours
    // (V60001MV078) and 33 Orange Boîte (V60001MV033) have verified
    // original photos. Rouge Amarante and Corail Tempête have NO matching
    // matte lipstick on hermes.com — they fall through to the 48 set
    // (right product, wrong shade) until data.ts is corrected.
    if (/78|rose velours/.test(colorName)) set = FH_LIP_ROSE_VELOURS;
    else if (/33|orange bo/.test(colorName)) set = FH_LIP_ORANGE_BOITE;
    else set = MATTE_LIPSTICK_SET;
  } else if (name === "Ombres d'Hermès, Eye shadow quartet, Ombres Sables") {
    set = OMBRES_SABLES_SET;
  } else if (name === "Les Mains Hermès, Nail polish, Or Rose") {
    set = NAIL_POLISH_SET;
  } else if (name === "Les Grigris Hermès Face and eye illuminating powder, Limited edition, Or Permabrass") {
    set = LES_GRIGRIS_SET;
  } else if (name === "HERMÈSISTIBLE Infused Care Oil, Rose Nashi") {
    set = HERMESISTIBLE_OIL_SET;
  } else if (name === "ROSE HERMÈS Rosy lip enhancer, Limited Edition, Rouge Airelle") {
    set = ROUGE_AIRELLE_SET;
  } else if (name === "TRAIT D'HERMÈS Precision eyeliner, Encre Noire") {
    set = EYELINER_SET;
  } else if (name === "OMBRES D'HERMÈS Eye shadows, Ombres Pétales") {
    set = PETALES_SET;
  } else if (name === "TRAIT D'HERMÈS Revitalizing care mascara, Noir Fusain") {
    set = MASCARA_SET;
  } else if (name === "ROSE HERMÈS Rosy lip glossy enhancer, Rose Confetti") {
    set = ROSE_CONFETTI_SET;
  } else if (name === "TRAIT D'HERMÈS Eye pencil, Or Permabrass") {
    set = EYE_PENCIL_SET;
  } else if (name === "HERMÈS PLEIN AIR H Trio healthy glow mineral powder, Tottori") {
    set = PLEIN_AIR_SET;
  } else if (name === "LES PINCEAUX HERMÈS Precision makeup brush, le Precis") {
    set = BRUSH_SET;
  } else if (name === "Rouge Hermès Nourishing lip care mask") {
    set = LIP_MASK_SET;
  } else if (name === "ROUGE HERMÈS Silky Lipstick Shine, Rose Boisé") {
    set = SILKY_LIPSTICK_SET;
  } else if (name === "ROUGE HERMÈS Satin lipstick, Limited Edition, Rose Épicé") {
    set = SATIN_LIPSTICK_SET;
  } else if (name === "Satin lipstick, Beige Kalahari") {
    // Original Hermes photos, hotlinked (CDN probe 2026-11-10; all 5 views HTTP 200).
    // Ref V60001SV013, $86. Replaces the pooled matte-lipstick gallery (red/burgundy bullet).
    set = SATIN_LIPSTICK_KALAHARI_SET;
  } else if (name === "ROUGE HERMÈS Pre-composed gift set, Limited edition") {
    set = PRECOMPOSED_SET;
  } else if (name === "Barénia Perfumed hair mist") {
    set = BARENIA_MIST_SET;
  } else if (name === "Chevaux a la Couverture mug n°2") {
    set = MUG_N2_SET;
  } else if (name === "Avalon throw blanket") {
    // Per-colourway: only Vert Cèdre has original Hermes photos
    // (H102668M 59, single view worn_102). Ecru / Camel (H102668M 52) and
    // Ecru / Gris foncé (H102668M 53) return 403 on EVERY probed view —
    // no original photos addressable — so leave `set` unset for those
    // colours and let the type-set fallback serve the generated
    // ecru/camel blanket photos (BLANKET_SET).
    if (/vert/.test(colorName)) set = AVALON_SET;
  } else if (name === "Mosaique au 24 dinner plate, set of 2") {
    set = MOSAIQUE_PLATE_SET;
  } else if (name === "A Walk in the Garden teapot") {
    set = GARDEN_TEAPOT_SET;
  } else if (name === "A Walk in the Garden bowl, large model") {
    set = GARDEN_BOWL_SET;
  } else if (name === "A Walk in the Garden salad bowl") {
    set = GARDEN_SALAD_BOWL_SET;
  } else if (name === "A Walk in the Garden bread and butter plate") {
    set = GARDEN_BREAD_PLATE_SET;
  } else if (name === "A Walk in the Garden dessert plate") {
    set = GARDEN_DESSERT_PLATE_SET;
  } else if (name === "A Walk in the Garden tart platter") {
    set = GARDEN_TART_PLATTER_SET;
  } else if (name === "A Walk in the Garden tea cup and saucer") {
    set = GARDEN_TEA_CUP_SET;
  } else if (name === "A Walk in the Garden Mug") {
    set = GARDEN_MUG_SET;
  } else if (name === "A Walk in the Garden hollow dish") {
    set = GARDEN_HOLLOW_DISH_SET;
  } else if (name === "A Walk in the Garden dinner plate") {
    set = GARDEN_DINNER_PLATE_SET;
  } else if (name === "A Walk in the Garden tray, small model") {
    set = GARDEN_TRAY_SET;

  } else if (name === "Casaque Jumping scarf") {
    set = CASAQUE_SCARF_SET;
  } else if (name === "Petite Casaque Lettres Equestres scarf") {
    set = LETTRES_SCARF_SET;
  } else if (name === "Colliers de Chiens scarf") {
    set = COLLIERS_SCARF_SET;
  } else if (name === "Double Face stole") {
    set = DOUBLE_FACE_STOLE_SET;
  } else if (name === "Petite Casaque Parthenon scarf") {
    set = PARTHENON_SCARF_SET;
  } else if (name === "Champ de Courses a Chantilly triangle") {
    set = CHANTILLY_TRI_SET;
  } else if (name === "Cinetique scarf") {
    set = CINETIQUE_SCARF_SET;
  } else if (name === "Carreaux scarf 80") {
    set = CARREAUX_SCARF_SET;
  } else if (name === "Les Leopards triangle") {
    set = LEOPARDS_TRI_SET;
  } else if (name === "Exceptional embroidered double-faced Twilly") {
    set = EXCEPTIONAL_TWILLY_SET;
  } else if (name === "Boucles et Maillons Twilly") {
    set = BOUCLES_TWILLY_SET;
  } else if (name === "Jockey long Twilly") {
    set = JOCKEY_LONG_TWILLY_SET;
  } else if (name === "Jockey scarf ring") {
    set = JOCKEY_RING_SET;
  } else if (name === "Summer Dye blanket") {
    set = SUMMER_DYE_BLANKET_SET;
  } else if (name === "Avalon III throw blanket") {
    set = AVALON_III_BLANKET_SET;
  } else if (name === "Optimist 24 blanket") {
    set = OPTIMIST_BLANKET_SET;
  } else if (name === "Les 6 Pas du Cheval blanket") {
    set = PAS_CHEVAL_BLANKET_SET;
  } else if (name === "Avalon III pillow, small model") {
    set = AVALON_III_PILLOW_SET;
  } else if (name === "Avalon pillow, large model") {
    set = AVALON_PILLOW_SET;
  } else if (name === "H Horizon pillow, medium model") {
    set = H_HORIZON_MEDIUM_SET;
  } else if (name === "H Horizon pillow") {
    set = H_HORIZON_SET;
  } else if (name === "Chevaux a la Couverture set of 2 mugs (n°1 and 2)") {
    set = MUG_N1_SET;
  } else if (name === "Chevaux a la Couverture mug n°3") {
    set = MUG_N3_SET;
  } else if (name === "Chevaux a la Couverture set of 3 mugs") {
    set = MUG_SET3_SET;
  } else if (name === "Iskender white wine glass") {
    set = ISKENDER_SET;
  } else if (name === "Milo Panorama bucket hat") {
    // Original Hermes photos, hotlinked (live extraction 2026-11-10 §B; each URL verified HTTP 200).
    // Ref H261010N 0W58, $690. Matches data.ts galleryViews ["Front","Detail","Worn"].
    // Replaces the generated bucketHat pool (same asset served for every hat).
    set = [
      V("Front", "https://assets.hermes.com/is/image/hermesproduct/261010N%200W_front_wm_102?$product_default_bg$"),
      V("Detail", "https://assets.hermes.com/is/image/hermesproduct/261010N%200W_detail_wm_104?$product_default_bg$"),
      V("Worn", "https://assets.hermes.com/is/image/hermesproduct/261010N%200W_worn_109?$product_default_bg$"),
    ];
  } else if (name === "Milo L'Aventure bucket hat") {
    // Fallback served long-dress photos (RTW_SET) for a hat. Single
    // generated view, same asset as the tile.
    set = FH_MILO_HAT;
  } else if (name === "Rider jacket") {
    // Fallback served long-dress photos (RTW_SET) for a jacket. Single
    // generated view, same asset as the tile. Product is INVENTED.
    set = FH_RIDER_JACKET;
  } else if (name === "Rouge Hermès gift set, Lip care") {
    // Fallback served generic still-life (bag + blanket) photos for a lip
    // care set. Single generated view, same asset as the tile.
    set = FH_LIP_CARE_SET;
  } else if (name === "Bride-a-Brac Sellier case, large model") {
    // ORIGINAL Hermes photos, hotlinked (CDN probe 2026-11-10, spaced ID
    // 104951M 01, ref H104951Mv01). Front + two In situ stool shots.
    set = BRIDE_A_BRAC_SET;
  } else if (name === "Bouncing sneaker") {
    if (/blanc|white/.test(colorName)) set = SHOE_BOUNCING_1275_BLANC;
    else if (/noir|black/.test(colorName)) set = SHOE_BOUNCING_1275_NOIR;
    else set = BOUNCING_SET;
  } else if (name === "Jet sneaker") {
    set = JET_SET;
  } else if (name === "Neon sneaker") {
    set = NEON_SET;
  } else if (name === "Next sneaker") {
    set = NEXT_SET;
  } else if (name === "Nobu sneaker") {
    set = NOBU_SET;
  } else if (name === "Master sneaker") {
    set = MASTER_SET;
  } else if (name === "Day sneaker") {
    set = DAY_SET;
  } else if (name === "Match sneaker") {
    set = MATCH_SET;
  } else if (name === "Kid sneaker") {
    set = KID_SET;
  } else if (name === "Leader sneaker") {
    // One name, three real colourways at three prices — gallery follows price.
    set = p.price === 1675 ? LEADER_1675_SET : p.price === 1525 ? LEADER_1525_SET : LEADER_1600_SET;
  } else if (name === "Lucky slip-on sneaker") {
    set = LUCKY_SET;
  } else if (name === "Loop sneaker") {
    set = p.price === 1750 ? LOOP_1750_SET : LOOP_1525_SET;
  } else if (name === "Quicker sneaker") {
    set = QUICKER_SET;
  } else if (name === "Nine ankle boot") {
    set = NINE_SET;
  } else if (name === "Nathan ankle boot") {
    set = NATHAN_SET;
  } else if (name === "Mateo ankle boot") {
    set = MATEO_SET;
  } else if (name === "Jeff ankle boot") {
    set = JEFF_SET;
  } else if (name === "Noe loafer") {
    set = NOE_SET;
  } else if (name === "Newton loafer") {
    set = NEWTON_SET;
  } else if (name === "Honore loafer") {
    set = HONORE_SET;
  } else if (name === "Mind loafer") {
    set = MIND_SET;
  } else if (name === "Paris loafer") {
    set = PARIS_SET;
  } else if (name === "Member loafer") {
    set = MEMBER_SET;
  } else if (name === "Nicolas loafer") {
    set = NICOLAS_SET;
  } else if (name === "Nod loafer") {
    set = NOD_SET;
  } else if (name === "Low loafer") {
    set = LOW_SET;
  } else if (name === "Noon mule") {
    set = NOON_SET;
  } else if (name === "Mix mule") {
    set = p.price === 1425 ? MIX_1425_SET : MIX_1150_SET;
  } else if (name === "Nick mule") {
    set = NICK_SET;
  } else if (name === "Nils derby shoe") {
    set = NILS_SET;
  } else if (name === "Now derby shoe") {
    set = NOW_SET;
  } else if (name === "Keneth derby shoe") {
    set = KENETH_SET;
  } else if (name === "Moreno derby shoe") {
    set = MORENO_SET;
  } else if (name === "Lawrence derby shoe") {
    set = LAWRENCE_SET;
  } else if (name === "Middle derby shoe") {
    set = MIDDLE_SET;
  } else if (name === "Lead derby shoe") {
    set = LEAD_SET;
  } else if (name === "May derby shoe") {
    set = MAY_SET;
  } else if (name === "Picotin Lock 18 pocket bag") {
    // Original Hermes photos, hotlinked (user instruction 2026-11-09).
    // Replaces the generated picotin-front/side/above/back set: only the
    // front view exists on the CDN for this ref.
    set = PICOTIN_POCKET_SET;
  } else if (name === "Le Petit Sac bag") {
    set = LE_PETIT_SAC_SET;
  } else if (name === "Double Longe bag") {
    set = DOUBLE_LONGE_SET;
  } else if (name === "Tablier Sellier bag") {
    set = TABLIER_SET;
  } else if (name === "Bolide 1923 mini bag") {
    set = /jaune/.test(colorName) ? BAGS_BOLIDE_1923_MINI_JAUNE_CITRON : BOLIDE_1923_MINI_SET;
  } else if (name === "Kelly Messenger bag") {
    set = /etoupe/.test(colorName) ? BAGS_KELLY_MESSENGER_ETOUPE : BAGS_KELLY_MESSENGER_NOIR;
  } else if (name === "Kelly 18 belt") {
    set = BAGS_KELLY_18_BELT;
  } else if (name === "Videpoches bag") {
    set = VIDEPOCHES_SET;
  } else if (name === "Neo Double Sens 35 bicolor bag") {
    set = NEO_DOUBLE_SENS_SET;
  } else if (name === "Neo Garden Voyage 41 bredies bag") {
    set = NEO_GARDEN_BREDIES_SET;
  } else if (name === "Medor bag") {
    set = MEDOR_SET;
  } else if (name === "Arcon slim bag") {
    set = ARCON_SLIM_SET;
  } else if (name === "24/24 - 21 bag") {
    set = TWENTYFOUR_SET;
  } else if (name === "Hermès Geta bag") {
    set = GETA_SET;
  } else if (name === "Neo Garden Voyage 41 bag") {
    set = NEO_GARDEN_41_SET;
  } else if (name === "Messenger Attelage bag") {
    set = MESSENGER_ATTELAGE_SET;
  } else if (name === "Besace Attelee bag") {
    set = BESACE_SET;
  } else if (name === "Cliquetis bag") {
    set = CLIQUETIS_SET;
  } else if (name === "Jypsiere mini bag") {
    set = JYPSIERE_MINI_SET;
  } else if (name === "Mallette bag") {
    set = MALLETTE_SET;
  } else if (name === "Jige Elan 29 colorblock clutch") {
    set = JIGE_SET;
  } else if (name === "Lassoie Hermès bag") {
    set = LASSOIE_SET;
  } else if (name === "In-the-Loop plush belt bag") {
    set = ITL_PLUSH_SET;
  } else if (name === "Etriviere Shopping voyage bag") {
    set = ETRIVIERE_SET;
  } else if (name === "Roulis mini bag") {
    set = ROULIS_MINI_SET;
  } else if (name === "Lindy 26 bag") {
    set = LINDY_26_SET;
  } else if (name === "Silkycity 33 bag") {
    set = SILKYCITY_SET;
  } else if (name === "Hermès In-the-Loop 18 bag") {
    set = ITL_18_SET;
  } else if (name === "Hermès Della Cavalleria Elan bag") {
    set = DELLA_SET;
  } else if (name === "Hermès Geta slim bag") {
    set = GETA_SLIM_SET;
  } else if (name === "Mini Medor bag") {
    set = MINI_MEDOR_SET;
  } else if (name === "P'tit Arcon bag") {
    set = PTIT_ARCON_SET;
  } else if (name === "Halzan 25 bag") {
    set = HALZAN_25_SET;
  } else if (name === "Chaine d'ancre Contour bracelet, white gold") {
    set = CONTOUR_BRACELET_SET;
  } else if (name === "Chaine d'ancre necklace, small model") {
    set = JW_CHAINE_ANCRE_NECKLACE;
  } else if (name === "Chaine d'ancre earrings") {
    set = JW_CHAINE_ANCRE_EARRINGS;
  } else if (name === "Clic Clac H bracelet") {
    if (/rouge/.test(colorName)) set = JW_CLIC_CLAC_ROUGE;
    else if (/blanc/.test(colorName)) set = JW_CLIC_CLAC_BLANC;
    else set = JW_CLIC_CLAC_NOIR; // default = Noir (colors[0])
  } else if (name === "Mini Thalassa bracelet") {
    set = JW_THALASSA_ETOUPE;
  } else if (name === "Kelly Chaine bracelet, small model") {
    set = KELLY_CHAINE_BRACELET_SET;
  } else if (name === "Kelly Gourmette bracelet, very small model") {
    set = KELLY_GOURMETTE_SET;
  } else if (name === "Vertige bracelet") {
    set = VERTIGE_SET;
  } else if (name === "Chaine d'ancre Chaos Nano bracelet") {
    set = CHAOS_NANO_SET;
  } else if (name === "Boucle Sellier “On The Rocks” bracelet, small model") {
    set = BOUCLE_SELLIER_SET;
  } else if (name === "Chaine d'ancre Verso bracelet, large model") {
    set = VERSO_SET;
  } else if (name === "Clou de forge bracelet") {
    set = CLOU_FORGE_SET;
  } else if (name === "Planètes & Météores bracelet") {
    set = PLANETES_SET;
  } else if (name === "Farandole bracelet") {
    set = FARANDOLE_SET;
  } else if (name === "Amulettes Kelly bracelet") {
    set = AMULETTES_KELLY_SET;
  } else if (name === "Amulettes Constance bracelet") {
    set = AMULETTES_CONSTANCE_SET;
  } else if (name === "Kelly Cadenas double bracelet, small model") {
    set = KELLY_CADENAS_SET;
  } else if (name === "Cape Cod watch, Large model, 37 mm") {
    if (/noir/.test(colorName)) set = JW_CAPECOD_LARGE_NOIR;
    else set = JW_CAPECOD_LARGE_ETOUPE; // default = Etoupe strap (colors[0])
  } else if (name === "Cape Cod watch, Small model, 31 mm") {
    set = CAPECOD_SMALL_SET;
  } else if (name === "Hermès H08 watch, 42 mm") {
    set = JW_H08_TITANIUM;
  } else if (name === "Hermès Cut watch, Large model, 36 mm") {
    set = CUT_SET;
  } else if (name === "Kelly watch, Mini model, 16 mm") {
    set = KELLY_WATCH_MINI_SET;
  } else if (name === "Kelly watch, Mini model, 16 mm, Grey") {
    set = JW_KELLY_MINI_GREY;
  } else if (name === "Kelly watch, Mini model, 16 mm, Pink gold") {
    set = JW_KELLY_MINI_PINKGOLD;
  } else if (name === "Arceau Petite Lune watch, Large model, 38 mm") {
    set = ARCEAU_LUNE_SET;
  } else if (name === "Arceau Chronographe watch, 42 mm") {
    set = ARCEAU_CHRONO_SET;
  } else if (name === "Heure H watch, Medium model, 30 mm") {
    set = HEUREH_MED_SET;
  } else if (name === "Heure H watch, Small model, 25 mm") {
    set = HEUREH_SMALL_SET;
  } else if (name === "Hermès H08 Chronographe watch, 45 mm") {
    set = H08_CHRONO_SET;
  } else if (name === "Arceau Le Temps Voyageur watch, 38 mm") {
    set = TEMPS_VOYAGEUR_SET;
  } else if (name === "Cape Cod watch, Mini model, 27 mm") {
    set = CAPECOD_MINI_SET;
  } else if (name === "Nantucket watch, Small model, 29 mm") {
    set = NANTUCKET_SET;
  } else if (name === "Faubourg Marguerite watch, Mini model, 15 mm") {
    set = FAUBOURG_MARGUERITE_SET;
  } else if (name === "Faubourg watch, Mini model, 15 mm") {
    set = FAUBOURG_SET;
  } else if (name === "Hermès Cut Le Temps Suspendu watch, Large model, 39 mm") {
    set = CUT_SUSPENDU_SET;
  }

  if (!set) {
    const ts = typeSet(p);
    const labels = p.galleryViews ?? [];
    if (labels.length >= 2) {
      // Keep the product's stored view labels (they carry audited facts
      // such as a video at position 2), resolving each to its own photo.
      // Bags have one extra photo in the pool (the Worn/carried shot) so a
      // stored "Worn" view resolves to a real carried photo. If the labels
      // still cannot resolve to all-distinct photos (more labels than the
      // type has photos), fall back to the type set itself — a shorter
      // gallery of distinct photos beats a longer one with a repeat.
      const pool = ts === BAG_SET ? [...ts, V("Worn", bagWorn)] : ts;
      const seen = new Set<string>();
      const candidate = labels.map((l, i) => {
        let src = byLabel(pool, l, i);
        if (l !== "Video" && seen.has(src)) {
          const alt = pool.find((t) => !seen.has(t.src));
          if (alt) src = alt.src;
        }
        if (l !== "Video") seen.add(src);
        return V(l, src);
      });
      const photoSrcs = candidate.filter((c) => c.label !== "Video").map((c) => c.src);
      set = new Set(photoSrcs).size === photoSrcs.length ? candidate : ts;
    } else {
      set = ts;
    }
  }

  // Guarantee distinctness: if a label resolution ever lands on a photo
  // already used in this gallery, swap in the next unused photo of the
  // same type set so no two views ever show the same photo. A Video view
  // is exempt: its poster is the colourway's front photo by design (the
  // panel is a video, not another copy of the photo view).
  const ts = typeSet(p);
  const gallerySet = set;
  const used = new Set<string>();
  const out = gallerySet.map((v) => {
    const video = v.label === "Video";
    let src = v.src;
    if (!video && used.has(src)) {
      const alt = ts.find((t) => !used.has(t.src)) ?? gallerySet.find((t) => !used.has(t.src));
      if (alt) src = alt.src;
    }
    if (!video) used.add(src);
    return { label: v.label, src, video, videoSrc: v.videoSrc };
  });
  return out;
}
