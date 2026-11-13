"use client";

import { useId } from "react";
import type { Quiz } from "@/content/quiz/types";

/** Bloc « laisser mon e-mail » : l'envoi n'existe pas encore, donc champ et bouton sont désactivés. */
export function QuizEmailBlock({ quiz }: { quiz: Quiz }) {
  const inputId = useId();
  const noteId = useId();
  return (
    <div data-name="E-mail" className="rounded-2xl border border-secondary/15 bg-surface p-5">
      <h3 className="font-heading text-lg font-semibold">{quiz.results.ctaEmail}</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <label htmlFor={inputId} className="grid gap-1 text-sm font-medium">
          <span>{quiz.ui.emailLabel}</span>
          <input
            id={inputId}
            type="email"
            disabled
            aria-describedby={noteId}
            placeholder={quiz.ui.emailPlaceholder}
            className="min-h-11 w-full rounded-lg border border-secondary/20 bg-secondary/5 px-3 py-2 text-base"
          />
        </label>
        <button
          type="button"
          disabled
          aria-describedby={noteId}
          className="min-h-11 rounded-xl bg-secondary/10 px-5 py-2.5 text-base font-semibold text-secondary/60"
        >
          {quiz.ui.emailSubmit}
        </button>
      </div>
      <p id={noteId} className="mt-3 text-sm font-medium text-secondary/80">
        {quiz.ui.emailSoon}
      </p>
    </div>
  );
}
