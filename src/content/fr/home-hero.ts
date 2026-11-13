export const hero = {
  title: "Concentrez-vous sur l’essentiel",
  subtitle: "Domiciliez votre entreprise à Rouen",
  subtitleEmphasis: "votre entreprise",
  points: [
    "Près de 35 ans d'expérience au cœur de Rouen",
    "Domiciliation dès 45 € HT/mois, près de la gare",
    "Courrier et recommandés reçus et triés pour vous",
  ],
  // Renseigner score, count, source et href quand l'avis réel est vérifié ; null masque le bloc.
  rating: null as { score: number; count: number; source: string; href: string } | null,
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
} as const;

export const promises = [
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
] as const;
