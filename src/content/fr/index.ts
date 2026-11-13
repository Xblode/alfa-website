/**
 * Textes en français : langue de référence. Les autres langues en dérivent la forme (voir `../types.ts`).
 *
 * Contenu figé relevé sur https://www.alfa.fr/ le 2026-10-17.
 * Le siège n'est pas l'adresse d'un bien.
 * Les cartes du site n'affichent pas de prix : `priceFrom` reste null.
 * Le bien « Rouen » est un bureau nommé ainsi, distinct du siège.
 * Cherbourg est une salle de réunion (2Bème étage), pas un bureau.
 * Fixtures de démonstration, pas des faits Alfa : `availability` sur chaque bien,
 * les trois aperçus du menu Articles, les profils clients (`personas`),
 * les avis clients (`reviews`) et le bloc FAQ (questions rédigées ici, réponses reprises des faits déjà publiés).
 * Ce n'est pas un blog.
 */
import type { Texts } from "../types";
import { cookies } from "./cookies";
import { articles } from "./home-articles";
import { creatorPath } from "./home-creator-path";
import { faq } from "./home-faq";
import { hero, promises } from "./home-hero";
import { offers } from "./home-offers";
import { personas } from "./home-personas";
import { quiz } from "./quiz";
import { reviews } from "./home-reviews";
import { services } from "./home-services";
import { spaces } from "./home-spaces";
import { legalPages } from "./legal";
import { servicePages } from "./services";
import { brand, legal, nav, seat, social, topBar } from "./site";
import { ui } from "./ui";

export const fr = {
  brand,
  topBar,
  seat,
  social,
  nav,
  legal,
  hero,
  promises,
  spaces,
  services,
  creatorPath,
  personas,
  quiz,
  offers,
  articles,
  faq,
  reviews,
  servicePages,
  legalPages,
  cookies,
  ui,
} as const;

export type Dictionary = Texts<typeof fr>;
