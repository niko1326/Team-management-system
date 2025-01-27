import api from './api';
import { User } from '../types/User';

export const fetchUsersByTeamId = async (teamId: number): Promise<User[]> => {
    try {
        const response = await api.get(`/api/admin/teams/${teamId}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const addUserToTeam = async (teamId: number, userId: number): Promise<void> => {
    try {
        await api.post(`/api/admin/teams/${teamId}/users/${userId}`);
    } catch (error) {
        console.error('Error adding user to team:', error);
        throw error;
    }
};

export const removeUserFromTeam = async (teamId: number, userId: number): Promise<void> => {
    try {
        await api.delete(`/api/admin/teams/${teamId}/users/${userId}`);
    } catch (error) {
        console.error('Error removing user from team:', error);
        throw error;
    }
};

export const fetchAllUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get('/api/admin/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

export const assignUserToTeam = async (userId: number, teamId: number | null): Promise<void> => {
    try {
        if (teamId) {
            await addUserToTeam(teamId, userId);
        } else {
            // Get user's current team first
            const user = await api.get(`/api/admin/users/${userId}`);
            if (user.data.team) {
                await removeUserFromTeam(user.data.team.id, userId);
            }
        }
    } catch (error) {
        console.error('Error assigning user to team:', error);
        throw error;
    }
}; 