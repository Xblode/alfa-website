export const brand = {
  name: "Alfa",
  logo: "/marque/logo.svg",
} as const;

export const topBar = {
  tagline: "Votre centre d'affaires proche de la gare de Rouen",
  messages: [
    {
      id: "siege",
      text: "Siège : 177 boulevard de l'Yser, 76000 Rouen",
      emphasis: "Siège",
    },
    {
      id: "telephone",
      text: "Téléphone : 02 32 08 32 32",
      emphasis: "Téléphone",
    },
    {
      id: "horaires",
      text: "Horaires : Du lundi au vendredi de 8h30 à 12h30 et de 14h à 17h00",
      emphasis: "Horaires",
    },
    {
      id: "espaces",
      text: "Plus de 20 espaces à votre disposition",
      emphasis: "Plus de 20 espaces",
    },
  ],
} as const;

export const seat = {
  role: "siège",
  address: "177 boulevard de l'Yser, 76000 Rouen",
  isListingAddress: false,
  phoneDisplay: "02 32 08 32 32",
  phoneHref: "tel:0232083232",
  email: "alfa@alfa.fr",
  emailHref: "mailto:alfa@alfa.fr",
  hours: "Du lundi au vendredi de 8h30 à 12h30 et de 14h à 17h00",
} as const;

export const social = {
  facebook: "https://www.facebook.com/alfaaffaires/",
  instagram: "https://www.instagram.com/alfa_coworking_rouen/",
  instagramHandle: "alfa_coworking_rouen",
} as const;

export const nav = [
  { id: "about", label: "Qui sommes-nous", href: "#" },
  {
    id: "services",
    label: "Services",
    href: "#",
    items: [
      {
        id: "domiciliation-commerciale",
        title: "Domiciliation commerciale",
        href: "/domiciliation-commerciale",
        image: "/accueil/hero/V.HUON-5783-slider.webp",
        alt: "Accueil 2eme",
        summary: "Avec notre service de domiciliation commerciale, nous gérons la réception, le tri et la réexpédition de votre courrier.",
      },
      {
        id: "permanence-telephonique",
        title: "Permanence téléphonique",
        href: "/permanence-telephonique",
        image: "/accueil/services/OLIfzjc422mDfbLL7tuuhsgSgPDI1Z-metadGVsZXBob25lLnBuZw==--section.webp",
        alt: "Permanence téléphonique",
        summary: "Notre permanence téléphonique personnalise chaque appel, prend vos messages et vous les transmet par e-mail.",
      },
      {
        id: "location-de-bureaux",
        title: "Location de bureaux",
        href: "/location-de-bureaux",
        image: "/accueil/services/PnL1e1L2xhO5wZ05ZsNh7TpBOzgcrU-metabG9jYXV4LmpwZw==--section.webp",
        alt: "Location de bureaux",
        summary: "Location fixe ou ponctuelle facile & pratique",
      },
      {
        id: "salles-de-reunion",
        title: "Salles de réunion",
        href: "/salles-de-reunion",
        image: "/accueil/services/kHTq7r1Hgc7dZ4CA5Tlc8hrSxMBhG8-metac2FsbGVfZGVfcmV1bmlvbi5qcGc=--section.webp",
        alt: "Salles de réunion",
        summary: "Bureaux ponctuel et salle de réunion",
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
        title: "Concentrez-vous sur l’essentiel",
        summary: "Trouvez la solution complète pour tous vos besoins professionnels.",
        href: "#",
        image: "/accueil/hero/V.HUON-5721-slider.webp",
        alt: "Exemple de bureau",
        demo: true,
      },
      {
        id: "demo-espaces",
        title: "Plus de 20 espaces à votre disposition",
        summary: "Location fixe ou ponctuelle facile & pratique",
        href: "#",
        image: "/accueil/hero/V.HUON-5809-slider.webp",
        alt: "Nous contacter",
        demo: true,
      },
      {
        id: "demo-services",
        title: "Trouvez le service qui vous correspond",
        summary: "Concentrez-vous sur votre activité, nous nous occupons du reste.",
        href: "#",
        image: "/accueil/espaces/bureau-dieppe-V.HUON-5724-card.webp",
        alt: 'Bureau "Dieppe"',
        demo: true,
      },
    ],
  },
] as const;

export const legal = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de Confidentialité", href: "/politique-de-confidentialite" },
] as const;
