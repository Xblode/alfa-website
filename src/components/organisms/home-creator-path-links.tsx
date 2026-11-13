"use client";

import { useLang } from "@/components/content-provider";
import { localizePath } from "@/lib/locale";

export function StepLinks({ links }: { links: ReadonlyArray<{ label: string; href: string }> }) {
  const lang = useLang();
  if (links.length === 0) return null;

  return (
    <ul className="mt-5 flex flex-wrap gap-3">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={localizePath(link.href, lang)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary px-4 py-2 font-heading text-sm font-semibold text-secondary transition-colors hover:bg-primary-100/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
          >
            {link.label}
            <span aria-hidden="true">→</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
