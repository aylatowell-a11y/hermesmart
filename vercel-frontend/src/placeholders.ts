// Placeholder imagery for the standalone Vercel build.
//
// The 209 product photos live outside the GitHub repo (binary files cannot be
// pushed with the text-only GitHub tools), so this build has no real product
// photos yet. Every image below is a clearly-marked placeholder — a warm
// studio-tone SVG with the product/label name and "PHOTO COMING SOON" — never
// a fake product photo and never a copied Hermes image. When the real photos
// are added to the repo (see README.md), swap these back to the photo imports.
//
// Logos are text-based SVGs (serif "HERMÈS / PARIS" and an "H" monogram),
// not copied artwork.

function svgURI(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const TONES = ["#e9ede8", "#ece9e2", "#eef0ea", "#f0eae6", "#eee9df", "#e7eae4", "#f3ecec", "#e8e2d6"];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function wrapLines(text: string, max: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max && cur) { lines.push(cur.trim()); cur = w; }
    else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

/** Portrait (4:5) product/photo placeholder. Tone varies by label so tiles differ. */
export function photoPlaceholder(label: string, sub?: string): string {
  const tone = TONES[hashStr(label) % TONES.length] ?? "#e9ede8";
  const lines = wrapLines(label, 26);
  const nameY = 520;
  const nameSvg = lines.map((l, i) => `<text x="400" y="${nameY + i * 38}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="#5c554a">${esc(l)}</text>`).join("");
  const subSvg = sub
    ? `<text x="400" y="${nameY + lines.length * 38 + 6}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="24" fill="#8a8378">${esc(sub.length > 34 ? sub.slice(0, 34) + "…" : sub)}</text>`
    : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">`
    + `<rect width="800" height="1000" fill="${tone}"/>`
    + `<text x="400" y="460" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="220" fill="#c9bfae" opacity="0.55">H</text>`
    + nameSvg + subSvg
    + `<text x="400" y="${nameY + lines.length * 38 + 52}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="20" letter-spacing="4" fill="#8a8378">PHOTO COMING SOON</text>`
    + `</svg>`;
  return svgURI(svg);
}

/** Wide (16:9) hero/editorial placeholder. */
export function heroPlaceholder(label: string): string {
  const tone = TONES[hashStr(label) % TONES.length] ?? "#e9ede8";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">`
    + `<rect width="1600" height="900" fill="${tone}"/>`
    + `<text x="800" y="420" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="240" fill="#c9bfae" opacity="0.55">H</text>`
    + `<text x="800" y="520" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="44" font-style="italic" fill="#5c554a">${esc(label)}</text>`
    + `<text x="800" y="580" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" letter-spacing="5" fill="#8a8378">PHOTO COMING SOON</text>`
    + `</svg>`;
  return svgURI(svg);
}

/** Text-based HERMÈS / PARIS lockup (serif). `dark` = dark text on light ground. */
function logoSVG(dark: boolean): string {
  const fill = dark ? "#191919" : "#ffffff";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="130" viewBox="0 0 420 130">`
    + `<text x="210" y="66" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="54" letter-spacing="12" fill="${fill}">HERMÈS</text>`
    + `<text x="210" y="106" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" letter-spacing="16" fill="${fill}">PARIS</text>`
    + `</svg>`;
  return svgURI(svg);
}

/** Carriage-emblem stand-in: a serif "H" monogram in a thin double frame. */
function carriageSVG(dark: boolean): string {
  const c = dark ? "#191919" : "#ffffff";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">`
    + `<rect x="6" y="6" width="108" height="108" fill="none" stroke="${c}" stroke-width="2"/>`
    + `<rect x="12" y="12" width="96" height="96" fill="none" stroke="${c}" stroke-width="1"/>`
    + `<text x="60" y="82" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="64" fill="${c}">H</text>`
    + `</svg>`;
  return svgURI(svg);
}

/** Loading-mark stand-in (the real build uses the user's horse GIFs). */
function loadingSVG(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">`
    + `<circle cx="100" cy="100" r="86" fill="none" stroke="#191919" stroke-width="2"/>`
    + `<text x="100" y="132" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="96" fill="#191919">H</text>`
    + `</svg>`;
  return svgURI(svg);
}

// Named exports matching the asset imports App.tsx used to have.
export const heroImg = heroPlaceholder("Threading ideas");
export const heroBenchImg = heroPlaceholder("Threading ideas");
export const runwayImg = heroPlaceholder("Runway show");
export const outdoorsImg = heroPlaceholder("The great outdoors");
export const kellyImg = heroPlaceholder("Kelly");
export const carriageBlackImg = carriageSVG(true);
export const carriageWhiteImg = carriageSVG(false);
export const logoBlackImg = logoSVG(true);
export const logoWhiteImg = logoSVG(false);
export const loadingHorseTrotGif = loadingSVG();
export const loadingHorseJumpRunGif = loadingSVG();
export const loadingHorseGallopGif = loadingSVG();
