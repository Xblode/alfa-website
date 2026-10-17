"use client";

import type { ReactNode } from "react";
import { openContactEventName } from "@/lib/open-contact-event";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

export function OpenContactButton({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <button
      type="button"
      data-component="button-primary"
      className={`${focusRing} ${className}`}
      onClick={() => {
        window.dispatchEvent(new Event(openContactEventName));
      }}
    >
      {children}
    </button>
  );
}
