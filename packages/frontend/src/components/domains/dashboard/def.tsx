import { css } from '@stitches/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { WidgetBase } from '@/components/domains/dashboard/WidgetBase';
import { SuspenseView } from '@/components/primitives/SuspenseView';

export interface WidgetDef {
	name: string;
	iconClass: string;
	render: React.FC;
}

export const scrollableStyle = css({
  overflow: 'auto',
});

export const widget = (name: string, iconClass: string, pale: boolean, render: React.FC): WidgetDef => {
  return {
    name, iconClass,
    render: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t } = useTranslation();
      return (
        <WidgetBase title={pale ? undefined : (t('_widgets.' + name) ?? '')} iconClass={pale ? undefined : iconClass} pale={pale}>
          <SuspenseView className={scrollableStyle()}>
            {render({})}
          </SuspenseView>
        </WidgetBase>
      );
    },
  };
};
