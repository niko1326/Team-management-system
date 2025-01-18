import axios from 'axios';

const API_URL = '/api/tasks';

export const createTask = async (taskData: {
    name: string;
    status: string;
    projectId: string;
}) => {
    return axios.post(API_URL, taskData);
};
