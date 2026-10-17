# Plan responsive — exécution par subagents

- **Status:** DRAFT — À VALIDER
- **Owner:** Shirley
- **Last updated:** 2026-10-17
- **Related:** `../02-design/UI_UX_SPEC.md` (§4, §5, §7), `../05-quality/TEST_STRATEGY.md`

## 1. Objectif et contrainte

Rendre toutes les pages confortables de 320 px à 1023 px, sans aucun changement visible à partir de 1024 px.

- **Zone protégée (desktop) : ≥ 1024 px (`lg`).** Validé par Shirley le 2026-10-17. Conséquence : à 1024–1279, Services, Personas et Offres restent collés aux bords. Hors périmètre.
- **Zone de travail :** 320–1023 px. Tailles de test : 320, 360, 390, 768, 1023.
- La spec UX impose : grilles biens et offres en slider sous le breakpoint mobile ; une seule carte = pas de slider ; contact sticky atteignable au clavier.

## 2. Constats mesurés (dev local, 2026-10-17)

| Constat | Taille | Fichier |
|---|---|---|
| Aucune marge latérale (texte à 0 px du bord) | 360, 768 | `home-personas.tsx` (conteneur `max-w-6xl` sans `px`) |
| Marge droite 0 px | 360, 768 | `home-offers.tsx` ligne 83 (`max-w-6xl` sans `px`) |
| Cadre collé aux bords (0–2 px) | 360, 768 | `home-services.tsx` ligne 57 |
| Texte écrasé à côté du bouton | 360 | `home-instagram.tsx` ligne 125 (`flex justify-between` sans repli) |
| Moitié droite vide (414 px) | 768 | `home-hero.tsx` |
| Sections très longues : Offres 1960 px, Services 1329 px, Avis 1232 px | 360 | offres, services, avis |
| Cibles tactiles < 24 px : points des articles (8 × 8), liens du footer (14–20 px de haut), téléphone de la barre haute (17 px) | 360 | `home-articles.tsx`, `site-footer.tsx`, `site-top-bar.tsx` |
| Header : logo + 2 réseaux + 2 drapeaux + burger ≈ 364 px de contenu | 320 (à confirmer) | `site-header.tsx`, `language-switch.tsx` |

Pas de défilement horizontal de page à 360 et 768. À 1024, avec barre de défilement, la largeur utile était 1009.

## 2 bis. Lot 0 — fait le 2026-10-17

Référence desktop écrite dans `docs/06-delivery/responsive-baseline.json` (9 routes, 1024 / 1280 / 1440 / 1920, `lg` actif à 1024). Elle inclut les fichiers encore non commités : `home-offers.tsx`, `home-reviews.tsx`, `home-content.ts`, `en-dictionary.ts`.

Audit 320 px, les 9 routes :

- Défilement horizontal partout : `scrollWidth` 352 pour une largeur utile de 320. Cause : la rangée du header se termine à 352 px (logo 112 + quatre cibles de 44 + burger). Le burger dépasse. Lot A.
- Menu, sous-menu Services et sous-menu Articles s'ouvrent et restent entre 16 et 304 px. Le menu est dans le flux de la page (`overflow: visible`, environ 670 à 1010 px de haut), sans défilement interne. Lot A.
- Services : cadre de 0 à 320 px. Personas : marge 0 des deux côtés. Offres : marge droite 0. Lot C.
- Avis : 1413 px de haut. Lot D.
- Pages service et pages légales : le contenu a des marges, le débordement vient du header. Liens du pied de page et fil d'Ariane sous 24 px de haut. Lot E.
- Contact : bouton Fermer visible, bouton Envoyer sous le panneau (contenu 825 px, panneau visible 588 px). Lot F.
- Cookies : le dialogue va jusqu'à 340 px, le bouton fermer est en partie hors écran. Lot F.
- Actualités : le dialogue va jusqu'à 336 px, Fermer est visible, les actions tiennent en hauteur. Lot F.

## 3. Règles pour chaque subagent

