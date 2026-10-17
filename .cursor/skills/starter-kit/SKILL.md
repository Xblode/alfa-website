---
name: starter-kit
description: Mène le cadrage d'un projet web dans le chat, met à jour les documents ensemble à partir des réponses, et s'arrête avant l'installation. À utiliser quand l'utilisateur lance /starter-kit ou veut remplir le cadrage sans écrire les fichiers à la main.
disable-model-invocation: true
---

# Starter Kit

## Objectif

Remplir les documents du kit à partir de la conversation. Tous les domaines restent en contexte. Le travail n'avance pas domaine par domaine.

Dans cette skill, les cinq questions par tour et le dossier de décision priment sur les limites du style de sortie.

## Lancement

1. Lire `AGENTS.md`, `docs/00-discovery/PROJECT_STATE.md` et `docs/90-templates/FIRST_PROMPT.md`. Lire une section de document seulement si l'état dit qu'elle est en cours.
2. Si le dossier ClickUp du projet existe (nom dans `PROJECT_STATE.md`, section ClickUp), lire `PROJECT_BRIEF` et `PROJECT_STATE` dans le sous-dossier `docs`. Si leur contenu contredit `docs/00-discovery/PROJECT_STATE.md`, le signaler avant de poser des questions. Si la connexion ClickUp est absente, continuer sans lecture distante.
3. Reprise : si `PROJECT_STATE.md` contient déjà un brief, des décisions ou des hypothèses, ne pas réafficher le modèle ni refaire la vérification. Résumer l'état en cinq lignes au plus, signaler une contradiction entre l'état et les documents, puis poser les prochaines questions.
4. Si le dépôt contient déjà du code (`package.json`, `src/`, `app/`, fichiers de thème), le décrire dans `PROJECT_STATE.md`, le préserver et en tenir compte pour le profil.
5. Premier lancement : vérifier une fois les pratiques courantes pour un brief destiné à un agent : résultat observable, périmètre, hors périmètre, contraintes, critères constatables. Noter la date et les sources dans `PROJECT_STATE.md`. Si la vérification échoue, le dire et utiliser `FIRST_PROMPT.md` sans le modifier.
6. Ajuster le modèle seulement si la vérification change un point utile. Afficher un rappel de cinq thèmes au plus, puis le modèle. « Je ne sais pas » reste une réponse valide.
7. Si le message de lancement contient déjà un brief, passer directement à « Après chaque message ». Sinon, s'arrêter et attendre le message. Ne pas inventer le produit.
Rappel de base, à adapter après la vérification :

- Pour qui, et quel problème.
- À quoi on voit que c'est réussi.
- Ce qui est dedans, plus tard, et dehors.
- Le parcours principal.
- Contraintes, données personnelles, références, points non tranchés.

## Après chaque message

1. Classer faits, hypothèses et inconnues. Une même info peut nourrir plusieurs documents dans le tour.
2. Mettre à jour `PROJECT_STATE.md` sur place, une page au plus. Dans chaque document, patcher seulement les sections que le message remplit. Ne pas réécrire un document entier.
3. Documents possibles : `PROJECT_BRIEF.md`, `OPEN_QUESTIONS.md`, `ASSUMPTIONS_RISKS.md`, `PRD.md`, `APP_FLOW.md`, `UI_UX_SPEC.md`, `TRD.md`, `TEST_STRATEGY.md`, `SECURITY_PRIVACY.md`, `ROADMAP.md`. `DESIGN_SYSTEM.md`, `DATA_MODEL.md` et `API_CONTRACTS.md` restent « pas encore utile » tant que le message n'en parle pas.
4. Le candidat de départ est Vercel + Supabase. Il reste `À VALIDER`. Un autre profil de `STACK_PROFILES.md` se propose quand les réponses l'écartent. Ne rien imposer au-delà des décisions validées.
5. Poser au plus cinq questions. Chacune part d'une info déjà donnée, aide à trouver la réponse, et dit ce qu'elle débloque. Les noter dans « Prochaines questions » de `PROJECT_STATE.md`.
6. Une question restée sans réponse au tour suivant, ou un « je ne sais pas », devient une hypothèse `À VALIDER` dans `ASSUMPTIONS_RISKS.md`. La retirer des prochaines questions. Ne pas la reposer. Continuer.

## Arborescence

L'ajouter dans `PROJECT_STATE.md` quand le profil pressenti et les surfaces principales sont nommés. Modifier ce bloc sur place. Le garder court. Avant ce seuil, ne pas la dessiner.

## Dossier de décision

Le présenter quand une nouvelle question ne changerait plus le MVP ni le profil. Il contient le retenu, les hypothèses, l'arborescence, les skills du catalogue à copier, et ce qui ne sera pas installé. L'écrire dans `PROJECT_STATE.md`. Attendre un accord avant `/starter-kit-build`.

Si l'utilisateur veut construire plus tôt, montrer une fois les trous, puis continuer s'il confirme, avec les hypothèses explicites.

## Interdit pendant cette skill

Installation, commit, push, `/clickup-from-context`, création de tâches, copie de skills ou de règles, création des dossiers de l'application, modification du code existant.

La lecture, la création et la modification des documents du sous-dossier `docs` suivent `docs/06-delivery/CLICKUP.md`. Montrer le lot de documents et attendre un oui avant d'écrire. Sans connexion, continuer dans les fichiers du dépôt.
