/**
 * Inventaire relevé sur https://www.alfa.fr/ le 2026-10-17 (bannière CookieScript).
 * Le cookie de consentement de ce site remplace CookieScriptConsent.
 * La logique (stockage, état du consentement) reste dans `src/lib/cookie-consent.ts`.
 */
export const cookies = {
  intro: {
    title: "Utilisation responsable de vos données",
    body: "Nous et nos partenaires utilisons des cookies et des technologies similaires pour stocker et accéder à des informations sur votre appareil, mesurer l'audience et mémoriser vos préférences. Les cookies strictement nécessaires restent actifs. Les autres catégories ne sont utilisées qu'avec votre accord. Vous pouvez retirer votre consentement à tout moment via le paramétrage des cookies.",
    privacyLabel: "Politique de confidentialité",
  },
  about: {
    storage: "Vos choix sont enregistrés dans le cookie alfa_cookie_consent sur cet appareil. Durée : 6 mois.",
    definition: "Les cookies sont de petits fichiers texte déposés sur votre appareil par les sites que vous visitez. Les cookies nécessaires au fonctionnement peuvent être déposés sans votre accord. Tous les autres attendent votre autorisation.",
    change: "Vous pouvez modifier votre consentement à tout moment avec l'icône en bas à gauche, ou depuis la page Politique de confidentialité.",
  },
  ads: "Les cookies de ciblage servent à mesurer des campagnes et à reconnaître un visiteur d'un site à l'autre. Ils ne sont déposés que si vous cochez Ciblage. Cette version du site ne charge pas de régie publicitaire tant que ce choix n'est pas enregistré.",
  tabs: [
    {
      id: "declaration",
      label: "Déclaration relative aux cookies",
    },
    {
      id: "about",
      label: "À propos des cookies",
    },
    {
      id: "ads",
      label: "Paramètres de publicité",
    },
  ],
  categories: [
    {
      id: "strict",
      label: "Strictement nécessaires",
      locked: true,
      summary: "Les cookies strictement nécessaires habilitent des fonctionnalités de base du site, comme la mémorisation de votre choix. Le site ne peut pas appliquer vos préférences sans eux.",
      cookies: [
        {
          name: "alfa_cookie_consent",
          provider: "Alfa",
          domain: "ce site",
          expires: "6 mois",
          description: "Mémorise vos préférences de consentement. Nécessaire pour ne pas redemander votre choix à chaque visite.",
        },
      ],
    },
    {
      id: "performance",
      label: "Performance",
      summary: "Les cookies de performance servent à voir comment les visiteurs utilisent le site, par exemple les cookies d'analyse. Ils ne permettent pas d'identifier directement un visiteur.",
      cookies: [
        {
          name: "_ga",
          provider: "Google LLC",
          providerHref: "https://policies.google.com/privacy",
          domain: ".alfa.fr",
          expires: "1 an 1 mois",
          description: "Associé à Google Analytics. Distingue les visiteurs par un identifiant aléatoire pour les rapports d'audience.",
        },
        {
          name: "_ga_R51QS47ZXG",
          provider: "Google LLC",
          providerHref: "https://policies.google.com/privacy",
          domain: ".alfa.fr",
          expires: "1 an 1 mois",
          description: "Utilisé par Google Analytics pour conserver l'état de la session.",
        },
      ],
    },
    {
      id: "targeting",
      label: "Ciblage",
      summary: "Les cookies de ciblage identifient les visiteurs entre plusieurs sites, par exemple pour mesurer une publicité vue avant la visite.",
      cookies: [
        {
          name: "_gcl_au",
          provider: "Google LLC",
          providerHref: "https://policies.google.com/privacy",
          domain: ".alfa.fr",
          expires: "2 mois 4 semaines",
          description: "Défini par DoubleClick. Indique comment le visiteur utilise le site et quelle publicité il a pu voir avant.",
        },
        {
          name: "IDE",
          provider: "Google LLC",
          providerHref: "https://policies.google.com/privacy",
          domain: ".doubleclick.net",
          expires: "1 an 3 semaines",
          description: "Défini par DoubleClick. Sert à mesurer l'usage du site et les publicités vues avant la visite.",
        },
      ],
    },
    {
      id: "functionality",
      label: "Fonctionnalité",
      summary: "Les cookies de fonctionnalité mémorisent des informations comme la langue, le fuseau horaire ou un contenu amélioré.",
      cookies: [],
    },
    {
      id: "unclassified",
      label: "Non classifiés",
      summary: "Les cookies non classifiés n'appartiennent à aucune autre catégorie ou sont en cours de classement.",
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
  ],
  dialog: {
    close: "Fermer",
    saveAndClose: "Sauvegarder et fermer",
    rejectAll: "Refuser tout",
    acceptAndClose: "Accepter et fermer",
    hideDetails: "Masquer les détails",
    showDetails: "Afficher les détails",
    categoriesLegend: "Catégories de cookies",
  },
  report: {
    label: "Détails des cookies",
    createdBy: "Cookie report created by",
    tableName: "Nom",
    tableProvider: "Fournisseur",
    tableExpires: "Expiration",
    tableDescription: "Description",
    caption: "Cookies {category}",
  },
  badge: "Paramétrage des cookies",
  openSettings: "Paramétrer les cookies",
} as const;
