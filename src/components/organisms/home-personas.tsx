"use client";

import { useRef } from "react";
import { useDictionary, useLang } from "@/components/content-provider";
import { localizePath } from "@/lib/locale";
import { CarouselArrows } from "./carousel-arrows";
import { PersonaCard } from "./persona-card";

export function HomePersonas() {
  const { personas, ui } = useDictionary();
  const lang = useLang();
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollByCard(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-persona-card]");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = (card?.offsetWidth ?? track.clientWidth) + gap;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    track.scrollBy({ left: direction * distance, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <section
      data-section="Profils"
      aria-labelledby="home-personas-title"
      className="relative z-10 overflow-hidden rounded-bl-[100px] bg-secondary py-16 text-white"
    >
      <div className="mx-auto flex w-full max-w-[calc(72rem+200px)] items-end justify-between gap-8 px-4">
        <div className="max-w-[670px]">
          <span className="mb-3 block h-1 w-12 rounded-full bg-primary" aria-hidden="true" />
          <h2
            id="home-personas-title"
            className="font-heading text-section font-light tracking-tight text-white"
          >
            {personas.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-white/70 lg:text-lg">{personas.intro}</p>
        </div>
        <CarouselArrows
          controls="home-personas-track"
          onScroll={scrollByCard}
          className="hidden shrink-0 sm:flex"
        />
      </div>

      <ul
        id="home-personas-track"
        ref={trackRef}
        tabIndex={0}
        aria-label={ui.personas.listLabel}
        className="mt-10 flex snap-x snap-mandatory gap-8 overflow-x-auto overscroll-x-contain scroll-ps-[max(1rem,calc((100%-72rem-200px)/2+1rem))] ps-[max(1rem,calc((100%-72rem-200px)/2+1rem))] pe-[max(1rem,calc((100%-72rem-200px)/2+1rem))] pb-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden"
      >
        {personas.items.map((persona) => (
          <li
            key={persona.id}
            data-persona-card
            className="w-[327px] shrink-0 snap-start sm:w-[470px]"
          >
            <PersonaCard
              role={persona.role}
              title={persona.title}
              need={persona.need}
              image={persona.image}
              imageAlt={persona.imageAlt}
              href={localizePath(persona.href, lang)}
              cta={ui.common.learnMore}
            />
          </li>
        ))}
      </ul>

      <CarouselArrows
        controls="home-personas-track"
        onScroll={scrollByCard}
        className="mt-6 flex justify-center sm:hidden"
      />
    </section>
  );
}
