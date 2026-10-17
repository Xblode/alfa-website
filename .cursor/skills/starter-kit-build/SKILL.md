---
name: starter-kit-build
description: Propose la stack et les skills après le cadrage, installe le profil accepté, prépare le premier commit et la liste de tâches. À utiliser quand l'utilisateur lance /starter-kit-build.
disable-model-invocation: true
---

# Starter Kit Build

## Prérequis

`docs/00-discovery/PROJECT_STATE.md` contient un dossier de décision, ou l'utilisateur confirme qu'il construit avec les hypothèses affichées. Sinon, le dire et renvoyer vers `/starter-kit`. Lire cet état, `STACK_PROFILES.md` et `SKILLS_SELECTION.md`.

Reprise : lire la ligne `Build` de `PROJECT_STATE.md` et `git status`. Ne pas refaire une étape déjà faite. Ne pas réinstaller ce qui est présent.

## Proposition

1. Proposer le profil. Vercel + Supabase est le candidat s'il n'a pas été écarté. Nommer les skills du catalogue à copier et ceux qui restent dehors.
2. Montrer l'arborescence du dossier de décision, les commandes d'installation prévues, le message de commit, la branche poussée et les workflows que ce push déclenchera. Attendre un accord sur ce lot. Noter `Build: proposé`.

## Installation

3. Copier les skills acceptés de `docs/90-templates/skills/` vers `.cursor/skills/`. Copier la règle de profil acceptée de `docs/90-templates/rules/` vers `.cursor/rules/`. Mettre à jour `SKILLS_SELECTION.md`.
4. Installer uniquement la stack acceptée. Un thème Shopify ou WordPress ne reçoit pas Next.js ni Supabase. Vérifier la documentation officielle de l'outil avant la commande. Rapporter la commande et son résultat.
5. Le dossier contient déjà le kit. Un générateur peut refuser un dossier non vide : générer dans un dossier temporaire, puis fusionner sans écraser `README.md`, `AGENTS.md`, `.cursor/`, `.github/` ni `docs/`. Fusionner `.gitignore` en gardant `!.env.example`.
6. Profil Vercel : si le projet Vercel est relié au dépôt par l'intégration Git, ajouter `"git": { "deploymentEnabled": false }` dans `vercel.json`, sinon chaque push sur `main` déploie deux fois.
   Profil avec Supabase : avant le premier push qui contient `supabase/config.toml`, rappeler d'ajouter des relecteurs obligatoires à l'environnement GitHub `production` (Settings > Environments). Sans eux, `db push` part sans accord. C'est un réglage du dépôt distant : le faire faire à l'utilisateur, ne pas le modifier soi-même.
7. Créer les dossiers réels de l'arborescence acceptée, pas ceux d'un autre profil. Noter `Build: installé`.

## Premier enregistrement

8. Lancer `node scripts/validate-kit.mjs`, puis lint, types et build s'ils existent. Rapporter le résultat réel.
9. Vérifier le diff : pas de secret, pas de `.env` réel. Commit, puis push si le dépôt distant existe. S'il n'existe pas, le dire et s'arrêter avant d'inventer une remote. Noter `Build: commité`.

## Tâches

10. Écrire la liste locale dans `docs/06-delivery/ROADMAP.md` et, pour la première tranche, `docs/01-product/FEATURES/FEAT-001-<nom>/tasks.md` à partir de `docs/90-templates/TASKS_TEMPLATE.md`.
11. ClickUp est l'outil par défaut, sauf autre outil nommé dans le brief. Relire le sous-dossier `docs`. Un document manquant ou à modifier forme un lot de documents : le montrer et attendre un oui avant de l'écrire, selon `docs/06-delivery/CLICKUP.md`. Les tâches passent par `/clickup-from-context`, dans un lot séparé, selon `docs/06-delivery/CLICKUP_CONVENTION.md`. Sans connexion, ne pas inventer d'identifiant. Noter `Build: tâches prêtes` dès que le plan local est écrit.

## Après

Le code des fonctionnalités commence ensuite, une tranche à la fois, via `feature-spec` puis `implement-task`.
