# Roadmap / Delivery Plan

- **Status:** DRAFT
- **Owner:** Shirley (proposition)
- **Last updated:** 2026-10-17

## Principes
- Prioriser par valeur utilisateur, risque réduit et apprentissage ; pas par facilité technique seule.
- Livrer en tranches verticales capables de produire un résultat vérifiable.
- Garder l'architecture suffisamment simple pour les besoins présents ; réviser les hypothèses avec des preuves.

## Phases
| Phase | Résultat utilisateur | Inclus | Dépendances | Risques | Critère de sortie |
|---|---|---|---|---|---|
| 0 — Cadrage | Dossier de décision | Docs | Accord de Shirley | H-006 encore large | Oui sur le dossier, puis `/starter-kit-build` |
| 1 — Accueil | Prospect voit offres, biens et contact | Accueil FR, sticky, offres, grille | Phase 0, médias | R-002 | Parcours mobile vérifié |
| 2 — Contenu | Un poste publie un article et un état de bien | Admin à rôles, blog, anglais | D-008, H-006 | Droits trop larges | Un article et un bien mis à jour sans développeur |
| 3 — Suite | Alertes réellement envoyées | E-mail, puis ManyChat si retenu. Immeubles et adresses. | V1 visuelle validée | Un envoi sans accord | Accord séparé |

## Première tranche verticale
- Problème utilisateur ciblé : sur l'accueil, trouver une offre et joindre Alfa.
- Parcours bout en bout : barre haute, hero, quatre services, biens, offres, contact sticky.
- API / données : contenu d'offres repris du site actuel. Biens : jeu d'exemple tant que l'admin n'est pas là.
- Observabilité : pas dans cette tranche.
- Tests : sticky hors footer, slider mobile, titres de sections présents.
- Hors périmètre : blog, admin, anglais, copie définitive des photos si R-002 n'est pas tranché.
- Définition de succès : un prospect comprend les 4 services et peut ouvrir le contact sans que l'icône passe sur le footer.

## Risques et arbitrages
| Risque | Signal précoce | Mitigation | Déclencheur de réévaluation |
|---|---|---|---|
| [risque] | [signal] | [action] | [seuil] |
