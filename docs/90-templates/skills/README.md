# Catalogue de skills optionnels

Ces skills sont **disponibles**. Ils ne sont pas installés : Cursor charge les `SKILL.md` qui se trouvent sous `.cursor/skills/`, pas ceux de ce dossier.

## États

| État | Signification |
|---|---|
| `available` | Le dossier est dans ce catalogue, ou une commande d'installation est documentée. |
| `installed` | Le dossier du skill est présent dans `.cursor/skills/` du projet, ou la commande d'installation a été vérifiée. |
| `enabled` | Une nouvelle conversation Cursor montre le skill, ou une règle `alwaysApply: true` porte le comportement. |

La présence d'une ligne dans `SKILLS_SELECTION.md` ne prouve aucun de ces états à elle seule.

## Installation dans un projet

Après validation explicite, copier le dossier du skill :

`docs/90-templates/skills/<nom>/` → `.cursor/skills/<nom>/`

Puis mettre à jour `docs/00-discovery/SKILLS_SELECTION.md`. Ouvrir une nouvelle conversation pour vérifier que Cursor l'indexe.

Skills de ce catalogue :

- `nextjs-seo` — profil Next.js.
- `supabase-security-review` — profil avec Supabase.
- `shopify-theme-workflow` — thème Shopify natif.
- `wordpress-theme-workflow` — thème WordPress.
- `clickup-sync` — met à jour la traçabilité locale. La création de tâches passe par `clickup-from-context`, déjà dans `.cursor/skills/`.

`i-have-adhd` se situe hors de ce catalogue. Son activation par défaut est la règle `.cursor/rules/05-output-style.mdc`. La commande utilisateur est `npx skills add ayghri/i-have-adhd -a cursor -g -y`. Elle ne s'exécute que sur demande explicite.
