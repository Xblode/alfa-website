"use client";

import { useLayoutEffect, useState, type CSSProperties } from "react";

type CookieBadgeProps = {
  onOpen: () => void;
};

function readFooterClearance() {
  const footer = document.getElementById("site-footer");
  if (!footer) return 0;
  const rect = footer.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const footerInView = rect.top < viewportHeight && rect.bottom > 0;
  if (!footerInView) return 0;
  return Math.min(Math.round(Math.max(0, viewportHeight - rect.top)), viewportHeight);
}

export function CookieBadge({ onOpen }: CookieBadgeProps) {
  const [clearance, setClearance] = useState(0);

  useLayoutEffect(() => {
    let frame = 0;
    const apply = () => setClearance(readFooterClearance());
    const requestApply = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", requestApply, { passive: true });
    window.addEventListener("resize", requestApply);
    const observer = new ResizeObserver(requestApply);
    observer.observe(document.documentElement);
    const footer = document.getElementById("site-footer");
    if (footer) observer.observe(footer);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestApply);
      window.removeEventListener("resize", requestApply);
      observer.disconnect();
    };
  }, []);

  return (
    <button
      id="cookie-badge"
      type="button"
      data-component="button"
      onClick={onOpen}
      style={{ "--cookie-lift": `${clearance}px` } as CSSProperties}
      className="group fixed bottom-[calc(1rem+var(--cookie-lift))] left-4 z-[110] flex max-w-[calc(100vw-1.25rem)] items-center rounded-full bg-surface p-[3px] text-secondary shadow-[1px_2px_8px_rgba(40,40,40,0.2)] transition-shadow duration-500 hover:shadow-[1px_2px_10px_rgba(40,40,40,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none sm:bottom-[calc(1.5rem+var(--cookie-lift))] sm:left-6"
      aria-haspopup="dialog"
      aria-controls="cookie-consent-dialog"
    >
      <CookieMark />
      <span className="max-w-0 overflow-hidden whitespace-nowrap pr-0 text-base font-semibold uppercase leading-10 transition-[max-width,padding] duration-500 group-hover:max-w-[300px] group-hover:px-3 group-focus-visible:max-w-[300px] group-focus-visible:px-3 motion-reduce:transition-none max-[440px]:sr-only">
        Paramétrage des cookies
      </span>
    </button>
  );
}

function CookieMark() {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className="size-10 shrink-0 text-primary max-[440px]:size-[30px]"
    >
      <circle cx="20" cy="20" r="15.2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="13.5" cy="14" r="3.4" fill="currentColor" />
      <circle cx="25.5" cy="12.2" r="2.1" fill="currentColor" />
      <circle cx="28" cy="22.5" r="3" fill="currentColor" />
      <circle cx="18.5" cy="27.5" r="2.6" fill="currentColor" />
      <circle cx="12.2" cy="22.8" r="1.7" fill="currentColor" />
    </svg>
  );
}
