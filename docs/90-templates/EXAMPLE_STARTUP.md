# Exemple de démarrage

Ce fichier est un **exemple de parcours**. Les noms entre crochets ne sont pas un produit réel. Les instructions générales sont dans `README.md`.

## Situation

La personne copie le kit, ouvre le dossier dans Cursor et colle un brief : un [atelier] veut un site avec pages [services], [contact] et prise de rendez-vous.

## Déroulé

1. La personne lance `/starter-kit`. Cursor affiche le rappel et le modèle de `docs/90-templates/FIRST_PROMPT.md`.
2. Elle colle son brief en désordre. Cursor sépare les faits (pages demandées, prise de rendez-vous) des manques (paiement, comptes, langues).
3. Il met à jour ensemble `PROJECT_STATE.md`, `PROJECT_BRIEF.md`, `PRD.md`, `APP_FLOW.md` et `ASSUMPTIONS_RISKS.md`, section par section.
4. Il pose au plus cinq questions tirées du brief. Ici : le rendez-vous crée-t-il un compte, et où vit l'agenda ?
5. Elle répond « je ne sais pas » pour l'agenda. Cursor écrit une hypothèse `À VALIDER` et continue sans reposer la question.
6. Le profil Vercel + Supabase et les surfaces sont nommés : une arborescence courte apparaît dans `PROJECT_STATE.md`.
7. Cursor présente le dossier de décision : profil, hypothèses, arborescence, `nextjs-seo` à copier, `shopify-theme-workflow` non installé. Elle valide.
8. Elle lance `/starter-kit-build`. Après accord sur le lot d'installation, Cursor installe, crée les dossiers, commit et pousse, puis prépare la liste de tâches. ClickUp passe par `/clickup-from-context` : prévisualisation, puis un accord séparé sur ce lot de tâches.
9. La première tranche passe ensuite par `feature-spec`, puis `implement-task`.

## Ce que cet exemple ne fait pas

Il ne fournit ni marque, ni prix, ni contenu de page à recopier dans un vrai projet.
