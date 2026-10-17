"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslate } from "@/components/content-provider";
import { OpenContactButton } from "@/components/organisms/open-contact-button";
import { ServiceFactList } from "@/components/organisms/service-fact-list";
import type { ServiceBlockContent, ServiceLink } from "@/lib/service-pages";

const focusRing =
  "rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

const contactClassName =
  "inline-flex min-h-11 w-fit items-center justify-center rounded-full bg-primary px-5 py-2.5 text-center font-heading text-sm font-semibold text-secondary transition-colors hover:bg-primary-100";

const headingIds: Record<string, string> = {
  "Qu'est-ce que": "service-what",
  "Pourquoi choisir": "service-why",
  "Solutions Alfa": "service-solutions",
  "What it is": "service-what",
  "Why choose it": "service-why",
  "Alfa solutions": "service-solutions",
};

export function ServiceBlock({
  block,
  imageFirst,
  links,
}: {
  block: ServiceBlockContent;
  imageFirst: boolean;
  links?: readonly ServiceLink[];
}) {
  const t = useTranslate();
  const headingId = headingIds[block.section];

  return (
    <section
      data-section={block.section}
      aria-labelledby={headingId}
      className={imageFirst ? "bg-surface text-secondary" : "bg-hero text-secondary"}
    >
      <div
        data-component="grid"
        className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-12"
      >
        <div className={imageFirst ? "" : "lg:order-2"}>
          <div
            data-name={block.image.alt}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-secondary"
          >
            <Image
              src={block.image.src}
              alt={block.image.alt}
              fill
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className={imageFirst ? "" : "lg:order-1"}>
          <span className="mb-3 block h-1 w-12 rounded-full bg-primary" aria-hidden="true" />
          <h2 id={headingId} className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {block.section}
          </h2>
          {block.paragraphs.length > 0 ? (
            <div className="mt-4 grid gap-3 text-base leading-relaxed text-secondary/80">
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          {block.points.length > 0 ? (
            <ul className="mt-4 grid gap-2">
              {block.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-base leading-relaxed">
                  <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {block.lists.map((list) => (
            <ServiceFactList key={list.title} list={list} />
          ))}
          {links ? <ServiceLinks links={links} /> : null}
        </div>
      </div>
    </section>
  );
}

function ServiceLinks({ links }: { links: readonly ServiceLink[] }) {
  const t = useTranslate();
  return (
    <nav aria-label="Autres services" data-component="nav" data-name="Autres services" className="mt-8 grid gap-3">
      <ul className="grid gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`inline-flex min-h-11 items-center gap-2 font-semibold text-secondary underline decoration-primary decoration-2 underline-offset-4 hover:text-primary ${focusRing}`}
            >
              <span aria-hidden="true">→</span>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <OpenContactButton className={contactClassName}>{t("Contactez-nous")}</OpenContactButton>
    </nav>
  );
}
