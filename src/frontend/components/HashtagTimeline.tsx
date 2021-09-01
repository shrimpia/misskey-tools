import React from 'react';

export type HashtagTimelineProps = {
	hashtag: string;
};

export const HashtagTimeline: React.VFC<HashtagTimelineProps> = ({hashtag}) => {
	return (
		<>
			<h1>タイムライン</h1>
			<p>#{hashtag} タグを含む最新ノートを表示します。</p>
			<p>WIP</p>
		</>
	);
};
