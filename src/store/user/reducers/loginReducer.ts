import {createSlice} from '@reduxjs/toolkit';

import {loginAsync} from '../actions/loginAction';

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

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setToken(state, action: {type: string; payload: string}) {
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
			.addCase(loginAsync.pending, state => {
				state.isLoading = true;
			})
			.addCase(loginAsync.fulfilled, (state, {payload}) => {
				state.isLoading = false;
				state.accessToken = payload.decoded.accessToken;
				state.refreshToken = payload.decoded.refreshToken;
				state.isAdmin = payload.isAdmin;
			})
			.addCase(loginAsync.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message ?? 'An error occurred';
			});
	},
});

export const {setToken, clearTokens} = loginSlice.actions;

export default loginSlice.reducer;
