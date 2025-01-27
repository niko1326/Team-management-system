import { Task, TaskStatus } from '../types/Task';
import api from './api';

const API_URL = '/tasks';

// Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
};

// Fetch tasks by project ID
export const fetchTasksByProjectId = async (projectId: number): Promise<Task[]> => {
    try {
        const response = await api.get(`/api/tasks/project/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error('Failed to fetch tasks');
    }
};

// Add a new task
export const createTask = async (task: Partial<Task>): Promise<Task> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const response = await api.post('/api/tasks', task, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error: any) {
        console.error('Error creating task:', error);
        throw new Error('Failed to create task');
    }
};

// Update a task
export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
    try {
        const response = await api.put<Task>(`/api/tasks/${id}`, task);
        return response.data;
    } catch (error: any) {
        console.error('Error updating task:', error);
        throw new Error('Failed to update task');
    }
};

// Update task status
export const updateTaskStatus = async (taskId: number, status: TaskStatus): Promise<Task> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const response = await api.patch(`/api/tasks/${taskId}`, { status }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error: any) {
        console.error('Error updating task status:', error);
        throw new Error('Failed to update task status');
    }
};

// Delete a task by ID
export const deleteTask = async (id: number): Promise<void> => {
    try {
        await api.delete(`/api/tasks/${id}`);
    } catch (error: any) {
        console.error('Error deleting task:', error);
        throw new Error('Failed to delete task');
    }
};

export const getTaskById = async (id: number): Promise<Task> => {
    try {
        const response = await api.get<Task>(`/api/tasks/${id}`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching task:', error);
        throw new Error('Failed to fetch task');
    }
};
