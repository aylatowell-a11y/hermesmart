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
import { API_URL, ADMIN_EMAIL } from "../config";
import { sha256Hex } from "../sha256";

export { ADMIN_EMAIL };

// ---------------------------------------------------------------------------
// Admin gate — client-side demo only (SECURITY 2026-11-18).
// The admin password is NEVER in the shipped bundle: the owner sets it once
// in the Admin Panel and only its SHA-256 hash is kept in this browser's
// localStorage (hv-admin-password-hash). The admin email comes from the
// VITE_ADMIN_EMAIL env var (see config.ts); if it is unset the gate is
// password-only. Honest limit: a client-side gate can always be bypassed
// with DevTools in the visitor's own browser — it keeps casual visitors
// out of the panel, it is not server authentication. Real admin auth needs
// the backend (VITE_API_URL). All admin effects are own-browser only.
// ---------------------------------------------------------------------------
const ADMIN_HASH_KEY = "admin-password-hash";
const SESSION_SALT = ":admin-session";

export function adminPasswordIsSet(): boolean {
  return read<string | null>(ADMIN_HASH_KEY, null) !== null;
}

function isAdmin(email: string | undefined, password: string | undefined): boolean {
  if (!password) return false;
  if (ADMIN_EMAIL && (email ?? "").trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return false;
  const hash = read<string | null>(ADMIN_HASH_KEY, null);
  if (!hash) return false;
  return sha256Hex(password) === hash;
}

function isAdminSession(email: string | undefined, token: string | undefined): boolean {
  if (!token) return false;
  if (ADMIN_EMAIL && (email ?? "").trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return false;
  const hash = read<string | null>(ADMIN_HASH_KEY, null);
  if (!hash) return false;
  return token === sha256Hex(hash + SESSION_SALT);
}

/** Admin proof by password OR by a valid session token (minted at sign-in). */
function adminAuthed(args: { email?: string; password?: string; sessionToken?: string }): boolean {
  if (args.sessionToken && isAdminSession(args.email, args.sessionToken)) return true;
  if (!args.password) return false;
  if (loginThrottleLocked()) return false;
  return isAdmin(args.email, args.password);
}

/** First-run setup: only allowed while no admin password exists yet. */
// First-run bootstrap: with no admin password set, can this email reach
// the setup form? Only the configured admin email — or any email when no
// admin email is configured (set VITE_ADMIN_EMAIL to restrict it to the
// owner's Gmail). Without this, the first-run setup form inside the Admin
// Panel would be unreachable: every route into the panel requires a
// password that does not exist yet.
export function adminSetupNeeded(email: string): boolean {
  return !adminPasswordIsSet() && (!ADMIN_EMAIL || email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase());
}

export function adminSetupPassword(password: string): { ok: boolean; message: string } {
  if (adminPasswordIsSet()) return { ok: false, message: "Admin password is already set. Change it from inside the Admin Panel." };
  if (!isStrongPassword(password)) return { ok: false, message: "Password must be at least 10 characters with an upper-case letter, a lower-case letter, a digit and a special character." };
  write(ADMIN_HASH_KEY, sha256Hex(password));
  return { ok: true, message: "Admin password set." };
}

export function adminChangePassword(args: { email?: string; password: string; newPassword: string }): { ok: boolean; message: string; token: string } {
  if (!isAdmin(args.email, args.password)) return { ok: false, message: "Current password is incorrect.", token: "" };
  if (!isStrongPassword(args.newPassword)) return { ok: false, message: "New password must be at least 10 characters with an upper-case letter, a lower-case letter, a digit and a special character.", token: "" };
  const hash = sha256Hex(args.newPassword);
  write(ADMIN_HASH_KEY, hash);
  return { ok: true, message: "Admin password changed.", token: sha256Hex(hash + SESSION_SALT) };
}

/** Mint a session token after a password sign-in — the token, not the password, is what gets persisted. */
export function adminCreateSession(args: { email?: string; password: string }): { ok: boolean; token: string } {
  if (!isAdmin(args.email, args.password)) return { ok: false, token: "" };
  resetLoginThrottle();
  const hash = read<string | null>(ADMIN_HASH_KEY, null) ?? "";
  return { ok: true, token: sha256Hex(hash + SESSION_SALT) };
}

export function adminSessionValid(args: { email?: string; token: string }): boolean {
  return isAdminSession(args.email, args.token);
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

// US-namespace helpers (DUAL-MODE §1.7): catalogue-dependent keys live under
// "hv-us-" so France and US product overrides / settings never leak into
// each other. Accounts, orders, chat, wishlist and the admin password hash
// stay on the shared "hv-" prefix via read()/write() — a visitor stays
// signed in across modes.
const US_P = "hv-us-";
function readUs<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(US_P + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
function writeUs(key: string, value: Json): void {
  try {
    localStorage.setItem(US_P + key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — keep running without persistence */
  }
}
function nextId(key: string, start: number): number {
  const cur = read<number>(key, start);
  write(key, cur + 1);
  return cur;
}

// ---------------------------------------------------------------------------
// Validation + abuse caps (SECURITY 2026-11-18). localStorage is ~5 MB and
// shared by every collection, so unbounded lists can fill it and silently
// break all later writes (write() swallows quota errors). Caps keep the
// newest entries and drop the oldest.
// ---------------------------------------------------------------------------
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((email ?? "").trim());
}

export function isStrongPassword(pw: string): boolean {
  return pw.length >= 10 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /\d/.test(pw) && /[^A-Za-z0-9]/.test(pw);
}

// User passwords are stored as SHA-256(email + "\n" + password) — never
// plaintext. (Client-side hashing only hides them from casual reads of
// localStorage; real auth needs the backend.)
function hashUserPassword(email: string, password: string): string {
  return sha256Hex(email.trim().toLowerCase() + "\n" + password);
}

// Sign-in throttling: 5 failed password attempts -> 60 s lockout, per
// browser. Cheap friction against local guessing; not a server lockout.
const THROTTLE_KEY = "login-throttle";
const THROTTLE_MAX = 5;
const THROTTLE_MS = 60 * 1000;
export function loginThrottleStatus(): { locked: boolean; waitSec: number } {
  const t = read<{ count: number; lockedUntil: number }>(THROTTLE_KEY, { count: 0, lockedUntil: 0 });
  const waitSec = Math.max(0, Math.ceil((t.lockedUntil - Date.now()) / 1000));
  return { locked: waitSec > 0, waitSec };
}
function loginThrottleLocked(): boolean {
  return loginThrottleStatus().locked;
}
function recordLoginFailure(): void {
  const t = read<{ count: number; lockedUntil: number }>(THROTTLE_KEY, { count: 0, lockedUntil: 0 });
  const count = Date.now() > t.lockedUntil ? 1 : t.count + 1;
  write(THROTTLE_KEY, { count, lockedUntil: count >= THROTTLE_MAX ? Date.now() + THROTTLE_MS : 0 });
}
function resetLoginThrottle(): void {
  write(THROTTLE_KEY, { count: 0, lockedUntil: 0 });
}

// passwordHash is SHA-256(email + "\n" + password). Older rows stored a
// plaintext `password` field — loginUser migrates them on next sign-in.
type LocalUser = { id: number; name: string; email: string; passwordHash: string; password?: string; disabled: number; viewedByAdmin: number; createdAt: string };
type LocalOrder = { id: number; customerName: string; email: string; total: number; status: string; items: string; address: string; paymentMethod: string; deliveryOption: string; viewedByAdmin: number; createdAt: string };
type LocalWish = { id: number; email: string; productId: number; productName: string };
type LocalNotify = { id: number; productId: number; productName: string; email: string };
type LocalReturn = { id: number; orderId: number; email: string; reason: string; status: string };
export type LocalChat = { id: number; from: "customer" | "admin"; text: string; name: string; readByAdmin: number; createdAt: string };
export type LocalContact = { id: number; first: string; last: string; email: string; subject: string; message: string; createdAt: string };

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
  return parseArr<{ name: string; hex: string; available: boolean; pdpName?: string }>(raw, []).filter(
    (c) => c && typeof c === "object" && "name" in c && "hex" in c,
  ).map((c) => ({ name: String(c.name), hex: String(c.hex), available: c.available !== false, ...(c.pdpName ? { pdpName: c.pdpName } : {}) }));
}
function parseSizes(raw: string | undefined): Product["sizeOptions"] {
  return parseArr<{ label: string; available: boolean }>(raw, []).filter(
    (s) => s && typeof s === "object" && "label" in s,
  ).map((s) => ({ label: String(s.label), available: s.available !== false }));
}

// Products: static catalog + local admin edits (overrides), admin-added
// products, and admin-deleted ids.
function getProducts(): Product[] {
  const overrides = readUs<Record<string, Partial<Product>>>("products-overrides", {});
  const added = readUs<Product[]>("products-new", []);
  const deleted = new Set(readUs<number[]>("products-deleted", []));
  const base = PRODUCTS.filter((p) => !deleted.has(p.id)).map((p) => {
    const ov = overrides[String(p.id)];
    return ov ? { ...p, ...ov } : p;
  });
  const merged = [...base, ...added];
  merged.sort((a, b) => (a.sortOrder - b.sortOrder) || (a.id - b.id));
  return merged;
}
function getSettings(): Settings {
  const ov = readUs<Partial<Settings> | null>("settings", null);
  return ov ? { ...SETTINGS, ...ov } : SETTINGS;
}

// ---------------------------------------------------------------------------
// Optional remote proxy (only when VITE_API_URL is set — see config.ts)
// ---------------------------------------------------------------------------
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
    if (orders.length > 500) orders.length = 500;
    write("orders", orders);
    return { ok: true as const, orderId: id, total };
  },

  async registerUser(args: { name: string; email: string; password: string }): Promise<{ ok: boolean; message: string; name: string }> {
    const users = read<LocalUser[]>("users", []);
    const email = args.email.trim().toLowerCase();
    if (!isValidEmail(email)) return { ok: false, message: "Please enter a valid email address.", name: "" };
    if (!isStrongPassword(args.password)) return { ok: false, message: "Password must be at least 10 characters with an upper-case letter, a lower-case letter, a digit and a special character.", name: "" };
    if (users.length >= 500) return { ok: false, message: "Registration is temporarily unavailable. Please try again later.", name: "" };
    if (users.some((u) => u.email.toLowerCase() === email)) {
      return { ok: false, message: "An account with this email already exists. Please sign in.", name: "" };
    }
    users.push({ id: nextId("next-user-id", 101), name: args.name, email: args.email, passwordHash: hashUserPassword(email, args.password), disabled: 0, viewedByAdmin: 0, createdAt: new Date().toISOString() });
    write("users", users);
    return { ok: true, message: "Account created. Welcome to the Maison.", name: args.name };
  },

  async loginUser(args: { email: string; password: string }): Promise<{ ok: boolean; message: string; name: string }> {
    if (loginThrottleLocked()) return { ok: false, message: "Too many sign-in attempts. Please try again in a minute.", name: "" };
    const users = read<LocalUser[]>("users", []);
    const email = args.email.trim().toLowerCase();
    const u = users.find((x) => x.email.toLowerCase() === email);
    const hash = hashUserPassword(email, args.password);
    const ok = !!u && (u.passwordHash ? u.passwordHash === hash : u.password === args.password);
    if (!ok || !u) { recordLoginFailure(); return { ok: false, message: "Email or password not recognised.", name: "" }; }
    if (u.disabled) return { ok: false, message: "This account has been disabled. Please contact customer service.", name: "" };
    // Migrate legacy plaintext rows to hashes on first successful sign-in.
    if (!u.passwordHash) {
      write("users", users.map((x) => (x.id === u.id ? { ...x, passwordHash: hash, password: undefined } : x)));
    }
    resetLoginThrottle();
    return { ok: true, message: "Signed in.", name: u.name };
  },

  // Re-check a stored session on load: does the account still exist and is
  // it still enabled? (A disabled account must not stay signed in.)
  async getUserStatus(args: { email: string }): Promise<{ exists: boolean; disabled: boolean; name: string }> {
    const u = read<LocalUser[]>("users", []).find((x) => x.email.toLowerCase() === args.email.trim().toLowerCase());
    return { exists: !!u, disabled: !!u?.disabled, name: u?.name ?? "" };
  },

  async myOrders(args: { email: string }): Promise<{ orders: LocalOrder[] }> {
    const orders = read<LocalOrder[]>("orders", []);
    const email = args.email.trim().toLowerCase();
    return { orders: orders.filter((o) => o.email.toLowerCase() === email) };
  },

  async subscribeNewsletter(args: { email: string }): Promise<{ ok: true }> {
    const list = read<{ id: number; email: string }[]>("newsletter", []);
    const email = args.email.trim().toLowerCase();
    if (!isValidEmail(email)) return { ok: true as const };
    if (!list.some((n) => n.email.toLowerCase() === email)) {
      list.push({ id: nextId("next-news-id", 1), email: args.email });
      if (list.length > 1000) list.splice(0, list.length - 1000);
      write("newsletter", list);
    }
    return { ok: true as const };
  },

  async requestNotify(args: { productId: number; productName: string; email: string }): Promise<{ ok: true }> {
    const list = read<LocalNotify[]>("notify", []);
    const email = args.email.trim().toLowerCase();
    if (!isValidEmail(email)) return { ok: true as const };
    if (!list.some((n) => n.productId === args.productId && n.email.toLowerCase() === email)) {
      list.push({ id: nextId("next-notify-id", 1), productId: args.productId, productName: args.productName, email: args.email });
      if (list.length > 1000) list.splice(0, list.length - 1000);
      write("notify", list);
    }
    return { ok: true as const };
  },

  // Contact-form messages. There is no email backend in this build, so
  // messages are stored locally (newest first, capped) for the admin to
  // read in the Admin Panel Chat tab — they are NOT silently dropped.
  async contactMessage(args: { first: string; last: string; email: string; subject: string; message: string }): Promise<{ ok: boolean }> {
    if (!isValidEmail(args.email)) return { ok: false };
    const list = read<LocalContact[]>("contact", []);
    list.unshift({
      id: nextId("next-contact-id", 1),
      first: args.first.slice(0, 100), last: args.last.slice(0, 100),
      email: args.email.slice(0, 254), subject: args.subject.slice(0, 200),
      message: args.message.slice(0, 2000), createdAt: new Date().toISOString(),
    });
    if (list.length > 200) list.length = 200;
    write("contact", list);
    return { ok: true };
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
    if (list.length > 500) list.splice(0, list.length - 500);
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
    if (returns.length > 500) returns.splice(0, returns.length - 500);
    write("returns", returns);
    return { ok: true, message: "Return requested. Our customer service will contact you." };
  },

  // Chat (localStorage hv-chat — the same store the customer ChatBubble
  // and the Admin Panel chat tab read, so both sides see one thread).
  async getChatMessages(_args: Record<string, never>): Promise<{ messages: LocalChat[] }> {
    return { messages: read<LocalChat[]>("chat", []) };
  },

  async sendChatMessage(args: { from: "customer" | "admin"; text: string; name?: string; email?: string; password?: string; sessionToken?: string }): Promise<{ ok: boolean; id?: number }> {
    const text = (args.text ?? "").trim().slice(0, 1000);
    if (!text) return { ok: false };
    // Only the admin may post as "admin" — otherwise anyone with the
    // console could impersonate customer service in this browser's chat.
    if (args.from === "admin" && !adminAuthed(args)) return { ok: false };
    const msgs = read<LocalChat[]>("chat", []);
    const id = nextId("next-chat-id", 1);
    msgs.push({ id, from: args.from, text, name: (args.name ?? "").slice(0, 100), readByAdmin: args.from === "admin" ? 1 : 0, createdAt: new Date().toISOString() });
    if (msgs.length > 500) msgs.splice(0, msgs.length - 500);
    write("chat", msgs);
    return { ok: true, id };
  },

  async adminMarkChatRead(args: { email?: string; password: string; sessionToken?: string }): Promise<{ ok: boolean }> {
    if (!adminAuthed(args)) return { ok: false };
    const msgs = read<LocalChat[]>("chat", []);
    msgs.forEach((m) => { m.readByAdmin = 1; });
    write("chat", msgs);
    return { ok: true };
  },

  async adminDeleteChatMessage(args: { email?: string; password: string; sessionToken?: string; id: number }): Promise<{ ok: boolean }> {
    if (!adminAuthed(args)) return { ok: false };
    write("chat", read<LocalChat[]>("chat", []).filter((m) => m.id !== args.id));
    return { ok: true };
  },

  async adminClearChat(args: { email?: string; password: string; sessionToken?: string }): Promise<{ ok: boolean }> {
    if (!adminAuthed(args)) return { ok: false };
    write("chat", []);
    return { ok: true };
  },

  async adminData(args: { email?: string; password: string; sessionToken?: string; probe?: boolean }): Promise<{
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
    contact: LocalContact[];
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
      contact: [] as LocalContact[],
    };
    if (!adminAuthed(args)) {
      // A real (non-probe) password failure counts toward the sign-in
      // throttle. The customer sign-in form probes admin first on every
      // login, so probes must not count — one wrong customer password
      // would otherwise cost two throttle strikes.
      if (args.password && !args.sessionToken && !args.probe) recordLoginFailure();
      return empty;
    }
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
      contact: read<LocalContact[]>("contact", []),
    };
  },

  async adminMarkViewed(args: { email?: string; password: string; sessionToken?: string; kind: "order" | "user"; id: number }): Promise<{ ok: boolean }> {
    if (!adminAuthed(args)) return { ok: false };
    if (args.kind === "order") {
      const orders = read<LocalOrder[]>("orders", []);
      write("orders", orders.map((o) => (o.id === args.id ? { ...o, viewedByAdmin: 1 } : o)));
    } else {
      const users = read<LocalUser[]>("users", []);
      write("users", users.map((u) => (u.id === args.id ? { ...u, viewedByAdmin: 1 } : u)));
    }
    return { ok: true };
  },

  async adminSetUserDisabled(args: { email?: string; password: string; sessionToken?: string; id: number; disabled: boolean }): Promise<{ ok: boolean }> {
    if (!adminAuthed(args)) return { ok: false };
    const users = read<LocalUser[]>("users", []);
    write("users", users.map((u) => (u.id === args.id ? { ...u, disabled: args.disabled ? 1 : 0 } : u)));
    return { ok: true };
  },

  async adminDeleteUser(args: { email?: string; password: string; sessionToken?: string; id: number }): Promise<{ ok: boolean }> {
    if (!adminAuthed(args)) return { ok: false };
    write("users", read<LocalUser[]>("users", []).filter((u) => u.id !== args.id));
    return { ok: true };
  },

  async adminSaveProduct(args: {
    email?: string; password: string; sessionToken?: string; id?: number; name: string; category: string; subcategory?: string; theme?: string;
    price: number; priceLabel?: string; status?: string; line?: string; material?: string; modelSize?: string;
    metallicFinish?: string; colorsJson?: string; description?: string; story?: string; tone?: string;
    glyph?: string; refCode?: string; galleryViews?: string; applePay?: boolean; sizeOptions?: string;
    accordions?: string; shippingDelay?: string; detailLines?: string;
  }): Promise<{ ok: boolean; id: number }> {
    if (!adminAuthed(args)) return { ok: false, id: 0 };
    const overrides = readUs<Record<string, Partial<Product>>>("products-overrides", {});
    const added = readUs<Product[]>("products-new", []);
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
        writeUs("products-new", added.map((p) => (p.id === args.id ? { ...p, ...vals } : p)));
      } else {
        overrides[String(args.id)] = { ...(overrides[String(args.id)] ?? {}), ...vals };
        writeUs("products-overrides", overrides);
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
    writeUs("products-new", [...added, created]);
    return { ok: true, id };
  },

  async adminDeleteProduct(args: { email?: string; password: string; sessionToken?: string; id: number }): Promise<{ ok: boolean }> {
    if (!adminAuthed(args)) return { ok: false };
    const deleted = new Set(readUs<number[]>("products-deleted", []));
    deleted.add(args.id);
    writeUs("products-deleted", [...deleted]);
    writeUs("products-new", readUs<Product[]>("products-new", []).filter((p) => p.id !== args.id));
    return { ok: true };
  },

  async adminUpdateOrder(args: { email?: string; password: string; sessionToken?: string; id: number; status: string }): Promise<{ ok: boolean }> {
    if (!adminAuthed(args)) return { ok: false };
    const orders = read<LocalOrder[]>("orders", []);
    write("orders", orders.map((o) => (o.id === args.id ? { ...o, status: args.status } : o)));
    return { ok: true };
  },

  async adminSaveSettings(args: { email?: string; password: string; sessionToken?: string; settings: Settings }): Promise<{ ok: boolean }> {
    if (!adminAuthed(args)) return { ok: false };
    writeUs("settings", args.settings);
    return { ok: true };
  },

  async adminUploadLogo(args: { email?: string; password: string; sessionToken?: string; dataBase64: string; mimeType: string; clear: boolean }): Promise<{ ok: boolean; logoUrl: string }> {
    if (!adminAuthed(args)) return { ok: false, logoUrl: "" };
    if (args.dataBase64.length > 7_000_000) return { ok: false, logoUrl: "" }; // ~5 MB file as base64
    if (args.clear || !args.dataBase64) {
      const cur = readUs<Partial<Settings> | null>("settings", null);
      writeUs("settings", { ...(cur ?? {}), logoUrl: "" });
      return { ok: true, logoUrl: "" };
    }
    const mime = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(args.mimeType) ? args.mimeType : "image/png";
    const logoUrl = `data:${mime};base64,${args.dataBase64}`;
    try {
      const cur = readUs<Partial<Settings> | null>("settings", null);
      writeUs("settings", { ...(cur ?? {}), logoUrl });
    } catch {
      return { ok: false, logoUrl: "" };
    }
    return { ok: true, logoUrl };
  },
};
