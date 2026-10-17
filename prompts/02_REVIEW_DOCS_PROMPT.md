# Prompt — audit de cohérence avant implémentation

Agis comme un reviewer indépendant. **Ne code pas et ne modifie aucun fichier applicatif.** Lis le brief, le PRD, les flows UI/UX, le TRD, les ADR, le modèle de données, les contrats API, la stratégie de test, la sécurité/confidentialité et la roadmap.

Vérifie explicitement :
1. Chaque exigence P0 a une raison, un parcours utilisateur, des données/API requises et un critère de validation.
2. Les routes, écrans, rôles, états vides/erreur/loading et permissions sont cohérents.
3. Les entités, relations, suppressions, règles métier, permissions, contrats et migrations ne se contredisent pas.
4. Le profil retenu correspond aux critères de `docs/03-architecture/STACK_PROFILES.md`. Le candidat de départ est Vercel + Supabase ; un autre profil doit avoir une raison écrite.
5. Les exigences de sécurité, confidentialité, accessibilité, performance, observabilité et sauvegarde sont proportionnées et testables.
6. Les critères de succès ne sont pas inventés et ont une méthode de mesure.
7. Les hypothèses, versions, coûts ou aspects légaux non vérifiés sont clairement marqués.
8. Le périmètre du MVP est faisable et ne cache pas de dépendances bloquantes.

Rends un rapport structuré avec :
- bloqueurs P0 ;
- contradictions entre documents (indiquer les fichiers/sections) ;
- risques élevés ;
- questions ouvertes ;
- améliorations non bloquantes ;
- liste des documents à corriger dans l'ordre ;
- verdict `NOT READY` ou `READY FOR USER APPROVAL`.

Ne dis pas `READY` si une exigence P0 est ambiguë, si des autorisations importantes sont indéfinies ou si le modèle de données contredit les parcours. Ne corrige rien avant de m'avoir présenté le rapport.
