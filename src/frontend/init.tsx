import * as React from 'react';
import * as ReactDOM from 'react-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { App } from './App';
import { LOCALSTORAGE_KEY_TOKEN } from './const';
import { resources } from './langs';

document.body.classList.add('dark');

// cookieにトークンが入ってたらlocalStorageに移し替える
const token = document.cookie
	.split('; ')
	.find(row => row.startsWith('token'))
	?.split('=')[1];

if (token) {
	localStorage[LOCALSTORAGE_KEY_TOKEN] = token;
	// 今の所はcookieをトークン以外に使用しないため全消去する
	// もしcookieの用途が増えるのであればここを良い感じに書き直す必要がある
	document.cookie = '';
}

console.log(resources);

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: localStorage['lang'] ?? 'ja_JP',
		interpolation: {
			escapeValue: false // react already safes from xss
		}
	});


ReactDOM.render(<App/>, document.getElementById('app'));
