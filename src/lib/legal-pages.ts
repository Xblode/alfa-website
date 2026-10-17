/**
 * Identité : registre public (RCS Rouen, INSEE), enseigne ALFA AFFAIRES,
 * siège identique à l'adresse publiée sur alfa.fr.
 * Le corps des pages alfa.fr/mentions-legales et alfa.fr/politique-de-confidentialite
 * est vide (relevé le 2026-10-17). L'hébergeur n'y figure pas.
 */

export type LegalBlock = {
  heading: string;
  paragraphs: readonly string[];
  items?: readonly string[];
};

export type LegalPageContent = {
  path: "/mentions-legales" | "/politique-de-confidentialite";
  title: string;
  description: string;
  updated: string;
  blocks: readonly LegalBlock[];
  cookieSettings: boolean;
};

const publisher =
  "ORCA, SARL au capital de 20 200 €, enseigne Alfa Affaires. Siège : 177 boulevard de l'Yser, 76000 Rouen. RCS Rouen 351 048 392. SIRET 351 048 392 00010. TVA intracommunautaire FR86351048392.";

export const mentionsLegales: LegalPageContent = {
  path: "/mentions-legales",
  title: "Mentions légales",
  description:
    "Éditeur, directeur de la publication et contact du site Alfa, centre d'affaires à Rouen.",
  updated: "17 octobre 2026",
  cookieSettings: false,
  blocks: [
    {
      heading: "Éditeur",
      paragraphs: [
        publisher,
        "Ces informations viennent du registre du commerce et des sociétés et de l'INSEE. La page mentions légales publiée sur alfa.fr ne contient pas ce texte.",
      ],
    },
    {
      heading: "Directeur de la publication",
      paragraphs: ["Pascal Lepicard, gérant."],
    },
    {
      heading: "Contact",
      paragraphs: [
        "Téléphone : 02 32 08 32 32.",
        "E-mail : alfa@alfa.fr.",
        "Horaires : du lundi au vendredi, de 8h30 à 12h30 et de 14h à 17h.",
      ],
    },
    {
      heading: "Hébergement",
      paragraphs: [
        "Le nom de l'hébergeur n'est pas indiqué sur alfa.fr. Il sera ajouté ici au moment de la mise en ligne.",
      ],
    },
    {
      heading: "Propriété intellectuelle",
      paragraphs: [
        "Les textes, le logo et les photographies de ce site sont réservés à Alfa. Toute reproduction non autorisée est interdite.",
      ],
    },
  ],
};

export const politiqueConfidentialite: LegalPageContent = {
  path: "/politique-de-confidentialite",
  title: "Politique de Confidentialité",
  description:
    "Données traitées par le site Alfa, cookies et droits des personnes.",
  updated: "17 octobre 2026",
  cookieSettings: true,
  blocks: [
    {
      heading: "Responsable du traitement",
      paragraphs: [
        publisher,
        "Contact pour vos données : alfa@alfa.fr ou 02 32 08 32 32.",
      ],
    },
    {
      heading: "Ce que le site fait de vos données",
      paragraphs: [
        "Le champ e-mail de la bannière de contact ouvre un message dans votre messagerie, adressé à alfa@alfa.fr. L'adresse n'est pas enregistrée sur le site.",
        "Le formulaire « Contacter Alfa » (nom, e-mail, téléphone, message, services cochés) n'envoie et n'enregistre rien dans cette version.",
        "Le lien téléphonique ouvre l'appel sur votre appareil. Le site ne conserve pas l'appel.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "Le cookie alfa_cookie_consent et une entrée du stockage local mémorisent votre choix pendant 6 mois. Il est nécessaire pour ne pas reposer la question à chaque visite.",
        "Aucune mesure d'audience ni publicité n'est chargée tant que vous n'avez pas accepté la catégorie correspondante. Cette version du site n'insère pas de script Google Analytics ni DoubleClick.",
      ],
      items: [
        "Strictement nécessaires : mémorisation du consentement.",
        "Performance, ciblage, fonctionnalité et non classifiés : décrits dans le panneau, déposés seulement avec votre accord et seulement si le script existe.",
      ],
    },
    {
      heading: "Durée",
      paragraphs: [
        "Le choix de cookies est conservé 6 mois sur votre appareil. Les messages ouverts dans votre messagerie suivent la conservation de votre boîte mail, pas celle du site.",
      ],
    },
    {
      heading: "Vos droits",
      paragraphs: [
        "Vous pouvez demander l'accès, la rectification, l'effacement, la limitation ou la portabilité des données vous concernant, et vous opposer à un traitement. Écrivez à alfa@alfa.fr.",
        "Vous pouvez aussi déposer une réclamation auprès de la CNIL : cnil.fr.",
      ],
    },
  ],
};
