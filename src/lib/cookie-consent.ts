/**
 * Inventaire relevé sur https://www.alfa.fr/ le 2026-10-17 (bannière CookieScript).
 * Le cookie de consentement de ce site remplace CookieScriptConsent.
 */

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
  cookies: CookieRow[];
};

export type ReportTabId = "declaration" | "about" | "ads";

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

export const cookieIntro = {
  title: "Utilisation responsable de vos données",
  body: "Nous et nos partenaires utilisons des cookies et des technologies similaires pour stocker et accéder à des informations sur votre appareil, mesurer l'audience et mémoriser vos préférences. Les cookies strictement nécessaires restent actifs. Les autres catégories ne sont utilisées qu'avec votre accord. Vous pouvez retirer votre consentement à tout moment via le paramétrage des cookies.",
  privacyLabel: "Politique de confidentialité",
};

export const aboutCookies = {
  storage:
    "Vos choix sont enregistrés dans le cookie alfa_cookie_consent sur cet appareil. Durée : 6 mois.",
  definition:
    "Les cookies sont de petits fichiers texte déposés sur votre appareil par les sites que vous visitez. Les cookies nécessaires au fonctionnement peuvent être déposés sans votre accord. Tous les autres attendent votre autorisation.",
  change:
    "Vous pouvez modifier votre consentement à tout moment avec l'icône en bas à gauche, ou depuis la page Politique de confidentialité.",
};

export const adsSettings =
  "Les cookies de ciblage servent à mesurer des campagnes et à reconnaître un visiteur d'un site à l'autre. Ils ne sont déposés que si vous cochez Ciblage. Cette version du site ne charge pas de régie publicitaire tant que ce choix n'est pas enregistré.";

export const reportTabs: { id: ReportTabId; label: string }[] = [
  { id: "declaration", label: "Déclaration relative aux cookies" },
  { id: "about", label: "À propos des cookies" },
  { id: "ads", label: "Paramètres de publicité" },
];

const googlePrivacy = "https://policies.google.com/privacy";

export const cookieCategories: CookieCategory[] = [
  {
    id: "strict",
    label: "Strictement nécessaires",
    locked: true,
    summary:
      "Les cookies strictement nécessaires habilitent des fonctionnalités de base du site, comme la mémorisation de votre choix. Le site ne peut pas appliquer vos préférences sans eux.",
    cookies: [
      {
        name: "alfa_cookie_consent",
        provider: "Alfa",
        domain: "ce site",
        expires: "6 mois",
        description:
          "Mémorise vos préférences de consentement. Nécessaire pour ne pas redemander votre choix à chaque visite.",
      },
    ],
  },
  {
    id: "performance",
    label: "Performance",
    summary:
      "Les cookies de performance servent à voir comment les visiteurs utilisent le site, par exemple les cookies d'analyse. Ils ne permettent pas d'identifier directement un visiteur.",
    cookies: [
      {
        name: "_ga",
        provider: "Google LLC",
        providerHref: googlePrivacy,
        domain: ".alfa.fr",
        expires: "1 an 1 mois",
        description:
          "Associé à Google Analytics. Distingue les visiteurs par un identifiant aléatoire pour les rapports d'audience.",
      },
      {
        name: "_ga_R51QS47ZXG",
        provider: "Google LLC",
        providerHref: googlePrivacy,
        domain: ".alfa.fr",
        expires: "1 an 1 mois",
        description:
          "Utilisé par Google Analytics pour conserver l'état de la session.",
      },
    ],
  },
  {
    id: "targeting",
    label: "Ciblage",
    summary:
      "Les cookies de ciblage identifient les visiteurs entre plusieurs sites, par exemple pour mesurer une publicité vue avant la visite.",
    cookies: [
      {
        name: "_gcl_au",
        provider: "Google LLC",
        providerHref: googlePrivacy,
        domain: ".alfa.fr",
        expires: "2 mois 4 semaines",
        description:
          "Défini par DoubleClick. Indique comment le visiteur utilise le site et quelle publicité il a pu voir avant.",
      },
      {
        name: "IDE",
        provider: "Google LLC",
        providerHref: googlePrivacy,
        domain: ".doubleclick.net",
        expires: "1 an 3 semaines",
        description:
          "Défini par DoubleClick. Sert à mesurer l'usage du site et les publicités vues avant la visite.",
      },
    ],
  },
  {
    id: "functionality",
    label: "Fonctionnalité",
    summary:
      "Les cookies de fonctionnalité mémorisent des informations comme la langue, le fuseau horaire ou un contenu amélioré.",
    cookies: [],
  },
  {
    id: "unclassified",
    label: "Non classifiés",
    summary:
      "Les cookies non classifiés n'appartiennent à aucune autre catégorie ou sont en cours de classement.",
    cookies: [
      {
        name: "alfa_session",
        provider: "Alfa",
        domain: "www.alfa.fr",
        expires: "1 heure 59 minutes",
        description: "Session technique du site.",
      },
    ],
  },
];

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
