// Real URLs for categories, products and the contact page (History API
// routing), matching the original hermes.com/fr/fr URL shape:
// /fr/fr/category/<path>/, /fr/fr/product/<slug>-<REF>/ and
// /fr/fr/contact-us/. Deep links are served by vercel.json rewrites (every
// app path serves index.html) and parsed back here on load and on popstate.
// Views that cannot be routed safely (cart, checkout, admin, info
// pages other than contact, about) are left unrouted: navigating to them
// does not push a history entry, so browser Back returns to the last
// routed view.
//
// France conversion (Stage B, 2026-11-21): every category path below is
// the original hermes.com/fr/fr URL, transcribed from the France nav
// enumeration (france-routing-table.json) and re-keyed to A1's field map
// (page-field-map.json). DO-NOT-BUILD links (7) are deliberately absent:
// the menu renders them as plain non-clickable text and a direct load
// falls back to the parent page. Legacy /us/en/ deep links are accepted
// by parseUrl and resolved to the same France view (canonical URLs stay
// /fr/fr/).

export type ParsedRoute =
  | { kind: "home" }
  | { kind: "category"; cat: string; sub?: string }
  | { kind: "product"; id: number }
  | { kind: "faq"; topic: string }
  | { kind: "contact" }
  | { kind: "account" }
  | { kind: "cart" }
  | { kind: "bespoke" }
  | { kind: "defile"; page: string };

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

