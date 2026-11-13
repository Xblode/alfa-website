---
name: site-mods
description: Outil de dev pour modifier visuellement un site Next.js en local (panneau flottant, actif seulement hors production).
---

# site-mods

## À quoi il sert

Un panneau flottant qui s'affiche sur le site pendant le développement (`npm run dev`). Il permet de survoler et sélectionner des éléments, voir l'arbre de la page, ajuster les espacements, déplacer des blocs, vérifier l'accessibilité et le point de rupture, puis exporter les modifications. Il n'apparaît jamais en production.

Le code est dans `code/` (à côté de ce fichier). Il ne dépend que de React.

## Activer dans un site

1. Copier le dossier `site-mods/` dans `.claude/skills/` du projet.
2. Dans `tsconfig.json`, ajouter l'alias dans `compilerOptions.paths` :
   `"@site-mods/*": ["./.claude/skills/site-mods/code/*"]`
3. Dans `src/app/globals.css`, juste après `@import "tailwindcss";`, ajouter (pour que Tailwind génère les classes du panneau, le dossier commençant par un point étant ignoré par défaut) :
   `@source "../../.claude/skills/site-mods/code";`
   Adapter le chemin relatif si `globals.css` est ailleurs.
4. Dans `src/app/layout.tsx` :
   - import : `import { SiteModsPanel } from "@site-mods/site-mods-panel";`
   - dans le `<body>` : `{process.env.NODE_ENV !== "production" ? <SiteModsPanel /> : null}`

## Retirer

1. Supprimer l'import et la ligne `<SiteModsPanel />` dans `src/app/layout.tsx`.
2. Supprimer l'alias `@site-mods/*` dans `tsconfig.json`.
3. Supprimer la ligne `@source` dans `src/app/globals.css`.
4. Supprimer le dossier `.claude/skills/site-mods/`.
