import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IAnnouncement } from 'tools-shared/dist/types/announcement';
import { $get } from '../misc/api';

export const AnnouncementList: React.VFC = () => {
  const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);

  const fetchAllAnnouncements = () => {
    setAnnouncements([]);
    $get<IAnnouncement[]>('announcements').then(announcements => {
      setAnnouncements(announcements ?? []);
    });
  };

  useEffect(() => {
    fetchAllAnnouncements();
  }, []);

  if (announcements.length === 0) return null;

  return (
    <>
      <div className="large menu xmenu fade">
        {announcements.map(a => (
          <Link className="item fluid" key={a.id} to={`/announcements/${a.id}`}>
            {a.title}
          </Link>
        ))}
      </div>
    </>
  );
};
