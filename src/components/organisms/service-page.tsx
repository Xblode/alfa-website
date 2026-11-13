"use client";

import { useDictionary, useLang } from "@/components/content-provider";
import { FaqSection } from "@/components/organisms/faq-section";
import { HomePromises } from "@/components/organisms/home-promises";
import { ServiceBlock } from "@/components/organisms/service-block";
import { ServiceHero } from "@/components/organisms/service-hero";
import { ServiceInfoRequest } from "@/components/organisms/service-info-request";
import { localizePath } from "@/lib/locale";
import { getServicePages, otherServiceLinks, type ServicePageId } from "@/lib/service-pages";

export function ServicePage({ id }: { id: ServicePageId }) {
  const lang = useLang();
  const pages = getServicePages(useDictionary());
  const page = pages[id];
  const links = otherServiceLinks(pages, page.id).map((link) => ({
    href: localizePath(link.href, lang),
    label: link.label,
  }));

  return (
    <>
      <ServiceHero page={page} />
      {page.blocks.map((block, index) => (
        <ServiceBlock
          key={block.id}
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
