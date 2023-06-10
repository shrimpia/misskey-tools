import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { VStack } from './components/layouts/VStack';

import { HeaderBar } from '@/components/HeaderBar.js';
import { SuspenseView } from '@/components/primitives/SuspenseView';
import { useToolsGlobalEffects } from '@/global-effects';
import { token } from '@/misc/token';

const IndexDashboard = lazy(() => import('@/pages/index.dashboard'));
const IndexWelcome = lazy(() => import('@/pages/index.welcome'));
const Settings = lazy(() => import('@/pages/settings'));
const Appearance = lazy(() => import('@/pages/settings/appearance'));
const Account = lazy(() => import('@/pages/settings/account'));
const Announcements = lazy(() => import('@/pages/announcements'));
const About = lazy(() => import('@/pages/about'));
const AppsNoteScheduler = lazy(() => import('@/pages/apps/note-scheduler'));
const AppsNoteSchedulerNew = lazy(() => import('@/pages/apps/note-scheduler.new'));
const AppsNoteSchedulerEdit = lazy(() => import('@/pages/apps/note-scheduler.edit'));
const Misskeholic = lazy(() => import('@/pages/apps/misskeholic'));
const MisskeholicUser = lazy(() => import('@/pages/apps/misskeholic.user'));
const NotFound = lazy(() => import('@/pages/not-found'));

export const App : React.FC = () => {
  useToolsGlobalEffects();

  return (
    <>
      {token && <HeaderBar/>}
      <SuspenseView fullscreen>
        <Routes>
          <Route index element={token ? <IndexDashboard /> : <IndexWelcome />} />
          <Route path="/settings" element={<Settings />}>
            <Route path="appearance" element={<Appearance />}/>
            <Route path="account" element={<Account />}/>
            <Route path="*" element={<p>Not Found</p>}/>
          </Route>
          <Route path="/announcements/:id" element={<Announcements />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/apps/note-scheduler" element={<AppsNoteScheduler />}/>
          <Route path="/apps/note-scheduler/new" element={<AppsNoteSchedulerNew />}/>
          <Route path="/apps/note-scheduler/edit/:id" element={<AppsNoteSchedulerEdit />}/>
          <Route path="/apps/misskeholic" element={<Misskeholic />}/>
          <Route path="/apps/misskeholic/:id" element={<MisskeholicUser />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <VStack as="footer" alignItems="center" css={{ padding: '$2xl $m' }}>
          <p>(C)2020-2023 Shrimpia Network</p>
        </VStack>
      </SuspenseView>
    </>
  );
};

