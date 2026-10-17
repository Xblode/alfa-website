---
name: implement-task
description: Implémente une tâche ou une tranche verticale déjà approuvée, avec des tests et un périmètre limité. À utiliser seulement après validation de la spec et du plan.
---

# Implement Task

## Objectif
Livrer le comportement approuvé dans le profil du projet, puis prouver ce qui a été vérifié.

## Prérequis
Spec et tâches approuvées. Profil lu dans le TRD. Règles du profil présentes. Commandes de vérification connues, ou identifiées avant d'affirmer un résultat.

## Entrées
Identifiant de tâche, spec, plan, dépôt.

## Workflow
1. Lire la spec, les tâches, l'architecture et les règles dont les globs correspondent aux fichiers touchés.
2. Inspecter Git et le code existant. Préserver le travail non commité.
3. Annoncer les fichiers probables, les hypothèses et les tests. Pour une tâche non triviale, attendre l'accord si le plan n'est pas déjà approuvé.
4. Implémenter uniquement le périmètre approuvé. Suivre la structure du profil : Next.js pour Vercel + Supabase, Liquid pour un thème Shopify, PHP/theme.json pour WordPress.
5. Ajouter ou adapter les tests du comportement. Garder un test qui échoue jusqu'au diagnostic.
6. Exécuter le test ciblé, puis lint, types et build lorsqu'ils existent. Rapporter la commande et le résultat réel.
7. Mettre à jour docs, migrations et `.env.example` si le changement les concerne.
8. Relire le diff : secrets, hors périmètre, données personnelles dans les logs, `service_role` côté client.
9. Résumer le changement, les vérifications, les limites et la tâche suivante.

## Sorties
Diff, résultats de commandes, documentation alignée.

## Réussite
Les critères de la tâche sont vérifiés ou marqués non vérifiés. Le profil non retenu n'a pas reçu ses dépendances.
