"use client";

import { useRef } from "react";
import { SectionShapes } from "@/components/shared/section-shapes";
import { useDictionary } from "@/components/content-provider";
import { ArticleCard } from "./article-card";
import { CarouselArrows } from "./carousel-arrows";

export function HomeArticles() {
  const { articles, ui } = useDictionary();
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollByCard(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-article-card]");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = (card?.offsetWidth ?? track.clientWidth) + gap;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    track.scrollBy({ left: direction * distance, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <section
      data-section="Articles"
      aria-labelledby="home-articles-title"
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,#d2fffc_0%,#ebf1f1_360px,#ebf1f1_100%)] py-16 text-secondary sm:py-20"
    >
      <SectionShapes variant="articles" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="mb-2 block h-1 w-10 rounded-full bg-primary" aria-hidden="true" />
            <h2
              id="home-articles-title"
              className="font-heading text-section font-semibold tracking-tight text-secondary"
            >
              {articles.title}
            </h2>
            <p className="mt-1 text-base text-secondary/75 lg:text-lg">{articles.subtitle}</p>
          </div>
          <CarouselArrows
            controls="home-articles-track"
            onScroll={scrollByCard}
            tone="dark"
            previousLabel={ui.articles.previous}
            nextLabel={ui.articles.next}
            className="flex shrink-0"
          />
        </div>

        <ul
          id="home-articles-track"
          ref={trackRef}
          tabIndex={0}
          aria-label={ui.articles.listLabel}
          className="-mb-2 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden"
        >
          {articles.items.map((item) => (
            <li
              key={item.id}
              data-article-card
              className="w-full shrink-0 snap-start"
            >
              <ArticleCard active={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
