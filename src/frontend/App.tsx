import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Link, Route, Switch, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { IndexPage } from './pages';
import { RankingPage } from './pages/ranking';
import { Header } from './components/Header';
import { TermPage } from './pages/term';
import { store, useSelector } from './store';
import { ModalComponent } from './Modal';

import 'xeltica-ui/dist/css/xeltica-ui.min.css';
import './style.scss';
import { ActualTheme } from './misc/theme';

const AppInner : React.VFC = () => {
	const $location = useLocation();

	const theme = useSelector(state => state.screen.theme);

	const [ osTheme, setOsTheme ] = useState<ActualTheme>('dark');

	const applyTheme = useCallback(() => {
		const actualTheme = theme === 'system' ? osTheme : theme;
		if (actualTheme === 'dark') {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	}, [theme, osTheme]);

	// テーマ変更に追従する
	useEffect(() => {
		applyTheme();
	}, [theme, osTheme]);

	// システムテーマ変更に追従する
	useEffect(() => {
		const q = window.matchMedia('(prefers-color-scheme: dark)');
		setOsTheme(q.matches ? 'dark' : 'light');

		const listener = () => setOsTheme(q.matches ? 'dark' : 'light');
		q.addEventListener('change', listener);
		return () => {
			q.removeEventListener('change', listener);
		};
	}, [osTheme, setOsTheme]);

	const {t} = useTranslation();

	return (
		<>
			<div className="container">
				{$location.pathname !== '/' && <Header hasTopLink />}
				<Switch>
					<Route exact path="/" component={IndexPage} />
					<Route exact path="/ranking" component={RankingPage} />
					<Route exact path="/term" component={TermPage} />
				</Switch>
				<footer className="text-center pa-5">
					<p>(C)2020-2021 Xeltica</p>
					<p><Link to="/term">{t('termsOfService')}</Link></p>
				</footer>
				<ModalComponent />
			</div>
		</>
	);
};

export const App: React.VFC = () => (
	<Provider store={store}>
		<BrowserRouter>
			<AppInner />
		</BrowserRouter>
	</Provider>
);
