export const personas = {
  demo: true,
  title: "Un local pour recevoir, selon votre métier",
  intro:
    "Quel que soit votre métier : un espace prêt à l'emploi, le temps d'un rendez-vous ou au mois.",
  items: [
    {
      id: "praticien",
      href: "/location-de-bureaux",
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
      href: "/salles-de-reunion",
      role: "Consultant indépendant",
      title: "Recevoir vos clients dans un cadre professionnel",
      image:
        "/accueil/services/kHTq7r1Hgc7dZ4CA5Tlc8hrSxMBhG8-metac2FsbGVfZGVfcmV1bmlvbi5qcGc=--section.webp",
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
      href: "/domiciliation-commerciale",
      role: "Dirigeant",
      title: "Recevoir partenaires et candidats sans bureau fixe",
      image:
        "/accueil/services/PnL1e1L2xhO5wZ05ZsNh7TpBOzgcrU-metabG9jYXV4LmpwZw==--section.webp",
      imageAlt: "Espace de réception pour dirigeant",
      need: "Quelques rendez-vous par mois suffisent : un espace à votre nom, sans engager un bail classique.",
      advantages: [
        "Accueil de vos visiteurs et salle d'attente",
        "En location au mois : signalisation de votre entité",
        "En location au mois : accès sécurisé 24h/24 et 7j/7",
        "Domiciliation possible à la même adresse",
      ],
    },
    {
      id: "createur",
      href: "/domiciliation-commerciale",
      role: "Créateur d'entreprise",
      title: "Domicilier votre société dès sa création",
      image: "/accueil/hero/V.HUON-5809-slider.webp",
      imageAlt: "Espace d'accueil du centre d'affaires",
      need: "Une adresse professionnelle à Rouen pour l'immatriculation de votre société, avec votre courrier reçu et trié.",
      advantages: ["Adresse professionnelle à Rouen", "Courrier reçu et trié"],
    },
    {
      id: "nomade",
      href: "/permanence-telephonique",
      role: "Artisan ou commercial en déplacement",
      title: "Ne plus manquer un appel en rendez-vous",
      image:
        "/accueil/services/OLIfzjc422mDfbLL7tuuhsgSgPDI1Z-metadGVsZXBob25lLnBuZw==--section.webp",
      imageAlt: "Permanence téléphonique",
      need: "La permanence téléphonique prend vos messages et vous les transmet par e-mail.",
      advantages: [
        "Appels pris en charge pour vous",
        "Messages transmis par e-mail",
      ],
    },
  ],
} as const;
