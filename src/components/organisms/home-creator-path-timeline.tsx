"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useDictionary } from "@/components/content-provider";
import { CreatorPathCta } from "@/components/organisms/home-creator-path-cta";
import { StepLinks } from "@/components/organisms/home-creator-path-links";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function CreatorPathTimeline() {
  const { creatorPath } = useDictionary();
  const { steps } = creatorPath;
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = steps[activeIndex];

  function select(index: number) {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = steps.length - 1;
    const next: Record<string, number> = {
      ArrowDown: activeIndex >= last ? 0 : activeIndex + 1,
      ArrowRight: activeIndex >= last ? 0 : activeIndex + 1,
      ArrowUp: activeIndex <= 0 ? last : activeIndex - 1,
      ArrowLeft: activeIndex <= 0 ? last : activeIndex - 1,
      Home: 0,
      End: last,
    };
    const target = next[event.key];
    if (target == null) return;
    event.preventDefault();
    select(target);
  }

  return (
    <div className="mt-10 hidden gap-8 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="rounded-2xl bg-hero p-6">
        <div
          role="tablist"
          aria-label={creatorPath.title}
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
        >
          {steps.map((step, index) => {
            const reached = index <= activeIndex;
            return (
              <div key={step.id} className="relative">
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className={`absolute top-11 left-[calc(1rem-1px)] h-6 w-0.5 ${index < activeIndex ? "bg-primary" : "bg-secondary/15"}`}
                  />
                ) : null}
                <button
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`creator-tab-${step.id}`}
                  aria-selected={index === activeIndex}
                  aria-controls="creator-panel"
                  tabIndex={index === activeIndex ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  className={`flex min-h-14 w-full items-center gap-4 rounded-lg text-left ${focusRing}`}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${reached ? "border-primary bg-primary text-secondary" : "border-secondary/20 bg-white text-secondary"}`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`font-heading text-base leading-snug ${index === activeIndex ? "font-semibold text-secondary" : "text-secondary/70"}`}
                  >
                    {step.title}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
        <div className="mt-6">
          <CreatorPathCta />
        </div>
      </div>

      <div
        role="tabpanel"
        id="creator-panel"
        aria-labelledby={`creator-tab-${active.id}`}
        tabIndex={0}
        className={`rounded-2xl border-2 border-primary bg-white p-8 ${focusRing}`}
      >
        <p className="text-sm font-semibold tracking-wider text-primary uppercase">
          {creatorPath.stepLabel} {activeIndex + 1} / {steps.length}
        </p>
        <h3 className="mt-2 font-heading text-[1.625rem] font-semibold text-secondary">
          {active.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-secondary/80">
          {active.text}
        </p>
        <StepLinks links={active.links} />
      </div>
    </div>
  );
}
