"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useHomeContent, useTranslate } from "@/components/content-provider";
import { homeContent } from "@/lib/home-content";

const offerOrder = [
  "domiciliation-commerciale",
  "permanence-telephonique",
  "location-au-mois",
  "location-ponctuelle",
] as const;

function comparedFrom(offers: typeof homeContent.offers) {
  return offerOrder.flatMap((id) => {
    const offer = offers.items.find((item) => item.id === id);
    return offer ? [offer] : [];
  });
}

type ComparedOffer = ReturnType<typeof comparedFrom>[number];
type OfferId = ComparedOffer["id"] | "sur-mesure";
type OfferExample = (typeof homeContent.offers.items)[number]["examples"][number];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function HomeOffers() {
  const t = useTranslate();
  const { offers, seat } = useHomeContent();
  const customOffer = offers.items.find((item) => item.id === "sur-mesure");
  const comparedOffers = comparedFrom(offers);
  const [selectedId, setSelectedId] = useState<ComparedOffer["id"]>("location-ponctuelle");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = tabListRef.current;
    if (!list || list.scrollWidth <= list.clientWidth) return;
    list.scrollLeft = list.scrollWidth - list.clientWidth;
  }, []);
  const selected =
    comparedOffers.find((offer) => offer.id === selectedId) ?? comparedOffers[0];
  const selectedIndex = comparedOffers.findIndex((offer) => offer.id === selected.id);

  function selectAt(index: number) {
    const next = comparedOffers[index];
    if (!next) return;
    setSelectedId(next.id);
    tabRefs.current[index]?.focus();
    tabRefs.current[index]?.scrollIntoView({
      inline: "nearest",
      block: "nearest",
    });
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = comparedOffers.length - 1;
    const nextMap: Record<string, number> = {
      ArrowRight: selectedIndex >= last ? 0 : selectedIndex + 1,
      ArrowDown: selectedIndex >= last ? 0 : selectedIndex + 1,
      ArrowLeft: selectedIndex <= 0 ? last : selectedIndex - 1,
      ArrowUp: selectedIndex <= 0 ? last : selectedIndex - 1,
      Home: 0,
      End: last,
    };
    const next = nextMap[event.key];
    if (next == null) return;
    event.preventDefault();
    selectAt(next);
  }

  return (
    <section
      data-section="Offres"
      aria-labelledby="home-offers-title"
      className="relative bg-surface py-16 text-secondary sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary-100/25 to-surface"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 max-lg:px-4">
        <div className="flex flex-col items-end gap-2 text-right">
          <span className="h-1 w-12 rounded-full bg-primary" aria-hidden="true" />
          <h2
            id="home-offers-title"
            className="text-3xl font-semibold tracking-tight text-secondary sm:text-4xl"
          >
            {offers.title}
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-secondary/12 bg-surface text-secondary shadow-xs">
          <div
            role="tablist"
            aria-label="Offres Alfa"
            data-component="tabs"
            aria-orientation="horizontal"
            ref={tabListRef}
            onKeyDown={onTabKeyDown}
            className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:thin] lg:grid lg:grid-cols-4 lg:overflow-visible"
          >
            {comparedOffers.map((offer, index) => (
              <OfferTab
                key={offer.id}
                offer={offer}
                selected={offer.id === selected.id}
                tabRef={(node) => {
                  tabRefs.current[index] = node;
                }}
                onSelect={() => setSelectedId(offer.id)}
              />
            ))}
          </div>

          <div
            role="tabpanel"
            id="home-offers-panel"
            aria-labelledby={`offer-tab-${selected.id}`}
            data-component="card"
            className="grid gap-6 border-t border-secondary/10 p-5 sm:p-6 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-10"
          >
            <div className="flex flex-col gap-3">
              <OfferIcon id={selected.id} className="bg-primary text-secondary" />
              {selected.subtitle ? (
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {selected.subtitle}
                </p>
              ) : null}
              <h3 className="text-2xl font-semibold tracking-tight">{selected.title}</h3>
              {selected.price ? (
                <p className="inline-flex w-fit items-center rounded-lg bg-primary/15 px-3 py-1.5 text-sm font-bold text-secondary">
                  {selected.price.label}
                </p>
              ) : null}
              <p className="text-sm leading-relaxed text-secondary/85 sm:text-base">
                {selected.intro}
              </p>
            </div>
            <ul className="grid content-start gap-2 sm:grid-cols-2 max-lg:gap-1">
              {selected.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2.5 rounded-xl bg-primary/8 px-3 py-2.5 text-sm leading-snug max-lg:gap-2 max-lg:px-2.5 max-lg:py-1.5 max-lg:leading-tight"
                >
                  <CheckIcon />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <OfferExamples id={selected.id} examples={selected.examples} tone="light" />
          </div>
        </div>

        {customOffer ? (
          <aside
            aria-label={customOffer.title}
            data-component="card"
            data-motion="offer-card"
            className="offer-card flex flex-col gap-6 rounded-2xl border border-primary/40 bg-secondary p-6 text-surface transition-[translate] duration-200 ease-out hover:-translate-y-0.5 sm:p-8"
          >
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div className="flex max-w-2xl items-start gap-4">
                <OfferIcon id="sur-mesure" className="bg-primary text-secondary" />
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-surface sm:text-2xl">
                    {customOffer.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-surface/85 sm:text-base">
                    {customOffer.intro}
                  </p>
                </div>
              </div>
              <a
                href={seat.phoneHref}
                data-component="button-primary"
                className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-secondary focus-visible:outline-offset-2 focus-visible:outline-primary-100 ${focusRing}`}
              >
                <PhoneIcon />
                <span>{t("Appeler")}</span>
              </a>
            </div>
            <OfferExamples id="sur-mesure" examples={customOffer.examples} tone="dark" />
          </aside>
        ) : null}
      </div>
    </section>
  );
}

function OfferExamples({
  id,
  examples,
  tone,
}: {
  id: string;
  examples: readonly OfferExample[];
  tone: "light" | "dark";
}) {
  const t = useTranslate();
  const labelId = `offer-examples-${id}`;
  const light = tone === "light";

  return (
    <div data-name="Exemples clients" className="flex flex-col gap-3 lg:col-span-2 max-lg:gap-1.5">
      <p
        id={labelId}
        className={`text-xs font-semibold tracking-wide uppercase ${light ? "text-primary" : "text-primary-100"}`}
      >
        {t("Pour vous, par exemple")}
      </p>
      <ul aria-labelledby={labelId} className="grid gap-2 sm:grid-cols-3 max-lg:gap-1.5">
        {examples.map((example) => (
          <li
            key={example.role}
            data-name={example.role}
            className={`flex flex-col gap-1 rounded-xl px-3 py-3 max-lg:gap-0.5 max-lg:px-2.5 max-lg:py-1.5 ${
              light ? "bg-[#e6fffc]" : "bg-surface/10"
            }`}
          >
            <span className={`text-sm font-semibold ${light ? "text-secondary" : "text-surface"}`}>
              {example.role}
            </span>
            <span
              className={`text-sm leading-snug max-lg:leading-tight ${light ? "text-secondary/80" : "text-surface/80"}`}
            >
              {example.scene}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OfferTab({
  offer,
  selected,
  onSelect,
  tabRef,
}: {
  offer: ComparedOffer;
  selected: boolean;
  onSelect: () => void;
  tabRef: (node: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      ref={tabRef}
      id={`offer-tab-${offer.id}`}
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls="home-offers-panel"
      tabIndex={selected ? 0 : -1}
      data-component={selected ? "button-primary" : "button"}
      onClick={onSelect}
      className={`flex h-full w-[min(72vw,16rem)] shrink-0 snap-start flex-col items-start gap-2 border-b-2 px-4 py-4 text-left text-secondary lg:w-auto ${focusRing} ${
        selected
          ? "border-primary bg-primary/10"
          : "border-transparent bg-secondary/[0.03] hover:bg-primary/5"
      }`}
    >
      <OfferIcon
        id={offer.id}
        className={selected ? "bg-primary text-secondary" : "bg-primary/12 text-primary"}
      />
      <span className="text-base font-semibold leading-snug">{offer.title}</span>
      {offer.price ? (
        <span className="text-xs font-bold text-secondary/80">{offer.price.label}</span>
      ) : null}
    </button>
  );
}

function OfferIcon({ id, className }: { id: OfferId; className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-2xl ${className}`}
    >
      {iconFor(id)}
    </span>
  );
}

function iconFor(id: OfferId): ReactNode {
  if (id === "location-ponctuelle") return <ClockIcon />;
  if (id === "location-au-mois") return <BuildingIcon />;
  if (id === "permanence-telephonique") return <PhoneIcon />;
  if (id === "domiciliation-commerciale") return <MailboxIcon />;
  return <SlidersIcon />;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary">
      <circle cx="10" cy="10" r="8" fill="currentColor" opacity="0.18" />
      <path
        d="M6 10.2 8.6 12.8 14 7.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 8v4.2L15 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path
        d="M4 20V8.5L12 4l8 4.5V20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 20v-5h6v5M9 11h.01M12 11h.01M15 11h.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path
        d="M8 4.5h2.2l1.1 2.6-1.5 1a12 12 0 0 0 5.1 5.1l1-1.5 2.6 1.1V18a1.5 1.5 0 0 1-1.6 1.5A15 15 0 0 1 4.5 6.6 1.5 1.5 0 0 1 6 5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailboxIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path
        d="M4 10.5h16v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M4 10.5 12 15l8-4.5M12 4v6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path
        d="M4 8h10M18 8h2M4 16h2M10 16h10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="16" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="8" cy="16" r="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
