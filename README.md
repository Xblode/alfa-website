# Site Alfa

Refonte du site d'Alfa, centre d'affaires à Rouen. Elle remplace alfa.fr.

Le but : qu'un prospect trouve en quelques secondes le bureau, la salle de réunion, la domiciliation ou la permanence téléphonique qui lui convient, et qu'il appelle ou écrive sans chercher.

## Lancer le site

```bash
npm install     # une seule fois
npm run dev     # lance le site en local
```

Puis ouvrir http://localhost:3000.

Pour vérifier que tout est correct avant une mise en ligne : `npm run build`.

## Où sont les choses

- `src/app/` : les pages du site.
- `src/components/` : les morceaux d'interface. `organisms/` (grands blocs : en-tête, sections de l'accueil, pied de page), `ui/` (petits éléments : sélecteurs, lien d'accueil, changement de langue), `shared/` (formes partagées).
- `src/lib/` : les contenus (textes de l'accueil, des services, des pages légales), les traductions et quelques utilitaires.
- `public/` : les images et le logo.
- `.bframe/` : la mémoire du projet.
  - `PROJET.md` : le cap (pourquoi, pour qui, MVP).
  - `ETAT.md` : où on en est, sujet par sujet.
  - `DECISIONS.md` : les décisions prises.
  - `IDEES.md` : les idées notées pour plus tard.
  - `TACHES.md` : les tâches à faire.
  - `references/` : le détail (`design.md` pour l'interface, `donnees.md` pour les données).
- `.claude/skills/site-mods/` : un outil de dev (panneau flottant pour ajuster l'interface). Il n'apparaît qu'en local, jamais en production.

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4.

Hébergement prévu sur Vercel. Base de données pas encore choisie (Supabase est pressenti, rien n'est validé).

## Langues

Le site existe en français et en anglais.
