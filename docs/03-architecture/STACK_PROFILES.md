# Profils de stack

- **Status:** APPROVED pour le kit
- **Owner:** starter kit
- **Last updated:** 2026-10-16
- **Related documents:** `TRD.md`, `ADR/ADR-001-default-stack.md`, `../00-discovery/SKILLS_SELECTION.md`

Le profil se choisit à partir du brief, puis se valide. Le candidat de départ est **Vercel + Supabase** lorsqu'aucun critère d'un autre profil ne l'écarte.

Chaque profil indique quoi laisser de côté. Installer la stack d'un autre profil alourdit le projet sans servir le brief.

## Comment choisir

1. Lire le brief et les contraintes imposées (plateforme, hébergement, équipe, budget).
2. Si le livrable est un thème dans l'admin Shopify, prendre Shopify Theme.
3. Si le livrable est un thème ou un site WordPress, prendre WordPress Theme et sa variante.
4. Si le livrable est une boutique dont le checkout n'est pas celui d'un thème natif, prendre Commerce.
5. Si plusieurs domaines métier doivent évoluer séparément et que le dépôt unique devient illisible, étudier Complex.
6. Sinon, rester sur Vercel + Supabase. Marketing et SaaS en sont des cas d'usage, avec un périmètre différent.

## Vercel + Supabase

Profil de référence.

- **Cas d'utilisation.** Application web ou site dont le contenu, les comptes et les données tiennent dans Next.js et Postgres.
- **Technologies.** Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui lorsque des composants accessibles accélèrent l'interface, Supabase pour Postgres, Auth et stockage si les fichiers sont nécessaires, Vercel pour l'hébergement.
- **Atouts.** Un dépôt, des previews, Auth et SQL gérés, politiques RLS proches des données.
- **Limites.** Le checkout complexe, le multi-vendeur ou un thème d'admin Shopify déjà imposé sortent de ce profil. La clé `service_role` compromet les données si elle atteint le navigateur.
- **Coûts.** Offres Vercel et Supabase selon le trafic, la base et l'auth. À chiffrer dans le TRD, sans inventer un prix.
- **Critères.** Équipe à l'aise avec TypeScript, pas de plateforme CMS imposée, données relationnelles, comptes utilisateurs possibles.
- **Architecture.** `src/app` pour les routes, `src/components/ui` pour les primitives, `src/components/atoms|molecules|organisms` pour le reste partagé, `src/features/<feature>` dès qu'une fonctionnalité a sa logique, `src/lib` pour l'accès serveur. Minimale au départ : `app`, `components/ui`, `lib`.
- **Règles et skills.** Déjà dans `.cursor/rules` (`10-frontend`, `20-backend-data`, `60-nextjs`). Skills de catalogue utiles : `nextjs-seo`, `supabase-security-review`.
- **Tests et sécurité.** Validation serveur, RLS sur chaque table exposée, migrations versionnées, aucun `NEXT_PUBLIC_` pour la clé service. Tests des permissions et des parcours P0.
- **À ne pas installer.** Shopify CLI, WordPress, Kubernetes, un second fournisseur d'auth.

## Marketing / Website

- **Cas d'utilisation.** Site vitrine, landing pages, contenu éditorial, SEO.
- **Technologies candidates.** Next.js et Tailwind sur Vercel. CMS headless (Sanity ou équivalent) seulement si des non-développeurs publient souvent. Générateur statique si le brief l'impose déjà.
- **Atouts.** Pages rapides, SEO technique via `robots.ts` et `sitemap.ts`, peu de surface d'auth.
- **Limites.** Un espace membre, un paiement ou un back-office métier font basculer vers SaaS ou Commerce.
- **Critères.** Contenu surtout public, peu de données personnelles, formulaires simples.
- **Architecture.** Routes publiques dans `src/app`, sections de page dans des fichiers dédiés, design system léger.
- **Règles et skills.** Règles Next.js. Skill `nextjs-seo` après validation. Pas de `supabase-security-review` tant qu'il n'y a pas de tables exposées.
- **Tests et sécurité.** Liens, formulaires, métadonnées, accessibilité des pages publiques. Un formulaire qui stocke des données personnelles documente finalité et durée.
- **À ne pas installer.** Auth, RLS, panier, monorepo.

## SaaS / Web App

- **Cas d'utilisation.** Comptes, données métier, rôles, éventuel back-office.
- **Technologies.** Celles de Vercel + Supabase. Groupes de routes si l'espace public, l'espace connecté et le back-office ont des layouts différents.
- **Atouts.** Même socle que le profil de référence, avec une frontière d'autorisation explicite.
- **Limites.** Un layout ou un sous-domaine sépare l'interface. L'autorisation se vérifie sur le serveur et, pour les tables exposées, par RLS.
- **Critères.** Plusieurs rôles, données privées, opérations au-delà du contenu public.
- **Architecture.** Groupes `(public)`, `(app)`, `(admin)` seulement lorsque les layouts divergent. Features par capacité métier.
- **Règles et skills.** Backend, Next.js, `supabase-security-review`.
- **Tests et sécurité.** Parcours d'inscription, accès refusé, IDOR, révocation. Jeux de tests sans données de production.
- **À ne pas installer.** Microservices, bus de messages, second projet Supabase, tant que le TRD ne le démontre pas.

## Commerce

