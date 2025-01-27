import api from './api';
import { AxiosError } from 'axios';
import { User } from '../types/User';

interface AuthResponse {
    success: boolean;
    token: string;
    isAdmin: boolean;
    username: string;
    message?: string;
}

interface LoginResponse {
    id?: number;
    username: string;
    email?: string;
    is_admin?: boolean;
    isAdmin?: boolean;
    token: string;
    success?: boolean;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>('/api/auth/login', { username, password });
        const loginResponse = {
            ...response.data,
            success: response.data.success || true,
            isAdmin: response.data.isAdmin || false
        };
        return loginResponse;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response?.data?.message) {
            throw new Error(axiosError.response.data.message);
        }
        throw new Error('Login failed. Please try again.');
    }
};

export const signup = async (username: string, password: string, email: string): Promise<void> => {
    try {
        const response = await api.post<AuthResponse>('/api/auth/signup', {
            username,
            password,
            email
        });
        
        if (!response.data.success) {
            throw new Error(response.data.message || 'Signup failed');
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        const axiosError = error as AxiosError<AuthResponse>;
        if (axiosError.response?.data?.message) {
            throw new Error(axiosError.response.data.message);
        }
        throw new Error('Signup failed. Please try again.');
    }
};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('username');
};

export const checkAuthStatus = (): { isAuthenticated: boolean; isAdmin: boolean } => {
    const username = localStorage.getItem('username');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    return {
        isAuthenticated: !!username,
        isAdmin
    };
};

export const logout = async (): Promise<void> => {
    await api.post('/api/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('username');
    delete api.defaults.headers.common['Authorization'];
};

export const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
};

export const getRole = () => {
    return localStorage.getItem('role');
};

export const verifyToken = async (): Promise<boolean> => {
    const token = getAuthToken();
    if (!token) {
        return false;
    }

    try {
        const response = await api.post('/api/auth/verify');
        return response.data.valid;
    } catch (error) {
        console.error('Token verification failed:', error);
        return false;
    }
}; 