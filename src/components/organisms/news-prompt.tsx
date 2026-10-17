"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { useHomeContent } from "@/components/content-provider";

const VISIT_COUNT_KEY = "alfa-visit-count";

const visitSession = {
  counted: false,
  visible: false,
  dismissed: false,
};

function readVisitCount() {
  const raw = window.localStorage.getItem(VISIT_COUNT_KEY);
  if (raw === null) return 0;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 0) return 0;
  return parsed;
}

/** Incrémente une fois par chargement. Le popup n'existe que si le total devient 2. */
function openOnSecondVisit() {
  if (visitSession.dismissed) return false;
  if (visitSession.counted) return visitSession.visible;

  visitSession.counted = true;
  visitSession.visible = false;

  try {
    const next = readVisitCount() + 1;
    window.localStorage.setItem(VISIT_COUNT_KEY, String(next));
    visitSession.visible = next === 2;
  } catch {
    visitSession.visible = false;
  }

  return visitSession.visible;
}

function dismissNewsPrompt() {
  visitSession.dismissed = true;
}

const newsPromptListeners = new Set<() => void>();
let newsPromptOpen = false;

function subscribeNewsPrompt(listener: () => void) {
  newsPromptListeners.add(listener);
  return () => {
    newsPromptListeners.delete(listener);
  };
}

function getNewsPromptSnapshot() {
  return newsPromptOpen;
}

function getNewsPromptServerSnapshot() {
  return false;
}

function publishNewsPrompt(open: boolean) {
  if (newsPromptOpen === open) return;
  newsPromptOpen = open;
  newsPromptListeners.forEach((listener) => listener());
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function NewsPrompt() {
  const open = useSyncExternalStore(
    subscribeNewsPrompt,
    getNewsPromptSnapshot,
    getNewsPromptServerSnapshot,
  );
  const titleId = useId();
  const emailId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const homeContent = useHomeContent();
  const { facebook, instagram } = homeContent.social;

  useEffect(() => {
    if (openOnSecondVisit()) publishNewsPrompt(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const panel = dialog;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previous = document.activeElement;
    dialog.focus();

    function focusable() {
      return Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        dismissNewsPrompt();
        publishNewsPrompt(false);
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusable();
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
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [open]);

  if (!open) return null;

  function close() {
    dismissNewsPrompt();
    publishNewsPrompt(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/65 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="max-h-[min(100%,42rem)] w-full max-w-xl overflow-y-auto rounded-3xl border border-secondary/10 bg-surface p-6 text-secondary shadow-2xl outline-none sm:p-8"
      >
        <div className="flex items-start justify-between gap-4 border-b border-secondary/10 pb-5">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              Communauté Alfa
            </span>
            <h2 id={titleId} className="mt-2.5 font-heading text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
              Actualités Alfa
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            className="inline-flex items-center gap-1.5 rounded-full border border-secondary/15 bg-surface px-3.5 py-2 text-xs font-semibold text-secondary transition-colors hover:border-secondary/30 hover:bg-secondary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span>Fermer</span>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8M14 6l-8 8" />
            </svg>
          </button>
        </div>

        <ul className="mt-6 grid gap-4">
          <li className="rounded-2xl border border-secondary/12 bg-secondary/[0.02] p-5 transition-colors hover:border-primary/40">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-xs font-bold text-primary">
                01
              </span>
              <p className="flex-1 font-heading text-lg font-semibold text-secondary">
                Suivre les réseaux
              </p>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span>Facebook</span>
                <span className="sr-only"> (nouvel onglet)</span>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 14L14 6M8 6h6v6" />
                </svg>
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-secondary transition-colors hover:bg-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span>Instagram</span>
                <span className="sr-only"> (nouvel onglet)</span>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4 text-primary" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 14L14 6M8 6h6v6" />
                </svg>
              </a>
            </div>
          </li>

          <li className="rounded-2xl border border-secondary/12 bg-secondary/[0.02] p-5 transition-colors hover:border-primary/40">
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-xs font-bold text-primary">
                  02
                </span>
                <p className="flex-1 font-heading text-lg font-semibold text-secondary">
                  Laisser un e-mail
                </p>
              </div>
              <div className="mt-4">
                <label htmlFor={emailId} className="block text-xs font-semibold tracking-wide text-secondary/80 uppercase">
                  Adresse e-mail
                </label>
                <div className="mt-1.5 flex flex-col gap-2.5 sm:flex-row">
                  <input
                    id={emailId}
                    type="email"
                    autoComplete="email"
                    placeholder="nom@entreprise.fr"
                    className="w-full flex-1 rounded-xl border border-secondary/20 bg-surface px-3.5 py-2.5 text-sm text-secondary placeholder:text-secondary/45 focus-visible:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Laisser un e-mail
                  </button>
                </div>
              </div>
            </form>
          </li>

          <li className="rounded-2xl border border-secondary/12 bg-secondary/[0.02] p-5 transition-colors hover:border-primary/40">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-xs font-bold text-primary">
                  03
                </span>
                <div>
                  <p className="font-heading text-lg font-semibold text-secondary">
                    Message Instagram
                  </p>
                  <p className="text-xs text-secondary/70">
                    @{homeContent.social.instagramHandle}
                  </p>
                </div>
              </div>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary bg-surface px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span>Envoyer un message Instagram</span>
                <span className="sr-only"> (nouvel onglet)</span>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 14L14 6M8 6h6v6" />
                </svg>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
