---
name: feature-spec
description: Définit une fonctionnalité de façon testable avant son développement. À utiliser lorsqu'une capacité doit être spécifiée, découpée ou acceptée avant le code.
---

# Feature Specification

## Objectif
Décrire le comportement observable d'une fonctionnalité et ses critères d'acceptation.

## Prérequis
PRD approuvé ou explicitement en revue. Profil connu. Lire l'app flow, l'UI/UX, le TRD, le modèle de données, les contrats et les ADR qui touchent la fonctionnalité.

## Entrées
Nom ou problème de la fonctionnalité, priorité, contraintes déjà décidées.

## Workflow
1. Reformuler le résultat utilisateur avant la solution technique.
2. Créer `docs/01-product/FEATURES/FEAT-###-nom/` avec `spec.md` depuis `FEATURE_TEMPLATE.md`.
3. Définir acteurs, préconditions, parcours nominal, variantes, erreurs et permissions.
4. Écrire des critères d'acceptation vérifiables.
5. Noter les impacts écran, données, API, sécurité, accessibilité et analytique.
6. Séparer le must-have du hors périmètre.
7. Après validation de la spec, ajouter `plan.md` et `tasks.md` depuis `docs/90-templates/`.
8. Projet à plusieurs fonctionnalités : ajouter une ligne dans `TRACEABILITY.md`, copié une fois de `docs/90-templates/` vers `docs/01-product/`. Sinon, garder le lien exigence, critère et test dans la spec.
9. S'arrêter avant le code tant que la spec n'est pas validée.

## Sorties
`spec.md`, impacts, critères, questions restantes.

## Réussite
Un testeur peut vérifier chaque critère sans deviner le comportement. Les permissions et les états d'erreur sont écrits.
