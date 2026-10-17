"use client";

import Image from "next/image";
import { useState } from "react";
import { HomeLink } from "@/components/ui/home-link";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { MenuPicker } from "@/components/ui/menu-picker";
import { SiteTopBar } from "@/components/organisms/site-top-bar";
import { useHomeContent } from "@/components/content-provider";

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function SiteHeader() {
  const homeContent = useHomeContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="relative z-30 bg-surface text-secondary"
      onKeyDown={(event) => {
        if (event.key === "Escape") closeMenu();
      }}
    >
      <SiteTopBar />
      <div className="border-b border-secondary/10">
        <div className="relative mx-auto flex max-w-7xl items-center px-4 py-3">
          <HomeLink className={`relative z-10 shrink-0 ${focusRing}`}>
            <Image src={homeContent.brand.logo} alt="" width={112} height={45} priority unoptimized />
          </HomeLink>
          <nav
            aria-label="Navigation principale"
            data-component="nav"
            className="absolute inset-x-0 top-0 hidden h-full xl:flex xl:items-center xl:justify-center"
          >
            <NavLinks className="flex items-center gap-4" />
          </nav>
          <div className="relative z-10 ml-auto flex items-center">
            <SocialLinks />
            <LanguageSwitch />
            <MenuButton open={menuOpen} onToggle={() => setMenuOpen((value) => !value)} />
          </div>
        </div>
        <nav
          id="menu-mobile"
          aria-label="Navigation principale"
          hidden={!menuOpen}
          className="border-t border-secondary/10 px-4 py-2 xl:hidden max-lg:max-h-[calc(100dvh-16rem)] max-lg:overflow-x-hidden max-lg:overflow-y-auto max-lg:overscroll-contain"
        >
          <NavLinks key={menuOpen ? "mobile-open" : "mobile-closed"} className="flex flex-col" onNavigate={closeMenu} />
        </nav>
      </div>
    </header>
  );
}

function NavLinks({ className, onNavigate }: { className: string; onNavigate?: () => void }) {
  const homeContent = useHomeContent();
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  return (
    <ul className={className}>
      {homeContent.nav.map((item) => (
        <li key={item.label}>
          {"items" in item ? (
            <MenuPicker
              {...(item.label === "Articles"
                ? { layout: "articles" as const }
                : { layout: "services" as const, items: item.items })}
              label={item.label}
              open={openLabel === item.label}
              onOpenChange={(next) => setOpenLabel(next ? item.label : null)}
              onNavigate={onNavigate}
            />
          ) : (
            <a
              href={item.href}
              onClick={onNavigate}
              className={`inline-flex min-h-11 items-center px-1 py-2 text-sm font-bold whitespace-nowrap hover:text-primary ${focusRing}`}
            >
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

function SocialLinks() {
  const homeContent = useHomeContent();
  const links = [
    ["Facebook", homeContent.social.facebook, "facebook"],
    ["Instagram", homeContent.social.instagram, "instagram"],
  ] as const;

  return (
    <ul className="flex max-sm:hidden">
      {links.map(([label, href, icon]) => (
        <li key={label}>
          <a
            href={href}
            aria-label={`${label}, nouvel onglet`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex size-11 items-center justify-center hover:text-primary ${focusRing}`}
          >
            <BrandIcon name={icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function MenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const glyph = open ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16";

  return (
    <button
      type="button"
      className={`inline-flex size-11 items-center justify-center xl:hidden ${focusRing}`}
      aria-expanded={open}
      aria-controls="menu-mobile"
      onClick={onToggle}
    >
      <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <path d={glyph} />
      </svg>
    </button>
  );
}

function BrandIcon({ name }: { name: "facebook" | "instagram" }) {
  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="currentColor">
        <path d="M14.2 8.4V7c0-.8.5-1.3 1.3-1.3H17V3.4h-2.1C12.3 3.4 11 4.8 11 7.1v1.3H9v2.6h2V20.6h3.1v-9.6h2.3l.4-2.6h-2.6z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.15" cy="6.85" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  );
}
