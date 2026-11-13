import type { Dictionary } from "../fr";

export const personas: Dictionary["personas"] = {
  demo: true,
  title: "A place to meet clients, suited to your work",
  intro:
    "Whatever your line of work: a ready-to-use space, for a single meeting or by the month.",
  items: [
    {
      id: "praticien",
      href: "/location-de-bureaux",
      role: "Practitioner",
      title: "See your patients in a quiet room",
      image: "/accueil/espaces/bureau-fecamp-B.26-1-card.webp",
      imageAlt: "A quiet, bright office for a practitioner",
      need: "Osteopath, psychologist or coach: a private office for a few hours or half a day, with no yearly lease.",
      advantages: [
        "A private office, ready when you arrive",
        "Patient welcome and a waiting room",
        "Occasional or monthly rental, at your pace",
        "An address in the heart of Rouen, near the station",
      ],
    },
    {
      id: "consultant",
      href: "/salles-de-reunion",
      role: "Independent consultant",
      title: "Meet your clients in a professional setting",
      image:
        "/accueil/services/kHTq7r1Hgc7dZ4CA5Tlc8hrSxMBhG8-metac2FsbGVfZGVfcmV1bmlvbi5qcGc=--section.webp",
      imageAlt: "A meeting room set up for client appointments",
      need: "A meeting, a presentation, a signing: a furnished room, without a permanent office.",
      advantages: [
        "A room that is ready to use",
        "High-speed internet and printing included",
        "Coffee and tea for your guests",
        "Rent included",
      ],
    },
    {
      id: "dirigeant",
      href: "/domiciliation-commerciale",
      role: "Director",
      title: "Meet partners and candidates without a fixed office",
      image:
        "/accueil/services/PnL1e1L2xhO5wZ05ZsNh7TpBOzgcrU-metabG9jYXV4LmpwZw==--section.webp",
      imageAlt: "A reception space for a director",
      need: "A few meetings a month are enough: a space in your name, without a standard lease.",
      advantages: [
        "Visitor welcome and a waiting room",
        "Monthly rental: your name on the door",
        "Monthly rental: secure access 24 hours a day, 7 days a week",
        "A business address available at the same location",
      ],
    },
    {
      id: "createur",
      href: "/domiciliation-commerciale",
      role: "Business founder",
      title: "Register your company at a business address from day one",
      image: "/accueil/hero/V.HUON-5809-slider.webp",
      imageAlt: "Reception area of the business centre",
      need: "A professional address in Rouen to register your company, with your mail received and sorted.",
      advantages: [
        "A professional address in Rouen",
        "Mail received and sorted",
      ],
    },
    {
      id: "nomade",
      href: "/permanence-telephonique",
      role: "Tradesperson or sales rep on the move",
      title: "Never miss a call during a meeting",
      image:
        "/accueil/services/OLIfzjc422mDfbLL7tuuhsgSgPDI1Z-metadGVsZXBob25lLnBuZw==--section.webp",
      imageAlt: "Telephone answering service",
      need: "The telephone answering service takes your messages and passes them on by e-mail.",
      advantages: ["Calls handled for you", "Messages sent by e-mail"],
    },
  ],
};
