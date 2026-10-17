"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/components/content-provider";
import type { ServicePageContent } from "@/lib/service-pages";

const focusRing =
  "rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

export function ServiceHero({ page }: { page: ServicePageContent }) {
  const home = useLocale() === "en" ? "/en" : "/";
  const homeLabel = home === "/en" ? "Home" : "Accueil";
  return (
    <section data-section="Hero service" aria-labelledby="service-hero-title" className="bg-hero text-secondary">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <nav aria-label="Fil d'Ariane" data-component="nav" data-name="Fil d'Ariane">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link href={home} className={`font-semibold underline-offset-4 hover:underline ${focusRing}`}>
                {homeLabel}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{page.title}</li>
          </ol>
        </nav>

        <div
          data-name="Visuel"
          className="relative mt-6 aspect-[16/9] overflow-hidden rounded-3xl bg-secondary"
        >
          <Image
            src={page.image.src}
            alt={page.image.alt}
            fill
            preload
            sizes="(min-width: 72rem) 72rem, 100vw"
            className="object-cover"
          />
        </div>

        <h1
          id="service-hero-title"
          className="mt-8 font-heading text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-5xl"
        >
          {page.title}
        </h1>
        <div className="mt-4 grid max-w-3xl gap-3 text-base leading-relaxed text-secondary/80">
          {page.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ul data-name="Pastilles" className="mt-6 flex flex-wrap gap-2">
          {page.badges.map((badge) => (
            <li
              key={badge}
              className="rounded-full bg-surface px-4 py-2 text-sm font-semibold ring-1 ring-primary/40"
            >
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
