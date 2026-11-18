// Central config — the ONLY place environment variables are read.
//
// No API base URL, endpoint or credential lives in source code any more:
// the backend URL and the admin email come from Vite env vars, and the
// admin password is never in source at all (the owner sets it once in the
// Admin Panel; only its SHA-256 hash is kept in the browser's localStorage).
//
// IMPORTANT Vite caveat, stated plainly: `import.meta.env.VITE_*` values
// are inlined into the shipped JS bundle at build time. Env vars hide
// values from SOURCE — they do NOT hide them from the bundle. So a secret
// must never be put in a VITE_* var. The two vars below are not secrets:
// VITE_API_URL is a public backend address, VITE_ADMIN_EMAIL is the
// store owner's (public) contact email. If VITE_API_URL is unset the store
// runs fully locally (bundled catalog + localStorage); if VITE_ADMIN_EMAIL
// is unset the admin gate is password-only.

/** Base URL of the backend exposing POST {API_URL}/actions ({action, args}). Optional — empty means local-only demo mode. */
export const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ?? "";

/** The admin's email address, used by the admin gate. Optional — empty means password-only. */
export const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL as string | undefined)?.trim() ?? "";
