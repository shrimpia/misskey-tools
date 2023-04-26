import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { useToolsGlobalEffects } from './global-effects';

import {globalStyles} from '@/libs/stitches.js';
import routes from '~react-pages';

export const App : React.FC = () => {
  useToolsGlobalEffects();
  globalStyles();

  return (
    <Suspense fallback={<p>Loading</p>}>
      {useRoutes(routes)}
    </Suspense>
  );
};

