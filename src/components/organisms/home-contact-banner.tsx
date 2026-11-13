"use client";

import { useState, type FormEvent } from "react";
import { useDictionary } from "@/components/content-provider";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-100";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function HomeContactBanner() {
  const { seat, ui } = useDictionary();
  const { emailHref, phoneDisplay, phoneHref } = seat;
  const text = ui.contactBanner;
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!isEmail(value)) {
      setError(text.invalidEmail);
      return;
    }
    setError(null);
    const body = text.mailBody.replace("{email}", value);
    window.location.href = `${emailHref}?subject=${encodeURIComponent(text.mailSubject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section
      data-section="Contact"
      aria-labelledby="home-contact-banner-title"
      className="bg-surface py-16 text-secondary sm:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-4">
      <div className="flex w-full flex-col items-start justify-between gap-6 rounded-3xl bg-secondary px-6 py-8 text-surface sm:px-10 sm:py-10 md:flex-row md:items-center">
        <div className="max-w-xl">
          <span className="mb-3 block h-1 w-12 rounded-full bg-primary" aria-hidden="true" />
          <h2
            id="home-contact-banner-title"
            className="text-section font-semibold tracking-tight"
          >
            <span className="md:hidden">{text.titleMobile}</span>
            <span className="hidden md:inline">{text.titleDesktop}</span>
          </h2>
          <p className="mt-2 text-base leading-relaxed text-surface/80 lg:text-lg">
            <span className="md:hidden">
              {text.hours}
            </span>
            <span className="hidden md:inline">
              {text.note}
            </span>
          </p>
        </div>

        <a
          href={phoneHref}
          data-component="button-primary"
          className={`inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-secondary transition-colors hover:bg-primary-100 md:hidden ${focusRing}`}
        >
          {ui.common.call} {phoneDisplay}
        </a>

        <form
          className="hidden w-full max-w-md flex-col gap-2 md:flex"
          onSubmit={onSubmit}
          noValidate
        >
          <label htmlFor="home-contact-banner-email" className="text-sm font-medium text-surface/80">
            {text.emailLabel}
          </label>
          <div className="flex gap-2">
            <input
              id="home-contact-banner-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder={text.emailPlaceholder}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "home-contact-banner-error" : undefined}
              onChange={() => setError(null)}
              className="min-h-11 min-w-0 flex-1 rounded-full border border-surface/20 bg-surface px-4 text-sm text-secondary outline-none placeholder:text-secondary/45"
            />
            <button
              type="submit"
              data-component="button-primary"
              className={`inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-secondary transition-colors hover:bg-primary-100 ${focusRing}`}
            >
              {text.submit}
            </button>
          </div>
          {error ? (
            <p id="home-contact-banner-error" className="text-sm text-primary-100" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </div>
      </div>
    </section>
  );
}
