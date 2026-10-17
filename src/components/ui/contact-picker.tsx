"use client";

import { useEffect, useId, useLayoutEffect, useRef } from "react";
import type { FormEvent } from "react";
import { useHomeContent } from "@/components/content-provider";
import { googleMapsHref } from "@/lib/google-maps";

const fieldClassName =
  "min-h-11 w-full rounded-lg border border-secondary/20 bg-surface px-3 py-2 text-base text-secondary outline-none transition-colors focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary motion-reduce:transition-none";

const interestOptions = [
  { value: "domiciliation-commerciale", label: "Domiciliation commerciale" },
  { value: "permanence-telephonique", label: "Permanence téléphonique" },
  { value: "bureaux-individuels", label: "Bureaux individuels" },
  { value: "bureaux-communs-reunion", label: "Bureaux communs & réunion" },
] as const;

const panelClassName =
  "pointer-events-auto absolute right-0 bottom-full z-40 mb-3 w-[min(56rem,100%)] max-h-[min(40rem,calc(100dvh-7rem))] overflow-y-auto overscroll-contain rounded-2xl border border-secondary/10 bg-surface p-4 text-secondary shadow-lg sm:p-5";

type ContactPickerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  atBottom: boolean;
  tease: boolean;
  onScrollTop: () => void;
};

export function ContactPicker({
  open,
  onOpenChange,
  atBottom,
  tease,
  onScrollTop,
}: ContactPickerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const onOpenChangeRef = useRef(onOpenChange);
  const wasOpenRef = useRef(open);
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const titleId = `${baseId}-title`;
  const { seat } = useHomeContent();

  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);

  useLayoutEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = open;
    if (!wasOpen || open) return;
    if (panelRef.current?.contains(document.activeElement)) buttonRef.current?.focus();
  }, [open]);

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

  function onButtonClick() {
    if (atBottom) {
      onScrollTop();
      return;
    }
    onOpenChange(!open);
  }

  return (
    <div ref={rootRef} data-menu-picker="contact" className="pointer-events-none relative flex w-full flex-col items-end">
      <button
        ref={buttonRef}
        type="button"
        className={`pointer-events-auto inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-primary text-secondary shadow-lg transition-[padding,transform] duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary motion-reduce:transition-none ${
          tease && !atBottom ? "gap-2 px-5" : "w-14"
        }`}
        aria-label={atBottom ? "Haut de page" : "Contacter Alfa"}
        {...(atBottom
          ? {}
          : {
              "aria-expanded": open,
              "aria-controls": panelId,
            })}
        onClick={onButtonClick}
      >
        {atBottom ? (
          <ArrowUpIcon />
        ) : (
          <>
            <span className={tease ? "animate-contact-wiggle" : undefined}>
              <ContactIcon />
            </span>
            <span
              aria-hidden="true"
              className={`overflow-hidden text-sm font-bold whitespace-nowrap transition-[max-width,opacity] duration-300 motion-reduce:transition-none ${
                tease ? "max-w-24 opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              Contact
            </span>
          </>
        )}
      </button>
      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        data-name="Contacter Alfa"
        className={panelClassName}
      >
        {open ? (
          <ContactPanel titleId={titleId} baseId={baseId} onClose={() => onOpenChange(false)} />
        ) : null}
      </div>
    </div>
  );
}

function ContactPanel({
  titleId,
  baseId,
  onClose,
}: {
  titleId: string;
  baseId: string;
  onClose: () => void;
}) {
  const { seat } = useHomeContent();
  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const phoneId = `${baseId}-phone`;
  const messageId = `${baseId}-message`;

  function blockSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id={titleId} className="font-heading text-xl font-semibold tracking-tight">
            Contacter Alfa
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-secondary/80">
            <a
              href={googleMapsHref(seat.address)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1.5 underline decoration-primary decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              <LocationIcon />
              <span>{seat.address}</span>
              <span className="sr-only"> (ouvre Google Maps dans un nouvel onglet)</span>
            </a>
            <a
              href={seat.phoneHref}
              className="inline-flex items-center gap-2 font-bold text-secondary underline decoration-primary decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              <PhoneIcon />
              <span>{seat.phoneDisplay}</span>
            </a>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-secondary hover:bg-secondary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          <CloseIcon />
          <span>Fermer</span>
        </button>
      </div>
      {/* Aucune soumission, aucun stockage, aucun message de succès. */}
      <form className="grid items-start gap-5 md:grid-cols-2 md:gap-8" onSubmit={blockSubmit} noValidate>
        <div className="grid gap-3">
          <label className="grid gap-1 text-sm font-medium" htmlFor={nameId}>
            <span>Nom</span>
            <input id={nameId} name="name" type="text" autoComplete="name" className={fieldClassName} />
          </label>
          <label className="grid gap-1 text-sm font-medium" htmlFor={emailId}>
            <span>E-mail</span>
            <input id={emailId} name="email" type="email" autoComplete="email" inputMode="email" className={fieldClassName} />
          </label>
          <label className="grid gap-1 text-sm font-medium" htmlFor={phoneId}>
            <span>Téléphone</span>
            <input id={phoneId} name="phone" type="tel" autoComplete="tel" inputMode="tel" className={fieldClassName} />
          </label>
          <label className="grid gap-1 text-sm font-medium" htmlFor={messageId}>
            <span>Message</span>
            <textarea id={messageId} name="message" rows={4} className={`${fieldClassName} min-h-24 resize-y`} />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <fieldset data-name="Intérêts" className="grid gap-2">
            <legend className="text-sm font-semibold">Je suis intéressé par :</legend>
            <div className="grid gap-2">
              {interestOptions.map((option) => {
                const optionId = `${baseId}-${option.value}`;
                return (
                  <label
                    key={option.value}
                    htmlFor={optionId}
                    className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-secondary/15 px-3 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                  >
                    <input
                      id={optionId}
                      name="interests"
                      type="checkbox"
                      value={option.value}
                      className="size-5 shrink-0 accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                    />
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <button
            type="button"
            onClick={(event) => event.preventDefault()}
            className="group inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-base font-semibold text-secondary hover:bg-primary-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            <span>Envoyer</span>
            <SendArrowIcon />
          </button>
        </div>
      </form>
    </div>
  );
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
      <path
        fill="currentColor"
        d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H10l-4.2 3.2A.8.8 0 0 1 4.5 18.5V6.5Z"
      />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
      <path
        d="M12 19V5M6 11l6-6 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 shrink-0 text-primary">
      <path
        d="M21 16.4v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.6 5.2 2 2 0 0 1 4.6 3h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.6 11a16 16 0 0 0 6.4 6.4l1.4-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 21 16.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-primary">
      <path
        d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 1 1 13 0c0 5.2-6.5 11-6.5 11Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" fill="currentColor" />
    </svg>
  );
}

function SendArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">
      <path
        d="M4 10h12m-4.5-4.5L16 10l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 shrink-0">
      <path d="M5 5l10 10M15 5 5 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
