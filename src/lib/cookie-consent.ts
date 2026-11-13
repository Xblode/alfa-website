/**
 * Logique du consentement aux cookies (stockage et état).
 * Les textes sont dans `src/content/<langue>/cookies.ts`.
 */
import type { Dictionary } from "@/content";

export const COOKIE_STORAGE_KEY = "alfa-cookie-consent";
export const COOKIE_NAME = "alfa_cookie_consent";
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

export type CookieCategoryId =
  | "strict"
  | "performance"
  | "targeting"
  | "functionality"
  | "unclassified";

export type OptionalCategoryId = Exclude<CookieCategoryId, "strict">;

export type CookieConsentState = Record<OptionalCategoryId, boolean>;

export type CookieRow = {
  name: string;
  provider: string;
  domain: string;
  providerHref?: string;
  expires: string;
  description: string;
};

export type CookieCategory = {
  id: CookieCategoryId;
  label: string;
  summary: string;
  locked?: boolean;
  cookies: readonly CookieRow[];
};

export type ReportTabId = "declaration" | "about" | "ads";

export type CookieTexts = Dictionary["cookies"];

export const defaultConsent: CookieConsentState = {
  performance: false,
  targeting: false,
  functionality: false,
  unclassified: false,
};

export const allConsent: CookieConsentState = {
  performance: true,
  targeting: true,
  functionality: true,
  unclassified: true,
};

const optionalIds: OptionalCategoryId[] = [
  "performance",
  "targeting",
  "functionality",
  "unclassified",
];

function isConsentState(value: unknown): value is CookieConsentState {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return optionalIds.every((id) => typeof record[id] === "boolean");
}

export function readConsent(): CookieConsentState | null {
  try {
    const raw = window.localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isConsentState(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeConsent(state: CookieConsentState) {
  const payload = JSON.stringify(state);
  window.localStorage.setItem(COOKIE_STORAGE_KEY, payload);
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(payload)}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}
