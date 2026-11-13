---
titre: Questionnaire d'orientation
description: Brouillon des questions, réponses et règles de la page /trouver-mon-offre. À remplacer par les questions d'Alfa.
maj: 2026-11-13
---

# Questionnaire d'orientation (brouillon)

Le code vit dans `src/content/fr/quiz.ts`, `src/content/en/quiz.ts` et `src/lib/quiz-recommend.ts`. Alfa fournira ses propres questions, profils et objectifs ; à terme, tout sera modifiable dans le back-office.

Sigles : DOMI = domiciliation commerciale, PERM = permanence téléphonique, BUR = location de bureaux, SALLE = salles de réunion.

## Règle de décision
1. On additionne les points de chaque réponse, par service et par profil.
2. Le service qui a le plus de points gagne. En cas d'égalité, l'ordre DOMI, PERM, BUR, SALLE départage. Sans aucun point, c'est BUR.
3. Si BUR gagne, le résultat est « 2 bureaux » : les 2 premiers bureaux disponibles (règle provisoire). Sinon, le résultat est « 1 service ».
4. Le profil est celui qui a le plus de points. Sans aucun point, pas de profil.
5. Ensuite, deux choix : « Contacter un conseiller » ou « Laisser mon e-mail pour être recontacté ». Rien n'est enregistré pour l'instant.

## Questions et réponses

### Q1 « Vous êtes ? »
| Réponse | Service | Profil |
|---|---|---|
| Praticien ou thérapeute | BUR +1 | praticien +2 |
| Consultant ou indépendant | SALLE +1 | consultant +2 |
| Dirigeant d'entreprise | — | dirigeant +2 |
| Créateur d'entreprise | DOMI +1 | créateur +2 |
| Artisan ou commercial en déplacement | PERM +1 | nomade +2 |
| Autre | — | — |

### Q2 « De quoi avez-vous besoin ? »
| Réponse | Service |
|---|---|
| Une adresse pour mon entreprise | DOMI +3 |
| Quelqu'un qui répond à mes appels | PERM +3 |
| Un bureau pour travailler | BUR +3 |
| Une salle pour recevoir ou réunir | SALLE +3 |
| Je ne sais pas encore | — |
| Autre besoin | — |

### Q3 « À quelle fréquence ? »
| Réponse | Service |
|---|---|
| Une fois de temps en temps | SALLE +1 |
| Quelques fois par mois | SALLE +1 |
| Chaque semaine | BUR +1 |
| Tous les jours | BUR +2 |

### Q4 « Pour quand ? »
| Réponse | Service |
|---|---|
| Dès que possible | BUR +1 |
| Dans le mois | — |
| Dans quelques mois | DOMI +1 |
| Je me renseigne | — |

## Quatre parcours exemples (vérifiés par le code)
| Réponses | Résultat | Profil |
|---|---|---|
| Créateur / adresse / de temps en temps / dans quelques mois | Domiciliation commerciale | créateur |
| Praticien / bureau / chaque semaine / dès que possible | 2 bureaux : Fécamp et Le Tréport | praticien |
| Artisan en déplacement / appels / quelques fois par mois / dans le mois | Permanence téléphonique | nomade |
| Consultant / salle / de temps en temps / dans le mois | Salles de réunion | consultant |

## Points à revoir
- Un dirigeant qui répond « je ne sais pas encore » obtient des bureaux par défaut : à revoir avec Alfa.
- Les points sont écrits deux fois (FR et EN). Le code oblige qu'ils soient identiques, mais avant de brancher le back-office, il faudra les garder à un seul endroit.
