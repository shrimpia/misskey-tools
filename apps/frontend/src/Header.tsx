import React from 'react';
import { Link } from 'react-router-dom';
import { useAtomValue } from 'jotai';

import { useTranslation } from 'react-i18next';
import { isMobileAtom } from './store/client-state';

export type HeaderProps = {
	title?: string;
};

export const Header: React.FC<HeaderProps> = ({title}) => {
  const { t } = useTranslation();
  const session = null as any;
  const isMobile = useAtomValue(isMobileAtom);

  return (
    <header className="navbar hstack shadow-2 bg-panel rounded _header">
      <h1 className="navbar-title text-primary mb-0 text-100">
        {<Link to="/">{t('title')}</Link>}
        {title && <> / {title}</>}
      </h1>
      {session && (
        <button className="btn flat ml-auto primary">
          <i className="fas fa-circle-user"></i>
          {!isMobile && <span className="ml-1">{session.username}<span className="text-dimmed">@{session.host}</span></span>}
        </button>
      )}
    </header>
  );
};
