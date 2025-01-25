import {createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import {createSlice} from '@reduxjs/toolkit';

import { signUp } from '../../api/requests/user';

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
export type SignUpRequest = {
	email: string;
	password: string;
};

type SignUpResponse = {
	accessToken: string;
	refreshToken: string;
};

export type KnownError = {
	message: string;
	description: string;
	code: number | undefined;
};

export const signUpAsync = createAsyncThunk(
	'user/signup',
	async (credentials: SignUpRequest, thunkAPI) => {
		const response: string | undefined = await signUp(credentials);

		if (!response){
			return thunkAPI.rejectWithValue("Invalid Sign Up Credentials");
		}
		let tokens: SignUpResponse;
		let accessToken: { userId: string; isAdmin: boolean };
		try {
			tokens = jwtDecode(response);
			accessToken = jwtDecode(tokens.accessToken);
			// ...rest of the logic
		} catch (error) {
			return thunkAPI.rejectWithValue("Failed to decode token.");
		}
		// Gonna need to get userId
		Cookies.set('accessToken', tokens.accessToken);
		Cookies.set('refreshToken', tokens.refreshToken);
		Cookies.set('isAdmin', accessToken.isAdmin.toString())

		return {tokens, isAdmin: accessToken.isAdmin};
	},
);

const signUpSlice = createSlice({
	name: 'signup',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload;
		},
		clearTokens: state => {
			state.accessToken = undefined;
			state.refreshToken = undefined;
			state.isAdmin = false;
		},
	},
	extraReducers: builder => {
		builder.addCase(signUpAsync.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(signUpAsync.fulfilled, (state, action) => {
			state.isLoading = false;
			state.accessToken = action.payload.tokens.accessToken;
			state.refreshToken = action.payload.tokens.refreshToken;
			state.isAdmin = action.payload.isAdmin;
		});
		builder.addCase(signUpAsync.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
	},
});

export const {setToken, clearTokens} = signUpSlice.actions;

export default signUpSlice.reducer;