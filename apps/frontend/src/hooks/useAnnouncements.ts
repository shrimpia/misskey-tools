import { useEffect, useState } from 'react';
import { IAnnouncement } from 'tools-shared/dist/types/announcement';
import { $get } from '../misc/api';

export const useAnnouncements = () => {
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

  return announcements;
};
