"use client";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function OpenCookieSettings() {
  return (
    <button
      type="button"
      data-component="button"
      className={`inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-2.5 font-heading text-sm font-semibold text-secondary hover:bg-primary-100 ${focusRing}`}
      onClick={() => document.getElementById("cookie-badge")?.click()}
    >
      Paramétrer les cookies
    </button>
  );
}
