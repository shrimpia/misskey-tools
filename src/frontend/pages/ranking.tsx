import React  from 'react';
import { Ranking } from '../components/Ranking';


export const RankingPage: React.VFC = () => {
	return (
		<article className="xarticle">
			<h2>ミス廃ランキング</h2>
			<section>
				<p>ユーザーの「ミス廃レート」を算出し、高い順にランキング表示しています。ミス廃レートは、次のような条件で算出されます。</p>
				<p><strong>(ノート数) / (アカウント登録からの経過日数)</strong></p>
				<p>廃人を極めるか、ノート数を控えるか、全てあなた次第！</p>
			</section>
			<section className="pt-2">
				<Ranking />
			</section>
		</article>
	);
};
