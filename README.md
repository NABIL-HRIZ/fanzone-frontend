# FanZone - Front-end

Ce fichier README est destiné uniquement au dossier `front_end`.

## Description

L'interface cliente de FanZone est construite avec React + Vite. Ce projet contient les sources, les styles et la configuration pour le build et le développement local.

## Pré-requis

- Node.js (v16+ recommandé)
- npm ou yarn

## Installation

1. Se placer dans le dossier `front_end`.
2. Installer les dépendances :

   npm install

Ou avec yarn :

     yarn

## Démarrage en développement

    npm run dev

ou

    yarn dev

Cela lance le serveur Vite avec HMR. Le point d'entrée principal est `src/main.jsx`.

## Build pour production

    npm run build

ou

    yarn build

Le résultat sera dans le dossier `dist/`.

## Tests & Lint

- Linter : `npm run lint` (si configuré)
- Tests : `npm test` (si des tests sont présents)

## Notes

- Ce README fournit les instructions minimales pour démarrer et build l'application frontale en local.
- Voir `vite.config.js` pour la configuration Vite et `package.json` pour les scripts disponibles.
