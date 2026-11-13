"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { SectionShapes } from "@/components/shared/section-shapes";
import { useDictionary } from "@/components/content-provider";
import { SpaceCard } from "./home-space-card";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Nombre de propositions de lieux affichées sur l'accueil. */
const visibleCount = 4;

export function HomeSpaces() {
  const { spaces: spacesContent } = useDictionary();
  const spaces = spacesContent.items.slice(0, visibleCount);
  const sectionRef = useRef<HTMLElement>(null);
  const [shapeHeight, setShapeHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const apply = () => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const next = section.nextElementSibling;
      if (!desktop || !(next instanceof HTMLElement)) {
        setShapeHeight(null);
        return;
      }
      const sectionTop = section.getBoundingClientRect().top;
      const nextRect = next.getBoundingClientRect();
      const height = Math.round(nextRect.top + nextRect.height / 2 - sectionTop);
      setShapeHeight((current) => (current === height ? current : height));
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(section);
    const next = section.nextElementSibling;
    if (next instanceof HTMLElement) observer.observe(next);
    window.addEventListener("resize", apply);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="Espaces"
      aria-labelledby="home-spaces-title"
      style={
        shapeHeight
          ? ({ "--space-shape-height": `${shapeHeight}px` } as CSSProperties)
          : undefined
      }
      className="relative isolate w-full bg-primary pt-16 pb-16 md:bg-transparent md:before:absolute md:before:top-0 md:before:left-0 md:before:-z-10 md:before:block md:before:h-[var(--space-shape-height,100%)] md:before:w-7/12 md:before:rounded-tr-[100px] md:before:bg-primary md:before:content-['']"
    >
      <SectionShapes variant="spaces" />
      <div className="relative z-10 mx-auto w-full max-w-[calc(72rem+200px)] px-4">
      <div className="flex flex-col items-start gap-4 md:grid md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <span className="mb-3 block h-1 w-12 rounded-full bg-white" aria-hidden="true" />
          <h2
            id="home-spaces-title"
            className="text-section font-semibold tracking-tight text-white"
          >
            {spacesContent.title}
          </h2>
        </div>
        <a
          href={spacesContent.ctaHref}
          data-component="button-primary"
          className={`group inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-secondary/20 transition-colors hover:bg-white hover:text-secondary md:col-span-5 md:justify-self-end max-lg:min-h-11 ${focusRing}`}
        >
          <span>{spacesContent.cta}</span>
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
          >
            →
          </span>
        </a>
      </div>

      <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
        {spaces.map((item) => (
          <li key={item.id} className="w-2/3 shrink-0 snap-start md:w-auto">
            <SpaceCard space={item} />
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
