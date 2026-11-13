/** Langues du site. Ajouter une langue : une ligne ici, puis un dossier de textes (voir `index.ts`). */
export const languages = [
  { code: "fr", label: "Français", htmlLang: "fr" },
  { code: "en", label: "English", htmlLang: "en" },
] as const;

export type Lang = (typeof languages)[number]["code"];

export const defaultLang: Lang = "fr";

export function isLang(value: unknown): value is Lang {
  return languages.some((language) => language.code === value);
}
