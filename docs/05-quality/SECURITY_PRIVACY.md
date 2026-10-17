# Security & Privacy Baseline

- **Status:** DRAFT
- **Owner:** [security / engineering / product]
- **References:** OWASP ASVS, obligations applicables au produit et à son contexte

> Adapter cette base au risque réel. Ce document n'est ni un audit ni un avis juridique.

## 1. Données et menaces
- Actifs importants : fiches biens, articles, demandes de contact, compte éditeur.
- Types de données : contenu public ; demandes du formulaire de contact (D-005) ; compteur de visite dans le navigateur. Le champ e-mail du popup d'actualités ne collecte rien en v1 (D-007). Pas de paiement connu. Pas de compte visiteur.
- Frontières de confiance : pages publiques en lecture. Écriture réservée à l'admin.
- Abus / acteurs menaçants : spam du formulaire, prise de contrôle de l'admin.
- Scénarios d'impact élevé : bien marqué libre alors qu'il ne l'est pas ; fuite des messages de prospects.
- Dépendances et intégrations critiques : Instagram et Facebook en liens sortants. Pas de jeton dans le dépôt.

## 2. Identité et accès
- Authentification et stockage de session : compte éditeur. Mécanisme non choisi tant que le profil n'est pas validé. Candidat : Supabase Auth.
- Autorisation côté serveur pour chaque action et ressource : publier un bien ou un article exige le rôle éditeur, vérifié côté serveur.
- Rôles / permissions / multi-tenant : un tenant, Alfa. Rôles fins : Q-003.
- Protection contre IDOR et élévation de privilèges : un visiteur ne modifie pas un bien en devinant son identifiant.
- Révocation / suppression de compte : à définir avec le nombre d'éditeurs.

## 3. Validation et sécurité applicative
- Validation serveur et limites de taille :
- Encodage des sorties / XSS :
- Requêtes paramétrées / injection :
- CSRF / CORS / cookies sécurisés selon architecture :
- SSRF, upload de fichiers et chemins :
- Rate limiting / anti-abus :
- Erreurs sans stack trace ni secrets :

## 4. Secrets et supply chain
- Secret manager / variables d'environnement :
- Supabase : RLS sur les tables exposées ; `SUPABASE_SERVICE_ROLE_KEY` réservée au serveur :
- `.env` ignorés ; `.env.example` sans données réelles :
- Permissions des commandes et outils agent :
- Vérification des skills, packages et MCP avant installation :
- Mises à jour et alertes de vulnérabilité :

## 5. Confidentialité et gouvernance des données
- Finalité et minimisation :
- Base légale / consentement si applicable :
- Durée de conservation et suppression :
- Export / correction des données :
- Fournisseurs, transferts et sous-traitants :
- Journalisation, analytics et identifiants :
- Procédure en cas d'incident :

## 6. Logging et monitoring
- Événements de sécurité utiles :
- Données interdites dans les logs :
- Rétention et accès aux logs :
- Alertes et responsable :

## 7. Vérifications minimales avant lancement
- [ ] Aucune clé ou donnée personnelle réelle dans le dépôt
- [ ] Autorisation vérifiée côté serveur sur les opérations protégées
- [ ] Validation des entrées aux frontières de confiance
- [ ] Dépendances et configuration de production vérifiées
- [ ] Sauvegardes / restaurations testées si données critiques
- [ ] Suppression et conservation des données définies
- [ ] Parcours d'authentification et erreurs revus
- [ ] Revue de sécurité proportionnée au risque effectuée

## 8. Références
- OWASP ASVS : https://owasp.org/www-project-application-security-verification-standard/
- WCAG 2.2 FR : https://www.w3.org/Translations/WCAG22-fr/
