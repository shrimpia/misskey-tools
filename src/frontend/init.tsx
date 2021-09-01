import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';

// cookieにトークンが入ってたらlocalStorageに移し替える
const token = document.cookie
	.split('; ')
	.find(row => row.startsWith('token'))
	?.split('=')[1];

console.log(document.cookie);
console.log(token);

if (token) {
	localStorage['token'] = token;
	// 今の所はcookieをトークン以外に使用しないため全消去する
	// もしcookieの用途が増えるのであればここを良い感じに書き直す必要がある
	document.cookie = '';
}

ReactDOM.render(<App/>, document.getElementById('app'));
