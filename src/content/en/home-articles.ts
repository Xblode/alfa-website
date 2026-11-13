import type { Dictionary } from "../fr";

export const articles: Dictionary["articles"] = {
  demo: true,
  title: "Our latest articles",
  subtitle: "Reels and practical advice from the Rouen business centre.",
  items: [
    {
      id: "choisir-bureau-rouen",
      category: "Office rental",
      readingTime: "3 min read",
      title: "How to choose a professional office near Rouen station",
      lead: "Setting up a few minutes from the right-bank station makes every client trip and every workday easier.",
      opening: "Whether you need a desk for a few hours between trains or a private office by the month, the location shapes your day at once. At 177 boulevard de l'Yser, the spaces are ready when you arrive: high-speed internet, visitor welcome, a waiting room and secure 24-hour access.",
      media: {
        kind: "video",
        poster: "/accueil/hero/V.HUON-5721-slider.webp",
        src: null,
        alt: "Reel tour of a furnished Alfa office",
        duration: "0:42",
        reelHref: "https://www.instagram.com/alfa_coworking_rouen/",
      },
      href: "#",
      demo: true,
    },
    {
      id: "domiciliation-avantage",
      category: "Business address",
      readingTime: "2 min read",
      title: "Registering your business in Rouen: keep home and work addresses apart",
      lead: "A dedicated address in the heart of Rouen protects your home and organises your daily mail.",
      opening: "From registration or when you move your registered office, a business address keeps your home off official documents. The team receives, sorts and forwards your letters and registered mail as you ask.",
      media: {
        kind: "video",
        poster: "/accueil/espaces/bureau-dieppe-V.HUON-5724-card.webp",
        src: null,
        alt: "Reel preview of the \"Dieppe\" office at the Alfa centre", // À RELIRE
        duration: "0:35",
        reelHref: "https://www.instagram.com/alfa_coworking_rouen/",
      },
      href: "#",
      demo: true,
    },
    {
      id: "permanence-accueil-client",
      category: "Telephone answering",
      readingTime: "2 min read",
      title: "Stop missing calls during meetings or consultations",
      lead: "A personalised telephone welcome answers in your organisation’s name and sends each message straight away.",
      opening: "In a consultation, a meeting or on the road, answering breaks your focus, and letting the phone ring loses real enquiries. With a dedicated line and your own instructions, the team welcomes callers and emails you a clear summary.",
      media: {
        kind: "image",
        poster: "/accueil/services/OLIfzjc422mDfbLL7tuuhsgSgPDI1Z-metadGVsZXBob25lLnBuZw==--section.webp",
        src: null,
        alt: "Personalised telephone answering",
        duration: null,
        reelHref: null,
      },
      href: "#",
      demo: true,
    },
  ],
};
