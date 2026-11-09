// Standalone API client for the Vercel build.
//
// There is no working backend API yet (the Render backend is a health-check
// server only), so this client serves the store from the bundled static
// catalog (data.ts) and keeps accounts, orders, wishlist, newsletter and
// admin edits in the visitor's own browser (localStorage). Nothing is sent to
// a server and no order is a real purchase — checkout creates a local demo
// order number only.
//
// Later, when a real backend exposes POST {action, args} at VITE_API_URL +
// "/actions", set the VITE_API_URL env var in Vercel: getStorefront and
// searchProducts will try the remote first and fall back to this local data
// if the remote is unreachable. Writes stay local until the backend exists.
//
// The exported `api` object has the same method names and response shapes as
// the original server actions, so App.tsx works unchanged. `ApiResponse` is
// the same utility type App.tsx uses to derive Product/Settings.

import { PRODUCTS, SETTINGS, type Product, type Settings } from "./data";

// Demo admin password for THIS standalone build only (client-side gate).
// It is NOT the live store's server password. The admin panel here edits only
// this browser's local copy.
const DEMO_ADMIN_PASSWORD = "admin123";

// Admin sign-in email — the SINGLE configurable value for the admin login.
// The admin signs in with this Gmail address + the admin password above.
// Change this one line to change the admin email everywhere.
export const ADMIN_EMAIL = "nauman4915@gmail.com";

// The admin gate: the password must match AND the email must match
// ADMIN_EMAIL (case-insensitive). This is a client-side demo gate only —
// it keeps the admin panel behind the admin's Gmail, not just a password.
// If ADMIN_EMAIL is ever cleared, the gate falls back to password-only.
function isAdmin(email: string | undefined, password: string | undefined): boolean {
  if (password !== DEMO_ADMIN_PASSWORD) return false;
  if (!ADMIN_EMAIL) return true;
  return (email ?? "").trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

export type ApiResponse<TApi, TAction extends keyof TApi> =
  TApi[TAction] extends (...args: never[]) => Promise<infer R> ? R : never;

// ---------------------------------------------------------------------------
// Local store (localStorage, one key per collection)
// ---------------------------------------------------------------------------
const P = "hv-";
type Json = unknown;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(P + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
function write(key: string, value: Json): void {
  try {
    localStorage.setItem(P + key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — keep running without persistence */
  }
}
function nextId(key: string, start: number): number {
  const cur = read<number>(key, start);
  write(key, cur + 1);
  return cur;
}

type LocalUser = { id: number; name: string; email: string; password: string; disabled: number; viewedByAdmin: number; createdAt: string };
type LocalOrder = { id: number; customerName: string; email: string; total: number; status: string; items: string; address: string; paymentMethod: string; deliveryOption: string; viewedByAdmin: number; createdAt: string };
type LocalWish = { id: number; email: string; productId: number; productName: string };
type LocalNotify = { id: number; productId: number; productName: string; email: string };
type LocalReturn = { id: number; orderId: number; email: string; reason: string; status: string };

function parseArr<T>(raw: string | undefined, fallback: T[]): T[] {
  if (!raw) return fallback;
  try {
    const v = JSON.parse(raw) as unknown;
    return Array.isArray(v) ? (v as T[]) : fallback;
  } catch {
    return fallback;
  }
}
function parseColors(raw: string | undefined): Product["colors"] {
  return parseArr<{ name: string; hex: string; available: boolean }>(raw, []).filter(
    (c) => c && typeof c === "object" && "name" in c && "hex" in c,
  ).map((c) => ({ name: String(c.name), hex: String(c.hex), available: c.available !== false }));
}
function parseSizes(raw: string | undefined): Product["sizeOptions"] {
  return parseArr<{ label: string; available: boolean }>(raw, []).filter(
    (s) => s && typeof s === "object" && "label" in s,
  ).map((s) => ({ label: String(s.label), available: s.available !== false }));
}

// Products: static catalog + local admin edits (overrides), admin-added
// products, and admin-deleted ids.
function getProducts(): Product[] {
  const overrides = read<Record<string, Partial<Product>>>("products-overrides", {});
  const added = read<Product[]>("products-new", []);
  const deleted = new Set(read<number[]>("products-deleted", []));
  const base = PRODUCTS.filter((p) => !deleted.has(p.id)).map((p) => {
    const ov = overrides[String(p.id)];
    return ov ? { ...p, ...ov } : p;
  });
  const merged = [...base, ...added];
  merged.sort((a, b) => (a.sortOrder - b.sortOrder) || (a.id - b.id));
  return merged;
}
function getSettings(): Settings {
  const ov = read<Partial<Settings> | null>("settings", null);
  return ov ? { ...SETTINGS, ...ov } : SETTINGS;
}

// ---------------------------------------------------------------------------
// Optional remote proxy (only when VITE_API_URL is set)
// ---------------------------------------------------------------------------
const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ?? "";

async function remote<T>(action: string, args: Record<string, unknown>): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);
    const res = await fetch(`${API_URL}/actions`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action, args }),
      signal: ctrl.signal,
    }).finally(() => clearTimeout(t));
    if (!res.ok) return null;
    const json = (await res.json()) as T;
    return json && typeof json === "object" ? json : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------
