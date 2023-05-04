

import announcements from './announcements';
import apps from './apps';
import misshaiData from './misshaiData';
import questionBox from './questionBox';
import unreadHints from './unreadHints';

import type { WidgetDef } from '../def';

export const widgets: WidgetDef[] = [
  misshaiData,
  announcements,
  questionBox,
  apps,
  unreadHints,
];

