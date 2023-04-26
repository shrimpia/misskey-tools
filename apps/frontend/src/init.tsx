
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@/App';

import 'vite/modulepreload-polyfill';
import 'ress';
import '@/libs/i18n';
import '@/libs/dayjs';
import '@/style.scss';

const el = document.getElementById('app');

// TODO: エラーオブジェクトが存在する場合はレンダリングを分ける
const error = (window as any).__misshaialert?.error;
console.log(error);

if (el != null) {
  createRoot(el).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}
