---
name: session-close
description: Résume la session, propose les décisions à enregistrer et la prochaine action. À utiliser avec /session-close.
disable-model-invocation: true
---

# Session Close

## Objectif

Fermer une session sans perdre les décisions. Écrire seulement après un oui.

## Workflow

1. Lire ce qui a été décidé dans cette conversation et `PROJECT_STATE`.
2. Montrer trois blocs : décisions à ajouter, questions encore ouvertes, prochaine action unique.
3. Si le dossier ClickUp du projet est nommé, lire les tâches ouvertes de `Cadrage` et de `Web`.
4. Proposer `terminé` seulement pour une tâche dont la conversation contient une preuve du critère. Les autres restent dans « pas assez de preuve ».
5. Attendre un oui avant de modifier `PROJECT_STATE` dans `docs` ou dans `docs/00-discovery/PROJECT_STATE.md`. Ce oui ne clôture pas les tâches.
6. Attendre un second oui qui liste les tâches exactes à passer en `terminé`. Puis les mettre à jour et les relire. Ne pas les passer en `archivé`. Ne pas toucher un autre dossier.
7. Ne pas créer de liste.
