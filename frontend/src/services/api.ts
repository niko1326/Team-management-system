import axios from 'axios';

// Set base URL to your backend API
const api = axios.create({
    baseURL: 'http://localhost:8080/api',  // Backend API base URL
});

// Fetch all projects
export const getProjects = async () => {
    try {
        const response = await api.get('/projects');  // No need for full URL, axios will use the baseURL
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch projects');
    }
};

// Fetch project by ID
export const getProjectById = async (id: number) => {
    try {
        const response = await api.get(`/projects/${id}`);  // Again, use the relative path
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch project details');
    }
};

// Create a new project
export const createProject = async (project: { name: string, description: string, startDate: string, endDate: string }) => {
    try {
        const response = await api.post('/projects', project);  // Use the relative path here too
        return response.data;
    } catch (error) {
        throw new Error('Failed to create project');
    }
};
