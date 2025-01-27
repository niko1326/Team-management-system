export interface User {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
    teams?: {
        id: number;
        name: string;
    }[];
    isInTeam?: boolean;
}

export interface TeamUser {
    id: number;
    username: string;
    email: string;
    role: 'USER' | 'ADMIN';
} 