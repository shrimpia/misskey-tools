import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { useToolsGlobalEffects } from './global-effects';

import routes from '~react-pages';

export const App : React.FC = () => {
  useToolsGlobalEffects();

  return (
    <Suspense fallback={<p>Loading</p>}>
      {useRoutes(routes)}
    </Suspense>
  );
};

