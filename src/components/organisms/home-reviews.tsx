"use client";

import { useRef, useState } from "react";
import { useHomeContent, useTranslate } from "@/components/content-provider";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function HomeReviews() {
  const t = useTranslate();
  const { reviews } = useHomeContent();
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const last = reviews.items.length - 1;

  function goTo(index: number) {
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>("[data-review-card]")[index];
    if (!track || !card) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: card.offsetLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActive(index);
  }

  function onTrackScroll() {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-review-card]");
    if (!track || !card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = card.offsetWidth + gap;
    if (step <= 0) return;
    setActive(Math.min(last, Math.max(0, Math.round(track.scrollLeft / step))));
  }

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
          id="home-reviews-track"
          ref={trackRef}
          data-component="carousel"
          aria-label={t("Avis clients")}
          onScroll={onTrackScroll}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.items.map((review) => (
            <li
              key={review.id}
              data-review-card
              className="w-[min(85vw,22rem)] shrink-0 snap-start"
            >
              <article
                data-component="card"
                data-name={review.author}
                className="flex h-full flex-col rounded-2xl border border-secondary/10 bg-surface p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-secondary"
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
                <h3 className="mt-4 font-heading text-lg font-semibold leading-snug">{review.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary/80">{review.text}</p>
              </article>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center gap-4">
          <ScrollButton
            label={t("Avis précédent")}
            direction={-1}
            disabled={active <= 0}
            onClick={() => goTo(active - 1)}
          />
          <div role="tablist" aria-label={t("Choisir un avis")} className="flex items-center gap-2">
            {reviews.items.map((review, index) => {
              const selected = index === active;
              return (
                <button
                  key={review.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-label={`${index + 1} / ${reviews.items.length} · ${review.author}`}
                  onClick={() => goTo(index)}
                  className={`size-2 rounded-full ${focusRing} ${
                    selected ? "bg-primary" : "bg-secondary/25 hover:bg-secondary/45"
                  }`}
                />
              );
            })}
          </div>
          <ScrollButton
            label={t("Avis suivant")}
            direction={1}
            disabled={active >= last}
            onClick={() => goTo(active + 1)}
          />
        </div>
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

function ScrollButton({
  label,
  direction,
  disabled,
  onClick,
}: {
  label: string;
  direction: -1 | 1;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-component="button"
      aria-controls="home-reviews-track"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex size-10 items-center justify-center rounded-full border border-primary bg-white/80 text-primary backdrop-blur-xl disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
        <path
          d={direction < 0 ? "M14.5 6 9 12l5.5 6" : "M9.5 6 15 12l-5.5 6"}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
