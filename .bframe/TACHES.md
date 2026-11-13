---
titre: Tâches
description: Ce qu'il y a à faire, du plus proche au plus lointain.
maj: 2026-11-11
---

# Tâches

Une case par tâche, avec son sujet entre parenthèses.

## Maintenant

- [ ] Popup Instagram une seule fois par navigateur (Contact)

## Ensuite

- [ ] Questionnaire, relecture UX : popup contact « Envoyer » inerte → le désactiver avec un message clair (appeler le 02 32 08 32 32) en attendant l'envoi réel (Contact)
- [ ] Questionnaire : bouton « Retour » sur le résultat ; retour du navigateur qui garde les réponses (Questionnaire)
- [ ] Questionnaire : focus déplacé dans le popup de contact à l'ouverture, rôle de fenêtre (Contact)
- [ ] Questionnaire : alléger le bloc e-mail désactivé ; retirer « Profil estimé » du message ou l'afficher ; barre de progression à 0 % au départ ; libellés distincts des 2 cartes bureaux (Questionnaire)
- [ ] Remplacer le brouillon par les questions, profils et objectifs d'Alfa (Questionnaire)

- [ ] Langues lot B : adresses par langue (anglais traduit), sélecteur générique, redirections (Langues)
- [ ] Langues lot C : balises de langue pour Google, plan du site, robots (Langues)
- [ ] Relire les 119 phrases anglaises marquées « À RELIRE » dans `src/content/en/` (légal et cookies par un juriste) (Langues)
- [ ] Supprimer `home-contact.tsx`, composant inutilisé (Nettoyage)
- [ ] Passer toutes les pages en FR + EN (Langues)
- [ ] Onglets services coupés à 320 px dans « Trouvez le service qui vous correspond » (Mobile)
- [ ] Vérifier à l'œil le pied de page et la fenêtre cookies après l'agrandissement des textes (Design)
- [ ] Audit mobile par captures (320, 375, 768 px), puis corrections par lots (Mobile)
- [ ] Retirer les avis de démo avant la mise en ligne (Accueil)
- [ ] Renseigner les prix « à partir de » des bureaux (aujourd'hui « Prix sur demande ») (Espaces)
- [ ] Corriger les étages « 2Aème étage » dans les données des bureaux (Espaces)
- [ ] Relecture UX du 2026-11-13 : brancher l'envoi du formulaire de contact (aujourd'hui il ne fait rien) (Contact)
- [ ] Relecture UX : cibles cliquables à 44 px (pastilles et flèches des articles, liens du pied de page, bouton cookies, boutons « Fermer ») (Accueil)
- [ ] Relecture UX : focus visible sur le champ e-mail du bandeau contact (Accueil)
- [ ] Relecture UX : ne pas ouvrir la popup Actualités tant que le choix cookies n'est pas fait (Contact)
- [ ] Fermer le menu burger quand on clique sur « Prendre rendez-vous » (Accueil)
- [ ] Faire relire les étapes 2 à 6 du parcours du créateur (exactitude juridique) (Accueil)
- [ ] Supprimer le dossier `.playwright-mcp/` (captures d'outil) et l'ajouter au `.gitignore` (Nettoyage)
- [ ] Corriger les 2 erreurs de lint du bouton de contact (Qualité)
- [ ] Rebrancher Vercel sur la version propre (Mise en ligne)

## Plus tard

- [ ] Back-office des biens : état et disponibilité (Back-office)
- [ ] Blog avec articles multilingues créés depuis le back-office (Blog)
- [ ] Compter les clics d'appel et les envois de contact (Mesure)

## Fait

- [x] 2026-11-13 : boutons verts en texte blanc, questionnaire sans en-tête et plus aéré, réponses « Autre » ; profils arrondis, flèches des articles, ordre Instagram (Accueil)

- [x] 2026-11-13 : questionnaire `/trouver-mon-offre` FR/EN (brouillon de 4 questions, résultat service ou 2 bureaux, contact pré-rempli, e-mail « bientôt disponible »), contre-vérifié + relecture UX (Questionnaire)

- [x] 2026-11-13 : mobile (hero image en haut, Promesses masquée, Espaces en carrousel, sans flèches, Services en 2×2) ; Parcours = illustration + bouton « Découvrir votre option ! » (frise gardée, désactivée) ; Instagram en paysage (Accueil)

- [x] 2026-11-13 : pied de page refait sur le modèle sofradom (bouton conseiller → popup, adresse + « S'y rendre », réseaux, colonnes Services et Informations), relecture UX de l'accueil (Accueil)

- [x] 2026-11-11 : cartes Espaces sur le modèle sofradom (image paysage, Rouen + étage, prix, adresse) ; profils validés, intro générale (Accueil)

- [x] 2026-11-11 : espaces en 4 cartes sans filtres, services sans titre visible, langue active sans bordure, profils plus courts et arrondis (5 cartes), parcours centré avec bouton sous les étapes (Accueil)

- [x] 2026-11-11 : langues lot A, un fichier de textes typé par langue dans `src/content/`, français identique avant/après, contre-vérifié (Langues)

- [x] 2026-11-11 : header affiné (survol, langues à droite, sans réseaux), CTA d'appel du hero, personas en carrousel (3 cartes), services en bento (Accueil)

- [x] 2026-11-11 : textes agrandis (titre du hero 36→62 px, titres de sections 28→42 px, texte courant 16 px) (Design)

- [x] 2026-11-11 : hero recentré domiciliation, bouton « Prendre rendez-vous », section « Parcours du créateur » FR + EN (Accueil)

- [x] 2026-11-11 : installer bFrame et créer `.bframe/` (Nettoyage)
- [x] 2026-11-11 : reprendre les infos utiles dans `.bframe/references/` (Nettoyage)
- [x] 2026-11-11 : ranger site-mods dans `.claude/skills/site-mods/` (Nettoyage)
- [x] 2026-11-11 : supprimer l'ancien kit, ses dossiers et ses anciens skills (Nettoyage)
- [x] 2026-11-11 : réécrire le README et `AGENTS.md` (Nettoyage)
- [x] 2026-11-11 : vérifier que le site compile, 15 pages OK (Nettoyage)
