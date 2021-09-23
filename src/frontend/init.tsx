import * as React from 'react';
import * as ReactDOM from 'react-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { App } from './App';
import { getBrowserLanguage, resources } from './langs';

document.body.classList.add('dark');


i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: localStorage['lang'] ?? getBrowserLanguage(),
		interpolation: {
			escapeValue: false // react already safes from xss
		}
	});


ReactDOM.render(<App/>, document.getElementById('app'));