// France category URLs, verified against the original's own URLs
// (france-routing-table.json). Key is `${cat}|${sub.toLowerCase()}`
// where cat/sub are this store's view values. Aggregate ("Toute la
// collection") pages list exactly their extracted child pages; the
// Collections pages (Kelly, Chaînes d'ancre, L'Equestre, Les
// Fétiches, Moments précieux) and Hermessence have no extracted
// position field yet (Stage B approximation: name-substring syn).
const CATEGORY_PATHS: Record<string, string> = {
  "femme|": "femme",
  "homme|": "homme",
  "maroquinerie|": "maroquinerie",
  "bijouterie|": "bijouterie",
  "montres|": "montres",
  "parfums-et-maquillage|": "parfums-et-maquillage",
  "maison-art-de-vivre|": "maison-art-de-vivre",
  "equitation|": "equitation",
  "cadeaux|": "cadeaux",
  "femme|chaussures": "femme/chaussures",
  "femme|collection automne-hiver 2026": "femme/pret-a-porter/collection-automne-hiver",
  "femme|collection printemps-été 2027": "femme/pret-a-porter/collection-printemps-ete",
  "femme|manteaux et vestes": "femme/pret-a-porter/manteaux-et-vestes",
  "femme|cuir": "femme/pret-a-porter/cuir",
  "femme|robes et jupes": "femme/pret-a-porter/robes-et-jupes",
  "femme|hauts et chemises": "femme/pret-a-porter/hauts-et-chemises",
  "femme|pantalons et shorts": "femme/pret-a-porter/pantalons-et-shorts",
  "femme|mailles et twillaines": "femme/pret-a-porter/mailles-et-twillaines",
  "femme|t-shirts et sweat-shirts": "femme/pret-a-porter/t-shirts-et-sweatshirts",
  "femme|bain": "femme/pret-a-porter/bain",
  "femme|sandales": "femme/chaussures/sandales",
  "femme|sneakers": "femme/chaussures/sneakers",
  "femme|bottes et bottines": "femme/chaussures/bottes-et-bottines",
  "femme|escarpins": "femme/chaussures/escarpins",
  "femme|mocassins et mules": "femme/chaussures/mocassins-et-mules",
  "femme|ballerines": "femme/chaussures/ballerines",
  "femme|carrés et accessoires de soie": "femme/carres-chales-et-echarpes/carres-et-accessoires-de-soie",
  "femme|châles et écharpes en cachemire": "femme/carres-chales-et-echarpes/chales-et-echarpes-en-cachemire",
  "femme|twillys et autres petits formats": "femme/carres-chales-et-echarpes/twillys-et-autres-petits-formats",
  "femme|carrés, châles et écharpes": "femme/carres-chales-et-echarpes",
  "femme|bracelets": "femme/accessoires-bijoux/bracelets",
  "femme|colliers et pendentifs": "femme/accessoires-bijoux/colliers-et-pendentifs",
  "femme|boucles d'oreilles": "femme/accessoires-bijoux/boucles-d-oreilles",
  "femme|bagues": "femme/accessoires-bijoux/bagues",
  "femme|bijouterie fantaisie": "femme/accessoires-bijoux",
  "femme|ceintures": "femme/ceintures",
  "femme|chapeaux et gants": "femme/accessoires",
  "femme|accessoires cheveux": "femme/accessoires-cheveux",
  "homme|écharpes et carrés": "homme/cravates-echarpes-et-carres/echarpes-et-carres",
  "homme|collection automne-hiver 2026": "homme/pret-a-porter/collection-automne-hiver",
  "homme|manteaux et parkas": "homme/pret-a-porter/manteaux-et-parkas",
  "homme|blousons et vestes": "homme/pret-a-porter/blousons-et-vestes",
  "homme|mailles": "homme/pret-a-porter/mailles",
  "homme|chemises": "homme/pret-a-porter/chemises",
  "homme|t-shirts et sweat-shirts": "homme/pret-a-porter/t-shirts-et-sweat-shirts",
  "homme|pantalons et shorts": "homme/pret-a-porter/pantalons-et-shorts",
  "homme|bain": "homme/pret-a-porter/bain",
  "homme|sneakers": "homme/chaussures/sneakers",
  "homme|sandales": "homme/chaussures/sandales",
  "homme|mocassins et mules": "homme/chaussures/mocassins-et-mules",
  "homme|derbies et richelieus": "homme/chaussures/derbies-et-richelieus",
  "homme|bottes et bottines": "homme/chaussures/bottes-et-bottines",
  "homme|chaussures": "homme/chaussures",
  "homme|cravates, nœuds papillons et pochettes": "homme/cravates-echarpes-et-carres/cravates-noeuds-papillons-et-pochettes",
  "homme|bijouterie fantaisie": "homme/accessoires/accessoires-bijoux",
  "homme|ceintures": "homme/ceintures",
  "homme|chapeaux et gants": "homme/accessoires/chapeaux-et-gants",
  "maroquinerie|petite maroquinerie": "maroquinerie/petite-maroquinerie",
  "maroquinerie|sacs et pochettes femme": "maroquinerie/sacs-et-pochettes/sacs-et-pochettes-femme",
  "maroquinerie|sacs et pochettes homme": "maroquinerie/sacs-et-pochettes/sacs-et-pochettes-homme",
  "maroquinerie|sacs et pochettes": "maroquinerie/sacs-et-pochettes",
  "maroquinerie|portefeuilles to go": "maroquinerie/petite-maroquinerie/portefeuilles-to-go",
  "maroquinerie|portefeuilles": "maroquinerie/petite-maroquinerie/portefeuilles",
  "maroquinerie|porte-cartes": "maroquinerie/petite-maroquinerie/porte-cartes",
  "maroquinerie|trousses et étuis": "maroquinerie/petite-maroquinerie/trousses-et-etuis",
  "maroquinerie|accessoires de sac": "maroquinerie/accessoires/accessoires-de-sac",
  "maroquinerie|bandoulières": "maroquinerie/accessoires/bandoulieres",
  "maroquinerie|lire et écrire": "maroquinerie/accessoires/lire-et-ecrire",
  "maroquinerie|valises et sacs de voyage": "maroquinerie/voyage/valises-et-sacs-de-voyage",
  "maroquinerie|accessoires de voyage": "maroquinerie/voyage/accessoires-de-voyage",
  "bijouterie|bijoux en or": "bijouterie/bijoux-en-or",
  "bijouterie|bagues": "bijouterie/bijoux-en-or/bagues",
  "bijouterie|alliances": "bijouterie/bijoux-en-or/alliances",
  "bijouterie|bracelets": "bijouterie/bijoux-en-or/bracelets",
  "bijouterie|colliers et pendentifs": "bijouterie/bijoux-en-or/colliers-et-pendentifs",
  "bijouterie|bijoux d'oreilles": "bijouterie/bijoux-en-or/bijoux-doreilles",
  "bijouterie|bagues en argent": "bijouterie/bijoux-en-argent/bagues",
  "bijouterie|bracelets en argent": "bijouterie/bijoux-en-argent/bracelets",
  "bijouterie|colliers et pendentifs en argent": "bijouterie/bijoux-en-argent/colliers-et-pendentifs",
  "bijouterie|bijoux d'oreilles en argent": "bijouterie/bijoux-en-argent/bijoux-doreilles",
  "bijouterie|bijoux en argent": "bijouterie/bijoux-en-argent",
  "bijouterie|kelly": "bijouterie/collections/kelly",
  "bijouterie|chaînes d'ancre": "bijouterie/collections/chaine-d-ancre",
  "bijouterie|l'equestre": "bijouterie/collections/l-equestre",
  "bijouterie|les fétiches": "bijouterie/collections/les-fetiches",
  "bijouterie|moments précieux": "bijouterie/collections/moments-precieux",
  "bijouterie|homme": "bijouterie/homme",
  "montres|femme": "montres/femme",
  "montres|homme": "montres/homme",
  "montres|bracelets": "montres/bracelets",
  "montres|apple watch hermès": "montres/apple-watch-hermes",
  "parfums-et-maquillage|maquillage": "maquillage",
  "parfums-et-maquillage|hermessence": "parfums/collection-hermessence",
  "parfums-et-maquillage|femme": "parfums/femme",
  "parfums-et-maquillage|homme": "parfums/homme",
  "parfums-et-maquillage|bain": "parfums/lart-de-vivre",
  "parfums-et-maquillage|parfums": "parfums",
  "parfums-et-maquillage|lèvres": "maquillage/levres",
  "parfums-et-maquillage|teint": "maquillage/teint",
  "parfums-et-maquillage|yeux": "maquillage/yeux",
  "parfums-et-maquillage|mains": "maquillage/mains",
  "parfums-et-maquillage|accessoires": "maquillage/accessoires",
  "maison-art-de-vivre|art de la table": "maison/art-de-la-table",
  "maison-art-de-vivre|textiles": "maison/textiles",
  "maison-art-de-vivre|objets": "maison/objets",
  "maison-art-de-vivre|mobilier et luminaires": "maison/mobilier-et-luminaires",
  "maison-art-de-vivre|bureau et écriture": "maison/bureau-et-ecriture",
  "maison-art-de-vivre|trousses et linge de toilette": "maison/trousses-et-linge-de-toilette",
  "maison-art-de-vivre|enfant et naissance": "maison-art-de-vivre/enfant-et-naissance",
  "maison-art-de-vivre|plage": "maison-art-de-vivre/plage",
  "maison-art-de-vivre|sports et plein air": "maison-art-de-vivre/sports-et-plein-air",
  "maison-art-de-vivre|univers tech": "maison-art-de-vivre/univers-tech",
  "maison-art-de-vivre|petit h": "petit-h",
  "equitation|cheval": "equitation/cheval",
  "equitation|cavalier": "equitation/cavalier",
  "cadeaux|pour femme": "cadeaux/cadeaux-pour-femme",
  "cadeaux|pour homme": "cadeaux/cadeaux-pour-homme",
  "cadeaux|enfants et naissance": "cadeaux/cadeaux-enfants-et-naissance",
  "cadeaux|pour chien": "cadeaux/cadeaux-pour-chien",
};

