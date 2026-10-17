---
name: supabase-security-review
description: Revoit l'authentification Supabase, les politiques RLS, les migrations et l'usage de la clé service_role. À utiliser avant de livrer un projet qui expose des tables ou des fonctions Supabase.
---

# Supabase Security Review

## Objectif
Vérifier que les données exposées sont protégées côté base et que la clé secrète reste serveur.

## Prérequis
Profil avec Supabase. `DATA_MODEL.md`, `SECURITY_PRIVACY.md`, dossier `supabase/` s'il existe.

## Entrées
Tables, politiques, flux d'auth, diff des migrations.

## Workflow
1. Lister les tables lisibles par le client anon ou authentifié.
2. Vérifier que RLS est activé et que chaque politique couvre select, insert, update et delete selon le besoin. Le défaut est le refus.
3. Chercher `SUPABASE_SERVICE_ROLE_KEY` et `NEXT_PUBLIC_`. La clé service_role ne doit apparaître que dans du code serveur.
4. Vérifier que les migrations sont versionnées et qu'un retour arrière est décrit pour toute migration destructive.
5. Vérifier la session, la révocation et les parcours de compte présents dans la spec.
6. Classer les écarts. Ne pas désactiver RLS pour faire passer un contrôle.

## Sorties
Tableau table / RLS / rôle / écart. Secrets trouvés, le cas échéant, sans les recopier.

## Réussite
Chaque table exposée a un verdict. Aucune clé service_role n'est livrée au navigateur.
