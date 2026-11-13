/**
 * Textes en anglais (britannique). La forme est imposée par le français (`Dictionary`).
 * Les phrases marquées `// À RELIRE` sont des brouillons à faire relire (surtout le juridique et les cookies).
 */
import type { Dictionary } from "../fr";
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

export const en: Dictionary = {
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
};
