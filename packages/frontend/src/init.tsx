
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@/App';
import { BackendError } from '@/components/domains/backend-error/BackendError.js';

import 'vite/modulepreload-polyfill';
import 'ress';
import '@tabler/icons-webfont/tabler-icons.min.css';
import '@/libs/i18n';
import '@/libs/dayjs';
import '@/style.scss';

const el = document.getElementById('app');

// TODO: エラーオブジェクトが存在する場合はレンダリングを分ける
const error = (window as any).__misshaialert?.error;

if (el != null) {
  createRoot(el).render(error ? (<BackendError error={error} />) : (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ));
}
