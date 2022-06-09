import React, { useEffect, useState }  from 'react';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
import { IAnnouncement } from '../../common/types/announcement';
import { Skeleton } from '../components/Skeleton';
import { $get } from '../misc/api';
import { useSelector } from '../store';
import { useTitle } from '../hooks/useTitle';

export const AnnouncementPage: React.VFC = () => {
	const { id } = useParams<{id: string}>();
	if (!id) return null;

	const [announcement, setAnnouncement] = useState<IAnnouncement | null>();

	const lang = useSelector(state => state.screen.language);

	useTitle('announcements');

	useEffect(() => {
		$get<IAnnouncement>('announcements/' + id).then(setAnnouncement);
	}, [setAnnouncement]);
	return (
		<article className="xarticle">
			{!announcement ? <Skeleton width="100%" height="10rem" /> : (
				<>
					<h2>
						{announcement.title}
						<aside className="inline ml-1 text-dimmed text-100">
							<i className="fas fa-clock" />&nbsp;
							{dayjs(announcement.createdAt).locale(lang.split('_')[0]).fromNow()}
						</aside>
					</h2>
					<section>
						<ReactMarkdown>{announcement.body}</ReactMarkdown>
					</section>
				</>
			)}
		</article>
	);
};
