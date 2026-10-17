---
name: ui-ux-review
description: Revoit parcours, écrans, responsive, états et accessibilité à partir des spécifications ou de l'interface. À utiliser avant de clore une fonctionnalité visible ou lorsqu'une revue UI/UX est demandée.
---

# UI/UX Review

## Objectif
Vérifier qu'une interface permet le parcours prévu, sur les tailles d'écran concernées, y compris les états non nominaux.

## Prérequis
`docs/02-design/APP_FLOW.md`, `UI_UX_SPEC.md`, `DESIGN_SYSTEM.md`. Pour un thème Shopify ou WordPress, les conventions du profil dans `STACK_PROFILES.md`.

## Entrées
Parcours ou écran à revoir, spécification, diff ou maquette, profil retenu.

## Workflow
1. Lire le parcours, le rôle, l'action principale et les critères d'acceptation.
2. Vérifier la hiérarchie, l'action primaire, les actions secondaires et le retour après succès.
3. Vérifier loading, empty, error, disabled, permission insuffisante, et la préservation des saisies.
4. Vérifier mobile, tailles intermédiaires et desktop selon les breakpoints du projet.
5. Vérifier clavier, focus visible, labels, contrastes et la cible WCAG écrite dans la spec.
6. Comparer à `DESIGN_SYSTEM.md`. Pour Shopify ou WordPress, comparer aux sections, blocs ou templates du thème.
7. Classer chaque écart : bloquant, à corriger, suggestion. Citer le fichier ou l'écran.
8. Si l'interface est servie localement, exercer le parcours. Sinon, marquer `not verified` ce qui n'a pas été exécuté.

## Sorties
Liste d'écarts classés et points non vérifiés.

## Réussite
Chaque parcours demandé a un verdict. Les états non nominaux et l'accessibilité sont couverts, ou explicitement non vérifiés.
