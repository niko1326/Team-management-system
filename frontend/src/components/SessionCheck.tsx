import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { verifyToken } from '../services/authService';

export const SessionCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { logout } = useAuth();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const isValid = await verifyToken();
                if (!isValid) {
                    logout();
                }
            } catch (error) {
                logout();
            }
        };

        const interval = setInterval(checkSession, 5 * 60 * 1000); // Check every 5 minutes
        return () => clearInterval(interval);
    }, [logout]);

    return <>{children}</>;
}; 