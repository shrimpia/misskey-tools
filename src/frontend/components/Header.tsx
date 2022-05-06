import React, { HTMLProps, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useGetMetaQuery, useGetSessionQuery } from '../services/session';
import { CHANGELOG_URL } from '../const';
import { createGacha } from '../../common/functions/create-gacha';

export type HeaderProps = {
	hasTopLink?: boolean;
	className?: HTMLProps<HTMLElement>['className'],
	style?: HTMLProps<HTMLElement>['style'],
};

export const Header: React.FC<HeaderProps> = ({hasTopLink, children, className, style}) => {
	const {data: meta} = useGetMetaQuery(undefined);
	const {data: session} = useGetSessionQuery(undefined);
	const { t } = useTranslation();
	const [generation, setGeneration] = useState(0);
	const gacha = useMemo(() => createGacha(), [generation]);



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
				<h2 className="text-dimmed">
					<button onClick={() => setGeneration(g => g + 1)} className="text-primary">
						<i className="bi bi-dice-5-fill" />
					</button>
					{gacha}
					{session && (
						<a
							href={`https://${session.host}/share?text=${encodeURIComponent(`${gacha} https://misskey.tools`)}`}
							target="_blank"
							rel="noreferrer noopener"
							className="ml-1">
							<i className="bi bi-share-fill" />
						</a>
					)}
				</h2>
				{children}
			</div>
		</header>
	);
};
