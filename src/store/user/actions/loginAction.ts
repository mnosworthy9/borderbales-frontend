import { createAsyncThunk } from '@reduxjs/toolkit';

import login, { ILoginRequest } from '../../../api/user/login';

export const loginAsync = createAsyncThunk(
	'user/login',
	async (credentials: ILoginRequest) => {
		const response = await login(credentials);
		return response.token;
	}
);
