# ADR-001 — Profil de référence et écarts techniques du kit

- **Status:** Accepted
- **Date:** 2026-10-16
- **Decision owner:** propriétaire du starter kit
- **Related:** `../STACK_PROFILES.md`, `../../../Résumé exécutif.md`, `../../../CHANGELOG.md`

## Contexte

Le résumé exécutif fixe l'intention : Next.js, Tailwind ou shadcn/ui, Vercel, Supabase, ClickUp, et un déploiement au push sur `main`. La validation du 2026-10-16 confirme que ce résumé prime sur les formulations plus tardives qui rendaient ces choix optionnels.

Le même résumé contient des exemples dont la syntaxe ou la version ne correspondent plus aux outils actuels.

## Décision

1. Vercel + Supabase est le profil de référence. Les autres profils de `STACK_PROFILES.md` restent disponibles et se choisissent selon le brief, avec validation humaine avant verrouillage.
2. Le déploiement Vercel utilise la CLI officielle (`vercel pull`, `vercel build --prod`, `vercel deploy --prebuilt --prod`), déclenchée sur `main`. L'exemple `amondnet/vercel-action@v20` n'est pas repris : l'action a évolué (v42 au moment du contrôle) et la documentation Vercel décrit la CLI.
3. Les migrations Supabase utilisent `supabase/setup-cli@v3`, `supabase link`, puis `supabase db push`. Le drapeau `--project-id` de l'exemple du résumé n'est pas celui de la CLI actuelle.
4. Les deux workflows ne contactent le service distant que si le dépôt contient déjà une app Next.js ou `supabase/config.toml`.
5. Les règles Cursor utilisent le frontmatter reconnu : `description`, `globs`, `alwaysApply`. Le champ `glob` et les clés `primary-cursor-mode` / `tools` des exemples du résumé ne sont pas émis.
6. `60-nextjs.mdc` est attaché aux fichiers Next.js. `alwaysApply: true` ignorerait les globs et appliquerait Next.js à chaque conversation, y compris sur un thème Shopify.
7. Les documents de projet restent à la racine `docs/`. Le dossier `projects/<client>__<projet>/` décrit dans un exemple de skill n'est pas créé.
8. Huit skills de workflow vivent dans `.cursor/skills/` : les commandes `starter-kit` et `starter-kit-build`, et six skills de workflow. Les skills de profil restent dans `docs/90-templates/skills/` jusqu'à copie approuvée, parce que Cursor indexe tout `SKILL.md` sous `.cursor/skills/`. Le skill ClickUp `clickup-from-context` est ajouté par l'ADR-002.
9. Le style de sortie est actif par `.cursor/rules/05-output-style.mdc`. Le skill `i-have-adhd` est un skill utilisateur (`~/.agents/skills/i-have-adhd`), installé le 2026-10-16. Il n'est pas versionné dans le kit. `/i-have-adhd` le charge pour une session.
10. ClickUp est l'outil de suivi par défaut. Le chemin d'écriture est celui de l'ADR-002 : skill `clickup-from-context`, espace `Projets`, listes par métier, accord sur le lot affiché.
11. Fichiers SEO : `robots.ts` et `sitemap.ts`, selon les conventions Next.js, pas `robots.tsx` ni un `sitemap.xml` écrit à la main. Un composant propre à une page vit dans le dossier de sa route plutôt que d'être préfixé (`homepage_Hero.tsx`), ce qui garde le kebab-case.
12. Séparation frontend / backend : dans le profil de référence, elle est logique. Une seule app Next.js, avec l'accès aux données, les secrets et les opérations sensibles dans une couche serveur (`src/lib` côté serveur, route handlers, server actions). Les dossiers séparés `web/` et `api/` du résumé ne servent qu'au profil Complex, lorsqu'un ADR de projet le justifie. Un sous-domaine `api.` ne remplace pas l'autorisation serveur.
13. Les migrations Supabase poussées depuis `main` passent par l'environnement GitHub `production`. L'accord humain n'est réel qu'après l'ajout de relecteurs obligatoires dans les réglages du dépôt.

## Options écartées

- Déclencher les déploiements uniquement à la main. Écarté par la validation du plan.
- Copier tous les skills dans `.cursor/skills/` dès le kit. Écarté par le choix de n'y placer que les commandes de session et les skills de workflow.
- Conserver `amondnet/vercel-action@v20`. Écarté parce que la version citée n'est plus le mécanisme à jour.

## Conséquences

- Un push sur `main`, une fois l'application et les secrets en place, déploie la production et pousse les migrations.
- Un projet Shopify ou WordPress doit éviter d'ajouter `next` dans `package.json` ou `supabase/config.toml` s'il ne veut pas de ces déploiements.
- Si le projet Vercel est aussi relié au dépôt par l'intégration Git, chaque push déploie deux fois. `vercel.json` doit alors contenir `"git": { "deploymentEnabled": false }`.
- Le résumé exécutif reste la source d'intention. Les corrections de syntaxe et de version sont dans cet ADR.
