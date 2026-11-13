---
titre: Données, règles et sécurité
description: Biens, offres, back-office, contact, données personnelles, contraintes légales, sécurité, stack pressentie et hypothèses ouvertes.
maj: 2026-11-11
---

# Données, règles et sécurité

Source : l'ancien dossier `docs/` (état au 2026-10-17). Ce qui est déjà dans `PROJET.md` et `DECISIONS.md` n'est pas répété ici.
Légende : « validé » = décidé par l'humain. « pas validé » = hypothèse.

## Coordonnées publiques d'Alfa (déjà en ligne)
- Site actuel : https://www.alfa.fr/
- Siège : 177 boulevard de l'Yser, 76000 Rouen.
- Téléphone : 02 32 08 32 32.
- Horaires : lundi au vendredi, 8h30-12h30 et 14h-17h.
- Facebook : https://www.facebook.com/alfaaffaires/
- Instagram : https://www.instagram.com/alfa_coworking_rouen/

## Biens et immeuble
- Correction du 2026-11-11 (validé) : Alfa n'a des bureaux qu'à Rouen, dans un seul immeuble, au 177 bd de l'Yser. Les noms de villes normandes sont les **noms des bureaux**, pas des lieux.
- Un bien est un bureau ou une salle de cet immeuble. Pas de champ ville.
- Champs d'un bien : nom (ex. Bureau « Fécamp »), étage (ex. 3e, 2A), type (bureau ou salle), prix d'appel HT (peut être vide), état (brouillon ou publié), disponibilité (disponible ou indisponible), visuel, langue.
- Noms de bureaux visibles sur alfa.fr : Fécamp, Dieppe, Le Tréport, Le Cabourg (cartes de l'accueil).
- Les biens et articles vivent dans le back-office. Pas d'import automatique des biens pour l'instant.
- Règles :
  - Un bien indisponible n'est jamais affiché comme libre.
  - État non renseigné : on le traite comme non publiable, jamais comme libre.
  - Prix absent : on le masque. On n'invente pas de montant.

## Offres (textes de l'accueil actuel)
Prix publics = planchers HT, « à partir de ».
- Location ponctuelle : dès 50 € HT.
- Location au mois : dès 480 € HT / mois.
- Permanence téléphonique : dès 80 € HT / mois.
- Domiciliation commerciale : dès 45 € HT / mois.
- Plus un bloc « solution sur-mesure ».
- Un prix affiché est un plancher saisi, pas un devis calculé.
- Reprise telle quelle des textes et des prix : pas validé (à relire avec la com).

## Articles
- Un article : titre, corps, langue, statut (brouillon ou publié).
- Il existe en FR et EN, avec une URL dans chaque langue.
- Les langues sont gérées de façon générique (voir `DECISIONS.md`).

## Back-office : rôles et droits
- Utilisateurs : chargée de communication, commerciaux, dirigeant, manager (validé).
- Droits selon le poste. Le dirigeant et le manager ont un panel plus complet (validé).
- Proposition de départ, pas validée :
  - dirigeant et manager : contenus, demandes, utilisateurs, rôles ;
  - autres postes : biens, articles, demandes ;
  - les intitulés de poste se règlent dans l'admin.
- Publier un bien ou un article exige un compte connecté, vérifié côté serveur.
- Un poste non dirigeant ne voit pas l'écran des utilisateurs.
- La liste exacte des postes n'est pas connue. Si la proposition est fausse, seuls les droits changent, pas le site public.
- Le public lit : biens disponibles et articles publiés. L'admin écrit les biens et articles, et lit les demandes.
- Pas de compte visiteur.

## Demandes de contact
- Source : le formulaire du popup contact (téléphone + formulaire).
- Données : nom, e-mail, téléphone, message.
- Elles sont personnelles. Qui y accède : l'équipe connectée à l'admin.
- Durée de conservation : pas décidée. À fixer.
- Export, correction et suppression : à définir.
- Le champ e-mail du popup d'actualités ne stocke rien en v1 (validé).
- Le compteur de visites (popup Instagram) reste dans le navigateur.

## Contraintes légales et métier
- Garder les pages actuelles de mentions légales et de politique de confidentialité.
- Prix affichés HT et en « à partir de ».
- Photos signées V.HUON : les recopier dans le dépôt peut poser un problème de droit d'auteur. À régler avec la com ou le photographe avant de publier.
- Un dialogue et un badge de cookies existent dans le code (d'après le plan responsive). Ils ne sont pas décrits dans les anciens documents.
- Pas de paiement en ligne (validé). Les documents notent une hypothèse « pas de devis ni de paiement en ligne » à confirmer auprès de la com.

## Sécurité
- Actifs à protéger : fiches biens, articles, demandes de contact, comptes éditeurs.
- Pages publiques en lecture seule. Écriture réservée à l'admin.
- Menaces principales : spam du formulaire, prise de contrôle de l'admin, bien marqué libre à tort, fuite des messages de prospects.
- Contrôles d'accès faits côté serveur à chaque action. Un visiteur ne modifie pas un bien en devinant son identifiant.
- Aucun secret ni donnée réelle dans le dépôt. Fichiers `.env` ignorés, `.env.example` sans vraie valeur.
- Si Supabase : règles d'accès par ligne sur les tables exposées, clé de service réservée au serveur.
- Pas de jeton Instagram ou Meta dans le dépôt. Facebook et Instagram sont des liens sortants.
- Pas de stack trace ni de secret dans les erreurs. Ne pas mettre de données personnelles dans les journaux.
- À définir : suppression d'un compte éditeur, procédure en cas d'incident.
- Cible d'accessibilité WCAG 2.2 AA : pas validée.

## Stack pressentie (pas validé)
- Next.js + Tailwind (le site existant), hébergé sur Vercel, base et connexion via Supabase : pas validé.
- Ni WordPress ni Shopify n'est imposé.
- Ce qui reste à décider : l'outil du back-office (Supabase pressenti), le mécanisme de connexion (Supabase Auth candidat), le coût d'hébergement (non chiffré).
- Séparation front / back logique : une seule app Next.js, avec les accès aux données et secrets dans une couche serveur.
- Un éditeur non développeur doit pouvoir publier sans aide.
- Hébergement et lieu des données : non dits.
- Alternative écartée à ce stade : garder l'outil actuel d'alfa.fr.

## Mesure du succès
- À compter : clics sur le numéro de téléphone et envois du formulaire de contact. Aussi les clics vers Instagram depuis le popup (cible à fixer).
- Valeur de départ : inconnue, aucun outil de mesure sur alfa.fr. Ne pas promettre le pourcentage sans base.
- Fenêtre de mesure après la mise en ligne : à fixer.
- Consentement et outil d'analyse : non décidés.

## Hypothèses encore ouvertes
- Stack Vercel + Supabase : pas validé.
- Pas de paiement ni de devis en ligne : pas validé.
- Textes et prix des 4 offres repris tels quels : pas validé.
- Feed Instagram en intégration simple ou en liens, sans application Meta : pas validé. À tester sur le compte `alfa_coworking_rouen`.
- Droits des rôles (dirigeant, manager, autres postes) : pas validé.
- Droit d'auteur des photos V.HUON : à confirmer.
- Validation métier par la chargée de communication d'Alfa : pas encore faite.
- Budget, date cible, hébergement des données : non dits.
- Durée de conservation des demandes de contact : à décider.
- Ordre de grandeur des performances et de la disponibilité attendues : jamais fixé.

## Plus tard (prévu, pas fait)
- Envoi réel d'e-mails d'actualités, puis ManyChat si retenu : accord séparé.
- Adresses et immeubles par ville.
- Feed Instagram branché sur l'API Meta, seulement si l'intégration simple ne suffit pas.
- Autres langues que FR et EN.
- Pages intérieures au même niveau de finition que l'accueil.
