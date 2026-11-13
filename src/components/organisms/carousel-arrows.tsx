"use client";

import { useDictionary } from "@/components/content-provider";

type CarouselArrowsProps = {
  /** Identifiant du conteneur défilant commandé par les flèches. */
  controls: string;
  onScroll: (direction: -1 | 1) => void;
  className?: string;
  /** "light" : ronds blancs (fond sombre) ; "dark" : ronds sombres (fond clair). */
  tone?: "light" | "dark";
  previousLabel?: string;
  nextLabel?: string;
};

const ringBase =
  "inline-flex size-12 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const ringTones = {
  light: "border-white/60 text-white hover:bg-white hover:text-secondary",
  dark: "border-secondary/60 text-secondary hover:bg-secondary hover:text-white",
} as const;

export function CarouselArrows({
  controls,
  onScroll,
  className = "",
  tone = "light",
  previousLabel,
  nextLabel,
}: CarouselArrowsProps) {
  const { ui } = useDictionary();

  return (
    <div className={`gap-3 max-md:!hidden ${className}`}>
      {([-1, 1] as const).map((direction) => (
        <button
          key={direction}
          type="button"
          aria-controls={controls}
          aria-label={
            direction < 0
              ? (previousLabel ?? ui.personas.previous)
              : (nextLabel ?? ui.personas.next)
          }
          onClick={() => onScroll(direction)}
          className={`${ringBase} ${ringTones[tone]}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
            <path
              d={direction < 0 ? "M14.5 6 9 12l5.5 6" : "M9.5 6 15 12l-5.5 6"}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
