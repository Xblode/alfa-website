---
name: capture
description: Range une idée, une décision ou une demande en vrac dans un document ou une tâche, après prévisualisation. À utiliser avec /capture.
disable-model-invocation: true
---

# Capture

## Objectif

Transformer un message en un seul élément structuré. Ne pas ouvrir un audit du projet entier.

## Workflow

1. Lire le contexte accessible et le sous-dossier `docs` du projet.
2. Classer le message :
   - décision ou fait à écrire dans un document existant ;
   - document manquant du type de projet ;
   - tâche vérifiable ;
   - idée non retenue, à laisser de côté.
3. Montrer un seul élément : nom du document ou titre de tâche, texte exact, destination.
4. Attendre un oui pour cet élément. Suivre `docs/06-delivery/CLICKUP.md`.
5. Une tâche dont la liste métier n'existe pas n'est pas déposée ailleurs.
