---
name: shopify-theme-workflow
description: Cadre le travail sur un thème Shopify natif en Liquid, sections, blocs et templates JSON. À utiliser quand le profil retenu est un thème Shopify, distinct d'une boutique headless.
---

# Shopify Theme Workflow

## Objectif
Modifier un thème Shopify en respectant Online Store 2.0, sans y ajouter la stack Next.js du profil par défaut.

## Prérequis
Profil Shopify Theme validé. Shopify CLI disponible localement avant toute commande. Lire la règle copiée `shopify-theme.mdc`.

## Entrées
Brief marchand, thème existant ou thème de départ, sections demandées.

## Workflow
1. Confirmer qu'il s'agit d'un thème natif. Une boutique headless relève du profil Commerce et de cette skill seulement pour la partie thème, si elle existe.
2. Inspecter `layout/`, `templates/*.json`, `sections/`, `blocks/`, `snippets/`, `locales/` et `config/`.
3. Ajouter une section ou un bloc via le schéma `{% schema %}` et un preset, afin que le marchand puisse l'utiliser dans l'éditeur.
4. Préférer les settings du thème aux valeurs en dur. Laisser les textes traduisibles dans les locales.
5. Ne pas installer Next.js, Supabase ni Tailwind comme dépendance du thème.
6. Vérifier avec Shopify CLI (`shopify theme check`, puis preview) lorsque le CLI est installé. Rapporter la commande réelle.

## Sorties
Sections, templates et schéma. Résultat de `theme check` ou `not verified`.

## Réussite
Le marchand peut ajouter la section dans l'éditeur. Le paiement et le panier restent ceux de Shopify.
