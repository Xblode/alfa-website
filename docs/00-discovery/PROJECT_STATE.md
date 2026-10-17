# État du cadrage

Mémoire courte du projet. La mettre à jour à chaque tour de `/starter-kit`. Le détail reste dans les documents de domaine. Ne pas recopier ces documents ici.

- **Status:** DRAFT
- **Last updated:** 2026-10-17
- **Practice check:** 2026-10-17 — Stellary ; AWS Prescriptive Guidance ; modèle `FIRST_PROMPT.md`
- **Build:** proposé
- **Code existant:** aucun. Site à remplacer : https://www.alfa.fr/.

## Décisions

Validées par Shirley le 2026-10-17.

- Site de remplacement, FR + EN, DA actuelle, titres d'accueil conservés.
- Biens = produits dans plusieurs villes, y compris Rouen. L'adresse du 177 boulevard de l'Yser est le siège, pas l'adresse d'un bien.
- Pas d'adresse collée à une ville pour l'instant. Le modèle prévoit plusieurs immeubles par ville, plus tard.
- Admin à rôles selon le poste. Panel plus complet pour dirigeant et manager.
- Popup contact réel : téléphone + formulaire.
- À la 2e ouverture : 3 choix visuels (réseaux, e-mail, message Instagram). Envoi e-mail et ManyChat : plus tard.

## Hypothèses

- [À VALIDER] H-001 — Vercel + Supabase. Ni WordPress ni Shopify imposés.
- [À VALIDER] H-002 — Pas de paiement en ligne.
- [À VALIDER] H-003 — Textes et prix des offres actuelles repris tels quels.
- [À VALIDER] H-004 — Feed Instagram sans jeton Meta.
- [À VALIDER] H-006 — V1 : rôle `dirigeant` et `manager` (panel complet : contenus, demandes, utilisateurs). Autres postes : biens, articles, demandes. Les intitulés de poste se règlent dans l'admin.

## Documents

| Document | État | Section touchée |
|---|---|---|
| `PROJECT_BRIEF.md` | assez pour décider | siège, alertes visuelles |
| `OPEN_QUESTIONS.md` | assez pour décider | D-007 à D-009 |
| `ASSUMPTIONS_RISKS.md` | assez pour décider | H-005 clos, H-006 |
| `PRD.md` | assez pour décider | alertes, rôles, siège |
| `APP_FLOW.md` | en cours | 2e visite, 3 choix |
| `UI_UX_SPEC.md` | en cours | popup alertes visuel |
| `DESIGN_SYSTEM.md` | en cours | tokens |
| `TRD.md` | assez pour décider | candidat non verrouillé |
| `DATA_MODEL.md` | en cours | siège, ville, immeuble |
| `API_CONTRACTS.md` | pas encore utile | |
| `TEST_STRATEGY.md` | en cours | popup sans envoi |
| `SECURITY_PRIVACY.md` | en cours | pas de collecte d'alerte en v1 |
| `ROADMAP.md` | en cours | technique d'alerte plus tard |

## Arborescence

Next.js, `app/[locale]/` public, `app/admin/` selon le rôle. Dossiers réels seulement après accord sur ce dossier, via `/starter-kit-build`.

- Public : accueil, 4 services, qui-sommes-nous, espaces par ville, fiche bien, blog, contact, mentions
- Admin équipe : biens, articles, demandes
- Admin dirigeant / manager : la même chose, plus utilisateurs et rôles
- `public/` : médias au build

## Prochaines questions

Aucune. L'accord sur le dossier ci-dessous débloque le build.

## Dossier de décision

**Retenu.** Site Alfa de remplacement. Accueil modernisé, 4 services, biens par ville, offres actuelles, blog FR/EN, contact sticky, admin à rôles. Siège affiché à part. Alertes : maquette des 3 choix, sans envoi.

**Hypothèses.** H-001 à H-004 et H-006. Si H-006 est faux, seuls les droits changent, pas le site public.

**Skills à copier après oui.** `nextjs-seo`, `supabase-security-review`.

**Pas installé.** Shopify, WordPress, ManyChat, fournisseur d'e-mail, paiement, `clickup-sync`.

## ClickUp

- Espace : Projets
- Dossier : absent
- Listes vues : aucune lue
- Dernier lot : aucun
