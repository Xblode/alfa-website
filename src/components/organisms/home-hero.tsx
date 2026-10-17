"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useHomeContent, useTranslate } from "@/components/content-provider";

const cityPrefix = "Votre centre d'affaires proche à";

function orderedCities(cities: readonly string[]) {
  const unique = [...new Set(cities)];
  const lead = ["Rouen", "Le Havre"].filter((city) => unique.includes(city));
  return [...lead, ...unique.filter((city) => !lead.includes(city))];
}

function TypedCity({ cities }: { cities: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(cities[0]?.length ?? 0);
  const [phase, setPhase] = useState<"type" | "hold" | "delete" | "gap">("hold");
  const word = cities[index] ?? "";
  const shown = word.slice(0, count);
  const longest = cities.reduce((current, city) => (city.length > current.length ? city : current), "");

  useEffect(() => {
    if (cities.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const current = cities[index] ?? "";
    const delay = phase === "hold" ? 1600 : phase === "delete" ? 42 : phase === "gap" ? 280 : 75;
    const timer = window.setTimeout(() => {
      if (phase === "hold") {
        setPhase("delete");
        return;
      }
      if (phase === "delete") {
        if (count === 0) setPhase("gap");
        else setCount((value) => value - 1);
        return;
      }
      if (phase === "gap") {
        setIndex((value) => (value + 1) % cities.length);
        setPhase("type");
        return;
      }
      if (count >= current.length) setPhase("hold");
      else setCount((value) => value + 1);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [cities, count, index, phase]);

  return (
    <span className="inline-grid align-bottom">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-semibold">
        {longest}
      </span>
      <span className="col-start-1 row-start-1 font-semibold text-primary" aria-hidden="true">
        {shown}
        <span className="ml-px inline-block h-[0.9em] w-px translate-y-px animate-pulse bg-primary motion-reduce:hidden" />
      </span>
    </span>
  );
}

function HeroTitle({ text, emphasis }: { text: string; emphasis: string }) {
  const index = text.indexOf(emphasis);
  if (index === -1) {
    return text;
  }

  return (
    <>
      {text.slice(0, index)}
      <span className="text-primary">{emphasis}</span>
      {text.slice(index + emphasis.length)}
    </>
  );
}

function LocationPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 shrink-0 text-primary"
    >
      <path
        d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 1 1 13 0c0 5.2-6.5 11-6.5 11Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.25" fill="currentColor" />
    </svg>
  );
}

function PhoneCallIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 shrink-0 text-primary transition-transform group-hover:scale-105 motion-reduce:transition-none"
    >
      <path
        d="M21 16.4v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.6 5.2 2 2 0 0 1 4.6 3h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.6 11a16 16 0 0 0 6.4 6.4l1.4-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 21 16.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeHero() {
  const t = useTranslate();
  const { hero, seat, spaces } = useHomeContent();
  const { title, subtitle, subtitleEmphasis, slides } = hero;
  const [reception, office, contact] = slides;
  const cities = orderedCities(spaces.items.map((item) => item.city));

  return (
    <section
      aria-labelledby="home-hero-title"
      className="bg-hero text-secondary"
    >
      <div className="mx-auto grid w-full max-w-[calc(72rem+200px)] items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20 max-lg:min-[48rem]:grid-cols-2">
        <div className="min-w-0 border-l-4 border-primary pl-4 sm:pl-6 lg:col-span-6">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-secondary/80 uppercase sm:text-sm">
            <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
            {title}
          </p>
          <h1
            id="home-hero-title"
            className="mt-3 font-heading text-3xl leading-[1.15] font-semibold text-balance sm:text-4xl lg:text-5xl"
          >
            <HeroTitle text={subtitle} emphasis={subtitleEmphasis} />
          </h1>

          <div
            data-name="Accroche villes"
            className="mt-6 flex flex-col items-start gap-3 text-sm text-secondary/85"
          >
            <span className="inline-flex items-center gap-2 font-medium">
              <LocationPinIcon />
              <span>
                <span className="sr-only">
                  {t(cityPrefix)} {cities.join(", ")}
                </span>
                <span aria-hidden="true">
                  {t(cityPrefix)} <TypedCity cities={cities} />
                </span>
              </span>
            </span>
            <a
              href={seat.phoneHref}
              className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-secondary/15 bg-surface px-3.5 py-1.5 font-semibold text-secondary transition-colors hover:border-primary hover:bg-primary-100/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary motion-reduce:transition-none max-lg:min-h-11"
            >
              <PhoneCallIcon />
              <span>{seat.phoneDisplay}</span>
            </a>
          </div>
        </div>

        <div className="relative h-72 min-w-0 sm:h-[26rem] lg:col-span-6 lg:h-[30rem] max-md:!h-52">
          <div
            aria-hidden="true"
            className="absolute inset-x-4 inset-y-6 rounded-3xl bg-primary-100/70 sm:inset-x-6 sm:inset-y-8 sm:rounded-[2rem]"
          />
          <div className="absolute top-5 right-0 bottom-0 left-[24%] overflow-hidden rounded-2xl bg-secondary shadow-md sm:top-6 sm:left-[26%]">
            <Image
              src={reception.src}
              alt={reception.alt}
              fill
              preload
              sizes="(min-width: 1024px) 28rem, 78vw"
              className="object-cover"
            />
          </div>
          <div className="absolute top-0 left-0 z-10 h-[45%] w-[52%] overflow-hidden rounded-2xl bg-secondary shadow-sm ring-4 ring-surface sm:w-1/2">
            <Image
              src={office.src}
              alt={office.alt}
              fill
              sizes="(min-width: 1024px) 16rem, 52vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-3 z-10 h-[40%] w-[48%] overflow-hidden rounded-2xl bg-secondary shadow-sm ring-4 ring-surface sm:left-5 sm:w-[46%]">
            <Image
              src={contact.src}
              alt={contact.alt}
              fill
              sizes="(min-width: 1024px) 14rem, 48vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

