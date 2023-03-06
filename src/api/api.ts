import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token'); // Get the JWT from localStorage
		if (token) {
			config.headers.Authorization = `Bearer ${token}`; // Add the JWT to the headers
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);


export default api;