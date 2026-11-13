"use client";

import type { ReactNode } from "react";
import { useDictionary } from "@/components/content-provider";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const defaultClassName = `inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-2.5 font-heading text-sm font-semibold text-secondary hover:bg-primary-100 ${focusRing}`;

export function OpenCookieSettings({
  className = defaultClassName,
  children,
}: {
  className?: string;
  children?: (label: string) => ReactNode;
}) {
  const { cookies } = useDictionary();
  return (
    <button
      type="button"
      data-component="button"
      className={className}
      onClick={() => document.getElementById("cookie-badge")?.click()}
    >
      {children ? children(cookies.openSettings) : cookies.openSettings}
    </button>
  );
}
