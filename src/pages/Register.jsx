import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const result = register({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

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
                <h1 className="text-3xl font-bold mb-8 text-white">Sign Up</h1>

                {error && (
                    <div className="bg-[#e87c03] p-3 rounded mb-4 text-sm text-white">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-full bg-[#333] border-none rounded px-5 py-3 text-white placeholder-gray-500 focus:bg-[#454545] focus:outline-none focus:ring-2 focus:ring-[#8c8c8c]"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            className="w-full bg-[#333] border-none rounded px-5 py-3 text-white placeholder-gray-500 focus:bg-[#454545] focus:outline-none focus:ring-2 focus:ring-[#8c8c8c]"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full bg-[#333] border-none rounded px-5 py-3 text-white placeholder-gray-500 focus:bg-[#454545] focus:outline-none focus:ring-2 focus:ring-[#8c8c8c]"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="w-full bg-[#333] border-none rounded px-5 py-3 text-white placeholder-gray-500 focus:bg-[#454545] focus:outline-none focus:ring-2 focus:ring-[#8c8c8c]"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Button variant="primary" type="submit" className="w-full py-3 mt-4" isLoading={isLoading}>
                        Sign Up
                    </Button>
                </form>

                <div className="mt-8 text-[#737373]">
                    Already have an account? <Link to="/login" className="text-white hover:underline">Sign in.</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
