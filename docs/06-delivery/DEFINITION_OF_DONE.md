# Definition of Done (DoD)

Une tâche n'est terminée que lorsque les éléments applicables ci-dessous sont vérifiés. Les exceptions doivent être explicites et approuvées.

## Produit
- [ ] Le comportement correspond à la spécification approuvée.
- [ ] Les critères d'acceptation sont vérifiés.
- [ ] Les cas limites et erreurs pertinents sont traités.

## Code
- [ ] Le diff est limité, lisible et sans changements involontaires.
- [ ] Pas de secrets, données personnelles de test réelles, code mort ou debug oublié.
- [ ] Les types, conventions et architecture documentée sont respectés.
- [ ] Les dépendances ajoutées sont justifiées.

## Qualité
- [ ] Tests pertinents ajoutés / mis à jour / exécutés.
- [ ] Format, lint, typecheck et build exécutés lorsqu'ils existent et sont pertinents.
- [ ] Les échecs ou contrôles impossibles sont documentés sans prétendre qu'ils passent.

## UX / accessibilité
- [ ] États loading, empty, error, success et disabled traités selon pertinence.
- [ ] Responsive et clavier / focus revus pour les changements d'interface.
- [ ] Cohérence avec le design system conservée.

## Données / sécurité / exploitation
- [ ] Permissions vérifiées côté serveur.
- [ ] Schéma, contrats et migrations synchronisés.
- [ ] Logs / analytics sans données confidentielles inutiles.
- [ ] Monitoring / rollback documentés lorsque le risque le nécessite.

## Documentation et livraison
- [ ] Documentation touchée mise à jour.
- [ ] Tâches et statut mis à jour.
- [ ] Résumé final décrit les changements, vérifications, limites et risques connus.
