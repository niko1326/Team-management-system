import { Project } from '../types/Project';
import api from './api';
import { AxiosError } from 'axios';

// Fetch all projects for the current user
export const fetchProjects = async (username: string): Promise<Project[]> => {
    try {
        const response = await api.get(`/api/projects?username=${username}`);
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError);
        return [];
    }
};

// Fetch a single project by ID
export const fetchProjectById = async (projectId: string): Promise<Project> => {
    try {
        const response = await api.get(`/api/projects/${projectId}`);
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError);
        throw new Error('Failed to fetch project');
    }
};

// Create a new project
export const createProject = async (project: Partial<Project>): Promise<Project> => {
    try {
        const response = await api.post('/api/projects', project);
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError);
        throw new Error('Failed to create project');
    }
};

// Delete a project by ID
export const deleteProject = async (id: number): Promise<void> => {
    try {
        await api.delete(`/api/projects/${id}`);
    } catch (error) {
        handleApiError(error as AxiosError);
        throw new Error('Failed to delete project');
    }
};

// Update a project
export const updateProject = async (id: number, project: Partial<Project>): Promise<Project> => {
    try {
        const response = await api.put(`/api/projects/${id}`, project);
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError);
        throw new Error('Failed to update project');
    }
};

export const getProjectById = async (id: number): Promise<Project> => {
    try {
        const response = await api.get<Project>(`/api/projects/${id}`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching project:', error);
        throw new Error('Failed to fetch project');
    }
};

// Fetch projects by team ID (admin only)
export const fetchProjectsByTeamId = async (teamId: number): Promise<Project[]> => {
    try {
        const response = await api.get(`/api/admin/teams/${teamId}/projects`);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects by team:', error);
        throw error;
    }
};

// Helper function to handle API errors
const handleApiError = (error: AxiosError): void => {
    if (error.response?.status === 401) {
        window.location.href = '/login';
    }
    console.error('API Error:', error);
};
