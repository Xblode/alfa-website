"use client";

import type { FormEvent, MouseEvent } from "react";
import { useHomeContent } from "@/components/content-provider";

const fieldClassName =
  "min-h-11 w-full border border-secondary/25 bg-surface px-3 py-2 text-base text-secondary outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

const linkClassName =
  "text-xl font-bold text-secondary underline decoration-primary decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary";

const fields = [
  { id: "home-contact-name", name: "name", label: "Nom", type: "text", autoComplete: "name" },
  { id: "home-contact-email", name: "email", label: "E-mail", type: "email", autoComplete: "email", inputMode: "email" },
  { id: "home-contact-phone", name: "phone", label: "Téléphone", type: "tel", autoComplete: "tel", inputMode: "tel" },
] as const;

function readOptionalString(source: object, key: string) {
  if (!(key in source)) return null;
  const value = (source as Record<string, unknown>)[key];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function blockEvent(
  event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
) {
  event.preventDefault();
}

export function HomeContact() {
  const homeContent = useHomeContent();
  const { seat } = homeContent;
  const email =
    readOptionalString(homeContent, "email") ?? readOptionalString(seat, "email");
  const emailHref = email
    ? (readOptionalString(homeContent, "emailHref") ??
      readOptionalString(seat, "emailHref") ??
      (email.startsWith("mailto:") ? email : `mailto:${email}`))
    : null;

  return (
    <section
      id="contact"
      aria-labelledby="home-contact-title"
      className="border-t-4 border-primary bg-surface px-4 py-16 text-secondary sm:px-6"
    >
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <div className="grid content-start gap-6">
          <h2 id="home-contact-title" className="text-3xl font-semibold tracking-tight">
            Nous contacter
          </h2>
          <dl className="grid gap-5">
            <div className="grid gap-1">
              <dt className="text-sm font-semibold capitalize">{seat.role}</dt>
              <dd>
                <address className="not-italic">{seat.address}</address>
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-sm font-semibold">Téléphone</dt>
              <dd>
                <a href={seat.phoneHref} className={linkClassName}>
                  {seat.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-sm font-semibold">Horaires</dt>
              <dd>{seat.hours}</dd>
            </div>
            {email && emailHref ? (
              <div className="grid gap-1">
                <dt className="text-sm font-semibold">E-mail</dt>
                <dd>
                  <a href={emailHref} className={linkClassName}>
                    {email.replace(/^mailto:/, "")}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        {/* Formulaire visuel : aucune soumission, aucun message de succès. */}
        <form
          className="grid content-start gap-4"
          aria-labelledby="home-contact-form-title"
          onSubmit={blockEvent}
          noValidate
        >
          <h3 id="home-contact-form-title" className="text-xl font-semibold">
            Écrire au siège
          </h3>
          {fields.map((field) => (
            <label key={field.id} className="grid gap-1 text-sm font-medium" htmlFor={field.id}>
              <span>{field.label}</span>
              <input
                id={field.id}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                inputMode={"inputMode" in field ? field.inputMode : undefined}
                className={fieldClassName}
              />
            </label>
          ))}
          <label className="grid gap-1 text-sm font-medium" htmlFor="home-contact-message">
            <span>Message</span>
            <textarea
              id="home-contact-message"
              name="message"
              rows={5}
              className={`${fieldClassName} min-h-32 resize-y`}
            />
          </label>
          <button
            type="button"
            onClick={blockEvent}
            className="inline-flex min-h-11 w-fit items-center justify-center bg-primary px-5 py-2.5 text-base font-semibold text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}
