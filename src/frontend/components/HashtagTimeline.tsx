import React from 'react';
import { useTranslation } from 'react-i18next';

export type HashtagTimelineProps = {
	hashtag: string;
};

export const HashtagTimeline: React.VFC<HashtagTimelineProps> = ({hashtag}) => {
	const {t} = useTranslation();
	return (
		<>
			<h1>{t('_timeline.title')}</h1>
			<p>{t('_timeline.description', { hashtag })}</p>
			<p>WIP</p>
		</>
	);
};