- **Cas d'utilisation.** Boutique dont le checkout n'est pas rendu par un thème Shopify natif, ou catalogue headless.
- **Technologies candidates.** Storefront Shopify avec un front Next.js sur Vercel, si l'admin marchand reste Shopify. WooCommerce seulement si le brief est déjà WordPress.
- **Atouts.** Contenu et SEO libres, checkout du fournisseur.
- **Limites.** Le thème natif est plus simple lorsque les sections Shopify suffisent. Le PCI du checkout reste chez le fournisseur ; le front ne collecte pas les numéros de carte.
- **Critères.** Besoin d'un front sur mesure et d'un catalogue hébergé par Shopify ou WooCommerce.
- **Architecture.** Front Next.js, appels boutique côté serveur, webhooks signés.
- **Règles et skills.** Next.js et SEO. Le skill de thème Shopify sert seulement s'il reste des fichiers Liquid.
- **Tests et sécurité.** Signature des webhooks, prix affiché aligné sur la boutique, pas de secret boutique dans le client.
- **À ne pas installer.** Une seconde base produits qui duplique le catalogue sans décision d'architecture.

## Complex / Multi-module

- **Cas d'utilisation.** Plusieurs domaines qui doivent être livrés et déployés avec des rythmes différents, ou un dépôt déjà trop couplé.
- **Technologies candidates.** Monorepo (par exemple Turborepo) si le partage de code est réel. Plusieurs dépôts si les équipes et les cycles de release sont séparés. Hébergement managé au-delà de Vercel seulement avec un besoin démontré.
- **Atouts.** Frontières de code visibles.
- **Limites.** Outillage, CI et ownership plus lourds. Kubernetes ou une grille de microservices ne sont pas le point de départ.
- **Critères.** Au moins deux modules avec des raisons de déploiement distinctes, écrites dans un ADR.
- **Architecture.** Packages par module, un `AGENTS.md` de répertoire pour les règles locales. Les règles Cursor restent à la racine du workspace.
- **Règles et skills.** Celles des profils réellement présents dans les modules.
- **Tests et sécurité.** Contrats entre modules, secrets par application, pas de base partagée non documentée.
- **À ne pas installer.** Un cluster, un service mesh, une file de messages, sans scénario de charge ou d'organisation qui l'exige.

## Shopify Theme

- **Cas d'utilisation.** Boutique dont le marchand édite les pages dans l'admin Shopify.
- **Technologies.** Liquid, templates JSON, sections, blocs, Shopify CLI. Hébergement Shopify.
- **Atouts.** Checkout, paiements, panier et éditeur déjà fournis.
- **Limites.** L'interface est contrainte par le thème. Une application Next.js séparée est un autre profil.
- **Critères.** Le brief parle de thème, de sections éditables ou de l'éditeur de thème.
- **Architecture.** `layout/`, `templates/`, `sections/`, `blocks/`, `snippets/`, `config/`, `locales/`.
- **Règles et skills.** Copier `docs/90-templates/rules/shopify-theme.mdc` et le skill `shopify-theme-workflow` après validation.
- **Tests et sécurité.** `shopify theme check` si le CLI est installé. Pas de jeton Admin API dans le thème. Les réglages sensibles ne vont pas dans un fichier Liquid public.
- **À ne pas installer.** Next.js, Supabase, Tailwind comme système du thème, `supabase db push`.

## WordPress Theme

Variantes : thème classique, block theme, child theme, headless. Une seule variante par projet, écrite dans le TRD.

- **Cas d'utilisation.** Site dont l'édition ou l'hébergement sont déjà WordPress, SEO éditorial, ou commerce WooCommerce imposé.
- **Technologies.** PHP et la hiérarchie de templates, ou `theme.json` pour un block theme. Child theme si un parent doit continuer à recevoir des mises à jour. Headless : API WordPress plus un front séparé, choisi dans un ADR.
- **Atouts.** Édition, écosystème, hébergement PHP/MySQL courant.
- **Limites.** La sécurité dépend de l'échappement, des nonces, des capabilities et des mises à jour. Le headless ajoute un second déploiement.
- **Critères.** WordPress est imposé, ou le contenu doit être édité dans l'admin WordPress.
- **Architecture.** Thème classique : templates PHP. Block theme : `theme.json` et templates HTML. Child theme : feuille et templates qui surchargent le parent. Headless : contrat d'API dans `API_CONTRACTS.md`.
- **Règles et skills.** Copier `wordpress-theme.mdc` et `wordpress-theme-workflow` après validation.
- **Tests et sécurité.** Échappement, requêtes préparées, nonces, rôles. Formulaires et téléversements traités comme des entrées non fiables. Sauvegardes base et fichiers si le projet stocke des données.
- **À ne pas installer.** Supabase, le workflow Vercel de production, un thème parent modifié directement alors qu'un child theme suffit.

## Ce que le dépôt active par défaut

Les workflows `.github/workflows/vercel.yml` et `supabase.yml` partent sur un push vers `main`. Ils ne déploient rien tant que l'application Next.js ou `supabase/config.toml` est absent. Dès que ces fichiers existent, le push vers `main` déploie. Les migrations Supabase attendent l'accord des relecteurs de l'environnement GitHub `production`, s'ils sont configurés. Les secrets vivent dans GitHub, pas dans Git.
