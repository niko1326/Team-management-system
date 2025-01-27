import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle empty responses
api.interceptors.response.use(
    (response) => {
        if (response.status === 204) {
            return { ...response, data: [] };
        }
        return response;
    },
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.error('Authentication error:', error.response);
        }
        return Promise.reject(error);
    }
);

export default api; 