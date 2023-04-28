import { useAtomValue } from 'jotai';
import React from 'react';

import { sessionsAtom } from '@/store/api/account';

export const MisskeyAccounts: React.FC = () => {
  const sessions = useAtomValue(sessionsAtom);
  return (
    <ul>
      {sessions.map(session => <li key={session.id}>{session.username}@{session.host}</li>)}
    </ul>
  );
};
