"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { SectionShapes } from "@/components/shared/section-shapes";
import { useHomeContent } from "@/components/content-provider";
const cycleMs = 2600;
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(reducedMotionQuery);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerReducedMotion() {
  return true;
}

function promiseText(text: string, emphasis: string) {
  const start = text.indexOf(emphasis);

  if (start === -1) {
    return text;
  }

  return (
    <>
      {text.slice(0, start)}
      <span className="font-semibold text-primary">{emphasis}</span>
      {text.slice(start + emphasis.length)}
    </>
  );
}

export function HomePromises() {
  const promises = useHomeContent().promises;
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const [cycleIndex, setCycleIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  const lockedIndex = hoverIndex ?? focusIndex;
  const activeIndex = lockedIndex ?? (reducedMotion ? null : cycleIndex);

  useEffect(() => {
    if (reducedMotion || lockedIndex !== null) return;

    const timer = window.setInterval(() => {
      setCycleIndex((index) => (index + 1) % promises.length);
    }, cycleMs);

    return () => window.clearInterval(timer);
  }, [reducedMotion, lockedIndex]);

  function lock(index: number, setter: (value: number | null) => void) {
    setter(index);
    setCycleIndex(index);
  }

  return (
    <section
      data-section="Promesses"
      className="relative isolate overflow-hidden bg-[#e6fffc] text-secondary"
    >
      <SectionShapes variant="promises" />
      <ul className="relative z-10 mx-auto grid max-w-[calc(72rem+200px)] grid-cols-1 gap-6 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
        {promises.map((item, index) => (
          <li
            key={item.icon}
            tabIndex={0}
            data-motion="promise"
            data-active={activeIndex === index ? "true" : undefined}
            onMouseEnter={() => lock(index, setHoverIndex)}
            onMouseLeave={() => setHoverIndex(null)}
            onFocus={() => lock(index, setFocusIndex)}
            onBlur={() => setFocusIndex(null)}
            className="group flex flex-col items-center gap-4 rounded-2xl border border-transparent px-4 py-6 text-center outline-none transition-[background-color,border-color] duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary data-active:border-primary/35 data-active:bg-primary/8"
          >
            {/* SVG déjà dans public/ : next/image les refuse sans changer la config. */}
            <img
              src={item.icon}
              alt=""
              className="h-20 w-auto transition-[translate,scale] duration-500 ease-out group-data-active:-translate-y-1 group-data-active:scale-105"
            />
            <p className="max-w-64 text-base leading-snug text-balance">
              {promiseText(item.text, item.emphasis)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
