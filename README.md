# Web Project Starter Kit

Kit à copier à la racine d'un projet web, puis à ouvrir dans Cursor. Il fournit le cadrage, les règles, les skills et les modèles. L'application du produit se construit ensuite, après validation du profil et des spécifications.

Le profil de référence est **Next.js, TypeScript, Tailwind CSS, shadcn/ui si utile, Vercel et Supabase**, avec **ClickUp** pour le suivi. Les autres profils sont dans `docs/03-architecture/STACK_PROFILES.md`.

## Première session

1. Copier ce dossier, ouvrir la racine dans Cursor, initialiser Git si le projet n'a pas encore de dépôt.
2. Lancer `/starter-kit`. Remplir le modèle, ou coller un texte en désordre. « Je ne sais pas » suffit.
3. Répondre aux questions. Les documents se mettent à jour ensemble. L'état court est `docs/00-discovery/PROJECT_STATE.md`. Une skill lancée par `/` s'attache à un message : pour la garder toute la session, la lancer avec Alt+Enter (mode personnalisé). Relancer `/starter-kit` reprend depuis `PROJECT_STATE.md`.
4. Valider le dossier de décision, puis lancer `/starter-kit-build`.
5. Le code des fonctionnalités commence après ce build, une tranche à la fois.

`prompts/01_FIRST_PROMPT_CURSOR.md` reste un secours si la commande n'est pas disponible.

L'exemple de déroulé, distinct de ce guide, est `docs/90-templates/EXAMPLE_STARTUP.md`.

## Où agir

| Besoin | Fichier |
|---|---|
| État du cadrage | `docs/00-discovery/PROJECT_STATE.md` |
| Brief | `docs/00-discovery/PROJECT_BRIEF.md` |
| Questions | `docs/00-discovery/OPEN_QUESTIONS.md` |
| Hypothèses et risques | `docs/00-discovery/ASSUMPTIONS_RISKS.md` |
| Skills retenus | `docs/00-discovery/SKILLS_SELECTION.md` |
| Produit | `docs/01-product/PRD.md` |
| Parcours et UI | `docs/02-design/` |
| Profils et ADR | `docs/03-architecture/` |
| Données et API | `docs/04-data/` |
| Tests et sécurité | `docs/05-quality/` |
| Roadmap, ClickUp, définition de terminé | `docs/06-delivery/` |
| Modèles, skills et règles optionnels | `docs/90-templates/` |
| Prompt de cadrage, puis revue | `prompts/` |

Ordre de lecture pour un agent : `AGENTS.md`, ce README, le brief, `STACK_PROFILES.md`, puis les documents du numéro le plus bas vers le plus haut.

## Profil

Le candidat de départ est Vercel + Supabase. Un thème Shopify natif, un thème WordPress, une boutique headless ou un système multi-modules suit les critères de `docs/03-architecture/STACK_PROFILES.md`. Le profil se verrouille après un accord explicite. La décision du kit est `docs/03-architecture/ADR/ADR-001-default-stack.md`.

## Skills

Les commandes de session sont `/starter-kit` et `/starter-kit-build`. Les skills de workflow sont `project-discovery`, `project-bootstrap`, `feature-spec`, `implement-task`, `ui-ux-review` et `review-before-done`. Le pilotage quotidien est `/project-start`, `/project-sync`, `/capture`, `/project-status`, `/session-close` et `/project-review`. `clickup-from-context` prépare les tâches et les documents ClickUp. `project-discovery` et `project-bootstrap` ne se chargent que par `/nom`, pour ne pas doubler `/starter-kit`.

Les skills de profil et `clickup-sync` sont dans `docs/90-templates/skills/`. Ils sont disponibles. Ils deviennent installés une fois copiés dans `.cursor/skills/`, après accord. Le détail des états est dans `docs/00-discovery/SKILLS_SELECTION.md`.

## Style de sortie

`.cursor/rules/05-output-style.mdc` est en `alwaysApply: true`. Le skill `i-have-adhd` est installé pour l'utilisateur, dans `~/.agents/skills/i-have-adhd` (`npx skills ls -g`). Il n'est pas dans ce dépôt. `/i-have-adhd` le charge pour une session. La règle le garde actif, parce que le skill a `disable-model-invocation: true`.

Réinstallation utilisateur :

`npx skills add ayghri/i-have-adhd -a cursor -g -y`

Pour le couper dans un projet copié : `alwaysApply: false` et suppression de la ligne `description` dans cette règle, puis `non` dans la colonne `enabled` de `SKILLS_SELECTION.md`. Avec une description, Cursor peut encore charger la règle quand il la juge utile. Le dépôt source du kit reste inchangé.

## ClickUp, CI et secrets

Le suivi local fonctionne sans ClickUp. La convention commune est `docs/06-delivery/CLICKUP_CONVENTION.md`. Toute création passe par `/clickup-from-context` et exige un accord sur le lot affiché. Le complément web est `docs/06-delivery/CLICKUP.md`.

`.github/workflows/vercel.yml` et `supabase.yml` se déclenchent sur un push vers `main`. Ils ne contactent le service que si une application Next.js ou `supabase/config.toml` est présent. Les secrets sont des secrets GitHub. `.env.example` ne contient que des valeurs fictives.

## Vérifier que Cursor voit les instructions

1. Ouvrir une nouvelle conversation Agent après un changement de règle ou de skill.
2. Dans Customize, contrôler que les règles `alwaysApply` apparaissent et que les skills de `.cursor/skills/` sont listés.
3. Un fichier présent dans le dépôt n'est pas, à lui seul, la preuve qu'une session déjà ouverte l'a chargé.

`node scripts/validate-kit.mjs` contrôle la forme des fichiers du kit. Il ne contrôle pas l'interface Cursor.

## Statuts des documents

`DRAFT`, `IN_REVIEW`, `APPROVED`, `SUPERSEDED`. Chaque document de projet indique owner, status, date et documents liés. Ce qui n'est pas approuvé reste marqué `À VALIDER`.

## Maintenance

- Mettre à jour `CHANGELOG.md` lors d'un changement de profil, de workflow ou de format Cursor.
- Relancer `node scripts/validate-kit.mjs`.
- Revérifier les documentations Vercel, Supabase, ClickUp et Cursor avant de changer une commande ou une version d'action.
- Garder les skills optionnels hors de `.cursor/skills/` tant qu'ils ne sont pas choisis pour le projet.
