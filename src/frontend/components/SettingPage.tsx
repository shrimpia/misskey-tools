import React, { useCallback, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { alertModes } from '../../common/types/alert-mode';
import { IUser } from '../../common/types/user';
import { Visibility } from '../../common/types/visibility';
import { useGetSessionQuery } from '../services/session';
import { Card } from './Card';
import { Theme, themes } from '../misc/theme';
import { API_ENDPOINT, LOCALSTORAGE_KEY_TOKEN } from '../const';
import { changeLang, changeTheme, showModal } from '../store/slices/screen';
import { useSelector } from '../store';
import { languageName } from '../langs';

const variables = [
	'notesCount',
	'followingCount',
	'followersCount',
	'notesDelta',
	'followingDelta',
	'followersDelta',
	'url',
	'username',
	'host',
	'rating',
] as const;

type SettingDraftType = Partial<Pick<IUser,
	| 'alertMode'
	| 'visibility'
	| 'localOnly'
	| 'remoteFollowersOnly'
	| 'template'
>>;

type DraftReducer = React.Reducer<SettingDraftType, Partial<SettingDraftType>>;

export const SettingPage: React.VFC = () => {
	const session = useGetSessionQuery(undefined);
	const dispatch = useDispatch();

	const data = session.data;
	const {t} = useTranslation();

	const [draft, dispatchDraft] = useReducer<DraftReducer>((state, action) => {
		return { ...state, ...action };
	}, {
		alertMode: data?.alertMode ?? 'note',
		visibility: data?.visibility ?? 'public',
		localOnly: data?.localOnly ?? false,
		remoteFollowersOnly: data?.remoteFollowersOnly ?? false,
		template: data?.template ?? null,
	});

	const currentTheme = useSelector(state => state.screen.theme);
	const currentLang = useSelector(state => state.screen.language);

	const availableVisibilities: Visibility[] = [
		'public',
		'home',
		'followers'
	];

	const updateSetting = useCallback((obj: SettingDraftType) => {
		const previousDraft = draft;
		dispatchDraft(obj);
		return fetch(`${API_ENDPOINT}session`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${localStorage[LOCALSTORAGE_KEY_TOKEN]}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(obj),
		})
			.catch(e => {
				dispatch(showModal({
					type: 'dialog',
					icon: 'error',
					message: 'エラー'
				}));
				dispatchDraft(previousDraft);
			});
	}, [draft]);

	const updateSettingWithDialog = useCallback((obj: SettingDraftType) => {
		updateSetting(obj)
			.then(() => dispatch(showModal({
				type: 'dialog',
				icon: 'info',
				message: '保存しました。'
			})));
	}, [updateSetting]);

	useEffect(() => {
		if (data) {
			dispatchDraft({
				alertMode: data.alertMode,
				visibility: data.visibility,
				localOnly: data.localOnly,
				remoteFollowersOnly: data.remoteFollowersOnly,
				template: data.template,
			});
		}
	}, [data]);

	const onClickInsertVariables = useCallback<React.MouseEventHandler>((e) => {
		dispatch(showModal({
			type: 'menu',
			screenX: e.clientX,
			screenY: e.clientY,
			items: variables.map(key => ({
				name: t('_template._variables.' + key),
				onClick: () => { console.log(key); },
			})),
		}));
	}, [dispatch, t, variables]);

	const onClickInsertVariablesHelp = useCallback(() => {
		dispatch(showModal({
			type: 'dialog',
			icon: 'info',
			message: t('_template.insertVariablesHelp'),
		}));
	}, [dispatch, t]);

	const onClickSendAlert = useCallback(() => {
		dispatch(showModal({
			type: 'dialog',
			title: t('_sendTest.title'),
			message: t('_sendTest.message'),
			icon: 'question',
			buttons: [
				{
					text: t('_sendTest.yes'),
					style: 'primary',
				},
				{
					text: t('_sendTest.no'),
				},
			],
			onSelect(i) {
				if (i === 0) {
					fetch(`${API_ENDPOINT}session/alert`, {
						method: 'POST',
						headers: {
							'Authorization': `Bearer ${localStorage[LOCALSTORAGE_KEY_TOKEN]}`,
						},
					}).then(() => {
						dispatch(showModal({
							type: 'dialog',
							message: t('_logout.success'),
							icon: 'info',
						}));
					}).catch((e) => {
						console.error(e);
						dispatch(showModal({
							type: 'dialog',
							message: t('_logout.failure'),
							icon: 'error',
						}));
					});
				}
			},
		}));
	}, [dispatch, t]);

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
					fetch(`${API_ENDPOINT}session`, {
						method: 'DELETE',
						headers: {
							'Authorization': `Bearer ${localStorage[LOCALSTORAGE_KEY_TOKEN]}`,
						},
					}).then(() => {
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

	const defaultTemplate = t('_template.default');

	return session.isLoading || !data ? (
		<div className="skeleton" style={{width: '100%', height: '128px'}}></div>
	) : (
		<div className="vstack fade">
			<Card bodyClassName="vstack">
				<h1>{t('alertMode')}</h1>
				<div>
					{
						alertModes.map((mode) => (
							<label key={mode} className="input-check">
								<input type="radio" checked={mode === draft.alertMode} onChange={() => {
									updateSetting({ alertMode: mode });
								}} />
								<span>{t(`_alertMode.${mode}`)}</span>
							</label>
						))
					}
				</div>

				{ draft.alertMode === 'notification' && (
					<div className="alert bg-danger mt-2">
						<i className="icon bi bi-exclamation-circle"></i>
						{t('_alertMode.notificationWarning')}
					</div>
				)}
				{ draft.alertMode === 'note' && (
					<>
						<h2>{t('visibility')}</h2>
						<div>
							{
								availableVisibilities.map((visibility) => (
									<label key={visibility} className="input-check">
										<input type="radio" checked={visibility === draft.visibility} onChange={() => {
											updateSetting({ visibility });
										}} />
										<span>{t(`_visibility.${visibility}`)}</span>
									</label>
								))
							}
						</div>
						<label className="input-check mt-2">
							<input type="checkbox" checked={draft.localOnly} onChange={(e) => {
								updateSetting({ localOnly: e.target.checked });
							}} />
							<span>{t('localOnly')}</span>
						</label>
					</>
				)}
			</Card>
			<Card bodyClassName="vstack">
				<h1>{t('appearance')}</h1>
				<h2>{t('theme')}</h2>
				<div>
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
					<i className="icon bi bi-translate" />
					{t('translatedByTheCommunity')}&nbsp;
					<a href="#TODO" target="_blank" rel="noopener noreferrer">{t('helpTranslation')}</a>
				</div>
			</Card>

			<Card bodyClassName="vstack">
				<h1>{t('template')}</h1>
				<p>{t('_template.description')}</p>
				<div className="hstack dense">
					<button className="btn" onClick={onClickInsertVariables}>
						<i className="bi bi-braces" />&nbsp;
						{t('_template.insertVariables')}
					</button>
					<button className="btn link text-info" onClick={onClickInsertVariablesHelp}>
						<i className="bi bi-question-circle" />
					</button>
				</div>
				<textarea className="input-field" value={draft.template ?? defaultTemplate} placeholder={defaultTemplate} style={{height: 228}} onChange={(e) => {
					dispatchDraft({ template: e.target.value });
				}} />
				<small className="text-dimmed">{t('_template.description2')}</small>
				<div className="hstack" style={{justifyContent: 'flex-end'}}>
					<button className="btn danger" onClick={() => dispatchDraft({ template: null })}>{t('resetToDefault')}</button>
					<button className="btn primary" onClick={() => {
						updateSettingWithDialog({ template: draft.template === '' ? null : draft.template });
					}}>{t('save')}</button>
				</div>
			</Card>
			<Card bodyClassName="vstack">
				<button className="btn block" onClick={onClickSendAlert}>{t('sendAlert')}</button>
				<p className="text-dimmed">{t('sendAlertDescription')}</p>
			</Card>
			<Card bodyClassName="vstack">
				<button className="btn block" onClick={onClickLogout}>{t('logout')}</button>
				<p className="text-dimmed">{t('logoutDescription')}</p>
			</Card>
			<Card bodyClassName="vstack">
				<button className="btn danger block" onClick={onClickDeleteAccount}>{t('deleteAccount')}</button>
				<p className="text-dimmed">{t('deleteAccountDescription')}</p>
			</Card>
		</div>
	);
};
