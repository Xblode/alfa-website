# API Contracts / Interfaces

- **Status:** DRAFT
- **Owner:** [backend / platform]
- **Related:** TRD, DATA_MODEL, FEATURE SPECS

## Conventions communes
- Versionnement :
- Authentification :
- Format de données / dates / fuseaux :
- Enveloppe d'erreur stable :
- Pagination / tri / filtres :
- Rate limiting / quotas :
- Idempotence pour opérations sensibles :
- Trace ID / corrélation :

## Endpoints / opérations
| ID | Méthode / operation | Route | But | Auth / autorisation | Entrée | Sortie | Erreurs |
|---|---|---|---|---|---|---|---|
| API-001 | [GET/POST/…] | [/path] | [objectif] | [droits] | [schema] | [schema] | [codes] |

### API-001 — [nom]
- Méthode et chemin :
- Conditions d'accès :
- Validation d'entrée :
- Réponse réussie :
- Erreurs attendues :
- Limites / pagination :
- Effets de bord :
- Idempotence / retry :
- Exemples synthétiques sans données réelles :
- Tests de contrat :

## Webhooks / intégrations (si pertinent)
- Vérification de signature :
- Rejeu et idempotence :
- Retry / dead letter :
- Timeouts :

## Contrôle de cohérence
- [ ] Les contrats correspondent aux parcours et critères du PRD.
- [ ] Chaque opération protégée définit son autorisation.
- [ ] Entrées, sorties et erreurs sont typées et documentées.
- [ ] Les changements incompatibles sont versionnés ou migrés.
