import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { AlertMode } from '../../common/types/alert-mode';
import { IUser } from '../../common/types/user';
import { Visibility } from '../../common/types/visibility';
import { useGetSessionQuery } from '../services/session';
import { defaultTemplate } from '../../common/default-template';
import { Card } from './Card';
import { Theme } from '../misc/theme';
import { API_ENDPOINT, LOCALSTORAGE_KEY_TOKEN } from '../const';

type SettingDraftType = Pick<IUser,
	| 'alertMode'
	| 'visibility'
	| 'localOnly'
	| 'remoteFollowersOnly'
	| 'template'
>;

type DraftReducer = React.Reducer<SettingDraftType, Partial<SettingDraftType>>;

export const SettingPage: React.VFC = () => {
	const session = useGetSessionQuery(undefined);

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

	const [currentTheme, setCurrentTheme] = useState<Theme>('light');
	const [currentLang, setCurrentLang] = useState<string>('ja-JP');

	const updateSetting = useCallback(() => {
		fetch(`${API_ENDPOINT}session`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${localStorage[LOCALSTORAGE_KEY_TOKEN]}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(draft),
		})
			.then(() => alert('設定を保存しました。'))
			.catch(e => {
				alert(e.message);
			});
	}, [draft]);

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

	const saveButton = useMemo(() => (
		<button className="btn primary" style={{alignSelf: 'flex-end'}} onClick={updateSetting}>
			保存
		</button>
	), [updateSetting]);

	return session.isLoading || !data ? (
		<div className="skeleton" style={{width: '100%', height: '128px'}}></div>
	) : (
		<div className="vstack fade">
			<Card bodyClassName="vstack">
				<h1>スコア通知方法</h1>
				<div>
					<select name="alertMode" className="input-field" value={draft.alertMode} onChange={(e) => {
						dispatchDraft({ alertMode: e.target.value as AlertMode });
					}}>
						<option value="note">自動的にノートを投稿</option>
						<option value="notification">Misskeyに通知(標準)</option>
						<option value="nothing">通知しない</option>
					</select>
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
						<select name="visibility" className="input-field" value={draft.visibility} onChange={(e) => {
							dispatchDraft({ visibility: e.target.value as Visibility });
						}}>
							<option value="public">パブリック</option>
							<option value="home">ホーム</option>
							<option value="followers">フォロワー</option>
						</select>
						<label className="input-switch mt-2">
							<input type="checkbox" />
							<div className="switch"></div>
							<span>ローカル限定</span>
						</label>
					</div>
				)}
				{saveButton}
			</Card>
			<Card bodyClassName="vstack">
				<h1>表示設定</h1>
				<h2>テーマ</h2>
				<div>
					{
						themes.map(({ theme, name }) => (
							<label key={theme} className="input-check">
								<input type="radio" name={theme} value={theme} checked={theme === currentTheme} onChange={(e) => setCurrentTheme(e.target.value as Theme)} />
								<span>{name}</span>
							</label>
						))
					}
				</div>

				<h2>言語設定</h2>
				<select name="currentLang" className="input-field" value={currentLang} onChange={e => setCurrentLang(e.target.value)}>
					<option value="ja-JP">日本語</option>
					<option value="en-US">英語</option>
				</select>
			</Card>

			<Card bodyClassName="vstack">
				<h1>テンプレート</h1>
				<p>アラートの自動投稿をカスタマイズできます。テンプレートに使える文字数は280文字です。空欄にすると、デフォルト値にリセットされます。</p>
				<textarea className="input-field" value={draft.template ?? defaultTemplate} style={{height: 228}} onChange={(e) => {
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
				{saveButton}
			</Card>
			<Card bodyClassName="vstack">
				<button className="btn block">アラートをテスト送信する</button>
				<p className="text-dimmed">
					このボタンを押すと、現在の設定でアラートを送信するテストを行います。
				</p>
			</Card>
			<Card bodyClassName="vstack">
				<button className="btn block">ログアウトする</button>
				<p className="text-dimmed">
					ログアウトしても、アラートは送信されます。
				</p>
			</Card>
			<Card bodyClassName="vstack">
				<button className="btn danger block">アカウント連携を解除する</button>
				<p className="text-dimmed">
					これを実行すると、Misskeyとの連携設定を含むみす廃アラートのアカウントを削除します。
				</p>
			</Card>
		</div>
	);
};
