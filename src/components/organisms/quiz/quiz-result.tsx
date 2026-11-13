"use client";

import { forwardRef } from "react";
import { useDictionary, useLang } from "@/components/content-provider";
import { SpaceCard } from "@/components/organisms/home-space-card";
import { OpenContactButton } from "@/components/organisms/open-contact-button";
import { QuizEmailBlock } from "@/components/organisms/quiz/quiz-email-block";
import { ServiceTileLink } from "@/components/organisms/service-tile-link";
import type { QuizResult } from "@/content/quiz/types";
import { localizePath } from "@/lib/locale";

type QuizResultProps = {
  result: QuizResult;
  /** Message pré-rempli du popup de contact. */
  summary: string;
  onRestart: () => void;
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

export const QuizResultScreen = forwardRef<HTMLHeadingElement, QuizResultProps>(
  function QuizResultScreen({ result, summary, onRestart }, titleRef) {
    const { quiz, services, spaces } = useDictionary();
    const lang = useLang();
    const text = result.kind === "service" ? quiz.results.services[result.serviceId] : quiz.results.offices;
    const service =
      result.kind === "service" ? services.items.find((item) => item.id === result.serviceId) : undefined;
    const offices =
      result.kind === "offices"
        ? result.officeIds.flatMap((id) => spaces.items.filter((space) => space.id === id))
        : [];

    return (
      <div className="transition-opacity duration-200 motion-reduce:transition-none starting:opacity-0">
        <p className="text-sm font-semibold text-secondary/80">{quiz.ui.resultLabel}</p>
        <h2
          ref={titleRef}
          tabIndex={-1}
          className="mt-2 font-heading text-section leading-tight font-semibold text-balance outline-none"
        >
          {text.title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-secondary/80 lg:text-lg">{text.text}</p>

        {service ? (
          <div data-component="card" className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-hero p-6">
            <div className="min-w-0">
              <h3 className="font-heading text-xl font-semibold">{service.title}</h3>
              <p className="mt-1 max-w-xl text-sm text-secondary/80">{service.summary}</p>
            </div>
            <ServiceTileLink
              href={localizePath(service.href, lang)}
              label={quiz.ui.serviceCta}
              ariaLabel={quiz.ui.serviceCtaLabel.replace("{title}", service.title)}
              variant="solid"
            />
          </div>
        ) : null}

        {offices.length > 0 ? (
          <ul aria-label={quiz.ui.officesLabel} className="mt-6 grid gap-4 sm:grid-cols-2">
            {offices.map((space) => (
              <li key={space.id}>
                <SpaceCard space={space} />
              </li>
            ))}
          </ul>
        ) : null}

        <h3 className="mt-10 font-heading text-xl font-semibold">{quiz.ui.actionsTitle}</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="flex items-start">
            <OpenContactButton
              message={summary}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-base font-semibold text-secondary transition-colors hover:bg-primary-100 motion-reduce:transition-none"
            >
              {quiz.results.ctaAdvisor}
            </OpenContactButton>
          </div>
          <QuizEmailBlock quiz={quiz} />
        </div>
        <button
          type="button"
          onClick={onRestart}
          className={`mt-6 inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold underline underline-offset-4 hover:bg-secondary/5 ${focusRing}`}
        >
          {quiz.ui.restart}
        </button>
      </div>
    );
  },
);
