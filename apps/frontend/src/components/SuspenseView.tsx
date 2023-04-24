import React, { PropsWithChildren, Suspense } from 'react';

import { ErrorView } from './ErrorView';
import { Skeleton } from './Skeleton';

import { ErrorBoundary } from '@/components/ErrorBoundary';

export const SuspenseView: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <ErrorBoundary fallback={(e) => <ErrorView additionalInfo={`${e.name} (${e.message})`}/>}>
      <Suspense fallback={<Skeleton height={240}/>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
