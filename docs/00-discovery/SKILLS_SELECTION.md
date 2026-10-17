# Sélection des skills

- **Status:** DRAFT
- **Owner:** [rôle]
- **Last updated:** 2026-10-16
- **Related documents:** `../../.cursor/skills/`, `../90-templates/skills/README.md`

`available` : le skill est dans le dépôt ou une commande est documentée.  
`installed` : les fichiers sont au bon endroit, ou la commande a été exécutée et son résultat contrôlé.  
`enabled` : une nouvelle conversation Cursor le propose, ou une règle `alwaysApply: true` porte le comportement.

Contrôle réalisé le 2026-10-16 sur les fichiers du kit. L'interface Customize de Cursor n'a pas été ouverte pendant cette vérification : la colonne `enabled` le dit.

| Skill | Source | Référence | available | installed | enabled | Note |
|---|---|---|---|---|---|---|
| starter-kit | `.cursor/skills/starter-kit` | kit local | oui | oui, dossier présent | à confirmer : commande `/starter-kit` dans une nouvelle conversation | cadrage dans le chat |
| starter-kit-build | `.cursor/skills/starter-kit-build` | kit local | oui | oui, dossier présent | à confirmer : commande `/starter-kit-build` dans une nouvelle conversation | après le dossier de décision |
| project-discovery | `.cursor/skills/project-discovery` | kit local | oui | oui, dossier présent | à confirmer : `/project-discovery` dans une nouvelle conversation | chargement manuel seulement |
| project-bootstrap | `.cursor/skills/project-bootstrap` | kit local | oui | oui, dossier présent | à confirmer : `/project-bootstrap` dans une nouvelle conversation | chargement manuel seulement |
| feature-spec | `.cursor/skills/feature-spec` | kit local | oui | oui, dossier présent | à confirmer dans une nouvelle conversation | workflow |
| implement-task | `.cursor/skills/implement-task` | kit local | oui | oui, dossier présent | à confirmer dans une nouvelle conversation | workflow |
| ui-ux-review | `.cursor/skills/ui-ux-review` | kit local | oui | oui, dossier présent | à confirmer dans une nouvelle conversation | workflow |
| review-before-done | `.cursor/skills/review-before-done` | kit local | oui | oui, dossier présent | à confirmer dans une nouvelle conversation | workflow |
| clickup-from-context | `.cursor/skills/clickup-from-context` | ClickUp Workflow Guard, 2026-10-16 | oui | oui, dossier présent | partiel : règle `.cursor/rules/clickup-write-guard.mdc` en `alwaysApply: true` ; la commande se confirme dans une nouvelle conversation | documents et tâches, prévisualisation d'abord |
| project-start | `.cursor/skills/project-start` | kit local | oui | oui, dossier présent | à confirmer : `/project-start` dans une nouvelle conversation | une seule prochaine commande |
| project-sync | `.cursor/skills/project-sync` | kit local | oui | oui, dossier présent | à confirmer : `/project-sync` dans une nouvelle conversation | écarts de documents, lot avant écriture |
| capture | `.cursor/skills/capture` | kit local | oui | oui, dossier présent | à confirmer : `/capture` dans une nouvelle conversation | un élément en vrac |
| project-status | `.cursor/skills/project-status` | kit local | oui | oui, dossier présent | à confirmer : `/project-status` dans une nouvelle conversation | lecture seule |
| session-close | `.cursor/skills/session-close` | kit local | oui | oui, dossier présent | à confirmer : `/session-close` dans une nouvelle conversation | résumé, écriture après oui |
| project-review | `.cursor/skills/project-review` | kit local | oui | oui, dossier présent | à confirmer : `/project-review` dans une nouvelle conversation | rapport d'écarts |
| nextjs-seo | `docs/90-templates/skills/nextjs-seo` | kit local | oui | non | non | copier après accord |
| supabase-security-review | `docs/90-templates/skills/supabase-security-review` | kit local | oui | non | non | copier après accord |
| shopify-theme-workflow | `docs/90-templates/skills/shopify-theme-workflow` | kit local | oui | non | non | copier après accord |
| wordpress-theme-workflow | `docs/90-templates/skills/wordpress-theme-workflow` | kit local | oui | non | non | copier après accord |
| clickup-sync | `docs/90-templates/skills/clickup-sync` | kit local | oui | non | non | traçabilité locale seulement ; ne pas l'utiliser pour créer des tâches |
| i-have-adhd | `~/.agents/skills/i-have-adhd` | ayghri/i-have-adhd, skill utilisateur, 2026-10-16 | oui | oui, `npx skills ls -g` | partiel : règle projet `alwaysApply: true` ; le skill attend `/i-have-adhd` | pas dans le dépôt |

## Personnalisation de ce projet

Noter ici les skills copiés, la date, et ceux désactivés. Désactiver le style de sortie : dans `.cursor/rules/05-output-style.mdc`, mettre `alwaysApply: false` et retirer la ligne `description` (sinon l'agent peut encore charger la règle), puis écrire `non` dans la colonne `enabled` de la ligne `i-have-adhd`. Cette modification concerne le projet copié, pas le dépôt source du kit.

## Installation vérifiée

`npx skills add ayghri/i-have-adhd -a cursor -g -y`

Résultat du 2026-10-16 : skill utilisateur dans `~/.agents/skills/i-have-adhd`. `npx skills ls -g` l'affiche pour Cursor. La copie projet a été retirée. Une nouvelle conversation est nécessaire pour qu'il apparaisse dans `/`.
