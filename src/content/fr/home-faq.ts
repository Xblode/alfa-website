export const faq = {
  demo: true,
  title: "FAQ",
  subtitle: "Adresse, horaires et services du centre d'affaires à Rouen.",
  items: [
    {
      id: "ou-se-trouve-alfa",
      question: "Où se trouve le centre d'affaires ?",
      answer:
        "Le siège est au 177 boulevard de l'Yser, 76000 Rouen, proche de la gare.",
    },
    {
      id: "horaires",
      question: "Quels sont les horaires d'accueil ?",
      answer: "Du lundi au vendredi, de 8h30 à 12h30 et de 14h à 17h.",
    },
    {
      id: "services",
      question: "Quels services propose Alfa ?",
      answer:
        "Domiciliation commerciale, permanence téléphonique, location de bureaux et salles de réunion.",
    },
    {
      id: "louer-un-bureau",
      question: "Peut-on louer un bureau pour quelques heures ?",
      answer:
        "Oui. La location ponctuelle part de 50€ HT : bureau équipé, charges locatives, connexion haut débit, café et thé compris. La location au mois part de 480€/mois HT, avec un accès sécurisé 24h/24 et 7j/7.",
    },
    {
      id: "domiciliation-permanence",
      question: "Comment fonctionnent la domiciliation et la permanence téléphonique ?",
      answer:
        "La domiciliation, à partir de 45€/mois HT, donne une adresse au cœur de Rouen, avec réception et tri des courriers et recommandés. La permanence téléphonique, à partir de 80€/mois HT, décroche pour vous, prend vos messages et vous les retransmet par e-mail.",
    },
  ],
} as const;
