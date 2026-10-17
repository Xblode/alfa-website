"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import { SectionShapes } from "@/components/shared/section-shapes";
import { useHomeContent, useTranslate } from "@/components/content-provider";
import { homeContent } from "@/lib/home-content";

type ArticleMedia = (typeof homeContent.articles.items)[number]["media"];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function HomeArticles() {
  const t = useTranslate();
  const content = useHomeContent();
  const items = content.articles.items;
  const [index, setIndex] = useState(0);
  const total = items.length;
  const active = items[index] ?? items[0];

  function goTo(next: number) {
    setIndex(((next % total) + total) % total);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  }

  if (!active) return null;

  return (
    <section
      data-section="Articles"
      aria-labelledby="home-articles-title"
      onKeyDown={onKeyDown}
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,#d2fffc_0%,#ebf1f1_360px,#ebf1f1_100%)] py-16 text-secondary sm:py-20"
    >
      <SectionShapes variant="articles" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span
              className="mb-2 block h-1 w-10 rounded-full bg-primary"
              aria-hidden="true"
            />
            <h2
              id="home-articles-title"
              className="font-heading text-2xl font-semibold tracking-tight text-secondary sm:text-3xl"
            >
              {content.articles.title}
            </h2>
            <p className="mt-1 text-sm text-secondary/75">{content.articles.subtitle}</p>
          </div>

          <div
            role="group"
            aria-label="Navigation des articles"
            className="flex items-center gap-1.5"
          >
            <span
              aria-live="polite"
              className="mr-1.5 text-xs font-medium tabular-nums text-secondary/70"
            >
              {index + 1} / {total}
            </span>
            <button
              type="button"
              data-component="button"
              aria-label="Article précédent"
              onClick={() => goTo(index - 1)}
              className={`inline-flex size-9 items-center justify-center rounded-full border border-secondary/20 bg-surface text-secondary transition-colors hover:border-primary hover:text-primary ${focusRing}`}
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
                <path
                  d="M12.5 4.5 7 10l5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              data-component="button"
              aria-label="Article suivant"
              onClick={() => goTo(index + 1)}
              className={`inline-flex size-9 items-center justify-center rounded-full border border-secondary/20 bg-surface text-secondary transition-colors hover:border-primary hover:text-primary ${focusRing}`}
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
                <path
                  d="M7.5 4.5 13 10l-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          data-component="carousel"
          aria-roledescription="carousel"
          aria-label="Aperçu des articles"
        >
          <article
            key={active.id}
            data-component="card"
            className="grid items-center gap-5 rounded-2xl border border-secondary/10 bg-surface p-4 shadow-sm sm:grid-cols-[15rem_minmax(0,1fr)] sm:gap-6 sm:p-5"
          >
            <MediaThumb media={active.media} title={active.title} />

            <div className="flex min-w-0 flex-col justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-secondary/65">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary">
                    {active.category}
                  </span>
                  <span>{active.readingTime}</span>
                  {active.media.kind === "video" ? (
                    <span className="font-semibold text-secondary">• Réel associé</span>
                  ) : null}
                </div>

                <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-secondary sm:text-xl">
                  {active.title}
                </h3>

                <p className="mt-2 text-sm font-medium leading-relaxed text-secondary">
                  {active.lead}
                </p>

                <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-secondary/75">
                  {active.opening}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-secondary/10 pt-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={active.href}
                    data-component="button-primary"
                    className={`inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 font-heading text-xs font-semibold text-surface transition-colors hover:bg-secondary sm:text-sm ${focusRing}`}
                  >
                    <span>{t("Lire l'article")}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                  {active.media.reelHref ? (
                    <a
                      href={active.media.reelHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-component="button-secondary"
                      className={`inline-flex items-center gap-1.5 rounded-lg border border-secondary/15 px-3 py-2 text-xs font-semibold text-secondary transition-colors hover:border-primary hover:text-primary sm:text-sm ${focusRing}`}
                    >
                      <span>{t("Voir le Réel")}</span>
                    </a>
                  ) : null}
                </div>

                <div
                  role="tablist"
                  aria-label="Choisir un article"
                  className="flex items-center gap-1.5"
                >
                  {items.map((item, idx) => {
                    const selected = idx === index;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        aria-label={`Article ${idx + 1} : ${item.title}`}
                        onClick={() => goTo(idx)}
                        className={`h-2 rounded-full transition-all max-lg:h-6 max-lg:bg-clip-content max-lg:py-2 ${focusRing} ${
                          selected
                            ? "w-6 bg-primary"
                            : "w-2 bg-secondary/20 hover:bg-secondary/40 max-lg:w-6 max-lg:px-2"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function MediaThumb({ media, title }: { media: ArticleMedia; title: string }) {
  const isVideo = media.kind === "video";
  const content = (
    <div
      data-component="image"
      className="group relative mx-auto aspect-[9/16] w-48 shrink-0 overflow-hidden rounded-xl bg-secondary sm:w-full"
    >
      {isVideo && media.src ? (
        <video
          src={media.src}
          poster={media.poster}
          muted
          playsInline
          loop
          preload="metadata"
          aria-label={media.alt}
          className="h-full w-full object-cover"
        />
      ) : (
        <Image
          src={media.poster}
          alt={media.alt}
          fill
          sizes="240px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary/75 via-transparent to-secondary/35"
      />

      {isVideo ? (
        <>
          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-secondary/85 px-2 py-0.5 text-[11px] font-semibold text-surface">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            Réel
          </span>
          <span
            aria-hidden="true"
            className=" absolute inset-0 flex items-center justify-center"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-secondary shadow-md transition-transform group-hover:scale-105">
              <svg viewBox="0 0 20 20" fill="currentColor" className="ml-0.5 size-4">
                <path d="M6.5 4.75v10.5L15 10 6.5 4.75Z" />
              </svg>
            </span>
          </span>
          {media.duration ? (
            <span className="absolute right-2.5 bottom-2.5 rounded bg-secondary/85 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-surface">
              {media.duration}
            </span>
          ) : null}
        </>
      ) : null}
    </div>
  );

  if (isVideo && media.reelHref) {
    return (
      <a
        href={media.reelHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Lire le Réel : ${title}`}
        className={`block rounded-xl ${focusRing}`}
      >
        {content}
      </a>
    );
  }

  return content;
}
