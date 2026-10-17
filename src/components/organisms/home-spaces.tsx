"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { SectionShapes } from "@/components/shared/section-shapes";
import { useHomeContent, useLocale, useTranslate } from "@/components/content-provider";
import { SpaceCard } from "./home-space-card";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function subscribeDesktop(onChange: () => void) {
  const mql = window.matchMedia("(min-width: 768px)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getDesktopPerView() {
  return window.matchMedia("(min-width: 768px)").matches ? 4 : 1;
}

function getServerPerView() {
  return 4;
}

export function HomeSpaces() {
  const locale = useLocale();
  const t = useTranslate();
  const homeContent = useHomeContent();
  const spaces = homeContent.spaces.items;
  const cities = [...new Set(spaces.map((item) => item.city))];
  const filterValues: Array<string | null> = [null, ...cities];
  const [city, setCity] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const perView = useSyncExternalStore(
    subscribeDesktop,
    getDesktopPerView,
    getServerPerView,
  );
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const filterRef = useRef<HTMLDivElement>(null);
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

  useLayoutEffect(() => {
    const el = filterRef.current;
    if (!el) return;

    const update = () => {
      const hasMore = el.scrollWidth - el.clientWidth - el.scrollLeft > 4;
      if (hasMore) el.dataset.more = "true";
      else delete el.dataset.more;
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [cities.length]);

  const visible =
    city == null ? spaces : spaces.filter((item) => item.city === city);
  const maxIndex = Math.max(0, visible.length - perView);
  const activeIndex = Math.min(index, maxIndex);

  function selectCity(nextCity: string | null) {
    setCity(nextCity);
    setIndex(0);
  }

  function onFilterKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = filterValues.indexOf(city);
    const last = filterValues.length - 1;
    const nextMap: Record<string, number> = {
      ArrowRight: current >= last ? 0 : current + 1,
      ArrowDown: current >= last ? 0 : current + 1,
      ArrowLeft: current <= 0 ? last : current - 1,
      ArrowUp: current <= 0 ? last : current - 1,
      Home: 0,
      End: last,
    };
    const next = nextMap[event.key];
    if (next == null) return;

    event.preventDefault();
    selectCity(filterValues[next] ?? null);
    optionRefs.current[next]?.focus();
  }

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
      className="relative isolate mt-16 w-full bg-primary pt-16 md:bg-transparent md:before:absolute md:before:top-0 md:before:left-0 md:before:-z-10 md:before:block md:before:h-[var(--space-shape-height,100%)] md:before:w-7/12 md:before:rounded-tr-[100px] md:before:bg-primary md:before:content-['']"
    >
      <SectionShapes variant="spaces" />
      <div className="relative z-10 mx-auto w-full max-w-[calc(72rem+200px)] px-4">
      <div className="flex flex-col items-start gap-4 md:grid md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <span className="mb-3 block h-1 w-12 rounded-full bg-white" aria-hidden="true" />
          <h2
            id="home-spaces-title"
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            {homeContent.spaces.title}
          </h2>
          <p className="mt-2 text-sm text-white/85">
            {locale === "en"
              ? `${spaces.length} spaces for rent: offices and meeting rooms.`
              : `${spaces.length} espaces à louer : bureaux et salles de réunion.`}
          </p>
        </div>
        <a
          href={homeContent.spaces.ctaHref}
          data-component="button-primary"
          className={`group inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-secondary/20 transition-colors hover:bg-white hover:text-secondary md:col-span-5 md:justify-self-end max-lg:min-h-11 ${focusRing}`}
        >
          <span>{homeContent.spaces.cta}</span>
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
          >
            →
          </span>
        </a>
      </div>

      <div
        ref={filterRef}
        role="radiogroup"
        aria-label="Filtrer par ville"
        className="mt-6 flex flex-nowrap gap-2 overflow-x-auto pt-1 pb-1 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-lg:data-[more=true]:[mask-image:linear-gradient(to_right,#000_calc(100%-2.75rem),transparent)]"
        onKeyDown={onFilterKeyDown}
      >
        {filterValues.map((value, idx) => {
          const selected = city === value;
          return (
            <button
              key={value ?? "toutes"}
              ref={(node) => {
                optionRefs.current[idx] = node;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectCity(value)}
              className={`shrink-0 rounded-full border-2 px-3.5 py-1.5 font-bold whitespace-nowrap shadow-sm transition-colors motion-reduce:transition-none max-lg:inline-flex max-lg:min-h-11 max-lg:items-center max-lg:justify-center ${focusRing} ${
                selected
                  ? "border-transparent bg-secondary text-white"
                  : "border-[#00a796] bg-white text-secondary"
              }`}
            >
              {value ?? t("Toutes")}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-8 text-sm text-white">
          {city == null
            ? t("Aucun espace pour le moment.")
            : t("Aucun espace dans cette ville.")}
        </p>
      ) : (
        <div className="mt-1">
          <div className="-mx-2 overflow-hidden pt-2 pb-4">
            <ul
              data-motion="space-track"
              style={{ "--space-index": activeIndex } as CSSProperties}
              className="flex [--space-step:100%] [transform:translate3d(calc(var(--space-index)*var(--space-step)*-1),0,0)] transition-transform duration-200 ease-out motion-reduce:transition-none md:[--space-step:25%]"
            >
              {visible.map((item) => (
                <li
                  key={item.id}
                  className={`w-full shrink-0 px-2 md:w-1/4${visible.length === 1 ? " max-lg:!w-full" : ""}`}
                >
                  <SpaceCard space={item} />
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`mt-5 flex items-center justify-between gap-4${visible.length === 1 ? " max-lg:hidden" : ""}`}
          >
          <div className="flex min-w-0 flex-1 items-center gap-3 text-sm font-medium text-white sm:max-w-xs">
            <span className="shrink-0 tabular-nums" aria-live="polite">
              {activeIndex + 1}–{Math.min(visible.length, activeIndex + perView)} / {visible.length}
            </span>
            <span aria-hidden="true" className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
              <span
                className="block h-full rounded-full bg-white transition-[width] duration-200 motion-reduce:transition-none"
                style={{
                  width: `${(Math.min(visible.length, activeIndex + perView) / visible.length) * 100}%`,
                }}
              />
            </span>
          </div>
          <div
            role="group"
            aria-label="Navigation du carrousel des espaces"
            className="flex shrink-0 gap-2"
          >
            <button
              type="button"
              aria-label="Espace précédent"
              disabled={activeIndex <= 0}
              onClick={() => setIndex(Math.max(0, activeIndex - 1))}
              className={`inline-flex size-11 items-center justify-center rounded-full border border-secondary bg-secondary text-white shadow-md transition-colors hover:bg-white hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-secondary disabled:hover:text-white ${focusRing}`}
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                <path
                  d="M12.5 4.5L7 10l5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Espace suivant"
              disabled={activeIndex >= maxIndex}
              onClick={() => setIndex(Math.min(maxIndex, activeIndex + 1))}
              className={`inline-flex size-11 items-center justify-center rounded-full border border-secondary bg-secondary text-white shadow-md transition-colors hover:bg-white hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-secondary disabled:hover:text-white ${focusRing}`}
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                <path
                  d="M7.5 4.5L13 10l-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
