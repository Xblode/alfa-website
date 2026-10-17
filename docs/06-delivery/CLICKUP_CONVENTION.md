# Convention ClickUp commune — Design & Web

- **Status:** APPROVED
- **Owner:** propriétaire du starter kit
- **Last updated:** 2026-10-16
- **Related documents:** `docs/06-delivery/CLICKUP.md`, `.cursor/skills/clickup-from-context/SKILL.md`
- **Source:** ClickUp Workflow Guard, adopté le 2026-10-16. Le complément propre au web est dans `docs/06-delivery/CLICKUP.md`.

## Principes
- ClickUp est la tour de contrôle ; les documents complets restent dans le dépôt ou l'emplacement documentaire de référence.
- Un dossier ClickUp représente un projet, avec son nom exact.
- L'espace `Projets` est la destination par défaut. `Mon organisation` est hors périmètre, sauf autorisation explicite.
- Les listes représentent les métiers / workstreams, pas les phases : `Cadrage`, `Direction artistique`, `Stratégie`, `Web`. Ne créer que les listes réellement nécessaires.
- Une tâche représente un résultat vérifiable. Une sous-tâche représente une action distincte nécessaire à ce résultat.
- Une même tâche qui concerne plusieurs métiers ne doit pas être dupliquée sans raison ; relier les tâches dépendantes.
- Aucune opération d'écriture avant affichage d'un lot et approbation explicite.

## Routage des tâches
- Cadrage → liste `Cadrage`
- Direction artistique → liste `Direction artistique`
- Stratégie → liste `Stratégie`
- Web → liste `Web`
- Si la liste cible manque : ne pas créer, renommer, déplacer ou choisir une autre liste sans accord explicite.

Le métier est la liste. Il ne se répète pas dans le titre.

## Titre
`Action + résultat attendu`

Exemple : `Préparer trois territoires visuels à comparer`.

Pas de préfixe entre crochets. Pas d'identifiant (`TASK-###` ou autre) dans le titre : l'identifiant ClickUp suffit à l'écran. Un identifiant de dépôt, s'il existe, reste dans la traçabilité locale. Ne jamais attribuer le même identifiant local à deux tâches, ni le confondre avec une exigence ou une fonctionnalité.

## Description de tâche
- Résultat attendu
- Critères d'acceptation vérifiables
- Dépendances
- Hypothèses `À VALIDER`
- Document de référence ou chemin de fichier
- Source courte du contexte si utile

Chaque tâche du lot porte une estimation proposée, en minutes. L'écrire dans ClickUp seulement avec le lot approuvé. Ne jamais inventer date, budget, priorité ou responsable.

## Statuts
Sur le dossier `Project Starter`, lus le 2026-10-17 : `backlog`, `à cadrer`, `prêt`, `en cours`, `en revue`, `à valider`, `bloqué`, `terminé`, `annulé`, `archivé`.

`terminé` est le statut d'une tâche finie avec preuve. `archivé` est le statut fermé : la tâche sort du travail en cours.

Cette liste décrit ce dossier. Elle n'autorise pas à modifier les statuts d'un autre dossier. Lire la configuration réelle de chaque liste. En cas d'incertitude, utiliser le statut par défaut.

## Flux d'approbation
1. Lire le contexte réellement accessible, les documents du projet, le dossier et les listes ClickUp existantes.
2. Identifier les tâches décidées / nécessaires pour un périmètre approuvé. Laisser les idées non approuvées, questions hypothétiques et pistes rejetées hors du lot.
3. Vérifier les doublons via identifiant, titre, résultat et critères d'acceptation.
4. Présenter le lot exact, les listes cibles, descriptions, critères, dépendances et exclusions.
5. Attendre une approbation explicite du lot exact.
6. Créer seulement les tâches approuvées dans les listes existantes.
7. Relire les résultats, vérifier les doublons en cas d'appel incertain et restituer les vrais liens.
8. Mettre à jour la traçabilité dans le dépôt uniquement si autorisé ; sinon fournir les identifiants et liens à copier.

## Documents de projet

Les documents de projet vivent dans le sous-dossier `docs` du dossier du projet, dans l'espace `Projets`. Le sous-dossier s'appelle `docs`. Les listes restent à côté.

`/clickup-from-context` peut présenter documents et tâches dans la même prévisualisation. L'accord sur les documents ne couvre pas les tâches. Écrire dans `docs`, visibilité `PUBLIC`, puis relire. Plan Free Forever : document public, pas de secret, fichiers lourds sur le disque (60 Mo). Si `docs` manque, le dire avant de le créer.

### Workflow import : brut → plan → chapitres

Quand la source est longue (partage ChatGPT, transcription, fil importé), ne pas résumer directement dans D00–D08 ou dans `PROJECT_BRIEF`.

1. **Brut** — Un document `SOURCE_BRUTE` dans `docs`. Contenu quasi intégral : texte accessible, liens, date d'import. Peu de reformulation. Les images non lues sont notées explicitement. Lot et accord séparés.
2. **Plan** — Montrer dans la prévisualisation le plan de chapitres : titres par défaut du type de projet (Design : D00–D08 ; Web : noms du dépôt), titres renommés si le projet l'exige, chapitres vides signalés, et quelle section du brut alimente quel chapitre. Pas d'écriture ClickUp pour le plan, sauf demande explicite.
3. **Chapitres** — Rédiger chaque document cible à partir du brut et du plan. Markdown soigné (titres, listes, tableaux, citations). Une passe par chapitre. Regrouper plusieurs chapitres dans un seul lot affiché est possible ; l'accord porte sur le lot exact. Ne pas remplacer un chapitre par trois lignes de synthèse.

Les chapitres par défaut servent de grille mentale : on peut renommer le titre du document, ajouter un document hors grille seulement après accord, et laisser des chapitres vides.

Économiser les appels MCP : éviter de relire `SOURCE_BRUTE` en entier à chaque chapitre si le brut est déjà en contexte de session ; sinon relire seulement les passages cités dans le plan.

## Interdictions par défaut
- Pas de création ou migration de Space, dossier, liste ou statut dans la commande d'ajout de tâches.
- Pas de document créé en dehors du lot de documents affiché.
- Pas de suppression, déplacement, renommage, clôture ou modification de tâche existante dans la commande d'ajout.
- Pas d'écriture dans `Mon organisation` sans autorisation explicite.
- Pas d'affirmation d'accès au contexte d'autres chats, fichiers ou dépôts qui ne sont pas réellement lisibles.
- Pas de prétention qu'une tâche est créée avant confirmation de l'outil et vérification du résultat.
