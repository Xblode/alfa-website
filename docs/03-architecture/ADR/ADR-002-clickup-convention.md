# ADR-002 — Convention ClickUp commune

- **Status:** Accepted
- **Date:** 2026-10-16
- **Decision owner:** propriétaire du starter kit
- **Related:** `docs/06-delivery/CLICKUP_CONVENTION.md`, `docs/06-delivery/CLICKUP.md`, `docs/03-architecture/ADR/ADR-001-default-stack.md`

## Contexte

Le kit utilisait un jeton et un identifiant de liste unique. Le pack ClickUp Workflow Guard fixe une convention partagée avec le kit Design : espace `Projets`, dossier au nom du projet, listes par métier, écriture seulement après prévisualisation d'un lot.

## Décision

1. `docs/06-delivery/CLICKUP_CONVENTION.md` est la convention suivie pour tout ClickUp.
2. Le skill `clickup-from-context` vit dans `.cursor/skills/clickup-from-context/`. Toute création de tâches passe par lui et commence en prévisualisation.
3. La règle `.cursor/rules/clickup-write-guard.mdc` est `alwaysApply: true`.
4. `docs/06-delivery/CLICKUP.md` ne répète pas la convention. Il fixe les identifiants du dépôt, qui restent hors du titre ClickUp, et le routage vers les listes `Cadrage` et `Web`. Amendement du 2026-10-16 : pas de préfixe entre crochets ni de `TASK-###` dans le titre. Chaque tâche du lot porte une estimation proposée.
5. `clickup-sync` ne crée plus de tâches. Il met à jour la traçabilité locale.
6. Cette décision complète les points 8 et 10 de l'ADR-001.

## Options envisagées

1. Garder l'écriture par `CLICKUP_LIST_ID`. Écarté : une seule liste ne route pas les métiers et contredit la convention commune.
2. Laisser le skill seulement dans le pack externe. Écarté : un projet copié depuis ce kit n'aurait pas la commande ni la règle.
3. Adopter le pack dans le kit, sans installer le skill global. Retenu.

## Conséquences

- Une liste ou un dossier manquant n'est pas créé dans le lot de tâches. Il faut un accord séparé.
- Les projets déjà structurés, dont `Modlab` et `Shirel's`, ne sont pas migrés par le kit.
- Le suivi local reste utilisable sans connexion ClickUp.
