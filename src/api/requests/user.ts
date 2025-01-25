import {type LoginRequest} from '../../store/user/login';
import { SignUpRequest } from '../../store/user/signUp';
import api from '../api';
import { LoginRoute, SignUpRoute } from '../routes/user';

const login = async (credentials: LoginRequest): Promise<string | undefined> => {
	try {
		const response = await api.post<string>(LoginRoute, credentials);

		return response.data;
	} catch {
		return undefined;
	}
};

const signUp = async (credentials: SignUpRequest): Promise<string | undefined> => {
	try {
		const response = await api.post<string>(SignUpRoute, credentials);

		return response.data;
	} catch {
		return undefined;
	}
};

export { login, signUp };
