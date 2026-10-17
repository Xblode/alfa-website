# Product Requirements Document (PRD)

- **Status:** DRAFT
- **Owner:** Shirley (proposition)
- **Last updated:** 2026-10-17
- **Sources:** `../00-discovery/PROJECT_BRIEF.md`, `../00-discovery/OPEN_QUESTIONS.md`

## 1. Résumé et contexte
Alfa, centre d'affaires à Rouen, a un site qui liste déjà bureaux, salles, domiciliation et permanence téléphonique. La v1 proposée modernise l'accueil sans changer la DA, met les offres et les biens en avant, et ajoute un blog plus un admin de disponibilité. Détail : `../00-discovery/PROJECT_BRIEF.md`.

## 2. Objectifs mesurables
| ID | Objectif | Métrique | Cible | Fenêtre de mesure |
|---|---|---|---|---|
| OBJ-01 | Plus de demandes et d'appels | Clics `tel:` + envois du popup contact | +20 à +30 % par rapport à la base | Base inconnue. Fenêtre à fixer après mise en ligne. |
| OBJ-02 | Abonnements Instagram | Clics depuis le popup vers https://www.instagram.com/alfa_coworking_rouen/ | À fixer | Même fenêtre |

## 3. Non-objectifs
- Nouvelle charte, nouvelles couleurs, nouveau logo.
- Paiement ou réservation payante en ligne.
- Troisième langue.
- Envoi réel des alertes e-mail et branchement ManyChat. La v1 montre les trois choix, elle ne les exécute pas.
- Remplacement immédiat de toutes les pages intérieures au niveau de l'accueil.

## 4. Personas / jobs-to-be-done
### Prospect
- Contexte : cherche un bureau, une salle ou un service Alfa, souvent sur mobile.
- Besoin / job à accomplir : comprendre l'offre, voir un prix d'appel, joindre Alfa.
- Déclencheur : recherche, Instagram, bouche-à-oreille.
- Obstacles : contact peu visible, biens peu lisibles, pas de langue anglaise.
- Résultat attendu : appel ou message.

### Chargée de communication
- Contexte : veut un espace pour publier et travailler le référencement.
- Besoin / job à accomplir : publier un article et mettre à jour un bien sans développeur.
- Déclencheur : actualité ou changement de disponibilité.
- Obstacles : pas de blog aujourd'hui ; outil d'édition non tranché (Q-003).
- Résultat attendu : article en ligne en FR et EN ; bien marqué disponible ou non.

## 5. Périmètre du MVP
| ID | Capacité | Priorité | Pourquoi | Dépendances | Mesure de réussite |
|---|---|---|---|---|---|
| F-001 | Accueil modernisé, titres actuels conservés | P0 | Page de la proposition | Contenus et médias alfa.fr | Les titres de section de l'accueil actuel sont présents |
| F-002 | Quatre services en avant | P0 | Demande explicite | Pages services | Les 4 liens sont visibles sans scroll long sur desktop |
| F-003 | Grille de biens par ville réelle, filtre discret, « à partir de » | P0 | Plusieurs villes (D-002) | Adresses Q-006, admin | Le filtre change de ville. Le prix d'appel est visible. |
| F-004 | Offres Alfa, même contenu, nouvelle mise en page | P0 | Garder l'info, revoir le bloc | H-003 | Les 4 offres et leurs prix actuels sont lisibles |
| F-005 | Contact sticky + popup, flèche en bas de page, hors footer | P0 | Appels et demandes | Q-101 | L'icône ne chevauche pas le footer |
| F-006 | Blog éditable FR/EN | P0 | Com et SEO | Q-003 | Un article publié apparaît sur le site |
| F-007 | Admin biens, articles et demandes, pour la com et les commerciaux | P0 | Site de remplacement (D-003, D-004) | Q-005 | Un changement de disponibilité se voit sur l'accueil |
| F-008 | Feed Instagram + popup d'abonnement | P1 | Demande explicite, dépend d'un tiers | H-004 | Un clic mène au compte Instagram |

Définition des priorités : P0 = nécessaire pour tester la proposition de valeur ; P1 = important mais contournable pour le lancement ; P2 = après validation du MVP.

## 6. Parcours principaux
Référencer `../02-design/APP_FLOW.md`. Parcours P0 : prospect sur l'accueil jusqu'à l'appel ou le popup ; éditeur qui change la disponibilité d'un bien ; éditeur qui publie un article.

## 7. Exigences fonctionnelles
Chaque exigence doit avoir un identifiant stable et être testable.

