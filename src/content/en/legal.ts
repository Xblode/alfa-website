import type { Dictionary } from "../fr";

export const legalPages: Dictionary["legalPages"] = {
  mentionsLegales: {
    path: "/mentions-legales",
    title: "Legal notice",
    description: "Publisher, publication director and contact details for the Alfa website, a business centre in Rouen.", // À RELIRE
    updated: "17 October 2026", // À RELIRE
    cookieSettings: false,
    blocks: [
      {
        heading: "Publisher", // À RELIRE
        paragraphs: [
          "ORCA, a limited liability company (SARL) with share capital of €20,200, trading as Alfa Affaires. Registered office: 177 boulevard de l'Yser, 76000 Rouen. Rouen Trade and Companies Register (RCS) 351 048 392. SIRET 351 048 392 00010. Intra-community VAT number FR86351048392.", // À RELIRE
          "This information comes from the trade and companies register and from INSEE. The legal notice page published on alfa.fr does not contain this text.", // À RELIRE
        ],
      },
      {
        heading: "Publication director", // À RELIRE
        paragraphs: [
          "Pascal Lepicard, manager.", // À RELIRE
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Phone: 02 32 08 32 32.", // À RELIRE
          "Email: alfa@alfa.fr.", // À RELIRE
          "Hours: Monday to Friday, 8:30–12:30 and 14:00–17:00.", // À RELIRE
        ],
      },
      {
        heading: "Hosting", // À RELIRE
        paragraphs: [
          "The name of the hosting provider is not given on alfa.fr. It will be added here when the site goes live.", // À RELIRE
        ],
      },
      {
        heading: "Intellectual property", // À RELIRE
        paragraphs: [
          "All rights to the texts, logo and photographs on this site are reserved by Alfa. Unauthorised reproduction is prohibited.", // À RELIRE
        ],
      },
    ],
  },
  politiqueConfidentialite: {
    path: "/politique-de-confidentialite",
    title: "Privacy policy",
    description: "Data processed by the Alfa website, cookies and individuals' rights.", // À RELIRE
    updated: "17 October 2026", // À RELIRE
    cookieSettings: true,
    blocks: [
      {
        heading: "Data controller", // À RELIRE
        paragraphs: [
          "ORCA, a limited liability company (SARL) with share capital of €20,200, trading as Alfa Affaires. Registered office: 177 boulevard de l'Yser, 76000 Rouen. Rouen Trade and Companies Register (RCS) 351 048 392. SIRET 351 048 392 00010. Intra-community VAT number FR86351048392.", // À RELIRE
          "Contact for your data: alfa@alfa.fr or 02 32 08 32 32.", // À RELIRE
        ],
      },
      {
        heading: "What the site does with your data", // À RELIRE
        paragraphs: [
          "The email field in the contact banner opens a message in your email app, addressed to alfa@alfa.fr. The address is not stored on the site.", // À RELIRE
          "The “Contact Alfa” form (name, email, phone, message, ticked services) does not send or store anything in this version.", // À RELIRE
          "The phone link starts the call on your device. The site does not keep the call.", // À RELIRE
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "The alfa_cookie_consent cookie and a local storage entry remember your choice for 6 months. It is needed so that you are not asked again on every visit.", // À RELIRE
          "No audience measurement or advertising is loaded until you have accepted the matching category. This version of the site does not insert any Google Analytics or DoubleClick script.", // À RELIRE
        ],
        items: [
          "Strictly necessary: remembering your consent.", // À RELIRE
          "Performance, targeting, functionality and unclassified: described in the panel, set only with your consent and only if the script exists.", // À RELIRE
        ],
      },
      {
        heading: "Retention period", // À RELIRE
        paragraphs: [
          "Your cookie choice is kept on your device for 6 months. Messages opened in your email app follow the retention of your mailbox, not that of the site.", // À RELIRE
        ],
      },
      {
        heading: "Your rights", // À RELIRE
        paragraphs: [
          "You can ask for access to, rectification, erasure, restriction or portability of your data, and object to processing. Write to alfa@alfa.fr.", // À RELIRE
          "You can also lodge a complaint with the CNIL: cnil.fr.", // À RELIRE
        ],
      },
    ],
  },
};
