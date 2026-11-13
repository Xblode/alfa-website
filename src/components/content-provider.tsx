"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getDictionary, languages, type Dictionary, type Lang } from "@/content";
import { localeFromPath } from "@/lib/locale";

/** Langue courante. Pour ce lot, elle se déduit encore du chemin (`/en/...` = anglais). */
export function useLang(): Lang {
  return localeFromPath(usePathname() || "/");
}

/** Textes de la langue courante. */
export function useDictionary(): Dictionary {
  return getDictionary(useLang());
}

export function DocumentLang() {
  const lang = useLang();
  useEffect(() => {
    const language = languages.find((item) => item.code === lang);
    if (language) document.documentElement.lang = language.htmlLang;
  }, [lang]);
  return null;
}
