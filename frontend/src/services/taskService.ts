import api from './apiConfig';
import { Task } from '../types/Task';

// Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
};

// Fetch tasks by project ID
export const fetchTasksByProject = async (projectId: string): Promise<Task[]> => {
    const response = await api.get(`/tasks/project/${projectId}`);
    return response.data;
};

// Add a new task
export const createTask = async (taskData: {
    name: string;
    status: string;
    projectId: string;
}): Promise<Task> => {
    const response = await api.post('/tasks', taskData);
    return response.data;
};

// Update a task
export const updateTask = async (taskId: string, updatedData: Partial<Task>): Promise<Task> => {
    const response = await api.patch(`/tasks/${taskId}`, updatedData);
    return response.data;
};

// Delete a task by ID
export const deleteTask = async (taskId: string): Promise<void> => {
    await api.delete(`/tasks/${taskId}`);
};
