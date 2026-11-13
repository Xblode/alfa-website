export const articles = {
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
} as const;
