import React  from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Ranking } from '../components/Ranking';
import { LoginForm } from '../components/LoginForm';
import { DeveloperInfo } from '../components/DeveloperInfo';
import { HashtagTimeline } from '../components/HashtagTimeline';
import { Header } from '../components/Header';

export const IndexWelcomePage: React.VFC = () => {
	const {t} = useTranslation();

	return (
		<>
			<Header>
				<article className="mt-4">
					<p>{t('description1')}</p>
					<p>{t('description2')}</p>
				</article>
				<LoginForm />
			</Header>
			<article className="xarticle card ghost">
				<div className="body">
					<h1 className="mb-1">{t('_missHai.ranking')}</h1>
					<Ranking limit={10} />
					<Link to="/ranking">{t('_missHai.showAll')}</Link>
				</div>
			</article>
			<article className="xarticle mt-4 row">
				<div className="col-12 pc-6 card ghost">
					<div className="body"><DeveloperInfo/></div>
				</div>
				<div className="col-12 pc-6 card ghost">
					<div className="body"><HashtagTimeline hashtag="misshaialert"/></div>
				</div>
			</article>
		</>
	);
};
