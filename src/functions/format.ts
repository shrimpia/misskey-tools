import { config } from '../config';
import { Score } from '../types/Score';

export const format = (score: Score): string => `昨日のMisskeyの活動は

ノート: ${score.notesCount}(${score.notesDelta})
フォロー : ${score.followingCount}(${score.followingDelta})
フォロワー :${score.followersCount}(${score.followersDelta})

でした。
${config.url}

#misshaialert`;