const REVERSE_PATHS: Record<string, { cat: string; sub?: string }> = {
  "femme": { cat: "femme" },
  "homme": { cat: "homme" },
  "maroquinerie": { cat: "maroquinerie" },
  "bijouterie": { cat: "bijouterie" },
  "montres": { cat: "montres" },
  "parfums-et-maquillage": { cat: "parfums-et-maquillage" },
  "maison-art-de-vivre": { cat: "maison-art-de-vivre" },
  "equitation": { cat: "equitation" },
  "cadeaux": { cat: "cadeaux" },
  "femme/chaussures": { cat: "femme", sub: "Chaussures" },
  "femme/pret-a-porter/collection-automne-hiver": { cat: "femme", sub: "Collection automne-hiver 2026" },
  "femme/pret-a-porter/collection-printemps-ete": { cat: "femme", sub: "Collection printemps-été 2027" },
  "femme/pret-a-porter/manteaux-et-vestes": { cat: "femme", sub: "Manteaux et vestes" },
  "femme/pret-a-porter/cuir": { cat: "femme", sub: "Cuir" },
  "femme/pret-a-porter/robes-et-jupes": { cat: "femme", sub: "Robes et jupes" },
  "femme/pret-a-porter/hauts-et-chemises": { cat: "femme", sub: "Hauts et chemises" },
  "femme/pret-a-porter/pantalons-et-shorts": { cat: "femme", sub: "Pantalons et shorts" },
  "femme/pret-a-porter/mailles-et-twillaines": { cat: "femme", sub: "Mailles et twillaines" },
  "femme/pret-a-porter/t-shirts-et-sweatshirts": { cat: "femme", sub: "T-shirts et sweat-shirts" },
  "femme/pret-a-porter/bain": { cat: "femme", sub: "Bain" },
  "femme/chaussures/sandales": { cat: "femme", sub: "Sandales" },
  "femme/chaussures/sneakers": { cat: "femme", sub: "Sneakers" },
  "femme/chaussures/bottes-et-bottines": { cat: "femme", sub: "Bottes et bottines" },
  "femme/chaussures/escarpins": { cat: "femme", sub: "Escarpins" },
  "femme/chaussures/mocassins-et-mules": { cat: "femme", sub: "Mocassins et mules" },
  "femme/chaussures/ballerines": { cat: "femme", sub: "Ballerines" },
  "femme/carres-chales-et-echarpes/carres-et-accessoires-de-soie": { cat: "femme", sub: "Carrés et accessoires de soie" },
  "femme/carres-chales-et-echarpes/chales-et-echarpes-en-cachemire": { cat: "femme", sub: "Châles et écharpes en cachemire" },
  "femme/carres-chales-et-echarpes/twillys-et-autres-petits-formats": { cat: "femme", sub: "Twillys et autres petits formats" },
  "femme/carres-chales-et-echarpes": { cat: "femme", sub: "Carrés, châles et écharpes" },
  "femme/accessoires-bijoux/bracelets": { cat: "femme", sub: "Bracelets" },
  "femme/accessoires-bijoux/colliers-et-pendentifs": { cat: "femme", sub: "Colliers et pendentifs" },
  "femme/accessoires-bijoux/boucles-d-oreilles": { cat: "femme", sub: "Boucles d'oreilles" },
  "femme/accessoires-bijoux/bagues": { cat: "femme", sub: "Bagues" },
  "femme/accessoires-bijoux": { cat: "femme", sub: "Bijouterie fantaisie" },
  "femme/ceintures": { cat: "femme", sub: "Ceintures" },
  "femme/accessoires": { cat: "femme", sub: "Chapeaux et gants" },
  "femme/accessoires-cheveux": { cat: "femme", sub: "Accessoires cheveux" },
  "homme/cravates-echarpes-et-carres/echarpes-et-carres": { cat: "homme", sub: "Écharpes et carrés" },
  "homme/pret-a-porter/collection-automne-hiver": { cat: "homme", sub: "Collection automne-hiver 2026" },
  "homme/pret-a-porter/manteaux-et-parkas": { cat: "homme", sub: "Manteaux et parkas" },
  "homme/pret-a-porter/blousons-et-vestes": { cat: "homme", sub: "Blousons et vestes" },
  "homme/pret-a-porter/mailles": { cat: "homme", sub: "Mailles" },
  "homme/pret-a-porter/chemises": { cat: "homme", sub: "Chemises" },
  "homme/pret-a-porter/t-shirts-et-sweat-shirts": { cat: "homme", sub: "T-shirts et sweat-shirts" },
  "homme/pret-a-porter/pantalons-et-shorts": { cat: "homme", sub: "Pantalons et shorts" },
  "homme/pret-a-porter/bain": { cat: "homme", sub: "Bain" },
  "homme/chaussures/sneakers": { cat: "homme", sub: "Sneakers" },
  "homme/chaussures/sandales": { cat: "homme", sub: "Sandales" },
  "homme/chaussures/mocassins-et-mules": { cat: "homme", sub: "Mocassins et mules" },
  "homme/chaussures/derbies-et-richelieus": { cat: "homme", sub: "Derbies et richelieus" },
  "homme/chaussures/bottes-et-bottines": { cat: "homme", sub: "Bottes et bottines" },
  "homme/chaussures": { cat: "homme", sub: "Chaussures" },
  "homme/cravates-echarpes-et-carres/cravates-noeuds-papillons-et-pochettes": { cat: "homme", sub: "Cravates, nœuds papillons et pochettes" },
  "homme/accessoires/accessoires-bijoux": { cat: "homme", sub: "Bijouterie fantaisie" },
  "homme/ceintures": { cat: "homme", sub: "Ceintures" },
  "homme/accessoires/chapeaux-et-gants": { cat: "homme", sub: "Chapeaux et gants" },
  "maroquinerie/petite-maroquinerie": { cat: "maroquinerie", sub: "Petite maroquinerie" },
  "maroquinerie/sacs-et-pochettes/sacs-et-pochettes-femme": { cat: "maroquinerie", sub: "Sacs et pochettes femme" },
  "maroquinerie/sacs-et-pochettes/sacs-et-pochettes-homme": { cat: "maroquinerie", sub: "Sacs et pochettes homme" },
  "maroquinerie/sacs-et-pochettes": { cat: "maroquinerie", sub: "Sacs et pochettes" },
  "maroquinerie/petite-maroquinerie/portefeuilles-to-go": { cat: "maroquinerie", sub: "Portefeuilles To Go" },
  "maroquinerie/petite-maroquinerie/portefeuilles": { cat: "maroquinerie", sub: "Portefeuilles" },
  "maroquinerie/petite-maroquinerie/porte-cartes": { cat: "maroquinerie", sub: "Porte-cartes" },
  "maroquinerie/petite-maroquinerie/trousses-et-etuis": { cat: "maroquinerie", sub: "Trousses et étuis" },
  "maroquinerie/accessoires/accessoires-de-sac": { cat: "maroquinerie", sub: "Accessoires de sac" },
  "maroquinerie/accessoires/bandoulieres": { cat: "maroquinerie", sub: "Bandoulières" },
  "maroquinerie/accessoires/lire-et-ecrire": { cat: "maroquinerie", sub: "Lire et écrire" },
  "maroquinerie/voyage/valises-et-sacs-de-voyage": { cat: "maroquinerie", sub: "Valises et sacs de voyage" },
  "maroquinerie/voyage/accessoires-de-voyage": { cat: "maroquinerie", sub: "Accessoires de voyage" },
  "bijouterie/bijoux-en-or": { cat: "bijouterie", sub: "Bijoux en or" },
  "bijouterie/bijoux-en-or/bagues": { cat: "bijouterie", sub: "Bagues" },
  "bijouterie/bijoux-en-or/alliances": { cat: "bijouterie", sub: "Alliances" },
  "bijouterie/bijoux-en-or/bracelets": { cat: "bijouterie", sub: "Bracelets" },
  "bijouterie/bijoux-en-or/colliers-et-pendentifs": { cat: "bijouterie", sub: "Colliers et pendentifs" },
  "bijouterie/bijoux-en-or/bijoux-doreilles": { cat: "bijouterie", sub: "Bijoux d'oreilles" },
  "bijouterie/bijoux-en-argent/bagues": { cat: "bijouterie", sub: "Bagues en argent" },
  "bijouterie/bijoux-en-argent/bracelets": { cat: "bijouterie", sub: "Bracelets en argent" },
  "bijouterie/bijoux-en-argent/colliers-et-pendentifs": { cat: "bijouterie", sub: "Colliers et pendentifs en argent" },
  "bijouterie/bijoux-en-argent/bijoux-doreilles": { cat: "bijouterie", sub: "Bijoux d'oreilles en argent" },
  "bijouterie/bijoux-en-argent": { cat: "bijouterie", sub: "Bijoux en argent" },
  "bijouterie/collections/kelly": { cat: "bijouterie", sub: "Kelly" },
  "bijouterie/collections/chaine-d-ancre": { cat: "bijouterie", sub: "Chaînes d'ancre" },
  "bijouterie/collections/l-equestre": { cat: "bijouterie", sub: "L'Equestre" },
  "bijouterie/collections/les-fetiches": { cat: "bijouterie", sub: "Les Fétiches" },
  "bijouterie/collections/moments-precieux": { cat: "bijouterie", sub: "Moments précieux" },
  "bijouterie/homme": { cat: "bijouterie", sub: "Homme" },
  "montres/femme": { cat: "montres", sub: "Femme" },
  "montres/homme": { cat: "montres", sub: "Homme" },
  "montres/bracelets": { cat: "montres", sub: "Bracelets" },
  "montres/apple-watch-hermes": { cat: "montres", sub: "Apple Watch Hermès" },
  "maquillage": { cat: "parfums-et-maquillage", sub: "Maquillage" },
  "parfums/collection-hermessence": { cat: "parfums-et-maquillage", sub: "Hermessence" },
  "parfums/femme": { cat: "parfums-et-maquillage", sub: "Femme" },
  "parfums/homme": { cat: "parfums-et-maquillage", sub: "Homme" },
  "parfums/lart-de-vivre": { cat: "parfums-et-maquillage", sub: "Bain" },
  "parfums": { cat: "parfums-et-maquillage", sub: "Parfums" },
  "maquillage/levres": { cat: "parfums-et-maquillage", sub: "Lèvres" },
  "maquillage/teint": { cat: "parfums-et-maquillage", sub: "Teint" },
  "maquillage/yeux": { cat: "parfums-et-maquillage", sub: "Yeux" },
  "maquillage/mains": { cat: "parfums-et-maquillage", sub: "Mains" },
  "maquillage/accessoires": { cat: "parfums-et-maquillage", sub: "Accessoires" },
  "maison/art-de-la-table": { cat: "maison-art-de-vivre", sub: "Art de la table" },
  "maison/textiles": { cat: "maison-art-de-vivre", sub: "Textiles" },
  "maison/objets": { cat: "maison-art-de-vivre", sub: "Objets" },
  "maison/mobilier-et-luminaires": { cat: "maison-art-de-vivre", sub: "Mobilier et luminaires" },
  "maison/bureau-et-ecriture": { cat: "maison-art-de-vivre", sub: "Bureau et écriture" },
  "maison/trousses-et-linge-de-toilette": { cat: "maison-art-de-vivre", sub: "Trousses et linge de toilette" },
  "maison-art-de-vivre/enfant-et-naissance": { cat: "maison-art-de-vivre", sub: "Enfant et naissance" },
  "maison-art-de-vivre/plage": { cat: "maison-art-de-vivre", sub: "Plage" },
  "maison-art-de-vivre/sports-et-plein-air": { cat: "maison-art-de-vivre", sub: "Sports et plein air" },
  "maison-art-de-vivre/univers-tech": { cat: "maison-art-de-vivre", sub: "Univers tech" },
  "petit-h": { cat: "maison-art-de-vivre", sub: "petit h" },
  "equitation/cheval": { cat: "equitation", sub: "Cheval" },
  "equitation/cavalier": { cat: "equitation", sub: "Cavalier" },
  "cadeaux/cadeaux-pour-femme": { cat: "cadeaux", sub: "Pour femme" },
  "cadeaux/cadeaux-pour-homme": { cat: "cadeaux", sub: "Pour homme" },
  "cadeaux/cadeaux-enfants-et-naissance": { cat: "cadeaux", sub: "Enfants et naissance" },
  "cadeaux/cadeaux-pour-chien": { cat: "cadeaux", sub: "Pour chien" },
  "horlogerie": { cat: "montres", sub: "Horlogerie" },
};

