import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useGetSessionQuery } from '../services/session';
import { Theme, themes } from '../misc/theme';
import { LOCALSTORAGE_KEY_TOKEN } from '../const';
import { changeAccentColor, changeLang, changeTheme, showModal } from '../store/slices/screen';
import { useSelector } from '../store/slices/auth';
import { languageName } from '../langs';
import { $delete } from '../misc/api';
import { useTitle } from '../hooks/useTitle';
import { designSystemColors } from 'tools-shared/dist/types/design-system-color';
import styled from 'styled-components';

const ColorInput = styled.input<{color: string}>`
	display: block;
	appearance: none;
	width: 32px;
	height: 32px;
	border-radius: 999px;
	background-color: var(--panel);
	border: 4px solid var(--${p => p.color});
	cursor: pointer;
	transition: all 0.2s ease;
	&:checked {
		background: var(--${p => p.color});
		cursor: default;
	}
	&:hover, &:focus {
		box-shadow: 0 0 16px var(--${p => p.color});
		outline: none;
	}
`;

export const SettingPage: React.VFC = () => {
  const session = useGetSessionQuery(undefined);
  const dispatch = useDispatch();

  const data = session.data;
  const {t} = useTranslation();

  useTitle('_sidebar.settings');

  const currentTheme = useSelector(state => state.screen.theme);
  const currentLang = useSelector(state => state.screen.language);
  const currentAccentColor = useSelector(state => state.screen.accentColor);

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
          location.href = '/';
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
                localStorage.removeItem(LOCALSTORAGE_KEY_TOKEN);
                location.href = '/';
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
    <article className="fade">
      <h2><i className="fas fa-palette"></i> {t('appearance')}</h2>
      <div className="vstack">
        <div className="card pa-2">
          <h3>{t('theme')}</h3>
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
        </div>
        <div className="card pa-2">
          <h3>{t('accentColor')}</h3>
          <div className="hstack slim wrap mb-2">
            {designSystemColors.map(c => (
              <ColorInput className="shadow-2" type="radio" color={c} value={c} checked={c === currentAccentColor} onChange={e => dispatch(changeAccentColor(e.target.value))} />
            ))}
          </div>
          <button className="btn primary" onClick={() => dispatch(changeAccentColor('green'))}>{t('resetToDefault')}</button>
        </div>
        <div className="card pa-2">
          <h3>{t('language')}</h3>
          <select name="currentLang" className="input-field" value={currentLang} onChange={(e) => dispatch(changeLang(e.target.value))}>
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
        </div>
      </div>
      <section>
        <h2>{t('otherSettings')}</h2>
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
      </section>
    </article>
  );
};
