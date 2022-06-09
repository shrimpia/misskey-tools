import React from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useGetSessionQuery } from './services/session';
import { useSelector } from './store';

export type HeaderProps = {
	title?: string;
};

export const Header: React.FC<HeaderProps> = ({title}) => {
	const { t } = useTranslation();
	const { data } = useGetSessionQuery(undefined);
	const { isMobile } = useSelector(state => state.screen);

	return (
		<header className="navbar hstack shadow-2 bg-panel rounded _header">
			<h1 className="navbar-title text-primary mb-0 text-100">
				{<Link to="/">{t('title')}</Link>}
				{title && <> / {title}</>}
			</h1>
			{data && (
				<button className="btn flat ml-auto primary">
					<i className="fas fa-circle-user"></i>
					{!isMobile && <span className="ml-1">{data.username}<span className="text-dimmed">@{data.host}</span></span>}
				</button>
			)}
		</header>
	);
};
