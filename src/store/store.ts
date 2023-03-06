import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import loginReducer from './user/reducers/loginReducer';

const store = configureStore({
	reducer: {
		login: loginReducer //possibly could combineReducers later
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;