import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, useLocation } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { store } from './store';
import { ModalComponent } from './Modal';
import { useTheme } from './misc/theme';
import {BREAKPOINT_SM, LOCALSTORAGE_KEY_ACCOUNTS} from './const';
import { useGetSessionQuery } from './services/session';
import { Router } from './Router';
import {setAccounts, setMobile} from './store/slices/screen';
import { GeneralLayout } from './GeneralLayout';
import {$get} from './misc/api';
import {IUser} from '../common/types/user';

const AppInner : React.VFC = () => {
  const { data: session } = useGetSessionQuery(undefined);
  const $location = useLocation();

  const dispatch = useDispatch();

  useTheme();

  const {t} = useTranslation();

  const [error, setError] = useState<any>((window as any).__misshaialert?.error);

  // ページ遷移がまだされていないかどうか
  const [isFirstView, setFirstView] = useState(true);

  useEffect(() => {
    if (isFirstView) {
      setFirstView(false);
    } else if (!isFirstView && error) {
      setError(null);
    }
  }, [$location]);

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_ACCOUNTS) || '[]') as string[];
    Promise.all(accounts.map(token => $get<IUser>('session', token))).then(a => dispatch(setAccounts(a as IUser[])));
  }, [dispatch]);

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
          <Link to="/" className="btn primary">{t('retry')}</Link>
        </div>
      ) : <Router />}
      <footer className="text-center pa-5">
        <p>(C)2020-2023 Shrimpia Network</p>
        <p><span dangerouslySetInnerHTML={{__html: t('disclaimerForMisskeyHq')}} /></p>
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
