"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ContactPicker } from "@/components/ui/contact-picker";
import { openContactEventName } from "@/lib/open-contact-event";

type DockPlacement = {
  atBottom: boolean;
  clearance: number;
};

function readDockPlacement(): DockPlacement {
  const viewportHeight = window.innerHeight;
  const scrollHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  );
  const atPageEnd = window.scrollY + viewportHeight >= scrollHeight - 2;
  const footer = document.getElementById("site-footer");

  if (!footer) {
    return { atBottom: atPageEnd, clearance: 0 };
  }

  const rect = footer.getBoundingClientRect();
  const footerInView = rect.top < viewportHeight && rect.bottom > 0;
  const overlap = footerInView ? Math.max(0, viewportHeight - rect.top) : 0;

  return {
    atBottom: footerInView || atPageEnd,
    clearance: Math.min(Math.round(overlap), viewportHeight),
  };
}

export function ContactDock() {
  const openRef = useRef(false);
  const pinnedRef = useRef(false);
  const atBottomRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [pinnedOpen, setPinnedOpen] = useState(false);
  const [tease, setTease] = useState(false);
  const [placement, setPlacement] = useState<DockPlacement>({
    atBottom: false,
    clearance: 0,
  });
  const atBottom = placement.atBottom;
  atBottomRef.current = atBottom;

  function setDockOpen(next: boolean) {
    openRef.current = next;
    setOpen(next);
    if (!next) {
      pinnedRef.current = false;
      setPinnedOpen(false);
    }
  }

  useLayoutEffect(() => {
    let frame = 0;

    const apply = () => {
      const next = readDockPlacement();
      setPlacement((current) =>
        current.atBottom === next.atBottom && current.clearance === next.clearance
          ? current
          : next,
      );
      if (!next.atBottom || !openRef.current || pinnedRef.current) return;
      setDockOpen(false);
    };

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

  useEffect(() => {
    if (open || atBottom) setTease(false);
  }, [open, atBottom]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const holdMs = 3500;
    const firstMs = 2 * 60 * 1000;
    const repeatMs = 6 * 60 * 1000;
    let hideTimer = 0;
    let repeatTimer = 0;

    const play = () => {
      if (openRef.current || atBottomRef.current) return;
      setTease(true);
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setTease(false), holdMs);
    };

    const firstTimer = window.setTimeout(() => {
      play();
      repeatTimer = window.setInterval(play, repeatMs);
    }, firstMs);

    return () => {
      window.clearTimeout(firstTimer);
      window.clearInterval(repeatTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    function onOpenContact() {
      pinnedRef.current = true;
      setPinnedOpen(true);
      setDockOpen(true);
    }

    window.addEventListener(openContactEventName, onOpenContact);
    return () => window.removeEventListener(openContactEventName, onOpenContact);
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-40"
      style={{ bottom: placement.clearance }}
    >
      <div className="pointer-events-none absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
        <ContactPicker
          open={open && (!atBottom || pinnedOpen)}
          onOpenChange={setDockOpen}
          atBottom={atBottom}
          tease={tease}
          onScrollTop={scrollToTop}
        />
      </div>
    </div>
  );
}
