# 🌐 FanZone Front-End

## 📜 Description du Projet

Le Front-End de FanZone est l'interface utilisateur qui permet aux **Fans**, **Agents de contrôle** et **Administrateurs** d'interagir avec la plateforme de réservation et de contrôle d'accès pour les zones spectateurs de la CAN 2025 MAROC.

Il est conçu pour être **rapide, réactif** et offrir une expérience utilisateur fluide, que ce soit pour la réservation en ligne ou pour la validation rapide des billets sur site.

---

## ✨ Fonctionnalités Clés du Front-End

L'application front-end est divisée en plusieurs sections critiques :

### 1. Espace Fan (Public & Authentifié)

- **Parcours de Réservation Simplifié** : Afficheur des matchs disponibles, sélection des zones et processus de réservation guidé.
- **Intégration Stripe Checkout** : Redirection sécurisée et gestion de l'interface de paiement via **Stripe**.
- **Espace Utilisateur** : Tableau de bord pour consulter l'historique des réservations, le statut des billets et télécharger les PDF.

### 2. Interface de Contrôle d'Accès (Agent)

- **Scanner de QR Code** : Interface optimisée pour la lecture rapide et fiable des QR codes des billets via la caméra de l'appareil mobile/tablette.
- **Validation en Temps Réel** : Affichage instantané du statut de validité du billet (Valide/Invalide/Déjà utilisé) grâce à l'appel API sécurisé.
- **Gestion des Erreurs** : Affichage clair des messages d'erreur et des raisons de non-validation.

### 3. Tableau de Bord Administration (Admin)

- **Gestion des Ventes** : Visualisation des métriques clés (billets vendus, revenus).
- **Gestion des Utilisateurs & Zones** : Interfaces pour créer, modifier et superviser les utilisateurs et les paramètres des zones.
- **Rapports Détaillés** : Outils pour l'exportation et l'analyse des données d'affluence.

---

## 🛠️ Technologies Utilisées

Le Front-End est construit avec des outils modernes garantissant performance et maintenabilité.

| Catégorie          | Technologie                    | Rôle/Description                                                                                                            |
| :----------------- | :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **Framework**      | **React.js**                   | Bibliothèque JavaScript pour la construction de l'interface utilisateur.                                                    |
| **Builder**        | **Vite**                       | Outil de construction rapide, utilisé pour le développement et l'optimisation en production (remplace Webpack).             |
| **Gestion d'État** | **Redux/Redux Toolkit**        | Gestion centralisée et prédictible de l'état de l'application (authentification, données utilisateur, états de chargement). |
| **Style/UI**       | **CSS Modules / Tailwind CSS** | (À confirmer) Choix d'un framework CSS ou de modules pour un style réactif et maintenable.                                  |
| **Routing**        | **React Router DOM**           | Gestion de la navigation entre les différentes vues (Fan, Agent, Admin).                                                    |
| **Communication**  | **Axios / Fetch**              | Client HTTP pour la communication avec l'API Back-End (Laravel).                                                            |
| **QR Scan**        | **bibliothèque de scan JS**    | (Ex: `react-qr-reader` ou similaire) Pour la lecture des codes sur l'interface Agent.                                       |

---

## ⚙️ Architecture

Le Front-End suit l'architecture **Single Page Application (SPA)**, pilotée par **React** et gérée par **Redux** pour assurer une bonne séparation des préoccupations :

1.  **Composants (Views/Components)** : Responsables de l'affichage de l'interface.
2.  **Redux (Slices/Store)** : Gère l'état global et la logique de données.
3.  **Services/API** : Contient les fonctions de communication avec l'API Back-End.

---

## 🚀 Démarrage Rapide

Pour lancer le projet Front-End localement :

1.  **Cloner le dépôt** :
    ```bash
    git clone [URL_DU_DEPOT_FRONTEND]
    cd fan-zone-frontend
    ```
2.  **Installer les dépendances** :
    ```bash
    npm install
    # ou yarn install
    ```
3.  **Lancer le serveur de développement (Vite)** :
    `bash
    npm run dev
    # ou yarn dev
    `L'application sera accessible sur`http://localhost:5173` (port par défaut de Vite).
