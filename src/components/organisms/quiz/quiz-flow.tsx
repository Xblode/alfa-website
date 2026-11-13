"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useDictionary } from "@/components/content-provider";
import { QuizQuestionStep } from "@/components/organisms/quiz/quiz-question";
import { QuizResultScreen } from "@/components/organisms/quiz/quiz-result";
import { recommend } from "@/lib/quiz-recommend";
import { buildQuizSummary } from "@/lib/quiz-summary";

/** Titre masqué (H1), questions une par une, puis résultat. L'état (réponses, profil) reste dans ce composant. */
export function QuizFlow() {
  const { quiz, spaces } = useDictionary();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const titleRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const total = quiz.questions.length;
  const done = step >= total;

  // Le profil (persona) est calculé ici pour un futur envoi ; il n'est pas affiché.
  const recommendation = useMemo(
    () => (done ? recommend(answers, quiz, spaces.items) : null),
    [done, answers, quiz, spaces.items],
  );
  const summary = useMemo(() => {
    if (!recommendation) return "";
    const { result } = recommendation;
    const officeTitles =
      result.kind === "offices"
        ? result.officeIds.flatMap((id) =>
            spaces.items.filter((space) => space.id === id).map((space) => space.cardTitle),
          )
        : [];
    return buildQuizSummary(answers, quiz, recommendation, officeTitles);
  }, [recommendation, answers, quiz, spaces.items]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    titleRef.current?.focus();
  }, [step]);

  const question = quiz.questions[step];
  const progressText = quiz.ui.progress
    .replace("{current}", String(step + 1))
    .replace("{total}", String(total));

  return (
    <>
      <h1 className="sr-only">{quiz.intro.title}</h1>
      <section data-section="Questionnaire" className="text-secondary">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 md:py-24">
          {recommendation ? (
            <QuizResultScreen
              key="result"
              ref={titleRef}
              result={recommendation.result}
              summary={summary}
              onRestart={() => {
                setAnswers({});
                setStep(0);
              }}
            />
          ) : (
            <QuizQuestionStep
              key={question.id}
              ref={titleRef}
              question={question}
              selectedId={answers[question.id]}
              progressText={progressText}
              progressLabel={quiz.ui.progressLabel}
              current={step + 1}
              total={total}
              backLabel={step > 0 ? quiz.ui.back : null}
              onBack={() => setStep((current) => Math.max(0, current - 1))}
              onAnswer={(answerId) => {
                setAnswers((current) => ({ ...current, [question.id]: answerId }));
                setStep((current) => current + 1);
              }}
            />
          )}
        </div>
      </section>
    </>
  );
}
