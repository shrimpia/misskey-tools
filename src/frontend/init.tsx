import * as React from 'react';
import * as ReactDOM from 'react-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import { App } from './App';

dayjs.extend(relativeTime);

ReactDOM.render(<App/>, document.getElementById('app'));
