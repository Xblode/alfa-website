"use client";

import { useHomeContent } from "@/components/content-provider";
import { FaqSection } from "@/components/organisms/faq-section";

export function HomeFaq() {
  const { faq } = useHomeContent();
  return (
    <FaqSection
      titleId="home-faq-title"
      title={faq.title}
      subtitle={faq.subtitle}
      items={faq.items}
    />
  );
}
