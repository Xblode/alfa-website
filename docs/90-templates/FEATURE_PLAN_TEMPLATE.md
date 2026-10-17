# Feature Implementation Plan — [Nom]

- **Spec:** [lien vers la spec approuvée]
- **Status:** DRAFT
- **Owner:** [rôle]

## 1. Approche retenue
- Solution de haut niveau :
- Alternatives envisagées :
- Pourquoi cette approche convient à la spec :
- Ce qu'on ne fait volontairement pas :

## 2. Impacts et fichiers probables
| Zone | Fichiers / modules probables | Pourquoi | Changement API / données ? |
|---|---|---|---|
| UI | [paths] | [reason] | [oui/non] |
| Backend | [paths] | [reason] | [oui/non] |
| Data | [paths / migrations] | [reason] | [oui/non] |
| Tests | [paths] | [reason] | [oui/non] |

Il s'agit d'un plan initial ; inspecter le dépôt et confirmer les chemins avant de modifier les fichiers.

## 3. Séquence de réalisation
1. [Pré-requis, configuration ou migration]
2. [Comportement serveur et règles de permission]
3. [Interface / parcours]
4. [Tests des cas nominaux et limites]
5. [Observabilité, documentation et vérification]

## 4. Données et contrats
- Entités / champs affectés :
- Contrats API affectés :
- Compatibilité descendante :
- Migration / backfill / rollback :

## 5. Sécurité, erreurs et résilience
- Autorisation :
- Validation :
- Erreurs attendues :
- Idempotence / retries (si pertinent) :
- Données à ne pas journaliser :

## 6. Vérifications
| Vérification | Commande / méthode | Critère de réussite |
|---|---|---|
| Unit tests | [commande] | [résultat] |
| Integration / contract | [commande] | [résultat] |
| E2E / manuel | [méthode] | [résultat] |
| Lint / typecheck / build | [commandes] | [résultat] |

## 7. Risques et retour arrière
- Risques connus :
- Signal de régression :
- Rollback / désactivation :
- Dépendances externes :

## 8. Gate avant implémentation
- [ ] La spec est approuvée et testable.
- [ ] L'approche répond aux exigences sans complexité disproportionnée.
- [ ] Les impacts de données/API/sécurité sont décrits.
- [ ] Les commandes de validation sont connues ou à identifier avant d'affirmer que les tests passent.
- [ ] Le périmètre est assez petit pour être livré et vérifié en une tranche cohérente.
