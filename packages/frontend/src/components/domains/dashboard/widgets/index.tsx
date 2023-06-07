

import announcements from './announcements';
import apps from './apps';
import holicData from './holicData';
import questionBox from './questionBox';
import unreadHints from './unreadHints';

import type { WidgetDef } from '../def';

export const widgets: WidgetDef[] = [
  holicData,
  announcements,
  questionBox,
  apps,
  unreadHints,
];
