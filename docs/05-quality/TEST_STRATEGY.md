# Test Strategy

- **Status:** DRAFT
- **Owner:** [engineering]

## 1. Objectifs qualité
- Risques principaux à réduire : contact caché par le footer, bien indisponible affiché comme libre, page anglaise incomplète.
- Pannes les plus coûteuses : le prospect ne peut pas appeler ; l'éditeur croit avoir mis à jour un bien.
- Niveau de confiance requis avant release : parcours accueil mobile et desktop vérifiés. La cible +20 % n'est pas un test de recette.

## 2. Pyramide et responsabilité des tests
| Niveau | Ce qu'il vérifie | Quand l'exécuter | Exemples |
|---|---|---|---|
| Unitaires | règles et fonctions isolées | très fréquent | validation, calculs |
| Intégration | collaborations, API, DB | PR / CI | transactions, permissions |
| Contrats | compatibilité des interfaces | CI / changements API | schémas d'API |
| E2E | parcours critiques réels | avant release et CI ciblée | connexion, action principale |
| Manuel / exploratoire | expérience et cas inattendus | selon risque | responsive, accessibilité |

Éviter de rechercher un pourcentage de couverture sans rapport avec le risque. La couverture est un signal, pas une garantie.

## 3. Matrice de tests par fonctionnalité
| Fonctionnalité / risque | Test | Données / fixture | Critère de succès | Automatisé ? |
|---|---|---|---|---|---|
| Contact sticky | Scroll jusqu'au footer | Accueil avec footer | L'icône est au-dessus du footer et devient une flèche | Non, navigateur |
| Disponibilité | Marquer un bien indisponible | Un bien publié | L'accueil ne le montre plus comme libre | Oui, plus tard |
| Langue | Passer en anglais | Accueil FR | Les mêmes sections existent en EN. Pas de troisième langue. | Non, navigateur |
| Popup Instagram | Ouvrir le site deux fois | Compteur de visite à 0 | Absent la 1re fois, présent la 2e | Non, navigateur |

## 4. Environnements et données de test
- Tests unitaires :
- Base isolée / nettoyage :
- Fixtures synthétiques :
- Services tiers simulés vs bac à sable :
- Secrets de test :
- Interdiction d'utiliser des données de production réelles :

## 5. Gates de qualité
- Format : [commande]
- Lint : [commande]
- Typecheck : [commande]
- Unit tests : [commande]
- Integration tests : [commande]
- E2E : [commande]
- Build : [commande]
- Dependency / security scans : [commande]

## 6. Critères de release
- [ ] Critères d'acceptation P0 satisfaits
- [ ] Tests concernés exécutés
- [ ] Pas de défaut critique / de sécurité connu sans décision explicite
- [ ] Migration et rollback examinés
- [ ] Accessibilité et responsive vérifiés pour les parcours concernés
- [ ] Observabilité et support prêts selon la criticité

## 7. Traitement des échecs
- Bloquer la release si :
- Tolérance / exceptions autorisées par :
- Canal de signalement :
- Test de non-régression requis pour :
