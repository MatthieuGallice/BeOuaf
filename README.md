# BeOuaf 🐾

BeOuaf est une application mobile de carnet de vie numérique pour animaux de compagnie, développée avec Expo et React Native.

## Fonctionnalités

- ✅ Authentification utilisateur (email/mot de passe)
- ✅ Gestion complète des animaux (CRUD)
- ✅ Suivi de l'alimentation
- ✅ Gestion des médicaments avec rappels
- ✅ Gestion des rendez-vous vétérinaires
- ✅ Notifications locales
- ✅ Interface 100% en français

## Technologies

- **Frontend**: React Native + Expo + TypeScript
- **Backend**: Supabase (PostgreSQL + Auth)
- **État**: Zustand
- **Navigation**: React Navigation
- **Stockage local**: AsyncStorage
- **Notifications**: Expo Notifications

## Installation

### 1. Cloner le projet

```bash
cd BeOuaf
npm install
```

### 2. Configurer Supabase

1. Créez un compte sur [Supabase](https://supabase.com)
2. Créez un nouveau projet
3. Dans l'éditeur SQL, exécutez le script `supabase-schema.sql`
4. Récupérez vos clés API dans Settings > API

### 3. Configuration de l'environnement

Créez un fichier `.env` à la racine du projet :

```env
EXPO_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon-ici
```

### 4. Lancer l'application

```bash
npx expo start
```

Scannez le QR code avec l'application Expo Go sur votre téléphone.

## Structure du projet

```
BeOuaf/
├── src/
│   ├── api/           # Fonctions Supabase
│   ├── store/         # Store Zustand
│   ├── screens/       # Écrans de l'application
│   ├── components/    # Composants réutilisables
│   ├── navigation/    # Configuration de la navigation
│   ├── types/         # Types TypeScript
│   ├── theme/         # Couleurs et styles
│   └── utils/         # Utilitaires (notifications)
├── App.tsx            # Point d'entrée
└── supabase-schema.sql # Schéma de base de données
```

## Schéma de base de données

- **animals** : Informations sur les animaux
- **alimentations** : Données d'alimentation
- **medicaments** : Médicaments et rappels
- **rendezvous** : Rendez-vous vétérinaires

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

## Licence

MIT