export const TOP_CATS = ["femme", "homme", "maroquinerie", "bijouterie", "montres", "parfums-et-maquillage", "maison-art-de-vivre", "equitation", "cadeaux", "about"];

export function categoryUrl(cat: string, sub?: string): string {
  const key = `${cat}|${(sub ?? "").toLowerCase()}`;
  const known = CATEGORY_PATHS[key];
  if (known) return `/fr/fr/category/${known}/`;
  const slug = sub ? slugify(sub) : "";
  return slug ? `/fr/fr/category/${cat}/${slug}/` : `/fr/fr/category/${cat}/`;
}

export function productUrl(name: string, refCode: string, id: number): string {
  const ref = (refCode || "").replace(/\s+/g, "");
  const slug = slugify(name);
  if (ref) return `/fr/fr/product/${slug ? `${slug}-` : ""}${ref}/`;
  return `/fr/fr/product/${slug ? `${slug}-` : ""}${id}/`;
}

// The original's contact page URL (hermes.com/fr/fr).
export function contactUrl(): string {
  return "/fr/fr/contact-us/";
}

// The original's bespoke equestrian editorial page (hermes.com/fr/fr):
// /fr/fr/content/329243-sur-mesure-equitation/ (the Equestrian menu's
// SELLES item links here, not to a product listing).
export function bespokeUrl(): string {
  return "/fr/fr/content/329243-sur-mesure-equitation/";
}

