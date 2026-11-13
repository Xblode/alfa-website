import type { Dictionary } from "../fr";

// BROUILLON — à remplacer par les questions d'Alfa
export const quiz: Dictionary["quiz"] = {
  draft: true,
  intro: {
    title: "Find your offer in 4 questions",
    text: "A few quick questions to point you to the service that suits you.",
    start: "Start",
  },
  questions: [
    {
      id: "profil",
      summaryLabel: "You are",
      title: "Who are you?",
      answers: [
        { id: "praticien", label: "Practitioner or therapist", points: { personas: { praticien: 2 }, services: { "location-de-bureaux": 1 } } },
        { id: "consultant", label: "Consultant or freelancer", points: { personas: { consultant: 2 }, services: { "salles-de-reunion": 1 } } },
        { id: "dirigeant", label: "Company director", points: { personas: { dirigeant: 2 } } },
        { id: "createur", label: "Business founder", points: { personas: { createur: 2 }, services: { "domiciliation-commerciale": 1 } } },
        { id: "nomade", label: "Tradesperson or sales rep on the move", points: { personas: { nomade: 2 }, services: { "permanence-telephonique": 1 } } },
        // BROUILLON
        { id: "autre", label: "Other", points: {} },
      ],
    },
    {
      id: "besoin",
      summaryLabel: "Need",
      title: "What do you need?",
      answers: [
        { id: "adresse", label: "An address for my business", points: { services: { "domiciliation-commerciale": 3 } } },
        { id: "appels", label: "Someone to answer my calls", points: { services: { "permanence-telephonique": 3 } } },
        { id: "bureau", label: "An office to work in", points: { services: { "location-de-bureaux": 3 } } },
        { id: "salle", label: "A room to host or hold meetings", points: { services: { "salles-de-reunion": 3 } } },
        { id: "inconnu", label: "I don't know yet", points: {} },
        // BROUILLON
        { id: "autre-besoin", label: "Something else", points: {} },
      ],
    },
    {
      id: "frequence",
      summaryLabel: "Frequency",
      title: "How often?",
      answers: [
        { id: "rare", label: "Once in a while", points: { services: { "salles-de-reunion": 1 } } },
        { id: "mensuel", label: "A few times a month", points: { services: { "salles-de-reunion": 1 } } },
        { id: "hebdo", label: "Every week", points: { services: { "location-de-bureaux": 1 } } },
        { id: "quotidien", label: "Every day", points: { services: { "location-de-bureaux": 2 } } },
      ],
    },
    {
      id: "delai",
      summaryLabel: "Timeline",
      title: "When?",
      answers: [
        { id: "maintenant", label: "As soon as possible", points: { services: { "location-de-bureaux": 1 } } },
        { id: "mois", label: "Within the month", points: {} },
        { id: "plus-tard", label: "In a few months", points: { services: { "domiciliation-commerciale": 1 } } },
        { id: "renseigne", label: "Just looking for information", points: {} },
      ],
    },
  ],
  personas: [
    { id: "praticien", label: "Practitioner" },
    { id: "consultant", label: "Independent consultant" },
    { id: "dirigeant", label: "Director" },
    { id: "createur", label: "Business founder" },
    { id: "nomade", label: "Tradesperson or sales rep on the move" },
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
        title: "Business domiciliation",
        text: "A professional address in Rouen for your company, with your mail received and sorted.",
      },
      "permanence-telephonique": {
        title: "Telephone answering service",
        text: "We answer for you, take your messages and pass them on by e-mail.",
      },
      "location-de-bureaux": {
        title: "Office rental",
        text: "A ready-to-use office, one-off or by the month.",
      },
      "salles-de-reunion": {
        title: "Meeting rooms",
        text: "A fully equipped room for your meetings, with no permanent premises.",
      },
    },
    offices: {
      title: "Two offices for you",
      text: "Here are two available offices that may suit your activity.",
    },
    ctaAdvisor: "Contact an advisor",
    ctaEmail: "Leave my e-mail to be contacted",
  },
  ui: {
    progress: "Question {current} / {total}",
    progressLabel: "Questionnaire progress",
    back: "Back",
    restart: "Start over",
    resultLabel: "Your result",
    serviceCta: "Discover this service",
    serviceCtaLabel: "Discover this service: {title}",
    officesLabel: "Recommended offices",
    actionsTitle: "What next?",
    emailLabel: "Your email",
    emailPlaceholder: "name@example.com",
    emailSubmit: "Be contacted",
    emailSoon: "Coming soon. In the meantime, contact an advisor.",
    summary: {
      intro: "Orientation questionnaire",
      persona: "Estimated profile",
      recommendation: "Recommendation",
      separator: ": ",
    },
  },
};
