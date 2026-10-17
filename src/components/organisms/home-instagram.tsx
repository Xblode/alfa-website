"use client";

import { useHomeContent, useTranslate } from "@/components/content-provider";

function InstagramMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-7 text-secondary"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
    >
      <path
        d="M6 14 14 6M8 6h6v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeInstagram() {
  const t = useTranslate();
  const homeContent = useHomeContent();
  const instagramUrl = homeContent.social.instagram;
  const instagramPreviews = [
    ...homeContent.spaces.items.flatMap((item) =>
      item.image ? [{ src: item.image, alt: item.cardTitle }] : [],
    ),
    ...homeContent.hero.slides.slice(0, 2).map((slide) => ({
      src: slide.src,
      alt: slide.alt,
    })),
  ].slice(0, 6);
  return (
    <section
      data-section="Instagram"
      aria-labelledby="home-instagram-title"
      className="relative isolate overflow-hidden bg-primary-100/45 text-secondary"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -top-20 left-[6%] size-44 rounded-full bg-primary/25" />
        <span className="absolute -top-10 right-[14%] size-28 rounded-full bg-primary/30" />
        <span className="absolute top-16 -left-16 size-64 rounded-[42%] bg-primary/10" />
        <span className="absolute top-1/3 right-[8%] size-20 rotate-12 rounded-3xl bg-primary/20" />
        <span className="absolute -right-16 bottom-8 size-56 rounded-full bg-secondary/5" />
        <span className="absolute bottom-16 left-[28%] size-14 rounded-full bg-primary/25" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:pt-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div data-name="Feed Instagram" className="order-2 lg:order-1">
            <a
              href={instagramUrl}
              className="group mb-4 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-primary decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary sm:text-base"
            >
              <span>@{homeContent.social.instagramHandle}</span>
              <ArrowUpRightIcon />
            </a>

            {instagramPreviews.length > 0 ? (
              <ul data-component="grid" className="grid grid-cols-3 gap-3">
                {instagramPreviews.map((preview) => (
                  <li key={preview.src}>
                    <a
                      href={instagramUrl}
                      aria-label={`${t("Voir sur Instagram")} : ${preview.alt}`}
                      className="group block overflow-hidden rounded-2xl border border-secondary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                    >
                      <span className="relative block aspect-square overflow-hidden bg-secondary/5">
                        <img
                          src={preview.src}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
                        />
                        <span className="absolute inset-0 flex items-end justify-end bg-secondary/80 p-2 text-surface opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                          <ArrowUpRightIcon />
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div data-name="Présentation Instagram" className="order-1 lg:order-2">
            <span className="mb-3 inline-flex rounded-full border-2 border-primary bg-primary-100/30 p-2">
              <InstagramMark />
            </span>
            <h2 id="home-instagram-title" className="text-2xl font-semibold sm:text-3xl">
              {t("Alfa sur Instagram")}
            </h2>
            <div className="mt-2.5 flex items-center justify-between gap-4">
              <p className="min-w-0 text-base leading-relaxed text-secondary/85">
                {t("Aperçu des espaces du centre. Les publications du compte sont sur Instagram.")}
              </p>
              <a
                href={instagramUrl}
                className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border-2 border-primary bg-secondary px-5 py-2.5 text-base font-semibold text-surface transition-colors hover:bg-primary-100 hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary motion-reduce:transition-none"
              >
                <span>{t("Voir sur Instagram")}</span>
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

