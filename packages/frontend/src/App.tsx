import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HeaderBar } from '@/components/HeaderBar.js';
import { Centered } from '@/components/layouts/Centered';
import { useToolsGlobalEffects } from '@/global-effects';
import { token } from '@/misc/token';

const IndexDashboard = lazy(() => import('@/pages/index.dashboard'));
const IndexWelcome = lazy(() => import('./pages/index.welcome'));

export const App : React.FC = () => {
  useToolsGlobalEffects();

  return (
    <>
      {token && <HeaderBar/>}
      <Suspense fallback={<Centered fullscreen>Loading</Centered>}>
        <Routes>
          <Route index element={token ? <IndexDashboard /> : <IndexWelcome />} />
        </Routes>
      </Suspense>
    </>
  );
};

