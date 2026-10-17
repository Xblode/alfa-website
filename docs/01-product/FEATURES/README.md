# Spécifications par fonctionnalité

Pour chaque fonctionnalité non triviale, créer un dossier unique, par exemple `FEAT-001-profil-utilisateur/`, puis y maintenir :

- `spec.md` — pourquoi, comportements, critères d'acceptation, hors périmètre ; partir de `FEATURE_TEMPLATE.md`.
- `plan.md` — approche technique, impacts, séquence, tests et rollback ; partir de `../../90-templates/FEATURE_PLAN_TEMPLATE.md`.
- `tasks.md` — tâches petites, ordonnées et vérifiables ; partir de `../../90-templates/TASKS_TEMPLATE.md`.

Cycle conseillé : **specify → review/clarify → plan → tasks → coherence check → implement → verify/converge**. Les corrections de code et les nouvelles fonctionnalités commencent par leur propre spec si leur impact est significatif. Les micro-corrections peuvent suivre un flux plus léger si le périmètre et le risque sont évidents.

Ne duplique pas inutilement le PRD : le PRD définit le produit et les priorités ; la spec définit le comportement d'une fonctionnalité ; le plan définit comment le dépôt existant peut la mettre en œuvre ; les tâches décrivent l'ordre de réalisation.

Les critères d'acceptation vivent dans la spec. Le lien exigence, critère et test se tient dans `TRACEABILITY.md`, copié une fois de `../../90-templates/` vers `docs/01-product/` lorsque le projet a plusieurs fonctionnalités.
