"use client";

import type { ReactNode } from "react";
import { createOpenContactEvent } from "@/lib/open-contact-event";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

export function OpenContactButton({
  children,
  className,
  message,
}: {
  children: ReactNode;
  className: string;
  /** Texte pré-rempli dans le champ message du popup. */
  message?: string;
}) {
  return (
    <button
      type="button"
      data-component="button-primary"
      className={`${focusRing} ${className}`}
      onClick={() => {
        window.dispatchEvent(createOpenContactEvent(message));
      }}
    >
      {children}
    </button>
  );
}
