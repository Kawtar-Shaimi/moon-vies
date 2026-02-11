import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen bg-[#0f1014] text-white font-sans">
            <Navbar />
            <main className="pb-10">
                <Outlet />
            </main>

            <footer className="py-8 bg-[#0f1014] border-t border-gray-800 text-center text-gray-500 text-sm">
                <div className="container">
                    <p className="mb-4">© 2024 MoonVies Streaming. All rights reserved.</p>
                    <div className="flex justify-center gap-6">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                        <a href="#" className="hover:text-white">Help Center</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
