import React, { useCallback, useEffect, useReducer } from 'react';
import { alertModes } from '../../common/types/alert-mode';
import { IUser } from '../../common/types/user';
import { Visibility } from '../../common/types/visibility';
import { useGetSessionQuery } from '../services/session';
import { defaultTemplate } from '../../common/default-template';
import { Card } from './Card';
import { Theme } from '../misc/theme';
import { API_ENDPOINT, LOCALSTORAGE_KEY_LANG, LOCALSTORAGE_KEY_TOKEN } from '../const';
import { useDispatch } from 'react-redux';
import { changeLang, changeTheme, showModal } from '../store/slices/screen';
import { useSelector } from '../store';
import { languageName } from '../langs';

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

	const [draft, dispatchDraft] = useReducer<DraftReducer>((state, action) => {
		return { ...state, ...action };
	}, {
		alertMode: data?.alertMode ?? 'note',
		visibility: data?.visibility ?? 'public',
		localOnly: data?.localOnly ?? false,
		remoteFollowersOnly: data?.remoteFollowersOnly ?? false,
		template: data?.template ?? null,
	});

	const themes: Array<{ theme: Theme, name: string }> = [
		{
			theme: 'light',
			name: 'ライトテーマ'
		},
		{
			theme: 'dark',
			name: 'ダークテーマ'
		},
		{
			theme: 'system',
			name: 'システム設定に準じる'
		},
	];

	const currentTheme = useSelector(state => state.screen.theme);
	const currentLang = useSelector(state => state.screen.lang);

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
			message: 'WIP',
		}));
	}, [dispatch]);

	const onClickDeleteAccount = useCallback(() => {
		dispatch(showModal({
			type: 'dialog',
			message: 'WIP',
		}));
	}, [dispatch]);

	return session.isLoading || !data ? (
		<div className="skeleton" style={{width: '100%', height: '128px'}}></div>
	) : (
		<div className="vstack fade">
			<Card bodyClassName="vstack">
				<h1>アラート送信方法</h1>
				<div>
					{
						alertModes.map((mode) => (
							<label key={mode} className="input-check">
								<input type="radio" checked={mode === draft.alertMode} onChange={() => {
									updateSetting({ alertMode: mode });
								}} />
								<span>{mode}</span>
							</label>
						))
					}
					{draft.alertMode === 'notification' && (
						<div className="alert bg-danger mt-2">
							<i className="icon bi bi-exclamation-circle"></i>
							「Misskey に通知」オプションは古いMisskeyでは動作しません。
						</div>
					)}
				</div>
				{ draft.alertMode === 'note' && (
					<div>
						<label htmlFor="visibility" className="input-field">公開範囲</label>
						{
							availableVisibilities.map((visibility) => (
								<label key={visibility} className="input-check">
									<input type="radio" checked={visibility === draft.visibility} onChange={() => {
										updateSetting({ visibility });
									}} />
									<span>{visibility}</span>
								</label>
							))
						}
						<label className="input-check mt-2">
							<input type="checkbox" checked={draft.localOnly} onChange={(e) => {
								updateSetting({ localOnly: e.target.checked });
							}} />
							<span>ローカル限定</span>
						</label>
					</div>
				)}
			</Card>
			<Card bodyClassName="vstack">
				<h1>表示設定</h1>
				<h2>テーマ</h2>
				<div>
					{
						themes.map(({ theme, name }) => (
							<label key={theme} className="input-check">
								<input type="radio" value={theme} checked={theme === currentTheme} onChange={(e) => dispatch(changeTheme(e.target.value as Theme))} />
								<span>{name}</span>
							</label>
						))
					}
				</div>

				<h2>言語設定</h2>
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
				<h1>テンプレート</h1>
				<p>アラートの自動投稿をカスタマイズできます。</p>
				<textarea className="input-field" value={draft.template ?? defaultTemplate} placeholder={defaultTemplate} style={{height: 228}} onChange={(e) => {
					dispatchDraft({ template: e.target.value });
				}} />
				<small className="text-dimmed">
					ハッシュタグ #misshaialert は、テンプレートに関わらず自動付与されます。
				</small>
				<details>
					<summary>ヘルプ</summary>
					<ul className="fade">
						<li><code>{'{'}notesCount{'}'}</code>といった形式のテキストは変数として扱われ、これを含めると投稿時に自動的に値が埋め込まれます。</li>
					</ul>
				</details>
				<div className="hstack" style={{justifyContent: 'flex-end'}}>
					<button className="btn danger" onClick={() => dispatchDraft({ template: null })}>初期値に戻す</button>
					<button className="btn primary" onClick={() => {
						updateSettingWithDialog({ template: draft.template === '' ? null : draft.template });
					}}>保存</button>
				</div>
			</Card>
			<Card bodyClassName="vstack">
				<button className="btn block" onClick={onClickSendAlert}>アラートをテスト送信する</button>
				<p className="text-dimmed">
					現在の設定を用いて、アラート送信をテストします。
				</p>
			</Card>
			<Card bodyClassName="vstack">
				<button className="btn block" onClick={onClickLogout}>ログアウトする</button>
				<p className="text-dimmed">
					ログアウトしても、アラートは送信されます。
				</p>
			</Card>
			<Card bodyClassName="vstack">
				<button className="btn danger block" onClick={onClickDeleteAccount}>アカウント連携を解除する</button>
				<p className="text-dimmed">
					Misskeyとの連携設定を含むみす廃アラートのアカウントを削除します。
				</p>
			</Card>
		</div>
	);
};
