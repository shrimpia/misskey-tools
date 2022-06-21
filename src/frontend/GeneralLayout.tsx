import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { NavigationMenu } from './components/NavigationMenu';
import { IsMobileProp } from './misc/is-mobile-prop';

import { useGetMetaQuery, useGetSessionQuery } from './services/session';
import { useSelector } from './store';
import { setDrawerShown } from './store/slices/screen';

const Container = styled.div<IsMobileProp>`
	padding: var(--margin);
	position: relative;
`;

const Sidebar = styled.nav`
	width: 320px;
	position: fixed;
	top: var(--margin);
	left: var(--margin);
`;

const Main = styled.main<IsMobileProp>`
	flex: 1;
  margin-top: 80px;
	margin-left: ${p => !p.isMobile ? `${320 + 16}px` : 0};
	min-width: 0;
`;

const MobileHeader = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 64px;
	background: var(--panel);
	z-index: 1000;
	> h1 {
		font-size: 1rem;
		margin-bottom: 0;
	}
`;

export const GeneralLayout: React.FC = ({children}) => {
	const { data: session } = useGetSessionQuery(undefined);
	const { data: meta } = useGetMetaQuery(undefined);
	const { isMobile, title, isDrawerShown } = useSelector(state => state.screen);
	const {t} = useTranslation();

	const dispatch = useDispatch();

	return (
		<Container isMobile={isMobile}>
			{isMobile && (
				<MobileHeader className="navbar hstack f-middle shadow-2 pl-2">
					<button className="btn flat" onClick={() => dispatch(setDrawerShown(!isDrawerShown))}>
						<i className="fas fa-bars"></i>
					</button>
					<h1>{t(title ?? 'title')}</h1>
				</MobileHeader>
			)}
			<div>
				{!isMobile && (
					<Sidebar className="pa-2">
						<NavigationMenu />
					</Sidebar>
				)}
				<Main isMobile={isMobile}>
					{session && meta && meta.currentTokenVersion !== session.tokenVersion && (
						<div className="alert bg-danger flex f-middle mb-2">
							<i className="icon fas fa-circle-exclamation"></i>
							{t('shouldUpdateToken')}
							<a className="btn primary" href={`/login?host=${encodeURIComponent(session.host)}`}>
								{t('update')}
							</a>
						</div>
					)}
					{children}
				</Main>
			</div>
			<div className={`drawer-container ${isDrawerShown ? 'active' : ''}`}>
				<div className="backdrop" onClick={() => dispatch(setDrawerShown(false))}></div>
				<div className="drawer pa-2" onClick={e => e.stopPropagation()}>
					<NavigationMenu />
				</div>
			</div>
		</Container>
	);
};
