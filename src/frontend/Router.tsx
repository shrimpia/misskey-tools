import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IndexPage } from './pages';
import { AnnouncementPage } from './pages/announcement';
import { RankingPage } from './pages/apps/misshai/ranking';
import { AdminPage } from './pages/admin';
import { AccountsPage } from './pages/account';
import { SettingPage } from './pages/settings';
import { MisshaiPage } from './pages/apps/misshai';
import { NekomimiPage } from './pages/apps/avatar-cropper';

export const Router: React.VFC = () => {
	return (
		<Switch>
			<Route exact path="/" component={IndexPage} />
			<Route exact path="/apps/avatar-cropper" component={NekomimiPage} />
			<Route exact path="/apps/miss-hai" component={MisshaiPage} />
			<Route exact path="/apps/miss-hai/ranking" component={RankingPage} />
			<Route exact path="/announcements/:id" component={AnnouncementPage} />
			<Route exact path="/account" component={AccountsPage} />
			<Route exact path="/settings" component={SettingPage} />
			<Route exact path="/admin" component={AdminPage} />
		</Switch>
	);
};
