import { api } from '../services/misskey';
import { config } from '../config';
import { User } from '../models/entities/user';
import { updateUser } from './users';
import { Score } from '../types/Score';

export const format = (score: Score): string => `昨日のMisskeyの活動は

ノート: ${score.notesCount}(${score.notesDelta})
フォロー : ${score.followingCount}(${score.followingDelta})
フォロワー :${score.followersCount}(${score.followersDelta})

でした。
${config.url}

#misshaialert`;
