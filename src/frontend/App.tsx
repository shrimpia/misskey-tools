import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { store } from './store';
import { ModalComponent } from './Modal';
import { useTheme } from './misc/theme';
import { BREAKPOINT_SM, XELTICA_STUDIO_URL } from './const';
import { useGetSessionQuery } from './services/session';
import { Router } from './Router';
import { setMobile } from './store/slices/screen';
import { GeneralLayout } from './GeneralLayout';

const AppInner : React.VFC = () => {
	const { data: session } = useGetSessionQuery(undefined);
	const $location = useLocation();

	const dispatch = useDispatch();

	useTheme();

	const {t} = useTranslation();

	const error = (window as any).__misshaialert?.error;

	useEffect(() => {
		const qMobile = window.matchMedia(`(max-width: ${BREAKPOINT_SM})`);
		const syncMobile = (ev: MediaQueryListEvent) => dispatch(setMobile(ev.matches));
		dispatch(setMobile(qMobile.matches));
		qMobile.addEventListener('change', syncMobile);

		return () => {
			qMobile.removeEventListener('change', syncMobile);
		};
	}, []);

	const TheLayout = session || $location.pathname !== '/' ? GeneralLayout : 'div';

	return (
		<TheLayout>
			{error ? (
				<div>
					<h1>{t('error')}</h1>
					<p>{t('_error.sorry')}</p>
					<p>
						{t('_error.additionalInfo')}
						{t(`_error.${error}`)}
					</p>
				</div>
			) : <Router />}
			<footer className="text-center pa-5">
				<p>(C)2020-2022 <a href={XELTICA_STUDIO_URL} target="_blank" rel="noopener noreferrer">Xeltica Studio</a></p>
				<p>
					<a href="https://xeltica.notion.site/Misskey-Tools-688187fc85de4b7e901055326c7ffe74" target="_blank" rel="noreferrer noopener">
						{t('termsOfService')}
					</a>
				</p>
			</footer>
			<ModalComponent />
		</TheLayout>
	);
};

export const App: React.VFC = () => (
	<Provider store={store}>
		<BrowserRouter>
			<AppInner />
		</BrowserRouter>
	</Provider>
);
