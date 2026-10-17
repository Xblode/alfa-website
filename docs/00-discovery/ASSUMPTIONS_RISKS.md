# Hypothèses et risques

- **Status:** DRAFT
- **Owner:** Shirley (proposition)
- **Last updated:** 2026-10-17
- **Related documents:** `OPEN_QUESTIONS.md`, `../01-product/PRD.md`

Une hypothèse permet d'avancer. Elle reste `À VALIDER` tant qu'elle n'est pas confirmée. Un risque a un impact, un signal et une action.

## Hypothèses

| ID | Hypothèse | Pourquoi | Impact si fausse | Comment la vérifier | Statut |
|---|---|---|---|---|---|
| H-001 | Le profil reste Next.js, Vercel et Supabase, avec un back-office. | Site de remplacement, biens, articles, demandes, deux langues. Ni Shopify ni WordPress ne sont imposés. | Un CMS imposé plus tard change l'admin. | Accord explicite sur le dossier de décision. | À VALIDER |
| H-005 | Clos. Contredite par D-007 : e-mail et message Instagram sont prévus, mais seulement en visuel pour l'instant. | — | — | D-007 | Clos |
| H-006 | En v1, `dirigeant` et `manager` ont le panel complet (contenus, demandes, utilisateurs, rôles). Les autres postes gèrent biens, articles et demandes. | La liste exacte des postes n'est pas donnée. | Seuls les droits changent. | Accord sur le dossier, ou une liste de postes. | À VALIDER |
| H-002 | Pas de paiement en ligne dans cette v1. | Le brief ne le demande pas. Les prix sont des « à partir de » HT. | Un tunnel de paiement change la sécurité et le périmètre. | Demander à la com si un devis ou un paiement en ligne est prévu. | À VALIDER |
| H-003 | Les textes et prix des quatre offres de l'accueil actuel sont repris tels quels. | Le brief demande de garder les informations des offres. | Une offre ou un prix faux sur la maquette. | Relire les quatre blocs avec la com. | À VALIDER |
| H-004 | Le feed Instagram de la v1 est un embed ou une série de liens, sans application Meta. | Pas de jeton fourni. | Le bloc feed reste vide ou non conforme à l'attendu. | Tester l'embed du compte `alfa_coworking_rouen`. | À VALIDER |

## Risques

| ID | Risque | Probabilité | Impact | Signal précoce | Action | Propriétaire |
|---|---|---|---|---|---|---|
| R-001 | Clos par D-009. L'adresse de Rouen est le siège. Une ville s'affiche sans rue. | — | — | — | Ne pas inventer d'adresse de bien. | Shirley |
| R-004 | L'écran d'alerte peut laisser croire que l'e-mail est enregistré. | forte | Fausse inscription, donnée personnelle non prévue | Bouton qui dit « vous êtes inscrit » | En v1, les 3 choix s'affichent et ne confirment pas d'inscription. | Shirley |
| R-002 | Photos du site signées V.HUON. Les recopier dans le dépôt peut poser un droit d'auteur. | moyenne | On ne peut pas publier les visuels. | Refus de la com ou du photographe. | Inventaire seulement pendant le cadrage. Copie des fichiers après accord. | Shirley |
| R-003 | La cible +20 à +30 % n'a pas de base. | forte | On ne pourra pas dire si la refonte a marché. | Aucun outil de mesure sur alfa.fr. | Compter clics `tel:` et envois de contact dès la mise en ligne. Ne pas promettre le pourcentage sans base. | Shirley |

## Décisions qui en dépendent

- Sélecteur de ville : retenu. Il filtre de vrais lieux.
- Admin : rôles par poste (D-008). Le détail v1 est H-006.
- Alertes : visuel en v1 (D-007). E-mail réel et ManyChat plus tard.
- Copie des médias dans `public/` : après le dossier de décision, et après un accord sur R-002.
