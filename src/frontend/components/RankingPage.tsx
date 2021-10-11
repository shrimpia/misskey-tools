import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Ranking } from './Ranking';

export const RankingPage: React.VFC = () => {
	const [limit, setLimit] = useState<number | undefined>(10);
	const {t} = useTranslation();
	return (
		<div className="fade">
			<Ranking limit={limit} />
			{limit && <button className="btn link" onClick={() => setLimit(undefined)}>{t('_missHai.showAll')}</button>}
		</div>
	);
};