// The original's Femme Défilé editorial pages (hermes.com/fr/fr), built
// in-app (2026-11-21 audit fix): the three Femme Défilé menu items link
// here, not to product listings. Returns null for any other page key.
export function defileUrl(page: string): string | null {
  if (page === "defile-femme-pe2027") return "/fr/fr/content/402900-defile-femme-printemps-ete/";
  if (page === "defile-femme-ah2026") return "/fr/fr/content/345618-defile-femme-automne-hiver-2026/";
  if (page === "defile-femme-ah2026-chapitre2") return "/fr/fr/content/401282-defile-femme-automne-hiver-chapitre2/";
  return null;
}

// The account page URL — the original's login page: /fr/fr/login/
// renders the account view (a direct load of /fr/fr/account/ still
// does too).
export function accountUrl(): string {
  return "/fr/fr/login/";
}

// The original's France FAQ topic URL: /fr/fr/faq/<group>/<slug>/
// (groups: achat-en-ligne, compte-client, objets, la-maison-hermes).
// Unused by the app today — faqPath() in App.tsx builds the URL from the
// topic's own group; direct loads resolve via the App-level fallback.
export function faqUrl(topic: string): string {
  return `/fr/fr/faq/achat-en-ligne/${slugify(topic)}/`;
}

// The product ref embedded in a product URL path, if the path is one.
// Accepts the canonical /fr/fr/ prefix and the legacy /us/en/ prefix.
export function productRefFromPath(path: string): string | null {
  const clean = path.split("?")[0]?.split("#")[0] ?? "";
  const m = clean.replace(/\/+$/, "").match(/\/(?:fr\/fr|us\/en)\/product\/([^/]+)$/);
  if (!m || !m[1]) return null;
  const last = m[1].split("-").pop() ?? "";
  return last || null;
}

