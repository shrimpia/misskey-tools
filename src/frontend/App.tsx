import React from 'react';
import { BrowserRouter, Link, Route, Switch, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { IndexPage } from './pages';
import { RankingPage } from './pages/ranking';
import { Header } from './components/Header';
import { TermPage } from './pages/term';
import { store } from './store';
import { ModalComponent } from './Modal';
import { useTheme } from './misc/theme';
import { getBrowserLanguage, resources } from './langs';
import { LOCALSTORAGE_KEY_LANG, XELTICA_STUDIO_URL } from './const';
import { useGetSessionQuery } from './services/session';
import { AnnouncementPage } from './pages/announcement';

import 'xeltica-ui/dist/css/xeltica-ui.min.css';
import './style.scss';

document.body.classList.add('dark');

if (!localStorage[LOCALSTORAGE_KEY_LANG]) {
	localStorage[LOCALSTORAGE_KEY_LANG] = getBrowserLanguage();
}

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: localStorage[LOCALSTORAGE_KEY_LANG],
		interpolation: {
			escapeValue: false // react already safes from xss
		}
	});

const AppInner : React.VFC = () => {
	const { data: session } = useGetSessionQuery(undefined);
	const $location = useLocation();

	useTheme();

	const {t} = useTranslation();

	const error = (window as any).__misshaialert?.error;

	return error ? (
		<div className="container">
			<Header hasTopLink className="xarticle mb-2" />
			<div className="xarticle">
				<h1>{t('error')}</h1>
				<p>{t('_error.sorry')}</p>
				<p>
					{t('_error.additionalInfo')}
					{t(`_error.${error}`)}
				</p>
				<Link to="/" onClick={() => (window as any).__misshaialert.error = null}>{t('retry')}</Link>
			</div>
		</div>
	) : (
		<div className="container">
			{$location.pathname !== '/' && <Header hasTopLink className="xarticle mb-2" />}
			<Switch>
				<Route exact path="/" component={IndexPage} />
				<Route exact path="/ranking" component={RankingPage} />
				<Route exact path="/term" component={TermPage} />
				<Route exact path="/announcements/:id" component={AnnouncementPage} />
			</Switch>
			<footer className="text-center pa-5">
				<p>(C)2020-2022 <a href={XELTICA_STUDIO_URL} target="_blank" rel="noopener noreferrer">Xeltica Studio</a></p>
				<p dangerouslySetInnerHTML={{__html: t('disclaimerForMisskeyHq')}} />
				<p><Link to="/term">{t('termsOfService')}</Link></p>
				{session && (
					<p>
						<a
							className="btn primary"
							href={`https://${session.host}/share?text=${encodeURIComponent(t('shareMisskeyToolsNote') as string)}`}
							target="_blank"
							rel="noreferrer noopener">
							{t('shareMisskeyTools')}
						</a>
					</p>
				)}
			</footer>
			<ModalComponent />
		</div>
	);
};

export const App: React.VFC = () => (
	<Provider store={store}>
		<BrowserRouter>
			<AppInner />
		</BrowserRouter>
	</Provider>
);
