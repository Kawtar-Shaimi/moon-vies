import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    isLoading = false,
    icon: Icon,
    ...props
}) => {
    const baseStyles = "flex items-center justify-center gap-2 px-6 py-2 rounded font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[#e50914] text-white hover:bg-[#b20710]",
        secondary: "bg-[rgba(109,109,110,0.7)] text-white hover:bg-[rgba(109,109,110,0.4)]",
        outline: "border border-gray-400 text-white hover:bg-[rgba(255,255,255,0.1)]",
        ghost: "bg-transparent text-white hover:bg-[rgba(255,255,255,0.1)]"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : Icon && <Icon className="w-5 h-5" />}
            {children}
        </button>
    );
};

export default Button;
