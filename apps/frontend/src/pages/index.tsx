import React  from 'react';
import { LOCALSTORAGE_KEY_TOKEN } from '../const';

import { IndexSessionPage } from './index.session';
import { IndexWelcomePage } from './index.welcome';

export const IndexPage: React.FC = () => {
  const token = localStorage[LOCALSTORAGE_KEY_TOKEN];

  return token ? <IndexSessionPage /> : <IndexWelcomePage />;
};
