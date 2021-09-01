import React, { useEffect, useState }  from 'react';

import { Header } from '../components/Header';

export const IndexSessionPage: React.VFC = () => {
	const token = localStorage['token'];
	const [session, setSession] = useState<Record<string, any> | null>(null);

	useEffect(() => {
		fetch(`//${location.host}/api/v1/session`, {
			headers: {
				'Authorization': `Bearer ${token}`,
			},
		}).then(s => s.json())
			.then(setSession);
	}, []);

	return (
		<>
			<Header>
				<article className="mt-4">
					おかえりなさい、{session?.username}さん。
				</article>
			</Header>
		</>
	);
};
