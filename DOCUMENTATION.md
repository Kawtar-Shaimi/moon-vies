# 🌙 MoonVies — Documentation

## Vue d'ensemble

**MoonVies** est une application web de streaming de contenu multimédia (films, séries, documentaires) inspirée de Netflix. Elle permet aux utilisateurs de naviguer dans un catalogue, regarder des bandes-annonces, gérer une watchlist personnelle, et s'authentifier au sein de l'application.

L'application est construite avec :

| Technologie | Rôle |
|---|---|
| **React 18** | Framework UI |
| **React Router v6** | Gestion des routes / navigation |
| **Vite** | Bundler & serveur de développement |
| **TailwindCSS** | Styles CSS utilitaires |
| **Lucide React** | Icônes SVG |
| **LocalStorage** | Persistance des données (sans backend) |

---

## 🚀 Lancer l'application

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

---

## 🗂️ Structure des dossiers

```
moon-vies/
├── index.html              # Point d'entrée HTML
├── vite.config.js          # Configuration Vite
├── package.json            # Dépendances et scripts
└── src/
    ├── main.jsx            # Point d'entrée React
    ├── App.jsx             # Routeur principal
    ├── index.css           # Styles globaux
    │
    ├── pages/              # Pages de l'application (routes)
    │   ├── Home.jsx        # Page d'accueil avec catalogue dynamique
    │   ├── Details.jsx     # Page détail d'un contenu
    │   ├── Watchlist.jsx   # Watchlist personnelle (protégée)
    │   ├── Login.jsx       # Page de connexion
    │   └── Register.jsx    # Page d'inscription
    │
    ├── components/         # Composants réutilisables
    │   ├── layout/
    │   │   ├── Layout.jsx  # Wrapper global (Navbar + footer)
    │   │   └── Navbar.jsx  # Barre de navigation avec recherche
    │   ├── ui/
    │   │   ├── Button.jsx    # Bouton générique à multiples variantes
    │   │   └── MovieCard.jsx # Carte d'un film/série
    │   └── features/
    │       └── VideoPlayer.jsx # Lecteur YouTube embarqué
    │
    ├── context/
    │   └── AuthContext.jsx # Contexte d'authentification global
    │
    ├── hooks/
    │   └── useLocalStorage.js # Hook personnalisé localStorage
    │
    └── data/
        └── mockData.js     # Données statiques (films, catégories) avec images HD
```

---

## 📄 Pages

### `Home.jsx` — Page d'accueil
**Route :** `/`, `/movies`, `/tv-shows`, `/documentaries`

La page d'accueil sert de hub principal s'adaptant à la route choisie :

- **Section Hero** : Bandeau plein écran arborant dynamiquement le premier contenu mis en avant ("featured") de la catégorie actuelle. Il affiche une grande image de fond, le titre, la description courte, et des actions d'accès rapide.
- **Filtres par catégorie (Tags)** : Barre de filtres (Action, Sci-Fi, etc.). La sélection est automatiquement remise à zéro ("All") lorsque l'utilisateur change de rubrique dans la barre de navigation.
- **Grille de contenu** : Affiche toutes les vidéos filtrées sous forme de `MovieCard`. La grille est responsive (2 → 3 → 4 colonnes).

> **Astuce technique :** Le filtrage croisé (type depuis l'URL + catégorie + terme de recherche) utilise `useMemo` pour éviter les calculs superflus au rendu.

---

### `Details.jsx` — Page de détail
**Route :** `/watch/:id`

Page dédiée à l'affichage complet d'un média cliqué :

- **Lecteur vidéo** (`VideoPlayer`) intégrant la bande-annonce YouTube correspondante en autoplay.
- **Informations** : Titre détaillé, note, année, durée, type de contenu, description complète, casting et réalisation.
- **Gestion de la Watchlist** : Bouton d'ajout/retrait de la liste personnelle de l'utilisateur.
- **Recommandations** : Section latérale suggérant d'autres médias du même genre.

---

### `Watchlist.jsx` — Ma watchlist *(protégée)*
**Route :** `/watchlist` (nécessite d'être identifié)

Affiche l'intégralité des contenus mis de côté, stockés en `localStorage`.

- Inclut des "Empty states" pertinents (ex. message d'invitation avec bouton si la liste est vide).
- Protégée par le wrapper analytique `ProtectedRoute` configuré dans le routeur principal.

---

### `Login.jsx` & `Register.jsx` — Authentification
**Route :** `/login`, `/register`

Système complet d'interface d'authentification simulée :
- États de rechargement simulés.
- Validation des champs et affichage des messages d'erreur.
- Connexion automatique immédiatement consécutive à l'inscription.

---

## 🧩 Composants Principaux

### `Layout.jsx` — Mise en page globale
Enveloppe les pages avec la structure périphérique (via `<Outlet />`) :
- La **Navbar** en en-tête.
- Le **Footer** affichant les crédits (mis à jour à l'année courante : 2026).

---

### `Navbar.jsx` — Navigation & Recherche
Barre d'en-tête persistante.
- **Style Dynamique** : Fond transparent qui passe en opaque (`#0f1014`) dès qu'on effectue un défilement.
- **Recherche robuste** : Le champ de recherche utilise un état local pour la saisie clavier (évitant les pertes de focus), tout en synchronisant élégamment l'URL avec les paramètres via `replace: true` (pour ne pas polluer l'historique de retour arrière).
- **Zone Compte** : Avatar généré avec les initiales ou bouton modal de redirection vers le login.

---

### `MovieCard.jsx` — Carte de contenu
Élement clé d'affichage des listes :
- **Miniature** (ratio vidéo standard) avec léger effet de zoom au survol (hover).
- **Indication de lecture** : Au lieu d'assombrir l'image au survol, seule une esthétique et discrète icône "Play" blanche et lumineuse surgit au-dessus de la miniature.
- **Informations** affichées en permanence sous la miniature : titre avec survol réactif, année, format et note.

---

### `mockData.js` — Base de données statique
Ce fichier exporte :
- Un catalogue de médias statiques avec toutes leurs métadonnées. 
- Les URLs d'images ont été récemment optimisées avec des miniatures haute résolution récupérées directement depuis les serveurs YouTube (`maxresdefault.jpg`) pour des contenus comme *La La Land* ou *Planet Earth II*, remédiant aux images d'APIs tierces parfois défaillantes.

---

## ⚙️ Logique métier

### `AuthContext.jsx` — Gestion d'accès
Fournit un contexte réagissant aux événements utilisateurs concernant leurs sessions via le hook commun `useAuth()`.
Les mots de passes et sessions sont simulés dans le localStorage (*à titre démonstratif exclusivement*).

### `useLocalStorage.js` — Hook utilitaire
Synchronise un état de variable React spécifique à une clé du localStorage en permanence, tout en traitant finement les exceptions éventuelles au parsing/stringify JSON.

---

## 🎨 Design System

Le style s'appuie sur TailwindCSS avec une nomenclature de classes proches des plateformes VOD :
- **Dark Theme** : Un fond très sombre, encodé en `#0f1014` pour le corps et `#18191f` pour les cartes.
- **Marque** : Le rouge distinctif Netflix (`#e50914`).
- **Typographie** : Contraste de texte blanc pur avec des gris atténués (`text-gray-400`, `text-gray-300`) pour une hiérarchie visuelle optimale.
- Les interactions se concentrent sur des transitions fluides (200-300ms) sans JavaScript additionnel lourd.
