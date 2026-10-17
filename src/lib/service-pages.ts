/**
 * Pages services.
 * Domiciliation et permanence : paragraphes publiés sur alfa.fr le 2026-10-17,
 * redistribués sous les trois titres du gabarit.
 * Bureaux et salles : phrases et prix déjà présents dans home-content (offres, highlights).
 * Le « Dès 50 € HT » des salles est l'offre ponctuelle, qui couvre déjà bureau et salle.
 */

import { homeContent } from "@/lib/home-content";

export type ServicePageId =
  | "domiciliation-commerciale"
  | "permanence-telephonique"
  | "location-de-bureaux"
  | "salles-de-reunion";

export type ServiceVisual = {
  src: string;
  alt: string;
};

export type ServiceFactList = {
  title: string;
  note: string;
  points: readonly string[];
};

export type ServiceBlockContent = {
  section: "Qu'est-ce que" | "Pourquoi choisir" | "Solutions Alfa";
  paragraphs: readonly string[];
  points: readonly string[];
  lists: readonly ServiceFactList[];
  image: ServiceVisual;
};

export type ServiceFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type ServicePageContent = {
  id: ServicePageId;
  href: `/${ServicePageId}`;
  title: string;
  description: readonly string[];
  image: ServiceVisual;
  badges: readonly [string, string, string];
  blocks: readonly [ServiceBlockContent, ServiceBlockContent, ServiceBlockContent];
  faq: {
    title: string;
    subtitle: string;
    items: readonly [ServiceFaqItem, ServiceFaqItem, ServiceFaqItem, ServiceFaqItem];
  };
};

export type ServiceLink = {
  href: string;
  label: string;
};

function serviceVisual(id: ServicePageId): ServiceVisual {
  const item = homeContent.services.items.find((service) => service.id === id);
  if (!item) throw new Error(id);
  return { src: item.image, alt: item.imageAlt };
}

function spaceVisual(id: string): ServiceVisual {
  const item = homeContent.spaces.items.find((space) => space.id === id);
  if (!item?.image) throw new Error(id);
  return { src: item.image, alt: item.cardTitle };
}

function serviceHighlights(id: ServicePageId) {
  const item = homeContent.services.items.find((service) => service.id === id);
  if (!item) throw new Error(id);
  return item.highlights;
}

function offerFacts(id: "location-ponctuelle" | "location-au-mois") {
  const offer = homeContent.offers.items.find((item) => item.id === id);
  if (!offer || offer.price === null || offer.subtitle === null) {
    throw new Error(id);
  }
  return {
    title: offer.title,
    note: `${offer.subtitle}. ${offer.price.label}`,
    points: offer.bullets,
  };
}

function offerIntro(id: "sur-mesure" | "location-ponctuelle" | "location-au-mois") {
  const offer = homeContent.offers.items.find((item) => item.id === id);
  if (!offer) throw new Error(id);
  return offer.intro;
}

const slides = homeContent.hero.slides;
const reception = slides[0];
const officeExample = slides[1];
const contactSlide = slides[2];
if (!reception || !officeExample || !contactSlide) {
  throw new Error("Visuels d'accueil manquants");
}

const ponctuelle = offerFacts("location-ponctuelle");
const mensuelle = offerFacts("location-au-mois");
const bureauHighlights = serviceHighlights("location-de-bureaux");
const salleHighlights = serviceHighlights("salles-de-reunion");

