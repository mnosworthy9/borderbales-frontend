import {configureStore} from '@reduxjs/toolkit';

import loginReducer from './user/reducers/loginReducer';

const store = configureStore({
	reducer: {
		login: loginReducer, // Possibly could combineReducers later
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
