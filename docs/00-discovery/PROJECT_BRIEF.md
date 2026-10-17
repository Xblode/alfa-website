# Project Brief

- **Status:** DRAFT
- **Owner:** Shirley (proposition) — validation métier : chargée de communication d'Alfa, pas encore faite
- **Last updated:** 2026-10-17
- **Related documents:** `OPEN_QUESTIONS.md`, `ASSUMPTIONS_RISKS.md`, `../01-product/PRD.md`

> Décris le produit et le problème. Évite de transformer trop tôt toutes les idées en fonctionnalités.

## 1. Résumé en une phrase
Proposition de refonte du site d'Alfa (centre d'affaires à Rouen) : même identité, accueil plus clair, offres et biens mieux mis en avant, blog pour la communication, pour augmenter les demandes et les appels.

## 2. Contexte et problème
- Situation actuelle : site en ligne https://www.alfa.fr/. Alfa loue des bureaux et des salles, et vend domiciliation commerciale et permanence téléphonique. Adresse publiée : 177 boulevard de l'Yser, 76000 Rouen. Téléphone : 02 32 08 32 32. Horaires : lundi–vendredi 8h30–12h30 et 14h–17h. Facebook : https://www.facebook.com/alfaaffaires/. Instagram : https://www.instagram.com/alfa_coworking_rouen/.
- Problème observé : la chargée de communication envisage une refonte. L'accueil actuel montre mal les offres et les biens. Il n'y a pas d'espace blog pour le référencement et la communication.
- Solutions ou contournements existants : le site actuel. Les biens y sont déjà listés (noms de villes normandes, étage, cartes).
- Pourquoi le résoudre maintenant : ce site remplace alfa.fr (D-003). Ce n'est pas une maquette.

## 3. Utilisateurs et parties prenantes
- Utilisateur principal : prospect qui cherche un bureau, une salle, une domiciliation ou une permanence téléphonique.
- Utilisateurs secondaires : lecteurs du blog ; personnes qui arrivent par Instagram.
- Administrateurs / opérateurs : chargée de communication et commerciaux, dans le même panel admin (D-004). Droits identiques ou non : Q-005.
- Besoins, motivations et frustrations : voir l'offre et un prix « à partir de », savoir si un bien est disponible, appeler ou écrire sans chercher le bouton.
- Utilisateurs exclus ou cas non ciblés : paiement en ligne (H-002). Réservation instantanée non demandée.

## 4. Proposition de valeur
- Promesse principale : trouver une offre Alfa et un espace, puis appeler ou écrire, en français ou en anglais.
- Différence par rapport aux alternatives : même marque qu'aujourd'hui, parcours plus direct. Référence UX services : https://sedomicilier.fr/services/domiciliation-entreprise. Cette référence ne change pas la DA.
- Ce qui rendrait le produit inutile : une maquette qui ne montre pas les offres, les biens et un moyen de contact visibles sur mobile.

## 5. Objectifs et mesures de succès
| Objectif | Indicateur | Valeur initiale connue | Cible | Horizon | Méthode de mesure |
|---|---|---|---|---|---|
| Plus de demandes et d'appels depuis le site | Clics `tel:` + envois du popup contact | inconnue | +20 à +30 % | après mise en ligne, fenêtre à fixer | comptage avant / après |
| Abonnements Instagram | Clics vers le profil depuis le popup | inconnue | à fixer | idem | liens sortants |

La cible +20 à +30 % est demandée. La base actuelle n'est pas connue.

## 6. Portée initiale
### Must-have (MVP)
- [ ] Accueil proche de l'actuel, plus moderne, titres de sections conservés
- [ ] Quatre services en avant : domiciliation commerciale, permanence téléphonique, location de bureaux, salles de réunion
- [ ] Section biens avec filtre de ville discret et prix « à partir de »
- [ ] Section offres revue, contenu des offres conservé
- [ ] Barre haute colorée, sans bouton contact
- [ ] Hero plus dynamique ; footer contact et réseaux
- [ ] Icône contact sticky, popup ; en bas de page elle devient flèche haut ; elle ne recouvre pas le footer
- [ ] Grilles en slider sur mobile
- [ ] Section feed Instagram et section contact
- [ ] Popup d'abonnement Instagram
- [ ] Blog / articles éditables
- [ ] Back-office : biens, état, disponibilité
- [ ] Français et anglais seulement (D-006)
- [ ] Reprise des contenus publics, du logo, des photos et des SVG de l'accueil

