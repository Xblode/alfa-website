---
name: review-before-done
description: Revue de fin de tâche ou de fonctionnalité sur les critères d'acceptation, les régressions, la sécurité, l'accessibilité et les vérifications réellement exécutées. À utiliser avant de déclarer un travail terminé.
---

# Review Before Done

## Objectif
Dire si le travail répond aux critères approuvés, avec des preuves.

## Prérequis
Demande, critères d'acceptation, diff, `docs/06-delivery/DEFINITION_OF_DONE.md`.

## Entrées
Périmètre déclaré terminé, commandes déjà lancées, profil du projet.

## Workflow
1. Relire la demande, les critères et le diff.
2. Classer chaque critère `pass`, `fail` ou `not verified`.
3. Examiner erreurs, états vides, permissions, validation serveur, secrets, RLS si Supabase, échappement et nonces si WordPress, données de thème si Shopify.
4. Pour l'interface, appliquer les contrôles de `ui-ux-review` sur le périmètre touché.
5. Contrôler que les tests cités ont une commande et un résultat. Une commande absente reste `not verified`.
6. Signaler hors périmètre, migrations risquées, dépendances nouvelles et documentation devenue fausse.
7. Conclure `ready` seulement si les critères essentiels sont `pass`.

## Sorties
Tableau de critères, défauts par sévérité, éléments non vérifiés.

## Réussite
Le verdict cite les preuves. Un critère essentiel en échec ou non vérifié empêche `ready`.
