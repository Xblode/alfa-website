"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useDictionary } from "@/components/content-provider";
import { localeFromPath } from "@/lib/locale";

export function HomeLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname() || "/";
  const { ui } = useDictionary();
  const home = localeFromPath(pathname) === "en" ? "/en" : "/";
  const label = ui.header.homeLink;

  return (
    <Link
      href={home}
      aria-label={label}
      data-name="Logo Alfa"
      className={className}
      onClick={() => {
        if (pathname !== home) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
    >
      {children}
    </Link>
  );
}
