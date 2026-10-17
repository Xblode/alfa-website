"use client";

import Image from "next/image";
import { useTranslate } from "@/components/content-provider";
import { homeContent } from "@/lib/home-content";

type Space = (typeof homeContent.spaces.items)[number];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function SpaceCard({ space }: { space: Space }) {
  const t = useTranslate();
  const isAvailable = space.availability.kind === "available";
  const availabilityLabel = isAvailable ? t("Disponible") : space.availability.label;

  return (
    <a
      href={space.href}
      data-component="card"
      className={`group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-secondary text-surface shadow-lg shadow-secondary/20 transition-[translate,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
    >
      {space.image ? (
        <Image
          src={space.image}
          alt=""
          fill
          sizes="(min-width: 768px) 25vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-secondary/30"
      />

      <div className="relative flex h-full flex-col justify-between p-4">
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs leading-tight font-semibold ${
            isAvailable ? "bg-primary text-secondary" : "bg-surface text-secondary"
          }`}
        >
          <span
            aria-hidden="true"
            className={`size-1.5 shrink-0 rounded-full ${isAvailable ? "bg-secondary" : "bg-primary"}`}
          />
          {availabilityLabel}
        </span>

        <div className="flex items-end justify-between gap-3 text-left">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wide text-primary-100 uppercase">
              {space.city} · {space.floor}
            </p>
            <h3 className="mt-1 text-xl leading-snug font-semibold text-surface">
              {space.cardTitle}
            </h3>
          </div>
          <span
            aria-hidden="true"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-secondary transition-colors group-hover:bg-primary"
          >
            →
          </span>
        </div>
      </div>
    </a>
  );
}