| ID | Exigence | Priorité | Critère d'acceptation | Source / raison |
|---|---|---|---|---|
| FR-001 | L'accueil reprend les titres de sections du site actuel. | P0 | Les titres « Trouvez l'espace qu'il vous faut ! », « Trouvez le service qui vous correspond » et « Profitez de nos offres Alfa » sont présents. | Brief |
| FR-002 | L'accueil montre quatre services : domiciliation commerciale, permanence téléphonique, location de bureaux, salles de réunion. | P0 | Chaque service a un lien vers sa page. | Brief |
| FR-003 | La grille de biens affiche un prix « à partir de » et un contrôle discret pour changer de ville. | P0 | Le contrôle filtre des villes réelles (D-002). Une ville sans adresse n'affiche pas de rue inventée. | D-002 |
| FR-004 | Les offres affichent le contenu actuel : location ponctuelle dès 50 € HT, location au mois dès 480 € HT / mois, permanence dès 80 € HT / mois, domiciliation dès 45 € HT / mois, plus le bloc sur-mesure. | P0 | Ces montants sont visibles tant que H-003 tient. | Site actuel |
| FR-005 | Une icône contact reste en bas à droite, ouvre un popup, et se transforme en flèche vers le haut quand le bas de page est atteint. Elle s'arrête au-dessus du footer. | P0 | En scroll, l'icône ne recouvre pas le footer. Au footer, l'action est « haut de page ». Le bouton contact du footer reste. | Brief |
| FR-006 | Sur mobile, les grilles de biens et d'offres sont des sliders. | P0 | Sous le breakpoint mobile, un geste horizontal fait défiler les cartes. | Brief |
| FR-007 | La barre au-dessus du menu a un fond de couleur et n'a pas de bouton « Contactez-nous ». | P0 | Adresse, téléphone et accroche sont dans cette barre. Le bouton contact n'y est pas. | Brief |
| FR-008 | Une personne de la com ou un commercial, connecté à l'admin, peut modifier un bien, son état et sa disponibilité. | P0 | Un bien marqué indisponible n'est plus présenté comme libre sur l'accueil. | D-004 |
| FR-009 | Un éditeur peut publier un article en français et en anglais. | P0 | L'article publié a une URL dans chaque langue. | Brief |
| FR-010 | Le site public est en français et en anglais, sans troisième langue. | P0 | Le sélecteur n'offre que ces deux langues. Les mêmes sections existent dans les deux. | D-006 |
| FR-011 | À la deuxième ouverture, un popup montre trois choix visuels : suivre les réseaux, laisser un e-mail, envoyer un message au compte Instagram. | P0 | Première visite : pas de popup. Deuxième visite : les trois choix sont visibles. Aucun ne dit « inscription enregistrée ». Aucun e-mail n'est stocké. | D-007 |
| FR-013 | L'adresse du 177 boulevard de l'Yser est affichée comme siège social. Un bien affiche sa ville, pas cette adresse, sauf si un immeuble lui est lié plus tard. | P0 | Le footer parle de siège. Une carte de bien à Rouen n'affiche pas le boulevard de l'Yser tant qu'aucun immeuble n'est saisi. | D-009 |
| FR-014 | L'admin a des rôles. Dirigeant et manager voient aussi la gestion des utilisateurs. Les autres postes connectés gèrent biens, articles et demandes. | P0 | Un poste non dirigeant ne voit pas l'écran des utilisateurs. | D-008, H-006 |
| FR-012 | Le popup contact montre le numéro et un formulaire. | P0 | Les deux sont visibles dans le même popup. L'envoi du formulaire confirme le succès ou l'erreur. | D-005 |

## 8. Règles métier
| ID | Règle | Cas limite | Conséquence si violée |
|---|---|---|---|
| BR-001 | Un bien indisponible n'est pas affiché comme libre. | État non renseigné | Le traiter comme non publiable, pas comme libre. |
| BR-002 | Les prix publics sont des planchers HT, « à partir de ». | Prix absent | Ne pas inventer un montant. Masquer le prix. |
| BR-003 | Le contact sticky ne recouvre jamais le footer. | Page courte, footer déjà visible | L'icône reste au-dessus du footer. |

## 9. Exigences non fonctionnelles
| Domaine | Exigence / seuil | Comment vérifier | Priorité |
|---|---|---|---|
| Performance | [ex. p95 cible à confirmer] | [mesure réelle] | [P0/P1/P2] |
| Disponibilité | [besoin et période] | [monitoring] | [...] |
| Accessibilité | Cible proposée : WCAG 2.2 AA, à confirmer selon le contexte | Audit automatisé + revue manuelle | [...] |
| Compatibilité | [navigateurs/appareils] | [matrice de tests] | [...] |
| Sécurité | Voir `../05-quality/SECURITY_PRIVACY.md` | [tests et contrôles] | [...] |
| Maintenabilité | [contraintes utiles] | [revue / tests] | [...] |

## 10. Données et permissions
- Données nécessaires :
- Propriétaire / responsable :
- Règles de visibilité et de modification :
- Export / suppression / conservation :
- Référence : `../04-data/DATA_MODEL.md`.

## 11. Analytique et mesure
- Événements utiles à mesurer :
- Données à ne pas collecter :
- Consentement / confidentialité :
- Tableau de bord / responsable :

## 12. Risques, dépendances et contraintes
| Risque / dépendance | Probabilité | Impact | Réduction / plan de secours | Responsable |
|---|---|---|---|---|
| [élément] | [faible/moyenne/forte] | [niveau] | [action] | [rôle] |

## 13. Hors périmètre et questions ouvertes
- Hors périmètre :
- Questions non résolues : `../00-discovery/OPEN_QUESTIONS.md`.

## 14. Validation du PRD
- [ ] Problème et utilisateurs compris
- [ ] MVP et non-objectifs clairs
- [ ] Exigences testables
- [ ] Indicateurs mesurables
- [ ] Risques et données considérés
- [ ] Cohérence vérifiée avec l'app flow, UI/UX et TRD
- [ ] Validation propriétaire obtenue
