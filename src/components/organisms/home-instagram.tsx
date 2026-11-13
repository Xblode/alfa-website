"use client";

import { useDictionary } from "@/components/content-provider";
import { InstagramGrid, type InstagramPreview } from "./instagram-grid";
import { ArrowUpRightIcon, InstagramMark } from "./instagram-icons";

export function HomeInstagram() {
  const homeContent = useDictionary();
  const { ui } = homeContent;
  const instagramUrl = homeContent.social.instagram;
  // Carré par défaut ; complété par des placeholders jusqu'à 9 vignettes.
  const instagramPreviews: InstagramPreview[] = [
    ...homeContent.spaces.items.flatMap((item) =>
      item.image ? [{ src: item.image, alt: item.cardTitle }] : [],
    ),
    ...homeContent.hero.slides.slice(0, 2).map((slide) => ({
      src: slide.src,
      alt: slide.alt,
    })),
  ].slice(0, 9);
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
            <InstagramGrid
              previews={instagramPreviews}
              href={instagramUrl}
              viewLabel={(alt) =>
                ui.instagramSection.viewItem.replace("{title}", alt)
              }
            />
            <a
              href={instagramUrl}
              className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-primary decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary sm:text-base max-sm:min-h-6"
            >
              <span>@{homeContent.social.instagramHandle}</span>
              <ArrowUpRightIcon />
            </a>
          </div>

          <div
            data-name="Présentation Instagram"
            className="order-1 lg:order-2"
          >
            <span className="mb-3 inline-flex rounded-full border-2 border-primary bg-primary-100/30 p-2">
              <InstagramMark />
            </span>
            <h2
              id="home-instagram-title"
              className="text-section font-semibold"
            >
              {ui.instagramSection.title}
            </h2>
            <p className="mt-2.5 text-base leading-relaxed text-secondary/85 lg:text-lg">
              {ui.instagramSection.description}
            </p>
            <a
              href={instagramUrl}
              className="group mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-primary bg-secondary px-5 py-2.5 text-base font-semibold text-surface transition-colors hover:bg-primary-100 hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary motion-reduce:transition-none max-sm:w-full"
            >
              <span>{ui.instagramSection.view}</span>
              <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
