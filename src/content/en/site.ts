import type { Dictionary } from "../fr";

export const brand: Dictionary["brand"] = {
  name: "Alfa",
  logo: "/marque/logo.svg",
};

export const topBar: Dictionary["topBar"] = {
  tagline: "Your business centre near Rouen train station",
  messages: [
    {
      id: "siege",
      text: "Head office: 177 boulevard de l'Yser, 76000 Rouen",
      emphasis: "Head office",
    },
    {
      id: "telephone",
      text: "Phone: 02 32 08 32 32",
      emphasis: "Phone",
    },
    {
      id: "horaires",
      text: "Hours: Monday to Friday, 8:30–12:30 and 14:00–17:00",
      emphasis: "Hours",
    },
    {
      id: "espaces",
      text: "More than 20 spaces available",
      emphasis: "20 spaces",
    },
  ],
};

export const seat: Dictionary["seat"] = {
  role: "head office",
  address: "177 boulevard de l'Yser, 76000 Rouen",
  isListingAddress: false,
  phoneDisplay: "02 32 08 32 32",
  phoneHref: "tel:0232083232",
  email: "alfa@alfa.fr",
  emailHref: "mailto:alfa@alfa.fr",
  hours: "Monday to Friday, 8:30–12:30 and 14:00–17:00",
};

export const social: Dictionary["social"] = {
  facebook: "https://www.facebook.com/alfaaffaires/",
  instagram: "https://www.instagram.com/alfa_coworking_rouen/",
  instagramHandle: "alfa_coworking_rouen",
};

export const nav: Dictionary["nav"] = [
  {
    id: "about",
    label: "About us",
    href: "#",
  },
  {
    id: "services",
    label: "Services",
    href: "#",
    items: [
      {
        id: "domiciliation-commerciale",
        title: "Business address",
        href: "/domiciliation-commerciale",
        image: "/accueil/hero/V.HUON-5783-slider.webp",
        alt: "Reception, 2nd floor",
        summary: "With our business address service, we receive, sort and forward your mail.",
      },
      {
        id: "permanence-telephonique",
        title: "Telephone answering",
        href: "/permanence-telephonique",
        image: "/accueil/services/OLIfzjc422mDfbLL7tuuhsgSgPDI1Z-metadGVsZXBob25lLnBuZw==--section.webp",
        alt: "Telephone answering",
        summary: "Our answering service handles each call in your name, takes messages and emails them to you.",
      },
      {
        id: "location-de-bureaux",
        title: "Office rental",
        href: "/location-de-bureaux",
        image: "/accueil/services/PnL1e1L2xhO5wZ05ZsNh7TpBOzgcrU-metabG9jYXV4LmpwZw==--section.webp",
        alt: "Office rental",
        summary: "Easy, practical fixed or occasional rental",
      },
      {
        id: "salles-de-reunion",
        title: "Meeting rooms",
        href: "/salles-de-reunion",
        image: "/accueil/services/kHTq7r1Hgc7dZ4CA5Tlc8hrSxMBhG8-metac2FsbGVfZGVfcmV1bmlvbi5qcGc=--section.webp",
        alt: "Meeting rooms",
        summary: "Occasional offices and meeting rooms",
      },
    ],
  },
  {
    id: "articles",
    label: "Articles",
    href: "#",
    demo: true,
    items: [
      {
        id: "demo-exemple-bureau",
        title: "Focus on what matters",
        summary: "Find the complete solution for every professional need.",
        href: "#",
        image: "/accueil/hero/V.HUON-5721-slider.webp",
        alt: "Sample office",
        demo: true,
      },
      {
        id: "demo-espaces",
        title: "More than 20 spaces available",
        summary: "Easy, practical fixed or occasional rental",
        href: "#",
        image: "/accueil/hero/V.HUON-5809-slider.webp",
        alt: "Contact us",
        demo: true,
      },
      {
        id: "demo-services",
        title: "Find the service that fits you",
        summary: "Focus on your work. We take care of the rest.",
        href: "#",
        image: "/accueil/espaces/bureau-dieppe-V.HUON-5724-card.webp",
        alt: "Office \"Dieppe\"",
        demo: true,
      },
    ],
  },
];

export const legal: Dictionary["legal"] = [
  {
    label: "Legal notice",
    href: "/mentions-legales",
  },
  {
    label: "Privacy policy",
    href: "/politique-de-confidentialite",
  },
];
