import React from 'react';
import { useTranslation } from 'react-i18next';

export const DeveloperInfo: React.VFC = () => {
	const {t} = useTranslation();
	return (
		<>
			<h1>{t('_developerInfo.title')}</h1>
			<p>{t('_developerInfo.description')}</p>
			<ul>
				<li><a href="http://misskey.io/@ebi" target="_blank" rel="noopener noreferrer">@ebi@misskey.io</a></li>
				<li><a href="http://groundpolis.app/@X" target="_blank" rel="noopener noreferrer">@X@groundpolis.app</a></li>
				<li><a href="http://twitter.com/@adxlw" target="_blank" rel="noopener noreferrer">@adxlw@twitter.com</a></li>
			</ul>
		</>
	);
};
