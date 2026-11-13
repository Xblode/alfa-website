"use client";

import Image from "next/image";
import { useId } from "react";
import { useDictionary, useLang } from "@/components/content-provider";
import type { Dictionary } from "@/content";
import { localizePath } from "@/lib/locale";

type Space = Dictionary["spaces"]["items"][number];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function SpaceCard({ space }: { space: Space }) {
  const { ui, spaces } = useDictionary();
  const lang = useLang();
  const titleId = useId();
  const badgeId = useId();
  const isAvailable = space.availability.kind === "available";
  const availabilityLabel = isAvailable ? ui.common.available : space.availability.label;
  const price = space.priceFrom;

  return (
    <a
      href={localizePath(spaces.cardHref, lang)}
      data-component="card"
      aria-labelledby={`${titleId} ${badgeId}`}
      className={`group block h-full overflow-hidden rounded-2xl bg-white text-left transition-shadow duration-200 hover:shadow-xl hover:shadow-secondary/20 motion-reduce:transition-none ${focusRing}`}
    >
      <div className="relative h-32 w-full bg-secondary/10 sm:h-36 xl:h-40">
        {space.image ? (
          <Image
            src={space.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-secondary/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none"
        />
        <span
          id={badgeId}
          className={`absolute top-3 left-3 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs leading-tight font-semibold ${
            isAvailable ? "bg-primary text-secondary" : "bg-white text-secondary"
          }`}
        >
          <span
            aria-hidden="true"
            className={`size-1.5 shrink-0 rounded-full ${isAvailable ? "bg-secondary" : "bg-primary"}`}
          />
          {availabilityLabel}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold tracking-wide text-secondary/70 uppercase">
          {spaces.location} · {space.floor}
        </p>
        <h3 id={titleId} className="mt-1 text-lg leading-snug font-medium text-secondary">
          {space.cardTitle}
        </h3>
        <p className="mt-2 text-sm text-secondary/80">
          {price === null ? (
            spaces.priceOnRequest
          ) : (
            <>
              {spaces.priceFromLabel}{" "}
              <strong className="font-semibold text-secondary">
                {price} {spaces.priceUnit}
              </strong>
            </>
          )}
        </p>
        <address className="mt-3 text-xs leading-relaxed text-secondary/70 not-italic">
          {spaces.address.street}
          <br />
          {spaces.address.postalCity}
        </address>
      </div>
    </a>
  );
}
