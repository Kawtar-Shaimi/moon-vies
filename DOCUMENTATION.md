# 🌙 MoonVies — Documentation

## Vue d'ensemble

**MoonVies** est une application web de streaming de contenu multimédia (films, séries, documentaires) inspirée de Netflix. Elle permet aux utilisateurs de naviguer dans un catalogue, regarder des bandes-annonces, gérer une watchlist personnelle, et s'authentifier avec un compte.

L'application est construite avec :

| Technologie | Rôle |
|---|---|
| **React 18** | Framework UI |
| **React Router v6** | Gestion des routes / navigation |
| **Vite** | Bundler & serveur de développement |
| **TailwindCSS** | Styles CSS utilitaires |
| **Lucide React** | Icônes SVG |
| **LocalStorage** | Persistance des données (pas de backend) |

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
    │   ├── Home.jsx        # Page d'accueil avec catalogue
    │   ├── Details.jsx     # Page détail d'un contenu
    │   ├── Watchlist.jsx   # Watchlist personnelle (protégée)
    │   ├── Login.jsx       # Page de connexion
    │   └── Register.jsx    # Page d'inscription
    │
    ├── components/         # Composants réutilisables
    │   ├── layout/
    │   │   ├── Layout.jsx  # Wrapper global (Navbar + footer)
    │   │   └── Navbar.jsx  # Barre de navigation
    │   ├── ui/
    │   │   ├── Button.jsx  # Bouton générique
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
        └── mockData.js     # Données statiques (films, catégories)
```

---

## 📄 Pages

### `Home.jsx` — Page d'accueil
**Route :** `/`, `/movies`, `/tv-shows`, `/documentaries`

La page d'accueil est le cœur de l'application. Elle contient :

- **Section Hero** : bandeau plein écran avec une image de fond du contenu mis en avant (actuellement *The Dark Knight*). Affiche le titre, la description, la note et des boutons d'action (*Watch Trailer* et *More Info*).
- **Filtres par catégorie** : boutons permettant de filtrer le catalogue par genre (Action, Sci-Fi, Drama, etc.). La sélection active est mémorisée dans l'état local.
- **Grille de contenu** : affiche toutes les vidéos filtrées sous forme de `MovieCard`. La grille est responsive (2 → 3 → 4 colonnes selon la taille d'écran).

> Le filtrage utilise `useMemo` pour éviter des re-calculs inutiles à chaque rendu.

---

### `Details.jsx` — Page de détail
**Route :** `/watch/:id`

Page dédiée à un contenu spécifique, accessible en cliquant sur une `MovieCard`. Elle contient :

- **Lecteur vidéo** (`VideoPlayer`) affichant la bande-annonce YouTube en autoplay.
- **Informations détaillées** : titre, note (étoiles), année, durée, type, description, réalisateur et casting.
- **Bouton Watchlist** : permet d'ajouter ou retirer le film de la liste personnelle.
- **Sidebar "You might also like"** : affiche jusqu'à 4 contenus de la même catégorie avec miniature et lien de navigation.

---

### `Watchlist.jsx` — Ma watchlist *(protégée)*
**Route :** `/watchlist` (nécessite d'être connecté)

Affiche tous les contenus sauvegardés par l'utilisateur. Les données sont lues depuis le `localStorage` (clé `vibz_watchlist`).

- Si la liste est **vide** : affiche un message d'invitation avec un bouton "Browse Content".
- Sinon : affiche une grille de `MovieCard` avec le nombre d'éléments dans la liste.

> Cette route est protégée par `ProtectedRoute` dans `App.jsx` : si l'utilisateur n'est pas connecté, il est redirigé vers `/login`.

---

### `Login.jsx` — Connexion
**Route :** `/login`

Formulaire d'authentification avec :
- Champs **email** et **mot de passe**
- Gestion d'erreurs (affichées en orange si les identifiants sont incorrects)
- Indicateur de chargement sur le bouton pendant la requête (simulée avec un délai de 500ms)
- Lien vers la page d'inscription

> Après connexion réussie, l'utilisateur est redirigé vers la page d'accueil (`/`).

---

### `Register.jsx` — Inscription
**Route :** `/register`

Formulaire de création de compte (username, email, mot de passe, confirmation). Après inscription :

- L'utilisateur est automatiquement connecté (auto-login).
- Il est redirigé vers la page d'accueil.

---

## 🧩 Composants

### `Layout.jsx` — Mise en page globale
Wrapper qui entoure toutes les pages publiques (via `<Outlet />` de React Router). Il inclut :
- La **Navbar** en haut
- Le **footer** en bas (copyright, liens légaux)
- Un fond sombre `#0f1014` pour toute l'application

---

### `Navbar.jsx` — Barre de navigation
Barre de navigation fixe en haut de l'écran. Comportements :

