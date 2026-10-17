---
name: project-start
description: Identifie le type de projet, charge le contexte ClickUp utile et propose une seule prochaine commande. À utiliser avec /project-start.
disable-model-invocation: true
---

# Project Start

## Objectif

Savoir sur quoi on travaille et quelle commande lancer ensuite. Ne pas enchaîner les autres workflows.

## Workflow

1. Lire `docs/00-discovery/PROJECT_STATE.md`. Si le dossier ClickUp est nommé, lire `PROJECT_BRIEF` et `PROJECT_STATE` dans le sous-dossier `docs`.
2. Classer le type : Web, Design, ou les deux. Le dépôt courant est Web tant qu'un kit Design séparé n'est pas ouvert.
3. Charger seulement les documents de ce type. Web : noms du dépôt. Design : `D00` à `D08`. Ne pas créer les boîtes absentes.
4. Proposer une seule prochaine commande parmi `/project-status`, `/capture`, `/project-sync`, `/starter-kit`, `/clickup-from-context`.
5. S'arrêter. Ne rien écrire dans ClickUp ni dans le dépôt.
