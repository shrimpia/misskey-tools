import React, { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';

import { LOCALSTORAGE_KEY_TOKEN } from '../const';
import { Skeleton } from '../components/Skeleton';
import { IAnnouncement } from 'tools-shared/dist/types/announcement';
import { $delete, $get, $post, $put } from '../misc/api';
import { useTitle } from '../hooks/useTitle';
import {Log} from 'tools-shared/dist/types/log';
import {LogView} from '../components/LogView';
import { modalAtom } from '@/store/client-state';


export const AdminPage: React.VFC = () => {
  const session = null as any;
	const setModal = useSetAtom(modalAtom);

  useTitle('_sidebar.admin');

  const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
  const [selectedAnnouncement, selectAnnouncement] = useState<IAnnouncement | null>(null);
  const [isAnnouncementsLoaded, setAnnouncementsLoaded] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isDeleteMode, setDeleteMode] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftBody, setDraftBody] = useState('');

  const [misshaiLog, setMisshaiLog] = useState<Log[] | null>(null);

  const submitAnnouncement = async () => {
    if (selectedAnnouncement) {
      await $put('announcements', {
        id: selectedAnnouncement.id,
        title: draftTitle,
        body: draftBody,
      });
    } else {
      await $post('announcements', {
        title: draftTitle,
        body: draftBody,
      });
    }
    selectAnnouncement(null);
    setDraftTitle('');
    setDraftBody('');
    setEditMode(false);
    fetchAll();
  };

  const deleteAnnouncement = ({id}: IAnnouncement) => {
    $delete('announcements', {id}).then(() => {
      fetchAll();
    });
  };

  const fetchAll = () => {
    setAnnouncements([]);
    setAnnouncementsLoaded(false);
    $get<IAnnouncement[]>('announcements').then(announcements => {
      setAnnouncements(announcements ?? []);
      setAnnouncementsLoaded(true);
    });
    fetchLog();
  };

  const fetchLog = () => {
    $get<Log[]>('admin/misshai/log').then(setMisshaiLog);
  };

  const onClickStartMisshaiAlertWorkerButton = () => {
    $post('admin/misshai/start').then(() => {
      setModal({
        type: 'dialog',
        message: '開始',
      });
    }).catch((e) => {
      setModal({
        type: 'dialog',
        icon: 'error',
        message: e.message,
      });
    });
  };

  /**
	 * Session APIのエラーハンドリング
	 * このAPIがエラーを返した = トークンが無効 なのでトークンを削除してログアウトする
	 */
  // useEffect(() => {
  //   if (error) {
  //     console.error(error);
  //     localStorage.removeItem(LOCALSTORAGE_KEY_TOKEN);
  //     location.reload();
  //   }
  // }, [error]);

  /**
	 * Edit Modeがオンのとき、Delete Modeを無効化する（誤操作防止）
	 */
  useEffect(() => {
    if (isEditMode) {
      setDeleteMode(false);
    }
  }, [isEditMode]);

  /**
	 * お知らせ取得
	 */
  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (selectedAnnouncement) {
      setDraftTitle(selectedAnnouncement.title);
      setDraftBody(selectedAnnouncement.body);
    } else {
      setDraftTitle('');
      setDraftBody('');
    }
  }, [selectedAnnouncement]);

  return !session || !isAnnouncementsLoaded ? (
    <div className="vstack">
      <Skeleton width="100%" height="1rem" />
      <Skeleton width="100%" height="1rem" />
      <Skeleton width="100%" height="2rem" />
      <Skeleton width="100%" height="160px" />
    </div>
  ) : (
    <div className="fade vstack">
      {
        !session.isAdmin ? (
          <p>You are not an administrator and cannot open this page.</p>
        ) : (
          <>
            <div className="card shadow-2">
              <div className="body">
                <h1>Announcements</h1>
                {!isEditMode && (
                  <label className="input-switch mb-2">
                    <input type="checkbox" checked={isDeleteMode} onChange={e => setDeleteMode(e.target.checked)}/>
                    <div className="switch"></div>
                    <span>Delete Mode</span>
                  </label>
                )}
                { !isEditMode ? (
                  <>
                    {isDeleteMode && <div className="ml-2 text-danger">Click the item to delete.</div>}
                    <div className="large menu">
                      {announcements.map(a => (
                        <button className="item fluid" key={a.id} onClick={() => {
                          if (isDeleteMode) {
                            deleteAnnouncement(a);
                          } else {
                            selectAnnouncement(a);
                            setEditMode(true);
                          }
                        }}>
                          {isDeleteMode && <i className="icon bi fas fa-trash-can text-danger" />}
                          {a.title}
                        </button>
                      ))}
                      {!isDeleteMode && (
                        <button className="item fluid" onClick={() => setEditMode(true)}>
                          <i className="icon fas fa-plus" />
													Create New
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="vstack">
                    <label className="input-field">
											Title
                      <input type="text" value={draftTitle} onChange={e => setDraftTitle(e.target.value)} />
                    </label>
                    <label className="input-field">
											Body
                      <textarea className="input-field" value={draftBody} rows={10} onChange={e => setDraftBody(e.target.value)}/>
                    </label>
                    <div className="hstack" style={{justifyContent: 'flex-end'}}>
                      <button className="btn primary" onClick={submitAnnouncement} disabled={!draftTitle || !draftBody}>
												Submit
                      </button>
                      <button className="btn" onClick={() => {
                        selectAnnouncement(null);
                        setEditMode(false);
                      }}>
												Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <h2>Misshai</h2>
            <div className="vstack">
              <button className="btn danger" onClick={onClickStartMisshaiAlertWorkerButton}>
								ミス廃アラートワーカーを強制起動する
              </button>
              <h3>直近のワーカーエラー</h3>
              {misshaiLog && <LogView log={misshaiLog} />}
            </div>
          </>
        )
      }
    </div>
  );
};