### Nice-to-have / plus tard
- [ ] Autres langues que FR et EN
- [ ] Pages intérieures au même niveau de finition que l'accueil (après la v1 accueil)
- [ ] Feed Instagram connecté à l'API Meta si l'embed ne suffit pas

### Explicitement hors périmètre
- [ ] Changement de couleurs, de typo ou de logo
- [ ] Paiement en ligne (H-002)
- [ ] Boutique

## 7. Scénarios principaux
1. **Quand** un prospect arrive sur l'accueil, **il veut** voir les 4 services, une offre et un bureau disponible, **afin de** appeler ou ouvrir le popup contact.
2. **Quand** la chargée de communication a un sujet, **elle veut** publier un article FR/EN, **afin de** alimenter le blog et le référencement.
3. **Quand** un bureau change de disponibilité, **l'opérateur veut** mettre à jour son état, **afin que** la grille d'accueil affiche la bonne info.

## 8. Contraintes

Profil pressenti : Vercel + Supabase, à confirmer. Critères : `../03-architecture/STACK_PROFILES.md`.

- Plateformes / navigateurs / appareils : mobile d'abord pour les grilles (slider). Desktop : grilles.
- Langues et localisation : français et anglais seulement (D-006).
- Budget / coûts récurrents : non dit.
- Date cible / disponibilité : non dite. C'est d'abord une proposition.
- Compétences, maintenance et exploitation : la com doit pouvoir publier sans développeur (Q-003).
- Intégrations / fournisseurs imposés : Instagram, Facebook. Téléphone affiché.
- Contraintes légales, contractuelles ou métier : pages actuelles mentions légales et politique de confidentialité à conserver. Prix affichés HT, « à partir de ».
- Hébergement / résidence des données : non dit. Candidat Vercel + Supabase.

## 9. Données et confidentialité
- Quelles données sont indispensables ? Biens (nom, visuel, étage, prix d'appel, état, disponibilité). Offres (texte actuel). Articles. Coordonnées publiques déjà en ligne.
- Y a-t-il des données personnelles, sensibles ou de paiement ? Oui : le formulaire de contact. Le popup d'actualités montre un e-mail mais ne le stocke pas en v1 (D-007). Pas de paiement connu.
- Qui peut consulter, modifier, exporter ou supprimer chaque donnée ? Public : biens disponibles et articles publiés. Admin : écriture biens et articles, lecture des demandes.
- Durée de conservation / suppression : à déterminer pour les demandes de contact.

## 10. Modèle économique et opérations (si pertinent)
- Payeur / modèle économique : Alfa. Le site ne vend pas en ligne.
- Coûts variables : hébergement, éventuel compte Meta pour le feed.
- Support et modération : articles et fiches biens.
- Rôles d'administration : au moins un rôle éditeur. Détail : Q-003.

## 11. Références
- Produits, concurrents ou inspirations : https://sedomicilier.fr/services/domiciliation-entreprise (structure d'une page service, pas la DA).
- Références visuelles : https://www.alfa.fr/ est la source. Couleur primary `rgb(0 166 150)` soit `#00A696`. Secondary `#282828`. Texte : Inter. Titres : Outfit. Logo : SVG inline du header.
- Liens / documents : inventaire médias accueil dans `../02-design/DESIGN_SYSTEM.md`. Copie dans `public/` au build, pas pendant le cadrage.

## 12. Hypothèses connues
Voir `ASSUMPTIONS_RISKS.md`. Ne pas dupliquer le tableau ici.

## 13. Définition initiale du succès
Le projet est suffisamment réussi pour le MVP lorsque :
- L'accueil mobile et desktop montre les 4 services, les offres (textes actuels), des biens filtrables, un contact sticky qui ne passe pas sur le footer, et le blog.
- Un éditeur change la disponibilité d'un bien et le statut se voit sur l'accueil.
- Les pages existent en français et en anglais.
- Les clics d'appel et les envois de contact sont comptés, pour comparer ensuite au +20 à +30 %.
