import type { Preview } from "@storybook/react";
import 'ress';
import '@tabler/icons-webfont/tabler-icons.min.css';
import '@/libs/i18n';
import '@/libs/dayjs';
import '@/style.scss';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import {darkTheme, globalStyles, theme} from '../src/libs/stitches';

globalStyles();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
		multipleThemesStitches: {
			values: [
				{
					name: 'Light',
					theme: theme,
				},
				{
					name: 'Dark',
					theme: darkTheme,
				}
			]
		},
  },
};

export default preview;