export const api = {
  async getStorefront(_args: Record<string, never>): Promise<{ products: Product[]; settings: Settings }> {
    const r = await remote<{ products: Product[]; settings: Settings }>("getStorefront", {});
    if (r && Array.isArray(r.products) && r.settings) return r;
    return { products: getProducts(), settings: getSettings() };
  },

  async searchProducts(args: { query: string }): Promise<{ products: Product[] }> {
    const q = (args.query ?? "").trim().toLowerCase();
    const r = await remote<{ products: Product[] }>("searchProducts", { query: args.query ?? "" });
    if (r && Array.isArray(r.products)) return r;
    const all = getProducts();
    if (!q) return { products: all };
    return {
      products: all.filter((p) =>
        [p.name, p.category, p.subcategory, p.line, p.material, p.theme].join(" ").toLowerCase().includes(q),
      ),
    };
  },

  async placeOrder(args: {
    customerName: string; email: string; address: string; paymentMethod: string; deliveryOption: string;
    items: { productId: number; name: string; price: number; qty: number; color: string; size: string }[];
  }): Promise<{ ok: true; orderId: number; total: number }> {
    const total = args.items.reduce((s, i) => s + i.price * i.qty, 0);
    const orders = read<LocalOrder[]>("orders", []);
    const id = nextId("next-order-id", 1001);
    orders.unshift({
      id, customerName: args.customerName, email: args.email, total, status: "Pending",
      items: JSON.stringify(args.items), address: args.address, paymentMethod: args.paymentMethod,
      deliveryOption: args.deliveryOption, viewedByAdmin: 0, createdAt: new Date().toISOString(),
    });
    write("orders", orders);
    return { ok: true as const, orderId: id, total };
  },

  async registerUser(args: { name: string; email: string; password: string }): Promise<{ ok: boolean; message: string; name: string }> {
    const users = read<LocalUser[]>("users", []);
    const email = args.email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === email)) {
      return { ok: false, message: "An account with this email already exists. Please sign in.", name: "" };
    }
    users.push({ id: nextId("next-user-id", 101), name: args.name, email: args.email, password: args.password, disabled: 0, viewedByAdmin: 0, createdAt: new Date().toISOString() });
    write("users", users);
    return { ok: true, message: "Account created. Welcome to the Maison.", name: args.name };
  },

  async loginUser(args: { email: string; password: string }): Promise<{ ok: boolean; message: string; name: string }> {
    const users = read<LocalUser[]>("users", []);
    const u = users.find((x) => x.email.toLowerCase() === args.email.trim().toLowerCase());
    if (!u || u.password !== args.password) return { ok: false, message: "Email or password not recognised.", name: "" };
    if (u.disabled) return { ok: false, message: "This account has been disabled. Please contact customer service.", name: "" };
    return { ok: true, message: "Signed in.", name: u.name };
  },

  async myOrders(args: { email: string }): Promise<{ orders: LocalOrder[] }> {
    const orders = read<LocalOrder[]>("orders", []);
    const email = args.email.trim().toLowerCase();
    return { orders: orders.filter((o) => o.email.toLowerCase() === email) };
  },

  async subscribeNewsletter(args: { email: string }): Promise<{ ok: true }> {
    const list = read<{ id: number; email: string }[]>("newsletter", []);
    const email = args.email.trim().toLowerCase();
    if (!list.some((n) => n.email.toLowerCase() === email)) {
      list.push({ id: nextId("next-news-id", 1), email: args.email });
      write("newsletter", list);
    }
    return { ok: true as const };
  },

  async requestNotify(args: { productId: number; productName: string; email: string }): Promise<{ ok: true }> {
    const list = read<LocalNotify[]>("notify", []);
    list.push({ id: nextId("next-notify-id", 1), productId: args.productId, productName: args.productName, email: args.email });
    write("notify", list);
    return { ok: true as const };
  },

  async recordVisit(_args: { visitorKey: string; day: string }): Promise<{ ok: true }> {
    const visits = read<Record<string, number>>("visits", {});
    visits[_args.day] = (visits[_args.day] ?? 0) + 1;
    write("visits", visits);
    return { ok: true as const };
  },

  async recordProductView(args: { productId: number }): Promise<{ ok: true }> {
    const views = read<Record<string, number>>("views", {});
    const k = String(args.productId);
    views[k] = (views[k] ?? 0) + 1;
    write("views", views);
    return { ok: true as const };
  },

  async trackOrder(args: { orderId: number; email: string }): Promise<{ found: boolean; order: LocalOrder | null }> {
    const orders = read<LocalOrder[]>("orders", []);
    const o = orders.find((x) => x.id === args.orderId);
    if (!o || o.email.toLowerCase() !== args.email.trim().toLowerCase()) return { found: false, order: null };
    return { found: true, order: o };
  },

  async myExtras(args: { email: string }): Promise<{
    wishlist: { id: number; productId: number; productName: string }[];
    notify: { id: number; productName: string }[];
    returns: { id: number; orderId: number; status: string; reason: string }[];
  }> {
    const email = args.email.trim().toLowerCase();
    const wishlist = read<LocalWish[]>("wishlist", []).filter((w) => w.email.toLowerCase() === email);
    const notify = read<LocalNotify[]>("notify", []).filter((n) => n.email.toLowerCase() === email);
    const returns = read<LocalReturn[]>("returns", []).filter((r) => r.email.toLowerCase() === email);
    return {
      wishlist: wishlist.map((w) => ({ id: w.id, productId: w.productId, productName: w.productName })),
      notify: notify.map((n) => ({ id: n.id, productName: n.productName })),
      returns: returns.map((r) => ({ id: r.id, orderId: r.orderId, status: r.status, reason: r.reason })),
    };
  },

  async toggleWishlist(args: { email: string; productId: number; productName: string }): Promise<{ ok: true; added: boolean }> {
    const list = read<LocalWish[]>("wishlist", []);
    const email = args.email.trim().toLowerCase();
    const ex = list.find((w) => w.email.toLowerCase() === email && w.productId === args.productId);
    if (ex) {
      write("wishlist", list.filter((w) => w.id !== ex.id));
      return { ok: true as const, added: false };
    }
    list.push({ id: nextId("next-wish-id", 1), email: args.email, productId: args.productId, productName: args.productName });
    write("wishlist", list);
    return { ok: true as const, added: true };
  },

  async requestReturn(args: { orderId: number; email: string; reason: string }): Promise<{ ok: boolean; message: string }> {
    const orders = read<LocalOrder[]>("orders", []);
    const o = orders.find((x) => x.id === args.orderId);
    if (!o || o.email.toLowerCase() !== args.email.trim().toLowerCase()) {
      return { ok: false, message: "Order not found for this email." };
    }
    if (Date.now() - new Date(o.createdAt).getTime() > 30 * 24 * 3600 * 1000) {
      return { ok: false, message: "The 30-day return window for this order has passed." };
    }
    const returns = read<LocalReturn[]>("returns", []);
    returns.push({ id: nextId("next-return-id", 1), orderId: args.orderId, email: args.email, reason: args.reason, status: "Requested" });
    write("returns", returns);
    return { ok: true, message: "Return requested. Our customer service will contact you." };
  },

  async adminData(args: { email?: string; password: string }): Promise<{
    ok: boolean;
    stats: { products: number; orders: number; users: number; revenue: number; newsletter: number; notify: number; visitsTotal: number; visitsToday: number; pendingOrders: number; newAccountsToday: number; newOrders: number; returns: number };
    visitsByDay: { day: string; count: number }[];
    salesByDay: { day: string; total: number; orders: number }[];
    salesByCategory: { category: string; total: number; qty: number }[];
    salesByProduct: { name: string; total: number; qty: number }[];
    topSelling: { name: string; total: number; qty: number }[];
    mostViewed: { productId: number; productName: string; views: number }[];
    productViews: { productId: number; views: number }[];
    orders: LocalOrder[];
    users: { id: number; name: string; email: string; disabled: number; viewedByAdmin: number; totalOrders: number; totalSpent: number; createdAt: string }[];
    newsletter: { id: number; email: string }[];
    notify: { id: number; productName: string; email: string }[];
    returns: { id: number; orderId: number; email: string; reason: string; status: string }[];
  }> {
    const empty = {
      ok: false,
      stats: { products: 0, orders: 0, users: 0, revenue: 0, newsletter: 0, notify: 0, visitsTotal: 0, visitsToday: 0, pendingOrders: 0, newAccountsToday: 0, newOrders: 0, returns: 0 },
      visitsByDay: [] as { day: string; count: number }[],
      salesByDay: [] as { day: string; total: number; orders: number }[],
      salesByCategory: [] as { category: string; total: number; qty: number }[],
      salesByProduct: [] as { name: string; total: number; qty: number }[],
      topSelling: [] as { name: string; total: number; qty: number }[],
      mostViewed: [] as { productId: number; productName: string; views: number }[],
      productViews: [] as { productId: number; views: number }[],
      orders: [] as LocalOrder[],
      users: [] as { id: number; name: string; email: string; disabled: number; viewedByAdmin: number; totalOrders: number; totalSpent: number; createdAt: string }[],
      newsletter: [] as { id: number; email: string }[],
      notify: [] as { id: number; productName: string; email: string }[],
      returns: [] as { id: number; orderId: number; email: string; reason: string; status: string }[],
    };
    if (!isAdmin(args.email, args.password)) return empty;
    const prods = getProducts();
    const ords = read<LocalOrder[]>("orders", []);
    const usrs = read<LocalUser[]>("users", []);
    const news = read<{ id: number; email: string }[]>("newsletter", []);
    const noti = read<LocalNotify[]>("notify", []);
    const vis = read<Record<string, number>>("visits", {});
    const pvs = read<Record<string, number>>("views", {});
    const rets = read<LocalReturn[]>("returns", []);
    const today = new Date().toISOString().slice(0, 10);
    const paid = ords.filter((o) => o.status !== "Cancelled");
    const revenue = paid.reduce((s, o) => s + o.total, 0);
    const visitsByDay = Object.entries(vis).sort((a, b) => b[0].localeCompare(a[0])).map(([day, count]) => ({ day, count }));
    const sMap = new Map<string, { total: number; orders: number }>();
    paid.forEach((o) => {
      const d = o.createdAt.slice(0, 10);
      const cur = sMap.get(d) ?? { total: 0, orders: 0 };
      cur.total += o.total; cur.orders += 1; sMap.set(d, cur);
    });
    const salesByDay = [...sMap.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([day, v]) => ({ day, total: v.total, orders: v.orders }));
    const catMap = new Map<string, { total: number; qty: number }>();
    const prodMap = new Map<string, { total: number; qty: number }>();
    const prodById = new Map(prods.map((pr) => [pr.id, pr]));
    paid.forEach((o) => {
      let items: { productId?: number; name: string; price: number; qty: number }[] = [];
      try { items = JSON.parse(o.items) as { productId?: number; name: string; price: number; qty: number }[]; } catch { items = []; }
      items.forEach((it) => {
        const amt = it.price * it.qty;
        const cat = (it.productId ? prodById.get(it.productId)?.category : undefined) ?? "Other";
        const c = catMap.get(cat) ?? { total: 0, qty: 0 };
        c.total += amt; c.qty += it.qty; catMap.set(cat, c);
        const pm = prodMap.get(it.name) ?? { total: 0, qty: 0 };
        pm.total += amt; pm.qty += it.qty; prodMap.set(it.name, pm);
      });
    });
    const salesByProduct = [...prodMap.entries()].map(([name, v]) => ({ name, total: v.total, qty: v.qty })).sort((a, b) => b.total - a.total);
    const nameById = new Map(prods.map((pr) => [pr.id, pr.name]));
    const mostViewed = Object.entries(pvs).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([pid, views]) => ({
      productId: Number(pid), productName: nameById.get(Number(pid)) ?? `#${pid}`, views,
    }));
    return {
      ok: true,
      stats: {
        products: prods.length, orders: ords.length, users: usrs.length, revenue,
        newsletter: news.length, notify: noti.length,
        visitsTotal: Object.values(vis).reduce((s, n) => s + n, 0),
        visitsToday: vis[today] ?? 0,
        pendingOrders: ords.filter((o) => o.status === "Pending" || o.status === "Placed").length,
        newAccountsToday: usrs.filter((u) => u.createdAt.slice(0, 10) === today).length,
        newOrders: ords.filter((o) => !o.viewedByAdmin).length,
        returns: rets.length,
      },
      visitsByDay, salesByDay,
      salesByCategory: [...catMap.entries()].map(([category, v]) => ({ category, total: v.total, qty: v.qty })).sort((a, b) => b.total - a.total),
      salesByProduct, topSelling: salesByProduct.slice(0, 5), mostViewed,
      productViews: Object.entries(pvs).map(([pid, views]) => ({ productId: Number(pid), views })),
      orders: ords,
      users: usrs.map((u) => {
        const uo = ords.filter((o) => o.email.toLowerCase() === u.email.toLowerCase() && o.status !== "Cancelled");
        return { id: u.id, name: u.name, email: u.email, disabled: u.disabled, viewedByAdmin: u.viewedByAdmin, totalOrders: uo.length, totalSpent: uo.reduce((s, o) => s + o.total, 0), createdAt: u.createdAt };
      }),
      newsletter: news,
      notify: noti.map((n) => ({ id: n.id, productName: n.productName, email: n.email })),
      returns: rets.map((r) => ({ id: r.id, orderId: r.orderId, email: r.email, reason: r.reason, status: r.status })),
    };
  },

  async adminMarkViewed(args: { email?: string; password: string; kind: "order" | "user"; id: number }): Promise<{ ok: boolean }> {
    if (!isAdmin(args.email, args.password)) return { ok: false };
    if (args.kind === "order") {
      const orders = read<LocalOrder[]>("orders", []);
      write("orders", orders.map((o) => (o.id === args.id ? { ...o, viewedByAdmin: 1 } : o)));
    } else {
      const users = read<LocalUser[]>("users", []);
      write("users", users.map((u) => (u.id === args.id ? { ...u, viewedByAdmin: 1 } : u)));
    }
    return { ok: true };
  },

  async adminSetUserDisabled(args: { email?: string; password: string; id: number; disabled: boolean }): Promise<{ ok: boolean }> {
    if (!isAdmin(args.email, args.password)) return { ok: false };
    const users = read<LocalUser[]>("users", []);
    write("users", users.map((u) => (u.id === args.id ? { ...u, disabled: args.disabled ? 1 : 0 } : u)));
    return { ok: true };
  },

  async adminDeleteUser(args: { email?: string; password: string; id: number }): Promise<{ ok: boolean }> {
    if (!isAdmin(args.email, args.password)) return { ok: false };
    write("users", read<LocalUser[]>("users", []).filter((u) => u.id !== args.id));
    return { ok: true };
  },

  async adminSaveProduct(args: {
    email?: string; password: string; id?: number; name: string; category: string; subcategory?: string; theme?: string;
    price: number; priceLabel?: string; status?: string; line?: string; material?: string; modelSize?: string;
    metallicFinish?: string; colorsJson?: string; description?: string; story?: string; tone?: string;
    glyph?: string; refCode?: string; galleryViews?: string; applePay?: boolean; sizeOptions?: string;
    accordions?: string; shippingDelay?: string; detailLines?: string;
  }): Promise<{ ok: boolean; id: number }> {
    if (!isAdmin(args.email, args.password)) return { ok: false, id: 0 };
    const overrides = read<Record<string, Partial<Product>>>("products-overrides", {});
    const added = read<Product[]>("products-new", []);
    const vals: Partial<Product> = {
      name: args.name, category: args.category, subcategory: args.subcategory ?? "",
      theme: args.theme ?? "", price: args.price, priceLabel: args.priceLabel ?? "",
      status: args.status ?? "available", line: args.line ?? "", material: args.material ?? "",
      modelSize: args.modelSize ?? "", metallicFinish: args.metallicFinish ?? "",
      colors: parseColors(args.colorsJson), description: args.description ?? "",
      story: args.story ?? "", tone: args.tone ?? "#e9ede8", glyph: args.glyph ?? "◆",
      ...(args.refCode !== undefined ? { refCode: args.refCode } : {}),
      ...(args.galleryViews !== undefined ? { galleryViews: parseArr<string>(args.galleryViews, []) } : {}),
      ...(args.applePay !== undefined ? { applePay: args.applePay } : {}),
      ...(args.sizeOptions !== undefined ? { sizeOptions: parseSizes(args.sizeOptions) } : {}),
      ...(args.accordions !== undefined ? { accordions: parseArr<string>(args.accordions, []) } : {}),
      ...(args.shippingDelay !== undefined ? { shippingDelay: args.shippingDelay } : {}),
      ...(args.detailLines !== undefined ? { detailLines: parseArr<string>(args.detailLines, []) } : {}),
    };
    if (args.id && args.id > 0) {
      // Existing product: if it is a static product, store an override;
      // if it is an admin-added product, update it in place.
      const inAdded = added.find((p) => p.id === args.id);
      if (inAdded) {
        write("products-new", added.map((p) => (p.id === args.id ? { ...p, ...vals } : p)));
      } else {
        overrides[String(args.id)] = { ...(overrides[String(args.id)] ?? {}), ...vals };
        write("products-overrides", overrides);
      }
      return { ok: true, id: args.id };
    }
    const all = getProducts();
    const id = Math.max(0, ...all.map((p) => p.id)) + 1;
    const created: Product = {
      id, name: args.name, category: args.category, subcategory: args.subcategory ?? "",
      theme: args.theme ?? "", price: args.price, priceLabel: args.priceLabel ?? "",
      status: args.status ?? "available", line: args.line ?? "", material: args.material ?? "",
      modelSize: args.modelSize ?? "", metallicFinish: args.metallicFinish ?? "",
      colors: parseColors(args.colorsJson), description: args.description ?? "",
      story: args.story ?? "", tone: args.tone ?? "#e9ede8", glyph: args.glyph ?? "◆",
      sortOrder: 999, refCode: args.refCode ?? "",
      galleryViews: parseArr<string>(args.galleryViews, []), applePay: args.applePay ?? true,
      sizeOptions: parseSizes(args.sizeOptions), accordions: parseArr<string>(args.accordions, ["PRODUCT DETAILS", "CARE", "DELIVERY & RETURNS", "GIFTING"]),
      shippingDelay: args.shippingDelay ?? "", detailLines: parseArr<string>(args.detailLines, []),
    };
    write("products-new", [...added, created]);
    return { ok: true, id };
  },

  async adminDeleteProduct(args: { email?: string; password: string; id: number }): Promise<{ ok: boolean }> {
    if (!isAdmin(args.email, args.password)) return { ok: false };
    const deleted = new Set(read<number[]>("products-deleted", []));
    deleted.add(args.id);
    write("products-deleted", [...deleted]);
    write("products-new", read<Product[]>("products-new", []).filter((p) => p.id !== args.id));
    return { ok: true };
  },

  async adminUpdateOrder(args: { email?: string; password: string; id: number; status: string }): Promise<{ ok: boolean }> {
    if (!isAdmin(args.email, args.password)) return { ok: false };
    const orders = read<LocalOrder[]>("orders", []);
    write("orders", orders.map((o) => (o.id === args.id ? { ...o, status: args.status } : o)));
    return { ok: true };
  },

  async adminSaveSettings(args: { email?: string; password: string; settings: Settings }): Promise<{ ok: boolean }> {
    if (!isAdmin(args.email, args.password)) return { ok: false };
    write("settings", args.settings);
    return { ok: true };
  },

  async adminUploadLogo(args: { email?: string; password: string; dataBase64: string; mimeType: string; clear: boolean }): Promise<{ ok: boolean; logoUrl: string }> {
    if (!isAdmin(args.email, args.password)) return { ok: false, logoUrl: "" };
    if (args.clear || !args.dataBase64) {
      const cur = read<Partial<Settings> | null>("settings", null);
      write("settings", { ...(cur ?? {}), logoUrl: "" });
      return { ok: true, logoUrl: "" };
    }
    const mime = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(args.mimeType) ? args.mimeType : "image/png";
    const logoUrl = `data:${mime};base64,${args.dataBase64}`;
    try {
      const cur = read<Partial<Settings> | null>("settings", null);
      write("settings", { ...(cur ?? {}), logoUrl });
    } catch {
      return { ok: false, logoUrl: "" };
    }
    return { ok: true, logoUrl };
  },
};
