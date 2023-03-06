import { createSlice } from '@reduxjs/toolkit';

import { loginAsync } from '../actions/loginAction';

interface IAuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IAuthState = {
	token: null,
	isLoading: false,
	error: null,
};

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setToken(state, action) {
			// eslint-disable-next-line
			state.token = action.payload;
		},
		clearToken(state) {
			state.token = null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loginAsync.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginAsync.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.token = action.payload;
			})
			.addCase(loginAsync.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'An error occurred';
			});
	},
});

export const { setToken, clearToken } = loginSlice.actions;

export default loginSlice.reducer;