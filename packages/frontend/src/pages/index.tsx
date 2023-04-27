import React from 'react';

import { WelcomePage } from '@/components/domains/welcome/WelcomePage';
import { token } from '@/misc/token';


export default function index() {
  return token ? <p>Hello</p> : <WelcomePage/>;
}
