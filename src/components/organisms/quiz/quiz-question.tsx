"use client";

import { forwardRef, useId } from "react";
import type { QuizQuestion } from "@/content/quiz/types";

type QuizQuestionProps = {
  question: QuizQuestion;
  selectedId: string | undefined;
  progressText: string;
  progressLabel: string;
  current: number;
  total: number;
  backLabel: string | null;
  onBack: () => void;
  onAnswer: (answerId: string) => void;
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

/** Une question : barre de progression, titre (reçoit le focus), réponses en grandes cartes. */
export const QuizQuestionStep = forwardRef<HTMLHeadingElement, QuizQuestionProps>(
  function QuizQuestionStep(
    { question, selectedId, progressText, progressLabel, current, total, backLabel, onBack, onAnswer },
    titleRef,
  ) {
    const titleId = useId();
    return (
      <div className="transition-opacity duration-200 motion-reduce:transition-none starting:opacity-0">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-secondary/80">{progressText}</p>
          {backLabel ? (
            <button
              type="button"
              onClick={onBack}
              className={`inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold underline underline-offset-4 hover:bg-secondary/5 ${focusRing}`}
            >
              {backLabel}
            </button>
          ) : null}
        </div>
        <div
          role="progressbar"
          aria-label={progressLabel}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={current}
          aria-valuetext={progressText}
          className="mt-2 h-2 overflow-hidden rounded-full bg-secondary/10"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </div>
        <h2
          id={titleId}
          ref={titleRef}
          tabIndex={-1}
          className="mt-8 font-heading text-section leading-tight font-semibold text-balance outline-none"
        >
          {question.title}
        </h2>
        <div role="group" aria-labelledby={titleId} className="mt-6 grid gap-3 sm:grid-cols-2">
          {question.answers.map((answer) => {
            const selected = answer.id === selectedId;
            return (
              <button
                key={answer.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onAnswer(answer.id)}
                className={`min-h-16 rounded-2xl border-2 px-5 py-4 text-left text-base font-medium transition-colors motion-reduce:transition-none ${focusRing} ${
                  selected
                    ? "border-primary bg-primary/10"
                    : "border-secondary/15 bg-surface hover:border-primary"
                }`}
              >
                {answer.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);
