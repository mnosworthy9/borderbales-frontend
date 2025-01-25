import {createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import {createSlice} from '@reduxjs/toolkit';

import { login } from '../../api/requests/user';

type AuthState = {
	accessToken: string | undefined;
	refreshToken: string | undefined;
	isAdmin: boolean;
	isLoading: boolean;
	error: string | undefined;
};

const initialState: AuthState = {
	accessToken: undefined,
	refreshToken: undefined,
	isAdmin: false,
	isLoading: false,
	error: undefined,
};
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

		if (!response){
			return thunkAPI.rejectWithValue("Invalid Login Credentials");
		}
		let tokens: LoginResponse;
		let accessToken: { userId: string; isAdmin: boolean };
		try {
			tokens = jwtDecode(response);
			accessToken = jwtDecode(tokens.accessToken);
			// ...rest of the logic
		} catch (error) {
			return thunkAPI.rejectWithValue("Failed to decode token.");
		}
		Cookies.set('accessToken', tokens.accessToken);
		Cookies.set('refreshToken', tokens.refreshToken);

		return {tokens, isAdmin: accessToken.isAdmin};
	},
);

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setToken(state, action: PayloadAction<string>) {
			state.accessToken = action.payload;
		},
		clearTokens(state) {
			state.accessToken = undefined;
			state.refreshToken = undefined;
			state.isAdmin = false;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loginAsync.fulfilled, (state, {payload}) => {
				state.isLoading = false;
				state.accessToken = payload.tokens.accessToken;
				state.refreshToken = payload.tokens.refreshToken;
				state.isAdmin = payload.isAdmin;
			})
			.addCase(loginAsync.pending, state => {
				state.isLoading = true;
			})
			.addCase(loginAsync.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string;
			});
	},
});

export const {setToken, clearTokens} = loginSlice.actions;

export default loginSlice.reducer;