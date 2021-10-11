import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IAnnouncement } from '../../common/types/announcement';
import { $get } from '../misc/api';
import { Card } from './Card';

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
		<Card>
			<h1>お知らせ</h1>
			<div className="large menu fade">
				{announcements.map(a => (
					<Link className="item fluid" key={a.id} to={`/announcements/${a.id}`}>
						{a.title}
					</Link>
				))}
			</div>
		</Card>
	);
};
