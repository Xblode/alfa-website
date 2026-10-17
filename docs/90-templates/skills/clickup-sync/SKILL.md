---
name: clickup-sync
description: Met à jour la traçabilité locale après des tâches ClickUp déjà créées par clickup-from-context. Ne crée pas, ne modifie pas et ne supprime pas de tâches ClickUp.
---

# ClickUp Sync

## Objectif

Tenir la copie projet de `docs/90-templates/TRACEABILITY.md` et la section ClickUp de `docs/00-discovery/PROJECT_STATE.md` alignées avec des identifiants ClickUp déjà confirmés par l'outil.

## Interdit

Ce skill n'écrit pas dans ClickUp. La création, la prévisualisation et la détection des doublons passent par `clickup-from-context` et `docs/06-delivery/CLICKUP_CONVENTION.md`.

Pas de jeton dans les fichiers versionnés. Pas d'identifiant de liste unique comme destination.

## Workflow

1. Lire les identifiants réellement retournés. S'il n'y en a pas, s'arrêter.
2. Copier `docs/90-templates/TRACEABILITY.md` dans `docs/01-product/` s'il n'y est pas encore, puis y écrire ces identifiants. Le modèle du catalogue reste un exemple.
3. Noter dans `docs/00-discovery/PROJECT_STATE.md` le dossier, les listes et le dernier lot, sans recopier les descriptions.
4. Si un appel précédent est incertain, ne pas réécrire une ligne. Demander une relecture de la tâche avant de noter un identifiant.
