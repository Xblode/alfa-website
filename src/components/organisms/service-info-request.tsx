"use client";

import { useTranslate } from "@/components/content-provider";
import { OpenContactButton } from "@/components/organisms/open-contact-button";

const buttonClassName =
  "inline-flex min-h-11 w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-center font-heading text-sm font-semibold text-secondary transition-colors hover:bg-primary-100 lg:w-auto";

export function ServiceInfoRequest() {
  const t = useTranslate();
  return (
    <section
      data-section="Demande d'informations"
      aria-labelledby="service-info-title"
      className="bg-surface px-4 pb-16 text-secondary sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-5 rounded-3xl bg-secondary px-6 py-8 text-surface sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
        <h2 id="service-info-title" className="font-heading text-2xl font-semibold text-balance sm:text-3xl">
          {t("Demande d'informations")}
        </h2>
        <OpenContactButton className={buttonClassName}>
          {t("Demandez plus d'informations sur cette page")}
        </OpenContactButton>
      </div>
    </section>
  );
}
