import type {
  Quiz,
  QuizAnswers,
  QuizPersonaId,
  QuizRecommendation,
  QuizServiceId,
} from "../content/quiz/types";

/** Ce que `recommend` lit d'un bien (sous-ensemble de `spaces.items`). */
export type QuizSpace = {
  id: string;
  kind: string;
  availability: { kind: string };
};

/** Clé au plus fort score ; à égalité, la première de `order` gagne. `null` si tout est à 0. */
function best<K extends string>(scores: Map<K, number>, order: readonly K[]): K | null {
  let winner: K | null = null;
  let top = 0;
  for (const key of order) {
    const score = scores.get(key) ?? 0;
    if (score > top) {
      winner = key;
      top = score;
    }
  }
  return winner;
}

/**
 * Recommande un service (ou des bureaux) et un profil à partir des réponses.
 * Fonction pure : toutes les règles viennent de `quiz.rules` et des points des réponses.
 *
 * Bureaux : si le service « bureaux » gagne, on propose les 2 premiers biens de type bureau
 * et disponibles, dans l'ordre de la liste. PROVISOIRE : les biens n'ont ni prix ni type d'activité,
 * il n'y a donc pas de vrai critère de compatibilité. S'il y a moins de 2 bureaux disponibles,
 * on renvoie le service « location de bureaux » à la place.
 */
export function recommend(
  answers: QuizAnswers,
  quiz: Quiz,
  spaces: readonly QuizSpace[],
): QuizRecommendation {
  const serviceScores = new Map<QuizServiceId, number>();
  const personaScores = new Map<QuizPersonaId, number>();

  for (const question of quiz.questions) {
    const answer = question.answers.find((item) => item.id === answers[question.id]);
    if (!answer) continue;
    for (const [id, points] of Object.entries(answer.points.services ?? {})) {
      const key = id as QuizServiceId;
      serviceScores.set(key, (serviceScores.get(key) ?? 0) + (points ?? 0));
    }
    for (const [id, points] of Object.entries(answer.points.personas ?? {})) {
      personaScores.set(id, (personaScores.get(id) ?? 0) + points);
    }
  }

  const { rules } = quiz;
  const serviceId = best(serviceScores, rules.serviceOrder) ?? rules.fallbackServiceId;
  const persona = best(
    personaScores,
    quiz.personas.map((item) => item.id),
  );

  if (serviceId === rules.officesServiceId) {
    const offices = spaces
      .filter((space) => space.kind === "bureau" && space.availability.kind === "available")
      .slice(0, rules.officeCount);
    if (offices.length === rules.officeCount) {
      return { result: { kind: "offices", officeIds: [offices[0].id, offices[1].id] }, persona };
    }
  }
  return { result: { kind: "service", serviceId }, persona };
}
