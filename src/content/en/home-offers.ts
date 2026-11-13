import type { Dictionary } from "../fr";

export const offers: Dictionary["offers"] = {
  title: "See the Alfa offers",
  cta: "Contact us",
  ctaHref: "#",
  items: [
    {
      id: "location-ponctuelle",
      title: "Occasional rental",
      intro: "Self-employed, a founder or an employee? Rent a furnished office that is ready when you arrive",
      subtitle: "Occasional offices and meeting rooms",
      bullets: [
        "Rent included",
        "A personal, secure locker",
        "High-speed internet",
        "Coffee and tea included",
        "Scanning included",
        "Client welcome and a waiting room",
        "10 prints included",
      ],
      examples: [
        {
          role: "Osteopath",
          scene: "You see patients two half-days a week, in a quiet office.",
        },
        {
          role: "Visiting salesperson",
          scene: "You have a meeting between two trains: the room is ready when you arrive.",
        },
        {
          role: "Trainer",
          scene: "You run a one-day workshop, then leave in the evening.",
        },
      ],
      price: {
        amountHt: 50,
        unit: "once",
        label: "From €50 excl. tax",
      },
    },
    {
      id: "sur-mesure",
      title: "Your tailored solution",
      intro: "Whatever your budget and timing, the sales team will suggest a solution that fits.",
      subtitle: null,
      bullets: [],
      examples: [
        {
          role: "Association",
          scene: "You combine a few office days, mail handling and a telephone welcome.",
        },
        {
          role: "Project team",
          scene: "You are on site only a few days a month, and the plan follows that rhythm.",
        },
        {
          role: "Practice",
          scene: "You want a Rouen address and a room for meetings, without the full monthly plan.",
        },
      ],
      price: null,
    },
    {
      id: "location-au-mois",
      title: "Monthly rental",
      intro: "Need a workspace that is ready now? Rent an office that fits your work.",
      subtitle: "Flexible offices",
      bullets: [
        "Space sized to your needs",
        "Secure access to your office, 24 hours a day, 7 days a week",
        "Rent included",
        "A direct phone line",
        "Business address included",
        "Private parking when available",
        "High-speed internet",
        "Postage and mail collection",
        "A break area",
        "Client welcome and a waiting room",
        "Secretarial and business support",
        "Your name on the door",
        "Coffee and tea included",
        "100 prints included",
      ],
      examples: [
        {
          role: "Consultant",
          scene: "You are setting up in Rouen and want an office in your name, without a multi-year lease.",
        },
        {
          role: "Small team",
          scene: "There are two or three of you, and you need a space open 24 hours a day.",
        },
        {
          role: "Director",
          scene: "You meet partners and candidates a few days a week, with a business address at the same location.",
        },
      ],
      price: {
        amountHt: 480,
        unit: "month",
        label: "From €480 per month excl. tax",
      },
    },
    {
      id: "permanence-telephonique",
      title: "Telephone answering",
      intro: "We answer for you, take your messages and email them to you.",
      subtitle: null,
      bullets: [
        "Dedicated phone line",
        "Personalised greeting",
        "Call transfer",
        "Line forwarding",
      ],
      examples: [
        {
          role: "Tradesperson",
          scene: "You are on site: we answer, note the message and email it to you.",
        },
        {
          role: "Therapist",
          scene: "You are in a session: someone answers for you and passes the call on.",
        },
        {
          role: "Self-employed, on the move",
          scene: "You are in a meeting: a dedicated line answers in your organisation’s name.",
        },
      ],
      price: {
        amountHt: 80,
        unit: "month",
        label: "From €80 per month excl. tax",
      },
    },
    {
      id: "domiciliation-commerciale",
      title: "Business address",
      intro: "We answer for you, take your messages and email them to you.",
      subtitle: null,
      bullets: [
        "An address in the heart of Rouen",
        "A service tailored to your needs",
        "Mail and registered letters received and sorted.",
      ],
      examples: [
        {
          role: "Sole trader",
          scene: "You keep your home address private and show a Rouen address.",
        },
        {
          role: "Company",
          scene: "You move your registered office and have mail and registered letters received for you.",
        },
        {
          role: "Online seller",
          scene: "You work from home and put a business address on your documents.",
        },
      ],
      price: {
        amountHt: 45,
        unit: "month",
        label: "From €45 per month excl. tax",
      },
    },
  ],
};
