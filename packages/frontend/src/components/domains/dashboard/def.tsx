import React from 'react';
import { useTranslation } from 'react-i18next';

import { WidgetBase } from './WidgetBase';

export interface WidgetDef {
	name: string;
	iconClass: string;
	render: React.FC;
}

export const widget = (name: string, iconClass: string, pale: boolean, render: React.FC): WidgetDef => {
  return {
    name, iconClass,
    render: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t } = useTranslation();
      return (
        <WidgetBase title={pale ? undefined : (t('_widgets.' + name) ?? '')} iconClass={pale ? undefined : iconClass} pale={pale}>
          {render({})}
        </WidgetBase>
      );
    },
  };
};
