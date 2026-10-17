---
name: project-discovery
description: Analyse un brief de projet web, sépare faits, hypothèses et questions, puis pose seulement les clarifications qui changent le périmètre ou l'architecture. À utiliser au démarrage, avant le cadrage documentaire et avant de verrouiller la stack.
disable-model-invocation: true
---

# Project Discovery

## Objectif
Comprendre le besoin et préparer une décision de profil, sans écrire l'application.

Pendant `/starter-kit`, suivre cette commande : elle prime sur ce workflow.

## Prérequis
`AGENTS.md`, `docs/03-architecture/STACK_PROFILES.md`, `docs/00-discovery/`.

## Entrées
Brief, documents déjà fournis, dépôt existant, contraintes connues.

## Workflow
1. Lire le brief, les documents, les fichiers du dépôt et les contraintes. Le dépôt peut déjà contenir du code : le décrire, le préserver.
2. Classer chaque information : fait, hypothèse, question ouverte, risque.
3. Signaler les contradictions. Reprendre une réponse déjà présente dans les sources est inutile.
4. Choisir les questions selon le brief. Un site vitrine n'a pas le questionnaire d'un SaaS avec paiement et rôles.
5. Poser au plus cinq questions groupées lorsqu'une réponse changerait le périmètre, l'expérience, la sécurité, le coût ou le profil. Sinon, écrire une hypothèse réversible.
6. Recommander un profil avec les critères de `STACK_PROFILES.md`. Candidat par défaut : Vercel + Supabase, sauf contrainte Shopify native, WordPress, ou incompatibilité explicite du brief.
7. Mettre à jour `PROJECT_BRIEF.md`, `OPEN_QUESTIONS.md` et `ASSUMPTIONS_RISKS.md`. Statut `DRAFT`. Marquer `À VALIDER` ce qui n'est pas approuvé.
8. S'arrêter pour validation avant le bootstrap documentaire complet, le verrouillage du profil et toute implémentation.

## Sorties
Résumé de compréhension, questions, hypothèses, profil recommandé, fichiers mis à jour.

## Réussite
Les faits sont séparés des hypothèses. Les questions restantes peuvent changer une décision majeure. Aucune dépendance n'est installée et aucun service externe n'est modifié.
