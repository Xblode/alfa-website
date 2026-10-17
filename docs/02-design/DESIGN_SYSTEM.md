# Design System — Working Specification

- **Status:** DRAFT
- **Owner:** Shirley (proposition)
- **Last updated:** 2026-10-17
- **Source:** CSS live `https://www.alfa.fr/build/web/assets/app-38dfe045.css`, relevé le 2026-10-17. À VALIDER.

> Ce document définit les tokens et règles à implémenter. Les valeurs exactes doivent être validées dans le contexte de marque du projet.

## 1. Principes
- Principes de marque :
- Densité / rythme :
- Niveau de contraste et de hiérarchie :
- Règles de cohérence :

## 2. Tokens
| Token | Rôle | Valeur | Mode / contexte | Validé ? |
|---|---|---|---|---|
| `color.brand.primary` | Marque, liens, téléphone | `#00A696` `rgb(0 166 150)` | clair | Non |
| `color.brand.primary-100` | Fond clair dérivé | `#9CFFF5` `rgb(156 255 245)` | clair | Non |
| `color.brand.secondary` | Texte fort, logo | `#282828` `rgb(40 40 40)` | clair | Non |
| `color.surface.default` | Fond de page | `#FFFFFF` | clair | Non |
| `type.body` | Texte | Inter | global | Non |
| `type.heading` | Titres | Outfit | global | Non |

Définir les couleurs sémantiques (success, warning, danger, info), focus, bordures, ombres, rayons, espacements, typographie, icônes et motion. Vérifier les contrastes en usage réel.

## 3. Typographie
- Familles et licences : Inter pour le texte, Outfit pour les titres. Déjà utilisées sur alfa.fr. Licences à confirmer au build.
- Échelle de tailles : non relevée dans le détail. Ne pas inventer une nouvelle échelle.
- Graisses et line-height : non figées.
- Usage des majuscules / longueur des lignes : le logo est le mot ALFA en SVG, pas une image.

### Inventaire accueil à copier au build
Pas de fichiers dans `public/` pendant le cadrage. Noms cibles = emplacement d'origine.

- `public/marque/logo.svg` — SVG inline du header
- `public/marque/` — favicons actuels (`apple-touch-icon.png`, `favicon-32x32.png`, `favicon-16x16.png`, `safari-pinned-tab.svg`)
- `public/accueil/hero/` — `V.HUON-5783-slider.webp`, `V.HUON-5721-slider.webp`, `V.HUON-5809-slider.webp`
- `public/accueil/promesses/` — `icon-1-img.svg` à `icon-4-img.svg`
- `public/accueil/espaces/` — cartes Fécamp, Dieppe, Le Tréport, Le Cabourg
- `public/accueil/services/` — visuels dont les originaux sont `salle_de_reunion.jpg`, `telephone.png`, `locaux.jpg`
- Icônes d'interface actuelles : Iconify (`material-symbols:location-on`, `material-symbols:call`, `mingcute:send-plane-fill`), pas des SVG locaux. Facebook et Instagram sont à redessiner, plus modernes.

## 4. Composants de base
Pour chaque composant : rôle, variants, tailles, states, comportement clavier, responsive, erreurs et exemples d'usage.
- Button
- Text field / textarea / select
- Checkbox / radio / switch
- Dialog / popover / menu
- Tabs / navigation
- Card / list / table
- Toast / inline alert / tooltip
- Loading / skeleton / empty state

## 5. Conventions d'implémentation
- Source de vérité des tokens :
- Stratégie thèmes / modes :
- Conventions de nommage :
- Répertoire des composants :
- Composants tiers autorisés :
- Règles pour éviter les styles ad hoc :

## 6. Contrôle qualité
- [ ] Contrastes contrôlés
- [ ] États focus / hover / pressed / disabled / loading / error couverts
- [ ] Éléments interactifs utilisables au clavier
- [ ] Tokens cohérents entre composants
- [ ] Mobile et tailles intermédiaires vérifiés