// Legacy /us/en/ deep links resolve to the same France view: the first
// segment maps to the France parent of the same top section. Old
// /women/fashion-jewelry/ routes retarget to the France Bijouterie
// fantaisie pages (Femme /fr/fr/category/femme/accessoires-bijoux/).
const LEGACY_CAT: Record<string, string> = {
  "women": "femme",
  "men": "homme",
  "leather-goods": "maroquinerie",
  "leather": "maroquinerie",
  "jewelry": "bijouterie",
  "watches": "montres",
  "timepieces": "montres",
  "fragrances": "parfums-et-maquillage",
  "make-up": "parfums-et-maquillage",
  "home": "maison-art-de-vivre",
  "home-art-living": "maison-art-de-vivre",
  "equestrian": "equitation",
  "gifts": "cadeaux",
  "petit-h": "maison-art-de-vivre",
};
const LEGACY_FJ: Record<string, string> = {
  "": "Bijouterie fantaisie",
  "bracelets": "Bracelets",
  "necklaces": "Colliers et pendentifs",
  "earrings": "Boucles d'oreilles",
  "rings": "Bagues",
  "hair-accessories-and-combs": "Accessoires cheveux",
};

export function parseUrl(
  path: string,
  products: { id: number; refCode: string }[],
  subsByCat: Record<string, string[]>,
): ParsedRoute | null {
  let clean = (path.split("?")[0]?.split("#")[0] ?? "").replace(/^\/+/, "").replace(/\/+$/, "");
  if (clean === "") return { kind: "home" };
  let legacy = false;
  if (clean.startsWith("fr/fr/")) clean = clean.slice("fr/fr/".length);
  else if (clean.startsWith("us/en/")) { clean = clean.slice("us/en/".length); legacy = true; }
  if (clean === "") return { kind: "home" };
  if (clean === "contact-us") return { kind: "contact" };
  if (clean === "account") return { kind: "account" };
  if (clean === "login") return { kind: "account" };
  if (clean === "content/329243-sur-mesure-equitation" || clean === "content/344534-bespoke-equestrian") return { kind: "bespoke" };
  if (clean === "content/402900-defile-femme-printemps-ete") return { kind: "defile", page: "defile-femme-pe2027" };
  if (clean === "content/345618-defile-femme-automne-hiver-2026") return { kind: "defile", page: "defile-femme-ah2026" };
  if (clean === "content/401282-defile-femme-automne-hiver-chapitre2") return { kind: "defile", page: "defile-femme-ah2026-chapitre2" };
  // The cart is a full page on the original (/fr/fr/cart/) — routed so
  // browser Back from it returns to the page the user came from.
  if (clean === "cart") return { kind: "cart" };
  if (clean.startsWith("faq/online-shopping/")) {
    const topic = clean.slice("faq/online-shopping/".length).split("/")[0] ?? "";
    // Legacy US-build FAQ URL — the France topics live under
    // /faq/achat-en-ligne|compte-client|objets|la-maison-hermes/ and
    // resolve via the App-level fallback. Only the old payment URL keeps
    // a mapping (to the France paiement topic).
    if (topic === "payment") return { kind: "faq", topic: "paiement" };
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
    // Superseded URL (live-confirmed 2026-11-21: the original 404s
    // /fr/fr/category/parfums-et-maquillage/parfums/; the real Parfums
    // page is /fr/fr/category/parfums/). Same pattern as the collections
    // fix's old year-suffixed URLs: fall back to the parent instead of
    // rendering the sub (the slug below would otherwise match "Parfums").
    if (rest === "parfums-et-maquillage/parfums") return { kind: "category", cat: "parfums-et-maquillage" };
    const segs = rest.split("/").filter(Boolean);
    const first = segs[0] ?? "";
    // Legacy /us/en/ deep link: map the top section to its France parent.
    if (legacy) {
      // Old /women/fashion-jewelry/ routes retarget to the France
      // Bijouterie fantaisie pages.
      if (first === "women" && segs[1] === "fashion-jewelry") {
        const fj = LEGACY_FJ[segs[2] ?? ""] ?? "Bijouterie fantaisie";
        return { kind: "category", cat: "femme", sub: fj };
      }
      if (first === "fashion-jewelry") {
        const fj = LEGACY_FJ[segs[1] ?? ""] ?? "Bijouterie fantaisie";
        return { kind: "category", cat: "femme", sub: fj };
      }
      const mapped = LEGACY_CAT[first];
      if (!mapped) return null;
      if (segs.length === 1) return { kind: "category", cat: mapped };
      const subSlug = segs.slice(1).join("/");
      const candidates = subsByCat[mapped] ?? [];
      const match = candidates.find((s) => slugify(s) === subSlug);
      if (match) return { kind: "category", cat: mapped, sub: match };
      // Unknown sub slug: fall back to the France parent rather than home.
      return { kind: "category", cat: mapped };
    }
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
