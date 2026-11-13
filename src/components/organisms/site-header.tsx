"use client";

import Image from "next/image";
import { useState } from "react";
import { HomeLink } from "@/components/ui/home-link";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { MenuPicker } from "@/components/ui/menu-picker";
import { OpenContactButton } from "@/components/organisms/open-contact-button";
import { SiteTopBar } from "@/components/organisms/site-top-bar";
import { useDictionary } from "@/components/content-provider";

const bookButtonClass =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-2 font-heading text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-secondary motion-reduce:transition-none";

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function SiteHeader() {
  const { brand, ui } = useDictionary();
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
            <Image src={brand.logo} alt="" width={112} height={45} priority unoptimized />
          </HomeLink>
          <nav
            aria-label={ui.header.mainNavigation}
            data-component="nav"
            className="absolute inset-x-0 top-0 hidden h-full xl:flex xl:items-center xl:justify-center"
          >
            <NavLinks className="flex items-center gap-4" />
          </nav>
          <div className="relative z-10 ml-auto flex items-center">
            <OpenContactButton className={`max-sm:hidden ${bookButtonClass}`}>
              {ui.header.bookMeeting}
            </OpenContactButton>
            <LanguageSwitch />
            <MenuButton open={menuOpen} onToggle={() => setMenuOpen((value) => !value)} />
          </div>
        </div>
        <nav
          id="menu-mobile"
          aria-label={ui.header.mainNavigation}
          hidden={!menuOpen}
          className="border-t border-secondary/10 px-4 py-2 xl:hidden max-lg:max-h-[calc(100dvh-16rem)] max-lg:overflow-x-hidden max-lg:overflow-y-auto max-lg:overscroll-contain"
        >
          <NavLinks key={menuOpen ? "mobile-open" : "mobile-closed"} className="flex flex-col" onNavigate={closeMenu} />
          <OpenContactButton className={`my-2 w-full sm:hidden ${bookButtonClass}`}>
            {ui.header.bookMeeting}
          </OpenContactButton>
        </nav>
      </div>
    </header>
  );
}

function NavLinks({ className, onNavigate }: { className: string; onNavigate?: () => void }) {
  const { nav } = useDictionary();
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  return (
    <ul className={className}>
      {nav.map((item) => (
        <li key={item.label}>
          {"items" in item ? (
            <MenuPicker
              {...(item.id === "articles"
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
              className={`inline-flex min-h-11 items-center px-1 py-2 text-sm font-semibold whitespace-nowrap hover:text-primary ${focusRing}`}
            >
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

function MenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const { ui } = useDictionary();
  const glyph = open ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16";

  return (
    <button
      type="button"
      className={`inline-flex size-11 items-center justify-center xl:hidden ${focusRing}`}
      aria-expanded={open}
      aria-controls="menu-mobile"
      onClick={onToggle}
    >
      <span className="sr-only">{open ? ui.header.closeMenu : ui.header.openMenu}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <path d={glyph} />
      </svg>
    </button>
  );
}