- **Transparente** au sommet de la page, **opaque** (`#0f1014`) une fois que l'utilisateur scrolle (via un `useEffect` sur l'événement `scroll`).
- **Liens de navigation** : Home, Movies, TV Shows, Documentaries, My Watchlist. Le lien actif est mis en évidence.
- **Barre de recherche** intégrée (champ de recherche textuel, côté desktop uniquement).
- **Zone utilisateur** :
  - Si **déconnecté** : bouton "Sign In" → redirige vers `/login`.
  - Si **connecté** : avatar avec initiale du nom d'utilisateur + dropdown (liens vers *Profile* et bouton *Logout*).

---

### `MovieCard.jsx` — Carte de contenu
Composant affiché dans les grilles de films/séries. Il présente :
- **Miniature** cliquable (lien vers `/watch/:id`)
- **Titre**, **année**, **type** (FILM / SERIE / DOCUMENTAIRE), **durée**, **note** (étoile jaune)
- **Overlay au survol** (hover) : fond semi-transparent avec bouton ▶ Play et bouton ＋/✓ pour la watchlist

La watchlist est gérée directement dans le composant via `useLocalStorage`.

---

### `Button.jsx` — Bouton générique
Bouton réutilisable avec 4 variantes de style :

| Variante | Apparence |
|---|---|
| `primary` | Rouge `#e50914` (style Netflix) |
| `secondary` | Gris semi-transparent |
| `outline` | Bordure grise, fond transparent |
| `ghost` | Entièrement transparent |

Supporte également : chargement (spinner animé via `isLoading`), icône (`icon` prop), et tous les attributs HTML natifs du `<button>`.

---

### `VideoPlayer.jsx` — Lecteur vidéo
Encapsule une `<iframe>` YouTube en mode plein aspect (`aspect-video`). Gère automatiquement la conversion d'une URL YouTube normale vers une URL `/embed/`. L'autoplay et la navigation recommandée sont désactivés (`?autoplay=1&modestbranding=1&rel=0`).

---

## ⚙️ Logique métier

### `AuthContext.jsx` — Authentification
Fournit un **contexte global** d'authentification accessible partout dans l'application via le hook `useAuth()`.

**Données persistées en localStorage :**
- `moonvies_user` : l'utilisateur actuellement connecté (sans mot de passe)
- `moonvies_users_db` : base de données simulée de tous les utilisateurs inscrits

**Fonctions exposées :**

| Fonction | Description |
|---|---|
| `login(email, password)` | Recherche l'utilisateur dans la "DB" locale. Retourne `{ success: true }` ou `{ success: false, message }` |
| `register(userData)` | Vérifie si l'email existe déjà, sinon crée le compte et connecte automatiquement l'utilisateur |
| `logout()` | Efface l'utilisateur de la session (met `user` à `null`) |

> ⚠️ Les mots de passe sont stockés en clair dans le `localStorage`. Cette implémentation est **uniquement pour démonstration** — ne jamais faire cela en production.

---

### `useLocalStorage.js` — Hook personnalisé
Hook générique qui synchronise un état React avec le `localStorage` du navigateur.

```js
const [value, setValue] = useLocalStorage('ma_cle', valeurParDefaut);
```

- Lit la valeur depuis `localStorage` au montage.
- À chaque `setValue(...)`, met à jour le state ET le `localStorage` simultanément.
- Gère les erreurs silencieusement (JSON invalide, localStorage indisponible).

---

### `mockData.js` — Données simulées
Fichier de données statiques exportant :

- **`videos`** : tableau de 8 objets représentant des films/séries. Chaque objet contient :
  - `id`, `title`, `description`, `thumbnailUrl`, `trailerUrl` (YouTube embed)
  - `duration`, `releaseYear`, `type` (`FILM` | `SERIE` | `DOCUMENTAIRE`)
  - `category`, `rating`, `director`, `cast[]`
  - `isFeatured` (optionnel — utilisé pour le contenu du Hero)

- **`CATEGORIES`** : tableau de catégories disponibles pour le filtrage.

---

## 🔐 Système de routes

```
/                   → Home (public)
/movies             → Home (réutilisé, public)
/tv-shows           → Home (réutilisé, public)
/documentaries      → Home (réutilisé, public)
/watch/:id          → Details (public)
/watchlist          → Watchlist (🔒 protégée)
/profile            → Page profil placeholder (🔒 protégée)
/login              → Login (public)
/register           → Register (public)
*                   → Redirige vers /
```

Les pages sont chargées en **lazy loading** via `React.lazy()` + `<Suspense>`, ce qui améliore les performances au démarrage. Un spinner rouge s'affiche pendant le chargement.

---

## 🎨 Design

L'application utilise une palette sombre inspirée de Netflix :
- **Fond principal** : `#0f1014`
- **Fond des cartes** : `#18191f`
- **Couleur d'accent** : `#e50914` (rouge)
- **Texte** : blanc et nuances de gris

Les animations incluent : transition de la Navbar au scroll, scale des cartes au hover, overlay des cartes, et spinner de chargement.
