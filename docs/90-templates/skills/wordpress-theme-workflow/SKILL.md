---
name: wordpress-theme-workflow
description: Cadre un thème WordPress classique, block theme, child theme ou headless selon le brief. À utiliser quand le profil retenu est WordPress, en appliquant échappement, nonces et capabilities.
---

# WordPress Theme Workflow

## Objectif
Livrer un thème ou une couche headless WordPress conforme aux standards du projet, sans importer la stack Next.js par défaut.

## Prérequis
Variante validée : classique, block theme, child theme ou headless. Lire la règle `wordpress-theme.mdc` une fois copiée.

## Entrées
Brief, thème parent s'il y a un child theme, contenus et formulaires concernés.

## Workflow
1. Choisir la variante selon le brief. Un child theme se justifie lorsqu'un thème parent doit rester à jour.
2. Block theme : `theme.json`, templates HTML et patterns. Thème classique : hiérarchie des templates PHP.
3. Échapper les sorties, assainir les entrées, préparer les requêtes SQL et vérifier les capabilities. Protéger les formulaires avec un nonce.
4. Enregistrer styles et scripts avec l'API WordPress. Charger seulement ce que le template utilise.
5. Headless : le front est un client de l'API WordPress. L'authentification et les permissions restent dans WordPress.
6. Ne pas ajouter Supabase ni un second CMS sans décision écrite.
7. Vérifier avec les outils présents (PHPCS, WP-CLI). Rapporter ce qui a réellement été exécuté.

## Sorties
Thème ou contrat d'API, et écarts de sécurité.

## Réussite
La variante est explicite. Les entrées utilisateur des formulaires et requêtes touchés sont protégées.
