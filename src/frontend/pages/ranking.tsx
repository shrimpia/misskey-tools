import React  from 'react';
import { useTranslation } from 'react-i18next';
import { Ranking } from '../components/Ranking';


export const RankingPage: React.VFC = () => {
	const {t} = useTranslation();

	return (
		<article className="xarticle">
			<h2>{t('_missHai.ranking')}</h2>
			<section>
				<p>{t('_missHai.rankingDescription1')}</p>
				<p><strong>{t('_missHai.rankingFormula')}</strong></p>
				<p>{t('_missHai.rankingDescription2')}</p>
			</section>
			<section className="pt-2">
				<Ranking />
			</section>
		</article>
	);
};
