import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { useAuth } from './context/AuthContext';
import { Loader2 } from 'lucide-react';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home'));
const Details = lazy(() => import('./pages/Details'));
const Watchlist = lazy(() => import('./pages/Watchlist'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

// Loading component
const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1014] text-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#e50914]" />
    </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Main Layout Routes */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="movies" element={<Home />} /> {/* Just for demo, reuses Home */}
                    <Route path="tv-shows" element={<Home />} />
                    <Route path="documentaries" element={<Home />} />

                    <Route path="watch/:id" element={<Details />} />

                    {/* Protected Routes */}
                    <Route path="watchlist" element={
                        <ProtectedRoute>
                            <Watchlist />
                        </ProtectedRoute>
                    } />

                    <Route path="profile" element={
                        <ProtectedRoute>
                            <div className="container py-24 text-center">
                                <h1 className="text-3xl font-bold">User Profile</h1>
                                <p className="text-gray-400 mt-4">Profile statistics and settings would go here.</p>
                            </div>
                        </ProtectedRoute>
                    } />
                </Route>

                {/* 404 */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
}

export default App;
