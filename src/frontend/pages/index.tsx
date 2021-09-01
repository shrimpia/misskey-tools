import React  from 'react';
import { Link } from 'react-router-dom';

import { Ranking } from '../components/Ranking';
import { LoginForm } from '../components/LoginForm';
import { DeveloperInfo } from '../components/DeveloperInfo';
import { HashtagTimeline } from '../components/HashtagTimeline';
import { Header } from '../components/Header';

export const IndexPage: React.VFC = () => {

	return (
		<>
			<Header>
				<article className="mt-4">
					<p>
						Misskeyは楽しいものです。気がついたら1日中入り浸っていることも多いでしょう。
					</p>
					<p>
						さあ、今すぐみす廃アラートをインストールして、あなたの活動を把握しよう。
					</p>
				</article>
				<LoginForm />
			</Header>
			<article className="xarticle card ghost">
				<div className="body">
					<h1 className="mb-1">みす廃ランキング</h1>
					<Ranking limit={10} />
					<Link to="/ranking">全員分見る</Link>
				</div>
			</article>
			<article className="xarticle mt-4 row">
				<div className="col-12 pc-6 card ghost">
					<div className="body"><DeveloperInfo/></div>
				</div>
				<div className="col-12 pc-6 card ghost">
					<div className="body"><HashtagTimeline hashtag="misshaialert"/></div>
				</div>
			</article>
			<footer className="text-center pa-5">
				(C)2020-2021 Xeltica
			</footer>
		</>
	);
};
