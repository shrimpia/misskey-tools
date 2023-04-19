import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { IndexPage } from './pages';
import { AnnouncementPage } from './pages/announcement';
import { RankingPage } from './pages/apps/misshai/ranking';
import { AdminPage } from './pages/admin';
import { AccountsPage } from './pages/account';
import { SettingPage } from './pages/settings';
import { MisshaiPage } from './pages/apps/misshai';
import { NekomimiPage } from './pages/apps/avatar-cropper';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage/>} />
      <Route path="/apps/avatar-cropper" element={<NekomimiPage/>} />
      <Route path="/apps/miss-hai" element={<MisshaiPage/>} />
      <Route path="/apps/miss-hai/ranking" element={<RankingPage/>} />
      <Route path="/announcements/:id" element={<AnnouncementPage/>} />
      <Route path="/account" element={<AccountsPage/>} />
      <Route path="/settings" element={<SettingPage/>} />
      <Route path="/admin" element={<AdminPage/>} />
    </Routes>
  );
};
