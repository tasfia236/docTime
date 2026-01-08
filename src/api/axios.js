import axios from 'axios';

const API = axios.create({
    baseURL: 'https://doc-time-server.vercel.app/api'
    //   baseURL: 'http://localhost:5000/api',
});

// Request interceptor to add token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for error handling
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default API;