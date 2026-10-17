"use client";

import type { ReactNode } from "react";
import { useHomeContent, useTranslate } from "@/components/content-provider";
import { HomeLink } from "@/components/ui/home-link";

const focusRing =
  "rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const iconBox =
  "inline-flex size-9 shrink-0 items-center justify-center text-primary";

type IconName = "map-pin" | "phone" | "clock" | "chevron-right" | "arrow-up-right" | "facebook" | "instagram";

const ICON_PATHS: Record<IconName, ReactNode> = {
  "map-pin": (
    <>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  "chevron-right": <path d="m9 18 6-6-6-6" />,
  "arrow-up-right": (
    <>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </>
  ),
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  instagram: (
    <>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </>
  ),
};

export function SiteFooter() {
  const t = useTranslate();
  const homeContent = useHomeContent();
  const { brand, topBar, seat, services, social, legal } = homeContent;
  const socialItems = [
    { label: "Facebook", href: social.facebook, icon: "facebook" as const, sub: null },
    { label: "Instagram", href: social.instagram, icon: "instagram" as const, sub: `@${social.instagramHandle}` },
  ];

  return (
    <footer
      id="site-footer"
      data-section="Pied de page"
      className="relative overflow-hidden border-t border-white/10 bg-secondary text-surface"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-1/4 h-48 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative px-4 pt-14 pb-10 sm:px-6 lg:pt-16">
        <div data-component="grid" className="grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-8">
          <div className="flex flex-col items-start gap-5 lg:col-span-5">
            <HomeLink className={`group inline-flex items-center ${focusRing}`}>
              <AlfaLogo />
            </HomeLink>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">{topBar.tagline}.</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className={iconBox}><LucideIcon name="map-pin" className="size-4" /></span>
                <div className="text-sm">
                  <h2 id="footer-seat" className="font-semibold capitalize text-white">{seat.role}</h2>
                  <address className="mt-0.5 leading-relaxed text-white/70 not-italic">{seat.address}</address>
                </div>
              </div>
              <a href={seat.phoneHref} className={`group flex items-center gap-3 ${focusRing}`}>
                <span className={iconBox}><LucideIcon name="phone" className="size-4" /></span>
                <span className="text-sm">
                  <span className="block text-xs text-white/60">{t("Téléphone")}</span>
                  <span className="font-semibold text-primary group-hover:underline">{seat.phoneDisplay}</span>
                </span>
              </a>
              <div className="flex items-start gap-3">
                <span className={iconBox}><LucideIcon name="clock" className="size-4" /></span>
                <p className="text-sm leading-relaxed text-white/75">{seat.hours}</p>
              </div>
            </div>
          </div>

          <nav aria-labelledby="footer-services" data-component="nav" className="lg:col-span-3">
            <h2 id="footer-services" className="text-sm font-semibold tracking-wide text-white">Services</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
              {services.items.map((service) => (
                <li key={service.id}>
                  <a href={service.href} className={`group inline-flex items-center gap-1.5 transition-colors hover:text-primary ${focusRing}`}>
                    <LucideIcon name="chevron-right" className="size-3.5 text-primary/70 transition-transform group-hover:translate-x-0.5" />
                    <span>{service.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start justify-start gap-3 lg:col-span-4">
            <nav aria-label="Réseaux sociaux" className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {socialItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex min-h-10 items-center gap-2 py-2 text-xs font-medium text-white transition-colors hover:text-primary ${focusRing}`}
                >
                  <LucideIcon name={item.icon} className="size-4 text-primary" />
                  <span>{item.label}</span>
                  {item.sub ? <span className="hidden text-white/60 sm:inline">· {item.sub}</span> : null}
                  <LucideIcon name="arrow-up-right" className="size-3.5 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
                </a>
              ))}
            </nav>
            <a
              href={seat.phoneHref}
              data-component="button-primary"
              className={`inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-secondary shadow-xs transition-colors hover:bg-primary-100 ${focusRing}`}
            >
              <LucideIcon name="phone" className="size-4" />
              <span>{t("Nous contacter")}</span>
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {brand.name}. {t("Tous droits réservés.")}</p>
          <nav aria-label="Informations légales" data-component="nav">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legal.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={`transition-colors hover:text-white ${focusRing}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function AlfaLogo() {
  return (
    <svg viewBox="0 0 335.77 136.28" aria-hidden="true" className="h-9 w-auto">
      <g className="fill-surface">
        <path d="M117.52,2.91h.29a28,28,0,0,1,28,28V135.59h-3.54a24.77,24.77,0,0,1-24.76-24.77Z" />
        <path d="M227.43,26.32H217c-11.5,0-16.1,11.32-16.1,19.81h25.47v23H200.89v65.46H172.58V46.13c0-28.66,14.87-42.81,43.17-42.81h11.68Z" />
        <rect x="307.82" y="77.36" width="27.95" height="54.55" />
        <path d="M296.28,109.11a16.8,16.8,0,0,1-6.77,1.37c-10.71,0-18-8.93-18-22.15,0-13.39,7.33-22.5,18-22.5h46.26V42.61H285.23c-25,0-43.23,18.22-43.23,45.9,0,27.5,18,46.08,42.69,46.08a28.53,28.53,0,0,0,11.59-2.26Z" />
        <circle className="fill-primary" cx="275.03" cy="16.55" r="16.55" />
        <path d="M65.19,124.67c-5.18,7.68-12.68,11.61-22.5,11.61C18,136.28,0,117.71,0,90.2,0,62.52,18.22,44.3,43.22,44.3H93.77v89.3H65.19Zm-17.68-12.5c10.89,0,17.68-8.93,17.68-22.33V67.52H47.51c-10.72,0-18,9.11-18,22.5C29.47,103.24,36.79,112.17,47.51,112.17Z" />
      </g>
    </svg>
  );
}

function LucideIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {ICON_PATHS[name]}
    </svg>
  );
}
