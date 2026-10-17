---
name: project-status
description: Affiche l'état du projet, les blocages et trois priorités, sans écrire. À utiliser avec /project-status.
disable-model-invocation: true
---

# Project Status

## Objectif

Donner l'état sans relire tous les documents. Ne rien modifier.

## Lecture

`PROJECT_STATE` dans `docs` s'il existe, sinon `docs/00-discovery/PROJECT_STATE.md`. Signaler si la date de dernière synchro est inconnue.

## Sortie

```text
PROJET · [nom]
Phase actuelle : [phase lue, ou inconnue]
Dernière synchronisation : [date lue, ou inconnue]

Terminé et validé
[faits approuvés seulement]

En attente
[décision ou dépendance encore ouverte]

PROCHAINE ACTION
[une action]
Résultat attendu : [ce qu'on pourra constater]

Priorités immédiates
1. [première]
2. [deuxième]
3. [troisième]
```

Trois priorités au plus. Pas de date inventée.
