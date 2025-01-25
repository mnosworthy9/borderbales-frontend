import React from 'react';
import ReactDOM from 'react-dom/client';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';

import App from './App';
import i18n from './i18n/i18n';
import store from './store/store';

const root = ReactDOM.createRoot(
	document.getElementById('root')!,
);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<I18nextProvider i18n={i18n}>
				<App />
			</I18nextProvider>
		</Provider>
	</React.StrictMode>,
);
