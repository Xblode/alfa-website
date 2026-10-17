# Tasks — [Feature]

- **Spec:** [lien]
- **Status:** DRAFT

## Format de tâche
- [ ] `TASK-001` [Action précise] — dépendances: [ID ou aucune] — validation: [commande ou critère]

## Phase 0 — Setup / prérequis
- [ ] `TASK-001` [pré-requis] — dépendances: aucune — validation: [critère]

## Phase 1 — Tranche verticale principale
- [ ] `TASK-010` [modèle/API] — dépendances: `TASK-001` — validation: [test]
- [ ] `TASK-011` [UI / parcours] — dépendances: `TASK-010` — validation: [test]
- [ ] `TASK-012` [tests automatisés] — dépendances: `TASK-010`, `TASK-011` — validation: [commande]

## Phase 2 — Cas limites et durcissement
- [ ] `TASK-020` [erreurs / permissions / accessibilité] — dépendances: phase 1 — validation: [critère]

## Phase 3 — Revue finale
- [ ] `TASK-030` [vérifier DoD et docs] — dépendances: phases précédentes — validation: DoD

## Gate avant de coder
- [ ] Spec approuvée et critères testables
- [ ] Architecture et dépendances clarifiées
- [ ] Plan revu par l'utilisateur
