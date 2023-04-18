import insertTextAtCursor from 'insert-text-at-cursor';
import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { alertModes } from 'tools-shared/dist/types/alert-mode';
import { IUser } from 'tools-shared/dist/types/user';
import { Visibility } from 'tools-shared/dist/types/visibility';
import { LOCALSTORAGE_KEY_ACCOUNTS, LOCALSTORAGE_KEY_TOKEN } from '../../const';
import { $post, $put } from '../../misc/api';
import { Skeleton } from '../../components/Skeleton';
import { useSetAtom } from 'jotai';

import './misshai.scss';
import { Ranking } from '../../components/Ranking';
import { useTitle } from '../../hooks/useTitle';
import { Link } from 'react-router-dom';
import { modalAtom } from '@/store/client-state';

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
  'gacha',
] as const;

type SettingDraftType = Partial<Pick<IUser,
	| 'alertMode'
	| 'visibility'
	| 'localOnly'
	| 'remoteFollowersOnly'
	| 'template'
	| 'useRanking'
>>;

type DraftReducer = React.Reducer<SettingDraftType, Partial<SettingDraftType>>;

export const MisshaiPage: React.VFC = () => {
  const session = null as any;
  const data = session.data;
  const score = null as any;

	const setModal = useSetAtom(modalAtom);

  const {t} = useTranslation();

  useTitle('_sidebar.missHaiAlert');

  const [draft, dispatchDraft] = useReducer<DraftReducer>((state, action) => {
    return { ...state, ...action };
  }, {
    alertMode: data?.alertMode ?? 'note',
    visibility: data?.visibility ?? 'public',
    localOnly: data?.localOnly ?? false,
    remoteFollowersOnly: data?.remoteFollowersOnly ?? false,
    template: data?.template ?? null,
    useRanking: data?.useRanking ?? false,
  });

  const templateTextarea = useRef<HTMLTextAreaElement>(null);

  const availableVisibilities: Visibility[] = [
    'home',
    'followers'
  ];

  const updateSetting = useCallback((obj: SettingDraftType) => {
    const previousDraft = draft;
    dispatchDraft(obj);
    return $put('session', obj)
      .catch(() => {
        setModal({
          type: 'dialog',
          icon: 'error',
          message: t('error'),
        });
        dispatchDraft(previousDraft);
      });
  }, [draft]);

  const updateSettingWithDialog = useCallback((obj: SettingDraftType) => {
    updateSetting(obj)
      .then(() => setModal({
        type: 'dialog',
        icon: 'info',
        message: t('saved'),
      }));
  }, [updateSetting]);

  useEffect(() => {
    if (data) {
      dispatchDraft({
        alertMode: data.alertMode,
        visibility: data.visibility,
        localOnly: data.localOnly,
        remoteFollowersOnly: data.remoteFollowersOnly,
        template: data.template,
        useRanking: data.useRanking
      });
    }
  }, [data]);

  const onClickInsertVariables = useCallback<React.MouseEventHandler>((e) => {
    setModal({
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
    });
  }, [t, variables, templateTextarea.current]);

  const onClickInsertVariablesHelp = useCallback(() => {
    setModal({
      type: 'dialog',
      icon: 'info',
      message: t('_template.insertVariablesHelp'),
    });
  }, [t]);

  const onClickSendAlert = useCallback(() => {
    setModal({
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
            setModal({
              type: 'dialog',
              message: t('_sendTest.success'),
              icon: 'info',
            });
          }).catch((e) => {
            console.error(e);
            setModal({
              type: 'dialog',
              message: t('_sendTest.failure'),
              icon: 'error',
            });
          });
        }
      },
    });
  }, [t]);

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

  const remaining = 1024 - (draft.template ?? defaultTemplate).length;

  return session.isLoading || score.isLoading || !session.data || !score.data ? (
    <div className="vstack">
      <Skeleton width="100%" height="1rem" />
      <Skeleton width="100%" height="1rem" />
      <Skeleton width="100%" height="2rem" />
      <Skeleton width="100%" height="160px" />
    </div>
  ) : (
    <article className="fade">
      <section className="misshaiData">
        <h2><i className="fas fa-chart-line"></i> {t('_missHai.data')}</h2>
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
        <p><strong>{t('_missHai.rating')}{': '}</strong>{session.data.rating}</p>
      </section>
      <section className="misshaiRanking">
        <h2><i className="fas fa-ranking-star"/> {t('_missHai.ranking')}</h2>
        <Ranking limit={10} />
        <Link to="/apps/miss-hai/ranking" className="block mt-2">{t('_missHai.showAll')}</Link>
      </section>
      <section className="alertModeSetting">
        <h2><i className="fas fa-gear"></i> {t('settings')}</h2>
        <div className="vstack">
          <div className="card pa-2">
            <label className="input-check">
              <input type="checkbox" checked={draft.useRanking} onChange={(e) => {
                updateSetting({ useRanking: e.target.checked });
              }}/>
              <span>{t('_missHai.useRanking')}</span>
            </label>
          </div>
          <div className="card pa-2">
            <h3>{t('alertMode')}</h3>
            <div className="vstack slim">
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
                <i className="icon fas fa-circle-exclamation"></i>
                {t('_alertMode.notificationWarning')}
              </div>
            )}
            { (draft.alertMode === 'note' || draft.alertMode === 'both') && (
              <>
                <h3 className="mt-2">{t('visibility')}</h3>
                <div className="vstack slim">
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
          <div className="card pa-2">
            <h3>{t('template')}</h3>
            <p>{t('_template.description')}</p>
            <div className="hstack dense mb-2">
              <button className="btn" onClick={onClickInsertVariables}>
                {'{ } '}
                {t('_template.insertVariables')}
              </button>
              <button className="btn link text-info" onClick={onClickInsertVariablesHelp}>
                <i className="fas fa-circle-question" />
              </button>
            </div>
            <div className="textarea-wrapper">
              <textarea ref={templateTextarea} className="input-field" value={draft.template ?? defaultTemplate} placeholder={defaultTemplate} style={{height: 240}} onChange={(e) => {
                dispatchDraft({ template: e.target.value });
              }} />
              <span className={`textarea-remaining ${remaining <= 0 ? 'text-red text-bold' : ''}`}>{remaining}</span>
            </div>
            <small className="text-dimmed">{t('_template.description2')}</small>
            <div className="hstack mt-2">
              <button className="btn danger" onClick={() => dispatchDraft({ template: null })}>{t('resetToDefault')}</button>
              <button className="btn primary" onClick={() => {
                updateSettingWithDialog({ template: draft.template === '' ? null : draft.template });
              }} disabled={remaining < 0}>{t('save')}</button>
            </div>
          </div>
        </div>
      </section>
      <section className="list-form mt-2">
        <button className="item" onClick={onClickSendAlert} disabled={draft.alertMode === 'nothing'}>
          <i className="icon fas fa-paper-plane" />
          <div className="body">
            <h1>{t('sendAlert')}</h1>
            <p className="desc">{t(draft.alertMode === 'nothing' ? 'sendAlertDisabled' : 'sendAlertDescription')}</p>
          </div>
        </button>
      </section>
    </article>
  );
};


