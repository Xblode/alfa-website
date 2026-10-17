"use client";

import { useState, type FormEvent } from "react";
import { useHomeContent, useTranslate } from "@/components/content-provider";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-100";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function HomeContactBanner() {
  const t = useTranslate();
  const { emailHref, phoneDisplay, phoneHref } = useHomeContent().seat;
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!isEmail(value)) {
      setError(t("Indiquez une adresse e-mail valide."));
      return;
    }
    setError(null);
    const body = `Merci de me recontacter à cette adresse : ${value}`;
    window.location.href = `${emailHref}?subject=${encodeURIComponent("Demande de contact")}&body=${encodeURIComponent(body)}`;
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
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            <span className="md:hidden">{t("Une question ? Appelez-nous.")}</span>
            <span className="hidden md:inline">{t("Une question ? Laissez votre e-mail.")}</span>
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-surface/80 sm:text-base">
            <span className="md:hidden">
              {t("Le siège répond du lundi au vendredi, de 8h30 à 12h30 et de 14h à 17h.")}
            </span>
            <span className="hidden md:inline">
              {t("Le message s’ouvre dans votre messagerie. L’adresse n’est pas enregistrée sur le site.")}
            </span>
          </p>
        </div>

        <a
          href={phoneHref}
          data-component="button-primary"
          className={`inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-secondary transition-colors hover:bg-primary-100 md:hidden ${focusRing}`}
        >
          {t("Appeler")} {phoneDisplay}
        </a>

        <form
          className="hidden w-full max-w-md flex-col gap-2 md:flex"
          onSubmit={onSubmit}
          noValidate
        >
          <label htmlFor="home-contact-banner-email" className="text-sm font-medium text-surface/80">
            {t("Votre e-mail")}
          </label>
          <div className="flex gap-2">
            <input
              id="home-contact-banner-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder="nom@exemple.fr"
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
              {t("Être contacté")}
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
