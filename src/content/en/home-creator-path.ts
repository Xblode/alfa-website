import type { Dictionary } from "../fr";

export const creatorPath: Dictionary["creatorPath"] = {
  title: "The company founder's journey",
  intro: "From choosing your head-office address to receiving your first mail, here are the seven steps of setting up a company. Alfa steps in twice: choosing the address and starting your activity.",
  stepLabel: "Step",
  cta: "Book a meeting",
  findCta: "Find your option!",
  steps: [
    {
      id: "adresse",
      title: "Choose the head-office address",
      text: "The head-office address appears in the articles of association and on company documents. By registering with Alfa, you sign a domiciliation contract and obtain a domiciliation certificate.",
      links: [
        {
          label: "Business address",
          href: "/domiciliation-commerciale",
        },
      ],
    },
    {
      id: "statuts",
      title: "Draft the articles of association",
      text: "The articles set the rules for running the company, and the head-office address is stated in them. You write them yourself or have a legal professional of your choice do it.",
      links: [],
    },
    {
      id: "capital",
      title: "Deposit the share capital",
      text: "The share capital is deposited in an account opened in the name of the company being formed, at a bank or a notary. You receive a certificate of deposit.",
      links: [],
    },
    {
      id: "annonce",
      title: "Publish the legal notice",
      text: "The company's creation is announced in a newspaper authorised to publish legal notices. You get a publication certificate to attach to your file.",
      links: [],
    },
    {
      id: "guichet",
      title: "File your application on the INPI one-stop shop",
      text: "The incorporation file is submitted online on the business formalities one-stop shop run by INPI. You attach the articles, the domiciliation certificate and the other required documents.",
      links: [],
    },
    {
      id: "immatriculation",
      title: "Get the Kbis extract or RNE registration",
      text: "Once the file is approved, the company is registered. It receives a Kbis extract or an entry in the national business register (RNE), depending on its form and activity.",
      links: [],
    },
    {
      id: "demarrage",
      title: "Start trading",
      text: "Alfa receives and sorts your mail and registered letters, and can answer your phone calls. Need an office or a room to host clients? We have them in Rouen.",
      links: [
        {
          label: "Telephone answering",
          href: "/permanence-telephonique",
        },
        {
          label: "Office rental",
          href: "/location-de-bureaux",
        },
        {
          label: "Meeting rooms",
          href: "/salles-de-reunion",
        },
      ],
    },
  ],
};
