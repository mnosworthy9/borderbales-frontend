import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Login, { LoginRequest } from '../../api/user/login';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
	token: null,
	isLoading: false,
	error: null,
};

export const loginAsync = createAsyncThunk(
	'user/login',
	async (credentials: LoginRequest) => {
		const response = await Login(credentials);
		return response.token;
	}
);

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setToken(state, action) {
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