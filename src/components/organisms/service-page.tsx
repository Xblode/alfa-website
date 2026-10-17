"use client";

import { useLocale } from "@/components/content-provider";
import { FaqSection } from "@/components/organisms/faq-section";
import { HomePromises } from "@/components/organisms/home-promises";
import { ServiceBlock } from "@/components/organisms/service-block";
import { ServiceHero } from "@/components/organisms/service-hero";
import { ServiceInfoRequest } from "@/components/organisms/service-info-request";
import { enDictionary } from "@/lib/en-dictionary";
import { otherServiceLinks, type ServicePageContent } from "@/lib/service-pages";

export function ServicePage({ page }: { page: ServicePageContent }) {
  const locale = useLocale();
  const links = otherServiceLinks(page.id).map((link) => ({
    href: locale === "en" ? `/en${link.href}` : link.href,
    label: locale === "en" ? (enDictionary[link.label] ?? link.label) : link.label,
  }));

  return (
    <>
      <ServiceHero page={page} />
      {page.blocks.map((block, index) => (
        <ServiceBlock
          key={block.section}
          block={block}
          imageFirst={index % 2 === 0}
          links={index === page.blocks.length - 1 ? links : undefined}
        />
      ))}
      <FaqSection
        titleId="service-faq-title"
        title={page.faq.title}
        subtitle={page.faq.subtitle}
        items={page.faq.items}
        className="bg-primary-100/25 py-16 text-secondary sm:py-20"
      />
      <ServiceInfoRequest />
      <HomePromises />
    </>
  );
}
