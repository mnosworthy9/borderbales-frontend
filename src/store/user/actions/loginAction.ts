import {createAsyncThunk} from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

import login from '../../../api/user/login';

export type LoginRequest = {
	email: string;
	password: string;
};

type LoginResponse = {
	accessToken: string;
	refreshToken: string;
};

export type KnownError = {
  message: string;
  description: string;
  code: number | undefined;
};

export const loginAsync = createAsyncThunk(
	'user/login',
	async (credentials: LoginRequest, thunkAPI) => {
		const response: string | undefined = await login(credentials);

		if (response == undefined){
			return thunkAPI.rejectWithValue("");
		}

		const decoded: LoginResponse = jwtDecode(response)
		const decodedAccessToken: {userId: string, isAdmin: boolean} = jwtDecode(decoded.accessToken);

		// Gonna need to get userId
		Cookies.set('accessToken', decoded.accessToken);
		Cookies.set('refreshToken', decoded.refreshToken);
		Cookies.set('isAdmin', decodedAccessToken.isAdmin.toString())

		return {decoded, isAdmin: decodedAccessToken.isAdmin};
	},
);
