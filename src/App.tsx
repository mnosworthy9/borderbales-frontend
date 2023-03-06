import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { loginAsync } from './store/user/actions/loginAction';
import { ILoginRequest } from './api/user/login';
import { useAppDispatch } from './store/store';

function App() {

	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const credentials: ILoginRequest = { email, password };
		await dispatch(loginAsync(credentials));
	};

	return (
		<div>
			{t('title')}
			<form onSubmit={handleSubmit}>
				<label>username</label>
				<input type="email" onChange={() => setEmail}/>
				<label>password</label>
				<input type="password" onChange={() => setPassword}/>
				<button>submit</button>
			</form>
		</div>
	);
}

export default App;
