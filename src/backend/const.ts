export default {
	version: '1.5.1',
	changelog: [
		'インスタンスの接続エラーにより後続処理が行えなくなる重大な不具合を修正',
		'全員分の算出が終わるまで、ランキングを非表示に',
	],
};

export const defaultTemplate = '昨日のMisskeyの活動は\n\nノート: {notesCount}({notesDelta})\nフォロー : {followingCount}({followingDelta})\nフォロワー :{followersCount}({followersDelta})\n\nでした。\n{url}';
