"use client";

import { SectionShapes } from "@/components/shared/section-shapes";
import { useDictionary, useLang } from "@/components/content-provider";
import { localizePath } from "@/lib/locale";
import { ServiceSquareTile } from "./service-square-tile";
import { ServiceTile } from "./service-tile";

/** Fonds clairs des petites tuiles, tirés des teintes de la DA (hero, primaire clair, gris). */
const smallTones = ["bg-hero", "bg-primary-100/30", "bg-secondary/10"] as const;

export function HomeServices() {
  const lang = useLang();
  const { services, ui } = useDictionary();
  const [featured, ...others] = services.items;

  return (
    <section
      data-section="Services"
      aria-labelledby="home-services-title"
      className="relative isolate z-10 overflow-hidden bg-surface pt-12 pb-16 text-secondary sm:pt-16 sm:pb-20"
    >
      <SectionShapes variant="services" />
      <div className="relative z-10 mx-auto w-full max-w-[calc(72rem+200px)] px-4">
        <h2 id="home-services-title" className="sr-only">
          {services.title}
        </h2>

        <div data-component="grid" className="grid gap-2 max-md:hidden lg:grid-cols-2 lg:grid-rows-3">
          {[featured, ...others].map((item, index) => (
            <ServiceTile
              key={item.id}
              featured={index === 0}
              tone={smallTones[index - 1]}
              title={item.title}
              summary={"bentoSummary" in item ? item.bentoSummary : item.summary}
              image={item.image}
              imageAlt={item.imageAlt}
              href={localizePath(item.href, lang)}
              cta={ui.common.learnMore}
              ctaLabel={ui.common.learnMoreAbout.replace("{title}", item.title)}
            />
          ))}
        </div>

        <ul className="grid grid-cols-2 gap-2.5 md:hidden">
          {services.items.map((item) => (
            <li key={item.id}>
              <ServiceSquareTile
                title={item.title}
                image={item.image}
                href={localizePath(item.href, lang)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
