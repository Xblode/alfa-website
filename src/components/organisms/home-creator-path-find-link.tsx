"use client";

import { useDictionary, useLang } from "@/components/content-provider";
import { localizePath } from "@/lib/locale";

export function CreatorPathFindLink() {
  const { creatorPath } = useDictionary();
  const lang = useLang();

  return (
    <a
      href={localizePath("/trouver-mon-offre", lang)}
      data-component="button-primary"
      className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 font-heading text-sm font-semibold text-white transition-colors hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary motion-reduce:transition-none"
    >
      {creatorPath.findCta}
    </a>
  );
}
