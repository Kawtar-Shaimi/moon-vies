import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('moonvies_user', null);
    const [users, setUsers] = useLocalStorage('moonvies_users_db', []);

    const login = (email, password) => {
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
            // Don't store password in session
            const { password, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const register = (userData) => {
        const exists = users.find(u => u.email === userData.email);
        if (exists) {
            return { success: false, message: 'User already exists' };
        }

        // Add new user to "database"
        const newUser = { id: Date.now(), ...userData };
        setUsers([...users, newUser]);

        // Auto login
        const { password, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);

        return { success: true };
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
