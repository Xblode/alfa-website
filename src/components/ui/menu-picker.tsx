"use client";

import { useEffect, useId, useRef } from "react";
import { ArticleMenu } from "./menu-picker-articles";
import { ServiceMenu } from "./menu-picker-services";

export type MenuPickerItem = {
  id: string;
  title: string;
  summary: string;
  href: string;
  image: string;
  alt: string;
};

type MenuPickerBase = {
  label: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate?: () => void;
};

export type MenuPickerProps = MenuPickerBase &
  ({ layout: "services"; items: readonly MenuPickerItem[] } | { layout: "articles" });

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const panelClass =
  "z-40 mx-auto mt-1 w-[min(48rem,calc(100vw-2rem))] rounded-2xl border border-secondary/10 bg-surface p-4 shadow-lg xl:absolute xl:top-full xl:left-1/2 xl:z-40 xl:mt-3 xl:-translate-x-1/2";

export function MenuPicker(props: MenuPickerProps) {
  const { label, open, onOpenChange, onNavigate } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const onOpenChangeRef = useRef(onOpenChange);
  const baseId = useId();
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      onOpenChangeRef.current(false);
      buttonRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || rootRef.current?.contains(target)) return;
      onOpenChangeRef.current(false);
    };

    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const choose = () => {
    onOpenChange(false);
    onNavigate?.();
  };

  return (
    <div ref={rootRef} data-menu-picker={props.layout} className="relative w-full xl:static xl:w-auto">
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        className={`inline-flex min-h-11 w-full items-center justify-between gap-2 px-1 py-2 text-left text-sm font-bold whitespace-nowrap hover:text-primary xl:w-auto xl:justify-start ${focusRing}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => onOpenChange(!open)}
      >
        <span>{label}</span>
        <Chevron open={open} />
      </button>
      <div id={panelId} hidden={!open} className={panelClass}>
        {open && props.layout === "services" ? (
          <ServiceMenu items={props.items} labelledBy={buttonId} onChoose={choose} />
        ) : null}
        {open && props.layout === "articles" ? (
          <ArticleMenu labelledBy={buttonId} onChoose={choose} />
        ) : null}
      </div>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={`size-4 shrink-0 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 7.5 10 12.5 15 7.5" />
    </svg>
  );
}
