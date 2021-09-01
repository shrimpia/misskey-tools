import React  from 'react';

import { IndexSessionPage } from './index.session';
import { IndexWelcomePage } from './index.welcome';

export const IndexPage: React.VFC = () => {
	const token = localStorage.getItem('token');

	return token ? <IndexSessionPage /> : <IndexWelcomePage />;
};
