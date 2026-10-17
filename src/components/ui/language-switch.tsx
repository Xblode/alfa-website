"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { localizePath, localeFromPath, type Locale } from "@/lib/locale";

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function LanguageSwitch() {
  const pathname = usePathname() || "/";
  const locale = localeFromPath(pathname);

  return (
    <div role="group" aria-label="Langue" data-name="Langue" className="ml-1 flex items-center">
      <LanguageLink locale="fr" current={locale} pathname={pathname} label="Français">
        <FrenchFlag />
      </LanguageLink>
      <LanguageLink locale="en" current={locale} pathname={pathname} label="English">
        <EnglishFlag />
      </LanguageLink>
    </div>
  );
}

function LanguageLink({
  locale,
  current,
  pathname,
  label,
  children,
}: {
  locale: Locale;
  current: Locale;
  pathname: string;
  label: string;
  children: ReactNode;
}) {
  const active = locale === current;

  return (
    <Link
      href={localizePath(pathname, locale)}
      hrefLang={locale}
      aria-current={active ? "page" : undefined}
      aria-label={label}
      data-component="button"
      className={`inline-flex size-11 items-center justify-center rounded-md ${active ? "ring-2 ring-primary" : ""} ${focusRing}`}
    >
      {children}
    </Link>
  );
}

function FlagFrame({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-4 w-6 overflow-hidden rounded-sm ring-1 ring-secondary/25">
      {children}
    </span>
  );
}

function FrenchFlag() {
  return (
    <FlagFrame>
      <svg viewBox="0 0 24 16" aria-hidden="true" className="h-4 w-6">
        <rect width="8" height="16" fill="#0055A4" />
        <rect x="8" width="8" height="16" fill="#FFFFFF" />
        <rect x="16" width="8" height="16" fill="#EF4135" />
      </svg>
    </FlagFrame>
  );
}

function EnglishFlag() {
  return (
    <FlagFrame>
      <svg viewBox="0 0 60 40" aria-hidden="true" className="h-4 w-6">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0 0 L60 40 M60 0 L0 40" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="6" />
        <path d="M30 0 V40 M0 20 H60" stroke="#FFFFFF" strokeWidth="16" />
        <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth="10" />
      </svg>
    </FlagFrame>
  );
}
