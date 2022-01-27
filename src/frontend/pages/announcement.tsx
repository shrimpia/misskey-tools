import React, { ReactNodeArray, useEffect, useState }  from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
import { IAnnouncement } from '../../common/types/announcement';
import { Skeleton } from '../components/Skeleton';
import { $get } from '../misc/api';
import { useSelector } from '../store';

export const AnnouncementPage: React.VFC = () => {
	const { id } = useParams<{id: string}>();
	if (!id) return null;

	const [announcement, setAnnouncement] = useState<IAnnouncement | null>();

	const lang = useSelector(state => state.screen.language);

	useEffect(() => {
		$get<IAnnouncement>('announcements/' + id).then(setAnnouncement);
	}, [setAnnouncement]);
	return (
		<article className="xarticle">
			{!announcement ? <Skeleton width="100%" height="10rem" /> : (
				<div className="card">
					<div className="body">
						<header className="mb-4">
							<h2 className="mb-0">{announcement.title}</h2>
							<aside className="text-dimmed">
								<i className="bi bi-clock" />&nbsp;
								{dayjs(announcement.createdAt).locale(lang.split('_')[0]).fromNow()}
							</aside>
						</header>
						<section>
							{(() => {
								const res: ReactNodeArray = [];
								announcement.body.split('\n').forEach(s => {
									res.push(<>{s}</>);
									res.push(<br />);
								});
								return res;
							})()}
						</section>
					</div>
				</div>
			)}
		</article>
	);
};
