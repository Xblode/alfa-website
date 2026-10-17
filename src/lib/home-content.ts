/**
 * Contenu figé relevé sur https://www.alfa.fr/ le 2026-10-17.
 * Le siège n'est pas l'adresse d'un bien.
 * Les cartes du site n'affichent pas de prix : `priceFrom` reste null.
 * Le bien « Rouen » est un bureau nommé ainsi, distinct du siège.
 * Cherbourg est une salle de réunion (2Bème étage), pas un bureau.
 * Fixtures de démonstration, pas des faits Alfa : `availability` sur chaque bien,
 * les trois aperçus du menu Articles, les profils clients (`personas`),
 * les avis clients (`reviews`) et le bloc FAQ (questions rédigées ici, réponses reprises des faits déjà publiés).
 * Ce n'est pas un blog.
 */

export const homeContent = {
  brand: {
    name: "Alfa",
    logo: "/marque/logo.svg",
  },
  topBar: {
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
  },
  seat: {
    role: "siège",
    address: "177 boulevard de l'Yser, 76000 Rouen",
    isListingAddress: false,
    phoneDisplay: "02 32 08 32 32",
    phoneHref: "tel:0232083232",
    email: "alfa@alfa.fr",
    emailHref: "mailto:alfa@alfa.fr",
    hours: "Du lundi au vendredi de 8h30 à 12h30 et de 14h à 17h00",
  },
  social: {
    facebook: "https://www.facebook.com/alfaaffaires/",
    instagram: "https://www.instagram.com/alfa_coworking_rouen/",
    instagramHandle: "alfa_coworking_rouen",
  },
  nav: [
    { label: "Qui sommes-nous", href: "#" },
    {
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
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de Confidentialité", href: "/politique-de-confidentialite" },
  ],
  hero: {
    title: "Concentrez-vous sur l’essentiel",
    subtitle:
      "Trouvez la solution complète pour tous vos besoins professionnels.",
    subtitleEmphasis: "la solution complète",
    slides: [
      {
        src: "/accueil/hero/V.HUON-5783-slider.webp",
        alt: "Accueil 2eme",
      },
      {
        src: "/accueil/hero/V.HUON-5721-slider.webp",
        alt: "Exemple de bureau",
      },
      {
        src: "/accueil/hero/V.HUON-5809-slider.webp",
        alt: "Nous contacter",
      },
    ],
  },
  promises: [
    {
      icon: "/accueil/promesses/icon-1-img.svg",
      text: "Location fixe ou ponctuelle facile & pratique",
      emphasis: "facile & pratique",
    },
    {
      icon: "/accueil/promesses/icon-2-img.svg",
      text: "Plus de 20 espaces à votre disposition",
      emphasis: "20 espaces",
    },
    {
      icon: "/accueil/promesses/icon-3-img.svg",
      text: "Centre d’affaires accessible",
      emphasis: "accessible",
    },
    {
      icon: "/accueil/promesses/icon-4-img.svg",
      text: "Des bureaux intimistes et modulables",
      emphasis: "intimistes et modulables",
    },
  ],
  spaces: {
    title: "Trouvez l'espace qu'il vous faut !",
    cta: "Toutes nos locations",
    ctaHref: "#",
    items: [
      {
        id: "fecamp",
        city: "Fécamp",
        kind: "bureau",
        cardTitle: 'Bureau "Fécamp"',
        floor: "3ème étage",
        image: "/accueil/espaces/bureau-fecamp-B.26-1-card.webp",
        priceFrom: null,
        href: "#",
        availability: { kind: "available" },
        featured: true,
      },
      {
        id: "dieppe",
        city: "Dieppe",
        kind: "bureau",
        cardTitle: 'Bureau "Dieppe"',
        floor: "1er étage",
        image: "/accueil/espaces/bureau-dieppe-V.HUON-5724-card.webp",
        priceFrom: null,
        href: "#",
        availability: { kind: "date", label: "Disponible le 2 novembre" },
        featured: true,
      },
      {
        id: "le-treport",
        city: "Le Tréport",
        kind: "bureau",
        cardTitle: 'Bureau "Le Tréport"',
        floor: "3ème étage",
        image: "/accueil/espaces/bureau-le-treport-V.HUON-5795-card.webp",
        priceFrom: null,
        href: "#",
        availability: { kind: "available" },
        featured: true,
      },
      {
        id: "le-cabourg",
        city: "Le Cabourg",
        kind: "bureau",
        cardTitle: 'Bureau "Le Cabourg"',
        floor: "2Aème étage",
        image: "/accueil/espaces/bureau-le-cabourg-V.HUON-5743-card.webp",
        priceFrom: null,
        href: "#",
        availability: { kind: "date", label: "Disponible le 18 novembre" },
        featured: true,
      },
      {
        id: "le-havre",
        city: "Le Havre",
        kind: "bureau",
        cardTitle: 'Bureau "Le Havre"',
        floor: "1er étage",
        image: null,
        priceFrom: null,
        href: "#",
        availability: { kind: "available" },
        featured: false,
      },
      {
        id: "caen",
        city: "Caen",
        kind: "bureau",
        cardTitle: 'Bureau "Caen"',
        floor: "1er étage",
        image: null,
        priceFrom: null,
        href: "#",
        availability: { kind: "date", label: "Disponible le 4 décembre" },
        featured: false,
      },
      {
        id: "etretat",
        city: "Étretat",
        kind: "bureau",
        cardTitle: 'Bureau "Étretat"',
        floor: "2Aème étage",
        image: null,
        priceFrom: null,
        href: "#",
        availability: { kind: "available" },
        featured: false,
      },
      {
        id: "cherbourg",
        city: "Cherbourg",
        kind: "salle",
        cardTitle: 'Salle de réunion "Cherbourg"',
        floor: "2Bème étage",
        image: null,
        priceFrom: null,
        href: "#",
        availability: { kind: "date", label: "Disponible le 15 décembre" },
        featured: false,
      },
      {
        id: "honfleur",
        city: "Honfleur",
        kind: "bureau",
        cardTitle: 'Bureau "Honfleur"',
        floor: "2Aème étage",
        image: null,
        priceFrom: null,
        href: "#",
        availability: { kind: "available" },
        featured: false,
      },
      {
        id: "bayeux",
        city: "Bayeux",
        kind: "bureau",
        cardTitle: 'Bureau "Bayeux"',
        floor: "2Aème étage",
        image: null,
        priceFrom: null,
        href: "#",
        availability: { kind: "date", label: "Disponible le 6 janvier" },
        featured: false,
      },
      {
        id: "rouen",
        city: "Rouen",
        kind: "bureau",
        cardTitle: 'Bureau "Rouen"',
        floor: "1er étage",
        image: null,
        priceFrom: null,
        href: "#",
        availability: { kind: "available" },
        featured: false,
      },
      {
        id: "deauville",
        city: "Deauville",
        kind: "bureau",
        cardTitle: 'Bureau "Deauville"',
        floor: "2Bème étage",
        image: null,
        priceFrom: null,
        href: "#",
        availability: { kind: "date", label: "Disponible le 20 janvier" },
        featured: false,
      },
      {
        id: "evreux",
        city: "Évreux",
        kind: "bureau",
        cardTitle: 'Bureau "Évreux"',
        floor: "3ème étage",
        image: null,
        priceFrom: null,
        href: "#",
        availability: { kind: "available" },
        featured: false,
      },
      {
        id: "lisieux",
        city: "Lisieux",
        kind: "bureau",
        cardTitle: 'Bureau "Lisieux"',
        floor: "3ème étage",
        image: null,
        priceFrom: null,
        href: "#",
        availability: { kind: "date", label: "Disponible le 3 février" },
        featured: false,
      },
    ],
  },
  services: {
    title: "Trouvez le service qui vous correspond",
    paragraphs: [
      "Concentrez-vous sur votre activité, nous nous occupons du reste.",
      "Avec notre service de domiciliation commerciale, nous gérons la réception, le tri et la réexpédition de votre courrier.",
      "Notre permanence téléphonique personnalise chaque appel, prend vos messages et vous les transmet par e-mail. Profitez également d’une adresse prestigieuse au cœur de Rouen et d’un service sur-mesure.",
      "Travaillez l’esprit tranquille !",
    ],
    items: [
      {
        id: "domiciliation-commerciale",
        title: "Domiciliation commerciale",
        href: "/domiciliation-commerciale",
        image: "/accueil/hero/V.HUON-5783-slider.webp",
        imageAlt: "Accueil du centre d'affaires",
        summary: "Avec notre service de domiciliation commerciale, nous gérons la réception, le tri et la réexpédition de votre courrier.",
        detail: "Avec notre service de domiciliation commerciale, nous gérons la réception, le tri et la réexpédition de votre courrier. Une adresse au coeur de Rouen. Service personnalisé en fonction de vos besoins. Réception & tri de vos courriers et recommandés.",
        highlights: [
          "Une adresse au coeur de Rouen",
          "Service personnalisé en fonction de vos besoins",
          "Réception & tri de vos courriers et recommandés",
        ],
      },
      {
        id: "permanence-telephonique",
        title: "Permanence téléphonique",
        href: "/permanence-telephonique",
        image: "/accueil/services/OLIfzjc422mDfbLL7tuuhsgSgPDI1Z-metadGVsZXBob25lLnBuZw==--section.webp",
        imageAlt: "Permanence téléphonique",
        summary: "Notre permanence téléphonique personnalise chaque appel, prend vos messages et vous les transmet par e-mail.",
        detail: "Notre permanence téléphonique personnalise chaque appel, prend vos messages et vous les transmet par e-mail. Profitez également d’une adresse prestigieuse au cœur de Rouen et d’un service sur-mesure.",
        highlights: [
          "Permanence téléphonique (SDA)",
          "Message personnalisé",
          "Transfert d’appel et renvoi de ligne",
        ],
      },
      {
        id: "location-de-bureaux",
        title: "Location de bureaux",
        href: "/location-de-bureaux",
        image: "/accueil/services/PnL1e1L2xhO5wZ05ZsNh7TpBOzgcrU-metabG9jYXV4LmpwZw==--section.webp",
        imageAlt: "Location de bureaux",
        summary: "Location fixe ou ponctuelle facile & pratique",
        detail: "Location fixe ou ponctuelle facile & pratique. Vous avez besoin d’un espace de travail immédiatement opérationnel ? Louer un bureau adaptable à vos besoins et à votre activité. Des bureaux intimistes et modulables.",
        highlights: [
          "Des bureaux intimistes et modulables",
          "Location ponctuelle ou au mois",
          "Charges locatives et connexion haut débit incluses",
        ],
      },
      {
        id: "salles-de-reunion",
        title: "Salles de réunion",
        href: "/salles-de-reunion",
        image: "/accueil/services/kHTq7r1Hgc7dZ4CA5Tlc8hrSxMBhG8-metac2FsbGVfZGVfcmV1bmlvbi5qcGc=--section.webp",
        imageAlt: "Salles de réunion",
        summary: "Bureaux ponctuel et salle de réunion",
        detail: "Bureaux ponctuel et salle de réunion. Indépendants, entrepreneurs ou salariés ? Louez un bureau équipé et immédiatement opérationnel.",
        highlights: [
          "Espace équipé et immédiatement opérationnel",
          "Accueil de vos clients et salle d’attente",
          "Café, thé et impressions compris",
        ],
      },
    ],
    images: [
      {
        src: "/accueil/services/kHTq7r1Hgc7dZ4CA5Tlc8hrSxMBhG8-metac2FsbGVfZGVfcmV1bmlvbi5qcGc=--section.webp",
        source: "salle_de_reunion",
      },
      {
        src: "/accueil/services/OLIfzjc422mDfbLL7tuuhsgSgPDI1Z-metadGVsZXBob25lLnBuZw==--section.webp",
        source: "telephone",
      },
      {
        src: "/accueil/services/PnL1e1L2xhO5wZ05ZsNh7TpBOzgcrU-metabG9jYXV4LmpwZw==--section.webp",
        source: "locaux",
      },
    ],
  },
  personas: {
    demo: true,
    title: "Un local pour recevoir, selon votre métier",
    intro:
      "Praticien, consultant ou dirigeant : un espace prêt à l'emploi, le temps d'un rendez-vous ou au mois.",
    items: [
      {
        id: "praticien",
        role: "Praticien",
        title: "Recevoir vos patients dans un cabinet calme",
        image: "/accueil/espaces/bureau-fecamp-B.26-1-card.webp",
        imageAlt: "Bureau calme et lumineux pour praticien",
        need: "Ostéopathe, psychologue ou coach : un bureau intimiste, quelques heures ou à la demi-journée, sans bail à l'année.",
        advantages: [
          "Bureau intimiste, prêt dès votre arrivée",
          "Accueil de vos patients et salle d'attente",
          "Location ponctuelle ou au mois, selon votre rythme",
          "Adresse au cœur de Rouen, proche de la gare",
        ],
      },
      {
        id: "consultant",
        role: "Consultant indépendant",
        title: "Recevoir vos clients dans un cadre professionnel",
        image: "/accueil/services/kHTq7r1Hgc7dZ4CA5Tlc8hrSxMBhG8-metac2FsbGVfZGVfcmV1bmlvbi5qcGc=--section.webp",
        imageAlt: "Salle de réunion équipée pour rendez-vous clients",
        need: "Un rendez-vous, une présentation, une signature : une salle équipée, sans prendre un local permanent.",
        advantages: [
          "Salle immédiatement opérationnelle",
          "Connexion haut débit et impressions comprises",
          "Café et thé pour accueillir",
          "Charges locatives incluses",
        ],
      },
      {
        id: "dirigeant",
        role: "Dirigeant",
        title: "Recevoir partenaires et candidats sans bureau fixe",
        image: "/accueil/services/PnL1e1L2xhO5wZ05ZsNh7TpBOzgcrU-metabG9jYXV4LmpwZw==--section.webp",
        imageAlt: "Espace de réception pour dirigeant",
        need: "Quelques rendez-vous par mois suffisent : un espace à votre nom, sans engager un bail classique.",
        advantages: [
          "Accueil de vos visiteurs et salle d'attente",
          "En location au mois : signalisation de votre entité",
          "En location au mois : accès sécurisé 24h/24 et 7j/7",
          "Domiciliation possible à la même adresse",
        ],
      },
    ],
  },
  offers: {
    title: "Profitez de nos offres Alfa",
    cta: "Nous contacter",
    ctaHref: "#",
    items: [
      {
        id: "location-ponctuelle",
        title: "Location ponctuelle",
        intro:
          "Indépendants, entrepreneurs ou salariés ? Louez un bureau équipé et immédiatement opérationnel",
        subtitle: "Bureaux ponctuel et salle de réunion",
        bullets: [
          "Charges locatives incluses",
          "Casier personnel et sécurisé",
          "Connexion internet haut débit",
          "Café & Thé compris",
          "Numérisation comprise",
          "Accueil de vos clients et salle d’attente",
          "Forfait de 10 impressions",
        ],
        examples: [
          {
            role: "Ostéopathe",
            scene:
              "Vous recevez vos patients deux demi-journées par semaine, dans un bureau calme.",
          },
          {
            role: "Commercial de passage",
            scene:
              "Vous avez un rendez-vous entre deux trains : la salle est prête dès votre arrivée.",
          },
          {
            role: "Formateur",
            scene: "Vous animez un atelier d’une journée, puis vous repartez le soir.",
          },
        ],
        price: { amountHt: 50, unit: "once", label: "À partir de 50€ HT" },
      },
      {
        id: "sur-mesure",
        title: "Votre solution sur-mesure",
        intro:
          "Quel que soit votre budget et vos délais, l’équipe commerciale vous proposera des solutions répondant à vos demandes.",
        subtitle: null,
        bullets: [],
        examples: [
          {
            role: "Association",
            scene:
              "Vous combinez quelques jours de bureau, le courrier et un accueil téléphonique.",
          },
          {
            role: "Équipe projet",
            scene:
              "Vous n’êtes sur place que quelques jours par mois, et la formule suit ce rythme.",
          },
          {
            role: "Cabinet",
            scene:
              "Vous voulez une adresse à Rouen et une salle pour recevoir, sans toute l’offre au mois.",
          },
        ],
        price: null,
      },
      {
        id: "location-au-mois",
        title: "Location au mois",
        intro:
          "Vous avez besoin d’un espace de travail immédiatement opérationnel ? Louer un bureau adaptable à vos besoins et à votre activité.",
        subtitle: "Bureaux Flexible",
        bullets: [
          "Surfaces adaptées à vos besoins",
          "Accès sécurisé à votre bureau 24h/24, 7 j/7",
          "Charges locatives incluses",
          "Ligne téléphonique directe",
          "Domiciliation commerciale incluse",
          "Stationnement privé selon les disponibilités",
          "Connexion Internet haut débit",
          "Affranchissement et collecte de courrier",
          "Espace détente",
          "Accueil de vos clients et salle d’attente",
          "Secrétariat & services d’assistance commerciale",
          "Signalisation de votre entité",
          "Café & Thé compris",
          "Forfait de 100 impressions",
        ],
        examples: [
          {
            role: "Consultant",
            scene:
              "Vous vous installez à Rouen et voulez un bureau à votre nom, sans bail de plusieurs années.",
          },
          {
            role: "Petite équipe",
            scene: "Vous êtes deux ou trois, et il vous faut un espace accessible 24h/24.",
          },
          {
            role: "Dirigeant",
            scene:
              "Vous recevez partenaires et candidats quelques jours par semaine, avec la domiciliation à la même adresse.",
          },
        ],
        price: {
          amountHt: 480,
          unit: "month",
          label: "À partir de 480€/mois HT",
        },
      },
      {
        id: "permanence-telephonique",
        title: "Offre de permanence téléphonique",
        intro:
          "Nous décrochons pour vous, prenons vos messages et vous les retransmettons par mail.",
        subtitle: null,
        bullets: [
          "Permanence téléphonique (SDA)",
          "Message personnalisé",
          "Transfert d’appel",
          "Renvoi de ligne",
        ],
        examples: [
          {
            role: "Artisan",
            scene:
              "Vous êtes sur chantier : on décroche, on note le message et on vous l’envoie par mail.",
          },
          {
            role: "Thérapeute",
            scene:
              "Vous êtes en séance : quelqu’un répond à votre place et vous transmet l’appel.",
          },
          {
            role: "Indépendant en déplacement",
            scene:
              "Vous êtes en réunion : une ligne dédiée répond au nom de votre structure.",
          },
        ],
        price: { amountHt: 80, unit: "month", label: "À partir de 80€/mois HT" },
      },
      {
        id: "domiciliation-commerciale",
        title: "Offre de domiciliation commerciale",
        intro:
          "Nous décrochons pour vous, prenons vos messages et vous les retransmettons par mail.",
        subtitle: null,
        bullets: [
          "Une adresse au coeur de Rouen",
          "Service personnalisé en fonction de vos besoins",
          "Réception & tri de vos courriers et recommandés.",
        ],
        examples: [
          {
            role: "Auto-entrepreneur",
            scene:
              "Vous gardez votre adresse personnelle privée et affichez une adresse à Rouen.",
          },
          {
            role: "Société",
            scene:
              "Vous transférez votre siège et faites réceptionner courriers et recommandés.",
          },
          {
            role: "E-commerçant",
            scene:
              "Vous travaillez de chez vous et indiquez une adresse professionnelle sur vos documents.",
          },
        ],
        price: { amountHt: 45, unit: "month", label: "À partir de 45€/mois HT" },
      },
    ],
  },
  articles: {
    demo: true,
    title: "Nos derniers articles",
    subtitle: "Réels et conseils pratiques du centre d'affaires à Rouen.",
    items: [
      {
        id: "choisir-bureau-rouen",
        category: "Location de bureaux",
        readingTime: "3 min de lecture",
        title: "Comment choisir son bureau professionnel proche de la gare de Rouen",
        lead: "S'installer à quelques minutes de la gare rive droite facilite chaque déplacement client et chaque journée de travail.",
        opening:
          "Que vous ayez besoin d'un poste pour quelques heures entre deux trains ou d'un bureau fermé au mois, l'emplacement joue un rôle immédiat sur votre organisation. Au 177 boulevard de l'Yser, nos espaces sont prêts dès votre arrivée : connexion haut débit, accueil de vos visiteurs, salle d'attente et accès sécurisé 24h/24.",
        media: {
          kind: "video" as const,
          poster: "/accueil/hero/V.HUON-5721-slider.webp",
          src: null as string | null,
          alt: "Visite en Réel d'un bureau équipé chez Alfa",
          duration: "0:42",
          reelHref: "https://www.instagram.com/alfa_coworking_rouen/",
        },
        href: "#",
        demo: true,
      },
      {
        id: "domiciliation-avantage",
        category: "Domiciliation commerciale",
        readingTime: "2 min de lecture",
        title: "Domicilier son entreprise à Rouen : séparer vie privée et adresse pro",
        lead: "Une adresse dédiée au cœur de Rouen protège votre domicile tout en structurant la gestion quotidienne de votre courrier.",
        opening:
          "Dès l'immatriculation ou lors d'un transfert de siège, la domiciliation commerciale vous évite d'exposer votre adresse personnelle sur vos documents officiels. Notre équipe assure la réception, le tri et la réexpédition de vos plis et recommandés selon vos consignes.",
        media: {
          kind: "video" as const,
          poster: "/accueil/espaces/bureau-dieppe-V.HUON-5724-card.webp",
          src: null as string | null,
          alt: 'Aperçu Réel du bureau "Dieppe" au centre Alfa',
          duration: "0:35",
          reelHref: "https://www.instagram.com/alfa_coworking_rouen/",
        },
        href: "#",
        demo: true,
      },
      {
        id: "permanence-accueil-client",
        category: "Permanence téléphonique",
        readingTime: "2 min de lecture",
        title: "Ne plus manquer un appel pendant vos rendez-vous ou consultations",
        lead: "Un accueil téléphonique personnalisé répond au nom de votre structure et vous transmet chaque message en temps réel.",
        opening:
          "En consultation, en réunion ou en déplacement, décrocher interrompt votre concentration et laisser sonner fait perdre des demandes qualifiées. Avec une ligne dédiée (SDA) et des consignes sur-mesure, nos secrétaires accueillent vos interlocuteurs et vous envoient un récapitulatif clair par e-mail.",
        media: {
          kind: "image" as const,
          poster: "/accueil/services/OLIfzjc422mDfbLL7tuuhsgSgPDI1Z-metadGVsZXBob25lLnBuZw==--section.webp",
          src: null as string | null,
          alt: "Permanence téléphonique personnalisée",
          duration: null as string | null,
          reelHref: null as string | null,
        },
        href: "#",
        demo: true,
      },
    ],
  },
  faq: {
    demo: true,
    title: "FAQ",
    subtitle: "Adresse, horaires et services du centre d'affaires à Rouen.",
    items: [
      {
        id: "ou-se-trouve-alfa",
        question: "Où se trouve le centre d'affaires ?",
        answer:
          "Le siège est au 177 boulevard de l'Yser, 76000 Rouen, proche de la gare.",
      },
      {
        id: "horaires",
        question: "Quels sont les horaires d'accueil ?",
        answer: "Du lundi au vendredi, de 8h30 à 12h30 et de 14h à 17h.",
      },
      {
        id: "services",
        question: "Quels services propose Alfa ?",
        answer:
          "Domiciliation commerciale, permanence téléphonique, location de bureaux et salles de réunion.",
      },
      {
        id: "louer-un-bureau",
        question: "Peut-on louer un bureau pour quelques heures ?",
        answer:
          "Oui. La location ponctuelle part de 50€ HT : bureau équipé, charges locatives, connexion haut débit, café et thé compris. La location au mois part de 480€/mois HT, avec un accès sécurisé 24h/24 et 7j/7.",
      },
      {
        id: "domiciliation-permanence",
        question: "Comment fonctionnent la domiciliation et la permanence téléphonique ?",
        answer:
          "La domiciliation, à partir de 45€/mois HT, donne une adresse au cœur de Rouen, avec réception et tri des courriers et recommandés. La permanence téléphonique, à partir de 80€/mois HT, décroche pour vous, prend vos messages et vous les retransmet par e-mail.",
      },
    ],
  },
  reviews: {
    demo: true,
    title: "Plus de 75 000 entreprises nous font confiance !",
    intro:
      "Ils nous ont fait confiance. Pourquoi pas vous ? Découvrez ce que nos clients pensent de nous.",
    scores: [
      { id: "score-1218", label: "4,5 · 1218 avis" },
      { id: "score-1086", label: "4,5 · 1086 avis" },
    ],
    items: [
      {
        id: "juliette-s",
        author: "Juliette S.",
        date: "2022-03-29",
        dateLabel: "29/03/2022",
        title: "Service client efficace et rassurant",
        text: "Service client très agréable, réactif et efficace, même face aux imprévus. L’équipe est claire, fluide et rassurante. Cela m’a réellement soulagé d’une démarche administrative lourde et chronophage au quotidien.",
      },
      {
        id: "charlotte",
        author: "Charlotte",
        date: "2024-06-24",
        dateLabel: "24/06/2024",
        title: "Accompagnement clair et réactif",
        text: "Expérience client très satisfaisante. L’accompagnement est clair et réactif à chaque question, avec des réponses rapides et utiles. Le service est fiable, rassurant et efficace. Difficile de faire mieux sur ce type de démarche.",
      },
      {
        id: "fred-d",
        author: "Fred D.",
        date: "2026-08-08",
        dateLabel: "08/08/2026",
        title: "Processus simple et bien structuré",
        text: "Processus simple, clair et efficace. Le service est bien organisé et facile à utiliser au quotidien. Après comparaison de plusieurs offres de domiciliation, c’est l’un des meilleurs rapports qualité-prix disponibles actuellement.",
      },
      {
        id: "sonia-m",
        author: "Sonia M.",
        date: "2025-09-12",
        dateLabel: "12/09/2025",
        title: "Traitement rapide et tarifs compétitifs",
        text: "Service très rapide : le dossier a été traité en deux jours. Les tarifs sont inférieurs à ceux de la concurrence, avec un large choix d’adresses. Une solution efficace et économique, sans perte de temps inutile.",
      },
      {
        id: "maxime",
        author: "Maxime",
        date: "2026-08-26",
        dateLabel: "26/08/2026",
        title: "Site clair et création simple",
        text: "Site clair et agréable, avec une navigation fluide et une création de société très simple. Les tarifs restent attractifs même sur plusieurs années de domiciliation, inférieurs à ceux de la concurrence. Une solution fiable et cohérente.",
      },
    ],
  },
} as const;