const domiciliation: ServicePageContent = {
  id: "domiciliation-commerciale",
  href: "/domiciliation-commerciale",
  title: "Domiciliation commerciale",
  description: [
    "Alfa propose un service de domiciliation commerciale pour les entreprises. Profitez d’une adresse postale en plein cœur de Rouen, juste à côté de la gare, mais aussi d’un service personnalisé, adapté à vos besoins. Notre équipe s'occupe de gérer la réception, le tri et la réexpédition du courrier de votre entreprise ou société.",
  ],
  image: serviceVisual("domiciliation-commerciale"),
  badges: ["Dès 45 € HT / mois", "Adresse au cœur de Rouen", "Courrier et recommandés triés"],
  blocks: [
    {
      section: "Qu'est-ce que",
      paragraphs: [
        "Lors de l'immatriculation d'une entreprise au RCS ou au Répertoire des Métiers, l'État impose à votre société de disposer d'une domiciliation commerciale. Cette domiciliation correspond à l'adresse administrative de l'entreprise : elle représente son siège social et atteste de l'adresse fiscale et juridique.",
        "Bon à savoir : la domiciliation commerciale peut se distinguer du lieu d'exercice de l'activité. Vous pouvez domicilier le siège social de votre entreprise ou société à Rouen, mais travailler depuis un local situé à Paris, à Lyon, à Marseille... Où bon vous semble !",
        "Que vous soyez entrepreneur en auto-entreprise, une SASU, une EURL ou autre forme d'entreprise individuelle ou encore une société commerciale pluripersonnelle comme une SAS ou une SARL, vous pouvez profitez de notre offre de domiciliation commerciale. N'hésitez pas à nous contacter pour en savoir plus !",
      ],
      points: [],
      lists: [],
      image: spaceVisual("fecamp"),
    },
    {
      section: "Pourquoi choisir",
      paragraphs: [
        "Grâce à notre service de domiciliation d'entreprise, vous pourrez utiliser notre adresse sur tous les documents commerciaux de votre entreprise ou société.",
        "Elle vous permettra de profiter d'une implantation au cœur de la prestigieuse ville de Rouen, avec un service personnalisé, adapté à vos besoins. Cette adresse contribue ainsi à l'image de marque de votre entreprise auprès de vos partenaires, vos collaborateurs ou encore clients.",
        "Si vous êtes un entrepreneur et que vous travaillez chez vous, la domiciliation de votre entreprise vous permet par exemple d'utiliser une autre adresse que celle de votre domicile. On s'occupe d'acheminer vos courriers chez vous ou sur votre lieu de travail, sans que vos partenaires et clients n'en connaissent l'emplacement. Vous évitez également les visites indésirables.",
        "La domiciliation est aussi le choix de la flexibilité : alors qu'un bail commercial est généralement conclu pour une longue durée, un contrat de domiciliation commerciale peut être engagé pour seulement 3 mois, facilement reconductibles.",
        "Du côté des tarifs, la domiciliation est très avantageuse : il s'agit d'une solution peu coûteuse, qui s'adapte au volume de votre activité. Vous bénéficiez au passage d'un service de réception, tri & renvoi de vos courriers. Vous avez tout à y gagner !",
      ],
      points: [],
      lists: [],
      image: spaceVisual("dieppe"),
    },
    {
      section: "Solutions Alfa",
      paragraphs: [
        "Quelque soit la formule de domiciliation d'entreprise que vous choisissez, nous gérons la réception et le tri de vos courriers et recommandés. Vous pouvez choisir de faire réexpédier votre courrier à l'adresse de votre choix ou bien de venir le chercher à votre convenance. Pratique !",
        "Si besoin, nos locaux vous offrent également la possibilité de louer un bureau ou une salle de réunion pour une durée déterminée, ponctuelle ou au mois.",
        "Nous pouvons également effectuer la permanence téléphonique de votre entreprise ou société. Nous décrochons pour vous, prenons vos messages et vous les retransmettons par mail. Vous n'avez plus qu'à vous concentrer sur l'essentiel.",
        "N'hésitez pas à jeter un œil à nos offres pour en savoir plus.",
        "Une question ? Contactez-nous !",
      ],
      points: [],
      lists: [],
      image: serviceVisual("salles-de-reunion"),
    },
  ],
  faq: {
    title: "FAQ",
    subtitle: "Adresse, courrier et durée de la domiciliation à Rouen.",
    items: [
      {
        id: "prix-domiciliation",
        question: "Combien coûte la domiciliation commerciale ?",
        answer:
          "Dès 45 € HT par mois. L'offre inclut une adresse au cœur de Rouen, avec réception et tri des courriers et recommandés.",
      },
      {
        id: "siege-domiciliation",
        question: "Cette adresse peut-elle être le siège de ma société ?",
        answer:
          "Oui. C'est l'adresse administrative : siège social, adresse fiscale et juridique. Elle peut être distincte du lieu où vous travaillez.",
      },
      {
        id: "courrier-domiciliation",
        question: "Que faites-vous de mon courrier ?",
        answer:
          "Nous réceptionnons et trions les courriers et les recommandés. Vous pouvez les faire réexpédier, ou venir les chercher.",
      },
      {
        id: "duree-domiciliation",
        question: "Pour combien de temps puis-je domicilier mon entreprise ?",
        answer:
          "Le contrat peut démarrer pour 3 mois, puis être reconduit. Ce n'est pas un bail commercial de longue durée.",
      },
    ],
  },
};

