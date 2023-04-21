import React, { PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Skeleton } from './Skeleton';
import { ErrorView } from './ErrorView';

export const SuspenseView: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <ErrorBoundary fallback={(e) => <ErrorView additionalInfo={`${e.name} (${e.message})`}/>}>
      <Suspense fallback={<Skeleton height={240}/>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
