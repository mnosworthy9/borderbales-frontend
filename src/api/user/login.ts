import {type LoginRequest} from '../../store/user/actions/loginAction';
import api from '../api';

const login = async (credentials: LoginRequest): Promise<string | undefined> => {
	try {
		const response = await api.post<string>('/api/users/login', credentials);

		return response.data;
	} catch {
		return undefined;
	}
};

export default login;
