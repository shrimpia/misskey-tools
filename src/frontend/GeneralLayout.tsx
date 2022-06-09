import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { useGetMetaQuery, useGetSessionQuery } from './services/session';
import { useSelector } from './store';

type IsMobileProp = { isMobile: boolean };

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
	> h1 {
		font-size: 1rem;
		margin-bottom: 0;
	}
`;

export const GeneralLayout: React.FC = ({children}) => {
	const { data: session } = useGetSessionQuery(undefined);
	const { data: meta } = useGetMetaQuery(undefined);
	const { isMobile, title } = useSelector(state => state.screen);
	const {t} = useTranslation();

	const navLinkClassName = (isActive: boolean) => `item ${isActive ? 'active' : ''}`;

	return (
		<Container isMobile={isMobile}>
			{isMobile && (
				<MobileHeader className="navbar hstack f-middle shadow-2 pl-2">
					<button className="btn flat">
						<i className="fas fa-bars"></i>
					</button>
					<h1>{t(title ?? 'title')}</h1>
				</MobileHeader>
			)}
			<div>
				{!isMobile && (
					<Sidebar className="pa-2">
						<h1 className="text-175 text-primary mb-2">{t('title')}</h1>
						<div className="menu">
							<section>
								<NavLink className={navLinkClassName} to="/" exact>
									<i className="icon fas fa-home"></i>
									{t('_sidebar.dashboard')}
								</NavLink>
							</section>
							<section>
								<h1>{t('_sidebar.tools')}</h1>
								<NavLink className={navLinkClassName} to="/apps/miss-hai">
									<i className="icon fas fa-tower-broadcast"></i>
									{t('_sidebar.missHaiAlert')}
								</NavLink>
								<NavLink className={navLinkClassName} to="/apps/avatar-cropper">
									<i className="icon fas fa-crop-simple"></i>
									{t('_sidebar.cropper')}
								</NavLink>
							</section>
							<section>
								{session && <h1>{session.username}@{session.host}</h1>}
								{session && (
									<NavLink className={navLinkClassName} to="/account">
										<i className="icon fas fa-circle-user"></i>
										{t('_sidebar.accounts')}
									</NavLink>
								)}
								<NavLink className={navLinkClassName} to="/settings">
									<i className="icon fas fa-gear"></i>
									{t('_sidebar.settings')}
								</NavLink>
								<NavLink className={navLinkClassName} to="/admin">
									<i className="icon fas fa-lock"></i>
									{t('_sidebar.admin')}
								</NavLink>
							</section>
						</div>
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
		</Container>
	);
};
