import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();

    // Change navbar background on scroll
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Movies', path: '/movies' },
        { name: 'TV Shows', path: '/tv-shows' },
        { name: 'Documentaries', path: '/documentaries' },
        { name: 'My Watchlist', path: '/watchlist' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#0f1014]' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
            <div className="container flex items-center justify-between h-[70px]">
                {/* Left: Logo & Links */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-2xl font-bold text-[#e50914] tracking-widest">MoonVies</Link>
                    <ul className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === link.path ? 'text-white' : 'text-gray-300'}`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: Search & Profile */}
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center bg-black/50 border border-gray-700 rounded-full px-4 py-1.5 focus-within:border-white transition-colors">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search content..."
                            className="bg-transparent border-none outline-none text-sm text-white px-2 w-48 placeholder-gray-500"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="text-white hover:text-gray-300">
                            <Bell className="w-5 h-5" />
                        </button>

                        {user ? (
                            <div className="flex items-center gap-3 group relative cursor-pointer">
                                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                                    {user.username?.[0]?.toUpperCase() || 'U'}
                                </div>
                                {/* Dropdown for Logout */}
                                <div className="absolute top-full right-0 mt-2 w-32 bg-[#18191f] border border-gray-700 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">Profile</Link>
                                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2">
                                        <LogOut className="w-3 h-3" /> Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login">
                                <Button variant="primary" className="py-1 px-4 text-sm">Sign In</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
