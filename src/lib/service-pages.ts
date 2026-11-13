/**
 * Pages services, reconstruites pour une langue à partir de son dictionnaire.
 * Les textes rédigés sont dans `src/content/<langue>/services.ts` (domiciliation, permanence, titres, pastilles, FAQ).
 * Les paragraphes, listes et prix des bureaux et des salles viennent des offres et des services de l'accueil.
 */

import type { Dictionary } from "@/content";

export type ServicePageId =
  | "domiciliation-commerciale"
  | "permanence-telephonique"
  | "location-de-bureaux"
  | "salles-de-reunion";

export const servicePageIds = [
  "domiciliation-commerciale",
  "permanence-telephonique",
  "location-de-bureaux",
  "salles-de-reunion",
] as const satisfies readonly ServicePageId[];

export function isServicePageId(value: string): value is ServicePageId {
  return servicePageIds.some((id) => id === value);
}

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
  /** Identifiant neutre du bloc (ancre du titre), le même dans toutes les langues. */
  id: "what" | "why" | "solutions";
  /** Titre affiché, propre à la langue. */
  section: string;
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

export function getServicePages(dict: Dictionary): Record<ServicePageId, ServicePageContent> {
  const texts = dict.servicePages;

  function serviceVisual(id: ServicePageId): ServiceVisual {
    const item = dict.services.items.find((service) => service.id === id);
    if (!item) throw new Error(id);
    return { src: item.image, alt: item.imageAlt };
  }

  function spaceVisual(id: string): ServiceVisual {
    const item = dict.spaces.items.find((space) => space.id === id);
    if (!item?.image) throw new Error(id);
    return { src: item.image, alt: item.cardTitle };
  }

  function serviceHighlights(id: ServicePageId) {
    const item = dict.services.items.find((service) => service.id === id);
    if (!item) throw new Error(id);
    return item.highlights;
  }

  function offerFacts(id: "location-ponctuelle" | "location-au-mois") {
    const offer = dict.offers.items.find((item) => item.id === id);
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
    const offer = dict.offers.items.find((item) => item.id === id);
    if (!offer) throw new Error(id);
    return offer.intro;
  }

  const [reception, officeExample, contactSlide] = dict.hero.slides;
  const sections = texts.sections;
  const ponctuelle = offerFacts("location-ponctuelle");
  const mensuelle = offerFacts("location-au-mois");
  const bureauHighlights = serviceHighlights("location-de-bureaux");
  const salleHighlights = serviceHighlights("salles-de-reunion");

  const domiciliationTexts = texts["domiciliation-commerciale"];
  const domiciliation: ServicePageContent = {
    id: "domiciliation-commerciale",
    href: "/domiciliation-commerciale",
    title: domiciliationTexts.title,
    description: domiciliationTexts.description,
    image: serviceVisual("domiciliation-commerciale"),
    badges: domiciliationTexts.badges,
    blocks: [
      {
        id: "what",
        section: sections.what,
        paragraphs: domiciliationTexts.blocks[0].paragraphs,
        points: [],
        lists: [],
        image: spaceVisual("fecamp"),
      },
      {
        id: "why",
        section: sections.why,
        paragraphs: domiciliationTexts.blocks[1].paragraphs,
        points: [],
        lists: [],
        image: spaceVisual("dieppe"),
      },
      {
        id: "solutions",
        section: sections.solutions,
        paragraphs: domiciliationTexts.blocks[2].paragraphs,
        points: [],
        lists: [],
        image: serviceVisual("salles-de-reunion"),
      },
    ],
    faq: domiciliationTexts.faq,
  };

  const permanenceTexts = texts["permanence-telephonique"];
  const permanence: ServicePageContent = {
    id: "permanence-telephonique",
    href: "/permanence-telephonique",
    title: permanenceTexts.title,
    description: permanenceTexts.description,
    image: serviceVisual("permanence-telephonique"),
    badges: permanenceTexts.badges,
    blocks: [
      {
        id: "what",
        section: sections.what,
        paragraphs: permanenceTexts.blocks[0].paragraphs,
        points: [],
        lists: [],
        image: reception,
      },
      {
        id: "why",
        section: sections.why,
        paragraphs: permanenceTexts.blocks[1].paragraphs,
        points: [],
        lists: [],
        image: contactSlide,
      },
      {
        id: "solutions",
        section: sections.solutions,
        paragraphs: permanenceTexts.blocks[2].paragraphs,
        points: [],
        lists: [],
        image: spaceVisual("le-cabourg"),
      },
    ],
    faq: permanenceTexts.faq,
  };

  const bureauxTexts = texts["location-de-bureaux"];
  const bureaux: ServicePageContent = {
    id: "location-de-bureaux",
    href: "/location-de-bureaux",
    title: bureauxTexts.title,
    description: [offerIntro("location-au-mois")],
    image: serviceVisual("location-de-bureaux"),
    badges: bureauxTexts.badges,
    blocks: [
      {
        id: "what",
        section: sections.what,
        paragraphs: [offerIntro("location-ponctuelle"), bureauHighlights[0], bureauHighlights[1]],
        points: [],
        lists: [],
        image: spaceVisual("fecamp"),
      },
      {
        id: "why",
        section: sections.why,
        paragraphs: [bureauHighlights[2]],
        points: [],
        lists: [ponctuelle, mensuelle],
        image: spaceVisual("le-treport"),
      },
      {
        id: "solutions",
        section: sections.solutions,
        paragraphs: [offerIntro("sur-mesure")],
        points: [],
        lists: [],
        image: spaceVisual("dieppe"),
      },
    ],
    faq: bureauxTexts.faq,
  };

  const sallesTexts = texts["salles-de-reunion"];
  const salles: ServicePageContent = {
    id: "salles-de-reunion",
    href: "/salles-de-reunion",
    title: sallesTexts.title,
    description: [offerIntro("location-ponctuelle")],
    image: serviceVisual("salles-de-reunion"),
    badges: sallesTexts.badges,
    blocks: [
      {
        id: "what",
        section: sections.what,
        paragraphs: [...salleHighlights],
        points: [],
        lists: [],
        image: spaceVisual("le-cabourg"),
      },
      {
        id: "why",
        section: sections.why,
        paragraphs: [],
        points: [],
        lists: [ponctuelle],
        image: officeExample,
      },
      {
        id: "solutions",
        section: sections.solutions,
        paragraphs: [offerIntro("sur-mesure")],
        points: [],
        lists: [],
        image: serviceVisual("location-de-bureaux"),
      },
    ],
    faq: sallesTexts.faq,
  };

  return {
    "domiciliation-commerciale": domiciliation,
    "permanence-telephonique": permanence,
    "location-de-bureaux": bureaux,
    "salles-de-reunion": salles,
  };
}

/** Liens vers les autres pages services (le lien de la page courante est exclu). */
export function otherServiceLinks(
  pages: Record<ServicePageId, ServicePageContent>,
  id: ServicePageId,
): ServiceLink[] {
  return servicePageIds
    .filter((pageId) => pageId !== id)
    .map((pageId) => ({ href: pages[pageId].href, label: pages[pageId].title }));
}
