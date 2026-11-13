import type { Dictionary } from "../fr";

export const faq: Dictionary["faq"] = {
  demo: true,
  title: "FAQ",
  subtitle: "Address, hours and services at the Rouen business centre.",
  items: [
    {
      id: "ou-se-trouve-alfa",
      question: "Where is the business centre?",
      answer: "The head office is at 177 boulevard de l'Yser, 76000 Rouen, near the station.",
    },
    {
      id: "horaires",
      question: "What are the reception hours?",
      answer: "Monday to Friday, 8:30–12:30 and 14:00–17:00.",
    },
    {
      id: "services",
      question: "What services does Alfa offer?",
      answer: "Business address, telephone answering, office rental and meeting rooms.",
    },
    {
      id: "louer-un-bureau",
      question: "Can I rent an office for a few hours?",
      answer: "Yes. Occasional rental starts at €50 excl. tax: a furnished office, rent, high-speed internet, coffee and tea included. Monthly rental starts at €480 per month excl. tax, with secure access 24 hours a day, 7 days a week.",
    },
    {
      id: "domiciliation-permanence",
      question: "How do the business address and telephone answering work?",
      answer: "The business address, from €45 per month excl. tax, gives you an address in the heart of Rouen, with mail and registered letters received and sorted. Telephone answering, from €80 per month excl. tax, picks up for you, takes messages and emails them to you.",
    },
  ],
};
