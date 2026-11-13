---
titre: Design et interface
description: Identité visuelle, tokens, composants, comportements, médias et pages du site Alfa.
maj: 2026-11-11
---

# Design et interface

Source : l'ancien dossier `docs/` (relevé sur alfa.fr le 2026-10-17). Ce qui est déjà dans `PROJET.md` et `DECISIONS.md` n'est pas répété ici.
Légende : « validé » = décidé par l'humain. « pas validé » = hypothèse ou valeur à confirmer.

## Principe
- Le site remplace alfa.fr : même identité, pas de nouvelle charte (validé).
- Le « moderne » vient de la mise en page, du hero, des icônes sociales et du mouvement, pas d'un nouveau look.
- Ton : centre d'affaires accessible et concret, pas « startup générique ».
- Référence de structure pour une page service : https://sedomicilier.fr/services/domiciliation-entreprise. Pour la clarté seulement, pas pour les couleurs.
- Source de la direction artistique : https://www.alfa.fr/ (CSS relevé le 2026-10-17). Les valeurs ci-dessous n'ont pas été confirmées par Alfa : pas validé.

## Couleurs
| Rôle | Valeur | Remarque |
| --- | --- | --- |
| Primaire (marque, liens, téléphone) | `#00A696` = `rgb(0 166 150)` | pas validé |
| Primaire clair (fond dérivé) | `#9CFFF5` = `rgb(156 255 245)` | pas validé |
| Secondaire (texte fort, logo) | `#282828` = `rgb(40 40 40)` | pas validé |
| Fond de page | `#FFFFFF` | pas validé |

- Couleurs d'état (succès, alerte, erreur, info), focus, bordures, ombres, rayons, espacements : jamais relevés. Ne pas les inventer sans accord.

## Typographie
- Texte : Inter. Titres : Outfit. Déjà utilisées sur alfa.fr.
- Licences à confirmer.
- Échelle de tailles (validée le 2026-11-11, référence sofradom.fr), définie dans `src/app/globals.css` :
  - `text-display` (grand titre) : 36 px mobile → 62 px ordinateur, fluide.
  - `text-section` (titres de sections) : 28 px → 42 px, fluide.
  - `text-sm` redéfini à 16 px : c'est la taille minimale du texte courant, du menu et des boutons. Attention, `text-sm` ne vaut donc plus 14 px dans ce projet.
  - Petits textes restés en 12-13 px : badges, dates, légendes, cookies.

## Logo et icônes
- Le logo est le mot ALFA en SVG (SVG inline du header), pas une image.
- Icônes d'interface actuelles : Iconify (`material-symbols:location-on`, `material-symbols:call`, `mingcute:send-plane-fill`), pas des SVG locaux.
- Icônes Facebook et Instagram : à redessiner, plus modernes (demande de départ).

