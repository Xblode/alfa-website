# ClickUp

- **Status:** APPROVED
- **Owner:** propriétaire du starter kit
- **Last updated:** 2026-10-16
- **Related documents:** `docs/06-delivery/CLICKUP_CONVENTION.md`, `.cursor/skills/clickup-from-context/SKILL.md`, `docs/90-templates/TRACEABILITY.md`

ClickUp est l'outil de suivi par défaut. La convention commune est `docs/06-delivery/CLICKUP_CONVENTION.md`. Ce fichier ajoute seulement ce qui est propre au kit web.

Le cadrage et le développement local fonctionnent sans connexion. `/starter-kit` lit les documents ClickUp, et il peut les créer ou les modifier après un oui sur ce lot de documents. Il ne crée pas de tâches.

## Chemin d'écriture

1. Le plan local vit dans `docs/06-delivery/ROADMAP.md` et, pour une tranche, dans `docs/01-product/FEATURES/`.
2. Toute création passe par `/clickup-from-context`. La commande commence en prévisualisation.
3. L'accord porte sur le lot affiché. Un accord ancien ne couvre pas le lot suivant.
4. Après création vérifiée, copier `docs/90-templates/TRACEABILITY.md` dans `docs/01-product/` s'il n'y est pas encore, y noter l'identifiant ClickUp, et noter le dossier plus les listes dans `docs/00-discovery/PROJECT_STATE.md`.
5. Si la connexion manque, garder le plan local et le lot en Markdown. Ne pas inventer d'identifiant.

L'accès se fait par le MCP ClickUp. Pas de jeton dans le dépôt. `clickup-sync` ne crée pas de tâches : il ne sert qu'à tenir la traçabilité locale une fois les identifiants réels connus.

## Identifiants et titres

Le dépôt a déjà ses identifiants : `FR-###`, `FEAT-###`, `TASK-###`, `AC-###`. Ils restent dans la traçabilité locale.

- Le titre ClickUp est l'action et le résultat : `Afficher le formulaire avec ses erreurs`.
- Pas de préfixe entre crochets, pas de `TASK-###` dans le titre.
- Une fonctionnalité sans tâche découpée peut porter `FEAT-###` dans le dépôt. Ce numéro n'est pas réutilisé comme `TASK-###`.

Les tâches de direction artistique et de stratégie vivent dans leurs listes, dans l'autre kit. Les lier si une tâche web en dépend. Ne pas les recopier dans `Web`.

## Listes utilisées par le web

Espace `Projets`. Dossier au nom exact du projet.

- Cadrage → `Cadrage`
- Web → `Web`

Au build, ne proposer que ces deux listes, et seulement si le lot contient des tâches de ce métier. Si le dossier ou la liste manque, le dire et demander un accord séparé avant de créer cette structure. Ne pas déposer les tâches dans une liste de phases déjà présente (`Modlab`, `Shirel's` ou une autre) sans cet accord.

Les statuts cibles sont ceux de la convention. Les lire sur la liste réelle. Ne pas les modifier dans le lot de création. À la création, laisser le statut par défaut, sauf demande explicite d'un statut qui existe déjà sur cette liste.

## Documents

Les documents de projet vivent dans le sous-dossier `docs` du dossier du projet, dans l'espace `Projets`. Les listes restent à côté de ce sous-dossier. Les noms restent ceux déjà fixés : `D00` à `D08` pour le design, et les noms du dépôt pour le web.

`/starter-kit` lit `PROJECT_BRIEF` et `PROJECT_STATE` dans `docs` quand le dossier du projet est connu. `/clickup-from-context` peut proposer documents et tâches dans la même prévisualisation. L'accord sur les documents ne couvre pas les tâches.

Import long (partage, transcription) : suivre `CLICKUP_CONVENTION.md`, workflow **brut → plan → chapitres**. Document brut : `SOURCE_BRUTE`. Chapitres Design : D00–D08. Chapitres Web : `PROJECT_BRIEF`, `PROJECT_STATE`, puis documents du dépôt quand ils deviennent utiles.

Pour une mise à jour courte ou une décision isolée, le workflow en une passe reste valide.

1. Lire le document s'il existe.
2. Montrer le nom, le sous-dossier `docs`, et le texte qui sera créé ou changé.
3. Attendre un oui pour ce lot. Une réponse ambiguë ne suffit pas. Trois accords possibles sur un import : brut, puis chapitres (le plan est affiché entre les deux, sans écriture par défaut).
4. Créer le document dans `docs`, ou mettre à jour la page. `replace` seulement si le lot montre la page entière. Sinon, ajouter le passage montré.
5. Relire le résultat et donner le lien réel.

Plan Free Forever, contrôlé le 2026-10-16 sur l'aide ClickUp : les Docs et les sous-dossiers existent. Un Doc est public pour tout le workspace. La visibilité envoyée est `PUBLIC`. Pas de secret ni de donnée personnelle sensible. Les fichiers lourds restent sur le disque : le stockage gratuit est de 60 Mo. Le document ne garde que le chemin.

Si le sous-dossier `docs` n'existe pas, le dire et demander un accord séparé avant de le créer. Ne pas poser les documents à la racine du projet sans cet accord.

## Kit Design

Le kit Design est le dossier séparé `C:\Users\Shirley\Documents\Developement\design-project-starter-kit`. Le contrat de passage est `docs/06-delivery/DESIGN_HANDOFF.md`. Il reprend la convention ClickUp, pas les fichiers de ce dépôt.

`/brand-discovery`, `/design-explore`, `/design-review`, `/asset-audit` et `/design-to-web` sont dans le kit Design. Les automatisations (hooks, contrôle périodique) restent à construire. Ici, la revue web détaillée reste `review-before-done`. `/session-close` peut proposer des tâches en `terminé`, avec un oui séparé de celui des décisions.

## Quand proposer un lot

- `/starter-kit-build`, une fois le plan local écrit : une tâche dans `Cadrage` si une décision attend encore un accord, puis les tâches `Web` du périmètre approuvé.
- Après `feature-spec`, les tâches de la tranche approuvée. Leur `TASK-###` reste dans la traçabilité locale.
- Les idées, questions ouvertes et hypothèses `À VALIDER` restent dans les documents. Elles ne deviennent pas des tâches.
