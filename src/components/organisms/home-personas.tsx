"use client";

import Image from "next/image";
import { useRef } from "react";
import { useHomeContent } from "@/components/content-provider";

export function HomePersonas() {
  const { personas } = useHomeContent();
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollByCard(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-persona-card]");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = (card?.offsetWidth ?? track.clientWidth) + gap;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    track.scrollBy({
      left: direction * distance,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <section
      data-section="Profils"
      aria-labelledby="home-personas-title"
      className="bg-primary-100/25 pt-16 text-secondary sm:pt-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <span className="mb-3 block h-1 w-12 rounded-full bg-primary" aria-hidden="true" />
            <h2
              id="home-personas-title"
              className="text-3xl font-semibold tracking-tight text-secondary sm:text-4xl"
            >
              {personas.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-secondary/85">{personas.intro}</p>
          </div>

          <div className="flex gap-2 md:hidden">
            <ScrollButton label="Profil précédent" direction={-1} onScroll={scrollByCard} />
            <ScrollButton label="Profil suivant" direction={1} onScroll={scrollByCard} />
          </div>
        </div>

        <ul
          id="home-personas-track"
          ref={trackRef}
          data-component="grid"
          aria-label="Profils clients Alfa"
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] md:grid md:grid-cols-3 md:snap-none md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {personas.items.map((persona) => (
            <li
              key={persona.id}
              data-persona-card
              className="w-[min(85vw,22rem)] shrink-0 snap-start md:w-auto"
            >
              <article
                data-component="card"
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-secondary/10 bg-surface shadow-sm"
              >
                <div
                  data-component="image"
                  className="relative aspect-[16/10] w-full bg-secondary"
                >
                  <Image
                    src={persona.image}
                    alt={persona.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 85vw"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-surface/95 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase shadow-sm">
                    {persona.role}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold leading-snug text-secondary">
                    {persona.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary/85">
                    {persona.need}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5 border-t border-secondary/10 pt-4 text-sm leading-snug">
                    {persona.advantages.map((advantage) => (
                      <li key={advantage} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                        />
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ScrollButton({
  label,
  direction,
  onScroll,
}: {
  label: string;
  direction: -1 | 1;
  onScroll: (direction: -1 | 1) => void;
}) {
  return (
    <button
      type="button"
      data-component="button"
      aria-controls="home-personas-track"
      aria-label={label}
      onClick={() => onScroll(direction)}
      className="inline-flex size-11 items-center justify-center rounded-full border border-secondary/20 bg-surface text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
