import React from 'react';

import { trpc } from '@/libs/trpc';

export const MisskeyAccounts: React.FC = () => {
  const [sessions] = trpc.account.getMisskeySessions.useSuspenseQuery();
  return (
    <ul>
      {sessions.map(session => <li key={session.id}>{session.username}@{session.host}</li>)}
    </ul>
  );
};
