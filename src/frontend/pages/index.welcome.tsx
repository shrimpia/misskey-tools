import React, { useMemo }  from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LoginForm } from '../components/LoginForm';
import { Header } from '../components/Header';
export const IndexWelcomePage: React.VFC = () => {
	const {t} = useTranslation();

	const example = useMemo(() => (
		t('_template.default')
			.replace('{notesCount}', '32000')
			.replace('{notesDelta}', '+190')
			.replace('{followingCount}', '510')
			.replace('{followingDelta}', '+3')
			.replace('{followersCount}', '1020')
			.replace('{followersDelta}', '-1')
			.replace('{url}', 'https://misskey.tools')
	), []);

	return (
		<>
			<Header>
				<article className="mt-4">
					<p>{t('description1')}</p>
					<p>{t('description2')}</p>
				</article>
				<LoginForm />
			</Header>
			<article className="xarticle vstack pa-2">
				<header>
					<h2>{t('_welcome.title')}</h2>
					<p>{t('_welcome.description')}</p>
				</header>
				<article>
					<h3>{t('_welcome.misshaiAlertTitle')}</h3>
					<p>{t('_welcome.misshaiAlertDescription')}</p>
					<div className="card ma-2 shadow-2" style={{maxWidth: 320}}>
						<div className="body">
							<pre>{example}</pre>
						</div>
					</div>
				</article>
				<article>
					<h3 className="mb-1">{t('_missHai.ranking')}</h3>
					<p>{t('_welcome.misshaiRankingDescription')}</p>
					<Link to="/ranking">{t('_missHai.showRanking')}</Link>
				</article>
				<article>
					<h3>{t('_welcome.nextFeaturesTitle')}</h3>
					<p>{t('_welcome.nextFeaturesDescription')}</p>
				</article>
			</article>
		</>
	);
};
