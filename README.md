# MoonVies - Video Streaming Platform

A modern, frontend-only video streaming application built with React.js, Vite, and Vanilla CSS. The application allows users to browse movies and TV shows, watch trailers (via YouTube), and manage a personal watchlist.

## Features

- **Authentication**: Sign Up and Login simulations with local storage.
- **Browse Content**: Homepage with Featured content, Trending slider, and Category filters.
- **Video Details**: Detailed view with Metadata, Rating, Cast, and Similar Content.
- **Watch Trailer**: Integrated YouTube embedding for trailers.
- **Watchlist**: Add/Remove movies to your personal list (persisted in local storage).
- **Responsive Design**: Fully optimized for Desktop and Mobile.
- **Dark Theme**: Premium UI with Netflix-inspired aesthetics.

## Tech Stack

- **Frontend Framework**: React.js (Vite)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid)
- **Routing**: React Router DOM (v6) with Lazy Loading
- **Icons**: Lucide React
- **State Management**: React Context API + Custom Hooks (`useLocalStorage`)
- **CI/CD**: GitHub Actions

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kawtar-Shaimi/moon-vies.git
   cd moon-vies
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`.

4. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer, Layout wrapper
│   ├── ui/           # Reusable UI elements (Buttons, Cards)
│   └── features/     # Feature-specific components (VideoPlayer)
├── context/          # Global State (AuthContext)
├── data/             # Mock Data (Movies, Categories)
├── hooks/            # Custom Hooks (useLocalStorage, useAuth)
├── pages/            # Page Views (Home, Details, Login, etc.)
└── index.css         # Global Styles & Variables
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License.
