"use client";

import Link from "next/link";
import Image from "next/image";
import { useDictionary, useLang } from "@/components/content-provider";
import type { ServicePageContent } from "@/lib/service-pages";

const focusRing =
  "rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

export function ServiceHero({ page }: { page: ServicePageContent }) {
  const home = useLang() === "en" ? "/en" : "/";
  const { ui } = useDictionary();
  return (
    <section data-section="Hero service" aria-labelledby="service-hero-title" className="bg-hero text-secondary">
      <div
        data-name="Visuel"
        className="relative h-40 w-full overflow-hidden bg-secondary sm:h-52 lg:h-64"
      >
        <Image
          src={page.image.src}
          alt={page.image.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <nav aria-label={ui.breadcrumb.label} data-component="nav" data-name="Fil d'Ariane">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link href={home} className={`font-semibold underline-offset-4 hover:underline ${focusRing}`}>
                {ui.breadcrumb.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{page.title}</li>
          </ol>
        </nav>
        <h1
          id="service-hero-title"
          className="mt-4 font-heading text-display leading-tight font-semibold text-balance"
        >
          {page.title}
        </h1>
        <div className="mt-4 grid max-w-3xl gap-3 text-base leading-relaxed text-secondary/80 lg:text-lg">
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
