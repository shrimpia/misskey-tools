import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { IAnnouncement } from '../../common/types/announcement';
import { $get } from '../misc/api';

export const AnnouncementList: React.VFC = () => {
	const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
	const {t} = useTranslation();

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
			<h2 className="mb-0">{t('announcements')}</h2>
			<div className="large menu fade">
				{announcements.map(a => (
					<Link className="item fluid" key={a.id} to={`/announcements/${a.id}`}>
						{a.title}
					</Link>
				))}
			</div>
		</>
	);
};
