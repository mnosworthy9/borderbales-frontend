import api from '../api';

export interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse{
  token: string;
}

const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
	const response = await api.post<LoginResponse>('/user/login', credentials);
	return response.data;
};

export default login;