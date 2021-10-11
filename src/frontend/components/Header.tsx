import React from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

export type HeaderProps = {
	hasTopLink?: boolean;
};

const messageNumber = Math.floor(Math.random() * 6) + 1;

export const Header: React.FC<HeaderProps> = ({hasTopLink, children}) => {
	const { t } = useTranslation();
	return (
		<header className={'xarticle card mt-5 mb-3'}>
			<div className="body">
				<h1 className="text-primary mb-0" style={{ fontSize: '2rem' }}>
					{hasTopLink ? <Link to="/">{t('title')}</Link> : t('title')}
				</h1>
				<h2 className="text-dimmed ml-1">{t(`_welcomeMessage.pattern${messageNumber}`)}</h2>
				{children}
			</div>
		</header>
	);
};
