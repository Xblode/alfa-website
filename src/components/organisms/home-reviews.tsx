"use client";

import { useHomeContent, useTranslate } from "@/components/content-provider";

export function HomeReviews() {
  const t = useTranslate();
  const { reviews } = useHomeContent();
  const shown = reviews.items.slice(0, 3);

  return (
    <section
      data-section="Avis"
      aria-labelledby="home-reviews-title"
      className="bg-surface pt-16 text-secondary sm:pt-20"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <span className="mb-3 block h-1 w-12 rounded-full bg-primary" aria-hidden="true" />
            <h2
              id="home-reviews-title"
              className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              {reviews.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-secondary/85">{reviews.intro}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={t("Notes des avis")}>
              {reviews.scores.map((score) => (
                <li key={score.id}>
                  <p className="inline-flex min-h-11 items-center gap-2 rounded-full border border-secondary/15 bg-surface px-3 text-sm font-semibold">
                    <Stars />
                    <span>{score.label}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul
          data-component="grid"
          aria-label={t("Avis clients")}
          className="grid gap-5 md:grid-cols-3 max-lg:gap-3"
        >
          {shown.map((review) => (
            <li key={review.id} data-review-card className="min-w-0">
              <article
                data-component="card"
                data-name={review.author}
                className="flex h-full flex-col rounded-2xl border border-secondary/10 bg-surface p-5 shadow-sm max-lg:p-3"
              >
                <div className="flex items-center gap-3 max-lg:gap-2">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-secondary max-lg:size-8"
                  >
                    {initials(review.author)}
                  </span>
                  <div>
                    <p className="font-heading text-base font-semibold">{review.author}</p>
                    <time dateTime={review.date} className="text-xs text-secondary/60">
                      {review.dateLabel}
                    </time>
                  </div>
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold leading-snug max-lg:mt-2 max-lg:text-base">{review.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary/80 max-lg:mt-1 max-lg:leading-snug">{review.text}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function initials(name: string) {
  const parts = name.replaceAll(".", "").split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return `${first}${last}`.toUpperCase();
}

function Stars() {
  return (
    <span aria-hidden="true" className="inline-flex text-primary">
      {[0, 1, 2, 3].map((index) => (
        <Star key={index} />
      ))}
      <Star half />
    </span>
  );
}

function Star({ half = false }: { half?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="size-4">
      <path
        d="m10 2.6 2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 13.4 5.8 15.6l.8-4.7L3.2 7.6l4.7-.7L10 2.6Z"
        fill={half ? "none" : "currentColor"}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {half ? (
        <path
          d="M10 2.6 7.9 6.9 3.2 7.6l3.4 3.3-.8 4.7L10 13.4V2.6Z"
          fill="currentColor"
        />
      ) : null}
    </svg>
  );
}
