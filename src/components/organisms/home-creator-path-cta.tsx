"use client";

import { useDictionary } from "@/components/content-provider";
import { OpenContactButton } from "@/components/organisms/open-contact-button";

export function CreatorPathCta() {
  const { creatorPath } = useDictionary();

  return (
    <OpenContactButton className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 py-3 font-heading text-sm font-semibold text-secondary transition-colors hover:bg-primary-100 motion-reduce:transition-none">
      {creatorPath.cta}
    </OpenContactButton>
  );
}
