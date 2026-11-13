# Instructions projet pour les agents

Site d'Alfa (centre d'affaires à Rouen), qui remplace alfa.fr. Garder ce fichier court.

## Mémoire du projet

Elle est dans `.bframe/` :

1. Lire `.bframe/ETAT.md` d'abord.
2. `.bframe/PROJET.md` pour le cap.
3. `.bframe/DECISIONS.md` avant de trancher.
4. `.bframe/references/design.md` et `.bframe/references/donnees.md` pour le détail.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Hébergement Vercel prévu. Base de données non choisie (Supabase pressenti, pas validé).

## Nommage et structure

- Fichiers en kebab-case, composants exportés en PascalCase, fonctions en camelCase.
- Composants sous environ 150 lignes.
- Composants rangés par niveau : atoms, molecules, organisms. Dans le code actuel, les dossiers existants sont `organisms/`, `ui/` et `shared/` sous `src/components/`.

## Règles

- Ni commit ni push sans demande explicite.
- Pas de secret dans le dépôt.
- Validation et autorisation côté serveur.
- Français et anglais sur toutes les pages, langues gérées de façon générique.
- Ne pas changer les couleurs, la typo ni le logo.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
