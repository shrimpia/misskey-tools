import React from 'react';
import { useTranslation } from 'react-i18next';

export const DeveloperInfo: React.VFC = () => {
	const {t} = useTranslation();
	return (
		<>
			<h1><i className="fas fa-circle-question"></i> {t('_developerInfo.title')}</h1>
			<p>{t('_developerInfo.description')}</p>
			<div className="menu large">
				<a className="item" href="http://groundpolis.app/@Lutica" target="_blank" rel="noopener noreferrer">
					<i className="icon fas fa-at"></i>
					Lutica@groundpolis.app
				</a>
				<a className="item" href="http://misskey.io/@le" target="_blank" rel="noopener noreferrer">
					<i className="icon fas fa-at"></i>
					le@misskey.io
				</a>
				<a className="item" href="http://twitter.com/@EbiseLutica" target="_blank" rel="noopener noreferrer">
					<i className="icon fas fa-at"></i>
					EbiseLutica@twitter.com
				</a>
			</div>
		</>
	);
};
