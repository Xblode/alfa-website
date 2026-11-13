import type { Quiz, QuizAnswers, QuizRecommendation } from "../content/quiz/types";

/**
 * Message pré-rempli du popup de contact : résume les réponses, le profil estimé et la recommandation.
 * Fonction pure. `officeTitles` : titres des bureaux recommandés (si le résultat est « bureaux »).
 */
export function buildQuizSummary(
  answers: QuizAnswers,
  quiz: Quiz,
  recommendation: QuizRecommendation,
  officeTitles: readonly string[],
): string {
  const sep = quiz.ui.summary.separator;
  const parts: string[] = [];
  for (const question of quiz.questions) {
    const answer = question.answers.find((item) => item.id === answers[question.id]);
    if (answer) parts.push(`${question.summaryLabel}${sep}${answer.label}`);
  }

  const persona = quiz.personas.find((item) => item.id === recommendation.persona);
  if (persona) parts.push(`${quiz.ui.summary.persona}${sep}${persona.label}`);

  const { result } = recommendation;
  const recommended =
    result.kind === "service"
      ? quiz.results.services[result.serviceId].title
      : `${quiz.results.offices.title} (${officeTitles.join(", ")})`;
  parts.push(`${quiz.ui.summary.recommendation}${sep}${recommended}`);

  return `${quiz.ui.summary.intro}. ${parts.join(" ; ")}.`;
}
