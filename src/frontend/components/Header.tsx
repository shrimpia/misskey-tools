import React, { HTMLProps } from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useGetMetaQuery } from '../services/session';
import { CHANGELOG_URL } from '../const';

export type HeaderProps = {
	hasTopLink?: boolean;
	className?: HTMLProps<HTMLElement>['className'],
	style?: HTMLProps<HTMLElement>['style'],
};

const messageNumber = Math.floor(Math.random() * 6) + 1;

export const Header: React.FC<HeaderProps> = ({hasTopLink, children, className, style}) => {
	const {data: meta} = useGetMetaQuery(undefined);
	const { t } = useTranslation();
	return (
		<header className={`card ${className ?? ''}`} style={style}>
			<div className="body">
				<h1 className="text-primary mb-0" style={{ fontSize: '2rem' }}>
					{hasTopLink ? <Link to="/">{t('title')}</Link> : t('title')}
					{meta && (
						<a href={CHANGELOG_URL} target="_blank" rel="noopener noreferrer" className="text-125 text-dimmed ml-1">
							v{meta?.version}
						</a>
					)}
				</h1>
				<h2 className="text-dimmed ml-1">{t(`_welcomeMessage.pattern${messageNumber}`)}</h2>
				{children}
			</div>
		</header>
	);
};
