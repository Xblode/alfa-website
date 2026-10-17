"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { SectionShapes } from "@/components/shared/section-shapes";
import { useHomeContent, useTranslate } from "@/components/content-provider";
import { homeContent } from "@/lib/home-content";
import { ServiceGlyph } from "./home-services-icons";

type ServiceId = (typeof homeContent.services.items)[number]["id"];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function HomeServices() {
  const t = useTranslate();
  const homeContent = useHomeContent();
  const services = homeContent.services.items;
  const [activeId, setActiveId] = useState<ServiceId>(services[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = services.find((item) => item.id === activeId) ?? services[0];

  function selectService(id: ServiceId, index: number) {
    setActiveId(id);
    tabRefs.current[index]?.focus();
  }

  function onTabsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = services.findIndex((item) => item.id === activeId);
    const last = services.length - 1;
    const nextMap: Record<string, number> = {
      ArrowDown: current >= last ? 0 : current + 1,
      ArrowRight: current >= last ? 0 : current + 1,
      ArrowUp: current <= 0 ? last : current - 1,
      ArrowLeft: current <= 0 ? last : current - 1,
      Home: 0,
      End: last,
    };
    const next = nextMap[event.key];
    if (next == null) return;

    event.preventDefault();
    const item = services[next];
    if (!item) return;
    selectService(item.id, next);
  }

  return (
    <section
      data-section="Services"
      aria-labelledby="home-services-title"
      className="relative isolate z-10 overflow-hidden bg-transparent pt-12 pb-16 text-secondary sm:pt-16 sm:pb-20"
    >
      <SectionShapes variant="services" />
      <div
        data-component="grid"
        className="mx-auto grid w-full max-w-6xl gap-6 overflow-hidden rounded-2xl border-2 border-primary lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:grid-rows-[auto_1fr] lg:items-stretch lg:gap-x-0 lg:gap-y-0"
      >
        <div
          aria-hidden="true"
          className="hidden rounded-2xl bg-white lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:block lg:rounded-l-none"
        />

        <div className="relative z-10 lg:col-start-2 lg:row-start-1 lg:px-8 lg:pt-10">
          <span className="mb-3 block h-1 w-12 rounded-full bg-primary" aria-hidden="true" />
          <h2
            id="home-services-title"
            className="font-heading text-3xl font-semibold tracking-tight text-secondary sm:text-4xl"
          >
            {homeContent.services.title}
          </h2>
          <p className="mt-3 text-base text-secondary/70">
            {homeContent.services.paragraphs[0]}
          </p>
        </div>

        <article
          id="home-service-panel"
          role="tabpanel"
          aria-labelledby={`service-tab-${active.id}`}
          data-component="card-primary"
          className="relative z-10 flex flex-col overflow-hidden rounded-2xl bg-secondary text-surface shadow-xl shadow-secondary/20 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:min-h-[42rem] lg:rounded-r-none"
        >
          <div
            key={active.id}
            className="relative z-10 h-56 w-full shrink-0 sm:h-64 animate-service-in motion-reduce:animate-none"
          >
            <Image
              src={active.image}
              alt={active.imageAlt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/30 to-transparent"
            />
            <span className="absolute bottom-0 left-7 inline-flex size-14 translate-y-1/2 items-center justify-center rounded-2xl bg-primary text-secondary shadow-lg ring-4 ring-secondary sm:left-9">
              <ServiceGlyph id={active.id} />
            </span>
          </div>

          <div
            key={`${active.id}-body`}
            className="flex flex-1 flex-col justify-between px-7 pt-12 pb-7 animate-service-in motion-reduce:animate-none sm:px-9 sm:pb-9"
          >
            <div>
              <h3 className="font-heading text-2xl font-semibold text-surface sm:text-3xl">
                {active.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-surface/80">{active.summary}</p>

              <ul className="mt-6 grid gap-3 border-t border-surface/15 pt-6 text-sm text-surface/90 sm:text-base">
                {active.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-secondary"
                    >
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <a
                href={active.href}
                data-component="button-primary"
                className={`group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-heading text-sm font-semibold text-secondary transition-colors hover:bg-primary-100 ${focusRing}`}
              >
                <span>{t("En savoir plus")}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </article>

        <div
          role="tablist"
          aria-label="Services disponibles"
          aria-orientation="vertical"
          data-component="tabs"
          className="relative z-10 grid content-center gap-3 lg:col-start-2 lg:row-start-2 lg:px-8 lg:pb-10"
          onKeyDown={onTabsKeyDown}
        >
          {services.map((item, index) => {
            const selected = item.id === active.id;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`service-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="home-service-panel"
                tabIndex={selected ? 0 : -1}
                data-component="card"
                onClick={() => selectService(item.id, index)}
                className={`group flex items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 motion-reduce:transition-none ${focusRing} ${
                  selected
                    ? "border-secondary bg-secondary text-white shadow-lg lg:-ml-8 lg:rounded-l-none lg:pl-12"
                    : "border-secondary/10 bg-white text-secondary hover:border-primary hover:shadow-md"
                }`}
              >
                <span
                  className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    selected
                      ? "bg-primary text-secondary"
                      : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-secondary"
                  }`}
                >
                  <ServiceGlyph id={item.id} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-heading text-lg font-semibold leading-snug">
                    {item.title}
                  </span>
                  <span
                    className={`truncate text-xs ${selected ? "text-white/70" : "text-secondary/60"}`}
                  >
                    {item.highlights[0]}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-lg transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none ${
                    selected ? "text-primary" : "text-secondary/30"
                  }`}
                >
                  →
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
