---
name: project-sync
description: Compare les documents attendus du type de projet avec le sous-dossier docs et propose un lot de créations ou de mises à jour. À utiliser avec /project-sync.
disable-model-invocation: true
---

# Project Sync

## Objectif

Voir ce qui manque ou ce qui est en retard, sans réécrire un document approuvé en silence.

## Workflow

1. Lire le dossier ClickUp au nom du projet, puis `docs`. Lire aussi `docs/00-discovery/PROJECT_STATE.md`.
2. Liste attendue pour le Web : `PROJECT_BRIEF`, `PROJECT_STATE`. Les autres documents du dépôt seulement s'ils sont déjà utiles. Design : `D00` à `D08` seulement si le type est Design.
3. Pour chaque nom : présent, incomplet, ou absent. Ne pas inventer un second document sous un autre nom.
4. Montrer le lot : créations et passages à ajouter. `replace` seulement si la page entière est dans le lot.
5. Attendre un oui. Cet oui ne couvre pas les tâches. Les tâches passent par `/clickup-from-context`.
6. Après écriture, relire et donner les liens réels. Sans connexion, garder le lot en Markdown.
