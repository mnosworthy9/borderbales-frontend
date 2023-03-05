import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { loginAsync } from './store/user/loginSlice';
import { LoginRequest } from './api/user/login';
import { useAppDispatch } from './store/store';

function App() {

	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const credentials: LoginRequest = { email, password };
		dispatch(loginAsync(credentials));
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
