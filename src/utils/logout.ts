import Cookies from 'js-cookie';

export const logout = () => {
	Cookies.remove('accessToken');
	Cookies.remove('refreshToken');
	Cookies.remove('isAdmin');

	document.location.href = '/login';
};
