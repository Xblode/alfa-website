/**
 * Questionnaire d'orientation. Langue de référence : l'anglais en dérive la forme (points compris).
 * Aucun prix ni promesse : seuls des faits déjà publiés sur les services sont repris.
 */
import type { Quiz } from "../quiz/types";

// BROUILLON — à remplacer par les questions d'Alfa
export const quiz = {
  draft: true,
  intro: {
    title: "Trouvez votre offre en 4 questions",
    text: "Quelques questions rapides pour vous orienter vers le service qui vous correspond.",
    start: "Commencer",
  },
  questions: [
    {
      id: "profil",
      summaryLabel: "Vous êtes",
      title: "Vous êtes ?",
      answers: [
        { id: "praticien", label: "Praticien ou thérapeute", points: { personas: { praticien: 2 }, services: { "location-de-bureaux": 1 } } },
        { id: "consultant", label: "Consultant ou indépendant", points: { personas: { consultant: 2 }, services: { "salles-de-reunion": 1 } } },
        { id: "dirigeant", label: "Dirigeant d'entreprise", points: { personas: { dirigeant: 2 } } },
        { id: "createur", label: "Créateur d'entreprise", points: { personas: { createur: 2 }, services: { "domiciliation-commerciale": 1 } } },
        { id: "nomade", label: "Artisan ou commercial en déplacement", points: { personas: { nomade: 2 }, services: { "permanence-telephonique": 1 } } },
        // BROUILLON
        { id: "autre", label: "Autre", points: {} },
      ],
    },
    {
      id: "besoin",
      summaryLabel: "Besoin",
      title: "De quoi avez-vous besoin ?",
      answers: [
        { id: "adresse", label: "Une adresse pour mon entreprise", points: { services: { "domiciliation-commerciale": 3 } } },
        { id: "appels", label: "Quelqu'un qui répond à mes appels", points: { services: { "permanence-telephonique": 3 } } },
        { id: "bureau", label: "Un bureau pour travailler", points: { services: { "location-de-bureaux": 3 } } },
        { id: "salle", label: "Une salle pour recevoir ou réunir", points: { services: { "salles-de-reunion": 3 } } },
        { id: "inconnu", label: "Je ne sais pas encore", points: {} },
        // BROUILLON
        { id: "autre-besoin", label: "Autre besoin", points: {} },
      ],
    },
    {
      id: "frequence",
      summaryLabel: "Fréquence",
      title: "À quelle fréquence ?",
      answers: [
        { id: "rare", label: "Une fois de temps en temps", points: { services: { "salles-de-reunion": 1 } } },
        { id: "mensuel", label: "Quelques fois par mois", points: { services: { "salles-de-reunion": 1 } } },
        { id: "hebdo", label: "Chaque semaine", points: { services: { "location-de-bureaux": 1 } } },
        { id: "quotidien", label: "Tous les jours", points: { services: { "location-de-bureaux": 2 } } },
      ],
    },
    {
      id: "delai",
      summaryLabel: "Échéance",
      title: "Pour quand ?",
      answers: [
        { id: "maintenant", label: "Dès que possible", points: { services: { "location-de-bureaux": 1 } } },
        { id: "mois", label: "Dans le mois", points: {} },
        { id: "plus-tard", label: "Dans quelques mois", points: { services: { "domiciliation-commerciale": 1 } } },
        { id: "renseigne", label: "Je me renseigne", points: {} },
      ],
    },
  ],
  personas: [
    { id: "praticien", label: "Praticien" },
    { id: "consultant", label: "Consultant indépendant" },
    { id: "dirigeant", label: "Dirigeant" },
    { id: "createur", label: "Créateur d'entreprise" },
    { id: "nomade", label: "Artisan ou commercial en déplacement" },
  ],
  rules: {
    serviceOrder: [
      "domiciliation-commerciale",
      "permanence-telephonique",
      "location-de-bureaux",
      "salles-de-reunion",
    ],
    fallbackServiceId: "location-de-bureaux",
    officesServiceId: "location-de-bureaux",
    officeCount: 2,
  },
  results: {
    services: {
      "domiciliation-commerciale": {
        title: "La domiciliation commerciale",
        text: "Une adresse professionnelle à Rouen pour votre entreprise, avec votre courrier reçu et trié.",
      },
      "permanence-telephonique": {
        title: "La permanence téléphonique",
        text: "Nous décrochons pour vous, prenons vos messages et vous les transmettons par e-mail.",
      },
      "location-de-bureaux": {
        title: "La location de bureaux",
        text: "Un bureau prêt à l'emploi, ponctuel ou au mois.",
      },
      "salles-de-reunion": {
        title: "Les salles de réunion",
        text: "Une salle équipée pour vos rendez-vous, sans local permanent.",
      },
    },
    offices: {
      title: "Deux bureaux pour vous",
      text: "Voici deux bureaux disponibles qui peuvent convenir à votre activité.",
    },
    ctaAdvisor: "Contacter un conseiller",
    ctaEmail: "Laisser mon e-mail pour être recontacté",
  },
  ui: {
    progress: "Question {current} / {total}",
    progressLabel: "Progression du questionnaire",
    back: "Retour",
    restart: "Recommencer",
    resultLabel: "Votre résultat",
    serviceCta: "Découvrir ce service",
    serviceCtaLabel: "Découvrir ce service : {title}",
    officesLabel: "Bureaux recommandés",
    actionsTitle: "Et maintenant ?",
    emailLabel: "Votre e-mail",
    emailPlaceholder: "nom@exemple.fr",
    emailSubmit: "Être recontacté",
    emailSoon: "Bientôt disponible. En attendant, contactez un conseiller.",
    summary: {
      intro: "Questionnaire d'orientation",
      persona: "Profil estimé",
      recommendation: "Recommandation",
      separator: " : ",
    },
  },
} as const satisfies Quiz;