1. **Ne jamais modifier ni supprimer une classe existante.** Ajouter uniquement des classes préfixées `max-lg:`, `max-md:` ou `max-sm:`. Tailwind v4 les place après les classes de base, donc elles les surchargent sous le seuil. `max-xl:` est interdit : il toucherait 1024–1279.
2. Pas de nouvel élément visible en desktop. Un élément propre au mobile porte `lg:hidden`. Un wrapper ajouté porte `lg:contents`, ou il est évité.
3. Ne pas toucher `src/lib/home-content.ts`, `src/lib/en-dictionary.ts`, ni aucun texte. Si un libellé manque : s'arrêter et le signaler.
4. `globals.css` : seulement dans un bloc `@media (width < 64rem)`. Seul le lot A peut le faire.
5. Ne modifier que les fichiers de son lot. Pas de refactorisation, pas de découpage de composant, pas de dépendance.
6. Garder clavier, focus visible, `prefers-reduced-motion`, version `/en`.
7. Cibles tactiles ≥ 24 × 24 px (WCAG 2.2 AA, 2.5.8), viser 44 px pour les actions principales.
8. Marge latérale du texte ≥ 16 px. Aucun défilement horizontal de page.

Contrôles à lancer par le subagent : `pnpm lint`, `npx tsc --noEmit`, puis vérification navigateur de ses sections à 320, 360, 390, 768 et 1023 px. Rapport : fichiers modifiés, classes ajoutées, résultat réel des contrôles, points non résolus.

## 4. Lots

Les lots A à D touchent des fichiers disjoints et peuvent tourner en parallèle. E et F ensuite.

### Lot 0 — Orchestrateur (pas de subagent)
1. Committer ou mettre de côté les changements en cours (`home-offers.tsx`, `home-reviews.tsx`, `home-content.ts`, `en-dictionary.ts`).
2. Prendre la référence desktop (§5) à 1024, 1280, 1440 et 1920 px sur les 9 routes.
3. Audit complet à 320 px : menu ouvert, sous-menus Services et Articles, popups contact, cookies, actualités. Ajouter les constats aux lots.

### Lot A — Coque du site
Fichiers : `site-top-bar.tsx`, `site-header.tsx`, `ui/menu-picker.tsx`, `ui/menu-picker-services.tsx`, `ui/menu-picker-articles.tsx`, `ui/language-switch.tsx`, `contact-dock.tsx`, `cookie-badge.tsx`, `globals.css`.
- Header tenant à 320 px sans chevauchement (réseaux masqués ou regroupés dans le menu sous `sm`, par exemple).
- Menu mobile : hauteur max avec défilement, sous-menus lisibles, fermeture `Escape` conservée. Le burger reste affiché jusqu'à 1279 px : ne rien changer à son rendu entre 1024 et 1279.
- Barre haute : lien téléphone ≥ 24 px de haut.
- Bouton contact sticky et badge cookies : aucun chevauchement entre eux ni avec un CTA, s'arrête au-dessus du footer.

### Lot B — Haut de l'accueil
Fichiers : `home-hero.tsx`, `home-promises.tsx`, `home-spaces.tsx`, `home-space-card.tsx`.
- Hero à 768 : utiliser la largeur (fin de la moitié vide), images plus basses sur 360.
- Filtres d'espaces : défilement horizontal clair (indice visuel de suite), cibles ≥ 44 px.
- Slider biens : flèches et compteur atteignables, une carte = pas de slider.

### Lot C — Services, personas, offres
Fichiers : `home-services.tsx`, `home-services-icons.tsx`, `home-personas.tsx`, `home-offers.tsx`.
- Ajouter la marge latérale manquante (`max-lg:px-4` ou équivalent) sur les trois sections.
- Offres : réduire la hauteur sur 360 (onglets en slider déjà présents ; resserrer puces et exemples).
- Personas : slider avec marge de départ et indice de carte suivante.

### Lot D — Contenu et preuves
Fichiers : `home-instagram.tsx`, `home-articles.tsx`, `home-reviews.tsx`, `faq-section.tsx`, `home-faq.tsx`, `home-contact-banner.tsx`, `home-contact.tsx`.
- Instagram : texte puis bouton empilés sous `sm`.
- Articles : points de pagination ≥ 24 px de zone cliquable.
- Avis : réduire les 1232 px sur 360 (slider ou cartes compactes).

