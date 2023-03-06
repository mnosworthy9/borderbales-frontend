import api from '../api';

export interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse{
  token: string;
}

const login = async (credentials: ILoginRequest): Promise<ILoginResponse> => {
	const response = await api.post<ILoginResponse>('/user/login', credentials);
	return response.data;
};

export default login;