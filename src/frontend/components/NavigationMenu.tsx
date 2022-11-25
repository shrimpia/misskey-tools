import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CHANGELOG_URL } from '../const';
import { useGetMetaQuery, useGetSessionQuery } from '../services/session';
import { setDrawerShown } from '../store/slices/screen';

const navLinkClassName = (isActive: boolean) => `item ${isActive ? 'active' : ''}`;

export const NavigationMenu: React.VFC = () => {
	const { data: session } = useGetSessionQuery(undefined);
	const { data: meta } = useGetMetaQuery(undefined);
	const {t} = useTranslation();
	const dispatch = useDispatch();

	const onClickItem = () => {
		dispatch(setDrawerShown(false));
	};

	return (
		<>
			<h1 className="text-175 text-dimmed mb-2 font-misskey">{t('title')}</h1>
			<div className="menu">
				<section>
					<NavLink className={navLinkClassName} to="/" exact onClick={onClickItem}>
						<i className={`icon fas fa-${session ? 'home' : 'arrow-left'}`}></i>
						{t(session ? '_sidebar.dashboard' : '_sidebar.return')}
					</NavLink>
				</section>
				{session && (
					<section>
						<h1>{t('_sidebar.tools')}</h1>
						<NavLink className={navLinkClassName} to="/apps/miss-hai" onClick={onClickItem}>
							<i className="icon fas fa-tower-broadcast"></i>
							{t('_sidebar.missHaiAlert')}
						</NavLink>
						<NavLink className={navLinkClassName} to="/apps/avatar-cropper" onClick={onClickItem}>
							<i className="icon fas fa-crop-simple"></i>
							{t('_sidebar.cropper')}
						</NavLink>
					</section>
				)}
				{session && (
					<section>
						<h1>{session.username}@{session.host}</h1>
						<NavLink className={navLinkClassName} to="/account" onClick={onClickItem}>
							<i className="icon fas fa-circle-user"></i>
							{t('_sidebar.accounts')}
						</NavLink>
						<NavLink className={navLinkClassName} to="/settings" onClick={onClickItem}>
							<i className="icon fas fa-gear"></i>
							{t('_sidebar.settings')}
						</NavLink>
						{session.isAdmin && (
							<NavLink className={navLinkClassName} to="/admin" onClick={onClickItem}>
								<i className="icon fas fa-lock"></i>
								{t('_sidebar.admin')}
							</NavLink>
						)}
					</section>
				)}
				{meta && (
					<section>
						<a className="item" href={CHANGELOG_URL} onClick={onClickItem}>
							v{meta.version} {t('changelog')}
						</a>
					</section>
				)}
			</div>
		</>
	);
};
