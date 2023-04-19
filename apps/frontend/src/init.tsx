import 'vite/modulepreload-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getBrowserLanguage, languageName, resources } from './langs';
import { App } from './App';
import { LOCALSTORAGE_KEY_LANG } from './const';
import { Loading } from './Loading';

import 'xeltica-ui/dist/css/xeltica-ui.min.css';
import './style.scss';
import 'dayjs/locale/ja';

dayjs.extend(relativeTime);

let lng = localStorage[LOCALSTORAGE_KEY_LANG];

if (!lng || !Object.keys(languageName).includes(lng)) {
  lng = localStorage[LOCALSTORAGE_KEY_LANG] = getBrowserLanguage();
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng,
    interpolation: {
      escapeValue: false // Reactは常にXSS対策をしてくれるので、i18next側では対応不要
    }
  });

ReactDOM.render((
	<BrowserRouter>
		<React.Suspense fallback={<Loading />}>
			<App />
		</React.Suspense>
	</BrowserRouter>
), document.getElementById('app'));
