---
name: project-review
description: Signale les contradictions entre brief, décisions, spécifications et tâches, puis propose les corrections. À utiliser avec /project-review.
disable-model-invocation: true
---

# Project Review

## Objectif

Produire un rapport d'écarts. Ne pas modifier un document approuvé sans un lot séparé.

## Workflow

1. Lire `PROJECT_BRIEF`, `PROJECT_STATE` et les documents déjà utiles du type de projet.
2. Comparer les décisions entre elles et avec les tâches connues.
3. Pour le Web, contrôler aussi les critères d'acceptation cités et `docs/06-delivery/DEFINITION_OF_DONE.md` si une livraison est en cours. La revue de code détaillée reste `review-before-done`.
4. Lister les écarts : document, contradiction, correction proposée.
5. Distinguer un contrôle de l'agent et une décision qui t'appartient. Recommander une porte seulement si les conditions lues sont remplies : spec approuvée avant le code, revue passée avant de dire terminé.
6. S'arrêter au rapport, sauf si tu valides un lot de corrections.
