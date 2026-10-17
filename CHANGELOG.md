# Changelog

## 2026-10-16 — commandes du noyau

- Six commandes : `/project-start`, `/project-sync`, `/capture`, `/project-status`, `/session-close`, `/project-review`.
- Les commandes Design et les automatisations restent pour le kit Design.

## 2026-10-16 — Project Workflow

- `/clickup-from-context` classe une conversation en documents et en tâches, puis attend un oui pour chaque partie.
- `/starter-kit` lit `PROJECT_BRIEF` et `PROJECT_STATE` dans le sous-dossier `docs` quand le dossier ClickUp est connu.
- Le kit Design reste un dossier séparé, à faire après ce skill.

## 2026-10-16 — documents ClickUp

- Les documents de projet vivent dans le sous-dossier `docs`, comme dans Project Starter.
- Le chatbot peut les créer et les modifier après un oui sur ce lot.
- Ce lot reste distinct des tâches. Le plan gratuit reste public, sans fichier lourd.

## 2026-10-16 — convention ClickUp

- La convention commune Design et Web est `docs/06-delivery/CLICKUP_CONVENTION.md`.
- `/clickup-from-context` est le seul chemin de création. Il commence en prévisualisation.
- La règle `clickup-write-guard` s'applique à chaque conversation.
- `clickup-sync` ne crée plus de tâches. Il met à jour la traçabilité locale.
- Décision : `docs/03-architecture/ADR/ADR-002-clickup-convention.md`.

## 2026-10-16

Refonte du kit à partir du résumé exécutif, en conservant l'arborescence `docs/00` à `docs/06`.

- Profil de référence : Next.js, Tailwind, shadcn/ui, Vercel, Supabase, ClickUp.
- Profils Marketing, SaaS, Commerce, Complex, Shopify Theme et WordPress Theme documentés.
- Six skills de workflow dans `.cursor/skills/`. Skills de profil et ClickUp laissés dans le catalogue.
- Style de sortie activé par règle. Le paquet `i-have-adhd` n'est pas installé.
- Déploiement Vercel via la CLI officielle, migrations Supabase via `setup-cli@v3`, `link` et `db push`.
- Les workflows distants ne partent que si l'application Next.js ou `supabase/config.toml` est présent.

Les écarts de syntaxe par rapport aux exemples du résumé sont dans `docs/03-architecture/ADR/ADR-001-default-stack.md`.

## 2026-10-16 — i-have-adhd en skill utilisateur

- Installé avec `npx skills add ayghri/i-have-adhd -a cursor -g -y`.
- Emplacement vérifié : `~/.agents/skills/i-have-adhd`. `npx skills ls -g` le rattache à Cursor.
- La copie dans le dépôt (`.agents/skills/`) a été retirée. Les skills du kit dans `.cursor/skills/` sont restés.

## 2026-10-16 — i-have-adhd installé

- Commande exécutée : `npx skills add ayghri/i-have-adhd -a cursor -y` (skills CLI 1.7.2).
- Emplacement vérifié : `.agents/skills/i-have-adhd`. `npx skills list` le rattache à Cursor.
- Le skill reste en `disable-model-invocation`. La règle `05-output-style.mdc` reste le mode always-on.

## 2026-10-16 — propositions de la revue appliquées

- Supabase : `db push` passe par un job dans l'environnement GitHub `production`. L'accord exige des relecteurs obligatoires dans les réglages du dépôt.
- Vercel et Supabase : message d'erreur explicite si un secret GitHub manque.
- `project-discovery` et `project-bootstrap` : chargement par `/nom` seulement.
- ADR-001 : séparation frontend / backend logique dans le profil de référence, physique seulement pour Complex.
- `00-project-governance.mdc` et `40-security.mdc` ne répètent plus `AGENTS.md`.

## 2026-10-16 — commandes de session

- `/starter-kit` ouvre un modèle de premier message, vérifie les pratiques courantes une fois, puis remplit les documents ensemble.
- Une question sans réponse devient une hypothèse. Le cadrage continue.
- `PROJECT_STATE.md` garde l'état court. L'arborescence n'y entre que lorsque le profil et les surfaces sont nommés.
- `/starter-kit-build` installe le profil accepté, prépare le premier commit, puis la liste de tâches.

## 2026-10-16 — revue

- `/starter-kit` : reprise depuis `PROJECT_STATE.md`, brief joint au lancement, code existant, mise à jour sur place.
- `/starter-kit-build` : reprise par la ligne `Build`, dossier non vide, double déploiement Vercel, contrôles avant commit. ClickUp par défaut.
- Globs sans accolades : Cursor sépare les motifs par des virgules.
- Désactivation du style de sortie : retirer aussi `description`.
- `validate-kit.mjs` : fichiers listés par Git si possible, références de chemins, motifs de secrets élargis, skills du catalogue copiés acceptés s'ils sont déclarés installés.
- Hypothèses centralisées dans `ASSUMPTIONS_RISKS.md`. Traçabilité copiée dans `docs/01-product/`.
- `concurrency` sur les workflows Vercel et Supabase.
