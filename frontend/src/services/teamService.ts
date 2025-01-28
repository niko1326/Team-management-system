import api from './api';
import { Team } from '../types/Team';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types/User';
import { Project } from '../types/Project';

// Fetch all teams (admin only)
export const fetchTeams = async (): Promise<Team[]> => {
    try {
        const response = await api.get('/api/admin/teams');
        console.log('Teams response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching teams:', error);
        throw new Error('Access forbidden - Admin privileges required');
    }
};

// Fetch a single team by ID (admin only)
export const getTeamById = async (id: number): Promise<Team> => {
    try {
        const response = await api.get(`/api/admin/teams/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching team:', error);
        throw error;
    }
};

// Add a new team
export const createTeam = async (team: Partial<Team>): Promise<Team> => {
    try {
        const response = await api.post('/api/teams', team);
        return response.data;
    } catch (error) {
        console.error('Error creating team:', error);
        throw error;
    }
};

// Update a team
export const updateTeam = async (id: number, team: Partial<Team>): Promise<Team> => {
    try {
        const response = await api.put(`/api/admin/teams/${id}`, team);
        return response.data;
    } catch (error) {
        console.error('Error updating team:', error);
        throw error;
    }
};

// Delete a team by ID
export const deleteTeam = async (id: number): Promise<void> => {
    try {
        await api.delete(`/api/admin/teams/${id}`);
    } catch (error) {
        console.error('Error deleting team:', error);
        throw error;
    }
};

export const getTeamUsers = async (teamId: number): Promise<User[]> => {
    try {
        const response = await api.get(`/api/admin/teams/${teamId}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching team users:', error);
        throw error;
    }
};

export const getTeamProjects = async (teamId: number): Promise<Project[]> => {
    try {
        const response = await api.get(`/api/admin/teams/${teamId}/projects`);
        return response.data;
    } catch (error) {
        console.error('Error fetching team projects:', error);
        throw error;
    }
};
