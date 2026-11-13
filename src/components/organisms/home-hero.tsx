"use client";

import Image from "next/image";
import { useDictionary } from "@/components/content-provider";
import type { Dictionary } from "@/content";

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

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary">
      <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeroRating({ rating }: { rating: NonNullable<Dictionary["hero"]["rating"]> }) {
  const { ui } = useDictionary();
  const full = Math.round(rating.score);
  return (
    <a
      href={rating.href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-secondary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    >
      <span aria-hidden="true" className="flex text-primary">
        {[1, 2, 3, 4, 5].map((n) => (
          <svg key={n} viewBox="0 0 20 20" className="size-4">
            <path d="m10 2.6 2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 13.4 5.8 15.6l.8-4.7L3.2 7.6l4.7-.7L10 2.6Z" fill={n <= full ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        ))}
      </span>
      <span>
        {ui.hero.ratingLabel} <strong>{rating.score} / 5</strong> {ui.hero.ratingOn} {rating.count} {ui.hero.ratingReviews}
        <span className="sr-only">, {rating.source}</span>
      </span>
    </a>
  );
}

function PhoneCallIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5 shrink-0 transition-transform group-hover:scale-105 motion-reduce:transition-none"
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
  const { hero, seat, ui } = useDictionary();
  const { title, subtitle, subtitleEmphasis, points, rating, slides } = hero;
  const [reception, office, contact] = slides;

  return (
    <section
      aria-labelledby="home-hero-title"
      className="bg-hero text-secondary"
    >
      <div className="mx-auto grid w-full max-w-[calc(72rem+200px)] items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20 max-lg:min-[48rem]:grid-cols-2">
        <div className="min-w-0 border-l-4 border-primary pl-4 sm:pl-6 lg:col-span-6">
          <p className="inline-flex items-center gap-2 text-base font-semibold tracking-wider text-secondary/80 uppercase lg:text-lg">
            <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
            {title}
          </p>
          <h1
            id="home-hero-title"
            className="mt-3 font-heading text-display leading-[1.05] font-semibold text-balance"
          >
            <HeroTitle text={subtitle} emphasis={subtitleEmphasis} />
          </h1>

          <ul className="mt-6 grid gap-2.5 text-base font-medium text-secondary/90 lg:text-lg">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <CheckIcon />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          {rating ? <HeroRating rating={rating} /> : null}

          <div
            data-name="Accroche centre"
            className="mt-6 flex flex-col items-start gap-3 text-sm text-secondary/85"
          >
            <span className="font-medium">{ui.hero.tagline}</span>
            <div className="flex flex-col items-start gap-1.5">
              <a
                href={seat.phoneHref}
                data-component="button-primary"
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-6 py-2.5 font-heading font-semibold text-white transition-colors hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary motion-reduce:transition-none"
              >
                <PhoneCallIcon />
                <span>{ui.hero.talkToAdvisor}</span>
                <span aria-hidden="true" className="h-5 w-px bg-white/40" />
                <span className="whitespace-nowrap">{seat.phoneDisplay}</span>
              </a>
              <span className="pl-2 text-secondary/75">{ui.hero.hours}</span>
            </div>
          </div>
        </div>

        <div className="relative h-72 min-w-0 max-md:order-first sm:h-[26rem] lg:col-span-6 lg:h-[30rem] max-md:!h-52">
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

