import { defaultLang, type Lang } from "./languages";
import { en } from "./en";
import { fr } from "./fr";
import type { Dictionary } from "./fr";

export { defaultLang, isLang, languages, type Lang } from "./languages";
export type { Dictionary } from "./fr";

/**
 * Une entrée par langue de `languages.ts`. `Record<Lang, Dictionary>` oblige à fournir
 * toutes les langues : ajouter une langue sans son fichier de textes ne compile pas.
 */
const dictionaries: Record<Lang, Dictionary> = { fr, en };

export function getDictionary(lang: Lang = defaultLang): Dictionary {
  return dictionaries[lang];
}
