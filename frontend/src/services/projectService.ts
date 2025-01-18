import axios from 'axios';

const API_URL = '/api/projects';

export const fetchProjects = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createProject = async (data: any) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};
