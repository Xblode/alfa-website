---
name: clickup-from-context
description: Analyse le contexte accessible de la conversation et les documents du projet pour proposer un lot de tâches ClickUp conforme à la convention commune. Détecte les doublons, prépare une prévisualisation et n'écrit qu'après approbation explicite de l'utilisateur.
---

# ClickUp From Context

## Mission
Transformer le contexte accessible de la conversation en un lot de tâches ClickUp utiles, vérifiables, non redondantes et rattachées au bon projet, sans créer de travail imaginaire ni modifier l'espace de travail sans permission.

## Règle de sécurité non négociable
**Cette commande commence toujours en mode PRÉVISUALISATION.** Lancer `/clickup-from-context` autorise l'analyse et la préparation d'un lot, pas son exécution. N'effectue aucune écriture ClickUp avant que l'utilisateur approuve explicitement le lot présenté. L'approbation vaut uniquement pour ce lot précis, tel qu'affiché. Tout ajout, changement de destination ou autre modification après l'approbation nécessite une nouvelle approbation.

Cette compétence crée uniquement des tâches dans des listes existantes et correctement identifiées. Elle ne crée, ne renomme, ne déplace et ne supprime jamais de Space, dossier, liste, statut, tâche ou document. Toute opération structurelle ou modification de tâche existante requiert une demande et une approbation distinctes. Ne clôture pas de tâche sauf instruction expresse.

## 1. Définir la source analysée
1. Analyse uniquement le contexte de conversation qui t'est réellement accessible dans cette session, ainsi que les documents/fichiers de projet que tu peux réellement lire.
2. N'affirme pas avoir scanné l'historique complet d'un autre chat, un lien de conversation inaccessible, un dépôt absent ou des messages qui ne sont plus dans ton contexte.
3. Si l'utilisateur fournit une transcription, un résumé ou des fichiers, traite-les comme sources supplémentaires et distingue-les du contexte actuellement accessible.
4. Lis les instructions permanentes disponibles (`AGENTS.md`, `CLAUDE.md`, règles pertinentes, `docs/00-discovery/PROJECT_STATE.md`, `docs/06-delivery/CLICKUP_CONVENTION.md` et `docs/06-delivery/CLICKUP.md`) avant d'agir. Respecte les instructions spécifiques au projet si elles ne contredisent pas les protections de sécurité ci-dessus.

## 2. Identifier le projet et sa destination
1. Identifie le projet grâce au dépôt courant, au `docs/00-discovery/PROJECT_STATE.md`, au nom explicitement donné ou à un identifiant de projet existant.
2. Si le projet reste ambigu, pose une seule question ciblée. Ne devine pas le projet à partir du dernier dossier utilisé.
3. Pour ClickUp, utilise uniquement l'espace `Projets` par défaut. L'espace `Mon organisation` et ses listes sont hors périmètre, sauf demande explicite de l'utilisateur pour cette opération.
4. Retrouve le dossier de projet par son nom exact. Ne renomme pas le dossier. S'il est absent, arrête l'écriture et propose la création du dossier dans une demande séparée.
5. Choisis la liste existante par métier. Le métier ne s'écrit pas dans le titre :
   - cadrage → `Cadrage`
   - direction artistique → `Direction artistique`
   - stratégie → `Stratégie`
   - web → `Web`
6. Si la liste correspondante n'existe pas, ne crée pas de liste et n'en choisis pas une autre par commodité. Signale l'absence et demande une décision explicite (créer la liste dans une opération séparée ou autoriser une destination existante précise).
7. Lis la liste cible et ses statuts réels avant de préparer l'écriture. Les listes historiques peuvent utiliser des statuts différents. Ne modifie jamais la configuration des statuts dans cette compétence. À la création, omets le statut et laisse la liste utiliser son statut par défaut, sauf si l'utilisateur a explicitement demandé un statut valide existant.

## 3. Extraire les tâches, sans transformer toutes les idées en obligations
Classe les éléments du contexte en quatre groupes :
- **Tâches candidates** : action concrète explicitement demandée, décidée ou nécessaire pour un périmètre déjà approuvé.
- **À clarifier** : point bloquant qui mérite éventuellement une tâche de clarification, mais dont le résultat attendu peut être décrit sans inventer de décision.
- **Idées / options** : pistes, exemples hypothétiques, envies futures ou propositions non approuvées. Ne les crée pas comme tâches engagées.
- **Hors périmètre / abandonné** : ne pas créer.

