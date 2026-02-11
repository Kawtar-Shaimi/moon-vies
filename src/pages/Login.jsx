import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const result = login(email, password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f85718e1-fc6d-495c-9ca0-f0766647c1ee/34f95d73-228d-425b-ae0e-44c1585863c8/US-en-20230918-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 w-full max-w-md bg-black/75 p-16 rounded-lg shadow-2xl">
                <h1 className="text-3xl font-bold mb-8 text-white">Sign In</h1>

                {error && (
                    <div className="bg-[#e87c03] p-3 rounded mb-4 text-sm text-white">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            placeholder="Email or phone number"
                            className="w-full bg-[#333] border-none rounded px-5 py-3 text-white placeholder-gray-500 focus:bg-[#454545] focus:outline-none focus:ring-2 focus:ring-[#8c8c8c]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-[#333] border-none rounded px-5 py-3 text-white placeholder-gray-500 focus:bg-[#454545] focus:outline-none focus:ring-2 focus:ring-[#8c8c8c]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button variant="primary" type="submit" className="w-full py-3 mt-4" isLoading={isLoading}>
                        Sign In
                    </Button>

                    <div className="flex justify-between items-center text-sm text-[#b3b3b3]">
                        <div className="flex items-center gap-1">
                            <input type="checkbox" id="remember" className="rounded bg-gray-600 border-none" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="#" className="hover:underline">Need help?</a>
                    </div>
                </form>

                <div className="mt-16 text-[#737373]">
                    New to MoonVies? <Link to="/register" className="text-white hover:underline">Sign up now.</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
