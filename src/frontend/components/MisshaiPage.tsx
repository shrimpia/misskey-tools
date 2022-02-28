import insertTextAtCursor from 'insert-text-at-cursor';
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { alertModes } from '../../common/types/alert-mode';
import { IUser } from '../../common/types/user';
import { Visibility } from '../../common/types/visibility';
import { LOCALSTORAGE_KEY_ACCOUNTS, LOCALSTORAGE_KEY_TOKEN } from '../const';
import { $post, $put } from '../misc/api';
import { useGetScoreQuery, useGetSessionQuery } from '../services/session';
import { showModal } from '../store/slices/screen';
import { AnnouncementList } from './AnnouncementList';
import { Ranking } from './Ranking';
import { Skeleton } from './Skeleton';

import './MisshaiPage.scss';
import { DeveloperInfo } from './DeveloperInfo';

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

export const MisshaiPage: React.VFC = () => {
	const dispatch = useDispatch();
	const [limit, setLimit] = useState<number | undefined>(10);

	const session = useGetSessionQuery(undefined);
	const data = session.data;
	const score = useGetScoreQuery(undefined);

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

	const templateTextarea = useRef<HTMLTextAreaElement>(null);

	const availableVisibilities: Visibility[] = [
		'public',
		'home',
		'followers'
	];

	const updateSetting = useCallback((obj: SettingDraftType) => {
		const previousDraft = draft;
		dispatchDraft(obj);
		return $put('session', obj)
			.catch(e => {
				dispatch(showModal({
					type: 'dialog',
					icon: 'error',
					message: t('error'),
				}));
				dispatchDraft(previousDraft);
			});
	}, [draft]);

	const updateSettingWithDialog = useCallback((obj: SettingDraftType) => {
		updateSetting(obj)
			.then(() => dispatch(showModal({
				type: 'dialog',
				icon: 'info',
				message: t('saved'),
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
				onClick: () => {
					if (templateTextarea.current) {
						insertTextAtCursor(templateTextarea.current, `{${key}}`);
					}
				},
			})),
		}));
	}, [dispatch, t, variables, templateTextarea.current]);

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
					$post('session/alert').then(() => {
						dispatch(showModal({
							type: 'dialog',
							message: t('_sendTest.success'),
							icon: 'info',
						}));
					}).catch((e) => {
						console.error(e);
						dispatch(showModal({
							type: 'dialog',
							message: t('_sendTest.failure'),
							icon: 'error',
						}));
					});
				}
			},
		}));
	}, [dispatch, t]);

	/**
	 * Session APIのエラーハンドリング
	 * このAPIがエラーを返した = トークンが無効 なのでトークンを削除してログアウトする
	 */
	useEffect(() => {
		if (session.error) {
			console.error(session.error);
			localStorage.removeItem(LOCALSTORAGE_KEY_TOKEN);
			const a = localStorage.getItem(LOCALSTORAGE_KEY_ACCOUNTS);
			if (a) {
				const accounts = JSON.parse(a) as string[];
				if (accounts.length > 0) {
					localStorage.setItem(LOCALSTORAGE_KEY_TOKEN, accounts[0]);
				}
			}
			location.reload();
		}
	}, [session.error]);

	const defaultTemplate = t('_template.default');

	return session.isLoading || score.isLoading || !session.data || !score.data ? (
		<div className="vstack">
			<Skeleton width="100%" height="1rem" />
			<Skeleton width="100%" height="1rem" />
			<Skeleton width="100%" height="2rem" />
			<Skeleton width="100%" height="160px" />
		</div>
	) : (
		<div className="vstack">
			<div className="card announcement">
				<div className="body">
					<AnnouncementList />
				</div>
			</div>
			<div className="misshaiPageLayout">
				<div className="card misshaiData">
					<div className="body">
						<h1><i className="bi-activity"></i> {t('_missHai.data')}</h1>
						<table className="table fluid">
							<thead>
								<tr>
									<th></th>
									<th>{t('_missHai.dataScore')}</th>
									<th>{t('_missHai.dataDelta')}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{t('notes')}</td>
									<td>{score.data.notesCount}</td>
									<td>{score.data.notesDelta}</td>
								</tr>
								<tr>
									<td>{t('following')}</td>
									<td>{score.data.followingCount}</td>
									<td>{score.data.followingDelta}</td>
								</tr>
								<tr>
									<td>{t('followers')}</td>
									<td>{score.data.followersCount}</td>
									<td>{score.data.followersDelta}</td>
								</tr>
							</tbody>
						</table>
						<p>
							<strong>
								{t('_missHai.rating')}{': '}
							</strong>
							{session.data.rating}
						</p>
					</div>
				</div>
				<div className="card developerInfo">
					<div className="body">
						<DeveloperInfo />
					</div>
				</div>
			</div>
			<div className="card misshaiRanking">
				<div className="body">
					<h1><i className="bi-bar-chart"></i> {t('_missHai.ranking')}</h1>
					<Ranking limit={limit} />
					{limit && <button className="btn link" onClick={() => setLimit(undefined)}>{t('_missHai.showAll')}</button>}
				</div>
			</div>
			<div className="misshaiPageLayout">
				<div className="card alertModeSetting">
					<div className="body">
						<h1 className="mb-2"><i className="bi-gear"></i> {t('alertMode')}</h1>
						<div className="vstack">
							{ alertModes.map((mode) => (
								<label key={mode} className="input-check">
									<input type="radio" checked={mode === draft.alertMode} onChange={() => {
										updateSetting({ alertMode: mode });
									}} />
									<span>{t(`_alertMode.${mode}`)}</span>
								</label>
							))}
						</div>
						{ (draft.alertMode === 'notification' || draft.alertMode === 'both') && (
							<div className="alert bg-danger mt-2">
								<i className="icon bi bi-exclamation-circle"></i>
								{t('_alertMode.notificationWarning')}
							</div>
						)}
						{ (draft.alertMode === 'note' || draft.alertMode === 'both') && (
							<>
								<h2 className="mt-2 mb-1">{t('visibility')}</h2>
								<div className="vstack">
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
					</div>
				</div>
				<div className="card templateSetting">
					<div className="body">
						<h1><i className="bi-card-text"></i> {t('template')}</h1>
						<p>{t('_template.description')}</p>
						<div className="hstack dense mb-2">
							<button className="btn" onClick={onClickInsertVariables}>
								<i className="bi bi-braces" />&nbsp;
								{t('_template.insertVariables')}
							</button>
							<button className="btn link text-info" onClick={onClickInsertVariablesHelp}>
								<i className="bi bi-question-circle" />
							</button>
						</div>
						<textarea ref={templateTextarea} className="input-field" value={draft.template ?? defaultTemplate} placeholder={defaultTemplate} style={{height: 228}} onChange={(e) => {
							dispatchDraft({ template: e.target.value });
						}} />
						<small className="text-dimmed">{t('_template.description2')}</small>
						<div className="hstack mt-2" style={{justifyContent: 'flex-end'}}>
							<button className="btn danger" onClick={() => dispatchDraft({ template: null })}>{t('resetToDefault')}</button>
							<button className="btn primary" onClick={() => {
								updateSettingWithDialog({ template: draft.template === '' ? null : draft.template });
							}}>{t('save')}</button>
						</div>
					</div>
				</div>
			</div>
			<div className="list-form mt-2">
				<button className="item" onClick={onClickSendAlert} disabled={draft.alertMode === 'nothing'}>
					<i className="icon bi bi-send" />
					<div className="body">
						<h1>{t('sendAlert')}</h1>
						<p className="desc">{t(draft.alertMode === 'nothing' ? 'sendAlertDisabled' : 'sendAlertDescription')}</p>
					</div>
				</button>
			</div>
		</div>
	);
};


