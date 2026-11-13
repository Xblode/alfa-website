"use client";

import { useDictionary } from "@/components/content-provider";
import { ChevronRight } from "@/components/organisms/chevron-right";
import { googleMapsHref } from "@/lib/google-maps";
import { openNewsPrompt } from "@/components/organisms/news-prompt";
import { OpenContactButton } from "@/components/organisms/open-contact-button";
import { OpenCookieSettings } from "@/components/organisms/open-cookie-settings";
import { SiteFooterIcon } from "@/components/organisms/site-footer-icons";
import {
  FooterColumn,
  FooterLinkContent,
  FooterLinkItem,
  footerFocusRing,
  footerLinkClass,
  footerOutlineButtonClass,
  footerPrimaryButtonClass,
} from "@/components/organisms/site-footer-links";
import { SiteFooterLogo } from "@/components/organisms/site-footer-logo";
import { HomeLink } from "@/components/ui/home-link";

export function SiteFooter() {
  const { brand, topBar, seat, services, social, legal, ui } = useDictionary();
  const socialItems = [
    { label: ui.footer.facebookLabel, href: social.facebook, icon: "facebook" as const },
    { label: ui.footer.instagramLabel, href: social.instagram, icon: "instagram" as const },
  ];

  return (
    <footer
      id="site-footer"
      data-section="Pied de page"
      className="relative overflow-hidden border-t border-white/10 bg-secondary text-surface"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-1/4 h-48 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div data-component="grid" className="grid gap-10 lg:grid-cols-6 lg:gap-4">
          <div className="flex flex-col items-start lg:col-span-2">
            <HomeLink className={`group inline-flex min-h-11 items-center ${footerFocusRing}`}>
              <SiteFooterLogo />
            </HomeLink>
            <p className="mt-3 max-w-xs text-[0.875rem] leading-5 text-white/70">{topBar.tagline}.</p>
            <div className="mt-8 flex w-fit flex-col gap-4">
              <OpenContactButton className={`w-full gap-2 text-center ${footerPrimaryButtonClass}`}>
                <SiteFooterIcon name="user" className="size-5" />
                <span>{ui.footer.contactAdvisor}</span>
              </OpenContactButton>
              <a
                href={googleMapsHref(seat.address)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full gap-2 text-center ${footerOutlineButtonClass}`}
              >
                <span>{ui.footer.getDirections}</span>
                <span aria-hidden="true" className="text-white"><ChevronRight /></span>
                <span className="sr-only"> {ui.common.opensInNewTab}</span>
              </a>
            </div>
            <nav aria-label={ui.footer.socialNavigation} className="mt-3 flex items-center gap-2">
              {socialItems.map((item) => (
                <a
                  key={item.icon}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`inline-flex size-11 items-center justify-center rounded-full! bg-primary text-white transition-colors hover:brightness-90 ${footerFocusRing}`}
                >
                  <SiteFooterIcon name={item.icon} className="size-5" />
                  <span className="sr-only"> {ui.common.opensInNewTab}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:col-span-4">
            <FooterColumn id="footer-services" heading={ui.footer.servicesHeading}>
              {services.items.map((service) => (
                <FooterLinkItem key={service.id} href={service.href}>
                  {service.title}
                </FooterLinkItem>
              ))}
            </FooterColumn>
            <FooterColumn id="footer-information" heading={ui.footer.informationHeading}>
              <li>
                <button type="button" data-name="Actualités Alfa" onClick={openNewsPrompt} className={footerLinkClass}>
                  <FooterLinkContent>{ui.footer.news}</FooterLinkContent>
                </button>
              </li>
              {legal.map((item) => (
                <FooterLinkItem key={item.label} href={item.href}>
                  {item.label}
                </FooterLinkItem>
              ))}
              <li>
                <OpenCookieSettings className={`${footerLinkClass} cursor-pointer`}>
                  {(label) => <FooterLinkContent>{label}</FooterLinkContent>}
                </OpenCookieSettings>
              </li>
            </FooterColumn>
          </div>
        </div>

        <p className="mt-12 text-xs text-white/60">© 2026 {brand.name}. {ui.footer.rights}</p>
      </div>
    </footer>
  );
}
