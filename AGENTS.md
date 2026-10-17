# Instructions projet pour les agents

Garder ce fichier court. Le détail des profils est dans `docs/03-architecture/STACK_PROFILES.md`.

## Sources de vérité

- Produit : `docs/00-discovery/PROJECT_BRIEF.md`, puis `docs/01-product/PRD.md`.
- UX/UI : `docs/02-design/`.
- Profil, architecture, ADR : `docs/03-architecture/`.
- Données et API : `docs/04-data/`.
- Tests, sécurité, livraison : `docs/05-quality/`, `docs/06-delivery/`.
- Skills : `docs/00-discovery/SKILLS_SELECTION.md`.
- Cadrage dans le chat : `/starter-kit`, puis `/starter-kit-build` après le dossier de décision.
- ClickUp : `docs/06-delivery/CLICKUP_CONVENTION.md`, puis `docs/06-delivery/CLICKUP.md`. Création de tâches via `/clickup-from-context`, après prévisualisation du lot.
- En cas de contradiction, la signaler avant d'agir.

## Profil de référence

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui si une bibliothèque de composants est utile, Supabase (Postgres, Auth), hébergement Vercel, suivi ClickUp.

C'est le candidat de départ. Un autre profil se retient selon `STACK_PROFILES.md`, après validation humaine. Les fichiers réservés Next.js (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `robots.ts`, `sitemap.ts`) servent lorsque ce profil est retenu.

Nommage : fichiers en kebab-case, composants exportés en PascalCase, fonctions en camelCase. Composants React partagés : atoms, molecules, organisms. Viser des composants lisibles, en pratique sous 150 lignes pour le profil React.

## Mode de travail

1. Lire les règles et les documents de la tâche avant de modifier des fichiers.
2. Pour une tâche non triviale, présenter le périmètre, les risques et les vérifications avant d'exécuter.
3. Pendant un cadrage, rester dans la documentation. Pas d'installation de dépendances ni d'application.
4. Distinguer faits, hypothèses et recommandations. Marquer `À VALIDER` ce qui n'est pas approuvé.
5. Travailler par petites tranches. Après un changement de code, lancer les contrôles disponibles et rapporter le résultat réel.
6. Demander un accord avant de verrouiller la stack, d'installer une dépendance non triviale, d'installer un skill global, de modifier un service externe, d'envoyer un lot ClickUp, d'appliquer une migration destructive, ou de déployer en dehors du workflow déjà validé.

Le push sur `main` déclenche les workflows Vercel et Supabase lorsque l'application ou `supabase/config.toml` existe. C'est le déploiement convenu pour le profil de référence.

## Qualité

Simplicité, types utiles, responsabilités séparées. Traiter chargement, vide, erreur, permissions et cas limites. Vérifier la documentation officielle si une version ou une API peut avoir changé. Décision durable : ADR dans `docs/03-architecture/ADR/`.

## Sécurité

Pas de secret dans le dépôt, le chat ou les logs. Validation et autorisation côté serveur. RLS sur les tables Supabase exposées. `SUPABASE_SERVICE_ROLE_KEY` uniquement serveur. Entrées WordPress échappées et protégées par nonce et capability lorsque ce profil est actif.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
