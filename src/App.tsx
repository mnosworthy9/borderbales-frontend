import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {loginAsync} from './store/user/actions/loginAction';
import {type LoginRequest} from './store/user/actions/loginAction';
import {useAppDispatch} from './store/hooks';

function App() {
	const {t} = useTranslation();
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const credentials: LoginRequest = {email, password};
		console.log(credentials);
		await dispatch(loginAsync(credentials));
	};

	return (
		<div>
			{t('title')}
			<form onSubmit={handleSubmit}>
				<label>username</label>
				<input type='email' onChange={e => {
					setEmail(e.target.value);
				}}/>
				<label>password</label>
				<input type='password' onChange={e => {
					setPassword(e.target.value);
				}}/>
				<button>submit</button>
			</form>
		</div>
	);
}

export default App;
