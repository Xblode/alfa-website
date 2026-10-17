"use client";

import { useEffect, useId, useRef } from "react";
import { useHomeContent } from "@/components/content-provider";
import {
  cookieCategories,
  cookieIntro,
  type CookieConsentState,
  type OptionalCategoryId,
} from "@/lib/cookie-consent";
import { CookieReport } from "@/components/organisms/cookie-report";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

type CookieDialogProps = {
  consent: CookieConsentState;
  details: boolean;
  onToggleDetails: () => void;
  onToggleCategory: (id: OptionalCategoryId) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSave: () => void;
  onClose: () => void;
};

export function CookieDialog({
  consent,
  details,
  onToggleDetails,
  onToggleCategory,
  onAcceptAll,
  onRejectAll,
  onSave,
  onClose,
}: CookieDialogProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  const homeContent = useHomeContent();
  const privacy = homeContent.legal.find((item) => {
    const label = item.label.toLowerCase();
    return label.includes("confidential") || label.includes("privacy");
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.focus({ preventScroll: true });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const index = items.indexOf(document.activeElement as HTMLElement);
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && index <= 0) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (index === -1 || index === items.length - 1)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-secondary/50 p-3 sm:p-4">
      <div
        ref={dialogRef}
        id="cookie-consent-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        data-component="dialog"
        className="max-h-[min(46rem,calc(100dvh-1.5rem))] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-2xl bg-surface px-4 py-3 text-center text-sm text-secondary shadow-[1px_2px_8px_rgba(40,40,40,0.28)] outline-none sm:px-5 sm:py-4"
      >
        <div className="grid grid-cols-[2rem_1fr_2rem] items-start gap-2">
          <span aria-hidden="true" />
          <h2 id={titleId} className="text-lg font-semibold tracking-tight">
            {cookieIntro.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            data-component="button"
            className="inline-flex size-8 items-center justify-center justify-self-end rounded-lg text-2xl leading-none text-secondary hover:bg-secondary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            ×
          </button>
        </div>
        <p className="mx-auto mt-2 max-w-xl text-[13px] leading-5">
          {cookieIntro.body}{" "}
          <a
            href={privacy?.href ?? "#"}
            className="font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {cookieIntro.privacyLabel}
          </a>
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {details ? (
            <ActionButton variant="primary" onClick={onSave}>
              Sauvegarder et fermer
            </ActionButton>
          ) : null}
          <ActionButton variant="outline" onClick={onRejectAll}>
            Refuser tout
          </ActionButton>
          {details ? null : (
            <ActionButton variant="primary" onClick={onAcceptAll}>
              Accepter et fermer
            </ActionButton>
          )}
        </div>
        <button
          type="button"
          onClick={onToggleDetails}
          aria-expanded={details}
          data-component="button"
          className="mt-2 inline-flex min-h-8 items-center gap-1.5 rounded-lg px-2 text-[11px] font-semibold uppercase tracking-wide text-secondary hover:bg-secondary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <GearIcon />
          {details ? "Masquer les détails" : "Afficher les détails"}
        </button>
        {details ? (
          <>
            <fieldset className="mx-auto mt-2 grid w-full grid-cols-2 gap-x-3 gap-y-1 border-0 p-0 text-left sm:grid-cols-3 lg:grid-cols-5">
              <legend className="sr-only">Catégories de cookies</legend>
              {cookieCategories.map((category) => {
                const checked = category.locked
                  ? true
                  : consent[category.id as OptionalCategoryId];
                return (
                  <label
                    key={category.id}
                    className="inline-flex min-h-8 items-center gap-1.5 text-[11px] font-semibold uppercase leading-tight"
                  >
                    <input
                      type="checkbox"
                      className="size-4 accent-primary"
                      checked={checked}
                      disabled={category.locked}
                      onChange={() => {
                        if (!category.locked) {
                          onToggleCategory(category.id as OptionalCategoryId);
                        }
                      }}
                    />
                    {category.label}
                  </label>
                );
              })}
            </fieldset>
            <CookieReport />
          </>
        ) : null}
      </div>
    </div>
  );
}

function ActionButton({
  variant,
  onClick,
  children,
}: {
  variant: "primary" | "outline";
  onClick: () => void;
  children: string;
}) {
  const styles =
    variant === "primary"
      ? "border border-primary bg-primary text-secondary hover:bg-primary-100"
      : "border border-secondary/25 bg-surface text-secondary hover:bg-secondary/5";
  return (
    <button
      type="button"
      data-component={variant === "primary" ? "button-primary" : "button-outline"}
      onClick={onClick}
      className={`inline-flex min-h-10 items-center justify-center rounded-lg px-4 text-xs font-bold uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${styles}`}
    >
      {children}
    </button>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5">
      <path
        fill="currentColor"
        d="M19.4 13.5a7.7 7.7 0 0 0 .1-1.5 7.7 7.7 0 0 0-.1-1.5l2-1.6-2-3.4-2.4.9a7.4 7.4 0 0 0-2.6-1.5L14 2h-4l-.4 2.9a7.4 7.4 0 0 0-2.6 1.5l-2.4-.9-2 3.4 2 1.6a7.7 7.7 0 0 0 0 3l-2 1.6 2 3.4 2.4-.9a7.4 7.4 0 0 0 2.6 1.5L10 22h4l.4-2.9a7.4 7.4 0 0 0 2.6-1.5l2.4.9 2-3.4-2-1.6ZM12 15.2A3.2 3.2 0 1 1 15.2 12 3.2 3.2 0 0 1 12 15.2Z"
      />
    </svg>
  );
}
