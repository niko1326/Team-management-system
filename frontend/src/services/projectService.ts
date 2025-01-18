import api from './apiConfig';
import { Project } from '../types/Project';

// Fetch all projects
export const fetchProjects = async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data;
};

// Fetch a single project by ID
export const fetchProjectById = async (projectId: string): Promise<Project> => {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
};

// Add a new project
export const createProject = async (projectData: {
    name: string;
    description: string;
    status: string;
    teamId: string;
}): Promise<Project> => {
    const response = await api.post('/projects', projectData);
    return response.data;
};

// Delete a project by ID
export const deleteProject = async (projectId: string): Promise<void> => {
    await api.delete(`/projects/${projectId}`);
};
