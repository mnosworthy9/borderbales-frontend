import axios from 'axios';
import Cookies from 'js-cookie';

import {clearTokens} from '../store/user/login';
import {logout} from '../utils/logout';
import api from './api';

// TODO: move this secureApi to the middleware for all endpoints auth/.../...
const secureApi = axios.create({
	...api.defaults,
});

secureApi.interceptors.request.use(
	async config => {
		let accessToken = Cookies.get('accessToken'); // Get the JWT from localStorage
		if (accessToken === undefined) {
			const refreshToken = Cookies.get('refreshToken');
			if (refreshToken) {
				accessToken = await getAccessToken(refreshToken);
			}
		} else {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	async error => {
		return Promise.reject(error);
	},
);

secureApi.interceptors.response.use(
	response => {
		return response;
	},
	async error => {
		if (error.response && error.response.status === 401) {
			const refreshToken = Cookies.get('refreshToken');

			if (refreshToken) {
				try {
					const accessToken: string = await getAccessToken(refreshToken);
					Cookies.set('accessToken', accessToken);

					const originalRequest = error.config;
					originalRequest.headers.Authorization = `Bearer ${accessToken}`;
					return await secureApi(originalRequest);
				} catch (error) {
					console.log(error);
					clearTokens();
					logout();
				}
			} else {
				clearTokens();
				logout();
			}
		}
	},
);

const getAccessToken = async (refreshToken: string) => {
	const response = await api.post<string>('api/users/access-token', refreshToken);

	return response.data;
};

export default secureApi;
