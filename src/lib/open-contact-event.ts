export const openContactEventName = "alfa:open-contact";

/** Détail facultatif de l'événement : un texte à placer dans le champ message du popup. */
export type OpenContactDetail = { message?: string };

/** Événement d'ouverture du popup de contact, avec un message pré-rempli si besoin. */
export function createOpenContactEvent(message?: string): Event {
  return message
    ? new CustomEvent<OpenContactDetail>(openContactEventName, { detail: { message } })
    : new Event(openContactEventName);
}

/** Message pré-rempli porté par l'événement (chaîne vide si l'événement n'en a pas). */
export function readOpenContactMessage(event: Event): string {
  if (!(event instanceof CustomEvent)) return "";
  const detail: unknown = event.detail;
  if (typeof detail !== "object" || detail === null || !("message" in detail)) return "";
  return typeof detail.message === "string" ? detail.message : "";
}
