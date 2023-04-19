import React from 'react';
import { useAtomValue } from 'jotai';

import { useTranslation } from 'react-i18next';
import { useAnnouncements } from '../hooks/useAnnouncements';
import { Link } from 'react-router-dom';
import { sessionAtom } from '@/store/api/session';

export const IndexSessionPage: React.VFC = () => {
  const {t} = useTranslation();
  const session = useAtomValue(sessionAtom);
  const score = {
		notesCount: 0,
		notesDelta: 0,
		followingCount: 0,
		followingDelta: 0,
		followersCount: 0,
		followersDelta: 0,
	};

  const announcements = useAnnouncements();

  return (
    <article className="fade">
      <section>
        <h2><i className="fas fa-bell"></i> {t('announcements')}</h2>
        <div className="large menu xmenu fade">
          {announcements.map(a => (
            <Link className="item fluid" key={a.id} to={`/announcements/${a.id}`}>
              {a.title}
            </Link>
          ))}
        </div>
      </section>
      <div className="misshaiPageLayout">
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
                <td>{score.notesCount ?? '...'}</td>
                <td>{score.notesDelta ?? '...'}</td>
              </tr>
              <tr>
                <td>{t('following')}</td>
                <td>{score.followingCount ?? '...'}</td>
                <td>{score.followingDelta ?? '...'}</td>
              </tr>
              <tr>
                <td>{t('followers')}</td>
                <td>{score.followersCount ?? '...'}</td>
                <td>{score.followersDelta ?? '...'}</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>
              {t('_missHai.rating')}{': '}
            </strong>
            {session.rating ?? '...'}
          </p>
        </section>
        <section className="developerInfo">
          <h2><i className="fas fa-circle-question"></i> {t('_developerInfo.title')}</h2>
          <p>{t('_developerInfo.description')}</p>
          <div className="menu large">
            <a className="item" href="//mk.shrimpia.network/@Lutica" target="_blank" rel="noopener noreferrer">
              <i className="icon fas fa-at"></i>
							Lutica@mk.shrimpia.network
            </a>
          </div>
        </section>
      </div>
    </article>
  );
};