const permanence: ServicePageContent = {
  id: "permanence-telephonique",
  href: "/permanence-telephonique",
  title: "Permanence téléphonique",
  description: [
    "Alfa vous propose un service de permanence téléphonique. Le concept ? Nous décrochons pour vous en personnalisant chaque appel, prenons vos messages et vous les retransmettons par mail. Vous pouvez ainsi vous consacrer pleinement à votre activité !",
  ],
  image: serviceVisual("permanence-telephonique"),
  badges: ["Dès 80 € HT / mois", "Message personnalisé", "Transfert et renvoi de ligne"],
  blocks: [
    {
      section: "Qu'est-ce que",
      paragraphs: [
        "Un bon accueil téléphonique est le premier pas vers la satisfaction client. Chez Alfa, nous veillons à ce que vos clients et partenaires soient bien reçus et que chaque appel laisse un sentiment positif, peu importe votre profession (entrepreneur, TPE, PME, notaire, cabinet médical...).",
        "Grâce à notre service de permanence téléphonique, les appels de votre entreprise sont dérivés sur une ligne dédiée, entièrement réservée à votre activité. Ainsi, l'accueil est personnalisé, précis et immédiat, comme s'il s'agissait de votre propre secrétariat.",
        "Une fois l'appel terminé, nous prenons note de vos messages et rendez-vous en parfaite adéquation avec vos instructions. Plus d'appel perdu, une réponse immédiate, un interlocuteur souriant : votre image de marque est valorisée, de même que votre activité. Notre service de permanence téléphonique assure votre tranquillité d'esprit.",
      ],
      points: [],
      lists: [],
      image: reception,
    },
    {
      section: "Pourquoi choisir",
      paragraphs: [
        "Vous prévoyez de vous absenter ? Nous vous proposons de transférer votre ligne sur notre standard et de répondre de manière personnalisée, conformément à vos envies et vos besoins. Une solution économique et pratique pour vous satisfaire et prendre soin de votre clientèle !",
        "Même en votre absence, votre activité continue grâce à notre service de permanence téléphonique. Vos appels sont pris en charge, toujours avec le sourire, pour que vous puissiez partir l'esprit tranquille. La gestion sera ainsi beaucoup plus simple à votre retour : fini les boîtes vocales remplies de messages !",
      ],
      points: [],
      lists: [],
      image: contactSlide,
    },
    {
      section: "Solutions Alfa",
      paragraphs: [
        "Vous souhaitez élargir votre fichier clientèle ? Notre permanence téléphonique vous propose également un service de renvoi de ligne. Comment ça fonctionne ? Une simple ligne de téléphone, mise en service par nos soins et re-routée sur l'un de nos numéros vous permet d'être présent dans plusieurs départements.",
        "Vous souhaitez en savoir plus sur notre service de permanence téléphonique ? N'hésitez pas à consulter nos offres ou à nous contacter !",
      ],
      points: [],
      lists: [],
      image: spaceVisual("le-cabourg"),
    },
  ],
  faq: {
    title: "FAQ",
    subtitle: "Accueil des appels, messages et renvoi de ligne.",
    items: [
      {
        id: "prix-permanence",
        question: "Combien coûte la permanence téléphonique ?",
        answer:
          "Dès 80 € HT par mois. Le message est personnalisé, avec transfert d'appel et renvoi de ligne.",
      },
      {
        id: "accueil-permanence",
        question: "Comment sont accueillis mes correspondants ?",
        answer:
          "Vos appels arrivent sur une ligne dédiée à votre activité. L'accueil est personnalisé, comme un secrétariat.",
      },
      {
        id: "messages-permanence",
        question: "Comment je reçois les messages ?",
        answer:
          "Nous notons les messages et les rendez-vous selon vos instructions, puis nous vous les retransmettons par e-mail.",
      },
      {
        id: "absence-permanence",
        question: "Puis-je transférer ma ligne pendant une absence ?",
        answer:
          "Oui. Votre ligne peut être transférée sur le standard Alfa. Un renvoi de ligne permet aussi d'être joignable dans plusieurs départements.",
      },
    ],
  },
};

