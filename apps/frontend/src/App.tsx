import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSetAtom } from 'jotai';

import { ModalComponent } from './Modal';
import { useTheme } from './misc/theme';
import {BREAKPOINT_SM, LOCALSTORAGE_KEY_ACCOUNTS} from './const';
import { useGetSessionQuery } from './services/session';
import { Router } from './Router';
import { GeneralLayout } from './GeneralLayout';
import {$get} from './misc/api';
import {IUser} from 'tools-shared/dist/types/user';
import { isMobileAtom } from './store/client-state';
import { accountsAtom } from './store/auth';

export const App : React.VFC = () => {
	const setMobile = useSetAtom(isMobileAtom);
	const setAccounts = useSetAtom(accountsAtom);

  const [error, setError] = useState<any>((window as any).__misshaialert?.error);

	const $location = useLocation();
  const {t} = useTranslation();

	useTheme();

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
    Promise.all(accounts.map(token => $get<IUser>('session', token))).then(a => setAccounts(a as IUser[]));
  }, []);

  useEffect(() => {
    const qMobile = window.matchMedia(`(max-width: ${BREAKPOINT_SM})`);
    const syncMobile = (ev: MediaQueryListEvent) => setMobile(ev.matches);
    setMobile(qMobile.matches);
    qMobile.addEventListener('change', syncMobile);

    return () => {
      qMobile.removeEventListener('change', syncMobile);
    };
  }, []);

  // const TheLayout = session || $location.pathname !== '/' ? GeneralLayout : 'div';
	const TheLayout = 'div';

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
