import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LoginForm } from '../components/LoginForm';
import { Header } from '../components/Header';
import { AnnouncementList } from '../components/AnnouncementList';
export const IndexWelcomePage: React.VFC = () => {
	const {t} = useTranslation();

	return (
		<>
			<Header className="xarticle mb-4">
				<article className="mt-4">
					<p>{t('description1')}</p>
					<p>{t('description2')}</p>
				</article>
				<LoginForm />
			</Header>
			<article className="xarticle card">
				<div className="body">
					<AnnouncementList />
				</div>
			</article>
			<hr />
			<article className="xarticle vstack pa-2">
				<header>
					<h2>{t('_welcome.title')}</h2>
					<p>{t('_welcome.description')}</p>
				</header>
				<div className="row">
					<article className="col-4 col-12-sm">
						<h3><i className="bi bi-megaphone-fill"/> {t('_welcome.misshaiAlertTitle')}</h3>
						<p>{t('_welcome.misshaiAlertDescription')}</p>
					</article>
					<article className="col-4 col-12-sm">
						<h3><i className="bi bi-bar-chart-fill"/> {t('_missHai.ranking')}</h3>
						<p>{t('_welcome.misshaiRankingDescription')}</p>
						<Link to="/ranking">{t('_missHai.showRanking')}</Link>
					</article>
					<div className="col-4 col-12-sm">
						<h3><i className="bi bi-crop"/> {t('_catAdjuster.title')}</h3>
						<p>{t('_welcome.catAdjusterDescription')}</p>
					</div>
				</div>
				<article className="mt-5">
					<h3>{t('_welcome.nextFeaturesTitle')}</h3>
					<p>{t('_welcome.nextFeaturesDescription')}</p>
				</article>
			</article>
		</>
	);
};
