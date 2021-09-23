import React, { useCallback, useEffect, useReducer } from 'react';
import { alertModes } from '../../common/types/alert-mode';
import { IUser } from '../../common/types/user';
import { Visibility } from '../../common/types/visibility';
import { useGetSessionQuery } from '../services/session';
import { Card } from './Card';
import { Theme, themes } from '../misc/theme';
import { API_ENDPOINT, LOCALSTORAGE_KEY_TOKEN } from '../const';
import { useDispatch } from 'react-redux';
import { changeLang, changeTheme, showModal } from '../store/slices/screen';
import { useSelector } from '../store';
import { languageName } from '../langs';
import { useTranslation } from 'react-i18next';

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
		dispatchDraft(obj);
		return fetch(`${API_ENDPOINT}session`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${localStorage[LOCALSTORAGE_KEY_TOKEN]}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(obj),
		});
	}, []);

	const updateSettingWithDialog = useCallback((obj: SettingDraftType) => {
		updateSetting(obj)
			.then(() => dispatch(showModal({
				type: 'dialog',
				icon: 'info',
				message: '保存しました。'
			})))
			.catch(e => {
				alert(e.message);
			});
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

	const onClickSendAlert = useCallback(() => {
		dispatch(showModal({
			type: 'dialog',
			title: 'アラートをテスト送信しますか？',
			message: '現在の設定でアラートを送信します。設定が保存済みであるかどうか、実行前に必ずご確認ください。',
			icon: 'question',
			buttons: 'yesNo',
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
							message: '送信しました。',
							icon: 'info',
						}));
					}).catch((e) => {
						console.error(e);
						dispatch(showModal({
							type: 'dialog',
							message: '送信に失敗しました。',
							icon: 'error',
						}));
					});
				}
			},
		}));
	}, [dispatch]);

	const onClickLogout = useCallback(() => {
		dispatch(showModal({
			type: 'dialog',
			title: 'ログアウトしてもよろしいですか？',
			message: 'ログアウトしても、アラート送信や、お使いのMisskeyアカウントのデータ収集といった機能は動作し続けます。Misskey Toolsの利用を停止したい場合は、「アカウント連携を解除する」ボタンを押下して下さい。',
			icon: 'question',
			buttons: 'yesNo',
			onSelect(i) {
				if (i === 0) {
					localStorage.removeItem(LOCALSTORAGE_KEY_TOKEN);
					location.reload();
				}
			},
		}));
	}, [dispatch]);

	const onClickDeleteAccount = useCallback(() => {
		dispatch(showModal({
			type: 'dialog',
			message: 'WIP',
		}));
	}, [dispatch]);

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
			</Card>

			<Card bodyClassName="vstack">
				<h1>{t('template')}</h1>
				<p>{t('_template.description')}</p>
				<textarea className="input-field" value={draft.template ?? defaultTemplate} placeholder={defaultTemplate} style={{height: 228}} onChange={(e) => {
					dispatchDraft({ template: e.target.value });
				}} />
				<small className="text-dimmed">{t('_template.description2')}</small>
				<details>
					<summary>{t('help')}</summary>
					<ul className="fade">
						<li><code>{'{'}notesCount{'}'}</code>といった形式のテキストは変数として扱われ、これを含めると投稿時に自動的に値が埋め込まれます。</li>
					</ul>
				</details>
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
