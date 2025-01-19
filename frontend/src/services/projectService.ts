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
export const createProject = async (projectData: { name: string; description: string }): Promise<Project> => {
    const response = await api.post('/projects', projectData);
    return response.data;
};

// Delete a project by ID
export const deleteProject = async (projectId: number): Promise<void> => {
    await api.delete(`/projects/${projectId}`);
};


// Update a project by ID
export const updateProject = async (projectId: number, updatedData: Partial<Project>): Promise<Project> => {
    const response = await api.put(`/projects/${projectId}`, updatedData);
    return response.data;
};
