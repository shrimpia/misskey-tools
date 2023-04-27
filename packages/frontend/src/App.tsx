import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { useToolsGlobalEffects } from './global-effects';
import { token } from './misc/token';

import { HeaderBar } from '@/components/HeaderBar.js';
import routes from '~react-pages';

export const App : React.FC = () => {
  useToolsGlobalEffects();

  return (
    <>
      {token && <HeaderBar/>}
      <Suspense fallback={<p>Loading</p>}>
        {useRoutes(routes)}
      </Suspense>
    </>
  );
};

