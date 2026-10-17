---
name: project-bootstrap
description: Prépare la documentation de cadrage d'un projet web à partir du brief et du profil validé, sans générer l'application. À utiliser après la découverte, ou au démarrage si l'utilisateur demande le cadrage documentaire.
disable-model-invocation: true
---

# Project Bootstrap

## Objectif
Produire un jeu de documents cohérent, au statut `DRAFT`, et une sélection de skills prête à valider.

Pendant `/starter-kit` ou `/starter-kit-build`, suivre ces commandes : elles priment sur ce workflow.

## Prérequis
Découverte disponible, ou brief suffisant pour poser les questions manquantes. Lire `AGENTS.md` et `docs/03-architecture/STACK_PROFILES.md`.

## Entrées
Brief, réponses de découverte, dépôt, profil recommandé.

## Workflow
1. Lire `AGENTS.md`, les modèles de `docs/` et l'état du dépôt. Préserver le code déjà présent.
2. Si le profil n'est pas validé, appliquer `project-discovery` et s'arrêter à la question de validation.
3. Candidat par défaut : Vercel + Supabase. Retenir un autre profil lorsque les critères de `STACK_PROFILES.md` le demandent. Écrire la recommandation dans le TRD et un ADR `Proposed`.
4. Mettre à jour les documents pertinents : brief, questions, hypothèses et risques, PRD, app flow, UI/UX, design system si l'interface le demande, TRD, données, API, tests, sécurité, roadmap. Laisser un document inutilisé vide de contenu fictif et l'expliquer dans le compte rendu.
5. Relier exigences, parcours, données et tests. Les trous deviennent des questions ou des hypothèses, pas des faits.
6. Recommander un petit nombre de skills du catalogue `docs/90-templates/skills/`. Expliquer l'utilité de chacun. Les skills déjà dans `.cursor/skills/` restent en place.
7. Attendre la validation de la sélection. Copier seulement les dossiers approuvés vers `.cursor/skills/<nom>/`. Copier la règle de profil approuvée depuis `docs/90-templates/rules/` vers `.cursor/rules/`.
8. Mettre à jour `docs/00-discovery/SKILLS_SELECTION.md` : source, référence, `available`, `installed`, `enabled`. `installed` signifie que le dossier est dans `.cursor/skills/`. `enabled` exige une vérification dans une nouvelle conversation Cursor, ou la règle `alwaysApply` pour le style de sortie.
9. ClickUp : préparer le plan de tâches local. Aucune écriture. La création passe plus tard par `/clickup-from-context`, selon `docs/06-delivery/CLICKUP_CONVENTION.md`.
10. S'arrêter avant l'implémentation, l'installation de dépendances applicatives, le déploiement et les migrations distantes.

## Sorties
Documents `DRAFT`, profil proposé, manifeste de skills, questions restantes, prochaine validation attendue.

## Réussite
Chaque besoin P0 a un parcours ou une exclusion motivée. Le profil n'est pas présenté comme accepté tant que l'utilisateur ne l'a pas validé. Aucun skill optionnel n'est copié sans accord.