## Structure de l'accueil (ordre voulu)
1. Barre haute colorée : accroche, adresse, téléphone. Pas de bouton contact.
2. Header : logo, menu, icônes Facebook et Instagram.
3. Hero dynamique (plus léger que l'actuel sur mobile).
4. Quatre promesses.
5. « Trouvez l'espace qu'il vous faut ! » (biens, filtre de ville).
6. « Trouvez le service qui vous correspond » (4 services).
7. « Profitez de nos offres Alfa » (offres).
8. Feed Instagram.
9. Contact.
10. Footer : contact, réseaux, mentions, adresse du siège.

- Ces trois titres de section sont conservés tels quels (validé).
- Le code de l'accueil contient aussi, d'après le plan responsive du 2026-10-17 : personas, articles, avis, FAQ, bandeau de contact, badge et dialogue de cookies. Ces blocs ne sont pas dans la spec d'origine.

## Composants et comportements
### Barre haute
- Fond primaire ou secondaire. Adresse, téléphone, accroche. Pas de bouton « Contactez-nous ».
- Texte trop long : il passe à la ligne et ne cache pas le menu.
- Le lien téléphone doit être assez haut pour être touché (24 px au moins).

### Contact sticky (validé)
- Icône fixe en bas à droite, sur toutes les pages publiques, pas dans l'admin.
- Elle ouvre le popup contact : numéro de téléphone + formulaire dans le même popup.
- L'envoi du formulaire montre un chargement, puis un succès ou une erreur.
- En bas de page, elle devient une flèche « haut de page ».
- Elle s'arrête toujours au-dessus du footer, même sur une page courte. Le bouton contact du footer reste.
- Accessibilité : atteignable au clavier. Son nom accessible change (« Contacter Alfa » / « Haut de page »).
- Elle ne chevauche ni le badge de cookies ni un bouton d'action.

### Popup d'actualités (Instagram) (validé)
- Première ouverture du site : aucun popup. Deuxième ouverture : le popup apparaît.
- Il ne s'ouvre jamais au chargement de la toute première visite.
- Le compteur de visites est local au navigateur.
- Fermé, il ne revient pas pendant cette visite.
- Trois choix visuels seulement :
  1. liens vers Facebook et Instagram ;
  2. champ e-mail affiché, mais non envoyé ;
  3. lien pour écrire au compte Instagram.
- Aucun message du type « vous êtes inscrit ». Aucun e-mail n'est enregistré en v1.

### Filtre de biens
- Contrôle discret dans la section espaces de l'accueil.
- Change la ville affichée sans recharger la page.
- Aucun bien dans la ville : état vide géré (pas d'erreur).
- Sur mobile : défilement horizontal clair, avec un indice qu'il y a une suite, cibles de 44 px.

### Cartes de biens
- Image, nom, étage, prix « à partir de » en bas à droite de la carte.
- Prix absent : on le masque, on n'invente pas de montant.
- Une ville s'affiche sans rue. Le boulevard de l'Yser n'apparaît pas sur une carte de bien.
- Un bien indisponible n'est pas montré comme libre.

### Sliders mobiles
- Grilles de biens et d'offres : sliders sous le breakpoint mobile. Sur desktop : grilles.
- Une seule carte : pas de slider.
- Flèches et compteur atteignables. Personas : marge de départ et indice de la carte suivante.

### Offres
- Même contenu qu'aujourd'hui, nouvelle composition.
- Cinq blocs : location ponctuelle, solution sur-mesure, location au mois, permanence téléphonique, domiciliation commerciale.
- Garder les puces. Les regrouper pour pouvoir comparer les offres.

## Responsive
- Zone protégée : 1024 px et plus (breakpoint `lg`). Le desktop ne doit pas changer. À 1024-1279 px, Services, Personas et Offres restent collés aux bords : accepté.
- Zone de travail : 320 à 1023 px. Tailles de test : 320, 360, 390, 768, 1023.
- Le burger du menu reste affiché jusqu'à 1279 px.
- Le header doit tenir à 320 px sans chevauchement ni défilement horizontal.
- Marge latérale du texte : 16 px au moins.
- Cibles tactiles : 24 x 24 px au moins (WCAG 2.2 AA), 44 px pour les actions principales.
- Dialogues : tout tient dans la hauteur d'écran (320 x 568), bouton fermer toujours visible.
- À garder : clavier, focus visible, `prefers-reduced-motion`, version `/en`.
- Les seuils exacts retenus n'ont jamais été écrits dans la spec UX.

## Accessibilité
- Cible proposée : WCAG 2.2 AA (pas validé).
- Popup et filtre utilisables au clavier. Contrastes à contrôler en usage réel.

## Pages et parcours
### Pages publiques
- Accueil : `/` (FR) et `/en` (EN).
- Quatre services : domiciliation commerciale, permanence téléphonique, location de bureaux, salles de réunion. Routes françaises : `/domiciliation-commerciale`, `/permanence-telephonique`, `/location-de-bureaux`, `/salles-de-reunion`, avec une version sous `/en/`.
- Pages légales : `/mentions-legales`, `/politique-de-confidentialite`.
- Prévus dans la spec : Qui sommes-nous, liste des espaces par ville et fiche d'un bien, blog et article, contact.
- Navigation principale : Qui sommes-nous, les 4 services, un lien Blog à ajouter.
- Structure Next.js pressentie : `app/[locale]/` pour le public, `app/admin/` selon le rôle (pas validé).

### Admin
- Équipe : biens, articles, demandes de contact.
- Dirigeant et manager : la même chose, plus les utilisateurs et les rôles.
- L'éditeur arrive sur l'admin des biens.

### Parcours
- Prospect : ouvre l'accueil, lit une offre ou un bien, puis appelle, ouvre le popup contact, ou remonte en haut de page.
- Disponibilité d'un bien : la com ou un commercial ouvre l'admin, change la ville, l'état ou la disponibilité, enregistre. L'accueil ne montre comme libres que les biens disponibles de la ville choisie.
- Deuxième visite : voir « Popup d'actualités ».
- Article : l'éditeur publie en FR et EN. L'article a une URL dans chaque langue.

### États à prévoir sur chaque écran
- Chargement, aucune donnée, erreur récupérable, permission insuffisante, succès avec confirmation.

## Inventaire des médias de l'accueil
Les noms ci-dessous sont les emplacements cibles. Les originaux viennent d'alfa.fr.
- `public/marque/logo.svg` : SVG inline du header.
- `public/marque/` : favicons actuels (`apple-touch-icon.png`, `favicon-32x32.png`, `favicon-16x16.png`, `safari-pinned-tab.svg`).
- `public/accueil/hero/` : `V.HUON-5783-slider.webp`, `V.HUON-5721-slider.webp`, `V.HUON-5809-slider.webp`.
- `public/accueil/promesses/` : `icon-1-img.svg` à `icon-4-img.svg`.
- `public/accueil/espaces/` : cartes Fécamp, Dieppe, Le Tréport, Le Cabourg.
- `public/accueil/services/` : visuels dont les originaux sont `salle_de_reunion.jpg`, `telephone.png`, `locaux.jpg`.
- Les photos sont signées V.HUON : droit d'auteur à confirmer avant de publier (voir `donnees.md`).
- Le hero actuel va jusqu'à 1950 px de large : prévoir une version plus légère sur mobile.

## À vérifier à la recette
- Le contact sticky passe au-dessus du footer sans le recouvrir, puis devient flèche.
- Un bien marqué indisponible n'est plus montré libre sur l'accueil.
- La page anglaise a les mêmes sections que la française.
- Le popup Instagram est absent à la 1re visite, présent à la 2e.
