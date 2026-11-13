export const reviews = {
  demo: true,
  title: "Ils nous font confiance !",
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
} as const;
