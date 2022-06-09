import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useGetSessionQuery } from '../services/session';
import { Card } from '../components/Card';
import { Theme, themes } from '../misc/theme';
import { LOCALSTORAGE_KEY_TOKEN } from '../const';
import { changeLang, changeTheme, showModal } from '../store/slices/screen';
import { useSelector } from '../store';
import { languageName } from '../langs';
import { $delete } from '../misc/api';
import { useTitle } from '../hooks/useTitle';

export const SettingPage: React.VFC = () => {
	const session = useGetSessionQuery(undefined);
	const dispatch = useDispatch();

	const data = session.data;
	const {t} = useTranslation();

	useTitle('_sidebar.settings');

	const currentTheme = useSelector(state => state.screen.theme);
	const currentLang = useSelector(state => state.screen.language);

	const onClickLogout = useCallback(() => {
		dispatch(showModal({
			type: 'dialog',
			title: t('_logout.title'),
			message: t('_logout.message'),
			icon: 'question',
			buttons: [
				{
					text: t('_logout.yes'),
					style: 'primary',
				},
				{
					text: t('_logout.no'),
				},
			],
			onSelect(i) {
				if (i === 0) {
					localStorage.removeItem(LOCALSTORAGE_KEY_TOKEN);
					location.reload();
				}
			},
		}));
	}, [dispatch, t]);

	const onClickDeleteAccount = useCallback(() => {
		dispatch(showModal({
			type: 'dialog',
			title: t('_deactivate.title'),
			message: t('_deactivate.message'),
			icon: 'question',
			buttons: [
				{
					text: t('_deactivate.yes'),
					style: 'danger',
				},
				{
					text: t('_deactivate.no'),
				},
			],
			primaryClassName: 'danger',
			onSelect(i) {
				if (i === 0) {
					$delete('session').then(() => {
						dispatch(showModal({
							type: 'dialog',
							message: t('_deactivate.success'),
							icon: 'info',
							onSelect() {
								location.reload();
							}
						}));
					}).catch((e) => {
						console.error(e);
						dispatch(showModal({
							type: 'dialog',
							message: t('_deactivate.failure'),
							icon: 'error',
						}));
					});
				}
			},
		}));
	}, [dispatch, t]);


	return session.isLoading || !data ? (
		<div className="skeleton" style={{width: '100%', height: '128px'}}></div>
	) : (
		<div className="vstack fade">
			<Card bodyClassName="vstack">
				<h1><i className="fas fa-palette"></i> {t('appearance')}</h1>
				<h2>{t('theme')}</h2>
				<div className="vstack">
					{
						themes.map(theme => (
							<label key={theme} className="input-check">
								<input type="radio" value={theme} checked={theme === currentTheme} onChange={(e) => dispatch(changeTheme(e.target.value as Theme))} />
								<span>{t(`_themes.${theme}`)}</span>
							</label>
						))
					}
				</div>

				<h2>{t('language')}</h2>
				<select name="currentLang" className="input-field" value={currentLang} onChange={(e) => {
					dispatch(changeLang(e.target.value));
				}}>
					{
						(Object.keys(languageName) as Array<keyof typeof languageName>).map(n => (
							<option value={n} key={n}>{languageName[n]}</option>
						))
					}
				</select>
				<div className="alert bg-info mt-2">
					<i className="icon fas fa-language" />
					<div>
						{t('translatedByTheCommunity')}&nbsp;
						<a href="https://crowdin.com/project/misskey-tools" target="_blank" rel="noopener noreferrer">{t('helpTranslation')}</a>
					</div>
				</div>
			</Card>
			<div className="list-form">
				<button className="item" onClick={onClickLogout}>
					<i className="icon fas fa-arrow-up-right-from-square" />
					<div className="body">
						<h1>{t('logout')}</h1>
						<p className="desc">{t('logoutDescription')}</p>
					</div>
				</button>
				<button className="item text-danger" onClick={onClickDeleteAccount}>
					<i className="icon fas fa-trash-can" />
					<div className="body">
						<h1>{t('deleteAccount')}</h1>
						<p className="desc">{t('deleteAccountDescription')}</p>
					</div>
				</button>
			</div>
		</div>
	);
};
