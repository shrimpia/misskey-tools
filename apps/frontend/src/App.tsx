import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAtomValue, useSetAtom } from 'jotai';

import { ModalComponent } from './Modal';
import { useTheme } from './misc/theme';
import {BREAKPOINT_SM, LOCALSTORAGE_KEY_ACCOUNTS, LOCALSTORAGE_KEY_TOKEN} from './const';
import { Router } from './Router';
import {IUser} from 'tools-shared/dist/types/user';
import { isMobileAtom } from './store/client-state';
import { accountsAtom } from './store/auth';
import { trpcClient } from './store/api';
import { sessionAtom } from './store/api/session';
import { GeneralLayout } from './layouts/general';
import { languageAtom } from './store/client-settings';
import { ErrorView } from './components/ErrorView';

export const App : React.FC = () => {
  const setMobile = useSetAtom(isMobileAtom);
  const setAccounts = useSetAtom(accountsAtom);
  const language = useAtomValue(languageAtom);

  const error = (window as any).__misshaialert?.error;
  const $location = useLocation();
  const {t, i18n} = useTranslation();

  useTheme();

  // 各トークンからアカウント情報を取得して格納
  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_ACCOUNTS) || '[]') as string[];
    Promise.all(accounts.map(token => trpcClient.session.getByToken.query(token))).then(a => setAccounts(a as IUser[]));
  }, []);

  // 画面幅の変化を監視し、isMobile フラグを算出する
  useEffect(() => {
    const qMobile = window.matchMedia(`(max-width: ${BREAKPOINT_SM})`);
    const syncMobile = (ev: MediaQueryListEvent) => setMobile(ev.matches);
    setMobile(qMobile.matches);
    qMobile.addEventListener('change', syncMobile);

    return () => {
      qMobile.removeEventListener('change', syncMobile);
    };
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const TheLayout = localStorage.getItem(LOCALSTORAGE_KEY_TOKEN) != null || $location.pathname !== '/' ? GeneralLayout : 'div';

  return (
    <TheLayout>
      {error ? (
        <ErrorView additionalInfo={t(`_error.${error}`)}>
          <a href="/" className="btn primary">{t('retry')}</a>
        </ErrorView>
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
