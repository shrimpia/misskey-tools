import React  from 'react';
import { useTranslation } from 'react-i18next';
import { Ranking } from '../components/Ranking';


export const RankingPage: React.VFC = () => {
	const {t} = useTranslation();

	return (
		<article className="xarticle">
			<h2>{t('_missHai.ranking')}</h2>
			<section>
				<p>{t('_missHai.rankingDescription')}</p>
			</section>
			<section className="pt-2">
				<Ranking />
			</section>
		</article>
	);
};
