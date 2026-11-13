import type { Dictionary } from "../fr";

export const servicePages: Dictionary["servicePages"] = {
  sections: {
    what: "What it is",
    why: "Why choose it",
    solutions: "Alfa solutions",
  },
  "domiciliation-commerciale": {
    title: "Business address",
    description: [
      "Alfa offers a business address for companies. You get a postal address in the heart of Rouen, next to the station, and a service tailored to your needs. The team receives, sorts and forwards your company’s mail.",
    ],
    badges: [
      "From €45 excl. tax / month",
      "An address in the heart of Rouen",
      "Mail and registered letters sorted",
    ],
    blocks: [
      {
        paragraphs: [
          "When a company is registered, it must have a business address. That address is the company’s administrative address: its registered office, and its tax and legal address.",
          "Good to know: the business address can be different from where you work. You can register your office in Rouen and work from Paris, Lyon, Marseille, or wherever you like.",
          "Whether you are a sole trader or a company, you can use the business address. Contact us to find out more.",
        ],
      },
      {
        paragraphs: [
          "With the business address, you can use our address on all of your company’s commercial documents.",
          "You get a presence in the heart of Rouen, with a service shaped to your needs. The address supports your image with partners, colleagues and clients.",
          "If you work from home, the business address lets you use a different address from your house. We forward your mail to you, without partners or clients knowing that location. You also avoid unwanted visits.",
          "It is also the flexible choice: a commercial lease usually runs for a long time, while a business-address contract can start at 3 months and be renewed easily.",
          "On price, it is a modest solution that follows the volume of your work. You also get mail received, sorted and forwarded. It works in your favour.",
        ],
      },
      {
        paragraphs: [
          "Whichever business-address plan you choose, we receive and sort your mail and registered letters. You can have them forwarded, or collect them when it suits you.",
          "If you need it, you can also rent an office or a meeting room for a set time, occasionally or by the month.",
          "We can also answer the phone for your company. We pick up, take messages and email them to you. You can focus on your work.",
          "Have a look at the offers to find out more.",
          "A question? Contact us.",
        ],
      },
    ],
    faq: {
      title: "FAQ",
      subtitle: "Address, mail and length of a business address in Rouen.",
      items: [
        {
          id: "prix-domiciliation",
          question: "How much does a business address cost?",
          answer: "From €45 excl. tax per month. The offer includes an address in the heart of Rouen, with mail and registered letters received and sorted.",
        },
        {
          id: "siege-domiciliation",
          question: "Can this address be my company's registered office?",
          answer: "Yes. It is the administrative address: registered office, tax address and legal address. It can be different from where you work.",
        },
        {
          id: "courrier-domiciliation",
          question: "What do you do with my mail?",
          answer: "We receive and sort mail and registered letters. You can have them forwarded, or collect them yourself.",
        },
        {
          id: "duree-domiciliation",
          question: "How long can I keep the business address?",
          answer: "The contract can start for 3 months, then be renewed. It is not a long commercial lease.",
        },
      ],
    },
  },
  "permanence-telephonique": {
    title: "Telephone answering",
    description: [
      "Alfa offers telephone answering. We pick up in your name, take your messages and email them to you, so you can stay on your work.",
    ],
    badges: [
      "From €80 excl. tax / month",
      "Personalised greeting",
      "Call transfer and line forwarding",
    ],
    blocks: [
      {
        paragraphs: [
          "A good telephone welcome is the first step to a satisfied client. At Alfa, callers are received well and each call leaves a positive impression, whatever your work.",
          "Calls are sent to a line reserved for your business. The welcome is personal, precise and immediate, like your own reception.",
          "After the call, we note messages and appointments according to your instructions. No missed call, an immediate answer, a friendly voice: your image stays sharp. The service gives you peace of mind.",
        ],
      },
      {
        paragraphs: [
          "Going away? Transfer your line to our desk and we answer in the way you want. A practical, modest-cost way to look after your clients.",
          "Even when you are away, the work continues. Calls are handled so you can leave with a clear mind. When you come back, there is no voicemail full of messages.",
        ],
      },
      {
        paragraphs: [
          "Want a wider reach? The answering service also forwards a line. A phone line we set up and route to one of our numbers lets you be present in several areas.",
          "Want to know more about telephone answering? See the offers or contact us.",
        ],
      },
    ],
    faq: {
      title: "FAQ",
      subtitle: "Call welcome, messages and line forwarding.",
      items: [
        {
          id: "prix-permanence",
          question: "How much does telephone answering cost?",
          answer: "From €80 excl. tax per month. The message is personalised, with call transfer and line forwarding.",
        },
        {
          id: "accueil-permanence",
          question: "How are my callers welcomed?",
          answer: "Your calls arrive on a line reserved for your business. The welcome is personal, like your own reception.",
        },
        {
          id: "messages-permanence",
          question: "How do I receive the messages?",
          answer: "We note messages and appointments according to your instructions, then email them to you.",
        },
        {
          id: "absence-permanence",
          question: "Can I transfer my line while I am away?",
          answer: "Yes. Your line can be transferred to the Alfa desk. Line forwarding also lets people reach you across several areas.",
        },
      ],
    },
  },
  "location-de-bureaux": {
    title: "Office rental",
    badges: [
      "From €50 excl. tax",
      "From €480 / month",
      "Rent and internet included",
    ],
    faq: {
      title: "FAQ",
      subtitle: "An office for a few hours or by the month, rent included.",
      items: [
        {
          id: "prix-bureau-ponctuel",
          question: "Can I rent an office for a few hours?", // À RELIRE
          answer: "Yes. Occasional rental starts at €50 excl. tax: a furnished office, rent, high-speed internet, coffee and tea included.",
        },
        {
          id: "prix-bureau-mois",
          question: "What does a monthly office cost?",
          answer: "Monthly rental starts at €480 excl. tax per month, with secure access 24 hours a day, 7 days a week.",
        },
        {
          id: "inclus-bureau",
          question: "Is the rent included?",
          answer: "Yes. Rent and high-speed internet are included. The offices are quiet and adaptable, for a few hours or by the month.",
        },
        {
          id: "sur-mesure-bureau",
          question: "Can I have a plan that fits my work?",
          answer: "Yes. Whatever the budget and the timing, the team proposes a tailored solution.",
        },
      ],
    },
  },
  "salles-de-reunion": {
    title: "Meeting rooms",
    badges: [
      "From €50 excl. tax",
      "Furnished space",
      "Welcome and a waiting room",
    ],
    faq: {
      title: "FAQ",
      subtitle: "A furnished room for a meeting or an appointment.",
      items: [
        {
          id: "prix-salle",
          question: "How much does a meeting room cost?",
          answer: "Occasional rental starts at €50 excl. tax. The room is furnished and ready when you arrive.",
        },
        {
          id: "accueil-salle",
          question: "Can I receive clients on site?",
          answer: "Yes. Client welcome and a waiting room are part of the offer, with coffee, tea and printing.",
        },
        {
          id: "prete-salle",
          question: "Is the room ready when I arrive?",
          answer: "Yes. It is a furnished space, ready to use on arrival, for a meeting or an appointment.",
        },
        {
          id: "sur-mesure-salle",
          question: "Can the rental be shaped to a specific need?",
          answer: "Yes. Whatever the budget and the timing, the team proposes a tailored solution.",
        },
      ],
    },
  },
};
