import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAtomValue, useSetAtom } from 'jotai';

import { ModalComponent } from './Modal';
import { useTheme } from './misc/theme';
import {BREAKPOINT_SM, LOCALSTORAGE_KEY_ACCOUNTS} from './const';
import { Router } from './Router';
import {IUser} from 'tools-shared/dist/types/user';
import { isMobileAtom } from './store/client-state';
import { accountsAtom } from './store/auth';
import { trpcClient } from './store/api';
import { sessionAtom } from './store/api/session';
import { GeneralLayout } from './GeneralLayout';
import { languageAtom } from './store/client-settings';

export const App : React.VFC = () => {
	const setMobile = useSetAtom(isMobileAtom);
	const setAccounts = useSetAtom(accountsAtom);
	const session = useAtomValue(sessionAtom);
	const language = useAtomValue(languageAtom);

  const [error, setError] = useState<any>((window as any).__misshaialert?.error);
  // ページ遷移がまだされていないかどうか
  const [isFirstView, setFirstView] = useState(true);

	const $location = useLocation();
  const {t, i18n} = useTranslation();
	useTheme();

	// エラーハンドリング
  useEffect(() => {
    if (isFirstView) {
      setFirstView(false);
    } else if (!isFirstView && error) {
      setError(null);
    }
  }, [$location]);

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
