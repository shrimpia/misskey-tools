import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import { LOCALSTORAGE_KEY_ACCOUNTS, LOCALSTORAGE_KEY_TOKEN } from '../const';
import { LoginForm } from '../components/LoginForm';
import { Skeleton } from '../components/Skeleton';
import { useTitle } from '../hooks/useTitle';
import { accountsAtom, accountTokensAtom } from '@/store/auth';
import { sessionAtom } from '@/store/api/session';

export const AccountsPage: React.VFC = () => {
	const [accounts, setAccounts] = useAtom(accountsAtom);
	const accountTokens = useAtomValue(accountTokensAtom);
  const session = useAtomValue(sessionAtom);
  const {t} = useTranslation();

  useTitle('_sidebar.accounts');

  const switchAccount = (token: string) => {
    const newAccounts = accountTokens.filter(a => a !== token);
    newAccounts.push(localStorage.getItem(LOCALSTORAGE_KEY_TOKEN) ?? '');
    localStorage.setItem(LOCALSTORAGE_KEY_ACCOUNTS, JSON.stringify(newAccounts));
    localStorage.setItem(LOCALSTORAGE_KEY_TOKEN, token);
    location.reload();
  };

  return !session ? (
    <div className="vstack">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  ) :  (
    <article className="fade">
      <section>
        <h2>{t('_accounts.switchAccount')}</h2>

        <div className="menu xmenu large fluid mb-2">
          {
            accounts.length === accountTokens.length ? (
              accounts.map(account => (
                <button className="item fluid" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} onClick={() => switchAccount(account.misshaiToken)}>
                  <i className="icon fas fa-chevron-right" />
										@{account.username}@{account.host}
                  <button className="btn flat text-danger" style={{marginLeft: 'auto'}} onClick={e => {
                    const filteredAccounts = accounts.filter(ac => ac.id !== account.id);
                    setAccounts(filteredAccounts);
                    e.stopPropagation();
                  }}>
                    <i className="fas fa-trash-can"/>
                  </button>
                </button>
              ))
            ) : (
              <div className="item">...</div>
            )
          }
        </div>
      </section>
      <section>
        <h2>{t('_accounts.useAnother')}</h2>
        <LoginForm />
      </section>
    </article>
  );
};
