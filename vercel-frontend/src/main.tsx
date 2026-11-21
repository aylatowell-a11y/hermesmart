import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./theme.css";

// DUAL-MODE shell (2026-11-21): France is the default mode; the US app is a
// separate lazy chunk loaded only when the admin flips the mode in their own
// browser (Admin Panel → Language & Region, Stage 2). There is NO
// visitor-facing language switcher anywhere on the storefront.
// Locale resolution: localStorage "hlx-locale" ONLY, default "fr". NO
// URL-prefix detection — a "/us/en/" URL on its own must NOT flip the mode
// (the FR app's legacy mapping renders it as a France view, as today).

type Locale = "fr" | "us";

const LOCALE_KEY = "hlx-locale";

function getLocale(): Locale {
  try {
    return window.localStorage.getItem(LOCALE_KEY) === "us" ? "us" : "fr";
  } catch {
    return "fr";
  }
}

const TITLES: Record<Locale, string> = {
  fr: "Boutique en ligne officielle d'Hermès | Hermès France",
  us: "The official Hermes online store | Hermès USA",
};
const LANGS: Record<Locale, string> = { fr: "fr", us: "en" };

const locale = getLocale();

// Synchronously, before first render: set lang + title for this mode.
document.documentElement.lang = LANGS[locale];
document.title = TITLES[locale];

// Admin-only plumbing (called ONLY from the Admin Panel toggle, Stage 2):
// persist the mode, clear cart + last-viewed (product ids/prices are
// catalogue-specific), then land on the other mode's homepage.
declare global {
  interface Window {
    __hermesSetLocale: (mode: Locale) => void;
  }
}
window.__hermesSetLocale = (mode: Locale) => {
  try {
    window.localStorage.setItem(LOCALE_KEY, mode);
    window.localStorage.removeItem("hlx-cart");
    window.localStorage.removeItem("hlx-lastviewed");
  } catch {
    /* storage unavailable — still navigate */
  }
  window.location.href = mode === "us" ? "/us/en/" : "/fr/fr/";
};

const App = lazy(() =>
  locale === "us"
    ? import("./us/App").then((m) => ({ default: m.App }))
    : import("./App").then((m) => ({ default: m.App })),
);

const queryClient = new QueryClient();

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("missing root element");
}

createRoot(rootEl).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="hatch-space-root" data-hatch-space-root>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </div>
    </QueryClientProvider>
  </StrictMode>,
);
