"use client";

import Image from "next/image";
import { useRef, useState, type FocusEvent } from "react";
import { ServiceGlyph, type ServiceIconId } from "@/components/organisms/home-services-icons";
import { useTranslate } from "@/components/content-provider";
import type { MenuPickerItem } from "./menu-picker";

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const serviceIds: readonly ServiceIconId[] = [
  "domiciliation-commerciale",
  "permanence-telephonique",
  "location-de-bureaux",
  "salles-de-reunion",
];

function isServiceIconId(id: string): id is ServiceIconId {
  return serviceIds.some((value) => value === id);
}

export function ServiceMenu({
  items,
  labelledBy,
  onChoose,
}: {
  items: readonly MenuPickerItem[];
  labelledBy: string;
  onChoose: () => void;
}) {
  const t = useTranslate();
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = items.find((item) => item.id === activeId) ?? null;

  function clearIfOutside(event: FocusEvent) {
    const next = event.relatedTarget;
    if (next instanceof Node && panelRef.current?.contains(next)) return;
    setActiveId(null);
  }

  return (
    <div
      ref={panelRef}
      data-name="Menu services"
      className="grid gap-4 sm:grid-cols-[14rem_1fr]"
      onMouseLeave={() => setActiveId(null)}
    >
      <div role="group" aria-label={t("Services")}>
        <p className="px-1 pb-2 text-xs font-bold tracking-wide text-secondary/60 uppercase">
          {t("Services")}
        </p>
        <ul className="grid list-none gap-1 p-0">
          {items.map((item) => {
            const selected = item.id === activeId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onMouseEnter={() => setActiveId(item.id)}
                  onFocus={() => setActiveId(item.id)}
                  onBlur={clearIfOutside}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm font-bold ${focusRing} ${
                    selected ? "bg-secondary text-surface" : "hover:bg-primary/10"
                  }`}
                >
                  <span
                    className={`inline-flex size-8 shrink-0 items-center justify-center rounded-lg ${
                      selected ? "bg-primary text-secondary" : "bg-primary/15 text-secondary"
                    }`}
                  >
                    {isServiceIconId(item.id) ? <ServiceGlyph id={item.id} /> : null}
                  </span>
                  <span className="min-w-0 leading-tight">{item.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <p className="px-1 pb-2 text-xs font-bold tracking-wide text-secondary/60 uppercase">
          {active ? active.title : t("Tous les services")}
        </p>
        <ul aria-labelledby={labelledBy} className={`grid list-none gap-2 p-0 ${active ? "" : "sm:grid-cols-2"}`}>
          {(active ? [active] : items).map((item) => (
            <li key={item.id}>
              <ServicePreview item={item} featured={Boolean(active)} onChoose={onChoose} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ServicePreview({
  item,
  featured,
  onChoose,
}: {
  item: MenuPickerItem;
  featured: boolean;
  onChoose: () => void;
}) {
  return (
    <a
      href={item.href}
      onClick={onChoose}
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-secondary/10 hover:border-primary ${focusRing} ${
        featured ? "relative min-h-64" : ""
      }`}
    >
      <span className={featured ? "absolute inset-0" : "relative block h-24 overflow-hidden"}>
        <Image
          src={item.image}
          alt=""
          fill
          sizes={featured ? "32rem" : "16rem"}
          className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </span>
      <span
        className={
          featured
            ? "relative z-10 mt-auto flex w-full flex-col gap-1 bg-gradient-to-t from-secondary via-secondary/75 to-transparent p-3 text-surface"
            : "flex flex-col gap-0.5 p-2.5 text-secondary"
        }
      >
        <span className={`font-heading font-bold ${featured ? "text-lg" : "text-sm"}`}>{item.title}</span>
        {featured ? <span className="line-clamp-3 text-sm leading-snug text-white/85">{item.summary}</span> : null}
      </span>
    </a>
  );
}
