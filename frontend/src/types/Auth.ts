export interface LoginResponse {
    success: boolean;
    id: number;
    username: string;
    email: string;
    role: 'USER' | 'ADMIN';
    token: string;
} 