Ne crée pas de tâches à partir d'une question isolée, d'une suggestion rejetée, d'un scénario hypothétique ou d'une idée évoquée sans décision. Lorsque l'utilisateur explore encore des options, présente-les comme points ouverts plutôt que comme tâches de production.

N'extrais que les tâches qu'il est utile de suivre dans ClickUp. Ne crée pas une tâche pour chaque phrase, détail de conversation ou micro-action triviale. Regroupe les petites actions qui produisent un seul résultat cohérent. Sépare les tâches si elles ont des résultats, destinations, responsables, dépendances ou validations différents.

## 4. Rendre chaque tâche vérifiable
Chaque tâche candidate doit avoir :
- un titre qui décrit une action et un résultat concret, sans préfixe entre crochets et sans identifiant ;
- une estimation proposée, en minutes ;
- une description avec le résultat attendu, des critères d'acceptation testables, les dépendances connues, les hypothèses explicitement marquées `À VALIDER`, et le chemin du document de référence quand il existe ;
- une destination de liste clairement indiquée. La liste porte le métier. Il ne se répète pas dans le titre.

Format de titre : `Afficher le formulaire d'inscription avec ses erreurs`.

Un identifiant de dépôt (`TASK-###`, `FEAT-###`) reste dans la traçabilité locale. Il n'entre pas dans le titre ClickUp.

Ne fabrique pas de dates, de budget, de responsable, de priorité ou de dépendance. L'estimation est une proposition du lot, écrite seulement après l'accord. N'ajoute pas la transcription complète de la conversation dans la description. Fournis un résumé et un lien ou un chemin de référence si disponible.

## 5. Détecter les doublons et l'état actuel
Avant de préparer le lot d'écriture :
1. Parcours la hiérarchie ClickUp utile en lecture seule et retrouve le dossier/list cible exacts.
2. Lis les tâches existantes de chaque liste concernée, en utilisant les fonctions de recherche et de lecture disponibles.
3. Compare les identifiants en premier, puis les titres normalisés, puis le résultat attendu et les critères d'acceptation.
4. Pour chaque candidat, classe-le comme `NOUVEAU`, `DOUBLON PROBABLE`, `DÉJÀ EXISTANT / À RELIER`, ou `À CLARIFIER`.
5. N'écris pas automatiquement une deuxième tâche pour une tâche équivalente, même si son titre diffère.
6. Ne modifie pas les tâches existantes dans cette commande. Si une tâche existante mérite une modification ou une clôture, signale-la séparément sans l'exécuter.

## 6. Prévisualisation obligatoire
Présente le lot avant l'écriture, avec :
- le projet et l'espace/listes ciblés ;
- les tâches proposées, chaque titre, liste, description courte et critères de fin ;
- les dépendances pertinentes ;
- les doublons écartés ;
- les ambiguïtés / hypothèses `À VALIDER` ;
- le nombre exact de créations proposées ;
- une confirmation que seuls ces éléments seront créés.

Demande un accord explicite, par exemple : `Valides-tu la création exacte de ces 5 tâches dans les listes indiquées ?` Une réponse ambiguë n'est pas un accord. Si l'utilisateur demande une correction, recalcule et présente un nouveau lot.

## 7. Après approbation seulement
1. Crée uniquement les tâches `NOUVEAU` approuvées, dans les listes vérifiées. Ne crée ni tâches supplémentaires, ni listes, ni dossiers.
2. Préserve les identifiants, titres, descriptions, listes et critères approuvés. Si une destination ou une donnée doit changer, arrête et demande une nouvelle approbation.
3. Si le dépôt est accessible en écriture et que l'utilisateur a autorisé cette mise à jour, copie `docs/90-templates/TRACEABILITY.md` dans `docs/01-product/` s'il n'y est pas encore, puis écris-y le lien et l'identifiant ClickUp retournés. Sinon, fournis la table de correspondance à copier. Note le dossier et les listes dans `docs/00-discovery/PROJECT_STATE.md`.
4. Vérifie chaque création en relisant la tâche créée. Ne répète pas aveuglément un appel ayant expiré ou dont le succès est incertain : vérifie d'abord si la tâche existe pour éviter le doublon.
5. Rapporte les résultats réels : créé, échec, résultat incertain, ou non tenté. Ne prétends jamais avoir créé ce qui ne l'a pas été.
6. Si la connexion ClickUp n'est pas disponible, n'invente pas un résultat. Fournis le lot approuvé dans un format Markdown prêt à exécuter plus tard. Le plan local dans `docs/06-delivery/ROADMAP.md` reste la référence.

