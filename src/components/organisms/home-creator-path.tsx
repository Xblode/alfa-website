"use client";

import { useDictionary } from "@/components/content-provider";
import { CreatorPathTimeline } from "@/components/organisms/home-creator-path-timeline";
import { StepLinks } from "@/components/organisms/home-creator-path-links";
import { CreatorPathCta } from "@/components/organisms/home-creator-path-cta";
import { CreatorPathIllustration } from "@/components/organisms/creator-path-illustration";
import { CreatorPathFindLink } from "@/components/organisms/home-creator-path-find-link";

// frise gardée, désactivée le 2026-11-13 (passer à true pour la réafficher)
const showTimeline = false;

export function HomeCreatorPath() {
  const { creatorPath } = useDictionary();

  return (
    <section
      data-section="Parcours du créateur"
      aria-labelledby="home-creator-path-title"
      className="bg-surface py-12 text-secondary sm:py-16"
    >
      <div className="mx-auto w-full max-w-[calc(72rem+200px)] px-4">
        <div className="mx-auto max-w-3xl text-center">
          <CreatorPathIllustration />
          <span
            className="mx-auto mb-3 block h-1 w-12 rounded-full bg-primary"
            aria-hidden="true"
          />
          <h2
            id="home-creator-path-title"
            className="font-heading text-section font-semibold tracking-tight"
          >
            {creatorPath.title}
          </h2>
          <p className="mt-3 text-base text-secondary/70 lg:text-lg">
            {creatorPath.intro}
          </p>
        </div>

        <div className="mt-8 text-center">
          <CreatorPathFindLink />
        </div>

        {showTimeline ? (
          <>
        <CreatorPathTimeline />

        <ol className="mt-8 grid gap-4 lg:hidden">
          {creatorPath.steps.map((step, index) => (
            <li key={step.id} className="rounded-2xl bg-hero p-5">
              <p className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-secondary"
                >
                  {index + 1}
                </span>
                <span className="sr-only">
                  {creatorPath.stepLabel} {index + 1}.
                </span>
                <span className="font-heading text-xl leading-snug font-semibold">
                  {step.title}
                </span>
              </p>
              <p className="mt-3 text-base leading-relaxed text-secondary/80">
                {step.text}
              </p>
              <StepLinks links={step.links} />
            </li>
          ))}
        </ol>

        <div className="mt-6 lg:hidden">
          <CreatorPathCta />
        </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
