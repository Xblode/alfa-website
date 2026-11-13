import type { Dictionary } from "../fr";

export const cookies: Dictionary["cookies"] = {
  intro: {
    title: "Responsible use of your data", // À RELIRE
    body: "We and our partners use cookies and similar technologies to store and access information on your device, measure audience and remember your preferences. Strictly necessary cookies remain active. The other categories are used only with your consent. You can withdraw your consent at any time through the cookie settings.", // À RELIRE
    privacyLabel: "Privacy policy", // À RELIRE
  },
  about: {
    storage: "Your choices are saved in the alfa_cookie_consent cookie on this device. Duration: 6 months.", // À RELIRE
    definition: "Cookies are small text files placed on your device by the sites you visit. Cookies needed for the site to work can be set without your consent. All others wait for your permission.", // À RELIRE
    change: "You can change your consent at any time using the icon at the bottom left, or from the Privacy policy page.", // À RELIRE
  },
  ads: "Targeting cookies are used to measure campaigns and to recognise a visitor from one site to another. They are set only if you tick Targeting. This version of the site does not load any advertising network until this choice is saved.", // À RELIRE
  tabs: [
    {
      id: "declaration",
      label: "Cookie declaration", // À RELIRE
    },
    {
      id: "about",
      label: "About cookies", // À RELIRE
    },
    {
      id: "ads",
      label: "Advertising settings", // À RELIRE
    },
  ],
  categories: [
    {
      id: "strict",
      label: "Strictly necessary", // À RELIRE
      locked: true,
      summary: "Strictly necessary cookies enable basic features of the site, such as remembering your choice. The site cannot apply your preferences without them.", // À RELIRE
      cookies: [
        {
          name: "alfa_cookie_consent",
          provider: "Alfa",
          domain: "ce site",
          expires: "6 months", // À RELIRE
          description: "Remembers your consent preferences. Needed so that your choice is not asked for again on every visit.", // À RELIRE
        },
      ],
    },
    {
      id: "performance",
      label: "Performance",
      summary: "Performance cookies are used to see how visitors use the site, for example analytics cookies. They do not directly identify a visitor.", // À RELIRE
      cookies: [
        {
          name: "_ga",
          provider: "Google LLC",
          providerHref: "https://policies.google.com/privacy",
          domain: ".alfa.fr",
          expires: "1 year 1 month", // À RELIRE
          description: "Associated with Google Analytics. Distinguishes visitors with a random identifier for audience reports.", // À RELIRE
        },
        {
          name: "_ga_R51QS47ZXG",
          provider: "Google LLC",
          providerHref: "https://policies.google.com/privacy",
          domain: ".alfa.fr",
          expires: "1 year 1 month", // À RELIRE
          description: "Used by Google Analytics to keep the session state.", // À RELIRE
        },
      ],
    },
    {
      id: "targeting",
      label: "Targeting", // À RELIRE
      summary: "Targeting cookies identify visitors across several sites, for example to measure an advertisement seen before the visit.", // À RELIRE
      cookies: [
        {
          name: "_gcl_au",
          provider: "Google LLC",
          providerHref: "https://policies.google.com/privacy",
          domain: ".alfa.fr",
          expires: "2 months 4 weeks", // À RELIRE
          description: "Set by DoubleClick. Indicates how the visitor uses the site and which advertisement they may have seen before.", // À RELIRE
        },
        {
          name: "IDE",
          provider: "Google LLC",
          providerHref: "https://policies.google.com/privacy",
          domain: ".doubleclick.net",
          expires: "1 year 3 weeks", // À RELIRE
          description: "Set by DoubleClick. Used to measure site usage and the advertisements seen before the visit.", // À RELIRE
        },
      ],
    },
    {
      id: "functionality",
      label: "Functionality", // À RELIRE
      summary: "Functionality cookies remember information such as language, time zone or enhanced content.", // À RELIRE
      cookies: [],
    },
    {
      id: "unclassified",
      label: "Unclassified", // À RELIRE
      summary: "Unclassified cookies do not belong to any other category or are being classified.", // À RELIRE
      cookies: [
        {
          name: "alfa_session",
          provider: "Alfa",
          domain: "www.alfa.fr",
          expires: "1 hour 59 minutes", // À RELIRE
          description: "Technical session of the site.", // À RELIRE
        },
      ],
    },
  ],
  dialog: {
    close: "Close", // À RELIRE
    saveAndClose: "Save and close", // À RELIRE
    rejectAll: "Reject all", // À RELIRE
    acceptAndClose: "Accept and close", // À RELIRE
    hideDetails: "Hide details", // À RELIRE
    showDetails: "Show details", // À RELIRE
    categoriesLegend: "Cookie categories", // À RELIRE
  },
  report: {
    label: "Cookie details", // À RELIRE
    createdBy: "Cookie report created by",
    tableName: "Name", // À RELIRE
    tableProvider: "Provider", // À RELIRE
    tableExpires: "Expiry", // À RELIRE
    tableDescription: "Description",
    caption: "{category} cookies", // À RELIRE
  },
  badge: "Cookie settings", // À RELIRE
  openSettings: "Manage cookie settings", // À RELIRE
};