## 8. Format des statuts
Sur `Project Starter`, les statuts réels sont `backlog`, `à cadrer`, `prêt`, `en cours`, `en revue`, `à valider`, `bloqué`, `terminé`, `annulé`, `archivé`. Cette compétence ne modifie pas les statuts ClickUp. Sur les autres listes, lire la configuration réelle et utiliser le statut par défaut à la création.

`en revue` signifie contrôle qualité. `à valider` signifie décision humaine attendue. `terminé` demande une preuve des critères de fin. `archivé` sort la tâche du travail en cours.

## 9. Format de réponse adapté au TDAH
Va directement au résultat. Utilise des titres clairs, des tableaux compacts et au maximum trois priorités immédiates. Évite les longs commentaires. Si tu as besoin de précisions, pose au plus cinq questions dans le même tour, uniquement celles qui changent le lot ou sa destination.

## 10. Compte rendu final
Après exécution, renvoie :
- nombre de tâches créées et nombre d'échecs / incertitudes ;
- liens ClickUp réels pour chaque tâche créée ;
- tâches ignorées comme doublons ;
- mises à jour de traçabilité réellement effectuées ;
- prochaine action utile, s'il y en a une.

## 11. Dans ce kit
`/starter-kit` n'appelle pas cette commande pour des tâches. Les documents ClickUp se créent et se modifient via la section 12. `/starter-kit-build` prépare le plan local, puis s'arrête à la prévisualisation des tâches. Les identifiants du dépôt (`TASK-###`, `FEAT-###`) restent dans la traçabilité locale. Un même numéro ne sert pas aux deux, et aucun n'entre dans le titre ClickUp.

## 12. Documents dans le sous-dossier `docs`

Quand la conversation contient une décision, une mise à jour de brief ou un contenu qui appartient à un document de projet :

1. Identifier le document par son nom exact (`PROJECT_BRIEF`, `PROJECT_STATE`, `SOURCE_BRUTE`, `D00`–`D08`, etc.).
2. Chercher ce document dans le sous-dossier `docs` du dossier du projet dans `Projets`.
3. Le lire s'il existe. S'il est absent, le proposer comme nouveau dans le lot.
4. Classer chaque élément de la conversation :
   - **Document** : décision, brief, contenu de projet → sous-dossier `docs`.
   - **Tâche** : action vérifiable, résultat mesurable → liste du métier.
   - **Idée / option** : non approuvée, ne pas créer.

### Import long : brut → plan → chapitres

Si la source est volumineuse (lien partagé, transcription, plusieurs messages utiles) :

1. **Brut** — Proposer `SOURCE_BRUTE` : texte accessible recopié ou collé avec peu de coupe, lien source, date, et ce qui n'a pas été lu (images, pièces). Accord `oui brut` avant écriture. Pas de synthèse à la place du brut.
2. **Plan** — Afficher un plan de chapitres sans écrire dans ClickUp par défaut : titres par défaut du type de projet (Design : D00–D08 ; Web : brief et état, puis documents du dépôt), renommages proposés, chapitres laissés vides, et mapping brut → chapitre. Attendre validation du plan dans le chat (`oui plan` ou corrections) avant le lot chapitres.
3. **Chapitres** — Pour chaque chapitre du plan validé, rédiger le document cible en Markdown structuré (titres, listes, tableaux, citations). Une passe de rédaction par chapitre ; tu peux déléguer une passe à un sous-agent par chapitre si le volume le justifie. Présenter le lot chapitres (un ou plusieurs documents) avec le texte exact. Accord `oui chapitres` ou accord par sous-lot affiché. Ne pas publier un chapitre en trois lignes quand le brut contient de la matière.

Mise à jour courte (une décision, un paragraphe) : une seule passe, sans `SOURCE_BRUTE`.

5. Présenter les lots : documents d'abord (brut, puis chapitres si import long), tâches ensuite. Sections séparées.
6. Attendre un accord par lot affiché. Un accord sur le brut ne couvre pas les chapitres. Un accord sur les documents ne couvre pas les tâches.
7. Écrire dans `docs`, visibilité `PUBLIC`. Relire après écriture et donner le lien réel. Regrouper les écritures pour limiter les appels MCP quand le quota est serré.
8. Plan Free Forever : document public dans le workspace, pas de secret, pas de fichier lourd.
9. Si le sous-dossier `docs` n'existe pas, le signaler et ne pas écrire ailleurs sans accord.
