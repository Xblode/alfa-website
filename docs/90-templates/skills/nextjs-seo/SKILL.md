---
name: nextjs-seo
description: Met en place le SEO technique d'une application Next.js App Router. À utiliser pour un profil Next.js lorsqu'il faut des métadonnées, un sitemap, robots ou une structure sémantique.
---

# Next.js SEO

## Objectif
Rendre les pages indexables de façon cohérente avec le App Router.

## Prérequis
Profil Next.js validé. Routes publiques identifiées dans `APP_FLOW.md`.

## Entrées
Liste des routes publiques, canonique, langues, pages à exclure.

## Workflow
1. Utiliser l'API Metadata dans les `layout.tsx` et `page.tsx` concernés.
2. Ajouter `app/robots.ts` et `app/sitemap.ts` pour les routes qui doivent être indexées.
3. Vérifier un seul `h1`, les titres uniques, la canonique et les alternatives de langue si le brief les demande.
4. Exclure les espaces authentifiés, la recherche interne et les URLs à paramètres privés.
5. Vérifier le résultat avec le build du projet. Marquer non vérifié ce qui n'a pas été exécuté.

## Sorties
Fichiers metadata, robots et sitemap. Notes sur les routes exclues.

## Réussite
Les routes publiques ont un titre et une description. Les routes privées ne sont pas dans le sitemap.
