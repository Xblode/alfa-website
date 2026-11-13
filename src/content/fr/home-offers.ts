export const offers = {
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
} as const;
