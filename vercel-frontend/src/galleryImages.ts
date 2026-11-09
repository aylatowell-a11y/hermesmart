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
// dress and the Long sleeveless dress play the ORIGINAL Hermes video
// (HLS .m3u8, hotlinked from assets.hermes.com, played via hls.js), not
// the old pan-over-stills. Each video URL was verified to load (HTTP 200)
// and its poster frame visually confirmed to show the correct dress.
import kellyFront from "./assets/gallery/kelly-belt-front.webp";
import kellyWorn from "./assets/gallery/kelly-belt-worn.webp";
import kellyFront2 from "./assets/gallery/kelly-belt-front2.webp";
import kellyDetail from "./assets/gallery/kelly-belt-detail.webp";
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
import bNoirFront from "./assets/gallery/bouncing-noir-front.webp";
import bNoirBack from "./assets/gallery/bouncing-noir-back.webp";
import bNoirAbove from "./assets/gallery/bouncing-noir-above.webp";
import bBlueFront from "./assets/gallery/bouncing-blue-front.webp";
import bBlueBack from "./assets/gallery/bouncing-blue-back.webp";
import bBlueAbove from "./assets/gallery/bouncing-blue-above.webp";
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
import phFlat from "./assets/gallery/philateliste-flat.webp";
import phWorn from "./assets/gallery/philateliste-worn.webp";
import phDetail from "./assets/gallery/philateliste-detail.webp";
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

export type GalleryProduct = {
  name: string;
  category?: string;
  subcategory?: string;
  colors?: { name: string }[];
};

const V = (label: string, src: string, videoSrc?: string) => ({ label, src, videoSrc });

// Audited products — exact view sets from the verified per-view specs.
const KELLY_NOIR = [V("Front", kellyFront), V("Worn", kellyWorn), V("Front", kellyFront2), V("Detail", kellyDetail)];
const KELLY_VERT = [V("Front", kellyVertFront), V("Worn", kellyVertWorn), V("Front", kellyVertFront2), V("Detail", kellyVertDetail)];
const KELLY_ETOUPE = [V("Front", kellyEtoupeFront), V("Worn", kellyEtoupeWorn), V("Front", kellyEtoupeFront2), V("Detail", kellyEtoupeDetail)];

const BOUNCING_BLANC = [V("Front", bFront), V("Worn", bWorn), V("Side", bSide), V("Back", bBack), V("Detail", bDetail), V("Above", bAbove)];
// Colourways that have their own shot set get exactly their own photos —
// never another colourway's photos mixed in.
const bouncingAlt = (front: string, back: string, above: string) => [V("Front", front), V("Back", back), V("Above", above)];

// Original Hermes product videos, hotlinked from assets.hermes.com
// (user instruction 2026-11-09/10 — use the original video wherever the
// original site has one). HLS (.m3u8) streams; each URL was verified to
// return HTTP 200 with the store's Referer, and the poster frame visually
// confirmed to show the correct dress. Played via hls.js (Safari plays HLS
// natively). The video is one per product — the same clip for both
// colourways of the Mid-length dress.
const HERMES_VIDEO = "https://assets.hermes.com/is/content/hermesproduct/";
const MID_DRESS_VIDEO = HERMES_VIDEO + "6H2542D502_video_102-AVS.m3u8";
const LONG_DRESS_VIDEO = HERMES_VIDEO + "6H2521D7DC_video_102-AVS.m3u8";

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
const HERMES_IMG = "https://assets.hermes.com/is/image/hermesproduct/";
const HERMES_Q = "?wid=750&hei=1000&fit=fit&$product_default_bg$";
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
export function galleryForProduct(
  p: GalleryProduct & { galleryViews?: string[] },
  colorIndex: number,
): { label: string; src: string; video: boolean; videoSrc?: string }[] {
  const name = p.name;
  const colorName = (p.colors?.[colorIndex]?.name ?? p.colors?.[0]?.name ?? "").toLowerCase();
  let set: { label: string; src: string; videoSrc?: string }[] | null = null;

  if (name === "Kelly Pocket 18 belt") {
    set = /vert/.test(colorName) ? KELLY_VERT : /etoupe/.test(colorName) ? KELLY_ETOUPE : KELLY_NOIR;
  } else if (name === "Bouncing sneaker, Blanc") {
    if (/noir|black/.test(colorName)) set = bouncingAlt(bNoirFront, bNoirBack, bNoirAbove);
    else if (/bleu|blue/.test(colorName)) set = bouncingAlt(bBlueFront, bBlueBack, bBlueAbove);
    else set = BOUNCING_BLANC;
  } else if (name === "Mid-length buttoned dress") {
    set = /blue/.test(colorName) ? MID_BLUE : MID_NOIR;
  } else if (name === "Long sleeveless dress") {
    set = LONG_SET;
  } else if (name === "Picotin Lock 18 pocket bag") {
    set = [V("Front", picFront), V("Side", picSide), V("Above", picAbove), V("Back", picBack)];
  } else if (name === "Le Philateliste du Faubourg scarf 90") {
    set = [V("Flat", phFlat), V("Worn", phWorn), V("Detail", phDetail)];
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