const bureaux: ServicePageContent = {
  id: "location-de-bureaux",
  href: "/location-de-bureaux",
  title: "Location de bureaux",
  description: [offerIntro("location-au-mois")],
  image: serviceVisual("location-de-bureaux"),
  badges: ["Dès 50 € HT", "Dès 480 € / mois", "Charges et connexion incluses"],
  blocks: [
    {
      section: "Qu'est-ce que",
      paragraphs: [offerIntro("location-ponctuelle"), bureauHighlights[0], bureauHighlights[1]],
      points: [],
      lists: [],
      image: spaceVisual("fecamp"),
    },
    {
      section: "Pourquoi choisir",
      paragraphs: [bureauHighlights[2]],
      points: [],
      lists: [ponctuelle, mensuelle],
      image: spaceVisual("le-treport"),
    },
    {
      section: "Solutions Alfa",
      paragraphs: [offerIntro("sur-mesure")],
      points: [],
      lists: [],
      image: spaceVisual("dieppe"),
    },
  ],
  faq: {
    title: "FAQ",
    subtitle: "Bureau ponctuel ou au mois, charges comprises.",
    items: [
      {
        id: "prix-bureau-ponctuel",
        question: "Puis-je louer un bureau pour quelques heures ?",
        answer:
          "Oui. La location ponctuelle part de 50 € HT : bureau équipé, charges locatives, connexion haut débit, café et thé compris.",
      },
      {
        id: "prix-bureau-mois",
        question: "Quel est le prix d'un bureau au mois ?",
        answer:
          "La location au mois part de 480 € HT par mois, avec un accès sécurisé 24h/24 et 7j/7.",
      },
      {
        id: "inclus-bureau",
        question: "Les charges sont-elles incluses ?",
        answer:
          "Oui. Charges locatives et connexion haut débit sont incluses. Les bureaux sont intimistes et modulables, en location ponctuelle ou au mois.",
      },
      {
        id: "sur-mesure-bureau",
        question: "Puis-je avoir une formule adaptée à mon activité ?",
        answer:
          "Oui. Quel que soit le budget et les délais, l'équipe commerciale propose une solution sur-mesure.",
      },
    ],
  },
};

const salles: ServicePageContent = {
  id: "salles-de-reunion",
  href: "/salles-de-reunion",
  title: "Salles de réunion",
  description: [offerIntro("location-ponctuelle")],
  image: serviceVisual("salles-de-reunion"),
  badges: ["Dès 50 € HT", "Espace équipé", "Accueil et salle d’attente"],
  blocks: [
    {
      section: "Qu'est-ce que",
      paragraphs: [...salleHighlights],
      points: [],
      lists: [],
      image: spaceVisual("le-cabourg"),
    },
    {
      section: "Pourquoi choisir",
      paragraphs: [],
      points: [],
      lists: [ponctuelle],
      image: officeExample,
    },
    {
      section: "Solutions Alfa",
      paragraphs: [offerIntro("sur-mesure")],
      points: [],
      lists: [],
      image: serviceVisual("location-de-bureaux"),
    },
  ],
  faq: {
    title: "FAQ",
    subtitle: "Salle équipée pour une réunion ou un rendez-vous.",
    items: [
      {
        id: "prix-salle",
        question: "Combien coûte une salle de réunion ?",
        answer:
          "La location ponctuelle part de 50 € HT. La salle est équipée et immédiatement opérationnelle.",
      },
      {
        id: "accueil-salle",
        question: "Peut-on recevoir des clients sur place ?",
        answer:
          "Oui. L'accueil de vos clients et une salle d'attente font partie de l'offre, avec le café, le thé et les impressions.",
      },
      {
        id: "prete-salle",
        question: "La salle est-elle prête en arrivant ?",
        answer:
          "Oui. C'est un espace équipé, utilisable dès l'arrivée, pour une réunion ou un rendez-vous.",
      },
      {
        id: "sur-mesure-salle",
        question: "Peut-on adapter la location à un besoin précis ?",
        answer:
          "Oui. Quel que soit le budget et les délais, l'équipe commerciale propose une solution sur-mesure.",
      },
    ],
  },
};

export const servicePages = {
  "domiciliation-commerciale": domiciliation,
  "permanence-telephonique": permanence,
  "location-de-bureaux": bureaux,
  "salles-de-reunion": salles,
} satisfies Record<ServicePageId, ServicePageContent>;

export const servicePageList = [
  servicePages["domiciliation-commerciale"],
  servicePages["permanence-telephonique"],
  servicePages["location-de-bureaux"],
  servicePages["salles-de-reunion"],
] as const;

export function otherServiceLinks(id: ServicePageId): ServiceLink[] {
  return servicePageList
    .filter((page) => page.id !== id)
    .map((page) => ({ href: page.href, label: page.title }));
}
