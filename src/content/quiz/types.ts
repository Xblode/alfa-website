/**
 * Types du questionnaire d'orientation (`/trouver-mon-offre`).
 *
 * Tout est de la donnée : questions, réponses, points, règles. Aucun `if` par question dans le code.
 * Ces types décrivent aussi, à terme, les tables du back-office (questions, réponses, règles, profils).
 */

/** Services que le questionnaire peut recommander (mêmes `id` que `home-services.ts`). */
export type QuizServiceId =
  | "domiciliation-commerciale"
  | "permanence-telephonique"
  | "location-de-bureaux"
  | "salles-de-reunion";

/** Profil (persona) attribué au visiteur. Texte libre côté données, pour pouvoir en ajouter. */
export type QuizPersonaId = string;

/** Points qu'une réponse ajoute. Une clé absente = 0 point. */
export type QuizScore = {
  services?: Readonly<Partial<Record<QuizServiceId, number>>>;
  personas?: Readonly<Record<QuizPersonaId, number>>;
};

export type QuizAnswer = {
  id: string;
  label: string;
  points: QuizScore;
};

export type QuizQuestion = {
  id: string;
  title: string;
  /** Libellé court de la question, utilisé dans le message pré-rempli (« Vous êtes : … »). */
  summaryLabel: string;
  answers: readonly QuizAnswer[];
};

export type QuizPersona = {
  id: QuizPersonaId;
  label: string;
};

/** Règles de décision, en données. */
export type QuizRule = {
  /** Ordre des services : sert à départager deux scores égaux (le premier gagne). */
  serviceOrder: readonly QuizServiceId[];
  /** Service renvoyé si aucune réponse ne donne de point à un service. */
  fallbackServiceId: QuizServiceId;
  /** Si ce service gagne, le résultat est une sélection de bureaux au lieu du service. */
  officesServiceId: QuizServiceId;
  /** Nombre de bureaux proposés (2 dans le brouillon ; `recommend` renvoie toujours 2 identifiants). */
  officeCount: 2;
};

/** Textes d'un résultat (un service ou les bureaux). */
export type QuizResultText = { title: string; text: string };

/** Textes du résultat et boutons d'action. */
export type QuizResults = {
  services: Readonly<Record<QuizServiceId, QuizResultText>>;
  offices: QuizResultText;
  ctaAdvisor: string;
  ctaEmail: string;
};

/** Textes d'interface de la page (progression, boutons, bloc e-mail, message pré-rempli). */
export type QuizUi = {
  /** `{current}` et `{total}` sont remplacés par le composant. */
  progress: string;
  progressLabel: string;
  back: string;
  restart: string;
  resultLabel: string;
  serviceCta: string;
  /** `{title}` est remplacé par le titre du service. */
  serviceCtaLabel: string;
  officesLabel: string;
  actionsTitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailSubmit: string;
  emailSoon: string;
  summary: {
    intro: string;
    persona: string;
    recommendation: string;
    /** Séparateur entre un libellé et sa valeur (« : » en français, «: » en anglais). */
    separator: string;
  };
};

export type Quiz = {
  /** Vrai tant que les questions sont un brouillon (à retirer quand Alfa fournit les siennes). */
  draft: boolean;
  intro: { title: string; text: string; start: string };
  questions: readonly QuizQuestion[];
  personas: readonly QuizPersona[];
  rules: QuizRule;
  results: QuizResults;
  ui: QuizUi;
};

/** Résultat de `recommend`. */
export type QuizResult =
  | { kind: "service"; serviceId: QuizServiceId }
  | { kind: "offices"; officeIds: [string, string] };

export type QuizRecommendation = {
  result: QuizResult;
  /** `null` si aucune réponse ne donne de point à un profil. */
  persona: QuizPersonaId | null;
};

/** Réponses du visiteur : identifiant de question → identifiant de réponse. */
export type QuizAnswers = Readonly<Record<string, string>>;