### Lot E — Pied de page et pages service
Fichiers : `site-footer.tsx`, `service-hero.tsx`, `service-block.tsx`, `service-fact-list.tsx`, `service-info-request.tsx`, `service-page.tsx`, `legal-page.tsx`.
- Liens du footer ≥ 24 px de haut, colonnes lisibles à 320.
- Les 4 pages service et les 2 pages légales auditées à 320 et 768.

### Lot F — Dialogues
Fichiers : `news-prompt.tsx`, `cookie-dialog.tsx`, `cookie-report.tsx`, `ui/contact-picker.tsx`.
- Tenir dans `100dvh` à 320 × 568, bouton fermer toujours visible, champs ≥ 44 px.
- Tableau des cookies lisible sans défilement horizontal.

## 5. Garde desktop (orchestrateur, après chaque lot)

Préparer l'onglet : `Emulation.setEmulatedMedia` avec `prefers-reduced-motion: reduce`, puis `Emulation.setDeviceMetricsOverride` (largeur testée × 800, `mobile: false`). Lancer via `Runtime.evaluate` (`awaitPromise: true`, `returnByValue: true`) :

```js
(async () => {
  scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 800));
  const skip = '[data-site-mods],[data-site-mods-overlay],nextjs-portal,[data-marquee-track],[aria-live],[data-name="Accroche villes"]';
  const h = (s) => { let x = 5381; for (let i = 0; i < s.length; i++) x = ((x * 33) ^ s.charCodeAt(i)) >>> 0; return x.toString(36); };
  const sections = {};
  [...document.querySelectorAll("body header, main section, body footer")].forEach((root, i) => {
    const rr = root.getBoundingClientRect();
    const parts = [];
    [root, ...root.querySelectorAll("*")].forEach((el) => {
      if (el.closest(skip)) return;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      parts.push(`${el.tagName}:${Math.round(r.left)},${Math.round(r.top - rr.top)},${Math.round(r.width)},${Math.round(r.height)}|${cs.fontSize}|${cs.display}|${cs.color}|${cs.backgroundColor}`);
    });
    sections[`${root.getAttribute("aria-labelledby") || root.getAttribute("data-section") || root.tagName}#${i}`] = h(parts.join(";"));
  });
  return { width: innerWidth, docH: document.documentElement.scrollHeight, sections };
})();
```

Critère : empreintes et `docH` identiques à la référence, à 1024, 1280, 1440 et 1920, sur chaque route. Une section qui change désigne le lot fautif : on le corrige avant de lancer le suivant. Script vérifié stable (deux mesures identiques à 1280 px sur l'accueil).

Référence accueil à 1280 px (2026-10-17, avant les changements en cours) : `docH` 7615, `HEADER#0` `99j7n2`, `home-offers-title#6` `1co41mx`. À reprendre au lot 0 après le commit.

## 6. Fin

1. `pnpm lint`, `npx tsc --noEmit`, `pnpm build` (serveur de dev arrêté).
2. Garde desktop sur les 9 routes, FR et EN.
3. Skill `ui-ux-review` à 320, 390 et 768, puis `review-before-done`.
4. Remplir `UI_UX_SPEC.md` §7 avec les seuils réellement retenus.

## 7. Modèle de prompt subagent

```text
Projet : C:\Users\Shirley\Documents\Dev\alfa-website (Next.js 16, Tailwind v4).
Lis AGENTS.md, docs/06-delivery/RESPONSIVE_PLAN.md (§1, §3 et ton lot), docs/02-design/UI_UX_SPEC.md.
Lis le guide utile dans node_modules/next/dist/docs/ si tu touches une API Next.
Lot : <lettre> — fichiers autorisés : <liste>.
Objectifs : <puces du lot + constats du lot 0>.
Règle absolue : la vue ≥ 1024 px ne doit pas changer. Uniquement des classes max-lg:/max-md:/max-sm: ajoutées (max-xl: interdit).
Serveur dev : http://localhost:3000 déjà lancé. Ne lance ni build ni commit.
Contrôles : pnpm lint, npx tsc --noEmit, navigateur à 320/360/390/768/1023.
Rapport en français : fichiers modifiés, classes ajoutées, résultats réels, points non résolus.
```
