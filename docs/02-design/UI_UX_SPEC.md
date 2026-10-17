# UI/UX Specification

- **Status:** DRAFT
- **Owner:** Shirley (proposition)
- **Last updated:** 2026-10-17
- **Related:** `APP_FLOW.md`, `DESIGN_SYSTEM.md`, `../01-product/PRD.md`

## 1. Objectifs UX
- Principale tâche que l'interface doit faciliter : passer d'une offre ou d'un bien à un appel ou un message.
- Principes UX (ex. clarté, rapidité, prévisibilité) : mêmes titres qu'aujourd'hui, contact toujours accessible, prix d'appel visible sur la carte.
- Frictions à réduire : bouton contact seulement dans le header ; grilles illisibles sur mobile ; biens sans prix.
- Compromis explicites : pas de nouveau look de marque. Le moderne vient de la mise en page, du hero, des icônes sociales et du mouvement. Le popup Instagram ne s'ouvre pas au chargement (Q-101).

## 2. Principes visuels et références
- Références / concurrents et ce qu'on reprend ou évite : alfa.fr pour la DA. sedomicilier.fr pour la clarté d'une page service, pas pour les couleurs.
- Ton visuel / émotion : centre d'affaires accessible, concret, pas startup générique.
- Densité d'information : garder les puces des offres. Les regrouper pour qu'une offre se compare aux autres.
- Direction artistique : primary `#00A696`, secondary `#282828`, Inter, Outfit. Logo SVG actuel.
- Références validées : aucune par Alfa. Proposition seulement.

## 3. Utilisateurs et contextes d'usage
- Appareils / tailles d'écran : mobile en slider ; desktop en grille.
- Conditions réseau / environnement : photos lourdes du slider actuel. Prévoir un hero plus léger au build.
- Niveau de familiarité : premier visite et client qui connaît déjà Alfa.
- Besoins d'accessibilité : cible WCAG 2.2 AA proposée, pas encore validée. Le sticky doit rester atteignable au clavier.

## 4. Spécification écran par écran
### Accueil `/` et `/en`
- Objectif : montrer les services, les biens et un contact sans quitter la page.
- Hiérarchie du contenu : barre haute colorée (accroche, adresse, téléphone, pas de bouton contact) ; header avec logo, menu, icônes Facebook et Instagram plus modernes ; hero dynamique ; quatre promesses ; « Trouvez l'espace qu'il vous faut ! » ; « Trouvez le service qui vous correspond » ; « Profitez de nos offres Alfa » ; feed Instagram ; contact ; footer (contact, réseaux, mentions).
- Action principale : ouvrir le popup contact ou appeler.
- Actions secondaires : filtrer les biens, suivre Instagram, lire un service, remonter en haut.
- Données affichées / éditées : biens publiés, prix « à partir de », offres, liens sociaux.
- États loading / empty / error / success / disabled : grille vide si aucun bien disponible ; prix masqué si absent ; popup Instagram déjà vu dans la session.
- Responsive : grilles en slider sous le breakpoint mobile.
- Clavier / focus / lecteur d'écran : popup et filtre utilisables au clavier. L'icône sticky a un nom accessible qui change (« Contacter Alfa » / « Haut de page »).
- Critères d'acceptation UI : l'icône sticky s'arrête au-dessus du footer. Au bas de page, elle devient une flèche. Le bouton contact du footer reste.

### Offres
Reprise du contenu actuel, nouvelle composition. Blocs : location ponctuelle, solution sur-mesure, location au mois, permanence téléphonique, domiciliation commerciale.

### Biens
Cartes image, nom, étage, prix en bas à droite de la carte. Contrôle discret pour changer de groupe. Le libellé « ville » attend Q-001.

## 5. Comportement des composants
| Composant / pattern | Quand l'utiliser | Variantes | Comportement | États / erreurs |
|---|---|---|---|---|---|
| Barre haute | Au-dessus du header | Une | Fond primary ou secondary. Adresse, téléphone, accroche. Pas de bouton contact. | Texte trop long : passe à la ligne, ne cache pas le menu. |
| Contact sticky | Toutes les pages publiques, hors admin | Contact / flèche | Fixe en bas à droite. Ouvre un popup. Devient flèche en bas de page. S'arrête au-dessus du footer. | Popup : chargement de l'envoi, erreur, succès. |
| Filtre de biens | Section espaces de l'accueil | Discret | Change le groupe affiché sans recharger toute la page. | Aucun bien dans le groupe. |
| Slider mobile | Grilles biens et offres | Mobile seulement | Défilement horizontal. | Une seule carte : pas de slider vide. |
| Popup actualités | Deuxième ouverture | Trois choix | 1. Liens Facebook et Instagram. 2. Champ e-mail affiché, non envoyé. 3. Lien pour écrire au compte Instagram. Pas de confirmation d'inscription. | Déjà fermé : pas de retour pendant cette visite. |

## 6. Formulaires et feedback
- Validation : immédiate ou à l'envoi, et pourquoi.
- Emplacement et formulation des erreurs :
- Préservation des saisies en cas d'erreur :
- Confirmation d'une action réussie :
- Confirmations requises pour actions destructrices :

## 7. Responsive
| Breakpoint / classe | Largeur indicative à valider | Adaptations principales |
|---|---|---|
| Mobile | [seuil retenu] | [navigation, ordre, interactions] |
| Tablet | [seuil retenu] | [adaptations] |
| Desktop | [seuil retenu] | [adaptations] |

Éviter de choisir les breakpoints uniquement selon des appareils spécifiques ; décider selon le contenu et tester aux tailles intermédiaires.

## 8. Accessibilité
- Cible proposée : WCAG 2.2 AA, à valider selon contexte et obligations.
- Navigation clavier et ordre de tabulation :
- Focus visible et non masqué :
- Sémantique / labels / messages accessibles :
- Contrastes / zoom / reflow :
- Taille des cibles et alternatives aux gestes :
- Réduction des mouvements :
- Tests automatisés et revue manuelle :

## 9. Validation design
- [ ] Les parcours critiques ont des écrans et états définis.
- [ ] Les actions primaires et secondaires sont différenciées.
- [ ] Les états d'erreur, vide, chargement et permission sont couverts.
- [ ] Le responsive et les comportements clavier sont définis.
- [ ] Les spécifications sont cohérentes avec le design system.
