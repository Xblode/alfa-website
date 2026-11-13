import type { ReactNode } from "react";
import { ChevronRight } from "@/components/organisms/chevron-right";

export const footerFocusRing =
  "rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

// Même style que le bouton principal du bandeau contact (home-contact-banner.tsx), hors largeur.
export const footerPrimaryButtonClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:brightness-90 focus-visible:outline-primary-100!";

// Variante contour du bouton contact : mêmes dimensions (py-2.5 + bordure 2 px = 48 px, comme py-3 sans bordure).
export const footerOutlineButtonClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-transparent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-100";

export const footerLinkClass = `group inline-flex min-h-11 items-center gap-1.5 text-[0.875rem] leading-5 font-medium text-white/80 transition-colors hover:text-white hover:underline ${footerFocusRing}`;

export function FooterColumn({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <nav aria-labelledby={id} data-component="nav">
      <h2 id={id} className="text-sm font-medium tracking-[1.4px] text-white uppercase">
        {heading}
      </h2>
      <ul className="mt-3 flex flex-col">{children}</ul>
    </nav>
  );
}

export function FooterLinkContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span aria-hidden="true" className="text-primary">
        <ChevronRight />
      </span>
      <span>{children}</span>
    </>
  );
}

export function FooterLinkItem({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <a href={href} className={footerLinkClass}>
        <FooterLinkContent>{children}</FooterLinkContent>
      </a>
    </li>
  );
}
