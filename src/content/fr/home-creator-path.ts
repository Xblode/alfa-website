export const creatorPath = {
  title: "Le parcours du créateur d'entreprise",
  intro:
    "De l'adresse du siège au premier courrier reçu, voici les sept étapes d'une création d'entreprise. Alfa intervient à deux moments : le choix de l'adresse et le démarrage de l'activité.",
  stepLabel: "Étape",
  cta: "Prendre rendez-vous",
  findCta: "Découvrir votre option !",
  steps: [
    {
      id: "adresse",
      title: "Choisir l'adresse du siège",
      text: "L'adresse du siège figure dans les statuts et sur les documents de l'entreprise. En vous domiciliant chez Alfa, vous signez un contrat de domiciliation et obtenez une attestation de domiciliation.",
      links: [{ label: "Domiciliation commerciale", href: "/domiciliation-commerciale" }],
    },
    {
      id: "statuts",
      title: "Rédiger les statuts",
      text: "Les statuts fixent les règles de fonctionnement de la société, et l'adresse du siège y est indiquée. Ils sont rédigés par vous ou par le professionnel du droit de votre choix.",
      links: [],
    },
    {
      id: "capital",
      title: "Déposer le capital",
      text: "Le capital social est déposé sur un compte ouvert au nom de la société en formation, en banque ou chez un notaire. Vous recevez une attestation de dépôt des fonds.",
      links: [],
    },
    {
      id: "annonce",
      title: "Publier l'annonce légale",
      text: "La création de la société est annoncée dans un journal habilité à publier des annonces légales. Vous obtenez une attestation de parution à joindre au dossier.",
      links: [],
    },
    {
      id: "guichet",
      title: "Déposer le dossier sur le Guichet unique de l'INPI",
      text: "Le dossier de création se dépose en ligne sur le Guichet unique des formalités d'entreprises, géré par l'INPI. Vous y joignez les statuts, l'attestation de domiciliation et les autres justificatifs demandés.",
      links: [],
    },
    {
      id: "immatriculation",
      title: "Obtenir le Kbis ou l'inscription au RNE",
      text: "Une fois le dossier validé, l'entreprise est immatriculée. Elle reçoit un Kbis ou une inscription au Registre national des entreprises (RNE), selon sa forme et son activité.",
      links: [],
    },
    {
      id: "demarrage",
      title: "Démarrer l'activité",
      text: "Alfa reçoit et trie votre courrier et vos recommandés, et peut assurer votre permanence téléphonique. Besoin d'un bureau ou d'une salle pour recevoir ? Nous en proposons à Rouen.",
      links: [
        { label: "Permanence téléphonique", href: "/permanence-telephonique" },
        { label: "Location de bureaux", href: "/location-de-bureaux" },
        { label: "Salles de réunion", href: "/salles-de-reunion" },
      ],
    },
  ],
} as const;
