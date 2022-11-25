import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LoginForm } from '../components/LoginForm';
import styled from 'styled-components';
import { useSelector } from '../store';
import { IsMobileProp } from '../misc/is-mobile-prop';
import Twemoji from 'react-twemoji';
import { useAnnouncements } from '../hooks/useAnnouncements';

const Hero = styled.div<IsMobileProp>`
	display: flex;
	position: relative;
	background: linear-gradient(-135deg, rgb(1, 169, 46), rgb(134, 179, 0) 35%);
	color: var(--white);
	padding: ${f => f.isMobile ? '16px' : '60px 90px'};
	overflow: hidden;
	gap: var(--margin);
	> .hero {
		flex: 2;
		min-width: 0;
		position: relative;
		z-index: 1000;
		p {
			${f => f.isMobile ? 'font-size: 1rem;' : ''}
		}
	}
	> .announcements {
		flex: 1;
		min-width: 0;
		max-height: 512px;
		overflow: auto;
		padding: var(--margin);
		border-radius: var(--radius);
		background: var(--black-50);
		backdrop-filter: blur(4px) brightness(120%);
		z-index: 1000;
		@media screen and (max-width: 800px) {
			display: none;
		}
	}
	> .rects {
		position: absolute;
		display: grid;
		right: 160px;
		bottom: -120px;
		width: 400px;
		height: 400px;
		gap: 8px;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		transform-origin: center center;
		transform: rotate(45deg);
		opacity: 0.5;
		> .rect {
			border: 2px solid var(--white);
			border-radius: 24px;
			box-shadow: 0 2px 4px var(--shadow-color);
		}
	}
`;

const FormWrapper = styled.div`
	max-width: 500px;
	color: var(--fg);
`;

export const IndexWelcomePage: React.VFC = () => {
	const {isMobile} = useSelector(state => state.screen);
	const {t} = useTranslation();

	const announcements = useAnnouncements();

	return (
		<>
			<Hero className="fluid shadow-2" isMobile={isMobile}>
				<div className="hero">
					<h1 className="shadow-t font-misskey">{t('title')}</h1>
					<p className="shadow-t">{t('description1')}</p>
					<p className="shadow-t">{t('description2')}</p>
					<FormWrapper className="bg-panel pa-2 mt-4 rounded shadow-2">
						<LoginForm />
					</FormWrapper>
				</div>
				<div className="announcements">
					<h2><i className="fas fa-bell"></i> {t('announcements')}</h2>
					<div className="menu xmenu">
						{announcements.map(a => (
							<Link className="item fluid" key={a.id} to={`/announcements/${a.id}`}>
								{a.title}
							</Link>
						))}
					</div>
				</div>
				<div className="rects">
					<div className="rect"></div>
					<div className="rect"></div>
					<div className="rect"></div>
					<div className="rect"></div>
				</div>
			</Hero>
			<Twemoji options={{className: 'twemoji'}}>
				<div className="py-4 text-125 text-center">
					👍&emsp;❤&emsp;😆&emsp;🎉&emsp;🍮
				</div>
			</Twemoji>
			<article className="xarticle vstack pa-2">
				<header>
					<h2>{t('_welcome.title')}</h2>
					<p>{t('_welcome.description')}</p>
				</header>
				<div className="row">
					<article className="col-4 col-12-sm">
						<h3><i className="fas fa-bullhorn"/> {t('_welcome.misshaiAlertTitle')}</h3>
						<p>{t('_welcome.misshaiAlertDescription')}</p>
					</article>
					<article className="col-4 col-12-sm">
						<h3><i className="fas fa-ranking-star"/> {t('_missHai.ranking')}</h3>
						<p>{t('_welcome.misshaiRankingDescription')}</p>
						<Link to="/apps/miss-hai/ranking">{t('_missHai.showRanking')}</Link>
					</article>
					<article className="col-4 col-12-sm">
						<h3><i className="fas fa-crop-simple"/> {t('catAdjuster')}</h3>
						<p>{t('_welcome.catAdjusterDescription')}</p>
					</article>
				</div>
				<article className="mt-5">
					<h3>{t('_welcome.nextFeaturesTitle')}</h3>
					<p>{t('_welcome.nextFeaturesDescription')}</p>
				</article>
			</article>
		</>
	);
};
