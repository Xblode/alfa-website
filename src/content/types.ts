/**
 * Clés dont la valeur ne se traduit pas : elle doit rester identique au français
 * (identifiants, adresses, chemins d'images, formats techniques, liens de contact).
 */
type NeutralKey =
  | "id"
  | "href"
  | "src"
  | "image"
  | "logo"
  | "poster"
  | "icon"
  | "kind"
  | "unit"
  | "phoneHref"
  | "emailHref"
  | "email"
  | "phoneDisplay"
  | "reelHref"
  | "instagram"
  | "facebook"
  | "instagramHandle"
  | "ctaHref"
  | "source"
  | "date"
  | "path"
  | "serviceOrder"
  | "fallbackServiceId"
  | "officesServiceId";

/**
 * Forme d'une langue, dérivée du français :
 * - chaque texte devient `string` ;
 * - chaque liste garde sa longueur ;
 * - les clés neutres (`NeutralKey`), les nombres et les booléens gardent la valeur du français.
 * Une clé oubliée ou en trop dans une langue est donc une erreur de `tsc`.
 */
export type Texts<T> = T extends string
  ? string
  : T extends number | boolean | null | undefined
    ? T
    : T extends readonly unknown[]
      ? { [K in keyof T]: Texts<T[K]> }
      : T extends object
        ? { [K in keyof T]: K extends NeutralKey ? T[K] : Texts<T[K]> }
        : T;
