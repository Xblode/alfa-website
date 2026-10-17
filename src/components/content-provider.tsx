"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { enDictionary } from "@/lib/en-dictionary";
import { homeContent } from "@/lib/home-content";
import { homeContentEn } from "@/lib/home-content-en";
import { localeFromPath, type Locale } from "@/lib/locale";

export function useLocale(): Locale {
  return localeFromPath(usePathname() || "/");
}

export function useHomeContent() {
  return useLocale() === "en" ? homeContentEn : homeContent;
}

export function useTranslate() {
  const locale = useLocale();
  return (text: string) => (locale === "en" ? (enDictionary[text] ?? text) : text);
}

export function DocumentLang() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
